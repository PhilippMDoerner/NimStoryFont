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
exports.RegistryClient = void 0;
exports.getSatisfyingVersion = getSatisfyingVersion;
exports.angularMajorCompatGuarantee = angularMajorCompatGuarantee;
exports.isPnpActive = isPnpActive;
exports.findPackageJson = findPackageJson;
exports.resolveUserUpdatePlan = resolveUserUpdatePlan;
exports.printUpdateUsageMessage = printUpdateUsageMessage;
exports.applyUpdatePlan = applyUpdatePlan;
const core_1 = require("@angular-devkit/core");
const node_fs_1 = require("node:fs");
const node_module_1 = require("node:module");
const path = __importStar(require("node:path"));
const npm_package_arg_1 = __importDefault(require("npm-package-arg"));
const semver = __importStar(require("semver"));
class RegistryClient {
    packageManager;
    logger;
    minReleaseAge;
    getRegistryName;
    metadataCache = new Map();
    manifestCache = new Map();
    constructor(packageManager, logger, minReleaseAge = 0, getRegistryName) {
        this.packageManager = packageManager;
        this.logger = logger;
        this.minReleaseAge = minReleaseAge;
        this.getRegistryName = getRegistryName;
    }
    async getMetadata(packageName) {
        const registryName = this.getRegistryName ? this.getRegistryName(packageName) : packageName;
        let promise = this.metadataCache.get(registryName);
        if (!promise) {
            promise = this.packageManager.getRegistryMetadata(registryName).catch((e) => {
                this.metadataCache.delete(registryName);
                throw e;
            });
            this.metadataCache.set(registryName, promise);
        }
        const metadata = await promise;
        if (metadata && registryName !== packageName) {
            return { ...metadata, name: packageName };
        }
        return metadata;
    }
    async getManifest(packageName, version) {
        const registryName = this.getRegistryName ? this.getRegistryName(packageName) : packageName;
        const key = `${registryName}@${version}`;
        let promise = this.manifestCache.get(key);
        if (!promise) {
            promise = this.packageManager.getRegistryManifest(registryName, version).catch((e) => {
                this.manifestCache.delete(key);
                throw e;
            });
            this.manifestCache.set(key, promise);
        }
        const manifest = await promise;
        if (manifest && registryName !== packageName) {
            return { ...manifest, name: packageName };
        }
        return manifest;
    }
}
exports.RegistryClient = RegistryClient;
function isReleaseAgeSatisfied(registryClient, metadata, version) {
    const minReleaseAge = registryClient.minReleaseAge;
    if (!minReleaseAge || !metadata.time) {
        return true;
    }
    const publishTimeStr = metadata.time[version];
    if (!publishTimeStr) {
        return true;
    }
    const publishTime = Date.parse(publishTimeStr);
    if (isNaN(publishTime)) {
        return true;
    }
    return Date.now() - publishTime >= minReleaseAge;
}
async function getSatisfyingVersion(registryClient, metadata, range, next) {
    const options = { includePrerelease: next || undefined };
    let candidates = metadata.versions.filter((v) => semver.satisfies(v, range, options));
    candidates = candidates.filter((version) => isReleaseAgeSatisfied(registryClient, metadata, version));
    const sorted = semver.rsort(candidates);
    for (const version of sorted) {
        const manifest = await registryClient.getManifest(metadata.name, version);
        if (manifest && !manifest.deprecated) {
            return version;
        }
    }
    // Fallback to deprecated versions if no non-deprecated version satisfies
    for (const version of sorted) {
        const manifest = await registryClient.getManifest(metadata.name, version);
        if (manifest) {
            return version;
        }
    }
    return null;
}
function angularMajorCompatGuarantee(range) {
    let newRange = semver.validRange(range);
    if (!newRange) {
        return range;
    }
    let major = 1;
    while (!semver.gtr(major + '.0.0', newRange)) {
        major++;
        if (major >= 99) {
            return newRange;
        }
    }
    newRange = range;
    for (let minor = 0; minor < 20; minor++) {
        newRange += ` || ^${major}.${minor}.0-alpha.0 `;
    }
    return semver.validRange(newRange) || range;
}
const knownPeerCompatibleList = {
    '@angular/core': angularMajorCompatGuarantee,
};
function _updatePeerVersion(infoMap, name, range) {
    const maybePackageInfo = infoMap.get(name);
    if (!maybePackageInfo) {
        return range;
    }
    if (maybePackageInfo.target) {
        name = maybePackageInfo.target.updateMetadata.packageGroupName || name;
    }
    else {
        name = maybePackageInfo.installed.updateMetadata.packageGroupName || name;
    }
    const maybeTransform = knownPeerCompatibleList[name];
    if (maybeTransform) {
        if (typeof maybeTransform == 'function') {
            return maybeTransform(range);
        }
        else {
            return maybeTransform;
        }
    }
    return range;
}
function _validateForwardPeerDependencies(name, infoMap, logger) {
    let error = false;
    const info = infoMap.get(name);
    if (!info || !info.target) {
        return error;
    }
    const peerDependencies = info.target.packageJson.peerDependencies || {};
    const peerDependenciesMeta = info.target.packageJson.peerDependenciesMeta || {};
    for (const [peer, range] of Object.entries(peerDependencies)) {
        const peerInfo = infoMap.get(peer);
        if (!peerInfo) {
            continue;
        }
        const isOptional = !!peerDependenciesMeta[peer]?.optional;
        const resolvedRange = _updatePeerVersion(infoMap, peer, range);
        const resolvedVersion = peerInfo.target ? peerInfo.target.version : peerInfo.installed.version;
        if (!semver.satisfies(resolvedVersion, resolvedRange, { includePrerelease: true })) {
            logger.error(`Package ${JSON.stringify(name)} has an incompatible peer dependency to ` +
                `${JSON.stringify(peer)} (requires ${JSON.stringify(range)}, ` +
                `would install ${JSON.stringify(resolvedVersion)}).`);
            error = error || !isOptional;
        }
    }
    return error;
}
function _validateReversePeerDependencies(name, version, infoMap, logger, next) {
    let error = false;
    for (const [installed, installedInfo] of infoMap.entries()) {
        const installedLogger = logger.createChild(installed);
        installedLogger.debug(`${installed}...`);
        const peers = (installedInfo.target || installedInfo.installed).packageJson.peerDependencies;
        const peersMeta = (installedInfo.target || installedInfo.installed).packageJson
            .peerDependenciesMeta;
        for (const [peer, range] of Object.entries(peers || {})) {
            if (peer !== name) {
                continue;
            }
            const isOptional = !!peersMeta?.[peer]?.optional;
            const resolvedRange = _updatePeerVersion(infoMap, name, range);
            if (!semver.satisfies(version, resolvedRange, { includePrerelease: next || undefined })) {
                logger.error(`Package ${JSON.stringify(installed)} has an incompatible peer dependency to ` +
                    `${JSON.stringify(name)} (requires ${JSON.stringify(range)}, ` +
                    `would install ${JSON.stringify(version)}).`);
                error = error || !isOptional;
            }
        }
    }
    return error;
}
function _validateUpdatePackages(infoMap, force, next, logger) {
    logger.debug('Validating peer dependencies...');
    let error = false;
    for (const name of infoMap.keys()) {
        const info = infoMap.get(name);
        if (!info || !info.target) {
            continue;
        }
        logger.debug(`Checking ${name}...`);
        error = _validateForwardPeerDependencies(name, infoMap, logger) || error;
        error =
            _validateReversePeerDependencies(name, info.target.version, infoMap, logger, next) || error;
    }
    if (error && !force) {
        throw new Error('Incompatible peer dependencies found. See above for details. ' +
            'You can bypass this check using the --force option.');
    }
}
function _getUpdateMetadata(packageJson, logger) {
    const metadata = packageJson['ng-update'];
    const result = {
        packageGroup: {},
        requirements: {},
    };
    if (!metadata || typeof metadata != 'object' || Array.isArray(metadata)) {
        return result;
    }
    if (metadata['packageGroup']) {
        const packageGroup = metadata['packageGroup'];
        if (Array.isArray(packageGroup) && packageGroup.every((x) => typeof x == 'string')) {
            result.packageGroup = packageGroup.reduce((group, name) => {
                group[name] = packageJson.version;
                return group;
            }, {});
        }
        else if (typeof packageGroup == 'object' && packageGroup !== null) {
            result.packageGroup = Object.entries(packageGroup).reduce((group, [name, version]) => {
                if (typeof version == 'string') {
                    group[name] = version;
                }
                return group;
            }, {});
        }
        else {
            logger.warn(`PackageGroup metadata for ${packageJson.name} is malformed. Ignoring.`);
        }
    }
    if (typeof metadata['packageGroupName'] == 'string') {
        result.packageGroupName = metadata['packageGroupName'];
    }
    if (typeof metadata['migrations'] == 'string') {
        result.migrations = metadata['migrations'];
    }
    return result;
}
function isPnpActive(workspaceRoot) {
    return (process.versions.pnp !== undefined ||
        (0, node_fs_1.existsSync)(path.join(workspaceRoot, '.pnp.cjs')) ||
        (0, node_fs_1.existsSync)(path.join(workspaceRoot, '.pnp.js')));
}
function findPackageJson(workspaceDir, packageName) {
    if (isPnpActive(workspaceDir)) {
        try {
            const workspaceRequire = (0, node_module_1.createRequire)(path.join(workspaceDir, 'package.json'));
            return workspaceRequire.resolve(`${packageName}/package.json`);
        }
        catch {
            return undefined;
        }
    }
    let currentDir = workspaceDir;
    while (true) {
        const candidatePath = path.join(currentDir, 'node_modules', packageName, 'package.json');
        if ((0, node_fs_1.existsSync)(candidatePath)) {
            return (0, node_fs_1.realpathSync)(candidatePath);
        }
        const parentDir = path.dirname(currentDir);
        if (parentDir === currentDir) {
            break;
        }
        currentDir = parentDir;
    }
    return undefined;
}
function getInstalledPackageJson(packageName, workspaceRoot) {
    try {
        const manifestPath = findPackageJson(workspaceRoot, packageName);
        if (manifestPath) {
            const content = (0, node_fs_1.readFileSync)(manifestPath, 'utf8');
            return JSON.parse(content);
        }
    }
    catch { }
    return null;
}
function getInstalledVersion(packageName, workspaceRoot) {
    const pkgJson = getInstalledPackageJson(packageName, workspaceRoot);
    return pkgJson?.version ?? null;
}
function _buildLocalPackageInfo(name, allDependencies, workspaceRoot) {
    const packageJsonRange = allDependencies.get(name);
    if (!packageJsonRange) {
        throw new Error(`Package ${JSON.stringify(name)} was not found in package.json.`);
    }
    const localPkgJson = getInstalledPackageJson(name, workspaceRoot);
    if (!localPkgJson) {
        throw new Error(`Package ${name} is not installed.`);
    }
    const installedVersion = localPkgJson.version;
    const npmPackageJson = {
        name,
        versions: [installedVersion],
        'dist-tags': {},
    };
    const logger = new core_1.logging.NullLogger();
    return {
        name,
        npmPackageJson,
        installed: {
            version: installedVersion,
            packageJson: localPkgJson,
            updateMetadata: _getUpdateMetadata(localPkgJson, logger),
        },
        packageJsonRange,
    };
}
async function _buildPackageInfo(packages, allDependencies, npmPackageJson, workspaceRoot, registryClient, logger) {
    const name = npmPackageJson.name;
    const packageJsonRange = allDependencies.get(name);
    if (!packageJsonRange) {
        throw new Error(`Package ${JSON.stringify(name)} was not found in package.json.`);
    }
    const localPkgJson = getInstalledPackageJson(name, workspaceRoot);
    let installedVersion = localPkgJson?.version;
    if (!installedVersion) {
        installedVersion = (await getSatisfyingVersion(registryClient, npmPackageJson, packageJsonRange));
    }
    if (!installedVersion) {
        throw new Error(`An unexpected error happened; could not determine version for package ${name}.`);
    }
    const installedPackageJson = localPkgJson || (await registryClient.getManifest(name, installedVersion));
    if (!installedPackageJson) {
        throw new Error(`An unexpected error happened; package ${name} has no version ${installedVersion}.`);
    }
    let targetVersion = packages.get(name);
    if (targetVersion) {
        const distTags = npmPackageJson['dist-tags'] ?? {};
        let resolvedVersion = distTags[targetVersion] ?? (targetVersion === 'next' ? distTags['latest'] : undefined);
        if (resolvedVersion &&
            !isReleaseAgeSatisfied(registryClient, npmPackageJson, resolvedVersion)) {
            resolvedVersion = undefined;
        }
        if (resolvedVersion) {
            targetVersion = resolvedVersion;
        }
        else {
            targetVersion = (await getSatisfyingVersion(registryClient, npmPackageJson, distTags[targetVersion] || targetVersion === 'next' ? '*' : targetVersion));
        }
    }
    if (targetVersion && semver.lte(targetVersion, installedVersion)) {
        logger.debug(`Package ${name} already satisfied by package.json (${packageJsonRange}).`);
        targetVersion = undefined;
    }
    let target;
    if (targetVersion) {
        const targetPackageJson = await registryClient.getManifest(name, targetVersion);
        if (targetPackageJson) {
            target = {
                version: targetVersion,
                packageJson: targetPackageJson,
                updateMetadata: _getUpdateMetadata(targetPackageJson, logger),
            };
        }
    }
    return {
        name,
        npmPackageJson,
        installed: {
            version: installedVersion,
            packageJson: installedPackageJson,
            updateMetadata: _getUpdateMetadata(installedPackageJson, logger),
        },
        target,
        packageJsonRange,
    };
}
function splitPackageName(pkg) {
    let name = pkg;
    let version;
    if (pkg.startsWith('@')) {
        const parts = pkg.split('@');
        name = '@' + parts[1];
        version = parts[2];
    }
    else if (pkg.includes('@')) {
        const parts = pkg.split('@');
        name = parts[0];
        version = parts[1];
    }
    return { name, version };
}
function _buildPackageList(options, allDependencies, logger) {
    const packages = new Map();
    const inputPackages = options.packages ?? [];
    if (inputPackages.length === 0) {
        return packages;
    }
    for (const pkg of inputPackages) {
        const { name: pkgName, version: pkgVersion } = splitPackageName(pkg);
        if (!allDependencies.has(pkgName)) {
            throw new Error(`Package ${JSON.stringify(pkgName)} is not in package.json.`);
        }
        let targetVersion = pkgVersion;
        if (options.migrateOnly && !targetVersion && options.from) {
            targetVersion = options.from;
        }
        packages.set(pkgName, (targetVersion || (options.next ? 'next' : 'latest')));
    }
    return packages;
}
async function resolvePackageVersion(registryClient, metadata, range, next = false) {
    const distTags = metadata['dist-tags'] ?? {};
    let resolvedVersion = distTags[range] ?? (range === 'next' ? distTags['latest'] : undefined);
    if (resolvedVersion && !isReleaseAgeSatisfied(registryClient, metadata, resolvedVersion)) {
        resolvedVersion = undefined;
    }
    if (resolvedVersion) {
        return resolvedVersion;
    }
    return getSatisfyingVersion(registryClient, metadata, distTags[range] || range === 'next' ? '*' : range, next);
}
async function _addPackageGroup(packages, allDependencies, metadata, registryClient, logger) {
    const maybePackage = packages.get(metadata.name);
    if (!maybePackage) {
        return;
    }
    const distTags = metadata['dist-tags'] ?? {};
    let version = maybePackage;
    let resolvedVersion = distTags[version] ?? (version === 'next' ? distTags['latest'] : undefined);
    if (resolvedVersion && !isReleaseAgeSatisfied(registryClient, metadata, resolvedVersion)) {
        resolvedVersion = undefined;
    }
    if (resolvedVersion) {
        version = resolvedVersion;
    }
    else {
        version =
            (await getSatisfyingVersion(registryClient, metadata, distTags[version] || version === 'next' ? '*' : version)) ?? version;
    }
    const packageJson = await registryClient.getManifest(metadata.name, version);
    if (!packageJson) {
        return;
    }
    const ngUpdateMetadata = packageJson['ng-update'];
    if (!ngUpdateMetadata) {
        return;
    }
    const packageGroup = ngUpdateMetadata['packageGroup'];
    if (!packageGroup) {
        return;
    }
    let packageGroupNormalized;
    if (Array.isArray(packageGroup) && !packageGroup.some((x) => typeof x != 'string')) {
        packageGroupNormalized = packageGroup.reduce((acc, curr) => {
            acc[curr] = version;
            return acc;
        }, {});
    }
    else if (typeof packageGroup === 'object' && packageGroup !== null) {
        packageGroupNormalized = Object.entries(packageGroup).reduce((acc, [name, v]) => {
            if (typeof v === 'string') {
                acc[name] = v;
            }
            return acc;
        }, {});
    }
    else {
        logger.warn(`PackageGroup metadata for ${metadata.name} is malformed. Ignoring.`);
        return;
    }
    for (const [member, memberVersion] of Object.entries(packageGroupNormalized)) {
        if (packages.has(member)) {
            continue;
        }
        if (allDependencies.has(member)) {
            packages.set(member, memberVersion);
        }
    }
}
async function _addPeerDependencies(packages, allDependencies, npmPackageJson, workspaceRoot, registryClient, logger) {
    const maybePackage = packages.get(npmPackageJson.name);
    if (!maybePackage) {
        return;
    }
    const distTags = npmPackageJson['dist-tags'] ?? {};
    const version = distTags[maybePackage] || maybePackage;
    const packageJson = await registryClient.getManifest(npmPackageJson.name, version);
    if (!packageJson) {
        return;
    }
    for (const [peer, range] of Object.entries(packageJson.peerDependencies || {})) {
        if (packages.has(peer)) {
            continue;
        }
        const installedVersion = getInstalledVersion(peer, workspaceRoot);
        if (installedVersion) {
            if (semver.satisfies(installedVersion, range)) {
                continue;
            }
        }
        else {
            const packageJsonRange = allDependencies.get(peer);
            if (packageJsonRange) {
                const peerMetadata = await registryClient.getMetadata(peer);
                if (peerMetadata) {
                    const resolvedInstalledVersion = await getSatisfyingVersion(registryClient, peerMetadata, packageJsonRange);
                    if (resolvedInstalledVersion && semver.satisfies(resolvedInstalledVersion, range)) {
                        continue;
                    }
                }
            }
        }
        packages.set(peer, range);
    }
}
function _formatVersion(v) {
    if (v === undefined) {
        return v;
    }
    if (semver.valid(v)) {
        return v;
    }
    const coerced = semver.coerce(v);
    return coerced ? coerced.toString() : undefined;
}
function getRegistryNameAndRange(name, specifier) {
    try {
        const result = npm_package_arg_1.default.resolve(name, specifier);
        if (result.type === 'alias' && result.subSpec) {
            return {
                name: result.subSpec.name ?? name,
                range: result.subSpec.fetchSpec ?? specifier,
            };
        }
    }
    catch { }
    return { name, range: specifier };
}
function isPkgFromRegistry(name, specifier) {
    const result = npm_package_arg_1.default.resolve(name, specifier);
    return !!result.registry;
}
async function checkCatalogUpdates(normalizedPackages, packageJsonContent, registryClient, workspaceRoot, options) {
    const catalogUpdates = [];
    for (const requestedPkg of normalizedPackages) {
        const { name: pkgName } = splitPackageName(requestedPkg);
        const specifier = packageJsonContent.dependencies?.[pkgName] ||
            packageJsonContent.devDependencies?.[pkgName] ||
            packageJsonContent.peerDependencies?.[pkgName];
        if (specifier?.startsWith('catalog:')) {
            const current = getInstalledVersion(pkgName, workspaceRoot) ?? 'unknown';
            let target = 'latest';
            try {
                const metadata = await registryClient.getMetadata(pkgName);
                if (metadata) {
                    const resolved = await resolvePackageVersion(registryClient, metadata, options.next ? 'next' : 'latest', !!options.next);
                    target = resolved ?? 'latest';
                }
            }
            catch {
                // Fallback to 'latest' tag
            }
            catalogUpdates.push({ name: pkgName, current, target, specifier });
        }
    }
    if (catalogUpdates.length > 0) {
        const packageManagerName = options.packageManager ?? 'your package manager';
        const installCmd = packageManagerName === 'yarn' ? 'yarn install' : 'pnpm install';
        const updatesList = catalogUpdates
            .map((pkg) => `  - ${pkg.name} (${pkg.specifier}) -> Target version: ${pkg.target}`)
            .join('\n');
        const migrationCommands = catalogUpdates
            .map((pkg) => {
            const fromVer = pkg.current === 'unknown' ? '<current-version>' : pkg.current;
            return `  ng update ${pkg.name} --migrate-only --from ${fromVer}`;
        })
            .join('\n');
        throw new Error(`The following packages to update are configured to use \`catalog:\`:\n` +
            `${updatesList}\n\n` +
            `Because catalogs are shared across the monorepo, 'ng update' cannot modify them directly.\n` +
            `Please perform the following steps to update:\n` +
            `  1. Manually update the versions for these packages in your catalog configuration file ` +
            `(e.g., pnpm-workspace.yaml or .yarnrc.yml).\n` +
            `  2. Run '${installCmd}' to install the updated versions.\n` +
            `  3. Run the following command(s) from the workspace root to execute the migration schematics:\n` +
            `${migrationCommands}`);
    }
}
async function resolveUserUpdatePlan(options, packageManager, logger) {
    const workspaceRoot = options.workspaceRoot ?? process.cwd();
    const packageJsonPath = path.join(workspaceRoot, 'package.json');
    if (!(0, node_fs_1.existsSync)(packageJsonPath)) {
        throw new Error('Could not find a package.json. Are you in a Node project?');
    }
    const rawJson = (0, node_fs_1.readFileSync)(packageJsonPath, 'utf8');
    const packageJsonContent = JSON.parse(rawJson);
    const getDependencies = (deps) => Object.entries(deps ?? {}).map(([name, range]) => [name, range]);
    const allRawDeps = [
        ...getDependencies(packageJsonContent.dependencies),
        ...getDependencies(packageJsonContent.devDependencies),
        ...getDependencies(packageJsonContent.peerDependencies),
    ];
    const npmDeps = new Map(allRawDeps.filter(([name, specifier]) => {
        try {
            return isPkgFromRegistry(name, specifier);
        }
        catch {
            logger.warn(`Package ${name} was not found on the registry. Skipping.`);
            return false;
        }
    }));
    const packagesOption = options.packages ?? [];
    const normalizedPackages = packagesOption.reduce((acc, curr) => {
        return acc.concat(curr.split(','));
    }, []);
    options.packages = normalizedPackages;
    if (options.migrateOnly && options.from) {
        if (options.packages.length !== 1) {
            throw new Error('--from requires that only a single package be passed.');
        }
    }
    options.from = _formatVersion(options.from);
    options.to = _formatVersion(options.to);
    const usingYarn = options.packageManager === 'yarn';
    const minReleaseAge = await packageManager.getMinimumReleaseAge();
    const getRegistryName = (name) => {
        const specifier = npmDeps.get(name);
        if (specifier) {
            return getRegistryNameAndRange(name, specifier).name;
        }
        return name;
    };
    const registryClient = new RegistryClient(packageManager, logger, minReleaseAge, getRegistryName);
    await checkCatalogUpdates(normalizedPackages, packageJsonContent, registryClient, workspaceRoot, options);
    const packages = _buildPackageList(options, npmDeps, logger);
    const getOrFetchPackageMetadata = async (packageName) => {
        return registryClient.getMetadata(packageName);
    };
    if (packages.size === 0) {
        await Promise.all(Array.from(npmDeps.keys(), (depName) => getOrFetchPackageMetadata(depName)));
    }
    else {
        let lastPackagesSize;
        do {
            lastPackagesSize = packages.size;
            let lastGroupSize;
            do {
                lastGroupSize = packages.size;
                for (const name of Array.from(packages.keys())) {
                    const metadata = await getOrFetchPackageMetadata(name);
                    const spec = packages.get(name);
                    if (metadata && spec) {
                        const resolvedVersion = await resolvePackageVersion(registryClient, metadata, spec, !!options.next);
                        if (resolvedVersion) {
                            packages.set(name, resolvedVersion);
                        }
                        await _addPackageGroup(packages, npmDeps, metadata, registryClient, logger);
                    }
                }
            } while (packages.size > lastGroupSize);
            for (const name of Array.from(packages.keys())) {
                const metadata = await getOrFetchPackageMetadata(name);
                const spec = packages.get(name);
                if (metadata && spec) {
                    const resolvedVersion = await resolvePackageVersion(registryClient, metadata, spec, !!options.next);
                    if (resolvedVersion) {
                        packages.set(name, resolvedVersion);
                    }
                    await _addPeerDependencies(packages, npmDeps, metadata, workspaceRoot, registryClient, logger);
                }
            }
        } while (packages.size > lastPackagesSize);
    }
    const isListingUpdates = packages.size === 0;
    const packageInfoEntries = await Promise.all(Array.from(npmDeps.keys(), async (depName) => {
        const isUpdating = packages.has(depName);
        const localPkgJson = getInstalledPackageJson(depName, workspaceRoot);
        if (isListingUpdates || isUpdating || !localPkgJson) {
            const metadata = await getOrFetchPackageMetadata(depName);
            if (metadata) {
                const info = await _buildPackageInfo(packages, npmDeps, metadata, workspaceRoot, registryClient, logger);
                return [depName, info];
            }
        }
        return [depName, _buildLocalPackageInfo(depName, npmDeps, workspaceRoot)];
    }));
    const packageInfoMap = new Map(packageInfoEntries);
    const packagesToUpdate = new Map();
    const migrationsToRun = [];
    if (packages.size > 0) {
        if (!(options.migrateOnly && options.from && options.packages)) {
            const sublog = new core_1.logging.LevelCapLogger('validation', logger.createChild(''), 'warn');
            _validateUpdatePackages(packageInfoMap, !!options.force, !!options.next, sublog);
            for (const [name, info] of packageInfoMap.entries()) {
                if (!info.target || !info.installed) {
                    continue;
                }
                packagesToUpdate.set(name, info.target.version);
                if (info.target.updateMetadata.migrations) {
                    migrationsToRun.push({
                        package: name,
                        collection: info.target.updateMetadata.migrations,
                        from: info.installed.version,
                        to: info.target.version,
                    });
                }
            }
        }
    }
    return {
        packagesToUpdate,
        migrationsToRun,
        packageInfoMap,
        registryClient,
    };
}
async function printUpdateUsageMessage(infoMap, registryClient, logger, next = false) {
    const packageGroups = new Map();
    const mappedPackages = await Promise.all(Array.from(infoMap.entries(), async ([name, info]) => {
        const distTags = info.npmPackageJson['dist-tags'] ?? {};
        let tag = next ? (distTags['next'] ? 'next' : 'latest') : 'latest';
        let version = distTags[tag] ?? info.installed.version;
        const versions = info.npmPackageJson.versions ?? [];
        const versionDiff = semver.diff(info.installed.version, version);
        if (versionDiff !== 'patch' &&
            versionDiff !== 'minor' &&
            /^@(?:angular|nguniversal)\//.test(name)) {
            const installedMajorVersion = semver.parse(info.installed.version)?.major;
            const toInstallMajorVersion = semver.parse(version)?.major;
            if (installedMajorVersion !== undefined &&
                toInstallMajorVersion !== undefined &&
                installedMajorVersion < toInstallMajorVersion - 1) {
                const nextMajorVersion = `${installedMajorVersion + 1}.`;
                const nextMajorVersions = versions
                    .filter((v) => v.startsWith(nextMajorVersion))
                    .sort((a, b) => (a > b ? -1 : 1));
                if (nextMajorVersions.length) {
                    version = nextMajorVersions[0];
                    tag = '';
                }
            }
        }
        const target = info.target?.packageJson || (await registryClient.getManifest(name, version));
        return {
            name,
            info,
            version,
            tag,
            target,
        };
    }));
    const packagesToUpdate = mappedPackages
        .filter(({ info, version, target }) => target?.['ng-update'] && semver.compare(info.installed.version, version) < 0)
        .map(({ name, info, version, tag, target }) => {
        // Look for packageGroup.
        const ngUpdate = target?.['ng-update'];
        const packageGroup = ngUpdate?.['packageGroup'];
        if (packageGroup) {
            const packageGroupNames = Array.isArray(packageGroup)
                ? packageGroup
                : Object.keys(packageGroup);
            const packageGroupName = ngUpdate?.['packageGroupName'] ||
                packageGroupNames.find((n) => infoMap.has(n));
            if (packageGroupName) {
                if (packageGroups.has(name)) {
                    return null;
                }
                for (const groupName of packageGroupNames) {
                    packageGroups.set(groupName, packageGroupName);
                }
                packageGroups.set(packageGroupName, packageGroupName);
                name = packageGroupName;
            }
        }
        let command = `ng update ${name}`;
        if (!tag) {
            command += `@${semver.parse(version)?.major || version}`;
        }
        else if (tag == 'next') {
            command += ' --next';
        }
        return [name, `${info.installed.version} -> ${version} `, command];
    })
        .filter((x) => x !== null)
        .sort((a, b) => a[0].localeCompare(b[0]));
    if (packagesToUpdate.length == 0) {
        logger.info('We analyzed your package.json and everything seems to be in order. Good work!');
        return;
    }
    logger.info('We analyzed your package.json, there are some packages to update:\n');
    // Find the largest name to know the padding needed.
    let namePad = Math.max(...[...infoMap.keys()].map((x) => x.length)) + 2;
    if (!Number.isFinite(namePad)) {
        namePad = 30;
    }
    const pads = [namePad, 25, 0];
    logger.info('  ' + ['Name', 'Version', 'Command to update'].map((x, i) => x.padEnd(pads[i])).join(''));
    const totalWidth = pads.reduce((sum, width) => sum + width, 20);
    logger.info(` ${'-'.repeat(totalWidth)}`);
    packagesToUpdate.forEach((fields) => {
        if (!fields) {
            return;
        }
        logger.info('  ' + fields.map((x, i) => x.padEnd(pads[i])).join(''));
    });
    logger.info(`\nThere might be additional packages which don't provide 'ng update' capabilities that are outdated.\n` +
        `You can update the additional packages by running the update command of your package manager.`);
}
async function applyUpdatePlan(workspaceRoot, plan, logger) {
    const packageJsonPath = path.join(workspaceRoot, 'package.json');
    const packageJsonContent = await node_fs_1.promises.readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    const updateDependency = (deps, name, newVersion) => {
        const oldVersion = deps[name];
        const aliasPrefix = 'npm:';
        // If the dependency uses an npm package alias (e.g., "npm:registry-name@version-range"),
        // parse and reconstruct the alias with the new target version while preserving
        // the original alias registry name and any version prefix character (like ^ or ~).
        if (oldVersion.startsWith(aliasPrefix)) {
            const specifier = oldVersion.slice(aliasPrefix.length);
            const lastAtIndex = specifier.lastIndexOf('@');
            if (lastAtIndex > 0) {
                const registryName = specifier.slice(0, lastAtIndex);
                const versionRange = specifier.slice(lastAtIndex + 1);
                // Retain any semantic versioning operator prefix (e.g., ^ or ~) from the target version range.
                const execResult = /^[\^~]/.exec(versionRange);
                deps[name] =
                    `${aliasPrefix}${registryName}@${execResult ? execResult[0] : ''}${newVersion}`;
            }
            else {
                // If there's no `@` character defining a version specifier in the alias (e.g. "npm:packageName"),
                // leave it as-is without attempting to inject a version suffix.
                deps[name] = oldVersion;
            }
        }
        else {
            // Standard dependency formatting, keeping any semantic versioning operator prefix (e.g., ^ or ~).
            const execResult = /^[\^~]/.exec(oldVersion);
            deps[name] = `${execResult ? execResult[0] : ''}${newVersion}`;
        }
    };
    for (const [name, targetVersion] of plan.packagesToUpdate.entries()) {
        logger.info(`Updating package.json with dependency ${name} to version ${targetVersion}...`);
        if (packageJson.dependencies && packageJson.dependencies[name]) {
            updateDependency(packageJson.dependencies, name, targetVersion);
            if (packageJson.devDependencies) {
                delete packageJson.devDependencies[name];
            }
            if (packageJson.peerDependencies) {
                delete packageJson.peerDependencies[name];
            }
        }
        else if (packageJson.devDependencies && packageJson.devDependencies[name]) {
            updateDependency(packageJson.devDependencies, name, targetVersion);
            if (packageJson.peerDependencies) {
                delete packageJson.peerDependencies[name];
            }
        }
        else if (packageJson.peerDependencies && packageJson.peerDependencies[name]) {
            updateDependency(packageJson.peerDependencies, name, targetVersion);
        }
        else {
            if (!packageJson.dependencies) {
                packageJson.dependencies = {};
            }
            packageJson.dependencies[name] = `^${targetVersion}`;
        }
    }
    const eofMatches = packageJsonContent.match(/\r?\n$/);
    const eof = eofMatches?.[0] ?? '';
    const newContent = JSON.stringify(packageJson, null, 2) + eof;
    await node_fs_1.promises.writeFile(packageJsonPath, newContent, 'utf8');
}
//# sourceMappingURL=update-resolver.js.map