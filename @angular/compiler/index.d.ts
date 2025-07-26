/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

declare const emitDistinctChangesOnlyDefaultValue = true;
declare enum ViewEncapsulation$1 {
    Emulated = 0,
    None = 2,
    ShadowDom = 3
}
declare enum ChangeDetectionStrategy$1 {
    OnPush = 0,
    Default = 1
}
interface Input {
    alias?: string;
    required?: boolean;
    transform?: (value: any) => any;
    isSignal: boolean;
}
/** Flags describing an input for a directive. */
declare enum InputFlags {
    None = 0,
    SignalBased = 1,
    HasDecoratorInputTransform = 2
}
interface Output {
    alias?: string;
}
interface HostBinding {
    hostPropertyName?: string;
}
interface HostListener {
    eventName?: string;
    args?: string[];
}
interface SchemaMetadata {
    name: string;
}
declare const CUSTOM_ELEMENTS_SCHEMA: SchemaMetadata;
declare const NO_ERRORS_SCHEMA: SchemaMetadata;
interface Type$2 extends Function {
    new (...args: any[]): any;
}
declare const Type$2: FunctionConstructor;
declare enum SecurityContext {
    NONE = 0,
    HTML = 1,
    STYLE = 2,
    SCRIPT = 3,
    URL = 4,
    RESOURCE_URL = 5
}
/**
 * Injection flags for DI.
 */
declare const enum InjectFlags {
    Default = 0,
    /**
     * Specifies that an injector should retrieve a dependency from any injector until reaching the
     * host element of the current component. (Only used with Element Injector)
     */
    Host = 1,
    /** Don't descend into ancestors of the node requesting injection. */
    Self = 2,
    /** Skip the node that is requesting injection. */
    SkipSelf = 4,
    /** Inject `defaultValue` instead if token not found. */
    Optional = 8
}
declare enum MissingTranslationStrategy {
    Error = 0,
    Warning = 1,
    Ignore = 2
}
/**
 * Flags used to generate R3-style CSS Selectors. They are pasted from
 * core/src/render3/projection.ts because they cannot be referenced directly.
 */
declare const enum SelectorFlags {
    /** Indicates this is the beginning of a new negative selector */
    NOT = 1,
    /** Mode for matching attributes */
    ATTRIBUTE = 2,
    /** Mode for matching tag names */
    ELEMENT = 4,
    /** Mode for matching class names */
    CLASS = 8
}
type R3CssSelector = (string | SelectorFlags)[];
type R3CssSelectorList = R3CssSelector[];
declare function parseSelectorToR3Selector(selector: string | null): R3CssSelectorList;
/**
 * Flags passed into template functions to determine which blocks (i.e. creation, update)
 * should be executed.
 *
 * Typically, a template runs both the creation block and the update block on initialization and
 * subsequent runs only execute the update block. However, dynamically created views require that
 * the creation block be executed separately from the update block (for backwards compat).
 */
declare const enum RenderFlags {
    Create = 1,
    Update = 2
}
/**
 * A set of marker values to be used in the attributes arrays. These markers indicate that some
 * items are not regular attributes and the processing should be adapted accordingly.
 */
declare const enum AttributeMarker {
    /**
     * Marker indicates that the following 3 values in the attributes array are:
     * namespaceUri, attributeName, attributeValue
     * in that order.
     */
    NamespaceURI = 0,
    /**
     * Signals class declaration.
     *
     * Each value following `Classes` designates a class name to include on the element.
     * ## Example:
     *
     * Given:
     * ```html
     * <div class="foo bar baz">...</div>
     * ```
     *
     * the generated code is:
     * ```ts
     * var _c1 = [AttributeMarker.Classes, 'foo', 'bar', 'baz'];
     * ```
     */
    Classes = 1,
    /**
     * Signals style declaration.
     *
     * Each pair of values following `Styles` designates a style name and value to include on the
     * element.
     * ## Example:
     *
     * Given:
     * ```html
     * <div style="width:100px; height:200px; color:red">...</div>
     * ```
     *
     * the generated code is:
     * ```ts
     * var _c1 = [AttributeMarker.Styles, 'width', '100px', 'height'. '200px', 'color', 'red'];
     * ```
     */
    Styles = 2,
    /**
     * Signals that the following attribute names were extracted from input or output bindings.
     *
     * For example, given the following HTML:
     *
     * ```html
     * <div moo="car" [foo]="exp" (bar)="doSth()">
     * ```
     *
     * the generated code is:
     *
     * ```ts
     * var _c1 = ['moo', 'car', AttributeMarker.Bindings, 'foo', 'bar'];
     * ```
     */
    Bindings = 3,
    /**
     * Signals that the following attribute names were hoisted from an inline-template declaration.
     *
     * For example, given the following HTML:
     *
     * ```html
     * <div *ngFor="let value of values; trackBy:trackBy" dirA [dirB]="value">
     * ```
     *
     * the generated code for the `template()` instruction would include:
     *
     * ```
     * ['dirA', '', AttributeMarker.Bindings, 'dirB', AttributeMarker.Template, 'ngFor', 'ngForOf',
     * 'ngForTrackBy', 'let-value']
     * ```
     *
     * while the generated code for the `element()` instruction inside the template function would
     * include:
     *
     * ```
     * ['dirA', '', AttributeMarker.Bindings, 'dirB']
     * ```
     */
    Template = 4,
    /**
     * Signals that the following attribute is `ngProjectAs` and its value is a parsed `CssSelector`.
     *
     * For example, given the following HTML:
     *
     * ```html
     * <h1 attr="value" ngProjectAs="[title]">
     * ```
     *
     * the generated code for the `element()` instruction would include:
     *
     * ```
     * ['attr', 'value', AttributeMarker.ProjectAs, ['', 'title', '']]
     * ```
     */
    ProjectAs = 5,
    /**
     * Signals that the following attribute will be translated by runtime i18n
     *
     * For example, given the following HTML:
     *
     * ```html
     * <div moo="car" foo="value" i18n-foo [bar]="binding" i18n-bar>
     * ```
     *
     * the generated code is:
     *
     * ```ts
     * var _c1 = ['moo', 'car', AttributeMarker.I18n, 'foo', 'bar'];
     * ```
     */
    I18n = 6
}

type core_d_AttributeMarker = AttributeMarker;
declare const core_d_AttributeMarker: typeof AttributeMarker;
declare const core_d_CUSTOM_ELEMENTS_SCHEMA: typeof CUSTOM_ELEMENTS_SCHEMA;
type core_d_HostBinding = HostBinding;
type core_d_HostListener = HostListener;
type core_d_InjectFlags = InjectFlags;
declare const core_d_InjectFlags: typeof InjectFlags;
type core_d_Input = Input;
type core_d_InputFlags = InputFlags;
declare const core_d_InputFlags: typeof InputFlags;
type core_d_MissingTranslationStrategy = MissingTranslationStrategy;
declare const core_d_MissingTranslationStrategy: typeof MissingTranslationStrategy;
declare const core_d_NO_ERRORS_SCHEMA: typeof NO_ERRORS_SCHEMA;
type core_d_Output = Output;
type core_d_R3CssSelector = R3CssSelector;
type core_d_R3CssSelectorList = R3CssSelectorList;
type core_d_RenderFlags = RenderFlags;
declare const core_d_RenderFlags: typeof RenderFlags;
type core_d_SchemaMetadata = SchemaMetadata;
type core_d_SecurityContext = SecurityContext;
declare const core_d_SecurityContext: typeof SecurityContext;
type core_d_SelectorFlags = SelectorFlags;
declare const core_d_SelectorFlags: typeof SelectorFlags;
declare const core_d_emitDistinctChangesOnlyDefaultValue: typeof emitDistinctChangesOnlyDefaultValue;
declare const core_d_parseSelectorToR3Selector: typeof parseSelectorToR3Selector;
declare namespace core_d {
  export { core_d_AttributeMarker as AttributeMarker, core_d_CUSTOM_ELEMENTS_SCHEMA as CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy$1 as ChangeDetectionStrategy, core_d_InjectFlags as InjectFlags, core_d_InputFlags as InputFlags, core_d_MissingTranslationStrategy as MissingTranslationStrategy, core_d_NO_ERRORS_SCHEMA as NO_ERRORS_SCHEMA, core_d_RenderFlags as RenderFlags, core_d_SecurityContext as SecurityContext, core_d_SelectorFlags as SelectorFlags, Type$2 as Type, ViewEncapsulation$1 as ViewEncapsulation, core_d_emitDistinctChangesOnlyDefaultValue as emitDistinctChangesOnlyDefaultValue, core_d_parseSelectorToR3Selector as parseSelectorToR3Selector };
  export type { core_d_HostBinding as HostBinding, core_d_HostListener as HostListener, core_d_Input as Input, core_d_Output as Output, core_d_R3CssSelector as R3CssSelector, core_d_R3CssSelectorList as R3CssSelectorList, core_d_SchemaMetadata as SchemaMetadata };
}

declare class ParseLocation {
    file: ParseSourceFile;
    offset: number;
    line: number;
    col: number;
    constructor(file: ParseSourceFile, offset: number, line: number, col: number);
    toString(): string;
    moveBy(delta: number): ParseLocation;
    getContext(maxChars: number, maxLines: number): {
        before: string;
        after: string;
    } | null;
}
declare class ParseSourceFile {
    content: string;
    url: string;
    constructor(content: string, url: string);
}
declare class ParseSourceSpan$1 {
    start: ParseLocation;
    end: ParseLocation;
    fullStart: ParseLocation;
    details: string | null;
    /**
     * Create an object that holds information about spans of tokens/nodes captured during
     * lexing/parsing of text.
     *
     * @param start
     * The location of the start of the span (having skipped leading trivia).
     * Skipping leading trivia makes source-spans more "user friendly", since things like HTML
     * elements will appear to begin at the start of the opening tag, rather than at the start of any
     * leading trivia, which could include newlines.
     *
     * @param end
     * The location of the end of the span.
     *
     * @param fullStart
     * The start of the token without skipping the leading trivia.
     * This is used by tooling that splits tokens further, such as extracting Angular interpolations
     * from text tokens. Such tooling creates new source-spans relative to the original token's
     * source-span. If leading trivia characters have been skipped then the new source-spans may be
     * incorrectly offset.
     *
     * @param details
     * Additional information (such as identifier names) that should be associated with the span.
     */
    constructor(start: ParseLocation, end: ParseLocation, fullStart?: ParseLocation, details?: string | null);
    toString(): string;
}
declare enum ParseErrorLevel {
    WARNING = 0,
    ERROR = 1
}
declare class ParseError {
    /** Location of the error. */
    readonly span: ParseSourceSpan$1;
    /** Error message. */
    readonly msg: string;
    /** Severity level of the error. */
    readonly level: ParseErrorLevel;
    /**
     * Error that caused the error to be surfaced. For example, an error in a sub-expression that
     * couldn't be parsed. Not guaranteed to be defined, but can be used to provide more context.
     */
    readonly relatedError?: unknown | undefined;
    constructor(
    /** Location of the error. */
    span: ParseSourceSpan$1, 
    /** Error message. */
    msg: string, 
    /** Severity level of the error. */
    level?: ParseErrorLevel, 
    /**
     * Error that caused the error to be surfaced. For example, an error in a sub-expression that
     * couldn't be parsed. Not guaranteed to be defined, but can be used to provide more context.
     */
    relatedError?: unknown | undefined);
    contextualMessage(): string;
    toString(): string;
}
/**
 * Generates Source Span object for a given R3 Type for JIT mode.
 *
 * @param kind Component or Directive.
 * @param typeName name of the Component or Directive.
 * @param sourceUrl reference to Component or Directive source.
 * @returns instance of ParseSourceSpan that represent a given Component or Directive.
 */
declare function r3JitTypeSourceSpan(kind: string, typeName: string, sourceUrl: string): ParseSourceSpan$1;
declare function identifierName(compileIdentifier: CompileIdentifierMetadata | null | undefined): string | null;
interface CompileIdentifierMetadata {
    reference: any;
}
declare function sanitizeIdentifier(name: string): string;

/**
 * Describes the text contents of a placeholder as it appears in an ICU expression, including its
 * source span information.
 */
interface MessagePlaceholder {
    /** The text contents of the placeholder */
    text: string;
    /** The source span of the placeholder */
    sourceSpan: ParseSourceSpan$1;
}
declare class Message {
    nodes: Node$2[];
    placeholders: {
        [phName: string]: MessagePlaceholder;
    };
    placeholderToMessage: {
        [phName: string]: Message;
    };
    meaning: string;
    description: string;
    customId: string;
    sources: MessageSpan[];
    id: string;
    /** The ids to use if there are no custom id and if `i18nLegacyMessageIdFormat` is not empty */
    legacyIds: string[];
    messageString: string;
    /**
     * @param nodes message AST
     * @param placeholders maps placeholder names to static content and their source spans
     * @param placeholderToMessage maps placeholder names to messages (used for nested ICU messages)
     * @param meaning
     * @param description
     * @param customId
     */
    constructor(nodes: Node$2[], placeholders: {
        [phName: string]: MessagePlaceholder;
    }, placeholderToMessage: {
        [phName: string]: Message;
    }, meaning: string, description: string, customId: string);
}
interface MessageSpan {
    filePath: string;
    startLine: number;
    startCol: number;
    endLine: number;
    endCol: number;
}
interface Node$2 {
    sourceSpan: ParseSourceSpan$1;
    visit(visitor: Visitor$2, context?: any): any;
}
declare class Text$2 implements Node$2 {
    value: string;
    sourceSpan: ParseSourceSpan$1;
    constructor(value: string, sourceSpan: ParseSourceSpan$1);
    visit(visitor: Visitor$2, context?: any): any;
}
declare class Container implements Node$2 {
    children: Node$2[];
    sourceSpan: ParseSourceSpan$1;
    constructor(children: Node$2[], sourceSpan: ParseSourceSpan$1);
    visit(visitor: Visitor$2, context?: any): any;
}
declare class Icu$1 implements Node$2 {
    expression: string;
    type: string;
    cases: {
        [k: string]: Node$2;
    };
    sourceSpan: ParseSourceSpan$1;
    expressionPlaceholder?: string | undefined;
    constructor(expression: string, type: string, cases: {
        [k: string]: Node$2;
    }, sourceSpan: ParseSourceSpan$1, expressionPlaceholder?: string | undefined);
    visit(visitor: Visitor$2, context?: any): any;
}
declare class TagPlaceholder implements Node$2 {
    tag: string;
    attrs: {
        [k: string]: string;
    };
    startName: string;
    closeName: string;
    children: Node$2[];
    isVoid: boolean;
    sourceSpan: ParseSourceSpan$1;
    startSourceSpan: ParseSourceSpan$1 | null;
    endSourceSpan: ParseSourceSpan$1 | null;
    constructor(tag: string, attrs: {
        [k: string]: string;
    }, startName: string, closeName: string, children: Node$2[], isVoid: boolean, sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1 | null, endSourceSpan: ParseSourceSpan$1 | null);
    visit(visitor: Visitor$2, context?: any): any;
}
declare class Placeholder implements Node$2 {
    value: string;
    name: string;
    sourceSpan: ParseSourceSpan$1;
    constructor(value: string, name: string, sourceSpan: ParseSourceSpan$1);
    visit(visitor: Visitor$2, context?: any): any;
}
declare class IcuPlaceholder implements Node$2 {
    value: Icu$1;
    name: string;
    sourceSpan: ParseSourceSpan$1;
    /** Used to capture a message computed from a previous processing pass (see `setI18nRefs()`). */
    previousMessage?: Message;
    constructor(value: Icu$1, name: string, sourceSpan: ParseSourceSpan$1);
    visit(visitor: Visitor$2, context?: any): any;
}
declare class BlockPlaceholder implements Node$2 {
    name: string;
    parameters: string[];
    startName: string;
    closeName: string;
    children: Node$2[];
    sourceSpan: ParseSourceSpan$1;
    startSourceSpan: ParseSourceSpan$1 | null;
    endSourceSpan: ParseSourceSpan$1 | null;
    constructor(name: string, parameters: string[], startName: string, closeName: string, children: Node$2[], sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1 | null, endSourceSpan: ParseSourceSpan$1 | null);
    visit(visitor: Visitor$2, context?: any): any;
}
/**
 * Each HTML node that is affect by an i18n tag will also have an `i18n` property that is of type
 * `I18nMeta`.
 * This information is either a `Message`, which indicates it is the root of an i18n message, or a
 * `Node`, which indicates is it part of a containing `Message`.
 */
type I18nMeta$1 = Message | Node$2;
interface Visitor$2 {
    visitText(text: Text$2, context?: any): any;
    visitContainer(container: Container, context?: any): any;
    visitIcu(icu: Icu$1, context?: any): any;
    visitTagPlaceholder(ph: TagPlaceholder, context?: any): any;
    visitPlaceholder(ph: Placeholder, context?: any): any;
    visitIcuPlaceholder(ph: IcuPlaceholder, context?: any): any;
    visitBlockPlaceholder(ph: BlockPlaceholder, context?: any): any;
}

declare const enum TokenType$1 {
    TAG_OPEN_START = 0,
    TAG_OPEN_END = 1,
    TAG_OPEN_END_VOID = 2,
    TAG_CLOSE = 3,
    INCOMPLETE_TAG_OPEN = 4,
    TEXT = 5,
    ESCAPABLE_RAW_TEXT = 6,
    RAW_TEXT = 7,
    INTERPOLATION = 8,
    ENCODED_ENTITY = 9,
    COMMENT_START = 10,
    COMMENT_END = 11,
    CDATA_START = 12,
    CDATA_END = 13,
    ATTR_NAME = 14,
    ATTR_QUOTE = 15,
    ATTR_VALUE_TEXT = 16,
    ATTR_VALUE_INTERPOLATION = 17,
    DOC_TYPE = 18,
    EXPANSION_FORM_START = 19,
    EXPANSION_CASE_VALUE = 20,
    EXPANSION_CASE_EXP_START = 21,
    EXPANSION_CASE_EXP_END = 22,
    EXPANSION_FORM_END = 23,
    BLOCK_OPEN_START = 24,
    BLOCK_OPEN_END = 25,
    BLOCK_CLOSE = 26,
    BLOCK_PARAMETER = 27,
    INCOMPLETE_BLOCK_OPEN = 28,
    LET_START = 29,
    LET_VALUE = 30,
    LET_END = 31,
    INCOMPLETE_LET = 32,
    COMPONENT_OPEN_START = 33,
    COMPONENT_OPEN_END = 34,
    COMPONENT_OPEN_END_VOID = 35,
    COMPONENT_CLOSE = 36,
    INCOMPLETE_COMPONENT_OPEN = 37,
    DIRECTIVE_NAME = 38,
    DIRECTIVE_OPEN = 39,
    DIRECTIVE_CLOSE = 40,
    EOF = 41
}
type InterpolatedTextToken = TextToken | InterpolationToken | EncodedEntityToken;
type InterpolatedAttributeToken = AttributeValueTextToken | AttributeValueInterpolationToken | EncodedEntityToken;
interface TokenBase {
    type: TokenType$1;
    parts: string[];
    sourceSpan: ParseSourceSpan$1;
}
interface TextToken extends TokenBase {
    type: TokenType$1.TEXT | TokenType$1.ESCAPABLE_RAW_TEXT | TokenType$1.RAW_TEXT;
    parts: [text: string];
}
interface InterpolationToken extends TokenBase {
    type: TokenType$1.INTERPOLATION;
    parts: [startMarker: string, expression: string, endMarker: string] | [startMarker: string, expression: string];
}
interface EncodedEntityToken extends TokenBase {
    type: TokenType$1.ENCODED_ENTITY;
    parts: [decoded: string, encoded: string];
}
interface AttributeValueTextToken extends TokenBase {
    type: TokenType$1.ATTR_VALUE_TEXT;
    parts: [value: string];
}
interface AttributeValueInterpolationToken extends TokenBase {
    type: TokenType$1.ATTR_VALUE_INTERPOLATION;
    parts: [startMarker: string, expression: string, endMarker: string] | [startMarker: string, expression: string];
}

interface BaseNode {
    sourceSpan: ParseSourceSpan$1;
    visit(visitor: Visitor$1, context: any): any;
}
type Node$1 = Attribute | Comment$1 | Element$1 | Expansion | ExpansionCase | Text$1 | Block | BlockParameter | Component$1 | Directive$1;
declare abstract class NodeWithI18n implements BaseNode {
    sourceSpan: ParseSourceSpan$1;
    i18n?: I18nMeta$1 | undefined;
    constructor(sourceSpan: ParseSourceSpan$1, i18n?: I18nMeta$1 | undefined);
    abstract visit(visitor: Visitor$1, context: any): any;
}
declare class Text$1 extends NodeWithI18n {
    value: string;
    tokens: InterpolatedTextToken[];
    constructor(value: string, sourceSpan: ParseSourceSpan$1, tokens: InterpolatedTextToken[], i18n?: I18nMeta$1);
    visit(visitor: Visitor$1, context: any): any;
}
declare class Expansion extends NodeWithI18n {
    switchValue: string;
    type: string;
    cases: ExpansionCase[];
    switchValueSourceSpan: ParseSourceSpan$1;
    constructor(switchValue: string, type: string, cases: ExpansionCase[], sourceSpan: ParseSourceSpan$1, switchValueSourceSpan: ParseSourceSpan$1, i18n?: I18nMeta$1);
    visit(visitor: Visitor$1, context: any): any;
}
declare class ExpansionCase implements BaseNode {
    value: string;
    expression: Node$1[];
    sourceSpan: ParseSourceSpan$1;
    valueSourceSpan: ParseSourceSpan$1;
    expSourceSpan: ParseSourceSpan$1;
    constructor(value: string, expression: Node$1[], sourceSpan: ParseSourceSpan$1, valueSourceSpan: ParseSourceSpan$1, expSourceSpan: ParseSourceSpan$1);
    visit(visitor: Visitor$1, context: any): any;
}
declare class Attribute extends NodeWithI18n {
    name: string;
    value: string;
    readonly keySpan: ParseSourceSpan$1 | undefined;
    valueSpan: ParseSourceSpan$1 | undefined;
    valueTokens: InterpolatedAttributeToken[] | undefined;
    constructor(name: string, value: string, sourceSpan: ParseSourceSpan$1, keySpan: ParseSourceSpan$1 | undefined, valueSpan: ParseSourceSpan$1 | undefined, valueTokens: InterpolatedAttributeToken[] | undefined, i18n: I18nMeta$1 | undefined);
    visit(visitor: Visitor$1, context: any): any;
}
declare class Element$1 extends NodeWithI18n {
    name: string;
    attrs: Attribute[];
    readonly directives: Directive$1[];
    children: Node$1[];
    startSourceSpan: ParseSourceSpan$1;
    endSourceSpan: ParseSourceSpan$1 | null;
    constructor(name: string, attrs: Attribute[], directives: Directive$1[], children: Node$1[], sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan?: ParseSourceSpan$1 | null, i18n?: I18nMeta$1);
    visit(visitor: Visitor$1, context: any): any;
}
declare class Comment$1 implements BaseNode {
    value: string | null;
    sourceSpan: ParseSourceSpan$1;
    constructor(value: string | null, sourceSpan: ParseSourceSpan$1);
    visit(visitor: Visitor$1, context: any): any;
}
declare class Block extends NodeWithI18n {
    name: string;
    parameters: BlockParameter[];
    children: Node$1[];
    nameSpan: ParseSourceSpan$1;
    startSourceSpan: ParseSourceSpan$1;
    endSourceSpan: ParseSourceSpan$1 | null;
    constructor(name: string, parameters: BlockParameter[], children: Node$1[], sourceSpan: ParseSourceSpan$1, nameSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan?: ParseSourceSpan$1 | null, i18n?: I18nMeta$1);
    visit(visitor: Visitor$1, context: any): any;
}
declare class Component$1 extends NodeWithI18n {
    readonly componentName: string;
    readonly tagName: string | null;
    readonly fullName: string;
    attrs: Attribute[];
    readonly directives: Directive$1[];
    readonly children: Node$1[];
    readonly startSourceSpan: ParseSourceSpan$1;
    endSourceSpan: ParseSourceSpan$1 | null;
    constructor(componentName: string, tagName: string | null, fullName: string, attrs: Attribute[], directives: Directive$1[], children: Node$1[], sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan?: ParseSourceSpan$1 | null, i18n?: I18nMeta$1);
    visit(visitor: Visitor$1, context: any): any;
}
declare class Directive$1 implements BaseNode {
    readonly name: string;
    readonly attrs: Attribute[];
    readonly sourceSpan: ParseSourceSpan$1;
    readonly startSourceSpan: ParseSourceSpan$1;
    readonly endSourceSpan: ParseSourceSpan$1 | null;
    constructor(name: string, attrs: Attribute[], sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan?: ParseSourceSpan$1 | null);
    visit(visitor: Visitor$1, context: any): any;
}
declare class BlockParameter implements BaseNode {
    expression: string;
    sourceSpan: ParseSourceSpan$1;
    constructor(expression: string, sourceSpan: ParseSourceSpan$1);
    visit(visitor: Visitor$1, context: any): any;
}
declare class LetDeclaration$1 implements BaseNode {
    name: string;
    value: string;
    sourceSpan: ParseSourceSpan$1;
    readonly nameSpan: ParseSourceSpan$1;
    valueSpan: ParseSourceSpan$1;
    constructor(name: string, value: string, sourceSpan: ParseSourceSpan$1, nameSpan: ParseSourceSpan$1, valueSpan: ParseSourceSpan$1);
    visit(visitor: Visitor$1, context: any): any;
}
interface Visitor$1 {
    visit?(node: Node$1, context: any): any;
    visitElement(element: Element$1, context: any): any;
    visitAttribute(attribute: Attribute, context: any): any;
    visitText(text: Text$1, context: any): any;
    visitComment(comment: Comment$1, context: any): any;
    visitExpansion(expansion: Expansion, context: any): any;
    visitExpansionCase(expansionCase: ExpansionCase, context: any): any;
    visitBlock(block: Block, context: any): any;
    visitBlockParameter(parameter: BlockParameter, context: any): any;
    visitLetDeclaration(decl: LetDeclaration$1, context: any): any;
    visitComponent(component: Component$1, context: any): any;
    visitDirective(directive: Directive$1, context: any): any;
}
declare function visitAll$1(visitor: Visitor$1, nodes: Node$1[], context?: any): any[];
declare class RecursiveVisitor$1 implements Visitor$1 {
    constructor();
    visitElement(ast: Element$1, context: any): any;
    visitAttribute(ast: Attribute, context: any): any;
    visitText(ast: Text$1, context: any): any;
    visitComment(ast: Comment$1, context: any): any;
    visitExpansion(ast: Expansion, context: any): any;
    visitExpansionCase(ast: ExpansionCase, context: any): any;
    visitBlock(block: Block, context: any): any;
    visitBlockParameter(ast: BlockParameter, context: any): any;
    visitLetDeclaration(decl: LetDeclaration$1, context: any): void;
    visitComponent(component: Component$1, context: any): void;
    visitDirective(directive: Directive$1, context: any): void;
    private visitChildren;
}

declare class InterpolationConfig {
    start: string;
    end: string;
    static fromArray(markers: [string, string] | null): InterpolationConfig;
    constructor(start: string, end: string);
}
declare const DEFAULT_INTERPOLATION_CONFIG: InterpolationConfig;

declare enum TagContentType {
    RAW_TEXT = 0,
    ESCAPABLE_RAW_TEXT = 1,
    PARSABLE_DATA = 2
}
interface TagDefinition {
    closedByParent: boolean;
    implicitNamespacePrefix: string | null;
    isVoid: boolean;
    ignoreFirstLf: boolean;
    canSelfClose: boolean;
    preventNamespaceInheritance: boolean;
    isClosedByChild(name: string): boolean;
    getContentType(prefix?: string): TagContentType;
}
declare function splitNsName(elementName: string, fatal?: boolean): [string | null, string];
declare function isNgContainer(tagName: string): boolean;
declare function isNgContent(tagName: string): boolean;
declare function isNgTemplate(tagName: string): boolean;
declare function getNsPrefix(fullName: string): string;
declare function getNsPrefix(fullName: null): null;
declare function mergeNsAndName(prefix: string, localName: string): string;

interface LexerRange {
    startPos: number;
    startLine: number;
    startCol: number;
    endPos: number;
}
/**
 * Options that modify how the text is tokenized.
 */
interface TokenizeOptions {
    /** Whether to tokenize ICU messages (considered as text nodes when false). */
    tokenizeExpansionForms?: boolean;
    /** How to tokenize interpolation markers. */
    interpolationConfig?: InterpolationConfig;
    /**
     * The start and end point of the text to parse within the `source` string.
     * The entire `source` string is parsed if this is not provided.
     * */
    range?: LexerRange;
    /**
     * If this text is stored in a JavaScript string, then we have to deal with escape sequences.
     *
     * **Example 1:**
     *
     * ```
     * "abc\"def\nghi"
     * ```
     *
     * - The `\"` must be converted to `"`.
     * - The `\n` must be converted to a new line character in a token,
     *   but it should not increment the current line for source mapping.
     *
     * **Example 2:**
     *
     * ```
     * "abc\
     *  def"
     * ```
     *
     * The line continuation (`\` followed by a newline) should be removed from a token
     * but the new line should increment the current line for source mapping.
     */
    escapedString?: boolean;
    /**
     * If this text is stored in an external template (e.g. via `templateUrl`) then we need to decide
     * whether or not to normalize the line-endings (from `\r\n` to `\n`) when processing ICU
     * expressions.
     *
     * If `true` then we will normalize ICU expression line endings.
     * The default is `false`, but this will be switched in a future major release.
     */
    i18nNormalizeLineEndingsInICUs?: boolean;
    /**
     * An array of characters that should be considered as leading trivia.
     * Leading trivia are characters that are not important to the developer, and so should not be
     * included in source-map segments.  A common example is whitespace.
     */
    leadingTriviaChars?: string[];
    /**
     * If true, do not convert CRLF to LF.
     */
    preserveLineEndings?: boolean;
    /**
     * Whether to tokenize @ block syntax. Otherwise considered text,
     * or ICU tokens if `tokenizeExpansionForms` is enabled.
     */
    tokenizeBlocks?: boolean;
    /**
     * Whether to tokenize the `@let` syntax. Otherwise will be considered either
     * text or an incomplete block, depending on whether `tokenizeBlocks` is enabled.
     */
    tokenizeLet?: boolean;
    /** Whether the selectorless syntax is enabled. */
    selectorlessEnabled?: boolean;
}

declare class TreeError extends ParseError {
    elementName: string | null;
    static create(elementName: string | null, span: ParseSourceSpan$1, msg: string): TreeError;
    constructor(elementName: string | null, span: ParseSourceSpan$1, msg: string);
}
declare class ParseTreeResult {
    rootNodes: Node$1[];
    errors: ParseError[];
    constructor(rootNodes: Node$1[], errors: ParseError[]);
}
declare class Parser$1 {
    getTagDefinition: (tagName: string) => TagDefinition;
    constructor(getTagDefinition: (tagName: string) => TagDefinition);
    parse(source: string, url: string, options?: TokenizeOptions): ParseTreeResult;
}

type I18nMeta = {
    id?: string;
    customId?: string;
    legacyIds?: string[];
    description?: string;
    meaning?: string;
};

declare enum TypeModifier {
    None = 0,
    Const = 1
}
declare abstract class Type$1 {
    modifiers: TypeModifier;
    constructor(modifiers?: TypeModifier);
    abstract visitType(visitor: TypeVisitor, context: any): any;
    hasModifier(modifier: TypeModifier): boolean;
}
declare enum BuiltinTypeName {
    Dynamic = 0,
    Bool = 1,
    String = 2,
    Int = 3,
    Number = 4,
    Function = 5,
    Inferred = 6,
    None = 7
}
declare class BuiltinType extends Type$1 {
    name: BuiltinTypeName;
    constructor(name: BuiltinTypeName, modifiers?: TypeModifier);
    visitType(visitor: TypeVisitor, context: any): any;
}
declare class ExpressionType extends Type$1 {
    value: Expression;
    typeParams: Type$1[] | null;
    constructor(value: Expression, modifiers?: TypeModifier, typeParams?: Type$1[] | null);
    visitType(visitor: TypeVisitor, context: any): any;
}
declare class ArrayType extends Type$1 {
    of: Type$1;
    constructor(of: Type$1, modifiers?: TypeModifier);
    visitType(visitor: TypeVisitor, context: any): any;
}
declare class MapType extends Type$1 {
    valueType: Type$1 | null;
    constructor(valueType: Type$1 | null | undefined, modifiers?: TypeModifier);
    visitType(visitor: TypeVisitor, context: any): any;
}
declare class TransplantedType<T> extends Type$1 {
    readonly type: T;
    constructor(type: T, modifiers?: TypeModifier);
    visitType(visitor: TypeVisitor, context: any): any;
}
declare const DYNAMIC_TYPE: BuiltinType;
declare const INFERRED_TYPE: BuiltinType;
declare const BOOL_TYPE: BuiltinType;
declare const INT_TYPE: BuiltinType;
declare const NUMBER_TYPE: BuiltinType;
declare const STRING_TYPE: BuiltinType;
declare const FUNCTION_TYPE: BuiltinType;
declare const NONE_TYPE: BuiltinType;
interface TypeVisitor {
    visitBuiltinType(type: BuiltinType, context: any): any;
    visitExpressionType(type: ExpressionType, context: any): any;
    visitArrayType(type: ArrayType, context: any): any;
    visitMapType(type: MapType, context: any): any;
    visitTransplantedType(type: TransplantedType<unknown>, context: any): any;
}
declare enum UnaryOperator {
    Minus = 0,
    Plus = 1
}
declare enum BinaryOperator {
    Equals = 0,
    NotEquals = 1,
    Identical = 2,
    NotIdentical = 3,
    Minus = 4,
    Plus = 5,
    Divide = 6,
    Multiply = 7,
    Modulo = 8,
    And = 9,
    Or = 10,
    BitwiseOr = 11,
    BitwiseAnd = 12,
    Lower = 13,
    LowerEquals = 14,
    Bigger = 15,
    BiggerEquals = 16,
    NullishCoalesce = 17,
    Exponentiation = 18,
    In = 19
}
declare function nullSafeIsEquivalent<T extends {
    isEquivalent(other: T): boolean;
}>(base: T | null, other: T | null): boolean;
declare function areAllEquivalent<T extends {
    isEquivalent(other: T): boolean;
}>(base: T[], other: T[]): boolean;
declare abstract class Expression {
    type: Type$1 | null;
    sourceSpan: ParseSourceSpan$1 | null;
    constructor(type: Type$1 | null | undefined, sourceSpan?: ParseSourceSpan$1 | null);
    abstract visitExpression(visitor: ExpressionVisitor, context: any): any;
    /**
     * Calculates whether this expression produces the same value as the given expression.
     * Note: We don't check Types nor ParseSourceSpans nor function arguments.
     */
    abstract isEquivalent(e: Expression): boolean;
    /**
     * Return true if the expression is constant.
     */
    abstract isConstant(): boolean;
    abstract clone(): Expression;
    prop(name: string, sourceSpan?: ParseSourceSpan$1 | null): ReadPropExpr;
    key(index: Expression, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null): ReadKeyExpr;
    callFn(params: Expression[], sourceSpan?: ParseSourceSpan$1 | null, pure?: boolean): InvokeFunctionExpr;
    instantiate(params: Expression[], type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null): InstantiateExpr;
    conditional(trueCase: Expression, falseCase?: Expression | null, sourceSpan?: ParseSourceSpan$1 | null): ConditionalExpr;
    equals(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    notEquals(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    identical(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    notIdentical(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    minus(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    plus(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    divide(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    multiply(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    modulo(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    power(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    and(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    bitwiseOr(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    bitwiseAnd(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    or(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    lower(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    lowerEquals(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    bigger(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    biggerEquals(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    isBlank(sourceSpan?: ParseSourceSpan$1 | null): Expression;
    nullishCoalesce(rhs: Expression, sourceSpan?: ParseSourceSpan$1 | null): BinaryOperatorExpr;
    toStmt(): Statement;
}
declare class ReadVarExpr extends Expression {
    name: string;
    constructor(name: string, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): ReadVarExpr;
    set(value: Expression): WriteVarExpr;
}
declare class TypeofExpr extends Expression {
    expr: Expression;
    constructor(expr: Expression, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    clone(): TypeofExpr;
}
declare class VoidExpr extends Expression {
    expr: Expression;
    constructor(expr: Expression, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    clone(): VoidExpr;
}
declare class WrappedNodeExpr<T> extends Expression {
    node: T;
    constructor(node: T, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): WrappedNodeExpr<T>;
}
declare class WriteVarExpr extends Expression {
    name: string;
    value: Expression;
    constructor(name: string, value: Expression, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): WriteVarExpr;
    toDeclStmt(type?: Type$1 | null, modifiers?: StmtModifier): DeclareVarStmt;
    toConstDecl(): DeclareVarStmt;
}
declare class WriteKeyExpr extends Expression {
    receiver: Expression;
    index: Expression;
    value: Expression;
    constructor(receiver: Expression, index: Expression, value: Expression, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): WriteKeyExpr;
}
declare class WritePropExpr extends Expression {
    receiver: Expression;
    name: string;
    value: Expression;
    constructor(receiver: Expression, name: string, value: Expression, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): WritePropExpr;
}
declare class InvokeFunctionExpr extends Expression {
    fn: Expression;
    args: Expression[];
    pure: boolean;
    constructor(fn: Expression, args: Expression[], type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null, pure?: boolean);
    get receiver(): Expression;
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): InvokeFunctionExpr;
}
declare class TaggedTemplateLiteralExpr extends Expression {
    tag: Expression;
    template: TemplateLiteralExpr;
    constructor(tag: Expression, template: TemplateLiteralExpr, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): TaggedTemplateLiteralExpr;
}
declare class InstantiateExpr extends Expression {
    classExpr: Expression;
    args: Expression[];
    constructor(classExpr: Expression, args: Expression[], type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): InstantiateExpr;
}
declare class LiteralExpr extends Expression {
    value: number | string | boolean | null | undefined;
    constructor(value: number | string | boolean | null | undefined, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): LiteralExpr;
}
declare class TemplateLiteralExpr extends Expression {
    elements: TemplateLiteralElementExpr[];
    expressions: Expression[];
    constructor(elements: TemplateLiteralElementExpr[], expressions: Expression[], sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): TemplateLiteralExpr;
}
declare class TemplateLiteralElementExpr extends Expression {
    readonly text: string;
    readonly rawText: string;
    constructor(text: string, sourceSpan?: ParseSourceSpan$1 | null, rawText?: string);
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    clone(): TemplateLiteralElementExpr;
}
declare class LiteralPiece {
    text: string;
    sourceSpan: ParseSourceSpan$1;
    constructor(text: string, sourceSpan: ParseSourceSpan$1);
}
declare class PlaceholderPiece {
    text: string;
    sourceSpan: ParseSourceSpan$1;
    associatedMessage?: Message | undefined;
    /**
     * Create a new instance of a `PlaceholderPiece`.
     *
     * @param text the name of this placeholder (e.g. `PH_1`).
     * @param sourceSpan the location of this placeholder in its localized message the source code.
     * @param associatedMessage reference to another message that this placeholder is associated with.
     * The `associatedMessage` is mainly used to provide a relationship to an ICU message that has
     * been extracted out from the message containing the placeholder.
     */
    constructor(text: string, sourceSpan: ParseSourceSpan$1, associatedMessage?: Message | undefined);
}
type MessagePiece = LiteralPiece | PlaceholderPiece;
declare class LocalizedString extends Expression {
    readonly metaBlock: I18nMeta;
    readonly messageParts: LiteralPiece[];
    readonly placeHolderNames: PlaceholderPiece[];
    readonly expressions: Expression[];
    constructor(metaBlock: I18nMeta, messageParts: LiteralPiece[], placeHolderNames: PlaceholderPiece[], expressions: Expression[], sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): LocalizedString;
    /**
     * Serialize the given `meta` and `messagePart` into "cooked" and "raw" strings that can be used
     * in a `$localize` tagged string. The format of the metadata is the same as that parsed by
     * `parseI18nMeta()`.
     *
     * @param meta The metadata to serialize
     * @param messagePart The first part of the tagged string
     */
    serializeI18nHead(): CookedRawString;
    getMessagePartSourceSpan(i: number): ParseSourceSpan$1 | null;
    getPlaceholderSourceSpan(i: number): ParseSourceSpan$1;
    /**
     * Serialize the given `placeholderName` and `messagePart` into "cooked" and "raw" strings that
     * can be used in a `$localize` tagged string.
     *
     * The format is `:<placeholder-name>[@@<associated-id>]:`.
     *
     * The `associated-id` is the message id of the (usually an ICU) message to which this placeholder
     * refers.
     *
     * @param partIndex The index of the message part to serialize.
     */
    serializeI18nTemplatePart(partIndex: number): CookedRawString;
}
/**
 * A structure to hold the cooked and raw strings of a template literal element, along with its
 * source-span range.
 */
interface CookedRawString {
    cooked: string;
    raw: string;
    range: ParseSourceSpan$1 | null;
}
declare class ExternalExpr extends Expression {
    value: ExternalReference;
    typeParams: Type$1[] | null;
    constructor(value: ExternalReference, type?: Type$1 | null, typeParams?: Type$1[] | null, sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): ExternalExpr;
}
declare class ExternalReference {
    moduleName: string | null;
    name: string | null;
    constructor(moduleName: string | null, name: string | null);
}
declare class ConditionalExpr extends Expression {
    condition: Expression;
    falseCase: Expression | null;
    trueCase: Expression;
    constructor(condition: Expression, trueCase: Expression, falseCase?: Expression | null, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): ConditionalExpr;
}
declare class DynamicImportExpr extends Expression {
    url: string | Expression;
    urlComment?: string | undefined;
    constructor(url: string | Expression, sourceSpan?: ParseSourceSpan$1 | null, urlComment?: string | undefined);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): DynamicImportExpr;
}
declare class NotExpr extends Expression {
    condition: Expression;
    constructor(condition: Expression, sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): NotExpr;
}
declare class FnParam {
    name: string;
    type: Type$1 | null;
    constructor(name: string, type?: Type$1 | null);
    isEquivalent(param: FnParam): boolean;
    clone(): FnParam;
}
declare class FunctionExpr extends Expression {
    params: FnParam[];
    statements: Statement[];
    name?: string | null | undefined;
    constructor(params: FnParam[], statements: Statement[], type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null, name?: string | null | undefined);
    isEquivalent(e: Expression | Statement): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    toDeclStmt(name: string, modifiers?: StmtModifier): DeclareFunctionStmt;
    clone(): FunctionExpr;
}
declare class ArrowFunctionExpr extends Expression {
    params: FnParam[];
    body: Expression | Statement[];
    constructor(params: FnParam[], body: Expression | Statement[], type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): Expression;
    toDeclStmt(name: string, modifiers?: StmtModifier): DeclareVarStmt;
}
declare class UnaryOperatorExpr extends Expression {
    operator: UnaryOperator;
    expr: Expression;
    parens: boolean;
    constructor(operator: UnaryOperator, expr: Expression, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null, parens?: boolean);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): UnaryOperatorExpr;
}
declare class ParenthesizedExpr extends Expression {
    expr: Expression;
    constructor(expr: Expression, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    clone(): ParenthesizedExpr;
}
declare class BinaryOperatorExpr extends Expression {
    operator: BinaryOperator;
    rhs: Expression;
    lhs: Expression;
    constructor(operator: BinaryOperator, lhs: Expression, rhs: Expression, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): BinaryOperatorExpr;
}
declare class ReadPropExpr extends Expression {
    receiver: Expression;
    name: string;
    constructor(receiver: Expression, name: string, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    get index(): string;
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    set(value: Expression): WritePropExpr;
    clone(): ReadPropExpr;
}
declare class ReadKeyExpr extends Expression {
    receiver: Expression;
    index: Expression;
    constructor(receiver: Expression, index: Expression, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    set(value: Expression): WriteKeyExpr;
    clone(): ReadKeyExpr;
}
declare class LiteralArrayExpr extends Expression {
    entries: Expression[];
    constructor(entries: Expression[], type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null);
    isConstant(): boolean;
    isEquivalent(e: Expression): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): LiteralArrayExpr;
}
declare class LiteralMapEntry {
    key: string;
    value: Expression;
    quoted: boolean;
    constructor(key: string, value: Expression, quoted: boolean);
    isEquivalent(e: LiteralMapEntry): boolean;
    clone(): LiteralMapEntry;
}
declare class LiteralMapExpr extends Expression {
    entries: LiteralMapEntry[];
    valueType: Type$1 | null;
    constructor(entries: LiteralMapEntry[], type?: MapType | null, sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): LiteralMapExpr;
}
declare class CommaExpr extends Expression {
    parts: Expression[];
    constructor(parts: Expression[], sourceSpan?: ParseSourceSpan$1 | null);
    isEquivalent(e: Expression): boolean;
    isConstant(): boolean;
    visitExpression(visitor: ExpressionVisitor, context: any): any;
    clone(): CommaExpr;
}
interface ExpressionVisitor {
    visitReadVarExpr(ast: ReadVarExpr, context: any): any;
    visitWriteVarExpr(expr: WriteVarExpr, context: any): any;
    visitWriteKeyExpr(expr: WriteKeyExpr, context: any): any;
    visitWritePropExpr(expr: WritePropExpr, context: any): any;
    visitInvokeFunctionExpr(ast: InvokeFunctionExpr, context: any): any;
    visitTaggedTemplateLiteralExpr(ast: TaggedTemplateLiteralExpr, context: any): any;
    visitTemplateLiteralExpr(ast: TemplateLiteralExpr, context: any): any;
    visitTemplateLiteralElementExpr(ast: TemplateLiteralElementExpr, context: any): any;
    visitInstantiateExpr(ast: InstantiateExpr, context: any): any;
    visitLiteralExpr(ast: LiteralExpr, context: any): any;
    visitLocalizedString(ast: LocalizedString, context: any): any;
    visitExternalExpr(ast: ExternalExpr, context: any): any;
    visitConditionalExpr(ast: ConditionalExpr, context: any): any;
    visitDynamicImportExpr(ast: DynamicImportExpr, context: any): any;
    visitNotExpr(ast: NotExpr, context: any): any;
    visitFunctionExpr(ast: FunctionExpr, context: any): any;
    visitUnaryOperatorExpr(ast: UnaryOperatorExpr, context: any): any;
    visitBinaryOperatorExpr(ast: BinaryOperatorExpr, context: any): any;
    visitReadPropExpr(ast: ReadPropExpr, context: any): any;
    visitReadKeyExpr(ast: ReadKeyExpr, context: any): any;
    visitLiteralArrayExpr(ast: LiteralArrayExpr, context: any): any;
    visitLiteralMapExpr(ast: LiteralMapExpr, context: any): any;
    visitCommaExpr(ast: CommaExpr, context: any): any;
    visitWrappedNodeExpr(ast: WrappedNodeExpr<any>, context: any): any;
    visitTypeofExpr(ast: TypeofExpr, context: any): any;
    visitVoidExpr(ast: VoidExpr, context: any): any;
    visitArrowFunctionExpr(ast: ArrowFunctionExpr, context: any): any;
    visitParenthesizedExpr(ast: ParenthesizedExpr, context: any): any;
}
declare const NULL_EXPR: LiteralExpr;
declare const TYPED_NULL_EXPR: LiteralExpr;
declare enum StmtModifier {
    None = 0,
    Final = 1,
    Private = 2,
    Exported = 4,
    Static = 8
}
declare class LeadingComment {
    text: string;
    multiline: boolean;
    trailingNewline: boolean;
    constructor(text: string, multiline: boolean, trailingNewline: boolean);
    toString(): string;
}
declare class JSDocComment extends LeadingComment {
    tags: JSDocTag[];
    constructor(tags: JSDocTag[]);
    toString(): string;
}
declare abstract class Statement {
    modifiers: StmtModifier;
    sourceSpan: ParseSourceSpan$1 | null;
    leadingComments?: LeadingComment[] | undefined;
    constructor(modifiers?: StmtModifier, sourceSpan?: ParseSourceSpan$1 | null, leadingComments?: LeadingComment[] | undefined);
    /**
     * Calculates whether this statement produces the same value as the given statement.
     * Note: We don't check Types nor ParseSourceSpans nor function arguments.
     */
    abstract isEquivalent(stmt: Statement): boolean;
    abstract visitStatement(visitor: StatementVisitor, context: any): any;
    hasModifier(modifier: StmtModifier): boolean;
    addLeadingComment(leadingComment: LeadingComment): void;
}
declare class DeclareVarStmt extends Statement {
    name: string;
    value?: Expression | undefined;
    type: Type$1 | null;
    constructor(name: string, value?: Expression | undefined, type?: Type$1 | null, modifiers?: StmtModifier, sourceSpan?: ParseSourceSpan$1 | null, leadingComments?: LeadingComment[]);
    isEquivalent(stmt: Statement): boolean;
    visitStatement(visitor: StatementVisitor, context: any): any;
}
declare class DeclareFunctionStmt extends Statement {
    name: string;
    params: FnParam[];
    statements: Statement[];
    type: Type$1 | null;
    constructor(name: string, params: FnParam[], statements: Statement[], type?: Type$1 | null, modifiers?: StmtModifier, sourceSpan?: ParseSourceSpan$1 | null, leadingComments?: LeadingComment[]);
    isEquivalent(stmt: Statement): boolean;
    visitStatement(visitor: StatementVisitor, context: any): any;
}
declare class ExpressionStatement extends Statement {
    expr: Expression;
    constructor(expr: Expression, sourceSpan?: ParseSourceSpan$1 | null, leadingComments?: LeadingComment[]);
    isEquivalent(stmt: Statement): boolean;
    visitStatement(visitor: StatementVisitor, context: any): any;
}
declare class ReturnStatement extends Statement {
    value: Expression;
    constructor(value: Expression, sourceSpan?: ParseSourceSpan$1 | null, leadingComments?: LeadingComment[]);
    isEquivalent(stmt: Statement): boolean;
    visitStatement(visitor: StatementVisitor, context: any): any;
}
declare class IfStmt extends Statement {
    condition: Expression;
    trueCase: Statement[];
    falseCase: Statement[];
    constructor(condition: Expression, trueCase: Statement[], falseCase?: Statement[], sourceSpan?: ParseSourceSpan$1 | null, leadingComments?: LeadingComment[]);
    isEquivalent(stmt: Statement): boolean;
    visitStatement(visitor: StatementVisitor, context: any): any;
}
interface StatementVisitor {
    visitDeclareVarStmt(stmt: DeclareVarStmt, context: any): any;
    visitDeclareFunctionStmt(stmt: DeclareFunctionStmt, context: any): any;
    visitExpressionStmt(stmt: ExpressionStatement, context: any): any;
    visitReturnStmt(stmt: ReturnStatement, context: any): any;
    visitIfStmt(stmt: IfStmt, context: any): any;
}
declare class RecursiveAstVisitor$1 implements StatementVisitor, ExpressionVisitor {
    visitType(ast: Type$1, context: any): any;
    visitExpression(ast: Expression, context: any): any;
    visitBuiltinType(type: BuiltinType, context: any): any;
    visitExpressionType(type: ExpressionType, context: any): any;
    visitArrayType(type: ArrayType, context: any): any;
    visitMapType(type: MapType, context: any): any;
    visitTransplantedType(type: TransplantedType<unknown>, context: any): any;
    visitWrappedNodeExpr(ast: WrappedNodeExpr<any>, context: any): any;
    visitReadVarExpr(ast: ReadVarExpr, context: any): any;
    visitWriteVarExpr(ast: WriteVarExpr, context: any): any;
    visitWriteKeyExpr(ast: WriteKeyExpr, context: any): any;
    visitWritePropExpr(ast: WritePropExpr, context: any): any;
    visitDynamicImportExpr(ast: DynamicImportExpr, context: any): any;
    visitInvokeFunctionExpr(ast: InvokeFunctionExpr, context: any): any;
    visitTaggedTemplateLiteralExpr(ast: TaggedTemplateLiteralExpr, context: any): any;
    visitInstantiateExpr(ast: InstantiateExpr, context: any): any;
    visitLiteralExpr(ast: LiteralExpr, context: any): any;
    visitLocalizedString(ast: LocalizedString, context: any): any;
    visitExternalExpr(ast: ExternalExpr, context: any): any;
    visitConditionalExpr(ast: ConditionalExpr, context: any): any;
    visitNotExpr(ast: NotExpr, context: any): any;
    visitFunctionExpr(ast: FunctionExpr, context: any): any;
    visitArrowFunctionExpr(ast: ArrowFunctionExpr, context: any): any;
    visitUnaryOperatorExpr(ast: UnaryOperatorExpr, context: any): any;
    visitTypeofExpr(ast: TypeofExpr, context: any): any;
    visitVoidExpr(ast: VoidExpr, context: any): any;
    visitBinaryOperatorExpr(ast: BinaryOperatorExpr, context: any): any;
    visitReadPropExpr(ast: ReadPropExpr, context: any): any;
    visitReadKeyExpr(ast: ReadKeyExpr, context: any): any;
    visitLiteralArrayExpr(ast: LiteralArrayExpr, context: any): any;
    visitLiteralMapExpr(ast: LiteralMapExpr, context: any): any;
    visitCommaExpr(ast: CommaExpr, context: any): any;
    visitTemplateLiteralExpr(ast: TemplateLiteralExpr, context: any): any;
    visitTemplateLiteralElementExpr(ast: TemplateLiteralElementExpr, context: any): any;
    visitParenthesizedExpr(ast: ParenthesizedExpr, context: any): any;
    visitAllExpressions(exprs: Expression[], context: any): void;
    visitDeclareVarStmt(stmt: DeclareVarStmt, context: any): any;
    visitDeclareFunctionStmt(stmt: DeclareFunctionStmt, context: any): any;
    visitExpressionStmt(stmt: ExpressionStatement, context: any): any;
    visitReturnStmt(stmt: ReturnStatement, context: any): any;
    visitIfStmt(stmt: IfStmt, context: any): any;
    visitAllStatements(stmts: Statement[], context: any): void;
}
declare function leadingComment(text: string, multiline?: boolean, trailingNewline?: boolean): LeadingComment;
declare function jsDocComment(tags?: JSDocTag[]): JSDocComment;
declare function variable(name: string, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null): ReadVarExpr;
declare function importExpr(id: ExternalReference, typeParams?: Type$1[] | null, sourceSpan?: ParseSourceSpan$1 | null): ExternalExpr;
declare function importType(id: ExternalReference, typeParams?: Type$1[] | null, typeModifiers?: TypeModifier): ExpressionType | null;
declare function expressionType(expr: Expression, typeModifiers?: TypeModifier, typeParams?: Type$1[] | null): ExpressionType;
declare function transplantedType<T>(type: T, typeModifiers?: TypeModifier): TransplantedType<T>;
declare function typeofExpr(expr: Expression): TypeofExpr;
declare function literalArr(values: Expression[], type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null): LiteralArrayExpr;
declare function literalMap(values: {
    key: string;
    quoted: boolean;
    value: Expression;
}[], type?: MapType | null): LiteralMapExpr;
declare function unary(operator: UnaryOperator, expr: Expression, type?: Type$1, sourceSpan?: ParseSourceSpan$1 | null): UnaryOperatorExpr;
declare function not(expr: Expression, sourceSpan?: ParseSourceSpan$1 | null): NotExpr;
declare function fn(params: FnParam[], body: Statement[], type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null, name?: string | null): FunctionExpr;
declare function arrowFn(params: FnParam[], body: Expression | Statement[], type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null): ArrowFunctionExpr;
declare function ifStmt(condition: Expression, thenClause: Statement[], elseClause?: Statement[], sourceSpan?: ParseSourceSpan$1, leadingComments?: LeadingComment[]): IfStmt;
declare function taggedTemplate(tag: Expression, template: TemplateLiteralExpr, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null): TaggedTemplateLiteralExpr;
declare function literal(value: any, type?: Type$1 | null, sourceSpan?: ParseSourceSpan$1 | null): LiteralExpr;
declare function localizedString(metaBlock: I18nMeta, messageParts: LiteralPiece[], placeholderNames: PlaceholderPiece[], expressions: Expression[], sourceSpan?: ParseSourceSpan$1 | null): LocalizedString;
declare function isNull(exp: Expression): boolean;
declare const enum JSDocTagName {
    Desc = "desc",
    Id = "id",
    Meaning = "meaning",
    Suppress = "suppress"
}
type JSDocTag = {
    tagName: JSDocTagName | string;
    text?: string;
} | {
    tagName?: undefined;
    text: string;
};

type output_ast_d_ArrayType = ArrayType;
declare const output_ast_d_ArrayType: typeof ArrayType;
type output_ast_d_ArrowFunctionExpr = ArrowFunctionExpr;
declare const output_ast_d_ArrowFunctionExpr: typeof ArrowFunctionExpr;
declare const output_ast_d_BOOL_TYPE: typeof BOOL_TYPE;
type output_ast_d_BinaryOperator = BinaryOperator;
declare const output_ast_d_BinaryOperator: typeof BinaryOperator;
type output_ast_d_BinaryOperatorExpr = BinaryOperatorExpr;
declare const output_ast_d_BinaryOperatorExpr: typeof BinaryOperatorExpr;
type output_ast_d_BuiltinType = BuiltinType;
declare const output_ast_d_BuiltinType: typeof BuiltinType;
type output_ast_d_BuiltinTypeName = BuiltinTypeName;
declare const output_ast_d_BuiltinTypeName: typeof BuiltinTypeName;
type output_ast_d_CommaExpr = CommaExpr;
declare const output_ast_d_CommaExpr: typeof CommaExpr;
type output_ast_d_ConditionalExpr = ConditionalExpr;
declare const output_ast_d_ConditionalExpr: typeof ConditionalExpr;
type output_ast_d_CookedRawString = CookedRawString;
declare const output_ast_d_DYNAMIC_TYPE: typeof DYNAMIC_TYPE;
type output_ast_d_DeclareFunctionStmt = DeclareFunctionStmt;
declare const output_ast_d_DeclareFunctionStmt: typeof DeclareFunctionStmt;
type output_ast_d_DeclareVarStmt = DeclareVarStmt;
declare const output_ast_d_DeclareVarStmt: typeof DeclareVarStmt;
type output_ast_d_DynamicImportExpr = DynamicImportExpr;
declare const output_ast_d_DynamicImportExpr: typeof DynamicImportExpr;
type output_ast_d_Expression = Expression;
declare const output_ast_d_Expression: typeof Expression;
type output_ast_d_ExpressionStatement = ExpressionStatement;
declare const output_ast_d_ExpressionStatement: typeof ExpressionStatement;
type output_ast_d_ExpressionType = ExpressionType;
declare const output_ast_d_ExpressionType: typeof ExpressionType;
type output_ast_d_ExpressionVisitor = ExpressionVisitor;
type output_ast_d_ExternalExpr = ExternalExpr;
declare const output_ast_d_ExternalExpr: typeof ExternalExpr;
type output_ast_d_ExternalReference = ExternalReference;
declare const output_ast_d_ExternalReference: typeof ExternalReference;
declare const output_ast_d_FUNCTION_TYPE: typeof FUNCTION_TYPE;
type output_ast_d_FnParam = FnParam;
declare const output_ast_d_FnParam: typeof FnParam;
type output_ast_d_FunctionExpr = FunctionExpr;
declare const output_ast_d_FunctionExpr: typeof FunctionExpr;
declare const output_ast_d_INFERRED_TYPE: typeof INFERRED_TYPE;
declare const output_ast_d_INT_TYPE: typeof INT_TYPE;
type output_ast_d_IfStmt = IfStmt;
declare const output_ast_d_IfStmt: typeof IfStmt;
type output_ast_d_InstantiateExpr = InstantiateExpr;
declare const output_ast_d_InstantiateExpr: typeof InstantiateExpr;
type output_ast_d_InvokeFunctionExpr = InvokeFunctionExpr;
declare const output_ast_d_InvokeFunctionExpr: typeof InvokeFunctionExpr;
type output_ast_d_JSDocComment = JSDocComment;
declare const output_ast_d_JSDocComment: typeof JSDocComment;
type output_ast_d_JSDocTag = JSDocTag;
type output_ast_d_JSDocTagName = JSDocTagName;
declare const output_ast_d_JSDocTagName: typeof JSDocTagName;
type output_ast_d_LeadingComment = LeadingComment;
declare const output_ast_d_LeadingComment: typeof LeadingComment;
type output_ast_d_LiteralArrayExpr = LiteralArrayExpr;
declare const output_ast_d_LiteralArrayExpr: typeof LiteralArrayExpr;
type output_ast_d_LiteralExpr = LiteralExpr;
declare const output_ast_d_LiteralExpr: typeof LiteralExpr;
type output_ast_d_LiteralMapEntry = LiteralMapEntry;
declare const output_ast_d_LiteralMapEntry: typeof LiteralMapEntry;
type output_ast_d_LiteralMapExpr = LiteralMapExpr;
declare const output_ast_d_LiteralMapExpr: typeof LiteralMapExpr;
type output_ast_d_LiteralPiece = LiteralPiece;
declare const output_ast_d_LiteralPiece: typeof LiteralPiece;
type output_ast_d_LocalizedString = LocalizedString;
declare const output_ast_d_LocalizedString: typeof LocalizedString;
type output_ast_d_MapType = MapType;
declare const output_ast_d_MapType: typeof MapType;
type output_ast_d_MessagePiece = MessagePiece;
declare const output_ast_d_NONE_TYPE: typeof NONE_TYPE;
declare const output_ast_d_NULL_EXPR: typeof NULL_EXPR;
declare const output_ast_d_NUMBER_TYPE: typeof NUMBER_TYPE;
type output_ast_d_NotExpr = NotExpr;
declare const output_ast_d_NotExpr: typeof NotExpr;
type output_ast_d_ParenthesizedExpr = ParenthesizedExpr;
declare const output_ast_d_ParenthesizedExpr: typeof ParenthesizedExpr;
type output_ast_d_PlaceholderPiece = PlaceholderPiece;
declare const output_ast_d_PlaceholderPiece: typeof PlaceholderPiece;
type output_ast_d_ReadKeyExpr = ReadKeyExpr;
declare const output_ast_d_ReadKeyExpr: typeof ReadKeyExpr;
type output_ast_d_ReadPropExpr = ReadPropExpr;
declare const output_ast_d_ReadPropExpr: typeof ReadPropExpr;
type output_ast_d_ReadVarExpr = ReadVarExpr;
declare const output_ast_d_ReadVarExpr: typeof ReadVarExpr;
type output_ast_d_ReturnStatement = ReturnStatement;
declare const output_ast_d_ReturnStatement: typeof ReturnStatement;
declare const output_ast_d_STRING_TYPE: typeof STRING_TYPE;
type output_ast_d_Statement = Statement;
declare const output_ast_d_Statement: typeof Statement;
type output_ast_d_StatementVisitor = StatementVisitor;
type output_ast_d_StmtModifier = StmtModifier;
declare const output_ast_d_StmtModifier: typeof StmtModifier;
declare const output_ast_d_TYPED_NULL_EXPR: typeof TYPED_NULL_EXPR;
type output_ast_d_TaggedTemplateLiteralExpr = TaggedTemplateLiteralExpr;
declare const output_ast_d_TaggedTemplateLiteralExpr: typeof TaggedTemplateLiteralExpr;
type output_ast_d_TemplateLiteralElementExpr = TemplateLiteralElementExpr;
declare const output_ast_d_TemplateLiteralElementExpr: typeof TemplateLiteralElementExpr;
type output_ast_d_TemplateLiteralExpr = TemplateLiteralExpr;
declare const output_ast_d_TemplateLiteralExpr: typeof TemplateLiteralExpr;
type output_ast_d_TransplantedType<T> = TransplantedType<T>;
declare const output_ast_d_TransplantedType: typeof TransplantedType;
type output_ast_d_TypeModifier = TypeModifier;
declare const output_ast_d_TypeModifier: typeof TypeModifier;
type output_ast_d_TypeVisitor = TypeVisitor;
type output_ast_d_TypeofExpr = TypeofExpr;
declare const output_ast_d_TypeofExpr: typeof TypeofExpr;
type output_ast_d_UnaryOperator = UnaryOperator;
declare const output_ast_d_UnaryOperator: typeof UnaryOperator;
type output_ast_d_UnaryOperatorExpr = UnaryOperatorExpr;
declare const output_ast_d_UnaryOperatorExpr: typeof UnaryOperatorExpr;
type output_ast_d_VoidExpr = VoidExpr;
declare const output_ast_d_VoidExpr: typeof VoidExpr;
type output_ast_d_WrappedNodeExpr<T> = WrappedNodeExpr<T>;
declare const output_ast_d_WrappedNodeExpr: typeof WrappedNodeExpr;
type output_ast_d_WriteKeyExpr = WriteKeyExpr;
declare const output_ast_d_WriteKeyExpr: typeof WriteKeyExpr;
type output_ast_d_WritePropExpr = WritePropExpr;
declare const output_ast_d_WritePropExpr: typeof WritePropExpr;
type output_ast_d_WriteVarExpr = WriteVarExpr;
declare const output_ast_d_WriteVarExpr: typeof WriteVarExpr;
declare const output_ast_d_areAllEquivalent: typeof areAllEquivalent;
declare const output_ast_d_arrowFn: typeof arrowFn;
declare const output_ast_d_expressionType: typeof expressionType;
declare const output_ast_d_fn: typeof fn;
declare const output_ast_d_ifStmt: typeof ifStmt;
declare const output_ast_d_importExpr: typeof importExpr;
declare const output_ast_d_importType: typeof importType;
declare const output_ast_d_isNull: typeof isNull;
declare const output_ast_d_jsDocComment: typeof jsDocComment;
declare const output_ast_d_leadingComment: typeof leadingComment;
declare const output_ast_d_literal: typeof literal;
declare const output_ast_d_literalArr: typeof literalArr;
declare const output_ast_d_literalMap: typeof literalMap;
declare const output_ast_d_localizedString: typeof localizedString;
declare const output_ast_d_not: typeof not;
declare const output_ast_d_nullSafeIsEquivalent: typeof nullSafeIsEquivalent;
declare const output_ast_d_taggedTemplate: typeof taggedTemplate;
declare const output_ast_d_transplantedType: typeof transplantedType;
declare const output_ast_d_typeofExpr: typeof typeofExpr;
declare const output_ast_d_unary: typeof unary;
declare const output_ast_d_variable: typeof variable;
declare namespace output_ast_d {
  export { output_ast_d_ArrayType as ArrayType, output_ast_d_ArrowFunctionExpr as ArrowFunctionExpr, output_ast_d_BOOL_TYPE as BOOL_TYPE, output_ast_d_BinaryOperator as BinaryOperator, output_ast_d_BinaryOperatorExpr as BinaryOperatorExpr, output_ast_d_BuiltinType as BuiltinType, output_ast_d_BuiltinTypeName as BuiltinTypeName, output_ast_d_CommaExpr as CommaExpr, output_ast_d_ConditionalExpr as ConditionalExpr, output_ast_d_DYNAMIC_TYPE as DYNAMIC_TYPE, output_ast_d_DeclareFunctionStmt as DeclareFunctionStmt, output_ast_d_DeclareVarStmt as DeclareVarStmt, output_ast_d_DynamicImportExpr as DynamicImportExpr, output_ast_d_Expression as Expression, output_ast_d_ExpressionStatement as ExpressionStatement, output_ast_d_ExpressionType as ExpressionType, output_ast_d_ExternalExpr as ExternalExpr, output_ast_d_ExternalReference as ExternalReference, output_ast_d_FUNCTION_TYPE as FUNCTION_TYPE, output_ast_d_FnParam as FnParam, output_ast_d_FunctionExpr as FunctionExpr, output_ast_d_INFERRED_TYPE as INFERRED_TYPE, output_ast_d_INT_TYPE as INT_TYPE, output_ast_d_IfStmt as IfStmt, output_ast_d_InstantiateExpr as InstantiateExpr, output_ast_d_InvokeFunctionExpr as InvokeFunctionExpr, output_ast_d_JSDocComment as JSDocComment, output_ast_d_JSDocTagName as JSDocTagName, output_ast_d_LeadingComment as LeadingComment, output_ast_d_LiteralArrayExpr as LiteralArrayExpr, output_ast_d_LiteralExpr as LiteralExpr, output_ast_d_LiteralMapEntry as LiteralMapEntry, output_ast_d_LiteralMapExpr as LiteralMapExpr, output_ast_d_LiteralPiece as LiteralPiece, output_ast_d_LocalizedString as LocalizedString, output_ast_d_MapType as MapType, output_ast_d_NONE_TYPE as NONE_TYPE, output_ast_d_NULL_EXPR as NULL_EXPR, output_ast_d_NUMBER_TYPE as NUMBER_TYPE, output_ast_d_NotExpr as NotExpr, output_ast_d_ParenthesizedExpr as ParenthesizedExpr, output_ast_d_PlaceholderPiece as PlaceholderPiece, output_ast_d_ReadKeyExpr as ReadKeyExpr, output_ast_d_ReadPropExpr as ReadPropExpr, output_ast_d_ReadVarExpr as ReadVarExpr, RecursiveAstVisitor$1 as RecursiveAstVisitor, output_ast_d_ReturnStatement as ReturnStatement, output_ast_d_STRING_TYPE as STRING_TYPE, output_ast_d_Statement as Statement, output_ast_d_StmtModifier as StmtModifier, output_ast_d_TYPED_NULL_EXPR as TYPED_NULL_EXPR, output_ast_d_TaggedTemplateLiteralExpr as TaggedTemplateLiteralExpr, output_ast_d_TemplateLiteralElementExpr as TemplateLiteralElementExpr, output_ast_d_TemplateLiteralExpr as TemplateLiteralExpr, output_ast_d_TransplantedType as TransplantedType, Type$1 as Type, output_ast_d_TypeModifier as TypeModifier, output_ast_d_TypeofExpr as TypeofExpr, output_ast_d_UnaryOperator as UnaryOperator, output_ast_d_UnaryOperatorExpr as UnaryOperatorExpr, output_ast_d_VoidExpr as VoidExpr, output_ast_d_WrappedNodeExpr as WrappedNodeExpr, output_ast_d_WriteKeyExpr as WriteKeyExpr, output_ast_d_WritePropExpr as WritePropExpr, output_ast_d_WriteVarExpr as WriteVarExpr, output_ast_d_areAllEquivalent as areAllEquivalent, output_ast_d_arrowFn as arrowFn, output_ast_d_expressionType as expressionType, output_ast_d_fn as fn, output_ast_d_ifStmt as ifStmt, output_ast_d_importExpr as importExpr, output_ast_d_importType as importType, output_ast_d_isNull as isNull, output_ast_d_jsDocComment as jsDocComment, output_ast_d_leadingComment as leadingComment, output_ast_d_literal as literal, output_ast_d_literalArr as literalArr, output_ast_d_literalMap as literalMap, output_ast_d_localizedString as localizedString, output_ast_d_not as not, output_ast_d_nullSafeIsEquivalent as nullSafeIsEquivalent, output_ast_d_taggedTemplate as taggedTemplate, output_ast_d_transplantedType as transplantedType, output_ast_d_typeofExpr as typeofExpr, output_ast_d_unary as unary, output_ast_d_variable as variable };
  export type { output_ast_d_CookedRawString as CookedRawString, output_ast_d_ExpressionVisitor as ExpressionVisitor, output_ast_d_JSDocTag as JSDocTag, output_ast_d_MessagePiece as MessagePiece, output_ast_d_StatementVisitor as StatementVisitor, output_ast_d_TypeVisitor as TypeVisitor };
}

declare function SECURITY_SCHEMA(): {
    [k: string]: SecurityContext;
};

declare class CompilerConfig {
    defaultEncapsulation: ViewEncapsulation$1 | null;
    preserveWhitespaces: boolean;
    strictInjectionParameters: boolean;
    constructor({ defaultEncapsulation, preserveWhitespaces, strictInjectionParameters, }?: {
        defaultEncapsulation?: ViewEncapsulation$1;
        preserveWhitespaces?: boolean;
        strictInjectionParameters?: boolean;
    });
}
declare function preserveWhitespacesDefault(preserveWhitespacesOption: boolean | null, defaultSetting?: boolean): boolean;

/**
 * A constant pool allows a code emitter to share constant in an output context.
 *
 * The constant pool also supports sharing access to ivy definitions references.
 */
declare class ConstantPool {
    private readonly isClosureCompilerEnabled;
    statements: Statement[];
    private literals;
    private literalFactories;
    private sharedConstants;
    /**
     * Constant pool also tracks claimed names from {@link uniqueName}.
     * This is useful to avoid collisions if variables are intended to be
     * named a certain way- but may conflict. We wouldn't want to always suffix
     * them with unique numbers.
     */
    private _claimedNames;
    private nextNameIndex;
    constructor(isClosureCompilerEnabled?: boolean);
    getConstLiteral(literal: Expression, forceShared?: boolean): Expression;
    getSharedConstant(def: SharedConstantDefinition, expr: Expression): Expression;
    getLiteralFactory(literal: LiteralArrayExpr | LiteralMapExpr): {
        literalFactory: Expression;
        literalFactoryArguments: Expression[];
    };
    getSharedFunctionReference(fn: Expression, prefix: string, useUniqueName?: boolean): Expression;
    private _getLiteralFactory;
    /**
     * Produce a unique name in the context of this pool.
     *
     * The name might be unique among different prefixes if any of the prefixes end in
     * a digit so the prefix should be a constant string (not based on user input) and
     * must not end in a digit.
     */
    uniqueName(name: string, alwaysIncludeSuffix?: boolean): string;
    private freshName;
}
interface ExpressionKeyFn {
    keyOf(expr: Expression): string;
}
interface SharedConstantDefinition extends ExpressionKeyFn {
    toSharedConstantDeclaration(declName: string, keyExpr: Expression): Statement;
}

declare class ParserError {
    input: string;
    errLocation: string;
    ctxLocation?: any | undefined;
    message: string;
    constructor(message: string, input: string, errLocation: string, ctxLocation?: any | undefined);
}
declare class ParseSpan {
    start: number;
    end: number;
    constructor(start: number, end: number);
    toAbsolute(absoluteOffset: number): AbsoluteSourceSpan;
}
declare abstract class AST {
    span: ParseSpan;
    /**
     * Absolute location of the expression AST in a source code file.
     */
    sourceSpan: AbsoluteSourceSpan;
    constructor(span: ParseSpan, 
    /**
     * Absolute location of the expression AST in a source code file.
     */
    sourceSpan: AbsoluteSourceSpan);
    abstract visit(visitor: AstVisitor, context?: any): any;
    toString(): string;
}
declare abstract class ASTWithName extends AST {
    nameSpan: AbsoluteSourceSpan;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, nameSpan: AbsoluteSourceSpan);
}
declare class EmptyExpr extends AST {
    visit(visitor: AstVisitor, context?: any): void;
}
declare class ImplicitReceiver extends AST {
    visit(visitor: AstVisitor, context?: any): any;
}
/**
 * Receiver when something is accessed through `this` (e.g. `this.foo`). Note that this class
 * inherits from `ImplicitReceiver`, because accessing something through `this` is treated the
 * same as accessing it implicitly inside of an Angular template (e.g. `[attr.title]="this.title"`
 * is the same as `[attr.title]="title"`.). Inheriting allows for the `this` accesses to be treated
 * the same as implicit ones, except for a couple of exceptions like `$event` and `$any`.
 * TODO: we should find a way for this class not to extend from `ImplicitReceiver` in the future.
 */
declare class ThisReceiver extends ImplicitReceiver {
    visit(visitor: AstVisitor, context?: any): any;
}
/**
 * Multiple expressions separated by a semicolon.
 */
declare class Chain extends AST {
    expressions: any[];
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, expressions: any[]);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class Conditional extends AST {
    condition: AST;
    trueExp: AST;
    falseExp: AST;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, condition: AST, trueExp: AST, falseExp: AST);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class PropertyRead extends ASTWithName {
    receiver: AST;
    name: string;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, nameSpan: AbsoluteSourceSpan, receiver: AST, name: string);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class PropertyWrite extends ASTWithName {
    receiver: AST;
    name: string;
    value: AST;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, nameSpan: AbsoluteSourceSpan, receiver: AST, name: string, value: AST);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class SafePropertyRead extends ASTWithName {
    receiver: AST;
    name: string;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, nameSpan: AbsoluteSourceSpan, receiver: AST, name: string);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class KeyedRead extends AST {
    receiver: AST;
    key: AST;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, receiver: AST, key: AST);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class SafeKeyedRead extends AST {
    receiver: AST;
    key: AST;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, receiver: AST, key: AST);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class KeyedWrite extends AST {
    receiver: AST;
    key: AST;
    value: AST;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, receiver: AST, key: AST, value: AST);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class BindingPipe extends ASTWithName {
    exp: AST;
    name: string;
    args: any[];
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, exp: AST, name: string, args: any[], nameSpan: AbsoluteSourceSpan);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class LiteralPrimitive extends AST {
    value: any;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, value: any);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class LiteralArray extends AST {
    expressions: any[];
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, expressions: any[]);
    visit(visitor: AstVisitor, context?: any): any;
}
type LiteralMapKey = {
    key: string;
    quoted: boolean;
    isShorthandInitialized?: boolean;
};
declare class LiteralMap extends AST {
    keys: LiteralMapKey[];
    values: any[];
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, keys: LiteralMapKey[], values: any[]);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class Interpolation extends AST {
    strings: string[];
    expressions: AST[];
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, strings: string[], expressions: AST[]);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class Binary extends AST {
    operation: string;
    left: AST;
    right: AST;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, operation: string, left: AST, right: AST);
    visit(visitor: AstVisitor, context?: any): any;
}
/**
 * For backwards compatibility reasons, `Unary` inherits from `Binary` and mimics the binary AST
 * node that was originally used. This inheritance relation can be deleted in some future major,
 * after consumers have been given a chance to fully support Unary.
 */
declare class Unary extends Binary {
    operator: string;
    expr: AST;
    left: never;
    right: never;
    operation: never;
    /**
     * Creates a unary minus expression "-x", represented as `Binary` using "0 - x".
     */
    static createMinus(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, expr: AST): Unary;
    /**
     * Creates a unary plus expression "+x", represented as `Binary` using "x - 0".
     */
    static createPlus(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, expr: AST): Unary;
    /**
     * During the deprecation period this constructor is private, to avoid consumers from creating
     * a `Unary` with the fallback properties for `Binary`.
     */
    private constructor();
    visit(visitor: AstVisitor, context?: any): any;
}
declare class PrefixNot extends AST {
    expression: AST;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, expression: AST);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class TypeofExpression extends AST {
    expression: AST;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, expression: AST);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class VoidExpression extends AST {
    expression: AST;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, expression: AST);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class NonNullAssert extends AST {
    expression: AST;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, expression: AST);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class Call extends AST {
    receiver: AST;
    args: AST[];
    argumentSpan: AbsoluteSourceSpan;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, receiver: AST, args: AST[], argumentSpan: AbsoluteSourceSpan);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class SafeCall extends AST {
    receiver: AST;
    args: AST[];
    argumentSpan: AbsoluteSourceSpan;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, receiver: AST, args: AST[], argumentSpan: AbsoluteSourceSpan);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class TaggedTemplateLiteral extends AST {
    tag: AST;
    template: TemplateLiteral;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, tag: AST, template: TemplateLiteral);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class TemplateLiteral extends AST {
    elements: TemplateLiteralElement[];
    expressions: AST[];
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, elements: TemplateLiteralElement[], expressions: AST[]);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class TemplateLiteralElement extends AST {
    text: string;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, text: string);
    visit(visitor: AstVisitor, context?: any): any;
}
declare class ParenthesizedExpression extends AST {
    expression: AST;
    constructor(span: ParseSpan, sourceSpan: AbsoluteSourceSpan, expression: AST);
    visit(visitor: AstVisitor, context?: any): any;
}
/**
 * Records the absolute position of a text span in a source file, where `start` and `end` are the
 * starting and ending byte offsets, respectively, of the text span in a source file.
 */
declare class AbsoluteSourceSpan {
    readonly start: number;
    readonly end: number;
    constructor(start: number, end: number);
}
declare class ASTWithSource<T extends AST = AST> extends AST {
    ast: T;
    source: string | null;
    location: string;
    errors: ParserError[];
    constructor(ast: T, source: string | null, location: string, absoluteOffset: number, errors: ParserError[]);
    visit(visitor: AstVisitor, context?: any): any;
    toString(): string;
}
/**
 * TemplateBinding refers to a particular key-value pair in a microsyntax
 * expression. A few examples are:
 *
 *   |---------------------|--------------|---------|--------------|
 *   |     expression      |     key      |  value  | binding type |
 *   |---------------------|--------------|---------|--------------|
 *   | 1. let item         |    item      |  null   |   variable   |
 *   | 2. of items         |   ngForOf    |  items  |  expression  |
 *   | 3. let x = y        |      x       |    y    |   variable   |
 *   | 4. index as i       |      i       |  index  |   variable   |
 *   | 5. trackBy: func    | ngForTrackBy |   func  |  expression  |
 *   | 6. *ngIf="cond"     |     ngIf     |   cond  |  expression  |
 *   |---------------------|--------------|---------|--------------|
 *
 * (6) is a notable exception because it is a binding from the template key in
 * the LHS of a HTML attribute to the expression in the RHS. All other bindings
 * in the example above are derived solely from the RHS.
 */
type TemplateBinding = VariableBinding | ExpressionBinding;
declare class VariableBinding {
    readonly sourceSpan: AbsoluteSourceSpan;
    readonly key: TemplateBindingIdentifier;
    readonly value: TemplateBindingIdentifier | null;
    /**
     * @param sourceSpan entire span of the binding.
     * @param key name of the LHS along with its span.
     * @param value optional value for the RHS along with its span.
     */
    constructor(sourceSpan: AbsoluteSourceSpan, key: TemplateBindingIdentifier, value: TemplateBindingIdentifier | null);
}
declare class ExpressionBinding {
    readonly sourceSpan: AbsoluteSourceSpan;
    readonly key: TemplateBindingIdentifier;
    readonly value: ASTWithSource | null;
    /**
     * @param sourceSpan entire span of the binding.
     * @param key binding name, like ngForOf, ngForTrackBy, ngIf, along with its
     * span. Note that the length of the span may not be the same as
     * `key.source.length`. For example,
     * 1. key.source = ngFor, key.span is for "ngFor"
     * 2. key.source = ngForOf, key.span is for "of"
     * 3. key.source = ngForTrackBy, key.span is for "trackBy"
     * @param value optional expression for the RHS.
     */
    constructor(sourceSpan: AbsoluteSourceSpan, key: TemplateBindingIdentifier, value: ASTWithSource | null);
}
interface TemplateBindingIdentifier {
    source: string;
    span: AbsoluteSourceSpan;
}
interface AstVisitor {
    /**
     * The `visitUnary` method is declared as optional for backwards compatibility. In an upcoming
     * major release, this method will be made required.
     */
    visitUnary?(ast: Unary, context: any): any;
    visitBinary(ast: Binary, context: any): any;
    visitChain(ast: Chain, context: any): any;
    visitConditional(ast: Conditional, context: any): any;
    /**
     * The `visitThisReceiver` method is declared as optional for backwards compatibility.
     * In an upcoming major release, this method will be made required.
     */
    visitThisReceiver?(ast: ThisReceiver, context: any): any;
    visitImplicitReceiver(ast: ImplicitReceiver, context: any): any;
    visitInterpolation(ast: Interpolation, context: any): any;
    visitKeyedRead(ast: KeyedRead, context: any): any;
    visitKeyedWrite(ast: KeyedWrite, context: any): any;
    visitLiteralArray(ast: LiteralArray, context: any): any;
    visitLiteralMap(ast: LiteralMap, context: any): any;
    visitLiteralPrimitive(ast: LiteralPrimitive, context: any): any;
    visitPipe(ast: BindingPipe, context: any): any;
    visitPrefixNot(ast: PrefixNot, context: any): any;
    visitTypeofExpression(ast: TypeofExpression, context: any): any;
    visitVoidExpression(ast: TypeofExpression, context: any): any;
    visitNonNullAssert(ast: NonNullAssert, context: any): any;
    visitPropertyRead(ast: PropertyRead, context: any): any;
    visitPropertyWrite(ast: PropertyWrite, context: any): any;
    visitSafePropertyRead(ast: SafePropertyRead, context: any): any;
    visitSafeKeyedRead(ast: SafeKeyedRead, context: any): any;
    visitCall(ast: Call, context: any): any;
    visitSafeCall(ast: SafeCall, context: any): any;
    visitTemplateLiteral(ast: TemplateLiteral, context: any): any;
    visitTemplateLiteralElement(ast: TemplateLiteralElement, context: any): any;
    visitTaggedTemplateLiteral(ast: TaggedTemplateLiteral, context: any): any;
    visitParenthesizedExpression(ast: ParenthesizedExpression, context: any): any;
    visitASTWithSource?(ast: ASTWithSource, context: any): any;
    /**
     * This function is optionally defined to allow classes that implement this
     * interface to selectively decide if the specified `ast` should be visited.
     * @param ast node to visit
     * @param context context that gets passed to the node and all its children
     */
    visit?(ast: AST, context?: any): any;
}
declare class RecursiveAstVisitor implements AstVisitor {
    visit(ast: AST, context?: any): any;
    visitUnary(ast: Unary, context: any): any;
    visitBinary(ast: Binary, context: any): any;
    visitChain(ast: Chain, context: any): any;
    visitConditional(ast: Conditional, context: any): any;
    visitPipe(ast: BindingPipe, context: any): any;
    visitImplicitReceiver(ast: ThisReceiver, context: any): any;
    visitThisReceiver(ast: ThisReceiver, context: any): any;
    visitInterpolation(ast: Interpolation, context: any): any;
    visitKeyedRead(ast: KeyedRead, context: any): any;
    visitKeyedWrite(ast: KeyedWrite, context: any): any;
    visitLiteralArray(ast: LiteralArray, context: any): any;
    visitLiteralMap(ast: LiteralMap, context: any): any;
    visitLiteralPrimitive(ast: LiteralPrimitive, context: any): any;
    visitPrefixNot(ast: PrefixNot, context: any): any;
    visitTypeofExpression(ast: TypeofExpression, context: any): void;
    visitVoidExpression(ast: VoidExpression, context: any): void;
    visitNonNullAssert(ast: NonNullAssert, context: any): any;
    visitPropertyRead(ast: PropertyRead, context: any): any;
    visitPropertyWrite(ast: PropertyWrite, context: any): any;
    visitSafePropertyRead(ast: SafePropertyRead, context: any): any;
    visitSafeKeyedRead(ast: SafeKeyedRead, context: any): any;
    visitCall(ast: Call, context: any): any;
    visitSafeCall(ast: SafeCall, context: any): any;
    visitTemplateLiteral(ast: TemplateLiteral, context: any): void;
    visitTemplateLiteralElement(ast: TemplateLiteralElement, context: any): void;
    visitTaggedTemplateLiteral(ast: TaggedTemplateLiteral, context: any): void;
    visitParenthesizedExpression(ast: ParenthesizedExpression, context: any): void;
    visitAll(asts: AST[], context: any): any;
}
declare class ParsedProperty {
    name: string;
    expression: ASTWithSource;
    type: ParsedPropertyType;
    sourceSpan: ParseSourceSpan$1;
    readonly keySpan: ParseSourceSpan$1;
    valueSpan: ParseSourceSpan$1 | undefined;
    readonly isLiteral: boolean;
    readonly isAnimation: boolean;
    constructor(name: string, expression: ASTWithSource, type: ParsedPropertyType, sourceSpan: ParseSourceSpan$1, keySpan: ParseSourceSpan$1, valueSpan: ParseSourceSpan$1 | undefined);
}
declare enum ParsedPropertyType {
    DEFAULT = 0,
    LITERAL_ATTR = 1,
    ANIMATION = 2,
    TWO_WAY = 3
}
declare enum ParsedEventType {
    Regular = 0,
    Animation = 1,
    TwoWay = 2
}
declare class ParsedEvent {
    name: string;
    targetOrPhase: string | null;
    type: ParsedEventType;
    handler: ASTWithSource;
    sourceSpan: ParseSourceSpan$1;
    handlerSpan: ParseSourceSpan$1;
    readonly keySpan: ParseSourceSpan$1;
    constructor(name: string, targetOrPhase: string | null, type: ParsedEventType.TwoWay, handler: ASTWithSource<NonNullAssert | PropertyRead | KeyedRead>, sourceSpan: ParseSourceSpan$1, handlerSpan: ParseSourceSpan$1, keySpan: ParseSourceSpan$1);
    constructor(name: string, targetOrPhase: string | null, type: ParsedEventType, handler: ASTWithSource, sourceSpan: ParseSourceSpan$1, handlerSpan: ParseSourceSpan$1, keySpan: ParseSourceSpan$1);
}
/**
 * ParsedVariable represents a variable declaration in a microsyntax expression.
 */
declare class ParsedVariable {
    readonly name: string;
    readonly value: string;
    readonly sourceSpan: ParseSourceSpan$1;
    readonly keySpan: ParseSourceSpan$1;
    readonly valueSpan?: ParseSourceSpan$1 | undefined;
    constructor(name: string, value: string, sourceSpan: ParseSourceSpan$1, keySpan: ParseSourceSpan$1, valueSpan?: ParseSourceSpan$1 | undefined);
}
declare enum BindingType {
    Property = 0,
    Attribute = 1,
    Class = 2,
    Style = 3,
    Animation = 4,
    TwoWay = 5
}
declare class BoundElementProperty {
    name: string;
    type: BindingType;
    securityContext: SecurityContext;
    value: ASTWithSource;
    unit: string | null;
    sourceSpan: ParseSourceSpan$1;
    readonly keySpan: ParseSourceSpan$1 | undefined;
    valueSpan: ParseSourceSpan$1 | undefined;
    constructor(name: string, type: BindingType, securityContext: SecurityContext, value: ASTWithSource, unit: string | null, sourceSpan: ParseSourceSpan$1, keySpan: ParseSourceSpan$1 | undefined, valueSpan: ParseSourceSpan$1 | undefined);
}

declare enum TokenType {
    Character = 0,
    Identifier = 1,
    PrivateIdentifier = 2,
    Keyword = 3,
    String = 4,
    Operator = 5,
    Number = 6,
    Error = 7
}
declare enum StringTokenKind {
    Plain = 0,
    TemplateLiteralPart = 1,
    TemplateLiteralEnd = 2
}
declare class Lexer {
    tokenize(text: string): Token[];
}
declare class Token {
    index: number;
    end: number;
    type: TokenType;
    numValue: number;
    strValue: string;
    constructor(index: number, end: number, type: TokenType, numValue: number, strValue: string);
    isCharacter(code: number): boolean;
    isNumber(): boolean;
    isString(): this is StringToken;
    isOperator(operator: string): boolean;
    isIdentifier(): boolean;
    isPrivateIdentifier(): boolean;
    isKeyword(): boolean;
    isKeywordLet(): boolean;
    isKeywordAs(): boolean;
    isKeywordNull(): boolean;
    isKeywordUndefined(): boolean;
    isKeywordTrue(): boolean;
    isKeywordFalse(): boolean;
    isKeywordThis(): boolean;
    isKeywordTypeof(): boolean;
    isKeywordVoid(): boolean;
    isKeywordIn(): boolean;
    isError(): boolean;
    toNumber(): number;
    isTemplateLiteralPart(): this is StringToken;
    isTemplateLiteralEnd(): this is StringToken;
    isTemplateLiteralInterpolationStart(): boolean;
    isTemplateLiteralInterpolationEnd(): boolean;
    toString(): string | null;
}
declare class StringToken extends Token {
    readonly kind: StringTokenKind;
    constructor(index: number, end: number, strValue: string, kind: StringTokenKind);
}
declare const EOF: Token;

interface InterpolationPiece {
    text: string;
    start: number;
    end: number;
}
declare class SplitInterpolation {
    strings: InterpolationPiece[];
    expressions: InterpolationPiece[];
    offsets: number[];
    constructor(strings: InterpolationPiece[], expressions: InterpolationPiece[], offsets: number[]);
}
declare class TemplateBindingParseResult {
    templateBindings: TemplateBinding[];
    warnings: string[];
    errors: ParserError[];
    constructor(templateBindings: TemplateBinding[], warnings: string[], errors: ParserError[]);
}
/**
 * Represents the possible parse modes to be used as a bitmask.
 */
declare const enum ParseFlags {
    None = 0,
    /**
     * Whether an output binding is being parsed.
     */
    Action = 1
}
declare class Parser {
    private _lexer;
    private errors;
    constructor(_lexer: Lexer);
    parseAction(input: string, location: string, absoluteOffset: number, interpolationConfig?: InterpolationConfig): ASTWithSource;
    parseBinding(input: string, location: string, absoluteOffset: number, interpolationConfig?: InterpolationConfig): ASTWithSource;
    private checkSimpleExpression;
    parseSimpleBinding(input: string, location: string, absoluteOffset: number, interpolationConfig?: InterpolationConfig): ASTWithSource;
    private _reportError;
    private _parseBindingAst;
    /**
     * Parse microsyntax template expression and return a list of bindings or
     * parsing errors in case the given expression is invalid.
     *
     * For example,
     * ```html
     *   <div *ngFor="let item of items">
     *         ^      ^ absoluteValueOffset for `templateValue`
     *         absoluteKeyOffset for `templateKey`
     * ```
     * contains three bindings:
     * 1. ngFor -> null
     * 2. item -> NgForOfContext.$implicit
     * 3. ngForOf -> items
     *
     * This is apparent from the de-sugared template:
     * ```html
     *   <ng-template ngFor let-item [ngForOf]="items">
     * ```
     *
     * @param templateKey name of directive, without the * prefix. For example: ngIf, ngFor
     * @param templateValue RHS of the microsyntax attribute
     * @param templateUrl template filename if it's external, component filename if it's inline
     * @param absoluteKeyOffset start of the `templateKey`
     * @param absoluteValueOffset start of the `templateValue`
     */
    parseTemplateBindings(templateKey: string, templateValue: string, templateUrl: string, absoluteKeyOffset: number, absoluteValueOffset: number): TemplateBindingParseResult;
    parseInterpolation(input: string, location: string, absoluteOffset: number, interpolatedTokens: InterpolatedAttributeToken[] | InterpolatedTextToken[] | null, interpolationConfig?: InterpolationConfig): ASTWithSource | null;
    /**
     * Similar to `parseInterpolation`, but treats the provided string as a single expression
     * element that would normally appear within the interpolation prefix and suffix (`{{` and `}}`).
     * This is used for parsing the switch expression in ICUs.
     */
    parseInterpolationExpression(expression: string, location: string, absoluteOffset: number): ASTWithSource;
    private createInterpolationAst;
    /**
     * Splits a string of text into "raw" text segments and expressions present in interpolations in
     * the string.
     * Returns `null` if there are no interpolations, otherwise a
     * `SplitInterpolation` with splits that look like
     *   <raw text> <expression> <raw text> ... <raw text> <expression> <raw text>
     */
    splitInterpolation(input: string, location: string, interpolatedTokens: InterpolatedAttributeToken[] | InterpolatedTextToken[] | null, interpolationConfig?: InterpolationConfig): SplitInterpolation;
    wrapLiteralPrimitive(input: string | null, location: string, absoluteOffset: number): ASTWithSource;
    private _stripComments;
    private _commentStart;
    private _checkNoInterpolation;
    /**
     * Finds the index of the end of an interpolation expression
     * while ignoring comments and quoted content.
     */
    private _getInterpolationEndIndex;
    /**
     * Generator used to iterate over the character indexes of a string that are outside of quotes.
     * @param input String to loop through.
     * @param start Index within the string at which to start.
     */
    private _forEachUnquotedChar;
}

declare function computeMsgId(msg: string, meaning?: string): string;

declare class HtmlParser extends Parser$1 {
    constructor();
    parse(source: string, url: string, options?: TokenizeOptions): ParseTreeResult;
}

declare function escapeRegExp(s: string): string;
declare class Version {
    full: string;
    readonly major: string;
    readonly minor: string;
    readonly patch: string;
    constructor(full: string);
}
interface Console {
    log(message: string): void;
    warn(message: string): void;
}

declare class I18NHtmlParser implements HtmlParser {
    private _htmlParser;
    getTagDefinition: any;
    private _translationBundle;
    constructor(_htmlParser: HtmlParser, translations?: string, translationsFormat?: string, missingTranslation?: MissingTranslationStrategy, console?: Console);
    parse(source: string, url: string, options?: TokenizeOptions): ParseTreeResult;
}

declare abstract class Serializer {
    abstract write(messages: Message[], locale: string | null): string;
    abstract load(content: string, url: string): {
        locale: string | null;
        i18nNodesByMsgId: {
            [msgId: string]: Node$2[];
        };
    };
    abstract digest(message: Message): string;
    createNameMapper(message: Message): PlaceholderMapper | null;
}
/**
 * A `PlaceholderMapper` converts placeholder names from internal to serialized representation and
 * back.
 *
 * It should be used for serialization format that put constraints on the placeholder names.
 */
interface PlaceholderMapper {
    toPublicName(internalName: string): string | null;
    toInternalName(publicName: string): string | null;
}

/**
 * A container for message extracted from the templates.
 */
declare class MessageBundle {
    private _htmlParser;
    private _implicitTags;
    private _implicitAttrs;
    private _locale;
    private readonly _preserveWhitespace;
    private _messages;
    constructor(_htmlParser: HtmlParser, _implicitTags: string[], _implicitAttrs: {
        [k: string]: string[];
    }, _locale?: string | null, _preserveWhitespace?: boolean);
    updateFromTemplate(source: string, url: string, interpolationConfig: InterpolationConfig): ParseError[];
    getMessages(): Message[];
    write(serializer: Serializer, filterSources?: (path: string) => string): string;
}

declare class Xliff extends Serializer {
    write(messages: Message[], locale: string | null): string;
    load(content: string, url: string): {
        locale: string;
        i18nNodesByMsgId: {
            [msgId: string]: Node$2[];
        };
    };
    digest(message: Message): string;
}

declare class Xliff2 extends Serializer {
    write(messages: Message[], locale: string | null): string;
    load(content: string, url: string): {
        locale: string;
        i18nNodesByMsgId: {
            [msgId: string]: Node$2[];
        };
    };
    digest(message: Message): string;
}

declare class Xmb extends Serializer {
    write(messages: Message[], locale: string | null): string;
    load(content: string, url: string): {
        locale: string;
        i18nNodesByMsgId: {
            [msgId: string]: Node$2[];
        };
    };
    digest(message: Message): string;
    createNameMapper(message: Message): PlaceholderMapper;
}

declare class Xtb extends Serializer {
    write(messages: Message[], locale: string | null): string;
    load(content: string, url: string): {
        locale: string;
        i18nNodesByMsgId: {
            [msgId: string]: Node$2[];
        };
    };
    digest(message: Message): string;
    createNameMapper(message: Message): PlaceholderMapper;
}

interface CompilerFacade {
    compilePipe(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3PipeMetadataFacade): any;
    compilePipeDeclaration(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, declaration: R3DeclarePipeFacade): any;
    compileInjectable(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3InjectableMetadataFacade): any;
    compileInjectableDeclaration(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3DeclareInjectableFacade): any;
    compileInjector(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3InjectorMetadataFacade): any;
    compileInjectorDeclaration(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, declaration: R3DeclareInjectorFacade): any;
    compileNgModule(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3NgModuleMetadataFacade): any;
    compileNgModuleDeclaration(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, declaration: R3DeclareNgModuleFacade): any;
    compileDirective(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3DirectiveMetadataFacade): any;
    compileDirectiveDeclaration(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, declaration: R3DeclareDirectiveFacade): any;
    compileComponent(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3ComponentMetadataFacade): any;
    compileComponentDeclaration(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, declaration: R3DeclareComponentFacade): any;
    compileFactory(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3FactoryDefMetadataFacade): any;
    compileFactoryDeclaration(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3DeclareFactoryFacade): any;
    createParseSourceSpan(kind: string, typeName: string, sourceUrl: string): ParseSourceSpan;
    FactoryTarget: typeof FactoryTarget;
    ResourceLoader: Function & {
        prototype: ResourceLoader$1;
    };
}
interface CoreEnvironment {
    [name: string]: unknown;
}
type ResourceLoader$1 = {
    get(url: string): Promise<string> | string;
};
type Provider = unknown;
type Type = Function;
type OpaqueValue = unknown;
declare enum FactoryTarget {
    Directive = 0,
    Component = 1,
    Injectable = 2,
    Pipe = 3,
    NgModule = 4
}
interface R3DependencyMetadataFacade {
    token: OpaqueValue;
    attribute: string | null;
    host: boolean;
    optional: boolean;
    self: boolean;
    skipSelf: boolean;
}
interface R3DeclareDependencyMetadataFacade {
    token: OpaqueValue;
    attribute?: boolean;
    host?: boolean;
    optional?: boolean;
    self?: boolean;
    skipSelf?: boolean;
}
interface R3PipeMetadataFacade {
    name: string;
    type: Type;
    pipeName: string;
    pure: boolean;
    isStandalone: boolean;
}
interface R3InjectableMetadataFacade {
    name: string;
    type: Type;
    typeArgumentCount: number;
    providedIn?: Type | 'root' | 'platform' | 'any' | null;
    useClass?: OpaqueValue;
    useFactory?: OpaqueValue;
    useExisting?: OpaqueValue;
    useValue?: OpaqueValue;
    deps?: R3DependencyMetadataFacade[];
}
interface R3NgModuleMetadataFacade {
    type: Type;
    bootstrap: Function[];
    declarations: Function[];
    imports: Function[];
    exports: Function[];
    schemas: {
        name: string;
    }[] | null;
    id: string | null;
}
interface R3InjectorMetadataFacade {
    name: string;
    type: Type;
    providers: Provider[];
    imports: OpaqueValue[];
}
interface R3HostDirectiveMetadataFacade {
    directive: Type;
    inputs?: string[];
    outputs?: string[];
}
interface R3DirectiveMetadataFacade {
    name: string;
    type: Type;
    typeSourceSpan: ParseSourceSpan;
    selector: string | null;
    queries: R3QueryMetadataFacade[];
    host: {
        [key: string]: string;
    };
    propMetadata: {
        [key: string]: OpaqueValue[];
    };
    lifecycle: {
        usesOnChanges: boolean;
    };
    inputs: (string | {
        name: string;
        alias?: string;
        required?: boolean;
    })[];
    outputs: string[];
    usesInheritance: boolean;
    exportAs: string[] | null;
    providers: Provider[] | null;
    viewQueries: R3QueryMetadataFacade[];
    isStandalone: boolean;
    hostDirectives: R3HostDirectiveMetadataFacade[] | null;
    isSignal: boolean;
}
interface R3ComponentMetadataFacade extends R3DirectiveMetadataFacade {
    template: string;
    preserveWhitespaces: boolean;
    animations: OpaqueValue[] | undefined;
    declarations: R3TemplateDependencyFacade[];
    styles: string[];
    encapsulation: ViewEncapsulation;
    viewProviders: Provider[] | null;
    interpolation?: [string, string];
    changeDetection?: ChangeDetectionStrategy;
}
type LegacyInputPartialMapping$1 = string | [bindingPropertyName: string, classPropertyName: string, transformFunction?: Function];
interface R3DeclareDirectiveFacade {
    selector?: string;
    type: Type;
    version: string;
    inputs?: {
        [fieldName: string]: {
            classPropertyName: string;
            publicName: string;
            isSignal: boolean;
            isRequired: boolean;
            transformFunction: Function | null;
        } | LegacyInputPartialMapping$1;
    };
    outputs?: {
        [classPropertyName: string]: string;
    };
    host?: {
        attributes?: {
            [key: string]: OpaqueValue;
        };
        listeners?: {
            [key: string]: string;
        };
        properties?: {
            [key: string]: string;
        };
        classAttribute?: string;
        styleAttribute?: string;
    };
    queries?: R3DeclareQueryMetadataFacade[];
    viewQueries?: R3DeclareQueryMetadataFacade[];
    providers?: OpaqueValue;
    exportAs?: string[];
    usesInheritance?: boolean;
    usesOnChanges?: boolean;
    isStandalone?: boolean;
    isSignal?: boolean;
    hostDirectives?: R3HostDirectiveMetadataFacade[] | null;
}
interface R3DeclareComponentFacade extends R3DeclareDirectiveFacade {
    template: string;
    isInline?: boolean;
    styles?: string[];
    dependencies?: R3DeclareTemplateDependencyFacade[];
    components?: R3DeclareDirectiveDependencyFacade[];
    directives?: R3DeclareDirectiveDependencyFacade[];
    pipes?: {
        [pipeName: string]: OpaqueValue | (() => OpaqueValue);
    };
    deferBlockDependencies?: (() => Promise<Type> | null)[];
    viewProviders?: OpaqueValue;
    animations?: OpaqueValue;
    changeDetection?: ChangeDetectionStrategy;
    encapsulation?: ViewEncapsulation;
    interpolation?: [string, string];
    preserveWhitespaces?: boolean;
}
type R3DeclareTemplateDependencyFacade = {
    kind: string;
} & (R3DeclareDirectiveDependencyFacade | R3DeclarePipeDependencyFacade | R3DeclareNgModuleDependencyFacade);
interface R3DeclareDirectiveDependencyFacade {
    kind?: 'directive' | 'component';
    selector: string;
    type: OpaqueValue | (() => OpaqueValue);
    inputs?: string[];
    outputs?: string[];
    exportAs?: string[];
}
interface R3DeclarePipeDependencyFacade {
    kind?: 'pipe';
    name: string;
    type: OpaqueValue | (() => OpaqueValue);
}
interface R3DeclareNgModuleDependencyFacade {
    kind: 'ngmodule';
    type: OpaqueValue | (() => OpaqueValue);
}
declare enum R3TemplateDependencyKind$1 {
    Directive = 0,
    Pipe = 1,
    NgModule = 2
}
interface R3TemplateDependencyFacade {
    kind: R3TemplateDependencyKind$1;
    type: OpaqueValue | (() => OpaqueValue);
}
interface R3FactoryDefMetadataFacade {
    name: string;
    type: Type;
    typeArgumentCount: number;
    deps: R3DependencyMetadataFacade[] | null;
    target: FactoryTarget;
}
interface R3DeclareFactoryFacade {
    type: Type;
    deps: R3DeclareDependencyMetadataFacade[] | 'invalid' | null;
    target: FactoryTarget;
}
interface R3DeclareInjectableFacade {
    type: Type;
    providedIn?: Type | 'root' | 'platform' | 'any' | null;
    useClass?: OpaqueValue;
    useFactory?: OpaqueValue;
    useExisting?: OpaqueValue;
    useValue?: OpaqueValue;
    deps?: R3DeclareDependencyMetadataFacade[];
}
declare enum ViewEncapsulation {
    Emulated = 0,
    None = 2,
    ShadowDom = 3
}
type ChangeDetectionStrategy = number;
interface R3QueryMetadataFacade {
    propertyName: string;
    first: boolean;
    predicate: OpaqueValue | string[];
    descendants: boolean;
    emitDistinctChangesOnly: boolean;
    read: OpaqueValue | null;
    static: boolean;
    isSignal: boolean;
}
interface R3DeclareQueryMetadataFacade {
    propertyName: string;
    first?: boolean;
    predicate: OpaqueValue | string[];
    descendants?: boolean;
    read?: OpaqueValue;
    static?: boolean;
    emitDistinctChangesOnly?: boolean;
    isSignal?: boolean;
}
interface R3DeclareInjectorFacade {
    type: Type;
    imports?: OpaqueValue[];
    providers?: OpaqueValue[];
}
interface R3DeclareNgModuleFacade {
    type: Type;
    bootstrap?: OpaqueValue[] | (() => OpaqueValue[]);
    declarations?: OpaqueValue[] | (() => OpaqueValue[]);
    imports?: OpaqueValue[] | (() => OpaqueValue[]);
    exports?: OpaqueValue[] | (() => OpaqueValue[]);
    schemas?: OpaqueValue[];
    id?: OpaqueValue;
}
interface R3DeclarePipeFacade {
    type: Type;
    version: string;
    name: string;
    pure?: boolean;
    isStandalone?: boolean;
}
interface ParseSourceSpan {
    start: any;
    end: any;
    details: any;
    fullStart: any;
}

interface R3Reference {
    value: Expression;
    type: Expression;
}
/**
 * Result of compilation of a render3 code unit, e.g. component, directive, pipe, etc.
 */
interface R3CompiledExpression {
    expression: Expression;
    type: Type$1;
    statements: Statement[];
}
declare function getSafePropertyAccessString(accessor: string, name: string): string;
declare function devOnlyGuardedExpression(expr: Expression): Expression;
/**
 * Describes an expression that may have been wrapped in a `forwardRef()` guard.
 *
 * This is used when describing expressions that can refer to types that may eagerly reference types
 * that have not yet been defined.
 */
interface MaybeForwardRefExpression<T extends Expression = Expression> {
    /**
     * The unwrapped expression.
     */
    expression: T;
    /**
     * Specified whether the `expression` contains a reference to something that has not yet been
     * defined, and whether the expression is still wrapped in a `forwardRef()` call.
     *
     * If this value is `ForwardRefHandling.None` then the `expression` is safe to use as-is.
     *
     * Otherwise the `expression` was wrapped in a call to `forwardRef()` and must not be eagerly
     * evaluated. Instead it must be wrapped in a function closure that will be evaluated lazily to
     * allow the definition of the expression to be evaluated first.
     *
     * In full AOT compilation it can be safe to unwrap the `forwardRef()` call up front if the
     * expression will actually be evaluated lazily inside a function call after the value of
     * `expression` has been defined.
     *
     * But in other cases, such as partial AOT compilation or JIT compilation the expression will be
     * evaluated eagerly in top level code so will need to continue to be wrapped in a `forwardRef()`
     * call.
     *
     */
    forwardRef: ForwardRefHandling;
}
declare function createMayBeForwardRefExpression<T extends Expression>(expression: T, forwardRef: ForwardRefHandling): MaybeForwardRefExpression<T>;
/**
 * Specifies how a forward ref has been handled in a MaybeForwardRefExpression
 */
declare const enum ForwardRefHandling {
    /** The expression was not wrapped in a `forwardRef()` call in the first place. */
    None = 0,
    /** The expression is still wrapped in a `forwardRef()` call. */
    Wrapped = 1,
    /** The expression was wrapped in a `forwardRef()` call but has since been unwrapped. */
    Unwrapped = 2
}

/**
 * Metadata required by the factory generator to generate a `factory` function for a type.
 */
interface R3ConstructorFactoryMetadata {
    /**
     * String name of the type being generated (used to name the factory function).
     */
    name: string;
    /**
     * An expression representing the interface type being constructed.
     */
    type: R3Reference;
    /** Number of arguments for the `type`. */
    typeArgumentCount: number;
    /**
     * Regardless of whether `fnOrClass` is a constructor function or a user-defined factory, it
     * may have 0 or more parameters, which will be injected according to the `R3DependencyMetadata`
     * for those parameters. If this is `null`, then the type's constructor is nonexistent and will
     * be inherited from `fnOrClass` which is interpreted as the current type. If this is `'invalid'`,
     * then one or more of the parameters wasn't resolvable and any attempt to use these deps will
     * result in a runtime error.
     */
    deps: R3DependencyMetadata[] | 'invalid' | null;
    /**
     * Type of the target being created by the factory.
     */
    target: FactoryTarget;
}
declare enum R3FactoryDelegateType {
    Class = 0,
    Function = 1
}
interface R3DelegatedFnOrClassMetadata extends R3ConstructorFactoryMetadata {
    delegate: Expression;
    delegateType: R3FactoryDelegateType;
    delegateDeps: R3DependencyMetadata[];
}
interface R3ExpressionFactoryMetadata extends R3ConstructorFactoryMetadata {
    expression: Expression;
}
type R3FactoryMetadata = R3ConstructorFactoryMetadata | R3DelegatedFnOrClassMetadata | R3ExpressionFactoryMetadata;
interface R3DependencyMetadata {
    /**
     * An expression representing the token or value to be injected.
     * Or `null` if the dependency could not be resolved - making it invalid.
     */
    token: Expression | null;
    /**
     * If an @Attribute decorator is present, this is the literal type of the attribute name, or
     * the unknown type if no literal type is available (e.g. the attribute name is an expression).
     * Otherwise it is null;
     */
    attributeNameType: Expression | null;
    /**
     * Whether the dependency has an @Host qualifier.
     */
    host: boolean;
    /**
     * Whether the dependency has an @Optional qualifier.
     */
    optional: boolean;
    /**
     * Whether the dependency has an @Self qualifier.
     */
    self: boolean;
    /**
     * Whether the dependency has an @SkipSelf qualifier.
     */
    skipSelf: boolean;
}
/**
 * Construct a factory function expression for the given `R3FactoryMetadata`.
 */
declare function compileFactoryFunction(meta: R3FactoryMetadata): R3CompiledExpression;

interface R3InjectableMetadata {
    name: string;
    type: R3Reference;
    typeArgumentCount: number;
    providedIn: MaybeForwardRefExpression;
    useClass?: MaybeForwardRefExpression;
    useFactory?: Expression;
    useExisting?: MaybeForwardRefExpression;
    useValue?: MaybeForwardRefExpression;
    deps?: R3DependencyMetadata[];
}
declare function compileInjectable(meta: R3InjectableMetadata, resolveForwardRefs: boolean): R3CompiledExpression;
declare function createInjectableType(meta: R3InjectableMetadata): ExpressionType;

type SourceMap = {
    version: number;
    file?: string;
    sourceRoot: string;
    sources: string[];
    sourcesContent: (string | null)[];
    mappings: string;
};
declare class SourceMapGenerator {
    private file;
    private sourcesContent;
    private lines;
    private lastCol0;
    private hasMappings;
    constructor(file?: string | null);
    addSource(url: string, content?: string | null): this;
    addLine(): this;
    addMapping(col0: number, sourceUrl?: string, sourceLine0?: number, sourceCol0?: number): this;
    toJSON(): SourceMap | null;
    toJsComment(): string;
}

declare class EmitterVisitorContext {
    private _indent;
    static createRoot(): EmitterVisitorContext;
    private _lines;
    constructor(_indent: number);
    println(from?: {
        sourceSpan: ParseSourceSpan$1 | null;
    } | null, lastPart?: string): void;
    lineIsEmpty(): boolean;
    lineLength(): number;
    print(from: {
        sourceSpan: ParseSourceSpan$1 | null;
    } | null, part: string, newLine?: boolean): void;
    removeEmptyLastLine(): void;
    incIndent(): void;
    decIndent(): void;
    toSource(): string;
    toSourceMapGenerator(genFilePath: string, startsAtLine?: number): SourceMapGenerator;
    spanOf(line: number, column: number): ParseSourceSpan$1 | null;
}

interface ExternalReferenceResolver {
    resolveExternalReference(ref: ExternalReference): unknown;
}
/**
 * A helper class to manage the evaluation of JIT generated code.
 */
declare class JitEvaluator {
    /**
     *
     * @param sourceUrl The URL of the generated code.
     * @param statements An array of Angular statement AST nodes to be evaluated.
     * @param refResolver Resolves `o.ExternalReference`s into values.
     * @param createSourceMaps If true then create a source-map for the generated code and include it
     * inline as a source-map comment.
     * @returns A map of all the variables in the generated code.
     */
    evaluateStatements(sourceUrl: string, statements: Statement[], refResolver: ExternalReferenceResolver, createSourceMaps: boolean): {
        [key: string]: any;
    };
    /**
     * Evaluate a piece of JIT generated code.
     * @param sourceUrl The URL of this generated code.
     * @param ctx A context object that contains an AST of the code to be evaluated.
     * @param vars A map containing the names and values of variables that the evaluated code might
     * reference.
     * @param createSourceMap If true then create a source-map for the generated code and include it
     * inline as a source-map comment.
     * @returns The result of evaluating the code.
     */
    evaluateCode(sourceUrl: string, ctx: EmitterVisitorContext, vars: {
        [key: string]: any;
    }, createSourceMap: boolean): any;
    /**
     * Execute a JIT generated function by calling it.
     *
     * This method can be overridden in tests to capture the functions that are generated
     * by this `JitEvaluator` class.
     *
     * @param fn A function to execute.
     * @param args The arguments to pass to the function being executed.
     * @returns The return value of the executed function.
     */
    executeFunction(fn: Function, args: any[]): any;
}

/**
 * An interface for retrieving documents by URL that the compiler uses to
 * load templates.
 *
 * This is an abstract class, rather than an interface, so that it can be used
 * as injection token.
 */
declare abstract class ResourceLoader {
    abstract get(url: string): Promise<string> | string;
}

declare class CompilerFacadeImpl implements CompilerFacade {
    private jitEvaluator;
    FactoryTarget: typeof FactoryTarget;
    ResourceLoader: typeof ResourceLoader;
    private elementSchemaRegistry;
    constructor(jitEvaluator?: JitEvaluator);
    compilePipe(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, facade: R3PipeMetadataFacade): any;
    compilePipeDeclaration(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, declaration: R3DeclarePipeFacade): any;
    compileInjectable(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, facade: R3InjectableMetadataFacade): any;
    compileInjectableDeclaration(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, facade: R3DeclareInjectableFacade): any;
    compileInjector(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, facade: R3InjectorMetadataFacade): any;
    compileInjectorDeclaration(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, declaration: R3DeclareInjectorFacade): any;
    compileNgModule(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, facade: R3NgModuleMetadataFacade): any;
    compileNgModuleDeclaration(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, declaration: R3DeclareNgModuleFacade): any;
    compileDirective(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, facade: R3DirectiveMetadataFacade): any;
    compileDirectiveDeclaration(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, declaration: R3DeclareDirectiveFacade): any;
    private compileDirectiveFromMeta;
    compileComponent(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, facade: R3ComponentMetadataFacade): any;
    compileComponentDeclaration(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, declaration: R3DeclareComponentFacade): any;
    private compileComponentFromMeta;
    compileFactory(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3FactoryDefMetadataFacade): any;
    compileFactoryDeclaration(angularCoreEnv: CoreEnvironment, sourceMapUrl: string, meta: R3DeclareFactoryFacade): any;
    createParseSourceSpan(kind: string, typeName: string, sourceUrl: string): ParseSourceSpan$1;
    /**
     * JIT compiles an expression and returns the result of executing that expression.
     *
     * @param def the definition which will be compiled and executed to get the value to patch
     * @param context an object map of @angular/core symbol names to symbols which will be available
     * in the context of the compiled expression
     * @param sourceUrl a URL to use for the source map of the compiled expression
     * @param preStatements a collection of statements that should be evaluated before the expression.
     */
    private jitExpression;
}
declare function publishFacade(global: any): void;

declare class HtmlTagDefinition implements TagDefinition {
    private closedByChildren;
    private contentType;
    closedByParent: boolean;
    implicitNamespacePrefix: string | null;
    isVoid: boolean;
    ignoreFirstLf: boolean;
    canSelfClose: boolean;
    preventNamespaceInheritance: boolean;
    constructor({ closedByChildren, implicitNamespacePrefix, contentType, closedByParent, isVoid, ignoreFirstLf, preventNamespaceInheritance, canSelfClose, }?: {
        closedByChildren?: string[];
        closedByParent?: boolean;
        implicitNamespacePrefix?: string;
        contentType?: TagContentType | {
            default: TagContentType;
            [namespace: string]: TagContentType;
        };
        isVoid?: boolean;
        ignoreFirstLf?: boolean;
        preventNamespaceInheritance?: boolean;
        canSelfClose?: boolean;
    });
    isClosedByChild(name: string): boolean;
    getContentType(prefix?: string): TagContentType;
}
declare function getHtmlTagDefinition(tagName: string): HtmlTagDefinition;

declare class XmlParser extends Parser$1 {
    constructor();
    parse(source: string, url: string, options?: TokenizeOptions): ParseTreeResult;
}

interface R3PartialDeclaration {
    /**
     * The minimum version of the compiler that can process this partial declaration.
     */
    minVersion: string;
    /**
     * Version number of the Angular compiler that was used to compile this declaration. The linker
     * will be able to detect which version a library is using and interpret its metadata accordingly.
     */
    version: string;
    /**
     * A reference to the `@angular/core` ES module, which allows access
     * to all Angular exports, including Ivy instructions.
     */
    ngImport: Expression;
    /**
     * Reference to the decorated class, which is subject to this partial declaration.
     */
    type: Expression;
}
type LegacyInputPartialMapping = string | [bindingPropertyName: string, classPropertyName: string, transformFunction?: Expression];
/**
 * Describes the shape of the object that the `ɵɵngDeclareDirective()` function accepts.
 */
interface R3DeclareDirectiveMetadata extends R3PartialDeclaration {
    /**
     * Unparsed selector of the directive.
     */
    selector?: string;
    /**
     * A mapping of inputs from class property names to binding property names, or to a tuple of
     * binding property name and class property name if the names are different.
     */
    inputs?: {
        [fieldName: string]: {
            classPropertyName: string;
            publicName: string;
            isSignal: boolean;
            isRequired: boolean;
            transformFunction: Expression | null;
        } | LegacyInputPartialMapping;
    };
    /**
     * A mapping of outputs from class property names to binding property names.
     */
    outputs?: {
        [classPropertyName: string]: string;
    };
    /**
     * Information about host bindings present on the component.
     */
    host?: {
        /**
         * A mapping of attribute names to their value expression.
         */
        attributes?: {
            [key: string]: Expression;
        };
        /**
         * A mapping of event names to their unparsed event handler expression.
         */
        listeners: {
            [key: string]: string;
        };
        /**
         * A mapping of bound properties to their unparsed binding expression.
         */
        properties?: {
            [key: string]: string;
        };
        /**
         * The value of the class attribute, if present. This is stored outside of `attributes` as its
         * string value must be known statically.
         */
        classAttribute?: string;
        /**
         * The value of the style attribute, if present. This is stored outside of `attributes` as its
         * string value must be known statically.
         */
        styleAttribute?: string;
    };
    /**
     * Information about the content queries made by the directive.
     */
    queries?: R3DeclareQueryMetadata[];
    /**
     * Information about the view queries made by the directive.
     */
    viewQueries?: R3DeclareQueryMetadata[];
    /**
     * The list of providers provided by the directive.
     */
    providers?: Expression;
    /**
     * The names by which the directive is exported.
     */
    exportAs?: string[];
    /**
     * Whether the directive has an inheritance clause. Defaults to false.
     */
    usesInheritance?: boolean;
    /**
     * Whether the directive implements the `ngOnChanges` hook. Defaults to false.
     */
    usesOnChanges?: boolean;
    /**
     * Whether the directive is standalone. Defaults to false.
     */
    isStandalone?: boolean;
    /**
     * Whether the directive is a signal-based directive. Defaults to false.
     */
    isSignal?: boolean;
    /**
     * Additional directives applied to the directive host.
     */
    hostDirectives?: R3DeclareHostDirectiveMetadata[];
}
/**
 * Describes the shape of the object that the `ɵɵngDeclareComponent()` function accepts.
 */
interface R3DeclareComponentMetadata extends R3DeclareDirectiveMetadata {
    /**
     * The component's unparsed template string as opaque expression. The template is represented
     * using either a string literal or template literal without substitutions, but its value is
     * not read directly. Instead, the template parser is given the full source file's text and
     * the range of this expression to parse directly from source.
     */
    template: Expression;
    /**
     * Whether the template was inline (using `template`) or external (using `templateUrl`).
     * Defaults to false.
     */
    isInline?: boolean;
    /**
     * CSS from inline styles and included styleUrls.
     */
    styles?: string[];
    /**
     * List of components which matched in the template, including sufficient
     * metadata for each directive to attribute bindings and references within
     * the template to each directive specifically, if the runtime instructions
     * support this.
     */
    components?: R3DeclareDirectiveDependencyMetadata[];
    /**
     * List of directives which matched in the template, including sufficient
     * metadata for each directive to attribute bindings and references within
     * the template to each directive specifically, if the runtime instructions
     * support this.
     */
    directives?: R3DeclareDirectiveDependencyMetadata[];
    /**
     * List of dependencies which matched in the template, including sufficient
     * metadata for each directive/pipe to attribute bindings and references within
     * the template to each directive specifically, if the runtime instructions
     * support this.
     */
    dependencies?: R3DeclareTemplateDependencyMetadata[];
    /**
     * List of defer block dependency functions, ordered by the appearance
     * of the corresponding deferred block in the template.
     */
    deferBlockDependencies?: Expression[];
    /**
     * A map of pipe names to an expression referencing the pipe type (possibly a forward reference
     * wrapped in a `forwardRef` invocation) which are used in the template.
     */
    pipes?: {
        [pipeName: string]: Expression | (() => Expression);
    };
    /**
     * The list of view providers defined in the component.
     */
    viewProviders?: Expression;
    /**
     * A collection of animation triggers that will be used in the component template.
     */
    animations?: Expression;
    /**
     * Strategy used for detecting changes in the component.
     * Defaults to `ChangeDetectionStrategy.Default`.
     */
    changeDetection?: ChangeDetectionStrategy$1;
    /**
     * An encapsulation policy for the component's styling.
     * Defaults to `ViewEncapsulation.Emulated`.
     */
    encapsulation?: ViewEncapsulation$1;
    /**
     * Overrides the default interpolation start and end delimiters. Defaults to {{ and }}.
     */
    interpolation?: [string, string];
    /**
     * Whether whitespace in the template should be preserved. Defaults to false.
     */
    preserveWhitespaces?: boolean;
}
type R3DeclareTemplateDependencyMetadata = R3DeclareDirectiveDependencyMetadata | R3DeclarePipeDependencyMetadata | R3DeclareNgModuleDependencyMetadata;
interface R3DeclareDirectiveDependencyMetadata {
    kind: 'directive' | 'component';
    /**
     * Selector of the directive.
     */
    selector: string;
    /**
     * Reference to the directive class (possibly a forward reference wrapped in a `forwardRef`
     * invocation).
     */
    type: Expression | (() => Expression);
    /**
     * Property names of the directive's inputs.
     */
    inputs?: string[];
    /**
     * Event names of the directive's outputs.
     */
    outputs?: string[];
    /**
     * Names by which this directive exports itself for references.
     */
    exportAs?: string[];
}
interface R3DeclarePipeDependencyMetadata {
    kind: 'pipe';
    name: string;
    /**
     * Reference to the pipe class (possibly a forward reference wrapped in a `forwardRef`
     * invocation).
     */
    type: Expression | (() => Expression);
}
interface R3DeclareNgModuleDependencyMetadata {
    kind: 'ngmodule';
    type: Expression | (() => Expression);
}
interface R3DeclareQueryMetadata {
    /**
     * Name of the property on the class to update with query results.
     */
    propertyName: string;
    /**
     * Whether to read only the first matching result, or an array of results. Defaults to false.
     */
    first?: boolean;
    /**
     * Either an expression representing a type (possibly wrapped in a `forwardRef()`) or
     * `InjectionToken` for the query predicate, or a set of string selectors.
     */
    predicate: Expression | string[];
    /**
     * Whether to include only direct children or all descendants. Defaults to false.
     */
    descendants?: boolean;
    /**
     * True to only fire changes if there are underlying changes to the query.
     */
    emitDistinctChangesOnly?: boolean;
    /**
     * An expression representing a type to read from each matched node, or null if the default value
     * for a given node is to be returned.
     */
    read?: Expression;
    /**
     * Whether or not this query should collect only static results. Defaults to false.
     *
     * If static is true, the query's results will be set on the component after nodes are created,
     * but before change detection runs. This means that any results that relied upon change detection
     * to run (e.g. results inside *ngIf or *ngFor views) will not be collected. Query results are
     * available in the ngOnInit hook.
     *
     * If static is false, the query's results will be set on the component after change detection
     * runs. This means that the query results can contain nodes inside *ngIf or *ngFor views, but
     * the results will not be available in the ngOnInit hook (only in the ngAfterContentInit for
     * content hooks and ngAfterViewInit for view hooks).
     */
    static?: boolean;
    /** Whether the query is signal-based. */
    isSignal: boolean;
}
/**
 * Describes the shape of the objects that the `ɵɵngDeclareNgModule()` accepts.
 */
interface R3DeclareNgModuleMetadata extends R3PartialDeclaration {
    /**
     * An array of expressions representing the bootstrap components specified by the module.
     */
    bootstrap?: Expression[];
    /**
     * An array of expressions representing the directives and pipes declared by the module.
     */
    declarations?: Expression[];
    /**
     * An array of expressions representing the imports of the module.
     */
    imports?: Expression[];
    /**
     * An array of expressions representing the exports of the module.
     */
    exports?: Expression[];
    /**
     * The set of schemas that declare elements to be allowed in the NgModule.
     */
    schemas?: Expression[];
    /** Unique ID or expression representing the unique ID of an NgModule. */
    id?: Expression;
}
/**
 * Describes the shape of the objects that the `ɵɵngDeclareInjector()` accepts.
 */
interface R3DeclareInjectorMetadata extends R3PartialDeclaration {
    /**
     * The list of providers provided by the injector.
     */
    providers?: Expression;
    /**
     * The list of imports into the injector.
     */
    imports?: Expression[];
}
/**
 * Describes the shape of the object that the `ɵɵngDeclarePipe()` function accepts.
 *
 * This interface serves primarily as documentation, as conformance to this interface is not
 * enforced during linking.
 */
interface R3DeclarePipeMetadata extends R3PartialDeclaration {
    /**
     * The name to use in templates to refer to this pipe.
     */
    name: string;
    /**
     * Whether this pipe is "pure".
     *
     * A pure pipe's `transform()` method is only invoked when its input arguments change.
     *
     * Default: true.
     */
    pure?: boolean;
    /**
     * Whether the pipe is standalone.
     *
     * Default: false.
     */
    isStandalone?: boolean;
}
/**
 * Describes the shape of the object that the `ɵɵngDeclareFactory()` function accepts.
 *
 * This interface serves primarily as documentation, as conformance to this interface is not
 * enforced during linking.
 */
interface R3DeclareFactoryMetadata extends R3PartialDeclaration {
    /**
     * A collection of dependencies that this factory relies upon.
     *
     * If this is `null`, then the type's constructor is nonexistent and will be inherited from an
     * ancestor of the type.
     *
     * If this is `'invalid'`, then one or more of the parameters wasn't resolvable and any attempt to
     * use these deps will result in a runtime error.
     */
    deps: R3DeclareDependencyMetadata[] | 'invalid' | null;
    /**
     * Type of the target being created by the factory.
     */
    target: FactoryTarget;
}
/**
 * Describes the shape of the object that the `ɵɵngDeclareInjectable()` function accepts.
 *
 * This interface serves primarily as documentation, as conformance to this interface is not
 * enforced during linking.
 */
interface R3DeclareInjectableMetadata extends R3PartialDeclaration {
    /**
     * If provided, specifies that the declared injectable belongs to a particular injector:
     * - `InjectorType` such as `NgModule`,
     * - `'root'` the root injector
     * - `'any'` all injectors.
     * If not provided, then it does not belong to any injector. Must be explicitly listed in the
     * providers of an injector.
     */
    providedIn?: Expression;
    /**
     * If provided, an expression that evaluates to a class to use when creating an instance of this
     * injectable.
     */
    useClass?: Expression;
    /**
     * If provided, an expression that evaluates to a function to use when creating an instance of
     * this injectable.
     */
    useFactory?: Expression;
    /**
     * If provided, an expression that evaluates to a token of another injectable that this injectable
     * aliases.
     */
    useExisting?: Expression;
    /**
     * If provided, an expression that evaluates to the value of the instance of this injectable.
     */
    useValue?: Expression;
    /**
     * An array of dependencies to support instantiating this injectable via `useClass` or
     * `useFactory`.
     */
    deps?: R3DeclareDependencyMetadata[];
}
/**
 * Metadata indicating how a dependency should be injected into a factory.
 */
interface R3DeclareDependencyMetadata {
    /**
     * An expression representing the token or value to be injected, or `null` if the dependency is
     * not valid.
     *
     * If this dependency is due to the `@Attribute()` decorator, then this is an expression
     * evaluating to the name of the attribute.
     */
    token: Expression | null;
    /**
     * Whether the dependency is injecting an attribute value.
     * Default: false.
     */
    attribute?: boolean;
    /**
     * Whether the dependency has an @Host qualifier.
     * Default: false,
     */
    host?: boolean;
    /**
     * Whether the dependency has an @Optional qualifier.
     * Default: false,
     */
    optional?: boolean;
    /**
     * Whether the dependency has an @Self qualifier.
     * Default: false,
     */
    self?: boolean;
    /**
     * Whether the dependency has an @SkipSelf qualifier.
     * Default: false,
     */
    skipSelf?: boolean;
}
/**
 * Describes the shape of the object that the `ɵɵngDeclareClassMetadata()` function accepts.
 *
 * This interface serves primarily as documentation, as conformance to this interface is not
 * enforced during linking.
 */
interface R3DeclareClassMetadata extends R3PartialDeclaration {
    /**
     * The Angular decorators of the class.
     */
    decorators: Expression;
    /**
     * Optionally specifies the constructor parameters, their types and the Angular decorators of each
     * parameter. This property is omitted if the class does not have a constructor.
     */
    ctorParameters?: Expression;
    /**
     * Optionally specifies the Angular decorators applied to the class properties. This property is
     * omitted if no properties have any decorators.
     */
    propDecorators?: Expression;
}
/**
 * Describes the shape of the object that the `ɵɵngDeclareClassMetadataAsync()` function accepts.
 *
 * This interface serves primarily as documentation, as conformance to this interface is not
 * enforced during linking.
 */
interface R3DeclareClassMetadataAsync extends R3PartialDeclaration {
    /** Function that loads the deferred dependencies associated with the component. */
    resolveDeferredDeps: Expression;
    /**
     * Function that, when invoked with the resolved deferred
     * dependencies, will return the class metadata.
     */
    resolveMetadata: Expression;
}
/**
 * Describes the shape of the object literal that can be
 * passed in as a part of the `hostDirectives` array.
 */
interface R3DeclareHostDirectiveMetadata {
    directive: Expression;
    inputs?: string[];
    outputs?: string[];
}

interface Node {
    sourceSpan: ParseSourceSpan$1;
    visit<Result>(visitor: Visitor<Result>): Result;
}
/**
 * This is an R3 `Node`-like wrapper for a raw `html.Comment` node. We do not currently
 * require the implementation of a visitor for Comments as they are only collected at
 * the top-level of the R3 AST, and only if `Render3ParseOptions['collectCommentNodes']`
 * is true.
 */
declare class Comment implements Node {
    value: string;
    sourceSpan: ParseSourceSpan$1;
    constructor(value: string, sourceSpan: ParseSourceSpan$1);
    visit<Result>(_visitor: Visitor<Result>): Result;
}
declare class Text implements Node {
    value: string;
    sourceSpan: ParseSourceSpan$1;
    constructor(value: string, sourceSpan: ParseSourceSpan$1);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class BoundText implements Node {
    value: AST;
    sourceSpan: ParseSourceSpan$1;
    i18n?: I18nMeta$1 | undefined;
    constructor(value: AST, sourceSpan: ParseSourceSpan$1, i18n?: I18nMeta$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
/**
 * Represents a text attribute in the template.
 *
 * `valueSpan` may not be present in cases where there is no value `<div a></div>`.
 * `keySpan` may also not be present for synthetic attributes from ICU expansions.
 */
declare class TextAttribute implements Node {
    name: string;
    value: string;
    sourceSpan: ParseSourceSpan$1;
    readonly keySpan: ParseSourceSpan$1 | undefined;
    valueSpan?: ParseSourceSpan$1 | undefined;
    i18n?: I18nMeta$1 | undefined;
    constructor(name: string, value: string, sourceSpan: ParseSourceSpan$1, keySpan: ParseSourceSpan$1 | undefined, valueSpan?: ParseSourceSpan$1 | undefined, i18n?: I18nMeta$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class BoundAttribute implements Node {
    name: string;
    type: BindingType;
    securityContext: SecurityContext;
    value: AST;
    unit: string | null;
    sourceSpan: ParseSourceSpan$1;
    readonly keySpan: ParseSourceSpan$1;
    valueSpan: ParseSourceSpan$1 | undefined;
    i18n: I18nMeta$1 | undefined;
    constructor(name: string, type: BindingType, securityContext: SecurityContext, value: AST, unit: string | null, sourceSpan: ParseSourceSpan$1, keySpan: ParseSourceSpan$1, valueSpan: ParseSourceSpan$1 | undefined, i18n: I18nMeta$1 | undefined);
    static fromBoundElementProperty(prop: BoundElementProperty, i18n?: I18nMeta$1): BoundAttribute;
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class BoundEvent implements Node {
    name: string;
    type: ParsedEventType;
    handler: AST;
    target: string | null;
    phase: string | null;
    sourceSpan: ParseSourceSpan$1;
    handlerSpan: ParseSourceSpan$1;
    readonly keySpan: ParseSourceSpan$1;
    constructor(name: string, type: ParsedEventType, handler: AST, target: string | null, phase: string | null, sourceSpan: ParseSourceSpan$1, handlerSpan: ParseSourceSpan$1, keySpan: ParseSourceSpan$1);
    static fromParsedEvent(event: ParsedEvent): BoundEvent;
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class Element implements Node {
    name: string;
    attributes: TextAttribute[];
    inputs: BoundAttribute[];
    outputs: BoundEvent[];
    directives: Directive[];
    children: Node[];
    references: Reference[];
    sourceSpan: ParseSourceSpan$1;
    startSourceSpan: ParseSourceSpan$1;
    endSourceSpan: ParseSourceSpan$1 | null;
    i18n?: I18nMeta$1 | undefined;
    constructor(name: string, attributes: TextAttribute[], inputs: BoundAttribute[], outputs: BoundEvent[], directives: Directive[], children: Node[], references: Reference[], sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan: ParseSourceSpan$1 | null, i18n?: I18nMeta$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare abstract class DeferredTrigger implements Node {
    nameSpan: ParseSourceSpan$1 | null;
    sourceSpan: ParseSourceSpan$1;
    prefetchSpan: ParseSourceSpan$1 | null;
    whenOrOnSourceSpan: ParseSourceSpan$1 | null;
    hydrateSpan: ParseSourceSpan$1 | null;
    constructor(nameSpan: ParseSourceSpan$1 | null, sourceSpan: ParseSourceSpan$1, prefetchSpan: ParseSourceSpan$1 | null, whenOrOnSourceSpan: ParseSourceSpan$1 | null, hydrateSpan: ParseSourceSpan$1 | null);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class BoundDeferredTrigger extends DeferredTrigger {
    value: AST;
    constructor(value: AST, sourceSpan: ParseSourceSpan$1, prefetchSpan: ParseSourceSpan$1 | null, whenSourceSpan: ParseSourceSpan$1, hydrateSpan: ParseSourceSpan$1 | null);
}
declare class NeverDeferredTrigger extends DeferredTrigger {
}
declare class IdleDeferredTrigger extends DeferredTrigger {
}
declare class ImmediateDeferredTrigger extends DeferredTrigger {
}
declare class HoverDeferredTrigger extends DeferredTrigger {
    reference: string | null;
    constructor(reference: string | null, nameSpan: ParseSourceSpan$1, sourceSpan: ParseSourceSpan$1, prefetchSpan: ParseSourceSpan$1 | null, onSourceSpan: ParseSourceSpan$1 | null, hydrateSpan: ParseSourceSpan$1 | null);
}
declare class TimerDeferredTrigger extends DeferredTrigger {
    delay: number;
    constructor(delay: number, nameSpan: ParseSourceSpan$1, sourceSpan: ParseSourceSpan$1, prefetchSpan: ParseSourceSpan$1 | null, onSourceSpan: ParseSourceSpan$1 | null, hydrateSpan: ParseSourceSpan$1 | null);
}
declare class InteractionDeferredTrigger extends DeferredTrigger {
    reference: string | null;
    constructor(reference: string | null, nameSpan: ParseSourceSpan$1, sourceSpan: ParseSourceSpan$1, prefetchSpan: ParseSourceSpan$1 | null, onSourceSpan: ParseSourceSpan$1 | null, hydrateSpan: ParseSourceSpan$1 | null);
}
declare class ViewportDeferredTrigger extends DeferredTrigger {
    reference: string | null;
    constructor(reference: string | null, nameSpan: ParseSourceSpan$1, sourceSpan: ParseSourceSpan$1, prefetchSpan: ParseSourceSpan$1 | null, onSourceSpan: ParseSourceSpan$1 | null, hydrateSpan: ParseSourceSpan$1 | null);
}
declare class BlockNode {
    nameSpan: ParseSourceSpan$1;
    sourceSpan: ParseSourceSpan$1;
    startSourceSpan: ParseSourceSpan$1;
    endSourceSpan: ParseSourceSpan$1 | null;
    constructor(nameSpan: ParseSourceSpan$1, sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan: ParseSourceSpan$1 | null);
}
declare class DeferredBlockPlaceholder extends BlockNode implements Node {
    children: Node[];
    minimumTime: number | null;
    i18n?: I18nMeta$1 | undefined;
    constructor(children: Node[], minimumTime: number | null, nameSpan: ParseSourceSpan$1, sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan: ParseSourceSpan$1 | null, i18n?: I18nMeta$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class DeferredBlockLoading extends BlockNode implements Node {
    children: Node[];
    afterTime: number | null;
    minimumTime: number | null;
    i18n?: I18nMeta$1 | undefined;
    constructor(children: Node[], afterTime: number | null, minimumTime: number | null, nameSpan: ParseSourceSpan$1, sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan: ParseSourceSpan$1 | null, i18n?: I18nMeta$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class DeferredBlockError extends BlockNode implements Node {
    children: Node[];
    i18n?: I18nMeta$1 | undefined;
    constructor(children: Node[], nameSpan: ParseSourceSpan$1, sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan: ParseSourceSpan$1 | null, i18n?: I18nMeta$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
interface DeferredBlockTriggers {
    when?: BoundDeferredTrigger;
    idle?: IdleDeferredTrigger;
    immediate?: ImmediateDeferredTrigger;
    hover?: HoverDeferredTrigger;
    timer?: TimerDeferredTrigger;
    interaction?: InteractionDeferredTrigger;
    viewport?: ViewportDeferredTrigger;
    never?: NeverDeferredTrigger;
}
declare class DeferredBlock extends BlockNode implements Node {
    children: Node[];
    placeholder: DeferredBlockPlaceholder | null;
    loading: DeferredBlockLoading | null;
    error: DeferredBlockError | null;
    mainBlockSpan: ParseSourceSpan$1;
    i18n?: I18nMeta$1 | undefined;
    readonly triggers: Readonly<DeferredBlockTriggers>;
    readonly prefetchTriggers: Readonly<DeferredBlockTriggers>;
    readonly hydrateTriggers: Readonly<DeferredBlockTriggers>;
    private readonly definedTriggers;
    private readonly definedPrefetchTriggers;
    private readonly definedHydrateTriggers;
    constructor(children: Node[], triggers: DeferredBlockTriggers, prefetchTriggers: DeferredBlockTriggers, hydrateTriggers: DeferredBlockTriggers, placeholder: DeferredBlockPlaceholder | null, loading: DeferredBlockLoading | null, error: DeferredBlockError | null, nameSpan: ParseSourceSpan$1, sourceSpan: ParseSourceSpan$1, mainBlockSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan: ParseSourceSpan$1 | null, i18n?: I18nMeta$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
    visitAll(visitor: Visitor<unknown>): void;
    private visitTriggers;
}
declare class SwitchBlock extends BlockNode implements Node {
    expression: AST;
    cases: SwitchBlockCase[];
    /**
     * These blocks are only captured to allow for autocompletion in the language service. They
     * aren't meant to be processed in any other way.
     */
    unknownBlocks: UnknownBlock[];
    constructor(expression: AST, cases: SwitchBlockCase[], 
    /**
     * These blocks are only captured to allow for autocompletion in the language service. They
     * aren't meant to be processed in any other way.
     */
    unknownBlocks: UnknownBlock[], sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan: ParseSourceSpan$1 | null, nameSpan: ParseSourceSpan$1);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class SwitchBlockCase extends BlockNode implements Node {
    expression: AST | null;
    children: Node[];
    i18n?: I18nMeta$1 | undefined;
    constructor(expression: AST | null, children: Node[], sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan: ParseSourceSpan$1 | null, nameSpan: ParseSourceSpan$1, i18n?: I18nMeta$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class ForLoopBlock extends BlockNode implements Node {
    item: Variable;
    expression: ASTWithSource;
    trackBy: ASTWithSource;
    trackKeywordSpan: ParseSourceSpan$1;
    contextVariables: Variable[];
    children: Node[];
    empty: ForLoopBlockEmpty | null;
    mainBlockSpan: ParseSourceSpan$1;
    i18n?: I18nMeta$1 | undefined;
    constructor(item: Variable, expression: ASTWithSource, trackBy: ASTWithSource, trackKeywordSpan: ParseSourceSpan$1, contextVariables: Variable[], children: Node[], empty: ForLoopBlockEmpty | null, sourceSpan: ParseSourceSpan$1, mainBlockSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan: ParseSourceSpan$1 | null, nameSpan: ParseSourceSpan$1, i18n?: I18nMeta$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class ForLoopBlockEmpty extends BlockNode implements Node {
    children: Node[];
    i18n?: I18nMeta$1 | undefined;
    constructor(children: Node[], sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan: ParseSourceSpan$1 | null, nameSpan: ParseSourceSpan$1, i18n?: I18nMeta$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class IfBlock extends BlockNode implements Node {
    branches: IfBlockBranch[];
    constructor(branches: IfBlockBranch[], sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan: ParseSourceSpan$1 | null, nameSpan: ParseSourceSpan$1);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class IfBlockBranch extends BlockNode implements Node {
    expression: AST | null;
    children: Node[];
    expressionAlias: Variable | null;
    i18n?: I18nMeta$1 | undefined;
    constructor(expression: AST | null, children: Node[], expressionAlias: Variable | null, sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan: ParseSourceSpan$1 | null, nameSpan: ParseSourceSpan$1, i18n?: I18nMeta$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class UnknownBlock implements Node {
    name: string;
    sourceSpan: ParseSourceSpan$1;
    nameSpan: ParseSourceSpan$1;
    constructor(name: string, sourceSpan: ParseSourceSpan$1, nameSpan: ParseSourceSpan$1);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class LetDeclaration implements Node {
    name: string;
    value: AST;
    sourceSpan: ParseSourceSpan$1;
    nameSpan: ParseSourceSpan$1;
    valueSpan: ParseSourceSpan$1;
    constructor(name: string, value: AST, sourceSpan: ParseSourceSpan$1, nameSpan: ParseSourceSpan$1, valueSpan: ParseSourceSpan$1);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class Component implements Node {
    componentName: string;
    tagName: string | null;
    fullName: string;
    attributes: TextAttribute[];
    inputs: BoundAttribute[];
    outputs: BoundEvent[];
    directives: Directive[];
    children: Node[];
    references: Reference[];
    sourceSpan: ParseSourceSpan$1;
    startSourceSpan: ParseSourceSpan$1;
    endSourceSpan: ParseSourceSpan$1 | null;
    i18n?: I18nMeta$1 | undefined;
    constructor(componentName: string, tagName: string | null, fullName: string, attributes: TextAttribute[], inputs: BoundAttribute[], outputs: BoundEvent[], directives: Directive[], children: Node[], references: Reference[], sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan: ParseSourceSpan$1 | null, i18n?: I18nMeta$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class Directive implements Node {
    name: string;
    attributes: TextAttribute[];
    inputs: BoundAttribute[];
    outputs: BoundEvent[];
    references: Reference[];
    sourceSpan: ParseSourceSpan$1;
    startSourceSpan: ParseSourceSpan$1;
    endSourceSpan: ParseSourceSpan$1 | null;
    i18n?: I18nMeta$1 | undefined;
    constructor(name: string, attributes: TextAttribute[], inputs: BoundAttribute[], outputs: BoundEvent[], references: Reference[], sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan: ParseSourceSpan$1 | null, i18n?: I18nMeta$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class Template implements Node {
    tagName: string | null;
    attributes: TextAttribute[];
    inputs: BoundAttribute[];
    outputs: BoundEvent[];
    directives: Directive[];
    templateAttrs: (BoundAttribute | TextAttribute)[];
    children: Node[];
    references: Reference[];
    variables: Variable[];
    sourceSpan: ParseSourceSpan$1;
    startSourceSpan: ParseSourceSpan$1;
    endSourceSpan: ParseSourceSpan$1 | null;
    i18n?: I18nMeta$1 | undefined;
    constructor(tagName: string | null, attributes: TextAttribute[], inputs: BoundAttribute[], outputs: BoundEvent[], directives: Directive[], templateAttrs: (BoundAttribute | TextAttribute)[], children: Node[], references: Reference[], variables: Variable[], sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan: ParseSourceSpan$1 | null, i18n?: I18nMeta$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class Content implements Node {
    selector: string;
    attributes: TextAttribute[];
    children: Node[];
    sourceSpan: ParseSourceSpan$1;
    startSourceSpan: ParseSourceSpan$1;
    endSourceSpan: ParseSourceSpan$1 | null;
    i18n?: I18nMeta$1 | undefined;
    readonly name = "ng-content";
    constructor(selector: string, attributes: TextAttribute[], children: Node[], sourceSpan: ParseSourceSpan$1, startSourceSpan: ParseSourceSpan$1, endSourceSpan: ParseSourceSpan$1 | null, i18n?: I18nMeta$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class Variable implements Node {
    name: string;
    value: string;
    sourceSpan: ParseSourceSpan$1;
    readonly keySpan: ParseSourceSpan$1;
    valueSpan?: ParseSourceSpan$1 | undefined;
    constructor(name: string, value: string, sourceSpan: ParseSourceSpan$1, keySpan: ParseSourceSpan$1, valueSpan?: ParseSourceSpan$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class Reference implements Node {
    name: string;
    value: string;
    sourceSpan: ParseSourceSpan$1;
    readonly keySpan: ParseSourceSpan$1;
    valueSpan?: ParseSourceSpan$1 | undefined;
    constructor(name: string, value: string, sourceSpan: ParseSourceSpan$1, keySpan: ParseSourceSpan$1, valueSpan?: ParseSourceSpan$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
declare class Icu implements Node {
    vars: {
        [name: string]: BoundText;
    };
    placeholders: {
        [name: string]: Text | BoundText;
    };
    sourceSpan: ParseSourceSpan$1;
    i18n?: I18nMeta$1 | undefined;
    constructor(vars: {
        [name: string]: BoundText;
    }, placeholders: {
        [name: string]: Text | BoundText;
    }, sourceSpan: ParseSourceSpan$1, i18n?: I18nMeta$1 | undefined);
    visit<Result>(visitor: Visitor<Result>): Result;
}
/**
 * AST node that represents the host element of a directive.
 * This node is used only for type checking purposes and cannot be produced from a user's template.
 */
declare class HostElement implements Node {
    readonly tagNames: string[];
    readonly bindings: BoundAttribute[];
    readonly listeners: BoundEvent[];
    readonly sourceSpan: ParseSourceSpan$1;
    constructor(tagNames: string[], bindings: BoundAttribute[], listeners: BoundEvent[], sourceSpan: ParseSourceSpan$1);
    visit<Result>(): Result;
}
interface Visitor<Result = any> {
    visit?(node: Node): Result;
    visitElement(element: Element): Result;
    visitTemplate(template: Template): Result;
    visitContent(content: Content): Result;
    visitVariable(variable: Variable): Result;
    visitReference(reference: Reference): Result;
    visitTextAttribute(attribute: TextAttribute): Result;
    visitBoundAttribute(attribute: BoundAttribute): Result;
    visitBoundEvent(attribute: BoundEvent): Result;
    visitText(text: Text): Result;
    visitBoundText(text: BoundText): Result;
    visitIcu(icu: Icu): Result;
    visitDeferredBlock(deferred: DeferredBlock): Result;
    visitDeferredBlockPlaceholder(block: DeferredBlockPlaceholder): Result;
    visitDeferredBlockError(block: DeferredBlockError): Result;
    visitDeferredBlockLoading(block: DeferredBlockLoading): Result;
    visitDeferredTrigger(trigger: DeferredTrigger): Result;
    visitSwitchBlock(block: SwitchBlock): Result;
    visitSwitchBlockCase(block: SwitchBlockCase): Result;
    visitForLoopBlock(block: ForLoopBlock): Result;
    visitForLoopBlockEmpty(block: ForLoopBlockEmpty): Result;
    visitIfBlock(block: IfBlock): Result;
    visitIfBlockBranch(block: IfBlockBranch): Result;
    visitUnknownBlock(block: UnknownBlock): Result;
    visitLetDeclaration(decl: LetDeclaration): Result;
    visitComponent(component: Component): Result;
    visitDirective(directive: Directive): Result;
}
declare class RecursiveVisitor implements Visitor<void> {
    visitElement(element: Element): void;
    visitTemplate(template: Template): void;
    visitDeferredBlock(deferred: DeferredBlock): void;
    visitDeferredBlockPlaceholder(block: DeferredBlockPlaceholder): void;
    visitDeferredBlockError(block: DeferredBlockError): void;
    visitDeferredBlockLoading(block: DeferredBlockLoading): void;
    visitSwitchBlock(block: SwitchBlock): void;
    visitSwitchBlockCase(block: SwitchBlockCase): void;
    visitForLoopBlock(block: ForLoopBlock): void;
    visitForLoopBlockEmpty(block: ForLoopBlockEmpty): void;
    visitIfBlock(block: IfBlock): void;
    visitIfBlockBranch(block: IfBlockBranch): void;
    visitContent(content: Content): void;
    visitComponent(component: Component): void;
    visitDirective(directive: Directive): void;
    visitVariable(variable: Variable): void;
    visitReference(reference: Reference): void;
    visitTextAttribute(attribute: TextAttribute): void;
    visitBoundAttribute(attribute: BoundAttribute): void;
    visitBoundEvent(attribute: BoundEvent): void;
    visitText(text: Text): void;
    visitBoundText(text: BoundText): void;
    visitIcu(icu: Icu): void;
    visitDeferredTrigger(trigger: DeferredTrigger): void;
    visitUnknownBlock(block: UnknownBlock): void;
    visitLetDeclaration(decl: LetDeclaration): void;
}
declare function visitAll<Result>(visitor: Visitor<Result>, nodes: Node[]): Result[];

/**
 * Information needed to compile a directive for the render3 runtime.
 */
interface R3DirectiveMetadata {
    /**
     * Name of the directive type.
     */
    name: string;
    /**
     * An expression representing a reference to the directive itself.
     */
    type: R3Reference;
    /**
     * Number of generic type parameters of the type itself.
     */
    typeArgumentCount: number;
    /**
     * A source span for the directive type.
     */
    typeSourceSpan: ParseSourceSpan$1;
    /**
     * Dependencies of the directive's constructor.
     */
    deps: R3DependencyMetadata[] | 'invalid' | null;
    /**
     * Unparsed selector of the directive, or `null` if there was no selector.
     */
    selector: string | null;
    /**
     * Information about the content queries made by the directive.
     */
    queries: R3QueryMetadata[];
    /**
     * Information about the view queries made by the directive.
     */
    viewQueries: R3QueryMetadata[];
    /**
     * Mappings indicating how the directive interacts with its host element (host bindings,
     * listeners, etc).
     */
    host: R3HostMetadata;
    /**
     * Information about usage of specific lifecycle events which require special treatment in the
     * code generator.
     */
    lifecycle: {
        /**
         * Whether the directive uses NgOnChanges.
         */
        usesOnChanges: boolean;
    };
    /**
     * A mapping of inputs from class property names to binding property names, or to a tuple of
     * binding property name and class property name if the names are different.
     */
    inputs: {
        [field: string]: R3InputMetadata;
    };
    /**
     * A mapping of outputs from class property names to binding property names, or to a tuple of
     * binding property name and class property name if the names are different.
     */
    outputs: {
        [field: string]: string;
    };
    /**
     * Whether or not the component or directive inherits from another class
     */
    usesInheritance: boolean;
    /**
     * Whether or not the component or directive inherits its entire decorator from its base class.
     */
    fullInheritance: boolean;
    /**
     * Reference name under which to export the directive's type in a template,
     * if any.
     */
    exportAs: string[] | null;
    /**
     * The list of providers defined in the directive.
     */
    providers: Expression | null;
    /**
     * Whether or not the component or directive is standalone.
     */
    isStandalone: boolean;
    /**
     * Whether or not the component or directive is signal-based.
     */
    isSignal: boolean;
    /**
     * Additional directives applied to the directive host.
     */
    hostDirectives: R3HostDirectiveMetadata[] | null;
}
/**
 * Defines how dynamic imports for deferred dependencies should be emitted in the
 * generated output:
 *  - either in a function on per-component basis (in case of local compilation)
 *  - or in a function on per-block basis (in full compilation mode)
 */
declare const enum DeferBlockDepsEmitMode {
    /**
     * Dynamic imports are grouped on per-block basis.
     *
     * This is used in full compilation mode, when compiler has more information
     * about particular dependencies that belong to this block.
     */
    PerBlock = 0,
    /**
     * Dynamic imports are grouped on per-component basis.
     *
     * In local compilation, compiler doesn't have enough information to determine
     * which deferred dependencies belong to which block. In this case we group all
     * dynamic imports into a single file on per-component basis.
     */
    PerComponent = 1
}
/**
 * Specifies how a list of declaration type references should be emitted into the generated code.
 */
declare const enum DeclarationListEmitMode {
    /**
     * The list of declarations is emitted into the generated code as is.
     *
     * ```ts
     * directives: [MyDir],
     * ```
     */
    Direct = 0,
    /**
     * The list of declarations is emitted into the generated code wrapped inside a closure, which
     * is needed when at least one declaration is a forward reference.
     *
     * ```ts
     * directives: function () { return [MyDir, ForwardDir]; },
     * ```
     */
    Closure = 1,
    /**
     * Similar to `Closure`, with the addition that the list of declarations can contain individual
     * items that are themselves forward references. This is relevant for JIT compilations, as
     * unwrapping the forwardRef cannot be done statically so must be deferred. This mode emits
     * the declaration list using a mapping transform through `resolveForwardRef` to ensure that
     * any forward references within the list are resolved when the outer closure is invoked.
     *
     * Consider the case where the runtime has captured two declarations in two distinct values:
     * ```ts
     * const dirA = MyDir;
     * const dirB = forwardRef(function() { return ForwardRef; });
     * ```
     *
     * This mode would emit the declarations captured in `dirA` and `dirB` as follows:
     * ```ts
     * directives: function () { return [dirA, dirB].map(ng.resolveForwardRef); },
     * ```
     */
    ClosureResolved = 2,
    RuntimeResolved = 3
}
/**
 * Information needed to compile a component for the render3 runtime.
 */
interface R3ComponentMetadata<DeclarationT extends R3TemplateDependency> extends R3DirectiveMetadata {
    /**
     * Information about the component's template.
     */
    template: {
        /**
         * Parsed nodes of the template.
         */
        nodes: Node[];
        /**
         * Any ng-content selectors extracted from the template. Contains `*` when an ng-content
         * element without selector is present.
         */
        ngContentSelectors: string[];
        /**
         * Whether the template preserves whitespaces from the user's code.
         */
        preserveWhitespaces?: boolean;
    };
    declarations: DeclarationT[];
    /** Metadata related to the deferred blocks in the component's template. */
    defer: R3ComponentDeferMetadata;
    /**
     * Specifies how the 'directives' and/or `pipes` array, if generated, need to be emitted.
     */
    declarationListEmitMode: DeclarationListEmitMode;
    /**
     * A collection of styling data that will be applied and scoped to the component.
     */
    styles: string[];
    /**
     * A collection of style paths for external stylesheets that will be applied and scoped to the component.
     */
    externalStyles?: string[];
    /**
     * An encapsulation policy for the component's styling.
     * Possible values:
     * - `ViewEncapsulation.Emulated`: Apply modified component styles in order to emulate
     *                                 a native Shadow DOM CSS encapsulation behavior.
     * - `ViewEncapsulation.None`: Apply component styles globally without any sort of encapsulation.
     * - `ViewEncapsulation.ShadowDom`: Use the browser's native Shadow DOM API to encapsulate styles.
     */
    encapsulation: ViewEncapsulation$1;
    /**
     * A collection of animation triggers that will be used in the component template.
     */
    animations: Expression | null;
    /**
     * The list of view providers defined in the component.
     */
    viewProviders: Expression | null;
    /**
     * Path to the .ts file in which this template's generated code will be included, relative to
     * the compilation root. This will be used to generate identifiers that need to be globally
     * unique in certain contexts (such as g3).
     */
    relativeContextFilePath: string;
    /**
     * Whether translation variable name should contain external message id
     * (used by Closure Compiler's output of `goog.getMsg` for transition period).
     */
    i18nUseExternalIds: boolean;
    /**
     * Overrides the default interpolation start and end delimiters ({{ and }}).
     */
    interpolation: InterpolationConfig;
    /**
     * Strategy used for detecting changes in the component.
     *
     * In global compilation mode the value is ChangeDetectionStrategy if available as it is
     * statically resolved during analysis phase. Whereas in local compilation mode the value is the
     * expression as appears in the decorator.
     */
    changeDetection: ChangeDetectionStrategy$1 | Expression | null;
    /**
     * Relative path to the component's template from the root of the project.
     * Used to generate debugging information.
     */
    relativeTemplatePath: string | null;
    /**
     * The imports expression as appears on the component decorate for standalone component. This
     * field is currently needed only for local compilation, and so in other compilation modes it may
     * not be set. If component has empty array imports then this field is not set.
     */
    rawImports?: Expression;
}
/**
 * Information about the deferred blocks in a component's template.
 */
type R3ComponentDeferMetadata = {
    mode: DeferBlockDepsEmitMode.PerBlock;
    blocks: Map<DeferredBlock, Expression | null>;
} | {
    mode: DeferBlockDepsEmitMode.PerComponent;
    dependenciesFn: Expression | null;
};
/**
 * Metadata for an individual input on a directive.
 */
interface R3InputMetadata {
    classPropertyName: string;
    bindingPropertyName: string;
    required: boolean;
    isSignal: boolean;
    /**
     * Transform function for the input.
     *
     * Null if there is no transform, or if this is a signal input.
     * Signal inputs capture their transform as part of the `InputSignal`.
     */
    transformFunction: Expression | null;
}
declare enum R3TemplateDependencyKind {
    Directive = 0,
    Pipe = 1,
    NgModule = 2
}
/**
 * A dependency that's used within a component template.
 */
interface R3TemplateDependency {
    kind: R3TemplateDependencyKind;
    /**
     * The type of the dependency as an expression.
     */
    type: Expression;
}
/**
 * A dependency that's used within a component template
 */
type R3TemplateDependencyMetadata = R3DirectiveDependencyMetadata | R3PipeDependencyMetadata | R3NgModuleDependencyMetadata;
/**
 * Information about a directive that is used in a component template. Only the stable, public
 * facing information of the directive is stored here.
 */
interface R3DirectiveDependencyMetadata extends R3TemplateDependency {
    kind: R3TemplateDependencyKind.Directive;
    /**
     * The selector of the directive.
     */
    selector: string;
    /**
     * The binding property names of the inputs of the directive.
     */
    inputs: string[];
    /**
     * The binding property names of the outputs of the directive.
     */
    outputs: string[];
    /**
     * Name under which the directive is exported, if any (exportAs in Angular). Null otherwise.
     */
    exportAs: string[] | null;
    /**
     * If true then this directive is actually a component; otherwise it is not.
     */
    isComponent: boolean;
}
interface R3PipeDependencyMetadata extends R3TemplateDependency {
    kind: R3TemplateDependencyKind.Pipe;
    name: string;
}
interface R3NgModuleDependencyMetadata extends R3TemplateDependency {
    kind: R3TemplateDependencyKind.NgModule;
}
/**
 * Information needed to compile a query (view or content).
 */
interface R3QueryMetadata {
    /**
     * Name of the property on the class to update with query results.
     */
    propertyName: string;
    /**
     * Whether to read only the first matching result, or an array of results.
     */
    first: boolean;
    /**
     * Either an expression representing a type or `InjectionToken` for the query
     * predicate, or a set of string selectors.
     *
     * Note: At compile time we split selectors as an optimization that avoids this
     * extra work at runtime creation phase.
     *
     * Notably, if the selector is not statically analyzable due to an expression,
     * the selectors may need to be split up at runtime.
     */
    predicate: MaybeForwardRefExpression | string[];
    /**
     * Whether to include only direct children or all descendants.
     */
    descendants: boolean;
    /**
     * If the `QueryList` should fire change event only if actual change to query was computed (vs old
     * behavior where the change was fired whenever the query was recomputed, even if the recomputed
     * query resulted in the same list.)
     */
    emitDistinctChangesOnly: boolean;
    /**
     * An expression representing a type to read from each matched node, or null if the default value
     * for a given node is to be returned.
     */
    read: Expression | null;
    /**
     * Whether or not this query should collect only static results.
     *
     * If static is true, the query's results will be set on the component after nodes are created,
     * but before change detection runs. This means that any results that relied upon change detection
     * to run (e.g. results inside *ngIf or *ngFor views) will not be collected. Query results are
     * available in the ngOnInit hook.
     *
     * If static is false, the query's results will be set on the component after change detection
     * runs. This means that the query results can contain nodes inside *ngIf or *ngFor views, but
     * the results will not be available in the ngOnInit hook (only in the ngAfterContentInit for
     * content hooks and ngAfterViewInit for view hooks).
     *
     * Note: For signal-based queries, this option does not have any effect.
     */
    static: boolean;
    /** Whether the query is signal-based. */
    isSignal: boolean;
}
/**
 * Mappings indicating how the class interacts with its
 * host element (host bindings, listeners, etc).
 */
interface R3HostMetadata {
    /**
     * A mapping of attribute binding keys to `o.Expression`s.
     */
    attributes: {
        [key: string]: Expression;
    };
    /**
     * A mapping of event binding keys to unparsed expressions.
     */
    listeners: {
        [key: string]: string;
    };
    /**
     * A mapping of property binding keys to unparsed expressions.
     */
    properties: {
        [key: string]: string;
    };
    specialAttributes: {
        styleAttr?: string;
        classAttr?: string;
    };
}
/**
 * Information needed to compile a host directive for the render3 runtime.
 */
interface R3HostDirectiveMetadata {
    /** An expression representing the host directive class itself. */
    directive: R3Reference;
    /** Whether the expression referring to the host directive is a forward reference. */
    isForwardReference: boolean;
    /** Inputs from the host directive that will be exposed on the host. */
    inputs: {
        [publicName: string]: string;
    } | null;
    /** Outputs from the host directive that will be exposed on the host. */
    outputs: {
        [publicName: string]: string;
    } | null;
}
/**
 * Information needed to compile the defer block resolver function.
 */
type R3DeferResolverFunctionMetadata = {
    mode: DeferBlockDepsEmitMode.PerBlock;
    dependencies: R3DeferPerBlockDependency[];
} | {
    mode: DeferBlockDepsEmitMode.PerComponent;
    dependencies: R3DeferPerComponentDependency[];
};
/**
 * Information about a single dependency of a defer block in `PerBlock` mode.
 */
interface R3DeferPerBlockDependency {
    /**
     * Reference to a dependency.
     */
    typeReference: Expression;
    /**
     * Dependency class name.
     */
    symbolName: string;
    /**
     * Whether this dependency can be defer-loaded.
     */
    isDeferrable: boolean;
    /**
     * Import path where this dependency is located.
     */
    importPath: string | null;
    /**
     * Whether the symbol is the default export.
     */
    isDefaultImport: boolean;
}
/**
 * Information about a single dependency of a defer block in `PerComponent` mode.
 */
interface R3DeferPerComponentDependency {
    /**
     * Dependency class name.
     */
    symbolName: string;
    /**
     * Import path where this dependency is located.
     */
    importPath: string;
    /**
     * Whether the symbol is the default export.
     */
    isDefaultImport: boolean;
}

type CompileClassMetadataFn = (metadata: R3ClassMetadata) => Expression;
/**
 * Metadata of a class which captures the original Angular decorators of a class. The original
 * decorators are preserved in the generated code to allow TestBed APIs to recompile the class
 * using the original decorator with a set of overrides applied.
 */
interface R3ClassMetadata {
    /**
     * The class type for which the metadata is captured.
     */
    type: Expression;
    /**
     * An expression representing the Angular decorators that were applied on the class.
     */
    decorators: Expression;
    /**
     * An expression representing the Angular decorators applied to constructor parameters, or `null`
     * if there is no constructor.
     */
    ctorParameters: Expression | null;
    /**
     * An expression representing the Angular decorators that were applied on the properties of the
     * class, or `null` if no properties have decorators.
     */
    propDecorators: Expression | null;
}
declare function compileClassMetadata(metadata: R3ClassMetadata): InvokeFunctionExpr;
/**
 * Wraps the `setClassMetadata` function with extra logic that dynamically
 * loads dependencies from `@defer` blocks.
 *
 * Generates a call like this:
 * ```ts
 * setClassMetadataAsync(type, () => [
 *   import('./cmp-a').then(m => m.CmpA);
 *   import('./cmp-b').then(m => m.CmpB);
 * ], (CmpA, CmpB) => {
 *   setClassMetadata(type, decorators, ctorParameters, propParameters);
 * });
 * ```
 *
 * Similar to the `setClassMetadata` call, it's wrapped into the `ngDevMode`
 * check to tree-shake away this code in production mode.
 */
declare function compileComponentClassMetadata(metadata: R3ClassMetadata, dependencies: R3DeferPerComponentDependency[] | null): Expression;
/**
 * Identical to `compileComponentClassMetadata`. Used for the cases where we're unable to
 * analyze the deferred block dependencies, but we have a reference to the compiled
 * dependency resolver function that we can use as is.
 * @param metadata Class metadata for the internal `setClassMetadata` call.
 * @param deferResolver Expression representing the deferred dependency loading function.
 * @param deferredDependencyNames Names of the dependencies that are being loaded asynchronously.
 */
declare function compileOpaqueAsyncClassMetadata(metadata: R3ClassMetadata, deferResolver: Expression, deferredDependencyNames: string[]): Expression;

declare function compileDeclareClassMetadata(metadata: R3ClassMetadata): Expression;
declare function compileComponentDeclareClassMetadata(metadata: R3ClassMetadata, dependencies: R3DeferPerComponentDependency[] | null): Expression;

declare abstract class ElementSchemaRegistry {
    abstract hasProperty(tagName: string, propName: string, schemaMetas: SchemaMetadata[]): boolean;
    abstract hasElement(tagName: string, schemaMetas: SchemaMetadata[]): boolean;
    abstract securityContext(elementName: string, propName: string, isAttribute: boolean): SecurityContext;
    abstract allKnownElementNames(): string[];
    abstract getMappedPropName(propName: string): string;
    abstract getDefaultComponentElementName(): string;
    abstract validateProperty(name: string): {
        error: boolean;
        msg?: string;
    };
    abstract validateAttribute(name: string): {
        error: boolean;
        msg?: string;
    };
    abstract normalizeAnimationStyleProperty(propName: string): string;
    abstract normalizeAnimationStyleValue(camelCaseProp: string, userProvidedProp: string, val: string | number): {
        error: string;
        value: string;
    };
}

interface HostProperties {
    [key: string]: string;
}
interface HostListeners {
    [key: string]: string;
}
/**
 * Parses bindings in templates and in the directive host area.
 */
declare class BindingParser {
    private _exprParser;
    private _interpolationConfig;
    private _schemaRegistry;
    errors: ParseError[];
    constructor(_exprParser: Parser, _interpolationConfig: InterpolationConfig, _schemaRegistry: ElementSchemaRegistry, errors: ParseError[]);
    get interpolationConfig(): InterpolationConfig;
    createBoundHostProperties(properties: HostProperties, sourceSpan: ParseSourceSpan$1): ParsedProperty[] | null;
    createDirectiveHostEventAsts(hostListeners: HostListeners, sourceSpan: ParseSourceSpan$1): ParsedEvent[] | null;
    parseInterpolation(value: string, sourceSpan: ParseSourceSpan$1, interpolatedTokens: InterpolatedAttributeToken[] | InterpolatedTextToken[] | null): ASTWithSource;
    /**
     * Similar to `parseInterpolation`, but treats the provided string as a single expression
     * element that would normally appear within the interpolation prefix and suffix (`{{` and `}}`).
     * This is used for parsing the switch expression in ICUs.
     */
    parseInterpolationExpression(expression: string, sourceSpan: ParseSourceSpan$1): ASTWithSource;
    /**
     * Parses the bindings in a microsyntax expression, and converts them to
     * `ParsedProperty` or `ParsedVariable`.
     *
     * @param tplKey template binding name
     * @param tplValue template binding value
     * @param sourceSpan span of template binding relative to entire the template
     * @param absoluteValueOffset start of the tplValue relative to the entire template
     * @param targetMatchableAttrs potential attributes to match in the template
     * @param targetProps target property bindings in the template
     * @param targetVars target variables in the template
     */
    parseInlineTemplateBinding(tplKey: string, tplValue: string, sourceSpan: ParseSourceSpan$1, absoluteValueOffset: number, targetMatchableAttrs: string[][], targetProps: ParsedProperty[], targetVars: ParsedVariable[], isIvyAst: boolean): void;
    /**
     * Parses the bindings in a microsyntax expression, e.g.
     * ```html
     *    <tag *tplKey="let value1 = prop; let value2 = localVar">
     * ```
     *
     * @param tplKey template binding name
     * @param tplValue template binding value
     * @param sourceSpan span of template binding relative to entire the template
     * @param absoluteKeyOffset start of the `tplKey`
     * @param absoluteValueOffset start of the `tplValue`
     */
    private _parseTemplateBindings;
    parseLiteralAttr(name: string, value: string | null, sourceSpan: ParseSourceSpan$1, absoluteOffset: number, valueSpan: ParseSourceSpan$1 | undefined, targetMatchableAttrs: string[][], targetProps: ParsedProperty[], keySpan: ParseSourceSpan$1): void;
    parsePropertyBinding(name: string, expression: string, isHost: boolean, isPartOfAssignmentBinding: boolean, sourceSpan: ParseSourceSpan$1, absoluteOffset: number, valueSpan: ParseSourceSpan$1 | undefined, targetMatchableAttrs: string[][], targetProps: ParsedProperty[], keySpan: ParseSourceSpan$1): void;
    parsePropertyInterpolation(name: string, value: string, sourceSpan: ParseSourceSpan$1, valueSpan: ParseSourceSpan$1 | undefined, targetMatchableAttrs: string[][], targetProps: ParsedProperty[], keySpan: ParseSourceSpan$1, interpolatedTokens: InterpolatedAttributeToken[] | InterpolatedTextToken[] | null): boolean;
    private _parsePropertyAst;
    private _parseAnimation;
    parseBinding(value: string, isHostBinding: boolean, sourceSpan: ParseSourceSpan$1, absoluteOffset: number): ASTWithSource;
    createBoundElementProperty(elementSelector: string | null, boundProp: ParsedProperty, skipValidation?: boolean, mapPropertyName?: boolean): BoundElementProperty;
    parseEvent(name: string, expression: string, isAssignmentEvent: boolean, sourceSpan: ParseSourceSpan$1, handlerSpan: ParseSourceSpan$1, targetMatchableAttrs: string[][], targetEvents: ParsedEvent[], keySpan: ParseSourceSpan$1): void;
    calcPossibleSecurityContexts(selector: string, propName: string, isAttribute: boolean): SecurityContext[];
    parseEventListenerName(rawName: string): {
        eventName: string;
        target: string | null;
    };
    parseAnimationEventName(rawName: string): {
        eventName: string;
        phase: string | null;
    };
    private _parseAnimationEvent;
    private _parseRegularEvent;
    private _parseAction;
    private _reportError;
    private _reportExpressionParserErrors;
    /**
     * @param propName the name of the property / attribute
     * @param sourceSpan
     * @param isAttr true when binding to an attribute
     */
    private _validatePropertyOrAttributeName;
    /**
     * Returns whether a parsed AST is allowed to be used within the event side of a two-way binding.
     * @param ast Parsed AST to be checked.
     */
    private _isAllowedAssignmentEvent;
}

/**
 * Options that can be used to modify how a template is parsed by `parseTemplate()`.
 */
interface ParseTemplateOptions {
    /**
     * Include whitespace nodes in the parsed output.
     */
    preserveWhitespaces?: boolean;
    /**
     * Preserve original line endings instead of normalizing '\r\n' endings to '\n'.
     */
    preserveLineEndings?: boolean;
    /**
     * Preserve whitespace significant to rendering.
     */
    preserveSignificantWhitespace?: boolean;
    /**
     * How to parse interpolation markers.
     */
    interpolationConfig?: InterpolationConfig;
    /**
     * The start and end point of the text to parse within the `source` string.
     * The entire `source` string is parsed if this is not provided.
     * */
    range?: LexerRange;
    /**
     * If this text is stored in a JavaScript string, then we have to deal with escape sequences.
     *
     * **Example 1:**
     *
     * ```
     * "abc\"def\nghi"
     * ```
     *
     * - The `\"` must be converted to `"`.
     * - The `\n` must be converted to a new line character in a token,
     *   but it should not increment the current line for source mapping.
     *
     * **Example 2:**
     *
     * ```
     * "abc\
     *  def"
     * ```
     *
     * The line continuation (`\` followed by a newline) should be removed from a token
     * but the new line should increment the current line for source mapping.
     */
    escapedString?: boolean;
    /**
     * An array of characters that should be considered as leading trivia.
     * Leading trivia are characters that are not important to the developer, and so should not be
     * included in source-map segments.  A common example is whitespace.
     */
    leadingTriviaChars?: string[];
    /**
     * Render `$localize` message ids with additional legacy message ids.
     *
     * This option defaults to `true` but in the future the default will be flipped.
     *
     * For now set this option to false if you have migrated the translation files to use the new
     * `$localize` message id format and you are not using compile time translation merging.
     */
    enableI18nLegacyMessageIdFormat?: boolean;
    /**
     * If this text is stored in an external template (e.g. via `templateUrl`) then we need to decide
     * whether or not to normalize the line-endings (from `\r\n` to `\n`) when processing ICU
     * expressions.
     *
     * If `true` then we will normalize ICU expression line endings.
     * The default is `false`, but this will be switched in a future major release.
     */
    i18nNormalizeLineEndingsInICUs?: boolean;
    /**
     * Whether to always attempt to convert the parsed HTML AST to an R3 AST, despite HTML or i18n
     * Meta parse errors.
     *
     *
     * This option is useful in the context of the language service, where we want to get as much
     * information as possible, despite any errors in the HTML. As an example, a user may be adding
     * a new tag and expecting autocomplete on that tag. In this scenario, the HTML is in an errored
     * state, as there is an incomplete open tag. However, we're still able to convert the HTML AST
     * nodes to R3 AST nodes in order to provide information for the language service.
     *
     * Note that even when `true` the HTML parse and i18n errors are still appended to the errors
     * output, but this is done after converting the HTML AST to R3 AST.
     */
    alwaysAttemptHtmlToR3AstConversion?: boolean;
    /**
     * Include HTML Comment nodes in a top-level comments array on the returned R3 AST.
     *
     * This option is required by tooling that needs to know the location of comment nodes within the
     * AST. A concrete example is @angular-eslint which requires this in order to enable
     * "eslint-disable" comments within HTML templates, which then allows users to turn off specific
     * rules on a case by case basis, instead of for their whole project within a configuration file.
     */
    collectCommentNodes?: boolean;
    /** Whether the @ block syntax is enabled. */
    enableBlockSyntax?: boolean;
    /** Whether the `@let` syntax is enabled. */
    enableLetSyntax?: boolean;
    /** Whether the selectorless syntax is enabled. */
    enableSelectorless?: boolean;
}
/**
 * Parse a template into render3 `Node`s and additional metadata, with no other dependencies.
 *
 * @param template text of the template to parse
 * @param templateUrl URL to use for source mapping of the parsed template
 * @param options options to modify how the template is parsed
 */
declare function parseTemplate(template: string, templateUrl: string, options?: ParseTemplateOptions): ParsedTemplate;
/**
 * Construct a `BindingParser` with a default configuration.
 */
declare function makeBindingParser(interpolationConfig?: InterpolationConfig): BindingParser;
/**
 * Information about the template which was extracted during parsing.
 *
 * This contains the actual parsed template as well as any metadata collected during its parsing,
 * some of which might be useful for re-parsing the template with different options.
 */
interface ParsedTemplate {
    /**
     * Include whitespace nodes in the parsed output.
     */
    preserveWhitespaces?: boolean;
    /**
     * How to parse interpolation markers.
     */
    interpolationConfig?: InterpolationConfig;
    /**
     * Any errors from parsing the template the first time.
     *
     * `null` if there are no errors. Otherwise, the array of errors is guaranteed to be non-empty.
     */
    errors: ParseError[] | null;
    /**
     * The template AST, parsed from the template.
     */
    nodes: Node[];
    /**
     * Any styleUrls extracted from the metadata.
     */
    styleUrls: string[];
    /**
     * Any inline styles extracted from the metadata.
     */
    styles: string[];
    /**
     * Any ng-content selectors extracted from the template.
     */
    ngContentSelectors: string[];
    /**
     * Any R3 Comment Nodes extracted from the template when the `collectCommentNodes` parse template
     * option is enabled.
     */
    commentNodes?: Comment[];
}

/**
 * A css selector contains an element name,
 * css classes and attribute/value pairs with the purpose
 * of selecting subsets out of them.
 */
declare class CssSelector {
    element: string | null;
    classNames: string[];
    /**
     * The selectors are encoded in pairs where:
     * - even locations are attribute names
     * - odd locations are attribute values.
     *
     * Example:
     * Selector: `[key1=value1][key2]` would parse to:
     * ```
     * ['key1', 'value1', 'key2', '']
     * ```
     */
    attrs: string[];
    notSelectors: CssSelector[];
    static parse(selector: string): CssSelector[];
    /**
     * Unescape `\$` sequences from the CSS attribute selector.
     *
     * This is needed because `$` can have a special meaning in CSS selectors,
     * but we might want to match an attribute that contains `$`.
     * [MDN web link for more
     * info](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors).
     * @param attr the attribute to unescape.
     * @returns the unescaped string.
     */
    unescapeAttribute(attr: string): string;
    /**
     * Escape `$` sequences from the CSS attribute selector.
     *
     * This is needed because `$` can have a special meaning in CSS selectors,
     * with this method we are escaping `$` with `\$'.
     * [MDN web link for more
     * info](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors).
     * @param attr the attribute to escape.
     * @returns the escaped string.
     */
    escapeAttribute(attr: string): string;
    isElementSelector(): boolean;
    hasElementSelector(): boolean;
    setElement(element?: string | null): void;
    getAttrs(): string[];
    addAttribute(name: string, value?: string): void;
    addClassName(name: string): void;
    toString(): string;
}
/**
 * Reads a list of CssSelectors and allows to calculate which ones
 * are contained in a given CssSelector.
 */
declare class SelectorMatcher<T = any> {
    static createNotMatcher(notSelectors: CssSelector[]): SelectorMatcher<null>;
    private _elementMap;
    private _elementPartialMap;
    private _classMap;
    private _classPartialMap;
    private _attrValueMap;
    private _attrValuePartialMap;
    private _listContexts;
    addSelectables(cssSelectors: CssSelector[], callbackCtxt?: T): void;
    /**
     * Add an object that can be found later on by calling `match`.
     * @param cssSelector A css selector
     * @param callbackCtxt An opaque object that will be given to the callback of the `match` function
     */
    private _addSelectable;
    private _addTerminal;
    private _addPartial;
    /**
     * Find the objects that have been added via `addSelectable`
     * whose css selector is contained in the given css selector.
     * @param cssSelector A css selector
     * @param matchedCallback This callback will be called with the object handed into `addSelectable`
     * @return boolean true if a match was found
     */
    match(cssSelector: CssSelector, matchedCallback: ((c: CssSelector, a: T) => void) | null): boolean;
}
declare class SelectorListContext {
    selectors: CssSelector[];
    alreadyMatched: boolean;
    constructor(selectors: CssSelector[]);
}
declare class SelectorContext<T = any> {
    selector: CssSelector;
    cbContext: T;
    listContext: SelectorListContext;
    notSelectors: CssSelector[];
    constructor(selector: CssSelector, cbContext: T, listContext: SelectorListContext);
    finalize(cssSelector: CssSelector, callback: ((c: CssSelector, a: T) => void) | null): boolean;
}
declare class SelectorlessMatcher<T = unknown> {
    private registry;
    constructor(registry: Map<string, T[]>);
    match(name: string): T[];
}

/**
 * Creates a `CssSelector` from an AST node.
 */
declare function createCssSelectorFromNode(node: Element | Template): CssSelector;

interface DeclareComponentTemplateInfo {
    /**
     * The string contents of the template.
     *
     * This is the "logical" template string, after expansion of any escaped characters (for inline
     * templates). This may differ from the actual template bytes as they appear in the .ts file.
     */
    content: string;
    /**
     * A full path to the file which contains the template.
     *
     * This can be either the original .ts file if the template is inline, or the .html file if an
     * external file was used.
     */
    sourceUrl: string;
    /**
     * Whether the template was inline (using `template`) or external (using `templateUrl`).
     */
    isInline: boolean;
    /**
     * If the template was defined inline by a direct string literal, then this is that literal
     * expression. Otherwise `null`, if the template was not defined inline or was not a literal.
     */
    inlineTemplateLiteralExpression: Expression | null;
}
/**
 * Compile a component declaration defined by the `R3ComponentMetadata`.
 */
declare function compileDeclareComponentFromMetadata(meta: R3ComponentMetadata<R3TemplateDependencyMetadata>, template: ParsedTemplate, additionalTemplateInfo: DeclareComponentTemplateInfo): R3CompiledExpression;

/**
 * Compile a directive declaration defined by the `R3DirectiveMetadata`.
 */
declare function compileDeclareDirectiveFromMetadata(meta: R3DirectiveMetadata): R3CompiledExpression;

declare function compileDeclareFactoryFunction(meta: R3FactoryMetadata): R3CompiledExpression;

/**
 * Compile a Injectable declaration defined by the `R3InjectableMetadata`.
 */
declare function compileDeclareInjectableFromMetadata(meta: R3InjectableMetadata): R3CompiledExpression;

interface R3InjectorMetadata {
    name: string;
    type: R3Reference;
    providers: Expression | null;
    imports: Expression[];
}
declare function compileInjector(meta: R3InjectorMetadata): R3CompiledExpression;

declare function compileDeclareInjectorFromMetadata(meta: R3InjectorMetadata): R3CompiledExpression;

/**
 * How the selector scope of an NgModule (its declarations, imports, and exports) should be emitted
 * as a part of the NgModule definition.
 */
declare enum R3SelectorScopeMode {
    /**
     * Emit the declarations inline into the module definition.
     *
     * This option is useful in certain contexts where it's known that JIT support is required. The
     * tradeoff here is that this emit style prevents directives and pipes from being tree-shaken if
     * they are unused, but the NgModule is used.
     */
    Inline = 0,
    /**
     * Emit the declarations using a side effectful function call, `ɵɵsetNgModuleScope`, that is
     * guarded with the `ngJitMode` flag.
     *
     * This form of emit supports JIT and can be optimized away if the `ngJitMode` flag is set to
     * false, which allows unused directives and pipes to be tree-shaken.
     */
    SideEffect = 1,
    /**
     * Don't generate selector scopes at all.
     *
     * This is useful for contexts where JIT support is known to be unnecessary.
     */
    Omit = 2
}
/**
 * The type of the NgModule meta data.
 * - Global: Used for full and partial compilation modes which mainly includes R3References.
 * - Local: Used for the local compilation mode which mainly includes the raw expressions as appears
 * in the NgModule decorator.
 */
declare enum R3NgModuleMetadataKind {
    Global = 0,
    Local = 1
}
interface R3NgModuleMetadataCommon {
    kind: R3NgModuleMetadataKind;
    /**
     * An expression representing the module type being compiled.
     */
    type: R3Reference;
    /**
     * How to emit the selector scope values (declarations, imports, exports).
     */
    selectorScopeMode: R3SelectorScopeMode;
    /**
     * The set of schemas that declare elements to be allowed in the NgModule.
     */
    schemas: R3Reference[] | null;
    /** Unique ID or expression representing the unique ID of an NgModule. */
    id: Expression | null;
}
/**
 * Metadata required by the module compiler in full/partial mode to generate a module def (`ɵmod`)
 * for a type.
 */
interface R3NgModuleMetadataGlobal extends R3NgModuleMetadataCommon {
    kind: R3NgModuleMetadataKind.Global;
    /**
     * An array of expressions representing the bootstrap components specified by the module.
     */
    bootstrap: R3Reference[];
    /**
     * An array of expressions representing the directives and pipes declared by the module.
     */
    declarations: R3Reference[];
    /**
     * Those declarations which should be visible to downstream consumers. If not specified, all
     * declarations are made visible to downstream consumers.
     */
    publicDeclarationTypes: Expression[] | null;
    /**
     * An array of expressions representing the imports of the module.
     */
    imports: R3Reference[];
    /**
     * Whether or not to include `imports` in generated type declarations.
     */
    includeImportTypes: boolean;
    /**
     * An array of expressions representing the exports of the module.
     */
    exports: R3Reference[];
    /**
     * Whether to generate closure wrappers for bootstrap, declarations, imports, and exports.
     */
    containsForwardDecls: boolean;
}
/**
 * Metadata required by the module compiler in local mode to generate a module def (`ɵmod`) for a
 * type.
 */
interface R3NgModuleMetadataLocal extends R3NgModuleMetadataCommon {
    kind: R3NgModuleMetadataKind.Local;
    /**
     * The output expression representing the bootstrap components specified by the module.
     */
    bootstrapExpression: Expression | null;
    /**
     * The output expression representing the declarations of the module.
     */
    declarationsExpression: Expression | null;
    /**
     * The output expression representing the imports of the module.
     */
    importsExpression: Expression | null;
    /**
     * The output expression representing the exports of the module.
     */
    exportsExpression: Expression | null;
    /**
     * Local compilation mode always requires scope to be handled using side effect function calls.
     */
    selectorScopeMode: R3SelectorScopeMode.SideEffect;
}
/**
 * Metadata required by the module compiler to generate a module def (`ɵmod`) for a type.
 */
type R3NgModuleMetadata = R3NgModuleMetadataGlobal | R3NgModuleMetadataLocal;
/**
 * Construct an `R3NgModuleDef` for the given `R3NgModuleMetadata`.
 */
declare function compileNgModule(meta: R3NgModuleMetadata): R3CompiledExpression;

declare function compileDeclareNgModuleFromMetadata(meta: R3NgModuleMetadata): R3CompiledExpression;

interface R3PipeMetadata {
    /**
     * Name of the pipe type.
     */
    name: string;
    /**
     * An expression representing a reference to the pipe itself.
     */
    type: R3Reference;
    /**
     * Number of generic type parameters of the type itself.
     */
    typeArgumentCount: number;
    /**
     * Name of the pipe.
     */
    pipeName: string;
    /**
     * Dependencies of the pipe's constructor.
     */
    deps: R3DependencyMetadata[] | null;
    /**
     * Whether the pipe is marked as pure.
     */
    pure: boolean;
    /**
     * Whether the pipe is standalone.
     */
    isStandalone: boolean;
}
declare function compilePipeFromMetadata(metadata: R3PipeMetadata): R3CompiledExpression;

/**
 * Compile a Pipe declaration defined by the `R3PipeMetadata`.
 */
declare function compileDeclarePipeFromMetadata(meta: R3PipeMetadata): R3CompiledExpression;

/**
 * Info needed for runtime errors related to a class, such as the location in which the class is
 * defined.
 */
interface R3ClassDebugInfo {
    /** The class identifier */
    type: Expression;
    /**
     * A string literal containing the original class name as appears in its definition.
     */
    className: Expression;
    /**
     * A string literal containing the relative path of the file in which the class is defined.
     *
     * The path is relative to the project root. The compiler does the best effort to find the project
     * root (e.g., using the rootDir of tsconfig), but if it fails this field is set to null,
     * indicating that the file path was failed to be computed. In this case, the downstream consumers
     * of the debug info will usually ignore the `lineNumber` field as well and just show the
     * `className`. For security reasons we never show the absolute file path and prefer to just
     * return null here.
     */
    filePath: Expression | null;
    /**
     * A number literal number containing the line number in which this class is defined.
     */
    lineNumber: Expression;
    /**
     * Whether to check if this component is being rendered without its NgModule being loaded into the
     * browser. Such checks is carried out only in dev mode.
     */
    forbidOrphanRendering: boolean;
}
/**
 * Generate an ngDevMode guarded call to setClassDebugInfo with the debug info about the class
 * (e.g., the file name in which the class is defined)
 */
declare function compileClassDebugInfo(debugInfo: R3ClassDebugInfo): Expression;

/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

/** Metadata necessary to compile HMR-related code call. */
interface R3HmrMetadata {
    /** Component class for which HMR is being enabled. */
    type: Expression;
    /** Name of the component class. */
    className: string;
    /** File path of the component class. */
    filePath: string;
    /**
     * When the compiler generates new imports, they get produced as namespace imports
     * (e.g. import * as i0 from '@angular/core'). These namespaces have to be captured and passed
     * along to the update callback.
     */
    namespaceDependencies: R3HmrNamespaceDependency[];
    /**
     * HMR update functions cannot contain imports so any locals the generated code depends on
     * (e.g. references to imports within the same file or imported symbols) have to be passed in
     * as function parameters. This array contains the names and runtime representation of the locals.
     */
    localDependencies: {
        name: string;
        runtimeRepresentation: Expression;
    }[];
}
/** HMR dependency on a namespace import. */
interface R3HmrNamespaceDependency {
    /** Module name of the import. */
    moduleName: string;
    /**
     * Name under which to refer to the namespace inside
     * HMR-related code. Must be a valid JS identifier.
     */
    assignedName: string;
}
/**
 * Compiles the expression that initializes HMR for a class.
 * @param meta HMR metadata extracted from the class.
 */
declare function compileHmrInitializer(meta: R3HmrMetadata): Expression;
/**
 * Compiles the HMR update callback for a class.
 * @param definitions Compiled definitions for the class (e.g. `defineComponent` calls).
 * @param constantStatements Supporting constants statements that were generated alongside
 *  the definition.
 * @param meta HMR metadata extracted from the class.
 */
declare function compileHmrUpdateCallback(definitions: {
    name: string;
    initializer: Expression | null;
    statements: Statement[];
}[], constantStatements: Statement[], meta: R3HmrMetadata): DeclareFunctionStmt;

declare class Identifiers {
    static NEW_METHOD: string;
    static TRANSFORM_METHOD: string;
    static PATCH_DEPS: string;
    static core: ExternalReference;
    static namespaceHTML: ExternalReference;
    static namespaceMathML: ExternalReference;
    static namespaceSVG: ExternalReference;
    static element: ExternalReference;
    static elementStart: ExternalReference;
    static elementEnd: ExternalReference;
    static advance: ExternalReference;
    static syntheticHostProperty: ExternalReference;
    static syntheticHostListener: ExternalReference;
    static attribute: ExternalReference;
    static classProp: ExternalReference;
    static elementContainerStart: ExternalReference;
    static elementContainerEnd: ExternalReference;
    static elementContainer: ExternalReference;
    static styleMap: ExternalReference;
    static classMap: ExternalReference;
    static styleProp: ExternalReference;
    static interpolate: ExternalReference;
    static interpolate1: ExternalReference;
    static interpolate2: ExternalReference;
    static interpolate3: ExternalReference;
    static interpolate4: ExternalReference;
    static interpolate5: ExternalReference;
    static interpolate6: ExternalReference;
    static interpolate7: ExternalReference;
    static interpolate8: ExternalReference;
    static interpolateV: ExternalReference;
    static nextContext: ExternalReference;
    static resetView: ExternalReference;
    static templateCreate: ExternalReference;
    static defer: ExternalReference;
    static deferWhen: ExternalReference;
    static deferOnIdle: ExternalReference;
    static deferOnImmediate: ExternalReference;
    static deferOnTimer: ExternalReference;
    static deferOnHover: ExternalReference;
    static deferOnInteraction: ExternalReference;
    static deferOnViewport: ExternalReference;
    static deferPrefetchWhen: ExternalReference;
    static deferPrefetchOnIdle: ExternalReference;
    static deferPrefetchOnImmediate: ExternalReference;
    static deferPrefetchOnTimer: ExternalReference;
    static deferPrefetchOnHover: ExternalReference;
    static deferPrefetchOnInteraction: ExternalReference;
    static deferPrefetchOnViewport: ExternalReference;
    static deferHydrateWhen: ExternalReference;
    static deferHydrateNever: ExternalReference;
    static deferHydrateOnIdle: ExternalReference;
    static deferHydrateOnImmediate: ExternalReference;
    static deferHydrateOnTimer: ExternalReference;
    static deferHydrateOnHover: ExternalReference;
    static deferHydrateOnInteraction: ExternalReference;
    static deferHydrateOnViewport: ExternalReference;
    static deferEnableTimerScheduling: ExternalReference;
    static conditionalCreate: ExternalReference;
    static conditionalBranchCreate: ExternalReference;
    static conditional: ExternalReference;
    static repeater: ExternalReference;
    static repeaterCreate: ExternalReference;
    static repeaterTrackByIndex: ExternalReference;
    static repeaterTrackByIdentity: ExternalReference;
    static componentInstance: ExternalReference;
    static text: ExternalReference;
    static enableBindings: ExternalReference;
    static disableBindings: ExternalReference;
    static getCurrentView: ExternalReference;
    static textInterpolate: ExternalReference;
    static textInterpolate1: ExternalReference;
    static textInterpolate2: ExternalReference;
    static textInterpolate3: ExternalReference;
    static textInterpolate4: ExternalReference;
    static textInterpolate5: ExternalReference;
    static textInterpolate6: ExternalReference;
    static textInterpolate7: ExternalReference;
    static textInterpolate8: ExternalReference;
    static textInterpolateV: ExternalReference;
    static restoreView: ExternalReference;
    static pureFunction0: ExternalReference;
    static pureFunction1: ExternalReference;
    static pureFunction2: ExternalReference;
    static pureFunction3: ExternalReference;
    static pureFunction4: ExternalReference;
    static pureFunction5: ExternalReference;
    static pureFunction6: ExternalReference;
    static pureFunction7: ExternalReference;
    static pureFunction8: ExternalReference;
    static pureFunctionV: ExternalReference;
    static pipeBind1: ExternalReference;
    static pipeBind2: ExternalReference;
    static pipeBind3: ExternalReference;
    static pipeBind4: ExternalReference;
    static pipeBindV: ExternalReference;
    static domProperty: ExternalReference;
    static property: ExternalReference;
    static i18n: ExternalReference;
    static i18nAttributes: ExternalReference;
    static i18nExp: ExternalReference;
    static i18nStart: ExternalReference;
    static i18nEnd: ExternalReference;
    static i18nApply: ExternalReference;
    static i18nPostprocess: ExternalReference;
    static pipe: ExternalReference;
    static projection: ExternalReference;
    static projectionDef: ExternalReference;
    static reference: ExternalReference;
    static inject: ExternalReference;
    static injectAttribute: ExternalReference;
    static directiveInject: ExternalReference;
    static invalidFactory: ExternalReference;
    static invalidFactoryDep: ExternalReference;
    static templateRefExtractor: ExternalReference;
    static forwardRef: ExternalReference;
    static resolveForwardRef: ExternalReference;
    static replaceMetadata: ExternalReference;
    static getReplaceMetadataURL: ExternalReference;
    static ɵɵdefineInjectable: ExternalReference;
    static declareInjectable: ExternalReference;
    static InjectableDeclaration: ExternalReference;
    static resolveWindow: ExternalReference;
    static resolveDocument: ExternalReference;
    static resolveBody: ExternalReference;
    static getComponentDepsFactory: ExternalReference;
    static defineComponent: ExternalReference;
    static declareComponent: ExternalReference;
    static setComponentScope: ExternalReference;
    static ChangeDetectionStrategy: ExternalReference;
    static ViewEncapsulation: ExternalReference;
    static ComponentDeclaration: ExternalReference;
    static FactoryDeclaration: ExternalReference;
    static declareFactory: ExternalReference;
    static FactoryTarget: ExternalReference;
    static defineDirective: ExternalReference;
    static declareDirective: ExternalReference;
    static DirectiveDeclaration: ExternalReference;
    static InjectorDef: ExternalReference;
    static InjectorDeclaration: ExternalReference;
    static defineInjector: ExternalReference;
    static declareInjector: ExternalReference;
    static NgModuleDeclaration: ExternalReference;
    static ModuleWithProviders: ExternalReference;
    static defineNgModule: ExternalReference;
    static declareNgModule: ExternalReference;
    static setNgModuleScope: ExternalReference;
    static registerNgModuleType: ExternalReference;
    static PipeDeclaration: ExternalReference;
    static definePipe: ExternalReference;
    static declarePipe: ExternalReference;
    static declareClassMetadata: ExternalReference;
    static declareClassMetadataAsync: ExternalReference;
    static setClassMetadata: ExternalReference;
    static setClassMetadataAsync: ExternalReference;
    static setClassDebugInfo: ExternalReference;
    static queryRefresh: ExternalReference;
    static viewQuery: ExternalReference;
    static loadQuery: ExternalReference;
    static contentQuery: ExternalReference;
    static viewQuerySignal: ExternalReference;
    static contentQuerySignal: ExternalReference;
    static queryAdvance: ExternalReference;
    static twoWayProperty: ExternalReference;
    static twoWayBindingSet: ExternalReference;
    static twoWayListener: ExternalReference;
    static declareLet: ExternalReference;
    static storeLet: ExternalReference;
    static readContextLet: ExternalReference;
    static attachSourceLocations: ExternalReference;
    static NgOnChangesFeature: ExternalReference;
    static InheritDefinitionFeature: ExternalReference;
    static CopyDefinitionFeature: ExternalReference;
    static ProvidersFeature: ExternalReference;
    static HostDirectivesFeature: ExternalReference;
    static ExternalStylesFeature: ExternalReference;
    static listener: ExternalReference;
    static getInheritedFactory: ExternalReference;
    static sanitizeHtml: ExternalReference;
    static sanitizeStyle: ExternalReference;
    static sanitizeResourceUrl: ExternalReference;
    static sanitizeScript: ExternalReference;
    static sanitizeUrl: ExternalReference;
    static sanitizeUrlOrResourceUrl: ExternalReference;
    static trustConstantHtml: ExternalReference;
    static trustConstantResourceUrl: ExternalReference;
    static validateIframeAttribute: ExternalReference;
    static InputSignalBrandWriteType: {
        name: string;
        moduleName: string;
    };
    static UnwrapDirectiveSignalInputs: {
        name: string;
        moduleName: string;
    };
    static unwrapWritableSignal: {
        name: string;
        moduleName: string;
    };
}

/**
 * Compile a directive for the render3 runtime as defined by the `R3DirectiveMetadata`.
 */
declare function compileDirectiveFromMetadata(meta: R3DirectiveMetadata, constantPool: ConstantPool, bindingParser: BindingParser): R3CompiledExpression;
/**
 * Compile a component for the render3 runtime as defined by the `R3ComponentMetadata`.
 */
declare function compileComponentFromMetadata(meta: R3ComponentMetadata<R3TemplateDependency>, constantPool: ConstantPool, bindingParser: BindingParser): R3CompiledExpression;
interface ParsedHostBindings {
    attributes: {
        [key: string]: Expression;
    };
    listeners: {
        [key: string]: string;
    };
    properties: {
        [key: string]: string;
    };
    specialAttributes: {
        styleAttr?: string;
        classAttr?: string;
    };
}
declare function parseHostBindings(host: {
    [key: string]: string | Expression;
}): ParsedHostBindings;
/**
 * Verifies host bindings and returns the list of errors (if any). Empty array indicates that a
 * given set of host bindings has no errors.
 *
 * @param bindings set of host bindings to verify.
 * @param sourceSpan source span where host bindings were defined.
 * @returns array of errors associated with a given set of host bindings.
 */
declare function verifyHostBindings(bindings: ParsedHostBindings, sourceSpan: ParseSourceSpan$1): ParseError[];
/**
 * Encapsulates a CSS stylesheet with emulated view encapsulation.
 * This allows a stylesheet to be used with an Angular component that
 * is using the `ViewEncapsulation.Emulated` mode.
 *
 * @param style The content of a CSS stylesheet.
 * @param componentIdentifier The identifier to use within the CSS rules.
 * @returns The encapsulated content for the style.
 */
declare function encapsulateStyle(style: string, componentIdentifier?: string): string;
/**
 * Compiles the dependency resolver function for a defer block.
 */
declare function compileDeferResolverFunction(meta: R3DeferResolverFunctionMetadata): ArrowFunctionExpr;

/** Node that has a `Scope` associated with it. */
type ScopedNode = Template | SwitchBlockCase | IfBlockBranch | ForLoopBlock | ForLoopBlockEmpty | DeferredBlock | DeferredBlockError | DeferredBlockLoading | DeferredBlockPlaceholder | Content | HostElement;
/** Possible values that a reference can be resolved to. */
type ReferenceTarget<DirectiveT> = {
    directive: DirectiveT;
    node: DirectiveOwner;
} | Element | Template;
/** Entity that is local to the template and defined within the template. */
type TemplateEntity = Reference | Variable | LetDeclaration;
/** Nodes that can have directives applied to them. */
type DirectiveOwner = Element | Template | Component | Directive;
/**
 * A logical target for analysis, which could contain a template or other types of bindings.
 */
interface Target {
    template?: Node[];
    host?: HostElement;
}
/**
 * A data structure which can indicate whether a given property name is present or not.
 *
 * This is used to represent the set of inputs or outputs present on a directive, and allows the
 * binder to query for the presence of a mapping for property names.
 */
interface InputOutputPropertySet {
    hasBindingPropertyName(propertyName: string): boolean;
}
/**
 * A data structure which captures the animation trigger names that are statically resolvable
 * and whether some names could not be statically evaluated.
 */
interface AnimationTriggerNames {
    includesDynamicAnimations: boolean;
    staticTriggerNames: string[];
}
/**
 * Metadata regarding a directive that's needed to match it against template elements. This is
 * provided by a consumer of the t2 APIs.
 */
interface DirectiveMeta {
    /**
     * Name of the directive class (used for debugging).
     */
    name: string;
    /** The selector for the directive or `null` if there isn't one. */
    selector: string | null;
    /**
     * Whether the directive is a component.
     */
    isComponent: boolean;
    /**
     * Set of inputs which this directive claims.
     *
     * Goes from property names to field names.
     */
    inputs: InputOutputPropertySet;
    /**
     * Set of outputs which this directive claims.
     *
     * Goes from property names to field names.
     */
    outputs: InputOutputPropertySet;
    /**
     * Name under which the directive is exported, if any (exportAs in Angular).
     *
     * Null otherwise
     */
    exportAs: string[] | null;
    /**
     * Whether the directive is a structural directive (e.g. `<div *ngIf></div>`).
     */
    isStructural: boolean;
    /**
     * If the directive is a component, includes the selectors of its `ng-content` elements.
     */
    ngContentSelectors: string[] | null;
    /**
     * Whether the template of the component preserves whitespaces.
     */
    preserveWhitespaces: boolean;
    /**
     * The name of animations that the user defines in the component.
     * Only includes the animation names.
     */
    animationTriggerNames: AnimationTriggerNames | null;
}
/**
 * Interface to the binding API, which processes a template and returns an object similar to the
 * `ts.TypeChecker`.
 *
 * The returned `BoundTarget` has an API for extracting information about the processed target.
 */
interface TargetBinder<D extends DirectiveMeta> {
    bind(target: Target): BoundTarget<D>;
}
/**
 * Result of performing the binding operation against a `Target`.
 *
 * The original `Target` is accessible, as well as a suite of methods for extracting binding
 * information regarding the `Target`.
 *
 * @param DirectiveT directive metadata type
 */
interface BoundTarget<DirectiveT extends DirectiveMeta> {
    /**
     * Get the original `Target` that was bound.
     */
    readonly target: Target;
    /**
     * For a given template node (either an `Element` or a `Template`), get the set of directives
     * which matched the node, if any.
     */
    getDirectivesOfNode(node: DirectiveOwner): DirectiveT[] | null;
    /**
     * For a given `Reference`, get the reference's target - either an `Element`, a `Template`, or
     * a directive on a particular node.
     */
    getReferenceTarget(ref: Reference): ReferenceTarget<DirectiveT> | null;
    /**
     * For a given binding, get the entity to which the binding is being made.
     *
     * This will either be a directive or the node itself.
     */
    getConsumerOfBinding(binding: BoundAttribute | BoundEvent | TextAttribute): DirectiveT | Element | Template | null;
    /**
     * If the given `AST` expression refers to a `Reference` or `Variable` within the `Target`, then
     * return that.
     *
     * Otherwise, returns `null`.
     *
     * This is only defined for `AST` expressions that read or write to a property of an
     * `ImplicitReceiver`.
     */
    getExpressionTarget(expr: AST): TemplateEntity | null;
    /**
     * Given a particular `Reference` or `Variable`, get the `ScopedNode` which created it.
     *
     * All `Variable`s are defined on node, so this will always return a value for a `Variable`
     * from the `Target`. Returns `null` otherwise.
     */
    getDefinitionNodeOfSymbol(symbol: TemplateEntity): ScopedNode | null;
    /**
     * Get the nesting level of a particular `ScopedNode`.
     *
     * This starts at 1 for top-level nodes within the `Target` and increases for nodes
     * nested at deeper levels.
     */
    getNestingLevel(node: ScopedNode): number;
    /**
     * Get all `Reference`s and `Variables` visible within the given `ScopedNode` (or at the top
     * level, if `null` is passed).
     */
    getEntitiesInScope(node: ScopedNode | null): ReadonlySet<TemplateEntity>;
    /**
     * Get a list of all the directives used by the target,
     * including directives from `@defer` blocks.
     */
    getUsedDirectives(): DirectiveT[];
    /**
     * Get a list of eagerly used directives from the target.
     * Note: this list *excludes* directives from `@defer` blocks.
     */
    getEagerlyUsedDirectives(): DirectiveT[];
    /**
     * Get a list of all the pipes used by the target,
     * including pipes from `@defer` blocks.
     */
    getUsedPipes(): string[];
    /**
     * Get a list of eagerly used pipes from the target.
     * Note: this list *excludes* pipes from `@defer` blocks.
     */
    getEagerlyUsedPipes(): string[];
    /**
     * Get a list of all `@defer` blocks used by the target.
     */
    getDeferBlocks(): DeferredBlock[];
    /**
     * Gets the element that a specific deferred block trigger is targeting.
     * @param block Block that the trigger belongs to.
     * @param trigger Trigger whose target is being looked up.
     */
    getDeferredTriggerTarget(block: DeferredBlock, trigger: DeferredTrigger): Element | null;
    /**
     * Whether a given node is located in a `@defer` block.
     */
    isDeferred(node: Element): boolean;
    /**
     * Checks whether a component/directive that was referenced directly in the template exists.
     * @param name Name of the component/directive.
     */
    referencedDirectiveExists(name: string): boolean;
}

/**
 * Given a template string and a set of available directive selectors,
 * computes a list of matching selectors and splits them into 2 buckets:
 * (1) eagerly used in a template and (2) directives used only in defer
 * blocks. Similarly, returns 2 lists of pipes (eager and deferrable).
 *
 * Note: deferrable directives selectors and pipes names used in `@defer`
 * blocks are **candidates** and API caller should make sure that:
 *
 *  * A Component where a given template is defined is standalone
 *  * Underlying dependency classes are also standalone
 *  * Dependency class symbols are not eagerly used in a TS file
 *    where a host component (that owns the template) is located
 */
declare function findMatchingDirectivesAndPipes(template: string, directiveSelectors: string[]): {
    directives: {
        regular: string[];
        deferCandidates: string[];
    };
    pipes: {
        regular: string[];
        deferCandidates: string[];
    };
};
/** Object used to match template nodes to directives. */
type DirectiveMatcher<DirectiveT extends DirectiveMeta> = SelectorMatcher<DirectiveT[]> | SelectorlessMatcher<DirectiveT>;
/**
 * Processes `Target`s with a given set of directives and performs a binding operation, which
 * returns an object similar to TypeScript's `ts.TypeChecker` that contains knowledge about the
 * target.
 */
declare class R3TargetBinder<DirectiveT extends DirectiveMeta> implements TargetBinder<DirectiveT> {
    private directiveMatcher;
    constructor(directiveMatcher: DirectiveMatcher<DirectiveT> | null);
    /**
     * Perform a binding operation on the given `Target` and return a `BoundTarget` which contains
     * metadata about the types referenced in the template.
     */
    bind(target: Target): BoundTarget<DirectiveT>;
}

declare class DomElementSchemaRegistry extends ElementSchemaRegistry {
    private _schema;
    private _eventSchema;
    constructor();
    hasProperty(tagName: string, propName: string, schemaMetas: SchemaMetadata[]): boolean;
    hasElement(tagName: string, schemaMetas: SchemaMetadata[]): boolean;
    /**
     * securityContext returns the security context for the given property on the given DOM tag.
     *
     * Tag and property name are statically known and cannot change at runtime, i.e. it is not
     * possible to bind a value into a changing attribute or tag name.
     *
     * The filtering is based on a list of allowed tags|attributes. All attributes in the schema
     * above are assumed to have the 'NONE' security context, i.e. that they are safe inert
     * string values. Only specific well known attack vectors are assigned their appropriate context.
     */
    securityContext(tagName: string, propName: string, isAttribute: boolean): SecurityContext;
    getMappedPropName(propName: string): string;
    getDefaultComponentElementName(): string;
    validateProperty(name: string): {
        error: boolean;
        msg?: string;
    };
    validateAttribute(name: string): {
        error: boolean;
        msg?: string;
    };
    allKnownElementNames(): string[];
    allKnownAttributesOfElement(tagName: string): string[];
    allKnownEventsOfElement(tagName: string): string[];
    normalizeAnimationStyleProperty(propName: string): string;
    normalizeAnimationStyleValue(camelCaseProp: string, userProvidedProp: string, val: string | number): {
        error: string;
        value: string;
    };
}

/**
 * @module
 * @description
 * Entry point for all public APIs of the compiler package.
 */

declare const VERSION: Version;

/**
 * A set of flags to be used with Queries.
 *
 * NOTE: Ensure changes here are in sync with `packages/core/src/render3/interfaces/query.ts`
 */
declare const enum QueryFlags {
    /**
     * No flags
     */
    none = 0,
    /**
     * Whether or not the query should descend into children.
     */
    descendants = 1,
    /**
     * The query can be computed statically and hence can be assigned eagerly.
     *
     * NOTE: Backwards compatibility with ViewEngine.
     */
    isStatic = 2,
    /**
     * If the `QueryList` should fire change event only if actual change to query was computed (vs old
     * behavior where the change was fired whenever the query was recomputed, even if the recomputed
     * query resulted in the same list.)
     */
    emitDistinctChangesOnly = 4
}

/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * Utility function to enable source locations. Intended to be used **only** inside unit tests.
 */
declare function setEnableTemplateSourceLocations(value: boolean): void;

export { AST, ASTWithName, ASTWithSource, AbsoluteSourceSpan, ArrayType, ArrowFunctionExpr, Attribute, Binary, BinaryOperator, BinaryOperatorExpr, BindingParser, BindingPipe, BindingType, Block, BlockParameter, BoundElementProperty, BuiltinType, BuiltinTypeName, CUSTOM_ELEMENTS_SCHEMA, Call, Chain, ChangeDetectionStrategy$1 as ChangeDetectionStrategy, CommaExpr, Comment$1 as Comment, CompilerConfig, CompilerFacadeImpl, Component$1 as Component, Conditional, ConditionalExpr, ConstantPool, CssSelector, DEFAULT_INTERPOLATION_CONFIG, DYNAMIC_TYPE, DeclarationListEmitMode, DeclareFunctionStmt, DeclareVarStmt, DeferBlockDepsEmitMode, Directive$1 as Directive, DomElementSchemaRegistry, DynamicImportExpr, EOF, Element$1 as Element, ElementSchemaRegistry, EmitterVisitorContext, EmptyExpr, Expansion, ExpansionCase, Expression, ExpressionBinding, ExpressionStatement, ExpressionType, ExternalExpr, ExternalReference, FactoryTarget, ForwardRefHandling, FunctionExpr, HtmlParser, HtmlTagDefinition, I18NHtmlParser, IfStmt, ImplicitReceiver, InstantiateExpr, Interpolation, InterpolationConfig, InvokeFunctionExpr, JSDocComment, JitEvaluator, KeyedRead, KeyedWrite, LeadingComment, LetDeclaration$1 as LetDeclaration, Lexer, TokenType$1 as LexerTokenType, LiteralArray, LiteralArrayExpr, LiteralExpr, LiteralMap, LiteralMapExpr, LiteralPrimitive, LocalizedString, MapType, MessageBundle, NONE_TYPE, NO_ERRORS_SCHEMA, NodeWithI18n, NonNullAssert, NotExpr, ParenthesizedExpr, ParenthesizedExpression, ParseError, ParseErrorLevel, ParseFlags, ParseLocation, ParseSourceFile, ParseSourceSpan$1 as ParseSourceSpan, ParseSpan, ParseTreeResult, ParsedEvent, ParsedEventType, ParsedProperty, ParsedPropertyType, ParsedVariable, Parser, ParserError, PrefixNot, PropertyRead, PropertyWrite, QueryFlags, Identifiers as R3Identifiers, R3NgModuleMetadataKind, R3SelectorScopeMode, R3TargetBinder, R3TemplateDependencyKind, ReadKeyExpr, ReadPropExpr, ReadVarExpr, RecursiveAstVisitor, RecursiveVisitor$1 as RecursiveVisitor, ResourceLoader, ReturnStatement, SECURITY_SCHEMA, STRING_TYPE, SafeCall, SafeKeyedRead, SafePropertyRead, SelectorContext, SelectorListContext, SelectorMatcher, SelectorlessMatcher, Serializer, SplitInterpolation, Statement, StmtModifier, StringToken, StringTokenKind, TagContentType, TaggedTemplateLiteral, TaggedTemplateLiteralExpr, TemplateBindingParseResult, TemplateLiteral, TemplateLiteralElement, TemplateLiteralElementExpr, TemplateLiteralExpr, Text$1 as Text, ThisReceiver, BlockNode as TmplAstBlockNode, BoundAttribute as TmplAstBoundAttribute, BoundDeferredTrigger as TmplAstBoundDeferredTrigger, BoundEvent as TmplAstBoundEvent, BoundText as TmplAstBoundText, Component as TmplAstComponent, Content as TmplAstContent, DeferredBlock as TmplAstDeferredBlock, DeferredBlockError as TmplAstDeferredBlockError, DeferredBlockLoading as TmplAstDeferredBlockLoading, DeferredBlockPlaceholder as TmplAstDeferredBlockPlaceholder, DeferredTrigger as TmplAstDeferredTrigger, Directive as TmplAstDirective, Element as TmplAstElement, ForLoopBlock as TmplAstForLoopBlock, ForLoopBlockEmpty as TmplAstForLoopBlockEmpty, HostElement as TmplAstHostElement, HoverDeferredTrigger as TmplAstHoverDeferredTrigger, Icu as TmplAstIcu, IdleDeferredTrigger as TmplAstIdleDeferredTrigger, IfBlock as TmplAstIfBlock, IfBlockBranch as TmplAstIfBlockBranch, ImmediateDeferredTrigger as TmplAstImmediateDeferredTrigger, InteractionDeferredTrigger as TmplAstInteractionDeferredTrigger, LetDeclaration as TmplAstLetDeclaration, NeverDeferredTrigger as TmplAstNeverDeferredTrigger, RecursiveVisitor as TmplAstRecursiveVisitor, Reference as TmplAstReference, SwitchBlock as TmplAstSwitchBlock, SwitchBlockCase as TmplAstSwitchBlockCase, Template as TmplAstTemplate, Text as TmplAstText, TextAttribute as TmplAstTextAttribute, TimerDeferredTrigger as TmplAstTimerDeferredTrigger, UnknownBlock as TmplAstUnknownBlock, Variable as TmplAstVariable, ViewportDeferredTrigger as TmplAstViewportDeferredTrigger, Token, TokenType, TransplantedType, TreeError, Type$1 as Type, TypeModifier, TypeofExpr, TypeofExpression, Unary, UnaryOperator, UnaryOperatorExpr, VERSION, VariableBinding, Version, ViewEncapsulation$1 as ViewEncapsulation, VoidExpr, VoidExpression, WrappedNodeExpr, WriteKeyExpr, WritePropExpr, WriteVarExpr, Xliff, Xliff2, Xmb, XmlParser, Xtb, compileClassDebugInfo, compileClassMetadata, compileComponentClassMetadata, compileComponentDeclareClassMetadata, compileComponentFromMetadata, compileDeclareClassMetadata, compileDeclareComponentFromMetadata, compileDeclareDirectiveFromMetadata, compileDeclareFactoryFunction, compileDeclareInjectableFromMetadata, compileDeclareInjectorFromMetadata, compileDeclareNgModuleFromMetadata, compileDeclarePipeFromMetadata, compileDeferResolverFunction, compileDirectiveFromMetadata, compileFactoryFunction, compileHmrInitializer, compileHmrUpdateCallback, compileInjectable, compileInjector, compileNgModule, compileOpaqueAsyncClassMetadata, compilePipeFromMetadata, computeMsgId, core_d as core, createCssSelectorFromNode, createInjectableType, createMayBeForwardRefExpression, devOnlyGuardedExpression, emitDistinctChangesOnlyDefaultValue, encapsulateStyle, escapeRegExp, findMatchingDirectivesAndPipes, getHtmlTagDefinition, getNsPrefix, getSafePropertyAccessString, identifierName, isNgContainer, isNgContent, isNgTemplate, jsDocComment, leadingComment, literal, literalMap, makeBindingParser, mergeNsAndName, output_ast_d as outputAst, parseHostBindings, parseTemplate, preserveWhitespacesDefault, publishFacade, r3JitTypeSourceSpan, sanitizeIdentifier, setEnableTemplateSourceLocations, splitNsName, visitAll as tmplAstVisitAll, verifyHostBindings, visitAll$1 as visitAll };
export type { AnimationTriggerNames, AstVisitor, BoundTarget, CompileClassMetadataFn, CompileIdentifierMetadata, DeclareComponentTemplateInfo, DirectiveMatcher, DirectiveMeta, DirectiveOwner, ExpressionVisitor, InputOutputPropertySet, InterpolationPiece, LegacyInputPartialMapping, LexerRange, LiteralMapKey, MaybeForwardRefExpression, Node$1 as Node, ParseTemplateOptions, ParsedHostBindings, ParsedTemplate, R3ClassDebugInfo, R3ClassMetadata, R3CompiledExpression, R3ComponentDeferMetadata, R3ComponentMetadata, R3DeclareClassMetadata, R3DeclareClassMetadataAsync, R3DeclareComponentMetadata, R3DeclareDependencyMetadata, R3DeclareDirectiveDependencyMetadata, R3DeclareDirectiveMetadata, R3DeclareFactoryMetadata, R3DeclareHostDirectiveMetadata, R3DeclareInjectableMetadata, R3DeclareInjectorMetadata, R3DeclareNgModuleDependencyMetadata, R3DeclareNgModuleMetadata, R3DeclarePipeDependencyMetadata, R3DeclarePipeMetadata, R3DeclareQueryMetadata, R3DeclareTemplateDependencyMetadata, R3DeferPerBlockDependency, R3DeferPerComponentDependency, R3DeferResolverFunctionMetadata, R3DependencyMetadata, R3DirectiveDependencyMetadata, R3DirectiveMetadata, R3FactoryMetadata, R3HmrMetadata, R3HmrNamespaceDependency, R3HostDirectiveMetadata, R3HostMetadata, R3InjectableMetadata, R3InjectorMetadata, R3InputMetadata, R3NgModuleDependencyMetadata, R3NgModuleMetadata, R3NgModuleMetadataGlobal, R3PartialDeclaration, R3PipeDependencyMetadata, R3PipeMetadata, R3QueryMetadata, R3Reference, R3TemplateDependency, R3TemplateDependencyMetadata, ReferenceTarget, SchemaMetadata, ScopedNode, SourceMap, StatementVisitor, TagDefinition, Target, TargetBinder, TemplateBinding, TemplateBindingIdentifier, TemplateEntity, DeferredBlockTriggers as TmplAstDeferredBlockTriggers, Node as TmplAstNode, Visitor as TmplAstVisitor, TypeVisitor, Visitor$1 as Visitor };
