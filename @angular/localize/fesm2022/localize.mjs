/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import { parseMessage, BLOCK_MARKER } from './localize-GIKF7LQz.mjs';
export { $localize as ɵ$localize, computeMsgId as ɵcomputeMsgId, findEndOfBlock as ɵfindEndOfBlock, parseMetadata as ɵparseMetadata, splitBlock as ɵsplitBlock } from './localize-GIKF7LQz.mjs';

class MissingTranslationError extends Error {
    parsedMessage;
    type = 'MissingTranslationError';
    constructor(parsedMessage) {
        super(`No translation found for ${describeMessage(parsedMessage)}.`);
        this.parsedMessage = parsedMessage;
    }
}
function isMissingTranslationError(e) {
    return e.type === 'MissingTranslationError';
}
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
function translate$1(translations, messageParts, substitutions) {
    const message = parseMessage(messageParts, substitutions);
    // Look up the translation using the messageId, and then the legacyId if available.
    let translation = translations[message.id];
    // If the messageId did not match a translation, try matching the legacy ids instead
    if (message.legacyIds !== undefined) {
        for (let i = 0; i < message.legacyIds.length && translation === undefined; i++) {
            translation = translations[message.legacyIds[i]];
        }
    }
    if (translation === undefined) {
        throw new MissingTranslationError(message);
    }
    return [
        translation.messageParts,
        translation.placeholderNames.map((placeholder) => {
            if (message.substitutions.hasOwnProperty(placeholder)) {
                return message.substitutions[placeholder];
            }
            else {
                throw new Error(`There is a placeholder name mismatch with the translation provided for the message ${describeMessage(message)}.\n` +
                    `The translation contains a placeholder with name ${placeholder}, which does not exist in the message.`);
            }
        }),
    ];
}
/**
 * Parse the `messageParts` and `placeholderNames` out of a target `message`.
 *
 * Used by `loadTranslations()` to convert target message strings into a structure that is more
 * appropriate for doing translation.
 *
 * @param message the message to be parsed.
 */
function parseTranslation(messageString) {
    const parts = messageString.split(/{\$([^}]*)}/);
    const messageParts = [parts[0]];
    const placeholderNames = [];
    for (let i = 1; i < parts.length - 1; i += 2) {
        placeholderNames.push(parts[i]);
        messageParts.push(`${parts[i + 1]}`);
    }
    const rawMessageParts = messageParts.map((part) => part.charAt(0) === BLOCK_MARKER ? '\\' + part : part);
    return {
        text: messageString,
        messageParts: makeTemplateObject(messageParts, rawMessageParts),
        placeholderNames,
    };
}
/**
 * Create a `ParsedTranslation` from a set of `messageParts` and `placeholderNames`.
 *
 * @param messageParts The message parts to appear in the ParsedTranslation.
 * @param placeholderNames The names of the placeholders to intersperse between the `messageParts`.
 */
function makeParsedTranslation(messageParts, placeholderNames = []) {
    let messageString = messageParts[0];
    for (let i = 0; i < placeholderNames.length; i++) {
        messageString += `{$${placeholderNames[i]}}${messageParts[i + 1]}`;
    }
    return {
        text: messageString,
        messageParts: makeTemplateObject(messageParts, messageParts),
        placeholderNames,
    };
}
/**
 * Create the specialized array that is passed to tagged-string tag functions.
 *
 * @param cooked The message parts with their escape codes processed.
 * @param raw The message parts with their escaped codes as-is.
 */
function makeTemplateObject(cooked, raw) {
    Object.defineProperty(cooked, 'raw', { value: raw });
    return cooked;
}
function describeMessage(message) {
    const meaningString = message.meaning && ` - "${message.meaning}"`;
    const legacy = message.legacyIds && message.legacyIds.length > 0
        ? ` [${message.legacyIds.map((l) => `"${l}"`).join(', ')}]`
        : '';
    return `"${message.id}"${legacy} ("${message.text}"${meaningString})`;
}

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
 * @see {@link /api/localize/init/$localize $localize} for tagging messages as needing to be translated.
 * @publicApi
 */
function loadTranslations(translations) {
    // Ensure the translate function exists
    if (!$localize.translate) {
        $localize.translate = translate;
    }
    if (!$localize.TRANSLATIONS) {
        $localize.TRANSLATIONS = {};
    }
    Object.keys(translations).forEach((key) => {
        $localize.TRANSLATIONS[key] = parseTranslation(translations[key]);
    });
}
/**
 * Remove all translations for `$localize`, if doing runtime translation.
 *
 * All translations that had been loading into memory using `loadTranslations()` will be removed.
 *
 * @see {@link loadTranslations} for loading translations at runtime.
 * @see {@link /api/localize/init/$localize $localize} for tagging messages as needing to be translated.
 *
 * @publicApi
 */
function clearTranslations() {
    $localize.translate = undefined;
    $localize.TRANSLATIONS = {};
}
/**
 * Translate the text of the given message, using the loaded translations.
 *
 * This function may reorder (or remove) substitutions as indicated in the matching translation.
 */
function translate(messageParts, substitutions) {
    try {
        return translate$1($localize.TRANSLATIONS, messageParts, substitutions);
    }
    catch (e) {
        console.warn(e.message);
        return [messageParts, substitutions];
    }
}

export { clearTranslations, loadTranslations, MissingTranslationError as ɵMissingTranslationError, isMissingTranslationError as ɵisMissingTranslationError, makeParsedTranslation as ɵmakeParsedTranslation, makeTemplateObject as ɵmakeTemplateObject, parseMessage as ɵparseMessage, parseTranslation as ɵparseTranslation, translate$1 as ɵtranslate };
//# sourceMappingURL=localize.mjs.map
