"use strict";
var Gt = Object.create;
var M = Object.defineProperty;
var Vt = Object.getOwnPropertyDescriptor;
var Xt = Object.getOwnPropertyNames;
var Kt = Object.getPrototypeOf, Zt = Object.prototype.hasOwnProperty;
var o = (e, i) => M(e, "name", { value: i, configurable: !0 });
var G = (e, i) => () => (e && (i = e(e = 0)), i);
var z = (e, i) => () => (i || e((i = { exports: {} }).exports, i), i.exports), q = (e, i) => {
  for (var t in i)
    M(e, t, { get: i[t], enumerable: !0 });
}, _e = (e, i, t, r) => {
  if (i && typeof i == "object" || typeof i == "function")
    for (let a of Xt(i))
      !Zt.call(e, a) && a !== t && M(e, a, { get: () => i[a], enumerable: !(r = Vt(i, a)) || r.enumerable });
  return e;
};
var F = (e, i, t) => (t = e != null ? Gt(Kt(e)) : {}, _e(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  i || !e || !e.__esModule ? M(t, "default", { value: e, enumerable: !0 }) : t,
  e
)), $ = (e) => _e(M({}, "__esModule", { value: !0 }), e);

// ../node_modules/tslib/tslib.es6.mjs
var Ye = {};
q(Ye, {
  __addDisposableResource: () => Xe,
  __assign: () => V,
  __asyncDelegator: () => $e,
  __asyncGenerator: () => qe,
  __asyncValues: () => We,
  __await: () => C,
  __awaiter: () => Ae,
  __classPrivateFieldGet: () => Ue,
  __classPrivateFieldIn: () => Ve,
  __classPrivateFieldSet: () => Ge,
  __createBinding: () => K,
  __decorate: () => Pe,
  __disposeResources: () => Ke,
  __esDecorate: () => Re,
  __exportStar: () => De,
  __extends: () => Ee,
  __generator: () => Ne,
  __importDefault: () => Je,
  __importStar: () => He,
  __makeTemplateObject: () => Be,
  __metadata: () => Ce,
  __param: () => Te,
  __propKey: () => ke,
  __read: () => ce,
  __rest: () => Se,
  __rewriteRelativeImportExtension: () => Ze,
  __runInitializers: () => Fe,
  __setFunctionName: () => Le,
  __spread: () => Ie,
  __spreadArray: () => ze,
  __spreadArrays: () => Me,
  __values: () => X,
  default: () => ii
});
function Ee(e, i) {
  if (typeof i != "function" && i !== null)
    throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
  se(e, i);
  function t() {
    this.constructor = e;
  }
  o(t, "__"), e.prototype = i === null ? Object.create(i) : (t.prototype = i.prototype, new t());
}
function Se(e, i) {
  var t = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && i.indexOf(r) < 0 && (t[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, r = Object.getOwnPropertySymbols(e); a < r.length; a++)
      i.indexOf(r[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[a]) && (t[r[a]] = e[r[a]]);
  return t;
}
function Pe(e, i, t, r) {
  var a = arguments.length, n = a < 3 ? i : r === null ? r = Object.getOwnPropertyDescriptor(i, t) : r, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(e, i, t, r);
  else for (var l = e.length - 1; l >= 0; l--) (s = e[l]) && (n = (a < 3 ? s(n) : a > 3 ? s(i, t, n) : s(i, t)) || n);
  return a > 3 && n && Object.defineProperty(i, t, n), n;
}
function Te(e, i) {
  return function(t, r) {
    i(t, r, e);
  };
}
function Re(e, i, t, r, a, n) {
  function s(v) {
    if (v !== void 0 && typeof v != "function") throw new TypeError("Function expected");
    return v;
  }
  o(s, "accept");
  for (var l = r.kind, p = l === "getter" ? "get" : l === "setter" ? "set" : "value", c = !i && e ? r.static ? e : e.prototype : null, u = i ||
  (c ? Object.getOwnPropertyDescriptor(c, r.name) : {}), d, x = !1, g = t.length - 1; g >= 0; g--) {
    var m = {};
    for (var f in r) m[f] = f === "access" ? {} : r[f];
    for (var f in r.access) m.access[f] = r.access[f];
    m.addInitializer = function(v) {
      if (x) throw new TypeError("Cannot add initializers after decoration has completed");
      n.push(s(v || null));
    };
    var y = (0, t[g])(l === "accessor" ? { get: u.get, set: u.set } : u[p], m);
    if (l === "accessor") {
      if (y === void 0) continue;
      if (y === null || typeof y != "object") throw new TypeError("Object expected");
      (d = s(y.get)) && (u.get = d), (d = s(y.set)) && (u.set = d), (d = s(y.init)) && a.unshift(d);
    } else (d = s(y)) && (l === "field" ? a.unshift(d) : u[p] = d);
  }
  c && Object.defineProperty(c, r.name, u), x = !0;
}
function Fe(e, i, t) {
  for (var r = arguments.length > 2, a = 0; a < i.length; a++)
    t = r ? i[a].call(e, t) : i[a].call(e);
  return r ? t : void 0;
}
function ke(e) {
  return typeof e == "symbol" ? e : "".concat(e);
}
function Le(e, i, t) {
  return typeof i == "symbol" && (i = i.description ? "[".concat(i.description, "]") : ""), Object.defineProperty(e, "name", { configurable: !0,
  value: t ? "".concat(t, " ", i) : i });
}
function Ce(e, i) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function") return Reflect.metadata(e, i);
}
function Ae(e, i, t, r) {
  function a(n) {
    return n instanceof t ? n : new t(function(s) {
      s(n);
    });
  }
  return o(a, "adopt"), new (t || (t = Promise))(function(n, s) {
    function l(u) {
      try {
        c(r.next(u));
      } catch (d) {
        s(d);
      }
    }
    o(l, "fulfilled");
    function p(u) {
      try {
        c(r.throw(u));
      } catch (d) {
        s(d);
      }
    }
    o(p, "rejected");
    function c(u) {
      u.done ? n(u.value) : a(u.value).then(l, p);
    }
    o(c, "step"), c((r = r.apply(e, i || [])).next());
  });
}
function Ne(e, i) {
  var t = { label: 0, sent: /* @__PURE__ */ o(function() {
    if (n[0] & 1) throw n[1];
    return n[1];
  }, "sent"), trys: [], ops: [] }, r, a, n, s = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return s.next = l(0), s.throw = l(1), s.return = l(2), typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function l(c) {
    return function(u) {
      return p([c, u]);
    };
  }
  function p(c) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; s && (s = 0, c[0] && (t = 0)), t; ) try {
      if (r = 1, a && (n = c[0] & 2 ? a.return : c[0] ? a.throw || ((n = a.return) && n.call(a), 0) : a.next) && !(n = n.call(a, c[1])).done)
       return n;
      switch (a = 0, n && (c = [c[0] & 2, n.value]), c[0]) {
        case 0:
        case 1:
          n = c;
          break;
        case 4:
          return t.label++, { value: c[1], done: !1 };
        case 5:
          t.label++, a = c[1], c = [0];
          continue;
        case 7:
          c = t.ops.pop(), t.trys.pop();
          continue;
        default:
          if (n = t.trys, !(n = n.length > 0 && n[n.length - 1]) && (c[0] === 6 || c[0] === 2)) {
            t = 0;
            continue;
          }
          if (c[0] === 3 && (!n || c[1] > n[0] && c[1] < n[3])) {
            t.label = c[1];
            break;
          }
          if (c[0] === 6 && t.label < n[1]) {
            t.label = n[1], n = c;
            break;
          }
          if (n && t.label < n[2]) {
            t.label = n[2], t.ops.push(c);
            break;
          }
          n[2] && t.ops.pop(), t.trys.pop();
          continue;
      }
      c = i.call(e, t);
    } catch (u) {
      c = [6, u], a = 0;
    } finally {
      r = n = 0;
    }
    if (c[0] & 5) throw c[1];
    return { value: c[0] ? c[1] : void 0, done: !0 };
  }
}
function De(e, i) {
  for (var t in e) t !== "default" && !Object.prototype.hasOwnProperty.call(i, t) && K(i, e, t);
}
function X(e) {
  var i = typeof Symbol == "function" && Symbol.iterator, t = i && e[i], r = 0;
  if (t) return t.call(e);
  if (e && typeof e.length == "number") return {
    next: /* @__PURE__ */ o(function() {
      return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
    }, "next")
  };
  throw new TypeError(i ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function ce(e, i) {
  var t = typeof Symbol == "function" && e[Symbol.iterator];
  if (!t) return e;
  var r = t.call(e), a, n = [], s;
  try {
    for (; (i === void 0 || i-- > 0) && !(a = r.next()).done; ) n.push(a.value);
  } catch (l) {
    s = { error: l };
  } finally {
    try {
      a && !a.done && (t = r.return) && t.call(r);
    } finally {
      if (s) throw s.error;
    }
  }
  return n;
}
function Ie() {
  for (var e = [], i = 0; i < arguments.length; i++)
    e = e.concat(ce(arguments[i]));
  return e;
}
function Me() {
  for (var e = 0, i = 0, t = arguments.length; i < t; i++) e += arguments[i].length;
  for (var r = Array(e), a = 0, i = 0; i < t; i++)
    for (var n = arguments[i], s = 0, l = n.length; s < l; s++, a++)
      r[a] = n[s];
  return r;
}
function ze(e, i, t) {
  if (t || arguments.length === 2) for (var r = 0, a = i.length, n; r < a; r++)
    (n || !(r in i)) && (n || (n = Array.prototype.slice.call(i, 0, r)), n[r] = i[r]);
  return e.concat(n || Array.prototype.slice.call(i));
}
function C(e) {
  return this instanceof C ? (this.v = e, this) : new C(e);
}
function qe(e, i, t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = t.apply(e, i || []), a, n = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), l("next"), l("throw"), l("return", s), a[Symbol.
  asyncIterator] = function() {
    return this;
  }, a;
  function s(g) {
    return function(m) {
      return Promise.resolve(m).then(g, d);
    };
  }
  function l(g, m) {
    r[g] && (a[g] = function(f) {
      return new Promise(function(y, v) {
        n.push([g, f, y, v]) > 1 || p(g, f);
      });
    }, m && (a[g] = m(a[g])));
  }
  function p(g, m) {
    try {
      c(r[g](m));
    } catch (f) {
      x(n[0][3], f);
    }
  }
  function c(g) {
    g.value instanceof C ? Promise.resolve(g.value.v).then(u, d) : x(n[0][2], g);
  }
  function u(g) {
    p("next", g);
  }
  function d(g) {
    p("throw", g);
  }
  function x(g, m) {
    g(m), n.shift(), n.length && p(n[0][0], n[0][1]);
  }
}
function $e(e) {
  var i, t;
  return i = {}, r("next"), r("throw", function(a) {
    throw a;
  }), r("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function r(a, n) {
    i[a] = e[a] ? function(s) {
      return (t = !t) ? { value: C(e[a](s)), done: !1 } : n ? n(s) : s;
    } : n;
  }
}
function We(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var i = e[Symbol.asyncIterator], t;
  return i ? i.call(e) : (e = typeof X == "function" ? X(e) : e[Symbol.iterator](), t = {}, r("next"), r("throw"), r("return"), t[Symbol.asyncIterator] =
  function() {
    return this;
  }, t);
  function r(n) {
    t[n] = e[n] && function(s) {
      return new Promise(function(l, p) {
        s = e[n](s), a(l, p, s.done, s.value);
      });
    };
  }
  function a(n, s, l, p) {
    Promise.resolve(p).then(function(c) {
      n({ value: c, done: l });
    }, s);
  }
}
function Be(e, i) {
  return Object.defineProperty ? Object.defineProperty(e, "raw", { value: i }) : e.raw = i, e;
}
function He(e) {
  if (e && e.__esModule) return e;
  var i = {};
  if (e != null) for (var t = le(e), r = 0; r < t.length; r++) t[r] !== "default" && K(i, e, t[r]);
  return ei(i, e), i;
}
function Je(e) {
  return e && e.__esModule ? e : { default: e };
}
function Ue(e, i, t, r) {
  if (t === "a" && !r) throw new TypeError("Private accessor was defined without a getter");
  if (typeof i == "function" ? e !== i || !r : !i.has(e)) throw new TypeError("Cannot read private member from an object whose class did not\
 declare it");
  return t === "m" ? r : t === "a" ? r.call(e) : r ? r.value : i.get(e);
}
function Ge(e, i, t, r, a) {
  if (r === "m") throw new TypeError("Private method is not writable");
  if (r === "a" && !a) throw new TypeError("Private accessor was defined without a setter");
  if (typeof i == "function" ? e !== i || !a : !i.has(e)) throw new TypeError("Cannot write private member to an object whose class did not \
declare it");
  return r === "a" ? a.call(e, t) : a ? a.value = t : i.set(e, t), t;
}
function Ve(e, i) {
  if (i === null || typeof i != "object" && typeof i != "function") throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof e == "function" ? i === e : e.has(i);
}
function Xe(e, i, t) {
  if (i != null) {
    if (typeof i != "object" && typeof i != "function") throw new TypeError("Object expected.");
    var r, a;
    if (t) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      r = i[Symbol.asyncDispose];
    }
    if (r === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      r = i[Symbol.dispose], t && (a = r);
    }
    if (typeof r != "function") throw new TypeError("Object not disposable.");
    a && (r = /* @__PURE__ */ o(function() {
      try {
        a.call(this);
      } catch (n) {
        return Promise.reject(n);
      }
    }, "dispose")), e.stack.push({ value: i, dispose: r, async: t });
  } else t && e.stack.push({ async: !0 });
  return i;
}
function Ke(e) {
  function i(n) {
    e.error = e.hasError ? new ti(n, e.error, "An error was suppressed during disposal.") : n, e.hasError = !0;
  }
  o(i, "fail");
  var t, r = 0;
  function a() {
    for (; t = e.stack.pop(); )
      try {
        if (!t.async && r === 1) return r = 0, e.stack.push(t), Promise.resolve().then(a);
        if (t.dispose) {
          var n = t.dispose.call(t.value);
          if (t.async) return r |= 2, Promise.resolve(n).then(a, function(s) {
            return i(s), a();
          });
        } else r |= 1;
      } catch (s) {
        i(s);
      }
    if (r === 1) return e.hasError ? Promise.reject(e.error) : Promise.resolve();
    if (e.hasError) throw e.error;
  }
  return o(a, "next"), a();
}
function Ze(e, i) {
  return typeof e == "string" && /^\.\.?\//.test(e) ? e.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(t, r, a, n, s) {
    return r ? i ? ".jsx" : ".js" : a && (!n || !s) ? t : a + n + "." + s.toLowerCase() + "js";
  }) : e;
}
var se, V, K, ei, le, ti, ii, Qe = G(() => {
  se = /* @__PURE__ */ o(function(e, i) {
    return se = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
      t.__proto__ = r;
    } || function(t, r) {
      for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }, se(e, i);
  }, "extendStatics");
  o(Ee, "__extends");
  V = /* @__PURE__ */ o(function() {
    return V = Object.assign || /* @__PURE__ */ o(function(i) {
      for (var t, r = 1, a = arguments.length; r < a; r++) {
        t = arguments[r];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
      }
      return i;
    }, "__assign"), V.apply(this, arguments);
  }, "__assign");
  o(Se, "__rest");
  o(Pe, "__decorate");
  o(Te, "__param");
  o(Re, "__esDecorate");
  o(Fe, "__runInitializers");
  o(ke, "__propKey");
  o(Le, "__setFunctionName");
  o(Ce, "__metadata");
  o(Ae, "__awaiter");
  o(Ne, "__generator");
  K = Object.create ? function(e, i, t, r) {
    r === void 0 && (r = t);
    var a = Object.getOwnPropertyDescriptor(i, t);
    (!a || ("get" in a ? !i.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: /* @__PURE__ */ o(function() {
      return i[t];
    }, "get") }), Object.defineProperty(e, r, a);
  } : function(e, i, t, r) {
    r === void 0 && (r = t), e[r] = i[t];
  };
  o(De, "__exportStar");
  o(X, "__values");
  o(ce, "__read");
  o(Ie, "__spread");
  o(Me, "__spreadArrays");
  o(ze, "__spreadArray");
  o(C, "__await");
  o(qe, "__asyncGenerator");
  o($e, "__asyncDelegator");
  o(We, "__asyncValues");
  o(Be, "__makeTemplateObject");
  ei = Object.create ? function(e, i) {
    Object.defineProperty(e, "default", { enumerable: !0, value: i });
  } : function(e, i) {
    e.default = i;
  }, le = /* @__PURE__ */ o(function(e) {
    return le = Object.getOwnPropertyNames || function(i) {
      var t = [];
      for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[t.length] = r);
      return t;
    }, le(e);
  }, "ownKeys");
  o(He, "__importStar");
  o(Je, "__importDefault");
  o(Ue, "__classPrivateFieldGet");
  o(Ge, "__classPrivateFieldSet");
  o(Ve, "__classPrivateFieldIn");
  o(Xe, "__addDisposableResource");
  ti = typeof SuppressedError == "function" ? SuppressedError : function(e, i, t) {
    var r = new Error(t);
    return r.name = "SuppressedError", r.error = e, r.suppressed = i, r;
  };
  o(Ke, "__disposeResources");
  o(Ze, "__rewriteRelativeImportExtension");
  ii = {
    __extends: Ee,
    __assign: V,
    __rest: Se,
    __decorate: Pe,
    __param: Te,
    __esDecorate: Re,
    __runInitializers: Fe,
    __propKey: ke,
    __setFunctionName: Le,
    __metadata: Ce,
    __awaiter: Ae,
    __generator: Ne,
    __createBinding: K,
    __exportStar: De,
    __values: X,
    __read: ce,
    __spread: Ie,
    __spreadArrays: Me,
    __spreadArray: ze,
    __await: C,
    __asyncGenerator: qe,
    __asyncDelegator: $e,
    __asyncValues: We,
    __makeTemplateObject: Be,
    __importStar: He,
    __importDefault: Je,
    __classPrivateFieldGet: Ue,
    __classPrivateFieldSet: Ge,
    __classPrivateFieldIn: Ve,
    __addDisposableResource: Xe,
    __disposeResources: Ke,
    __rewriteRelativeImportExtension: Ze
  };
});

// ../node_modules/@yarnpkg/esbuild-plugin-pnp/lib/index.js
var tt = z((Z) => {
  "use strict";
  Object.defineProperty(Z, "__esModule", { value: !0 });
  Z.pnpPlugin = void 0;
  var et = (Qe(), $(Ye)), ri = et.__importStar(require("fs")), ai = et.__importDefault(require("path")), ni = /()/, oi = [".tsx", ".ts", ".j\
sx", ".mjs", ".cjs", ".js", ".css", ".json"];
  function si(e) {
    return e.map((i) => {
      let t = i.indexOf("*");
      return t !== -1 ? { prefix: i.slice(0, t), suffix: i.slice(t + 1) } : i;
    });
  }
  o(si, "parseExternals");
  function li(e, i) {
    for (let t of i)
      if (typeof t == "object") {
        if (e.length >= t.prefix.length + t.suffix.length && e.startsWith(t.prefix) && e.endsWith(t.suffix))
          return !0;
      } else if (e === t || !t.startsWith("/") && !t.startsWith("./") && !t.startsWith("../") && t !== "." && t !== ".." && e.startsWith(`${t}\
/`))
        return !0;
    return !1;
  }
  o(li, "isExternal");
  async function ci(e) {
    return {
      contents: await ri.promises.readFile(e.path),
      loader: "default",
      // For regular imports in the `file` namespace, resolveDir is the directory the
      // file being resolved lives in. For all other virtual modules, this defaults to
      // empty string: ""
      // A sensible value for pnp imports is the same as the `file` namespace, as pnp
      // still resolves to files on disk (in the cache).
      resolveDir: ai.default.dirname(e.path)
    };
  }
  o(ci, "defaultOnLoad");
  async function pi(e, { resolvedPath: i, error: t, watchFiles: r }) {
    let a = t ? [{ text: t.message }] : [], n;
    switch (e.kind) {
      case "require-call":
      case "require-resolve":
      case "dynamic-import":
        n = { warnings: a };
        break;
      default:
        n = { errors: a };
        break;
    }
    return i !== null ? { namespace: "pnp", path: i, watchFiles: r } : { external: !0, ...n, watchFiles: r };
  }
  o(pi, "defaultOnResolve");
  function mi({ baseDir: e = process.cwd(), extensions: i = oi, filter: t = ni, onResolve: r = pi, onLoad: a = ci } = {}) {
    return {
      name: "@yarnpkg/esbuild-plugin-pnp",
      setup(n) {
        var s, l;
        let { findPnpApi: p } = require("module");
        if (typeof p > "u")
          return;
        let c = si((s = n.initialOptions.external) !== null && s !== void 0 ? s : []), u = (l = n.initialOptions.platform) !== null && l !==
        void 0 ? l : "browser", d = u === "node", x = new Set(n.initialOptions.conditions);
        x.add("default"), (u === "browser" || u === "node") && x.add(u);
        let g = new Set(x);
        g.add("import");
        let m = new Set(x);
        m.add("require"), n.onResolve({ filter: t }, (f) => {
          var y, v;
          if (li(f.path, c))
            return { external: !0 };
          let _ = x;
          f.kind === "dynamic-import" || f.kind === "import-statement" ? _ = g : (f.kind === "require-call" || f.kind === "require-resolve") &&
          (_ = m);
          let O = f.resolveDir ? `${f.resolveDir}/` : f.importer ? f.importer : `${e}/`, w = p(O);
          if (!w)
            return;
          let E = null, S;
          try {
            E = w.resolveRequest(f.path, O, {
              conditions: _,
              considerBuiltins: d,
              extensions: i
            });
          } catch (U) {
            S = U;
          }
          let k = [w.resolveRequest("pnpapi", null)];
          if (E) {
            let U = w.findPackageLocator(E);
            if (U) {
              let re = w.getPackageInformation(U);
              re?.linkType === "SOFT" && k.push((v = (y = w.resolveVirtual) === null || y === void 0 ? void 0 : y.call(w, E)) !== null && v !==
              void 0 ? v : E);
            }
          }
          return r(f, { resolvedPath: E, error: S, watchFiles: k });
        }), n.onLoad !== null && n.onLoad({ filter: t }, a);
      }
    };
  }
  o(mi, "pnpPlugin");
  Z.pnpPlugin = mi;
});

// ../node_modules/totalist/sync/index.mjs
var rt = {};
q(rt, {
  totalist: () => it
});
function it(e, i, t = "") {
  e = (0, A.resolve)(".", e);
  let r = (0, Y.readdirSync)(e), a = 0, n, s;
  for (; a < r.length; a++)
    n = (0, A.join)(e, r[a]), s = (0, Y.statSync)(n), s.isDirectory() ? it(n, i, (0, A.join)(t, r[a])) : i((0, A.join)(t, r[a]), n, s);
}
var A, Y, at = G(() => {
  A = require("path"), Y = require("fs");
  o(it, "totalist");
});

// ../node_modules/@polka/url/build.mjs
var ot = {};
q(ot, {
  parse: () => ui
});
function ui(e) {
  let i = e.url;
  if (i == null) return;
  let t = e._parsedUrl;
  if (t && t.raw === i) return t;
  let r = i, a = "", n, s;
  if (i.length > 1) {
    let l = i.indexOf("#", 1);
    l !== -1 && (s = i.substring(l), r = i.substring(0, l)), l = r.indexOf("?", 1), l !== -1 && (a = r.substring(l), r = r.substring(0, l), a.
    length > 1 && (n = nt.parse(a.substring(1))));
  }
  return e._parsedUrl = { pathname: r, search: a, query: n, hash: s, raw: i };
}
var nt, st = G(() => {
  nt = F(require("node:querystring"), 1);
  o(ui, "parse");
});

// ../node_modules/mrmime/index.mjs
var ct = {};
q(ct, {
  lookup: () => fi,
  mimes: () => lt
});
function fi(e) {
  let i = ("" + e).trim().toLowerCase(), t = i.lastIndexOf(".");
  return lt[~t ? i.substring(++t) : i];
}
var lt, pt = G(() => {
  lt = {
    "3g2": "video/3gpp2",
    "3gp": "video/3gpp",
    "3gpp": "video/3gpp",
    "3mf": "model/3mf",
    aac: "audio/aac",
    ac: "application/pkix-attr-cert",
    adp: "audio/adpcm",
    adts: "audio/aac",
    ai: "application/postscript",
    aml: "application/automationml-aml+xml",
    amlx: "application/automationml-amlx+zip",
    amr: "audio/amr",
    apng: "image/apng",
    appcache: "text/cache-manifest",
    appinstaller: "application/appinstaller",
    appx: "application/appx",
    appxbundle: "application/appxbundle",
    asc: "application/pgp-keys",
    atom: "application/atom+xml",
    atomcat: "application/atomcat+xml",
    atomdeleted: "application/atomdeleted+xml",
    atomsvc: "application/atomsvc+xml",
    au: "audio/basic",
    avci: "image/avci",
    avcs: "image/avcs",
    avif: "image/avif",
    aw: "application/applixware",
    bdoc: "application/bdoc",
    bin: "application/octet-stream",
    bmp: "image/bmp",
    bpk: "application/octet-stream",
    btf: "image/prs.btif",
    btif: "image/prs.btif",
    buffer: "application/octet-stream",
    ccxml: "application/ccxml+xml",
    cdfx: "application/cdfx+xml",
    cdmia: "application/cdmi-capability",
    cdmic: "application/cdmi-container",
    cdmid: "application/cdmi-domain",
    cdmio: "application/cdmi-object",
    cdmiq: "application/cdmi-queue",
    cer: "application/pkix-cert",
    cgm: "image/cgm",
    cjs: "application/node",
    class: "application/java-vm",
    coffee: "text/coffeescript",
    conf: "text/plain",
    cpl: "application/cpl+xml",
    cpt: "application/mac-compactpro",
    crl: "application/pkix-crl",
    css: "text/css",
    csv: "text/csv",
    cu: "application/cu-seeme",
    cwl: "application/cwl",
    cww: "application/prs.cww",
    davmount: "application/davmount+xml",
    dbk: "application/docbook+xml",
    deb: "application/octet-stream",
    def: "text/plain",
    deploy: "application/octet-stream",
    dib: "image/bmp",
    "disposition-notification": "message/disposition-notification",
    dist: "application/octet-stream",
    distz: "application/octet-stream",
    dll: "application/octet-stream",
    dmg: "application/octet-stream",
    dms: "application/octet-stream",
    doc: "application/msword",
    dot: "application/msword",
    dpx: "image/dpx",
    drle: "image/dicom-rle",
    dsc: "text/prs.lines.tag",
    dssc: "application/dssc+der",
    dtd: "application/xml-dtd",
    dump: "application/octet-stream",
    dwd: "application/atsc-dwd+xml",
    ear: "application/java-archive",
    ecma: "application/ecmascript",
    elc: "application/octet-stream",
    emf: "image/emf",
    eml: "message/rfc822",
    emma: "application/emma+xml",
    emotionml: "application/emotionml+xml",
    eps: "application/postscript",
    epub: "application/epub+zip",
    exe: "application/octet-stream",
    exi: "application/exi",
    exp: "application/express",
    exr: "image/aces",
    ez: "application/andrew-inset",
    fdf: "application/fdf",
    fdt: "application/fdt+xml",
    fits: "image/fits",
    g3: "image/g3fax",
    gbr: "application/rpki-ghostbusters",
    geojson: "application/geo+json",
    gif: "image/gif",
    glb: "model/gltf-binary",
    gltf: "model/gltf+json",
    gml: "application/gml+xml",
    gpx: "application/gpx+xml",
    gram: "application/srgs",
    grxml: "application/srgs+xml",
    gxf: "application/gxf",
    gz: "application/gzip",
    h261: "video/h261",
    h263: "video/h263",
    h264: "video/h264",
    heic: "image/heic",
    heics: "image/heic-sequence",
    heif: "image/heif",
    heifs: "image/heif-sequence",
    hej2: "image/hej2k",
    held: "application/atsc-held+xml",
    hjson: "application/hjson",
    hlp: "application/winhlp",
    hqx: "application/mac-binhex40",
    hsj2: "image/hsj2",
    htm: "text/html",
    html: "text/html",
    ics: "text/calendar",
    ief: "image/ief",
    ifb: "text/calendar",
    iges: "model/iges",
    igs: "model/iges",
    img: "application/octet-stream",
    in: "text/plain",
    ini: "text/plain",
    ink: "application/inkml+xml",
    inkml: "application/inkml+xml",
    ipfix: "application/ipfix",
    iso: "application/octet-stream",
    its: "application/its+xml",
    jade: "text/jade",
    jar: "application/java-archive",
    jhc: "image/jphc",
    jls: "image/jls",
    jp2: "image/jp2",
    jpe: "image/jpeg",
    jpeg: "image/jpeg",
    jpf: "image/jpx",
    jpg: "image/jpeg",
    jpg2: "image/jp2",
    jpgm: "image/jpm",
    jpgv: "video/jpeg",
    jph: "image/jph",
    jpm: "image/jpm",
    jpx: "image/jpx",
    js: "text/javascript",
    json: "application/json",
    json5: "application/json5",
    jsonld: "application/ld+json",
    jsonml: "application/jsonml+json",
    jsx: "text/jsx",
    jt: "model/jt",
    jxl: "image/jxl",
    jxr: "image/jxr",
    jxra: "image/jxra",
    jxrs: "image/jxrs",
    jxs: "image/jxs",
    jxsc: "image/jxsc",
    jxsi: "image/jxsi",
    jxss: "image/jxss",
    kar: "audio/midi",
    ktx: "image/ktx",
    ktx2: "image/ktx2",
    less: "text/less",
    lgr: "application/lgr+xml",
    list: "text/plain",
    litcoffee: "text/coffeescript",
    log: "text/plain",
    lostxml: "application/lost+xml",
    lrf: "application/octet-stream",
    m1v: "video/mpeg",
    m21: "application/mp21",
    m2a: "audio/mpeg",
    m2t: "video/mp2t",
    m2ts: "video/mp2t",
    m2v: "video/mpeg",
    m3a: "audio/mpeg",
    m4a: "audio/mp4",
    m4p: "application/mp4",
    m4s: "video/iso.segment",
    ma: "application/mathematica",
    mads: "application/mads+xml",
    maei: "application/mmt-aei+xml",
    man: "text/troff",
    manifest: "text/cache-manifest",
    map: "application/json",
    mar: "application/octet-stream",
    markdown: "text/markdown",
    mathml: "application/mathml+xml",
    mb: "application/mathematica",
    mbox: "application/mbox",
    md: "text/markdown",
    mdx: "text/mdx",
    me: "text/troff",
    mesh: "model/mesh",
    meta4: "application/metalink4+xml",
    metalink: "application/metalink+xml",
    mets: "application/mets+xml",
    mft: "application/rpki-manifest",
    mid: "audio/midi",
    midi: "audio/midi",
    mime: "message/rfc822",
    mj2: "video/mj2",
    mjp2: "video/mj2",
    mjs: "text/javascript",
    mml: "text/mathml",
    mods: "application/mods+xml",
    mov: "video/quicktime",
    mp2: "audio/mpeg",
    mp21: "application/mp21",
    mp2a: "audio/mpeg",
    mp3: "audio/mpeg",
    mp4: "video/mp4",
    mp4a: "audio/mp4",
    mp4s: "application/mp4",
    mp4v: "video/mp4",
    mpd: "application/dash+xml",
    mpe: "video/mpeg",
    mpeg: "video/mpeg",
    mpf: "application/media-policy-dataset+xml",
    mpg: "video/mpeg",
    mpg4: "video/mp4",
    mpga: "audio/mpeg",
    mpp: "application/dash-patch+xml",
    mrc: "application/marc",
    mrcx: "application/marcxml+xml",
    ms: "text/troff",
    mscml: "application/mediaservercontrol+xml",
    msh: "model/mesh",
    msi: "application/octet-stream",
    msix: "application/msix",
    msixbundle: "application/msixbundle",
    msm: "application/octet-stream",
    msp: "application/octet-stream",
    mtl: "model/mtl",
    mts: "video/mp2t",
    musd: "application/mmt-usd+xml",
    mxf: "application/mxf",
    mxmf: "audio/mobile-xmf",
    mxml: "application/xv+xml",
    n3: "text/n3",
    nb: "application/mathematica",
    nq: "application/n-quads",
    nt: "application/n-triples",
    obj: "model/obj",
    oda: "application/oda",
    oga: "audio/ogg",
    ogg: "audio/ogg",
    ogv: "video/ogg",
    ogx: "application/ogg",
    omdoc: "application/omdoc+xml",
    onepkg: "application/onenote",
    onetmp: "application/onenote",
    onetoc: "application/onenote",
    onetoc2: "application/onenote",
    opf: "application/oebps-package+xml",
    opus: "audio/ogg",
    otf: "font/otf",
    owl: "application/rdf+xml",
    oxps: "application/oxps",
    p10: "application/pkcs10",
    p7c: "application/pkcs7-mime",
    p7m: "application/pkcs7-mime",
    p7s: "application/pkcs7-signature",
    p8: "application/pkcs8",
    pdf: "application/pdf",
    pfr: "application/font-tdpfr",
    pgp: "application/pgp-encrypted",
    pkg: "application/octet-stream",
    pki: "application/pkixcmp",
    pkipath: "application/pkix-pkipath",
    pls: "application/pls+xml",
    png: "image/png",
    prc: "model/prc",
    prf: "application/pics-rules",
    provx: "application/provenance+xml",
    ps: "application/postscript",
    pskcxml: "application/pskc+xml",
    pti: "image/prs.pti",
    qt: "video/quicktime",
    raml: "application/raml+yaml",
    rapd: "application/route-apd+xml",
    rdf: "application/rdf+xml",
    relo: "application/p2p-overlay+xml",
    rif: "application/reginfo+xml",
    rl: "application/resource-lists+xml",
    rld: "application/resource-lists-diff+xml",
    rmi: "audio/midi",
    rnc: "application/relax-ng-compact-syntax",
    rng: "application/xml",
    roa: "application/rpki-roa",
    roff: "text/troff",
    rq: "application/sparql-query",
    rs: "application/rls-services+xml",
    rsat: "application/atsc-rsat+xml",
    rsd: "application/rsd+xml",
    rsheet: "application/urc-ressheet+xml",
    rss: "application/rss+xml",
    rtf: "text/rtf",
    rtx: "text/richtext",
    rusd: "application/route-usd+xml",
    s3m: "audio/s3m",
    sbml: "application/sbml+xml",
    scq: "application/scvp-cv-request",
    scs: "application/scvp-cv-response",
    sdp: "application/sdp",
    senmlx: "application/senml+xml",
    sensmlx: "application/sensml+xml",
    ser: "application/java-serialized-object",
    setpay: "application/set-payment-initiation",
    setreg: "application/set-registration-initiation",
    sgi: "image/sgi",
    sgm: "text/sgml",
    sgml: "text/sgml",
    shex: "text/shex",
    shf: "application/shf+xml",
    shtml: "text/html",
    sieve: "application/sieve",
    sig: "application/pgp-signature",
    sil: "audio/silk",
    silo: "model/mesh",
    siv: "application/sieve",
    slim: "text/slim",
    slm: "text/slim",
    sls: "application/route-s-tsid+xml",
    smi: "application/smil+xml",
    smil: "application/smil+xml",
    snd: "audio/basic",
    so: "application/octet-stream",
    spdx: "text/spdx",
    spp: "application/scvp-vp-response",
    spq: "application/scvp-vp-request",
    spx: "audio/ogg",
    sql: "application/sql",
    sru: "application/sru+xml",
    srx: "application/sparql-results+xml",
    ssdl: "application/ssdl+xml",
    ssml: "application/ssml+xml",
    stk: "application/hyperstudio",
    stl: "model/stl",
    stpx: "model/step+xml",
    stpxz: "model/step-xml+zip",
    stpz: "model/step+zip",
    styl: "text/stylus",
    stylus: "text/stylus",
    svg: "image/svg+xml",
    svgz: "image/svg+xml",
    swidtag: "application/swid+xml",
    t: "text/troff",
    t38: "image/t38",
    td: "application/urc-targetdesc+xml",
    tei: "application/tei+xml",
    teicorpus: "application/tei+xml",
    text: "text/plain",
    tfi: "application/thraud+xml",
    tfx: "image/tiff-fx",
    tif: "image/tiff",
    tiff: "image/tiff",
    toml: "application/toml",
    tr: "text/troff",
    trig: "application/trig",
    ts: "video/mp2t",
    tsd: "application/timestamped-data",
    tsv: "text/tab-separated-values",
    ttc: "font/collection",
    ttf: "font/ttf",
    ttl: "text/turtle",
    ttml: "application/ttml+xml",
    txt: "text/plain",
    u3d: "model/u3d",
    u8dsn: "message/global-delivery-status",
    u8hdr: "message/global-headers",
    u8mdn: "message/global-disposition-notification",
    u8msg: "message/global",
    ubj: "application/ubjson",
    uri: "text/uri-list",
    uris: "text/uri-list",
    urls: "text/uri-list",
    vcard: "text/vcard",
    vrml: "model/vrml",
    vtt: "text/vtt",
    vxml: "application/voicexml+xml",
    war: "application/java-archive",
    wasm: "application/wasm",
    wav: "audio/wav",
    weba: "audio/webm",
    webm: "video/webm",
    webmanifest: "application/manifest+json",
    webp: "image/webp",
    wgsl: "text/wgsl",
    wgt: "application/widget",
    wif: "application/watcherinfo+xml",
    wmf: "image/wmf",
    woff: "font/woff",
    woff2: "font/woff2",
    wrl: "model/vrml",
    wsdl: "application/wsdl+xml",
    wspolicy: "application/wspolicy+xml",
    x3d: "model/x3d+xml",
    x3db: "model/x3d+fastinfoset",
    x3dbz: "model/x3d+binary",
    x3dv: "model/x3d-vrml",
    x3dvz: "model/x3d+vrml",
    x3dz: "model/x3d+xml",
    xaml: "application/xaml+xml",
    xav: "application/xcap-att+xml",
    xca: "application/xcap-caps+xml",
    xcs: "application/calendar+xml",
    xdf: "application/xcap-diff+xml",
    xdssc: "application/dssc+xml",
    xel: "application/xcap-el+xml",
    xenc: "application/xenc+xml",
    xer: "application/patch-ops-error+xml",
    xfdf: "application/xfdf",
    xht: "application/xhtml+xml",
    xhtml: "application/xhtml+xml",
    xhvml: "application/xv+xml",
    xlf: "application/xliff+xml",
    xm: "audio/xm",
    xml: "text/xml",
    xns: "application/xcap-ns+xml",
    xop: "application/xop+xml",
    xpl: "application/xproc+xml",
    xsd: "application/xml",
    xsf: "application/prs.xsf+xml",
    xsl: "application/xml",
    xslt: "application/xml",
    xspf: "application/xspf+xml",
    xvm: "application/xv+xml",
    xvml: "application/xv+xml",
    yaml: "text/yaml",
    yang: "application/yang",
    yin: "application/yin+xml",
    yml: "text/yaml",
    zip: "application/zip"
  };
  o(fi, "lookup");
});

// ../node_modules/sirv/build.js
var dt = z((jr, ft) => {
  var pe = require("fs"), { join: di, normalize: gi, resolve: xi } = require("path"), { totalist: hi } = (at(), $(rt)), { parse: yi } = (st(), $(ot)),
  { lookup: vi } = (pt(), $(ct)), wi = /* @__PURE__ */ o(() => {
  }, "noop");
  function bi(e, i) {
    for (let t = 0; t < i.length; t++)
      if (i[t].test(e)) return !0;
  }
  o(bi, "isMatch");
  function mt(e, i) {
    let t = 0, r, a = e.length - 1;
    e.charCodeAt(a) === 47 && (e = e.substring(0, a));
    let n = [], s = `${e}/index`;
    for (; t < i.length; t++)
      r = i[t] ? `.${i[t]}` : "", e && n.push(e + r), n.push(s + r);
    return n;
  }
  o(mt, "toAssume");
  function _i(e, i, t) {
    let r = 0, a, n = mt(i, t);
    for (; r < n.length; r++)
      if (a = e[n[r]]) return a;
  }
  o(_i, "viaCache");
  function ji(e, i, t, r) {
    let a = 0, n = mt(t, r), s, l, p, c;
    for (; a < n.length; a++)
      if (s = gi(di(e, p = n[a])), s.startsWith(e) && pe.existsSync(s)) {
        if (l = pe.statSync(s), l.isDirectory()) continue;
        return c = ut(p, l, i), c["Cache-Control"] = i ? "no-cache" : "no-store", { abs: s, stats: l, headers: c };
      }
  }
  o(ji, "viaLocal");
  function Oi(e, i) {
    return i.statusCode = 404, i.end();
  }
  o(Oi, "is404");
  function Ei(e, i, t, r, a) {
    let n = 200, s, l = {};
    a = { ...a };
    for (let p in a)
      s = i.getHeader(p), s && (a[p] = s);
    if ((s = i.getHeader("content-type")) && (a["Content-Type"] = s), e.headers.range) {
      n = 206;
      let [p, c] = e.headers.range.replace("bytes=", "").split("-"), u = l.end = parseInt(c, 10) || r.size - 1, d = l.start = parseInt(p, 10) ||
      0;
      if (u >= r.size && (u = r.size - 1), d >= r.size)
        return i.setHeader("Content-Range", `bytes */${r.size}`), i.statusCode = 416, i.end();
      a["Content-Range"] = `bytes ${d}-${u}/${r.size}`, a["Content-Length"] = u - d + 1, a["Accept-Ranges"] = "bytes";
    }
    i.writeHead(n, a), pe.createReadStream(t, l).pipe(i);
  }
  o(Ei, "send");
  var Si = {
    ".br": "br",
    ".gz": "gzip"
  };
  function ut(e, i, t) {
    let r = Si[e.slice(-3)], a = vi(e.slice(0, r && -3)) || "";
    a === "text/html" && (a += ";charset=utf-8");
    let n = {
      "Content-Length": i.size,
      "Content-Type": a,
      "Last-Modified": i.mtime.toUTCString()
    };
    return r && (n["Content-Encoding"] = r), t && (n.ETag = `W/"${i.size}-${i.mtime.getTime()}"`), n;
  }
  o(ut, "toHeaders");
  ft.exports = function(e, i = {}) {
    e = xi(e || ".");
    let t = i.onNoMatch || Oi, r = i.setHeaders || wi, a = i.extensions || ["html", "htm"], n = i.gzip && a.map((m) => `${m}.gz`).concat("gz"),
    s = i.brotli && a.map((m) => `${m}.br`).concat("br"), l = {}, p = "/", c = !!i.etag, u = !!i.single;
    if (typeof i.single == "string") {
      let m = i.single.lastIndexOf(".");
      p += ~m ? i.single.substring(0, m) : i.single;
    }
    let d = [];
    i.ignores !== !1 && (d.push(/[/]([A-Za-z\s\d~$._-]+\.\w+){1,}$/), i.dotfiles ? d.push(/\/\.\w/) : d.push(/\/\.well-known/), [].concat(i.
    ignores || []).forEach((m) => {
      d.push(new RegExp(m, "i"));
    }));
    let x = i.maxAge != null && `public,max-age=${i.maxAge}`;
    x && i.immutable ? x += ",immutable" : x && i.maxAge === 0 && (x += ",must-revalidate"), i.dev || hi(e, (m, f, y) => {
      if (!/\.well-known[\\+\/]/.test(m)) {
        if (!i.dotfiles && /(^\.|[\\+|\/+]\.)/.test(m)) return;
      }
      let v = ut(m, y, c);
      x && (v["Cache-Control"] = x), l["/" + m.normalize().replace(/\\+/g, "/")] = { abs: f, stats: y, headers: v };
    });
    let g = i.dev ? ji.bind(0, e, c) : _i.bind(0, l);
    return function(m, f, y) {
      let v = [""], _ = yi(m).pathname, O = m.headers["accept-encoding"] || "";
      if (n && O.includes("gzip") && v.unshift(...n), s && /(br|brotli)/i.test(O) && v.unshift(...s), v.push(...a), _.indexOf("%") !== -1)
        try {
          _ = decodeURI(_);
        } catch {
        }
      let w = g(_, v) || u && !bi(_, d) && g(p, v);
      if (!w) return y ? y() : t(m, f);
      if (c && m.headers["if-none-match"] === w.headers.ETag)
        return f.writeHead(304), f.end();
      (n || s) && f.setHeader("Vary", "Accept-Encoding"), r(f, _, w.stats), Ei(m, f, w.abs, w.stats, w.headers);
    };
  };
});

// ../node_modules/ejs/lib/utils.js
var yt = z((T) => {
  "use strict";
  var Pi = /[|\\{}()[\]^$+*?.]/g, Ti = Object.prototype.hasOwnProperty, me = /* @__PURE__ */ o(function(e, i) {
    return Ti.apply(e, [i]);
  }, "hasOwn");
  T.escapeRegExpChars = function(e) {
    return e ? String(e).replace(Pi, "\\$&") : "";
  };
  var Ri = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&#34;",
    "'": "&#39;"
  }, Fi = /[&<>'"]/g;
  function ki(e) {
    return Ri[e] || e;
  }
  o(ki, "encode_char");
  var Li = `var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
`;
  T.escapeXML = function(e) {
    return e == null ? "" : String(e).replace(Fi, ki);
  };
  function ht() {
    return Function.prototype.toString.call(this) + `;
` + Li;
  }
  o(ht, "escapeXMLToString");
  try {
    typeof Object.defineProperty == "function" ? Object.defineProperty(T.escapeXML, "toString", { value: ht }) : T.escapeXML.toString = ht;
  } catch {
    console.warn("Unable to set escapeXML.toString (is the Function prototype frozen?)");
  }
  T.shallowCopy = function(e, i) {
    if (i = i || {}, e != null)
      for (var t in i)
        me(i, t) && (t === "__proto__" || t === "constructor" || (e[t] = i[t]));
    return e;
  };
  T.shallowCopyFromList = function(e, i, t) {
    if (t = t || [], i = i || {}, e != null)
      for (var r = 0; r < t.length; r++) {
        var a = t[r];
        if (typeof i[a] < "u") {
          if (!me(i, a) || a === "__proto__" || a === "constructor")
            continue;
          e[a] = i[a];
        }
      }
    return e;
  };
  T.cache = {
    _data: {},
    set: /* @__PURE__ */ o(function(e, i) {
      this._data[e] = i;
    }, "set"),
    get: /* @__PURE__ */ o(function(e) {
      return this._data[e];
    }, "get"),
    remove: /* @__PURE__ */ o(function(e) {
      delete this._data[e];
    }, "remove"),
    reset: /* @__PURE__ */ o(function() {
      this._data = {};
    }, "reset")
  };
  T.hyphenToCamel = function(e) {
    return e.replace(/-[a-z]/g, function(i) {
      return i[1].toUpperCase();
    });
  };
  T.createNullProtoObjWherePossible = function() {
    return typeof Object.create == "function" ? function() {
      return /* @__PURE__ */ Object.create(null);
    } : { __proto__: null } instanceof Object ? function() {
      return {};
    } : function() {
      return { __proto__: null };
    };
  }();
  T.hasOwnOnlyObject = function(e) {
    var i = T.createNullProtoObjWherePossible();
    for (var t in e)
      me(e, t) && (i[t] = e[t]);
    return i;
  };
});

// ../node_modules/ejs/package.json
var vt = z((Tr, Ci) => {
  Ci.exports = {
    name: "ejs",
    description: "Embedded JavaScript templates",
    keywords: [
      "template",
      "engine",
      "ejs"
    ],
    version: "3.1.10",
    author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
    license: "Apache-2.0",
    bin: {
      ejs: "./bin/cli.js"
    },
    main: "./lib/ejs.js",
    jsdelivr: "ejs.min.js",
    unpkg: "ejs.min.js",
    repository: {
      type: "git",
      url: "git://github.com/mde/ejs.git"
    },
    bugs: "https://github.com/mde/ejs/issues",
    homepage: "https://github.com/mde/ejs",
    dependencies: {
      jake: "^10.8.5"
    },
    devDependencies: {
      browserify: "^16.5.1",
      eslint: "^6.8.0",
      "git-directory-deploy": "^1.5.1",
      jsdoc: "^4.0.2",
      "lru-cache": "^4.0.1",
      mocha: "^10.2.0",
      "uglify-js": "^3.3.16"
    },
    engines: {
      node: ">=0.10.0"
    },
    scripts: {
      test: "npx jake test"
    }
  };
});

// ../node_modules/ejs/lib/ejs.js
var Tt = z((h) => {
  "use strict";
  var fe = require("fs"), W = require("path"), b = yt(), wt = !1, Ai = vt().version, Ni = "<", Di = ">", Ii = "%", St = "locals", Mi = "ejs",
  zi = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)", Pt = [
    "delimiter",
    "scope",
    "context",
    "debug",
    "compileDebug",
    "client",
    "_with",
    "rmWhitespace",
    "strict",
    "filename",
    "async"
  ], qi = Pt.concat("cache"), bt = /^\uFEFF/, ue = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
  h.cache = b.cache;
  h.fileLoader = fe.readFileSync;
  h.localsName = St;
  h.promiseImpl = new Function("return this;")().Promise;
  h.resolveInclude = function(e, i, t) {
    var r = W.dirname, a = W.extname, n = W.resolve, s = n(t ? i : r(i), e), l = a(e);
    return l || (s += ".ejs"), s;
  };
  function _t(e, i) {
    var t;
    if (i.some(function(r) {
      return t = h.resolveInclude(e, r, !0), fe.existsSync(t);
    }))
      return t;
  }
  o(_t, "resolvePaths");
  function $i(e, i) {
    var t, r, a = i.views, n = /^[A-Za-z]+:\\|^\//.exec(e);
    if (n && n.length)
      e = e.replace(/^\/*/, ""), Array.isArray(i.root) ? t = _t(e, i.root) : t = h.resolveInclude(e, i.root || "/", !0);
    else if (i.filename && (r = h.resolveInclude(e, i.filename), fe.existsSync(r) && (t = r)), !t && Array.isArray(a) && (t = _t(e, a)), !t &&
    typeof i.includer != "function")
      throw new Error('Could not find the include file "' + i.escapeFunction(e) + '"');
    return t;
  }
  o($i, "getIncludePath");
  function B(e, i) {
    var t, r = e.filename, a = arguments.length > 1;
    if (e.cache) {
      if (!r)
        throw new Error("cache option requires a filename");
      if (t = h.cache.get(r), t)
        return t;
      a || (i = jt(r).toString().replace(bt, ""));
    } else if (!a) {
      if (!r)
        throw new Error("Internal EJS error: no file name or template provided");
      i = jt(r).toString().replace(bt, "");
    }
    return t = h.compile(i, e), e.cache && h.cache.set(r, t), t;
  }
  o(B, "handleCache");
  function Wi(e, i, t) {
    var r;
    if (t) {
      try {
        r = B(e)(i);
      } catch (a) {
        return t(a);
      }
      t(null, r);
    } else {
      if (typeof h.promiseImpl == "function")
        return new h.promiseImpl(function(a, n) {
          try {
            r = B(e)(i), a(r);
          } catch (s) {
            n(s);
          }
        });
      throw new Error("Please provide a callback function");
    }
  }
  o(Wi, "tryHandleCache");
  function jt(e) {
    return h.fileLoader(e);
  }
  o(jt, "fileLoader");
  function Bi(e, i) {
    var t = b.shallowCopy(b.createNullProtoObjWherePossible(), i);
    if (t.filename = $i(e, t), typeof i.includer == "function") {
      var r = i.includer(e, t.filename);
      if (r && (r.filename && (t.filename = r.filename), r.template))
        return B(t, r.template);
    }
    return B(t);
  }
  o(Bi, "includeFile");
  function Ot(e, i, t, r, a) {
    var n = i.split(`
`), s = Math.max(r - 3, 0), l = Math.min(n.length, r + 3), p = a(t), c = n.slice(s, l).map(function(u, d) {
      var x = d + s + 1;
      return (x == r ? " >> " : "    ") + x + "| " + u;
    }).join(`
`);
    throw e.path = p, e.message = (p || "ejs") + ":" + r + `
` + c + `

` + e.message, e;
  }
  o(Ot, "rethrow");
  function Et(e) {
    return e.replace(/;(\s*$)/, "$1");
  }
  o(Et, "stripSemi");
  h.compile = /* @__PURE__ */ o(function(i, t) {
    var r;
    return t && t.scope && (wt || (console.warn("`scope` option is deprecated and will be removed in EJS 3"), wt = !0), t.context || (t.context =
    t.scope), delete t.scope), r = new j(i, t), r.compile();
  }, "compile");
  h.render = function(e, i, t) {
    var r = i || b.createNullProtoObjWherePossible(), a = t || b.createNullProtoObjWherePossible();
    return arguments.length == 2 && b.shallowCopyFromList(a, r, Pt), B(a, e)(r);
  };
  h.renderFile = function() {
    var e = Array.prototype.slice.call(arguments), i = e.shift(), t, r = { filename: i }, a, n;
    return typeof arguments[arguments.length - 1] == "function" && (t = e.pop()), e.length ? (a = e.shift(), e.length ? b.shallowCopy(r, e.pop()) :
    (a.settings && (a.settings.views && (r.views = a.settings.views), a.settings["view cache"] && (r.cache = !0), n = a.settings["view optio\
ns"], n && b.shallowCopy(r, n)), b.shallowCopyFromList(r, a, qi)), r.filename = i) : a = b.createNullProtoObjWherePossible(), Wi(r, a, t);
  };
  h.Template = j;
  h.clearCache = function() {
    h.cache.reset();
  };
  function j(e, i) {
    var t = b.hasOwnOnlyObject(i), r = b.createNullProtoObjWherePossible();
    this.templateText = e, this.mode = null, this.truncate = !1, this.currentLine = 1, this.source = "", r.client = t.client || !1, r.escapeFunction =
    t.escape || t.escapeFunction || b.escapeXML, r.compileDebug = t.compileDebug !== !1, r.debug = !!t.debug, r.filename = t.filename, r.openDelimiter =
    t.openDelimiter || h.openDelimiter || Ni, r.closeDelimiter = t.closeDelimiter || h.closeDelimiter || Di, r.delimiter = t.delimiter || h.
    delimiter || Ii, r.strict = t.strict || !1, r.context = t.context, r.cache = t.cache || !1, r.rmWhitespace = t.rmWhitespace, r.root = t.
    root, r.includer = t.includer, r.outputFunctionName = t.outputFunctionName, r.localsName = t.localsName || h.localsName || St, r.views =
    t.views, r.async = t.async, r.destructuredLocals = t.destructuredLocals, r.legacyInclude = typeof t.legacyInclude < "u" ? !!t.legacyInclude :
    !0, r.strict ? r._with = !1 : r._with = typeof t._with < "u" ? t._with : !0, this.opts = r, this.regex = this.createRegex();
  }
  o(j, "Template");
  j.modes = {
    EVAL: "eval",
    ESCAPED: "escaped",
    RAW: "raw",
    COMMENT: "comment",
    LITERAL: "literal"
  };
  j.prototype = {
    createRegex: /* @__PURE__ */ o(function() {
      var e = zi, i = b.escapeRegExpChars(this.opts.delimiter), t = b.escapeRegExpChars(this.opts.openDelimiter), r = b.escapeRegExpChars(this.
      opts.closeDelimiter);
      return e = e.replace(/%/g, i).replace(/</g, t).replace(/>/g, r), new RegExp(e);
    }, "createRegex"),
    compile: /* @__PURE__ */ o(function() {
      var e, i, t = this.opts, r = "", a = "", n = t.escapeFunction, s, l = t.filename ? JSON.stringify(t.filename) : "undefined";
      if (!this.source) {
        if (this.generateSource(), r += `  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
`, t.outputFunctionName) {
          if (!ue.test(t.outputFunctionName))
            throw new Error("outputFunctionName is not a valid JS identifier.");
          r += "  var " + t.outputFunctionName + ` = __append;
`;
        }
        if (t.localsName && !ue.test(t.localsName))
          throw new Error("localsName is not a valid JS identifier.");
        if (t.destructuredLocals && t.destructuredLocals.length) {
          for (var p = "  var __locals = (" + t.localsName + ` || {}),
`, c = 0; c < t.destructuredLocals.length; c++) {
            var u = t.destructuredLocals[c];
            if (!ue.test(u))
              throw new Error("destructuredLocals[" + c + "] is not a valid JS identifier.");
            c > 0 && (p += `,
  `), p += u + " = __locals." + u;
          }
          r += p + `;
`;
        }
        t._with !== !1 && (r += "  with (" + t.localsName + ` || {}) {
`, a += `  }
`), a += `  return __output;
`, this.source = r + this.source + a;
      }
      t.compileDebug ? e = `var __line = 1
  , __lines = ` + JSON.stringify(this.templateText) + `
  , __filename = ` + l + `;
try {
` + this.source + `} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}
` : e = this.source, t.client && (e = "escapeFn = escapeFn || " + n.toString() + `;
` + e, t.compileDebug && (e = "rethrow = rethrow || " + Ot.toString() + `;
` + e)), t.strict && (e = `"use strict";
` + e), t.debug && console.log(e), t.compileDebug && t.filename && (e = e + `
//# sourceURL=` + l + `
`);
      try {
        if (t.async)
          try {
            s = new Function("return (async function(){}).constructor;")();
          } catch (m) {
            throw m instanceof SyntaxError ? new Error("This environment does not support async/await") : m;
          }
        else
          s = Function;
        i = new s(t.localsName + ", escapeFn, include, rethrow", e);
      } catch (m) {
        throw m instanceof SyntaxError && (t.filename && (m.message += " in " + t.filename), m.message += ` while compiling ejs

`, m.message += `If the above error is not helpful, you may want to try EJS-Lint:
`, m.message += "https://github.com/RyanZim/EJS-Lint", t.async || (m.message += `
`, m.message += "Or, if you meant to create an async function, pass `async: true` as an option.")), m;
      }
      var d = t.client ? i : /* @__PURE__ */ o(function(f) {
        var y = /* @__PURE__ */ o(function(v, _) {
          var O = b.shallowCopy(b.createNullProtoObjWherePossible(), f);
          return _ && (O = b.shallowCopy(O, _)), Bi(v, t)(O);
        }, "include");
        return i.apply(
          t.context,
          [f || b.createNullProtoObjWherePossible(), n, y, Ot]
        );
      }, "anonymous");
      if (t.filename && typeof Object.defineProperty == "function") {
        var x = t.filename, g = W.basename(x, W.extname(x));
        try {
          Object.defineProperty(d, "name", {
            value: g,
            writable: !1,
            enumerable: !1,
            configurable: !0
          });
        } catch {
        }
      }
      return d;
    }, "compile"),
    generateSource: /* @__PURE__ */ o(function() {
      var e = this.opts;
      e.rmWhitespace && (this.templateText = this.templateText.replace(/[\r\n]+/g, `
`).replace(/^\s+|\s+$/gm, "")), this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");
      var i = this, t = this.parseTemplateText(), r = this.opts.delimiter, a = this.opts.openDelimiter, n = this.opts.closeDelimiter;
      t && t.length && t.forEach(function(s, l) {
        var p;
        if (s.indexOf(a + r) === 0 && s.indexOf(a + r + r) !== 0 && (p = t[l + 2], !(p == r + n || p == "-" + r + n || p == "_" + r + n)))
          throw new Error('Could not find matching close tag for "' + s + '".');
        i.scanLine(s);
      });
    }, "generateSource"),
    parseTemplateText: /* @__PURE__ */ o(function() {
      for (var e = this.templateText, i = this.regex, t = i.exec(e), r = [], a; t; )
        a = t.index, a !== 0 && (r.push(e.substring(0, a)), e = e.slice(a)), r.push(t[0]), e = e.slice(t[0].length), t = i.exec(e);
      return e && r.push(e), r;
    }, "parseTemplateText"),
    _addOutput: /* @__PURE__ */ o(function(e) {
      if (this.truncate && (e = e.replace(/^(?:\r\n|\r|\n)/, ""), this.truncate = !1), !e)
        return e;
      e = e.replace(/\\/g, "\\\\"), e = e.replace(/\n/g, "\\n"), e = e.replace(/\r/g, "\\r"), e = e.replace(/"/g, '\\"'), this.source += '  \
  ; __append("' + e + `")
`;
    }, "_addOutput"),
    scanLine: /* @__PURE__ */ o(function(e) {
      var i = this, t = this.opts.delimiter, r = this.opts.openDelimiter, a = this.opts.closeDelimiter, n = 0;
      switch (n = e.split(`
`).length - 1, e) {
        case r + t:
        case r + t + "_":
          this.mode = j.modes.EVAL;
          break;
        case r + t + "=":
          this.mode = j.modes.ESCAPED;
          break;
        case r + t + "-":
          this.mode = j.modes.RAW;
          break;
        case r + t + "#":
          this.mode = j.modes.COMMENT;
          break;
        case r + t + t:
          this.mode = j.modes.LITERAL, this.source += '    ; __append("' + e.replace(r + t + t, r + t) + `")
`;
          break;
        case t + t + a:
          this.mode = j.modes.LITERAL, this.source += '    ; __append("' + e.replace(t + t + a, t + a) + `")
`;
          break;
        case t + a:
        case "-" + t + a:
        case "_" + t + a:
          this.mode == j.modes.LITERAL && this._addOutput(e), this.mode = null, this.truncate = e.indexOf("-") === 0 || e.indexOf("_") === 0;
          break;
        default:
          if (this.mode) {
            switch (this.mode) {
              case j.modes.EVAL:
              case j.modes.ESCAPED:
              case j.modes.RAW:
                e.lastIndexOf("//") > e.lastIndexOf(`
`) && (e += `
`);
            }
            switch (this.mode) {
              // Just executing code
              case j.modes.EVAL:
                this.source += "    ; " + e + `
`;
                break;
              // Exec, esc, and output
              case j.modes.ESCAPED:
                this.source += "    ; __append(escapeFn(" + Et(e) + `))
`;
                break;
              // Exec and output
              case j.modes.RAW:
                this.source += "    ; __append(" + Et(e) + `)
`;
                break;
              case j.modes.COMMENT:
                break;
              // Literal <%% mode, append as raw output
              case j.modes.LITERAL:
                this._addOutput(e);
                break;
            }
          } else
            this._addOutput(e);
      }
      i.opts.compileDebug && n && (this.currentLine += n, this.source += "    ; __line = " + this.currentLine + `
`);
    }, "scanLine")
  };
  h.escapeXML = b.escapeXML;
  h.__express = h.renderFile;
  h.VERSION = Ai;
  h.name = Mi;
  typeof window < "u" && (window.ejs = h);
});

// src/builder-manager/index.ts
var tr = {};
q(tr, {
  bail: () => Ut,
  build: () => Yi,
  corePresets: () => Qi,
  executor: () => ye,
  getConfig: () => he,
  overridePresets: () => er,
  start: () => Zi
});
module.exports = $(tr);
var L = require("node:fs/promises"), P = require("node:path"), Bt = require("storybook/internal/common"), Ht = require("storybook/internal/manager/globals-module-info"),
ie = require("storybook/internal/node-logger");

// ../node_modules/@fal-works/esbuild-plugin-global-externals/lib/module-info.js
var je = /* @__PURE__ */ o((e) => {
  let {
    type: i = "esm",
    varName: t,
    namedExports: r = null,
    defaultExport: a = !0
  } = typeof e == "string" ? { varName: e } : e;
  return { type: i, varName: t, namedExports: r, defaultExport: a };
}, "normalizeModuleInfo");

// ../node_modules/@fal-works/esbuild-plugin-global-externals/lib/on-load.js
var Yt = /* @__PURE__ */ o((e) => `module.exports = ${e};`, "createCjsContents");
var Qt = /* @__PURE__ */ o((e, i, t) => {
  let r = t ? [`export default ${e};`] : [];
  if (i && i.length) {
    let a = [...new Set(i)].join(", ");
    r.push(`const { ${a} } = ${e};`), r.push(`export { ${a} };`);
  }
  return r.join(`
`);
}, "createEsmContents"), Oe = /* @__PURE__ */ o((e) => {
  let { type: i, varName: t, namedExports: r, defaultExport: a } = e;
  switch (i) {
    case "esm":
      return Qt(t, r, a);
    case "cjs":
      return Yt(t);
  }
}, "createContents");

// ../node_modules/@fal-works/esbuild-plugin-global-externals/lib/with-reg-exp.js
var ae = "global-externals", ne = /* @__PURE__ */ o((e) => {
  let { modulePathFilter: i, getModuleInfo: t } = e;
  return {
    name: ae,
    setup(r) {
      r.onResolve({ filter: i }, (a) => ({
        path: a.path,
        namespace: ae
      })), r.onLoad({ filter: /.*/, namespace: ae }, (a) => {
        let n = a.path, s = je(t(n));
        return { contents: Oe(s) };
      });
    }
  };
}, "globalExternalsWithRegExp");

// ../node_modules/@fal-works/esbuild-plugin-global-externals/lib/with-object.js
var oe = /* @__PURE__ */ o((e) => {
  let i = {
    modulePathFilter: new RegExp(`^(?:${Object.keys(e).join("|")})$`),
    getModuleInfo: /* @__PURE__ */ o((t) => e[t], "getModuleInfo")
  };
  return ne(i);
}, "globalExternals");

// src/builder-manager/index.ts
var Jt = F(tt(), 1), be = F(dt(), 1);

// src/shared/constants/environments-support.ts
var gt = [
  "chrome131",
  "edge134",
  "firefox136",
  "safari18.3",
  "ios18.3",
  "opera117"
];
var xt = {
  // React Native does not support class static blocks without a specific babel plugin
  "class-static-blocks": !1
};

// src/builder-manager/utils/data.ts
var Lt = require("node:path"), Ct = require("storybook/internal/common");

// src/builder-manager/utils/template.ts
var Rt = require("node:fs/promises"), Q = require("node:path"), Ft = F(Tt(), 1);
var de = /* @__PURE__ */ o(async (e) => (0, Q.join)(
  (0, Q.dirname)(require.resolve("storybook/internal/package.json")),
  "assets/server",
  e
), "getTemplatePath"), kt = /* @__PURE__ */ o(async (e) => {
  let i = await de(e);
  return (0, Rt.readFile)(i, { encoding: "utf8" });
}, "readTemplate");
var ge = /* @__PURE__ */ o(async (e, i, t, r, a, n, s, l, p, c, u, { versionCheck: d, previewUrl: x, configType: g, ignorePreview: m }, f) => {
  let y = await i, v = await e, _ = Object.entries(f).reduce(
    (O, [w, E]) => ({ ...O, [w]: JSON.stringify(E) }),
    {}
  );
  return (0, Ft.render)(v, {
    title: y ? `${y} - Storybook` : "Storybook",
    files: { js: n, css: a },
    favicon: await t,
    globals: {
      FEATURES: JSON.stringify(await s, null, 2),
      REFS: JSON.stringify(await l, null, 2),
      LOGLEVEL: JSON.stringify(await p, null, 2),
      DOCS_OPTIONS: JSON.stringify(await c, null, 2),
      CONFIG_TYPE: JSON.stringify(await g, null, 2),
      // These two need to be double stringified because the UI expects a string
      VERSIONCHECK: JSON.stringify(JSON.stringify(d), null, 2),
      PREVIEW_URL: JSON.stringify(x, null, 2),
      // global preview URL
      TAGS_OPTIONS: JSON.stringify(await u, null, 2),
      ..._
    },
    head: await r || "",
    ignorePreview: m
  });
}, "renderHTML");

// src/builder-manager/utils/data.ts
var xe = /* @__PURE__ */ o(async (e) => {
  let i = (0, Ct.getRefs)(e), t = e.presets.apply("favicon").then((x) => (0, Lt.basename)(x)), r = e.presets.apply("features"), a = e.presets.
  apply("logLevel"), n = e.presets.apply("title"), s = e.presets.apply("docs", {}), l = e.presets.apply("tags", {}), p = kt("template.ejs"),
  c = e.presets.apply("managerHead"), [u, d] = await Promise.all([
    //
    ye.get(),
    he(e)
  ]);
  return {
    refs: i,
    features: r,
    title: n,
    docsOptions: s,
    template: p,
    customHead: c,
    instance: u,
    config: d,
    logLevel: a,
    favicon: t,
    tagsOptions: l
  };
}, "getData");

// src/builder-manager/utils/files.ts
var At = require("node:fs"), ee = require("node:fs/promises"), N = require("node:path");

// ../node_modules/slash/index.js
function H(e) {
  return e.startsWith("\\\\?\\") ? e : e.replace(/\\/g, "/");
}
o(H, "slash");

// src/builder-manager/utils/files.ts
async function ve(e, i) {
  let t = await Promise.all(
    i?.map(async (n) => {
      let { location: s, url: l } = Hi(n, e);
      if (!(0, At.existsSync)(s)) {
        let p = (0, N.dirname)(s);
        await (0, ee.mkdir)(p, { recursive: !0 });
      }
      return await (0, ee.writeFile)(s, n.contents), l;
    }) || []
  ), r = t.filter((n) => n.endsWith(".js"));
  return { cssFiles: t.filter((n) => n.endsWith(".css")), jsFiles: r };
}
o(ve, "readOrderedFiles");
function Hi(e, i) {
  let t = e.path.replace(i, ""), r = (0, N.normalize)((0, N.join)(i, t)), a = `./sb-addons${H(t).split("/").map(encodeURIComponent).join("/")}`;
  return { location: r, url: a };
}
o(Hi, "sanitizePath");

// src/builder-manager/utils/framework.ts
var Dt = require("node:path"), J = require("storybook/internal/common");
var Nt = /* @__PURE__ */ o((e) => {
  if (e)
    return typeof e == "string" ? e : e.name;
}, "pluckNameFromConfigProperty"), It = /* @__PURE__ */ o((e) => e.replaceAll(Dt.sep, "/"), "normalizePath"), Ji = /* @__PURE__ */ o((e) => It(
e).match(/(@storybook\/.*)$/)?.[1], "pluckStorybookPackageFromPath"), Ui = /* @__PURE__ */ o((e) => It(e).split("node_modules/")[1] ?? e, "p\
luckThirdPartyPackageFromPath"), we = /* @__PURE__ */ o(async (e) => {
  let i = {}, { builder: t } = await e.presets.apply("core"), r = await (0, J.getFrameworkName)(e);
  await (0, J.extractProperRendererNameFromFramework)(r) && (i.STORYBOOK_RENDERER = await (0, J.extractProperRendererNameFromFramework)(r) ??
  void 0);
  let n = Nt(t);
  n && (i.STORYBOOK_BUILDER = Ji(n) ?? Ui(n));
  let s = Nt(await e.presets.apply("framework"));
  return s && (i.STORYBOOK_FRAMEWORK = s), i;
}, "buildFrameworkGlobalsFromOptions");

// src/builder-manager/utils/managerEntries.ts
var zt = require("node:fs"), te = require("node:fs/promises"), R = require("node:path"), qt = require("storybook/internal/common");
var Mt = /* @__PURE__ */ o((e) => e.replaceAll(".", "").replaceAll("@", "").replaceAll(R.sep, "-").replaceAll("/", "-").replaceAll(new RegExp(
/^(-)+/g), ""), "sanitizeBase"), Gi = /* @__PURE__ */ o((e) => {
  let i = e.split(/-?node_modules-?/);
  return i[i.length - 1].replaceAll("storybook-addon-", "").replaceAll("dist-", "");
}, "sanitizeFinal");
async function $t(e, i) {
  return Promise.all(
    e.map(async (t, r) => {
      let { name: a, dir: n } = (0, R.parse)(t), s = (0, qt.resolvePathInStorybookCache)("sb-manager", i);
      if (!s)
        throw new Error("Could not create/find cache directory");
      let l = (0, R.relative)(process.cwd(), n), p = (0, R.join)(
        s,
        Gi((0, R.join)(`${Mt(l)}-${r}`, `${Mt(a)}-bundle.js`))
      );
      if (!(0, zt.existsSync)(p)) {
        let c = (0, R.dirname)(p);
        await (0, te.mkdir)(c, { recursive: !0 });
      }
      return await (0, te.writeFile)(p, `import '${H(t).replaceAll(/'/g, "\\'")}';`), p;
    })
  );
}
o($t, "wrapManagerEntries");

// src/builder-manager/utils/safeResolve.ts
var Wt = /* @__PURE__ */ o((e) => {
  try {
    return Promise.resolve(require.resolve(e));
  } catch {
    return Promise.resolve(!1);
  }
}, "safeResolve");

// src/builder-manager/index.ts
var Vi = /^\/($|\?)/, D, I, he = /* @__PURE__ */ o(async (e) => {
  let [i, t, r, a] = await Promise.all([
    e.presets.apply("managerEntries", []),
    Wt((0, P.join)(e.configDir, "manager")),
    de("addon.tsconfig.json"),
    e.presets.apply("env")
  ]), n = t ? [...i, t] : i;
  return {
    entryPoints: await $t(n, e.cacheKey),
    outdir: (0, P.join)(e.outputDir || "./", "sb-addons"),
    format: "iife",
    write: !1,
    ignoreAnnotations: !0,
    resolveExtensions: [".ts", ".tsx", ".mjs", ".js", ".jsx"],
    outExtension: { ".js": ".js" },
    loader: {
      ".js": "jsx",
      // media
      ".png": "dataurl",
      ".gif": "dataurl",
      ".jpg": "dataurl",
      ".jpeg": "dataurl",
      ".svg": "dataurl",
      ".webp": "dataurl",
      ".webm": "dataurl",
      ".mp3": "dataurl",
      // modern fonts
      ".woff2": "dataurl",
      // legacy font formats
      ".woff": "dataurl",
      ".eot": "dataurl",
      ".ttf": "dataurl"
    },
    target: gt,
    supported: xt,
    platform: "browser",
    bundle: !0,
    minify: !1,
    minifyWhitespace: !1,
    minifyIdentifiers: !1,
    minifySyntax: !0,
    metafile: !1,
    // turn this on to assist with debugging the bundling of managerEntries
    // treeShaking: true,
    sourcemap: !1,
    conditions: ["browser", "module", "default"],
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    jsx: "transform",
    jsxImportSource: "react",
    tsconfig: r,
    legalComments: "external",
    plugins: [oe(Ht.globalsModuleInfoMap), (0, Jt.pnpPlugin)()],
    banner: {
      js: "try{"
    },
    footer: {
      js: '}catch(e){ console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e); }'
    },
    define: {
      "process.env": JSON.stringify(a),
      ...(0, Bt.stringifyProcessEnvs)(a),
      global: "window",
      module: "{}"
    }
  };
}, "getConfig"), ye = {
  get: /* @__PURE__ */ o(async () => {
    let { build: e } = await import("esbuild");
    return e;
  }, "get")
}, Xi = /* @__PURE__ */ o(async function* ({
  startTime: i,
  options: t,
  router: r
}) {
  t.quiet || ie.logger.info("=> Starting manager..");
  let {
    config: a,
    favicon: n,
    customHead: s,
    features: l,
    instance: p,
    refs: c,
    template: u,
    title: d,
    logLevel: x,
    docsOptions: g,
    tagsOptions: m
  } = await xe(t);
  yield;
  let f = a.outdir;
  await (0, L.rm)(f, { recursive: !0, force: !0 }), yield, D = await p({
    ...a
  }), yield;
  let y = (0, P.join)(
    (0, P.dirname)(require.resolve("storybook/internal/package.json")),
    "dist",
    "manager"
  );
  r.use(
    "/sb-addons",
    (0, be.default)(f, {
      maxAge: 3e5,
      dev: !0,
      immutable: !0
    })
  ), r.use(
    "/sb-manager",
    (0, be.default)(y, {
      maxAge: 3e5,
      dev: !0,
      immutable: !0
    })
  );
  let { cssFiles: v, jsFiles: _ } = await ve(f, D?.outputFiles);
  D.metafile && t.outputDir && await (0, L.writeFile)(
    (0, P.join)(t.outputDir, "metafile.json"),
    JSON.stringify(D.metafile, null, 2)
  );
  let O = await we(t);
  yield;
  let w = await ge(
    u,
    d,
    n,
    s,
    v,
    _,
    l,
    c,
    x,
    g,
    m,
    t,
    O
  );
  return yield, r.use("/", ({ url: E }, S, k) => {
    E && Vi.test(E) ? (S.statusCode = 200, S.setHeader("Content-Type", "text/html"), S.write(w), S.end()) : k();
  }), r.use("/index.html", (E, S) => {
    S.statusCode = 200, S.setHeader("Content-Type", "text/html"), S.write(w), S.end();
  }), {
    bail: Ut,
    stats: {
      toJson: /* @__PURE__ */ o(() => ({}), "toJson")
    },
    totalTime: process.hrtime(i)
  };
}, "starterGeneratorFn"), Ki = /* @__PURE__ */ o(async function* ({ startTime: i, options: t }) {
  if (!t.outputDir)
    throw new Error("outputDir is required");
  ie.logger.info("=> Building manager..");
  let {
    config: r,
    customHead: a,
    favicon: n,
    features: s,
    instance: l,
    refs: p,
    template: c,
    title: u,
    logLevel: d,
    docsOptions: x,
    tagsOptions: g
  } = await xe(t);
  yield;
  let m = r.outdir, f = (0, P.join)(
    (0, P.dirname)(require.resolve("storybook/internal/package.json")),
    "dist",
    "manager"
  ), y = (0, P.join)(t.outputDir, "sb-manager");
  D = await l({
    ...r,
    minify: !0
  }), yield;
  let v = (0, L.cp)(f, y, {
    filter: /* @__PURE__ */ o((S) => {
      let { ext: k } = (0, P.parse)(S);
      return k ? k === ".js" : !0;
    }, "filter"),
    recursive: !0
  }), { cssFiles: _, jsFiles: O } = await ve(m, D?.outputFiles), w = await we(t);
  yield;
  let E = await ge(
    c,
    u,
    n,
    a,
    _,
    O,
    s,
    p,
    d,
    x,
    g,
    t,
    w
  );
  return await Promise.all([(0, L.writeFile)((0, P.join)(t.outputDir, "index.html"), E), v]), ie.logger.trace({ message: "=> Manager built",
  time: process.hrtime(i) }), {
    toJson: /* @__PURE__ */ o(() => ({}), "toJson")
  };
}, "builderGeneratorFn"), Ut = /* @__PURE__ */ o(async () => {
  if (I)
    try {
      await I.throw(new Error());
    } catch {
    }
}, "bail"), Zi = /* @__PURE__ */ o(async (e) => {
  I = Xi(e);
  let i;
  do
    i = await I.next();
  while (!i.done);
  return i.value;
}, "start"), Yi = /* @__PURE__ */ o(async (e) => {
  I = Ki(e);
  let i;
  do
    i = await I.next();
  while (!i.done);
  return i.value;
}, "build"), Qi = [], er = [];
