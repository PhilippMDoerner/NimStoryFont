import ESM_COMPAT_Module from "node:module";
import { fileURLToPath as ESM_COMPAT_fileURLToPath } from 'node:url';
import { dirname as ESM_COMPAT_dirname } from 'node:path';
const __filename = ESM_COMPAT_fileURLToPath(import.meta.url);
const __dirname = ESM_COMPAT_dirname(__filename);
const require = ESM_COMPAT_Module.createRequire(import.meta.url);
var ki = Object.create;
var Kt = Object.defineProperty;
var Ti = Object.getOwnPropertyDescriptor;
var Ii = Object.getOwnPropertyNames;
var Si = Object.getPrototypeOf, Ei = Object.prototype.hasOwnProperty;
var i = (t, e) => Kt(t, "name", { value: e, configurable: !0 }), N = /* @__PURE__ */ ((t) => typeof require < "u" ? require : typeof Proxy <
"u" ? new Proxy(t, {
  get: (e, r) => (typeof require < "u" ? require : e)[r]
}) : t)(function(t) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + t + '" is not supported');
});
var Ci = (t, e) => () => (t && (e = t(t = 0)), e);
var I = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var Pi = (t, e, r, n) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of Ii(e))
      !Ei.call(t, s) && s !== r && Kt(t, s, { get: () => e[s], enumerable: !(n = Ti(e, s)) || n.enumerable });
  return t;
};
var K = (t, e, r) => (r = t != null ? ki(Si(t)) : {}, Pi(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  e || !t || !t.__esModule ? Kt(r, "default", { value: t, enumerable: !0 }) : r,
  t
));

// ../node_modules/picocolors/picocolors.js
var an = I((Ol, zt) => {
  var nt = process || {}, sn = nt.argv || [], rt = nt.env || {}, Ai = !(rt.NO_COLOR || sn.includes("--no-color")) && (!!rt.FORCE_COLOR || sn.
  includes("--color") || nt.platform === "win32" || (nt.stdout || {}).isTTY && rt.TERM !== "dumb" || !!rt.CI), Oi = /* @__PURE__ */ i((t, e, r = t) => (n) => {
    let s = "" + n, o = s.indexOf(e, t.length);
    return ~o ? t + ji(s, e, r, o) + e : t + s + e;
  }, "formatter"), ji = /* @__PURE__ */ i((t, e, r, n) => {
    let s = "", o = 0;
    do
      s += t.substring(o, n) + r, o = n + e.length, n = t.indexOf(e, o);
    while (~n);
    return s + t.substring(o);
  }, "replaceClose"), on = /* @__PURE__ */ i((t = Ai) => {
    let e = t ? Oi : () => String;
    return {
      isColorSupported: t,
      reset: e("\x1B[0m", "\x1B[0m"),
      bold: e("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
      dim: e("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
      italic: e("\x1B[3m", "\x1B[23m"),
      underline: e("\x1B[4m", "\x1B[24m"),
      inverse: e("\x1B[7m", "\x1B[27m"),
      hidden: e("\x1B[8m", "\x1B[28m"),
      strikethrough: e("\x1B[9m", "\x1B[29m"),
      black: e("\x1B[30m", "\x1B[39m"),
      red: e("\x1B[31m", "\x1B[39m"),
      green: e("\x1B[32m", "\x1B[39m"),
      yellow: e("\x1B[33m", "\x1B[39m"),
      blue: e("\x1B[34m", "\x1B[39m"),
      magenta: e("\x1B[35m", "\x1B[39m"),
      cyan: e("\x1B[36m", "\x1B[39m"),
      white: e("\x1B[37m", "\x1B[39m"),
      gray: e("\x1B[90m", "\x1B[39m"),
      bgBlack: e("\x1B[40m", "\x1B[49m"),
      bgRed: e("\x1B[41m", "\x1B[49m"),
      bgGreen: e("\x1B[42m", "\x1B[49m"),
      bgYellow: e("\x1B[43m", "\x1B[49m"),
      bgBlue: e("\x1B[44m", "\x1B[49m"),
      bgMagenta: e("\x1B[45m", "\x1B[49m"),
      bgCyan: e("\x1B[46m", "\x1B[49m"),
      bgWhite: e("\x1B[47m", "\x1B[49m"),
      blackBright: e("\x1B[90m", "\x1B[39m"),
      redBright: e("\x1B[91m", "\x1B[39m"),
      greenBright: e("\x1B[92m", "\x1B[39m"),
      yellowBright: e("\x1B[93m", "\x1B[39m"),
      blueBright: e("\x1B[94m", "\x1B[39m"),
      magentaBright: e("\x1B[95m", "\x1B[39m"),
      cyanBright: e("\x1B[96m", "\x1B[39m"),
      whiteBright: e("\x1B[97m", "\x1B[39m"),
      bgBlackBright: e("\x1B[100m", "\x1B[49m"),
      bgRedBright: e("\x1B[101m", "\x1B[49m"),
      bgGreenBright: e("\x1B[102m", "\x1B[49m"),
      bgYellowBright: e("\x1B[103m", "\x1B[49m"),
      bgBlueBright: e("\x1B[104m", "\x1B[49m"),
      bgMagentaBright: e("\x1B[105m", "\x1B[49m"),
      bgCyanBright: e("\x1B[106m", "\x1B[49m"),
      bgWhiteBright: e("\x1B[107m", "\x1B[49m")
    };
  }, "createColors");
  zt.exports = on();
  zt.exports.createColors = on;
});

// ../node_modules/walk-up-path/dist/cjs/index.js
var yn = I((it) => {
  "use strict";
  Object.defineProperty(it, "__esModule", { value: !0 });
  it.walkUp = void 0;
  var hn = N("path"), Ni = /* @__PURE__ */ i(function* (t) {
    for (t = (0, hn.resolve)(t); t; ) {
      yield t;
      let e = (0, hn.dirname)(t);
      if (e === t)
        break;
      t = e;
    }
  }, "walkUp");
  it.walkUp = Ni;
});

// ../node_modules/zod/lib/helpers/util.js
var Ze = I((E) => {
  "use strict";
  Object.defineProperty(E, "__esModule", { value: !0 });
  E.getParsedType = E.ZodParsedType = E.objectUtil = E.util = void 0;
  var Yt;
  (function(t) {
    t.assertEqual = (s) => s;
    function e(s) {
    }
    i(e, "assertIs"), t.assertIs = e;
    function r(s) {
      throw new Error();
    }
    i(r, "assertNever"), t.assertNever = r, t.arrayToEnum = (s) => {
      let o = {};
      for (let a of s)
        o[a] = a;
      return o;
    }, t.getValidEnumValues = (s) => {
      let o = t.objectKeys(s).filter((c) => typeof s[s[c]] != "number"), a = {};
      for (let c of o)
        a[c] = s[c];
      return t.objectValues(a);
    }, t.objectValues = (s) => t.objectKeys(s).map(function(o) {
      return s[o];
    }), t.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
      let o = [];
      for (let a in s)
        Object.prototype.hasOwnProperty.call(s, a) && o.push(a);
      return o;
    }, t.find = (s, o) => {
      for (let a of s)
        if (o(a))
          return a;
    }, t.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && isFinite(s) && Math.
    floor(s) === s;
    function n(s, o = " | ") {
      return s.map((a) => typeof a == "string" ? `'${a}'` : a).join(o);
    }
    i(n, "joinValues"), t.joinValues = n, t.jsonStringifyReplacer = (s, o) => typeof o == "bigint" ? o.toString() : o;
  })(Yt || (E.util = Yt = {}));
  var bn;
  (function(t) {
    t.mergeShapes = (e, r) => ({
      ...e,
      ...r
      // second overwrites first
    });
  })(bn || (E.objectUtil = bn = {}));
  E.ZodParsedType = Yt.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set"
  ]);
  var $i = /* @__PURE__ */ i((t) => {
    switch (typeof t) {
      case "undefined":
        return E.ZodParsedType.undefined;
      case "string":
        return E.ZodParsedType.string;
      case "number":
        return isNaN(t) ? E.ZodParsedType.nan : E.ZodParsedType.number;
      case "boolean":
        return E.ZodParsedType.boolean;
      case "function":
        return E.ZodParsedType.function;
      case "bigint":
        return E.ZodParsedType.bigint;
      case "symbol":
        return E.ZodParsedType.symbol;
      case "object":
        return Array.isArray(t) ? E.ZodParsedType.array : t === null ? E.ZodParsedType.null : t.then && typeof t.then == "function" && t.catch &&
        typeof t.catch == "function" ? E.ZodParsedType.promise : typeof Map < "u" && t instanceof Map ? E.ZodParsedType.map : typeof Set < "\
u" && t instanceof Set ? E.ZodParsedType.set : typeof Date < "u" && t instanceof Date ? E.ZodParsedType.date : E.ZodParsedType.object;
      default:
        return E.ZodParsedType.unknown;
    }
  }, "getParsedType");
  E.getParsedType = $i;
});

// ../node_modules/zod/lib/ZodError.js
var ct = I((z) => {
  "use strict";
  Object.defineProperty(z, "__esModule", { value: !0 });
  z.ZodError = z.quotelessJson = z.ZodIssueCode = void 0;
  var vn = Ze();
  z.ZodIssueCode = vn.util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite"
  ]);
  var Vi = /* @__PURE__ */ i((t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:"), "quotelessJson");
  z.quotelessJson = Vi;
  var Me = class t extends Error {
    static {
      i(this, "ZodError");
    }
    get errors() {
      return this.issues;
    }
    constructor(e) {
      super(), this.issues = [], this.addIssue = (n) => {
        this.issues = [...this.issues, n];
      }, this.addIssues = (n = []) => {
        this.issues = [...this.issues, ...n];
      };
      let r = new.target.prototype;
      Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = e;
    }
    format(e) {
      let r = e || function(o) {
        return o.message;
      }, n = { _errors: [] }, s = /* @__PURE__ */ i((o) => {
        for (let a of o.issues)
          if (a.code === "invalid_union")
            a.unionErrors.map(s);
          else if (a.code === "invalid_return_type")
            s(a.returnTypeError);
          else if (a.code === "invalid_arguments")
            s(a.argumentsError);
          else if (a.path.length === 0)
            n._errors.push(r(a));
          else {
            let c = n, l = 0;
            for (; l < a.path.length; ) {
              let p = a.path[l];
              l === a.path.length - 1 ? (c[p] = c[p] || { _errors: [] }, c[p]._errors.push(r(a))) : c[p] = c[p] || { _errors: [] }, c = c[p],
              l++;
            }
          }
      }, "processError");
      return s(this), n;
    }
    static assert(e) {
      if (!(e instanceof t))
        throw new Error(`Not a ZodError: ${e}`);
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, vn.util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(e = (r) => r.message) {
      let r = {}, n = [];
      for (let s of this.issues)
        s.path.length > 0 ? (r[s.path[0]] = r[s.path[0]] || [], r[s.path[0]].push(e(s))) : n.push(e(s));
      return { formErrors: n, fieldErrors: r };
    }
    get formErrors() {
      return this.flatten();
    }
  };
  z.ZodError = Me;
  Me.create = (t) => new Me(t);
});

// ../node_modules/zod/lib/locales/en.js
var Xt = I((Ht) => {
  "use strict";
  Object.defineProperty(Ht, "__esModule", { value: !0 });
  var Q = Ze(), A = ct(), Fi = /* @__PURE__ */ i((t, e) => {
    let r;
    switch (t.code) {
      case A.ZodIssueCode.invalid_type:
        t.received === Q.ZodParsedType.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
        break;
      case A.ZodIssueCode.invalid_literal:
        r = `Invalid literal value, expected ${JSON.stringify(t.expected, Q.util.jsonStringifyReplacer)}`;
        break;
      case A.ZodIssueCode.unrecognized_keys:
        r = `Unrecognized key(s) in object: ${Q.util.joinValues(t.keys, ", ")}`;
        break;
      case A.ZodIssueCode.invalid_union:
        r = "Invalid input";
        break;
      case A.ZodIssueCode.invalid_union_discriminator:
        r = `Invalid discriminator value. Expected ${Q.util.joinValues(t.options)}`;
        break;
      case A.ZodIssueCode.invalid_enum_value:
        r = `Invalid enum value. Expected ${Q.util.joinValues(t.options)}, received '${t.received}'`;
        break;
      case A.ZodIssueCode.invalid_arguments:
        r = "Invalid function arguments";
        break;
      case A.ZodIssueCode.invalid_return_type:
        r = "Invalid function return type";
        break;
      case A.ZodIssueCode.invalid_date:
        r = "Invalid date";
        break;
      case A.ZodIssueCode.invalid_string:
        typeof t.validation == "object" ? "includes" in t.validation ? (r = `Invalid input: must include "${t.validation.includes}"`, typeof t.
        validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`)) : "start\
sWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input\
: must end with "${t.validation.endsWith}"` : Q.util.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` : r =
        "Invalid";
        break;
      case A.ZodIssueCode.too_small:
        t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` :
        t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` :
        t.type === "number" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater tha\
n "}${t.minimum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "gre\
ater than "}${new Date(Number(t.minimum))}` : r = "Invalid input";
        break;
      case A.ZodIssueCode.too_big:
        t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` :
        t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` :
        t.type === "number" ? r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` :
        t.type === "bigint" ? r = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` :
        t.type === "date" ? r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(
        Number(t.maximum))}` : r = "Invalid input";
        break;
      case A.ZodIssueCode.custom:
        r = "Invalid input";
        break;
      case A.ZodIssueCode.invalid_intersection_types:
        r = "Intersection results could not be merged";
        break;
      case A.ZodIssueCode.not_multiple_of:
        r = `Number must be a multiple of ${t.multipleOf}`;
        break;
      case A.ZodIssueCode.not_finite:
        r = "Number must be finite";
        break;
      default:
        r = e.defaultError, Q.util.assertNever(t);
    }
    return { message: r };
  }, "errorMap");
  Ht.default = Fi;
});

// ../node_modules/zod/lib/errors.js
var dt = I(($) => {
  "use strict";
  var Bi = $ && $.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty($, "__esModule", { value: !0 });
  $.getErrorMap = $.setErrorMap = $.defaultErrorMap = void 0;
  var _n = Bi(Xt());
  $.defaultErrorMap = _n.default;
  var wn = _n.default;
  function Wi(t) {
    wn = t;
  }
  i(Wi, "setErrorMap");
  $.setErrorMap = Wi;
  function qi() {
    return wn;
  }
  i(qi, "getErrorMap");
  $.getErrorMap = qi;
});

// ../node_modules/zod/lib/helpers/parseUtil.js
var er = I((T) => {
  "use strict";
  var Gi = T && T.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(T, "__esModule", { value: !0 });
  T.isAsync = T.isValid = T.isDirty = T.isAborted = T.OK = T.DIRTY = T.INVALID = T.ParseStatus = T.addIssueToContext = T.EMPTY_PATH = T.makeIssue =
  void 0;
  var Ki = dt(), kn = Gi(Xt()), zi = /* @__PURE__ */ i((t) => {
    let { data: e, path: r, errorMaps: n, issueData: s } = t, o = [...r, ...s.path || []], a = {
      ...s,
      path: o
    };
    if (s.message !== void 0)
      return {
        ...s,
        path: o,
        message: s.message
      };
    let c = "", l = n.filter((p) => !!p).slice().reverse();
    for (let p of l)
      c = p(a, { data: e, defaultError: c }).message;
    return {
      ...s,
      path: o,
      message: c
    };
  }, "makeIssue");
  T.makeIssue = zi;
  T.EMPTY_PATH = [];
  function Ji(t, e) {
    let r = (0, Ki.getErrorMap)(), n = (0, T.makeIssue)({
      issueData: e,
      data: t.data,
      path: t.path,
      errorMaps: [
        t.common.contextualErrorMap,
        // contextual error map is first priority
        t.schemaErrorMap,
        // then schema-bound map if available
        r,
        // then global override map
        r === kn.default ? void 0 : kn.default
        // then global default map
      ].filter((s) => !!s)
    });
    t.common.issues.push(n);
  }
  i(Ji, "addIssueToContext");
  T.addIssueToContext = Ji;
  var Qt = class t {
    static {
      i(this, "ParseStatus");
    }
    constructor() {
      this.value = "valid";
    }
    dirty() {
      this.value === "valid" && (this.value = "dirty");
    }
    abort() {
      this.value !== "aborted" && (this.value = "aborted");
    }
    static mergeArray(e, r) {
      let n = [];
      for (let s of r) {
        if (s.status === "aborted")
          return T.INVALID;
        s.status === "dirty" && e.dirty(), n.push(s.value);
      }
      return { status: e.value, value: n };
    }
    static async mergeObjectAsync(e, r) {
      let n = [];
      for (let s of r) {
        let o = await s.key, a = await s.value;
        n.push({
          key: o,
          value: a
        });
      }
      return t.mergeObjectSync(e, n);
    }
    static mergeObjectSync(e, r) {
      let n = {};
      for (let s of r) {
        let { key: o, value: a } = s;
        if (o.status === "aborted" || a.status === "aborted")
          return T.INVALID;
        o.status === "dirty" && e.dirty(), a.status === "dirty" && e.dirty(), o.value !== "__proto__" && (typeof a.value < "u" || s.alwaysSet) &&
        (n[o.value] = a.value);
      }
      return { status: e.value, value: n };
    }
  };
  T.ParseStatus = Qt;
  T.INVALID = Object.freeze({
    status: "aborted"
  });
  var Yi = /* @__PURE__ */ i((t) => ({ status: "dirty", value: t }), "DIRTY");
  T.DIRTY = Yi;
  var Hi = /* @__PURE__ */ i((t) => ({ status: "valid", value: t }), "OK");
  T.OK = Hi;
  var Xi = /* @__PURE__ */ i((t) => t.status === "aborted", "isAborted");
  T.isAborted = Xi;
  var Qi = /* @__PURE__ */ i((t) => t.status === "dirty", "isDirty");
  T.isDirty = Qi;
  var ea = /* @__PURE__ */ i((t) => t.status === "valid", "isValid");
  T.isValid = ea;
  var ta = /* @__PURE__ */ i((t) => typeof Promise < "u" && t instanceof Promise, "isAsync");
  T.isAsync = ta;
});

// ../node_modules/zod/lib/helpers/typeAliases.js
var In = I((Tn) => {
  "use strict";
  Object.defineProperty(Tn, "__esModule", { value: !0 });
});

// ../node_modules/zod/lib/helpers/errorUtil.js
var En = I((ut) => {
  "use strict";
  Object.defineProperty(ut, "__esModule", { value: !0 });
  ut.errorUtil = void 0;
  var Sn;
  (function(t) {
    t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e?.message;
  })(Sn || (ut.errorUtil = Sn = {}));
});

// ../node_modules/zod/lib/types.js
var $n = I((d) => {
  "use strict";
  var pt = d && d.__classPrivateFieldGet || function(t, e, r, n) {
    if (r === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
    if (typeof e == "function" ? t !== e || !n : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did n\
ot declare it");
    return r === "m" ? n : r === "a" ? n.call(t) : n ? n.value : e.get(t);
  }, An = d && d.__classPrivateFieldSet || function(t, e, r, n, s) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !s) throw new TypeError("Private accessor was defined without a setter");
    if (typeof e == "function" ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did no\
t declare it");
    return n === "a" ? s.call(t, r) : s ? s.value = r : e.set(t, r), r;
  }, Le, De;
  Object.defineProperty(d, "__esModule", { value: !0 });
  d.boolean = d.bigint = d.array = d.any = d.coerce = d.ZodFirstPartyTypeKind = d.late = d.ZodSchema = d.Schema = d.custom = d.ZodReadonly =
  d.ZodPipeline = d.ZodBranded = d.BRAND = d.ZodNaN = d.ZodCatch = d.ZodDefault = d.ZodNullable = d.ZodOptional = d.ZodTransformer = d.ZodEffects =
  d.ZodPromise = d.ZodNativeEnum = d.ZodEnum = d.ZodLiteral = d.ZodLazy = d.ZodFunction = d.ZodSet = d.ZodMap = d.ZodRecord = d.ZodTuple = d.
  ZodIntersection = d.ZodDiscriminatedUnion = d.ZodUnion = d.ZodObject = d.ZodArray = d.ZodVoid = d.ZodNever = d.ZodUnknown = d.ZodAny = d.ZodNull =
  d.ZodUndefined = d.ZodSymbol = d.ZodDate = d.ZodBoolean = d.ZodBigInt = d.ZodNumber = d.ZodString = d.datetimeRegex = d.ZodType = void 0;
  d.NEVER = d.void = d.unknown = d.union = d.undefined = d.tuple = d.transformer = d.symbol = d.string = d.strictObject = d.set = d.record =
  d.promise = d.preprocess = d.pipeline = d.ostring = d.optional = d.onumber = d.oboolean = d.object = d.number = d.nullable = d.null = d.never =
  d.nativeEnum = d.nan = d.map = d.literal = d.lazy = d.intersection = d.instanceof = d.function = d.enum = d.effect = d.discriminatedUnion =
  d.date = void 0;
  var lt = dt(), y = En(), u = er(), h = Ze(), m = ct(), L = class {
    static {
      i(this, "ParseInputLazyPath");
    }
    constructor(e, r, n, s) {
      this._cachedPath = [], this.parent = e, this.data = r, this._path = n, this._key = s;
    }
    get path() {
      return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.
      push(...this._path, this._key)), this._cachedPath;
    }
  }, Cn = /* @__PURE__ */ i((t, e) => {
    if ((0, u.isValid)(e))
      return { success: !0, data: e.value };
    if (!t.common.issues.length)
      throw new Error("Validation failed but no issues detected.");
    return {
      success: !1,
      get error() {
        if (this._error)
          return this._error;
        let r = new m.ZodError(t.common.issues);
        return this._error = r, this._error;
      }
    };
  }, "handleResult");
  function b(t) {
    if (!t)
      return {};
    let { errorMap: e, invalid_type_error: r, required_error: n, description: s } = t;
    if (e && (r || n))
      throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    return e ? { errorMap: e, description: s } : { errorMap: /* @__PURE__ */ i((a, c) => {
      var l, p;
      let { message: f } = t;
      return a.code === "invalid_enum_value" ? { message: f ?? c.defaultError } : typeof c.data > "u" ? { message: (l = f ?? n) !== null && l !==
      void 0 ? l : c.defaultError } : a.code !== "invalid_type" ? { message: c.defaultError } : { message: (p = f ?? r) !== null && p !== void 0 ?
      p : c.defaultError };
    }, "customMap"), description: s };
  }
  i(b, "processCreateParams");
  var v = class {
    static {
      i(this, "ZodType");
    }
    get description() {
      return this._def.description;
    }
    _getType(e) {
      return (0, h.getParsedType)(e.data);
    }
    _getOrReturnCtx(e, r) {
      return r || {
        common: e.parent.common,
        data: e.data,
        parsedType: (0, h.getParsedType)(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      };
    }
    _processInputParams(e) {
      return {
        status: new u.ParseStatus(),
        ctx: {
          common: e.parent.common,
          data: e.data,
          parsedType: (0, h.getParsedType)(e.data),
          schemaErrorMap: this._def.errorMap,
          path: e.path,
          parent: e.parent
        }
      };
    }
    _parseSync(e) {
      let r = this._parse(e);
      if ((0, u.isAsync)(r))
        throw new Error("Synchronous parse encountered promise.");
      return r;
    }
    _parseAsync(e) {
      let r = this._parse(e);
      return Promise.resolve(r);
    }
    parse(e, r) {
      let n = this.safeParse(e, r);
      if (n.success)
        return n.data;
      throw n.error;
    }
    safeParse(e, r) {
      var n;
      let s = {
        common: {
          issues: [],
          async: (n = r?.async) !== null && n !== void 0 ? n : !1,
          contextualErrorMap: r?.errorMap
        },
        path: r?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: (0, h.getParsedType)(e)
      }, o = this._parseSync({ data: e, path: s.path, parent: s });
      return Cn(s, o);
    }
    "~validate"(e) {
      var r, n;
      let s = {
        common: {
          issues: [],
          async: !!this["~standard"].async
        },
        path: [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: (0, h.getParsedType)(e)
      };
      if (!this["~standard"].async)
        try {
          let o = this._parseSync({ data: e, path: [], parent: s });
          return (0, u.isValid)(o) ? {
            value: o.value
          } : {
            issues: s.common.issues
          };
        } catch (o) {
          !((n = (r = o?.message) === null || r === void 0 ? void 0 : r.toLowerCase()) === null || n === void 0) && n.includes("encountered") &&
          (this["~standard"].async = !0), s.common = {
            issues: [],
            async: !0
          };
        }
      return this._parseAsync({ data: e, path: [], parent: s }).then((o) => (0, u.isValid)(o) ? {
        value: o.value
      } : {
        issues: s.common.issues
      });
    }
    async parseAsync(e, r) {
      let n = await this.safeParseAsync(e, r);
      if (n.success)
        return n.data;
      throw n.error;
    }
    async safeParseAsync(e, r) {
      let n = {
        common: {
          issues: [],
          contextualErrorMap: r?.errorMap,
          async: !0
        },
        path: r?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: (0, h.getParsedType)(e)
      }, s = this._parse({ data: e, path: n.path, parent: n }), o = await ((0, u.isAsync)(s) ? s : Promise.resolve(s));
      return Cn(n, o);
    }
    refine(e, r) {
      let n = /* @__PURE__ */ i((s) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(s) : r, "getIssu\
eProperties");
      return this._refinement((s, o) => {
        let a = e(s), c = /* @__PURE__ */ i(() => o.addIssue({
          code: m.ZodIssueCode.custom,
          ...n(s)
        }), "setError");
        return typeof Promise < "u" && a instanceof Promise ? a.then((l) => l ? !0 : (c(), !1)) : a ? !0 : (c(), !1);
      });
    }
    refinement(e, r) {
      return this._refinement((n, s) => e(n) ? !0 : (s.addIssue(typeof r == "function" ? r(n, s) : r), !1));
    }
    _refinement(e) {
      return new Z({
        schema: this,
        typeName: g.ZodEffects,
        effect: { type: "refinement", refinement: e }
      });
    }
    superRefine(e) {
      return this._refinement(e);
    }
    constructor(e) {
      this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync =
      this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.
      bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.
      bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.
      promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(
      this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe =
      this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.
      bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
        version: 1,
        vendor: "zod",
        validate: /* @__PURE__ */ i((r) => this["~validate"](r), "validate")
      };
    }
    optional() {
      return M.create(this, this._def);
    }
    nullable() {
      return F.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return q.create(this);
    }
    promise() {
      return H.create(this, this._def);
    }
    or(e) {
      return ie.create([this, e], this._def);
    }
    and(e) {
      return ae.create(this, e, this._def);
    }
    transform(e) {
      return new Z({
        ...b(this._def),
        schema: this,
        typeName: g.ZodEffects,
        effect: { type: "transform", transform: e }
      });
    }
    default(e) {
      let r = typeof e == "function" ? e : () => e;
      return new pe({
        ...b(this._def),
        innerType: this,
        defaultValue: r,
        typeName: g.ZodDefault
      });
    }
    brand() {
      return new Ue({
        typeName: g.ZodBranded,
        type: this,
        ...b(this._def)
      });
    }
    catch(e) {
      let r = typeof e == "function" ? e : () => e;
      return new fe({
        ...b(this._def),
        innerType: this,
        catchValue: r,
        typeName: g.ZodCatch
      });
    }
    describe(e) {
      let r = this.constructor;
      return new r({
        ...this._def,
        description: e
      });
    }
    pipe(e) {
      return $e.create(this, e);
    }
    readonly() {
      return me.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  };
  d.ZodType = v;
  d.Schema = v;
  d.ZodSchema = v;
  var ra = /^c[^\s-]{8,}$/i, na = /^[0-9a-z]+$/, sa = /^[0-9A-HJKMNP-TV-Z]{26}$/i, oa = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  ia = /^[a-z0-9_-]{21}$/i, aa = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, ca = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  da = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, ua = "^(\\p{Extended_Pictographic}|\\p{Emoji_Comp\
onent})+$", tr, la = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, pa = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  fa = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  ma = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  ha = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, ya = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  On = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469\
]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", ga = new RegExp(`^${On}$`);
  function jn(t) {
    let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
    return t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`), e;
  }
  i(jn, "timeRegexSource");
  function xa(t) {
    return new RegExp(`^${jn(t)}$`);
  }
  i(xa, "timeRegex");
  function Rn(t) {
    let e = `${On}T${jn(t)}`, r = [];
    return r.push(t.local ? "Z?" : "Z"), t.offset && r.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${r.join("|")})`, new RegExp(`^${e}$`);
  }
  i(Rn, "datetimeRegex");
  d.datetimeRegex = Rn;
  function ba(t, e) {
    return !!((e === "v4" || !e) && la.test(t) || (e === "v6" || !e) && fa.test(t));
  }
  i(ba, "isValidIP");
  function va(t, e) {
    if (!aa.test(t))
      return !1;
    try {
      let [r] = t.split("."), n = r.replace(/-/g, "+").replace(/_/g, "/").padEnd(r.length + (4 - r.length % 4) % 4, "="), s = JSON.parse(atob(
      n));
      return !(typeof s != "object" || s === null || !s.typ || !s.alg || e && s.alg !== e);
    } catch {
      return !1;
    }
  }
  i(va, "isValidJWT");
  function _a(t, e) {
    return !!((e === "v4" || !e) && pa.test(t) || (e === "v6" || !e) && ma.test(t));
  }
  i(_a, "isValidCidr");
  var J = class t extends v {
    static {
      i(this, "ZodString");
    }
    _parse(e) {
      if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== h.ZodParsedType.string) {
        let o = this._getOrReturnCtx(e);
        return (0, u.addIssueToContext)(o, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.string,
          received: o.parsedType
        }), u.INVALID;
      }
      let n = new u.ParseStatus(), s;
      for (let o of this._def.checks)
        if (o.kind === "min")
          e.data.length < o.value && (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
            code: m.ZodIssueCode.too_small,
            minimum: o.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: o.message
          }), n.dirty());
        else if (o.kind === "max")
          e.data.length > o.value && (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
            code: m.ZodIssueCode.too_big,
            maximum: o.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: o.message
          }), n.dirty());
        else if (o.kind === "length") {
          let a = e.data.length > o.value, c = e.data.length < o.value;
          (a || c) && (s = this._getOrReturnCtx(e, s), a ? (0, u.addIssueToContext)(s, {
            code: m.ZodIssueCode.too_big,
            maximum: o.value,
            type: "string",
            inclusive: !0,
            exact: !0,
            message: o.message
          }) : c && (0, u.addIssueToContext)(s, {
            code: m.ZodIssueCode.too_small,
            minimum: o.value,
            type: "string",
            inclusive: !0,
            exact: !0,
            message: o.message
          }), n.dirty());
        } else if (o.kind === "email")
          da.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
            validation: "email",
            code: m.ZodIssueCode.invalid_string,
            message: o.message
          }), n.dirty());
        else if (o.kind === "emoji")
          tr || (tr = new RegExp(ua, "u")), tr.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
            validation: "emoji",
            code: m.ZodIssueCode.invalid_string,
            message: o.message
          }), n.dirty());
        else if (o.kind === "uuid")
          oa.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
            validation: "uuid",
            code: m.ZodIssueCode.invalid_string,
            message: o.message
          }), n.dirty());
        else if (o.kind === "nanoid")
          ia.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
            validation: "nanoid",
            code: m.ZodIssueCode.invalid_string,
            message: o.message
          }), n.dirty());
        else if (o.kind === "cuid")
          ra.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
            validation: "cuid",
            code: m.ZodIssueCode.invalid_string,
            message: o.message
          }), n.dirty());
        else if (o.kind === "cuid2")
          na.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
            validation: "cuid2",
            code: m.ZodIssueCode.invalid_string,
            message: o.message
          }), n.dirty());
        else if (o.kind === "ulid")
          sa.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
            validation: "ulid",
            code: m.ZodIssueCode.invalid_string,
            message: o.message
          }), n.dirty());
        else if (o.kind === "url")
          try {
            new URL(e.data);
          } catch {
            s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
              validation: "url",
              code: m.ZodIssueCode.invalid_string,
              message: o.message
            }), n.dirty();
          }
        else o.kind === "regex" ? (o.regex.lastIndex = 0, o.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(
        s, {
          validation: "regex",
          code: m.ZodIssueCode.invalid_string,
          message: o.message
        }), n.dirty())) : o.kind === "trim" ? e.data = e.data.trim() : o.kind === "includes" ? e.data.includes(o.value, o.position) || (s = this.
        _getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          code: m.ZodIssueCode.invalid_string,
          validation: { includes: o.value, position: o.position },
          message: o.message
        }), n.dirty()) : o.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : o.kind === "toUpperCase" ? e.data = e.data.toUpperCase() :
        o.kind === "startsWith" ? e.data.startsWith(o.value) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          code: m.ZodIssueCode.invalid_string,
          validation: { startsWith: o.value },
          message: o.message
        }), n.dirty()) : o.kind === "endsWith" ? e.data.endsWith(o.value) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          code: m.ZodIssueCode.invalid_string,
          validation: { endsWith: o.value },
          message: o.message
        }), n.dirty()) : o.kind === "datetime" ? Rn(o).test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          code: m.ZodIssueCode.invalid_string,
          validation: "datetime",
          message: o.message
        }), n.dirty()) : o.kind === "date" ? ga.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          code: m.ZodIssueCode.invalid_string,
          validation: "date",
          message: o.message
        }), n.dirty()) : o.kind === "time" ? xa(o).test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          code: m.ZodIssueCode.invalid_string,
          validation: "time",
          message: o.message
        }), n.dirty()) : o.kind === "duration" ? ca.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          validation: "duration",
          code: m.ZodIssueCode.invalid_string,
          message: o.message
        }), n.dirty()) : o.kind === "ip" ? ba(e.data, o.version) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          validation: "ip",
          code: m.ZodIssueCode.invalid_string,
          message: o.message
        }), n.dirty()) : o.kind === "jwt" ? va(e.data, o.alg) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          validation: "jwt",
          code: m.ZodIssueCode.invalid_string,
          message: o.message
        }), n.dirty()) : o.kind === "cidr" ? _a(e.data, o.version) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          validation: "cidr",
          code: m.ZodIssueCode.invalid_string,
          message: o.message
        }), n.dirty()) : o.kind === "base64" ? ha.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          validation: "base64",
          code: m.ZodIssueCode.invalid_string,
          message: o.message
        }), n.dirty()) : o.kind === "base64url" ? ya.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          validation: "base64url",
          code: m.ZodIssueCode.invalid_string,
          message: o.message
        }), n.dirty()) : h.util.assertNever(o);
      return { status: n.value, value: e.data };
    }
    _regex(e, r, n) {
      return this.refinement((s) => e.test(s), {
        validation: r,
        code: m.ZodIssueCode.invalid_string,
        ...y.errorUtil.errToObj(n)
      });
    }
    _addCheck(e) {
      return new t({
        ...this._def,
        checks: [...this._def.checks, e]
      });
    }
    email(e) {
      return this._addCheck({ kind: "email", ...y.errorUtil.errToObj(e) });
    }
    url(e) {
      return this._addCheck({ kind: "url", ...y.errorUtil.errToObj(e) });
    }
    emoji(e) {
      return this._addCheck({ kind: "emoji", ...y.errorUtil.errToObj(e) });
    }
    uuid(e) {
      return this._addCheck({ kind: "uuid", ...y.errorUtil.errToObj(e) });
    }
    nanoid(e) {
      return this._addCheck({ kind: "nanoid", ...y.errorUtil.errToObj(e) });
    }
    cuid(e) {
      return this._addCheck({ kind: "cuid", ...y.errorUtil.errToObj(e) });
    }
    cuid2(e) {
      return this._addCheck({ kind: "cuid2", ...y.errorUtil.errToObj(e) });
    }
    ulid(e) {
      return this._addCheck({ kind: "ulid", ...y.errorUtil.errToObj(e) });
    }
    base64(e) {
      return this._addCheck({ kind: "base64", ...y.errorUtil.errToObj(e) });
    }
    base64url(e) {
      return this._addCheck({
        kind: "base64url",
        ...y.errorUtil.errToObj(e)
      });
    }
    jwt(e) {
      return this._addCheck({ kind: "jwt", ...y.errorUtil.errToObj(e) });
    }
    ip(e) {
      return this._addCheck({ kind: "ip", ...y.errorUtil.errToObj(e) });
    }
    cidr(e) {
      return this._addCheck({ kind: "cidr", ...y.errorUtil.errToObj(e) });
    }
    datetime(e) {
      var r, n;
      return typeof e == "string" ? this._addCheck({
        kind: "datetime",
        precision: null,
        offset: !1,
        local: !1,
        message: e
      }) : this._addCheck({
        kind: "datetime",
        precision: typeof e?.precision > "u" ? null : e?.precision,
        offset: (r = e?.offset) !== null && r !== void 0 ? r : !1,
        local: (n = e?.local) !== null && n !== void 0 ? n : !1,
        ...y.errorUtil.errToObj(e?.message)
      });
    }
    date(e) {
      return this._addCheck({ kind: "date", message: e });
    }
    time(e) {
      return typeof e == "string" ? this._addCheck({
        kind: "time",
        precision: null,
        message: e
      }) : this._addCheck({
        kind: "time",
        precision: typeof e?.precision > "u" ? null : e?.precision,
        ...y.errorUtil.errToObj(e?.message)
      });
    }
    duration(e) {
      return this._addCheck({ kind: "duration", ...y.errorUtil.errToObj(e) });
    }
    regex(e, r) {
      return this._addCheck({
        kind: "regex",
        regex: e,
        ...y.errorUtil.errToObj(r)
      });
    }
    includes(e, r) {
      return this._addCheck({
        kind: "includes",
        value: e,
        position: r?.position,
        ...y.errorUtil.errToObj(r?.message)
      });
    }
    startsWith(e, r) {
      return this._addCheck({
        kind: "startsWith",
        value: e,
        ...y.errorUtil.errToObj(r)
      });
    }
    endsWith(e, r) {
      return this._addCheck({
        kind: "endsWith",
        value: e,
        ...y.errorUtil.errToObj(r)
      });
    }
    min(e, r) {
      return this._addCheck({
        kind: "min",
        value: e,
        ...y.errorUtil.errToObj(r)
      });
    }
    max(e, r) {
      return this._addCheck({
        kind: "max",
        value: e,
        ...y.errorUtil.errToObj(r)
      });
    }
    length(e, r) {
      return this._addCheck({
        kind: "length",
        value: e,
        ...y.errorUtil.errToObj(r)
      });
    }
    /**
     * Equivalent to `.min(1)`
     */
    nonempty(e) {
      return this.min(1, y.errorUtil.errToObj(e));
    }
    trim() {
      return new t({
        ...this._def,
        checks: [...this._def.checks, { kind: "trim" }]
      });
    }
    toLowerCase() {
      return new t({
        ...this._def,
        checks: [...this._def.checks, { kind: "toLowerCase" }]
      });
    }
    toUpperCase() {
      return new t({
        ...this._def,
        checks: [...this._def.checks, { kind: "toUpperCase" }]
      });
    }
    get isDatetime() {
      return !!this._def.checks.find((e) => e.kind === "datetime");
    }
    get isDate() {
      return !!this._def.checks.find((e) => e.kind === "date");
    }
    get isTime() {
      return !!this._def.checks.find((e) => e.kind === "time");
    }
    get isDuration() {
      return !!this._def.checks.find((e) => e.kind === "duration");
    }
    get isEmail() {
      return !!this._def.checks.find((e) => e.kind === "email");
    }
    get isURL() {
      return !!this._def.checks.find((e) => e.kind === "url");
    }
    get isEmoji() {
      return !!this._def.checks.find((e) => e.kind === "emoji");
    }
    get isUUID() {
      return !!this._def.checks.find((e) => e.kind === "uuid");
    }
    get isNANOID() {
      return !!this._def.checks.find((e) => e.kind === "nanoid");
    }
    get isCUID() {
      return !!this._def.checks.find((e) => e.kind === "cuid");
    }
    get isCUID2() {
      return !!this._def.checks.find((e) => e.kind === "cuid2");
    }
    get isULID() {
      return !!this._def.checks.find((e) => e.kind === "ulid");
    }
    get isIP() {
      return !!this._def.checks.find((e) => e.kind === "ip");
    }
    get isCIDR() {
      return !!this._def.checks.find((e) => e.kind === "cidr");
    }
    get isBase64() {
      return !!this._def.checks.find((e) => e.kind === "base64");
    }
    get isBase64url() {
      return !!this._def.checks.find((e) => e.kind === "base64url");
    }
    get minLength() {
      let e = null;
      for (let r of this._def.checks)
        r.kind === "min" && (e === null || r.value > e) && (e = r.value);
      return e;
    }
    get maxLength() {
      let e = null;
      for (let r of this._def.checks)
        r.kind === "max" && (e === null || r.value < e) && (e = r.value);
      return e;
    }
  };
  d.ZodString = J;
  J.create = (t) => {
    var e;
    return new J({
      checks: [],
      typeName: g.ZodString,
      coerce: (e = t?.coerce) !== null && e !== void 0 ? e : !1,
      ...b(t)
    });
  };
  function wa(t, e) {
    let r = (t.toString().split(".")[1] || "").length, n = (e.toString().split(".")[1] || "").length, s = r > n ? r : n, o = parseInt(t.toFixed(
    s).replace(".", "")), a = parseInt(e.toFixed(s).replace(".", ""));
    return o % a / Math.pow(10, s);
  }
  i(wa, "floatSafeRemainder");
  var ee = class t extends v {
    static {
      i(this, "ZodNumber");
    }
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
    }
    _parse(e) {
      if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== h.ZodParsedType.number) {
        let o = this._getOrReturnCtx(e);
        return (0, u.addIssueToContext)(o, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.number,
          received: o.parsedType
        }), u.INVALID;
      }
      let n, s = new u.ParseStatus();
      for (let o of this._def.checks)
        o.kind === "int" ? h.util.isInteger(e.data) || (n = this._getOrReturnCtx(e, n), (0, u.addIssueToContext)(n, {
          code: m.ZodIssueCode.invalid_type,
          expected: "integer",
          received: "float",
          message: o.message
        }), s.dirty()) : o.kind === "min" ? (o.inclusive ? e.data < o.value : e.data <= o.value) && (n = this._getOrReturnCtx(e, n), (0, u.addIssueToContext)(
        n, {
          code: m.ZodIssueCode.too_small,
          minimum: o.value,
          type: "number",
          inclusive: o.inclusive,
          exact: !1,
          message: o.message
        }), s.dirty()) : o.kind === "max" ? (o.inclusive ? e.data > o.value : e.data >= o.value) && (n = this._getOrReturnCtx(e, n), (0, u.addIssueToContext)(
        n, {
          code: m.ZodIssueCode.too_big,
          maximum: o.value,
          type: "number",
          inclusive: o.inclusive,
          exact: !1,
          message: o.message
        }), s.dirty()) : o.kind === "multipleOf" ? wa(e.data, o.value) !== 0 && (n = this._getOrReturnCtx(e, n), (0, u.addIssueToContext)(n,
        {
          code: m.ZodIssueCode.not_multiple_of,
          multipleOf: o.value,
          message: o.message
        }), s.dirty()) : o.kind === "finite" ? Number.isFinite(e.data) || (n = this._getOrReturnCtx(e, n), (0, u.addIssueToContext)(n, {
          code: m.ZodIssueCode.not_finite,
          message: o.message
        }), s.dirty()) : h.util.assertNever(o);
      return { status: s.value, value: e.data };
    }
    gte(e, r) {
      return this.setLimit("min", e, !0, y.errorUtil.toString(r));
    }
    gt(e, r) {
      return this.setLimit("min", e, !1, y.errorUtil.toString(r));
    }
    lte(e, r) {
      return this.setLimit("max", e, !0, y.errorUtil.toString(r));
    }
    lt(e, r) {
      return this.setLimit("max", e, !1, y.errorUtil.toString(r));
    }
    setLimit(e, r, n, s) {
      return new t({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind: e,
            value: r,
            inclusive: n,
            message: y.errorUtil.toString(s)
          }
        ]
      });
    }
    _addCheck(e) {
      return new t({
        ...this._def,
        checks: [...this._def.checks, e]
      });
    }
    int(e) {
      return this._addCheck({
        kind: "int",
        message: y.errorUtil.toString(e)
      });
    }
    positive(e) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !1,
        message: y.errorUtil.toString(e)
      });
    }
    negative(e) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !1,
        message: y.errorUtil.toString(e)
      });
    }
    nonpositive(e) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !0,
        message: y.errorUtil.toString(e)
      });
    }
    nonnegative(e) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !0,
        message: y.errorUtil.toString(e)
      });
    }
    multipleOf(e, r) {
      return this._addCheck({
        kind: "multipleOf",
        value: e,
        message: y.errorUtil.toString(r)
      });
    }
    finite(e) {
      return this._addCheck({
        kind: "finite",
        message: y.errorUtil.toString(e)
      });
    }
    safe(e) {
      return this._addCheck({
        kind: "min",
        inclusive: !0,
        value: Number.MIN_SAFE_INTEGER,
        message: y.errorUtil.toString(e)
      })._addCheck({
        kind: "max",
        inclusive: !0,
        value: Number.MAX_SAFE_INTEGER,
        message: y.errorUtil.toString(e)
      });
    }
    get minValue() {
      let e = null;
      for (let r of this._def.checks)
        r.kind === "min" && (e === null || r.value > e) && (e = r.value);
      return e;
    }
    get maxValue() {
      let e = null;
      for (let r of this._def.checks)
        r.kind === "max" && (e === null || r.value < e) && (e = r.value);
      return e;
    }
    get isInt() {
      return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && h.util.isInteger(e.value));
    }
    get isFinite() {
      let e = null, r = null;
      for (let n of this._def.checks) {
        if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf")
          return !0;
        n.kind === "min" ? (r === null || n.value > r) && (r = n.value) : n.kind === "max" && (e === null || n.value < e) && (e = n.value);
      }
      return Number.isFinite(r) && Number.isFinite(e);
    }
  };
  d.ZodNumber = ee;
  ee.create = (t) => new ee({
    checks: [],
    typeName: g.ZodNumber,
    coerce: t?.coerce || !1,
    ...b(t)
  });
  var te = class t extends v {
    static {
      i(this, "ZodBigInt");
    }
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte;
    }
    _parse(e) {
      if (this._def.coerce)
        try {
          e.data = BigInt(e.data);
        } catch {
          return this._getInvalidInput(e);
        }
      if (this._getType(e) !== h.ZodParsedType.bigint)
        return this._getInvalidInput(e);
      let n, s = new u.ParseStatus();
      for (let o of this._def.checks)
        o.kind === "min" ? (o.inclusive ? e.data < o.value : e.data <= o.value) && (n = this._getOrReturnCtx(e, n), (0, u.addIssueToContext)(
        n, {
          code: m.ZodIssueCode.too_small,
          type: "bigint",
          minimum: o.value,
          inclusive: o.inclusive,
          message: o.message
        }), s.dirty()) : o.kind === "max" ? (o.inclusive ? e.data > o.value : e.data >= o.value) && (n = this._getOrReturnCtx(e, n), (0, u.addIssueToContext)(
        n, {
          code: m.ZodIssueCode.too_big,
          type: "bigint",
          maximum: o.value,
          inclusive: o.inclusive,
          message: o.message
        }), s.dirty()) : o.kind === "multipleOf" ? e.data % o.value !== BigInt(0) && (n = this._getOrReturnCtx(e, n), (0, u.addIssueToContext)(
        n, {
          code: m.ZodIssueCode.not_multiple_of,
          multipleOf: o.value,
          message: o.message
        }), s.dirty()) : h.util.assertNever(o);
      return { status: s.value, value: e.data };
    }
    _getInvalidInput(e) {
      let r = this._getOrReturnCtx(e);
      return (0, u.addIssueToContext)(r, {
        code: m.ZodIssueCode.invalid_type,
        expected: h.ZodParsedType.bigint,
        received: r.parsedType
      }), u.INVALID;
    }
    gte(e, r) {
      return this.setLimit("min", e, !0, y.errorUtil.toString(r));
    }
    gt(e, r) {
      return this.setLimit("min", e, !1, y.errorUtil.toString(r));
    }
    lte(e, r) {
      return this.setLimit("max", e, !0, y.errorUtil.toString(r));
    }
    lt(e, r) {
      return this.setLimit("max", e, !1, y.errorUtil.toString(r));
    }
    setLimit(e, r, n, s) {
      return new t({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind: e,
            value: r,
            inclusive: n,
            message: y.errorUtil.toString(s)
          }
        ]
      });
    }
    _addCheck(e) {
      return new t({
        ...this._def,
        checks: [...this._def.checks, e]
      });
    }
    positive(e) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !1,
        message: y.errorUtil.toString(e)
      });
    }
    negative(e) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !1,
        message: y.errorUtil.toString(e)
      });
    }
    nonpositive(e) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !0,
        message: y.errorUtil.toString(e)
      });
    }
    nonnegative(e) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !0,
        message: y.errorUtil.toString(e)
      });
    }
    multipleOf(e, r) {
      return this._addCheck({
        kind: "multipleOf",
        value: e,
        message: y.errorUtil.toString(r)
      });
    }
    get minValue() {
      let e = null;
      for (let r of this._def.checks)
        r.kind === "min" && (e === null || r.value > e) && (e = r.value);
      return e;
    }
    get maxValue() {
      let e = null;
      for (let r of this._def.checks)
        r.kind === "max" && (e === null || r.value < e) && (e = r.value);
      return e;
    }
  };
  d.ZodBigInt = te;
  te.create = (t) => {
    var e;
    return new te({
      checks: [],
      typeName: g.ZodBigInt,
      coerce: (e = t?.coerce) !== null && e !== void 0 ? e : !1,
      ...b(t)
    });
  };
  var re = class extends v {
    static {
      i(this, "ZodBoolean");
    }
    _parse(e) {
      if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== h.ZodParsedType.boolean) {
        let n = this._getOrReturnCtx(e);
        return (0, u.addIssueToContext)(n, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.boolean,
          received: n.parsedType
        }), u.INVALID;
      }
      return (0, u.OK)(e.data);
    }
  };
  d.ZodBoolean = re;
  re.create = (t) => new re({
    typeName: g.ZodBoolean,
    coerce: t?.coerce || !1,
    ...b(t)
  });
  var ne = class t extends v {
    static {
      i(this, "ZodDate");
    }
    _parse(e) {
      if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== h.ZodParsedType.date) {
        let o = this._getOrReturnCtx(e);
        return (0, u.addIssueToContext)(o, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.date,
          received: o.parsedType
        }), u.INVALID;
      }
      if (isNaN(e.data.getTime())) {
        let o = this._getOrReturnCtx(e);
        return (0, u.addIssueToContext)(o, {
          code: m.ZodIssueCode.invalid_date
        }), u.INVALID;
      }
      let n = new u.ParseStatus(), s;
      for (let o of this._def.checks)
        o.kind === "min" ? e.data.getTime() < o.value && (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          code: m.ZodIssueCode.too_small,
          message: o.message,
          inclusive: !0,
          exact: !1,
          minimum: o.value,
          type: "date"
        }), n.dirty()) : o.kind === "max" ? e.data.getTime() > o.value && (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          code: m.ZodIssueCode.too_big,
          message: o.message,
          inclusive: !0,
          exact: !1,
          maximum: o.value,
          type: "date"
        }), n.dirty()) : h.util.assertNever(o);
      return {
        status: n.value,
        value: new Date(e.data.getTime())
      };
    }
    _addCheck(e) {
      return new t({
        ...this._def,
        checks: [...this._def.checks, e]
      });
    }
    min(e, r) {
      return this._addCheck({
        kind: "min",
        value: e.getTime(),
        message: y.errorUtil.toString(r)
      });
    }
    max(e, r) {
      return this._addCheck({
        kind: "max",
        value: e.getTime(),
        message: y.errorUtil.toString(r)
      });
    }
    get minDate() {
      let e = null;
      for (let r of this._def.checks)
        r.kind === "min" && (e === null || r.value > e) && (e = r.value);
      return e != null ? new Date(e) : null;
    }
    get maxDate() {
      let e = null;
      for (let r of this._def.checks)
        r.kind === "max" && (e === null || r.value < e) && (e = r.value);
      return e != null ? new Date(e) : null;
    }
  };
  d.ZodDate = ne;
  ne.create = (t) => new ne({
    checks: [],
    coerce: t?.coerce || !1,
    typeName: g.ZodDate,
    ...b(t)
  });
  var ve = class extends v {
    static {
      i(this, "ZodSymbol");
    }
    _parse(e) {
      if (this._getType(e) !== h.ZodParsedType.symbol) {
        let n = this._getOrReturnCtx(e);
        return (0, u.addIssueToContext)(n, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.symbol,
          received: n.parsedType
        }), u.INVALID;
      }
      return (0, u.OK)(e.data);
    }
  };
  d.ZodSymbol = ve;
  ve.create = (t) => new ve({
    typeName: g.ZodSymbol,
    ...b(t)
  });
  var se = class extends v {
    static {
      i(this, "ZodUndefined");
    }
    _parse(e) {
      if (this._getType(e) !== h.ZodParsedType.undefined) {
        let n = this._getOrReturnCtx(e);
        return (0, u.addIssueToContext)(n, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.undefined,
          received: n.parsedType
        }), u.INVALID;
      }
      return (0, u.OK)(e.data);
    }
  };
  d.ZodUndefined = se;
  se.create = (t) => new se({
    typeName: g.ZodUndefined,
    ...b(t)
  });
  var oe = class extends v {
    static {
      i(this, "ZodNull");
    }
    _parse(e) {
      if (this._getType(e) !== h.ZodParsedType.null) {
        let n = this._getOrReturnCtx(e);
        return (0, u.addIssueToContext)(n, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.null,
          received: n.parsedType
        }), u.INVALID;
      }
      return (0, u.OK)(e.data);
    }
  };
  d.ZodNull = oe;
  oe.create = (t) => new oe({
    typeName: g.ZodNull,
    ...b(t)
  });
  var Y = class extends v {
    static {
      i(this, "ZodAny");
    }
    constructor() {
      super(...arguments), this._any = !0;
    }
    _parse(e) {
      return (0, u.OK)(e.data);
    }
  };
  d.ZodAny = Y;
  Y.create = (t) => new Y({
    typeName: g.ZodAny,
    ...b(t)
  });
  var W = class extends v {
    static {
      i(this, "ZodUnknown");
    }
    constructor() {
      super(...arguments), this._unknown = !0;
    }
    _parse(e) {
      return (0, u.OK)(e.data);
    }
  };
  d.ZodUnknown = W;
  W.create = (t) => new W({
    typeName: g.ZodUnknown,
    ...b(t)
  });
  var U = class extends v {
    static {
      i(this, "ZodNever");
    }
    _parse(e) {
      let r = this._getOrReturnCtx(e);
      return (0, u.addIssueToContext)(r, {
        code: m.ZodIssueCode.invalid_type,
        expected: h.ZodParsedType.never,
        received: r.parsedType
      }), u.INVALID;
    }
  };
  d.ZodNever = U;
  U.create = (t) => new U({
    typeName: g.ZodNever,
    ...b(t)
  });
  var _e = class extends v {
    static {
      i(this, "ZodVoid");
    }
    _parse(e) {
      if (this._getType(e) !== h.ZodParsedType.undefined) {
        let n = this._getOrReturnCtx(e);
        return (0, u.addIssueToContext)(n, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.void,
          received: n.parsedType
        }), u.INVALID;
      }
      return (0, u.OK)(e.data);
    }
  };
  d.ZodVoid = _e;
  _e.create = (t) => new _e({
    typeName: g.ZodVoid,
    ...b(t)
  });
  var q = class t extends v {
    static {
      i(this, "ZodArray");
    }
    _parse(e) {
      let { ctx: r, status: n } = this._processInputParams(e), s = this._def;
      if (r.parsedType !== h.ZodParsedType.array)
        return (0, u.addIssueToContext)(r, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.array,
          received: r.parsedType
        }), u.INVALID;
      if (s.exactLength !== null) {
        let a = r.data.length > s.exactLength.value, c = r.data.length < s.exactLength.value;
        (a || c) && ((0, u.addIssueToContext)(r, {
          code: a ? m.ZodIssueCode.too_big : m.ZodIssueCode.too_small,
          minimum: c ? s.exactLength.value : void 0,
          maximum: a ? s.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: s.exactLength.message
        }), n.dirty());
      }
      if (s.minLength !== null && r.data.length < s.minLength.value && ((0, u.addIssueToContext)(r, {
        code: m.ZodIssueCode.too_small,
        minimum: s.minLength.value,
        type: "array",
        inclusive: !0,
        exact: !1,
        message: s.minLength.message
      }), n.dirty()), s.maxLength !== null && r.data.length > s.maxLength.value && ((0, u.addIssueToContext)(r, {
        code: m.ZodIssueCode.too_big,
        maximum: s.maxLength.value,
        type: "array",
        inclusive: !0,
        exact: !1,
        message: s.maxLength.message
      }), n.dirty()), r.common.async)
        return Promise.all([...r.data].map((a, c) => s.type._parseAsync(new L(r, a, r.path, c)))).then((a) => u.ParseStatus.mergeArray(n, a));
      let o = [...r.data].map((a, c) => s.type._parseSync(new L(r, a, r.path, c)));
      return u.ParseStatus.mergeArray(n, o);
    }
    get element() {
      return this._def.type;
    }
    min(e, r) {
      return new t({
        ...this._def,
        minLength: { value: e, message: y.errorUtil.toString(r) }
      });
    }
    max(e, r) {
      return new t({
        ...this._def,
        maxLength: { value: e, message: y.errorUtil.toString(r) }
      });
    }
    length(e, r) {
      return new t({
        ...this._def,
        exactLength: { value: e, message: y.errorUtil.toString(r) }
      });
    }
    nonempty(e) {
      return this.min(1, e);
    }
  };
  d.ZodArray = q;
  q.create = (t, e) => new q({
    type: t,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: g.ZodArray,
    ...b(e)
  });
  function be(t) {
    if (t instanceof j) {
      let e = {};
      for (let r in t.shape) {
        let n = t.shape[r];
        e[r] = M.create(be(n));
      }
      return new j({
        ...t._def,
        shape: /* @__PURE__ */ i(() => e, "shape")
      });
    } else return t instanceof q ? new q({
      ...t._def,
      type: be(t.element)
    }) : t instanceof M ? M.create(be(t.unwrap())) : t instanceof F ? F.create(be(t.unwrap())) : t instanceof V ? V.create(t.items.map((e) => be(
    e))) : t;
  }
  i(be, "deepPartialify");
  var j = class t extends v {
    static {
      i(this, "ZodObject");
    }
    constructor() {
      super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
    }
    _getCached() {
      if (this._cached !== null)
        return this._cached;
      let e = this._def.shape(), r = h.util.objectKeys(e);
      return this._cached = { shape: e, keys: r };
    }
    _parse(e) {
      if (this._getType(e) !== h.ZodParsedType.object) {
        let p = this._getOrReturnCtx(e);
        return (0, u.addIssueToContext)(p, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.object,
          received: p.parsedType
        }), u.INVALID;
      }
      let { status: n, ctx: s } = this._processInputParams(e), { shape: o, keys: a } = this._getCached(), c = [];
      if (!(this._def.catchall instanceof U && this._def.unknownKeys === "strip"))
        for (let p in s.data)
          a.includes(p) || c.push(p);
      let l = [];
      for (let p of a) {
        let f = o[p], x = s.data[p];
        l.push({
          key: { status: "valid", value: p },
          value: f._parse(new L(s, x, s.path, p)),
          alwaysSet: p in s.data
        });
      }
      if (this._def.catchall instanceof U) {
        let p = this._def.unknownKeys;
        if (p === "passthrough")
          for (let f of c)
            l.push({
              key: { status: "valid", value: f },
              value: { status: "valid", value: s.data[f] }
            });
        else if (p === "strict")
          c.length > 0 && ((0, u.addIssueToContext)(s, {
            code: m.ZodIssueCode.unrecognized_keys,
            keys: c
          }), n.dirty());
        else if (p !== "strip")
          throw new Error("Internal ZodObject error: invalid unknownKeys value.");
      } else {
        let p = this._def.catchall;
        for (let f of c) {
          let x = s.data[f];
          l.push({
            key: { status: "valid", value: f },
            value: p._parse(
              new L(s, x, s.path, f)
              //, ctx.child(key), value, getParsedType(value)
            ),
            alwaysSet: f in s.data
          });
        }
      }
      return s.common.async ? Promise.resolve().then(async () => {
        let p = [];
        for (let f of l) {
          let x = await f.key, w = await f.value;
          p.push({
            key: x,
            value: w,
            alwaysSet: f.alwaysSet
          });
        }
        return p;
      }).then((p) => u.ParseStatus.mergeObjectSync(n, p)) : u.ParseStatus.mergeObjectSync(n, l);
    }
    get shape() {
      return this._def.shape();
    }
    strict(e) {
      return y.errorUtil.errToObj, new t({
        ...this._def,
        unknownKeys: "strict",
        ...e !== void 0 ? {
          errorMap: /* @__PURE__ */ i((r, n) => {
            var s, o, a, c;
            let l = (a = (o = (s = this._def).errorMap) === null || o === void 0 ? void 0 : o.call(s, r, n).message) !== null && a !== void 0 ?
            a : n.defaultError;
            return r.code === "unrecognized_keys" ? {
              message: (c = y.errorUtil.errToObj(e).message) !== null && c !== void 0 ? c : l
            } : {
              message: l
            };
          }, "errorMap")
        } : {}
      });
    }
    strip() {
      return new t({
        ...this._def,
        unknownKeys: "strip"
      });
    }
    passthrough() {
      return new t({
        ...this._def,
        unknownKeys: "passthrough"
      });
    }
    // const AugmentFactory =
    //   <Def extends ZodObjectDef>(def: Def) =>
    //   <Augmentation extends ZodRawShape>(
    //     augmentation: Augmentation
    //   ): ZodObject<
    //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
    //     Def["unknownKeys"],
    //     Def["catchall"]
    //   > => {
    //     return new ZodObject({
    //       ...def,
    //       shape: () => ({
    //         ...def.shape(),
    //         ...augmentation,
    //       }),
    //     }) as any;
    //   };
    extend(e) {
      return new t({
        ...this._def,
        shape: /* @__PURE__ */ i(() => ({
          ...this._def.shape(),
          ...e
        }), "shape")
      });
    }
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge(e) {
      return new t({
        unknownKeys: e._def.unknownKeys,
        catchall: e._def.catchall,
        shape: /* @__PURE__ */ i(() => ({
          ...this._def.shape(),
          ...e._def.shape()
        }), "shape"),
        typeName: g.ZodObject
      });
    }
    // merge<
    //   Incoming extends AnyZodObject,
    //   Augmentation extends Incoming["shape"],
    //   NewOutput extends {
    //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
    //       ? Augmentation[k]["_output"]
    //       : k extends keyof Output
    //       ? Output[k]
    //       : never;
    //   },
    //   NewInput extends {
    //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
    //       ? Augmentation[k]["_input"]
    //       : k extends keyof Input
    //       ? Input[k]
    //       : never;
    //   }
    // >(
    //   merging: Incoming
    // ): ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"],
    //   NewOutput,
    //   NewInput
    // > {
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    setKey(e, r) {
      return this.augment({ [e]: r });
    }
    // merge<Incoming extends AnyZodObject>(
    //   merging: Incoming
    // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
    // ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"]
    // > {
    //   // const mergedShape = objectUtil.mergeShapes(
    //   //   this._def.shape(),
    //   //   merging._def.shape()
    //   // );
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    catchall(e) {
      return new t({
        ...this._def,
        catchall: e
      });
    }
    pick(e) {
      let r = {};
      return h.util.objectKeys(e).forEach((n) => {
        e[n] && this.shape[n] && (r[n] = this.shape[n]);
      }), new t({
        ...this._def,
        shape: /* @__PURE__ */ i(() => r, "shape")
      });
    }
    omit(e) {
      let r = {};
      return h.util.objectKeys(this.shape).forEach((n) => {
        e[n] || (r[n] = this.shape[n]);
      }), new t({
        ...this._def,
        shape: /* @__PURE__ */ i(() => r, "shape")
      });
    }
    /**
     * @deprecated
     */
    deepPartial() {
      return be(this);
    }
    partial(e) {
      let r = {};
      return h.util.objectKeys(this.shape).forEach((n) => {
        let s = this.shape[n];
        e && !e[n] ? r[n] = s : r[n] = s.optional();
      }), new t({
        ...this._def,
        shape: /* @__PURE__ */ i(() => r, "shape")
      });
    }
    required(e) {
      let r = {};
      return h.util.objectKeys(this.shape).forEach((n) => {
        if (e && !e[n])
          r[n] = this.shape[n];
        else {
          let o = this.shape[n];
          for (; o instanceof M; )
            o = o._def.innerType;
          r[n] = o;
        }
      }), new t({
        ...this._def,
        shape: /* @__PURE__ */ i(() => r, "shape")
      });
    }
    keyof() {
      return Nn(h.util.objectKeys(this.shape));
    }
  };
  d.ZodObject = j;
  j.create = (t, e) => new j({
    shape: /* @__PURE__ */ i(() => t, "shape"),
    unknownKeys: "strip",
    catchall: U.create(),
    typeName: g.ZodObject,
    ...b(e)
  });
  j.strictCreate = (t, e) => new j({
    shape: /* @__PURE__ */ i(() => t, "shape"),
    unknownKeys: "strict",
    catchall: U.create(),
    typeName: g.ZodObject,
    ...b(e)
  });
  j.lazycreate = (t, e) => new j({
    shape: t,
    unknownKeys: "strip",
    catchall: U.create(),
    typeName: g.ZodObject,
    ...b(e)
  });
  var ie = class extends v {
    static {
      i(this, "ZodUnion");
    }
    _parse(e) {
      let { ctx: r } = this._processInputParams(e), n = this._def.options;
      function s(o) {
        for (let c of o)
          if (c.result.status === "valid")
            return c.result;
        for (let c of o)
          if (c.result.status === "dirty")
            return r.common.issues.push(...c.ctx.common.issues), c.result;
        let a = o.map((c) => new m.ZodError(c.ctx.common.issues));
        return (0, u.addIssueToContext)(r, {
          code: m.ZodIssueCode.invalid_union,
          unionErrors: a
        }), u.INVALID;
      }
      if (i(s, "handleResults"), r.common.async)
        return Promise.all(n.map(async (o) => {
          let a = {
            ...r,
            common: {
              ...r.common,
              issues: []
            },
            parent: null
          };
          return {
            result: await o._parseAsync({
              data: r.data,
              path: r.path,
              parent: a
            }),
            ctx: a
          };
        })).then(s);
      {
        let o, a = [];
        for (let l of n) {
          let p = {
            ...r,
            common: {
              ...r.common,
              issues: []
            },
            parent: null
          }, f = l._parseSync({
            data: r.data,
            path: r.path,
            parent: p
          });
          if (f.status === "valid")
            return f;
          f.status === "dirty" && !o && (o = { result: f, ctx: p }), p.common.issues.length && a.push(p.common.issues);
        }
        if (o)
          return r.common.issues.push(...o.ctx.common.issues), o.result;
        let c = a.map((l) => new m.ZodError(l));
        return (0, u.addIssueToContext)(r, {
          code: m.ZodIssueCode.invalid_union,
          unionErrors: c
        }), u.INVALID;
      }
    }
    get options() {
      return this._def.options;
    }
  };
  d.ZodUnion = ie;
  ie.create = (t, e) => new ie({
    options: t,
    typeName: g.ZodUnion,
    ...b(e)
  });
  var B = /* @__PURE__ */ i((t) => t instanceof ce ? B(t.schema) : t instanceof Z ? B(t.innerType()) : t instanceof de ? [t.value] : t instanceof
  ue ? t.options : t instanceof le ? h.util.objectValues(t.enum) : t instanceof pe ? B(t._def.innerType) : t instanceof se ? [void 0] : t instanceof
  oe ? [null] : t instanceof M ? [void 0, ...B(t.unwrap())] : t instanceof F ? [null, ...B(t.unwrap())] : t instanceof Ue || t instanceof me ?
  B(t.unwrap()) : t instanceof fe ? B(t._def.innerType) : [], "getDiscriminator"), ft = class t extends v {
    static {
      i(this, "ZodDiscriminatedUnion");
    }
    _parse(e) {
      let { ctx: r } = this._processInputParams(e);
      if (r.parsedType !== h.ZodParsedType.object)
        return (0, u.addIssueToContext)(r, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.object,
          received: r.parsedType
        }), u.INVALID;
      let n = this.discriminator, s = r.data[n], o = this.optionsMap.get(s);
      return o ? r.common.async ? o._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      }) : o._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      }) : ((0, u.addIssueToContext)(r, {
        code: m.ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [n]
      }), u.INVALID);
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */
    static create(e, r, n) {
      let s = /* @__PURE__ */ new Map();
      for (let o of r) {
        let a = B(o.shape[e]);
        if (!a.length)
          throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
        for (let c of a) {
          if (s.has(c))
            throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(c)}`);
          s.set(c, o);
        }
      }
      return new t({
        typeName: g.ZodDiscriminatedUnion,
        discriminator: e,
        options: r,
        optionsMap: s,
        ...b(n)
      });
    }
  };
  d.ZodDiscriminatedUnion = ft;
  function rr(t, e) {
    let r = (0, h.getParsedType)(t), n = (0, h.getParsedType)(e);
    if (t === e)
      return { valid: !0, data: t };
    if (r === h.ZodParsedType.object && n === h.ZodParsedType.object) {
      let s = h.util.objectKeys(e), o = h.util.objectKeys(t).filter((c) => s.indexOf(c) !== -1), a = { ...t, ...e };
      for (let c of o) {
        let l = rr(t[c], e[c]);
        if (!l.valid)
          return { valid: !1 };
        a[c] = l.data;
      }
      return { valid: !0, data: a };
    } else if (r === h.ZodParsedType.array && n === h.ZodParsedType.array) {
      if (t.length !== e.length)
        return { valid: !1 };
      let s = [];
      for (let o = 0; o < t.length; o++) {
        let a = t[o], c = e[o], l = rr(a, c);
        if (!l.valid)
          return { valid: !1 };
        s.push(l.data);
      }
      return { valid: !0, data: s };
    } else return r === h.ZodParsedType.date && n === h.ZodParsedType.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
  }
  i(rr, "mergeValues");
  var ae = class extends v {
    static {
      i(this, "ZodIntersection");
    }
    _parse(e) {
      let { status: r, ctx: n } = this._processInputParams(e), s = /* @__PURE__ */ i((o, a) => {
        if ((0, u.isAborted)(o) || (0, u.isAborted)(a))
          return u.INVALID;
        let c = rr(o.value, a.value);
        return c.valid ? (((0, u.isDirty)(o) || (0, u.isDirty)(a)) && r.dirty(), { status: r.value, value: c.data }) : ((0, u.addIssueToContext)(
        n, {
          code: m.ZodIssueCode.invalid_intersection_types
        }), u.INVALID);
      }, "handleParsed");
      return n.common.async ? Promise.all([
        this._def.left._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        }),
        this._def.right._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        })
      ]).then(([o, a]) => s(o, a)) : s(this._def.left._parseSync({
        data: n.data,
        path: n.path,
        parent: n
      }), this._def.right._parseSync({
        data: n.data,
        path: n.path,
        parent: n
      }));
    }
  };
  d.ZodIntersection = ae;
  ae.create = (t, e, r) => new ae({
    left: t,
    right: e,
    typeName: g.ZodIntersection,
    ...b(r)
  });
  var V = class t extends v {
    static {
      i(this, "ZodTuple");
    }
    _parse(e) {
      let { status: r, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== h.ZodParsedType.array)
        return (0, u.addIssueToContext)(n, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.array,
          received: n.parsedType
        }), u.INVALID;
      if (n.data.length < this._def.items.length)
        return (0, u.addIssueToContext)(n, {
          code: m.ZodIssueCode.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array"
        }), u.INVALID;
      !this._def.rest && n.data.length > this._def.items.length && ((0, u.addIssueToContext)(n, {
        code: m.ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), r.dirty());
      let o = [...n.data].map((a, c) => {
        let l = this._def.items[c] || this._def.rest;
        return l ? l._parse(new L(n, a, n.path, c)) : null;
      }).filter((a) => !!a);
      return n.common.async ? Promise.all(o).then((a) => u.ParseStatus.mergeArray(r, a)) : u.ParseStatus.mergeArray(r, o);
    }
    get items() {
      return this._def.items;
    }
    rest(e) {
      return new t({
        ...this._def,
        rest: e
      });
    }
  };
  d.ZodTuple = V;
  V.create = (t, e) => {
    if (!Array.isArray(t))
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new V({
      items: t,
      typeName: g.ZodTuple,
      rest: null,
      ...b(e)
    });
  };
  var mt = class t extends v {
    static {
      i(this, "ZodRecord");
    }
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      let { status: r, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== h.ZodParsedType.object)
        return (0, u.addIssueToContext)(n, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.object,
          received: n.parsedType
        }), u.INVALID;
      let s = [], o = this._def.keyType, a = this._def.valueType;
      for (let c in n.data)
        s.push({
          key: o._parse(new L(n, c, n.path, c)),
          value: a._parse(new L(n, n.data[c], n.path, c)),
          alwaysSet: c in n.data
        });
      return n.common.async ? u.ParseStatus.mergeObjectAsync(r, s) : u.ParseStatus.mergeObjectSync(r, s);
    }
    get element() {
      return this._def.valueType;
    }
    static create(e, r, n) {
      return r instanceof v ? new t({
        keyType: e,
        valueType: r,
        typeName: g.ZodRecord,
        ...b(n)
      }) : new t({
        keyType: J.create(),
        valueType: e,
        typeName: g.ZodRecord,
        ...b(r)
      });
    }
  };
  d.ZodRecord = mt;
  var we = class extends v {
    static {
      i(this, "ZodMap");
    }
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e) {
      let { status: r, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== h.ZodParsedType.map)
        return (0, u.addIssueToContext)(n, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.map,
          received: n.parsedType
        }), u.INVALID;
      let s = this._def.keyType, o = this._def.valueType, a = [...n.data.entries()].map(([c, l], p) => ({
        key: s._parse(new L(n, c, n.path, [p, "key"])),
        value: o._parse(new L(n, l, n.path, [p, "value"]))
      }));
      if (n.common.async) {
        let c = /* @__PURE__ */ new Map();
        return Promise.resolve().then(async () => {
          for (let l of a) {
            let p = await l.key, f = await l.value;
            if (p.status === "aborted" || f.status === "aborted")
              return u.INVALID;
            (p.status === "dirty" || f.status === "dirty") && r.dirty(), c.set(p.value, f.value);
          }
          return { status: r.value, value: c };
        });
      } else {
        let c = /* @__PURE__ */ new Map();
        for (let l of a) {
          let p = l.key, f = l.value;
          if (p.status === "aborted" || f.status === "aborted")
            return u.INVALID;
          (p.status === "dirty" || f.status === "dirty") && r.dirty(), c.set(p.value, f.value);
        }
        return { status: r.value, value: c };
      }
    }
  };
  d.ZodMap = we;
  we.create = (t, e, r) => new we({
    valueType: e,
    keyType: t,
    typeName: g.ZodMap,
    ...b(r)
  });
  var ke = class t extends v {
    static {
      i(this, "ZodSet");
    }
    _parse(e) {
      let { status: r, ctx: n } = this._processInputParams(e);
      if (n.parsedType !== h.ZodParsedType.set)
        return (0, u.addIssueToContext)(n, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.set,
          received: n.parsedType
        }), u.INVALID;
      let s = this._def;
      s.minSize !== null && n.data.size < s.minSize.value && ((0, u.addIssueToContext)(n, {
        code: m.ZodIssueCode.too_small,
        minimum: s.minSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: s.minSize.message
      }), r.dirty()), s.maxSize !== null && n.data.size > s.maxSize.value && ((0, u.addIssueToContext)(n, {
        code: m.ZodIssueCode.too_big,
        maximum: s.maxSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: s.maxSize.message
      }), r.dirty());
      let o = this._def.valueType;
      function a(l) {
        let p = /* @__PURE__ */ new Set();
        for (let f of l) {
          if (f.status === "aborted")
            return u.INVALID;
          f.status === "dirty" && r.dirty(), p.add(f.value);
        }
        return { status: r.value, value: p };
      }
      i(a, "finalizeSet");
      let c = [...n.data.values()].map((l, p) => o._parse(new L(n, l, n.path, p)));
      return n.common.async ? Promise.all(c).then((l) => a(l)) : a(c);
    }
    min(e, r) {
      return new t({
        ...this._def,
        minSize: { value: e, message: y.errorUtil.toString(r) }
      });
    }
    max(e, r) {
      return new t({
        ...this._def,
        maxSize: { value: e, message: y.errorUtil.toString(r) }
      });
    }
    size(e, r) {
      return this.min(e, r).max(e, r);
    }
    nonempty(e) {
      return this.min(1, e);
    }
  };
  d.ZodSet = ke;
  ke.create = (t, e) => new ke({
    valueType: t,
    minSize: null,
    maxSize: null,
    typeName: g.ZodSet,
    ...b(e)
  });
  var ht = class t extends v {
    static {
      i(this, "ZodFunction");
    }
    constructor() {
      super(...arguments), this.validate = this.implement;
    }
    _parse(e) {
      let { ctx: r } = this._processInputParams(e);
      if (r.parsedType !== h.ZodParsedType.function)
        return (0, u.addIssueToContext)(r, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.function,
          received: r.parsedType
        }), u.INVALID;
      function n(c, l) {
        return (0, u.makeIssue)({
          data: c,
          path: r.path,
          errorMaps: [
            r.common.contextualErrorMap,
            r.schemaErrorMap,
            (0, lt.getErrorMap)(),
            lt.defaultErrorMap
          ].filter((p) => !!p),
          issueData: {
            code: m.ZodIssueCode.invalid_arguments,
            argumentsError: l
          }
        });
      }
      i(n, "makeArgsIssue");
      function s(c, l) {
        return (0, u.makeIssue)({
          data: c,
          path: r.path,
          errorMaps: [
            r.common.contextualErrorMap,
            r.schemaErrorMap,
            (0, lt.getErrorMap)(),
            lt.defaultErrorMap
          ].filter((p) => !!p),
          issueData: {
            code: m.ZodIssueCode.invalid_return_type,
            returnTypeError: l
          }
        });
      }
      i(s, "makeReturnsIssue");
      let o = { errorMap: r.common.contextualErrorMap }, a = r.data;
      if (this._def.returns instanceof H) {
        let c = this;
        return (0, u.OK)(async function(...l) {
          let p = new m.ZodError([]), f = await c._def.args.parseAsync(l, o).catch((_) => {
            throw p.addIssue(n(l, _)), p;
          }), x = await Reflect.apply(a, this, f);
          return await c._def.returns._def.type.parseAsync(x, o).catch((_) => {
            throw p.addIssue(s(x, _)), p;
          });
        });
      } else {
        let c = this;
        return (0, u.OK)(function(...l) {
          let p = c._def.args.safeParse(l, o);
          if (!p.success)
            throw new m.ZodError([n(l, p.error)]);
          let f = Reflect.apply(a, this, p.data), x = c._def.returns.safeParse(f, o);
          if (!x.success)
            throw new m.ZodError([s(f, x.error)]);
          return x.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...e) {
      return new t({
        ...this._def,
        args: V.create(e).rest(W.create())
      });
    }
    returns(e) {
      return new t({
        ...this._def,
        returns: e
      });
    }
    implement(e) {
      return this.parse(e);
    }
    strictImplement(e) {
      return this.parse(e);
    }
    static create(e, r, n) {
      return new t({
        args: e || V.create([]).rest(W.create()),
        returns: r || W.create(),
        typeName: g.ZodFunction,
        ...b(n)
      });
    }
  };
  d.ZodFunction = ht;
  var ce = class extends v {
    static {
      i(this, "ZodLazy");
    }
    get schema() {
      return this._def.getter();
    }
    _parse(e) {
      let { ctx: r } = this._processInputParams(e);
      return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
    }
  };
  d.ZodLazy = ce;
  ce.create = (t, e) => new ce({
    getter: t,
    typeName: g.ZodLazy,
    ...b(e)
  });
  var de = class extends v {
    static {
      i(this, "ZodLiteral");
    }
    _parse(e) {
      if (e.data !== this._def.value) {
        let r = this._getOrReturnCtx(e);
        return (0, u.addIssueToContext)(r, {
          received: r.data,
          code: m.ZodIssueCode.invalid_literal,
          expected: this._def.value
        }), u.INVALID;
      }
      return { status: "valid", value: e.data };
    }
    get value() {
      return this._def.value;
    }
  };
  d.ZodLiteral = de;
  de.create = (t, e) => new de({
    value: t,
    typeName: g.ZodLiteral,
    ...b(e)
  });
  function Nn(t, e) {
    return new ue({
      values: t,
      typeName: g.ZodEnum,
      ...b(e)
    });
  }
  i(Nn, "createZodEnum");
  var ue = class t extends v {
    static {
      i(this, "ZodEnum");
    }
    constructor() {
      super(...arguments), Le.set(this, void 0);
    }
    _parse(e) {
      if (typeof e.data != "string") {
        let r = this._getOrReturnCtx(e), n = this._def.values;
        return (0, u.addIssueToContext)(r, {
          expected: h.util.joinValues(n),
          received: r.parsedType,
          code: m.ZodIssueCode.invalid_type
        }), u.INVALID;
      }
      if (pt(this, Le, "f") || An(this, Le, new Set(this._def.values), "f"), !pt(this, Le, "f").has(e.data)) {
        let r = this._getOrReturnCtx(e), n = this._def.values;
        return (0, u.addIssueToContext)(r, {
          received: r.data,
          code: m.ZodIssueCode.invalid_enum_value,
          options: n
        }), u.INVALID;
      }
      return (0, u.OK)(e.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      let e = {};
      for (let r of this._def.values)
        e[r] = r;
      return e;
    }
    get Values() {
      let e = {};
      for (let r of this._def.values)
        e[r] = r;
      return e;
    }
    get Enum() {
      let e = {};
      for (let r of this._def.values)
        e[r] = r;
      return e;
    }
    extract(e, r = this._def) {
      return t.create(e, {
        ...this._def,
        ...r
      });
    }
    exclude(e, r = this._def) {
      return t.create(this.options.filter((n) => !e.includes(n)), {
        ...this._def,
        ...r
      });
    }
  };
  d.ZodEnum = ue;
  Le = /* @__PURE__ */ new WeakMap();
  ue.create = Nn;
  var le = class extends v {
    static {
      i(this, "ZodNativeEnum");
    }
    constructor() {
      super(...arguments), De.set(this, void 0);
    }
    _parse(e) {
      let r = h.util.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
      if (n.parsedType !== h.ZodParsedType.string && n.parsedType !== h.ZodParsedType.number) {
        let s = h.util.objectValues(r);
        return (0, u.addIssueToContext)(n, {
          expected: h.util.joinValues(s),
          received: n.parsedType,
          code: m.ZodIssueCode.invalid_type
        }), u.INVALID;
      }
      if (pt(this, De, "f") || An(this, De, new Set(h.util.getValidEnumValues(this._def.values)), "f"), !pt(this, De, "f").has(e.data)) {
        let s = h.util.objectValues(r);
        return (0, u.addIssueToContext)(n, {
          received: n.data,
          code: m.ZodIssueCode.invalid_enum_value,
          options: s
        }), u.INVALID;
      }
      return (0, u.OK)(e.data);
    }
    get enum() {
      return this._def.values;
    }
  };
  d.ZodNativeEnum = le;
  De = /* @__PURE__ */ new WeakMap();
  le.create = (t, e) => new le({
    values: t,
    typeName: g.ZodNativeEnum,
    ...b(e)
  });
  var H = class extends v {
    static {
      i(this, "ZodPromise");
    }
    unwrap() {
      return this._def.type;
    }
    _parse(e) {
      let { ctx: r } = this._processInputParams(e);
      if (r.parsedType !== h.ZodParsedType.promise && r.common.async === !1)
        return (0, u.addIssueToContext)(r, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.promise,
          received: r.parsedType
        }), u.INVALID;
      let n = r.parsedType === h.ZodParsedType.promise ? r.data : Promise.resolve(r.data);
      return (0, u.OK)(n.then((s) => this._def.type.parseAsync(s, {
        path: r.path,
        errorMap: r.common.contextualErrorMap
      })));
    }
  };
  d.ZodPromise = H;
  H.create = (t, e) => new H({
    type: t,
    typeName: g.ZodPromise,
    ...b(e)
  });
  var Z = class extends v {
    static {
      i(this, "ZodEffects");
    }
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === g.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(e) {
      let { status: r, ctx: n } = this._processInputParams(e), s = this._def.effect || null, o = {
        addIssue: /* @__PURE__ */ i((a) => {
          (0, u.addIssueToContext)(n, a), a.fatal ? r.abort() : r.dirty();
        }, "addIssue"),
        get path() {
          return n.path;
        }
      };
      if (o.addIssue = o.addIssue.bind(o), s.type === "preprocess") {
        let a = s.transform(n.data, o);
        if (n.common.async)
          return Promise.resolve(a).then(async (c) => {
            if (r.value === "aborted")
              return u.INVALID;
            let l = await this._def.schema._parseAsync({
              data: c,
              path: n.path,
              parent: n
            });
            return l.status === "aborted" ? u.INVALID : l.status === "dirty" || r.value === "dirty" ? (0, u.DIRTY)(l.value) : l;
          });
        {
          if (r.value === "aborted")
            return u.INVALID;
          let c = this._def.schema._parseSync({
            data: a,
            path: n.path,
            parent: n
          });
          return c.status === "aborted" ? u.INVALID : c.status === "dirty" || r.value === "dirty" ? (0, u.DIRTY)(c.value) : c;
        }
      }
      if (s.type === "refinement") {
        let a = /* @__PURE__ */ i((c) => {
          let l = s.refinement(c, o);
          if (n.common.async)
            return Promise.resolve(l);
          if (l instanceof Promise)
            throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
          return c;
        }, "executeRefinement");
        if (n.common.async === !1) {
          let c = this._def.schema._parseSync({
            data: n.data,
            path: n.path,
            parent: n
          });
          return c.status === "aborted" ? u.INVALID : (c.status === "dirty" && r.dirty(), a(c.value), { status: r.value, value: c.value });
        } else
          return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((c) => c.status === "aborted" ? u.INVALID : (c.
          status === "dirty" && r.dirty(), a(c.value).then(() => ({ status: r.value, value: c.value }))));
      }
      if (s.type === "transform")
        if (n.common.async === !1) {
          let a = this._def.schema._parseSync({
            data: n.data,
            path: n.path,
            parent: n
          });
          if (!(0, u.isValid)(a))
            return a;
          let c = s.transform(a.value, o);
          if (c instanceof Promise)
            throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
          return { status: r.value, value: c };
        } else
          return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((a) => (0, u.isValid)(a) ? Promise.resolve(s.transform(
          a.value, o)).then((c) => ({ status: r.value, value: c })) : a);
      h.util.assertNever(s);
    }
  };
  d.ZodEffects = Z;
  d.ZodTransformer = Z;
  Z.create = (t, e, r) => new Z({
    schema: t,
    typeName: g.ZodEffects,
    effect: e,
    ...b(r)
  });
  Z.createWithPreprocess = (t, e, r) => new Z({
    schema: e,
    effect: { type: "preprocess", transform: t },
    typeName: g.ZodEffects,
    ...b(r)
  });
  var M = class extends v {
    static {
      i(this, "ZodOptional");
    }
    _parse(e) {
      return this._getType(e) === h.ZodParsedType.undefined ? (0, u.OK)(void 0) : this._def.innerType._parse(e);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  d.ZodOptional = M;
  M.create = (t, e) => new M({
    innerType: t,
    typeName: g.ZodOptional,
    ...b(e)
  });
  var F = class extends v {
    static {
      i(this, "ZodNullable");
    }
    _parse(e) {
      return this._getType(e) === h.ZodParsedType.null ? (0, u.OK)(null) : this._def.innerType._parse(e);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  d.ZodNullable = F;
  F.create = (t, e) => new F({
    innerType: t,
    typeName: g.ZodNullable,
    ...b(e)
  });
  var pe = class extends v {
    static {
      i(this, "ZodDefault");
    }
    _parse(e) {
      let { ctx: r } = this._processInputParams(e), n = r.data;
      return r.parsedType === h.ZodParsedType.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
        data: n,
        path: r.path,
        parent: r
      });
    }
    removeDefault() {
      return this._def.innerType;
    }
  };
  d.ZodDefault = pe;
  pe.create = (t, e) => new pe({
    innerType: t,
    typeName: g.ZodDefault,
    defaultValue: typeof e.default == "function" ? e.default : () => e.default,
    ...b(e)
  });
  var fe = class extends v {
    static {
      i(this, "ZodCatch");
    }
    _parse(e) {
      let { ctx: r } = this._processInputParams(e), n = {
        ...r,
        common: {
          ...r.common,
          issues: []
        }
      }, s = this._def.innerType._parse({
        data: n.data,
        path: n.path,
        parent: {
          ...n
        }
      });
      return (0, u.isAsync)(s) ? s.then((o) => ({
        status: "valid",
        value: o.status === "valid" ? o.value : this._def.catchValue({
          get error() {
            return new m.ZodError(n.common.issues);
          },
          input: n.data
        })
      })) : {
        status: "valid",
        value: s.status === "valid" ? s.value : this._def.catchValue({
          get error() {
            return new m.ZodError(n.common.issues);
          },
          input: n.data
        })
      };
    }
    removeCatch() {
      return this._def.innerType;
    }
  };
  d.ZodCatch = fe;
  fe.create = (t, e) => new fe({
    innerType: t,
    typeName: g.ZodCatch,
    catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
    ...b(e)
  });
  var Te = class extends v {
    static {
      i(this, "ZodNaN");
    }
    _parse(e) {
      if (this._getType(e) !== h.ZodParsedType.nan) {
        let n = this._getOrReturnCtx(e);
        return (0, u.addIssueToContext)(n, {
          code: m.ZodIssueCode.invalid_type,
          expected: h.ZodParsedType.nan,
          received: n.parsedType
        }), u.INVALID;
      }
      return { status: "valid", value: e.data };
    }
  };
  d.ZodNaN = Te;
  Te.create = (t) => new Te({
    typeName: g.ZodNaN,
    ...b(t)
  });
  d.BRAND = Symbol("zod_brand");
  var Ue = class extends v {
    static {
      i(this, "ZodBranded");
    }
    _parse(e) {
      let { ctx: r } = this._processInputParams(e), n = r.data;
      return this._def.type._parse({
        data: n,
        path: r.path,
        parent: r
      });
    }
    unwrap() {
      return this._def.type;
    }
  };
  d.ZodBranded = Ue;
  var $e = class t extends v {
    static {
      i(this, "ZodPipeline");
    }
    _parse(e) {
      let { status: r, ctx: n } = this._processInputParams(e);
      if (n.common.async)
        return (/* @__PURE__ */ i(async () => {
          let o = await this._def.in._parseAsync({
            data: n.data,
            path: n.path,
            parent: n
          });
          return o.status === "aborted" ? u.INVALID : o.status === "dirty" ? (r.dirty(), (0, u.DIRTY)(o.value)) : this._def.out._parseAsync(
          {
            data: o.value,
            path: n.path,
            parent: n
          });
        }, "handleAsync"))();
      {
        let s = this._def.in._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return s.status === "aborted" ? u.INVALID : s.status === "dirty" ? (r.dirty(), {
          status: "dirty",
          value: s.value
        }) : this._def.out._parseSync({
          data: s.value,
          path: n.path,
          parent: n
        });
      }
    }
    static create(e, r) {
      return new t({
        in: e,
        out: r,
        typeName: g.ZodPipeline
      });
    }
  };
  d.ZodPipeline = $e;
  var me = class extends v {
    static {
      i(this, "ZodReadonly");
    }
    _parse(e) {
      let r = this._def.innerType._parse(e), n = /* @__PURE__ */ i((s) => ((0, u.isValid)(s) && (s.value = Object.freeze(s.value)), s), "fre\
eze");
      return (0, u.isAsync)(r) ? r.then((s) => n(s)) : n(r);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  d.ZodReadonly = me;
  me.create = (t, e) => new me({
    innerType: t,
    typeName: g.ZodReadonly,
    ...b(e)
  });
  function Pn(t, e) {
    let r = typeof t == "function" ? t(e) : typeof t == "string" ? { message: t } : t;
    return typeof r == "string" ? { message: r } : r;
  }
  i(Pn, "cleanParams");
  function Zn(t, e = {}, r) {
    return t ? Y.create().superRefine((n, s) => {
      var o, a;
      let c = t(n);
      if (c instanceof Promise)
        return c.then((l) => {
          var p, f;
          if (!l) {
            let x = Pn(e, n), w = (f = (p = x.fatal) !== null && p !== void 0 ? p : r) !== null && f !== void 0 ? f : !0;
            s.addIssue({ code: "custom", ...x, fatal: w });
          }
        });
      if (!c) {
        let l = Pn(e, n), p = (a = (o = l.fatal) !== null && o !== void 0 ? o : r) !== null && a !== void 0 ? a : !0;
        s.addIssue({ code: "custom", ...l, fatal: p });
      }
    }) : Y.create();
  }
  i(Zn, "custom");
  d.custom = Zn;
  d.late = {
    object: j.lazycreate
  };
  var g;
  (function(t) {
    t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate =
    "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUn\
known", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion =
    "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap",
    t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects =
    "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefaul\
t", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodRe\
adonly";
  })(g || (d.ZodFirstPartyTypeKind = g = {}));
  var ka = /* @__PURE__ */ i((t, e = {
    message: `Input not instance of ${t.name}`
  }) => Zn((r) => r instanceof t, e), "instanceOfType");
  d.instanceof = ka;
  var Mn = J.create;
  d.string = Mn;
  var Ln = ee.create;
  d.number = Ln;
  var Ta = Te.create;
  d.nan = Ta;
  var Ia = te.create;
  d.bigint = Ia;
  var Dn = re.create;
  d.boolean = Dn;
  var Sa = ne.create;
  d.date = Sa;
  var Ea = ve.create;
  d.symbol = Ea;
  var Ca = se.create;
  d.undefined = Ca;
  var Pa = oe.create;
  d.null = Pa;
  var Aa = Y.create;
  d.any = Aa;
  var Oa = W.create;
  d.unknown = Oa;
  var ja = U.create;
  d.never = ja;
  var Ra = _e.create;
  d.void = Ra;
  var Na = q.create;
  d.array = Na;
  var Za = j.create;
  d.object = Za;
  var Ma = j.strictCreate;
  d.strictObject = Ma;
  var La = ie.create;
  d.union = La;
  var Da = ft.create;
  d.discriminatedUnion = Da;
  var Ua = ae.create;
  d.intersection = Ua;
  var $a = V.create;
  d.tuple = $a;
  var Va = mt.create;
  d.record = Va;
  var Fa = we.create;
  d.map = Fa;
  var Ba = ke.create;
  d.set = Ba;
  var Wa = ht.create;
  d.function = Wa;
  var qa = ce.create;
  d.lazy = qa;
  var Ga = de.create;
  d.literal = Ga;
  var Ka = ue.create;
  d.enum = Ka;
  var za = le.create;
  d.nativeEnum = za;
  var Ja = H.create;
  d.promise = Ja;
  var Un = Z.create;
  d.effect = Un;
  d.transformer = Un;
  var Ya = M.create;
  d.optional = Ya;
  var Ha = F.create;
  d.nullable = Ha;
  var Xa = Z.createWithPreprocess;
  d.preprocess = Xa;
  var Qa = $e.create;
  d.pipeline = Qa;
  var ec = /* @__PURE__ */ i(() => Mn().optional(), "ostring");
  d.ostring = ec;
  var tc = /* @__PURE__ */ i(() => Ln().optional(), "onumber");
  d.onumber = tc;
  var rc = /* @__PURE__ */ i(() => Dn().optional(), "oboolean");
  d.oboolean = rc;
  d.coerce = {
    string: /* @__PURE__ */ i((t) => J.create({ ...t, coerce: !0 }), "string"),
    number: /* @__PURE__ */ i((t) => ee.create({ ...t, coerce: !0 }), "number"),
    boolean: /* @__PURE__ */ i((t) => re.create({
      ...t,
      coerce: !0
    }), "boolean"),
    bigint: /* @__PURE__ */ i((t) => te.create({ ...t, coerce: !0 }), "bigint"),
    date: /* @__PURE__ */ i((t) => ne.create({ ...t, coerce: !0 }), "date")
  };
  d.NEVER = u.INVALID;
});

// ../node_modules/zod/lib/external.js
var nr = I((D) => {
  "use strict";
  var nc = D && D.__createBinding || (Object.create ? function(t, e, r, n) {
    n === void 0 && (n = r);
    var s = Object.getOwnPropertyDescriptor(e, r);
    (!s || ("get" in s ? !e.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return e[r];
    }, "get") }), Object.defineProperty(t, n, s);
  } : function(t, e, r, n) {
    n === void 0 && (n = r), t[n] = e[r];
  }), Ie = D && D.__exportStar || function(t, e) {
    for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && nc(e, t, r);
  };
  Object.defineProperty(D, "__esModule", { value: !0 });
  Ie(dt(), D);
  Ie(er(), D);
  Ie(In(), D);
  Ie(Ze(), D);
  Ie($n(), D);
  Ie(ct(), D);
});

// ../node_modules/zod/lib/index.js
var Bn = I((R) => {
  "use strict";
  var Vn = R && R.__createBinding || (Object.create ? function(t, e, r, n) {
    n === void 0 && (n = r);
    var s = Object.getOwnPropertyDescriptor(e, r);
    (!s || ("get" in s ? !e.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return e[r];
    }, "get") }), Object.defineProperty(t, n, s);
  } : function(t, e, r, n) {
    n === void 0 && (n = r), t[n] = e[r];
  }), sc = R && R.__setModuleDefault || (Object.create ? function(t, e) {
    Object.defineProperty(t, "default", { enumerable: !0, value: e });
  } : function(t, e) {
    t.default = e;
  }), oc = R && R.__importStar || function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (t != null) for (var r in t) r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && Vn(e, t, r);
    return sc(e, t), e;
  }, ic = R && R.__exportStar || function(t, e) {
    for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && Vn(e, t, r);
  };
  Object.defineProperty(R, "__esModule", { value: !0 });
  R.z = void 0;
  var Fn = oc(nr());
  R.z = Fn;
  ic(nr(), R);
  R.default = Fn;
});

// ../node_modules/ts-dedent/dist/index.js
var qn = I((Ve) => {
  "use strict";
  Object.defineProperty(Ve, "__esModule", { value: !0 });
  Ve.dedent = void 0;
  function Wn(t) {
    for (var e = [], r = 1; r < arguments.length; r++)
      e[r - 1] = arguments[r];
    var n = Array.from(typeof t == "string" ? [t] : t);
    n[n.length - 1] = n[n.length - 1].replace(/\r?\n([\t ]*)$/, "");
    var s = n.reduce(function(c, l) {
      var p = l.match(/\n([\t ]+|(?!\s).)/g);
      return p ? c.concat(p.map(function(f) {
        var x, w;
        return (w = (x = f.match(/[\t ]/g)) === null || x === void 0 ? void 0 : x.length) !== null && w !== void 0 ? w : 0;
      })) : c;
    }, []);
    if (s.length) {
      var o = new RegExp(`
[	 ]{` + Math.min.apply(Math, s) + "}", "g");
      n = n.map(function(c) {
        return c.replace(o, `
`);
      });
    }
    n[0] = n[0].replace(/^\r?\n/, "");
    var a = n[0];
    return e.forEach(function(c, l) {
      var p = a.match(/(?:^|\n)( *)$/), f = p ? p[1] : "", x = c;
      typeof c == "string" && c.includes(`
`) && (x = String(c).split(`
`).map(function(w, _) {
        return _ === 0 ? w : "" + f + w;
      }).join(`
`)), a += x + n[l + 1];
    }), a;
  }
  i(Wn, "dedent");
  Ve.dedent = Wn;
  Ve.default = Wn;
});

// ../node_modules/isexe/windows.js
var Qn = I((Ep, Xn) => {
  Xn.exports = Hn;
  Hn.sync = mc;
  var Jn = N("fs");
  function fc(t, e) {
    var r = e.pathExt !== void 0 ? e.pathExt : process.env.PATHEXT;
    if (!r || (r = r.split(";"), r.indexOf("") !== -1))
      return !0;
    for (var n = 0; n < r.length; n++) {
      var s = r[n].toLowerCase();
      if (s && t.substr(-s.length).toLowerCase() === s)
        return !0;
    }
    return !1;
  }
  i(fc, "checkPathExt");
  function Yn(t, e, r) {
    return !t.isSymbolicLink() && !t.isFile() ? !1 : fc(e, r);
  }
  i(Yn, "checkStat");
  function Hn(t, e, r) {
    Jn.stat(t, function(n, s) {
      r(n, n ? !1 : Yn(s, t, e));
    });
  }
  i(Hn, "isexe");
  function mc(t, e) {
    return Yn(Jn.statSync(t), t, e);
  }
  i(mc, "sync");
});

// ../node_modules/isexe/mode.js
var ss = I((Pp, ns) => {
  ns.exports = ts;
  ts.sync = hc;
  var es = N("fs");
  function ts(t, e, r) {
    es.stat(t, function(n, s) {
      r(n, n ? !1 : rs(s, e));
    });
  }
  i(ts, "isexe");
  function hc(t, e) {
    return rs(es.statSync(t), e);
  }
  i(hc, "sync");
  function rs(t, e) {
    return t.isFile() && yc(t, e);
  }
  i(rs, "checkStat");
  function yc(t, e) {
    var r = t.mode, n = t.uid, s = t.gid, o = e.uid !== void 0 ? e.uid : process.getuid && process.getuid(), a = e.gid !== void 0 ? e.gid : process.
    getgid && process.getgid(), c = parseInt("100", 8), l = parseInt("010", 8), p = parseInt("001", 8), f = c | l, x = r & p || r & l && s ===
    a || r & c && n === o || r & f && o === 0;
    return x;
  }
  i(yc, "checkMode");
});

// ../node_modules/isexe/index.js
var is = I((jp, os) => {
  var Op = N("fs"), bt;
  process.platform === "win32" || global.TESTING_WINDOWS ? bt = Qn() : bt = ss();
  os.exports = or;
  or.sync = gc;
  function or(t, e, r) {
    if (typeof e == "function" && (r = e, e = {}), !r) {
      if (typeof Promise != "function")
        throw new TypeError("callback not provided");
      return new Promise(function(n, s) {
        or(t, e || {}, function(o, a) {
          o ? s(o) : n(a);
        });
      });
    }
    bt(t, e || {}, function(n, s) {
      n && (n.code === "EACCES" || e && e.ignoreErrors) && (n = null, s = !1), r(n, s);
    });
  }
  i(or, "isexe");
  function gc(t, e) {
    try {
      return bt.sync(t, e || {});
    } catch (r) {
      if (e && e.ignoreErrors || r.code === "EACCES")
        return !1;
      throw r;
    }
  }
  i(gc, "sync");
});

// ../node_modules/which/which.js
var fs = I((Np, ps) => {
  var Ce = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", as = N("path"), xc = Ce ? ";" :
  ":", cs = is(), ds = /* @__PURE__ */ i((t) => Object.assign(new Error(`not found: ${t}`), { code: "ENOENT" }), "getNotFoundError"), us = /* @__PURE__ */ i(
  (t, e) => {
    let r = e.colon || xc, n = t.match(/\//) || Ce && t.match(/\\/) ? [""] : [
      // windows always checks the cwd first
      ...Ce ? [process.cwd()] : [],
      ...(e.path || process.env.PATH || /* istanbul ignore next: very unusual */
      "").split(r)
    ], s = Ce ? e.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", o = Ce ? s.split(r) : [""];
    return Ce && t.indexOf(".") !== -1 && o[0] !== "" && o.unshift(""), {
      pathEnv: n,
      pathExt: o,
      pathExtExe: s
    };
  }, "getPathInfo"), ls = /* @__PURE__ */ i((t, e, r) => {
    typeof e == "function" && (r = e, e = {}), e || (e = {});
    let { pathEnv: n, pathExt: s, pathExtExe: o } = us(t, e), a = [], c = /* @__PURE__ */ i((p) => new Promise((f, x) => {
      if (p === n.length)
        return e.all && a.length ? f(a) : x(ds(t));
      let w = n[p], _ = /^".*"$/.test(w) ? w.slice(1, -1) : w, C = as.join(_, t), S = !_ && /^\.[\\\/]/.test(t) ? t.slice(0, 2) + C : C;
      f(l(S, p, 0));
    }), "step"), l = /* @__PURE__ */ i((p, f, x) => new Promise((w, _) => {
      if (x === s.length)
        return w(c(f + 1));
      let C = s[x];
      cs(p + C, { pathExt: o }, (S, P) => {
        if (!S && P)
          if (e.all)
            a.push(p + C);
          else
            return w(p + C);
        return w(l(p, f, x + 1));
      });
    }), "subStep");
    return r ? c(0).then((p) => r(null, p), r) : c(0);
  }, "which"), bc = /* @__PURE__ */ i((t, e) => {
    e = e || {};
    let { pathEnv: r, pathExt: n, pathExtExe: s } = us(t, e), o = [];
    for (let a = 0; a < r.length; a++) {
      let c = r[a], l = /^".*"$/.test(c) ? c.slice(1, -1) : c, p = as.join(l, t), f = !l && /^\.[\\\/]/.test(t) ? t.slice(0, 2) + p : p;
      for (let x = 0; x < n.length; x++) {
        let w = f + n[x];
        try {
          if (cs.sync(w, { pathExt: s }))
            if (e.all)
              o.push(w);
            else
              return w;
        } catch {
        }
      }
    }
    if (e.all && o.length)
      return o;
    if (e.nothrow)
      return null;
    throw ds(t);
  }, "whichSync");
  ps.exports = ls;
  ls.sync = bc;
});

// ../node_modules/path-key/index.js
var hs = I((Mp, ir) => {
  "use strict";
  var ms = /* @__PURE__ */ i((t = {}) => {
    let e = t.env || process.env;
    return (t.platform || process.platform) !== "win32" ? "PATH" : Object.keys(e).reverse().find((n) => n.toUpperCase() === "PATH") || "Path";
  }, "pathKey");
  ir.exports = ms;
  ir.exports.default = ms;
});

// ../node_modules/cross-spawn/lib/util/resolveCommand.js
var bs = I((Dp, xs) => {
  "use strict";
  var ys = N("path"), vc = fs(), _c = hs();
  function gs(t, e) {
    let r = t.options.env || process.env, n = process.cwd(), s = t.options.cwd != null, o = s && process.chdir !== void 0 && !process.chdir.
    disabled;
    if (o)
      try {
        process.chdir(t.options.cwd);
      } catch {
      }
    let a;
    try {
      a = vc.sync(t.command, {
        path: r[_c({ env: r })],
        pathExt: e ? ys.delimiter : void 0
      });
    } catch {
    } finally {
      o && process.chdir(n);
    }
    return a && (a = ys.resolve(s ? t.options.cwd : "", a)), a;
  }
  i(gs, "resolveCommandAttempt");
  function wc(t) {
    return gs(t) || gs(t, !0);
  }
  i(wc, "resolveCommand");
  xs.exports = wc;
});

// ../node_modules/cross-spawn/lib/util/escape.js
var vs = I(($p, cr) => {
  "use strict";
  var ar = /([()\][%!^"`<>&|;, *?])/g;
  function kc(t) {
    return t = t.replace(ar, "^$1"), t;
  }
  i(kc, "escapeCommand");
  function Tc(t, e) {
    return t = `${t}`, t = t.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"'), t = t.replace(/(?=(\\+?)?)\1$/, "$1$1"), t = `"${t}"`, t = t.replace(ar,
    "^$1"), e && (t = t.replace(ar, "^$1")), t;
  }
  i(Tc, "escapeArgument");
  cr.exports.command = kc;
  cr.exports.argument = Tc;
});

// ../node_modules/shebang-regex/index.js
var ws = I((Fp, _s) => {
  "use strict";
  _s.exports = /^#!(.*)/;
});

// ../node_modules/shebang-command/index.js
var Ts = I((Bp, ks) => {
  "use strict";
  var Ic = ws();
  ks.exports = (t = "") => {
    let e = t.match(Ic);
    if (!e)
      return null;
    let [r, n] = e[0].replace(/#! ?/, "").split(" "), s = r.split("/").pop();
    return s === "env" ? n : n ? `${s} ${n}` : s;
  };
});

// ../node_modules/cross-spawn/lib/util/readShebang.js
var Ss = I((Wp, Is) => {
  "use strict";
  var dr = N("fs"), Sc = Ts();
  function Ec(t) {
    let r = Buffer.alloc(150), n;
    try {
      n = dr.openSync(t, "r"), dr.readSync(n, r, 0, 150, 0), dr.closeSync(n);
    } catch {
    }
    return Sc(r.toString());
  }
  i(Ec, "readShebang");
  Is.exports = Ec;
});

// ../node_modules/cross-spawn/lib/parse.js
var As = I((Gp, Ps) => {
  "use strict";
  var Cc = N("path"), Es = bs(), Cs = vs(), Pc = Ss(), Ac = process.platform === "win32", Oc = /\.(?:com|exe)$/i, jc = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function Rc(t) {
    t.file = Es(t);
    let e = t.file && Pc(t.file);
    return e ? (t.args.unshift(t.file), t.command = e, Es(t)) : t.file;
  }
  i(Rc, "detectShebang");
  function Nc(t) {
    if (!Ac)
      return t;
    let e = Rc(t), r = !Oc.test(e);
    if (t.options.forceShell || r) {
      let n = jc.test(e);
      t.command = Cc.normalize(t.command), t.command = Cs.command(t.command), t.args = t.args.map((o) => Cs.argument(o, n));
      let s = [t.command].concat(t.args).join(" ");
      t.args = ["/d", "/s", "/c", `"${s}"`], t.command = process.env.comspec || "cmd.exe", t.options.windowsVerbatimArguments = !0;
    }
    return t;
  }
  i(Nc, "parseNonShell");
  function Zc(t, e, r) {
    e && !Array.isArray(e) && (r = e, e = null), e = e ? e.slice(0) : [], r = Object.assign({}, r);
    let n = {
      command: t,
      args: e,
      options: r,
      file: void 0,
      original: {
        command: t,
        args: e
      }
    };
    return r.shell ? n : Nc(n);
  }
  i(Zc, "parse");
  Ps.exports = Zc;
});

// ../node_modules/cross-spawn/lib/enoent.js
var Rs = I((zp, js) => {
  "use strict";
  var ur = process.platform === "win32";
  function lr(t, e) {
    return Object.assign(new Error(`${e} ${t.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${e} ${t.command}`,
      path: t.command,
      spawnargs: t.args
    });
  }
  i(lr, "notFoundError");
  function Mc(t, e) {
    if (!ur)
      return;
    let r = t.emit;
    t.emit = function(n, s) {
      if (n === "exit") {
        let o = Os(s, e);
        if (o)
          return r.call(t, "error", o);
      }
      return r.apply(t, arguments);
    };
  }
  i(Mc, "hookChildProcess");
  function Os(t, e) {
    return ur && t === 1 && !e.file ? lr(e.original, "spawn") : null;
  }
  i(Os, "verifyENOENT");
  function Lc(t, e) {
    return ur && t === 1 && !e.file ? lr(e.original, "spawnSync") : null;
  }
  i(Lc, "verifyENOENTSync");
  js.exports = {
    hookChildProcess: Mc,
    verifyENOENT: Os,
    verifyENOENTSync: Lc,
    notFoundError: lr
  };
});

// ../node_modules/cross-spawn/index.js
var Ms = I((Yp, Pe) => {
  "use strict";
  var Ns = N("child_process"), pr = As(), fr = Rs();
  function Zs(t, e, r) {
    let n = pr(t, e, r), s = Ns.spawn(n.command, n.args, n.options);
    return fr.hookChildProcess(s, n), s;
  }
  i(Zs, "spawn");
  function Dc(t, e, r) {
    let n = pr(t, e, r), s = Ns.spawnSync(n.command, n.args, n.options);
    return s.error = s.error || fr.verifyENOENTSync(s.status, n), s;
  }
  i(Dc, "spawnSync");
  Pe.exports = Zs;
  Pe.exports.spawn = Zs;
  Pe.exports.sync = Dc;
  Pe.exports._parse = pr;
  Pe.exports._enoent = fr;
});

// ../node_modules/merge-stream/index.js
var uo = I((km, co) => {
  "use strict";
  var { PassThrough: Md } = N("stream");
  co.exports = function() {
    var t = [], e = new Md({ objectMode: !0 });
    return e.setMaxListeners(0), e.add = r, e.isEmpty = n, e.on("unpipe", s), Array.prototype.slice.call(arguments).forEach(r), e;
    function r(o) {
      return Array.isArray(o) ? (o.forEach(r), this) : (t.push(o), o.once("end", s.bind(null, o)), o.once("error", e.emit.bind(e, "error")),
      o.pipe(e, { end: !1 }), this);
    }
    i(r, "add");
    function n() {
      return t.length == 0;
    }
    i(n, "isEmpty");
    function s(o) {
      t = t.filter(function(a) {
        return a !== o;
      }), !t.length && e.readable && e.end();
    }
    i(s, "remove");
  };
});

// ../node_modules/slash/index.js
function Ur(t) {
  return t.startsWith("\\\\?\\") ? t : t.replace(/\\/g, "/");
}
var Po = Ci(() => {
  i(Ur, "slash");
});

// ../node_modules/common-path-prefix/index.js
var Mo = I((bh, Zo) => {
  "use strict";
  var { sep: pu } = N("path"), fu = /* @__PURE__ */ i((t) => {
    for (let e of t) {
      let r = /(\/|\\)/.exec(e);
      if (r !== null) return r[0];
    }
    return pu;
  }, "determineSeparator");
  Zo.exports = /* @__PURE__ */ i(function(e, r = fu(e)) {
    let [n = "", ...s] = e;
    if (n === "" || s.length === 0) return "";
    let o = n.split(r), a = o.length;
    for (let l of s) {
      let p = l.split(r);
      for (let f = 0; f < a; f++)
        p[f] !== o[f] && (a = f);
      if (a === 0) return "";
    }
    let c = o.slice(0, a).join(r);
    return c.endsWith(r) ? c : c + r;
  }, "commonPathPrefix");
});

// ../node_modules/fetch-retry/index.js
var li = I((Dx, ui) => {
  "use strict";
  ui.exports = function(t, e) {
    if (e = e || {}, typeof t != "function")
      throw new X("fetch must be a function");
    if (typeof e != "object")
      throw new X("defaults must be an object");
    if (e.retries !== void 0 && !Wt(e.retries))
      throw new X("retries must be a positive integer");
    if (e.retryDelay !== void 0 && !Wt(e.retryDelay) && typeof e.retryDelay != "function")
      throw new X("retryDelay must be a positive integer or a function returning a positive integer");
    if (e.retryOn !== void 0 && !Array.isArray(e.retryOn) && typeof e.retryOn != "function")
      throw new X("retryOn property expects an array or function");
    var r = {
      retries: 3,
      retryDelay: 1e3,
      retryOn: []
    };
    return e = Object.assign(r, e), /* @__PURE__ */ i(function(s, o) {
      var a = e.retries, c = e.retryDelay, l = e.retryOn;
      if (o && o.retries !== void 0)
        if (Wt(o.retries))
          a = o.retries;
        else
          throw new X("retries must be a positive integer");
      if (o && o.retryDelay !== void 0)
        if (Wt(o.retryDelay) || typeof o.retryDelay == "function")
          c = o.retryDelay;
        else
          throw new X("retryDelay must be a positive integer or a function returning a positive integer");
      if (o && o.retryOn)
        if (Array.isArray(o.retryOn) || typeof o.retryOn == "function")
          l = o.retryOn;
        else
          throw new X("retryOn property expects an array or function");
      return new Promise(function(p, f) {
        var x = /* @__PURE__ */ i(function(_) {
          var C = typeof Request < "u" && s instanceof Request ? s.clone() : s;
          t(C, o).then(function(S) {
            if (Array.isArray(l) && l.indexOf(S.status) === -1)
              p(S);
            else if (typeof l == "function")
              try {
                return Promise.resolve(l(_, null, S)).then(function(P) {
                  P ? w(_, null, S) : p(S);
                }).catch(f);
              } catch (P) {
                f(P);
              }
            else
              _ < a ? w(_, null, S) : p(S);
          }).catch(function(S) {
            if (typeof l == "function")
              try {
                Promise.resolve(l(_, S, null)).then(function(P) {
                  P ? w(_, S, null) : f(S);
                }).catch(function(P) {
                  f(P);
                });
              } catch (P) {
                f(P);
              }
            else _ < a ? w(_, S, null) : f(S);
          });
        }, "wrappedFetch");
        function w(_, C, S) {
          var P = typeof c == "function" ? c(_, C, S) : c;
          setTimeout(function() {
            x(++_);
          }, P);
        }
        i(w, "retry"), x(0);
      });
    }, "fetchRetry");
  };
  function Wt(t) {
    return Number.isInteger(t) && t >= 0;
  }
  i(Wt, "isPositiveInteger");
  function X(t) {
    this.name = "ArgumentError", this.message = t;
  }
  i(X, "ArgumentError");
});

// src/telemetry/index.ts
import { logger as wi } from "storybook/internal/node-logger";

// src/telemetry/notify.ts
var un = K(an(), 1);
import { cache as cn } from "storybook/internal/common";
import { CLI_COLORS as Ri, logger as st } from "storybook/internal/node-logger";
var dn = "telemetry-notification-date", ln = /* @__PURE__ */ i(async () => {
  await cn.get(dn, null) || (cn.set(dn, Date.now()), st.log(
    `${Ri.info("Attention:")} Storybook now collects completely anonymous telemetry regarding usage. This information is used to shape Story\
book's roadmap and prioritize features.`
  ), st.log(
    "You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:"
  ), st.log(un.default.cyan("https://storybook.js.org/telemetry")), st.log(""));
}, "notify");

// src/telemetry/sanitize.ts
import mn from "node:path";
function pn(t) {
  return t.replace(/[-[/{}()*+?.\\^$|]/g, "\\$&");
}
i(pn, "regexpEscape");
function fn(t = "") {
  return t.replace(/\u001B\[[0-9;]*m/g, "");
}
i(fn, "removeAnsiEscapeCodes");
function Ne(t, e = mn.sep) {
  if (!t)
    return t;
  let r = process.cwd().split(e);
  for (; r.length > 1; ) {
    let n = r.join(e), s = new RegExp(pn(n), "gi");
    t = t.replace(s, "$SNIP");
    let o = r.join(e + e), a = new RegExp(pn(o), "gi");
    t = t.replace(a, "$SNIP"), r.pop();
  }
  return t;
}
i(Ne, "cleanPaths");
function ot(t, e = mn.sep) {
  try {
    t = {
      ...JSON.parse(JSON.stringify(t)),
      message: fn(t.message),
      stack: fn(t.stack),
      cause: t.cause,
      name: t.name
    };
    let r = Ne(JSON.stringify(t), e);
    return JSON.parse(r);
  } catch (r) {
    return `Sanitization error: ${r?.message}`;
  }
}
i(ot, "sanitizeError");

// src/telemetry/storybook-metadata.ts
import { dirname as nl } from "node:path";
import {
  getStorybookConfiguration as sl,
  getStorybookInfo as ol,
  loadMainConfig as il,
  versions as al
} from "storybook/internal/common";
import { readConfig as cl } from "storybook/internal/csf-tools";

// ../node_modules/fd-package-json/dist/esm/main.js
var gn = K(yn(), 1);
import { resolve as Zi } from "node:path";
import { stat as Mi, readFile as Li } from "node:fs/promises";
import { statSync as ql, readFileSync as Gl } from "node:fs";
async function Di(t) {
  try {
    return (await Mi(t)).isFile();
  } catch {
    return !1;
  }
}
i(Di, "fileExists");
async function Jt(t) {
  for (let e of (0, gn.walkUp)(t)) {
    let r = Zi(e, "package.json");
    if (await Di(r))
      return r;
  }
  return null;
}
i(Jt, "findPackagePath");
async function xn(t) {
  let e = await Jt(t);
  if (!e)
    return null;
  try {
    let r = await Li(e, { encoding: "utf8" });
    return JSON.parse(r);
  } catch {
    return null;
  }
}
i(xn, "findPackage");

// package.json
var at = "9.0.18";

// src/cli/globalSettings.ts
var Ee = K(Bn(), 1);
import sr from "node:fs/promises";
import { homedir as ac } from "node:os";
import { dirname as cc, join as dc } from "node:path";

// src/server-errors.ts
var Kn = K(qn(), 1);

// src/storybook-error.ts
function Gn({
  code: t,
  category: e
}) {
  let r = String(t).padStart(4, "0");
  return `SB_${e}_${r}`;
}
i(Gn, "parseErrorCode");
var yt = class t extends Error {
  constructor(r) {
    super(t.getFullMessage(r));
    /**
     * Data associated with the error. Used to provide additional information in the error message or
     * to be passed to telemetry.
     */
    this.data = {};
    /** Flag used to easily determine if the error originates from Storybook. */
    this.fromStorybook = !0;
    this.category = r.category, this.documentation = r.documentation ?? !1, this.code = r.code;
  }
  static {
    i(this, "StorybookError");
  }
  get fullErrorCode() {
    return Gn({ code: this.code, category: this.category });
  }
  /** Overrides the default `Error.name` property in the format: SB_<CATEGORY>_<CODE>. */
  get name() {
    let r = this.constructor.name;
    return `${this.fullErrorCode} (${r})`;
  }
  /** Generates the error message along with additional documentation link (if applicable). */
  static getFullMessage({
    documentation: r,
    code: n,
    category: s,
    message: o
  }) {
    let a;
    return r === !0 ? a = `https://storybook.js.org/error/${Gn({ code: n, category: s })}` : typeof r == "string" ? a = r : Array.isArray(r) &&
    (a = `
${r.map((c) => `	- ${c}`).join(`
`)}`), `${o}${a != null ? `

More info: ${a}
` : ""}`;
  }
};

// src/server-errors.ts
var gt = class extends yt {
  constructor(r) {
    super({
      category: "CORE-SERVER",
      code: 1,
      message: Kn.dedent`
        Unable to save global settings file to ${r.filePath}
        ${r.error && `Reason: ${r.error}`}`
    });
    this.data = r;
  }
  static {
    i(this, "SavingGlobalSettingsFileError");
  }
};

// src/cli/globalSettings.ts
var uc = dc(ac(), ".storybook", "settings.json"), lc = 1, pc = Ee.z.object({
  version: Ee.z.number(),
  // NOTE: every key (and subkey) below must be optional, for forwards compatibility reasons
  // (we can remove keys once they are deprecated)
  userSince: Ee.z.number().optional(),
  init: Ee.z.object({ skipOnboarding: Ee.z.boolean().optional() }).optional()
}), Se;
async function zn(t = uc) {
  if (Se)
    return Se;
  try {
    let e = await sr.readFile(t, "utf8"), r = pc.parse(JSON.parse(e));
    Se = new xt(t, r);
  } catch {
    Se = new xt(t, { version: lc, userSince: Date.now() }), await Se.save();
  }
  return Se;
}
i(zn, "globalSettings");
var xt = class {
  static {
    i(this, "Settings");
  }
  /**
   * Create a new Settings instance
   *
   * @param filePath Path to the JSON settings file
   * @param value Loaded value of settings
   */
  constructor(e, r) {
    this.filePath = e, this.value = r;
  }
  /** Save settings to the file */
  async save() {
    try {
      await sr.mkdir(cc(this.filePath), { recursive: !0 }), await sr.writeFile(this.filePath, JSON.stringify(this.value, null, 2));
    } catch (e) {
      throw new gt({
        filePath: this.filePath,
        error: e
      });
    }
  }
};

// src/telemetry/get-application-file-count.ts
import { sep as Du } from "node:path";

// src/telemetry/exec-command-count-lines.ts
import { createInterface as ou } from "node:readline";

// node_modules/execa/index.js
var Io = K(Ms(), 1);
import { Buffer as Qd } from "node:buffer";
import eu from "node:path";
import Dr from "node:child_process";
import Rt from "node:process";

// ../node_modules/strip-final-newline/index.js
function mr(t) {
  let e = typeof t == "string" ? `
` : 10, r = typeof t == "string" ? "\r" : 13;
  return t[t.length - 1] === e && (t = t.slice(0, -1)), t[t.length - 1] === r && (t = t.slice(0, -1)), t;
}
i(mr, "stripFinalNewline");

// node_modules/npm-run-path/index.js
import _t from "node:process";
import Fe from "node:path";
import { fileURLToPath as Ls } from "node:url";

// node_modules/path-key/index.js
function vt(t = {}) {
  let {
    env: e = process.env,
    platform: r = process.platform
  } = t;
  return r !== "win32" ? "PATH" : Object.keys(e).reverse().find((n) => n.toUpperCase() === "PATH") || "Path";
}
i(vt, "pathKey");

// node_modules/npm-run-path/index.js
var Uc = /* @__PURE__ */ i(({
  cwd: t = _t.cwd(),
  path: e = _t.env[vt()],
  preferLocal: r = !0,
  execPath: n = _t.execPath,
  addExecPath: s = !0
} = {}) => {
  let o = t instanceof URL ? Ls(t) : t, a = Fe.resolve(o), c = [];
  return r && $c(c, a), s && Vc(c, n, a), [...c, e].join(Fe.delimiter);
}, "npmRunPath"), $c = /* @__PURE__ */ i((t, e) => {
  let r;
  for (; r !== e; )
    t.push(Fe.join(e, "node_modules/.bin")), r = e, e = Fe.resolve(e, "..");
}, "applyPreferLocal"), Vc = /* @__PURE__ */ i((t, e, r) => {
  let n = e instanceof URL ? Ls(e) : e;
  t.push(Fe.resolve(r, n, ".."));
}, "applyExecPath"), Ds = /* @__PURE__ */ i(({ env: t = _t.env, ...e } = {}) => {
  t = { ...t };
  let r = vt({ env: t });
  return e.path = t[r], t[r] = Uc(e), t;
}, "npmRunPathEnv");

// node_modules/mimic-fn/index.js
var Fc = /* @__PURE__ */ i((t, e, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  let s = Object.getOwnPropertyDescriptor(t, r), o = Object.getOwnPropertyDescriptor(e, r);
  !Bc(s, o) && n || Object.defineProperty(t, r, o);
}, "copyProperty"), Bc = /* @__PURE__ */ i(function(t, e) {
  return t === void 0 || t.configurable || t.writable === e.writable && t.enumerable === e.enumerable && t.configurable === e.configurable &&
  (t.writable || t.value === e.value);
}, "canCopyProperty"), Wc = /* @__PURE__ */ i((t, e) => {
  let r = Object.getPrototypeOf(e);
  r !== Object.getPrototypeOf(t) && Object.setPrototypeOf(t, r);
}, "changePrototype"), qc = /* @__PURE__ */ i((t, e) => `/* Wrapped ${t}*/
${e}`, "wrappedToString"), Gc = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), Kc = Object.getOwnPropertyDescriptor(Function.
prototype.toString, "name"), zc = /* @__PURE__ */ i((t, e, r) => {
  let n = r === "" ? "" : `with ${r.trim()}() `, s = qc.bind(null, n, e.toString());
  Object.defineProperty(s, "name", Kc), Object.defineProperty(t, "toString", { ...Gc, value: s });
}, "changeToString");
function hr(t, e, { ignoreNonConfigurable: r = !1 } = {}) {
  let { name: n } = t;
  for (let s of Reflect.ownKeys(e))
    Fc(t, e, s, r);
  return Wc(t, e), zc(t, e, n), t;
}
i(hr, "mimicFunction");

// node_modules/onetime/index.js
var wt = /* @__PURE__ */ new WeakMap(), Us = /* @__PURE__ */ i((t, e = {}) => {
  if (typeof t != "function")
    throw new TypeError("Expected a function");
  let r, n = 0, s = t.displayName || t.name || "<anonymous>", o = /* @__PURE__ */ i(function(...a) {
    if (wt.set(o, ++n), n === 1)
      r = t.apply(this, a), t = null;
    else if (e.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  }, "onetime");
  return hr(o, t), wt.set(o, n), o;
}, "onetime");
Us.callCount = (t) => {
  if (!wt.has(t))
    throw new Error(`The given function \`${t.name}\` is not wrapped by the \`onetime\` package`);
  return wt.get(t);
};
var $s = Us;

// node_modules/execa/lib/error.js
import sd from "node:process";

// node_modules/human-signals/build/src/main.js
import { constants as Xc } from "node:os";

// node_modules/human-signals/build/src/realtime.js
var Vs = /* @__PURE__ */ i(() => {
  let t = yr - Fs + 1;
  return Array.from({ length: t }, Jc);
}, "getRealtimeSignals"), Jc = /* @__PURE__ */ i((t, e) => ({
  name: `SIGRT${e + 1}`,
  number: Fs + e,
  action: "terminate",
  description: "Application-specific signal (realtime)",
  standard: "posix"
}), "getRealtimeSignal"), Fs = 34, yr = 64;

// node_modules/human-signals/build/src/signals.js
import { constants as Yc } from "node:os";

// node_modules/human-signals/build/src/core.js
var Bs = [
  {
    name: "SIGHUP",
    number: 1,
    action: "terminate",
    description: "Terminal closed",
    standard: "posix"
  },
  {
    name: "SIGINT",
    number: 2,
    action: "terminate",
    description: "User interruption with CTRL-C",
    standard: "ansi"
  },
  {
    name: "SIGQUIT",
    number: 3,
    action: "core",
    description: "User interruption with CTRL-\\",
    standard: "posix"
  },
  {
    name: "SIGILL",
    number: 4,
    action: "core",
    description: "Invalid machine instruction",
    standard: "ansi"
  },
  {
    name: "SIGTRAP",
    number: 5,
    action: "core",
    description: "Debugger breakpoint",
    standard: "posix"
  },
  {
    name: "SIGABRT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "ansi"
  },
  {
    name: "SIGIOT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "bsd"
  },
  {
    name: "SIGBUS",
    number: 7,
    action: "core",
    description: "Bus error due to misaligned, non-existing address or paging error",
    standard: "bsd"
  },
  {
    name: "SIGEMT",
    number: 7,
    action: "terminate",
    description: "Command should be emulated but is not implemented",
    standard: "other"
  },
  {
    name: "SIGFPE",
    number: 8,
    action: "core",
    description: "Floating point arithmetic error",
    standard: "ansi"
  },
  {
    name: "SIGKILL",
    number: 9,
    action: "terminate",
    description: "Forced termination",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGUSR1",
    number: 10,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGSEGV",
    number: 11,
    action: "core",
    description: "Segmentation fault",
    standard: "ansi"
  },
  {
    name: "SIGUSR2",
    number: 12,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGPIPE",
    number: 13,
    action: "terminate",
    description: "Broken pipe or socket",
    standard: "posix"
  },
  {
    name: "SIGALRM",
    number: 14,
    action: "terminate",
    description: "Timeout or timer",
    standard: "posix"
  },
  {
    name: "SIGTERM",
    number: 15,
    action: "terminate",
    description: "Termination",
    standard: "ansi"
  },
  {
    name: "SIGSTKFLT",
    number: 16,
    action: "terminate",
    description: "Stack is empty or overflowed",
    standard: "other"
  },
  {
    name: "SIGCHLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "posix"
  },
  {
    name: "SIGCLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "other"
  },
  {
    name: "SIGCONT",
    number: 18,
    action: "unpause",
    description: "Unpaused",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGSTOP",
    number: 19,
    action: "pause",
    description: "Paused",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGTSTP",
    number: 20,
    action: "pause",
    description: 'Paused using CTRL-Z or "suspend"',
    standard: "posix"
  },
  {
    name: "SIGTTIN",
    number: 21,
    action: "pause",
    description: "Background process cannot read terminal input",
    standard: "posix"
  },
  {
    name: "SIGBREAK",
    number: 21,
    action: "terminate",
    description: "User interruption with CTRL-BREAK",
    standard: "other"
  },
  {
    name: "SIGTTOU",
    number: 22,
    action: "pause",
    description: "Background process cannot write to terminal output",
    standard: "posix"
  },
  {
    name: "SIGURG",
    number: 23,
    action: "ignore",
    description: "Socket received out-of-band data",
    standard: "bsd"
  },
  {
    name: "SIGXCPU",
    number: 24,
    action: "core",
    description: "Process timed out",
    standard: "bsd"
  },
  {
    name: "SIGXFSZ",
    number: 25,
    action: "core",
    description: "File too big",
    standard: "bsd"
  },
  {
    name: "SIGVTALRM",
    number: 26,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGPROF",
    number: 27,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGWINCH",
    number: 28,
    action: "ignore",
    description: "Terminal window size changed",
    standard: "bsd"
  },
  {
    name: "SIGIO",
    number: 29,
    action: "terminate",
    description: "I/O is available",
    standard: "other"
  },
  {
    name: "SIGPOLL",
    number: 29,
    action: "terminate",
    description: "Watched event",
    standard: "other"
  },
  {
    name: "SIGINFO",
    number: 29,
    action: "ignore",
    description: "Request for process information",
    standard: "other"
  },
  {
    name: "SIGPWR",
    number: 30,
    action: "terminate",
    description: "Device running out of power",
    standard: "systemv"
  },
  {
    name: "SIGSYS",
    number: 31,
    action: "core",
    description: "Invalid system call",
    standard: "other"
  },
  {
    name: "SIGUNUSED",
    number: 31,
    action: "terminate",
    description: "Invalid system call",
    standard: "other"
  }
];

// node_modules/human-signals/build/src/signals.js
var gr = /* @__PURE__ */ i(() => {
  let t = Vs();
  return [...Bs, ...t].map(Hc);
}, "getSignals"), Hc = /* @__PURE__ */ i(({
  name: t,
  number: e,
  description: r,
  action: n,
  forced: s = !1,
  standard: o
}) => {
  let {
    signals: { [t]: a }
  } = Yc, c = a !== void 0;
  return { name: t, number: c ? a : e, description: r, supported: c, action: n, forced: s, standard: o };
}, "normalizeSignal");

// node_modules/human-signals/build/src/main.js
var Qc = /* @__PURE__ */ i(() => {
  let t = gr();
  return Object.fromEntries(t.map(ed));
}, "getSignalsByName"), ed = /* @__PURE__ */ i(({
  name: t,
  number: e,
  description: r,
  supported: n,
  action: s,
  forced: o,
  standard: a
}) => [t, { name: t, number: e, description: r, supported: n, action: s, forced: o, standard: a }], "getSignalByName"), Ws = Qc(), td = /* @__PURE__ */ i(
() => {
  let t = gr(), e = yr + 1, r = Array.from(
    { length: e },
    (n, s) => rd(s, t)
  );
  return Object.assign({}, ...r);
}, "getSignalsByNumber"), rd = /* @__PURE__ */ i((t, e) => {
  let r = nd(t, e);
  if (r === void 0)
    return {};
  let { name: n, description: s, supported: o, action: a, forced: c, standard: l } = r;
  return {
    [t]: {
      name: n,
      number: t,
      description: s,
      supported: o,
      action: a,
      forced: c,
      standard: l
    }
  };
}, "getSignalByNumber"), nd = /* @__PURE__ */ i((t, e) => {
  let r = e.find(({ name: n }) => Xc.signals[n] === t);
  return r !== void 0 ? r : e.find((n) => n.number === t);
}, "findSignalByNumber"), If = td();

// node_modules/execa/lib/error.js
var od = /* @__PURE__ */ i(({ timedOut: t, timeout: e, errorCode: r, signal: n, signalDescription: s, exitCode: o, isCanceled: a }) => t ? `\
timed out after ${e} milliseconds` : a ? "was canceled" : r !== void 0 ? `failed with ${r}` : n !== void 0 ? `was killed with ${n} (${s})` :
o !== void 0 ? `failed with exit code ${o}` : "failed", "getErrorPrefix"), Be = /* @__PURE__ */ i(({
  stdout: t,
  stderr: e,
  all: r,
  error: n,
  signal: s,
  exitCode: o,
  command: a,
  escapedCommand: c,
  timedOut: l,
  isCanceled: p,
  killed: f,
  parsed: { options: { timeout: x, cwd: w = sd.cwd() } }
}) => {
  o = o === null ? void 0 : o, s = s === null ? void 0 : s;
  let _ = s === void 0 ? void 0 : Ws[s].description, C = n && n.code, P = `Command ${od({ timedOut: l, timeout: x, errorCode: C, signal: s, signalDescription: _,
  exitCode: o, isCanceled: p })}: ${a}`, G = Object.prototype.toString.call(n) === "[object Error]", je = G ? `${P}
${n.message}` : P, xe = [je, e, t].filter(Boolean).join(`
`);
  return G ? (n.originalMessage = n.message, n.message = xe) : n = new Error(xe), n.shortMessage = je, n.command = a, n.escapedCommand = c, n.
  exitCode = o, n.signal = s, n.signalDescription = _, n.stdout = t, n.stderr = e, n.cwd = w, r !== void 0 && (n.all = r), "bufferedData" in
  n && delete n.bufferedData, n.failed = !0, n.timedOut = !!l, n.isCanceled = p, n.killed = f && !l, n;
}, "makeError");

// node_modules/execa/lib/stdio.js
var kt = ["stdin", "stdout", "stderr"], id = /* @__PURE__ */ i((t) => kt.some((e) => t[e] !== void 0), "hasAlias"), qs = /* @__PURE__ */ i((t) => {
  if (!t)
    return;
  let { stdio: e } = t;
  if (e === void 0)
    return kt.map((n) => t[n]);
  if (id(t))
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${kt.map((n) => `\`${n}\``).join(", ")}`);
  if (typeof e == "string")
    return e;
  if (!Array.isArray(e))
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof e}\``);
  let r = Math.max(e.length, kt.length);
  return Array.from({ length: r }, (n, s) => e[s]);
}, "normalizeStdio");

// node_modules/execa/lib/kill.js
import dd from "node:os";

// node_modules/signal-exit/dist/mjs/signals.js
var he = [];
he.push("SIGHUP", "SIGINT", "SIGTERM");
process.platform !== "win32" && he.push(
  "SIGALRM",
  "SIGABRT",
  "SIGVTALRM",
  "SIGXCPU",
  "SIGXFSZ",
  "SIGUSR2",
  "SIGTRAP",
  "SIGSYS",
  "SIGQUIT",
  "SIGIOT"
  // should detect profiler and enable/disable accordingly.
  // see #21
  // 'SIGPROF'
);
process.platform === "linux" && he.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");

// node_modules/signal-exit/dist/mjs/index.js
var Tt = /* @__PURE__ */ i((t) => !!t && typeof t == "object" && typeof t.removeListener == "function" && typeof t.emit == "function" && typeof t.
reallyExit == "function" && typeof t.listeners == "function" && typeof t.kill == "function" && typeof t.pid == "number" && typeof t.on == "f\
unction", "processOk"), xr = Symbol.for("signal-exit emitter"), br = globalThis, ad = Object.defineProperty.bind(Object), vr = class {
  static {
    i(this, "Emitter");
  }
  emitted = {
    afterExit: !1,
    exit: !1
  };
  listeners = {
    afterExit: [],
    exit: []
  };
  count = 0;
  id = Math.random();
  constructor() {
    if (br[xr])
      return br[xr];
    ad(br, xr, {
      value: this,
      writable: !1,
      enumerable: !1,
      configurable: !1
    });
  }
  on(e, r) {
    this.listeners[e].push(r);
  }
  removeListener(e, r) {
    let n = this.listeners[e], s = n.indexOf(r);
    s !== -1 && (s === 0 && n.length === 1 ? n.length = 0 : n.splice(s, 1));
  }
  emit(e, r, n) {
    if (this.emitted[e])
      return !1;
    this.emitted[e] = !0;
    let s = !1;
    for (let o of this.listeners[e])
      s = o(r, n) === !0 || s;
    return e === "exit" && (s = this.emit("afterExit", r, n) || s), s;
  }
}, It = class {
  static {
    i(this, "SignalExitBase");
  }
}, cd = /* @__PURE__ */ i((t) => ({
  onExit(e, r) {
    return t.onExit(e, r);
  },
  load() {
    return t.load();
  },
  unload() {
    return t.unload();
  }
}), "signalExitWrap"), _r = class extends It {
  static {
    i(this, "SignalExitFallback");
  }
  onExit() {
    return () => {
    };
  }
  load() {
  }
  unload() {
  }
}, wr = class extends It {
  static {
    i(this, "SignalExit");
  }
  // "SIGHUP" throws an `ENOSYS` error on Windows,
  // so use a supported signal instead
  /* c8 ignore start */
  #i = kr.platform === "win32" ? "SIGINT" : "SIGHUP";
  /* c8 ignore stop */
  #t = new vr();
  #e;
  #s;
  #o;
  #n = {};
  #r = !1;
  constructor(e) {
    super(), this.#e = e, this.#n = {};
    for (let r of he)
      this.#n[r] = () => {
        let n = this.#e.listeners(r), { count: s } = this.#t, o = e;
        if (typeof o.__signal_exit_emitter__ == "object" && typeof o.__signal_exit_emitter__.count == "number" && (s += o.__signal_exit_emitter__.
        count), n.length === s) {
          this.unload();
          let a = this.#t.emit("exit", null, r), c = r === "SIGHUP" ? this.#i : r;
          a || e.kill(e.pid, c);
        }
      };
    this.#o = e.reallyExit, this.#s = e.emit;
  }
  onExit(e, r) {
    if (!Tt(this.#e))
      return () => {
      };
    this.#r === !1 && this.load();
    let n = r?.alwaysLast ? "afterExit" : "exit";
    return this.#t.on(n, e), () => {
      this.#t.removeListener(n, e), this.#t.listeners.exit.length === 0 && this.#t.listeners.afterExit.length === 0 && this.unload();
    };
  }
  load() {
    if (!this.#r) {
      this.#r = !0, this.#t.count += 1;
      for (let e of he)
        try {
          let r = this.#n[e];
          r && this.#e.on(e, r);
        } catch {
        }
      this.#e.emit = (e, ...r) => this.#c(e, ...r), this.#e.reallyExit = (e) => this.#a(e);
    }
  }
  unload() {
    this.#r && (this.#r = !1, he.forEach((e) => {
      let r = this.#n[e];
      if (!r)
        throw new Error("Listener not defined for signal: " + e);
      try {
        this.#e.removeListener(e, r);
      } catch {
      }
    }), this.#e.emit = this.#s, this.#e.reallyExit = this.#o, this.#t.count -= 1);
  }
  #a(e) {
    return Tt(this.#e) ? (this.#e.exitCode = e || 0, this.#t.emit("exit", this.#e.exitCode, null), this.#o.call(this.#e, this.#e.exitCode)) :
    0;
  }
  #c(e, ...r) {
    let n = this.#s;
    if (e === "exit" && Tt(this.#e)) {
      typeof r[0] == "number" && (this.#e.exitCode = r[0]);
      let s = n.call(this.#e, e, ...r);
      return this.#t.emit("exit", this.#e.exitCode, null), s;
    } else
      return n.call(this.#e, e, ...r);
  }
}, kr = globalThis.process, {
  /**
   * Called when the process is exiting, whether via signal, explicit
   * exit, or running out of stuff to do.
   *
   * If the global process object is not suitable for instrumentation,
   * then this will be a no-op.
   *
   * Returns a function that may be used to unload signal-exit.
   */
  onExit: Gs,
  /**
   * Load the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  load: Mf,
  /**
   * Unload the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  unload: Lf
} = cd(Tt(kr) ? new wr(kr) : new _r());

// node_modules/execa/lib/kill.js
var ud = 1e3 * 5, Ks = /* @__PURE__ */ i((t, e = "SIGTERM", r = {}) => {
  let n = t(e);
  return ld(t, e, r, n), n;
}, "spawnedKill"), ld = /* @__PURE__ */ i((t, e, r, n) => {
  if (!pd(e, r, n))
    return;
  let s = md(r), o = setTimeout(() => {
    t("SIGKILL");
  }, s);
  o.unref && o.unref();
}, "setKillTimeout"), pd = /* @__PURE__ */ i((t, { forceKillAfterTimeout: e }, r) => fd(t) && e !== !1 && r, "shouldForceKill"), fd = /* @__PURE__ */ i(
(t) => t === dd.constants.signals.SIGTERM || typeof t == "string" && t.toUpperCase() === "SIGTERM", "isSigterm"), md = /* @__PURE__ */ i(({ forceKillAfterTimeout: t = !0 }) => {
  if (t === !0)
    return ud;
  if (!Number.isFinite(t) || t < 0)
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${t}\` (${typeof t})`);
  return t;
}, "getForceKillAfterTimeout"), zs = /* @__PURE__ */ i((t, e) => {
  t.kill() && (e.isCanceled = !0);
}, "spawnedCancel"), hd = /* @__PURE__ */ i((t, e, r) => {
  t.kill(e), r(Object.assign(new Error("Timed out"), { timedOut: !0, signal: e }));
}, "timeoutKill"), Js = /* @__PURE__ */ i((t, { timeout: e, killSignal: r = "SIGTERM" }, n) => {
  if (e === 0 || e === void 0)
    return n;
  let s, o = new Promise((c, l) => {
    s = setTimeout(() => {
      hd(t, r, l);
    }, e);
  }), a = n.finally(() => {
    clearTimeout(s);
  });
  return Promise.race([o, a]);
}, "setupTimeout"), Ys = /* @__PURE__ */ i(({ timeout: t }) => {
  if (t !== void 0 && (!Number.isFinite(t) || t < 0))
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${t}\` (${typeof t})`);
}, "validateTimeout"), Hs = /* @__PURE__ */ i(async (t, { cleanup: e, detached: r }, n) => {
  if (!e || r)
    return n;
  let s = Gs(() => {
    t.kill();
  });
  return n.finally(() => {
    s();
  });
}, "setExitHandler");

// node_modules/execa/lib/pipe.js
import { createWriteStream as yd } from "node:fs";
import { ChildProcess as gd } from "node:child_process";

// node_modules/is-stream/index.js
function St(t) {
  return t !== null && typeof t == "object" && typeof t.pipe == "function";
}
i(St, "isStream");
function Tr(t) {
  return St(t) && t.writable !== !1 && typeof t._write == "function" && typeof t._writableState == "object";
}
i(Tr, "isWritableStream");

// node_modules/execa/lib/pipe.js
var xd = /* @__PURE__ */ i((t) => t instanceof gd && typeof t.then == "function", "isExecaChildProcess"), Ir = /* @__PURE__ */ i((t, e, r) => {
  if (typeof r == "string")
    return t[e].pipe(yd(r)), t;
  if (Tr(r))
    return t[e].pipe(r), t;
  if (!xd(r))
    throw new TypeError("The second argument must be a string, a stream or an Execa child process.");
  if (!Tr(r.stdin))
    throw new TypeError("The target child process's stdin must be available.");
  return t[e].pipe(r.stdin), r;
}, "pipeToTarget"), Xs = /* @__PURE__ */ i((t) => {
  t.stdout !== null && (t.pipeStdout = Ir.bind(void 0, t, "stdout")), t.stderr !== null && (t.pipeStderr = Ir.bind(void 0, t, "stderr")), t.
  all !== void 0 && (t.pipeAll = Ir.bind(void 0, t, "all"));
}, "addPipeMethods");

// node_modules/execa/lib/stream.js
import { createReadStream as Ld, readFileSync as Dd } from "node:fs";
import { setTimeout as Ud } from "node:timers/promises";

// node_modules/get-stream/source/contents.js
var We = /* @__PURE__ */ i(async (t, { init: e, convertChunk: r, getSize: n, truncateChunk: s, addChunk: o, getFinalChunk: a, finalize: c }, {
maxBuffer: l = Number.POSITIVE_INFINITY } = {}) => {
  if (!vd(t))
    throw new Error("The first argument must be a Readable, a ReadableStream, or an async iterable.");
  let p = e();
  p.length = 0;
  try {
    for await (let f of t) {
      let x = _d(f), w = r[x](f, p);
      to({ convertedChunk: w, state: p, getSize: n, truncateChunk: s, addChunk: o, maxBuffer: l });
    }
    return bd({ state: p, convertChunk: r, getSize: n, truncateChunk: s, addChunk: o, getFinalChunk: a, maxBuffer: l }), c(p);
  } catch (f) {
    throw f.bufferedData = c(p), f;
  }
}, "getStreamContents"), bd = /* @__PURE__ */ i(({ state: t, getSize: e, truncateChunk: r, addChunk: n, getFinalChunk: s, maxBuffer: o }) => {
  let a = s(t);
  a !== void 0 && to({ convertedChunk: a, state: t, getSize: e, truncateChunk: r, addChunk: n, maxBuffer: o });
}, "appendFinalChunk"), to = /* @__PURE__ */ i(({ convertedChunk: t, state: e, getSize: r, truncateChunk: n, addChunk: s, maxBuffer: o }) => {
  let a = r(t), c = e.length + a;
  if (c <= o) {
    Qs(t, e, s, c);
    return;
  }
  let l = n(t, o - e.length);
  throw l !== void 0 && Qs(l, e, s, o), new Et();
}, "appendChunk"), Qs = /* @__PURE__ */ i((t, e, r, n) => {
  e.contents = r(t, e, n), e.length = n;
}, "addNewChunk"), vd = /* @__PURE__ */ i((t) => typeof t == "object" && t !== null && typeof t[Symbol.asyncIterator] == "function", "isAsyn\
cIterable"), _d = /* @__PURE__ */ i((t) => {
  let e = typeof t;
  if (e === "string")
    return "string";
  if (e !== "object" || t === null)
    return "others";
  if (globalThis.Buffer?.isBuffer(t))
    return "buffer";
  let r = eo.call(t);
  return r === "[object ArrayBuffer]" ? "arrayBuffer" : r === "[object DataView]" ? "dataView" : Number.isInteger(t.byteLength) && Number.isInteger(
  t.byteOffset) && eo.call(t.buffer) === "[object ArrayBuffer]" ? "typedArray" : "others";
}, "getChunkType"), { toString: eo } = Object.prototype, Et = class extends Error {
  static {
    i(this, "MaxBufferError");
  }
  name = "MaxBufferError";
  constructor() {
    super("maxBuffer exceeded");
  }
};

// node_modules/get-stream/source/utils.js
var Sr = /* @__PURE__ */ i((t) => t, "identity"), Er = /* @__PURE__ */ i(() => {
}, "noop"), Cr = /* @__PURE__ */ i(({ contents: t }) => t, "getContentsProp"), Ct = /* @__PURE__ */ i((t) => {
  throw new Error(`Streams in object mode are not supported: ${String(t)}`);
}, "throwObjectStream"), Pt = /* @__PURE__ */ i((t) => t.length, "getLengthProp");

// node_modules/get-stream/source/array-buffer.js
async function Pr(t, e) {
  return We(t, Ad, e);
}
i(Pr, "getStreamAsArrayBuffer");
var wd = /* @__PURE__ */ i(() => ({ contents: new ArrayBuffer(0) }), "initArrayBuffer"), kd = /* @__PURE__ */ i((t) => Td.encode(t), "useTex\
tEncoder"), Td = new TextEncoder(), ro = /* @__PURE__ */ i((t) => new Uint8Array(t), "useUint8Array"), no = /* @__PURE__ */ i((t) => new Uint8Array(
t.buffer, t.byteOffset, t.byteLength), "useUint8ArrayWithOffset"), Id = /* @__PURE__ */ i((t, e) => t.slice(0, e), "truncateArrayBufferChunk"),
Sd = /* @__PURE__ */ i((t, { contents: e, length: r }, n) => {
  let s = io() ? Cd(e, n) : Ed(e, n);
  return new Uint8Array(s).set(t, r), s;
}, "addArrayBufferChunk"), Ed = /* @__PURE__ */ i((t, e) => {
  if (e <= t.byteLength)
    return t;
  let r = new ArrayBuffer(oo(e));
  return new Uint8Array(r).set(new Uint8Array(t), 0), r;
}, "resizeArrayBufferSlow"), Cd = /* @__PURE__ */ i((t, e) => {
  if (e <= t.maxByteLength)
    return t.resize(e), t;
  let r = new ArrayBuffer(e, { maxByteLength: oo(e) });
  return new Uint8Array(r).set(new Uint8Array(t), 0), r;
}, "resizeArrayBuffer"), oo = /* @__PURE__ */ i((t) => so ** Math.ceil(Math.log(t) / Math.log(so)), "getNewContentsLength"), so = 2, Pd = /* @__PURE__ */ i(
({ contents: t, length: e }) => io() ? t : t.slice(0, e), "finalizeArrayBuffer"), io = /* @__PURE__ */ i(() => "resize" in ArrayBuffer.prototype,
"hasArrayBufferResize"), Ad = {
  init: wd,
  convertChunk: {
    string: kd,
    buffer: ro,
    arrayBuffer: ro,
    dataView: no,
    typedArray: no,
    others: Ct
  },
  getSize: Pt,
  truncateChunk: Id,
  addChunk: Sd,
  getFinalChunk: Er,
  finalize: Pd
};

// node_modules/get-stream/source/buffer.js
async function At(t, e) {
  if (!("Buffer" in globalThis))
    throw new Error("getStreamAsBuffer() is only supported in Node.js");
  try {
    return ao(await Pr(t, e));
  } catch (r) {
    throw r.bufferedData !== void 0 && (r.bufferedData = ao(r.bufferedData)), r;
  }
}
i(At, "getStreamAsBuffer");
var ao = /* @__PURE__ */ i((t) => globalThis.Buffer.from(t), "arrayBufferToNodeBuffer");

// node_modules/get-stream/source/string.js
async function Ar(t, e) {
  return We(t, Zd, e);
}
i(Ar, "getStreamAsString");
var Od = /* @__PURE__ */ i(() => ({ contents: "", textDecoder: new TextDecoder() }), "initString"), Ot = /* @__PURE__ */ i((t, { textDecoder: e }) => e.
decode(t, { stream: !0 }), "useTextDecoder"), jd = /* @__PURE__ */ i((t, { contents: e }) => e + t, "addStringChunk"), Rd = /* @__PURE__ */ i(
(t, e) => t.slice(0, e), "truncateStringChunk"), Nd = /* @__PURE__ */ i(({ textDecoder: t }) => {
  let e = t.decode();
  return e === "" ? void 0 : e;
}, "getFinalStringChunk"), Zd = {
  init: Od,
  convertChunk: {
    string: Sr,
    buffer: Ot,
    arrayBuffer: Ot,
    dataView: Ot,
    typedArray: Ot,
    others: Ct
  },
  getSize: Pt,
  truncateChunk: Rd,
  addChunk: jd,
  getFinalChunk: Nd,
  finalize: Cr
};

// node_modules/execa/lib/stream.js
var lo = K(uo(), 1);
var po = /* @__PURE__ */ i((t) => {
  if (t !== void 0)
    throw new TypeError("The `input` and `inputFile` options cannot be both set.");
}, "validateInputOptions"), $d = /* @__PURE__ */ i(({ input: t, inputFile: e }) => typeof e != "string" ? t : (po(t), Dd(e)), "getInputSync"),
fo = /* @__PURE__ */ i((t) => {
  let e = $d(t);
  if (St(e))
    throw new TypeError("The `input` option cannot be a stream in sync mode");
  return e;
}, "handleInputSync"), Vd = /* @__PURE__ */ i(({ input: t, inputFile: e }) => typeof e != "string" ? t : (po(t), Ld(e)), "getInput"), mo = /* @__PURE__ */ i(
(t, e) => {
  let r = Vd(e);
  r !== void 0 && (St(r) ? r.pipe(t.stdin) : t.stdin.end(r));
}, "handleInput"), ho = /* @__PURE__ */ i((t, { all: e }) => {
  if (!e || !t.stdout && !t.stderr)
    return;
  let r = (0, lo.default)();
  return t.stdout && r.add(t.stdout), t.stderr && r.add(t.stderr), r;
}, "makeAllStream"), Or = /* @__PURE__ */ i(async (t, e) => {
  if (!(!t || e === void 0)) {
    await Ud(0), t.destroy();
    try {
      return await e;
    } catch (r) {
      return r.bufferedData;
    }
  }
}, "getBufferedData"), jr = /* @__PURE__ */ i((t, { encoding: e, buffer: r, maxBuffer: n }) => {
  if (!(!t || !r))
    return e === "utf8" || e === "utf-8" ? Ar(t, { maxBuffer: n }) : e === null || e === "buffer" ? At(t, { maxBuffer: n }) : Fd(t, n, e);
}, "getStreamPromise"), Fd = /* @__PURE__ */ i(async (t, e, r) => (await At(t, { maxBuffer: e })).toString(r), "applyEncoding"), yo = /* @__PURE__ */ i(
async ({ stdout: t, stderr: e, all: r }, { encoding: n, buffer: s, maxBuffer: o }, a) => {
  let c = jr(t, { encoding: n, buffer: s, maxBuffer: o }), l = jr(e, { encoding: n, buffer: s, maxBuffer: o }), p = jr(r, { encoding: n, buffer: s,
  maxBuffer: o * 2 });
  try {
    return await Promise.all([a, c, l, p]);
  } catch (f) {
    return Promise.all([
      { error: f, signal: f.signal, timedOut: f.timedOut },
      Or(t, c),
      Or(e, l),
      Or(r, p)
    ]);
  }
}, "getSpawnedResult");

// node_modules/execa/lib/promise.js
var Bd = (async () => {
})().constructor.prototype, Wd = ["then", "catch", "finally"].map((t) => [
  t,
  Reflect.getOwnPropertyDescriptor(Bd, t)
]), Rr = /* @__PURE__ */ i((t, e) => {
  for (let [r, n] of Wd) {
    let s = typeof e == "function" ? (...o) => Reflect.apply(n.value, e(), o) : n.value.bind(e);
    Reflect.defineProperty(t, r, { ...n, value: s });
  }
}, "mergePromise"), go = /* @__PURE__ */ i((t) => new Promise((e, r) => {
  t.on("exit", (n, s) => {
    e({ exitCode: n, signal: s });
  }), t.on("error", (n) => {
    r(n);
  }), t.stdin && t.stdin.on("error", (n) => {
    r(n);
  });
}), "getSpawnedPromise");

// node_modules/execa/lib/command.js
import { Buffer as qd } from "node:buffer";
import { ChildProcess as Gd } from "node:child_process";
var vo = /* @__PURE__ */ i((t, e = []) => Array.isArray(e) ? [t, ...e] : [t], "normalizeArgs"), Kd = /^[\w.-]+$/, zd = /* @__PURE__ */ i((t) => typeof t !=
"string" || Kd.test(t) ? t : `"${t.replaceAll('"', '\\"')}"`, "escapeArg"), Nr = /* @__PURE__ */ i((t, e) => vo(t, e).join(" "), "joinComman\
d"), Zr = /* @__PURE__ */ i((t, e) => vo(t, e).map((r) => zd(r)).join(" "), "getEscapedCommand"), _o = / +/g, wo = /* @__PURE__ */ i((t) => {
  let e = [];
  for (let r of t.trim().split(_o)) {
    let n = e.at(-1);
    n && n.endsWith("\\") ? e[e.length - 1] = `${n.slice(0, -1)} ${r}` : e.push(r);
  }
  return e;
}, "parseCommand"), xo = /* @__PURE__ */ i((t) => {
  let e = typeof t;
  if (e === "string")
    return t;
  if (e === "number")
    return String(t);
  if (e === "object" && t !== null && !(t instanceof Gd) && "stdout" in t) {
    let r = typeof t.stdout;
    if (r === "string")
      return t.stdout;
    if (qd.isBuffer(t.stdout))
      return t.stdout.toString();
    throw new TypeError(`Unexpected "${r}" stdout in template expression`);
  }
  throw new TypeError(`Unexpected "${e}" in template expression`);
}, "parseExpression"), bo = /* @__PURE__ */ i((t, e, r) => r || t.length === 0 || e.length === 0 ? [...t, ...e] : [
  ...t.slice(0, -1),
  `${t.at(-1)}${e[0]}`,
  ...e.slice(1)
], "concatTokens"), Jd = /* @__PURE__ */ i(({ templates: t, expressions: e, tokens: r, index: n, template: s }) => {
  let o = s ?? t.raw[n], a = o.split(_o).filter(Boolean), c = bo(
    r,
    a,
    o.startsWith(" ")
  );
  if (n === e.length)
    return c;
  let l = e[n], p = Array.isArray(l) ? l.map((f) => xo(f)) : [xo(l)];
  return bo(
    c,
    p,
    o.endsWith(" ")
  );
}, "parseTemplate"), Mr = /* @__PURE__ */ i((t, e) => {
  let r = [];
  for (let [n, s] of t.entries())
    r = Jd({ templates: t, expressions: e, tokens: r, index: n, template: s });
  return r;
}, "parseTemplates");

// node_modules/execa/lib/verbose.js
import { debuglog as Yd } from "node:util";
import Hd from "node:process";
var ko = Yd("execa").enabled, jt = /* @__PURE__ */ i((t, e) => String(t).padStart(e, "0"), "padField"), Xd = /* @__PURE__ */ i(() => {
  let t = /* @__PURE__ */ new Date();
  return `${jt(t.getHours(), 2)}:${jt(t.getMinutes(), 2)}:${jt(t.getSeconds(), 2)}.${jt(t.getMilliseconds(), 3)}`;
}, "getTimestamp"), Lr = /* @__PURE__ */ i((t, { verbose: e }) => {
  e && Hd.stderr.write(`[${Xd()}] ${t}
`);
}, "logCommand");

// node_modules/execa/index.js
var tu = 1e3 * 1e3 * 100, ru = /* @__PURE__ */ i(({ env: t, extendEnv: e, preferLocal: r, localDir: n, execPath: s }) => {
  let o = e ? { ...Rt.env, ...t } : t;
  return r ? Ds({ env: o, cwd: n, execPath: s }) : o;
}, "getEnv"), So = /* @__PURE__ */ i((t, e, r = {}) => {
  let n = Io.default._parse(t, e, r);
  return t = n.command, e = n.args, r = n.options, r = {
    maxBuffer: tu,
    buffer: !0,
    stripFinalNewline: !0,
    extendEnv: !0,
    preferLocal: !1,
    localDir: r.cwd || Rt.cwd(),
    execPath: Rt.execPath,
    encoding: "utf8",
    reject: !0,
    cleanup: !0,
    all: !1,
    windowsHide: !0,
    verbose: ko,
    ...r
  }, r.env = ru(r), r.stdio = qs(r), Rt.platform === "win32" && eu.basename(t, ".exe") === "cmd" && e.unshift("/q"), { file: t, args: e, options: r,
  parsed: n };
}, "handleArguments"), qe = /* @__PURE__ */ i((t, e, r) => typeof e != "string" && !Qd.isBuffer(e) ? r === void 0 ? void 0 : "" : t.stripFinalNewline ?
mr(e) : e, "handleOutput");
function Eo(t, e, r) {
  let n = So(t, e, r), s = Nr(t, e), o = Zr(t, e);
  Lr(o, n.options), Ys(n.options);
  let a;
  try {
    a = Dr.spawn(n.file, n.args, n.options);
  } catch (_) {
    let C = new Dr.ChildProcess(), S = Promise.reject(Be({
      error: _,
      stdout: "",
      stderr: "",
      all: "",
      command: s,
      escapedCommand: o,
      parsed: n,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    }));
    return Rr(C, S), C;
  }
  let c = go(a), l = Js(a, n.options, c), p = Hs(a, n.options, l), f = { isCanceled: !1 };
  a.kill = Ks.bind(null, a.kill.bind(a)), a.cancel = zs.bind(null, a, f);
  let w = $s(/* @__PURE__ */ i(async () => {
    let [{ error: _, exitCode: C, signal: S, timedOut: P }, G, je, xe] = await yo(a, n.options, p), Re = qe(n.options, G), Qe = qe(n.options,
    je), et = qe(n.options, xe);
    if (_ || C !== 0 || S !== null) {
      let k = Be({
        error: _,
        exitCode: C,
        signal: S,
        stdout: Re,
        stderr: Qe,
        all: et,
        command: s,
        escapedCommand: o,
        parsed: n,
        timedOut: P,
        isCanceled: f.isCanceled || (n.options.signal ? n.options.signal.aborted : !1),
        killed: a.killed
      });
      if (!n.options.reject)
        return k;
      throw k;
    }
    return {
      command: s,
      escapedCommand: o,
      exitCode: 0,
      stdout: Re,
      stderr: Qe,
      all: et,
      failed: !1,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    };
  }, "handlePromise"));
  return mo(a, n.options), a.all = ho(a, n.options), Xs(a), Rr(a, w), a;
}
i(Eo, "execa");
function nu(t, e, r) {
  let n = So(t, e, r), s = Nr(t, e), o = Zr(t, e);
  Lr(o, n.options);
  let a = fo(n.options), c;
  try {
    c = Dr.spawnSync(n.file, n.args, { ...n.options, input: a });
  } catch (f) {
    throw Be({
      error: f,
      stdout: "",
      stderr: "",
      all: "",
      command: s,
      escapedCommand: o,
      parsed: n,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    });
  }
  let l = qe(n.options, c.stdout, c.error), p = qe(n.options, c.stderr, c.error);
  if (c.error || c.status !== 0 || c.signal !== null) {
    let f = Be({
      stdout: l,
      stderr: p,
      error: c.error,
      signal: c.signal,
      exitCode: c.status,
      command: s,
      escapedCommand: o,
      parsed: n,
      timedOut: c.error && c.error.code === "ETIMEDOUT",
      isCanceled: !1,
      killed: c.signal !== null
    });
    if (!n.options.reject)
      return f;
    throw f;
  }
  return {
    command: s,
    escapedCommand: o,
    exitCode: 0,
    stdout: l,
    stderr: p,
    failed: !1,
    timedOut: !1,
    isCanceled: !1,
    killed: !1
  };
}
i(nu, "execaSync");
var su = /* @__PURE__ */ i(({ input: t, inputFile: e, stdio: r }) => t === void 0 && e === void 0 && r === void 0 ? { stdin: "inherit" } : {},
"normalizeScriptStdin"), To = /* @__PURE__ */ i((t = {}) => ({
  preferLocal: !0,
  ...su(t),
  ...t
}), "normalizeScriptOptions");
function Co(t) {
  function e(r, ...n) {
    if (!Array.isArray(r))
      return Co({ ...t, ...r });
    let [s, ...o] = Mr(r, n);
    return Eo(s, o, To(t));
  }
  return i(e, "$"), e.sync = (r, ...n) => {
    if (!Array.isArray(r))
      throw new TypeError("Please use $(options).sync`command` instead of $.sync(options)`command`.");
    let [s, ...o] = Mr(r, n);
    return nu(s, o, To(t));
  }, e;
}
i(Co, "create$");
var nh = Co();
function Ge(t, e) {
  let [r, ...n] = wo(t);
  return Eo(r, n, e);
}
i(Ge, "execaCommand");

// src/telemetry/exec-command-count-lines.ts
async function Nt(t, e) {
  let r = Ge(t, { shell: !0, buffer: !1, ...e });
  if (!r.stdout)
    throw new Error("Unexpected missing stdout");
  let n = 0, s = ou(r.stdout);
  return s.on("line", () => {
    n += 1;
  }), await r, s.close(), n;
}
i(Nt, "execCommandCountLines");

// src/common/utils/file-cache.ts
import { createHash as Ao, randomBytes as iu } from "node:crypto";
import { mkdirSync as $r, readFileSync as au, readdirSync as cu, rmSync as Oo, writeFileSync as du } from "node:fs";
import { readFile as jo, readdir as Ro, rm as No, writeFile as uu } from "node:fs/promises";
import { tmpdir as lu } from "node:os";
import { join as Ke } from "node:path";
var Zt = class {
  static {
    i(this, "FileSystemCache");
  }
  constructor(e = {}) {
    this.prefix = (e.ns || e.prefix || "") + "-", this.hash_alg = e.hash_alg || "sha256", this.cache_dir = e.basePath || Ke(lu(), iu(15).toString(
    "base64").replace(/\//g, "-")), this.ttl = e.ttl || 0, Ao(this.hash_alg), $r(this.cache_dir, { recursive: !0 });
  }
  generateHash(e) {
    return Ke(this.cache_dir, this.prefix + Ao(this.hash_alg).update(e).digest("hex"));
  }
  isExpired(e, r) {
    return e.ttl != null && r > e.ttl;
  }
  parseCacheData(e, r) {
    let n = JSON.parse(e);
    return this.isExpired(n, Date.now()) ? r : n.content;
  }
  parseSetData(e, r, n = {}) {
    let s = n.ttl ?? this.ttl;
    return JSON.stringify({ key: e, content: r, ...s && { ttl: Date.now() + s * 1e3 } });
  }
  async get(e, r) {
    try {
      let n = await jo(this.generateHash(e), "utf8");
      return this.parseCacheData(n, r);
    } catch {
      return r;
    }
  }
  getSync(e, r) {
    try {
      let n = au(this.generateHash(e), "utf8");
      return this.parseCacheData(n, r);
    } catch {
      return r;
    }
  }
  async set(e, r, n = {}) {
    let s = typeof n == "number" ? { ttl: n } : n;
    $r(this.cache_dir, { recursive: !0 }), await uu(this.generateHash(e), this.parseSetData(e, r, s), {
      encoding: s.encoding || "utf8"
    });
  }
  setSync(e, r, n = {}) {
    let s = typeof n == "number" ? { ttl: n } : n;
    $r(this.cache_dir, { recursive: !0 }), du(this.generateHash(e), this.parseSetData(e, r, s), {
      encoding: s.encoding || "utf8"
    });
  }
  async setMany(e, r) {
    await Promise.all(e.map((n) => this.set(n.key, n.content ?? n.value, r)));
  }
  setManySync(e, r) {
    e.forEach((n) => this.setSync(n.key, n.content ?? n.value, r));
  }
  async remove(e) {
    await No(this.generateHash(e), { force: !0 });
  }
  removeSync(e) {
    Oo(this.generateHash(e), { force: !0 });
  }
  async clear() {
    let e = await Ro(this.cache_dir);
    await Promise.all(
      e.filter((r) => r.startsWith(this.prefix)).map((r) => No(Ke(this.cache_dir, r), { force: !0 }))
    );
  }
  clearSync() {
    cu(this.cache_dir).filter((e) => e.startsWith(this.prefix)).forEach((e) => Oo(Ke(this.cache_dir, e), { force: !0 }));
  }
  async getAll() {
    let e = Date.now(), r = await Ro(this.cache_dir);
    return (await Promise.all(
      r.filter((s) => s.startsWith(this.prefix)).map((s) => jo(Ke(this.cache_dir, s), "utf8"))
    )).map((s) => JSON.parse(s)).filter((s) => s.content && !this.isExpired(s, e));
  }
  async load() {
    return {
      files: (await this.getAll()).map((r) => ({
        path: this.generateHash(r.key),
        value: r.content,
        key: r.key
      }))
    };
  }
};
function Vr(t) {
  return new Zt(t);
}
i(Vr, "createFileSystemCache");

// src/common/utils/resolve-path-in-sb-cache.ts
import { join as Wo } from "node:path";

// node_modules/find-cache-dir/index.js
var Bo = K(Mo(), 1);
import Su from "node:process";
import ze from "node:path";
import Lt from "node:fs";

// ../node_modules/pkg-dir/index.js
import Iu from "node:path";

// ../node_modules/pkg-dir/node_modules/find-up/index.js
import Mt from "node:path";
import { fileURLToPath as _u } from "node:url";

// ../node_modules/locate-path/index.js
import mu from "node:process";
import hu from "node:path";
import Lo, { promises as Oh } from "node:fs";
import { fileURLToPath as yu } from "node:url";
var Do = {
  directory: "isDirectory",
  file: "isFile"
};
function gu(t) {
  if (!Object.hasOwnProperty.call(Do, t))
    throw new Error(`Invalid type specified: ${t}`);
}
i(gu, "checkType");
var xu = /* @__PURE__ */ i((t, e) => e[Do[t]](), "matchType"), bu = /* @__PURE__ */ i((t) => t instanceof URL ? yu(t) : t, "toPath");
function Ae(t, {
  cwd: e = mu.cwd(),
  type: r = "file",
  allowSymlinks: n = !0
} = {}) {
  gu(r), e = bu(e);
  let s = n ? Lo.statSync : Lo.lstatSync;
  for (let o of t)
    try {
      let a = s(hu.resolve(e, o), {
        throwIfNoEntry: !1
      });
      if (!a)
        continue;
      if (xu(r, a))
        return o;
    } catch {
    }
}
i(Ae, "locatePathSync");

// ../node_modules/pkg-dir/node_modules/path-exists/index.js
import Lh, { promises as Dh } from "node:fs";

// ../node_modules/pkg-dir/node_modules/find-up/index.js
var wu = /* @__PURE__ */ i((t) => t instanceof URL ? _u(t) : t, "toPath"), ku = Symbol("findUpStop");
function Tu(t, e = {}) {
  let r = Mt.resolve(wu(e.cwd) || ""), { root: n } = Mt.parse(r), s = e.stopAt || n, o = e.limit || Number.POSITIVE_INFINITY, a = [t].flat(),
  c = /* @__PURE__ */ i((p) => {
    if (typeof t != "function")
      return Ae(a, p);
    let f = t(p.cwd);
    return typeof f == "string" ? Ae([f], p) : f;
  }, "runMatcher"), l = [];
  for (; ; ) {
    let p = c({ ...e, cwd: r });
    if (p === ku || (p && l.push(Mt.resolve(r, p)), r === s || l.length >= o))
      break;
    r = Mt.dirname(r);
  }
  return l;
}
i(Tu, "findUpMultipleSync");
function Uo(t, e = {}) {
  return Tu(t, { ...e, limit: 1 })[0];
}
i(Uo, "findUpSync");

// ../node_modules/pkg-dir/index.js
function $o({ cwd: t } = {}) {
  let e = Uo("package.json", { cwd: t });
  return e && Iu.dirname(e);
}
i($o, "packageDirectorySync");

// node_modules/find-cache-dir/index.js
var { env: Fr, cwd: Eu } = Su, Vo = /* @__PURE__ */ i((t) => {
  try {
    return Lt.accessSync(t, Lt.constants.W_OK), !0;
  } catch {
    return !1;
  }
}, "isWritable");
function Fo(t, e) {
  return e.create && Lt.mkdirSync(t, { recursive: !0 }), t;
}
i(Fo, "useDirectory");
function Cu(t) {
  let e = ze.join(t, "node_modules");
  if (!(!Vo(e) && (Lt.existsSync(e) || !Vo(ze.join(t)))))
    return e;
}
i(Cu, "getNodeModuleDirectory");
function Br(t = {}) {
  if (Fr.CACHE_DIR && !["true", "false", "1", "0"].includes(Fr.CACHE_DIR))
    return Fo(ze.join(Fr.CACHE_DIR, t.name), t);
  let { cwd: e = Eu(), files: r } = t;
  if (r) {
    if (!Array.isArray(r))
      throw new TypeError(`Expected \`files\` option to be an array, got \`${typeof r}\`.`);
    e = (0, Bo.default)(r.map((s) => ze.resolve(e, s)));
  }
  if (e = $o({ cwd: e }), !(!e || !Cu(e)))
    return Fo(ze.join(e, "node_modules", ".cache", t.name), t);
}
i(Br, "findCacheDirectory");

// src/common/utils/resolve-path-in-sb-cache.ts
function qo(t, e = "default") {
  let r = Br({ name: "storybook" });
  return r ||= Wo(process.cwd(), "node_modules", ".cache", "storybook"), Wo(r, e, t);
}
i(qo, "resolvePathInStorybookCache");

// ../node_modules/find-up/index.js
import Je from "node:path";

// ../node_modules/find-up/node_modules/unicorn-magic/node.js
import { fileURLToPath as Pu } from "node:url";
function Wr(t) {
  return t instanceof URL ? Pu(t) : t;
}
i(Wr, "toPath");

// ../node_modules/find-up/node_modules/path-exists/index.js
import hy, { promises as yy } from "node:fs";

// ../node_modules/find-up/index.js
var Au = Symbol("findUpStop");
function Ou(t, e = {}) {
  let r = Je.resolve(Wr(e.cwd) ?? ""), { root: n } = Je.parse(r), s = Je.resolve(r, Wr(e.stopAt) ?? n), o = e.limit ?? Number.POSITIVE_INFINITY,
  a = [t].flat(), c = /* @__PURE__ */ i((p) => {
    if (typeof t != "function")
      return Ae(a, p);
    let f = t(p.cwd);
    return typeof f == "string" ? Ae([f], p) : f;
  }, "runMatcher"), l = [];
  for (; ; ) {
    let p = c({ ...e, cwd: r });
    if (p === Au || (p && l.push(Je.resolve(r, p)), r === s || l.length >= o))
      break;
    r = Je.dirname(r);
  }
  return l;
}
i(Ou, "findUpMultipleSync");
function Ye(t, e = {}) {
  return Ou(t, { ...e, limit: 1 })[0];
}
i(Ye, "findUpSync");

// src/common/utils/paths.ts
import { join as Dt, relative as Lu, resolve as Py, sep as Ay } from "node:path";

// src/common/js-package-manager/constants.ts
var ju = "package-lock.json", Ru = "pnpm-lock.yaml", Nu = "yarn.lock", Zu = "bun.lock", Mu = "bun.lockb", Go = [
  ju,
  Ru,
  Nu,
  Zu,
  Mu
];

// src/common/utils/paths.ts
var Ut, $t = /* @__PURE__ */ i(() => {
  if (Ut)
    return Ut;
  let t;
  if (process.env.STORYBOOK_PROJECT_ROOT)
    return process.env.STORYBOOK_PROJECT_ROOT;
  try {
    let e = Ye(".git", { type: "directory" });
    e && (t = Dt(e, ".."));
  } catch {
  }
  try {
    let e = Ye(".svn", { type: "directory" });
    e && (t = t || Dt(e, ".."));
  } catch {
  }
  try {
    let e = Ye(".hg", { type: "directory" });
    e && (t = t || Dt(e, ".."));
  } catch {
  }
  try {
    let e = __dirname.split("node_modules"), r = !Lu(e[0], process.cwd()).startsWith("..");
    t = t || (r && e.length >= 2 ? e[0] : void 0);
  } catch {
  }
  try {
    let e = Ye(Go, {
      type: "file"
    });
    e && (t = t || Dt(e, ".."));
  } catch {
  }
  return Ut = t || process.cwd(), Ut;
}, "getProjectRoot");

// src/telemetry/run-telemetry-operation.ts
var Ko = Vr({
  basePath: qo("telemetry"),
  ns: "storybook",
  ttl: 24 * 60 * 60 * 1e3
  // 24h
}), Vt = /* @__PURE__ */ i(async (t, e) => {
  let r = await Ko.get(t);
  return r === void 0 && (r = await e(), r !== void 0 && await Ko.set(t, r)), r;
}, "runTelemetryOperation");

// src/telemetry/get-application-file-count.ts
var Uu = ["page", "screen"], $u = ["js", "jsx", "ts", "tsx"], Vu = /* @__PURE__ */ i(async (t) => {
  let r = Uu.flatMap((n) => [
    n,
    [n[0].toUpperCase(), ...n.slice(1)].join("")
  ]).flatMap(
    (n) => $u.map((s) => `"${t}${Du}*${n}*.${s}"`)
  );
  try {
    let n = `git ls-files -- ${r.join(" ")}`;
    return await Nt(n);
  } catch {
    return;
  }
}, "getApplicationFilesCountUncached"), zo = /* @__PURE__ */ i(async (t) => Vt(
  "applicationFiles",
  async () => Vu(t)
), "getApplicationFileCount");

// src/telemetry/get-chromatic-version.ts
function Jo(t) {
  let e = t.dependencies?.chromatic || t.devDependencies?.chromatic || t.peerDependencies?.chromatic;
  return e || (t.scripts && Object.values(t.scripts).find((r) => r?.match(/chromatic/)) ? "latest" : void 0);
}
i(Jo, "getChromaticVersionSpecifier");

// src/telemetry/get-framework-info.ts
import { normalize as Wu } from "node:path";
import { frameworkPackages as qu } from "storybook/internal/common";

// src/telemetry/package-json.ts
import { readFile as Fu } from "node:fs/promises";
import { join as Bu } from "node:path";
var qr = /* @__PURE__ */ i(async (t) => {
  let e = Object.keys(t);
  return Promise.all(e.map(Ft));
}, "getActualPackageVersions"), Ft = /* @__PURE__ */ i(async (t) => {
  try {
    let e = await Gr(t);
    return {
      name: t,
      version: e.version
    };
  } catch {
    return { name: t, version: null };
  }
}, "getActualPackageVersion"), Gr = /* @__PURE__ */ i(async (t) => {
  try {
    let e = N.resolve(Bu(t, "package.json"), {
      paths: [process.cwd()]
    });
    return JSON.parse(await Fu(e, { encoding: "utf8" }));
  } catch {
    return null;
  }
}, "getActualPackageJson");

// src/telemetry/get-framework-info.ts
var Gu = [
  "html",
  "react",
  "svelte",
  "vue3",
  "preact",
  "server",
  "vue",
  "web-components",
  "angular",
  "ember"
], Ku = ["builder-webpack5", "builder-vite"];
function Yo(t, e) {
  let { name: r = "", version: n, dependencies: s, devDependencies: o, peerDependencies: a } = t, c = {
    // We include the framework itself because it may be a renderer too (e.g. angular)
    [r]: n,
    ...s,
    ...o,
    ...a
  };
  return e.map((l) => `@storybook/${l}`).find((l) => c[l]);
}
i(Yo, "findMatchingPackage");
var zu = /* @__PURE__ */ i((t) => {
  let e = Wu(t).replace(new RegExp(/\\/, "g"), "/");
  return Object.keys(qu).find((n) => e.endsWith(n)) || Ne(t).replace(/.*node_modules[\\/]/, "");
}, "getFrameworkPackageName");
async function Ho(t) {
  if (!t?.framework)
    return {};
  let e = typeof t.framework == "string" ? t.framework : t.framework?.name;
  if (!e)
    return {};
  let r = await Gr(e);
  if (!r)
    return {};
  let n = Yo(r, Ku), s = Yo(r, Gu), o = zu(e), a = typeof t.framework == "object" ? t.framework.options : {};
  return {
    framework: {
      name: o,
      options: a
    },
    builder: n,
    renderer: s
  };
}
i(Ho, "getFrameworkInfo");

// src/telemetry/get-has-router-package.ts
var Ju = /* @__PURE__ */ new Set([
  "react-router",
  "react-router-dom",
  "remix",
  "@tanstack/react-router",
  "expo-router",
  "@reach/router",
  "react-easy-router",
  "@remix-run/router",
  "wouter",
  "wouter-preact",
  "preact-router",
  "vue-router",
  "unplugin-vue-router",
  "@angular/router",
  "@solidjs/router",
  // metaframeworks that imply routing
  "next",
  "react-scripts",
  "gatsby",
  "nuxt",
  "@sveltejs/kit"
]);
function Xo(t) {
  return Object.keys(t?.dependencies ?? {}).some(
    (e) => Ju.has(e)
  );
}
i(Xo, "getHasRouterPackage");

// src/telemetry/get-monorepo-type.ts
import { existsSync as Qo, readFileSync as Yu } from "node:fs";
import { join as Kr } from "node:path";
import { getProjectRoot as zr } from "storybook/internal/common";
var ei = {
  Nx: "nx.json",
  Turborepo: "turbo.json",
  Lerna: "lerna.json",
  Rush: "rush.json",
  Lage: "lage.config.json"
}, ti = /* @__PURE__ */ i(() => {
  let e = Object.keys(ei).find((n) => {
    let s = Kr(zr(), ei[n]);
    return Qo(s);
  });
  if (e)
    return e;
  if (!Qo(Kr(zr(), "package.json")))
    return;
  if (JSON.parse(
    Yu(Kr(zr(), "package.json"), { encoding: "utf8" })
  )?.workspaces)
    return "Workspaces";
}, "getMonorepoType");

// ../node_modules/package-manager-detector/dist/constants.mjs
var ri = [
  "npm",
  "yarn",
  "yarn@berry",
  "pnpm",
  "pnpm@6",
  "bun",
  "deno"
], Jr = {
  "bun.lock": "bun",
  "bun.lockb": "bun",
  "deno.lock": "deno",
  "pnpm-lock.yaml": "pnpm",
  "pnpm-workspace.yaml": "pnpm",
  "yarn.lock": "yarn",
  "package-lock.json": "npm",
  "npm-shrinkwrap.json": "npm"
}, Yr = {
  "node_modules/.deno/": "deno",
  "node_modules/.pnpm/": "pnpm",
  "node_modules/.yarn-state.yml": "yarn",
  // yarn v2+ (node-modules)
  "node_modules/.yarn_integrity": "yarn",
  // yarn v1
  "node_modules/.package-lock.json": "npm",
  ".pnp.cjs": "yarn",
  // yarn v3+ (pnp)
  ".pnp.js": "yarn",
  // yarn v2 (pnp)
  "bun.lock": "bun",
  "bun.lockb": "bun"
};

// ../node_modules/package-manager-detector/dist/detect.mjs
import si from "node:fs/promises";
import ye from "node:path";
import Hu from "node:process";
async function Hr(t, e) {
  try {
    let r = await si.stat(t);
    return e === "file" ? r.isFile() : r.isDirectory();
  } catch {
    return !1;
  }
}
i(Hr, "pathExists");
function* Xu(t = Hu.cwd()) {
  let e = ye.resolve(t), { root: r } = ye.parse(e);
  for (; e && e !== r; )
    yield e, e = ye.dirname(e);
}
i(Xu, "lookup");
async function ni(t, e) {
  return !t || !Hr(t, "file") ? null : await el(t, e);
}
i(ni, "parsePackageJson");
async function Xr(t = {}) {
  let { cwd: e, strategies: r = ["lockfile", "packageManager-field", "devEngines-field"], onUnknown: n } = t;
  for (let s of Xu(e))
    for (let o of r)
      switch (o) {
        case "lockfile": {
          for (let a of Object.keys(Jr))
            if (await Hr(ye.join(s, a), "file")) {
              let c = Jr[a], l = await ni(ye.join(s, "package.json"), n);
              return l || { name: c, agent: c };
            }
          break;
        }
        case "packageManager-field":
        case "devEngines-field": {
          let a = await ni(ye.join(s, "package.json"), n);
          if (a)
            return a;
          break;
        }
        case "install-metadata": {
          for (let a of Object.keys(Yr)) {
            let c = a.endsWith("/") ? "dir" : "file";
            if (await Hr(ye.join(s, a), c)) {
              let l = Yr[a], p = l === "yarn" ? tl(a) ? "yarn" : "yarn@berry" : l;
              return { name: l, agent: p };
            }
          }
          break;
        }
      }
  return null;
}
i(Xr, "detect");
function Qu(t) {
  let e = /* @__PURE__ */ i((r) => r?.match(/\d+(\.\d+){0,2}/)?.[0] ?? r, "handelVer");
  if (typeof t.packageManager == "string") {
    let [r, n] = t.packageManager.replace(/^\^/, "").split("@");
    return { name: r, ver: e(n) };
  }
  if (typeof t.devEngines?.packageManager?.name == "string")
    return {
      name: t.devEngines.packageManager.name,
      ver: e(t.devEngines.packageManager.version)
    };
}
i(Qu, "getNameAndVer");
async function el(t, e) {
  try {
    let r = JSON.parse(await si.readFile(t, "utf8")), n, s = Qu(r);
    if (s) {
      let o = s.name, a = s.ver, c = a;
      return o === "yarn" && a && Number.parseInt(a) > 1 ? (n = "yarn@berry", c = "berry", { name: o, agent: n, version: c }) : o === "pnpm" &&
      a && Number.parseInt(a) < 7 ? (n = "pnpm@6", { name: o, agent: n, version: c }) : ri.includes(o) ? (n = o, { name: o, agent: n, version: c }) :
      e?.(r.packageManager) ?? null;
    }
  } catch {
  }
  return null;
}
i(el, "handlePackageManager");
function tl(t) {
  return t.endsWith(".yarn_integrity");
}
i(tl, "isMetadataYarnClassic");

// ../node_modules/package-manager-detector/dist/index.mjs
import "node:fs/promises";
import "node:path";
import "node:process";

// src/telemetry/get-package-manager-info.ts
var oi = /* @__PURE__ */ i(async () => {
  let t = await Xr({ cwd: $t() });
  if (!t)
    return;
  let e = "node_modules";
  if (t.name === "yarn")
    try {
      let { stdout: r } = await Ge("yarn config get nodeLinker", {
        cwd: $t()
      });
      e = r.trim();
    } catch {
    }
  if (t.name === "pnpm")
    try {
      let { stdout: r } = await Ge("pnpm config get nodeLinker", {
        cwd: $t()
      });
      e = r.trim() ?? "isolated";
    } catch {
    }
  return {
    type: t.name,
    version: t.version,
    agent: t.agent,
    nodeLinker: e
  };
}, "getPackageManagerInfo");

// src/telemetry/get-portable-stories-usage.ts
var rl = /* @__PURE__ */ i(async (t) => {
  try {
    let e = "git grep -l composeStor" + (t ? ` -- ${t}` : "");
    return await Nt(e);
  } catch (e) {
    return e.exitCode === 1 ? 0 : void 0;
  }
}, "getPortableStoriesFileCountUncached"), ii = /* @__PURE__ */ i(async (t) => Vt(
  "portableStories",
  async () => rl(t)
), "getPortableStoriesFileCount");

// src/telemetry/storybook-metadata.ts
var ai = {
  next: "Next",
  "react-scripts": "CRA",
  gatsby: "Gatsby",
  "@nuxtjs/storybook": "nuxt",
  "@nrwl/storybook": "nx",
  "@vue/cli-service": "vue-cli",
  "@sveltejs/kit": "sveltekit"
}, ci = /* @__PURE__ */ i((t) => Ne(t).replace(/\/dist\/.*/, "").replace(/\.[mc]?[tj]?s[x]?$/, "").replace(/\/register$/, "").replace(/\/manager$/,
"").replace(/\/preset$/, ""), "sanitizeAddonName"), dl = /* @__PURE__ */ i(async ({
  packageJsonPath: t,
  packageJson: e,
  mainConfig: r,
  configDir: n
}) => {
  let s = await zn(), o = {
    generatedAt: (/* @__PURE__ */ new Date()).getTime(),
    userSince: s.value.userSince,
    hasCustomBabel: !1,
    hasCustomWebpack: !1,
    hasStaticDirs: !1,
    hasStorybookEslint: !1,
    refCount: 0
  }, a = {
    ...e?.dependencies,
    ...e?.devDependencies,
    ...e?.peerDependencies
  }, c = Object.keys(a).find((k) => !!ai[k]);
  if (c) {
    let { version: k } = await Ft(c);
    o.metaFramework = {
      name: ai[c],
      packageName: c,
      version: k
    };
  }
  let l = [
    "playwright",
    "vitest",
    "jest",
    "cypress",
    "nightwatch",
    "webdriver",
    "@web/test-runner",
    "puppeteer",
    "karma",
    "jasmine",
    "chai",
    "testing-library",
    "@ngneat/spectator",
    "wdio",
    "msw",
    "miragejs",
    "sinon",
    "chromatic"
  ], p = Object.keys(a).filter(
    (k) => l.find((O) => k.includes(O))
  );
  o.testPackages = Object.fromEntries(
    await Promise.all(
      p.map(async (k) => [k, (await Ft(k))?.version])
    )
  ), o.hasRouterPackage = Xo(e);
  let f = ti();
  f && (o.monorepo = f), o.packageManager = await oi();
  let x = a.typescript ? "typescript" : "javascript";
  if (!r)
    return {
      ...o,
      storybookVersionSpecifier: al.storybook,
      language: x
    };
  o.hasCustomBabel = !!r.babel, o.hasCustomWebpack = !!r.webpackFinal, o.hasStaticDirs = !!r.staticDirs, typeof r.typescript == "object" && (o.
  typescriptOptions = r.typescript);
  let w = await Ho(r);
  typeof r.refs == "object" && (o.refCount = Object.keys(r.refs).length), typeof r.features == "object" && (o.features = r.features);
  let _ = {};
  r.addons && r.addons.forEach((k) => {
    let O, tt;
    typeof k == "string" ? O = ci(k) : (k.name.includes("addon-essentials") && (tt = k.options), O = ci(k.name)), _[O] = {
      options: tt,
      version: void 0
    };
  });
  let C = Jo(e);
  C && (_.chromatic = {
    version: void 0,
    versionSpecifier: C,
    options: void 0
  }), (await qr(_)).forEach(({ name: k, version: O }) => {
    _[k].version = O;
  });
  let P = Object.keys(_), G = Object.keys(a).filter((k) => k.includes("storybook") && !P.includes(k)).reduce((k, O) => ({
    ...k,
    [O]: { version: void 0 }
  }), {});
  (await qr(G)).forEach(({ name: k, version: O }) => {
    G[k].version = O;
  });
  let xe = !!a["eslint-plugin-storybook"], Re = ol(n);
  try {
    let { previewConfigPath: k } = Re;
    if (k) {
      let O = await cl(k), tt = !!(O.getFieldNode(["globals"]) || O.getFieldNode(["globalTypes"]));
      o.preview = { ...o.preview, usesGlobals: tt };
    }
  } catch {
  }
  let Qe = await ii(), et = await zo(nl(t));
  return {
    ...o,
    ...w,
    portableStoriesFileCount: Qe,
    applicationFileCount: et,
    storybookVersion: at,
    storybookVersionSpecifier: Re.version,
    language: x,
    storybookPackages: G,
    addons: _,
    hasStorybookEslint: xe
  };
}, "computeStorybookMetadata");
async function ul() {
  let t = await Jt(process.cwd());
  return t ? {
    packageJsonPath: t,
    packageJson: await xn(t) || {}
  } : {
    packageJsonPath: process.cwd(),
    packageJson: {}
  };
}
i(ul, "getPackageJsonDetails");
var Bt, di = /* @__PURE__ */ i(async (t) => {
  if (Bt)
    return Bt;
  let { packageJson: e, packageJsonPath: r } = await ul(), n = (t || sl(
    String(e?.scripts?.storybook || ""),
    "-c",
    "--config-dir"
  )) ?? ".storybook", s = await il({ configDir: n }).catch(() => {
  });
  return Bt = await dl({
    mainConfig: s,
    packageJson: e,
    packageJsonPath: r,
    configDir: n
  }), Bt;
}, "getStorybookMetadata");

// src/telemetry/telemetry.ts
var vi = K(li(), 1);
import * as bi from "node:os";

// ../node_modules/nanoid/index.js
import { randomFillSync as fi } from "crypto";

// ../node_modules/nanoid/url-alphabet/index.js
var pi = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

// ../node_modules/nanoid/index.js
var ll = 128, ge, Oe, pl = /* @__PURE__ */ i((t) => {
  !ge || ge.length < t ? (ge = Buffer.allocUnsafe(t * ll), fi(ge), Oe = 0) : Oe + t > ge.length && (fi(ge), Oe = 0), Oe += t;
}, "fillPool");
var He = /* @__PURE__ */ i((t = 21) => {
  pl(t -= 0);
  let e = "";
  for (let r = Oe - t; r < Oe; r++)
    e += pi[ge[r] & 63];
  return e;
}, "nanoid");

// src/telemetry/anonymous-id.ts
Po();
import { relative as ml } from "node:path";
import { getProjectRoot as hl } from "storybook/internal/common";
import { execSync as yl } from "child_process";

// src/telemetry/one-way-hash.ts
import { createHash as fl } from "crypto";
var Qr = /* @__PURE__ */ i((t) => {
  let e = fl("sha256");
  return e.update("storybook-telemetry-salt"), e.update(t), e.digest("hex");
}, "oneWayHash");

// src/telemetry/anonymous-id.ts
function gl(t) {
  let n = t.trim().replace(/#.*$/, "").replace(/^.*@/, "").replace(/^.*\/\//, "");
  return (n.endsWith(".git") ? n : `${n}.git`).replace(":", "/");
}
i(gl, "normalizeGitUrl");
function xl(t, e) {
  return `${gl(t)}${Ur(e)}`;
}
i(xl, "unhashedProjectId");
var qt, mi = /* @__PURE__ */ i(() => {
  if (qt)
    return qt;
  try {
    let t = ml(hl(), process.cwd()), e = yl("git config --local --get remote.origin.url", {
      timeout: 1e3,
      stdio: "pipe"
    });
    qt = Qr(xl(String(e), t));
  } catch {
  }
  return qt;
}, "getAnonymousProjectId");

// src/telemetry/event-cache.ts
import { cache as tn } from "storybook/internal/common";
var en = Promise.resolve(), bl = /* @__PURE__ */ i(async (t, e) => {
  let r = await tn.get("lastEvents") || {};
  r[t] = { body: e, timestamp: Date.now() }, await tn.set("lastEvents", r);
}, "setHelper"), yi = /* @__PURE__ */ i(async (t, e) => (await en, en = bl(t, e), en), "set");
var vl = /* @__PURE__ */ i((t) => {
  let { body: e, timestamp: r } = t;
  return {
    timestamp: r,
    eventType: e?.eventType,
    eventId: e?.eventId,
    sessionId: e?.sessionId
  };
}, "upgradeFields"), _l = ["init", "upgrade"], wl = ["build", "dev", "error"], hi = /* @__PURE__ */ i((t, e) => {
  let r = e.map((n) => t?.[n]).filter(Boolean).sort((n, s) => s.timestamp - n.timestamp);
  return r.length > 0 ? r[0] : void 0;
}, "lastEvent"), kl = /* @__PURE__ */ i(async (t = void 0) => {
  let e = t || await tn.get("lastEvents") || {}, r = hi(e, _l), n = hi(e, wl);
  if (r)
    return !n?.timestamp || r.timestamp > n.timestamp ? vl(r) : void 0;
}, "getPrecedingUpgrade");

// src/telemetry/fetch.ts
var gi = global.fetch;

// src/telemetry/session-id.ts
import { cache as xi } from "storybook/internal/common";
var Tl = 1e3 * 60 * 60 * 2, Xe;
var rn = /* @__PURE__ */ i(async () => {
  let t = Date.now();
  if (!Xe) {
    let e = await xi.get("session");
    e && e.lastUsed >= t - Tl ? Xe = e.id : Xe = He();
  }
  return await xi.set("session", { id: Xe, lastUsed: t }), Xe;
}, "getSessionId");

// src/telemetry/telemetry.ts
var Il = (0, vi.default)(gi), Sl = process.env.STORYBOOK_TELEMETRY_URL || "https://storybook.js.org/event-log", Gt = [], El = /* @__PURE__ */ i(
(t, e) => {
  nn[t] = e;
}, "addToGlobalContext"), Cl = /* @__PURE__ */ i(() => {
  try {
    let t = bi.platform();
    return t === "win32" ? "Windows" : t === "darwin" ? "macOS" : t === "linux" ? "Linux" : `Other: ${t}`;
  } catch {
    return "Unknown";
  }
}, "getOperatingSystem"), nn = {
  inCI: !!process.env.CI,
  isTTY: process.stdout.isTTY,
  platform: Cl(),
  nodeVersion: process.versions.node,
  storybookVersion: at
}, Pl = /* @__PURE__ */ i(async (t, e, r) => {
  let { eventType: n, payload: s, metadata: o, ...a } = t, c = await rn(), l = He(), p = { ...a, eventType: n, eventId: l, sessionId: c, metadata: o,
  payload: s, context: e };
  return Il(Sl, {
    method: "post",
    body: JSON.stringify(p),
    headers: { "Content-Type": "application/json" },
    retries: 3,
    retryOn: [503, 504],
    retryDelay: /* @__PURE__ */ i((f) => 2 ** f * (typeof r?.retryDelay == "number" && !Number.isNaN(r?.retryDelay) ? r.retryDelay : 1e3), "\
retryDelay")
  });
}, "prepareRequest");
async function _i(t, e = { retryDelay: 1e3, immediate: !1 }) {
  let { eventType: r, payload: n, metadata: s, ...o } = t, a = e.stripMetadata ? nn : {
    ...nn,
    anonymousId: mi()
  }, c;
  try {
    c = Pl(t, a, e), Gt.push(c), e.immediate ? await Promise.all(Gt) : await c;
    let l = await rn(), p = He(), f = { ...o, eventType: r, eventId: p, sessionId: l, metadata: s, payload: n, context: a };
    await yi(r, f);
  } catch {
  } finally {
    Gt = Gt.filter((l) => l !== c);
  }
}
i(_i, "sendTelemetry");

// src/telemetry/index.ts
var wb = /* @__PURE__ */ i((t) => t.startsWith("example-button--") || t.startsWith("example-header--") || t.startsWith("example-page--"), "i\
sExampleStoryId"), kb = /* @__PURE__ */ i(async (t, e = {}, r = {}) => {
  t !== "boot" && r.notify !== !1 && await ln();
  let n = {
    eventType: t,
    payload: e
  };
  try {
    r?.stripMetadata || (n.metadata = await di(r?.configDir));
  } catch (s) {
    n.payload.metadataErrorMessage = ot(s).message, r?.enableCrashReports && (n.payload.metadataError = ot(s));
  } finally {
    let { error: s } = n.payload;
    s && (n.payload.error = ot(s)), (!n.payload.error || r?.enableCrashReports) && (process.env?.STORYBOOK_TELEMETRY_DEBUG && (wi.info(`
[telemetry]`), wi.info(JSON.stringify(n, null, 2))), await _i(n, r));
  }
}, "telemetry");
export {
  El as addToGlobalContext,
  Ne as cleanPaths,
  dl as computeStorybookMetadata,
  kl as getPrecedingUpgrade,
  di as getStorybookMetadata,
  wb as isExampleStoryId,
  ai as metaFrameworks,
  Qr as oneWayHash,
  fn as removeAnsiEscapeCodes,
  ci as sanitizeAddonName,
  ot as sanitizeError,
  kb as telemetry
};
