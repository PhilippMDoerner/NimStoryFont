"use strict";
var zo = Object.create;
var G = Object.defineProperty;
var Yo = Object.getOwnPropertyDescriptor;
var Ko = Object.getOwnPropertyNames;
var Xo = Object.getPrototypeOf, Qo = Object.prototype.hasOwnProperty;
var o = (e, t) => G(e, "name", { value: t, configurable: !0 });
var w = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), Zo = (e, t) => {
  for (var r in t)
    G(e, r, { get: t[r], enumerable: !0 });
}, Bt = (e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let i of Ko(t))
      !Qo.call(e, i) && i !== r && G(e, i, { get: () => t[i], enumerable: !(n = Yo(t, i)) || n.enumerable });
  return e;
};
var d = (e, t, r) => (r = e != null ? zo(Xo(e)) : {}, Bt(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  t || !e || !e.__esModule ? G(r, "default", { value: e, enumerable: !0 }) : r,
  e
)), ei = (e) => Bt(G({}, "__esModule", { value: !0 }), e);

// ../node_modules/picocolors/picocolors.js
var $t = w((Sa, Re) => {
  var Gt = process.argv || [], re = process.env, ti = !("NO_COLOR" in re || Gt.includes("--no-color")) && ("FORCE_COLOR" in re || Gt.includes(
  "--color") || process.platform === "win32" || require != null && require("tty").isatty(1) && re.TERM !== "dumb" || "CI" in re), ri = /* @__PURE__ */ o(
  (e, t, r = e) => (n) => {
    let i = "" + n, s = i.indexOf(t, e.length);
    return ~s ? e + ni(i, t, r, s) + t : e + i + t;
  }, "formatter"), ni = /* @__PURE__ */ o((e, t, r, n) => {
    let i = "", s = 0;
    do
      i += e.substring(s, n) + r, s = n + t.length, n = e.indexOf(t, s);
    while (~n);
    return i + e.substring(s);
  }, "replaceClose"), Ut = /* @__PURE__ */ o((e = ti) => {
    let t = e ? ri : () => String;
    return {
      isColorSupported: e,
      reset: t("\x1B[0m", "\x1B[0m"),
      bold: t("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
      dim: t("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
      italic: t("\x1B[3m", "\x1B[23m"),
      underline: t("\x1B[4m", "\x1B[24m"),
      inverse: t("\x1B[7m", "\x1B[27m"),
      hidden: t("\x1B[8m", "\x1B[28m"),
      strikethrough: t("\x1B[9m", "\x1B[29m"),
      black: t("\x1B[30m", "\x1B[39m"),
      red: t("\x1B[31m", "\x1B[39m"),
      green: t("\x1B[32m", "\x1B[39m"),
      yellow: t("\x1B[33m", "\x1B[39m"),
      blue: t("\x1B[34m", "\x1B[39m"),
      magenta: t("\x1B[35m", "\x1B[39m"),
      cyan: t("\x1B[36m", "\x1B[39m"),
      white: t("\x1B[37m", "\x1B[39m"),
      gray: t("\x1B[90m", "\x1B[39m"),
      bgBlack: t("\x1B[40m", "\x1B[49m"),
      bgRed: t("\x1B[41m", "\x1B[49m"),
      bgGreen: t("\x1B[42m", "\x1B[49m"),
      bgYellow: t("\x1B[43m", "\x1B[49m"),
      bgBlue: t("\x1B[44m", "\x1B[49m"),
      bgMagenta: t("\x1B[45m", "\x1B[49m"),
      bgCyan: t("\x1B[46m", "\x1B[49m"),
      bgWhite: t("\x1B[47m", "\x1B[49m"),
      blackBright: t("\x1B[90m", "\x1B[39m"),
      redBright: t("\x1B[91m", "\x1B[39m"),
      greenBright: t("\x1B[92m", "\x1B[39m"),
      yellowBright: t("\x1B[93m", "\x1B[39m"),
      blueBright: t("\x1B[94m", "\x1B[39m"),
      magentaBright: t("\x1B[95m", "\x1B[39m"),
      cyanBright: t("\x1B[96m", "\x1B[39m"),
      whiteBright: t("\x1B[97m", "\x1B[39m"),
      bgBlackBright: t("\x1B[100m", "\x1B[49m"),
      bgRedBright: t("\x1B[101m", "\x1B[49m"),
      bgGreenBright: t("\x1B[102m", "\x1B[49m"),
      bgYellowBright: t("\x1B[103m", "\x1B[49m"),
      bgBlueBright: t("\x1B[104m", "\x1B[49m"),
      bgMagentaBright: t("\x1B[105m", "\x1B[49m"),
      bgCyanBright: t("\x1B[106m", "\x1B[49m"),
      bgWhiteBright: t("\x1B[107m", "\x1B[49m")
    };
  }, "createColors");
  Re.exports = Ut();
  Re.exports.createColors = Ut;
});

// ../node_modules/walk-up-path/dist/cjs/index.js
var Vt = w((oe) => {
  "use strict";
  Object.defineProperty(oe, "__esModule", { value: !0 });
  oe.walkUp = void 0;
  var qt = require("path"), oi = /* @__PURE__ */ o(function* (e) {
    for (e = (0, qt.resolve)(e); e; ) {
      yield e;
      let t = (0, qt.dirname)(e);
      if (t === e)
        break;
      e = t;
    }
  }, "walkUp");
  oe.walkUp = oi;
});

// ../node_modules/isexe/windows.js
var ir = w((Ua, or) => {
  or.exports = nr;
  nr.sync = li;
  var tr = require("fs");
  function fi(e, t) {
    var r = t.pathExt !== void 0 ? t.pathExt : process.env.PATHEXT;
    if (!r || (r = r.split(";"), r.indexOf("") !== -1))
      return !0;
    for (var n = 0; n < r.length; n++) {
      var i = r[n].toLowerCase();
      if (i && e.substr(-i.length).toLowerCase() === i)
        return !0;
    }
    return !1;
  }
  o(fi, "checkPathExt");
  function rr(e, t, r) {
    return !e.isSymbolicLink() && !e.isFile() ? !1 : fi(t, r);
  }
  o(rr, "checkStat");
  function nr(e, t, r) {
    tr.stat(e, function(n, i) {
      r(n, n ? !1 : rr(i, e, t));
    });
  }
  o(nr, "isexe");
  function li(e, t) {
    return rr(tr.statSync(e), e, t);
  }
  o(li, "sync");
});

// ../node_modules/isexe/mode.js
var fr = w((Wa, ur) => {
  ur.exports = ar;
  ar.sync = pi;
  var sr = require("fs");
  function ar(e, t, r) {
    sr.stat(e, function(n, i) {
      r(n, n ? !1 : cr(i, t));
    });
  }
  o(ar, "isexe");
  function pi(e, t) {
    return cr(sr.statSync(e), t);
  }
  o(pi, "sync");
  function cr(e, t) {
    return e.isFile() && mi(e, t);
  }
  o(cr, "checkStat");
  function mi(e, t) {
    var r = e.mode, n = e.uid, i = e.gid, s = t.uid !== void 0 ? t.uid : process.getuid && process.getuid(), a = t.gid !== void 0 ? t.gid : process.
    getgid && process.getgid(), c = parseInt("100", 8), u = parseInt("010", 8), f = parseInt("001", 8), l = c | u, y = r & f || r & u && i ===
    a || r & c && n === s || r & l && s === 0;
    return y;
  }
  o(mi, "checkMode");
});

// ../node_modules/isexe/index.js
var pr = w((qa, lr) => {
  var Ja = require("fs"), se;
  process.platform === "win32" || global.TESTING_WINDOWS ? se = ir() : se = fr();
  lr.exports = $e;
  $e.sync = di;
  function $e(e, t, r) {
    if (typeof t == "function" && (r = t, t = {}), !r) {
      if (typeof Promise != "function")
        throw new TypeError("callback not provided");
      return new Promise(function(n, i) {
        $e(e, t || {}, function(s, a) {
          s ? i(s) : n(a);
        });
      });
    }
    se(e, t || {}, function(n, i) {
      n && (n.code === "EACCES" || t && t.ignoreErrors) && (n = null, i = !1), r(n, i);
    });
  }
  o($e, "isexe");
  function di(e, t) {
    try {
      return se.sync(e, t || {});
    } catch (r) {
      if (t && t.ignoreErrors || r.code === "EACCES")
        return !1;
      throw r;
    }
  }
  o(di, "sync");
});

// ../node_modules/cross-spawn/node_modules/which/which.js
var xr = w((za, br) => {
  var D = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", mr = require("path"), yi = D ? "\
;" : ":", dr = pr(), yr = /* @__PURE__ */ o((e) => Object.assign(new Error(`not found: ${e}`), { code: "ENOENT" }), "getNotFoundError"), hr = /* @__PURE__ */ o(
  (e, t) => {
    let r = t.colon || yi, n = e.match(/\//) || D && e.match(/\\/) ? [""] : [
      // windows always checks the cwd first
      ...D ? [process.cwd()] : [],
      ...(t.path || process.env.PATH || /* istanbul ignore next: very unusual */
      "").split(r)
    ], i = D ? t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", s = D ? i.split(r) : [""];
    return D && e.indexOf(".") !== -1 && s[0] !== "" && s.unshift(""), {
      pathEnv: n,
      pathExt: s,
      pathExtExe: i
    };
  }, "getPathInfo"), gr = /* @__PURE__ */ o((e, t, r) => {
    typeof t == "function" && (r = t, t = {}), t || (t = {});
    let { pathEnv: n, pathExt: i, pathExtExe: s } = hr(e, t), a = [], c = /* @__PURE__ */ o((f) => new Promise((l, y) => {
      if (f === n.length)
        return t.all && a.length ? l(a) : y(yr(e));
      let g = n[f], h = /^".*"$/.test(g) ? g.slice(1, -1) : g, b = mr.join(h, e), m = !h && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + b : b;
      l(u(m, f, 0));
    }), "step"), u = /* @__PURE__ */ o((f, l, y) => new Promise((g, h) => {
      if (y === i.length)
        return g(c(l + 1));
      let b = i[y];
      dr(f + b, { pathExt: s }, (m, x) => {
        if (!m && x)
          if (t.all)
            a.push(f + b);
          else
            return g(f + b);
        return g(u(f, l, y + 1));
      });
    }), "subStep");
    return r ? c(0).then((f) => r(null, f), r) : c(0);
  }, "which"), hi = /* @__PURE__ */ o((e, t) => {
    t = t || {};
    let { pathEnv: r, pathExt: n, pathExtExe: i } = hr(e, t), s = [];
    for (let a = 0; a < r.length; a++) {
      let c = r[a], u = /^".*"$/.test(c) ? c.slice(1, -1) : c, f = mr.join(u, e), l = !u && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + f : f;
      for (let y = 0; y < n.length; y++) {
        let g = l + n[y];
        try {
          if (dr.sync(g, { pathExt: i }))
            if (t.all)
              s.push(g);
            else
              return g;
        } catch {
        }
      }
    }
    if (t.all && s.length)
      return s;
    if (t.nothrow)
      return null;
    throw yr(e);
  }, "whichSync");
  br.exports = gr;
  gr.sync = hi;
});

// ../node_modules/path-key/index.js
var Sr = w((Ka, We) => {
  "use strict";
  var wr = /* @__PURE__ */ o((e = {}) => {
    let t = e.env || process.env;
    return (e.platform || process.platform) !== "win32" ? "PATH" : Object.keys(t).reverse().find((n) => n.toUpperCase() === "PATH") || "Path";
  }, "pathKey");
  We.exports = wr;
  We.exports.default = wr;
});

// ../node_modules/cross-spawn/lib/util/resolveCommand.js
var vr = w((Qa, Pr) => {
  "use strict";
  var kr = require("path"), gi = xr(), bi = Sr();
  function Er(e, t) {
    let r = e.options.env || process.env, n = process.cwd(), i = e.options.cwd != null, s = i && process.chdir !== void 0 && !process.chdir.
    disabled;
    if (s)
      try {
        process.chdir(e.options.cwd);
      } catch {
      }
    let a;
    try {
      a = gi.sync(e.command, {
        path: r[bi({ env: r })],
        pathExt: t ? kr.delimiter : void 0
      });
    } catch {
    } finally {
      s && process.chdir(n);
    }
    return a && (a = kr.resolve(i ? e.options.cwd : "", a)), a;
  }
  o(Er, "resolveCommandAttempt");
  function xi(e) {
    return Er(e) || Er(e, !0);
  }
  o(xi, "resolveCommand");
  Pr.exports = xi;
});

// ../node_modules/cross-spawn/lib/util/escape.js
var Tr = w((ec, Je) => {
  "use strict";
  var He = /([()\][%!^"`<>&|;, *?])/g;
  function wi(e) {
    return e = e.replace(He, "^$1"), e;
  }
  o(wi, "escapeCommand");
  function Si(e, t) {
    return e = `${e}`, e = e.replace(/(\\*)"/g, '$1$1\\"'), e = e.replace(/(\\*)$/, "$1$1"), e = `"${e}"`, e = e.replace(He, "^$1"), t && (e =
    e.replace(He, "^$1")), e;
  }
  o(Si, "escapeArgument");
  Je.exports.command = wi;
  Je.exports.argument = Si;
});

// ../node_modules/shebang-regex/index.js
var Ir = w((rc, Cr) => {
  "use strict";
  Cr.exports = /^#!(.*)/;
});

// ../node_modules/shebang-command/index.js
var Or = w((nc, Ar) => {
  "use strict";
  var ki = Ir();
  Ar.exports = (e = "") => {
    let t = e.match(ki);
    if (!t)
      return null;
    let [r, n] = t[0].replace(/#! ?/, "").split(" "), i = r.split("/").pop();
    return i === "env" ? n : n ? `${i} ${n}` : i;
  };
});

// ../node_modules/cross-spawn/lib/util/readShebang.js
var Rr = w((oc, jr) => {
  "use strict";
  var qe = require("fs"), Ei = Or();
  function Pi(e) {
    let r = Buffer.alloc(150), n;
    try {
      n = qe.openSync(e, "r"), qe.readSync(n, r, 0, 150, 0), qe.closeSync(n);
    } catch {
    }
    return Ei(r.toString());
  }
  o(Pi, "readShebang");
  jr.exports = Pi;
});

// ../node_modules/cross-spawn/lib/parse.js
var Mr = w((sc, _r) => {
  "use strict";
  var vi = require("path"), Nr = vr(), Dr = Tr(), Ti = Rr(), Ci = process.platform === "win32", Ii = /\.(?:com|exe)$/i, Ai = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function Oi(e) {
    e.file = Nr(e);
    let t = e.file && Ti(e.file);
    return t ? (e.args.unshift(e.file), e.command = t, Nr(e)) : e.file;
  }
  o(Oi, "detectShebang");
  function ji(e) {
    if (!Ci)
      return e;
    let t = Oi(e), r = !Ii.test(t);
    if (e.options.forceShell || r) {
      let n = Ai.test(t);
      e.command = vi.normalize(e.command), e.command = Dr.command(e.command), e.args = e.args.map((s) => Dr.argument(s, n));
      let i = [e.command].concat(e.args).join(" ");
      e.args = ["/d", "/s", "/c", `"${i}"`], e.command = process.env.comspec || "cmd.exe", e.options.windowsVerbatimArguments = !0;
    }
    return e;
  }
  o(ji, "parseNonShell");
  function Ri(e, t, r) {
    t && !Array.isArray(t) && (r = t, t = null), t = t ? t.slice(0) : [], r = Object.assign({}, r);
    let n = {
      command: e,
      args: t,
      options: r,
      file: void 0,
      original: {
        command: e,
        args: t
      }
    };
    return r.shell ? n : ji(n);
  }
  o(Ri, "parse");
  _r.exports = Ri;
});

// ../node_modules/cross-spawn/lib/enoent.js
var Br = w((cc, Fr) => {
  "use strict";
  var Ve = process.platform === "win32";
  function ze(e, t) {
    return Object.assign(new Error(`${t} ${e.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${t} ${e.command}`,
      path: e.command,
      spawnargs: e.args
    });
  }
  o(ze, "notFoundError");
  function Ni(e, t) {
    if (!Ve)
      return;
    let r = e.emit;
    e.emit = function(n, i) {
      if (n === "exit") {
        let s = Lr(i, t, "spawn");
        if (s)
          return r.call(e, "error", s);
      }
      return r.apply(e, arguments);
    };
  }
  o(Ni, "hookChildProcess");
  function Lr(e, t) {
    return Ve && e === 1 && !t.file ? ze(t.original, "spawn") : null;
  }
  o(Lr, "verifyENOENT");
  function Di(e, t) {
    return Ve && e === 1 && !t.file ? ze(t.original, "spawnSync") : null;
  }
  o(Di, "verifyENOENTSync");
  Fr.exports = {
    hookChildProcess: Ni,
    verifyENOENT: Lr,
    verifyENOENTSync: Di,
    notFoundError: ze
  };
});

// ../node_modules/cross-spawn/index.js
var $r = w((fc, _) => {
  "use strict";
  var Gr = require("child_process"), Ye = Mr(), Ke = Br();
  function Ur(e, t, r) {
    let n = Ye(e, t, r), i = Gr.spawn(n.command, n.args, n.options);
    return Ke.hookChildProcess(i, n), i;
  }
  o(Ur, "spawn");
  function _i(e, t, r) {
    let n = Ye(e, t, r), i = Gr.spawnSync(n.command, n.args, n.options);
    return i.error = i.error || Ke.verifyENOENTSync(i.status, n), i;
  }
  o(_i, "spawnSync");
  _.exports = Ur;
  _.exports.spawn = Ur;
  _.exports.sync = _i;
  _.exports._parse = Ye;
  _.exports._enoent = Ke;
});

// ../node_modules/merge-stream/index.js
var kn = w((Cu, Sn) => {
  "use strict";
  var { PassThrough: vs } = require("stream");
  Sn.exports = function() {
    var e = [], t = new vs({ objectMode: !0 });
    return t.setMaxListeners(0), t.add = r, t.isEmpty = n, t.on("unpipe", i), Array.prototype.slice.call(arguments).forEach(r), t;
    function r(s) {
      return Array.isArray(s) ? (s.forEach(r), this) : (e.push(s), s.once("end", i.bind(null, s)), s.once("error", t.emit.bind(t, "error")),
      s.pipe(t, { end: !1 }), this);
    }
    o(r, "add");
    function n() {
      return e.length == 0;
    }
    o(n, "isEmpty");
    function i(s) {
      e = e.filter(function(a) {
        return a !== s;
      }), !e.length && t.readable && t.end();
    }
    o(i, "remove");
  };
});

// ../node_modules/common-path-prefix/index.js
var Qn = w((cf, Xn) => {
  "use strict";
  var { sep: Bs } = require("path"), Gs = /* @__PURE__ */ o((e) => {
    for (let t of e) {
      let r = /(\/|\\)/.exec(t);
      if (r !== null) return r[0];
    }
    return Bs;
  }, "determineSeparator");
  Xn.exports = /* @__PURE__ */ o(function(t, r = Gs(t)) {
    let [n = "", ...i] = t;
    if (n === "" || i.length === 0) return "";
    let s = n.split(r), a = s.length;
    for (let u of i) {
      let f = u.split(r);
      for (let l = 0; l < a; l++)
        f[l] !== s[l] && (a = l);
      if (a === 0) return "";
    }
    let c = s.slice(0, a).join(r);
    return c.endsWith(r) ? c : c + r;
  }, "commonPathPrefix");
});

// ../node_modules/fetch-retry/index.js
var No = w((up, Ro) => {
  "use strict";
  Ro.exports = function(e, t) {
    if (t = t || {}, typeof e != "function")
      throw new C("fetch must be a function");
    if (typeof t != "object")
      throw new C("defaults must be an object");
    if (t.retries !== void 0 && !Ce(t.retries))
      throw new C("retries must be a positive integer");
    if (t.retryDelay !== void 0 && !Ce(t.retryDelay) && typeof t.retryDelay != "function")
      throw new C("retryDelay must be a positive integer or a function returning a positive integer");
    if (t.retryOn !== void 0 && !Array.isArray(t.retryOn) && typeof t.retryOn != "function")
      throw new C("retryOn property expects an array or function");
    var r = {
      retries: 3,
      retryDelay: 1e3,
      retryOn: []
    };
    return t = Object.assign(r, t), /* @__PURE__ */ o(function(i, s) {
      var a = t.retries, c = t.retryDelay, u = t.retryOn;
      if (s && s.retries !== void 0)
        if (Ce(s.retries))
          a = s.retries;
        else
          throw new C("retries must be a positive integer");
      if (s && s.retryDelay !== void 0)
        if (Ce(s.retryDelay) || typeof s.retryDelay == "function")
          c = s.retryDelay;
        else
          throw new C("retryDelay must be a positive integer or a function returning a positive integer");
      if (s && s.retryOn)
        if (Array.isArray(s.retryOn) || typeof s.retryOn == "function")
          u = s.retryOn;
        else
          throw new C("retryOn property expects an array or function");
      return new Promise(function(f, l) {
        var y = /* @__PURE__ */ o(function(h) {
          var b = typeof Request < "u" && i instanceof Request ? i.clone() : i;
          e(b, s).then(function(m) {
            if (Array.isArray(u) && u.indexOf(m.status) === -1)
              f(m);
            else if (typeof u == "function")
              try {
                return Promise.resolve(u(h, null, m)).then(function(x) {
                  x ? g(h, null, m) : f(m);
                }).catch(l);
              } catch (x) {
                l(x);
              }
            else
              h < a ? g(h, null, m) : f(m);
          }).catch(function(m) {
            if (typeof u == "function")
              try {
                Promise.resolve(u(h, m, null)).then(function(x) {
                  x ? g(h, m, null) : l(m);
                }).catch(function(x) {
                  l(x);
                });
              } catch (x) {
                l(x);
              }
            else h < a ? g(h, m, null) : l(m);
          });
        }, "wrappedFetch");
        function g(h, b, m) {
          var x = typeof c == "function" ? c(h, b, m) : c;
          setTimeout(function() {
            y(++h);
          }, x);
        }
        o(g, "retry"), y(0);
      });
    }, "fetchRetry");
  };
  function Ce(e) {
    return Number.isInteger(e) && e >= 0;
  }
  o(Ce, "isPositiveInteger");
  function C(e) {
    this.name = "ArgumentError", this.message = e;
  }
  o(C, "ArgumentError");
});

// src/telemetry/index.ts
var xa = {};
Zo(xa, {
  addToGlobalContext: () => qo,
  cleanPaths: () => N,
  computeStorybookMetadata: () => jo,
  getPrecedingUpgrade: () => $o,
  getStorybookMetadata: () => Rt,
  isExampleStoryId: () => ga,
  metaFrameworks: () => Ot,
  oneWayHash: () => Ie,
  removeAnsiEscapeCodes: () => De,
  sanitizeAddonName: () => jt,
  sanitizeError: () => U,
  telemetry: () => ba
});
module.exports = ei(xa);
var Ft = require("@storybook/core/node-logger");

// src/telemetry/notify.ts
var Ne = require("@storybook/core/common"), ne = d($t(), 1);
var Wt = "telemetry-notification-date", R = console, Ht = /* @__PURE__ */ o(async () => {
  await Ne.cache.get(Wt, null) || (Ne.cache.set(Wt, Date.now()), R.log(), R.log(
    `${ne.default.magenta(
      ne.default.bold("attention")
    )} => Storybook now collects completely anonymous telemetry regarding usage.`
  ), R.log("This information is used to shape Storybook's roadmap and prioritize features."), R.log(
    "You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:"
  ), R.log(ne.default.cyan("https://storybook.js.org/telemetry")), R.log());
}, "notify");

// src/telemetry/sanitize.ts
var _e = d(require("node:path"), 1);
function Jt(e) {
  return e.replace(/[-[/{}()*+?.\\^$|]/g, "\\$&");
}
o(Jt, "regexpEscape");
function De(e = "") {
  return e.replace(/\u001B\[[0-9;]*m/g, "");
}
o(De, "removeAnsiEscapeCodes");
function N(e, t = _e.default.sep) {
  if (!e)
    return e;
  let r = process.cwd().split(t);
  for (; r.length > 1; ) {
    let n = r.join(t), i = new RegExp(Jt(n), "gi");
    e = e.replace(i, "$SNIP");
    let s = r.join(t + t), a = new RegExp(Jt(s), "gi");
    e = e.replace(a, "$SNIP"), r.pop();
  }
  return e;
}
o(N, "cleanPaths");
function U(e, t = _e.default.sep) {
  try {
    e = {
      ...JSON.parse(JSON.stringify(e)),
      message: De(e.message),
      stack: De(e.stack),
      cause: e.cause,
      name: e.name
    };
    let r = N(JSON.stringify(e), t);
    return JSON.parse(r);
  } catch (r) {
    return `Sanitization error: ${r?.message}`;
  }
}
o(U, "sanitizeError");

// src/telemetry/storybook-metadata.ts
var Ao = require("node:path"), P = require("@storybook/core/common"), Oo = require("@storybook/core/csf-tools");

// ../node_modules/fd-package-json/dist/esm/main.js
var zt = d(Vt(), 1), Yt = require("node:path"), ie = require("node:fs/promises"), Kt = require("node:fs");
async function ii(e) {
  try {
    return (await (0, ie.stat)(e)).isFile();
  } catch {
    return !1;
  }
}
o(ii, "fileExists");
async function Me(e) {
  for (let t of (0, zt.walkUp)(e)) {
    let r = (0, Yt.resolve)(t, "package.json");
    if (await ii(r))
      return r;
  }
  return null;
}
o(Me, "findPackagePath");
async function Xt(e) {
  let t = await Me(e);
  if (!t)
    return null;
  try {
    let r = await (0, ie.readFile)(t, { encoding: "utf8" });
    return JSON.parse(r);
  } catch {
    return null;
  }
}
o(Xt, "findPackage");

// ../node_modules/package-manager-detector/dist/constants.mjs
var Qt = [
  "npm",
  "yarn",
  "yarn@berry",
  "pnpm",
  "pnpm@6",
  "bun",
  "deno"
], Le = {
  "bun.lock": "bun",
  "bun.lockb": "bun",
  "deno.lock": "deno",
  "pnpm-lock.yaml": "pnpm",
  "yarn.lock": "yarn",
  "package-lock.json": "npm",
  "npm-shrinkwrap.json": "npm"
}, Fe = {
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
var Ge = d(require("node:fs/promises"), 1), T = d(require("node:path"), 1), er = d(require("node:process"), 1);
async function Be(e, t) {
  try {
    let r = await Ge.default.stat(e);
    return t === "file" ? r.isFile() : r.isDirectory();
  } catch {
    return !1;
  }
}
o(Be, "pathExists");
function* si(e = er.default.cwd()) {
  let t = T.default.resolve(e), { root: r } = T.default.parse(t);
  for (; t && t !== r; )
    yield t, t = T.default.dirname(t);
}
o(si, "lookup");
async function Zt(e, t) {
  return !e || !Be(e, "file") ? null : await ci(e, t);
}
o(Zt, "parsePackageJson");
async function Ue(e = {}) {
  let { cwd: t, strategies: r = ["lockfile", "packageManager-field", "devEngines-field"], onUnknown: n } = e;
  for (let i of si(t))
    for (let s of r)
      switch (s) {
        case "lockfile": {
          for (let a of Object.keys(Le))
            if (await Be(T.default.join(i, a), "file")) {
              let c = Le[a], u = await Zt(T.default.join(i, "package.json"), n);
              return u || { name: c, agent: c };
            }
          break;
        }
        case "packageManager-field":
        case "devEngines-field": {
          let a = await Zt(T.default.join(i, "package.json"), n);
          if (a)
            return a;
          break;
        }
        case "install-metadata": {
          for (let a of Object.keys(Fe)) {
            let c = a.endsWith("/") ? "dir" : "file";
            if (await Be(T.default.join(i, a), c)) {
              let u = Fe[a], f = u === "yarn" ? ui(a) ? "yarn" : "yarn@berry" : u;
              return { name: u, agent: f };
            }
          }
          break;
        }
      }
  return null;
}
o(Ue, "detect");
function ai(e) {
  let t = /* @__PURE__ */ o((r) => r?.match(/\d+(\.\d+){0,2}/)?.[0] ?? r, "handelVer");
  if (typeof e.packageManager == "string") {
    let [r, n] = e.packageManager.replace(/^\^/, "").split("@");
    return { name: r, ver: t(n) };
  }
  if (typeof e.devEngines?.packageManager?.name == "string")
    return {
      name: e.devEngines.packageManager.name,
      ver: t(e.devEngines.packageManager.version)
    };
}
o(ai, "getNameAndVer");
async function ci(e, t) {
  try {
    let r = JSON.parse(await Ge.default.readFile(e, "utf8")), n, i = ai(r);
    if (i) {
      let s = i.name, a = i.ver, c = a;
      return s === "yarn" && a && Number.parseInt(a) > 1 ? (n = "yarn@berry", c = "berry", { name: s, agent: n, version: c }) : s === "pnpm" &&
      a && Number.parseInt(a) < 7 ? (n = "pnpm@6", { name: s, agent: n, version: c }) : Qt.includes(s) ? (n = s, { name: s, agent: n, version: c }) :
      t?.(r.packageManager) ?? null;
    }
  } catch {
  }
  return null;
}
o(ci, "handlePackageManager");
function ui(e) {
  return e.endsWith(".yarn_integrity");
}
o(ui, "isMetadataYarnClassic");

// ../node_modules/package-manager-detector/dist/index.mjs
var Ma = require("node:fs/promises"), La = require("node:path"), Fa = require("node:process");

// src/telemetry/get-application-file-count.ts
var yo = require("node:path");

// src/telemetry/exec-command-count-lines.ts
var Yn = require("node:readline");

// ../node_modules/execa/index.js
var $n = require("node:buffer"), Wn = d(require("node:path"), 1), we = d(require("node:child_process"), 1), J = d(require("node:process"), 1),
Hn = d($r(), 1);

// ../node_modules/strip-final-newline/index.js
function Xe(e) {
  let t = typeof e == "string" ? `
` : 10, r = typeof e == "string" ? "\r" : 13;
  return e[e.length - 1] === t && (e = e.slice(0, -1)), e[e.length - 1] === r && (e = e.slice(0, -1)), e;
}
o(Xe, "stripFinalNewline");

// ../node_modules/execa/node_modules/npm-run-path/index.js
var $ = d(require("node:process"), 1), M = d(require("node:path"), 1), Wr = d(require("node:url"), 1);

// ../node_modules/execa/node_modules/path-key/index.js
function ae(e = {}) {
  let {
    env: t = process.env,
    platform: r = process.platform
  } = e;
  return r !== "win32" ? "PATH" : Object.keys(t).reverse().find((n) => n.toUpperCase() === "PATH") || "Path";
}
o(ae, "pathKey");

// ../node_modules/execa/node_modules/npm-run-path/index.js
function Mi(e = {}) {
  let {
    cwd: t = $.default.cwd(),
    path: r = $.default.env[ae()],
    execPath: n = $.default.execPath
  } = e, i, s = t instanceof URL ? Wr.default.fileURLToPath(t) : t, a = M.default.resolve(s), c = [];
  for (; i !== a; )
    c.push(M.default.join(a, "node_modules/.bin")), i = a, a = M.default.resolve(a, "..");
  return c.push(M.default.resolve(s, n, "..")), [...c, r].join(M.default.delimiter);
}
o(Mi, "npmRunPath");
function Hr({ env: e = $.default.env, ...t } = {}) {
  e = { ...e };
  let r = ae({ env: e });
  return t.path = e[r], e[r] = Mi(t), e;
}
o(Hr, "npmRunPathEnv");

// ../node_modules/execa/node_modules/mimic-fn/index.js
var Li = /* @__PURE__ */ o((e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  let i = Object.getOwnPropertyDescriptor(e, r), s = Object.getOwnPropertyDescriptor(t, r);
  !Fi(i, s) && n || Object.defineProperty(e, r, s);
}, "copyProperty"), Fi = /* @__PURE__ */ o(function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable &&
  (e.writable || e.value === t.value);
}, "canCopyProperty"), Bi = /* @__PURE__ */ o((e, t) => {
  let r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, "changePrototype"), Gi = /* @__PURE__ */ o((e, t) => `/* Wrapped ${e}*/
${t}`, "wrappedToString"), Ui = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), $i = Object.getOwnPropertyDescriptor(Function.
prototype.toString, "name"), Wi = /* @__PURE__ */ o((e, t, r) => {
  let n = r === "" ? "" : `with ${r.trim()}() `, i = Gi.bind(null, n, t.toString());
  Object.defineProperty(i, "name", $i), Object.defineProperty(e, "toString", { ...Ui, value: i });
}, "changeToString");
function Qe(e, t, { ignoreNonConfigurable: r = !1 } = {}) {
  let { name: n } = e;
  for (let i of Reflect.ownKeys(t))
    Li(e, t, i, r);
  return Bi(e, t), Wi(e, t, n), e;
}
o(Qe, "mimicFunction");

// ../node_modules/execa/node_modules/onetime/index.js
var ce = /* @__PURE__ */ new WeakMap(), Jr = /* @__PURE__ */ o((e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0, i = e.displayName || e.name || "<anonymous>", s = /* @__PURE__ */ o(function(...a) {
    if (ce.set(s, ++n), n === 1)
      r = e.apply(this, a), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${i}\` can only be called once`);
    return r;
  }, "onetime");
  return Qe(s, e), ce.set(s, n), s;
}, "onetime");
Jr.callCount = (e) => {
  if (!ce.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return ce.get(e);
};
var qr = Jr;

// ../node_modules/execa/lib/error.js
var Zr = d(require("node:process"), 1);

// ../node_modules/execa/node_modules/human-signals/build/src/main.js
var Xr = require("node:os");

// ../node_modules/execa/node_modules/human-signals/build/src/realtime.js
var Vr = /* @__PURE__ */ o(() => {
  let e = Ze - zr + 1;
  return Array.from({ length: e }, Hi);
}, "getRealtimeSignals"), Hi = /* @__PURE__ */ o((e, t) => ({
  name: `SIGRT${t + 1}`,
  number: zr + t,
  action: "terminate",
  description: "Application-specific signal (realtime)",
  standard: "posix"
}), "getRealtimeSignal"), zr = 34, Ze = 64;

// ../node_modules/execa/node_modules/human-signals/build/src/signals.js
var Kr = require("node:os");

// ../node_modules/execa/node_modules/human-signals/build/src/core.js
var Yr = [
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

// ../node_modules/execa/node_modules/human-signals/build/src/signals.js
var et = /* @__PURE__ */ o(() => {
  let e = Vr();
  return [...Yr, ...e].map(Ji);
}, "getSignals"), Ji = /* @__PURE__ */ o(({
  name: e,
  number: t,
  description: r,
  action: n,
  forced: i = !1,
  standard: s
}) => {
  let {
    signals: { [e]: a }
  } = Kr.constants, c = a !== void 0;
  return { name: e, number: c ? a : t, description: r, supported: c, action: n, forced: i, standard: s };
}, "normalizeSignal");

// ../node_modules/execa/node_modules/human-signals/build/src/main.js
var qi = /* @__PURE__ */ o(() => {
  let e = et();
  return Object.fromEntries(e.map(Vi));
}, "getSignalsByName"), Vi = /* @__PURE__ */ o(({
  name: e,
  number: t,
  description: r,
  supported: n,
  action: i,
  forced: s,
  standard: a
}) => [e, { name: e, number: t, description: r, supported: n, action: i, forced: s, standard: a }], "getSignalByName"), Qr = qi(), zi = /* @__PURE__ */ o(
() => {
  let e = et(), t = Ze + 1, r = Array.from(
    { length: t },
    (n, i) => Yi(i, e)
  );
  return Object.assign({}, ...r);
}, "getSignalsByNumber"), Yi = /* @__PURE__ */ o((e, t) => {
  let r = Ki(e, t);
  if (r === void 0)
    return {};
  let { name: n, description: i, supported: s, action: a, forced: c, standard: u } = r;
  return {
    [e]: {
      name: n,
      number: e,
      description: i,
      supported: s,
      action: a,
      forced: c,
      standard: u
    }
  };
}, "getSignalByNumber"), Ki = /* @__PURE__ */ o((e, t) => {
  let r = t.find(({ name: n }) => Xr.constants.signals[n] === e);
  return r !== void 0 ? r : t.find((n) => n.number === e);
}, "findSignalByNumber"), Nc = zi();

// ../node_modules/execa/lib/error.js
var Xi = /* @__PURE__ */ o(({ timedOut: e, timeout: t, errorCode: r, signal: n, signalDescription: i, exitCode: s, isCanceled: a }) => e ? `\
timed out after ${t} milliseconds` : a ? "was canceled" : r !== void 0 ? `failed with ${r}` : n !== void 0 ? `was killed with ${n} (${i})` :
s !== void 0 ? `failed with exit code ${s}` : "failed", "getErrorPrefix"), W = /* @__PURE__ */ o(({
  stdout: e,
  stderr: t,
  all: r,
  error: n,
  signal: i,
  exitCode: s,
  command: a,
  escapedCommand: c,
  timedOut: u,
  isCanceled: f,
  killed: l,
  parsed: { options: { timeout: y, cwd: g = Zr.default.cwd() } }
}) => {
  s = s === null ? void 0 : s, i = i === null ? void 0 : i;
  let h = i === void 0 ? void 0 : Qr[i].description, b = n && n.code, x = `Command ${Xi({ timedOut: u, timeout: y, errorCode: b, signal: i, signalDescription: h,
  exitCode: s, isCanceled: f })}: ${a}`, O = Object.prototype.toString.call(n) === "[object Error]", v = O ? `${x}
${n.message}` : x, j = [v, t, e].filter(Boolean).join(`
`);
  return O ? (n.originalMessage = n.message, n.message = j) : n = new Error(j), n.shortMessage = v, n.command = a, n.escapedCommand = c, n.exitCode =
  s, n.signal = i, n.signalDescription = h, n.stdout = e, n.stderr = t, n.cwd = g, r !== void 0 && (n.all = r), "bufferedData" in n && delete n.
  bufferedData, n.failed = !0, n.timedOut = !!u, n.isCanceled = f, n.killed = l && !u, n;
}, "makeError");

// ../node_modules/execa/lib/stdio.js
var ue = ["stdin", "stdout", "stderr"], Qi = /* @__PURE__ */ o((e) => ue.some((t) => e[t] !== void 0), "hasAlias"), en = /* @__PURE__ */ o((e) => {
  if (!e)
    return;
  let { stdio: t } = e;
  if (t === void 0)
    return ue.map((n) => e[n]);
  if (Qi(e))
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${ue.map((n) => `\`${n}\``).join(", ")}`);
  if (typeof t == "string")
    return t;
  if (!Array.isArray(t))
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);
  let r = Math.max(t.length, ue.length);
  return Array.from({ length: r }, (n, i) => t[i]);
}, "normalizeStdio");

// ../node_modules/execa/lib/kill.js
var rn = d(require("node:os"), 1);

// ../node_modules/execa/node_modules/signal-exit/dist/mjs/signals.js
var I = [];
I.push("SIGHUP", "SIGINT", "SIGTERM");
process.platform !== "win32" && I.push(
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
process.platform === "linux" && I.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");

// ../node_modules/execa/node_modules/signal-exit/dist/mjs/index.js
var fe = /* @__PURE__ */ o((e) => !!e && typeof e == "object" && typeof e.removeListener == "function" && typeof e.emit == "function" && typeof e.
reallyExit == "function" && typeof e.listeners == "function" && typeof e.kill == "function" && typeof e.pid == "number" && typeof e.on == "f\
unction", "processOk"), tt = Symbol.for("signal-exit emitter"), rt = globalThis, Zi = Object.defineProperty.bind(Object), nt = class {
  static {
    o(this, "Emitter");
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
    if (rt[tt])
      return rt[tt];
    Zi(rt, tt, {
      value: this,
      writable: !1,
      enumerable: !1,
      configurable: !1
    });
  }
  on(t, r) {
    this.listeners[t].push(r);
  }
  removeListener(t, r) {
    let n = this.listeners[t], i = n.indexOf(r);
    i !== -1 && (i === 0 && n.length === 1 ? n.length = 0 : n.splice(i, 1));
  }
  emit(t, r, n) {
    if (this.emitted[t])
      return !1;
    this.emitted[t] = !0;
    let i = !1;
    for (let s of this.listeners[t])
      i = s(r, n) === !0 || i;
    return t === "exit" && (i = this.emit("afterExit", r, n) || i), i;
  }
}, le = class {
  static {
    o(this, "SignalExitBase");
  }
}, es = /* @__PURE__ */ o((e) => ({
  onExit(t, r) {
    return e.onExit(t, r);
  },
  load() {
    return e.load();
  },
  unload() {
    return e.unload();
  }
}), "signalExitWrap"), ot = class extends le {
  static {
    o(this, "SignalExitFallback");
  }
  onExit() {
    return () => {
    };
  }
  load() {
  }
  unload() {
  }
}, it = class extends le {
  static {
    o(this, "SignalExit");
  }
  // "SIGHUP" throws an `ENOSYS` error on Windows,
  // so use a supported signal instead
  /* c8 ignore start */
  #s = st.platform === "win32" ? "SIGINT" : "SIGHUP";
  /* c8 ignore stop */
  #t = new nt();
  #e;
  #o;
  #i;
  #n = {};
  #r = !1;
  constructor(t) {
    super(), this.#e = t, this.#n = {};
    for (let r of I)
      this.#n[r] = () => {
        let n = this.#e.listeners(r), { count: i } = this.#t, s = t;
        if (typeof s.__signal_exit_emitter__ == "object" && typeof s.__signal_exit_emitter__.count == "number" && (i += s.__signal_exit_emitter__.
        count), n.length === i) {
          this.unload();
          let a = this.#t.emit("exit", null, r), c = r === "SIGHUP" ? this.#s : r;
          a || t.kill(t.pid, c);
        }
      };
    this.#i = t.reallyExit, this.#o = t.emit;
  }
  onExit(t, r) {
    if (!fe(this.#e))
      return () => {
      };
    this.#r === !1 && this.load();
    let n = r?.alwaysLast ? "afterExit" : "exit";
    return this.#t.on(n, t), () => {
      this.#t.removeListener(n, t), this.#t.listeners.exit.length === 0 && this.#t.listeners.afterExit.length === 0 && this.unload();
    };
  }
  load() {
    if (!this.#r) {
      this.#r = !0, this.#t.count += 1;
      for (let t of I)
        try {
          let r = this.#n[t];
          r && this.#e.on(t, r);
        } catch {
        }
      this.#e.emit = (t, ...r) => this.#c(t, ...r), this.#e.reallyExit = (t) => this.#a(t);
    }
  }
  unload() {
    this.#r && (this.#r = !1, I.forEach((t) => {
      let r = this.#n[t];
      if (!r)
        throw new Error("Listener not defined for signal: " + t);
      try {
        this.#e.removeListener(t, r);
      } catch {
      }
    }), this.#e.emit = this.#o, this.#e.reallyExit = this.#i, this.#t.count -= 1);
  }
  #a(t) {
    return fe(this.#e) ? (this.#e.exitCode = t || 0, this.#t.emit("exit", this.#e.exitCode, null), this.#i.call(this.#e, this.#e.exitCode)) :
    0;
  }
  #c(t, ...r) {
    let n = this.#o;
    if (t === "exit" && fe(this.#e)) {
      typeof r[0] == "number" && (this.#e.exitCode = r[0]);
      let i = n.call(this.#e, t, ...r);
      return this.#t.emit("exit", this.#e.exitCode, null), i;
    } else
      return n.call(this.#e, t, ...r);
  }
}, st = globalThis.process, {
  /**
   * Called when the process is exiting, whether via signal, explicit
   * exit, or running out of stuff to do.
   *
   * If the global process object is not suitable for instrumentation,
   * then this will be a no-op.
   *
   * Returns a function that may be used to unload signal-exit.
   */
  onExit: tn,
  /**
   * Load the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  load: Wc,
  /**
   * Unload the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  unload: Hc
} = es(fe(st) ? new it(st) : new ot());

// ../node_modules/execa/lib/kill.js
var ts = 1e3 * 5, nn = /* @__PURE__ */ o((e, t = "SIGTERM", r = {}) => {
  let n = e(t);
  return rs(e, t, r, n), n;
}, "spawnedKill"), rs = /* @__PURE__ */ o((e, t, r, n) => {
  if (!ns(t, r, n))
    return;
  let i = is(r), s = setTimeout(() => {
    e("SIGKILL");
  }, i);
  s.unref && s.unref();
}, "setKillTimeout"), ns = /* @__PURE__ */ o((e, { forceKillAfterTimeout: t }, r) => os(e) && t !== !1 && r, "shouldForceKill"), os = /* @__PURE__ */ o(
(e) => e === rn.default.constants.signals.SIGTERM || typeof e == "string" && e.toUpperCase() === "SIGTERM", "isSigterm"), is = /* @__PURE__ */ o(
({ forceKillAfterTimeout: e = !0 }) => {
  if (e === !0)
    return ts;
  if (!Number.isFinite(e) || e < 0)
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
  return e;
}, "getForceKillAfterTimeout"), on = /* @__PURE__ */ o((e, t) => {
  e.kill() && (t.isCanceled = !0);
}, "spawnedCancel"), ss = /* @__PURE__ */ o((e, t, r) => {
  e.kill(t), r(Object.assign(new Error("Timed out"), { timedOut: !0, signal: t }));
}, "timeoutKill"), sn = /* @__PURE__ */ o((e, { timeout: t, killSignal: r = "SIGTERM" }, n) => {
  if (t === 0 || t === void 0)
    return n;
  let i, s = new Promise((c, u) => {
    i = setTimeout(() => {
      ss(e, r, u);
    }, t);
  }), a = n.finally(() => {
    clearTimeout(i);
  });
  return Promise.race([s, a]);
}, "setupTimeout"), an = /* @__PURE__ */ o(({ timeout: e }) => {
  if (e !== void 0 && (!Number.isFinite(e) || e < 0))
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
}, "validateTimeout"), cn = /* @__PURE__ */ o(async (e, { cleanup: t, detached: r }, n) => {
  if (!t || r)
    return n;
  let i = tn(() => {
    e.kill();
  });
  return n.finally(() => {
    i();
  });
}, "setExitHandler");

// ../node_modules/execa/lib/pipe.js
var un = require("node:fs"), fn = require("node:child_process");

// ../node_modules/execa/node_modules/is-stream/index.js
function pe(e) {
  return e !== null && typeof e == "object" && typeof e.pipe == "function";
}
o(pe, "isStream");
function at(e) {
  return pe(e) && e.writable !== !1 && typeof e._write == "function" && typeof e._writableState == "object";
}
o(at, "isWritableStream");

// ../node_modules/execa/lib/pipe.js
var as = /* @__PURE__ */ o((e) => e instanceof fn.ChildProcess && typeof e.then == "function", "isExecaChildProcess"), ct = /* @__PURE__ */ o(
(e, t, r) => {
  if (typeof r == "string")
    return e[t].pipe((0, un.createWriteStream)(r)), e;
  if (at(r))
    return e[t].pipe(r), e;
  if (!as(r))
    throw new TypeError("The second argument must be a string, a stream or an Execa child process.");
  if (!at(r.stdin))
    throw new TypeError("The target child process's stdin must be available.");
  return e[t].pipe(r.stdin), r;
}, "pipeToTarget"), ln = /* @__PURE__ */ o((e) => {
  e.stdout !== null && (e.pipeStdout = ct.bind(void 0, e, "stdout")), e.stderr !== null && (e.pipeStderr = ct.bind(void 0, e, "stderr")), e.
  all !== void 0 && (e.pipeAll = ct.bind(void 0, e, "all"));
}, "addPipeMethods");

// ../node_modules/execa/lib/stream.js
var be = require("node:fs"), En = require("node:timers/promises");

// ../node_modules/execa/node_modules/get-stream/source/contents.js
var H = /* @__PURE__ */ o(async (e, { init: t, convertChunk: r, getSize: n, truncateChunk: i, addChunk: s, getFinalChunk: a, finalize: c }, {
maxBuffer: u = Number.POSITIVE_INFINITY } = {}) => {
  if (!us(e))
    throw new Error("The first argument must be a Readable, a ReadableStream, or an async iterable.");
  let f = t();
  f.length = 0;
  try {
    for await (let l of e) {
      let y = fs(l), g = r[y](l, f);
      dn({ convertedChunk: g, state: f, getSize: n, truncateChunk: i, addChunk: s, maxBuffer: u });
    }
    return cs({ state: f, convertChunk: r, getSize: n, truncateChunk: i, addChunk: s, getFinalChunk: a, maxBuffer: u }), c(f);
  } catch (l) {
    throw l.bufferedData = c(f), l;
  }
}, "getStreamContents"), cs = /* @__PURE__ */ o(({ state: e, getSize: t, truncateChunk: r, addChunk: n, getFinalChunk: i, maxBuffer: s }) => {
  let a = i(e);
  a !== void 0 && dn({ convertedChunk: a, state: e, getSize: t, truncateChunk: r, addChunk: n, maxBuffer: s });
}, "appendFinalChunk"), dn = /* @__PURE__ */ o(({ convertedChunk: e, state: t, getSize: r, truncateChunk: n, addChunk: i, maxBuffer: s }) => {
  let a = r(e), c = t.length + a;
  if (c <= s) {
    pn(e, t, i, c);
    return;
  }
  let u = n(e, s - t.length);
  throw u !== void 0 && pn(u, t, i, s), new me();
}, "appendChunk"), pn = /* @__PURE__ */ o((e, t, r, n) => {
  t.contents = r(e, t, n), t.length = n;
}, "addNewChunk"), us = /* @__PURE__ */ o((e) => typeof e == "object" && e !== null && typeof e[Symbol.asyncIterator] == "function", "isAsyn\
cIterable"), fs = /* @__PURE__ */ o((e) => {
  let t = typeof e;
  if (t === "string")
    return "string";
  if (t !== "object" || e === null)
    return "others";
  if (globalThis.Buffer?.isBuffer(e))
    return "buffer";
  let r = mn.call(e);
  return r === "[object ArrayBuffer]" ? "arrayBuffer" : r === "[object DataView]" ? "dataView" : Number.isInteger(e.byteLength) && Number.isInteger(
  e.byteOffset) && mn.call(e.buffer) === "[object ArrayBuffer]" ? "typedArray" : "others";
}, "getChunkType"), { toString: mn } = Object.prototype, me = class extends Error {
  static {
    o(this, "MaxBufferError");
  }
  name = "MaxBufferError";
  constructor() {
    super("maxBuffer exceeded");
  }
};

// ../node_modules/execa/node_modules/get-stream/source/utils.js
var ut = /* @__PURE__ */ o((e) => e, "identity"), ft = /* @__PURE__ */ o(() => {
}, "noop"), lt = /* @__PURE__ */ o(({ contents: e }) => e, "getContentsProp"), de = /* @__PURE__ */ o((e) => {
  throw new Error(`Streams in object mode are not supported: ${String(e)}`);
}, "throwObjectStream"), ye = /* @__PURE__ */ o((e) => e.length, "getLengthProp");

// ../node_modules/execa/node_modules/get-stream/source/array-buffer.js
async function pt(e, t) {
  return H(e, xs, t);
}
o(pt, "getStreamAsArrayBuffer");
var ls = /* @__PURE__ */ o(() => ({ contents: new ArrayBuffer(0) }), "initArrayBuffer"), ps = /* @__PURE__ */ o((e) => ms.encode(e), "useTex\
tEncoder"), ms = new TextEncoder(), yn = /* @__PURE__ */ o((e) => new Uint8Array(e), "useUint8Array"), hn = /* @__PURE__ */ o((e) => new Uint8Array(
e.buffer, e.byteOffset, e.byteLength), "useUint8ArrayWithOffset"), ds = /* @__PURE__ */ o((e, t) => e.slice(0, t), "truncateArrayBufferChunk"),
ys = /* @__PURE__ */ o((e, { contents: t, length: r }, n) => {
  let i = xn() ? gs(t, n) : hs(t, n);
  return new Uint8Array(i).set(e, r), i;
}, "addArrayBufferChunk"), hs = /* @__PURE__ */ o((e, t) => {
  if (t <= e.byteLength)
    return e;
  let r = new ArrayBuffer(bn(t));
  return new Uint8Array(r).set(new Uint8Array(e), 0), r;
}, "resizeArrayBufferSlow"), gs = /* @__PURE__ */ o((e, t) => {
  if (t <= e.maxByteLength)
    return e.resize(t), e;
  let r = new ArrayBuffer(t, { maxByteLength: bn(t) });
  return new Uint8Array(r).set(new Uint8Array(e), 0), r;
}, "resizeArrayBuffer"), bn = /* @__PURE__ */ o((e) => gn ** Math.ceil(Math.log(e) / Math.log(gn)), "getNewContentsLength"), gn = 2, bs = /* @__PURE__ */ o(
({ contents: e, length: t }) => xn() ? e : e.slice(0, t), "finalizeArrayBuffer"), xn = /* @__PURE__ */ o(() => "resize" in ArrayBuffer.prototype,
"hasArrayBufferResize"), xs = {
  init: ls,
  convertChunk: {
    string: ps,
    buffer: yn,
    arrayBuffer: yn,
    dataView: hn,
    typedArray: hn,
    others: de
  },
  getSize: ye,
  truncateChunk: ds,
  addChunk: ys,
  getFinalChunk: ft,
  finalize: bs
};

// ../node_modules/execa/node_modules/get-stream/source/buffer.js
async function he(e, t) {
  if (!("Buffer" in globalThis))
    throw new Error("getStreamAsBuffer() is only supported in Node.js");
  try {
    return wn(await pt(e, t));
  } catch (r) {
    throw r.bufferedData !== void 0 && (r.bufferedData = wn(r.bufferedData)), r;
  }
}
o(he, "getStreamAsBuffer");
var wn = /* @__PURE__ */ o((e) => globalThis.Buffer.from(e), "arrayBufferToNodeBuffer");

// ../node_modules/execa/node_modules/get-stream/source/string.js
async function mt(e, t) {
  return H(e, Ps, t);
}
o(mt, "getStreamAsString");
var ws = /* @__PURE__ */ o(() => ({ contents: "", textDecoder: new TextDecoder() }), "initString"), ge = /* @__PURE__ */ o((e, { textDecoder: t }) => t.
decode(e, { stream: !0 }), "useTextDecoder"), Ss = /* @__PURE__ */ o((e, { contents: t }) => t + e, "addStringChunk"), ks = /* @__PURE__ */ o(
(e, t) => e.slice(0, t), "truncateStringChunk"), Es = /* @__PURE__ */ o(({ textDecoder: e }) => {
  let t = e.decode();
  return t === "" ? void 0 : t;
}, "getFinalStringChunk"), Ps = {
  init: ws,
  convertChunk: {
    string: ut,
    buffer: ge,
    arrayBuffer: ge,
    dataView: ge,
    typedArray: ge,
    others: de
  },
  getSize: ye,
  truncateChunk: ks,
  addChunk: Ss,
  getFinalChunk: Es,
  finalize: lt
};

// ../node_modules/execa/lib/stream.js
var Pn = d(kn(), 1);
var vn = /* @__PURE__ */ o((e) => {
  if (e !== void 0)
    throw new TypeError("The `input` and `inputFile` options cannot be both set.");
}, "validateInputOptions"), Ts = /* @__PURE__ */ o(({ input: e, inputFile: t }) => typeof t != "string" ? e : (vn(e), (0, be.readFileSync)(t)),
"getInputSync"), Tn = /* @__PURE__ */ o((e) => {
  let t = Ts(e);
  if (pe(t))
    throw new TypeError("The `input` option cannot be a stream in sync mode");
  return t;
}, "handleInputSync"), Cs = /* @__PURE__ */ o(({ input: e, inputFile: t }) => typeof t != "string" ? e : (vn(e), (0, be.createReadStream)(t)),
"getInput"), Cn = /* @__PURE__ */ o((e, t) => {
  let r = Cs(t);
  r !== void 0 && (pe(r) ? r.pipe(e.stdin) : e.stdin.end(r));
}, "handleInput"), In = /* @__PURE__ */ o((e, { all: t }) => {
  if (!t || !e.stdout && !e.stderr)
    return;
  let r = (0, Pn.default)();
  return e.stdout && r.add(e.stdout), e.stderr && r.add(e.stderr), r;
}, "makeAllStream"), dt = /* @__PURE__ */ o(async (e, t) => {
  if (!(!e || t === void 0)) {
    await (0, En.setTimeout)(0), e.destroy();
    try {
      return await t;
    } catch (r) {
      return r.bufferedData;
    }
  }
}, "getBufferedData"), yt = /* @__PURE__ */ o((e, { encoding: t, buffer: r, maxBuffer: n }) => {
  if (!(!e || !r))
    return t === "utf8" || t === "utf-8" ? mt(e, { maxBuffer: n }) : t === null || t === "buffer" ? he(e, { maxBuffer: n }) : Is(e, n, t);
}, "getStreamPromise"), Is = /* @__PURE__ */ o(async (e, t, r) => (await he(e, { maxBuffer: t })).toString(r), "applyEncoding"), An = /* @__PURE__ */ o(
async ({ stdout: e, stderr: t, all: r }, { encoding: n, buffer: i, maxBuffer: s }, a) => {
  let c = yt(e, { encoding: n, buffer: i, maxBuffer: s }), u = yt(t, { encoding: n, buffer: i, maxBuffer: s }), f = yt(r, { encoding: n, buffer: i,
  maxBuffer: s * 2 });
  try {
    return await Promise.all([a, c, u, f]);
  } catch (l) {
    return Promise.all([
      { error: l, signal: l.signal, timedOut: l.timedOut },
      dt(e, c),
      dt(t, u),
      dt(r, f)
    ]);
  }
}, "getSpawnedResult");

// ../node_modules/execa/lib/promise.js
var As = (async () => {
})().constructor.prototype, Os = ["then", "catch", "finally"].map((e) => [
  e,
  Reflect.getOwnPropertyDescriptor(As, e)
]), ht = /* @__PURE__ */ o((e, t) => {
  for (let [r, n] of Os) {
    let i = typeof t == "function" ? (...s) => Reflect.apply(n.value, t(), s) : n.value.bind(t);
    Reflect.defineProperty(e, r, { ...n, value: i });
  }
}, "mergePromise"), On = /* @__PURE__ */ o((e) => new Promise((t, r) => {
  e.on("exit", (n, i) => {
    t({ exitCode: n, signal: i });
  }), e.on("error", (n) => {
    r(n);
  }), e.stdin && e.stdin.on("error", (n) => {
    r(n);
  });
}), "getSpawnedPromise");

// ../node_modules/execa/lib/command.js
var Nn = require("node:buffer"), Dn = require("node:child_process");
var _n = /* @__PURE__ */ o((e, t = []) => Array.isArray(t) ? [e, ...t] : [e], "normalizeArgs"), js = /^[\w.-]+$/, Rs = /* @__PURE__ */ o((e) => typeof e !=
"string" || js.test(e) ? e : `"${e.replaceAll('"', '\\"')}"`, "escapeArg"), gt = /* @__PURE__ */ o((e, t) => _n(e, t).join(" "), "joinComman\
d"), bt = /* @__PURE__ */ o((e, t) => _n(e, t).map((r) => Rs(r)).join(" "), "getEscapedCommand"), Mn = / +/g, Ln = /* @__PURE__ */ o((e) => {
  let t = [];
  for (let r of e.trim().split(Mn)) {
    let n = t.at(-1);
    n && n.endsWith("\\") ? t[t.length - 1] = `${n.slice(0, -1)} ${r}` : t.push(r);
  }
  return t;
}, "parseCommand"), jn = /* @__PURE__ */ o((e) => {
  let t = typeof e;
  if (t === "string")
    return e;
  if (t === "number")
    return String(e);
  if (t === "object" && e !== null && !(e instanceof Dn.ChildProcess) && "stdout" in e) {
    let r = typeof e.stdout;
    if (r === "string")
      return e.stdout;
    if (Nn.Buffer.isBuffer(e.stdout))
      return e.stdout.toString();
    throw new TypeError(`Unexpected "${r}" stdout in template expression`);
  }
  throw new TypeError(`Unexpected "${t}" in template expression`);
}, "parseExpression"), Rn = /* @__PURE__ */ o((e, t, r) => r || e.length === 0 || t.length === 0 ? [...e, ...t] : [
  ...e.slice(0, -1),
  `${e.at(-1)}${t[0]}`,
  ...t.slice(1)
], "concatTokens"), Ns = /* @__PURE__ */ o(({ templates: e, expressions: t, tokens: r, index: n, template: i }) => {
  let s = i ?? e.raw[n], a = s.split(Mn).filter(Boolean), c = Rn(
    r,
    a,
    s.startsWith(" ")
  );
  if (n === t.length)
    return c;
  let u = t[n], f = Array.isArray(u) ? u.map((l) => jn(l)) : [jn(u)];
  return Rn(
    c,
    f,
    s.endsWith(" ")
  );
}, "parseTemplate"), xt = /* @__PURE__ */ o((e, t) => {
  let r = [];
  for (let [n, i] of e.entries())
    r = Ns({ templates: e, expressions: t, tokens: r, index: n, template: i });
  return r;
}, "parseTemplates");

// ../node_modules/execa/lib/verbose.js
var Fn = require("node:util"), Bn = d(require("node:process"), 1);
var Gn = (0, Fn.debuglog)("execa").enabled, xe = /* @__PURE__ */ o((e, t) => String(e).padStart(t, "0"), "padField"), Ds = /* @__PURE__ */ o(
() => {
  let e = /* @__PURE__ */ new Date();
  return `${xe(e.getHours(), 2)}:${xe(e.getMinutes(), 2)}:${xe(e.getSeconds(), 2)}.${xe(e.getMilliseconds(), 3)}`;
}, "getTimestamp"), wt = /* @__PURE__ */ o((e, { verbose: t }) => {
  t && Bn.default.stderr.write(`[${Ds()}] ${e}
`);
}, "logCommand");

// ../node_modules/execa/index.js
var _s = 1e3 * 1e3 * 100, Ms = /* @__PURE__ */ o(({ env: e, extendEnv: t, preferLocal: r, localDir: n, execPath: i }) => {
  let s = t ? { ...J.default.env, ...e } : e;
  return r ? Hr({ env: s, cwd: n, execPath: i }) : s;
}, "getEnv"), Jn = /* @__PURE__ */ o((e, t, r = {}) => {
  let n = Hn.default._parse(e, t, r);
  return e = n.command, t = n.args, r = n.options, r = {
    maxBuffer: _s,
    buffer: !0,
    stripFinalNewline: !0,
    extendEnv: !0,
    preferLocal: !1,
    localDir: r.cwd || J.default.cwd(),
    execPath: J.default.execPath,
    encoding: "utf8",
    reject: !0,
    cleanup: !0,
    all: !1,
    windowsHide: !0,
    verbose: Gn,
    ...r
  }, r.env = Ms(r), r.stdio = en(r), J.default.platform === "win32" && Wn.default.basename(e, ".exe") === "cmd" && t.unshift("/q"), { file: e,
  args: t, options: r, parsed: n };
}, "handleArguments"), q = /* @__PURE__ */ o((e, t, r) => typeof t != "string" && !$n.Buffer.isBuffer(t) ? r === void 0 ? void 0 : "" : e.stripFinalNewline ?
Xe(t) : t, "handleOutput");
function qn(e, t, r) {
  let n = Jn(e, t, r), i = gt(e, t), s = bt(e, t);
  wt(s, n.options), an(n.options);
  let a;
  try {
    a = we.default.spawn(n.file, n.args, n.options);
  } catch (h) {
    let b = new we.default.ChildProcess(), m = Promise.reject(W({
      error: h,
      stdout: "",
      stderr: "",
      all: "",
      command: i,
      escapedCommand: s,
      parsed: n,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    }));
    return ht(b, m), b;
  }
  let c = On(a), u = sn(a, n.options, c), f = cn(a, n.options, u), l = { isCanceled: !1 };
  a.kill = nn.bind(null, a.kill.bind(a)), a.cancel = on.bind(null, a, l);
  let g = qr(/* @__PURE__ */ o(async () => {
    let [{ error: h, exitCode: b, signal: m, timedOut: x }, O, v, j] = await An(a, n.options, f), Z = q(n.options, O), ee = q(n.options, v),
    p = q(n.options, j);
    if (h || b !== 0 || m !== null) {
      let S = W({
        error: h,
        exitCode: b,
        signal: m,
        stdout: Z,
        stderr: ee,
        all: p,
        command: i,
        escapedCommand: s,
        parsed: n,
        timedOut: x,
        isCanceled: l.isCanceled || (n.options.signal ? n.options.signal.aborted : !1),
        killed: a.killed
      });
      if (!n.options.reject)
        return S;
      throw S;
    }
    return {
      command: i,
      escapedCommand: s,
      exitCode: 0,
      stdout: Z,
      stderr: ee,
      all: p,
      failed: !1,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    };
  }, "handlePromise"));
  return Cn(a, n.options), a.all = In(a, n.options), ln(a), ht(a, g), a;
}
o(qn, "execa");
function Ls(e, t, r) {
  let n = Jn(e, t, r), i = gt(e, t), s = bt(e, t);
  wt(s, n.options);
  let a = Tn(n.options), c;
  try {
    c = we.default.spawnSync(n.file, n.args, { ...n.options, input: a });
  } catch (l) {
    throw W({
      error: l,
      stdout: "",
      stderr: "",
      all: "",
      command: i,
      escapedCommand: s,
      parsed: n,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    });
  }
  let u = q(n.options, c.stdout, c.error), f = q(n.options, c.stderr, c.error);
  if (c.error || c.status !== 0 || c.signal !== null) {
    let l = W({
      stdout: u,
      stderr: f,
      error: c.error,
      signal: c.signal,
      exitCode: c.status,
      command: i,
      escapedCommand: s,
      parsed: n,
      timedOut: c.error && c.error.code === "ETIMEDOUT",
      isCanceled: !1,
      killed: c.signal !== null
    });
    if (!n.options.reject)
      return l;
    throw l;
  }
  return {
    command: i,
    escapedCommand: s,
    exitCode: 0,
    stdout: u,
    stderr: f,
    failed: !1,
    timedOut: !1,
    isCanceled: !1,
    killed: !1
  };
}
o(Ls, "execaSync");
var Fs = /* @__PURE__ */ o(({ input: e, inputFile: t, stdio: r }) => e === void 0 && t === void 0 && r === void 0 ? { stdin: "inherit" } : {},
"normalizeScriptStdin"), Un = /* @__PURE__ */ o((e = {}) => ({
  preferLocal: !0,
  ...Fs(e),
  ...e
}), "normalizeScriptOptions");
function Vn(e) {
  function t(r, ...n) {
    if (!Array.isArray(r))
      return Vn({ ...e, ...r });
    let [i, ...s] = xt(r, n);
    return qn(i, s, Un(e));
  }
  return o(t, "$"), t.sync = (r, ...n) => {
    if (!Array.isArray(r))
      throw new TypeError("Please use $(options).sync`command` instead of $.sync(options)`command`.");
    let [i, ...s] = xt(r, n);
    return Ls(i, s, Un(e));
  }, t;
}
o(Vn, "create$");
var Xu = Vn();
function zn(e, t) {
  let [r, ...n] = Ln(e);
  return qn(r, n, t);
}
o(zn, "execaCommand");

// src/telemetry/exec-command-count-lines.ts
async function Se(e, t) {
  let r = zn(e, { shell: !0, buffer: !1, ...t });
  if (!r.stdout)
    throw new Error("Unexpected missing stdout");
  let n = 0, i = (0, Yn.createInterface)(r.stdout);
  return i.on("line", () => {
    n += 1;
  }), await r, i.close(), n;
}
o(Se, "execCommandCountLines");

// ../node_modules/slash/index.js
function St(e) {
  return e.startsWith("\\\\?\\") ? e : e.replace(/\\/g, "/");
}
o(St, "slash");

// src/common/utils/file-cache.ts
var V = require("node:crypto"), k = require("node:fs"), E = require("node:fs/promises"), Kn = require("node:os"), L = require("node:path");
var kt = class {
  static {
    o(this, "FileSystemCache");
  }
  constructor(t = {}) {
    this.prefix = (t.ns || t.prefix || "") + "-", this.hash_alg = t.hash_alg || "md5", this.cache_dir = t.basePath || (0, L.join)((0, Kn.tmpdir)(),
    (0, V.randomBytes)(15).toString("base64").replace(/\//g, "-")), this.ttl = t.ttl || 0, (0, V.createHash)(this.hash_alg), (0, k.mkdirSync)(
    this.cache_dir, { recursive: !0 });
  }
  generateHash(t) {
    return (0, L.join)(this.cache_dir, this.prefix + (0, V.createHash)(this.hash_alg).update(t).digest("hex"));
  }
  isExpired(t, r) {
    return t.ttl != null && r > t.ttl;
  }
  parseCacheData(t, r) {
    let n = JSON.parse(t);
    return this.isExpired(n, Date.now()) ? r : n.content;
  }
  parseSetData(t, r, n = {}) {
    let i = n.ttl ?? this.ttl;
    return JSON.stringify({ key: t, content: r, ...i && { ttl: Date.now() + i * 1e3 } });
  }
  async get(t, r) {
    try {
      let n = await (0, E.readFile)(this.generateHash(t), "utf8");
      return this.parseCacheData(n, r);
    } catch {
      return r;
    }
  }
  getSync(t, r) {
    try {
      let n = (0, k.readFileSync)(this.generateHash(t), "utf8");
      return this.parseCacheData(n, r);
    } catch {
      return r;
    }
  }
  async set(t, r, n = {}) {
    let i = typeof n == "number" ? { ttl: n } : n;
    (0, k.mkdirSync)(this.cache_dir, { recursive: !0 }), await (0, E.writeFile)(this.generateHash(t), this.parseSetData(t, r, i), {
      encoding: i.encoding || "utf8"
    });
  }
  setSync(t, r, n = {}) {
    let i = typeof n == "number" ? { ttl: n } : n;
    (0, k.mkdirSync)(this.cache_dir, { recursive: !0 }), (0, k.writeFileSync)(this.generateHash(t), this.parseSetData(t, r, i), {
      encoding: i.encoding || "utf8"
    });
  }
  async setMany(t, r) {
    await Promise.all(t.map((n) => this.set(n.key, n.content ?? n.value, r)));
  }
  setManySync(t, r) {
    t.forEach((n) => this.setSync(n.key, n.content ?? n.value, r));
  }
  async remove(t) {
    await (0, E.rm)(this.generateHash(t), { force: !0 });
  }
  removeSync(t) {
    (0, k.rmSync)(this.generateHash(t), { force: !0 });
  }
  async clear() {
    let t = await (0, E.readdir)(this.cache_dir);
    await Promise.all(
      t.filter((r) => r.startsWith(this.prefix)).map((r) => (0, E.rm)((0, L.join)(this.cache_dir, r), { force: !0 }))
    );
  }
  clearSync() {
    (0, k.readdirSync)(this.cache_dir).filter((t) => t.startsWith(this.prefix)).forEach((t) => (0, k.rmSync)((0, L.join)(this.cache_dir, t),
    { force: !0 }));
  }
  async getAll() {
    let t = Date.now(), r = await (0, E.readdir)(this.cache_dir);
    return (await Promise.all(
      r.filter((i) => i.startsWith(this.prefix)).map((i) => (0, E.readFile)((0, L.join)(this.cache_dir, i), "utf8"))
    )).map((i) => JSON.parse(i)).filter((i) => i.content && !this.isExpired(i, t));
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
function Et(e) {
  return new kt(e);
}
o(Et, "createFileSystemCache");

// src/common/utils/resolve-path-in-sb-cache.ts
var Ct = require("node:path");

// ../node_modules/find-cache-dir/index.js
var fo = d(require("node:process"), 1), F = d(require("node:path"), 1), Y = d(require("node:fs"), 1), lo = d(Qn(), 1);

// ../node_modules/pkg-dir/index.js
var so = d(require("node:path"), 1);

// ../node_modules/pkg-dir/node_modules/find-up/index.js
var z = d(require("node:path"), 1), oo = require("node:url");

// ../node_modules/locate-path/index.js
var Zn = d(require("node:process"), 1), eo = d(require("node:path"), 1), ke = d(require("node:fs"), 1), to = require("node:url");
var ro = {
  directory: "isDirectory",
  file: "isFile"
};
function Us(e) {
  if (!Object.hasOwnProperty.call(ro, e))
    throw new Error(`Invalid type specified: ${e}`);
}
o(Us, "checkType");
var $s = /* @__PURE__ */ o((e, t) => t[ro[e]](), "matchType"), Ws = /* @__PURE__ */ o((e) => e instanceof URL ? (0, to.fileURLToPath)(e) : e,
"toPath");
function Pt(e, {
  cwd: t = Zn.default.cwd(),
  type: r = "file",
  allowSymlinks: n = !0
} = {}) {
  Us(r), t = Ws(t);
  let i = n ? ke.default.statSync : ke.default.lstatSync;
  for (let s of e)
    try {
      let a = i(eo.default.resolve(t, s), {
        throwIfNoEntry: !1
      });
      if (!a)
        continue;
      if ($s(r, a))
        return s;
    } catch {
    }
}
o(Pt, "locatePathSync");

// ../node_modules/pkg-dir/node_modules/path-exists/index.js
var no = d(require("node:fs"), 1);

// ../node_modules/pkg-dir/node_modules/find-up/index.js
var Hs = /* @__PURE__ */ o((e) => e instanceof URL ? (0, oo.fileURLToPath)(e) : e, "toPath"), Js = Symbol("findUpStop");
function qs(e, t = {}) {
  let r = z.default.resolve(Hs(t.cwd) || ""), { root: n } = z.default.parse(r), i = t.stopAt || n, s = t.limit || Number.POSITIVE_INFINITY, a = [
  e].flat(), c = /* @__PURE__ */ o((f) => {
    if (typeof e != "function")
      return Pt(a, f);
    let l = e(f.cwd);
    return typeof l == "string" ? Pt([l], f) : l;
  }, "runMatcher"), u = [];
  for (; ; ) {
    let f = c({ ...t, cwd: r });
    if (f === Js || (f && u.push(z.default.resolve(r, f)), r === i || u.length >= s))
      break;
    r = z.default.dirname(r);
  }
  return u;
}
o(qs, "findUpMultipleSync");
function io(e, t = {}) {
  return qs(e, { ...t, limit: 1 })[0];
}
o(io, "findUpSync");

// ../node_modules/pkg-dir/index.js
function ao({ cwd: e } = {}) {
  let t = io("package.json", { cwd: e });
  return t && so.default.dirname(t);
}
o(ao, "packageDirectorySync");

// ../node_modules/find-cache-dir/index.js
var { env: vt, cwd: Vs } = fo.default, co = /* @__PURE__ */ o((e) => {
  try {
    return Y.default.accessSync(e, Y.default.constants.W_OK), !0;
  } catch {
    return !1;
  }
}, "isWritable");
function uo(e, t) {
  return t.create && Y.default.mkdirSync(e, { recursive: !0 }), e;
}
o(uo, "useDirectory");
function zs(e) {
  let t = F.default.join(e, "node_modules");
  if (!(!co(t) && (Y.default.existsSync(t) || !co(F.default.join(e)))))
    return t;
}
o(zs, "getNodeModuleDirectory");
function Tt(e = {}) {
  if (vt.CACHE_DIR && !["true", "false", "1", "0"].includes(vt.CACHE_DIR))
    return uo(F.default.join(vt.CACHE_DIR, e.name), e);
  let { cwd: t = Vs(), files: r } = e;
  if (r) {
    if (!Array.isArray(r))
      throw new TypeError(`Expected \`files\` option to be an array, got \`${typeof r}\`.`);
    t = (0, lo.default)(r.map((i) => F.default.resolve(t, i)));
  }
  if (t = ao({ cwd: t }), !(!t || !zs(t)))
    return uo(F.default.join(t, "node_modules", ".cache", e.name), e);
}
o(Tt, "findCacheDirectory");

// src/common/utils/resolve-path-in-sb-cache.ts
function po(e, t = "default") {
  let r = Tt({ name: "storybook" });
  return r ||= (0, Ct.join)(process.cwd(), "node_modules", ".cache", "storybook"), (0, Ct.join)(r, t, e);
}
o(po, "resolvePathInStorybookCache");

// src/telemetry/run-telemetry-operation.ts
var mo = Et({
  basePath: po("telemetry"),
  ns: "storybook",
  ttl: 24 * 60 * 60 * 1e3
  // 24h
}), Ee = /* @__PURE__ */ o(async (e, t) => {
  let r = await mo.get(e);
  return r === void 0 && (r = await t(), r !== void 0 && await mo.set(e, r)), r;
}, "runTelemetryOperation");

// src/telemetry/get-application-file-count.ts
var Ys = ["page", "screen"], Ks = ["js", "jsx", "ts", "tsx"], Xs = /* @__PURE__ */ o(async (e) => {
  let r = Ys.flatMap((n) => [
    n,
    [n[0].toUpperCase(), ...n.slice(1)].join("")
  ]).flatMap(
    (n) => Ks.map((i) => `"${e}${yo.sep}*${n}*.${i}"`)
  );
  try {
    let n = `git ls-files -- ${r.join(" ")}`;
    return await Se(n);
  } catch {
    return;
  }
}, "getApplicationFilesCountUncached"), ho = /* @__PURE__ */ o(async (e) => Ee(
  "applicationFiles",
  async () => Xs(e)
), "getApplicationFileCount");

// src/telemetry/get-chromatic-version.ts
function go(e) {
  let t = e.dependencies?.chromatic || e.devDependencies?.chromatic || e.peerDependencies?.chromatic;
  return t || (e.scripts && Object.values(e.scripts).find((r) => r?.match(/chromatic/)) ? "latest" : void 0);
}
o(go, "getChromaticVersionSpecifier");

// src/telemetry/get-framework-info.ts
var So = require("node:path"), ko = require("@storybook/core/common");

// src/telemetry/package-json.ts
var bo = require("node:fs/promises"), xo = require("node:path");
var It = /* @__PURE__ */ o(async (e) => {
  let t = Object.keys(e);
  return Promise.all(t.map(Pe));
}, "getActualPackageVersions"), Pe = /* @__PURE__ */ o(async (e) => {
  try {
    let t = await At(e);
    return {
      name: e,
      version: t.version
    };
  } catch {
    return { name: e, version: null };
  }
}, "getActualPackageVersion"), At = /* @__PURE__ */ o(async (e) => {
  let t = require.resolve((0, xo.join)(e, "package.json"), {
    paths: [process.cwd()]
  });
  return JSON.parse(await (0, bo.readFile)(t, { encoding: "utf8" }));
}, "getActualPackageJson");

// src/telemetry/get-framework-info.ts
var Qs = [
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
], Zs = ["builder-webpack5", "builder-vite"];
function wo(e, t) {
  let { name: r = "", version: n, dependencies: i, devDependencies: s, peerDependencies: a } = e, c = {
    // We include the framework itself because it may be a renderer too (e.g. angular)
    [r]: n,
    ...i,
    ...s,
    ...a
  };
  return t.map((u) => `@storybook/${u}`).find((u) => c[u]);
}
o(wo, "findMatchingPackage");
var ea = /* @__PURE__ */ o((e) => {
  let t = (0, So.normalize)(e).replace(new RegExp(/\\/, "g"), "/");
  return Object.keys(ko.frameworkPackages).find((n) => t.endsWith(n)) || N(e).replace(/.*node_modules[\\/]/, "");
}, "getFrameworkPackageName");
async function Eo(e) {
  if (!e?.framework)
    return {};
  let t = typeof e.framework == "string" ? e.framework : e.framework?.name;
  if (!t)
    return {};
  let r = await At(t);
  if (!r)
    return {};
  let n = wo(r, Zs), i = wo(r, Qs), s = ea(t), a = typeof e.framework == "object" ? e.framework.options : {};
  return {
    framework: {
      name: s,
      options: a
    },
    builder: n,
    renderer: i
  };
}
o(Eo, "getFrameworkInfo");

// src/telemetry/get-has-router-package.ts
var ta = /* @__PURE__ */ new Set([
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
function Po(e) {
  return Object.keys(e?.dependencies ?? {}).some(
    (t) => ta.has(t)
  );
}
o(Po, "getHasRouterPackage");

// src/telemetry/get-monorepo-type.ts
var K = require("node:fs"), ve = require("node:path"), To = require("@storybook/core/common");
var vo = {
  Nx: "nx.json",
  Turborepo: "turbo.json",
  Lerna: "lerna.json",
  Rush: "rush.json",
  Lage: "lage.config.json"
}, Co = /* @__PURE__ */ o(() => {
  let e = (0, To.getProjectRoot)();
  if (!e)
    return;
  let r = Object.keys(vo).find((i) => {
    let s = (0, ve.join)(e, vo[i]);
    return (0, K.existsSync)(s);
  });
  if (r)
    return r;
  if (!(0, K.existsSync)((0, ve.join)(e, "package.json")))
    return;
  if (JSON.parse(
    (0, K.readFileSync)((0, ve.join)(e, "package.json"), { encoding: "utf8" })
  )?.workspaces)
    return "Workspaces";
}, "getMonorepoType");

// src/telemetry/get-portable-stories-usage.ts
var ra = /* @__PURE__ */ o(async (e) => {
  try {
    let t = "git grep -l composeStor" + (e ? ` -- ${e}` : "");
    return await Se(t);
  } catch (t) {
    return t.exitCode === 1 ? 0 : void 0;
  }
}, "getPortableStoriesFileCountUncached"), Io = /* @__PURE__ */ o(async (e) => Ee(
  "portableStories",
  async () => ra(e)
), "getPortableStoriesFileCount");

// src/telemetry/storybook-metadata.ts
var Ot = {
  next: "Next",
  "react-scripts": "CRA",
  gatsby: "Gatsby",
  "@nuxtjs/storybook": "nuxt",
  "@nrwl/storybook": "nx",
  "@vue/cli-service": "vue-cli",
  "@sveltejs/kit": "sveltekit"
}, jt = /* @__PURE__ */ o((e) => N(e).replace(/\/dist\/.*/, "").replace(/\.[mc]?[tj]?s[x]?$/, "").replace(/\/register$/, "").replace(/\/manager$/,
"").replace(/\/preset$/, ""), "sanitizeAddonName"), jo = /* @__PURE__ */ o(async ({
  packageJsonPath: e,
  packageJson: t,
  mainConfig: r
}) => {
  let n = {
    generatedAt: (/* @__PURE__ */ new Date()).getTime(),
    hasCustomBabel: !1,
    hasCustomWebpack: !1,
    hasStaticDirs: !1,
    hasStorybookEslint: !1,
    refCount: 0
  }, i = {
    ...t?.dependencies,
    ...t?.devDependencies,
    ...t?.peerDependencies
  }, s = Object.keys(i).find((p) => !!Ot[p]);
  if (s) {
    let { version: p } = await Pe(s);
    n.metaFramework = {
      name: Ot[s],
      packageName: s,
      version: p
    };
  }
  let a = [
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
    "sinon"
  ], c = Object.keys(i).filter(
    (p) => a.find((S) => p.includes(S))
  );
  n.testPackages = Object.fromEntries(
    await Promise.all(
      c.map(async (p) => [p, (await Pe(p))?.version])
    )
  ), n.hasRouterPackage = Po(t);
  let u = Co();
  u && (n.monorepo = u);
  try {
    let p = await Ue({ cwd: (0, P.getProjectRoot)() });
    p && (n.packageManager = {
      type: p.name,
      version: p.version,
      agent: p.agent
    });
  } catch {
  }
  let f = i.typescript ? "typescript" : "javascript";
  if (!r)
    return {
      ...n,
      storybookVersionSpecifier: P.versions.storybook,
      language: f
    };
  n.hasCustomBabel = !!r.babel, n.hasCustomWebpack = !!r.webpackFinal, n.hasStaticDirs = !!r.staticDirs, typeof r.typescript == "object" && (n.
  typescriptOptions = r.typescript);
  let l = await Eo(r);
  typeof r.refs == "object" && (n.refCount = Object.keys(r.refs).length), typeof r.features == "object" && (n.features = r.features);
  let y = {};
  r.addons && r.addons.forEach((p) => {
    let S, te;
    typeof p == "string" ? S = jt(p) : (p.name.includes("addon-essentials") && (te = p.options), S = jt(p.name)), y[S] = {
      options: te,
      version: void 0
    };
  });
  let g = go(t);
  g && (y.chromatic = {
    version: void 0,
    versionSpecifier: g,
    options: void 0
  }), (await It(y)).forEach(({ name: p, version: S }) => {
    y[p].version = S;
  });
  let b = Object.keys(y), m = Object.keys(i).filter((p) => p.includes("storybook") && !b.includes(p)).reduce((p, S) => ({
    ...p,
    [S]: { version: void 0 }
  }), {});
  (await It(m)).forEach(({ name: p, version: S }) => {
    m[p].version = S;
  });
  let O = !!i["eslint-plugin-storybook"], v = (0, P.getStorybookInfo)(t);
  try {
    let { previewConfig: p } = v;
    if (p) {
      let S = await (0, Oo.readConfig)(p), te = !!(S.getFieldNode(["globals"]) || S.getFieldNode(["globalTypes"]));
      n.preview = { ...n.preview, usesGlobals: te };
    }
  } catch {
  }
  let j = m[v.frameworkPackage]?.version, Z = await Io(), ee = await ho((0, Ao.dirname)(e));
  return {
    ...n,
    ...l,
    portableStoriesFileCount: Z,
    applicationFileCount: ee,
    storybookVersion: j,
    storybookVersionSpecifier: v.version,
    language: f,
    storybookPackages: m,
    addons: y,
    hasStorybookEslint: O
  };
}, "computeStorybookMetadata");
async function na() {
  let e = await Me(process.cwd());
  return e ? {
    packageJsonPath: e,
    packageJson: await Xt(e) || {}
  } : {
    packageJsonPath: process.cwd(),
    packageJson: {}
  };
}
o(na, "getPackageJsonDetails");
var Te, Rt = /* @__PURE__ */ o(async (e) => {
  if (Te)
    return Te;
  let { packageJson: t, packageJsonPath: r } = await na(), n = (e || (0, P.getStorybookConfiguration)(
    String(t?.scripts?.storybook || ""),
    "-c",
    "--config-dir"
  )) ?? ".storybook", i = await (0, P.loadMainConfig)({ configDir: n }).catch(() => {
  });
  return Te = await jo({ mainConfig: i, packageJson: t, packageJsonPath: r }), Te;
}, "getStorybookMetadata");

// src/telemetry/telemetry.ts
var Ho = d(require("node:os"), 1), Jo = d(No(), 1);

// ../node_modules/nanoid/index.js
var Nt = require("crypto");

// ../node_modules/nanoid/url-alphabet/index.js
var Do = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

// ../node_modules/nanoid/index.js
var oa = 128, A, B, ia = /* @__PURE__ */ o((e) => {
  !A || A.length < e ? (A = Buffer.allocUnsafe(e * oa), (0, Nt.randomFillSync)(A), B = 0) : B + e > A.length && ((0, Nt.randomFillSync)(A), B =
  0), B += e;
}, "fillPool");
var X = /* @__PURE__ */ o((e = 21) => {
  ia(e -= 0);
  let t = "";
  for (let r = B - e; r < B; r++)
    t += Do[A[r] & 63];
  return t;
}, "nanoid");

// src/telemetry/anonymous-id.ts
var Mo = require("node:path"), Lo = require("@storybook/core/common"), Fo = require("child_process");

// src/telemetry/one-way-hash.ts
var _o = require("crypto");
var Ie = /* @__PURE__ */ o((e) => {
  let t = (0, _o.createHash)("sha256");
  return t.update("storybook-telemetry-salt"), t.update(e), t.digest("hex");
}, "oneWayHash");

// src/telemetry/anonymous-id.ts
function sa(e) {
  let n = e.trim().replace(/#.*$/, "").replace(/^.*@/, "").replace(/^.*\/\//, "");
  return (n.endsWith(".git") ? n : `${n}.git`).replace(":", "/");
}
o(sa, "normalizeGitUrl");
function aa(e, t) {
  return `${sa(e)}${St(t)}`;
}
o(aa, "unhashedProjectId");
var Ae, Bo = /* @__PURE__ */ o(() => {
  if (Ae)
    return Ae;
  try {
    let e = (0, Lo.getProjectRoot)(), t = (0, Mo.relative)(e, process.cwd()), r = (0, Fo.execSync)("git config --local --get remote.origin.u\
rl", {
      timeout: 1e3,
      stdio: "pipe"
    });
    Ae = Ie(aa(String(r), t));
  } catch {
  }
  return Ae;
}, "getAnonymousProjectId");

// src/telemetry/event-cache.ts
var Oe = require("@storybook/core/common");
var Dt = Promise.resolve(), ca = /* @__PURE__ */ o(async (e, t) => {
  let r = await Oe.cache.get("lastEvents") || {};
  r[e] = { body: t, timestamp: Date.now() }, await Oe.cache.set("lastEvents", r);
}, "setHelper"), Uo = /* @__PURE__ */ o(async (e, t) => (await Dt, Dt = ca(e, t), Dt), "set");
var ua = /* @__PURE__ */ o((e) => {
  let { body: t, timestamp: r } = e;
  return {
    timestamp: r,
    eventType: t?.eventType,
    eventId: t?.eventId,
    sessionId: t?.sessionId
  };
}, "upgradeFields"), fa = ["init", "upgrade"], la = ["build", "dev", "error"], Go = /* @__PURE__ */ o((e, t) => {
  let r = t.map((n) => e?.[n]).filter(Boolean).sort((n, i) => i.timestamp - n.timestamp);
  return r.length > 0 ? r[0] : void 0;
}, "lastEvent"), $o = /* @__PURE__ */ o(async (e = void 0) => {
  let t = e || await Oe.cache.get("lastEvents") || {}, r = Go(t, fa), n = Go(t, la);
  if (r)
    return !n?.timestamp || r.timestamp > n.timestamp ? ua(r) : void 0;
}, "getPrecedingUpgrade");

// src/telemetry/fetch.ts
var Wo = global.fetch;

// src/telemetry/session-id.ts
var _t = require("@storybook/core/common");
var pa = 1e3 * 60 * 60 * 2, Q;
var Mt = /* @__PURE__ */ o(async () => {
  let e = Date.now();
  if (!Q) {
    let t = await _t.cache.get("session");
    t && t.lastUsed >= e - pa ? Q = t.id : Q = X();
  }
  return await _t.cache.set("session", { id: Q, lastUsed: e }), Q;
}, "getSessionId");

// src/telemetry/telemetry.ts
var ma = (0, Jo.default)(Wo), da = process.env.STORYBOOK_TELEMETRY_URL || "https://storybook.js.org/event-log", je = [], qo = /* @__PURE__ */ o(
(e, t) => {
  Lt[e] = t;
}, "addToGlobalContext"), ya = /* @__PURE__ */ o(() => {
  try {
    let e = Ho.platform();
    return e === "win32" ? "Windows" : e === "darwin" ? "macOS" : e === "linux" ? "Linux" : `Other: ${e}`;
  } catch {
    return "Unknown";
  }
}, "getOperatingSystem"), Lt = {
  inCI: !!process.env.CI,
  isTTY: process.stdout.isTTY,
  platform: ya(),
  nodeVersion: process.versions.node
}, ha = /* @__PURE__ */ o(async (e, t, r) => {
  let { eventType: n, payload: i, metadata: s, ...a } = e, c = await Mt(), u = X(), f = { ...a, eventType: n, eventId: u, sessionId: c, metadata: s,
  payload: i, context: t };
  return ma(da, {
    method: "post",
    body: JSON.stringify(f),
    headers: { "Content-Type": "application/json" },
    retries: 3,
    retryOn: [503, 504],
    retryDelay: /* @__PURE__ */ o((l) => 2 ** l * (typeof r?.retryDelay == "number" && !Number.isNaN(r?.retryDelay) ? r.retryDelay : 1e3), "\
retryDelay")
  });
}, "prepareRequest");
async function Vo(e, t = { retryDelay: 1e3, immediate: !1 }) {
  let { eventType: r, payload: n, metadata: i, ...s } = e, a = t.stripMetadata ? Lt : {
    ...Lt,
    anonymousId: Bo()
  }, c;
  try {
    c = ha(e, a, t), je.push(c), t.immediate ? await Promise.all(je) : await c;
    let u = await Mt(), f = X(), l = { ...s, eventType: r, eventId: f, sessionId: u, metadata: i, payload: n, context: a };
    await Uo(r, l);
  } catch {
  } finally {
    je = je.filter((u) => u !== c);
  }
}
o(Vo, "sendTelemetry");

// src/telemetry/index.ts
var ga = /* @__PURE__ */ o((e) => e.startsWith("example-button--") || e.startsWith("example-header--") || e.startsWith("example-page--"), "i\
sExampleStoryId"), ba = /* @__PURE__ */ o(async (e, t = {}, r = {}) => {
  e !== "boot" && r.notify !== !1 && await Ht();
  let n = {
    eventType: e,
    payload: t
  };
  try {
    r?.stripMetadata || (n.metadata = await Rt(r?.configDir));
  } catch (i) {
    n.payload.metadataErrorMessage = U(i).message, r?.enableCrashReports && (n.payload.metadataError = U(i));
  } finally {
    let { error: i } = n.payload;
    i && (n.payload.error = U(i)), (!n.payload.error || r?.enableCrashReports) && (process.env?.STORYBOOK_TELEMETRY_DEBUG && (Ft.logger.info(
    `
[telemetry]`), Ft.logger.info(JSON.stringify(n, null, 2))), await Vo(n, r));
  }
}, "telemetry");
