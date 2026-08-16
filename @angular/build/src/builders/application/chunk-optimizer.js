"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimizeChunks = optimizeChunks;
const node_assert_1 = __importDefault(require("node:assert"));
const bundler_files_1 = require("../../tools/esbuild/bundler-files");
const environment_options_1 = require("../../utils/environment-options");
const error_1 = require("../../utils/error");
const path_1 = require("../../utils/path");
/**
 * Converts the output of a bundle build into an esbuild-compatible metafile.
 * @param bundleOutput The output of a bundle build.
 * @param originalMetafile The original esbuild metafile from the build.
 * @returns An esbuild-compatible metafile.
 */
function bundleOutputToEsbuildMetafile(bundleOutput, originalMetafile) {
    const newMetafile = {
        inputs: originalMetafile.inputs,
        outputs: {},
    };
    const intermediateChunkSizes = {};
    for (const [path, output] of Object.entries(originalMetafile.outputs)) {
        intermediateChunkSizes[path] = Object.values(output.inputs).reduce((s, i) => s + i.bytesInOutput, 0);
    }
    for (const chunk of bundleOutput) {
        if (chunk.type === 'asset') {
            newMetafile.outputs[chunk.fileName] = {
                bytes: typeof chunk.source === 'string'
                    ? Buffer.byteLength(chunk.source, 'utf8')
                    : chunk.source.length,
                inputs: {},
                imports: [],
                exports: [],
            };
            continue;
        }
        const newOutputInputs = {};
        if (chunk.modules) {
            for (const [moduleId, renderedModule] of Object.entries(chunk.modules)) {
                const originalOutputEntry = originalMetafile.outputs[moduleId];
                if (!originalOutputEntry?.inputs) {
                    continue;
                }
                const totalOriginalBytesInModule = intermediateChunkSizes[moduleId];
                if (totalOriginalBytesInModule === 0) {
                    continue;
                }
                for (const [originalInputPath, originalInputInfo] of Object.entries(originalOutputEntry.inputs)) {
                    const proportion = originalInputInfo.bytesInOutput / totalOriginalBytesInModule;
                    const newBytesInOutput = Math.floor(renderedModule.renderedLength * proportion);
                    const existing = newOutputInputs[originalInputPath];
                    if (existing) {
                        existing.bytesInOutput += newBytesInOutput;
                    }
                    else {
                        newOutputInputs[originalInputPath] = { bytesInOutput: newBytesInOutput };
                    }
                    if (!newMetafile.inputs[originalInputPath]) {
                        newMetafile.inputs[originalInputPath] = originalMetafile.inputs[originalInputPath];
                    }
                }
            }
        }
        const imports = [
            ...chunk.imports.map((path) => ({ path, kind: 'import-statement' })),
            ...(chunk.dynamicImports?.map((path) => ({ path, kind: 'dynamic-import' })) ?? []),
        ];
        let entryPoint;
        if (chunk.facadeModuleId) {
            const posixFacadeModuleId = (0, path_1.toPosixPath)(chunk.facadeModuleId);
            for (const [outputPath, output] of Object.entries(originalMetafile.outputs)) {
                if (posixFacadeModuleId.endsWith(outputPath)) {
                    entryPoint = output.entryPoint;
                    break;
                }
            }
        }
        newMetafile.outputs[chunk.fileName] = {
            bytes: Buffer.byteLength(chunk.code, 'utf8'),
            inputs: newOutputInputs,
            imports,
            exports: chunk.exports ?? [],
            entryPoint,
        };
    }
    return newMetafile;
}
/**
 * Creates an InitialFileRecord object with a specified depth.
 * @param depth The depth of the file in the dependency graph.
 * @returns An InitialFileRecord object.
 */
function createInitialFileRecord(depth) {
    return {
        type: 'script',
        entrypoint: false,
        external: false,
        serverFile: false,
        depth,
    };
}
/**
 * Creates an esbuild message object for a chunk optimization failure.
 * @param message The error message detailing the cause of the failure.
 * @returns A partial esbuild message object.
 */
function createChunkOptimizationFailureMessage(message) {
    // Most of these fields are not actually needed for printing the error
    return {
        id: '',
        text: 'Chunk optimization failed',
        detail: undefined,
        pluginName: '',
        location: null,
        notes: [
            {
                text: message,
                location: null,
            },
        ],
    };
}
/**
 * Optimizes the chunks of a build result using rolldown.
 *
 * This function takes the output of an esbuild build, identifies the main browser entry point,
 * and uses rolldown to bundle and optimize the JavaScript chunks. The optimized chunks
 * replace the original ones in the build result, and the metafile is updated to reflect
 * the changes.
 *
 * @param original The original build result from esbuild.
 * @param sourcemap A boolean or 'hidden' to control sourcemap generation.
 * @returns A promise that resolves to the updated build result with optimized chunks.
 */
// eslint-disable-next-line max-lines-per-function
async function optimizeChunks(original, sourcemap) {
    // Failed builds cannot be optimized
    if (original.errors) {
        return original;
    }
    // Find the main browser entrypoint
    let mainFile;
    for (const [file, record] of original.initialFiles) {
        if (record.name === 'main' &&
            record.entrypoint &&
            !record.serverFile &&
            record.type === 'script') {
            mainFile = file;
            break;
        }
    }
    // No action required if no browser main entrypoint or metafile for stats
    if (!mainFile || !original.metafile) {
        return original;
    }
    const chunks = {};
    const maps = {};
    for (const originalFile of original.outputFiles) {
        if (originalFile.type !== bundler_files_1.BuildOutputFileType.Browser) {
            continue;
        }
        if (originalFile.path.endsWith('.js')) {
            chunks[originalFile.path] = originalFile;
        }
        else if (originalFile.path.endsWith('.js.map')) {
            // Create mapping of JS file to sourcemap content
            maps[originalFile.path.slice(0, -4)] = originalFile;
        }
    }
    const usedChunks = new Set();
    let bundle;
    let optimizedOutput;
    try {
        const plugins = [
            {
                name: 'angular-bundle',
                resolveId(source) {
                    // Remove leading `./` if present
                    const file = source[0] === '.' && source[1] === '/' ? source.slice(2) : source;
                    if (chunks[file]) {
                        return file;
                    }
                    // All other identifiers are considered external to maintain behavior
                    return { id: source, external: true };
                },
                load(id) {
                    (0, node_assert_1.default)(chunks[id], `Angular chunk content should always be present in chunk optimizer [${id}].`);
                    usedChunks.add(id);
                    const result = {
                        code: chunks[id].text,
                        map: maps[id]?.text,
                    };
                    return result;
                },
            },
        ];
        if (environment_options_1.useRolldownChunks) {
            const { rolldown } = await Promise.resolve().then(() => __importStar(require('rolldown')));
            bundle = await rolldown({
                input: mainFile,
                plugins,
            });
            const result = await bundle.generate({
                minify: { mangle: false, compress: false },
                sourcemap,
                chunkFileNames: (chunkInfo) => `${chunkInfo.name.replace(/-[a-zA-Z0-9_-]{8}$/, '')}-[hash].js`,
            });
            optimizedOutput = result.output;
        }
        else {
            let rollup;
            try {
                rollup = (await Promise.resolve().then(() => __importStar(require('rollup')))).rollup;
            }
            catch {
                throw new Error(`Rollup is required when 'NG_BUILD_CHUNKS_ROLLDOWN' is set to false. ` +
                    `Please install 'rollup' manually (e.g. 'npm install rollup --save-dev') to use this fallback.`);
            }
            bundle = await rollup({
                input: mainFile,
                plugins: plugins,
            });
            const result = await bundle.generate({
                compact: true,
                sourcemap,
                chunkFileNames: (chunkInfo) => `${chunkInfo.name.replace(/-[a-zA-Z0-9_-]{8}$/, '')}-[hash].js`,
            });
            optimizedOutput = result.output;
        }
    }
    catch (e) {
        (0, error_1.assertIsError)(e);
        return {
            errors: [createChunkOptimizationFailureMessage(e.message)],
            warnings: original.warnings,
        };
    }
    finally {
        await bundle?.close();
    }
    // Update metafile
    const newMetafile = bundleOutputToEsbuildMetafile(optimizedOutput, original.metafile);
    // Add back the outputs that were not part of the optimization
    for (const [path, output] of Object.entries(original.metafile.outputs)) {
        if (usedChunks.has(path)) {
            continue;
        }
        newMetafile.outputs[path] = output;
        for (const inputPath of Object.keys(output.inputs)) {
            if (!newMetafile.inputs[inputPath]) {
                newMetafile.inputs[inputPath] = original.metafile.inputs[inputPath];
            }
        }
    }
    original.metafile = newMetafile;
    // Remove used chunks and associated sourcemaps from the original result
    original.outputFiles = original.outputFiles.filter((file) => !usedChunks.has(file.path) &&
        !(file.path.endsWith('.map') && usedChunks.has(file.path.slice(0, -4))));
    // Add new optimized chunks
    const importsPerFile = {};
    for (const optimizedFile of optimizedOutput) {
        if (optimizedFile.type !== 'chunk') {
            continue;
        }
        importsPerFile[optimizedFile.fileName] = optimizedFile.imports;
        original.outputFiles.push((0, bundler_files_1.createOutputFile)(optimizedFile.fileName, optimizedFile.code, bundler_files_1.BuildOutputFileType.Browser));
        if (optimizedFile.map && optimizedFile.sourcemapFileName) {
            original.outputFiles.push((0, bundler_files_1.createOutputFile)(optimizedFile.sourcemapFileName, optimizedFile.map.toString(), bundler_files_1.BuildOutputFileType.Browser));
        }
    }
    // Update initial files to reflect optimized chunks
    const entriesToAnalyze = [];
    for (const usedFile of usedChunks) {
        // Leave the main file since its information did not change
        if (usedFile === mainFile) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            entriesToAnalyze.push([mainFile, original.initialFiles.get(mainFile)]);
            continue;
        }
        // Remove all other used chunks
        original.initialFiles.delete(usedFile);
    }
    // Analyze for transitive initial files
    let currentEntry;
    while ((currentEntry = entriesToAnalyze.pop())) {
        const [entryPath, entryRecord] = currentEntry;
        for (const importPath of importsPerFile[entryPath]) {
            const existingRecord = original.initialFiles.get(importPath);
            if (existingRecord) {
                // Store the smallest value depth
                if (existingRecord.depth > entryRecord.depth + 1) {
                    existingRecord.depth = entryRecord.depth + 1;
                }
                continue;
            }
            const record = createInitialFileRecord(entryRecord.depth + 1);
            entriesToAnalyze.push([importPath, record]);
        }
    }
    return original;
}
//# sourceMappingURL=chunk-optimizer.js.map