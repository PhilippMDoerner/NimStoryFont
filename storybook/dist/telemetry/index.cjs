"use strict";
var pa = Object.create;
var Be = Object.defineProperty;
var fa = Object.getOwnPropertyDescriptor;
var ma = Object.getOwnPropertyNames;
var ha = Object.getPrototypeOf, ya = Object.prototype.hasOwnProperty;
var i = (t, e) => Be(t, "name", { value: e, configurable: !0 });
var ga = (t, e) => () => (t && (e = t(t = 0)), e);
var S = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports), xa = (t, e) => {
  for (var r in e)
    Be(t, r, { get: e[r], enumerable: !0 });
}, Tn = (t, e, r, n) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of ma(e))
      !ya.call(t, s) && s !== r && Be(t, s, { get: () => e[s], enumerable: !(n = fa(e, s)) || n.enumerable });
  return t;
};
var k = (t, e, r) => (r = t != null ? pa(ha(t)) : {}, Tn(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  e || !t || !t.__esModule ? Be(r, "default", { value: t, enumerable: !0 }) : r,
  t
)), ba = (t) => Tn(Be({}, "__esModule", { value: !0 }), t);

// ../node_modules/picocolors/picocolors.js
var En = S((_l, cr) => {
  var ht = process || {}, In = ht.argv || [], mt = ht.env || {}, va = !(mt.NO_COLOR || In.includes("--no-color")) && (!!mt.FORCE_COLOR || In.
  includes("--color") || ht.platform === "win32" || (ht.stdout || {}).isTTY && mt.TERM !== "dumb" || !!mt.CI), _a = /* @__PURE__ */ i((t, e, r = t) => (n) => {
    let s = "" + n, o = s.indexOf(e, t.length);
    return ~o ? t + wa(s, e, r, o) + e : t + s + e;
  }, "formatter"), wa = /* @__PURE__ */ i((t, e, r, n) => {
    let s = "", o = 0;
    do
      s += t.substring(o, n) + r, o = n + e.length, n = t.indexOf(e, o);
    while (~n);
    return s + t.substring(o);
  }, "replaceClose"), Sn = /* @__PURE__ */ i((t = va) => {
    let e = t ? _a : () => String;
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
  cr.exports = Sn();
  cr.exports.createColors = Sn;
});

// ../node_modules/walk-up-path/dist/cjs/index.js
var Rn = S((yt) => {
  "use strict";
  Object.defineProperty(yt, "__esModule", { value: !0 });
  yt.walkUp = void 0;
  var jn = require("path"), ka = /* @__PURE__ */ i(function* (t) {
    for (t = (0, jn.resolve)(t); t; ) {
      yield t;
      let e = (0, jn.dirname)(t);
      if (e === t)
        break;
      t = e;
    }
  }, "walkUp");
  yt.walkUp = ka;
});

// ../node_modules/zod/lib/helpers/util.js
var qe = S((C) => {
  "use strict";
  Object.defineProperty(C, "__esModule", { value: !0 });
  C.getParsedType = C.ZodParsedType = C.objectUtil = C.util = void 0;
  var fr;
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
  })(fr || (C.util = fr = {}));
  var Dn;
  (function(t) {
    t.mergeShapes = (e, r) => ({
      ...e,
      ...r
      // second overwrites first
    });
  })(Dn || (C.objectUtil = Dn = {}));
  C.ZodParsedType = fr.arrayToEnum([
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
  var Sa = /* @__PURE__ */ i((t) => {
    switch (typeof t) {
      case "undefined":
        return C.ZodParsedType.undefined;
      case "string":
        return C.ZodParsedType.string;
      case "number":
        return isNaN(t) ? C.ZodParsedType.nan : C.ZodParsedType.number;
      case "boolean":
        return C.ZodParsedType.boolean;
      case "function":
        return C.ZodParsedType.function;
      case "bigint":
        return C.ZodParsedType.bigint;
      case "symbol":
        return C.ZodParsedType.symbol;
      case "object":
        return Array.isArray(t) ? C.ZodParsedType.array : t === null ? C.ZodParsedType.null : t.then && typeof t.then == "function" && t.catch &&
        typeof t.catch == "function" ? C.ZodParsedType.promise : typeof Map < "u" && t instanceof Map ? C.ZodParsedType.map : typeof Set < "\
u" && t instanceof Set ? C.ZodParsedType.set : typeof Date < "u" && t instanceof Date ? C.ZodParsedType.date : C.ZodParsedType.object;
      default:
        return C.ZodParsedType.unknown;
    }
  }, "getParsedType");
  C.getParsedType = Sa;
});

// ../node_modules/zod/lib/ZodError.js
var bt = S((Y) => {
  "use strict";
  Object.defineProperty(Y, "__esModule", { value: !0 });
  Y.ZodError = Y.quotelessJson = Y.ZodIssueCode = void 0;
  var Un = qe();
  Y.ZodIssueCode = Un.util.arrayToEnum([
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
  var Ea = /* @__PURE__ */ i((t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:"), "quotelessJson");
  Y.quotelessJson = Ea;
  var Ge = class t extends Error {
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
      return JSON.stringify(this.issues, Un.util.jsonStringifyReplacer, 2);
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
  Y.ZodError = Ge;
  Ge.create = (t) => new Ge(t);
});

// ../node_modules/zod/lib/locales/en.js
var hr = S((mr) => {
  "use strict";
  Object.defineProperty(mr, "__esModule", { value: !0 });
  var se = qe(), O = bt(), Ca = /* @__PURE__ */ i((t, e) => {
    let r;
    switch (t.code) {
      case O.ZodIssueCode.invalid_type:
        t.received === se.ZodParsedType.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
        break;
      case O.ZodIssueCode.invalid_literal:
        r = `Invalid literal value, expected ${JSON.stringify(t.expected, se.util.jsonStringifyReplacer)}`;
        break;
      case O.ZodIssueCode.unrecognized_keys:
        r = `Unrecognized key(s) in object: ${se.util.joinValues(t.keys, ", ")}`;
        break;
      case O.ZodIssueCode.invalid_union:
        r = "Invalid input";
        break;
      case O.ZodIssueCode.invalid_union_discriminator:
        r = `Invalid discriminator value. Expected ${se.util.joinValues(t.options)}`;
        break;
      case O.ZodIssueCode.invalid_enum_value:
        r = `Invalid enum value. Expected ${se.util.joinValues(t.options)}, received '${t.received}'`;
        break;
      case O.ZodIssueCode.invalid_arguments:
        r = "Invalid function arguments";
        break;
      case O.ZodIssueCode.invalid_return_type:
        r = "Invalid function return type";
        break;
      case O.ZodIssueCode.invalid_date:
        r = "Invalid date";
        break;
      case O.ZodIssueCode.invalid_string:
        typeof t.validation == "object" ? "includes" in t.validation ? (r = `Invalid input: must include "${t.validation.includes}"`, typeof t.
        validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`)) : "start\
sWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input\
: must end with "${t.validation.endsWith}"` : se.util.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` :
        r = "Invalid";
        break;
      case O.ZodIssueCode.too_small:
        t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` :
        t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` :
        t.type === "number" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater tha\
n "}${t.minimum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "gre\
ater than "}${new Date(Number(t.minimum))}` : r = "Invalid input";
        break;
      case O.ZodIssueCode.too_big:
        t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` :
        t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` :
        t.type === "number" ? r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` :
        t.type === "bigint" ? r = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` :
        t.type === "date" ? r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(
        Number(t.maximum))}` : r = "Invalid input";
        break;
      case O.ZodIssueCode.custom:
        r = "Invalid input";
        break;
      case O.ZodIssueCode.invalid_intersection_types:
        r = "Intersection results could not be merged";
        break;
      case O.ZodIssueCode.not_multiple_of:
        r = `Number must be a multiple of ${t.multipleOf}`;
        break;
      case O.ZodIssueCode.not_finite:
        r = "Number must be finite";
        break;
      default:
        r = e.defaultError, se.util.assertNever(t);
    }
    return { message: r };
  }, "errorMap");
  mr.default = Ca;
});

// ../node_modules/zod/lib/errors.js
var vt = S((F) => {
  "use strict";
  var Pa = F && F.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(F, "__esModule", { value: !0 });
  F.getErrorMap = F.setErrorMap = F.defaultErrorMap = void 0;
  var $n = Pa(hr());
  F.defaultErrorMap = $n.default;
  var Vn = $n.default;
  function Aa(t) {
    Vn = t;
  }
  i(Aa, "setErrorMap");
  F.setErrorMap = Aa;
  function Oa() {
    return Vn;
  }
  i(Oa, "getErrorMap");
  F.getErrorMap = Oa;
});

// ../node_modules/zod/lib/helpers/parseUtil.js
var gr = S((I) => {
  "use strict";
  var ja = I && I.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(I, "__esModule", { value: !0 });
  I.isAsync = I.isValid = I.isDirty = I.isAborted = I.OK = I.DIRTY = I.INVALID = I.ParseStatus = I.addIssueToContext = I.EMPTY_PATH = I.makeIssue =
  void 0;
  var Ra = vt(), Fn = ja(hr()), Na = /* @__PURE__ */ i((t) => {
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
  I.makeIssue = Na;
  I.EMPTY_PATH = [];
  function Za(t, e) {
    let r = (0, Ra.getErrorMap)(), n = (0, I.makeIssue)({
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
        r === Fn.default ? void 0 : Fn.default
        // then global default map
      ].filter((s) => !!s)
    });
    t.common.issues.push(n);
  }
  i(Za, "addIssueToContext");
  I.addIssueToContext = Za;
  var yr = class t {
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
          return I.INVALID;
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
          return I.INVALID;
        o.status === "dirty" && e.dirty(), a.status === "dirty" && e.dirty(), o.value !== "__proto__" && (typeof a.value < "u" || s.alwaysSet) &&
        (n[o.value] = a.value);
      }
      return { status: e.value, value: n };
    }
  };
  I.ParseStatus = yr;
  I.INVALID = Object.freeze({
    status: "aborted"
  });
  var Ma = /* @__PURE__ */ i((t) => ({ status: "dirty", value: t }), "DIRTY");
  I.DIRTY = Ma;
  var La = /* @__PURE__ */ i((t) => ({ status: "valid", value: t }), "OK");
  I.OK = La;
  var Da = /* @__PURE__ */ i((t) => t.status === "aborted", "isAborted");
  I.isAborted = Da;
  var Ua = /* @__PURE__ */ i((t) => t.status === "dirty", "isDirty");
  I.isDirty = Ua;
  var $a = /* @__PURE__ */ i((t) => t.status === "valid", "isValid");
  I.isValid = $a;
  var Va = /* @__PURE__ */ i((t) => typeof Promise < "u" && t instanceof Promise, "isAsync");
  I.isAsync = Va;
});

// ../node_modules/zod/lib/helpers/typeAliases.js
var Wn = S((Bn) => {
  "use strict";
  Object.defineProperty(Bn, "__esModule", { value: !0 });
});

// ../node_modules/zod/lib/helpers/errorUtil.js
var Gn = S((_t) => {
  "use strict";
  Object.defineProperty(_t, "__esModule", { value: !0 });
  _t.errorUtil = void 0;
  var qn;
  (function(t) {
    t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e?.message;
  })(qn || (_t.errorUtil = qn = {}));
});

// ../node_modules/zod/lib/types.js
var os = S((d) => {
  "use strict";
  var kt = d && d.__classPrivateFieldGet || function(t, e, r, n) {
    if (r === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
    if (typeof e == "function" ? t !== e || !n : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did n\
ot declare it");
    return r === "m" ? n : r === "a" ? n.call(t) : n ? n.value : e.get(t);
  }, Jn = d && d.__classPrivateFieldSet || function(t, e, r, n, s) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !s) throw new TypeError("Private accessor was defined without a setter");
    if (typeof e == "function" ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did no\
t declare it");
    return n === "a" ? s.call(t, r) : s ? s.value = r : e.set(t, r), r;
  }, Ke, ze;
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
  var wt = vt(), y = Gn(), u = gr(), h = qe(), m = bt(), D = class {
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
  }, Kn = /* @__PURE__ */ i((t, e) => {
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
      return Kn(s, o);
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
      return Kn(n, o);
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
      return L.create(this, this._def);
    }
    nullable() {
      return W.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return K.create(this);
    }
    promise() {
      return Q.create(this, this._def);
    }
    or(e) {
      return le.create([this, e], this._def);
    }
    and(e) {
      return pe.create(this, e, this._def);
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
      return new ge({
        ...b(this._def),
        innerType: this,
        defaultValue: r,
        typeName: g.ZodDefault
      });
    }
    brand() {
      return new Je({
        typeName: g.ZodBranded,
        type: this,
        ...b(this._def)
      });
    }
    catch(e) {
      let r = typeof e == "function" ? e : () => e;
      return new xe({
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
      return Ye.create(this, e);
    }
    readonly() {
      return be.create(this);
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
  var Fa = /^c[^\s-]{8,}$/i, Ba = /^[0-9a-z]+$/, Wa = /^[0-9A-HJKMNP-TV-Z]{26}$/i, qa = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  Ga = /^[a-z0-9_-]{21}$/i, Ka = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, za = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  Ja = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Ya = "^(\\p{Extended_Pictographic}|\\p{Emoji_Comp\
onent})+$", xr, Ha = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Xa = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  Qa = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  ec = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  tc = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, rc = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  Yn = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469\
]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", nc = new RegExp(`^${Yn}$`);
  function Hn(t) {
    let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
    return t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`), e;
  }
  i(Hn, "timeRegexSource");
  function sc(t) {
    return new RegExp(`^${Hn(t)}$`);
  }
  i(sc, "timeRegex");
  function Xn(t) {
    let e = `${Yn}T${Hn(t)}`, r = [];
    return r.push(t.local ? "Z?" : "Z"), t.offset && r.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${r.join("|")})`, new RegExp(`^${e}$`);
  }
  i(Xn, "datetimeRegex");
  d.datetimeRegex = Xn;
  function oc(t, e) {
    return !!((e === "v4" || !e) && Ha.test(t) || (e === "v6" || !e) && Qa.test(t));
  }
  i(oc, "isValidIP");
  function ic(t, e) {
    if (!Ka.test(t))
      return !1;
    try {
      let [r] = t.split("."), n = r.replace(/-/g, "+").replace(/_/g, "/").padEnd(r.length + (4 - r.length % 4) % 4, "="), s = JSON.parse(atob(
      n));
      return !(typeof s != "object" || s === null || !s.typ || !s.alg || e && s.alg !== e);
    } catch {
      return !1;
    }
  }
  i(ic, "isValidJWT");
  function ac(t, e) {
    return !!((e === "v4" || !e) && Xa.test(t) || (e === "v6" || !e) && ec.test(t));
  }
  i(ac, "isValidCidr");
  var H = class t extends v {
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
          Ja.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
            validation: "email",
            code: m.ZodIssueCode.invalid_string,
            message: o.message
          }), n.dirty());
        else if (o.kind === "emoji")
          xr || (xr = new RegExp(Ya, "u")), xr.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
            validation: "emoji",
            code: m.ZodIssueCode.invalid_string,
            message: o.message
          }), n.dirty());
        else if (o.kind === "uuid")
          qa.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
            validation: "uuid",
            code: m.ZodIssueCode.invalid_string,
            message: o.message
          }), n.dirty());
        else if (o.kind === "nanoid")
          Ga.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
            validation: "nanoid",
            code: m.ZodIssueCode.invalid_string,
            message: o.message
          }), n.dirty());
        else if (o.kind === "cuid")
          Fa.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
            validation: "cuid",
            code: m.ZodIssueCode.invalid_string,
            message: o.message
          }), n.dirty());
        else if (o.kind === "cuid2")
          Ba.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
            validation: "cuid2",
            code: m.ZodIssueCode.invalid_string,
            message: o.message
          }), n.dirty());
        else if (o.kind === "ulid")
          Wa.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
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
        }), n.dirty()) : o.kind === "datetime" ? Xn(o).test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          code: m.ZodIssueCode.invalid_string,
          validation: "datetime",
          message: o.message
        }), n.dirty()) : o.kind === "date" ? nc.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          code: m.ZodIssueCode.invalid_string,
          validation: "date",
          message: o.message
        }), n.dirty()) : o.kind === "time" ? sc(o).test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          code: m.ZodIssueCode.invalid_string,
          validation: "time",
          message: o.message
        }), n.dirty()) : o.kind === "duration" ? za.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          validation: "duration",
          code: m.ZodIssueCode.invalid_string,
          message: o.message
        }), n.dirty()) : o.kind === "ip" ? oc(e.data, o.version) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          validation: "ip",
          code: m.ZodIssueCode.invalid_string,
          message: o.message
        }), n.dirty()) : o.kind === "jwt" ? ic(e.data, o.alg) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          validation: "jwt",
          code: m.ZodIssueCode.invalid_string,
          message: o.message
        }), n.dirty()) : o.kind === "cidr" ? ac(e.data, o.version) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          validation: "cidr",
          code: m.ZodIssueCode.invalid_string,
          message: o.message
        }), n.dirty()) : o.kind === "base64" ? tc.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
          validation: "base64",
          code: m.ZodIssueCode.invalid_string,
          message: o.message
        }), n.dirty()) : o.kind === "base64url" ? rc.test(e.data) || (s = this._getOrReturnCtx(e, s), (0, u.addIssueToContext)(s, {
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
  d.ZodString = H;
  H.create = (t) => {
    var e;
    return new H({
      checks: [],
      typeName: g.ZodString,
      coerce: (e = t?.coerce) !== null && e !== void 0 ? e : !1,
      ...b(t)
    });
  };
  function cc(t, e) {
    let r = (t.toString().split(".")[1] || "").length, n = (e.toString().split(".")[1] || "").length, s = r > n ? r : n, o = parseInt(t.toFixed(
    s).replace(".", "")), a = parseInt(e.toFixed(s).replace(".", ""));
    return o % a / Math.pow(10, s);
  }
  i(cc, "floatSafeRemainder");
  var oe = class t extends v {
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
        }), s.dirty()) : o.kind === "multipleOf" ? cc(e.data, o.value) !== 0 && (n = this._getOrReturnCtx(e, n), (0, u.addIssueToContext)(n,
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
  d.ZodNumber = oe;
  oe.create = (t) => new oe({
    checks: [],
    typeName: g.ZodNumber,
    coerce: t?.coerce || !1,
    ...b(t)
  });
  var ie = class t extends v {
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
  d.ZodBigInt = ie;
  ie.create = (t) => {
    var e;
    return new ie({
      checks: [],
      typeName: g.ZodBigInt,
      coerce: (e = t?.coerce) !== null && e !== void 0 ? e : !1,
      ...b(t)
    });
  };
  var ae = class extends v {
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
  d.ZodBoolean = ae;
  ae.create = (t) => new ae({
    typeName: g.ZodBoolean,
    coerce: t?.coerce || !1,
    ...b(t)
  });
  var ce = class t extends v {
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
  d.ZodDate = ce;
  ce.create = (t) => new ce({
    checks: [],
    coerce: t?.coerce || !1,
    typeName: g.ZodDate,
    ...b(t)
  });
  var Ie = class extends v {
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
  d.ZodSymbol = Ie;
  Ie.create = (t) => new Ie({
    typeName: g.ZodSymbol,
    ...b(t)
  });
  var de = class extends v {
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
  d.ZodUndefined = de;
  de.create = (t) => new de({
    typeName: g.ZodUndefined,
    ...b(t)
  });
  var ue = class extends v {
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
  d.ZodNull = ue;
  ue.create = (t) => new ue({
    typeName: g.ZodNull,
    ...b(t)
  });
  var X = class extends v {
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
  d.ZodAny = X;
  X.create = (t) => new X({
    typeName: g.ZodAny,
    ...b(t)
  });
  var G = class extends v {
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
  d.ZodUnknown = G;
  G.create = (t) => new G({
    typeName: g.ZodUnknown,
    ...b(t)
  });
  var $ = class extends v {
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
  d.ZodNever = $;
  $.create = (t) => new $({
    typeName: g.ZodNever,
    ...b(t)
  });
  var Se = class extends v {
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
  d.ZodVoid = Se;
  Se.create = (t) => new Se({
    typeName: g.ZodVoid,
    ...b(t)
  });
  var K = class t extends v {
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
        return Promise.all([...r.data].map((a, c) => s.type._parseAsync(new D(r, a, r.path, c)))).then((a) => u.ParseStatus.mergeArray(n, a));
      let o = [...r.data].map((a, c) => s.type._parseSync(new D(r, a, r.path, c)));
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
  d.ZodArray = K;
  K.create = (t, e) => new K({
    type: t,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: g.ZodArray,
    ...b(e)
  });
  function Te(t) {
    if (t instanceof R) {
      let e = {};
      for (let r in t.shape) {
        let n = t.shape[r];
        e[r] = L.create(Te(n));
      }
      return new R({
        ...t._def,
        shape: /* @__PURE__ */ i(() => e, "shape")
      });
    } else return t instanceof K ? new K({
      ...t._def,
      type: Te(t.element)
    }) : t instanceof L ? L.create(Te(t.unwrap())) : t instanceof W ? W.create(Te(t.unwrap())) : t instanceof B ? B.create(t.items.map((e) => Te(
    e))) : t;
  }
  i(Te, "deepPartialify");
  var R = class t extends v {
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
      if (!(this._def.catchall instanceof $ && this._def.unknownKeys === "strip"))
        for (let p in s.data)
          a.includes(p) || c.push(p);
      let l = [];
      for (let p of a) {
        let f = o[p], x = s.data[p];
        l.push({
          key: { status: "valid", value: p },
          value: f._parse(new D(s, x, s.path, p)),
          alwaysSet: p in s.data
        });
      }
      if (this._def.catchall instanceof $) {
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
              new D(s, x, s.path, f)
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
      return Te(this);
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
          for (; o instanceof L; )
            o = o._def.innerType;
          r[n] = o;
        }
      }), new t({
        ...this._def,
        shape: /* @__PURE__ */ i(() => r, "shape")
      });
    }
    keyof() {
      return Qn(h.util.objectKeys(this.shape));
    }
  };
  d.ZodObject = R;
  R.create = (t, e) => new R({
    shape: /* @__PURE__ */ i(() => t, "shape"),
    unknownKeys: "strip",
    catchall: $.create(),
    typeName: g.ZodObject,
    ...b(e)
  });
  R.strictCreate = (t, e) => new R({
    shape: /* @__PURE__ */ i(() => t, "shape"),
    unknownKeys: "strict",
    catchall: $.create(),
    typeName: g.ZodObject,
    ...b(e)
  });
  R.lazycreate = (t, e) => new R({
    shape: t,
    unknownKeys: "strip",
    catchall: $.create(),
    typeName: g.ZodObject,
    ...b(e)
  });
  var le = class extends v {
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
  d.ZodUnion = le;
  le.create = (t, e) => new le({
    options: t,
    typeName: g.ZodUnion,
    ...b(e)
  });
  var q = /* @__PURE__ */ i((t) => t instanceof fe ? q(t.schema) : t instanceof Z ? q(t.innerType()) : t instanceof me ? [t.value] : t instanceof
  he ? t.options : t instanceof ye ? h.util.objectValues(t.enum) : t instanceof ge ? q(t._def.innerType) : t instanceof de ? [void 0] : t instanceof
  ue ? [null] : t instanceof L ? [void 0, ...q(t.unwrap())] : t instanceof W ? [null, ...q(t.unwrap())] : t instanceof Je || t instanceof be ?
  q(t.unwrap()) : t instanceof xe ? q(t._def.innerType) : [], "getDiscriminator"), Tt = class t extends v {
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
        let a = q(o.shape[e]);
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
  d.ZodDiscriminatedUnion = Tt;
  function br(t, e) {
    let r = (0, h.getParsedType)(t), n = (0, h.getParsedType)(e);
    if (t === e)
      return { valid: !0, data: t };
    if (r === h.ZodParsedType.object && n === h.ZodParsedType.object) {
      let s = h.util.objectKeys(e), o = h.util.objectKeys(t).filter((c) => s.indexOf(c) !== -1), a = { ...t, ...e };
      for (let c of o) {
        let l = br(t[c], e[c]);
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
        let a = t[o], c = e[o], l = br(a, c);
        if (!l.valid)
          return { valid: !1 };
        s.push(l.data);
      }
      return { valid: !0, data: s };
    } else return r === h.ZodParsedType.date && n === h.ZodParsedType.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
  }
  i(br, "mergeValues");
  var pe = class extends v {
    static {
      i(this, "ZodIntersection");
    }
    _parse(e) {
      let { status: r, ctx: n } = this._processInputParams(e), s = /* @__PURE__ */ i((o, a) => {
        if ((0, u.isAborted)(o) || (0, u.isAborted)(a))
          return u.INVALID;
        let c = br(o.value, a.value);
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
  d.ZodIntersection = pe;
  pe.create = (t, e, r) => new pe({
    left: t,
    right: e,
    typeName: g.ZodIntersection,
    ...b(r)
  });
  var B = class t extends v {
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
        return l ? l._parse(new D(n, a, n.path, c)) : null;
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
  d.ZodTuple = B;
  B.create = (t, e) => {
    if (!Array.isArray(t))
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new B({
      items: t,
      typeName: g.ZodTuple,
      rest: null,
      ...b(e)
    });
  };
  var It = class t extends v {
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
          key: o._parse(new D(n, c, n.path, c)),
          value: a._parse(new D(n, n.data[c], n.path, c)),
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
        keyType: H.create(),
        valueType: e,
        typeName: g.ZodRecord,
        ...b(r)
      });
    }
  };
  d.ZodRecord = It;
  var Ee = class extends v {
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
        key: s._parse(new D(n, c, n.path, [p, "key"])),
        value: o._parse(new D(n, l, n.path, [p, "value"]))
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
  d.ZodMap = Ee;
  Ee.create = (t, e, r) => new Ee({
    valueType: e,
    keyType: t,
    typeName: g.ZodMap,
    ...b(r)
  });
  var Ce = class t extends v {
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
      let c = [...n.data.values()].map((l, p) => o._parse(new D(n, l, n.path, p)));
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
  d.ZodSet = Ce;
  Ce.create = (t, e) => new Ce({
    valueType: t,
    minSize: null,
    maxSize: null,
    typeName: g.ZodSet,
    ...b(e)
  });
  var St = class t extends v {
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
            (0, wt.getErrorMap)(),
            wt.defaultErrorMap
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
            (0, wt.getErrorMap)(),
            wt.defaultErrorMap
          ].filter((p) => !!p),
          issueData: {
            code: m.ZodIssueCode.invalid_return_type,
            returnTypeError: l
          }
        });
      }
      i(s, "makeReturnsIssue");
      let o = { errorMap: r.common.contextualErrorMap }, a = r.data;
      if (this._def.returns instanceof Q) {
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
        args: B.create(e).rest(G.create())
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
        args: e || B.create([]).rest(G.create()),
        returns: r || G.create(),
        typeName: g.ZodFunction,
        ...b(n)
      });
    }
  };
  d.ZodFunction = St;
  var fe = class extends v {
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
  d.ZodLazy = fe;
  fe.create = (t, e) => new fe({
    getter: t,
    typeName: g.ZodLazy,
    ...b(e)
  });
  var me = class extends v {
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
  d.ZodLiteral = me;
  me.create = (t, e) => new me({
    value: t,
    typeName: g.ZodLiteral,
    ...b(e)
  });
  function Qn(t, e) {
    return new he({
      values: t,
      typeName: g.ZodEnum,
      ...b(e)
    });
  }
  i(Qn, "createZodEnum");
  var he = class t extends v {
    static {
      i(this, "ZodEnum");
    }
    constructor() {
      super(...arguments), Ke.set(this, void 0);
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
      if (kt(this, Ke, "f") || Jn(this, Ke, new Set(this._def.values), "f"), !kt(this, Ke, "f").has(e.data)) {
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
  d.ZodEnum = he;
  Ke = /* @__PURE__ */ new WeakMap();
  he.create = Qn;
  var ye = class extends v {
    static {
      i(this, "ZodNativeEnum");
    }
    constructor() {
      super(...arguments), ze.set(this, void 0);
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
      if (kt(this, ze, "f") || Jn(this, ze, new Set(h.util.getValidEnumValues(this._def.values)), "f"), !kt(this, ze, "f").has(e.data)) {
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
  d.ZodNativeEnum = ye;
  ze = /* @__PURE__ */ new WeakMap();
  ye.create = (t, e) => new ye({
    values: t,
    typeName: g.ZodNativeEnum,
    ...b(e)
  });
  var Q = class extends v {
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
  d.ZodPromise = Q;
  Q.create = (t, e) => new Q({
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
  var L = class extends v {
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
  d.ZodOptional = L;
  L.create = (t, e) => new L({
    innerType: t,
    typeName: g.ZodOptional,
    ...b(e)
  });
  var W = class extends v {
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
  d.ZodNullable = W;
  W.create = (t, e) => new W({
    innerType: t,
    typeName: g.ZodNullable,
    ...b(e)
  });
  var ge = class extends v {
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
  d.ZodDefault = ge;
  ge.create = (t, e) => new ge({
    innerType: t,
    typeName: g.ZodDefault,
    defaultValue: typeof e.default == "function" ? e.default : () => e.default,
    ...b(e)
  });
  var xe = class extends v {
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
  d.ZodCatch = xe;
  xe.create = (t, e) => new xe({
    innerType: t,
    typeName: g.ZodCatch,
    catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
    ...b(e)
  });
  var Pe = class extends v {
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
  d.ZodNaN = Pe;
  Pe.create = (t) => new Pe({
    typeName: g.ZodNaN,
    ...b(t)
  });
  d.BRAND = Symbol("zod_brand");
  var Je = class extends v {
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
  d.ZodBranded = Je;
  var Ye = class t extends v {
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
  d.ZodPipeline = Ye;
  var be = class extends v {
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
  d.ZodReadonly = be;
  be.create = (t, e) => new be({
    innerType: t,
    typeName: g.ZodReadonly,
    ...b(e)
  });
  function zn(t, e) {
    let r = typeof t == "function" ? t(e) : typeof t == "string" ? { message: t } : t;
    return typeof r == "string" ? { message: r } : r;
  }
  i(zn, "cleanParams");
  function es(t, e = {}, r) {
    return t ? X.create().superRefine((n, s) => {
      var o, a;
      let c = t(n);
      if (c instanceof Promise)
        return c.then((l) => {
          var p, f;
          if (!l) {
            let x = zn(e, n), w = (f = (p = x.fatal) !== null && p !== void 0 ? p : r) !== null && f !== void 0 ? f : !0;
            s.addIssue({ code: "custom", ...x, fatal: w });
          }
        });
      if (!c) {
        let l = zn(e, n), p = (a = (o = l.fatal) !== null && o !== void 0 ? o : r) !== null && a !== void 0 ? a : !0;
        s.addIssue({ code: "custom", ...l, fatal: p });
      }
    }) : X.create();
  }
  i(es, "custom");
  d.custom = es;
  d.late = {
    object: R.lazycreate
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
  var dc = /* @__PURE__ */ i((t, e = {
    message: `Input not instance of ${t.name}`
  }) => es((r) => r instanceof t, e), "instanceOfType");
  d.instanceof = dc;
  var ts = H.create;
  d.string = ts;
  var rs = oe.create;
  d.number = rs;
  var uc = Pe.create;
  d.nan = uc;
  var lc = ie.create;
  d.bigint = lc;
  var ns = ae.create;
  d.boolean = ns;
  var pc = ce.create;
  d.date = pc;
  var fc = Ie.create;
  d.symbol = fc;
  var mc = de.create;
  d.undefined = mc;
  var hc = ue.create;
  d.null = hc;
  var yc = X.create;
  d.any = yc;
  var gc = G.create;
  d.unknown = gc;
  var xc = $.create;
  d.never = xc;
  var bc = Se.create;
  d.void = bc;
  var vc = K.create;
  d.array = vc;
  var _c = R.create;
  d.object = _c;
  var wc = R.strictCreate;
  d.strictObject = wc;
  var kc = le.create;
  d.union = kc;
  var Tc = Tt.create;
  d.discriminatedUnion = Tc;
  var Ic = pe.create;
  d.intersection = Ic;
  var Sc = B.create;
  d.tuple = Sc;
  var Ec = It.create;
  d.record = Ec;
  var Cc = Ee.create;
  d.map = Cc;
  var Pc = Ce.create;
  d.set = Pc;
  var Ac = St.create;
  d.function = Ac;
  var Oc = fe.create;
  d.lazy = Oc;
  var jc = me.create;
  d.literal = jc;
  var Rc = he.create;
  d.enum = Rc;
  var Nc = ye.create;
  d.nativeEnum = Nc;
  var Zc = Q.create;
  d.promise = Zc;
  var ss = Z.create;
  d.effect = ss;
  d.transformer = ss;
  var Mc = L.create;
  d.optional = Mc;
  var Lc = W.create;
  d.nullable = Lc;
  var Dc = Z.createWithPreprocess;
  d.preprocess = Dc;
  var Uc = Ye.create;
  d.pipeline = Uc;
  var $c = /* @__PURE__ */ i(() => ts().optional(), "ostring");
  d.ostring = $c;
  var Vc = /* @__PURE__ */ i(() => rs().optional(), "onumber");
  d.onumber = Vc;
  var Fc = /* @__PURE__ */ i(() => ns().optional(), "oboolean");
  d.oboolean = Fc;
  d.coerce = {
    string: /* @__PURE__ */ i((t) => H.create({ ...t, coerce: !0 }), "string"),
    number: /* @__PURE__ */ i((t) => oe.create({ ...t, coerce: !0 }), "number"),
    boolean: /* @__PURE__ */ i((t) => ae.create({
      ...t,
      coerce: !0
    }), "boolean"),
    bigint: /* @__PURE__ */ i((t) => ie.create({ ...t, coerce: !0 }), "bigint"),
    date: /* @__PURE__ */ i((t) => ce.create({ ...t, coerce: !0 }), "date")
  };
  d.NEVER = u.INVALID;
});

// ../node_modules/zod/lib/external.js
var vr = S((U) => {
  "use strict";
  var Bc = U && U.__createBinding || (Object.create ? function(t, e, r, n) {
    n === void 0 && (n = r);
    var s = Object.getOwnPropertyDescriptor(e, r);
    (!s || ("get" in s ? !e.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return e[r];
    }, "get") }), Object.defineProperty(t, n, s);
  } : function(t, e, r, n) {
    n === void 0 && (n = r), t[n] = e[r];
  }), Ae = U && U.__exportStar || function(t, e) {
    for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && Bc(e, t, r);
  };
  Object.defineProperty(U, "__esModule", { value: !0 });
  Ae(vt(), U);
  Ae(gr(), U);
  Ae(Wn(), U);
  Ae(qe(), U);
  Ae(os(), U);
  Ae(bt(), U);
});

// ../node_modules/zod/lib/index.js
var cs = S((N) => {
  "use strict";
  var is = N && N.__createBinding || (Object.create ? function(t, e, r, n) {
    n === void 0 && (n = r);
    var s = Object.getOwnPropertyDescriptor(e, r);
    (!s || ("get" in s ? !e.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return e[r];
    }, "get") }), Object.defineProperty(t, n, s);
  } : function(t, e, r, n) {
    n === void 0 && (n = r), t[n] = e[r];
  }), Wc = N && N.__setModuleDefault || (Object.create ? function(t, e) {
    Object.defineProperty(t, "default", { enumerable: !0, value: e });
  } : function(t, e) {
    t.default = e;
  }), qc = N && N.__importStar || function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (t != null) for (var r in t) r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && is(e, t, r);
    return Wc(e, t), e;
  }, Gc = N && N.__exportStar || function(t, e) {
    for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && is(e, t, r);
  };
  Object.defineProperty(N, "__esModule", { value: !0 });
  N.z = void 0;
  var as = qc(vr());
  N.z = as;
  Gc(vr(), N);
  N.default = as;
});

// ../node_modules/ts-dedent/dist/index.js
var us = S((He) => {
  "use strict";
  Object.defineProperty(He, "__esModule", { value: !0 });
  He.dedent = void 0;
  function ds(t) {
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
  i(ds, "dedent");
  He.dedent = ds;
  He.default = ds;
});

// ../node_modules/isexe/windows.js
var bs = S((ip, xs) => {
  xs.exports = gs;
  gs.sync = Hc;
  var hs = require("fs");
  function Yc(t, e) {
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
  i(Yc, "checkPathExt");
  function ys(t, e, r) {
    return !t.isSymbolicLink() && !t.isFile() ? !1 : Yc(e, r);
  }
  i(ys, "checkStat");
  function gs(t, e, r) {
    hs.stat(t, function(n, s) {
      r(n, n ? !1 : ys(s, t, e));
    });
  }
  i(gs, "isexe");
  function Hc(t, e) {
    return ys(hs.statSync(t), t, e);
  }
  i(Hc, "sync");
});

// ../node_modules/isexe/mode.js
var Ts = S((cp, ks) => {
  ks.exports = _s;
  _s.sync = Xc;
  var vs = require("fs");
  function _s(t, e, r) {
    vs.stat(t, function(n, s) {
      r(n, n ? !1 : ws(s, e));
    });
  }
  i(_s, "isexe");
  function Xc(t, e) {
    return ws(vs.statSync(t), e);
  }
  i(Xc, "sync");
  function ws(t, e) {
    return t.isFile() && Qc(t, e);
  }
  i(ws, "checkStat");
  function Qc(t, e) {
    var r = t.mode, n = t.uid, s = t.gid, o = e.uid !== void 0 ? e.uid : process.getuid && process.getuid(), a = e.gid !== void 0 ? e.gid : process.
    getgid && process.getgid(), c = parseInt("100", 8), l = parseInt("010", 8), p = parseInt("001", 8), f = c | l, x = r & p || r & l && s ===
    a || r & c && n === o || r & f && o === 0;
    return x;
  }
  i(Qc, "checkMode");
});

// ../node_modules/isexe/index.js
var Ss = S((lp, Is) => {
  var up = require("fs"), jt;
  process.platform === "win32" || global.TESTING_WINDOWS ? jt = bs() : jt = Ts();
  Is.exports = _r;
  _r.sync = ed;
  function _r(t, e, r) {
    if (typeof e == "function" && (r = e, e = {}), !r) {
      if (typeof Promise != "function")
        throw new TypeError("callback not provided");
      return new Promise(function(n, s) {
        _r(t, e || {}, function(o, a) {
          o ? s(o) : n(a);
        });
      });
    }
    jt(t, e || {}, function(n, s) {
      n && (n.code === "EACCES" || e && e.ignoreErrors) && (n = null, s = !1), r(n, s);
    });
  }
  i(_r, "isexe");
  function ed(t, e) {
    try {
      return jt.sync(t, e || {});
    } catch (r) {
      if (e && e.ignoreErrors || r.code === "EACCES")
        return !1;
      throw r;
    }
  }
  i(ed, "sync");
});

// ../node_modules/which/which.js
var Rs = S((fp, js) => {
  var Re = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", Es = require("path"), td = Re ?
  ";" : ":", Cs = Ss(), Ps = /* @__PURE__ */ i((t) => Object.assign(new Error(`not found: ${t}`), { code: "ENOENT" }), "getNotFoundError"), As = /* @__PURE__ */ i(
  (t, e) => {
    let r = e.colon || td, n = t.match(/\//) || Re && t.match(/\\/) ? [""] : [
      // windows always checks the cwd first
      ...Re ? [process.cwd()] : [],
      ...(e.path || process.env.PATH || /* istanbul ignore next: very unusual */
      "").split(r)
    ], s = Re ? e.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", o = Re ? s.split(r) : [""];
    return Re && t.indexOf(".") !== -1 && o[0] !== "" && o.unshift(""), {
      pathEnv: n,
      pathExt: o,
      pathExtExe: s
    };
  }, "getPathInfo"), Os = /* @__PURE__ */ i((t, e, r) => {
    typeof e == "function" && (r = e, e = {}), e || (e = {});
    let { pathEnv: n, pathExt: s, pathExtExe: o } = As(t, e), a = [], c = /* @__PURE__ */ i((p) => new Promise((f, x) => {
      if (p === n.length)
        return e.all && a.length ? f(a) : x(Ps(t));
      let w = n[p], _ = /^".*"$/.test(w) ? w.slice(1, -1) : w, P = Es.join(_, t), E = !_ && /^\.[\\\/]/.test(t) ? t.slice(0, 2) + P : P;
      f(l(E, p, 0));
    }), "step"), l = /* @__PURE__ */ i((p, f, x) => new Promise((w, _) => {
      if (x === s.length)
        return w(c(f + 1));
      let P = s[x];
      Cs(p + P, { pathExt: o }, (E, A) => {
        if (!E && A)
          if (e.all)
            a.push(p + P);
          else
            return w(p + P);
        return w(l(p, f, x + 1));
      });
    }), "subStep");
    return r ? c(0).then((p) => r(null, p), r) : c(0);
  }, "which"), rd = /* @__PURE__ */ i((t, e) => {
    e = e || {};
    let { pathEnv: r, pathExt: n, pathExtExe: s } = As(t, e), o = [];
    for (let a = 0; a < r.length; a++) {
      let c = r[a], l = /^".*"$/.test(c) ? c.slice(1, -1) : c, p = Es.join(l, t), f = !l && /^\.[\\\/]/.test(t) ? t.slice(0, 2) + p : p;
      for (let x = 0; x < n.length; x++) {
        let w = f + n[x];
        try {
          if (Cs.sync(w, { pathExt: s }))
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
    throw Ps(t);
  }, "whichSync");
  js.exports = Os;
  Os.sync = rd;
});

// ../node_modules/path-key/index.js
var Zs = S((hp, wr) => {
  "use strict";
  var Ns = /* @__PURE__ */ i((t = {}) => {
    let e = t.env || process.env;
    return (t.platform || process.platform) !== "win32" ? "PATH" : Object.keys(e).reverse().find((n) => n.toUpperCase() === "PATH") || "Path";
  }, "pathKey");
  wr.exports = Ns;
  wr.exports.default = Ns;
});

// ../node_modules/cross-spawn/lib/util/resolveCommand.js
var Us = S((gp, Ds) => {
  "use strict";
  var Ms = require("path"), nd = Rs(), sd = Zs();
  function Ls(t, e) {
    let r = t.options.env || process.env, n = process.cwd(), s = t.options.cwd != null, o = s && process.chdir !== void 0 && !process.chdir.
    disabled;
    if (o)
      try {
        process.chdir(t.options.cwd);
      } catch {
      }
    let a;
    try {
      a = nd.sync(t.command, {
        path: r[sd({ env: r })],
        pathExt: e ? Ms.delimiter : void 0
      });
    } catch {
    } finally {
      o && process.chdir(n);
    }
    return a && (a = Ms.resolve(s ? t.options.cwd : "", a)), a;
  }
  i(Ls, "resolveCommandAttempt");
  function od(t) {
    return Ls(t) || Ls(t, !0);
  }
  i(od, "resolveCommand");
  Ds.exports = od;
});

// ../node_modules/cross-spawn/lib/util/escape.js
var $s = S((bp, Tr) => {
  "use strict";
  var kr = /([()\][%!^"`<>&|;, *?])/g;
  function id(t) {
    return t = t.replace(kr, "^$1"), t;
  }
  i(id, "escapeCommand");
  function ad(t, e) {
    return t = `${t}`, t = t.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"'), t = t.replace(/(?=(\\+?)?)\1$/, "$1$1"), t = `"${t}"`, t = t.replace(kr,
    "^$1"), e && (t = t.replace(kr, "^$1")), t;
  }
  i(ad, "escapeArgument");
  Tr.exports.command = id;
  Tr.exports.argument = ad;
});

// ../node_modules/shebang-regex/index.js
var Fs = S((_p, Vs) => {
  "use strict";
  Vs.exports = /^#!(.*)/;
});

// ../node_modules/shebang-command/index.js
var Ws = S((wp, Bs) => {
  "use strict";
  var cd = Fs();
  Bs.exports = (t = "") => {
    let e = t.match(cd);
    if (!e)
      return null;
    let [r, n] = e[0].replace(/#! ?/, "").split(" "), s = r.split("/").pop();
    return s === "env" ? n : n ? `${s} ${n}` : s;
  };
});

// ../node_modules/cross-spawn/lib/util/readShebang.js
var Gs = S((kp, qs) => {
  "use strict";
  var Ir = require("fs"), dd = Ws();
  function ud(t) {
    let r = Buffer.alloc(150), n;
    try {
      n = Ir.openSync(t, "r"), Ir.readSync(n, r, 0, 150, 0), Ir.closeSync(n);
    } catch {
    }
    return dd(r.toString());
  }
  i(ud, "readShebang");
  qs.exports = ud;
});

// ../node_modules/cross-spawn/lib/parse.js
var Ys = S((Ip, Js) => {
  "use strict";
  var ld = require("path"), Ks = Us(), zs = $s(), pd = Gs(), fd = process.platform === "win32", md = /\.(?:com|exe)$/i, hd = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function yd(t) {
    t.file = Ks(t);
    let e = t.file && pd(t.file);
    return e ? (t.args.unshift(t.file), t.command = e, Ks(t)) : t.file;
  }
  i(yd, "detectShebang");
  function gd(t) {
    if (!fd)
      return t;
    let e = yd(t), r = !md.test(e);
    if (t.options.forceShell || r) {
      let n = hd.test(e);
      t.command = ld.normalize(t.command), t.command = zs.command(t.command), t.args = t.args.map((o) => zs.argument(o, n));
      let s = [t.command].concat(t.args).join(" ");
      t.args = ["/d", "/s", "/c", `"${s}"`], t.command = process.env.comspec || "cmd.exe", t.options.windowsVerbatimArguments = !0;
    }
    return t;
  }
  i(gd, "parseNonShell");
  function xd(t, e, r) {
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
    return r.shell ? n : gd(n);
  }
  i(xd, "parse");
  Js.exports = xd;
});

// ../node_modules/cross-spawn/lib/enoent.js
var Qs = S((Ep, Xs) => {
  "use strict";
  var Sr = process.platform === "win32";
  function Er(t, e) {
    return Object.assign(new Error(`${e} ${t.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${e} ${t.command}`,
      path: t.command,
      spawnargs: t.args
    });
  }
  i(Er, "notFoundError");
  function bd(t, e) {
    if (!Sr)
      return;
    let r = t.emit;
    t.emit = function(n, s) {
      if (n === "exit") {
        let o = Hs(s, e);
        if (o)
          return r.call(t, "error", o);
      }
      return r.apply(t, arguments);
    };
  }
  i(bd, "hookChildProcess");
  function Hs(t, e) {
    return Sr && t === 1 && !e.file ? Er(e.original, "spawn") : null;
  }
  i(Hs, "verifyENOENT");
  function vd(t, e) {
    return Sr && t === 1 && !e.file ? Er(e.original, "spawnSync") : null;
  }
  i(vd, "verifyENOENTSync");
  Xs.exports = {
    hookChildProcess: bd,
    verifyENOENT: Hs,
    verifyENOENTSync: vd,
    notFoundError: Er
  };
});

// ../node_modules/cross-spawn/index.js
var ro = S((Pp, Ne) => {
  "use strict";
  var eo = require("child_process"), Cr = Ys(), Pr = Qs();
  function to(t, e, r) {
    let n = Cr(t, e, r), s = eo.spawn(n.command, n.args, n.options);
    return Pr.hookChildProcess(s, n), s;
  }
  i(to, "spawn");
  function _d(t, e, r) {
    let n = Cr(t, e, r), s = eo.spawnSync(n.command, n.args, n.options);
    return s.error = s.error || Pr.verifyENOENTSync(s.status, n), s;
  }
  i(_d, "spawnSync");
  Ne.exports = to;
  Ne.exports.spawn = to;
  Ne.exports.sync = _d;
  Ne.exports._parse = Cr;
  Ne.exports._enoent = Pr;
});

// ../node_modules/merge-stream/index.js
var Zo = S((Kf, No) => {
  "use strict";
  var { PassThrough: fu } = require("stream");
  No.exports = function() {
    var t = [], e = new fu({ objectMode: !0 });
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
function tn(t) {
  return t.startsWith("\\\\?\\") ? t : t.replace(/\\/g, "/");
}
var ci = ga(() => {
  i(tn, "slash");
});

// ../node_modules/common-path-prefix/index.js
var li = S((Em, ui) => {
  "use strict";
  var { sep: Eu } = require("path"), Cu = /* @__PURE__ */ i((t) => {
    for (let e of t) {
      let r = /(\/|\\)/.exec(e);
      if (r !== null) return r[0];
    }
    return Eu;
  }, "determineSeparator");
  ui.exports = /* @__PURE__ */ i(function(e, r = Cu(e)) {
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
var Hi = S((dg, Yi) => {
  "use strict";
  Yi.exports = function(t, e) {
    if (e = e || {}, typeof t != "function")
      throw new re("fetch must be a function");
    if (typeof e != "object")
      throw new re("defaults must be an object");
    if (e.retries !== void 0 && !nr(e.retries))
      throw new re("retries must be a positive integer");
    if (e.retryDelay !== void 0 && !nr(e.retryDelay) && typeof e.retryDelay != "function")
      throw new re("retryDelay must be a positive integer or a function returning a positive integer");
    if (e.retryOn !== void 0 && !Array.isArray(e.retryOn) && typeof e.retryOn != "function")
      throw new re("retryOn property expects an array or function");
    var r = {
      retries: 3,
      retryDelay: 1e3,
      retryOn: []
    };
    return e = Object.assign(r, e), /* @__PURE__ */ i(function(s, o) {
      var a = e.retries, c = e.retryDelay, l = e.retryOn;
      if (o && o.retries !== void 0)
        if (nr(o.retries))
          a = o.retries;
        else
          throw new re("retries must be a positive integer");
      if (o && o.retryDelay !== void 0)
        if (nr(o.retryDelay) || typeof o.retryDelay == "function")
          c = o.retryDelay;
        else
          throw new re("retryDelay must be a positive integer or a function returning a positive integer");
      if (o && o.retryOn)
        if (Array.isArray(o.retryOn) || typeof o.retryOn == "function")
          l = o.retryOn;
        else
          throw new re("retryOn property expects an array or function");
      return new Promise(function(p, f) {
        var x = /* @__PURE__ */ i(function(_) {
          var P = typeof Request < "u" && s instanceof Request ? s.clone() : s;
          t(P, o).then(function(E) {
            if (Array.isArray(l) && l.indexOf(E.status) === -1)
              p(E);
            else if (typeof l == "function")
              try {
                return Promise.resolve(l(_, null, E)).then(function(A) {
                  A ? w(_, null, E) : p(E);
                }).catch(f);
              } catch (A) {
                f(A);
              }
            else
              _ < a ? w(_, null, E) : p(E);
          }).catch(function(E) {
            if (typeof l == "function")
              try {
                Promise.resolve(l(_, E, null)).then(function(A) {
                  A ? w(_, E, null) : f(E);
                }).catch(function(A) {
                  f(A);
                });
              } catch (A) {
                f(A);
              }
            else _ < a ? w(_, E, null) : f(E);
          });
        }, "wrappedFetch");
        function w(_, P, E) {
          var A = typeof c == "function" ? c(_, P, E) : c;
          setTimeout(function() {
            x(++_);
          }, A);
        }
        i(w, "retry"), x(0);
      });
    }, "fetchRetry");
  };
  function nr(t) {
    return Number.isInteger(t) && t >= 0;
  }
  i(nr, "isPositiveInteger");
  function re(t) {
    this.name = "ArgumentError", this.message = t;
  }
  i(re, "ArgumentError");
});

// src/telemetry/index.ts
var bl = {};
xa(bl, {
  addToGlobalContext: () => ua,
  cleanPaths: () => ke,
  computeStorybookMetadata: () => Ji,
  getPrecedingUpgrade: () => ia,
  getStorybookMetadata: () => gn,
  isExampleStoryId: () => gl,
  metaFrameworks: () => hn,
  oneWayHash: () => sr,
  removeAnsiEscapeCodes: () => ur,
  sanitizeAddonName: () => yn,
  sanitizeError: () => We,
  telemetry: () => xl
});
module.exports = ba(bl);
var kn = require("storybook/internal/node-logger");

// src/telemetry/notify.ts
var dr = require("storybook/internal/common"), ne = require("storybook/internal/node-logger"), Pn = k(En(), 1);
var Cn = "telemetry-notification-date", An = /* @__PURE__ */ i(async () => {
  await dr.cache.get(Cn, null) || (dr.cache.set(Cn, Date.now()), ne.logger.log(
    `${ne.CLI_COLORS.info("Attention:")} Storybook now collects completely anonymous telemetry regarding usage. This information is used to \
shape Storybook's roadmap and prioritize features.`
  ), ne.logger.log(
    "You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:"
  ), ne.logger.log(Pn.default.cyan("https://storybook.js.org/telemetry")), ne.logger.log(""));
}, "notify");

// src/telemetry/sanitize.ts
var lr = k(require("node:path"), 1);
function On(t) {
  return t.replace(/[-[/{}()*+?.\\^$|]/g, "\\$&");
}
i(On, "regexpEscape");
function ur(t = "") {
  return t.replace(/\u001B\[[0-9;]*m/g, "");
}
i(ur, "removeAnsiEscapeCodes");
function ke(t, e = lr.default.sep) {
  if (!t)
    return t;
  let r = process.cwd().split(e);
  for (; r.length > 1; ) {
    let n = r.join(e), s = new RegExp(On(n), "gi");
    t = t.replace(s, "$SNIP");
    let o = r.join(e + e), a = new RegExp(On(o), "gi");
    t = t.replace(a, "$SNIP"), r.pop();
  }
  return t;
}
i(ke, "cleanPaths");
function We(t, e = lr.default.sep) {
  try {
    t = {
      ...JSON.parse(JSON.stringify(t)),
      message: ur(t.message),
      stack: ur(t.stack),
      cause: t.cause,
      name: t.name
    };
    let r = ke(JSON.stringify(t), e);
    return JSON.parse(r);
  } catch (r) {
    return `Sanitization error: ${r?.message}`;
  }
}
i(We, "sanitizeError");

// src/telemetry/storybook-metadata.ts
var Ki = require("node:path"), te = require("storybook/internal/common"), zi = require("storybook/internal/csf-tools");

// ../node_modules/fd-package-json/dist/esm/main.js
var Nn = k(Rn(), 1), Zn = require("node:path"), gt = require("node:fs/promises"), Mn = require("node:fs");
async function Ta(t) {
  try {
    return (await (0, gt.stat)(t)).isFile();
  } catch {
    return !1;
  }
}
i(Ta, "fileExists");
async function pr(t) {
  for (let e of (0, Nn.walkUp)(t)) {
    let r = (0, Zn.resolve)(e, "package.json");
    if (await Ta(r))
      return r;
  }
  return null;
}
i(pr, "findPackagePath");
async function Ln(t) {
  let e = await pr(t);
  if (!e)
    return null;
  try {
    let r = await (0, gt.readFile)(e, { encoding: "utf8" });
    return JSON.parse(r);
  } catch {
    return null;
  }
}
i(Ln, "findPackage");

// package.json
var xt = "9.0.18";

// src/cli/globalSettings.ts
var Pt = k(require("node:fs/promises"), 1), fs = require("node:os"), Ot = require("node:path"), je = k(cs(), 1);

// src/server-errors.ts
var ps = k(us(), 1);

// src/storybook-error.ts
function ls({
  code: t,
  category: e
}) {
  let r = String(t).padStart(4, "0");
  return `SB_${e}_${r}`;
}
i(ls, "parseErrorCode");
var Et = class t extends Error {
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
    return ls({ code: this.code, category: this.category });
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
    return r === !0 ? a = `https://storybook.js.org/error/${ls({ code: n, category: s })}` : typeof r == "string" ? a = r : Array.isArray(r) &&
    (a = `
${r.map((c) => `	- ${c}`).join(`
`)}`), `${o}${a != null ? `

More info: ${a}
` : ""}`;
  }
};

// src/server-errors.ts
var Ct = class extends Et {
  constructor(r) {
    super({
      category: "CORE-SERVER",
      code: 1,
      message: ps.dedent`
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
var Kc = (0, Ot.join)((0, fs.homedir)(), ".storybook", "settings.json"), zc = 1, Jc = je.z.object({
  version: je.z.number(),
  // NOTE: every key (and subkey) below must be optional, for forwards compatibility reasons
  // (we can remove keys once they are deprecated)
  userSince: je.z.number().optional(),
  init: je.z.object({ skipOnboarding: je.z.boolean().optional() }).optional()
}), Oe;
async function ms(t = Kc) {
  if (Oe)
    return Oe;
  try {
    let e = await Pt.default.readFile(t, "utf8"), r = Jc.parse(JSON.parse(e));
    Oe = new At(t, r);
  } catch {
    Oe = new At(t, { version: zc, userSince: Date.now() }), await Oe.save();
  }
  return Oe;
}
i(ms, "globalSettings");
var At = class {
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
      await Pt.default.mkdir((0, Ot.dirname)(this.filePath), { recursive: !0 }), await Pt.default.writeFile(this.filePath, JSON.stringify(this.
      value, null, 2));
    } catch (e) {
      throw new Ct({
        filePath: this.filePath,
        error: e
      });
    }
  }
};

// src/telemetry/get-application-file-count.ts
var Ai = require("node:path");

// src/telemetry/exec-command-count-lines.ts
var ai = require("node:readline");

// node_modules/execa/index.js
var ti = require("node:buffer"), ri = k(require("node:path"), 1), Gt = k(require("node:child_process"), 1), tt = k(require("node:process"), 1),
ni = k(ro(), 1);

// ../node_modules/strip-final-newline/index.js
function Ar(t) {
  let e = typeof t == "string" ? `
` : 10, r = typeof t == "string" ? "\r" : 13;
  return t[t.length - 1] === e && (t = t.slice(0, -1)), t[t.length - 1] === r && (t = t.slice(0, -1)), t;
}
i(Ar, "stripFinalNewline");

// node_modules/npm-run-path/index.js
var Xe = k(require("node:process"), 1), Ze = k(require("node:path"), 1), Or = require("node:url");

// node_modules/path-key/index.js
function Rt(t = {}) {
  let {
    env: e = process.env,
    platform: r = process.platform
  } = t;
  return r !== "win32" ? "PATH" : Object.keys(e).reverse().find((n) => n.toUpperCase() === "PATH") || "Path";
}
i(Rt, "pathKey");

// node_modules/npm-run-path/index.js
var wd = /* @__PURE__ */ i(({
  cwd: t = Xe.default.cwd(),
  path: e = Xe.default.env[Rt()],
  preferLocal: r = !0,
  execPath: n = Xe.default.execPath,
  addExecPath: s = !0
} = {}) => {
  let o = t instanceof URL ? (0, Or.fileURLToPath)(t) : t, a = Ze.default.resolve(o), c = [];
  return r && kd(c, a), s && Td(c, n, a), [...c, e].join(Ze.default.delimiter);
}, "npmRunPath"), kd = /* @__PURE__ */ i((t, e) => {
  let r;
  for (; r !== e; )
    t.push(Ze.default.join(e, "node_modules/.bin")), r = e, e = Ze.default.resolve(e, "..");
}, "applyPreferLocal"), Td = /* @__PURE__ */ i((t, e, r) => {
  let n = e instanceof URL ? (0, Or.fileURLToPath)(e) : e;
  t.push(Ze.default.resolve(r, n, ".."));
}, "applyExecPath"), no = /* @__PURE__ */ i(({ env: t = Xe.default.env, ...e } = {}) => {
  t = { ...t };
  let r = Rt({ env: t });
  return e.path = t[r], t[r] = wd(e), t;
}, "npmRunPathEnv");

// node_modules/mimic-fn/index.js
var Id = /* @__PURE__ */ i((t, e, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  let s = Object.getOwnPropertyDescriptor(t, r), o = Object.getOwnPropertyDescriptor(e, r);
  !Sd(s, o) && n || Object.defineProperty(t, r, o);
}, "copyProperty"), Sd = /* @__PURE__ */ i(function(t, e) {
  return t === void 0 || t.configurable || t.writable === e.writable && t.enumerable === e.enumerable && t.configurable === e.configurable &&
  (t.writable || t.value === e.value);
}, "canCopyProperty"), Ed = /* @__PURE__ */ i((t, e) => {
  let r = Object.getPrototypeOf(e);
  r !== Object.getPrototypeOf(t) && Object.setPrototypeOf(t, r);
}, "changePrototype"), Cd = /* @__PURE__ */ i((t, e) => `/* Wrapped ${t}*/
${e}`, "wrappedToString"), Pd = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), Ad = Object.getOwnPropertyDescriptor(Function.
prototype.toString, "name"), Od = /* @__PURE__ */ i((t, e, r) => {
  let n = r === "" ? "" : `with ${r.trim()}() `, s = Cd.bind(null, n, e.toString());
  Object.defineProperty(s, "name", Ad), Object.defineProperty(t, "toString", { ...Pd, value: s });
}, "changeToString");
function jr(t, e, { ignoreNonConfigurable: r = !1 } = {}) {
  let { name: n } = t;
  for (let s of Reflect.ownKeys(e))
    Id(t, e, s, r);
  return Ed(t, e), Od(t, e, n), t;
}
i(jr, "mimicFunction");

// node_modules/onetime/index.js
var Nt = /* @__PURE__ */ new WeakMap(), so = /* @__PURE__ */ i((t, e = {}) => {
  if (typeof t != "function")
    throw new TypeError("Expected a function");
  let r, n = 0, s = t.displayName || t.name || "<anonymous>", o = /* @__PURE__ */ i(function(...a) {
    if (Nt.set(o, ++n), n === 1)
      r = t.apply(this, a), t = null;
    else if (e.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  }, "onetime");
  return jr(o, t), Nt.set(o, n), o;
}, "onetime");
so.callCount = (t) => {
  if (!Nt.has(t))
    throw new Error(`The given function \`${t.name}\` is not wrapped by the \`onetime\` package`);
  return Nt.get(t);
};
var oo = so;

// node_modules/execa/lib/error.js
var fo = k(require("node:process"), 1);

// node_modules/human-signals/build/src/main.js
var lo = require("node:os");

// node_modules/human-signals/build/src/realtime.js
var io = /* @__PURE__ */ i(() => {
  let t = Rr - ao + 1;
  return Array.from({ length: t }, jd);
}, "getRealtimeSignals"), jd = /* @__PURE__ */ i((t, e) => ({
  name: `SIGRT${e + 1}`,
  number: ao + e,
  action: "terminate",
  description: "Application-specific signal (realtime)",
  standard: "posix"
}), "getRealtimeSignal"), ao = 34, Rr = 64;

// node_modules/human-signals/build/src/signals.js
var uo = require("node:os");

// node_modules/human-signals/build/src/core.js
var co = [
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
var Nr = /* @__PURE__ */ i(() => {
  let t = io();
  return [...co, ...t].map(Rd);
}, "getSignals"), Rd = /* @__PURE__ */ i(({
  name: t,
  number: e,
  description: r,
  action: n,
  forced: s = !1,
  standard: o
}) => {
  let {
    signals: { [t]: a }
  } = uo.constants, c = a !== void 0;
  return { name: t, number: c ? a : e, description: r, supported: c, action: n, forced: s, standard: o };
}, "normalizeSignal");

// node_modules/human-signals/build/src/main.js
var Nd = /* @__PURE__ */ i(() => {
  let t = Nr();
  return Object.fromEntries(t.map(Zd));
}, "getSignalsByName"), Zd = /* @__PURE__ */ i(({
  name: t,
  number: e,
  description: r,
  supported: n,
  action: s,
  forced: o,
  standard: a
}) => [t, { name: t, number: e, description: r, supported: n, action: s, forced: o, standard: a }], "getSignalByName"), po = Nd(), Md = /* @__PURE__ */ i(
() => {
  let t = Nr(), e = Rr + 1, r = Array.from(
    { length: e },
    (n, s) => Ld(s, t)
  );
  return Object.assign({}, ...r);
}, "getSignalsByNumber"), Ld = /* @__PURE__ */ i((t, e) => {
  let r = Dd(t, e);
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
}, "getSignalByNumber"), Dd = /* @__PURE__ */ i((t, e) => {
  let r = e.find(({ name: n }) => lo.constants.signals[n] === t);
  return r !== void 0 ? r : e.find((n) => n.number === t);
}, "findSignalByNumber"), Xp = Md();

// node_modules/execa/lib/error.js
var Ud = /* @__PURE__ */ i(({ timedOut: t, timeout: e, errorCode: r, signal: n, signalDescription: s, exitCode: o, isCanceled: a }) => t ? `\
timed out after ${e} milliseconds` : a ? "was canceled" : r !== void 0 ? `failed with ${r}` : n !== void 0 ? `was killed with ${n} (${s})` :
o !== void 0 ? `failed with exit code ${o}` : "failed", "getErrorPrefix"), Qe = /* @__PURE__ */ i(({
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
  parsed: { options: { timeout: x, cwd: w = fo.default.cwd() } }
}) => {
  o = o === null ? void 0 : o, s = s === null ? void 0 : s;
  let _ = s === void 0 ? void 0 : po[s].description, P = n && n.code, A = `Command ${Ud({ timedOut: l, timeout: x, errorCode: P, signal: s, signalDescription: _,
  exitCode: o, isCanceled: p })}: ${a}`, J = Object.prototype.toString.call(n) === "[object Error]", Ve = J ? `${A}
${n.message}` : A, we = [Ve, e, t].filter(Boolean).join(`
`);
  return J ? (n.originalMessage = n.message, n.message = we) : n = new Error(we), n.shortMessage = Ve, n.command = a, n.escapedCommand = c, n.
  exitCode = o, n.signal = s, n.signalDescription = _, n.stdout = t, n.stderr = e, n.cwd = w, r !== void 0 && (n.all = r), "bufferedData" in
  n && delete n.bufferedData, n.failed = !0, n.timedOut = !!l, n.isCanceled = p, n.killed = f && !l, n;
}, "makeError");

// node_modules/execa/lib/stdio.js
var Zt = ["stdin", "stdout", "stderr"], $d = /* @__PURE__ */ i((t) => Zt.some((e) => t[e] !== void 0), "hasAlias"), mo = /* @__PURE__ */ i((t) => {
  if (!t)
    return;
  let { stdio: e } = t;
  if (e === void 0)
    return Zt.map((n) => t[n]);
  if ($d(t))
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${Zt.map((n) => `\`${n}\``).join(", ")}`);
  if (typeof e == "string")
    return e;
  if (!Array.isArray(e))
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof e}\``);
  let r = Math.max(e.length, Zt.length);
  return Array.from({ length: r }, (n, s) => e[s]);
}, "normalizeStdio");

// node_modules/execa/lib/kill.js
var yo = k(require("node:os"), 1);

// node_modules/signal-exit/dist/mjs/signals.js
var ve = [];
ve.push("SIGHUP", "SIGINT", "SIGTERM");
process.platform !== "win32" && ve.push(
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
process.platform === "linux" && ve.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");

// node_modules/signal-exit/dist/mjs/index.js
var Mt = /* @__PURE__ */ i((t) => !!t && typeof t == "object" && typeof t.removeListener == "function" && typeof t.emit == "function" && typeof t.
reallyExit == "function" && typeof t.listeners == "function" && typeof t.kill == "function" && typeof t.pid == "number" && typeof t.on == "f\
unction", "processOk"), Zr = Symbol.for("signal-exit emitter"), Mr = globalThis, Vd = Object.defineProperty.bind(Object), Lr = class {
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
    if (Mr[Zr])
      return Mr[Zr];
    Vd(Mr, Zr, {
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
}, Lt = class {
  static {
    i(this, "SignalExitBase");
  }
}, Fd = /* @__PURE__ */ i((t) => ({
  onExit(e, r) {
    return t.onExit(e, r);
  },
  load() {
    return t.load();
  },
  unload() {
    return t.unload();
  }
}), "signalExitWrap"), Dr = class extends Lt {
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
}, Ur = class extends Lt {
  static {
    i(this, "SignalExit");
  }
  // "SIGHUP" throws an `ENOSYS` error on Windows,
  // so use a supported signal instead
  /* c8 ignore start */
  #i = $r.platform === "win32" ? "SIGINT" : "SIGHUP";
  /* c8 ignore stop */
  #t = new Lr();
  #e;
  #s;
  #o;
  #n = {};
  #r = !1;
  constructor(e) {
    super(), this.#e = e, this.#n = {};
    for (let r of ve)
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
    if (!Mt(this.#e))
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
      for (let e of ve)
        try {
          let r = this.#n[e];
          r && this.#e.on(e, r);
        } catch {
        }
      this.#e.emit = (e, ...r) => this.#c(e, ...r), this.#e.reallyExit = (e) => this.#a(e);
    }
  }
  unload() {
    this.#r && (this.#r = !1, ve.forEach((e) => {
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
    return Mt(this.#e) ? (this.#e.exitCode = e || 0, this.#t.emit("exit", this.#e.exitCode, null), this.#o.call(this.#e, this.#e.exitCode)) :
    0;
  }
  #c(e, ...r) {
    let n = this.#s;
    if (e === "exit" && Mt(this.#e)) {
      typeof r[0] == "number" && (this.#e.exitCode = r[0]);
      let s = n.call(this.#e, e, ...r);
      return this.#t.emit("exit", this.#e.exitCode, null), s;
    } else
      return n.call(this.#e, e, ...r);
  }
}, $r = globalThis.process, {
  /**
   * Called when the process is exiting, whether via signal, explicit
   * exit, or running out of stuff to do.
   *
   * If the global process object is not suitable for instrumentation,
   * then this will be a no-op.
   *
   * Returns a function that may be used to unload signal-exit.
   */
  onExit: ho,
  /**
   * Load the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  load: df,
  /**
   * Unload the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  unload: uf
} = Fd(Mt($r) ? new Ur($r) : new Dr());

// node_modules/execa/lib/kill.js
var Bd = 1e3 * 5, go = /* @__PURE__ */ i((t, e = "SIGTERM", r = {}) => {
  let n = t(e);
  return Wd(t, e, r, n), n;
}, "spawnedKill"), Wd = /* @__PURE__ */ i((t, e, r, n) => {
  if (!qd(e, r, n))
    return;
  let s = Kd(r), o = setTimeout(() => {
    t("SIGKILL");
  }, s);
  o.unref && o.unref();
}, "setKillTimeout"), qd = /* @__PURE__ */ i((t, { forceKillAfterTimeout: e }, r) => Gd(t) && e !== !1 && r, "shouldForceKill"), Gd = /* @__PURE__ */ i(
(t) => t === yo.default.constants.signals.SIGTERM || typeof t == "string" && t.toUpperCase() === "SIGTERM", "isSigterm"), Kd = /* @__PURE__ */ i(
({ forceKillAfterTimeout: t = !0 }) => {
  if (t === !0)
    return Bd;
  if (!Number.isFinite(t) || t < 0)
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${t}\` (${typeof t})`);
  return t;
}, "getForceKillAfterTimeout"), xo = /* @__PURE__ */ i((t, e) => {
  t.kill() && (e.isCanceled = !0);
}, "spawnedCancel"), zd = /* @__PURE__ */ i((t, e, r) => {
  t.kill(e), r(Object.assign(new Error("Timed out"), { timedOut: !0, signal: e }));
}, "timeoutKill"), bo = /* @__PURE__ */ i((t, { timeout: e, killSignal: r = "SIGTERM" }, n) => {
  if (e === 0 || e === void 0)
    return n;
  let s, o = new Promise((c, l) => {
    s = setTimeout(() => {
      zd(t, r, l);
    }, e);
  }), a = n.finally(() => {
    clearTimeout(s);
  });
  return Promise.race([o, a]);
}, "setupTimeout"), vo = /* @__PURE__ */ i(({ timeout: t }) => {
  if (t !== void 0 && (!Number.isFinite(t) || t < 0))
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${t}\` (${typeof t})`);
}, "validateTimeout"), _o = /* @__PURE__ */ i(async (t, { cleanup: e, detached: r }, n) => {
  if (!e || r)
    return n;
  let s = ho(() => {
    t.kill();
  });
  return n.finally(() => {
    s();
  });
}, "setExitHandler");

// node_modules/execa/lib/pipe.js
var wo = require("node:fs"), ko = require("node:child_process");

// node_modules/is-stream/index.js
function Dt(t) {
  return t !== null && typeof t == "object" && typeof t.pipe == "function";
}
i(Dt, "isStream");
function Vr(t) {
  return Dt(t) && t.writable !== !1 && typeof t._write == "function" && typeof t._writableState == "object";
}
i(Vr, "isWritableStream");

// node_modules/execa/lib/pipe.js
var Jd = /* @__PURE__ */ i((t) => t instanceof ko.ChildProcess && typeof t.then == "function", "isExecaChildProcess"), Fr = /* @__PURE__ */ i(
(t, e, r) => {
  if (typeof r == "string")
    return t[e].pipe((0, wo.createWriteStream)(r)), t;
  if (Vr(r))
    return t[e].pipe(r), t;
  if (!Jd(r))
    throw new TypeError("The second argument must be a string, a stream or an Execa child process.");
  if (!Vr(r.stdin))
    throw new TypeError("The target child process's stdin must be available.");
  return t[e].pipe(r.stdin), r;
}, "pipeToTarget"), To = /* @__PURE__ */ i((t) => {
  t.stdout !== null && (t.pipeStdout = Fr.bind(void 0, t, "stdout")), t.stderr !== null && (t.pipeStderr = Fr.bind(void 0, t, "stderr")), t.
  all !== void 0 && (t.pipeAll = Fr.bind(void 0, t, "all"));
}, "addPipeMethods");

// node_modules/execa/lib/stream.js
var Wt = require("node:fs"), Mo = require("node:timers/promises");

// node_modules/get-stream/source/contents.js
var et = /* @__PURE__ */ i(async (t, { init: e, convertChunk: r, getSize: n, truncateChunk: s, addChunk: o, getFinalChunk: a, finalize: c }, {
maxBuffer: l = Number.POSITIVE_INFINITY } = {}) => {
  if (!Hd(t))
    throw new Error("The first argument must be a Readable, a ReadableStream, or an async iterable.");
  let p = e();
  p.length = 0;
  try {
    for await (let f of t) {
      let x = Xd(f), w = r[x](f, p);
      Eo({ convertedChunk: w, state: p, getSize: n, truncateChunk: s, addChunk: o, maxBuffer: l });
    }
    return Yd({ state: p, convertChunk: r, getSize: n, truncateChunk: s, addChunk: o, getFinalChunk: a, maxBuffer: l }), c(p);
  } catch (f) {
    throw f.bufferedData = c(p), f;
  }
}, "getStreamContents"), Yd = /* @__PURE__ */ i(({ state: t, getSize: e, truncateChunk: r, addChunk: n, getFinalChunk: s, maxBuffer: o }) => {
  let a = s(t);
  a !== void 0 && Eo({ convertedChunk: a, state: t, getSize: e, truncateChunk: r, addChunk: n, maxBuffer: o });
}, "appendFinalChunk"), Eo = /* @__PURE__ */ i(({ convertedChunk: t, state: e, getSize: r, truncateChunk: n, addChunk: s, maxBuffer: o }) => {
  let a = r(t), c = e.length + a;
  if (c <= o) {
    Io(t, e, s, c);
    return;
  }
  let l = n(t, o - e.length);
  throw l !== void 0 && Io(l, e, s, o), new Ut();
}, "appendChunk"), Io = /* @__PURE__ */ i((t, e, r, n) => {
  e.contents = r(t, e, n), e.length = n;
}, "addNewChunk"), Hd = /* @__PURE__ */ i((t) => typeof t == "object" && t !== null && typeof t[Symbol.asyncIterator] == "function", "isAsyn\
cIterable"), Xd = /* @__PURE__ */ i((t) => {
  let e = typeof t;
  if (e === "string")
    return "string";
  if (e !== "object" || t === null)
    return "others";
  if (globalThis.Buffer?.isBuffer(t))
    return "buffer";
  let r = So.call(t);
  return r === "[object ArrayBuffer]" ? "arrayBuffer" : r === "[object DataView]" ? "dataView" : Number.isInteger(t.byteLength) && Number.isInteger(
  t.byteOffset) && So.call(t.buffer) === "[object ArrayBuffer]" ? "typedArray" : "others";
}, "getChunkType"), { toString: So } = Object.prototype, Ut = class extends Error {
  static {
    i(this, "MaxBufferError");
  }
  name = "MaxBufferError";
  constructor() {
    super("maxBuffer exceeded");
  }
};

// node_modules/get-stream/source/utils.js
var Br = /* @__PURE__ */ i((t) => t, "identity"), Wr = /* @__PURE__ */ i(() => {
}, "noop"), qr = /* @__PURE__ */ i(({ contents: t }) => t, "getContentsProp"), $t = /* @__PURE__ */ i((t) => {
  throw new Error(`Streams in object mode are not supported: ${String(t)}`);
}, "throwObjectStream"), Vt = /* @__PURE__ */ i((t) => t.length, "getLengthProp");

// node_modules/get-stream/source/array-buffer.js
async function Gr(t, e) {
  return et(t, au, e);
}
i(Gr, "getStreamAsArrayBuffer");
var Qd = /* @__PURE__ */ i(() => ({ contents: new ArrayBuffer(0) }), "initArrayBuffer"), eu = /* @__PURE__ */ i((t) => tu.encode(t), "useTex\
tEncoder"), tu = new TextEncoder(), Co = /* @__PURE__ */ i((t) => new Uint8Array(t), "useUint8Array"), Po = /* @__PURE__ */ i((t) => new Uint8Array(
t.buffer, t.byteOffset, t.byteLength), "useUint8ArrayWithOffset"), ru = /* @__PURE__ */ i((t, e) => t.slice(0, e), "truncateArrayBufferChunk"),
nu = /* @__PURE__ */ i((t, { contents: e, length: r }, n) => {
  let s = jo() ? ou(e, n) : su(e, n);
  return new Uint8Array(s).set(t, r), s;
}, "addArrayBufferChunk"), su = /* @__PURE__ */ i((t, e) => {
  if (e <= t.byteLength)
    return t;
  let r = new ArrayBuffer(Oo(e));
  return new Uint8Array(r).set(new Uint8Array(t), 0), r;
}, "resizeArrayBufferSlow"), ou = /* @__PURE__ */ i((t, e) => {
  if (e <= t.maxByteLength)
    return t.resize(e), t;
  let r = new ArrayBuffer(e, { maxByteLength: Oo(e) });
  return new Uint8Array(r).set(new Uint8Array(t), 0), r;
}, "resizeArrayBuffer"), Oo = /* @__PURE__ */ i((t) => Ao ** Math.ceil(Math.log(t) / Math.log(Ao)), "getNewContentsLength"), Ao = 2, iu = /* @__PURE__ */ i(
({ contents: t, length: e }) => jo() ? t : t.slice(0, e), "finalizeArrayBuffer"), jo = /* @__PURE__ */ i(() => "resize" in ArrayBuffer.prototype,
"hasArrayBufferResize"), au = {
  init: Qd,
  convertChunk: {
    string: eu,
    buffer: Co,
    arrayBuffer: Co,
    dataView: Po,
    typedArray: Po,
    others: $t
  },
  getSize: Vt,
  truncateChunk: ru,
  addChunk: nu,
  getFinalChunk: Wr,
  finalize: iu
};

// node_modules/get-stream/source/buffer.js
async function Ft(t, e) {
  if (!("Buffer" in globalThis))
    throw new Error("getStreamAsBuffer() is only supported in Node.js");
  try {
    return Ro(await Gr(t, e));
  } catch (r) {
    throw r.bufferedData !== void 0 && (r.bufferedData = Ro(r.bufferedData)), r;
  }
}
i(Ft, "getStreamAsBuffer");
var Ro = /* @__PURE__ */ i((t) => globalThis.Buffer.from(t), "arrayBufferToNodeBuffer");

// node_modules/get-stream/source/string.js
async function Kr(t, e) {
  return et(t, pu, e);
}
i(Kr, "getStreamAsString");
var cu = /* @__PURE__ */ i(() => ({ contents: "", textDecoder: new TextDecoder() }), "initString"), Bt = /* @__PURE__ */ i((t, { textDecoder: e }) => e.
decode(t, { stream: !0 }), "useTextDecoder"), du = /* @__PURE__ */ i((t, { contents: e }) => e + t, "addStringChunk"), uu = /* @__PURE__ */ i(
(t, e) => t.slice(0, e), "truncateStringChunk"), lu = /* @__PURE__ */ i(({ textDecoder: t }) => {
  let e = t.decode();
  return e === "" ? void 0 : e;
}, "getFinalStringChunk"), pu = {
  init: cu,
  convertChunk: {
    string: Br,
    buffer: Bt,
    arrayBuffer: Bt,
    dataView: Bt,
    typedArray: Bt,
    others: $t
  },
  getSize: Vt,
  truncateChunk: uu,
  addChunk: du,
  getFinalChunk: lu,
  finalize: qr
};

// node_modules/execa/lib/stream.js
var Lo = k(Zo(), 1);
var Do = /* @__PURE__ */ i((t) => {
  if (t !== void 0)
    throw new TypeError("The `input` and `inputFile` options cannot be both set.");
}, "validateInputOptions"), mu = /* @__PURE__ */ i(({ input: t, inputFile: e }) => typeof e != "string" ? t : (Do(t), (0, Wt.readFileSync)(e)),
"getInputSync"), Uo = /* @__PURE__ */ i((t) => {
  let e = mu(t);
  if (Dt(e))
    throw new TypeError("The `input` option cannot be a stream in sync mode");
  return e;
}, "handleInputSync"), hu = /* @__PURE__ */ i(({ input: t, inputFile: e }) => typeof e != "string" ? t : (Do(t), (0, Wt.createReadStream)(e)),
"getInput"), $o = /* @__PURE__ */ i((t, e) => {
  let r = hu(e);
  r !== void 0 && (Dt(r) ? r.pipe(t.stdin) : t.stdin.end(r));
}, "handleInput"), Vo = /* @__PURE__ */ i((t, { all: e }) => {
  if (!e || !t.stdout && !t.stderr)
    return;
  let r = (0, Lo.default)();
  return t.stdout && r.add(t.stdout), t.stderr && r.add(t.stderr), r;
}, "makeAllStream"), zr = /* @__PURE__ */ i(async (t, e) => {
  if (!(!t || e === void 0)) {
    await (0, Mo.setTimeout)(0), t.destroy();
    try {
      return await e;
    } catch (r) {
      return r.bufferedData;
    }
  }
}, "getBufferedData"), Jr = /* @__PURE__ */ i((t, { encoding: e, buffer: r, maxBuffer: n }) => {
  if (!(!t || !r))
    return e === "utf8" || e === "utf-8" ? Kr(t, { maxBuffer: n }) : e === null || e === "buffer" ? Ft(t, { maxBuffer: n }) : yu(t, n, e);
}, "getStreamPromise"), yu = /* @__PURE__ */ i(async (t, e, r) => (await Ft(t, { maxBuffer: e })).toString(r), "applyEncoding"), Fo = /* @__PURE__ */ i(
async ({ stdout: t, stderr: e, all: r }, { encoding: n, buffer: s, maxBuffer: o }, a) => {
  let c = Jr(t, { encoding: n, buffer: s, maxBuffer: o }), l = Jr(e, { encoding: n, buffer: s, maxBuffer: o }), p = Jr(r, { encoding: n, buffer: s,
  maxBuffer: o * 2 });
  try {
    return await Promise.all([a, c, l, p]);
  } catch (f) {
    return Promise.all([
      { error: f, signal: f.signal, timedOut: f.timedOut },
      zr(t, c),
      zr(e, l),
      zr(r, p)
    ]);
  }
}, "getSpawnedResult");

// node_modules/execa/lib/promise.js
var gu = (async () => {
})().constructor.prototype, xu = ["then", "catch", "finally"].map((t) => [
  t,
  Reflect.getOwnPropertyDescriptor(gu, t)
]), Yr = /* @__PURE__ */ i((t, e) => {
  for (let [r, n] of xu) {
    let s = typeof e == "function" ? (...o) => Reflect.apply(n.value, e(), o) : n.value.bind(e);
    Reflect.defineProperty(t, r, { ...n, value: s });
  }
}, "mergePromise"), Bo = /* @__PURE__ */ i((t) => new Promise((e, r) => {
  t.on("exit", (n, s) => {
    e({ exitCode: n, signal: s });
  }), t.on("error", (n) => {
    r(n);
  }), t.stdin && t.stdin.on("error", (n) => {
    r(n);
  });
}), "getSpawnedPromise");

// node_modules/execa/lib/command.js
var Go = require("node:buffer"), Ko = require("node:child_process");
var zo = /* @__PURE__ */ i((t, e = []) => Array.isArray(e) ? [t, ...e] : [t], "normalizeArgs"), bu = /^[\w.-]+$/, vu = /* @__PURE__ */ i((t) => typeof t !=
"string" || bu.test(t) ? t : `"${t.replaceAll('"', '\\"')}"`, "escapeArg"), Hr = /* @__PURE__ */ i((t, e) => zo(t, e).join(" "), "joinComman\
d"), Xr = /* @__PURE__ */ i((t, e) => zo(t, e).map((r) => vu(r)).join(" "), "getEscapedCommand"), Jo = / +/g, Yo = /* @__PURE__ */ i((t) => {
  let e = [];
  for (let r of t.trim().split(Jo)) {
    let n = e.at(-1);
    n && n.endsWith("\\") ? e[e.length - 1] = `${n.slice(0, -1)} ${r}` : e.push(r);
  }
  return e;
}, "parseCommand"), Wo = /* @__PURE__ */ i((t) => {
  let e = typeof t;
  if (e === "string")
    return t;
  if (e === "number")
    return String(t);
  if (e === "object" && t !== null && !(t instanceof Ko.ChildProcess) && "stdout" in t) {
    let r = typeof t.stdout;
    if (r === "string")
      return t.stdout;
    if (Go.Buffer.isBuffer(t.stdout))
      return t.stdout.toString();
    throw new TypeError(`Unexpected "${r}" stdout in template expression`);
  }
  throw new TypeError(`Unexpected "${e}" in template expression`);
}, "parseExpression"), qo = /* @__PURE__ */ i((t, e, r) => r || t.length === 0 || e.length === 0 ? [...t, ...e] : [
  ...t.slice(0, -1),
  `${t.at(-1)}${e[0]}`,
  ...e.slice(1)
], "concatTokens"), _u = /* @__PURE__ */ i(({ templates: t, expressions: e, tokens: r, index: n, template: s }) => {
  let o = s ?? t.raw[n], a = o.split(Jo).filter(Boolean), c = qo(
    r,
    a,
    o.startsWith(" ")
  );
  if (n === e.length)
    return c;
  let l = e[n], p = Array.isArray(l) ? l.map((f) => Wo(f)) : [Wo(l)];
  return qo(
    c,
    p,
    o.endsWith(" ")
  );
}, "parseTemplate"), Qr = /* @__PURE__ */ i((t, e) => {
  let r = [];
  for (let [n, s] of t.entries())
    r = _u({ templates: t, expressions: e, tokens: r, index: n, template: s });
  return r;
}, "parseTemplates");

// node_modules/execa/lib/verbose.js
var Ho = require("node:util"), Xo = k(require("node:process"), 1);
var Qo = (0, Ho.debuglog)("execa").enabled, qt = /* @__PURE__ */ i((t, e) => String(t).padStart(e, "0"), "padField"), wu = /* @__PURE__ */ i(
() => {
  let t = /* @__PURE__ */ new Date();
  return `${qt(t.getHours(), 2)}:${qt(t.getMinutes(), 2)}:${qt(t.getSeconds(), 2)}.${qt(t.getMilliseconds(), 3)}`;
}, "getTimestamp"), en = /* @__PURE__ */ i((t, { verbose: e }) => {
  e && Xo.default.stderr.write(`[${wu()}] ${t}
`);
}, "logCommand");

// node_modules/execa/index.js
var ku = 1e3 * 1e3 * 100, Tu = /* @__PURE__ */ i(({ env: t, extendEnv: e, preferLocal: r, localDir: n, execPath: s }) => {
  let o = e ? { ...tt.default.env, ...t } : t;
  return r ? no({ env: o, cwd: n, execPath: s }) : o;
}, "getEnv"), si = /* @__PURE__ */ i((t, e, r = {}) => {
  let n = ni.default._parse(t, e, r);
  return t = n.command, e = n.args, r = n.options, r = {
    maxBuffer: ku,
    buffer: !0,
    stripFinalNewline: !0,
    extendEnv: !0,
    preferLocal: !1,
    localDir: r.cwd || tt.default.cwd(),
    execPath: tt.default.execPath,
    encoding: "utf8",
    reject: !0,
    cleanup: !0,
    all: !1,
    windowsHide: !0,
    verbose: Qo,
    ...r
  }, r.env = Tu(r), r.stdio = mo(r), tt.default.platform === "win32" && ri.default.basename(t, ".exe") === "cmd" && e.unshift("/q"), { file: t,
  args: e, options: r, parsed: n };
}, "handleArguments"), rt = /* @__PURE__ */ i((t, e, r) => typeof e != "string" && !ti.Buffer.isBuffer(e) ? r === void 0 ? void 0 : "" : t.stripFinalNewline ?
Ar(e) : e, "handleOutput");
function oi(t, e, r) {
  let n = si(t, e, r), s = Hr(t, e), o = Xr(t, e);
  en(o, n.options), vo(n.options);
  let a;
  try {
    a = Gt.default.spawn(n.file, n.args, n.options);
  } catch (_) {
    let P = new Gt.default.ChildProcess(), E = Promise.reject(Qe({
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
    return Yr(P, E), P;
  }
  let c = Bo(a), l = bo(a, n.options, c), p = _o(a, n.options, l), f = { isCanceled: !1 };
  a.kill = go.bind(null, a.kill.bind(a)), a.cancel = xo.bind(null, a, f);
  let w = oo(/* @__PURE__ */ i(async () => {
    let [{ error: _, exitCode: P, signal: E, timedOut: A }, J, Ve, we] = await Fo(a, n.options, p), Fe = rt(n.options, J), lt = rt(n.options,
    Ve), pt = rt(n.options, we);
    if (_ || P !== 0 || E !== null) {
      let T = Qe({
        error: _,
        exitCode: P,
        signal: E,
        stdout: Fe,
        stderr: lt,
        all: pt,
        command: s,
        escapedCommand: o,
        parsed: n,
        timedOut: A,
        isCanceled: f.isCanceled || (n.options.signal ? n.options.signal.aborted : !1),
        killed: a.killed
      });
      if (!n.options.reject)
        return T;
      throw T;
    }
    return {
      command: s,
      escapedCommand: o,
      exitCode: 0,
      stdout: Fe,
      stderr: lt,
      all: pt,
      failed: !1,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    };
  }, "handlePromise"));
  return $o(a, n.options), a.all = Vo(a, n.options), To(a), Yr(a, w), a;
}
i(oi, "execa");
function Iu(t, e, r) {
  let n = si(t, e, r), s = Hr(t, e), o = Xr(t, e);
  en(o, n.options);
  let a = Uo(n.options), c;
  try {
    c = Gt.default.spawnSync(n.file, n.args, { ...n.options, input: a });
  } catch (f) {
    throw Qe({
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
  let l = rt(n.options, c.stdout, c.error), p = rt(n.options, c.stderr, c.error);
  if (c.error || c.status !== 0 || c.signal !== null) {
    let f = Qe({
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
i(Iu, "execaSync");
var Su = /* @__PURE__ */ i(({ input: t, inputFile: e, stdio: r }) => t === void 0 && e === void 0 && r === void 0 ? { stdin: "inherit" } : {},
"normalizeScriptStdin"), ei = /* @__PURE__ */ i((t = {}) => ({
  preferLocal: !0,
  ...Su(t),
  ...t
}), "normalizeScriptOptions");
function ii(t) {
  function e(r, ...n) {
    if (!Array.isArray(r))
      return ii({ ...t, ...r });
    let [s, ...o] = Qr(r, n);
    return oi(s, o, ei(t));
  }
  return i(e, "$"), e.sync = (r, ...n) => {
    if (!Array.isArray(r))
      throw new TypeError("Please use $(options).sync`command` instead of $.sync(options)`command`.");
    let [s, ...o] = Qr(r, n);
    return Iu(s, o, ei(t));
  }, e;
}
i(ii, "create$");
var gm = ii();
function nt(t, e) {
  let [r, ...n] = Yo(t);
  return oi(r, n, e);
}
i(nt, "execaCommand");

// src/telemetry/exec-command-count-lines.ts
async function Kt(t, e) {
  let r = nt(t, { shell: !0, buffer: !1, ...e });
  if (!r.stdout)
    throw new Error("Unexpected missing stdout");
  let n = 0, s = (0, ai.createInterface)(r.stdout);
  return s.on("line", () => {
    n += 1;
  }), await r, s.close(), n;
}
i(Kt, "execCommandCountLines");

// src/common/utils/file-cache.ts
var st = require("node:crypto"), M = require("node:fs"), V = require("node:fs/promises"), di = require("node:os"), Me = require("node:path");
var zt = class {
  static {
    i(this, "FileSystemCache");
  }
  constructor(e = {}) {
    this.prefix = (e.ns || e.prefix || "") + "-", this.hash_alg = e.hash_alg || "sha256", this.cache_dir = e.basePath || (0, Me.join)((0, di.tmpdir)(),
    (0, st.randomBytes)(15).toString("base64").replace(/\//g, "-")), this.ttl = e.ttl || 0, (0, st.createHash)(this.hash_alg), (0, M.mkdirSync)(
    this.cache_dir, { recursive: !0 });
  }
  generateHash(e) {
    return (0, Me.join)(this.cache_dir, this.prefix + (0, st.createHash)(this.hash_alg).update(e).digest("hex"));
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
      let n = await (0, V.readFile)(this.generateHash(e), "utf8");
      return this.parseCacheData(n, r);
    } catch {
      return r;
    }
  }
  getSync(e, r) {
    try {
      let n = (0, M.readFileSync)(this.generateHash(e), "utf8");
      return this.parseCacheData(n, r);
    } catch {
      return r;
    }
  }
  async set(e, r, n = {}) {
    let s = typeof n == "number" ? { ttl: n } : n;
    (0, M.mkdirSync)(this.cache_dir, { recursive: !0 }), await (0, V.writeFile)(this.generateHash(e), this.parseSetData(e, r, s), {
      encoding: s.encoding || "utf8"
    });
  }
  setSync(e, r, n = {}) {
    let s = typeof n == "number" ? { ttl: n } : n;
    (0, M.mkdirSync)(this.cache_dir, { recursive: !0 }), (0, M.writeFileSync)(this.generateHash(e), this.parseSetData(e, r, s), {
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
    await (0, V.rm)(this.generateHash(e), { force: !0 });
  }
  removeSync(e) {
    (0, M.rmSync)(this.generateHash(e), { force: !0 });
  }
  async clear() {
    let e = await (0, V.readdir)(this.cache_dir);
    await Promise.all(
      e.filter((r) => r.startsWith(this.prefix)).map((r) => (0, V.rm)((0, Me.join)(this.cache_dir, r), { force: !0 }))
    );
  }
  clearSync() {
    (0, M.readdirSync)(this.cache_dir).filter((e) => e.startsWith(this.prefix)).forEach((e) => (0, M.rmSync)((0, Me.join)(this.cache_dir, e),
    { force: !0 }));
  }
  async getAll() {
    let e = Date.now(), r = await (0, V.readdir)(this.cache_dir);
    return (await Promise.all(
      r.filter((s) => s.startsWith(this.prefix)).map((s) => (0, V.readFile)((0, Me.join)(this.cache_dir, s), "utf8"))
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
function rn(t) {
  return new zt(t);
}
i(rn, "createFileSystemCache");

// src/common/utils/resolve-path-in-sb-cache.ts
var on = require("node:path");

// node_modules/find-cache-dir/index.js
var ki = k(require("node:process"), 1), De = k(require("node:path"), 1), it = k(require("node:fs"), 1), Ti = k(li(), 1);

// ../node_modules/pkg-dir/index.js
var bi = k(require("node:path"), 1);

// ../node_modules/pkg-dir/node_modules/find-up/index.js
var ot = k(require("node:path"), 1), gi = require("node:url");

// ../node_modules/locate-path/index.js
var pi = k(require("node:process"), 1), fi = k(require("node:path"), 1), Jt = k(require("node:fs"), 1), mi = require("node:url");
var hi = {
  directory: "isDirectory",
  file: "isFile"
};
function Pu(t) {
  if (!Object.hasOwnProperty.call(hi, t))
    throw new Error(`Invalid type specified: ${t}`);
}
i(Pu, "checkType");
var Au = /* @__PURE__ */ i((t, e) => e[hi[t]](), "matchType"), Ou = /* @__PURE__ */ i((t) => t instanceof URL ? (0, mi.fileURLToPath)(t) : t,
"toPath");
function Le(t, {
  cwd: e = pi.default.cwd(),
  type: r = "file",
  allowSymlinks: n = !0
} = {}) {
  Pu(r), e = Ou(e);
  let s = n ? Jt.default.statSync : Jt.default.lstatSync;
  for (let o of t)
    try {
      let a = s(fi.default.resolve(e, o), {
        throwIfNoEntry: !1
      });
      if (!a)
        continue;
      if (Au(r, a))
        return o;
    } catch {
    }
}
i(Le, "locatePathSync");

// ../node_modules/pkg-dir/node_modules/path-exists/index.js
var yi = k(require("node:fs"), 1);

// ../node_modules/pkg-dir/node_modules/find-up/index.js
var Ru = /* @__PURE__ */ i((t) => t instanceof URL ? (0, gi.fileURLToPath)(t) : t, "toPath"), Nu = Symbol("findUpStop");
function Zu(t, e = {}) {
  let r = ot.default.resolve(Ru(e.cwd) || ""), { root: n } = ot.default.parse(r), s = e.stopAt || n, o = e.limit || Number.POSITIVE_INFINITY,
  a = [t].flat(), c = /* @__PURE__ */ i((p) => {
    if (typeof t != "function")
      return Le(a, p);
    let f = t(p.cwd);
    return typeof f == "string" ? Le([f], p) : f;
  }, "runMatcher"), l = [];
  for (; ; ) {
    let p = c({ ...e, cwd: r });
    if (p === Nu || (p && l.push(ot.default.resolve(r, p)), r === s || l.length >= o))
      break;
    r = ot.default.dirname(r);
  }
  return l;
}
i(Zu, "findUpMultipleSync");
function xi(t, e = {}) {
  return Zu(t, { ...e, limit: 1 })[0];
}
i(xi, "findUpSync");

// ../node_modules/pkg-dir/index.js
function vi({ cwd: t } = {}) {
  let e = xi("package.json", { cwd: t });
  return e && bi.default.dirname(e);
}
i(vi, "packageDirectorySync");

// node_modules/find-cache-dir/index.js
var { env: nn, cwd: Mu } = ki.default, _i = /* @__PURE__ */ i((t) => {
  try {
    return it.default.accessSync(t, it.default.constants.W_OK), !0;
  } catch {
    return !1;
  }
}, "isWritable");
function wi(t, e) {
  return e.create && it.default.mkdirSync(t, { recursive: !0 }), t;
}
i(wi, "useDirectory");
function Lu(t) {
  let e = De.default.join(t, "node_modules");
  if (!(!_i(e) && (it.default.existsSync(e) || !_i(De.default.join(t)))))
    return e;
}
i(Lu, "getNodeModuleDirectory");
function sn(t = {}) {
  if (nn.CACHE_DIR && !["true", "false", "1", "0"].includes(nn.CACHE_DIR))
    return wi(De.default.join(nn.CACHE_DIR, t.name), t);
  let { cwd: e = Mu(), files: r } = t;
  if (r) {
    if (!Array.isArray(r))
      throw new TypeError(`Expected \`files\` option to be an array, got \`${typeof r}\`.`);
    e = (0, Ti.default)(r.map((s) => De.default.resolve(e, s)));
  }
  if (e = vi({ cwd: e }), !(!e || !Lu(e)))
    return wi(De.default.join(e, "node_modules", ".cache", t.name), t);
}
i(sn, "findCacheDirectory");

// src/common/utils/resolve-path-in-sb-cache.ts
function Ii(t, e = "default") {
  let r = sn({ name: "storybook" });
  return r ||= (0, on.join)(process.cwd(), "node_modules", ".cache", "storybook"), (0, on.join)(r, e, t);
}
i(Ii, "resolvePathInStorybookCache");

// ../node_modules/find-up/index.js
var Ue = k(require("node:path"), 1);

// ../node_modules/find-up/node_modules/unicorn-magic/node.js
var Si = require("node:url");
function an(t) {
  return t instanceof URL ? (0, Si.fileURLToPath)(t) : t;
}
i(an, "toPath");

// ../node_modules/find-up/node_modules/path-exists/index.js
var Ei = k(require("node:fs"), 1);

// ../node_modules/find-up/index.js
var Du = Symbol("findUpStop");
function Uu(t, e = {}) {
  let r = Ue.default.resolve(an(e.cwd) ?? ""), { root: n } = Ue.default.parse(r), s = Ue.default.resolve(r, an(e.stopAt) ?? n), o = e.limit ??
  Number.POSITIVE_INFINITY, a = [t].flat(), c = /* @__PURE__ */ i((p) => {
    if (typeof t != "function")
      return Le(a, p);
    let f = t(p.cwd);
    return typeof f == "string" ? Le([f], p) : f;
  }, "runMatcher"), l = [];
  for (; ; ) {
    let p = c({ ...e, cwd: r });
    if (p === Du || (p && l.push(Ue.default.resolve(r, p)), r === s || l.length >= o))
      break;
    r = Ue.default.dirname(r);
  }
  return l;
}
i(Uu, "findUpMultipleSync");
function at(t, e = {}) {
  return Uu(t, { ...e, limit: 1 })[0];
}
i(at, "findUpSync");

// src/common/utils/paths.ts
var z = require("node:path");

// src/common/js-package-manager/constants.ts
var $u = "package-lock.json", Vu = "pnpm-lock.yaml", Fu = "yarn.lock", Bu = "bun.lock", Wu = "bun.lockb", Ci = [
  $u,
  Vu,
  Fu,
  Bu,
  Wu
];

// src/common/utils/paths.ts
var Yt, Ht = /* @__PURE__ */ i(() => {
  if (Yt)
    return Yt;
  let t;
  if (process.env.STORYBOOK_PROJECT_ROOT)
    return process.env.STORYBOOK_PROJECT_ROOT;
  try {
    let e = at(".git", { type: "directory" });
    e && (t = (0, z.join)(e, ".."));
  } catch {
  }
  try {
    let e = at(".svn", { type: "directory" });
    e && (t = t || (0, z.join)(e, ".."));
  } catch {
  }
  try {
    let e = at(".hg", { type: "directory" });
    e && (t = t || (0, z.join)(e, ".."));
  } catch {
  }
  try {
    let e = __dirname.split("node_modules"), r = !(0, z.relative)(e[0], process.cwd()).startsWith("..");
    t = t || (r && e.length >= 2 ? e[0] : void 0);
  } catch {
  }
  try {
    let e = at(Ci, {
      type: "file"
    });
    e && (t = t || (0, z.join)(e, ".."));
  } catch {
  }
  return Yt = t || process.cwd(), Yt;
}, "getProjectRoot");

// src/telemetry/run-telemetry-operation.ts
var Pi = rn({
  basePath: Ii("telemetry"),
  ns: "storybook",
  ttl: 24 * 60 * 60 * 1e3
  // 24h
}), Xt = /* @__PURE__ */ i(async (t, e) => {
  let r = await Pi.get(t);
  return r === void 0 && (r = await e(), r !== void 0 && await Pi.set(t, r)), r;
}, "runTelemetryOperation");

// src/telemetry/get-application-file-count.ts
var qu = ["page", "screen"], Gu = ["js", "jsx", "ts", "tsx"], Ku = /* @__PURE__ */ i(async (t) => {
  let r = qu.flatMap((n) => [
    n,
    [n[0].toUpperCase(), ...n.slice(1)].join("")
  ]).flatMap(
    (n) => Gu.map((s) => `"${t}${Ai.sep}*${n}*.${s}"`)
  );
  try {
    let n = `git ls-files -- ${r.join(" ")}`;
    return await Kt(n);
  } catch {
    return;
  }
}, "getApplicationFilesCountUncached"), Oi = /* @__PURE__ */ i(async (t) => Xt(
  "applicationFiles",
  async () => Ku(t)
), "getApplicationFileCount");

// src/telemetry/get-chromatic-version.ts
function ji(t) {
  let e = t.dependencies?.chromatic || t.devDependencies?.chromatic || t.peerDependencies?.chromatic;
  return e || (t.scripts && Object.values(t.scripts).find((r) => r?.match(/chromatic/)) ? "latest" : void 0);
}
i(ji, "getChromaticVersionSpecifier");

// src/telemetry/get-framework-info.ts
var Mi = require("node:path"), Li = require("storybook/internal/common");

// src/telemetry/package-json.ts
var Ri = require("node:fs/promises"), Ni = require("node:path");
var cn = /* @__PURE__ */ i(async (t) => {
  let e = Object.keys(t);
  return Promise.all(e.map(Qt));
}, "getActualPackageVersions"), Qt = /* @__PURE__ */ i(async (t) => {
  try {
    let e = await dn(t);
    return {
      name: t,
      version: e.version
    };
  } catch {
    return { name: t, version: null };
  }
}, "getActualPackageVersion"), dn = /* @__PURE__ */ i(async (t) => {
  try {
    let e = require.resolve((0, Ni.join)(t, "package.json"), {
      paths: [process.cwd()]
    });
    return JSON.parse(await (0, Ri.readFile)(e, { encoding: "utf8" }));
  } catch {
    return null;
  }
}, "getActualPackageJson");

// src/telemetry/get-framework-info.ts
var zu = [
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
], Ju = ["builder-webpack5", "builder-vite"];
function Zi(t, e) {
  let { name: r = "", version: n, dependencies: s, devDependencies: o, peerDependencies: a } = t, c = {
    // We include the framework itself because it may be a renderer too (e.g. angular)
    [r]: n,
    ...s,
    ...o,
    ...a
  };
  return e.map((l) => `@storybook/${l}`).find((l) => c[l]);
}
i(Zi, "findMatchingPackage");
var Yu = /* @__PURE__ */ i((t) => {
  let e = (0, Mi.normalize)(t).replace(new RegExp(/\\/, "g"), "/");
  return Object.keys(Li.frameworkPackages).find((n) => e.endsWith(n)) || ke(t).replace(/.*node_modules[\\/]/, "");
}, "getFrameworkPackageName");
async function Di(t) {
  if (!t?.framework)
    return {};
  let e = typeof t.framework == "string" ? t.framework : t.framework?.name;
  if (!e)
    return {};
  let r = await dn(e);
  if (!r)
    return {};
  let n = Zi(r, Ju), s = Zi(r, zu), o = Yu(e), a = typeof t.framework == "object" ? t.framework.options : {};
  return {
    framework: {
      name: o,
      options: a
    },
    builder: n,
    renderer: s
  };
}
i(Di, "getFrameworkInfo");

// src/telemetry/get-has-router-package.ts
var Hu = /* @__PURE__ */ new Set([
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
function Ui(t) {
  return Object.keys(t?.dependencies ?? {}).some(
    (e) => Hu.has(e)
  );
}
i(Ui, "getHasRouterPackage");

// src/telemetry/get-monorepo-type.ts
var ct = require("node:fs"), er = require("node:path"), tr = require("storybook/internal/common");
var $i = {
  Nx: "nx.json",
  Turborepo: "turbo.json",
  Lerna: "lerna.json",
  Rush: "rush.json",
  Lage: "lage.config.json"
}, Vi = /* @__PURE__ */ i(() => {
  let e = Object.keys($i).find((n) => {
    let s = (0, er.join)((0, tr.getProjectRoot)(), $i[n]);
    return (0, ct.existsSync)(s);
  });
  if (e)
    return e;
  if (!(0, ct.existsSync)((0, er.join)((0, tr.getProjectRoot)(), "package.json")))
    return;
  if (JSON.parse(
    (0, ct.readFileSync)((0, er.join)((0, tr.getProjectRoot)(), "package.json"), { encoding: "utf8" })
  )?.workspaces)
    return "Workspaces";
}, "getMonorepoType");

// ../node_modules/package-manager-detector/dist/constants.mjs
var Fi = [
  "npm",
  "yarn",
  "yarn@berry",
  "pnpm",
  "pnpm@6",
  "bun",
  "deno"
], un = {
  "bun.lock": "bun",
  "bun.lockb": "bun",
  "deno.lock": "deno",
  "pnpm-lock.yaml": "pnpm",
  "pnpm-workspace.yaml": "pnpm",
  "yarn.lock": "yarn",
  "package-lock.json": "npm",
  "npm-shrinkwrap.json": "npm"
}, ln = {
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
var fn = k(require("node:fs/promises"), 1), ee = k(require("node:path"), 1), Wi = k(require("node:process"), 1);
async function pn(t, e) {
  try {
    let r = await fn.default.stat(t);
    return e === "file" ? r.isFile() : r.isDirectory();
  } catch {
    return !1;
  }
}
i(pn, "pathExists");
function* Xu(t = Wi.default.cwd()) {
  let e = ee.default.resolve(t), { root: r } = ee.default.parse(e);
  for (; e && e !== r; )
    yield e, e = ee.default.dirname(e);
}
i(Xu, "lookup");
async function Bi(t, e) {
  return !t || !pn(t, "file") ? null : await el(t, e);
}
i(Bi, "parsePackageJson");
async function mn(t = {}) {
  let { cwd: e, strategies: r = ["lockfile", "packageManager-field", "devEngines-field"], onUnknown: n } = t;
  for (let s of Xu(e))
    for (let o of r)
      switch (o) {
        case "lockfile": {
          for (let a of Object.keys(un))
            if (await pn(ee.default.join(s, a), "file")) {
              let c = un[a], l = await Bi(ee.default.join(s, "package.json"), n);
              return l || { name: c, agent: c };
            }
          break;
        }
        case "packageManager-field":
        case "devEngines-field": {
          let a = await Bi(ee.default.join(s, "package.json"), n);
          if (a)
            return a;
          break;
        }
        case "install-metadata": {
          for (let a of Object.keys(ln)) {
            let c = a.endsWith("/") ? "dir" : "file";
            if (await pn(ee.default.join(s, a), c)) {
              let l = ln[a], p = l === "yarn" ? tl(a) ? "yarn" : "yarn@berry" : l;
              return { name: l, agent: p };
            }
          }
          break;
        }
      }
  return null;
}
i(mn, "detect");
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
    let r = JSON.parse(await fn.default.readFile(t, "utf8")), n, s = Qu(r);
    if (s) {
      let o = s.name, a = s.ver, c = a;
      return o === "yarn" && a && Number.parseInt(a) > 1 ? (n = "yarn@berry", c = "berry", { name: o, agent: n, version: c }) : o === "pnpm" &&
      a && Number.parseInt(a) < 7 ? (n = "pnpm@6", { name: o, agent: n, version: c }) : Fi.includes(o) ? (n = o, { name: o, agent: n, version: c }) :
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
var Zy = require("node:fs/promises"), My = require("node:path"), Ly = require("node:process");

// src/telemetry/get-package-manager-info.ts
var qi = /* @__PURE__ */ i(async () => {
  let t = await mn({ cwd: Ht() });
  if (!t)
    return;
  let e = "node_modules";
  if (t.name === "yarn")
    try {
      let { stdout: r } = await nt("yarn config get nodeLinker", {
        cwd: Ht()
      });
      e = r.trim();
    } catch {
    }
  if (t.name === "pnpm")
    try {
      let { stdout: r } = await nt("pnpm config get nodeLinker", {
        cwd: Ht()
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
    return await Kt(e);
  } catch (e) {
    return e.exitCode === 1 ? 0 : void 0;
  }
}, "getPortableStoriesFileCountUncached"), Gi = /* @__PURE__ */ i(async (t) => Xt(
  "portableStories",
  async () => rl(t)
), "getPortableStoriesFileCount");

// src/telemetry/storybook-metadata.ts
var hn = {
  next: "Next",
  "react-scripts": "CRA",
  gatsby: "Gatsby",
  "@nuxtjs/storybook": "nuxt",
  "@nrwl/storybook": "nx",
  "@vue/cli-service": "vue-cli",
  "@sveltejs/kit": "sveltekit"
}, yn = /* @__PURE__ */ i((t) => ke(t).replace(/\/dist\/.*/, "").replace(/\.[mc]?[tj]?s[x]?$/, "").replace(/\/register$/, "").replace(/\/manager$/,
"").replace(/\/preset$/, ""), "sanitizeAddonName"), Ji = /* @__PURE__ */ i(async ({
  packageJsonPath: t,
  packageJson: e,
  mainConfig: r,
  configDir: n
}) => {
  let s = await ms(), o = {
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
  }, c = Object.keys(a).find((T) => !!hn[T]);
  if (c) {
    let { version: T } = await Qt(c);
    o.metaFramework = {
      name: hn[c],
      packageName: c,
      version: T
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
    (T) => l.find((j) => T.includes(j))
  );
  o.testPackages = Object.fromEntries(
    await Promise.all(
      p.map(async (T) => [T, (await Qt(T))?.version])
    )
  ), o.hasRouterPackage = Ui(e);
  let f = Vi();
  f && (o.monorepo = f), o.packageManager = await qi();
  let x = a.typescript ? "typescript" : "javascript";
  if (!r)
    return {
      ...o,
      storybookVersionSpecifier: te.versions.storybook,
      language: x
    };
  o.hasCustomBabel = !!r.babel, o.hasCustomWebpack = !!r.webpackFinal, o.hasStaticDirs = !!r.staticDirs, typeof r.typescript == "object" && (o.
  typescriptOptions = r.typescript);
  let w = await Di(r);
  typeof r.refs == "object" && (o.refCount = Object.keys(r.refs).length), typeof r.features == "object" && (o.features = r.features);
  let _ = {};
  r.addons && r.addons.forEach((T) => {
    let j, ft;
    typeof T == "string" ? j = yn(T) : (T.name.includes("addon-essentials") && (ft = T.options), j = yn(T.name)), _[j] = {
      options: ft,
      version: void 0
    };
  });
  let P = ji(e);
  P && (_.chromatic = {
    version: void 0,
    versionSpecifier: P,
    options: void 0
  }), (await cn(_)).forEach(({ name: T, version: j }) => {
    _[T].version = j;
  });
  let A = Object.keys(_), J = Object.keys(a).filter((T) => T.includes("storybook") && !A.includes(T)).reduce((T, j) => ({
    ...T,
    [j]: { version: void 0 }
  }), {});
  (await cn(J)).forEach(({ name: T, version: j }) => {
    J[T].version = j;
  });
  let we = !!a["eslint-plugin-storybook"], Fe = (0, te.getStorybookInfo)(n);
  try {
    let { previewConfigPath: T } = Fe;
    if (T) {
      let j = await (0, zi.readConfig)(T), ft = !!(j.getFieldNode(["globals"]) || j.getFieldNode(["globalTypes"]));
      o.preview = { ...o.preview, usesGlobals: ft };
    }
  } catch {
  }
  let lt = await Gi(), pt = await Oi((0, Ki.dirname)(t));
  return {
    ...o,
    ...w,
    portableStoriesFileCount: lt,
    applicationFileCount: pt,
    storybookVersion: xt,
    storybookVersionSpecifier: Fe.version,
    language: x,
    storybookPackages: J,
    addons: _,
    hasStorybookEslint: we
  };
}, "computeStorybookMetadata");
async function nl() {
  let t = await pr(process.cwd());
  return t ? {
    packageJsonPath: t,
    packageJson: await Ln(t) || {}
  } : {
    packageJsonPath: process.cwd(),
    packageJson: {}
  };
}
i(nl, "getPackageJsonDetails");
var rr, gn = /* @__PURE__ */ i(async (t) => {
  if (rr)
    return rr;
  let { packageJson: e, packageJsonPath: r } = await nl(), n = (t || (0, te.getStorybookConfiguration)(
    String(e?.scripts?.storybook || ""),
    "-c",
    "--config-dir"
  )) ?? ".storybook", s = await (0, te.loadMainConfig)({ configDir: n }).catch(() => {
  });
  return rr = await Ji({
    mainConfig: s,
    packageJson: e,
    packageJsonPath: r,
    configDir: n
  }), rr;
}, "getStorybookMetadata");

// src/telemetry/telemetry.ts
var ca = k(require("node:os"), 1), da = k(Hi(), 1);

// ../node_modules/nanoid/index.js
var xn = require("crypto");

// ../node_modules/nanoid/url-alphabet/index.js
var Xi = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

// ../node_modules/nanoid/index.js
var sl = 128, _e, $e, ol = /* @__PURE__ */ i((t) => {
  !_e || _e.length < t ? (_e = Buffer.allocUnsafe(t * sl), (0, xn.randomFillSync)(_e), $e = 0) : $e + t > _e.length && ((0, xn.randomFillSync)(
  _e), $e = 0), $e += t;
}, "fillPool");
var dt = /* @__PURE__ */ i((t = 21) => {
  ol(t -= 0);
  let e = "";
  for (let r = $e - t; r < $e; r++)
    e += Xi[_e[r] & 63];
  return e;
}, "nanoid");

// src/telemetry/anonymous-id.ts
var ea = require("node:path"), ta = require("storybook/internal/common"), ra = require("child_process");
ci();

// src/telemetry/one-way-hash.ts
var Qi = require("crypto");
var sr = /* @__PURE__ */ i((t) => {
  let e = (0, Qi.createHash)("sha256");
  return e.update("storybook-telemetry-salt"), e.update(t), e.digest("hex");
}, "oneWayHash");

// src/telemetry/anonymous-id.ts
function il(t) {
  let n = t.trim().replace(/#.*$/, "").replace(/^.*@/, "").replace(/^.*\/\//, "");
  return (n.endsWith(".git") ? n : `${n}.git`).replace(":", "/");
}
i(il, "normalizeGitUrl");
function al(t, e) {
  return `${il(t)}${tn(e)}`;
}
i(al, "unhashedProjectId");
var or, na = /* @__PURE__ */ i(() => {
  if (or)
    return or;
  try {
    let t = (0, ea.relative)((0, ta.getProjectRoot)(), process.cwd()), e = (0, ra.execSync)("git config --local --get remote.origin.url", {
      timeout: 1e3,
      stdio: "pipe"
    });
    or = sr(al(String(e), t));
  } catch {
  }
  return or;
}, "getAnonymousProjectId");

// src/telemetry/event-cache.ts
var ir = require("storybook/internal/common");
var bn = Promise.resolve(), cl = /* @__PURE__ */ i(async (t, e) => {
  let r = await ir.cache.get("lastEvents") || {};
  r[t] = { body: e, timestamp: Date.now() }, await ir.cache.set("lastEvents", r);
}, "setHelper"), oa = /* @__PURE__ */ i(async (t, e) => (await bn, bn = cl(t, e), bn), "set");
var dl = /* @__PURE__ */ i((t) => {
  let { body: e, timestamp: r } = t;
  return {
    timestamp: r,
    eventType: e?.eventType,
    eventId: e?.eventId,
    sessionId: e?.sessionId
  };
}, "upgradeFields"), ul = ["init", "upgrade"], ll = ["build", "dev", "error"], sa = /* @__PURE__ */ i((t, e) => {
  let r = e.map((n) => t?.[n]).filter(Boolean).sort((n, s) => s.timestamp - n.timestamp);
  return r.length > 0 ? r[0] : void 0;
}, "lastEvent"), ia = /* @__PURE__ */ i(async (t = void 0) => {
  let e = t || await ir.cache.get("lastEvents") || {}, r = sa(e, ul), n = sa(e, ll);
  if (r)
    return !n?.timestamp || r.timestamp > n.timestamp ? dl(r) : void 0;
}, "getPrecedingUpgrade");

// src/telemetry/fetch.ts
var aa = global.fetch;

// src/telemetry/session-id.ts
var vn = require("storybook/internal/common");
var pl = 1e3 * 60 * 60 * 2, ut;
var _n = /* @__PURE__ */ i(async () => {
  let t = Date.now();
  if (!ut) {
    let e = await vn.cache.get("session");
    e && e.lastUsed >= t - pl ? ut = e.id : ut = dt();
  }
  return await vn.cache.set("session", { id: ut, lastUsed: t }), ut;
}, "getSessionId");

// src/telemetry/telemetry.ts
var fl = (0, da.default)(aa), ml = process.env.STORYBOOK_TELEMETRY_URL || "https://storybook.js.org/event-log", ar = [], ua = /* @__PURE__ */ i(
(t, e) => {
  wn[t] = e;
}, "addToGlobalContext"), hl = /* @__PURE__ */ i(() => {
  try {
    let t = ca.platform();
    return t === "win32" ? "Windows" : t === "darwin" ? "macOS" : t === "linux" ? "Linux" : `Other: ${t}`;
  } catch {
    return "Unknown";
  }
}, "getOperatingSystem"), wn = {
  inCI: !!process.env.CI,
  isTTY: process.stdout.isTTY,
  platform: hl(),
  nodeVersion: process.versions.node,
  storybookVersion: xt
}, yl = /* @__PURE__ */ i(async (t, e, r) => {
  let { eventType: n, payload: s, metadata: o, ...a } = t, c = await _n(), l = dt(), p = { ...a, eventType: n, eventId: l, sessionId: c, metadata: o,
  payload: s, context: e };
  return fl(ml, {
    method: "post",
    body: JSON.stringify(p),
    headers: { "Content-Type": "application/json" },
    retries: 3,
    retryOn: [503, 504],
    retryDelay: /* @__PURE__ */ i((f) => 2 ** f * (typeof r?.retryDelay == "number" && !Number.isNaN(r?.retryDelay) ? r.retryDelay : 1e3), "\
retryDelay")
  });
}, "prepareRequest");
async function la(t, e = { retryDelay: 1e3, immediate: !1 }) {
  let { eventType: r, payload: n, metadata: s, ...o } = t, a = e.stripMetadata ? wn : {
    ...wn,
    anonymousId: na()
  }, c;
  try {
    c = yl(t, a, e), ar.push(c), e.immediate ? await Promise.all(ar) : await c;
    let l = await _n(), p = dt(), f = { ...o, eventType: r, eventId: p, sessionId: l, metadata: s, payload: n, context: a };
    await oa(r, f);
  } catch {
  } finally {
    ar = ar.filter((l) => l !== c);
  }
}
i(la, "sendTelemetry");

// src/telemetry/index.ts
var gl = /* @__PURE__ */ i((t) => t.startsWith("example-button--") || t.startsWith("example-header--") || t.startsWith("example-page--"), "i\
sExampleStoryId"), xl = /* @__PURE__ */ i(async (t, e = {}, r = {}) => {
  t !== "boot" && r.notify !== !1 && await An();
  let n = {
    eventType: t,
    payload: e
  };
  try {
    r?.stripMetadata || (n.metadata = await gn(r?.configDir));
  } catch (s) {
    n.payload.metadataErrorMessage = We(s).message, r?.enableCrashReports && (n.payload.metadataError = We(s));
  } finally {
    let { error: s } = n.payload;
    s && (n.payload.error = We(s)), (!n.payload.error || r?.enableCrashReports) && (process.env?.STORYBOOK_TELEMETRY_DEBUG && (kn.logger.info(
    `
[telemetry]`), kn.logger.info(JSON.stringify(n, null, 2))), await la(n, r));
  }
}, "telemetry");
