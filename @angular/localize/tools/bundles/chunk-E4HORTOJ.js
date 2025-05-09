
      import {createRequire as __cjsCompatRequire} from 'module';
      const require = __cjsCompatRequire(import.meta.url);
    
import {
  Diagnostics,
  buildCodeFrameError,
  getLocation,
  isBabelParseError,
  isGlobalIdentifier,
  isNamedIdentifier,
  serializeLocationPosition,
  unwrapExpressionsFromTemplateLiteral,
  unwrapMessagePartsFromLocalizeCall,
  unwrapMessagePartsFromTemplateLiteral,
  unwrapSubstitutionsFromLocalizeCall
} from "./chunk-7G4W4ZDI.js";

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/duplicates.mjs
function checkDuplicateMessages(fs, messages, duplicateMessageHandling, basePath) {
  const diagnostics = new Diagnostics();
  if (duplicateMessageHandling === "ignore")
    return diagnostics;
  const messageMap = /* @__PURE__ */ new Map();
  for (const message of messages) {
    if (messageMap.has(message.id)) {
      messageMap.get(message.id).push(message);
    } else {
      messageMap.set(message.id, [message]);
    }
  }
  for (const duplicates of messageMap.values()) {
    if (duplicates.length <= 1)
      continue;
    if (duplicates.every((message) => message.text === duplicates[0].text))
      continue;
    const diagnosticMessage = `Duplicate messages with id "${duplicates[0].id}":
` + duplicates.map((message) => serializeMessage(fs, basePath, message)).join("\n");
    diagnostics.add(duplicateMessageHandling, diagnosticMessage);
  }
  return diagnostics;
}
function serializeMessage(fs, basePath, message) {
  if (message.location === void 0) {
    return `   - "${message.text}"`;
  } else {
    const locationFile = fs.relative(basePath, message.location.file);
    const locationPosition = serializeLocationPosition(message.location);
    return `   - "${message.text}" : ${locationFile}:${locationPosition}`;
  }
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/extraction.mjs
import { SourceFileLoader } from "@angular/compiler-cli/private/localize";
import { transformSync } from "@babel/core";

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/source_files/es2015_extract_plugin.mjs
import { \u0275parseMessage } from "@angular/localize";
function makeEs2015ExtractPlugin(fs, messages, localizeName = "$localize") {
  return {
    visitor: {
      TaggedTemplateExpression(path) {
        const tag = path.get("tag");
        if (isNamedIdentifier(tag, localizeName) && isGlobalIdentifier(tag)) {
          const quasiPath = path.get("quasi");
          const [messageParts, messagePartLocations] = unwrapMessagePartsFromTemplateLiteral(quasiPath.get("quasis"), fs);
          const [expressions, expressionLocations] = unwrapExpressionsFromTemplateLiteral(quasiPath, fs);
          const location = getLocation(fs, quasiPath);
          const message = \u0275parseMessage(messageParts, expressions, location, messagePartLocations, expressionLocations);
          messages.push(message);
        }
      }
    }
  };
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/source_files/es5_extract_plugin.mjs
import { \u0275parseMessage as \u0275parseMessage2 } from "@angular/localize";
function makeEs5ExtractPlugin(fs, messages, localizeName = "$localize") {
  return {
    visitor: {
      CallExpression(callPath, state) {
        try {
          const calleePath = callPath.get("callee");
          if (isNamedIdentifier(calleePath, localizeName) && isGlobalIdentifier(calleePath)) {
            const [messageParts, messagePartLocations] = unwrapMessagePartsFromLocalizeCall(callPath, fs);
            const [expressions, expressionLocations] = unwrapSubstitutionsFromLocalizeCall(callPath, fs);
            const [messagePartsArg, expressionsArg] = callPath.get("arguments");
            const location = getLocation(fs, messagePartsArg, expressionsArg);
            const message = \u0275parseMessage2(messageParts, expressions, location, messagePartLocations, expressionLocations);
            messages.push(message);
          }
        } catch (e) {
          if (isBabelParseError(e)) {
            throw buildCodeFrameError(fs, callPath, state.file, e);
          } else {
            throw e;
          }
        }
      }
    }
  };
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/extraction.mjs
var MessageExtractor = class {
  fs;
  logger;
  basePath;
  useSourceMaps;
  localizeName;
  loader;
  constructor(fs, logger, { basePath, useSourceMaps = true, localizeName = "$localize" }) {
    this.fs = fs;
    this.logger = logger;
    this.basePath = basePath;
    this.useSourceMaps = useSourceMaps;
    this.localizeName = localizeName;
    this.loader = new SourceFileLoader(this.fs, this.logger, { webpack: basePath });
  }
  extractMessages(filename) {
    const messages = [];
    const sourceCode = this.fs.readFile(this.fs.resolve(this.basePath, filename));
    if (sourceCode.includes(this.localizeName)) {
      transformSync(sourceCode, {
        sourceRoot: this.basePath,
        filename,
        plugins: [
          makeEs2015ExtractPlugin(this.fs, messages, this.localizeName),
          makeEs5ExtractPlugin(this.fs, messages, this.localizeName)
        ],
        code: false,
        ast: false
      });
      if (this.useSourceMaps && messages.length > 0) {
        this.updateSourceLocations(filename, sourceCode, messages);
      }
    }
    return messages;
  }
  updateSourceLocations(filename, contents, messages) {
    const sourceFile = this.loader.loadSourceFile(this.fs.resolve(this.basePath, filename), contents);
    if (sourceFile === null) {
      return;
    }
    for (const message of messages) {
      if (message.location !== void 0) {
        message.location = this.getOriginalLocation(sourceFile, message.location);
        if (message.messagePartLocations) {
          message.messagePartLocations = message.messagePartLocations.map((location) => location && this.getOriginalLocation(sourceFile, location));
        }
        if (message.substitutionLocations) {
          const placeholderNames = Object.keys(message.substitutionLocations);
          for (const placeholderName of placeholderNames) {
            const location = message.substitutionLocations[placeholderName];
            message.substitutionLocations[placeholderName] = location && this.getOriginalLocation(sourceFile, location);
          }
        }
      }
    }
  }
  getOriginalLocation(sourceFile, location) {
    const originalStart = sourceFile.getOriginalLocation(location.start.line, location.start.column);
    if (originalStart === null) {
      return location;
    }
    const originalEnd = sourceFile.getOriginalLocation(location.end.line, location.end.column);
    const start = { line: originalStart.line, column: originalStart.column };
    const end = originalEnd !== null && originalEnd.file === originalStart.file ? { line: originalEnd.line, column: originalEnd.column } : start;
    const originalSourceFile = sourceFile.sources.find((sf) => (sf == null ? void 0 : sf.sourcePath) === originalStart.file);
    const startPos = originalSourceFile.startOfLinePositions[start.line] + start.column;
    const endPos = originalSourceFile.startOfLinePositions[end.line] + end.column;
    const text = originalSourceFile.contents.substring(startPos, endPos).trim();
    return { file: originalStart.file, start, end, text };
  }
};

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/translation_files/utils.mjs
function consolidateMessages(messages, getMessageId2) {
  const messageGroups = /* @__PURE__ */ new Map();
  for (const message of messages) {
    const id = getMessageId2(message);
    if (!messageGroups.has(id)) {
      messageGroups.set(id, [message]);
    } else {
      messageGroups.get(id).push(message);
    }
  }
  for (const messages2 of messageGroups.values()) {
    messages2.sort(compareLocations);
  }
  return Array.from(messageGroups.values()).sort((a1, a2) => compareLocations(a1[0], a2[0]));
}
function hasLocation(message) {
  return message.location !== void 0;
}
function compareLocations({ location: location1 }, { location: location2 }) {
  if (location1 === location2) {
    return 0;
  }
  if (location1 === void 0) {
    return -1;
  }
  if (location2 === void 0) {
    return 1;
  }
  if (location1.file !== location2.file) {
    return location1.file < location2.file ? -1 : 1;
  }
  if (location1.start.line !== location2.start.line) {
    return location1.start.line < location2.start.line ? -1 : 1;
  }
  if (location1.start.column !== location2.start.column) {
    return location1.start.column < location2.start.column ? -1 : 1;
  }
  return 0;
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/translation_files/arb_translation_serializer.mjs
var ArbTranslationSerializer = class {
  sourceLocale;
  basePath;
  fs;
  constructor(sourceLocale, basePath, fs) {
    this.sourceLocale = sourceLocale;
    this.basePath = basePath;
    this.fs = fs;
  }
  serialize(messages) {
    const messageGroups = consolidateMessages(messages, (message) => getMessageId(message));
    let output = `{
  "@@locale": ${JSON.stringify(this.sourceLocale)}`;
    for (const duplicateMessages of messageGroups) {
      const message = duplicateMessages[0];
      const id = getMessageId(message);
      output += this.serializeMessage(id, message);
      output += this.serializeMeta(id, message.description, message.meaning, duplicateMessages.filter(hasLocation).map((m) => m.location));
    }
    output += "\n}";
    return output;
  }
  serializeMessage(id, message) {
    return `,
  ${JSON.stringify(id)}: ${JSON.stringify(message.text)}`;
  }
  serializeMeta(id, description, meaning, locations) {
    const meta = [];
    if (description) {
      meta.push(`
    "description": ${JSON.stringify(description)}`);
    }
    if (meaning) {
      meta.push(`
    "x-meaning": ${JSON.stringify(meaning)}`);
    }
    if (locations.length > 0) {
      let locationStr = `
    "x-locations": [`;
      for (let i = 0; i < locations.length; i++) {
        locationStr += (i > 0 ? ",\n" : "\n") + this.serializeLocation(locations[i]);
      }
      locationStr += "\n    ]";
      meta.push(locationStr);
    }
    return meta.length > 0 ? `,
  ${JSON.stringify("@" + id)}: {${meta.join(",")}
  }` : "";
  }
  serializeLocation({ file, start, end }) {
    return [
      `      {`,
      `        "file": ${JSON.stringify(this.fs.relative(this.basePath, file))},`,
      `        "start": { "line": "${start.line}", "column": "${start.column}" },`,
      `        "end": { "line": "${end.line}", "column": "${end.column}" }`,
      `      }`
    ].join("\n");
  }
};
function getMessageId(message) {
  return message.customId || message.id;
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/translation_files/json_translation_serializer.mjs
var SimpleJsonTranslationSerializer = class {
  sourceLocale;
  constructor(sourceLocale) {
    this.sourceLocale = sourceLocale;
  }
  serialize(messages) {
    const fileObj = { locale: this.sourceLocale, translations: {} };
    for (const [message] of consolidateMessages(messages, (message2) => message2.id)) {
      fileObj.translations[message.id] = message.text;
    }
    return JSON.stringify(fileObj, null, 2);
  }
};

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/translation_files/legacy_message_id_migration_serializer.mjs
var LegacyMessageIdMigrationSerializer = class {
  _diagnostics;
  constructor(_diagnostics) {
    this._diagnostics = _diagnostics;
  }
  serialize(messages) {
    let hasMessages = false;
    const mapping = messages.reduce((output, message) => {
      if (shouldMigrate(message)) {
        for (const legacyId of message.legacyIds) {
          if (output.hasOwnProperty(legacyId)) {
            this._diagnostics.warn(`Detected duplicate legacy ID ${legacyId}.`);
          }
          output[legacyId] = message.id;
          hasMessages = true;
        }
      }
      return output;
    }, {});
    if (!hasMessages) {
      this._diagnostics.warn("Could not find any legacy message IDs in source files while generating the legacy message migration file.");
    }
    return JSON.stringify(mapping, null, 2);
  }
};
function shouldMigrate(message) {
  return !message.customId && !!message.legacyIds && message.legacyIds.length > 0;
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/translation_files/format_options.mjs
function validateOptions(name, validOptions, options) {
  const validOptionsMap = new Map(validOptions);
  for (const option in options) {
    if (!validOptionsMap.has(option)) {
      throw new Error(`Invalid format option for ${name}: "${option}".
Allowed options are ${JSON.stringify(Array.from(validOptionsMap.keys()))}.`);
    }
    const validOptionValues = validOptionsMap.get(option);
    const optionValue = options[option];
    if (!validOptionValues.includes(optionValue)) {
      throw new Error(`Invalid format option value for ${name}: "${option}".
Allowed option values are ${JSON.stringify(validOptionValues)} but received "${optionValue}".`);
    }
  }
}
function parseFormatOptions(optionString = "{}") {
  return JSON.parse(optionString);
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/translation_files/xliff1_translation_serializer.mjs
import { getFileSystem } from "@angular/compiler-cli/private/localize";

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/translation_files/icu_parsing.mjs
function extractIcuPlaceholders(text) {
  const state = new StateStack();
  const pieces = new IcuPieces();
  const braces = /[{}]/g;
  let lastPos = 0;
  let match;
  while (match = braces.exec(text)) {
    if (match[0] == "{") {
      state.enterBlock();
    } else {
      state.leaveBlock();
    }
    if (state.getCurrent() === "placeholder") {
      const name = tryParsePlaceholder(text, braces.lastIndex);
      if (name) {
        pieces.addText(text.substring(lastPos, braces.lastIndex - 1));
        pieces.addPlaceholder(name);
        braces.lastIndex += name.length + 1;
        state.leaveBlock();
      } else {
        pieces.addText(text.substring(lastPos, braces.lastIndex));
        state.nestedIcu();
      }
    } else {
      pieces.addText(text.substring(lastPos, braces.lastIndex));
    }
    lastPos = braces.lastIndex;
  }
  pieces.addText(text.substring(lastPos));
  return pieces.toArray();
}
var IcuPieces = class {
  pieces = [""];
  addText(text) {
    this.pieces[this.pieces.length - 1] += text;
  }
  addPlaceholder(name) {
    this.pieces.push(name);
    this.pieces.push("");
  }
  toArray() {
    return this.pieces;
  }
};
var StateStack = class {
  stack = [];
  enterBlock() {
    const current = this.getCurrent();
    switch (current) {
      case "icu":
        this.stack.push("case");
        break;
      case "case":
        this.stack.push("placeholder");
        break;
      case "placeholder":
        this.stack.push("case");
        break;
      default:
        this.stack.push("icu");
        break;
    }
  }
  leaveBlock() {
    return this.stack.pop();
  }
  nestedIcu() {
    const current = this.stack.pop();
    assert(current === "placeholder", "A nested ICU must replace a placeholder but got " + current);
    this.stack.push("icu");
  }
  getCurrent() {
    return this.stack[this.stack.length - 1];
  }
};
function tryParsePlaceholder(text, start) {
  for (let i = start; i < text.length; i++) {
    if (text[i] === ",") {
      break;
    }
    if (text[i] === "}") {
      return text.substring(start, i);
    }
  }
  return null;
}
function assert(test, message) {
  if (!test) {
    throw new Error("Assertion failure: " + message);
  }
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/translation_files/xml_file.mjs
var XmlFile = class {
  output = '<?xml version="1.0" encoding="UTF-8" ?>\n';
  indent = "";
  elements = [];
  preservingWhitespace = false;
  toString() {
    return this.output;
  }
  startTag(name, attributes = {}, { selfClosing = false, preserveWhitespace } = {}) {
    if (!this.preservingWhitespace) {
      this.output += this.indent;
    }
    this.output += `<${name}`;
    for (const [attrName, attrValue] of Object.entries(attributes)) {
      if (attrValue) {
        this.output += ` ${attrName}="${escapeXml(attrValue)}"`;
      }
    }
    if (selfClosing) {
      this.output += "/>";
    } else {
      this.output += ">";
      this.elements.push(name);
      this.incIndent();
    }
    if (preserveWhitespace !== void 0) {
      this.preservingWhitespace = preserveWhitespace;
    }
    if (!this.preservingWhitespace) {
      this.output += `
`;
    }
    return this;
  }
  endTag(name, { preserveWhitespace } = {}) {
    const expectedTag = this.elements.pop();
    if (expectedTag !== name) {
      throw new Error(`Unexpected closing tag: "${name}", expected: "${expectedTag}"`);
    }
    this.decIndent();
    if (!this.preservingWhitespace) {
      this.output += this.indent;
    }
    this.output += `</${name}>`;
    if (preserveWhitespace !== void 0) {
      this.preservingWhitespace = preserveWhitespace;
    }
    if (!this.preservingWhitespace) {
      this.output += `
`;
    }
    return this;
  }
  text(str) {
    this.output += escapeXml(str);
    return this;
  }
  rawText(str) {
    this.output += str;
    return this;
  }
  incIndent() {
    this.indent = this.indent + "  ";
  }
  decIndent() {
    this.indent = this.indent.slice(0, -2);
  }
};
var _ESCAPED_CHARS = [
  [/&/g, "&amp;"],
  [/"/g, "&quot;"],
  [/'/g, "&apos;"],
  [/</g, "&lt;"],
  [/>/g, "&gt;"]
];
function escapeXml(text) {
  return _ESCAPED_CHARS.reduce((text2, entry) => text2.replace(entry[0], entry[1]), text);
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/translation_files/xliff1_translation_serializer.mjs
var LEGACY_XLIFF_MESSAGE_LENGTH = 40;
var Xliff1TranslationSerializer = class {
  sourceLocale;
  basePath;
  useLegacyIds;
  formatOptions;
  fs;
  constructor(sourceLocale, basePath, useLegacyIds, formatOptions = {}, fs = getFileSystem()) {
    this.sourceLocale = sourceLocale;
    this.basePath = basePath;
    this.useLegacyIds = useLegacyIds;
    this.formatOptions = formatOptions;
    this.fs = fs;
    validateOptions("Xliff1TranslationSerializer", [["xml:space", ["preserve"]]], formatOptions);
  }
  serialize(messages) {
    const messageGroups = consolidateMessages(messages, (message) => this.getMessageId(message));
    const xml = new XmlFile();
    xml.startTag("xliff", { "version": "1.2", "xmlns": "urn:oasis:names:tc:xliff:document:1.2" });
    xml.startTag("file", {
      "source-language": this.sourceLocale,
      "datatype": "plaintext",
      "original": "ng2.template",
      ...this.formatOptions
    });
    xml.startTag("body");
    for (const duplicateMessages of messageGroups) {
      const message = duplicateMessages[0];
      const id = this.getMessageId(message);
      xml.startTag("trans-unit", { id, datatype: "html" });
      xml.startTag("source", {}, { preserveWhitespace: true });
      this.serializeMessage(xml, message);
      xml.endTag("source", { preserveWhitespace: false });
      for (const { location } of duplicateMessages.filter(hasLocation)) {
        this.serializeLocation(xml, location);
      }
      if (message.description) {
        this.serializeNote(xml, "description", message.description);
      }
      if (message.meaning) {
        this.serializeNote(xml, "meaning", message.meaning);
      }
      xml.endTag("trans-unit");
    }
    xml.endTag("body");
    xml.endTag("file");
    xml.endTag("xliff");
    return xml.toString();
  }
  serializeMessage(xml, message) {
    var _a;
    const length = message.messageParts.length - 1;
    for (let i = 0; i < length; i++) {
      this.serializeTextPart(xml, message.messageParts[i]);
      const name = message.placeholderNames[i];
      const location = (_a = message.substitutionLocations) == null ? void 0 : _a[name];
      const associatedMessageId = message.associatedMessageIds && message.associatedMessageIds[name];
      this.serializePlaceholder(xml, name, location == null ? void 0 : location.text, associatedMessageId);
    }
    this.serializeTextPart(xml, message.messageParts[length]);
  }
  serializeTextPart(xml, text) {
    const pieces = extractIcuPlaceholders(text);
    const length = pieces.length - 1;
    for (let i = 0; i < length; i += 2) {
      xml.text(pieces[i]);
      this.serializePlaceholder(xml, pieces[i + 1], void 0, void 0);
    }
    xml.text(pieces[length]);
  }
  serializePlaceholder(xml, id, text, associatedId) {
    const attrs = { id };
    const ctype = getCtypeForPlaceholder(id);
    if (ctype !== null) {
      attrs["ctype"] = ctype;
    }
    if (text !== void 0) {
      attrs["equiv-text"] = text;
    }
    if (associatedId !== void 0) {
      attrs["xid"] = associatedId;
    }
    xml.startTag("x", attrs, { selfClosing: true });
  }
  serializeNote(xml, name, value) {
    xml.startTag("note", { priority: "1", from: name }, { preserveWhitespace: true });
    xml.text(value);
    xml.endTag("note", { preserveWhitespace: false });
  }
  serializeLocation(xml, location) {
    xml.startTag("context-group", { purpose: "location" });
    this.renderContext(xml, "sourcefile", this.fs.relative(this.basePath, location.file));
    const endLineString = location.end !== void 0 && location.end.line !== location.start.line ? `,${location.end.line + 1}` : "";
    this.renderContext(xml, "linenumber", `${location.start.line + 1}${endLineString}`);
    xml.endTag("context-group");
  }
  renderContext(xml, type, value) {
    xml.startTag("context", { "context-type": type }, { preserveWhitespace: true });
    xml.text(value);
    xml.endTag("context", { preserveWhitespace: false });
  }
  getMessageId(message) {
    return message.customId || this.useLegacyIds && message.legacyIds !== void 0 && message.legacyIds.find((id) => id.length === LEGACY_XLIFF_MESSAGE_LENGTH) || message.id;
  }
};
function getCtypeForPlaceholder(placeholder) {
  const tag = placeholder.replace(/^(START_|CLOSE_)/, "");
  switch (tag) {
    case "LINE_BREAK":
      return "lb";
    case "TAG_IMG":
      return "image";
    default:
      const element = tag.startsWith("TAG_") ? tag.replace(/^TAG_(.+)/, (_, tagName) => tagName.toLowerCase()) : TAG_MAP[tag];
      if (element === void 0) {
        return null;
      }
      return `x-${element}`;
  }
}
var TAG_MAP = {
  "LINK": "a",
  "BOLD_TEXT": "b",
  "EMPHASISED_TEXT": "em",
  "HEADING_LEVEL1": "h1",
  "HEADING_LEVEL2": "h2",
  "HEADING_LEVEL3": "h3",
  "HEADING_LEVEL4": "h4",
  "HEADING_LEVEL5": "h5",
  "HEADING_LEVEL6": "h6",
  "HORIZONTAL_RULE": "hr",
  "ITALIC_TEXT": "i",
  "LIST_ITEM": "li",
  "MEDIA_LINK": "link",
  "ORDERED_LIST": "ol",
  "PARAGRAPH": "p",
  "QUOTATION": "q",
  "STRIKETHROUGH_TEXT": "s",
  "SMALL_TEXT": "small",
  "SUBSTRIPT": "sub",
  "SUPERSCRIPT": "sup",
  "TABLE_BODY": "tbody",
  "TABLE_CELL": "td",
  "TABLE_FOOTER": "tfoot",
  "TABLE_HEADER_CELL": "th",
  "TABLE_HEADER": "thead",
  "TABLE_ROW": "tr",
  "MONOSPACED_TEXT": "tt",
  "UNDERLINED_TEXT": "u",
  "UNORDERED_LIST": "ul"
};

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/translation_files/xliff2_translation_serializer.mjs
import { getFileSystem as getFileSystem2 } from "@angular/compiler-cli/private/localize";
var MAX_LEGACY_XLIFF_2_MESSAGE_LENGTH = 20;
var Xliff2TranslationSerializer = class {
  sourceLocale;
  basePath;
  useLegacyIds;
  formatOptions;
  fs;
  currentPlaceholderId = 0;
  constructor(sourceLocale, basePath, useLegacyIds, formatOptions = {}, fs = getFileSystem2()) {
    this.sourceLocale = sourceLocale;
    this.basePath = basePath;
    this.useLegacyIds = useLegacyIds;
    this.formatOptions = formatOptions;
    this.fs = fs;
    validateOptions("Xliff1TranslationSerializer", [["xml:space", ["preserve"]]], formatOptions);
  }
  serialize(messages) {
    const messageGroups = consolidateMessages(messages, (message) => this.getMessageId(message));
    const xml = new XmlFile();
    xml.startTag("xliff", {
      "version": "2.0",
      "xmlns": "urn:oasis:names:tc:xliff:document:2.0",
      "srcLang": this.sourceLocale
    });
    xml.startTag("file", { "id": "ngi18n", "original": "ng.template", ...this.formatOptions });
    for (const duplicateMessages of messageGroups) {
      const message = duplicateMessages[0];
      const id = this.getMessageId(message);
      xml.startTag("unit", { id });
      const messagesWithLocations = duplicateMessages.filter(hasLocation);
      if (message.meaning || message.description || messagesWithLocations.length) {
        xml.startTag("notes");
        for (const { location: { file, start, end } } of messagesWithLocations) {
          const endLineString = end !== void 0 && end.line !== start.line ? `,${end.line + 1}` : "";
          this.serializeNote(xml, "location", `${this.fs.relative(this.basePath, file)}:${start.line + 1}${endLineString}`);
        }
        if (message.description) {
          this.serializeNote(xml, "description", message.description);
        }
        if (message.meaning) {
          this.serializeNote(xml, "meaning", message.meaning);
        }
        xml.endTag("notes");
      }
      xml.startTag("segment");
      xml.startTag("source", {}, { preserveWhitespace: true });
      this.serializeMessage(xml, message);
      xml.endTag("source", { preserveWhitespace: false });
      xml.endTag("segment");
      xml.endTag("unit");
    }
    xml.endTag("file");
    xml.endTag("xliff");
    return xml.toString();
  }
  serializeMessage(xml, message) {
    this.currentPlaceholderId = 0;
    const length = message.messageParts.length - 1;
    for (let i = 0; i < length; i++) {
      this.serializeTextPart(xml, message.messageParts[i]);
      const name = message.placeholderNames[i];
      const associatedMessageId = message.associatedMessageIds && message.associatedMessageIds[name];
      this.serializePlaceholder(xml, name, message.substitutionLocations, associatedMessageId);
    }
    this.serializeTextPart(xml, message.messageParts[length]);
  }
  serializeTextPart(xml, text) {
    const pieces = extractIcuPlaceholders(text);
    const length = pieces.length - 1;
    for (let i = 0; i < length; i += 2) {
      xml.text(pieces[i]);
      this.serializePlaceholder(xml, pieces[i + 1], void 0, void 0);
    }
    xml.text(pieces[length]);
  }
  serializePlaceholder(xml, placeholderName, substitutionLocations, associatedMessageId) {
    var _a, _b;
    const text = (_a = substitutionLocations == null ? void 0 : substitutionLocations[placeholderName]) == null ? void 0 : _a.text;
    if (placeholderName.startsWith("START_")) {
      const closingPlaceholderName = placeholderName.replace(/^START/, "CLOSE").replace(/_\d+$/, "");
      const closingText = (_b = substitutionLocations == null ? void 0 : substitutionLocations[closingPlaceholderName]) == null ? void 0 : _b.text;
      const attrs = {
        id: `${this.currentPlaceholderId++}`,
        equivStart: placeholderName,
        equivEnd: closingPlaceholderName
      };
      const type = getTypeForPlaceholder(placeholderName);
      if (type !== null) {
        attrs["type"] = type;
      }
      if (text !== void 0) {
        attrs["dispStart"] = text;
      }
      if (closingText !== void 0) {
        attrs["dispEnd"] = closingText;
      }
      xml.startTag("pc", attrs);
    } else if (placeholderName.startsWith("CLOSE_")) {
      xml.endTag("pc");
    } else {
      const attrs = {
        id: `${this.currentPlaceholderId++}`,
        equiv: placeholderName
      };
      const type = getTypeForPlaceholder(placeholderName);
      if (type !== null) {
        attrs["type"] = type;
      }
      if (text !== void 0) {
        attrs["disp"] = text;
      }
      if (associatedMessageId !== void 0) {
        attrs["subFlows"] = associatedMessageId;
      }
      xml.startTag("ph", attrs, { selfClosing: true });
    }
  }
  serializeNote(xml, name, value) {
    xml.startTag("note", { category: name }, { preserveWhitespace: true });
    xml.text(value);
    xml.endTag("note", { preserveWhitespace: false });
  }
  getMessageId(message) {
    return message.customId || this.useLegacyIds && message.legacyIds !== void 0 && message.legacyIds.find((id) => id.length <= MAX_LEGACY_XLIFF_2_MESSAGE_LENGTH && !/[^0-9]/.test(id)) || message.id;
  }
};
function getTypeForPlaceholder(placeholder) {
  const tag = placeholder.replace(/^(START_|CLOSE_)/, "").replace(/_\d+$/, "");
  switch (tag) {
    case "BOLD_TEXT":
    case "EMPHASISED_TEXT":
    case "ITALIC_TEXT":
    case "LINE_BREAK":
    case "STRIKETHROUGH_TEXT":
    case "UNDERLINED_TEXT":
      return "fmt";
    case "TAG_IMG":
      return "image";
    case "LINK":
      return "link";
    default:
      return /^(START_|CLOSE_)/.test(placeholder) ? "other" : null;
  }
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/translation_files/xmb_translation_serializer.mjs
import { getFileSystem as getFileSystem3 } from "@angular/compiler-cli/private/localize";
var XMB_HANDLER = "angular";
var XmbTranslationSerializer = class {
  basePath;
  useLegacyIds;
  fs;
  constructor(basePath, useLegacyIds, fs = getFileSystem3()) {
    this.basePath = basePath;
    this.useLegacyIds = useLegacyIds;
    this.fs = fs;
  }
  serialize(messages) {
    const messageGroups = consolidateMessages(messages, (message) => this.getMessageId(message));
    const xml = new XmlFile();
    xml.rawText(`<!DOCTYPE messagebundle [
<!ELEMENT messagebundle (msg)*>
<!ATTLIST messagebundle class CDATA #IMPLIED>

<!ELEMENT msg (#PCDATA|ph|source)*>
<!ATTLIST msg id CDATA #IMPLIED>
<!ATTLIST msg seq CDATA #IMPLIED>
<!ATTLIST msg name CDATA #IMPLIED>
<!ATTLIST msg desc CDATA #IMPLIED>
<!ATTLIST msg meaning CDATA #IMPLIED>
<!ATTLIST msg obsolete (obsolete) #IMPLIED>
<!ATTLIST msg xml:space (default|preserve) "default">
<!ATTLIST msg is_hidden CDATA #IMPLIED>

<!ELEMENT source (#PCDATA)>

<!ELEMENT ph (#PCDATA|ex)*>
<!ATTLIST ph name CDATA #REQUIRED>

<!ELEMENT ex (#PCDATA)>
]>
`);
    xml.startTag("messagebundle", {
      "handler": XMB_HANDLER
    });
    for (const duplicateMessages of messageGroups) {
      const message = duplicateMessages[0];
      const id = this.getMessageId(message);
      xml.startTag("msg", { id, desc: message.description, meaning: message.meaning }, { preserveWhitespace: true });
      if (message.location) {
        this.serializeLocation(xml, message.location);
      }
      this.serializeMessage(xml, message);
      xml.endTag("msg", { preserveWhitespace: false });
    }
    xml.endTag("messagebundle");
    return xml.toString();
  }
  serializeLocation(xml, location) {
    xml.startTag("source");
    const endLineString = location.end !== void 0 && location.end.line !== location.start.line ? `,${location.end.line + 1}` : "";
    xml.text(`${this.fs.relative(this.basePath, location.file)}:${location.start.line}${endLineString}`);
    xml.endTag("source");
  }
  serializeMessage(xml, message) {
    const length = message.messageParts.length - 1;
    for (let i = 0; i < length; i++) {
      this.serializeTextPart(xml, message.messageParts[i]);
      xml.startTag("ph", { name: message.placeholderNames[i] }, { selfClosing: true });
    }
    this.serializeTextPart(xml, message.messageParts[length]);
  }
  serializeTextPart(xml, text) {
    const pieces = extractIcuPlaceholders(text);
    const length = pieces.length - 1;
    for (let i = 0; i < length; i += 2) {
      xml.text(pieces[i]);
      xml.startTag("ph", { name: pieces[i + 1] }, { selfClosing: true });
    }
    xml.text(pieces[length]);
  }
  getMessageId(message) {
    return message.customId || this.useLegacyIds && message.legacyIds !== void 0 && message.legacyIds.find((id) => id.length <= 20 && !/[^0-9]/.test(id)) || message.id;
  }
};

export {
  checkDuplicateMessages,
  MessageExtractor,
  ArbTranslationSerializer,
  SimpleJsonTranslationSerializer,
  LegacyMessageIdMigrationSerializer,
  parseFormatOptions,
  Xliff1TranslationSerializer,
  Xliff2TranslationSerializer,
  XmbTranslationSerializer
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
//# sourceMappingURL=chunk-E4HORTOJ.js.map
