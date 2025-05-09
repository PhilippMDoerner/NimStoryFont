
      import {createRequire as __cjsCompatRequire} from 'module';
      const require = __cjsCompatRequire(import.meta.url);
    
import {
  Diagnostics,
  buildCodeFrameError,
  buildLocalizeReplacement,
  isBabelParseError,
  isLocalize,
  translate,
  unwrapMessagePartsFromLocalizeCall,
  unwrapMessagePartsFromTemplateLiteral,
  unwrapSubstitutionsFromLocalizeCall
} from "./chunk-7G4W4ZDI.js";

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/translate/source_files/es2015_translate_plugin.mjs
import { getFileSystem } from "@angular/compiler-cli/private/localize";
function makeEs2015TranslatePlugin(diagnostics, translations, { missingTranslation = "error", localizeName = "$localize" } = {}, fs = getFileSystem()) {
  return {
    visitor: {
      TaggedTemplateExpression(path, state) {
        try {
          const tag = path.get("tag");
          if (isLocalize(tag, localizeName)) {
            const [messageParts] = unwrapMessagePartsFromTemplateLiteral(path.get("quasi").get("quasis"), fs);
            const translated = translate(diagnostics, translations, messageParts, path.node.quasi.expressions, missingTranslation);
            path.replaceWith(buildLocalizeReplacement(translated[0], translated[1]));
          }
        } catch (e) {
          if (isBabelParseError(e)) {
            throw buildCodeFrameError(fs, path, state.file, e);
          } else {
            throw e;
          }
        }
      }
    }
  };
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/translate/source_files/es5_translate_plugin.mjs
import { getFileSystem as getFileSystem2 } from "@angular/compiler-cli/private/localize";
function makeEs5TranslatePlugin(diagnostics, translations, { missingTranslation = "error", localizeName = "$localize" } = {}, fs = getFileSystem2()) {
  return {
    visitor: {
      CallExpression(callPath, state) {
        try {
          const calleePath = callPath.get("callee");
          if (isLocalize(calleePath, localizeName)) {
            const [messageParts] = unwrapMessagePartsFromLocalizeCall(callPath, fs);
            const [expressions] = unwrapSubstitutionsFromLocalizeCall(callPath, fs);
            const translated = translate(diagnostics, translations, messageParts, expressions, missingTranslation);
            callPath.replaceWith(buildLocalizeReplacement(translated[0], translated[1]));
          }
        } catch (e) {
          if (isBabelParseError(e)) {
            diagnostics.error(buildCodeFrameError(fs, callPath, state.file, e));
          } else {
            throw e;
          }
        }
      }
    }
  };
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/translate/source_files/locale_plugin.mjs
import { types as t } from "@babel/core";
function makeLocalePlugin(locale, { localizeName = "$localize" } = {}) {
  return {
    visitor: {
      MemberExpression(expression) {
        const obj = expression.get("object");
        if (!isLocalize(obj, localizeName)) {
          return;
        }
        const property = expression.get("property");
        if (!property.isIdentifier({ name: "locale" })) {
          return;
        }
        if (expression.parentPath.isAssignmentExpression() && expression.parentPath.get("left") === expression) {
          return;
        }
        const parent = expression.parentPath;
        if (parent.isLogicalExpression({ operator: "&&" }) && parent.get("right") === expression) {
          const left = parent.get("left");
          if (isLocalizeGuard(left, localizeName)) {
            parent.replaceWith(expression);
          } else if (left.isLogicalExpression({ operator: "&&" }) && isLocalizeGuard(left.get("right"), localizeName)) {
            left.replaceWith(left.get("left"));
          }
        }
        expression.replaceWith(t.stringLiteral(locale));
      }
    }
  };
}
function isLocalizeGuard(expression, localizeName) {
  if (!expression.isBinaryExpression() || !(expression.node.operator === "!==" || expression.node.operator === "!=")) {
    return false;
  }
  const left = expression.get("left");
  const right = expression.get("right");
  return left.isUnaryExpression({ operator: "typeof" }) && isLocalize(left.get("argument"), localizeName) && right.isStringLiteral({ value: "undefined" }) || right.isUnaryExpression({ operator: "typeof" }) && isLocalize(right.get("argument"), localizeName) && left.isStringLiteral({ value: "undefined" });
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/translate/translation_files/translation_parsers/arb_translation_parser.mjs
import { \u0275parseTranslation } from "@angular/localize";
var ArbTranslationParser = class {
  analyze(_filePath, contents) {
    const diagnostics = new Diagnostics();
    if (!contents.includes('"@@locale"')) {
      return { canParse: false, diagnostics };
    }
    try {
      return { canParse: true, diagnostics, hint: this.tryParseArbFormat(contents) };
    } catch {
      diagnostics.warn("File is not valid JSON.");
      return { canParse: false, diagnostics };
    }
  }
  parse(_filePath, contents, arb = this.tryParseArbFormat(contents)) {
    const bundle = {
      locale: arb["@@locale"],
      translations: {},
      diagnostics: new Diagnostics()
    };
    for (const messageId of Object.keys(arb)) {
      if (messageId.startsWith("@")) {
        continue;
      }
      const targetMessage = arb[messageId];
      bundle.translations[messageId] = \u0275parseTranslation(targetMessage);
    }
    return bundle;
  }
  tryParseArbFormat(contents) {
    const json = JSON.parse(contents);
    if (typeof json["@@locale"] !== "string") {
      throw new Error("Missing @@locale property.");
    }
    return json;
  }
};

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/translate/translation_files/translation_parsers/simple_json_translation_parser.mjs
import { \u0275parseTranslation as \u0275parseTranslation2 } from "@angular/localize";
import { extname } from "path";
var SimpleJsonTranslationParser = class {
  analyze(filePath, contents) {
    const diagnostics = new Diagnostics();
    if (extname(filePath) !== ".json" || !(contents.includes('"locale"') && contents.includes('"translations"'))) {
      diagnostics.warn("File does not have .json extension.");
      return { canParse: false, diagnostics };
    }
    try {
      const json = JSON.parse(contents);
      if (json.locale === void 0) {
        diagnostics.warn('Required "locale" property missing.');
        return { canParse: false, diagnostics };
      }
      if (typeof json.locale !== "string") {
        diagnostics.warn('The "locale" property is not a string.');
        return { canParse: false, diagnostics };
      }
      if (json.translations === void 0) {
        diagnostics.warn('Required "translations" property missing.');
        return { canParse: false, diagnostics };
      }
      if (typeof json.translations !== "object") {
        diagnostics.warn('The "translations" is not an object.');
        return { canParse: false, diagnostics };
      }
      return { canParse: true, diagnostics, hint: json };
    } catch (e) {
      diagnostics.warn("File is not valid JSON.");
      return { canParse: false, diagnostics };
    }
  }
  parse(_filePath, contents, json) {
    const { locale: parsedLocale, translations } = json || JSON.parse(contents);
    const parsedTranslations = {};
    for (const messageId in translations) {
      const targetMessage = translations[messageId];
      parsedTranslations[messageId] = \u0275parseTranslation2(targetMessage);
    }
    return { locale: parsedLocale, translations: parsedTranslations, diagnostics: new Diagnostics() };
  }
};

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/translate/translation_files/translation_parsers/xliff1_translation_parser.mjs
import { ParseErrorLevel as ParseErrorLevel3, visitAll as visitAll2 } from "@angular/compiler";

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/translate/translation_files/base_visitor.mjs
var BaseVisitor = class {
  visitElement(_element, _context) {
  }
  visitAttribute(_attribute, _context) {
  }
  visitText(_text, _context) {
  }
  visitComment(_comment, _context) {
  }
  visitExpansion(_expansion, _context) {
  }
  visitExpansionCase(_expansionCase, _context) {
  }
  visitBlock(_block, _context) {
  }
  visitBlockParameter(_parameter, _context) {
  }
  visitLetDeclaration(_decl, _context) {
  }
};

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/translate/translation_files/message_serialization/message_serializer.mjs
import { Element as Element2, visitAll } from "@angular/compiler";

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/translate/translation_files/translation_parsers/translation_parse_error.mjs
import { ParseErrorLevel } from "@angular/compiler";
var TranslationParseError = class extends Error {
  span;
  msg;
  level;
  constructor(span, msg, level = ParseErrorLevel.ERROR) {
    super(contextualMessage(span, msg, level));
    this.span = span;
    this.msg = msg;
    this.level = level;
  }
};
function contextualMessage(span, msg, level) {
  const ctx = span.start.getContext(100, 2);
  msg += `
At ${span.start}${span.details ? `, ${span.details}` : ""}:
`;
  if (ctx) {
    msg += `...${ctx.before}[${ParseErrorLevel[level]} ->]${ctx.after}...
`;
  }
  return msg;
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/translate/translation_files/translation_parsers/translation_utils.mjs
import { Element, ParseError, ParseErrorLevel as ParseErrorLevel2, XmlParser } from "@angular/compiler";
function getAttrOrThrow(element, attrName) {
  const attrValue = getAttribute(element, attrName);
  if (attrValue === void 0) {
    throw new TranslationParseError(element.sourceSpan, `Missing required "${attrName}" attribute:`);
  }
  return attrValue;
}
function getAttribute(element, attrName) {
  const attr = element.attrs.find((a) => a.name === attrName);
  return attr !== void 0 ? attr.value : void 0;
}
function parseInnerRange(element) {
  const xmlParser = new XmlParser();
  const xml = xmlParser.parse(element.sourceSpan.start.file.content, element.sourceSpan.start.file.url, { tokenizeExpansionForms: true, range: getInnerRange(element) });
  return xml;
}
function getInnerRange(element) {
  const start = element.startSourceSpan.end;
  const end = element.endSourceSpan.start;
  return {
    startPos: start.offset,
    startLine: start.line,
    startCol: start.col,
    endPos: end.offset
  };
}
function canParseXml(filePath, contents, rootNodeName, attributes) {
  const diagnostics = new Diagnostics();
  const xmlParser = new XmlParser();
  const xml = xmlParser.parse(contents, filePath);
  if (xml.rootNodes.length === 0 || xml.errors.some((error) => error.level === ParseErrorLevel2.ERROR)) {
    xml.errors.forEach((e) => addParseError(diagnostics, e));
    return { canParse: false, diagnostics };
  }
  const rootElements = xml.rootNodes.filter(isNamedElement(rootNodeName));
  const rootElement = rootElements[0];
  if (rootElement === void 0) {
    diagnostics.warn(`The XML file does not contain a <${rootNodeName}> root node.`);
    return { canParse: false, diagnostics };
  }
  for (const attrKey of Object.keys(attributes)) {
    const attr = rootElement.attrs.find((attr2) => attr2.name === attrKey);
    if (attr === void 0 || attr.value !== attributes[attrKey]) {
      addParseDiagnostic(diagnostics, rootElement.sourceSpan, `The <${rootNodeName}> node does not have the required attribute: ${attrKey}="${attributes[attrKey]}".`, ParseErrorLevel2.WARNING);
      return { canParse: false, diagnostics };
    }
  }
  if (rootElements.length > 1) {
    xml.errors.push(new ParseError(xml.rootNodes[1].sourceSpan, "Unexpected root node. XLIFF 1.2 files should only have a single <xliff> root node.", ParseErrorLevel2.WARNING));
  }
  return { canParse: true, diagnostics, hint: { element: rootElement, errors: xml.errors } };
}
function isNamedElement(name) {
  function predicate(node) {
    return node instanceof Element && node.name === name;
  }
  return predicate;
}
function addParseDiagnostic(diagnostics, sourceSpan, message, level) {
  addParseError(diagnostics, new ParseError(sourceSpan, message, level));
}
function addParseError(diagnostics, parseError) {
  if (parseError.level === ParseErrorLevel2.ERROR) {
    diagnostics.error(parseError.toString());
  } else {
    diagnostics.warn(parseError.toString());
  }
}
function addErrorsToBundle(bundle, errors) {
  for (const error of errors) {
    addParseError(bundle.diagnostics, error);
  }
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/translate/translation_files/message_serialization/message_serializer.mjs
var MessageSerializer = class extends BaseVisitor {
  renderer;
  config;
  constructor(renderer, config) {
    super();
    this.renderer = renderer;
    this.config = config;
  }
  serialize(nodes) {
    this.renderer.startRender();
    visitAll(this, nodes);
    this.renderer.endRender();
    return this.renderer.message;
  }
  visitElement(element) {
    if (this.config.placeholder && element.name === this.config.placeholder.elementName) {
      const name = getAttrOrThrow(element, this.config.placeholder.nameAttribute);
      const body = this.config.placeholder.bodyAttribute && getAttribute(element, this.config.placeholder.bodyAttribute);
      this.visitPlaceholder(name, body);
    } else if (this.config.placeholderContainer && element.name === this.config.placeholderContainer.elementName) {
      const start = getAttrOrThrow(element, this.config.placeholderContainer.startAttribute);
      const end = getAttrOrThrow(element, this.config.placeholderContainer.endAttribute);
      this.visitPlaceholderContainer(start, element.children, end);
    } else if (this.config.inlineElements.indexOf(element.name) !== -1) {
      visitAll(this, element.children);
    } else {
      throw new TranslationParseError(element.sourceSpan, `Invalid element found in message.`);
    }
  }
  visitText(text) {
    this.renderer.text(text.value);
  }
  visitExpansion(expansion) {
    this.renderer.startIcu();
    this.renderer.text(`${expansion.switchValue}, ${expansion.type},`);
    visitAll(this, expansion.cases);
    this.renderer.endIcu();
  }
  visitExpansionCase(expansionCase) {
    this.renderer.text(` ${expansionCase.value} {`);
    this.renderer.startContainer();
    visitAll(this, expansionCase.expression);
    this.renderer.closeContainer();
    this.renderer.text(`}`);
  }
  visitContainedNodes(nodes) {
    this.renderer.startContainer();
    visitAll(this, nodes);
    this.renderer.closeContainer();
  }
  visitPlaceholder(name, body) {
    this.renderer.placeholder(name, body);
  }
  visitPlaceholderContainer(startName, children, closeName) {
    this.renderer.startPlaceholder(startName);
    this.visitContainedNodes(children);
    this.renderer.closePlaceholder(closeName);
  }
  isPlaceholderContainer(node) {
    return node instanceof Element2 && node.name === this.config.placeholderContainer.elementName;
  }
};

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/translate/translation_files/message_serialization/target_message_renderer.mjs
import { \u0275makeParsedTranslation } from "@angular/localize";
var TargetMessageRenderer = class {
  current = { messageParts: [], placeholderNames: [], text: "" };
  icuDepth = 0;
  get message() {
    const { messageParts, placeholderNames } = this.current;
    return \u0275makeParsedTranslation(messageParts, placeholderNames);
  }
  startRender() {
  }
  endRender() {
    this.storeMessagePart();
  }
  text(text) {
    this.current.text += text;
  }
  placeholder(name, body) {
    this.renderPlaceholder(name);
  }
  startPlaceholder(name) {
    this.renderPlaceholder(name);
  }
  closePlaceholder(name) {
    this.renderPlaceholder(name);
  }
  startContainer() {
  }
  closeContainer() {
  }
  startIcu() {
    this.icuDepth++;
    this.text("{");
  }
  endIcu() {
    this.icuDepth--;
    this.text("}");
  }
  normalizePlaceholderName(name) {
    return name.replace(/-/g, "_");
  }
  renderPlaceholder(name) {
    name = this.normalizePlaceholderName(name);
    if (this.icuDepth > 0) {
      this.text(`{${name}}`);
    } else {
      this.storeMessagePart();
      this.current.placeholderNames.push(name);
    }
  }
  storeMessagePart() {
    this.current.messageParts.push(this.current.text);
    this.current.text = "";
  }
};

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/translate/translation_files/translation_parsers/serialize_translation_message.mjs
function serializeTranslationMessage(element, config) {
  const { rootNodes, errors: parseErrors } = parseInnerRange(element);
  try {
    const serializer = new MessageSerializer(new TargetMessageRenderer(), config);
    const translation = serializer.serialize(rootNodes);
    return { translation, parseErrors, serializeErrors: [] };
  } catch (e) {
    return { translation: null, parseErrors, serializeErrors: [e] };
  }
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/translate/translation_files/translation_parsers/xliff1_translation_parser.mjs
var Xliff1TranslationParser = class {
  analyze(filePath, contents) {
    return canParseXml(filePath, contents, "xliff", { version: "1.2" });
  }
  parse(filePath, contents, hint) {
    return this.extractBundle(hint);
  }
  extractBundle({ element, errors }) {
    const diagnostics = new Diagnostics();
    errors.forEach((e) => addParseError(diagnostics, e));
    if (element.children.length === 0) {
      addParseDiagnostic(diagnostics, element.sourceSpan, "Missing expected <file> element", ParseErrorLevel3.WARNING);
      return { locale: void 0, translations: {}, diagnostics };
    }
    const files = element.children.filter(isNamedElement("file"));
    if (files.length === 0) {
      addParseDiagnostic(diagnostics, element.sourceSpan, "No <file> elements found in <xliff>", ParseErrorLevel3.WARNING);
    } else if (files.length > 1) {
      addParseDiagnostic(diagnostics, files[1].sourceSpan, "More than one <file> element found in <xliff>", ParseErrorLevel3.WARNING);
    }
    const bundle = { locale: void 0, translations: {}, diagnostics };
    const translationVisitor = new XliffTranslationVisitor();
    const localesFound = /* @__PURE__ */ new Set();
    for (const file of files) {
      const locale = getAttribute(file, "target-language");
      if (locale !== void 0) {
        localesFound.add(locale);
        bundle.locale = locale;
      }
      visitAll2(translationVisitor, file.children, bundle);
    }
    if (localesFound.size > 1) {
      addParseDiagnostic(diagnostics, element.sourceSpan, `More than one locale found in translation file: ${JSON.stringify(Array.from(localesFound))}. Using "${bundle.locale}"`, ParseErrorLevel3.WARNING);
    }
    return bundle;
  }
};
var XliffTranslationVisitor = class extends BaseVisitor {
  visitElement(element, bundle) {
    if (element.name === "trans-unit") {
      this.visitTransUnitElement(element, bundle);
    } else {
      visitAll2(this, element.children, bundle);
    }
  }
  visitTransUnitElement(element, bundle) {
    const id = getAttribute(element, "id");
    if (id === void 0) {
      addParseDiagnostic(bundle.diagnostics, element.sourceSpan, `Missing required "id" attribute on <trans-unit> element.`, ParseErrorLevel3.ERROR);
      return;
    }
    if (bundle.translations[id] !== void 0) {
      addParseDiagnostic(bundle.diagnostics, element.sourceSpan, `Duplicated translations for message "${id}"`, ParseErrorLevel3.ERROR);
      return;
    }
    let targetMessage = element.children.find(isNamedElement("target"));
    if (targetMessage === void 0) {
      addParseDiagnostic(bundle.diagnostics, element.sourceSpan, "Missing <target> element", ParseErrorLevel3.WARNING);
      targetMessage = element.children.find(isNamedElement("source"));
      if (targetMessage === void 0) {
        addParseDiagnostic(bundle.diagnostics, element.sourceSpan, "Missing required element: one of <target> or <source> is required", ParseErrorLevel3.ERROR);
        return;
      }
    }
    const { translation, parseErrors, serializeErrors } = serializeTranslationMessage(targetMessage, {
      inlineElements: ["g", "bx", "ex", "bpt", "ept", "ph", "it", "mrk"],
      placeholder: { elementName: "x", nameAttribute: "id" }
    });
    if (translation !== null) {
      bundle.translations[id] = translation;
    }
    addErrorsToBundle(bundle, parseErrors);
    addErrorsToBundle(bundle, serializeErrors);
  }
};

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/translate/translation_files/translation_parsers/xliff2_translation_parser.mjs
import { Element as Element3, ParseErrorLevel as ParseErrorLevel4, visitAll as visitAll3 } from "@angular/compiler";
var Xliff2TranslationParser = class {
  analyze(filePath, contents) {
    return canParseXml(filePath, contents, "xliff", { version: "2.0" });
  }
  parse(filePath, contents, hint) {
    return this.extractBundle(hint);
  }
  extractBundle({ element, errors }) {
    const diagnostics = new Diagnostics();
    errors.forEach((e) => addParseError(diagnostics, e));
    const locale = getAttribute(element, "trgLang");
    const files = element.children.filter(isFileElement);
    if (files.length === 0) {
      addParseDiagnostic(diagnostics, element.sourceSpan, "No <file> elements found in <xliff>", ParseErrorLevel4.WARNING);
    } else if (files.length > 1) {
      addParseDiagnostic(diagnostics, files[1].sourceSpan, "More than one <file> element found in <xliff>", ParseErrorLevel4.WARNING);
    }
    const bundle = { locale, translations: {}, diagnostics };
    const translationVisitor = new Xliff2TranslationVisitor();
    for (const file of files) {
      visitAll3(translationVisitor, file.children, { bundle });
    }
    return bundle;
  }
};
var Xliff2TranslationVisitor = class extends BaseVisitor {
  visitElement(element, { bundle, unit }) {
    if (element.name === "unit") {
      this.visitUnitElement(element, bundle);
    } else if (element.name === "segment") {
      this.visitSegmentElement(element, bundle, unit);
    } else {
      visitAll3(this, element.children, { bundle, unit });
    }
  }
  visitUnitElement(element, bundle) {
    const externalId = getAttribute(element, "id");
    if (externalId === void 0) {
      addParseDiagnostic(bundle.diagnostics, element.sourceSpan, `Missing required "id" attribute on <trans-unit> element.`, ParseErrorLevel4.ERROR);
      return;
    }
    if (bundle.translations[externalId] !== void 0) {
      addParseDiagnostic(bundle.diagnostics, element.sourceSpan, `Duplicated translations for message "${externalId}"`, ParseErrorLevel4.ERROR);
      return;
    }
    visitAll3(this, element.children, { bundle, unit: externalId });
  }
  visitSegmentElement(element, bundle, unit) {
    if (unit === void 0) {
      addParseDiagnostic(bundle.diagnostics, element.sourceSpan, "Invalid <segment> element: should be a child of a <unit> element.", ParseErrorLevel4.ERROR);
      return;
    }
    let targetMessage = element.children.find(isNamedElement("target"));
    if (targetMessage === void 0) {
      addParseDiagnostic(bundle.diagnostics, element.sourceSpan, "Missing <target> element", ParseErrorLevel4.WARNING);
      targetMessage = element.children.find(isNamedElement("source"));
      if (targetMessage === void 0) {
        addParseDiagnostic(bundle.diagnostics, element.sourceSpan, "Missing required element: one of <target> or <source> is required", ParseErrorLevel4.ERROR);
        return;
      }
    }
    const { translation, parseErrors, serializeErrors } = serializeTranslationMessage(targetMessage, {
      inlineElements: ["cp", "sc", "ec", "mrk", "sm", "em"],
      placeholder: { elementName: "ph", nameAttribute: "equiv", bodyAttribute: "disp" },
      placeholderContainer: {
        elementName: "pc",
        startAttribute: "equivStart",
        endAttribute: "equivEnd"
      }
    });
    if (translation !== null) {
      bundle.translations[unit] = translation;
    }
    addErrorsToBundle(bundle, parseErrors);
    addErrorsToBundle(bundle, serializeErrors);
  }
};
function isFileElement(node) {
  return node instanceof Element3 && node.name === "file";
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/translate/translation_files/translation_parsers/xtb_translation_parser.mjs
import { ParseErrorLevel as ParseErrorLevel5, visitAll as visitAll4 } from "@angular/compiler";
import { extname as extname2 } from "path";
var XtbTranslationParser = class {
  analyze(filePath, contents) {
    const extension = extname2(filePath);
    if (extension !== ".xtb" && extension !== ".xmb") {
      const diagnostics = new Diagnostics();
      diagnostics.warn("Must have xtb or xmb extension.");
      return { canParse: false, diagnostics };
    }
    return canParseXml(filePath, contents, "translationbundle", {});
  }
  parse(filePath, contents, hint) {
    return this.extractBundle(hint);
  }
  extractBundle({ element, errors }) {
    const langAttr = element.attrs.find((attr) => attr.name === "lang");
    const bundle = {
      locale: langAttr && langAttr.value,
      translations: {},
      diagnostics: new Diagnostics()
    };
    errors.forEach((e) => addParseError(bundle.diagnostics, e));
    const bundleVisitor = new XtbVisitor();
    visitAll4(bundleVisitor, element.children, bundle);
    return bundle;
  }
};
var XtbVisitor = class extends BaseVisitor {
  visitElement(element, bundle) {
    switch (element.name) {
      case "translation":
        const id = getAttribute(element, "id");
        if (id === void 0) {
          addParseDiagnostic(bundle.diagnostics, element.sourceSpan, `Missing required "id" attribute on <translation> element.`, ParseErrorLevel5.ERROR);
          return;
        }
        if (bundle.translations[id] !== void 0) {
          addParseDiagnostic(bundle.diagnostics, element.sourceSpan, `Duplicated translations for message "${id}"`, ParseErrorLevel5.ERROR);
          return;
        }
        const { translation, parseErrors, serializeErrors } = serializeTranslationMessage(element, {
          inlineElements: [],
          placeholder: { elementName: "ph", nameAttribute: "name" }
        });
        if (parseErrors.length) {
          bundle.diagnostics.warn(computeParseWarning(id, parseErrors));
        } else if (translation !== null) {
          bundle.translations[id] = translation;
        }
        addErrorsToBundle(bundle, serializeErrors);
        break;
      default:
        addParseDiagnostic(bundle.diagnostics, element.sourceSpan, `Unexpected <${element.name}> tag.`, ParseErrorLevel5.ERROR);
    }
  }
};
function computeParseWarning(id, errors) {
  const msg = errors.map((e) => e.toString()).join("\n");
  return `Could not parse message with id "${id}" - perhaps it has an unrecognised ICU format?
` + msg;
}

export {
  makeEs2015TranslatePlugin,
  makeEs5TranslatePlugin,
  makeLocalePlugin,
  ArbTranslationParser,
  SimpleJsonTranslationParser,
  Xliff1TranslationParser,
  Xliff2TranslationParser,
  XtbTranslationParser
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
//# sourceMappingURL=chunk-7VEU2OGJ.js.map
