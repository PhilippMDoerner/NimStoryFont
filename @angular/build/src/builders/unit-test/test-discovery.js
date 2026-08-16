"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTests = findTests;
exports.getTestEntrypoints = getTestEntrypoints;
exports.generateNameFromPath = generateNameFromPath;
const node_crypto_1 = require("node:crypto");
const node_fs_1 = require("node:fs");
const node_os_1 = __importDefault(require("node:os"));
const node_path_1 = require("node:path");
const tinyglobby_1 = require("tinyglobby");
const path_1 = require("../../utils/path");
/**
 * An array of file infix notations that identify a file as a test file.
 * For example, `.spec` in `app.component.spec.ts`.
 */
const TEST_FILE_INFIXES = ['.spec', '.test'];
/** Maximum length for a generated test entrypoint name. */
const MAX_FILENAME_LENGTH = 128;
/**
 * Finds all test files in the project. This function implements a special handling
 * for static paths (non-globs) to improve developer experience. For example, if a
 * user provides a path to a component, this function will find the corresponding
 * test file. If a user provides a path to a directory, it will find all test
 * files within that directory.
 *
 * @param include Glob patterns of files to include.
 * @param exclude Glob patterns of files to exclude.
 * @param workspaceRoot The absolute path to the workspace root.
 * @param projectSourceRoot The absolute path to the project's source root.
 * @returns A unique set of absolute paths to all test files.
 */
async function findTests(include, exclude, workspaceRoot, projectSourceRoot) {
    const resolvedTestFiles = new Set();
    const dynamicPatterns = [];
    const projectRootPrefix = (0, path_1.toPosixPath)((0, node_path_1.relative)(workspaceRoot, projectSourceRoot) + '/');
    const normalizedExcludes = exclude.map((p) => normalizePattern(p, projectRootPrefix));
    // 1. Separate static and dynamic patterns
    for (const pattern of include) {
        const normalized = normalizePattern(pattern, projectRootPrefix);
        if ((0, tinyglobby_1.isDynamicPattern)(pattern)) {
            dynamicPatterns.push(normalized);
        }
        else {
            const { resolved, unresolved } = await resolveStaticPattern(normalized, projectSourceRoot);
            resolved.forEach((file) => resolvedTestFiles.add(file));
            unresolved.forEach((p) => dynamicPatterns.push(p));
        }
    }
    // 2. Execute a single glob for all dynamic patterns
    if (dynamicPatterns.length > 0) {
        const globMatches = await (0, tinyglobby_1.glob)(dynamicPatterns, {
            cwd: projectSourceRoot,
            absolute: true,
            expandDirectories: false,
            ignore: ['**/node_modules/**', ...normalizedExcludes],
        });
        for (const match of globMatches) {
            resolvedTestFiles.add((0, path_1.toPosixPath)(match));
        }
    }
    // 3. Combine and de-duplicate results
    return [...resolvedTestFiles];
}
/**
 * Generates unique, dash-delimited bundle names for a set of test files.
 * This is used to create distinct output files for each test.
 *
 * @param testFiles An array of absolute paths to test files.
 * @param options Configuration options for generating entry points.
 * @returns A map where keys are the generated unique bundle names and values are the original file paths.
 */
function getTestEntrypoints(testFiles, { projectSourceRoot, workspaceRoot, removeTestExtension, prefix = 'spec', }) {
    const seen = new Set();
    const counters = new Map();
    const roots = [projectSourceRoot, workspaceRoot];
    const infixes = TEST_FILE_INFIXES.map((i) => i.slice(1));
    if (!infixes.includes(prefix)) {
        infixes.push(prefix);
    }
    const infixesPattern = infixes.join('|');
    return new Map(Array.from(testFiles, (testFile) => {
        const fileName = generateNameFromPath(testFile, roots, !!removeTestExtension);
        const baseName = fileName === prefix ? prefix : `${prefix}-${fileName}`;
        let uniqueName = baseName;
        // Start at 2 for collisions as the first instance remains suffix-less.
        let suffix = counters.get(baseName) ?? 2;
        while (seen.has(uniqueName)) {
            uniqueName = `${baseName}-${suffix}`.replace(new RegExp(`([^\\w](?:${infixesPattern}))-([\\d]+)$`), '-$2$1');
            ++suffix;
        }
        seen.add(uniqueName);
        counters.set(baseName, suffix);
        return [uniqueName, testFile];
    }));
}
/**
 * Generates a unique, dash-delimited name from a file path. This is used to
 * create a consistent and readable bundle name for a given test file.
 *
 * @param testFile The absolute path to the test file.
 * @param roots An array of root paths to remove from the beginning of the test file path.
 * @param removeTestExtension Whether to remove the test file infix and extension from the result.
 * @returns A dash-cased name derived from the relative path of the test file.
 */
function generateNameFromPath(testFile, roots, removeTestExtension) {
    const relativePath = removeRoots(testFile, roots.map(path_1.toPosixPath));
    let startIndex = 0;
    // Skip leading dots and slashes
    while (startIndex < relativePath.length && /^[./\\]$/.test(relativePath[startIndex])) {
        startIndex++;
    }
    let endIndex = relativePath.length;
    if (removeTestExtension) {
        const infixes = TEST_FILE_INFIXES.map((p) => p.substring(1)).join('|');
        const match = relativePath.match(new RegExp(`\\.(${infixes})\\.[^.]+$`));
        if (match?.index) {
            endIndex = match.index;
        }
    }
    else {
        const extIndex = relativePath.lastIndexOf('.');
        if (extIndex > startIndex) {
            endIndex = extIndex;
        }
    }
    // Build the final string in a single pass
    let result = '';
    for (let i = startIndex; i < endIndex; i++) {
        const char = relativePath[i];
        result += char === '/' || char === '\\' ? '-' : char;
    }
    return truncateName(result, relativePath);
}
/**
 * Truncates a generated name if it exceeds the maximum allowed filename length.
 * If truncation occurs, the name will be shortened by replacing a middle segment
 * with an 8-character SHA256 hash of the original full path to maintain uniqueness.
 *
 * @param name The generated name to potentially truncate.
 * @param originalPath The original full path from which the name was derived. Used for hashing.
 * @returns The original name if within limits, or a truncated name with a hash.
 */
function truncateName(name, originalPath) {
    if (name.length <= MAX_FILENAME_LENGTH) {
        return name;
    }
    const hash = (0, node_crypto_1.createHash)('sha256').update(originalPath).digest('hex').substring(0, 8);
    const availableLength = MAX_FILENAME_LENGTH - hash.length - 2; // 2 for '-' separators
    const prefixLength = Math.floor(availableLength / 2);
    const suffixLength = availableLength - prefixLength;
    return `${name.substring(0, prefixLength)}-${hash}-${name.substring(name.length - suffixLength)}`;
}
/**
 * Whether the current operating system's filesystem is case-insensitive.
 */
const isCaseInsensitiveFilesystem = node_os_1.default.platform() === 'win32' || node_os_1.default.platform() === 'darwin';
/**
 * Removes a prefix from the beginning of a string, with conditional case-insensitivity
 * based on the operating system's filesystem characteristics.
 *
 * @param text The string to remove the prefix from.
 * @param prefix The prefix to remove.
 * @returns The string with the prefix removed, or the original string if the prefix was not found.
 */
function removePrefix(text, prefix) {
    if (isCaseInsensitiveFilesystem) {
        if (text.toLowerCase().startsWith(prefix.toLowerCase())) {
            return text.substring(prefix.length);
        }
    }
    else {
        if (text.startsWith(prefix)) {
            return text.substring(prefix.length);
        }
    }
    return text;
}
/**
 * Removes potential root paths from a file path, returning a relative path.
 * If no root path matches, it returns the file's basename.
 *
 * @param path The file path to process.
 * @param roots An array of root paths to attempt to remove.
 * @returns A relative path.
 */
function removeRoots(path, roots) {
    for (const root of roots) {
        const result = removePrefix(path, root);
        // If the prefix was removed, the result will be a different string.
        if (result !== path) {
            return result;
        }
    }
    return (0, node_path_1.basename)(path);
}
/**
 * Normalizes a glob pattern by converting it to a POSIX path, removing leading
 * slashes, and making it relative to the project source root.
 *
 * @param pattern The glob pattern to normalize.
 * @param projectRootPrefix The POSIX-formatted prefix of the project's source root relative to the workspace root.
 * @returns A normalized glob pattern.
 */
function normalizePattern(pattern, projectRootPrefix) {
    const posixPattern = (0, path_1.toPosixPath)(pattern);
    // Do not modify absolute paths. The globber will handle them correctly.
    if ((0, node_path_1.isAbsolute)(posixPattern)) {
        return posixPattern;
    }
    // For relative paths, ensure they are correctly relative to the project source root.
    // This involves removing the project root prefix if the user provided a workspace-relative path.
    const normalizedRelative = removePrefix(posixPattern, projectRootPrefix);
    return normalizedRelative;
}
/**
 * Resolves a static (non-glob) path.
 *
 * If the path is a directory, it returns a glob pattern to find all test files
 * within that directory.
 *
 * If the path is a file, it attempts to find a corresponding test file by
 * checking for files with the same name and a test infix (e.g., `.spec.ts`).
 *
 * If no corresponding test file is found, the original path is returned as an
 * unresolved pattern.
 *
 * @param pattern The static path pattern.
 * @param projectSourceRoot The absolute path to the project's source root.
 * @returns A promise that resolves to an object containing resolved spec files and unresolved patterns.
 */
async function resolveStaticPattern(pattern, projectSourceRoot) {
    const fullPath = (0, node_path_1.isAbsolute)(pattern) ? pattern : (0, node_path_1.join)(projectSourceRoot, pattern);
    if (await isDirectory(fullPath)) {
        const infixes = TEST_FILE_INFIXES.map((p) => p.substring(1)).join('|');
        return { resolved: [], unresolved: [`${pattern}/**/*.@(${infixes}).@(ts|tsx)`] };
    }
    const fileExt = (0, node_path_1.extname)(fullPath);
    const baseName = (0, node_path_1.basename)(fullPath, fileExt);
    for (const infix of TEST_FILE_INFIXES) {
        const potentialSpec = (0, node_path_1.join)((0, node_path_1.dirname)(fullPath), `${baseName}${infix}${fileExt}`);
        if (await exists(potentialSpec)) {
            return { resolved: [(0, path_1.toPosixPath)(potentialSpec)], unresolved: [] };
        }
    }
    if (await exists(fullPath)) {
        return { resolved: [(0, path_1.toPosixPath)(fullPath)], unresolved: [] };
    }
    return { resolved: [], unresolved: [(0, path_1.toPosixPath)(pattern)] };
}
/** Checks if a path exists and is a directory. */
async function isDirectory(path) {
    try {
        const stats = await node_fs_1.promises.stat(path);
        return stats.isDirectory();
    }
    catch {
        return false;
    }
}
/** Checks if a path exists on the file system. */
async function exists(path) {
    try {
        await node_fs_1.promises.access(path, node_fs_1.constants.F_OK);
        return true;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=test-discovery.js.map