/**
 * Declares a copy of the `AbsoluteFsPath` branded type in `@angular/compiler-cli` to avoid an
 * import into `@angular/compiler-cli`. The compiler-cli's declaration files are not necessarily
 * compatible with web environments that use `@angular/localize`, and would inadvertently include
 * `typescript` declaration files in any compilation unit that uses `@angular/localize` (which
 * increases parsing time and memory usage during builds) using a default import that only
 * type-checks when `allowSyntheticDefaultImports` is enabled.
 *
 * @see https://github.com/angular/angular/issues/45179
 */
declare type AbsoluteFsPathLocalizeCopy = string & {
    _brand: 'AbsoluteFsPath';
};

/**
 * Remove all translations for `$localize`, if doing runtime translation.
 *
 * All translations that had been loading into memory using `loadTranslations()` will be removed.
 *
 * @see {@link loadTranslations} for loading translations at runtime.
 * @see {@link $localize} for tagging messages as needing to be translated.
 *
 * @publicApi
 */
export declare function clearTranslations(): void;

/**
 * Load translations for use by `$localize`, if doing runtime translation.
 *
 * If the `$localize` tagged strings are not going to be replaced at compiled time, it is possible
 * to load a set of translations that will be applied to the `$localize` tagged strings at runtime,
 * in the browser.
 *
 * Loading a new translation will overwrite a previous translation if it has the same `MessageId`.
 *
 * Note that `$localize` messages are only processed once, when the tagged string is first
 * encountered, and does not provide dynamic language changing without refreshing the browser.
 * Loading new translations later in the application life-cycle will not change the translated text
 * of messages that have already been translated.
 *
 * The message IDs and translations are in the same format as that rendered to "simple JSON"
 * translation files when extracting messages. In particular, placeholders in messages are rendered
 * using the `{$PLACEHOLDER_NAME}` syntax. For example the message from the following template:
 *
 * ```html
 * <div i18n>pre<span>inner-pre<b>bold</b>inner-post</span>post</div>
 * ```
 *
 * would have the following form in the `translations` map:
 *
 * ```ts
 * {
 *   "2932901491976224757":
 *      "pre{$START_TAG_SPAN}inner-pre{$START_BOLD_TEXT}bold{$CLOSE_BOLD_TEXT}inner-post{$CLOSE_TAG_SPAN}post"
 * }
 * ```
 *
 * @param translations A map from message ID to translated message.
 *
 * These messages are processed and added to a lookup based on their `MessageId`.
 *
 * @see {@link clearTranslations} for removing translations loaded using this function.
 * @see {@link $localize} for tagging messages as needing to be translated.
 * @publicApi
 */
export declare function loadTranslations(translations: Record<MessageId, TargetMessage>): void;

/**
 * A string that uniquely identifies a message, to be used for matching translations.
 *
 * @publicApi
 */
export declare type MessageId = string;

/**
 * Additional information that can be associated with a message.
 */
declare interface MessageMetadata {
    /**
     * A human readable rendering of the message
     */
    text: string;
    /**
     * Legacy message ids, if provided.
     *
     * In legacy message formats the message id can only be computed directly from the original
     * template source.
     *
     * Since this information is not available in `$localize` calls, the legacy message ids may be
     * attached by the compiler to the `$localize` metablock so it can be used if needed at the point
     * of translation if the translations are encoded using the legacy message id.
     */
    legacyIds?: string[];
    /**
     * The id of the `message` if a custom one was specified explicitly.
     *
     * This id overrides any computed or legacy ids.
     */
    customId?: string;
    /**
     * The meaning of the `message`, used to distinguish identical `messageString`s.
     */
    meaning?: string;
    /**
     * The description of the `message`, used to aid translation.
     */
    description?: string;
    /**
     * The location of the message in the source.
     */
    location?: ɵSourceLocation;
}

/**
 * A string containing a translation target message.
 *
 * I.E. the message that indicates what will be translated to.
 *
 * Uses `{$placeholder-name}` to indicate a placeholder.
 *
 * @publicApi
 */
export declare type TargetMessage = string;

/**
 * Tag a template literal string for localization.
 *
 * For example:
 *
 * ```ts
 * $localize `some string to localize`
 * ```
 *
 * **Providing meaning, description and id**
 *
 * You can optionally specify one or more of `meaning`, `description` and `id` for a localized
 * string by pre-pending it with a colon delimited block of the form:
 *
 * ```ts
 * $localize`:meaning|description@@id:source message text`;
 *
 * $localize`:meaning|:source message text`;
 * $localize`:description:source message text`;
 * $localize`:@@id:source message text`;
 * ```
 *
 * This format is the same as that used for `i18n` markers in Angular templates. See the
 * [Angular i18n guide](guide/i18n/prepare#mark-text-in-component-template).
 *
 * **Naming placeholders**
 *
 * If the template literal string contains expressions, then the expressions will be automatically
 * associated with placeholder names for you.
 *
 * For example:
 *
 * ```ts
 * $localize `Hi ${name}! There are ${items.length} items.`;
 * ```
 *
 * will generate a message-source of `Hi {$PH}! There are {$PH_1} items`.
 *
 * The recommended practice is to name the placeholder associated with each expression though.
 *
 * Do this by providing the placeholder name wrapped in `:` characters directly after the
 * expression. These placeholder names are stripped out of the rendered localized string.
 *
 * For example, to name the `items.length` expression placeholder `itemCount` you write:
 *
 * ```ts
 * $localize `There are ${items.length}:itemCount: items`;
 * ```
 *
 * **Escaping colon markers**
 *
 * If you need to use a `:` character directly at the start of a tagged string that has no
 * metadata block, or directly after a substitution expression that has no name you must escape
 * the `:` by preceding it with a backslash:
 *
 * For example:
 *
 * ```ts
 * // message has a metadata block so no need to escape colon
 * $localize `:some description::this message starts with a colon (:)`;
 * // no metadata block so the colon must be escaped
 * $localize `\:this message starts with a colon (:)`;
 * ```
 *
 * ```ts
 * // named substitution so no need to escape colon
 * $localize `${label}:label:: ${}`
 * // anonymous substitution so colon must be escaped
 * $localize `${label}\: ${}`
 * ```
 *
 * **Processing localized strings:**
 *
 * There are three scenarios:
 *
 * * **compile-time inlining**: the `$localize` tag is transformed at compile time by a
 * transpiler, removing the tag and replacing the template literal string with a translated
 * literal string from a collection of translations provided to the transpilation tool.
 *
 * * **run-time evaluation**: the `$localize` tag is a run-time function that replaces and
 * reorders the parts (static strings and expressions) of the template literal string with strings
 * from a collection of translations loaded at run-time.
 *
 * * **pass-through evaluation**: the `$localize` tag is a run-time function that simply evaluates
 * the original template literal string without applying any translations to the parts. This
 * version is used during development or where there is no need to translate the localized
 * template literals.
 *
 * @param messageParts a collection of the static parts of the template string.
 * @param expressions a collection of the values of each placeholder in the template string.
 * @returns the translated string, with the `messageParts` and `expressions` interleaved together.
 *
 * @publicApi
 */
export declare const ɵ$localize: ɵLocalizeFn;

export declare function ɵcomputeMsgId(msg: string, meaning?: string): string;

/**
 * Find the end of a "marked block" indicated by the first non-escaped colon.
 *
 * @param cooked The cooked string (where escaped chars have been processed)
 * @param raw The raw string (where escape sequences are still in place)
 *
 * @returns the index of the end of block marker
 * @throws an error if the block is unterminated
 */
export declare function ɵfindEndOfBlock(cooked: string, raw: string): number;

export declare function ɵisMissingTranslationError(e: any): e is ɵMissingTranslationError;


/** @nodoc */
export declare interface ɵLocalizeFn {
    (messageParts: TemplateStringsArray, ...expressions: readonly any[]): string;
    /**
     * A function that converts an input "message with expressions" into a translated "message with
     * expressions".
     *
     * The conversion may be done in place, modifying the array passed to the function, so
     * don't assume that this has no side-effects.
     *
     * The expressions must be passed in since it might be they need to be reordered for
     * different translations.
     */
    translate?: ɵTranslateFn;
    /**
     * The current locale of the translated messages.
     *
     * The compile-time translation inliner is able to replace the following code:
     *
     * ```ts
     * typeof $localize !== "undefined" && $localize.locale
     * ```
     *
     * with a string literal of the current locale. E.g.
     *
     * ```
     * "fr"
     * ```
     */
    locale?: string;
}

/**
 * Create a `ParsedTranslation` from a set of `messageParts` and `placeholderNames`.
 *
 * @param messageParts The message parts to appear in the ParsedTranslation.
 * @param placeholderNames The names of the placeholders to intersperse between the `messageParts`.
 */
export declare function ɵmakeParsedTranslation(messageParts: string[], placeholderNames?: string[]): ɵParsedTranslation;

/**
 * Create the specialized array that is passed to tagged-string tag functions.
 *
 * @param cooked The message parts with their escape codes processed.
 * @param raw The message parts with their escaped codes as-is.
 */
export declare function ɵmakeTemplateObject(cooked: string[], raw: string[]): TemplateStringsArray;

export declare class ɵMissingTranslationError extends Error {
    readonly parsedMessage: ɵParsedMessage;
    private readonly type;
    constructor(parsedMessage: ɵParsedMessage);
}

/**
 * Information parsed from a `$localize` tagged string that is used to translate it.
 *
 * For example:
 *
 * ```ts
 * const name = 'Jo Bloggs';
 * $localize`Hello ${name}:title@@ID:!`;
 * ```
 *
 * May be parsed into:
 *
 * ```ts
 * {
 *   id: '6998194507597730591',
 *   substitutions: { title: 'Jo Bloggs' },
 *   messageString: 'Hello {$title}!',
 *   placeholderNames: ['title'],
 *   associatedMessageIds: { title: 'ID' },
 * }
 * ```
 */
export declare interface ɵParsedMessage extends MessageMetadata {
    /**
     * The key used to look up the appropriate translation target.
     */
    id: MessageId;
    /**
     * A mapping of placeholder names to substitution values.
     */
    substitutions: Record<string, any>;
    /**
     * An optional mapping of placeholder names to associated MessageIds.
     * This can be used to match ICU placeholders to the message that contains the ICU.
     */
    associatedMessageIds?: Record<string, MessageId>;
    /**
     * An optional mapping of placeholder names to source locations
     */
    substitutionLocations?: Record<string, ɵSourceLocation | undefined>;
    /**
     * The static parts of the message.
     */
    messageParts: string[];
    /**
     * An optional mapping of message parts to source locations
     */
    messagePartLocations?: (ɵSourceLocation | undefined)[];
    /**
     * The names of the placeholders that will be replaced with substitutions.
     */
    placeholderNames: string[];
}

/**
 * A translation message that has been processed to extract the message parts and placeholders.
 */
export declare interface ɵParsedTranslation extends MessageMetadata {
    messageParts: TemplateStringsArray;
    placeholderNames: string[];
}

/**
 * The internal structure used by the runtime localization to translate messages.
 */
export declare type ɵParsedTranslations = Record<MessageId, ɵParsedTranslation>;

/**
 * Parse a `$localize` tagged string into a structure that can be used for translation or
 * extraction.
 *
 * See `ParsedMessage` for an example.
 */
export declare function ɵparseMessage(messageParts: TemplateStringsArray, expressions?: readonly any[], location?: ɵSourceLocation, messagePartLocations?: (ɵSourceLocation | undefined)[], expressionLocations?: (ɵSourceLocation | undefined)[]): ɵParsedMessage;

/**
 * Parse the given message part (`cooked` + `raw`) to extract the message metadata from the text.
 *
 * If the message part has a metadata block this function will extract the `meaning`,
 * `description`, `customId` and `legacyId` (if provided) from the block. These metadata properties
 * are serialized in the string delimited by `|`, `@@` and `␟` respectively.
 *
 * (Note that `␟` is the `LEGACY_ID_INDICATOR` - see `constants.ts`.)
 *
 * For example:
 *
 * ```ts
 * `:meaning|description@@custom-id:`
 * `:meaning|@@custom-id:`
 * `:meaning|description:`
 * `:description@@custom-id:`
 * `:meaning|:`
 * `:description:`
 * `:@@custom-id:`
 * `:meaning|description@@custom-id␟legacy-id-1␟legacy-id-2:`
 * ```
 *
 * @param cooked The cooked version of the message part to parse.
 * @param raw The raw version of the message part to parse.
 * @returns A object containing any metadata that was parsed from the message part.
 */
export declare function ɵparseMetadata(cooked: string, raw: string): MessageMetadata;

/**
 * Parse the `messageParts` and `placeholderNames` out of a target `message`.
 *
 * Used by `loadTranslations()` to convert target message strings into a structure that is more
 * appropriate for doing translation.
 *
 * @param message the message to be parsed.
 */
export declare function ɵparseTranslation(messageString: TargetMessage): ɵParsedTranslation;

/**
 * The location of the message in the source file.
 *
 * The `line` and `column` values for the `start` and `end` properties are zero-based.
 */
export declare interface ɵSourceLocation {
    start: {
        line: number;
        column: number;
    };
    end: {
        line: number;
        column: number;
    };
    file: AbsoluteFsPathLocalizeCopy;
    text?: string;
}

/**
 * A string containing a translation source message.
 *
 * I.E. the message that indicates what will be translated from.
 *
 * Uses `{$placeholder-name}` to indicate a placeholder.
 */
export declare type ɵSourceMessage = string;

/**
 * Split a message part (`cooked` + `raw`) into an optional delimited "block" off the front and the
 * rest of the text of the message part.
 *
 * Blocks appear at the start of message parts. They are delimited by a colon `:` character at the
 * start and end of the block.
 *
 * If the block is in the first message part then it will be metadata about the whole message:
 * meaning, description, id.  Otherwise it will be metadata about the immediately preceding
 * substitution: placeholder name.
 *
 * Since blocks are optional, it is possible that the content of a message block actually starts
 * with a block marker. In this case the marker must be escaped `\:`.
 *
 * @param cooked The cooked version of the message part to parse.
 * @param raw The raw version of the message part to parse.
 * @returns An object containing the `text` of the message part and the text of the `block`, if it
 * exists.
 * @throws an error if the `block` is unterminated
 */
export declare function ɵsplitBlock(cooked: string, raw: string): {
    text: string;
    block?: string;
};

/**
 * Translate the text of the `$localize` tagged-string (i.e. `messageParts` and
 * `substitutions`) using the given `translations`.
 *
 * The tagged-string is parsed to extract its `messageId` which is used to find an appropriate
 * `ParsedTranslation`. If this doesn't match and there are legacy ids then try matching a
 * translation using those.
 *
 * If one is found then it is used to translate the message into a new set of `messageParts` and
 * `substitutions`.
 * The translation may reorder (or remove) substitutions as appropriate.
 *
 * If there is no translation with a matching message id then an error is thrown.
 * If a translation contains a placeholder that is not found in the message being translated then an
 * error is thrown.
 */
export declare function ɵtranslate(translations: Record<string, ɵParsedTranslation>, messageParts: TemplateStringsArray, substitutions: readonly any[]): [TemplateStringsArray, readonly any[]];

/** @nodoc */
export declare interface ɵTranslateFn {
    (messageParts: TemplateStringsArray, expressions: readonly any[]): [TemplateStringsArray, readonly any[]];
}

export { }
