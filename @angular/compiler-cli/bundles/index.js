
      import {createRequire as __cjsCompatRequire} from 'module';
      const require = __cjsCompatRequire(import.meta.url);
    
import {
  DEFAULT_ERROR_CODE,
  EmitFlags,
  NgtscProgram,
  SOURCE,
  UNKNOWN_ERROR_CODE,
  calcProjectFileAndBasePath,
  createCompilerHost,
  createProgram,
  defaultGatherDiagnostics,
  exitCodeFromResult,
  formatDiagnostics,
  isTsDiagnostic,
  performCompilation,
  readConfiguration
} from "./chunk-JTB6ADF4.js";
import {
  ConsoleLogger,
  LogLevel
} from "./chunk-SEJGUMO2.js";
import {
  DecoratorType,
  DocsExtractor,
  EntryType,
  MemberTags,
  MemberType,
  NgCompiler,
  NgCompilerHost,
  PatchedProgramIncrementalBuildStrategy,
  TrackedIncrementalBuildStrategy,
  freshCompilationTicket,
  incrementalFromCompilerTicket,
  incrementalFromStateTicket,
  isDocEntryWithSourceInfo,
  resourceChangeTicket
} from "./chunk-VG44FWYM.js";
import {
  AbsoluteSourceSpan,
  IdentifierKind
} from "./chunk-NRQWINXV.js";
import {
  ActivePerfRecorder,
  InliningMode,
  PerfPhase,
  TsCreateProgramDriver,
  angularJitApplicationTransform,
  getAngularDecorators,
  getDownlevelDecoratorsTransform,
  getInitializerApiJitTransform,
  isShim
} from "./chunk-COHPTPZ2.js";
import {
  CompletionKind,
  Environment,
  ErrorCode,
  ExpressionIdentifier,
  ImportManager,
  MetaKind,
  OptimizeFor,
  PotentialImportKind,
  PotentialImportMode,
  Reference,
  RegistryDomSchemaChecker,
  SymbolBuilder,
  SymbolKind,
  findFirstMatchingNode,
  getRootDirs,
  hasExpressionIdentifier,
  isExternalResource,
  isFatalDiagnosticError,
  isLocalCompilationDiagnostics,
  isNamedClassDeclaration,
  ngErrorCode
} from "./chunk-SOEVA7UL.js";
import "./chunk-ZUYMYKXC.js";
import {
  InvalidFileSystem,
  LogicalFileSystem,
  LogicalProjectPath,
  NgtscCompilerHost,
  absoluteFrom,
  absoluteFromSourceFile,
  basename,
  createFileSystemTsReadDirectoryFn,
  dirname,
  getFileSystem,
  getSourceFileOrError,
  isLocalRelativePath,
  isRoot,
  isRooted,
  join,
  relative,
  relativeFrom,
  resolve,
  setFileSystem,
  toRelativeImport
} from "./chunk-UTWH365F.js";
import {
  NodeJSFileSystem
} from "./chunk-KWAGEHJJ.js";
import "./chunk-IEBNHER4.js";

// packages/compiler-cli/src/version.js
import { Version } from "@angular/compiler";
var VERSION = new Version("22.1.1");

// packages/compiler-cli/private/tooling.js
var GLOBAL_DEFS_FOR_TERSER = {
  ngDevMode: false,
  ngI18nClosureMode: false
};
var GLOBAL_DEFS_FOR_TERSER_WITH_AOT = {
  ...GLOBAL_DEFS_FOR_TERSER,
  ngJitMode: false
};
var constructorParametersDownlevelTransform = (program, isCore = false) => {
  return angularJitApplicationTransform(program, isCore);
};

// packages/compiler-cli/src/ngtsc/tsc_plugin.js
var NgTscPlugin = class {
  ngOptions;
  name = "ngtsc";
  options = null;
  host = null;
  _compiler = null;
  get compiler() {
    if (this._compiler === null) {
      throw new Error("Lifecycle error: setupCompilation() must be called first.");
    }
    return this._compiler;
  }
  constructor(ngOptions) {
    this.ngOptions = ngOptions;
    setFileSystem(new NodeJSFileSystem());
  }
  wrapHost(host, inputFiles, options) {
    this.options = { ...this.ngOptions, ...options };
    this.host = NgCompilerHost.wrap(
      host,
      inputFiles,
      this.options,
      /* oldProgram */
      null
    );
    return this.host;
  }
  setupCompilation(program, oldProgram) {
    const perfRecorder = ActivePerfRecorder.zeroedToNow();
    if (this.host === null || this.options === null) {
      throw new Error("Lifecycle error: setupCompilation() before wrapHost().");
    }
    this.host.postProgramCreationCleanup();
    const programDriver = new TsCreateProgramDriver(program, this.host, this.options, this.host.shimExtensionPrefixes);
    const strategy = new PatchedProgramIncrementalBuildStrategy();
    const oldState = oldProgram !== void 0 ? strategy.getIncrementalState(oldProgram) : null;
    let ticket;
    const modifiedResourceFiles = /* @__PURE__ */ new Set();
    if (this.host.getModifiedResourceFiles !== void 0) {
      for (const resourceFile of this.host.getModifiedResourceFiles() ?? []) {
        modifiedResourceFiles.add(resolve(resourceFile));
      }
    }
    if (oldProgram === void 0 || oldState === null) {
      ticket = freshCompilationTicket(
        program,
        this.options,
        strategy,
        programDriver,
        perfRecorder,
        /* enableTemplateTypeChecker */
        false,
        /* usePoisonedData */
        false
      );
    } else {
      strategy.toNextBuildStrategy().getIncrementalState(oldProgram);
      ticket = incrementalFromStateTicket(oldProgram, oldState, program, this.options, strategy, programDriver, modifiedResourceFiles, perfRecorder, false, false);
    }
    this._compiler = NgCompiler.fromTicket(ticket, this.host);
    return {
      ignoreForDiagnostics: this._compiler.ignoreForDiagnostics,
      ignoreForEmit: this._compiler.ignoreForEmit
    };
  }
  getDiagnostics(file) {
    if (file === void 0) {
      return this.compiler.getDiagnostics();
    }
    return this.compiler.getDiagnosticsForFile(file, OptimizeFor.WholeProgram);
  }
  getOptionDiagnostics() {
    return this.compiler.getOptionDiagnostics();
  }
  getNextProgram() {
    return this.compiler.getCurrentProgram();
  }
  createTransformers() {
    this.compiler.perfRecorder.phase(PerfPhase.TypeScriptEmit);
    return this.compiler.prepareEmit().transformers;
  }
};

// packages/compiler-cli/index.ts
setFileSystem(new NodeJSFileSystem());
export {
  AbsoluteSourceSpan,
  CompletionKind,
  ConsoleLogger,
  DEFAULT_ERROR_CODE,
  DecoratorType,
  DocsExtractor,
  EmitFlags,
  EntryType,
  Environment,
  ErrorCode,
  ExpressionIdentifier,
  GLOBAL_DEFS_FOR_TERSER,
  GLOBAL_DEFS_FOR_TERSER_WITH_AOT,
  IdentifierKind,
  ImportManager,
  InliningMode,
  InvalidFileSystem,
  LogLevel,
  LogicalFileSystem,
  LogicalProjectPath,
  MemberTags,
  MemberType,
  MetaKind,
  NgCompiler,
  NgTscPlugin,
  NgtscCompilerHost,
  NgtscProgram,
  NodeJSFileSystem,
  OptimizeFor,
  PerfPhase,
  PotentialImportKind,
  PotentialImportMode,
  Reference,
  RegistryDomSchemaChecker,
  SOURCE,
  SymbolBuilder,
  SymbolKind,
  TrackedIncrementalBuildStrategy,
  UNKNOWN_ERROR_CODE,
  VERSION,
  absoluteFrom,
  absoluteFromSourceFile,
  angularJitApplicationTransform,
  basename,
  calcProjectFileAndBasePath,
  constructorParametersDownlevelTransform,
  createCompilerHost,
  createFileSystemTsReadDirectoryFn,
  createProgram,
  defaultGatherDiagnostics,
  dirname,
  exitCodeFromResult,
  findFirstMatchingNode,
  formatDiagnostics,
  freshCompilationTicket,
  getAngularDecorators,
  getDownlevelDecoratorsTransform,
  getFileSystem,
  getInitializerApiJitTransform,
  getRootDirs,
  getSourceFileOrError,
  hasExpressionIdentifier,
  incrementalFromCompilerTicket,
  isDocEntryWithSourceInfo,
  isExternalResource,
  isFatalDiagnosticError,
  isLocalCompilationDiagnostics,
  isLocalRelativePath,
  isNamedClassDeclaration,
  isRoot,
  isRooted,
  isShim,
  isTsDiagnostic,
  join,
  ngErrorCode,
  performCompilation,
  readConfiguration,
  relative,
  relativeFrom,
  resolve,
  resourceChangeTicket,
  setFileSystem,
  toRelativeImport
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
//# sourceMappingURL=index.js.map
