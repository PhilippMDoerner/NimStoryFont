import ESM_COMPAT_Module from "node:module";
import { fileURLToPath as ESM_COMPAT_fileURLToPath } from 'node:url';
import { dirname as ESM_COMPAT_dirname } from 'node:path';
const __filename = ESM_COMPAT_fileURLToPath(import.meta.url);
const __dirname = ESM_COMPAT_dirname(__filename);
const require = ESM_COMPAT_Module.createRequire(import.meta.url);
var so = Object.create;
var we = Object.defineProperty;
var ao = Object.getOwnPropertyDescriptor;
var co = Object.getOwnPropertyNames;
var uo = Object.getPrototypeOf, fo = Object.prototype.hasOwnProperty;
var o = (e, t) => we(e, "name", { value: t, configurable: !0 }), S = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy <
"u" ? new Proxy(e, {
  get: (t, r) => (typeof require < "u" ? require : t)[r]
}) : e)(function(e) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + e + '" is not supported');
});
var x = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var lo = (e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let i of co(t))
      !fo.call(e, i) && i !== r && we(e, i, { get: () => t[i], enumerable: !(n = ao(t, i)) || n.enumerable });
  return e;
};
var A = (e, t, r) => (r = e != null ? so(uo(e)) : {}, lo(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  t || !e || !e.__esModule ? we(r, "default", { value: e, enumerable: !0 }) : r,
  e
));

// ../node_modules/picocolors/picocolors.js
var Pt = x((Oa, Se) => {
  var kt = process.argv || [], q = process.env, po = !("NO_COLOR" in q || kt.includes("--no-color")) && ("FORCE_COLOR" in q || kt.includes("\
--color") || process.platform === "win32" || S != null && S("tty").isatty(1) && q.TERM !== "dumb" || "CI" in q), mo = /* @__PURE__ */ o((e, t, r = e) => (n) => {
    let i = "" + n, s = i.indexOf(t, e.length);
    return ~s ? e + yo(i, t, r, s) + t : e + i + t;
  }, "formatter"), yo = /* @__PURE__ */ o((e, t, r, n) => {
    let i = "", s = 0;
    do
      i += e.substring(s, n) + r, s = n + t.length, n = e.indexOf(t, s);
    while (~n);
    return i + e.substring(s);
  }, "replaceClose"), Et = /* @__PURE__ */ o((e = po) => {
    let t = e ? mo : () => String;
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
  Se.exports = Et();
  Se.exports.createColors = Et;
});

// ../node_modules/walk-up-path/dist/cjs/index.js
var Rt = x((Y) => {
  "use strict";
  Object.defineProperty(Y, "__esModule", { value: !0 });
  Y.walkUp = void 0;
  var jt = S("path"), ho = /* @__PURE__ */ o(function* (e) {
    for (e = (0, jt.resolve)(e); e; ) {
      yield e;
      let t = (0, jt.dirname)(e);
      if (t === e)
        break;
      e = t;
    }
  }, "walkUp");
  Y.walkUp = ho;
});

// ../node_modules/isexe/windows.js
var $t = x((sc, Ut) => {
  Ut.exports = Gt;
  Gt.sync = Co;
  var Ft = S("fs");
  function To(e, t) {
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
  o(To, "checkPathExt");
  function Bt(e, t, r) {
    return !e.isSymbolicLink() && !e.isFile() ? !1 : To(t, r);
  }
  o(Bt, "checkStat");
  function Gt(e, t, r) {
    Ft.stat(e, function(n, i) {
      r(n, n ? !1 : Bt(i, e, t));
    });
  }
  o(Gt, "isexe");
  function Co(e, t) {
    return Bt(Ft.statSync(e), e, t);
  }
  o(Co, "sync");
});

// ../node_modules/isexe/mode.js
var Vt = x((cc, qt) => {
  qt.exports = Ht;
  Ht.sync = Io;
  var Wt = S("fs");
  function Ht(e, t, r) {
    Wt.stat(e, function(n, i) {
      r(n, n ? !1 : Jt(i, t));
    });
  }
  o(Ht, "isexe");
  function Io(e, t) {
    return Jt(Wt.statSync(e), t);
  }
  o(Io, "sync");
  function Jt(e, t) {
    return e.isFile() && Ao(e, t);
  }
  o(Jt, "checkStat");
  function Ao(e, t) {
    var r = e.mode, n = e.uid, i = e.gid, s = t.uid !== void 0 ? t.uid : process.getuid && process.getuid(), a = t.gid !== void 0 ? t.gid : process.
    getgid && process.getgid(), c = parseInt("100", 8), u = parseInt("010", 8), f = parseInt("001", 8), l = c | u, d = r & f || r & u && i ===
    a || r & c && n === s || r & l && s === 0;
    return d;
  }
  o(Ao, "checkMode");
});

// ../node_modules/isexe/index.js
var Yt = x((lc, zt) => {
  var fc = S("fs"), K;
  process.platform === "win32" || global.TESTING_WINDOWS ? K = $t() : K = Vt();
  zt.exports = Ce;
  Ce.sync = Oo;
  function Ce(e, t, r) {
    if (typeof t == "function" && (r = t, t = {}), !r) {
      if (typeof Promise != "function")
        throw new TypeError("callback not provided");
      return new Promise(function(n, i) {
        Ce(e, t || {}, function(s, a) {
          s ? i(s) : n(a);
        });
      });
    }
    K(e, t || {}, function(n, i) {
      n && (n.code === "EACCES" || t && t.ignoreErrors) && (n = null, i = !1), r(n, i);
    });
  }
  o(Ce, "isexe");
  function Oo(e, t) {
    try {
      return K.sync(e, t || {});
    } catch (r) {
      if (t && t.ignoreErrors || r.code === "EACCES")
        return !1;
      throw r;
    }
  }
  o(Oo, "sync");
});

// ../node_modules/cross-spawn/node_modules/which/which.js
var rr = x((mc, tr) => {
  var j = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", Kt = S("path"), jo = j ? ";" : "\
:", Xt = Yt(), Qt = /* @__PURE__ */ o((e) => Object.assign(new Error(`not found: ${e}`), { code: "ENOENT" }), "getNotFoundError"), Zt = /* @__PURE__ */ o(
  (e, t) => {
    let r = t.colon || jo, n = e.match(/\//) || j && e.match(/\\/) ? [""] : [
      // windows always checks the cwd first
      ...j ? [process.cwd()] : [],
      ...(t.path || process.env.PATH || /* istanbul ignore next: very unusual */
      "").split(r)
    ], i = j ? t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", s = j ? i.split(r) : [""];
    return j && e.indexOf(".") !== -1 && s[0] !== "" && s.unshift(""), {
      pathEnv: n,
      pathExt: s,
      pathExtExe: i
    };
  }, "getPathInfo"), er = /* @__PURE__ */ o((e, t, r) => {
    typeof t == "function" && (r = t, t = {}), t || (t = {});
    let { pathEnv: n, pathExt: i, pathExtExe: s } = Zt(e, t), a = [], c = /* @__PURE__ */ o((f) => new Promise((l, d) => {
      if (f === n.length)
        return t.all && a.length ? l(a) : d(Qt(e));
      let h = n[f], y = /^".*"$/.test(h) ? h.slice(1, -1) : h, g = Kt.join(y, e), m = !y && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + g : g;
      l(u(m, f, 0));
    }), "step"), u = /* @__PURE__ */ o((f, l, d) => new Promise((h, y) => {
      if (d === i.length)
        return h(c(l + 1));
      let g = i[d];
      Xt(f + g, { pathExt: s }, (m, b) => {
        if (!m && b)
          if (t.all)
            a.push(f + g);
          else
            return h(f + g);
        return h(u(f, l, d + 1));
      });
    }), "subStep");
    return r ? c(0).then((f) => r(null, f), r) : c(0);
  }, "which"), Ro = /* @__PURE__ */ o((e, t) => {
    t = t || {};
    let { pathEnv: r, pathExt: n, pathExtExe: i } = Zt(e, t), s = [];
    for (let a = 0; a < r.length; a++) {
      let c = r[a], u = /^".*"$/.test(c) ? c.slice(1, -1) : c, f = Kt.join(u, e), l = !u && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + f : f;
      for (let d = 0; d < n.length; d++) {
        let h = l + n[d];
        try {
          if (Xt.sync(h, { pathExt: i }))
            if (t.all)
              s.push(h);
            else
              return h;
        } catch {
        }
      }
    }
    if (t.all && s.length)
      return s;
    if (t.nothrow)
      return null;
    throw Qt(e);
  }, "whichSync");
  tr.exports = er;
  er.sync = Ro;
});

// ../node_modules/path-key/index.js
var or = x((yc, Ie) => {
  "use strict";
  var nr = /* @__PURE__ */ o((e = {}) => {
    let t = e.env || process.env;
    return (e.platform || process.platform) !== "win32" ? "PATH" : Object.keys(t).reverse().find((n) => n.toUpperCase() === "PATH") || "Path";
  }, "pathKey");
  Ie.exports = nr;
  Ie.exports.default = nr;
});

// ../node_modules/cross-spawn/lib/util/resolveCommand.js
var cr = x((gc, ar) => {
  "use strict";
  var ir = S("path"), No = rr(), Do = or();
  function sr(e, t) {
    let r = e.options.env || process.env, n = process.cwd(), i = e.options.cwd != null, s = i && process.chdir !== void 0 && !process.chdir.
    disabled;
    if (s)
      try {
        process.chdir(e.options.cwd);
      } catch {
      }
    let a;
    try {
      a = No.sync(e.command, {
        path: r[Do({ env: r })],
        pathExt: t ? ir.delimiter : void 0
      });
    } catch {
    } finally {
      s && process.chdir(n);
    }
    return a && (a = ir.resolve(i ? e.options.cwd : "", a)), a;
  }
  o(sr, "resolveCommandAttempt");
  function _o(e) {
    return sr(e) || sr(e, !0);
  }
  o(_o, "resolveCommand");
  ar.exports = _o;
});

// ../node_modules/cross-spawn/lib/util/escape.js
var ur = x((xc, Oe) => {
  "use strict";
  var Ae = /([()\][%!^"`<>&|;, *?])/g;
  function Mo(e) {
    return e = e.replace(Ae, "^$1"), e;
  }
  o(Mo, "escapeCommand");
  function Lo(e, t) {
    return e = `${e}`, e = e.replace(/(\\*)"/g, '$1$1\\"'), e = e.replace(/(\\*)$/, "$1$1"), e = `"${e}"`, e = e.replace(Ae, "^$1"), t && (e =
    e.replace(Ae, "^$1")), e;
  }
  o(Lo, "escapeArgument");
  Oe.exports.command = Mo;
  Oe.exports.argument = Lo;
});

// ../node_modules/shebang-regex/index.js
var lr = x((Sc, fr) => {
  "use strict";
  fr.exports = /^#!(.*)/;
});

// ../node_modules/shebang-command/index.js
var mr = x((kc, pr) => {
  "use strict";
  var Fo = lr();
  pr.exports = (e = "") => {
    let t = e.match(Fo);
    if (!t)
      return null;
    let [r, n] = t[0].replace(/#! ?/, "").split(" "), i = r.split("/").pop();
    return i === "env" ? n : n ? `${i} ${n}` : i;
  };
});

// ../node_modules/cross-spawn/lib/util/readShebang.js
var yr = x((Ec, dr) => {
  "use strict";
  var je = S("fs"), Bo = mr();
  function Go(e) {
    let r = Buffer.alloc(150), n;
    try {
      n = je.openSync(e, "r"), je.readSync(n, r, 0, 150, 0), je.closeSync(n);
    } catch {
    }
    return Bo(r.toString());
  }
  o(Go, "readShebang");
  dr.exports = Go;
});

// ../node_modules/cross-spawn/lib/parse.js
var xr = x((vc, br) => {
  "use strict";
  var Uo = S("path"), hr = cr(), gr = ur(), $o = yr(), Wo = process.platform === "win32", Ho = /\.(?:com|exe)$/i, Jo = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function qo(e) {
    e.file = hr(e);
    let t = e.file && $o(e.file);
    return t ? (e.args.unshift(e.file), e.command = t, hr(e)) : e.file;
  }
  o(qo, "detectShebang");
  function Vo(e) {
    if (!Wo)
      return e;
    let t = qo(e), r = !Ho.test(t);
    if (e.options.forceShell || r) {
      let n = Jo.test(t);
      e.command = Uo.normalize(e.command), e.command = gr.command(e.command), e.args = e.args.map((s) => gr.argument(s, n));
      let i = [e.command].concat(e.args).join(" ");
      e.args = ["/d", "/s", "/c", `"${i}"`], e.command = process.env.comspec || "cmd.exe", e.options.windowsVerbatimArguments = !0;
    }
    return e;
  }
  o(Vo, "parseNonShell");
  function zo(e, t, r) {
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
    return r.shell ? n : Vo(n);
  }
  o(zo, "parse");
  br.exports = zo;
});

// ../node_modules/cross-spawn/lib/enoent.js
var kr = x((Cc, Sr) => {
  "use strict";
  var Re = process.platform === "win32";
  function Ne(e, t) {
    return Object.assign(new Error(`${t} ${e.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${t} ${e.command}`,
      path: e.command,
      spawnargs: e.args
    });
  }
  o(Ne, "notFoundError");
  function Yo(e, t) {
    if (!Re)
      return;
    let r = e.emit;
    e.emit = function(n, i) {
      if (n === "exit") {
        let s = wr(i, t, "spawn");
        if (s)
          return r.call(e, "error", s);
      }
      return r.apply(e, arguments);
    };
  }
  o(Yo, "hookChildProcess");
  function wr(e, t) {
    return Re && e === 1 && !t.file ? Ne(t.original, "spawn") : null;
  }
  o(wr, "verifyENOENT");
  function Ko(e, t) {
    return Re && e === 1 && !t.file ? Ne(t.original, "spawnSync") : null;
  }
  o(Ko, "verifyENOENTSync");
  Sr.exports = {
    hookChildProcess: Yo,
    verifyENOENT: wr,
    verifyENOENTSync: Ko,
    notFoundError: Ne
  };
});

// ../node_modules/cross-spawn/index.js
var vr = x((Ac, R) => {
  "use strict";
  var Er = S("child_process"), De = xr(), _e = kr();
  function Pr(e, t, r) {
    let n = De(e, t, r), i = Er.spawn(n.command, n.args, n.options);
    return _e.hookChildProcess(i, n), i;
  }
  o(Pr, "spawn");
  function Xo(e, t, r) {
    let n = De(e, t, r), i = Er.spawnSync(n.command, n.args, n.options);
    return i.error = i.error || _e.verifyENOENTSync(i.status, n), i;
  }
  o(Xo, "spawnSync");
  R.exports = Pr;
  R.exports.spawn = Pr;
  R.exports.sync = Xo;
  R.exports._parse = De;
  R.exports._enoent = _e;
});

// ../node_modules/merge-stream/index.js
var Xr = x((tf, Kr) => {
  "use strict";
  var { PassThrough: zi } = S("stream");
  Kr.exports = function() {
    var e = [], t = new zi({ objectMode: !0 });
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
var Pn = x((Qf, En) => {
  "use strict";
  var { sep: Ps } = S("path"), vs = /* @__PURE__ */ o((e) => {
    for (let t of e) {
      let r = /(\/|\\)/.exec(t);
      if (r !== null) return r[0];
    }
    return Ps;
  }, "determineSeparator");
  En.exports = /* @__PURE__ */ o(function(t, r = vs(t)) {
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
var zn = x((vm, Vn) => {
  "use strict";
  Vn.exports = function(e, t) {
    if (t = t || {}, typeof e != "function")
      throw new E("fetch must be a function");
    if (typeof t != "object")
      throw new E("defaults must be an object");
    if (t.retries !== void 0 && !ge(t.retries))
      throw new E("retries must be a positive integer");
    if (t.retryDelay !== void 0 && !ge(t.retryDelay) && typeof t.retryDelay != "function")
      throw new E("retryDelay must be a positive integer or a function returning a positive integer");
    if (t.retryOn !== void 0 && !Array.isArray(t.retryOn) && typeof t.retryOn != "function")
      throw new E("retryOn property expects an array or function");
    var r = {
      retries: 3,
      retryDelay: 1e3,
      retryOn: []
    };
    return t = Object.assign(r, t), /* @__PURE__ */ o(function(i, s) {
      var a = t.retries, c = t.retryDelay, u = t.retryOn;
      if (s && s.retries !== void 0)
        if (ge(s.retries))
          a = s.retries;
        else
          throw new E("retries must be a positive integer");
      if (s && s.retryDelay !== void 0)
        if (ge(s.retryDelay) || typeof s.retryDelay == "function")
          c = s.retryDelay;
        else
          throw new E("retryDelay must be a positive integer or a function returning a positive integer");
      if (s && s.retryOn)
        if (Array.isArray(s.retryOn) || typeof s.retryOn == "function")
          u = s.retryOn;
        else
          throw new E("retryOn property expects an array or function");
      return new Promise(function(f, l) {
        var d = /* @__PURE__ */ o(function(y) {
          var g = typeof Request < "u" && i instanceof Request ? i.clone() : i;
          e(g, s).then(function(m) {
            if (Array.isArray(u) && u.indexOf(m.status) === -1)
              f(m);
            else if (typeof u == "function")
              try {
                return Promise.resolve(u(y, null, m)).then(function(b) {
                  b ? h(y, null, m) : f(m);
                }).catch(l);
              } catch (b) {
                l(b);
              }
            else
              y < a ? h(y, null, m) : f(m);
          }).catch(function(m) {
            if (typeof u == "function")
              try {
                Promise.resolve(u(y, m, null)).then(function(b) {
                  b ? h(y, m, null) : l(m);
                }).catch(function(b) {
                  l(b);
                });
              } catch (b) {
                l(b);
              }
            else y < a ? h(y, m, null) : l(m);
          });
        }, "wrappedFetch");
        function h(y, g, m) {
          var b = typeof c == "function" ? c(y, g, m) : c;
          setTimeout(function() {
            d(++y);
          }, b);
        }
        o(h, "retry"), d(0);
      });
    }, "fetchRetry");
  };
  function ge(e) {
    return Number.isInteger(e) && e >= 0;
  }
  o(ge, "isPositiveInteger");
  function E(e) {
    this.name = "ArgumentError", this.message = e;
  }
  o(E, "ArgumentError");
});

// src/telemetry/index.ts
import { logger as io } from "@storybook/core/node-logger";

// src/telemetry/notify.ts
var V = A(Pt(), 1);
import { cache as vt } from "@storybook/core/common";
var Tt = "telemetry-notification-date", O = console, Ct = /* @__PURE__ */ o(async () => {
  await vt.get(Tt, null) || (vt.set(Tt, Date.now()), O.log(), O.log(
    `${V.default.magenta(
      V.default.bold("attention")
    )} => Storybook now collects completely anonymous telemetry regarding usage.`
  ), O.log("This information is used to shape Storybook's roadmap and prioritize features."), O.log(
    "You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:"
  ), O.log(V.default.cyan("https://storybook.js.org/telemetry")), O.log());
}, "notify");

// src/telemetry/sanitize.ts
import Ot from "node:path";
function It(e) {
  return e.replace(/[-[/{}()*+?.\\^$|]/g, "\\$&");
}
o(It, "regexpEscape");
function At(e = "") {
  return e.replace(/\u001B\[[0-9;]*m/g, "");
}
o(At, "removeAnsiEscapeCodes");
function D(e, t = Ot.sep) {
  if (!e)
    return e;
  let r = process.cwd().split(t);
  for (; r.length > 1; ) {
    let n = r.join(t), i = new RegExp(It(n), "gi");
    e = e.replace(i, "$SNIP");
    let s = r.join(t + t), a = new RegExp(It(s), "gi");
    e = e.replace(a, "$SNIP"), r.pop();
  }
  return e;
}
o(D, "cleanPaths");
function z(e, t = Ot.sep) {
  try {
    e = {
      ...JSON.parse(JSON.stringify(e)),
      message: At(e.message),
      stack: At(e.stack),
      cause: e.cause,
      name: e.name
    };
    let r = D(JSON.stringify(e), t);
    return JSON.parse(r);
  } catch (r) {
    return `Sanitization error: ${r?.message}`;
  }
}
o(z, "sanitizeError");

// src/telemetry/storybook-metadata.ts
import { dirname as ta } from "node:path";
import {
  getProjectRoot as ra,
  getStorybookConfiguration as na,
  getStorybookInfo as oa,
  loadMainConfig as ia,
  versions as sa
} from "@storybook/core/common";
import { readConfig as aa } from "@storybook/core/csf-tools";

// ../node_modules/fd-package-json/dist/esm/main.js
var Nt = A(Rt(), 1);
import { resolve as go } from "node:path";
import { stat as bo, readFile as xo } from "node:fs/promises";
import { statSync as Wa, readFileSync as Ha } from "node:fs";
async function wo(e) {
  try {
    return (await bo(e)).isFile();
  } catch {
    return !1;
  }
}
o(wo, "fileExists");
async function ke(e) {
  for (let t of (0, Nt.walkUp)(e)) {
    let r = go(t, "package.json");
    if (await wo(r))
      return r;
  }
  return null;
}
o(ke, "findPackagePath");
async function Dt(e) {
  let t = await ke(e);
  if (!t)
    return null;
  try {
    let r = await xo(t, { encoding: "utf8" });
    return JSON.parse(r);
  } catch {
    return null;
  }
}
o(Dt, "findPackage");

// ../node_modules/package-manager-detector/dist/constants.mjs
var _t = [
  "npm",
  "yarn",
  "yarn@berry",
  "pnpm",
  "pnpm@6",
  "bun",
  "deno"
], Ee = {
  "bun.lock": "bun",
  "bun.lockb": "bun",
  "deno.lock": "deno",
  "pnpm-lock.yaml": "pnpm",
  "yarn.lock": "yarn",
  "package-lock.json": "npm",
  "npm-shrinkwrap.json": "npm"
}, Pe = {
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
import Lt from "node:fs/promises";
import P from "node:path";
import So from "node:process";
async function ve(e, t) {
  try {
    let r = await Lt.stat(e);
    return t === "file" ? r.isFile() : r.isDirectory();
  } catch {
    return !1;
  }
}
o(ve, "pathExists");
function* ko(e = So.cwd()) {
  let t = P.resolve(e), { root: r } = P.parse(t);
  for (; t && t !== r; )
    yield t, t = P.dirname(t);
}
o(ko, "lookup");
async function Mt(e, t) {
  return !e || !ve(e, "file") ? null : await Po(e, t);
}
o(Mt, "parsePackageJson");
async function Te(e = {}) {
  let { cwd: t, strategies: r = ["lockfile", "packageManager-field", "devEngines-field"], onUnknown: n } = e;
  for (let i of ko(t))
    for (let s of r)
      switch (s) {
        case "lockfile": {
          for (let a of Object.keys(Ee))
            if (await ve(P.join(i, a), "file")) {
              let c = Ee[a], u = await Mt(P.join(i, "package.json"), n);
              return u || { name: c, agent: c };
            }
          break;
        }
        case "packageManager-field":
        case "devEngines-field": {
          let a = await Mt(P.join(i, "package.json"), n);
          if (a)
            return a;
          break;
        }
        case "install-metadata": {
          for (let a of Object.keys(Pe)) {
            let c = a.endsWith("/") ? "dir" : "file";
            if (await ve(P.join(i, a), c)) {
              let u = Pe[a], f = u === "yarn" ? vo(a) ? "yarn" : "yarn@berry" : u;
              return { name: u, agent: f };
            }
          }
          break;
        }
      }
  return null;
}
o(Te, "detect");
function Eo(e) {
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
o(Eo, "getNameAndVer");
async function Po(e, t) {
  try {
    let r = JSON.parse(await Lt.readFile(e, "utf8")), n, i = Eo(r);
    if (i) {
      let s = i.name, a = i.ver, c = a;
      return s === "yarn" && a && Number.parseInt(a) > 1 ? (n = "yarn@berry", c = "berry", { name: s, agent: n, version: c }) : s === "pnpm" &&
      a && Number.parseInt(a) < 7 ? (n = "pnpm@6", { name: s, agent: n, version: c }) : _t.includes(s) ? (n = s, { name: s, agent: n, version: c }) :
      t?.(r.packageManager) ?? null;
    }
  } catch {
  }
  return null;
}
o(Po, "handlePackageManager");
function vo(e) {
  return e.endsWith(".yarn_integrity");
}
o(vo, "isMetadataYarnClassic");

// ../node_modules/package-manager-detector/dist/index.mjs
import "node:fs/promises";
import "node:path";
import "node:process";

// src/telemetry/get-application-file-count.ts
import { sep as Gs } from "node:path";

// src/telemetry/exec-command-count-lines.ts
import { createInterface as gs } from "node:readline";

// ../node_modules/execa/index.js
var mn = A(vr(), 1);
import { Buffer as ls } from "node:buffer";
import ps from "node:path";
import st from "node:child_process";
import fe from "node:process";

// ../node_modules/strip-final-newline/index.js
function Me(e) {
  let t = typeof e == "string" ? `
` : 10, r = typeof e == "string" ? "\r" : 13;
  return e[e.length - 1] === t && (e = e.slice(0, -1)), e[e.length - 1] === r && (e = e.slice(0, -1)), e;
}
o(Me, "stripFinalNewline");

// ../node_modules/execa/node_modules/npm-run-path/index.js
import Q from "node:process";
import _ from "node:path";
import Qo from "node:url";

// ../node_modules/execa/node_modules/path-key/index.js
function X(e = {}) {
  let {
    env: t = process.env,
    platform: r = process.platform
  } = e;
  return r !== "win32" ? "PATH" : Object.keys(t).reverse().find((n) => n.toUpperCase() === "PATH") || "Path";
}
o(X, "pathKey");

// ../node_modules/execa/node_modules/npm-run-path/index.js
function Zo(e = {}) {
  let {
    cwd: t = Q.cwd(),
    path: r = Q.env[X()],
    execPath: n = Q.execPath
  } = e, i, s = t instanceof URL ? Qo.fileURLToPath(t) : t, a = _.resolve(s), c = [];
  for (; i !== a; )
    c.push(_.join(a, "node_modules/.bin")), i = a, a = _.resolve(a, "..");
  return c.push(_.resolve(s, n, "..")), [...c, r].join(_.delimiter);
}
o(Zo, "npmRunPath");
function Tr({ env: e = Q.env, ...t } = {}) {
  e = { ...e };
  let r = X({ env: e });
  return t.path = e[r], e[r] = Zo(t), e;
}
o(Tr, "npmRunPathEnv");

// ../node_modules/execa/node_modules/mimic-fn/index.js
var ei = /* @__PURE__ */ o((e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  let i = Object.getOwnPropertyDescriptor(e, r), s = Object.getOwnPropertyDescriptor(t, r);
  !ti(i, s) && n || Object.defineProperty(e, r, s);
}, "copyProperty"), ti = /* @__PURE__ */ o(function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable &&
  (e.writable || e.value === t.value);
}, "canCopyProperty"), ri = /* @__PURE__ */ o((e, t) => {
  let r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, "changePrototype"), ni = /* @__PURE__ */ o((e, t) => `/* Wrapped ${e}*/
${t}`, "wrappedToString"), oi = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), ii = Object.getOwnPropertyDescriptor(Function.
prototype.toString, "name"), si = /* @__PURE__ */ o((e, t, r) => {
  let n = r === "" ? "" : `with ${r.trim()}() `, i = ni.bind(null, n, t.toString());
  Object.defineProperty(i, "name", ii), Object.defineProperty(e, "toString", { ...oi, value: i });
}, "changeToString");
function Le(e, t, { ignoreNonConfigurable: r = !1 } = {}) {
  let { name: n } = e;
  for (let i of Reflect.ownKeys(t))
    ei(e, t, i, r);
  return ri(e, t), si(e, t, n), e;
}
o(Le, "mimicFunction");

// ../node_modules/execa/node_modules/onetime/index.js
var Z = /* @__PURE__ */ new WeakMap(), Cr = /* @__PURE__ */ o((e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0, i = e.displayName || e.name || "<anonymous>", s = /* @__PURE__ */ o(function(...a) {
    if (Z.set(s, ++n), n === 1)
      r = e.apply(this, a), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${i}\` can only be called once`);
    return r;
  }, "onetime");
  return Le(s, e), Z.set(s, n), s;
}, "onetime");
Cr.callCount = (e) => {
  if (!Z.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Z.get(e);
};
var Ir = Cr;

// ../node_modules/execa/lib/error.js
import hi from "node:process";

// ../node_modules/execa/node_modules/human-signals/build/src/main.js
import { constants as fi } from "node:os";

// ../node_modules/execa/node_modules/human-signals/build/src/realtime.js
var Ar = /* @__PURE__ */ o(() => {
  let e = Fe - Or + 1;
  return Array.from({ length: e }, ai);
}, "getRealtimeSignals"), ai = /* @__PURE__ */ o((e, t) => ({
  name: `SIGRT${t + 1}`,
  number: Or + t,
  action: "terminate",
  description: "Application-specific signal (realtime)",
  standard: "posix"
}), "getRealtimeSignal"), Or = 34, Fe = 64;

// ../node_modules/execa/node_modules/human-signals/build/src/signals.js
import { constants as ci } from "node:os";

// ../node_modules/execa/node_modules/human-signals/build/src/core.js
var jr = [
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
var Be = /* @__PURE__ */ o(() => {
  let e = Ar();
  return [...jr, ...e].map(ui);
}, "getSignals"), ui = /* @__PURE__ */ o(({
  name: e,
  number: t,
  description: r,
  action: n,
  forced: i = !1,
  standard: s
}) => {
  let {
    signals: { [e]: a }
  } = ci, c = a !== void 0;
  return { name: e, number: c ? a : t, description: r, supported: c, action: n, forced: i, standard: s };
}, "normalizeSignal");

// ../node_modules/execa/node_modules/human-signals/build/src/main.js
var li = /* @__PURE__ */ o(() => {
  let e = Be();
  return Object.fromEntries(e.map(pi));
}, "getSignalsByName"), pi = /* @__PURE__ */ o(({
  name: e,
  number: t,
  description: r,
  supported: n,
  action: i,
  forced: s,
  standard: a
}) => [e, { name: e, number: t, description: r, supported: n, action: i, forced: s, standard: a }], "getSignalByName"), Rr = li(), mi = /* @__PURE__ */ o(
() => {
  let e = Be(), t = Fe + 1, r = Array.from(
    { length: t },
    (n, i) => di(i, e)
  );
  return Object.assign({}, ...r);
}, "getSignalsByNumber"), di = /* @__PURE__ */ o((e, t) => {
  let r = yi(e, t);
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
}, "getSignalByNumber"), yi = /* @__PURE__ */ o((e, t) => {
  let r = t.find(({ name: n }) => fi.signals[n] === e);
  return r !== void 0 ? r : t.find((n) => n.number === e);
}, "findSignalByNumber"), nu = mi();

// ../node_modules/execa/lib/error.js
var gi = /* @__PURE__ */ o(({ timedOut: e, timeout: t, errorCode: r, signal: n, signalDescription: i, exitCode: s, isCanceled: a }) => e ? `\
timed out after ${t} milliseconds` : a ? "was canceled" : r !== void 0 ? `failed with ${r}` : n !== void 0 ? `was killed with ${n} (${i})` :
s !== void 0 ? `failed with exit code ${s}` : "failed", "getErrorPrefix"), M = /* @__PURE__ */ o(({
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
  parsed: { options: { timeout: d, cwd: h = hi.cwd() } }
}) => {
  s = s === null ? void 0 : s, i = i === null ? void 0 : i;
  let y = i === void 0 ? void 0 : Rr[i].description, g = n && n.code, b = `Command ${gi({ timedOut: u, timeout: d, errorCode: g, signal: i, signalDescription: y,
  exitCode: s, isCanceled: f })}: ${a}`, C = Object.prototype.toString.call(n) === "[object Error]", k = C ? `${b}
${n.message}` : b, I = [k, t, e].filter(Boolean).join(`
`);
  return C ? (n.originalMessage = n.message, n.message = I) : n = new Error(I), n.shortMessage = k, n.command = a, n.escapedCommand = c, n.exitCode =
  s, n.signal = i, n.signalDescription = y, n.stdout = e, n.stderr = t, n.cwd = h, r !== void 0 && (n.all = r), "bufferedData" in n && delete n.
  bufferedData, n.failed = !0, n.timedOut = !!u, n.isCanceled = f, n.killed = l && !u, n;
}, "makeError");

// ../node_modules/execa/lib/stdio.js
var ee = ["stdin", "stdout", "stderr"], bi = /* @__PURE__ */ o((e) => ee.some((t) => e[t] !== void 0), "hasAlias"), Nr = /* @__PURE__ */ o((e) => {
  if (!e)
    return;
  let { stdio: t } = e;
  if (t === void 0)
    return ee.map((n) => e[n]);
  if (bi(e))
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${ee.map((n) => `\`${n}\``).join(", ")}`);
  if (typeof t == "string")
    return t;
  if (!Array.isArray(t))
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);
  let r = Math.max(t.length, ee.length);
  return Array.from({ length: r }, (n, i) => t[i]);
}, "normalizeStdio");

// ../node_modules/execa/lib/kill.js
import Si from "node:os";

// ../node_modules/execa/node_modules/signal-exit/dist/mjs/signals.js
var v = [];
v.push("SIGHUP", "SIGINT", "SIGTERM");
process.platform !== "win32" && v.push(
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
process.platform === "linux" && v.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");

// ../node_modules/execa/node_modules/signal-exit/dist/mjs/index.js
var te = /* @__PURE__ */ o((e) => !!e && typeof e == "object" && typeof e.removeListener == "function" && typeof e.emit == "function" && typeof e.
reallyExit == "function" && typeof e.listeners == "function" && typeof e.kill == "function" && typeof e.pid == "number" && typeof e.on == "f\
unction", "processOk"), Ge = Symbol.for("signal-exit emitter"), Ue = globalThis, xi = Object.defineProperty.bind(Object), $e = class {
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
    if (Ue[Ge])
      return Ue[Ge];
    xi(Ue, Ge, {
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
}, re = class {
  static {
    o(this, "SignalExitBase");
  }
}, wi = /* @__PURE__ */ o((e) => ({
  onExit(t, r) {
    return e.onExit(t, r);
  },
  load() {
    return e.load();
  },
  unload() {
    return e.unload();
  }
}), "signalExitWrap"), We = class extends re {
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
}, He = class extends re {
  static {
    o(this, "SignalExit");
  }
  // "SIGHUP" throws an `ENOSYS` error on Windows,
  // so use a supported signal instead
  /* c8 ignore start */
  #s = Je.platform === "win32" ? "SIGINT" : "SIGHUP";
  /* c8 ignore stop */
  #t = new $e();
  #e;
  #o;
  #i;
  #n = {};
  #r = !1;
  constructor(t) {
    super(), this.#e = t, this.#n = {};
    for (let r of v)
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
    if (!te(this.#e))
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
      for (let t of v)
        try {
          let r = this.#n[t];
          r && this.#e.on(t, r);
        } catch {
        }
      this.#e.emit = (t, ...r) => this.#c(t, ...r), this.#e.reallyExit = (t) => this.#a(t);
    }
  }
  unload() {
    this.#r && (this.#r = !1, v.forEach((t) => {
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
    return te(this.#e) ? (this.#e.exitCode = t || 0, this.#t.emit("exit", this.#e.exitCode, null), this.#i.call(this.#e, this.#e.exitCode)) :
    0;
  }
  #c(t, ...r) {
    let n = this.#o;
    if (t === "exit" && te(this.#e)) {
      typeof r[0] == "number" && (this.#e.exitCode = r[0]);
      let i = n.call(this.#e, t, ...r);
      return this.#t.emit("exit", this.#e.exitCode, null), i;
    } else
      return n.call(this.#e, t, ...r);
  }
}, Je = globalThis.process, {
  /**
   * Called when the process is exiting, whether via signal, explicit
   * exit, or running out of stuff to do.
   *
   * If the global process object is not suitable for instrumentation,
   * then this will be a no-op.
   *
   * Returns a function that may be used to unload signal-exit.
   */
  onExit: Dr,
  /**
   * Load the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  load: du,
  /**
   * Unload the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  unload: yu
} = wi(te(Je) ? new He(Je) : new We());

// ../node_modules/execa/lib/kill.js
var ki = 1e3 * 5, _r = /* @__PURE__ */ o((e, t = "SIGTERM", r = {}) => {
  let n = e(t);
  return Ei(e, t, r, n), n;
}, "spawnedKill"), Ei = /* @__PURE__ */ o((e, t, r, n) => {
  if (!Pi(t, r, n))
    return;
  let i = Ti(r), s = setTimeout(() => {
    e("SIGKILL");
  }, i);
  s.unref && s.unref();
}, "setKillTimeout"), Pi = /* @__PURE__ */ o((e, { forceKillAfterTimeout: t }, r) => vi(e) && t !== !1 && r, "shouldForceKill"), vi = /* @__PURE__ */ o(
(e) => e === Si.constants.signals.SIGTERM || typeof e == "string" && e.toUpperCase() === "SIGTERM", "isSigterm"), Ti = /* @__PURE__ */ o(({ forceKillAfterTimeout: e = !0 }) => {
  if (e === !0)
    return ki;
  if (!Number.isFinite(e) || e < 0)
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
  return e;
}, "getForceKillAfterTimeout"), Mr = /* @__PURE__ */ o((e, t) => {
  e.kill() && (t.isCanceled = !0);
}, "spawnedCancel"), Ci = /* @__PURE__ */ o((e, t, r) => {
  e.kill(t), r(Object.assign(new Error("Timed out"), { timedOut: !0, signal: t }));
}, "timeoutKill"), Lr = /* @__PURE__ */ o((e, { timeout: t, killSignal: r = "SIGTERM" }, n) => {
  if (t === 0 || t === void 0)
    return n;
  let i, s = new Promise((c, u) => {
    i = setTimeout(() => {
      Ci(e, r, u);
    }, t);
  }), a = n.finally(() => {
    clearTimeout(i);
  });
  return Promise.race([s, a]);
}, "setupTimeout"), Fr = /* @__PURE__ */ o(({ timeout: e }) => {
  if (e !== void 0 && (!Number.isFinite(e) || e < 0))
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
}, "validateTimeout"), Br = /* @__PURE__ */ o(async (e, { cleanup: t, detached: r }, n) => {
  if (!t || r)
    return n;
  let i = Dr(() => {
    e.kill();
  });
  return n.finally(() => {
    i();
  });
}, "setExitHandler");

// ../node_modules/execa/lib/pipe.js
import { createWriteStream as Ii } from "node:fs";
import { ChildProcess as Ai } from "node:child_process";

// ../node_modules/execa/node_modules/is-stream/index.js
function ne(e) {
  return e !== null && typeof e == "object" && typeof e.pipe == "function";
}
o(ne, "isStream");
function qe(e) {
  return ne(e) && e.writable !== !1 && typeof e._write == "function" && typeof e._writableState == "object";
}
o(qe, "isWritableStream");

// ../node_modules/execa/lib/pipe.js
var Oi = /* @__PURE__ */ o((e) => e instanceof Ai && typeof e.then == "function", "isExecaChildProcess"), Ve = /* @__PURE__ */ o((e, t, r) => {
  if (typeof r == "string")
    return e[t].pipe(Ii(r)), e;
  if (qe(r))
    return e[t].pipe(r), e;
  if (!Oi(r))
    throw new TypeError("The second argument must be a string, a stream or an Execa child process.");
  if (!qe(r.stdin))
    throw new TypeError("The target child process's stdin must be available.");
  return e[t].pipe(r.stdin), r;
}, "pipeToTarget"), Gr = /* @__PURE__ */ o((e) => {
  e.stdout !== null && (e.pipeStdout = Ve.bind(void 0, e, "stdout")), e.stderr !== null && (e.pipeStderr = Ve.bind(void 0, e, "stderr")), e.
  all !== void 0 && (e.pipeAll = Ve.bind(void 0, e, "all"));
}, "addPipeMethods");

// ../node_modules/execa/lib/stream.js
import { createReadStream as Yi, readFileSync as Ki } from "node:fs";
import { setTimeout as Xi } from "node:timers/promises";

// ../node_modules/execa/node_modules/get-stream/source/contents.js
var L = /* @__PURE__ */ o(async (e, { init: t, convertChunk: r, getSize: n, truncateChunk: i, addChunk: s, getFinalChunk: a, finalize: c }, {
maxBuffer: u = Number.POSITIVE_INFINITY } = {}) => {
  if (!Ri(e))
    throw new Error("The first argument must be a Readable, a ReadableStream, or an async iterable.");
  let f = t();
  f.length = 0;
  try {
    for await (let l of e) {
      let d = Ni(l), h = r[d](l, f);
      Wr({ convertedChunk: h, state: f, getSize: n, truncateChunk: i, addChunk: s, maxBuffer: u });
    }
    return ji({ state: f, convertChunk: r, getSize: n, truncateChunk: i, addChunk: s, getFinalChunk: a, maxBuffer: u }), c(f);
  } catch (l) {
    throw l.bufferedData = c(f), l;
  }
}, "getStreamContents"), ji = /* @__PURE__ */ o(({ state: e, getSize: t, truncateChunk: r, addChunk: n, getFinalChunk: i, maxBuffer: s }) => {
  let a = i(e);
  a !== void 0 && Wr({ convertedChunk: a, state: e, getSize: t, truncateChunk: r, addChunk: n, maxBuffer: s });
}, "appendFinalChunk"), Wr = /* @__PURE__ */ o(({ convertedChunk: e, state: t, getSize: r, truncateChunk: n, addChunk: i, maxBuffer: s }) => {
  let a = r(e), c = t.length + a;
  if (c <= s) {
    Ur(e, t, i, c);
    return;
  }
  let u = n(e, s - t.length);
  throw u !== void 0 && Ur(u, t, i, s), new oe();
}, "appendChunk"), Ur = /* @__PURE__ */ o((e, t, r, n) => {
  t.contents = r(e, t, n), t.length = n;
}, "addNewChunk"), Ri = /* @__PURE__ */ o((e) => typeof e == "object" && e !== null && typeof e[Symbol.asyncIterator] == "function", "isAsyn\
cIterable"), Ni = /* @__PURE__ */ o((e) => {
  let t = typeof e;
  if (t === "string")
    return "string";
  if (t !== "object" || e === null)
    return "others";
  if (globalThis.Buffer?.isBuffer(e))
    return "buffer";
  let r = $r.call(e);
  return r === "[object ArrayBuffer]" ? "arrayBuffer" : r === "[object DataView]" ? "dataView" : Number.isInteger(e.byteLength) && Number.isInteger(
  e.byteOffset) && $r.call(e.buffer) === "[object ArrayBuffer]" ? "typedArray" : "others";
}, "getChunkType"), { toString: $r } = Object.prototype, oe = class extends Error {
  static {
    o(this, "MaxBufferError");
  }
  name = "MaxBufferError";
  constructor() {
    super("maxBuffer exceeded");
  }
};

// ../node_modules/execa/node_modules/get-stream/source/utils.js
var ze = /* @__PURE__ */ o((e) => e, "identity"), Ye = /* @__PURE__ */ o(() => {
}, "noop"), Ke = /* @__PURE__ */ o(({ contents: e }) => e, "getContentsProp"), ie = /* @__PURE__ */ o((e) => {
  throw new Error(`Streams in object mode are not supported: ${String(e)}`);
}, "throwObjectStream"), se = /* @__PURE__ */ o((e) => e.length, "getLengthProp");

// ../node_modules/execa/node_modules/get-stream/source/array-buffer.js
async function Xe(e, t) {
  return L(e, $i, t);
}
o(Xe, "getStreamAsArrayBuffer");
var Di = /* @__PURE__ */ o(() => ({ contents: new ArrayBuffer(0) }), "initArrayBuffer"), _i = /* @__PURE__ */ o((e) => Mi.encode(e), "useTex\
tEncoder"), Mi = new TextEncoder(), Hr = /* @__PURE__ */ o((e) => new Uint8Array(e), "useUint8Array"), Jr = /* @__PURE__ */ o((e) => new Uint8Array(
e.buffer, e.byteOffset, e.byteLength), "useUint8ArrayWithOffset"), Li = /* @__PURE__ */ o((e, t) => e.slice(0, t), "truncateArrayBufferChunk"),
Fi = /* @__PURE__ */ o((e, { contents: t, length: r }, n) => {
  let i = zr() ? Gi(t, n) : Bi(t, n);
  return new Uint8Array(i).set(e, r), i;
}, "addArrayBufferChunk"), Bi = /* @__PURE__ */ o((e, t) => {
  if (t <= e.byteLength)
    return e;
  let r = new ArrayBuffer(Vr(t));
  return new Uint8Array(r).set(new Uint8Array(e), 0), r;
}, "resizeArrayBufferSlow"), Gi = /* @__PURE__ */ o((e, t) => {
  if (t <= e.maxByteLength)
    return e.resize(t), e;
  let r = new ArrayBuffer(t, { maxByteLength: Vr(t) });
  return new Uint8Array(r).set(new Uint8Array(e), 0), r;
}, "resizeArrayBuffer"), Vr = /* @__PURE__ */ o((e) => qr ** Math.ceil(Math.log(e) / Math.log(qr)), "getNewContentsLength"), qr = 2, Ui = /* @__PURE__ */ o(
({ contents: e, length: t }) => zr() ? e : e.slice(0, t), "finalizeArrayBuffer"), zr = /* @__PURE__ */ o(() => "resize" in ArrayBuffer.prototype,
"hasArrayBufferResize"), $i = {
  init: Di,
  convertChunk: {
    string: _i,
    buffer: Hr,
    arrayBuffer: Hr,
    dataView: Jr,
    typedArray: Jr,
    others: ie
  },
  getSize: se,
  truncateChunk: Li,
  addChunk: Fi,
  getFinalChunk: Ye,
  finalize: Ui
};

// ../node_modules/execa/node_modules/get-stream/source/buffer.js
async function ae(e, t) {
  if (!("Buffer" in globalThis))
    throw new Error("getStreamAsBuffer() is only supported in Node.js");
  try {
    return Yr(await Xe(e, t));
  } catch (r) {
    throw r.bufferedData !== void 0 && (r.bufferedData = Yr(r.bufferedData)), r;
  }
}
o(ae, "getStreamAsBuffer");
var Yr = /* @__PURE__ */ o((e) => globalThis.Buffer.from(e), "arrayBufferToNodeBuffer");

// ../node_modules/execa/node_modules/get-stream/source/string.js
async function Qe(e, t) {
  return L(e, Vi, t);
}
o(Qe, "getStreamAsString");
var Wi = /* @__PURE__ */ o(() => ({ contents: "", textDecoder: new TextDecoder() }), "initString"), ce = /* @__PURE__ */ o((e, { textDecoder: t }) => t.
decode(e, { stream: !0 }), "useTextDecoder"), Hi = /* @__PURE__ */ o((e, { contents: t }) => t + e, "addStringChunk"), Ji = /* @__PURE__ */ o(
(e, t) => e.slice(0, t), "truncateStringChunk"), qi = /* @__PURE__ */ o(({ textDecoder: e }) => {
  let t = e.decode();
  return t === "" ? void 0 : t;
}, "getFinalStringChunk"), Vi = {
  init: Wi,
  convertChunk: {
    string: ze,
    buffer: ce,
    arrayBuffer: ce,
    dataView: ce,
    typedArray: ce,
    others: ie
  },
  getSize: se,
  truncateChunk: Ji,
  addChunk: Hi,
  getFinalChunk: qi,
  finalize: Ke
};

// ../node_modules/execa/lib/stream.js
var Qr = A(Xr(), 1);
var Zr = /* @__PURE__ */ o((e) => {
  if (e !== void 0)
    throw new TypeError("The `input` and `inputFile` options cannot be both set.");
}, "validateInputOptions"), Qi = /* @__PURE__ */ o(({ input: e, inputFile: t }) => typeof t != "string" ? e : (Zr(e), Ki(t)), "getInputSync"),
en = /* @__PURE__ */ o((e) => {
  let t = Qi(e);
  if (ne(t))
    throw new TypeError("The `input` option cannot be a stream in sync mode");
  return t;
}, "handleInputSync"), Zi = /* @__PURE__ */ o(({ input: e, inputFile: t }) => typeof t != "string" ? e : (Zr(e), Yi(t)), "getInput"), tn = /* @__PURE__ */ o(
(e, t) => {
  let r = Zi(t);
  r !== void 0 && (ne(r) ? r.pipe(e.stdin) : e.stdin.end(r));
}, "handleInput"), rn = /* @__PURE__ */ o((e, { all: t }) => {
  if (!t || !e.stdout && !e.stderr)
    return;
  let r = (0, Qr.default)();
  return e.stdout && r.add(e.stdout), e.stderr && r.add(e.stderr), r;
}, "makeAllStream"), Ze = /* @__PURE__ */ o(async (e, t) => {
  if (!(!e || t === void 0)) {
    await Xi(0), e.destroy();
    try {
      return await t;
    } catch (r) {
      return r.bufferedData;
    }
  }
}, "getBufferedData"), et = /* @__PURE__ */ o((e, { encoding: t, buffer: r, maxBuffer: n }) => {
  if (!(!e || !r))
    return t === "utf8" || t === "utf-8" ? Qe(e, { maxBuffer: n }) : t === null || t === "buffer" ? ae(e, { maxBuffer: n }) : es(e, n, t);
}, "getStreamPromise"), es = /* @__PURE__ */ o(async (e, t, r) => (await ae(e, { maxBuffer: t })).toString(r), "applyEncoding"), nn = /* @__PURE__ */ o(
async ({ stdout: e, stderr: t, all: r }, { encoding: n, buffer: i, maxBuffer: s }, a) => {
  let c = et(e, { encoding: n, buffer: i, maxBuffer: s }), u = et(t, { encoding: n, buffer: i, maxBuffer: s }), f = et(r, { encoding: n, buffer: i,
  maxBuffer: s * 2 });
  try {
    return await Promise.all([a, c, u, f]);
  } catch (l) {
    return Promise.all([
      { error: l, signal: l.signal, timedOut: l.timedOut },
      Ze(e, c),
      Ze(t, u),
      Ze(r, f)
    ]);
  }
}, "getSpawnedResult");

// ../node_modules/execa/lib/promise.js
var ts = (async () => {
})().constructor.prototype, rs = ["then", "catch", "finally"].map((e) => [
  e,
  Reflect.getOwnPropertyDescriptor(ts, e)
]), tt = /* @__PURE__ */ o((e, t) => {
  for (let [r, n] of rs) {
    let i = typeof t == "function" ? (...s) => Reflect.apply(n.value, t(), s) : n.value.bind(t);
    Reflect.defineProperty(e, r, { ...n, value: i });
  }
}, "mergePromise"), on = /* @__PURE__ */ o((e) => new Promise((t, r) => {
  e.on("exit", (n, i) => {
    t({ exitCode: n, signal: i });
  }), e.on("error", (n) => {
    r(n);
  }), e.stdin && e.stdin.on("error", (n) => {
    r(n);
  });
}), "getSpawnedPromise");

// ../node_modules/execa/lib/command.js
import { Buffer as ns } from "node:buffer";
import { ChildProcess as os } from "node:child_process";
var cn = /* @__PURE__ */ o((e, t = []) => Array.isArray(t) ? [e, ...t] : [e], "normalizeArgs"), is = /^[\w.-]+$/, ss = /* @__PURE__ */ o((e) => typeof e !=
"string" || is.test(e) ? e : `"${e.replaceAll('"', '\\"')}"`, "escapeArg"), rt = /* @__PURE__ */ o((e, t) => cn(e, t).join(" "), "joinComman\
d"), nt = /* @__PURE__ */ o((e, t) => cn(e, t).map((r) => ss(r)).join(" "), "getEscapedCommand"), un = / +/g, fn = /* @__PURE__ */ o((e) => {
  let t = [];
  for (let r of e.trim().split(un)) {
    let n = t.at(-1);
    n && n.endsWith("\\") ? t[t.length - 1] = `${n.slice(0, -1)} ${r}` : t.push(r);
  }
  return t;
}, "parseCommand"), sn = /* @__PURE__ */ o((e) => {
  let t = typeof e;
  if (t === "string")
    return e;
  if (t === "number")
    return String(e);
  if (t === "object" && e !== null && !(e instanceof os) && "stdout" in e) {
    let r = typeof e.stdout;
    if (r === "string")
      return e.stdout;
    if (ns.isBuffer(e.stdout))
      return e.stdout.toString();
    throw new TypeError(`Unexpected "${r}" stdout in template expression`);
  }
  throw new TypeError(`Unexpected "${t}" in template expression`);
}, "parseExpression"), an = /* @__PURE__ */ o((e, t, r) => r || e.length === 0 || t.length === 0 ? [...e, ...t] : [
  ...e.slice(0, -1),
  `${e.at(-1)}${t[0]}`,
  ...t.slice(1)
], "concatTokens"), as = /* @__PURE__ */ o(({ templates: e, expressions: t, tokens: r, index: n, template: i }) => {
  let s = i ?? e.raw[n], a = s.split(un).filter(Boolean), c = an(
    r,
    a,
    s.startsWith(" ")
  );
  if (n === t.length)
    return c;
  let u = t[n], f = Array.isArray(u) ? u.map((l) => sn(l)) : [sn(u)];
  return an(
    c,
    f,
    s.endsWith(" ")
  );
}, "parseTemplate"), ot = /* @__PURE__ */ o((e, t) => {
  let r = [];
  for (let [n, i] of e.entries())
    r = as({ templates: e, expressions: t, tokens: r, index: n, template: i });
  return r;
}, "parseTemplates");

// ../node_modules/execa/lib/verbose.js
import { debuglog as cs } from "node:util";
import us from "node:process";
var ln = cs("execa").enabled, ue = /* @__PURE__ */ o((e, t) => String(e).padStart(t, "0"), "padField"), fs = /* @__PURE__ */ o(() => {
  let e = /* @__PURE__ */ new Date();
  return `${ue(e.getHours(), 2)}:${ue(e.getMinutes(), 2)}:${ue(e.getSeconds(), 2)}.${ue(e.getMilliseconds(), 3)}`;
}, "getTimestamp"), it = /* @__PURE__ */ o((e, { verbose: t }) => {
  t && us.stderr.write(`[${fs()}] ${e}
`);
}, "logCommand");

// ../node_modules/execa/index.js
var ms = 1e3 * 1e3 * 100, ds = /* @__PURE__ */ o(({ env: e, extendEnv: t, preferLocal: r, localDir: n, execPath: i }) => {
  let s = t ? { ...fe.env, ...e } : e;
  return r ? Tr({ env: s, cwd: n, execPath: i }) : s;
}, "getEnv"), dn = /* @__PURE__ */ o((e, t, r = {}) => {
  let n = mn.default._parse(e, t, r);
  return e = n.command, t = n.args, r = n.options, r = {
    maxBuffer: ms,
    buffer: !0,
    stripFinalNewline: !0,
    extendEnv: !0,
    preferLocal: !1,
    localDir: r.cwd || fe.cwd(),
    execPath: fe.execPath,
    encoding: "utf8",
    reject: !0,
    cleanup: !0,
    all: !1,
    windowsHide: !0,
    verbose: ln,
    ...r
  }, r.env = ds(r), r.stdio = Nr(r), fe.platform === "win32" && ps.basename(e, ".exe") === "cmd" && t.unshift("/q"), { file: e, args: t, options: r,
  parsed: n };
}, "handleArguments"), F = /* @__PURE__ */ o((e, t, r) => typeof t != "string" && !ls.isBuffer(t) ? r === void 0 ? void 0 : "" : e.stripFinalNewline ?
Me(t) : t, "handleOutput");
function yn(e, t, r) {
  let n = dn(e, t, r), i = rt(e, t), s = nt(e, t);
  it(s, n.options), Fr(n.options);
  let a;
  try {
    a = st.spawn(n.file, n.args, n.options);
  } catch (y) {
    let g = new st.ChildProcess(), m = Promise.reject(M({
      error: y,
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
    return tt(g, m), g;
  }
  let c = on(a), u = Lr(a, n.options, c), f = Br(a, n.options, u), l = { isCanceled: !1 };
  a.kill = _r.bind(null, a.kill.bind(a)), a.cancel = Mr.bind(null, a, l);
  let h = Ir(/* @__PURE__ */ o(async () => {
    let [{ error: y, exitCode: g, signal: m, timedOut: b }, C, k, I] = await nn(a, n.options, f), W = F(n.options, C), H = F(n.options, k), p = F(
    n.options, I);
    if (y || g !== 0 || m !== null) {
      let w = M({
        error: y,
        exitCode: g,
        signal: m,
        stdout: W,
        stderr: H,
        all: p,
        command: i,
        escapedCommand: s,
        parsed: n,
        timedOut: b,
        isCanceled: l.isCanceled || (n.options.signal ? n.options.signal.aborted : !1),
        killed: a.killed
      });
      if (!n.options.reject)
        return w;
      throw w;
    }
    return {
      command: i,
      escapedCommand: s,
      exitCode: 0,
      stdout: W,
      stderr: H,
      all: p,
      failed: !1,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    };
  }, "handlePromise"));
  return tn(a, n.options), a.all = rn(a, n.options), Gr(a), tt(a, h), a;
}
o(yn, "execa");
function ys(e, t, r) {
  let n = dn(e, t, r), i = rt(e, t), s = nt(e, t);
  it(s, n.options);
  let a = en(n.options), c;
  try {
    c = st.spawnSync(n.file, n.args, { ...n.options, input: a });
  } catch (l) {
    throw M({
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
  let u = F(n.options, c.stdout, c.error), f = F(n.options, c.stderr, c.error);
  if (c.error || c.status !== 0 || c.signal !== null) {
    let l = M({
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
o(ys, "execaSync");
var hs = /* @__PURE__ */ o(({ input: e, inputFile: t, stdio: r }) => e === void 0 && t === void 0 && r === void 0 ? { stdin: "inherit" } : {},
"normalizeScriptStdin"), pn = /* @__PURE__ */ o((e = {}) => ({
  preferLocal: !0,
  ...hs(e),
  ...e
}), "normalizeScriptOptions");
function hn(e) {
  function t(r, ...n) {
    if (!Array.isArray(r))
      return hn({ ...e, ...r });
    let [i, ...s] = ot(r, n);
    return yn(i, s, pn(e));
  }
  return o(t, "$"), t.sync = (r, ...n) => {
    if (!Array.isArray(r))
      throw new TypeError("Please use $(options).sync`command` instead of $.sync(options)`command`.");
    let [i, ...s] = ot(r, n);
    return ys(i, s, pn(e));
  }, t;
}
o(hn, "create$");
var Mf = hn();
function gn(e, t) {
  let [r, ...n] = fn(e);
  return yn(r, n, t);
}
o(gn, "execaCommand");

// src/telemetry/exec-command-count-lines.ts
async function le(e, t) {
  let r = gn(e, { shell: !0, buffer: !1, ...t });
  if (!r.stdout)
    throw new Error("Unexpected missing stdout");
  let n = 0, i = gs(r.stdout);
  return i.on("line", () => {
    n += 1;
  }), await r, i.close(), n;
}
o(le, "execCommandCountLines");

// ../node_modules/slash/index.js
function at(e) {
  return e.startsWith("\\\\?\\") ? e : e.replace(/\\/g, "/");
}
o(at, "slash");

// src/common/utils/file-cache.ts
import { createHash as bn, randomBytes as bs } from "node:crypto";
import { mkdirSync as ct, readFileSync as xs, readdirSync as ws, rmSync as xn, writeFileSync as Ss } from "node:fs";
import { readFile as wn, readdir as Sn, rm as kn, writeFile as ks } from "node:fs/promises";
import { tmpdir as Es } from "node:os";
import { join as B } from "node:path";
var ut = class {
  static {
    o(this, "FileSystemCache");
  }
  constructor(t = {}) {
    this.prefix = (t.ns || t.prefix || "") + "-", this.hash_alg = t.hash_alg || "md5", this.cache_dir = t.basePath || B(Es(), bs(15).toString(
    "base64").replace(/\//g, "-")), this.ttl = t.ttl || 0, bn(this.hash_alg), ct(this.cache_dir, { recursive: !0 });
  }
  generateHash(t) {
    return B(this.cache_dir, this.prefix + bn(this.hash_alg).update(t).digest("hex"));
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
      let n = await wn(this.generateHash(t), "utf8");
      return this.parseCacheData(n, r);
    } catch {
      return r;
    }
  }
  getSync(t, r) {
    try {
      let n = xs(this.generateHash(t), "utf8");
      return this.parseCacheData(n, r);
    } catch {
      return r;
    }
  }
  async set(t, r, n = {}) {
    let i = typeof n == "number" ? { ttl: n } : n;
    ct(this.cache_dir, { recursive: !0 }), await ks(this.generateHash(t), this.parseSetData(t, r, i), {
      encoding: i.encoding || "utf8"
    });
  }
  setSync(t, r, n = {}) {
    let i = typeof n == "number" ? { ttl: n } : n;
    ct(this.cache_dir, { recursive: !0 }), Ss(this.generateHash(t), this.parseSetData(t, r, i), {
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
    await kn(this.generateHash(t), { force: !0 });
  }
  removeSync(t) {
    xn(this.generateHash(t), { force: !0 });
  }
  async clear() {
    let t = await Sn(this.cache_dir);
    await Promise.all(
      t.filter((r) => r.startsWith(this.prefix)).map((r) => kn(B(this.cache_dir, r), { force: !0 }))
    );
  }
  clearSync() {
    ws(this.cache_dir).filter((t) => t.startsWith(this.prefix)).forEach((t) => xn(B(this.cache_dir, t), { force: !0 }));
  }
  async getAll() {
    let t = Date.now(), r = await Sn(this.cache_dir);
    return (await Promise.all(
      r.filter((i) => i.startsWith(this.prefix)).map((i) => wn(B(this.cache_dir, i), "utf8"))
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
function ft(e) {
  return new ut(e);
}
o(ft, "createFileSystemCache");

// src/common/utils/resolve-path-in-sb-cache.ts
import { join as Rn } from "node:path";

// ../node_modules/find-cache-dir/index.js
var jn = A(Pn(), 1);
import Ls from "node:process";
import G from "node:path";
import me from "node:fs";

// ../node_modules/pkg-dir/index.js
import Ms from "node:path";

// ../node_modules/pkg-dir/node_modules/find-up/index.js
import pe from "node:path";
import { fileURLToPath as Rs } from "node:url";

// ../node_modules/locate-path/index.js
import Ts from "node:process";
import Cs from "node:path";
import vn, { promises as fl } from "node:fs";
import { fileURLToPath as Is } from "node:url";
var Tn = {
  directory: "isDirectory",
  file: "isFile"
};
function As(e) {
  if (!Object.hasOwnProperty.call(Tn, e))
    throw new Error(`Invalid type specified: ${e}`);
}
o(As, "checkType");
var Os = /* @__PURE__ */ o((e, t) => t[Tn[e]](), "matchType"), js = /* @__PURE__ */ o((e) => e instanceof URL ? Is(e) : e, "toPath");
function lt(e, {
  cwd: t = Ts.cwd(),
  type: r = "file",
  allowSymlinks: n = !0
} = {}) {
  As(r), t = js(t);
  let i = n ? vn.statSync : vn.lstatSync;
  for (let s of e)
    try {
      let a = i(Cs.resolve(t, s), {
        throwIfNoEntry: !1
      });
      if (!a)
        continue;
      if (Os(r, a))
        return s;
    } catch {
    }
}
o(lt, "locatePathSync");

// ../node_modules/pkg-dir/node_modules/path-exists/index.js
import hl, { promises as gl } from "node:fs";

// ../node_modules/pkg-dir/node_modules/find-up/index.js
var Ns = /* @__PURE__ */ o((e) => e instanceof URL ? Rs(e) : e, "toPath"), Ds = Symbol("findUpStop");
function _s(e, t = {}) {
  let r = pe.resolve(Ns(t.cwd) || ""), { root: n } = pe.parse(r), i = t.stopAt || n, s = t.limit || Number.POSITIVE_INFINITY, a = [e].flat(),
  c = /* @__PURE__ */ o((f) => {
    if (typeof e != "function")
      return lt(a, f);
    let l = e(f.cwd);
    return typeof l == "string" ? lt([l], f) : l;
  }, "runMatcher"), u = [];
  for (; ; ) {
    let f = c({ ...t, cwd: r });
    if (f === Ds || (f && u.push(pe.resolve(r, f)), r === i || u.length >= s))
      break;
    r = pe.dirname(r);
  }
  return u;
}
o(_s, "findUpMultipleSync");
function Cn(e, t = {}) {
  return _s(e, { ...t, limit: 1 })[0];
}
o(Cn, "findUpSync");

// ../node_modules/pkg-dir/index.js
function In({ cwd: e } = {}) {
  let t = Cn("package.json", { cwd: e });
  return t && Ms.dirname(t);
}
o(In, "packageDirectorySync");

// ../node_modules/find-cache-dir/index.js
var { env: pt, cwd: Fs } = Ls, An = /* @__PURE__ */ o((e) => {
  try {
    return me.accessSync(e, me.constants.W_OK), !0;
  } catch {
    return !1;
  }
}, "isWritable");
function On(e, t) {
  return t.create && me.mkdirSync(e, { recursive: !0 }), e;
}
o(On, "useDirectory");
function Bs(e) {
  let t = G.join(e, "node_modules");
  if (!(!An(t) && (me.existsSync(t) || !An(G.join(e)))))
    return t;
}
o(Bs, "getNodeModuleDirectory");
function mt(e = {}) {
  if (pt.CACHE_DIR && !["true", "false", "1", "0"].includes(pt.CACHE_DIR))
    return On(G.join(pt.CACHE_DIR, e.name), e);
  let { cwd: t = Fs(), files: r } = e;
  if (r) {
    if (!Array.isArray(r))
      throw new TypeError(`Expected \`files\` option to be an array, got \`${typeof r}\`.`);
    t = (0, jn.default)(r.map((i) => G.resolve(t, i)));
  }
  if (t = In({ cwd: t }), !(!t || !Bs(t)))
    return On(G.join(t, "node_modules", ".cache", e.name), e);
}
o(mt, "findCacheDirectory");

// src/common/utils/resolve-path-in-sb-cache.ts
function Nn(e, t = "default") {
  let r = mt({ name: "storybook" });
  return r ||= Rn(process.cwd(), "node_modules", ".cache", "storybook"), Rn(r, t, e);
}
o(Nn, "resolvePathInStorybookCache");

// src/telemetry/run-telemetry-operation.ts
var Dn = ft({
  basePath: Nn("telemetry"),
  ns: "storybook",
  ttl: 24 * 60 * 60 * 1e3
  // 24h
}), de = /* @__PURE__ */ o(async (e, t) => {
  let r = await Dn.get(e);
  return r === void 0 && (r = await t(), r !== void 0 && await Dn.set(e, r)), r;
}, "runTelemetryOperation");

// src/telemetry/get-application-file-count.ts
var Us = ["page", "screen"], $s = ["js", "jsx", "ts", "tsx"], Ws = /* @__PURE__ */ o(async (e) => {
  let r = Us.flatMap((n) => [
    n,
    [n[0].toUpperCase(), ...n.slice(1)].join("")
  ]).flatMap(
    (n) => $s.map((i) => `"${e}${Gs}*${n}*.${i}"`)
  );
  try {
    let n = `git ls-files -- ${r.join(" ")}`;
    return await le(n);
  } catch {
    return;
  }
}, "getApplicationFilesCountUncached"), _n = /* @__PURE__ */ o(async (e) => de(
  "applicationFiles",
  async () => Ws(e)
), "getApplicationFileCount");

// src/telemetry/get-chromatic-version.ts
function Mn(e) {
  let t = e.dependencies?.chromatic || e.devDependencies?.chromatic || e.peerDependencies?.chromatic;
  return t || (e.scripts && Object.values(e.scripts).find((r) => r?.match(/chromatic/)) ? "latest" : void 0);
}
o(Mn, "getChromaticVersionSpecifier");

// src/telemetry/get-framework-info.ts
import { normalize as qs } from "node:path";
import { frameworkPackages as Vs } from "@storybook/core/common";

// src/telemetry/package-json.ts
import { readFile as Hs } from "node:fs/promises";
import { join as Js } from "node:path";
var dt = /* @__PURE__ */ o(async (e) => {
  let t = Object.keys(e);
  return Promise.all(t.map(ye));
}, "getActualPackageVersions"), ye = /* @__PURE__ */ o(async (e) => {
  try {
    let t = await yt(e);
    return {
      name: e,
      version: t.version
    };
  } catch {
    return { name: e, version: null };
  }
}, "getActualPackageVersion"), yt = /* @__PURE__ */ o(async (e) => {
  let t = S.resolve(Js(e, "package.json"), {
    paths: [process.cwd()]
  });
  return JSON.parse(await Hs(t, { encoding: "utf8" }));
}, "getActualPackageJson");

// src/telemetry/get-framework-info.ts
var zs = [
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
], Ys = ["builder-webpack5", "builder-vite"];
function Ln(e, t) {
  let { name: r = "", version: n, dependencies: i, devDependencies: s, peerDependencies: a } = e, c = {
    // We include the framework itself because it may be a renderer too (e.g. angular)
    [r]: n,
    ...i,
    ...s,
    ...a
  };
  return t.map((u) => `@storybook/${u}`).find((u) => c[u]);
}
o(Ln, "findMatchingPackage");
var Ks = /* @__PURE__ */ o((e) => {
  let t = qs(e).replace(new RegExp(/\\/, "g"), "/");
  return Object.keys(Vs).find((n) => t.endsWith(n)) || D(e).replace(/.*node_modules[\\/]/, "");
}, "getFrameworkPackageName");
async function Fn(e) {
  if (!e?.framework)
    return {};
  let t = typeof e.framework == "string" ? e.framework : e.framework?.name;
  if (!t)
    return {};
  let r = await yt(t);
  if (!r)
    return {};
  let n = Ln(r, Ys), i = Ln(r, zs), s = Ks(t), a = typeof e.framework == "object" ? e.framework.options : {};
  return {
    framework: {
      name: s,
      options: a
    },
    builder: n,
    renderer: i
  };
}
o(Fn, "getFrameworkInfo");

// src/telemetry/get-has-router-package.ts
var Xs = /* @__PURE__ */ new Set([
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
function Bn(e) {
  return Object.keys(e?.dependencies ?? {}).some(
    (t) => Xs.has(t)
  );
}
o(Bn, "getHasRouterPackage");

// src/telemetry/get-monorepo-type.ts
import { existsSync as Gn, readFileSync as Qs } from "node:fs";
import { join as ht } from "node:path";
import { getProjectRoot as Zs } from "@storybook/core/common";
var Un = {
  Nx: "nx.json",
  Turborepo: "turbo.json",
  Lerna: "lerna.json",
  Rush: "rush.json",
  Lage: "lage.config.json"
}, $n = /* @__PURE__ */ o(() => {
  let e = Zs();
  if (!e)
    return;
  let r = Object.keys(Un).find((i) => {
    let s = ht(e, Un[i]);
    return Gn(s);
  });
  if (r)
    return r;
  if (!Gn(ht(e, "package.json")))
    return;
  if (JSON.parse(
    Qs(ht(e, "package.json"), { encoding: "utf8" })
  )?.workspaces)
    return "Workspaces";
}, "getMonorepoType");

// src/telemetry/get-portable-stories-usage.ts
var ea = /* @__PURE__ */ o(async (e) => {
  try {
    let t = "git grep -l composeStor" + (e ? ` -- ${e}` : "");
    return await le(t);
  } catch (t) {
    return t.exitCode === 1 ? 0 : void 0;
  }
}, "getPortableStoriesFileCountUncached"), Wn = /* @__PURE__ */ o(async (e) => de(
  "portableStories",
  async () => ea(e)
), "getPortableStoriesFileCount");

// src/telemetry/storybook-metadata.ts
var Hn = {
  next: "Next",
  "react-scripts": "CRA",
  gatsby: "Gatsby",
  "@nuxtjs/storybook": "nuxt",
  "@nrwl/storybook": "nx",
  "@vue/cli-service": "vue-cli",
  "@sveltejs/kit": "sveltekit"
}, Jn = /* @__PURE__ */ o((e) => D(e).replace(/\/dist\/.*/, "").replace(/\.[mc]?[tj]?s[x]?$/, "").replace(/\/register$/, "").replace(/\/manager$/,
"").replace(/\/preset$/, ""), "sanitizeAddonName"), ca = /* @__PURE__ */ o(async ({
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
  }, s = Object.keys(i).find((p) => !!Hn[p]);
  if (s) {
    let { version: p } = await ye(s);
    n.metaFramework = {
      name: Hn[s],
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
    (p) => a.find((w) => p.includes(w))
  );
  n.testPackages = Object.fromEntries(
    await Promise.all(
      c.map(async (p) => [p, (await ye(p))?.version])
    )
  ), n.hasRouterPackage = Bn(t);
  let u = $n();
  u && (n.monorepo = u);
  try {
    let p = await Te({ cwd: ra() });
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
      storybookVersionSpecifier: sa.storybook,
      language: f
    };
  n.hasCustomBabel = !!r.babel, n.hasCustomWebpack = !!r.webpackFinal, n.hasStaticDirs = !!r.staticDirs, typeof r.typescript == "object" && (n.
  typescriptOptions = r.typescript);
  let l = await Fn(r);
  typeof r.refs == "object" && (n.refCount = Object.keys(r.refs).length), typeof r.features == "object" && (n.features = r.features);
  let d = {};
  r.addons && r.addons.forEach((p) => {
    let w, J;
    typeof p == "string" ? w = Jn(p) : (p.name.includes("addon-essentials") && (J = p.options), w = Jn(p.name)), d[w] = {
      options: J,
      version: void 0
    };
  });
  let h = Mn(t);
  h && (d.chromatic = {
    version: void 0,
    versionSpecifier: h,
    options: void 0
  }), (await dt(d)).forEach(({ name: p, version: w }) => {
    d[p].version = w;
  });
  let g = Object.keys(d), m = Object.keys(i).filter((p) => p.includes("storybook") && !g.includes(p)).reduce((p, w) => ({
    ...p,
    [w]: { version: void 0 }
  }), {});
  (await dt(m)).forEach(({ name: p, version: w }) => {
    m[p].version = w;
  });
  let C = !!i["eslint-plugin-storybook"], k = oa(t);
  try {
    let { previewConfig: p } = k;
    if (p) {
      let w = await aa(p), J = !!(w.getFieldNode(["globals"]) || w.getFieldNode(["globalTypes"]));
      n.preview = { ...n.preview, usesGlobals: J };
    }
  } catch {
  }
  let I = m[k.frameworkPackage]?.version, W = await Wn(), H = await _n(ta(e));
  return {
    ...n,
    ...l,
    portableStoriesFileCount: W,
    applicationFileCount: H,
    storybookVersion: I,
    storybookVersionSpecifier: k.version,
    language: f,
    storybookPackages: m,
    addons: d,
    hasStorybookEslint: C
  };
}, "computeStorybookMetadata");
async function ua() {
  let e = await ke(process.cwd());
  return e ? {
    packageJsonPath: e,
    packageJson: await Dt(e) || {}
  } : {
    packageJsonPath: process.cwd(),
    packageJson: {}
  };
}
o(ua, "getPackageJsonDetails");
var he, qn = /* @__PURE__ */ o(async (e) => {
  if (he)
    return he;
  let { packageJson: t, packageJsonPath: r } = await ua(), n = (e || na(
    String(t?.scripts?.storybook || ""),
    "-c",
    "--config-dir"
  )) ?? ".storybook", i = await ia({ configDir: n }).catch(() => {
  });
  return he = await ca({ mainConfig: i, packageJson: t, packageJsonPath: r }), he;
}, "getStorybookMetadata");

// src/telemetry/telemetry.ts
var no = A(zn(), 1);
import * as ro from "node:os";

// ../node_modules/nanoid/index.js
import { randomFillSync as Kn } from "crypto";

// ../node_modules/nanoid/url-alphabet/index.js
var Yn = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

// ../node_modules/nanoid/index.js
var fa = 128, T, N, la = /* @__PURE__ */ o((e) => {
  !T || T.length < e ? (T = Buffer.allocUnsafe(e * fa), Kn(T), N = 0) : N + e > T.length && (Kn(T), N = 0), N += e;
}, "fillPool");
var U = /* @__PURE__ */ o((e = 21) => {
  la(e -= 0);
  let t = "";
  for (let r = N - e; r < N; r++)
    t += Yn[T[r] & 63];
  return t;
}, "nanoid");

// src/telemetry/anonymous-id.ts
import { relative as ma } from "node:path";
import { getProjectRoot as da } from "@storybook/core/common";
import { execSync as ya } from "child_process";

// src/telemetry/one-way-hash.ts
import { createHash as pa } from "crypto";
var gt = /* @__PURE__ */ o((e) => {
  let t = pa("sha256");
  return t.update("storybook-telemetry-salt"), t.update(e), t.digest("hex");
}, "oneWayHash");

// src/telemetry/anonymous-id.ts
function ha(e) {
  let n = e.trim().replace(/#.*$/, "").replace(/^.*@/, "").replace(/^.*\/\//, "");
  return (n.endsWith(".git") ? n : `${n}.git`).replace(":", "/");
}
o(ha, "normalizeGitUrl");
function ga(e, t) {
  return `${ha(e)}${at(t)}`;
}
o(ga, "unhashedProjectId");
var be, Xn = /* @__PURE__ */ o(() => {
  if (be)
    return be;
  try {
    let e = da(), t = ma(e, process.cwd()), r = ya("git config --local --get remote.origin.url", {
      timeout: 1e3,
      stdio: "pipe"
    });
    be = gt(ga(String(r), t));
  } catch {
  }
  return be;
}, "getAnonymousProjectId");

// src/telemetry/event-cache.ts
import { cache as xt } from "@storybook/core/common";
var bt = Promise.resolve(), ba = /* @__PURE__ */ o(async (e, t) => {
  let r = await xt.get("lastEvents") || {};
  r[e] = { body: t, timestamp: Date.now() }, await xt.set("lastEvents", r);
}, "setHelper"), Zn = /* @__PURE__ */ o(async (e, t) => (await bt, bt = ba(e, t), bt), "set");
var xa = /* @__PURE__ */ o((e) => {
  let { body: t, timestamp: r } = e;
  return {
    timestamp: r,
    eventType: t?.eventType,
    eventId: t?.eventId,
    sessionId: t?.sessionId
  };
}, "upgradeFields"), wa = ["init", "upgrade"], Sa = ["build", "dev", "error"], Qn = /* @__PURE__ */ o((e, t) => {
  let r = t.map((n) => e?.[n]).filter(Boolean).sort((n, i) => i.timestamp - n.timestamp);
  return r.length > 0 ? r[0] : void 0;
}, "lastEvent"), ka = /* @__PURE__ */ o(async (e = void 0) => {
  let t = e || await xt.get("lastEvents") || {}, r = Qn(t, wa), n = Qn(t, Sa);
  if (r)
    return !n?.timestamp || r.timestamp > n.timestamp ? xa(r) : void 0;
}, "getPrecedingUpgrade");

// src/telemetry/fetch.ts
var eo = global.fetch;

// src/telemetry/session-id.ts
import { cache as to } from "@storybook/core/common";
var Ea = 1e3 * 60 * 60 * 2, $;
var wt = /* @__PURE__ */ o(async () => {
  let e = Date.now();
  if (!$) {
    let t = await to.get("session");
    t && t.lastUsed >= e - Ea ? $ = t.id : $ = U();
  }
  return await to.set("session", { id: $, lastUsed: e }), $;
}, "getSessionId");

// src/telemetry/telemetry.ts
var Pa = (0, no.default)(eo), va = process.env.STORYBOOK_TELEMETRY_URL || "https://storybook.js.org/event-log", xe = [], Ta = /* @__PURE__ */ o(
(e, t) => {
  St[e] = t;
}, "addToGlobalContext"), Ca = /* @__PURE__ */ o(() => {
  try {
    let e = ro.platform();
    return e === "win32" ? "Windows" : e === "darwin" ? "macOS" : e === "linux" ? "Linux" : `Other: ${e}`;
  } catch {
    return "Unknown";
  }
}, "getOperatingSystem"), St = {
  inCI: !!process.env.CI,
  isTTY: process.stdout.isTTY,
  platform: Ca(),
  nodeVersion: process.versions.node
}, Ia = /* @__PURE__ */ o(async (e, t, r) => {
  let { eventType: n, payload: i, metadata: s, ...a } = e, c = await wt(), u = U(), f = { ...a, eventType: n, eventId: u, sessionId: c, metadata: s,
  payload: i, context: t };
  return Pa(va, {
    method: "post",
    body: JSON.stringify(f),
    headers: { "Content-Type": "application/json" },
    retries: 3,
    retryOn: [503, 504],
    retryDelay: /* @__PURE__ */ o((l) => 2 ** l * (typeof r?.retryDelay == "number" && !Number.isNaN(r?.retryDelay) ? r.retryDelay : 1e3), "\
retryDelay")
  });
}, "prepareRequest");
async function oo(e, t = { retryDelay: 1e3, immediate: !1 }) {
  let { eventType: r, payload: n, metadata: i, ...s } = e, a = t.stripMetadata ? St : {
    ...St,
    anonymousId: Xn()
  }, c;
  try {
    c = Ia(e, a, t), xe.push(c), t.immediate ? await Promise.all(xe) : await c;
    let u = await wt(), f = U(), l = { ...s, eventType: r, eventId: f, sessionId: u, metadata: i, payload: n, context: a };
    await Zn(r, l);
  } catch {
  } finally {
    xe = xe.filter((u) => u !== c);
  }
}
o(oo, "sendTelemetry");

// src/telemetry/index.ts
var cd = /* @__PURE__ */ o((e) => e.startsWith("example-button--") || e.startsWith("example-header--") || e.startsWith("example-page--"), "i\
sExampleStoryId"), ud = /* @__PURE__ */ o(async (e, t = {}, r = {}) => {
  e !== "boot" && r.notify !== !1 && await Ct();
  let n = {
    eventType: e,
    payload: t
  };
  try {
    r?.stripMetadata || (n.metadata = await qn(r?.configDir));
  } catch (i) {
    n.payload.metadataErrorMessage = z(i).message, r?.enableCrashReports && (n.payload.metadataError = z(i));
  } finally {
    let { error: i } = n.payload;
    i && (n.payload.error = z(i)), (!n.payload.error || r?.enableCrashReports) && (process.env?.STORYBOOK_TELEMETRY_DEBUG && (io.info(`
[telemetry]`), io.info(JSON.stringify(n, null, 2))), await oo(n, r));
  }
}, "telemetry");
export {
  Ta as addToGlobalContext,
  D as cleanPaths,
  ca as computeStorybookMetadata,
  ka as getPrecedingUpgrade,
  qn as getStorybookMetadata,
  cd as isExampleStoryId,
  Hn as metaFrameworks,
  gt as oneWayHash,
  At as removeAnsiEscapeCodes,
  Jn as sanitizeAddonName,
  z as sanitizeError,
  ud as telemetry
};
