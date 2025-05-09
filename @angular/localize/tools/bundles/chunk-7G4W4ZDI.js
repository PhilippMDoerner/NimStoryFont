
      import {createRequire as __cjsCompatRequire} from 'module';
      const require = __cjsCompatRequire(import.meta.url);
    

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/diagnostics.mjs
var Diagnostics = class {
  messages = [];
  get hasErrors() {
    return this.messages.some((m) => m.type === "error");
  }
  add(type, message) {
    if (type !== "ignore") {
      this.messages.push({ type, message });
    }
  }
  warn(message) {
    this.messages.push({ type: "warning", message });
  }
  error(message) {
    this.messages.push({ type: "error", message });
  }
  merge(other) {
    this.messages.push(...other.messages);
  }
  formatDiagnostics(message) {
    const errors = this.messages.filter((d) => d.type === "error").map((d) => " - " + d.message);
    const warnings = this.messages.filter((d) => d.type === "warning").map((d) => " - " + d.message);
    if (errors.length) {
      message += "\nERRORS:\n" + errors.join("\n");
    }
    if (warnings.length) {
      message += "\nWARNINGS:\n" + warnings.join("\n");
    }
    return message;
  }
};

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/source_file_utils.mjs
import { getFileSystem } from "@angular/compiler-cli/private/localize";
import { \u0275isMissingTranslationError, \u0275makeTemplateObject, \u0275translate } from "@angular/localize";
import { types as t } from "@babel/core";
function isLocalize(expression, localizeName) {
  return isNamedIdentifier(expression, localizeName) && isGlobalIdentifier(expression);
}
function isNamedIdentifier(expression, name) {
  return expression.isIdentifier() && expression.node.name === name;
}
function isGlobalIdentifier(identifier) {
  return !identifier.scope || !identifier.scope.hasBinding(identifier.node.name);
}
function buildLocalizeReplacement(messageParts, substitutions) {
  let mappedString = t.stringLiteral(messageParts[0]);
  for (let i = 1; i < messageParts.length; i++) {
    mappedString = t.binaryExpression("+", mappedString, wrapInParensIfNecessary(substitutions[i - 1]));
    mappedString = t.binaryExpression("+", mappedString, t.stringLiteral(messageParts[i]));
  }
  return mappedString;
}
function unwrapMessagePartsFromLocalizeCall(call, fs = getFileSystem()) {
  let cooked = call.get("arguments")[0];
  if (cooked === void 0) {
    throw new BabelParseError(call.node, "`$localize` called without any arguments.");
  }
  if (!cooked.isExpression()) {
    throw new BabelParseError(cooked.node, "Unexpected argument to `$localize` (expected an array).");
  }
  let raw = cooked;
  if (cooked.isLogicalExpression() && cooked.node.operator === "||" && cooked.get("left").isIdentifier()) {
    const right = cooked.get("right");
    if (right.isAssignmentExpression()) {
      cooked = right.get("right");
      if (!cooked.isExpression()) {
        throw new BabelParseError(cooked.node, 'Unexpected "makeTemplateObject()" function (expected an expression).');
      }
    } else if (right.isSequenceExpression()) {
      const expressions = right.get("expressions");
      if (expressions.length > 2) {
        const [first, second] = expressions;
        if (first.isAssignmentExpression()) {
          cooked = first.get("right");
          if (!cooked.isExpression()) {
            throw new BabelParseError(first.node, "Unexpected cooked value, expected an expression.");
          }
          if (second.isAssignmentExpression()) {
            raw = second.get("right");
            if (!raw.isExpression()) {
              throw new BabelParseError(second.node, "Unexpected raw value, expected an expression.");
            }
          } else {
            raw = cooked;
          }
        }
      }
    }
  }
  if (cooked.isCallExpression()) {
    let call2 = cooked;
    if (call2.get("arguments").length === 0) {
      call2 = unwrapLazyLoadHelperCall(call2);
    }
    cooked = call2.get("arguments")[0];
    if (!cooked.isExpression()) {
      throw new BabelParseError(cooked.node, 'Unexpected `cooked` argument to the "makeTemplateObject()" function (expected an expression).');
    }
    const arg2 = call2.get("arguments")[1];
    if (arg2 && !arg2.isExpression()) {
      throw new BabelParseError(arg2.node, 'Unexpected `raw` argument to the "makeTemplateObject()" function (expected an expression).');
    }
    raw = arg2 !== void 0 ? arg2 : cooked;
  }
  const [cookedStrings] = unwrapStringLiteralArray(cooked, fs);
  const [rawStrings, rawLocations] = unwrapStringLiteralArray(raw, fs);
  return [\u0275makeTemplateObject(cookedStrings, rawStrings), rawLocations];
}
function unwrapSubstitutionsFromLocalizeCall(call, fs = getFileSystem()) {
  const expressions = call.get("arguments").splice(1);
  if (!isArrayOfExpressions(expressions)) {
    const badExpression = expressions.find((expression) => !expression.isExpression());
    throw new BabelParseError(badExpression.node, "Invalid substitutions for `$localize` (expected all substitution arguments to be expressions).");
  }
  return [
    expressions.map((path) => path.node),
    expressions.map((expression) => getLocation(fs, expression))
  ];
}
function unwrapMessagePartsFromTemplateLiteral(elements, fs = getFileSystem()) {
  const cooked = elements.map((q) => {
    if (q.node.value.cooked === void 0) {
      throw new BabelParseError(q.node, `Unexpected undefined message part in "${elements.map((q2) => q2.node.value.cooked)}"`);
    }
    return q.node.value.cooked;
  });
  const raw = elements.map((q) => q.node.value.raw);
  const locations = elements.map((q) => getLocation(fs, q));
  return [\u0275makeTemplateObject(cooked, raw), locations];
}
function unwrapExpressionsFromTemplateLiteral(quasi, fs = getFileSystem()) {
  return [
    quasi.node.expressions,
    quasi.get("expressions").map((e) => getLocation(fs, e))
  ];
}
function wrapInParensIfNecessary(expression) {
  if (t.isBinaryExpression(expression)) {
    return t.parenthesizedExpression(expression);
  } else {
    return expression;
  }
}
function unwrapStringLiteralArray(array, fs = getFileSystem()) {
  if (!isStringLiteralArray(array.node)) {
    throw new BabelParseError(array.node, "Unexpected messageParts for `$localize` (expected an array of strings).");
  }
  const elements = array.get("elements");
  return [elements.map((str) => str.node.value), elements.map((str) => getLocation(fs, str))];
}
function unwrapLazyLoadHelperCall(call) {
  const callee = call.get("callee");
  if (!callee.isIdentifier()) {
    throw new BabelParseError(callee.node, "Unexpected lazy-load helper call (expected a call of the form `_templateObject()`).");
  }
  const lazyLoadBinding = call.scope.getBinding(callee.node.name);
  if (!lazyLoadBinding) {
    throw new BabelParseError(callee.node, "Missing declaration for lazy-load helper function");
  }
  const lazyLoadFn = lazyLoadBinding.path;
  if (!lazyLoadFn.isFunctionDeclaration()) {
    throw new BabelParseError(lazyLoadFn.node, "Unexpected expression (expected a function declaration");
  }
  const returnedNode = getReturnedExpression(lazyLoadFn);
  if (returnedNode.isCallExpression()) {
    return returnedNode;
  }
  if (returnedNode.isIdentifier()) {
    const identifierName = returnedNode.node.name;
    const declaration = returnedNode.scope.getBinding(identifierName);
    if (declaration === void 0) {
      throw new BabelParseError(returnedNode.node, "Missing declaration for return value from helper.");
    }
    if (!declaration.path.isVariableDeclarator()) {
      throw new BabelParseError(declaration.path.node, "Unexpected helper return value declaration (expected a variable declaration).");
    }
    const initializer = declaration.path.get("init");
    if (!initializer.isCallExpression()) {
      throw new BabelParseError(declaration.path.node, "Unexpected return value from helper (expected a call expression).");
    }
    if (lazyLoadBinding.references === 1) {
      lazyLoadFn.remove();
    }
    return initializer;
  }
  return call;
}
function getReturnedExpression(fn) {
  const bodyStatements = fn.get("body").get("body");
  for (const statement of bodyStatements) {
    if (statement.isReturnStatement()) {
      const argument = statement.get("argument");
      if (argument.isSequenceExpression()) {
        const expressions = argument.get("expressions");
        return Array.isArray(expressions) ? expressions[expressions.length - 1] : expressions;
      } else if (argument.isExpression()) {
        return argument;
      } else {
        throw new BabelParseError(statement.node, "Invalid return argument in helper function (expected an expression).");
      }
    }
  }
  throw new BabelParseError(fn.node, "Missing return statement in helper function.");
}
function isStringLiteralArray(node) {
  return t.isArrayExpression(node) && node.elements.every((element) => t.isStringLiteral(element));
}
function isArrayOfExpressions(paths) {
  return paths.every((element) => element.isExpression());
}
function translate(diagnostics, translations, messageParts, substitutions, missingTranslation) {
  try {
    return \u0275translate(translations, messageParts, substitutions);
  } catch (e) {
    if (\u0275isMissingTranslationError(e)) {
      diagnostics.add(missingTranslation, e.message);
      return [
        \u0275makeTemplateObject(e.parsedMessage.messageParts, e.parsedMessage.messageParts),
        substitutions
      ];
    } else {
      diagnostics.error(e.message);
      return [messageParts, substitutions];
    }
  }
}
var BabelParseError = class extends Error {
  node;
  type = "BabelParseError";
  constructor(node, message) {
    super(message);
    this.node = node;
  }
};
function isBabelParseError(e) {
  return e.type === "BabelParseError";
}
function buildCodeFrameError(fs, path, file, e) {
  let filename = file.opts.filename;
  if (filename) {
    filename = fs.resolve(filename);
    let cwd = file.opts.cwd;
    if (cwd) {
      cwd = fs.resolve(cwd);
      filename = fs.relative(cwd, filename);
    }
  } else {
    filename = "(unknown file)";
  }
  const { message } = file.hub.buildError(e.node, e.message);
  return `${filename}: ${message}`;
}
function getLocation(fs, startPath, endPath) {
  const startLocation = startPath.node.loc;
  const file = getFileFromPath(fs, startPath);
  if (!startLocation || !file) {
    return void 0;
  }
  const endLocation = endPath && getFileFromPath(fs, endPath) === file && endPath.node.loc || startLocation;
  return {
    start: getLineAndColumn(startLocation.start),
    end: getLineAndColumn(endLocation.end),
    file,
    text: startPath.getSource() || void 0
  };
}
function serializeLocationPosition(location) {
  const endLineString = location.end !== void 0 && location.end.line !== location.start.line ? `,${location.end.line + 1}` : "";
  return `${location.start.line + 1}${endLineString}`;
}
function getFileFromPath(fs, path) {
  var _a, _b, _c;
  const opts = (_a = (path == null ? void 0 : path.hub).file) == null ? void 0 : _a.opts;
  const filename = opts == null ? void 0 : opts.filename;
  if (!filename || !opts.cwd) {
    return null;
  }
  const relativePath = fs.relative(opts.cwd, filename);
  const root = (_c = (_b = opts.generatorOpts) == null ? void 0 : _b.sourceRoot) != null ? _c : opts.cwd;
  const absPath = fs.resolve(root, relativePath);
  return absPath;
}
function getLineAndColumn(loc) {
  return { line: loc.line - 1, column: loc.column };
}

export {
  Diagnostics,
  isLocalize,
  isNamedIdentifier,
  isGlobalIdentifier,
  buildLocalizeReplacement,
  unwrapMessagePartsFromLocalizeCall,
  unwrapSubstitutionsFromLocalizeCall,
  unwrapMessagePartsFromTemplateLiteral,
  unwrapExpressionsFromTemplateLiteral,
  translate,
  isBabelParseError,
  buildCodeFrameError,
  getLocation,
  serializeLocationPosition
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
//# sourceMappingURL=chunk-7G4W4ZDI.js.map
