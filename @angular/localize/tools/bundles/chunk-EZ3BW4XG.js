
      import {createRequire as __cjsCompatRequire} from 'module';
      const require = __cjsCompatRequire(import.meta.url);
    

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/diagnostics.js
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

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/source_file_utils.js
import { getFileSystem } from "@angular/compiler-cli/private/localize";

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/src/utils/src/constants.js
var BLOCK_MARKER = ":";
var MEANING_SEPARATOR = "|";
var ID_SEPARATOR = "@@";
var LEGACY_ID_INDICATOR = "\u241F";

// bazel-out/darwin_arm64-fastbuild/bin/packages/compiler/src/i18n/digest.js
var textEncoder;
var _SerializerVisitor = class {
  visitText(text, context) {
    return text.value;
  }
  visitContainer(container, context) {
    return `[${container.children.map((child) => child.visit(this)).join(", ")}]`;
  }
  visitIcu(icu, context) {
    const strCases = Object.keys(icu.cases).map((k) => `${k} {${icu.cases[k].visit(this)}}`);
    return `{${icu.expression}, ${icu.type}, ${strCases.join(", ")}}`;
  }
  visitTagPlaceholder(ph, context) {
    return ph.isVoid ? `<ph tag name="${ph.startName}"/>` : `<ph tag name="${ph.startName}">${ph.children.map((child) => child.visit(this)).join(", ")}</ph name="${ph.closeName}">`;
  }
  visitPlaceholder(ph, context) {
    return ph.value ? `<ph name="${ph.name}">${ph.value}</ph>` : `<ph name="${ph.name}"/>`;
  }
  visitIcuPlaceholder(ph, context) {
    return `<ph icu name="${ph.name}">${ph.value.visit(this)}</ph>`;
  }
  visitBlockPlaceholder(ph, context) {
    return `<ph block name="${ph.startName}">${ph.children.map((child) => child.visit(this)).join(", ")}</ph name="${ph.closeName}">`;
  }
};
var serializerVisitor = new _SerializerVisitor();
function fingerprint(str) {
  textEncoder ??= new TextEncoder();
  const utf8 = textEncoder.encode(str);
  const view = new DataView(utf8.buffer, utf8.byteOffset, utf8.byteLength);
  let hi = hash32(view, utf8.length, 0);
  let lo = hash32(view, utf8.length, 102072);
  if (hi == 0 && (lo == 0 || lo == 1)) {
    hi = hi ^ 319790063;
    lo = lo ^ -1801410264;
  }
  return BigInt.asUintN(32, BigInt(hi)) << BigInt(32) | BigInt.asUintN(32, BigInt(lo));
}
function computeMsgId(msg, meaning = "") {
  let msgFingerprint = fingerprint(msg);
  if (meaning) {
    msgFingerprint = BigInt.asUintN(64, msgFingerprint << BigInt(1)) | msgFingerprint >> BigInt(63) & BigInt(1);
    msgFingerprint += fingerprint(meaning);
  }
  return BigInt.asUintN(63, msgFingerprint).toString();
}
function hash32(view, length, c) {
  let a = 2654435769, b = 2654435769;
  let index = 0;
  const end = length - 12;
  for (; index <= end; index += 12) {
    a += view.getUint32(index, true);
    b += view.getUint32(index + 4, true);
    c += view.getUint32(index + 8, true);
    const res = mix(a, b, c);
    a = res[0], b = res[1], c = res[2];
  }
  const remainder = length - index;
  c += length;
  if (remainder >= 4) {
    a += view.getUint32(index, true);
    index += 4;
    if (remainder >= 8) {
      b += view.getUint32(index, true);
      index += 4;
      if (remainder >= 9) {
        c += view.getUint8(index++) << 8;
      }
      if (remainder >= 10) {
        c += view.getUint8(index++) << 16;
      }
      if (remainder === 11) {
        c += view.getUint8(index++) << 24;
      }
    } else {
      if (remainder >= 5) {
        b += view.getUint8(index++);
      }
      if (remainder >= 6) {
        b += view.getUint8(index++) << 8;
      }
      if (remainder === 7) {
        b += view.getUint8(index++) << 16;
      }
    }
  } else {
    if (remainder >= 1) {
      a += view.getUint8(index++);
    }
    if (remainder >= 2) {
      a += view.getUint8(index++) << 8;
    }
    if (remainder === 3) {
      a += view.getUint8(index++) << 16;
    }
  }
  return mix(a, b, c)[2];
}
function mix(a, b, c) {
  a -= b;
  a -= c;
  a ^= c >>> 13;
  b -= c;
  b -= a;
  b ^= a << 8;
  c -= a;
  c -= b;
  c ^= b >>> 13;
  a -= b;
  a -= c;
  a ^= c >>> 12;
  b -= c;
  b -= a;
  b ^= a << 16;
  c -= a;
  c -= b;
  c ^= b >>> 5;
  a -= b;
  a -= c;
  a ^= c >>> 3;
  b -= c;
  b -= a;
  b ^= a << 10;
  c -= a;
  c -= b;
  c ^= b >>> 15;
  return [a, b, c];
}
var Endian;
(function(Endian2) {
  Endian2[Endian2["Little"] = 0] = "Little";
  Endian2[Endian2["Big"] = 1] = "Big";
})(Endian || (Endian = {}));

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/src/utils/src/messages.js
function parseMessage(messageParts, expressions, location, messagePartLocations, expressionLocations = []) {
  const substitutions = {};
  const substitutionLocations = {};
  const associatedMessageIds = {};
  const metadata = parseMetadata(messageParts[0], messageParts.raw[0]);
  const cleanedMessageParts = [metadata.text];
  const placeholderNames = [];
  let messageString = metadata.text;
  for (let i = 1; i < messageParts.length; i++) {
    const { messagePart, placeholderName = computePlaceholderName(i), associatedMessageId } = parsePlaceholder(messageParts[i], messageParts.raw[i]);
    messageString += `{$${placeholderName}}${messagePart}`;
    if (expressions !== void 0) {
      substitutions[placeholderName] = expressions[i - 1];
      substitutionLocations[placeholderName] = expressionLocations[i - 1];
    }
    placeholderNames.push(placeholderName);
    if (associatedMessageId !== void 0) {
      associatedMessageIds[placeholderName] = associatedMessageId;
    }
    cleanedMessageParts.push(messagePart);
  }
  const messageId = metadata.customId || computeMsgId(messageString, metadata.meaning || "");
  const legacyIds = metadata.legacyIds ? metadata.legacyIds.filter((id) => id !== messageId) : [];
  return {
    id: messageId,
    legacyIds,
    substitutions,
    substitutionLocations,
    text: messageString,
    customId: metadata.customId,
    meaning: metadata.meaning || "",
    description: metadata.description || "",
    messageParts: cleanedMessageParts,
    messagePartLocations,
    placeholderNames,
    associatedMessageIds,
    location
  };
}
function parseMetadata(cooked, raw) {
  const { text: messageString, block } = splitBlock(cooked, raw);
  if (block === void 0) {
    return { text: messageString };
  } else {
    const [meaningDescAndId, ...legacyIds] = block.split(LEGACY_ID_INDICATOR);
    const [meaningAndDesc, customId] = meaningDescAndId.split(ID_SEPARATOR, 2);
    let [meaning, description] = meaningAndDesc.split(MEANING_SEPARATOR, 2);
    if (description === void 0) {
      description = meaning;
      meaning = void 0;
    }
    if (description === "") {
      description = void 0;
    }
    return { text: messageString, meaning, description, customId, legacyIds };
  }
}
function parsePlaceholder(cooked, raw) {
  const { text: messagePart, block } = splitBlock(cooked, raw);
  if (block === void 0) {
    return { messagePart };
  } else {
    const [placeholderName, associatedMessageId] = block.split(ID_SEPARATOR);
    return { messagePart, placeholderName, associatedMessageId };
  }
}
function splitBlock(cooked, raw) {
  if (raw.charAt(0) !== BLOCK_MARKER) {
    return { text: cooked };
  } else {
    const endOfBlock = findEndOfBlock(cooked, raw);
    return {
      block: cooked.substring(1, endOfBlock),
      text: cooked.substring(endOfBlock + 1)
    };
  }
}
function computePlaceholderName(index) {
  return index === 1 ? "PH" : `PH_${index - 1}`;
}
function findEndOfBlock(cooked, raw) {
  for (let cookedIndex = 1, rawIndex = 1; cookedIndex < cooked.length; cookedIndex++, rawIndex++) {
    if (raw[rawIndex] === "\\") {
      rawIndex++;
    } else if (cooked[cookedIndex] === BLOCK_MARKER) {
      return cookedIndex;
    }
  }
  throw new Error(`Unterminated $localize metadata block in "${raw}".`);
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/src/utils/src/translations.js
var MissingTranslationError = class extends Error {
  parsedMessage;
  type = "MissingTranslationError";
  constructor(parsedMessage) {
    super(`No translation found for ${describeMessage(parsedMessage)}.`);
    this.parsedMessage = parsedMessage;
  }
};
function isMissingTranslationError(e) {
  return e.type === "MissingTranslationError";
}
function translate(translations, messageParts, substitutions) {
  const message = parseMessage(messageParts, substitutions);
  let translation = translations[message.id];
  if (message.legacyIds !== void 0) {
    for (let i = 0; i < message.legacyIds.length && translation === void 0; i++) {
      translation = translations[message.legacyIds[i]];
    }
  }
  if (translation === void 0) {
    throw new MissingTranslationError(message);
  }
  return [
    translation.messageParts,
    translation.placeholderNames.map((placeholder) => {
      if (message.substitutions.hasOwnProperty(placeholder)) {
        return message.substitutions[placeholder];
      } else {
        throw new Error(`There is a placeholder name mismatch with the translation provided for the message ${describeMessage(message)}.
The translation contains a placeholder with name ${placeholder}, which does not exist in the message.`);
      }
    })
  ];
}
function parseTranslation(messageString) {
  const parts = messageString.split(/{\$([^}]*)}/);
  const messageParts = [parts[0]];
  const placeholderNames = [];
  for (let i = 1; i < parts.length - 1; i += 2) {
    placeholderNames.push(parts[i]);
    messageParts.push(`${parts[i + 1]}`);
  }
  const rawMessageParts = messageParts.map((part) => part.charAt(0) === BLOCK_MARKER ? "\\" + part : part);
  return {
    text: messageString,
    messageParts: makeTemplateObject(messageParts, rawMessageParts),
    placeholderNames
  };
}
function makeParsedTranslation(messageParts, placeholderNames = []) {
  let messageString = messageParts[0];
  for (let i = 0; i < placeholderNames.length; i++) {
    messageString += `{$${placeholderNames[i]}}${messageParts[i + 1]}`;
  }
  return {
    text: messageString,
    messageParts: makeTemplateObject(messageParts, messageParts),
    placeholderNames
  };
}
function makeTemplateObject(cooked, raw) {
  Object.defineProperty(cooked, "raw", { value: raw });
  return cooked;
}
function describeMessage(message) {
  const meaningString = message.meaning && ` - "${message.meaning}"`;
  const legacy = message.legacyIds && message.legacyIds.length > 0 ? ` [${message.legacyIds.map((l) => `"${l}"`).join(", ")}]` : "";
  return `"${message.id}"${legacy} ("${message.text}"${meaningString})`;
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/source_file_utils.js
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
  return [makeTemplateObject(cookedStrings, rawStrings), rawLocations];
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
  return [makeTemplateObject(cooked, raw), locations];
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
function translate2(diagnostics, translations, messageParts, substitutions, missingTranslation) {
  try {
    return translate(translations, messageParts, substitutions);
  } catch (e) {
    if (isMissingTranslationError(e)) {
      diagnostics.add(missingTranslation, e.message);
      return [
        makeTemplateObject(e.parsedMessage.messageParts, e.parsedMessage.messageParts),
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
  const opts = (path?.hub).file?.opts;
  const filename = opts?.filename;
  if (!filename || !opts.cwd) {
    return null;
  }
  const relativePath = fs.relative(opts.cwd, filename);
  const root = opts.generatorOpts?.sourceRoot ?? opts.cwd;
  const absPath = fs.resolve(root, relativePath);
  return absPath;
}
function getLineAndColumn(loc) {
  return { line: loc.line - 1, column: loc.column };
}

export {
  Diagnostics,
  parseMessage,
  parseTranslation,
  makeParsedTranslation,
  isLocalize,
  isNamedIdentifier,
  isGlobalIdentifier,
  buildLocalizeReplacement,
  unwrapMessagePartsFromLocalizeCall,
  unwrapSubstitutionsFromLocalizeCall,
  unwrapMessagePartsFromTemplateLiteral,
  unwrapExpressionsFromTemplateLiteral,
  translate2 as translate,
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
//# sourceMappingURL=chunk-EZ3BW4XG.js.map
