
      import {createRequire as __cjsCompatRequire} from 'module';
      const require = __cjsCompatRequire(import.meta.url);
    
import {
  Context,
  ExpressionTranslatorVisitor
} from "./chunk-ZUYMYKXC.js";
import {
  LogicalProjectPath,
  absoluteFrom,
  absoluteFromSourceFile,
  dirname,
  getFileSystem,
  relative,
  resolve,
  stripExtension,
  toRelativeImport
} from "./chunk-UTWH365F.js";

// packages/compiler-cli/src/ngtsc/diagnostics/src/error_code.js
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2[ErrorCode2["DECORATOR_ARG_NOT_LITERAL"] = 1001] = "DECORATOR_ARG_NOT_LITERAL";
  ErrorCode2[ErrorCode2["DECORATOR_ARITY_WRONG"] = 1002] = "DECORATOR_ARITY_WRONG";
  ErrorCode2[ErrorCode2["DECORATOR_NOT_CALLED"] = 1003] = "DECORATOR_NOT_CALLED";
  ErrorCode2[ErrorCode2["DECORATOR_UNEXPECTED"] = 1005] = "DECORATOR_UNEXPECTED";
  ErrorCode2[ErrorCode2["DECORATOR_COLLISION"] = 1006] = "DECORATOR_COLLISION";
  ErrorCode2[ErrorCode2["VALUE_HAS_WRONG_TYPE"] = 1010] = "VALUE_HAS_WRONG_TYPE";
  ErrorCode2[ErrorCode2["VALUE_NOT_LITERAL"] = 1011] = "VALUE_NOT_LITERAL";
  ErrorCode2[ErrorCode2["DUPLICATE_DECORATED_PROPERTIES"] = 1012] = "DUPLICATE_DECORATED_PROPERTIES";
  ErrorCode2[ErrorCode2["INITIALIZER_API_WITH_DISALLOWED_DECORATOR"] = 1050] = "INITIALIZER_API_WITH_DISALLOWED_DECORATOR";
  ErrorCode2[ErrorCode2["INITIALIZER_API_DECORATOR_METADATA_COLLISION"] = 1051] = "INITIALIZER_API_DECORATOR_METADATA_COLLISION";
  ErrorCode2[ErrorCode2["INITIALIZER_API_NO_REQUIRED_FUNCTION"] = 1052] = "INITIALIZER_API_NO_REQUIRED_FUNCTION";
  ErrorCode2[ErrorCode2["INITIALIZER_API_DISALLOWED_MEMBER_VISIBILITY"] = 1053] = "INITIALIZER_API_DISALLOWED_MEMBER_VISIBILITY";
  ErrorCode2[ErrorCode2["DUPLICATE_BINDING_NAME"] = 1054] = "DUPLICATE_BINDING_NAME";
  ErrorCode2[ErrorCode2["INCORRECTLY_DECLARED_ON_STATIC_MEMBER"] = 1100] = "INCORRECTLY_DECLARED_ON_STATIC_MEMBER";
  ErrorCode2[ErrorCode2["COMPONENT_MISSING_TEMPLATE"] = 2001] = "COMPONENT_MISSING_TEMPLATE";
  ErrorCode2[ErrorCode2["PIPE_MISSING_NAME"] = 2002] = "PIPE_MISSING_NAME";
  ErrorCode2[ErrorCode2["PARAM_MISSING_TOKEN"] = 2003] = "PARAM_MISSING_TOKEN";
  ErrorCode2[ErrorCode2["DIRECTIVE_MISSING_SELECTOR"] = 2004] = "DIRECTIVE_MISSING_SELECTOR";
  ErrorCode2[ErrorCode2["UNDECORATED_PROVIDER"] = 2005] = "UNDECORATED_PROVIDER";
  ErrorCode2[ErrorCode2["DIRECTIVE_INHERITS_UNDECORATED_CTOR"] = 2006] = "DIRECTIVE_INHERITS_UNDECORATED_CTOR";
  ErrorCode2[ErrorCode2["UNDECORATED_CLASS_USING_ANGULAR_FEATURES"] = 2007] = "UNDECORATED_CLASS_USING_ANGULAR_FEATURES";
  ErrorCode2[ErrorCode2["COMPONENT_RESOURCE_NOT_FOUND"] = 2008] = "COMPONENT_RESOURCE_NOT_FOUND";
  ErrorCode2[ErrorCode2["COMPONENT_INVALID_SHADOW_DOM_SELECTOR"] = 2009] = "COMPONENT_INVALID_SHADOW_DOM_SELECTOR";
  ErrorCode2[ErrorCode2["COMPONENT_NOT_STANDALONE"] = 2010] = "COMPONENT_NOT_STANDALONE";
  ErrorCode2[ErrorCode2["COMPONENT_IMPORT_NOT_STANDALONE"] = 2011] = "COMPONENT_IMPORT_NOT_STANDALONE";
  ErrorCode2[ErrorCode2["COMPONENT_UNKNOWN_IMPORT"] = 2012] = "COMPONENT_UNKNOWN_IMPORT";
  ErrorCode2[ErrorCode2["HOST_DIRECTIVE_INVALID"] = 2013] = "HOST_DIRECTIVE_INVALID";
  ErrorCode2[ErrorCode2["HOST_DIRECTIVE_NOT_STANDALONE"] = 2014] = "HOST_DIRECTIVE_NOT_STANDALONE";
  ErrorCode2[ErrorCode2["HOST_DIRECTIVE_COMPONENT"] = 2015] = "HOST_DIRECTIVE_COMPONENT";
  ErrorCode2[ErrorCode2["INJECTABLE_INHERITS_INVALID_CONSTRUCTOR"] = 2016] = "INJECTABLE_INHERITS_INVALID_CONSTRUCTOR";
  ErrorCode2[ErrorCode2["HOST_DIRECTIVE_UNDEFINED_BINDING"] = 2017] = "HOST_DIRECTIVE_UNDEFINED_BINDING";
  ErrorCode2[ErrorCode2["HOST_DIRECTIVE_CONFLICTING_ALIAS"] = 2018] = "HOST_DIRECTIVE_CONFLICTING_ALIAS";
  ErrorCode2[ErrorCode2["HOST_DIRECTIVE_MISSING_REQUIRED_BINDING"] = 2019] = "HOST_DIRECTIVE_MISSING_REQUIRED_BINDING";
  ErrorCode2[ErrorCode2["CONFLICTING_INPUT_TRANSFORM"] = 2020] = "CONFLICTING_INPUT_TRANSFORM";
  ErrorCode2[ErrorCode2["COMPONENT_INVALID_STYLE_URLS"] = 2021] = "COMPONENT_INVALID_STYLE_URLS";
  ErrorCode2[ErrorCode2["COMPONENT_UNKNOWN_DEFERRED_IMPORT"] = 2022] = "COMPONENT_UNKNOWN_DEFERRED_IMPORT";
  ErrorCode2[ErrorCode2["NON_STANDALONE_NOT_ALLOWED"] = 2023] = "NON_STANDALONE_NOT_ALLOWED";
  ErrorCode2[ErrorCode2["MISSING_NAMED_TEMPLATE_DEPENDENCY"] = 2024] = "MISSING_NAMED_TEMPLATE_DEPENDENCY";
  ErrorCode2[ErrorCode2["INCORRECT_NAMED_TEMPLATE_DEPENDENCY_TYPE"] = 2025] = "INCORRECT_NAMED_TEMPLATE_DEPENDENCY_TYPE";
  ErrorCode2[ErrorCode2["UNSUPPORTED_SELECTORLESS_COMPONENT_FIELD"] = 2026] = "UNSUPPORTED_SELECTORLESS_COMPONENT_FIELD";
  ErrorCode2[ErrorCode2["COMPONENT_ANIMATIONS_CONFLICT"] = 2027] = "COMPONENT_ANIMATIONS_CONFLICT";
  ErrorCode2[ErrorCode2["SERVICE_CONSTRUCTOR_DI"] = 2028] = "SERVICE_CONSTRUCTOR_DI";
  ErrorCode2[ErrorCode2["SYMBOL_NOT_EXPORTED"] = 3001] = "SYMBOL_NOT_EXPORTED";
  ErrorCode2[ErrorCode2["IMPORT_CYCLE_DETECTED"] = 3003] = "IMPORT_CYCLE_DETECTED";
  ErrorCode2[ErrorCode2["IMPORT_GENERATION_FAILURE"] = 3004] = "IMPORT_GENERATION_FAILURE";
  ErrorCode2[ErrorCode2["CONFIG_FLAT_MODULE_NO_INDEX"] = 4001] = "CONFIG_FLAT_MODULE_NO_INDEX";
  ErrorCode2[ErrorCode2["CONFIG_STRICT_TEMPLATES_IMPLIES_FULL_TEMPLATE_TYPECHECK"] = 4002] = "CONFIG_STRICT_TEMPLATES_IMPLIES_FULL_TEMPLATE_TYPECHECK";
  ErrorCode2[ErrorCode2["CONFIG_EXTENDED_DIAGNOSTICS_IMPLIES_STRICT_TEMPLATES"] = 4003] = "CONFIG_EXTENDED_DIAGNOSTICS_IMPLIES_STRICT_TEMPLATES";
  ErrorCode2[ErrorCode2["CONFIG_EXTENDED_DIAGNOSTICS_UNKNOWN_CATEGORY_LABEL"] = 4004] = "CONFIG_EXTENDED_DIAGNOSTICS_UNKNOWN_CATEGORY_LABEL";
  ErrorCode2[ErrorCode2["CONFIG_EXTENDED_DIAGNOSTICS_UNKNOWN_CHECK"] = 4005] = "CONFIG_EXTENDED_DIAGNOSTICS_UNKNOWN_CHECK";
  ErrorCode2[ErrorCode2["CONFIG_EMIT_DECLARATION_ONLY_UNSUPPORTED"] = 4006] = "CONFIG_EMIT_DECLARATION_ONLY_UNSUPPORTED";
  ErrorCode2[ErrorCode2["HOST_BINDING_PARSE_ERROR"] = 5001] = "HOST_BINDING_PARSE_ERROR";
  ErrorCode2[ErrorCode2["TEMPLATE_PARSE_ERROR"] = 5002] = "TEMPLATE_PARSE_ERROR";
  ErrorCode2[ErrorCode2["NGMODULE_INVALID_DECLARATION"] = 6001] = "NGMODULE_INVALID_DECLARATION";
  ErrorCode2[ErrorCode2["NGMODULE_INVALID_IMPORT"] = 6002] = "NGMODULE_INVALID_IMPORT";
  ErrorCode2[ErrorCode2["NGMODULE_INVALID_EXPORT"] = 6003] = "NGMODULE_INVALID_EXPORT";
  ErrorCode2[ErrorCode2["NGMODULE_INVALID_REEXPORT"] = 6004] = "NGMODULE_INVALID_REEXPORT";
  ErrorCode2[ErrorCode2["NGMODULE_MODULE_WITH_PROVIDERS_MISSING_GENERIC"] = 6005] = "NGMODULE_MODULE_WITH_PROVIDERS_MISSING_GENERIC";
  ErrorCode2[ErrorCode2["NGMODULE_REEXPORT_NAME_COLLISION"] = 6006] = "NGMODULE_REEXPORT_NAME_COLLISION";
  ErrorCode2[ErrorCode2["NGMODULE_DECLARATION_NOT_UNIQUE"] = 6007] = "NGMODULE_DECLARATION_NOT_UNIQUE";
  ErrorCode2[ErrorCode2["NGMODULE_DECLARATION_IS_STANDALONE"] = 6008] = "NGMODULE_DECLARATION_IS_STANDALONE";
  ErrorCode2[ErrorCode2["NGMODULE_BOOTSTRAP_IS_STANDALONE"] = 6009] = "NGMODULE_BOOTSTRAP_IS_STANDALONE";
  ErrorCode2[ErrorCode2["WARN_NGMODULE_ID_UNNECESSARY"] = 6100] = "WARN_NGMODULE_ID_UNNECESSARY";
  ErrorCode2[ErrorCode2["SCHEMA_INVALID_ELEMENT"] = 8001] = "SCHEMA_INVALID_ELEMENT";
  ErrorCode2[ErrorCode2["SCHEMA_INVALID_ATTRIBUTE"] = 8002] = "SCHEMA_INVALID_ATTRIBUTE";
  ErrorCode2[ErrorCode2["MISSING_REFERENCE_TARGET"] = 8003] = "MISSING_REFERENCE_TARGET";
  ErrorCode2[ErrorCode2["MISSING_PIPE"] = 8004] = "MISSING_PIPE";
  ErrorCode2[ErrorCode2["WRITE_TO_READ_ONLY_VARIABLE"] = 8005] = "WRITE_TO_READ_ONLY_VARIABLE";
  ErrorCode2[ErrorCode2["DUPLICATE_VARIABLE_DECLARATION"] = 8006] = "DUPLICATE_VARIABLE_DECLARATION";
  ErrorCode2[ErrorCode2["SPLIT_TWO_WAY_BINDING"] = 8007] = "SPLIT_TWO_WAY_BINDING";
  ErrorCode2[ErrorCode2["MISSING_REQUIRED_INPUTS"] = 8008] = "MISSING_REQUIRED_INPUTS";
  ErrorCode2[ErrorCode2["ILLEGAL_FOR_LOOP_TRACK_ACCESS"] = 8009] = "ILLEGAL_FOR_LOOP_TRACK_ACCESS";
  ErrorCode2[ErrorCode2["INACCESSIBLE_DEFERRED_TRIGGER_ELEMENT"] = 8010] = "INACCESSIBLE_DEFERRED_TRIGGER_ELEMENT";
  ErrorCode2[ErrorCode2["CONTROL_FLOW_PREVENTING_CONTENT_PROJECTION"] = 8011] = "CONTROL_FLOW_PREVENTING_CONTENT_PROJECTION";
  ErrorCode2[ErrorCode2["DEFERRED_PIPE_USED_EAGERLY"] = 8012] = "DEFERRED_PIPE_USED_EAGERLY";
  ErrorCode2[ErrorCode2["DEFERRED_DIRECTIVE_USED_EAGERLY"] = 8013] = "DEFERRED_DIRECTIVE_USED_EAGERLY";
  ErrorCode2[ErrorCode2["DEFERRED_DEPENDENCY_IMPORTED_EAGERLY"] = 8014] = "DEFERRED_DEPENDENCY_IMPORTED_EAGERLY";
  ErrorCode2[ErrorCode2["ILLEGAL_LET_WRITE"] = 8015] = "ILLEGAL_LET_WRITE";
  ErrorCode2[ErrorCode2["LET_USED_BEFORE_DEFINITION"] = 8016] = "LET_USED_BEFORE_DEFINITION";
  ErrorCode2[ErrorCode2["CONFLICTING_LET_DECLARATION"] = 8017] = "CONFLICTING_LET_DECLARATION";
  ErrorCode2[ErrorCode2["UNCLAIMED_DIRECTIVE_BINDING"] = 8018] = "UNCLAIMED_DIRECTIVE_BINDING";
  ErrorCode2[ErrorCode2["DEFER_IMPLICIT_TRIGGER_MISSING_PLACEHOLDER"] = 8019] = "DEFER_IMPLICIT_TRIGGER_MISSING_PLACEHOLDER";
  ErrorCode2[ErrorCode2["DEFER_IMPLICIT_TRIGGER_INVALID_PLACEHOLDER"] = 8020] = "DEFER_IMPLICIT_TRIGGER_INVALID_PLACEHOLDER";
  ErrorCode2[ErrorCode2["DEFER_TRIGGER_MISCONFIGURATION"] = 8021] = "DEFER_TRIGGER_MISCONFIGURATION";
  ErrorCode2[ErrorCode2["FORM_FIELD_UNSUPPORTED_BINDING"] = 8022] = "FORM_FIELD_UNSUPPORTED_BINDING";
  ErrorCode2[ErrorCode2["MULTIPLE_MATCHING_COMPONENTS"] = 8023] = "MULTIPLE_MATCHING_COMPONENTS";
  ErrorCode2[ErrorCode2["CONFLICTING_HOST_DIRECTIVE_BINDING"] = -8024] = "CONFLICTING_HOST_DIRECTIVE_BINDING";
  ErrorCode2[ErrorCode2["FOREIGN_COMPONENT_UNSUPPORTED_BINDING"] = 8025] = "FOREIGN_COMPONENT_UNSUPPORTED_BINDING";
  ErrorCode2[ErrorCode2["INVALID_CONTENT_PLACEMENT"] = 8026] = "INVALID_CONTENT_PLACEMENT";
  ErrorCode2[ErrorCode2["FOREIGN_COMPONENT_CONTENT_UNNECESSARY_FOR_CHILDREN"] = 8027] = "FOREIGN_COMPONENT_CONTENT_UNNECESSARY_FOR_CHILDREN";
  ErrorCode2[ErrorCode2["CONFLICTING_CONTENT_DECLARATION"] = 8028] = "CONFLICTING_CONTENT_DECLARATION";
  ErrorCode2[ErrorCode2["CONFLICTING_CONTENT_AND_PROPERTY"] = 8029] = "CONFLICTING_CONTENT_AND_PROPERTY";
  ErrorCode2[ErrorCode2["INVALID_BANANA_IN_BOX"] = 8101] = "INVALID_BANANA_IN_BOX";
  ErrorCode2[ErrorCode2["NULLISH_COALESCING_NOT_NULLABLE"] = 8102] = "NULLISH_COALESCING_NOT_NULLABLE";
  ErrorCode2[ErrorCode2["MISSING_CONTROL_FLOW_DIRECTIVE"] = 8103] = "MISSING_CONTROL_FLOW_DIRECTIVE";
  ErrorCode2[ErrorCode2["TEXT_ATTRIBUTE_NOT_BINDING"] = 8104] = "TEXT_ATTRIBUTE_NOT_BINDING";
  ErrorCode2[ErrorCode2["MISSING_NGFOROF_LET"] = 8105] = "MISSING_NGFOROF_LET";
  ErrorCode2[ErrorCode2["SUFFIX_NOT_SUPPORTED"] = 8106] = "SUFFIX_NOT_SUPPORTED";
  ErrorCode2[ErrorCode2["OPTIONAL_CHAIN_NOT_NULLABLE"] = 8107] = "OPTIONAL_CHAIN_NOT_NULLABLE";
  ErrorCode2[ErrorCode2["SKIP_HYDRATION_NOT_STATIC"] = 8108] = "SKIP_HYDRATION_NOT_STATIC";
  ErrorCode2[ErrorCode2["INTERPOLATED_SIGNAL_NOT_INVOKED"] = 8109] = "INTERPOLATED_SIGNAL_NOT_INVOKED";
  ErrorCode2[ErrorCode2["UNSUPPORTED_INITIALIZER_API_USAGE"] = 8110] = "UNSUPPORTED_INITIALIZER_API_USAGE";
  ErrorCode2[ErrorCode2["UNINVOKED_FUNCTION_IN_EVENT_BINDING"] = 8111] = "UNINVOKED_FUNCTION_IN_EVENT_BINDING";
  ErrorCode2[ErrorCode2["UNUSED_LET_DECLARATION"] = 8112] = "UNUSED_LET_DECLARATION";
  ErrorCode2[ErrorCode2["UNUSED_STANDALONE_IMPORTS"] = 8113] = "UNUSED_STANDALONE_IMPORTS";
  ErrorCode2[ErrorCode2["UNPARENTHESIZED_NULLISH_COALESCING"] = 8114] = "UNPARENTHESIZED_NULLISH_COALESCING";
  ErrorCode2[ErrorCode2["UNINVOKED_TRACK_FUNCTION"] = 8115] = "UNINVOKED_TRACK_FUNCTION";
  ErrorCode2[ErrorCode2["MISSING_STRUCTURAL_DIRECTIVE"] = 8116] = "MISSING_STRUCTURAL_DIRECTIVE";
  ErrorCode2[ErrorCode2["UNINVOKED_FUNCTION_IN_TEXT_INTERPOLATION"] = 8117] = "UNINVOKED_FUNCTION_IN_TEXT_INTERPOLATION";
  ErrorCode2[ErrorCode2["FORBIDDEN_REQUIRED_INITIALIZER_INVOCATION"] = 8118] = "FORBIDDEN_REQUIRED_INITIALIZER_INVOCATION";
  ErrorCode2[ErrorCode2["INLINE_TCB_REQUIRED"] = 8900] = "INLINE_TCB_REQUIRED";
  ErrorCode2[ErrorCode2["INLINE_TYPE_CTOR_REQUIRED"] = 8901] = "INLINE_TYPE_CTOR_REQUIRED";
  ErrorCode2[ErrorCode2["INJECTABLE_DUPLICATE_PROV"] = 9001] = "INJECTABLE_DUPLICATE_PROV";
  ErrorCode2[ErrorCode2["SUGGEST_STRICT_TEMPLATES"] = 10001] = "SUGGEST_STRICT_TEMPLATES";
  ErrorCode2[ErrorCode2["SUGGEST_SUBOPTIMAL_TYPE_INFERENCE"] = 10002] = "SUGGEST_SUBOPTIMAL_TYPE_INFERENCE";
  ErrorCode2[ErrorCode2["LOCAL_COMPILATION_UNRESOLVED_CONST"] = 11001] = "LOCAL_COMPILATION_UNRESOLVED_CONST";
  ErrorCode2[ErrorCode2["LOCAL_COMPILATION_UNSUPPORTED_EXPRESSION"] = 11003] = "LOCAL_COMPILATION_UNSUPPORTED_EXPRESSION";
})(ErrorCode || (ErrorCode = {}));

// packages/compiler-cli/src/ngtsc/diagnostics/src/util.js
var ERROR_CODE_MATCHER = /(\u001b\[\d+m ?)TS-99(\d+: ?\u001b\[\d+m)/g;
function replaceTsWithNgInErrors(errors) {
  return errors.replace(ERROR_CODE_MATCHER, "$1NG$2");
}
function ngErrorCode(code) {
  return parseInt("-99" + code);
}

// packages/compiler-cli/src/ngtsc/diagnostics/src/error.js
import ts from "typescript";
var FatalDiagnosticError = class extends Error {
  code;
  node;
  diagnosticMessage;
  relatedInformation;
  constructor(code, node, diagnosticMessage, relatedInformation) {
    super(`FatalDiagnosticError: Code: ${code}, Message: ${ts.flattenDiagnosticMessageText(diagnosticMessage, "\n")}`);
    this.code = code;
    this.node = node;
    this.diagnosticMessage = diagnosticMessage;
    this.relatedInformation = relatedInformation;
    Object.setPrototypeOf(this, new.target.prototype);
  }
  /**
   * @internal
   */
  _isFatalDiagnosticError = true;
  toDiagnostic() {
    return makeDiagnostic(this.code, this.node, this.diagnosticMessage, this.relatedInformation);
  }
};
function makeDiagnostic(code, node, messageText, relatedInformation, category = ts.DiagnosticCategory.Error) {
  node = ts.getOriginalNode(node);
  return {
    category,
    code: ngErrorCode(code),
    file: ts.getOriginalNode(node).getSourceFile(),
    start: node.getStart(void 0, false),
    length: node.getWidth(),
    messageText,
    relatedInformation
  };
}
function makeDiagnosticChain(messageText, next) {
  return {
    category: ts.DiagnosticCategory.Message,
    code: 0,
    messageText,
    next
  };
}
function makeRelatedInformation(node, messageText) {
  node = ts.getOriginalNode(node);
  return {
    category: ts.DiagnosticCategory.Message,
    code: 0,
    file: node.getSourceFile(),
    start: node.getStart(),
    length: node.getWidth(),
    messageText
  };
}
function addDiagnosticChain(messageText, add) {
  if (typeof messageText === "string") {
    return makeDiagnosticChain(messageText, add);
  }
  if (messageText.next === void 0) {
    messageText.next = add;
  } else {
    messageText.next.push(...add);
  }
  return messageText;
}
function isFatalDiagnosticError(err) {
  return err._isFatalDiagnosticError === true;
}
function isLocalCompilationDiagnostics(diagnostic) {
  return diagnostic.code === ngErrorCode(ErrorCode.LOCAL_COMPILATION_UNRESOLVED_CONST) || diagnostic.code === ngErrorCode(ErrorCode.LOCAL_COMPILATION_UNSUPPORTED_EXPRESSION);
}

// packages/compiler-cli/src/ngtsc/diagnostics/src/docs.js
var COMPILER_ERRORS_WITH_GUIDES = /* @__PURE__ */ new Set([
  ErrorCode.DECORATOR_ARG_NOT_LITERAL,
  ErrorCode.IMPORT_CYCLE_DETECTED,
  ErrorCode.PARAM_MISSING_TOKEN,
  ErrorCode.SCHEMA_INVALID_ELEMENT,
  ErrorCode.SCHEMA_INVALID_ATTRIBUTE,
  ErrorCode.MISSING_REFERENCE_TARGET,
  ErrorCode.COMPONENT_INVALID_SHADOW_DOM_SELECTOR,
  ErrorCode.WARN_NGMODULE_ID_UNNECESSARY
]);

// packages/compiler-cli/src/ngtsc/diagnostics/src/error_details_base_url.js
import { VERSION } from "@angular/compiler";
var DOC_PAGE_BASE_URL = (() => {
  const full = VERSION.full;
  const isPreRelease = full.includes("-next") || full.includes("-rc") || full === "22.1.1";
  const prefix = isPreRelease ? "next" : `v${VERSION.major}`;
  return `https://${prefix}.angular.dev`;
})();
var ERROR_DETAILS_PAGE_BASE_URL = (() => {
  return `${DOC_PAGE_BASE_URL}/errors`;
})();

// packages/compiler-cli/src/ngtsc/diagnostics/src/extended_template_diagnostic_name.js
var ExtendedTemplateDiagnosticName;
(function(ExtendedTemplateDiagnosticName2) {
  ExtendedTemplateDiagnosticName2["INVALID_BANANA_IN_BOX"] = "invalidBananaInBox";
  ExtendedTemplateDiagnosticName2["NULLISH_COALESCING_NOT_NULLABLE"] = "nullishCoalescingNotNullable";
  ExtendedTemplateDiagnosticName2["OPTIONAL_CHAIN_NOT_NULLABLE"] = "optionalChainNotNullable";
  ExtendedTemplateDiagnosticName2["MISSING_CONTROL_FLOW_DIRECTIVE"] = "missingControlFlowDirective";
  ExtendedTemplateDiagnosticName2["MISSING_STRUCTURAL_DIRECTIVE"] = "missingStructuralDirective";
  ExtendedTemplateDiagnosticName2["TEXT_ATTRIBUTE_NOT_BINDING"] = "textAttributeNotBinding";
  ExtendedTemplateDiagnosticName2["UNINVOKED_FUNCTION_IN_EVENT_BINDING"] = "uninvokedFunctionInEventBinding";
  ExtendedTemplateDiagnosticName2["MISSING_NGFOROF_LET"] = "missingNgForOfLet";
  ExtendedTemplateDiagnosticName2["SUFFIX_NOT_SUPPORTED"] = "suffixNotSupported";
  ExtendedTemplateDiagnosticName2["SKIP_HYDRATION_NOT_STATIC"] = "skipHydrationNotStatic";
  ExtendedTemplateDiagnosticName2["INTERPOLATED_SIGNAL_NOT_INVOKED"] = "interpolatedSignalNotInvoked";
  ExtendedTemplateDiagnosticName2["CONTROL_FLOW_PREVENTING_CONTENT_PROJECTION"] = "controlFlowPreventingContentProjection";
  ExtendedTemplateDiagnosticName2["UNUSED_LET_DECLARATION"] = "unusedLetDeclaration";
  ExtendedTemplateDiagnosticName2["UNINVOKED_TRACK_FUNCTION"] = "uninvokedTrackFunction";
  ExtendedTemplateDiagnosticName2["UNUSED_STANDALONE_IMPORTS"] = "unusedStandaloneImports";
  ExtendedTemplateDiagnosticName2["UNPARENTHESIZED_NULLISH_COALESCING"] = "unparenthesizedNullishCoalescing";
  ExtendedTemplateDiagnosticName2["UNINVOKED_FUNCTION_IN_TEXT_INTERPOLATION"] = "uninvokedFunctionInTextInterpolation";
  ExtendedTemplateDiagnosticName2["DEFER_TRIGGER_MISCONFIGURATION"] = "deferTriggerMisconfiguration";
})(ExtendedTemplateDiagnosticName || (ExtendedTemplateDiagnosticName = {}));

// packages/compiler-cli/src/ngtsc/util/src/typescript.js
import ts2 from "typescript";
var TS = /\.tsx?$/i;
var D_TS = /\.d\.ts$/i;
function isSymbolWithValueDeclaration(symbol) {
  return symbol != null && symbol.valueDeclaration !== void 0 && symbol.declarations !== void 0;
}
function isDtsPath(filePath) {
  return D_TS.test(filePath);
}
function isNonDeclarationTsPath(filePath) {
  return TS.test(filePath) && !D_TS.test(filePath);
}
function isFromDtsFile(node) {
  let sf = node.getSourceFile();
  if (sf === void 0) {
    sf = ts2.getOriginalNode(node).getSourceFile();
  }
  return sf !== void 0 && sf.isDeclarationFile;
}
function nodeNameForError(node) {
  if (node.name !== void 0 && ts2.isIdentifier(node.name)) {
    return node.name.text;
  } else {
    const kind = ts2.SyntaxKind[node.kind];
    const { line, character } = ts2.getLineAndCharacterOfPosition(node.getSourceFile(), node.getStart());
    return `${kind}@${line}:${character}`;
  }
}
function getSourceFile(node) {
  const directSf = node.getSourceFile();
  return directSf !== void 0 ? directSf : ts2.getOriginalNode(node).getSourceFile();
}
function getSourceFileOrNull(program, fileName) {
  return program.getSourceFile(fileName) || null;
}
function getTokenAtPosition(sf, pos) {
  return ts2.getTokenAtPosition(sf, pos);
}
function identifierOfNode(decl) {
  if (decl.name !== void 0 && ts2.isIdentifier(decl.name)) {
    return decl.name;
  } else {
    return null;
  }
}
function isDeclaration(node) {
  return isValueDeclaration(node) || isTypeDeclaration(node);
}
function isValueDeclaration(node) {
  return ts2.isClassDeclaration(node) || ts2.isFunctionDeclaration(node) || ts2.isVariableDeclaration(node);
}
function isTypeDeclaration(node) {
  return ts2.isEnumDeclaration(node) || ts2.isTypeAliasDeclaration(node) || ts2.isInterfaceDeclaration(node);
}
function isNamedDeclaration(node) {
  const namedNode = node;
  return namedNode.name !== void 0 && ts2.isIdentifier(namedNode.name);
}
function getRootDirs(host, options) {
  const rootDirs = [];
  const cwd = host.getCurrentDirectory();
  const fs = getFileSystem();
  if (options.rootDirs !== void 0) {
    rootDirs.push(...options.rootDirs);
  } else if (options.rootDir !== void 0) {
    rootDirs.push(options.rootDir);
  } else {
    rootDirs.push(cwd);
  }
  return rootDirs.map((rootDir) => fs.resolve(cwd, host.getCanonicalFileName(rootDir)));
}
function nodeDebugInfo(node) {
  const sf = getSourceFile(node);
  const { line, character } = ts2.getLineAndCharacterOfPosition(sf, node.pos);
  return `[${sf.fileName}: ${ts2.SyntaxKind[node.kind]} @ ${line}:${character}]`;
}
function resolveModuleName(moduleName, containingFile, compilerOptions, compilerHost, moduleResolutionCache) {
  if (compilerHost.resolveModuleNames) {
    return compilerHost.resolveModuleNames(
      [moduleName],
      containingFile,
      void 0,
      // reusedNames
      void 0,
      // redirectedReference
      compilerOptions
    )[0];
  } else {
    return ts2.resolveModuleName(moduleName, containingFile, compilerOptions, compilerHost, moduleResolutionCache !== null ? moduleResolutionCache : void 0).resolvedModule;
  }
}
function isAssignment(node) {
  return ts2.isBinaryExpression(node) && node.operatorToken.kind === ts2.SyntaxKind.EqualsToken;
}
function toUnredirectedSourceFile(sf) {
  const redirectInfo = sf.redirectInfo;
  if (redirectInfo === void 0) {
    return sf;
  }
  return redirectInfo.unredirected;
}

// packages/compiler-cli/src/ngtsc/imports/src/emitter.js
import { ExternalExpr, ExternalReference, WrappedNodeExpr } from "@angular/compiler";
import ts3 from "typescript";

// packages/compiler-cli/src/ngtsc/imports/src/find_export.js
function findExportedNameOfNode(target, file, reflector) {
  const exports = reflector.getExportsOfModule(file);
  if (exports === null) {
    return null;
  }
  const declaredName = isNamedDeclaration(target) ? target.name.text : null;
  let foundExportName = null;
  for (const [exportName, declaration] of exports) {
    if (declaration.node !== target) {
      continue;
    }
    if (exportName === declaredName) {
      return exportName;
    }
    foundExportName = exportName;
  }
  return foundExportName;
}

// packages/compiler-cli/src/ngtsc/imports/src/emitter.js
var ImportFlags;
(function(ImportFlags2) {
  ImportFlags2[ImportFlags2["None"] = 0] = "None";
  ImportFlags2[ImportFlags2["ForceNewImport"] = 1] = "ForceNewImport";
  ImportFlags2[ImportFlags2["NoAliasing"] = 2] = "NoAliasing";
  ImportFlags2[ImportFlags2["AllowTypeImports"] = 4] = "AllowTypeImports";
  ImportFlags2[ImportFlags2["AllowRelativeDtsImports"] = 8] = "AllowRelativeDtsImports";
  ImportFlags2[ImportFlags2["AllowAmbientReferences"] = 16] = "AllowAmbientReferences";
})(ImportFlags || (ImportFlags = {}));
var ReferenceEmitKind;
(function(ReferenceEmitKind2) {
  ReferenceEmitKind2[ReferenceEmitKind2["Success"] = 0] = "Success";
  ReferenceEmitKind2[ReferenceEmitKind2["Failed"] = 1] = "Failed";
})(ReferenceEmitKind || (ReferenceEmitKind = {}));
function assertSuccessfulReferenceEmit(result, origin, typeKind) {
  if (result.kind === ReferenceEmitKind.Success) {
    return;
  }
  const message = makeDiagnosticChain(`Unable to import ${typeKind} ${nodeNameForError(result.ref.node)}.`, [makeDiagnosticChain(result.reason)]);
  throw new FatalDiagnosticError(ErrorCode.IMPORT_GENERATION_FAILURE, origin, message, [
    makeRelatedInformation(result.ref.node, `The ${typeKind} is declared here.`)
  ]);
}
var ReferenceEmitter = class {
  strategies;
  constructor(strategies) {
    this.strategies = strategies;
  }
  emit(ref, context, importFlags = ImportFlags.None) {
    for (const strategy of this.strategies) {
      const emitted = strategy.emit(ref, context, importFlags);
      if (emitted !== null) {
        return emitted;
      }
    }
    return {
      kind: ReferenceEmitKind.Failed,
      ref,
      context,
      reason: `Unable to write a reference to ${nodeNameForError(ref.node)}.`
    };
  }
};
var LocalIdentifierStrategy = class {
  emit(ref, context, importFlags) {
    const refSf = getSourceFile(ref.node);
    if (importFlags & ImportFlags.ForceNewImport && refSf !== context) {
      return null;
    }
    if (!isDeclaration(ref.node) && refSf === context) {
      return {
        kind: ReferenceEmitKind.Success,
        expression: new WrappedNodeExpr(ref.node),
        importedFile: null
      };
    }
    if (ref.isAmbient && importFlags & ImportFlags.AllowAmbientReferences) {
      const identifier2 = identifierOfNode(ref.node);
      if (identifier2 !== null) {
        return {
          kind: ReferenceEmitKind.Success,
          expression: new WrappedNodeExpr(identifier2),
          importedFile: null
        };
      } else {
        return null;
      }
    }
    const identifier = ref.getIdentityIn(context);
    if (identifier !== null) {
      return {
        kind: ReferenceEmitKind.Success,
        expression: new WrappedNodeExpr(identifier),
        importedFile: null
      };
    } else {
      return null;
    }
  }
};
var AbsoluteModuleStrategy = class {
  program;
  checker;
  moduleResolver;
  reflectionHost;
  /**
   * A cache of the exports of specific modules, because resolving a module to its exports is a
   * costly operation.
   */
  moduleExportsCache = /* @__PURE__ */ new Map();
  constructor(program, checker, moduleResolver, reflectionHost) {
    this.program = program;
    this.checker = checker;
    this.moduleResolver = moduleResolver;
    this.reflectionHost = reflectionHost;
  }
  emit(ref, context, importFlags) {
    if (ref.bestGuessOwningModule === null) {
      return null;
    } else if (!isDeclaration(ref.node)) {
      throw new Error(`Debug assert: unable to import a Reference to non-declaration of type ${ts3.SyntaxKind[ref.node.kind]}.`);
    } else if ((importFlags & ImportFlags.AllowTypeImports) === 0 && isTypeDeclaration(ref.node)) {
      throw new Error(`Importing a type-only declaration of type ${ts3.SyntaxKind[ref.node.kind]} in a value position is not allowed.`);
    }
    const { specifier, resolutionContext } = ref.bestGuessOwningModule;
    const exports = this.getExportsOfModule(specifier, resolutionContext);
    if (exports.module === null) {
      return {
        kind: ReferenceEmitKind.Failed,
        ref,
        context,
        reason: `The module '${specifier}' could not be found.`
      };
    } else if (exports.exportMap === null || !exports.exportMap.has(ref.node)) {
      return {
        kind: ReferenceEmitKind.Failed,
        ref,
        context,
        reason: `The symbol is not exported from ${exports.module.fileName} (module '${specifier}').`
      };
    }
    const symbolName = exports.exportMap.get(ref.node);
    return {
      kind: ReferenceEmitKind.Success,
      expression: new ExternalExpr(new ExternalReference(specifier, symbolName)),
      importedFile: exports.module
    };
  }
  getExportsOfModule(moduleName, fromFile) {
    if (!this.moduleExportsCache.has(moduleName)) {
      this.moduleExportsCache.set(moduleName, this.enumerateExportsOfModule(moduleName, fromFile));
    }
    return this.moduleExportsCache.get(moduleName);
  }
  enumerateExportsOfModule(specifier, fromFile) {
    const entryPointFile = this.moduleResolver.resolveModule(specifier, fromFile);
    if (entryPointFile === null) {
      return { module: null, exportMap: null };
    }
    const exports = this.reflectionHost.getExportsOfModule(entryPointFile);
    if (exports === null) {
      return { module: entryPointFile, exportMap: null };
    }
    const exportMap = /* @__PURE__ */ new Map();
    for (const [name, declaration] of exports) {
      if (exportMap.has(declaration.node)) {
        const existingExport = exportMap.get(declaration.node);
        if (isNamedDeclaration(declaration.node) && declaration.node.name.text === existingExport) {
          continue;
        }
      }
      exportMap.set(declaration.node, name);
    }
    return { module: entryPointFile, exportMap };
  }
};
var LogicalProjectStrategy = class {
  reflector;
  logicalFs;
  relativePathStrategy;
  constructor(reflector, logicalFs) {
    this.reflector = reflector;
    this.logicalFs = logicalFs;
    this.relativePathStrategy = new RelativePathStrategy(this.reflector);
  }
  emit(ref, context, importFlags) {
    const destSf = getSourceFile(ref.node);
    const destPath = this.logicalFs.logicalPathOfSf(destSf);
    if (destPath === null) {
      if (destSf.isDeclarationFile && importFlags & ImportFlags.AllowRelativeDtsImports) {
        return this.relativePathStrategy.emit(ref, context);
      }
      return {
        kind: ReferenceEmitKind.Failed,
        ref,
        context,
        reason: `The file ${destSf.fileName} is outside of the configured 'rootDir'.`
      };
    }
    const originPath = this.logicalFs.logicalPathOfSf(context);
    if (originPath === null) {
      throw new Error(`Debug assert: attempt to import from ${context.fileName} but it's outside the program?`);
    }
    if (destPath === originPath) {
      return null;
    }
    const name = findExportedNameOfNode(ref.node, destSf, this.reflector);
    if (name === null) {
      return {
        kind: ReferenceEmitKind.Failed,
        ref,
        context,
        reason: `The symbol is not exported from ${destSf.fileName}.`
      };
    }
    const moduleName = LogicalProjectPath.relativePathBetween(originPath, destPath);
    return {
      kind: ReferenceEmitKind.Success,
      expression: new ExternalExpr({ moduleName, name }),
      importedFile: destSf
    };
  }
};
var RelativePathStrategy = class {
  reflector;
  constructor(reflector) {
    this.reflector = reflector;
  }
  emit(ref, context) {
    const destSf = getSourceFile(ref.node);
    const relativePath = relative(dirname(absoluteFromSourceFile(context)), absoluteFromSourceFile(destSf));
    const moduleName = toRelativeImport(stripExtension(relativePath));
    const name = findExportedNameOfNode(ref.node, destSf, this.reflector);
    if (name === null) {
      return {
        kind: ReferenceEmitKind.Failed,
        ref,
        context,
        reason: `The symbol is not exported from ${destSf.fileName}.`
      };
    }
    return {
      kind: ReferenceEmitKind.Success,
      expression: new ExternalExpr({ moduleName, name }),
      importedFile: destSf
    };
  }
};
var UnifiedModulesStrategy = class {
  reflector;
  unifiedModulesHost;
  constructor(reflector, unifiedModulesHost) {
    this.reflector = reflector;
    this.unifiedModulesHost = unifiedModulesHost;
  }
  emit(ref, context) {
    const destSf = getSourceFile(ref.node);
    const name = findExportedNameOfNode(ref.node, destSf, this.reflector);
    if (name === null) {
      return null;
    }
    const moduleName = this.unifiedModulesHost.fileNameToModuleName(destSf.fileName, context.fileName);
    return {
      kind: ReferenceEmitKind.Success,
      expression: new ExternalExpr({ moduleName, name }),
      importedFile: destSf
    };
  }
};

// packages/compiler-cli/src/ngtsc/reflection/src/util.js
import ts5 from "typescript";

// packages/compiler-cli/src/ngtsc/reflection/src/host.js
import ts4 from "typescript";
function isDecoratorIdentifier(exp) {
  return ts4.isIdentifier(exp) || ts4.isPropertyAccessExpression(exp) && ts4.isIdentifier(exp.expression) && ts4.isIdentifier(exp.name);
}
var ClassMemberKind;
(function(ClassMemberKind2) {
  ClassMemberKind2[ClassMemberKind2["Constructor"] = 0] = "Constructor";
  ClassMemberKind2[ClassMemberKind2["Getter"] = 1] = "Getter";
  ClassMemberKind2[ClassMemberKind2["Setter"] = 2] = "Setter";
  ClassMemberKind2[ClassMemberKind2["Property"] = 3] = "Property";
  ClassMemberKind2[ClassMemberKind2["Method"] = 4] = "Method";
})(ClassMemberKind || (ClassMemberKind = {}));
var ClassMemberAccessLevel;
(function(ClassMemberAccessLevel2) {
  ClassMemberAccessLevel2[ClassMemberAccessLevel2["PublicWritable"] = 0] = "PublicWritable";
  ClassMemberAccessLevel2[ClassMemberAccessLevel2["PublicReadonly"] = 1] = "PublicReadonly";
  ClassMemberAccessLevel2[ClassMemberAccessLevel2["Protected"] = 2] = "Protected";
  ClassMemberAccessLevel2[ClassMemberAccessLevel2["Private"] = 3] = "Private";
  ClassMemberAccessLevel2[ClassMemberAccessLevel2["EcmaScriptPrivate"] = 4] = "EcmaScriptPrivate";
})(ClassMemberAccessLevel || (ClassMemberAccessLevel = {}));
var AmbientImport = {};

// packages/compiler-cli/src/ngtsc/reflection/src/util.js
function isNamedClassDeclaration(node) {
  return ts5.isClassDeclaration(node) && isIdentifier(node.name);
}
function isIdentifier(node) {
  return node !== void 0 && ts5.isIdentifier(node);
}
function classMemberAccessLevelToString(level) {
  switch (level) {
    case ClassMemberAccessLevel.EcmaScriptPrivate:
      return "ES private";
    case ClassMemberAccessLevel.Private:
      return "private";
    case ClassMemberAccessLevel.Protected:
      return "protected";
    case ClassMemberAccessLevel.PublicReadonly:
      return "public readonly";
    case ClassMemberAccessLevel.PublicWritable:
    default:
      return "public";
  }
}

// packages/compiler-cli/src/ngtsc/reflection/src/typescript.js
import ts7 from "typescript";

// packages/compiler-cli/src/ngtsc/reflection/src/type_to_value.js
import ts6 from "typescript";
function typeToValue(typeNode, checker, isLocalCompilation) {
  if (typeNode === null) {
    return missingType();
  }
  if (!ts6.isTypeReferenceNode(typeNode)) {
    return unsupportedType(typeNode);
  }
  const symbols = resolveTypeSymbols(typeNode, checker);
  if (symbols === null) {
    return unknownReference(typeNode);
  }
  const { local, decl } = symbols;
  if (decl.valueDeclaration === void 0 || decl.flags & ts6.SymbolFlags.ConstEnum) {
    let typeOnlyDecl = null;
    if (decl.declarations !== void 0 && decl.declarations.length > 0) {
      typeOnlyDecl = decl.declarations[0];
    }
    if (!isLocalCompilation || typeOnlyDecl && [
      ts6.SyntaxKind.TypeParameter,
      ts6.SyntaxKind.TypeAliasDeclaration,
      ts6.SyntaxKind.InterfaceDeclaration
    ].includes(typeOnlyDecl.kind)) {
      return noValueDeclaration(typeNode, typeOnlyDecl);
    }
  }
  const firstDecl = local.declarations && local.declarations[0];
  if (firstDecl !== void 0) {
    if (ts6.isImportClause(firstDecl) && firstDecl.name !== void 0) {
      if (firstDecl.phaseModifier === ts6.SyntaxKind.TypeKeyword) {
        return typeOnlyImport(typeNode, firstDecl);
      }
      if (!ts6.isImportDeclaration(firstDecl.parent)) {
        return unsupportedType(typeNode);
      }
      return {
        kind: 0,
        expression: firstDecl.name,
        defaultImportStatement: firstDecl.parent
      };
    } else if (ts6.isImportSpecifier(firstDecl)) {
      if (firstDecl.isTypeOnly) {
        return typeOnlyImport(typeNode, firstDecl);
      }
      if (firstDecl.parent.parent.phaseModifier === ts6.SyntaxKind.TypeKeyword) {
        return typeOnlyImport(typeNode, firstDecl.parent.parent);
      }
      const importedName = (firstDecl.propertyName || firstDecl.name).text;
      const [_localName, ...nestedPath] = symbols.symbolNames;
      const importDeclaration = firstDecl.parent.parent.parent;
      if (!ts6.isImportDeclaration(importDeclaration)) {
        return unsupportedType(typeNode);
      }
      const moduleName = extractModuleName(importDeclaration);
      return {
        kind: 1,
        valueDeclaration: decl.valueDeclaration ?? null,
        moduleName,
        importedName,
        nestedPath
      };
    } else if (ts6.isNamespaceImport(firstDecl)) {
      if (firstDecl.parent.phaseModifier === ts6.SyntaxKind.TypeKeyword) {
        return typeOnlyImport(typeNode, firstDecl.parent);
      }
      if (symbols.symbolNames.length === 1) {
        return namespaceImport(typeNode, firstDecl.parent);
      }
      const [_ns, importedName, ...nestedPath] = symbols.symbolNames;
      const importDeclaration = firstDecl.parent.parent;
      if (!ts6.isImportDeclaration(importDeclaration)) {
        return unsupportedType(typeNode);
      }
      const moduleName = extractModuleName(importDeclaration);
      return {
        kind: 1,
        valueDeclaration: decl.valueDeclaration ?? null,
        moduleName,
        importedName,
        nestedPath
      };
    }
  }
  const expression = typeNodeToValueExpr(typeNode);
  if (expression !== null) {
    return {
      kind: 0,
      expression,
      defaultImportStatement: null
    };
  } else {
    return unsupportedType(typeNode);
  }
}
function unsupportedType(typeNode) {
  return {
    kind: 2,
    reason: { kind: 5, typeNode }
  };
}
function noValueDeclaration(typeNode, decl) {
  return {
    kind: 2,
    reason: { kind: 1, typeNode, decl }
  };
}
function typeOnlyImport(typeNode, node) {
  return {
    kind: 2,
    reason: { kind: 2, typeNode, node }
  };
}
function unknownReference(typeNode) {
  return {
    kind: 2,
    reason: { kind: 3, typeNode }
  };
}
function namespaceImport(typeNode, importClause) {
  return {
    kind: 2,
    reason: { kind: 4, typeNode, importClause }
  };
}
function missingType() {
  return {
    kind: 2,
    reason: {
      kind: 0
      /* ValueUnavailableKind.MISSING_TYPE */
    }
  };
}
function typeNodeToValueExpr(node) {
  if (ts6.isTypeReferenceNode(node)) {
    return entityNameToValue(node.typeName);
  } else {
    return null;
  }
}
function resolveTypeSymbols(typeRef, checker) {
  const typeName = typeRef.typeName;
  const typeRefSymbol = checker.getSymbolAtLocation(typeName);
  if (typeRefSymbol === void 0) {
    return null;
  }
  let local = typeRefSymbol;
  let leftMost = typeName;
  const symbolNames = [];
  while (ts6.isQualifiedName(leftMost)) {
    symbolNames.unshift(leftMost.right.text);
    leftMost = leftMost.left;
  }
  symbolNames.unshift(leftMost.text);
  if (leftMost !== typeName) {
    const localTmp = checker.getSymbolAtLocation(leftMost);
    if (localTmp !== void 0) {
      local = localTmp;
    }
  }
  let decl = typeRefSymbol;
  if (typeRefSymbol.flags & ts6.SymbolFlags.Alias) {
    decl = checker.getAliasedSymbol(typeRefSymbol);
  }
  return { local, decl, symbolNames };
}
function entityNameToValue(node) {
  if (ts6.isQualifiedName(node)) {
    const left = entityNameToValue(node.left);
    return left !== null ? ts6.factory.createPropertyAccessExpression(left, node.right) : null;
  } else if (ts6.isIdentifier(node)) {
    const clone = ts6.setOriginalNode(ts6.factory.createIdentifier(node.text), node);
    clone.parent = node.parent;
    return clone;
  } else {
    return null;
  }
}
function extractModuleName(node) {
  if (!ts6.isStringLiteral(node.moduleSpecifier)) {
    throw new Error("not a module specifier");
  }
  return node.moduleSpecifier.text;
}

// packages/compiler-cli/src/ngtsc/reflection/src/typescript.js
var TypeScriptReflectionHost = class {
  checker;
  isLocalCompilation;
  skipPrivateValueDeclarationTypes;
  /**
   * @param skipPrivateValueDeclarationTypes Avoids using a value declaration that is considered private (using a ɵ-prefix),
   * instead using the first available declaration. This is needed for the {@link FormControl} API of
   * which the type declaration documents the type and the value declaration corresponds with an implementation detail.
   */
  constructor(checker, isLocalCompilation = false, skipPrivateValueDeclarationTypes = false) {
    this.checker = checker;
    this.isLocalCompilation = isLocalCompilation;
    this.skipPrivateValueDeclarationTypes = skipPrivateValueDeclarationTypes;
  }
  getDecoratorsOfDeclaration(declaration) {
    const decorators = ts7.canHaveDecorators(declaration) ? ts7.getDecorators(declaration) : void 0;
    return decorators !== void 0 && decorators.length ? decorators.map((decorator) => this._reflectDecorator(decorator)).filter((dec) => dec !== null) : null;
  }
  getMembersOfClass(clazz) {
    const tsClazz = castDeclarationToClassOrDie(clazz);
    return tsClazz.members.map((member) => {
      const result = reflectClassMember(member);
      if (result === null) {
        return null;
      }
      return {
        ...result,
        decorators: this.getDecoratorsOfDeclaration(member)
      };
    }).filter((member) => member !== null);
  }
  getConstructorParameters(clazz) {
    const tsClazz = castDeclarationToClassOrDie(clazz);
    const isDeclaration2 = tsClazz.getSourceFile().isDeclarationFile;
    const ctor = tsClazz.members.find((member) => ts7.isConstructorDeclaration(member) && (isDeclaration2 || member.body !== void 0));
    if (ctor === void 0) {
      return null;
    }
    return ctor.parameters.map((node) => {
      const name = parameterName(node.name);
      const decorators = this.getDecoratorsOfDeclaration(node);
      let originalTypeNode = node.type || null;
      let typeNode = originalTypeNode;
      if (typeNode && ts7.isUnionTypeNode(typeNode)) {
        let childTypeNodes = typeNode.types.filter((childTypeNode) => !(ts7.isLiteralTypeNode(childTypeNode) && childTypeNode.literal.kind === ts7.SyntaxKind.NullKeyword));
        if (childTypeNodes.length === 1) {
          typeNode = childTypeNodes[0];
        }
      }
      const typeValueReference = typeToValue(typeNode, this.checker, this.isLocalCompilation);
      return {
        name,
        nameNode: node.name,
        typeValueReference,
        typeNode: originalTypeNode,
        decorators
      };
    });
  }
  getImportOfIdentifier(id) {
    const directImport = this.getDirectImportOfIdentifier(id);
    if (directImport !== null) {
      return directImport;
    } else if (ts7.isQualifiedName(id.parent) && id.parent.right === id) {
      return this.getImportOfNamespacedIdentifier(id, getQualifiedNameRoot(id.parent));
    } else if (ts7.isPropertyAccessExpression(id.parent) && id.parent.name === id) {
      return this.getImportOfNamespacedIdentifier(id, getFarLeftIdentifier(id.parent));
    } else {
      return null;
    }
  }
  getExportsOfModule(node) {
    if (!ts7.isSourceFile(node)) {
      throw new Error(`getExportsOfModule() called on non-SourceFile in TS code`);
    }
    const symbol = this.checker.getSymbolAtLocation(node);
    if (symbol === void 0) {
      return null;
    }
    const map = /* @__PURE__ */ new Map();
    this.checker.getExportsOfModule(symbol).forEach((exportSymbol) => {
      const decl = this.getDeclarationOfSymbol(exportSymbol, null);
      if (decl !== null) {
        map.set(exportSymbol.name, decl);
      }
    });
    return map;
  }
  isClass(node) {
    return isNamedClassDeclaration(node);
  }
  hasBaseClass(clazz) {
    return this.getBaseClassExpression(clazz) !== null;
  }
  getBaseClassExpression(clazz) {
    if (!(ts7.isClassDeclaration(clazz) || ts7.isClassExpression(clazz)) || clazz.heritageClauses === void 0) {
      return null;
    }
    const extendsClause = clazz.heritageClauses.find((clause) => clause.token === ts7.SyntaxKind.ExtendsKeyword);
    if (extendsClause === void 0) {
      return null;
    }
    const extendsType = extendsClause.types[0];
    if (extendsType === void 0) {
      return null;
    }
    return extendsType.expression;
  }
  getDeclarationOfIdentifier(id) {
    let symbol = this.checker.getSymbolAtLocation(id);
    if (symbol === void 0) {
      return null;
    }
    return this.getDeclarationOfSymbol(symbol, id);
  }
  getDefinitionOfFunction(node) {
    if (!ts7.isFunctionDeclaration(node) && !ts7.isMethodDeclaration(node) && !ts7.isFunctionExpression(node) && !ts7.isArrowFunction(node)) {
      return null;
    }
    let body = null;
    if (node.body !== void 0) {
      body = ts7.isBlock(node.body) ? Array.from(node.body.statements) : [ts7.factory.createReturnStatement(node.body)];
    }
    const type = this.checker.getTypeAtLocation(node);
    const signatures = this.checker.getSignaturesOfType(type, ts7.SignatureKind.Call);
    return {
      node,
      body,
      signatureCount: signatures.length,
      typeParameters: node.typeParameters === void 0 ? null : Array.from(node.typeParameters),
      parameters: node.parameters.map((param) => {
        const name = parameterName(param.name);
        const initializer = param.initializer || null;
        return { name, node: param, initializer, type: param.type || null };
      })
    };
  }
  getGenericArityOfClass(clazz) {
    if (!ts7.isClassDeclaration(clazz)) {
      return null;
    }
    return clazz.typeParameters !== void 0 ? clazz.typeParameters.length : 0;
  }
  getVariableValue(declaration) {
    return declaration.initializer || null;
  }
  isStaticallyExported(decl) {
    let topLevel = decl;
    if (ts7.isVariableDeclaration(decl) && ts7.isVariableDeclarationList(decl.parent)) {
      topLevel = decl.parent.parent;
    }
    const modifiers = ts7.canHaveModifiers(topLevel) ? ts7.getModifiers(topLevel) : void 0;
    if (modifiers !== void 0 && modifiers.some((modifier) => modifier.kind === ts7.SyntaxKind.ExportKeyword)) {
      return true;
    }
    if (topLevel.parent === void 0 || !ts7.isSourceFile(topLevel.parent)) {
      return false;
    }
    const localExports = this.getLocalExportedDeclarationsOfSourceFile(decl.getSourceFile());
    return localExports.has(decl);
  }
  getDirectImportOfIdentifier(id) {
    const symbol = this.checker.getSymbolAtLocation(id);
    if (symbol === void 0 || symbol.declarations === void 0 || symbol.declarations.length !== 1) {
      return null;
    }
    const decl = symbol.declarations[0];
    const importDecl = getContainingImportDeclaration(decl);
    if (importDecl === null) {
      return null;
    }
    if (!ts7.isStringLiteral(importDecl.moduleSpecifier)) {
      return null;
    }
    return {
      from: importDecl.moduleSpecifier.text,
      name: getExportedName(decl, id),
      node: importDecl
    };
  }
  /**
   * Try to get the import info for this identifier as though it is a namespaced import.
   *
   * For example, if the identifier is the `Directive` part of a qualified type chain like:
   *
   * ```ts
   * core.Directive
   * ```
   *
   * then it might be that `core` is a namespace import such as:
   *
   * ```ts
   * import * as core from 'tslib';
   * ```
   *
   * @param id the TypeScript identifier to find the import info for.
   * @returns The import info if this is a namespaced import or `null`.
   */
  getImportOfNamespacedIdentifier(id, namespaceIdentifier) {
    if (namespaceIdentifier === null) {
      return null;
    }
    const namespaceSymbol = this.checker.getSymbolAtLocation(namespaceIdentifier);
    if (!namespaceSymbol || namespaceSymbol.declarations === void 0) {
      return null;
    }
    const declaration = namespaceSymbol.declarations.length === 1 ? namespaceSymbol.declarations[0] : null;
    if (!declaration) {
      return null;
    }
    const namespaceDeclaration = ts7.isNamespaceImport(declaration) ? declaration : null;
    if (!namespaceDeclaration) {
      return null;
    }
    const importDeclaration = namespaceDeclaration.parent.parent;
    if (!ts7.isImportDeclaration(importDeclaration) || !ts7.isStringLiteral(importDeclaration.moduleSpecifier)) {
      return null;
    }
    return {
      from: importDeclaration.moduleSpecifier.text,
      name: id.text,
      node: importDeclaration
    };
  }
  /**
   * Resolve a `ts.Symbol` to its declaration, keeping track of the `viaModule` along the way.
   */
  getDeclarationOfSymbol(symbol, originalId) {
    let valueDeclaration = void 0;
    if (symbol.valueDeclaration !== void 0) {
      valueDeclaration = symbol.valueDeclaration;
    } else if (symbol.declarations !== void 0 && symbol.declarations.length > 0) {
      valueDeclaration = symbol.declarations[0];
    }
    if (valueDeclaration !== void 0 && ts7.isShorthandPropertyAssignment(valueDeclaration)) {
      const shorthandSymbol = this.checker.getShorthandAssignmentValueSymbol(valueDeclaration);
      if (shorthandSymbol === void 0) {
        return null;
      }
      return this.getDeclarationOfSymbol(shorthandSymbol, originalId);
    } else if (valueDeclaration !== void 0 && ts7.isExportSpecifier(valueDeclaration)) {
      const targetSymbol = this.checker.getExportSpecifierLocalTargetSymbol(valueDeclaration);
      if (targetSymbol === void 0) {
        return null;
      }
      return this.getDeclarationOfSymbol(targetSymbol, originalId);
    }
    const importInfo = originalId && this.getImportOfIdentifier(originalId);
    while (symbol.flags & ts7.SymbolFlags.Alias) {
      symbol = this.checker.getAliasedSymbol(symbol);
    }
    if (symbol.valueDeclaration !== void 0 && (!this.skipPrivateValueDeclarationTypes || !isPrivateSymbol(this.checker, symbol))) {
      return {
        node: symbol.valueDeclaration,
        viaModule: this._viaModule(symbol.valueDeclaration, originalId, importInfo)
      };
    } else if (symbol.declarations !== void 0 && symbol.declarations.length > 0) {
      return {
        node: symbol.declarations[0],
        viaModule: this._viaModule(symbol.declarations[0], originalId, importInfo)
      };
    } else {
      return null;
    }
  }
  _reflectDecorator(node) {
    let decoratorExpr = node.expression;
    let args = null;
    if (ts7.isCallExpression(decoratorExpr)) {
      args = Array.from(decoratorExpr.arguments);
      decoratorExpr = decoratorExpr.expression;
    }
    if (!isDecoratorIdentifier(decoratorExpr)) {
      return null;
    }
    const decoratorIdentifier = ts7.isIdentifier(decoratorExpr) ? decoratorExpr : decoratorExpr.name;
    const importDecl = this.getImportOfIdentifier(decoratorIdentifier);
    return {
      name: decoratorIdentifier.text,
      identifier: decoratorExpr,
      import: importDecl,
      node,
      args
    };
  }
  /**
   * Get the set of declarations declared in `file` which are exported.
   */
  getLocalExportedDeclarationsOfSourceFile(file) {
    const cacheSf = file;
    if (cacheSf[LocalExportedDeclarations] !== void 0) {
      return cacheSf[LocalExportedDeclarations];
    }
    const exportSet = /* @__PURE__ */ new Set();
    cacheSf[LocalExportedDeclarations] = exportSet;
    const sfSymbol = this.checker.getSymbolAtLocation(cacheSf);
    if (sfSymbol === void 0 || sfSymbol.exports === void 0) {
      return exportSet;
    }
    const iter = sfSymbol.exports.values();
    let item = iter.next();
    while (item.done !== true) {
      let exportedSymbol = item.value;
      if (exportedSymbol.flags & ts7.SymbolFlags.Alias) {
        exportedSymbol = this.checker.getAliasedSymbol(exportedSymbol);
      }
      if (exportedSymbol.valueDeclaration !== void 0 && exportedSymbol.valueDeclaration.getSourceFile() === file) {
        exportSet.add(exportedSymbol.valueDeclaration);
      }
      item = iter.next();
    }
    return exportSet;
  }
  _viaModule(declaration, originalId, importInfo) {
    if (importInfo === null && originalId !== null && declaration.getSourceFile() !== originalId.getSourceFile()) {
      return AmbientImport;
    }
    return importInfo !== null && importInfo.from !== null && !importInfo.from.startsWith(".") ? importInfo.from : null;
  }
};
var TypeEntityToDeclarationError = class extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
};
function reflectTypeEntityToDeclaration(type, checker) {
  let realSymbol = checker.getSymbolAtLocation(type);
  if (realSymbol === void 0) {
    throw new TypeEntityToDeclarationError(`Cannot resolve type entity ${type.getText()} to symbol`);
  }
  while (realSymbol.flags & ts7.SymbolFlags.Alias) {
    realSymbol = checker.getAliasedSymbol(realSymbol);
  }
  let node = null;
  if (realSymbol.valueDeclaration !== void 0) {
    node = realSymbol.valueDeclaration;
  } else if (realSymbol.declarations !== void 0 && realSymbol.declarations.length === 1) {
    node = realSymbol.declarations[0];
  } else {
    throw new TypeEntityToDeclarationError(`Cannot resolve type entity symbol to declaration`);
  }
  if (ts7.isQualifiedName(type)) {
    if (!ts7.isIdentifier(type.left)) {
      throw new TypeEntityToDeclarationError(`Cannot handle qualified name with non-identifier lhs`);
    }
    const symbol = checker.getSymbolAtLocation(type.left);
    if (symbol === void 0 || symbol.declarations === void 0 || symbol.declarations.length !== 1) {
      throw new TypeEntityToDeclarationError(`Cannot resolve qualified type entity lhs to symbol`);
    }
    const decl = symbol.declarations[0];
    if (ts7.isNamespaceImport(decl)) {
      const clause = decl.parent;
      const importDecl = clause.parent;
      if (!ts7.isStringLiteral(importDecl.moduleSpecifier)) {
        throw new TypeEntityToDeclarationError(`Module specifier is not a string`);
      }
      return { node, from: importDecl.moduleSpecifier.text };
    } else if (ts7.isModuleDeclaration(decl)) {
      return { node, from: null };
    } else {
      throw new TypeEntityToDeclarationError(`Unknown import type?`);
    }
  } else {
    return { node, from: null };
  }
}
function filterToMembersWithDecorator(members, name, module) {
  return members.filter((member) => !member.isStatic).map((member) => {
    if (member.decorators === null) {
      return null;
    }
    const decorators = member.decorators.filter((dec) => {
      if (dec.import !== null) {
        return dec.import.name === name && (module === void 0 || dec.import.from === module);
      } else {
        return dec.name === name && module === void 0;
      }
    });
    if (decorators.length === 0) {
      return null;
    }
    return { member, decorators };
  }).filter((value) => value !== null);
}
function extractModifiersOfMember(node) {
  const modifiers = ts7.getModifiers(node);
  let isStatic = false;
  let isReadonly = false;
  let accessLevel = ClassMemberAccessLevel.PublicWritable;
  if (modifiers !== void 0) {
    for (const modifier of modifiers) {
      switch (modifier.kind) {
        case ts7.SyntaxKind.StaticKeyword:
          isStatic = true;
          break;
        case ts7.SyntaxKind.PrivateKeyword:
          accessLevel = ClassMemberAccessLevel.Private;
          break;
        case ts7.SyntaxKind.ProtectedKeyword:
          accessLevel = ClassMemberAccessLevel.Protected;
          break;
        case ts7.SyntaxKind.ReadonlyKeyword:
          isReadonly = true;
          break;
      }
    }
  }
  if (isReadonly && accessLevel === ClassMemberAccessLevel.PublicWritable) {
    accessLevel = ClassMemberAccessLevel.PublicReadonly;
  }
  if (node.name !== void 0 && ts7.isPrivateIdentifier(node.name)) {
    accessLevel = ClassMemberAccessLevel.EcmaScriptPrivate;
  }
  return { accessLevel, isStatic };
}
function reflectClassMember(node) {
  let kind = null;
  let value = null;
  let name = null;
  let nameNode = null;
  if (ts7.isPropertyDeclaration(node)) {
    kind = ClassMemberKind.Property;
    value = node.initializer || null;
  } else if (ts7.isGetAccessorDeclaration(node)) {
    kind = ClassMemberKind.Getter;
  } else if (ts7.isSetAccessorDeclaration(node)) {
    kind = ClassMemberKind.Setter;
  } else if (ts7.isMethodDeclaration(node)) {
    kind = ClassMemberKind.Method;
  } else if (ts7.isConstructorDeclaration(node)) {
    kind = ClassMemberKind.Constructor;
  } else {
    return null;
  }
  if (ts7.isConstructorDeclaration(node)) {
    name = "constructor";
  } else if (ts7.isIdentifier(node.name)) {
    name = node.name.text;
    nameNode = node.name;
  } else if (ts7.isStringLiteral(node.name)) {
    name = node.name.text;
    nameNode = node.name;
  } else if (ts7.isPrivateIdentifier(node.name)) {
    name = node.name.text;
    nameNode = node.name;
  } else {
    return null;
  }
  const { accessLevel, isStatic } = extractModifiersOfMember(node);
  return {
    node,
    implementation: node,
    kind,
    type: node.type || null,
    accessLevel,
    name,
    nameNode,
    value,
    isStatic
  };
}
function reflectObjectLiteral(node) {
  const map = /* @__PURE__ */ new Map();
  node.properties.forEach((prop) => {
    if (ts7.isPropertyAssignment(prop)) {
      const name = propertyNameToString(prop.name);
      if (name === null) {
        return;
      }
      map.set(name, prop.initializer);
    } else if (ts7.isShorthandPropertyAssignment(prop)) {
      map.set(prop.name.text, prop.name);
    } else {
      return;
    }
  });
  return map;
}
function castDeclarationToClassOrDie(declaration) {
  if (!ts7.isClassDeclaration(declaration)) {
    throw new Error(`Reflecting on a ${ts7.SyntaxKind[declaration.kind]} instead of a ClassDeclaration.`);
  }
  return declaration;
}
function parameterName(name) {
  if (ts7.isIdentifier(name)) {
    return name.text;
  } else {
    return null;
  }
}
function propertyNameToString(node) {
  if (ts7.isIdentifier(node) || ts7.isStringLiteral(node) || ts7.isNumericLiteral(node)) {
    return node.text;
  } else {
    return null;
  }
}
function isPrivateSymbol(typeChecker, symbol) {
  if (symbol.valueDeclaration !== void 0) {
    const symbolType = typeChecker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
    return symbolType?.symbol?.name.startsWith("\u0275") === true;
  }
  return false;
}
function getQualifiedNameRoot(qualifiedName) {
  while (ts7.isQualifiedName(qualifiedName.left)) {
    qualifiedName = qualifiedName.left;
  }
  return ts7.isIdentifier(qualifiedName.left) ? qualifiedName.left : null;
}
function getFarLeftIdentifier(propertyAccess) {
  while (ts7.isPropertyAccessExpression(propertyAccess.expression)) {
    propertyAccess = propertyAccess.expression;
  }
  return ts7.isIdentifier(propertyAccess.expression) ? propertyAccess.expression : null;
}
function getContainingImportDeclaration(node) {
  let parent = node.parent;
  while (parent && !ts7.isSourceFile(parent)) {
    if (ts7.isImportDeclaration(parent)) {
      return parent;
    }
    parent = parent.parent;
  }
  return null;
}
function getExportedName(decl, originalId) {
  return ts7.isImportSpecifier(decl) ? (decl.propertyName !== void 0 ? decl.propertyName : decl.name).text : originalId.text;
}
var LocalExportedDeclarations = Symbol("LocalExportedDeclarations");

// packages/compiler-cli/src/ngtsc/imports/src/imported_symbols_tracker.js
import ts8 from "typescript";
var ImportedSymbolsTracker = class {
  fileToNamedImports = /* @__PURE__ */ new WeakMap();
  fileToNamespaceImports = /* @__PURE__ */ new WeakMap();
  /**
   * Checks if an identifier is a potential reference to a specific named import within the same
   * file.
   * @param node Identifier to be checked.
   * @param exportedName Name of the exported symbol that is being searched for.
   * @param moduleName Module from which the symbol should be imported.
   */
  isPotentialReferenceToNamedImport(node, exportedName, moduleName) {
    const sourceFile = node.getSourceFile();
    this.scanImports(sourceFile);
    const fileImports = this.fileToNamedImports.get(sourceFile);
    const moduleImports = fileImports.get(moduleName);
    const symbolImports = moduleImports?.get(exportedName);
    return symbolImports !== void 0 && symbolImports.has(node.text);
  }
  /**
   * Checks if an identifier is a potential reference to a specific namespace import within the same
   * file.
   * @param node Identifier to be checked.
   * @param moduleName Module from which the namespace is imported.
   */
  isPotentialReferenceToNamespaceImport(node, moduleName) {
    const sourceFile = node.getSourceFile();
    this.scanImports(sourceFile);
    const namespaces = this.fileToNamespaceImports.get(sourceFile);
    return namespaces.get(moduleName)?.has(node.text) ?? false;
  }
  /**
   * Checks if a file has a named imported of a certain symbol.
   * @param sourceFile File to be checked.
   * @param exportedName Name of the exported symbol that is being checked.
   * @param moduleName Module that exports the symbol.
   */
  hasNamedImport(sourceFile, exportedName, moduleName) {
    this.scanImports(sourceFile);
    const fileImports = this.fileToNamedImports.get(sourceFile);
    const moduleImports = fileImports.get(moduleName);
    return moduleImports !== void 0 && moduleImports.has(exportedName);
  }
  /**
   * Checks if a file has namespace imports of a certain symbol.
   * @param sourceFile File to be checked.
   * @param moduleName Module whose namespace import is being searched for.
   */
  hasNamespaceImport(sourceFile, moduleName) {
    this.scanImports(sourceFile);
    const namespaces = this.fileToNamespaceImports.get(sourceFile);
    return namespaces.has(moduleName);
  }
  /** Scans a `SourceFile` for import statements and caches them for later use. */
  scanImports(sourceFile) {
    if (this.fileToNamedImports.has(sourceFile) && this.fileToNamespaceImports.has(sourceFile)) {
      return;
    }
    const namedImports = /* @__PURE__ */ new Map();
    const namespaceImports = /* @__PURE__ */ new Map();
    this.fileToNamedImports.set(sourceFile, namedImports);
    this.fileToNamespaceImports.set(sourceFile, namespaceImports);
    for (const stmt of sourceFile.statements) {
      if (!ts8.isImportDeclaration(stmt) || !ts8.isStringLiteralLike(stmt.moduleSpecifier) || stmt.importClause?.namedBindings === void 0) {
        continue;
      }
      const moduleName = stmt.moduleSpecifier.text;
      if (ts8.isNamespaceImport(stmt.importClause.namedBindings)) {
        if (!namespaceImports.has(moduleName)) {
          namespaceImports.set(moduleName, /* @__PURE__ */ new Set());
        }
        namespaceImports.get(moduleName).add(stmt.importClause.namedBindings.name.text);
      } else {
        for (const element of stmt.importClause.namedBindings.elements) {
          const localName = element.name.text;
          const exportedName = element.propertyName === void 0 ? localName : element.propertyName.text;
          if (!namedImports.has(moduleName)) {
            namedImports.set(moduleName, /* @__PURE__ */ new Map());
          }
          const localNames = namedImports.get(moduleName);
          if (!localNames.has(exportedName)) {
            localNames.set(exportedName, /* @__PURE__ */ new Set());
          }
          localNames.get(exportedName)?.add(localName);
        }
      }
    }
  }
};

// packages/compiler-cli/src/ngtsc/imports/src/references.js
var Reference = class _Reference {
  node;
  /**
   * The compiler's best guess at an absolute module specifier which owns this `Reference`.
   *
   * This is usually determined by tracking the import statements which led the compiler to a given
   * node. If any of these imports are absolute, it's an indication that the node being imported
   * might come from that module.
   *
   * It is not _guaranteed_ that the node in question is exported from its `bestGuessOwningModule` -
   * that is mostly a convention that applies in certain package formats.
   *
   * If `bestGuessOwningModule` is `null`, then it's likely the node came from the current program.
   */
  bestGuessOwningModule;
  identifiers = [];
  /**
   * Indicates that the Reference was created synthetically, not as a result of natural value
   * resolution.
   *
   * This is used to avoid misinterpreting the Reference in certain contexts.
   */
  synthetic = false;
  _alias = null;
  isAmbient;
  key;
  constructor(node, bestGuessOwningModule = null) {
    this.node = node;
    if (bestGuessOwningModule === AmbientImport) {
      this.isAmbient = true;
      this.bestGuessOwningModule = null;
    } else {
      this.isAmbient = false;
      this.bestGuessOwningModule = bestGuessOwningModule;
    }
    const id = identifierOfNode(node);
    const sourceFile = getSourceFile(node);
    if (id !== null) {
      this.identifiers.push(id);
    }
    if (sourceFile) {
      this.key = `${sourceFile.fileName}#${node.getStart()}`;
    } else {
      const position = id && id.getSourceFile() ? id.getStart() : null;
      this.key = `${this.bestGuessOwningModule?.specifier}#${id?.text}#${position}`;
    }
  }
  /**
   * The best guess at which module specifier owns this particular reference, or `null` if there
   * isn't one.
   */
  get ownedByModuleGuess() {
    if (this.bestGuessOwningModule !== null) {
      return this.bestGuessOwningModule.specifier;
    } else {
      return null;
    }
  }
  /**
   * Whether this reference has a potential owning module or not.
   *
   * See `bestGuessOwningModule`.
   */
  get hasOwningModuleGuess() {
    return this.bestGuessOwningModule !== null;
  }
  /**
   * A name for the node, if one is available.
   *
   * This is only suited for debugging. Any actual references to this node should be made with
   * `ts.Identifier`s (see `getIdentityIn`).
   */
  get debugName() {
    const id = identifierOfNode(this.node);
    return id !== null ? id.text : null;
  }
  get alias() {
    return this._alias;
  }
  /**
   * Record a `ts.Identifier` by which it's valid to refer to this node, within the context of this
   * `Reference`.
   */
  addIdentifier(identifier) {
    this.identifiers.push(identifier);
  }
  /**
   * Get a `ts.Identifier` within this `Reference` that can be used to refer within the context of a
   * given `ts.SourceFile`, if any.
   */
  getIdentityIn(context) {
    return this.identifiers.find((id) => id.getSourceFile() === context) || null;
  }
  /**
   * Get a `ts.Identifier` for this `Reference` that exists within the given expression.
   *
   * This is very useful for producing `ts.Diagnostic`s that reference `Reference`s that were
   * extracted from some larger expression, as it can be used to pinpoint the `ts.Identifier` within
   * the expression from which the `Reference` originated.
   */
  getIdentityInExpression(expr) {
    const sf = expr.getSourceFile();
    return this.identifiers.find((id) => {
      if (id.getSourceFile() !== sf) {
        return false;
      }
      return id.pos >= expr.pos && id.end <= expr.end;
    }) || null;
  }
  /**
   * Given the 'container' expression from which this `Reference` was extracted, produce a
   * `ts.Expression` to use in a diagnostic which best indicates the position within the container
   * expression that generated the `Reference`.
   *
   * For example, given a `Reference` to the class 'Bar' and the containing expression:
   * `[Foo, Bar, Baz]`, this function would attempt to return the `ts.Identifier` for `Bar` within
   * the array. This could be used to produce a nice diagnostic context:
   *
   * ```text
   * [Foo, Bar, Baz]
   *       ~~~
   * ```
   *
   * If no specific node can be found, then the `fallback` expression is used, which defaults to the
   * entire containing expression.
   */
  getOriginForDiagnostics(container, fallback = container) {
    const id = this.getIdentityInExpression(container);
    return id !== null ? id : fallback;
  }
  cloneWithAlias(alias) {
    const ref = new _Reference(this.node, this.isAmbient ? AmbientImport : this.bestGuessOwningModule);
    ref.identifiers = [...this.identifiers];
    ref._alias = alias;
    return ref;
  }
  cloneWithNoIdentifiers() {
    const ref = new _Reference(this.node, this.isAmbient ? AmbientImport : this.bestGuessOwningModule);
    ref._alias = this._alias;
    ref.identifiers = [];
    return ref;
  }
};

// packages/compiler-cli/src/ngtsc/imports/src/alias.js
import { ExternalExpr as ExternalExpr2 } from "@angular/compiler";
var CHARS_TO_ESCAPE = /[^a-zA-Z0-9/_]/g;
var UnifiedModulesAliasingHost = class {
  unifiedModulesHost;
  constructor(unifiedModulesHost) {
    this.unifiedModulesHost = unifiedModulesHost;
  }
  /**
   * With a `UnifiedModulesHost`, aliases are chosen automatically without the need to look through
   * the exports present in a .d.ts file, so we can avoid cluttering the .d.ts files.
   */
  aliasExportsInDts = false;
  maybeAliasSymbolAs(ref, context, ngModuleName, isReExport) {
    if (!isReExport) {
      return null;
    }
    return this.aliasName(ref.node, context);
  }
  /**
   * Generates an `Expression` to import `decl` from `via`, assuming an export was added when `via`
   * was compiled per `maybeAliasSymbolAs` above.
   */
  getAliasIn(decl, via, isReExport) {
    if (!isReExport) {
      return null;
    }
    const moduleName = this.unifiedModulesHost.fileNameToModuleName(via.fileName, via.fileName);
    return new ExternalExpr2({ moduleName, name: this.aliasName(decl, via) });
  }
  /**
   * Generates an alias name based on the full module name of the file which declares the aliased
   * directive/pipe.
   */
  aliasName(decl, context) {
    const declModule = this.unifiedModulesHost.fileNameToModuleName(decl.getSourceFile().fileName, context.fileName);
    const replaced = declModule.replace(CHARS_TO_ESCAPE, "_").replace(/\//g, "$");
    return "\u0275ng$" + replaced + "$$" + decl.name.text;
  }
};
var PrivateExportAliasingHost = class {
  host;
  constructor(host) {
    this.host = host;
  }
  /**
   * Under private export aliasing, the `AbsoluteModuleStrategy` used for emitting references will
   * will select aliased exports that it finds in the .d.ts file for an NgModule's file. Thus,
   * emitting these exports in .d.ts is a requirement for the `PrivateExportAliasingHost` to
   * function correctly.
   */
  aliasExportsInDts = true;
  maybeAliasSymbolAs(ref, context, ngModuleName) {
    if (ref.hasOwningModuleGuess) {
      return null;
    }
    const exports = this.host.getExportsOfModule(context);
    if (exports === null) {
      throw new Error(`Could not determine the exports of: ${context.fileName}`);
    }
    let found = false;
    exports.forEach((value) => {
      if (value.node === ref.node) {
        found = true;
      }
    });
    if (found) {
      return null;
    }
    return `\u0275ngExport\u0275${ngModuleName}\u0275${ref.node.name.text}`;
  }
  /**
   * A `PrivateExportAliasingHost` only generates re-exports and does not direct the compiler to
   * directly consume the aliases it creates.
   *
   * Instead, they're consumed indirectly: `AbsoluteModuleStrategy` `ReferenceEmitterStrategy` will
   * select these alias exports automatically when looking for an export of the directive/pipe from
   * the same path as the NgModule was imported.
   *
   * Thus, `getAliasIn` always returns `null`.
   */
  getAliasIn() {
    return null;
  }
};
var AliasStrategy = class {
  emit(ref, context, importMode) {
    if (importMode & ImportFlags.NoAliasing || ref.alias === null) {
      return null;
    }
    return {
      kind: ReferenceEmitKind.Success,
      expression: ref.alias,
      importedFile: "unknown"
    };
  }
};

// packages/compiler-cli/src/ngtsc/util/src/path.js
function relativePathBetween(from, to) {
  const relativePath = stripExtension(relative(dirname(resolve(from)), resolve(to)));
  return relativePath !== "" ? toRelativeImport(relativePath) : null;
}
function normalizeSeparators(path) {
  return path.replace(/\\/g, "/");
}
function getProjectRelativePath(fileName, rootDirs, compilerHost) {
  const filePath = compilerHost.getCanonicalFileName(fileName);
  for (const rootDir of rootDirs) {
    const rel = relative(compilerHost.getCanonicalFileName(rootDir), filePath);
    if (!rel.startsWith("..")) {
      return rel;
    }
  }
  return null;
}

// packages/compiler-cli/src/ngtsc/imports/src/core.js
var NoopImportRewriter = class {
  rewriteSymbol(symbol, specifier) {
    return symbol;
  }
  rewriteSpecifier(specifier, inContextOfFile) {
    return specifier;
  }
  rewriteNamespaceImportIdentifier(specifier) {
    return specifier;
  }
};
var CORE_SUPPORTED_SYMBOLS = /* @__PURE__ */ new Map([
  ["\u0275\u0275defineInjectable", "\u0275\u0275defineInjectable"],
  ["\u0275\u0275defineService", "\u0275\u0275defineService"],
  ["\u0275\u0275defineInjector", "\u0275\u0275defineInjector"],
  ["\u0275\u0275defineNgModule", "\u0275\u0275defineNgModule"],
  ["\u0275\u0275setNgModuleScope", "\u0275\u0275setNgModuleScope"],
  ["\u0275\u0275inject", "\u0275\u0275inject"],
  ["\u0275\u0275FactoryDeclaration", "\u0275\u0275FactoryDeclaration"],
  ["\u0275setClassMetadata", "setClassMetadata"],
  ["\u0275setClassMetadataAsync", "setClassMetadataAsync"],
  ["\u0275\u0275InjectableDeclaration", "\u0275\u0275InjectableDeclaration"],
  ["\u0275\u0275InjectorDeclaration", "\u0275\u0275InjectorDeclaration"],
  ["\u0275\u0275NgModuleDeclaration", "\u0275\u0275NgModuleDeclaration"],
  ["\u0275NgModuleFactory", "NgModuleFactory"],
  ["\u0275noSideEffects", "\u0275noSideEffects"]
]);
var CORE_MODULE = "@angular/core";
var R3SymbolsImportRewriter = class {
  r3SymbolsPath;
  constructor(r3SymbolsPath) {
    this.r3SymbolsPath = r3SymbolsPath;
  }
  rewriteSymbol(symbol, specifier) {
    if (specifier !== CORE_MODULE) {
      return symbol;
    }
    return validateAndRewriteCoreSymbol(symbol);
  }
  rewriteSpecifier(specifier, inContextOfFile) {
    if (specifier !== CORE_MODULE) {
      return specifier;
    }
    const relativePathToR3Symbols = relativePathBetween(inContextOfFile, this.r3SymbolsPath);
    if (relativePathToR3Symbols === null) {
      throw new Error(`Failed to rewrite import inside ${CORE_MODULE}: ${inContextOfFile} -> ${this.r3SymbolsPath}`);
    }
    return relativePathToR3Symbols;
  }
  rewriteNamespaceImportIdentifier(specifier) {
    return specifier;
  }
};
function validateAndRewriteCoreSymbol(name) {
  if (!CORE_SUPPORTED_SYMBOLS.has(name)) {
    throw new Error(`Importing unexpected symbol ${name} while compiling ${CORE_MODULE}`);
  }
  return CORE_SUPPORTED_SYMBOLS.get(name);
}

// packages/compiler-cli/src/ngtsc/imports/src/patch_alias_reference_resolution.js
import ts9 from "typescript";
var patchedReferencedAliasesSymbol = Symbol("patchedReferencedAliases");
function loadIsReferencedAliasDeclarationPatch(context) {
  if (!isTransformationContextWithEmitResolver(context)) {
    throwIncompatibleTransformationContextError();
  }
  const emitResolver = context.getEmitResolver();
  if (emitResolver === void 0) {
    return null;
  }
  const existingReferencedAliases = emitResolver[patchedReferencedAliasesSymbol];
  if (existingReferencedAliases !== void 0) {
    return existingReferencedAliases;
  }
  const originalIsReferencedAliasDeclaration = emitResolver.isReferencedAliasDeclaration;
  if (originalIsReferencedAliasDeclaration === void 0) {
    throwIncompatibleTransformationContextError();
  }
  const referencedAliases = /* @__PURE__ */ new Set();
  emitResolver.isReferencedAliasDeclaration = function(node, ...args) {
    if (isAliasImportDeclaration(node) && referencedAliases.has(node)) {
      return true;
    }
    return originalIsReferencedAliasDeclaration.call(emitResolver, node, ...args);
  };
  return emitResolver[patchedReferencedAliasesSymbol] = referencedAliases;
}
function isAliasImportDeclaration(node) {
  return ts9.isImportSpecifier(node) || ts9.isNamespaceImport(node) || ts9.isImportClause(node);
}
function isTransformationContextWithEmitResolver(context) {
  return context.getEmitResolver !== void 0;
}
function throwIncompatibleTransformationContextError() {
  throw Error("Angular compiler is incompatible with this version of the TypeScript compiler.\n\nIf you recently updated TypeScript and this issue surfaces now, consider downgrading.\n\nPlease report an issue on the Angular repositories when this issue surfaces and you are using a supposedly compatible TypeScript version.");
}

// packages/compiler-cli/src/ngtsc/imports/src/default.js
var DefaultImportDeclaration = Symbol("DefaultImportDeclaration");
function attachDefaultImportDeclaration(expr, importDecl) {
  expr[DefaultImportDeclaration] = importDecl;
}
function getDefaultImportDeclaration(expr) {
  return expr[DefaultImportDeclaration] ?? null;
}
var DefaultImportTracker = class {
  /**
   * A `Map` which tracks the `Set` of `ts.ImportClause`s for default imports that were used in
   * a given file name.
   */
  sourceFileToUsedImports = /* @__PURE__ */ new Map();
  recordUsedImport(importDecl) {
    if (importDecl.importClause) {
      const sf = getSourceFile(importDecl);
      if (!this.sourceFileToUsedImports.has(sf.fileName)) {
        this.sourceFileToUsedImports.set(sf.fileName, /* @__PURE__ */ new Set());
      }
      this.sourceFileToUsedImports.get(sf.fileName).add(importDecl.importClause);
    }
  }
  /**
   * Get a `ts.TransformerFactory` which will preserve default imports that were previously marked
   * as used.
   *
   * This transformer must run after any other transformers which call `recordUsedImport`.
   */
  importPreservingTransformer() {
    return (context) => {
      let clausesToPreserve = null;
      return (sourceFile) => {
        const clausesForFile = this.sourceFileToUsedImports.get(sourceFile.fileName);
        if (clausesForFile !== void 0) {
          for (const clause of clausesForFile) {
            if (clausesToPreserve === null) {
              clausesToPreserve = loadIsReferencedAliasDeclarationPatch(context);
            }
            clausesToPreserve?.add(clause);
          }
        }
        return sourceFile;
      };
    };
  }
};

// packages/compiler-cli/src/ngtsc/imports/src/deferred_symbol_tracker.js
import ts10 from "typescript";
var AssumeEager = "AssumeEager";
var DeferredSymbolTracker = class {
  typeChecker;
  onlyExplicitDeferDependencyImports;
  imports = /* @__PURE__ */ new Map();
  /**
   * Map of a component class -> all import declarations that bring symbols
   * used within `@Component.deferredImports` field.
   */
  explicitlyDeferredImports = /* @__PURE__ */ new Map();
  constructor(typeChecker, onlyExplicitDeferDependencyImports) {
    this.typeChecker = typeChecker;
    this.onlyExplicitDeferDependencyImports = onlyExplicitDeferDependencyImports;
  }
  /**
   * Given an import declaration node, extract the names of all imported symbols
   * and return them as a map where each symbol is a key and `AssumeEager` is a value.
   *
   * The logic recognizes the following import shapes:
   *
   * Case 1: `import {a, b as B} from 'a'`
   * Case 2: `import X from 'a'`
   * Case 3: `import * as x from 'a'`
   */
  extractImportedSymbols(importDecl) {
    const symbolMap = /* @__PURE__ */ new Map();
    if (importDecl.importClause === void 0) {
      throw new Error(`Provided import declaration doesn't have any symbols.`);
    }
    if (importDecl.importClause.phaseModifier === ts10.SyntaxKind.TypeKeyword) {
      return symbolMap;
    }
    if (importDecl.importClause.namedBindings !== void 0) {
      const bindings = importDecl.importClause.namedBindings;
      if (ts10.isNamedImports(bindings)) {
        for (const element of bindings.elements) {
          if (!element.isTypeOnly) {
            symbolMap.set(element.name.text, AssumeEager);
          }
        }
      } else {
        symbolMap.set(bindings.name.text, AssumeEager);
      }
    } else if (importDecl.importClause.name !== void 0) {
      symbolMap.set(importDecl.importClause.name.text, AssumeEager);
    } else {
      throw new Error("Unrecognized import structure.");
    }
    return symbolMap;
  }
  /**
   * Retrieves a list of import declarations that contain symbols used within
   * `@Component.deferredImports` of a specific component class, but those imports
   * can not be removed, since there are other symbols imported alongside deferred
   * components.
   */
  getNonRemovableDeferredImports(sourceFile, classDecl) {
    const affectedImports = [];
    const importDecls = this.explicitlyDeferredImports.get(classDecl) ?? [];
    for (const importDecl of importDecls) {
      if (importDecl.getSourceFile() === sourceFile && !this.canDefer(importDecl)) {
        affectedImports.push(importDecl);
      }
    }
    return affectedImports;
  }
  /**
   * Marks a given identifier and an associated import declaration as a candidate
   * for defer loading.
   */
  markAsDeferrableCandidate(identifier, importDecl, componentClassDecl, isExplicitlyDeferred) {
    if (this.onlyExplicitDeferDependencyImports && !isExplicitlyDeferred) {
      return;
    }
    if (isExplicitlyDeferred) {
      if (this.explicitlyDeferredImports.has(componentClassDecl)) {
        this.explicitlyDeferredImports.get(componentClassDecl).push(importDecl);
      } else {
        this.explicitlyDeferredImports.set(componentClassDecl, [importDecl]);
      }
    }
    let symbolMap = this.imports.get(importDecl);
    if (!symbolMap) {
      symbolMap = this.extractImportedSymbols(importDecl);
      this.imports.set(importDecl, symbolMap);
    }
    if (!symbolMap.has(identifier.text)) {
      throw new Error(`The '${identifier.text}' identifier doesn't belong to the provided import declaration.`);
    }
    if (symbolMap.get(identifier.text) === AssumeEager) {
      symbolMap.set(identifier.text, this.lookupIdentifiersInSourceFile(identifier.text, importDecl));
    }
    const identifiers = symbolMap.get(identifier.text);
    identifiers.delete(identifier);
  }
  /**
   * Whether all symbols from a given import declaration have no references
   * in a source file, thus it's safe to use dynamic imports.
   */
  canDefer(importDecl) {
    if (!this.imports.has(importDecl)) {
      return false;
    }
    const symbolsMap = this.imports.get(importDecl);
    for (const refs of symbolsMap.values()) {
      if (refs === AssumeEager || refs.size > 0) {
        return false;
      }
    }
    return true;
  }
  /**
   * Returns a set of import declarations that is safe to remove
   * from the current source file and generate dynamic imports instead.
   */
  getDeferrableImportDecls() {
    const deferrableDecls = /* @__PURE__ */ new Set();
    for (const [importDecl] of this.imports) {
      if (this.canDefer(importDecl)) {
        deferrableDecls.add(importDecl);
      }
    }
    return deferrableDecls;
  }
  lookupIdentifiersInSourceFile(name, importDecl) {
    const results = /* @__PURE__ */ new Set();
    const visit = (node) => {
      if (node === importDecl || ts10.isTypeNode(node)) {
        return;
      }
      if (ts10.isIdentifier(node) && node.text === name) {
        const sym = this.typeChecker.getSymbolAtLocation(node);
        if (sym === void 0) {
          return;
        }
        if (sym.declarations === void 0 || sym.declarations.length === 0) {
          return;
        }
        const importClause = sym.declarations[0];
        const decl = getContainingImportDeclaration(importClause);
        if (decl !== importDecl) {
          return;
        }
        results.add(node);
      }
      ts10.forEachChild(node, visit);
    };
    visit(importDecl.getSourceFile());
    return results;
  }
};

// packages/compiler-cli/src/ngtsc/imports/src/local_compilation_extra_imports_tracker.js
import ts11 from "typescript";
var LocalCompilationExtraImportsTracker = class {
  typeChecker;
  localImportsMap = /* @__PURE__ */ new Map();
  globalImportsSet = /* @__PURE__ */ new Set();
  /** Names of the files marked for extra import generation. */
  markedFilesSet = /* @__PURE__ */ new Set();
  constructor(typeChecker) {
    this.typeChecker = typeChecker;
  }
  /**
   * Marks the source file for extra imports generation.
   *
   * The extra imports are generated only for the files marked through this method. In other words,
   * the method {@link getImportsForFile} returns empty if the file is not marked. This allows the
   * consumers of this tool to avoid generating extra imports for unrelated files (e.g., non-Angular
   * files)
   */
  markFileForExtraImportGeneration(sf) {
    this.markedFilesSet.add(sf.fileName);
  }
  /**
   * Adds an extra import to be added to the generated file of a specific source file.
   */
  addImportForFile(sf, moduleName) {
    if (!this.localImportsMap.has(sf.fileName)) {
      this.localImportsMap.set(sf.fileName, /* @__PURE__ */ new Set());
    }
    this.localImportsMap.get(sf.fileName).add(moduleName);
  }
  /**
   * If the given node is an imported identifier, this method adds the module from which it is
   * imported as an extra import to the generated file of each source file in the compilation unit,
   * otherwise the method is noop.
   *
   * Adding an extra import to all files is not optimal though. There are rooms to optimize and a
   * add the import to a subset of files (e.g., exclude all the non Angular files as they don't need
   * any extra import). However for this first version of this feature we go by this mechanism for
   * simplicity. There will be on-going work to further optimize this method to add the extra import
   * to smallest possible candidate files instead of all files.
   */
  addGlobalImportFromIdentifier(node) {
    let identifier = null;
    if (ts11.isIdentifier(node)) {
      identifier = node;
    } else if (ts11.isPropertyAccessExpression(node) && ts11.isIdentifier(node.expression)) {
      identifier = node.expression;
    }
    if (identifier === null) {
      return;
    }
    const sym = this.typeChecker.getSymbolAtLocation(identifier);
    if (!sym?.declarations?.length) {
      return;
    }
    const importClause = sym.declarations[0];
    const decl = getContainingImportDeclaration(importClause);
    if (decl !== null) {
      this.globalImportsSet.add(removeQuotations(decl.moduleSpecifier.getText()));
    }
  }
  /**
   * Returns the list of all module names that the given file should include as its extra imports.
   */
  getImportsForFile(sf) {
    if (!this.markedFilesSet.has(sf.fileName)) {
      return [];
    }
    return [...this.globalImportsSet, ...this.localImportsMap.get(sf.fileName) ?? []];
  }
};
function removeQuotations(s) {
  return s.substring(1, s.length - 1).trim();
}

// packages/compiler-cli/src/ngtsc/imports/src/resolver.js
var ModuleResolver = class {
  program;
  compilerOptions;
  host;
  moduleResolutionCache;
  constructor(program, compilerOptions, host, moduleResolutionCache) {
    this.program = program;
    this.compilerOptions = compilerOptions;
    this.host = host;
    this.moduleResolutionCache = moduleResolutionCache;
  }
  resolveModule(moduleName, containingFile) {
    const resolved = resolveModuleName(moduleName, containingFile, this.compilerOptions, this.host, this.moduleResolutionCache);
    if (resolved === void 0) {
      return null;
    }
    return getSourceFileOrNull(this.program, absoluteFrom(resolved.resolvedFileName));
  }
};

// packages/compiler-cli/src/ngtsc/metadata/src/api.js
var MetaKind;
(function(MetaKind2) {
  MetaKind2[MetaKind2["Directive"] = 0] = "Directive";
  MetaKind2[MetaKind2["Pipe"] = 1] = "Pipe";
  MetaKind2[MetaKind2["NgModule"] = 2] = "NgModule";
})(MetaKind || (MetaKind = {}));

// packages/compiler-cli/src/ngtsc/partial_evaluator/src/dynamic.js
var DynamicValue = class _DynamicValue {
  node;
  reason;
  code;
  constructor(node, reason, code) {
    this.node = node;
    this.reason = reason;
    this.code = code;
  }
  static fromDynamicInput(node, input) {
    return new _DynamicValue(
      node,
      input,
      0
      /* DynamicValueReason.DYNAMIC_INPUT */
    );
  }
  static fromDynamicString(node) {
    return new _DynamicValue(
      node,
      void 0,
      1
      /* DynamicValueReason.DYNAMIC_STRING */
    );
  }
  static fromExternalReference(node, ref) {
    return new _DynamicValue(
      node,
      ref,
      2
      /* DynamicValueReason.EXTERNAL_REFERENCE */
    );
  }
  static fromUnsupportedSyntax(node) {
    return new _DynamicValue(
      node,
      void 0,
      3
      /* DynamicValueReason.UNSUPPORTED_SYNTAX */
    );
  }
  static fromUnknownIdentifier(node) {
    return new _DynamicValue(
      node,
      void 0,
      4
      /* DynamicValueReason.UNKNOWN_IDENTIFIER */
    );
  }
  static fromInvalidExpressionType(node, value) {
    return new _DynamicValue(
      node,
      value,
      5
      /* DynamicValueReason.INVALID_EXPRESSION_TYPE */
    );
  }
  static fromComplexFunctionCall(node, fn) {
    return new _DynamicValue(
      node,
      fn,
      6
      /* DynamicValueReason.COMPLEX_FUNCTION_CALL */
    );
  }
  static fromDynamicType(node) {
    return new _DynamicValue(
      node,
      void 0,
      7
      /* DynamicValueReason.DYNAMIC_TYPE */
    );
  }
  static fromSyntheticInput(node, value) {
    return new _DynamicValue(
      node,
      value,
      8
      /* DynamicValueReason.SYNTHETIC_INPUT */
    );
  }
  static fromUnknown(node) {
    return new _DynamicValue(
      node,
      void 0,
      9
      /* DynamicValueReason.UNKNOWN */
    );
  }
  isFromDynamicInput() {
    return this.code === 0;
  }
  isFromDynamicString() {
    return this.code === 1;
  }
  isFromExternalReference() {
    return this.code === 2;
  }
  isFromUnsupportedSyntax() {
    return this.code === 3;
  }
  isFromUnknownIdentifier() {
    return this.code === 4;
  }
  isFromInvalidExpressionType() {
    return this.code === 5;
  }
  isFromComplexFunctionCall() {
    return this.code === 6;
  }
  isFromDynamicType() {
    return this.code === 7;
  }
  isFromUnknown() {
    return this.code === 9;
  }
  accept(visitor) {
    switch (this.code) {
      case 0:
        return visitor.visitDynamicInput(this);
      case 1:
        return visitor.visitDynamicString(this);
      case 2:
        return visitor.visitExternalReference(this);
      case 3:
        return visitor.visitUnsupportedSyntax(this);
      case 4:
        return visitor.visitUnknownIdentifier(this);
      case 5:
        return visitor.visitInvalidExpressionType(this);
      case 6:
        return visitor.visitComplexFunctionCall(this);
      case 7:
        return visitor.visitDynamicType(this);
      case 8:
        return visitor.visitSyntheticInput(this);
      case 9:
        return visitor.visitUnknown(this);
    }
  }
};

// packages/compiler-cli/src/ngtsc/partial_evaluator/src/interpreter.js
import ts12 from "typescript";

// packages/compiler-cli/src/ngtsc/partial_evaluator/src/result.js
var ResolvedModule = class {
  exports;
  evaluate;
  constructor(exports, evaluate) {
    this.exports = exports;
    this.evaluate = evaluate;
  }
  getExport(name) {
    if (!this.exports.has(name)) {
      return void 0;
    }
    return this.evaluate(this.exports.get(name));
  }
  getExports() {
    const map = /* @__PURE__ */ new Map();
    this.exports.forEach((decl, name) => {
      map.set(name, this.evaluate(decl));
    });
    return map;
  }
};
var EnumValue = class {
  enumRef;
  name;
  resolved;
  constructor(enumRef, name, resolved) {
    this.enumRef = enumRef;
    this.name = name;
    this.resolved = resolved;
  }
};
var KnownFn = class {
};

// packages/compiler-cli/src/ngtsc/partial_evaluator/src/builtin.js
var ArraySliceBuiltinFn = class extends KnownFn {
  lhs;
  constructor(lhs) {
    super();
    this.lhs = lhs;
  }
  evaluate(node, args) {
    if (args.length === 0) {
      return this.lhs;
    } else {
      return DynamicValue.fromUnknown(node);
    }
  }
};
var ArrayConcatBuiltinFn = class extends KnownFn {
  lhs;
  constructor(lhs) {
    super();
    this.lhs = lhs;
  }
  evaluate(node, args) {
    const result = [...this.lhs];
    for (const arg of args) {
      if (arg instanceof DynamicValue) {
        result.push(DynamicValue.fromDynamicInput(node, arg));
      } else if (Array.isArray(arg)) {
        result.push(...arg);
      } else {
        result.push(arg);
      }
    }
    return result;
  }
};
var StringConcatBuiltinFn = class extends KnownFn {
  lhs;
  constructor(lhs) {
    super();
    this.lhs = lhs;
  }
  evaluate(node, args) {
    let result = this.lhs;
    for (const arg of args) {
      const resolved = arg instanceof EnumValue ? arg.resolved : arg;
      if (typeof resolved === "string" || typeof resolved === "number" || typeof resolved === "boolean" || resolved == null) {
        result = result.concat(resolved);
      } else {
        return DynamicValue.fromUnknown(node);
      }
    }
    return result;
  }
};

// packages/compiler-cli/src/ngtsc/partial_evaluator/src/synthetic.js
var SyntheticValue = class {
  value;
  constructor(value) {
    this.value = value;
  }
};

// packages/compiler-cli/src/ngtsc/partial_evaluator/src/interpreter.js
function literalBinaryOp(op) {
  return { op, literal: true };
}
function referenceBinaryOp(op) {
  return { op, literal: false };
}
var StaticInterpreter = class {
  host;
  checker;
  dependencyTracker;
  BINARY_OPERATORS = /* @__PURE__ */ new Map([
    [ts12.SyntaxKind.PlusToken, literalBinaryOp((a, b) => a + b)],
    [ts12.SyntaxKind.MinusToken, literalBinaryOp((a, b) => a - b)],
    [ts12.SyntaxKind.AsteriskToken, literalBinaryOp((a, b) => a * b)],
    [ts12.SyntaxKind.SlashToken, literalBinaryOp((a, b) => a / b)],
    [ts12.SyntaxKind.PercentToken, literalBinaryOp((a, b) => a % b)],
    [ts12.SyntaxKind.AmpersandToken, literalBinaryOp((a, b) => a & b)],
    [ts12.SyntaxKind.BarToken, literalBinaryOp((a, b) => a | b)],
    [ts12.SyntaxKind.CaretToken, literalBinaryOp((a, b) => a ^ b)],
    [ts12.SyntaxKind.LessThanToken, literalBinaryOp((a, b) => a < b)],
    [ts12.SyntaxKind.LessThanEqualsToken, literalBinaryOp((a, b) => a <= b)],
    [ts12.SyntaxKind.GreaterThanToken, literalBinaryOp((a, b) => a > b)],
    [ts12.SyntaxKind.GreaterThanEqualsToken, literalBinaryOp((a, b) => a >= b)],
    [ts12.SyntaxKind.EqualsEqualsToken, literalBinaryOp((a, b) => a == b)],
    [ts12.SyntaxKind.EqualsEqualsEqualsToken, literalBinaryOp((a, b) => a === b)],
    [ts12.SyntaxKind.ExclamationEqualsToken, literalBinaryOp((a, b) => a != b)],
    [ts12.SyntaxKind.ExclamationEqualsEqualsToken, literalBinaryOp((a, b) => a !== b)],
    [ts12.SyntaxKind.LessThanLessThanToken, literalBinaryOp((a, b) => a << b)],
    [ts12.SyntaxKind.GreaterThanGreaterThanToken, literalBinaryOp((a, b) => a >> b)],
    [ts12.SyntaxKind.GreaterThanGreaterThanGreaterThanToken, literalBinaryOp((a, b) => a >>> b)],
    [ts12.SyntaxKind.AsteriskAsteriskToken, literalBinaryOp((a, b) => Math.pow(a, b))],
    [ts12.SyntaxKind.AmpersandAmpersandToken, referenceBinaryOp((a, b) => a && b)],
    [ts12.SyntaxKind.BarBarToken, referenceBinaryOp((a, b) => a || b)]
  ]);
  UNARY_OPERATORS = /* @__PURE__ */ new Map([
    [ts12.SyntaxKind.TildeToken, (a) => ~a],
    [ts12.SyntaxKind.MinusToken, (a) => -a],
    [ts12.SyntaxKind.PlusToken, (a) => +a],
    [ts12.SyntaxKind.ExclamationToken, (a) => !a]
  ]);
  constructor(host, checker, dependencyTracker) {
    this.host = host;
    this.checker = checker;
    this.dependencyTracker = dependencyTracker;
  }
  visit(node, context) {
    return this.visitExpression(node, context);
  }
  visitExpression(node, context) {
    let result;
    if (node.kind === ts12.SyntaxKind.TrueKeyword) {
      return true;
    } else if (node.kind === ts12.SyntaxKind.FalseKeyword) {
      return false;
    } else if (node.kind === ts12.SyntaxKind.NullKeyword) {
      return null;
    } else if (ts12.isStringLiteral(node)) {
      return node.text;
    } else if (ts12.isNoSubstitutionTemplateLiteral(node)) {
      return node.text;
    } else if (ts12.isTemplateExpression(node)) {
      result = this.visitTemplateExpression(node, context);
    } else if (ts12.isNumericLiteral(node)) {
      return parseFloat(node.text);
    } else if (ts12.isObjectLiteralExpression(node)) {
      result = this.visitObjectLiteralExpression(node, context);
    } else if (ts12.isIdentifier(node)) {
      result = this.visitIdentifier(node, context);
    } else if (ts12.isPropertyAccessExpression(node)) {
      result = this.visitPropertyAccessExpression(node, context);
    } else if (ts12.isCallExpression(node)) {
      result = this.visitCallExpression(node, context);
    } else if (ts12.isConditionalExpression(node)) {
      result = this.visitConditionalExpression(node, context);
    } else if (ts12.isPrefixUnaryExpression(node)) {
      result = this.visitPrefixUnaryExpression(node, context);
    } else if (ts12.isBinaryExpression(node)) {
      result = this.visitBinaryExpression(node, context);
    } else if (ts12.isArrayLiteralExpression(node)) {
      result = this.visitArrayLiteralExpression(node, context);
    } else if (ts12.isParenthesizedExpression(node)) {
      result = this.visitParenthesizedExpression(node, context);
    } else if (ts12.isElementAccessExpression(node)) {
      result = this.visitElementAccessExpression(node, context);
    } else if (ts12.isAsExpression(node)) {
      result = this.visitExpression(node.expression, context);
    } else if (ts12.isNonNullExpression(node)) {
      result = this.visitExpression(node.expression, context);
    } else if (this.host.isClass(node)) {
      result = this.visitDeclaration(node, context);
    } else {
      return DynamicValue.fromUnsupportedSyntax(node);
    }
    if (result instanceof DynamicValue && result.node !== node) {
      return DynamicValue.fromDynamicInput(node, result);
    }
    return result;
  }
  visitArrayLiteralExpression(node, context) {
    const array = [];
    for (let i = 0; i < node.elements.length; i++) {
      const element = node.elements[i];
      if (ts12.isSpreadElement(element)) {
        array.push(...this.visitSpreadElement(element, context));
      } else {
        array.push(this.visitExpression(element, context));
      }
    }
    return array;
  }
  visitObjectLiteralExpression(node, context) {
    const map = /* @__PURE__ */ new Map();
    for (let i = 0; i < node.properties.length; i++) {
      const property = node.properties[i];
      if (ts12.isPropertyAssignment(property)) {
        const name = this.stringNameFromPropertyName(property.name, context);
        if (name === void 0) {
          return DynamicValue.fromDynamicInput(node, DynamicValue.fromDynamicString(property.name));
        }
        map.set(name, this.visitExpression(property.initializer, context));
      } else if (ts12.isShorthandPropertyAssignment(property)) {
        const symbol = this.checker.getShorthandAssignmentValueSymbol(property);
        if (symbol === void 0 || symbol.valueDeclaration === void 0) {
          map.set(property.name.text, DynamicValue.fromUnknown(property));
        } else {
          map.set(property.name.text, this.visitDeclaration(symbol.valueDeclaration, context));
        }
      } else if (ts12.isSpreadAssignment(property)) {
        const spread = this.visitExpression(property.expression, context);
        if (spread instanceof DynamicValue) {
          return DynamicValue.fromDynamicInput(node, spread);
        } else if (spread instanceof Map) {
          spread.forEach((value, key) => map.set(key, value));
        } else if (spread instanceof ResolvedModule) {
          spread.getExports().forEach((value, key) => map.set(key, value));
        } else {
          return DynamicValue.fromDynamicInput(node, DynamicValue.fromInvalidExpressionType(property, spread));
        }
      } else {
        return DynamicValue.fromUnknown(node);
      }
    }
    return map;
  }
  visitTemplateExpression(node, context) {
    const pieces = [node.head.text];
    for (let i = 0; i < node.templateSpans.length; i++) {
      const span = node.templateSpans[i];
      const value = literal(this.visit(span.expression, context), () => DynamicValue.fromDynamicString(span.expression));
      if (value instanceof DynamicValue) {
        return DynamicValue.fromDynamicInput(node, value);
      }
      pieces.push(`${value}`, span.literal.text);
    }
    return pieces.join("");
  }
  visitIdentifier(node, context) {
    const decl = this.host.getDeclarationOfIdentifier(node);
    if (decl === null) {
      if (ts12.identifierToKeywordKind(node) === ts12.SyntaxKind.UndefinedKeyword) {
        return void 0;
      } else {
        if (this.dependencyTracker !== null && this.host.getImportOfIdentifier(node) !== null) {
          this.dependencyTracker.recordDependencyAnalysisFailure(context.originatingFile);
        }
        return DynamicValue.fromUnknownIdentifier(node);
      }
    }
    const declContext = { ...context, ...joinModuleContext(context, node, decl) };
    const result = this.visitDeclaration(decl.node, declContext);
    if (result instanceof Reference) {
      if (!result.synthetic) {
        result.addIdentifier(node);
      }
    } else if (result instanceof DynamicValue) {
      return DynamicValue.fromDynamicInput(node, result);
    }
    return result;
  }
  visitDeclaration(node, context) {
    if (this.dependencyTracker !== null) {
      this.dependencyTracker.addDependency(context.originatingFile, node.getSourceFile());
    }
    if (this.host.isClass(node)) {
      return this.getReference(node, context);
    } else if (ts12.isVariableDeclaration(node)) {
      return this.visitVariableDeclaration(node, context);
    } else if (ts12.isParameter(node) && context.scope.has(node)) {
      return context.scope.get(node);
    } else if (ts12.isExportAssignment(node)) {
      return this.visitExpression(node.expression, context);
    } else if (ts12.isEnumDeclaration(node)) {
      return this.visitEnumDeclaration(node, context);
    } else if (ts12.isSourceFile(node)) {
      return this.visitSourceFile(node, context);
    } else if (ts12.isBindingElement(node)) {
      return this.visitBindingElement(node, context);
    } else {
      return this.getReference(node, context);
    }
  }
  visitVariableDeclaration(node, context) {
    const value = this.host.getVariableValue(node);
    if (value !== null) {
      return this.visitExpression(value, context);
    } else if (isVariableDeclarationDeclared(node)) {
      if (node.type !== void 0) {
        const evaluatedType = this.visitType(node.type, context);
        if (!(evaluatedType instanceof DynamicValue)) {
          return evaluatedType;
        }
      }
      return this.getReference(node, context);
    } else {
      return void 0;
    }
  }
  visitEnumDeclaration(node, context) {
    const enumRef = this.getReference(node, context);
    const map = /* @__PURE__ */ new Map();
    node.members.forEach((member, index) => {
      const name = this.stringNameFromPropertyName(member.name, context);
      if (name !== void 0) {
        const resolved = member.initializer ? this.visit(member.initializer, context) : index;
        map.set(name, new EnumValue(enumRef, name, resolved));
      }
    });
    return map;
  }
  visitElementAccessExpression(node, context) {
    const lhs = this.visitExpression(node.expression, context);
    if (lhs instanceof DynamicValue) {
      return DynamicValue.fromDynamicInput(node, lhs);
    }
    const rhs = this.visitExpression(node.argumentExpression, context);
    if (rhs instanceof DynamicValue) {
      return DynamicValue.fromDynamicInput(node, rhs);
    }
    if (typeof rhs !== "string" && typeof rhs !== "number") {
      return DynamicValue.fromInvalidExpressionType(node, rhs);
    }
    return this.accessHelper(node, lhs, rhs, context);
  }
  visitPropertyAccessExpression(node, context) {
    const lhs = this.visitExpression(node.expression, context);
    const rhs = node.name.text;
    if (lhs instanceof DynamicValue) {
      return DynamicValue.fromDynamicInput(node, lhs);
    }
    return this.accessHelper(node, lhs, rhs, context);
  }
  visitSourceFile(node, context) {
    const declarations = this.host.getExportsOfModule(node);
    if (declarations === null) {
      return DynamicValue.fromUnknown(node);
    }
    return new ResolvedModule(declarations, (decl) => {
      const declContext = {
        ...context,
        ...joinModuleContext(context, node, decl)
      };
      return this.visitDeclaration(decl.node, declContext);
    });
  }
  accessHelper(node, lhs, rhs, context) {
    const strIndex = `${rhs}`;
    if (lhs instanceof Map) {
      if (lhs.has(strIndex)) {
        return lhs.get(strIndex);
      } else {
        return void 0;
      }
    } else if (lhs instanceof ResolvedModule) {
      return lhs.getExport(strIndex);
    } else if (Array.isArray(lhs)) {
      if (rhs === "length") {
        return lhs.length;
      } else if (rhs === "slice") {
        return new ArraySliceBuiltinFn(lhs);
      } else if (rhs === "concat") {
        return new ArrayConcatBuiltinFn(lhs);
      }
      if (typeof rhs !== "number" || !Number.isInteger(rhs)) {
        return DynamicValue.fromInvalidExpressionType(node, rhs);
      }
      return lhs[rhs];
    } else if (typeof lhs === "string" && rhs === "concat") {
      return new StringConcatBuiltinFn(lhs);
    } else if (lhs instanceof Reference) {
      const ref = lhs.node;
      if (this.host.isClass(ref)) {
        const module = owningModule(context, lhs.bestGuessOwningModule);
        let value = void 0;
        const member = this.host.getMembersOfClass(ref).find((member2) => member2.isStatic && member2.name === strIndex);
        if (member !== void 0) {
          if (member.value !== null) {
            value = this.visitExpression(member.value, context);
          } else if (member.implementation !== null) {
            value = new Reference(member.implementation, module);
          } else if (member.node) {
            value = new Reference(member.node, module);
          }
        }
        return value;
      } else if (isDeclaration(ref)) {
        return DynamicValue.fromDynamicInput(node, DynamicValue.fromExternalReference(ref, lhs));
      }
    } else if (lhs instanceof DynamicValue) {
      return DynamicValue.fromDynamicInput(node, lhs);
    } else if (lhs instanceof SyntheticValue) {
      return DynamicValue.fromSyntheticInput(node, lhs);
    }
    return DynamicValue.fromUnknown(node);
  }
  visitCallExpression(node, context) {
    const lhs = this.visitExpression(node.expression, context);
    if (lhs instanceof DynamicValue) {
      return DynamicValue.fromDynamicInput(node, lhs);
    }
    if (lhs instanceof KnownFn) {
      return lhs.evaluate(node, this.evaluateFunctionArguments(node, context));
    }
    if (!(lhs instanceof Reference)) {
      return DynamicValue.fromInvalidExpressionType(node.expression, lhs);
    }
    const fn = this.host.getDefinitionOfFunction(lhs.node);
    if (fn === null) {
      return DynamicValue.fromInvalidExpressionType(node.expression, lhs);
    }
    if (!isFunctionOrMethodReference(lhs)) {
      return DynamicValue.fromInvalidExpressionType(node.expression, lhs);
    }
    const resolveFfrExpr = (expr) => {
      let contextExtension = {};
      if (fn.body === null && expr.getSourceFile() !== node.expression.getSourceFile() && lhs.bestGuessOwningModule !== null) {
        contextExtension = {
          absoluteModuleName: lhs.bestGuessOwningModule.specifier,
          resolutionContext: lhs.bestGuessOwningModule.resolutionContext
        };
      }
      return this.visitFfrExpression(expr, { ...context, ...contextExtension });
    };
    if (fn.body === null && context.foreignFunctionResolver !== void 0) {
      const unresolvable = DynamicValue.fromDynamicInput(node, DynamicValue.fromExternalReference(node.expression, lhs));
      return context.foreignFunctionResolver(lhs, node, resolveFfrExpr, unresolvable);
    }
    const res = this.visitFunctionBody(node, fn, context);
    if (res instanceof DynamicValue && context.foreignFunctionResolver !== void 0) {
      const unresolvable = DynamicValue.fromComplexFunctionCall(node, fn);
      return context.foreignFunctionResolver(lhs, node, resolveFfrExpr, unresolvable);
    }
    return res;
  }
  /**
   * Visit an expression which was extracted from a foreign-function resolver.
   *
   * This will process the result and ensure it's correct for FFR-resolved values, including marking
   * `Reference`s as synthetic.
   */
  visitFfrExpression(expr, context) {
    const res = this.visitExpression(expr, context);
    if (res instanceof Reference) {
      res.synthetic = true;
    }
    return res;
  }
  visitFunctionBody(node, fn, context) {
    if (fn.body === null) {
      return DynamicValue.fromUnknown(node);
    } else if (fn.body.length !== 1 || !ts12.isReturnStatement(fn.body[0])) {
      return DynamicValue.fromComplexFunctionCall(node, fn);
    }
    const ret = fn.body[0];
    const args = this.evaluateFunctionArguments(node, context);
    const newScope = /* @__PURE__ */ new Map();
    const calleeContext = { ...context, scope: newScope };
    fn.parameters.forEach((param, index) => {
      let arg = args[index];
      if (param.node.dotDotDotToken !== void 0) {
        arg = args.slice(index);
      }
      if (arg === void 0 && param.initializer !== null) {
        arg = this.visitExpression(param.initializer, calleeContext);
      }
      newScope.set(param.node, arg);
    });
    return ret.expression !== void 0 ? this.visitExpression(ret.expression, calleeContext) : void 0;
  }
  visitConditionalExpression(node, context) {
    const condition = this.visitExpression(node.condition, context);
    if (condition instanceof DynamicValue) {
      return DynamicValue.fromDynamicInput(node, condition);
    }
    if (condition) {
      return this.visitExpression(node.whenTrue, context);
    } else {
      return this.visitExpression(node.whenFalse, context);
    }
  }
  visitPrefixUnaryExpression(node, context) {
    const operatorKind = node.operator;
    if (!this.UNARY_OPERATORS.has(operatorKind)) {
      return DynamicValue.fromUnsupportedSyntax(node);
    }
    const op = this.UNARY_OPERATORS.get(operatorKind);
    const value = this.visitExpression(node.operand, context);
    if (value instanceof DynamicValue) {
      return DynamicValue.fromDynamicInput(node, value);
    } else {
      return op(value);
    }
  }
  visitBinaryExpression(node, context) {
    const tokenKind = node.operatorToken.kind;
    if (!this.BINARY_OPERATORS.has(tokenKind)) {
      return DynamicValue.fromUnsupportedSyntax(node);
    }
    const opRecord = this.BINARY_OPERATORS.get(tokenKind);
    let lhs, rhs;
    if (opRecord.literal) {
      lhs = literal(this.visitExpression(node.left, context), (value) => DynamicValue.fromInvalidExpressionType(node.left, value));
      rhs = literal(this.visitExpression(node.right, context), (value) => DynamicValue.fromInvalidExpressionType(node.right, value));
    } else {
      lhs = this.visitExpression(node.left, context);
      rhs = this.visitExpression(node.right, context);
    }
    if (lhs instanceof DynamicValue) {
      return DynamicValue.fromDynamicInput(node, lhs);
    } else if (rhs instanceof DynamicValue) {
      return DynamicValue.fromDynamicInput(node, rhs);
    } else {
      return opRecord.op(lhs, rhs);
    }
  }
  visitParenthesizedExpression(node, context) {
    return this.visitExpression(node.expression, context);
  }
  evaluateFunctionArguments(node, context) {
    const args = [];
    for (const arg of node.arguments) {
      if (ts12.isSpreadElement(arg)) {
        args.push(...this.visitSpreadElement(arg, context));
      } else {
        args.push(this.visitExpression(arg, context));
      }
    }
    return args;
  }
  visitSpreadElement(node, context) {
    const spread = this.visitExpression(node.expression, context);
    if (spread instanceof DynamicValue) {
      return [DynamicValue.fromDynamicInput(node, spread)];
    } else if (!Array.isArray(spread)) {
      return [DynamicValue.fromInvalidExpressionType(node, spread)];
    } else {
      return spread;
    }
  }
  visitBindingElement(node, context) {
    const path = [];
    let closestDeclaration = node;
    while (ts12.isBindingElement(closestDeclaration) || ts12.isArrayBindingPattern(closestDeclaration) || ts12.isObjectBindingPattern(closestDeclaration)) {
      if (ts12.isBindingElement(closestDeclaration)) {
        path.unshift(closestDeclaration);
      }
      closestDeclaration = closestDeclaration.parent;
    }
    if (!ts12.isVariableDeclaration(closestDeclaration) || closestDeclaration.initializer === void 0) {
      return DynamicValue.fromUnknown(node);
    }
    let value = this.visit(closestDeclaration.initializer, context);
    for (const element of path) {
      let key;
      if (ts12.isArrayBindingPattern(element.parent)) {
        key = element.parent.elements.indexOf(element);
      } else {
        const name = element.propertyName || element.name;
        if (ts12.isIdentifier(name)) {
          key = name.text;
        } else {
          return DynamicValue.fromUnknown(element);
        }
      }
      value = this.accessHelper(element, value, key, context);
      if (value instanceof DynamicValue) {
        return value;
      }
    }
    return value;
  }
  stringNameFromPropertyName(node, context) {
    if (ts12.isIdentifier(node) || ts12.isStringLiteral(node) || ts12.isNumericLiteral(node)) {
      return node.text;
    } else if (ts12.isComputedPropertyName(node)) {
      const literal2 = this.visitExpression(node.expression, context);
      return typeof literal2 === "string" ? literal2 : void 0;
    } else {
      return void 0;
    }
  }
  getReference(node, context) {
    return new Reference(node, owningModule(context));
  }
  visitType(node, context) {
    if (ts12.isLiteralTypeNode(node)) {
      return this.visitExpression(node.literal, context);
    } else if (ts12.isTupleTypeNode(node)) {
      return this.visitTupleType(node, context);
    } else if (ts12.isNamedTupleMember(node)) {
      return this.visitType(node.type, context);
    } else if (ts12.isTypeOperatorNode(node) && node.operator === ts12.SyntaxKind.ReadonlyKeyword) {
      return this.visitType(node.type, context);
    } else if (ts12.isTypeQueryNode(node)) {
      return this.visitTypeQuery(node, context);
    } else if (ts12.isTypeReferenceNode(node)) {
      return this.visitTypeReference(node, context);
    } else if (ts12.isImportTypeNode(node)) {
      return this.visitImportType(node, context);
    }
    return DynamicValue.fromDynamicType(node);
  }
  visitTupleType(node, context) {
    const res = [];
    for (const elem of node.elements) {
      res.push(this.visitType(elem, context));
    }
    return res;
  }
  visitTypeQuery(node, context) {
    const exprName = ts12.isQualifiedName(node.exprName) ? node.exprName.right : node.exprName;
    if (!ts12.isIdentifier(exprName)) {
      return DynamicValue.fromUnknown(node);
    }
    const decl = this.host.getDeclarationOfIdentifier(exprName);
    if (decl === null) {
      return DynamicValue.fromUnknownIdentifier(exprName);
    }
    const declContext = { ...context, ...joinModuleContext(context, node, decl) };
    return this.visitDeclaration(decl.node, declContext);
  }
  visitImportType(node, context) {
    if (node.qualifier === void 0) {
      return DynamicValue.fromDynamicType(node);
    }
    const name = ts12.isQualifiedName(node.qualifier) ? node.qualifier.right : node.qualifier;
    if (!ts12.isIdentifier(name)) {
      return DynamicValue.fromUnknown(node);
    }
    const decl = this.host.getDeclarationOfIdentifier(name);
    if (decl === null) {
      return DynamicValue.fromUnknownIdentifier(name);
    }
    let declContext = { ...context, ...joinModuleContext(context, node, decl) };
    if (declContext.absoluteModuleName === context.absoluteModuleName && ts12.isLiteralTypeNode(node.argument) && ts12.isStringLiteral(node.argument.literal) && !node.argument.literal.text.startsWith(".")) {
      declContext = {
        ...declContext,
        absoluteModuleName: node.argument.literal.text,
        resolutionContext: node.getSourceFile().fileName
      };
    }
    return this.visitDeclaration(decl.node, declContext);
  }
  visitTypeReference(node, context) {
    const typeName = ts12.isQualifiedName(node.typeName) ? node.typeName.right : node.typeName;
    if (!ts12.isIdentifier(typeName)) {
      return DynamicValue.fromUnknown(node);
    }
    if (typeName.text === "ReturnType" && node.typeArguments !== void 0 && node.typeArguments.length === 1) {
      const fn = this.visitType(node.typeArguments[0], context);
      if (fn instanceof Reference) {
        const decl2 = fn.node;
        if (ts12.isFunctionDeclaration(decl2) || ts12.isMethodDeclaration(decl2) || ts12.isMethodSignature(decl2)) {
          if (decl2.type !== void 0 && context.foreignTypeResolver !== void 0) {
            const moduleType = context.foreignTypeResolver(decl2.type);
            if (moduleType !== null) {
              return this.visitType(moduleType, context);
            }
          }
        }
      }
    }
    const decl = this.host.getDeclarationOfIdentifier(typeName);
    if (decl !== null && this.host.isClass(decl.node)) {
      return this.getReference(decl.node, {
        ...context,
        ...joinModuleContext(context, typeName, decl)
      });
    }
    return DynamicValue.fromDynamicType(node);
  }
};
function isFunctionOrMethodReference(ref) {
  return ts12.isFunctionDeclaration(ref.node) || ts12.isMethodDeclaration(ref.node) || ts12.isFunctionExpression(ref.node);
}
function literal(value, reject) {
  if (value instanceof EnumValue) {
    value = value.resolved;
  }
  if (value instanceof DynamicValue || value === null || value === void 0 || typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  return reject(value);
}
function isVariableDeclarationDeclared(node) {
  if (node.parent === void 0 || !ts12.isVariableDeclarationList(node.parent)) {
    return false;
  }
  const declList = node.parent;
  if (declList.parent === void 0 || !ts12.isVariableStatement(declList.parent)) {
    return false;
  }
  const varStmt = declList.parent;
  const modifiers = ts12.getModifiers(varStmt);
  return modifiers !== void 0 && modifiers.some((mod) => mod.kind === ts12.SyntaxKind.DeclareKeyword);
}
var EMPTY = {};
function joinModuleContext(existing, node, decl) {
  if (typeof decl.viaModule === "string" && decl.viaModule !== existing.absoluteModuleName) {
    return {
      absoluteModuleName: decl.viaModule,
      resolutionContext: node.getSourceFile().fileName
    };
  } else {
    return EMPTY;
  }
}
function owningModule(context, override = null) {
  let specifier = context.absoluteModuleName;
  if (override !== null) {
    specifier = override.specifier;
  }
  if (specifier !== null) {
    return {
      specifier,
      resolutionContext: context.resolutionContext
    };
  } else {
    return null;
  }
}

// packages/compiler-cli/src/ngtsc/partial_evaluator/src/interface.js
var PartialEvaluator = class {
  host;
  checker;
  dependencyTracker;
  constructor(host, checker, dependencyTracker) {
    this.host = host;
    this.checker = checker;
    this.dependencyTracker = dependencyTracker;
  }
  evaluate(expr, foreignFunctionResolver) {
    const interpreter = new StaticInterpreter(this.host, this.checker, this.dependencyTracker);
    const sourceFile = expr.getSourceFile();
    return interpreter.visit(expr, {
      originatingFile: sourceFile,
      absoluteModuleName: null,
      resolutionContext: sourceFile.fileName,
      scope: /* @__PURE__ */ new Map(),
      foreignFunctionResolver
    });
  }
  /**
   * Statically evaluates a `ts.TypeNode` (rather than a value expression) to a `ResolvedValue`.
   *
   * This is used when reading metadata that was encoded into `.d.ts` type positions - for example
   * the `imports`/`exports`/`declarations` tuples of `ɵɵNgModuleDeclaration`, which may be written
   * as `typeof X` queries, `ReturnType<typeof X.forRoot>`, references to constants that themselves
   * resolve to tuples, etc.
   */
  evaluateType(typeNode, owningModule2 = null, foreignFunctionResolver, foreignTypeResolver) {
    const interpreter = new StaticInterpreter(this.host, this.checker, this.dependencyTracker);
    const sourceFile = typeNode.getSourceFile();
    return interpreter.visitType(typeNode, {
      originatingFile: sourceFile,
      absoluteModuleName: owningModule2 ? owningModule2.specifier : null,
      resolutionContext: owningModule2 ? owningModule2.resolutionContext : sourceFile.fileName,
      scope: /* @__PURE__ */ new Map(),
      foreignFunctionResolver,
      foreignTypeResolver
    });
  }
};

// packages/compiler-cli/src/ngtsc/partial_evaluator/src/diagnostics.js
import ts13 from "typescript";
function describeResolvedType(value, maxDepth = 1) {
  if (value === null) {
    return "null";
  } else if (value === void 0) {
    return "undefined";
  } else if (typeof value === "number" || typeof value === "boolean" || typeof value === "string") {
    return typeof value;
  } else if (value instanceof Map) {
    if (maxDepth === 0) {
      return "object";
    }
    const entries = Array.from(value.entries()).map(([key, v]) => {
      return `${quoteKey(key)}: ${describeResolvedType(v, maxDepth - 1)}`;
    });
    return entries.length > 0 ? `{ ${entries.join("; ")} }` : "{}";
  } else if (value instanceof ResolvedModule) {
    return "(module)";
  } else if (value instanceof EnumValue) {
    return value.enumRef.debugName ?? "(anonymous)";
  } else if (value instanceof Reference) {
    return value.debugName ?? "(anonymous)";
  } else if (Array.isArray(value)) {
    if (maxDepth === 0) {
      return "Array";
    }
    return `[${value.map((v) => describeResolvedType(v, maxDepth - 1)).join(", ")}]`;
  } else if (value instanceof DynamicValue) {
    return "(not statically analyzable)";
  } else if (value instanceof KnownFn) {
    return "Function";
  } else {
    return "unknown";
  }
}
function quoteKey(key) {
  if (/^[a-z0-9_]+$/i.test(key)) {
    return key;
  } else {
    return `'${key.replace(/'/g, "\\'")}'`;
  }
}
function traceDynamicValue(node, value) {
  return value.accept(new TraceDynamicValueVisitor(node));
}
var TraceDynamicValueVisitor = class {
  node;
  currentContainerNode = null;
  constructor(node) {
    this.node = node;
  }
  visitDynamicInput(value) {
    const trace = value.reason.accept(this);
    if (this.shouldTrace(value.node)) {
      const info = makeRelatedInformation(value.node, "Unable to evaluate this expression statically.");
      trace.unshift(info);
    }
    return trace;
  }
  visitSyntheticInput(value) {
    return [makeRelatedInformation(value.node, "Unable to evaluate this expression further.")];
  }
  visitDynamicString(value) {
    return [
      makeRelatedInformation(value.node, "A string value could not be determined statically.")
    ];
  }
  visitExternalReference(value) {
    const name = value.reason.debugName;
    const description = name !== null ? `'${name}'` : "an anonymous declaration";
    return [
      makeRelatedInformation(value.node, `A value for ${description} cannot be determined statically, as it is an external declaration.`)
    ];
  }
  visitComplexFunctionCall(value) {
    return [
      makeRelatedInformation(value.node, "Unable to evaluate function call of complex function. A function must have exactly one return statement."),
      makeRelatedInformation(value.reason.node, "Function is declared here.")
    ];
  }
  visitInvalidExpressionType(value) {
    return [makeRelatedInformation(value.node, "Unable to evaluate an invalid expression.")];
  }
  visitUnknown(value) {
    return [makeRelatedInformation(value.node, "Unable to evaluate statically.")];
  }
  visitUnknownIdentifier(value) {
    return [makeRelatedInformation(value.node, "Unknown reference.")];
  }
  visitDynamicType(value) {
    return [makeRelatedInformation(value.node, "Dynamic type.")];
  }
  visitUnsupportedSyntax(value) {
    return [makeRelatedInformation(value.node, "This syntax is not supported.")];
  }
  /**
   * Determines whether the dynamic value reported for the node should be traced, i.e. if it is not
   * part of the container for which the most recent trace was created.
   */
  shouldTrace(node) {
    if (node === this.node) {
      return false;
    }
    const container = getContainerNode(node);
    if (container === this.currentContainerNode) {
      return false;
    }
    this.currentContainerNode = container;
    return true;
  }
};
function getContainerNode(node) {
  let currentNode = node;
  while (currentNode !== void 0) {
    switch (currentNode.kind) {
      case ts13.SyntaxKind.ExpressionStatement:
      case ts13.SyntaxKind.VariableStatement:
      case ts13.SyntaxKind.ReturnStatement:
      case ts13.SyntaxKind.IfStatement:
      case ts13.SyntaxKind.SwitchStatement:
      case ts13.SyntaxKind.DoStatement:
      case ts13.SyntaxKind.WhileStatement:
      case ts13.SyntaxKind.ForStatement:
      case ts13.SyntaxKind.ForInStatement:
      case ts13.SyntaxKind.ForOfStatement:
      case ts13.SyntaxKind.ContinueStatement:
      case ts13.SyntaxKind.BreakStatement:
      case ts13.SyntaxKind.ThrowStatement:
      case ts13.SyntaxKind.ObjectBindingPattern:
      case ts13.SyntaxKind.ArrayBindingPattern:
        return currentNode;
    }
    currentNode = currentNode.parent;
  }
  return node.getSourceFile();
}

// packages/compiler-cli/src/ngtsc/metadata/src/dts.js
import { ClassPropertyMapping, MatchSource } from "@angular/compiler";
import ts15 from "typescript";

// packages/compiler-cli/src/ngtsc/metadata/src/util.js
import ts14 from "typescript";
import { SelectorlessMatcher } from "@angular/compiler";
function extraReferenceFromTypeQuery(checker, typeNode, origin, bestGuessOwningModule) {
  const type = typeNode.exprName;
  let node;
  let from;
  try {
    const result = reflectTypeEntityToDeclaration(type, checker);
    node = result.node;
    from = result.from;
  } catch (e) {
    if (e instanceof TypeEntityToDeclarationError) {
      return null;
    }
    throw e;
  }
  if (!isNamedClassDeclaration(node)) {
    throw new Error(`Expected named ClassDeclaration: ${nodeDebugInfo(node)}`);
  }
  if (from !== null && !from.startsWith(".")) {
    return new Reference(node, {
      specifier: from,
      resolutionContext: origin.getSourceFile().fileName
    });
  }
  return new Reference(node, bestGuessOwningModule);
}
function readBooleanType(type) {
  if (!ts14.isLiteralTypeNode(type)) {
    return null;
  }
  switch (type.literal.kind) {
    case ts14.SyntaxKind.TrueKeyword:
      return true;
    case ts14.SyntaxKind.FalseKeyword:
      return false;
    default:
      return null;
  }
}
function readStringType(type) {
  if (!ts14.isLiteralTypeNode(type) || !ts14.isStringLiteral(type.literal)) {
    return null;
  }
  return type.literal.text;
}
function readMapType(type, valueTransform) {
  if (!ts14.isTypeLiteralNode(type)) {
    return {};
  }
  const obj = {};
  type.members.forEach((member) => {
    if (!ts14.isPropertySignature(member) || member.type === void 0 || member.name === void 0 || !ts14.isStringLiteral(member.name) && !ts14.isIdentifier(member.name)) {
      return;
    }
    const value = valueTransform(member.type);
    if (value !== null) {
      obj[member.name.text] = value;
    }
  });
  return obj;
}
function readStringArrayType(type) {
  if (!ts14.isTupleTypeNode(type)) {
    return [];
  }
  const res = [];
  type.elements.forEach((el) => {
    if (!ts14.isLiteralTypeNode(el) || !ts14.isStringLiteral(el.literal)) {
      return;
    }
    res.push(el.literal.text);
  });
  return res;
}
function extractDirectiveTypeCheckMeta(node, inputs, reflector) {
  const members = reflector.getMembersOfClass(node);
  const publicMethods = /* @__PURE__ */ new Set();
  const staticMembers = [];
  for (const member of members) {
    if (member.isStatic) {
      staticMembers.push(member);
    }
    if (member.kind === ClassMemberKind.Method && !member.isStatic && (member.accessLevel === ClassMemberAccessLevel.PublicReadonly || member.accessLevel === ClassMemberAccessLevel.PublicWritable)) {
      publicMethods.add(member.name);
    }
  }
  const ngTemplateGuards = staticMembers.map(extractTemplateGuard).filter((guard) => guard !== null);
  const hasNgTemplateContextGuard = staticMembers.some((member) => member.kind === ClassMemberKind.Method && member.name === "ngTemplateContextGuard");
  const coercedInputFields = new Set(staticMembers.map(extractCoercedInput).filter((inputName) => {
    if (inputName === null || inputs.getByClassPropertyName(inputName)?.isSignal) {
      return false;
    }
    return true;
  }));
  const restrictedInputFields = /* @__PURE__ */ new Set();
  const stringLiteralInputFields = /* @__PURE__ */ new Set();
  const undeclaredInputFields = /* @__PURE__ */ new Set();
  for (const { classPropertyName, transform } of inputs) {
    const field = members.find((member) => member.name === classPropertyName);
    if (field === void 0 || field.node === null) {
      undeclaredInputFields.add(classPropertyName);
      continue;
    }
    if (isRestricted(field.node)) {
      restrictedInputFields.add(classPropertyName);
    }
    if (field.nameNode !== null && ts14.isStringLiteral(field.nameNode)) {
      stringLiteralInputFields.add(classPropertyName);
    }
    if (transform !== null) {
      coercedInputFields.add(classPropertyName);
    }
  }
  const arity = reflector.getGenericArityOfClass(node);
  return {
    hasNgTemplateContextGuard,
    ngTemplateGuards,
    coercedInputFields,
    restrictedInputFields,
    stringLiteralInputFields,
    undeclaredInputFields,
    publicMethods,
    isGeneric: arity !== null && arity > 0
  };
}
function isRestricted(node) {
  const modifiers = ts14.canHaveModifiers(node) ? ts14.getModifiers(node) : void 0;
  return modifiers !== void 0 && modifiers.some(({ kind }) => {
    return kind === ts14.SyntaxKind.PrivateKeyword || kind === ts14.SyntaxKind.ProtectedKeyword || kind === ts14.SyntaxKind.ReadonlyKeyword;
  });
}
function extractTemplateGuard(member) {
  if (!member.name.startsWith("ngTemplateGuard_")) {
    return null;
  }
  const inputName = afterUnderscore(member.name);
  if (member.kind === ClassMemberKind.Property) {
    let type = null;
    if (member.type !== null && ts14.isLiteralTypeNode(member.type) && ts14.isStringLiteral(member.type.literal)) {
      type = member.type.literal.text;
    }
    if (type !== "binding") {
      return null;
    }
    return { inputName, type };
  } else if (member.kind === ClassMemberKind.Method) {
    return { inputName, type: "invocation" };
  } else {
    return null;
  }
}
function extractCoercedInput(member) {
  if (member.kind !== ClassMemberKind.Property || !member.name.startsWith("ngAcceptInputType_")) {
    return null;
  }
  return afterUnderscore(member.name);
}
var CompoundMetadataReader = class {
  readers;
  constructor(readers) {
    this.readers = readers;
  }
  getDirectiveMetadata(node) {
    for (const reader of this.readers) {
      const meta = reader.getDirectiveMetadata(node);
      if (meta !== null) {
        return meta;
      }
    }
    return null;
  }
  getNgModuleMetadata(node) {
    for (const reader of this.readers) {
      const meta = reader.getNgModuleMetadata(node);
      if (meta !== null) {
        return meta;
      }
    }
    return null;
  }
  getPipeMetadata(node) {
    for (const reader of this.readers) {
      const meta = reader.getPipeMetadata(node);
      if (meta !== null) {
        return meta;
      }
    }
    return null;
  }
};
function afterUnderscore(str) {
  const pos = str.indexOf("_");
  if (pos === -1) {
    throw new Error(`Expected '${str}' to contain '_'`);
  }
  return str.slice(pos + 1);
}
function hasInjectableFields(clazz, host) {
  const members = host.getMembersOfClass(clazz);
  return members.some(({ isStatic, name }) => isStatic && (name === "\u0275prov" || name === "\u0275fac"));
}
function isHostDirectiveMetaForGlobalMode(hostDirectiveMeta) {
  return hostDirectiveMeta.directive instanceof Reference;
}
function createForeignComponentMatcher(foreignImports) {
  if (foreignImports === null || foreignImports.length === 0) {
    return null;
  }
  const registry = /* @__PURE__ */ new Map();
  for (const meta of foreignImports) {
    registry.set(meta.name, [meta]);
  }
  return new SelectorlessMatcher(registry);
}

// packages/compiler-cli/src/ngtsc/metadata/src/dts.js
var DtsMetadataReader = class {
  checker;
  reflector;
  evaluator;
  constructor(checker, reflector) {
    this.checker = checker;
    this.reflector = reflector;
    this.evaluator = new PartialEvaluator(this.reflector, this.checker, null);
  }
  /**
   * Read the metadata from a class that has already been compiled somehow (either it's in a .d.ts
   * file, or in a .ts file with a handwritten definition).
   *
   * @param ref `Reference` to the class of interest, with the context of how it was obtained.
   */
  getNgModuleMetadata(ref) {
    const clazz = ref.node;
    const ngModuleDef = this.reflector.getMembersOfClass(clazz).find((member) => member.name === "\u0275mod" && member.isStatic);
    if (ngModuleDef === void 0) {
      return null;
    } else if (
      // Validate that the shape of the ngModuleDef type is correct.
      ngModuleDef.type === null || !ts15.isTypeReferenceNode(ngModuleDef.type) || ngModuleDef.type.typeArguments === void 0 || ngModuleDef.type.typeArguments.length !== 4
    ) {
      return null;
    }
    const [_, declarationMetadata, importMetadata, exportMetadata] = ngModuleDef.type.typeArguments;
    const foreignTypeResolver = (typeNode) => {
      return moduleWithProvidersTypeArgument(typeNode, this.reflector);
    };
    const evaluateMetadata = (metadataNode) => {
      return metadataNode.kind === ts15.SyntaxKind.NeverKeyword ? [] : this.evaluator.evaluateType(metadataNode, ref.bestGuessOwningModule, void 0, foreignTypeResolver);
    };
    const declarations = this.extractReferencesFromResolvedValue(evaluateMetadata(declarationMetadata));
    const exports = this.extractReferencesFromResolvedValue(evaluateMetadata(exportMetadata));
    const imports = this.extractReferencesFromResolvedValue(evaluateMetadata(importMetadata));
    const isPoisoned = exports.isIncomplete;
    return {
      kind: MetaKind.NgModule,
      ref,
      declarations: declarations.result,
      isPoisoned,
      exports: exports.result,
      imports: imports.result,
      schemas: [],
      rawDeclarations: null,
      rawImports: null,
      rawExports: null,
      decorator: null,
      // NgModules declared outside the current compilation are assumed to contain providers, as it
      // would be a non-breaking change for a library to introduce providers at any point.
      mayDeclareProviders: true
    };
  }
  extractReferencesFromResolvedValue(value) {
    const result = [];
    let isIncomplete = false;
    if (Array.isArray(value)) {
      for (const element of value) {
        if (element instanceof Reference && this.reflector.isClass(element.node)) {
          result.push(element);
        } else {
          isIncomplete = true;
        }
      }
    } else if (value instanceof Reference && this.reflector.isClass(value.node)) {
      result.push(value);
    } else {
      isIncomplete = true;
    }
    return { result, isIncomplete };
  }
  /**
   * Read directive (or component) metadata from a referenced class in a .d.ts file.
   */
  getDirectiveMetadata(ref) {
    const clazz = ref.node;
    const def = this.reflector.getMembersOfClass(clazz).find((field) => field.isStatic && (field.name === "\u0275cmp" || field.name === "\u0275dir"));
    if (def === void 0) {
      return null;
    } else if (def.type === null || !ts15.isTypeReferenceNode(def.type) || def.type.typeArguments === void 0 || def.type.typeArguments.length < 2) {
      return null;
    }
    const isComponent = def.name === "\u0275cmp";
    const ctorParams = this.reflector.getConstructorParameters(clazz);
    const isStructural = !isComponent && ctorParams !== null && ctorParams.some((param) => {
      return param.typeValueReference.kind === 1 && param.typeValueReference.moduleName === "@angular/core" && param.typeValueReference.importedName === "TemplateRef";
    });
    const ngContentSelectors = def.type.typeArguments.length > 6 ? readStringArrayType(def.type.typeArguments[6]) : null;
    const isStandalone = def.type.typeArguments.length > 7 && (readBooleanType(def.type.typeArguments[7]) ?? false);
    const inputs = ClassPropertyMapping.fromMappedObject(readInputsType(def.type.typeArguments[3]));
    const outputs = ClassPropertyMapping.fromMappedObject(readMapType(def.type.typeArguments[4], readStringType));
    const hostDirectives = def.type.typeArguments.length > 8 ? readHostDirectivesType(this.checker, def.type.typeArguments[8], ref.bestGuessOwningModule) : null;
    const isSignal = def.type.typeArguments.length > 9 && (readBooleanType(def.type.typeArguments[9]) ?? false);
    const isPoisoned = hostDirectives !== null && hostDirectives?.isIncomplete;
    return {
      kind: MetaKind.Directive,
      matchSource: MatchSource.Selector,
      ref,
      name: clazz.name.text,
      isComponent,
      selector: readStringType(def.type.typeArguments[1]),
      exportAs: readStringArrayType(def.type.typeArguments[2]),
      inputs,
      outputs,
      hostDirectives: hostDirectives?.result ?? null,
      queries: readStringArrayType(def.type.typeArguments[5]),
      ...extractDirectiveTypeCheckMeta(clazz, inputs, this.reflector),
      baseClass: readBaseClass(clazz, this.checker, this.reflector),
      isPoisoned,
      isStructural,
      animationTriggerNames: null,
      ngContentSelectors,
      isStandalone,
      isSignal,
      // We do not transfer information about inputs from class metadata
      // via `.d.ts` declarations. This is fine because this metadata is
      // currently only used for classes defined in source files. E.g. in migrations.
      inputFieldNamesFromMetadataArray: null,
      // Imports are tracked in metadata only for template type-checking purposes,
      // so standalone components from .d.ts files don't have any.
      imports: null,
      foreignImports: null,
      rawImports: null,
      deferredImports: null,
      // The same goes for schemas.
      schemas: null,
      decorator: null,
      // Assume that standalone components from .d.ts files may export providers.
      assumedToExportProviders: isComponent && isStandalone,
      // `preserveWhitespaces` isn't encoded in the .d.ts and is only
      // used to increase the accuracy of a diagnostic.
      preserveWhitespaces: false,
      isExplicitlyDeferred: false,
      // We don't need to know if imported components from .d.ts
      // files are selectorless for type-checking purposes.
      selectorlessEnabled: false,
      localReferencedSymbols: null
    };
  }
  /**
   * Read pipe metadata from a referenced class in a .d.ts file.
   */
  getPipeMetadata(ref) {
    const def = this.reflector.getMembersOfClass(ref.node).find((field) => field.isStatic && field.name === "\u0275pipe");
    if (def === void 0) {
      return null;
    } else if (def.type === null || !ts15.isTypeReferenceNode(def.type) || def.type.typeArguments === void 0 || def.type.typeArguments.length < 2) {
      return null;
    }
    const type = def.type.typeArguments[1];
    if (!ts15.isLiteralTypeNode(type) || !ts15.isStringLiteral(type.literal) && type.literal.kind !== ts15.SyntaxKind.NullKeyword) {
      return null;
    }
    const name = ts15.isStringLiteral(type.literal) ? type.literal.text : null;
    const isStandalone = def.type.typeArguments.length > 2 && (readBooleanType(def.type.typeArguments[2]) ?? false);
    return {
      kind: MetaKind.Pipe,
      ref,
      name,
      nameExpr: null,
      isStandalone,
      isPure: null,
      // The DTS has no idea about that
      decorator: null,
      isExplicitlyDeferred: false
    };
  }
};
function readInputsType(type) {
  const inputsMap = {};
  if (ts15.isTypeLiteralNode(type)) {
    for (const member of type.members) {
      if (!ts15.isPropertySignature(member) || member.type === void 0 || member.name === void 0 || !ts15.isStringLiteral(member.name) && !ts15.isIdentifier(member.name)) {
        continue;
      }
      const stringValue = readStringType(member.type);
      const classPropertyName = member.name.text;
      if (stringValue != null) {
        inputsMap[classPropertyName] = {
          bindingPropertyName: stringValue,
          classPropertyName,
          required: false,
          // Signal inputs were not supported pre v16- so those inputs are never signal based.
          isSignal: false,
          // Input transform are only tracked for locally-compiled directives. Directives coming
          // from the .d.ts already have them included through `ngAcceptInputType` class members,
          // or via the `InputSignal` type of the member.
          transform: null
        };
      } else {
        const config = readMapType(member.type, (innerValue) => {
          return readStringType(innerValue) ?? readBooleanType(innerValue);
        });
        inputsMap[classPropertyName] = {
          classPropertyName,
          bindingPropertyName: config.alias,
          required: config.required,
          isSignal: !!config.isSignal,
          // Input transform are only tracked for locally-compiled directives. Directives coming
          // from the .d.ts already have them included through `ngAcceptInputType` class members,
          // or via the `InputSignal` type of the member.
          transform: null
        };
      }
    }
  }
  return inputsMap;
}
function readBaseClass(clazz, checker, reflector) {
  if (!isNamedClassDeclaration(clazz)) {
    return reflector.hasBaseClass(clazz) ? "dynamic" : null;
  }
  if (clazz.heritageClauses !== void 0) {
    for (const clause of clazz.heritageClauses) {
      if (clause.token === ts15.SyntaxKind.ExtendsKeyword) {
        const baseExpr = clause.types[0].expression;
        let symbol = checker.getSymbolAtLocation(baseExpr);
        if (symbol === void 0) {
          return "dynamic";
        } else if (symbol.flags & ts15.SymbolFlags.Alias) {
          symbol = checker.getAliasedSymbol(symbol);
        }
        if (symbol.valueDeclaration !== void 0 && isNamedClassDeclaration(symbol.valueDeclaration)) {
          return new Reference(symbol.valueDeclaration);
        } else {
          return "dynamic";
        }
      }
    }
  }
  return null;
}
function readHostDirectivesType(checker, type, bestGuessOwningModule) {
  if (!ts15.isTupleTypeNode(type) || type.elements.length === 0) {
    return null;
  }
  const result = [];
  let isIncomplete = false;
  for (const hostDirectiveType of type.elements) {
    const { directive, inputs, outputs } = readMapType(hostDirectiveType, (type2) => type2);
    if (directive) {
      if (!ts15.isTypeQueryNode(directive)) {
        throw new Error(`Expected TypeQueryNode: ${nodeDebugInfo(directive)}`);
      }
      const ref = extraReferenceFromTypeQuery(checker, directive, type, bestGuessOwningModule);
      if (ref === null) {
        isIncomplete = true;
        continue;
      }
      result.push({
        directive: ref,
        isForwardReference: false,
        inputs: readMapType(inputs, readStringType),
        outputs: readMapType(outputs, readStringType)
      });
    }
  }
  return result.length > 0 ? { result, isIncomplete } : null;
}
function moduleWithProvidersTypeArgument(type, host) {
  if (type === void 0 || !ts15.isTypeReferenceNode(type)) {
    return null;
  }
  const name = ts15.isQualifiedName(type.typeName) ? type.typeName.right : type.typeName;
  if (name.text !== "ModuleWithProviders") {
    return null;
  }
  const imp = host.getImportOfIdentifier(name);
  if (imp !== null && (imp.name !== "ModuleWithProviders" || imp.from !== "@angular/core")) {
    return null;
  }
  if (type.typeArguments === void 0 || type.typeArguments.length !== 1) {
    return null;
  }
  return type.typeArguments[0];
}

// packages/compiler-cli/src/ngtsc/metadata/src/resource_registry.js
function isExternalResource(resource) {
  return resource.path !== null;
}
var ResourceRegistry = class {
  externalTemplateToComponentsMap = /* @__PURE__ */ new Map();
  componentToTemplateMap = /* @__PURE__ */ new Map();
  componentToStylesMap = /* @__PURE__ */ new Map();
  externalStyleToComponentsMap = /* @__PURE__ */ new Map();
  directiveToHostBindingsMap = /* @__PURE__ */ new Map();
  getComponentsWithTemplate(template) {
    if (!this.externalTemplateToComponentsMap.has(template)) {
      return /* @__PURE__ */ new Set();
    }
    return this.externalTemplateToComponentsMap.get(template);
  }
  registerResources(resources, directive) {
    if (resources.template !== null) {
      this.registerTemplate(resources.template, directive);
    }
    if (resources.styles !== null) {
      for (const style of resources.styles) {
        this.registerStyle(style, directive);
      }
    }
    if (resources.hostBindings !== null) {
      this.directiveToHostBindingsMap.set(directive, resources.hostBindings);
    }
  }
  registerTemplate(templateResource, component) {
    const { path } = templateResource;
    if (path !== null) {
      if (!this.externalTemplateToComponentsMap.has(path)) {
        this.externalTemplateToComponentsMap.set(path, /* @__PURE__ */ new Set());
      }
      this.externalTemplateToComponentsMap.get(path).add(component);
    }
    this.componentToTemplateMap.set(component, templateResource);
  }
  getTemplate(component) {
    if (!this.componentToTemplateMap.has(component)) {
      return null;
    }
    return this.componentToTemplateMap.get(component);
  }
  registerStyle(styleResource, component) {
    const { path } = styleResource;
    if (!this.componentToStylesMap.has(component)) {
      this.componentToStylesMap.set(component, /* @__PURE__ */ new Set());
    }
    if (path !== null) {
      if (!this.externalStyleToComponentsMap.has(path)) {
        this.externalStyleToComponentsMap.set(path, /* @__PURE__ */ new Set());
      }
      this.externalStyleToComponentsMap.get(path).add(component);
    }
    this.componentToStylesMap.get(component).add(styleResource);
  }
  getStyles(component) {
    if (!this.componentToStylesMap.has(component)) {
      return /* @__PURE__ */ new Set();
    }
    return this.componentToStylesMap.get(component);
  }
  getComponentsWithStyle(styleUrl) {
    if (!this.externalStyleToComponentsMap.has(styleUrl)) {
      return /* @__PURE__ */ new Set();
    }
    return this.externalStyleToComponentsMap.get(styleUrl);
  }
  getHostBindings(directive) {
    return this.directiveToHostBindingsMap.get(directive) ?? null;
  }
};

// packages/compiler-cli/src/ngtsc/metadata/src/inheritance.js
import { ClassPropertyMapping as ClassPropertyMapping2 } from "@angular/compiler";
function flattenInheritedDirectiveMetadata(reader, dir) {
  const topMeta = reader.getDirectiveMetadata(dir);
  if (topMeta === null) {
    return null;
  }
  if (topMeta.baseClass === null) {
    return topMeta;
  }
  const coercedInputFields = /* @__PURE__ */ new Set();
  const undeclaredInputFields = /* @__PURE__ */ new Set();
  const restrictedInputFields = /* @__PURE__ */ new Set();
  const stringLiteralInputFields = /* @__PURE__ */ new Set();
  const publicMethods = /* @__PURE__ */ new Set();
  let hostDirectives = null;
  let isDynamic = false;
  let inputs = ClassPropertyMapping2.empty();
  let outputs = ClassPropertyMapping2.empty();
  let isStructural = false;
  const addMetadata = (meta) => {
    if (meta.baseClass === "dynamic") {
      isDynamic = true;
    } else if (meta.baseClass !== null) {
      const baseMeta = reader.getDirectiveMetadata(meta.baseClass);
      if (baseMeta !== null) {
        addMetadata(baseMeta);
      } else {
        isDynamic = true;
      }
    }
    isStructural = isStructural || meta.isStructural;
    inputs = ClassPropertyMapping2.merge(inputs, meta.inputs);
    outputs = ClassPropertyMapping2.merge(outputs, meta.outputs);
    for (const coercedInputField of meta.coercedInputFields) {
      coercedInputFields.add(coercedInputField);
    }
    for (const undeclaredInputField of meta.undeclaredInputFields) {
      undeclaredInputFields.add(undeclaredInputField);
    }
    for (const restrictedInputField of meta.restrictedInputFields) {
      restrictedInputFields.add(restrictedInputField);
    }
    for (const field of meta.stringLiteralInputFields) {
      stringLiteralInputFields.add(field);
    }
    for (const name of meta.publicMethods) {
      publicMethods.add(name);
    }
    if (meta.hostDirectives !== null && meta.hostDirectives.length > 0) {
      hostDirectives ??= [];
      hostDirectives.push(...meta.hostDirectives);
    }
  };
  addMetadata(topMeta);
  return {
    ...topMeta,
    inputs,
    outputs,
    coercedInputFields,
    undeclaredInputFields,
    restrictedInputFields,
    stringLiteralInputFields,
    publicMethods,
    baseClass: isDynamic ? "dynamic" : null,
    isStructural,
    hostDirectives
  };
}

// packages/compiler-cli/src/ngtsc/metadata/src/registry.js
var LocalMetadataRegistry = class {
  directives = /* @__PURE__ */ new Map();
  ngModules = /* @__PURE__ */ new Map();
  pipes = /* @__PURE__ */ new Map();
  getDirectiveMetadata(ref) {
    return this.directives.has(ref.node) ? this.directives.get(ref.node) : null;
  }
  getNgModuleMetadata(ref) {
    return this.ngModules.has(ref.node) ? this.ngModules.get(ref.node) : null;
  }
  getPipeMetadata(ref) {
    return this.pipes.has(ref.node) ? this.pipes.get(ref.node) : null;
  }
  registerDirectiveMetadata(meta) {
    this.directives.set(meta.ref.node, meta);
  }
  registerNgModuleMetadata(meta) {
    this.ngModules.set(meta.ref.node, meta);
  }
  registerPipeMetadata(meta) {
    this.pipes.set(meta.ref.node, meta);
  }
  getKnown(kind) {
    switch (kind) {
      case MetaKind.Directive:
        return Array.from(this.directives.values()).map((v) => v.ref.node);
      case MetaKind.Pipe:
        return Array.from(this.pipes.values()).map((v) => v.ref.node);
      case MetaKind.NgModule:
        return Array.from(this.ngModules.values()).map((v) => v.ref.node);
    }
  }
};
var CompoundMetadataRegistry = class {
  registries;
  constructor(registries) {
    this.registries = registries;
  }
  registerDirectiveMetadata(meta) {
    for (const registry of this.registries) {
      registry.registerDirectiveMetadata(meta);
    }
  }
  registerNgModuleMetadata(meta) {
    for (const registry of this.registries) {
      registry.registerNgModuleMetadata(meta);
    }
  }
  registerPipeMetadata(meta) {
    for (const registry of this.registries) {
      registry.registerPipeMetadata(meta);
    }
  }
};

// packages/compiler-cli/src/ngtsc/metadata/src/providers.js
var ExportedProviderStatusResolver = class {
  metaReader;
  /**
   * `ClassDeclaration`s that we are in the process of determining the provider status for.
   *
   * This is used to detect cycles in the import graph and avoid getting stuck in them.
   */
  calculating = /* @__PURE__ */ new Set();
  constructor(metaReader) {
    this.metaReader = metaReader;
  }
  /**
   * Determines whether `ref` may or may not export providers to NgModules which import it.
   *
   * NgModules export providers if any are declared, and standalone components export providers from
   * their `imports` array (if any).
   *
   * If `true`, then `ref` should be assumed to export providers. In practice, this could mean
   * either that `ref` is a local type that we _know_ exports providers, or it's imported from a
   * .d.ts library and is declared in a way where the compiler cannot prove that it doesn't.
   *
   * If `false`, then `ref` is guaranteed not to export providers.
   *
   * @param `ref` the class for which the provider status should be determined
   * @param `dependencyCallback` a callback that, if provided, will be called for every type
   *     which is used in the determination of provider status for `ref`
   * @returns `true` if `ref` should be assumed to export providers, or `false` if the compiler can
   *     prove that it does not
   */
  mayExportProviders(ref, dependencyCallback) {
    if (this.calculating.has(ref.node)) {
      return false;
    }
    this.calculating.add(ref.node);
    if (dependencyCallback !== void 0) {
      dependencyCallback(ref);
    }
    try {
      const dirMeta = this.metaReader.getDirectiveMetadata(ref);
      if (dirMeta !== null) {
        if (!dirMeta.isComponent || !dirMeta.isStandalone) {
          return false;
        }
        if (dirMeta.assumedToExportProviders) {
          return true;
        }
        return (dirMeta.imports ?? []).some((importRef) => this.mayExportProviders(importRef, dependencyCallback));
      }
      const pipeMeta = this.metaReader.getPipeMetadata(ref);
      if (pipeMeta !== null) {
        return false;
      }
      const ngModuleMeta = this.metaReader.getNgModuleMetadata(ref);
      if (ngModuleMeta !== null) {
        if (ngModuleMeta.mayDeclareProviders) {
          return true;
        }
        return ngModuleMeta.imports.some((importRef) => this.mayExportProviders(importRef, dependencyCallback));
      }
      return false;
    } finally {
      this.calculating.delete(ref.node);
    }
  }
};

// packages/compiler-cli/src/ngtsc/metadata/src/host_directives_resolver.js
import { ClassPropertyMapping as ClassPropertyMapping3, MatchSource as MatchSource2 } from "@angular/compiler";
var EMPTY_ARRAY = [];
var HostDirectivesResolver = class {
  metaReader;
  cache = /* @__PURE__ */ new Map();
  constructor(metaReader) {
    this.metaReader = metaReader;
  }
  /** Resolves all of the host directives that apply to a directive. */
  resolve(metadata) {
    if (this.cache.has(metadata.ref.node)) {
      return this.cache.get(metadata.ref.node);
    }
    const results = metadata.hostDirectives && metadata.hostDirectives.length > 0 ? this.walkHostDirectives(metadata.hostDirectives, []) : EMPTY_ARRAY;
    this.cache.set(metadata.ref.node, results);
    return results;
  }
  /**
   * Traverses all of the host directive chains and produces a flat array of
   * directive metadata representing the host directives that apply to the host.
   */
  walkHostDirectives(directives, results) {
    for (const current of directives) {
      if (!isHostDirectiveMetaForGlobalMode(current)) {
        throw new Error("Impossible state: resolving code path in local compilation mode");
      }
      const hostMeta = flattenInheritedDirectiveMetadata(this.metaReader, current.directive);
      if (hostMeta === null) {
        continue;
      }
      if (hostMeta.hostDirectives) {
        this.walkHostDirectives(hostMeta.hostDirectives, results);
      }
      results.push({
        ...hostMeta,
        matchSource: MatchSource2.HostDirective,
        inputs: ClassPropertyMapping3.fromMappedObject(this.filterMappings(hostMeta.inputs, current.inputs, resolveInput)),
        outputs: ClassPropertyMapping3.fromMappedObject(this.filterMappings(hostMeta.outputs, current.outputs, resolveOutput))
      });
    }
    return results;
  }
  /**
   * Filters the class property mappings so that only the allowed ones are present.
   * @param source Property mappings that should be filtered.
   * @param allowedProperties Property mappings that are allowed in the final results.
   * @param valueResolver Function used to resolve the value that is assigned to the final mapping.
   */
  filterMappings(source, allowedProperties, valueResolver) {
    const result = {};
    if (allowedProperties !== null) {
      for (const publicName in allowedProperties) {
        if (allowedProperties.hasOwnProperty(publicName)) {
          const bindings = source.getByBindingPropertyName(publicName);
          if (bindings !== null) {
            for (const binding of bindings) {
              result[binding.classPropertyName] = valueResolver(allowedProperties[publicName], binding);
            }
          }
        }
      }
    }
    return result;
  }
};
function resolveInput(bindingName, binding) {
  return {
    bindingPropertyName: bindingName,
    classPropertyName: binding.classPropertyName,
    required: binding.required,
    transform: binding.transform,
    isSignal: binding.isSignal
  };
}
function resolveOutput(bindingName) {
  return bindingName;
}

// packages/compiler-cli/src/ngtsc/translator/src/import_manager/import_manager.js
import ts20 from "typescript";

// packages/compiler-cli/src/ngtsc/translator/src/import_manager/check_unique_identifier_name.js
import ts16 from "typescript";
function createGenerateUniqueIdentifierHelper() {
  const generatedIdentifiers = /* @__PURE__ */ new Set();
  const isGeneratedIdentifier = (sf, identifierName) => generatedIdentifiers.has(`${sf.fileName}@@${identifierName}`);
  const markIdentifierAsGenerated = (sf, identifierName) => generatedIdentifiers.add(`${sf.fileName}@@${identifierName}`);
  return (sourceFile, symbolName) => {
    const sf = sourceFile;
    if (sf["identifiers"] === void 0) {
      throw new Error("Source file unexpectedly lacks map of parsed `identifiers`.");
    }
    const isUniqueIdentifier = (name2) => !sf["identifiers"].has(name2) && !isGeneratedIdentifier(sf, name2);
    if (isUniqueIdentifier(symbolName)) {
      markIdentifierAsGenerated(sf, symbolName);
      return null;
    }
    let name = null;
    let counter = 1;
    do {
      name = `${symbolName}_${counter++}`;
    } while (!isUniqueIdentifier(name));
    markIdentifierAsGenerated(sf, name);
    return ts16.factory.createUniqueName(name, ts16.GeneratedIdentifierFlags.Optimistic);
  };
}

// packages/compiler-cli/src/ngtsc/translator/src/import_manager/import_typescript_transform.js
import ts17 from "typescript";
function createTsTransformForImportManager(manager, extraStatementsForFiles) {
  return (ctx) => {
    const { affectedFiles, newImports, updatedImports, reusedOriginalAliasDeclarations, deletedImports } = manager.finalize();
    if (reusedOriginalAliasDeclarations.size > 0) {
      const referencedAliasDeclarations = loadIsReferencedAliasDeclarationPatch(ctx);
      if (referencedAliasDeclarations !== null) {
        reusedOriginalAliasDeclarations.forEach((aliasDecl) => referencedAliasDeclarations.add(aliasDecl));
      }
    }
    if (extraStatementsForFiles !== void 0) {
      for (const [fileName, statements] of extraStatementsForFiles.entries()) {
        if (statements.length > 0) {
          affectedFiles.add(fileName);
        }
      }
    }
    const visitStatement = (node) => {
      if (!ts17.isImportDeclaration(node)) {
        return node;
      }
      if (deletedImports.has(node)) {
        return void 0;
      }
      if (node.importClause === void 0 || !ts17.isImportClause(node.importClause)) {
        return node;
      }
      const clause = node.importClause;
      if (clause.namedBindings === void 0 || !ts17.isNamedImports(clause.namedBindings) || !updatedImports.has(clause.namedBindings)) {
        return node;
      }
      const newClause = ctx.factory.updateImportClause(clause, clause.phaseModifier, clause.name, updatedImports.get(clause.namedBindings));
      const newImport = ctx.factory.updateImportDeclaration(node, node.modifiers, newClause, node.moduleSpecifier, node.attributes);
      ts17.setOriginalNode(newImport, {
        importClause: newClause,
        kind: newImport.kind
      });
      return newImport;
    };
    return (sourceFile) => {
      if (!affectedFiles.has(sourceFile.fileName)) {
        return sourceFile;
      }
      sourceFile = ts17.visitEachChild(sourceFile, visitStatement, ctx);
      const extraStatements = extraStatementsForFiles?.get(sourceFile.fileName) ?? [];
      const existingImports = [];
      const body = [];
      for (const statement of sourceFile.statements) {
        if (isImportStatement(statement)) {
          existingImports.push(statement);
        } else {
          body.push(statement);
        }
      }
      return ctx.factory.updateSourceFile(sourceFile, [
        ...existingImports,
        ...newImports.get(sourceFile.fileName) ?? [],
        ...extraStatements,
        ...body
      ], sourceFile.isDeclarationFile, sourceFile.referencedFiles, sourceFile.typeReferenceDirectives, sourceFile.hasNoDefaultLib, sourceFile.libReferenceDirectives);
    };
  };
}
function isImportStatement(stmt) {
  return ts17.isImportDeclaration(stmt) || ts17.isImportEqualsDeclaration(stmt) || ts17.isNamespaceImport(stmt);
}

// packages/compiler-cli/src/ngtsc/translator/src/import_manager/reuse_generated_imports.js
import ts18 from "typescript";
function attemptToReuseGeneratedImports(tracker, request) {
  const requestHash = hashImportRequest(request);
  const existingExactImport = tracker.directReuseCache.get(requestHash);
  if (existingExactImport !== void 0) {
    return existingExactImport;
  }
  const potentialNamespaceImport = tracker.namespaceImportReuseCache.get(request.exportModuleSpecifier);
  if (potentialNamespaceImport === void 0) {
    return null;
  }
  if (request.exportSymbolName === null) {
    return potentialNamespaceImport;
  }
  return [potentialNamespaceImport, ts18.factory.createIdentifier(request.exportSymbolName)];
}
function captureGeneratedImport(request, tracker, referenceNode) {
  tracker.directReuseCache.set(hashImportRequest(request), referenceNode);
  if (request.exportSymbolName === null && !Array.isArray(referenceNode)) {
    tracker.namespaceImportReuseCache.set(request.exportModuleSpecifier, referenceNode);
  }
}
function hashImportRequest(req) {
  return `${req.requestedFile.fileName}:${req.exportModuleSpecifier}:${req.exportSymbolName}${req.unsafeAliasOverride ? ":" + req.unsafeAliasOverride : ""}`;
}

// packages/compiler-cli/src/ngtsc/translator/src/import_manager/reuse_source_file_imports.js
import ts19 from "typescript";
function attemptToReuseExistingSourceFileImports(tracker, sourceFile, request) {
  let candidateImportToBeUpdated = null;
  for (let i = sourceFile.statements.length - 1; i >= 0; i--) {
    const statement = sourceFile.statements[i];
    if (!ts19.isImportDeclaration(statement) || !ts19.isStringLiteral(statement.moduleSpecifier)) {
      continue;
    }
    if (!statement.importClause || statement.importClause.phaseModifier === ts19.SyntaxKind.TypeKeyword) {
      continue;
    }
    const moduleSpecifier = statement.moduleSpecifier.text;
    if (moduleSpecifier !== request.exportModuleSpecifier) {
      continue;
    }
    if (statement.importClause.namedBindings) {
      const namedBindings = statement.importClause.namedBindings;
      if (ts19.isNamespaceImport(namedBindings)) {
        tracker.reusedAliasDeclarations.add(namedBindings);
        if (request.exportSymbolName === null) {
          return namedBindings.name;
        }
        return [namedBindings.name, ts19.factory.createIdentifier(request.exportSymbolName)];
      }
      if (ts19.isNamedImports(namedBindings) && request.exportSymbolName !== null) {
        const existingElement = namedBindings.elements.find((e) => {
          let nameMatches;
          if (request.unsafeAliasOverride) {
            nameMatches = e.propertyName?.text === request.exportSymbolName && e.name.text === request.unsafeAliasOverride;
          } else {
            nameMatches = e.propertyName ? e.propertyName.text === request.exportSymbolName : e.name.text === request.exportSymbolName;
          }
          return !e.isTypeOnly && nameMatches;
        });
        if (existingElement !== void 0) {
          tracker.reusedAliasDeclarations.add(existingElement);
          return existingElement.name;
        }
        candidateImportToBeUpdated = statement;
      }
    }
  }
  if (candidateImportToBeUpdated === null || request.exportSymbolName === null) {
    return null;
  }
  if (!tracker.updatedImports.has(candidateImportToBeUpdated)) {
    tracker.updatedImports.set(candidateImportToBeUpdated, []);
  }
  const symbolsToBeImported = tracker.updatedImports.get(candidateImportToBeUpdated);
  const propertyName = ts19.factory.createIdentifier(request.exportSymbolName);
  const fileUniqueAlias = request.unsafeAliasOverride ? ts19.factory.createIdentifier(request.unsafeAliasOverride) : tracker.generateUniqueIdentifier(sourceFile, request.exportSymbolName);
  symbolsToBeImported.push({
    propertyName,
    fileUniqueAlias
  });
  return fileUniqueAlias ?? propertyName;
}

// packages/compiler-cli/src/ngtsc/translator/src/import_manager/import_manager.js
var presetImportManagerForceNamespaceImports = {
  // Forcing namespace imports also means no-reuse.
  // Re-using would otherwise become more complicated and we don't
  // expect re-usable namespace imports.
  disableOriginalSourceFileReuse: true,
  forceGenerateNamespacesForNewImports: true
};
var ImportManager = class {
  /** List of new imports that will be inserted into given source files. */
  newImports = /* @__PURE__ */ new Map();
  /**
   * Keeps track of imports marked for removal. The root-level key is the file from which the
   * import should be removed, the inner map key is the name of the module from which the symbol
   * is being imported. The value of the inner map is a set of symbol names that should be removed.
   * Note! the inner map tracks the original names of the imported symbols, not their local aliases.
   */
  removedImports = /* @__PURE__ */ new Map();
  nextUniqueIndex = 0;
  config;
  reuseSourceFileImportsTracker;
  reuseGeneratedImportsTracker = {
    directReuseCache: /* @__PURE__ */ new Map(),
    namespaceImportReuseCache: /* @__PURE__ */ new Map()
  };
  constructor(config = {}) {
    this.config = {
      shouldUseSingleQuotes: config.shouldUseSingleQuotes ?? (() => false),
      rewriter: config.rewriter ?? null,
      disableOriginalSourceFileReuse: config.disableOriginalSourceFileReuse ?? false,
      forceGenerateNamespacesForNewImports: config.forceGenerateNamespacesForNewImports ?? false,
      namespaceImportPrefix: config.namespaceImportPrefix ?? "i",
      generateUniqueIdentifier: config.generateUniqueIdentifier ?? createGenerateUniqueIdentifierHelper()
    };
    this.reuseSourceFileImportsTracker = {
      generateUniqueIdentifier: this.config.generateUniqueIdentifier,
      reusedAliasDeclarations: /* @__PURE__ */ new Set(),
      updatedImports: /* @__PURE__ */ new Map()
    };
  }
  /** Adds a side-effect import for the given module. */
  addSideEffectImport(requestedFile, moduleSpecifier) {
    if (this.config.rewriter !== null) {
      moduleSpecifier = this.config.rewriter.rewriteSpecifier(moduleSpecifier, requestedFile.fileName);
    }
    this._getNewImportsTrackerForFile(requestedFile).sideEffectImports.add(moduleSpecifier);
  }
  addImport(request) {
    if (this.config.rewriter !== null) {
      if (request.exportSymbolName !== null) {
        request.exportSymbolName = this.config.rewriter.rewriteSymbol(request.exportSymbolName, request.exportModuleSpecifier);
      }
      request.exportModuleSpecifier = this.config.rewriter.rewriteSpecifier(request.exportModuleSpecifier, request.requestedFile.fileName);
    }
    if (request.exportSymbolName !== null && !request.asTypeReference) {
      this.removedImports.get(request.requestedFile)?.get(request.exportModuleSpecifier)?.delete(request.exportSymbolName);
    }
    const previousGeneratedImportRef = attemptToReuseGeneratedImports(this.reuseGeneratedImportsTracker, request);
    if (previousGeneratedImportRef !== null) {
      return createImportReference(!!request.asTypeReference, previousGeneratedImportRef);
    }
    const resultImportRef = this._generateNewImport(request);
    captureGeneratedImport(request, this.reuseGeneratedImportsTracker, resultImportRef);
    return createImportReference(!!request.asTypeReference, resultImportRef);
  }
  /**
   * Marks all imported symbols with a specific name for removal.
   * Call `addImport` to undo this operation.
   * @param requestedFile File from which to remove the imports.
   * @param exportSymbolName Declared name of the symbol being removed.
   * @param moduleSpecifier Module from which the symbol is being imported.
   */
  removeImport(requestedFile, exportSymbolName, moduleSpecifier) {
    let moduleMap = this.removedImports.get(requestedFile);
    if (!moduleMap) {
      moduleMap = /* @__PURE__ */ new Map();
      this.removedImports.set(requestedFile, moduleMap);
    }
    let removedSymbols = moduleMap.get(moduleSpecifier);
    if (!removedSymbols) {
      removedSymbols = /* @__PURE__ */ new Set();
      moduleMap.set(moduleSpecifier, removedSymbols);
    }
    removedSymbols.add(exportSymbolName);
  }
  _generateNewImport(request) {
    const { requestedFile: sourceFile } = request;
    const disableOriginalSourceFileReuse = this.config.disableOriginalSourceFileReuse;
    const forceGenerateNamespacesForNewImports = this.config.forceGenerateNamespacesForNewImports;
    if (!disableOriginalSourceFileReuse) {
      const reuseResult = attemptToReuseExistingSourceFileImports(this.reuseSourceFileImportsTracker, sourceFile, request);
      if (reuseResult !== null) {
        return reuseResult;
      }
    }
    const { namedImports, namespaceImports } = this._getNewImportsTrackerForFile(sourceFile);
    if (request.exportSymbolName === null || forceGenerateNamespacesForNewImports) {
      let namespaceImportName = `${this.config.namespaceImportPrefix}${this.nextUniqueIndex++}`;
      if (this.config.rewriter) {
        namespaceImportName = this.config.rewriter.rewriteNamespaceImportIdentifier(namespaceImportName, request.exportModuleSpecifier);
      }
      const namespaceImport2 = ts20.factory.createNamespaceImport(this.config.generateUniqueIdentifier(sourceFile, namespaceImportName) ?? ts20.factory.createIdentifier(namespaceImportName));
      namespaceImports.set(request.exportModuleSpecifier, namespaceImport2);
      captureGeneratedImport({ ...request, exportSymbolName: null }, this.reuseGeneratedImportsTracker, namespaceImport2.name);
      if (request.exportSymbolName !== null) {
        return [namespaceImport2.name, ts20.factory.createIdentifier(request.exportSymbolName)];
      }
      return namespaceImport2.name;
    }
    if (!namedImports.has(request.exportModuleSpecifier)) {
      namedImports.set(request.exportModuleSpecifier, []);
    }
    const exportSymbolName = ts20.factory.createIdentifier(request.exportSymbolName);
    const fileUniqueName = request.unsafeAliasOverride ? null : this.config.generateUniqueIdentifier(sourceFile, request.exportSymbolName);
    let needsAlias;
    let specifierName;
    if (request.unsafeAliasOverride) {
      needsAlias = true;
      specifierName = ts20.factory.createIdentifier(request.unsafeAliasOverride);
    } else if (fileUniqueName !== null) {
      needsAlias = true;
      specifierName = fileUniqueName;
    } else {
      needsAlias = false;
      specifierName = exportSymbolName;
    }
    namedImports.get(request.exportModuleSpecifier).push(ts20.factory.createImportSpecifier(false, needsAlias ? exportSymbolName : void 0, specifierName));
    return specifierName;
  }
  /**
   * Finalizes the import manager by computing all necessary import changes
   * and returning them.
   *
   * Changes are collected once at the end, after all imports are requested,
   * because this simplifies building up changes to existing imports that need
   * to be updated, and allows more trivial re-use of previous generated imports.
   */
  finalize() {
    const affectedFiles = /* @__PURE__ */ new Set();
    const updatedImportsResult = /* @__PURE__ */ new Map();
    const newImportsResult = /* @__PURE__ */ new Map();
    const deletedImports = /* @__PURE__ */ new Set();
    const importDeclarationsPerFile = /* @__PURE__ */ new Map();
    const addNewImport = (fileName, importDecl) => {
      affectedFiles.add(fileName);
      if (newImportsResult.has(fileName)) {
        newImportsResult.get(fileName).push(importDecl);
      } else {
        newImportsResult.set(fileName, [importDecl]);
      }
    };
    this.reuseSourceFileImportsTracker.updatedImports.forEach((expressions, importDecl) => {
      const sourceFile = importDecl.getSourceFile();
      const namedBindings = importDecl.importClause.namedBindings;
      const moduleName = importDecl.moduleSpecifier.text;
      const newElements = namedBindings.elements.concat(expressions.map(({ propertyName, fileUniqueAlias }) => ts20.factory.createImportSpecifier(false, fileUniqueAlias !== null ? propertyName : void 0, fileUniqueAlias ?? propertyName))).filter((specifier) => this._canAddSpecifier(sourceFile, moduleName, specifier));
      affectedFiles.add(sourceFile.fileName);
      if (newElements.length === 0) {
        deletedImports.add(importDecl);
      } else {
        updatedImportsResult.set(namedBindings, ts20.factory.updateNamedImports(namedBindings, newElements));
      }
    });
    this.removedImports.forEach((removeMap, sourceFile) => {
      if (removeMap.size === 0) {
        return;
      }
      let allImports = importDeclarationsPerFile.get(sourceFile);
      if (!allImports) {
        allImports = sourceFile.statements.filter(ts20.isImportDeclaration);
        importDeclarationsPerFile.set(sourceFile, allImports);
      }
      for (const node of allImports) {
        if (!node.importClause?.namedBindings || !ts20.isNamedImports(node.importClause.namedBindings) || this.reuseSourceFileImportsTracker.updatedImports.has(node) || deletedImports.has(node)) {
          continue;
        }
        const namedBindings = node.importClause.namedBindings;
        const moduleName = node.moduleSpecifier.text;
        const newImports = namedBindings.elements.filter((specifier) => this._canAddSpecifier(sourceFile, moduleName, specifier));
        if (newImports.length === 0) {
          affectedFiles.add(sourceFile.fileName);
          deletedImports.add(node);
        } else if (newImports.length !== namedBindings.elements.length) {
          affectedFiles.add(sourceFile.fileName);
          updatedImportsResult.set(namedBindings, ts20.factory.updateNamedImports(namedBindings, newImports));
        }
      }
    });
    this.newImports.forEach(({ namedImports, namespaceImports, sideEffectImports }, sourceFile) => {
      const useSingleQuotes = this.config.shouldUseSingleQuotes(sourceFile);
      const fileName = sourceFile.fileName;
      sideEffectImports.forEach((moduleName) => {
        addNewImport(fileName, ts20.factory.createImportDeclaration(void 0, void 0, ts20.factory.createStringLiteral(moduleName)));
      });
      namespaceImports.forEach((namespaceImport2, moduleName) => {
        const newImport = ts20.factory.createImportDeclaration(void 0, ts20.factory.createImportClause(void 0, void 0, namespaceImport2), ts20.factory.createStringLiteral(moduleName, useSingleQuotes));
        ts20.setOriginalNode(namespaceImport2.name, newImport);
        addNewImport(fileName, newImport);
      });
      namedImports.forEach((specifiers, moduleName) => {
        const filteredSpecifiers = specifiers.filter((specifier) => this._canAddSpecifier(sourceFile, moduleName, specifier));
        if (filteredSpecifiers.length > 0) {
          const newImport = ts20.factory.createImportDeclaration(void 0, ts20.factory.createImportClause(void 0, void 0, ts20.factory.createNamedImports(filteredSpecifiers)), ts20.factory.createStringLiteral(moduleName, useSingleQuotes));
          addNewImport(fileName, newImport);
        }
      });
    });
    return {
      affectedFiles,
      newImports: newImportsResult,
      updatedImports: updatedImportsResult,
      reusedOriginalAliasDeclarations: this.reuseSourceFileImportsTracker.reusedAliasDeclarations,
      deletedImports
    };
  }
  /**
   * Gets a TypeScript transform for the import manager.
   *
   * @param extraStatementsMap Additional set of statements to be inserted
   *   for given source files after their imports. E.g. top-level constants.
   */
  toTsTransform(extraStatementsMap) {
    return createTsTransformForImportManager(this, extraStatementsMap);
  }
  /**
   * Transforms a single file as a shorthand, using {@link toTsTransform}.
   *
   * @param extraStatementsMap Additional set of statements to be inserted
   *   for given source files after their imports. E.g. top-level constants.
   */
  transformTsFile(ctx, file, extraStatementsAfterImports) {
    const extraStatementsMap = extraStatementsAfterImports ? /* @__PURE__ */ new Map([[file.fileName, extraStatementsAfterImports]]) : void 0;
    return this.toTsTransform(extraStatementsMap)(ctx)(file);
  }
  _getNewImportsTrackerForFile(file) {
    if (!this.newImports.has(file)) {
      this.newImports.set(file, {
        namespaceImports: /* @__PURE__ */ new Map(),
        namedImports: /* @__PURE__ */ new Map(),
        sideEffectImports: /* @__PURE__ */ new Set()
      });
    }
    return this.newImports.get(file);
  }
  _canAddSpecifier(sourceFile, moduleSpecifier, specifier) {
    return !this.removedImports.get(sourceFile)?.get(moduleSpecifier)?.has((specifier.propertyName || specifier.name).text);
  }
};
function createImportReference(asTypeReference, ref) {
  if (asTypeReference) {
    return Array.isArray(ref) ? ts20.factory.createQualifiedName(ref[0], ref[1]) : ref;
  } else {
    return Array.isArray(ref) ? ts20.factory.createPropertyAccessExpression(ref[0], ref[1]) : ref;
  }
}

// packages/compiler-cli/src/ngtsc/translator/src/type_emitter.js
import ts21 from "typescript";
var INELIGIBLE = {};
function canEmitType(type, canEmit) {
  return canEmitTypeWorker(type);
  function canEmitTypeWorker(type2) {
    return visitNode(type2) !== INELIGIBLE;
  }
  function visitNode(node) {
    if (ts21.isImportTypeNode(node)) {
      return INELIGIBLE;
    }
    if (ts21.isTypeReferenceNode(node) && !canEmitTypeReference(node)) {
      return INELIGIBLE;
    } else {
      return ts21.forEachChild(node, visitNode);
    }
  }
  function canEmitTypeReference(type2) {
    if (!canEmit(type2)) {
      return false;
    }
    return type2.typeArguments === void 0 || type2.typeArguments.every(canEmitTypeWorker);
  }
}
var TypeEmitter = class {
  translator;
  constructor(translator) {
    this.translator = translator;
  }
  emitType(type) {
    const typeReferenceTransformer = (context) => {
      const visitNode = (node) => {
        if (ts21.isImportTypeNode(node)) {
          throw new Error("Unable to emit import type");
        }
        if (ts21.isTypeReferenceNode(node)) {
          return this.emitTypeReference(node);
        } else if (ts21.isLiteralExpression(node)) {
          let clone;
          if (ts21.isStringLiteral(node)) {
            clone = ts21.factory.createStringLiteral(node.text);
          } else if (ts21.isNumericLiteral(node)) {
            clone = ts21.factory.createNumericLiteral(node.text);
          } else if (ts21.isBigIntLiteral(node)) {
            clone = ts21.factory.createBigIntLiteral(node.text);
          } else if (ts21.isNoSubstitutionTemplateLiteral(node)) {
            clone = ts21.factory.createNoSubstitutionTemplateLiteral(node.text, node.rawText);
          } else if (ts21.isRegularExpressionLiteral(node)) {
            clone = ts21.factory.createRegularExpressionLiteral(node.text);
          } else {
            throw new Error(`Unsupported literal kind ${ts21.SyntaxKind[node.kind]}`);
          }
          ts21.setTextRange(clone, { pos: -1, end: -1 });
          return clone;
        } else {
          return ts21.visitEachChild(node, visitNode, context);
        }
      };
      return (node) => ts21.visitNode(node, visitNode, ts21.isTypeNode);
    };
    return ts21.transform(type, [typeReferenceTransformer]).transformed[0];
  }
  emitTypeReference(type) {
    const translatedType = this.translator(type);
    if (translatedType === null) {
      throw new Error("Unable to emit an unresolved reference");
    }
    let typeArguments = void 0;
    if (type.typeArguments !== void 0) {
      typeArguments = ts21.factory.createNodeArray(type.typeArguments.map((typeArg) => this.emitType(typeArg)));
    }
    return ts21.factory.updateTypeReferenceNode(type, translatedType.typeName, typeArguments);
  }
};

// packages/compiler-cli/src/ngtsc/translator/src/type_translator.js
import * as o from "@angular/compiler";
import ts23 from "typescript";

// packages/compiler-cli/src/ngtsc/translator/src/ts_util.js
import ts22 from "typescript";
function tsNumericExpression(value) {
  if (value < 0) {
    const operand = ts22.factory.createNumericLiteral(Math.abs(value));
    return ts22.factory.createPrefixUnaryExpression(ts22.SyntaxKind.MinusToken, operand);
  }
  return ts22.factory.createNumericLiteral(value);
}

// packages/compiler-cli/src/ngtsc/translator/src/type_translator.js
function translateType(type, contextFile, reflector, refEmitter, imports) {
  return type.visitType(new TypeTranslatorVisitor(imports, contextFile, reflector, refEmitter), new Context(false));
}
var TypeTranslatorVisitor = class {
  imports;
  contextFile;
  reflector;
  refEmitter;
  constructor(imports, contextFile, reflector, refEmitter) {
    this.imports = imports;
    this.contextFile = contextFile;
    this.reflector = reflector;
    this.refEmitter = refEmitter;
  }
  visitBuiltinType(type, context) {
    switch (type.name) {
      case o.BuiltinTypeName.Bool:
        return ts23.factory.createKeywordTypeNode(ts23.SyntaxKind.BooleanKeyword);
      case o.BuiltinTypeName.Dynamic:
        return ts23.factory.createKeywordTypeNode(ts23.SyntaxKind.AnyKeyword);
      case o.BuiltinTypeName.Int:
      case o.BuiltinTypeName.Number:
        return ts23.factory.createKeywordTypeNode(ts23.SyntaxKind.NumberKeyword);
      case o.BuiltinTypeName.String:
        return ts23.factory.createKeywordTypeNode(ts23.SyntaxKind.StringKeyword);
      case o.BuiltinTypeName.None:
        return ts23.factory.createKeywordTypeNode(ts23.SyntaxKind.NeverKeyword);
      default:
        throw new Error(`Unsupported builtin type: ${o.BuiltinTypeName[type.name]}`);
    }
  }
  visitExpressionType(type, context) {
    const typeNode = this.translateExpression(type.value, context);
    if (type.typeParams === null) {
      return typeNode;
    }
    if (!ts23.isTypeReferenceNode(typeNode)) {
      throw new Error("An ExpressionType with type arguments must translate into a TypeReferenceNode");
    } else if (typeNode.typeArguments !== void 0) {
      throw new Error(`An ExpressionType with type arguments cannot have multiple levels of type arguments`);
    }
    const typeArgs = type.typeParams.map((param) => this.translateType(param, context));
    return ts23.factory.createTypeReferenceNode(typeNode.typeName, typeArgs);
  }
  visitArrayType(type, context) {
    return ts23.factory.createArrayTypeNode(this.translateType(type.of, context));
  }
  visitMapType(type, context) {
    const parameter = ts23.factory.createParameterDeclaration(void 0, void 0, "key", void 0, ts23.factory.createKeywordTypeNode(ts23.SyntaxKind.StringKeyword));
    const typeArgs = type.valueType !== null ? this.translateType(type.valueType, context) : ts23.factory.createKeywordTypeNode(ts23.SyntaxKind.UnknownKeyword);
    const indexSignature = ts23.factory.createIndexSignature(void 0, [parameter], typeArgs);
    return ts23.factory.createTypeLiteralNode([indexSignature]);
  }
  visitTransplantedType(ast, context) {
    const node = ast.type instanceof Reference ? ast.type.node : ast.type;
    if (!ts23.isTypeNode(node)) {
      throw new Error(`A TransplantedType must wrap a TypeNode`);
    }
    const viaModule = ast.type instanceof Reference ? ast.type.bestGuessOwningModule : null;
    const emitter = new TypeEmitter((typeRef) => this.translateTypeReference(typeRef, context, viaModule));
    return emitter.emitType(node);
  }
  visitReadVarExpr(ast, context) {
    if (ast.name === null) {
      throw new Error(`ReadVarExpr with no variable name in type`);
    }
    return ts23.factory.createTypeQueryNode(ts23.factory.createIdentifier(ast.name));
  }
  visitInvokeFunctionExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitTaggedTemplateLiteralExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitTemplateLiteralExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitTemplateLiteralElementExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitInstantiateExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitLiteralExpr(ast, context) {
    if (ast.value === null) {
      return ts23.factory.createLiteralTypeNode(ts23.factory.createNull());
    } else if (ast.value === void 0) {
      return ts23.factory.createKeywordTypeNode(ts23.SyntaxKind.UndefinedKeyword);
    } else if (typeof ast.value === "boolean") {
      return ts23.factory.createLiteralTypeNode(ast.value ? ts23.factory.createTrue() : ts23.factory.createFalse());
    } else if (typeof ast.value === "number") {
      return ts23.factory.createLiteralTypeNode(tsNumericExpression(ast.value));
    } else {
      return ts23.factory.createLiteralTypeNode(ts23.factory.createStringLiteral(ast.value));
    }
  }
  visitLocalizedString(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitExternalExpr(ast, context) {
    if (ast.value.moduleName === null || ast.value.name === null) {
      throw new Error(`Import unknown module or symbol`);
    }
    const typeName = this.imports.addImport({
      exportModuleSpecifier: ast.value.moduleName,
      exportSymbolName: ast.value.name,
      requestedFile: this.contextFile,
      asTypeReference: true
    });
    const typeArguments = ast.typeParams !== null ? ast.typeParams.map((type) => this.translateType(type, context)) : void 0;
    return ts23.factory.createTypeReferenceNode(typeName, typeArguments);
  }
  visitConditionalExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitDynamicImportExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitRegularExpressionLiteral(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitNotExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitFunctionExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitArrowFunctionExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitUnaryOperatorExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitBinaryOperatorExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitReadPropExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitReadKeyExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitLiteralArrayExpr(ast, context) {
    const values = ast.entries.map((expr) => this.translateExpression(expr, context));
    return ts23.factory.createTupleTypeNode(values);
  }
  visitLiteralMapExpr(ast, context) {
    const entries = ast.entries.map((entry) => {
      if (entry instanceof o.LiteralMapSpreadAssignment) {
        throw new Error("Spread is not supported in this context");
      }
      const { key, quoted } = entry;
      const type = this.translateExpression(entry.value, context);
      return ts23.factory.createPropertySignature(
        /* modifiers */
        void 0,
        /* name */
        quoted ? ts23.factory.createStringLiteral(key) : key,
        /* questionToken */
        void 0,
        /* type */
        type
      );
    });
    return ts23.factory.createTypeLiteralNode(entries);
  }
  visitCommaExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitWrappedNodeExpr(ast, context) {
    const node = ast.node;
    if (ts23.isEntityName(node)) {
      return ts23.factory.createTypeReferenceNode(this.routeEntityNameThroughImportManager(node));
    } else if (ts23.isPropertyAccessExpression(node)) {
      const entityName = expressionToEntityName(node);
      if (entityName !== null) {
        return ts23.factory.createTypeReferenceNode(this.routeEntityNameThroughImportManager(entityName));
      }
      throw new Error(`Unsupported PropertyAccessExpression in TypeTranslatorVisitor: ${node.getText()} in ${node.getSourceFile()?.fileName}`);
    } else if (ts23.isTypeNode(node)) {
      return this.routeEntityNamesInTypeNodeThroughImportManager(node);
    } else if (ts23.isLiteralExpression(node)) {
      return ts23.factory.createLiteralTypeNode(node);
    } else if (ts23.isTypeParameterDeclaration(node)) {
      return ts23.factory.createTypeReferenceNode(node.name);
    } else {
      throw new Error(`Unsupported WrappedNodeExpr in TypeTranslatorVisitor: ${ts23.SyntaxKind[node.kind]} in ${node.getSourceFile()?.fileName}`);
    }
  }
  /**
   * If `name`'s leftmost identifier resolves to an import in the source file, replace it with a
   * namespaced reference registered via the `ImportManager` (e.g. `Foo` → `iN.Foo` + `import * as
   * iN from './foo'` in the emitted file). Returns the entity name unchanged for local symbols or
   * synthetic identifiers (e.g. the global `ReturnType`).
   */
  routeEntityNameThroughImportManager(name) {
    let leftmost = name;
    while (ts23.isQualifiedName(leftmost)) {
      leftmost = leftmost.left;
    }
    if (!ts23.isIdentifier(leftmost)) {
      return name;
    }
    if (leftmost.parent === void 0) {
      return name;
    }
    const imp = this.reflector.getImportOfIdentifier(leftmost);
    if (imp === null) {
      return name;
    }
    const namespaced = this.imports.addImport({
      exportModuleSpecifier: imp.from,
      exportSymbolName: imp.name,
      requestedFile: this.contextFile,
      asTypeReference: true
    });
    return replaceLeftmostEntityName(name, namespaced);
  }
  routeEntityNamesInTypeNodeThroughImportManager(typeNode) {
    const transformer = (context) => {
      const visit = (node) => {
        if (ts23.isTypeReferenceNode(node)) {
          const typeName = this.routeEntityNameThroughImportManager(node.typeName);
          const typeArguments = node.typeArguments ? ts23.visitNodes(node.typeArguments, visit, ts23.isTypeNode) : void 0;
          return ts23.factory.updateTypeReferenceNode(node, typeName, typeArguments);
        }
        if (ts23.isTypeQueryNode(node)) {
          const exprName = this.routeEntityNameThroughImportManager(node.exprName);
          return ts23.factory.updateTypeQueryNode(node, exprName, node.typeArguments);
        }
        return ts23.visitEachChild(node, visit, context);
      };
      return (root) => ts23.visitNode(root, visit, ts23.isTypeNode);
    };
    return ts23.transform(typeNode, [transformer]).transformed[0];
  }
  visitTypeofExpr(ast, context) {
    const typeNode = this.translateExpression(ast.expr, context);
    if (!ts23.isTypeReferenceNode(typeNode)) {
      throw new Error(`The target of a typeof expression must be a type reference, but it was
          ${ts23.SyntaxKind[typeNode.kind]}`);
    }
    return ts23.factory.createTypeQueryNode(typeNode.typeName);
  }
  visitVoidExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitParenthesizedExpr(ast, context) {
    throw new Error("Method not implemented.");
  }
  visitSpreadElementExpr(ast, context) {
    const typeNode = this.translateExpression(ast.expression, context);
    return ts23.factory.createRestTypeNode(typeNode);
  }
  translateType(type, context) {
    const typeNode = type.visitType(this, context);
    if (!ts23.isTypeNode(typeNode)) {
      throw new Error(`A Type must translate to a TypeNode, but was ${ts23.SyntaxKind[typeNode.kind]}`);
    }
    return typeNode;
  }
  translateExpression(expr, context) {
    const typeNode = expr.visitExpression(this, context);
    if (!ts23.isTypeNode(typeNode)) {
      throw new Error(`An Expression must translate to a TypeNode, but was ${ts23.SyntaxKind[typeNode.kind]}`);
    }
    return typeNode;
  }
  translateTypeReference(type, context, viaModule) {
    const target = ts23.isIdentifier(type.typeName) ? type.typeName : type.typeName.right;
    const declaration = this.reflector.getDeclarationOfIdentifier(target);
    if (declaration === null) {
      throw new Error(`Unable to statically determine the declaration file of type node ${target.text}`);
    }
    let owningModule2 = viaModule;
    if (typeof declaration.viaModule === "string") {
      owningModule2 = {
        specifier: declaration.viaModule,
        resolutionContext: type.getSourceFile().fileName
      };
    }
    const reference = new Reference(declaration.node, declaration.viaModule === AmbientImport ? AmbientImport : owningModule2);
    const emittedType = this.refEmitter.emit(reference, this.contextFile, ImportFlags.NoAliasing | ImportFlags.AllowTypeImports | ImportFlags.AllowAmbientReferences);
    assertSuccessfulReferenceEmit(emittedType, target, "type");
    const typeNode = this.translateExpression(emittedType.expression, context);
    if (!ts23.isTypeReferenceNode(typeNode)) {
      throw new Error(`Expected TypeReferenceNode for emitted reference, got ${ts23.SyntaxKind[typeNode.kind]}.`);
    }
    return typeNode;
  }
};
function replaceLeftmostEntityName(name, newLeftmost) {
  if (ts23.isIdentifier(name)) {
    return newLeftmost;
  }
  return ts23.factory.createQualifiedName(replaceLeftmostEntityName(name.left, newLeftmost), name.right);
}
function expressionToEntityName(expr) {
  if (ts23.isIdentifier(expr)) {
    return ts23.factory.createIdentifier(expr.text);
  }
  if (ts23.isPropertyAccessExpression(expr) && ts23.isIdentifier(expr.name)) {
    const left = expressionToEntityName(expr.expression);
    return left === null ? null : ts23.factory.createQualifiedName(left, expr.name);
  }
  return null;
}

// packages/compiler-cli/src/ngtsc/translator/src/typescript_ast_factory.js
import ts24 from "typescript";
var PureAnnotation;
(function(PureAnnotation2) {
  PureAnnotation2["CLOSURE"] = "* @pureOrBreakMyCode ";
  PureAnnotation2["TERSER"] = "@__PURE__";
})(PureAnnotation || (PureAnnotation = {}));
var TypeScriptAstFactory = class {
  annotateForClosureCompiler;
  externalSourceFiles = /* @__PURE__ */ new Map();
  UNARY_OPERATORS = (() => ({
    "+": ts24.SyntaxKind.PlusToken,
    "-": ts24.SyntaxKind.MinusToken,
    "!": ts24.SyntaxKind.ExclamationToken
  }))();
  BINARY_OPERATORS = (() => ({
    "&&": ts24.SyntaxKind.AmpersandAmpersandToken,
    ">": ts24.SyntaxKind.GreaterThanToken,
    ">=": ts24.SyntaxKind.GreaterThanEqualsToken,
    "&": ts24.SyntaxKind.AmpersandToken,
    "|": ts24.SyntaxKind.BarToken,
    "/": ts24.SyntaxKind.SlashToken,
    "==": ts24.SyntaxKind.EqualsEqualsToken,
    "===": ts24.SyntaxKind.EqualsEqualsEqualsToken,
    "<": ts24.SyntaxKind.LessThanToken,
    "<=": ts24.SyntaxKind.LessThanEqualsToken,
    "-": ts24.SyntaxKind.MinusToken,
    "%": ts24.SyntaxKind.PercentToken,
    "*": ts24.SyntaxKind.AsteriskToken,
    "**": ts24.SyntaxKind.AsteriskAsteriskToken,
    "!=": ts24.SyntaxKind.ExclamationEqualsToken,
    "!==": ts24.SyntaxKind.ExclamationEqualsEqualsToken,
    "||": ts24.SyntaxKind.BarBarToken,
    "+": ts24.SyntaxKind.PlusToken,
    "??": ts24.SyntaxKind.QuestionQuestionToken,
    "=": ts24.SyntaxKind.EqualsToken,
    "+=": ts24.SyntaxKind.PlusEqualsToken,
    "-=": ts24.SyntaxKind.MinusEqualsToken,
    "*=": ts24.SyntaxKind.AsteriskEqualsToken,
    "/=": ts24.SyntaxKind.SlashEqualsToken,
    "%=": ts24.SyntaxKind.PercentEqualsToken,
    "**=": ts24.SyntaxKind.AsteriskAsteriskEqualsToken,
    "&&=": ts24.SyntaxKind.AmpersandAmpersandEqualsToken,
    "||=": ts24.SyntaxKind.BarBarEqualsToken,
    "??=": ts24.SyntaxKind.QuestionQuestionEqualsToken,
    "&=": ts24.SyntaxKind.AmpersandEqualsToken,
    "|=": ts24.SyntaxKind.BarEqualsToken,
    ">>=": ts24.SyntaxKind.GreaterThanGreaterThanEqualsToken,
    ">>>=": ts24.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken,
    "<<=": ts24.SyntaxKind.LessThanLessThanEqualsToken,
    "^=": ts24.SyntaxKind.CaretEqualsToken,
    "in": ts24.SyntaxKind.InKeyword,
    "instanceof": ts24.SyntaxKind.InstanceOfKeyword
  }))();
  VAR_TYPES = (() => ({
    "const": ts24.NodeFlags.Const,
    "let": ts24.NodeFlags.Let,
    "var": ts24.NodeFlags.None
  }))();
  constructor(annotateForClosureCompiler) {
    this.annotateForClosureCompiler = annotateForClosureCompiler;
  }
  attachComments = attachComments;
  createArrayLiteral = ts24.factory.createArrayLiteralExpression;
  createAssignment(target, operator, value) {
    return ts24.factory.createBinaryExpression(target, this.BINARY_OPERATORS[operator], value);
  }
  createBinaryExpression(leftOperand, operator, rightOperand) {
    return ts24.factory.createBinaryExpression(leftOperand, this.BINARY_OPERATORS[operator], rightOperand);
  }
  createBlock(body) {
    return ts24.factory.createBlock(body);
  }
  createCallChain(callee, args, pure, isOptional) {
    const call = ts24.factory.createCallChain(callee, isOptional ? ts24.factory.createToken(ts24.SyntaxKind.QuestionDotToken) : void 0, void 0, args);
    if (pure) {
      this.markAsPure(call);
    }
    return call;
  }
  createCallExpression(callee, args, pure) {
    const call = ts24.factory.createCallExpression(callee, void 0, args);
    if (pure) {
      this.markAsPure(call);
    }
    return call;
  }
  markAsPure(node) {
    return ts24.addSyntheticLeadingComment(
      node,
      ts24.SyntaxKind.MultiLineCommentTrivia,
      this.annotateForClosureCompiler ? PureAnnotation.CLOSURE : PureAnnotation.TERSER,
      /* trailing newline */
      false
    );
  }
  createConditional(condition, whenTrue, whenFalse) {
    return ts24.factory.createConditionalExpression(condition, void 0, whenTrue, void 0, whenFalse);
  }
  createElementAccess = ts24.factory.createElementAccessExpression;
  createElementAccessChain(expression, element, isOptional) {
    return ts24.factory.createElementAccessChain(expression, isOptional ? ts24.factory.createToken(ts24.SyntaxKind.QuestionDotToken) : void 0, element);
  }
  createExpressionStatement = ts24.factory.createExpressionStatement;
  createDynamicImport(url) {
    return ts24.factory.createCallExpression(
      ts24.factory.createToken(ts24.SyntaxKind.ImportKeyword),
      /* type */
      void 0,
      [typeof url === "string" ? ts24.factory.createStringLiteral(url) : url]
    );
  }
  createFunctionDeclaration(functionName, parameters, body) {
    if (!ts24.isBlock(body)) {
      throw new Error(`Invalid syntax, expected a block, but got ${ts24.SyntaxKind[body.kind]}.`);
    }
    return ts24.factory.createFunctionDeclaration(void 0, void 0, functionName, void 0, parameters.map((param) => this.createParameter(param)), void 0, body);
  }
  createFunctionExpression(functionName, parameters, body) {
    if (!ts24.isBlock(body)) {
      throw new Error(`Invalid syntax, expected a block, but got ${ts24.SyntaxKind[body.kind]}.`);
    }
    return ts24.factory.createFunctionExpression(void 0, void 0, functionName ?? void 0, void 0, parameters.map((param) => this.createParameter(param)), void 0, body);
  }
  createArrowFunctionExpression(parameters, body) {
    if (ts24.isStatement(body) && !ts24.isBlock(body)) {
      throw new Error(`Invalid syntax, expected a block, but got ${ts24.SyntaxKind[body.kind]}.`);
    }
    return ts24.factory.createArrowFunction(void 0, void 0, parameters.map((param) => this.createParameter(param)), void 0, void 0, body);
  }
  createParameter(param) {
    return ts24.factory.createParameterDeclaration(void 0, void 0, param.name, void 0, param.type ?? void 0);
  }
  createIdentifier = ts24.factory.createIdentifier;
  createIfStatement(condition, thenStatement, elseStatement) {
    return ts24.factory.createIfStatement(condition, thenStatement, elseStatement ?? void 0);
  }
  createLiteral(value) {
    if (value === void 0) {
      return ts24.factory.createIdentifier("undefined");
    } else if (value === null) {
      return ts24.factory.createNull();
    } else if (typeof value === "boolean") {
      return value ? ts24.factory.createTrue() : ts24.factory.createFalse();
    } else if (typeof value === "number") {
      return tsNumericExpression(value);
    } else {
      return ts24.factory.createStringLiteral(value);
    }
  }
  createNewExpression(expression, args) {
    return ts24.factory.createNewExpression(expression, void 0, args);
  }
  createObjectLiteral(properties) {
    return ts24.factory.createObjectLiteralExpression(properties.map((prop) => {
      if (prop.kind === "spread") {
        return ts24.factory.createSpreadAssignment(prop.expression);
      }
      return ts24.factory.createPropertyAssignment(prop.quoted ? ts24.factory.createStringLiteral(prop.propertyName) : ts24.factory.createIdentifier(prop.propertyName), prop.value);
    }));
  }
  createParenthesizedExpression = ts24.factory.createParenthesizedExpression;
  createPropertyAccess = ts24.factory.createPropertyAccessExpression;
  createPropertyAccessChain(expression, propertyName, isOptional) {
    return ts24.factory.createPropertyAccessChain(expression, isOptional ? ts24.factory.createToken(ts24.SyntaxKind.QuestionDotToken) : void 0, propertyName);
  }
  createSpreadElement = ts24.factory.createSpreadElement;
  createReturnStatement(expression) {
    return ts24.factory.createReturnStatement(expression ?? void 0);
  }
  createTaggedTemplate(tag, template) {
    return ts24.factory.createTaggedTemplateExpression(tag, void 0, this.createTemplateLiteral(template));
  }
  createTemplateLiteral(template) {
    let templateLiteral;
    const length = template.elements.length;
    const head = template.elements[0];
    if (length === 1) {
      templateLiteral = ts24.factory.createNoSubstitutionTemplateLiteral(head.cooked, head.raw);
    } else {
      const spans = [];
      for (let i = 1; i < length - 1; i++) {
        const { cooked, raw, range } = template.elements[i];
        const middle = createTemplateMiddle(cooked, raw);
        if (range !== null) {
          this.setSourceMapRange(middle, range);
        }
        spans.push(ts24.factory.createTemplateSpan(template.expressions[i - 1], middle));
      }
      const resolvedExpression = template.expressions[length - 2];
      const templatePart = template.elements[length - 1];
      const templateTail = createTemplateTail(templatePart.cooked, templatePart.raw);
      if (templatePart.range !== null) {
        this.setSourceMapRange(templateTail, templatePart.range);
      }
      spans.push(ts24.factory.createTemplateSpan(resolvedExpression, templateTail));
      templateLiteral = ts24.factory.createTemplateExpression(ts24.factory.createTemplateHead(head.cooked, head.raw), spans);
    }
    if (head.range !== null) {
      this.setSourceMapRange(templateLiteral, head.range);
    }
    return templateLiteral;
  }
  createThrowStatement = ts24.factory.createThrowStatement;
  createTypeOfExpression = ts24.factory.createTypeOfExpression;
  createVoidExpression = ts24.factory.createVoidExpression;
  createUnaryExpression(operator, operand) {
    return ts24.factory.createPrefixUnaryExpression(this.UNARY_OPERATORS[operator], operand);
  }
  createVariableDeclaration(variableName, initializer, variableType, type) {
    return ts24.factory.createVariableStatement(void 0, ts24.factory.createVariableDeclarationList([
      ts24.factory.createVariableDeclaration(variableName, void 0, type ?? void 0, initializer ?? void 0)
    ], this.VAR_TYPES[variableType]));
  }
  createRegularExpressionLiteral(body, flags) {
    return ts24.factory.createRegularExpressionLiteral(`/${body}/${flags ?? ""}`);
  }
  setSourceMapRange(node, sourceMapRange) {
    if (sourceMapRange === null) {
      return node;
    }
    const url = sourceMapRange.url;
    if (!this.externalSourceFiles.has(url)) {
      this.externalSourceFiles.set(url, ts24.createSourceMapSource(url, sourceMapRange.content, (pos) => pos));
    }
    const source = this.externalSourceFiles.get(url);
    ts24.setSourceMapRange(node, {
      pos: sourceMapRange.start.offset,
      end: sourceMapRange.end.offset,
      source
    });
    return node;
  }
  createBuiltInType(type) {
    switch (type) {
      case "any":
        return ts24.factory.createKeywordTypeNode(ts24.SyntaxKind.AnyKeyword);
      case "boolean":
        return ts24.factory.createKeywordTypeNode(ts24.SyntaxKind.BooleanKeyword);
      case "number":
        return ts24.factory.createKeywordTypeNode(ts24.SyntaxKind.NumberKeyword);
      case "string":
        return ts24.factory.createKeywordTypeNode(ts24.SyntaxKind.StringKeyword);
      case "function":
        return ts24.factory.createTypeReferenceNode(ts24.factory.createIdentifier("Function"));
      case "never":
        return ts24.factory.createKeywordTypeNode(ts24.SyntaxKind.NeverKeyword);
      case "unknown":
        return ts24.factory.createKeywordTypeNode(ts24.SyntaxKind.UnknownKeyword);
    }
  }
  createExpressionType(expression, typeParams) {
    const typeName = getEntityTypeFromExpression(expression);
    return ts24.factory.createTypeReferenceNode(typeName, typeParams ?? void 0);
  }
  createArrayType(elementType) {
    return ts24.factory.createArrayTypeNode(elementType);
  }
  createMapType(valueType) {
    return ts24.factory.createTypeLiteralNode([
      ts24.factory.createIndexSignature(void 0, [
        ts24.factory.createParameterDeclaration(void 0, void 0, "key", void 0, ts24.factory.createKeywordTypeNode(ts24.SyntaxKind.StringKeyword))
      ], valueType)
    ]);
  }
  transplantType(type) {
    if (typeof type.kind === "number" && typeof type.getSourceFile === "function" && ts24.isTypeNode(type)) {
      return type;
    }
    throw new Error("Attempting to transplant a type node from a non-TypeScript AST: " + type);
  }
};
function createTemplateMiddle(cooked, raw) {
  const node = ts24.factory.createTemplateHead(cooked, raw);
  node.kind = ts24.SyntaxKind.TemplateMiddle;
  return node;
}
function createTemplateTail(cooked, raw) {
  const node = ts24.factory.createTemplateHead(cooked, raw);
  node.kind = ts24.SyntaxKind.TemplateTail;
  return node;
}
function attachComments(statement, leadingComments) {
  for (const comment of leadingComments) {
    const commentKind = comment.multiline ? ts24.SyntaxKind.MultiLineCommentTrivia : ts24.SyntaxKind.SingleLineCommentTrivia;
    if (comment.multiline) {
      ts24.addSyntheticLeadingComment(statement, commentKind, comment.toString(), comment.trailingNewline);
    } else {
      for (const line of comment.toString().split("\n")) {
        ts24.addSyntheticLeadingComment(statement, commentKind, line, comment.trailingNewline);
      }
    }
  }
}
function getEntityTypeFromExpression(expression) {
  if (ts24.isIdentifier(expression)) {
    return expression;
  }
  if (ts24.isPropertyAccessExpression(expression)) {
    const left = getEntityTypeFromExpression(expression.expression);
    if (!ts24.isIdentifier(expression.name)) {
      throw new Error(`Unsupported property access for type reference: ${expression.name.text}`);
    }
    return ts24.factory.createQualifiedName(left, expression.name);
  }
  throw new Error(`Unsupported expression for type reference: ${ts24.SyntaxKind[expression.kind]}`);
}

// packages/compiler-cli/src/ngtsc/translator/src/typescript_translator.js
function translateExpression(contextFile, expression, imports, options = {}) {
  return expression.visitExpression(new ExpressionTranslatorVisitor(new TypeScriptAstFactory(options.annotateForClosureCompiler === true), imports, contextFile, options), new Context(false));
}
function translateStatement(contextFile, statement, imports, options = {}) {
  return statement.visitStatement(new ExpressionTranslatorVisitor(new TypeScriptAstFactory(options.annotateForClosureCompiler === true), imports, contextFile, options), new Context(true));
}

// packages/compiler-cli/src/ngtsc/typecheck/src/comments.js
import { AbsoluteSourceSpan, CommentTriviaType, ExpressionIdentifier } from "@angular/compiler";
import ts25 from "typescript";
var parseSpanComment = /^(\d+),(\d+)$/;
function readSpanComment(node, sourceFile = node.getSourceFile()) {
  return ts25.forEachTrailingCommentRange(sourceFile.text, node.getEnd(), (pos, end, kind) => {
    if (kind !== ts25.SyntaxKind.MultiLineCommentTrivia) {
      return null;
    }
    const commentText = sourceFile.text.substring(pos + 2, end - 2);
    const match = commentText.match(parseSpanComment);
    if (match === null) {
      return null;
    }
    return new AbsoluteSourceSpan(+match[1], +match[2]);
  }) || null;
}
var IGNORE_FOR_DIAGNOSTICS_MARKER = `${CommentTriviaType.DIAGNOSTIC}:ignore`;
function hasIgnoreForDiagnosticsMarker(node, sourceFile) {
  return ts25.forEachTrailingCommentRange(sourceFile.text, node.getEnd(), (pos, end, kind) => {
    if (kind !== ts25.SyntaxKind.MultiLineCommentTrivia) {
      return null;
    }
    const commentText = sourceFile.text.substring(pos + 2, end - 2);
    return commentText === IGNORE_FOR_DIAGNOSTICS_MARKER;
  }) === true;
}
function makeRecursiveVisitor(visitor) {
  function recursiveVisitor(node) {
    const res = visitor(node);
    return res !== null ? res : node.forEachChild(recursiveVisitor);
  }
  return recursiveVisitor;
}
function getSpanFromOptions(opts) {
  let withSpan = null;
  if (opts.withSpan !== void 0) {
    if (opts.withSpan instanceof AbsoluteSourceSpan) {
      withSpan = opts.withSpan;
    } else {
      withSpan = { start: opts.withSpan.start.offset, end: opts.withSpan.end.offset };
    }
  }
  return withSpan;
}
function findFirstMatchingNode(tcb, opts) {
  const withSpan = getSpanFromOptions(opts);
  const withExpressionIdentifier = opts.withExpressionIdentifier;
  const sf = tcb.getSourceFile();
  const visitor = makeRecursiveVisitor((node) => {
    if (!opts.filter(node)) {
      return null;
    }
    if (withSpan !== null) {
      const comment = readSpanComment(node, sf);
      if (comment === null || withSpan.start !== comment.start || withSpan.end !== comment.end) {
        return null;
      }
    }
    if (withExpressionIdentifier !== void 0 && !hasExpressionIdentifier(sf, node, withExpressionIdentifier)) {
      return null;
    }
    return node;
  });
  return tcb.forEachChild(visitor) ?? null;
}
function findAllMatchingNodes(tcb, opts) {
  const withSpan = getSpanFromOptions(opts);
  const withExpressionIdentifier = opts.withExpressionIdentifier;
  const results = [];
  const stack = [tcb];
  const sf = tcb.getSourceFile();
  while (stack.length > 0) {
    const node = stack.pop();
    if (!opts.filter(node)) {
      stack.push(...node.getChildren());
      continue;
    }
    if (withSpan !== null) {
      const comment = readSpanComment(node, sf);
      if (comment === null || withSpan.start !== comment.start || withSpan.end !== comment.end) {
        stack.push(...node.getChildren());
        continue;
      }
    }
    if (withExpressionIdentifier !== void 0 && !hasExpressionIdentifier(sf, node, withExpressionIdentifier)) {
      continue;
    }
    results.push(node);
  }
  return results;
}
function hasExpressionIdentifier(sourceFile, node, identifier) {
  return ts25.forEachTrailingCommentRange(sourceFile.text, node.getEnd(), (pos, end, kind) => {
    if (kind !== ts25.SyntaxKind.MultiLineCommentTrivia) {
      return false;
    }
    const commentText = sourceFile.text.substring(pos + 2, end - 2);
    const prefix = `${CommentTriviaType.EXPRESSION_TYPE_IDENTIFIER}:${identifier}`;
    return commentText === prefix || commentText.startsWith(prefix + ":");
  }) || false;
}
function readDirectiveIdFromComment(sourceFile, node) {
  let id = null;
  ts25.forEachTrailingCommentRange(sourceFile.text, node.getEnd(), (pos, end, kind) => {
    if (kind !== ts25.SyntaxKind.MultiLineCommentTrivia) {
      return;
    }
    const commentText = sourceFile.text.substring(pos + 2, end - 2);
    const prefix = `${CommentTriviaType.EXPRESSION_TYPE_IDENTIFIER}:${ExpressionIdentifier.DIRECTIVE}:`;
    const hostPrefix = `${CommentTriviaType.EXPRESSION_TYPE_IDENTIFIER}:${ExpressionIdentifier.HOST_DIRECTIVE}:`;
    let matchedPrefix = null;
    if (commentText.startsWith(prefix)) {
      matchedPrefix = prefix;
    } else if (commentText.startsWith(hostPrefix)) {
      matchedPrefix = hostPrefix;
    }
    if (matchedPrefix !== null) {
      const idStr = commentText.substring(matchedPrefix.length);
      const parsed = parseInt(idStr, 10);
      if (!isNaN(parsed)) {
        id = parsed;
      }
    }
  });
  return id;
}

// packages/compiler-cli/src/ngtsc/typecheck/api/checker.js
var OptimizeFor;
(function(OptimizeFor2) {
  OptimizeFor2[OptimizeFor2["SingleFile"] = 0] = "SingleFile";
  OptimizeFor2[OptimizeFor2["WholeProgram"] = 1] = "WholeProgram";
})(OptimizeFor || (OptimizeFor = {}));

// packages/compiler-cli/src/ngtsc/typecheck/api/completion.js
var CompletionKind;
(function(CompletionKind2) {
  CompletionKind2[CompletionKind2["Reference"] = 0] = "Reference";
  CompletionKind2[CompletionKind2["Variable"] = 1] = "Variable";
  CompletionKind2[CompletionKind2["LetDeclaration"] = 2] = "LetDeclaration";
})(CompletionKind || (CompletionKind = {}));

// packages/compiler-cli/src/ngtsc/typecheck/api/scope.js
var PotentialImportKind;
(function(PotentialImportKind2) {
  PotentialImportKind2[PotentialImportKind2["NgModule"] = 0] = "NgModule";
  PotentialImportKind2[PotentialImportKind2["Standalone"] = 1] = "Standalone";
})(PotentialImportKind || (PotentialImportKind = {}));
var PotentialImportMode;
(function(PotentialImportMode2) {
  PotentialImportMode2[PotentialImportMode2["Normal"] = 0] = "Normal";
  PotentialImportMode2[PotentialImportMode2["ForceDirect"] = 1] = "ForceDirect";
})(PotentialImportMode || (PotentialImportMode = {}));

// packages/compiler-cli/src/ngtsc/typecheck/api/symbols.js
var SymbolKind;
(function(SymbolKind2) {
  SymbolKind2[SymbolKind2["Input"] = 0] = "Input";
  SymbolKind2[SymbolKind2["Output"] = 1] = "Output";
  SymbolKind2[SymbolKind2["Binding"] = 2] = "Binding";
  SymbolKind2[SymbolKind2["Reference"] = 3] = "Reference";
  SymbolKind2[SymbolKind2["Variable"] = 4] = "Variable";
  SymbolKind2[SymbolKind2["Directive"] = 5] = "Directive";
  SymbolKind2[SymbolKind2["Element"] = 6] = "Element";
  SymbolKind2[SymbolKind2["Template"] = 7] = "Template";
  SymbolKind2[SymbolKind2["Expression"] = 8] = "Expression";
  SymbolKind2[SymbolKind2["DomBinding"] = 9] = "DomBinding";
  SymbolKind2[SymbolKind2["Pipe"] = 10] = "Pipe";
  SymbolKind2[SymbolKind2["LetDeclaration"] = 11] = "LetDeclaration";
  SymbolKind2[SymbolKind2["SelectorlessComponent"] = 12] = "SelectorlessComponent";
  SymbolKind2[SymbolKind2["SelectorlessDirective"] = 13] = "SelectorlessDirective";
})(SymbolKind || (SymbolKind = {}));

// packages/compiler-cli/src/ngtsc/typecheck/src/dom.js
import { DomElementSchemaRegistry } from "@angular/compiler";
import ts27 from "typescript";

// packages/compiler-cli/src/ngtsc/typecheck/diagnostics/src/diagnostic.js
import ts26 from "typescript";
function makeTemplateDiagnostic(id, mapping, span, category, code, messageText, relatedMessages, deprecatedDiagInfo) {
  if (mapping.type === "direct") {
    let relatedInformation = [];
    if (relatedMessages !== void 0) {
      for (const relatedMessage of relatedMessages) {
        relatedInformation.push({
          category: ts26.DiagnosticCategory.Message,
          code: 0,
          file: relatedMessage.sourceFile,
          start: relatedMessage.start,
          length: relatedMessage.end - relatedMessage.start,
          messageText: relatedMessage.text
        });
      }
    }
    if (deprecatedDiagInfo !== void 0) {
      relatedInformation.push(...deprecatedDiagInfo.relatedMessages ?? []);
    }
    return {
      source: "ngtsc",
      code,
      category,
      messageText,
      file: mapping.node.getSourceFile(),
      sourceFile: mapping.node.getSourceFile(),
      typeCheckId: id,
      start: span.start.offset,
      length: span.end.offset - span.start.offset,
      relatedInformation,
      reportsDeprecated: deprecatedDiagInfo?.reportsDeprecated
    };
  } else if (mapping.type === "indirect" || mapping.type === "external") {
    const componentSf = mapping.componentClass.getSourceFile();
    const componentName = mapping.componentClass.name.text;
    const fileName = mapping.type === "indirect" ? `${componentSf.fileName} (${componentName} template)` : mapping.templateUrl;
    let relatedInformation = [];
    if (relatedMessages !== void 0) {
      for (const relatedMessage of relatedMessages) {
        relatedInformation.push({
          category: ts26.DiagnosticCategory.Message,
          code: 0,
          file: relatedMessage.sourceFile,
          start: relatedMessage.start,
          length: relatedMessage.end - relatedMessage.start,
          messageText: relatedMessage.text
        });
      }
    }
    let sf;
    try {
      sf = getParsedTemplateSourceFile(fileName, mapping);
    } catch (e) {
      const failureChain = makeDiagnosticChain(`Failed to report an error in '${fileName}' at ${span.start.line + 1}:${span.start.col + 1}`, [makeDiagnosticChain(e?.stack ?? `${e}`)]);
      return {
        source: "ngtsc",
        category,
        code,
        messageText: addDiagnosticChain(messageText, [failureChain]),
        file: componentSf,
        sourceFile: componentSf,
        typeCheckId: id,
        // mapping.node represents either the 'template' or 'templateUrl' expression. getStart()
        // and getEnd() are used because they don't include surrounding whitespace.
        start: mapping.node.getStart(),
        length: mapping.node.getEnd() - mapping.node.getStart(),
        relatedInformation,
        reportsDeprecated: deprecatedDiagInfo?.reportsDeprecated
      };
    }
    let typeForMessage;
    if (category === ts26.DiagnosticCategory.Warning) {
      typeForMessage = "Warning";
    } else if (category === ts26.DiagnosticCategory.Suggestion) {
      typeForMessage = "Suggestion";
    } else if (category === ts26.DiagnosticCategory.Message) {
      typeForMessage = "Message";
    } else {
      typeForMessage = "Error";
    }
    if (deprecatedDiagInfo !== void 0) {
      relatedInformation.push(...deprecatedDiagInfo.relatedMessages ?? []);
    }
    relatedInformation.push({
      category: ts26.DiagnosticCategory.Message,
      code: 0,
      file: componentSf,
      // mapping.node represents either the 'template' or 'templateUrl' expression. getStart()
      // and getEnd() are used because they don't include surrounding whitespace.
      start: mapping.node.getStart(),
      length: mapping.node.getEnd() - mapping.node.getStart(),
      messageText: `${typeForMessage} occurs in the template of component ${componentName}.`
    });
    return {
      source: "ngtsc",
      category,
      code,
      messageText,
      file: sf,
      sourceFile: componentSf,
      typeCheckId: id,
      start: span.start.offset,
      length: span.end.offset - span.start.offset,
      // Show a secondary message indicating the component whose template contains the error.
      relatedInformation,
      reportsDeprecated: deprecatedDiagInfo?.reportsDeprecated
    };
  } else {
    throw new Error(`Unexpected source mapping type: ${mapping.type}`);
  }
}
var TemplateSourceFile = Symbol("TemplateSourceFile");
function getParsedTemplateSourceFile(fileName, mapping) {
  if (mapping[TemplateSourceFile] === void 0) {
    mapping[TemplateSourceFile] = parseTemplateAsSourceFile(fileName, mapping.template);
  }
  return mapping[TemplateSourceFile];
}
var parseTemplateAsSourceFileForTest = null;
function parseTemplateAsSourceFile(fileName, template) {
  if (parseTemplateAsSourceFileForTest !== null) {
    return parseTemplateAsSourceFileForTest(fileName, template);
  }
  return ts26.createSourceFile(
    fileName,
    template,
    ts26.ScriptTarget.Latest,
    /* setParentNodes */
    false,
    ts26.ScriptKind.JSX
  );
}

// packages/compiler-cli/src/ngtsc/typecheck/diagnostics/src/id.js
var TYPE_CHECK_ID_MAP = Symbol("TypeCheckId");
function getTypeCheckId(clazz) {
  const sf = clazz.getSourceFile();
  if (sf[TYPE_CHECK_ID_MAP] === void 0) {
    sf[TYPE_CHECK_ID_MAP] = /* @__PURE__ */ new Map();
  }
  if (sf[TYPE_CHECK_ID_MAP].get(clazz) === void 0) {
    sf[TYPE_CHECK_ID_MAP].set(clazz, `tcb${sf[TYPE_CHECK_ID_MAP].size + 1}`);
  }
  return sf[TYPE_CHECK_ID_MAP].get(clazz);
}

// packages/compiler-cli/src/ngtsc/typecheck/src/dom.js
var REGISTRY = new DomElementSchemaRegistry();
var REMOVE_XHTML_REGEX = /^:xhtml:/;
var RegistryDomSchemaChecker = class {
  resolver;
  _diagnostics = [];
  get diagnostics() {
    return this._diagnostics;
  }
  constructor(resolver) {
    this.resolver = resolver;
  }
  checkElement(id, tagName, sourceSpanForDiagnostics, schemas, hostIsStandalone) {
    const name = tagName.replace(REMOVE_XHTML_REGEX, "");
    if (!REGISTRY.hasElement(name, schemas)) {
      const mapping = this.resolver.getTemplateSourceMapping(id);
      const schemas2 = `'${hostIsStandalone ? "@Component" : "@NgModule"}.schemas'`;
      let errorMsg = `'${name}' is not a known element:
`;
      errorMsg += `1. If '${name}' is an Angular component, then verify that it is ${hostIsStandalone ? "included in the '@Component.imports' of this component" : "part of this module"}.
`;
      if (name.indexOf("-") > -1) {
        errorMsg += `2. If '${name}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the ${schemas2} of this component to suppress this message.`;
      } else {
        errorMsg += `2. To allow any element add 'NO_ERRORS_SCHEMA' to the ${schemas2} of this component.`;
      }
      const diag = makeTemplateDiagnostic(id, mapping, sourceSpanForDiagnostics, ts27.DiagnosticCategory.Error, ngErrorCode(ErrorCode.SCHEMA_INVALID_ELEMENT), errorMsg);
      this._diagnostics.push(diag);
    }
  }
  checkTemplateElementProperty(id, tagName, name, span, schemas, hostIsStandalone) {
    const report = REGISTRY.validateProperty(name);
    if (report.error) {
      const mapping = this.resolver.getTemplateSourceMapping(id);
      const diag = makeTemplateDiagnostic(id, mapping, span, ts27.DiagnosticCategory.Error, ngErrorCode(ErrorCode.SCHEMA_INVALID_ATTRIBUTE), report.msg);
      this._diagnostics.push(diag);
      return;
    }
    if (!REGISTRY.hasProperty(tagName, name, schemas)) {
      const mapping = this.resolver.getTemplateSourceMapping(id);
      const decorator = hostIsStandalone ? "@Component" : "@NgModule";
      const schemas2 = `'${decorator}.schemas'`;
      let errorMsg = `Can't bind to '${name}' since it isn't a known property of '${tagName}'.`;
      if (tagName.startsWith("ng-")) {
        errorMsg += `
1. If '${name}' is an Angular directive, then add 'CommonModule' to the '${decorator}.imports' of this component.
2. To allow any property add 'NO_ERRORS_SCHEMA' to the ${schemas2} of this component.`;
      } else if (tagName.indexOf("-") > -1) {
        errorMsg += `
1. If '${tagName}' is an Angular component and it has '${name}' input, then verify that it is ${hostIsStandalone ? "included in the '@Component.imports' of this component" : "part of this module"}.
2. If '${tagName}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the ${schemas2} of this component to suppress this message.
3. To allow any property add 'NO_ERRORS_SCHEMA' to the ${schemas2} of this component.`;
      }
      const diag = makeTemplateDiagnostic(id, mapping, span, ts27.DiagnosticCategory.Error, ngErrorCode(ErrorCode.SCHEMA_INVALID_ATTRIBUTE), errorMsg);
      this._diagnostics.push(diag);
    }
  }
  checkHostElementProperty(id, element, name, span, schemas) {
    const report = REGISTRY.validateProperty(name);
    if (report.error) {
      const mapping = this.resolver.getHostBindingsMapping(id);
      const diag = makeTemplateDiagnostic(id, mapping, span, ts27.DiagnosticCategory.Error, ngErrorCode(ErrorCode.SCHEMA_INVALID_ATTRIBUTE), report.msg);
      this._diagnostics.push(diag);
      return;
    }
    for (const tagName of element.tagNames) {
      if (REGISTRY.hasProperty(tagName, name, schemas)) {
        continue;
      }
      const errorMessage = `Can't bind to '${name}' since it isn't a known property of '${tagName}'.`;
      const mapping = this.resolver.getHostBindingsMapping(id);
      const diag = makeTemplateDiagnostic(id, mapping, span, ts27.DiagnosticCategory.Error, ngErrorCode(ErrorCode.SCHEMA_INVALID_ATTRIBUTE), errorMessage);
      this._diagnostics.push(diag);
      break;
    }
  }
};

// packages/compiler-cli/src/ngtsc/typecheck/src/environment.js
import { TcbExpr as TcbExpr3 } from "@angular/compiler";

// packages/compiler-cli/src/ngtsc/typecheck/src/reference_emit_environment.js
import { TcbExpr } from "@angular/compiler";
import ts28 from "typescript";
var ReferenceEmitEnvironment = class {
  importManager;
  refEmitter;
  contextFile;
  constructor(importManager, refEmitter, contextFile) {
    this.importManager = importManager;
    this.refEmitter = refEmitter;
    this.contextFile = contextFile;
  }
  canReferenceType(ref, flags = ImportFlags.NoAliasing | ImportFlags.AllowTypeImports | ImportFlags.AllowRelativeDtsImports) {
    const result = this.refEmitter.emit(ref, this.contextFile, flags);
    return result.kind === ReferenceEmitKind.Success;
  }
  /**
   * Generates a `TcbExpr` from a `TcbReferenceMetadata` object.
   */
  referenceTcbValue(ref) {
    if (ref.unexportedDiagnostic !== null || ref.isLocal || ref.moduleName === null) {
      if (ref.unexportedDiagnostic !== null) {
        throw new FatalDiagnosticError(ErrorCode.IMPORT_GENERATION_FAILURE, this.contextFile, makeDiagnosticChain(`Unable to import symbol ${ref.name}.`, [
          makeDiagnosticChain(ref.unexportedDiagnostic)
        ]));
      }
      return new TcbExpr(ref.name);
    }
    return this.referenceExternalSymbol(ref.moduleName, ref.name);
  }
  referenceExternalSymbol(moduleName, name) {
    const importResult = this.importManager.addImport({
      exportModuleSpecifier: moduleName,
      exportSymbolName: name,
      requestedFile: this.contextFile
    });
    if (ts28.isIdentifier(importResult)) {
      return new TcbExpr(importResult.text);
    } else if (ts28.isIdentifier(importResult.expression)) {
      return new TcbExpr(`${importResult.expression.text}.${importResult.name.text}`);
    }
    throw new Error("Unexpected value returned by import manager");
  }
};

// packages/compiler-cli/src/ngtsc/typecheck/src/type_constructor.js
import { isUnsafeObjectKey, R3Identifiers as R3Identifiers2, TcbExpr as TcbExpr2 } from "@angular/compiler";

// packages/compiler-cli/src/ngtsc/typecheck/src/tcb_util.js
import { R3Identifiers, HOST_BINDING_GUARD_COMMENT_TEXT } from "@angular/compiler";
import ts31 from "typescript";

// packages/compiler-cli/src/ngtsc/typecheck/src/type_parameter_emitter.js
import ts29 from "typescript";
var TypeParameterEmitter = class {
  typeParameters;
  reflector;
  constructor(typeParameters, reflector) {
    this.typeParameters = typeParameters;
    this.reflector = reflector;
  }
  /**
   * Determines whether the type parameters can be emitted. If this returns true, then a call to
   * `emit` is known to succeed. Vice versa, if false is returned then `emit` should not be
   * called, as it would fail.
   */
  canEmit(canEmitReference) {
    if (this.typeParameters === void 0) {
      return true;
    }
    return this.typeParameters.every((typeParam) => {
      return this.canEmitType(typeParam.constraint, canEmitReference) && this.canEmitType(typeParam.default, canEmitReference);
    });
  }
  canEmitType(type, canEmitReference) {
    if (type === void 0) {
      return true;
    }
    return canEmitType(type, (typeReference) => {
      const reference = this.resolveTypeReference(typeReference);
      if (reference === null) {
        return false;
      }
      if (reference instanceof Reference) {
        return canEmitReference(reference);
      }
      return true;
    });
  }
  /**
   * Emits the type parameters using the provided emitter function for `Reference`s.
   */
  emit(emitReference) {
    if (this.typeParameters === void 0) {
      return void 0;
    }
    const emitter = new TypeEmitter((type) => this.translateTypeReference(type, emitReference));
    return this.typeParameters.map((typeParam) => {
      const constraint = typeParam.constraint !== void 0 ? emitter.emitType(typeParam.constraint) : void 0;
      const defaultType = typeParam.default !== void 0 ? emitter.emitType(typeParam.default) : void 0;
      return ts29.factory.updateTypeParameterDeclaration(typeParam, typeParam.modifiers, typeParam.name, constraint, defaultType);
    });
  }
  resolveTypeReference(type) {
    const target = ts29.isIdentifier(type.typeName) ? type.typeName : type.typeName.right;
    const declaration = this.reflector.getDeclarationOfIdentifier(target);
    if (declaration === null || declaration.node === null) {
      return null;
    }
    if (this.isLocalTypeParameter(declaration.node)) {
      return type;
    }
    let owningModule2 = null;
    if (typeof declaration.viaModule === "string") {
      owningModule2 = {
        specifier: declaration.viaModule,
        resolutionContext: type.getSourceFile().fileName
      };
    }
    return new Reference(declaration.node, declaration.viaModule === AmbientImport ? AmbientImport : owningModule2);
  }
  translateTypeReference(type, emitReference) {
    const reference = this.resolveTypeReference(type);
    if (!(reference instanceof Reference)) {
      return reference;
    }
    const typeNode = emitReference(reference);
    if (typeNode === null) {
      return null;
    }
    if (!ts29.isTypeReferenceNode(typeNode)) {
      throw new Error(`Expected TypeReferenceNode for emitted reference, got ${ts29.SyntaxKind[typeNode.kind]}.`);
    }
    return typeNode;
  }
  isLocalTypeParameter(decl) {
    return this.typeParameters.some((param) => param === decl);
  }
};

// packages/compiler-cli/src/ngtsc/typecheck/src/tcb_print.js
import ts30 from "typescript";
var tempPrinter = null;
function tempPrint(node, sourceFile) {
  tempPrinter ??= ts30.createPrinter();
  return tempPrinter.printNode(ts30.EmitHint.Unspecified, node, sourceFile);
}

// packages/compiler-cli/src/ngtsc/typecheck/src/tcb_util.js
var TCB_FILE_IMPORT_GRAPH_PREPARE_IDENTIFIERS = [
  // Imports may be added for signal input checking. We wouldn't want to change the
  // import graph for incremental compilations when suddenly a signal input is used,
  // or removed.
  R3Identifiers.InputSignalBrandWriteType
];
var TcbInliningRequirement;
(function(TcbInliningRequirement2) {
  TcbInliningRequirement2[TcbInliningRequirement2["MustInline"] = 0] = "MustInline";
  TcbInliningRequirement2[TcbInliningRequirement2["ShouldInlineForGenericBounds"] = 1] = "ShouldInlineForGenericBounds";
  TcbInliningRequirement2[TcbInliningRequirement2["None"] = 2] = "None";
})(TcbInliningRequirement || (TcbInliningRequirement = {}));
function requiresInlineTypeCheckBlock(ref, env, usedPipes, reflector) {
  if (!env.canReferenceType(ref)) {
    return TcbInliningRequirement.MustInline;
  } else if (!checkIfGenericTypeBoundsCanBeEmitted(ref.node, reflector, (r) => env.canReferenceType(r))) {
    return TcbInliningRequirement.ShouldInlineForGenericBounds;
  } else if (usedPipes.some((pipeRef) => !env.canReferenceType(pipeRef))) {
    return TcbInliningRequirement.MustInline;
  } else {
    return TcbInliningRequirement.None;
  }
}
function getSourceMapping(shimSf, position, resolver, isDiagnosticRequest) {
  const node = getTokenAtPosition(shimSf, position);
  const sourceLocation = findSourceLocation(node, shimSf, isDiagnosticRequest);
  if (sourceLocation === null) {
    return null;
  }
  if (isInHostBindingTcb(node)) {
    const hostSourceMapping = resolver.getHostBindingsMapping(sourceLocation.id);
    const span2 = resolver.toHostParseSourceSpan(sourceLocation.id, sourceLocation.span);
    if (span2 === null) {
      return null;
    }
    return { sourceLocation, sourceMapping: hostSourceMapping, span: span2 };
  }
  const span = resolver.toTemplateParseSourceSpan(sourceLocation.id, sourceLocation.span);
  if (span === null) {
    return null;
  }
  return {
    sourceLocation,
    sourceMapping: resolver.getTemplateSourceMapping(sourceLocation.id),
    span
  };
}
function isInHostBindingTcb(node) {
  let current = node;
  while (current && !ts31.isFunctionDeclaration(current)) {
    if (isHostBindingsBlockGuard(current)) {
      return true;
    }
    current = current.parent;
  }
  return false;
}
function findTypeCheckBlock(file, id, isDiagnosticRequest) {
  for (const stmt of file.statements) {
    if (ts31.isFunctionDeclaration(stmt) && getTypeCheckId2(stmt, file, isDiagnosticRequest) === id) {
      return stmt;
    }
  }
  return findNodeInFile(file, (node) => ts31.isFunctionDeclaration(node) && getTypeCheckId2(node, file, isDiagnosticRequest) === id);
}
function findSourceLocation(node, sourceFile, isDiagnosticsRequest) {
  while (node !== void 0 && !ts31.isFunctionDeclaration(node)) {
    if (hasIgnoreForDiagnosticsMarker(node, sourceFile) && isDiagnosticsRequest) {
      return null;
    }
    const span = readSpanComment(node, sourceFile);
    if (span !== null) {
      const id = getTypeCheckId2(node, sourceFile, isDiagnosticsRequest);
      if (id === null) {
        return null;
      }
      return { id, span };
    }
    node = node.parent;
  }
  return null;
}
function getTypeCheckId2(node, sourceFile, isDiagnosticRequest) {
  while (!ts31.isFunctionDeclaration(node)) {
    if (hasIgnoreForDiagnosticsMarker(node, sourceFile) && isDiagnosticRequest) {
      return null;
    }
    node = node.parent;
    if (node === void 0) {
      return null;
    }
  }
  const start = node.getFullStart();
  return ts31.forEachLeadingCommentRange(sourceFile.text, start, (pos, end, kind) => {
    if (kind !== ts31.SyntaxKind.MultiLineCommentTrivia) {
      return null;
    }
    const commentText = sourceFile.text.substring(pos + 2, end - 2);
    return commentText;
  }) || null;
}
function ensureTypeCheckFilePreparationImports(env) {
  for (const identifier of TCB_FILE_IMPORT_GRAPH_PREPARE_IDENTIFIERS) {
    env.importManager.addImport({
      exportModuleSpecifier: identifier.moduleName,
      exportSymbolName: identifier.name,
      requestedFile: env.contextFile
    });
  }
}
function checkIfGenericTypeBoundsCanBeEmitted(node, reflector, canReferenceType) {
  const emitter = new TypeParameterEmitter(node.typeParameters, reflector);
  return emitter.canEmit(canReferenceType);
}
function findNodeInFile(file, predicate) {
  const visit = (node) => {
    if (predicate(node)) {
      return node;
    }
    return ts31.forEachChild(node, visit) ?? null;
  };
  return ts31.forEachChild(file, visit) ?? null;
}
function generateTcbTypeParameters(typeParameters, sourceFile) {
  return typeParameters.map((p) => {
    const representation = tempPrint(p, sourceFile);
    return {
      name: p.name.text,
      representation,
      representationWithDefault: p.default ? representation : `${representation} = any`
    };
  });
}
function isHostBindingsBlockGuard(node) {
  if (!ts31.isIfStatement(node)) {
    return false;
  }
  const expr = node.expression;
  if (!ts31.isParenthesizedExpression(expr) || expr.expression.kind !== ts31.SyntaxKind.TrueKeyword) {
    return false;
  }
  const text = expr.getSourceFile().text;
  return ts31.forEachTrailingCommentRange(text, expr.expression.getEnd(), (pos, end, kind) => kind === ts31.SyntaxKind.MultiLineCommentTrivia && text.substring(pos + 2, end - 2) === HOST_BINDING_GUARD_COMMENT_TEXT) || false;
}

// packages/compiler-cli/src/ngtsc/typecheck/src/type_constructor.js
function generateTypeCtorDeclarationFn(env, meta, nodeTypeRef, typeParams) {
  const typeArgs = generateGenericArgs(typeParams);
  const typeRefWithGenerics = `${nodeTypeRef.print()}${typeArgs}`;
  const initParam = constructTypeCtorParameter(env, meta, nodeTypeRef.print(), typeRefWithGenerics);
  const typeParameters = typeParametersWithDefaultTypes(typeParams);
  let source;
  if (meta.body) {
    const fnType = `${typeParameters}(${initParam}) => ${typeRefWithGenerics}`;
    source = `const ${meta.fnName}: ${fnType} = null!`;
  } else {
    source = `declare function ${meta.fnName}${typeParameters}(${initParam}): ${typeRefWithGenerics}`;
  }
  return new TcbExpr2(source);
}
function generateInlineTypeCtor(env, node, meta) {
  const typeRef = node.name.text;
  const sourceFile = node.getSourceFile();
  const tcbTypeParams = node.typeParameters && node.typeParameters.length > 0 ? generateTcbTypeParameters(node.typeParameters, sourceFile) : void 0;
  const typeRefWithGenerics = `${typeRef}${generateGenericArgs(tcbTypeParams)}`;
  const initParam = constructTypeCtorParameter(env, meta, typeRef, typeRefWithGenerics);
  const body = `{ return null!; }`;
  const typeParams = typeParametersWithDefaultTypes(tcbTypeParams);
  return `static ${meta.fnName}${typeParams}(${initParam}): ${typeRefWithGenerics} ${body}`;
}
function constructTypeCtorParameter(env, meta, typeRef, typeRefWithGenerics) {
  let initType = null;
  const plainKeys = [];
  const coercedKeys = [];
  const signalInputKeys = [];
  for (const { classPropertyName, transformType, isSignal } of meta.fields.inputs) {
    if (isSignal) {
      signalInputKeys.push(TcbExpr2.quoteAndEscape(classPropertyName));
    } else if (!meta.coercedInputFields.has(classPropertyName)) {
      plainKeys.push(TcbExpr2.quoteAndEscape(classPropertyName));
    } else {
      const propName = `ngAcceptInputType_${classPropertyName}`;
      const isUnsafe = isUnsafeObjectKey(classPropertyName);
      const access = isUnsafe ? `[${TcbExpr2.quoteAndEscape(propName)}]` : `.${propName}`;
      const coercionType = transformType !== void 0 ? transformType : `typeof ${typeRef}${access}`;
      coercedKeys.push(`${isUnsafe ? TcbExpr2.quoteAndEscape(classPropertyName) : classPropertyName}: ${coercionType}`);
    }
  }
  if (plainKeys.length > 0) {
    initType = `Pick<${typeRefWithGenerics}, ${plainKeys.join(" | ")}>`;
  }
  if (coercedKeys.length > 0) {
    let coercedLiteral = "{\n";
    for (const key of coercedKeys) {
      coercedLiteral += `${key};
`;
    }
    coercedLiteral += "}";
    initType = initType !== null ? `${initType} & ${coercedLiteral}` : coercedLiteral;
  }
  if (signalInputKeys.length > 0) {
    const keyTypeUnion = signalInputKeys.join(" | ");
    const unwrapRef = env.referenceExternalSymbol(R3Identifiers2.UnwrapDirectiveSignalInputs.moduleName, R3Identifiers2.UnwrapDirectiveSignalInputs.name);
    const unwrapExpr = `${unwrapRef.print()}<${typeRefWithGenerics}, ${keyTypeUnion}>`;
    initType = initType !== null ? `${initType} & ${unwrapExpr}` : unwrapExpr;
  }
  if (initType === null) {
    initType = "{}";
  }
  return `init: ${initType}`;
}
function generateGenericArgs(typeParameters) {
  if (typeParameters === void 0 || typeParameters.length === 0) {
    return "";
  }
  return `<${typeParameters.map((param) => param.name).join(", ")}>`;
}
function requiresInlineTypeCtor(node, host, canReferenceType) {
  return !checkIfGenericTypeBoundsCanBeEmitted(node, host, canReferenceType);
}
function typeParametersWithDefaultTypes(params) {
  if (params === void 0 || params.length === 0) {
    return "";
  }
  return `<${params.map((param) => param.representationWithDefault).join(", ")}>`;
}

// packages/compiler-cli/src/ngtsc/typecheck/src/environment.js
var Environment = class extends ReferenceEmitEnvironment {
  config;
  nextIds = {
    pipeInst: 1,
    typeCtor: 1
  };
  typeCtors = /* @__PURE__ */ new Map();
  typeCtorStatements = [];
  pipeInsts = /* @__PURE__ */ new Map();
  pipeInstStatements = [];
  copiedSourceOriginPath;
  constructor(config, importManager, refEmitter, contextFile, copiedSourceOriginPath) {
    super(importManager, refEmitter, contextFile);
    this.config = config;
    this.copiedSourceOriginPath = copiedSourceOriginPath;
  }
  /**
   * Get an expression referring to a type constructor for the given directive.
   *
   * Depending on the shape of the directive itself, this could be either a reference to a declared
   * type constructor, or to an inline type constructor.
   */
  typeCtorFor(dir) {
    if (this.typeCtors.has(dir.ref.key)) {
      return new TcbExpr3(this.typeCtors.get(dir.ref.key));
    }
    if (dir.requiresInlineTypeCtor) {
      const typeCtorExpr = `${this.referenceTcbValue(dir.ref).print()}.ngTypeCtor`;
      this.typeCtors.set(dir.ref.key, typeCtorExpr);
      return new TcbExpr3(typeCtorExpr);
    } else {
      const fnName = `_ctor${this.nextIds.typeCtor++}`;
      const nodeTypeRef = this.referenceTcbValue(dir.ref);
      const meta = {
        fnName,
        body: true,
        fields: {
          inputs: dir.inputs
          // TODO: support queries
        },
        coercedInputFields: dir.coercedInputFields
      };
      const typeParams = dir.typeParameters || void 0;
      const typeCtor = generateTypeCtorDeclarationFn(this, meta, nodeTypeRef, typeParams);
      this.typeCtorStatements.push(typeCtor);
      this.typeCtors.set(dir.ref.key, fnName);
      return new TcbExpr3(fnName);
    }
  }
  /*
   * Get an expression referring to an instance of the given pipe.
   */
  pipeInst(pipe) {
    if (this.pipeInsts.has(pipe.ref.key)) {
      return new TcbExpr3(this.pipeInsts.get(pipe.ref.key));
    }
    const pipeType = this.referenceTcbValue(pipe.ref);
    const pipeInstId = `_pipe${this.nextIds.pipeInst++}`;
    this.pipeInsts.set(pipe.ref.key, pipeInstId);
    this.pipeInstStatements.push(new TcbExpr3(`var ${pipeInstId} = null! as ${pipeType.print()}`));
    return new TcbExpr3(pipeInstId);
  }
  getPreludeStatements() {
    return [...this.pipeInstStatements, ...this.typeCtorStatements];
  }
};

// packages/compiler-cli/src/ngtsc/typecheck/src/template_symbol_builder.js
import { AST, ASTWithName, ASTWithSource, Binary, BindingPipe, MatchSource as MatchSource3, PropertyRead, R3Identifiers as R3Identifiers3, SafePropertyRead, TmplAstBoundAttribute, TmplAstBoundEvent, TmplAstComponent, TmplAstDirective, TmplAstElement, TmplAstLetDeclaration, TmplAstReference, TmplAstTemplate, TmplAstTextAttribute, TmplAstVariable } from "@angular/compiler";
import ts33 from "typescript";

// packages/compiler-cli/src/ngtsc/typecheck/src/ts_util.js
import ts32 from "typescript";
function isAccessExpression(node) {
  return ts32.isPropertyAccessExpression(node) || ts32.isElementAccessExpression(node);
}
function isDirectiveDeclaration(node) {
  const sourceFile = node.getSourceFile();
  return (ts32.isTypeNode(node) || ts32.isIdentifier(node)) && ts32.isVariableDeclaration(node.parent) && (hasExpressionIdentifier(sourceFile, node, ExpressionIdentifier.DIRECTIVE) || hasExpressionIdentifier(sourceFile, node, ExpressionIdentifier.HOST_DIRECTIVE));
}
function isSymbolAliasOf(firstSymbol, lastSymbol, typeChecker) {
  let currentSymbol = lastSymbol;
  const seenSymbol = /* @__PURE__ */ new Set();
  while (firstSymbol !== currentSymbol && currentSymbol !== void 0 && currentSymbol.flags & ts32.SymbolFlags.Alias) {
    if (seenSymbol.has(currentSymbol)) {
      break;
    }
    seenSymbol.add(currentSymbol);
    currentSymbol = typeChecker.getImmediateAliasedSymbol(currentSymbol);
    if (currentSymbol === firstSymbol) {
      return true;
    }
  }
  return false;
}

// packages/compiler-cli/src/ngtsc/typecheck/src/template_symbol_builder.js
var SymbolBuilder = class {
  tcbPath;
  tcbIsShim;
  typeCheckBlock;
  boundTarget;
  typeCheckingConfig;
  symbolCache = /* @__PURE__ */ new Map();
  constructor(tcbPath, tcbIsShim, typeCheckBlock, boundTarget, typeCheckingConfig) {
    this.tcbPath = tcbPath;
    this.tcbIsShim = tcbIsShim;
    this.typeCheckBlock = typeCheckBlock;
    this.boundTarget = boundTarget;
    this.typeCheckingConfig = typeCheckingConfig;
  }
  getSymbol(node) {
    if (this.symbolCache.has(node)) {
      return this.symbolCache.get(node);
    }
    let symbol = null;
    if (node instanceof TmplAstBoundAttribute || node instanceof TmplAstTextAttribute) {
      symbol = this.getSymbolOfInputBinding(node);
    } else if (node instanceof TmplAstBoundEvent) {
      symbol = this.getSymbolOfBoundEvent(node);
    } else if (node instanceof TmplAstElement) {
      symbol = this.getSymbolOfElement(node);
    } else if (node instanceof TmplAstComponent) {
      symbol = this.getSymbolOfSelectorlessComponent(node);
    } else if (node instanceof TmplAstDirective) {
      symbol = this.getSymbolOfSelectorlessDirective(node);
    } else if (node instanceof TmplAstTemplate) {
      symbol = this.getSymbolOfAstTemplate(node);
    } else if (node instanceof TmplAstVariable) {
      symbol = this.getSymbolOfVariable(node);
    } else if (node instanceof TmplAstLetDeclaration) {
      symbol = this.getSymbolOfLetDeclaration(node);
    } else if (node instanceof TmplAstReference) {
      symbol = this.getSymbolOfReference(node);
    } else if (node instanceof BindingPipe) {
      symbol = this.getSymbolOfPipe(node);
    } else if (node instanceof AST) {
      symbol = this.getSymbolOfTemplateExpression(node);
    } else {
    }
    this.symbolCache.set(node, symbol);
    return symbol;
  }
  getSymbolOfAstTemplate(template) {
    const directives = this.getDirectivesOfNode(template);
    return { kind: SymbolKind.Template, directives, templateNode: template };
  }
  getSymbolOfElement(element) {
    const elementSourceSpan = element.startSourceSpan ?? element.sourceSpan;
    const node = findFirstMatchingNode(this.typeCheckBlock, {
      withSpan: elementSourceSpan,
      filter: ts33.isVariableDeclaration
    });
    if (node === null) {
      return null;
    }
    const tcbLocation = this.getTcbLocationForNode(node);
    const directives = this.getDirectivesOfNode(element);
    return {
      kind: SymbolKind.Element,
      tcbLocation,
      directives,
      templateNode: element
    };
  }
  getSymbolOfSelectorlessComponent(node) {
    const directives = this.getDirectivesOfNode(node);
    const primaryDirective = directives.find((dir) => dir.matchSource === MatchSource3.Selector && dir.isComponent) ?? null;
    if (primaryDirective === null) {
      return null;
    }
    return {
      tcbLocation: primaryDirective.tcbLocation,
      kind: SymbolKind.SelectorlessComponent,
      directives,
      templateNode: node
    };
  }
  getSymbolOfSelectorlessDirective(node) {
    const directives = this.getDirectivesOfNode(node);
    const primaryDirective = directives.find((dir) => dir.matchSource === MatchSource3.Selector && !dir.isComponent) ?? null;
    if (primaryDirective === null) {
      return null;
    }
    return {
      tcbLocation: primaryDirective.tcbLocation,
      kind: SymbolKind.SelectorlessDirective,
      directives,
      templateNode: node
    };
  }
  getDirectivesOfNode(templateNode) {
    const elementSourceSpan = templateNode.startSourceSpan ?? templateNode.sourceSpan;
    const boundDirectives = this.boundTarget.getDirectivesOfNode(templateNode) ?? [];
    let symbols = this.getDirectiveSymbolsForDirectives(boundDirectives, elementSourceSpan);
    if (!(templateNode instanceof TmplAstDirective)) {
      const firstChild = templateNode.children.find((c) => c instanceof TmplAstElement);
      if (firstChild !== void 0) {
        const isMicrosyntaxTemplate = templateNode instanceof TmplAstTemplate && sourceSpanEqual(firstChild.sourceSpan, templateNode.sourceSpan);
        if (isMicrosyntaxTemplate) {
          const firstChildDirectives = this.boundTarget.getDirectivesOfNode(firstChild);
          if (firstChildDirectives !== null) {
            const childSymbols = this.getDirectiveSymbolsForDirectives(firstChildDirectives, elementSourceSpan);
            for (const symbol of childSymbols) {
              if (!symbols.some((s) => s.ref.name === symbol.ref.name && s.ref.filePath === symbol.ref.filePath)) {
                symbols.push(symbol);
              }
            }
          }
        }
      }
    }
    return symbols;
  }
  getDirectiveSymbolsForDirectives(boundDirectives, span) {
    const nodes = findAllMatchingNodes(this.typeCheckBlock, {
      withSpan: span,
      filter: isDirectiveDeclaration
    });
    const hostDirectiveMap = /* @__PURE__ */ new Map();
    for (const d of boundDirectives) {
      if (d.hostDirectives) {
        for (const hd of d.hostDirectives) {
          if (isHostDirectiveMetaForGlobalMode(hd)) {
            const key = `${hd.directive.node.getSourceFile().fileName}#${hd.directive.node.name.text}`;
            hostDirectiveMap.set(key, hd);
          }
        }
      }
    }
    const symbols = [];
    const seenDirectives = /* @__PURE__ */ new Set();
    const sf = this.typeCheckBlock.getSourceFile();
    for (const node of nodes) {
      const id = readDirectiveIdFromComment(sf, node);
      if (id === null)
        continue;
      const meta = boundDirectives[id];
      if (!meta)
        continue;
      const ref = meta.getSymbolReference();
      const refKey = `${ref.filePath}#${ref.name}`;
      if (!seenDirectives.has(refKey)) {
        const ref2 = meta.getSymbolReference();
        const key = `${ref2.filePath}#${ref2.name}`;
        const hostMeta = hostDirectiveMap.get(key) || null;
        const directiveSymbol = hostMeta ? {
          tcbLocation: this.getTcbLocationForNode(node),
          ref: ref2,
          selector: meta.selector,
          isComponent: meta.isComponent,
          ngModule: meta.getNgModule(),
          kind: SymbolKind.Directive,
          isStructural: meta.isStructural,
          isInScope: true,
          tsCompletionEntryInfos: null,
          matchSource: MatchSource3.HostDirective,
          exposedInputs: hostMeta.inputs,
          exposedOutputs: hostMeta.outputs
        } : {
          tcbLocation: this.getTcbLocationForNode(node),
          ref: ref2,
          selector: meta.selector,
          isComponent: meta.isComponent,
          ngModule: meta.getNgModule(),
          kind: SymbolKind.Directive,
          isStructural: meta.isStructural,
          isInScope: true,
          tsCompletionEntryInfos: null,
          matchSource: MatchSource3.Selector
        };
        symbols.push(directiveSymbol);
        seenDirectives.add(refKey);
      }
    }
    return symbols;
  }
  getSymbolOfBoundEvent(eventBinding) {
    const consumer = this.boundTarget.getConsumerOfBinding(eventBinding);
    if (consumer === null) {
      return null;
    }
    let expectedAccess;
    if (consumer instanceof TmplAstTemplate || consumer instanceof TmplAstElement) {
      expectedAccess = "addEventListener";
    } else {
      const bindingPropertyNames = consumer.outputs.getByBindingPropertyName(eventBinding.name);
      if (bindingPropertyNames === null || bindingPropertyNames.length === 0) {
        return null;
      }
      expectedAccess = bindingPropertyNames[0].classPropertyName;
    }
    function filter(n) {
      if (!isAccessExpression(n)) {
        return false;
      }
      if (ts33.isPropertyAccessExpression(n)) {
        return n.name.getText() === expectedAccess;
      } else {
        return ts33.isStringLiteral(n.argumentExpression) && n.argumentExpression.text === expectedAccess;
      }
    }
    const outputFieldAccesses = findAllMatchingNodes(this.typeCheckBlock, {
      withSpan: eventBinding.keySpan,
      filter
    });
    const bindings = [];
    for (const outputFieldAccess of outputFieldAccesses) {
      if (consumer instanceof TmplAstTemplate || consumer instanceof TmplAstElement) {
        if (!ts33.isPropertyAccessExpression(outputFieldAccess)) {
          continue;
        }
        const addEventListener = outputFieldAccess.name;
        const target = this.getSymbol(consumer);
        if (target === null) {
          continue;
        }
        bindings.push({
          kind: SymbolKind.Binding,
          target,
          tcbLocation: this.getTcbLocationForNode(addEventListener),
          tcbTypeLocation: this.getTcbSpanForNode(addEventListener)
        });
      } else {
        if (!ts33.isElementAccessExpression(outputFieldAccess)) {
          continue;
        }
        const target = this.getDirectiveSymbolForAccessExpression(outputFieldAccess, consumer);
        if (target === null) {
          continue;
        }
        bindings.push({
          kind: SymbolKind.Binding,
          target,
          tcbLocation: this.getTcbLocationForNode(outputFieldAccess),
          tcbTypeLocation: this.getTcbSpanForNode(outputFieldAccess)
        });
      }
    }
    if (bindings.length === 0) {
      return null;
    }
    return { kind: SymbolKind.Output, bindings };
  }
  getSymbolOfInputBinding(binding) {
    const consumer = this.boundTarget.getConsumerOfBinding(binding);
    if (consumer === null) {
      return null;
    }
    if (consumer instanceof TmplAstElement || consumer instanceof TmplAstTemplate) {
      const host = this.getSymbol(consumer);
      return host !== null ? { kind: SymbolKind.DomBinding, host } : null;
    }
    if (!consumer.inputs.hasBindingPropertyName(binding.name)) {
      return null;
    }
    const nodes = findAllMatchingNodes(this.typeCheckBlock, {
      withSpan: binding.sourceSpan,
      filter: isAssignment
    });
    const bindings = [];
    for (const node of nodes) {
      if (!isAccessExpression(node.left)) {
        continue;
      }
      const signalInputAssignment = unwrapSignalInputWriteTAccessor(node.left);
      let fieldAccessExpr;
      let tcbLocation;
      if (signalInputAssignment !== null) {
        if (ts33.isIdentifier(signalInputAssignment.fieldExpr)) {
          continue;
        }
        fieldAccessExpr = signalInputAssignment.fieldExpr;
        tcbLocation = this.getTcbLocationForNode(fieldAccessExpr);
      } else {
        fieldAccessExpr = node.left;
        tcbLocation = this.getTcbLocationForNode(fieldAccessExpr);
      }
      const target = this.getDirectiveSymbolForAccessExpression(fieldAccessExpr, consumer);
      if (target === null) {
        continue;
      }
      if (!consumer.inputs.hasBindingPropertyName(binding.name)) {
        continue;
      }
      bindings.push({
        tcbLocation,
        tcbTypeLocation: this.getTcbSpanForNode(fieldAccessExpr),
        kind: SymbolKind.Binding,
        target
      });
    }
    if (bindings.length === 0) {
      return null;
    }
    return { kind: SymbolKind.Input, bindings };
  }
  getDirectiveSymbolForAccessExpression(fieldAccessExpr, meta) {
    return {
      ref: meta.getSymbolReference(),
      kind: SymbolKind.Directive,
      tcbLocation: this.getTcbLocationForNode(fieldAccessExpr.expression),
      isComponent: meta.isComponent,
      isStructural: meta.isStructural,
      selector: meta.selector,
      ngModule: meta.getNgModule(),
      matchSource: MatchSource3.Selector,
      isInScope: true,
      // TODO: this should always be in scope in this context, right?
      tsCompletionEntryInfos: null
    };
  }
  getSymbolOfVariable(variable) {
    const node = findFirstMatchingNode(this.typeCheckBlock, {
      withSpan: variable.sourceSpan,
      filter: ts33.isVariableDeclaration
    });
    if (node === null) {
      return null;
    }
    let initializerNode = null;
    if (ts33.isForOfStatement(node.parent.parent)) {
      initializerNode = node;
    } else if (node.initializer !== void 0) {
      initializerNode = node.initializer;
    }
    if (initializerNode === null) {
      return null;
    }
    return {
      kind: SymbolKind.Variable,
      declaration: variable,
      localVarLocation: this.getTcbLocationForNode(node.name),
      initializerLocation: this.getTcbLocationForNode(initializerNode)
    };
  }
  getSymbolOfReference(ref) {
    const target = this.boundTarget.getReferenceTarget(ref);
    if (target === null) {
      return null;
    }
    if (target instanceof TmplAstElement && !this.typeCheckingConfig.checkTypeOfDomReferences) {
      return null;
    }
    if (!(target instanceof TmplAstElement) && !this.typeCheckingConfig.checkTypeOfNonDomReferences) {
      return null;
    }
    let node = findFirstMatchingNode(this.typeCheckBlock, {
      withSpan: ref.sourceSpan,
      filter: ts33.isVariableDeclaration
    });
    if (node === null || node.initializer === void 0) {
      return null;
    }
    let targetNode = node.initializer;
    if (ts33.isCallExpression(targetNode)) {
      return null;
    }
    if (ts33.isParenthesizedExpression(targetNode) && ts33.isAsExpression(targetNode.expression)) {
      targetNode = node.name;
    }
    const targetLocation = {
      tcbPath: this.tcbPath,
      isShimFile: this.tcbIsShim,
      positionInFile: this.getTcbPositionForNode(targetNode)
    };
    const referenceVarTcbLocation = {
      tcbPath: this.tcbPath,
      isShimFile: this.tcbIsShim,
      positionInFile: this.getTcbPositionForNode(node)
    };
    if (target instanceof TmplAstTemplate || target instanceof TmplAstElement) {
      return {
        kind: SymbolKind.Reference,
        target,
        declaration: ref,
        targetLocation,
        referenceVarLocation: referenceVarTcbLocation
      };
    } else {
      const targetNode2 = target.directive.getSymbolReference();
      return {
        kind: SymbolKind.Reference,
        declaration: ref,
        target: targetNode2,
        targetLocation,
        referenceVarLocation: referenceVarTcbLocation
      };
    }
  }
  getSymbolOfLetDeclaration(decl) {
    const node = findFirstMatchingNode(this.typeCheckBlock, {
      withSpan: decl.sourceSpan,
      filter: ts33.isVariableDeclaration
    });
    if (node === null || node.initializer === void 0) {
      return null;
    }
    return {
      kind: SymbolKind.LetDeclaration,
      declaration: decl,
      localVarLocation: this.getTcbLocationForNode(node.name),
      initializerLocation: this.getTcbLocationForNode(node.initializer)
    };
  }
  getSymbolOfPipe(expression) {
    const methodAccessId = findFirstMatchingNode(this.typeCheckBlock, {
      withSpan: expression.nameSpan,
      filter: ts33.isIdentifier
    });
    if (methodAccessId === null || !ts33.isPropertyAccessExpression(methodAccessId.parent)) {
      return null;
    }
    const methodAccess = methodAccessId.parent;
    const pipeVariableNode = methodAccess.expression;
    return {
      tcbLocation: this.getTcbLocationForNode(methodAccess),
      kind: SymbolKind.Pipe,
      classSymbol: {
        tcbLocation: this.getTcbLocationForNode(pipeVariableNode),
        isPipeClassSymbol: true
      }
    };
  }
  getSymbolOfTemplateExpression(expression) {
    if (expression instanceof ASTWithSource) {
      expression = expression.ast;
    }
    const expressionTarget = this.boundTarget.getExpressionTarget(expression);
    if (expressionTarget !== null) {
      return this.getSymbol(expressionTarget);
    }
    let withSpan = expression.sourceSpan;
    if (expression instanceof Binary && Binary.isAssignmentOperation(expression.operation) && expression.left instanceof PropertyRead) {
      withSpan = expression.left.nameSpan;
    } else if (expression instanceof ASTWithName && !(expression instanceof SafePropertyRead) && expression.constructor.name !== "MethodCall") {
      withSpan = expression.nameSpan;
    }
    let node = null;
    if (expression instanceof PropertyRead || expression instanceof SafePropertyRead) {
      node = findFirstMatchingNode(this.typeCheckBlock, {
        withSpan,
        filter: ts33.isPropertyAccessExpression
      });
    }
    if (node === null) {
      node = findFirstMatchingNode(this.typeCheckBlock, { withSpan, filter: anyNodeFilter });
    }
    if (node === null && expression instanceof SafePropertyRead) {
      const nameNode = findFirstMatchingNode(this.typeCheckBlock, {
        withSpan: expression.nameSpan,
        filter: anyNodeFilter
      });
      if (nameNode !== null) {
        node = nameNode;
        while (node.parent !== void 0 && (ts33.isParenthesizedExpression(node.parent) || ts33.isNonNullExpression(node.parent) || isAccessExpression(node.parent))) {
          node = node.parent;
        }
      }
    }
    if (node === null) {
      return null;
    }
    while (ts33.isParenthesizedExpression(node)) {
      node = node.expression;
    }
    if (expression instanceof SafePropertyRead && ts33.isConditionalExpression(node)) {
      return {
        tcbLocation: this.getTcbLocationForNode(node.whenTrue),
        tcbTypeLocation: this.getTcbSpanForNode(node),
        kind: SymbolKind.Expression
      };
    } else {
      return {
        tcbLocation: this.getTcbLocationForNode(node),
        tcbTypeLocation: this.getTcbSpanForNode(node),
        kind: SymbolKind.Expression
      };
    }
  }
  getTcbSpanForNode(node) {
    while (ts33.isParenthesizedExpression(node)) {
      node = node.expression;
    }
    return {
      tcbPath: this.tcbPath,
      isShimFile: this.tcbIsShim,
      positionInFile: node.getStart(),
      endInFile: node.getEnd()
    };
  }
  getTcbLocationForNode(node) {
    while (ts33.isParenthesizedExpression(node)) {
      node = node.expression;
    }
    return {
      tcbPath: this.tcbPath,
      isShimFile: this.tcbIsShim,
      positionInFile: this.getTcbPositionForNode(node)
    };
  }
  getTcbPositionForNode(node) {
    if (ts33.isTypeReferenceNode(node)) {
      return this.getTcbPositionForNode(node.typeName);
    } else if (ts33.isQualifiedName(node)) {
      return node.right.getStart();
    } else if (ts33.isPropertyAccessExpression(node)) {
      return node.name.getStart();
    } else if (ts33.isElementAccessExpression(node)) {
      return node.argumentExpression.getStart();
    } else if (ts33.isCallExpression(node)) {
      return this.getTcbPositionForNode(node.expression);
    } else if (ts33.isAsExpression(node)) {
      return this.getTcbPositionForNode(node.expression);
    } else if (ts33.isNonNullExpression(node)) {
      return this.getTcbPositionForNode(node.expression);
    } else {
      return node.getStart();
    }
  }
};
function anyNodeFilter(n) {
  return true;
}
function sourceSpanEqual(a, b) {
  return a.start.offset === b.start.offset && a.end.offset === b.end.offset;
}
function unwrapSignalInputWriteTAccessor(expr) {
  if (!ts33.isElementAccessExpression(expr) || !ts33.isPropertyAccessExpression(expr.argumentExpression)) {
    return null;
  }
  if (!ts33.isIdentifier(expr.argumentExpression.name) || expr.argumentExpression.name.text !== R3Identifiers3.InputSignalBrandWriteType.name) {
    return null;
  }
  if (!ts33.isPropertyAccessExpression(expr.expression) && !ts33.isElementAccessExpression(expr.expression) && !ts33.isIdentifier(expr.expression)) {
    throw new Error("Unexpected expression for signal input write type.");
  }
  return {
    fieldExpr: expr.expression,
    typeExpr: expr
  };
}

export {
  ErrorCode,
  COMPILER_ERRORS_WITH_GUIDES,
  replaceTsWithNgInErrors,
  ngErrorCode,
  FatalDiagnosticError,
  makeDiagnostic,
  makeDiagnosticChain,
  makeRelatedInformation,
  isFatalDiagnosticError,
  isLocalCompilationDiagnostics,
  DOC_PAGE_BASE_URL,
  ERROR_DETAILS_PAGE_BASE_URL,
  ExtendedTemplateDiagnosticName,
  isSymbolWithValueDeclaration,
  isDtsPath,
  isNonDeclarationTsPath,
  isFromDtsFile,
  nodeNameForError,
  getSourceFile,
  getSourceFileOrNull,
  getTokenAtPosition,
  identifierOfNode,
  getRootDirs,
  toUnredirectedSourceFile,
  ImportFlags,
  ReferenceEmitKind,
  assertSuccessfulReferenceEmit,
  ReferenceEmitter,
  LocalIdentifierStrategy,
  AbsoluteModuleStrategy,
  LogicalProjectStrategy,
  RelativePathStrategy,
  UnifiedModulesStrategy,
  UnifiedModulesAliasingHost,
  PrivateExportAliasingHost,
  AliasStrategy,
  relativePathBetween,
  normalizeSeparators,
  getProjectRelativePath,
  NoopImportRewriter,
  R3SymbolsImportRewriter,
  loadIsReferencedAliasDeclarationPatch,
  isAliasImportDeclaration,
  attachDefaultImportDeclaration,
  getDefaultImportDeclaration,
  DefaultImportTracker,
  ClassMemberKind,
  ClassMemberAccessLevel,
  AmbientImport,
  typeNodeToValueExpr,
  entityNameToValue,
  isNamedClassDeclaration,
  classMemberAccessLevelToString,
  TypeScriptReflectionHost,
  filterToMembersWithDecorator,
  reflectClassMember,
  reflectObjectLiteral,
  DeferredSymbolTracker,
  ImportedSymbolsTracker,
  LocalCompilationExtraImportsTracker,
  Reference,
  ModuleResolver,
  MetaKind,
  DynamicValue,
  EnumValue,
  describeResolvedType,
  traceDynamicValue,
  SyntheticValue,
  StaticInterpreter,
  PartialEvaluator,
  extractDirectiveTypeCheckMeta,
  CompoundMetadataReader,
  hasInjectableFields,
  isHostDirectiveMetaForGlobalMode,
  createForeignComponentMatcher,
  DtsMetadataReader,
  flattenInheritedDirectiveMetadata,
  LocalMetadataRegistry,
  CompoundMetadataRegistry,
  isExternalResource,
  ResourceRegistry,
  ExportedProviderStatusResolver,
  HostDirectivesResolver,
  presetImportManagerForceNamespaceImports,
  ImportManager,
  translateType,
  translateExpression,
  translateStatement,
  ExpressionIdentifier,
  findFirstMatchingNode,
  findAllMatchingNodes,
  hasExpressionIdentifier,
  isDirectiveDeclaration,
  isSymbolAliasOf,
  OptimizeFor,
  CompletionKind,
  PotentialImportKind,
  PotentialImportMode,
  SymbolKind,
  makeTemplateDiagnostic,
  getTypeCheckId,
  TypeParameterEmitter,
  tempPrint,
  TcbInliningRequirement,
  requiresInlineTypeCheckBlock,
  getSourceMapping,
  findTypeCheckBlock,
  ensureTypeCheckFilePreparationImports,
  generateTcbTypeParameters,
  generateInlineTypeCtor,
  requiresInlineTypeCtor,
  RegistryDomSchemaChecker,
  ReferenceEmitEnvironment,
  Environment,
  SymbolBuilder
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
//# sourceMappingURL=chunk-SOEVA7UL.js.map
