
      import {createRequire as __cjsCompatRequire} from 'module';
      const require = __cjsCompatRequire(import.meta.url);
    
import {
  NgCompiler,
  NgCompilerHost,
  TrackedIncrementalBuildStrategy,
  freshCompilationTicket,
  incrementalFromCompilerTicket
} from "./chunk-VG44FWYM.js";
import {
  ActivePerfRecorder,
  PerfCheckpoint,
  PerfEvent,
  PerfPhase,
  TsCreateProgramDriver,
  retagAllTsFiles
} from "./chunk-COHPTPZ2.js";
import {
  OptimizeFor,
  replaceTsWithNgInErrors
} from "./chunk-SOEVA7UL.js";
import {
  absoluteFrom,
  createFileSystemTsReadDirectoryFn,
  getFileSystem,
  resolve
} from "./chunk-UTWH365F.js";

// packages/compiler-cli/src/transformers/api.js
var DEFAULT_ERROR_CODE = 100;
var UNKNOWN_ERROR_CODE = 500;
var SOURCE = "angular";
function isTsDiagnostic(diagnostic) {
  return diagnostic != null && diagnostic.source !== "angular";
}
var EmitFlags;
(function(EmitFlags2) {
  EmitFlags2[EmitFlags2["DTS"] = 1] = "DTS";
  EmitFlags2[EmitFlags2["JS"] = 2] = "JS";
  EmitFlags2[EmitFlags2["Metadata"] = 4] = "Metadata";
  EmitFlags2[EmitFlags2["I18nBundle"] = 8] = "I18nBundle";
  EmitFlags2[EmitFlags2["Codegen"] = 16] = "Codegen";
  EmitFlags2[EmitFlags2["Default"] = 19] = "Default";
  EmitFlags2[EmitFlags2["All"] = 31] = "All";
})(EmitFlags || (EmitFlags = {}));

// packages/compiler-cli/src/transformers/compiler_host.js
import ts from "typescript";
var wrapHostForTest = null;
function createCompilerHost({ options, tsHost = ts.createCompilerHost(options, true) }) {
  if (wrapHostForTest !== null) {
    tsHost = wrapHostForTest(tsHost);
  }
  return tsHost;
}

// packages/compiler-cli/src/ngtsc/program.js
import { HtmlParser, MessageBundle } from "@angular/compiler";
import ts3 from "typescript";

// packages/compiler-cli/src/transformers/i18n.js
import { Xliff, Xliff2, Xmb } from "@angular/compiler";
import * as path from "path";
function i18nGetExtension(formatName) {
  const format = formatName.toLowerCase();
  switch (format) {
    case "xmb":
      return "xmb";
    case "xlf":
    case "xlif":
    case "xliff":
    case "xlf2":
    case "xliff2":
      return "xlf";
  }
  throw new Error(`Unsupported format "${formatName}"`);
}
function i18nExtract(formatName, outFile, host, options, bundle, pathResolve = path.resolve) {
  formatName = formatName || "xlf";
  const ext = i18nGetExtension(formatName);
  const content = i18nSerialize(bundle, formatName, options);
  const dstFile = outFile || `messages.${ext}`;
  const dstPath = pathResolve(options.outDir || options.basePath, dstFile);
  host.writeFile(dstPath, content, false, void 0, []);
  return [dstPath];
}
function i18nSerialize(bundle, formatName, options) {
  const format = formatName.toLowerCase();
  let serializer;
  switch (format) {
    case "xmb":
      serializer = new Xmb();
      break;
    case "xliff2":
    case "xlf2":
      serializer = new Xliff2();
      break;
    case "xlf":
    case "xliff":
    default:
      serializer = new Xliff();
  }
  return bundle.write(serializer, getPathNormalizer(options.basePath));
}
function getPathNormalizer(basePath) {
  return (sourcePath) => {
    sourcePath = basePath ? path.relative(basePath, sourcePath) : sourcePath;
    return sourcePath.split(path.sep).join("/");
  };
}

// packages/compiler-cli/src/typescript_support.js
import ts2 from "typescript";

// packages/compiler-cli/src/version_helpers.js
function toNumbers(value) {
  const suffixIndex = value.lastIndexOf("-");
  return value.slice(0, suffixIndex === -1 ? value.length : suffixIndex).split(".").map((segment) => {
    const parsed = parseInt(segment, 10);
    if (isNaN(parsed)) {
      throw Error(`Unable to parse version string ${value}.`);
    }
    return parsed;
  });
}
function compareNumbers(a, b) {
  const max = Math.max(a.length, b.length);
  const min = Math.min(a.length, b.length);
  for (let i = 0; i < min; i++) {
    if (a[i] > b[i])
      return 1;
    if (a[i] < b[i])
      return -1;
  }
  if (min !== max) {
    const longestArray = a.length === max ? a : b;
    const comparisonResult = a.length === max ? 1 : -1;
    for (let i = min; i < max; i++) {
      if (longestArray[i] > 0) {
        return comparisonResult;
      }
    }
  }
  return 0;
}
function compareVersions(v1, v2) {
  return compareNumbers(toNumbers(v1), toNumbers(v2));
}

// packages/compiler-cli/src/typescript_support.js
var MIN_TS_VERSION = "6.0.0";
var MAX_TS_VERSION = "6.1.0";
var tsVersion = ts2.version;
function checkVersion(version, minVersion, maxVersion) {
  if (compareVersions(version, minVersion) < 0 || compareVersions(version, maxVersion) >= 0) {
    throw new Error(`The Angular Compiler requires TypeScript >=${minVersion} and <${maxVersion} but ${version} was found instead.`);
  }
}
function verifySupportedTypeScriptVersion() {
  checkVersion(tsVersion, MIN_TS_VERSION, MAX_TS_VERSION);
}

// packages/compiler-cli/src/ngtsc/program.js
var NgtscProgram = class {
  options;
  compiler;
  /**
   * The primary TypeScript program, which is used for analysis and emit.
   */
  tsProgram;
  host;
  incrementalStrategy;
  constructor(rootNames, options, delegateHost, oldProgram) {
    this.options = options;
    const perfRecorder = ActivePerfRecorder.zeroedToNow();
    perfRecorder.phase(PerfPhase.Setup);
    if (!options.disableTypeScriptVersionCheck) {
      verifySupportedTypeScriptVersion();
    }
    if (options.compilationMode === "experimental-local") {
      options.noEmitOnError = false;
    }
    const reuseProgram = oldProgram?.compiler.getCurrentProgram();
    this.host = NgCompilerHost.wrap(delegateHost, rootNames, options, reuseProgram ?? null);
    if (reuseProgram !== void 0) {
      retagAllTsFiles(reuseProgram);
    }
    this.tsProgram = perfRecorder.inPhase(PerfPhase.TypeScriptProgramCreate, () => ts3.createProgram(this.host.inputFiles, options, this.host, reuseProgram));
    perfRecorder.phase(PerfPhase.Unaccounted);
    perfRecorder.memory(PerfCheckpoint.TypeScriptProgramCreate);
    this.host.postProgramCreationCleanup();
    const programDriver = new TsCreateProgramDriver(this.tsProgram, this.host, this.options, this.host.shimExtensionPrefixes);
    this.incrementalStrategy = oldProgram !== void 0 ? oldProgram.incrementalStrategy.toNextBuildStrategy() : new TrackedIncrementalBuildStrategy();
    const modifiedResourceFiles = /* @__PURE__ */ new Set();
    if (this.host.getModifiedResourceFiles !== void 0) {
      const strings = this.host.getModifiedResourceFiles();
      if (strings !== void 0) {
        for (const fileString of strings) {
          modifiedResourceFiles.add(absoluteFrom(fileString));
        }
      }
    }
    let ticket;
    if (oldProgram === void 0) {
      ticket = freshCompilationTicket(
        this.tsProgram,
        options,
        this.incrementalStrategy,
        programDriver,
        perfRecorder,
        /* enableTemplateTypeChecker */
        false,
        /* usePoisonedData */
        false
      );
    } else {
      ticket = incrementalFromCompilerTicket(oldProgram.compiler, this.tsProgram, this.incrementalStrategy, programDriver, modifiedResourceFiles, perfRecorder);
    }
    this.compiler = NgCompiler.fromTicket(ticket, this.host);
  }
  getTsProgram() {
    return this.tsProgram;
  }
  getReuseTsProgram() {
    return this.compiler.getCurrentProgram();
  }
  getTsOptionDiagnostics(cancellationToken) {
    return this.compiler.perfRecorder.inPhase(PerfPhase.TypeScriptDiagnostics, () => this.tsProgram.getOptionsDiagnostics(cancellationToken));
  }
  getTsSyntacticDiagnostics(sourceFile, cancellationToken) {
    return this.compiler.perfRecorder.inPhase(PerfPhase.TypeScriptDiagnostics, () => {
      const ignoredFiles = this.compiler.ignoreForDiagnostics;
      let res;
      if (sourceFile !== void 0) {
        if (ignoredFiles.has(sourceFile)) {
          return [];
        }
        res = this.tsProgram.getSyntacticDiagnostics(sourceFile, cancellationToken);
      } else {
        const diagnostics = [];
        for (const sf of this.tsProgram.getSourceFiles()) {
          if (!ignoredFiles.has(sf)) {
            diagnostics.push(...this.tsProgram.getSyntacticDiagnostics(sf, cancellationToken));
          }
        }
        res = diagnostics;
      }
      return res;
    });
  }
  getTsSemanticDiagnostics(sourceFile, cancellationToken) {
    if (this.options.compilationMode === "experimental-local") {
      return [];
    }
    return this.compiler.perfRecorder.inPhase(PerfPhase.TypeScriptDiagnostics, () => {
      const ignoredFiles = this.compiler.ignoreForDiagnostics;
      let res;
      if (sourceFile !== void 0) {
        if (ignoredFiles.has(sourceFile)) {
          return [];
        }
        res = this.tsProgram.getSemanticDiagnostics(sourceFile, cancellationToken);
      } else {
        const diagnostics = [];
        for (const sf of this.tsProgram.getSourceFiles()) {
          if (!ignoredFiles.has(sf)) {
            diagnostics.push(...this.tsProgram.getSemanticDiagnostics(sf, cancellationToken));
          }
        }
        res = diagnostics;
      }
      return res;
    });
  }
  getNgOptionDiagnostics(cancellationToken) {
    return this.compiler.getOptionDiagnostics();
  }
  getNgStructuralDiagnostics(cancellationToken) {
    return [];
  }
  getNgSemanticDiagnostics(fileName, cancellationToken) {
    let sf = void 0;
    if (fileName !== void 0) {
      sf = this.tsProgram.getSourceFile(fileName);
      if (sf === void 0) {
        return [];
      }
    }
    if (sf === void 0) {
      return this.compiler.getDiagnostics();
    } else {
      return this.compiler.getDiagnosticsForFile(sf, OptimizeFor.WholeProgram);
    }
  }
  /**
   * Ensure that the `NgCompiler` has properly analyzed the program, and allow for the asynchronous
   * loading of any resources during the process.
   *
   * This is used by the Angular CLI to allow for spawning (async) child compilations for things
   * like SASS files used in `styleUrls`.
   */
  loadNgStructureAsync() {
    return this.compiler.analyzeAsync();
  }
  listLazyRoutes(entryRoute) {
    return [];
  }
  emitXi18n() {
    const ctx = new MessageBundle(new HtmlParser(), [], {}, this.options.i18nOutLocale ?? null, this.options.i18nPreserveWhitespaceForLegacyExtraction);
    this.compiler.xi18n(ctx);
    i18nExtract(this.options.i18nOutFormat ?? null, this.options.i18nOutFile ?? null, this.host, this.options, ctx, resolve);
  }
  emit(opts) {
    if (opts !== void 0 && opts.emitFlags !== void 0 && opts.emitFlags & EmitFlags.I18nBundle) {
      this.emitXi18n();
      if (!(opts.emitFlags & EmitFlags.JS)) {
        return {
          diagnostics: [],
          emitSkipped: true,
          emittedFiles: []
        };
      }
    }
    const forceEmit = opts?.forceEmit ?? false;
    this.compiler.perfRecorder.memory(PerfCheckpoint.PreEmit);
    const res = this.compiler.perfRecorder.inPhase(PerfPhase.TypeScriptEmit, () => {
      const { transformers } = this.compiler.prepareEmit();
      const ignoreFiles = this.compiler.ignoreForEmit;
      const emitCallback = opts?.emitCallback ?? defaultEmitCallback;
      const writeFile = (fileName, data, writeByteOrderMark, onError, sourceFiles) => {
        if (sourceFiles !== void 0) {
          for (const writtenSf of sourceFiles) {
            if (writtenSf.isDeclarationFile) {
              continue;
            }
            this.compiler.incrementalCompilation.recordSuccessfulEmit(writtenSf);
          }
        }
        this.host.writeFile(fileName, data, writeByteOrderMark, onError, sourceFiles);
      };
      const customTransforms = opts && opts.customTransformers;
      const beforeTransforms = transformers.before || [];
      const afterDeclarationsTransforms = transformers.afterDeclarations;
      if (customTransforms !== void 0 && customTransforms.beforeTs !== void 0) {
        beforeTransforms.push(...customTransforms.beforeTs);
      }
      const emitResults = [];
      for (const targetSourceFile of this.tsProgram.getSourceFiles()) {
        if (targetSourceFile.isDeclarationFile || ignoreFiles.has(targetSourceFile)) {
          continue;
        }
        if (!forceEmit && this.compiler.incrementalCompilation.safeToSkipEmit(targetSourceFile)) {
          this.compiler.perfRecorder.eventCount(PerfEvent.EmitSkipSourceFile);
          continue;
        }
        this.compiler.perfRecorder.eventCount(PerfEvent.EmitSourceFile);
        emitResults.push(emitCallback({
          targetSourceFile,
          program: this.tsProgram,
          host: this.host,
          options: this.options,
          emitOnlyDtsFiles: false,
          writeFile,
          customTransformers: {
            before: beforeTransforms,
            after: customTransforms && customTransforms.afterTs,
            afterDeclarations: afterDeclarationsTransforms
          }
        }));
      }
      this.compiler.perfRecorder.memory(PerfCheckpoint.Emit);
      return (opts && opts.mergeEmitResultsCallback || mergeEmitResults)(emitResults);
    });
    if (this.options.tracePerformance !== void 0) {
      const perf = this.compiler.perfRecorder.finalize();
      getFileSystem().writeFile(getFileSystem().resolve(this.options.tracePerformance), JSON.stringify(perf, null, 2));
    }
    return res;
  }
  getIndexedComponents() {
    return this.compiler.getIndexedComponents();
  }
  /**
   * Gets information for the current program that may be used to generate API
   * reference documentation. This includes Angular-specific information, such
   * as component inputs and outputs.
   *
   * @param entryPoint Path to the entry point for the package for which API
   *     docs should be extracted.
   */
  getApiDocumentation(entryPoint, privateModules) {
    return this.compiler.getApiDocumentation(entryPoint, privateModules);
  }
  getEmittedSourceFiles() {
    throw new Error("Method not implemented.");
  }
};
var defaultEmitCallback = ({ program, targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers }) => program.emit(targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers);
function mergeEmitResults(emitResults) {
  const diagnostics = [];
  let emitSkipped = false;
  const emittedFiles = [];
  for (const er of emitResults) {
    diagnostics.push(...er.diagnostics);
    emitSkipped = emitSkipped || er.emitSkipped;
    emittedFiles.push(...er.emittedFiles || []);
  }
  return { diagnostics, emitSkipped, emittedFiles };
}

// packages/compiler-cli/src/transformers/program.js
function createProgram({ rootNames, options, host, oldProgram }) {
  return new NgtscProgram(rootNames, options, host, oldProgram);
}

// packages/compiler-cli/src/perform_compile.js
import ts5 from "typescript";

// packages/compiler-cli/src/transformers/util.js
import ts4 from "typescript";
function createMessageDiagnostic(messageText) {
  return {
    file: void 0,
    start: void 0,
    length: void 0,
    category: ts4.DiagnosticCategory.Message,
    messageText,
    code: DEFAULT_ERROR_CODE,
    source: SOURCE
  };
}

// packages/compiler-cli/src/perform_compile.js
var defaultFormatHost = {
  getCurrentDirectory: () => ts5.sys.getCurrentDirectory(),
  getCanonicalFileName: (fileName) => fileName,
  getNewLine: () => ts5.sys.newLine
};
function formatDiagnostics(diags, host = defaultFormatHost) {
  if (diags && diags.length) {
    return diags.map((diagnostic) => replaceTsWithNgInErrors(ts5.formatDiagnosticsWithColorAndContext([diagnostic], host))).join("");
  } else {
    return "";
  }
}
function calcProjectFileAndBasePath(project, host = getFileSystem()) {
  const absProject = host.resolve(project);
  const projectIsDir = host.lstat(absProject).isDirectory();
  const projectFile = projectIsDir ? host.join(absProject, "tsconfig.json") : absProject;
  const projectDir = projectIsDir ? absProject : host.dirname(absProject);
  const basePath = host.resolve(projectDir);
  return { projectFile, basePath };
}
function readConfiguration(project, existingOptions, host = getFileSystem()) {
  try {
    const fs = getFileSystem();
    const readConfigFile = (configFile) => ts5.readConfigFile(configFile, (file) => host.readFile(host.resolve(file)));
    const readAngularCompilerOptions = (configFile, parentOptions = {}) => {
      const { config: config2, error: error2 } = readConfigFile(configFile);
      if (error2) {
        return parentOptions;
      }
      const angularCompilerOptions = config2.angularCompilerOptions ?? config2.bazelOptions?.angularCompilerOptions;
      let existingNgCompilerOptions = { ...angularCompilerOptions, ...parentOptions };
      if (!config2.extends) {
        return existingNgCompilerOptions;
      }
      const extendsPaths = typeof config2.extends === "string" ? [config2.extends] : config2.extends;
      return [...extendsPaths].reverse().reduce((prevOptions, extendsPath) => {
        const extendedConfigPath = getExtendedConfigPath(configFile, extendsPath, host, fs);
        return extendedConfigPath === null ? prevOptions : readAngularCompilerOptions(extendedConfigPath, prevOptions);
      }, existingNgCompilerOptions);
    };
    const { projectFile, basePath } = calcProjectFileAndBasePath(project, host);
    const configFileName = host.resolve(host.pwd(), projectFile);
    const { config, error } = readConfigFile(projectFile);
    if (error) {
      return {
        project,
        errors: [error],
        rootNames: [],
        options: {},
        emitFlags: EmitFlags.Default
      };
    }
    const existingCompilerOptions = {
      genDir: basePath,
      basePath,
      ...readAngularCompilerOptions(configFileName),
      ...existingOptions
    };
    const parseConfigHost = createParseConfigHost(host, fs);
    const { options, errors, fileNames: rootNames, projectReferences } = ts5.parseJsonConfigFileContent(config, parseConfigHost, basePath, existingCompilerOptions, configFileName);
    let emitFlags = EmitFlags.Default;
    if (!(options["skipMetadataEmit"] || options["flatModuleOutFile"])) {
      emitFlags |= EmitFlags.Metadata;
    }
    if (options["skipTemplateCodegen"]) {
      emitFlags = emitFlags & ~EmitFlags.Codegen;
    }
    return { project: projectFile, rootNames, projectReferences, options, errors, emitFlags };
  } catch (e) {
    const errors = [
      {
        category: ts5.DiagnosticCategory.Error,
        messageText: e.stack ?? e.message,
        file: void 0,
        start: void 0,
        length: void 0,
        source: "angular",
        code: UNKNOWN_ERROR_CODE
      }
    ];
    return { project: "", errors, rootNames: [], options: {}, emitFlags: EmitFlags.Default };
  }
}
function createParseConfigHost(host, fs = getFileSystem()) {
  return {
    fileExists: host.exists.bind(host),
    readDirectory: createFileSystemTsReadDirectoryFn(fs),
    readFile: host.readFile.bind(host),
    useCaseSensitiveFileNames: fs.isCaseSensitive()
  };
}
function getExtendedConfigPath(configFile, extendsValue, host, fs) {
  const result = getExtendedConfigPathWorker(configFile, extendsValue, host, fs);
  if (result !== null) {
    return result;
  }
  return getExtendedConfigPathWorker(configFile, `${extendsValue}.json`, host, fs);
}
function getExtendedConfigPathWorker(configFile, extendsValue, host, fs) {
  if (extendsValue.startsWith(".") || fs.isRooted(extendsValue)) {
    const extendedConfigPath = host.resolve(host.dirname(configFile), extendsValue);
    if (host.exists(extendedConfigPath)) {
      return extendedConfigPath;
    }
  } else {
    const parseConfigHost = createParseConfigHost(host, fs);
    const { resolvedModule } = ts5.nodeModuleNameResolver(extendsValue, configFile, { moduleResolution: ts5.ModuleResolutionKind.NodeNext, resolveJsonModule: true }, parseConfigHost);
    if (resolvedModule) {
      return absoluteFrom(resolvedModule.resolvedFileName);
    }
  }
  return null;
}
function exitCodeFromResult(diags) {
  if (!diags)
    return 0;
  if (diags.every((diag) => diag.category !== ts5.DiagnosticCategory.Error)) {
    return 0;
  }
  return diags.some((d) => d.source === "angular" && d.code === UNKNOWN_ERROR_CODE) ? 2 : 1;
}
function performCompilation({ rootNames, options, host, oldProgram, emitCallback, mergeEmitResultsCallback, gatherDiagnostics = defaultGatherDiagnostics, customTransformers, emitFlags = EmitFlags.Default, forceEmit = false, modifiedResourceFiles = null }) {
  let program;
  let emitResult;
  let allDiagnostics = [];
  try {
    if (!host) {
      host = createCompilerHost({ options });
    }
    if (modifiedResourceFiles) {
      host.getModifiedResourceFiles = () => modifiedResourceFiles;
    }
    program = createProgram({ rootNames, host, options, oldProgram });
    const beforeDiags = Date.now();
    allDiagnostics.push(...gatherDiagnostics(program));
    if (options.diagnostics) {
      const afterDiags = Date.now();
      allDiagnostics.push(createMessageDiagnostic(`Time for diagnostics: ${afterDiags - beforeDiags}ms.`));
    }
    if (!hasErrors(allDiagnostics)) {
      emitResult = program.emit({
        emitCallback,
        mergeEmitResultsCallback,
        customTransformers,
        emitFlags,
        forceEmit
      });
      allDiagnostics.push(...emitResult.diagnostics);
      return { diagnostics: allDiagnostics, program, emitResult };
    }
    return { diagnostics: allDiagnostics, program };
  } catch (e) {
    program = void 0;
    allDiagnostics.push({
      category: ts5.DiagnosticCategory.Error,
      messageText: e.stack ?? e.message,
      code: UNKNOWN_ERROR_CODE,
      file: void 0,
      start: void 0,
      length: void 0
    });
    return { diagnostics: allDiagnostics, program };
  }
}
function defaultGatherDiagnostics(program) {
  const allDiagnostics = [];
  function checkDiagnostics(diags) {
    if (diags) {
      allDiagnostics.push(...diags);
      return !hasErrors(diags);
    }
    return true;
  }
  let checkOtherDiagnostics = true;
  checkOtherDiagnostics = checkOtherDiagnostics && checkDiagnostics([...program.getTsOptionDiagnostics(), ...program.getNgOptionDiagnostics()]);
  checkOtherDiagnostics = checkOtherDiagnostics && checkDiagnostics(program.getTsSyntacticDiagnostics());
  checkOtherDiagnostics = checkOtherDiagnostics && checkDiagnostics([
    ...program.getTsSemanticDiagnostics(),
    ...program.getNgStructuralDiagnostics()
  ]);
  checkOtherDiagnostics = checkOtherDiagnostics && checkDiagnostics(program.getNgSemanticDiagnostics());
  return allDiagnostics;
}
function hasErrors(diags) {
  return diags.some((d) => d.category === ts5.DiagnosticCategory.Error);
}

export {
  DEFAULT_ERROR_CODE,
  UNKNOWN_ERROR_CODE,
  SOURCE,
  isTsDiagnostic,
  EmitFlags,
  createCompilerHost,
  NgtscProgram,
  createProgram,
  createMessageDiagnostic,
  formatDiagnostics,
  calcProjectFileAndBasePath,
  readConfiguration,
  exitCodeFromResult,
  performCompilation,
  defaultGatherDiagnostics
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
//# sourceMappingURL=chunk-JTB6ADF4.js.map
