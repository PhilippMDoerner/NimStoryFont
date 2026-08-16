import CJS_COMPAT_NODE_URL_o3kjpxmk9t from 'node:url';
import CJS_COMPAT_NODE_PATH_o3kjpxmk9t from 'node:path';
import CJS_COMPAT_NODE_MODULE_o3kjpxmk9t from "node:module";

var __filename = CJS_COMPAT_NODE_URL_o3kjpxmk9t.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_o3kjpxmk9t.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_o3kjpxmk9t.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------
import {
  nanoid
} from "./chunk-HGQEN5BB.js";
import {
  Tag
} from "./chunk-RW6CS4VF.js";
import {
  custom,
  minValue,
  number,
  object,
  optional,
  pipe,
  safeInteger,
  safeParse,
  string,
  unknown
} from "./chunk-Z35MCY7K.js";
import {
  any,
  up,
  up2
} from "./chunk-TWPZPMFT.js";
import {
  OpenServiceAsyncSchemaError,
  OpenServiceInvalidStaticPathError,
  OpenServiceLoadedDrainExceededError,
  OpenServiceMissingChannelError,
  OpenServiceMissingServiceError,
  OpenServiceRemoteCommandDisconnectedError,
  OpenServiceRemoteCommandUnhandledError,
  OpenServiceUnimplementedOperationError,
  OpenServiceValidationError
} from "./chunk-BKV2AHET.js";
import {
  dirname,
  join
} from "./chunk-4XX73STB.js";
import {
  __commonJS,
  __toESM
} from "./chunk-5SSDLDTJ.js";

// ../../node_modules/tinyglobby/node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({
  "../../node_modules/tinyglobby/node_modules/picomatch/lib/constants.js"(exports, module) {
    "use strict";
    var WIN_NO_SLASH = "[^\\\\/]", ONE_CHAR = "(?=.)", QMARK = "[^/]", END_ANCHOR = "(?:\\/|$)", START_ANCHOR = "(?:^|\\/)", DOTS_SLASH = `\\.{1,2}${END_ANCHOR}`, NO_DOT = "(?!\\.)", NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`, NO_DOT_SLASH = `(?!\\.{0,1}${END_ANCHOR})`, NO_DOTS_SLASH = `(?!${DOTS_SLASH})`, QMARK_NO_DOT = "[^.\\/]", STAR = `${QMARK}*?`, SEP = "/", POSIX_CHARS = {
      DOT_LITERAL: "\\.",
      PLUS_LITERAL: "\\+",
      QMARK_LITERAL: "\\?",
      SLASH_LITERAL: "\\/",
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR,
      SEP
    }, WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: "[\\\\/]",
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: "\\.{1,2}(?:[\\\\/]|$)",
      NO_DOT: "(?!\\.)",
      NO_DOTS: "(?!(?:^|[\\\\/])\\.{1,2}(?:[\\\\/]|$))",
      NO_DOT_SLASH: "(?!\\.{0,1}(?:[\\\\/]|$))",
      NO_DOTS_SLASH: "(?!\\.{1,2}(?:[\\\\/]|$))",
      QMARK_NO_DOT: "[^.\\\\/]",
      START_ANCHOR: "(?:^|[\\\\/])",
      END_ANCHOR: "(?:[\\\\/]|$)",
      SEP: "\\"
    }, POSIX_REGEX_SOURCE = {
      __proto__: null,
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module.exports = {
      DEFAULT_MAX_EXTGLOB_RECURSION: 0,
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        __proto__: null,
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win32) {
        return win32 === !0 ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// ../../node_modules/tinyglobby/node_modules/picomatch/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/tinyglobby/node_modules/picomatch/lib/utils.js"(exports) {
    "use strict";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants();
    exports.isObject = (val) => val !== null && typeof val == "object" && !Array.isArray(val);
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports.isWindows = () => {
      if (typeof navigator < "u" && navigator.platform) {
        let platform = navigator.platform.toLowerCase();
        return platform === "win32" || platform === "windows";
      }
      return typeof process < "u" && process.platform ? process.platform === "win32" : !1;
    };
    exports.removeBackslashes = (str) => str.replace(REGEX_REMOVE_BACKSLASH, (match) => match === "\\" ? "" : match);
    exports.escapeLast = (input, char, lastIdx) => {
      let idx = input.lastIndexOf(char, lastIdx);
      return idx === -1 ? input : input[idx - 1] === "\\" ? exports.escapeLast(input, char, idx - 1) : `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports.removePrefix = (input, state = {}) => {
      let output = input;
      return output.startsWith("./") && (output = output.slice(2), state.prefix = "./"), output;
    };
    exports.wrapOutput = (input, state = {}, options = {}) => {
      let prepend = options.contains ? "" : "^", append = options.contains ? "" : "$", output = `${prepend}(?:${input})${append}`;
      return state.negated === !0 && (output = `(?:^(?!${output}).*$)`), output;
    };
    exports.basename = (path, { windows } = {}) => {
      let segs = path.split(windows ? /[\\/]/ : "/"), last = segs[segs.length - 1];
      return last === "" ? segs[segs.length - 2] : last;
    };
  }
});

// ../../node_modules/tinyglobby/node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "../../node_modules/tinyglobby/node_modules/picomatch/lib/scan.js"(exports, module) {
    "use strict";
    var utils = require_utils(), {
      CHAR_ASTERISK,
      /* * */
      CHAR_AT,
      /* @ */
      CHAR_BACKWARD_SLASH,
      /* \ */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_EXCLAMATION_MARK,
      /* ! */
      CHAR_FORWARD_SLASH,
      /* / */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_PLUS,
      /* + */
      CHAR_QUESTION_MARK,
      /* ? */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_RIGHT_SQUARE_BRACKET
      /* ] */
    } = require_constants(), isPathSeparator = (code) => code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH, depth = (token) => {
      token.isPrefix !== !0 && (token.depth = token.isGlobstar ? 1 / 0 : 1);
    }, scan = (input, options) => {
      let opts = options || {}, length = input.length - 1, scanToEnd = opts.parts === !0 || opts.scanToEnd === !0, slashes = [], tokens = [], parts = [], str = input, index = -1, start = 0, lastIndex = 0, isBrace = !1, isBracket = !1, isGlob = !1, isExtglob = !1, isGlobstar = !1, braceEscaped = !1, backslashes = !1, negated = !1, negatedExtglob = !1, finished = !1, braces = 0, prev, code, token = { value: "", depth: 0, isGlob: !1 }, eos = () => index >= length, peek = () => str.charCodeAt(index + 1), advance = () => (prev = code, str.charCodeAt(++index));
      for (; index < length; ) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = !0, code = advance(), code === CHAR_LEFT_CURLY_BRACE && (braceEscaped = !0);
          continue;
        }
        if (braceEscaped === !0 || code === CHAR_LEFT_CURLY_BRACE) {
          for (braces++; eos() !== !0 && (code = advance()); ) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = !0, advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== !0 && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              if (isBrace = token.isBrace = !0, isGlob = token.isGlob = !0, finished = !0, scanToEnd === !0)
                continue;
              break;
            }
            if (braceEscaped !== !0 && code === CHAR_COMMA) {
              if (isBrace = token.isBrace = !0, isGlob = token.isGlob = !0, finished = !0, scanToEnd === !0)
                continue;
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE && (braces--, braces === 0)) {
              braceEscaped = !1, isBrace = token.isBrace = !0, finished = !0;
              break;
            }
          }
          if (scanToEnd === !0)
            continue;
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          if (slashes.push(index), tokens.push(token), token = { value: "", depth: 0, isGlob: !1 }, finished === !0) continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== !0 && (code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK) === !0 && peek() === CHAR_LEFT_PARENTHESES) {
          if (isGlob = token.isGlob = !0, isExtglob = token.isExtglob = !0, finished = !0, code === CHAR_EXCLAMATION_MARK && index === start && (negatedExtglob = !0), scanToEnd === !0) {
            for (; eos() !== !0 && (code = advance()); ) {
              if (code === CHAR_BACKWARD_SLASH) {
                backslashes = token.backslashes = !0, code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                isGlob = token.isGlob = !0, finished = !0;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK && (isGlobstar = token.isGlobstar = !0), isGlob = token.isGlob = !0, finished = !0, scanToEnd === !0)
            continue;
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          if (isGlob = token.isGlob = !0, finished = !0, scanToEnd === !0)
            continue;
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          for (; eos() !== !0 && (next = advance()); ) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = !0, advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = !0, isGlob = token.isGlob = !0, finished = !0;
              break;
            }
          }
          if (scanToEnd === !0)
            continue;
          break;
        }
        if (opts.nonegate !== !0 && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = !0, start++;
          continue;
        }
        if (opts.noparen !== !0 && code === CHAR_LEFT_PARENTHESES) {
          if (isGlob = token.isGlob = !0, scanToEnd === !0) {
            for (; eos() !== !0 && (code = advance()); ) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = !0, code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = !0;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === !0) {
          if (finished = !0, scanToEnd === !0)
            continue;
          break;
        }
      }
      opts.noext === !0 && (isExtglob = !1, isGlob = !1);
      let base = str, prefix = "", glob = "";
      start > 0 && (prefix = str.slice(0, start), str = str.slice(start), lastIndex -= start), base && isGlob === !0 && lastIndex > 0 ? (base = str.slice(0, lastIndex), glob = str.slice(lastIndex)) : isGlob === !0 ? (base = "", glob = str) : base = str, base && base !== "" && base !== "/" && base !== str && isPathSeparator(base.charCodeAt(base.length - 1)) && (base = base.slice(0, -1)), opts.unescape === !0 && (glob && (glob = utils.removeBackslashes(glob)), base && backslashes === !0 && (base = utils.removeBackslashes(base)));
      let state = {
        prefix,
        input,
        start,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === !0 && (state.maxDepth = 0, isPathSeparator(code) || tokens.push(token), state.tokens = tokens), opts.parts === !0 || opts.tokens === !0) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          let n3 = prevIndex ? prevIndex + 1 : start, i2 = slashes[idx], value = input.slice(n3, i2);
          opts.tokens && (idx === 0 && start !== 0 ? (tokens[idx].isPrefix = !0, tokens[idx].value = prefix) : tokens[idx].value = value, depth(tokens[idx]), state.maxDepth += tokens[idx].depth), (idx !== 0 || value !== "") && parts.push(value), prevIndex = i2;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          let value = input.slice(prevIndex + 1);
          parts.push(value), opts.tokens && (tokens[tokens.length - 1].value = value, depth(tokens[tokens.length - 1]), state.maxDepth += tokens[tokens.length - 1].depth);
        }
        state.slashes = slashes, state.parts = parts;
      }
      return state;
    };
    module.exports = scan;
  }
});

// ../../node_modules/tinyglobby/node_modules/picomatch/lib/parse.js
var require_parse = __commonJS({
  "../../node_modules/tinyglobby/node_modules/picomatch/lib/parse.js"(exports, module) {
    "use strict";
    var constants = require_constants(), utils = require_utils(), {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants, expandRange = (args, options) => {
      if (typeof options.expandRange == "function")
        return options.expandRange(...args, options);
      args.sort();
      let value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch {
        return args.map((v3) => utils.escapeRegex(v3)).join("..");
      }
      return value;
    }, syntaxError = (type, char) => `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`, splitTopLevel = (input) => {
      let parts = [], bracket = 0, paren = 0, quote = 0, value = "", escaped = !1;
      for (let ch of input) {
        if (escaped === !0) {
          value += ch, escaped = !1;
          continue;
        }
        if (ch === "\\") {
          value += ch, escaped = !0;
          continue;
        }
        if (ch === '"') {
          quote = quote === 1 ? 0 : 1, value += ch;
          continue;
        }
        if (quote === 0) {
          if (ch === "[")
            bracket++;
          else if (ch === "]" && bracket > 0)
            bracket--;
          else if (bracket === 0) {
            if (ch === "(")
              paren++;
            else if (ch === ")" && paren > 0)
              paren--;
            else if (ch === "|" && paren === 0) {
              parts.push(value), value = "";
              continue;
            }
          }
        }
        value += ch;
      }
      return parts.push(value), parts;
    }, isPlainBranch = (branch) => {
      let escaped = !1;
      for (let ch of branch) {
        if (escaped === !0) {
          escaped = !1;
          continue;
        }
        if (ch === "\\") {
          escaped = !0;
          continue;
        }
        if (/[?*+@!()[\]{}]/.test(ch))
          return !1;
      }
      return !0;
    }, normalizeSimpleBranch = (branch) => {
      let value = branch.trim(), changed = !0;
      for (; changed === !0; )
        changed = !1, /^@\([^\\()[\]{}|]+\)$/.test(value) && (value = value.slice(2, -1), changed = !0);
      if (isPlainBranch(value))
        return value.replace(/\\(.)/g, "$1");
    }, hasRepeatedCharPrefixOverlap = (branches) => {
      let values = branches.map(normalizeSimpleBranch).filter(Boolean);
      for (let i2 = 0; i2 < values.length; i2++)
        for (let j2 = i2 + 1; j2 < values.length; j2++) {
          let a3 = values[i2], b3 = values[j2], char = a3[0];
          if (!(!char || a3 !== char.repeat(a3.length) || b3 !== char.repeat(b3.length)) && (a3 === b3 || a3.startsWith(b3) || b3.startsWith(a3)))
            return !0;
        }
      return !1;
    }, parseRepeatedExtglob = (pattern, requireEnd = !0) => {
      if (pattern[0] !== "+" && pattern[0] !== "*" || pattern[1] !== "(")
        return;
      let bracket = 0, paren = 0, quote = 0, escaped = !1;
      for (let i2 = 1; i2 < pattern.length; i2++) {
        let ch = pattern[i2];
        if (escaped === !0) {
          escaped = !1;
          continue;
        }
        if (ch === "\\") {
          escaped = !0;
          continue;
        }
        if (ch === '"') {
          quote = quote === 1 ? 0 : 1;
          continue;
        }
        if (quote !== 1) {
          if (ch === "[") {
            bracket++;
            continue;
          }
          if (ch === "]" && bracket > 0) {
            bracket--;
            continue;
          }
          if (!(bracket > 0)) {
            if (ch === "(") {
              paren++;
              continue;
            }
            if (ch === ")" && (paren--, paren === 0))
              return requireEnd === !0 && i2 !== pattern.length - 1 ? void 0 : {
                type: pattern[0],
                body: pattern.slice(2, i2),
                end: i2
              };
          }
        }
      }
    }, getStarExtglobSequenceOutput = (pattern) => {
      let index = 0, chars = [];
      for (; index < pattern.length; ) {
        let match = parseRepeatedExtglob(pattern.slice(index), !1);
        if (!match || match.type !== "*")
          return;
        let branches = splitTopLevel(match.body).map((branch2) => branch2.trim());
        if (branches.length !== 1)
          return;
        let branch = normalizeSimpleBranch(branches[0]);
        if (!branch || branch.length !== 1)
          return;
        chars.push(branch), index += match.end + 1;
      }
      return chars.length < 1 ? void 0 : `${chars.length === 1 ? utils.escapeRegex(chars[0]) : `[${chars.map((ch) => utils.escapeRegex(ch)).join("")}]`}*`;
    }, repeatedExtglobRecursion = (pattern) => {
      let depth = 0, value = pattern.trim(), match = parseRepeatedExtglob(value);
      for (; match; )
        depth++, value = match.body.trim(), match = parseRepeatedExtglob(value);
      return depth;
    }, analyzeRepeatedExtglob = (body, options) => {
      if (options.maxExtglobRecursion === !1)
        return { risky: !1 };
      let max = typeof options.maxExtglobRecursion == "number" ? options.maxExtglobRecursion : constants.DEFAULT_MAX_EXTGLOB_RECURSION, branches = splitTopLevel(body).map((branch) => branch.trim());
      if (branches.length > 1 && (branches.some((branch) => branch === "") || branches.some((branch) => /^[*?]+$/.test(branch)) || hasRepeatedCharPrefixOverlap(branches)))
        return { risky: !0 };
      for (let branch of branches) {
        let safeOutput = getStarExtglobSequenceOutput(branch);
        if (safeOutput)
          return { risky: !0, safeOutput };
        if (repeatedExtglobRecursion(branch) > max)
          return { risky: !0 };
      }
      return { risky: !1 };
    }, parse = (input, options) => {
      if (typeof input != "string")
        throw new TypeError("Expected a string");
      input = REPLACEMENTS[input] || input;
      let opts = { ...options }, max = typeof opts.maxLength == "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH, len = input.length;
      if (len > max)
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      let bos = { type: "bos", value: "", output: opts.prepend || "" }, tokens = [bos], capture = opts.capture ? "" : "?:", PLATFORM_CHARS = constants.globChars(opts.windows), EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS), {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS, globstar = (opts2) => `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`, nodot = opts.dot ? "" : NO_DOT, qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT, star = opts.bash === !0 ? globstar(opts) : STAR;
      opts.capture && (star = `(${star})`), typeof opts.noext == "boolean" && (opts.noextglob = opts.noext);
      let state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === !0,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: !1,
        negated: !1,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: !1,
        tokens
      };
      input = utils.removePrefix(input, state), len = input.length;
      let extglobs = [], braces = [], stack = [], prev = bos, value, eos = () => state.index === len - 1, peek = state.peek = (n3 = 1) => input[state.index + n3], advance = state.advance = () => input[++state.index] || "", remaining = () => input.slice(state.index + 1), consume = (value2 = "", num = 0) => {
        state.consumed += value2, state.index += num;
      }, append = (token) => {
        state.output += token.output != null ? token.output : token.value, consume(token.value);
      }, negate = () => {
        let count = 1;
        for (; peek() === "!" && (peek(2) !== "(" || peek(3) === "?"); )
          advance(), state.start++, count++;
        return count % 2 === 0 ? !1 : (state.negated = !0, state.start++, !0);
      }, increment = (type) => {
        state[type]++, stack.push(type);
      }, decrement = (type) => {
        state[type]--, stack.pop();
      }, push = (tok) => {
        if (prev.type === "globstar") {
          let isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace"), isExtglob = tok.extglob === !0 || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob && (state.output = state.output.slice(0, -prev.output.length), prev.type = "star", prev.value = "*", prev.output = star, state.output += prev.output);
        }
        if (extglobs.length && tok.type !== "paren" && (extglobs[extglobs.length - 1].inner += tok.value), (tok.value || tok.output) && append(tok), prev && prev.type === "text" && tok.type === "text") {
          prev.output = (prev.output || prev.value) + tok.value, prev.value += tok.value;
          return;
        }
        tok.prev = prev, tokens.push(tok), prev = tok;
      }, extglobOpen = (type, value2) => {
        let token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev, token.parens = state.parens, token.output = state.output, token.startIndex = state.index, token.tokensIndex = tokens.length;
        let output = (opts.capture ? "(" : "") + token.open;
        increment("parens"), push({ type, value: value2, output: state.output ? "" : ONE_CHAR }), push({ type: "paren", extglob: !0, value: advance(), output }), extglobs.push(token);
      }, extglobClose = (token) => {
        let literal = input.slice(token.startIndex, state.index + 1), body = input.slice(token.startIndex + 2, state.index), analysis = analyzeRepeatedExtglob(body, opts);
        if ((token.type === "plus" || token.type === "star") && analysis.risky) {
          let safeOutput = analysis.safeOutput ? (token.output ? "" : ONE_CHAR) + (opts.capture ? `(${analysis.safeOutput})` : analysis.safeOutput) : void 0, open = tokens[token.tokensIndex];
          open.type = "text", open.value = literal, open.output = safeOutput || utils.escapeRegex(literal);
          for (let i2 = token.tokensIndex + 1; i2 < tokens.length; i2++)
            tokens[i2].value = "", tokens[i2].output = "", delete tokens[i2].suffix;
          state.output = token.output + open.output, state.backtrack = !0, push({ type: "paren", extglob: !0, value, output: "" }), decrement("parens");
          return;
        }
        let output = token.close + (opts.capture ? ")" : ""), rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/") && (extglobStar = globstar(opts)), (extglobStar !== star || eos() || /^\)+$/.test(remaining())) && (output = token.close = `)$))${extglobStar}`), token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            let expression = parse(rest, { ...options, fastpaths: !1 }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          token.prev.type === "bos" && (state.negatedExtglob = !0);
        }
        push({ type: "paren", extglob: !0, value, output }), decrement("parens");
      };
      if (opts.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = !1, output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m3, esc, chars, first, rest, index) => first === "\\" ? (backslashes = !0, m3) : first === "?" ? esc ? esc + first + (rest ? QMARK.repeat(rest.length) : "") : index === 0 ? qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "") : QMARK.repeat(chars.length) : first === "." ? DOT_LITERAL.repeat(chars.length) : first === "*" ? esc ? esc + first + (rest ? star : "") : star : esc ? m3 : `\\${m3}`);
        return backslashes === !0 && (opts.unescape === !0 ? output = output.replace(/\\/g, "") : output = output.replace(/\\+/g, (m3) => m3.length % 2 === 0 ? "\\\\" : m3 ? "\\" : "")), output === input && opts.contains === !0 ? (state.output = input, state) : (state.output = utils.wrapOutput(output, state, options), state);
      }
      for (; !eos(); ) {
        if (value = advance(), value === "\0")
          continue;
        if (value === "\\") {
          let next = peek();
          if (next === "/" && opts.bash !== !0 || next === "." || next === ";")
            continue;
          if (!next) {
            value += "\\", push({ type: "text", value });
            continue;
          }
          let match = /^\\+/.exec(remaining()), slashes = 0;
          if (match && match[0].length > 2 && (slashes = match[0].length, state.index += slashes, slashes % 2 !== 0 && (value += "\\")), opts.unescape === !0 ? value = advance() : value += advance(), state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== !1 && value === ":") {
            let inner = prev.value.slice(1);
            if (inner.includes("[") && (prev.posix = !0, inner.includes(":"))) {
              let idx = prev.value.lastIndexOf("["), pre = prev.value.slice(0, idx), rest2 = prev.value.slice(idx + 2), posix2 = POSIX_REGEX_SOURCE[rest2];
              if (posix2) {
                prev.value = pre + posix2, state.backtrack = !0, advance(), !bos.output && tokens.indexOf(prev) === 1 && (bos.output = ONE_CHAR);
                continue;
              }
            }
          }
          (value === "[" && peek() !== ":" || value === "-" && peek() === "]") && (value = `\\${value}`), value === "]" && (prev.value === "[" || prev.value === "[^") && (value = `\\${value}`), opts.posix === !0 && value === "!" && prev.value === "[" && (value = "^"), prev.value += value, append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value), prev.value += value, append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1, opts.keepQuotes === !0 && push({ type: "text", value });
          continue;
        }
        if (value === "(") {
          increment("parens"), push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === !0)
            throw new SyntaxError(syntaxError("opening", "("));
          let extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" }), decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === !0 || !remaining().includes("]")) {
            if (opts.nobracket !== !0 && opts.strictBrackets === !0)
              throw new SyntaxError(syntaxError("closing", "]"));
            value = `\\${value}`;
          } else
            increment("brackets");
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === !0 || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === !0)
              throw new SyntaxError(syntaxError("opening", "["));
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          let prevValue = prev.value.slice(1);
          if (prev.posix !== !0 && prevValue[0] === "^" && !prevValue.includes("/") && (value = `/${value}`), prev.value += value, append({ value }), opts.literalBrackets === !1 || utils.hasRegexChars(prevValue))
            continue;
          let escaped = utils.escapeRegex(prev.value);
          if (state.output = state.output.slice(0, -prev.value.length), opts.literalBrackets === !0) {
            state.output += escaped, prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`, state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== !0) {
          increment("braces");
          let open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open), push(open);
          continue;
        }
        if (value === "}") {
          let brace = braces[braces.length - 1];
          if (opts.nobrace === !0 || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === !0) {
            let arr = tokens.slice(), range = [];
            for (let i2 = arr.length - 1; i2 >= 0 && (tokens.pop(), arr[i2].type !== "brace"); i2--)
              arr[i2].type !== "dots" && range.unshift(arr[i2].value);
            output = expandRange(range, opts), state.backtrack = !0;
          }
          if (brace.comma !== !0 && brace.dots !== !0) {
            let out = state.output.slice(0, brace.outputIndex), toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{", value = output = "\\}", state.output = out;
            for (let t2 of toks)
              state.output += t2.output || t2.value;
          }
          push({ type: "brace", value, output }), decrement("braces"), braces.pop();
          continue;
        }
        if (value === "|") {
          extglobs.length > 0 && extglobs[extglobs.length - 1].conditions++, push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value, brace = braces[braces.length - 1];
          brace && stack[stack.length - 1] === "braces" && (brace.comma = !0, output = "|"), push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1, state.consumed = "", state.output = "", tokens.pop(), prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            prev.value === "." && (prev.output = DOT_LITERAL);
            let brace = braces[braces.length - 1];
            prev.type = "dots", prev.output += value, prev.value += value, brace.dots = !0;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          if (!(prev && prev.value === "(") && opts.noextglob !== !0 && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            let next = peek(), output = value;
            (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) && (output = `\\${value}`), push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== !0 && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== !0 && peek() === "(" && (peek(2) !== "?" || !/[!=<:]/.test(peek(3)))) {
            extglobOpen("negate", value);
            continue;
          }
          if (opts.nonegate !== !0 && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== !0 && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === !1) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== !0 && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: !0, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          (value === "$" || value === "^") && (value = `\\${value}`);
          let match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          match && (value += match[0], state.index += match[0].length), push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === !0)) {
          prev.type = "star", prev.star = !0, prev.value += value, prev.output = star, state.backtrack = !0, state.globstar = !0, consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== !0 && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === !0) {
            consume(value);
            continue;
          }
          let prior = prev.prev, before = prior.prev, isStart = prior.type === "slash" || prior.type === "bos", afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === !0 && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          let isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace"), isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          for (; rest.slice(0, 3) === "/**"; ) {
            let after = input[state.index + 4];
            if (after && after !== "/")
              break;
            rest = rest.slice(3), consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar", prev.value += value, prev.output = globstar(opts), state.output = prev.output, state.globstar = !0, consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length), prior.output = `(?:${prior.output}`, prev.type = "globstar", prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)"), prev.value += value, state.globstar = !0, state.output += prior.output + prev.output, consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            let end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length), prior.output = `(?:${prior.output}`, prev.type = "globstar", prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`, prev.value += value, state.output += prior.output + prev.output, state.globstar = !0, consume(value + advance()), push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar", prev.value += value, prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`, state.output = prev.output, state.globstar = !0, consume(value + advance()), push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length), prev.type = "globstar", prev.output = globstar(opts), prev.value += value, state.output += prev.output, state.globstar = !0, consume(value);
          continue;
        }
        let token = { type: "star", value, output: star };
        if (opts.bash === !0) {
          token.output = ".*?", (prev.type === "bos" || prev.type === "slash") && (token.output = nodot + token.output), push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === !0) {
          token.output = value, push(token);
          continue;
        }
        (state.index === state.start || prev.type === "slash" || prev.type === "dot") && (prev.type === "dot" ? (state.output += NO_DOT_SLASH, prev.output += NO_DOT_SLASH) : opts.dot === !0 ? (state.output += NO_DOTS_SLASH, prev.output += NO_DOTS_SLASH) : (state.output += nodot, prev.output += nodot), peek() !== "*" && (state.output += ONE_CHAR, prev.output += ONE_CHAR)), push(token);
      }
      for (; state.brackets > 0; ) {
        if (opts.strictBrackets === !0) throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "["), decrement("brackets");
      }
      for (; state.parens > 0; ) {
        if (opts.strictBrackets === !0) throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "("), decrement("parens");
      }
      for (; state.braces > 0; ) {
        if (opts.strictBrackets === !0) throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{"), decrement("braces");
      }
      if (opts.strictSlashes !== !0 && (prev.type === "star" || prev.type === "bracket") && push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` }), state.backtrack === !0) {
        state.output = "";
        for (let token of state.tokens)
          state.output += token.output != null ? token.output : token.value, token.suffix && (state.output += token.suffix);
      }
      return state;
    };
    parse.fastpaths = (input, options) => {
      let opts = { ...options }, max = typeof opts.maxLength == "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH, len = input.length;
      if (len > max)
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      input = REPLACEMENTS[input] || input;
      let {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(opts.windows), nodot = opts.dot ? NO_DOTS : NO_DOT, slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT, capture = opts.capture ? "" : "?:", state = { negated: !1, prefix: "" }, star = opts.bash === !0 ? ".*?" : STAR;
      opts.capture && (star = `(${star})`);
      let globstar = (opts2) => opts2.noglobstar === !0 ? star : `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`, create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            let match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match) return;
            let source2 = create(match[1]);
            return source2 ? source2 + DOT_LITERAL + match[2] : void 0;
          }
        }
      }, output = utils.removePrefix(input, state), source = create(output);
      return source && opts.strictSlashes !== !0 && (source += `${SLASH_LITERAL}?`), source;
    };
    module.exports = parse;
  }
});

// ../../node_modules/tinyglobby/node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "../../node_modules/tinyglobby/node_modules/picomatch/lib/picomatch.js"(exports, module) {
    "use strict";
    var scan = require_scan(), parse = require_parse(), utils = require_utils(), constants = require_constants(), isObject = (val) => val && typeof val == "object" && !Array.isArray(val), picomatch2 = (glob, options, returnState = !1) => {
      if (Array.isArray(glob)) {
        let fns = glob.map((input) => picomatch2(input, options, returnState));
        return (str) => {
          for (let isMatch of fns) {
            let state2 = isMatch(str);
            if (state2) return state2;
          }
          return !1;
        };
      }
      let isState = isObject(glob) && glob.tokens && glob.input;
      if (glob === "" || typeof glob != "string" && !isState)
        throw new TypeError("Expected pattern to be a non-empty string");
      let opts = options || {}, posix2 = opts.windows, regex = isState ? picomatch2.compileRe(glob, options) : picomatch2.makeRe(glob, options, !1, !0), state = regex.state;
      delete regex.state;
      let isIgnored = () => !1;
      if (opts.ignore) {
        let ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch2(opts.ignore, ignoreOpts, returnState);
      }
      let matcher = (input, returnObject = !1) => {
        let { isMatch, match, output } = picomatch2.test(input, regex, options, { glob, posix: posix2 }), result = { glob, state, regex, posix: posix2, input, output, match, isMatch };
        return typeof opts.onResult == "function" && opts.onResult(result), isMatch === !1 ? (result.isMatch = !1, returnObject ? result : !1) : isIgnored(input) ? (typeof opts.onIgnore == "function" && opts.onIgnore(result), result.isMatch = !1, returnObject ? result : !1) : (typeof opts.onMatch == "function" && opts.onMatch(result), returnObject ? result : !0);
      };
      return returnState && (matcher.state = state), matcher;
    };
    picomatch2.test = (input, regex, options, { glob, posix: posix2 } = {}) => {
      if (typeof input != "string")
        throw new TypeError("Expected input to be a string");
      if (input === "")
        return { isMatch: !1, output: "" };
      let opts = options || {}, format = opts.format || (posix2 ? utils.toPosixSlashes : null), match = input === glob, output = match && format ? format(input) : input;
      return match === !1 && (output = format ? format(input) : input, match = output === glob), (match === !1 || opts.capture === !0) && (opts.matchBase === !0 || opts.basename === !0 ? match = picomatch2.matchBase(input, regex, options, posix2) : match = regex.exec(output)), { isMatch: !!match, match, output };
    };
    picomatch2.matchBase = (input, glob, options) => (glob instanceof RegExp ? glob : picomatch2.makeRe(glob, options)).test(utils.basename(input));
    picomatch2.isMatch = (str, patterns, options) => picomatch2(patterns, options)(str);
    picomatch2.parse = (pattern, options) => Array.isArray(pattern) ? pattern.map((p3) => picomatch2.parse(p3, options)) : parse(pattern, { ...options, fastpaths: !1 });
    picomatch2.scan = (input, options) => scan(input, options);
    picomatch2.compileRe = (state, options, returnOutput = !1, returnState = !1) => {
      if (returnOutput === !0)
        return state.output;
      let opts = options || {}, prepend = opts.contains ? "" : "^", append = opts.contains ? "" : "$", source = `${prepend}(?:${state.output})${append}`;
      state && state.negated === !0 && (source = `^(?!${source}).*$`);
      let regex = picomatch2.toRegex(source, options);
      return returnState === !0 && (regex.state = state), regex;
    };
    picomatch2.makeRe = (input, options = {}, returnOutput = !1, returnState = !1) => {
      if (!input || typeof input != "string")
        throw new TypeError("Expected a non-empty string");
      let parsed = { negated: !1, fastpaths: !0 };
      return options.fastpaths !== !1 && (input[0] === "." || input[0] === "*") && (parsed.output = parse.fastpaths(input, options)), parsed.output || (parsed = parse(input, options)), picomatch2.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch2.toRegex = (source, options) => {
      try {
        let opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === !0) throw err;
        return /$^/;
      }
    };
    picomatch2.constants = constants;
    module.exports = picomatch2;
  }
});

// ../../node_modules/tinyglobby/node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "../../node_modules/tinyglobby/node_modules/picomatch/index.js"(exports, module) {
    "use strict";
    var pico = require_picomatch(), utils = require_utils();
    function picomatch2(glob, options, returnState = !1) {
      return options && (options.windows === null || options.windows === void 0) && (options = { ...options, windows: utils.isWindows() }), pico(glob, options, returnState);
    }
    Object.assign(picomatch2, pico);
    module.exports = picomatch2;
  }
});

// src/channels/main.ts
var isMulti = (args) => args.transports !== void 0, generateRandomId = () => Math.random().toString(16).slice(2), Channel = class {
  constructor(input = {}) {
    this.sender = generateRandomId();
    this.events = {};
    this.data = {};
    this.transports = [];
    this.isAsync = input.async || !1, isMulti(input) ? (this.transports = input.transports || [], this.transports.forEach((t2) => {
      t2.setHandler((event) => this.handleEvent(event));
    })) : this.transports = input.transport ? [input.transport] : [], this.transports.forEach((t2) => {
      t2.setHandler((event) => this.handleEvent(event));
    });
  }
  get hasTransport() {
    return this.transports.length > 0;
  }
  addListener(eventName, listener) {
    this.events[eventName] = this.events[eventName] || [], this.events[eventName].push(listener);
  }
  emit(eventName, ...args) {
    let event = { type: eventName, args, from: this.sender }, options = {};
    args.length >= 1 && args[0] && args[0].options && (options = args[0].options);
    let handler = () => {
      this.transports.forEach((t2) => {
        t2.send(event, options);
      }), this.handleEvent(event);
    };
    this.isAsync ? setImmediate(handler) : handler();
  }
  last(eventName) {
    return this.data[eventName];
  }
  eventNames() {
    return Object.keys(this.events);
  }
  listenerCount(eventName) {
    let listeners = this.listeners(eventName);
    return listeners ? listeners.length : 0;
  }
  listeners(eventName) {
    return this.events[eventName] || void 0;
  }
  once(eventName, listener) {
    let onceListener = this.onceListener(eventName, listener);
    this.addListener(eventName, onceListener);
  }
  removeAllListeners(eventName) {
    eventName ? this.events[eventName] && delete this.events[eventName] : this.events = {};
  }
  removeListener(eventName, listener) {
    let listeners = this.listeners(eventName);
    listeners && (this.events[eventName] = listeners.filter((l3) => l3 !== listener));
  }
  on(eventName, listener) {
    this.addListener(eventName, listener);
  }
  off(eventName, listener) {
    this.removeListener(eventName, listener);
  }
  handleEvent(event) {
    let listeners = this.listeners(event.type);
    listeners && listeners.length && listeners.forEach((fn) => {
      fn.apply(event, event.args);
    }), this.data[event.type] = event.args;
  }
  onceListener(eventName, listener) {
    let onceListener = (...args) => (this.removeListener(eventName, onceListener), listener(...args));
    return onceListener;
  }
};

// src/channels/channel-slot.ts
var channel;
function syncGlobalSlot(next) {
  globalThis.__STORYBOOK_ADDONS_CHANNEL__ = next;
}
function getChannel() {
  let fromGlobal = globalThis.__STORYBOOK_ADDONS_CHANNEL__;
  return fromGlobal && (channel = fromGlobal), channel ?? null;
}
function setChannel(next) {
  channel = next ?? void 0, syncGlobalSlot(channel);
}
function installNoopChannel() {
  setChannel(new Channel({}));
}
function ensureChannel() {
  getChannel() || installNoopChannel();
}
typeof window > "u" && ensureChannel();

// src/shared/open-service/service-channel.ts
var SERVICE_SYNC_START = "services:sync-start", SERVICE_SYNC_START_REPLY = "services:sync-start-reply", SERVICE_PATCHES = "services:patches", SERVICE_COMMAND_INVOKE = "services:command-invoke", SERVICE_COMMAND_ACK = "services:command-ack", SERVICE_COMMAND_RESULT = "services:command-result", SERVICE_COMMAND_ERROR = "services:command-error", stateSnapshotSchema = custom(
  (value) => typeof value == "object" && value !== null && !Array.isArray(value)
), syncStartSchema = object({
  serviceId: string(),
  clientId: string()
}), stampedSnapshotSchema = object({
  serviceId: string(),
  state: stateSnapshotSchema,
  version: pipe(number(), safeInteger(), minValue(0)),
  clientId: string()
}), commandInvokeSchema = object({
  serviceId: string(),
  commandName: string(),
  input: optional(unknown()),
  callId: string(),
  clientId: string()
}), commandAckSchema = object({
  serviceId: string(),
  callId: string(),
  clientId: string()
}), commandResultSchema = object({
  serviceId: string(),
  callId: string(),
  result: optional(unknown()),
  clientId: string()
}), commandErrorSchema = object({
  serviceId: string(),
  callId: string(),
  error: custom(
    (value) => typeof value == "object" && value !== null && !Array.isArray(value)
  ),
  clientId: string()
});
function generateClientId() {
  return nanoid();
}

// ../../node_modules/@preact/signals-core/dist/signals-core.mjs
var i = /* @__PURE__ */ Symbol.for("preact-signals");
function t() {
  if (e > 1) {
    e--;
    return;
  }
  let i2, t2 = !1;
  for ((function() {
    let i3 = r;
    for (r = void 0; i3 !== void 0; )
      i3.S.v === i3.v && (i3.S.i = i3.i), i3 = i3.o;
  })(); s !== void 0; ) {
    let n3 = s;
    for (s = void 0, u++; n3 !== void 0; ) {
      let o3 = n3.u;
      if (n3.u = void 0, n3.f &= -3, !(8 & n3.f) && w(n3)) try {
        n3.c();
      } catch (n4) {
        t2 || (i2 = n4, t2 = !0);
      }
      n3 = o3;
    }
  }
  if (u = 0, e--, t2) throw i2;
}
function n(i2) {
  if (e > 0) return i2();
  d = ++c, e++;
  try {
    return i2();
  } finally {
    t();
  }
}
var o, s;
function h(i2) {
  let t2 = o;
  o = void 0;
  try {
    return i2();
  } finally {
    o = t2;
  }
}
var r, f, e = 0, u = 0, c = 0, d = 0, v = 0;
function l(i2) {
  if (o === void 0) return;
  let t2 = i2.n;
  if (t2 === void 0 || t2.t !== o)
    return t2 = { i: 0, S: i2, p: o.s, n: void 0, t: o, e: void 0, x: void 0, r: t2 }, o.s !== void 0 && (o.s.n = t2), o.s = t2, i2.n = t2, 32 & o.f && i2.S(t2), t2;
  if (t2.i === -1)
    return t2.i = 0, t2.n !== void 0 && (t2.n.p = t2.p, t2.p !== void 0 && (t2.p.n = t2.n), t2.p = o.s, t2.n = void 0, o.s.n = t2, o.s = t2), t2;
}
function y(i2, t2) {
  this.v = i2, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = t2?.watched, this.Z = t2?.unwatched, this.name = t2?.name;
}
y.prototype.brand = i;
y.prototype.h = function() {
  return !0;
};
y.prototype.S = function(i2) {
  let t2 = this.t;
  t2 !== i2 && i2.e === void 0 && (i2.x = t2, this.t = i2, t2 !== void 0 ? t2.e = i2 : h(() => {
    var i3;
    (i3 = this.W) == null || i3.call(this);
  }));
};
y.prototype.U = function(i2) {
  if (this.t !== void 0) {
    let t2 = i2.e, n3 = i2.x;
    t2 !== void 0 && (t2.x = n3, i2.e = void 0), n3 !== void 0 && (n3.e = t2, i2.x = void 0), i2 === this.t && (this.t = n3, n3 === void 0 && h(() => {
      var i3;
      (i3 = this.Z) == null || i3.call(this);
    }));
  }
};
y.prototype.subscribe = function(i2) {
  return j(() => {
    let t2 = this.value, n3 = o;
    o = void 0;
    try {
      i2(t2);
    } finally {
      o = n3;
    }
  }, { name: "sub" });
};
y.prototype.valueOf = function() {
  return this.value;
};
y.prototype.toString = function() {
  return this.value + "";
};
y.prototype.toJSON = function() {
  return this.value;
};
y.prototype.peek = function() {
  return h(() => this.value);
};
Object.defineProperty(y.prototype, "value", { get() {
  let i2 = l(this);
  return i2 !== void 0 && (i2.i = this.i), this.v;
}, set(i2) {
  if (i2 !== this.v) {
    if (u > 100) throw new Error("Cycle detected");
    (function(i3) {
      e !== 0 && u === 0 && i3.l !== d && (i3.l = d, r = { S: i3, v: i3.v, i: i3.i, o: r });
    })(this), this.v = i2, this.i++, v++, e++;
    try {
      for (let i3 = this.t; i3 !== void 0; i3 = i3.x) i3.t.N();
    } finally {
      t();
    }
  }
} });
function a(i2, t2) {
  return new y(i2, t2);
}
function w(i2) {
  for (let t2 = i2.s; t2 !== void 0; t2 = t2.n) if (t2.S.i !== t2.i || !t2.S.h() || t2.S.i !== t2.i) return !0;
  return !1;
}
function _(i2) {
  for (let t2 = i2.s; t2 !== void 0; t2 = t2.n) {
    let n3 = t2.S.n;
    if (n3 !== void 0 && (t2.r = n3), t2.S.n = t2, t2.i = -1, t2.n === void 0) {
      i2.s = t2;
      break;
    }
  }
}
function b(i2) {
  let t2, n3 = i2.s;
  for (; n3 !== void 0; ) {
    let i3 = n3.p;
    n3.i === -1 ? (n3.S.U(n3), i3 !== void 0 && (i3.n = n3.n), n3.n !== void 0 && (n3.n.p = i3)) : t2 = n3, n3.S.n = n3.r, n3.r !== void 0 && (n3.r = void 0), n3 = i3;
  }
  i2.s = t2;
}
function p(i2, t2) {
  y.call(this, void 0), this.x = i2, this.s = void 0, this.g = v - 1, this.f = 4, this.W = t2?.watched, this.Z = t2?.unwatched, this.name = t2?.name;
}
p.prototype = new y();
p.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === v)) return !0;
  if (this.g = v, this.f |= 1, this.i > 0 && !w(this))
    return this.f &= -2, !0;
  let i2 = o;
  try {
    _(this), o = this;
    let i3 = this.x();
    (16 & this.f || this.v !== i3 || this.i === 0) && (this.v = i3, this.f &= -17, this.i++);
  } catch (i3) {
    this.v = i3, this.f |= 16, this.i++;
  }
  return o = i2, b(this), this.f &= -2, !0;
};
p.prototype.S = function(i2) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let i3 = this.s; i3 !== void 0; i3 = i3.n) i3.S.S(i3);
  }
  y.prototype.S.call(this, i2);
};
p.prototype.U = function(i2) {
  if (this.t !== void 0 && (y.prototype.U.call(this, i2), this.t === void 0)) {
    this.f &= -33;
    for (let i3 = this.s; i3 !== void 0; i3 = i3.n) i3.S.U(i3);
  }
};
p.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let i2 = this.t; i2 !== void 0; i2 = i2.x) i2.t.N();
  }
};
Object.defineProperty(p.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  let i2 = l(this);
  if (this.h(), i2 !== void 0 && (i2.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} });
function g(i2, t2) {
  return new p(i2, t2);
}
function S(i2) {
  let n3 = i2.m;
  if (i2.m = void 0, typeof n3 == "function") {
    e++;
    let s3 = o;
    o = void 0;
    try {
      n3();
    } catch (t2) {
      throw i2.f &= -2, i2.f |= 8, m(i2), t2;
    } finally {
      o = s3, t();
    }
  }
}
function m(i2) {
  for (let t2 = i2.s; t2 !== void 0; t2 = t2.n) t2.S.U(t2);
  i2.x = void 0, i2.s = void 0, S(i2);
}
function x(i2) {
  if (o !== this) throw new Error("Out-of-order effect");
  b(this), o = i2, this.f &= -2, 8 & this.f && m(this), t();
}
function E(i2, t2) {
  this.x = i2, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = t2?.name, f && f.push(this);
}
E.prototype.c = function() {
  let i2 = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    let t2 = this.x();
    typeof t2 == "function" && (this.m = t2);
  } finally {
    i2();
  }
};
E.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, S(this), _(this), e++;
  let i2 = o;
  return o = this, x.bind(this, i2);
};
E.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = s, s = this);
};
E.prototype.d = function() {
  this.f |= 8, 1 & this.f || m(this);
};
E.prototype.dispose = function() {
  this.d();
};
function j(i2, t2) {
  let n3 = new E(i2, t2);
  try {
    n3.c();
  } catch (i3) {
    throw n3.d(), i3;
  }
  let o3 = n3.d.bind(n3);
  return o3[Symbol.dispose] = o3, o3;
}

// ../../node_modules/deepsignal/core/dist/deepsignal-core.mjs
var n2 = /* @__PURE__ */ new WeakMap(), s2 = /* @__PURE__ */ new WeakMap(), a2 = /* @__PURE__ */ new WeakMap(), o2 = /* @__PURE__ */ new WeakSet(), l2 = /* @__PURE__ */ new WeakMap(), c2 = /^\$/, f2 = Object.getOwnPropertyDescriptor, g2 = !1, u2 = (e2) => {
  if (!R(e2)) throw new Error("This object can't be observed.");
  return s2.has(e2) || s2.set(e2, p2(e2, v2)), s2.get(e2);
};
var p2 = (e2, t2) => {
  let r2 = new Proxy(e2, t2);
  return o2.add(r2), r2;
}, y2 = () => {
  throw new Error("Don't mutate the signals directly.");
}, w2 = (e2) => (o3, l3, u3) => {
  var i2;
  if (g2) return Reflect.get(o3, l3, u3);
  let h2 = e2 || l3[0] === "$";
  if (!e2 && h2 && Array.isArray(o3)) {
    if (l3 === "$") return a2.has(o3) || a2.set(o3, p2(o3, d2)), a2.get(o3);
    h2 = l3 === "$length";
  }
  n2.has(u3) || n2.set(u3, /* @__PURE__ */ new Map());
  let y3 = n2.get(u3), w3 = h2 ? l3.replace(c2, "") : l3;
  if (y3.has(w3) || typeof ((i2 = f2(o3, w3)) == null ? void 0 : i2.get) != "function") {
    let e3 = Reflect.get(o3, w3, u3);
    if (h2 && typeof e3 == "function") return;
    if (typeof w3 == "symbol" && b2.has(w3)) return e3;
    y3.has(w3) || (R(e3) && (s2.has(e3) || s2.set(e3, p2(e3, v2)), e3 = s2.get(e3)), y3.set(w3, a(e3)));
  } else y3.set(w3, g(() => Reflect.get(o3, w3, u3)));
  return h2 ? y3.get(w3) : y3.get(w3).value;
}, v2 = { get: w2(!1), set(r2, a3, o3, g3) {
  var u3;
  if (typeof ((u3 = f2(r2, a3)) == null ? void 0 : u3.set) == "function") return Reflect.set(r2, a3, o3, g3);
  n2.has(g3) || n2.set(g3, /* @__PURE__ */ new Map());
  let i2 = n2.get(g3);
  if (a3[0] === "$") {
    o3 instanceof y || y2();
    let t2 = a3.replace(c2, "");
    return i2.set(t2, o3), Reflect.set(r2, t2, o3.peek(), g3);
  }
  {
    let e2 = o3;
    R(o3) && (s2.has(o3) || s2.set(o3, p2(o3, v2)), e2 = s2.get(o3));
    let n3 = !(a3 in r2), c3 = Reflect.set(r2, a3, o3, g3);
    return i2.has(a3) ? i2.get(a3).value = e2 : i2.set(a3, a(e2)), n3 && l2.has(r2) && l2.get(r2).value++, Array.isArray(r2) && i2.has("length") && (i2.get("length").value = r2.length), c3;
  }
}, deleteProperty(e2, t2) {
  t2[0] === "$" && y2();
  let r2 = n2.get(s2.get(e2)), a3 = Reflect.deleteProperty(e2, t2);
  return r2 && r2.has(t2) && (r2.get(t2).value = void 0), l2.has(e2) && l2.get(e2).value++, a3;
}, ownKeys: (e2) => (l2.has(e2) || l2.set(e2, a(0)), l2._ = l2.get(e2).value, Reflect.ownKeys(e2)) }, d2 = { get: w2(!0), set: y2, deleteProperty: y2 }, b2 = new Set(Object.getOwnPropertyNames(Symbol).map((e2) => Symbol[e2]).filter((e2) => typeof e2 == "symbol")), m2 = /* @__PURE__ */ new Set([Object, Array]), R = (e2) => typeof e2 == "object" && e2 !== null && m2.has(e2.constructor) && !o2.has(e2);

// ../../node_modules/es-toolkit/dist/predicate/isPlainObject.mjs
function isPlainObject(value) {
  if (!value || typeof value != "object")
    return !1;
  let proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype || Object.getPrototypeOf(proto) === null ? Object.prototype.toString.call(value) === "[object Object]" : !1;
}

// ../../node_modules/es-toolkit/dist/compat/_internal/getSymbols.mjs
function getSymbols(object2) {
  return Object.getOwnPropertySymbols(object2).filter((symbol) => Object.prototype.propertyIsEnumerable.call(object2, symbol));
}

// ../../node_modules/es-toolkit/dist/compat/_internal/getTag.mjs
function getTag(value) {
  return value == null ? value === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
}

// ../../node_modules/es-toolkit/dist/compat/_internal/tags.mjs
var regexpTag = "[object RegExp]", stringTag = "[object String]", numberTag = "[object Number]", booleanTag = "[object Boolean]", argumentsTag = "[object Arguments]", symbolTag = "[object Symbol]", dateTag = "[object Date]", mapTag = "[object Map]", setTag = "[object Set]", arrayTag = "[object Array]", functionTag = "[object Function]", arrayBufferTag = "[object ArrayBuffer]", objectTag = "[object Object]", errorTag = "[object Error]", dataViewTag = "[object DataView]", uint8ArrayTag = "[object Uint8Array]", uint8ClampedArrayTag = "[object Uint8ClampedArray]", uint16ArrayTag = "[object Uint16Array]", uint32ArrayTag = "[object Uint32Array]", bigUint64ArrayTag = "[object BigUint64Array]", int8ArrayTag = "[object Int8Array]", int16ArrayTag = "[object Int16Array]", int32ArrayTag = "[object Int32Array]", bigInt64ArrayTag = "[object BigInt64Array]", float32ArrayTag = "[object Float32Array]", float64ArrayTag = "[object Float64Array]";

// ../../node_modules/es-toolkit/dist/compat/util/eq.mjs
function eq(value, other) {
  return value === other || Number.isNaN(value) && Number.isNaN(other);
}

// ../../node_modules/es-toolkit/dist/predicate/isEqualWith.mjs
function isEqualWith(a3, b3, areValuesEqual) {
  return isEqualWithImpl(a3, b3, void 0, void 0, void 0, void 0, areValuesEqual);
}
function isEqualWithImpl(a3, b3, property, aParent, bParent, stack, areValuesEqual) {
  let result = areValuesEqual(a3, b3, property, aParent, bParent, stack);
  if (result !== void 0)
    return result;
  if (typeof a3 == typeof b3)
    switch (typeof a3) {
      case "bigint":
      case "string":
      case "boolean":
      case "symbol":
      case "undefined":
        return a3 === b3;
      case "number":
        return a3 === b3 || Object.is(a3, b3);
      case "function":
        return a3 === b3;
      case "object":
        return areObjectsEqual(a3, b3, stack, areValuesEqual);
    }
  return areObjectsEqual(a3, b3, stack, areValuesEqual);
}
function areObjectsEqual(a3, b3, stack, areValuesEqual) {
  if (Object.is(a3, b3))
    return !0;
  let aTag = getTag(a3), bTag = getTag(b3);
  if (aTag === argumentsTag && (aTag = objectTag), bTag === argumentsTag && (bTag = objectTag), aTag !== bTag)
    return !1;
  switch (aTag) {
    case stringTag:
      return a3.toString() === b3.toString();
    case numberTag: {
      let x2 = a3.valueOf(), y3 = b3.valueOf();
      return eq(x2, y3);
    }
    case booleanTag:
    case dateTag:
    case symbolTag:
      return Object.is(a3.valueOf(), b3.valueOf());
    case regexpTag:
      return a3.source === b3.source && a3.flags === b3.flags;
    case functionTag:
      return a3 === b3;
  }
  stack = stack ?? /* @__PURE__ */ new Map();
  let aStack = stack.get(a3), bStack = stack.get(b3);
  if (aStack != null && bStack != null)
    return aStack === b3;
  stack.set(a3, b3), stack.set(b3, a3);
  try {
    switch (aTag) {
      case mapTag: {
        if (a3.size !== b3.size)
          return !1;
        for (let [key, value] of a3.entries())
          if (!b3.has(key) || !isEqualWithImpl(value, b3.get(key), key, a3, b3, stack, areValuesEqual))
            return !1;
        return !0;
      }
      case setTag: {
        if (a3.size !== b3.size)
          return !1;
        let aValues = Array.from(a3.values()), bValues = Array.from(b3.values());
        for (let i2 = 0; i2 < aValues.length; i2++) {
          let aValue = aValues[i2], index = bValues.findIndex((bValue) => isEqualWithImpl(aValue, bValue, void 0, a3, b3, stack, areValuesEqual));
          if (index === -1)
            return !1;
          bValues.splice(index, 1);
        }
        return !0;
      }
      case arrayTag:
      case uint8ArrayTag:
      case uint8ClampedArrayTag:
      case uint16ArrayTag:
      case uint32ArrayTag:
      case bigUint64ArrayTag:
      case int8ArrayTag:
      case int16ArrayTag:
      case int32ArrayTag:
      case bigInt64ArrayTag:
      case float32ArrayTag:
      case float64ArrayTag: {
        if (typeof Buffer < "u" && Buffer.isBuffer(a3) !== Buffer.isBuffer(b3) || a3.length !== b3.length)
          return !1;
        for (let i2 = 0; i2 < a3.length; i2++)
          if (!isEqualWithImpl(a3[i2], b3[i2], i2, a3, b3, stack, areValuesEqual))
            return !1;
        return !0;
      }
      case arrayBufferTag:
        return a3.byteLength !== b3.byteLength ? !1 : areObjectsEqual(new Uint8Array(a3), new Uint8Array(b3), stack, areValuesEqual);
      case dataViewTag:
        return a3.byteLength !== b3.byteLength || a3.byteOffset !== b3.byteOffset ? !1 : areObjectsEqual(new Uint8Array(a3), new Uint8Array(b3), stack, areValuesEqual);
      case errorTag:
        return a3.name === b3.name && a3.message === b3.message;
      case objectTag: {
        if (!(areObjectsEqual(a3.constructor, b3.constructor, stack, areValuesEqual) || isPlainObject(a3) && isPlainObject(b3)))
          return !1;
        let aKeys = [...Object.keys(a3), ...getSymbols(a3)], bKeys = [...Object.keys(b3), ...getSymbols(b3)];
        if (aKeys.length !== bKeys.length)
          return !1;
        for (let i2 = 0; i2 < aKeys.length; i2++) {
          let propKey = aKeys[i2], aProp = a3[propKey];
          if (!Object.hasOwn(b3, propKey))
            return !1;
          let bProp = b3[propKey];
          if (!isEqualWithImpl(aProp, bProp, propKey, a3, b3, stack, areValuesEqual))
            return !1;
        }
        return !0;
      }
      default:
        return !1;
    }
  } finally {
    stack.delete(a3), stack.delete(b3);
  }
}

// ../../node_modules/es-toolkit/dist/function/noop.mjs
function noop() {
}

// ../../node_modules/es-toolkit/dist/predicate/isEqual.mjs
function isEqual(a3, b3) {
  return isEqualWith(a3, b3, noop);
}

// ../../node_modules/es-toolkit/dist/predicate/isPrimitive.mjs
function isPrimitive(value) {
  return value == null || typeof value != "object" && typeof value != "function";
}

// ../../node_modules/es-toolkit/dist/predicate/isTypedArray.mjs
function isTypedArray(x2) {
  return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
}

// src/shared/open-service/query-state.ts
function buildQueryState(data, lifecycle) {
  let isPending = lifecycle.status === "pending", isLoading = lifecycle.loadStatus === "loading";
  return {
    data,
    error: lifecycle.error,
    status: lifecycle.status,
    loadStatus: lifecycle.loadStatus,
    isPending,
    isSuccess: lifecycle.status === "success",
    isError: lifecycle.status === "error",
    isLoading,
    isInitialLoading: isPending && isLoading && data === void 0,
    isRefreshing: isLoading && !isPending
  };
}
function toError(value) {
  return value instanceof Error ? value : new Error(String(value));
}

// src/shared/open-service/service-validation.ts
function rethrowAsync(error) {
  queueMicrotask(() => {
    throw error;
  });
}
async function validateSchema(schema, value, meta) {
  let validationResult = await schema["~standard"].validate(value);
  if (validationResult.issues)
    throw new OpenServiceValidationError({ ...meta, issues: validationResult.issues });
  return validationResult.value;
}
function validateSchemaSync(schema, value, meta) {
  let validationResult = schema["~standard"].validate(value);
  if (validationResult instanceof Promise)
    throw new OpenServiceAsyncSchemaError({
      kind: meta.kind,
      serviceId: meta.serviceId,
      name: meta.name,
      phase: meta.phase
    });
  if (validationResult.issues)
    throw new OpenServiceValidationError({ ...meta, issues: validationResult.issues });
  return validationResult.value;
}

// src/shared/open-service/query-runtime.ts
var MAX_DRAIN_ITERATIONS = 32, inFlightLoads = /* @__PURE__ */ new Map(), activeHandlerLoadSession, EMPTY_SET = /* @__PURE__ */ new Set();
function stableHash(value) {
  let encode = (raw) => {
    if (raw === void 0)
      return { __t: "undefined" };
    if (raw === null || typeof raw != "object")
      return raw;
    if (Array.isArray(raw))
      return raw.map(encode);
    let sorted = {};
    for (let k of Object.keys(raw).sort())
      sorted[k] = encode(raw[k]);
    return { __t: "object", value: sorted };
  };
  return JSON.stringify(encode(value));
}
function makeLoadKey(serviceId, queryName, validatedInput) {
  return `${serviceId}::${queryName}::${stableHash(validatedInput)}`;
}
function surfaceRejections(settlements) {
  let rejections = settlements.filter((s3) => s3.status === "rejected");
  if (rejections.length === 0)
    return;
  let [first, ...rest] = rejections.map((r2) => r2.reason);
  if (rest.length > 0 && first instanceof Error && Reflect.get(first, "cause") === void 0)
    try {
      Reflect.set(first, "cause", { aggregated: rest });
    } catch {
    }
  throw first;
}
async function drainCollector(collector, settledKeys, serviceId, queryName) {
  let iterations = 0;
  for (; collector.size > 0; ) {
    if (iterations++ > MAX_DRAIN_ITERATIONS)
      throw new OpenServiceLoadedDrainExceededError({
        serviceId,
        name: queryName,
        iterations: MAX_DRAIN_ITERATIONS
      });
    let pending = [...collector];
    collector.clear();
    let settlements = await Promise.allSettled(pending.map((entry) => entry.promise));
    if (settledKeys)
      for (let entry of pending)
        settledKeys.add(entry.key);
    surfaceRejections(settlements);
  }
}
function detachSnapshot(value) {
  return value === null || typeof value != "object" ? value : JSON.parse(JSON.stringify(value));
}
function validateQueryInput(refs, queryName, queryDef, input) {
  return validateSchemaSync(queryDef.input, input, {
    kind: "query",
    serviceId: refs.serviceId,
    name: queryName,
    phase: "input"
  });
}
function validateQueryOutput(refs, queryName, queryDef, output) {
  return validateSchemaSync(queryDef.output, output, {
    kind: "query",
    serviceId: refs.serviceId,
    name: queryName,
    phase: "output"
  });
}
function runHandlerSync(refs, queryName, queryDef, validatedInput, selfQueries, getService3) {
  if (!queryDef.handler)
    throw new OpenServiceUnimplementedOperationError({
      kind: "query",
      serviceId: refs.serviceId,
      name: queryName
    });
  let handlerCtx = { self: {
    get state() {
      return refs.state;
    },
    queries: selfQueries
  }, getService: getService3 };
  return queryDef.handler(validatedInput, handlerCtx);
}
function createQueryGet(refs, queryName, queryDef, selfQueries, fireLoad) {
  return function(input) {
    let validatedInput = validateQueryInput(
      refs,
      queryName,
      queryDef,
      arguments.length === 0 ? void 0 : input
    );
    return queryDef.load && fireLoad?.(validatedInput), validateQueryOutput(
      refs,
      queryName,
      queryDef,
      runHandlerSync(
        refs,
        queryName,
        queryDef,
        validatedInput,
        selfQueries,
        refs.registryApi.getService
      )
    );
  };
}
function triggerLoad(refs, queryName, queryDef, validatedInput, loadKey, parentAncestorChain) {
  let existing = inFlightLoads.get(loadKey);
  if (existing)
    return existing;
  let extendedChain = new Set(parentAncestorChain);
  extendedChain.add(loadKey);
  let promise2 = Promise.resolve().then(() => runLoadBody(refs, queryName, queryDef, validatedInput, extendedChain)).finally(() => {
    inFlightLoads.get(loadKey) === promise2 && inFlightLoads.delete(loadKey);
  });
  return inFlightLoads.set(loadKey, promise2), promise2;
}
async function runLoadBody(refs, queryName, queryDef, validatedInput, ancestorChain) {
  if (!queryDef.load)
    return;
  let collector = /* @__PURE__ */ new Set(), wrappedQueries = buildLoadWrappedQueries(refs, ancestorChain, collector), loadCtx = { self: {
    get state() {
      return refs.state;
    },
    queries: wrappedQueries,
    commands: refs.getLoadCommands()
  }, getService: refs.registryApi.getService };
  await Promise.resolve(queryDef.load(validatedInput, loadCtx)), await drainCollector(collector, void 0, refs.serviceId, queryName);
}
async function runReactiveLoad(refs, queryName, queryDef, validatedInput, isCurrent) {
  if (!queryDef.load)
    return;
  let loadCtx = { self: {
    get state() {
      return refs.state;
    },
    // Reactive-load reads must keep dependency loads warm. `.get()` on a default query is a pure
    // read and never fires a load, so the body sees fire-and-forget wrappers instead: reading a
    // dependency triggers its load (deduped while in flight) without awaiting a drain.
    queries: refs.reactiveLoadQueries,
    commands: refs.buildGatedCommands(isCurrent)
  }, getService: refs.registryApi.getService };
  await Promise.resolve(queryDef.load(validatedInput, loadCtx));
}
function buildReactiveLoadQueries(refs) {
  let wrappedQueries = {};
  for (let [name, queryDef] of refs.queryDefinitions) {
    let defaultQuery = refs.defaultQueries[name], get = createQueryGet(refs, name, queryDef, wrappedQueries, (validatedInput) => {
      let loadKey = makeLoadKey(refs.serviceId, name, validatedInput);
      triggerLoad(refs, name, queryDef, validatedInput, loadKey, EMPTY_SET).catch(rethrowAsync);
    });
    wrappedQueries[name] = {
      get,
      loaded: defaultQuery.loaded,
      subscribe: defaultQuery.subscribe
    };
  }
  return wrappedQueries;
}
function buildLoadWrappedQueries(refs, ancestorChain, collector) {
  let wrappedQueries = {};
  for (let [name, queryDef] of refs.queryDefinitions) {
    let defaultQuery = refs.defaultQueries[name], wrapped = {
      get: createQueryGet(refs, name, queryDef, wrappedQueries, (validatedInput) => {
        let loadKey = makeLoadKey(refs.serviceId, name, validatedInput), promise2 = triggerLoad(refs, name, queryDef, validatedInput, loadKey, ancestorChain);
        ancestorChain.has(loadKey) || collector.add({ key: loadKey, promise: promise2 });
      }),
      loaded(input) {
        return runLoaded(
          refs,
          name,
          queryDef,
          arguments.length === 0 ? void 0 : input,
          ancestorChain
        );
      },
      subscribe: defaultQuery.subscribe
    };
    wrappedQueries[name] = wrapped;
  }
  return wrappedQueries;
}
async function runLoaded(refs, queryName, queryDef, rawInput, parentAncestorChain = EMPTY_SET) {
  let validatedInput = validateQueryInput(refs, queryName, queryDef, rawInput), loadKey = makeLoadKey(refs.serviceId, queryName, validatedInput), ancestorChain = new Set(parentAncestorChain);
  ancestorChain.add(loadKey);
  let session = {
    ancestorChain,
    collector: /* @__PURE__ */ new Set(),
    settledKeys: /* @__PURE__ */ new Set()
  };
  if (queryDef.load && !parentAncestorChain.has(loadKey)) {
    let promise2 = triggerLoad(
      refs,
      queryName,
      queryDef,
      validatedInput,
      loadKey,
      parentAncestorChain
    );
    session.collector.add({ key: loadKey, promise: promise2 });
  }
  let iterations = 0, hasMoreWork = !0;
  for (; hasMoreWork; ) {
    if (iterations++ > MAX_DRAIN_ITERATIONS)
      throw new OpenServiceLoadedDrainExceededError({
        serviceId: refs.serviceId,
        name: queryName,
        iterations: MAX_DRAIN_ITERATIONS
      });
    for (; session.collector.size > 0; ) {
      let pending = [...session.collector];
      session.collector.clear();
      let settlements = await Promise.allSettled(pending.map((entry) => entry.promise));
      for (let entry of pending)
        session.settledKeys.add(entry.key);
      surfaceRejections(settlements);
    }
    let previousSession2 = activeHandlerLoadSession;
    activeHandlerLoadSession = session;
    try {
      runHandlerSync(
        refs,
        queryName,
        queryDef,
        validatedInput,
        refs.defaultQueries,
        refs.registryApi.getService
      );
    } catch {
    } finally {
      activeHandlerLoadSession = previousSession2;
    }
    hasMoreWork = session.collector.size > 0;
  }
  let previousSession = activeHandlerLoadSession;
  activeHandlerLoadSession = session;
  try {
    return validateQueryOutput(
      refs,
      queryName,
      queryDef,
      runHandlerSync(
        refs,
        queryName,
        queryDef,
        validatedInput,
        refs.defaultQueries,
        refs.registryApi.getService
      )
    );
  } finally {
    activeHandlerLoadSession = previousSession;
  }
}
function createDefaultQuery(refs, queryName, queryDef) {
  let resolveInput = (input, argsLength) => argsLength === 0 ? void 0 : input;
  return {
    get: createQueryGet(refs, queryName, queryDef, refs.defaultQueries, (validatedInput) => {
      let session = activeHandlerLoadSession;
      if (!session)
        return;
      let loadKey = makeLoadKey(refs.serviceId, queryName, validatedInput);
      if (!session.ancestorChain.has(loadKey) && !session.settledKeys.has(loadKey)) {
        let promise2 = triggerLoad(
          refs,
          queryName,
          queryDef,
          validatedInput,
          loadKey,
          session.ancestorChain
        );
        session.collector.add({ key: loadKey, promise: promise2 });
      }
    }),
    loaded(input) {
      return runLoaded(refs, queryName, queryDef, resolveInput(input, arguments.length));
    },
    subscribe: ((...args) => {
      if (args.length === 1 && typeof args[0] == "function")
        return subscribeToQuery(
          refs,
          queryName,
          queryDef,
          void 0,
          void 0,
          args[0]
        );
      if (args.length === 2 && typeof args[0] == "function" && typeof args[1] == "function")
        return subscribeToQuery(
          refs,
          queryName,
          queryDef,
          void 0,
          args[0],
          args[1]
        );
      let [input, selectorOrCallback, maybeCallback] = args;
      return subscribeToQuery(
        refs,
        queryName,
        queryDef,
        input,
        maybeCallback ? selectorOrCallback : void 0,
        maybeCallback ?? selectorOrCallback
      );
    })
  };
}
function subscribeToQuery(refs, queryName, queryDef, rawInput, selector, callback2) {
  let active = !0, validatedInput;
  try {
    validatedInput = validateQueryInput(refs, queryName, queryDef, rawInput);
  } catch (error) {
    return callback2(
      buildQueryState(void 0, { status: "error", error: toError(error), loadStatus: "idle" })
    ), () => {
      active = !1;
    };
  }
  let lifecycle = a({
    status: queryDef.load ? "pending" : "success",
    error: void 0,
    loadStatus: "idle"
  }), loadTeardown;
  if (queryDef.load) {
    let epoch = 0;
    loadTeardown = j(() => {
      let myEpoch = ++epoch, isCurrent = () => myEpoch === epoch, previous = h(() => lifecycle.value);
      lifecycle.value = {
        status: previous.status,
        error: previous.error,
        loadStatus: "loading"
      }, runReactiveLoad(refs, queryName, queryDef, validatedInput, isCurrent).then(
        () => {
          isCurrent() && (lifecycle.value = { status: "success", error: void 0, loadStatus: "idle" });
        },
        (error) => {
          isCurrent() && (lifecycle.value = { status: "error", error: toError(error), loadStatus: "idle" });
        }
      );
    });
  }
  let comp = g(() => {
    let output = runHandlerSync(
      refs,
      queryName,
      queryDef,
      validatedInput,
      refs.defaultQueries,
      refs.registryApi.getService
    );
    if (selector) {
      let validated = h(() => validateQueryOutput(refs, queryName, queryDef, output));
      return selector(output), detachSnapshot(selector(validated));
    }
    return detachSnapshot(validateQueryOutput(refs, queryName, queryDef, output));
  }), hasEmitted = !1, lastEmitted, lastData, teardown = j(() => {
    let life = lifecycle.value, data, status = life.status, error = life.error;
    try {
      data = comp.value, lastData = data;
    } catch (handlerError) {
      data = lastData, status = "error", error = toError(handlerError);
    }
    if (!active)
      return;
    let state = buildQueryState(data, { status, error, loadStatus: life.loadStatus });
    hasEmitted && isEqual(state, lastEmitted) || (hasEmitted = !0, lastEmitted = state, callback2(state));
  });
  return () => {
    active = !1, teardown(), loadTeardown?.();
  };
}
function buildQueries(refs) {
  let result = {};
  for (let [name, queryDef] of refs.queryDefinitions)
    result[name] = createDefaultQuery(refs, name, queryDef);
  return result;
}

// src/shared/open-service/service-sync.ts
function isNewer(incoming, local) {
  return incoming.version !== local.version ? incoming.version > local.version : incoming.clientId > local.clientId;
}
var FORBIDDEN_KEYS = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]);
function isPlainObject2(value) {
  return typeof value == "object" && value !== null && !Array.isArray(value);
}
function applyStatePatch(target, source, options) {
  if (!options.preserveMissingKeys)
    for (let key of Object.keys(target))
      FORBIDDEN_KEYS.has(key) || Object.prototype.hasOwnProperty.call(source, key) || delete target[key];
  for (let key of Object.keys(source)) {
    if (FORBIDDEN_KEYS.has(key))
      continue;
    let sourceValue = source[key], tarvalue = target[key];
    isPlainObject2(sourceValue) && isPlainObject2(tarvalue) ? applyStatePatch(tarvalue, sourceValue, options) : tarvalue !== sourceValue && (target[key] = sourceValue);
  }
}
function createSnapshotReconciler(options) {
  let { setState, initialStamp } = options, localStamp = initialStamp;
  return {
    get stamp() {
      return localStamp;
    },
    advanceLocal(clientId) {
      return localStamp = { version: localStamp.version + 1, clientId }, localStamp;
    },
    tryAdopt(incoming, state) {
      return isNewer(incoming, localStamp) ? (localStamp = { version: incoming.version, clientId: incoming.clientId }, setState((current) => applyStatePatch(current, state, { preserveMissingKeys: !1 })), !0) : !1;
    }
  };
}

// src/shared/open-service/service-runtime.ts
function normalizeStaticStoragePath(serviceId, name, rawPath) {
  let segments = rawPath.replaceAll("\\", "/").split("/").filter((segment) => segment.length > 0 && segment !== ".");
  if (segments.length === 0 || segments.some((segment) => segment === ".."))
    throw new OpenServiceInvalidStaticPathError({ serviceId, name, path: rawPath });
  return segments.join("/");
}
function resolveStaticPath(serviceId, name, queryDef, input) {
  let rawPath = queryDef.staticPath(input), relativePath = normalizeStaticStoragePath(serviceId, name, rawPath);
  return `${serviceId}/${relativePath}`;
}
function createCommandSelf(state) {
  return {
    get state() {
      return state;
    },
    setState(mutate) {
      n(() => {
        mutate(state);
      });
    },
    queries: {},
    commands: {}
  };
}
function buildCommands(serviceId, commands, createCommandCtx) {
  return Object.fromEntries(
    Object.entries(commands).map(([name, def]) => [
      name,
      async (input) => {
        if (!def.handler)
          throw new OpenServiceUnimplementedOperationError({
            kind: "command",
            serviceId,
            name
          });
        let validatedInput = await validateSchema(def.input, input, {
          kind: "command",
          serviceId,
          name,
          phase: "input"
        }), output = await def.handler(validatedInput, createCommandCtx());
        return validateSchema(def.output, output, {
          kind: "command",
          serviceId,
          name,
          phase: "output"
        });
      }
    ])
  );
}
function buildQueryDefinitionsWithStaticLoader(serviceId, queries, staticLoader, setState) {
  return new Map(
    Object.entries(queries).map(([name, queryDef]) => {
      if (!queryDef.staticPath)
        return [name, queryDef];
      let { staticPath } = queryDef;
      return [
        name,
        {
          ...queryDef,
          load: async (input) => {
            let logicalPath = resolveStaticPath(serviceId, name, { staticPath }, input), snapshot = await staticLoader(logicalPath, {
              serviceId,
              queryName: name,
              input
            });
            setState((state) => {
              applyStatePatch(state, snapshot, {
                preserveMissingKeys: !0
              });
            });
          }
        }
      ];
    })
  );
}
function createServiceRuntime(def, runtimeOptions, initialState = def.initialState) {
  let rawState = initialState, state = u2(rawState), getStateSnapshot = () => structuredClone(rawState), commandSelf = createCommandSelf(state), { registryApi, staticLoader } = runtimeOptions, createCommandCtx = () => ({
    self: commandSelf,
    getService: registryApi.getService
  }), commands = buildCommands(def.id, def.commands, createCommandCtx);
  commandSelf.commands = commands;
  let loadCommands = commands, remoteCommandNames = /* @__PURE__ */ new Set(), queryDefinitions = staticLoader ? buildQueryDefinitionsWithStaticLoader(
    def.id,
    def.queries,
    staticLoader,
    commandSelf.setState
  ) : new Map(
    Object.entries(def.queries)
  ), defaultQueries = {}, reactiveLoadQueries = {}, buildGatedCommands = (isCurrent) => {
    let gatedSelf = {
      get state() {
        return state;
      },
      setState(mutate) {
        isCurrent() && n(() => {
          mutate(state);
        });
      },
      queries: defaultQueries,
      commands: {}
    }, gated = buildCommands(def.id, def.commands, () => ({
      self: gatedSelf,
      getService: registryApi.getService
    }));
    return gatedSelf.commands = gated, remoteCommandNames.size === 0 ? gated : Object.fromEntries(
      Object.keys(def.commands).map((name) => [
        name,
        remoteCommandNames.has(name) ? loadCommands[name] : gated[name]
      ])
    );
  }, refs = {
    serviceId: def.id,
    commandSelf,
    state,
    registryApi,
    queryDefinitions,
    defaultQueries,
    reactiveLoadQueries,
    getLoadCommands: () => loadCommands,
    buildGatedCommands
  }, builtQueries = buildQueries(refs);
  for (let [name, query] of Object.entries(builtQueries))
    defaultQueries[name] = query;
  for (let [name, query] of Object.entries(buildReactiveLoadQueries(refs)))
    reactiveLoadQueries[name] = query;
  commandSelf.queries = defaultQueries;
  let queries = defaultQueries, queryCtx = { self: {
    get state() {
      return state;
    },
    queries: defaultQueries
  }, getService: registryApi.getService }, loadCtxForStatic = {
    self: {
      get state() {
        return state;
      },
      queries: defaultQueries,
      commands
    },
    getService: registryApi.getService
  };
  return {
    getStateSnapshot,
    commandSelf,
    queryCtx,
    loadCtxForStatic,
    commands,
    queries,
    runLoadOnce: async (queryName, validatedInput) => {
      let queryDef = queryDefinitions.get(queryName);
      if (!queryDef || !queryDef.load)
        return;
      let loadKey = makeLoadKey(def.id, queryName, validatedInput), ancestorChain = /* @__PURE__ */ new Set([loadKey]), previous = inFlightLoads.get(loadKey), promise2 = Promise.resolve().then(() => runLoadBody(refs, queryName, queryDef, validatedInput, ancestorChain)).finally(() => {
        inFlightLoads.get(loadKey) === promise2 && (previous ? inFlightLoads.set(loadKey, previous) : inFlightLoads.delete(loadKey));
      });
      inFlightLoads.set(loadKey, promise2), await promise2;
    },
    attachChannelCommands: (channelCommands, implementedCommandNames) => {
      loadCommands = channelCommands, remoteCommandNames.clear();
      for (let name of Object.keys(def.commands))
        implementedCommandNames.has(name) || remoteCommandNames.add(name);
    }
  };
}

// src/shared/open-service/service-error-serialization.ts
var ERROR_MARKER = "__openServiceError__", RESERVED_KEYS = /* @__PURE__ */ new Set([ERROR_MARKER, "name", "message", "stack", "cause"]);
function isPlainObject3(value) {
  return typeof value == "object" && value !== null && !Array.isArray(value);
}
function isSerializedError(value) {
  return isPlainObject3(value) && value[ERROR_MARKER] === !0;
}
function toTransportSafe(value) {
  if (value instanceof Error)
    return serializeError(value);
  if (Array.isArray(value))
    return value.map((entry) => toTransportSafe(entry));
  if (isPlainObject3(value)) {
    let result = {};
    for (let [key, entry] of Object.entries(value))
      result[key] = toTransportSafe(entry);
    return result;
  }
  if (value === null)
    return null;
  let kind = typeof value;
  if (kind === "string" || kind === "number" || kind === "boolean")
    return value;
  if (kind === "bigint")
    return value.toString();
}
function serializeError(value) {
  if (!(value instanceof Error))
    return { [ERROR_MARKER]: !0, name: "Error", message: String(value) };
  let properties = {};
  for (let key of Object.keys(value))
    RESERVED_KEYS.has(key) || (properties[key] = toTransportSafe(value[key]));
  return {
    [ERROR_MARKER]: !0,
    name: value.name,
    message: value.message,
    ...value.stack !== void 0 ? { stack: value.stack } : {},
    ...value.cause !== void 0 ? { cause: toTransportSafe(value.cause) } : {},
    ...Object.keys(properties).length > 0 ? { properties } : {}
  };
}
function fromTransportSafe(value) {
  if (isSerializedError(value))
    return deserializeError(value);
  if (Array.isArray(value))
    return value.map((entry) => fromTransportSafe(entry));
  if (isPlainObject3(value)) {
    let result = {};
    for (let [key, entry] of Object.entries(value))
      result[key] = fromTransportSafe(entry);
    return result;
  }
  return value;
}
function deserializeError(serialized) {
  let error = new Error(serialized.message);
  if (error.name = serialized.name, serialized.stack !== void 0 && (error.stack = serialized.stack), "cause" in serialized && (error.cause = fromTransportSafe(serialized.cause)), serialized.properties)
    for (let [key, value] of Object.entries(serialized.properties))
      error[key] = fromTransportSafe(value);
  return error;
}

// src/shared/open-service/service-transport.ts
var REMOTE_COMMAND_ACK_TIMEOUT_MS = 300;
function wrapCommandsForBroadcast(commands, context) {
  let { serviceId, ownClientId, reconciler, getSnapshot, channel: channel2 } = context;
  return Object.fromEntries(
    Object.entries(commands).map(([name, cmd]) => [
      name,
      async (input) => {
        let result = await cmd(input), stamp = reconciler.advanceLocal(ownClientId);
        return channel2.emit(SERVICE_PATCHES, {
          serviceId,
          state: getSnapshot(),
          version: stamp.version,
          clientId: stamp.clientId
        }), result;
      }
    ])
  );
}
function connectRuntimeToChannel(context) {
  let { serviceId, ownClientId, reconciler, getSnapshot, channel: channel2, relay } = context, emitSyncStart = () => {
    channel2.emit(SERVICE_SYNC_START, {
      serviceId,
      clientId: ownClientId
    });
  }, relayAdopted = () => {
    channel2.emit(SERVICE_PATCHES, {
      serviceId,
      state: getSnapshot(),
      version: reconciler.stamp.version,
      clientId: reconciler.stamp.clientId
    });
  }, adoptPeerSnapshot = (snapshot) => {
    let adopted = reconciler.tryAdopt(
      { version: snapshot.version, clientId: snapshot.clientId },
      snapshot.state
    );
    return adopted && relay && relayAdopted(), adopted;
  }, onSyncStart = (payload) => {
    let request = safeParse(syncStartSchema, payload);
    !request.success || request.output.serviceId !== serviceId || request.output.clientId === ownClientId || channel2.emit(SERVICE_SYNC_START_REPLY, {
      serviceId,
      state: getSnapshot(),
      version: reconciler.stamp.version,
      clientId: reconciler.stamp.clientId
    });
  }, onSyncStartReply = (payload) => {
    let snapshot = safeParse(stampedSnapshotSchema, payload);
    !snapshot.success || snapshot.output.serviceId !== serviceId || adoptPeerSnapshot(snapshot.output);
  }, onPatches = (payload) => {
    let snapshot = safeParse(stampedSnapshotSchema, payload);
    !snapshot.success || snapshot.output.serviceId !== serviceId || adoptPeerSnapshot(snapshot.output);
  };
  return channel2.on(SERVICE_SYNC_START, onSyncStart), channel2.on(SERVICE_SYNC_START_REPLY, onSyncStartReply), channel2.on(SERVICE_PATCHES, onPatches), emitSyncStart(), relay && reconciler.stamp.version > 0 && relayAdopted(), () => {
    channel2.off(SERVICE_SYNC_START, onSyncStart), channel2.off(SERVICE_SYNC_START_REPLY, onSyncStartReply), channel2.off(SERVICE_PATCHES, onPatches);
  };
}
function connectCommandTransport(context) {
  let { serviceId, ownClientId, channel: channel2, localCommands, implementedCommandNames, commandNames } = context, pending = /* @__PURE__ */ new Map(), settle = (callId, apply) => {
    let entry = pending.get(callId);
    entry && (pending.delete(callId), clearTimeout(entry.noAckTimer), apply(entry));
  }, onInvoke = (payload) => {
    let parsed = safeParse(commandInvokeSchema, payload);
    if (!parsed.success || parsed.output.serviceId !== serviceId || !implementedCommandNames.has(parsed.output.commandName))
      return;
    let invoke = parsed.output;
    channel2.emit(SERVICE_COMMAND_ACK, {
      serviceId,
      callId: invoke.callId,
      clientId: ownClientId
    }), Promise.resolve().then(() => localCommands[invoke.commandName](invoke.input)).then(
      (result) => {
        channel2.emit(SERVICE_COMMAND_RESULT, {
          serviceId,
          callId: invoke.callId,
          result,
          clientId: ownClientId
        });
      },
      (error) => {
        channel2.emit(SERVICE_COMMAND_ERROR, {
          serviceId,
          callId: invoke.callId,
          error: serializeError(error),
          clientId: ownClientId
        });
      }
    );
  }, onResult = (payload) => {
    let result = safeParse(commandResultSchema, payload);
    !result.success || result.output.serviceId !== serviceId || settle(result.output.callId, (entry) => entry.resolve(result.output.result));
  }, onError = (payload) => {
    let failure = safeParse(commandErrorSchema, payload);
    !failure.success || failure.output.serviceId !== serviceId || settle(failure.output.callId, (entry) => entry.reject(deserializeError(failure.output.error)));
  }, onAck = (payload) => {
    let ack = safeParse(commandAckSchema, payload);
    if (!ack.success || ack.output.serviceId !== serviceId)
      return;
    let entry = pending.get(ack.output.callId);
    entry && clearTimeout(entry.noAckTimer);
  };
  channel2.on(SERVICE_COMMAND_INVOKE, onInvoke), channel2.on(SERVICE_COMMAND_RESULT, onResult), channel2.on(SERVICE_COMMAND_ERROR, onError), channel2.on(SERVICE_COMMAND_ACK, onAck);
  let requestRemote = (commandName, input) => {
    let callId = generateClientId();
    return new Promise((resolve4, reject) => {
      let noAckTimer = setTimeout(() => {
        settle(
          callId,
          (entry) => entry.reject(
            new OpenServiceRemoteCommandUnhandledError({
              serviceId,
              commandName: entry.commandName
            })
          )
        );
      }, REMOTE_COMMAND_ACK_TIMEOUT_MS);
      pending.set(callId, { commandName, resolve: resolve4, reject, noAckTimer }), channel2.emit(SERVICE_COMMAND_INVOKE, {
        serviceId,
        commandName,
        input,
        callId,
        clientId: ownClientId
      });
    });
  }, commands = {};
  for (let name of commandNames)
    commands[name] = implementedCommandNames.has(name) ? localCommands[name] : (input) => requestRemote(name, input);
  return {
    commands,
    disconnect: () => {
      channel2.off(SERVICE_COMMAND_INVOKE, onInvoke), channel2.off(SERVICE_COMMAND_RESULT, onResult), channel2.off(SERVICE_COMMAND_ERROR, onError), channel2.off(SERVICE_COMMAND_ACK, onAck);
      for (let [, entry] of pending)
        clearTimeout(entry.noAckTimer), entry.reject(new OpenServiceRemoteCommandDisconnectedError({ serviceId }));
      pending.clear();
    }
  };
}
function connectServiceToChannel(context) {
  let {
    serviceId,
    ownClientId,
    reconciler,
    getSnapshot,
    channel: channel2,
    relay,
    commands,
    implementedCommandNames,
    commandNames,
    runtime
  } = context, broadcastCommands = wrapCommandsForBroadcast(commands, {
    serviceId,
    ownClientId,
    reconciler,
    getSnapshot,
    channel: channel2
  }), commandTransport = connectCommandTransport({
    serviceId,
    ownClientId,
    channel: channel2,
    localCommands: broadcastCommands,
    implementedCommandNames,
    commandNames
  }), disconnectSync = connectRuntimeToChannel({
    serviceId,
    ownClientId,
    reconciler,
    getSnapshot,
    channel: channel2,
    relay
  });
  return runtime.attachChannelCommands(commandTransport.commands, implementedCommandNames), {
    commands: commandTransport.commands,
    disconnect: () => {
      disconnectSync(), commandTransport.disconnect();
    }
  };
}

// src/shared/open-service/service-registry.ts
var REGISTRY_SYMBOL = /* @__PURE__ */ Symbol.for("storybook.open-service.registry");
function getRegistry() {
  let registryGlobal = globalThis;
  return registryGlobal[REGISTRY_SYMBOL] ??= /* @__PURE__ */ new Map(), registryGlobal[REGISTRY_SYMBOL];
}
function describeDefinition(definition) {
  return {
    id: definition.id,
    description: definition.description,
    queries: Object.fromEntries(
      Object.entries(definition.queries).filter(([, query]) => !query.internal).map(([name, query]) => [
        name,
        {
          name,
          description: query.description,
          input: query.input,
          output: query.output,
          ...query.staticPath ? { staticPath: !0 } : {}
        }
      ])
    ),
    commands: Object.fromEntries(
      Object.entries(definition.commands).filter(([, command]) => !command.internal).map(([name, command]) => [
        name,
        {
          name,
          description: command.description,
          input: command.input,
          output: command.output
        }
      ])
    )
  };
}
function summarizeDescriptor(descriptor) {
  return {
    id: descriptor.id,
    description: descriptor.description,
    queryNames: Object.keys(descriptor.queries),
    commandNames: Object.keys(descriptor.commands)
  };
}
function applyRegistration(definition, registration) {
  return registration ? {
    ...definition,
    queries: Object.fromEntries(
      Object.entries(definition.queries).map(([name, query]) => {
        let override = registration.queries?.[name];
        return [
          name,
          override && "staticInputs" in override ? { ...query, staticInputs: override.staticInputs } : query
        ];
      })
    ),
    commands: Object.fromEntries(
      Object.entries(definition.commands).map(([name, command]) => {
        let override = registration.commands?.[name];
        return [
          name,
          override && "handler" in override ? { ...command, handler: override.handler } : command
        ];
      })
    )
  } : definition;
}
var serviceRegistryApi = {
  listServices,
  describeService,
  getService
};
function registerService(definition, registration, { relay = !1, staticLoader } = {}) {
  let registry = getRegistry(), existingEntry = registry.get(definition.id);
  if (existingEntry)
    return existingEntry.instance;
  let ownClientId = generateClientId(), resolvedDefinition = applyRegistration(definition, registration), runtime = createServiceRuntime(
    resolvedDefinition,
    { registryApi: serviceRegistryApi, staticLoader },
    structuredClone(resolvedDefinition.initialState)
  ), reconciler = createSnapshotReconciler({
    setState: (mutate) => runtime.commandSelf.setState((state) => mutate(state)),
    initialStamp: { version: 0, clientId: ownClientId }
  }), getSnapshot = () => runtime.getStateSnapshot(), descriptor = describeDefinition(resolvedDefinition), channel2 = getChannel();
  if (!channel2)
    throw new OpenServiceMissingChannelError({ serviceId: definition.id });
  let implementedCommandNames = new Set(
    Object.entries(resolvedDefinition.commands).filter(([, command]) => typeof command.handler == "function").map(([name]) => name)
  ), { commands, disconnect } = connectServiceToChannel({
    serviceId: definition.id,
    ownClientId,
    reconciler,
    getSnapshot,
    channel: channel2,
    relay,
    commands: runtime.commands,
    implementedCommandNames,
    commandNames: Object.keys(resolvedDefinition.commands),
    runtime
  }), instance = {
    queries: runtime.queries,
    commands,
    ...serviceRegistryApi
  };
  return registry.set(definition.id, {
    definition: resolvedDefinition,
    instance,
    descriptor,
    summary: summarizeDescriptor(descriptor),
    disconnect
  }), instance;
}
function getRegisteredServices() {
  return Array.from(getRegistry().values(), ({ definition }) => definition);
}
async function listServices() {
  return Array.from(getRegistry().values()).filter(({ definition }) => !definition.internal).map(({ summary }) => summary);
}
async function describeService(serviceId) {
  let entry = getRegistry().get(serviceId);
  if (!entry)
    throw new OpenServiceMissingServiceError({ serviceId });
  return entry.descriptor;
}
function getService(serviceId) {
  let entry = getRegistry().get(serviceId);
  if (!entry)
    throw new OpenServiceMissingServiceError({ serviceId });
  return entry.instance;
}

// src/shared/open-service/server.ts
import { mkdir, writeFile } from "node:fs/promises";

// ../../node_modules/es-toolkit/dist/object/clone.mjs
function clone(obj) {
  if (isPrimitive(obj))
    return obj;
  if (Array.isArray(obj) || isTypedArray(obj) || obj instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && obj instanceof SharedArrayBuffer)
    return obj.slice(0);
  let prototype = Object.getPrototypeOf(obj), Constructor = prototype.constructor;
  if (obj instanceof Date || obj instanceof Map || obj instanceof Set)
    return new Constructor(obj);
  if (obj instanceof RegExp) {
    let newRegExp = new Constructor(obj);
    return newRegExp.lastIndex = obj.lastIndex, newRegExp;
  }
  if (obj instanceof DataView)
    return new Constructor(obj.buffer.slice(0));
  if (obj instanceof Error) {
    let newError = new Constructor(obj.message);
    return newError.stack = obj.stack, newError.name = obj.name, newError.cause = obj.cause, newError;
  }
  if (typeof File < "u" && obj instanceof File)
    return new Constructor([obj], obj.name, { type: obj.type, lastModified: obj.lastModified });
  if (typeof obj == "object") {
    let newObject = Object.create(prototype);
    return Object.assign(newObject, obj);
  }
  return obj;
}

// ../../node_modules/es-toolkit/dist/_internal/isUnsafeProperty.mjs
function isUnsafeProperty(key) {
  return key === "__proto__";
}

// ../../node_modules/es-toolkit/dist/object/mergeWith.mjs
function mergeWith(target, source, merge2) {
  let sourceKeys = Object.keys(source);
  for (let i2 = 0; i2 < sourceKeys.length; i2++) {
    let key = sourceKeys[i2];
    if (isUnsafeProperty(key))
      continue;
    let sourceValue = source[key], targetValue = target[key], merged = merge2(targetValue, sourceValue, key, target, source);
    merged !== void 0 ? target[key] = merged : Array.isArray(sourceValue) ? Array.isArray(targetValue) ? target[key] = mergeWith(targetValue, sourceValue, merge2) : target[key] = mergeWith([], sourceValue, merge2) : isPlainObject(sourceValue) ? isPlainObject(targetValue) ? target[key] = mergeWith(targetValue, sourceValue, merge2) : target[key] = mergeWith({}, sourceValue, merge2) : (targetValue === void 0 || sourceValue !== void 0) && (target[key] = sourceValue);
  }
  return target;
}

// ../../node_modules/es-toolkit/dist/string/words.mjs
var CASE_SPLIT_PATTERN = new RegExp("\\p{Lu}?\\p{Ll}+|[0-9]+|\\p{Lu}+(?!\\p{Ll})|\\p{Emoji_Presentation}|\\p{Extended_Pictographic}|\\p{L}+", "gu");

// ../../node_modules/es-toolkit/dist/object/toMerged.mjs
function toMerged(target, source) {
  return mergeWith(clone(target), source, function mergeRecursively(targetValue, sourceValue) {
    if (Array.isArray(sourceValue))
      return Array.isArray(targetValue) ? mergeWith(clone(targetValue), sourceValue, mergeRecursively) : mergeWith([], sourceValue, mergeRecursively);
    if (isPlainObject(sourceValue))
      return isPlainObject(targetValue) ? mergeWith(clone(targetValue), sourceValue, mergeRecursively) : mergeWith({}, sourceValue, mergeRecursively);
  });
}

// src/shared/open-service/server.ts
var getService2 = getService;
function registerService2(definition, registration) {
  return registerService(definition, registration, { relay: !0 });
}
async function buildStaticFiles() {
  let store = {}, buildTasks = [];
  for (let service of getRegisteredServices())
    for (let [queryName, query] of Object.entries(service.queries)) {
      let { load, staticPath, staticInputs } = query;
      !staticPath || !load || !staticInputs || buildTasks.push(
        (async () => {
          let inputsRuntime = createServiceRuntime(
            service,
            { registryApi: serviceRegistryApi },
            structuredClone(service.initialState)
          ), inputs = await staticInputs(inputsRuntime.loadCtxForStatic);
          return Promise.all(
            inputs.map(async (input) => {
              let buildRuntime = createServiceRuntime(
                service,
                { registryApi: serviceRegistryApi },
                structuredClone(service.initialState)
              ), validatedInput = await validateSchema(query.input, input, {
                kind: "query",
                serviceId: service.id,
                name: queryName,
                phase: "input"
              }), path = resolveStaticPath(service.id, queryName, { staticPath }, validatedInput);
              return await buildRuntime.runLoadOnce(queryName, validatedInput), { path, state: buildRuntime.getStateSnapshot() };
            })
          );
        })()
      );
    }
  let builtStates = (await Promise.all(buildTasks)).flat();
  for (let { path, state } of builtStates)
    store[path] = path in store ? toMerged(store[path], state) : state;
  return store;
}
async function writeOpenServiceStaticFiles(outputDir) {
  let staticStore = await buildStaticFiles();
  await Promise.all(
    Object.entries(staticStore).map(async ([relativePath, state]) => {
      let outputPath = join(outputDir, "services", ...relativePath.split("/"));
      await mkdir(dirname(outputPath), { recursive: !0 }), await writeFile(outputPath, JSON.stringify(state, null, 2));
    })
  );
}

// src/common/utils/paths.ts
import { join as join2, relative as relative2, resolve as resolve3, sep as sep2 } from "node:path";

// ../../node_modules/tinyglobby/dist/index.mjs
import { readdir, readdirSync, realpath, realpathSync, stat, statSync } from "fs";
import { isAbsolute, posix, resolve as resolve2 } from "path";
import { fileURLToPath } from "url";

// ../../node_modules/tinyglobby/node_modules/fdir/dist/index.mjs
import { createRequire } from "module";
import { basename, dirname as dirname2, normalize, relative, resolve, sep } from "path";
import * as nativeFs from "fs";
var __require = createRequire(import.meta.url);
function cleanPath(path) {
  let normalized = normalize(path);
  return normalized.length > 1 && normalized[normalized.length - 1] === sep && (normalized = normalized.substring(0, normalized.length - 1)), normalized;
}
var SLASHES_REGEX = /[\\/]/g;
function convertSlashes(path, separator) {
  return path.replace(SLASHES_REGEX, separator);
}
var WINDOWS_ROOT_DIR_REGEX = /^[a-z]:[\\/]$/i;
function isRootDirectory(path) {
  return path === "/" || WINDOWS_ROOT_DIR_REGEX.test(path);
}
function normalizePath(path, options) {
  let { resolvePaths, normalizePath: normalizePath$1, pathSeparator } = options, pathNeedsCleaning = process.platform === "win32" && path.includes("/") || path.startsWith(".");
  if (resolvePaths && (path = resolve(path)), (normalizePath$1 || pathNeedsCleaning) && (path = cleanPath(path)), path === ".") return "";
  let needsSeperator = path[path.length - 1] !== pathSeparator;
  return convertSlashes(needsSeperator ? path + pathSeparator : path, pathSeparator);
}
function joinPathWithBasePath(filename, directoryPath) {
  return directoryPath + filename;
}
function joinPathWithRelativePath(root, options) {
  return function(filename, directoryPath) {
    return directoryPath.startsWith(root) ? directoryPath.slice(root.length) + filename : convertSlashes(relative(root, directoryPath), options.pathSeparator) + options.pathSeparator + filename;
  };
}
function joinPath(filename) {
  return filename;
}
function joinDirectoryPath(filename, directoryPath, separator) {
  return directoryPath + filename + separator;
}
function build$7(root, options) {
  let { relativePaths, includeBasePath } = options;
  return relativePaths && root ? joinPathWithRelativePath(root, options) : includeBasePath ? joinPathWithBasePath : joinPath;
}
function pushDirectoryWithRelativePath(root) {
  return function(directoryPath, paths) {
    paths.push(directoryPath.substring(root.length) || ".");
  };
}
function pushDirectoryFilterWithRelativePath(root) {
  return function(directoryPath, paths, filters) {
    let relativePath = directoryPath.substring(root.length) || ".";
    filters.every((filter) => filter(relativePath, !0)) && paths.push(relativePath);
  };
}
var pushDirectory = (directoryPath, paths) => {
  paths.push(directoryPath || ".");
}, pushDirectoryFilter = (directoryPath, paths, filters) => {
  let path = directoryPath || ".";
  filters.every((filter) => filter(path, !0)) && paths.push(path);
}, empty$2 = () => {
};
function build$6(root, options) {
  let { includeDirs, filters, relativePaths } = options;
  return includeDirs ? relativePaths ? filters && filters.length ? pushDirectoryFilterWithRelativePath(root) : pushDirectoryWithRelativePath(root) : filters && filters.length ? pushDirectoryFilter : pushDirectory : empty$2;
}
var pushFileFilterAndCount = (filename, _paths, counts, filters) => {
  filters.every((filter) => filter(filename, !1)) && counts.files++;
}, pushFileFilter = (filename, paths, _counts, filters) => {
  filters.every((filter) => filter(filename, !1)) && paths.push(filename);
}, pushFileCount = (_filename, _paths, counts, _filters) => {
  counts.files++;
}, pushFile = (filename, paths) => {
  paths.push(filename);
}, empty$1 = () => {
};
function build$5(options) {
  let { excludeFiles, filters, onlyCounts } = options;
  return excludeFiles ? empty$1 : filters && filters.length ? onlyCounts ? pushFileFilterAndCount : pushFileFilter : onlyCounts ? pushFileCount : pushFile;
}
var getArray = (paths) => paths, getArrayGroup = () => [""].slice(0, 0);
function build$4(options) {
  return options.group ? getArrayGroup : getArray;
}
var groupFiles = (groups, directory, files) => {
  groups.push({
    directory,
    files,
    dir: directory
  });
}, empty = () => {
};
function build$3(options) {
  return options.group ? groupFiles : empty;
}
var resolveSymlinksAsync = function(path, state, callback$1) {
  let { queue, fs, options: { suppressErrors } } = state;
  queue.enqueue(), fs.realpath(path, (error, resolvedPath) => {
    if (error) return queue.dequeue(suppressErrors ? null : error, state);
    fs.stat(resolvedPath, (error$1, stat2) => {
      if (error$1) return queue.dequeue(suppressErrors ? null : error$1, state);
      if (stat2.isDirectory() && isRecursive(path, resolvedPath, state)) return queue.dequeue(null, state);
      callback$1(stat2, resolvedPath), queue.dequeue(null, state);
    });
  });
}, resolveSymlinks = function(path, state, callback$1) {
  let { queue, fs, options: { suppressErrors } } = state;
  queue.enqueue();
  try {
    let resolvedPath = fs.realpathSync(path), stat2 = fs.statSync(resolvedPath);
    if (stat2.isDirectory() && isRecursive(path, resolvedPath, state)) return;
    callback$1(stat2, resolvedPath);
  } catch (e2) {
    if (!suppressErrors) throw e2;
  }
};
function build$2(options, isSynchronous) {
  return !options.resolveSymlinks || options.excludeSymlinks ? null : isSynchronous ? resolveSymlinks : resolveSymlinksAsync;
}
function isRecursive(path, resolved, state) {
  if (state.options.useRealPaths) return isRecursiveUsingRealPaths(resolved, state);
  let parent = dirname2(path), depth = 1;
  for (; parent !== state.root && depth < 2; ) {
    let resolvedPath = state.symlinks.get(parent);
    !!resolvedPath && (resolvedPath === resolved || resolvedPath.startsWith(resolved) || resolved.startsWith(resolvedPath)) ? depth++ : parent = dirname2(parent);
  }
  return state.symlinks.set(path, resolved), depth > 1;
}
function isRecursiveUsingRealPaths(resolved, state) {
  return state.visited.includes(resolved + state.options.pathSeparator);
}
var onlyCountsSync = (state) => state.counts, groupsSync = (state) => state.groups, defaultSync = (state) => state.paths, limitFilesSync = (state) => state.paths.slice(0, state.options.maxFiles), onlyCountsAsync = (state, error, callback$1) => (report(error, callback$1, state.counts, state.options.suppressErrors), null), defaultAsync = (state, error, callback$1) => (report(error, callback$1, state.paths, state.options.suppressErrors), null), limitFilesAsync = (state, error, callback$1) => (report(error, callback$1, state.paths.slice(0, state.options.maxFiles), state.options.suppressErrors), null), groupsAsync = (state, error, callback$1) => (report(error, callback$1, state.groups, state.options.suppressErrors), null);
function report(error, callback$1, output, suppressErrors) {
  callback$1(error && !suppressErrors ? error : null, output);
}
function build$1(options, isSynchronous) {
  let { onlyCounts, group, maxFiles } = options;
  return onlyCounts ? isSynchronous ? onlyCountsSync : onlyCountsAsync : group ? isSynchronous ? groupsSync : groupsAsync : maxFiles ? isSynchronous ? limitFilesSync : limitFilesAsync : isSynchronous ? defaultSync : defaultAsync;
}
var readdirOpts = { withFileTypes: !0 }, walkAsync = (state, crawlPath, directoryPath, currentDepth, callback$1) => {
  if (state.queue.enqueue(), currentDepth < 0) return state.queue.dequeue(null, state);
  let { fs } = state;
  state.visited.push(crawlPath), state.counts.directories++, fs.readdir(crawlPath || ".", readdirOpts, (error, entries = []) => {
    callback$1(entries, directoryPath, currentDepth), state.queue.dequeue(state.options.suppressErrors ? null : error, state);
  });
}, walkSync = (state, crawlPath, directoryPath, currentDepth, callback$1) => {
  let { fs } = state;
  if (currentDepth < 0) return;
  state.visited.push(crawlPath), state.counts.directories++;
  let entries = [];
  try {
    entries = fs.readdirSync(crawlPath || ".", readdirOpts);
  } catch (e2) {
    if (!state.options.suppressErrors) throw e2;
  }
  callback$1(entries, directoryPath, currentDepth);
};
function build(isSynchronous) {
  return isSynchronous ? walkSync : walkAsync;
}
var Queue = class {
  count = 0;
  constructor(onQueueEmpty) {
    this.onQueueEmpty = onQueueEmpty;
  }
  enqueue() {
    return this.count++, this.count;
  }
  dequeue(error, output) {
    this.onQueueEmpty && (--this.count <= 0 || error) && (this.onQueueEmpty(error, output), error && (output.controller.abort(), this.onQueueEmpty = void 0));
  }
}, Counter = class {
  _files = 0;
  _directories = 0;
  set files(num) {
    this._files = num;
  }
  get files() {
    return this._files;
  }
  set directories(num) {
    this._directories = num;
  }
  get directories() {
    return this._directories;
  }
  /**
  * @deprecated use `directories` instead
  */
  /* c8 ignore next 3 */
  get dirs() {
    return this._directories;
  }
}, Aborter = class {
  aborted = !1;
  abort() {
    this.aborted = !0;
  }
}, Walker = class {
  root;
  isSynchronous;
  state;
  joinPath;
  pushDirectory;
  pushFile;
  getArray;
  groupFiles;
  resolveSymlink;
  walkDirectory;
  callbackInvoker;
  constructor(root, options, callback$1) {
    this.isSynchronous = !callback$1, this.callbackInvoker = build$1(options, this.isSynchronous), this.root = normalizePath(root, options), this.state = {
      root: isRootDirectory(this.root) ? this.root : this.root.slice(0, -1),
      paths: [""].slice(0, 0),
      groups: [],
      counts: new Counter(),
      options,
      queue: new Queue((error, state) => this.callbackInvoker(state, error, callback$1)),
      symlinks: /* @__PURE__ */ new Map(),
      visited: [""].slice(0, 0),
      controller: new Aborter(),
      fs: options.fs || nativeFs
    }, this.joinPath = build$7(this.root, options), this.pushDirectory = build$6(this.root, options), this.pushFile = build$5(options), this.getArray = build$4(options), this.groupFiles = build$3(options), this.resolveSymlink = build$2(options, this.isSynchronous), this.walkDirectory = build(this.isSynchronous);
  }
  start() {
    return this.pushDirectory(this.root, this.state.paths, this.state.options.filters), this.walkDirectory(this.state, this.root, this.root, this.state.options.maxDepth, this.walk), this.isSynchronous ? this.callbackInvoker(this.state, null) : null;
  }
  walk = (entries, directoryPath, depth) => {
    let { paths, options: { filters, resolveSymlinks: resolveSymlinks$1, excludeSymlinks, exclude, maxFiles, signal, useRealPaths, pathSeparator }, controller } = this.state;
    if (controller.aborted || signal && signal.aborted || maxFiles && paths.length > maxFiles) return;
    let files = this.getArray(this.state.paths);
    for (let i2 = 0; i2 < entries.length; ++i2) {
      let entry = entries[i2];
      if (entry.isFile() || entry.isSymbolicLink() && !resolveSymlinks$1 && !excludeSymlinks) {
        let filename = this.joinPath(entry.name, directoryPath);
        this.pushFile(filename, files, this.state.counts, filters);
      } else if (entry.isDirectory()) {
        let path = joinDirectoryPath(entry.name, directoryPath, this.state.options.pathSeparator);
        if (exclude && exclude(entry.name, path)) continue;
        this.pushDirectory(path, paths, filters), this.walkDirectory(this.state, path, path, depth - 1, this.walk);
      } else if (this.resolveSymlink && entry.isSymbolicLink()) {
        let path = joinPathWithBasePath(entry.name, directoryPath);
        this.resolveSymlink(path, this.state, (stat2, resolvedPath) => {
          if (stat2.isDirectory()) {
            if (resolvedPath = normalizePath(resolvedPath, this.state.options), exclude && exclude(entry.name, useRealPaths ? resolvedPath : path + pathSeparator)) return;
            this.walkDirectory(this.state, resolvedPath, useRealPaths ? resolvedPath : path + pathSeparator, depth - 1, this.walk);
          } else {
            resolvedPath = useRealPaths ? resolvedPath : path;
            let filename = basename(resolvedPath), directoryPath$1 = normalizePath(dirname2(resolvedPath), this.state.options);
            resolvedPath = this.joinPath(filename, directoryPath$1), this.pushFile(resolvedPath, files, this.state.counts, filters);
          }
        });
      }
    }
    this.groupFiles(this.state.groups, directoryPath, files);
  };
};
function promise(root, options) {
  return new Promise((resolve$1, reject) => {
    callback(root, options, (err, output) => {
      if (err) return reject(err);
      resolve$1(output);
    });
  });
}
function callback(root, options, callback$1) {
  new Walker(root, options, callback$1).start();
}
function sync(root, options) {
  return new Walker(root, options).start();
}
var APIBuilder = class {
  constructor(root, options) {
    this.root = root, this.options = options;
  }
  withPromise() {
    return promise(this.root, this.options);
  }
  withCallback(cb) {
    callback(this.root, this.options, cb);
  }
  sync() {
    return sync(this.root, this.options);
  }
}, pm = null;
try {
  __require.resolve("picomatch"), pm = __require("picomatch");
} catch {
}
var Builder = class {
  globCache = {};
  options = {
    maxDepth: 1 / 0,
    suppressErrors: !0,
    pathSeparator: sep,
    filters: []
  };
  globFunction;
  constructor(options) {
    this.options = {
      ...this.options,
      ...options
    }, this.globFunction = this.options.globFunction;
  }
  group() {
    return this.options.group = !0, this;
  }
  withPathSeparator(separator) {
    return this.options.pathSeparator = separator, this;
  }
  withBasePath() {
    return this.options.includeBasePath = !0, this;
  }
  withRelativePaths() {
    return this.options.relativePaths = !0, this;
  }
  withDirs() {
    return this.options.includeDirs = !0, this;
  }
  withMaxDepth(depth) {
    return this.options.maxDepth = depth, this;
  }
  withMaxFiles(limit) {
    return this.options.maxFiles = limit, this;
  }
  withFullPaths() {
    return this.options.resolvePaths = !0, this.options.includeBasePath = !0, this;
  }
  withErrors() {
    return this.options.suppressErrors = !1, this;
  }
  withSymlinks({ resolvePaths = !0 } = {}) {
    return this.options.resolveSymlinks = !0, this.options.useRealPaths = resolvePaths, this.withFullPaths();
  }
  withAbortSignal(signal) {
    return this.options.signal = signal, this;
  }
  normalize() {
    return this.options.normalizePath = !0, this;
  }
  filter(predicate) {
    return this.options.filters.push(predicate), this;
  }
  onlyDirs() {
    return this.options.excludeFiles = !0, this.options.includeDirs = !0, this;
  }
  exclude(predicate) {
    return this.options.exclude = predicate, this;
  }
  onlyCounts() {
    return this.options.onlyCounts = !0, this;
  }
  crawl(root) {
    return new APIBuilder(root || ".", this.options);
  }
  withGlobFunction(fn) {
    return this.globFunction = fn, this;
  }
  /**
  * @deprecated Pass options using the constructor instead:
  * ```ts
  * new fdir(options).crawl("/path/to/root");
  * ```
  * This method will be removed in v7.0
  */
  /* c8 ignore next 4 */
  crawlWithOptions(root, options) {
    return this.options = {
      ...this.options,
      ...options
    }, new APIBuilder(root || ".", this.options);
  }
  glob(...patterns) {
    return this.globFunction ? this.globWithOptions(patterns) : this.globWithOptions(patterns, { dot: !0 });
  }
  globWithOptions(patterns, ...options) {
    let globFn = this.globFunction || pm;
    if (!globFn) throw new Error("Please specify a glob function to use glob matching.");
    var isMatch = this.globCache[patterns.join("\0")];
    return isMatch || (isMatch = globFn(patterns, ...options), this.globCache[patterns.join("\0")] = isMatch), this.options.filters.push((path) => isMatch(path)), this;
  }
};

// ../../node_modules/tinyglobby/dist/index.mjs
var import_picomatch = __toESM(require_picomatch2(), 1), isReadonlyArray = Array.isArray, BACKSLASHES = /\\/g, DRIVE_RELATIVE_PATH = /^[A-Za-z]:$/, isWin = process.platform === "win32", ONLY_PARENT_DIRECTORIES = /^(\/?\.\.)+$/;
function getPartialMatcher(patterns, options = {}) {
  let patternsCount = patterns.length, patternsParts = Array(patternsCount), matchers = Array(patternsCount), i2, j2;
  for (i2 = 0; i2 < patternsCount; i2++) {
    let parts = splitPattern(patterns[i2]);
    patternsParts[i2] = parts;
    let partsCount = parts.length, partMatchers = Array(partsCount);
    for (j2 = 0; j2 < partsCount; j2++) partMatchers[j2] = (0, import_picomatch.default)(parts[j2], options);
    matchers[i2] = partMatchers;
  }
  return (input) => {
    let inputParts = input.split("/");
    if (inputParts[0] === ".." && ONLY_PARENT_DIRECTORIES.test(input)) return !0;
    for (i2 = 0; i2 < patternsCount; i2++) {
      let patternParts = patternsParts[i2], matcher = matchers[i2], inputPatternCount = inputParts.length, minParts = Math.min(inputPatternCount, patternParts.length);
      for (j2 = 0; j2 < minParts; ) {
        let part = patternParts[j2];
        if (part.includes("/")) return !0;
        if (!matcher[j2](inputParts[j2])) break;
        if (!options.noglobstar && part === "**") return !0;
        j2++;
      }
      if (j2 === inputPatternCount) return !0;
    }
    return !1;
  };
}
var WIN32_ROOT_DIR = /^[A-Z]:\/$/i, isRoot = isWin ? (p3) => WIN32_ROOT_DIR.test(p3) : (p3) => p3 === "/";
function buildFormat(cwd, root, absolute) {
  if (cwd === root || root.startsWith(`${cwd}/`)) {
    if (absolute) {
      let start = cwd.length + +!isRoot(cwd);
      return (p3, isDir) => p3.slice(start, isDir ? -1 : void 0) || ".";
    }
    let prefix = root.slice(cwd.length + 1);
    return prefix ? (p3, isDir) => {
      if (p3 === ".") return prefix;
      let result = `${prefix}/${p3}`;
      return isDir ? result.slice(0, -1) : result;
    } : (p3, isDir) => isDir && p3 !== "." ? p3.slice(0, -1) : p3;
  }
  return absolute ? (p3) => posix.relative(cwd, p3) || "." : (p3) => posix.relative(cwd, `${root}/${p3}`) || ".";
}
function buildRelative(cwd, root) {
  if (root.startsWith(`${cwd}/`)) {
    let prefix = root.slice(cwd.length + 1);
    return (p3) => `${prefix}/${p3}`;
  }
  return (p3) => {
    let result = posix.relative(cwd, `${root}/${p3}`);
    return p3[p3.length - 1] === "/" && result !== "" ? `${result}/` : result || ".";
  };
}
function ensureNonDriveRelativePath(path) {
  return path.replace(DRIVE_RELATIVE_PATH, (match) => `${match}/`);
}
var splitPatternOptions = { parts: !0 };
function splitPattern(path) {
  var _result$parts;
  let result = import_picomatch.default.scan(path, splitPatternOptions);
  return !((_result$parts = result.parts) === null || _result$parts === void 0) && _result$parts.length ? result.parts : [path];
}
var POSIX_UNESCAPED_GLOB_SYMBOLS = /(?<!\\)([()[\]{}*?|]|^!|[!+@](?=\()|\\(?![()[\]{}!*+?@|]))/g, WIN32_UNESCAPED_GLOB_SYMBOLS = /(?<!\\)([()[\]{}]|^!|[!+@](?=\())/g, escapePosixPath = (path) => path.replace(POSIX_UNESCAPED_GLOB_SYMBOLS, "\\$&"), escapeWin32Path = (path) => path.replace(WIN32_UNESCAPED_GLOB_SYMBOLS, "\\$&"), escapePath = isWin ? escapeWin32Path : escapePosixPath;
function isDynamicPattern(pattern, options) {
  if (options?.caseSensitiveMatch === !1) return !0;
  let scan = import_picomatch.default.scan(pattern);
  return scan.isGlob || scan.negated;
}
function log(...tasks) {
  console.log(`[tinyglobby ${(/* @__PURE__ */ new Date()).toLocaleTimeString("es")}]`, ...tasks);
}
function ensureStringArray(value) {
  return typeof value == "string" ? [value] : value ?? [];
}
var PARENT_DIRECTORY = /^(\/?\.\.)+/, ESCAPING_BACKSLASHES = /\\(?=[()[\]{}!*+?@|])/g;
function normalizePattern(pattern, opts, props, isIgnore) {
  var _PARENT_DIRECTORY$exe;
  let cwd = opts.cwd, result = pattern;
  pattern[pattern.length - 1] === "/" && (result = pattern.slice(0, -1)), result[result.length - 1] !== "*" && opts.expandDirectories && (result += "/**");
  let escapedCwd = escapePath(cwd);
  result = isAbsolute(result.replace(ESCAPING_BACKSLASHES, "")) ? posix.relative(escapedCwd, result) : posix.normalize(result);
  let parentDir = (_PARENT_DIRECTORY$exe = PARENT_DIRECTORY.exec(result)) === null || _PARENT_DIRECTORY$exe === void 0 ? void 0 : _PARENT_DIRECTORY$exe[0], parts = splitPattern(result);
  if (parentDir) {
    let n3 = (parentDir.length + 1) / 3, i2 = 0, cwdParts = escapedCwd.split("/");
    for (; i2 < n3 && parts[i2 + n3] === cwdParts[cwdParts.length + i2 - n3]; )
      result = result.slice(0, (n3 - i2 - 1) * 3) + result.slice((n3 - i2) * 3 + parts[i2 + n3].length + 1) || ".", i2++;
    let potentialRoot = posix.join(cwd, parentDir.slice(i2 * 3));
    potentialRoot[0] !== "." && props.root.length > potentialRoot.length && (props.root = ensureNonDriveRelativePath(potentialRoot), props.depthOffset = -n3 + i2);
  }
  if (!isIgnore && props.depthOffset >= 0) {
    var _props$commonPath;
    (_props$commonPath = props.commonPath) !== null && _props$commonPath !== void 0 || (props.commonPath = parts);
    let newCommonPath = [], length = Math.min(props.commonPath.length, parts.length);
    for (let i2 = 0; i2 < length; i2++) {
      let part = parts[i2];
      if (part === "**" && !parts[i2 + 1]) {
        newCommonPath.pop();
        break;
      }
      if (i2 === parts.length - 1 || part !== props.commonPath[i2] || isDynamicPattern(part)) break;
      newCommonPath.push(part);
    }
    props.depthOffset = newCommonPath.length, props.commonPath = newCommonPath, props.root = ensureNonDriveRelativePath(newCommonPath.length > 0 ? posix.join(cwd, ...newCommonPath) : cwd);
  }
  return result;
}
function processPatterns(options, patterns, props) {
  let matchPatterns = [], ignorePatterns = [];
  for (let pattern of options.ignore)
    pattern && (pattern[0] !== "!" || pattern[1] === "(") && ignorePatterns.push(normalizePattern(pattern, options, props, !0));
  for (let pattern of patterns)
    pattern && (pattern[0] !== "!" || pattern[1] === "(" ? matchPatterns.push(normalizePattern(pattern, options, props, !1)) : (pattern[1] !== "!" || pattern[2] === "(") && ignorePatterns.push(normalizePattern(pattern.slice(1), options, props, !0)));
  return {
    match: matchPatterns,
    ignore: ignorePatterns
  };
}
function buildCrawler(options, patterns) {
  let cwd = options.cwd, props = {
    root: cwd,
    depthOffset: 0
  }, processed = processPatterns(options, patterns, props);
  options.debug && log("internal processing patterns:", processed);
  let { absolute, caseSensitiveMatch, debug, dot, followSymbolicLinks, onlyDirectories } = options, root = props.root.replace(BACKSLASHES, ""), matchOptions = {
    dot,
    nobrace: options.braceExpansion === !1,
    nocase: !caseSensitiveMatch,
    noextglob: options.extglob === !1,
    noglobstar: options.globstar === !1,
    posix: !0
  }, matcher = (0, import_picomatch.default)(processed.match, matchOptions), ignore = (0, import_picomatch.default)(processed.ignore, matchOptions), partialMatcher = getPartialMatcher(processed.match, matchOptions), format = buildFormat(cwd, root, absolute), excludeFormatter = absolute ? format : buildFormat(cwd, root, !0), excludePredicate = (_2, p3) => {
    let relativePath = excludeFormatter(p3, !0);
    return relativePath !== "." && !partialMatcher(relativePath) || ignore(relativePath);
  }, maxDepth;
  options.deep !== void 0 && (maxDepth = Math.round(options.deep - props.depthOffset));
  let crawler = new Builder({
    filters: [debug ? (p3, isDirectory) => {
      let path = format(p3, isDirectory), matches = matcher(path) && !ignore(path);
      return matches && log(`matched ${path}`), matches;
    } : (p3, isDirectory) => {
      let path = format(p3, isDirectory);
      return matcher(path) && !ignore(path);
    }],
    exclude: debug ? (_2, p3) => {
      let skipped = excludePredicate(_2, p3);
      return log(`${skipped ? "skipped" : "crawling"} ${p3}`), skipped;
    } : excludePredicate,
    fs: options.fs,
    pathSeparator: "/",
    relativePaths: !absolute,
    resolvePaths: absolute,
    includeBasePath: absolute,
    resolveSymlinks: followSymbolicLinks,
    excludeSymlinks: !followSymbolicLinks,
    excludeFiles: onlyDirectories,
    includeDirs: onlyDirectories || !options.onlyFiles,
    maxDepth,
    signal: options.signal
  }).crawl(root);
  return options.debug && log("internal properties:", {
    ...props,
    root
  }), [crawler, cwd !== root && !absolute && buildRelative(cwd, root)];
}
function formatPaths(paths, mapper) {
  if (mapper) for (let i2 = paths.length - 1; i2 >= 0; i2--) paths[i2] = mapper(paths[i2]);
  return paths;
}
var defaultOptions = {
  caseSensitiveMatch: !0,
  debug: !!process.env.TINYGLOBBY_DEBUG,
  expandDirectories: !0,
  followSymbolicLinks: !0,
  onlyFiles: !0
};
function getOptions(options) {
  let opts = Object.assign({}, options);
  for (let key in defaultOptions) opts[key] === void 0 && Object.assign(opts, { [key]: defaultOptions[key] });
  return opts.cwd = (opts.cwd instanceof URL ? fileURLToPath(opts.cwd) : resolve2(opts.cwd || process.cwd())).replace(BACKSLASHES, "/"), opts.ignore = ensureStringArray(opts.ignore), opts.fs && (opts.fs = {
    readdir: opts.fs.readdir || readdir,
    readdirSync: opts.fs.readdirSync || readdirSync,
    realpath: opts.fs.realpath || realpath,
    realpathSync: opts.fs.realpathSync || realpathSync,
    stat: opts.fs.stat || stat,
    statSync: opts.fs.statSync || statSync
  }), opts.debug && log("globbing with options:", opts), opts;
}
function getCrawler(globInput, inputOptions = {}) {
  var _ref;
  if (globInput && inputOptions?.patterns) throw new Error("Cannot pass patterns as both an argument and an option");
  let isModern = isReadonlyArray(globInput) || typeof globInput == "string", patterns = ensureStringArray((_ref = isModern ? globInput : globInput.patterns) !== null && _ref !== void 0 ? _ref : "**/*"), options = getOptions(isModern ? inputOptions : globInput);
  return patterns.length > 0 ? buildCrawler(options, patterns) : [];
}
function globSync(globInput, options) {
  let [crawler, relative3] = getCrawler(globInput, options);
  return crawler ? formatPaths(crawler.sync(), relative3) : [];
}

// src/common/js-package-manager/constants.ts
var NPM_LOCKFILE = "package-lock.json", PNPM_LOCKFILE = "pnpm-lock.yaml", YARN_LOCKFILE = "yarn.lock", BUN_LOCKFILE = "bun.lock", BUN_LOCKFILE_BINARY = "bun.lockb", LOCK_FILES = [
  NPM_LOCKFILE,
  PNPM_LOCKFILE,
  YARN_LOCKFILE,
  BUN_LOCKFILE,
  BUN_LOCKFILE_BINARY
];

// src/common/utils/paths.ts
var projectRoot, getProjectRoot = () => {
  if (projectRoot)
    return projectRoot;
  if (process.env.STORYBOOK_PROJECT_ROOT)
    return process.env.STORYBOOK_PROJECT_ROOT;
  try {
    let found = up2(".git") || up2(".svn") || up2(".hg");
    if (found)
      return projectRoot = join2(found, ".."), projectRoot;
  } catch (e2) {
    process.stdout.write(`
error searching for repository root: ${e2}
`);
  }
  try {
    let found = any(LOCK_FILES);
    if (found)
      return projectRoot = join2(found, ".."), projectRoot;
  } catch (e2) {
    process.stdout.write(`
error searching for lock file: ${e2}
`);
  }
  try {
    let [basePath, rest] = __dirname.split(`${sep2}node_modules${sep2}`, 2);
    if (rest && !basePath.includes(`${sep2}npm-cache${sep2}`) && !relative2(basePath, process.cwd()).startsWith(".."))
      return projectRoot = basePath, projectRoot;
  } catch (e2) {
    process.stdout.write(`
error searching for splitDirname: ${e2}
`);
  }
  return projectRoot = process.cwd(), projectRoot;
}, invalidateProjectRootCache = () => {
  projectRoot = void 0;
}, findFilesUp = (matchers, baseDir = process.cwd()) => {
  let matchingFiles = [];
  for (let directory of up(baseDir, { last: getProjectRoot() }))
    matchingFiles.push(...globSync(matchers, { cwd: directory, absolute: !0 }));
  return matchingFiles;
}, nodePathsToArray = (nodePath) => nodePath.split(process.platform === "win32" ? ";" : ":").filter(Boolean).map((p3) => resolve3("./", p3)), relativePattern = /^\.{1,2}([/\\]|$)/;
function normalizeStoryPath(filename) {
  return relativePattern.test(filename) ? filename : `.${sep2}${filename}`;
}

// src/common/utils/envs.ts
import { isWebContainer } from "@webcontainer/env";
async function loadEnvs(options = {}) {
  let { getEnvironment } = await import("./lib-4TDV2HIG.js"), defaultNodeEnv = options.production ? "production" : "development", baseEnv = {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    NODE_ENV: process.env.NODE_ENV || defaultNodeEnv,
    NODE_PATH: process.env.NODE_PATH || "",
    STORYBOOK: process.env.STORYBOOK || "true",
    // This is to support CRA's public folder feature.
    // In production we set this to dot(.) to allow the browser to access these assets
    // even when deployed inside a subpath. (like in GitHub pages)
    // In development this is just empty as we always serves from the root.
    PUBLIC_URL: options.production ? "." : ""
  }, dotenv = getEnvironment({ nodeEnv: baseEnv.NODE_ENV }), envEntries = Object.fromEntries(
    Object.entries({
      // TODO: it seems wrong that dotenv overrides process.env, but that's how it has always worked
      ...process.env,
      ...dotenv.raw
    }).filter(([name]) => /^STORYBOOK_/.test(name))
  ), raw = { ...baseEnv, ...envEntries };
  raw.NODE_PATH = nodePathsToArray(raw.NODE_PATH || "");
  let stringified = Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [key, JSON.stringify(value)])
  );
  return { raw, stringified };
}
var stringifyEnvs = (raw) => Object.entries(raw).reduce((acc, [key, value]) => (acc[key] = JSON.stringify(value), acc), {}), stringifyProcessEnvs = (raw) => Object.entries(raw).reduce((acc, [key, value]) => (acc[`process.env.${key}`] = JSON.stringify(value), acc), {}), optionalEnvToBoolean = (input) => {
  if (input !== void 0)
    return input.toUpperCase() === "FALSE" || input === "0" ? !1 : input.toUpperCase() === "TRUE" || input === "1" ? !0 : !!input;
};
function isCI() {
  return optionalEnvToBoolean(process.env.CI);
}

// src/common/utils/component-id.ts
function getComponentIdFromEntry(entry) {
  return entry.id.split("--")[0];
}

// src/common/utils/select-component-entry.ts
var STORY_FILE_TEST_REGEXP = /(stories|story)\.(m?js|ts)x?$/;
function isAttachedDocsEntry(entry) {
  return entry.type === "docs" && entry.tags?.includes(Tag.ATTACHED_MDX) === !0 && entry.storiesImports.length > 0;
}
function isEligibleStoryEntry(entry) {
  return entry.type === "story" && entry.subtype === "story";
}
function getStoryImportPathFromEntry(entry) {
  if (entry.type === "story")
    return entry.importPath;
  if (isAttachedDocsEntry(entry))
    return entry.storiesImports[0];
}
function selectComponentEntriesByComponentId(indexEntries) {
  let entriesByComponentId = /* @__PURE__ */ new Map();
  for (let entry of indexEntries)
    isEligibleStoryEntry(entry) && entriesByComponentId.set(getComponentIdFromEntry(entry), entry);
  for (let entry of indexEntries) {
    if (!isAttachedDocsEntry(entry))
      continue;
    let componentId = getComponentIdFromEntry(entry);
    entriesByComponentId.has(componentId) || entriesByComponentId.set(componentId, entry);
  }
  return entriesByComponentId;
}

export {
  toMerged,
  Channel,
  getRegisteredServices,
  listServices,
  describeService,
  getService2 as getService,
  registerService2 as registerService,
  writeOpenServiceStaticFiles,
  NPM_LOCKFILE,
  PNPM_LOCKFILE,
  YARN_LOCKFILE,
  BUN_LOCKFILE,
  BUN_LOCKFILE_BINARY,
  getProjectRoot,
  invalidateProjectRootCache,
  findFilesUp,
  nodePathsToArray,
  normalizeStoryPath,
  loadEnvs,
  stringifyEnvs,
  stringifyProcessEnvs,
  optionalEnvToBoolean,
  isCI,
  isWebContainer,
  getComponentIdFromEntry,
  STORY_FILE_TEST_REGEXP,
  getStoryImportPathFromEntry,
  selectComponentEntriesByComponentId
};
