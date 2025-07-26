var Cn = Object.create;
var $e = Object.defineProperty;
var Nn = Object.getOwnPropertyDescriptor;
var jn = Object.getOwnPropertyNames;
var kn = Object.getPrototypeOf, Dn = Object.prototype.hasOwnProperty;
var n = (e, t) => $e(e, "name", { value: t, configurable: !0 }), Pe = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy <
"u" ? new Proxy(e, {
  get: (t, r) => (typeof require < "u" ? require : t)[r]
}) : e)(function(e) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + e + '" is not supported');
});
var $r = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), L = (e, t) => {
  for (var r in t)
    $e(e, r, { get: t[r], enumerable: !0 });
}, Mn = (e, t, r, o) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let s of jn(t))
      !Dn.call(e, s) && s !== r && $e(e, s, { get: () => t[s], enumerable: !(o = Nn(t, s)) || o.enumerable });
  return e;
};
var Ot = (e, t, r) => (r = e != null ? Cn(kn(e)) : {}, Mn(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  t || !e || !e.__esModule ? $e(r, "default", { value: e, enumerable: !0 }) : r,
  e
));

// ../node_modules/memoizerific/memoizerific.js
var Bt = $r((co, $t) => {
  (function(e) {
    if (typeof co == "object" && typeof $t < "u")
      $t.exports = e();
    else if (typeof define == "function" && define.amd)
      define([], e);
    else {
      var t;
      typeof window < "u" ? t = window : typeof global < "u" ? t = global : typeof self < "u" ? t = self : t = this, t.memoizerific = e();
    }
  })(function() {
    var e, t, r;
    return (/* @__PURE__ */ n(function o(s, i, a) {
      function c(p, d) {
        if (!i[p]) {
          if (!s[p]) {
            var f = typeof Pe == "function" && Pe;
            if (!d && f) return f(p, !0);
            if (u) return u(p, !0);
            var y = new Error("Cannot find module '" + p + "'");
            throw y.code = "MODULE_NOT_FOUND", y;
          }
          var m = i[p] = { exports: {} };
          s[p][0].call(m.exports, function(h) {
            var g = s[p][1][h];
            return c(g || h);
          }, m, m.exports, o, s, i, a);
        }
        return i[p].exports;
      }
      n(c, "s");
      for (var u = typeof Pe == "function" && Pe, l = 0; l < a.length; l++) c(a[l]);
      return c;
    }, "e"))({ 1: [function(o, s, i) {
      s.exports = function(a) {
        if (typeof Map != "function" || a) {
          var c = o("./similar");
          return new c();
        } else
          return /* @__PURE__ */ new Map();
      };
    }, { "./similar": 2 }], 2: [function(o, s, i) {
      function a() {
        return this.list = [], this.lastItem = void 0, this.size = 0, this;
      }
      n(a, "Similar"), a.prototype.get = function(c) {
        var u;
        if (this.lastItem && this.isEqual(this.lastItem.key, c))
          return this.lastItem.val;
        if (u = this.indexOf(c), u >= 0)
          return this.lastItem = this.list[u], this.list[u].val;
      }, a.prototype.set = function(c, u) {
        var l;
        return this.lastItem && this.isEqual(this.lastItem.key, c) ? (this.lastItem.val = u, this) : (l = this.indexOf(c), l >= 0 ? (this.lastItem =
        this.list[l], this.list[l].val = u, this) : (this.lastItem = { key: c, val: u }, this.list.push(this.lastItem), this.size++, this));
      }, a.prototype.delete = function(c) {
        var u;
        if (this.lastItem && this.isEqual(this.lastItem.key, c) && (this.lastItem = void 0), u = this.indexOf(c), u >= 0)
          return this.size--, this.list.splice(u, 1)[0];
      }, a.prototype.has = function(c) {
        var u;
        return this.lastItem && this.isEqual(this.lastItem.key, c) ? !0 : (u = this.indexOf(c), u >= 0 ? (this.lastItem = this.list[u], !0) :
        !1);
      }, a.prototype.forEach = function(c, u) {
        var l;
        for (l = 0; l < this.size; l++)
          c.call(u || this, this.list[l].val, this.list[l].key, this);
      }, a.prototype.indexOf = function(c) {
        var u;
        for (u = 0; u < this.size; u++)
          if (this.isEqual(this.list[u].key, c))
            return u;
        return -1;
      }, a.prototype.isEqual = function(c, u) {
        return c === u || c !== c && u !== u;
      }, s.exports = a;
    }, {}], 3: [function(o, s, i) {
      var a = o("map-or-similar");
      s.exports = function(p) {
        var d = new a(!1), f = [];
        return function(y) {
          var m = /* @__PURE__ */ n(function() {
            var h = d, g, S, P = arguments.length - 1, E = Array(P + 1), v = !0, I;
            if ((m.numArgs || m.numArgs === 0) && m.numArgs !== P + 1)
              throw new Error("Memoizerific functions should always be called with the same number of arguments");
            for (I = 0; I < P; I++) {
              if (E[I] = {
                cacheItem: h,
                arg: arguments[I]
              }, h.has(arguments[I])) {
                h = h.get(arguments[I]);
                continue;
              }
              v = !1, g = new a(!1), h.set(arguments[I], g), h = g;
            }
            return v && (h.has(arguments[P]) ? S = h.get(arguments[P]) : v = !1), v || (S = y.apply(null, arguments), h.set(arguments[P], S)),
            p > 0 && (E[P] = {
              cacheItem: h,
              arg: arguments[P]
            }, v ? c(f, E) : f.push(E), f.length > p && u(f.shift())), m.wasMemoized = v, m.numArgs = P + 1, S;
          }, "memoizerific");
          return m.limit = p, m.wasMemoized = !1, m.cache = d, m.lru = f, m;
        };
      };
      function c(p, d) {
        var f = p.length, y = d.length, m, h, g;
        for (h = 0; h < f; h++) {
          for (m = !0, g = 0; g < y; g++)
            if (!l(p[h][g].arg, d[g].arg)) {
              m = !1;
              break;
            }
          if (m)
            break;
        }
        p.push(p.splice(h, 1)[0]);
      }
      n(c, "moveToMostRecentLru");
      function u(p) {
        var d = p.length, f = p[d - 1], y, m;
        for (f.cacheItem.delete(f.arg), m = d - 2; m >= 0 && (f = p[m], y = f.cacheItem.get(f.arg), !y || !y.size); m--)
          f.cacheItem.delete(f.arg);
      }
      n(u, "removeCachedResult");
      function l(p, d) {
        return p === d || p !== p && d !== d;
      }
      n(l, "isEqual");
    }, { "map-or-similar": 1 }] }, {}, [3])(3);
  });
});

// ../node_modules/store2/dist/store2.js
var Mo = $r((bt, Pt) => {
  (function(e, t) {
    var r = {
      version: "2.14.4",
      areas: {},
      apis: {},
      nsdelim: ".",
      // utilities
      inherit: /* @__PURE__ */ n(function(s, i) {
        for (var a in s)
          i.hasOwnProperty(a) || Object.defineProperty(i, a, Object.getOwnPropertyDescriptor(s, a));
        return i;
      }, "inherit"),
      stringify: /* @__PURE__ */ n(function(s, i) {
        return s === void 0 || typeof s == "function" ? s + "" : JSON.stringify(s, i || r.replace);
      }, "stringify"),
      parse: /* @__PURE__ */ n(function(s, i) {
        try {
          return JSON.parse(s, i || r.revive);
        } catch {
          return s;
        }
      }, "parse"),
      // extension hooks
      fn: /* @__PURE__ */ n(function(s, i) {
        r.storeAPI[s] = i;
        for (var a in r.apis)
          r.apis[a][s] = i;
      }, "fn"),
      get: /* @__PURE__ */ n(function(s, i) {
        return s.getItem(i);
      }, "get"),
      set: /* @__PURE__ */ n(function(s, i, a) {
        s.setItem(i, a);
      }, "set"),
      remove: /* @__PURE__ */ n(function(s, i) {
        s.removeItem(i);
      }, "remove"),
      key: /* @__PURE__ */ n(function(s, i) {
        return s.key(i);
      }, "key"),
      length: /* @__PURE__ */ n(function(s) {
        return s.length;
      }, "length"),
      clear: /* @__PURE__ */ n(function(s) {
        s.clear();
      }, "clear"),
      // core functions
      Store: /* @__PURE__ */ n(function(s, i, a) {
        var c = r.inherit(r.storeAPI, function(l, p, d) {
          return arguments.length === 0 ? c.getAll() : typeof p == "function" ? c.transact(l, p, d) : p !== void 0 ? c.set(l, p, d) : typeof l ==
          "string" || typeof l == "number" ? c.get(l) : typeof l == "function" ? c.each(l) : l ? c.setAll(l, p) : c.clear();
        });
        c._id = s;
        try {
          var u = "__store2_test";
          i.setItem(u, "ok"), c._area = i, i.removeItem(u);
        } catch {
          c._area = r.storage("fake");
        }
        return c._ns = a || "", r.areas[s] || (r.areas[s] = c._area), r.apis[c._ns + c._id] || (r.apis[c._ns + c._id] = c), c;
      }, "Store"),
      storeAPI: {
        // admin functions
        area: /* @__PURE__ */ n(function(s, i) {
          var a = this[s];
          return (!a || !a.area) && (a = r.Store(s, i, this._ns), this[s] || (this[s] = a)), a;
        }, "area"),
        namespace: /* @__PURE__ */ n(function(s, i, a) {
          if (a = a || this._delim || r.nsdelim, !s)
            return this._ns ? this._ns.substring(0, this._ns.length - a.length) : "";
          var c = s, u = this[c];
          if ((!u || !u.namespace) && (u = r.Store(this._id, this._area, this._ns + c + a), u._delim = a, this[c] || (this[c] = u), !i))
            for (var l in r.areas)
              u.area(l, r.areas[l]);
          return u;
        }, "namespace"),
        isFake: /* @__PURE__ */ n(function(s) {
          return s ? (this._real = this._area, this._area = r.storage("fake")) : s === !1 && (this._area = this._real || this._area), this._area.
          name === "fake";
        }, "isFake"),
        toString: /* @__PURE__ */ n(function() {
          return "store" + (this._ns ? "." + this.namespace() : "") + "[" + this._id + "]";
        }, "toString"),
        // storage functions
        has: /* @__PURE__ */ n(function(s) {
          return this._area.has ? this._area.has(this._in(s)) : this._in(s) in this._area;
        }, "has"),
        size: /* @__PURE__ */ n(function() {
          return this.keys().length;
        }, "size"),
        each: /* @__PURE__ */ n(function(s, i) {
          for (var a = 0, c = r.length(this._area); a < c; a++) {
            var u = this._out(r.key(this._area, a));
            if (u !== void 0 && s.call(this, u, this.get(u), i) === !1)
              break;
            c > r.length(this._area) && (c--, a--);
          }
          return i || this;
        }, "each"),
        keys: /* @__PURE__ */ n(function(s) {
          return this.each(function(i, a, c) {
            c.push(i);
          }, s || []);
        }, "keys"),
        get: /* @__PURE__ */ n(function(s, i) {
          var a = r.get(this._area, this._in(s)), c;
          return typeof i == "function" && (c = i, i = null), a !== null ? r.parse(a, c) : i ?? a;
        }, "get"),
        getAll: /* @__PURE__ */ n(function(s) {
          return this.each(function(i, a, c) {
            c[i] = a;
          }, s || {});
        }, "getAll"),
        transact: /* @__PURE__ */ n(function(s, i, a) {
          var c = this.get(s, a), u = i(c);
          return this.set(s, u === void 0 ? c : u), this;
        }, "transact"),
        set: /* @__PURE__ */ n(function(s, i, a) {
          var c = this.get(s), u;
          return c != null && a === !1 ? i : (typeof a == "function" && (u = a, a = void 0), r.set(this._area, this._in(s), r.stringify(i, u),
          a) || c);
        }, "set"),
        setAll: /* @__PURE__ */ n(function(s, i) {
          var a, c;
          for (var u in s)
            c = s[u], this.set(u, c, i) !== c && (a = !0);
          return a;
        }, "setAll"),
        add: /* @__PURE__ */ n(function(s, i, a) {
          var c = this.get(s);
          if (c instanceof Array)
            i = c.concat(i);
          else if (c !== null) {
            var u = typeof c;
            if (u === typeof i && u === "object") {
              for (var l in i)
                c[l] = i[l];
              i = c;
            } else
              i = c + i;
          }
          return r.set(this._area, this._in(s), r.stringify(i, a)), i;
        }, "add"),
        remove: /* @__PURE__ */ n(function(s, i) {
          var a = this.get(s, i);
          return r.remove(this._area, this._in(s)), a;
        }, "remove"),
        clear: /* @__PURE__ */ n(function() {
          return this._ns ? this.each(function(s) {
            r.remove(this._area, this._in(s));
          }, 1) : r.clear(this._area), this;
        }, "clear"),
        clearAll: /* @__PURE__ */ n(function() {
          var s = this._area;
          for (var i in r.areas)
            r.areas.hasOwnProperty(i) && (this._area = r.areas[i], this.clear());
          return this._area = s, this;
        }, "clearAll"),
        // internal use functions
        _in: /* @__PURE__ */ n(function(s) {
          return typeof s != "string" && (s = r.stringify(s)), this._ns ? this._ns + s : s;
        }, "_in"),
        _out: /* @__PURE__ */ n(function(s) {
          return this._ns ? s && s.indexOf(this._ns) === 0 ? s.substring(this._ns.length) : void 0 : (
            // so each() knows to skip it
            s
          );
        }, "_out")
      },
      // end _.storeAPI
      storage: /* @__PURE__ */ n(function(s) {
        return r.inherit(r.storageAPI, { items: {}, name: s });
      }, "storage"),
      storageAPI: {
        length: 0,
        has: /* @__PURE__ */ n(function(s) {
          return this.items.hasOwnProperty(s);
        }, "has"),
        key: /* @__PURE__ */ n(function(s) {
          var i = 0;
          for (var a in this.items)
            if (this.has(a) && s === i++)
              return a;
        }, "key"),
        setItem: /* @__PURE__ */ n(function(s, i) {
          this.has(s) || this.length++, this.items[s] = i;
        }, "setItem"),
        removeItem: /* @__PURE__ */ n(function(s) {
          this.has(s) && (delete this.items[s], this.length--);
        }, "removeItem"),
        getItem: /* @__PURE__ */ n(function(s) {
          return this.has(s) ? this.items[s] : null;
        }, "getItem"),
        clear: /* @__PURE__ */ n(function() {
          for (var s in this.items)
            this.removeItem(s);
        }, "clear")
      }
      // end _.storageAPI
    }, o = (
      // safely set this up (throws error in IE10/32bit mode for local files)
      r.Store("local", function() {
        try {
          return localStorage;
        } catch {
        }
      }())
    );
    o.local = o, o._ = r, o.area("session", function() {
      try {
        return sessionStorage;
      } catch {
      }
    }()), o.area("page", r.storage("page")), typeof t == "function" && t.amd !== void 0 ? t("store2", [], function() {
      return o;
    }) : typeof Pt < "u" && Pt.exports ? Pt.exports = o : (e.store && (r.conflict = e.store), e.store = o);
  })(bt, bt && bt.define);
});

// src/manager-api/root.tsx
import me, {
  Component as vu,
  Fragment as _u,
  useCallback as ke,
  useContext as Mr,
  useEffect as hn,
  useMemo as Dr,
  useRef as fn,
  useState as Iu
} from "react";
import {
  DOCS_PREPARED as xu,
  SET_STORIES as Tu,
  SHARED_STATE_CHANGED as yn,
  SHARED_STATE_SET as je,
  STORY_CHANGED as Ru,
  STORY_PREPARED as wu
} from "storybook/internal/core-events";

// ../node_modules/es-toolkit/dist/array/countBy.mjs
function Ct(e, t) {
  let r = {};
  for (let o = 0; o < e.length; o++) {
    let s = e[o], i = t(s);
    r[i] = (r[i] ?? 0) + 1;
  }
  return r;
}
n(Ct, "countBy");

// ../node_modules/es-toolkit/dist/array/partition.mjs
function Be(e, t) {
  let r = [], o = [];
  for (let s = 0; s < e.length; s++) {
    let i = e[s];
    t(i) ? r.push(i) : o.push(i);
  }
  return [r, o];
}
n(Be, "partition");

// ../node_modules/es-toolkit/dist/function/noop.mjs
function Br() {
}
n(Br, "noop");

// ../node_modules/es-toolkit/dist/predicate/isPrimitive.mjs
function Vr(e) {
  return e == null || typeof e != "object" && typeof e != "function";
}
n(Vr, "isPrimitive");

// ../node_modules/es-toolkit/dist/predicate/isTypedArray.mjs
function Kr(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
n(Kr, "isTypedArray");

// ../node_modules/es-toolkit/dist/compat/_internal/getSymbols.mjs
function Ae(e) {
  return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
n(Ae, "getSymbols");

// ../node_modules/es-toolkit/dist/compat/_internal/getTag.mjs
function Ee(e) {
  return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
n(Ee, "getTag");

// ../node_modules/es-toolkit/dist/compat/_internal/tags.mjs
var Ve = "[object RegExp]", Ke = "[object String]", ze = "[object Number]", He = "[object Boolean]", ve = "[object Arguments]", qe = "[objec\
t Symbol]", Ye = "[object Date]", Je = "[object Map]", Xe = "[object Set]", Qe = "[object Array]", zr = "[object Function]", Ze = "[object A\
rrayBuffer]", ne = "[object Object]", Hr = "[object Error]", et = "[object DataView]", tt = "[object Uint8Array]", rt = "[object Uint8Clampe\
dArray]", ot = "[object Uint16Array]", nt = "[object Uint32Array]", qr = "[object BigUint64Array]", st = "[object Int8Array]", at = "[object\
 Int16Array]", it = "[object Int32Array]", Yr = "[object BigInt64Array]", ct = "[object Float32Array]", ut = "[object Float64Array]";

// ../node_modules/es-toolkit/dist/object/cloneDeepWith.mjs
function Q(e, t, r, o = /* @__PURE__ */ new Map(), s = void 0) {
  let i = s?.(e, t, r, o);
  if (i != null)
    return i;
  if (Vr(e))
    return e;
  if (o.has(e))
    return o.get(e);
  if (Array.isArray(e)) {
    let a = new Array(e.length);
    o.set(e, a);
    for (let c = 0; c < e.length; c++)
      a[c] = Q(e[c], c, r, o, s);
    return Object.hasOwn(e, "index") && (a.index = e.index), Object.hasOwn(e, "input") && (a.input = e.input), a;
  }
  if (e instanceof Date)
    return new Date(e.getTime());
  if (e instanceof RegExp) {
    let a = new RegExp(e.source, e.flags);
    return a.lastIndex = e.lastIndex, a;
  }
  if (e instanceof Map) {
    let a = /* @__PURE__ */ new Map();
    o.set(e, a);
    for (let [c, u] of e)
      a.set(c, Q(u, c, r, o, s));
    return a;
  }
  if (e instanceof Set) {
    let a = /* @__PURE__ */ new Set();
    o.set(e, a);
    for (let c of e)
      a.add(Q(c, void 0, r, o, s));
    return a;
  }
  if (typeof Buffer < "u" && Buffer.isBuffer(e))
    return e.subarray();
  if (Kr(e)) {
    let a = new (Object.getPrototypeOf(e)).constructor(e.length);
    o.set(e, a);
    for (let c = 0; c < e.length; c++)
      a[c] = Q(e[c], c, r, o, s);
    return a;
  }
  if (e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer)
    return e.slice(0);
  if (e instanceof DataView) {
    let a = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
    return o.set(e, a), _e(a, e, r, o, s), a;
  }
  if (typeof File < "u" && e instanceof File) {
    let a = new File([e], e.name, {
      type: e.type
    });
    return o.set(e, a), _e(a, e, r, o, s), a;
  }
  if (e instanceof Blob) {
    let a = new Blob([e], { type: e.type });
    return o.set(e, a), _e(a, e, r, o, s), a;
  }
  if (e instanceof Error) {
    let a = new e.constructor();
    return o.set(e, a), a.message = e.message, a.name = e.name, a.stack = e.stack, a.cause = e.cause, _e(a, e, r, o, s), a;
  }
  if (typeof e == "object" && Un(e)) {
    let a = Object.create(Object.getPrototypeOf(e));
    return o.set(e, a), _e(a, e, r, o, s), a;
  }
  return e;
}
n(Q, "cloneDeepWithImpl");
function _e(e, t, r = e, o, s) {
  let i = [...Object.keys(t), ...Ae(t)];
  for (let a = 0; a < i.length; a++) {
    let c = i[a], u = Object.getOwnPropertyDescriptor(e, c);
    (u == null || u.writable) && (e[c] = Q(t[c], c, r, o, s));
  }
}
n(_e, "copyProperties");
function Un(e) {
  switch (Ee(e)) {
    case ve:
    case Qe:
    case Ze:
    case et:
    case He:
    case Ye:
    case ct:
    case ut:
    case st:
    case at:
    case it:
    case Je:
    case ze:
    case ne:
    case Ve:
    case Xe:
    case Ke:
    case qe:
    case tt:
    case rt:
    case ot:
    case nt:
      return !0;
    default:
      return !1;
  }
}
n(Un, "isCloneableObject");

// ../node_modules/es-toolkit/dist/object/cloneDeep.mjs
function Jr(e) {
  return Q(e, void 0, e, /* @__PURE__ */ new Map(), void 0);
}
n(Jr, "cloneDeep");

// ../node_modules/es-toolkit/dist/predicate/isPlainObject.mjs
function se(e) {
  if (!e || typeof e != "object")
    return !1;
  let t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype || Object.getPrototypeOf(t) === null ? Object.prototype.toString.call(e) === "[object Object]" :
  !1;
}
n(se, "isPlainObject");

// ../node_modules/es-toolkit/dist/object/mapValues.mjs
function Nt(e, t) {
  let r = {}, o = Object.keys(e);
  for (let s = 0; s < o.length; s++) {
    let i = o[s], a = e[i];
    r[i] = t(a, i, e);
  }
  return r;
}
n(Nt, "mapValues");

// ../node_modules/es-toolkit/dist/object/merge.mjs
function ae(e, t) {
  let r = Object.keys(t);
  for (let o = 0; o < r.length; o++) {
    let s = r[o], i = t[s], a = e[s];
    Array.isArray(i) ? Array.isArray(a) ? e[s] = ae(a, i) : e[s] = ae([], i) : se(i) ? se(a) ? e[s] = ae(a, i) : e[s] = ae({}, i) : (a === void 0 ||
    i !== void 0) && (e[s] = i);
  }
  return e;
}
n(ae, "merge");

// ../node_modules/es-toolkit/dist/compat/predicate/isObjectLike.mjs
function jt(e) {
  return typeof e == "object" && e !== null;
}
n(jt, "isObjectLike");

// ../node_modules/es-toolkit/dist/object/mergeWith.mjs
function q(e, t, r) {
  let o = Object.keys(t);
  for (let s = 0; s < o.length; s++) {
    let i = o[s], a = t[i], c = e[i], u = r(c, a, i, e, t);
    u != null ? e[i] = u : Array.isArray(a) ? e[i] = q(c ?? [], a, r) : jt(c) && jt(a) ? e[i] = q(c ?? {}, a, r) : (c === void 0 || a !== void 0) &&
    (e[i] = a);
  }
  return e;
}
n(q, "mergeWith");

// ../node_modules/es-toolkit/dist/object/pick.mjs
function Z(e, t) {
  let r = {};
  for (let o = 0; o < t.length; o++) {
    let s = t[o];
    Object.hasOwn(e, s) && (r[s] = e[s]);
  }
  return r;
}
n(Z, "pick");

// ../node_modules/es-toolkit/dist/object/toMerged.mjs
function Ie(e, t) {
  return ae(Jr(e), t);
}
n(Ie, "toMerged");

// ../node_modules/es-toolkit/dist/compat/util/eq.mjs
function Xr(e, t) {
  return e === t || Number.isNaN(e) && Number.isNaN(t);
}
n(Xr, "eq");

// ../node_modules/es-toolkit/dist/predicate/isEqualWith.mjs
function Qr(e, t, r) {
  return xe(e, t, void 0, void 0, void 0, void 0, r);
}
n(Qr, "isEqualWith");
function xe(e, t, r, o, s, i, a) {
  let c = a(e, t, r, o, s, i);
  if (c !== void 0)
    return c;
  if (typeof e == typeof t)
    switch (typeof e) {
      case "bigint":
      case "string":
      case "boolean":
      case "symbol":
      case "undefined":
        return e === t;
      case "number":
        return e === t || Object.is(e, t);
      case "function":
        return e === t;
      case "object":
        return Te(e, t, i, a);
    }
  return Te(e, t, i, a);
}
n(xe, "isEqualWithImpl");
function Te(e, t, r, o) {
  if (Object.is(e, t))
    return !0;
  let s = Ee(e), i = Ee(t);
  if (s === ve && (s = ne), i === ve && (i = ne), s !== i)
    return !1;
  switch (s) {
    case Ke:
      return e.toString() === t.toString();
    case ze: {
      let u = e.valueOf(), l = t.valueOf();
      return Xr(u, l);
    }
    case He:
    case Ye:
    case qe:
      return Object.is(e.valueOf(), t.valueOf());
    case Ve:
      return e.source === t.source && e.flags === t.flags;
    case zr:
      return e === t;
  }
  r = r ?? /* @__PURE__ */ new Map();
  let a = r.get(e), c = r.get(t);
  if (a != null && c != null)
    return a === t;
  r.set(e, t), r.set(t, e);
  try {
    switch (s) {
      case Je: {
        if (e.size !== t.size)
          return !1;
        for (let [u, l] of e.entries())
          if (!t.has(u) || !xe(l, t.get(u), u, e, t, r, o))
            return !1;
        return !0;
      }
      case Xe: {
        if (e.size !== t.size)
          return !1;
        let u = Array.from(e.values()), l = Array.from(t.values());
        for (let p = 0; p < u.length; p++) {
          let d = u[p], f = l.findIndex((y) => xe(d, y, void 0, e, t, r, o));
          if (f === -1)
            return !1;
          l.splice(f, 1);
        }
        return !0;
      }
      case Qe:
      case tt:
      case rt:
      case ot:
      case nt:
      case qr:
      case st:
      case at:
      case it:
      case Yr:
      case ct:
      case ut: {
        if (typeof Buffer < "u" && Buffer.isBuffer(e) !== Buffer.isBuffer(t) || e.length !== t.length)
          return !1;
        for (let u = 0; u < e.length; u++)
          if (!xe(e[u], t[u], u, e, t, r, o))
            return !1;
        return !0;
      }
      case Ze:
        return e.byteLength !== t.byteLength ? !1 : Te(new Uint8Array(e), new Uint8Array(t), r, o);
      case et:
        return e.byteLength !== t.byteLength || e.byteOffset !== t.byteOffset ? !1 : Te(new Uint8Array(e), new Uint8Array(t), r, o);
      case Hr:
        return e.name === t.name && e.message === t.message;
      case ne: {
        if (!(Te(e.constructor, t.constructor, r, o) || se(e) && se(t)))
          return !1;
        let l = [...Object.keys(e), ...Ae(e)], p = [...Object.keys(t), ...Ae(t)];
        if (l.length !== p.length)
          return !1;
        for (let d = 0; d < l.length; d++) {
          let f = l[d], y = e[f];
          if (!Object.hasOwn(t, f))
            return !1;
          let m = t[f];
          if (!xe(y, m, f, e, t, r, o))
            return !1;
        }
        return !0;
      }
      default:
        return !1;
    }
  } finally {
    r.delete(e), r.delete(t);
  }
}
n(Te, "areObjectsEqual");

// ../node_modules/es-toolkit/dist/predicate/isEqual.mjs
function M(e, t) {
  return Qr(e, t, Br);
}
n(M, "isEqual");

// src/manager-api/context.ts
import { createContext as Ln } from "react";
var Zr = /* @__PURE__ */ n(({ api: e, state: t }) => Ln({ api: e, state: t }), "createContext");

// src/manager-api/lib/merge.ts
import { logger as eo } from "storybook/internal/client-logger";
var K = /* @__PURE__ */ n((e, ...t) => {
  let r = {};
  r = q(
    {},
    e,
    (o, s) => {
      if (Array.isArray(s) && Array.isArray(o))
        return s.forEach((i) => {
          o.find((c) => c === i || M(c, i)) || o.push(i);
        }), o;
      if (Array.isArray(o))
        return eo.log(["the types mismatch, picking", o]), o;
    }
  );
  for (let o of t)
    r = q(r, o, (s, i) => {
      if (Array.isArray(i) && Array.isArray(s))
        return i.forEach((a) => {
          s.find((u) => u === a || M(u, a)) || s.push(a);
        }), s;
      if (Array.isArray(s))
        return eo.log(["the types mismatch, picking", s]), s;
    });
  return r;
}, "default"), to = /* @__PURE__ */ n((e, ...t) => {
  let r = {};
  r = q(
    {},
    e,
    (o, s) => {
      if (Array.isArray(s))
        return s;
    }
  );
  for (let o of t)
    r = q(r, o, (s, i) => {
      if (Array.isArray(i))
        return i;
    });
  return r;
}, "noArrayMerge");

// src/manager-api/initial-state.ts
var Fn = /* @__PURE__ */ n((...e) => e.reduce((t, r) => K(t, r), {}), "main"), lt = Fn;

// src/manager-api/lib/addons.ts
import { logger as Gn } from "storybook/internal/client-logger";
import { SET_CONFIG as ro } from "storybook/internal/core-events";
import { Addon_TypesEnum as oo } from "storybook/internal/types";
import { global as Dt } from "@storybook/global";

// src/manager-api/lib/storybook-channel-mock.ts
import { Channel as Wn } from "storybook/internal/channels";
function kt() {
  let e = {
    setHandler: /* @__PURE__ */ n(() => {
    }, "setHandler"),
    send: /* @__PURE__ */ n(() => {
    }, "send")
  };
  return new Wn({ transport: e });
}
n(kt, "mockChannel");

// src/manager-api/lib/addons.ts
var Lt = class Lt {
  constructor() {
    this.loaders = {};
    this.elements = {};
    this.config = {};
    this.getChannel = /* @__PURE__ */ n(() => (this.channel || this.setChannel(kt()), this.channel), "getChannel");
    this.ready = /* @__PURE__ */ n(() => this.promise, "ready");
    this.hasChannel = /* @__PURE__ */ n(() => !!this.channel, "hasChannel");
    this.setChannel = /* @__PURE__ */ n((t) => {
      this.channel = t, this.resolve();
    }, "setChannel");
    this.setConfig = /* @__PURE__ */ n((t) => {
      Object.assign(this.config, t), this.hasChannel() ? this.getChannel().emit(ro, this.config) : this.ready().then((r) => {
        r.emit(ro, this.config);
      });
    }, "setConfig");
    this.getConfig = /* @__PURE__ */ n(() => this.config, "getConfig");
    /**
     * Registers an addon loader function.
     *
     * @param {string} id - The id of the addon loader.
     * @param {(api: API) => void} callback - The function that will be called to register the addon.
     * @returns {void}
     */
    this.register = /* @__PURE__ */ n((t, r) => {
      this.loaders[t] && Gn.warn(`${t} was loaded twice, this could have bad side-effects`), this.loaders[t] = r;
    }, "register");
    this.loadAddons = /* @__PURE__ */ n((t) => {
      Object.values(this.loaders).forEach((r) => r(t));
    }, "loadAddons");
    this.promise = new Promise((t) => {
      this.resolve = () => t(this.getChannel());
    });
  }
  getElements(t) {
    return this.elements[t] || (this.elements[t] = {}), this.elements[t];
  }
  /**
   * Adds an addon to the addon store.
   *
   * @param {string} id - The id of the addon.
   * @param {Addon_Type} addon - The addon to add.
   * @returns {void}
   */
  add(t, r) {
    let { type: o } = r, s = this.getElements(o);
    s[t] = { ...r, id: t };
  }
  experimental_getRegisteredAddons() {
    return Object.keys(this.loaders);
  }
};
n(Lt, "AddonStore");
var Ut = Lt, Mt = "__STORYBOOK_ADDONS_MANAGER";
function $n() {
  return Dt[Mt] || (Dt[Mt] = new Ut()), Dt[Mt];
}
n($n, "getAddonsStore");
var Bn = $n();

// src/manager-api/modules/addons.ts
var Wt = {};
L(Wt, {
  ensurePanel: () => Ft,
  init: () => Vn
});
import { Addon_TypesEnum as no } from "storybook/internal/types";
function Ft(e, t, r) {
  let o = Object.keys(e);
  return o.indexOf(t) >= 0 ? t : o.length ? o[0] : r;
}
n(Ft, "ensurePanel");
var Vn = /* @__PURE__ */ n(({ provider: e, store: t, fullAPI: r }) => {
  let o = {
    getElements: /* @__PURE__ */ n((s) => e.getElements(s), "getElements"),
    getSelectedPanel: /* @__PURE__ */ n(() => {
      let { selectedPanel: s } = t.getState();
      return Ft(o.getElements(no.PANEL), s, s);
    }, "getSelectedPanel"),
    setSelectedPanel: /* @__PURE__ */ n((s) => {
      t.setState({ selectedPanel: s }, { persistence: "session" });
    }, "setSelectedPanel"),
    setAddonState(s, i, a) {
      let c = typeof i == "function" ? i : () => i;
      return t.setState(
        (u) => ({ ...u, addons: { ...u.addons, [s]: c(u.addons[s]) } }),
        a
      ).then(() => o.getAddonState(s));
    },
    getAddonState: /* @__PURE__ */ n((s) => t.getState().addons[s] || globalThis?.STORYBOOK_ADDON_STATE[s], "getAddonState")
  };
  return {
    api: o,
    state: {
      selectedPanel: Ft(
        o.getElements(no.PANEL),
        t.getState().selectedPanel
      ),
      addons: {}
    }
  };
}, "init");

// src/manager-api/modules/channel.ts
var Gt = {};
L(Gt, {
  init: () => Kn
});
var Kn = /* @__PURE__ */ n(({ provider: e }) => ({ api: {
  getChannel: /* @__PURE__ */ n(() => e.channel, "getChannel"),
  on: /* @__PURE__ */ n((r, o) => (e.channel?.on(r, o), () => e.channel?.off(r, o)), "on"),
  off: /* @__PURE__ */ n((r, o) => e.channel?.off(r, o), "off"),
  once: /* @__PURE__ */ n((r, o) => e.channel?.once(r, o), "once"),
  emit: /* @__PURE__ */ n((r, o, ...s) => {
    o?.options?.target && o.options.target !== "storybook-preview-iframe" && !o.options.target.startsWith("storybook-ref-") && (o.options.target =
    o.options.target !== "storybook_internal" ? `storybook-ref-${o.options.target}` : "storybook-preview-iframe"), e.channel?.emit(r, o, ...s);
  }, "emit")
}, state: {} }), "init");

// src/manager-api/modules/globals.ts
var qt = {};
L(qt, {
  init: () => ss
});
import { logger as Ao } from "storybook/internal/client-logger";
import { GLOBALS_UPDATED as rs, SET_GLOBALS as os, UPDATE_GLOBALS as ns } from "storybook/internal/core-events";

// ../node_modules/dequal/dist/index.mjs
var so = Object.prototype.hasOwnProperty;
function ao(e, t, r) {
  for (r of e.keys())
    if (F(r, t)) return r;
}
n(ao, "find");
function F(e, t) {
  var r, o, s;
  if (e === t) return !0;
  if (e && t && (r = e.constructor) === t.constructor) {
    if (r === Date) return e.getTime() === t.getTime();
    if (r === RegExp) return e.toString() === t.toString();
    if (r === Array) {
      if ((o = e.length) === t.length)
        for (; o-- && F(e[o], t[o]); ) ;
      return o === -1;
    }
    if (r === Set) {
      if (e.size !== t.size)
        return !1;
      for (o of e)
        if (s = o, s && typeof s == "object" && (s = ao(t, s), !s) || !t.has(s)) return !1;
      return !0;
    }
    if (r === Map) {
      if (e.size !== t.size)
        return !1;
      for (o of e)
        if (s = o[0], s && typeof s == "object" && (s = ao(t, s), !s) || !F(o[1], t.get(s)))
          return !1;
      return !0;
    }
    if (r === ArrayBuffer)
      e = new Uint8Array(e), t = new Uint8Array(t);
    else if (r === DataView) {
      if ((o = e.byteLength) === t.byteLength)
        for (; o-- && e.getInt8(o) === t.getInt8(o); ) ;
      return o === -1;
    }
    if (ArrayBuffer.isView(e)) {
      if ((o = e.byteLength) === t.byteLength)
        for (; o-- && e[o] === t[o]; ) ;
      return o === -1;
    }
    if (!r || typeof e == "object") {
      o = 0;
      for (r in e)
        if (so.call(e, r) && ++o && !so.call(t, r) || !(r in t) || !F(e[r], t[r])) return !1;
      return Object.keys(t).length === o;
    }
  }
  return e !== e && t !== t;
}
n(F, "dequal");

// src/manager-api/lib/events.ts
import { logger as ts } from "storybook/internal/client-logger";

// src/manager-api/modules/refs.ts
var Ht = {};
L(Ht, {
  defaultStoryMapper: () => Po,
  getSourceType: () => zt,
  init: () => es
});
import { global as bo } from "@storybook/global";

// ../node_modules/ts-dedent/esm/index.js
function j(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  var o = Array.from(typeof e == "string" ? [e] : e);
  o[o.length - 1] = o[o.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var s = o.reduce(function(c, u) {
    var l = u.match(/\n([\t ]+|(?!\s).)/g);
    return l ? c.concat(l.map(function(p) {
      var d, f;
      return (f = (d = p.match(/[\t ]/g)) === null || d === void 0 ? void 0 : d.length) !== null && f !== void 0 ? f : 0;
    })) : c;
  }, []);
  if (s.length) {
    var i = new RegExp(`
[	 ]{` + Math.min.apply(Math, s) + "}", "g");
    o = o.map(function(c) {
      return c.replace(i, `
`);
    });
  }
  o[0] = o[0].replace(/^\r?\n/, "");
  var a = o[0];
  return t.forEach(function(c, u) {
    var l = a.match(/(?:^|\n)( *)$/), p = l ? l[1] : "", d = c;
    typeof c == "string" && c.includes(`
`) && (d = String(c).split(`
`).map(function(f, y) {
      return y === 0 ? f : "" + p + f;
    }).join(`
`)), a += d + o[u + 1];
  }), a;
}
n(j, "dedent");
var io = j;

// src/manager-api/lib/stories.ts
import { sanitize as zn } from "storybook/internal/csf";
var Vt = Ot(Bt(), 1);

// src/manager-api/lib/intersect.ts
var uo = /* @__PURE__ */ n((e, t) => !Array.isArray(e) || !Array.isArray(t) || !e.length || !t.length ? [] : e.reduce((r, o) => (t.includes(
o) && r.push(o), r), []), "default");

// src/manager-api/lib/stories.ts
var Hn = /\s*\/\s*/, lo = /* @__PURE__ */ n(({
  globalParameters: e,
  kindParameters: t,
  stories: r
}) => Nt(r, (o) => ({
  ...o,
  parameters: mo(
    e,
    t[o.kind],
    o.parameters
  )
})), "denormalizeStoryParameters"), po = /* @__PURE__ */ n((e) => ({ v: 5, entries: Object.entries(e).reduce(
  (r, [o, s]) => {
    if (!s)
      return r;
    let { docsOnly: i, fileName: a, ...c } = s.parameters, u = {
      title: s.kind,
      id: o,
      name: s.name,
      importPath: a
    };
    if (i)
      r[o] = {
        type: "docs",
        tags: ["stories-mdx"],
        storiesImports: [],
        ...u
      };
    else {
      let { argTypes: l, args: p, initialArgs: d } = s;
      r[o] = {
        type: "story",
        ...u,
        parameters: c,
        argTypes: l,
        args: p,
        initialArgs: d
      };
    }
    return r;
  },
  {}
) }), "transformSetStoriesStoryDataToPreparedStoryIndex"), qn = /* @__PURE__ */ n((e) => ({
  v: 3,
  stories: Object.values(e.stories).reduce(
    (t, r) => (t[r.id] = {
      ...r,
      title: r.kind,
      name: r.name || r.story,
      importPath: r.parameters.fileName || ""
    }, t),
    {}
  )
}), "transformStoryIndexV2toV3"), Yn = /* @__PURE__ */ n((e) => {
  let t = Ct(Object.values(e.stories), (r) => r.title);
  return {
    v: 4,
    entries: Object.values(e.stories).reduce(
      (r, o) => {
        let s = "story";
        return (o.parameters?.docsOnly || o.name === "Page" && t[o.title] === 1) && (s = "docs"), r[o.id] = {
          type: s,
          ...s === "docs" && { tags: ["stories-mdx"], storiesImports: [] },
          ...o
        }, delete r[o.id].story, delete r[o.id].kind, r;
      },
      {}
    )
  };
}, "transformStoryIndexV3toV4"), Jn = /* @__PURE__ */ n((e) => ({
  v: 5,
  entries: Object.values(e.entries).reduce(
    (t, r) => (t[r.id] = {
      ...r,
      tags: r.tags ? ["dev", "test", ...r.tags] : ["dev"]
    }, t),
    {}
  )
}), "transformStoryIndexV4toV5"), ie = /* @__PURE__ */ n((e, { provider: t, docsOptions: r, filters: o, allStatuses: s }) => {
  if (!e.v)
    throw new Error("Composition: Missing stories.json version");
  let i = e;
  i = i.v === 2 ? qn(i) : i, i = i.v === 3 ? Yn(i) : i, i = i.v === 4 ? Jn(i) : i, i = i;
  let a = Object.values(i.entries).filter((h) => {
    let g = !0, S = s[h.id] ?? {};
    return Object.values(S).some(({ value: P }) => P === "status-value:error") || Object.values(o).forEach((P) => {
      g !== !1 && (g = P({ ...h, statuses: S }));
    }), g;
  }), { sidebar: c = {} } = t.getConfig(), { showRoots: u, collapsedRoots: l = [], renderLabel: p } = c, d = typeof u < "u", f = a.reduce((h, g) => {
    if (r.docsMode && g.type !== "docs")
      return h;
    let { title: S } = g, P = S.trim().split(Hn), E = (!d || u) && P.length > 1 ? [P.shift()] : [], v = [...E, ...P], I = v.reduce((_, w, C) => {
      let x = C > 0 && _[C - 1], he = zn(x ? `${x}-${w}` : w);
      if (w.trim() === "")
        throw new Error(j`Invalid title ${S} ending in slash.`);
      if (x === he)
        throw new Error(
          j`
          Invalid part '${w}', leading to id === parentId ('${he}'), inside title '${S}'
          
          Did you create a path that uses the separator char accidentally, such as 'Vue <docs/>' where '/' is a separator char? See https://github.com/storybookjs/storybook/issues/6128
          `
        );
      return _.push(he), _;
    }, []);
    return I.forEach((_, w) => {
      let C = I[w + 1] || g.id;
      E.length && w === 0 ? h[_] = K(h[_] || {}, {
        type: "root",
        id: _,
        name: v[w],
        tags: [],
        depth: w,
        renderLabel: p,
        startCollapsed: l.includes(_),
        // Note that this will later get appended to the previous list of children (see below)
        children: [C]
      }) : (!h[_] || h[_].type === "component") && w === I.length - 1 ? h[_] = K(h[_] || {}, {
        type: "component",
        id: _,
        name: v[w],
        tags: [],
        parent: I[w - 1],
        depth: w,
        renderLabel: p,
        ...C && {
          children: [C]
        }
      }) : h[_] = K(h[_] || {}, {
        type: "group",
        id: _,
        name: v[w],
        tags: [],
        parent: I[w - 1],
        depth: w,
        renderLabel: p,
        ...C && {
          children: [C]
        }
      });
    }), h[g.id] = {
      type: "story",
      tags: [],
      ...g,
      depth: I.length,
      parent: I[I.length - 1],
      renderLabel: p,
      prepared: !!g.parameters
    }, h;
  }, {});
  function y(h, g) {
    return h[g.id] || (h[g.id] = g, (g.type === "root" || g.type === "group" || g.type === "component") && (g.children.forEach((S) => y(h, f[S])),
    g.tags = g.children.reduce((S, P) => {
      let E = h[P];
      return S === null ? E.tags : uo(S, E.tags);
    }, null))), h;
  }
  n(y, "addItem");
  let m = Object.values(f).filter((h) => h.type !== "root" && !h.parent).reduce(y, {});
  return Object.values(f).filter((h) => h.type === "root").reduce(y, m);
}, "transformStoryIndexToStoriesHash"), Kt = /* @__PURE__ */ n((e, t) => t ? Object.fromEntries(
  Object.entries(e).map(([r, o]) => {
    let s = t[r];
    return o.type === "story" && s?.type === "story" && s.prepared ? [r, { ...s, ...o, prepared: !0 }] : [r, o];
  })
) : e, "addPreparedStories"), fo = (0, Vt.default)(1)((e) => Object.entries(e).reduce((t, r) => {
  let o = r[1];
  return o.type === "component" && t.push([...o.children]), t;
}, [])), yo = (0, Vt.default)(1)((e) => Object.keys(e).filter((t) => ["story", "docs"].includes(e[t].type)));

// src/manager-api/modules/refs.ts
var { location: Xn, fetch: ho } = bo, zt = /* @__PURE__ */ n((e, t) => {
  let { origin: r, pathname: o } = Xn, { origin: s, pathname: i } = new URL(e), a = `${r + o}`.replace("/iframe.html", "").replace(/\/$/, ""),
  c = `${s + i}`.replace("/iframe.html", "").replace(/\/$/, "");
  return a === c ? ["local", c] : t || e ? ["external", c] : [null, null];
}, "getSourceType"), Po = /* @__PURE__ */ n((e, t) => ({ ...t, kind: t.kind.replace("|", "/") }), "defaultStoryMapper"), go = /* @__PURE__ */ n(
(e, t) => Object.entries(e).reduce((r, [o, s]) => ({ ...r, [o]: { ...s, refId: t.id } }), {}), "addRefIds");
async function So(e) {
  if (!e)
    return {};
  try {
    let t = await e;
    if (t === !1 || t === !0)
      throw new Error("Unexpected boolean response");
    if (!t.ok)
      throw new Error(`Unexpected response not OK: ${t.statusText}`);
    let r = await t.json();
    return r.entries || r.stories ? { storyIndex: r } : r;
  } catch (t) {
    return { indexError: t };
  }
}
n(So, "handleRequest");
var Qn = /* @__PURE__ */ n((e) => {
  let t = /https?:\/\/(.+:.+)@/, r = e, o, [, s] = e.match(t) || [];
  return s && (r = e.replace(`${s}@`, ""), o = btoa(`${s}`)), {
    url: r,
    authorization: o
  };
}, "parseUrl"), Zn = /* @__PURE__ */ n((e, t, r) => {
  let { storyMapper: o } = r;
  return o ? Object.entries(e).reduce((s, [i, a]) => ({ ...s, [i]: o(t, a) }), {}) : e;
}, "map"), es = /* @__PURE__ */ n(({ store: e, provider: t, singleStory: r, docsOptions: o = {} }, { runCheck: s = !0 } = {}) => {
  let i = {
    findRef: /* @__PURE__ */ n((u) => {
      let l = i.getRefs();
      return Object.values(l).find(({ url: p }) => p.match(u));
    }, "findRef"),
    changeRefVersion: /* @__PURE__ */ n(async (u, l) => {
      let { versions: p, title: d } = i.getRefs()[u], f = {
        id: u,
        url: l,
        versions: p,
        title: d,
        index: {},
        filteredIndex: {},
        expanded: !0
      };
      await i.setRef(u, { ...f, type: "unknown" }, !1), await i.checkRef(f);
    }, "changeRefVersion"),
    changeRefState: /* @__PURE__ */ n((u, l) => {
      let { [u]: p, ...d } = i.getRefs();
      d[u] = { ...p, previewInitialized: l }, e.setState({
        refs: d
      });
    }, "changeRefState"),
    checkRef: /* @__PURE__ */ n(async (u) => {
      let { id: l, url: p, version: d, type: f } = u, y = f === "server-checked", m = {}, h = d ? `?version=${d}` : "", g = y ? "omit" : "in\
clude", S = Qn(p), P = {
        Accept: "application/json"
      };
      S.authorization && Object.assign(P, {
        Authorization: `Basic ${S.authorization}`
      });
      let [E, v] = await Promise.all(
        ["index.json", "stories.json"].map(
          async (_) => So(
            ho(`${S.url}/${_}${h}`, {
              headers: P,
              credentials: g
            })
          )
        )
      );
      if (!E.indexError || !v.indexError) {
        let _ = await So(
          ho(`${S.url}/metadata.json${h}`, {
            headers: P,
            credentials: g,
            cache: "no-cache"
          }).catch(() => !1)
        );
        Object.assign(m, {
          ...E.indexError ? v : E,
          ...!_.indexError && _
        });
      } else y || (m.indexError = {
        message: j`
            Error: Loading of ref failed
              at fetch (lib/api/src/modules/refs.ts)

            URL: ${S.url}

            We weren't able to load the above URL,
            it's possible a CORS error happened.

            Please check your dev-tools network tab.
          `
      });
      let I = u.versions && Object.keys(u.versions).length ? u.versions : m.versions;
      await i.setRef(l, {
        id: l,
        url: S.url,
        ...m,
        ...I ? { versions: I } : {},
        type: m.storyIndex ? "lazy" : "auto-inject"
      });
    }, "checkRef"),
    getRefs: /* @__PURE__ */ n(() => {
      let { refs: u = {} } = e.getState();
      return u;
    }, "getRefs"),
    setRef: /* @__PURE__ */ n(async (u, { storyIndex: l, setStoriesData: p, ...d }, f = !1) => {
      if (r)
        return;
      let y, m, h, { filters: g } = e.getState(), { storyMapper: S = Po } = t.getConfig(), P = i.getRefs()[u];
      (l || p) && (y = p ? po(
        Zn(p, P, { storyMapper: S })
      ) : l, h = ie(l, {
        provider: t,
        docsOptions: o,
        filters: g,
        allStatuses: {}
      }), m = ie(l, {
        provider: t,
        docsOptions: o,
        filters: {},
        allStatuses: {}
      })), m && (m = go(m, P)), h && (h = go(h, P)), await i.updateRef(u, { ...P, ...d, index: m, filteredIndex: h, internal_index: y });
    }, "setRef"),
    updateRef: /* @__PURE__ */ n(async (u, l) => {
      let { [u]: p, ...d } = i.getRefs();
      d[u] = { ...p, ...l };
      let f = Object.keys(c).reduce((y, m) => (y[m] = d[m], y), {});
      await e.setState({
        refs: f
      });
    }, "updateRef")
  }, a = !r && bo.REFS || {}, c = a;
  return s && new Promise(async (u) => {
    for (let l of Object.values(a))
      await i.checkRef({ ...l, stories: {} });
    u(void 0);
  }), {
    api: i,
    state: {
      refs: c
    }
  };
}, "init");

// src/manager-api/lib/events.ts
var k = /* @__PURE__ */ n((e, t) => {
  let { source: r, refId: o, type: s } = e, [i, a] = zt(r, o), c;
  (o || i === "external") && (c = o && t.getRefs()[o] ? t.getRefs()[o] : t.findRef(a));
  let u = {
    source: r,
    sourceType: i,
    sourceLocation: a,
    refId: o,
    ref: c,
    type: s
  };
  switch (!0) {
    case typeof o == "string":
    case i === "local":
    case i === "external":
      return u;
    // if we couldn't find the source, something risky happened, we ignore the input, and log a warning
    default:
      return ts.warn(`Received a ${s} frame that was not configured as a ref`), null;
  }
}, "getEventMetadata");

// src/manager-api/modules/globals.ts
var ss = /* @__PURE__ */ n(({ store: e, fullAPI: t, provider: r }) => {
  let o = {
    getGlobals() {
      return e.getState().globals;
    },
    getUserGlobals() {
      return e.getState().userGlobals;
    },
    getStoryGlobals() {
      return e.getState().storyGlobals;
    },
    getGlobalTypes() {
      return e.getState().globalTypes;
    },
    updateGlobals(a) {
      r.channel?.emit(ns, {
        globals: a,
        options: {
          target: "storybook-preview-iframe"
        }
      });
    }
  }, s = {
    globals: {},
    userGlobals: {},
    storyGlobals: {},
    globalTypes: {}
  }, i = /* @__PURE__ */ n(({
    globals: a,
    storyGlobals: c,
    userGlobals: u
  }) => {
    let {
      globals: l,
      userGlobals: p,
      storyGlobals: d
    } = e.getState();
    F(a, l) || e.setState({ globals: a }), F(u, p) || e.setState({ userGlobals: u }), F(c, d) || e.setState({ storyGlobals: c });
  }, "updateGlobals");
  return r.channel?.on(
    rs,
    /* @__PURE__ */ n(function({ globals: c, storyGlobals: u, userGlobals: l }) {
      let { ref: p } = k(this, t);
      p ? Ao.warn(
        "received a GLOBALS_UPDATED from a non-local ref. This is not currently supported."
      ) : i({ globals: c, storyGlobals: u, userGlobals: l });
    }, "handleGlobalsUpdated")
  ), r.channel?.on(
    os,
    /* @__PURE__ */ n(function({ globals: c, globalTypes: u }) {
      let { ref: l } = k(this, t), p = e.getState()?.globals;
      l ? Object.keys(c).length > 0 && Ao.warn("received globals from a non-local ref. This is not currently supported.") : e.setState({ globals: c,
      userGlobals: c, globalTypes: u }), p && Object.keys(p).length !== 0 && !F(c, p) && o.updateGlobals(p);
    }, "handleSetGlobals")
  ), {
    api: o,
    state: s
  };
}, "init");

// src/manager-api/modules/layout.ts
var dt = {};
L(dt, {
  ActiveTabs: () => _o,
  defaultLayoutState: () => U,
  focusableUIElements: () => Re,
  init: () => ls
});
import { SET_CONFIG as as } from "storybook/internal/core-events";
import { global as is } from "@storybook/global";
import { create as cs } from "storybook/theming/create";
var { document: us } = is, Eo = /* @__PURE__ */ n((e) => typeof e == "function", "isFunction"), _o = {
  SIDEBAR: "sidebar",
  CANVAS: "canvas",
  ADDONS: "addons"
}, U = {
  ui: {
    enableShortcuts: !0
  },
  layout: {
    initialActive: _o.CANVAS,
    showToolbar: !0,
    navSize: 300,
    bottomPanelHeight: 300,
    rightPanelWidth: 400,
    recentVisibleSizes: {
      navSize: 300,
      bottomPanelHeight: 300,
      rightPanelWidth: 400
    },
    panelPosition: "bottom",
    showTabs: !0
  },
  layoutCustomisations: {
    showSidebar: void 0,
    showToolbar: void 0
  },
  selectedPanel: void 0,
  theme: cs()
}, Re = {
  storySearchField: "storybook-explorer-searchfield",
  storyListMenu: "storybook-explorer-menu",
  storyPanelRoot: "storybook-panel-root"
}, Yt = /* @__PURE__ */ n((e) => e.layout.navSize > 0, "getIsNavShown"), Jt = /* @__PURE__ */ n((e) => {
  let { bottomPanelHeight: t, rightPanelWidth: r, panelPosition: o } = e.layout;
  return o === "bottom" && t > 0 || o === "right" && r > 0;
}, "getIsPanelShown"), vo = /* @__PURE__ */ n((e) => !Yt(e) && !Jt(e), "getIsFullscreen"), pt = /* @__PURE__ */ n((e) => ({
  navSize: e.navSize > 0 ? e.navSize : e.recentVisibleSizes.navSize,
  bottomPanelHeight: e.bottomPanelHeight > 0 ? e.bottomPanelHeight : e.recentVisibleSizes.bottomPanelHeight,
  rightPanelWidth: e.rightPanelWidth > 0 ? e.rightPanelWidth : e.recentVisibleSizes.rightPanelWidth
}), "getRecentVisibleSizes"), ls = /* @__PURE__ */ n(({ store: e, provider: t, singleStory: r }) => {
  let o = {
    toggleFullscreen(i) {
      return e.setState(
        (a) => {
          let c = vo(a), u = typeof i == "boolean" ? i : !c;
          return u === c ? { layout: a.layout } : u ? {
            layout: {
              ...a.layout,
              navSize: 0,
              bottomPanelHeight: 0,
              rightPanelWidth: 0,
              recentVisibleSizes: pt(a.layout)
            }
          } : {
            layout: {
              ...a.layout,
              navSize: a.singleStory ? 0 : a.layout.recentVisibleSizes.navSize,
              bottomPanelHeight: a.layout.recentVisibleSizes.bottomPanelHeight,
              rightPanelWidth: a.layout.recentVisibleSizes.rightPanelWidth
            }
          };
        },
        { persistence: "session" }
      );
    },
    togglePanel(i) {
      return e.setState(
        (a) => {
          let c = Jt(a), u = typeof i == "boolean" ? i : !c;
          return u === c ? { layout: a.layout } : u ? {
            layout: {
              ...a.layout,
              bottomPanelHeight: a.layout.recentVisibleSizes.bottomPanelHeight,
              rightPanelWidth: a.layout.recentVisibleSizes.rightPanelWidth
            }
          } : {
            layout: {
              ...a.layout,
              bottomPanelHeight: 0,
              rightPanelWidth: 0,
              recentVisibleSizes: pt(a.layout)
            }
          };
        },
        { persistence: "session" }
      );
    },
    togglePanelPosition(i) {
      return e.setState(
        (a) => {
          let c = i || (a.layout.panelPosition === "right" ? "bottom" : "right");
          return {
            layout: {
              ...a.layout,
              panelPosition: c,
              bottomPanelHeight: a.layout.recentVisibleSizes.bottomPanelHeight,
              rightPanelWidth: a.layout.recentVisibleSizes.rightPanelWidth
            }
          };
        },
        { persistence: "permanent" }
      );
    },
    toggleNav(i) {
      return e.setState(
        (a) => {
          if (a.singleStory)
            return { layout: a.layout };
          let c = Yt(a), u = typeof i == "boolean" ? i : !c;
          return u === c ? { layout: a.layout } : u ? {
            layout: {
              ...a.layout,
              navSize: a.layout.recentVisibleSizes.navSize
            }
          } : {
            layout: {
              ...a.layout,
              navSize: 0,
              recentVisibleSizes: pt(a.layout)
            }
          };
        },
        { persistence: "session" }
      );
    },
    toggleToolbar(i) {
      return e.setState(
        (a) => {
          let c = typeof i < "u" ? i : !a.layout.showToolbar;
          return {
            layout: {
              ...a.layout,
              showToolbar: c
            }
          };
        },
        { persistence: "session" }
      );
    },
    setSizes({
      navSize: i,
      bottomPanelHeight: a,
      rightPanelWidth: c
    }) {
      return e.setState(
        (u) => {
          let l = {
            ...u.layout,
            navSize: i ?? u.layout.navSize,
            bottomPanelHeight: a ?? u.layout.bottomPanelHeight,
            rightPanelWidth: c ?? u.layout.rightPanelWidth
          };
          return {
            layout: {
              ...l,
              recentVisibleSizes: pt(l)
            }
          };
        },
        { persistence: "session" }
      );
    },
    focusOnUIElement(i, a) {
      if (!i)
        return;
      let c = us.getElementById(i);
      c && (c.focus(), a && c.select());
    },
    getInitialOptions() {
      let { theme: i, selectedPanel: a, layoutCustomisations: c, ...u } = t.getConfig();
      return {
        ...U,
        layout: {
          ...Ie(
            U.layout,
            Z(u, Object.keys(U.layout))
          ),
          ...r && { navSize: 0 }
        },
        layoutCustomisations: {
          ...U.layoutCustomisations,
          ...c ?? {}
        },
        ui: Ie(U.ui, Z(u, Object.keys(U.ui))),
        selectedPanel: a || U.selectedPanel,
        theme: i || U.theme
      };
    },
    getIsFullscreen() {
      return vo(e.getState());
    },
    getIsPanelShown() {
      return Jt(e.getState());
    },
    getIsNavShown() {
      return Yt(e.getState());
    },
    getShowToolbarWithCustomisations(i) {
      let a = e.getState();
      return Eo(a.layoutCustomisations.showToolbar) ? a.layoutCustomisations.showToolbar(a, i) ?? i : i;
    },
    getNavSizeWithCustomisations(i) {
      let a = e.getState();
      if (Eo(a.layoutCustomisations.showSidebar)) {
        let c = a.layoutCustomisations.showSidebar(a, i !== 0);
        if (i === 0 && c === !0)
          return a.layout.recentVisibleSizes.navSize;
        if (i !== 0 && c === !1)
          return 0;
      }
      return i;
    },
    setOptions: /* @__PURE__ */ n((i) => {
      let { layout: a, ui: c, selectedPanel: u, theme: l } = e.getState();
      if (!i)
        return;
      let p = {
        ...a,
        ...i.layout || {},
        ...Z(i, Object.keys(a)),
        ...r && { navSize: 0 }
      }, d = {
        ...c,
        ...i.ui,
        ...Ie(i.ui || {}, Z(i, Object.keys(c)))
      }, f = {
        ...l,
        ...i.theme
      }, y = {};
      M(c, d) || (y.ui = d), M(a, p) || (y.layout = p), i.selectedPanel && !M(u, i.selectedPanel) && (y.selectedPanel = i.selectedPanel), Object.
      keys(y).length && e.setState(y, { persistence: "permanent" }), M(l, f) || e.setState({ theme: f });
    }, "setOptions")
  }, s = Z(e.getState(), ["layout", "selectedPanel"]);
  return t.channel?.on(as, () => {
    o.setOptions(K(o.getInitialOptions(), s));
  }), {
    api: o,
    state: K(o.getInitialOptions(), s)
  };
}, "init");

// src/manager-api/modules/notifications.ts
var Xt = {};
L(Xt, {
  init: () => ps
});
var ps = /* @__PURE__ */ n(({ store: e }) => ({ api: {
  addNotification: /* @__PURE__ */ n((o) => {
    e.setState(({ notifications: s }) => {
      let [i, a] = Be(s, (c) => c.id === o.id);
      return i.forEach((c) => {
        c.onClear && c.onClear({ dismissed: !1, timeout: !1 });
      }), { notifications: [...a, o] };
    });
  }, "addNotification"),
  clearNotification: /* @__PURE__ */ n((o) => {
    e.setState(({ notifications: s }) => {
      let [i, a] = Be(s, (c) => c.id === o);
      return i.forEach((c) => {
        c.onClear && c.onClear({ dismissed: !1, timeout: !1 });
      }), { notifications: a };
    });
  }, "clearNotification")
}, state: { notifications: [] } }), "init");

// src/manager-api/modules/provider.ts
var Qt = {};
L(Qt, {
  init: () => ds
});
var ds = /* @__PURE__ */ n(({ provider: e, fullAPI: t }) => ({
  api: e.renderPreview ? { renderPreview: e.renderPreview } : {},
  state: {},
  init: /* @__PURE__ */ n(() => {
    e.handleAPI(t);
  }, "init")
}), "init");

// src/manager-api/modules/settings.ts
var Zt = {};
L(Zt, {
  init: () => fs
});
var fs = /* @__PURE__ */ n(({ store: e, navigate: t, fullAPI: r }) => ({
  state: { settings: { lastTrackedStoryId: null } },
  api: {
    closeSettings: /* @__PURE__ */ n(() => {
      let {
        settings: { lastTrackedStoryId: i }
      } = e.getState();
      i ? r.selectStory(i) : r.selectFirstStory();
    }, "closeSettings"),
    changeSettingsTab: /* @__PURE__ */ n((i) => {
      t(`/settings/${i}`);
    }, "changeSettingsTab"),
    isSettingsScreenActive: /* @__PURE__ */ n(() => {
      let { path: i } = r.getUrlState();
      return !!(i || "").match(/^\/settings/);
    }, "isSettingsScreenActive"),
    retrieveSelection() {
      let { settings: i } = e.getState();
      return i.lastTrackedStoryId;
    },
    storeSelection: /* @__PURE__ */ n(async () => {
      let { storyId: i, settings: a } = e.getState();
      await e.setState({
        settings: { ...a, lastTrackedStoryId: i }
      });
    }, "storeSelection")
  }
}), "init");

// src/manager-api/modules/shortcuts.ts
var ir = {};
L(ir, {
  controlOrMetaKey: () => ce,
  defaultShortcuts: () => ue,
  init: () => vs,
  isMacLike: () => xo,
  keys: () => ar
});
import {
  FORCE_REMOUNT as gs,
  PREVIEW_KEYDOWN as Ss,
  STORIES_COLLAPSE_ALL as bs,
  STORIES_EXPAND_ALL as Ps
} from "storybook/internal/core-events";
import { global as As } from "@storybook/global";

// src/manager-api/lib/shortcut.ts
import { global as ys } from "@storybook/global";
var { navigator: er } = ys, tr = /* @__PURE__ */ n(() => er && er.platform ? !!er.platform.match(/(Mac|iPhone|iPod|iPad)/i) : !1, "isMacLike"),
cd = /* @__PURE__ */ n(() => tr() ? "\u2318" : "ctrl", "controlOrMetaSymbol"), ud = /* @__PURE__ */ n(() => tr() ? "meta" : "control", "cont\
rolOrMetaKey"), ms = /* @__PURE__ */ n(() => tr() ? "\u2325" : "alt", "optionOrAltSymbol"), ld = /* @__PURE__ */ n((e, t) => JSON.stringify(
e) === JSON.stringify(t), "isShortcutTaken"), rr = /* @__PURE__ */ n((e) => {
  if (["Meta", "Alt", "Control", "Shift"].includes(e.key))
    return null;
  let t = [];
  if (e.altKey && t.push("alt"), e.ctrlKey && t.push("control"), e.metaKey && t.push("meta"), e.shiftKey && t.push("shift"), e.key && e.key.
  length === 1 && e.key !== " ") {
    let r = e.key.toUpperCase(), o = e.code?.toUpperCase().replace("KEY", "").replace("DIGIT", "");
    o && o.length === 1 && o !== r ? t.push([r, o]) : t.push(r);
  }
  return e.key === " " && t.push("space"), e.key === "Escape" && t.push("escape"), e.key === "ArrowRight" && t.push("ArrowRight"), e.key ===
  "ArrowDown" && t.push("ArrowDown"), e.key === "ArrowUp" && t.push("ArrowUp"), e.key === "ArrowLeft" && t.push("ArrowLeft"), t.length > 0 ?
  t : null;
}, "eventToShortcut"), or = /* @__PURE__ */ n((e, t) => !e || !t || (e.join("").startsWith("shift/") && e.shift(), e.length !== t.length) ? !1 :
!e.find(
  (r, o) => Array.isArray(r) ? !r.includes(t[o]) : r !== t[o]
), "shortcutMatchesShortcut"), pd = /* @__PURE__ */ n((e, t) => or(rr(e), t), "eventMatchesShortcut"), hs = /* @__PURE__ */ n((e) => e === "\
alt" ? ms() : e === "control" ? "\u2303" : e === "meta" ? "\u2318" : e === "shift" ? "\u21E7\u200B" : e === "Enter" || e === "Backspace" || e ===
"Esc" || e === "escape" ? "" : e === " " ? "SPACE" : e === "ArrowUp" ? "\u2191" : e === "ArrowDown" ? "\u2193" : e === "ArrowLeft" ? "\u2190" :
e === "ArrowRight" ? "\u2192" : e.toUpperCase(), "keyToSymbol"), dd = /* @__PURE__ */ n((e) => e.map(hs).join(" "), "shortcutToHumanString");

// src/manager-api/modules/shortcuts.ts
var { navigator: nr, document: Io } = As, xo = /* @__PURE__ */ n(() => nr && nr.platform ? !!nr.platform.match(/(Mac|iPhone|iPod|iPad)/i) : !1,
"isMacLike"), ce = /* @__PURE__ */ n(() => xo() ? "meta" : "control", "controlOrMetaKey");
function ar(e) {
  return Object.keys(e);
}
n(ar, "keys");
var ue = Object.freeze({
  fullScreen: ["alt", "F"],
  togglePanel: ["alt", "A"],
  panelPosition: ["alt", "D"],
  toggleNav: ["alt", "S"],
  toolbar: ["alt", "T"],
  search: [ce(), "K"],
  focusNav: ["1"],
  focusIframe: ["2"],
  focusPanel: ["3"],
  prevComponent: ["alt", "ArrowUp"],
  nextComponent: ["alt", "ArrowDown"],
  prevStory: ["alt", "ArrowLeft"],
  nextStory: ["alt", "ArrowRight"],
  shortcutsPage: [ce(), "shift", ","],
  aboutPage: [ce(), ","],
  escape: ["escape"],
  // This one is not customizable
  collapseAll: [ce(), "shift", "ArrowUp"],
  expandAll: [ce(), "shift", "ArrowDown"],
  remount: ["alt", "R"]
}), sr = {};
function Es(e) {
  let t = e.target;
  return /input|textarea/i.test(t.tagName) || t.getAttribute("contenteditable") !== null;
}
n(Es, "focusInInput");
var vs = /* @__PURE__ */ n(({ store: e, fullAPI: t, provider: r }) => {
  let o = {
    // Getting and setting shortcuts
    getShortcutKeys() {
      return e.getState().shortcuts;
    },
    getDefaultShortcuts() {
      return {
        ...ue,
        ...o.getAddonsShortcutDefaults()
      };
    },
    getAddonsShortcuts() {
      return sr;
    },
    getAddonsShortcutLabels() {
      let c = {};
      return Object.entries(o.getAddonsShortcuts()).forEach(([u, { label: l }]) => {
        c[u] = l;
      }), c;
    },
    getAddonsShortcutDefaults() {
      let c = {};
      return Object.entries(o.getAddonsShortcuts()).forEach(([u, { defaultShortcut: l }]) => {
        c[u] = l;
      }), c;
    },
    async setShortcuts(c) {
      return await e.setState({ shortcuts: c }, { persistence: "permanent" }), c;
    },
    async restoreAllDefaultShortcuts() {
      return o.setShortcuts(o.getDefaultShortcuts());
    },
    async setShortcut(c, u) {
      let l = o.getShortcutKeys();
      return await o.setShortcuts({ ...l, [c]: u }), u;
    },
    async setAddonShortcut(c, u) {
      let l = o.getShortcutKeys();
      return await o.setShortcuts({
        ...l,
        [`${c}-${u.actionName}`]: u.defaultShortcut
      }), sr[`${c}-${u.actionName}`] = u, u;
    },
    async restoreDefaultShortcut(c) {
      let u = o.getDefaultShortcuts()[c];
      return o.setShortcut(c, u);
    },
    // Listening to shortcut events
    handleKeydownEvent(c) {
      let u = rr(c), l = o.getShortcutKeys(), d = ar(l).find(
        (f) => or(u, l[f])
      );
      d && o.handleShortcutFeature(d, c);
    },
    // warning: event might not have a full prototype chain because it may originate from the channel
    handleShortcutFeature(c, u) {
      let {
        ui: { enableShortcuts: l },
        storyId: p
      } = e.getState();
      if (l)
        switch (u?.preventDefault && u.preventDefault(), c) {
          case "escape": {
            t.getIsFullscreen() ? t.toggleFullscreen(!1) : t.getIsNavShown() && t.toggleNav(!0);
            break;
          }
          case "focusNav": {
            t.getIsFullscreen() && t.toggleFullscreen(!1), t.getIsNavShown() || t.toggleNav(!0), t.focusOnUIElement(Re.storyListMenu);
            break;
          }
          case "search": {
            t.getIsFullscreen() && t.toggleFullscreen(!1), t.getIsNavShown() || t.toggleNav(!0), setTimeout(() => {
              t.focusOnUIElement(Re.storySearchField, !0);
            }, 0);
            break;
          }
          case "focusIframe": {
            let d = Io.getElementById("storybook-preview-iframe");
            if (d)
              try {
                d.contentWindow.focus();
              } catch {
              }
            break;
          }
          case "focusPanel": {
            t.getIsFullscreen() && t.toggleFullscreen(!1), t.getIsPanelShown() || t.togglePanel(!0), t.focusOnUIElement(Re.storyPanelRoot);
            break;
          }
          case "nextStory": {
            t.jumpToStory(1);
            break;
          }
          case "prevStory": {
            t.jumpToStory(-1);
            break;
          }
          case "nextComponent": {
            t.jumpToComponent(1);
            break;
          }
          case "prevComponent": {
            t.jumpToComponent(-1);
            break;
          }
          case "fullScreen": {
            t.toggleFullscreen();
            break;
          }
          case "togglePanel": {
            t.togglePanel();
            break;
          }
          case "toggleNav": {
            t.toggleNav();
            break;
          }
          case "toolbar": {
            t.toggleToolbar();
            break;
          }
          case "panelPosition": {
            t.getIsFullscreen() && t.toggleFullscreen(!1), t.getIsPanelShown() || t.togglePanel(!0), t.togglePanelPosition();
            break;
          }
          case "aboutPage": {
            t.navigate("/settings/about");
            break;
          }
          case "shortcutsPage": {
            t.navigate("/settings/shortcuts");
            break;
          }
          case "collapseAll": {
            t.emit(bs);
            break;
          }
          case "expandAll": {
            t.emit(Ps);
            break;
          }
          case "remount": {
            t.emit(gs, { storyId: p });
            break;
          }
          default:
            sr[c].action();
            break;
        }
    }
  }, { shortcuts: s = ue } = e.getState(), i = {
    // Any saved shortcuts that are still in our set of defaults
    shortcuts: ar(ue).reduce(
      (c, u) => ({ ...c, [u]: s[u] || ue[u] }),
      ue
    )
  };
  return { api: o, state: i, init: /* @__PURE__ */ n(() => {
    Io.addEventListener("keydown", (c) => {
      Es(c) || o.handleKeydownEvent(c);
    }), r.channel?.on(Ss, (c) => {
      o.handleKeydownEvent(c.event);
    });
  }, "initModule") };
}, "init");

// src/manager-api/modules/stories.ts
var yr = {};
L(yr, {
  init: () => Qs
});
import { logger as ws } from "storybook/internal/client-logger";
import {
  CONFIG_ERROR as Os,
  CURRENT_STORY_WAS_SET as Cs,
  DOCS_PREPARED as Ns,
  PRELOAD_ENTRIES as js,
  RESET_STORY_ARGS as ks,
  SELECT_STORY as Ds,
  SET_CONFIG as Ms,
  SET_CURRENT_STORY as Us,
  SET_FILTER as Ls,
  SET_INDEX as Fs,
  SET_STORIES as Ws,
  STORY_ARGS_UPDATED as Gs,
  STORY_CHANGED as $s,
  STORY_INDEX_INVALIDATED as Bs,
  STORY_MISSING as Vs,
  STORY_PREPARED as Ks,
  STORY_SPECIFIED as zs,
  UPDATE_STORY_ARGS as Hs
} from "storybook/internal/core-events";
import { sanitize as Oo, toId as St } from "storybook/internal/csf";
import { global as qs } from "@storybook/global";

// src/storybook-error.ts
function To({
  code: e,
  category: t
}) {
  let r = String(e).padStart(4, "0");
  return `SB_${t}_${r}`;
}
n(To, "parseErrorCode");
var ft = class ft extends Error {
  constructor(r) {
    super(ft.getFullMessage(r));
    /**
     * Data associated with the error. Used to provide additional information in the error message or
     * to be passed to telemetry.
     */
    this.data = {};
    /** Flag used to easily determine if the error originates from Storybook. */
    this.fromStorybook = !0;
    this.category = r.category, this.documentation = r.documentation ?? !1, this.code = r.code;
  }
  get fullErrorCode() {
    return To({ code: this.code, category: this.category });
  }
  /** Overrides the default `Error.name` property in the format: SB_<CATEGORY>_<CODE>. */
  get name() {
    let r = this.constructor.name;
    return `${this.fullErrorCode} (${r})`;
  }
  /** Generates the error message along with additional documentation link (if applicable). */
  static getFullMessage({
    documentation: r,
    code: o,
    category: s,
    message: i
  }) {
    let a;
    return r === !0 ? a = `https://storybook.js.org/error/${To({ code: o, category: s })}` : typeof r == "string" ? a = r : Array.isArray(r) &&
    (a = `
${r.map((c) => `	- ${c}`).join(`
`)}`), `${i}${a != null ? `

More info: ${a}
` : ""}`;
  }
};
n(ft, "StorybookError");
var Y = ft;

// src/manager-errors.ts
var cr = class cr extends Y {
  constructor(r) {
    super({
      category: "MANAGER_API",
      code: 1,
      message: `Status has typeId "${r.status.typeId}" but was added to store with typeId "${r.typeId}". Full status: ${JSON.stringify(
        r.status,
        null,
        2
      )}`
    });
    this.data = r;
  }
};
n(cr, "StatusTypeIdMismatchError");
var yt = cr;

// src/preview-errors.ts
var ur = class ur extends Y {
  constructor(r) {
    super({
      category: "PREVIEW_API",
      code: 16,
      message: `Status has typeId "${r.status.typeId}" but was added to store with typeId "${r.typeId}". Full status: ${JSON.stringify(
        r.status,
        null,
        2
      )}`
    });
    this.data = r;
  }
};
n(ur, "StatusTypeIdMismatchError");
var mt = ur;

// src/server-errors.ts
var lr = class lr extends Y {
  constructor(r) {
    super({
      category: "CORE-SERVER",
      code: 16,
      message: `Status has typeId "${r.status.typeId}" but was added to store with typeId "${r.typeId}". Full status: ${JSON.stringify(
        r.status,
        null,
        2
      )}`
    });
    this.data = r;
  }
};
n(lr, "StatusTypeIdMismatchError");
var ht = lr;

// src/shared/status-store/index.ts
var Ro = {
  id: "storybook/status",
  leader: !0,
  initialState: {}
}, pr = {
  SELECT: "select"
};
function wo({
  universalStatusStore: e,
  useUniversalStore: t,
  environment: r
}) {
  let o = {
    getAll() {
      return e.getState();
    },
    set(i) {
      e.setState((a) => {
        let c = { ...a };
        for (let u of i) {
          let { storyId: l, typeId: p } = u;
          c[l] = { ...c[l] ?? {}, [p]: u };
        }
        return c;
      });
    },
    onAllStatusChange(i) {
      return e.onStateChange((a, c) => {
        i(a, c);
      });
    },
    onSelect(i) {
      return e.subscribe(pr.SELECT, (a) => {
        i(a.payload);
      });
    },
    selectStatuses: /* @__PURE__ */ n((i) => {
      e.send({ type: pr.SELECT, payload: i });
    }, "selectStatuses"),
    unset(i) {
      if (!i) {
        e.setState({});
        return;
      }
      e.setState((a) => {
        let c = { ...a };
        for (let u of i)
          delete c[u];
        return c;
      });
    },
    typeId: void 0
  }, s = /* @__PURE__ */ n((i) => ({
    getAll: o.getAll,
    set(a) {
      e.setState((c) => {
        let u = { ...c };
        for (let l of a) {
          let { storyId: p } = l;
          if (l.typeId !== i)
            switch (r) {
              case "server":
                throw new ht({
                  status: l,
                  typeId: i
                });
              case "manager":
                throw new yt({
                  status: l,
                  typeId: i
                });
              case "preview":
              default:
                throw new mt({
                  status: l,
                  typeId: i
                });
            }
          u[p] = { ...u[p] ?? {}, [i]: l };
        }
        return u;
      });
    },
    onAllStatusChange: o.onAllStatusChange,
    onSelect(a) {
      return e.subscribe(pr.SELECT, (c) => {
        c.payload.some((u) => u.typeId === i) && a(c.payload);
      });
    },
    unset(a) {
      e.setState((c) => {
        let u = { ...c };
        for (let l in u)
          if (u[l]?.[i] && (!a || a?.includes(l))) {
            let { [i]: p, ...d } = u[l];
            u[l] = d;
          }
        return u;
      });
    },
    typeId: i
  }), "getStatusStoreByTypeId");
  return t ? {
    getStatusStoreByTypeId: s,
    fullStatusStore: o,
    universalStatusStore: e,
    useStatusStore: /* @__PURE__ */ n((i) => t(e, i)[0], "useStatusStore")
  } : { getStatusStoreByTypeId: s, fullStatusStore: o, universalStatusStore: e };
}
n(wo, "createStatusStore");

// src/shared/universal-store/instances.ts
var dr = /* @__PURE__ */ new Map();

// src/shared/universal-store/index.ts
var _s = "UNIVERSAL_STORE:", W = {
  PENDING: "PENDING",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED"
}, b = class b {
  constructor(t, r) {
    /** Enable debug logs for this store */
    this.debugging = !1;
    // TODO: narrow type of listeners based on event type
    this.listeners = /* @__PURE__ */ new Map([["*", /* @__PURE__ */ new Set()]]);
    /** Gets the current state */
    this.getState = /* @__PURE__ */ n(() => (this.debug("getState", { state: this.state }), this.state), "getState");
    /**
     * Subscribes to store events
     *
     * @returns A function to unsubscribe
     */
    this.subscribe = /* @__PURE__ */ n((t, r) => {
      let o = typeof t == "function", s = o ? "*" : t, i = o ? t : r;
      if (this.debug("subscribe", { eventType: s, listener: i }), !i)
        throw new TypeError(
          `Missing first subscribe argument, or second if first is the event type, when subscribing to a UniversalStore with id '${this.id}'`
        );
      return this.listeners.has(s) || this.listeners.set(s, /* @__PURE__ */ new Set()), this.listeners.get(s).add(i), () => {
        this.debug("unsubscribe", { eventType: s, listener: i }), this.listeners.has(s) && (this.listeners.get(s).delete(i), this.listeners.
        get(s)?.size === 0 && this.listeners.delete(s));
      };
    }, "subscribe");
    /** Sends a custom event to the other stores */
    this.send = /* @__PURE__ */ n((t) => {
      if (this.debug("send", { event: t }), this.status !== b.Status.READY)
        throw new TypeError(
          j`Cannot send event before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify(
            {
              event: t,
              id: this.id,
              actor: this.actor,
              environment: this.environment
            },
            null,
            2
          )}`
        );
      this.emitToListeners(t, { actor: this.actor }), this.emitToChannel(t, { actor: this.actor });
    }, "send");
    if (this.debugging = t.debug ?? !1, !b.isInternalConstructing)
      throw new TypeError(
        "UniversalStore is not constructable - use UniversalStore.create() instead"
      );
    if (b.isInternalConstructing = !1, this.id = t.id, this.actorId = Date.now().toString(36) + Math.random().toString(36).substring(2), this.
    actorType = t.leader ? b.ActorType.LEADER : b.ActorType.FOLLOWER, this.state = t.initialState, this.channelEventName = `${_s}${this.id}`,
    this.debug("constructor", {
      options: t,
      environmentOverrides: r,
      channelEventName: this.channelEventName
    }), this.actor.type === b.ActorType.LEADER)
      this.syncing = {
        state: W.RESOLVED,
        promise: Promise.resolve()
      };
    else {
      let o, s, i = new Promise((a, c) => {
        o = /* @__PURE__ */ n(() => {
          this.syncing.state === W.PENDING && (this.syncing.state = W.RESOLVED, a());
        }, "syncingResolve"), s = /* @__PURE__ */ n((u) => {
          this.syncing.state === W.PENDING && (this.syncing.state = W.REJECTED, c(u));
        }, "syncingReject");
      });
      this.syncing = {
        state: W.PENDING,
        promise: i,
        resolve: o,
        reject: s
      };
    }
    this.getState = this.getState.bind(this), this.setState = this.setState.bind(this), this.subscribe = this.subscribe.bind(this), this.onStateChange =
    this.onStateChange.bind(this), this.send = this.send.bind(this), this.emitToChannel = this.emitToChannel.bind(this), this.prepareThis = this.
    prepareThis.bind(this), this.emitToListeners = this.emitToListeners.bind(this), this.handleChannelEvents = this.handleChannelEvents.bind(
    this), this.debug = this.debug.bind(this), this.channel = r?.channel ?? b.preparation.channel, this.environment = r?.environment ?? b.preparation.
    environment, this.channel && this.environment ? (b.preparation.resolve({ channel: this.channel, environment: this.environment }), this.prepareThis(
    { channel: this.channel, environment: this.environment })) : b.preparation.promise.then(this.prepareThis);
  }
  static setupPreparationPromise() {
    let t, r, o = new Promise(
      (s, i) => {
        t = /* @__PURE__ */ n((a) => {
          s(a);
        }, "resolveRef"), r = /* @__PURE__ */ n((...a) => {
          i(a);
        }, "rejectRef");
      }
    );
    b.preparation = {
      resolve: t,
      reject: r,
      promise: o
    };
  }
  /** The actor object representing the store instance with a unique ID and a type */
  get actor() {
    return Object.freeze({
      id: this.actorId,
      type: this.actorType,
      environment: this.environment ?? b.Environment.UNKNOWN
    });
  }
  /**
   * The current state of the store, that signals both if the store is prepared by Storybook and
   * also - in the case of a follower - if the state has been synced with the leader's state.
   */
  get status() {
    if (!this.channel || !this.environment)
      return b.Status.UNPREPARED;
    switch (this.syncing?.state) {
      case W.PENDING:
      case void 0:
        return b.Status.SYNCING;
      case W.REJECTED:
        return b.Status.ERROR;
      case W.RESOLVED:
      default:
        return b.Status.READY;
    }
  }
  /**
   * A promise that resolves when the store is fully ready. A leader will be ready when the store
   * has been prepared by Storybook, which is almost instantly.
   *
   * A follower will be ready when the state has been synced with the leader's state, within a few
   * hundred milliseconds.
   */
  untilReady() {
    return Promise.all([b.preparation.promise, this.syncing?.promise]);
  }
  /** Creates a new instance of UniversalStore */
  static create(t) {
    if (!t || typeof t?.id != "string")
      throw new TypeError("id is required and must be a string, when creating a UniversalStore");
    t.debug && console.debug(
      j`[UniversalStore]
        create`,
      { options: t }
    );
    let r = dr.get(t.id);
    if (r)
      return console.warn(j`UniversalStore with id "${t.id}" already exists in this environment, re-using existing.
        You should reuse the existing instance instead of trying to create a new one.`), r;
    b.isInternalConstructing = !0;
    let o = new b(t);
    return dr.set(t.id, o), o;
  }
  /**
   * Used by Storybook to set the channel for all instances of UniversalStore in the given
   * environment.
   *
   * @internal
   */
  static __prepare(t, r) {
    b.preparation.channel = t, b.preparation.environment = r, b.preparation.resolve({ channel: t, environment: r });
  }
  /**
   * Updates the store's state
   *
   * Either a new state or a state updater function can be passed to the method.
   */
  setState(t) {
    let r = this.state, o = typeof t == "function" ? t(r) : t;
    if (this.debug("setState", { newState: o, previousState: r, updater: t }), this.status !== b.Status.READY)
      throw new TypeError(
        j`Cannot set state before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify(
          {
            newState: o,
            id: this.id,
            actor: this.actor,
            environment: this.environment
          },
          null,
          2
        )}`
      );
    this.state = o;
    let s = {
      type: b.InternalEventType.SET_STATE,
      payload: {
        state: o,
        previousState: r
      }
    };
    this.emitToChannel(s, { actor: this.actor }), this.emitToListeners(s, { actor: this.actor });
  }
  /**
   * Subscribes to state changes
   *
   * @returns Unsubscribe function
   */
  onStateChange(t) {
    return this.debug("onStateChange", { listener: t }), this.subscribe(
      b.InternalEventType.SET_STATE,
      ({ payload: r }, o) => {
        t(r.state, r.previousState, o);
      }
    );
  }
  emitToChannel(t, r) {
    this.debug("emitToChannel", { event: t, eventInfo: r, channel: !!this.channel }), this.channel?.emit(this.channelEventName, {
      event: t,
      eventInfo: r
    });
  }
  prepareThis({
    channel: t,
    environment: r
  }) {
    this.channel = t, this.environment = r, this.debug("prepared", { channel: !!t, environment: r }), this.channel.on(this.channelEventName,
    this.handleChannelEvents), this.actor.type === b.ActorType.LEADER ? this.emitToChannel(
      { type: b.InternalEventType.LEADER_CREATED },
      { actor: this.actor }
    ) : (this.emitToChannel(
      { type: b.InternalEventType.FOLLOWER_CREATED },
      { actor: this.actor }
    ), this.emitToChannel(
      { type: b.InternalEventType.EXISTING_STATE_REQUEST },
      { actor: this.actor }
    ), setTimeout(() => {
      this.syncing.reject(
        new TypeError(
          `No existing state found for follower with id: '${this.id}'. Make sure a leader with the same id exists before creating a follower\
.`
        )
      );
    }, 1e3));
  }
  emitToListeners(t, r) {
    let o = this.listeners.get(t.type), s = this.listeners.get("*");
    this.debug("emitToListeners", {
      event: t,
      eventInfo: r,
      eventTypeListeners: o,
      everythingListeners: s
    }), [...o ?? [], ...s ?? []].forEach(
      (i) => i(t, r)
    );
  }
  handleChannelEvents(t) {
    let { event: r, eventInfo: o } = t;
    if ([o.actor.id, o.forwardingActor?.id].includes(this.actor.id)) {
      this.debug("handleChannelEvents: Ignoring event from self", { channelEvent: t });
      return;
    } else if (this.syncing?.state === W.PENDING && r.type !== b.InternalEventType.EXISTING_STATE_RESPONSE) {
      this.debug("handleChannelEvents: Ignoring event while syncing", { channelEvent: t });
      return;
    }
    if (this.debug("handleChannelEvents", { channelEvent: t }), this.actor.type === b.ActorType.LEADER) {
      let s = !0;
      switch (r.type) {
        case b.InternalEventType.EXISTING_STATE_REQUEST:
          s = !1;
          let i = {
            type: b.InternalEventType.EXISTING_STATE_RESPONSE,
            payload: this.state
          };
          this.debug("handleChannelEvents: responding to existing state request", {
            responseEvent: i
          }), this.emitToChannel(i, { actor: this.actor }), this.emitToListeners(i, { actor: this.actor });
          break;
        case b.InternalEventType.LEADER_CREATED:
          s = !1, this.syncing.state = W.REJECTED, this.debug("handleChannelEvents: erroring due to second leader being created", {
            event: r
          }), console.error(
            j`Detected multiple UniversalStore leaders created with the same id "${this.id}".
            Only one leader can exists at a time, your stores are now in an invalid state.
            Leaders detected:
            this: ${JSON.stringify(this.actor, null, 2)}
            other: ${JSON.stringify(o.actor, null, 2)}`
          );
          break;
      }
      s && (this.debug("handleChannelEvents: forwarding event", { channelEvent: t }), this.emitToChannel(r, { actor: o.actor, forwardingActor: this.
      actor }));
    }
    if (this.actor.type === b.ActorType.FOLLOWER)
      switch (r.type) {
        case b.InternalEventType.EXISTING_STATE_RESPONSE:
          if (this.debug("handleChannelEvents: Setting state from leader's existing state response", {
            event: r
          }), this.syncing?.state !== W.PENDING)
            break;
          this.syncing.resolve?.();
          let s = {
            type: b.InternalEventType.SET_STATE,
            payload: {
              state: r.payload,
              previousState: this.state
            }
          };
          this.state = r.payload, this.emitToListeners(s, o);
          break;
      }
    switch (r.type) {
      case b.InternalEventType.SET_STATE:
        this.debug("handleChannelEvents: Setting state", { event: r }), this.state = r.payload.state;
        break;
    }
    this.emitToListeners(r, { actor: o.actor });
  }
  debug(t, r) {
    this.debugging && console.debug(
      j`[UniversalStore::${this.id}::${this.environment ?? b.Environment.UNKNOWN}]
        ${t}`,
      JSON.stringify(
        {
          data: r,
          actor: this.actor,
          state: this.state,
          status: this.status
        },
        null,
        2
      )
    );
  }
  /**
   * Used to reset the static fields of the UniversalStore class when cleaning up tests
   *
   * @internal
   */
  static __reset() {
    b.preparation.reject(new Error("reset")), b.setupPreparationPromise(), b.isInternalConstructing = !1;
  }
};
n(b, "UniversalStore"), /**
 * Defines the possible actor types in the store system
 *
 * @readonly
 */
b.ActorType = {
  LEADER: "LEADER",
  FOLLOWER: "FOLLOWER"
}, /**
 * Defines the possible environments the store can run in
 *
 * @readonly
 */
b.Environment = {
  SERVER: "SERVER",
  MANAGER: "MANAGER",
  PREVIEW: "PREVIEW",
  UNKNOWN: "UNKNOWN",
  MOCK: "MOCK"
}, /**
 * Internal event types used for store synchronization
 *
 * @readonly
 */
b.InternalEventType = {
  EXISTING_STATE_REQUEST: "__EXISTING_STATE_REQUEST",
  EXISTING_STATE_RESPONSE: "__EXISTING_STATE_RESPONSE",
  SET_STATE: "__SET_STATE",
  LEADER_CREATED: "__LEADER_CREATED",
  FOLLOWER_CREATED: "__FOLLOWER_CREATED"
}, b.Status = {
  UNPREPARED: "UNPREPARED",
  SYNCING: "SYNCING",
  READY: "READY",
  ERROR: "ERROR"
}, // This is used to check if constructor was called from the static factory create()
b.isInternalConstructing = !1, b.setupPreparationPromise();
var G = b;

// src/shared/universal-store/use-universal-store-manager.ts
import * as ee from "react";
var we = /* @__PURE__ */ n((e, t) => {
  let r = ee.useRef(
    t ? t(e.getState()) : e.getState()
  ), o = ee.useCallback(
    (a) => e.onStateChange((c, u) => {
      if (!t) {
        r.current = c, a();
        return;
      }
      let l = t(c), p = t(u);
      !M(l, p) && (r.current = l, a());
    }),
    [e, t]
  ), s = ee.useCallback(() => {
    let a = e.getState(), c = t ? t(a) : a;
    return M(c, r.current) || (r.current = c), r.current;
  }, [e, t]);
  return [ee.useSyncExternalStore(o, s), e.setState];
}, "useUniversalStore");

// src/manager-api/stores/status.ts
var Is = wo({
  universalStatusStore: G.create({
    ...Ro,
    leader: globalThis.CONFIG_TYPE === "PRODUCTION"
  }),
  useUniversalStore: we,
  environment: "manager"
}), { fullStatusStore: gt, getStatusStoreByTypeId: xs, useStatusStore: Ts, universalStatusStore: Rs } = Is;

// src/manager-api/modules/stories.ts
var { fetch: Ys } = qs, Js = "./index.json", Xs = ["enableShortcuts", "theme", "showRoots"];
function fr(e) {
  if (!e || typeof e == "string")
    return e;
  let t = { ...e };
  return Xs.forEach((r) => {
    r in t && delete t[r];
  }), t;
}
n(fr, "removeRemovedOptions");
var Qs = /* @__PURE__ */ n(({
  fullAPI: e,
  store: t,
  navigate: r,
  provider: o,
  storyId: s,
  viewMode: i,
  docsOptions: a = {}
}) => {
  let c = {
    storyId: St,
    getData: /* @__PURE__ */ n((l, p) => {
      let d = c.resolveStory(l, p);
      if (d?.type === "story" || d?.type === "docs")
        return d;
    }, "getData"),
    isPrepared: /* @__PURE__ */ n((l, p) => {
      let d = c.getData(l, p);
      return d ? d.type === "story" ? d.prepared : !0 : !1;
    }, "isPrepared"),
    resolveStory: /* @__PURE__ */ n((l, p) => {
      let { refs: d, index: f } = t.getState();
      if (!(p && !d[p]))
        return p ? d?.[p]?.index?.[l] ?? void 0 : f ? f[l] : void 0;
    }, "resolveStory"),
    getCurrentStoryData: /* @__PURE__ */ n(() => {
      let { storyId: l, refId: p } = t.getState();
      return c.getData(l, p);
    }, "getCurrentStoryData"),
    getParameters: /* @__PURE__ */ n((l, p) => {
      let { storyId: d, refId: f } = typeof l == "string" ? { storyId: l, refId: void 0 } : l, y = c.getData(d, f);
      if (["story", "docs"].includes(y?.type)) {
        let { parameters: m } = y;
        if (m)
          return p ? m[p] : m;
      }
      return null;
    }, "getParameters"),
    getCurrentParameter: /* @__PURE__ */ n((l) => {
      let { storyId: p, refId: d } = t.getState();
      return c.getParameters({ storyId: p, refId: d }, l) || void 0;
    }, "getCurrentParameter"),
    jumpToComponent: /* @__PURE__ */ n((l) => {
      let { index: p, storyId: d, refs: f, refId: y } = t.getState();
      if (!c.getData(d, y))
        return;
      let h = y ? f[y].index || {} : p;
      if (!h)
        return;
      let g = c.findSiblingStoryId(d, h, l, !0);
      g && c.selectStory(g, void 0, { ref: y });
    }, "jumpToComponent"),
    jumpToStory: /* @__PURE__ */ n((l) => {
      let { index: p, storyId: d, refs: f, refId: y } = t.getState(), m = c.getData(d, y);
      if (!m)
        return;
      let h = m.refId ? f[m.refId].index : p;
      if (!h)
        return;
      let g = c.findSiblingStoryId(d, h, l, !1);
      g && c.selectStory(g, void 0, { ref: y });
    }, "jumpToStory"),
    selectFirstStory: /* @__PURE__ */ n(() => {
      let { index: l } = t.getState();
      if (!l)
        return;
      let p = Object.keys(l).find((d) => l[d].type === "story");
      if (p) {
        c.selectStory(p);
        return;
      }
      r("/");
    }, "selectFirstStory"),
    selectStory: /* @__PURE__ */ n((l = void 0, p = void 0, d = {}) => {
      let { ref: f } = d, { storyId: y, index: m, refs: h } = t.getState(), g = f ? h[f].index : m, S = y?.split("--", 2)[0];
      if (g)
        if (p)
          if (l) {
            let P = f ? `${f}_${St(l, p)}` : St(l, p);
            if (g[P])
              c.selectStory(P, void 0, d);
            else {
              let E = g[Oo(l)];
              if (E?.type === "component") {
                let v = E.children.find((I) => g[I].name === p);
                v && c.selectStory(v, void 0, d);
              }
            }
          } else {
            let P = St(S, p);
            c.selectStory(P, void 0, d);
          }
        else {
          let P = l ? g[l] || g[Oo(l)] : g[S];
          if (!P)
            throw new Error(`Unknown id or title: '${l}'`);
          t.setState({
            settings: { ...t.getState().settings, lastTrackedStoryId: P.id }
          });
          let E = c.findLeafEntry(g, P.id), v = E.refId ? `${E.refId}_${E.id}` : E.id;
          r(`/${E.type}/${v}`);
        }
    }, "selectStory"),
    findLeafEntry(l, p) {
      let d = l[p];
      if (d.type === "docs" || d.type === "story")
        return d;
      let f = d.children[0];
      return c.findLeafEntry(l, f);
    },
    findLeafStoryId(l, p) {
      return c.findLeafEntry(l, p)?.id;
    },
    findAllLeafStoryIds(l) {
      let { index: p } = t.getState();
      if (!p)
        return [];
      let d = /* @__PURE__ */ n((f, y = []) => {
        let m = p[f];
        return m && (m.type === "story" ? y.push(m.id) : "children" in m && m.children.forEach((h) => d(h, y))), y;
      }, "findChildEntriesRecursively");
      return d(l, []);
    },
    findSiblingStoryId(l, p, d, f) {
      if (f) {
        let h = fo(p), g = h.findIndex((S) => S.includes(l));
        return g === h.length - 1 && d > 0 || g === 0 && d < 0 ? void 0 : h[g + d] ? h[g + d][0] : void 0;
      }
      let y = yo(p), m = y.indexOf(l);
      if (!(m === y.length - 1 && d > 0) && !(m === 0 && d < 0))
        return y[m + d];
    },
    updateStoryArgs: /* @__PURE__ */ n((l, p) => {
      let { id: d, refId: f } = l;
      o.channel?.emit(Hs, {
        storyId: d,
        updatedArgs: p,
        options: { target: f }
      });
    }, "updateStoryArgs"),
    resetStoryArgs: /* @__PURE__ */ n((l, p) => {
      let { id: d, refId: f } = l;
      o.channel?.emit(ks, {
        storyId: d,
        argNames: p,
        options: { target: f }
      });
    }, "resetStoryArgs"),
    fetchIndex: /* @__PURE__ */ n(async () => {
      try {
        let l = await Ys(Js);
        if (l.status !== 200)
          throw new Error(await l.text());
        let p = await l.json();
        if (p.v < 3) {
          ws.warn(`Skipping story index with version v${p.v}, awaiting SET_STORIES.`);
          return;
        }
        await c.setIndex(p);
      } catch (l) {
        await t.setState({ indexError: l });
      }
    }, "fetchIndex"),
    // The story index we receive on SET_INDEX is "prepared" in that it has parameters
    // The story index we receive on fetchStoryIndex is not, but all the prepared fields are optional
    // so we can cast one to the other easily enough
    setIndex: /* @__PURE__ */ n(async (l) => {
      let { filteredIndex: p, index: d, filters: f } = t.getState(), y = gt.getAll(), m = ie(l, {
        provider: o,
        docsOptions: a,
        filters: f,
        allStatuses: y
      }), h = ie(l, {
        provider: o,
        docsOptions: a,
        filters: {},
        allStatuses: y
      });
      await t.setState({
        internal_index: l,
        filteredIndex: Kt(m, p),
        index: Kt(h, d),
        indexError: void 0
      });
    }, "setIndex"),
    // FIXME: is there a bug where filtered stories get added back in on updateStory???
    updateStory: /* @__PURE__ */ n(async (l, p, d) => {
      if (d) {
        let { id: f, index: y, filteredIndex: m } = d;
        y[l] = {
          ...y[l],
          ...p
        }, m[l] = {
          ...m[l],
          ...p
        }, await e.updateRef(f, { index: y, filteredIndex: m });
      } else {
        let { index: f, filteredIndex: y } = t.getState();
        f && (f[l] = {
          ...f[l],
          ...p
        }), y && (y[l] = {
          ...y[l],
          ...p
        }), (f || y) && await t.setState({ index: f, filteredIndex: y });
      }
    }, "updateStory"),
    updateDocs: /* @__PURE__ */ n(async (l, p, d) => {
      if (d) {
        let { id: f, index: y, filteredIndex: m } = d;
        y[l] = {
          ...y[l],
          ...p
        }, m[l] = {
          ...m[l],
          ...p
        }, await e.updateRef(f, { index: y, filteredIndex: m });
      } else {
        let { index: f, filteredIndex: y } = t.getState();
        f && (f[l] = {
          ...f[l],
          ...p
        }), y && (y[l] = {
          ...y[l],
          ...p
        }), (f || y) && await t.setState({ index: f, filteredIndex: y });
      }
    }, "updateDocs"),
    setPreviewInitialized: /* @__PURE__ */ n(async (l) => {
      l ? e.updateRef(l.id, { previewInitialized: !0 }) : t.setState({ previewInitialized: !0 });
    }, "setPreviewInitialized"),
    experimental_setFilter: /* @__PURE__ */ n(async (l, p) => {
      await t.setState({ filters: { ...t.getState().filters, [l]: p } });
      let { internal_index: d } = t.getState();
      if (!d)
        return;
      await c.setIndex(d);
      let f = await e.getRefs();
      Object.entries(f).forEach(([y, { internal_index: m, ...h }]) => {
        e.setRef(y, { ...h, storyIndex: m }, !0);
      }), o.channel?.emit(Ls, { id: l });
    }, "experimental_setFilter")
  };
  o.channel?.on(
    zs,
    /* @__PURE__ */ n(function({
      storyId: p,
      viewMode: d
    }) {
      let { sourceType: f } = k(this, e);
      if (f === "local") {
        let y = t.getState(), m = y.path === "/" || y.viewMode === "story" || y.viewMode === "docs", h = y.viewMode && y.storyId, g = y.viewMode !==
        d || y.storyId !== p, { type: S } = y.index?.[y.storyId] || {};
        m && (h && g && !(S === "root" || S === "component" || S === "group") ? o.channel?.emit(Us, {
          storyId: y.storyId,
          viewMode: y.viewMode
        }) : g && r(`/${d}/${p}`));
      }
    }, "handler")
  ), o.channel?.on(Cs, /* @__PURE__ */ n(function() {
    let { ref: p } = k(this, e);
    c.setPreviewInitialized(p);
  }, "handler")), o.channel?.on($s, /* @__PURE__ */ n(function() {
    let { sourceType: p } = k(this, e);
    if (p === "local") {
      let d = c.getCurrentParameter("options");
      d && e.setOptions(fr(d));
    }
  }, "handler")), o.channel?.on(
    Ks,
    /* @__PURE__ */ n(function({ id: p, ...d }) {
      let { ref: f, sourceType: y } = k(this, e);
      if (c.updateStory(p, { ...d, prepared: !0 }, f), !f && !t.getState().hasCalledSetOptions) {
        let { options: m } = d.parameters;
        e.setOptions(fr(m)), t.setState({ hasCalledSetOptions: !0 });
      }
      if (y === "local") {
        let { storyId: m, index: h, refId: g } = t.getState();
        if (!h)
          return;
        let S = Array.from(
          /* @__PURE__ */ new Set([
            c.findSiblingStoryId(m, h, 1, !0),
            c.findSiblingStoryId(m, h, -1, !0)
          ])
        ).filter(Boolean);
        o.channel?.emit(js, {
          ids: S,
          options: { target: g }
        });
      }
    }, "handler")
  ), o.channel?.on(
    Ns,
    /* @__PURE__ */ n(function({ id: p, ...d }) {
      let { ref: f } = k(this, e);
      c.updateStory(p, { ...d, prepared: !0 }, f);
    }, "handler")
  ), o.channel?.on(Fs, /* @__PURE__ */ n(function(p) {
    let { ref: d } = k(this, e);
    if (d)
      e.setRef(d.id, { ...d, storyIndex: p }, !0);
    else {
      c.setIndex(p);
      let f = c.getCurrentParameter("options");
      e.setOptions(fr(f));
    }
  }, "handler")), o.channel?.on(Ws, /* @__PURE__ */ n(function(p) {
    let { ref: d } = k(this, e), f = p.v ? lo(p) : p.stories;
    if (d)
      e.setRef(d.id, { ...d, setStoriesData: f }, !0);
    else
      throw new Error("Cannot call SET_STORIES for local frame");
  }, "handler")), o.channel?.on(
    Ds,
    /* @__PURE__ */ n(function({
      kind: p,
      title: d = p,
      story: f,
      name: y = f,
      storyId: m,
      ...h
    }) {
      let { ref: g } = k(this, e);
      g ? e.selectStory(m || d, y, { ...h, ref: g.id }) : e.selectStory(m || d, y, h);
    }, "handler")
  ), o.channel?.on(
    Gs,
    /* @__PURE__ */ n(function({ storyId: p, args: d }) {
      let { ref: f } = k(this, e);
      c.updateStory(p, { args: d }, f);
    }, "handleStoryArgsUpdated")
  ), o.channel?.on(Os, /* @__PURE__ */ n(function(p) {
    let { ref: d } = k(this, e);
    c.setPreviewInitialized(d);
  }, "handleConfigError")), o.channel?.on(Vs, /* @__PURE__ */ n(function(p) {
    let { ref: d } = k(this, e);
    c.setPreviewInitialized(d);
  }, "handleConfigError")), o.channel?.on(Ms, () => {
    let l = o.getConfig();
    l?.sidebar?.filters && t.setState({
      filters: {
        ...t.getState().filters,
        ...l?.sidebar?.filters
      }
    });
  }), gt.onAllStatusChange(async () => {
    let { internal_index: l } = t.getState();
    if (!l)
      return;
    await c.setIndex(l);
    let p = await e.getRefs();
    Object.entries(p).forEach(([d, { internal_index: f, ...y }]) => {
      e.setRef(d, { ...y, storyIndex: f }, !0);
    });
  });
  let u = o.getConfig();
  return {
    api: c,
    state: {
      storyId: s,
      viewMode: i,
      hasCalledSetOptions: !1,
      previewInitialized: !1,
      filters: u?.sidebar?.filters || {}
    },
    init: /* @__PURE__ */ n(async () => {
      o.channel?.on(Bs, () => c.fetchIndex()), await c.fetchIndex();
    }, "init")
  };
}, "init");

// src/manager-api/modules/url.ts
var gr = {};
L(gr, {
  init: () => ia
});
import {
  GLOBALS_UPDATED as Zs,
  NAVIGATE_URL as ea,
  SET_CURRENT_STORY as ta,
  STORY_ARGS_UPDATED as ra,
  UPDATE_QUERY_PARAMS as oa
} from "storybook/internal/core-events";
import { buildArgsParam as Co, queryFromLocation as na } from "storybook/internal/router";
import { global as sa } from "@storybook/global";
var { window: mr } = sa, te = /* @__PURE__ */ n((e) => {
  if (e === "true" || e === "1")
    return !0;
  if (e === "false" || e === "0")
    return !1;
}, "parseBoolean"), hr, aa = /* @__PURE__ */ n(({
  state: { location: e, path: t, viewMode: r, storyId: o },
  singleStory: s
}) => {
  let {
    full: i,
    panel: a,
    nav: c,
    shortcuts: u,
    addonPanel: l,
    tabs: p,
    path: d,
    ...f
    // the rest gets passed to the iframe
  } = na(e), y, m, h;
  te(i) === !0 ? (y = 0, m = 0, h = 0) : te(i) === !1 && (y = U.layout.navSize, m = U.layout.bottomPanelHeight, h = U.layout.rightPanelWidth),
  s || (te(c) === !0 && (y = U.layout.navSize), te(c) === !1 && (y = 0)), te(a) === !1 && (m = 0, h = 0);
  let g = {
    navSize: y,
    bottomPanelHeight: m,
    rightPanelWidth: h,
    panelPosition: ["right", "bottom"].includes(a) ? a : void 0,
    showTabs: te(p)
  }, S = {
    enableShortcuts: te(u)
  }, P = l || void 0, E = o, v = F(hr, f) ? hr : f;
  return hr = v, { viewMode: r, layout: g, ui: S, selectedPanel: P, location: e, path: t, customQueryParams: v, storyId: E };
}, "initialUrlSupport"), ia = /* @__PURE__ */ n((e) => {
  let { store: t, navigate: r, provider: o, fullAPI: s } = e, i = /* @__PURE__ */ n((l, p = {}, d = {}) => {
    let f = Object.entries(p).filter(([, m]) => m).sort(([m], [h]) => m < h ? -1 : 1).map(([m, h]) => `${m}=${h}`), y = [l, ...f].join("&");
    return r(y, d);
  }, "navigateTo"), a = {
    getQueryParam(l) {
      let { customQueryParams: p } = t.getState();
      return p ? p[l] : void 0;
    },
    getUrlState() {
      let { location: l, path: p, customQueryParams: d, storyId: f, url: y, viewMode: m } = t.getState();
      return {
        path: p,
        hash: l.hash ?? "",
        queryParams: d,
        storyId: f,
        url: y,
        viewMode: m
      };
    },
    setQueryParams(l) {
      let { customQueryParams: p } = t.getState(), d = {}, f = {
        ...p,
        ...Object.entries(l).reduce((y, [m, h]) => (h !== null && (y[m] = h), y), d)
      };
      F(p, f) || (t.setState({ customQueryParams: f }), o.channel?.emit(oa, f));
    },
    applyQueryParams(l, p) {
      let { path: d, hash: f = "", queryParams: y } = a.getUrlState();
      i(`${d}${f}`, { ...y, ...l }, p), a.setQueryParams(l);
    },
    navigateUrl(l, p) {
      r(l, { plain: !0, ...p });
    }
  }, c = /* @__PURE__ */ n(() => {
    let { path: l, hash: p = "", queryParams: d, viewMode: f } = a.getUrlState();
    if (f !== "story")
      return;
    let y = s.getCurrentStoryData();
    if (y?.type !== "story")
      return;
    let { args: m, initialArgs: h } = y, g = Co(h, m);
    i(`${l}${p}`, { ...d, args: g }, { replace: !0 }), a.setQueryParams({ args: g });
  }, "updateArgsParam");
  o.channel?.on(ta, () => c());
  let u;
  return o.channel?.on(ra, () => {
    "requestIdleCallback" in mr ? (u && mr.cancelIdleCallback(u), u = mr.requestIdleCallback(c, { timeout: 1e3 })) : (u && clearTimeout(u), setTimeout(
    c, 100));
  }), o.channel?.on(Zs, ({ userGlobals: l, initialGlobals: p }) => {
    let { path: d, hash: f = "", queryParams: y } = a.getUrlState(), m = Co(p, l);
    i(`${d}${f}`, { ...y, globals: m }, { replace: !0 }), a.setQueryParams({ globals: m });
  }), o.channel?.on(ea, (l, p) => {
    a.navigateUrl(l, p);
  }), {
    api: a,
    state: aa(e)
  };
}, "init");

// src/manager-api/modules/versions.ts
var br = {};
L(br, {
  init: () => la
});
var ko = Ot(Bt(), 1);
import { global as Sr } from "@storybook/global";
import $ from "semver";

// src/manager-api/version.ts
var No = "9.0.18";

// src/manager-api/modules/versions.ts
var { VERSIONCHECK: ca } = Sr, jo = (0, ko.default)(1)(() => {
  try {
    return { ...JSON.parse(ca).data || {} };
  } catch {
    return {};
  }
}), ua = /* @__PURE__ */ n((e) => e.includes("vue") ? "vue" : e, "normalizeRendererName"), la = /* @__PURE__ */ n(({ store: e }) => {
  let { dismissedVersionNotification: t } = e.getState(), r = {
    versions: {
      current: {
        version: No
      },
      ...jo()
    },
    dismissedVersionNotification: t
  }, o = {
    getCurrentVersion: /* @__PURE__ */ n(() => {
      let {
        versions: { current: i }
      } = e.getState();
      return i;
    }, "getCurrentVersion"),
    getLatestVersion: /* @__PURE__ */ n(() => {
      let {
        versions: { latest: i, next: a, current: c }
      } = e.getState();
      return c && $.prerelease(c.version) && a ? i && $.gt(i.version, a.version) ? i : a : i;
    }, "getLatestVersion"),
    // TODO: Move this to it's own "info" module later
    getDocsUrl: /* @__PURE__ */ n(({ subpath: i, versioned: a, renderer: c }) => {
      let {
        versions: { latest: u, current: l }
      } = e.getState(), p = "https://storybook.js.org/docs/";
      if (a && l?.version && u?.version) {
        let y = $.diff(u.version, l.version);
        y === "patch" || y === null || // assume latest version when current version is a 0.0.0 canary
        $.satisfies(l.version, "0.0.0", { includePrerelease: !0 }) || (p += `${$.major(l.version)}.${$.minor(l.version)}/`);
      }
      let [d, f] = i?.split("#") || [];
      if (d && (p += `${d}/`), c && typeof Sr.STORYBOOK_RENDERER < "u") {
        let y = Sr.STORYBOOK_RENDERER;
        y && (p += `?renderer=${ua(y)}`);
      }
      return f && (p += `#${f}`), p;
    }, "getDocsUrl"),
    versionUpdateAvailable: /* @__PURE__ */ n(() => {
      let i = o.getLatestVersion(), a = o.getCurrentVersion();
      if (i) {
        if (!i.version || !a.version)
          return !0;
        let u = !!$.prerelease(a.version) ? `${$.major(a.version)}.${$.minor(a.version)}.${$.patch(
          a.version
        )}` : a.version, l = $.diff(u, i.version);
        return $.gt(i.version, u) && l !== "patch" && !l.includes("pre");
      }
      return !1;
    }, "versionUpdateAvailable")
  };
  return { init: /* @__PURE__ */ n(async () => {
    let { versions: i = {} } = e.getState(), { latest: a, next: c } = jo();
    await e.setState({
      versions: { ...i, latest: a, next: c }
    });
  }, "initModule"), state: r, api: o };
}, "init");

// src/manager-api/modules/whatsnew.tsx
var Ar = {};
L(Ar, {
  init: () => ga
});
import Pr from "react";
import {
  REQUEST_WHATS_NEW_DATA as pa,
  RESULT_WHATS_NEW_DATA as da,
  SET_WHATS_NEW_CACHE as fa,
  TOGGLE_WHATS_NEW_NOTIFICATIONS as ya
} from "storybook/internal/core-events";
import { global as ma } from "@storybook/global";
var Do = "whats-new", ha = /* @__PURE__ */ n(({ color: e = "currentColor", size: t = 14 }) => /* @__PURE__ */ Pr.createElement(
  "svg",
  {
    width: t,
    height: t,
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ Pr.createElement(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M2.042.616a.704.704 0 00-.66.729L1.816 12.9c.014.367.306.66.672.677l9.395.422h.032a.704.704 0 00.704-.703V.704c0-.015 0-.03-.002-.\
044a.704.704 0 00-.746-.659l-.773.049.057 1.615a.105.105 0 01-.17.086l-.52-.41-.617.468a.105.105 0 01-.168-.088L9.746.134 2.042.616zm8.003 4\
.747c-.247.192-2.092.324-2.092.05.04-1.045-.429-1.091-.689-1.091-.247 0-.662.075-.662.634 0 .57.607.893 1.32 1.27 1.014.538 2.24 1.188 2.24 \
2.823 0 1.568-1.273 2.433-2.898 2.433-1.676 0-3.141-.678-2.976-3.03.065-.275 2.197-.21 2.197 0-.026.971.195 1.256.753 1.256.43 0 .624-.236.6\
24-.634 0-.602-.633-.958-1.361-1.367-.987-.554-2.148-1.205-2.148-2.7 0-1.494 1.027-2.489 2.86-2.489 1.832 0 2.832.98 2.832 2.845z",
      fill: e
    }
  )
), "StorybookIcon"), ga = /* @__PURE__ */ n(({ fullAPI: e, store: t, provider: r }) => {
  let o = {
    whatsNewData: void 0
  };
  function s(l) {
    t.setState({ whatsNewData: l }), o.whatsNewData = l;
  }
  n(s, "setWhatsNewState");
  let i = {
    isWhatsNewUnread() {
      return o.whatsNewData?.status === "SUCCESS" && !o.whatsNewData.postIsRead;
    },
    whatsNewHasBeenRead() {
      o.whatsNewData?.status === "SUCCESS" && (c({ lastReadPost: o.whatsNewData.url }), s({ ...o.whatsNewData, postIsRead: !0 }), e.clearNotification(
      Do));
    },
    toggleWhatsNewNotifications() {
      o.whatsNewData?.status === "SUCCESS" && (s({
        ...o.whatsNewData,
        disableWhatsNewNotifications: !o.whatsNewData.disableWhatsNewNotifications
      }), r.channel?.emit(ya, {
        disableWhatsNewNotifications: o.whatsNewData.disableWhatsNewNotifications
      }));
    }
  };
  function a() {
    return r.channel?.emit(pa), new Promise(
      (l) => r.channel?.once(
        da,
        ({ data: p }) => l(p)
      )
    );
  }
  n(a, "getLatestWhatsNewPost");
  function c(l) {
    r.channel?.emit(fa, l);
  }
  return n(c, "setWhatsNewCache"), { init: /* @__PURE__ */ n(async () => {
    if (ma.CONFIG_TYPE !== "DEVELOPMENT")
      return;
    let l = await a();
    s(l);
    let p = e.getUrlState();
    !(p?.path === "/onboarding" || p.queryParams?.onboarding === "true") && l.status === "SUCCESS" && !l.disableWhatsNewNotifications && l.showNotification &&
    e.addNotification({
      id: Do,
      link: "/settings/whats-new",
      content: {
        headline: l.title,
        subHeadline: "Learn what's new in Storybook"
      },
      icon: /* @__PURE__ */ Pr.createElement(ha, null),
      onClear({ dismissed: f }) {
        f && c({ lastDismissedPost: l.url });
      }
    });
  }, "initModule"), state: o, api: i };
}, "init");

// src/manager-api/store.ts
var ye = Ot(Mo(), 1);

// ../node_modules/telejson/dist/chunk-EAFQLD22.mjs
var Sa = Object.create, Uo = Object.defineProperty, ba = Object.getOwnPropertyDescriptor, Lo = Object.getOwnPropertyNames, Pa = Object.getPrototypeOf,
Aa = Object.prototype.hasOwnProperty, A = /* @__PURE__ */ n((e, t) => /* @__PURE__ */ n(function() {
  return t || (0, e[Lo(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, "__require"), "__commonJS"), Ea = /* @__PURE__ */ n((e, t, r, o) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let s of Lo(t))
      !Aa.call(e, s) && s !== r && Uo(e, s, { get: /* @__PURE__ */ n(() => t[s], "get"), enumerable: !(o = ba(t, s)) || o.enumerable });
  return e;
}, "__copyProps"), At = /* @__PURE__ */ n((e, t, r) => (r = e != null ? Sa(Pa(e)) : {}, Ea(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  t || !e || !e.__esModule ? Uo(r, "default", { value: e, enumerable: !0 }) : r,
  e
)), "__toESM"), va = [
  "bubbles",
  "cancelBubble",
  "cancelable",
  "composed",
  "currentTarget",
  "defaultPrevented",
  "eventPhase",
  "isTrusted",
  "returnValue",
  "srcElement",
  "target",
  "timeStamp",
  "type"
], _a = ["detail"];
function Fo(e) {
  let t = va.filter((r) => e[r] !== void 0).reduce((r, o) => (r[o] = e[o], r), {});
  if (e instanceof CustomEvent)
    for (let r of _a.filter(
      (o) => e[o] !== void 0
    ))
      t[r] = e[r];
  return t;
}
n(Fo, "extractEventHiddenProperties");

// ../node_modules/telejson/dist/index.mjs
var Ko = A({
  "node_modules/.pnpm/es-object-atoms@1.1.1/node_modules/es-object-atoms/index.js"(e, t) {
    "use strict";
    t.exports = Object;
  }
}), Ia = A({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js"(e, t) {
    "use strict";
    t.exports = Error;
  }
}), xa = A({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js"(e, t) {
    "use strict";
    t.exports = EvalError;
  }
}), Ta = A({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js"(e, t) {
    "use strict";
    t.exports = RangeError;
  }
}), Ra = A({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js"(e, t) {
    "use strict";
    t.exports = ReferenceError;
  }
}), wa = A({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js"(e, t) {
    "use strict";
    t.exports = SyntaxError;
  }
}), vr = A({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js"(e, t) {
    "use strict";
    t.exports = TypeError;
  }
}), Oa = A({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js"(e, t) {
    "use strict";
    t.exports = URIError;
  }
}), Ca = A({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js"(e, t) {
    "use strict";
    t.exports = Math.abs;
  }
}), Na = A({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js"(e, t) {
    "use strict";
    t.exports = Math.floor;
  }
}), ja = A({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js"(e, t) {
    "use strict";
    t.exports = Math.max;
  }
}), ka = A({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js"(e, t) {
    "use strict";
    t.exports = Math.min;
  }
}), Da = A({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js"(e, t) {
    "use strict";
    t.exports = Math.pow;
  }
}), Ma = A({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js"(e, t) {
    "use strict";
    t.exports = Math.round;
  }
}), Ua = A({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js"(e, t) {
    "use strict";
    t.exports = Number.isNaN || /* @__PURE__ */ n(function(o) {
      return o !== o;
    }, "isNaN2");
  }
}), La = A({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js"(e, t) {
    "use strict";
    var r = Ua();
    t.exports = /* @__PURE__ */ n(function(s) {
      return r(s) || s === 0 ? s : s < 0 ? -1 : 1;
    }, "sign");
  }
}), Fa = A({
  "node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js"(e, t) {
    "use strict";
    t.exports = Object.getOwnPropertyDescriptor;
  }
}), _r = A({
  "node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js"(e, t) {
    "use strict";
    var r = Fa();
    if (r)
      try {
        r([], "length");
      } catch {
        r = null;
      }
    t.exports = r;
  }
}), Wa = A({
  "node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js"(e, t) {
    "use strict";
    var r = Object.defineProperty || !1;
    if (r)
      try {
        r({}, "a", { value: 1 });
      } catch {
        r = !1;
      }
    t.exports = r;
  }
}), zo = A({
  "node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js"(e, t) {
    "use strict";
    t.exports = /* @__PURE__ */ n(function() {
      if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
        return !1;
      if (typeof Symbol.iterator == "symbol")
        return !0;
      var o = {}, s = Symbol("test"), i = Object(s);
      if (typeof s == "string" || Object.prototype.toString.call(s) !== "[object Symbol]" || Object.prototype.toString.call(i) !== "[object \
Symbol]")
        return !1;
      var a = 42;
      o[s] = a;
      for (var c in o)
        return !1;
      if (typeof Object.keys == "function" && Object.keys(o).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(
      o).length !== 0)
        return !1;
      var u = Object.getOwnPropertySymbols(o);
      if (u.length !== 1 || u[0] !== s || !Object.prototype.propertyIsEnumerable.call(o, s))
        return !1;
      if (typeof Object.getOwnPropertyDescriptor == "function") {
        var l = (
          /** @type {PropertyDescriptor} */
          Object.getOwnPropertyDescriptor(o, s)
        );
        if (l.value !== a || l.enumerable !== !0)
          return !1;
      }
      return !0;
    }, "hasSymbols");
  }
}), Ho = A({
  "node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js"(e, t) {
    "use strict";
    var r = typeof Symbol < "u" && Symbol, o = zo();
    t.exports = /* @__PURE__ */ n(function() {
      return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 :
      o();
    }, "hasNativeSymbols");
  }
}), qo = A({
  "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js"(e, t) {
    "use strict";
    t.exports = typeof Reflect < "u" && Reflect.getPrototypeOf || null;
  }
}), Yo = A({
  "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js"(e, t) {
    "use strict";
    var r = Ko();
    t.exports = r.getPrototypeOf || null;
  }
}), Ga = A({
  "node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js"(e, t) {
    "use strict";
    var r = "Function.prototype.bind called on incompatible ", o = Object.prototype.toString, s = Math.max, i = "[object Function]", a = /* @__PURE__ */ n(
    function(p, d) {
      for (var f = [], y = 0; y < p.length; y += 1)
        f[y] = p[y];
      for (var m = 0; m < d.length; m += 1)
        f[m + p.length] = d[m];
      return f;
    }, "concatty2"), c = /* @__PURE__ */ n(function(p, d) {
      for (var f = [], y = d || 0, m = 0; y < p.length; y += 1, m += 1)
        f[m] = p[y];
      return f;
    }, "slicy2"), u = /* @__PURE__ */ n(function(l, p) {
      for (var d = "", f = 0; f < l.length; f += 1)
        d += l[f], f + 1 < l.length && (d += p);
      return d;
    }, "joiny");
    t.exports = /* @__PURE__ */ n(function(p) {
      var d = this;
      if (typeof d != "function" || o.apply(d) !== i)
        throw new TypeError(r + d);
      for (var f = c(arguments, 1), y, m = /* @__PURE__ */ n(function() {
        if (this instanceof y) {
          var E = d.apply(
            this,
            a(f, arguments)
          );
          return Object(E) === E ? E : this;
        }
        return d.apply(
          p,
          a(f, arguments)
        );
      }, "binder"), h = s(0, d.length - f.length), g = [], S = 0; S < h; S++)
        g[S] = "$" + S;
      if (y = Function("binder", "return function (" + u(g, ",") + "){ return binder.apply(this,arguments); }")(m), d.prototype) {
        var P = /* @__PURE__ */ n(function() {
        }, "Empty2");
        P.prototype = d.prototype, y.prototype = new P(), P.prototype = null;
      }
      return y;
    }, "bind");
  }
}), Et = A({
  "node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js"(e, t) {
    "use strict";
    var r = Ga();
    t.exports = Function.prototype.bind || r;
  }
}), Ir = A({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionCall.js"(e, t) {
    "use strict";
    t.exports = Function.prototype.call;
  }
}), Jo = A({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionApply.js"(e, t) {
    "use strict";
    t.exports = Function.prototype.apply;
  }
}), $a = A({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/reflectApply.js"(e, t) {
    "use strict";
    t.exports = typeof Reflect < "u" && Reflect && Reflect.apply;
  }
}), Ba = A({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/actualApply.js"(e, t) {
    "use strict";
    var r = Et(), o = Jo(), s = Ir(), i = $a();
    t.exports = i || r.call(s, o);
  }
}), Xo = A({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/index.js"(e, t) {
    "use strict";
    var r = Et(), o = vr(), s = Ir(), i = Ba();
    t.exports = /* @__PURE__ */ n(function(c) {
      if (c.length < 1 || typeof c[0] != "function")
        throw new o("a function is required");
      return i(r, s, c);
    }, "callBindBasic");
  }
}), Va = A({
  "node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js"(e, t) {
    "use strict";
    var r = Xo(), o = _r(), s;
    try {
      s = /** @type {{ __proto__?: typeof Array.prototype }} */
      [].__proto__ === Array.prototype;
    } catch (u) {
      if (!u || typeof u != "object" || !("code" in u) || u.code !== "ERR_PROTO_ACCESS")
        throw u;
    }
    var i = !!s && o && o(
      Object.prototype,
      /** @type {keyof typeof Object.prototype} */
      "__proto__"
    ), a = Object, c = a.getPrototypeOf;
    t.exports = i && typeof i.get == "function" ? r([i.get]) : typeof c == "function" ? (
      /** @type {import('./get')} */
      /* @__PURE__ */ n(function(l) {
        return c(l == null ? l : a(l));
      }, "getDunder")
    ) : !1;
  }
}), Ka = A({
  "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js"(e, t) {
    "use strict";
    var r = qo(), o = Yo(), s = Va();
    t.exports = r ? /* @__PURE__ */ n(function(a) {
      return r(a);
    }, "getProto") : o ? /* @__PURE__ */ n(function(a) {
      if (!a || typeof a != "object" && typeof a != "function")
        throw new TypeError("getProto: not an object");
      return o(a);
    }, "getProto") : s ? /* @__PURE__ */ n(function(a) {
      return s(a);
    }, "getProto") : null;
  }
}), Qo = A({
  "node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js"(e, t) {
    "use strict";
    var r = Function.prototype.call, o = Object.prototype.hasOwnProperty, s = Et();
    t.exports = s.call(r, o);
  }
}), za = A({
  "node_modules/.pnpm/get-intrinsic@1.3.0/node_modules/get-intrinsic/index.js"(e, t) {
    "use strict";
    var r, o = Ko(), s = Ia(), i = xa(), a = Ta(), c = Ra(), u = wa(), l = vr(), p = Oa(), d = Ca(), f = Na(), y = ja(), m = ka(), h = Da(),
    g = Ma(), S = La(), P = Function, E = /* @__PURE__ */ n(function(B) {
      try {
        return P('"use strict"; return (' + B + ").constructor;")();
      } catch {
      }
    }, "getEvalledConstructor"), v = _r(), I = Wa(), _ = /* @__PURE__ */ n(function() {
      throw new l();
    }, "throwTypeError"), w = v ? function() {
      try {
        return arguments.callee, _;
      } catch {
        try {
          return v(arguments, "callee").get;
        } catch {
          return _;
        }
      }
    }() : _, C = Ho()(), x = Ka(), he = Yo(), An = qo(), Lr = Jo(), ge = Ir(), re = {}, En = typeof Uint8Array > "u" || !x ? r : x(Uint8Array),
    X = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
      "%ArrayIteratorPrototype%": C && x ? x([][Symbol.iterator]()) : r,
      "%AsyncFromSyncIteratorPrototype%": r,
      "%AsyncFunction%": re,
      "%AsyncGenerator%": re,
      "%AsyncGeneratorFunction%": re,
      "%AsyncIteratorPrototype%": re,
      "%Atomics%": typeof Atomics > "u" ? r : Atomics,
      "%BigInt%": typeof BigInt > "u" ? r : BigInt,
      "%BigInt64Array%": typeof BigInt64Array > "u" ? r : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array > "u" ? r : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView > "u" ? r : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": s,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": i,
      "%Float16Array%": typeof Float16Array > "u" ? r : Float16Array,
      "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
      "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
      "%Function%": P,
      "%GeneratorFunction%": re,
      "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
      "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
      "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": C && x ? x(x([][Symbol.iterator]())) : r,
      "%JSON%": typeof JSON == "object" ? JSON : r,
      "%Map%": typeof Map > "u" ? r : Map,
      "%MapIteratorPrototype%": typeof Map > "u" || !C || !x ? r : x((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": o,
      "%Object.getOwnPropertyDescriptor%": v,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise > "u" ? r : Promise,
      "%Proxy%": typeof Proxy > "u" ? r : Proxy,
      "%RangeError%": a,
      "%ReferenceError%": c,
      "%Reflect%": typeof Reflect > "u" ? r : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set > "u" ? r : Set,
      "%SetIteratorPrototype%": typeof Set > "u" || !C || !x ? r : x((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": C && x ? x(""[Symbol.iterator]()) : r,
      "%Symbol%": C ? Symbol : r,
      "%SyntaxError%": u,
      "%ThrowTypeError%": w,
      "%TypedArray%": En,
      "%TypeError%": l,
      "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
      "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
      "%URIError%": p,
      "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
      "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
      "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet,
      "%Function.prototype.call%": ge,
      "%Function.prototype.apply%": Lr,
      "%Object.defineProperty%": I,
      "%Object.getPrototypeOf%": he,
      "%Math.abs%": d,
      "%Math.floor%": f,
      "%Math.max%": y,
      "%Math.min%": m,
      "%Math.pow%": h,
      "%Math.round%": g,
      "%Math.sign%": S,
      "%Reflect.getPrototypeOf%": An
    };
    if (x)
      try {
        null.error;
      } catch (B) {
        Fr = x(x(B)), X["%Error.prototype%"] = Fr;
      }
    var Fr, vn = /* @__PURE__ */ n(function B(T) {
      var O;
      if (T === "%AsyncFunction%")
        O = E("async function () {}");
      else if (T === "%GeneratorFunction%")
        O = E("function* () {}");
      else if (T === "%AsyncGeneratorFunction%")
        O = E("async function* () {}");
      else if (T === "%AsyncGenerator%") {
        var R = B("%AsyncGeneratorFunction%");
        R && (O = R.prototype);
      } else if (T === "%AsyncIteratorPrototype%") {
        var N = B("%AsyncGenerator%");
        N && x && (O = x(N.prototype));
      }
      return X[T] = O, O;
    }, "doEval2"), Wr = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    }, Se = Et(), De = Qo(), _n = Se.call(ge, Array.prototype.concat), In = Se.call(Lr, Array.prototype.splice), Gr = Se.call(ge, String.prototype.
    replace), Me = Se.call(ge, String.prototype.slice), xn = Se.call(ge, RegExp.prototype.exec), Tn = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
    Rn = /\\(\\)?/g, wn = /* @__PURE__ */ n(function(T) {
      var O = Me(T, 0, 1), R = Me(T, -1);
      if (O === "%" && R !== "%")
        throw new u("invalid intrinsic syntax, expected closing `%`");
      if (R === "%" && O !== "%")
        throw new u("invalid intrinsic syntax, expected opening `%`");
      var N = [];
      return Gr(T, Tn, function(V, oe, D, Ue) {
        N[N.length] = D ? Gr(Ue, Rn, "$1") : oe || V;
      }), N;
    }, "stringToPath3"), On = /* @__PURE__ */ n(function(T, O) {
      var R = T, N;
      if (De(Wr, R) && (N = Wr[R], R = "%" + N[0] + "%"), De(X, R)) {
        var V = X[R];
        if (V === re && (V = vn(R)), typeof V > "u" && !O)
          throw new l("intrinsic " + T + " exists, but is not available. Please file an issue!");
        return {
          alias: N,
          name: R,
          value: V
        };
      }
      throw new u("intrinsic " + T + " does not exist!");
    }, "getBaseIntrinsic2");
    t.exports = /* @__PURE__ */ n(function(T, O) {
      if (typeof T != "string" || T.length === 0)
        throw new l("intrinsic name must be a non-empty string");
      if (arguments.length > 1 && typeof O != "boolean")
        throw new l('"allowMissing" argument must be a boolean');
      if (xn(/^%?[^%]*%?$/, T) === null)
        throw new u("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      var R = wn(T), N = R.length > 0 ? R[0] : "", V = On("%" + N + "%", O), oe = V.name, D = V.value, Ue = !1, wt = V.alias;
      wt && (N = wt[0], In(R, _n([0, 1], wt)));
      for (var Le = 1, be = !0; Le < R.length; Le += 1) {
        var H = R[Le], Fe = Me(H, 0, 1), We = Me(H, -1);
        if ((Fe === '"' || Fe === "'" || Fe === "`" || We === '"' || We === "'" || We === "`") && Fe !== We)
          throw new u("property names with quotes must have matching quotes");
        if ((H === "constructor" || !be) && (Ue = !0), N += "." + H, oe = "%" + N + "%", De(X, oe))
          D = X[oe];
        else if (D != null) {
          if (!(H in D)) {
            if (!O)
              throw new l("base intrinsic for " + T + " exists, but the property is not available.");
            return;
          }
          if (v && Le + 1 >= R.length) {
            var Ge = v(D, H);
            be = !!Ge, be && "get" in Ge && !("originalValue" in Ge.get) ? D = Ge.get : D = D[H];
          } else
            be = De(D, H), D = D[H];
          be && !Ue && (X[oe] = D);
        }
      }
      return D;
    }, "GetIntrinsic");
  }
}), xr = A({
  "node_modules/.pnpm/call-bound@1.0.4/node_modules/call-bound/index.js"(e, t) {
    "use strict";
    var r = za(), o = Xo(), s = o([r("%String.prototype.indexOf%")]);
    t.exports = /* @__PURE__ */ n(function(a, c) {
      var u = (
        /** @type {(this: unknown, ...args: unknown[]) => unknown} */
        r(a, !!c)
      );
      return typeof u == "function" && s(a, ".prototype.") > -1 ? o(
        /** @type {const} */
        [u]
      ) : u;
    }, "callBoundIntrinsic");
  }
}), Ha = A({
  "node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js"(e, t) {
    "use strict";
    var r = zo();
    t.exports = /* @__PURE__ */ n(function() {
      return r() && !!Symbol.toStringTag;
    }, "hasToStringTagShams");
  }
}), Zo = A({
  "node_modules/.pnpm/is-regex@1.2.1/node_modules/is-regex/index.js"(e, t) {
    "use strict";
    var r = xr(), o = Ha()(), s = Qo(), i = _r(), a;
    o ? (c = r("RegExp.prototype.exec"), u = {}, l = /* @__PURE__ */ n(function() {
      throw u;
    }, "throwRegexMarker"), p = {
      toString: l,
      valueOf: l
    }, typeof Symbol.toPrimitive == "symbol" && (p[Symbol.toPrimitive] = l), a = /* @__PURE__ */ n(function(m) {
      if (!m || typeof m != "object")
        return !1;
      var h = (
        /** @type {NonNullable<typeof gOPD>} */
        i(
          /** @type {{ lastIndex?: unknown }} */
          m,
          "lastIndex"
        )
      ), g = h && s(h, "value");
      if (!g)
        return !1;
      try {
        c(
          m,
          /** @type {string} */
          /** @type {unknown} */
          p
        );
      } catch (S) {
        return S === u;
      }
    }, "isRegex")) : (d = r("Object.prototype.toString"), f = "[object RegExp]", a = /* @__PURE__ */ n(function(m) {
      return !m || typeof m != "object" && typeof m != "function" ? !1 : d(m) === f;
    }, "isRegex"));
    var c, u, l, p, d, f;
    t.exports = a;
  }
}), qa = A({
  "node_modules/.pnpm/is-function@1.0.2/node_modules/is-function/index.js"(e, t) {
    t.exports = o;
    var r = Object.prototype.toString;
    function o(s) {
      if (!s)
        return !1;
      var i = r.call(s);
      return i === "[object Function]" || typeof s == "function" && i !== "[object RegExp]" || typeof window < "u" && // IE8 and below
      (s === window.setTimeout || s === window.alert || s === window.confirm || s === window.prompt);
    }
    n(o, "isFunction3");
  }
}), Ya = A({
  "node_modules/.pnpm/safe-regex-test@1.1.0/node_modules/safe-regex-test/index.js"(e, t) {
    "use strict";
    var r = xr(), o = Zo(), s = r("RegExp.prototype.exec"), i = vr();
    t.exports = /* @__PURE__ */ n(function(c) {
      if (!o(c))
        throw new i("`regex` must be a RegExp");
      return /* @__PURE__ */ n(function(l) {
        return s(c, l) !== null;
      }, "test");
    }, "regexTester");
  }
}), Ja = A({
  "node_modules/.pnpm/is-symbol@1.1.1/node_modules/is-symbol/index.js"(e, t) {
    "use strict";
    var r = xr(), o = r("Object.prototype.toString"), s = Ho()(), i = Ya();
    s ? (a = r("Symbol.prototype.toString"), c = i(/^Symbol\(.*\)$/), u = /* @__PURE__ */ n(function(p) {
      return typeof p.valueOf() != "symbol" ? !1 : c(a(p));
    }, "isRealSymbolObject"), t.exports = /* @__PURE__ */ n(function(p) {
      if (typeof p == "symbol")
        return !0;
      if (!p || typeof p != "object" || o(p) !== "[object Symbol]")
        return !1;
      try {
        return u(p);
      } catch {
        return !1;
      }
    }, "isSymbol3")) : t.exports = /* @__PURE__ */ n(function(p) {
      return !1;
    }, "isSymbol3");
    var a, c, u;
  }
}), Xa = At(Zo()), Qa = At(qa()), Za = At(Ja());
function ei(e) {
  return e != null && typeof e == "object" && Array.isArray(e) === !1;
}
n(ei, "isObject");
var ti = typeof global == "object" && global && global.Object === Object && global, ri = ti, oi = typeof self == "object" && self && self.Object ===
Object && self, ni = ri || oi || Function("return this")(), Tr = ni, si = Tr.Symbol, le = si, en = Object.prototype, ai = en.hasOwnProperty,
ii = en.toString, Oe = le ? le.toStringTag : void 0;
function ci(e) {
  var t = ai.call(e, Oe), r = e[Oe];
  try {
    e[Oe] = void 0;
    var o = !0;
  } catch {
  }
  var s = ii.call(e);
  return o && (t ? e[Oe] = r : delete e[Oe]), s;
}
n(ci, "getRawTag");
var ui = ci, li = Object.prototype, pi = li.toString;
function di(e) {
  return pi.call(e);
}
n(di, "objectToString");
var fi = di, yi = "[object Null]", mi = "[object Undefined]", Wo = le ? le.toStringTag : void 0;
function hi(e) {
  return e == null ? e === void 0 ? mi : yi : Wo && Wo in Object(e) ? ui(e) : fi(e);
}
n(hi, "baseGetTag");
var tn = hi;
function gi(e) {
  return e != null && typeof e == "object";
}
n(gi, "isObjectLike");
var Si = gi, bi = "[object Symbol]";
function Pi(e) {
  return typeof e == "symbol" || Si(e) && tn(e) == bi;
}
n(Pi, "isSymbol");
var Rr = Pi;
function Ai(e, t) {
  for (var r = -1, o = e == null ? 0 : e.length, s = Array(o); ++r < o; )
    s[r] = t(e[r], r, e);
  return s;
}
n(Ai, "arrayMap");
var Ei = Ai, vi = Array.isArray, wr = vi, _i = 1 / 0, Go = le ? le.prototype : void 0, $o = Go ? Go.toString : void 0;
function rn(e) {
  if (typeof e == "string")
    return e;
  if (wr(e))
    return Ei(e, rn) + "";
  if (Rr(e))
    return $o ? $o.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -_i ? "-0" : t;
}
n(rn, "baseToString");
var Ii = rn;
function xi(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
n(xi, "isObject2");
var on = xi, Ti = "[object AsyncFunction]", Ri = "[object Function]", wi = "[object GeneratorFunction]", Oi = "[object Proxy]";
function Ci(e) {
  if (!on(e))
    return !1;
  var t = tn(e);
  return t == Ri || t == wi || t == Ti || t == Oi;
}
n(Ci, "isFunction");
var Ni = Ci, ji = Tr["__core-js_shared__"], Er = ji, Bo = function() {
  var e = /[^.]+$/.exec(Er && Er.keys && Er.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function ki(e) {
  return !!Bo && Bo in e;
}
n(ki, "isMasked");
var Di = ki, Mi = Function.prototype, Ui = Mi.toString;
function Li(e) {
  if (e != null) {
    try {
      return Ui.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
n(Li, "toSource");
var Fi = Li, Wi = /[\\^$.*+?()[\]{}|]/g, Gi = /^\[object .+?Constructor\]$/, $i = Function.prototype, Bi = Object.prototype, Vi = $i.toString,
Ki = Bi.hasOwnProperty, zi = RegExp(
  "^" + Vi.call(Ki).replace(Wi, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Hi(e) {
  if (!on(e) || Di(e))
    return !1;
  var t = Ni(e) ? zi : Gi;
  return t.test(Fi(e));
}
n(Hi, "baseIsNative");
var qi = Hi;
function Yi(e, t) {
  return e?.[t];
}
n(Yi, "getValue");
var Ji = Yi;
function Xi(e, t) {
  var r = Ji(e, t);
  return qi(r) ? r : void 0;
}
n(Xi, "getNative");
var nn = Xi;
function Qi(e, t) {
  return e === t || e !== e && t !== t;
}
n(Qi, "eq");
var Zi = Qi, ec = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, tc = /^\w*$/;
function rc(e, t) {
  if (wr(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Rr(e) ? !0 : tc.test(e) || !ec.test(e) || t != null && e in Object(
  t);
}
n(rc, "isKey");
var oc = rc, nc = nn(Object, "create"), Ce = nc;
function sc() {
  this.__data__ = Ce ? Ce(null) : {}, this.size = 0;
}
n(sc, "hashClear");
var ac = sc;
function ic(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
n(ic, "hashDelete");
var cc = ic, uc = "__lodash_hash_undefined__", lc = Object.prototype, pc = lc.hasOwnProperty;
function dc(e) {
  var t = this.__data__;
  if (Ce) {
    var r = t[e];
    return r === uc ? void 0 : r;
  }
  return pc.call(t, e) ? t[e] : void 0;
}
n(dc, "hashGet");
var fc = dc, yc = Object.prototype, mc = yc.hasOwnProperty;
function hc(e) {
  var t = this.__data__;
  return Ce ? t[e] !== void 0 : mc.call(t, e);
}
n(hc, "hashHas");
var gc = hc, Sc = "__lodash_hash_undefined__";
function bc(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = Ce && t === void 0 ? Sc : t, this;
}
n(bc, "hashSet");
var Pc = bc;
function pe(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
n(pe, "Hash");
pe.prototype.clear = ac;
pe.prototype.delete = cc;
pe.prototype.get = fc;
pe.prototype.has = gc;
pe.prototype.set = Pc;
var Vo = pe;
function Ac() {
  this.__data__ = [], this.size = 0;
}
n(Ac, "listCacheClear");
var Ec = Ac;
function vc(e, t) {
  for (var r = e.length; r--; )
    if (Zi(e[r][0], t))
      return r;
  return -1;
}
n(vc, "assocIndexOf");
var vt = vc, _c = Array.prototype, Ic = _c.splice;
function xc(e) {
  var t = this.__data__, r = vt(t, e);
  if (r < 0)
    return !1;
  var o = t.length - 1;
  return r == o ? t.pop() : Ic.call(t, r, 1), --this.size, !0;
}
n(xc, "listCacheDelete");
var Tc = xc;
function Rc(e) {
  var t = this.__data__, r = vt(t, e);
  return r < 0 ? void 0 : t[r][1];
}
n(Rc, "listCacheGet");
var wc = Rc;
function Oc(e) {
  return vt(this.__data__, e) > -1;
}
n(Oc, "listCacheHas");
var Cc = Oc;
function Nc(e, t) {
  var r = this.__data__, o = vt(r, e);
  return o < 0 ? (++this.size, r.push([e, t])) : r[o][1] = t, this;
}
n(Nc, "listCacheSet");
var jc = Nc;
function de(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
n(de, "ListCache");
de.prototype.clear = Ec;
de.prototype.delete = Tc;
de.prototype.get = wc;
de.prototype.has = Cc;
de.prototype.set = jc;
var kc = de, Dc = nn(Tr, "Map"), Mc = Dc;
function Uc() {
  this.size = 0, this.__data__ = {
    hash: new Vo(),
    map: new (Mc || kc)(),
    string: new Vo()
  };
}
n(Uc, "mapCacheClear");
var Lc = Uc;
function Fc(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
n(Fc, "isKeyable");
var Wc = Fc;
function Gc(e, t) {
  var r = e.__data__;
  return Wc(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
n(Gc, "getMapData");
var _t = Gc;
function $c(e) {
  var t = _t(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
n($c, "mapCacheDelete");
var Bc = $c;
function Vc(e) {
  return _t(this, e).get(e);
}
n(Vc, "mapCacheGet");
var Kc = Vc;
function zc(e) {
  return _t(this, e).has(e);
}
n(zc, "mapCacheHas");
var Hc = zc;
function qc(e, t) {
  var r = _t(this, e), o = r.size;
  return r.set(e, t), this.size += r.size == o ? 0 : 1, this;
}
n(qc, "mapCacheSet");
var Yc = qc;
function fe(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
n(fe, "MapCache");
fe.prototype.clear = Lc;
fe.prototype.delete = Bc;
fe.prototype.get = Kc;
fe.prototype.has = Hc;
fe.prototype.set = Yc;
var sn = fe, Jc = "Expected a function";
function Or(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Jc);
  var r = /* @__PURE__ */ n(function() {
    var o = arguments, s = t ? t.apply(this, o) : o[0], i = r.cache;
    if (i.has(s))
      return i.get(s);
    var a = e.apply(this, o);
    return r.cache = i.set(s, a) || i, a;
  }, "memoized");
  return r.cache = new (Or.Cache || sn)(), r;
}
n(Or, "memoize");
Or.Cache = sn;
var Xc = Or, Qc = 500;
function Zc(e) {
  var t = Xc(e, function(o) {
    return r.size === Qc && r.clear(), o;
  }), r = t.cache;
  return t;
}
n(Zc, "memoizeCapped");
var eu = Zc, tu = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ru = /\\(\\)?/g, ou = eu(
function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(tu, function(r, o, s, i) {
    t.push(s ? i.replace(ru, "$1") : o || r);
  }), t;
}), nu = ou;
function su(e) {
  return e == null ? "" : Ii(e);
}
n(su, "toString");
var au = su;
function iu(e, t) {
  return wr(e) ? e : oc(e, t) ? [e] : nu(au(e));
}
n(iu, "castPath");
var cu = iu, uu = 1 / 0;
function lu(e) {
  if (typeof e == "string" || Rr(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -uu ? "-0" : t;
}
n(lu, "toKey");
var pu = lu;
function du(e, t) {
  t = cu(t, e);
  for (var r = 0, o = t.length; e != null && r < o; )
    e = e[pu(t[r++])];
  return r && r == o ? e : void 0;
}
n(du, "baseGet");
var fu = du;
function yu(e, t, r) {
  var o = e == null ? void 0 : fu(e, t);
  return o === void 0 ? r : o;
}
n(yu, "get");
var mu = yu, Cr = ei, hu = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/, gu = /* @__PURE__ */ n((e) => e.match(/^[\[\{\"\}].*[\]\}\"]$/),
"isJSON");
function an(e) {
  if (!Cr(e))
    return e;
  let t = e, r = !1;
  return typeof Event < "u" && e instanceof Event && (t = Fo(t), r = !0), t = Object.keys(t).reduce((o, s) => {
    try {
      t[s] && t[s].toJSON, o[s] = t[s];
    } catch {
      r = !0;
    }
    return o;
  }, {}), r ? t : e;
}
n(an, "convertUnconventionalData");
var Su = /* @__PURE__ */ n(function(t) {
  let r, o, s, i;
  return /* @__PURE__ */ n(function(c, u) {
    try {
      if (c === "")
        return i = [], r = /* @__PURE__ */ new Map([[u, "[]"]]), o = /* @__PURE__ */ new Map(), s = [], u;
      let l = o.get(this) || this;
      for (; s.length && l !== s[0]; )
        s.shift(), i.pop();
      if (typeof u == "boolean")
        return u;
      if (u === void 0)
        return t.allowUndefined ? "_undefined_" : void 0;
      if (u === null)
        return null;
      if (typeof u == "number")
        return u === Number.NEGATIVE_INFINITY ? "_-Infinity_" : u === Number.POSITIVE_INFINITY ? "_Infinity_" : Number.isNaN(u) ? "_NaN_" : u;
      if (typeof u == "bigint")
        return `_bigint_${u.toString()}`;
      if (typeof u == "string")
        return hu.test(u) ? t.allowDate ? `_date_${u}` : void 0 : u;
      if ((0, Xa.default)(u))
        return t.allowRegExp ? `_regexp_${u.flags}|${u.source}` : void 0;
      if ((0, Qa.default)(u))
        return;
      if ((0, Za.default)(u)) {
        if (!t.allowSymbol)
          return;
        let d = Symbol.keyFor(u);
        return d !== void 0 ? `_gsymbol_${d}` : `_symbol_${u.toString().slice(7, -1)}`;
      }
      if (s.length >= t.maxDepth)
        return Array.isArray(u) ? `[Array(${u.length})]` : "[Object]";
      if (u === this)
        return `_duplicate_${JSON.stringify(i)}`;
      if (u instanceof Error && t.allowError)
        return {
          __isConvertedError__: !0,
          errorProperties: {
            // @ts-expect-error cause is not defined in the current tsconfig target(es2020)
            ...u.cause ? { cause: u.cause } : {},
            ...u,
            name: u.name,
            message: u.message,
            stack: u.stack,
            "_constructor-name_": u.constructor.name
          }
        };
      if (u?.constructor?.name && u.constructor.name !== "Object" && !Array.isArray(u)) {
        let d = r.get(u);
        if (!d) {
          let f = {
            __isClassInstance__: !0,
            __className__: u.constructor.name,
            ...Object.getOwnPropertyNames(u).reduce(
              (y, m) => {
                try {
                  y[m] = u[m];
                } catch {
                }
                return y;
              },
              {}
            )
          };
          return i.push(c), s.unshift(f), r.set(u, JSON.stringify(i)), u !== f && o.set(u, f), f;
        }
        return `_duplicate_${d}`;
      }
      let p = r.get(u);
      if (!p) {
        let d = Array.isArray(u) ? u : an(u);
        return i.push(c), s.unshift(d), r.set(u, JSON.stringify(i)), u !== d && o.set(u, d), d;
      }
      return `_duplicate_${p}`;
    } catch {
      return;
    }
  }, "replace");
}, "replacer2"), bu = /* @__PURE__ */ n(function(t) {
  let r = [], o;
  return /* @__PURE__ */ n(function(i, a) {
    if (i === "" && (o = a, r.forEach(({ target: c, container: u, replacement: l }) => {
      let p = gu(l) ? JSON.parse(l) : l.split(".");
      p.length === 0 ? u[c] = o : u[c] = mu(o, p);
    })), i === "_constructor-name_")
      return a;
    if (Cr(a) && a.__isConvertedError__) {
      let { message: c, ...u } = a.errorProperties, l = new Error(c);
      return Object.assign(l, u), l;
    }
    if (typeof a == "string" && a.startsWith("_regexp_") && t.allowRegExp) {
      let [, c, u] = a.match(/_regexp_([^|]*)\|(.*)/) || [];
      return new RegExp(u, c);
    }
    return typeof a == "string" && a.startsWith("_date_") && t.allowDate ? new Date(a.replace("_date_", "")) : typeof a == "string" && a.startsWith(
    "_duplicate_") ? (r.push({ target: i, container: this, replacement: a.replace(/^_duplicate_/, "") }), null) : typeof a == "string" && a.
    startsWith("_symbol_") && t.allowSymbol ? Symbol(a.replace("_symbol_", "")) : typeof a == "string" && a.startsWith("_gsymbol_") && t.allowSymbol ?
    Symbol.for(a.replace("_gsymbol_", "")) : typeof a == "string" && a === "_-Infinity_" ? Number.NEGATIVE_INFINITY : typeof a == "string" &&
    a === "_Infinity_" ? Number.POSITIVE_INFINITY : typeof a == "string" && a === "_NaN_" ? Number.NaN : typeof a == "string" && a.startsWith(
    "_bigint_") && typeof BigInt == "function" ? BigInt(a.replace("_bigint_", "")) : a;
  }, "revive");
}, "reviver2"), cn = {
  maxDepth: 10,
  space: void 0,
  allowRegExp: !0,
  allowDate: !0,
  allowError: !0,
  allowUndefined: !0,
  allowSymbol: !0
}, un = /* @__PURE__ */ n((e, t = {}) => {
  let r = { ...cn, ...t };
  return JSON.stringify(an(e), Su(r), t.space);
}, "stringify"), Pu = /* @__PURE__ */ n(() => {
  let e = /* @__PURE__ */ new Map();
  return /* @__PURE__ */ n(function t(r) {
    Cr(r) && Object.entries(r).forEach(([o, s]) => {
      s === "_undefined_" ? r[o] = void 0 : e.get(s) || (e.set(s, !0), t(s));
    }), Array.isArray(r) && r.forEach((o, s) => {
      o === "_undefined_" ? (e.set(o, !0), r[s] = void 0) : e.get(o) || (e.set(o, !0), t(o));
    });
  }, "mutateUndefined");
}, "mutator"), ln = /* @__PURE__ */ n((e, t = {}) => {
  let r = { ...cn, ...t }, o = JSON.parse(e, bu(r));
  return Pu()(o), o;
}, "parse");

// src/manager-api/lib/store-setup.ts
var pn = /* @__PURE__ */ n((e) => {
  e.fn("set", function(t, r) {
    return e.set(
      // @ts-expect-error('this' implicitly has type 'any')
      this._area,
      // @ts-expect-error('this' implicitly has type 'any')
      this._in(t),
      un(r, { maxDepth: 50 })
    );
  }), e.fn("get", function(t, r) {
    let o = e.get(this._area, this._in(t));
    return o !== null ? ln(o) : r || o;
  });
}, "default");

// src/manager-api/store.ts
pn(ye.default._);
var dn = "@storybook/manager/store";
function Nr(e) {
  return e.get(dn) || {};
}
n(Nr, "get");
function Au(e, t) {
  return e.set(dn, t);
}
n(Au, "set");
function Eu(e, t) {
  let r = Nr(e);
  return Au(e, { ...r, ...t });
}
n(Eu, "update");
var jr = class jr {
  constructor({ setState: t, getState: r }) {
    this.upstreamSetState = t, this.upstreamGetState = r;
  }
  // The assumption is that this will be called once, to initialize the React state
  // when the module is instantiated
  getInitialState(t) {
    return { ...t, ...Nr(ye.default.local), ...Nr(ye.default.session) };
  }
  getState() {
    return this.upstreamGetState();
  }
  async setState(t, r, o) {
    let s, i;
    typeof r == "function" ? (s = r, i = o) : i = r;
    let { persistence: a = "none" } = i || {}, c = {}, u = {};
    typeof t == "function" ? c = /* @__PURE__ */ n((p) => (u = t(p), u), "patch") : (c = t, u = c);
    let l = await new Promise((p) => {
      this.upstreamSetState(c, () => {
        p(this.getState());
      });
    });
    if (a !== "none") {
      let p = a === "session" ? ye.default.session : ye.default.local;
      await Eu(p, u);
    }
    return s && s(l), l;
  }
};
n(jr, "Store");
var Ne = jr;

// src/manager-api/lib/request-response.ts
var kr = class kr extends Error {
  constructor(r, o) {
    super(r);
    this.payload = void 0;
    this.payload = o;
  }
};
n(kr, "RequestResponseError");
var It = kr, jf = /* @__PURE__ */ n((e, t, r, o, s = 5e3) => {
  let i;
  return new Promise((a, c) => {
    let u = {
      id: Math.random().toString(16).slice(2),
      payload: o
    }, l = /* @__PURE__ */ n((p) => {
      p.id === u.id && (clearTimeout(i), e.off(r, l), p.success ? a(p.payload) : c(new It(p.error, p.payload)));
    }, "responseHandler");
    e.emit(t, u), e.on(r, l), i = setTimeout(() => {
      e.off(r, l), c(new It("Timed out waiting for response"));
    }, s);
  });
}, "experimental_requestResponse");

// src/manager-api/root.tsx
var { ActiveTabs: Vf } = dt;
var Tt = Zr({ api: void 0, state: lt({}) }), mo = /* @__PURE__ */ n((...e) => to({}, ...e), "combineParameters"), xt = class xt extends vu {
  constructor(r) {
    super(r);
    this.api = {};
    this.initModules = /* @__PURE__ */ n(() => {
      this.modules.forEach((r) => {
        "init" in r && r.init();
      });
    }, "initModules");
    let {
      location: o,
      path: s,
      refId: i,
      viewMode: a = r.docsOptions.docsMode ? "docs" : r.viewMode,
      singleStory: c,
      storyId: u,
      docsOptions: l,
      navigate: p
    } = r, d = new Ne({
      getState: /* @__PURE__ */ n(() => this.state, "getState"),
      setState: /* @__PURE__ */ n((S, P) => (this.setState(S, () => P(this.state)), this.state), "setState")
    }), f = { location: o, path: s, viewMode: a, singleStory: c, storyId: u, refId: i }, y = { docsOptions: l };
    this.state = d.getInitialState(lt({ ...f, ...y }));
    let m = {
      navigate: p,
      store: d,
      provider: r.provider
    };
    this.modules = [
      Qt,
      Gt,
      Wt,
      dt,
      Xt,
      Zt,
      ir,
      yr,
      Ht,
      qt,
      gr,
      br,
      Ar
    ].map(
      (S) => S.init({ ...f, ...y, ...m, state: this.state, fullAPI: this.api })
    );
    let h = lt(this.state, ...this.modules.map((S) => S.state)), g = Object.assign(this.api, { navigate: p }, ...this.modules.map((S) => S.api));
    this.state = h, this.api = g;
  }
  static getDerivedStateFromProps(r, o) {
    return o.path !== r.path ? {
      ...o,
      location: r.location,
      path: r.path,
      refId: r.refId,
      viewMode: r.viewMode,
      storyId: r.storyId
    } : null;
  }
  shouldComponentUpdate(r, o) {
    let s = this.props, i = this.state;
    return s.path !== r.path || !M(i, o);
  }
  render() {
    let { children: r } = this.props, o = {
      state: this.state,
      api: this.api
    };
    return /* @__PURE__ */ me.createElement(Ou, { effect: this.initModules }, /* @__PURE__ */ me.createElement(Tt.Provider, { value: o }, /* @__PURE__ */ me.
    createElement(Nu, null, r)));
  }
};
n(xt, "ManagerProvider"), xt.displayName = "Manager";
var mn = xt, Ou = /* @__PURE__ */ n(({ children: e, effect: t }) => (me.useEffect(t, []), e), "EffectOnMount"), Cu = /* @__PURE__ */ n((e) => e,
"defaultFilter");
function Nu({
  // @ts-expect-error (Converted from ts-ignore)
  filter: e = Cu,
  children: t
}) {
  let r = Mr(Tt), o = fn(t), s = fn(e);
  if (typeof o.current != "function")
    return /* @__PURE__ */ me.createElement(_u, null, o.current);
  let i = s.current(r), a = Dr(() => [...Object.entries(i).reduce((c, u) => c.concat(u), [])], [r.state]);
  return Dr(() => {
    let c = o.current;
    return /* @__PURE__ */ me.createElement(c, { ...i });
  }, a);
}
n(Nu, "ManagerConsumer");
function Kf() {
  let { state: e } = Mr(Tt);
  return e;
}
n(Kf, "useStorybookState");
function J() {
  let { api: e } = Mr(Tt);
  return e;
}
n(J, "useStorybookApi");
function gn(e, t) {
  return typeof e > "u" ? t : e;
}
n(gn, "orDefault");
var Sn = /* @__PURE__ */ n((e, t = []) => {
  let r = J();
  return hn(() => (Object.entries(e).forEach(([o, s]) => r.on(o, s)), () => {
    Object.entries(e).forEach(([o, s]) => r.off(o, s));
  }), t), r.emit;
}, "useChannel");
function zf(e) {
  return J().isPrepared(e);
}
n(zf, "useStoryPrepared");
function Hf(e, t) {
  let r = J(), [o, s] = Iu(r.getCurrentParameter(e)), i = ke(() => {
    let a = r.getCurrentParameter(e);
    s(a);
  }, [r, e]);
  return Sn(
    {
      [wu]: i,
      [xu]: i
    },
    [i]
  ), gn(o, t);
}
n(Hf, "useParameter");
globalThis.STORYBOOK_ADDON_STATE = {};
var { STORYBOOK_ADDON_STATE: z } = globalThis;
function ju(e, t) {
  let r = J(), o = r.getAddonState(e) || z[e], s = gn(
    o,
    z[e] ? z[e] : t
  ), i = !1;
  s === t && t !== void 0 && (z[e] = t, i = !0), hn(() => {
    i && r.setAddonState(e, t);
  }, [i]);
  let a = ke(
    async (p, d) => {
      await r.setAddonState(e, p, d);
      let f = r.getAddonState(e);
      return z[e] = f, f;
    },
    [r, e]
  ), c = Dr(() => {
    let p = {
      [`${yn}-client-${e}`]: a,
      [`${je}-client-${e}`]: a
    }, d = {
      [Tu]: async () => {
        let f = r.getAddonState(e);
        f ? (z[e] = f, r.emit(`${je}-manager-${e}`, f)) : z[e] ? (await a(z[e]), r.emit(`${je}-manager-${e}`, z[e])) : t !== void 0 && (await a(
        t), z[e] = t, r.emit(`${je}-manager-${e}`, t));
      },
      [Ru]: () => {
        let f = r.getAddonState(e);
        f !== void 0 && r.emit(`${je}-manager-${e}`, f);
      }
    };
    return {
      ...p,
      ...d
    };
  }, [e]), u = Sn(c), l = ke(
    async (p, d) => {
      await a(p, d);
      let f = r.getAddonState(e);
      u(`${yn}-manager-${e}`, f);
    },
    [r, u, a, e]
  );
  return [s, l];
}
n(ju, "useSharedState");
function qf(e, t) {
  return ju(e, t);
}
n(qf, "useAddonState");
function Yf() {
  let { getCurrentStoryData: e, updateStoryArgs: t, resetStoryArgs: r } = J(), o = e(), s = o?.type === "story" ? o.args : {}, i = o?.type ===
  "story" ? o.initialArgs : {}, a = ke(
    (u) => t(o, u),
    [o, t]
  ), c = ke(
    (u) => r(o, u),
    [o, r]
  );
  return [s, a, c, i];
}
n(Yf, "useArgs");
function Jf() {
  let e = J();
  return [e.getGlobals(), e.updateGlobals, e.getStoryGlobals(), e.getUserGlobals()];
}
n(Jf, "useGlobals");
function Xf() {
  return J().getGlobalTypes();
}
n(Xf, "useGlobalTypes");
function ku() {
  let { getCurrentStoryData: e } = J();
  return e();
}
n(ku, "useCurrentStory");
function Qf() {
  let e = ku();
  return e?.type === "story" && e.argTypes || {};
}
n(Qf, "useArgTypes");
var Zf = oo;

// src/shared/universal-store/mock.ts
import { Channel as Du } from "storybook/internal/channels";
var Rt = class Rt extends G {
  constructor(t, r) {
    G.isInternalConstructing = !0, super(
      { ...t, leader: !0 },
      { channel: new Du({}), environment: G.Environment.MOCK }
    ), G.isInternalConstructing = !1, typeof r?.fn == "function" && (this.testUtils = r, this.getState = r.fn(this.getState), this.setState =
    r.fn(this.setState), this.subscribe = r.fn(this.subscribe), this.onStateChange = r.fn(this.onStateChange), this.send = r.fn(this.send));
  }
  /** Create a mock universal store. This is just an alias for the constructor */
  static create(t, r) {
    return new Rt(t, r);
  }
  unsubscribeAll() {
    if (!this.testUtils)
      throw new Error(
        io`Cannot call unsubscribeAll on a store that does not have testUtils.
        Please provide testUtils as the second argument when creating the store.`
      );
    let t = /* @__PURE__ */ n((r) => {
      try {
        r.value();
      } catch {
      }
    }, "callReturnedUnsubscribeFn");
    this.subscribe.mock?.results.forEach(t), this.onStateChange.mock?.results.forEach(t);
  }
};
n(Rt, "MockUniversalStore");
var Ur = Rt;

// src/shared/test-provider-store/index.ts
var bn = {
  id: "storybook/test-provider",
  leader: !0,
  initialState: {}
};
function Pn({
  universalTestProviderStore: e,
  useUniversalStore: t
}) {
  let r = {
    settingsChanged: /* @__PURE__ */ n(() => {
      e.untilReady().then(() => {
        e.send({ type: "settings-changed" });
      });
    }, "settingsChanged"),
    onRunAll: /* @__PURE__ */ n((i) => e.subscribe("run-all", i), "onRunAll"),
    onClearAll: /* @__PURE__ */ n((i) => e.subscribe("clear-all", i), "onClearAll")
  }, o = {
    ...r,
    getFullState: e.getState,
    setFullState: e.setState,
    onSettingsChanged: /* @__PURE__ */ n((i) => e.subscribe("settings-changed", i), "onSettingsChanged"),
    runAll: /* @__PURE__ */ n(async () => {
      await e.untilReady(), e.send({ type: "run-all" });
    }, "runAll"),
    clearAll: /* @__PURE__ */ n(async () => {
      await e.untilReady(), e.send({ type: "clear-all" });
    }, "clearAll")
  }, s = /* @__PURE__ */ n((i) => {
    let a = /* @__PURE__ */ n(() => e.getState()[i] ?? "test-provider-state:pending", "getStateForTestProvider"), c = /* @__PURE__ */ n((u) => {
      e.untilReady().then(() => {
        e.setState((l) => ({
          ...l,
          [i]: u
        }));
      });
    }, "setStateForTestProvider");
    return {
      ...r,
      testProviderId: i,
      getState: a,
      setState: c,
      runWithState: /* @__PURE__ */ n(async (u) => {
        c("test-provider-state:running");
        try {
          await u(), c("test-provider-state:succeeded");
        } catch {
          c("test-provider-state:crashed");
        }
      }, "runWithState")
    };
  }, "getTestProviderStoreById");
  return t ? {
    getTestProviderStoreById: s,
    fullTestProviderStore: o,
    universalTestProviderStore: e,
    useTestProviderStore: /* @__PURE__ */ n((i) => t(e, i)[0], "useTestProviderStore")
  } : {
    getTestProviderStoreById: s,
    fullTestProviderStore: o,
    universalTestProviderStore: e
  };
}
n(Pn, "createTestProviderStore");

// src/manager-api/stores/test-provider.ts
var Mu = Pn({
  universalTestProviderStore: G.create({
    ...bn,
    leader: globalThis.CONFIG_TYPE === "PRODUCTION"
  }),
  useUniversalStore: we
}), {
  fullTestProviderStore: Uu,
  getTestProviderStoreById: Lu,
  useTestProviderStore: Fu,
  universalTestProviderStore: Wu
} = Mu;
export {
  Vf as ActiveTabs,
  Nu as Consumer,
  Tt as ManagerContext,
  mn as Provider,
  It as RequestResponseError,
  Bn as addons,
  mo as combineParameters,
  ud as controlOrMetaKey,
  cd as controlOrMetaSymbol,
  pd as eventMatchesShortcut,
  rr as eventToShortcut,
  Ur as experimental_MockUniversalStore,
  G as experimental_UniversalStore,
  xs as experimental_getStatusStore,
  Lu as experimental_getTestProviderStore,
  jf as experimental_requestResponse,
  Ts as experimental_useStatusStore,
  Fu as experimental_useTestProviderStore,
  we as experimental_useUniversalStore,
  gt as internal_fullStatusStore,
  Uu as internal_fullTestProviderStore,
  Rs as internal_universalStatusStore,
  Wu as internal_universalTestProviderStore,
  tr as isMacLike,
  ld as isShortcutTaken,
  hs as keyToSymbol,
  K as merge,
  kt as mockChannel,
  ms as optionOrAltSymbol,
  or as shortcutMatchesShortcut,
  dd as shortcutToHumanString,
  Zf as types,
  qf as useAddonState,
  Qf as useArgTypes,
  Yf as useArgs,
  Sn as useChannel,
  Xf as useGlobalTypes,
  Jf as useGlobals,
  Hf as useParameter,
  ju as useSharedState,
  zf as useStoryPrepared,
  J as useStorybookApi,
  Kf as useStorybookState
};
