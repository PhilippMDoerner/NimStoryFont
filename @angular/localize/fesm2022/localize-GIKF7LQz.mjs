/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

/**
 * The character used to mark the start and end of a "block" in a `$localize` tagged string.
 * A block can indicate metadata about the message or specify a name of a placeholder for a
 * substitution expressions.
 *
 * For example:
 *
 * ```ts
 * $localize`Hello, ${title}:title:!`;
 * $localize`:meaning|description@@id:source message text`;
 * ```
 */
const BLOCK_MARKER$1 = ':';
/**
 * The marker used to separate a message's "meaning" from its "description" in a metadata block.
 *
 * For example:
 *
 * ```ts
 * $localize `:correct|Indicates that the user got the answer correct: Right!`;
 * $localize `:movement|Button label for moving to the right: Right!`;
 * ```
 */
const MEANING_SEPARATOR = '|';
/**
 * The marker used to separate a message's custom "id" from its "description" in a metadata block.
 *
 * For example:
 *
 * ```ts
 * $localize `:A welcome message on the home page@@myApp-homepage-welcome: Welcome!`;
 * ```
 */
const ID_SEPARATOR = '@@';
/**
 * The marker used to separate legacy message ids from the rest of a metadata block.
 *
 * For example:
 *
 * ```ts
 * $localize `:@@custom-id␟2df64767cd895a8fabe3e18b94b5b6b6f9e2e3f0: Welcome!`;
 * ```
 *
 * Note that this character is the "symbol for the unit separator" (␟) not the "unit separator
 * character" itself, since that has no visual representation. See https://graphemica.com/%E2%90%9F.
 *
 * Here is some background for the original "unit separator character":
 * https://stackoverflow.com/questions/8695118/whats-the-file-group-record-unit-separator-control-characters-and-its-usage
 */
const LEGACY_ID_INDICATOR = '\u241F';

/**
 * A lazily created TextEncoder instance for converting strings into UTF-8 bytes
 */
let textEncoder;
/**
 * Compute the fingerprint of the given string
 *
 * The output is 64 bit number encoded as a decimal string
 *
 * based on:
 * https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/GoogleJsMessageIdGenerator.java
 */
function fingerprint(str) {
    textEncoder ??= new TextEncoder();
    const utf8 = textEncoder.encode(str);
    const view = new DataView(utf8.buffer, utf8.byteOffset, utf8.byteLength);
    let hi = hash32(view, utf8.length, 0);
    let lo = hash32(view, utf8.length, 102072);
    if (hi == 0 && (lo == 0 || lo == 1)) {
        hi = hi ^ 0x130f9bef;
        lo = lo ^ -0x6b5f56d8;
    }
    return (BigInt.asUintN(32, BigInt(hi)) << BigInt(32)) | BigInt.asUintN(32, BigInt(lo));
}
function computeMsgId(msg, meaning = '') {
    let msgFingerprint = fingerprint(msg);
    if (meaning) {
        // Rotate the 64-bit message fingerprint one bit to the left and then add the meaning
        // fingerprint.
        msgFingerprint =
            BigInt.asUintN(64, msgFingerprint << BigInt(1)) |
                ((msgFingerprint >> BigInt(63)) & BigInt(1));
        msgFingerprint += fingerprint(meaning);
    }
    return BigInt.asUintN(63, msgFingerprint).toString();
}
function hash32(view, length, c) {
    let a = 0x9e3779b9, b = 0x9e3779b9;
    let index = 0;
    const end = length - 12;
    for (; index <= end; index += 12) {
        a += view.getUint32(index, true);
        b += view.getUint32(index + 4, true);
        c += view.getUint32(index + 8, true);
        const res = mix(a, b, c);
        (a = res[0]), (b = res[1]), (c = res[2]);
    }
    const remainder = length - index;
    // the first byte of c is reserved for the length
    c += length;
    if (remainder >= 4) {
        a += view.getUint32(index, true);
        index += 4;
        if (remainder >= 8) {
            b += view.getUint32(index, true);
            index += 4;
            // Partial 32-bit word for c
            if (remainder >= 9) {
                c += view.getUint8(index++) << 8;
            }
            if (remainder >= 10) {
                c += view.getUint8(index++) << 16;
            }
            if (remainder === 11) {
                c += view.getUint8(index++) << 24;
            }
        }
        else {
            // Partial 32-bit word for b
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
    }
    else {
        // Partial 32-bit word for a
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
// Utils
var Endian;
(function (Endian) {
    Endian[Endian["Little"] = 0] = "Little";
    Endian[Endian["Big"] = 1] = "Big";
})(Endian || (Endian = {}));

// This module specifier is intentionally a relative path to allow bundling the code directly
// into the package.
// @ng_package: ignore-cross-repo-import
/**
 * Parse a `$localize` tagged string into a structure that can be used for translation or
 * extraction.
 *
 * See `ParsedMessage` for an example.
 */
function parseMessage(messageParts, expressions, location, messagePartLocations, expressionLocations = []) {
    const substitutions = {};
    const substitutionLocations = {};
    const associatedMessageIds = {};
    const metadata = parseMetadata(messageParts[0], messageParts.raw[0]);
    const cleanedMessageParts = [metadata.text];
    const placeholderNames = [];
    let messageString = metadata.text;
    for (let i = 1; i < messageParts.length; i++) {
        const { messagePart, placeholderName = computePlaceholderName(i), associatedMessageId, } = parsePlaceholder(messageParts[i], messageParts.raw[i]);
        messageString += `{$${placeholderName}}${messagePart}`;
        if (expressions !== undefined) {
            substitutions[placeholderName] = expressions[i - 1];
            substitutionLocations[placeholderName] = expressionLocations[i - 1];
        }
        placeholderNames.push(placeholderName);
        if (associatedMessageId !== undefined) {
            associatedMessageIds[placeholderName] = associatedMessageId;
        }
        cleanedMessageParts.push(messagePart);
    }
    const messageId = metadata.customId || computeMsgId(messageString, metadata.meaning || '');
    const legacyIds = metadata.legacyIds ? metadata.legacyIds.filter((id) => id !== messageId) : [];
    return {
        id: messageId,
        legacyIds,
        substitutions,
        substitutionLocations,
        text: messageString,
        customId: metadata.customId,
        meaning: metadata.meaning || '',
        description: metadata.description || '',
        messageParts: cleanedMessageParts,
        messagePartLocations,
        placeholderNames,
        associatedMessageIds,
        location,
    };
}
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
function parseMetadata(cooked, raw) {
    const { text: messageString, block } = splitBlock(cooked, raw);
    if (block === undefined) {
        return { text: messageString };
    }
    else {
        const [meaningDescAndId, ...legacyIds] = block.split(LEGACY_ID_INDICATOR);
        const [meaningAndDesc, customId] = meaningDescAndId.split(ID_SEPARATOR, 2);
        let [meaning, description] = meaningAndDesc.split(MEANING_SEPARATOR, 2);
        if (description === undefined) {
            description = meaning;
            meaning = undefined;
        }
        if (description === '') {
            description = undefined;
        }
        return { text: messageString, meaning, description, customId, legacyIds };
    }
}
/**
 * Parse the given message part (`cooked` + `raw`) to extract any placeholder metadata from the
 * text.
 *
 * If the message part has a metadata block this function will extract the `placeholderName` and
 * `associatedMessageId` (if provided) from the block.
 *
 * These metadata properties are serialized in the string delimited by `@@`.
 *
 * For example:
 *
 * ```ts
 * `:placeholder-name@@associated-id:`
 * ```
 *
 * @param cooked The cooked version of the message part to parse.
 * @param raw The raw version of the message part to parse.
 * @returns A object containing the metadata (`placeholderName` and `associatedMessageId`) of the
 *     preceding placeholder, along with the static text that follows.
 */
function parsePlaceholder(cooked, raw) {
    const { text: messagePart, block } = splitBlock(cooked, raw);
    if (block === undefined) {
        return { messagePart };
    }
    else {
        const [placeholderName, associatedMessageId] = block.split(ID_SEPARATOR);
        return { messagePart, placeholderName, associatedMessageId };
    }
}
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
function splitBlock(cooked, raw) {
    if (raw.charAt(0) !== BLOCK_MARKER$1) {
        return { text: cooked };
    }
    else {
        const endOfBlock = findEndOfBlock(cooked, raw);
        return {
            block: cooked.substring(1, endOfBlock),
            text: cooked.substring(endOfBlock + 1),
        };
    }
}
function computePlaceholderName(index) {
    return index === 1 ? 'PH' : `PH_${index - 1}`;
}
/**
 * Find the end of a "marked block" indicated by the first non-escaped colon.
 *
 * @param cooked The cooked string (where escaped chars have been processed)
 * @param raw The raw string (where escape sequences are still in place)
 *
 * @returns the index of the end of block marker
 * @throws an error if the block is unterminated
 */
function findEndOfBlock(cooked, raw) {
    for (let cookedIndex = 1, rawIndex = 1; cookedIndex < cooked.length; cookedIndex++, rawIndex++) {
        if (raw[rawIndex] === '\\') {
            rawIndex++;
        }
        else if (cooked[cookedIndex] === BLOCK_MARKER$1) {
            return cookedIndex;
        }
    }
    throw new Error(`Unterminated $localize metadata block in "${raw}".`);
}

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
const $localize = function (messageParts, ...expressions) {
    if ($localize.translate) {
        // Don't use array expansion here to avoid the compiler adding `__read()` helper unnecessarily.
        const translation = $localize.translate(messageParts, expressions);
        messageParts = translation[0];
        expressions = translation[1];
    }
    let message = stripBlock(messageParts[0], messageParts.raw[0]);
    for (let i = 1; i < messageParts.length; i++) {
        message += expressions[i - 1] + stripBlock(messageParts[i], messageParts.raw[i]);
    }
    return message;
};
const BLOCK_MARKER = ':';
/**
 * Strip a delimited "block" from the start of the `messagePart`, if it is found.
 *
 * If a marker character (:) actually appears in the content at the start of a tagged string or
 * after a substitution expression, where a block has not been provided the character must be
 * escaped with a backslash, `\:`. This function checks for this by looking at the `raw`
 * messagePart, which should still contain the backslash.
 *
 * @param messagePart The cooked message part to process.
 * @param rawMessagePart The raw message part to check.
 * @returns the message part with the placeholder name stripped, if found.
 * @throws an error if the block is unterminated
 */
function stripBlock(messagePart, rawMessagePart) {
    return rawMessagePart.charAt(0) === BLOCK_MARKER
        ? messagePart.substring(findEndOfBlock(messagePart, rawMessagePart) + 1)
        : messagePart;
}

export { $localize, BLOCK_MARKER$1 as BLOCK_MARKER, computeMsgId, findEndOfBlock, parseMessage, parseMetadata, splitBlock };
//# sourceMappingURL=localize-GIKF7LQz.mjs.map
