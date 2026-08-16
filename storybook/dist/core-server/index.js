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
  isTelemetryModuleEnabled,
  telemetry
} from "../_node-chunks/chunk-Y6WAHW2B.js";
import "../_node-chunks/chunk-UMBKBPP5.js";
import {
  CLAUDE_PREVIEW_AGENT_NAME,
  isClaudePreviewLaunch
} from "../_node-chunks/chunk-QEBWU6LU.js";
import {
  detectAgent
} from "../_node-chunks/chunk-U4OORGLD.js";
import "../_node-chunks/chunk-IN7NJS2T.js";
import {
  execa,
  require_cross_spawn,
  resolveImport,
  supportedExtensions,
  userOrAutoTitleFromSpecifier
} from "../_node-chunks/chunk-LEFX2TGG.js";
import "../_node-chunks/chunk-YGMEVHTF.js";
import "../_node-chunks/chunk-DRKKE7WX.js";
import {
  logger,
  require_pretty_hrtime
} from "../_node-chunks/chunk-FVPBTK6Q.js";
import {
  UniversalStore,
  analyzeTestResults,
  debounce,
  defineService,
  docgenManifestRef,
  docgenStaticStorePath,
  fullTestProviderStore,
  generateStoryFile,
  getComponentCandidates,
  getErrorLevel,
  getStoryIdsByAbsolutePath,
  getTestProviderStoreById,
  getWsToken,
  mapStaticDir,
  parseStaticDir,
  resolveChangeDetectionAdapter,
  runStoryTests,
  sendTelemetryError,
  storyDocsManifestRef,
  storyDocsStaticStorePath,
  toStoryTestResult,
  universalTestProviderStore,
  useStatics,
  withTelemetry
} from "../_node-chunks/chunk-XYZ5NBEV.js";
import "../_node-chunks/chunk-KIY3O3SC.js";
import "../_node-chunks/chunk-IDSUOV3G.js";
import "../_node-chunks/chunk-UWEHU3AF.js";
import "../_node-chunks/chunk-LQX45LAM.js";
import {
  Channel,
  describeService,
  getRegisteredServices,
  getService,
  listServices,
  optionalEnvToBoolean,
  registerService,
  writeOpenServiceStaticFiles
} from "../_node-chunks/chunk-BVQV5AQI.js";
import "../_node-chunks/chunk-HGQEN5BB.js";
import {
  Tag
} from "../_node-chunks/chunk-RW6CS4VF.js";
import "../_node-chunks/chunk-Z35MCY7K.js";
import {
  UNIVERSAL_STATUS_STORE_OPTIONS,
  createStatusStore,
  detectPnp
} from "../_node-chunks/chunk-LISHZJOF.js";
import {
  require_lib,
  require_src
} from "../_node-chunks/chunk-3KWZUKIJ.js";
import "../_node-chunks/chunk-57EPATSG.js";
import {
  invariant,
  up2 as up
} from "../_node-chunks/chunk-TWPZPMFT.js";
import {
  importModule,
  resolvePackageDir
} from "../_node-chunks/chunk-OS6I5BZG.js";
import "../_node-chunks/chunk-GTBJHD7H.js";
import "../_node-chunks/chunk-ZGQ7HJL4.js";
import {
  StorybookError
} from "../_node-chunks/chunk-BKV2AHET.js";
import {
  require_dist
} from "../_node-chunks/chunk-TWWDCALS.js";
import {
  require_picocolors
} from "../_node-chunks/chunk-STC3JUUJ.js";
import {
  storyIndexPathToAbsolutePath
} from "../_node-chunks/chunk-VRYTK5KC.js";
import {
  dirname,
  isAbsolute,
  join,
  normalize,
  relative,
  resolve
} from "../_node-chunks/chunk-4XX73STB.js";
import {
  slash
} from "../_node-chunks/chunk-2ZXZGW35.js";
import "../_node-chunks/chunk-5EYNHKVG.js";
import {
  __commonJS,
  __esm,
  __export,
  __require,
  __toCommonJS,
  __toESM
} from "../_node-chunks/chunk-5SSDLDTJ.js";

// ../../node_modules/watchpack/lib/LinkResolver.js
var require_LinkResolver = __commonJS({
  "../../node_modules/watchpack/lib/LinkResolver.js"(exports, module) {
    "use strict";
    var fs = __require("fs"), path2 = __require("path"), EXPECTED_ERRORS = /* @__PURE__ */ new Set(["EINVAL", "ENOENT"]);
    process.platform === "win32" && EXPECTED_ERRORS.add("UNKNOWN");
    var LinkResolver = class {
      constructor() {
        this.cache = /* @__PURE__ */ new Map();
      }
      /**
       * @param {string} file path to file or directory
       * @returns {readonly string[]} array of file and all symlinks contributed in the resolving process (first item is the resolved file)
       */
      resolve(file) {
        let cacheEntry = this.cache.get(file);
        if (cacheEntry !== void 0)
          return cacheEntry;
        let parent = path2.dirname(file);
        if (parent === file) {
          let result = Object.freeze([file]);
          return this.cache.set(file, result), result;
        }
        let parentResolved = this.resolve(parent), realFile = file;
        if (parentResolved[0] !== parent) {
          let basename4 = path2.basename(file);
          realFile = path2.resolve(parentResolved[0], basename4);
        }
        try {
          let linkContent = fs.readlinkSync(realFile), resolvedLink = path2.resolve(parentResolved[0], linkContent), linkResolved = this.resolve(resolvedLink), result;
          if (linkResolved.length > 1 && parentResolved.length > 1) {
            let resultSet = new Set(linkResolved);
            resultSet.add(realFile);
            for (let i2 = 1; i2 < parentResolved.length; i2++)
              resultSet.add(parentResolved[i2]);
            result = Object.freeze([...resultSet]);
          } else parentResolved.length > 1 ? (result = [...parentResolved], result[0] = linkResolved[0], result.push(realFile), Object.freeze(result)) : linkResolved.length > 1 ? (result = [...linkResolved], result.push(realFile), Object.freeze(result)) : result = Object.freeze([
            // the resolve real location
            linkResolved[0],
            // add the link
            realFile
          ]);
          return this.cache.set(file, result), result;
        } catch (err) {
          if (
            /** @type {NodeJS.ErrnoException} */
            err.code && !EXPECTED_ERRORS.has(
              /** @type {NodeJS.ErrnoException} */
              err.code
            )
          )
            throw err;
          let result = [...parentResolved];
          return result[0] = realFile, Object.freeze(result), this.cache.set(file, result), result;
        }
      }
    };
    module.exports = LinkResolver;
  }
});

// ../../node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS({
  "../../node_modules/graceful-fs/polyfills.js"(exports, module) {
    var constants = __require("constants"), origCwd = process.cwd, cwd = null, platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      return cwd || (cwd = origCwd.call(process)), cwd;
    };
    try {
      process.cwd();
    } catch {
    }
    typeof process.chdir == "function" && (chdir = process.chdir, process.chdir = function(d) {
      cwd = null, chdir.call(process, d);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, chdir));
    var chdir;
    module.exports = patch;
    function patch(fs) {
      constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && patchLchmod(fs), fs.lutimes || patchLutimes(fs), fs.chown = chownFix(fs.chown), fs.fchown = chownFix(fs.fchown), fs.lchown = chownFix(fs.lchown), fs.chmod = chmodFix(fs.chmod), fs.fchmod = chmodFix(fs.fchmod), fs.lchmod = chmodFix(fs.lchmod), fs.chownSync = chownFixSync(fs.chownSync), fs.fchownSync = chownFixSync(fs.fchownSync), fs.lchownSync = chownFixSync(fs.lchownSync), fs.chmodSync = chmodFixSync(fs.chmodSync), fs.fchmodSync = chmodFixSync(fs.fchmodSync), fs.lchmodSync = chmodFixSync(fs.lchmodSync), fs.stat = statFix(fs.stat), fs.fstat = statFix(fs.fstat), fs.lstat = statFix(fs.lstat), fs.statSync = statFixSync(fs.statSync), fs.fstatSync = statFixSync(fs.fstatSync), fs.lstatSync = statFixSync(fs.lstatSync), fs.chmod && !fs.lchmod && (fs.lchmod = function(path2, mode, cb) {
        cb && process.nextTick(cb);
      }, fs.lchmodSync = function() {
      }), fs.chown && !fs.lchown && (fs.lchown = function(path2, uid, gid, cb) {
        cb && process.nextTick(cb);
      }, fs.lchownSync = function() {
      }), platform === "win32" && (fs.rename = typeof fs.rename != "function" ? fs.rename : (function(fs$rename) {
        function rename2(from, to, cb) {
          var start2 = Date.now(), backoff = 0;
          fs$rename(from, to, function CB(er) {
            if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start2 < 6e4) {
              setTimeout(function() {
                fs.stat(to, function(stater, st) {
                  stater && stater.code === "ENOENT" ? fs$rename(from, to, CB) : cb(er);
                });
              }, backoff), backoff < 100 && (backoff += 10);
              return;
            }
            cb && cb(er);
          });
        }
        return Object.setPrototypeOf && Object.setPrototypeOf(rename2, fs$rename), rename2;
      })(fs.rename)), fs.read = typeof fs.read != "function" ? fs.read : (function(fs$read) {
        function read(fd, buffer, offset2, length, position2, callback_) {
          var callback;
          if (callback_ && typeof callback_ == "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10)
                return eagCounter++, fs$read.call(fs, fd, buffer, offset2, length, position2, callback);
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs, fd, buffer, offset2, length, position2, callback);
        }
        return Object.setPrototypeOf && Object.setPrototypeOf(read, fs$read), read;
      })(fs.read), fs.readSync = typeof fs.readSync != "function" ? fs.readSync : /* @__PURE__ */ (function(fs$readSync) {
        return function(fd, buffer, offset2, length, position2) {
          for (var eagCounter = 0; ; )
            try {
              return fs$readSync.call(fs, fd, buffer, offset2, length, position2);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
        };
      })(fs.readSync);
      function patchLchmod(fs2) {
        fs2.lchmod = function(path2, mode, callback) {
          fs2.open(
            path2,
            constants.O_WRONLY | constants.O_SYMLINK,
            mode,
            function(err, fd) {
              if (err) {
                callback && callback(err);
                return;
              }
              fs2.fchmod(fd, mode, function(err2) {
                fs2.close(fd, function(err22) {
                  callback && callback(err2 || err22);
                });
              });
            }
          );
        }, fs2.lchmodSync = function(path2, mode) {
          var fd = fs2.openSync(path2, constants.O_WRONLY | constants.O_SYMLINK, mode), threw = !0, ret;
          try {
            ret = fs2.fchmodSync(fd, mode), threw = !1;
          } finally {
            if (threw)
              try {
                fs2.closeSync(fd);
              } catch {
              }
            else
              fs2.closeSync(fd);
          }
          return ret;
        };
      }
      function patchLutimes(fs2) {
        constants.hasOwnProperty("O_SYMLINK") && fs2.futimes ? (fs2.lutimes = function(path2, at2, mt, cb) {
          fs2.open(path2, constants.O_SYMLINK, function(er, fd) {
            if (er) {
              cb && cb(er);
              return;
            }
            fs2.futimes(fd, at2, mt, function(er2) {
              fs2.close(fd, function(er22) {
                cb && cb(er2 || er22);
              });
            });
          });
        }, fs2.lutimesSync = function(path2, at2, mt) {
          var fd = fs2.openSync(path2, constants.O_SYMLINK), ret, threw = !0;
          try {
            ret = fs2.futimesSync(fd, at2, mt), threw = !1;
          } finally {
            if (threw)
              try {
                fs2.closeSync(fd);
              } catch {
              }
            else
              fs2.closeSync(fd);
          }
          return ret;
        }) : fs2.futimes && (fs2.lutimes = function(_a, _b, _c, cb) {
          cb && process.nextTick(cb);
        }, fs2.lutimesSync = function() {
        });
      }
      function chmodFix(orig) {
        return orig && function(target, mode, cb) {
          return orig.call(fs, target, mode, function(er) {
            chownErOk(er) && (er = null), cb && cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        return orig && function(target, mode) {
          try {
            return orig.call(fs, target, mode);
          } catch (er) {
            if (!chownErOk(er)) throw er;
          }
        };
      }
      function chownFix(orig) {
        return orig && function(target, uid, gid, cb) {
          return orig.call(fs, target, uid, gid, function(er) {
            chownErOk(er) && (er = null), cb && cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        return orig && function(target, uid, gid) {
          try {
            return orig.call(fs, target, uid, gid);
          } catch (er) {
            if (!chownErOk(er)) throw er;
          }
        };
      }
      function statFix(orig) {
        return orig && function(target, options, cb) {
          typeof options == "function" && (cb = options, options = null);
          function callback(er, stats) {
            stats && (stats.uid < 0 && (stats.uid += 4294967296), stats.gid < 0 && (stats.gid += 4294967296)), cb && cb.apply(this, arguments);
          }
          return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
        };
      }
      function statFixSync(orig) {
        return orig && function(target, options) {
          var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
          return stats && (stats.uid < 0 && (stats.uid += 4294967296), stats.gid < 0 && (stats.gid += 4294967296)), stats;
        };
      }
      function chownErOk(er) {
        if (!er || er.code === "ENOSYS")
          return !0;
        var nonroot = !process.getuid || process.getuid() !== 0;
        return !!(nonroot && (er.code === "EINVAL" || er.code === "EPERM"));
      }
    }
  }
});

// ../../node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS({
  "../../node_modules/graceful-fs/legacy-streams.js"(exports, module) {
    var Stream = __require("stream").Stream;
    module.exports = legacy;
    function legacy(fs) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path2, options) {
        if (!(this instanceof ReadStream)) return new ReadStream(path2, options);
        Stream.call(this);
        var self2 = this;
        this.path = path2, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, options = options || {};
        for (var keys = Object.keys(options), index2 = 0, length = keys.length; index2 < length; index2++) {
          var key2 = keys[index2];
          this[key2] = options[key2];
        }
        if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
          if (typeof this.start != "number")
            throw TypeError("start must be a Number");
          if (this.end === void 0)
            this.end = 1 / 0;
          else if (typeof this.end != "number")
            throw TypeError("end must be a Number");
          if (this.start > this.end)
            throw new Error("start must be <= end");
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self2._read();
          });
          return;
        }
        fs.open(this.path, this.flags, this.mode, function(err, fd) {
          if (err) {
            self2.emit("error", err), self2.readable = !1;
            return;
          }
          self2.fd = fd, self2.emit("open", fd), self2._read();
        });
      }
      function WriteStream(path2, options) {
        if (!(this instanceof WriteStream)) return new WriteStream(path2, options);
        Stream.call(this), this.path = path2, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, options = options || {};
        for (var keys = Object.keys(options), index2 = 0, length = keys.length; index2 < length; index2++) {
          var key2 = keys[index2];
          this[key2] = options[key2];
        }
        if (this.start !== void 0) {
          if (typeof this.start != "number")
            throw TypeError("start must be a Number");
          if (this.start < 0)
            throw new Error("start must be >= zero");
          this.pos = this.start;
        }
        this.busy = !1, this._queue = [], this.fd === null && (this._open = fs.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
      }
    }
  }
});

// ../../node_modules/graceful-fs/clone.js
var require_clone = __commonJS({
  "../../node_modules/graceful-fs/clone.js"(exports, module) {
    "use strict";
    module.exports = clone;
    var getPrototypeOf = Object.getPrototypeOf || function(obj) {
      return obj.__proto__;
    };
    function clone(obj) {
      if (obj === null || typeof obj != "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj) };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      return Object.getOwnPropertyNames(obj).forEach(function(key2) {
        Object.defineProperty(copy, key2, Object.getOwnPropertyDescriptor(obj, key2));
      }), copy;
    }
  }
});

// ../../node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS({
  "../../node_modules/graceful-fs/graceful-fs.js"(exports, module) {
    var fs = __require("fs"), polyfills = require_polyfills(), legacy = require_legacy_streams(), clone = require_clone(), util = __require("util"), gracefulQueue, previousSymbol;
    typeof Symbol == "function" && typeof Symbol.for == "function" ? (gracefulQueue = /* @__PURE__ */ Symbol.for("graceful-fs.queue"), previousSymbol = /* @__PURE__ */ Symbol.for("graceful-fs.previous")) : (gracefulQueue = "___graceful-fs.queue", previousSymbol = "___graceful-fs.previous");
    function noop() {
    }
    function publishQueue(context, queue2) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue2;
        }
      });
    }
    var debug = noop;
    util.debuglog ? debug = util.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (debug = function() {
      var m = util.format.apply(util, arguments);
      m = "GFS4: " + m.split(/\n/).join(`
GFS4: `), console.error(m);
    });
    fs[gracefulQueue] || (queue = global[gracefulQueue] || [], publishQueue(fs, queue), fs.close = (function(fs$close) {
      function close(fd, cb) {
        return fs$close.call(fs, fd, function(err) {
          err || resetQueue(), typeof cb == "function" && cb.apply(this, arguments);
        });
      }
      return Object.defineProperty(close, previousSymbol, {
        value: fs$close
      }), close;
    })(fs.close), fs.closeSync = (function(fs$closeSync) {
      function closeSync(fd) {
        fs$closeSync.apply(fs, arguments), resetQueue();
      }
      return Object.defineProperty(closeSync, previousSymbol, {
        value: fs$closeSync
      }), closeSync;
    })(fs.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      debug(fs[gracefulQueue]), __require("assert").equal(fs[gracefulQueue].length, 0);
    }));
    var queue;
    global[gracefulQueue] || publishQueue(global, fs[gracefulQueue]);
    module.exports = patch(clone(fs));
    process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched && (module.exports = patch(fs), fs.__patched = !0);
    function patch(fs2) {
      polyfills(fs2), fs2.gracefulify = patch, fs2.createReadStream = createReadStream, fs2.createWriteStream = createWriteStream2;
      var fs$readFile = fs2.readFile;
      fs2.readFile = readFile9;
      function readFile9(path2, options, cb) {
        return typeof options == "function" && (cb = options, options = null), go$readFile(path2, options, cb);
        function go$readFile(path3, options2, cb2, startTime) {
          return fs$readFile(path3, options2, function(err) {
            err && (err.code === "EMFILE" || err.code === "ENFILE") ? enqueue([go$readFile, [path3, options2, cb2], err, startTime || Date.now(), Date.now()]) : typeof cb2 == "function" && cb2.apply(this, arguments);
          });
        }
      }
      var fs$writeFile = fs2.writeFile;
      fs2.writeFile = writeFile6;
      function writeFile6(path2, data2, options, cb) {
        return typeof options == "function" && (cb = options, options = null), go$writeFile(path2, data2, options, cb);
        function go$writeFile(path3, data3, options2, cb2, startTime) {
          return fs$writeFile(path3, data3, options2, function(err) {
            err && (err.code === "EMFILE" || err.code === "ENFILE") ? enqueue([go$writeFile, [path3, data3, options2, cb2], err, startTime || Date.now(), Date.now()]) : typeof cb2 == "function" && cb2.apply(this, arguments);
          });
        }
      }
      var fs$appendFile = fs2.appendFile;
      fs$appendFile && (fs2.appendFile = appendFile);
      function appendFile(path2, data2, options, cb) {
        return typeof options == "function" && (cb = options, options = null), go$appendFile(path2, data2, options, cb);
        function go$appendFile(path3, data3, options2, cb2, startTime) {
          return fs$appendFile(path3, data3, options2, function(err) {
            err && (err.code === "EMFILE" || err.code === "ENFILE") ? enqueue([go$appendFile, [path3, data3, options2, cb2], err, startTime || Date.now(), Date.now()]) : typeof cb2 == "function" && cb2.apply(this, arguments);
          });
        }
      }
      var fs$copyFile = fs2.copyFile;
      fs$copyFile && (fs2.copyFile = copyFile);
      function copyFile(src, dest, flags, cb) {
        return typeof flags == "function" && (cb = flags, flags = 0), go$copyFile(src, dest, flags, cb);
        function go$copyFile(src2, dest2, flags2, cb2, startTime) {
          return fs$copyFile(src2, dest2, flags2, function(err) {
            err && (err.code === "EMFILE" || err.code === "ENFILE") ? enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]) : typeof cb2 == "function" && cb2.apply(this, arguments);
          });
        }
      }
      var fs$readdir = fs2.readdir;
      fs2.readdir = readdir2;
      var noReaddirOptionVersions = /^v[0-5]\./;
      function readdir2(path2, options, cb) {
        typeof options == "function" && (cb = options, options = null);
        var go$readdir = noReaddirOptionVersions.test(process.version) ? function(path3, options2, cb2, startTime) {
          return fs$readdir(path3, fs$readdirCallback(
            path3,
            options2,
            cb2,
            startTime
          ));
        } : function(path3, options2, cb2, startTime) {
          return fs$readdir(path3, options2, fs$readdirCallback(
            path3,
            options2,
            cb2,
            startTime
          ));
        };
        return go$readdir(path2, options, cb);
        function fs$readdirCallback(path3, options2, cb2, startTime) {
          return function(err, files) {
            err && (err.code === "EMFILE" || err.code === "ENFILE") ? enqueue([
              go$readdir,
              [path3, options2, cb2],
              err,
              startTime || Date.now(),
              Date.now()
            ]) : (files && files.sort && files.sort(), typeof cb2 == "function" && cb2.call(this, err, files));
          };
        }
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs2);
        ReadStream = legStreams.ReadStream, WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs2.ReadStream;
      fs$ReadStream && (ReadStream.prototype = Object.create(fs$ReadStream.prototype), ReadStream.prototype.open = ReadStream$open);
      var fs$WriteStream = fs2.WriteStream;
      fs$WriteStream && (WriteStream.prototype = Object.create(fs$WriteStream.prototype), WriteStream.prototype.open = WriteStream$open), Object.defineProperty(fs2, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(fs2, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val) {
          WriteStream = val;
        },
        enumerable: !0,
        configurable: !0
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs2, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: !0,
        configurable: !0
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs2, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: !0,
        configurable: !0
      });
      function ReadStream(path2, options) {
        return this instanceof ReadStream ? (fs$ReadStream.apply(this, arguments), this) : ReadStream.apply(Object.create(ReadStream.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open3(that.path, that.flags, that.mode, function(err, fd) {
          err ? (that.autoClose && that.destroy(), that.emit("error", err)) : (that.fd = fd, that.emit("open", fd), that.read());
        });
      }
      function WriteStream(path2, options) {
        return this instanceof WriteStream ? (fs$WriteStream.apply(this, arguments), this) : WriteStream.apply(Object.create(WriteStream.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open3(that.path, that.flags, that.mode, function(err, fd) {
          err ? (that.destroy(), that.emit("error", err)) : (that.fd = fd, that.emit("open", fd));
        });
      }
      function createReadStream(path2, options) {
        return new fs2.ReadStream(path2, options);
      }
      function createWriteStream2(path2, options) {
        return new fs2.WriteStream(path2, options);
      }
      var fs$open = fs2.open;
      fs2.open = open3;
      function open3(path2, flags, mode, cb) {
        return typeof mode == "function" && (cb = mode, mode = null), go$open(path2, flags, mode, cb);
        function go$open(path3, flags2, mode2, cb2, startTime) {
          return fs$open(path3, flags2, mode2, function(err, fd) {
            err && (err.code === "EMFILE" || err.code === "ENFILE") ? enqueue([go$open, [path3, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]) : typeof cb2 == "function" && cb2.apply(this, arguments);
          });
        }
      }
      return fs2;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]), fs[gracefulQueue].push(elem), retry();
    }
    var retryTimer;
    function resetQueue() {
      for (var now = Date.now(), i2 = 0; i2 < fs[gracefulQueue].length; ++i2)
        fs[gracefulQueue][i2].length > 2 && (fs[gracefulQueue][i2][3] = now, fs[gracefulQueue][i2][4] = now);
      retry();
    }
    function retry() {
      if (clearTimeout(retryTimer), retryTimer = void 0, fs[gracefulQueue].length !== 0) {
        var elem = fs[gracefulQueue].shift(), fn = elem[0], args = elem[1], err = elem[2], startTime = elem[3], lastTime = elem[4];
        if (startTime === void 0)
          debug("RETRY", fn.name, args), fn.apply(null, args);
        else if (Date.now() - startTime >= 6e4) {
          debug("TIMEOUT", fn.name, args);
          var cb = args.pop();
          typeof cb == "function" && cb.call(null, err);
        } else {
          var sinceAttempt = Date.now() - lastTime, sinceStart = Math.max(lastTime - startTime, 1), desiredDelay = Math.min(sinceStart * 1.2, 100);
          sinceAttempt >= desiredDelay ? (debug("RETRY", fn.name, args), fn.apply(null, args.concat([startTime]))) : fs[gracefulQueue].push(elem);
        }
        retryTimer === void 0 && (retryTimer = setTimeout(retry, 0));
      }
    }
  }
});

// ../../node_modules/watchpack/lib/reducePlan.js
var require_reducePlan = __commonJS({
  "../../node_modules/watchpack/lib/reducePlan.js"(exports, module) {
    "use strict";
    var path2 = __require("path");
    module.exports = (plan, limit) => {
      let treeMap = /* @__PURE__ */ new Map();
      for (let [target, value] of plan)
        treeMap.set(target, {
          target,
          parent: void 0,
          children: void 0,
          entries: 1,
          active: !0,
          value
        });
      let currentCount = treeMap.size;
      for (let node2 of treeMap.values()) {
        let parentPath = path2.dirname(node2.target);
        if (parentPath !== node2.target) {
          let parent = treeMap.get(parentPath);
          if (parent === void 0)
            parent = {
              target: parentPath,
              parent: void 0,
              children: [node2],
              entries: node2.entries,
              active: !1,
              value: void 0
            }, treeMap.set(parentPath, parent), node2.parent = parent;
          else {
            node2.parent = parent, parent.children === void 0 ? parent.children = [node2] : parent.children.push(node2);
            do
              parent.entries += node2.entries, parent = parent.parent;
            while (parent);
          }
        }
      }
      if (currentCount > limit) {
        let candidates = /* @__PURE__ */ new Set();
        for (let node2 of treeMap.values())
          !node2.parent || !node2.children || node2.children.length !== 0 && (node2.children.length === 1 && !node2.value || candidates.add(node2));
        let costBias = limit * 0.3;
        for (; currentCount > limit; ) {
          let overLimit = currentCount - limit, bestNode, bestCost = 1 / 0;
          for (let node2 of candidates) {
            if (node2.entries <= 1) continue;
            let diff = node2.entries - 1 - overLimit, cost = diff >= 0 ? diff : -diff + costBias;
            if (cost < bestCost && (bestNode = node2, bestCost = cost, cost === 0))
              break;
          }
          if (!bestNode) break;
          let reduction = bestNode.entries - 1;
          bestNode.active = !0, bestNode.entries = 1, candidates.delete(bestNode), currentCount -= reduction;
          let { parent } = bestNode;
          for (; parent; )
            parent.entries -= reduction, parent = parent.parent;
          let queue = new Set(bestNode.children);
          for (let node2 of queue)
            if (node2.active = !1, node2.entries = 0, candidates.delete(node2), node2.children)
              for (let child of node2.children) queue.add(child);
        }
      }
      let newPlan = /* @__PURE__ */ new Map();
      for (let rootNode of treeMap.values()) {
        if (!rootNode.active) continue;
        let map = /* @__PURE__ */ new Map(), queue = /* @__PURE__ */ new Set([rootNode]);
        for (let node2 of queue)
          if (!(node2.active && node2 !== rootNode)) {
            if (node2.value)
              if (Array.isArray(node2.value))
                for (let item of node2.value)
                  map.set(item, node2.target);
              else
                map.set(node2.value, node2.target);
            if (node2.children)
              for (let child of node2.children)
                queue.add(child);
          }
        newPlan.set(rootNode.target, map);
      }
      return newPlan;
    };
  }
});

// ../../node_modules/watchpack/lib/watchEventSource.js
var require_watchEventSource = __commonJS({
  "../../node_modules/watchpack/lib/watchEventSource.js"(exports, module) {
    "use strict";
    var { EventEmitter } = __require("events"), fs = __require("fs"), path2 = __require("path"), reducePlan = require_reducePlan(), IS_OSX = __require("os").platform() === "darwin", IS_WIN = __require("os").platform() === "win32", SUPPORTS_RECURSIVE_WATCHING = IS_OSX || IS_WIN, watcherLimit = (
      // @ts-expect-error avoid additional checks
      +process.env.WATCHPACK_WATCHER_LIMIT || (IS_OSX ? 20 : 1e4)
    ), recursiveWatcherLogging = !!process.env.WATCHPACK_RECURSIVE_WATCHER_LOGGING, isBatch = !1, watcherCount = 0, pendingWatchers = /* @__PURE__ */ new Map(), recursiveWatchers = /* @__PURE__ */ new Map(), directWatchers = /* @__PURE__ */ new Map(), underlyingWatcher = /* @__PURE__ */ new Map();
    function createEPERMError(filePath) {
      let error = (
        /** @type {NodeJS.ErrnoException} */
        new Error(`Operation not permitted: ${filePath}`)
      );
      return error.code = "EPERM", error;
    }
    function createHandleChangeEvent(watcher, filePath, handleChangeEvent) {
      let ownBasename = path2.basename(filePath);
      return (type, filename) => {
        if (type === "rename" && path2.isAbsolute(filename) && path2.basename(filename) === ownBasename) {
          IS_OSX || watcher.emit("error", createEPERMError(filename));
          return;
        }
        handleChangeEvent(type, filename);
      };
    }
    var DirectWatcher = class {
      /**
       * @param {string} filePath file path
       */
      constructor(filePath) {
        this.filePath = filePath, this.watchers = /* @__PURE__ */ new Set(), this.watcher = void 0;
        try {
          let watcher = fs.watch(filePath);
          this.watcher = watcher;
          let handleChangeEvent = createHandleChangeEvent(
            watcher,
            filePath,
            (type, filename) => {
              for (let w of this.watchers)
                w.emit("change", type, filename);
            }
          );
          watcher.on("change", handleChangeEvent), watcher.on("error", (error) => {
            for (let w of this.watchers)
              w.emit("error", error);
          });
        } catch (err) {
          process.nextTick(() => {
            for (let w of this.watchers)
              w.emit("error", err);
          });
        }
        watcherCount++;
      }
      /**
       * @param {Watcher} watcher a watcher
       */
      add(watcher) {
        underlyingWatcher.set(watcher, this), this.watchers.add(watcher);
      }
      /**
       * @param {Watcher} watcher a watcher
       */
      remove(watcher) {
        this.watchers.delete(watcher), this.watchers.size === 0 && (directWatchers.delete(this.filePath), watcherCount--, this.watcher && this.watcher.close());
      }
      getWatchers() {
        return this.watchers;
      }
    }, RecursiveWatcher = class {
      /**
       * @param {string} rootPath a root path
       */
      constructor(rootPath) {
        this.rootPath = rootPath, this.mapWatcherToPath = /* @__PURE__ */ new Map(), this.mapPathToWatchers = /* @__PURE__ */ new Map(), this.watcher = void 0;
        try {
          let watcher = fs.watch(rootPath, {
            recursive: !0
          });
          this.watcher = watcher, watcher.on("change", (type, filename) => {
            if (filename) {
              let dir = path2.dirname(
                /** @type {string} */
                filename
              ), watchers = this.mapPathToWatchers.get(dir);
              if (recursiveWatcherLogging && process.stderr.write(
                `[watchpack] dispatch ${type} event in recursive watcher (${this.rootPath}) for '${filename}' to ${watchers ? watchers.size : 0} watchers
`
              ), watchers === void 0) return;
              for (let w of watchers)
                w.emit(
                  "change",
                  /** @type {EventType} */
                  type,
                  path2.basename(
                    /** @type {string} */
                    filename
                  )
                );
            } else {
              recursiveWatcherLogging && process.stderr.write(
                `[watchpack] dispatch ${type} event in recursive watcher (${this.rootPath}) to all watchers
`
              );
              for (let w of this.mapWatcherToPath.keys())
                w.emit(
                  "change",
                  /** @type {EventType} */
                  type
                );
            }
          }), watcher.on("error", (error) => {
            for (let w of this.mapWatcherToPath.keys())
              w.emit("error", error);
          });
        } catch (err) {
          process.nextTick(() => {
            for (let w of this.mapWatcherToPath.keys())
              w.emit("error", err);
          });
        }
        watcherCount++, recursiveWatcherLogging && process.stderr.write(
          `[watchpack] created recursive watcher at ${rootPath}
`
        );
      }
      /**
       * @param {string} filePath a file path
       * @param {Watcher} watcher a watcher
       */
      add(filePath, watcher) {
        underlyingWatcher.set(watcher, this);
        let subpath = filePath.slice(this.rootPath.length + 1) || ".";
        this.mapWatcherToPath.set(watcher, subpath);
        let set = this.mapPathToWatchers.get(subpath);
        if (set === void 0) {
          let newSet = /* @__PURE__ */ new Set();
          newSet.add(watcher), this.mapPathToWatchers.set(subpath, newSet);
        } else
          set.add(watcher);
      }
      /**
       * @param {Watcher} watcher a watcher
       */
      remove(watcher) {
        let subpath = this.mapWatcherToPath.get(watcher);
        if (!subpath) return;
        this.mapWatcherToPath.delete(watcher);
        let set = (
          /** @type {WatcherSet} */
          this.mapPathToWatchers.get(subpath)
        );
        set.delete(watcher), set.size === 0 && this.mapPathToWatchers.delete(subpath), this.mapWatcherToPath.size === 0 && (recursiveWatchers.delete(this.rootPath), watcherCount--, this.watcher && this.watcher.close(), recursiveWatcherLogging && process.stderr.write(
          `[watchpack] closed recursive watcher at ${this.rootPath}
`
        ));
      }
      getWatchers() {
        return this.mapWatcherToPath;
      }
    }, Watcher = class extends EventEmitter {
      constructor() {
        super();
      }
      close() {
        if (pendingWatchers.has(this)) {
          pendingWatchers.delete(this);
          return;
        }
        underlyingWatcher.get(this).remove(this), underlyingWatcher.delete(this);
      }
    }, createDirectWatcher = (filePath) => {
      let existing = directWatchers.get(filePath);
      if (existing !== void 0) return existing;
      let w = new DirectWatcher(filePath);
      return directWatchers.set(filePath, w), w;
    }, createRecursiveWatcher = (rootPath) => {
      let existing = recursiveWatchers.get(rootPath);
      if (existing !== void 0) return existing;
      let w = new RecursiveWatcher(rootPath);
      return recursiveWatchers.set(rootPath, w), w;
    }, execute = () => {
      let map = /* @__PURE__ */ new Map(), addWatcher = (watcher, filePath) => {
        let entry = map.get(filePath);
        entry === void 0 ? map.set(filePath, watcher) : Array.isArray(entry) ? entry.push(watcher) : map.set(filePath, [entry, watcher]);
      };
      for (let [watcher, filePath] of pendingWatchers)
        addWatcher(watcher, filePath);
      if (pendingWatchers.clear(), !SUPPORTS_RECURSIVE_WATCHING || watcherLimit - watcherCount >= map.size) {
        for (let [filePath, entry] of map) {
          let w = createDirectWatcher(filePath);
          if (Array.isArray(entry))
            for (let item of entry) w.add(item);
          else
            w.add(entry);
        }
        return;
      }
      for (let watcher of recursiveWatchers.values())
        for (let [w, subpath] of watcher.getWatchers())
          addWatcher(w, path2.join(watcher.rootPath, subpath));
      for (let watcher of directWatchers.values())
        for (let w of watcher.getWatchers())
          addWatcher(w, watcher.filePath);
      let plan = reducePlan(map, watcherLimit * 0.9);
      for (let [filePath, entry] of plan)
        if (entry.size === 1)
          for (let [watcher, filePath2] of entry) {
            let w = createDirectWatcher(filePath2), old = underlyingWatcher.get(watcher);
            old !== w && (w.add(watcher), old !== void 0 && old.remove(watcher));
          }
        else {
          let filePaths = new Set(entry.values());
          if (filePaths.size > 1) {
            let w = createRecursiveWatcher(filePath);
            for (let [watcher, watcherPath] of entry) {
              let old = underlyingWatcher.get(watcher);
              old !== w && (w.add(watcherPath, watcher), old !== void 0 && old.remove(watcher));
            }
          } else
            for (let filePath2 of filePaths) {
              let w = createDirectWatcher(filePath2);
              for (let watcher of entry.keys()) {
                let old = underlyingWatcher.get(watcher);
                old !== w && (w.add(watcher), old !== void 0 && old.remove(watcher));
              }
            }
        }
    };
    module.exports.Watcher = Watcher;
    module.exports.batch = (fn) => {
      isBatch = !0;
      try {
        fn();
      } finally {
        isBatch = !1, execute();
      }
    };
    module.exports.createHandleChangeEvent = createHandleChangeEvent;
    module.exports.getNumberOfWatchers = () => watcherCount;
    module.exports.watch = (filePath) => {
      let watcher = new Watcher(), directWatcher = directWatchers.get(filePath);
      if (directWatcher !== void 0)
        return directWatcher.add(watcher), watcher;
      if (recursiveWatchers.size !== 0) {
        let current2 = filePath;
        for (; ; ) {
          let recursiveWatcher = recursiveWatchers.get(current2);
          if (recursiveWatcher !== void 0)
            return recursiveWatcher.add(filePath, watcher), watcher;
          let parent = path2.dirname(current2);
          if (parent === current2) break;
          current2 = parent;
        }
      }
      return pendingWatchers.set(watcher, filePath), isBatch || execute(), watcher;
    };
    module.exports.watcherLimit = watcherLimit;
  }
});

// ../../node_modules/watchpack/lib/DirectoryWatcher.js
var require_DirectoryWatcher = __commonJS({
  "../../node_modules/watchpack/lib/DirectoryWatcher.js"(exports, module) {
    "use strict";
    var { EventEmitter } = __require("events"), path2 = __require("path"), fs = require_graceful_fs(), watchEventSource = require_watchEventSource(), EXISTANCE_ONLY_TIME_ENTRY = Object.freeze({}), FS_ACCURACY = 2e3, IS_OSX = __require("os").platform() === "darwin", IS_WIN = __require("os").platform() === "win32", { WATCHPACK_POLLING, WATCHPACK_RETRIES } = process.env, FORCE_POLLING = (
      // @ts-expect-error avoid additional checks
      `${+WATCHPACK_POLLING}` === WATCHPACK_POLLING ? +WATCHPACK_POLLING : !!WATCHPACK_POLLING && WATCHPACK_POLLING !== "false"
    ), BUSY_RETRIES = (() => {
      if (WATCHPACK_RETRIES === void 0) return 3;
      if (WATCHPACK_RETRIES === "false") return 0;
      let n = Number(WATCHPACK_RETRIES);
      return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 3;
    })(), BUSY_RETRY_DELAY = 100;
    function withoutCase(str) {
      return str.toLowerCase();
    }
    function needCalls(times, callback) {
      return function() {
        if (--times === 0)
          return callback();
      };
    }
    function fixupEntryAccuracy(entry) {
      entry.accuracy > FS_ACCURACY && (entry.safeTime = entry.safeTime - entry.accuracy + FS_ACCURACY, entry.accuracy = FS_ACCURACY);
    }
    function ensureFsAccuracy(mtime) {
      mtime && (FS_ACCURACY > 1 && mtime % 1 !== 0 ? FS_ACCURACY = 1 : FS_ACCURACY > 10 && mtime % 10 !== 0 ? FS_ACCURACY = 10 : FS_ACCURACY > 100 && mtime % 100 !== 0 ? FS_ACCURACY = 100 : FS_ACCURACY > 1e3 && mtime % 1e3 !== 0 && (FS_ACCURACY = 1e3));
    }
    function lstatWithRetry(target, watcher, callback, remaining = BUSY_RETRIES) {
      fs.lstat(target, (err, stats) => {
        if (err && /** @type {NodeJS.ErrnoException} */
        err.code === "EBUSY" && remaining > 0 && !watcher.closed) {
          setTimeout(
            () => lstatWithRetry(target, watcher, callback, remaining - 1),
            BUSY_RETRY_DELAY
          );
          return;
        }
        callback(err, stats);
      });
    }
    var Watcher = class extends EventEmitter {
      /**
       * @param {DirectoryWatcher} directoryWatcher a directory watcher
       * @param {string} target a target to watch
       * @param {number=} startTime start time
       */
      constructor(directoryWatcher, target, startTime) {
        super(), this.directoryWatcher = directoryWatcher, this.path = target, this.startTime = startTime && +startTime;
      }
      /**
       * @param {number} mtime mtime
       * @param {boolean} initial true when initial, otherwise false
       * @returns {boolean} true of start time less than mtile, otherwise false
       */
      checkStartTime(mtime, initial) {
        let { startTime } = this;
        return typeof startTime != "number" ? !initial : startTime <= mtime;
      }
      close() {
        this.emit("closed");
      }
    }, DirectoryWatcher = class extends EventEmitter {
      /**
       * @param {WatcherManager} watcherManager a watcher manager
       * @param {string} directoryPath directory path
       * @param {DirectoryWatcherOptions=} options options
       */
      constructor(watcherManager, directoryPath, options = {}) {
        super(), FORCE_POLLING && (options.poll = FORCE_POLLING), this.watcherManager = watcherManager, this.options = options, this.path = directoryPath, this.files = /* @__PURE__ */ new Map(), this.filesWithoutCase = /* @__PURE__ */ new Map(), this.directories = /* @__PURE__ */ new Map(), this._symlinkTargetWatchers = /* @__PURE__ */ new Map(), this.lastWatchEvent = 0, this.initialScan = !0, this.ignored = options.ignored || (() => !1), this.nestedWatching = !1, this.polledWatching = typeof options.poll == "number" ? options.poll : options.poll ? 5007 : !1, this.timeout = void 0, this.initialScanRemoved = /* @__PURE__ */ new Set(), this.initialScanFinished = void 0, this.watchers = /* @__PURE__ */ new Map(), this.parentWatcher = null, this.refs = 0, this._activeEvents = /* @__PURE__ */ new Map(), this.closed = !1, this.scanning = !1, this.scanAgain = !1, this.scanAgainInitial = !1, this.createWatcher(), this.doScan(!0);
      }
      createWatcher() {
        try {
          this.polledWatching ? this.watcher = /** @type {EventSourceWatcher} */
          {
            close: () => {
              this.timeout && (clearTimeout(this.timeout), this.timeout = void 0);
            }
          } : (IS_OSX && this.watchInParentDirectory(), this.watcher = /** @type {EventSourceWatcher} */
          watchEventSource.watch(this.path), this.watcher.on("change", this.onWatchEvent.bind(this)), this.watcher.on("error", this.onWatcherError.bind(this)));
        } catch (err) {
          this.onWatcherError(err);
        }
      }
      /**
       * @template {(watcher: Watcher<EventMap>) => void} T
       * @param {string} path path
       * @param {T} fn function
       */
      forEachWatcher(path3, fn) {
        let watchers = this.watchers.get(withoutCase(path3));
        if (watchers !== void 0)
          for (let w of watchers)
            fn(w);
      }
      /**
       * @param {string} itemPath an item path
       * @param {boolean} initial true when initial, otherwise false
       * @param {EventType} type even type
       */
      setMissing(itemPath, initial, type) {
        this.initialScan && this.initialScanRemoved.add(itemPath);
        let oldDirectory = this.directories.get(itemPath);
        if (oldDirectory && (this.nestedWatching && oldDirectory.close(), this.directories.delete(itemPath), this.forEachWatcher(itemPath, (w) => w.emit("remove", type)), initial || this.forEachWatcher(
          this.path,
          (w) => w.emit("change", itemPath, null, type, initial)
        )), this.files.get(itemPath)) {
          this.files.delete(itemPath);
          let key2 = withoutCase(itemPath), count = (
            /** @type {number} */
            this.filesWithoutCase.get(key2) - 1
          );
          count <= 0 ? (this.filesWithoutCase.delete(key2), this.forEachWatcher(itemPath, (w) => w.emit("remove", type))) : this.filesWithoutCase.set(key2, count), initial || this.forEachWatcher(
            this.path,
            (w) => w.emit("change", itemPath, null, type, initial)
          );
        }
      }
      /**
       * @param {string} target a target to set file time
       * @param {number} mtime mtime
       * @param {boolean} initial true when initial, otherwise false
       * @param {boolean} ignoreWhenEqual true to ignore when equal, otherwise false
       * @param {EventType} type type
       */
      setFileTime(target, mtime, initial, ignoreWhenEqual, type) {
        let now = Date.now();
        if (this.ignored(target)) return;
        let old = this.files.get(target), safeTime, accuracy;
        if (initial)
          safeTime = Math.min(now, mtime) + FS_ACCURACY, accuracy = FS_ACCURACY;
        else if (safeTime = now, accuracy = 0, old && old.timestamp === mtime && mtime + FS_ACCURACY < now)
          return;
        if (!(ignoreWhenEqual && old && old.timestamp === mtime)) {
          if (this.files.set(target, {
            safeTime,
            accuracy,
            timestamp: mtime
          }), old)
            initial || this.forEachWatcher(target, (w) => w.emit("change", mtime, type));
          else {
            let key2 = withoutCase(target), count = this.filesWithoutCase.get(key2);
            this.filesWithoutCase.set(key2, (count || 0) + 1), count !== void 0 && this.doScan(!1), this.forEachWatcher(target, (w) => {
              (!initial || w.checkStartTime(safeTime, initial)) && w.emit("change", mtime, type);
            });
          }
          this.forEachWatcher(this.path, (w) => {
            (!initial || w.checkStartTime(safeTime, initial)) && w.emit("change", target, safeTime, type, initial);
          });
        }
      }
      /**
       * @param {string} directoryPath directory path
       * @param {number} birthtime birthtime
       * @param {boolean} initial true when initial, otherwise false
       * @param {EventType} type even type
       */
      setDirectory(directoryPath, birthtime, initial, type) {
        if (!this.ignored(directoryPath)) {
          if (directoryPath === this.path)
            initial || this.forEachWatcher(
              this.path,
              (w) => w.emit("change", directoryPath, birthtime, type, initial)
            );
          else if (!this.directories.get(directoryPath)) {
            let now = Date.now();
            this.nestedWatching ? this.createNestedWatcher(directoryPath) : this.directories.set(directoryPath, !0);
            let safeTime = initial ? Math.min(now, birthtime) + FS_ACCURACY : now;
            this.forEachWatcher(directoryPath, (w) => {
              (!initial || w.checkStartTime(safeTime, !1)) && w.emit("change", birthtime, type);
            }), this.forEachWatcher(this.path, (w) => {
              (!initial || w.checkStartTime(safeTime, initial)) && w.emit("change", directoryPath, safeTime, type, initial);
            });
          }
        }
      }
      /**
       * @param {string} directoryPath directory path
       */
      createNestedWatcher(directoryPath) {
        let watcher = this.watcherManager.watchDirectory(directoryPath, 1);
        watcher.on("change", (target, mtime, type, initial) => {
          this.forEachWatcher(this.path, (w) => {
            (!initial || w.checkStartTime(mtime, initial)) && w.emit("change", target, mtime, type, initial);
          });
        }), this.directories.set(directoryPath, watcher);
      }
      /**
       * @param {boolean} flag true when nested, otherwise false
       */
      setNestedWatching(flag) {
        if (this.nestedWatching !== !!flag)
          if (this.nestedWatching = !!flag, this.nestedWatching)
            for (let directory of this.directories.keys())
              this.createNestedWatcher(directory);
          else {
            for (let [directory, watcher] of this.directories)
              watcher.close(), this.directories.set(directory, !0);
            for (let w of this._symlinkTargetWatchers.values())
              w.close();
            this._symlinkTargetWatchers.clear();
          }
      }
      /**
       * @param {string} target a target to watch
       * @param {number=} startTime start time
       * @returns {Watcher<DirectoryWatcherEvents> | Watcher<FileWatcherEvents>} watcher
       */
      watch(target, startTime) {
        let key2 = withoutCase(target), watchers = this.watchers.get(key2);
        watchers === void 0 && (watchers = /* @__PURE__ */ new Set(), this.watchers.set(key2, watchers)), this.refs++;
        let watcher = (
          /** @type {Watcher<DirectoryWatcherEvents> | Watcher<FileWatcherEvents>} */
          new Watcher(this, target, startTime)
        );
        watcher.on("closed", () => {
          if (--this.refs <= 0) {
            this.close();
            return;
          }
          watchers.delete(watcher), watchers.size === 0 && (this.watchers.delete(key2), this.path === target && this.setNestedWatching(!1));
        }), watchers.add(watcher);
        let safeTime;
        if (target === this.path) {
          this.setNestedWatching(!0), safeTime = this.lastWatchEvent;
          for (let entry of this.files.values())
            fixupEntryAccuracy(entry), safeTime = Math.max(safeTime, entry.safeTime);
        } else {
          let entry = this.files.get(target);
          entry ? (fixupEntryAccuracy(entry), safeTime = entry.safeTime) : safeTime = 0;
        }
        return safeTime ? startTime && safeTime >= startTime && process.nextTick(() => {
          this.closed || (target === this.path ? watcher.emit(
            "change",
            target,
            safeTime,
            "watch (outdated on attach)",
            !0
          ) : watcher.emit(
            "change",
            safeTime,
            "watch (outdated on attach)",
            !0
          ));
        }) : this.initialScan ? (
          /** @type {InitialScanRemoved} */
          this.initialScanRemoved.has(target) && process.nextTick(() => {
            this.closed || watcher.emit("remove");
          })
        ) : target !== this.path && !this.directories.has(target) && watcher.checkStartTime(
          /** @type {number} */
          this.initialScanFinished,
          !1
        ) && process.nextTick(() => {
          this.closed || watcher.emit("initial-missing", "watch (missing on attach)");
        }), watcher;
      }
      /**
       * @param {EventType} eventType event type
       * @param {string=} filename filename
       */
      onWatchEvent(eventType, filename) {
        if (this.closed) return;
        if (!filename) {
          this.doScan(!1);
          return;
        }
        let target = path2.join(this.path, filename);
        if (!this.ignored(target))
          if (this._activeEvents.get(filename) === void 0) {
            this._activeEvents.set(filename, !1);
            let checkStats = () => {
              this.closed || (this._activeEvents.set(filename, !1), lstatWithRetry(target, this, (err, stats) => {
                if (!this.closed) {
                  if (this._activeEvents.get(filename) === !0) {
                    process.nextTick(checkStats);
                    return;
                  }
                  if (this._activeEvents.delete(filename), err && (err.code !== "ENOENT" && err.code !== "EPERM" && err.code !== "EBUSY" ? this.onStatsError(err) : filename === path2.basename(this.path) && // This may indicate that the directory itself was removed
                  !fs.existsSync(this.path) && this.onDirectoryRemoved("stat failed")), this.lastWatchEvent = Date.now(), stats)
                    stats.isDirectory() ? this.setDirectory(target, +stats.birthtime || 1, !1, eventType) : (stats.isFile() || stats.isSymbolicLink()) && (stats.mtime && ensureFsAccuracy(+stats.mtime), this.setFileTime(
                      target,
                      +stats.mtime || +stats.ctime || 1,
                      !1,
                      !1,
                      eventType
                    ));
                  else {
                    if (err && err.code === "EBUSY" && BUSY_RETRIES > 0)
                      return;
                    this.setMissing(target, !1, eventType);
                  }
                }
              }));
            };
            process.nextTick(checkStats);
          } else
            this._activeEvents.set(filename, !0);
      }
      /**
       * @param {unknown=} err error
       */
      onWatcherError(err) {
        this.closed || err && /** @type {NodeJS.ErrnoException} */
        (err.code !== "EPERM" && /** @type {NodeJS.ErrnoException} */
        err.code !== "ENOENT" && console.error(`Watchpack Error (watcher): ${err}`), this.onDirectoryRemoved("watch error"));
      }
      /**
       * @param {Error | NodeJS.ErrnoException=} err error
       */
      onStatsError(err) {
        err && console.error(`Watchpack Error (stats): ${err}`);
      }
      /**
       * @param {Error | NodeJS.ErrnoException=} err error
       */
      onScanError(err) {
        err && console.error(`Watchpack Error (initial scan): ${err}`), this.onScanFinished();
      }
      onScanFinished() {
        this.polledWatching && (this.timeout = setTimeout(() => {
          this.closed || this.doScan(!1);
        }, this.polledWatching));
      }
      /**
       * @param {string} reason a reason
       */
      onDirectoryRemoved(reason) {
        this.watcher && (this.watcher.close(), this.watcher = null), this.watchInParentDirectory();
        let type = (
          /** @type {EventType} */
          `directory-removed (${reason})`
        );
        for (let directory of this.directories.keys())
          this.setMissing(directory, !1, type);
        for (let file of this.files.keys())
          this.setMissing(file, !1, type);
      }
      watchInParentDirectory() {
        if (!this.parentWatcher) {
          let parentDir = path2.dirname(this.path);
          if (path2.dirname(parentDir) === parentDir) return;
          this.parentWatcher = this.watcherManager.watchFile(this.path, 1), this.parentWatcher.on("change", (mtime, type) => {
            this.closed || ((!IS_OSX || this.polledWatching) && this.parentWatcher && (this.parentWatcher.close(), this.parentWatcher = null), this.watcher || (this.createWatcher(), this.doScan(!1), this.forEachWatcher(
              this.path,
              (w) => w.emit("change", this.path, mtime, type, !1)
            )));
          }), this.parentWatcher.on("remove", () => {
            this.onDirectoryRemoved("parent directory removed");
          });
        }
      }
      /**
       * @param {boolean} initial true when initial, otherwise false
       */
      doScan(initial) {
        if (this.scanning) {
          this.scanAgain ? initial || (this.scanAgainInitial = !1) : (this.scanAgain = !0, this.scanAgainInitial = initial);
          return;
        }
        this.scanning = !0, this.timeout && (clearTimeout(this.timeout), this.timeout = void 0), process.nextTick(() => {
          this.closed || fs.readdir(this.path, (err, items) => {
            if (this.closed) return;
            if (err) {
              if (err.code === "ENOENT" || err.code === "EPERM" || err.code === "EACCES" || err.code === "ENODEV" || err.code === "EINVAL" && IS_WIN ? this.onDirectoryRemoved("scan readdir failed") : this.onScanError(err), this.initialScan = !1, this.initialScanFinished = Date.now(), initial)
                for (let watchers of this.watchers.values())
                  for (let watcher of watchers)
                    watcher.checkStartTime(this.initialScanFinished, !1) && watcher.emit(
                      "initial-missing",
                      "scan (parent directory missing in initial scan)"
                    );
              this.scanAgain ? (this.scanAgain = !1, this.doScan(this.scanAgainInitial)) : this.scanning = !1;
              return;
            }
            let itemPaths = new Set(
              items.map((item) => path2.join(this.path, item.normalize("NFC")))
            );
            for (let file of this.files.keys())
              itemPaths.has(file) || this.setMissing(file, initial, "scan (missing)");
            for (let directory of this.directories.keys())
              itemPaths.has(directory) || this.setMissing(directory, initial, "scan (missing)");
            if (this.scanAgain) {
              this.scanAgain = !1, this.doScan(initial);
              return;
            }
            let itemFinished = needCalls(itemPaths.size + 1, () => {
              if (!this.closed) {
                if (this.initialScan = !1, this.initialScanRemoved = null, this.initialScanFinished = Date.now(), initial) {
                  let missingWatchers = new Map(this.watchers);
                  missingWatchers.delete(withoutCase(this.path));
                  for (let item of itemPaths)
                    missingWatchers.delete(withoutCase(item));
                  for (let watchers of missingWatchers.values())
                    for (let watcher of watchers)
                      watcher.checkStartTime(this.initialScanFinished, !1) && watcher.emit(
                        "initial-missing",
                        "scan (missing in initial scan)"
                      );
                }
                this.scanAgain ? (this.scanAgain = !1, this.doScan(this.scanAgainInitial)) : (this.scanning = !1, this.onScanFinished());
              }
            });
            for (let itemPath of itemPaths)
              lstatWithRetry(itemPath, this, (err2, stats) => {
                if (this.closed) return;
                if (err2) {
                  err2.code === "ENOENT" || err2.code === "EPERM" || err2.code === "EACCES" || err2.code === "EBUSY" || err2.code === "ENODEV" || // TODO https://github.com/libuv/libuv/pull/4566
                  err2.code === "EINVAL" && IS_WIN ? err2.code === "EBUSY" && BUSY_RETRIES > 0 && this.files.has(itemPath) || this.setMissing(itemPath, initial, `scan (${err2.code})`) : this.onScanError(err2), itemFinished();
                  return;
                }
                let apply = (realPath) => {
                  if (stats.isFile() || stats.isSymbolicLink()) {
                    if (stats.mtime && ensureFsAccuracy(+stats.mtime), this.setFileTime(
                      itemPath,
                      +stats.mtime || +stats.ctime || 1,
                      initial,
                      !0,
                      "scan (file)"
                    ), realPath && !this._symlinkTargetWatchers.has(itemPath)) {
                      let w = this.watcherManager.watchFile(realPath, Date.now());
                      w && (w.on("change", (mtime, type, wInitial) => {
                        wInitial || this.setFileTime(itemPath, mtime, !1, !1, type);
                      }), this._symlinkTargetWatchers.set(itemPath, w));
                    }
                  } else stats.isDirectory() && (!initial || !this.directories.has(itemPath)) && this.setDirectory(
                    itemPath,
                    +stats.birthtime || 1,
                    initial,
                    "scan (dir)"
                  );
                  itemFinished();
                };
                if (this.options.followSymlinks && this.nestedWatching && stats.isSymbolicLink()) {
                  fs.realpath(itemPath, (err3, realPath) => {
                    if (this.closed) return;
                    if (err3 || !realPath || withoutCase(path2.dirname(realPath)) === withoutCase(this.path)) {
                      apply(null);
                      return;
                    }
                    let rel = path2.relative(realPath, itemPath);
                    if (!path2.isAbsolute(rel) && !rel.startsWith("..")) {
                      apply(null);
                      return;
                    }
                    fs.stat(realPath, (err4, targetStats) => {
                      this.closed || (err4 || !targetStats ? apply(null) : targetStats.isFile() ? apply(realPath) : targetStats.isDirectory() ? (this.setDirectory(
                        itemPath,
                        +targetStats.birthtime || +stats.birthtime || 1,
                        initial,
                        "scan (dir)"
                      ), itemFinished()) : apply(null));
                    });
                  });
                  return;
                }
                apply(null);
              });
            itemFinished();
          });
        });
      }
      /**
       * @returns {Record<string, number>} times
       */
      getTimes() {
        let obj = /* @__PURE__ */ Object.create(null), safeTime = this.lastWatchEvent;
        for (let [file, entry] of this.files)
          fixupEntryAccuracy(entry), safeTime = Math.max(safeTime, entry.safeTime), obj[file] = Math.max(entry.safeTime, entry.timestamp);
        if (this.nestedWatching) {
          for (let w of this.directories.values()) {
            let times = (
              /** @type {Watcher<DirectoryWatcherEvents>} */
              w.directoryWatcher.getTimes()
            );
            for (let file of Object.keys(times)) {
              let time = times[file];
              safeTime = Math.max(safeTime, time), obj[file] = time;
            }
          }
          obj[this.path] = safeTime;
        }
        if (!this.initialScan)
          for (let watchers of this.watchers.values())
            for (let watcher of watchers) {
              let { path: path3 } = watcher;
              Object.prototype.hasOwnProperty.call(obj, path3) || (obj[path3] = null);
            }
        return obj;
      }
      /**
       * @param {TimeInfoEntries} fileTimestamps file timestamps
       * @param {TimeInfoEntries} directoryTimestamps directory timestamps
       * @returns {number} safe time
       */
      collectTimeInfoEntries(fileTimestamps, directoryTimestamps) {
        let safeTime = this.lastWatchEvent;
        for (let [file, entry] of this.files)
          fixupEntryAccuracy(entry), safeTime = Math.max(safeTime, entry.safeTime), fileTimestamps.set(file, entry);
        if (this.nestedWatching) {
          for (let w of this.directories.values())
            safeTime = Math.max(
              safeTime,
              /** @type {Watcher<DirectoryWatcherEvents>} */
              w.directoryWatcher.collectTimeInfoEntries(
                fileTimestamps,
                directoryTimestamps
              )
            );
          fileTimestamps.set(this.path, EXISTANCE_ONLY_TIME_ENTRY), directoryTimestamps.set(this.path, {
            safeTime
          });
        } else {
          for (let dir of this.directories.keys())
            fileTimestamps.set(dir, EXISTANCE_ONLY_TIME_ENTRY), directoryTimestamps.has(dir) || directoryTimestamps.set(dir, EXISTANCE_ONLY_TIME_ENTRY);
          fileTimestamps.set(this.path, EXISTANCE_ONLY_TIME_ENTRY), directoryTimestamps.set(this.path, EXISTANCE_ONLY_TIME_ENTRY);
        }
        if (!this.initialScan)
          for (let watchers of this.watchers.values())
            for (let watcher of watchers) {
              let { path: path3 } = watcher;
              fileTimestamps.has(path3) || fileTimestamps.set(path3, null);
            }
        return safeTime;
      }
      close() {
        if (!this.closed) {
          if (this.closed = !0, this.initialScan = !1, this.watcher && (this.watcher.close(), this.watcher = null), this.nestedWatching) {
            for (let w of this.directories.values())
              w.close();
            this.directories.clear();
          }
          for (let w of this._symlinkTargetWatchers.values())
            w.close();
          this._symlinkTargetWatchers.clear(), this.parentWatcher && (this.parentWatcher.close(), this.parentWatcher = null), this.emit("closed");
        }
      }
    };
    module.exports = DirectoryWatcher;
    module.exports.EXISTANCE_ONLY_TIME_ENTRY = EXISTANCE_ONLY_TIME_ENTRY;
    module.exports.Watcher = Watcher;
  }
});

// ../../node_modules/watchpack/lib/getWatcherManager.js
var require_getWatcherManager = __commonJS({
  "../../node_modules/watchpack/lib/getWatcherManager.js"(exports, module) {
    "use strict";
    var path2 = __require("path"), DirectoryWatcher = require_DirectoryWatcher(), WatcherManager = class {
      /**
       * @param {DirectoryWatcherOptions=} options options
       */
      constructor(options = {}) {
        this.options = options, this.directoryWatchers = /* @__PURE__ */ new Map();
      }
      /**
       * @param {string} directory a directory
       * @returns {DirectoryWatcher} a directory watcher
       */
      getDirectoryWatcher(directory) {
        let watcher = this.directoryWatchers.get(directory);
        if (watcher === void 0) {
          let newWatcher = new DirectoryWatcher(this, directory, this.options);
          return this.directoryWatchers.set(directory, newWatcher), newWatcher.on("closed", () => {
            this.directoryWatchers.delete(directory);
          }), newWatcher;
        }
        return watcher;
      }
      /**
       * @param {string} file file
       * @param {number=} startTime start time
       * @returns {Watcher<FileWatcherEvents> | null} watcher or null if file has no directory
       */
      watchFile(file, startTime) {
        let directory = path2.dirname(file);
        return directory === file ? null : this.getDirectoryWatcher(directory).watch(file, startTime);
      }
      /**
       * @param {string} directory directory
       * @param {number=} startTime start time
       * @returns {Watcher<DirectoryWatcherEvents>} watcher
       */
      watchDirectory(directory, startTime) {
        return this.getDirectoryWatcher(directory).watch(directory, startTime);
      }
    }, watcherManagers = /* @__PURE__ */ new WeakMap();
    module.exports = (options) => {
      let watcherManager = watcherManagers.get(options);
      if (watcherManager !== void 0) return watcherManager;
      let newWatcherManager = new WatcherManager(options);
      return watcherManagers.set(options, newWatcherManager), newWatcherManager;
    };
    module.exports.WatcherManager = WatcherManager;
  }
});

// ../../node_modules/watchpack/lib/util/globToRegExp.js
var require_globToRegExp = __commonJS({
  "../../node_modules/watchpack/lib/util/globToRegExp.js"(exports, module) {
    "use strict";
    module.exports = (glob) => {
      if (typeof glob != "string")
        throw new TypeError("Expected a string");
      let len = glob.length, reStr = "", inGroup = !1, literalStart = 0;
      for (let i2 = 0; i2 < len; i2++) {
        let cc = glob.charCodeAt(i2), tokenStart = i2, mapped;
        switch (cc) {
          case 47:
            mapped = "\\/";
            break;
          case 36:
            mapped = "\\$";
            break;
          case 94:
            mapped = "\\^";
            break;
          case 43:
            mapped = "\\+";
            break;
          case 46:
            mapped = "\\.";
            break;
          case 40:
            mapped = "\\(";
            break;
          case 41:
            mapped = "\\)";
            break;
          case 61:
            mapped = "\\=";
            break;
          case 33:
            mapped = "\\!";
            break;
          case 124:
            mapped = "\\|";
            break;
          case 63:
            mapped = ".";
            break;
          case 91:
            mapped = "[";
            break;
          case 93:
            mapped = "]";
            break;
          case 123:
            inGroup = !0, mapped = "(";
            break;
          case 125:
            inGroup = !1, mapped = ")";
            break;
          case 44:
            mapped = inGroup ? "|" : "\\,";
            break;
          case 42: {
            let atStart = i2 === 0, afterSlash = !atStart && glob.charCodeAt(i2 - 1) === 47, starCount = 1;
            for (; i2 + 1 < len && glob.charCodeAt(i2 + 1) === 42; )
              starCount++, i2++;
            let atEnd = i2 + 1 === len, beforeSlash = !atEnd && glob.charCodeAt(i2 + 1) === 47;
            starCount > 1 && (atStart || afterSlash) && (atEnd || beforeSlash) ? (mapped = "((?:[^/]*(?:\\/|$))*)", i2++) : mapped = "([^/]*)";
            break;
          }
          default:
            continue;
        }
        literalStart < tokenStart && (reStr += glob.slice(literalStart, tokenStart)), reStr += mapped, literalStart = i2 + 1;
      }
      return literalStart < len && (reStr += literalStart === 0 ? glob : glob.slice(literalStart)), reStr;
    };
  }
});

// ../../node_modules/watchpack/lib/index.js
var require_lib2 = __commonJS({
  "../../node_modules/watchpack/lib/index.js"(exports, module) {
    "use strict";
    var { EventEmitter } = __require("events"), LinkResolver = require_LinkResolver(), getWatcherManager = require_getWatcherManager(), globToRegExp = require_globToRegExp(), watchEventSource = require_watchEventSource();
    function addWatchersToSet(watchers, set) {
      for (let ww of watchers)
        set.add(ww.watcher.directoryWatcher);
    }
    var stringToRegexp = (ignored) => {
      if (ignored.length !== 0)
        return `^${globToRegExp(ignored)}(?:$|\\/)`;
    }, normalizeSeparators = (item) => item.includes("\\") ? item.replace(/\\/g, "/") : item, ignoredToFunction = (ignored) => {
      if (Array.isArray(ignored)) {
        let stringRegexps = (
          /** @type {string[]} */
          ignored.map((i2) => stringToRegexp(i2)).filter(Boolean)
        );
        if (stringRegexps.length === 0)
          return () => !1;
        let regexp = stringRegexps.length === 1 ? new RegExp(stringRegexps[0]) : new RegExp(stringRegexps.join("|"));
        return (item) => regexp.test(normalizeSeparators(item));
      } else if (typeof ignored == "string") {
        let stringRegexp = stringToRegexp(ignored);
        if (!stringRegexp)
          return () => !1;
        let regexp = new RegExp(stringRegexp);
        return (item) => regexp.test(normalizeSeparators(item));
      } else {
        if (ignored instanceof RegExp)
          return (item) => ignored.test(normalizeSeparators(item));
        if (typeof ignored == "function")
          return ignored;
        if (ignored)
          throw new Error(`Invalid option for 'ignored': ${ignored}`);
        return () => !1;
      }
    }, normalizeOptions = (options) => ({
      followSymlinks: !!options.followSymlinks,
      ignored: ignoredToFunction(options.ignored),
      poll: options.poll
    }), normalizeCache = /* @__PURE__ */ new WeakMap(), cachedNormalizeOptions = (options) => {
      let cacheEntry = normalizeCache.get(options);
      if (cacheEntry !== void 0) return cacheEntry;
      let normalized = normalizeOptions(options);
      return normalizeCache.set(options, normalized), normalized;
    }, WatchpackFileWatcher = class {
      /**
       * @param {Watchpack} watchpack watchpack
       * @param {Watcher<FileWatcherEvents>} watcher watcher
       * @param {string | string[]} files files
       */
      constructor(watchpack, watcher, files) {
        this.files = Array.isArray(files) ? files : [files], this.watcher = watcher, watcher.on("initial-missing", (type) => {
          for (let file of this.files)
            watchpack._missing.has(file) || watchpack._onRemove(file, file, type);
        }), watcher.on("change", (mtime, type, _initial) => {
          for (let file of this.files)
            watchpack._onChange(file, mtime, file, type);
        }), watcher.on("remove", (type) => {
          for (let file of this.files)
            watchpack._onRemove(file, file, type);
        });
      }
      /**
       * @param {string | string[]} files files
       */
      update(files) {
        Array.isArray(files) ? this.files = files : this.files.length !== 1 ? this.files = [files] : this.files[0] !== files && (this.files[0] = files);
      }
      close() {
        this.watcher.close();
      }
    }, WatchpackDirectoryWatcher = class {
      /**
       * @param {Watchpack} watchpack watchpack
       * @param {Watcher<DirectoryWatcherEvents>} watcher watcher
       * @param {string} directories directories
       */
      constructor(watchpack, watcher, directories) {
        this.directories = Array.isArray(directories) ? directories : [directories], this.watcher = watcher, watcher.on("initial-missing", (type) => {
          for (let item of this.directories)
            watchpack._onRemove(item, item, type);
        }), watcher.on("change", (file, mtime, type, _initial) => {
          for (let item of this.directories)
            watchpack._onChange(item, mtime, file, type);
        }), watcher.on("remove", (type) => {
          for (let item of this.directories)
            watchpack._onRemove(item, item, type);
        });
      }
      /**
       * @param {string | string[]} directories directories
       */
      update(directories) {
        Array.isArray(directories) ? this.directories = directories : this.directories.length !== 1 ? this.directories = [directories] : this.directories[0] !== directories && (this.directories[0] = directories);
      }
      close() {
        this.watcher.close();
      }
    }, Watchpack3 = class extends EventEmitter {
      /**
       * @param {WatchOptions=} options options
       */
      constructor(options = {}) {
        super(), options || (options = {}), this.options = options, this.aggregateTimeout = typeof options.aggregateTimeout == "number" ? options.aggregateTimeout : 200, this.watcherOptions = cachedNormalizeOptions(options), this.watcherManager = getWatcherManager(this.watcherOptions), this.fileWatchers = /* @__PURE__ */ new Map(), this.directoryWatchers = /* @__PURE__ */ new Map(), this._missing = /* @__PURE__ */ new Set(), this.startTime = void 0, this.paused = !1, this.aggregatedChanges = /* @__PURE__ */ new Set(), this.aggregatedRemovals = /* @__PURE__ */ new Set(), this.aggregateTimer = void 0, this._onTimeout = this._onTimeout.bind(this);
      }
      /**
       * @overload
       * @param {Iterable<string>} arg1 files
       * @param {Iterable<string>} arg2 directories
       * @param {number=} arg3 startTime
       * @returns {void}
       */
      /**
       * @overload
       * @param {WatchMethodOptions} arg1 watch options
       * @returns {void}
       */
      /**
       * @param {Iterable<string> | WatchMethodOptions} arg1 files
       * @param {Iterable<string>=} arg2 directories
       * @param {number=} arg3 startTime
       * @returns {void}
       */
      watch(arg1, arg2, arg3) {
        let files, directories, missing, startTime;
        arg2 ? (files = /** @type {Iterable<string>} */
        arg1, directories = /** @type {Iterable<string>} */
        arg2, missing = [], startTime = /** @type {number} */
        arg3) : {
          files = [],
          directories = [],
          missing = [],
          startTime
        } = /** @type {WatchMethodOptions} */
        arg1, this.paused = !1;
        let { fileWatchers, directoryWatchers } = this, { ignored } = this.watcherOptions, filter = (path2) => !ignored(path2), addToMap = (map, key2, item) => {
          let list3 = map.get(key2);
          list3 === void 0 ? map.set(key2, item) : Array.isArray(list3) ? list3.push(item) : map.set(key2, [list3, item]);
        }, fileWatchersNeeded = /* @__PURE__ */ new Map(), directoryWatchersNeeded = /* @__PURE__ */ new Map(), missingFiles = /* @__PURE__ */ new Set();
        if (this.watcherOptions.followSymlinks) {
          let resolver2 = new LinkResolver();
          for (let file of files)
            if (filter(file))
              for (let innerFile of resolver2.resolve(file))
                (file === innerFile || filter(innerFile)) && addToMap(fileWatchersNeeded, innerFile, file);
          for (let file of missing)
            if (filter(file))
              for (let innerFile of resolver2.resolve(file))
                (file === innerFile || filter(innerFile)) && (missingFiles.add(file), addToMap(fileWatchersNeeded, innerFile, file));
          for (let dir of directories)
            if (filter(dir)) {
              let first = !0;
              for (let innerItem of resolver2.resolve(dir))
                filter(innerItem) && addToMap(
                  first ? directoryWatchersNeeded : fileWatchersNeeded,
                  innerItem,
                  dir
                ), first = !1;
            }
        } else {
          for (let file of files)
            filter(file) && addToMap(fileWatchersNeeded, file, file);
          for (let file of missing)
            filter(file) && (missingFiles.add(file), addToMap(fileWatchersNeeded, file, file));
          for (let dir of directories)
            filter(dir) && addToMap(directoryWatchersNeeded, dir, dir);
        }
        for (let [key2, w] of fileWatchers) {
          let needed = fileWatchersNeeded.get(key2);
          needed === void 0 ? (w.close(), fileWatchers.delete(key2)) : (w.update(needed), fileWatchersNeeded.delete(key2));
        }
        for (let [key2, w] of directoryWatchers) {
          let needed = directoryWatchersNeeded.get(key2);
          needed === void 0 ? (w.close(), directoryWatchers.delete(key2)) : (w.update(needed), directoryWatchersNeeded.delete(key2));
        }
        watchEventSource.batch(() => {
          for (let [key2, files2] of fileWatchersNeeded) {
            let watcher = this.watcherManager.watchFile(key2, startTime);
            watcher && fileWatchers.set(key2, new WatchpackFileWatcher(this, watcher, files2));
          }
          for (let [key2, directories2] of directoryWatchersNeeded) {
            let watcher = this.watcherManager.watchDirectory(key2, startTime);
            watcher && directoryWatchers.set(
              key2,
              new WatchpackDirectoryWatcher(this, watcher, directories2)
            );
          }
        }), this._missing = missingFiles, this.startTime = startTime;
      }
      close() {
        this.paused = !0, this.aggregateTimer && clearTimeout(this.aggregateTimer);
        for (let w of this.fileWatchers.values()) w.close();
        for (let w of this.directoryWatchers.values()) w.close();
        this.fileWatchers.clear(), this.directoryWatchers.clear();
      }
      pause() {
        this.paused = !0, this.aggregateTimer && clearTimeout(this.aggregateTimer);
      }
      /**
       * @returns {Record<string, number>} times
       */
      getTimes() {
        let directoryWatchers = /* @__PURE__ */ new Set();
        addWatchersToSet(this.fileWatchers.values(), directoryWatchers), addWatchersToSet(this.directoryWatchers.values(), directoryWatchers);
        let obj = /* @__PURE__ */ Object.create(null);
        for (let w of directoryWatchers) {
          let times = w.getTimes();
          for (let file in times) obj[file] = times[file];
        }
        return obj;
      }
      /**
       * @returns {TimeInfoEntries} time info entries
       */
      getTimeInfoEntries() {
        let map = /* @__PURE__ */ new Map();
        return this.collectTimeInfoEntries(map, map), map;
      }
      /**
       * @param {TimeInfoEntries} fileTimestamps file timestamps
       * @param {TimeInfoEntries} directoryTimestamps directory timestamps
       */
      collectTimeInfoEntries(fileTimestamps, directoryTimestamps) {
        let allWatchers = /* @__PURE__ */ new Set();
        addWatchersToSet(this.fileWatchers.values(), allWatchers), addWatchersToSet(this.directoryWatchers.values(), allWatchers);
        for (let w of allWatchers)
          w.collectTimeInfoEntries(fileTimestamps, directoryTimestamps);
      }
      /**
       * @returns {Aggregated} aggregated info
       */
      getAggregated() {
        this.aggregateTimer && (clearTimeout(this.aggregateTimer), this.aggregateTimer = void 0);
        let changes = this.aggregatedChanges, removals = this.aggregatedRemovals;
        return this.aggregatedChanges = /* @__PURE__ */ new Set(), this.aggregatedRemovals = /* @__PURE__ */ new Set(), { changes, removals };
      }
      /**
       * @param {string} item item
       * @param {number} mtime mtime
       * @param {string} file file
       * @param {EventType} type type
       */
      _onChange(item, mtime, file, type) {
        file = file || item, this.paused || (this.emit("change", file, mtime, type), this.aggregateTimer && clearTimeout(this.aggregateTimer), this.aggregateTimer = setTimeout(this._onTimeout, this.aggregateTimeout)), this.aggregatedRemovals.delete(item), this.aggregatedChanges.add(item);
      }
      /**
       * @param {string} item item
       * @param {string} file file
       * @param {EventType} type type
       */
      _onRemove(item, file, type) {
        file = file || item, this.paused || (this.emit("remove", file, type), this.aggregateTimer && clearTimeout(this.aggregateTimer), this.aggregateTimer = setTimeout(this._onTimeout, this.aggregateTimeout)), this.aggregatedChanges.delete(item), this.aggregatedRemovals.add(item);
      }
      _onTimeout() {
        this.aggregateTimer = void 0;
        let changes = this.aggregatedChanges, removals = this.aggregatedRemovals;
        this.aggregatedChanges = /* @__PURE__ */ new Set(), this.aggregatedRemovals = /* @__PURE__ */ new Set(), this.emit("aggregated", changes, removals);
      }
    }, mergeExports = (obj, exports2) => {
      let descriptors = Object.getOwnPropertyDescriptors(exports2);
      return Object.defineProperties(obj, descriptors), /** @type {A & B} */
      Object.freeze(obj);
    };
    module.exports = /** @type {WatchpackExports} */
    mergeExports(Watchpack3, {
      util: {
        get globToRegExp() {
          return globToRegExp;
        }
      }
    });
  }
});

// ../../node_modules/@discoveryjs/json-ext/package.json
var require_package = __commonJS({
  "../../node_modules/@discoveryjs/json-ext/package.json"(exports, module) {
    module.exports = {
      name: "@discoveryjs/json-ext",
      version: "0.5.7",
      description: "A set of utilities that extend the use of JSON",
      keywords: [
        "json",
        "utils",
        "stream",
        "async",
        "promise",
        "stringify",
        "info"
      ],
      author: "Roman Dvornov <rdvornov@gmail.com> (https://github.com/lahmatiy)",
      license: "MIT",
      repository: "discoveryjs/json-ext",
      main: "./src/index",
      browser: {
        "./src/stringify-stream.js": "./src/stringify-stream-browser.js",
        "./src/text-decoder.js": "./src/text-decoder-browser.js",
        "./src/version.js": "./dist/version.js"
      },
      types: "./index.d.ts",
      scripts: {
        test: "mocha --reporter progress",
        lint: "eslint src test",
        "lint-and-test": "npm run lint && npm test",
        build: "rollup --config",
        "test:all": "npm run test:src && npm run test:dist",
        "test:src": "npm test",
        "test:dist": "cross-env MODE=dist npm test && cross-env MODE=dist-min npm test",
        "build-and-test": "npm run build && npm run test:dist",
        coverage: "c8 --reporter=lcovonly npm test",
        prepublishOnly: "npm run lint && npm test && npm run build-and-test"
      },
      devDependencies: {
        "@rollup/plugin-commonjs": "^15.1.0",
        "@rollup/plugin-json": "^4.1.0",
        "@rollup/plugin-node-resolve": "^9.0.0",
        c8: "^7.10.0",
        chalk: "^4.1.0",
        "cross-env": "^7.0.3",
        eslint: "^8.10.0",
        mocha: "^8.4.0",
        rollup: "^2.28.2",
        "rollup-plugin-terser": "^7.0.2"
      },
      engines: {
        node: ">=10.0.0"
      },
      files: [
        "dist",
        "src",
        "index.d.ts"
      ]
    };
  }
});

// ../../node_modules/@discoveryjs/json-ext/src/version.js
var require_version = __commonJS({
  "../../node_modules/@discoveryjs/json-ext/src/version.js"(exports, module) {
    module.exports = require_package().version;
  }
});

// ../../node_modules/@discoveryjs/json-ext/src/utils.js
var require_utils = __commonJS({
  "../../node_modules/@discoveryjs/json-ext/src/utils.js"(exports, module) {
    var escapableCharCodeSubstitution = {
      // JSON Single Character Escape Sequences
      8: "\\b",
      9: "\\t",
      10: "\\n",
      12: "\\f",
      13: "\\r",
      34: '\\"',
      92: "\\\\"
    };
    function isLeadingSurrogate(code) {
      return code >= 55296 && code <= 56319;
    }
    function isTrailingSurrogate(code) {
      return code >= 56320 && code <= 57343;
    }
    function isReadableStream(value) {
      return typeof value.pipe == "function" && typeof value._read == "function" && typeof value._readableState == "object" && value._readableState !== null;
    }
    function replaceValue(holder, key2, value, replacer) {
      switch (value && typeof value.toJSON == "function" && (value = value.toJSON()), replacer !== null && (value = replacer.call(holder, String(key2), value)), typeof value) {
        case "function":
        case "symbol":
          value = void 0;
          break;
        case "object":
          if (value !== null) {
            let cls = value.constructor;
            (cls === String || cls === Number || cls === Boolean) && (value = value.valueOf());
          }
          break;
      }
      return value;
    }
    function getTypeNative(value) {
      return value === null || typeof value != "object" ? 1 : Array.isArray(value) ? 3 : 2;
    }
    function getTypeAsync(value) {
      return value === null || typeof value != "object" ? 1 : typeof value.then == "function" ? 4 : isReadableStream(value) ? value._readableState.objectMode ? 6 : 5 : Array.isArray(value) ? 3 : 2;
    }
    function normalizeReplacer(replacer) {
      return typeof replacer == "function" ? replacer : Array.isArray(replacer) ? [...new Set(
        replacer.map((item) => {
          let cls = item && item.constructor;
          return cls === String || cls === Number ? String(item) : null;
        }).filter((item) => typeof item == "string")
      )] : null;
    }
    function normalizeSpace(space) {
      return typeof space == "number" ? !Number.isFinite(space) || space < 1 ? !1 : " ".repeat(Math.min(space, 10)) : typeof space == "string" && space.slice(0, 10) || !1;
    }
    module.exports = {
      escapableCharCodeSubstitution,
      isLeadingSurrogate,
      isTrailingSurrogate,
      type: {
        PRIMITIVE: 1,
        PROMISE: 4,
        ARRAY: 3,
        OBJECT: 2,
        STRING_STREAM: 5,
        OBJECT_STREAM: 6
      },
      isReadableStream,
      replaceValue,
      getTypeNative,
      getTypeAsync,
      normalizeReplacer,
      normalizeSpace
    };
  }
});

// ../../node_modules/@discoveryjs/json-ext/src/stringify-info.js
var require_stringify_info = __commonJS({
  "../../node_modules/@discoveryjs/json-ext/src/stringify-info.js"(exports, module) {
    var {
      normalizeReplacer,
      normalizeSpace,
      replaceValue,
      getTypeNative,
      getTypeAsync,
      isLeadingSurrogate,
      isTrailingSurrogate,
      escapableCharCodeSubstitution,
      type: {
        PRIMITIVE,
        OBJECT,
        ARRAY,
        PROMISE,
        STRING_STREAM,
        OBJECT_STREAM
      }
    } = require_utils(), charLength2048 = Array.from({ length: 2048 }).map((_, code) => escapableCharCodeSubstitution.hasOwnProperty(code) ? 2 : code < 32 ? 6 : code < 128 ? 1 : 2);
    function stringLength(str) {
      let len = 0, prevLeadingSurrogate = !1;
      for (let i2 = 0; i2 < str.length; i2++) {
        let code = str.charCodeAt(i2);
        if (code < 2048)
          len += charLength2048[code];
        else if (isLeadingSurrogate(code)) {
          len += 6, prevLeadingSurrogate = !0;
          continue;
        } else isTrailingSurrogate(code) ? len = prevLeadingSurrogate ? len - 2 : len + 6 : len += 3;
        prevLeadingSurrogate = !1;
      }
      return len + 2;
    }
    function primitiveLength(value) {
      switch (typeof value) {
        case "string":
          return stringLength(value);
        case "number":
          return Number.isFinite(value) ? String(value).length : 4;
        case "boolean":
          return value ? 4 : 5;
        case "undefined":
        case "object":
          return 4;
        /* null */
        default:
          return 0;
      }
    }
    function spaceLength(space) {
      return space = normalizeSpace(space), typeof space == "string" ? space.length : 0;
    }
    module.exports = function(value, replacer, space, options) {
      function walk(holder, key2, value2) {
        if (stop)
          return;
        value2 = replaceValue(holder, key2, value2, replacer);
        let type = getType(value2);
        if (type !== PRIMITIVE && stack.has(value2)) {
          circular.add(value2), length += 4, options.continueOnCircular || (stop = !0);
          return;
        }
        switch (type) {
          case PRIMITIVE:
            value2 !== void 0 || Array.isArray(holder) ? length += primitiveLength(value2) : holder === root && (length += 9);
            break;
          case OBJECT: {
            if (visited.has(value2)) {
              duplicate.add(value2), length += visited.get(value2);
              break;
            }
            let valueLength = length, entries = 0;
            length += 2, stack.add(value2);
            for (let key3 in value2)
              if (hasOwnProperty.call(value2, key3) && (allowlist === null || allowlist.has(key3))) {
                let prevLength = length;
                walk(value2, key3, value2[key3]), prevLength !== length && (length += stringLength(key3) + 1, entries++);
              }
            entries > 1 && (length += entries - 1), stack.delete(value2), space > 0 && entries > 0 && (length += (1 + (stack.size + 1) * space + 1) * entries, length += 1 + stack.size * space), visited.set(value2, length - valueLength);
            break;
          }
          case ARRAY: {
            if (visited.has(value2)) {
              duplicate.add(value2), length += visited.get(value2);
              break;
            }
            let valueLength = length;
            length += 2, stack.add(value2);
            for (let i2 = 0; i2 < value2.length; i2++)
              walk(value2, i2, value2[i2]);
            value2.length > 1 && (length += value2.length - 1), stack.delete(value2), space > 0 && value2.length > 0 && (length += (1 + (stack.size + 1) * space) * value2.length, length += 1 + stack.size * space), visited.set(value2, length - valueLength);
            break;
          }
          case PROMISE:
          case STRING_STREAM:
            async.add(value2);
            break;
          case OBJECT_STREAM:
            length += 2, async.add(value2);
            break;
        }
      }
      let allowlist = null;
      replacer = normalizeReplacer(replacer), Array.isArray(replacer) && (allowlist = new Set(replacer), replacer = null), space = spaceLength(space), options = options || {};
      let visited = /* @__PURE__ */ new Map(), stack = /* @__PURE__ */ new Set(), duplicate = /* @__PURE__ */ new Set(), circular = /* @__PURE__ */ new Set(), async = /* @__PURE__ */ new Set(), getType = options.async ? getTypeAsync : getTypeNative, root = { "": value }, stop = !1, length = 0;
      return walk(root, "", value), {
        minLength: isNaN(length) ? 1 / 0 : length,
        circular: [...circular],
        duplicate: [...duplicate],
        async: [...async]
      };
    };
  }
});

// ../../node_modules/@discoveryjs/json-ext/src/stringify-stream.js
var require_stringify_stream = __commonJS({
  "../../node_modules/@discoveryjs/json-ext/src/stringify-stream.js"(exports, module) {
    var { Readable } = __require("stream"), {
      normalizeReplacer,
      normalizeSpace,
      replaceValue,
      getTypeAsync,
      type: {
        PRIMITIVE,
        OBJECT,
        ARRAY,
        PROMISE,
        STRING_STREAM,
        OBJECT_STREAM
      }
    } = require_utils(), noop = () => {
    }, hasOwnProperty5 = Object.prototype.hasOwnProperty, wellformedStringStringify = JSON.stringify("\uD800") === '"\\ud800"' ? JSON.stringify : (s) => JSON.stringify(s).replace(
      new RegExp("\\p{Surrogate}", "gu"),
      (m) => `\\u${m.charCodeAt(0).toString(16)}`
    );
    function push2() {
      this.push(this._stack.value), this.popStack();
    }
    function pushPrimitive(value) {
      switch (typeof value) {
        case "string":
          this.push(this.encodeString(value));
          break;
        case "number":
          this.push(Number.isFinite(value) ? this.encodeNumber(value) : "null");
          break;
        case "boolean":
          this.push(value ? "true" : "false");
          break;
        case "undefined":
        case "object":
          this.push("null");
          break;
        default:
          this.destroy(new TypeError(`Do not know how to serialize a ${value.constructor && value.constructor.name || typeof value}`));
      }
    }
    function processObjectEntry(key2) {
      let current2 = this._stack;
      current2.first ? this.push(",") : current2.first = !0, this.space ? this.push(`
${this.space.repeat(this._depth)}${this.encodeString(key2)}: `) : this.push(this.encodeString(key2) + ":");
    }
    function processObject() {
      let current2 = this._stack;
      if (current2.index === current2.keys.length) {
        this.space && current2.first ? this.push(`
${this.space.repeat(this._depth - 1)}}`) : this.push("}"), this.popStack();
        return;
      }
      let key2 = current2.keys[current2.index];
      this.processValue(current2.value, key2, current2.value[key2], processObjectEntry), current2.index++;
    }
    function processArrayItem(index2) {
      index2 !== 0 && this.push(","), this.space && this.push(`
${this.space.repeat(this._depth)}`);
    }
    function processArray() {
      let current2 = this._stack;
      if (current2.index === current2.value.length) {
        this.space && current2.index > 0 ? this.push(`
${this.space.repeat(this._depth - 1)}]`) : this.push("]"), this.popStack();
        return;
      }
      this.processValue(current2.value, current2.index, current2.value[current2.index], processArrayItem), current2.index++;
    }
    function createStreamReader(fn) {
      return function() {
        let current2 = this._stack, data2 = current2.value.read(this._readSize);
        data2 !== null ? (current2.first = !1, fn.call(this, data2, current2)) : current2.first && !current2.value._readableState.reading || current2.ended ? this.popStack() : (current2.first = !0, current2.awaiting = !0);
      };
    }
    var processReadableObject = createStreamReader(function(data2, current2) {
      this.processValue(current2.value, current2.index, data2, processArrayItem), current2.index++;
    }), processReadableString = createStreamReader(function(data2) {
      this.push(data2);
    }), JsonStringifyStream = class extends Readable {
      constructor(value, replacer, space) {
        if (super({
          autoDestroy: !0
        }), this.getKeys = Object.keys, this.replacer = normalizeReplacer(replacer), Array.isArray(this.replacer)) {
          let allowlist = this.replacer;
          this.getKeys = (value2) => allowlist.filter((key2) => hasOwnProperty5.call(value2, key2)), this.replacer = null;
        }
        this.space = normalizeSpace(space), this._depth = 0, this.error = null, this._processing = !1, this._ended = !1, this._readSize = 0, this._buffer = "", this._stack = null, this._visited = /* @__PURE__ */ new WeakSet(), this.pushStack({
          handler: () => {
            this.popStack(), this.processValue({ "": value }, "", value, noop);
          }
        });
      }
      encodeString(value) {
        return /[^\x20-\uD799]|[\x22\x5c]/.test(value) ? wellformedStringStringify(value) : '"' + value + '"';
      }
      encodeNumber(value) {
        return value;
      }
      processValue(holder, key2, value, callback) {
        value = replaceValue(holder, key2, value, this.replacer);
        let type = getTypeAsync(value);
        switch (type) {
          case PRIMITIVE:
            (callback !== processObjectEntry || value !== void 0) && (callback.call(this, key2), pushPrimitive.call(this, value));
            break;
          case OBJECT:
            if (callback.call(this, key2), this._visited.has(value))
              return this.destroy(new TypeError("Converting circular structure to JSON"));
            this._visited.add(value), this._depth++, this.push("{"), this.pushStack({
              handler: processObject,
              value,
              index: 0,
              first: !1,
              keys: this.getKeys(value)
            });
            break;
          case ARRAY:
            if (callback.call(this, key2), this._visited.has(value))
              return this.destroy(new TypeError("Converting circular structure to JSON"));
            this._visited.add(value), this.push("["), this.pushStack({
              handler: processArray,
              value,
              index: 0
            }), this._depth++;
            break;
          case PROMISE:
            this.pushStack({
              handler: noop,
              awaiting: !0
            }), Promise.resolve(value).then((resolved) => {
              this.popStack(), this.processValue(holder, key2, resolved, callback), this.processStack();
            }).catch((error) => {
              this.destroy(error);
            });
            break;
          case STRING_STREAM:
          case OBJECT_STREAM:
            if (callback.call(this, key2), value.readableEnded || value._readableState.endEmitted)
              return this.destroy(new Error("Readable Stream has ended before it was serialized. All stream data have been lost"));
            if (value.readableFlowing)
              return this.destroy(new Error("Readable Stream is in flowing mode, data may have been lost. Trying to pause stream."));
            type === OBJECT_STREAM && (this.push("["), this.pushStack({
              handler: push2,
              value: this.space ? `
` + this.space.repeat(this._depth) + "]" : "]"
            }), this._depth++);
            let self2 = this.pushStack({
              handler: type === OBJECT_STREAM ? processReadableObject : processReadableString,
              value,
              index: 0,
              first: !1,
              ended: !1,
              awaiting: !value.readable || value.readableLength === 0
            }), continueProcessing = () => {
              self2.awaiting && (self2.awaiting = !1, this.processStack());
            };
            value.once("error", (error) => this.destroy(error)), value.once("end", () => {
              self2.ended = !0, continueProcessing();
            }), value.on("readable", continueProcessing);
            break;
        }
      }
      pushStack(node2) {
        return node2.prev = this._stack, this._stack = node2;
      }
      popStack() {
        let { handler, value } = this._stack;
        (handler === processObject || handler === processArray || handler === processReadableObject) && (this._visited.delete(value), this._depth--), this._stack = this._stack.prev;
      }
      processStack() {
        if (!(this._processing || this._ended)) {
          try {
            for (this._processing = !0; this._stack !== null && !this._stack.awaiting; )
              if (this._stack.handler.call(this), !this._processing)
                return;
            this._processing = !1;
          } catch (error) {
            this.destroy(error);
            return;
          }
          this._stack === null && !this._ended && (this._finish(), this.push(null));
        }
      }
      push(data2) {
        if (data2 !== null) {
          if (this._buffer += data2, this._buffer.length < this._readSize)
            return;
          data2 = this._buffer, this._buffer = "", this._processing = !1;
        }
        super.push(data2);
      }
      _read(size) {
        this._readSize = size || this.readableHighWaterMark, this.processStack();
      }
      _finish() {
        this._ended = !0, this._processing = !1, this._stack = null, this._visited = null, this._buffer && this._buffer.length && super.push(this._buffer), this._buffer = "";
      }
      _destroy(error, cb) {
        this.error = this.error || error, this._finish(), cb(error);
      }
    };
    module.exports = function(value, replacer, space) {
      return new JsonStringifyStream(value, replacer, space);
    };
  }
});

// ../../node_modules/@discoveryjs/json-ext/src/text-decoder.js
var require_text_decoder = __commonJS({
  "../../node_modules/@discoveryjs/json-ext/src/text-decoder.js"(exports, module) {
    module.exports = __require("util").TextDecoder;
  }
});

// ../../node_modules/@discoveryjs/json-ext/src/parse-chunked.js
var require_parse_chunked = __commonJS({
  "../../node_modules/@discoveryjs/json-ext/src/parse-chunked.js"(exports, module) {
    var { isReadableStream } = require_utils(), TextDecoder2 = require_text_decoder(), STACK_OBJECT = 1, STACK_ARRAY = 2, decoder = new TextDecoder2();
    function isObject(value) {
      return value !== null && typeof value == "object";
    }
    function adjustPosition(error, parser) {
      return error.name === "SyntaxError" && parser.jsonParseOffset && (error.message = error.message.replace(
        /at position (\d+)/,
        (_, pos) => "at position " + (Number(pos) + parser.jsonParseOffset)
      )), error;
    }
    function append(array, elements) {
      let initialLength = array.length;
      array.length += elements.length;
      for (let i2 = 0; i2 < elements.length; i2++)
        array[initialLength + i2] = elements[i2];
    }
    module.exports = function(chunkEmitter) {
      let parser = new ChunkParser();
      if (isObject(chunkEmitter) && isReadableStream(chunkEmitter))
        return new Promise((resolve4, reject) => {
          chunkEmitter.on("data", (chunk) => {
            try {
              parser.push(chunk);
            } catch (e) {
              reject(adjustPosition(e, parser)), parser = null;
            }
          }).on("error", (e) => {
            parser = null, reject(e);
          }).on("end", () => {
            try {
              resolve4(parser.finish());
            } catch (e) {
              reject(adjustPosition(e, parser));
            } finally {
              parser = null;
            }
          });
        });
      if (typeof chunkEmitter == "function") {
        let iterator = chunkEmitter();
        if (isObject(iterator) && (Symbol.iterator in iterator || Symbol.asyncIterator in iterator))
          return new Promise(async (resolve4, reject) => {
            try {
              for await (let chunk of iterator)
                parser.push(chunk);
              resolve4(parser.finish());
            } catch (e) {
              reject(adjustPosition(e, parser));
            } finally {
              parser = null;
            }
          });
      }
      throw new Error(
        "Chunk emitter should be readable stream, generator, async generator or function returning an iterable object"
      );
    };
    var ChunkParser = class {
      constructor() {
        this.value = void 0, this.valueStack = null, this.stack = new Array(100), this.lastFlushDepth = 0, this.flushDepth = 0, this.stateString = !1, this.stateStringEscape = !1, this.pendingByteSeq = null, this.pendingChunk = null, this.chunkOffset = 0, this.jsonParseOffset = 0;
      }
      parseAndAppend(fragment, wrap) {
        this.stack[this.lastFlushDepth - 1] === STACK_OBJECT ? (wrap && (this.jsonParseOffset--, fragment = "{" + fragment + "}"), Object.assign(this.valueStack.value, JSON.parse(fragment))) : (wrap && (this.jsonParseOffset--, fragment = "[" + fragment + "]"), append(this.valueStack.value, JSON.parse(fragment)));
      }
      prepareAddition(fragment) {
        let { value } = this.valueStack;
        if (Array.isArray(value) ? value.length !== 0 : Object.keys(value).length !== 0) {
          if (fragment[0] === ",")
            return this.jsonParseOffset++, fragment.slice(1);
          if (fragment[0] !== "}" && fragment[0] !== "]")
            return this.jsonParseOffset -= 3, "[[]" + fragment;
        }
        return fragment;
      }
      flush(chunk, start2, end) {
        let fragment = chunk.slice(start2, end);
        if (this.jsonParseOffset = this.chunkOffset + start2, this.pendingChunk !== null && (fragment = this.pendingChunk + fragment, this.jsonParseOffset -= this.pendingChunk.length, this.pendingChunk = null), this.flushDepth === this.lastFlushDepth)
          this.flushDepth > 0 ? this.parseAndAppend(this.prepareAddition(fragment), !0) : (this.value = JSON.parse(fragment), this.valueStack = {
            value: this.value,
            prev: null
          });
        else if (this.flushDepth > this.lastFlushDepth) {
          for (let i2 = this.flushDepth - 1; i2 >= this.lastFlushDepth; i2--)
            fragment += this.stack[i2] === STACK_OBJECT ? "}" : "]";
          this.lastFlushDepth === 0 ? (this.value = JSON.parse(fragment), this.valueStack = {
            value: this.value,
            prev: null
          }) : this.parseAndAppend(this.prepareAddition(fragment), !0);
          for (let i2 = this.lastFlushDepth || 1; i2 < this.flushDepth; i2++) {
            let value = this.valueStack.value;
            if (this.stack[i2 - 1] === STACK_OBJECT) {
              let key2;
              for (key2 in value) ;
              value = value[key2];
            } else
              value = value[value.length - 1];
            this.valueStack = {
              value,
              prev: this.valueStack
            };
          }
        } else {
          fragment = this.prepareAddition(fragment);
          for (let i2 = this.lastFlushDepth - 1; i2 >= this.flushDepth; i2--)
            this.jsonParseOffset--, fragment = (this.stack[i2] === STACK_OBJECT ? "{" : "[") + fragment;
          this.parseAndAppend(fragment, !1);
          for (let i2 = this.lastFlushDepth - 1; i2 >= this.flushDepth; i2--)
            this.valueStack = this.valueStack.prev;
        }
        this.lastFlushDepth = this.flushDepth;
      }
      push(chunk) {
        if (typeof chunk != "string") {
          if (this.pendingByteSeq !== null) {
            let origRawChunk = chunk;
            chunk = new Uint8Array(this.pendingByteSeq.length + origRawChunk.length), chunk.set(this.pendingByteSeq), chunk.set(origRawChunk, this.pendingByteSeq.length), this.pendingByteSeq = null;
          }
          if (chunk[chunk.length - 1] > 127)
            for (let seqLength = 0; seqLength < chunk.length; seqLength++) {
              let byte = chunk[chunk.length - 1 - seqLength];
              if (byte >> 6 === 3) {
                seqLength++, (seqLength !== 4 && byte >> 3 === 30 || seqLength !== 3 && byte >> 4 === 14 || seqLength !== 2 && byte >> 5 === 6) && (this.pendingByteSeq = chunk.slice(chunk.length - seqLength), chunk = chunk.slice(0, -seqLength));
                break;
              }
            }
          chunk = decoder.decode(chunk);
        }
        let chunkLength = chunk.length, lastFlushPoint = 0, flushPoint = 0;
        scan: for (let i2 = 0; i2 < chunkLength; i2++) {
          if (this.stateString) {
            for (; i2 < chunkLength; i2++)
              if (this.stateStringEscape)
                this.stateStringEscape = !1;
              else
                switch (chunk.charCodeAt(i2)) {
                  case 34:
                    this.stateString = !1;
                    continue scan;
                  case 92:
                    this.stateStringEscape = !0;
                }
            break;
          }
          switch (chunk.charCodeAt(i2)) {
            case 34:
              this.stateString = !0, this.stateStringEscape = !1;
              break;
            case 44:
              flushPoint = i2;
              break;
            case 123:
              flushPoint = i2 + 1, this.stack[this.flushDepth++] = STACK_OBJECT;
              break;
            case 91:
              flushPoint = i2 + 1, this.stack[this.flushDepth++] = STACK_ARRAY;
              break;
            case 93:
            /* ] */
            case 125:
              flushPoint = i2 + 1, this.flushDepth--, this.flushDepth < this.lastFlushDepth && (this.flush(chunk, lastFlushPoint, flushPoint), lastFlushPoint = flushPoint);
              break;
            case 9:
            /* \t */
            case 10:
            /* \n */
            case 13:
            /* \r */
            case 32:
              lastFlushPoint === i2 && lastFlushPoint++, flushPoint === i2 && flushPoint++;
              break;
          }
        }
        flushPoint > lastFlushPoint && this.flush(chunk, lastFlushPoint, flushPoint), flushPoint < chunkLength && (this.pendingChunk !== null ? this.pendingChunk += chunk : this.pendingChunk = chunk.slice(flushPoint, chunkLength)), this.chunkOffset += chunkLength;
      }
      finish() {
        return this.pendingChunk !== null && (this.flush("", 0, 0), this.pendingChunk = null), this.value;
      }
    };
  }
});

// ../../node_modules/@discoveryjs/json-ext/src/index.js
var require_src2 = __commonJS({
  "../../node_modules/@discoveryjs/json-ext/src/index.js"(exports, module) {
    module.exports = {
      version: require_version(),
      stringifyInfo: require_stringify_info(),
      stringifyStream: require_stringify_stream(),
      parseChunked: require_parse_chunked()
    };
  }
});

// ../../node_modules/telejson/dist/index.js
var require_dist2 = __commonJS({
  "../../node_modules/telejson/dist/index.js"(exports, module) {
    "use strict";
    var __create = Object.create, __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __commonJS2 = (cb, mod) => function() {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    }, __export2 = (target, all2) => {
      for (var name2 in all2)
        __defProp(target, name2, { get: all2[name2], enumerable: !0 });
    }, __copyProps = (to, from, except, desc) => {
      if (from && typeof from == "object" || typeof from == "function")
        for (let key2 of __getOwnPropNames(from))
          !__hasOwnProp.call(to, key2) && key2 !== except && __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
      return to;
    }, __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
      mod
    )), __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod), require_es_object_atoms = __commonJS2({
      "node_modules/.pnpm/es-object-atoms@1.1.1/node_modules/es-object-atoms/index.js"(exports2, module2) {
        "use strict";
        module2.exports = Object;
      }
    }), require_es_errors = __commonJS2({
      "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js"(exports2, module2) {
        "use strict";
        module2.exports = Error;
      }
    }), require_eval = __commonJS2({
      "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js"(exports2, module2) {
        "use strict";
        module2.exports = EvalError;
      }
    }), require_range = __commonJS2({
      "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js"(exports2, module2) {
        "use strict";
        module2.exports = RangeError;
      }
    }), require_ref = __commonJS2({
      "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js"(exports2, module2) {
        "use strict";
        module2.exports = ReferenceError;
      }
    }), require_syntax = __commonJS2({
      "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js"(exports2, module2) {
        "use strict";
        module2.exports = SyntaxError;
      }
    }), require_type = __commonJS2({
      "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js"(exports2, module2) {
        "use strict";
        module2.exports = TypeError;
      }
    }), require_uri = __commonJS2({
      "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js"(exports2, module2) {
        "use strict";
        module2.exports = URIError;
      }
    }), require_abs = __commonJS2({
      "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js"(exports2, module2) {
        "use strict";
        module2.exports = Math.abs;
      }
    }), require_floor = __commonJS2({
      "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js"(exports2, module2) {
        "use strict";
        module2.exports = Math.floor;
      }
    }), require_max = __commonJS2({
      "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js"(exports2, module2) {
        "use strict";
        module2.exports = Math.max;
      }
    }), require_min = __commonJS2({
      "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js"(exports2, module2) {
        "use strict";
        module2.exports = Math.min;
      }
    }), require_pow = __commonJS2({
      "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js"(exports2, module2) {
        "use strict";
        module2.exports = Math.pow;
      }
    }), require_round = __commonJS2({
      "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js"(exports2, module2) {
        "use strict";
        module2.exports = Math.round;
      }
    }), require_isNaN = __commonJS2({
      "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js"(exports2, module2) {
        "use strict";
        module2.exports = Number.isNaN || function(a) {
          return a !== a;
        };
      }
    }), require_sign = __commonJS2({
      "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js"(exports2, module2) {
        "use strict";
        var $isNaN = require_isNaN();
        module2.exports = function(number) {
          return $isNaN(number) || number === 0 ? number : number < 0 ? -1 : 1;
        };
      }
    }), require_gOPD = __commonJS2({
      "node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js"(exports2, module2) {
        "use strict";
        module2.exports = Object.getOwnPropertyDescriptor;
      }
    }), require_gopd = __commonJS2({
      "node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js"(exports2, module2) {
        "use strict";
        var $gOPD = require_gOPD();
        if ($gOPD)
          try {
            $gOPD([], "length");
          } catch {
            $gOPD = null;
          }
        module2.exports = $gOPD;
      }
    }), require_es_define_property = __commonJS2({
      "node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js"(exports2, module2) {
        "use strict";
        var $defineProperty = Object.defineProperty || !1;
        if ($defineProperty)
          try {
            $defineProperty({}, "a", { value: 1 });
          } catch {
            $defineProperty = !1;
          }
        module2.exports = $defineProperty;
      }
    }), require_shams = __commonJS2({
      "node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js"(exports2, module2) {
        "use strict";
        module2.exports = function() {
          if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
            return !1;
          if (typeof Symbol.iterator == "symbol")
            return !0;
          var obj = {}, sym = /* @__PURE__ */ Symbol("test"), symObj = Object(sym);
          if (typeof sym == "string" || Object.prototype.toString.call(sym) !== "[object Symbol]" || Object.prototype.toString.call(symObj) !== "[object Symbol]")
            return !1;
          var symVal = 42;
          obj[sym] = symVal;
          for (var _ in obj)
            return !1;
          if (typeof Object.keys == "function" && Object.keys(obj).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(obj).length !== 0)
            return !1;
          var syms = Object.getOwnPropertySymbols(obj);
          if (syms.length !== 1 || syms[0] !== sym || !Object.prototype.propertyIsEnumerable.call(obj, sym))
            return !1;
          if (typeof Object.getOwnPropertyDescriptor == "function") {
            var descriptor = (
              /** @type {PropertyDescriptor} */
              Object.getOwnPropertyDescriptor(obj, sym)
            );
            if (descriptor.value !== symVal || descriptor.enumerable !== !0)
              return !1;
          }
          return !0;
        };
      }
    }), require_has_symbols = __commonJS2({
      "node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js"(exports2, module2) {
        "use strict";
        var origSymbol = typeof Symbol < "u" && Symbol, hasSymbolSham = require_shams();
        module2.exports = function() {
          return typeof origSymbol != "function" || typeof Symbol != "function" || typeof origSymbol("foo") != "symbol" || typeof /* @__PURE__ */ Symbol("bar") != "symbol" ? !1 : hasSymbolSham();
        };
      }
    }), require_Reflect_getPrototypeOf = __commonJS2({
      "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js"(exports2, module2) {
        "use strict";
        module2.exports = typeof Reflect < "u" && Reflect.getPrototypeOf || null;
      }
    }), require_Object_getPrototypeOf = __commonJS2({
      "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js"(exports2, module2) {
        "use strict";
        var $Object = require_es_object_atoms();
        module2.exports = $Object.getPrototypeOf || null;
      }
    }), require_implementation = __commonJS2({
      "node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js"(exports2, module2) {
        "use strict";
        var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ", toStr = Object.prototype.toString, max = Math.max, funcType = "[object Function]", concatty = function(a, b) {
          for (var arr = [], i2 = 0; i2 < a.length; i2 += 1)
            arr[i2] = a[i2];
          for (var j = 0; j < b.length; j += 1)
            arr[j + a.length] = b[j];
          return arr;
        }, slicy = function(arrLike, offset2) {
          for (var arr = [], i2 = offset2 || 0, j = 0; i2 < arrLike.length; i2 += 1, j += 1)
            arr[j] = arrLike[i2];
          return arr;
        }, joiny = function(arr, joiner) {
          for (var str = "", i2 = 0; i2 < arr.length; i2 += 1)
            str += arr[i2], i2 + 1 < arr.length && (str += joiner);
          return str;
        };
        module2.exports = function(that) {
          var target = this;
          if (typeof target != "function" || toStr.apply(target) !== funcType)
            throw new TypeError(ERROR_MESSAGE + target);
          for (var args = slicy(arguments, 1), bound, binder = function() {
            if (this instanceof bound) {
              var result = target.apply(
                this,
                concatty(args, arguments)
              );
              return Object(result) === result ? result : this;
            }
            return target.apply(
              that,
              concatty(args, arguments)
            );
          }, boundLength = max(0, target.length - args.length), boundArgs = [], i2 = 0; i2 < boundLength; i2++)
            boundArgs[i2] = "$" + i2;
          if (bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder), target.prototype) {
            var Empty = function() {
            };
            Empty.prototype = target.prototype, bound.prototype = new Empty(), Empty.prototype = null;
          }
          return bound;
        };
      }
    }), require_function_bind = __commonJS2({
      "node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js"(exports2, module2) {
        "use strict";
        var implementation = require_implementation();
        module2.exports = Function.prototype.bind || implementation;
      }
    }), require_functionCall = __commonJS2({
      "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionCall.js"(exports2, module2) {
        "use strict";
        module2.exports = Function.prototype.call;
      }
    }), require_functionApply = __commonJS2({
      "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionApply.js"(exports2, module2) {
        "use strict";
        module2.exports = Function.prototype.apply;
      }
    }), require_reflectApply = __commonJS2({
      "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/reflectApply.js"(exports2, module2) {
        "use strict";
        module2.exports = typeof Reflect < "u" && Reflect && Reflect.apply;
      }
    }), require_actualApply = __commonJS2({
      "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/actualApply.js"(exports2, module2) {
        "use strict";
        var bind = require_function_bind(), $apply = require_functionApply(), $call = require_functionCall(), $reflectApply = require_reflectApply();
        module2.exports = $reflectApply || bind.call($call, $apply);
      }
    }), require_call_bind_apply_helpers = __commonJS2({
      "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/index.js"(exports2, module2) {
        "use strict";
        var bind = require_function_bind(), $TypeError = require_type(), $call = require_functionCall(), $actualApply = require_actualApply();
        module2.exports = function(args) {
          if (args.length < 1 || typeof args[0] != "function")
            throw new $TypeError("a function is required");
          return $actualApply(bind, $call, args);
        };
      }
    }), require_get = __commonJS2({
      "node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js"(exports2, module2) {
        "use strict";
        var callBind = require_call_bind_apply_helpers(), gOPD = require_gopd(), hasProtoAccessor;
        try {
          hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
          [].__proto__ === Array.prototype;
        } catch (e) {
          if (!e || typeof e != "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS")
            throw e;
        }
        var desc = !!hasProtoAccessor && gOPD && gOPD(
          Object.prototype,
          /** @type {keyof typeof Object.prototype} */
          "__proto__"
        ), $Object = Object, $getPrototypeOf = $Object.getPrototypeOf;
        module2.exports = desc && typeof desc.get == "function" ? callBind([desc.get]) : typeof $getPrototypeOf == "function" ? (
          /** @type {import('./get')} */
          (function(value) {
            return $getPrototypeOf(value == null ? value : $Object(value));
          })
        ) : !1;
      }
    }), require_get_proto = __commonJS2({
      "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js"(exports2, module2) {
        "use strict";
        var reflectGetProto = require_Reflect_getPrototypeOf(), originalGetProto = require_Object_getPrototypeOf(), getDunderProto = require_get();
        module2.exports = reflectGetProto ? function(O) {
          return reflectGetProto(O);
        } : originalGetProto ? function(O) {
          if (!O || typeof O != "object" && typeof O != "function")
            throw new TypeError("getProto: not an object");
          return originalGetProto(O);
        } : getDunderProto ? function(O) {
          return getDunderProto(O);
        } : null;
      }
    }), require_hasown = __commonJS2({
      "node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js"(exports2, module2) {
        "use strict";
        var call = Function.prototype.call, $hasOwn = Object.prototype.hasOwnProperty, bind = require_function_bind();
        module2.exports = bind.call(call, $hasOwn);
      }
    }), require_get_intrinsic = __commonJS2({
      "node_modules/.pnpm/get-intrinsic@1.3.0/node_modules/get-intrinsic/index.js"(exports2, module2) {
        "use strict";
        var undefined2, $Object = require_es_object_atoms(), $Error = require_es_errors(), $EvalError = require_eval(), $RangeError = require_range(), $ReferenceError = require_ref(), $SyntaxError = require_syntax(), $TypeError = require_type(), $URIError = require_uri(), abs = require_abs(), floor = require_floor(), max = require_max(), min = require_min(), pow = require_pow(), round = require_round(), sign = require_sign(), $Function = Function, getEvalledConstructor = function(expressionSyntax) {
          try {
            return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
          } catch {
          }
        }, $gOPD = require_gopd(), $defineProperty = require_es_define_property(), throwTypeError = function() {
          throw new $TypeError();
        }, ThrowTypeError = $gOPD ? (function() {
          try {
            return arguments.callee, throwTypeError;
          } catch {
            try {
              return $gOPD(arguments, "callee").get;
            } catch {
              return throwTypeError;
            }
          }
        })() : throwTypeError, hasSymbols = require_has_symbols()(), getProto = require_get_proto(), $ObjectGPO = require_Object_getPrototypeOf(), $ReflectGPO = require_Reflect_getPrototypeOf(), $apply = require_functionApply(), $call = require_functionCall(), needsEval = {}, TypedArray = typeof Uint8Array > "u" || !getProto ? undefined2 : getProto(Uint8Array), INTRINSICS = {
          __proto__: null,
          "%AggregateError%": typeof AggregateError > "u" ? undefined2 : AggregateError,
          "%Array%": Array,
          "%ArrayBuffer%": typeof ArrayBuffer > "u" ? undefined2 : ArrayBuffer,
          "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
          "%AsyncFromSyncIteratorPrototype%": undefined2,
          "%AsyncFunction%": needsEval,
          "%AsyncGenerator%": needsEval,
          "%AsyncGeneratorFunction%": needsEval,
          "%AsyncIteratorPrototype%": needsEval,
          "%Atomics%": typeof Atomics > "u" ? undefined2 : Atomics,
          "%BigInt%": typeof BigInt > "u" ? undefined2 : BigInt,
          "%BigInt64Array%": typeof BigInt64Array > "u" ? undefined2 : BigInt64Array,
          "%BigUint64Array%": typeof BigUint64Array > "u" ? undefined2 : BigUint64Array,
          "%Boolean%": Boolean,
          "%DataView%": typeof DataView > "u" ? undefined2 : DataView,
          "%Date%": Date,
          "%decodeURI%": decodeURI,
          "%decodeURIComponent%": decodeURIComponent,
          "%encodeURI%": encodeURI,
          "%encodeURIComponent%": encodeURIComponent,
          "%Error%": $Error,
          "%eval%": eval,
          // eslint-disable-line no-eval
          "%EvalError%": $EvalError,
          "%Float16Array%": typeof Float16Array > "u" ? undefined2 : Float16Array,
          "%Float32Array%": typeof Float32Array > "u" ? undefined2 : Float32Array,
          "%Float64Array%": typeof Float64Array > "u" ? undefined2 : Float64Array,
          "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? undefined2 : FinalizationRegistry,
          "%Function%": $Function,
          "%GeneratorFunction%": needsEval,
          "%Int8Array%": typeof Int8Array > "u" ? undefined2 : Int8Array,
          "%Int16Array%": typeof Int16Array > "u" ? undefined2 : Int16Array,
          "%Int32Array%": typeof Int32Array > "u" ? undefined2 : Int32Array,
          "%isFinite%": isFinite,
          "%isNaN%": isNaN,
          "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
          "%JSON%": typeof JSON == "object" ? JSON : undefined2,
          "%Map%": typeof Map > "u" ? undefined2 : Map,
          "%MapIteratorPrototype%": typeof Map > "u" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
          "%Math%": Math,
          "%Number%": Number,
          "%Object%": $Object,
          "%Object.getOwnPropertyDescriptor%": $gOPD,
          "%parseFloat%": parseFloat,
          "%parseInt%": parseInt,
          "%Promise%": typeof Promise > "u" ? undefined2 : Promise,
          "%Proxy%": typeof Proxy > "u" ? undefined2 : Proxy,
          "%RangeError%": $RangeError,
          "%ReferenceError%": $ReferenceError,
          "%Reflect%": typeof Reflect > "u" ? undefined2 : Reflect,
          "%RegExp%": RegExp,
          "%Set%": typeof Set > "u" ? undefined2 : Set,
          "%SetIteratorPrototype%": typeof Set > "u" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
          "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? undefined2 : SharedArrayBuffer,
          "%String%": String,
          "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
          "%Symbol%": hasSymbols ? Symbol : undefined2,
          "%SyntaxError%": $SyntaxError,
          "%ThrowTypeError%": ThrowTypeError,
          "%TypedArray%": TypedArray,
          "%TypeError%": $TypeError,
          "%Uint8Array%": typeof Uint8Array > "u" ? undefined2 : Uint8Array,
          "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? undefined2 : Uint8ClampedArray,
          "%Uint16Array%": typeof Uint16Array > "u" ? undefined2 : Uint16Array,
          "%Uint32Array%": typeof Uint32Array > "u" ? undefined2 : Uint32Array,
          "%URIError%": $URIError,
          "%WeakMap%": typeof WeakMap > "u" ? undefined2 : WeakMap,
          "%WeakRef%": typeof WeakRef > "u" ? undefined2 : WeakRef,
          "%WeakSet%": typeof WeakSet > "u" ? undefined2 : WeakSet,
          "%Function.prototype.call%": $call,
          "%Function.prototype.apply%": $apply,
          "%Object.defineProperty%": $defineProperty,
          "%Object.getPrototypeOf%": $ObjectGPO,
          "%Math.abs%": abs,
          "%Math.floor%": floor,
          "%Math.max%": max,
          "%Math.min%": min,
          "%Math.pow%": pow,
          "%Math.round%": round,
          "%Math.sign%": sign,
          "%Reflect.getPrototypeOf%": $ReflectGPO
        };
        if (getProto)
          try {
            null.error;
          } catch (e) {
            errorProto = getProto(getProto(e)), INTRINSICS["%Error.prototype%"] = errorProto;
          }
        var errorProto, doEval = function doEval2(name2) {
          var value;
          if (name2 === "%AsyncFunction%")
            value = getEvalledConstructor("async function () {}");
          else if (name2 === "%GeneratorFunction%")
            value = getEvalledConstructor("function* () {}");
          else if (name2 === "%AsyncGeneratorFunction%")
            value = getEvalledConstructor("async function* () {}");
          else if (name2 === "%AsyncGenerator%") {
            var fn = doEval2("%AsyncGeneratorFunction%");
            fn && (value = fn.prototype);
          } else if (name2 === "%AsyncIteratorPrototype%") {
            var gen = doEval2("%AsyncGenerator%");
            gen && getProto && (value = getProto(gen.prototype));
          }
          return INTRINSICS[name2] = value, value;
        }, LEGACY_ALIASES = {
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
        }, bind = require_function_bind(), hasOwn2 = require_hasown(), $concat = bind.call($call, Array.prototype.concat), $spliceApply = bind.call($apply, Array.prototype.splice), $replace = bind.call($call, String.prototype.replace), $strSlice = bind.call($call, String.prototype.slice), $exec = bind.call($call, RegExp.prototype.exec), rePropName2 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, reEscapeChar2 = /\\(\\)?/g, stringToPath2 = function(string3) {
          var first = $strSlice(string3, 0, 1), last = $strSlice(string3, -1);
          if (first === "%" && last !== "%")
            throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
          if (last === "%" && first !== "%")
            throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
          var result = [];
          return $replace(string3, rePropName2, function(match, number, quote, subString) {
            result[result.length] = quote ? $replace(subString, reEscapeChar2, "$1") : number || match;
          }), result;
        }, getBaseIntrinsic = function(name2, allowMissing) {
          var intrinsicName = name2, alias;
          if (hasOwn2(LEGACY_ALIASES, intrinsicName) && (alias = LEGACY_ALIASES[intrinsicName], intrinsicName = "%" + alias[0] + "%"), hasOwn2(INTRINSICS, intrinsicName)) {
            var value = INTRINSICS[intrinsicName];
            if (value === needsEval && (value = doEval(intrinsicName)), typeof value > "u" && !allowMissing)
              throw new $TypeError("intrinsic " + name2 + " exists, but is not available. Please file an issue!");
            return {
              alias,
              name: intrinsicName,
              value
            };
          }
          throw new $SyntaxError("intrinsic " + name2 + " does not exist!");
        };
        module2.exports = function(name2, allowMissing) {
          if (typeof name2 != "string" || name2.length === 0)
            throw new $TypeError("intrinsic name must be a non-empty string");
          if (arguments.length > 1 && typeof allowMissing != "boolean")
            throw new $TypeError('"allowMissing" argument must be a boolean');
          if ($exec(/^%?[^%]*%?$/, name2) === null)
            throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
          var parts = stringToPath2(name2), intrinsicBaseName = parts.length > 0 ? parts[0] : "", intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing), intrinsicRealName = intrinsic.name, value = intrinsic.value, skipFurtherCaching = !1, alias = intrinsic.alias;
          alias && (intrinsicBaseName = alias[0], $spliceApply(parts, $concat([0, 1], alias)));
          for (var i2 = 1, isOwn = !0; i2 < parts.length; i2 += 1) {
            var part = parts[i2], first = $strSlice(part, 0, 1), last = $strSlice(part, -1);
            if ((first === '"' || first === "'" || first === "`" || last === '"' || last === "'" || last === "`") && first !== last)
              throw new $SyntaxError("property names with quotes must have matching quotes");
            if ((part === "constructor" || !isOwn) && (skipFurtherCaching = !0), intrinsicBaseName += "." + part, intrinsicRealName = "%" + intrinsicBaseName + "%", hasOwn2(INTRINSICS, intrinsicRealName))
              value = INTRINSICS[intrinsicRealName];
            else if (value != null) {
              if (!(part in value)) {
                if (!allowMissing)
                  throw new $TypeError("base intrinsic for " + name2 + " exists, but the property is not available.");
                return;
              }
              if ($gOPD && i2 + 1 >= parts.length) {
                var desc = $gOPD(value, part);
                isOwn = !!desc, isOwn && "get" in desc && !("originalValue" in desc.get) ? value = desc.get : value = value[part];
              } else
                isOwn = hasOwn2(value, part), value = value[part];
              isOwn && !skipFurtherCaching && (INTRINSICS[intrinsicRealName] = value);
            }
          }
          return value;
        };
      }
    }), require_call_bound = __commonJS2({
      "node_modules/.pnpm/call-bound@1.0.4/node_modules/call-bound/index.js"(exports2, module2) {
        "use strict";
        var GetIntrinsic = require_get_intrinsic(), callBindBasic = require_call_bind_apply_helpers(), $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
        module2.exports = function(name2, allowMissing) {
          var intrinsic = (
            /** @type {(this: unknown, ...args: unknown[]) => unknown} */
            GetIntrinsic(name2, !!allowMissing)
          );
          return typeof intrinsic == "function" && $indexOf(name2, ".prototype.") > -1 ? callBindBasic(
            /** @type {const} */
            [intrinsic]
          ) : intrinsic;
        };
      }
    }), require_shams2 = __commonJS2({
      "node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js"(exports2, module2) {
        "use strict";
        var hasSymbols = require_shams();
        module2.exports = function() {
          return hasSymbols() && !!Symbol.toStringTag;
        };
      }
    }), require_is_regex = __commonJS2({
      "node_modules/.pnpm/is-regex@1.2.1/node_modules/is-regex/index.js"(exports2, module2) {
        "use strict";
        var callBound = require_call_bound(), hasToStringTag = require_shams2()(), hasOwn2 = require_hasown(), gOPD = require_gopd(), fn;
        hasToStringTag ? ($exec = callBound("RegExp.prototype.exec"), isRegexMarker = {}, throwRegexMarker = function() {
          throw isRegexMarker;
        }, badStringifier = {
          toString: throwRegexMarker,
          valueOf: throwRegexMarker
        }, typeof Symbol.toPrimitive == "symbol" && (badStringifier[Symbol.toPrimitive] = throwRegexMarker), fn = function(value) {
          if (!value || typeof value != "object")
            return !1;
          var descriptor = (
            /** @type {NonNullable<typeof gOPD>} */
            gOPD(
              /** @type {{ lastIndex?: unknown }} */
              value,
              "lastIndex"
            )
          ), hasLastIndexDataProperty = descriptor && hasOwn2(descriptor, "value");
          if (!hasLastIndexDataProperty)
            return !1;
          try {
            $exec(
              value,
              /** @type {string} */
              /** @type {unknown} */
              badStringifier
            );
          } catch (e) {
            return e === isRegexMarker;
          }
        }) : ($toString = callBound("Object.prototype.toString"), regexClass = "[object RegExp]", fn = function(value) {
          return !value || typeof value != "object" && typeof value != "function" ? !1 : $toString(value) === regexClass;
        });
        var $exec, isRegexMarker, throwRegexMarker, badStringifier, $toString, regexClass;
        module2.exports = fn;
      }
    }), require_is_function = __commonJS2({
      "node_modules/.pnpm/is-function@1.0.2/node_modules/is-function/index.js"(exports2, module2) {
        module2.exports = isFunction3;
        var toString22 = Object.prototype.toString;
        function isFunction3(fn) {
          if (!fn)
            return !1;
          var string3 = toString22.call(fn);
          return string3 === "[object Function]" || typeof fn == "function" && string3 !== "[object RegExp]" || typeof window < "u" && // IE8 and below
          (fn === window.setTimeout || fn === window.alert || fn === window.confirm || fn === window.prompt);
        }
      }
    }), require_safe_regex_test = __commonJS2({
      "node_modules/.pnpm/safe-regex-test@1.1.0/node_modules/safe-regex-test/index.js"(exports2, module2) {
        "use strict";
        var callBound = require_call_bound(), isRegex = require_is_regex(), $exec = callBound("RegExp.prototype.exec"), $TypeError = require_type();
        module2.exports = function(regex) {
          if (!isRegex(regex))
            throw new $TypeError("`regex` must be a RegExp");
          return function(s) {
            return $exec(regex, s) !== null;
          };
        };
      }
    }), require_is_symbol = __commonJS2({
      "node_modules/.pnpm/is-symbol@1.1.1/node_modules/is-symbol/index.js"(exports2, module2) {
        "use strict";
        var callBound = require_call_bound(), $toString = callBound("Object.prototype.toString"), hasSymbols = require_has_symbols()(), safeRegexTest = require_safe_regex_test();
        hasSymbols ? ($symToStr = callBound("Symbol.prototype.toString"), isSymString = safeRegexTest(/^Symbol\(.*\)$/), isSymbolObject = function(value) {
          return typeof value.valueOf() != "symbol" ? !1 : isSymString($symToStr(value));
        }, module2.exports = function(value) {
          if (typeof value == "symbol")
            return !0;
          if (!value || typeof value != "object" || $toString(value) !== "[object Symbol]")
            return !1;
          try {
            return isSymbolObject(value);
          } catch {
            return !1;
          }
        }) : module2.exports = function(value) {
          return !1;
        };
        var $symToStr, isSymString, isSymbolObject;
      }
    }), src_exports = {};
    __export2(src_exports, {
      isJSON: () => isJSON4,
      parse: () => parse11,
      replacer: () => replacer,
      reviver: () => reviver,
      stringify: () => stringify4
    });
    module.exports = __toCommonJS2(src_exports);
    var import_is_regex = __toESM2(require_is_regex()), import_is_function = __toESM2(require_is_function()), import_is_symbol = __toESM2(require_is_symbol());
    function isObject(val) {
      return val != null && typeof val == "object" && Array.isArray(val) === !1;
    }
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global, freeGlobal_default = freeGlobal, freeSelf = typeof self == "object" && self && self.Object === Object && self, root = freeGlobal_default || freeSelf || Function("return this")(), root_default = root, Symbol2 = root_default.Symbol, Symbol_default = Symbol2, objectProto = Object.prototype, hasOwnProperty5 = objectProto.hasOwnProperty, nativeObjectToString = objectProto.toString, symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty5.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = !0;
      } catch {
      }
      var result = nativeObjectToString.call(value);
      return unmasked && (isOwn ? value[symToStringTag] = tag : delete value[symToStringTag]), result;
    }
    var getRawTag_default = getRawTag, objectProto2 = Object.prototype, nativeObjectToString2 = objectProto2.toString;
    function objectToString(value) {
      return nativeObjectToString2.call(value);
    }
    var objectToString_default = objectToString, nullTag = "[object Null]", undefinedTag = "[object Undefined]", symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
    function baseGetTag(value) {
      return value == null ? value === void 0 ? undefinedTag : nullTag : symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
    }
    var baseGetTag_default = baseGetTag;
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    var isObjectLike_default = isObjectLike, symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag;
    }
    var isSymbol_default = isSymbol;
    function arrayMap(array, iteratee) {
      for (var index2 = -1, length = array == null ? 0 : array.length, result = Array(length); ++index2 < length; )
        result[index2] = iteratee(array[index2], index2, array);
      return result;
    }
    var arrayMap_default = arrayMap, isArray2 = Array.isArray, isArray_default = isArray2, INFINITY = 1 / 0, symbolProto = Symbol_default ? Symbol_default.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string")
        return value;
      if (isArray_default(value))
        return arrayMap_default(value, baseToString) + "";
      if (isSymbol_default(value))
        return symbolToString ? symbolToString.call(value) : "";
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    var baseToString_default = baseToString;
    function isObject2(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    var isObject_default = isObject2, asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject_default(value))
        return !1;
      var tag = baseGetTag_default(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    var isFunction_default = isFunction, coreJsData = root_default["__core-js_shared__"], coreJsData_default = coreJsData, maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    })();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    var isMasked_default = isMasked, funcProto = Function.prototype, funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch {
        }
        try {
          return func + "";
        } catch {
        }
      }
      return "";
    }
    var toSource_default = toSource, reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reIsHostCtor = /^\[object .+?Constructor\]$/, funcProto2 = Function.prototype, objectProto3 = Object.prototype, funcToString2 = funcProto2.toString, hasOwnProperty22 = objectProto3.hasOwnProperty, reIsNative = RegExp(
      "^" + funcToString2.call(hasOwnProperty22).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject_default(value) || isMasked_default(value))
        return !1;
      var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource_default(value));
    }
    var baseIsNative_default = baseIsNative;
    function getValue(object, key2) {
      return object?.[key2];
    }
    var getValue_default = getValue;
    function getNative(object, key2) {
      var value = getValue_default(object, key2);
      return baseIsNative_default(value) ? value : void 0;
    }
    var getNative_default = getNative;
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    var eq_default = eq, reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
    function isKey(value, object) {
      if (isArray_default(value))
        return !1;
      var type = typeof value;
      return type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol_default(value) ? !0 : reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    var isKey_default = isKey, nativeCreate = getNative_default(Object, "create"), nativeCreate_default = nativeCreate;
    function hashClear() {
      this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {}, this.size = 0;
    }
    var hashClear_default = hashClear;
    function hashDelete(key2) {
      var result = this.has(key2) && delete this.__data__[key2];
      return this.size -= result ? 1 : 0, result;
    }
    var hashDelete_default = hashDelete, HASH_UNDEFINED = "__lodash_hash_undefined__", objectProto4 = Object.prototype, hasOwnProperty32 = objectProto4.hasOwnProperty;
    function hashGet(key2) {
      var data2 = this.__data__;
      if (nativeCreate_default) {
        var result = data2[key2];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty32.call(data2, key2) ? data2[key2] : void 0;
    }
    var hashGet_default = hashGet, objectProto5 = Object.prototype, hasOwnProperty42 = objectProto5.hasOwnProperty;
    function hashHas(key2) {
      var data2 = this.__data__;
      return nativeCreate_default ? data2[key2] !== void 0 : hasOwnProperty42.call(data2, key2);
    }
    var hashHas_default = hashHas, HASH_UNDEFINED2 = "__lodash_hash_undefined__";
    function hashSet(key2, value) {
      var data2 = this.__data__;
      return this.size += this.has(key2) ? 0 : 1, data2[key2] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value, this;
    }
    var hashSet_default = hashSet;
    function Hash(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      for (this.clear(); ++index2 < length; ) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear_default;
    Hash.prototype.delete = hashDelete_default;
    Hash.prototype.get = hashGet_default;
    Hash.prototype.has = hashHas_default;
    Hash.prototype.set = hashSet_default;
    var Hash_default = Hash;
    function listCacheClear() {
      this.__data__ = [], this.size = 0;
    }
    var listCacheClear_default = listCacheClear;
    function assocIndexOf(array, key2) {
      for (var length = array.length; length--; )
        if (eq_default(array[length][0], key2))
          return length;
      return -1;
    }
    var assocIndexOf_default = assocIndexOf, arrayProto = Array.prototype, splice2 = arrayProto.splice;
    function listCacheDelete(key2) {
      var data2 = this.__data__, index2 = assocIndexOf_default(data2, key2);
      if (index2 < 0)
        return !1;
      var lastIndex = data2.length - 1;
      return index2 == lastIndex ? data2.pop() : splice2.call(data2, index2, 1), --this.size, !0;
    }
    var listCacheDelete_default = listCacheDelete;
    function listCacheGet(key2) {
      var data2 = this.__data__, index2 = assocIndexOf_default(data2, key2);
      return index2 < 0 ? void 0 : data2[index2][1];
    }
    var listCacheGet_default = listCacheGet;
    function listCacheHas(key2) {
      return assocIndexOf_default(this.__data__, key2) > -1;
    }
    var listCacheHas_default = listCacheHas;
    function listCacheSet(key2, value) {
      var data2 = this.__data__, index2 = assocIndexOf_default(data2, key2);
      return index2 < 0 ? (++this.size, data2.push([key2, value])) : data2[index2][1] = value, this;
    }
    var listCacheSet_default = listCacheSet;
    function ListCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      for (this.clear(); ++index2 < length; ) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear_default;
    ListCache.prototype.delete = listCacheDelete_default;
    ListCache.prototype.get = listCacheGet_default;
    ListCache.prototype.has = listCacheHas_default;
    ListCache.prototype.set = listCacheSet_default;
    var ListCache_default = ListCache, Map2 = getNative_default(root_default, "Map"), Map_default = Map2;
    function mapCacheClear() {
      this.size = 0, this.__data__ = {
        hash: new Hash_default(),
        map: new (Map_default || ListCache_default)(),
        string: new Hash_default()
      };
    }
    var mapCacheClear_default = mapCacheClear;
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    var isKeyable_default = isKeyable;
    function getMapData(map, key2) {
      var data2 = map.__data__;
      return isKeyable_default(key2) ? data2[typeof key2 == "string" ? "string" : "hash"] : data2.map;
    }
    var getMapData_default = getMapData;
    function mapCacheDelete(key2) {
      var result = getMapData_default(this, key2).delete(key2);
      return this.size -= result ? 1 : 0, result;
    }
    var mapCacheDelete_default = mapCacheDelete;
    function mapCacheGet(key2) {
      return getMapData_default(this, key2).get(key2);
    }
    var mapCacheGet_default = mapCacheGet;
    function mapCacheHas(key2) {
      return getMapData_default(this, key2).has(key2);
    }
    var mapCacheHas_default = mapCacheHas;
    function mapCacheSet(key2, value) {
      var data2 = getMapData_default(this, key2), size = data2.size;
      return data2.set(key2, value), this.size += data2.size == size ? 0 : 1, this;
    }
    var mapCacheSet_default = mapCacheSet;
    function MapCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      for (this.clear(); ++index2 < length; ) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear_default;
    MapCache.prototype.delete = mapCacheDelete_default;
    MapCache.prototype.get = mapCacheGet_default;
    MapCache.prototype.has = mapCacheHas_default;
    MapCache.prototype.set = mapCacheSet_default;
    var MapCache_default = MapCache, FUNC_ERROR_TEXT = "Expected a function";
    function memoize(func, resolver2) {
      if (typeof func != "function" || resolver2 != null && typeof resolver2 != "function")
        throw new TypeError(FUNC_ERROR_TEXT);
      var memoized = function() {
        var args = arguments, key2 = resolver2 ? resolver2.apply(this, args) : args[0], cache4 = memoized.cache;
        if (cache4.has(key2))
          return cache4.get(key2);
        var result = func.apply(this, args);
        return memoized.cache = cache4.set(key2, result) || cache4, result;
      };
      return memoized.cache = new (memoize.Cache || MapCache_default)(), memoized;
    }
    memoize.Cache = MapCache_default;
    var memoize_default = memoize, MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize_default(func, function(key2) {
        return cache4.size === MAX_MEMOIZE_SIZE && cache4.clear(), key2;
      }), cache4 = result.cache;
      return result;
    }
    var memoizeCapped_default = memoizeCapped, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, reEscapeChar = /\\(\\)?/g, stringToPath = memoizeCapped_default(function(string3) {
      var result = [];
      return string3.charCodeAt(0) === 46 && result.push(""), string3.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
      }), result;
    }), stringToPath_default = stringToPath;
    function toString3(value) {
      return value == null ? "" : baseToString_default(value);
    }
    var toString_default = toString3;
    function castPath(value, object) {
      return isArray_default(value) ? value : isKey_default(value, object) ? [value] : stringToPath_default(toString_default(value));
    }
    var castPath_default = castPath, INFINITY2 = 1 / 0;
    function toKey(value) {
      if (typeof value == "string" || isSymbol_default(value))
        return value;
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY2 ? "-0" : result;
    }
    var toKey_default = toKey;
    function baseGet(object, path2) {
      path2 = castPath_default(path2, object);
      for (var index2 = 0, length = path2.length; object != null && index2 < length; )
        object = object[toKey_default(path2[index2++])];
      return index2 && index2 == length ? object : void 0;
    }
    var baseGet_default = baseGet;
    function get(object, path2, defaultValue) {
      var result = object == null ? void 0 : baseGet_default(object, path2);
      return result === void 0 ? defaultValue : result;
    }
    var get_default = get, eventProperties = [
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
    ], customEventSpecificProperties = ["detail"];
    function extractEventHiddenProperties(event) {
      let rebuildEvent = eventProperties.filter((value) => event[value] !== void 0).reduce((acc, value) => (acc[value] = event[value], acc), {});
      if (event instanceof CustomEvent)
        for (let value of customEventSpecificProperties.filter(
          (value2) => event[value2] !== void 0
        ))
          rebuildEvent[value] = event[value];
      return rebuildEvent;
    }
    var isObject3 = isObject, dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/, isJSON4 = (input) => input.match(/^[\[\{\"\}].*[\]\}\"]$/);
    function convertUnconventionalData(data2) {
      if (!isObject3(data2))
        return data2;
      let result = data2, wasMutated = !1;
      return typeof Event < "u" && data2 instanceof Event && (result = extractEventHiddenProperties(result), wasMutated = !0), result = Object.keys(result).reduce((acc, key2) => {
        try {
          result[key2] && result[key2].toJSON, acc[key2] = result[key2];
        } catch {
          wasMutated = !0;
        }
        return acc;
      }, {}), wasMutated ? result : data2;
    }
    var replacer = function(options) {
      let objects, map, stack, keys;
      return function(key2, value) {
        try {
          if (key2 === "")
            return keys = [], objects = /* @__PURE__ */ new Map([[value, "[]"]]), map = /* @__PURE__ */ new Map(), stack = [], value;
          let origin = map.get(this) || this;
          for (; stack.length && origin !== stack[0]; )
            stack.shift(), keys.pop();
          if (typeof value == "boolean")
            return value;
          if (value === void 0)
            return options.allowUndefined ? "_undefined_" : void 0;
          if (value === null)
            return null;
          if (typeof value == "number")
            return value === Number.NEGATIVE_INFINITY ? "_-Infinity_" : value === Number.POSITIVE_INFINITY ? "_Infinity_" : Number.isNaN(value) ? "_NaN_" : value;
          if (typeof value == "bigint")
            return `_bigint_${value.toString()}`;
          if (typeof value == "string")
            return dateFormat.test(value) ? options.allowDate ? `_date_${value}` : void 0 : value;
          if ((0, import_is_regex.default)(value))
            return options.allowRegExp ? `_regexp_${value.flags}|${value.source}` : void 0;
          if ((0, import_is_function.default)(value))
            return;
          if ((0, import_is_symbol.default)(value)) {
            if (!options.allowSymbol)
              return;
            let globalRegistryKey = Symbol.keyFor(value);
            return globalRegistryKey !== void 0 ? `_gsymbol_${globalRegistryKey}` : `_symbol_${value.toString().slice(7, -1)}`;
          }
          if (stack.length >= options.maxDepth)
            return Array.isArray(value) ? `[Array(${value.length})]` : "[Object]";
          if (value === this)
            return `_duplicate_${JSON.stringify(keys)}`;
          if (value instanceof Error && options.allowError)
            return {
              __isConvertedError__: !0,
              errorProperties: {
                // @ts-expect-error cause is not defined in the current tsconfig target(es2020)
                ...value.cause ? { cause: value.cause } : {},
                ...value,
                name: value.name,
                message: value.message,
                stack: value.stack,
                "_constructor-name_": value.constructor.name
              }
            };
          if (value?.constructor?.name && value.constructor.name !== "Object" && !Array.isArray(value)) {
            let found2 = objects.get(value);
            if (!found2) {
              let plainObject = {
                __isClassInstance__: !0,
                __className__: value.constructor.name,
                ...Object.getOwnPropertyNames(value).reduce(
                  (acc, prop) => {
                    try {
                      acc[prop] = value[prop];
                    } catch {
                    }
                    return acc;
                  },
                  {}
                )
              };
              return keys.push(key2), stack.unshift(plainObject), objects.set(value, JSON.stringify(keys)), value !== plainObject && map.set(value, plainObject), plainObject;
            }
            return `_duplicate_${found2}`;
          }
          let found = objects.get(value);
          if (!found) {
            let converted = Array.isArray(value) ? value : convertUnconventionalData(value);
            return keys.push(key2), stack.unshift(converted), objects.set(value, JSON.stringify(keys)), value !== converted && map.set(value, converted), converted;
          }
          return `_duplicate_${found}`;
        } catch {
          return;
        }
      };
    }, reviver = function(options) {
      let refs = [], root2;
      return function(key2, value) {
        if (key2 === "" && (root2 = value, refs.forEach(({ target, container, replacement }) => {
          let replacementArr = isJSON4(replacement) ? JSON.parse(replacement) : replacement.split(".");
          replacementArr.length === 0 ? container[target] = root2 : container[target] = get_default(root2, replacementArr);
        })), key2 === "_constructor-name_")
          return value;
        if (isObject3(value) && value.__isConvertedError__) {
          let { message, ...properties } = value.errorProperties, error = new Error(message);
          return Object.assign(error, properties), error;
        }
        if (typeof value == "string" && value.startsWith("_regexp_") && options.allowRegExp) {
          let [, flags, source] = value.match(/_regexp_([^|]*)\|(.*)/) || [];
          return new RegExp(source, flags);
        }
        return typeof value == "string" && value.startsWith("_date_") && options.allowDate ? new Date(value.replace("_date_", "")) : typeof value == "string" && value.startsWith("_duplicate_") ? (refs.push({ target: key2, container: this, replacement: value.replace(/^_duplicate_/, "") }), null) : typeof value == "string" && value.startsWith("_symbol_") && options.allowSymbol ? Symbol(value.replace("_symbol_", "")) : typeof value == "string" && value.startsWith("_gsymbol_") && options.allowSymbol ? Symbol.for(value.replace("_gsymbol_", "")) : typeof value == "string" && value === "_-Infinity_" ? Number.NEGATIVE_INFINITY : typeof value == "string" && value === "_Infinity_" ? Number.POSITIVE_INFINITY : typeof value == "string" && value === "_NaN_" ? Number.NaN : typeof value == "string" && value.startsWith("_bigint_") && typeof BigInt == "function" ? BigInt(value.replace("_bigint_", "")) : value;
      };
    }, defaultOptions2 = {
      maxDepth: 10,
      space: void 0,
      allowRegExp: !0,
      allowDate: !0,
      allowError: !0,
      allowUndefined: !0,
      allowSymbol: !0
    }, stringify4 = (data2, options = {}) => {
      let mergedOptions = { ...defaultOptions2, ...options };
      return JSON.stringify(convertUnconventionalData(data2), replacer(mergedOptions), options.space);
    }, mutator = () => {
      let mutated = /* @__PURE__ */ new Map();
      return function mutateUndefined(value) {
        isObject3(value) && Object.entries(value).forEach(([k, v]) => {
          v === "_undefined_" ? value[k] = void 0 : mutated.get(v) || (mutated.set(v, !0), mutateUndefined(v));
        }), Array.isArray(value) && value.forEach((v, index2) => {
          v === "_undefined_" ? (mutated.set(v, !0), value[index2] = void 0) : mutated.get(v) || (mutated.set(v, !0), mutateUndefined(v));
        });
      };
    }, parse11 = (data2, options = {}) => {
      let mergedOptions = { ...defaultOptions2, ...options }, result = JSON.parse(data2, reviver(mergedOptions));
      return mutator()(result), result;
    };
  }
});

// ../../node_modules/address/lib/address.js
var require_address = __commonJS({
  "../../node_modules/address/lib/address.js"(exports, module) {
    "use strict";
    var os2 = __require("os"), fs = __require("fs"), child = __require("child_process"), DEFAULT_RESOLV_FILE = "/etc/resolv.conf";
    function getInterfaceName() {
      var val = "eth", platform = os2.platform();
      return platform === "darwin" ? val = "en" : platform === "win32" && (val = null), val;
    }
    function getIfconfigCMD() {
      return os2.platform() === "win32" ? "ipconfig/all" : "/sbin/ifconfig";
    }
    function matchName(actualFamily, expectedFamily) {
      return expectedFamily === "IPv4" ? actualFamily === "IPv4" || actualFamily === 4 : expectedFamily === "IPv6" ? actualFamily === "IPv6" || actualFamily === 6 : actualFamily === expectedFamily;
    }
    function address(interfaceName, callback) {
      typeof interfaceName == "function" && (callback = interfaceName, interfaceName = null);
      var addr = {
        ip: address.ip(interfaceName),
        ipv6: address.ipv6(interfaceName),
        mac: null
      };
      address.mac(interfaceName, function(err, mac) {
        mac && (addr.mac = mac), callback(err, addr);
      });
    }
    address.interface = function(family, name2) {
      var interfaces = os2.networkInterfaces(), noName = !name2;
      name2 = name2 || getInterfaceName(), family = family || "IPv4";
      for (var i2 = -1; i2 < 8; i2++) {
        var interfaceName = name2 + (i2 >= 0 ? i2 : ""), items = interfaces[interfaceName];
        if (items)
          for (var j = 0; j < items.length; j++) {
            var item = items[j];
            if (matchName(item.family, family))
              return item;
          }
      }
      if (noName)
        for (var k in interfaces)
          for (var items = interfaces[k], i2 = 0; i2 < items.length; i2++) {
            var item = items[i2];
            if (matchName(item.family, family) && !item.address.startsWith("127."))
              return item;
          }
    };
    address.ip = function(interfaceName) {
      var item = address.interface("IPv4", interfaceName);
      return item && item.address;
    };
    address.ipv6 = function(interfaceName) {
      var item = address.interface("IPv6", interfaceName);
      return item && item.address;
    };
    var MAC_OSX_START_LINE = /^(\w+)\:\s+flags=/, MAC_LINUX_START_LINE = /^(\w+)\s{2,}link encap:\w+/i, MAC_RE = address.MAC_RE = /(?:ether|HWaddr)\s+((?:[a-z0-9]{2}\:){5}[a-z0-9]{2})/i, MAC_IP_RE = address.MAC_IP_RE = /inet\s(?:addr\:)?(\d+\.\d+\.\d+\.\d+)/;
    function getMAC(content3, interfaceName, matchIP) {
      for (var lines = content3.split(`
`), i2 = 0; i2 < lines.length; i2++) {
        var line = lines[i2].trimRight(), m = MAC_OSX_START_LINE.exec(line) || MAC_LINUX_START_LINE.exec(line);
        if (m) {
          var name2 = m[1];
          if (name2.indexOf(interfaceName) === 0) {
            var ip = null, mac = null, match = MAC_RE.exec(line);
            for (match && (mac = match[1]), i2++; ; ) {
              if (line = lines[i2], !line || MAC_OSX_START_LINE.exec(line) || MAC_LINUX_START_LINE.exec(line)) {
                i2--;
                break;
              }
              mac || (match = MAC_RE.exec(line), match && (mac = match[1])), ip || (match = MAC_IP_RE.exec(line), match && (ip = match[1])), i2++;
            }
            if (ip === matchIP)
              return mac;
          }
        }
      }
    }
    address.mac = function(interfaceName, callback) {
      typeof interfaceName == "function" && (callback = interfaceName, interfaceName = null), interfaceName = interfaceName || getInterfaceName();
      var item = address.interface("IPv4", interfaceName);
      if (!item)
        return callback();
      if (!process.env.CI && (item.mac === "ff:00:00:00:00:00" || item.mac === "00:00:00:00:00:00") && (item.mac = ""), item.mac)
        return callback(null, item.mac);
      child.exec(getIfconfigCMD(), { timeout: 5e3 }, function(err, stdout, stderr) {
        if (err || !stdout)
          return callback(err);
        var mac = getMAC(stdout || "", interfaceName, item.address);
        callback(null, mac);
      });
    };
    var DNS_SERVER_RE = /^nameserver\s+(\d+\.\d+\.\d+\.\d+)$/i;
    address.dns = function(filepath, callback) {
      typeof filepath == "function" && (callback = filepath, filepath = null), filepath = filepath || DEFAULT_RESOLV_FILE, fs.readFile(filepath, "utf8", function(err, content3) {
        if (err)
          return callback(err);
        var servers = [];
        content3 = content3 || "";
        for (var lines = content3.split(`
`), i2 = 0; i2 < lines.length; i2++) {
          var line = lines[i2].trim(), m = DNS_SERVER_RE.exec(line);
          m && servers.push(m[1]);
        }
        callback(null, servers);
      });
    };
    module.exports = address;
  }
});

// ../../node_modules/detect-port/lib/detect-port.js
var require_detect_port = __commonJS({
  "../../node_modules/detect-port/lib/detect-port.js"(exports, module) {
    "use strict";
    var net2 = __require("net"), address = require_address(), debug = require_src()("detect-port");
    module.exports = (port, callback) => {
      let hostname = "";
      typeof port == "object" && port ? (hostname = port.hostname, callback = port.callback, port = port.port) : typeof port == "function" && (callback = port, port = null), port = parseInt(port) || 0;
      let maxPort = port + 10;
      return maxPort > 65535 && (maxPort = 65535), debug("detect free port between [%s, %s)", port, maxPort), typeof callback == "function" ? tryListen(port, maxPort, hostname, callback) : new Promise((resolve4) => {
        tryListen(port, maxPort, hostname, (_, realPort) => {
          resolve4(realPort);
        });
      });
    };
    function tryListen(port, maxPort, hostname, callback) {
      function handleError() {
        port++, port >= maxPort && (debug("port: %s >= maxPort: %s, give up and use random port", port, maxPort), port = 0, maxPort = 0), tryListen(port, maxPort, hostname, callback);
      }
      hostname ? listen(port, hostname, (err, realPort) => {
        if (err)
          return err.code === "EADDRNOTAVAIL" ? callback(new Error("the ip that is not unknown on the machine")) : handleError();
        callback(null, realPort);
      }) : listen(port, null, (err, realPort) => {
        if (port === 0)
          return callback(err, realPort);
        if (err)
          return handleError(err);
        listen(port, "0.0.0.0", (err2) => {
          if (err2)
            return handleError(err2);
          listen(port, "localhost", (err3) => {
            if (err3 && err3.code !== "EADDRNOTAVAIL")
              return handleError(err3);
            listen(port, address.ip(), (err4, realPort2) => {
              if (err4)
                return handleError(err4);
              callback(null, realPort2);
            });
          });
        });
      });
    }
    function listen(port, hostname, callback) {
      let server = new net2.Server();
      server.on("error", (err) => (debug("listen %s:%s error: %s", hostname, port, err), server.close(), err.code === "ENOTFOUND" ? (debug("ignore dns ENOTFOUND error, get free %s:%s", hostname, port), callback(null, port)) : callback(err))), server.listen(port, hostname, () => (port = server.address().port, server.close(), debug("get free %s:%s", hostname, port), callback(null, port)));
    }
  }
});

// ../../node_modules/detect-port/lib/wait-port.js
var require_wait_port = __commonJS({
  "../../node_modules/detect-port/lib/wait-port.js"(exports, module) {
    "use strict";
    var debug = require_src()("wait-port"), detect = require_detect_port(), sleep = (ms) => new Promise((resolve4) => setTimeout(resolve4, ms));
    async function waitPort(port, options = {}) {
      let { retryInterval = 1e3, retries = 1 / 0 } = options, count = 1;
      async function loop() {
        if (debug("retries", retries, "count", count), count > retries) {
          let err = new Error("retries exceeded");
          throw err.retries = retries, err.count = count, err;
        }
        return count++, await detect(port) === port ? (await sleep(retryInterval), loop()) : !0;
      }
      return await loop();
    }
    module.exports = waitPort;
  }
});

// ../../node_modules/detect-port/index.js
var require_detect_port2 = __commonJS({
  "../../node_modules/detect-port/index.js"(exports, module) {
    "use strict";
    module.exports = require_detect_port();
    module.exports.waitPort = require_wait_port();
  }
});

// ../../node_modules/tsconfig-paths/lib/filesystem.js
var require_filesystem = __commonJS({
  "../../node_modules/tsconfig-paths/lib/filesystem.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.removeExtension = exports.fileExistsAsync = exports.readJsonFromDiskAsync = exports.readJsonFromDiskSync = exports.fileExistsSync = void 0;
    var fs = __require("fs");
    function fileExistsSync(path2) {
      if (!fs.existsSync(path2))
        return !1;
      try {
        var stats = fs.statSync(path2);
        return stats.isFile();
      } catch {
        return !1;
      }
    }
    exports.fileExistsSync = fileExistsSync;
    function readJsonFromDiskSync(packageJsonPath) {
      if (fs.existsSync(packageJsonPath))
        return __require(packageJsonPath);
    }
    exports.readJsonFromDiskSync = readJsonFromDiskSync;
    function readJsonFromDiskAsync(path2, callback) {
      fs.readFile(path2, "utf8", function(err, result) {
        if (err || !result)
          return callback();
        var json = JSON.parse(result);
        return callback(void 0, json);
      });
    }
    exports.readJsonFromDiskAsync = readJsonFromDiskAsync;
    function fileExistsAsync(path2, callback2) {
      fs.stat(path2, function(err, stats) {
        if (err)
          return callback2(void 0, !1);
        callback2(void 0, stats ? stats.isFile() : !1);
      });
    }
    exports.fileExistsAsync = fileExistsAsync;
    function removeExtension(path2) {
      return path2.substring(0, path2.lastIndexOf(".")) || path2;
    }
    exports.removeExtension = removeExtension;
  }
});

// ../../node_modules/tsconfig-paths/lib/mapping-entry.js
var require_mapping_entry = __commonJS({
  "../../node_modules/tsconfig-paths/lib/mapping-entry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.getAbsoluteMappingEntries = void 0;
    var path2 = __require("path");
    function getAbsoluteMappingEntries(absoluteBaseUrl, paths, addMatchAll) {
      for (var sortedKeys = sortByLongestPrefix(Object.keys(paths)), absolutePaths = [], _i = 0, sortedKeys_1 = sortedKeys; _i < sortedKeys_1.length; _i++) {
        var key2 = sortedKeys_1[_i];
        absolutePaths.push({
          pattern: key2,
          paths: paths[key2].map(function(pathToResolve) {
            return path2.resolve(absoluteBaseUrl, pathToResolve);
          })
        });
      }
      return !paths["*"] && addMatchAll && absolutePaths.push({
        pattern: "*",
        paths: ["".concat(absoluteBaseUrl.replace(/\/$/, ""), "/*")]
      }), absolutePaths;
    }
    exports.getAbsoluteMappingEntries = getAbsoluteMappingEntries;
    function sortByLongestPrefix(arr) {
      return arr.concat().sort(function(a, b) {
        return getPrefixLength(b) - getPrefixLength(a);
      });
    }
    function getPrefixLength(pattern) {
      var prefixLength = pattern.indexOf("*");
      return pattern.substr(0, prefixLength).length;
    }
  }
});

// ../../node_modules/tsconfig-paths/lib/try-path.js
var require_try_path = __commonJS({
  "../../node_modules/tsconfig-paths/lib/try-path.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.exhaustiveTypeException = exports.getStrippedPath = exports.getPathsToTry = void 0;
    var path2 = __require("path"), path_1 = __require("path"), filesystem_1 = require_filesystem();
    function getPathsToTry(extensions, absolutePathMappings, requestedModule) {
      if (!(!absolutePathMappings || !requestedModule || requestedModule[0] === ".")) {
        for (var pathsToTry = [], _i = 0, absolutePathMappings_1 = absolutePathMappings; _i < absolutePathMappings_1.length; _i++) {
          var entry = absolutePathMappings_1[_i], starMatch = entry.pattern === requestedModule ? "" : matchStar(entry.pattern, requestedModule);
          if (starMatch !== void 0)
            for (var _loop_1 = function(physicalPathPattern2) {
              var physicalPath = physicalPathPattern2.replace("*", starMatch);
              pathsToTry.push({ type: "file", path: physicalPath }), pathsToTry.push.apply(pathsToTry, extensions.map(function(e) {
                return { type: "extension", path: physicalPath + e };
              })), pathsToTry.push({
                type: "package",
                path: path2.join(physicalPath, "/package.json")
              });
              var indexPath = path2.join(physicalPath, "/index");
              pathsToTry.push.apply(pathsToTry, extensions.map(function(e) {
                return { type: "index", path: indexPath + e };
              }));
            }, _a = 0, _b = entry.paths; _a < _b.length; _a++) {
              var physicalPathPattern = _b[_a];
              _loop_1(physicalPathPattern);
            }
        }
        return pathsToTry.length === 0 ? void 0 : pathsToTry;
      }
    }
    exports.getPathsToTry = getPathsToTry;
    function getStrippedPath(tryPath) {
      return tryPath.type === "index" ? (0, path_1.dirname)(tryPath.path) : tryPath.type === "file" ? tryPath.path : tryPath.type === "extension" ? (0, filesystem_1.removeExtension)(tryPath.path) : tryPath.type === "package" ? tryPath.path : exhaustiveTypeException(tryPath.type);
    }
    exports.getStrippedPath = getStrippedPath;
    function exhaustiveTypeException(check) {
      throw new Error("Unknown type ".concat(check));
    }
    exports.exhaustiveTypeException = exhaustiveTypeException;
    function matchStar(pattern, search2) {
      if (!(search2.length < pattern.length)) {
        if (pattern === "*")
          return search2;
        var star = pattern.indexOf("*");
        if (star !== -1) {
          var part1 = pattern.substring(0, star), part2 = pattern.substring(star + 1);
          if (search2.substr(0, star) === part1 && search2.substr(search2.length - part2.length) === part2)
            return search2.substr(star, search2.length - part2.length);
        }
      }
    }
  }
});

// ../../node_modules/tsconfig-paths/lib/match-path-sync.js
var require_match_path_sync = __commonJS({
  "../../node_modules/tsconfig-paths/lib/match-path-sync.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.matchFromAbsolutePaths = exports.createMatchPath = void 0;
    var path2 = __require("path"), Filesystem = require_filesystem(), MappingEntry = require_mapping_entry(), TryPath = require_try_path();
    function createMatchPath2(absoluteBaseUrl, paths, mainFields, addMatchAll) {
      mainFields === void 0 && (mainFields = ["main"]), addMatchAll === void 0 && (addMatchAll = !0);
      var absolutePaths = MappingEntry.getAbsoluteMappingEntries(absoluteBaseUrl, paths, addMatchAll);
      return function(requestedModule, readJson, fileExists2, extensions) {
        return matchFromAbsolutePaths(absolutePaths, requestedModule, readJson, fileExists2, extensions, mainFields);
      };
    }
    exports.createMatchPath = createMatchPath2;
    function matchFromAbsolutePaths(absolutePathMappings, requestedModule, readJson, fileExists2, extensions, mainFields) {
      readJson === void 0 && (readJson = Filesystem.readJsonFromDiskSync), fileExists2 === void 0 && (fileExists2 = Filesystem.fileExistsSync), extensions === void 0 && (extensions = Object.keys(__require.extensions)), mainFields === void 0 && (mainFields = ["main"]);
      var tryPaths = TryPath.getPathsToTry(extensions, absolutePathMappings, requestedModule);
      if (tryPaths)
        return findFirstExistingPath(tryPaths, readJson, fileExists2, mainFields);
    }
    exports.matchFromAbsolutePaths = matchFromAbsolutePaths;
    function findFirstExistingMainFieldMappedFile(packageJson, mainFields, packageJsonPath, fileExists2) {
      for (var index2 = 0; index2 < mainFields.length; index2++) {
        var mainFieldSelector = mainFields[index2], candidateMapping = typeof mainFieldSelector == "string" ? packageJson[mainFieldSelector] : mainFieldSelector.reduce(function(obj, key2) {
          return obj[key2];
        }, packageJson);
        if (candidateMapping && typeof candidateMapping == "string") {
          var candidateFilePath = path2.join(path2.dirname(packageJsonPath), candidateMapping);
          if (fileExists2(candidateFilePath))
            return candidateFilePath;
        }
      }
    }
    function findFirstExistingPath(tryPaths, readJson, fileExists2, mainFields) {
      readJson === void 0 && (readJson = Filesystem.readJsonFromDiskSync), mainFields === void 0 && (mainFields = ["main"]);
      for (var _i = 0, tryPaths_1 = tryPaths; _i < tryPaths_1.length; _i++) {
        var tryPath = tryPaths_1[_i];
        if (tryPath.type === "file" || tryPath.type === "extension" || tryPath.type === "index") {
          if (fileExists2(tryPath.path))
            return TryPath.getStrippedPath(tryPath);
        } else if (tryPath.type === "package") {
          var packageJson = readJson(tryPath.path);
          if (packageJson) {
            var mainFieldMappedFile = findFirstExistingMainFieldMappedFile(packageJson, mainFields, tryPath.path, fileExists2);
            if (mainFieldMappedFile)
              return mainFieldMappedFile;
          }
        } else
          TryPath.exhaustiveTypeException(tryPath.type);
      }
    }
  }
});

// ../../node_modules/tsconfig-paths/lib/match-path-async.js
var require_match_path_async = __commonJS({
  "../../node_modules/tsconfig-paths/lib/match-path-async.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.matchFromAbsolutePathsAsync = exports.createMatchPathAsync = void 0;
    var path2 = __require("path"), TryPath = require_try_path(), MappingEntry = require_mapping_entry(), Filesystem = require_filesystem();
    function createMatchPathAsync(absoluteBaseUrl, paths, mainFields, addMatchAll) {
      mainFields === void 0 && (mainFields = ["main"]), addMatchAll === void 0 && (addMatchAll = !0);
      var absolutePaths = MappingEntry.getAbsoluteMappingEntries(absoluteBaseUrl, paths, addMatchAll);
      return function(requestedModule, readJson, fileExists2, extensions, callback) {
        return matchFromAbsolutePathsAsync(absolutePaths, requestedModule, readJson, fileExists2, extensions, callback, mainFields);
      };
    }
    exports.createMatchPathAsync = createMatchPathAsync;
    function matchFromAbsolutePathsAsync(absolutePathMappings, requestedModule, readJson, fileExists2, extensions, callback, mainFields) {
      readJson === void 0 && (readJson = Filesystem.readJsonFromDiskAsync), fileExists2 === void 0 && (fileExists2 = Filesystem.fileExistsAsync), extensions === void 0 && (extensions = Object.keys(__require.extensions)), mainFields === void 0 && (mainFields = ["main"]);
      var tryPaths = TryPath.getPathsToTry(extensions, absolutePathMappings, requestedModule);
      if (!tryPaths)
        return callback();
      findFirstExistingPath(tryPaths, readJson, fileExists2, callback, 0, mainFields);
    }
    exports.matchFromAbsolutePathsAsync = matchFromAbsolutePathsAsync;
    function findFirstExistingMainFieldMappedFile(packageJson, mainFields, packageJsonPath, fileExistsAsync, doneCallback, index2) {
      if (index2 === void 0 && (index2 = 0), index2 >= mainFields.length)
        return doneCallback(void 0, void 0);
      var tryNext = function() {
        return findFirstExistingMainFieldMappedFile(packageJson, mainFields, packageJsonPath, fileExistsAsync, doneCallback, index2 + 1);
      }, mainFieldSelector = mainFields[index2], mainFieldMapping = typeof mainFieldSelector == "string" ? packageJson[mainFieldSelector] : mainFieldSelector.reduce(function(obj, key2) {
        return obj[key2];
      }, packageJson);
      if (typeof mainFieldMapping != "string")
        return tryNext();
      var mappedFilePath = path2.join(path2.dirname(packageJsonPath), mainFieldMapping);
      fileExistsAsync(mappedFilePath, function(err, exists) {
        return err ? doneCallback(err) : exists ? doneCallback(void 0, mappedFilePath) : tryNext();
      });
    }
    function findFirstExistingPath(tryPaths, readJson, fileExists2, doneCallback, index2, mainFields) {
      index2 === void 0 && (index2 = 0), mainFields === void 0 && (mainFields = ["main"]);
      var tryPath = tryPaths[index2];
      tryPath.type === "file" || tryPath.type === "extension" || tryPath.type === "index" ? fileExists2(tryPath.path, function(err, exists) {
        return err ? doneCallback(err) : exists ? doneCallback(void 0, TryPath.getStrippedPath(tryPath)) : index2 === tryPaths.length - 1 ? doneCallback() : findFirstExistingPath(tryPaths, readJson, fileExists2, doneCallback, index2 + 1, mainFields);
      }) : tryPath.type === "package" ? readJson(tryPath.path, function(err, packageJson) {
        return err ? doneCallback(err) : packageJson ? findFirstExistingMainFieldMappedFile(packageJson, mainFields, tryPath.path, fileExists2, function(mainFieldErr, mainFieldMappedFile) {
          return mainFieldErr ? doneCallback(mainFieldErr) : mainFieldMappedFile ? doneCallback(void 0, mainFieldMappedFile) : findFirstExistingPath(tryPaths, readJson, fileExists2, doneCallback, index2 + 1, mainFields);
        }) : findFirstExistingPath(tryPaths, readJson, fileExists2, doneCallback, index2 + 1, mainFields);
      }) : TryPath.exhaustiveTypeException(tryPath.type);
    }
  }
});

// ../../node_modules/strip-bom/index.js
var require_strip_bom = __commonJS({
  "../../node_modules/strip-bom/index.js"(exports, module) {
    "use strict";
    module.exports = (x) => {
      if (typeof x != "string")
        throw new TypeError("Expected a string, got " + typeof x);
      return x.charCodeAt(0) === 65279 ? x.slice(1) : x;
    };
  }
});

// ../../node_modules/tsconfig-paths/lib/tsconfig-loader.js
var require_tsconfig_loader = __commonJS({
  "../../node_modules/tsconfig-paths/lib/tsconfig-loader.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      return __assign = Object.assign || function(t) {
        for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
          s = arguments[i2];
          for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
        }
        return t;
      }, __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.loadTsconfig = exports.walkForTsConfig = exports.tsConfigLoader = void 0;
    var path2 = __require("path"), fs = __require("fs"), JSON5 = require_lib(), StripBom = require_strip_bom();
    function tsConfigLoader(_a) {
      var getEnv = _a.getEnv, cwd = _a.cwd, _b = _a.loadSync, loadSync = _b === void 0 ? loadSyncDefault : _b, TS_NODE_PROJECT = getEnv("TS_NODE_PROJECT"), TS_NODE_BASEURL = getEnv("TS_NODE_BASEURL"), loadResult = loadSync(cwd, TS_NODE_PROJECT, TS_NODE_BASEURL);
      return loadResult;
    }
    exports.tsConfigLoader = tsConfigLoader;
    function loadSyncDefault(cwd, filename, baseUrl) {
      var configPath = resolveConfigPath(cwd, filename);
      if (!configPath)
        return {
          tsConfigPath: void 0,
          baseUrl: void 0,
          paths: void 0
        };
      var config = loadTsconfig(configPath);
      return {
        tsConfigPath: configPath,
        baseUrl: baseUrl || config && config.compilerOptions && config.compilerOptions.baseUrl,
        paths: config && config.compilerOptions && config.compilerOptions.paths
      };
    }
    function resolveConfigPath(cwd, filename) {
      if (filename) {
        var absolutePath = fs.lstatSync(filename).isDirectory() ? path2.resolve(filename, "./tsconfig.json") : path2.resolve(cwd, filename);
        return absolutePath;
      }
      if (fs.statSync(cwd).isFile())
        return path2.resolve(cwd);
      var configAbsolutePath = walkForTsConfig(cwd);
      return configAbsolutePath ? path2.resolve(configAbsolutePath) : void 0;
    }
    function walkForTsConfig(directory, readdirSync2) {
      readdirSync2 === void 0 && (readdirSync2 = fs.readdirSync);
      for (var files = readdirSync2(directory), filesToCheck = ["tsconfig.json", "jsconfig.json"], _i = 0, filesToCheck_1 = filesToCheck; _i < filesToCheck_1.length; _i++) {
        var fileToCheck = filesToCheck_1[_i];
        if (files.indexOf(fileToCheck) !== -1)
          return path2.join(directory, fileToCheck);
      }
      var parentDirectory = path2.dirname(directory);
      if (directory !== parentDirectory)
        return walkForTsConfig(parentDirectory, readdirSync2);
    }
    exports.walkForTsConfig = walkForTsConfig;
    function loadTsconfig(configFilePath, existsSync4, readFileSync) {
      if (existsSync4 === void 0 && (existsSync4 = fs.existsSync), readFileSync === void 0 && (readFileSync = function(filename) {
        return fs.readFileSync(filename, "utf8");
      }), !!existsSync4(configFilePath)) {
        var configString = readFileSync(configFilePath), cleanedJson = StripBom(configString), config;
        try {
          config = JSON5.parse(cleanedJson);
        } catch (e) {
          throw new Error("".concat(configFilePath, " is malformed ").concat(e.message));
        }
        var extendedConfig = config.extends;
        if (extendedConfig) {
          var base = void 0;
          return Array.isArray(extendedConfig) ? base = extendedConfig.reduce(function(currBase, extendedConfigElement) {
            return mergeTsconfigs(currBase, loadTsconfigFromExtends(configFilePath, extendedConfigElement, existsSync4, readFileSync));
          }, {}) : base = loadTsconfigFromExtends(configFilePath, extendedConfig, existsSync4, readFileSync), mergeTsconfigs(base, config);
        }
        return config;
      }
    }
    exports.loadTsconfig = loadTsconfig;
    function loadTsconfigFromExtends(configFilePath, extendedConfigValue, existsSync4, readFileSync) {
      var _a;
      typeof extendedConfigValue == "string" && extendedConfigValue.indexOf(".json") === -1 && (extendedConfigValue += ".json");
      var currentDir = path2.dirname(configFilePath), extendedConfigPath = path2.join(currentDir, extendedConfigValue);
      extendedConfigValue.indexOf("/") !== -1 && extendedConfigValue.indexOf(".") !== -1 && !existsSync4(extendedConfigPath) && (extendedConfigPath = path2.join(currentDir, "node_modules", extendedConfigValue));
      var config = loadTsconfig(extendedConfigPath, existsSync4, readFileSync) || {};
      if (!((_a = config.compilerOptions) === null || _a === void 0) && _a.baseUrl) {
        var extendsDir = path2.dirname(extendedConfigValue);
        config.compilerOptions.baseUrl = path2.join(extendsDir, config.compilerOptions.baseUrl);
      }
      return config;
    }
    function mergeTsconfigs(base, config) {
      return base = base || {}, config = config || {}, __assign(__assign(__assign({}, base), config), { compilerOptions: __assign(__assign({}, base.compilerOptions), config.compilerOptions) });
    }
  }
});

// ../../node_modules/tsconfig-paths/lib/config-loader.js
var require_config_loader = __commonJS({
  "../../node_modules/tsconfig-paths/lib/config-loader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.configLoader = exports.loadConfig = void 0;
    var TsConfigLoader2 = require_tsconfig_loader(), path2 = __require("path");
    function loadConfig3(cwd) {
      return cwd === void 0 && (cwd = process.cwd()), configLoader({ cwd });
    }
    exports.loadConfig = loadConfig3;
    function configLoader(_a) {
      var cwd = _a.cwd, explicitParams = _a.explicitParams, _b = _a.tsConfigLoader, tsConfigLoader = _b === void 0 ? TsConfigLoader2.tsConfigLoader : _b;
      if (explicitParams) {
        var absoluteBaseUrl = path2.isAbsolute(explicitParams.baseUrl) ? explicitParams.baseUrl : path2.join(cwd, explicitParams.baseUrl);
        return {
          resultType: "success",
          configFileAbsolutePath: "",
          baseUrl: explicitParams.baseUrl,
          absoluteBaseUrl,
          paths: explicitParams.paths,
          mainFields: explicitParams.mainFields,
          addMatchAll: explicitParams.addMatchAll
        };
      }
      var loadResult = tsConfigLoader({
        cwd,
        getEnv: function(key2) {
          return process.env[key2];
        }
      });
      return loadResult.tsConfigPath ? {
        resultType: "success",
        configFileAbsolutePath: loadResult.tsConfigPath,
        baseUrl: loadResult.baseUrl,
        absoluteBaseUrl: path2.resolve(path2.dirname(loadResult.tsConfigPath), loadResult.baseUrl || ""),
        paths: loadResult.paths || {},
        addMatchAll: loadResult.baseUrl !== void 0
      } : {
        resultType: "failed",
        message: "Couldn't find tsconfig.json"
      };
    }
    exports.configLoader = configLoader;
  }
});

// ../../node_modules/minimist/index.js
var require_minimist = __commonJS({
  "../../node_modules/minimist/index.js"(exports, module) {
    "use strict";
    function hasKey(obj, keys) {
      var o = obj;
      keys.slice(0, -1).forEach(function(key3) {
        o = o[key3] || {};
      });
      var key2 = keys[keys.length - 1];
      return key2 in o;
    }
    function isNumber(x) {
      return typeof x == "number" || /^0x[0-9a-f]+$/i.test(x) ? !0 : /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
    }
    function isConstructorOrProto(obj, key2) {
      return key2 === "constructor" && typeof obj[key2] == "function" || key2 === "__proto__";
    }
    module.exports = function(args, opts) {
      opts || (opts = {});
      var flags = {
        bools: {},
        strings: {},
        unknownFn: null
      };
      typeof opts.unknown == "function" && (flags.unknownFn = opts.unknown), typeof opts.boolean == "boolean" && opts.boolean ? flags.allBools = !0 : [].concat(opts.boolean).filter(Boolean).forEach(function(key3) {
        flags.bools[key3] = !0;
      });
      var aliases = {};
      function aliasIsBoolean(key3) {
        return aliases[key3].some(function(x) {
          return flags.bools[x];
        });
      }
      Object.keys(opts.alias || {}).forEach(function(key3) {
        aliases[key3] = [].concat(opts.alias[key3]), aliases[key3].forEach(function(x) {
          aliases[x] = [key3].concat(aliases[key3].filter(function(y) {
            return x !== y;
          }));
        });
      }), [].concat(opts.string).filter(Boolean).forEach(function(key3) {
        flags.strings[key3] = !0, aliases[key3] && [].concat(aliases[key3]).forEach(function(k) {
          flags.strings[k] = !0;
        });
      });
      var defaults = opts.default || {}, argv = { _: [] };
      function argDefined(key3, arg2) {
        return flags.allBools && /^--[^=]+$/.test(arg2) || flags.strings[key3] || flags.bools[key3] || aliases[key3];
      }
      function setKey(obj, keys, value2) {
        for (var o = obj, i3 = 0; i3 < keys.length - 1; i3++) {
          var key3 = keys[i3];
          if (isConstructorOrProto(o, key3))
            return;
          o[key3] === void 0 && (o[key3] = {}), (o[key3] === Object.prototype || o[key3] === Number.prototype || o[key3] === String.prototype) && (o[key3] = {}), o[key3] === Array.prototype && (o[key3] = []), o = o[key3];
        }
        var lastKey = keys[keys.length - 1];
        isConstructorOrProto(o, lastKey) || ((o === Object.prototype || o === Number.prototype || o === String.prototype) && (o = {}), o === Array.prototype && (o = []), o[lastKey] === void 0 || flags.bools[lastKey] || typeof o[lastKey] == "boolean" ? o[lastKey] = value2 : Array.isArray(o[lastKey]) ? o[lastKey].push(value2) : o[lastKey] = [o[lastKey], value2]);
      }
      function setArg(key3, val, arg2) {
        if (!(arg2 && flags.unknownFn && !argDefined(key3, arg2) && flags.unknownFn(arg2) === !1)) {
          var value2 = !flags.strings[key3] && isNumber(val) ? Number(val) : val;
          setKey(argv, key3.split("."), value2), (aliases[key3] || []).forEach(function(x) {
            setKey(argv, x.split("."), value2);
          });
        }
      }
      Object.keys(flags.bools).forEach(function(key3) {
        setArg(key3, defaults[key3] === void 0 ? !1 : defaults[key3]);
      });
      var notFlags = [];
      args.indexOf("--") !== -1 && (notFlags = args.slice(args.indexOf("--") + 1), args = args.slice(0, args.indexOf("--")));
      for (var i2 = 0; i2 < args.length; i2++) {
        var arg = args[i2], key2, next;
        if (/^--.+=/.test(arg)) {
          var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
          key2 = m[1];
          var value = m[2];
          flags.bools[key2] && (value = value !== "false"), setArg(key2, value, arg);
        } else if (/^--no-.+/.test(arg))
          key2 = arg.match(/^--no-(.+)/)[1], setArg(key2, !1, arg);
        else if (/^--.+/.test(arg))
          key2 = arg.match(/^--(.+)/)[1], next = args[i2 + 1], next !== void 0 && !/^(-|--)[^-]/.test(next) && !flags.bools[key2] && !flags.allBools && (!aliases[key2] || !aliasIsBoolean(key2)) ? (setArg(key2, next, arg), i2 += 1) : /^(true|false)$/.test(next) ? (setArg(key2, next === "true", arg), i2 += 1) : setArg(key2, flags.strings[key2] ? "" : !0, arg);
        else if (/^-[^-]+/.test(arg)) {
          for (var letters = arg.slice(1, -1).split(""), broken = !1, j = 0; j < letters.length; j++) {
            if (next = arg.slice(j + 2), next === "-") {
              setArg(letters[j], next, arg);
              continue;
            }
            if (/[A-Za-z]/.test(letters[j]) && next[0] === "=") {
              setArg(letters[j], next.slice(1), arg), broken = !0;
              break;
            }
            if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
              setArg(letters[j], next, arg), broken = !0;
              break;
            }
            if (letters[j + 1] && letters[j + 1].match(/\W/)) {
              setArg(letters[j], arg.slice(j + 2), arg), broken = !0;
              break;
            } else
              setArg(letters[j], flags.strings[letters[j]] ? "" : !0, arg);
          }
          key2 = arg.slice(-1)[0], !broken && key2 !== "-" && (args[i2 + 1] && !/^(-|--)[^-]/.test(args[i2 + 1]) && !flags.bools[key2] && (!aliases[key2] || !aliasIsBoolean(key2)) ? (setArg(key2, args[i2 + 1], arg), i2 += 1) : args[i2 + 1] && /^(true|false)$/.test(args[i2 + 1]) ? (setArg(key2, args[i2 + 1] === "true", arg), i2 += 1) : setArg(key2, flags.strings[key2] ? "" : !0, arg));
        } else if ((!flags.unknownFn || flags.unknownFn(arg) !== !1) && argv._.push(flags.strings._ || !isNumber(arg) ? arg : Number(arg)), opts.stopEarly) {
          argv._.push.apply(argv._, args.slice(i2 + 1));
          break;
        }
      }
      return Object.keys(defaults).forEach(function(k) {
        hasKey(argv, k.split(".")) || (setKey(argv, k.split("."), defaults[k]), (aliases[k] || []).forEach(function(x) {
          setKey(argv, x.split("."), defaults[k]);
        }));
      }), opts["--"] ? argv["--"] = notFlags.slice() : notFlags.forEach(function(k) {
        argv._.push(k);
      }), argv;
    };
  }
});

// ../../node_modules/tsconfig-paths/lib/register.js
var require_register = __commonJS({
  "../../node_modules/tsconfig-paths/lib/register.js"(exports) {
    "use strict";
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2) for (var i2 = 0, l = from.length, ar; i2 < l; i2++)
        (ar || !(i2 in from)) && (ar || (ar = Array.prototype.slice.call(from, 0, i2)), ar[i2] = from[i2]);
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.register = void 0;
    var match_path_sync_1 = require_match_path_sync(), config_loader_1 = require_config_loader(), noOp = function() {
    };
    function getCoreModules(builtinModules) {
      builtinModules = builtinModules || [
        "assert",
        "buffer",
        "child_process",
        "cluster",
        "crypto",
        "dgram",
        "dns",
        "domain",
        "events",
        "fs",
        "http",
        "https",
        "net",
        "os",
        "path",
        "punycode",
        "querystring",
        "readline",
        "stream",
        "string_decoder",
        "tls",
        "tty",
        "url",
        "util",
        "v8",
        "vm",
        "zlib"
      ];
      for (var coreModules = {}, _i = 0, builtinModules_1 = builtinModules; _i < builtinModules_1.length; _i++) {
        var module_1 = builtinModules_1[_i];
        coreModules[module_1] = !0;
      }
      return coreModules;
    }
    function register(params) {
      var cwd, explicitParams;
      if (params)
        cwd = params.cwd, (params.baseUrl || params.paths) && (explicitParams = params);
      else {
        var minimist = require_minimist(), argv = minimist(process.argv.slice(2), {
          // eslint-disable-next-line id-denylist
          string: ["project"],
          alias: {
            project: ["P"]
          }
        });
        cwd = argv.project;
      }
      var configLoaderResult = (0, config_loader_1.configLoader)({
        cwd: cwd ?? process.cwd(),
        explicitParams
      });
      if (configLoaderResult.resultType === "failed")
        return console.warn("".concat(configLoaderResult.message, ". tsconfig-paths will be skipped")), noOp;
      var matchPath = (0, match_path_sync_1.createMatchPath)(configLoaderResult.absoluteBaseUrl, configLoaderResult.paths, configLoaderResult.mainFields, configLoaderResult.addMatchAll), Module = __require("module"), originalResolveFilename = Module._resolveFilename, coreModules = getCoreModules(Module.builtinModules);
      return Module._resolveFilename = function(request, _parent) {
        var isCoreModule = coreModules.hasOwnProperty(request);
        if (!isCoreModule) {
          var found = matchPath(request);
          if (found) {
            var modifiedArguments = __spreadArray([found], [].slice.call(arguments, 1), !0);
            return originalResolveFilename.apply(this, modifiedArguments);
          }
        }
        return originalResolveFilename.apply(this, arguments);
      }, function() {
        Module._resolveFilename = originalResolveFilename;
      };
    }
    exports.register = register;
  }
});

// ../../node_modules/tsconfig-paths/lib/index.js
var require_lib3 = __commonJS({
  "../../node_modules/tsconfig-paths/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.loadConfig = exports.register = exports.matchFromAbsolutePathsAsync = exports.createMatchPathAsync = exports.matchFromAbsolutePaths = exports.createMatchPath = void 0;
    var match_path_sync_1 = require_match_path_sync();
    Object.defineProperty(exports, "createMatchPath", { enumerable: !0, get: function() {
      return match_path_sync_1.createMatchPath;
    } });
    Object.defineProperty(exports, "matchFromAbsolutePaths", { enumerable: !0, get: function() {
      return match_path_sync_1.matchFromAbsolutePaths;
    } });
    var match_path_async_1 = require_match_path_async();
    Object.defineProperty(exports, "createMatchPathAsync", { enumerable: !0, get: function() {
      return match_path_async_1.createMatchPathAsync;
    } });
    Object.defineProperty(exports, "matchFromAbsolutePathsAsync", { enumerable: !0, get: function() {
      return match_path_async_1.matchFromAbsolutePathsAsync;
    } });
    var register_1 = require_register();
    Object.defineProperty(exports, "register", { enumerable: !0, get: function() {
      return register_1.register;
    } });
    var config_loader_1 = require_config_loader();
    Object.defineProperty(exports, "loadConfig", { enumerable: !0, get: function() {
      return config_loader_1.loadConfig;
    } });
  }
});

// ../../node_modules/acorn/dist/acorn.mjs
var acorn_exports = {};
__export(acorn_exports, {
  Node: () => Node,
  Parser: () => Parser,
  Position: () => Position,
  SourceLocation: () => SourceLocation,
  TokContext: () => TokContext,
  Token: () => Token,
  TokenType: () => TokenType,
  defaultOptions: () => defaultOptions,
  getLineInfo: () => getLineInfo,
  isIdentifierChar: () => isIdentifierChar,
  isIdentifierStart: () => isIdentifierStart,
  isNewLine: () => isNewLine,
  keywordTypes: () => keywords,
  lineBreak: () => lineBreak,
  lineBreakG: () => lineBreakG,
  nonASCIIwhitespace: () => nonASCIIwhitespace,
  parse: () => parse9,
  parseExpressionAt: () => parseExpressionAt2,
  tokContexts: () => types,
  tokTypes: () => types$1,
  tokenizer: () => tokenizer2,
  version: () => version
});
function isInAstralSet(code, set) {
  for (var pos = 65536, i2 = 0; i2 < set.length; i2 += 2) {
    if (pos += set[i2], pos > code)
      return !1;
    if (pos += set[i2 + 1], pos >= code)
      return !0;
  }
  return !1;
}
function isIdentifierStart(code, astral) {
  return code < 65 ? code === 36 : code < 91 ? !0 : code < 97 ? code === 95 : code < 123 ? !0 : code <= 65535 ? code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code)) : astral === !1 ? !1 : isInAstralSet(code, astralIdentifierStartCodes);
}
function isIdentifierChar(code, astral) {
  return code < 48 ? code === 36 : code < 58 ? !0 : code < 65 ? !1 : code < 91 ? !0 : code < 97 ? code === 95 : code < 123 ? !0 : code <= 65535 ? code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code)) : astral === !1 ? !1 : isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
}
function binop(name2, prec) {
  return new TokenType(name2, { beforeExpr: !0, binop: prec });
}
function kw(name2, options) {
  return options === void 0 && (options = {}), options.keyword = name2, keywords[name2] = new TokenType(name2, options);
}
function isNewLine(code) {
  return code === 10 || code === 13 || code === 8232 || code === 8233;
}
function nextLineBreak(code, from, end) {
  end === void 0 && (end = code.length);
  for (var i2 = from; i2 < end; i2++) {
    var next = code.charCodeAt(i2);
    if (isNewLine(next))
      return i2 < end - 1 && next === 13 && code.charCodeAt(i2 + 1) === 10 ? i2 + 2 : i2 + 1;
  }
  return -1;
}
function wordsRegexp(words) {
  return regexpCache[words] || (regexpCache[words] = new RegExp("^(?:" + words.replace(/ /g, "|") + ")$"));
}
function codePointToString(code) {
  return code <= 65535 ? String.fromCharCode(code) : (code -= 65536, String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320));
}
function getLineInfo(input, offset2) {
  for (var line = 1, cur = 0; ; ) {
    var nextBreak = nextLineBreak(input, cur, offset2);
    if (nextBreak < 0)
      return new Position(line, offset2 - cur);
    ++line, cur = nextBreak;
  }
}
function getOptions(opts) {
  var options = {};
  for (var opt in defaultOptions)
    options[opt] = opts && hasOwn(opts, opt) ? opts[opt] : defaultOptions[opt];
  if (options.ecmaVersion === "latest" ? options.ecmaVersion = 1e8 : options.ecmaVersion == null ? (!warnedAboutEcmaVersion && typeof console == "object" && console.warn && (warnedAboutEcmaVersion = !0, console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)), options.ecmaVersion = 11) : options.ecmaVersion >= 2015 && (options.ecmaVersion -= 2009), options.allowReserved == null && (options.allowReserved = options.ecmaVersion < 5), (!opts || opts.allowHashBang == null) && (options.allowHashBang = options.ecmaVersion >= 14), isArray(options.onToken)) {
    var tokens = options.onToken;
    options.onToken = function(token) {
      return tokens.push(token);
    };
  }
  return isArray(options.onComment) && (options.onComment = pushComment(options, options.onComment)), options;
}
function pushComment(options, array) {
  return function(block, text3, start2, end, startLoc, endLoc) {
    var comment = {
      type: block ? "Block" : "Line",
      value: text3,
      start: start2,
      end
    };
    options.locations && (comment.loc = new SourceLocation(this, startLoc, endLoc)), options.ranges && (comment.range = [start2, end]), array.push(comment);
  };
}
function functionFlags(async, generator) {
  return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0);
}
function isPrivateNameConflicted(privateNameMap, element) {
  var name2 = element.key.name, curr = privateNameMap[name2], next = "true";
  return element.type === "MethodDefinition" && (element.kind === "get" || element.kind === "set") && (next = (element.static ? "s" : "i") + element.kind), curr === "iget" && next === "iset" || curr === "iset" && next === "iget" || curr === "sget" && next === "sset" || curr === "sset" && next === "sget" ? (privateNameMap[name2] = "true", !1) : curr ? !0 : (privateNameMap[name2] = next, !1);
}
function checkKeyName(node2, name2) {
  var computed = node2.computed, key2 = node2.key;
  return !computed && (key2.type === "Identifier" && key2.name === name2 || key2.type === "Literal" && key2.value === name2);
}
function isLocalVariableAccess(node2) {
  return node2.type === "Identifier" || node2.type === "ParenthesizedExpression" && isLocalVariableAccess(node2.expression);
}
function isPrivateFieldAccess(node2) {
  return node2.type === "MemberExpression" && node2.property.type === "PrivateIdentifier" || node2.type === "ChainExpression" && isPrivateFieldAccess(node2.expression) || node2.type === "ParenthesizedExpression" && isPrivateFieldAccess(node2.expression);
}
function finishNodeAt(node2, type, pos, loc) {
  return node2.type = type, node2.end = pos, this.options.locations && (node2.loc.end = loc), this.options.ranges && (node2.range[1] = pos), node2;
}
function buildUnicodeData(ecmaVersion2) {
  var d = data[ecmaVersion2] = {
    binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion2] + " " + unicodeGeneralCategoryValues),
    binaryOfStrings: wordsRegexp(unicodeBinaryPropertiesOfStrings[ecmaVersion2]),
    nonBinary: {
      General_Category: wordsRegexp(unicodeGeneralCategoryValues),
      Script: wordsRegexp(unicodeScriptValues[ecmaVersion2])
    }
  };
  d.nonBinary.Script_Extensions = d.nonBinary.Script, d.nonBinary.gc = d.nonBinary.General_Category, d.nonBinary.sc = d.nonBinary.Script, d.nonBinary.scx = d.nonBinary.Script_Extensions;
}
function hasProp(obj) {
  for (var _ in obj)
    return !0;
  return !1;
}
function isRegularExpressionModifier(ch) {
  return ch === 105 || ch === 109 || ch === 115;
}
function isSyntaxCharacter(ch) {
  return ch === 36 || ch >= 40 && ch <= 43 || ch === 46 || ch === 63 || ch >= 91 && ch <= 94 || ch >= 123 && ch <= 125;
}
function isRegExpIdentifierStart(ch) {
  return isIdentifierStart(ch, !0) || ch === 36 || ch === 95;
}
function isRegExpIdentifierPart(ch) {
  return isIdentifierChar(ch, !0) || ch === 36 || ch === 95 || ch === 8204 || ch === 8205;
}
function isControlLetter(ch) {
  return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122;
}
function isValidUnicode(ch) {
  return ch >= 0 && ch <= 1114111;
}
function isCharacterClassEscape(ch) {
  return ch === 100 || ch === 68 || ch === 115 || ch === 83 || ch === 119 || ch === 87;
}
function isUnicodePropertyNameCharacter(ch) {
  return isControlLetter(ch) || ch === 95;
}
function isUnicodePropertyValueCharacter(ch) {
  return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch);
}
function isClassSetReservedDoublePunctuatorCharacter(ch) {
  return ch === 33 || ch >= 35 && ch <= 38 || ch >= 42 && ch <= 44 || ch === 46 || ch >= 58 && ch <= 64 || ch === 94 || ch === 96 || ch === 126;
}
function isClassSetSyntaxCharacter(ch) {
  return ch === 40 || ch === 41 || ch === 45 || ch === 47 || ch >= 91 && ch <= 93 || ch >= 123 && ch <= 125;
}
function isClassSetReservedPunctuator(ch) {
  return ch === 33 || ch === 35 || ch === 37 || ch === 38 || ch === 44 || ch === 45 || ch >= 58 && ch <= 62 || ch === 64 || ch === 96 || ch === 126;
}
function isDecimalDigit(ch) {
  return ch >= 48 && ch <= 57;
}
function isHexDigit(ch) {
  return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102;
}
function hexToInt(ch) {
  return ch >= 65 && ch <= 70 ? 10 + (ch - 65) : ch >= 97 && ch <= 102 ? 10 + (ch - 97) : ch - 48;
}
function isOctalDigit(ch) {
  return ch >= 48 && ch <= 55;
}
function stringToNumber(str, isLegacyOctalNumericLiteral) {
  return isLegacyOctalNumericLiteral ? parseInt(str, 8) : parseFloat(str.replace(/_/g, ""));
}
function stringToBigInt(str) {
  return typeof BigInt != "function" ? null : BigInt(str.replace(/_/g, ""));
}
function parse9(input, options) {
  return Parser.parse(input, options);
}
function parseExpressionAt2(input, pos, options) {
  return Parser.parseExpressionAt(input, pos, options);
}
function tokenizer2(input, options) {
  return Parser.tokenizer(input, options);
}
var astralIdentifierCodes, astralIdentifierStartCodes, nonASCIIidentifierChars, nonASCIIidentifierStartChars, reservedWords, ecma5AndLessKeywords, keywords$1, keywordRelationalOperator, nonASCIIidentifierStart, nonASCIIidentifier, TokenType, beforeExpr, startsExpr, keywords, types$1, lineBreak, lineBreakG, nonASCIIwhitespace, skipWhiteSpace, ref, hasOwnProperty2, toString, hasOwn, isArray, regexpCache, loneSurrogate, Position, SourceLocation, defaultOptions, warnedAboutEcmaVersion, SCOPE_TOP, SCOPE_FUNCTION, SCOPE_ASYNC, SCOPE_GENERATOR, SCOPE_ARROW, SCOPE_SIMPLE_CATCH, SCOPE_SUPER, SCOPE_DIRECT_SUPER, SCOPE_CLASS_STATIC_BLOCK, SCOPE_CLASS_FIELD_INIT, SCOPE_VAR, BIND_NONE, BIND_VAR, BIND_LEXICAL, BIND_FUNCTION, BIND_SIMPLE_CATCH, BIND_OUTSIDE, Parser, prototypeAccessors, pp$9, literal, DestructuringErrors, pp$8, loopLabel, switchLabel, empty$1, FUNC_STATEMENT, FUNC_HANGING_STATEMENT, FUNC_NULLABLE_ID, pp$7, TokContext, types, pp$6, pp$5, empty, pp$4, pp$3, Scope, Node, pp$2, scriptValuesAddedInUnicode, ecma9BinaryProperties, ecma10BinaryProperties, ecma11BinaryProperties, ecma12BinaryProperties, ecma13BinaryProperties, ecma14BinaryProperties, unicodeBinaryProperties, ecma14BinaryPropertiesOfStrings, unicodeBinaryPropertiesOfStrings, unicodeGeneralCategoryValues, ecma9ScriptValues, ecma10ScriptValues, ecma11ScriptValues, ecma12ScriptValues, ecma13ScriptValues, ecma14ScriptValues, unicodeScriptValues, data, ecmaVersion, i, list, pp$1, BranchID, RegExpValidationState, CharSetNone, CharSetOk, CharSetString, Token, pp, INVALID_TEMPLATE_ESCAPE_ERROR, version, init_acorn = __esm({
  "../../node_modules/acorn/dist/acorn.mjs"() {
    astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 343, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759, 9, 787719, 239], astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 42, 9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191], nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65", nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC", reservedWords = {
      3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
      5: "class enum extends super const export import",
      6: "enum",
      strict: "implements interface let package private protected public static yield",
      strictBind: "eval arguments"
    }, ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this", keywords$1 = {
      5: ecma5AndLessKeywords,
      "5module": ecma5AndLessKeywords + " export import",
      6: ecma5AndLessKeywords + " const class extends export import super"
    }, keywordRelationalOperator = /^in(stanceof)?$/, nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]"), nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
    TokenType = function(label, conf) {
      conf === void 0 && (conf = {}), this.label = label, this.keyword = conf.keyword, this.beforeExpr = !!conf.beforeExpr, this.startsExpr = !!conf.startsExpr, this.isLoop = !!conf.isLoop, this.isAssign = !!conf.isAssign, this.prefix = !!conf.prefix, this.postfix = !!conf.postfix, this.binop = conf.binop || null, this.updateContext = null;
    };
    beforeExpr = { beforeExpr: !0 }, startsExpr = { startsExpr: !0 }, keywords = {};
    types$1 = {
      num: new TokenType("num", startsExpr),
      regexp: new TokenType("regexp", startsExpr),
      string: new TokenType("string", startsExpr),
      name: new TokenType("name", startsExpr),
      privateId: new TokenType("privateId", startsExpr),
      eof: new TokenType("eof"),
      // Punctuation token types.
      bracketL: new TokenType("[", { beforeExpr: !0, startsExpr: !0 }),
      bracketR: new TokenType("]"),
      braceL: new TokenType("{", { beforeExpr: !0, startsExpr: !0 }),
      braceR: new TokenType("}"),
      parenL: new TokenType("(", { beforeExpr: !0, startsExpr: !0 }),
      parenR: new TokenType(")"),
      comma: new TokenType(",", beforeExpr),
      semi: new TokenType(";", beforeExpr),
      colon: new TokenType(":", beforeExpr),
      dot: new TokenType("."),
      question: new TokenType("?", beforeExpr),
      questionDot: new TokenType("?."),
      arrow: new TokenType("=>", beforeExpr),
      template: new TokenType("template"),
      invalidTemplate: new TokenType("invalidTemplate"),
      ellipsis: new TokenType("...", beforeExpr),
      backQuote: new TokenType("`", startsExpr),
      dollarBraceL: new TokenType("${", { beforeExpr: !0, startsExpr: !0 }),
      // Operators. These carry several kinds of properties to help the
      // parser use them properly (the presence of these properties is
      // what categorizes them as operators).
      //
      // `binop`, when present, specifies that this operator is a binary
      // operator, and will refer to its precedence.
      //
      // `prefix` and `postfix` mark the operator as a prefix or postfix
      // unary operator.
      //
      // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
      // binary operators with a very low precedence, that should result
      // in AssignmentExpression nodes.
      eq: new TokenType("=", { beforeExpr: !0, isAssign: !0 }),
      assign: new TokenType("_=", { beforeExpr: !0, isAssign: !0 }),
      incDec: new TokenType("++/--", { prefix: !0, postfix: !0, startsExpr: !0 }),
      prefix: new TokenType("!/~", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      logicalOR: binop("||", 1),
      logicalAND: binop("&&", 2),
      bitwiseOR: binop("|", 3),
      bitwiseXOR: binop("^", 4),
      bitwiseAND: binop("&", 5),
      equality: binop("==/!=/===/!==", 6),
      relational: binop("</>/<=/>=", 7),
      bitShift: binop("<</>>/>>>", 8),
      plusMin: new TokenType("+/-", { beforeExpr: !0, binop: 9, prefix: !0, startsExpr: !0 }),
      modulo: binop("%", 10),
      star: binop("*", 10),
      slash: binop("/", 10),
      starstar: new TokenType("**", { beforeExpr: !0 }),
      coalesce: binop("??", 1),
      // Keyword token types.
      _break: kw("break"),
      _case: kw("case", beforeExpr),
      _catch: kw("catch"),
      _continue: kw("continue"),
      _debugger: kw("debugger"),
      _default: kw("default", beforeExpr),
      _do: kw("do", { isLoop: !0, beforeExpr: !0 }),
      _else: kw("else", beforeExpr),
      _finally: kw("finally"),
      _for: kw("for", { isLoop: !0 }),
      _function: kw("function", startsExpr),
      _if: kw("if"),
      _return: kw("return", beforeExpr),
      _switch: kw("switch"),
      _throw: kw("throw", beforeExpr),
      _try: kw("try"),
      _var: kw("var"),
      _const: kw("const"),
      _while: kw("while", { isLoop: !0 }),
      _with: kw("with"),
      _new: kw("new", { beforeExpr: !0, startsExpr: !0 }),
      _this: kw("this", startsExpr),
      _super: kw("super", startsExpr),
      _class: kw("class", startsExpr),
      _extends: kw("extends", beforeExpr),
      _export: kw("export"),
      _import: kw("import", startsExpr),
      _null: kw("null", startsExpr),
      _true: kw("true", startsExpr),
      _false: kw("false", startsExpr),
      _in: kw("in", { beforeExpr: !0, binop: 7 }),
      _instanceof: kw("instanceof", { beforeExpr: !0, binop: 7 }),
      _typeof: kw("typeof", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      _void: kw("void", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      _delete: kw("delete", { beforeExpr: !0, prefix: !0, startsExpr: !0 })
    }, lineBreak = /\r\n?|\n|\u2028|\u2029/, lineBreakG = new RegExp(lineBreak.source, "g");
    nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, ref = Object.prototype, hasOwnProperty2 = ref.hasOwnProperty, toString = ref.toString, hasOwn = Object.hasOwn || (function(obj, propName) {
      return hasOwnProperty2.call(obj, propName);
    }), isArray = Array.isArray || (function(obj) {
      return toString.call(obj) === "[object Array]";
    }), regexpCache = /* @__PURE__ */ Object.create(null);
    loneSurrogate = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/, Position = function(line, col) {
      this.line = line, this.column = col;
    };
    Position.prototype.offset = function(n) {
      return new Position(this.line, this.column + n);
    };
    SourceLocation = function(p, start2, end) {
      this.start = start2, this.end = end, p.sourceFile !== null && (this.source = p.sourceFile);
    };
    defaultOptions = {
      // `ecmaVersion` indicates the ECMAScript version to parse. Must be
      // either 3, 5, 6 (or 2015), 7 (2016), 8 (2017), 9 (2018), 10
      // (2019), 11 (2020), 12 (2021), 13 (2022), 14 (2023), or `"latest"`
      // (the latest version the library supports). This influences
      // support for strict mode, the set of reserved words, and support
      // for new syntax features.
      ecmaVersion: null,
      // `sourceType` indicates the mode the code should be parsed in.
      // Can be either `"script"` or `"module"`. This influences global
      // strict mode and parsing of `import` and `export` declarations.
      sourceType: "script",
      // `onInsertedSemicolon` can be a callback that will be called when
      // a semicolon is automatically inserted. It will be passed the
      // position of the inserted semicolon as an offset, and if
      // `locations` is enabled, it is given the location as a `{line,
      // column}` object as second argument.
      onInsertedSemicolon: null,
      // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
      // trailing commas.
      onTrailingComma: null,
      // By default, reserved words are only enforced if ecmaVersion >= 5.
      // Set `allowReserved` to a boolean value to explicitly turn this on
      // an off. When this option has the value "never", reserved words
      // and keywords can also not be used as property names.
      allowReserved: null,
      // When enabled, a return at the top level is not considered an
      // error.
      allowReturnOutsideFunction: !1,
      // When enabled, import/export statements are not constrained to
      // appearing at the top of the program, and an import.meta expression
      // in a script isn't considered an error.
      allowImportExportEverywhere: !1,
      // By default, await identifiers are allowed to appear at the top-level scope only if ecmaVersion >= 2022.
      // When enabled, await identifiers are allowed to appear at the top-level scope,
      // but they are still not allowed in non-async functions.
      allowAwaitOutsideFunction: null,
      // When enabled, super identifiers are not constrained to
      // appearing in methods and do not raise an error when they appear elsewhere.
      allowSuperOutsideMethod: null,
      // When enabled, hashbang directive in the beginning of file is
      // allowed and treated as a line comment. Enabled by default when
      // `ecmaVersion` >= 2023.
      allowHashBang: !1,
      // By default, the parser will verify that private properties are
      // only used in places where they are valid and have been declared.
      // Set this to false to turn such checks off.
      checkPrivateFields: !0,
      // When `locations` is on, `loc` properties holding objects with
      // `start` and `end` properties in `{line, column}` form (with
      // line being 1-based and column 0-based) will be attached to the
      // nodes.
      locations: !1,
      // A function can be passed as `onToken` option, which will
      // cause Acorn to call that function with object in the same
      // format as tokens returned from `tokenizer().getToken()`. Note
      // that you are not allowed to call the parser from the
      // callback—that will corrupt its internal state.
      onToken: null,
      // A function can be passed as `onComment` option, which will
      // cause Acorn to call that function with `(block, text, start,
      // end)` parameters whenever a comment is skipped. `block` is a
      // boolean indicating whether this is a block (`/* */`) comment,
      // `text` is the content of the comment, and `start` and `end` are
      // character offsets that denote the start and end of the comment.
      // When the `locations` option is on, two more parameters are
      // passed, the full `{line, column}` locations of the start and
      // end of the comments. Note that you are not allowed to call the
      // parser from the callback—that will corrupt its internal state.
      // When this option has an array as value, objects representing the
      // comments are pushed to it.
      onComment: null,
      // Nodes have their start and end characters offsets recorded in
      // `start` and `end` properties (directly on the node, rather than
      // the `loc` object, which holds line/column data. To also add a
      // [semi-standardized][range] `range` property holding a `[start,
      // end]` array with the same numbers, set the `ranges` option to
      // `true`.
      //
      // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
      ranges: !1,
      // It is possible to parse multiple files into a single AST by
      // passing the tree produced by parsing the first file as
      // `program` option in subsequent parses. This will add the
      // toplevel forms of the parsed file to the `Program` (top) node
      // of an existing parse tree.
      program: null,
      // When `locations` is on, you can pass this to record the source
      // file in every node's `loc` object.
      sourceFile: null,
      // This value, if given, is stored in every node, whether
      // `locations` is on or off.
      directSourceFile: null,
      // When enabled, parenthesized expressions are represented by
      // (non-standard) ParenthesizedExpression nodes
      preserveParens: !1
    }, warnedAboutEcmaVersion = !1;
    SCOPE_TOP = 1, SCOPE_FUNCTION = 2, SCOPE_ASYNC = 4, SCOPE_GENERATOR = 8, SCOPE_ARROW = 16, SCOPE_SIMPLE_CATCH = 32, SCOPE_SUPER = 64, SCOPE_DIRECT_SUPER = 128, SCOPE_CLASS_STATIC_BLOCK = 256, SCOPE_CLASS_FIELD_INIT = 512, SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK;
    BIND_NONE = 0, BIND_VAR = 1, BIND_LEXICAL = 2, BIND_FUNCTION = 3, BIND_SIMPLE_CATCH = 4, BIND_OUTSIDE = 5, Parser = function(options, input, startPos) {
      this.options = options = getOptions(options), this.sourceFile = options.sourceFile, this.keywords = wordsRegexp(keywords$1[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
      var reserved = "";
      options.allowReserved !== !0 && (reserved = reservedWords[options.ecmaVersion >= 6 ? 6 : options.ecmaVersion === 5 ? 5 : 3], options.sourceType === "module" && (reserved += " await")), this.reservedWords = wordsRegexp(reserved);
      var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
      this.reservedWordsStrict = wordsRegexp(reservedStrict), this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind), this.input = String(input), this.containsEsc = !1, startPos ? (this.pos = startPos, this.lineStart = this.input.lastIndexOf(`
`, startPos - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = types$1.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = options.sourceType === "module", this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = !1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = /* @__PURE__ */ Object.create(null), this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!" && this.skipLineComment(2), this.scopeStack = [], this.enterScope(SCOPE_TOP), this.regexpState = null, this.privateNameStack = [];
    }, prototypeAccessors = { inFunction: { configurable: !0 }, inGenerator: { configurable: !0 }, inAsync: { configurable: !0 }, canAwait: { configurable: !0 }, allowSuper: { configurable: !0 }, allowDirectSuper: { configurable: !0 }, treatFunctionsAsVar: { configurable: !0 }, allowNewDotTarget: { configurable: !0 }, inClassStaticBlock: { configurable: !0 } };
    Parser.prototype.parse = function() {
      var node2 = this.options.program || this.startNode();
      return this.nextToken(), this.parseTopLevel(node2);
    };
    prototypeAccessors.inFunction.get = function() {
      return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0;
    };
    prototypeAccessors.inGenerator.get = function() {
      return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0;
    };
    prototypeAccessors.inAsync.get = function() {
      return (this.currentVarScope().flags & SCOPE_ASYNC) > 0;
    };
    prototypeAccessors.canAwait.get = function() {
      for (var i2 = this.scopeStack.length - 1; i2 >= 0; i2--) {
        var ref2 = this.scopeStack[i2], flags = ref2.flags;
        if (flags & (SCOPE_CLASS_STATIC_BLOCK | SCOPE_CLASS_FIELD_INIT))
          return !1;
        if (flags & SCOPE_FUNCTION)
          return (flags & SCOPE_ASYNC) > 0;
      }
      return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
    };
    prototypeAccessors.allowSuper.get = function() {
      var ref2 = this.currentThisScope(), flags = ref2.flags;
      return (flags & SCOPE_SUPER) > 0 || this.options.allowSuperOutsideMethod;
    };
    prototypeAccessors.allowDirectSuper.get = function() {
      return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0;
    };
    prototypeAccessors.treatFunctionsAsVar.get = function() {
      return this.treatFunctionsAsVarInScope(this.currentScope());
    };
    prototypeAccessors.allowNewDotTarget.get = function() {
      for (var i2 = this.scopeStack.length - 1; i2 >= 0; i2--) {
        var ref2 = this.scopeStack[i2], flags = ref2.flags;
        if (flags & (SCOPE_CLASS_STATIC_BLOCK | SCOPE_CLASS_FIELD_INIT) || flags & SCOPE_FUNCTION && !(flags & SCOPE_ARROW))
          return !0;
      }
      return !1;
    };
    prototypeAccessors.inClassStaticBlock.get = function() {
      return (this.currentVarScope().flags & SCOPE_CLASS_STATIC_BLOCK) > 0;
    };
    Parser.extend = function() {
      for (var plugins = [], len = arguments.length; len--; ) plugins[len] = arguments[len];
      for (var cls = this, i2 = 0; i2 < plugins.length; i2++)
        cls = plugins[i2](cls);
      return cls;
    };
    Parser.parse = function(input, options) {
      return new this(options, input).parse();
    };
    Parser.parseExpressionAt = function(input, pos, options) {
      var parser = new this(options, input, pos);
      return parser.nextToken(), parser.parseExpression();
    };
    Parser.tokenizer = function(input, options) {
      return new this(options, input);
    };
    Object.defineProperties(Parser.prototype, prototypeAccessors);
    pp$9 = Parser.prototype, literal = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
    pp$9.strictDirective = function(start2) {
      if (this.options.ecmaVersion < 5)
        return !1;
      for (; ; ) {
        skipWhiteSpace.lastIndex = start2, start2 += skipWhiteSpace.exec(this.input)[0].length;
        var match = literal.exec(this.input.slice(start2));
        if (!match)
          return !1;
        if ((match[1] || match[2]) === "use strict") {
          skipWhiteSpace.lastIndex = start2 + match[0].length;
          var spaceAfter = skipWhiteSpace.exec(this.input), end = spaceAfter.index + spaceAfter[0].length, next = this.input.charAt(end);
          return next === ";" || next === "}" || lineBreak.test(spaceAfter[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(next) || next === "!" && this.input.charAt(end + 1) === "=");
        }
        start2 += match[0].length, skipWhiteSpace.lastIndex = start2, start2 += skipWhiteSpace.exec(this.input)[0].length, this.input[start2] === ";" && start2++;
      }
    };
    pp$9.eat = function(type) {
      return this.type === type ? (this.next(), !0) : !1;
    };
    pp$9.isContextual = function(name2) {
      return this.type === types$1.name && this.value === name2 && !this.containsEsc;
    };
    pp$9.eatContextual = function(name2) {
      return this.isContextual(name2) ? (this.next(), !0) : !1;
    };
    pp$9.expectContextual = function(name2) {
      this.eatContextual(name2) || this.unexpected();
    };
    pp$9.canInsertSemicolon = function() {
      return this.type === types$1.eof || this.type === types$1.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
    };
    pp$9.insertSemicolon = function() {
      if (this.canInsertSemicolon())
        return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;
    };
    pp$9.semicolon = function() {
      !this.eat(types$1.semi) && !this.insertSemicolon() && this.unexpected();
    };
    pp$9.afterTrailingComma = function(tokType, notNext) {
      if (this.type === tokType)
        return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), notNext || this.next(), !0;
    };
    pp$9.expect = function(type) {
      this.eat(type) || this.unexpected();
    };
    pp$9.unexpected = function(pos) {
      this.raise(pos ?? this.start, "Unexpected token");
    };
    DestructuringErrors = function() {
      this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
    };
    pp$9.checkPatternErrors = function(refDestructuringErrors, isAssign) {
      if (refDestructuringErrors) {
        refDestructuringErrors.trailingComma > -1 && this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element");
        var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
        parens > -1 && this.raiseRecoverable(parens, isAssign ? "Assigning to rvalue" : "Parenthesized pattern");
      }
    };
    pp$9.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
      if (!refDestructuringErrors)
        return !1;
      var shorthandAssign = refDestructuringErrors.shorthandAssign, doubleProto = refDestructuringErrors.doubleProto;
      if (!andThrow)
        return shorthandAssign >= 0 || doubleProto >= 0;
      shorthandAssign >= 0 && this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns"), doubleProto >= 0 && this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property");
    };
    pp$9.checkYieldAwaitInDefaultParams = function() {
      this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");
    };
    pp$9.isSimpleAssignTarget = function(expr) {
      return expr.type === "ParenthesizedExpression" ? this.isSimpleAssignTarget(expr.expression) : expr.type === "Identifier" || expr.type === "MemberExpression";
    };
    pp$8 = Parser.prototype;
    pp$8.parseTopLevel = function(node2) {
      var exports = /* @__PURE__ */ Object.create(null);
      for (node2.body || (node2.body = []); this.type !== types$1.eof; ) {
        var stmt = this.parseStatement(null, !0, exports);
        node2.body.push(stmt);
      }
      if (this.inModule)
        for (var i2 = 0, list3 = Object.keys(this.undefinedExports); i2 < list3.length; i2 += 1) {
          var name2 = list3[i2];
          this.raiseRecoverable(this.undefinedExports[name2].start, "Export '" + name2 + "' is not defined");
        }
      return this.adaptDirectivePrologue(node2.body), this.next(), node2.sourceType = this.options.sourceType, this.finishNode(node2, "Program");
    };
    loopLabel = { kind: "loop" }, switchLabel = { kind: "switch" };
    pp$8.isLet = function(context) {
      if (this.options.ecmaVersion < 6 || !this.isContextual("let"))
        return !1;
      skipWhiteSpace.lastIndex = this.pos;
      var skip = skipWhiteSpace.exec(this.input), next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
      if (nextCh === 91 || nextCh === 92)
        return !0;
      if (context)
        return !1;
      if (nextCh === 123 || nextCh > 55295 && nextCh < 56320)
        return !0;
      if (isIdentifierStart(nextCh, !0)) {
        for (var pos = next + 1; isIdentifierChar(nextCh = this.input.charCodeAt(pos), !0); )
          ++pos;
        if (nextCh === 92 || nextCh > 55295 && nextCh < 56320)
          return !0;
        var ident = this.input.slice(next, pos);
        if (!keywordRelationalOperator.test(ident))
          return !0;
      }
      return !1;
    };
    pp$8.isAsyncFunction = function() {
      if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
        return !1;
      skipWhiteSpace.lastIndex = this.pos;
      var skip = skipWhiteSpace.exec(this.input), next = this.pos + skip[0].length, after;
      return !lineBreak.test(this.input.slice(this.pos, next)) && this.input.slice(next, next + 8) === "function" && (next + 8 === this.input.length || !(isIdentifierChar(after = this.input.charCodeAt(next + 8)) || after > 55295 && after < 56320));
    };
    pp$8.isUsingKeyword = function(isAwaitUsing, isFor) {
      if (this.options.ecmaVersion < 17 || !this.isContextual(isAwaitUsing ? "await" : "using"))
        return !1;
      skipWhiteSpace.lastIndex = this.pos;
      var skip = skipWhiteSpace.exec(this.input), next = this.pos + skip[0].length;
      if (lineBreak.test(this.input.slice(this.pos, next)))
        return !1;
      if (isAwaitUsing) {
        var awaitEndPos = next + 5, after;
        if (this.input.slice(next, awaitEndPos) !== "using" || awaitEndPos === this.input.length || isIdentifierChar(after = this.input.charCodeAt(awaitEndPos)) || after > 55295 && after < 56320)
          return !1;
        skipWhiteSpace.lastIndex = awaitEndPos;
        var skipAfterUsing = skipWhiteSpace.exec(this.input);
        if (skipAfterUsing && lineBreak.test(this.input.slice(awaitEndPos, awaitEndPos + skipAfterUsing[0].length)))
          return !1;
      }
      if (isFor) {
        var ofEndPos = next + 2, after$1;
        if (this.input.slice(next, ofEndPos) === "of" && (ofEndPos === this.input.length || !isIdentifierChar(after$1 = this.input.charCodeAt(ofEndPos)) && !(after$1 > 55295 && after$1 < 56320)))
          return !1;
      }
      var ch = this.input.charCodeAt(next);
      return isIdentifierStart(ch, !0) || ch === 92;
    };
    pp$8.isAwaitUsing = function(isFor) {
      return this.isUsingKeyword(!0, isFor);
    };
    pp$8.isUsing = function(isFor) {
      return this.isUsingKeyword(!1, isFor);
    };
    pp$8.parseStatement = function(context, topLevel, exports) {
      var starttype = this.type, node2 = this.startNode(), kind;
      switch (this.isLet(context) && (starttype = types$1._var, kind = "let"), starttype) {
        case types$1._break:
        case types$1._continue:
          return this.parseBreakContinueStatement(node2, starttype.keyword);
        case types$1._debugger:
          return this.parseDebuggerStatement(node2);
        case types$1._do:
          return this.parseDoStatement(node2);
        case types$1._for:
          return this.parseForStatement(node2);
        case types$1._function:
          return context && (this.strict || context !== "if" && context !== "label") && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(node2, !1, !context);
        case types$1._class:
          return context && this.unexpected(), this.parseClass(node2, !0);
        case types$1._if:
          return this.parseIfStatement(node2);
        case types$1._return:
          return this.parseReturnStatement(node2);
        case types$1._switch:
          return this.parseSwitchStatement(node2);
        case types$1._throw:
          return this.parseThrowStatement(node2);
        case types$1._try:
          return this.parseTryStatement(node2);
        case types$1._const:
        case types$1._var:
          return kind = kind || this.value, context && kind !== "var" && this.unexpected(), this.parseVarStatement(node2, kind);
        case types$1._while:
          return this.parseWhileStatement(node2);
        case types$1._with:
          return this.parseWithStatement(node2);
        case types$1.braceL:
          return this.parseBlock(!0, node2);
        case types$1.semi:
          return this.parseEmptyStatement(node2);
        case types$1._export:
        case types$1._import:
          if (this.options.ecmaVersion > 10 && starttype === types$1._import) {
            skipWhiteSpace.lastIndex = this.pos;
            var skip = skipWhiteSpace.exec(this.input), next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
            if (nextCh === 40 || nextCh === 46)
              return this.parseExpressionStatement(node2, this.parseExpression());
          }
          return this.options.allowImportExportEverywhere || (topLevel || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), starttype === types$1._import ? this.parseImport(node2) : this.parseExport(node2, exports);
        // If the statement does not start with a statement keyword or a
        // brace, it's an ExpressionStatement or LabeledStatement. We
        // simply start parsing an expression, and afterwards, if the
        // next token is a colon and the expression was a simple
        // Identifier node, we switch to interpreting it as a label.
        default:
          if (this.isAsyncFunction())
            return context && this.unexpected(), this.next(), this.parseFunctionStatement(node2, !0, !context);
          var usingKind = this.isAwaitUsing(!1) ? "await using" : this.isUsing(!1) ? "using" : null;
          if (usingKind)
            return topLevel && this.options.sourceType === "script" && this.raise(this.start, "Using declaration cannot appear in the top level when source type is `script`"), usingKind === "await using" && (this.canAwait || this.raise(this.start, "Await using cannot appear outside of async function"), this.next()), this.next(), this.parseVar(node2, !1, usingKind), this.semicolon(), this.finishNode(node2, "VariableDeclaration");
          var maybeName = this.value, expr = this.parseExpression();
          return starttype === types$1.name && expr.type === "Identifier" && this.eat(types$1.colon) ? this.parseLabeledStatement(node2, maybeName, expr, context) : this.parseExpressionStatement(node2, expr);
      }
    };
    pp$8.parseBreakContinueStatement = function(node2, keyword) {
      var isBreak = keyword === "break";
      this.next(), this.eat(types$1.semi) || this.insertSemicolon() ? node2.label = null : this.type !== types$1.name ? this.unexpected() : (node2.label = this.parseIdent(), this.semicolon());
      for (var i2 = 0; i2 < this.labels.length; ++i2) {
        var lab = this.labels[i2];
        if ((node2.label == null || lab.name === node2.label.name) && (lab.kind != null && (isBreak || lab.kind === "loop") || node2.label && isBreak))
          break;
      }
      return i2 === this.labels.length && this.raise(node2.start, "Unsyntactic " + keyword), this.finishNode(node2, isBreak ? "BreakStatement" : "ContinueStatement");
    };
    pp$8.parseDebuggerStatement = function(node2) {
      return this.next(), this.semicolon(), this.finishNode(node2, "DebuggerStatement");
    };
    pp$8.parseDoStatement = function(node2) {
      return this.next(), this.labels.push(loopLabel), node2.body = this.parseStatement("do"), this.labels.pop(), this.expect(types$1._while), node2.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(types$1.semi) : this.semicolon(), this.finishNode(node2, "DoWhileStatement");
    };
    pp$8.parseForStatement = function(node2) {
      this.next();
      var awaitAt = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
      if (this.labels.push(loopLabel), this.enterScope(0), this.expect(types$1.parenL), this.type === types$1.semi)
        return awaitAt > -1 && this.unexpected(awaitAt), this.parseFor(node2, null);
      var isLet = this.isLet();
      if (this.type === types$1._var || this.type === types$1._const || isLet) {
        var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
        return this.next(), this.parseVar(init$1, !0, kind), this.finishNode(init$1, "VariableDeclaration"), this.parseForAfterInit(node2, init$1, awaitAt);
      }
      var startsWithLet = this.isContextual("let"), isForOf = !1, usingKind = this.isUsing(!0) ? "using" : this.isAwaitUsing(!0) ? "await using" : null;
      if (usingKind) {
        var init$2 = this.startNode();
        return this.next(), usingKind === "await using" && this.next(), this.parseVar(init$2, !0, usingKind), this.finishNode(init$2, "VariableDeclaration"), this.parseForAfterInit(node2, init$2, awaitAt);
      }
      var containsEsc = this.containsEsc, refDestructuringErrors = new DestructuringErrors(), initPos = this.start, init = awaitAt > -1 ? this.parseExprSubscripts(refDestructuringErrors, "await") : this.parseExpression(!0, refDestructuringErrors);
      return this.type === types$1._in || (isForOf = this.options.ecmaVersion >= 6 && this.isContextual("of")) ? (awaitAt > -1 ? (this.type === types$1._in && this.unexpected(awaitAt), node2.await = !0) : isForOf && this.options.ecmaVersion >= 8 && (init.start === initPos && !containsEsc && init.type === "Identifier" && init.name === "async" ? this.unexpected() : this.options.ecmaVersion >= 9 && (node2.await = !1)), startsWithLet && isForOf && this.raise(init.start, "The left-hand side of a for-of loop may not start with 'let'."), this.toAssignable(init, !1, refDestructuringErrors), this.checkLValPattern(init), this.parseForIn(node2, init)) : (this.checkExpressionErrors(refDestructuringErrors, !0), awaitAt > -1 && this.unexpected(awaitAt), this.parseFor(node2, init));
    };
    pp$8.parseForAfterInit = function(node2, init, awaitAt) {
      return (this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init.declarations.length === 1 ? (this.options.ecmaVersion >= 9 && (this.type === types$1._in ? awaitAt > -1 && this.unexpected(awaitAt) : node2.await = awaitAt > -1), this.parseForIn(node2, init)) : (awaitAt > -1 && this.unexpected(awaitAt), this.parseFor(node2, init));
    };
    pp$8.parseFunctionStatement = function(node2, isAsync, declarationPosition) {
      return this.next(), this.parseFunction(node2, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), !1, isAsync);
    };
    pp$8.parseIfStatement = function(node2) {
      return this.next(), node2.test = this.parseParenExpression(), node2.consequent = this.parseStatement("if"), node2.alternate = this.eat(types$1._else) ? this.parseStatement("if") : null, this.finishNode(node2, "IfStatement");
    };
    pp$8.parseReturnStatement = function(node2) {
      return !this.inFunction && !this.options.allowReturnOutsideFunction && this.raise(this.start, "'return' outside of function"), this.next(), this.eat(types$1.semi) || this.insertSemicolon() ? node2.argument = null : (node2.argument = this.parseExpression(), this.semicolon()), this.finishNode(node2, "ReturnStatement");
    };
    pp$8.parseSwitchStatement = function(node2) {
      this.next(), node2.discriminant = this.parseParenExpression(), node2.cases = [], this.expect(types$1.braceL), this.labels.push(switchLabel), this.enterScope(0);
      for (var cur, sawDefault = !1; this.type !== types$1.braceR; )
        if (this.type === types$1._case || this.type === types$1._default) {
          var isCase = this.type === types$1._case;
          cur && this.finishNode(cur, "SwitchCase"), node2.cases.push(cur = this.startNode()), cur.consequent = [], this.next(), isCase ? cur.test = this.parseExpression() : (sawDefault && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), sawDefault = !0, cur.test = null), this.expect(types$1.colon);
        } else
          cur || this.unexpected(), cur.consequent.push(this.parseStatement(null));
      return this.exitScope(), cur && this.finishNode(cur, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(node2, "SwitchStatement");
    };
    pp$8.parseThrowStatement = function(node2) {
      return this.next(), lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), node2.argument = this.parseExpression(), this.semicolon(), this.finishNode(node2, "ThrowStatement");
    };
    empty$1 = [];
    pp$8.parseCatchClauseParam = function() {
      var param = this.parseBindingAtom(), simple = param.type === "Identifier";
      return this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0), this.checkLValPattern(param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL), this.expect(types$1.parenR), param;
    };
    pp$8.parseTryStatement = function(node2) {
      if (this.next(), node2.block = this.parseBlock(), node2.handler = null, this.type === types$1._catch) {
        var clause = this.startNode();
        this.next(), this.eat(types$1.parenL) ? clause.param = this.parseCatchClauseParam() : (this.options.ecmaVersion < 10 && this.unexpected(), clause.param = null, this.enterScope(0)), clause.body = this.parseBlock(!1), this.exitScope(), node2.handler = this.finishNode(clause, "CatchClause");
      }
      return node2.finalizer = this.eat(types$1._finally) ? this.parseBlock() : null, !node2.handler && !node2.finalizer && this.raise(node2.start, "Missing catch or finally clause"), this.finishNode(node2, "TryStatement");
    };
    pp$8.parseVarStatement = function(node2, kind, allowMissingInitializer) {
      return this.next(), this.parseVar(node2, !1, kind, allowMissingInitializer), this.semicolon(), this.finishNode(node2, "VariableDeclaration");
    };
    pp$8.parseWhileStatement = function(node2) {
      return this.next(), node2.test = this.parseParenExpression(), this.labels.push(loopLabel), node2.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(node2, "WhileStatement");
    };
    pp$8.parseWithStatement = function(node2) {
      return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), node2.object = this.parseParenExpression(), node2.body = this.parseStatement("with"), this.finishNode(node2, "WithStatement");
    };
    pp$8.parseEmptyStatement = function(node2) {
      return this.next(), this.finishNode(node2, "EmptyStatement");
    };
    pp$8.parseLabeledStatement = function(node2, maybeName, expr, context) {
      for (var i$1 = 0, list3 = this.labels; i$1 < list3.length; i$1 += 1) {
        var label = list3[i$1];
        label.name === maybeName && this.raise(expr.start, "Label '" + maybeName + "' is already declared");
      }
      for (var kind = this.type.isLoop ? "loop" : this.type === types$1._switch ? "switch" : null, i2 = this.labels.length - 1; i2 >= 0; i2--) {
        var label$1 = this.labels[i2];
        if (label$1.statementStart === node2.start)
          label$1.statementStart = this.start, label$1.kind = kind;
        else
          break;
      }
      return this.labels.push({ name: maybeName, kind, statementStart: this.start }), node2.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label"), this.labels.pop(), node2.label = expr, this.finishNode(node2, "LabeledStatement");
    };
    pp$8.parseExpressionStatement = function(node2, expr) {
      return node2.expression = expr, this.semicolon(), this.finishNode(node2, "ExpressionStatement");
    };
    pp$8.parseBlock = function(createNewLexicalScope, node2, exitStrict) {
      for (createNewLexicalScope === void 0 && (createNewLexicalScope = !0), node2 === void 0 && (node2 = this.startNode()), node2.body = [], this.expect(types$1.braceL), createNewLexicalScope && this.enterScope(0); this.type !== types$1.braceR; ) {
        var stmt = this.parseStatement(null);
        node2.body.push(stmt);
      }
      return exitStrict && (this.strict = !1), this.next(), createNewLexicalScope && this.exitScope(), this.finishNode(node2, "BlockStatement");
    };
    pp$8.parseFor = function(node2, init) {
      return node2.init = init, this.expect(types$1.semi), node2.test = this.type === types$1.semi ? null : this.parseExpression(), this.expect(types$1.semi), node2.update = this.type === types$1.parenR ? null : this.parseExpression(), this.expect(types$1.parenR), node2.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(node2, "ForStatement");
    };
    pp$8.parseForIn = function(node2, init) {
      var isForIn = this.type === types$1._in;
      return this.next(), init.type === "VariableDeclaration" && init.declarations[0].init != null && (!isForIn || this.options.ecmaVersion < 8 || this.strict || init.kind !== "var" || init.declarations[0].id.type !== "Identifier") && this.raise(
        init.start,
        (isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"
      ), node2.left = init, node2.right = isForIn ? this.parseExpression() : this.parseMaybeAssign(), this.expect(types$1.parenR), node2.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(node2, isForIn ? "ForInStatement" : "ForOfStatement");
    };
    pp$8.parseVar = function(node2, isFor, kind, allowMissingInitializer) {
      for (node2.declarations = [], node2.kind = kind; ; ) {
        var decl = this.startNode();
        if (this.parseVarId(decl, kind), this.eat(types$1.eq) ? decl.init = this.parseMaybeAssign(isFor) : !allowMissingInitializer && kind === "const" && !(this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) ? this.unexpected() : !allowMissingInitializer && (kind === "using" || kind === "await using") && this.options.ecmaVersion >= 17 && this.type !== types$1._in && !this.isContextual("of") ? this.raise(this.lastTokEnd, "Missing initializer in " + kind + " declaration") : !allowMissingInitializer && decl.id.type !== "Identifier" && !(isFor && (this.type === types$1._in || this.isContextual("of"))) ? this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : decl.init = null, node2.declarations.push(this.finishNode(decl, "VariableDeclarator")), !this.eat(types$1.comma))
          break;
      }
      return node2;
    };
    pp$8.parseVarId = function(decl, kind) {
      decl.id = kind === "using" || kind === "await using" ? this.parseIdent() : this.parseBindingAtom(), this.checkLValPattern(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, !1);
    };
    FUNC_STATEMENT = 1, FUNC_HANGING_STATEMENT = 2, FUNC_NULLABLE_ID = 4;
    pp$8.parseFunction = function(node2, statement, allowExpressionBody, isAsync, forInit) {
      this.initFunction(node2), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) && (this.type === types$1.star && statement & FUNC_HANGING_STATEMENT && this.unexpected(), node2.generator = this.eat(types$1.star)), this.options.ecmaVersion >= 8 && (node2.async = !!isAsync), statement & FUNC_STATEMENT && (node2.id = statement & FUNC_NULLABLE_ID && this.type !== types$1.name ? null : this.parseIdent(), node2.id && !(statement & FUNC_HANGING_STATEMENT) && this.checkLValSimple(node2.id, this.strict || node2.generator || node2.async ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION));
      var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
      return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(functionFlags(node2.async, node2.generator)), statement & FUNC_STATEMENT || (node2.id = this.type === types$1.name ? this.parseIdent() : null), this.parseFunctionParams(node2), this.parseFunctionBody(node2, allowExpressionBody, !1, forInit), this.yieldPos = oldYieldPos, this.awaitPos = oldAwaitPos, this.awaitIdentPos = oldAwaitIdentPos, this.finishNode(node2, statement & FUNC_STATEMENT ? "FunctionDeclaration" : "FunctionExpression");
    };
    pp$8.parseFunctionParams = function(node2) {
      this.expect(types$1.parenL), node2.params = this.parseBindingList(types$1.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
    };
    pp$8.parseClass = function(node2, isStatement) {
      this.next();
      var oldStrict = this.strict;
      this.strict = !0, this.parseClassId(node2, isStatement), this.parseClassSuper(node2);
      var privateNameMap = this.enterClassBody(), classBody = this.startNode(), hadConstructor = !1;
      for (classBody.body = [], this.expect(types$1.braceL); this.type !== types$1.braceR; ) {
        var element = this.parseClassElement(node2.superClass !== null);
        element && (classBody.body.push(element), element.type === "MethodDefinition" && element.kind === "constructor" ? (hadConstructor && this.raiseRecoverable(element.start, "Duplicate constructor in the same class"), hadConstructor = !0) : element.key && element.key.type === "PrivateIdentifier" && isPrivateNameConflicted(privateNameMap, element) && this.raiseRecoverable(element.key.start, "Identifier '#" + element.key.name + "' has already been declared"));
      }
      return this.strict = oldStrict, this.next(), node2.body = this.finishNode(classBody, "ClassBody"), this.exitClassBody(), this.finishNode(node2, isStatement ? "ClassDeclaration" : "ClassExpression");
    };
    pp$8.parseClassElement = function(constructorAllowsSuper) {
      if (this.eat(types$1.semi))
        return null;
      var ecmaVersion2 = this.options.ecmaVersion, node2 = this.startNode(), keyName = "", isGenerator = !1, isAsync = !1, kind = "method", isStatic = !1;
      if (this.eatContextual("static")) {
        if (ecmaVersion2 >= 13 && this.eat(types$1.braceL))
          return this.parseClassStaticBlock(node2), node2;
        this.isClassElementNameStart() || this.type === types$1.star ? isStatic = !0 : keyName = "static";
      }
      if (node2.static = isStatic, !keyName && ecmaVersion2 >= 8 && this.eatContextual("async") && ((this.isClassElementNameStart() || this.type === types$1.star) && !this.canInsertSemicolon() ? isAsync = !0 : keyName = "async"), !keyName && (ecmaVersion2 >= 9 || !isAsync) && this.eat(types$1.star) && (isGenerator = !0), !keyName && !isAsync && !isGenerator) {
        var lastValue = this.value;
        (this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? kind = lastValue : keyName = lastValue);
      }
      if (keyName ? (node2.computed = !1, node2.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), node2.key.name = keyName, this.finishNode(node2.key, "Identifier")) : this.parseClassElementName(node2), ecmaVersion2 < 13 || this.type === types$1.parenL || kind !== "method" || isGenerator || isAsync) {
        var isConstructor = !node2.static && checkKeyName(node2, "constructor"), allowsDirectSuper = isConstructor && constructorAllowsSuper;
        isConstructor && kind !== "method" && this.raise(node2.key.start, "Constructor can't have get/set modifier"), node2.kind = isConstructor ? "constructor" : kind, this.parseClassMethod(node2, isGenerator, isAsync, allowsDirectSuper);
      } else
        this.parseClassField(node2);
      return node2;
    };
    pp$8.isClassElementNameStart = function() {
      return this.type === types$1.name || this.type === types$1.privateId || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword;
    };
    pp$8.parseClassElementName = function(element) {
      this.type === types$1.privateId ? (this.value === "constructor" && this.raise(this.start, "Classes can't have an element named '#constructor'"), element.computed = !1, element.key = this.parsePrivateIdent()) : this.parsePropertyName(element);
    };
    pp$8.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
      var key2 = method.key;
      method.kind === "constructor" ? (isGenerator && this.raise(key2.start, "Constructor can't be a generator"), isAsync && this.raise(key2.start, "Constructor can't be an async method")) : method.static && checkKeyName(method, "prototype") && this.raise(key2.start, "Classes may not have a static property named prototype");
      var value = method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);
      return method.kind === "get" && value.params.length !== 0 && this.raiseRecoverable(value.start, "getter should have no params"), method.kind === "set" && value.params.length !== 1 && this.raiseRecoverable(value.start, "setter should have exactly one param"), method.kind === "set" && value.params[0].type === "RestElement" && this.raiseRecoverable(value.params[0].start, "Setter cannot use rest params"), this.finishNode(method, "MethodDefinition");
    };
    pp$8.parseClassField = function(field) {
      return checkKeyName(field, "constructor") ? this.raise(field.key.start, "Classes can't have a field named 'constructor'") : field.static && checkKeyName(field, "prototype") && this.raise(field.key.start, "Classes can't have a static field named 'prototype'"), this.eat(types$1.eq) ? (this.enterScope(SCOPE_CLASS_FIELD_INIT | SCOPE_SUPER), field.value = this.parseMaybeAssign(), this.exitScope()) : field.value = null, this.semicolon(), this.finishNode(field, "PropertyDefinition");
    };
    pp$8.parseClassStaticBlock = function(node2) {
      node2.body = [];
      var oldLabels = this.labels;
      for (this.labels = [], this.enterScope(SCOPE_CLASS_STATIC_BLOCK | SCOPE_SUPER); this.type !== types$1.braceR; ) {
        var stmt = this.parseStatement(null);
        node2.body.push(stmt);
      }
      return this.next(), this.exitScope(), this.labels = oldLabels, this.finishNode(node2, "StaticBlock");
    };
    pp$8.parseClassId = function(node2, isStatement) {
      this.type === types$1.name ? (node2.id = this.parseIdent(), isStatement && this.checkLValSimple(node2.id, BIND_LEXICAL, !1)) : (isStatement === !0 && this.unexpected(), node2.id = null);
    };
    pp$8.parseClassSuper = function(node2) {
      node2.superClass = this.eat(types$1._extends) ? this.parseExprSubscripts(null, !1) : null;
    };
    pp$8.enterClassBody = function() {
      var element = { declared: /* @__PURE__ */ Object.create(null), used: [] };
      return this.privateNameStack.push(element), element.declared;
    };
    pp$8.exitClassBody = function() {
      var ref2 = this.privateNameStack.pop(), declared = ref2.declared, used = ref2.used;
      if (this.options.checkPrivateFields)
        for (var len = this.privateNameStack.length, parent = len === 0 ? null : this.privateNameStack[len - 1], i2 = 0; i2 < used.length; ++i2) {
          var id = used[i2];
          hasOwn(declared, id.name) || (parent ? parent.used.push(id) : this.raiseRecoverable(id.start, "Private field '#" + id.name + "' must be declared in an enclosing class"));
        }
    };
    pp$8.parseExportAllDeclaration = function(node2, exports) {
      return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (node2.exported = this.parseModuleExportName(), this.checkExport(exports, node2.exported, this.lastTokStart)) : node2.exported = null), this.expectContextual("from"), this.type !== types$1.string && this.unexpected(), node2.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (node2.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(node2, "ExportAllDeclaration");
    };
    pp$8.parseExport = function(node2, exports) {
      if (this.next(), this.eat(types$1.star))
        return this.parseExportAllDeclaration(node2, exports);
      if (this.eat(types$1._default))
        return this.checkExport(exports, "default", this.lastTokStart), node2.declaration = this.parseExportDefaultDeclaration(), this.finishNode(node2, "ExportDefaultDeclaration");
      if (this.shouldParseExportStatement())
        node2.declaration = this.parseExportDeclaration(node2), node2.declaration.type === "VariableDeclaration" ? this.checkVariableExport(exports, node2.declaration.declarations) : this.checkExport(exports, node2.declaration.id, node2.declaration.id.start), node2.specifiers = [], node2.source = null, this.options.ecmaVersion >= 16 && (node2.attributes = []);
      else {
        if (node2.declaration = null, node2.specifiers = this.parseExportSpecifiers(exports), this.eatContextual("from"))
          this.type !== types$1.string && this.unexpected(), node2.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (node2.attributes = this.parseWithClause());
        else {
          for (var i2 = 0, list3 = node2.specifiers; i2 < list3.length; i2 += 1) {
            var spec = list3[i2];
            this.checkUnreserved(spec.local), this.checkLocalExport(spec.local), spec.local.type === "Literal" && this.raise(spec.local.start, "A string literal cannot be used as an exported binding without `from`.");
          }
          node2.source = null, this.options.ecmaVersion >= 16 && (node2.attributes = []);
        }
        this.semicolon();
      }
      return this.finishNode(node2, "ExportNamedDeclaration");
    };
    pp$8.parseExportDeclaration = function(node2) {
      return this.parseStatement(null);
    };
    pp$8.parseExportDefaultDeclaration = function() {
      var isAsync;
      if (this.type === types$1._function || (isAsync = this.isAsyncFunction())) {
        var fNode = this.startNode();
        return this.next(), isAsync && this.next(), this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, !1, isAsync);
      } else if (this.type === types$1._class) {
        var cNode = this.startNode();
        return this.parseClass(cNode, "nullableID");
      } else {
        var declaration = this.parseMaybeAssign();
        return this.semicolon(), declaration;
      }
    };
    pp$8.checkExport = function(exports, name2, pos) {
      exports && (typeof name2 != "string" && (name2 = name2.type === "Identifier" ? name2.name : name2.value), hasOwn(exports, name2) && this.raiseRecoverable(pos, "Duplicate export '" + name2 + "'"), exports[name2] = !0);
    };
    pp$8.checkPatternExport = function(exports, pat) {
      var type = pat.type;
      if (type === "Identifier")
        this.checkExport(exports, pat, pat.start);
      else if (type === "ObjectPattern")
        for (var i2 = 0, list3 = pat.properties; i2 < list3.length; i2 += 1) {
          var prop = list3[i2];
          this.checkPatternExport(exports, prop);
        }
      else if (type === "ArrayPattern")
        for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
          var elt = list$1[i$1];
          elt && this.checkPatternExport(exports, elt);
        }
      else type === "Property" ? this.checkPatternExport(exports, pat.value) : type === "AssignmentPattern" ? this.checkPatternExport(exports, pat.left) : type === "RestElement" && this.checkPatternExport(exports, pat.argument);
    };
    pp$8.checkVariableExport = function(exports, decls) {
      if (exports)
        for (var i2 = 0, list3 = decls; i2 < list3.length; i2 += 1) {
          var decl = list3[i2];
          this.checkPatternExport(exports, decl.id);
        }
    };
    pp$8.shouldParseExportStatement = function() {
      return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
    };
    pp$8.parseExportSpecifier = function(exports) {
      var node2 = this.startNode();
      return node2.local = this.parseModuleExportName(), node2.exported = this.eatContextual("as") ? this.parseModuleExportName() : node2.local, this.checkExport(
        exports,
        node2.exported,
        node2.exported.start
      ), this.finishNode(node2, "ExportSpecifier");
    };
    pp$8.parseExportSpecifiers = function(exports) {
      var nodes = [], first = !0;
      for (this.expect(types$1.braceL); !this.eat(types$1.braceR); ) {
        if (first)
          first = !1;
        else if (this.expect(types$1.comma), this.afterTrailingComma(types$1.braceR))
          break;
        nodes.push(this.parseExportSpecifier(exports));
      }
      return nodes;
    };
    pp$8.parseImport = function(node2) {
      return this.next(), this.type === types$1.string ? (node2.specifiers = empty$1, node2.source = this.parseExprAtom()) : (node2.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), node2.source = this.type === types$1.string ? this.parseExprAtom() : this.unexpected()), this.options.ecmaVersion >= 16 && (node2.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(node2, "ImportDeclaration");
    };
    pp$8.parseImportSpecifier = function() {
      var node2 = this.startNode();
      return node2.imported = this.parseModuleExportName(), this.eatContextual("as") ? node2.local = this.parseIdent() : (this.checkUnreserved(node2.imported), node2.local = node2.imported), this.checkLValSimple(node2.local, BIND_LEXICAL), this.finishNode(node2, "ImportSpecifier");
    };
    pp$8.parseImportDefaultSpecifier = function() {
      var node2 = this.startNode();
      return node2.local = this.parseIdent(), this.checkLValSimple(node2.local, BIND_LEXICAL), this.finishNode(node2, "ImportDefaultSpecifier");
    };
    pp$8.parseImportNamespaceSpecifier = function() {
      var node2 = this.startNode();
      return this.next(), this.expectContextual("as"), node2.local = this.parseIdent(), this.checkLValSimple(node2.local, BIND_LEXICAL), this.finishNode(node2, "ImportNamespaceSpecifier");
    };
    pp$8.parseImportSpecifiers = function() {
      var nodes = [], first = !0;
      if (this.type === types$1.name && (nodes.push(this.parseImportDefaultSpecifier()), !this.eat(types$1.comma)))
        return nodes;
      if (this.type === types$1.star)
        return nodes.push(this.parseImportNamespaceSpecifier()), nodes;
      for (this.expect(types$1.braceL); !this.eat(types$1.braceR); ) {
        if (first)
          first = !1;
        else if (this.expect(types$1.comma), this.afterTrailingComma(types$1.braceR))
          break;
        nodes.push(this.parseImportSpecifier());
      }
      return nodes;
    };
    pp$8.parseWithClause = function() {
      var nodes = [];
      if (!this.eat(types$1._with))
        return nodes;
      this.expect(types$1.braceL);
      for (var attributeKeys = {}, first = !0; !this.eat(types$1.braceR); ) {
        if (first)
          first = !1;
        else if (this.expect(types$1.comma), this.afterTrailingComma(types$1.braceR))
          break;
        var attr = this.parseImportAttribute(), keyName = attr.key.type === "Identifier" ? attr.key.name : attr.key.value;
        hasOwn(attributeKeys, keyName) && this.raiseRecoverable(attr.key.start, "Duplicate attribute key '" + keyName + "'"), attributeKeys[keyName] = !0, nodes.push(attr);
      }
      return nodes;
    };
    pp$8.parseImportAttribute = function() {
      var node2 = this.startNode();
      return node2.key = this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never"), this.expect(types$1.colon), this.type !== types$1.string && this.unexpected(), node2.value = this.parseExprAtom(), this.finishNode(node2, "ImportAttribute");
    };
    pp$8.parseModuleExportName = function() {
      if (this.options.ecmaVersion >= 13 && this.type === types$1.string) {
        var stringLiteral = this.parseLiteral(this.value);
        return loneSurrogate.test(stringLiteral.value) && this.raise(stringLiteral.start, "An export name cannot include a lone surrogate."), stringLiteral;
      }
      return this.parseIdent(!0);
    };
    pp$8.adaptDirectivePrologue = function(statements) {
      for (var i2 = 0; i2 < statements.length && this.isDirectiveCandidate(statements[i2]); ++i2)
        statements[i2].directive = statements[i2].expression.raw.slice(1, -1);
    };
    pp$8.isDirectiveCandidate = function(statement) {
      return this.options.ecmaVersion >= 5 && statement.type === "ExpressionStatement" && statement.expression.type === "Literal" && typeof statement.expression.value == "string" && // Reject parenthesized strings.
      (this.input[statement.start] === '"' || this.input[statement.start] === "'");
    };
    pp$7 = Parser.prototype;
    pp$7.toAssignable = function(node2, isBinding, refDestructuringErrors) {
      if (this.options.ecmaVersion >= 6 && node2)
        switch (node2.type) {
          case "Identifier":
            this.inAsync && node2.name === "await" && this.raise(node2.start, "Cannot use 'await' as identifier inside an async function");
            break;
          case "ObjectPattern":
          case "ArrayPattern":
          case "AssignmentPattern":
          case "RestElement":
            break;
          case "ObjectExpression":
            node2.type = "ObjectPattern", refDestructuringErrors && this.checkPatternErrors(refDestructuringErrors, !0);
            for (var i2 = 0, list3 = node2.properties; i2 < list3.length; i2 += 1) {
              var prop = list3[i2];
              this.toAssignable(prop, isBinding), prop.type === "RestElement" && (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern") && this.raise(prop.argument.start, "Unexpected token");
            }
            break;
          case "Property":
            node2.kind !== "init" && this.raise(node2.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(node2.value, isBinding);
            break;
          case "ArrayExpression":
            node2.type = "ArrayPattern", refDestructuringErrors && this.checkPatternErrors(refDestructuringErrors, !0), this.toAssignableList(node2.elements, isBinding);
            break;
          case "SpreadElement":
            node2.type = "RestElement", this.toAssignable(node2.argument, isBinding), node2.argument.type === "AssignmentPattern" && this.raise(node2.argument.start, "Rest elements cannot have a default value");
            break;
          case "AssignmentExpression":
            node2.operator !== "=" && this.raise(node2.left.end, "Only '=' operator can be used for specifying default value."), node2.type = "AssignmentPattern", delete node2.operator, this.toAssignable(node2.left, isBinding);
            break;
          case "ParenthesizedExpression":
            this.toAssignable(node2.expression, isBinding, refDestructuringErrors);
            break;
          case "ChainExpression":
            this.raiseRecoverable(node2.start, "Optional chaining cannot appear in left-hand side");
            break;
          case "MemberExpression":
            if (!isBinding)
              break;
          default:
            this.raise(node2.start, "Assigning to rvalue");
        }
      else refDestructuringErrors && this.checkPatternErrors(refDestructuringErrors, !0);
      return node2;
    };
    pp$7.toAssignableList = function(exprList, isBinding) {
      for (var end = exprList.length, i2 = 0; i2 < end; i2++) {
        var elt = exprList[i2];
        elt && this.toAssignable(elt, isBinding);
      }
      if (end) {
        var last = exprList[end - 1];
        this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier" && this.unexpected(last.argument.start);
      }
      return exprList;
    };
    pp$7.parseSpread = function(refDestructuringErrors) {
      var node2 = this.startNode();
      return this.next(), node2.argument = this.parseMaybeAssign(!1, refDestructuringErrors), this.finishNode(node2, "SpreadElement");
    };
    pp$7.parseRestBinding = function() {
      var node2 = this.startNode();
      return this.next(), this.options.ecmaVersion === 6 && this.type !== types$1.name && this.unexpected(), node2.argument = this.parseBindingAtom(), this.finishNode(node2, "RestElement");
    };
    pp$7.parseBindingAtom = function() {
      if (this.options.ecmaVersion >= 6)
        switch (this.type) {
          case types$1.bracketL:
            var node2 = this.startNode();
            return this.next(), node2.elements = this.parseBindingList(types$1.bracketR, !0, !0), this.finishNode(node2, "ArrayPattern");
          case types$1.braceL:
            return this.parseObj(!0);
        }
      return this.parseIdent();
    };
    pp$7.parseBindingList = function(close, allowEmpty, allowTrailingComma, allowModifiers) {
      for (var elts = [], first = !0; !this.eat(close); )
        if (first ? first = !1 : this.expect(types$1.comma), allowEmpty && this.type === types$1.comma)
          elts.push(null);
        else {
          if (allowTrailingComma && this.afterTrailingComma(close))
            break;
          if (this.type === types$1.ellipsis) {
            var rest = this.parseRestBinding();
            this.parseBindingListItem(rest), elts.push(rest), this.type === types$1.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.expect(close);
            break;
          } else
            elts.push(this.parseAssignableListItem(allowModifiers));
        }
      return elts;
    };
    pp$7.parseAssignableListItem = function(allowModifiers) {
      var elem = this.parseMaybeDefault(this.start, this.startLoc);
      return this.parseBindingListItem(elem), elem;
    };
    pp$7.parseBindingListItem = function(param) {
      return param;
    };
    pp$7.parseMaybeDefault = function(startPos, startLoc, left) {
      if (left = left || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(types$1.eq))
        return left;
      var node2 = this.startNodeAt(startPos, startLoc);
      return node2.left = left, node2.right = this.parseMaybeAssign(), this.finishNode(node2, "AssignmentPattern");
    };
    pp$7.checkLValSimple = function(expr, bindingType, checkClashes) {
      bindingType === void 0 && (bindingType = BIND_NONE);
      var isBind = bindingType !== BIND_NONE;
      switch (expr.type) {
        case "Identifier":
          this.strict && this.reservedWordsStrictBind.test(expr.name) && this.raiseRecoverable(expr.start, (isBind ? "Binding " : "Assigning to ") + expr.name + " in strict mode"), isBind && (bindingType === BIND_LEXICAL && expr.name === "let" && this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name"), checkClashes && (hasOwn(checkClashes, expr.name) && this.raiseRecoverable(expr.start, "Argument name clash"), checkClashes[expr.name] = !0), bindingType !== BIND_OUTSIDE && this.declareName(expr.name, bindingType, expr.start));
          break;
        case "ChainExpression":
          this.raiseRecoverable(expr.start, "Optional chaining cannot appear in left-hand side");
          break;
        case "MemberExpression":
          isBind && this.raiseRecoverable(expr.start, "Binding member expression");
          break;
        case "ParenthesizedExpression":
          return isBind && this.raiseRecoverable(expr.start, "Binding parenthesized expression"), this.checkLValSimple(expr.expression, bindingType, checkClashes);
        default:
          this.raise(expr.start, (isBind ? "Binding" : "Assigning to") + " rvalue");
      }
    };
    pp$7.checkLValPattern = function(expr, bindingType, checkClashes) {
      switch (bindingType === void 0 && (bindingType = BIND_NONE), expr.type) {
        case "ObjectPattern":
          for (var i2 = 0, list3 = expr.properties; i2 < list3.length; i2 += 1) {
            var prop = list3[i2];
            this.checkLValInnerPattern(prop, bindingType, checkClashes);
          }
          break;
        case "ArrayPattern":
          for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
            var elem = list$1[i$1];
            elem && this.checkLValInnerPattern(elem, bindingType, checkClashes);
          }
          break;
        default:
          this.checkLValSimple(expr, bindingType, checkClashes);
      }
    };
    pp$7.checkLValInnerPattern = function(expr, bindingType, checkClashes) {
      switch (bindingType === void 0 && (bindingType = BIND_NONE), expr.type) {
        case "Property":
          this.checkLValInnerPattern(expr.value, bindingType, checkClashes);
          break;
        case "AssignmentPattern":
          this.checkLValPattern(expr.left, bindingType, checkClashes);
          break;
        case "RestElement":
          this.checkLValPattern(expr.argument, bindingType, checkClashes);
          break;
        default:
          this.checkLValPattern(expr, bindingType, checkClashes);
      }
    };
    TokContext = function(token, isExpr, preserveSpace, override, generator) {
      this.token = token, this.isExpr = !!isExpr, this.preserveSpace = !!preserveSpace, this.override = override, this.generator = !!generator;
    }, types = {
      b_stat: new TokContext("{", !1),
      b_expr: new TokContext("{", !0),
      b_tmpl: new TokContext("${", !1),
      p_stat: new TokContext("(", !1),
      p_expr: new TokContext("(", !0),
      q_tmpl: new TokContext("`", !0, !0, function(p) {
        return p.tryReadTemplateToken();
      }),
      f_stat: new TokContext("function", !1),
      f_expr: new TokContext("function", !0),
      f_expr_gen: new TokContext("function", !0, !1, null, !0),
      f_gen: new TokContext("function", !1, !1, null, !0)
    }, pp$6 = Parser.prototype;
    pp$6.initialContext = function() {
      return [types.b_stat];
    };
    pp$6.curContext = function() {
      return this.context[this.context.length - 1];
    };
    pp$6.braceIsBlock = function(prevType) {
      var parent = this.curContext();
      return parent === types.f_expr || parent === types.f_stat ? !0 : prevType === types$1.colon && (parent === types.b_stat || parent === types.b_expr) ? !parent.isExpr : prevType === types$1._return || prevType === types$1.name && this.exprAllowed ? lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) : prevType === types$1._else || prevType === types$1.semi || prevType === types$1.eof || prevType === types$1.parenR || prevType === types$1.arrow ? !0 : prevType === types$1.braceL ? parent === types.b_stat : prevType === types$1._var || prevType === types$1._const || prevType === types$1.name ? !1 : !this.exprAllowed;
    };
    pp$6.inGeneratorContext = function() {
      for (var i2 = this.context.length - 1; i2 >= 1; i2--) {
        var context = this.context[i2];
        if (context.token === "function")
          return context.generator;
      }
      return !1;
    };
    pp$6.updateContext = function(prevType) {
      var update, type = this.type;
      type.keyword && prevType === types$1.dot ? this.exprAllowed = !1 : (update = type.updateContext) ? update.call(this, prevType) : this.exprAllowed = type.beforeExpr;
    };
    pp$6.overrideContext = function(tokenCtx) {
      this.curContext() !== tokenCtx && (this.context[this.context.length - 1] = tokenCtx);
    };
    types$1.parenR.updateContext = types$1.braceR.updateContext = function() {
      if (this.context.length === 1) {
        this.exprAllowed = !0;
        return;
      }
      var out = this.context.pop();
      out === types.b_stat && this.curContext().token === "function" && (out = this.context.pop()), this.exprAllowed = !out.isExpr;
    };
    types$1.braceL.updateContext = function(prevType) {
      this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr), this.exprAllowed = !0;
    };
    types$1.dollarBraceL.updateContext = function() {
      this.context.push(types.b_tmpl), this.exprAllowed = !0;
    };
    types$1.parenL.updateContext = function(prevType) {
      var statementParens = prevType === types$1._if || prevType === types$1._for || prevType === types$1._with || prevType === types$1._while;
      this.context.push(statementParens ? types.p_stat : types.p_expr), this.exprAllowed = !0;
    };
    types$1.incDec.updateContext = function() {
    };
    types$1._function.updateContext = types$1._class.updateContext = function(prevType) {
      prevType.beforeExpr && prevType !== types$1._else && !(prevType === types$1.semi && this.curContext() !== types.p_stat) && !(prevType === types$1._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) && !((prevType === types$1.colon || prevType === types$1.braceL) && this.curContext() === types.b_stat) ? this.context.push(types.f_expr) : this.context.push(types.f_stat), this.exprAllowed = !1;
    };
    types$1.colon.updateContext = function() {
      this.curContext().token === "function" && this.context.pop(), this.exprAllowed = !0;
    };
    types$1.backQuote.updateContext = function() {
      this.curContext() === types.q_tmpl ? this.context.pop() : this.context.push(types.q_tmpl), this.exprAllowed = !1;
    };
    types$1.star.updateContext = function(prevType) {
      if (prevType === types$1._function) {
        var index2 = this.context.length - 1;
        this.context[index2] === types.f_expr ? this.context[index2] = types.f_expr_gen : this.context[index2] = types.f_gen;
      }
      this.exprAllowed = !0;
    };
    types$1.name.updateContext = function(prevType) {
      var allowed = !1;
      this.options.ecmaVersion >= 6 && prevType !== types$1.dot && (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) && (allowed = !0), this.exprAllowed = allowed;
    };
    pp$5 = Parser.prototype;
    pp$5.checkPropClash = function(prop, propHash, refDestructuringErrors) {
      if (!(this.options.ecmaVersion >= 9 && prop.type === "SpreadElement") && !(this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand))) {
        var key2 = prop.key, name2;
        switch (key2.type) {
          case "Identifier":
            name2 = key2.name;
            break;
          case "Literal":
            name2 = String(key2.value);
            break;
          default:
            return;
        }
        var kind = prop.kind;
        if (this.options.ecmaVersion >= 6) {
          name2 === "__proto__" && kind === "init" && (propHash.proto && (refDestructuringErrors ? refDestructuringErrors.doubleProto < 0 && (refDestructuringErrors.doubleProto = key2.start) : this.raiseRecoverable(key2.start, "Redefinition of __proto__ property")), propHash.proto = !0);
          return;
        }
        name2 = "$" + name2;
        var other = propHash[name2];
        if (other) {
          var redefinition;
          kind === "init" ? redefinition = this.strict && other.init || other.get || other.set : redefinition = other.init || other[kind], redefinition && this.raiseRecoverable(key2.start, "Redefinition of property");
        } else
          other = propHash[name2] = {
            init: !1,
            get: !1,
            set: !1
          };
        other[kind] = !0;
      }
    };
    pp$5.parseExpression = function(forInit, refDestructuringErrors) {
      var startPos = this.start, startLoc = this.startLoc, expr = this.parseMaybeAssign(forInit, refDestructuringErrors);
      if (this.type === types$1.comma) {
        var node2 = this.startNodeAt(startPos, startLoc);
        for (node2.expressions = [expr]; this.eat(types$1.comma); )
          node2.expressions.push(this.parseMaybeAssign(forInit, refDestructuringErrors));
        return this.finishNode(node2, "SequenceExpression");
      }
      return expr;
    };
    pp$5.parseMaybeAssign = function(forInit, refDestructuringErrors, afterLeftParse) {
      if (this.isContextual("yield")) {
        if (this.inGenerator)
          return this.parseYield(forInit);
        this.exprAllowed = !1;
      }
      var ownDestructuringErrors = !1, oldParenAssign = -1, oldTrailingComma = -1, oldDoubleProto = -1;
      refDestructuringErrors ? (oldParenAssign = refDestructuringErrors.parenthesizedAssign, oldTrailingComma = refDestructuringErrors.trailingComma, oldDoubleProto = refDestructuringErrors.doubleProto, refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1) : (refDestructuringErrors = new DestructuringErrors(), ownDestructuringErrors = !0);
      var startPos = this.start, startLoc = this.startLoc;
      (this.type === types$1.parenL || this.type === types$1.name) && (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = forInit === "await");
      var left = this.parseMaybeConditional(forInit, refDestructuringErrors);
      if (afterLeftParse && (left = afterLeftParse.call(this, left, startPos, startLoc)), this.type.isAssign) {
        var node2 = this.startNodeAt(startPos, startLoc);
        return node2.operator = this.value, this.type === types$1.eq && (left = this.toAssignable(left, !1, refDestructuringErrors)), ownDestructuringErrors || (refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1), refDestructuringErrors.shorthandAssign >= left.start && (refDestructuringErrors.shorthandAssign = -1), this.type === types$1.eq ? this.checkLValPattern(left) : this.checkLValSimple(left), node2.left = left, this.next(), node2.right = this.parseMaybeAssign(forInit), oldDoubleProto > -1 && (refDestructuringErrors.doubleProto = oldDoubleProto), this.finishNode(node2, "AssignmentExpression");
      } else
        ownDestructuringErrors && this.checkExpressionErrors(refDestructuringErrors, !0);
      return oldParenAssign > -1 && (refDestructuringErrors.parenthesizedAssign = oldParenAssign), oldTrailingComma > -1 && (refDestructuringErrors.trailingComma = oldTrailingComma), left;
    };
    pp$5.parseMaybeConditional = function(forInit, refDestructuringErrors) {
      var startPos = this.start, startLoc = this.startLoc, expr = this.parseExprOps(forInit, refDestructuringErrors);
      if (this.checkExpressionErrors(refDestructuringErrors))
        return expr;
      if (this.eat(types$1.question)) {
        var node2 = this.startNodeAt(startPos, startLoc);
        return node2.test = expr, node2.consequent = this.parseMaybeAssign(), this.expect(types$1.colon), node2.alternate = this.parseMaybeAssign(forInit), this.finishNode(node2, "ConditionalExpression");
      }
      return expr;
    };
    pp$5.parseExprOps = function(forInit, refDestructuringErrors) {
      var startPos = this.start, startLoc = this.startLoc, expr = this.parseMaybeUnary(refDestructuringErrors, !1, !1, forInit);
      return this.checkExpressionErrors(refDestructuringErrors) || expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, forInit);
    };
    pp$5.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, forInit) {
      var prec = this.type.binop;
      if (prec != null && (!forInit || this.type !== types$1._in) && prec > minPrec) {
        var logical = this.type === types$1.logicalOR || this.type === types$1.logicalAND, coalesce = this.type === types$1.coalesce;
        coalesce && (prec = types$1.logicalAND.binop);
        var op = this.value;
        this.next();
        var startPos = this.start, startLoc = this.startLoc, right = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, forInit), startPos, startLoc, prec, forInit), node2 = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical || coalesce);
        return (logical && this.type === types$1.coalesce || coalesce && (this.type === types$1.logicalOR || this.type === types$1.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(node2, leftStartPos, leftStartLoc, minPrec, forInit);
      }
      return left;
    };
    pp$5.buildBinary = function(startPos, startLoc, left, right, op, logical) {
      right.type === "PrivateIdentifier" && this.raise(right.start, "Private identifier can only be left side of binary expression");
      var node2 = this.startNodeAt(startPos, startLoc);
      return node2.left = left, node2.operator = op, node2.right = right, this.finishNode(node2, logical ? "LogicalExpression" : "BinaryExpression");
    };
    pp$5.parseMaybeUnary = function(refDestructuringErrors, sawUnary, incDec, forInit) {
      var startPos = this.start, startLoc = this.startLoc, expr;
      if (this.isContextual("await") && this.canAwait)
        expr = this.parseAwait(forInit), sawUnary = !0;
      else if (this.type.prefix) {
        var node2 = this.startNode(), update = this.type === types$1.incDec;
        node2.operator = this.value, node2.prefix = !0, this.next(), node2.argument = this.parseMaybeUnary(null, !0, update, forInit), this.checkExpressionErrors(refDestructuringErrors, !0), update ? this.checkLValSimple(node2.argument) : this.strict && node2.operator === "delete" && isLocalVariableAccess(node2.argument) ? this.raiseRecoverable(node2.start, "Deleting local variable in strict mode") : node2.operator === "delete" && isPrivateFieldAccess(node2.argument) ? this.raiseRecoverable(node2.start, "Private fields can not be deleted") : sawUnary = !0, expr = this.finishNode(node2, update ? "UpdateExpression" : "UnaryExpression");
      } else if (!sawUnary && this.type === types$1.privateId)
        (forInit || this.privateNameStack.length === 0) && this.options.checkPrivateFields && this.unexpected(), expr = this.parsePrivateIdent(), this.type !== types$1._in && this.unexpected();
      else {
        if (expr = this.parseExprSubscripts(refDestructuringErrors, forInit), this.checkExpressionErrors(refDestructuringErrors))
          return expr;
        for (; this.type.postfix && !this.canInsertSemicolon(); ) {
          var node$1 = this.startNodeAt(startPos, startLoc);
          node$1.operator = this.value, node$1.prefix = !1, node$1.argument = expr, this.checkLValSimple(expr), this.next(), expr = this.finishNode(node$1, "UpdateExpression");
        }
      }
      if (!incDec && this.eat(types$1.starstar))
        if (sawUnary)
          this.unexpected(this.lastTokStart);
        else
          return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, !1, !1, forInit), "**", !1);
      else
        return expr;
    };
    pp$5.parseExprSubscripts = function(refDestructuringErrors, forInit) {
      var startPos = this.start, startLoc = this.startLoc, expr = this.parseExprAtom(refDestructuringErrors, forInit);
      if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")")
        return expr;
      var result = this.parseSubscripts(expr, startPos, startLoc, !1, forInit);
      return refDestructuringErrors && result.type === "MemberExpression" && (refDestructuringErrors.parenthesizedAssign >= result.start && (refDestructuringErrors.parenthesizedAssign = -1), refDestructuringErrors.parenthesizedBind >= result.start && (refDestructuringErrors.parenthesizedBind = -1), refDestructuringErrors.trailingComma >= result.start && (refDestructuringErrors.trailingComma = -1)), result;
    };
    pp$5.parseSubscripts = function(base, startPos, startLoc, noCalls, forInit) {
      for (var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" && this.lastTokEnd === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 && this.potentialArrowAt === base.start, optionalChained = !1; ; ) {
        var element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit);
        if (element.optional && (optionalChained = !0), element === base || element.type === "ArrowFunctionExpression") {
          if (optionalChained) {
            var chainNode = this.startNodeAt(startPos, startLoc);
            chainNode.expression = element, element = this.finishNode(chainNode, "ChainExpression");
          }
          return element;
        }
        base = element;
      }
    };
    pp$5.shouldParseAsyncArrow = function() {
      return !this.canInsertSemicolon() && this.eat(types$1.arrow);
    };
    pp$5.parseSubscriptAsyncArrow = function(startPos, startLoc, exprList, forInit) {
      return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, !0, forInit);
    };
    pp$5.parseSubscript = function(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit) {
      var optionalSupported = this.options.ecmaVersion >= 11, optional = optionalSupported && this.eat(types$1.questionDot);
      noCalls && optional && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
      var computed = this.eat(types$1.bracketL);
      if (computed || optional && this.type !== types$1.parenL && this.type !== types$1.backQuote || this.eat(types$1.dot)) {
        var node2 = this.startNodeAt(startPos, startLoc);
        node2.object = base, computed ? (node2.property = this.parseExpression(), this.expect(types$1.bracketR)) : this.type === types$1.privateId && base.type !== "Super" ? node2.property = this.parsePrivateIdent() : node2.property = this.parseIdent(this.options.allowReserved !== "never"), node2.computed = !!computed, optionalSupported && (node2.optional = optional), base = this.finishNode(node2, "MemberExpression");
      } else if (!noCalls && this.eat(types$1.parenL)) {
        var refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
        this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
        var exprList = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, !1, refDestructuringErrors);
        if (maybeAsyncArrow && !optional && this.shouldParseAsyncArrow())
          return this.checkPatternErrors(refDestructuringErrors, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = oldYieldPos, this.awaitPos = oldAwaitPos, this.awaitIdentPos = oldAwaitIdentPos, this.parseSubscriptAsyncArrow(startPos, startLoc, exprList, forInit);
        this.checkExpressionErrors(refDestructuringErrors, !0), this.yieldPos = oldYieldPos || this.yieldPos, this.awaitPos = oldAwaitPos || this.awaitPos, this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
        var node$1 = this.startNodeAt(startPos, startLoc);
        node$1.callee = base, node$1.arguments = exprList, optionalSupported && (node$1.optional = optional), base = this.finishNode(node$1, "CallExpression");
      } else if (this.type === types$1.backQuote) {
        (optional || optionalChained) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
        var node$2 = this.startNodeAt(startPos, startLoc);
        node$2.tag = base, node$2.quasi = this.parseTemplate({ isTagged: !0 }), base = this.finishNode(node$2, "TaggedTemplateExpression");
      }
      return base;
    };
    pp$5.parseExprAtom = function(refDestructuringErrors, forInit, forNew) {
      this.type === types$1.slash && this.readRegexp();
      var node2, canBeArrow = this.potentialArrowAt === this.start;
      switch (this.type) {
        case types$1._super:
          return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), node2 = this.startNode(), this.next(), this.type === types$1.parenL && !this.allowDirectSuper && this.raise(node2.start, "super() call outside constructor of a subclass"), this.type !== types$1.dot && this.type !== types$1.bracketL && this.type !== types$1.parenL && this.unexpected(), this.finishNode(node2, "Super");
        case types$1._this:
          return node2 = this.startNode(), this.next(), this.finishNode(node2, "ThisExpression");
        case types$1.name:
          var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc, id = this.parseIdent(!1);
          if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types$1._function))
            return this.overrideContext(types.f_expr), this.parseFunction(this.startNodeAt(startPos, startLoc), 0, !1, !0, forInit);
          if (canBeArrow && !this.canInsertSemicolon()) {
            if (this.eat(types$1.arrow))
              return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], !1, forInit);
            if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types$1.name && !containsEsc && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc))
              return id = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(types$1.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], !0, forInit);
          }
          return id;
        case types$1.regexp:
          var value = this.value;
          return node2 = this.parseLiteral(value.value), node2.regex = { pattern: value.pattern, flags: value.flags }, node2;
        case types$1.num:
        case types$1.string:
          return this.parseLiteral(this.value);
        case types$1._null:
        case types$1._true:
        case types$1._false:
          return node2 = this.startNode(), node2.value = this.type === types$1._null ? null : this.type === types$1._true, node2.raw = this.type.keyword, this.next(), this.finishNode(node2, "Literal");
        case types$1.parenL:
          var start2 = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow, forInit);
          return refDestructuringErrors && (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr) && (refDestructuringErrors.parenthesizedAssign = start2), refDestructuringErrors.parenthesizedBind < 0 && (refDestructuringErrors.parenthesizedBind = start2)), expr;
        case types$1.bracketL:
          return node2 = this.startNode(), this.next(), node2.elements = this.parseExprList(types$1.bracketR, !0, !0, refDestructuringErrors), this.finishNode(node2, "ArrayExpression");
        case types$1.braceL:
          return this.overrideContext(types.b_expr), this.parseObj(!1, refDestructuringErrors);
        case types$1._function:
          return node2 = this.startNode(), this.next(), this.parseFunction(node2, 0);
        case types$1._class:
          return this.parseClass(this.startNode(), !1);
        case types$1._new:
          return this.parseNew();
        case types$1.backQuote:
          return this.parseTemplate();
        case types$1._import:
          return this.options.ecmaVersion >= 11 ? this.parseExprImport(forNew) : this.unexpected();
        default:
          return this.parseExprAtomDefault();
      }
    };
    pp$5.parseExprAtomDefault = function() {
      this.unexpected();
    };
    pp$5.parseExprImport = function(forNew) {
      var node2 = this.startNode();
      if (this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import"), this.next(), this.type === types$1.parenL && !forNew)
        return this.parseDynamicImport(node2);
      if (this.type === types$1.dot) {
        var meta = this.startNodeAt(node2.start, node2.loc && node2.loc.start);
        return meta.name = "import", node2.meta = this.finishNode(meta, "Identifier"), this.parseImportMeta(node2);
      } else
        this.unexpected();
    };
    pp$5.parseDynamicImport = function(node2) {
      if (this.next(), node2.source = this.parseMaybeAssign(), this.options.ecmaVersion >= 16)
        this.eat(types$1.parenR) ? node2.options = null : (this.expect(types$1.comma), this.afterTrailingComma(types$1.parenR) ? node2.options = null : (node2.options = this.parseMaybeAssign(), this.eat(types$1.parenR) || (this.expect(types$1.comma), this.afterTrailingComma(types$1.parenR) || this.unexpected())));
      else if (!this.eat(types$1.parenR)) {
        var errorPos = this.start;
        this.eat(types$1.comma) && this.eat(types$1.parenR) ? this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()") : this.unexpected(errorPos);
      }
      return this.finishNode(node2, "ImportExpression");
    };
    pp$5.parseImportMeta = function(node2) {
      this.next();
      var containsEsc = this.containsEsc;
      return node2.property = this.parseIdent(!0), node2.property.name !== "meta" && this.raiseRecoverable(node2.property.start, "The only valid meta property for import is 'import.meta'"), containsEsc && this.raiseRecoverable(node2.start, "'import.meta' must not contain escaped characters"), this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere && this.raiseRecoverable(node2.start, "Cannot use 'import.meta' outside a module"), this.finishNode(node2, "MetaProperty");
    };
    pp$5.parseLiteral = function(value) {
      var node2 = this.startNode();
      return node2.value = value, node2.raw = this.input.slice(this.start, this.end), node2.raw.charCodeAt(node2.raw.length - 1) === 110 && (node2.bigint = node2.value != null ? node2.value.toString() : node2.raw.slice(0, -1).replace(/_/g, "")), this.next(), this.finishNode(node2, "Literal");
    };
    pp$5.parseParenExpression = function() {
      this.expect(types$1.parenL);
      var val = this.parseExpression();
      return this.expect(types$1.parenR), val;
    };
    pp$5.shouldParseArrow = function(exprList) {
      return !this.canInsertSemicolon();
    };
    pp$5.parseParenAndDistinguishExpression = function(canBeArrow, forInit) {
      var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
      if (this.options.ecmaVersion >= 6) {
        this.next();
        var innerStartPos = this.start, innerStartLoc = this.startLoc, exprList = [], first = !0, lastIsComma = !1, refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
        for (this.yieldPos = 0, this.awaitPos = 0; this.type !== types$1.parenR; )
          if (first ? first = !1 : this.expect(types$1.comma), allowTrailingComma && this.afterTrailingComma(types$1.parenR, !0)) {
            lastIsComma = !0;
            break;
          } else if (this.type === types$1.ellipsis) {
            spreadStart = this.start, exprList.push(this.parseParenItem(this.parseRestBinding())), this.type === types$1.comma && this.raiseRecoverable(
              this.start,
              "Comma is not permitted after the rest element"
            );
            break;
          } else
            exprList.push(this.parseMaybeAssign(!1, refDestructuringErrors, this.parseParenItem));
        var innerEndPos = this.lastTokEnd, innerEndLoc = this.lastTokEndLoc;
        if (this.expect(types$1.parenR), canBeArrow && this.shouldParseArrow(exprList) && this.eat(types$1.arrow))
          return this.checkPatternErrors(refDestructuringErrors, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = oldYieldPos, this.awaitPos = oldAwaitPos, this.parseParenArrowList(startPos, startLoc, exprList, forInit);
        (!exprList.length || lastIsComma) && this.unexpected(this.lastTokStart), spreadStart && this.unexpected(spreadStart), this.checkExpressionErrors(refDestructuringErrors, !0), this.yieldPos = oldYieldPos || this.yieldPos, this.awaitPos = oldAwaitPos || this.awaitPos, exprList.length > 1 ? (val = this.startNodeAt(innerStartPos, innerStartLoc), val.expressions = exprList, this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc)) : val = exprList[0];
      } else
        val = this.parseParenExpression();
      if (this.options.preserveParens) {
        var par = this.startNodeAt(startPos, startLoc);
        return par.expression = val, this.finishNode(par, "ParenthesizedExpression");
      } else
        return val;
    };
    pp$5.parseParenItem = function(item) {
      return item;
    };
    pp$5.parseParenArrowList = function(startPos, startLoc, exprList, forInit) {
      return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, !1, forInit);
    };
    empty = [];
    pp$5.parseNew = function() {
      this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
      var node2 = this.startNode();
      if (this.next(), this.options.ecmaVersion >= 6 && this.type === types$1.dot) {
        var meta = this.startNodeAt(node2.start, node2.loc && node2.loc.start);
        meta.name = "new", node2.meta = this.finishNode(meta, "Identifier"), this.next();
        var containsEsc = this.containsEsc;
        return node2.property = this.parseIdent(!0), node2.property.name !== "target" && this.raiseRecoverable(node2.property.start, "The only valid meta property for new is 'new.target'"), containsEsc && this.raiseRecoverable(node2.start, "'new.target' must not contain escaped characters"), this.allowNewDotTarget || this.raiseRecoverable(node2.start, "'new.target' can only be used in functions and class static block"), this.finishNode(node2, "MetaProperty");
      }
      var startPos = this.start, startLoc = this.startLoc;
      return node2.callee = this.parseSubscripts(this.parseExprAtom(null, !1, !0), startPos, startLoc, !0, !1), this.eat(types$1.parenL) ? node2.arguments = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, !1) : node2.arguments = empty, this.finishNode(node2, "NewExpression");
    };
    pp$5.parseTemplateElement = function(ref2) {
      var isTagged = ref2.isTagged, elem = this.startNode();
      return this.type === types$1.invalidTemplate ? (isTagged || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), elem.value = {
        raw: this.value.replace(/\r\n?/g, `
`),
        cooked: null
      }) : elem.value = {
        raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, `
`),
        cooked: this.value
      }, this.next(), elem.tail = this.type === types$1.backQuote, this.finishNode(elem, "TemplateElement");
    };
    pp$5.parseTemplate = function(ref2) {
      ref2 === void 0 && (ref2 = {});
      var isTagged = ref2.isTagged;
      isTagged === void 0 && (isTagged = !1);
      var node2 = this.startNode();
      this.next(), node2.expressions = [];
      var curElt = this.parseTemplateElement({ isTagged });
      for (node2.quasis = [curElt]; !curElt.tail; )
        this.type === types$1.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(types$1.dollarBraceL), node2.expressions.push(this.parseExpression()), this.expect(types$1.braceR), node2.quasis.push(curElt = this.parseTemplateElement({ isTagged }));
      return this.next(), this.finishNode(node2, "TemplateLiteral");
    };
    pp$5.isAsyncProp = function(prop) {
      return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" && (this.type === types$1.name || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === types$1.star) && !lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
    };
    pp$5.parseObj = function(isPattern, refDestructuringErrors) {
      var node2 = this.startNode(), first = !0, propHash = {};
      for (node2.properties = [], this.next(); !this.eat(types$1.braceR); ) {
        if (first)
          first = !1;
        else if (this.expect(types$1.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(types$1.braceR))
          break;
        var prop = this.parseProperty(isPattern, refDestructuringErrors);
        isPattern || this.checkPropClash(prop, propHash, refDestructuringErrors), node2.properties.push(prop);
      }
      return this.finishNode(node2, isPattern ? "ObjectPattern" : "ObjectExpression");
    };
    pp$5.parseProperty = function(isPattern, refDestructuringErrors) {
      var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
      if (this.options.ecmaVersion >= 9 && this.eat(types$1.ellipsis))
        return isPattern ? (prop.argument = this.parseIdent(!1), this.type === types$1.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.finishNode(prop, "RestElement")) : (prop.argument = this.parseMaybeAssign(!1, refDestructuringErrors), this.type === types$1.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0 && (refDestructuringErrors.trailingComma = this.start), this.finishNode(prop, "SpreadElement"));
      this.options.ecmaVersion >= 6 && (prop.method = !1, prop.shorthand = !1, (isPattern || refDestructuringErrors) && (startPos = this.start, startLoc = this.startLoc), isPattern || (isGenerator = this.eat(types$1.star)));
      var containsEsc = this.containsEsc;
      return this.parsePropertyName(prop), !isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop) ? (isAsync = !0, isGenerator = this.options.ecmaVersion >= 9 && this.eat(types$1.star), this.parsePropertyName(prop)) : isAsync = !1, this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc), this.finishNode(prop, "Property");
    };
    pp$5.parseGetterSetter = function(prop) {
      var kind = prop.key.name;
      this.parsePropertyName(prop), prop.value = this.parseMethod(!1), prop.kind = kind;
      var paramCount = prop.kind === "get" ? 0 : 1;
      if (prop.value.params.length !== paramCount) {
        var start2 = prop.value.start;
        prop.kind === "get" ? this.raiseRecoverable(start2, "getter should have no params") : this.raiseRecoverable(start2, "setter should have exactly one param");
      } else
        prop.kind === "set" && prop.value.params[0].type === "RestElement" && this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
    };
    pp$5.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
      (isGenerator || isAsync) && this.type === types$1.colon && this.unexpected(), this.eat(types$1.colon) ? (prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, refDestructuringErrors), prop.kind = "init") : this.options.ecmaVersion >= 6 && this.type === types$1.parenL ? (isPattern && this.unexpected(), prop.method = !0, prop.value = this.parseMethod(isGenerator, isAsync), prop.kind = "init") : !isPattern && !containsEsc && this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && this.type !== types$1.comma && this.type !== types$1.braceR && this.type !== types$1.eq ? ((isGenerator || isAsync) && this.unexpected(), this.parseGetterSetter(prop)) : this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier" ? ((isGenerator || isAsync) && this.unexpected(), this.checkUnreserved(prop.key), prop.key.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = startPos), isPattern ? prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key)) : this.type === types$1.eq && refDestructuringErrors ? (refDestructuringErrors.shorthandAssign < 0 && (refDestructuringErrors.shorthandAssign = this.start), prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key))) : prop.value = this.copyNode(prop.key), prop.kind = "init", prop.shorthand = !0) : this.unexpected();
    };
    pp$5.parsePropertyName = function(prop) {
      if (this.options.ecmaVersion >= 6) {
        if (this.eat(types$1.bracketL))
          return prop.computed = !0, prop.key = this.parseMaybeAssign(), this.expect(types$1.bracketR), prop.key;
        prop.computed = !1;
      }
      return prop.key = this.type === types$1.num || this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
    };
    pp$5.initFunction = function(node2) {
      node2.id = null, this.options.ecmaVersion >= 6 && (node2.generator = node2.expression = !1), this.options.ecmaVersion >= 8 && (node2.async = !1);
    };
    pp$5.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
      var node2 = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
      return this.initFunction(node2), this.options.ecmaVersion >= 6 && (node2.generator = isGenerator), this.options.ecmaVersion >= 8 && (node2.async = !!isAsync), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(functionFlags(isAsync, node2.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0)), this.expect(types$1.parenL), node2.params = this.parseBindingList(types$1.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(node2, !1, !0, !1), this.yieldPos = oldYieldPos, this.awaitPos = oldAwaitPos, this.awaitIdentPos = oldAwaitIdentPos, this.finishNode(node2, "FunctionExpression");
    };
    pp$5.parseArrowExpression = function(node2, params, isAsync, forInit) {
      var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
      return this.enterScope(functionFlags(isAsync, !1) | SCOPE_ARROW), this.initFunction(node2), this.options.ecmaVersion >= 8 && (node2.async = !!isAsync), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, node2.params = this.toAssignableList(params, !0), this.parseFunctionBody(node2, !0, !1, forInit), this.yieldPos = oldYieldPos, this.awaitPos = oldAwaitPos, this.awaitIdentPos = oldAwaitIdentPos, this.finishNode(node2, "ArrowFunctionExpression");
    };
    pp$5.parseFunctionBody = function(node2, isArrowFunction, isMethod, forInit) {
      var isExpression = isArrowFunction && this.type !== types$1.braceL, oldStrict = this.strict, useStrict = !1;
      if (isExpression)
        node2.body = this.parseMaybeAssign(forInit), node2.expression = !0, this.checkParams(node2, !1);
      else {
        var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node2.params);
        (!oldStrict || nonSimple) && (useStrict = this.strictDirective(this.end), useStrict && nonSimple && this.raiseRecoverable(node2.start, "Illegal 'use strict' directive in function with non-simple parameter list"));
        var oldLabels = this.labels;
        this.labels = [], useStrict && (this.strict = !0), this.checkParams(node2, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node2.params)), this.strict && node2.id && this.checkLValSimple(node2.id, BIND_OUTSIDE), node2.body = this.parseBlock(!1, void 0, useStrict && !oldStrict), node2.expression = !1, this.adaptDirectivePrologue(node2.body.body), this.labels = oldLabels;
      }
      this.exitScope();
    };
    pp$5.isSimpleParamList = function(params) {
      for (var i2 = 0, list3 = params; i2 < list3.length; i2 += 1) {
        var param = list3[i2];
        if (param.type !== "Identifier")
          return !1;
      }
      return !0;
    };
    pp$5.checkParams = function(node2, allowDuplicates) {
      for (var nameHash = /* @__PURE__ */ Object.create(null), i2 = 0, list3 = node2.params; i2 < list3.length; i2 += 1) {
        var param = list3[i2];
        this.checkLValInnerPattern(param, BIND_VAR, allowDuplicates ? null : nameHash);
      }
    };
    pp$5.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
      for (var elts = [], first = !0; !this.eat(close); ) {
        if (first)
          first = !1;
        else if (this.expect(types$1.comma), allowTrailingComma && this.afterTrailingComma(close))
          break;
        var elt = void 0;
        allowEmpty && this.type === types$1.comma ? elt = null : this.type === types$1.ellipsis ? (elt = this.parseSpread(refDestructuringErrors), refDestructuringErrors && this.type === types$1.comma && refDestructuringErrors.trailingComma < 0 && (refDestructuringErrors.trailingComma = this.start)) : elt = this.parseMaybeAssign(!1, refDestructuringErrors), elts.push(elt);
      }
      return elts;
    };
    pp$5.checkUnreserved = function(ref2) {
      var start2 = ref2.start, end = ref2.end, name2 = ref2.name;
      if (this.inGenerator && name2 === "yield" && this.raiseRecoverable(start2, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && name2 === "await" && this.raiseRecoverable(start2, "Cannot use 'await' as identifier inside an async function"), !(this.currentThisScope().flags & SCOPE_VAR) && name2 === "arguments" && this.raiseRecoverable(start2, "Cannot use 'arguments' in class field initializer"), this.inClassStaticBlock && (name2 === "arguments" || name2 === "await") && this.raise(start2, "Cannot use " + name2 + " in class static initialization block"), this.keywords.test(name2) && this.raise(start2, "Unexpected keyword '" + name2 + "'"), !(this.options.ecmaVersion < 6 && this.input.slice(start2, end).indexOf("\\") !== -1)) {
        var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
        re.test(name2) && (!this.inAsync && name2 === "await" && this.raiseRecoverable(start2, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(start2, "The keyword '" + name2 + "' is reserved"));
      }
    };
    pp$5.parseIdent = function(liberal) {
      var node2 = this.parseIdentNode();
      return this.next(!!liberal), this.finishNode(node2, "Identifier"), liberal || (this.checkUnreserved(node2), node2.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = node2.start)), node2;
    };
    pp$5.parseIdentNode = function() {
      var node2 = this.startNode();
      return this.type === types$1.name ? node2.name = this.value : this.type.keyword ? (node2.name = this.type.keyword, (node2.name === "class" || node2.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop(), this.type = types$1.name) : this.unexpected(), node2;
    };
    pp$5.parsePrivateIdent = function() {
      var node2 = this.startNode();
      return this.type === types$1.privateId ? node2.name = this.value : this.unexpected(), this.next(), this.finishNode(node2, "PrivateIdentifier"), this.options.checkPrivateFields && (this.privateNameStack.length === 0 ? this.raise(node2.start, "Private field '#" + node2.name + "' must be declared in an enclosing class") : this.privateNameStack[this.privateNameStack.length - 1].used.push(node2)), node2;
    };
    pp$5.parseYield = function(forInit) {
      this.yieldPos || (this.yieldPos = this.start);
      var node2 = this.startNode();
      return this.next(), this.type === types$1.semi || this.canInsertSemicolon() || this.type !== types$1.star && !this.type.startsExpr ? (node2.delegate = !1, node2.argument = null) : (node2.delegate = this.eat(types$1.star), node2.argument = this.parseMaybeAssign(forInit)), this.finishNode(node2, "YieldExpression");
    };
    pp$5.parseAwait = function(forInit) {
      this.awaitPos || (this.awaitPos = this.start);
      var node2 = this.startNode();
      return this.next(), node2.argument = this.parseMaybeUnary(null, !0, !1, forInit), this.finishNode(node2, "AwaitExpression");
    };
    pp$4 = Parser.prototype;
    pp$4.raise = function(pos, message) {
      var loc = getLineInfo(this.input, pos);
      message += " (" + loc.line + ":" + loc.column + ")", this.sourceFile && (message += " in " + this.sourceFile);
      var err = new SyntaxError(message);
      throw err.pos = pos, err.loc = loc, err.raisedAt = this.pos, err;
    };
    pp$4.raiseRecoverable = pp$4.raise;
    pp$4.curPosition = function() {
      if (this.options.locations)
        return new Position(this.curLine, this.pos - this.lineStart);
    };
    pp$3 = Parser.prototype, Scope = function(flags) {
      this.flags = flags, this.var = [], this.lexical = [], this.functions = [];
    };
    pp$3.enterScope = function(flags) {
      this.scopeStack.push(new Scope(flags));
    };
    pp$3.exitScope = function() {
      this.scopeStack.pop();
    };
    pp$3.treatFunctionsAsVarInScope = function(scope) {
      return scope.flags & SCOPE_FUNCTION || !this.inModule && scope.flags & SCOPE_TOP;
    };
    pp$3.declareName = function(name2, bindingType, pos) {
      var redeclared = !1;
      if (bindingType === BIND_LEXICAL) {
        var scope = this.currentScope();
        redeclared = scope.lexical.indexOf(name2) > -1 || scope.functions.indexOf(name2) > -1 || scope.var.indexOf(name2) > -1, scope.lexical.push(name2), this.inModule && scope.flags & SCOPE_TOP && delete this.undefinedExports[name2];
      } else if (bindingType === BIND_SIMPLE_CATCH) {
        var scope$1 = this.currentScope();
        scope$1.lexical.push(name2);
      } else if (bindingType === BIND_FUNCTION) {
        var scope$2 = this.currentScope();
        this.treatFunctionsAsVar ? redeclared = scope$2.lexical.indexOf(name2) > -1 : redeclared = scope$2.lexical.indexOf(name2) > -1 || scope$2.var.indexOf(name2) > -1, scope$2.functions.push(name2);
      } else
        for (var i2 = this.scopeStack.length - 1; i2 >= 0; --i2) {
          var scope$3 = this.scopeStack[i2];
          if (scope$3.lexical.indexOf(name2) > -1 && !(scope$3.flags & SCOPE_SIMPLE_CATCH && scope$3.lexical[0] === name2) || !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name2) > -1) {
            redeclared = !0;
            break;
          }
          if (scope$3.var.push(name2), this.inModule && scope$3.flags & SCOPE_TOP && delete this.undefinedExports[name2], scope$3.flags & SCOPE_VAR)
            break;
        }
      redeclared && this.raiseRecoverable(pos, "Identifier '" + name2 + "' has already been declared");
    };
    pp$3.checkLocalExport = function(id) {
      this.scopeStack[0].lexical.indexOf(id.name) === -1 && this.scopeStack[0].var.indexOf(id.name) === -1 && (this.undefinedExports[id.name] = id);
    };
    pp$3.currentScope = function() {
      return this.scopeStack[this.scopeStack.length - 1];
    };
    pp$3.currentVarScope = function() {
      for (var i2 = this.scopeStack.length - 1; ; i2--) {
        var scope = this.scopeStack[i2];
        if (scope.flags & (SCOPE_VAR | SCOPE_CLASS_FIELD_INIT | SCOPE_CLASS_STATIC_BLOCK))
          return scope;
      }
    };
    pp$3.currentThisScope = function() {
      for (var i2 = this.scopeStack.length - 1; ; i2--) {
        var scope = this.scopeStack[i2];
        if (scope.flags & (SCOPE_VAR | SCOPE_CLASS_FIELD_INIT | SCOPE_CLASS_STATIC_BLOCK) && !(scope.flags & SCOPE_ARROW))
          return scope;
      }
    };
    Node = function(parser, pos, loc) {
      this.type = "", this.start = pos, this.end = 0, parser.options.locations && (this.loc = new SourceLocation(parser, loc)), parser.options.directSourceFile && (this.sourceFile = parser.options.directSourceFile), parser.options.ranges && (this.range = [pos, 0]);
    }, pp$2 = Parser.prototype;
    pp$2.startNode = function() {
      return new Node(this, this.start, this.startLoc);
    };
    pp$2.startNodeAt = function(pos, loc) {
      return new Node(this, pos, loc);
    };
    pp$2.finishNode = function(node2, type) {
      return finishNodeAt.call(this, node2, type, this.lastTokEnd, this.lastTokEndLoc);
    };
    pp$2.finishNodeAt = function(node2, type, pos, loc) {
      return finishNodeAt.call(this, node2, type, pos, loc);
    };
    pp$2.copyNode = function(node2) {
      var newNode = new Node(this, node2.start, this.startLoc);
      for (var prop in node2)
        newNode[prop] = node2[prop];
      return newNode;
    };
    scriptValuesAddedInUnicode = "Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sunu Sunuwar Todhri Todr Tulu_Tigalari Tutg Unknown Zzzz", ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS", ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic", ecma11BinaryProperties = ecma10BinaryProperties, ecma12BinaryProperties = ecma11BinaryProperties + " EBase EComp EMod EPres ExtPict", ecma13BinaryProperties = ecma12BinaryProperties, ecma14BinaryProperties = ecma13BinaryProperties, unicodeBinaryProperties = {
      9: ecma9BinaryProperties,
      10: ecma10BinaryProperties,
      11: ecma11BinaryProperties,
      12: ecma12BinaryProperties,
      13: ecma13BinaryProperties,
      14: ecma14BinaryProperties
    }, ecma14BinaryPropertiesOfStrings = "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji", unicodeBinaryPropertiesOfStrings = {
      9: "",
      10: "",
      11: "",
      12: "",
      13: "",
      14: ecma14BinaryPropertiesOfStrings
    }, unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu", ecma9ScriptValues = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb", ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd", ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho", ecma12ScriptValues = ecma11ScriptValues + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi", ecma13ScriptValues = ecma12ScriptValues + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith", ecma14ScriptValues = ecma13ScriptValues + " " + scriptValuesAddedInUnicode, unicodeScriptValues = {
      9: ecma9ScriptValues,
      10: ecma10ScriptValues,
      11: ecma11ScriptValues,
      12: ecma12ScriptValues,
      13: ecma13ScriptValues,
      14: ecma14ScriptValues
    }, data = {};
    for (i = 0, list = [9, 10, 11, 12, 13, 14]; i < list.length; i += 1)
      ecmaVersion = list[i], buildUnicodeData(ecmaVersion);
    pp$1 = Parser.prototype, BranchID = function(parent, base) {
      this.parent = parent, this.base = base || this;
    };
    BranchID.prototype.separatedFrom = function(alt) {
      for (var self2 = this; self2; self2 = self2.parent)
        for (var other = alt; other; other = other.parent)
          if (self2.base === other.base && self2 !== other)
            return !0;
      return !1;
    };
    BranchID.prototype.sibling = function() {
      return new BranchID(this.parent, this.base);
    };
    RegExpValidationState = function(parser) {
      this.parser = parser, this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "") + (parser.options.ecmaVersion >= 13 ? "d" : "") + (parser.options.ecmaVersion >= 15 ? "v" : ""), this.unicodeProperties = data[parser.options.ecmaVersion >= 14 ? 14 : parser.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = !1, this.switchV = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = /* @__PURE__ */ Object.create(null), this.backReferenceNames = [], this.branchID = null;
    };
    RegExpValidationState.prototype.reset = function(start2, pattern, flags) {
      var unicodeSets = flags.indexOf("v") !== -1, unicode = flags.indexOf("u") !== -1;
      this.start = start2 | 0, this.source = pattern + "", this.flags = flags, unicodeSets && this.parser.options.ecmaVersion >= 15 ? (this.switchU = !0, this.switchV = !0, this.switchN = !0) : (this.switchU = unicode && this.parser.options.ecmaVersion >= 6, this.switchV = !1, this.switchN = unicode && this.parser.options.ecmaVersion >= 9);
    };
    RegExpValidationState.prototype.raise = function(message) {
      this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + message);
    };
    RegExpValidationState.prototype.at = function(i2, forceU) {
      forceU === void 0 && (forceU = !1);
      var s = this.source, l = s.length;
      if (i2 >= l)
        return -1;
      var c = s.charCodeAt(i2);
      if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i2 + 1 >= l)
        return c;
      var next = s.charCodeAt(i2 + 1);
      return next >= 56320 && next <= 57343 ? (c << 10) + next - 56613888 : c;
    };
    RegExpValidationState.prototype.nextIndex = function(i2, forceU) {
      forceU === void 0 && (forceU = !1);
      var s = this.source, l = s.length;
      if (i2 >= l)
        return l;
      var c = s.charCodeAt(i2), next;
      return !(forceU || this.switchU) || c <= 55295 || c >= 57344 || i2 + 1 >= l || (next = s.charCodeAt(i2 + 1)) < 56320 || next > 57343 ? i2 + 1 : i2 + 2;
    };
    RegExpValidationState.prototype.current = function(forceU) {
      return forceU === void 0 && (forceU = !1), this.at(this.pos, forceU);
    };
    RegExpValidationState.prototype.lookahead = function(forceU) {
      return forceU === void 0 && (forceU = !1), this.at(this.nextIndex(this.pos, forceU), forceU);
    };
    RegExpValidationState.prototype.advance = function(forceU) {
      forceU === void 0 && (forceU = !1), this.pos = this.nextIndex(this.pos, forceU);
    };
    RegExpValidationState.prototype.eat = function(ch, forceU) {
      return forceU === void 0 && (forceU = !1), this.current(forceU) === ch ? (this.advance(forceU), !0) : !1;
    };
    RegExpValidationState.prototype.eatChars = function(chs, forceU) {
      forceU === void 0 && (forceU = !1);
      for (var pos = this.pos, i2 = 0, list3 = chs; i2 < list3.length; i2 += 1) {
        var ch = list3[i2], current2 = this.at(pos, forceU);
        if (current2 === -1 || current2 !== ch)
          return !1;
        pos = this.nextIndex(pos, forceU);
      }
      return this.pos = pos, !0;
    };
    pp$1.validateRegExpFlags = function(state) {
      for (var validFlags = state.validFlags, flags = state.flags, u = !1, v = !1, i2 = 0; i2 < flags.length; i2++) {
        var flag = flags.charAt(i2);
        validFlags.indexOf(flag) === -1 && this.raise(state.start, "Invalid regular expression flag"), flags.indexOf(flag, i2 + 1) > -1 && this.raise(state.start, "Duplicate regular expression flag"), flag === "u" && (u = !0), flag === "v" && (v = !0);
      }
      this.options.ecmaVersion >= 15 && u && v && this.raise(state.start, "Invalid regular expression flag");
    };
    pp$1.validateRegExpPattern = function(state) {
      this.regexp_pattern(state), !state.switchN && this.options.ecmaVersion >= 9 && hasProp(state.groupNames) && (state.switchN = !0, this.regexp_pattern(state));
    };
    pp$1.regexp_pattern = function(state) {
      state.pos = 0, state.lastIntValue = 0, state.lastStringValue = "", state.lastAssertionIsQuantifiable = !1, state.numCapturingParens = 0, state.maxBackReference = 0, state.groupNames = /* @__PURE__ */ Object.create(null), state.backReferenceNames.length = 0, state.branchID = null, this.regexp_disjunction(state), state.pos !== state.source.length && (state.eat(
        41
        /* ) */
      ) && state.raise("Unmatched ')'"), (state.eat(
        93
        /* ] */
      ) || state.eat(
        125
        /* } */
      )) && state.raise("Lone quantifier brackets")), state.maxBackReference > state.numCapturingParens && state.raise("Invalid escape");
      for (var i2 = 0, list3 = state.backReferenceNames; i2 < list3.length; i2 += 1) {
        var name2 = list3[i2];
        state.groupNames[name2] || state.raise("Invalid named capture referenced");
      }
    };
    pp$1.regexp_disjunction = function(state) {
      var trackDisjunction = this.options.ecmaVersion >= 16;
      for (trackDisjunction && (state.branchID = new BranchID(state.branchID, null)), this.regexp_alternative(state); state.eat(
        124
        /* | */
      ); )
        trackDisjunction && (state.branchID = state.branchID.sibling()), this.regexp_alternative(state);
      trackDisjunction && (state.branchID = state.branchID.parent), this.regexp_eatQuantifier(state, !0) && state.raise("Nothing to repeat"), state.eat(
        123
        /* { */
      ) && state.raise("Lone quantifier brackets");
    };
    pp$1.regexp_alternative = function(state) {
      for (; state.pos < state.source.length && this.regexp_eatTerm(state); )
        ;
    };
    pp$1.regexp_eatTerm = function(state) {
      return this.regexp_eatAssertion(state) ? (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state) && state.switchU && state.raise("Invalid quantifier"), !0) : (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) ? (this.regexp_eatQuantifier(state), !0) : !1;
    };
    pp$1.regexp_eatAssertion = function(state) {
      var start2 = state.pos;
      if (state.lastAssertionIsQuantifiable = !1, state.eat(
        94
        /* ^ */
      ) || state.eat(
        36
        /* $ */
      ))
        return !0;
      if (state.eat(
        92
        /* \ */
      )) {
        if (state.eat(
          66
          /* B */
        ) || state.eat(
          98
          /* b */
        ))
          return !0;
        state.pos = start2;
      }
      if (state.eat(
        40
        /* ( */
      ) && state.eat(
        63
        /* ? */
      )) {
        var lookbehind = !1;
        if (this.options.ecmaVersion >= 9 && (lookbehind = state.eat(
          60
          /* < */
        )), state.eat(
          61
          /* = */
        ) || state.eat(
          33
          /* ! */
        ))
          return this.regexp_disjunction(state), state.eat(
            41
            /* ) */
          ) || state.raise("Unterminated group"), state.lastAssertionIsQuantifiable = !lookbehind, !0;
      }
      return state.pos = start2, !1;
    };
    pp$1.regexp_eatQuantifier = function(state, noError) {
      return noError === void 0 && (noError = !1), this.regexp_eatQuantifierPrefix(state, noError) ? (state.eat(
        63
        /* ? */
      ), !0) : !1;
    };
    pp$1.regexp_eatQuantifierPrefix = function(state, noError) {
      return state.eat(
        42
        /* * */
      ) || state.eat(
        43
        /* + */
      ) || state.eat(
        63
        /* ? */
      ) || this.regexp_eatBracedQuantifier(state, noError);
    };
    pp$1.regexp_eatBracedQuantifier = function(state, noError) {
      var start2 = state.pos;
      if (state.eat(
        123
        /* { */
      )) {
        var min = 0, max = -1;
        if (this.regexp_eatDecimalDigits(state) && (min = state.lastIntValue, state.eat(
          44
          /* , */
        ) && this.regexp_eatDecimalDigits(state) && (max = state.lastIntValue), state.eat(
          125
          /* } */
        )))
          return max !== -1 && max < min && !noError && state.raise("numbers out of order in {} quantifier"), !0;
        state.switchU && !noError && state.raise("Incomplete quantifier"), state.pos = start2;
      }
      return !1;
    };
    pp$1.regexp_eatAtom = function(state) {
      return this.regexp_eatPatternCharacters(state) || state.eat(
        46
        /* . */
      ) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state);
    };
    pp$1.regexp_eatReverseSolidusAtomEscape = function(state) {
      var start2 = state.pos;
      if (state.eat(
        92
        /* \ */
      )) {
        if (this.regexp_eatAtomEscape(state))
          return !0;
        state.pos = start2;
      }
      return !1;
    };
    pp$1.regexp_eatUncapturingGroup = function(state) {
      var start2 = state.pos;
      if (state.eat(
        40
        /* ( */
      )) {
        if (state.eat(
          63
          /* ? */
        )) {
          if (this.options.ecmaVersion >= 16) {
            var addModifiers = this.regexp_eatModifiers(state), hasHyphen = state.eat(
              45
              /* - */
            );
            if (addModifiers || hasHyphen) {
              for (var i2 = 0; i2 < addModifiers.length; i2++) {
                var modifier = addModifiers.charAt(i2);
                addModifiers.indexOf(modifier, i2 + 1) > -1 && state.raise("Duplicate regular expression modifiers");
              }
              if (hasHyphen) {
                var removeModifiers = this.regexp_eatModifiers(state);
                !addModifiers && !removeModifiers && state.current() === 58 && state.raise("Invalid regular expression modifiers");
                for (var i$1 = 0; i$1 < removeModifiers.length; i$1++) {
                  var modifier$1 = removeModifiers.charAt(i$1);
                  (removeModifiers.indexOf(modifier$1, i$1 + 1) > -1 || addModifiers.indexOf(modifier$1) > -1) && state.raise("Duplicate regular expression modifiers");
                }
              }
            }
          }
          if (state.eat(
            58
            /* : */
          )) {
            if (this.regexp_disjunction(state), state.eat(
              41
              /* ) */
            ))
              return !0;
            state.raise("Unterminated group");
          }
        }
        state.pos = start2;
      }
      return !1;
    };
    pp$1.regexp_eatCapturingGroup = function(state) {
      if (state.eat(
        40
        /* ( */
      )) {
        if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(state) : state.current() === 63 && state.raise("Invalid group"), this.regexp_disjunction(state), state.eat(
          41
          /* ) */
        ))
          return state.numCapturingParens += 1, !0;
        state.raise("Unterminated group");
      }
      return !1;
    };
    pp$1.regexp_eatModifiers = function(state) {
      for (var modifiers = "", ch = 0; (ch = state.current()) !== -1 && isRegularExpressionModifier(ch); )
        modifiers += codePointToString(ch), state.advance();
      return modifiers;
    };
    pp$1.regexp_eatExtendedAtom = function(state) {
      return state.eat(
        46
        /* . */
      ) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state) || this.regexp_eatInvalidBracedQuantifier(state) || this.regexp_eatExtendedPatternCharacter(state);
    };
    pp$1.regexp_eatInvalidBracedQuantifier = function(state) {
      return this.regexp_eatBracedQuantifier(state, !0) && state.raise("Nothing to repeat"), !1;
    };
    pp$1.regexp_eatSyntaxCharacter = function(state) {
      var ch = state.current();
      return isSyntaxCharacter(ch) ? (state.lastIntValue = ch, state.advance(), !0) : !1;
    };
    pp$1.regexp_eatPatternCharacters = function(state) {
      for (var start2 = state.pos, ch = 0; (ch = state.current()) !== -1 && !isSyntaxCharacter(ch); )
        state.advance();
      return state.pos !== start2;
    };
    pp$1.regexp_eatExtendedPatternCharacter = function(state) {
      var ch = state.current();
      return ch !== -1 && ch !== 36 && !(ch >= 40 && ch <= 43) && ch !== 46 && ch !== 63 && ch !== 91 && ch !== 94 && ch !== 124 ? (state.advance(), !0) : !1;
    };
    pp$1.regexp_groupSpecifier = function(state) {
      if (state.eat(
        63
        /* ? */
      )) {
        this.regexp_eatGroupName(state) || state.raise("Invalid group");
        var trackDisjunction = this.options.ecmaVersion >= 16, known = state.groupNames[state.lastStringValue];
        if (known)
          if (trackDisjunction)
            for (var i2 = 0, list3 = known; i2 < list3.length; i2 += 1) {
              var altID = list3[i2];
              altID.separatedFrom(state.branchID) || state.raise("Duplicate capture group name");
            }
          else
            state.raise("Duplicate capture group name");
        trackDisjunction ? (known || (state.groupNames[state.lastStringValue] = [])).push(state.branchID) : state.groupNames[state.lastStringValue] = !0;
      }
    };
    pp$1.regexp_eatGroupName = function(state) {
      if (state.lastStringValue = "", state.eat(
        60
        /* < */
      )) {
        if (this.regexp_eatRegExpIdentifierName(state) && state.eat(
          62
          /* > */
        ))
          return !0;
        state.raise("Invalid capture group name");
      }
      return !1;
    };
    pp$1.regexp_eatRegExpIdentifierName = function(state) {
      if (state.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(state)) {
        for (state.lastStringValue += codePointToString(state.lastIntValue); this.regexp_eatRegExpIdentifierPart(state); )
          state.lastStringValue += codePointToString(state.lastIntValue);
        return !0;
      }
      return !1;
    };
    pp$1.regexp_eatRegExpIdentifierStart = function(state) {
      var start2 = state.pos, forceU = this.options.ecmaVersion >= 11, ch = state.current(forceU);
      return state.advance(forceU), ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU) && (ch = state.lastIntValue), isRegExpIdentifierStart(ch) ? (state.lastIntValue = ch, !0) : (state.pos = start2, !1);
    };
    pp$1.regexp_eatRegExpIdentifierPart = function(state) {
      var start2 = state.pos, forceU = this.options.ecmaVersion >= 11, ch = state.current(forceU);
      return state.advance(forceU), ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU) && (ch = state.lastIntValue), isRegExpIdentifierPart(ch) ? (state.lastIntValue = ch, !0) : (state.pos = start2, !1);
    };
    pp$1.regexp_eatAtomEscape = function(state) {
      return this.regexp_eatBackReference(state) || this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state) || state.switchN && this.regexp_eatKGroupName(state) ? !0 : (state.switchU && (state.current() === 99 && state.raise("Invalid unicode escape"), state.raise("Invalid escape")), !1);
    };
    pp$1.regexp_eatBackReference = function(state) {
      var start2 = state.pos;
      if (this.regexp_eatDecimalEscape(state)) {
        var n = state.lastIntValue;
        if (state.switchU)
          return n > state.maxBackReference && (state.maxBackReference = n), !0;
        if (n <= state.numCapturingParens)
          return !0;
        state.pos = start2;
      }
      return !1;
    };
    pp$1.regexp_eatKGroupName = function(state) {
      if (state.eat(
        107
        /* k */
      )) {
        if (this.regexp_eatGroupName(state))
          return state.backReferenceNames.push(state.lastStringValue), !0;
        state.raise("Invalid named reference");
      }
      return !1;
    };
    pp$1.regexp_eatCharacterEscape = function(state) {
      return this.regexp_eatControlEscape(state) || this.regexp_eatCControlLetter(state) || this.regexp_eatZero(state) || this.regexp_eatHexEscapeSequence(state) || this.regexp_eatRegExpUnicodeEscapeSequence(state, !1) || !state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state) || this.regexp_eatIdentityEscape(state);
    };
    pp$1.regexp_eatCControlLetter = function(state) {
      var start2 = state.pos;
      if (state.eat(
        99
        /* c */
      )) {
        if (this.regexp_eatControlLetter(state))
          return !0;
        state.pos = start2;
      }
      return !1;
    };
    pp$1.regexp_eatZero = function(state) {
      return state.current() === 48 && !isDecimalDigit(state.lookahead()) ? (state.lastIntValue = 0, state.advance(), !0) : !1;
    };
    pp$1.regexp_eatControlEscape = function(state) {
      var ch = state.current();
      return ch === 116 ? (state.lastIntValue = 9, state.advance(), !0) : ch === 110 ? (state.lastIntValue = 10, state.advance(), !0) : ch === 118 ? (state.lastIntValue = 11, state.advance(), !0) : ch === 102 ? (state.lastIntValue = 12, state.advance(), !0) : ch === 114 ? (state.lastIntValue = 13, state.advance(), !0) : !1;
    };
    pp$1.regexp_eatControlLetter = function(state) {
      var ch = state.current();
      return isControlLetter(ch) ? (state.lastIntValue = ch % 32, state.advance(), !0) : !1;
    };
    pp$1.regexp_eatRegExpUnicodeEscapeSequence = function(state, forceU) {
      forceU === void 0 && (forceU = !1);
      var start2 = state.pos, switchU = forceU || state.switchU;
      if (state.eat(
        117
        /* u */
      )) {
        if (this.regexp_eatFixedHexDigits(state, 4)) {
          var lead = state.lastIntValue;
          if (switchU && lead >= 55296 && lead <= 56319) {
            var leadSurrogateEnd = state.pos;
            if (state.eat(
              92
              /* \ */
            ) && state.eat(
              117
              /* u */
            ) && this.regexp_eatFixedHexDigits(state, 4)) {
              var trail = state.lastIntValue;
              if (trail >= 56320 && trail <= 57343)
                return state.lastIntValue = (lead - 55296) * 1024 + (trail - 56320) + 65536, !0;
            }
            state.pos = leadSurrogateEnd, state.lastIntValue = lead;
          }
          return !0;
        }
        if (switchU && state.eat(
          123
          /* { */
        ) && this.regexp_eatHexDigits(state) && state.eat(
          125
          /* } */
        ) && isValidUnicode(state.lastIntValue))
          return !0;
        switchU && state.raise("Invalid unicode escape"), state.pos = start2;
      }
      return !1;
    };
    pp$1.regexp_eatIdentityEscape = function(state) {
      if (state.switchU)
        return this.regexp_eatSyntaxCharacter(state) ? !0 : state.eat(
          47
          /* / */
        ) ? (state.lastIntValue = 47, !0) : !1;
      var ch = state.current();
      return ch !== 99 && (!state.switchN || ch !== 107) ? (state.lastIntValue = ch, state.advance(), !0) : !1;
    };
    pp$1.regexp_eatDecimalEscape = function(state) {
      state.lastIntValue = 0;
      var ch = state.current();
      if (ch >= 49 && ch <= 57) {
        do
          state.lastIntValue = 10 * state.lastIntValue + (ch - 48), state.advance();
        while ((ch = state.current()) >= 48 && ch <= 57);
        return !0;
      }
      return !1;
    };
    CharSetNone = 0, CharSetOk = 1, CharSetString = 2;
    pp$1.regexp_eatCharacterClassEscape = function(state) {
      var ch = state.current();
      if (isCharacterClassEscape(ch))
        return state.lastIntValue = -1, state.advance(), CharSetOk;
      var negate = !1;
      if (state.switchU && this.options.ecmaVersion >= 9 && ((negate = ch === 80) || ch === 112)) {
        state.lastIntValue = -1, state.advance();
        var result;
        if (state.eat(
          123
          /* { */
        ) && (result = this.regexp_eatUnicodePropertyValueExpression(state)) && state.eat(
          125
          /* } */
        ))
          return negate && result === CharSetString && state.raise("Invalid property name"), result;
        state.raise("Invalid property name");
      }
      return CharSetNone;
    };
    pp$1.regexp_eatUnicodePropertyValueExpression = function(state) {
      var start2 = state.pos;
      if (this.regexp_eatUnicodePropertyName(state) && state.eat(
        61
        /* = */
      )) {
        var name2 = state.lastStringValue;
        if (this.regexp_eatUnicodePropertyValue(state)) {
          var value = state.lastStringValue;
          return this.regexp_validateUnicodePropertyNameAndValue(state, name2, value), CharSetOk;
        }
      }
      if (state.pos = start2, this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
        var nameOrValue = state.lastStringValue;
        return this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
      }
      return CharSetNone;
    };
    pp$1.regexp_validateUnicodePropertyNameAndValue = function(state, name2, value) {
      hasOwn(state.unicodeProperties.nonBinary, name2) || state.raise("Invalid property name"), state.unicodeProperties.nonBinary[name2].test(value) || state.raise("Invalid property value");
    };
    pp$1.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
      if (state.unicodeProperties.binary.test(nameOrValue))
        return CharSetOk;
      if (state.switchV && state.unicodeProperties.binaryOfStrings.test(nameOrValue))
        return CharSetString;
      state.raise("Invalid property name");
    };
    pp$1.regexp_eatUnicodePropertyName = function(state) {
      var ch = 0;
      for (state.lastStringValue = ""; isUnicodePropertyNameCharacter(ch = state.current()); )
        state.lastStringValue += codePointToString(ch), state.advance();
      return state.lastStringValue !== "";
    };
    pp$1.regexp_eatUnicodePropertyValue = function(state) {
      var ch = 0;
      for (state.lastStringValue = ""; isUnicodePropertyValueCharacter(ch = state.current()); )
        state.lastStringValue += codePointToString(ch), state.advance();
      return state.lastStringValue !== "";
    };
    pp$1.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
      return this.regexp_eatUnicodePropertyValue(state);
    };
    pp$1.regexp_eatCharacterClass = function(state) {
      if (state.eat(
        91
        /* [ */
      )) {
        var negate = state.eat(
          94
          /* ^ */
        ), result = this.regexp_classContents(state);
        return state.eat(
          93
          /* ] */
        ) || state.raise("Unterminated character class"), negate && result === CharSetString && state.raise("Negated character class may contain strings"), !0;
      }
      return !1;
    };
    pp$1.regexp_classContents = function(state) {
      return state.current() === 93 ? CharSetOk : state.switchV ? this.regexp_classSetExpression(state) : (this.regexp_nonEmptyClassRanges(state), CharSetOk);
    };
    pp$1.regexp_nonEmptyClassRanges = function(state) {
      for (; this.regexp_eatClassAtom(state); ) {
        var left = state.lastIntValue;
        if (state.eat(
          45
          /* - */
        ) && this.regexp_eatClassAtom(state)) {
          var right = state.lastIntValue;
          state.switchU && (left === -1 || right === -1) && state.raise("Invalid character class"), left !== -1 && right !== -1 && left > right && state.raise("Range out of order in character class");
        }
      }
    };
    pp$1.regexp_eatClassAtom = function(state) {
      var start2 = state.pos;
      if (state.eat(
        92
        /* \ */
      )) {
        if (this.regexp_eatClassEscape(state))
          return !0;
        if (state.switchU) {
          var ch$1 = state.current();
          (ch$1 === 99 || isOctalDigit(ch$1)) && state.raise("Invalid class escape"), state.raise("Invalid escape");
        }
        state.pos = start2;
      }
      var ch = state.current();
      return ch !== 93 ? (state.lastIntValue = ch, state.advance(), !0) : !1;
    };
    pp$1.regexp_eatClassEscape = function(state) {
      var start2 = state.pos;
      if (state.eat(
        98
        /* b */
      ))
        return state.lastIntValue = 8, !0;
      if (state.switchU && state.eat(
        45
        /* - */
      ))
        return state.lastIntValue = 45, !0;
      if (!state.switchU && state.eat(
        99
        /* c */
      )) {
        if (this.regexp_eatClassControlLetter(state))
          return !0;
        state.pos = start2;
      }
      return this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state);
    };
    pp$1.regexp_classSetExpression = function(state) {
      var result = CharSetOk, subResult;
      if (!this.regexp_eatClassSetRange(state)) if (subResult = this.regexp_eatClassSetOperand(state)) {
        subResult === CharSetString && (result = CharSetString);
        for (var start2 = state.pos; state.eatChars(
          [38, 38]
          /* && */
        ); ) {
          if (state.current() !== 38 && (subResult = this.regexp_eatClassSetOperand(state))) {
            subResult !== CharSetString && (result = CharSetOk);
            continue;
          }
          state.raise("Invalid character in character class");
        }
        if (start2 !== state.pos)
          return result;
        for (; state.eatChars(
          [45, 45]
          /* -- */
        ); )
          this.regexp_eatClassSetOperand(state) || state.raise("Invalid character in character class");
        if (start2 !== state.pos)
          return result;
      } else
        state.raise("Invalid character in character class");
      for (; ; )
        if (!this.regexp_eatClassSetRange(state)) {
          if (subResult = this.regexp_eatClassSetOperand(state), !subResult)
            return result;
          subResult === CharSetString && (result = CharSetString);
        }
    };
    pp$1.regexp_eatClassSetRange = function(state) {
      var start2 = state.pos;
      if (this.regexp_eatClassSetCharacter(state)) {
        var left = state.lastIntValue;
        if (state.eat(
          45
          /* - */
        ) && this.regexp_eatClassSetCharacter(state)) {
          var right = state.lastIntValue;
          return left !== -1 && right !== -1 && left > right && state.raise("Range out of order in character class"), !0;
        }
        state.pos = start2;
      }
      return !1;
    };
    pp$1.regexp_eatClassSetOperand = function(state) {
      return this.regexp_eatClassSetCharacter(state) ? CharSetOk : this.regexp_eatClassStringDisjunction(state) || this.regexp_eatNestedClass(state);
    };
    pp$1.regexp_eatNestedClass = function(state) {
      var start2 = state.pos;
      if (state.eat(
        91
        /* [ */
      )) {
        var negate = state.eat(
          94
          /* ^ */
        ), result = this.regexp_classContents(state);
        if (state.eat(
          93
          /* ] */
        ))
          return negate && result === CharSetString && state.raise("Negated character class may contain strings"), result;
        state.pos = start2;
      }
      if (state.eat(
        92
        /* \ */
      )) {
        var result$1 = this.regexp_eatCharacterClassEscape(state);
        if (result$1)
          return result$1;
        state.pos = start2;
      }
      return null;
    };
    pp$1.regexp_eatClassStringDisjunction = function(state) {
      var start2 = state.pos;
      if (state.eatChars(
        [92, 113]
        /* \q */
      )) {
        if (state.eat(
          123
          /* { */
        )) {
          var result = this.regexp_classStringDisjunctionContents(state);
          if (state.eat(
            125
            /* } */
          ))
            return result;
        } else
          state.raise("Invalid escape");
        state.pos = start2;
      }
      return null;
    };
    pp$1.regexp_classStringDisjunctionContents = function(state) {
      for (var result = this.regexp_classString(state); state.eat(
        124
        /* | */
      ); )
        this.regexp_classString(state) === CharSetString && (result = CharSetString);
      return result;
    };
    pp$1.regexp_classString = function(state) {
      for (var count = 0; this.regexp_eatClassSetCharacter(state); )
        count++;
      return count === 1 ? CharSetOk : CharSetString;
    };
    pp$1.regexp_eatClassSetCharacter = function(state) {
      var start2 = state.pos;
      if (state.eat(
        92
        /* \ */
      ))
        return this.regexp_eatCharacterEscape(state) || this.regexp_eatClassSetReservedPunctuator(state) ? !0 : state.eat(
          98
          /* b */
        ) ? (state.lastIntValue = 8, !0) : (state.pos = start2, !1);
      var ch = state.current();
      return ch < 0 || ch === state.lookahead() && isClassSetReservedDoublePunctuatorCharacter(ch) || isClassSetSyntaxCharacter(ch) ? !1 : (state.advance(), state.lastIntValue = ch, !0);
    };
    pp$1.regexp_eatClassSetReservedPunctuator = function(state) {
      var ch = state.current();
      return isClassSetReservedPunctuator(ch) ? (state.lastIntValue = ch, state.advance(), !0) : !1;
    };
    pp$1.regexp_eatClassControlLetter = function(state) {
      var ch = state.current();
      return isDecimalDigit(ch) || ch === 95 ? (state.lastIntValue = ch % 32, state.advance(), !0) : !1;
    };
    pp$1.regexp_eatHexEscapeSequence = function(state) {
      var start2 = state.pos;
      if (state.eat(
        120
        /* x */
      )) {
        if (this.regexp_eatFixedHexDigits(state, 2))
          return !0;
        state.switchU && state.raise("Invalid escape"), state.pos = start2;
      }
      return !1;
    };
    pp$1.regexp_eatDecimalDigits = function(state) {
      var start2 = state.pos, ch = 0;
      for (state.lastIntValue = 0; isDecimalDigit(ch = state.current()); )
        state.lastIntValue = 10 * state.lastIntValue + (ch - 48), state.advance();
      return state.pos !== start2;
    };
    pp$1.regexp_eatHexDigits = function(state) {
      var start2 = state.pos, ch = 0;
      for (state.lastIntValue = 0; isHexDigit(ch = state.current()); )
        state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch), state.advance();
      return state.pos !== start2;
    };
    pp$1.regexp_eatLegacyOctalEscapeSequence = function(state) {
      if (this.regexp_eatOctalDigit(state)) {
        var n1 = state.lastIntValue;
        if (this.regexp_eatOctalDigit(state)) {
          var n2 = state.lastIntValue;
          n1 <= 3 && this.regexp_eatOctalDigit(state) ? state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue : state.lastIntValue = n1 * 8 + n2;
        } else
          state.lastIntValue = n1;
        return !0;
      }
      return !1;
    };
    pp$1.regexp_eatOctalDigit = function(state) {
      var ch = state.current();
      return isOctalDigit(ch) ? (state.lastIntValue = ch - 48, state.advance(), !0) : (state.lastIntValue = 0, !1);
    };
    pp$1.regexp_eatFixedHexDigits = function(state, length) {
      var start2 = state.pos;
      state.lastIntValue = 0;
      for (var i2 = 0; i2 < length; ++i2) {
        var ch = state.current();
        if (!isHexDigit(ch))
          return state.pos = start2, !1;
        state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch), state.advance();
      }
      return !0;
    };
    Token = function(p) {
      this.type = p.type, this.value = p.value, this.start = p.start, this.end = p.end, p.options.locations && (this.loc = new SourceLocation(p, p.startLoc, p.endLoc)), p.options.ranges && (this.range = [p.start, p.end]);
    }, pp = Parser.prototype;
    pp.next = function(ignoreEscapeSequenceInKeyword) {
      !ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new Token(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
    };
    pp.getToken = function() {
      return this.next(), new Token(this);
    };
    typeof Symbol < "u" && (pp[Symbol.iterator] = function() {
      var this$1$1 = this;
      return {
        next: function() {
          var token = this$1$1.getToken();
          return {
            done: token.type === types$1.eof,
            value: token
          };
        }
      };
    });
    pp.nextToken = function() {
      var curContext = this.curContext();
      if ((!curContext || !curContext.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length)
        return this.finishToken(types$1.eof);
      if (curContext.override)
        return curContext.override(this);
      this.readToken(this.fullCharCodeAtPos());
    };
    pp.readToken = function(code) {
      return isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 ? this.readWord() : this.getTokenFromCode(code);
    };
    pp.fullCharCodeAtPos = function() {
      var code = this.input.charCodeAt(this.pos);
      if (code <= 55295 || code >= 56320)
        return code;
      var next = this.input.charCodeAt(this.pos + 1);
      return next <= 56319 || next >= 57344 ? code : (code << 10) + next - 56613888;
    };
    pp.skipBlockComment = function() {
      var startLoc = this.options.onComment && this.curPosition(), start2 = this.pos, end = this.input.indexOf("*/", this.pos += 2);
      if (end === -1 && this.raise(this.pos - 2, "Unterminated comment"), this.pos = end + 2, this.options.locations)
        for (var nextBreak = void 0, pos = start2; (nextBreak = nextLineBreak(this.input, pos, this.pos)) > -1; )
          ++this.curLine, pos = this.lineStart = nextBreak;
      this.options.onComment && this.options.onComment(
        !0,
        this.input.slice(start2 + 2, end),
        start2,
        this.pos,
        startLoc,
        this.curPosition()
      );
    };
    pp.skipLineComment = function(startSkip) {
      for (var start2 = this.pos, startLoc = this.options.onComment && this.curPosition(), ch = this.input.charCodeAt(this.pos += startSkip); this.pos < this.input.length && !isNewLine(ch); )
        ch = this.input.charCodeAt(++this.pos);
      this.options.onComment && this.options.onComment(
        !1,
        this.input.slice(start2 + startSkip, this.pos),
        start2,
        this.pos,
        startLoc,
        this.curPosition()
      );
    };
    pp.skipSpace = function() {
      loop: for (; this.pos < this.input.length; ) {
        var ch = this.input.charCodeAt(this.pos);
        switch (ch) {
          case 32:
          case 160:
            ++this.pos;
            break;
          case 13:
            this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
          case 10:
          case 8232:
          case 8233:
            ++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
            break;
          case 47:
            switch (this.input.charCodeAt(this.pos + 1)) {
              case 42:
                this.skipBlockComment();
                break;
              case 47:
                this.skipLineComment(2);
                break;
              default:
                break loop;
            }
            break;
          default:
            if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch)))
              ++this.pos;
            else
              break loop;
        }
      }
    };
    pp.finishToken = function(type, val) {
      this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
      var prevType = this.type;
      this.type = type, this.value = val, this.updateContext(prevType);
    };
    pp.readToken_dot = function() {
      var next = this.input.charCodeAt(this.pos + 1);
      if (next >= 48 && next <= 57)
        return this.readNumber(!0);
      var next2 = this.input.charCodeAt(this.pos + 2);
      return this.options.ecmaVersion >= 6 && next === 46 && next2 === 46 ? (this.pos += 3, this.finishToken(types$1.ellipsis)) : (++this.pos, this.finishToken(types$1.dot));
    };
    pp.readToken_slash = function() {
      var next = this.input.charCodeAt(this.pos + 1);
      return this.exprAllowed ? (++this.pos, this.readRegexp()) : next === 61 ? this.finishOp(types$1.assign, 2) : this.finishOp(types$1.slash, 1);
    };
    pp.readToken_mult_modulo_exp = function(code) {
      var next = this.input.charCodeAt(this.pos + 1), size = 1, tokentype = code === 42 ? types$1.star : types$1.modulo;
      return this.options.ecmaVersion >= 7 && code === 42 && next === 42 && (++size, tokentype = types$1.starstar, next = this.input.charCodeAt(this.pos + 2)), next === 61 ? this.finishOp(types$1.assign, size + 1) : this.finishOp(tokentype, size);
    };
    pp.readToken_pipe_amp = function(code) {
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === code) {
        if (this.options.ecmaVersion >= 12) {
          var next2 = this.input.charCodeAt(this.pos + 2);
          if (next2 === 61)
            return this.finishOp(types$1.assign, 3);
        }
        return this.finishOp(code === 124 ? types$1.logicalOR : types$1.logicalAND, 2);
      }
      return next === 61 ? this.finishOp(types$1.assign, 2) : this.finishOp(code === 124 ? types$1.bitwiseOR : types$1.bitwiseAND, 1);
    };
    pp.readToken_caret = function() {
      var next = this.input.charCodeAt(this.pos + 1);
      return next === 61 ? this.finishOp(types$1.assign, 2) : this.finishOp(types$1.bitwiseXOR, 1);
    };
    pp.readToken_plus_min = function(code) {
      var next = this.input.charCodeAt(this.pos + 1);
      return next === code ? next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(types$1.incDec, 2) : next === 61 ? this.finishOp(types$1.assign, 2) : this.finishOp(types$1.plusMin, 1);
    };
    pp.readToken_lt_gt = function(code) {
      var next = this.input.charCodeAt(this.pos + 1), size = 1;
      return next === code ? (size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + size) === 61 ? this.finishOp(types$1.assign, size + 1) : this.finishOp(types$1.bitShift, size)) : next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (next === 61 && (size = 2), this.finishOp(types$1.relational, size));
    };
    pp.readToken_eq_excl = function(code) {
      var next = this.input.charCodeAt(this.pos + 1);
      return next === 61 ? this.finishOp(types$1.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : code === 61 && next === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(types$1.arrow)) : this.finishOp(code === 61 ? types$1.eq : types$1.prefix, 1);
    };
    pp.readToken_question = function() {
      var ecmaVersion2 = this.options.ecmaVersion;
      if (ecmaVersion2 >= 11) {
        var next = this.input.charCodeAt(this.pos + 1);
        if (next === 46) {
          var next2 = this.input.charCodeAt(this.pos + 2);
          if (next2 < 48 || next2 > 57)
            return this.finishOp(types$1.questionDot, 2);
        }
        if (next === 63) {
          if (ecmaVersion2 >= 12) {
            var next2$1 = this.input.charCodeAt(this.pos + 2);
            if (next2$1 === 61)
              return this.finishOp(types$1.assign, 3);
          }
          return this.finishOp(types$1.coalesce, 2);
        }
      }
      return this.finishOp(types$1.question, 1);
    };
    pp.readToken_numberSign = function() {
      var ecmaVersion2 = this.options.ecmaVersion, code = 35;
      if (ecmaVersion2 >= 13 && (++this.pos, code = this.fullCharCodeAtPos(), isIdentifierStart(code, !0) || code === 92))
        return this.finishToken(types$1.privateId, this.readWord1());
      this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
    };
    pp.getTokenFromCode = function(code) {
      switch (code) {
        // The interpretation of a dot depends on whether it is followed
        // by a digit or another two dots.
        case 46:
          return this.readToken_dot();
        // Punctuation tokens.
        case 40:
          return ++this.pos, this.finishToken(types$1.parenL);
        case 41:
          return ++this.pos, this.finishToken(types$1.parenR);
        case 59:
          return ++this.pos, this.finishToken(types$1.semi);
        case 44:
          return ++this.pos, this.finishToken(types$1.comma);
        case 91:
          return ++this.pos, this.finishToken(types$1.bracketL);
        case 93:
          return ++this.pos, this.finishToken(types$1.bracketR);
        case 123:
          return ++this.pos, this.finishToken(types$1.braceL);
        case 125:
          return ++this.pos, this.finishToken(types$1.braceR);
        case 58:
          return ++this.pos, this.finishToken(types$1.colon);
        case 96:
          if (this.options.ecmaVersion < 6)
            break;
          return ++this.pos, this.finishToken(types$1.backQuote);
        case 48:
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === 120 || next === 88)
            return this.readRadixNumber(16);
          if (this.options.ecmaVersion >= 6) {
            if (next === 111 || next === 79)
              return this.readRadixNumber(8);
            if (next === 98 || next === 66)
              return this.readRadixNumber(2);
          }
        // Anything else beginning with a digit is an integer, octal
        // number, or float.
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          return this.readNumber(!1);
        // Quotes produce strings.
        case 34:
        case 39:
          return this.readString(code);
        // Operators are parsed inline in tiny state machines. '=' (61) is
        // often referred to. `finishOp` simply skips the amount of
        // characters it is given as second argument, and returns a token
        // of the type given by its first argument.
        case 47:
          return this.readToken_slash();
        case 37:
        case 42:
          return this.readToken_mult_modulo_exp(code);
        case 124:
        case 38:
          return this.readToken_pipe_amp(code);
        case 94:
          return this.readToken_caret();
        case 43:
        case 45:
          return this.readToken_plus_min(code);
        case 60:
        case 62:
          return this.readToken_lt_gt(code);
        case 61:
        case 33:
          return this.readToken_eq_excl(code);
        case 63:
          return this.readToken_question();
        case 126:
          return this.finishOp(types$1.prefix, 1);
        case 35:
          return this.readToken_numberSign();
      }
      this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
    };
    pp.finishOp = function(type, size) {
      var str = this.input.slice(this.pos, this.pos + size);
      return this.pos += size, this.finishToken(type, str);
    };
    pp.readRegexp = function() {
      for (var escaped, inClass, start2 = this.pos; ; ) {
        this.pos >= this.input.length && this.raise(start2, "Unterminated regular expression");
        var ch = this.input.charAt(this.pos);
        if (lineBreak.test(ch) && this.raise(start2, "Unterminated regular expression"), escaped)
          escaped = !1;
        else {
          if (ch === "[")
            inClass = !0;
          else if (ch === "]" && inClass)
            inClass = !1;
          else if (ch === "/" && !inClass)
            break;
          escaped = ch === "\\";
        }
        ++this.pos;
      }
      var pattern = this.input.slice(start2, this.pos);
      ++this.pos;
      var flagsStart = this.pos, flags = this.readWord1();
      this.containsEsc && this.unexpected(flagsStart);
      var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
      state.reset(start2, pattern, flags), this.validateRegExpFlags(state), this.validateRegExpPattern(state);
      var value = null;
      try {
        value = new RegExp(pattern, flags);
      } catch {
      }
      return this.finishToken(types$1.regexp, { pattern, flags, value });
    };
    pp.readInt = function(radix, len, maybeLegacyOctalNumericLiteral) {
      for (var allowSeparators = this.options.ecmaVersion >= 12 && len === void 0, isLegacyOctalNumericLiteral = maybeLegacyOctalNumericLiteral && this.input.charCodeAt(this.pos) === 48, start2 = this.pos, total = 0, lastCode = 0, i2 = 0, e = len ?? 1 / 0; i2 < e; ++i2, ++this.pos) {
        var code = this.input.charCodeAt(this.pos), val = void 0;
        if (allowSeparators && code === 95) {
          isLegacyOctalNumericLiteral && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), lastCode === 95 && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), i2 === 0 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), lastCode = code;
          continue;
        }
        if (code >= 97 ? val = code - 97 + 10 : code >= 65 ? val = code - 65 + 10 : code >= 48 && code <= 57 ? val = code - 48 : val = 1 / 0, val >= radix)
          break;
        lastCode = code, total = total * radix + val;
      }
      return allowSeparators && lastCode === 95 && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === start2 || len != null && this.pos - start2 !== len ? null : total;
    };
    pp.readRadixNumber = function(radix) {
      var start2 = this.pos;
      this.pos += 2;
      var val = this.readInt(radix);
      return val == null && this.raise(this.start + 2, "Expected number in radix " + radix), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (val = stringToBigInt(this.input.slice(start2, this.pos)), ++this.pos) : isIdentifierStart(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(types$1.num, val);
    };
    pp.readNumber = function(startsWithDot) {
      var start2 = this.pos;
      !startsWithDot && this.readInt(10, void 0, !0) === null && this.raise(start2, "Invalid number");
      var octal = this.pos - start2 >= 2 && this.input.charCodeAt(start2) === 48;
      octal && this.strict && this.raise(start2, "Invalid number");
      var next = this.input.charCodeAt(this.pos);
      if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
        var val$1 = stringToBigInt(this.input.slice(start2, this.pos));
        return ++this.pos, isIdentifierStart(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(types$1.num, val$1);
      }
      octal && /[89]/.test(this.input.slice(start2, this.pos)) && (octal = !1), next === 46 && !octal && (++this.pos, this.readInt(10), next = this.input.charCodeAt(this.pos)), (next === 69 || next === 101) && !octal && (next = this.input.charCodeAt(++this.pos), (next === 43 || next === 45) && ++this.pos, this.readInt(10) === null && this.raise(start2, "Invalid number")), isIdentifierStart(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
      var val = stringToNumber(this.input.slice(start2, this.pos), octal);
      return this.finishToken(types$1.num, val);
    };
    pp.readCodePoint = function() {
      var ch = this.input.charCodeAt(this.pos), code;
      if (ch === 123) {
        this.options.ecmaVersion < 6 && this.unexpected();
        var codePos = ++this.pos;
        code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, code > 1114111 && this.invalidStringToken(codePos, "Code point out of bounds");
      } else
        code = this.readHexChar(4);
      return code;
    };
    pp.readString = function(quote) {
      for (var out = "", chunkStart = ++this.pos; ; ) {
        this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
        var ch = this.input.charCodeAt(this.pos);
        if (ch === quote)
          break;
        ch === 92 ? (out += this.input.slice(chunkStart, this.pos), out += this.readEscapedChar(!1), chunkStart = this.pos) : ch === 8232 || ch === 8233 ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : (isNewLine(ch) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
      }
      return out += this.input.slice(chunkStart, this.pos++), this.finishToken(types$1.string, out);
    };
    INVALID_TEMPLATE_ESCAPE_ERROR = {};
    pp.tryReadTemplateToken = function() {
      this.inTemplateElement = !0;
      try {
        this.readTmplToken();
      } catch (err) {
        if (err === INVALID_TEMPLATE_ESCAPE_ERROR)
          this.readInvalidTemplateToken();
        else
          throw err;
      }
      this.inTemplateElement = !1;
    };
    pp.invalidStringToken = function(position2, message) {
      if (this.inTemplateElement && this.options.ecmaVersion >= 9)
        throw INVALID_TEMPLATE_ESCAPE_ERROR;
      this.raise(position2, message);
    };
    pp.readTmplToken = function() {
      for (var out = "", chunkStart = this.pos; ; ) {
        this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
        var ch = this.input.charCodeAt(this.pos);
        if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123)
          return this.pos === this.start && (this.type === types$1.template || this.type === types$1.invalidTemplate) ? ch === 36 ? (this.pos += 2, this.finishToken(types$1.dollarBraceL)) : (++this.pos, this.finishToken(types$1.backQuote)) : (out += this.input.slice(chunkStart, this.pos), this.finishToken(types$1.template, out));
        if (ch === 92)
          out += this.input.slice(chunkStart, this.pos), out += this.readEscapedChar(!0), chunkStart = this.pos;
        else if (isNewLine(ch)) {
          switch (out += this.input.slice(chunkStart, this.pos), ++this.pos, ch) {
            case 13:
              this.input.charCodeAt(this.pos) === 10 && ++this.pos;
            case 10:
              out += `
`;
              break;
            default:
              out += String.fromCharCode(ch);
              break;
          }
          this.options.locations && (++this.curLine, this.lineStart = this.pos), chunkStart = this.pos;
        } else
          ++this.pos;
      }
    };
    pp.readInvalidTemplateToken = function() {
      for (; this.pos < this.input.length; this.pos++)
        switch (this.input[this.pos]) {
          case "\\":
            ++this.pos;
            break;
          case "$":
            if (this.input[this.pos + 1] !== "{")
              break;
          // fall through
          case "`":
            return this.finishToken(types$1.invalidTemplate, this.input.slice(this.start, this.pos));
          case "\r":
            this.input[this.pos + 1] === `
` && ++this.pos;
          // fall through
          case `
`:
          case "\u2028":
          case "\u2029":
            ++this.curLine, this.lineStart = this.pos + 1;
            break;
        }
      this.raise(this.start, "Unterminated template");
    };
    pp.readEscapedChar = function(inTemplate) {
      var ch = this.input.charCodeAt(++this.pos);
      switch (++this.pos, ch) {
        case 110:
          return `
`;
        // 'n' -> '\n'
        case 114:
          return "\r";
        // 'r' -> '\r'
        case 120:
          return String.fromCharCode(this.readHexChar(2));
        // 'x'
        case 117:
          return codePointToString(this.readCodePoint());
        // 'u'
        case 116:
          return "	";
        // 't' -> '\t'
        case 98:
          return "\b";
        // 'b' -> '\b'
        case 118:
          return "\v";
        // 'v' -> '\u000b'
        case 102:
          return "\f";
        // 'f' -> '\f'
        case 13:
          this.input.charCodeAt(this.pos) === 10 && ++this.pos;
        // '\r\n'
        case 10:
          return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
        case 56:
        case 57:
          if (this.strict && this.invalidStringToken(
            this.pos - 1,
            "Invalid escape sequence"
          ), inTemplate) {
            var codePos = this.pos - 1;
            this.invalidStringToken(
              codePos,
              "Invalid escape sequence in template string"
            );
          }
        default:
          if (ch >= 48 && ch <= 55) {
            var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], octal = parseInt(octalStr, 8);
            return octal > 255 && (octalStr = octalStr.slice(0, -1), octal = parseInt(octalStr, 8)), this.pos += octalStr.length - 1, ch = this.input.charCodeAt(this.pos), (octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate) && this.invalidStringToken(
              this.pos - 1 - octalStr.length,
              inTemplate ? "Octal literal in template string" : "Octal literal in strict mode"
            ), String.fromCharCode(octal);
          }
          return isNewLine(ch) ? (this.options.locations && (this.lineStart = this.pos, ++this.curLine), "") : String.fromCharCode(ch);
      }
    };
    pp.readHexChar = function(len) {
      var codePos = this.pos, n = this.readInt(16, len);
      return n === null && this.invalidStringToken(codePos, "Bad character escape sequence"), n;
    };
    pp.readWord1 = function() {
      this.containsEsc = !1;
      for (var word = "", first = !0, chunkStart = this.pos, astral = this.options.ecmaVersion >= 6; this.pos < this.input.length; ) {
        var ch = this.fullCharCodeAtPos();
        if (isIdentifierChar(ch, astral))
          this.pos += ch <= 65535 ? 1 : 2;
        else if (ch === 92) {
          this.containsEsc = !0, word += this.input.slice(chunkStart, this.pos);
          var escStart = this.pos;
          this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
          var esc2 = this.readCodePoint();
          (first ? isIdentifierStart : isIdentifierChar)(esc2, astral) || this.invalidStringToken(escStart, "Invalid Unicode escape"), word += codePointToString(esc2), chunkStart = this.pos;
        } else
          break;
        first = !1;
      }
      return word + this.input.slice(chunkStart, this.pos);
    };
    pp.readWord = function() {
      var word = this.readWord1(), type = types$1.name;
      return this.keywords.test(word) && (type = keywords[word]), this.finishToken(type, word);
    };
    version = "8.15.0";
    Parser.acorn = {
      Parser,
      version,
      defaultOptions,
      Position,
      SourceLocation,
      getLineInfo,
      Node,
      TokenType,
      tokTypes: types$1,
      keywordTypes: keywords,
      TokContext,
      tokContexts: types,
      isIdentifierChar,
      isIdentifierStart,
      Token,
      isNewLine,
      lineBreak,
      lineBreakG,
      nonASCIIwhitespace
    };
  }
});

// ../../node_modules/acorn-jsx/xhtml.js
var require_xhtml = __commonJS({
  "../../node_modules/acorn-jsx/xhtml.js"(exports, module) {
    module.exports = {
      quot: '"',
      amp: "&",
      apos: "'",
      lt: "<",
      gt: ">",
      nbsp: "\xA0",
      iexcl: "\xA1",
      cent: "\xA2",
      pound: "\xA3",
      curren: "\xA4",
      yen: "\xA5",
      brvbar: "\xA6",
      sect: "\xA7",
      uml: "\xA8",
      copy: "\xA9",
      ordf: "\xAA",
      laquo: "\xAB",
      not: "\xAC",
      shy: "\xAD",
      reg: "\xAE",
      macr: "\xAF",
      deg: "\xB0",
      plusmn: "\xB1",
      sup2: "\xB2",
      sup3: "\xB3",
      acute: "\xB4",
      micro: "\xB5",
      para: "\xB6",
      middot: "\xB7",
      cedil: "\xB8",
      sup1: "\xB9",
      ordm: "\xBA",
      raquo: "\xBB",
      frac14: "\xBC",
      frac12: "\xBD",
      frac34: "\xBE",
      iquest: "\xBF",
      Agrave: "\xC0",
      Aacute: "\xC1",
      Acirc: "\xC2",
      Atilde: "\xC3",
      Auml: "\xC4",
      Aring: "\xC5",
      AElig: "\xC6",
      Ccedil: "\xC7",
      Egrave: "\xC8",
      Eacute: "\xC9",
      Ecirc: "\xCA",
      Euml: "\xCB",
      Igrave: "\xCC",
      Iacute: "\xCD",
      Icirc: "\xCE",
      Iuml: "\xCF",
      ETH: "\xD0",
      Ntilde: "\xD1",
      Ograve: "\xD2",
      Oacute: "\xD3",
      Ocirc: "\xD4",
      Otilde: "\xD5",
      Ouml: "\xD6",
      times: "\xD7",
      Oslash: "\xD8",
      Ugrave: "\xD9",
      Uacute: "\xDA",
      Ucirc: "\xDB",
      Uuml: "\xDC",
      Yacute: "\xDD",
      THORN: "\xDE",
      szlig: "\xDF",
      agrave: "\xE0",
      aacute: "\xE1",
      acirc: "\xE2",
      atilde: "\xE3",
      auml: "\xE4",
      aring: "\xE5",
      aelig: "\xE6",
      ccedil: "\xE7",
      egrave: "\xE8",
      eacute: "\xE9",
      ecirc: "\xEA",
      euml: "\xEB",
      igrave: "\xEC",
      iacute: "\xED",
      icirc: "\xEE",
      iuml: "\xEF",
      eth: "\xF0",
      ntilde: "\xF1",
      ograve: "\xF2",
      oacute: "\xF3",
      ocirc: "\xF4",
      otilde: "\xF5",
      ouml: "\xF6",
      divide: "\xF7",
      oslash: "\xF8",
      ugrave: "\xF9",
      uacute: "\xFA",
      ucirc: "\xFB",
      uuml: "\xFC",
      yacute: "\xFD",
      thorn: "\xFE",
      yuml: "\xFF",
      OElig: "\u0152",
      oelig: "\u0153",
      Scaron: "\u0160",
      scaron: "\u0161",
      Yuml: "\u0178",
      fnof: "\u0192",
      circ: "\u02C6",
      tilde: "\u02DC",
      Alpha: "\u0391",
      Beta: "\u0392",
      Gamma: "\u0393",
      Delta: "\u0394",
      Epsilon: "\u0395",
      Zeta: "\u0396",
      Eta: "\u0397",
      Theta: "\u0398",
      Iota: "\u0399",
      Kappa: "\u039A",
      Lambda: "\u039B",
      Mu: "\u039C",
      Nu: "\u039D",
      Xi: "\u039E",
      Omicron: "\u039F",
      Pi: "\u03A0",
      Rho: "\u03A1",
      Sigma: "\u03A3",
      Tau: "\u03A4",
      Upsilon: "\u03A5",
      Phi: "\u03A6",
      Chi: "\u03A7",
      Psi: "\u03A8",
      Omega: "\u03A9",
      alpha: "\u03B1",
      beta: "\u03B2",
      gamma: "\u03B3",
      delta: "\u03B4",
      epsilon: "\u03B5",
      zeta: "\u03B6",
      eta: "\u03B7",
      theta: "\u03B8",
      iota: "\u03B9",
      kappa: "\u03BA",
      lambda: "\u03BB",
      mu: "\u03BC",
      nu: "\u03BD",
      xi: "\u03BE",
      omicron: "\u03BF",
      pi: "\u03C0",
      rho: "\u03C1",
      sigmaf: "\u03C2",
      sigma: "\u03C3",
      tau: "\u03C4",
      upsilon: "\u03C5",
      phi: "\u03C6",
      chi: "\u03C7",
      psi: "\u03C8",
      omega: "\u03C9",
      thetasym: "\u03D1",
      upsih: "\u03D2",
      piv: "\u03D6",
      ensp: "\u2002",
      emsp: "\u2003",
      thinsp: "\u2009",
      zwnj: "\u200C",
      zwj: "\u200D",
      lrm: "\u200E",
      rlm: "\u200F",
      ndash: "\u2013",
      mdash: "\u2014",
      lsquo: "\u2018",
      rsquo: "\u2019",
      sbquo: "\u201A",
      ldquo: "\u201C",
      rdquo: "\u201D",
      bdquo: "\u201E",
      dagger: "\u2020",
      Dagger: "\u2021",
      bull: "\u2022",
      hellip: "\u2026",
      permil: "\u2030",
      prime: "\u2032",
      Prime: "\u2033",
      lsaquo: "\u2039",
      rsaquo: "\u203A",
      oline: "\u203E",
      frasl: "\u2044",
      euro: "\u20AC",
      image: "\u2111",
      weierp: "\u2118",
      real: "\u211C",
      trade: "\u2122",
      alefsym: "\u2135",
      larr: "\u2190",
      uarr: "\u2191",
      rarr: "\u2192",
      darr: "\u2193",
      harr: "\u2194",
      crarr: "\u21B5",
      lArr: "\u21D0",
      uArr: "\u21D1",
      rArr: "\u21D2",
      dArr: "\u21D3",
      hArr: "\u21D4",
      forall: "\u2200",
      part: "\u2202",
      exist: "\u2203",
      empty: "\u2205",
      nabla: "\u2207",
      isin: "\u2208",
      notin: "\u2209",
      ni: "\u220B",
      prod: "\u220F",
      sum: "\u2211",
      minus: "\u2212",
      lowast: "\u2217",
      radic: "\u221A",
      prop: "\u221D",
      infin: "\u221E",
      ang: "\u2220",
      and: "\u2227",
      or: "\u2228",
      cap: "\u2229",
      cup: "\u222A",
      int: "\u222B",
      there4: "\u2234",
      sim: "\u223C",
      cong: "\u2245",
      asymp: "\u2248",
      ne: "\u2260",
      equiv: "\u2261",
      le: "\u2264",
      ge: "\u2265",
      sub: "\u2282",
      sup: "\u2283",
      nsub: "\u2284",
      sube: "\u2286",
      supe: "\u2287",
      oplus: "\u2295",
      otimes: "\u2297",
      perp: "\u22A5",
      sdot: "\u22C5",
      lceil: "\u2308",
      rceil: "\u2309",
      lfloor: "\u230A",
      rfloor: "\u230B",
      lang: "\u2329",
      rang: "\u232A",
      loz: "\u25CA",
      spades: "\u2660",
      clubs: "\u2663",
      hearts: "\u2665",
      diams: "\u2666"
    };
  }
});

// ../../node_modules/acorn-jsx/index.js
var require_acorn_jsx = __commonJS({
  "../../node_modules/acorn-jsx/index.js"(exports, module) {
    "use strict";
    var XHTMLEntities = require_xhtml(), hexNumber = /^[\da-fA-F]+$/, decimalNumber = /^\d+$/, acornJsxMap = /* @__PURE__ */ new WeakMap();
    function getJsxTokens(acorn) {
      acorn = acorn.Parser.acorn || acorn;
      let acornJsx3 = acornJsxMap.get(acorn);
      if (!acornJsx3) {
        let tt = acorn.tokTypes, TokContext3 = acorn.TokContext, TokenType3 = acorn.TokenType, tc_oTag = new TokContext3("<tag", !1), tc_cTag = new TokContext3("</tag", !1), tc_expr = new TokContext3("<tag>...</tag>", !0, !0), tokContexts = {
          tc_oTag,
          tc_cTag,
          tc_expr
        }, tokTypes = {
          jsxName: new TokenType3("jsxName"),
          jsxText: new TokenType3("jsxText", { beforeExpr: !0 }),
          jsxTagStart: new TokenType3("jsxTagStart", { startsExpr: !0 }),
          jsxTagEnd: new TokenType3("jsxTagEnd")
        };
        tokTypes.jsxTagStart.updateContext = function() {
          this.context.push(tc_expr), this.context.push(tc_oTag), this.exprAllowed = !1;
        }, tokTypes.jsxTagEnd.updateContext = function(prevType) {
          let out = this.context.pop();
          out === tc_oTag && prevType === tt.slash || out === tc_cTag ? (this.context.pop(), this.exprAllowed = this.curContext() === tc_expr) : this.exprAllowed = !0;
        }, acornJsx3 = { tokContexts, tokTypes }, acornJsxMap.set(acorn, acornJsx3);
      }
      return acornJsx3;
    }
    function getQualifiedJSXName(object) {
      if (!object)
        return object;
      if (object.type === "JSXIdentifier")
        return object.name;
      if (object.type === "JSXNamespacedName")
        return object.namespace.name + ":" + object.name.name;
      if (object.type === "JSXMemberExpression")
        return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
    }
    module.exports = function(options) {
      return options = options || {}, function(Parser3) {
        return plugin({
          allowNamespaces: options.allowNamespaces !== !1,
          allowNamespacedObjects: !!options.allowNamespacedObjects
        }, Parser3);
      };
    };
    Object.defineProperty(module.exports, "tokTypes", {
      get: function() {
        return getJsxTokens((init_acorn(), __toCommonJS(acorn_exports))).tokTypes;
      },
      configurable: !0,
      enumerable: !0
    });
    function plugin(options, Parser3) {
      let acorn = Parser3.acorn || (init_acorn(), __toCommonJS(acorn_exports)), acornJsx3 = getJsxTokens(acorn), tt = acorn.tokTypes, tok = acornJsx3.tokTypes, tokContexts = acorn.tokContexts, tc_oTag = acornJsx3.tokContexts.tc_oTag, tc_cTag = acornJsx3.tokContexts.tc_cTag, tc_expr = acornJsx3.tokContexts.tc_expr, isNewLine2 = acorn.isNewLine, isIdentifierStart2 = acorn.isIdentifierStart, isIdentifierChar2 = acorn.isIdentifierChar;
      return class extends Parser3 {
        // Expose actual `tokTypes` and `tokContexts` to other plugins.
        static get acornJsx() {
          return acornJsx3;
        }
        // Reads inline JSX contents token.
        jsx_readToken() {
          let out = "", chunkStart = this.pos;
          for (; ; ) {
            this.pos >= this.input.length && this.raise(this.start, "Unterminated JSX contents");
            let ch = this.input.charCodeAt(this.pos);
            switch (ch) {
              case 60:
              // '<'
              case 123:
                return this.pos === this.start ? ch === 60 && this.exprAllowed ? (++this.pos, this.finishToken(tok.jsxTagStart)) : this.getTokenFromCode(ch) : (out += this.input.slice(chunkStart, this.pos), this.finishToken(tok.jsxText, out));
              case 38:
                out += this.input.slice(chunkStart, this.pos), out += this.jsx_readEntity(), chunkStart = this.pos;
                break;
              case 62:
              // '>'
              case 125:
                this.raise(
                  this.pos,
                  "Unexpected token `" + this.input[this.pos] + "`. Did you mean `" + (ch === 62 ? "&gt;" : "&rbrace;") + '` or `{"' + this.input[this.pos] + '"}`?'
                );
              default:
                isNewLine2(ch) ? (out += this.input.slice(chunkStart, this.pos), out += this.jsx_readNewLine(!0), chunkStart = this.pos) : ++this.pos;
            }
          }
        }
        jsx_readNewLine(normalizeCRLF) {
          let ch = this.input.charCodeAt(this.pos), out;
          return ++this.pos, ch === 13 && this.input.charCodeAt(this.pos) === 10 ? (++this.pos, out = normalizeCRLF ? `
` : `\r
`) : out = String.fromCharCode(ch), this.options.locations && (++this.curLine, this.lineStart = this.pos), out;
        }
        jsx_readString(quote) {
          let out = "", chunkStart = ++this.pos;
          for (; ; ) {
            this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
            let ch = this.input.charCodeAt(this.pos);
            if (ch === quote) break;
            ch === 38 ? (out += this.input.slice(chunkStart, this.pos), out += this.jsx_readEntity(), chunkStart = this.pos) : isNewLine2(ch) ? (out += this.input.slice(chunkStart, this.pos), out += this.jsx_readNewLine(!1), chunkStart = this.pos) : ++this.pos;
          }
          return out += this.input.slice(chunkStart, this.pos++), this.finishToken(tt.string, out);
        }
        jsx_readEntity() {
          let str = "", count = 0, entity, ch = this.input[this.pos];
          ch !== "&" && this.raise(this.pos, "Entity must start with an ampersand");
          let startPos = ++this.pos;
          for (; this.pos < this.input.length && count++ < 10; ) {
            if (ch = this.input[this.pos++], ch === ";") {
              str[0] === "#" ? str[1] === "x" ? (str = str.substr(2), hexNumber.test(str) && (entity = String.fromCharCode(parseInt(str, 16)))) : (str = str.substr(1), decimalNumber.test(str) && (entity = String.fromCharCode(parseInt(str, 10)))) : entity = XHTMLEntities[str];
              break;
            }
            str += ch;
          }
          return entity || (this.pos = startPos, "&");
        }
        // Read a JSX identifier (valid tag or attribute name).
        //
        // Optimized version since JSX identifiers can't contain
        // escape characters and so can be read as single slice.
        // Also assumes that first character was already checked
        // by isIdentifierStart in readToken.
        jsx_readWord() {
          let ch, start2 = this.pos;
          do
            ch = this.input.charCodeAt(++this.pos);
          while (isIdentifierChar2(ch) || ch === 45);
          return this.finishToken(tok.jsxName, this.input.slice(start2, this.pos));
        }
        // Parse next token as JSX identifier
        jsx_parseIdentifier() {
          let node2 = this.startNode();
          return this.type === tok.jsxName ? node2.name = this.value : this.type.keyword ? node2.name = this.type.keyword : this.unexpected(), this.next(), this.finishNode(node2, "JSXIdentifier");
        }
        // Parse namespaced identifier.
        jsx_parseNamespacedName() {
          let startPos = this.start, startLoc = this.startLoc, name2 = this.jsx_parseIdentifier();
          if (!options.allowNamespaces || !this.eat(tt.colon)) return name2;
          var node2 = this.startNodeAt(startPos, startLoc);
          return node2.namespace = name2, node2.name = this.jsx_parseIdentifier(), this.finishNode(node2, "JSXNamespacedName");
        }
        // Parses element name in any form - namespaced, member
        // or single identifier.
        jsx_parseElementName() {
          if (this.type === tok.jsxTagEnd) return "";
          let startPos = this.start, startLoc = this.startLoc, node2 = this.jsx_parseNamespacedName();
          for (this.type === tt.dot && node2.type === "JSXNamespacedName" && !options.allowNamespacedObjects && this.unexpected(); this.eat(tt.dot); ) {
            let newNode = this.startNodeAt(startPos, startLoc);
            newNode.object = node2, newNode.property = this.jsx_parseIdentifier(), node2 = this.finishNode(newNode, "JSXMemberExpression");
          }
          return node2;
        }
        // Parses any type of JSX attribute value.
        jsx_parseAttributeValue() {
          switch (this.type) {
            case tt.braceL:
              let node2 = this.jsx_parseExpressionContainer();
              return node2.expression.type === "JSXEmptyExpression" && this.raise(node2.start, "JSX attributes must only be assigned a non-empty expression"), node2;
            case tok.jsxTagStart:
            case tt.string:
              return this.parseExprAtom();
            default:
              this.raise(this.start, "JSX value should be either an expression or a quoted JSX text");
          }
        }
        // JSXEmptyExpression is unique type since it doesn't actually parse anything,
        // and so it should start at the end of last read token (left brace) and finish
        // at the beginning of the next one (right brace).
        jsx_parseEmptyExpression() {
          let node2 = this.startNodeAt(this.lastTokEnd, this.lastTokEndLoc);
          return this.finishNodeAt(node2, "JSXEmptyExpression", this.start, this.startLoc);
        }
        // Parses JSX expression enclosed into curly brackets.
        jsx_parseExpressionContainer() {
          let node2 = this.startNode();
          return this.next(), node2.expression = this.type === tt.braceR ? this.jsx_parseEmptyExpression() : this.parseExpression(), this.expect(tt.braceR), this.finishNode(node2, "JSXExpressionContainer");
        }
        // Parses following JSX attribute name-value pair.
        jsx_parseAttribute() {
          let node2 = this.startNode();
          return this.eat(tt.braceL) ? (this.expect(tt.ellipsis), node2.argument = this.parseMaybeAssign(), this.expect(tt.braceR), this.finishNode(node2, "JSXSpreadAttribute")) : (node2.name = this.jsx_parseNamespacedName(), node2.value = this.eat(tt.eq) ? this.jsx_parseAttributeValue() : null, this.finishNode(node2, "JSXAttribute"));
        }
        // Parses JSX opening tag starting after '<'.
        jsx_parseOpeningElementAt(startPos, startLoc) {
          let node2 = this.startNodeAt(startPos, startLoc);
          node2.attributes = [];
          let nodeName = this.jsx_parseElementName();
          for (nodeName && (node2.name = nodeName); this.type !== tt.slash && this.type !== tok.jsxTagEnd; )
            node2.attributes.push(this.jsx_parseAttribute());
          return node2.selfClosing = this.eat(tt.slash), this.expect(tok.jsxTagEnd), this.finishNode(node2, nodeName ? "JSXOpeningElement" : "JSXOpeningFragment");
        }
        // Parses JSX closing tag starting after '</'.
        jsx_parseClosingElementAt(startPos, startLoc) {
          let node2 = this.startNodeAt(startPos, startLoc), nodeName = this.jsx_parseElementName();
          return nodeName && (node2.name = nodeName), this.expect(tok.jsxTagEnd), this.finishNode(node2, nodeName ? "JSXClosingElement" : "JSXClosingFragment");
        }
        // Parses entire JSX element, including it's opening tag
        // (starting after '<'), attributes, contents and closing tag.
        jsx_parseElementAt(startPos, startLoc) {
          let node2 = this.startNodeAt(startPos, startLoc), children = [], openingElement = this.jsx_parseOpeningElementAt(startPos, startLoc), closingElement = null;
          if (!openingElement.selfClosing) {
            contents: for (; ; )
              switch (this.type) {
                case tok.jsxTagStart:
                  if (startPos = this.start, startLoc = this.startLoc, this.next(), this.eat(tt.slash)) {
                    closingElement = this.jsx_parseClosingElementAt(startPos, startLoc);
                    break contents;
                  }
                  children.push(this.jsx_parseElementAt(startPos, startLoc));
                  break;
                case tok.jsxText:
                  children.push(this.parseExprAtom());
                  break;
                case tt.braceL:
                  children.push(this.jsx_parseExpressionContainer());
                  break;
                default:
                  this.unexpected();
              }
            getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name) && this.raise(
              closingElement.start,
              "Expected corresponding JSX closing tag for <" + getQualifiedJSXName(openingElement.name) + ">"
            );
          }
          let fragmentOrElement = openingElement.name ? "Element" : "Fragment";
          return node2["opening" + fragmentOrElement] = openingElement, node2["closing" + fragmentOrElement] = closingElement, node2.children = children, this.type === tt.relational && this.value === "<" && this.raise(this.start, "Adjacent JSX elements must be wrapped in an enclosing tag"), this.finishNode(node2, "JSX" + fragmentOrElement);
        }
        // Parse JSX text
        jsx_parseText() {
          let node2 = this.parseLiteral(this.value);
          return node2.type = "JSXText", node2;
        }
        // Parses entire JSX element from current position.
        jsx_parseElement() {
          let startPos = this.start, startLoc = this.startLoc;
          return this.next(), this.jsx_parseElementAt(startPos, startLoc);
        }
        parseExprAtom(refShortHandDefaultPos) {
          return this.type === tok.jsxText ? this.jsx_parseText() : this.type === tok.jsxTagStart ? this.jsx_parseElement() : super.parseExprAtom(refShortHandDefaultPos);
        }
        readToken(code) {
          let context = this.curContext();
          if (context === tc_expr) return this.jsx_readToken();
          if (context === tc_oTag || context === tc_cTag) {
            if (isIdentifierStart2(code)) return this.jsx_readWord();
            if (code == 62)
              return ++this.pos, this.finishToken(tok.jsxTagEnd);
            if ((code === 34 || code === 39) && context == tc_oTag)
              return this.jsx_readString(code);
          }
          return code === 60 && this.exprAllowed && this.input.charCodeAt(this.pos + 1) !== 33 ? (++this.pos, this.finishToken(tok.jsxTagStart)) : super.readToken(code);
        }
        updateContext(prevType) {
          if (this.type == tt.braceL) {
            var curContext = this.curContext();
            curContext == tc_oTag ? this.context.push(tokContexts.b_expr) : curContext == tc_expr ? this.context.push(tokContexts.b_tmpl) : super.updateContext(prevType), this.exprAllowed = !0;
          } else if (this.type === tt.slash && prevType === tok.jsxTagStart)
            this.context.length -= 2, this.context.push(tc_cTag), this.exprAllowed = !1;
          else
            return super.updateContext(prevType);
        }
      };
    }
  }
});

// src/core-server/index.ts
import { getPreviewHeadTemplate, getPreviewBodyTemplate } from "storybook/internal/common";

// src/core-server/build-static.ts
import { cp as cp2, mkdir as mkdir2 } from "node:fs/promises";
import { rm } from "node:fs/promises";
import { Channel as Channel2 } from "storybook/internal/channels";
import {
  loadAllPresets,
  loadMainConfig,
  logConfig,
  resolveAddonName
} from "storybook/internal/common";
import { logger as logger5 } from "storybook/internal/node-logger";
import { getPrecedingUpgrade, telemetry as telemetry2 } from "storybook/internal/telemetry";
import { global as global2 } from "@storybook/global";
var import_picocolors3 = __toESM(require_picocolors(), 1);

// src/core-server/utils/apply-services-preset-once.ts
globalThis.STORYBOOK_SERVICES_PRESET_PROMISE = void 0;
async function applyServicesPresetOnce(presets) {
  return globalThis.STORYBOOK_SERVICES_PRESET_PROMISE ??= presets.apply("services");
}

// src/core-server/utils/build-or-throw.ts
import { NoMatchingExportError } from "storybook/internal/server-errors";
async function buildOrThrow(callback) {
  try {
    return await callback();
  } catch (err) {
    let builderErrors = err.errors;
    throw builderErrors && builderErrors.find(
      (er) => er.text?.includes("No matching export")
    ) ? new NoMatchingExportError(err) : err;
  }
}

// src/core-server/utils/copy-all-static-files.ts
var import_picocolors = __toESM(require_picocolors(), 1);
import { cp } from "node:fs/promises";
import { join as join2, relative as relative2 } from "node:path";
import { getDirectoryFromWorkingDir } from "storybook/internal/common";
import { logger as logger2 } from "storybook/internal/node-logger";
async function copyAllStaticFilesRelativeToMain(staticDirs, outputDir, configDir) {
  let workingDir = process.cwd();
  return staticDirs?.reduce(async (acc, dir) => {
    await acc;
    let staticDirAndTarget = typeof dir == "string" ? dir : `${dir.from}:${dir.to}`, { staticPath: from, targetEndpoint: to } = parseStaticDir(
      getDirectoryFromWorkingDir({
        configDir,
        workingDir,
        directory: staticDirAndTarget
      })
    ), targetPath = join2(outputDir, to), skipPaths = ["index.html", "iframe.html"].map((f) => join2(outputDir, f));
    from.includes("node_modules") || logger2.info(
      `Copying static files: ${import_picocolors.default.cyan(print(from))} at ${import_picocolors.default.cyan(print(targetPath))}`
    ), await cp(from, targetPath, {
      dereference: !0,
      preserveTimestamps: !0,
      filter: (_, dest) => !skipPaths.includes(dest),
      recursive: !0,
      force: !0
    });
  }, Promise.resolve());
}
function print(p) {
  return relative2(process.cwd(), p);
}

// src/core-server/utils/get-builders.ts
import { MissingBuilderError } from "storybook/internal/server-errors";
async function getManagerBuilder() {
  return await import("../_node-chunks/builder-manager-SYUIZ3YR.js");
}
async function getPreviewBuilder(resolvedPreviewBuilder) {
  return await importModule(resolvedPreviewBuilder);
}
async function getBuilders({ presets }) {
  let { builder } = await presets.apply("core", {});
  if (!builder)
    throw new MissingBuilderError();
  let resolvedPreviewBuilder = typeof builder == "string" ? builder : builder.name;
  return Promise.all([getPreviewBuilder(resolvedPreviewBuilder), getManagerBuilder()]);
}

// src/core-server/utils/index-json.ts
import { writeFile } from "node:fs/promises";
import { basename as basename2 } from "node:path";
import { STORY_INDEX_INVALIDATED } from "storybook/internal/core-events";

// src/core-server/utils/watch-story-specifiers.ts
import { lstatSync, readdirSync } from "node:fs";
import { basename, join as join3, relative as relative3, resolve as resolve2 } from "node:path";
import { commonGlobOptions } from "storybook/internal/common";
var import_watchpack = __toESM(require_lib2(), 1), isDirectory = (directory) => {
  try {
    return lstatSync(directory).isDirectory();
  } catch {
    return !1;
  }
};
function getNestedFilesAndDirectories(directories) {
  let traversedDirectories = /* @__PURE__ */ new Set(), files = /* @__PURE__ */ new Set(), traverse = (directory) => {
    traversedDirectories.has(directory) || (readdirSync(directory, { withFileTypes: !0 }).forEach((ent) => {
      ent.isDirectory() ? traverse(join3(directory, ent.name)) : ent.isFile() && files.add(join3(directory, ent.name));
    }), traversedDirectories.add(directory));
  };
  return directories.filter(isDirectory).forEach(traverse), { files: Array.from(files), directories: Array.from(traversedDirectories) };
}
function watchStorySpecifiers(specifiers, options, onInvalidate) {
  let { files, directories } = getNestedFilesAndDirectories(
    specifiers.map((ns) => resolve2(options.workingDir, ns.directory))
  ), wp = new import_watchpack.default({
    // poll: true, // Slow!!! Enable only in special cases
    followSymlinks: !1,
    ignored: ["**/.git", "**/node_modules"]
  });
  wp.watch({ files, directories });
  let toImportPath = (absolutePath) => {
    let relativePath = relative3(options.workingDir, absolutePath);
    return slash(relativePath.startsWith(".") ? relativePath : `./${relativePath}`);
  };
  async function onChangeOrRemove(absolutePath, removed) {
    let importPath = toImportPath(absolutePath);
    if (specifiers.find((ns) => ns.importPathMatcher.exec(importPath))) {
      onInvalidate(importPath, removed);
      return;
    }
    !removed && isDirectory(absolutePath) && await Promise.all(
      specifiers.filter((specifier) => importPath.startsWith(specifier.directory)).map(async (specifier) => {
        let dirGlob = join3(
          absolutePath,
          "**",
          // files can be e.g. '**/foo/*/*.js' so we just want the last bit,
          // because the directory could already be within the files part (e.g. './x/foo/bar')
          basename(specifier.files)
        ), { globby } = await import("../_node-chunks/globby-5UZDOYO6.js");
        (await globby(slash(dirGlob), commonGlobOptions(dirGlob))).forEach((filePath) => {
          let fileImportPath = toImportPath(filePath);
          specifier.importPathMatcher.exec(fileImportPath) && onInvalidate(fileImportPath, removed);
        });
      })
    );
  }
  let pendingEvents = /* @__PURE__ */ new Map(), batchTimeout;
  function queueEvent(absolutePath, removed) {
    pendingEvents.set(absolutePath, { removed }), batchTimeout && clearTimeout(batchTimeout), batchTimeout = setTimeout(async () => {
      batchTimeout = void 0;
      let events = new Map(pendingEvents);
      pendingEvents.clear(), await Promise.all(
        Array.from(events.entries()).map(([path2, { removed: removed2 }]) => onChangeOrRemove(path2, removed2))
      );
    }, 100);
  }
  return wp.on("change", (filePath, mtime, explanation) => {
    queueEvent(filePath, !mtime);
  }), wp.on("remove", (filePath) => {
    queueEvent(filePath, !0);
  }), () => wp.close();
}

// src/core-server/utils/watchConfig.ts
var import_watchpack2 = __toESM(require_lib2(), 1);
function watchConfig(configDir, onInvalidate) {
  let wp = new import_watchpack2.default({
    followSymlinks: !1,
    ignored: ["**/.git", "**/node_modules"]
  });
  return wp.watch({
    directories: [configDir]
  }), wp.on("change", async (filePath, mtime, explanation) => {
    await onInvalidate(filePath, !mtime);
  }), wp.on("remove", async (filePath, explanation) => {
    await onInvalidate(filePath, !0);
  }), () => wp.close();
}

// src/core-server/utils/index-json.ts
var DEBOUNCE = 100;
async function writeIndexJson(outputFile, initializedStoryIndexGenerator) {
  let storyIndex = await (await initializedStoryIndexGenerator).getIndex();
  await writeFile(outputFile, JSON.stringify(storyIndex));
}
function registerIndexJsonRoute({
  app,
  storyIndexGeneratorPromise,
  workingDir = process.cwd(),
  configDir,
  channel,
  normalizedStories
}) {
  let maybeInvalidate = debounce(
    () => {
      channel.emit(STORY_INDEX_INVALIDATED);
    },
    DEBOUNCE,
    { edges: ["leading", "trailing"] }
  );
  watchStorySpecifiers(normalizedStories, { workingDir }, async (path2, removed) => {
    (await storyIndexGeneratorPromise).invalidate(path2, removed), maybeInvalidate();
  }), configDir && watchConfig(configDir, async (filePath) => {
    basename2(filePath).startsWith("preview") && ((await storyIndexGeneratorPromise).invalidateAll(), maybeInvalidate());
  }), app.use("/index.json", async (_req, res) => {
    try {
      let index2 = await (await storyIndexGeneratorPromise).getIndex();
      res.setHeader("Content-Type", "application/json"), res.setHeader("Access-Control-Allow-Origin", "*"), res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      ), res.end(JSON.stringify(index2));
    } catch (err) {
      res.statusCode = 500, res.end(err instanceof Error ? err.toString() : String(err));
    }
  });
}

// src/core-server/utils/manifests/manifests.ts
import { mkdir, writeFile as writeFile2 } from "node:fs/promises";
import { selectComponentEntriesByComponentId } from "storybook/internal/common";
import { logger as logger3 } from "storybook/internal/node-logger";

// src/core-server/utils/manifests/components-ref-manifest.ts
import { readFile } from "node:fs/promises";
var COMPONENTS_REF_MANIFEST_VERSION = 1;
function readDocgenSnapshotPayload(document5, id) {
  let payload = document5?.components?.[id];
  return payload !== null && typeof payload == "object" ? payload : void 0;
}
function readStoryDocsSnapshotPayload(document5, id) {
  let payload = document5?.components?.[id];
  return payload !== null && typeof payload == "object" ? payload : void 0;
}
function mergeManifestPayloads(docgen, storyDocs) {
  return {
    ...docgen,
    stories: storyDocs?.stories ?? {},
    ...storyDocs?.import ? { import: storyDocs.import } : {}
  };
}
async function loadDocgenPayloadsFromDisk(outputDir, componentIds) {
  let entries = await Promise.all(
    componentIds.map(async (id) => {
      let snapshotPath = join(outputDir, "services", ...docgenStaticStorePath(id).split("/"));
      try {
        let document5 = JSON.parse(await readFile(snapshotPath, "utf8")), payload = readDocgenSnapshotPayload(document5, id);
        return payload ? [id, payload] : null;
      } catch {
        return null;
      }
    })
  );
  return Object.fromEntries(entries.filter((entry) => entry !== null));
}
async function loadStoryDocsPayloadsFromDisk(outputDir, componentIds) {
  let entries = await Promise.all(
    componentIds.map(async (id) => {
      let snapshotPath = join(outputDir, "services", ...storyDocsStaticStorePath(id).split("/"));
      try {
        let document5 = JSON.parse(await readFile(snapshotPath, "utf8")), payload = readStoryDocsSnapshotPayload(document5, id);
        return payload ? [id, payload] : null;
      } catch {
        return null;
      }
    })
  );
  return Object.fromEntries(entries.filter((entry) => entry !== null));
}
function toComponentManifestIndexEntries(componentIds, docgenPayloads, storyDocsPayloads = {}, docsByComponentId = {}) {
  let entries = {};
  for (let id of componentIds) {
    let payload = docgenPayloads[id], storyDocs = storyDocsPayloads[id];
    entries[id] = payload ? {
      id: payload.id ?? id,
      name: payload.name ?? id,
      ...payload.description !== void 0 ? { description: payload.description } : {},
      ...payload.summary !== void 0 ? { summary: payload.summary } : {},
      docgen: { $ref: docgenManifestRef(id) },
      ...storyDocs ? { stories: { $ref: storyDocsManifestRef(id) } } : {},
      ...docsByComponentId[id] ? { docs: docsByComponentId[id] } : {}
    } : { id, name: id, ...docsByComponentId[id] ? { docs: docsByComponentId[id] } : {} };
  }
  return entries;
}
function buildComponentsRefManifest(components, meta) {
  return {
    v: COMPONENTS_REF_MANIFEST_VERSION,
    components,
    ...meta ? { meta } : {}
  };
}

// src/core-server/utils/manifests/mdx-ref-resolution.ts
import { readFile as readFile2 } from "node:fs/promises";

// src/core-server/utils/manifests/mdx-manifest.ts
var MDX_SERVICE_ID = "addon-docs/mdx";
function mdxQueryStaticPath(id) {
  return `${id}.json`;
}
function mdxStaticStorePath(id) {
  return `${MDX_SERVICE_ID}/${mdxQueryStaticPath(id)}`;
}
function mdxPayloadJsonPointer(id) {
  return `/components/${id}`;
}
function mdxDocJsonPointer(componentId, docId) {
  return `${mdxPayloadJsonPointer(componentId)}/docs/${docId}`;
}
function mdxManifestRef(componentId, docId) {
  return `../services/${mdxStaticStorePath(componentId)}#${mdxDocJsonPointer(componentId, docId)}`;
}

// src/core-server/utils/manifests/mdx-ref-resolution.ts
var fullTransform = (_entry, resolved) => resolved, shallowSummaryTransform = (entry, resolved) => resolved.summary !== void 0 ? { ...entry, summary: resolved.summary } : entry;
function hasMdxRef(entry) {
  return typeof entry?.mdx?.$ref == "string";
}
function createDiskLoader(outputDir) {
  let cache4 = /* @__PURE__ */ new Map();
  return (relativePath) => {
    let pending = cache4.get(relativePath);
    return pending || (pending = readFile2(join(outputDir, "manifests", relativePath), "utf8").then(
      (raw) => JSON.parse(raw)
    ), cache4.set(relativePath, pending)), pending;
  };
}
function createServiceLoader(mdxPayloads) {
  let document5 = { components: mdxPayloads };
  return () => document5;
}
function getJsonPointerValue(document5, pointer) {
  return pointer === "" || pointer === "/" ? document5 : pointer.split("/").slice(1).map((part) => part.replace(/~1/g, "/").replace(/~0/g, "~")).reduce((value, key2) => value?.[key2], document5);
}
async function resolveRef(ref2, load) {
  let [relativePath, pointer = ""] = ref2.$ref.split("#");
  invariant(relativePath, `Invalid MDX manifest ref "${ref2.$ref}"`);
  let document5 = await load(relativePath), value = getJsonPointerValue(document5, pointer);
  return invariant(
    value && typeof value == "object",
    `MDX manifest ref "${ref2.$ref}" did not resolve to an object`
  ), value;
}
async function resolveDocsRecord(docs = {}, load, transform) {
  let entries = await Promise.all(
    Object.entries(docs).map(
      async ([id, entry]) => hasMdxRef(entry) ? [id, transform(entry, await resolveRef(entry.mdx, load))] : [id, entry]
    )
  );
  return Object.fromEntries(entries);
}
function getAttachedDocsByComponent(manifest) {
  let components = manifest?.components ?? {};
  return Object.fromEntries(
    Object.entries(components).flatMap(
      ([id, component]) => component.docs ? [[id, component.docs]] : []
    )
  );
}
function hasMdxRefs(manifests, docsManifest) {
  let hasUnattachedRefs = Object.values(docsManifest?.docs ?? {}).some(
    (entry) => hasMdxRef(entry)
  ), hasAttachedRefs = Object.values(getAttachedDocsByComponent(manifests.components)).some(
    (docs) => Object.values(docs).some((entry) => hasMdxRef(entry))
  );
  return hasUnattachedRefs || hasAttachedRefs;
}
function createDocsOnlyDocgenPayload(id) {
  return { id, name: id, path: "", jsDocTags: {}, stories: [] };
}
async function resolveComponentDocs(components, manifests, load, transform) {
  let docsByComponentId = getAttachedDocsByComponent(manifests.components), allIds = /* @__PURE__ */ new Set([...Object.keys(components), ...Object.keys(docsByComponentId)]), entries = await Promise.all(
    [...allIds].map(async (id) => {
      let docs = docsByComponentId[id], component = components[id] ?? {
        ...createDocsOnlyDocgenPayload(id),
        stories: {}
      };
      return docs ? [id, { ...component, docs: await resolveDocsRecord(docs, load, transform) }] : [id, component];
    })
  );
  return Object.fromEntries(entries);
}
async function resolveDocsManifestRefs(docsManifest, load, transform) {
  if (docsManifest)
    return {
      ...docsManifest,
      docs: await resolveDocsRecord(
        docsManifest.docs,
        load,
        transform
      )
    };
}
async function injectAttachedDocsSummaries(attachedByComponent, load) {
  let entries = await Promise.all(
    Object.entries(attachedByComponent).map(
      async ([id, docs]) => [id, await resolveDocsRecord(docs, load, shallowSummaryTransform)]
    )
  );
  return Object.fromEntries(entries);
}
async function loadMdxPayloadsFromServiceIfNeeded(manifests, docsManifest) {
  return hasMdxRefs(manifests, docsManifest) ? getService(MDX_SERVICE_ID).queries.mdxForAllComponents.loaded() : {};
}

// src/core-server/utils/manifests/render-components-manifest.ts
import path from "node:path";
import { groupBy } from "storybook/internal/common";
function storyEntries(stories) {
  return Array.isArray(stories) ? stories : Object.values(stories ?? {});
}
function renderComponentsManifest(manifest, docsManifest) {
  let entries = Object.entries(manifest?.components ?? {}).sort(
    (a, b) => (a[1].name || a[0]).localeCompare(b[1].name || b[0])
  ), docsEntries = Object.entries(docsManifest?.docs ?? {}).sort(
    (a, b) => (a[1].name || a[0]).localeCompare(b[1].name || b[0])
  ), analyses = entries.map(([, c]) => analyzeComponent(c)), docsAnalyses = docsEntries.map(([, d]) => analyzeDoc(d)), attachedDocs = analyses.reduce((sum, a) => sum + a.totalDocs, 0), attachedDocsWithError = analyses.reduce((sum, a) => sum + a.docsErrors, 0), unattachedDocsWithError = docsAnalyses.filter((a) => a.hasError).length, totals = {
    components: entries.length,
    componentsWithPropTypeError: analyses.filter((a) => a.hasPropTypeError).length,
    infos: analyses.filter((a) => a.hasWarns).length,
    stories: analyses.reduce((sum, a) => sum + a.totalStories, 0),
    storyErrors: analyses.reduce((sum, a) => sum + a.storyErrors, 0),
    docs: docsEntries.length + attachedDocs,
    docsWithError: unattachedDocsWithError + attachedDocsWithError
  }, activeEngine = manifest?.meta?.docgen ?? "react-docgen", durationMs = manifest?.meta?.durationMs ?? 0, allPill = '<a class="filter-pill all" data-k="all" href="#filter-all">All</a>', compErrorsPill = totals.componentsWithPropTypeError > 0 ? `<a class="filter-pill err" data-k="errors" href="#filter-errors">${totals.componentsWithPropTypeError}/${totals.components} prop type ${plural(totals.componentsWithPropTypeError, "error")}</a>` : totals.components > 0 ? `<span class="filter-pill ok" aria-disabled="true">${totals.components} components ok</span>` : "", compInfosPill = totals.infos > 0 ? `<a class="filter-pill info" data-k="infos" href="#filter-infos">${totals.infos}/${totals.components} ${plural(totals.infos, "info", "infos")}</a>` : "", storiesPill = totals.storyErrors > 0 ? `<a class="filter-pill err" data-k="story-errors" href="#filter-story-errors">${totals.storyErrors}/${totals.stories} story errors</a>` : totals.stories > 0 ? `<span class="filter-pill ok" aria-disabled="true">${totals.stories} ${plural(totals.stories, "story", "stories")} ok</span>` : "", docsPill = totals.docs > 0 ? totals.docsWithError > 0 ? `<a class="filter-pill info" data-k="docs" href="#filter-docs">${totals.docsWithError}/${totals.docs} doc ${plural(totals.docsWithError, "error")}</a>` : `<a class="filter-pill ok" data-k="docs" href="#filter-docs">${totals.docs} ${plural(totals.docs, "doc")} ok</a>` : "", grid = entries.map(([key2, c], idx) => renderComponentCard(key2, c, `${idx}`)).join(""), docsGrid = docsEntries.map(([key2, d], idx) => renderDocCard(key2, d, `doc-${idx}`)).join(""), errorGroups = Object.entries(
    groupBy(
      entries.map(([, it]) => it).filter((it) => it.error),
      (manifest2) => manifest2.error?.name ?? "Error"
    )
  ).sort(([, a], [, b]) => b.length - a.length), errorGroupsHTML = errorGroups.map(([error, grouped]) => {
    let id = error.toLowerCase().replace(/[^a-z0-9]+/g, "-"), headerText = `${esc(error)}`, cards = grouped.map((manifest2, id2) => renderComponentCard(manifest2.id, manifest2, `error-${id2}`)).join("");
    return `
        <section class="group">
          <input id="${id}-toggle" class="group-tg" type="checkbox" hidden />
          <label for="${id}-toggle" class="group-header">
            <span class="caret">\u25B8</span>
            <span class="group-title">${headerText}</span>
            <span class="group-count">${grouped.length}</span>
          </label>
          <div class="group-cards">${cards}</div>
        </section>
      `;
  }).join("");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Components Manifest</title>
  <style>
      :root {
          --bg: #0b0c10;
          --panel: #121318;
          --muted: #9aa0a6;
          --fg: #e8eaed;
          --ok: #22c55e;
          --info: #1e88e5;
          --err: #c62828;
          --ok-bg: #0c1a13;
          --info-bg: #0c1624;
          --err-bg: #1a0e0e;
          --chip: #1f2330;
          --border: #2b2f3a;
          --link: #8ab4f8;
          --active-ring: 1px; /* 1px active ring for pills and toggles */
      }

      * {
          box-sizing: border-box;
      }

      html,
      body {
          margin: 0;
          background: var(--bg);
          color: var(--fg);
          font: 14px/1.5 system-ui,
          -apple-system,
          Segoe UI,
          Roboto,
          Ubuntu,
          Cantarell,
          'Helvetica Neue',
          Arial,
          'Noto Sans';
      }

      .wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 16px 20px;
      }

      header {
          position: sticky;
          top: 0;
          backdrop-filter: blur(6px);
          background: color-mix(in srgb, var(--bg) 84%, transparent);
          border-bottom: 1px solid var(--border);
          z-index: 10;
      }

      h1 {
          font-size: 20px;
          margin: 0 0 6px;
      }

      .summary {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
      }

      /* Top filter pills */
      .filter-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--panel);
          text-decoration: none;
          cursor: pointer;
          user-select: none;
          color: var(--fg);
      }

      .filter-pill.ok {
          color: #b9f6ca;
          border-color: color-mix(in srgb, var(--ok) 55%, var(--border));
          background: color-mix(in srgb, var(--ok) 18%, #000);
      }

      .filter-pill.info {
          color: #b3d9ff;
          border-color: color-mix(in srgb, var(--info) 55%, var(--border));
          background: var(--info-bg);
      }

      .filter-pill.err {
          color: #ff9aa0;
          border-color: color-mix(in srgb, var(--err) 55%, var(--border));
          background: var(--err-bg);
      }

      .filter-pill.all {
          color: #d7dbe0;
          border-color: var(--border);
          background: var(--panel);
      }

      .filter-pill[aria-disabled='true'] {
          cursor: default;
          text-decoration: none;
      }

      .filter-pill:focus,
      .filter-pill:active {
          outline: none;
          box-shadow: none;
      }

      /* Selected top pill ring via :target */
      #filter-all:target ~ header .filter-pill[data-k='all'],
      #filter-errors:target ~ header .filter-pill[data-k='errors'],
      #filter-infos:target ~ header .filter-pill[data-k='infos'],
      #filter-story-errors:target ~ header .filter-pill[data-k='story-errors'],
      #filter-doc-errors:target ~ header .filter-pill[data-k='docs'],
      #filter-docs:target ~ header .filter-pill[data-k='docs'] {
          box-shadow: 0 0 0 var(--active-ring) currentColor;
          border-color: currentColor;
      }

      /* Hidden targets for filtering */
      #filter-all,
      #filter-errors,
      #filter-infos,
      #filter-story-errors,
      #filter-doc-errors,
      #filter-docs {
          display: none;
      }

      main {
          padding: 36px 0 40px;
      }

      .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
      }

      /* one card per row */

      .card {
          border: 1px solid var(--border);
          background: var(--panel);
          border-radius: 14px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
      }

      .head {
          display: flex;
          flex-direction: column;
          gap: 8px;
      }

      .title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
      }

      .title h2 {
          font-size: 16px;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
      }

      .meta {
          font-size: 12px;
          color: var(--muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
      }

      .kv {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
      }

      .chip {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 999px;
          background: var(--chip);
          border: 1px solid var(--border);
      }

      .hint {
          color: var(--muted);
          font-size: 12px;
      }

      .badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
      }

      /* Per-card badges: labels become toggles when clickable */
      .badge {
          font-size: 12px;
          padding: 3px 8px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--chip);
          color: #d7dbe0;
      }

      .badge.ok {
          color: #b9f6ca;
          border-color: color-mix(in srgb, var(--ok) 55%, var(--border));
      }

      .badge.info {
          color: #b3d9ff;
          border-color: color-mix(in srgb, var(--info) 55%, var(--border));
      }

      .badge.err {
          color: #ff9aa0;
          border-color: color-mix(in srgb, var(--err) 55%, var(--border));
      }

      .as-toggle {
          cursor: pointer;
      }

      /* 1px ring on active toggle */
      .tg-err:checked + label.as-toggle,
      .tg-info:checked + label.as-toggle,
      .tg-stories:checked + label.as-toggle,
      .tg-docs:checked + label.as-toggle,
      .tg-subcomponents:checked + label.as-toggle,
      .tg-content:checked + label.as-toggle,
      .tg-props:checked + label.as-toggle {
          box-shadow: 0 0 0 var(--active-ring) currentColor;
          border-color: currentColor;
      }

      /* Panels: hidden by default, shown when respective toggle checked */
      .panels {
          display: grid;
          gap: 10px;
      }

      .panel {
          display: none;
      }

      .tg-err:checked ~ .panels .panel-err {
          display: grid;
      }

      .tg-info:checked ~ .panels .panel-info {
          display: grid;
          gap: 8px;
      }

      .tg-stories:checked ~ .panels .panel-stories {
          display: grid;
          gap: 8px;
      }

      .tg-docs:checked ~ .panels .panel-docs {
          display: grid;
          gap: 8px;
      }

      .tg-subcomponents:checked ~ .panels .panel-subcomponents {
          display: grid;
          gap: 8px;
      }

      .tg-content:checked ~ .panels .panel-content {
          display: grid;
          gap: 8px;
      }

      .tg-props:checked ~ .panels .panel-props {
          display: grid;
      }

      /* Colored notes for prop type error + info */
      .note {
          padding: 12px;
          border: 1px solid var(--border);
          border-radius: 10px;
      }

      .note.err {
          border-color: color-mix(in srgb, var(--err) 55%, var(--border));
          background: var(--err-bg);
          color: #ffd1d4;
      }

      .note.info {
          border-color: color-mix(in srgb, var(--info) 55%, var(--border));
          background: var(--info-bg);
          color: #d6e8ff;
      }

      .note.ok {
          border-color: color-mix(in srgb, var(--ok) 55%, var(--border));
          background: var(--ok-bg);
          color: var(--fg);
      }

      .note-title {
          font-weight: 600;
          margin-bottom: 6px;
      }

      .note-body {
          white-space: normal;
      }

      /* Story error cards */
      .ex {
          padding: 10px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: #0f131b;
      }

      .ex.err {
          border-color: color-mix(in srgb, var(--err) 55%, var(--border));
      }

      .row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
      }

      .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
      }

      .dot-ok {
          background: var(--ok);
      }

      .dot-err {
          background: var(--err);
      }

      .ex-name {
          font-weight: 600;
      }

      /* Error groups (visible in errors filter) */
      .error-groups {
          display: none;
          margin-bottom: 16px;
      }

      .group {
          border: 1px solid var(--border);
          background: var(--panel);
          border-radius: 14px;
          overflow: hidden;
      }

      .group + .group {
          margin-top: 12px;
      }

      .group-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          cursor: pointer;
          border-bottom: 1px solid var(--border);
      }

      .group-header:hover {
          background: #141722;
      }

      .group-title {
          font-weight: 600;
          flex: 1;
      }

      .group-count {
          font-size: 12px;
          color: var(--muted);
      }

      .group-cards {
          display: none;
          padding: 12px;
      }

      .group .card {
          margin: 12px 0;
      }

      .group .card:first-child {
          margin-top: 0;
      }

      .group .card:last-child {
          margin-bottom: 0;
      }

      /* caret rotation */
      .group-tg:checked + label .caret {
          transform: rotate(90deg);
      }

      .caret {
          transition: transform 0.15s ease;
      }

      /* toggle body */
      .group-tg:checked ~ .group-cards {
          display: block;
      }

      /* CSS-only filtering of cards via top pills */
      #filter-errors:target ~ main .card:not(.has-error):not(.has-story-error) {
          display: none;
      }

      #filter-infos:target ~ main .card:not(.has-info) {
          display: none;
      }

      #filter-story-errors:target ~ main .card:not(.has-story-error) {
          display: none;
      }

      #filter-doc-errors:target ~ main .card:not(.has-doc-error) {
          display: none;
      }

      #filter-docs:target ~ main .card:has(> .tg-docs),
      #filter-docs:target ~ main .card.is-doc {
          display: block;
      }

      #filter-docs:target ~ main .card:not(:has(> .tg-docs)):not(.is-doc) {
          display: none;
      }

      #filter-all:target ~ main .card {
          display: block;
      }

      /* In errors view, hide standalone component-error cards in the regular grid (they will appear in groups) */
      #filter-errors:target ~ main .grid .card.has-error {
          display: none;
      }

      /* Show grouped section only in errors view */
      #filter-errors:target ~ main .error-groups {
          display: block;
      }

      /* Section titles */
      .section-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--muted);
          margin: 24px 0 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border);
      }
      .section-title:first-child {
          margin-top: 0;
      }

      /* When a toggle is checked, show the corresponding panel */
      .card > .tg-err:checked ~ .panels .panel-err {
          display: grid;
      }
      
      .card > .tg-info:checked ~ .panels .panel-info {
          display: grid;
      }
      
      .card > .tg-stories:checked ~ .panels .panel-stories {
          display: grid;
      }

      .card > .tg-docs:checked ~ .panels .panel-docs {
          display: grid;
      }

      .card > .tg-subcomponents:checked ~ .panels .panel-subcomponents {
          display: grid;
      }

      .card > .tg-content:checked ~ .panels .panel-content {
          display: grid;
      }

      /* Add vertical spacing around panels only when any panel is visible */
      .card > .tg-err:checked ~ .panels,
      .card > .tg-info:checked ~ .panels,
      .card > .tg-stories:checked ~ .panels,
      .card > .tg-docs:checked ~ .panels,
      .card > .tg-subcomponents:checked ~ .panels,
      .card > .tg-content:checked ~ .panels,
      .card > .tg-props:checked ~ .panels {
          margin: 10px 0;
      }

      /* Optional: a subtle 1px ring on the active badge, using :has() if available */
      @supports selector(.card:has(.tg-err:checked)) {
          .card:has(.tg-err:checked) label[for$='-err'],
          .card:has(.tg-info:checked) label[for$='-info'],
          .card:has(.tg-stories:checked) label[for$='-stories'],
          .card:has(.tg-docs:checked) label[for$='-docs'],
          .card:has(.tg-subcomponents:checked) label[for$='-subcomponents'],
          .card:has(.tg-content:checked) label[for$='-content'],
          .card:has(.tg-props:checked) label[for$='-props'] {
              box-shadow: 0 0 0 1px currentColor;
              border-color: currentColor;
          }
      }

      /* Wrap long lines in code blocks at ~120 characters */
      pre, code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      }
      pre {
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          word-break: break-word;
          overflow-x: auto; /* fallback for extremely long tokens */
          margin: 8px 0 0;
      }
      pre > code {
          display: block;
          white-space: inherit;
          overflow-wrap: inherit;
          word-break: inherit;
          inline-size: min(100%, 120ch);
      }

      /* MDX content container for docs */
      .mdx-content {
          background: #0f131b;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px;
          max-height: 400px;
          overflow-y: auto;
          margin-top: 8px;
      }
  </style>
</head>
<body>
<!-- Hidden targets for the top-level filters -->
<span id="filter-all"></span>
<span id="filter-errors"></span>
<span id="filter-infos"></span>
<span id="filter-story-errors"></span>
<span id="filter-doc-errors"></span>
<span id="filter-docs"></span>
<header>
  <div class="wrap">
    <h1>Manifest Debugger</h1>
    <div class="summary">${allPill}${compErrorsPill}${compInfosPill}${storiesPill}${docsPill}</div>
  </div>
</header>
<main>
  <div class="wrap">
    ${activeEngine === "react-docgen" ? `<div class="note info" style="margin-bottom: 16px;">
            <strong>Tip:</strong> You are using <code>react-docgen</code> (the default). Generation took <strong>${(durationMs / 1e3).toFixed(1)}s</strong>. For higher quality prop types, consider switching to <code>react-docgen-typescript</code> in your <code>main.ts</code>:
            <pre><code>typescript: {
  reactDocgen: 'react-docgen-typescript',
}</code></pre>
            Note: <code>react-docgen-typescript</code> can be slower. If performance is acceptable for your project, it generally produces better results.
            <a href="https://storybook.js.org/docs/api/main-config/main-config-typescript#reactdocgen" target="_blank">Learn more</a>
          </div>` : activeEngine === "react-docgen-typescript" && durationMs > 7500 ? `<div class="note err" style="margin-bottom: 16px;">
              <strong>Performance warning:</strong> <code>react-docgen-typescript</code> took <strong>${(durationMs / 1e3).toFixed(1)}s</strong> to generate the manifest. This delay applies every time the manifest is used by an agent. Consider switching to the faster <code>react-docgen</code> in your <code>main.ts</code>:
              <pre><code>typescript: {
  reactDocgen: 'react-docgen',
}</code></pre>
              <a href="https://storybook.js.org/docs/api/main-config/main-config-typescript#reactdocgen" target="_blank">Learn more</a>
            </div>` : `<div class="note ok" style="margin-bottom: 16px;">
              Using <code>${activeEngine}</code>. Generation took <strong>${(durationMs / 1e3).toFixed(1)}s</strong>.
            </div>`}
    ${grid ? `<h2 class="section-title">Components</h2>
    <div class="grid" role="list">
      ${grid}
    </div>` : ""}
    ${errorGroups.length ? `<div class="error-groups" role="region" aria-label="Prop type error groups">${errorGroupsHTML}</div>` : ""}
    ${docsGrid ? `<h2 class="section-title">Unattached Docs</h2>
    <div class="grid" role="list">
      ${docsGrid}
    </div>` : ""}
    ${!grid && !docsGrid ? '<div class="card"><div class="head"><div class="hint">No components or docs.</div></div></div>' : ""}
  </div>
</main>
</body>
</html>  `;
}
var esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c), plural = (n, one2, many = `${one2}s`) => n === 1 ? one2 : many;
function analyzeComponent(c) {
  let hasPropTypeError = !!c.error, warns = [];
  c.description?.trim() || warns.push("No description found. Write a jsdoc comment such as /** Component description */."), c.import?.trim() || warns.push(
    `Specify an @import jsdoc tag on your component or your stories meta such as @import import { ${c.name} } from 'my-design-system';`
  );
  let allStories = storyEntries(c.stories), totalStories = allStories.length, storyErrors = allStories.filter((e) => !!e?.error).length, storyOk = totalStories - storyErrors, docsEntries = c.docs ? Object.values(c.docs) : [], totalDocs = docsEntries.length, docsErrors = docsEntries.filter((d) => !!d?.error).length, docsOk = totalDocs - docsErrors, hasAnyError = hasPropTypeError || storyErrors > 0 || docsErrors > 0;
  return {
    hasPropTypeError,
    hasAnyError,
    hasWarns: warns.length > 0,
    warns,
    totalStories,
    storyErrors,
    storyOk,
    totalDocs,
    docsErrors,
    docsOk
  };
}
function analyzeDoc(d) {
  return {
    hasError: !!d.error
  };
}
function note(title, bodyHTML, kind) {
  return `
    <div class="note ${kind}">
      <div class="note-title">${esc(title)}</div>
      <div class="note-body">${bodyHTML}</div>
    </div>`;
}
function renderDocCard(key2, d, id) {
  let a = analyzeDoc(d), statusDot = a.hasError ? "dot-err" : "dot-ok", slug = `${id}-${(d.id || key2).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`, errorBadge = a.hasError ? `<label for="${slug}-err" class="badge err as-toggle">error</label>` : "", contentBadge = d.content ? `<label for="${slug}-content" class="badge ok as-toggle">view content</label>` : "";
  return `
<article
  class="card is-doc ${a.hasError ? "has-doc-error" : "no-doc-error"}"
  role="listitem"
  aria-label="${esc(d.name || key2)}">
  <div class="head">
    <div class="title">
      <h2><span class="status-dot ${statusDot}"></span> ${esc(d.title || d.name || key2)}</h2>
      <div class="badges">
        ${errorBadge}
        ${contentBadge}
      </div>
    </div>
    <div class="meta" title="${esc(d.path ?? d.id)}">${d.path ? `${esc(d.id)} \xB7 ${esc(d.path)}` : esc(d.id)}</div>
    ${d.summary ? `<div>${esc(d.summary)}</div>` : ""}
  </div>

  <!-- Hidden toggles must be siblings BEFORE .panels -->
  ${a.hasError ? `<input id="${slug}-err" class="tg tg-err" type="checkbox" hidden />` : ""}
  ${d.content ? `<input id="${slug}-content" class="tg tg-content" type="checkbox" hidden />` : ""}

  <div class="panels">
    ${a.hasError ? `
        <div class="panel panel-err">
          <div class="note err">
            <div class="note-title">${esc(d.error?.name || "Error")}</div>
            <div class="note-body"><pre><code>${esc(d.error?.message || "Unknown error")}</code></pre></div>
          </div>
        </div>` : ""}
    ${d.content ? `
        <div class="panel panel-content">
          <div class="mdx-content">
            <pre><code>${esc(d.content)}</code></pre>
          </div>
        </div>` : ""}
  </div>
</article>`;
}
function renderComponentCard(key2, c, id) {
  let a = analyzeComponent(c), statusDot = a.hasAnyError ? "dot-err" : "dot-ok", allStories = storyEntries(c.stories), errorStories = allStories.filter((ex) => !!ex?.error), okStories = allStories.filter((ex) => !ex?.error), subcomponentEntries = Object.entries(c.subcomponents ?? {}), allDocs = c.docs ? Object.values(c.docs) : [], errorDocs = allDocs.filter((d) => !!d?.error), okDocs = allDocs.filter((d) => !d?.error), slug = `c-${id}-${(c.id || key2).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`, componentErrorBadge = a.hasPropTypeError ? `<label for="${slug}-err" class="badge err as-toggle">prop type error</label>` : "", infosBadge = a.hasWarns ? `<label for="${slug}-info" class="badge info as-toggle">${a.warns.length} ${plural(a.warns.length, "info", "infos")}</label>` : "", storiesBadge = a.totalStories > 0 ? `<label for="${slug}-stories" class="badge ${a.storyErrors > 0 ? "err" : "ok"} as-toggle">${a.storyErrors > 0 ? `${a.storyErrors}/${a.totalStories} story errors` : `${a.totalStories} ${plural(a.totalStories, "story", "stories")}`}</label>` : "", docsBadge = a.totalDocs > 0 ? `<label for="${slug}-docs" class="badge ${a.docsErrors > 0 ? "err" : "ok"} as-toggle">${a.docsErrors > 0 ? `${a.docsErrors}/${a.totalDocs} doc errors` : `${a.totalDocs} ${plural(a.totalDocs, "doc")}`}</label>` : "", subcomponentsBadge = subcomponentEntries.length > 0 ? `<label for="${slug}-subcomponents" class="badge ok as-toggle">${subcomponentEntries.length} ${plural(subcomponentEntries.length, "subcomponent")}</label>` : "", {
    parsed: activeParsed,
    engine: cardEngine,
    filePath,
    exportName
  } = docgenRenderData(c, a.hasPropTypeError), propEntries = activeParsed ? Object.entries(activeParsed.props ?? {}) : [], propTypesBadge = !a.hasPropTypeError && propEntries.length > 0 ? `<label for="${slug}-props" class="badge ok as-toggle">${propEntries.length} ${plural(propEntries.length, "prop type")}</label>` : "", primaryBadge = componentErrorBadge || propTypesBadge, propsCode = propEntries.length > 0 ? propEntries.sort(([aName], [bName]) => aName.localeCompare(bName)).map(([propName, info]) => {
    let description = (info?.description ?? "").trim(), t = (info?.type ?? "any").trim(), optional = info?.required ? "" : "?", defaultVal = (info?.defaultValue ?? "").trim(), def = defaultVal ? ` = ${defaultVal}` : "", doc = ["/**", ...description.split(`
`).map((line) => ` * ${line}`), " */"].join(`
`) + `
`;
    return `${description ? doc : ""}${propName}${optional}: ${t}${def}`;
  }).join(`

`) : "", tags = c.jsDocTags && typeof c.jsDocTags == "object" ? Object.entries(c.jsDocTags).flatMap(
    ([k, v]) => (Array.isArray(v) ? v : [v]).map(
      (val) => `<span class="chip">${esc(k)}: ${esc(val)}</span>`
    )
  ).join("") : "";
  return `
<article
  class="card 
  ${a.hasPropTypeError ? "has-error" : "no-error"} 
  ${a.hasWarns ? "has-info" : "no-info"} 
  ${a.storyErrors ? "has-story-error" : "no-story-error"}
  ${a.docsErrors ? "has-doc-error" : "no-doc-error"}"
  role="listitem"
  aria-label="${esc(c.name || key2)}">
  <div class="head">
    <div class="title">
      <h2><span class="status-dot ${statusDot}"></span> ${esc(c.name || key2)}</h2>
      <div class="badges">
        ${primaryBadge}
        ${infosBadge}
        ${storiesBadge}
        ${docsBadge}
        ${subcomponentsBadge}
      </div>
    </div>
    <div class="meta" title="${esc(c.path)}">${esc(c.id)} \xB7 ${esc(c.path)}</div>
    ${c.summary ? `<div>${esc(c.summary)}</div>` : ""}
    ${c.description ? `<div class="hint">${esc(c.description)}</div>` : ""}
    ${tags ? `<div class="kv">${tags}</div>` : ""}
  </div>

  <!-- \u2B07\uFE0F Hidden toggles must be siblings BEFORE .panels -->
  ${a.hasPropTypeError ? `<input id="${slug}-err" class="tg tg-err" type="checkbox" hidden />` : ""}
  ${a.hasWarns ? `<input id="${slug}-info" class="tg tg-info" type="checkbox" hidden />` : ""}
  ${a.totalStories > 0 ? `<input id="${slug}-stories" class="tg tg-stories" type="checkbox" hidden />` : ""}
  ${a.totalDocs > 0 ? `<input id="${slug}-docs" class="tg tg-docs" type="checkbox" hidden />` : ""}
  ${subcomponentEntries.length > 0 ? `<input id="${slug}-subcomponents" class="tg tg-subcomponents" type="checkbox" hidden />` : ""}
  ${!a.hasPropTypeError && propEntries.length > 0 ? `<input id="${slug}-props" class="tg tg-props" type="checkbox" hidden />` : ""}

  <div class="panels">
    ${a.hasPropTypeError ? `
        <div class="panel panel-err">
          ${note("Prop type error", `<pre><code>${esc(c.error?.message || "Unknown error")}</code></pre>`, "err")}
        </div>` : ""}
    ${a.hasWarns ? `
        <div class="panel panel-info">
          ${a.warns.map((w) => note("Info", esc(w), "info")).join("")}
        </div>` : ""}
    ${!a.hasPropTypeError && propEntries.length > 0 ? `
        <div class="panel panel-props">
          <div class="note ok">
            <div class="row">
              <span class="ex-name">Prop types <small>(${cardEngine})</small></span>
              <span class="badge ok">${propEntries.length} ${plural(propEntries.length, "prop type")}</span>
            </div>
            <pre><code>Component: ${filePath ? esc(path.relative(process.cwd(), filePath)) : ""}${exportName ? "::" + esc(exportName) : ""}</code></pre>
            <pre><code>Props:</code></pre>
            <pre><code>${esc(propsCode)}</code></pre>
          </div>
        </div>` : ""}
    ${a.totalStories > 0 ? `
        <div class="panel panel-stories">
          ${errorStories.map(
    (ex) => `
            <div class="note err">
              <div class="row">
                <span class="ex-name">${esc(ex.name)}</span>
                <span class="badge err">story error</span>
              </div>
              ${ex?.summary ? `<div class="hint">Summary: ${esc(ex.summary)}</div>` : ""}
              ${ex?.description ? `<div class="hint">${esc(ex.description)}</div>` : ""}
              ${ex?.snippet ? `<pre><code>${esc(ex.snippet)}</code></pre>` : ""}
              ${ex?.error?.message ? `<pre><code>${esc(ex.error.message)}</code></pre>` : ""}
            </div>`
  ).join("")}
          
          
          ${c.import ? `<div class="note ok">
                <div class="row">
                  <span class="ex-name">Imports</span>
                </div>
                <pre><code>${c.import}</code></pre>
              </div>` : ""}
          
          ${okStories.map(
    (ex) => `
            <div class="note ok">
              <div class="row">
                <span class="ex-name">${esc(ex.name)}</span>
                <span class="badge ok">story ok</span>
              </div>
              ${ex?.summary ? `<div>${esc(ex.summary)}</div>` : ""}
              ${ex?.description ? `<div class="hint">${esc(ex.description)}</div>` : ""}
              ${ex?.snippet ? `<pre><code>${esc(ex.snippet)}</code></pre>` : ""}
            </div>`
  ).join("")}
        </div>` : ""}
    ${a.totalDocs > 0 ? `
        <div class="panel panel-docs">
          ${errorDocs.map(
    (doc) => `
            <div class="note err">
              <div class="row">
                <span class="ex-name">${esc(doc.name)}</span>
                <span class="badge err">doc error</span>
              </div>
              ${doc.path ? `<div class="hint">${esc(doc.path)}</div>` : ""}
              ${doc?.summary ? `<div>${esc(doc.summary)}</div>` : ""}
              ${doc?.error?.message ? `<pre><code>${esc(doc.error.message)}</code></pre>` : ""}
            </div>`
  ).join("")}
          ${okDocs.map(
    (doc) => `
            <div class="note ok">
              <div class="row">
                <span class="ex-name">${esc(doc.name)}</span>
                <span class="badge ok">doc ok</span>
              </div>
              ${doc.path ? `<div class="hint">${esc(doc.path)}</div>` : ""}
              ${doc?.summary ? `<div>${esc(doc.summary)}</div>` : ""}
              ${doc?.content ? `<div class="mdx-content"><pre><code>${esc(doc.content)}</code></pre></div>` : ""}
            </div>`
  ).join("")}
        </div>` : ""}
    ${subcomponentEntries.length > 0 ? `
        <div class="panel panel-subcomponents">
          ${subcomponentEntries.map(
    ([subcomponentName, subcomponent]) => renderSubcomponentNote(subcomponentName, subcomponent)
  ).join("")}
        </div>` : ""}
  </div>
</article>`;
}
var docgenRenderData = (component, hasPropTypeError) => hasPropTypeError ? {} : component.reactDocgen ? {
  parsed: parseReactDocgen(component.reactDocgen),
  engine: "react-docgen",
  filePath: component.reactDocgen.definedInFile,
  exportName: component.reactDocgen.exportName
} : component.reactDocgenTypescript ? {
  parsed: parseReactDocgenTypescript(component.reactDocgenTypescript),
  engine: "react-docgen-typescript",
  filePath: component.reactDocgenTypescript.filePath,
  exportName: component.reactDocgenTypescript.exportName
} : component.reactComponentMeta ? {
  parsed: parseReactComponentMeta(component.reactComponentMeta),
  engine: "react-component-meta",
  filePath: component.reactComponentMeta.filePath,
  exportName: component.reactComponentMeta.exportName
} : {};
function renderSubcomponentNote(subcomponentName, subcomponent) {
  let hasPropTypeError = !!subcomponent.error, { parsed, engine, filePath, exportName } = docgenRenderData(subcomponent, hasPropTypeError), propEntries = Object.entries(parsed?.props ?? {}), tags = subcomponent.jsDocTags && typeof subcomponent.jsDocTags == "object" ? Object.entries(subcomponent.jsDocTags).flatMap(
    ([key2, value]) => (Array.isArray(value) ? value : [value]).map(
      (tagValue) => `<span class="chip">${esc(key2)}: ${esc(tagValue)}</span>`
    )
  ).join("") : "", propsCode = propEntries.length > 0 ? propEntries.sort(([aName], [bName]) => aName.localeCompare(bName)).map(([propName, info]) => {
    let description = (info?.description ?? "").trim(), type = (info?.type ?? "any").trim(), optional = info?.required ? "" : "?", defaultValue = (info?.defaultValue ?? "").trim(), fallback = defaultValue ? ` = ${defaultValue}` : "", doc = ["/**", ...description.split(`
`).map((line) => ` * ${line}`), " */"].join(`
`) + `
`;
    return `${description ? doc : ""}${propName}${optional}: ${type}${fallback}`;
  }).join(`

`) : "";
  return `
    <div class="note ${hasPropTypeError ? "err" : "ok"}">
      <div class="row">
        <span class="ex-name">${esc(subcomponentName)}</span>
        <span class="badge ${hasPropTypeError ? "err" : "ok"}">
          ${hasPropTypeError ? "prop type error" : propEntries.length > 0 ? `${propEntries.length} ${plural(propEntries.length, "prop type")}` : "no prop types"}
        </span>
      </div>
      <div class="hint">${esc(subcomponent.path)}</div>
      ${subcomponent.summary ? `<div>${esc(subcomponent.summary)}</div>` : ""}
      ${subcomponent.description ? `<div class="hint">${esc(subcomponent.description)}</div>` : ""}
      ${tags ? `<div class="kv">${tags}</div>` : ""}
      ${subcomponent.import ? `<pre><code>${esc(subcomponent.import)}</code></pre>` : ""}
      ${hasPropTypeError ? `<pre><code>${esc(subcomponent.error?.message ?? "Unknown error")}</code></pre>` : ""}
      ${!hasPropTypeError && propEntries.length > 0 ? `
          <pre><code>Component: ${filePath ? esc(path.relative(process.cwd(), filePath)) : ""}${exportName ? "::" + esc(exportName) : ""}${engine ? ` (${esc(engine)})` : ""}</code></pre>
          <pre><code>${esc(propsCode)}</code></pre>` : ""}
    </div>
  `;
}
var parseReactDocgenTypescript = (reactDocgenTypescript) => {
  let props = reactDocgenTypescript.props ?? {};
  return {
    props: Object.fromEntries(
      Object.entries(props).map(([propName, prop]) => [
        propName,
        {
          description: prop.description,
          // RDT uses prop.type.name as a flat string (e.g. "() => void", "{ id: string }")
          // For enums, prefer prop.type.raw which has the full union
          type: prop.type?.raw ?? prop.type?.name,
          defaultValue: prop.defaultValue?.value,
          required: prop.required
        }
      ])
    )
  };
}, parseReactComponentMeta = (reactComponentMeta) => {
  let props = reactComponentMeta.props ?? {};
  return {
    props: Object.fromEntries(
      Object.entries(props).map(([propName, prop]) => [
        propName,
        {
          description: prop.description,
          type: prop.type?.raw ?? prop.type?.name,
          defaultValue: prop.defaultValue?.value,
          required: prop.required
        }
      ])
    )
  };
}, parseReactDocgen = (reactDocgen) => {
  let props = reactDocgen.props ?? {};
  return {
    props: Object.fromEntries(
      Object.entries(props).map(([propName, prop]) => [
        propName,
        {
          description: prop.description,
          type: serializeTsType(prop.tsType ?? prop.type),
          defaultValue: prop.defaultValue?.value,
          required: prop.required
        }
      ])
    )
  };
};
function serializeTsType(tsType) {
  if (tsType) {
    if (tsType.raw && tsType.raw.trim().length > 0)
      return tsType.raw;
    if (tsType.name) {
      if (tsType.elements) {
        if (tsType.name === "union")
          return tsType.elements.map((el) => serializeTsType(el) ?? "unknown").join(" | ");
        if (tsType.name === "intersection")
          return tsType.elements.map((el) => serializeTsType(el) ?? "unknown").join(" & ");
        if (tsType.name === "Array") {
          let el = tsType.elements[0];
          return `${serializeTsType(el) ?? "unknown"}[]`;
        }
        if (tsType.name === "tuple")
          return `[${tsType.elements.map((el) => serializeTsType(el) ?? "unknown").join(", ")}]`;
      }
      if (tsType.value && tsType.name === "literal")
        return tsType.value;
      if (tsType.signature && tsType.name === "signature") {
        if (tsType.type === "function") {
          let args = (tsType.signature.arguments ?? []).map((a) => {
            let argType = serializeTsType(a.type) ?? "any";
            return `${a.name}: ${argType}`;
          }), ret = serializeTsType(tsType.signature.return) ?? "void";
          return `(${args.join(", ")}) => ${ret}`;
        }
        return tsType.type === "object" ? `{ ${(tsType.signature.properties ?? []).map((p) => {
          let req = !!p.value?.required, propType = serializeTsType(p.value) ?? "any";
          return `${p.key}${req ? "" : "?"}: ${propType}`;
        }).join("; ")} }` : "unknown";
      }
      if (tsType.elements) {
        let inner = tsType.elements.map((el) => serializeTsType(el) ?? "unknown");
        if (inner.length > 0)
          return `${tsType.name}<${inner.join(", ")}>`;
      }
      return tsType.name;
    }
  }
}

// src/core-server/utils/manifests/manifests.ts
function buildComponentsManifest(components, meta) {
  return {
    v: 1,
    components,
    meta
  };
}
function mergeServicePayloads(docgenPayloads, storyDocsPayloads, componentIds) {
  return Object.fromEntries(
    componentIds.flatMap((id) => {
      let docgen = docgenPayloads[id];
      return docgen ? [[id, mergeManifestPayloads(docgen, storyDocsPayloads[id])]] : [];
    })
  );
}
function isDocgenServerManifestMode(features) {
  return features.experimentalDocgenServer === !0 && features.componentsManifest === !0;
}
function isDocsManifest(manifest) {
  return typeof manifest == "object" && manifest !== null && "docs" in manifest;
}
async function getManifestEntries(presets) {
  let generator = await presets.apply("storyIndexGenerator");
  invariant(generator, "storyIndexGenerator must be configured");
  let index2 = await generator.getIndex();
  return Object.values(index2.entries).filter(
    (entry) => entry.tags?.includes(Tag.MANIFEST) ?? !1
  );
}
function getManifestComponentIds(manifestEntries) {
  return Array.from(selectComponentEntriesByComponentId(manifestEntries).keys());
}
async function getManifests(presets, manifestEntries, { watch: watch2 } = {}) {
  return await presets.apply("experimental_manifests", void 0, {
    manifestEntries,
    watch: watch2
  }) ?? {};
}
function resolveDocgenMeta(manifests, durationMs) {
  let presetMeta = manifests.components?.meta;
  return invariant(
    presetMeta?.docgen,
    "experimental_manifests must supply components.meta.docgen when experimentalDocgenServer is enabled"
  ), { docgen: presetMeta.docgen, durationMs };
}
function withDocsOnlyComponents(components, manifestComponentIds, docsByComponentId) {
  let next = { ...components };
  for (let id of manifestComponentIds)
    !next[id] && docsByComponentId[id] && (next[id] = mergeManifestPayloads(createDocsOnlyDocgenPayload(id)));
  return next;
}
async function renderComponentsHtmlFromService(manifests, manifestComponentIds, docsManifest) {
  let docgenService = getService("core/docgen"), storyDocsService = getService("core/story-docs"), startTime = performance.now(), [allDocgenPayloads, allStoryDocsPayloads, mdxPayloads] = await Promise.all([
    docgenService.queries.docgenForAllComponents.loaded(),
    storyDocsService.queries.storyDocsForAllComponents.loaded(),
    loadMdxPayloadsFromServiceIfNeeded(manifests, docsManifest)
  ]), durationMs = Math.round(performance.now() - startTime), docsByComponentId = getAttachedDocsByComponent(manifests.components), components = withDocsOnlyComponents(
    mergeServicePayloads(allDocgenPayloads, allStoryDocsPayloads, manifestComponentIds),
    manifestComponentIds,
    docsByComponentId
  ), load = createServiceLoader(mdxPayloads), [componentsWithDocs, resolvedDocsManifest] = await Promise.all([
    resolveComponentDocs(components, manifests, load, fullTransform),
    resolveDocsManifestRefs(docsManifest, load, fullTransform)
  ]);
  return renderComponentsManifest(
    buildComponentsManifest(componentsWithDocs, resolveDocgenMeta(manifests, durationMs)),
    resolvedDocsManifest
  );
}
async function writeManifestJsonFiles(outputDir, manifests, { skipComponents = !1 } = {}) {
  await Promise.all(
    Object.entries(manifests).filter(([name2]) => !skipComponents || name2 !== "components").map(
      ([name2, content3]) => writeFile2(join(outputDir, "manifests", `${name2}.json`), JSON.stringify(content3, null, 2))
    )
  );
}
async function writeDocgenServerManifests(outputDir, manifests, manifestComponentIds, docsManifest) {
  let hasOtherManifests = Object.keys(manifests).some((name2) => name2 !== "components"), shouldWriteHtml = manifestComponentIds.length > 0 || !!docsManifest;
  if (!hasOtherManifests && !shouldWriteHtml)
    return;
  let manifestsDir = join(outputDir, "manifests");
  await mkdir(manifestsDir, { recursive: !0 });
  let startTime = performance.now(), [docgenPayloads, storyDocsPayloads] = await Promise.all([
    loadDocgenPayloadsFromDisk(outputDir, manifestComponentIds),
    loadStoryDocsPayloadsFromDisk(outputDir, manifestComponentIds)
  ]), durationMs = Math.round(performance.now() - startTime), docsByComponentId = getAttachedDocsByComponent(manifests.components), mergedComponents = withDocsOnlyComponents(
    mergeServicePayloads(docgenPayloads, storyDocsPayloads, manifestComponentIds),
    manifestComponentIds,
    docsByComponentId
  ), load = createDiskLoader(outputDir), [attachedDocsWithSummaries, docsManifestWithSummaries] = await Promise.all([
    injectAttachedDocsSummaries(docsByComponentId, load),
    resolveDocsManifestRefs(docsManifest, load, shallowSummaryTransform)
  ]);
  if (manifestComponentIds.length > 0 && await writeFile2(
    join(manifestsDir, "components.json"),
    JSON.stringify(
      buildComponentsRefManifest(
        toComponentManifestIndexEntries(
          manifestComponentIds,
          docgenPayloads,
          storyDocsPayloads,
          attachedDocsWithSummaries
        ),
        manifests.components?.meta
      ),
      null,
      2
    )
  ), await writeManifestJsonFiles(
    outputDir,
    docsManifestWithSummaries ? { ...manifests, docs: docsManifestWithSummaries } : manifests,
    { skipComponents: !0 }
  ), shouldWriteHtml) {
    let [componentsWithDocs, resolvedDocsManifest] = await Promise.all([
      resolveComponentDocs(mergedComponents, manifests, load, fullTransform),
      resolveDocsManifestRefs(docsManifest, load, fullTransform)
    ]);
    await writeFile2(
      join(manifestsDir, "components.html"),
      renderComponentsManifest(
        buildComponentsManifest(componentsWithDocs, resolveDocgenMeta(manifests, durationMs)),
        resolvedDocsManifest
      )
    );
  }
}
async function writeLegacyManifests(outputDir, manifests, docsManifest) {
  if (Object.keys(manifests).length === 0)
    return;
  let manifestsDir = join(outputDir, "manifests");
  await mkdir(manifestsDir, { recursive: !0 }), await writeManifestJsonFiles(outputDir, manifests), ("components" in manifests || "docs" in manifests) && await writeFile2(
    join(manifestsDir, "components.html"),
    renderComponentsManifest(manifests.components, docsManifest)
  );
}
async function writeManifests(outputDir, presets) {
  try {
    let features = await presets.apply("features"), manifestEntries = await getManifestEntries(presets), manifests = await getManifests(presets, manifestEntries), docsManifest = isDocsManifest(manifests.docs) ? manifests.docs : void 0;
    if (isDocgenServerManifestMode(features)) {
      await writeDocgenServerManifests(
        outputDir,
        manifests,
        getManifestComponentIds(manifestEntries),
        docsManifest
      );
      return;
    }
    await writeLegacyManifests(outputDir, manifests, docsManifest);
  } catch (e) {
    logger3.error("Failed to generate manifests"), logger3.error(e instanceof Error ? e : String(e));
  }
}
function registerManifests({ app, presets }) {
  let useDocgenServerPromise, isDocgenServerEnabled = () => (useDocgenServerPromise ??= presets.apply("features").then((features) => isDocgenServerManifestMode(features ?? {})), useDocgenServerPromise);
  app.get("/manifests/:name.json", async (req, res) => {
    try {
      if (await isDocgenServerEnabled() && (req.params.name === "components" || req.params.name === "docs")) {
        res.statusCode = 404, res.end(
          `Manifest "${req.params.name}" is not available in dev when experimentalDocgenServer is enabled`
        );
        return;
      }
      let manifestEntries = await getManifestEntries(presets), manifest = (await getManifests(presets, manifestEntries, { watch: !0 }))[req.params.name];
      manifest ? (res.setHeader("Content-Type", "application/json"), res.end(JSON.stringify(manifest))) : (res.statusCode = 404, res.end(`Manifest "${req.params.name}" not found`));
    } catch (e) {
      logger3.error(e instanceof Error ? e : String(e)), res.statusCode = 500, res.end(e instanceof Error ? e.toString() : String(e));
    }
  }), app.get("/manifests/components.html", async (req, res) => {
    try {
      let manifestEntries = await getManifestEntries(presets), manifests = await getManifests(presets, manifestEntries, { watch: !0 }), docsManifest = isDocsManifest(manifests.docs) ? manifests.docs : void 0;
      if (await isDocgenServerEnabled()) {
        res.setHeader("Content-Type", "text/html; charset=utf-8"), res.end(
          await renderComponentsHtmlFromService(
            manifests,
            getManifestComponentIds(manifestEntries),
            docsManifest
          )
        );
        return;
      }
      let componentsManifest = manifests.components;
      if (!componentsManifest && !docsManifest) {
        res.statusCode = 404, res.setHeader("Content-Type", "text/html; charset=utf-8"), res.end("<pre>No components or docs manifest configured.</pre>");
        return;
      }
      res.setHeader("Content-Type", "text/html; charset=utf-8"), res.end(renderComponentsManifest(componentsManifest, docsManifest));
    } catch (e) {
      res.statusCode = 500, res.setHeader("Content-Type", "text/html; charset=utf-8"), res.end(`<pre>${e instanceof Error ? e.stack : String(e)}</pre>`);
    }
  });
}

// src/core-server/utils/metadata.ts
import { writeFile as writeFile3 } from "node:fs/promises";
import { getStorybookMetadata } from "storybook/internal/telemetry";
async function extractStorybookMetadata(outputFile, configDir) {
  let storybookMetadata = await getStorybookMetadata(configDir);
  await writeFile3(outputFile, JSON.stringify(storybookMetadata));
}
function useStorybookMetadata(app, configDir) {
  app.use("/project.json", async (req, res) => {
    let storybookMetadata = await getStorybookMetadata(configDir);
    res.setHeader("Content-Type", "application/json"), res.write(JSON.stringify(storybookMetadata)), res.end();
  });
}

// src/core-server/utils/output-stats.ts
var import_json_ext = __toESM(require_src2(), 1), import_picocolors2 = __toESM(require_picocolors(), 1);
import { createWriteStream } from "node:fs";
import { join as join4 } from "node:path";
import { logger as logger4 } from "storybook/internal/node-logger";
async function outputStats(directory, previewStats, managerStats) {
  if (previewStats) {
    let filePath = await writeStats(directory, "preview", previewStats);
    logger4.info(`Preview stats written to ${import_picocolors2.default.cyan(filePath)}`);
  }
  if (managerStats) {
    let filePath = await writeStats(directory, "manager", managerStats);
    logger4.info(`Manager stats written to ${import_picocolors2.default.cyan(filePath)}`);
  }
}
var writeStats = async (directory, name2, stats) => {
  let filePath = join4(directory, `${name2}-stats.json`), { chunks, ...data2 } = stats.toJson();
  return await new Promise((resolve4, reject) => {
    (0, import_json_ext.stringifyStream)(data2, null, 2).on("error", reject).pipe(createWriteStream(filePath)).on("error", reject).on("finish", resolve4);
  }), filePath;
};

// src/core-server/utils/summarizeIndex.ts
import { isExampleStoryId } from "storybook/internal/telemetry";

// src/shared/utils/story-index-filters.ts
function isMdxEntry({ tags }) {
  return tags?.includes(Tag.UNATTACHED_MDX) || tags?.includes(Tag.ATTACHED_MDX);
}

// src/core-server/utils/summarizeIndex.ts
var PAGE_REGEX = /(page|screen)/i, isPageStory = (storyId) => PAGE_REGEX.test(storyId), isCLIExampleEntry = (entry) => [
  "example-introduction--docs",
  "configure-your-project--docs",
  "example-button--docs",
  "example-button--primary",
  "example-button--secondary",
  "example-button--large",
  "example-button--small",
  "example-header--docs",
  "example-header--logged-in",
  "example-header--logged-out",
  "example-page--logged-in",
  "example-page--logged-out"
].includes(entry.id);
function summarizeIndex(storyIndex) {
  let storyCount = 0, componentTitles = /* @__PURE__ */ new Set(), exampleStoryCount = 0, onboardingStoryCount = 0, onboardingDocsCount = 0, exampleDocsCount = 0, pageStoryCount = 0, playStoryCount = 0, testStoryCount = 0, autodocsCount = 0, mdxCount = 0, svelteCsfV4Count = 0, svelteCsfV5Count = 0, testsPerParentStory = /* @__PURE__ */ new Map();
  Object.values(storyIndex.entries).forEach((entry) => {
    isCLIExampleEntry(entry) ? (entry.type === "story" && (exampleStoryCount += 1), entry.type === "docs" && (exampleDocsCount += 1)) : isExampleStoryId(entry.id) ? (entry.type === "story" && (onboardingStoryCount += 1), entry.type === "docs" && (onboardingDocsCount += 1)) : entry.type === "story" ? (storyCount += 1, componentTitles.add(entry.title), isPageStory(entry.title) && (pageStoryCount += 1), entry.tags?.includes(Tag.PLAY_FN) && (playStoryCount += 1), entry.tags?.includes(Tag.TEST_FN) && entry.parent && (testStoryCount += 1, testsPerParentStory.set(entry.parent, (testsPerParentStory.get(entry.parent) ?? 0) + 1)), entry.tags?.includes("svelte-csf-v4") ? svelteCsfV4Count += 1 : entry.tags?.includes("svelte-csf-v5") && (svelteCsfV5Count += 1)) : entry.type === "docs" && (isMdxEntry(entry) ? mdxCount += 1 : entry.tags?.includes(Tag.AUTODOCS) && (autodocsCount += 1));
  });
  let componentCount = componentTitles.size, maxTestsPerStory = 0, singleTestStoryCount = 0;
  return testsPerParentStory.forEach((count) => {
    count > maxTestsPerStory && (maxTestsPerStory = count), count === 1 && (singleTestStoryCount += 1);
  }), {
    storyCount,
    componentCount,
    pageStoryCount,
    playStoryCount,
    testStoryCount,
    maxTestsPerStory,
    singleTestStoryCount,
    autodocsCount,
    mdxCount,
    exampleStoryCount,
    exampleDocsCount,
    onboardingStoryCount,
    onboardingDocsCount,
    svelteCsfV4Count,
    svelteCsfV5Count,
    version: storyIndex.v
  };
}

// src/core-server/build-static.ts
async function buildStaticStandalone(options) {
  if (options.configType = "PRODUCTION", options.outputDir === "")
    throw new Error("Won't remove current directory. Check your outputDir!");
  if (options.outputDir = resolve(options.outputDir), options.configDir = resolve(options.configDir), logger5.step(`Cleaning outputDir: ${import_picocolors3.default.cyan(relative(process.cwd(), options.outputDir))}`), options.outputDir === "/")
    throw new Error("Won't remove directory '/'. Check your outputDir!");
  await rm(options.outputDir, { recursive: !0, force: !0 }).catch(() => {
  }), await mkdir2(options.outputDir, { recursive: !0 });
  let config = await loadMainConfig(options), { framework } = config, corePresets = [], frameworkName = typeof framework == "string" ? framework : framework?.name;
  frameworkName ? corePresets.push(join(frameworkName, "preset")) : options.ignorePreview || logger5.warn(`you have not specified a framework in your ${options.configDir}/main.js`);
  let commonPreset = join(
    resolvePackageDir("storybook"),
    "dist/core-server/presets/common-preset.js"
  ), commonOverridePreset = import.meta.resolve("storybook/internal/core-server/presets/common-override-preset");
  logger5.step("Loading presets");
  let channel = new Channel2({}), presets = await loadAllPresets({
    corePresets: [commonPreset, ...corePresets],
    overridePresets: [commonOverridePreset],
    isCritical: !0,
    channel,
    ...options
  }), { renderer } = await presets.apply("core", {}), build2 = await presets.apply("build", {}), [previewBuilder, managerBuilder] = await getBuilders({
    ...options,
    presets,
    build: build2,
    channel
  }), resolvedRenderer = renderer ? resolveAddonName(options.configDir, renderer, options) : void 0;
  presets = await loadAllPresets({
    corePresets: [
      commonPreset,
      ...managerBuilder.corePresets || [],
      ...previewBuilder.corePresets || [],
      ...resolvedRenderer ? [resolvedRenderer] : [],
      ...corePresets
    ],
    overridePresets: [...previewBuilder.overridePresets || [], commonOverridePreset],
    build: build2,
    channel,
    ...options
  });
  let [features, core3, staticDirs] = await Promise.all([
    presets.apply("features"),
    presets.apply("core"),
    presets.apply("staticDirs")
  ]), invokedBy = process.env.STORYBOOK_INVOKED_BY;
  invokedBy && telemetry2("test-run", { runner: invokedBy, watch: !1 }, { configDir: options.configDir });
  let fullOptions = {
    ...options,
    channel,
    presets,
    features,
    build: build2
  }, effects = [];
  global2.FEATURES = features, await applyServicesPresetOnce(presets), options.previewOnly || await buildOrThrow(
    async () => managerBuilder.build({ startTime: process.hrtime(), options: fullOptions })
  ), staticDirs && effects.push(
    copyAllStaticFilesRelativeToMain(staticDirs, options.outputDir, options.configDir)
  );
  let coreServerPublicDir = join(resolvePackageDir("storybook"), "assets/browser");
  effects.push(cp2(coreServerPublicDir, options.outputDir, { recursive: !0, force: !0 }));
  let hasRegisteredServices = getRegisteredServices().length > 0, shouldWriteManifests = !options.ignorePreview && features?.componentsManifest;
  (hasRegisteredServices || shouldWriteManifests) && effects.push(
    (async () => {
      hasRegisteredServices && (logger5.info("Building open services.."), await writeOpenServiceStaticFiles(options.outputDir)), shouldWriteManifests && await writeManifests(options.outputDir, presets);
    })()
  );
  let storyIndexGeneratorPromise = Promise.resolve(void 0);
  options.ignorePreview || (storyIndexGeneratorPromise = presets.apply("storyIndexGenerator"), effects.push(
    writeIndexJson(
      join(options.outputDir, "index.json"),
      storyIndexGeneratorPromise
    )
  )), core3?.disableProjectJson || effects.push(
    extractStorybookMetadata(join(options.outputDir, "project.json"), options.configDir)
  ), options.debugWebpack && logConfig("Preview webpack config", await previewBuilder.getConfig(fullOptions)), options.ignorePreview ? logger5.info("Not building preview") : logger5.info("Building preview..");
  let startTime = process.hrtime();
  if (await Promise.all([
    ...options.ignorePreview ? [] : [
      previewBuilder.build({
        startTime,
        options: fullOptions
      }).then(async (previewStats) => {
        logger5.trace({ message: "Preview built", time: process.hrtime(startTime) });
        let statsOption = options.webpackStatsJson || options.statsJson;
        if (statsOption) {
          let target = statsOption === !0 ? options.outputDir : statsOption;
          await outputStats(target, previewStats);
        }
      }).catch((error) => {
        throw logger5.error("Failed to build the preview"), process.exitCode = 1, error;
      })
    ],
    ...effects
  ]), !options.test)
    try {
      let storyIndex = await (await storyIndexGeneratorPromise)?.getIndex(), payload = {
        precedingUpgrade: await getPrecedingUpgrade()
      };
      storyIndex && Object.assign(payload, {
        storyIndex: summarizeIndex(storyIndex)
      }), await telemetry2("build", payload, { configDir: options.configDir });
    } catch (e) {
      logger5.debug?.(`Build telemetry failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  logger5.step(`Output directory: ${options.outputDir}`);
}

// src/core-server/build-dev.ts
import { readFile as readFile7 } from "node:fs/promises";
import {
  JsPackageManagerFactory,
  cache as cache3,
  getConfigInfo,
  getInterpretedFile,
  getProjectRoot,
  isWebContainer,
  loadAllPresets as loadAllPresets2,
  loadMainConfig as loadMainConfig2,
  resolveAddonName as resolveAddonName2,
  resolvePathInStorybookCache as resolvePathInStorybookCache2,
  validateFrameworkName,
  versions
} from "storybook/internal/common";
import { CLI_COLORS as CLI_COLORS2, deprecate, logger as logger18, prompt } from "storybook/internal/node-logger";
import { MissingBuilderError as MissingBuilderError3, NoStatsForViteDevError } from "storybook/internal/server-errors";
import { detectAgent as detectAgent2, oneWayHash, telemetry as telemetry4 } from "storybook/internal/telemetry";
import { global as global3 } from "@storybook/global";
var import_ts_dedent5 = __toESM(require_dist(), 1);

// src/channels/postmessage/index.ts
var import_telejson = __toESM(require_dist2(), 1);
import { logger as logger7, pretty } from "storybook/internal/client-logger";
import * as EVENTS from "storybook/internal/core-events";

// src/channels/postmessage/getEventSourceUrl.ts
import { logger as logger6 } from "storybook/internal/client-logger";

// src/channels/postmessage/index.ts
var { document: document2, location } = globalThis;
var CHANNEL_OPTIONS = globalThis.CHANNEL_OPTIONS || {};

// src/channels/websocket/index.ts
var import_telejson2 = __toESM(require_dist2(), 1);
import * as EVENTS2 from "storybook/internal/core-events";
var CHANNEL_OPTIONS2 = globalThis.CHANNEL_OPTIONS || {};

// src/channels/index.ts
var channels_default = Channel;

// src/core-server/dev-server.ts
import { logConfig as logConfig2, normalizeStories } from "storybook/internal/common";
import { logger as logger12 } from "storybook/internal/node-logger";
import { MissingBuilderError as MissingBuilderError2 } from "storybook/internal/server-errors";
import { CHANGE_DETECTION_STATUS_TYPE_ID as CHANGE_DETECTION_STATUS_TYPE_ID2 } from "storybook/internal/types";

// ../../node_modules/@polka/compression/build.mjs
import zlib from "node:zlib";
var NOOP = () => {
}, MIMES = /text|javascript|\/json|xml/i;
function getChunkSize(chunk, enc) {
  return chunk ? Buffer.byteLength(chunk, enc) : 0;
}
function build_default({ threshold = 1024, level = -1, brotli = !1, gzip = !0, mimes = MIMES } = {}) {
  let brotliOpts = typeof brotli == "object" && brotli || {}, gzipOpts = typeof gzip == "object" && gzip || {};
  return zlib.createBrotliCompress || (brotli = !1), (req, res, next = NOOP) => {
    let accept = req.headers["accept-encoding"] + "", encoding = (brotli && /\bbr\b/.exec(accept) || gzip && /\bgzip\b/.exec(accept) || [])[0];
    if (req.method === "HEAD" || !encoding) return next();
    let compress, pendingListeners = [], pendingStatus = 0, started = !1, size = 0;
    function start2() {
      started = !0, size = res.getHeader("Content-Length") | 0 || size;
      let compressible = mimes.test(
        String(res.getHeader("Content-Type") || "text/plain")
      ), cleartext = !res.getHeader("Content-Encoding"), listeners = pendingListeners || [];
      compressible && cleartext && size >= threshold ? (res.setHeader("Content-Encoding", encoding), res.removeHeader("Content-Length"), encoding === "br" ? compress = zlib.createBrotliCompress({
        params: Object.assign({
          [zlib.constants.BROTLI_PARAM_QUALITY]: level,
          [zlib.constants.BROTLI_PARAM_SIZE_HINT]: size
        }, brotliOpts)
      }) : compress = zlib.createGzip(
        Object.assign({ level }, gzipOpts)
      ), compress.on("data", (chunk) => write.call(res, chunk) || compress.pause()), on.call(res, "drain", () => compress.resume()), compress.on("end", () => end.call(res)), listeners.forEach((p) => compress.on.apply(compress, p))) : (pendingListeners = null, listeners.forEach((p) => on.apply(res, p))), writeHead.call(res, pendingStatus || res.statusCode);
    }
    let { end, write, on, writeHead } = res;
    res.writeHead = function(status, reason, headers) {
      if (typeof reason != "string" && ([headers, reason] = [reason, headers]), headers) for (let k in headers) res.setHeader(k, headers[k]);
      return pendingStatus = status, this;
    }, res.write = function(chunk, enc) {
      return size += getChunkSize(chunk, enc), started || start2(), compress ? compress.write.apply(compress, arguments) : write.apply(this, arguments);
    }, res.end = function(chunk, enc) {
      return arguments.length > 0 && typeof chunk != "function" && (size += getChunkSize(chunk, enc)), started || start2(), compress ? compress.end.apply(compress, arguments) : end.apply(this, arguments);
    }, res.on = function(type, listener) {
      return pendingListeners ? compress ? compress.on(type, listener) : pendingListeners.push([type, listener]) : on.call(this, type, listener), this;
    }, next();
  };
}

// ../../node_modules/polka/build.mjs
import http from "node:http";
import { setImmediate } from "node:timers";

// ../../node_modules/regexparam/dist/index.mjs
function parse3(input, loose) {
  if (input instanceof RegExp) return { keys: !1, pattern: input };
  var c, o, tmp, ext, keys = [], pattern = "", arr = input.split("/");
  for (arr[0] || arr.shift(); tmp = arr.shift(); )
    c = tmp[0], c === "*" ? (keys.push(c), pattern += tmp[1] === "?" ? "(?:/(.*))?" : "/(.*)") : c === ":" ? (o = tmp.indexOf("?", 1), ext = tmp.indexOf(".", 1), keys.push(tmp.substring(1, ~o ? o : ~ext ? ext : tmp.length)), pattern += ~o && !~ext ? "(?:/([^/]+?))?" : "/([^/]+?)", ~ext && (pattern += (~o ? "?" : "") + "\\" + tmp.substring(ext))) : pattern += "/" + tmp;
  return {
    keys,
    pattern: new RegExp("^" + pattern + (loose ? "(?=$|/)" : "/?$"), "i")
  };
}

// ../../node_modules/trouter/index.mjs
var MAP = {
  "": 0,
  GET: 1,
  HEAD: 2,
  PATCH: 3,
  OPTIONS: 4,
  CONNECT: 5,
  DELETE: 6,
  TRACE: 7,
  POST: 8,
  PUT: 9
}, Trouter = class {
  constructor() {
    this.routes = [], this.all = this.add.bind(this, ""), this.get = this.add.bind(this, "GET"), this.head = this.add.bind(this, "HEAD"), this.patch = this.add.bind(this, "PATCH"), this.options = this.add.bind(this, "OPTIONS"), this.connect = this.add.bind(this, "CONNECT"), this.delete = this.add.bind(this, "DELETE"), this.trace = this.add.bind(this, "TRACE"), this.post = this.add.bind(this, "POST"), this.put = this.add.bind(this, "PUT");
  }
  use(route, ...fns) {
    let handlers = [].concat.apply([], fns), { keys, pattern } = parse3(route, !0);
    return this.routes.push({ keys, pattern, method: "", handlers, midx: MAP[""] }), this;
  }
  add(method, route, ...fns) {
    let { keys, pattern } = parse3(route), handlers = [].concat.apply([], fns);
    return this.routes.push({ keys, pattern, method, handlers, midx: MAP[method] }), this;
  }
  find(method, url) {
    let midx = MAP[method], isHEAD = midx === 2, i2 = 0, j = 0, k, tmp, arr = this.routes, matches = [], params = {}, handlers = [];
    for (; i2 < arr.length; i2++)
      if (tmp = arr[i2], tmp.midx === midx || tmp.midx === 0 || isHEAD && tmp.midx === 1)
        if (tmp.keys === !1) {
          if (matches = tmp.pattern.exec(url), matches === null) continue;
          if (matches.groups !== void 0) for (k in matches.groups) params[k] = matches.groups[k];
          tmp.handlers.length > 1 ? handlers = handlers.concat(tmp.handlers) : handlers.push(tmp.handlers[0]);
        } else if (tmp.keys.length > 0) {
          if (matches = tmp.pattern.exec(url), matches === null) continue;
          for (j = 0; j < tmp.keys.length; ) params[tmp.keys[j]] = matches[++j];
          tmp.handlers.length > 1 ? handlers = handlers.concat(tmp.handlers) : handlers.push(tmp.handlers[0]);
        } else tmp.pattern.test(url) && (tmp.handlers.length > 1 ? handlers = handlers.concat(tmp.handlers) : handlers.push(tmp.handlers[0]));
    return { params, handlers };
  }
};

// ../../node_modules/@polka/url/build.mjs
import * as qs from "node:querystring";
function parse5(req) {
  let raw = req.url;
  if (raw == null) return;
  let prev = req._parsedUrl;
  if (prev && prev.raw === raw) return prev;
  let pathname = raw, search2 = "", query, hash;
  if (raw.length > 1) {
    let idx = raw.indexOf("#", 1);
    idx !== -1 && (hash = raw.substring(idx), pathname = raw.substring(0, idx)), idx = pathname.indexOf("?", 1), idx !== -1 && (search2 = pathname.substring(idx), pathname = pathname.substring(0, idx), search2.length > 1 && (query = qs.parse(search2.substring(1))));
  }
  return req._parsedUrl = { pathname, search: search2, query, hash, raw };
}

// ../../node_modules/polka/build.mjs
function onError(err, req, res) {
  let code = typeof err.status == "number" && err.status;
  code = res.statusCode = code && code >= 100 ? code : 500, typeof err == "string" || Buffer.isBuffer(err) ? res.end(err) : res.end(err.message || http.STATUS_CODES[code]);
}
var mount = (fn) => fn instanceof Polka ? fn.attach : fn, Polka = class _Polka extends Trouter {
  constructor(opts = {}) {
    super(), this.parse = parse5, this.server = opts.server, this.handler = this.handler.bind(this), this.onError = opts.onError || onError, this.onNoMatch = opts.onNoMatch || this.onError.bind(null, { status: 404 }), this.attach = (req, res) => setImmediate(this.handler, req, res);
  }
  use(base, ...fns) {
    return base === "/" ? super.use(base, fns.map(mount)) : typeof base == "function" || base instanceof _Polka ? super.use("/", [base, ...fns].map(mount)) : super.use(
      base,
      (req, _, next) => {
        if (typeof base == "string") {
          let len = base.length;
          base.startsWith("/") || len++, req.url = req.url.substring(len) || "/", req.path = req.path.substring(len) || "/";
        } else
          req.url = req.url.replace(base, "") || "/", req.path = req.path.replace(base, "") || "/";
        req.url.charAt(0) !== "/" && (req.url = "/" + req.url), next();
      },
      fns.map(mount),
      (req, _, next) => {
        req.path = req._parsedUrl.pathname, req.url = req.path + req._parsedUrl.search, next();
      }
    ), this;
  }
  listen() {
    return (this.server = this.server || http.createServer()).on("request", this.attach), this.server.listen.apply(this.server, arguments), this;
  }
  handler(req, res, next) {
    let info = this.parse(req), path2 = info.pathname, obj = this.find(req.method, req.path = path2);
    if (req.url = path2 + info.search, req.originalUrl = req.originalUrl || req.url, req.query = info.query || {}, req.search = info.search, req.params = obj.params, path2.length > 1 && path2.indexOf("%", 1) !== -1)
      for (let k in req.params)
        try {
          req.params[k] = decodeURIComponent(req.params[k]);
        } catch {
        }
    let i2 = 0, arr = obj.handlers.concat(this.onNoMatch), len = arr.length, loop = async () => res.finished || i2 < len && arr[i2++](req, res, next);
    (next = next || ((err) => err ? this.onError(err, req, res, next) : loop().catch(next)))();
  }
};
function build_default2(opts) {
  return new Polka(opts);
}

// ../../node_modules/dequal/dist/index.mjs
var has = Object.prototype.hasOwnProperty;
function find(iter, tar, key2) {
  for (key2 of iter.keys())
    if (dequal(key2, tar)) return key2;
}
function dequal(foo, bar) {
  var ctor, len, tmp;
  if (foo === bar) return !0;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();
    if (ctor === Array) {
      if ((len = foo.length) === bar.length)
        for (; len-- && dequal(foo[len], bar[len]); ) ;
      return len === -1;
    }
    if (ctor === Set) {
      if (foo.size !== bar.size)
        return !1;
      for (len of foo)
        if (tmp = len, tmp && typeof tmp == "object" && (tmp = find(bar, tmp), !tmp) || !bar.has(tmp)) return !1;
      return !0;
    }
    if (ctor === Map) {
      if (foo.size !== bar.size)
        return !1;
      for (len of foo)
        if (tmp = len[0], tmp && typeof tmp == "object" && (tmp = find(bar, tmp), !tmp) || !dequal(len[1], bar.get(tmp)))
          return !1;
      return !0;
    }
    if (ctor === ArrayBuffer)
      foo = new Uint8Array(foo), bar = new Uint8Array(bar);
    else if (ctor === DataView) {
      if ((len = foo.byteLength) === bar.byteLength)
        for (; len-- && foo.getInt8(len) === bar.getInt8(len); ) ;
      return len === -1;
    }
    if (ArrayBuffer.isView(foo)) {
      if ((len = foo.byteLength) === bar.byteLength)
        for (; len-- && foo[len] === bar[len]; ) ;
      return len === -1;
    }
    if (!ctor || typeof foo == "object") {
      len = 0;
      for (ctor in foo)
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor) || !(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return !1;
      return Object.keys(bar).length === len;
    }
  }
  return foo !== foo && bar !== bar;
}

// src/core-server/change-detection/change-detection-service.ts
import { logger as logger9 } from "storybook/internal/node-logger";
import { CHANGE_DETECTION_STATUS_TYPE_ID } from "storybook/internal/types";

// src/core-server/change-detection/errors.ts
var ChangeDetectionUnavailableError = class extends Error {
  constructor(message, options) {
    super(message, options), this.name = "ChangeDetectionUnavailableError";
  }
}, ChangeDetectionFailureError = class extends Error {
  constructor(message, options) {
    super(message, options), this.name = "ChangeDetectionFailureError";
  }
};

// src/core-server/change-detection/GitDiffProvider.ts
import { watch } from "node:fs";
import { readFile as readFile3, stat } from "node:fs/promises";
import { logger as logger8 } from "storybook/internal/node-logger";
function parseChangedFiles(stdout) {
  return new Set(
    stdout.split(`
`).map((line) => line.trim()).filter(Boolean)
  );
}
var GitDiffProvider = class {
  constructor(cwd = process.cwd(), fileSystem = { watch, readFile: readFile3, stat }) {
    this.cwd = cwd;
    this.fileSystem = fileSystem;
    this.gitStateCallback = () => {
    };
    this.watchingInitialized = !1;
    this.watchingStopped = !1;
  }
  async getRepoRoot() {
    if (this.repoRoot)
      return this.repoRoot;
    try {
      let { stdout } = await execa("git", ["rev-parse", "--show-toplevel"], {
        cwd: this.cwd,
        stdio: "pipe",
        // Prevent git from acquiring .git/index.lock for stat-cache refreshes
        // during read-only operations. Without this, parallel scans can race
        // an interactive `git commit` and break the user's commit with
        // "Unable to create '.git/index.lock': File exists".
        env: { GIT_OPTIONAL_LOCKS: "0" }
      });
      return this.repoRoot = stdout.trim(), this.repoRoot;
    } catch (error) {
      throw this.toGitError(error, "git rev-parse --show-toplevel");
    }
  }
  async getChangedFiles() {
    let repoRoot = await this.getRepoRoot(), runGitCommand = (args) => this.runGitCommand(repoRoot, args), [staged, unstaged, added, intentToAdd, untracked] = await Promise.all([
      runGitCommand(["diff", "--name-only", "--diff-filter=ad", "--cached"]),
      runGitCommand(["diff", "--name-only", "--diff-filter=ad"]),
      runGitCommand(["diff", "--name-only", "--diff-filter=A", "--cached"]),
      runGitCommand(["diff", "--name-only", "--diff-filter=A"]),
      runGitCommand(["ls-files", "--others", "--exclude-standard"])
    ]);
    return {
      changed: /* @__PURE__ */ new Set([
        ...parseChangedFiles(staged.stdout),
        ...parseChangedFiles(unstaged.stdout)
      ]),
      new: /* @__PURE__ */ new Set([
        ...parseChangedFiles(added.stdout),
        ...parseChangedFiles(intentToAdd.stdout),
        ...parseChangedFiles(untracked.stdout)
      ])
    };
  }
  async getHeadCommit() {
    let repoRoot = await this.getRepoRoot(), { stdout } = await this.runGitCommand(repoRoot, ["rev-parse", "HEAD"]);
    return stdout.trim();
  }
  async isWorkingTreeClean() {
    let repoRoot = await this.getRepoRoot(), { stdout } = await this.runGitCommand(repoRoot, ["status", "--porcelain"]);
    return stdout.trim().length === 0;
  }
  onGitStateChange(callback) {
    this.gitStateCallback = callback, !this.watchingInitialized && !this.watchingStopped && (this.watchingInitialized = !0, this.initializeWatching());
  }
  async initializeWatching() {
    try {
      let gitDir = await this.getGitDir();
      this.headWatcher = this.attachWatcher({
        filePath: gitDir,
        currentWatcher: this.headWatcher,
        onChange: () => {
          this.gitStateCallback(), this.reconfigureBranchWatcher(gitDir);
        }
      }), this.packedRefsWatcher = this.attachWatcher({
        filePath: gitDir,
        currentWatcher: this.packedRefsWatcher,
        onChange: () => {
          this.gitStateCallback();
        }
      }), await this.configureBranchWatcher(gitDir);
    } catch {
    }
  }
  attachWatcher(options) {
    let { filePath, currentWatcher, onChange } = options;
    if (!this.watchingStopped)
      try {
        let watcher = this.fileSystem.watch(filePath, { persistent: !1 }, () => {
          this.watchingStopped || onChange();
        });
        return currentWatcher?.close(), watcher.on("error", () => {
          watcher.close(), this.headWatcher === watcher && (this.headWatcher = void 0), this.packedRefsWatcher === watcher && (this.packedRefsWatcher = void 0), this.branchWatcher === watcher && (this.branchWatcher = void 0), this.stopWatching(), logger8.warn(
            `Change detection git watcher failed for ${filePath}. Git state updates may stop until restart.`
          );
        }), watcher;
      } catch (error) {
        if (this.isEnoentError(error))
          return;
        throw error;
      }
  }
  async configureBranchWatcher(gitDir) {
    let branchRef = await this.readHeadRef(gitDir);
    this.branchWatcher?.close(), this.branchWatcher = void 0;
    let watchBranch = (filePath) => (this.branchWatcher = this.attachWatcher({
      filePath,
      currentWatcher: this.branchWatcher,
      onChange: () => {
        this.gitStateCallback(), this.reconfigureBranchWatcher(gitDir);
      }
    }), this.branchWatcher);
    branchRef?.startsWith("refs/heads/") && (watchBranch(dirname(join(gitDir, branchRef))) || watchBranch(join(gitDir, "refs", "heads")));
  }
  reconfigureBranchWatcher(gitDir) {
    this.configureBranchWatcher(gitDir).catch(() => {
      logger8.warn("Change detection failed to reconfigure git branch watcher."), this.stopWatching();
    });
  }
  dispose() {
    this.stopWatching();
  }
  stopWatching() {
    this.watchingStopped || (this.watchingStopped = !0, this.headWatcher?.close(), this.headWatcher = void 0, this.packedRefsWatcher?.close(), this.packedRefsWatcher = void 0, this.branchWatcher?.close(), this.branchWatcher = void 0);
  }
  async getGitDir() {
    let repoRoot = await this.getRepoRoot(), gitPath = join(repoRoot, ".git");
    try {
      let gitStat = await this.fileSystem.stat(gitPath);
      if (gitStat.isDirectory())
        return gitPath;
      if (gitStat.isFile()) {
        let gitPointer = await this.fileSystem.readFile(gitPath, "utf8"), match = /^gitdir:\s+(.+)$/m.exec(gitPointer.trim());
        if (match)
          return resolve(repoRoot, match[1]);
      }
    } catch (error) {
      if (!this.isEnoentError(error))
        throw error;
    }
    return gitPath;
  }
  async readHeadRef(gitDir) {
    try {
      let headContents = await this.fileSystem.readFile(join(gitDir, "HEAD"), "utf8");
      return /^ref:\s+(.+)$/m.exec(headContents.trim())?.[1];
    } catch (error) {
      if (!this.isEnoentError(error))
        throw error;
    }
  }
  async runGitCommand(repoRoot, args) {
    try {
      return await execa("git", args, {
        cwd: repoRoot,
        stdio: "pipe",
        // GIT_OPTIONAL_LOCKS=0 disables the stat-cache refresh that
        // `git status` and `git diff` would otherwise write into
        // .git/index.lock. The diff/status output stays correct; we only
        // skip the optional cache update. This prevents change detection
        // scans from racing an interactive `git commit` running in the
        // user's shell.
        env: { GIT_OPTIONAL_LOCKS: "0" }
      });
    } catch (error) {
      throw this.toGitError(error, `git ${args.join(" ")}`);
    }
  }
  isEnoentError(error) {
    return !!(error && typeof error == "object" && "code" in error && error.code === "ENOENT");
  }
  toGitError(error, command) {
    let execaError = error, stderr = [execaError.stderr, execaError.shortMessage, execaError.message].filter(Boolean).join(`
`);
    return execaError.code === "ENOENT" ? new ChangeDetectionUnavailableError("git is not available", { cause: error }) : stderr.includes("not a git repository") ? new ChangeDetectionUnavailableError("not a git repository", {
      cause: error
    }) : new ChangeDetectionFailureError(`${command} failed${stderr ? `: ${stderr}` : ""}`, {
      cause: error
    });
  }
};

// src/core-server/change-detection/IndexBaselineService.ts
import { createFileSystemCache, resolvePathInStorybookCache } from "storybook/internal/common";
var DEFAULT_CACHE_KEY = "index-baseline";
function extractBaselineEntryIds(storyIndex) {
  let entryIds = /* @__PURE__ */ new Set();
  return Object.values(storyIndex.entries).forEach((entry) => {
    (entry.type === "story" || entry.type === "docs") && !entry.importPath.startsWith("virtual:") && entryIds.add(entry.id);
  }), entryIds;
}
var IndexBaselineService = class {
  constructor(options) {
    this.options = options;
    this.baselineEntryIds = /* @__PURE__ */ new Set();
    this.syncInFlight = !1;
    this.cache = options.cache ?? createFileSystemCache({
      basePath: resolvePathInStorybookCache(DEFAULT_CACHE_KEY),
      ns: "storybook"
    });
  }
  start() {
    return this.initializePromise || (this.initializePromise = this.initialize().catch(() => {
      this.baselineEntryIds = /* @__PURE__ */ new Set();
    })), this.initializePromise;
  }
  async getBaselineEntryIds() {
    return await this.start(), new Set(this.baselineEntryIds);
  }
  async handleGitStateChange() {
    if (await this.start(), !this.syncInFlight)
      try {
        if (this.syncInFlight = !0, !await this.options.gitDiffProvider.isWorkingTreeClean())
          return;
        let headCommit = await this.options.gitDiffProvider.getHeadCommit();
        await this.refreshBaseline(headCommit), this.options.onBaselineUpdated();
      } finally {
        this.syncInFlight = !1;
      }
  }
  async initialize() {
    if (!await this.options.gitDiffProvider.isWorkingTreeClean()) {
      await this.refreshBaseline();
      return;
    }
    let headCommit = await this.options.gitDiffProvider.getHeadCommit(), cachedSnapshot = await this.cache.get(headCommit);
    if (cachedSnapshot?.entryIds?.length) {
      this.baselineEntryIds = new Set(cachedSnapshot.entryIds);
      return;
    }
    await this.refreshBaseline(headCommit);
  }
  async refreshBaseline(persistenceKey) {
    let storyIndex = await (await this.options.storyIndexGeneratorPromise).getIndex(), entryIds = Array.from(extractBaselineEntryIds(storyIndex)).sort();
    this.baselineEntryIds = new Set(entryIds), persistenceKey && await this.cache.set(persistenceKey, { entryIds });
  }
};

// src/core-server/change-detection/readiness.ts
function createDeferred() {
  let resolve4;
  return {
    promise: new Promise((fulfill) => {
      resolve4 = fulfill;
    }),
    resolve: resolve4
  };
}
var readinessDeferred = createDeferred(), readinessState;
function getChangeDetectionReadiness() {
  return readinessState ? Promise.resolve(readinessState) : readinessDeferred.promise;
}
function setChangeDetectionReadiness(readiness) {
  readinessState || (readinessState = readiness, readinessDeferred.resolve(readiness));
}
function resetChangeDetectionReadiness() {
  readinessDeferred = createDeferred(), readinessState = void 0;
}

// src/core-server/change-detection/change-detection-service.ts
var CHANGE_DETECTION_DEBOUNCE_MS = 200;
function errorLikeToError(errorLike) {
  let error = new Error(errorLike.message, {
    cause: errorLike.cause ? errorLikeToError(errorLike.cause) : void 0
  });
  return error.name = errorLike.name ?? error.name, errorLike.stack && (error.stack = errorLike.stack), error;
}
function isSameStatus(a, b) {
  return a ? a.storyId === b.storyId && a.typeId === b.typeId && a.value === b.value && a.title === b.title && a.description === b.description && a.sidebarContextMenu === b.sidebarContextMenu && dequal(a.data, b.data) : !1;
}
function mergeStatusValues(previousValue, nextValue) {
  return previousValue === "status-value:new" || nextValue === "status-value:new" ? "status-value:new" : previousValue === "status-value:modified" || nextValue === "status-value:modified" ? "status-value:modified" : previousValue === "status-value:affected" || nextValue === "status-value:affected" ? "status-value:affected" : nextValue;
}
function mergeChangeDetectionStatuses(existing, incoming) {
  return {
    ...incoming,
    value: mergeStatusValues(existing?.value, incoming.value),
    title: incoming.title || existing?.title || "",
    description: incoming.description || existing?.description || "",
    sidebarContextMenu: incoming.sidebarContextMenu ?? existing?.sidebarContextMenu ?? !1
  };
}
function buildIndexBaselineStatuses(storyIndex, baselineEntryIds) {
  let statuses = /* @__PURE__ */ new Map();
  if (baselineEntryIds.size === 0)
    return statuses;
  for (let entryId of extractBaselineEntryIds(storyIndex))
    baselineEntryIds.has(entryId) || statuses.set(entryId, {
      storyId: entryId,
      typeId: CHANGE_DETECTION_STATUS_TYPE_ID,
      value: "status-value:new",
      title: "",
      description: "",
      sidebarContextMenu: !1
    });
  return statuses;
}
var ChangeDetectionService = class {
  constructor(options) {
    this.options = options;
    this.disposed = !1;
    this.scanInFlight = !1;
    this.rerunAfterCurrentScan = !1;
    this.readinessResolved = !1;
    this.statusPipelineStarted = !1;
    this.changeDetectionEnabled = !1;
    this.previousStatuses = /* @__PURE__ */ new Map();
    this.gitDiffProvider = options.gitDiffProvider, this.indexBaselineService = options.indexBaselineService, this.workingDir = options.workingDir ?? process.cwd(), this.debounceMs = options.debounceMs ?? CHANGE_DETECTION_DEBOUNCE_MS, resetChangeDetectionReadiness();
  }
  getModuleGraph() {
    return getService("core/module-graph");
  }
  /** True while the service is live and change-detection status publishing is enabled. */
  isActive() {
    return !this.disposed && this.changeDetectionEnabled;
  }
  onGraphReady() {
    this.isActive() && this.startStatusPipeline();
  }
  onGraphChange() {
    this.isActive() && this.scheduleScan(this.debounceMs);
  }
  onGraphError(error) {
    this.isActive() && (this.resolveReadiness({ status: "error", error }), this.dispose().catch(() => {
    }));
  }
  onGraphUnavailable(reason, error) {
    this.isActive() && (logger9.warn(`Change detection unavailable: ${reason}`), this.resolveReadiness({ status: "unavailable", reason, error }), this.dispose());
  }
  onModuleGraphStatus(status) {
    if (this.isActive()) {
      if (status.value === "ready") {
        this.onGraphReady();
        return;
      }
      if (status.value === "error") {
        this.onGraphError(errorLikeToError(status.error));
        return;
      }
      status.value === "unavailable" && this.onGraphUnavailable(
        status.reason,
        status.error ? errorLikeToError(status.error) : void 0
      );
    }
  }
  start(enabled) {
    if (enabled === !1) {
      logger9.debug("Change detection disabled."), this.resolveReadiness({
        status: "unavailable",
        reason: "disabled"
      });
      return;
    }
    logger9.debug("Change detection enabled."), this.changeDetectionEnabled = !0;
    let moduleGraph = this.getModuleGraph();
    this.unsubscribeModuleGraphStatus = moduleGraph.queries.status.subscribe(
      void 0,
      ({ data: data2 }) => {
        data2 !== void 0 && this.onModuleGraphStatus(data2);
      }
    ), this.unsubscribeModuleGraphRevision = moduleGraph.queries.graphRevision.subscribe(
      void 0,
      ({ data: data2 }) => {
        (data2 ?? 0) > 0 && this.onGraphChange();
      }
    ), moduleGraph.queries.status.loaded(void 0).then((status) => {
      this.onModuleGraphStatus(status);
    }).catch((error) => {
      this.onGraphError(error instanceof Error ? error : new Error(String(error)));
    });
  }
  /**
   * Wires the git-diff-driven status pipeline. Runs once the dependency graph is ready (so the
   * initial scan and every git-state-change scan read a populated reverse index).
   */
  startStatusPipeline() {
    this.disposed || this.statusPipelineStarted || (this.statusPipelineStarted = !0, this.getIndexBaselineService().start(), this.getGitDiffProvider().onGitStateChange(() => {
      this.disposed || (this.scheduleScan(this.debounceMs), this.getIndexBaselineService().handleGitStateChange().catch(() => {
      }));
    }), this.scheduleScan(0));
  }
  async dispose() {
    this.disposed || (this.disposed = !0, this.rerunAfterCurrentScan = !1, this.debounceTimer && (clearTimeout(this.debounceTimer), this.debounceTimer = void 0), this.gitDiffProvider?.dispose(), this.unsubscribeModuleGraphStatus?.(), this.unsubscribeModuleGraphStatus = void 0, this.unsubscribeModuleGraphRevision?.(), this.unsubscribeModuleGraphRevision = void 0);
  }
  scheduleScan(delayMs) {
    this.debounceTimer && clearTimeout(this.debounceTimer), this.debounceTimer = setTimeout(() => {
      this.debounceTimer = void 0, this.scan();
    }, delayMs);
  }
  async scan() {
    if (this.disposed)
      return;
    let status = await this.getModuleGraph().queries.status.loaded(void 0);
    if (!(this.disposed || status.value !== "ready")) {
      if (this.scanInFlight) {
        this.rerunAfterCurrentScan = !0;
        return;
      }
      this.scanInFlight = !0;
      try {
        let nextStatuses = await this.buildStatuses();
        if (this.disposed)
          return;
        this.applyStatusStorePatch(nextStatuses), this.resolveReadiness({ status: "ready" });
      } catch (error) {
        if (this.disposed)
          return;
        if (error instanceof ChangeDetectionUnavailableError)
          logger9.warn(`Change detection unavailable: ${error.message}`), this.resolveReadiness({
            status: "unavailable",
            reason: error.message,
            error
          }), await this.dispose();
        else if (error instanceof ChangeDetectionFailureError)
          logger9.error(`Change detection failed: ${error.message}`), this.resolveReadiness({
            status: "error",
            error
          });
        else {
          let failure = new ChangeDetectionFailureError(
            error instanceof Error ? error.message : String(error),
            { cause: error instanceof Error ? error : void 0 }
          );
          logger9.error(`Change detection failed: ${failure.message}`), this.resolveReadiness({
            status: "error",
            error: failure
          });
        }
      } finally {
        this.scanInFlight = !1, !this.disposed && this.rerunAfterCurrentScan && (this.rerunAfterCurrentScan = !1, this.scan());
      }
    }
  }
  async buildStatuses() {
    let gitDiffProvider = this.getGitDiffProvider(), [changes, repoRoot, storyIndexGenerator, baselineEntryIds] = await Promise.all([
      gitDiffProvider.getChangedFiles(),
      gitDiffProvider.getRepoRoot(),
      this.options.storyIndexGeneratorPromise,
      this.getIndexBaselineService().getBaselineEntryIds()
    ]), changedFiles = new Set(
      Array.from(changes.changed).map((path2) => normalize(join(repoRoot, path2)))
    ), newFiles = new Set(
      Array.from(changes.new).map((path2) => normalize(join(repoRoot, path2)))
    ), scannedFiles = /* @__PURE__ */ new Set([...changedFiles, ...newFiles]), storyIndex = await storyIndexGenerator.getIndex(), baselineStatuses = buildIndexBaselineStatuses(storyIndex, baselineEntryIds), storyIdsByFile = getStoryIdsByAbsolutePath(storyIndex, this.workingDir), statuses = /* @__PURE__ */ new Map(), scannedFilesArray = [...scannedFiles], lookupResults = await this.getModuleGraph().queries.storiesForFiles.loaded({
      files: scannedFilesArray
    });
    for (let i2 = 0; i2 < scannedFilesArray.length; i2++) {
      let changedFile = scannedFilesArray[i2], allEntries = /* @__PURE__ */ new Map();
      for (let { storyFile, depth } of lookupResults[i2])
        allEntries.set(storyIndexPathToAbsolutePath(storyFile, this.workingDir), depth);
      if (storyIdsByFile.has(changedFile) && allEntries.set(changedFile, 0), allEntries.size === 0)
        continue;
      let lowestDistance = Number.POSITIVE_INFINITY;
      for (let distance of allEntries.values())
        distance < lowestDistance && (lowestDistance = distance);
      for (let [storyFile, distance] of allEntries.entries()) {
        let storyIds = storyIdsByFile.get(storyFile);
        if (!storyIds)
          continue;
        let value = newFiles.has(storyFile) ? "status-value:new" : distance === lowestDistance ? "status-value:modified" : "status-value:affected";
        storyIds.forEach((storyId) => {
          let existingStatus = statuses.get(storyId), nextStatus = {
            storyId,
            typeId: CHANGE_DETECTION_STATUS_TYPE_ID,
            value: mergeStatusValues(existingStatus?.value, value),
            title: "",
            description: "",
            sidebarContextMenu: !1
          };
          statuses.set(storyId, mergeChangeDetectionStatuses(existingStatus, nextStatus));
        });
      }
    }
    return baselineStatuses.forEach((status, storyId) => {
      statuses.set(storyId, mergeChangeDetectionStatuses(statuses.get(storyId), status));
    }), statuses;
  }
  getGitDiffProvider() {
    return this.gitDiffProvider ??= new GitDiffProvider(this.workingDir), this.gitDiffProvider;
  }
  getIndexBaselineService() {
    return this.indexBaselineService ??= new IndexBaselineService({
      storyIndexGeneratorPromise: this.options.storyIndexGeneratorPromise,
      gitDiffProvider: this.getGitDiffProvider(),
      onBaselineUpdated: () => this.scheduleScan(this.debounceMs)
    }), this.indexBaselineService;
  }
  applyStatusStorePatch(nextStatuses) {
    let removedStoryIds = Array.from(this.previousStatuses.keys()).filter(
      (storyId) => !nextStatuses.has(storyId)
    ), changedStatuses = Array.from(nextStatuses.values()).filter(
      (status) => !isSameStatus(this.previousStatuses.get(status.storyId), status)
    );
    removedStoryIds.length === 0 && changedStatuses.length === 0 || (removedStoryIds.length > 0 && this.options.statusStore.unset(removedStoryIds), changedStatuses.length > 0 && this.options.statusStore.set(changedStatuses), this.previousStatuses = new Map(nextStatuses));
  }
  resolveReadiness(readiness) {
    this.readinessResolved || (this.readinessResolved = !0, setChangeDetectionReadiness(readiness));
  }
};

// src/core-server/stores/status.ts
var statusStore = createStatusStore({
  universalStatusStore: UniversalStore.create({
    ...UNIVERSAL_STATUS_STORE_OPTIONS,
    /*
      This is a temporary workaround, to ensure that the store is not created in the
      vitest sub-process in addon-vitest, even though it imports from core-server
      If it was created in the sub-process, it would try to connect to the leader in the dev server
      before it was ready.
      This will be fixed when we do the planned UniversalStore v0.2.
    */
    leader: !optionalEnvToBoolean(process.env.VITEST_CHILD_PROCESS)
  }),
  environment: "server"
}), { fullStatusStore, getStatusStoreByTypeId, universalStatusStore } = statusStore;

// src/core-server/utils/doTelemetry.ts
import { getPrecedingUpgrade as getPrecedingUpgrade2, telemetry as telemetry3 } from "storybook/internal/telemetry";

// src/core-server/utils/versionStatus.ts
var versionStatus = (versionCheck) => versionCheck.error ? "error" : versionCheck.cached ? "cached" : "success";

// src/core-server/utils/doTelemetry.ts
async function doTelemetry(app, core3, storyIndexGeneratorPromise, options) {
  let { versionCheck, versionUpdates } = options;
  invariant(
    !versionUpdates || versionUpdates && versionCheck,
    "versionCheck should be defined when versionUpdates is true"
  ), telemetry3(
    "dev",
    async () => {
      let generator = await storyIndexGeneratorPromise, indexAndStats;
      try {
        indexAndStats = await generator?.getIndexAndStats();
      } catch (err) {
        return { error: err instanceof Error ? err : new Error("encountered a non-recoverable error") };
      }
      let payload = {
        precedingUpgrade: await getPrecedingUpgrade2()
      };
      return indexAndStats && Object.assign(payload, {
        versionStatus: versionUpdates && versionCheck ? versionStatus(versionCheck) : "disabled",
        storyIndex: summarizeIndex(indexAndStats.storyIndex),
        storyStats: indexAndStats.stats
      }), payload;
    },
    { configDir: options.configDir }
  );
}

// src/core-server/utils/get-caching-middleware.ts
function getCachingMiddleware() {
  return (req, res, next) => {
    res.setHeader("Cache-Control", "no-store"), next();
  };
}

// src/core-server/utils/getAccessControlMiddleware.ts
function getAccessControlMiddleware(crossOriginIsolated) {
  return (req, res, next) => {
    crossOriginIsolated && (res.setHeader("Cross-Origin-Opener-Policy", "same-origin"), res.setHeader("Cross-Origin-Embedder-Policy", "require-corp")), next();
  };
}

// ../../node_modules/host-validation-middleware/dist/index.js
import net from "node:net";
function extractHostNameFromHostHeader(hostHeader) {
  let trimmedHost = hostHeader.trim();
  if (trimmedHost[0] === "[") {
    let endIpv6 = trimmedHost.indexOf("]");
    return endIpv6 < 0 ? { type: "invalid" } : net.isIP(trimmedHost.slice(1, endIpv6)) === 6 ? { type: "ipv6" } : { type: "invalid" };
  }
  let colonPos = trimmedHost.indexOf(":"), hostname = colonPos === -1 ? trimmedHost : trimmedHost.slice(0, colonPos);
  return net.isIP(hostname) === 4 ? { type: "ipv4" } : {
    type: "hostname",
    value: hostname
  };
}
var isFileOrExtensionProtocolRE = /^(?:file|.+-extension):/i;
function isHostAllowedInternal(hostHeader, allowedHosts) {
  if (isFileOrExtensionProtocolRE.test(hostHeader)) return !0;
  let extracted = extractHostNameFromHostHeader(hostHeader);
  if (extracted.type === "invalid") return !1;
  if (extracted.type === "ipv4" || extracted.type === "ipv6") return !0;
  let hostname = extracted.value;
  if (hostname === "localhost" || hostname.endsWith(".localhost")) return !0;
  for (let allowedHost of allowedHosts)
    if (allowedHost === hostname || allowedHost[0] === "." && (allowedHost.slice(1) === hostname || hostname.endsWith(allowedHost))) return !0;
  return !1;
}
var cache = /* @__PURE__ */ new WeakMap();
function isHostAllowed(hostHeader, allowedHosts) {
  if (hostHeader === void 0) return !0;
  let cachedAllowedHosts;
  if (Object.isFrozen(allowedHosts) && (cache.has(allowedHosts) || cache.set(allowedHosts, /* @__PURE__ */ new Set()), cachedAllowedHosts = cache.get(allowedHosts), cachedAllowedHosts.has(hostHeader)))
    return !0;
  let result = isHostAllowedInternal(hostHeader, allowedHosts);
  return cachedAllowedHosts && result && cachedAllowedHosts.add(hostHeader), result;
}

// src/core-server/utils/getHostValidationMiddleware.ts
var DEFAULT_ALLOWED_HOSTS = [], isValidHost = (host, options) => {
  let allowedHosts = options.allowedHosts ?? DEFAULT_ALLOWED_HOSTS;
  if (allowedHosts === !0)
    return !0;
  if (!host)
    return !1;
  try {
    return options.host === "0.0.0.0" && allowedHosts.length === 0 ? !0 : isHostAllowed(host, [
      ...allowedHosts,
      ...options.localAddress ? [new URL(options.localAddress).host] : [],
      ...options.networkAddress ? [new URL(options.networkAddress).host] : []
    ]);
  } catch {
    return !1;
  }
};
function getHostValidationMiddleware(options) {
  return (req, res, next) => {
    let host = req.headers.host;
    if ((options.allowedHosts ?? DEFAULT_ALLOWED_HOSTS) !== !0 && !isValidHost(host, options)) {
      res.writeHead(403, { "Content-Type": "text/plain" }), res.end("Invalid host");
      return;
    }
    next();
  };
}

// src/core-server/utils/middleware.ts
import { existsSync } from "node:fs";
var fileExists = (basename4) => [".js", ".mjs", ".cjs"].reduce((found, ext) => {
  let filename = `${basename4}${ext}`;
  return !found && existsSync(filename) ? filename : found;
}, "");
async function getMiddleware(configDir) {
  let middlewarePath = fileExists(resolve(configDir, "middleware"));
  if (middlewarePath) {
    let middlewareModule = await import("file://" + middlewarePath);
    return middlewareModule.default ?? middlewareModule;
  }
  return () => {
  };
}

// src/core-server/utils/open-browser/open-in-browser.ts
var import_ts_dedent = __toESM(require_dist(), 1);
import { logger as logger11 } from "storybook/internal/node-logger";
import open2 from "open";

// src/core-server/utils/open-browser/opener.ts
var import_cross_spawn = __toESM(require_cross_spawn(), 1), import_picocolors4 = __toESM(require_picocolors(), 1);
import { execSync } from "node:child_process";
import { join as join5 } from "node:path";
import { logger as logger10 } from "storybook/internal/node-logger";
import open from "open";
var OSX_CHROME = "google chrome";
function getBrowserEnv() {
  let value = process.env.BROWSER, args = process.env.BROWSER_ARGS ? process.env.BROWSER_ARGS.split(" ") : [];
  return value ? value.toLowerCase() === "none" ? { action: 0 /* NONE */ } : value.toLowerCase().endsWith(".js") || value.toLowerCase().endsWith(".mjs") || value.toLowerCase().endsWith(".cjs") || value.toLowerCase().endsWith(".ts") ? { action: 2 /* SCRIPT */, value, args } : value.toLowerCase().endsWith(".sh") ? { action: 3 /* SHELL_SCRIPT */, value, args } : { action: 1 /* BROWSER */, value, args } : { action: 1 /* BROWSER */, args };
}
var BrowserEnvError = class extends StorybookError {
  constructor(message) {
    super({
      category: "CORE_SERVER",
      code: 1,
      message,
      name: "BrowserEnvError"
    });
  }
};
function attachEventHandlers(child, scriptPath) {
  child.on("error", (error) => {
    logger10.error(
      `Failed to run script specified in BROWSER.
${import_picocolors4.default.cyan(scriptPath)}: ${error.message}`
    );
  }), child.on("close", (code) => {
    if (code !== 0) {
      logger10.error(
        `The script specified as BROWSER environment variable failed.
${import_picocolors4.default.cyan(scriptPath)} exited with code ${code}.`
      );
      return;
    }
  });
}
function executeNodeScript(scriptPath, url) {
  let extraArgs = process.argv.slice(2), child = (0, import_cross_spawn.default)(process.execPath, [scriptPath, ...extraArgs, url], {
    stdio: "inherit"
  });
  return attachEventHandlers(child, scriptPath), !0;
}
function executeShellScript(scriptPath, url) {
  let extraArgs = process.argv.slice(2), child = (0, import_cross_spawn.default)("sh", [scriptPath, ...extraArgs, url], {
    stdio: "inherit"
  });
  return attachEventHandlers(child, scriptPath), !0;
}
function startBrowserProcess(browser, url, args) {
  if (process.platform === "darwin" && (typeof browser != "string" || browser === OSX_CHROME)) {
    let supportedChromiumBrowsers = [
      "Google Chrome Canary",
      "Google Chrome Dev",
      "Google Chrome Beta",
      "Google Chrome",
      "Microsoft Edge",
      "Brave Browser",
      "Vivaldi",
      "Chromium"
    ];
    for (let chromiumBrowser of supportedChromiumBrowsers)
      try {
        execSync(`ps cax | grep "${chromiumBrowser}"`);
        let command = `osascript "${join5(
          resolvePackageDir("storybook"),
          "assets",
          "server",
          "openBrowser.applescript"
        )}" "`.concat(encodeURI(url), '" "').concat(
          process.env.OPEN_MATCH_HOST_ONLY === "true" ? encodeURI(new URL(url).origin) : encodeURI(url),
          '" "'
        ).concat(chromiumBrowser, '"');
        return execSync(command, {
          cwd: __dirname
        }), !0;
      } catch {
      }
  }
  process.platform === "darwin" && browser === "open" && (browser = void 0);
  try {
    return open(url, {
      app: browser ? { name: browser, arguments: args } : void 0,
      wait: !1,
      url: !0
    }).catch(() => {
    }), !0;
  } catch {
    return !1;
  }
}
function openBrowser(url) {
  let { action, value, args } = getBrowserEnv(), canRunShell = process.platform !== "win32";
  switch (action) {
    case 0 /* NONE */:
      return !1;
    case 2 /* SCRIPT */:
      return executeNodeScript(value, url);
    case 3 /* SHELL_SCRIPT */: {
      if (canRunShell)
        return executeShellScript(value, url);
      throw new BrowserEnvError(
        "Shell scripts are not supported on Windows PowerShell. Use WSL instead."
      );
    }
    case 1 /* BROWSER */:
      return startBrowserProcess(value, url, args);
    default:
      throw new BrowserEnvError("Not implemented.");
  }
}

// src/core-server/utils/open-browser/open-in-browser.ts
async function openInBrowser(address) {
  let errorOccurred = !1, openBrowserResult;
  try {
    openBrowserResult = await openBrowser(address);
  } catch {
    errorOccurred = !0;
  }
  if (openBrowserResult !== !1) {
    try {
      errorOccurred && (await open2(address), errorOccurred = !1);
    } catch {
      errorOccurred = !0;
    }
    if (errorOccurred) {
      let browserEnv = process.env.BROWSER, browserHint = browserEnv ? `

Note: BROWSER environment variable is set to "${browserEnv}". To disable browser opening, use BROWSER=none or the --ci flag.` : "";
      logger11.error(import_ts_dedent.dedent`
        Could not open ${address} inside a browser. If you're running this command inside a
        docker container or on a CI, you need to pass the '--ci' flag to prevent opening a
        browser by default.${browserHint}
      `);
    }
  }
}

// src/core-server/dev-server.ts
async function storybookDevServer(options, server) {
  let core3 = await options.presets.apply("core"), app = build_default2({ server }), workingDir = process.cwd(), configDir = options.configDir, features = await options.presets.apply("features"), stories = await options.presets.apply("stories"), normalizedStories = normalizeStories(stories, {
    configDir,
    workingDir
  }), storyIndexGeneratorPromise = options.presets.apply("storyIndexGenerator"), changeDetectionService = new ChangeDetectionService({
    storyIndexGeneratorPromise,
    statusStore: getStatusStoreByTypeId(CHANGE_DETECTION_STATUS_TYPE_ID2),
    workingDir
  }), disposeChangeDetectionRuntime = async () => {
    await changeDetectionService.dispose().catch(() => {
    });
  };
  if (app.use(build_default({ level: 1 })), typeof options.extendServer == "function" && options.extendServer(server), app.use(
    getHostValidationMiddleware({
      host: options.host,
      allowedHosts: core3?.allowedHosts,
      localAddress: options.localAddress,
      networkAddress: options.networkAddress
    })
  ), app.use(getAccessControlMiddleware(core3?.crossOriginIsolated ?? !1)), app.use(getCachingMiddleware()), registerIndexJsonRoute({
    app,
    storyIndexGeneratorPromise,
    normalizedStories,
    channel: options.channel,
    workingDir,
    configDir
  }), (await getMiddleware(options.configDir))(app), await options.presets.apply("experimental_devServer", app), !core3?.builder)
    throw new MissingBuilderError2();
  let resolvedPreviewBuilder = typeof core3?.builder == "string" ? core3.builder : core3?.builder?.name, [previewBuilder, managerBuilder] = await Promise.all([
    getPreviewBuilder(resolvedPreviewBuilder),
    getManagerBuilder(),
    useStatics(app, options)
  ]);
  options.debugWebpack && logConfig2("Preview webpack config", await previewBuilder.getConfig(options)), core3?.disableProjectJson || useStorybookMetadata(app, options.configDir);
  let managerResult = options.previewOnly ? void 0 : await managerBuilder.start({
    startTime: process.hrtime(),
    options,
    router: app,
    server,
    channel: options.channel
  }), previewResult = await Promise.resolve();
  if (!options.ignorePreview) {
    logger12.debug("Starting preview.."), previewResult = await previewBuilder.start({
      startTime: process.hrtime(),
      options,
      router: app,
      server,
      channel: options.channel
    }).catch(async (e) => {
      throw logger12.error("Failed to build the preview"), process.exitCode = 1, await disposeChangeDetectionRuntime(), await managerBuilder?.bail().catch(() => {
      }), await previewBuilder?.bail().catch(() => {
      }), e;
    });
    let adapter;
    try {
      adapter = previewBuilder.changeDetectionAdapter?.();
    } catch (err) {
      logger12.warn("Change detection: adapter initialisation failed"), logger12.debug(err instanceof Error ? err.stack ?? err.message : String(err));
    }
    resolveChangeDetectionAdapter(adapter), features.changeDetection !== !1 ? changeDetectionService.start(!0) : changeDetectionService.start(!1);
  }
  let listening = new Promise((resolve4, reject) => {
    server.once("error", reject), app.listen({ port: options.port, host: options.host }, resolve4);
  });
  try {
    let [indexGenerator] = await Promise.all([storyIndexGeneratorPromise, listening]);
    if (indexGenerator && !options.ci && !options.smokeTest && options.open) {
      let url = options.host ? options.networkAddress : options.localAddress;
      openInBrowser(options.previewOnly ? `${url}iframe.html?navigator=true` : url).catch(() => {
      });
    }
  } catch (e) {
    throw await disposeChangeDetectionRuntime(), await managerBuilder?.bail().catch(() => {
    }), await previewBuilder?.bail().catch(() => {
    }), e;
  }
  features?.componentsManifest && registerManifests({ app, presets: options.presets }), doTelemetry(app, core3, storyIndexGeneratorPromise, options);
  async function cancelTelemetry() {
    try {
      if (!isTelemetryModuleEnabled())
        return;
      let payload = { eventType: "dev" };
      try {
        let indexAndStats = await (await storyIndexGeneratorPromise)?.getIndexAndStats();
        indexAndStats && Object.assign(payload, {
          storyIndex: summarizeIndex(indexAndStats.storyIndex),
          storyStats: indexAndStats.stats
        });
      } catch {
      }
      await telemetry("canceled", payload, { immediate: !0 });
    } finally {
      await disposeChangeDetectionRuntime(), process.exit(0);
    }
  }
  return process.on("SIGINT", cancelTelemetry), process.on("SIGTERM", cancelTelemetry), { previewResult, managerResult };
}

// src/core-server/utils/get-server-channel.ts
var import_telejson3 = __toESM(require_dist2(), 1);
import { Channel as Channel3, HEARTBEAT_INTERVAL as HEARTBEAT_INTERVAL2, setChannel as setChannel2 } from "storybook/internal/channels";
import WebSocket2, { WebSocketServer } from "ws";

// src/core-server/utils/validate-token.ts
import { timingSafeEqual } from "node:crypto";
function isValidToken(requestToken, expectedToken) {
  if (!requestToken || !expectedToken)
    return !1;
  let a = new Uint8Array(Buffer.from(requestToken, "utf8")), b = new Uint8Array(Buffer.from(expectedToken, "utf8"));
  try {
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return !1;
  }
}

// src/core-server/utils/get-server-channel.ts
var ServerChannelTransport = class {
  constructor(server, options) {
    this.socket = new WebSocketServer({ noServer: !0 }), server.on("upgrade", (request, socket, head) => {
      try {
        let url = request.url && new URL(request.url, options.localAddress);
        if (!url || url.pathname !== "/storybook-server-channel")
          return;
        if (!options.skipValidation) {
          let originHost = request.headers.origin && new URL(request.headers.origin).host;
          if (!isValidHost(originHost, options))
            throw new Error("Invalid websocket origin");
          let requestToken = url.searchParams.get("token");
          if (!isValidToken(requestToken, options.token))
            throw new Error("Invalid websocket token");
        }
        this.socket.handleUpgrade(request, socket, head, (ws) => {
          this.socket.emit("connection", ws, request);
        });
      } catch (error) {
        logger.warn(`Rejecting WebSocket connection: ${error}`), socket.write(`HTTP/1.1 403 Forbidden\r
Connection: close\r
\r
`), socket.destroy();
      }
    }), this.socket.on("connection", (wss) => {
      wss.on("message", (raw) => {
        let data2 = raw.toString(), event = typeof data2 == "string" && (0, import_telejson3.isJSON)(data2) ? (0, import_telejson3.parse)(data2, {}) : data2;
        this.handler?.(event);
      });
    });
    let interval = setInterval(() => {
      this.send({ type: "ping" });
    }, HEARTBEAT_INTERVAL2);
    this.socket.on("close", function() {
      clearInterval(interval);
    }), process.on("SIGTERM", () => {
      this.socket.clients.forEach((client) => {
        client.readyState === WebSocket2.OPEN && client.close(1001, "Server is shutting down");
      }), this.socket.close(() => process.exit(0));
    });
  }
  setHandler(handler) {
    this.handler = handler;
  }
  send(event) {
    let data2 = (0, import_telejson3.stringify)(event, { maxDepth: 15 });
    Array.from(this.socket.clients).filter((c) => c.readyState === WebSocket2.OPEN).forEach((client) => client.send(data2));
  }
};
function getServerChannel(server, options) {
  let transports = [new ServerChannelTransport(server, options)], channel = new Channel3({ transports, async: !0 });
  return setChannel2(channel), UniversalStore.__prepare(channel, UniversalStore.Environment.SERVER), channel;
}

// src/core-server/utils/output-startup-information.ts
var import_picocolors6 = __toESM(require_picocolors(), 1), import_pretty_hrtime = __toESM(require_pretty_hrtime(), 1), import_ts_dedent3 = __toESM(require_dist(), 1);
import { CLI_COLORS, logger as logger13 } from "storybook/internal/node-logger";

// src/core-server/utils/update-check.ts
var import_picocolors5 = __toESM(require_picocolors(), 1), import_ts_dedent2 = __toESM(require_dist(), 1);
import { cache as cache2 } from "storybook/internal/common";
import { colors } from "storybook/internal/node-logger";
import semver from "semver";
var { STORYBOOK_VERSION_BASE = "https://storybook.js.org", CI } = process.env, updateCheck = async (version2) => {
  let result, time = Date.now();
  try {
    let fromCache = await cache2.get("lastUpdateCheck", { success: !1, time: 0 });
    time - 864e5 > fromCache.time && !CI ? (result = { success: !0, cached: !1, data: await (await Promise.race([
      fetch(`${STORYBOOK_VERSION_BASE}/versions.json?current=${version2}`),
      // if fetch is too slow, we won't wait for it
      new Promise((res, rej) => global.setTimeout(rej, 1500))
    ])).json(), time }, await cache2.set("lastUpdateCheck", result)) : result = { ...fromCache, cached: !0 };
  } catch (error) {
    result = { success: !1, cached: !1, error, time };
  }
  return result;
};
function createUpdateMessage(updateInfo, version2) {
  let updateMessage;
  try {
    let upgradeCommand = `npx storybook@${semver.prerelease(updateInfo.data.latest.version) ? "next" : "latest"} upgrade`;
    updateMessage = updateInfo.success && semver.lt(version2, updateInfo.data.latest.version) ? import_ts_dedent2.dedent`
          ${colors.orange(
      `A new version (${import_picocolors5.default.bold(updateInfo.data.latest.version)}) is available!`
    )}

          ${import_picocolors5.default.gray("Upgrade now:")} ${colors.green(upgradeCommand)}

          ${import_picocolors5.default.gray("Read full changelog:")} ${import_picocolors5.default.gray(
      import_picocolors5.default.underline("https://github.com/storybookjs/storybook/blob/main/CHANGELOG.md")
    )}
        ` : "";
  } catch {
    updateMessage = "";
  }
  return updateMessage;
}

// src/core-server/utils/output-startup-information.ts
function outputStartupInformation(options) {
  let {
    updateInfo,
    version: version2,
    name: name2,
    address,
    networkAddress,
    allowedHosts,
    managerTotalTime,
    previewTotalTime
  } = options, otherAllowedHosts = allowedHosts === !0 ? "all (insecure)" : allowedHosts?.length ? allowedHosts.join(", ") : void 0, updateMessage = createUpdateMessage(updateInfo, version2), serverMessages = [
    `- Local:                ${address}`,
    `- On your network:      ${networkAddress}`,
    otherAllowedHosts && `- Other allowed hosts:  ${otherAllowedHosts}`
  ];
  logger13.logBox(
    import_ts_dedent3.dedent`
      Storybook ready!

      ${serverMessages.join(`
`)}${updateMessage ? `

${updateMessage}` : ""}
    `,
    {
      formatBorder: CLI_COLORS.storybook,
      contentPadding: 3,
      rounded: !0
    }
  );
  let timeStatement = [
    managerTotalTime && `${import_picocolors6.default.underline((0, import_pretty_hrtime.default)(managerTotalTime))} for manager`,
    previewTotalTime && `${import_picocolors6.default.underline((0, import_pretty_hrtime.default)(previewTotalTime))} for preview`
  ].filter(Boolean).join(" and ");
  logger13.info(timeStatement);
}

// src/core-server/utils/runtime-instance-registry.ts
import { existsSync as existsSync2, rmSync } from "node:fs";
import { mkdir as mkdir3, readFile as readFile4, readdir, rename, rm as rm2, stat as stat2, writeFile as writeFile4 } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { homedir } from "node:os";
import { normalizeAddonName } from "storybook/internal/common";
var STORYBOOK_MCP_ADDON = "@storybook/addon-mcp", DEFAULT_MCP_ENDPOINT = "/mcp", ONE_DAY_MS = 1440 * 60 * 1e3, SEVEN_DAYS_MS = 7 * ONE_DAY_MS;
function getDefaultRuntimeInstanceRegistryDir() {
  return join(homedir(), ".storybook", "instances");
}
function getOrigin(address) {
  return new URL(address).origin;
}
function getMcpMetadataFromMainConfig(mainConfig) {
  let addon = mainConfig.addons?.find(
    (entry) => normalizeAddonName(entry) === STORYBOOK_MCP_ADDON
  );
  return addon ? { status: "ready", endpoint: typeof addon == "object" && typeof addon.options?.endpoint == "string" ? addon.options.endpoint : DEFAULT_MCP_ENDPOINT } : { status: "not-installed" };
}
function detectRuntimeInstanceAgent() {
  return isClaudePreviewLaunch() ? CLAUDE_PREVIEW_AGENT_NAME : detectAgent()?.name;
}
function createRuntimeInstanceRecord({
  address,
  agent,
  configDir,
  cwd = process.cwd(),
  instanceId = randomUUID(),
  mcp = { status: "not-installed" },
  now = /* @__PURE__ */ new Date(),
  pid = process.pid,
  port,
  storybookVersion
}) {
  let origin = getOrigin(address), timestamp = now.toISOString();
  return {
    schemaVersion: 1,
    instanceId,
    pid,
    cwd: resolve(cwd),
    ...configDir ? { configDir: resolve(cwd, configDir) } : {},
    url: origin,
    port,
    ...agent ? { agent } : {},
    storybookVersion,
    startedAt: timestamp,
    updatedAt: timestamp,
    mcp
  };
}
async function writeRuntimeInstanceRecord(record, registryDir = getDefaultRuntimeInstanceRegistryDir()) {
  await mkdir3(registryDir, { recursive: !0 }), await cleanupRuntimeInstanceRegistry(registryDir);
  let recordPath = join(registryDir, `${record.instanceId}.json`), tempPath = join(
    registryDir,
    `${record.instanceId}.${record.pid}.${Date.now()}.${Math.random().toString(16).slice(2)}.tmp`
  );
  try {
    await writeFile4(tempPath, `${JSON.stringify(record, null, 2)}
`, "utf-8"), await rename(tempPath, recordPath);
  } catch (error) {
    throw await rm2(tempPath, { force: !0 }).catch(() => {
    }), error;
  }
  return recordPath;
}
function isRecordObject(value) {
  return typeof value == "object" && value !== null;
}
function getTimestampMs(record, key2) {
  let value = record[key2];
  if (typeof value != "string")
    return;
  let timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : void 0;
}
function getRecordAgeMs(record, fileModifiedAtMs, nowMs) {
  let recordTimestampMs = isRecordObject(record) ? getTimestampMs(record, "updatedAt") ?? getTimestampMs(record, "startedAt") : void 0;
  return nowMs - (recordTimestampMs ?? fileModifiedAtMs);
}
function getRecordPid(record) {
  if (!(!isRecordObject(record) || typeof record.pid != "number"))
    return Number.isInteger(record.pid) && record.pid > 0 ? record.pid : void 0;
}
function isErrnoException(error) {
  return typeof error == "object" && error !== null && "code" in error;
}
function getRuntimeInstanceRegistryCleanupDecision(entry) {
  if (entry.kind === "temp-file")
    return entry.nowMs - entry.fileModifiedAtMs > ONE_DAY_MS ? { action: "remove" } : { action: "keep" };
  if (entry.kind === "malformed-json")
    return entry.nowMs - entry.fileModifiedAtMs > SEVEN_DAYS_MS ? { action: "remove" } : { action: "keep" };
  let recordAgeMs = getRecordAgeMs(entry.record, entry.fileModifiedAtMs, entry.nowMs);
  if (recordAgeMs > SEVEN_DAYS_MS)
    return { action: "remove" };
  if (recordAgeMs < ONE_DAY_MS)
    return { action: "keep" };
  let recordPid = getRecordPid(entry.record);
  return recordPid === void 0 ? { action: "keep" } : { action: "check-pid", pid: recordPid };
}
function isPidInactive(pid) {
  try {
    return process.kill(pid, 0), !1;
  } catch (error) {
    return isErrnoException(error) && error.code === "ESRCH";
  }
}
async function applyCleanupDecision(recordPath, decision) {
  (decision.action === "remove" || decision.action === "check-pid" && isPidInactive(decision.pid)) && await rm2(recordPath, { force: !0 });
}
async function cleanupRuntimeInstanceRegistry(registryDir) {
  let nowMs = Date.now(), entries = await readdir(registryDir, { withFileTypes: !0 }).catch(() => []);
  await Promise.all(
    entries.map(async (entry) => {
      if (!entry.isFile())
        return;
      let recordPath = join(registryDir, entry.name);
      try {
        let { mtimeMs } = await stat2(recordPath);
        if (entry.name.endsWith(".tmp")) {
          await applyCleanupDecision(
            recordPath,
            getRuntimeInstanceRegistryCleanupDecision({
              kind: "temp-file",
              fileModifiedAtMs: mtimeMs,
              nowMs
            })
          );
          return;
        }
        if (!entry.name.endsWith(".json"))
          return;
        let content3 = await readFile4(recordPath, "utf-8"), record;
        try {
          record = JSON.parse(content3);
        } catch {
          await applyCleanupDecision(
            recordPath,
            getRuntimeInstanceRegistryCleanupDecision({
              kind: "malformed-json",
              fileModifiedAtMs: mtimeMs,
              nowMs
            })
          );
          return;
        }
        await applyCleanupDecision(
          recordPath,
          getRuntimeInstanceRegistryCleanupDecision({
            kind: "record",
            fileModifiedAtMs: mtimeMs,
            nowMs,
            record
          })
        );
      } catch {
      }
    })
  );
}
function registerProcessCleanup(recordPath) {
  let cleanupSync = () => {
    existsSync2(recordPath) && rmSync(recordPath, { force: !0 });
  };
  return process.once("exit", cleanupSync), process.prependOnceListener("SIGINT", cleanupSync), process.prependOnceListener("SIGTERM", cleanupSync), () => {
    process.off("exit", cleanupSync), process.off("SIGINT", cleanupSync), process.off("SIGTERM", cleanupSync);
  };
}
async function writeStorybookRuntimeInstanceRecord({
  address,
  agent = detectRuntimeInstanceAgent(),
  configDir,
  cwd,
  mcp,
  pid,
  port,
  registryDir,
  registerCleanup = !0,
  storybookVersion
}) {
  let record = createRuntimeInstanceRecord({
    address,
    agent,
    configDir,
    cwd,
    mcp,
    pid,
    port,
    storybookVersion
  }), recordPath = await writeRuntimeInstanceRecord(record, registryDir), unregisterProcessCleanup = registerCleanup ? registerProcessCleanup(recordPath) : () => {
  };
  return {
    record,
    recordPath,
    unregisterProcessCleanup,
    cleanup: async () => {
      unregisterProcessCleanup(), await rm2(recordPath, { force: !0 });
    }
  };
}

// src/core-server/utils/server-address.ts
var import_detect_port = __toESM(require_detect_port2(), 1);
import os from "node:os";
import { logger as logger14 } from "storybook/internal/node-logger";
import { NoFreePortError } from "storybook/internal/server-errors";
function getServerAddresses(port, host, proto, initialPath) {
  let address = new URL(`${proto}://localhost:${port}/`), networkAddress = new URL(`${proto}://${host || getLocalIp()}:${port}/`);
  if (initialPath) {
    let searchParams = `?path=${decodeURIComponent(
      initialPath.startsWith("/") ? initialPath : `/${initialPath}`
    )}`;
    address.search = searchParams, networkAddress.search = searchParams;
  }
  return {
    address: address.href,
    networkAddress: networkAddress.href
  };
}
var getServerPort = (port, { exactPort } = {}) => (0, import_detect_port.default)(port).catch((error) => {
  logger14.error(error), process.exit(-1);
}).then((freePort) => {
  if (!freePort)
    throw new NoFreePortError({ requestedPort: port });
  return exactPort && port != null && freePort !== port && (logger14.error(`Port ${port} is not available. Exiting because --exact-port was provided.`), process.exit(-1)), freePort;
}), getServerChannelUrl = (port, { https: https2 }) => `${https2 ? "wss" : "ws"}://localhost:${port}/storybook-server-channel`, getLocalIp = () => {
  let allFilteredIps = Object.values(os.networkInterfaces()).flat().filter((ip) => ip && ip.family === "IPv4" && !ip.internal);
  return allFilteredIps.length ? allFilteredIps[0]?.address : "0.0.0.0";
};

// src/core-server/utils/server-init.ts
import { readFile as readFile5 } from "node:fs/promises";
import { logger as logger15 } from "storybook/internal/node-logger";
import http2 from "http";
import https from "https";
async function getServer(options) {
  if (!options.https)
    return http2.createServer();
  options.sslCert || (logger15.error("Error: --ssl-cert is required with --https"), process.exit(-1)), options.sslKey || (logger15.error("Error: --ssl-key is required with --https"), process.exit(-1));
  let sslOptions = {
    ca: await Promise.all((options.sslCa || []).map((ca) => readFile5(ca, { encoding: "utf8" }))),
    cert: await readFile5(options.sslCert, { encoding: "utf8" }),
    key: await readFile5(options.sslKey, { encoding: "utf8" })
  };
  return https.createServer(sslOptions);
}

// src/core-server/utils/strip-comments-and-strings.ts
function stripCommentsAndStrings(code) {
  let result = code.replace(/(['"`])(?:\\.|(?!\1)[\s\S])*?\1/g, '""');
  return result = result.replace(/\/\*[\s\S]*?\*\//g, ""), result = result.split(`
`).map((line) => line.split("//")[0]).join(`
`), result;
}

// src/core-server/utils/warnOnIncompatibleAddons.ts
import { logger as logger17 } from "storybook/internal/node-logger";

// ../lib/cli-storybook/src/doctor/getIncompatibleStorybookPackages.ts
var import_picocolors7 = __toESM(require_picocolors(), 1);
import { versions as storybookCorePackages } from "storybook/internal/common";
import { logger as logger16 } from "storybook/internal/node-logger";
import semver2 from "semver";

// ../lib/cli-storybook/src/automigrate/helpers/consolidated-packages.ts
var consolidatedPackages = {
  "@storybook/channels": "storybook/internal/channels",
  "@storybook/client-logger": "storybook/internal/client-logger",
  "@storybook/core-common": "storybook/internal/common",
  "@storybook/core-events": "storybook/internal/core-events",
  "@storybook/csf": "storybook/internal/csf",
  "@storybook/csf-tools": "storybook/internal/csf-tools",
  "@storybook/docs-tools": "storybook/internal/docs-tools",
  "@storybook/node-logger": "storybook/internal/node-logger",
  "@storybook/preview-api": "storybook/preview-api",
  "@storybook/router": "storybook/internal/router",
  "@storybook/telemetry": "storybook/internal/telemetry",
  "@storybook/theming": "storybook/theming",
  "@storybook/types": "storybook/internal/types",
  "@storybook/manager-api": "storybook/manager-api",
  "@storybook/manager": "storybook/internal/manager",
  "@storybook/preview": "storybook/internal/preview",
  "@storybook/core-server": "storybook/internal/core-server",
  "@storybook/builder-manager": "storybook/internal/builder-manager",
  "@storybook/components": "storybook/internal/components",
  "@storybook/test": "storybook/test",
  "@storybook/experimental-nextjs-vite": "@storybook/nextjs-vite",
  "@storybook/instrumenter": "storybook/internal/instrumenter",
  "@storybook/blocks": "@storybook/addon-docs/blocks"
};

// ../lib/cli-storybook/src/doctor/getIncompatibleStorybookPackages.ts
var checkPackageCompatibility = async (dependency, context) => {
  let { currentStorybookVersion, skipErrors, packageManager } = context;
  try {
    let dependencyPackageJson = await packageManager.getModulePackageJSON(dependency);
    if (dependencyPackageJson === null)
      return { packageName: dependency };
    let {
      version: packageVersion,
      name: name2 = dependency,
      dependencies,
      peerDependencies,
      homepage
    } = dependencyPackageJson, packageStorybookVersion = Object.entries({
      ...dependencies,
      ...peerDependencies
    }).filter(
      ([dep]) => storybookCorePackages[dep] || consolidatedPackages[dep]
    ).map(([_, versionRange]) => versionRange).find((versionRange) => versionRange && // We can't check compatibility for 0.x packages, so we skip them
    !/^[~^]?0\./.test(versionRange) && semver2.validRange(versionRange) && !semver2.satisfies(currentStorybookVersion, versionRange)), isCorePackage = storybookCorePackages[name2], availableUpdate, availableCoreUpdate;
    return isCorePackage && packageVersion && semver2.gt(currentStorybookVersion, packageVersion) && (availableUpdate = currentStorybookVersion), isCorePackage && packageVersion && semver2.gt(packageVersion, currentStorybookVersion) && (availableCoreUpdate = packageVersion), {
      packageName: name2,
      packageVersion,
      homepage,
      hasIncompatibleDependencies: packageStorybookVersion != null,
      packageStorybookVersion,
      availableUpdate,
      availableCoreUpdate
    };
  } catch (err) {
    return skipErrors || logger16.log(
      `Error checking compatibility for ${dependency}, please report an issue:
` + String(err)
    ), { packageName: dependency };
  }
}, getIncompatibleStorybookPackages = async (context) => {
  if (context.currentStorybookVersion.includes("0.0.0"))
    return [];
  let allDeps = context.packageManager.getAllDependencies(), storybookLikeDeps = Object.keys(allDeps).filter((dep) => dep.includes("storybook"));
  if (storybookLikeDeps.length === 0 && !context.skipErrors)
    throw new Error("No Storybook dependencies found in the package.json");
  return Promise.all(
    storybookLikeDeps.filter((dep) => !storybookCorePackages[dep]).map((dep) => checkPackageCompatibility(dep, context))
  );
}, getIncompatiblePackagesSummary = (dependencyAnalysis, currentStorybookVersion) => {
  let summaryMessage = [], incompatiblePackages = dependencyAnalysis.filter(
    (dep) => dep.hasIncompatibleDependencies
  );
  return incompatiblePackages.length > 0 && (summaryMessage.push(
    `You are currently using Storybook ${import_picocolors7.default.bold(
      currentStorybookVersion
    )} but you have packages which are incompatible with it:
`
  ), incompatiblePackages.forEach(
    ({
      packageName: addonName,
      packageVersion: addonVersion,
      homepage,
      availableUpdate,
      packageStorybookVersion
    }) => {
      let packageDescription = `${addonName}@${addonVersion}`, updateMessage = availableUpdate ? ` (${availableUpdate} available!)` : "", dependsOnStorybook = packageStorybookVersion != null ? ` which depends on ${packageStorybookVersion}` : "", packageRepo = homepage ? `
 Repo: ${homepage}` : "";
      summaryMessage.push(
        `- ${packageDescription}${updateMessage}${dependsOnStorybook}${packageRepo}`
      );
    }
  ), summaryMessage.push(
    `
Please consider updating your packages or contacting the maintainers for compatibility details.`,
    `
For more details on compatibility guidance, see:`,
    "https://github.com/storybookjs/storybook/issues/32836"
  ), incompatiblePackages.some((dep) => dep.availableCoreUpdate) && summaryMessage.push(
    `
`,
    `The version of ${import_picocolors7.default.blue(`storybook@${currentStorybookVersion}`)} is behind the following core packages:`,
    `${incompatiblePackages.filter((dep) => dep.availableCoreUpdate).map(
      ({ packageName, packageVersion }) => `- ${import_picocolors7.default.blue(`${packageName}@${packageVersion}`)}`
    ).join(`
`)}`,
    `
`,
    "Upgrade Storybook with:",
    import_picocolors7.default.blue("npx storybook@latest upgrade")
  )), summaryMessage.join(`
`);
};

// src/core-server/utils/warnOnIncompatibleAddons.ts
var warnOnIncompatibleAddons = async (currentStorybookVersion, packageManager) => {
  let incompatiblePackagesList = await getIncompatibleStorybookPackages({
    skipUpgradeCheck: !0,
    skipErrors: !0,
    currentStorybookVersion,
    packageManager
  }), incompatiblePackagesMessage = getIncompatiblePackagesSummary(
    incompatiblePackagesList,
    currentStorybookVersion
  );
  incompatiblePackagesMessage && logger17.warn(incompatiblePackagesMessage);
};

// src/core-server/utils/warnWhenUsingArgTypesRegex.ts
var import_picocolors8 = __toESM(require_picocolors(), 1), import_ts_dedent4 = __toESM(require_dist(), 1);
import { readFile as readFile6 } from "node:fs/promises";
import { core } from "storybook/internal/babel";
import { babelParse } from "storybook/internal/csf-tools";
async function warnWhenUsingArgTypesRegex(previewConfigPath, config) {
  let previewContent = previewConfigPath ? await readFile6(previewConfigPath, { encoding: "utf8" }) : "";
  (config?.addons?.some(
    (it) => typeof it == "string" ? it === "@chromatic-com/storybook" : it.name === "@chromatic-com/storybook"
  ) ?? !1) && previewConfigPath && previewContent.includes("argTypesRegex") && new core.File(
    { filename: previewConfigPath },
    { code: previewContent, ast: babelParse(previewContent) }
  ).path.traverse({
    Identifier: (path2) => {
      if (path2.node.name === "argTypesRegex") {
        let message = import_ts_dedent4.dedent`
            ${import_picocolors8.default.bold("Attention")}: We've detected that you're using ${import_picocolors8.default.cyan(
          "actions.argTypesRegex"
        )} together with the visual test addon:
            
            ${path2.buildCodeFrameError(previewConfigPath).message}
            
            We recommend removing the ${import_picocolors8.default.cyan(
          "argTypesRegex"
        )} and assigning explicit action with the ${import_picocolors8.default.cyan(
          "fn"
        )} function from ${import_picocolors8.default.cyan("storybook/test")} instead:
            https://storybook.js.org/docs/essentials/actions#via-storybooktest-fn-spies
            
            The build used by the addon for snapshot testing doesn't take the regex into account, which can cause hard to debug problems when a snapshot depends on the presence of action props.
          `;
        console.warn(message);
      }
    }
  });
}

// src/core-server/build-dev.ts
async function resolveOnboardingInitialPath(cliInitialPath) {
  if (cliInitialPath || detectAgent2())
    return cliInitialPath;
  if (await cache3.get("onboarding-pending").catch(() => {
  })) {
    try {
      await cache3.remove("onboarding-pending");
    } catch {
    }
    return "/onboarding";
  }
}
async function buildDevStandalone(options) {
  let { packageJson, versionUpdates } = options, { storybookVersion, previewConfigPath } = options, configDir = resolve(options.configDir);
  packageJson ? (invariant(
    packageJson.version !== void 0,
    `Expected package.json#version to be defined in the "${packageJson.name}" package}`
  ), storybookVersion = packageJson.version, previewConfigPath = getConfigInfo(configDir).previewConfigPath ?? void 0) : storybookVersion || (storybookVersion = versions.storybook);
  let [port, versionCheck] = await Promise.all([
    getServerPort(options.port, { exactPort: options.exactPort }),
    versionUpdates ? updateCheck(storybookVersion) : Promise.resolve({ success: !1, cached: !1, data: {}, time: Date.now() })
  ]);
  !options.ci && !options.smokeTest && options.port != null && port !== options.port && (await prompt.confirm({
    message: import_ts_dedent5.dedent`
        Port ${options.port} is not available. 
        Would you like to run Storybook on port ${port} instead?
      `,
    initialValue: !0
  }) || process.exit(1));
  let cacheKey = oneWayHash(relative(getProjectRoot(), configDir));
  invariant(port, "expected options to have a port"), options.initialPath = await resolveOnboardingInitialPath(options.initialPath);
  let { address: localAddress, networkAddress } = getServerAddresses(
    port,
    options.host,
    options.https ? "https" : "http",
    options.initialPath
  ), cacheOutputDir = resolvePathInStorybookCache2("public", cacheKey), outputDir = resolve(options.outputDir || cacheOutputDir);
  options.smokeTest && (outputDir = cacheOutputDir), options.port = port, options.versionCheck = versionCheck, options.configType = "DEVELOPMENT", options.configDir = configDir, options.cacheKey = cacheKey, options.outputDir = outputDir, options.serverChannelUrl = getServerChannelUrl(port, options), options.localAddress = localAddress, options.networkAddress = networkAddress, options.pnp = await detectPnp(), options.pnp && deprecate(import_ts_dedent5.dedent`
      As of Storybook 10.0, PnP is deprecated.
      If you are using PnP, you can continue to use Storybook 10.0, but we recommend migrating to a different package manager or linker-mode.

      In future versions, PnP compatibility will be removed.
    `);
  let config = await loadMainConfig2(options), { core: core3, framework } = config, corePresets = [], frameworkName = typeof framework == "string" ? framework : framework?.name;
  options.ignorePreview || validateFrameworkName(frameworkName), frameworkName && corePresets.push(join(frameworkName, "preset")), frameworkName = frameworkName || "custom";
  let packageManager = JsPackageManagerFactory.getPackageManager({
    configDir: options.configDir
  });
  try {
    await warnOnIncompatibleAddons(storybookVersion, packageManager);
  } catch (e) {
    logger18.warn("Storybook failed to check addon compatibility"), logger18.debug(`${e instanceof Error ? e.stack : String(e)}`);
  }
  try {
    await warnWhenUsingArgTypesRegex(previewConfigPath, config);
  } catch {
  }
  let server = await getServer(options), presets = await loadAllPresets2({
    corePresets,
    overridePresets: [
      import.meta.resolve("storybook/internal/core-server/presets/common-override-preset")
    ],
    ...options,
    isCritical: !0,
    channel: new channels_default({
      transports: [
        {
          setHandler: () => () => console.error("CHANNEL IS NOT READY YET"),
          send: () => () => console.error("CHANNEL IS NOT READY YET")
        }
      ]
    })
  }), { allowedHosts, renderer, builder } = await presets.apply("core", {});
  if (options.host === "0.0.0.0" && (!allowedHosts || allowedHosts !== !0 && allowedHosts.length === 0) && logger18.warn(import_ts_dedent5.dedent`
      --host is set to 0.0.0.0 but no allowedHosts are defined. Allowing all hosts.
      To restrict allowed hosts, set core.allowedHosts in your main Storybook config.
      See: https://storybook.js.org/docs/api/main-config/main-config-core
    `), !builder)
    throw new MissingBuilderError3();
  versionCheck.success && !versionCheck.cached && telemetry4("version-update");
  let resolvedPreviewBuilder = typeof builder == "string" ? builder : builder.name, [previewBuilder, managerBuilder] = await Promise.all([
    getPreviewBuilder(resolvedPreviewBuilder),
    getManagerBuilder()
  ]);
  if (resolvedPreviewBuilder.includes("builder-vite")) {
    let deprecationMessage = (0, import_ts_dedent5.dedent)(`Using CommonJS in your main configuration file is deprecated with Vite.
              - Refer to the migration guide at https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#commonjs-with-vite-is-deprecated`), mainJsPath = getInterpretedFile(
      resolve(options.configDir || ".storybook", "main")
    );
    /\.c[jt]s$/.test(mainJsPath) && deprecate(deprecationMessage);
    let mainJsContent = await readFile7(mainJsPath, { encoding: "utf8" }), CJS_CONTENT_REGEX = /\bmodule\.exports\b|\bexports[.[]|\brequire\s*\(|\bObject\.(?:defineProperty|defineProperties|assign)\s*\(\s*exports\b/, strippedContent = stripCommentsAndStrings(mainJsContent);
    CJS_CONTENT_REGEX.test(strippedContent) && deprecate(deprecationMessage);
  }
  let resolvedRenderer = renderer && resolveAddonName2(options.configDir, renderer, options), channel = getServerChannel(server, {
    token: getWsToken(),
    host: options.host,
    allowedHosts,
    skipValidation: isWebContainer(),
    localAddress,
    networkAddress
  });
  presets = await loadAllPresets2({
    corePresets: [
      join(resolvePackageDir("storybook"), "dist/core-server/presets/common-preset.js"),
      ...managerBuilder.corePresets || [],
      ...previewBuilder.corePresets || [],
      ...resolvedRenderer ? [resolvedRenderer] : [],
      ...corePresets
    ],
    overridePresets: [
      ...previewBuilder.overridePresets || [],
      import.meta.resolve("storybook/internal/core-server/presets/common-override-preset")
    ],
    ...options,
    channel
  });
  let features = await presets.apply("features");
  global3.FEATURES = features, await applyServicesPresetOnce(presets), await presets.apply("experimental_serverChannel", channel);
  let fullOptions = {
    ...options,
    presets,
    features,
    channel
  }, { managerResult, previewResult } = await buildOrThrow(
    async () => storybookDevServer(fullOptions, server)
  ), mcp = getMcpMetadataFromMainConfig(config);
  await writeStorybookRuntimeInstanceRecord({
    address: localAddress,
    configDir: options.configDir,
    mcp,
    port,
    storybookVersion
  }).catch((error) => {
    logger18.warn("Storybook failed to write its runtime instance registry record."), logger18.debug(error instanceof Error ? error.stack ?? error.message : String(error));
  });
  let previewTotalTime = previewResult?.totalTime, managerTotalTime = managerResult?.totalTime, previewStats = previewResult?.stats, managerStats = managerResult?.stats, statsOption = options.webpackStatsJson || options.statsJson;
  if (statsOption) {
    let target = statsOption === !0 ? options.outputDir : statsOption;
    await outputStats(target, previewStats);
  }
  if (options.smokeTest) {
    let warnings = [];
    warnings.push(...managerStats?.toJson()?.warnings || []);
    try {
      warnings.push(...previewStats?.toJson()?.warnings || []);
    } catch (err) {
      if (!(err instanceof NoStatsForViteDevError))
        throw err;
    }
    let problems = warnings.filter((warning) => !warning.message.includes("export 'useInsertionEffect'")).filter((warning) => !warning.message.includes("compilation but it's unused")).filter(
      (warning) => !warning.message.includes("Conflicting values for 'process.env.NODE_ENV'")
    );
    problems.length > 0 ? (logger18.error("Smoke tests failed."), logger18.log(problems.map((p) => p.stack).join(`
`))) : logger18.step(CLI_COLORS2.success("Smoke tests passed, exiting.")), logger18.outro(""), process.exit(problems.length > 0 ? 1 : 0);
  } else {
    let name2 = frameworkName.split("@storybook/").length > 1 ? frameworkName.split("@storybook/")[1] : frameworkName;
    options.quiet || outputStartupInformation({
      updateInfo: versionCheck,
      version: storybookVersion,
      name: name2,
      address: localAddress,
      networkAddress,
      allowedHosts,
      managerTotalTime,
      previewTotalTime
    });
  }
  return { port, address: localAddress, networkAddress };
}

// src/core-server/build-index.ts
import { writeFile as writeFile5 } from "node:fs/promises";
import { normalizeStories as normalizeStories2 } from "storybook/internal/common";
import { logger as logger20 } from "storybook/internal/node-logger";

// src/core-server/load.ts
import { Channel as Channel4, setChannel as setChannel3 } from "storybook/internal/channels";
import {
  getProjectRoot as getProjectRoot2,
  loadAllPresets as loadAllPresets3,
  loadMainConfig as loadMainConfig3,
  resolveAddonName as resolveAddonName3,
  validateFrameworkName as validateFrameworkName2
} from "storybook/internal/common";
import { oneWayHash as oneWayHash2 } from "storybook/internal/telemetry";
import { global as global4 } from "@storybook/global";
async function loadStorybook(options) {
  let configDir = resolve(options.configDir), cacheKey = oneWayHash2(relative(getProjectRoot2(), configDir));
  options.configType = "DEVELOPMENT", options.configDir = configDir, options.cacheKey = cacheKey;
  let channel = new Channel4({});
  setChannel3(channel);
  let config = await loadMainConfig3(options), { framework } = config, corePresets = [], frameworkName = typeof framework == "string" ? framework : framework?.name;
  options.ignorePreview || validateFrameworkName2(frameworkName), frameworkName && corePresets.push(join(frameworkName, "preset")), frameworkName = frameworkName || "custom";
  let presets = await loadAllPresets3({
    corePresets,
    overridePresets: [
      import.meta.resolve("storybook/internal/core-server/presets/common-override-preset")
    ],
    ...options,
    isCritical: !0,
    channel
  }), { renderer, builder } = await presets.apply("core", {}), resolvedRenderer = renderer && resolveAddonName3(options.configDir, renderer, options), builderName = typeof builder == "string" ? builder : builder?.name;
  if (builderName) {
    let builderPresetDir = builderName.startsWith("file:") || isAbsolute(builderName) ? dirname(builderName) : resolvePackageDir(builderName);
    corePresets.push(join(builderPresetDir, "preset.js"));
  }
  presets = await loadAllPresets3({
    corePresets: [
      join(resolvePackageDir("storybook"), "dist/core-server/presets/common-preset.js"),
      ...resolvedRenderer ? [resolvedRenderer] : [],
      ...corePresets
    ],
    overridePresets: [
      import.meta.resolve("storybook/internal/core-server/presets/common-override-preset")
    ],
    channel,
    ...options
  });
  let features = await presets.apply("features");
  return global4.FEATURES = features, await applyServicesPresetOnce(presets), {
    ...options,
    presets,
    features
  };
}

// src/core-server/utils/StoryIndexGenerator.ts
import { existsSync as existsSync3 } from "node:fs";
import { readFile as readFile8 } from "node:fs/promises";
import { dirname as dirname2, extname, join as join6, normalize as normalize2, relative as relative4, resolve as resolve3, sep } from "node:path";
import { commonGlobOptions as commonGlobOptions2, getProjectRoot as getProjectRoot3, normalizeStoryPath } from "storybook/internal/common";
import { combineTags, storyNameFromExport, toId } from "storybook/internal/csf";
import { getStorySortParameter, loadConfig } from "storybook/internal/csf-tools";
import { logger as logger19, once } from "storybook/internal/node-logger";
import { isExampleStoryId as isExampleStoryId2 } from "storybook/internal/telemetry";
var import_picocolors9 = __toESM(require_picocolors(), 1);
var import_ts_dedent7 = __toESM(require_dist(), 1), TsconfigPaths = __toESM(require_lib3(), 1);

// src/preview-api/modules/store/sortStories.ts
var import_ts_dedent6 = __toESM(require_dist(), 1);

// src/preview-api/modules/store/storySort.ts
var STORY_KIND_PATH_SEPARATOR = /\s*\/\s*/, storySort = (options = {}) => (a, b) => {
  if (a.title === b.title && !options.includeNames)
    return 0;
  let method = options.method || "configure", order = options.order || [], storyTitleA = a.title.trim().split(STORY_KIND_PATH_SEPARATOR), storyTitleB = b.title.trim().split(STORY_KIND_PATH_SEPARATOR);
  options.includeNames && (storyTitleA.push(a.name), storyTitleB.push(b.name));
  let depth = 0;
  for (; storyTitleA[depth] || storyTitleB[depth]; ) {
    if (!storyTitleA[depth])
      return -1;
    if (!storyTitleB[depth])
      return 1;
    let nameA = storyTitleA[depth], nameB = storyTitleB[depth];
    if (nameA !== nameB) {
      let indexA = order.indexOf(nameA), indexB = order.indexOf(nameB), indexWildcard = order.indexOf("*");
      return indexA !== -1 || indexB !== -1 ? (indexA === -1 && (indexWildcard !== -1 ? indexA = indexWildcard : indexA = order.length), indexB === -1 && (indexWildcard !== -1 ? indexB = indexWildcard : indexB = order.length), indexA - indexB) : method === "configure" ? 0 : nameA.localeCompare(nameB, options.locales ? options.locales : void 0, {
        numeric: !0,
        sensitivity: "accent"
      });
    }
    let index2 = order.indexOf(nameA);
    index2 === -1 && (index2 = order.indexOf("*")), order = index2 !== -1 && Array.isArray(order[index2 + 1]) ? order[index2 + 1] : [], depth += 1;
  }
  return 0;
};

// src/preview-api/modules/store/sortStories.ts
var sortStoriesCommon = (stories, storySortParameter, fileNameOrder) => {
  if (storySortParameter) {
    let sortFn;
    typeof storySortParameter == "function" ? sortFn = storySortParameter : sortFn = storySort(storySortParameter), stories.sort(sortFn);
  } else
    stories.sort(
      (s1, s2) => fileNameOrder.indexOf(s1.importPath) - fileNameOrder.indexOf(s2.importPath)
    );
  return stories;
}, sortStoriesV7 = (stories, storySortParameter, fileNameOrder) => {
  try {
    return sortStoriesCommon(stories, storySortParameter, fileNameOrder);
  } catch (err) {
    throw new Error(import_ts_dedent6.dedent`
    Error sorting stories with sort parameter ${storySortParameter}:

    > ${err.message}

    Are you using a V6-style sort function in V7 mode?

    More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#v7-style-story-sort
  `);
  }
};

// src/core-server/utils/IndexingError.ts
var IndexingError = class extends Error {
  constructor(message, importPaths, stack) {
    super(), this.message = message, this.importPaths = importPaths, stack && (this.stack = stack);
  }
  pathsString() {
    return this.importPaths.length === 1 ? `${slash(this.importPaths[0])}` : `${this.importPaths.map(slash).join(",")}`;
  }
  toString() {
    return `${this.pathsString()}: ${this.message}`;
  }
}, MultipleIndexingError = class extends Error {
  constructor(indexingErrors) {
    super();
    this.indexingErrors = indexingErrors;
    if (this.indexingErrors.length === 0)
      throw new Error("Unexpected empty error list");
    if (this.indexingErrors.length === 1) {
      let [err] = this.indexingErrors;
      this.message = `Unable to index ${err.pathsString()}`;
    } else
      this.message = `Unable to index files:
${this.indexingErrors.map((err) => `- ${err}`).join(`
`)}`;
  }
  toString() {
    return this.indexingErrors.length === 1 ? `${this.message}:
  ${this.indexingErrors[0].stack}` : this.message;
  }
};

// src/core-server/utils/autoName.ts
import { basename as basename3 } from "node:path";
function autoName(mdxImportPath, csfImportPath, defaultName) {
  let mdxBasename = basename3(mdxImportPath), csfBasename = basename3(csfImportPath), [mdxFilename] = mdxBasename.split("."), [csfFilename] = csfBasename.split(".");
  return mdxFilename === csfFilename ? defaultName : mdxFilename;
}

// src/core-server/utils/analyze-mdx.ts
init_acorn();
var import_acorn_jsx2 = __toESM(require_acorn_jsx(), 1);

// ../../node_modules/mdast-util-to-string/lib/index.js
var emptyOptions = {};
function toString2(value, options) {
  let settings = options || emptyOptions, includeImageAlt = typeof settings.includeImageAlt == "boolean" ? settings.includeImageAlt : !0, includeHtml = typeof settings.includeHtml == "boolean" ? settings.includeHtml : !0;
  return one(value, includeImageAlt, includeHtml);
}
function one(value, includeImageAlt, includeHtml) {
  if (node(value)) {
    if ("value" in value)
      return value.type === "html" && !includeHtml ? "" : value.value;
    if (includeImageAlt && "alt" in value && value.alt)
      return value.alt;
    if ("children" in value)
      return all(value.children, includeImageAlt, includeHtml);
  }
  return Array.isArray(value) ? all(value, includeImageAlt, includeHtml) : "";
}
function all(values, includeImageAlt, includeHtml) {
  let result = [], index2 = -1;
  for (; ++index2 < values.length; )
    result[index2] = one(values[index2], includeImageAlt, includeHtml);
  return result.join("");
}
function node(value) {
  return !!(value && typeof value == "object");
}

// ../../node_modules/character-entities/index.js
var characterEntities = {
  AElig: "\xC6",
  AMP: "&",
  Aacute: "\xC1",
  Abreve: "\u0102",
  Acirc: "\xC2",
  Acy: "\u0410",
  Afr: "\u{1D504}",
  Agrave: "\xC0",
  Alpha: "\u0391",
  Amacr: "\u0100",
  And: "\u2A53",
  Aogon: "\u0104",
  Aopf: "\u{1D538}",
  ApplyFunction: "\u2061",
  Aring: "\xC5",
  Ascr: "\u{1D49C}",
  Assign: "\u2254",
  Atilde: "\xC3",
  Auml: "\xC4",
  Backslash: "\u2216",
  Barv: "\u2AE7",
  Barwed: "\u2306",
  Bcy: "\u0411",
  Because: "\u2235",
  Bernoullis: "\u212C",
  Beta: "\u0392",
  Bfr: "\u{1D505}",
  Bopf: "\u{1D539}",
  Breve: "\u02D8",
  Bscr: "\u212C",
  Bumpeq: "\u224E",
  CHcy: "\u0427",
  COPY: "\xA9",
  Cacute: "\u0106",
  Cap: "\u22D2",
  CapitalDifferentialD: "\u2145",
  Cayleys: "\u212D",
  Ccaron: "\u010C",
  Ccedil: "\xC7",
  Ccirc: "\u0108",
  Cconint: "\u2230",
  Cdot: "\u010A",
  Cedilla: "\xB8",
  CenterDot: "\xB7",
  Cfr: "\u212D",
  Chi: "\u03A7",
  CircleDot: "\u2299",
  CircleMinus: "\u2296",
  CirclePlus: "\u2295",
  CircleTimes: "\u2297",
  ClockwiseContourIntegral: "\u2232",
  CloseCurlyDoubleQuote: "\u201D",
  CloseCurlyQuote: "\u2019",
  Colon: "\u2237",
  Colone: "\u2A74",
  Congruent: "\u2261",
  Conint: "\u222F",
  ContourIntegral: "\u222E",
  Copf: "\u2102",
  Coproduct: "\u2210",
  CounterClockwiseContourIntegral: "\u2233",
  Cross: "\u2A2F",
  Cscr: "\u{1D49E}",
  Cup: "\u22D3",
  CupCap: "\u224D",
  DD: "\u2145",
  DDotrahd: "\u2911",
  DJcy: "\u0402",
  DScy: "\u0405",
  DZcy: "\u040F",
  Dagger: "\u2021",
  Darr: "\u21A1",
  Dashv: "\u2AE4",
  Dcaron: "\u010E",
  Dcy: "\u0414",
  Del: "\u2207",
  Delta: "\u0394",
  Dfr: "\u{1D507}",
  DiacriticalAcute: "\xB4",
  DiacriticalDot: "\u02D9",
  DiacriticalDoubleAcute: "\u02DD",
  DiacriticalGrave: "`",
  DiacriticalTilde: "\u02DC",
  Diamond: "\u22C4",
  DifferentialD: "\u2146",
  Dopf: "\u{1D53B}",
  Dot: "\xA8",
  DotDot: "\u20DC",
  DotEqual: "\u2250",
  DoubleContourIntegral: "\u222F",
  DoubleDot: "\xA8",
  DoubleDownArrow: "\u21D3",
  DoubleLeftArrow: "\u21D0",
  DoubleLeftRightArrow: "\u21D4",
  DoubleLeftTee: "\u2AE4",
  DoubleLongLeftArrow: "\u27F8",
  DoubleLongLeftRightArrow: "\u27FA",
  DoubleLongRightArrow: "\u27F9",
  DoubleRightArrow: "\u21D2",
  DoubleRightTee: "\u22A8",
  DoubleUpArrow: "\u21D1",
  DoubleUpDownArrow: "\u21D5",
  DoubleVerticalBar: "\u2225",
  DownArrow: "\u2193",
  DownArrowBar: "\u2913",
  DownArrowUpArrow: "\u21F5",
  DownBreve: "\u0311",
  DownLeftRightVector: "\u2950",
  DownLeftTeeVector: "\u295E",
  DownLeftVector: "\u21BD",
  DownLeftVectorBar: "\u2956",
  DownRightTeeVector: "\u295F",
  DownRightVector: "\u21C1",
  DownRightVectorBar: "\u2957",
  DownTee: "\u22A4",
  DownTeeArrow: "\u21A7",
  Downarrow: "\u21D3",
  Dscr: "\u{1D49F}",
  Dstrok: "\u0110",
  ENG: "\u014A",
  ETH: "\xD0",
  Eacute: "\xC9",
  Ecaron: "\u011A",
  Ecirc: "\xCA",
  Ecy: "\u042D",
  Edot: "\u0116",
  Efr: "\u{1D508}",
  Egrave: "\xC8",
  Element: "\u2208",
  Emacr: "\u0112",
  EmptySmallSquare: "\u25FB",
  EmptyVerySmallSquare: "\u25AB",
  Eogon: "\u0118",
  Eopf: "\u{1D53C}",
  Epsilon: "\u0395",
  Equal: "\u2A75",
  EqualTilde: "\u2242",
  Equilibrium: "\u21CC",
  Escr: "\u2130",
  Esim: "\u2A73",
  Eta: "\u0397",
  Euml: "\xCB",
  Exists: "\u2203",
  ExponentialE: "\u2147",
  Fcy: "\u0424",
  Ffr: "\u{1D509}",
  FilledSmallSquare: "\u25FC",
  FilledVerySmallSquare: "\u25AA",
  Fopf: "\u{1D53D}",
  ForAll: "\u2200",
  Fouriertrf: "\u2131",
  Fscr: "\u2131",
  GJcy: "\u0403",
  GT: ">",
  Gamma: "\u0393",
  Gammad: "\u03DC",
  Gbreve: "\u011E",
  Gcedil: "\u0122",
  Gcirc: "\u011C",
  Gcy: "\u0413",
  Gdot: "\u0120",
  Gfr: "\u{1D50A}",
  Gg: "\u22D9",
  Gopf: "\u{1D53E}",
  GreaterEqual: "\u2265",
  GreaterEqualLess: "\u22DB",
  GreaterFullEqual: "\u2267",
  GreaterGreater: "\u2AA2",
  GreaterLess: "\u2277",
  GreaterSlantEqual: "\u2A7E",
  GreaterTilde: "\u2273",
  Gscr: "\u{1D4A2}",
  Gt: "\u226B",
  HARDcy: "\u042A",
  Hacek: "\u02C7",
  Hat: "^",
  Hcirc: "\u0124",
  Hfr: "\u210C",
  HilbertSpace: "\u210B",
  Hopf: "\u210D",
  HorizontalLine: "\u2500",
  Hscr: "\u210B",
  Hstrok: "\u0126",
  HumpDownHump: "\u224E",
  HumpEqual: "\u224F",
  IEcy: "\u0415",
  IJlig: "\u0132",
  IOcy: "\u0401",
  Iacute: "\xCD",
  Icirc: "\xCE",
  Icy: "\u0418",
  Idot: "\u0130",
  Ifr: "\u2111",
  Igrave: "\xCC",
  Im: "\u2111",
  Imacr: "\u012A",
  ImaginaryI: "\u2148",
  Implies: "\u21D2",
  Int: "\u222C",
  Integral: "\u222B",
  Intersection: "\u22C2",
  InvisibleComma: "\u2063",
  InvisibleTimes: "\u2062",
  Iogon: "\u012E",
  Iopf: "\u{1D540}",
  Iota: "\u0399",
  Iscr: "\u2110",
  Itilde: "\u0128",
  Iukcy: "\u0406",
  Iuml: "\xCF",
  Jcirc: "\u0134",
  Jcy: "\u0419",
  Jfr: "\u{1D50D}",
  Jopf: "\u{1D541}",
  Jscr: "\u{1D4A5}",
  Jsercy: "\u0408",
  Jukcy: "\u0404",
  KHcy: "\u0425",
  KJcy: "\u040C",
  Kappa: "\u039A",
  Kcedil: "\u0136",
  Kcy: "\u041A",
  Kfr: "\u{1D50E}",
  Kopf: "\u{1D542}",
  Kscr: "\u{1D4A6}",
  LJcy: "\u0409",
  LT: "<",
  Lacute: "\u0139",
  Lambda: "\u039B",
  Lang: "\u27EA",
  Laplacetrf: "\u2112",
  Larr: "\u219E",
  Lcaron: "\u013D",
  Lcedil: "\u013B",
  Lcy: "\u041B",
  LeftAngleBracket: "\u27E8",
  LeftArrow: "\u2190",
  LeftArrowBar: "\u21E4",
  LeftArrowRightArrow: "\u21C6",
  LeftCeiling: "\u2308",
  LeftDoubleBracket: "\u27E6",
  LeftDownTeeVector: "\u2961",
  LeftDownVector: "\u21C3",
  LeftDownVectorBar: "\u2959",
  LeftFloor: "\u230A",
  LeftRightArrow: "\u2194",
  LeftRightVector: "\u294E",
  LeftTee: "\u22A3",
  LeftTeeArrow: "\u21A4",
  LeftTeeVector: "\u295A",
  LeftTriangle: "\u22B2",
  LeftTriangleBar: "\u29CF",
  LeftTriangleEqual: "\u22B4",
  LeftUpDownVector: "\u2951",
  LeftUpTeeVector: "\u2960",
  LeftUpVector: "\u21BF",
  LeftUpVectorBar: "\u2958",
  LeftVector: "\u21BC",
  LeftVectorBar: "\u2952",
  Leftarrow: "\u21D0",
  Leftrightarrow: "\u21D4",
  LessEqualGreater: "\u22DA",
  LessFullEqual: "\u2266",
  LessGreater: "\u2276",
  LessLess: "\u2AA1",
  LessSlantEqual: "\u2A7D",
  LessTilde: "\u2272",
  Lfr: "\u{1D50F}",
  Ll: "\u22D8",
  Lleftarrow: "\u21DA",
  Lmidot: "\u013F",
  LongLeftArrow: "\u27F5",
  LongLeftRightArrow: "\u27F7",
  LongRightArrow: "\u27F6",
  Longleftarrow: "\u27F8",
  Longleftrightarrow: "\u27FA",
  Longrightarrow: "\u27F9",
  Lopf: "\u{1D543}",
  LowerLeftArrow: "\u2199",
  LowerRightArrow: "\u2198",
  Lscr: "\u2112",
  Lsh: "\u21B0",
  Lstrok: "\u0141",
  Lt: "\u226A",
  Map: "\u2905",
  Mcy: "\u041C",
  MediumSpace: "\u205F",
  Mellintrf: "\u2133",
  Mfr: "\u{1D510}",
  MinusPlus: "\u2213",
  Mopf: "\u{1D544}",
  Mscr: "\u2133",
  Mu: "\u039C",
  NJcy: "\u040A",
  Nacute: "\u0143",
  Ncaron: "\u0147",
  Ncedil: "\u0145",
  Ncy: "\u041D",
  NegativeMediumSpace: "\u200B",
  NegativeThickSpace: "\u200B",
  NegativeThinSpace: "\u200B",
  NegativeVeryThinSpace: "\u200B",
  NestedGreaterGreater: "\u226B",
  NestedLessLess: "\u226A",
  NewLine: `
`,
  Nfr: "\u{1D511}",
  NoBreak: "\u2060",
  NonBreakingSpace: "\xA0",
  Nopf: "\u2115",
  Not: "\u2AEC",
  NotCongruent: "\u2262",
  NotCupCap: "\u226D",
  NotDoubleVerticalBar: "\u2226",
  NotElement: "\u2209",
  NotEqual: "\u2260",
  NotEqualTilde: "\u2242\u0338",
  NotExists: "\u2204",
  NotGreater: "\u226F",
  NotGreaterEqual: "\u2271",
  NotGreaterFullEqual: "\u2267\u0338",
  NotGreaterGreater: "\u226B\u0338",
  NotGreaterLess: "\u2279",
  NotGreaterSlantEqual: "\u2A7E\u0338",
  NotGreaterTilde: "\u2275",
  NotHumpDownHump: "\u224E\u0338",
  NotHumpEqual: "\u224F\u0338",
  NotLeftTriangle: "\u22EA",
  NotLeftTriangleBar: "\u29CF\u0338",
  NotLeftTriangleEqual: "\u22EC",
  NotLess: "\u226E",
  NotLessEqual: "\u2270",
  NotLessGreater: "\u2278",
  NotLessLess: "\u226A\u0338",
  NotLessSlantEqual: "\u2A7D\u0338",
  NotLessTilde: "\u2274",
  NotNestedGreaterGreater: "\u2AA2\u0338",
  NotNestedLessLess: "\u2AA1\u0338",
  NotPrecedes: "\u2280",
  NotPrecedesEqual: "\u2AAF\u0338",
  NotPrecedesSlantEqual: "\u22E0",
  NotReverseElement: "\u220C",
  NotRightTriangle: "\u22EB",
  NotRightTriangleBar: "\u29D0\u0338",
  NotRightTriangleEqual: "\u22ED",
  NotSquareSubset: "\u228F\u0338",
  NotSquareSubsetEqual: "\u22E2",
  NotSquareSuperset: "\u2290\u0338",
  NotSquareSupersetEqual: "\u22E3",
  NotSubset: "\u2282\u20D2",
  NotSubsetEqual: "\u2288",
  NotSucceeds: "\u2281",
  NotSucceedsEqual: "\u2AB0\u0338",
  NotSucceedsSlantEqual: "\u22E1",
  NotSucceedsTilde: "\u227F\u0338",
  NotSuperset: "\u2283\u20D2",
  NotSupersetEqual: "\u2289",
  NotTilde: "\u2241",
  NotTildeEqual: "\u2244",
  NotTildeFullEqual: "\u2247",
  NotTildeTilde: "\u2249",
  NotVerticalBar: "\u2224",
  Nscr: "\u{1D4A9}",
  Ntilde: "\xD1",
  Nu: "\u039D",
  OElig: "\u0152",
  Oacute: "\xD3",
  Ocirc: "\xD4",
  Ocy: "\u041E",
  Odblac: "\u0150",
  Ofr: "\u{1D512}",
  Ograve: "\xD2",
  Omacr: "\u014C",
  Omega: "\u03A9",
  Omicron: "\u039F",
  Oopf: "\u{1D546}",
  OpenCurlyDoubleQuote: "\u201C",
  OpenCurlyQuote: "\u2018",
  Or: "\u2A54",
  Oscr: "\u{1D4AA}",
  Oslash: "\xD8",
  Otilde: "\xD5",
  Otimes: "\u2A37",
  Ouml: "\xD6",
  OverBar: "\u203E",
  OverBrace: "\u23DE",
  OverBracket: "\u23B4",
  OverParenthesis: "\u23DC",
  PartialD: "\u2202",
  Pcy: "\u041F",
  Pfr: "\u{1D513}",
  Phi: "\u03A6",
  Pi: "\u03A0",
  PlusMinus: "\xB1",
  Poincareplane: "\u210C",
  Popf: "\u2119",
  Pr: "\u2ABB",
  Precedes: "\u227A",
  PrecedesEqual: "\u2AAF",
  PrecedesSlantEqual: "\u227C",
  PrecedesTilde: "\u227E",
  Prime: "\u2033",
  Product: "\u220F",
  Proportion: "\u2237",
  Proportional: "\u221D",
  Pscr: "\u{1D4AB}",
  Psi: "\u03A8",
  QUOT: '"',
  Qfr: "\u{1D514}",
  Qopf: "\u211A",
  Qscr: "\u{1D4AC}",
  RBarr: "\u2910",
  REG: "\xAE",
  Racute: "\u0154",
  Rang: "\u27EB",
  Rarr: "\u21A0",
  Rarrtl: "\u2916",
  Rcaron: "\u0158",
  Rcedil: "\u0156",
  Rcy: "\u0420",
  Re: "\u211C",
  ReverseElement: "\u220B",
  ReverseEquilibrium: "\u21CB",
  ReverseUpEquilibrium: "\u296F",
  Rfr: "\u211C",
  Rho: "\u03A1",
  RightAngleBracket: "\u27E9",
  RightArrow: "\u2192",
  RightArrowBar: "\u21E5",
  RightArrowLeftArrow: "\u21C4",
  RightCeiling: "\u2309",
  RightDoubleBracket: "\u27E7",
  RightDownTeeVector: "\u295D",
  RightDownVector: "\u21C2",
  RightDownVectorBar: "\u2955",
  RightFloor: "\u230B",
  RightTee: "\u22A2",
  RightTeeArrow: "\u21A6",
  RightTeeVector: "\u295B",
  RightTriangle: "\u22B3",
  RightTriangleBar: "\u29D0",
  RightTriangleEqual: "\u22B5",
  RightUpDownVector: "\u294F",
  RightUpTeeVector: "\u295C",
  RightUpVector: "\u21BE",
  RightUpVectorBar: "\u2954",
  RightVector: "\u21C0",
  RightVectorBar: "\u2953",
  Rightarrow: "\u21D2",
  Ropf: "\u211D",
  RoundImplies: "\u2970",
  Rrightarrow: "\u21DB",
  Rscr: "\u211B",
  Rsh: "\u21B1",
  RuleDelayed: "\u29F4",
  SHCHcy: "\u0429",
  SHcy: "\u0428",
  SOFTcy: "\u042C",
  Sacute: "\u015A",
  Sc: "\u2ABC",
  Scaron: "\u0160",
  Scedil: "\u015E",
  Scirc: "\u015C",
  Scy: "\u0421",
  Sfr: "\u{1D516}",
  ShortDownArrow: "\u2193",
  ShortLeftArrow: "\u2190",
  ShortRightArrow: "\u2192",
  ShortUpArrow: "\u2191",
  Sigma: "\u03A3",
  SmallCircle: "\u2218",
  Sopf: "\u{1D54A}",
  Sqrt: "\u221A",
  Square: "\u25A1",
  SquareIntersection: "\u2293",
  SquareSubset: "\u228F",
  SquareSubsetEqual: "\u2291",
  SquareSuperset: "\u2290",
  SquareSupersetEqual: "\u2292",
  SquareUnion: "\u2294",
  Sscr: "\u{1D4AE}",
  Star: "\u22C6",
  Sub: "\u22D0",
  Subset: "\u22D0",
  SubsetEqual: "\u2286",
  Succeeds: "\u227B",
  SucceedsEqual: "\u2AB0",
  SucceedsSlantEqual: "\u227D",
  SucceedsTilde: "\u227F",
  SuchThat: "\u220B",
  Sum: "\u2211",
  Sup: "\u22D1",
  Superset: "\u2283",
  SupersetEqual: "\u2287",
  Supset: "\u22D1",
  THORN: "\xDE",
  TRADE: "\u2122",
  TSHcy: "\u040B",
  TScy: "\u0426",
  Tab: "	",
  Tau: "\u03A4",
  Tcaron: "\u0164",
  Tcedil: "\u0162",
  Tcy: "\u0422",
  Tfr: "\u{1D517}",
  Therefore: "\u2234",
  Theta: "\u0398",
  ThickSpace: "\u205F\u200A",
  ThinSpace: "\u2009",
  Tilde: "\u223C",
  TildeEqual: "\u2243",
  TildeFullEqual: "\u2245",
  TildeTilde: "\u2248",
  Topf: "\u{1D54B}",
  TripleDot: "\u20DB",
  Tscr: "\u{1D4AF}",
  Tstrok: "\u0166",
  Uacute: "\xDA",
  Uarr: "\u219F",
  Uarrocir: "\u2949",
  Ubrcy: "\u040E",
  Ubreve: "\u016C",
  Ucirc: "\xDB",
  Ucy: "\u0423",
  Udblac: "\u0170",
  Ufr: "\u{1D518}",
  Ugrave: "\xD9",
  Umacr: "\u016A",
  UnderBar: "_",
  UnderBrace: "\u23DF",
  UnderBracket: "\u23B5",
  UnderParenthesis: "\u23DD",
  Union: "\u22C3",
  UnionPlus: "\u228E",
  Uogon: "\u0172",
  Uopf: "\u{1D54C}",
  UpArrow: "\u2191",
  UpArrowBar: "\u2912",
  UpArrowDownArrow: "\u21C5",
  UpDownArrow: "\u2195",
  UpEquilibrium: "\u296E",
  UpTee: "\u22A5",
  UpTeeArrow: "\u21A5",
  Uparrow: "\u21D1",
  Updownarrow: "\u21D5",
  UpperLeftArrow: "\u2196",
  UpperRightArrow: "\u2197",
  Upsi: "\u03D2",
  Upsilon: "\u03A5",
  Uring: "\u016E",
  Uscr: "\u{1D4B0}",
  Utilde: "\u0168",
  Uuml: "\xDC",
  VDash: "\u22AB",
  Vbar: "\u2AEB",
  Vcy: "\u0412",
  Vdash: "\u22A9",
  Vdashl: "\u2AE6",
  Vee: "\u22C1",
  Verbar: "\u2016",
  Vert: "\u2016",
  VerticalBar: "\u2223",
  VerticalLine: "|",
  VerticalSeparator: "\u2758",
  VerticalTilde: "\u2240",
  VeryThinSpace: "\u200A",
  Vfr: "\u{1D519}",
  Vopf: "\u{1D54D}",
  Vscr: "\u{1D4B1}",
  Vvdash: "\u22AA",
  Wcirc: "\u0174",
  Wedge: "\u22C0",
  Wfr: "\u{1D51A}",
  Wopf: "\u{1D54E}",
  Wscr: "\u{1D4B2}",
  Xfr: "\u{1D51B}",
  Xi: "\u039E",
  Xopf: "\u{1D54F}",
  Xscr: "\u{1D4B3}",
  YAcy: "\u042F",
  YIcy: "\u0407",
  YUcy: "\u042E",
  Yacute: "\xDD",
  Ycirc: "\u0176",
  Ycy: "\u042B",
  Yfr: "\u{1D51C}",
  Yopf: "\u{1D550}",
  Yscr: "\u{1D4B4}",
  Yuml: "\u0178",
  ZHcy: "\u0416",
  Zacute: "\u0179",
  Zcaron: "\u017D",
  Zcy: "\u0417",
  Zdot: "\u017B",
  ZeroWidthSpace: "\u200B",
  Zeta: "\u0396",
  Zfr: "\u2128",
  Zopf: "\u2124",
  Zscr: "\u{1D4B5}",
  aacute: "\xE1",
  abreve: "\u0103",
  ac: "\u223E",
  acE: "\u223E\u0333",
  acd: "\u223F",
  acirc: "\xE2",
  acute: "\xB4",
  acy: "\u0430",
  aelig: "\xE6",
  af: "\u2061",
  afr: "\u{1D51E}",
  agrave: "\xE0",
  alefsym: "\u2135",
  aleph: "\u2135",
  alpha: "\u03B1",
  amacr: "\u0101",
  amalg: "\u2A3F",
  amp: "&",
  and: "\u2227",
  andand: "\u2A55",
  andd: "\u2A5C",
  andslope: "\u2A58",
  andv: "\u2A5A",
  ang: "\u2220",
  ange: "\u29A4",
  angle: "\u2220",
  angmsd: "\u2221",
  angmsdaa: "\u29A8",
  angmsdab: "\u29A9",
  angmsdac: "\u29AA",
  angmsdad: "\u29AB",
  angmsdae: "\u29AC",
  angmsdaf: "\u29AD",
  angmsdag: "\u29AE",
  angmsdah: "\u29AF",
  angrt: "\u221F",
  angrtvb: "\u22BE",
  angrtvbd: "\u299D",
  angsph: "\u2222",
  angst: "\xC5",
  angzarr: "\u237C",
  aogon: "\u0105",
  aopf: "\u{1D552}",
  ap: "\u2248",
  apE: "\u2A70",
  apacir: "\u2A6F",
  ape: "\u224A",
  apid: "\u224B",
  apos: "'",
  approx: "\u2248",
  approxeq: "\u224A",
  aring: "\xE5",
  ascr: "\u{1D4B6}",
  ast: "*",
  asymp: "\u2248",
  asympeq: "\u224D",
  atilde: "\xE3",
  auml: "\xE4",
  awconint: "\u2233",
  awint: "\u2A11",
  bNot: "\u2AED",
  backcong: "\u224C",
  backepsilon: "\u03F6",
  backprime: "\u2035",
  backsim: "\u223D",
  backsimeq: "\u22CD",
  barvee: "\u22BD",
  barwed: "\u2305",
  barwedge: "\u2305",
  bbrk: "\u23B5",
  bbrktbrk: "\u23B6",
  bcong: "\u224C",
  bcy: "\u0431",
  bdquo: "\u201E",
  becaus: "\u2235",
  because: "\u2235",
  bemptyv: "\u29B0",
  bepsi: "\u03F6",
  bernou: "\u212C",
  beta: "\u03B2",
  beth: "\u2136",
  between: "\u226C",
  bfr: "\u{1D51F}",
  bigcap: "\u22C2",
  bigcirc: "\u25EF",
  bigcup: "\u22C3",
  bigodot: "\u2A00",
  bigoplus: "\u2A01",
  bigotimes: "\u2A02",
  bigsqcup: "\u2A06",
  bigstar: "\u2605",
  bigtriangledown: "\u25BD",
  bigtriangleup: "\u25B3",
  biguplus: "\u2A04",
  bigvee: "\u22C1",
  bigwedge: "\u22C0",
  bkarow: "\u290D",
  blacklozenge: "\u29EB",
  blacksquare: "\u25AA",
  blacktriangle: "\u25B4",
  blacktriangledown: "\u25BE",
  blacktriangleleft: "\u25C2",
  blacktriangleright: "\u25B8",
  blank: "\u2423",
  blk12: "\u2592",
  blk14: "\u2591",
  blk34: "\u2593",
  block: "\u2588",
  bne: "=\u20E5",
  bnequiv: "\u2261\u20E5",
  bnot: "\u2310",
  bopf: "\u{1D553}",
  bot: "\u22A5",
  bottom: "\u22A5",
  bowtie: "\u22C8",
  boxDL: "\u2557",
  boxDR: "\u2554",
  boxDl: "\u2556",
  boxDr: "\u2553",
  boxH: "\u2550",
  boxHD: "\u2566",
  boxHU: "\u2569",
  boxHd: "\u2564",
  boxHu: "\u2567",
  boxUL: "\u255D",
  boxUR: "\u255A",
  boxUl: "\u255C",
  boxUr: "\u2559",
  boxV: "\u2551",
  boxVH: "\u256C",
  boxVL: "\u2563",
  boxVR: "\u2560",
  boxVh: "\u256B",
  boxVl: "\u2562",
  boxVr: "\u255F",
  boxbox: "\u29C9",
  boxdL: "\u2555",
  boxdR: "\u2552",
  boxdl: "\u2510",
  boxdr: "\u250C",
  boxh: "\u2500",
  boxhD: "\u2565",
  boxhU: "\u2568",
  boxhd: "\u252C",
  boxhu: "\u2534",
  boxminus: "\u229F",
  boxplus: "\u229E",
  boxtimes: "\u22A0",
  boxuL: "\u255B",
  boxuR: "\u2558",
  boxul: "\u2518",
  boxur: "\u2514",
  boxv: "\u2502",
  boxvH: "\u256A",
  boxvL: "\u2561",
  boxvR: "\u255E",
  boxvh: "\u253C",
  boxvl: "\u2524",
  boxvr: "\u251C",
  bprime: "\u2035",
  breve: "\u02D8",
  brvbar: "\xA6",
  bscr: "\u{1D4B7}",
  bsemi: "\u204F",
  bsim: "\u223D",
  bsime: "\u22CD",
  bsol: "\\",
  bsolb: "\u29C5",
  bsolhsub: "\u27C8",
  bull: "\u2022",
  bullet: "\u2022",
  bump: "\u224E",
  bumpE: "\u2AAE",
  bumpe: "\u224F",
  bumpeq: "\u224F",
  cacute: "\u0107",
  cap: "\u2229",
  capand: "\u2A44",
  capbrcup: "\u2A49",
  capcap: "\u2A4B",
  capcup: "\u2A47",
  capdot: "\u2A40",
  caps: "\u2229\uFE00",
  caret: "\u2041",
  caron: "\u02C7",
  ccaps: "\u2A4D",
  ccaron: "\u010D",
  ccedil: "\xE7",
  ccirc: "\u0109",
  ccups: "\u2A4C",
  ccupssm: "\u2A50",
  cdot: "\u010B",
  cedil: "\xB8",
  cemptyv: "\u29B2",
  cent: "\xA2",
  centerdot: "\xB7",
  cfr: "\u{1D520}",
  chcy: "\u0447",
  check: "\u2713",
  checkmark: "\u2713",
  chi: "\u03C7",
  cir: "\u25CB",
  cirE: "\u29C3",
  circ: "\u02C6",
  circeq: "\u2257",
  circlearrowleft: "\u21BA",
  circlearrowright: "\u21BB",
  circledR: "\xAE",
  circledS: "\u24C8",
  circledast: "\u229B",
  circledcirc: "\u229A",
  circleddash: "\u229D",
  cire: "\u2257",
  cirfnint: "\u2A10",
  cirmid: "\u2AEF",
  cirscir: "\u29C2",
  clubs: "\u2663",
  clubsuit: "\u2663",
  colon: ":",
  colone: "\u2254",
  coloneq: "\u2254",
  comma: ",",
  commat: "@",
  comp: "\u2201",
  compfn: "\u2218",
  complement: "\u2201",
  complexes: "\u2102",
  cong: "\u2245",
  congdot: "\u2A6D",
  conint: "\u222E",
  copf: "\u{1D554}",
  coprod: "\u2210",
  copy: "\xA9",
  copysr: "\u2117",
  crarr: "\u21B5",
  cross: "\u2717",
  cscr: "\u{1D4B8}",
  csub: "\u2ACF",
  csube: "\u2AD1",
  csup: "\u2AD0",
  csupe: "\u2AD2",
  ctdot: "\u22EF",
  cudarrl: "\u2938",
  cudarrr: "\u2935",
  cuepr: "\u22DE",
  cuesc: "\u22DF",
  cularr: "\u21B6",
  cularrp: "\u293D",
  cup: "\u222A",
  cupbrcap: "\u2A48",
  cupcap: "\u2A46",
  cupcup: "\u2A4A",
  cupdot: "\u228D",
  cupor: "\u2A45",
  cups: "\u222A\uFE00",
  curarr: "\u21B7",
  curarrm: "\u293C",
  curlyeqprec: "\u22DE",
  curlyeqsucc: "\u22DF",
  curlyvee: "\u22CE",
  curlywedge: "\u22CF",
  curren: "\xA4",
  curvearrowleft: "\u21B6",
  curvearrowright: "\u21B7",
  cuvee: "\u22CE",
  cuwed: "\u22CF",
  cwconint: "\u2232",
  cwint: "\u2231",
  cylcty: "\u232D",
  dArr: "\u21D3",
  dHar: "\u2965",
  dagger: "\u2020",
  daleth: "\u2138",
  darr: "\u2193",
  dash: "\u2010",
  dashv: "\u22A3",
  dbkarow: "\u290F",
  dblac: "\u02DD",
  dcaron: "\u010F",
  dcy: "\u0434",
  dd: "\u2146",
  ddagger: "\u2021",
  ddarr: "\u21CA",
  ddotseq: "\u2A77",
  deg: "\xB0",
  delta: "\u03B4",
  demptyv: "\u29B1",
  dfisht: "\u297F",
  dfr: "\u{1D521}",
  dharl: "\u21C3",
  dharr: "\u21C2",
  diam: "\u22C4",
  diamond: "\u22C4",
  diamondsuit: "\u2666",
  diams: "\u2666",
  die: "\xA8",
  digamma: "\u03DD",
  disin: "\u22F2",
  div: "\xF7",
  divide: "\xF7",
  divideontimes: "\u22C7",
  divonx: "\u22C7",
  djcy: "\u0452",
  dlcorn: "\u231E",
  dlcrop: "\u230D",
  dollar: "$",
  dopf: "\u{1D555}",
  dot: "\u02D9",
  doteq: "\u2250",
  doteqdot: "\u2251",
  dotminus: "\u2238",
  dotplus: "\u2214",
  dotsquare: "\u22A1",
  doublebarwedge: "\u2306",
  downarrow: "\u2193",
  downdownarrows: "\u21CA",
  downharpoonleft: "\u21C3",
  downharpoonright: "\u21C2",
  drbkarow: "\u2910",
  drcorn: "\u231F",
  drcrop: "\u230C",
  dscr: "\u{1D4B9}",
  dscy: "\u0455",
  dsol: "\u29F6",
  dstrok: "\u0111",
  dtdot: "\u22F1",
  dtri: "\u25BF",
  dtrif: "\u25BE",
  duarr: "\u21F5",
  duhar: "\u296F",
  dwangle: "\u29A6",
  dzcy: "\u045F",
  dzigrarr: "\u27FF",
  eDDot: "\u2A77",
  eDot: "\u2251",
  eacute: "\xE9",
  easter: "\u2A6E",
  ecaron: "\u011B",
  ecir: "\u2256",
  ecirc: "\xEA",
  ecolon: "\u2255",
  ecy: "\u044D",
  edot: "\u0117",
  ee: "\u2147",
  efDot: "\u2252",
  efr: "\u{1D522}",
  eg: "\u2A9A",
  egrave: "\xE8",
  egs: "\u2A96",
  egsdot: "\u2A98",
  el: "\u2A99",
  elinters: "\u23E7",
  ell: "\u2113",
  els: "\u2A95",
  elsdot: "\u2A97",
  emacr: "\u0113",
  empty: "\u2205",
  emptyset: "\u2205",
  emptyv: "\u2205",
  emsp13: "\u2004",
  emsp14: "\u2005",
  emsp: "\u2003",
  eng: "\u014B",
  ensp: "\u2002",
  eogon: "\u0119",
  eopf: "\u{1D556}",
  epar: "\u22D5",
  eparsl: "\u29E3",
  eplus: "\u2A71",
  epsi: "\u03B5",
  epsilon: "\u03B5",
  epsiv: "\u03F5",
  eqcirc: "\u2256",
  eqcolon: "\u2255",
  eqsim: "\u2242",
  eqslantgtr: "\u2A96",
  eqslantless: "\u2A95",
  equals: "=",
  equest: "\u225F",
  equiv: "\u2261",
  equivDD: "\u2A78",
  eqvparsl: "\u29E5",
  erDot: "\u2253",
  erarr: "\u2971",
  escr: "\u212F",
  esdot: "\u2250",
  esim: "\u2242",
  eta: "\u03B7",
  eth: "\xF0",
  euml: "\xEB",
  euro: "\u20AC",
  excl: "!",
  exist: "\u2203",
  expectation: "\u2130",
  exponentiale: "\u2147",
  fallingdotseq: "\u2252",
  fcy: "\u0444",
  female: "\u2640",
  ffilig: "\uFB03",
  fflig: "\uFB00",
  ffllig: "\uFB04",
  ffr: "\u{1D523}",
  filig: "\uFB01",
  fjlig: "fj",
  flat: "\u266D",
  fllig: "\uFB02",
  fltns: "\u25B1",
  fnof: "\u0192",
  fopf: "\u{1D557}",
  forall: "\u2200",
  fork: "\u22D4",
  forkv: "\u2AD9",
  fpartint: "\u2A0D",
  frac12: "\xBD",
  frac13: "\u2153",
  frac14: "\xBC",
  frac15: "\u2155",
  frac16: "\u2159",
  frac18: "\u215B",
  frac23: "\u2154",
  frac25: "\u2156",
  frac34: "\xBE",
  frac35: "\u2157",
  frac38: "\u215C",
  frac45: "\u2158",
  frac56: "\u215A",
  frac58: "\u215D",
  frac78: "\u215E",
  frasl: "\u2044",
  frown: "\u2322",
  fscr: "\u{1D4BB}",
  gE: "\u2267",
  gEl: "\u2A8C",
  gacute: "\u01F5",
  gamma: "\u03B3",
  gammad: "\u03DD",
  gap: "\u2A86",
  gbreve: "\u011F",
  gcirc: "\u011D",
  gcy: "\u0433",
  gdot: "\u0121",
  ge: "\u2265",
  gel: "\u22DB",
  geq: "\u2265",
  geqq: "\u2267",
  geqslant: "\u2A7E",
  ges: "\u2A7E",
  gescc: "\u2AA9",
  gesdot: "\u2A80",
  gesdoto: "\u2A82",
  gesdotol: "\u2A84",
  gesl: "\u22DB\uFE00",
  gesles: "\u2A94",
  gfr: "\u{1D524}",
  gg: "\u226B",
  ggg: "\u22D9",
  gimel: "\u2137",
  gjcy: "\u0453",
  gl: "\u2277",
  glE: "\u2A92",
  gla: "\u2AA5",
  glj: "\u2AA4",
  gnE: "\u2269",
  gnap: "\u2A8A",
  gnapprox: "\u2A8A",
  gne: "\u2A88",
  gneq: "\u2A88",
  gneqq: "\u2269",
  gnsim: "\u22E7",
  gopf: "\u{1D558}",
  grave: "`",
  gscr: "\u210A",
  gsim: "\u2273",
  gsime: "\u2A8E",
  gsiml: "\u2A90",
  gt: ">",
  gtcc: "\u2AA7",
  gtcir: "\u2A7A",
  gtdot: "\u22D7",
  gtlPar: "\u2995",
  gtquest: "\u2A7C",
  gtrapprox: "\u2A86",
  gtrarr: "\u2978",
  gtrdot: "\u22D7",
  gtreqless: "\u22DB",
  gtreqqless: "\u2A8C",
  gtrless: "\u2277",
  gtrsim: "\u2273",
  gvertneqq: "\u2269\uFE00",
  gvnE: "\u2269\uFE00",
  hArr: "\u21D4",
  hairsp: "\u200A",
  half: "\xBD",
  hamilt: "\u210B",
  hardcy: "\u044A",
  harr: "\u2194",
  harrcir: "\u2948",
  harrw: "\u21AD",
  hbar: "\u210F",
  hcirc: "\u0125",
  hearts: "\u2665",
  heartsuit: "\u2665",
  hellip: "\u2026",
  hercon: "\u22B9",
  hfr: "\u{1D525}",
  hksearow: "\u2925",
  hkswarow: "\u2926",
  hoarr: "\u21FF",
  homtht: "\u223B",
  hookleftarrow: "\u21A9",
  hookrightarrow: "\u21AA",
  hopf: "\u{1D559}",
  horbar: "\u2015",
  hscr: "\u{1D4BD}",
  hslash: "\u210F",
  hstrok: "\u0127",
  hybull: "\u2043",
  hyphen: "\u2010",
  iacute: "\xED",
  ic: "\u2063",
  icirc: "\xEE",
  icy: "\u0438",
  iecy: "\u0435",
  iexcl: "\xA1",
  iff: "\u21D4",
  ifr: "\u{1D526}",
  igrave: "\xEC",
  ii: "\u2148",
  iiiint: "\u2A0C",
  iiint: "\u222D",
  iinfin: "\u29DC",
  iiota: "\u2129",
  ijlig: "\u0133",
  imacr: "\u012B",
  image: "\u2111",
  imagline: "\u2110",
  imagpart: "\u2111",
  imath: "\u0131",
  imof: "\u22B7",
  imped: "\u01B5",
  in: "\u2208",
  incare: "\u2105",
  infin: "\u221E",
  infintie: "\u29DD",
  inodot: "\u0131",
  int: "\u222B",
  intcal: "\u22BA",
  integers: "\u2124",
  intercal: "\u22BA",
  intlarhk: "\u2A17",
  intprod: "\u2A3C",
  iocy: "\u0451",
  iogon: "\u012F",
  iopf: "\u{1D55A}",
  iota: "\u03B9",
  iprod: "\u2A3C",
  iquest: "\xBF",
  iscr: "\u{1D4BE}",
  isin: "\u2208",
  isinE: "\u22F9",
  isindot: "\u22F5",
  isins: "\u22F4",
  isinsv: "\u22F3",
  isinv: "\u2208",
  it: "\u2062",
  itilde: "\u0129",
  iukcy: "\u0456",
  iuml: "\xEF",
  jcirc: "\u0135",
  jcy: "\u0439",
  jfr: "\u{1D527}",
  jmath: "\u0237",
  jopf: "\u{1D55B}",
  jscr: "\u{1D4BF}",
  jsercy: "\u0458",
  jukcy: "\u0454",
  kappa: "\u03BA",
  kappav: "\u03F0",
  kcedil: "\u0137",
  kcy: "\u043A",
  kfr: "\u{1D528}",
  kgreen: "\u0138",
  khcy: "\u0445",
  kjcy: "\u045C",
  kopf: "\u{1D55C}",
  kscr: "\u{1D4C0}",
  lAarr: "\u21DA",
  lArr: "\u21D0",
  lAtail: "\u291B",
  lBarr: "\u290E",
  lE: "\u2266",
  lEg: "\u2A8B",
  lHar: "\u2962",
  lacute: "\u013A",
  laemptyv: "\u29B4",
  lagran: "\u2112",
  lambda: "\u03BB",
  lang: "\u27E8",
  langd: "\u2991",
  langle: "\u27E8",
  lap: "\u2A85",
  laquo: "\xAB",
  larr: "\u2190",
  larrb: "\u21E4",
  larrbfs: "\u291F",
  larrfs: "\u291D",
  larrhk: "\u21A9",
  larrlp: "\u21AB",
  larrpl: "\u2939",
  larrsim: "\u2973",
  larrtl: "\u21A2",
  lat: "\u2AAB",
  latail: "\u2919",
  late: "\u2AAD",
  lates: "\u2AAD\uFE00",
  lbarr: "\u290C",
  lbbrk: "\u2772",
  lbrace: "{",
  lbrack: "[",
  lbrke: "\u298B",
  lbrksld: "\u298F",
  lbrkslu: "\u298D",
  lcaron: "\u013E",
  lcedil: "\u013C",
  lceil: "\u2308",
  lcub: "{",
  lcy: "\u043B",
  ldca: "\u2936",
  ldquo: "\u201C",
  ldquor: "\u201E",
  ldrdhar: "\u2967",
  ldrushar: "\u294B",
  ldsh: "\u21B2",
  le: "\u2264",
  leftarrow: "\u2190",
  leftarrowtail: "\u21A2",
  leftharpoondown: "\u21BD",
  leftharpoonup: "\u21BC",
  leftleftarrows: "\u21C7",
  leftrightarrow: "\u2194",
  leftrightarrows: "\u21C6",
  leftrightharpoons: "\u21CB",
  leftrightsquigarrow: "\u21AD",
  leftthreetimes: "\u22CB",
  leg: "\u22DA",
  leq: "\u2264",
  leqq: "\u2266",
  leqslant: "\u2A7D",
  les: "\u2A7D",
  lescc: "\u2AA8",
  lesdot: "\u2A7F",
  lesdoto: "\u2A81",
  lesdotor: "\u2A83",
  lesg: "\u22DA\uFE00",
  lesges: "\u2A93",
  lessapprox: "\u2A85",
  lessdot: "\u22D6",
  lesseqgtr: "\u22DA",
  lesseqqgtr: "\u2A8B",
  lessgtr: "\u2276",
  lesssim: "\u2272",
  lfisht: "\u297C",
  lfloor: "\u230A",
  lfr: "\u{1D529}",
  lg: "\u2276",
  lgE: "\u2A91",
  lhard: "\u21BD",
  lharu: "\u21BC",
  lharul: "\u296A",
  lhblk: "\u2584",
  ljcy: "\u0459",
  ll: "\u226A",
  llarr: "\u21C7",
  llcorner: "\u231E",
  llhard: "\u296B",
  lltri: "\u25FA",
  lmidot: "\u0140",
  lmoust: "\u23B0",
  lmoustache: "\u23B0",
  lnE: "\u2268",
  lnap: "\u2A89",
  lnapprox: "\u2A89",
  lne: "\u2A87",
  lneq: "\u2A87",
  lneqq: "\u2268",
  lnsim: "\u22E6",
  loang: "\u27EC",
  loarr: "\u21FD",
  lobrk: "\u27E6",
  longleftarrow: "\u27F5",
  longleftrightarrow: "\u27F7",
  longmapsto: "\u27FC",
  longrightarrow: "\u27F6",
  looparrowleft: "\u21AB",
  looparrowright: "\u21AC",
  lopar: "\u2985",
  lopf: "\u{1D55D}",
  loplus: "\u2A2D",
  lotimes: "\u2A34",
  lowast: "\u2217",
  lowbar: "_",
  loz: "\u25CA",
  lozenge: "\u25CA",
  lozf: "\u29EB",
  lpar: "(",
  lparlt: "\u2993",
  lrarr: "\u21C6",
  lrcorner: "\u231F",
  lrhar: "\u21CB",
  lrhard: "\u296D",
  lrm: "\u200E",
  lrtri: "\u22BF",
  lsaquo: "\u2039",
  lscr: "\u{1D4C1}",
  lsh: "\u21B0",
  lsim: "\u2272",
  lsime: "\u2A8D",
  lsimg: "\u2A8F",
  lsqb: "[",
  lsquo: "\u2018",
  lsquor: "\u201A",
  lstrok: "\u0142",
  lt: "<",
  ltcc: "\u2AA6",
  ltcir: "\u2A79",
  ltdot: "\u22D6",
  lthree: "\u22CB",
  ltimes: "\u22C9",
  ltlarr: "\u2976",
  ltquest: "\u2A7B",
  ltrPar: "\u2996",
  ltri: "\u25C3",
  ltrie: "\u22B4",
  ltrif: "\u25C2",
  lurdshar: "\u294A",
  luruhar: "\u2966",
  lvertneqq: "\u2268\uFE00",
  lvnE: "\u2268\uFE00",
  mDDot: "\u223A",
  macr: "\xAF",
  male: "\u2642",
  malt: "\u2720",
  maltese: "\u2720",
  map: "\u21A6",
  mapsto: "\u21A6",
  mapstodown: "\u21A7",
  mapstoleft: "\u21A4",
  mapstoup: "\u21A5",
  marker: "\u25AE",
  mcomma: "\u2A29",
  mcy: "\u043C",
  mdash: "\u2014",
  measuredangle: "\u2221",
  mfr: "\u{1D52A}",
  mho: "\u2127",
  micro: "\xB5",
  mid: "\u2223",
  midast: "*",
  midcir: "\u2AF0",
  middot: "\xB7",
  minus: "\u2212",
  minusb: "\u229F",
  minusd: "\u2238",
  minusdu: "\u2A2A",
  mlcp: "\u2ADB",
  mldr: "\u2026",
  mnplus: "\u2213",
  models: "\u22A7",
  mopf: "\u{1D55E}",
  mp: "\u2213",
  mscr: "\u{1D4C2}",
  mstpos: "\u223E",
  mu: "\u03BC",
  multimap: "\u22B8",
  mumap: "\u22B8",
  nGg: "\u22D9\u0338",
  nGt: "\u226B\u20D2",
  nGtv: "\u226B\u0338",
  nLeftarrow: "\u21CD",
  nLeftrightarrow: "\u21CE",
  nLl: "\u22D8\u0338",
  nLt: "\u226A\u20D2",
  nLtv: "\u226A\u0338",
  nRightarrow: "\u21CF",
  nVDash: "\u22AF",
  nVdash: "\u22AE",
  nabla: "\u2207",
  nacute: "\u0144",
  nang: "\u2220\u20D2",
  nap: "\u2249",
  napE: "\u2A70\u0338",
  napid: "\u224B\u0338",
  napos: "\u0149",
  napprox: "\u2249",
  natur: "\u266E",
  natural: "\u266E",
  naturals: "\u2115",
  nbsp: "\xA0",
  nbump: "\u224E\u0338",
  nbumpe: "\u224F\u0338",
  ncap: "\u2A43",
  ncaron: "\u0148",
  ncedil: "\u0146",
  ncong: "\u2247",
  ncongdot: "\u2A6D\u0338",
  ncup: "\u2A42",
  ncy: "\u043D",
  ndash: "\u2013",
  ne: "\u2260",
  neArr: "\u21D7",
  nearhk: "\u2924",
  nearr: "\u2197",
  nearrow: "\u2197",
  nedot: "\u2250\u0338",
  nequiv: "\u2262",
  nesear: "\u2928",
  nesim: "\u2242\u0338",
  nexist: "\u2204",
  nexists: "\u2204",
  nfr: "\u{1D52B}",
  ngE: "\u2267\u0338",
  nge: "\u2271",
  ngeq: "\u2271",
  ngeqq: "\u2267\u0338",
  ngeqslant: "\u2A7E\u0338",
  nges: "\u2A7E\u0338",
  ngsim: "\u2275",
  ngt: "\u226F",
  ngtr: "\u226F",
  nhArr: "\u21CE",
  nharr: "\u21AE",
  nhpar: "\u2AF2",
  ni: "\u220B",
  nis: "\u22FC",
  nisd: "\u22FA",
  niv: "\u220B",
  njcy: "\u045A",
  nlArr: "\u21CD",
  nlE: "\u2266\u0338",
  nlarr: "\u219A",
  nldr: "\u2025",
  nle: "\u2270",
  nleftarrow: "\u219A",
  nleftrightarrow: "\u21AE",
  nleq: "\u2270",
  nleqq: "\u2266\u0338",
  nleqslant: "\u2A7D\u0338",
  nles: "\u2A7D\u0338",
  nless: "\u226E",
  nlsim: "\u2274",
  nlt: "\u226E",
  nltri: "\u22EA",
  nltrie: "\u22EC",
  nmid: "\u2224",
  nopf: "\u{1D55F}",
  not: "\xAC",
  notin: "\u2209",
  notinE: "\u22F9\u0338",
  notindot: "\u22F5\u0338",
  notinva: "\u2209",
  notinvb: "\u22F7",
  notinvc: "\u22F6",
  notni: "\u220C",
  notniva: "\u220C",
  notnivb: "\u22FE",
  notnivc: "\u22FD",
  npar: "\u2226",
  nparallel: "\u2226",
  nparsl: "\u2AFD\u20E5",
  npart: "\u2202\u0338",
  npolint: "\u2A14",
  npr: "\u2280",
  nprcue: "\u22E0",
  npre: "\u2AAF\u0338",
  nprec: "\u2280",
  npreceq: "\u2AAF\u0338",
  nrArr: "\u21CF",
  nrarr: "\u219B",
  nrarrc: "\u2933\u0338",
  nrarrw: "\u219D\u0338",
  nrightarrow: "\u219B",
  nrtri: "\u22EB",
  nrtrie: "\u22ED",
  nsc: "\u2281",
  nsccue: "\u22E1",
  nsce: "\u2AB0\u0338",
  nscr: "\u{1D4C3}",
  nshortmid: "\u2224",
  nshortparallel: "\u2226",
  nsim: "\u2241",
  nsime: "\u2244",
  nsimeq: "\u2244",
  nsmid: "\u2224",
  nspar: "\u2226",
  nsqsube: "\u22E2",
  nsqsupe: "\u22E3",
  nsub: "\u2284",
  nsubE: "\u2AC5\u0338",
  nsube: "\u2288",
  nsubset: "\u2282\u20D2",
  nsubseteq: "\u2288",
  nsubseteqq: "\u2AC5\u0338",
  nsucc: "\u2281",
  nsucceq: "\u2AB0\u0338",
  nsup: "\u2285",
  nsupE: "\u2AC6\u0338",
  nsupe: "\u2289",
  nsupset: "\u2283\u20D2",
  nsupseteq: "\u2289",
  nsupseteqq: "\u2AC6\u0338",
  ntgl: "\u2279",
  ntilde: "\xF1",
  ntlg: "\u2278",
  ntriangleleft: "\u22EA",
  ntrianglelefteq: "\u22EC",
  ntriangleright: "\u22EB",
  ntrianglerighteq: "\u22ED",
  nu: "\u03BD",
  num: "#",
  numero: "\u2116",
  numsp: "\u2007",
  nvDash: "\u22AD",
  nvHarr: "\u2904",
  nvap: "\u224D\u20D2",
  nvdash: "\u22AC",
  nvge: "\u2265\u20D2",
  nvgt: ">\u20D2",
  nvinfin: "\u29DE",
  nvlArr: "\u2902",
  nvle: "\u2264\u20D2",
  nvlt: "<\u20D2",
  nvltrie: "\u22B4\u20D2",
  nvrArr: "\u2903",
  nvrtrie: "\u22B5\u20D2",
  nvsim: "\u223C\u20D2",
  nwArr: "\u21D6",
  nwarhk: "\u2923",
  nwarr: "\u2196",
  nwarrow: "\u2196",
  nwnear: "\u2927",
  oS: "\u24C8",
  oacute: "\xF3",
  oast: "\u229B",
  ocir: "\u229A",
  ocirc: "\xF4",
  ocy: "\u043E",
  odash: "\u229D",
  odblac: "\u0151",
  odiv: "\u2A38",
  odot: "\u2299",
  odsold: "\u29BC",
  oelig: "\u0153",
  ofcir: "\u29BF",
  ofr: "\u{1D52C}",
  ogon: "\u02DB",
  ograve: "\xF2",
  ogt: "\u29C1",
  ohbar: "\u29B5",
  ohm: "\u03A9",
  oint: "\u222E",
  olarr: "\u21BA",
  olcir: "\u29BE",
  olcross: "\u29BB",
  oline: "\u203E",
  olt: "\u29C0",
  omacr: "\u014D",
  omega: "\u03C9",
  omicron: "\u03BF",
  omid: "\u29B6",
  ominus: "\u2296",
  oopf: "\u{1D560}",
  opar: "\u29B7",
  operp: "\u29B9",
  oplus: "\u2295",
  or: "\u2228",
  orarr: "\u21BB",
  ord: "\u2A5D",
  order: "\u2134",
  orderof: "\u2134",
  ordf: "\xAA",
  ordm: "\xBA",
  origof: "\u22B6",
  oror: "\u2A56",
  orslope: "\u2A57",
  orv: "\u2A5B",
  oscr: "\u2134",
  oslash: "\xF8",
  osol: "\u2298",
  otilde: "\xF5",
  otimes: "\u2297",
  otimesas: "\u2A36",
  ouml: "\xF6",
  ovbar: "\u233D",
  par: "\u2225",
  para: "\xB6",
  parallel: "\u2225",
  parsim: "\u2AF3",
  parsl: "\u2AFD",
  part: "\u2202",
  pcy: "\u043F",
  percnt: "%",
  period: ".",
  permil: "\u2030",
  perp: "\u22A5",
  pertenk: "\u2031",
  pfr: "\u{1D52D}",
  phi: "\u03C6",
  phiv: "\u03D5",
  phmmat: "\u2133",
  phone: "\u260E",
  pi: "\u03C0",
  pitchfork: "\u22D4",
  piv: "\u03D6",
  planck: "\u210F",
  planckh: "\u210E",
  plankv: "\u210F",
  plus: "+",
  plusacir: "\u2A23",
  plusb: "\u229E",
  pluscir: "\u2A22",
  plusdo: "\u2214",
  plusdu: "\u2A25",
  pluse: "\u2A72",
  plusmn: "\xB1",
  plussim: "\u2A26",
  plustwo: "\u2A27",
  pm: "\xB1",
  pointint: "\u2A15",
  popf: "\u{1D561}",
  pound: "\xA3",
  pr: "\u227A",
  prE: "\u2AB3",
  prap: "\u2AB7",
  prcue: "\u227C",
  pre: "\u2AAF",
  prec: "\u227A",
  precapprox: "\u2AB7",
  preccurlyeq: "\u227C",
  preceq: "\u2AAF",
  precnapprox: "\u2AB9",
  precneqq: "\u2AB5",
  precnsim: "\u22E8",
  precsim: "\u227E",
  prime: "\u2032",
  primes: "\u2119",
  prnE: "\u2AB5",
  prnap: "\u2AB9",
  prnsim: "\u22E8",
  prod: "\u220F",
  profalar: "\u232E",
  profline: "\u2312",
  profsurf: "\u2313",
  prop: "\u221D",
  propto: "\u221D",
  prsim: "\u227E",
  prurel: "\u22B0",
  pscr: "\u{1D4C5}",
  psi: "\u03C8",
  puncsp: "\u2008",
  qfr: "\u{1D52E}",
  qint: "\u2A0C",
  qopf: "\u{1D562}",
  qprime: "\u2057",
  qscr: "\u{1D4C6}",
  quaternions: "\u210D",
  quatint: "\u2A16",
  quest: "?",
  questeq: "\u225F",
  quot: '"',
  rAarr: "\u21DB",
  rArr: "\u21D2",
  rAtail: "\u291C",
  rBarr: "\u290F",
  rHar: "\u2964",
  race: "\u223D\u0331",
  racute: "\u0155",
  radic: "\u221A",
  raemptyv: "\u29B3",
  rang: "\u27E9",
  rangd: "\u2992",
  range: "\u29A5",
  rangle: "\u27E9",
  raquo: "\xBB",
  rarr: "\u2192",
  rarrap: "\u2975",
  rarrb: "\u21E5",
  rarrbfs: "\u2920",
  rarrc: "\u2933",
  rarrfs: "\u291E",
  rarrhk: "\u21AA",
  rarrlp: "\u21AC",
  rarrpl: "\u2945",
  rarrsim: "\u2974",
  rarrtl: "\u21A3",
  rarrw: "\u219D",
  ratail: "\u291A",
  ratio: "\u2236",
  rationals: "\u211A",
  rbarr: "\u290D",
  rbbrk: "\u2773",
  rbrace: "}",
  rbrack: "]",
  rbrke: "\u298C",
  rbrksld: "\u298E",
  rbrkslu: "\u2990",
  rcaron: "\u0159",
  rcedil: "\u0157",
  rceil: "\u2309",
  rcub: "}",
  rcy: "\u0440",
  rdca: "\u2937",
  rdldhar: "\u2969",
  rdquo: "\u201D",
  rdquor: "\u201D",
  rdsh: "\u21B3",
  real: "\u211C",
  realine: "\u211B",
  realpart: "\u211C",
  reals: "\u211D",
  rect: "\u25AD",
  reg: "\xAE",
  rfisht: "\u297D",
  rfloor: "\u230B",
  rfr: "\u{1D52F}",
  rhard: "\u21C1",
  rharu: "\u21C0",
  rharul: "\u296C",
  rho: "\u03C1",
  rhov: "\u03F1",
  rightarrow: "\u2192",
  rightarrowtail: "\u21A3",
  rightharpoondown: "\u21C1",
  rightharpoonup: "\u21C0",
  rightleftarrows: "\u21C4",
  rightleftharpoons: "\u21CC",
  rightrightarrows: "\u21C9",
  rightsquigarrow: "\u219D",
  rightthreetimes: "\u22CC",
  ring: "\u02DA",
  risingdotseq: "\u2253",
  rlarr: "\u21C4",
  rlhar: "\u21CC",
  rlm: "\u200F",
  rmoust: "\u23B1",
  rmoustache: "\u23B1",
  rnmid: "\u2AEE",
  roang: "\u27ED",
  roarr: "\u21FE",
  robrk: "\u27E7",
  ropar: "\u2986",
  ropf: "\u{1D563}",
  roplus: "\u2A2E",
  rotimes: "\u2A35",
  rpar: ")",
  rpargt: "\u2994",
  rppolint: "\u2A12",
  rrarr: "\u21C9",
  rsaquo: "\u203A",
  rscr: "\u{1D4C7}",
  rsh: "\u21B1",
  rsqb: "]",
  rsquo: "\u2019",
  rsquor: "\u2019",
  rthree: "\u22CC",
  rtimes: "\u22CA",
  rtri: "\u25B9",
  rtrie: "\u22B5",
  rtrif: "\u25B8",
  rtriltri: "\u29CE",
  ruluhar: "\u2968",
  rx: "\u211E",
  sacute: "\u015B",
  sbquo: "\u201A",
  sc: "\u227B",
  scE: "\u2AB4",
  scap: "\u2AB8",
  scaron: "\u0161",
  sccue: "\u227D",
  sce: "\u2AB0",
  scedil: "\u015F",
  scirc: "\u015D",
  scnE: "\u2AB6",
  scnap: "\u2ABA",
  scnsim: "\u22E9",
  scpolint: "\u2A13",
  scsim: "\u227F",
  scy: "\u0441",
  sdot: "\u22C5",
  sdotb: "\u22A1",
  sdote: "\u2A66",
  seArr: "\u21D8",
  searhk: "\u2925",
  searr: "\u2198",
  searrow: "\u2198",
  sect: "\xA7",
  semi: ";",
  seswar: "\u2929",
  setminus: "\u2216",
  setmn: "\u2216",
  sext: "\u2736",
  sfr: "\u{1D530}",
  sfrown: "\u2322",
  sharp: "\u266F",
  shchcy: "\u0449",
  shcy: "\u0448",
  shortmid: "\u2223",
  shortparallel: "\u2225",
  shy: "\xAD",
  sigma: "\u03C3",
  sigmaf: "\u03C2",
  sigmav: "\u03C2",
  sim: "\u223C",
  simdot: "\u2A6A",
  sime: "\u2243",
  simeq: "\u2243",
  simg: "\u2A9E",
  simgE: "\u2AA0",
  siml: "\u2A9D",
  simlE: "\u2A9F",
  simne: "\u2246",
  simplus: "\u2A24",
  simrarr: "\u2972",
  slarr: "\u2190",
  smallsetminus: "\u2216",
  smashp: "\u2A33",
  smeparsl: "\u29E4",
  smid: "\u2223",
  smile: "\u2323",
  smt: "\u2AAA",
  smte: "\u2AAC",
  smtes: "\u2AAC\uFE00",
  softcy: "\u044C",
  sol: "/",
  solb: "\u29C4",
  solbar: "\u233F",
  sopf: "\u{1D564}",
  spades: "\u2660",
  spadesuit: "\u2660",
  spar: "\u2225",
  sqcap: "\u2293",
  sqcaps: "\u2293\uFE00",
  sqcup: "\u2294",
  sqcups: "\u2294\uFE00",
  sqsub: "\u228F",
  sqsube: "\u2291",
  sqsubset: "\u228F",
  sqsubseteq: "\u2291",
  sqsup: "\u2290",
  sqsupe: "\u2292",
  sqsupset: "\u2290",
  sqsupseteq: "\u2292",
  squ: "\u25A1",
  square: "\u25A1",
  squarf: "\u25AA",
  squf: "\u25AA",
  srarr: "\u2192",
  sscr: "\u{1D4C8}",
  ssetmn: "\u2216",
  ssmile: "\u2323",
  sstarf: "\u22C6",
  star: "\u2606",
  starf: "\u2605",
  straightepsilon: "\u03F5",
  straightphi: "\u03D5",
  strns: "\xAF",
  sub: "\u2282",
  subE: "\u2AC5",
  subdot: "\u2ABD",
  sube: "\u2286",
  subedot: "\u2AC3",
  submult: "\u2AC1",
  subnE: "\u2ACB",
  subne: "\u228A",
  subplus: "\u2ABF",
  subrarr: "\u2979",
  subset: "\u2282",
  subseteq: "\u2286",
  subseteqq: "\u2AC5",
  subsetneq: "\u228A",
  subsetneqq: "\u2ACB",
  subsim: "\u2AC7",
  subsub: "\u2AD5",
  subsup: "\u2AD3",
  succ: "\u227B",
  succapprox: "\u2AB8",
  succcurlyeq: "\u227D",
  succeq: "\u2AB0",
  succnapprox: "\u2ABA",
  succneqq: "\u2AB6",
  succnsim: "\u22E9",
  succsim: "\u227F",
  sum: "\u2211",
  sung: "\u266A",
  sup1: "\xB9",
  sup2: "\xB2",
  sup3: "\xB3",
  sup: "\u2283",
  supE: "\u2AC6",
  supdot: "\u2ABE",
  supdsub: "\u2AD8",
  supe: "\u2287",
  supedot: "\u2AC4",
  suphsol: "\u27C9",
  suphsub: "\u2AD7",
  suplarr: "\u297B",
  supmult: "\u2AC2",
  supnE: "\u2ACC",
  supne: "\u228B",
  supplus: "\u2AC0",
  supset: "\u2283",
  supseteq: "\u2287",
  supseteqq: "\u2AC6",
  supsetneq: "\u228B",
  supsetneqq: "\u2ACC",
  supsim: "\u2AC8",
  supsub: "\u2AD4",
  supsup: "\u2AD6",
  swArr: "\u21D9",
  swarhk: "\u2926",
  swarr: "\u2199",
  swarrow: "\u2199",
  swnwar: "\u292A",
  szlig: "\xDF",
  target: "\u2316",
  tau: "\u03C4",
  tbrk: "\u23B4",
  tcaron: "\u0165",
  tcedil: "\u0163",
  tcy: "\u0442",
  tdot: "\u20DB",
  telrec: "\u2315",
  tfr: "\u{1D531}",
  there4: "\u2234",
  therefore: "\u2234",
  theta: "\u03B8",
  thetasym: "\u03D1",
  thetav: "\u03D1",
  thickapprox: "\u2248",
  thicksim: "\u223C",
  thinsp: "\u2009",
  thkap: "\u2248",
  thksim: "\u223C",
  thorn: "\xFE",
  tilde: "\u02DC",
  times: "\xD7",
  timesb: "\u22A0",
  timesbar: "\u2A31",
  timesd: "\u2A30",
  tint: "\u222D",
  toea: "\u2928",
  top: "\u22A4",
  topbot: "\u2336",
  topcir: "\u2AF1",
  topf: "\u{1D565}",
  topfork: "\u2ADA",
  tosa: "\u2929",
  tprime: "\u2034",
  trade: "\u2122",
  triangle: "\u25B5",
  triangledown: "\u25BF",
  triangleleft: "\u25C3",
  trianglelefteq: "\u22B4",
  triangleq: "\u225C",
  triangleright: "\u25B9",
  trianglerighteq: "\u22B5",
  tridot: "\u25EC",
  trie: "\u225C",
  triminus: "\u2A3A",
  triplus: "\u2A39",
  trisb: "\u29CD",
  tritime: "\u2A3B",
  trpezium: "\u23E2",
  tscr: "\u{1D4C9}",
  tscy: "\u0446",
  tshcy: "\u045B",
  tstrok: "\u0167",
  twixt: "\u226C",
  twoheadleftarrow: "\u219E",
  twoheadrightarrow: "\u21A0",
  uArr: "\u21D1",
  uHar: "\u2963",
  uacute: "\xFA",
  uarr: "\u2191",
  ubrcy: "\u045E",
  ubreve: "\u016D",
  ucirc: "\xFB",
  ucy: "\u0443",
  udarr: "\u21C5",
  udblac: "\u0171",
  udhar: "\u296E",
  ufisht: "\u297E",
  ufr: "\u{1D532}",
  ugrave: "\xF9",
  uharl: "\u21BF",
  uharr: "\u21BE",
  uhblk: "\u2580",
  ulcorn: "\u231C",
  ulcorner: "\u231C",
  ulcrop: "\u230F",
  ultri: "\u25F8",
  umacr: "\u016B",
  uml: "\xA8",
  uogon: "\u0173",
  uopf: "\u{1D566}",
  uparrow: "\u2191",
  updownarrow: "\u2195",
  upharpoonleft: "\u21BF",
  upharpoonright: "\u21BE",
  uplus: "\u228E",
  upsi: "\u03C5",
  upsih: "\u03D2",
  upsilon: "\u03C5",
  upuparrows: "\u21C8",
  urcorn: "\u231D",
  urcorner: "\u231D",
  urcrop: "\u230E",
  uring: "\u016F",
  urtri: "\u25F9",
  uscr: "\u{1D4CA}",
  utdot: "\u22F0",
  utilde: "\u0169",
  utri: "\u25B5",
  utrif: "\u25B4",
  uuarr: "\u21C8",
  uuml: "\xFC",
  uwangle: "\u29A7",
  vArr: "\u21D5",
  vBar: "\u2AE8",
  vBarv: "\u2AE9",
  vDash: "\u22A8",
  vangrt: "\u299C",
  varepsilon: "\u03F5",
  varkappa: "\u03F0",
  varnothing: "\u2205",
  varphi: "\u03D5",
  varpi: "\u03D6",
  varpropto: "\u221D",
  varr: "\u2195",
  varrho: "\u03F1",
  varsigma: "\u03C2",
  varsubsetneq: "\u228A\uFE00",
  varsubsetneqq: "\u2ACB\uFE00",
  varsupsetneq: "\u228B\uFE00",
  varsupsetneqq: "\u2ACC\uFE00",
  vartheta: "\u03D1",
  vartriangleleft: "\u22B2",
  vartriangleright: "\u22B3",
  vcy: "\u0432",
  vdash: "\u22A2",
  vee: "\u2228",
  veebar: "\u22BB",
  veeeq: "\u225A",
  vellip: "\u22EE",
  verbar: "|",
  vert: "|",
  vfr: "\u{1D533}",
  vltri: "\u22B2",
  vnsub: "\u2282\u20D2",
  vnsup: "\u2283\u20D2",
  vopf: "\u{1D567}",
  vprop: "\u221D",
  vrtri: "\u22B3",
  vscr: "\u{1D4CB}",
  vsubnE: "\u2ACB\uFE00",
  vsubne: "\u228A\uFE00",
  vsupnE: "\u2ACC\uFE00",
  vsupne: "\u228B\uFE00",
  vzigzag: "\u299A",
  wcirc: "\u0175",
  wedbar: "\u2A5F",
  wedge: "\u2227",
  wedgeq: "\u2259",
  weierp: "\u2118",
  wfr: "\u{1D534}",
  wopf: "\u{1D568}",
  wp: "\u2118",
  wr: "\u2240",
  wreath: "\u2240",
  wscr: "\u{1D4CC}",
  xcap: "\u22C2",
  xcirc: "\u25EF",
  xcup: "\u22C3",
  xdtri: "\u25BD",
  xfr: "\u{1D535}",
  xhArr: "\u27FA",
  xharr: "\u27F7",
  xi: "\u03BE",
  xlArr: "\u27F8",
  xlarr: "\u27F5",
  xmap: "\u27FC",
  xnis: "\u22FB",
  xodot: "\u2A00",
  xopf: "\u{1D569}",
  xoplus: "\u2A01",
  xotime: "\u2A02",
  xrArr: "\u27F9",
  xrarr: "\u27F6",
  xscr: "\u{1D4CD}",
  xsqcup: "\u2A06",
  xuplus: "\u2A04",
  xutri: "\u25B3",
  xvee: "\u22C1",
  xwedge: "\u22C0",
  yacute: "\xFD",
  yacy: "\u044F",
  ycirc: "\u0177",
  ycy: "\u044B",
  yen: "\xA5",
  yfr: "\u{1D536}",
  yicy: "\u0457",
  yopf: "\u{1D56A}",
  yscr: "\u{1D4CE}",
  yucy: "\u044E",
  yuml: "\xFF",
  zacute: "\u017A",
  zcaron: "\u017E",
  zcy: "\u0437",
  zdot: "\u017C",
  zeetrf: "\u2128",
  zeta: "\u03B6",
  zfr: "\u{1D537}",
  zhcy: "\u0436",
  zigrarr: "\u21DD",
  zopf: "\u{1D56B}",
  zscr: "\u{1D4CF}",
  zwj: "\u200D",
  zwnj: "\u200C"
};

// ../../node_modules/decode-named-character-reference/index.js
var own = {}.hasOwnProperty;
function decodeNamedCharacterReference(value) {
  return own.call(characterEntities, value) ? characterEntities[value] : !1;
}

// ../../node_modules/micromark-util-chunked/index.js
function splice(list3, start2, remove, items) {
  let end = list3.length, chunkStart = 0, parameters;
  if (start2 < 0 ? start2 = -start2 > end ? 0 : end + start2 : start2 = start2 > end ? end : start2, remove = remove > 0 ? remove : 0, items.length < 1e4)
    parameters = Array.from(items), parameters.unshift(start2, remove), list3.splice(...parameters);
  else
    for (remove && list3.splice(start2, remove); chunkStart < items.length; )
      parameters = items.slice(chunkStart, chunkStart + 1e4), parameters.unshift(start2, 0), list3.splice(...parameters), chunkStart += 1e4, start2 += 1e4;
}
function push(list3, items) {
  return list3.length > 0 ? (splice(list3, list3.length, 0, items), list3) : items;
}

// ../../node_modules/micromark-util-combine-extensions/index.js
var hasOwnProperty3 = {}.hasOwnProperty;
function combineExtensions(extensions) {
  let all2 = {}, index2 = -1;
  for (; ++index2 < extensions.length; )
    syntaxExtension(all2, extensions[index2]);
  return all2;
}
function syntaxExtension(all2, extension2) {
  let hook;
  for (hook in extension2) {
    let left = (hasOwnProperty3.call(all2, hook) ? all2[hook] : void 0) || (all2[hook] = {}), right = extension2[hook], code;
    if (right)
      for (code in right) {
        hasOwnProperty3.call(left, code) || (left[code] = []);
        let value = right[code];
        constructs(
          // @ts-expect-error Looks like a list.
          left[code],
          Array.isArray(value) ? value : value ? [value] : []
        );
      }
  }
}
function constructs(existing, list3) {
  let index2 = -1, before = [];
  for (; ++index2 < list3.length; )
    (list3[index2].add === "after" ? existing : before).push(list3[index2]);
  splice(existing, 0, 0, before);
}

// ../../node_modules/micromark-util-decode-numeric-character-reference/index.js
function decodeNumericCharacterReference(value, base) {
  let code = Number.parseInt(value, base);
  return (
    // C0 except for HT, LF, FF, CR, space.
    code < 9 || code === 11 || code > 13 && code < 32 || // Control character (DEL) of C0, and C1 controls.
    code > 126 && code < 160 || // Lone high surrogates and low surrogates.
    code > 55295 && code < 57344 || // Noncharacters.
    code > 64975 && code < 65008 || /* eslint-disable no-bitwise */
    (code & 65535) === 65535 || (code & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    code > 1114111 ? "\uFFFD" : String.fromCodePoint(code)
  );
}

// ../../node_modules/micromark-util-normalize-identifier/index.js
function normalizeIdentifier(value) {
  return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}

// ../../node_modules/micromark-util-character/index.js
var unicodePunctuationInternal = regexCheck(new RegExp("\\p{P}", "u")), asciiAlpha = regexCheck(/[A-Za-z]/), asciiAlphanumeric = regexCheck(/[\dA-Za-z]/), asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
function asciiControl(code) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    code !== null && (code < 32 || code === 127)
  );
}
var asciiDigit = regexCheck(/\d/), asciiHexDigit = regexCheck(/[\dA-Fa-f]/), asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
function markdownLineEnding(code) {
  return code !== null && code < -2;
}
function markdownLineEndingOrSpace(code) {
  return code !== null && (code < 0 || code === 32);
}
function markdownSpace(code) {
  return code === -2 || code === -1 || code === 32;
}
function unicodePunctuation(code) {
  return asciiPunctuation(code) || unicodePunctuationInternal(code);
}
var unicodeWhitespace = regexCheck(/\s/);
function regexCheck(regex) {
  return check;
  function check(code) {
    return code !== null && code > -1 && regex.test(String.fromCharCode(code));
  }
}

// ../../node_modules/micromark/lib/compile.js
var hasOwnProperty4 = {}.hasOwnProperty;

// ../../node_modules/micromark-factory-space/index.js
function factorySpace(effects, ok2, type, max) {
  let limit = max ? max - 1 : Number.POSITIVE_INFINITY, size = 0;
  return start2;
  function start2(code) {
    return markdownSpace(code) ? (effects.enter(type), prefix(code)) : ok2(code);
  }
  function prefix(code) {
    return markdownSpace(code) && size++ < limit ? (effects.consume(code), prefix) : (effects.exit(type), ok2(code));
  }
}

// ../../node_modules/micromark/lib/initialize/content.js
var content = {
  tokenize: initializeContent
};
function initializeContent(effects) {
  let contentStart = effects.attempt(
    this.parser.constructs.contentInitial,
    afterContentStartConstruct,
    paragraphInitial
  ), previous2;
  return contentStart;
  function afterContentStartConstruct(code) {
    if (code === null) {
      effects.consume(code);
      return;
    }
    return effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), factorySpace(effects, contentStart, "linePrefix");
  }
  function paragraphInitial(code) {
    return effects.enter("paragraph"), lineStart(code);
  }
  function lineStart(code) {
    let token = effects.enter("chunkText", {
      contentType: "text",
      previous: previous2
    });
    return previous2 && (previous2.next = token), previous2 = token, data2(code);
  }
  function data2(code) {
    if (code === null) {
      effects.exit("chunkText"), effects.exit("paragraph"), effects.consume(code);
      return;
    }
    return markdownLineEnding(code) ? (effects.consume(code), effects.exit("chunkText"), lineStart) : (effects.consume(code), data2);
  }
}

// ../../node_modules/micromark/lib/initialize/document.js
var document3 = {
  tokenize: initializeDocument
}, containerConstruct = {
  tokenize: tokenizeContainer
};
function initializeDocument(effects) {
  let self2 = this, stack = [], continued = 0, childFlow, childToken, lineStartOffset;
  return start2;
  function start2(code) {
    if (continued < stack.length) {
      let item = stack[continued];
      return self2.containerState = item[1], effects.attempt(
        item[0].continuation,
        documentContinue,
        checkNewContainers
      )(code);
    }
    return checkNewContainers(code);
  }
  function documentContinue(code) {
    if (continued++, self2.containerState._closeFlow) {
      self2.containerState._closeFlow = void 0, childFlow && closeFlow();
      let indexBeforeExits = self2.events.length, indexBeforeFlow = indexBeforeExits, point3;
      for (; indexBeforeFlow--; )
        if (self2.events[indexBeforeFlow][0] === "exit" && self2.events[indexBeforeFlow][1].type === "chunkFlow") {
          point3 = self2.events[indexBeforeFlow][1].end;
          break;
        }
      exitContainers(continued);
      let index2 = indexBeforeExits;
      for (; index2 < self2.events.length; )
        self2.events[index2][1].end = Object.assign({}, point3), index2++;
      return splice(
        self2.events,
        indexBeforeFlow + 1,
        0,
        self2.events.slice(indexBeforeExits)
      ), self2.events.length = index2, checkNewContainers(code);
    }
    return start2(code);
  }
  function checkNewContainers(code) {
    if (continued === stack.length) {
      if (!childFlow)
        return documentContinued(code);
      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete)
        return flowStart(code);
      self2.interrupt = !!(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
    }
    return self2.containerState = {}, effects.check(
      containerConstruct,
      thereIsANewContainer,
      thereIsNoNewContainer
    )(code);
  }
  function thereIsANewContainer(code) {
    return childFlow && closeFlow(), exitContainers(continued), documentContinued(code);
  }
  function thereIsNoNewContainer(code) {
    return self2.parser.lazy[self2.now().line] = continued !== stack.length, lineStartOffset = self2.now().offset, flowStart(code);
  }
  function documentContinued(code) {
    return self2.containerState = {}, effects.attempt(
      containerConstruct,
      containerContinue,
      flowStart
    )(code);
  }
  function containerContinue(code) {
    return continued++, stack.push([self2.currentConstruct, self2.containerState]), documentContinued(code);
  }
  function flowStart(code) {
    if (code === null) {
      childFlow && closeFlow(), exitContainers(0), effects.consume(code);
      return;
    }
    return childFlow = childFlow || self2.parser.flow(self2.now()), effects.enter("chunkFlow", {
      contentType: "flow",
      previous: childToken,
      _tokenizer: childFlow
    }), flowContinue(code);
  }
  function flowContinue(code) {
    if (code === null) {
      writeToChild(effects.exit("chunkFlow"), !0), exitContainers(0), effects.consume(code);
      return;
    }
    return markdownLineEnding(code) ? (effects.consume(code), writeToChild(effects.exit("chunkFlow")), continued = 0, self2.interrupt = void 0, start2) : (effects.consume(code), flowContinue);
  }
  function writeToChild(token, eof) {
    let stream = self2.sliceStream(token);
    if (eof && stream.push(null), token.previous = childToken, childToken && (childToken.next = token), childToken = token, childFlow.defineSkip(token.start), childFlow.write(stream), self2.parser.lazy[token.start.line]) {
      let index2 = childFlow.events.length;
      for (; index2--; )
        if (
          // The token starts before the line ending…
          childFlow.events[index2][1].start.offset < lineStartOffset && // …and either is not ended yet…
          (!childFlow.events[index2][1].end || // …or ends after it.
          childFlow.events[index2][1].end.offset > lineStartOffset)
        )
          return;
      let indexBeforeExits = self2.events.length, indexBeforeFlow = indexBeforeExits, seen, point3;
      for (; indexBeforeFlow--; )
        if (self2.events[indexBeforeFlow][0] === "exit" && self2.events[indexBeforeFlow][1].type === "chunkFlow") {
          if (seen) {
            point3 = self2.events[indexBeforeFlow][1].end;
            break;
          }
          seen = !0;
        }
      for (exitContainers(continued), index2 = indexBeforeExits; index2 < self2.events.length; )
        self2.events[index2][1].end = Object.assign({}, point3), index2++;
      splice(
        self2.events,
        indexBeforeFlow + 1,
        0,
        self2.events.slice(indexBeforeExits)
      ), self2.events.length = index2;
    }
  }
  function exitContainers(size) {
    let index2 = stack.length;
    for (; index2-- > size; ) {
      let entry = stack[index2];
      self2.containerState = entry[1], entry[0].exit.call(self2, effects);
    }
    stack.length = size;
  }
  function closeFlow() {
    childFlow.write([null]), childToken = void 0, childFlow = void 0, self2.containerState._closeFlow = void 0;
  }
}
function tokenizeContainer(effects, ok2, nok) {
  return factorySpace(
    effects,
    effects.attempt(this.parser.constructs.document, ok2, nok),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}

// ../../node_modules/micromark-util-classify-character/index.js
function classifyCharacter(code) {
  if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code))
    return 1;
  if (unicodePunctuation(code))
    return 2;
}

// ../../node_modules/micromark-util-resolve-all/index.js
function resolveAll(constructs2, events, context) {
  let called = [], index2 = -1;
  for (; ++index2 < constructs2.length; ) {
    let resolve4 = constructs2[index2].resolveAll;
    resolve4 && !called.includes(resolve4) && (events = resolve4(events, context), called.push(resolve4));
  }
  return events;
}

// ../../node_modules/micromark-core-commonmark/lib/attention.js
var attention = {
  name: "attention",
  tokenize: tokenizeAttention,
  resolveAll: resolveAllAttention
};
function resolveAllAttention(events, context) {
  let index2 = -1, open3, group, text3, openingSequence, closingSequence, use, nextEvents, offset2;
  for (; ++index2 < events.length; )
    if (events[index2][0] === "enter" && events[index2][1].type === "attentionSequence" && events[index2][1]._close) {
      for (open3 = index2; open3--; )
        if (events[open3][0] === "exit" && events[open3][1].type === "attentionSequence" && events[open3][1]._open && // If the markers are the same:
        context.sliceSerialize(events[open3][1]).charCodeAt(0) === context.sliceSerialize(events[index2][1]).charCodeAt(0)) {
          if ((events[open3][1]._close || events[index2][1]._open) && (events[index2][1].end.offset - events[index2][1].start.offset) % 3 && !((events[open3][1].end.offset - events[open3][1].start.offset + events[index2][1].end.offset - events[index2][1].start.offset) % 3))
            continue;
          use = events[open3][1].end.offset - events[open3][1].start.offset > 1 && events[index2][1].end.offset - events[index2][1].start.offset > 1 ? 2 : 1;
          let start2 = Object.assign({}, events[open3][1].end), end = Object.assign({}, events[index2][1].start);
          movePoint(start2, -use), movePoint(end, use), openingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start: start2,
            end: Object.assign({}, events[open3][1].end)
          }, closingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start: Object.assign({}, events[index2][1].start),
            end
          }, text3 = {
            type: use > 1 ? "strongText" : "emphasisText",
            start: Object.assign({}, events[open3][1].end),
            end: Object.assign({}, events[index2][1].start)
          }, group = {
            type: use > 1 ? "strong" : "emphasis",
            start: Object.assign({}, openingSequence.start),
            end: Object.assign({}, closingSequence.end)
          }, events[open3][1].end = Object.assign({}, openingSequence.start), events[index2][1].start = Object.assign({}, closingSequence.end), nextEvents = [], events[open3][1].end.offset - events[open3][1].start.offset && (nextEvents = push(nextEvents, [
            ["enter", events[open3][1], context],
            ["exit", events[open3][1], context]
          ])), nextEvents = push(nextEvents, [
            ["enter", group, context],
            ["enter", openingSequence, context],
            ["exit", openingSequence, context],
            ["enter", text3, context]
          ]), nextEvents = push(
            nextEvents,
            resolveAll(
              context.parser.constructs.insideSpan.null,
              events.slice(open3 + 1, index2),
              context
            )
          ), nextEvents = push(nextEvents, [
            ["exit", text3, context],
            ["enter", closingSequence, context],
            ["exit", closingSequence, context],
            ["exit", group, context]
          ]), events[index2][1].end.offset - events[index2][1].start.offset ? (offset2 = 2, nextEvents = push(nextEvents, [
            ["enter", events[index2][1], context],
            ["exit", events[index2][1], context]
          ])) : offset2 = 0, splice(events, open3 - 1, index2 - open3 + 3, nextEvents), index2 = open3 + nextEvents.length - offset2 - 2;
          break;
        }
    }
  for (index2 = -1; ++index2 < events.length; )
    events[index2][1].type === "attentionSequence" && (events[index2][1].type = "data");
  return events;
}
function tokenizeAttention(effects, ok2) {
  let attentionMarkers2 = this.parser.constructs.attentionMarkers.null, previous2 = this.previous, before = classifyCharacter(previous2), marker;
  return start2;
  function start2(code) {
    return marker = code, effects.enter("attentionSequence"), inside(code);
  }
  function inside(code) {
    if (code === marker)
      return effects.consume(code), inside;
    let token = effects.exit("attentionSequence"), after = classifyCharacter(code), open3 = !after || after === 2 && before || attentionMarkers2.includes(code), close = !before || before === 2 && after || attentionMarkers2.includes(previous2);
    return token._open = !!(marker === 42 ? open3 : open3 && (before || !close)), token._close = !!(marker === 42 ? close : close && (after || !open3)), ok2(code);
  }
}
function movePoint(point3, offset2) {
  point3.column += offset2, point3.offset += offset2, point3._bufferIndex += offset2;
}

// ../../node_modules/micromark-core-commonmark/lib/autolink.js
var autolink = {
  name: "autolink",
  tokenize: tokenizeAutolink
};
function tokenizeAutolink(effects, ok2, nok) {
  let size = 0;
  return start2;
  function start2(code) {
    return effects.enter("autolink"), effects.enter("autolinkMarker"), effects.consume(code), effects.exit("autolinkMarker"), effects.enter("autolinkProtocol"), open3;
  }
  function open3(code) {
    return asciiAlpha(code) ? (effects.consume(code), schemeOrEmailAtext) : emailAtext(code);
  }
  function schemeOrEmailAtext(code) {
    return code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code) ? (size = 1, schemeInsideOrEmailAtext(code)) : emailAtext(code);
  }
  function schemeInsideOrEmailAtext(code) {
    return code === 58 ? (effects.consume(code), size = 0, urlInside) : (code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) && size++ < 32 ? (effects.consume(code), schemeInsideOrEmailAtext) : (size = 0, emailAtext(code));
  }
  function urlInside(code) {
    return code === 62 ? (effects.exit("autolinkProtocol"), effects.enter("autolinkMarker"), effects.consume(code), effects.exit("autolinkMarker"), effects.exit("autolink"), ok2) : code === null || code === 32 || code === 60 || asciiControl(code) ? nok(code) : (effects.consume(code), urlInside);
  }
  function emailAtext(code) {
    return code === 64 ? (effects.consume(code), emailAtSignOrDot) : asciiAtext(code) ? (effects.consume(code), emailAtext) : nok(code);
  }
  function emailAtSignOrDot(code) {
    return asciiAlphanumeric(code) ? emailLabel(code) : nok(code);
  }
  function emailLabel(code) {
    return code === 46 ? (effects.consume(code), size = 0, emailAtSignOrDot) : code === 62 ? (effects.exit("autolinkProtocol").type = "autolinkEmail", effects.enter("autolinkMarker"), effects.consume(code), effects.exit("autolinkMarker"), effects.exit("autolink"), ok2) : emailValue(code);
  }
  function emailValue(code) {
    if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
      let next = code === 45 ? emailValue : emailLabel;
      return effects.consume(code), next;
    }
    return nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/blank-line.js
var blankLine = {
  tokenize: tokenizeBlankLine,
  partial: !0
};
function tokenizeBlankLine(effects, ok2, nok) {
  return start2;
  function start2(code) {
    return markdownSpace(code) ? factorySpace(effects, after, "linePrefix")(code) : after(code);
  }
  function after(code) {
    return code === null || markdownLineEnding(code) ? ok2(code) : nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/block-quote.js
var blockQuote = {
  name: "blockQuote",
  tokenize: tokenizeBlockQuoteStart,
  continuation: {
    tokenize: tokenizeBlockQuoteContinuation
  },
  exit
};
function tokenizeBlockQuoteStart(effects, ok2, nok) {
  let self2 = this;
  return start2;
  function start2(code) {
    if (code === 62) {
      let state = self2.containerState;
      return state.open || (effects.enter("blockQuote", {
        _container: !0
      }), state.open = !0), effects.enter("blockQuotePrefix"), effects.enter("blockQuoteMarker"), effects.consume(code), effects.exit("blockQuoteMarker"), after;
    }
    return nok(code);
  }
  function after(code) {
    return markdownSpace(code) ? (effects.enter("blockQuotePrefixWhitespace"), effects.consume(code), effects.exit("blockQuotePrefixWhitespace"), effects.exit("blockQuotePrefix"), ok2) : (effects.exit("blockQuotePrefix"), ok2(code));
  }
}
function tokenizeBlockQuoteContinuation(effects, ok2, nok) {
  let self2 = this;
  return contStart;
  function contStart(code) {
    return markdownSpace(code) ? factorySpace(
      effects,
      contBefore,
      "linePrefix",
      self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    )(code) : contBefore(code);
  }
  function contBefore(code) {
    return effects.attempt(blockQuote, ok2, nok)(code);
  }
}
function exit(effects) {
  effects.exit("blockQuote");
}

// ../../node_modules/micromark-core-commonmark/lib/character-escape.js
var characterEscape = {
  name: "characterEscape",
  tokenize: tokenizeCharacterEscape
};
function tokenizeCharacterEscape(effects, ok2, nok) {
  return start2;
  function start2(code) {
    return effects.enter("characterEscape"), effects.enter("escapeMarker"), effects.consume(code), effects.exit("escapeMarker"), inside;
  }
  function inside(code) {
    return asciiPunctuation(code) ? (effects.enter("characterEscapeValue"), effects.consume(code), effects.exit("characterEscapeValue"), effects.exit("characterEscape"), ok2) : nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/character-reference.js
var characterReference = {
  name: "characterReference",
  tokenize: tokenizeCharacterReference
};
function tokenizeCharacterReference(effects, ok2, nok) {
  let self2 = this, size = 0, max, test;
  return start2;
  function start2(code) {
    return effects.enter("characterReference"), effects.enter("characterReferenceMarker"), effects.consume(code), effects.exit("characterReferenceMarker"), open3;
  }
  function open3(code) {
    return code === 35 ? (effects.enter("characterReferenceMarkerNumeric"), effects.consume(code), effects.exit("characterReferenceMarkerNumeric"), numeric) : (effects.enter("characterReferenceValue"), max = 31, test = asciiAlphanumeric, value(code));
  }
  function numeric(code) {
    return code === 88 || code === 120 ? (effects.enter("characterReferenceMarkerHexadecimal"), effects.consume(code), effects.exit("characterReferenceMarkerHexadecimal"), effects.enter("characterReferenceValue"), max = 6, test = asciiHexDigit, value) : (effects.enter("characterReferenceValue"), max = 7, test = asciiDigit, value(code));
  }
  function value(code) {
    if (code === 59 && size) {
      let token = effects.exit("characterReferenceValue");
      return test === asciiAlphanumeric && !decodeNamedCharacterReference(self2.sliceSerialize(token)) ? nok(code) : (effects.enter("characterReferenceMarker"), effects.consume(code), effects.exit("characterReferenceMarker"), effects.exit("characterReference"), ok2);
    }
    return test(code) && size++ < max ? (effects.consume(code), value) : nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/code-fenced.js
var nonLazyContinuation = {
  tokenize: tokenizeNonLazyContinuation,
  partial: !0
}, codeFenced = {
  name: "codeFenced",
  tokenize: tokenizeCodeFenced,
  concrete: !0
};
function tokenizeCodeFenced(effects, ok2, nok) {
  let self2 = this, closeStart = {
    tokenize: tokenizeCloseStart,
    partial: !0
  }, initialPrefix = 0, sizeOpen = 0, marker;
  return start2;
  function start2(code) {
    return beforeSequenceOpen(code);
  }
  function beforeSequenceOpen(code) {
    let tail = self2.events[self2.events.length - 1];
    return initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], !0).length : 0, marker = code, effects.enter("codeFenced"), effects.enter("codeFencedFence"), effects.enter("codeFencedFenceSequence"), sequenceOpen(code);
  }
  function sequenceOpen(code) {
    return code === marker ? (sizeOpen++, effects.consume(code), sequenceOpen) : sizeOpen < 3 ? nok(code) : (effects.exit("codeFencedFenceSequence"), markdownSpace(code) ? factorySpace(effects, infoBefore, "whitespace")(code) : infoBefore(code));
  }
  function infoBefore(code) {
    return code === null || markdownLineEnding(code) ? (effects.exit("codeFencedFence"), self2.interrupt ? ok2(code) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code)) : (effects.enter("codeFencedFenceInfo"), effects.enter("chunkString", {
      contentType: "string"
    }), info(code));
  }
  function info(code) {
    return code === null || markdownLineEnding(code) ? (effects.exit("chunkString"), effects.exit("codeFencedFenceInfo"), infoBefore(code)) : markdownSpace(code) ? (effects.exit("chunkString"), effects.exit("codeFencedFenceInfo"), factorySpace(effects, metaBefore, "whitespace")(code)) : code === 96 && code === marker ? nok(code) : (effects.consume(code), info);
  }
  function metaBefore(code) {
    return code === null || markdownLineEnding(code) ? infoBefore(code) : (effects.enter("codeFencedFenceMeta"), effects.enter("chunkString", {
      contentType: "string"
    }), meta(code));
  }
  function meta(code) {
    return code === null || markdownLineEnding(code) ? (effects.exit("chunkString"), effects.exit("codeFencedFenceMeta"), infoBefore(code)) : code === 96 && code === marker ? nok(code) : (effects.consume(code), meta);
  }
  function atNonLazyBreak(code) {
    return effects.attempt(closeStart, after, contentBefore)(code);
  }
  function contentBefore(code) {
    return effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), contentStart;
  }
  function contentStart(code) {
    return initialPrefix > 0 && markdownSpace(code) ? factorySpace(
      effects,
      beforeContentChunk,
      "linePrefix",
      initialPrefix + 1
    )(code) : beforeContentChunk(code);
  }
  function beforeContentChunk(code) {
    return code === null || markdownLineEnding(code) ? effects.check(nonLazyContinuation, atNonLazyBreak, after)(code) : (effects.enter("codeFlowValue"), contentChunk(code));
  }
  function contentChunk(code) {
    return code === null || markdownLineEnding(code) ? (effects.exit("codeFlowValue"), beforeContentChunk(code)) : (effects.consume(code), contentChunk);
  }
  function after(code) {
    return effects.exit("codeFenced"), ok2(code);
  }
  function tokenizeCloseStart(effects2, ok3, nok2) {
    let size = 0;
    return startBefore;
    function startBefore(code) {
      return effects2.enter("lineEnding"), effects2.consume(code), effects2.exit("lineEnding"), start3;
    }
    function start3(code) {
      return effects2.enter("codeFencedFence"), markdownSpace(code) ? factorySpace(
        effects2,
        beforeSequenceClose,
        "linePrefix",
        self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
      )(code) : beforeSequenceClose(code);
    }
    function beforeSequenceClose(code) {
      return code === marker ? (effects2.enter("codeFencedFenceSequence"), sequenceClose(code)) : nok2(code);
    }
    function sequenceClose(code) {
      return code === marker ? (size++, effects2.consume(code), sequenceClose) : size >= sizeOpen ? (effects2.exit("codeFencedFenceSequence"), markdownSpace(code) ? factorySpace(effects2, sequenceCloseAfter, "whitespace")(code) : sequenceCloseAfter(code)) : nok2(code);
    }
    function sequenceCloseAfter(code) {
      return code === null || markdownLineEnding(code) ? (effects2.exit("codeFencedFence"), ok3(code)) : nok2(code);
    }
  }
}
function tokenizeNonLazyContinuation(effects, ok2, nok) {
  let self2 = this;
  return start2;
  function start2(code) {
    return code === null ? nok(code) : (effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), lineStart);
  }
  function lineStart(code) {
    return self2.parser.lazy[self2.now().line] ? nok(code) : ok2(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/code-indented.js
var codeIndented = {
  name: "codeIndented",
  tokenize: tokenizeCodeIndented
}, furtherStart = {
  tokenize: tokenizeFurtherStart,
  partial: !0
};
function tokenizeCodeIndented(effects, ok2, nok) {
  let self2 = this;
  return start2;
  function start2(code) {
    return effects.enter("codeIndented"), factorySpace(effects, afterPrefix, "linePrefix", 5)(code);
  }
  function afterPrefix(code) {
    let tail = self2.events[self2.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], !0).length >= 4 ? atBreak(code) : nok(code);
  }
  function atBreak(code) {
    return code === null ? after(code) : markdownLineEnding(code) ? effects.attempt(furtherStart, atBreak, after)(code) : (effects.enter("codeFlowValue"), inside(code));
  }
  function inside(code) {
    return code === null || markdownLineEnding(code) ? (effects.exit("codeFlowValue"), atBreak(code)) : (effects.consume(code), inside);
  }
  function after(code) {
    return effects.exit("codeIndented"), ok2(code);
  }
}
function tokenizeFurtherStart(effects, ok2, nok) {
  let self2 = this;
  return furtherStart2;
  function furtherStart2(code) {
    return self2.parser.lazy[self2.now().line] ? nok(code) : markdownLineEnding(code) ? (effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), furtherStart2) : factorySpace(effects, afterPrefix, "linePrefix", 5)(code);
  }
  function afterPrefix(code) {
    let tail = self2.events[self2.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], !0).length >= 4 ? ok2(code) : markdownLineEnding(code) ? furtherStart2(code) : nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/code-text.js
var codeText = {
  name: "codeText",
  tokenize: tokenizeCodeText,
  resolve: resolveCodeText,
  previous
};
function resolveCodeText(events) {
  let tailExitIndex = events.length - 4, headEnterIndex = 3, index2, enter;
  if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
    for (index2 = headEnterIndex; ++index2 < tailExitIndex; )
      if (events[index2][1].type === "codeTextData") {
        events[headEnterIndex][1].type = "codeTextPadding", events[tailExitIndex][1].type = "codeTextPadding", headEnterIndex += 2, tailExitIndex -= 2;
        break;
      }
  }
  for (index2 = headEnterIndex - 1, tailExitIndex++; ++index2 <= tailExitIndex; )
    enter === void 0 ? index2 !== tailExitIndex && events[index2][1].type !== "lineEnding" && (enter = index2) : (index2 === tailExitIndex || events[index2][1].type === "lineEnding") && (events[enter][1].type = "codeTextData", index2 !== enter + 2 && (events[enter][1].end = events[index2 - 1][1].end, events.splice(enter + 2, index2 - enter - 2), tailExitIndex -= index2 - enter - 2, index2 = enter + 2), enter = void 0);
  return events;
}
function previous(code) {
  return code !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function tokenizeCodeText(effects, ok2, nok) {
  let self2 = this, sizeOpen = 0, size, token;
  return start2;
  function start2(code) {
    return effects.enter("codeText"), effects.enter("codeTextSequence"), sequenceOpen(code);
  }
  function sequenceOpen(code) {
    return code === 96 ? (effects.consume(code), sizeOpen++, sequenceOpen) : (effects.exit("codeTextSequence"), between(code));
  }
  function between(code) {
    return code === null ? nok(code) : code === 32 ? (effects.enter("space"), effects.consume(code), effects.exit("space"), between) : code === 96 ? (token = effects.enter("codeTextSequence"), size = 0, sequenceClose(code)) : markdownLineEnding(code) ? (effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), between) : (effects.enter("codeTextData"), data2(code));
  }
  function data2(code) {
    return code === null || code === 32 || code === 96 || markdownLineEnding(code) ? (effects.exit("codeTextData"), between(code)) : (effects.consume(code), data2);
  }
  function sequenceClose(code) {
    return code === 96 ? (effects.consume(code), size++, sequenceClose) : size === sizeOpen ? (effects.exit("codeTextSequence"), effects.exit("codeText"), ok2(code)) : (token.type = "codeTextData", data2(code));
  }
}

// ../../node_modules/micromark-util-subtokenize/index.js
function subtokenize(events) {
  let jumps = {}, index2 = -1, event, lineIndex, otherIndex, otherEvent, parameters, subevents, more;
  for (; ++index2 < events.length; ) {
    for (; index2 in jumps; )
      index2 = jumps[index2];
    if (event = events[index2], index2 && event[1].type === "chunkFlow" && events[index2 - 1][1].type === "listItemPrefix" && (subevents = event[1]._tokenizer.events, otherIndex = 0, otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank" && (otherIndex += 2), otherIndex < subevents.length && subevents[otherIndex][1].type === "content"))
      for (; ++otherIndex < subevents.length && subevents[otherIndex][1].type !== "content"; )
        subevents[otherIndex][1].type === "chunkText" && (subevents[otherIndex][1]._isInFirstContentOfListItem = !0, otherIndex++);
    if (event[0] === "enter")
      event[1].contentType && (Object.assign(jumps, subcontent(events, index2)), index2 = jumps[index2], more = !0);
    else if (event[1]._container) {
      for (otherIndex = index2, lineIndex = void 0; otherIndex-- && (otherEvent = events[otherIndex], otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank"); )
        otherEvent[0] === "enter" && (lineIndex && (events[lineIndex][1].type = "lineEndingBlank"), otherEvent[1].type = "lineEnding", lineIndex = otherIndex);
      lineIndex && (event[1].end = Object.assign({}, events[lineIndex][1].start), parameters = events.slice(lineIndex, index2), parameters.unshift(event), splice(events, lineIndex, index2 - lineIndex + 1, parameters));
    }
  }
  return !more;
}
function subcontent(events, eventIndex) {
  let token = events[eventIndex][1], context = events[eventIndex][2], startPosition = eventIndex - 1, startPositions = [], tokenizer3 = token._tokenizer || context.parser[token.contentType](token.start), childEvents = tokenizer3.events, jumps = [], gaps = {}, stream, previous2, index2 = -1, current2 = token, adjust = 0, start2 = 0, breaks = [start2];
  for (; current2; ) {
    for (; events[++startPosition][1] !== current2; )
      ;
    startPositions.push(startPosition), current2._tokenizer || (stream = context.sliceStream(current2), current2.next || stream.push(null), previous2 && tokenizer3.defineSkip(current2.start), current2._isInFirstContentOfListItem && (tokenizer3._gfmTasklistFirstContentOfListItem = !0), tokenizer3.write(stream), current2._isInFirstContentOfListItem && (tokenizer3._gfmTasklistFirstContentOfListItem = void 0)), previous2 = current2, current2 = current2.next;
  }
  for (current2 = token; ++index2 < childEvents.length; )
    // Find a void token that includes a break.
    childEvents[index2][0] === "exit" && childEvents[index2 - 1][0] === "enter" && childEvents[index2][1].type === childEvents[index2 - 1][1].type && childEvents[index2][1].start.line !== childEvents[index2][1].end.line && (start2 = index2 + 1, breaks.push(start2), current2._tokenizer = void 0, current2.previous = void 0, current2 = current2.next);
  for (tokenizer3.events = [], current2 ? (current2._tokenizer = void 0, current2.previous = void 0) : breaks.pop(), index2 = breaks.length; index2--; ) {
    let slice = childEvents.slice(breaks[index2], breaks[index2 + 1]), start3 = startPositions.pop();
    jumps.unshift([start3, start3 + slice.length - 1]), splice(events, start3, 2, slice);
  }
  for (index2 = -1; ++index2 < jumps.length; )
    gaps[adjust + jumps[index2][0]] = adjust + jumps[index2][1], adjust += jumps[index2][1] - jumps[index2][0] - 1;
  return gaps;
}

// ../../node_modules/micromark-core-commonmark/lib/content.js
var content2 = {
  tokenize: tokenizeContent,
  resolve: resolveContent
}, continuationConstruct = {
  tokenize: tokenizeContinuation,
  partial: !0
};
function resolveContent(events) {
  return subtokenize(events), events;
}
function tokenizeContent(effects, ok2) {
  let previous2;
  return chunkStart;
  function chunkStart(code) {
    return effects.enter("content"), previous2 = effects.enter("chunkContent", {
      contentType: "content"
    }), chunkInside(code);
  }
  function chunkInside(code) {
    return code === null ? contentEnd(code) : markdownLineEnding(code) ? effects.check(
      continuationConstruct,
      contentContinue,
      contentEnd
    )(code) : (effects.consume(code), chunkInside);
  }
  function contentEnd(code) {
    return effects.exit("chunkContent"), effects.exit("content"), ok2(code);
  }
  function contentContinue(code) {
    return effects.consume(code), effects.exit("chunkContent"), previous2.next = effects.enter("chunkContent", {
      contentType: "content",
      previous: previous2
    }), previous2 = previous2.next, chunkInside;
  }
}
function tokenizeContinuation(effects, ok2, nok) {
  let self2 = this;
  return startLookahead;
  function startLookahead(code) {
    return effects.exit("chunkContent"), effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), factorySpace(effects, prefixed, "linePrefix");
  }
  function prefixed(code) {
    if (code === null || markdownLineEnding(code))
      return nok(code);
    let tail = self2.events[self2.events.length - 1];
    return !self2.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], !0).length >= 4 ? ok2(code) : effects.interrupt(self2.parser.constructs.flow, nok, ok2)(code);
  }
}

// ../../node_modules/micromark-factory-destination/index.js
function factoryDestination(effects, ok2, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
  let limit = max || Number.POSITIVE_INFINITY, balance = 0;
  return start2;
  function start2(code) {
    return code === 60 ? (effects.enter(type), effects.enter(literalType), effects.enter(literalMarkerType), effects.consume(code), effects.exit(literalMarkerType), enclosedBefore) : code === null || code === 32 || code === 41 || asciiControl(code) ? nok(code) : (effects.enter(type), effects.enter(rawType), effects.enter(stringType), effects.enter("chunkString", {
      contentType: "string"
    }), raw(code));
  }
  function enclosedBefore(code) {
    return code === 62 ? (effects.enter(literalMarkerType), effects.consume(code), effects.exit(literalMarkerType), effects.exit(literalType), effects.exit(type), ok2) : (effects.enter(stringType), effects.enter("chunkString", {
      contentType: "string"
    }), enclosed(code));
  }
  function enclosed(code) {
    return code === 62 ? (effects.exit("chunkString"), effects.exit(stringType), enclosedBefore(code)) : code === null || code === 60 || markdownLineEnding(code) ? nok(code) : (effects.consume(code), code === 92 ? enclosedEscape : enclosed);
  }
  function enclosedEscape(code) {
    return code === 60 || code === 62 || code === 92 ? (effects.consume(code), enclosed) : enclosed(code);
  }
  function raw(code) {
    return !balance && (code === null || code === 41 || markdownLineEndingOrSpace(code)) ? (effects.exit("chunkString"), effects.exit(stringType), effects.exit(rawType), effects.exit(type), ok2(code)) : balance < limit && code === 40 ? (effects.consume(code), balance++, raw) : code === 41 ? (effects.consume(code), balance--, raw) : code === null || code === 32 || code === 40 || asciiControl(code) ? nok(code) : (effects.consume(code), code === 92 ? rawEscape : raw);
  }
  function rawEscape(code) {
    return code === 40 || code === 41 || code === 92 ? (effects.consume(code), raw) : raw(code);
  }
}

// ../../node_modules/micromark-factory-label/index.js
function factoryLabel(effects, ok2, nok, type, markerType, stringType) {
  let self2 = this, size = 0, seen;
  return start2;
  function start2(code) {
    return effects.enter(type), effects.enter(markerType), effects.consume(code), effects.exit(markerType), effects.enter(stringType), atBreak;
  }
  function atBreak(code) {
    return size > 999 || code === null || code === 91 || code === 93 && !seen || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    code === 94 && !size && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code) : code === 93 ? (effects.exit(stringType), effects.enter(markerType), effects.consume(code), effects.exit(markerType), effects.exit(type), ok2) : markdownLineEnding(code) ? (effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), atBreak) : (effects.enter("chunkString", {
      contentType: "string"
    }), labelInside(code));
  }
  function labelInside(code) {
    return code === null || code === 91 || code === 93 || markdownLineEnding(code) || size++ > 999 ? (effects.exit("chunkString"), atBreak(code)) : (effects.consume(code), seen || (seen = !markdownSpace(code)), code === 92 ? labelEscape : labelInside);
  }
  function labelEscape(code) {
    return code === 91 || code === 92 || code === 93 ? (effects.consume(code), size++, labelInside) : labelInside(code);
  }
}

// ../../node_modules/micromark-factory-title/index.js
function factoryTitle(effects, ok2, nok, type, markerType, stringType) {
  let marker;
  return start2;
  function start2(code) {
    return code === 34 || code === 39 || code === 40 ? (effects.enter(type), effects.enter(markerType), effects.consume(code), effects.exit(markerType), marker = code === 40 ? 41 : code, begin) : nok(code);
  }
  function begin(code) {
    return code === marker ? (effects.enter(markerType), effects.consume(code), effects.exit(markerType), effects.exit(type), ok2) : (effects.enter(stringType), atBreak(code));
  }
  function atBreak(code) {
    return code === marker ? (effects.exit(stringType), begin(marker)) : code === null ? nok(code) : markdownLineEnding(code) ? (effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), factorySpace(effects, atBreak, "linePrefix")) : (effects.enter("chunkString", {
      contentType: "string"
    }), inside(code));
  }
  function inside(code) {
    return code === marker || code === null || markdownLineEnding(code) ? (effects.exit("chunkString"), atBreak(code)) : (effects.consume(code), code === 92 ? escape : inside);
  }
  function escape(code) {
    return code === marker || code === 92 ? (effects.consume(code), inside) : inside(code);
  }
}

// ../../node_modules/micromark-factory-whitespace/index.js
function factoryWhitespace(effects, ok2) {
  let seen;
  return start2;
  function start2(code) {
    return markdownLineEnding(code) ? (effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), seen = !0, start2) : markdownSpace(code) ? factorySpace(
      effects,
      start2,
      seen ? "linePrefix" : "lineSuffix"
    )(code) : ok2(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/definition.js
var definition = {
  name: "definition",
  tokenize: tokenizeDefinition
}, titleBefore = {
  tokenize: tokenizeTitleBefore,
  partial: !0
};
function tokenizeDefinition(effects, ok2, nok) {
  let self2 = this, identifier;
  return start2;
  function start2(code) {
    return effects.enter("definition"), before(code);
  }
  function before(code) {
    return factoryLabel.call(
      self2,
      effects,
      labelAfter,
      // Note: we don’t need to reset the way `markdown-rs` does.
      nok,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(code);
  }
  function labelAfter(code) {
    return identifier = normalizeIdentifier(
      self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1)
    ), code === 58 ? (effects.enter("definitionMarker"), effects.consume(code), effects.exit("definitionMarker"), markerAfter) : nok(code);
  }
  function markerAfter(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, destinationBefore)(code) : destinationBefore(code);
  }
  function destinationBefore(code) {
    return factoryDestination(
      effects,
      destinationAfter,
      // Note: we don’t need to reset the way `markdown-rs` does.
      nok,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(code);
  }
  function destinationAfter(code) {
    return effects.attempt(titleBefore, after, after)(code);
  }
  function after(code) {
    return markdownSpace(code) ? factorySpace(effects, afterWhitespace, "whitespace")(code) : afterWhitespace(code);
  }
  function afterWhitespace(code) {
    return code === null || markdownLineEnding(code) ? (effects.exit("definition"), self2.parser.defined.push(identifier), ok2(code)) : nok(code);
  }
}
function tokenizeTitleBefore(effects, ok2, nok) {
  return titleBefore2;
  function titleBefore2(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, beforeMarker)(code) : nok(code);
  }
  function beforeMarker(code) {
    return factoryTitle(
      effects,
      titleAfter,
      nok,
      "definitionTitle",
      "definitionTitleMarker",
      "definitionTitleString"
    )(code);
  }
  function titleAfter(code) {
    return markdownSpace(code) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code) : titleAfterOptionalWhitespace(code);
  }
  function titleAfterOptionalWhitespace(code) {
    return code === null || markdownLineEnding(code) ? ok2(code) : nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/hard-break-escape.js
var hardBreakEscape = {
  name: "hardBreakEscape",
  tokenize: tokenizeHardBreakEscape
};
function tokenizeHardBreakEscape(effects, ok2, nok) {
  return start2;
  function start2(code) {
    return effects.enter("hardBreakEscape"), effects.consume(code), after;
  }
  function after(code) {
    return markdownLineEnding(code) ? (effects.exit("hardBreakEscape"), ok2(code)) : nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/heading-atx.js
var headingAtx = {
  name: "headingAtx",
  tokenize: tokenizeHeadingAtx,
  resolve: resolveHeadingAtx
};
function resolveHeadingAtx(events, context) {
  let contentEnd = events.length - 2, contentStart = 3, content3, text3;
  return events[contentStart][1].type === "whitespace" && (contentStart += 2), contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace" && (contentEnd -= 2), events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace") && (contentEnd -= contentStart + 1 === contentEnd ? 2 : 4), contentEnd > contentStart && (content3 = {
    type: "atxHeadingText",
    start: events[contentStart][1].start,
    end: events[contentEnd][1].end
  }, text3 = {
    type: "chunkText",
    start: events[contentStart][1].start,
    end: events[contentEnd][1].end,
    contentType: "text"
  }, splice(events, contentStart, contentEnd - contentStart + 1, [
    ["enter", content3, context],
    ["enter", text3, context],
    ["exit", text3, context],
    ["exit", content3, context]
  ])), events;
}
function tokenizeHeadingAtx(effects, ok2, nok) {
  let size = 0;
  return start2;
  function start2(code) {
    return effects.enter("atxHeading"), before(code);
  }
  function before(code) {
    return effects.enter("atxHeadingSequence"), sequenceOpen(code);
  }
  function sequenceOpen(code) {
    return code === 35 && size++ < 6 ? (effects.consume(code), sequenceOpen) : code === null || markdownLineEndingOrSpace(code) ? (effects.exit("atxHeadingSequence"), atBreak(code)) : nok(code);
  }
  function atBreak(code) {
    return code === 35 ? (effects.enter("atxHeadingSequence"), sequenceFurther(code)) : code === null || markdownLineEnding(code) ? (effects.exit("atxHeading"), ok2(code)) : markdownSpace(code) ? factorySpace(effects, atBreak, "whitespace")(code) : (effects.enter("atxHeadingText"), data2(code));
  }
  function sequenceFurther(code) {
    return code === 35 ? (effects.consume(code), sequenceFurther) : (effects.exit("atxHeadingSequence"), atBreak(code));
  }
  function data2(code) {
    return code === null || code === 35 || markdownLineEndingOrSpace(code) ? (effects.exit("atxHeadingText"), atBreak(code)) : (effects.consume(code), data2);
  }
}

// ../../node_modules/micromark-util-html-tag-name/index.js
var htmlBlockNames = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], htmlRawNames = ["pre", "script", "style", "textarea"];

// ../../node_modules/micromark-core-commonmark/lib/html-flow.js
var htmlFlow = {
  name: "htmlFlow",
  tokenize: tokenizeHtmlFlow,
  resolveTo: resolveToHtmlFlow,
  concrete: !0
}, blankLineBefore = {
  tokenize: tokenizeBlankLineBefore,
  partial: !0
}, nonLazyContinuationStart = {
  tokenize: tokenizeNonLazyContinuationStart,
  partial: !0
};
function resolveToHtmlFlow(events) {
  let index2 = events.length;
  for (; index2-- && !(events[index2][0] === "enter" && events[index2][1].type === "htmlFlow"); )
    ;
  return index2 > 1 && events[index2 - 2][1].type === "linePrefix" && (events[index2][1].start = events[index2 - 2][1].start, events[index2 + 1][1].start = events[index2 - 2][1].start, events.splice(index2 - 2, 2)), events;
}
function tokenizeHtmlFlow(effects, ok2, nok) {
  let self2 = this, marker, closingTag, buffer, index2, markerB;
  return start2;
  function start2(code) {
    return before(code);
  }
  function before(code) {
    return effects.enter("htmlFlow"), effects.enter("htmlFlowData"), effects.consume(code), open3;
  }
  function open3(code) {
    return code === 33 ? (effects.consume(code), declarationOpen) : code === 47 ? (effects.consume(code), closingTag = !0, tagCloseStart) : code === 63 ? (effects.consume(code), marker = 3, self2.interrupt ? ok2 : continuationDeclarationInside) : asciiAlpha(code) ? (effects.consume(code), buffer = String.fromCharCode(code), tagName) : nok(code);
  }
  function declarationOpen(code) {
    return code === 45 ? (effects.consume(code), marker = 2, commentOpenInside) : code === 91 ? (effects.consume(code), marker = 5, index2 = 0, cdataOpenInside) : asciiAlpha(code) ? (effects.consume(code), marker = 4, self2.interrupt ? ok2 : continuationDeclarationInside) : nok(code);
  }
  function commentOpenInside(code) {
    return code === 45 ? (effects.consume(code), self2.interrupt ? ok2 : continuationDeclarationInside) : nok(code);
  }
  function cdataOpenInside(code) {
    let value = "CDATA[";
    return code === value.charCodeAt(index2++) ? (effects.consume(code), index2 === value.length ? self2.interrupt ? ok2 : continuation : cdataOpenInside) : nok(code);
  }
  function tagCloseStart(code) {
    return asciiAlpha(code) ? (effects.consume(code), buffer = String.fromCharCode(code), tagName) : nok(code);
  }
  function tagName(code) {
    if (code === null || code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
      let slash2 = code === 47, name2 = buffer.toLowerCase();
      return !slash2 && !closingTag && htmlRawNames.includes(name2) ? (marker = 1, self2.interrupt ? ok2(code) : continuation(code)) : htmlBlockNames.includes(buffer.toLowerCase()) ? (marker = 6, slash2 ? (effects.consume(code), basicSelfClosing) : self2.interrupt ? ok2(code) : continuation(code)) : (marker = 7, self2.interrupt && !self2.parser.lazy[self2.now().line] ? nok(code) : closingTag ? completeClosingTagAfter(code) : completeAttributeNameBefore(code));
    }
    return code === 45 || asciiAlphanumeric(code) ? (effects.consume(code), buffer += String.fromCharCode(code), tagName) : nok(code);
  }
  function basicSelfClosing(code) {
    return code === 62 ? (effects.consume(code), self2.interrupt ? ok2 : continuation) : nok(code);
  }
  function completeClosingTagAfter(code) {
    return markdownSpace(code) ? (effects.consume(code), completeClosingTagAfter) : completeEnd(code);
  }
  function completeAttributeNameBefore(code) {
    return code === 47 ? (effects.consume(code), completeEnd) : code === 58 || code === 95 || asciiAlpha(code) ? (effects.consume(code), completeAttributeName) : markdownSpace(code) ? (effects.consume(code), completeAttributeNameBefore) : completeEnd(code);
  }
  function completeAttributeName(code) {
    return code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code) ? (effects.consume(code), completeAttributeName) : completeAttributeNameAfter(code);
  }
  function completeAttributeNameAfter(code) {
    return code === 61 ? (effects.consume(code), completeAttributeValueBefore) : markdownSpace(code) ? (effects.consume(code), completeAttributeNameAfter) : completeAttributeNameBefore(code);
  }
  function completeAttributeValueBefore(code) {
    return code === null || code === 60 || code === 61 || code === 62 || code === 96 ? nok(code) : code === 34 || code === 39 ? (effects.consume(code), markerB = code, completeAttributeValueQuoted) : markdownSpace(code) ? (effects.consume(code), completeAttributeValueBefore) : completeAttributeValueUnquoted(code);
  }
  function completeAttributeValueQuoted(code) {
    return code === markerB ? (effects.consume(code), markerB = null, completeAttributeValueQuotedAfter) : code === null || markdownLineEnding(code) ? nok(code) : (effects.consume(code), completeAttributeValueQuoted);
  }
  function completeAttributeValueUnquoted(code) {
    return code === null || code === 34 || code === 39 || code === 47 || code === 60 || code === 61 || code === 62 || code === 96 || markdownLineEndingOrSpace(code) ? completeAttributeNameAfter(code) : (effects.consume(code), completeAttributeValueUnquoted);
  }
  function completeAttributeValueQuotedAfter(code) {
    return code === 47 || code === 62 || markdownSpace(code) ? completeAttributeNameBefore(code) : nok(code);
  }
  function completeEnd(code) {
    return code === 62 ? (effects.consume(code), completeAfter) : nok(code);
  }
  function completeAfter(code) {
    return code === null || markdownLineEnding(code) ? continuation(code) : markdownSpace(code) ? (effects.consume(code), completeAfter) : nok(code);
  }
  function continuation(code) {
    return code === 45 && marker === 2 ? (effects.consume(code), continuationCommentInside) : code === 60 && marker === 1 ? (effects.consume(code), continuationRawTagOpen) : code === 62 && marker === 4 ? (effects.consume(code), continuationClose) : code === 63 && marker === 3 ? (effects.consume(code), continuationDeclarationInside) : code === 93 && marker === 5 ? (effects.consume(code), continuationCdataInside) : markdownLineEnding(code) && (marker === 6 || marker === 7) ? (effects.exit("htmlFlowData"), effects.check(
      blankLineBefore,
      continuationAfter,
      continuationStart
    )(code)) : code === null || markdownLineEnding(code) ? (effects.exit("htmlFlowData"), continuationStart(code)) : (effects.consume(code), continuation);
  }
  function continuationStart(code) {
    return effects.check(
      nonLazyContinuationStart,
      continuationStartNonLazy,
      continuationAfter
    )(code);
  }
  function continuationStartNonLazy(code) {
    return effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), continuationBefore;
  }
  function continuationBefore(code) {
    return code === null || markdownLineEnding(code) ? continuationStart(code) : (effects.enter("htmlFlowData"), continuation(code));
  }
  function continuationCommentInside(code) {
    return code === 45 ? (effects.consume(code), continuationDeclarationInside) : continuation(code);
  }
  function continuationRawTagOpen(code) {
    return code === 47 ? (effects.consume(code), buffer = "", continuationRawEndTag) : continuation(code);
  }
  function continuationRawEndTag(code) {
    if (code === 62) {
      let name2 = buffer.toLowerCase();
      return htmlRawNames.includes(name2) ? (effects.consume(code), continuationClose) : continuation(code);
    }
    return asciiAlpha(code) && buffer.length < 8 ? (effects.consume(code), buffer += String.fromCharCode(code), continuationRawEndTag) : continuation(code);
  }
  function continuationCdataInside(code) {
    return code === 93 ? (effects.consume(code), continuationDeclarationInside) : continuation(code);
  }
  function continuationDeclarationInside(code) {
    return code === 62 ? (effects.consume(code), continuationClose) : code === 45 && marker === 2 ? (effects.consume(code), continuationDeclarationInside) : continuation(code);
  }
  function continuationClose(code) {
    return code === null || markdownLineEnding(code) ? (effects.exit("htmlFlowData"), continuationAfter(code)) : (effects.consume(code), continuationClose);
  }
  function continuationAfter(code) {
    return effects.exit("htmlFlow"), ok2(code);
  }
}
function tokenizeNonLazyContinuationStart(effects, ok2, nok) {
  let self2 = this;
  return start2;
  function start2(code) {
    return markdownLineEnding(code) ? (effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), after) : nok(code);
  }
  function after(code) {
    return self2.parser.lazy[self2.now().line] ? nok(code) : ok2(code);
  }
}
function tokenizeBlankLineBefore(effects, ok2, nok) {
  return start2;
  function start2(code) {
    return effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), effects.attempt(blankLine, ok2, nok);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/html-text.js
var htmlText = {
  name: "htmlText",
  tokenize: tokenizeHtmlText
};
function tokenizeHtmlText(effects, ok2, nok) {
  let self2 = this, marker, index2, returnState;
  return start2;
  function start2(code) {
    return effects.enter("htmlText"), effects.enter("htmlTextData"), effects.consume(code), open3;
  }
  function open3(code) {
    return code === 33 ? (effects.consume(code), declarationOpen) : code === 47 ? (effects.consume(code), tagCloseStart) : code === 63 ? (effects.consume(code), instruction) : asciiAlpha(code) ? (effects.consume(code), tagOpen) : nok(code);
  }
  function declarationOpen(code) {
    return code === 45 ? (effects.consume(code), commentOpenInside) : code === 91 ? (effects.consume(code), index2 = 0, cdataOpenInside) : asciiAlpha(code) ? (effects.consume(code), declaration) : nok(code);
  }
  function commentOpenInside(code) {
    return code === 45 ? (effects.consume(code), commentEnd) : nok(code);
  }
  function comment(code) {
    return code === null ? nok(code) : code === 45 ? (effects.consume(code), commentClose) : markdownLineEnding(code) ? (returnState = comment, lineEndingBefore(code)) : (effects.consume(code), comment);
  }
  function commentClose(code) {
    return code === 45 ? (effects.consume(code), commentEnd) : comment(code);
  }
  function commentEnd(code) {
    return code === 62 ? end(code) : code === 45 ? commentClose(code) : comment(code);
  }
  function cdataOpenInside(code) {
    let value = "CDATA[";
    return code === value.charCodeAt(index2++) ? (effects.consume(code), index2 === value.length ? cdata : cdataOpenInside) : nok(code);
  }
  function cdata(code) {
    return code === null ? nok(code) : code === 93 ? (effects.consume(code), cdataClose) : markdownLineEnding(code) ? (returnState = cdata, lineEndingBefore(code)) : (effects.consume(code), cdata);
  }
  function cdataClose(code) {
    return code === 93 ? (effects.consume(code), cdataEnd) : cdata(code);
  }
  function cdataEnd(code) {
    return code === 62 ? end(code) : code === 93 ? (effects.consume(code), cdataEnd) : cdata(code);
  }
  function declaration(code) {
    return code === null || code === 62 ? end(code) : markdownLineEnding(code) ? (returnState = declaration, lineEndingBefore(code)) : (effects.consume(code), declaration);
  }
  function instruction(code) {
    return code === null ? nok(code) : code === 63 ? (effects.consume(code), instructionClose) : markdownLineEnding(code) ? (returnState = instruction, lineEndingBefore(code)) : (effects.consume(code), instruction);
  }
  function instructionClose(code) {
    return code === 62 ? end(code) : instruction(code);
  }
  function tagCloseStart(code) {
    return asciiAlpha(code) ? (effects.consume(code), tagClose) : nok(code);
  }
  function tagClose(code) {
    return code === 45 || asciiAlphanumeric(code) ? (effects.consume(code), tagClose) : tagCloseBetween(code);
  }
  function tagCloseBetween(code) {
    return markdownLineEnding(code) ? (returnState = tagCloseBetween, lineEndingBefore(code)) : markdownSpace(code) ? (effects.consume(code), tagCloseBetween) : end(code);
  }
  function tagOpen(code) {
    return code === 45 || asciiAlphanumeric(code) ? (effects.consume(code), tagOpen) : code === 47 || code === 62 || markdownLineEndingOrSpace(code) ? tagOpenBetween(code) : nok(code);
  }
  function tagOpenBetween(code) {
    return code === 47 ? (effects.consume(code), end) : code === 58 || code === 95 || asciiAlpha(code) ? (effects.consume(code), tagOpenAttributeName) : markdownLineEnding(code) ? (returnState = tagOpenBetween, lineEndingBefore(code)) : markdownSpace(code) ? (effects.consume(code), tagOpenBetween) : end(code);
  }
  function tagOpenAttributeName(code) {
    return code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code) ? (effects.consume(code), tagOpenAttributeName) : tagOpenAttributeNameAfter(code);
  }
  function tagOpenAttributeNameAfter(code) {
    return code === 61 ? (effects.consume(code), tagOpenAttributeValueBefore) : markdownLineEnding(code) ? (returnState = tagOpenAttributeNameAfter, lineEndingBefore(code)) : markdownSpace(code) ? (effects.consume(code), tagOpenAttributeNameAfter) : tagOpenBetween(code);
  }
  function tagOpenAttributeValueBefore(code) {
    return code === null || code === 60 || code === 61 || code === 62 || code === 96 ? nok(code) : code === 34 || code === 39 ? (effects.consume(code), marker = code, tagOpenAttributeValueQuoted) : markdownLineEnding(code) ? (returnState = tagOpenAttributeValueBefore, lineEndingBefore(code)) : markdownSpace(code) ? (effects.consume(code), tagOpenAttributeValueBefore) : (effects.consume(code), tagOpenAttributeValueUnquoted);
  }
  function tagOpenAttributeValueQuoted(code) {
    return code === marker ? (effects.consume(code), marker = void 0, tagOpenAttributeValueQuotedAfter) : code === null ? nok(code) : markdownLineEnding(code) ? (returnState = tagOpenAttributeValueQuoted, lineEndingBefore(code)) : (effects.consume(code), tagOpenAttributeValueQuoted);
  }
  function tagOpenAttributeValueUnquoted(code) {
    return code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 96 ? nok(code) : code === 47 || code === 62 || markdownLineEndingOrSpace(code) ? tagOpenBetween(code) : (effects.consume(code), tagOpenAttributeValueUnquoted);
  }
  function tagOpenAttributeValueQuotedAfter(code) {
    return code === 47 || code === 62 || markdownLineEndingOrSpace(code) ? tagOpenBetween(code) : nok(code);
  }
  function end(code) {
    return code === 62 ? (effects.consume(code), effects.exit("htmlTextData"), effects.exit("htmlText"), ok2) : nok(code);
  }
  function lineEndingBefore(code) {
    return effects.exit("htmlTextData"), effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), lineEndingAfter;
  }
  function lineEndingAfter(code) {
    return markdownSpace(code) ? factorySpace(
      effects,
      lineEndingAfterPrefix,
      "linePrefix",
      self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    )(code) : lineEndingAfterPrefix(code);
  }
  function lineEndingAfterPrefix(code) {
    return effects.enter("htmlTextData"), returnState(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/label-end.js
var labelEnd = {
  name: "labelEnd",
  tokenize: tokenizeLabelEnd,
  resolveTo: resolveToLabelEnd,
  resolveAll: resolveAllLabelEnd
}, resourceConstruct = {
  tokenize: tokenizeResource
}, referenceFullConstruct = {
  tokenize: tokenizeReferenceFull
}, referenceCollapsedConstruct = {
  tokenize: tokenizeReferenceCollapsed
};
function resolveAllLabelEnd(events) {
  let index2 = -1;
  for (; ++index2 < events.length; ) {
    let token = events[index2][1];
    (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") && (events.splice(index2 + 1, token.type === "labelImage" ? 4 : 2), token.type = "data", index2++);
  }
  return events;
}
function resolveToLabelEnd(events, context) {
  let index2 = events.length, offset2 = 0, token, open3, close, media;
  for (; index2--; )
    if (token = events[index2][1], open3) {
      if (token.type === "link" || token.type === "labelLink" && token._inactive)
        break;
      events[index2][0] === "enter" && token.type === "labelLink" && (token._inactive = !0);
    } else if (close) {
      if (events[index2][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced && (open3 = index2, token.type !== "labelLink")) {
        offset2 = 2;
        break;
      }
    } else token.type === "labelEnd" && (close = index2);
  let group = {
    type: events[open3][1].type === "labelLink" ? "link" : "image",
    start: Object.assign({}, events[open3][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  }, label = {
    type: "label",
    start: Object.assign({}, events[open3][1].start),
    end: Object.assign({}, events[close][1].end)
  }, text3 = {
    type: "labelText",
    start: Object.assign({}, events[open3 + offset2 + 2][1].end),
    end: Object.assign({}, events[close - 2][1].start)
  };
  return media = [
    ["enter", group, context],
    ["enter", label, context]
  ], media = push(media, events.slice(open3 + 1, open3 + offset2 + 3)), media = push(media, [["enter", text3, context]]), media = push(
    media,
    resolveAll(
      context.parser.constructs.insideSpan.null,
      events.slice(open3 + offset2 + 4, close - 3),
      context
    )
  ), media = push(media, [
    ["exit", text3, context],
    events[close - 2],
    events[close - 1],
    ["exit", label, context]
  ]), media = push(media, events.slice(close + 1)), media = push(media, [["exit", group, context]]), splice(events, open3, events.length, media), events;
}
function tokenizeLabelEnd(effects, ok2, nok) {
  let self2 = this, index2 = self2.events.length, labelStart, defined;
  for (; index2--; )
    if ((self2.events[index2][1].type === "labelImage" || self2.events[index2][1].type === "labelLink") && !self2.events[index2][1]._balanced) {
      labelStart = self2.events[index2][1];
      break;
    }
  return start2;
  function start2(code) {
    return labelStart ? labelStart._inactive ? labelEndNok(code) : (defined = self2.parser.defined.includes(
      normalizeIdentifier(
        self2.sliceSerialize({
          start: labelStart.end,
          end: self2.now()
        })
      )
    ), effects.enter("labelEnd"), effects.enter("labelMarker"), effects.consume(code), effects.exit("labelMarker"), effects.exit("labelEnd"), after) : nok(code);
  }
  function after(code) {
    return code === 40 ? effects.attempt(
      resourceConstruct,
      labelEndOk,
      defined ? labelEndOk : labelEndNok
    )(code) : code === 91 ? effects.attempt(
      referenceFullConstruct,
      labelEndOk,
      defined ? referenceNotFull : labelEndNok
    )(code) : defined ? labelEndOk(code) : labelEndNok(code);
  }
  function referenceNotFull(code) {
    return effects.attempt(
      referenceCollapsedConstruct,
      labelEndOk,
      labelEndNok
    )(code);
  }
  function labelEndOk(code) {
    return ok2(code);
  }
  function labelEndNok(code) {
    return labelStart._balanced = !0, nok(code);
  }
}
function tokenizeResource(effects, ok2, nok) {
  return resourceStart;
  function resourceStart(code) {
    return effects.enter("resource"), effects.enter("resourceMarker"), effects.consume(code), effects.exit("resourceMarker"), resourceBefore;
  }
  function resourceBefore(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceOpen)(code) : resourceOpen(code);
  }
  function resourceOpen(code) {
    return code === 41 ? resourceEnd(code) : factoryDestination(
      effects,
      resourceDestinationAfter,
      resourceDestinationMissing,
      "resourceDestination",
      "resourceDestinationLiteral",
      "resourceDestinationLiteralMarker",
      "resourceDestinationRaw",
      "resourceDestinationString",
      32
    )(code);
  }
  function resourceDestinationAfter(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceBetween)(code) : resourceEnd(code);
  }
  function resourceDestinationMissing(code) {
    return nok(code);
  }
  function resourceBetween(code) {
    return code === 34 || code === 39 || code === 40 ? factoryTitle(
      effects,
      resourceTitleAfter,
      nok,
      "resourceTitle",
      "resourceTitleMarker",
      "resourceTitleString"
    )(code) : resourceEnd(code);
  }
  function resourceTitleAfter(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceEnd)(code) : resourceEnd(code);
  }
  function resourceEnd(code) {
    return code === 41 ? (effects.enter("resourceMarker"), effects.consume(code), effects.exit("resourceMarker"), effects.exit("resource"), ok2) : nok(code);
  }
}
function tokenizeReferenceFull(effects, ok2, nok) {
  let self2 = this;
  return referenceFull;
  function referenceFull(code) {
    return factoryLabel.call(
      self2,
      effects,
      referenceFullAfter,
      referenceFullMissing,
      "reference",
      "referenceMarker",
      "referenceString"
    )(code);
  }
  function referenceFullAfter(code) {
    return self2.parser.defined.includes(
      normalizeIdentifier(
        self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1)
      )
    ) ? ok2(code) : nok(code);
  }
  function referenceFullMissing(code) {
    return nok(code);
  }
}
function tokenizeReferenceCollapsed(effects, ok2, nok) {
  return referenceCollapsedStart;
  function referenceCollapsedStart(code) {
    return effects.enter("reference"), effects.enter("referenceMarker"), effects.consume(code), effects.exit("referenceMarker"), referenceCollapsedOpen;
  }
  function referenceCollapsedOpen(code) {
    return code === 93 ? (effects.enter("referenceMarker"), effects.consume(code), effects.exit("referenceMarker"), effects.exit("reference"), ok2) : nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/label-start-image.js
var labelStartImage = {
  name: "labelStartImage",
  tokenize: tokenizeLabelStartImage,
  resolveAll: labelEnd.resolveAll
};
function tokenizeLabelStartImage(effects, ok2, nok) {
  let self2 = this;
  return start2;
  function start2(code) {
    return effects.enter("labelImage"), effects.enter("labelImageMarker"), effects.consume(code), effects.exit("labelImageMarker"), open3;
  }
  function open3(code) {
    return code === 91 ? (effects.enter("labelMarker"), effects.consume(code), effects.exit("labelMarker"), effects.exit("labelImage"), after) : nok(code);
  }
  function after(code) {
    return code === 94 && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code) : ok2(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/label-start-link.js
var labelStartLink = {
  name: "labelStartLink",
  tokenize: tokenizeLabelStartLink,
  resolveAll: labelEnd.resolveAll
};
function tokenizeLabelStartLink(effects, ok2, nok) {
  let self2 = this;
  return start2;
  function start2(code) {
    return effects.enter("labelLink"), effects.enter("labelMarker"), effects.consume(code), effects.exit("labelMarker"), effects.exit("labelLink"), after;
  }
  function after(code) {
    return code === 94 && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code) : ok2(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/line-ending.js
var lineEnding = {
  name: "lineEnding",
  tokenize: tokenizeLineEnding
};
function tokenizeLineEnding(effects, ok2) {
  return start2;
  function start2(code) {
    return effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), factorySpace(effects, ok2, "linePrefix");
  }
}

// ../../node_modules/micromark-core-commonmark/lib/thematic-break.js
var thematicBreak = {
  name: "thematicBreak",
  tokenize: tokenizeThematicBreak
};
function tokenizeThematicBreak(effects, ok2, nok) {
  let size = 0, marker;
  return start2;
  function start2(code) {
    return effects.enter("thematicBreak"), before(code);
  }
  function before(code) {
    return marker = code, atBreak(code);
  }
  function atBreak(code) {
    return code === marker ? (effects.enter("thematicBreakSequence"), sequence(code)) : size >= 3 && (code === null || markdownLineEnding(code)) ? (effects.exit("thematicBreak"), ok2(code)) : nok(code);
  }
  function sequence(code) {
    return code === marker ? (effects.consume(code), size++, sequence) : (effects.exit("thematicBreakSequence"), markdownSpace(code) ? factorySpace(effects, atBreak, "whitespace")(code) : atBreak(code));
  }
}

// ../../node_modules/micromark-core-commonmark/lib/list.js
var list2 = {
  name: "list",
  tokenize: tokenizeListStart,
  continuation: {
    tokenize: tokenizeListContinuation
  },
  exit: tokenizeListEnd
}, listItemPrefixWhitespaceConstruct = {
  tokenize: tokenizeListItemPrefixWhitespace,
  partial: !0
}, indentConstruct = {
  tokenize: tokenizeIndent,
  partial: !0
};
function tokenizeListStart(effects, ok2, nok) {
  let self2 = this, tail = self2.events[self2.events.length - 1], initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], !0).length : 0, size = 0;
  return start2;
  function start2(code) {
    let kind = self2.containerState.type || (code === 42 || code === 43 || code === 45 ? "listUnordered" : "listOrdered");
    if (kind === "listUnordered" ? !self2.containerState.marker || code === self2.containerState.marker : asciiDigit(code)) {
      if (self2.containerState.type || (self2.containerState.type = kind, effects.enter(kind, {
        _container: !0
      })), kind === "listUnordered")
        return effects.enter("listItemPrefix"), code === 42 || code === 45 ? effects.check(thematicBreak, nok, atMarker)(code) : atMarker(code);
      if (!self2.interrupt || code === 49)
        return effects.enter("listItemPrefix"), effects.enter("listItemValue"), inside(code);
    }
    return nok(code);
  }
  function inside(code) {
    return asciiDigit(code) && ++size < 10 ? (effects.consume(code), inside) : (!self2.interrupt || size < 2) && (self2.containerState.marker ? code === self2.containerState.marker : code === 41 || code === 46) ? (effects.exit("listItemValue"), atMarker(code)) : nok(code);
  }
  function atMarker(code) {
    return effects.enter("listItemMarker"), effects.consume(code), effects.exit("listItemMarker"), self2.containerState.marker = self2.containerState.marker || code, effects.check(
      blankLine,
      // Can’t be empty when interrupting.
      self2.interrupt ? nok : onBlank,
      effects.attempt(
        listItemPrefixWhitespaceConstruct,
        endOfPrefix,
        otherPrefix
      )
    );
  }
  function onBlank(code) {
    return self2.containerState.initialBlankLine = !0, initialSize++, endOfPrefix(code);
  }
  function otherPrefix(code) {
    return markdownSpace(code) ? (effects.enter("listItemPrefixWhitespace"), effects.consume(code), effects.exit("listItemPrefixWhitespace"), endOfPrefix) : nok(code);
  }
  function endOfPrefix(code) {
    return self2.containerState.size = initialSize + self2.sliceSerialize(effects.exit("listItemPrefix"), !0).length, ok2(code);
  }
}
function tokenizeListContinuation(effects, ok2, nok) {
  let self2 = this;
  return self2.containerState._closeFlow = void 0, effects.check(blankLine, onBlank, notBlank);
  function onBlank(code) {
    return self2.containerState.furtherBlankLines = self2.containerState.furtherBlankLines || self2.containerState.initialBlankLine, factorySpace(
      effects,
      ok2,
      "listItemIndent",
      self2.containerState.size + 1
    )(code);
  }
  function notBlank(code) {
    return self2.containerState.furtherBlankLines || !markdownSpace(code) ? (self2.containerState.furtherBlankLines = void 0, self2.containerState.initialBlankLine = void 0, notInCurrentItem(code)) : (self2.containerState.furtherBlankLines = void 0, self2.containerState.initialBlankLine = void 0, effects.attempt(indentConstruct, ok2, notInCurrentItem)(code));
  }
  function notInCurrentItem(code) {
    return self2.containerState._closeFlow = !0, self2.interrupt = void 0, factorySpace(
      effects,
      effects.attempt(list2, ok2, nok),
      "linePrefix",
      self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    )(code);
  }
}
function tokenizeIndent(effects, ok2, nok) {
  let self2 = this;
  return factorySpace(
    effects,
    afterPrefix,
    "listItemIndent",
    self2.containerState.size + 1
  );
  function afterPrefix(code) {
    let tail = self2.events[self2.events.length - 1];
    return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], !0).length === self2.containerState.size ? ok2(code) : nok(code);
  }
}
function tokenizeListEnd(effects) {
  effects.exit(this.containerState.type);
}
function tokenizeListItemPrefixWhitespace(effects, ok2, nok) {
  let self2 = this;
  return factorySpace(
    effects,
    afterPrefix,
    "listItemPrefixWhitespace",
    self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5
  );
  function afterPrefix(code) {
    let tail = self2.events[self2.events.length - 1];
    return !markdownSpace(code) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok2(code) : nok(code);
  }
}

// ../../node_modules/micromark-core-commonmark/lib/setext-underline.js
var setextUnderline = {
  name: "setextUnderline",
  tokenize: tokenizeSetextUnderline,
  resolveTo: resolveToSetextUnderline
};
function resolveToSetextUnderline(events, context) {
  let index2 = events.length, content3, text3, definition2;
  for (; index2--; )
    if (events[index2][0] === "enter") {
      if (events[index2][1].type === "content") {
        content3 = index2;
        break;
      }
      events[index2][1].type === "paragraph" && (text3 = index2);
    } else
      events[index2][1].type === "content" && events.splice(index2, 1), !definition2 && events[index2][1].type === "definition" && (definition2 = index2);
  let heading = {
    type: "setextHeading",
    start: Object.assign({}, events[text3][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  };
  return events[text3][1].type = "setextHeadingText", definition2 ? (events.splice(text3, 0, ["enter", heading, context]), events.splice(definition2 + 1, 0, ["exit", events[content3][1], context]), events[content3][1].end = Object.assign({}, events[definition2][1].end)) : events[content3][1] = heading, events.push(["exit", heading, context]), events;
}
function tokenizeSetextUnderline(effects, ok2, nok) {
  let self2 = this, marker;
  return start2;
  function start2(code) {
    let index2 = self2.events.length, paragraph;
    for (; index2--; )
      if (self2.events[index2][1].type !== "lineEnding" && self2.events[index2][1].type !== "linePrefix" && self2.events[index2][1].type !== "content") {
        paragraph = self2.events[index2][1].type === "paragraph";
        break;
      }
    return !self2.parser.lazy[self2.now().line] && (self2.interrupt || paragraph) ? (effects.enter("setextHeadingLine"), marker = code, before(code)) : nok(code);
  }
  function before(code) {
    return effects.enter("setextHeadingLineSequence"), inside(code);
  }
  function inside(code) {
    return code === marker ? (effects.consume(code), inside) : (effects.exit("setextHeadingLineSequence"), markdownSpace(code) ? factorySpace(effects, after, "lineSuffix")(code) : after(code));
  }
  function after(code) {
    return code === null || markdownLineEnding(code) ? (effects.exit("setextHeadingLine"), ok2(code)) : nok(code);
  }
}

// ../../node_modules/micromark/lib/initialize/flow.js
var flow = {
  tokenize: initializeFlow
};
function initializeFlow(effects) {
  let self2 = this, initial = effects.attempt(
    // Try to parse a blank line.
    blankLine,
    atBlankEnding,
    // Try to parse initial flow (essentially, only code).
    effects.attempt(
      this.parser.constructs.flowInitial,
      afterConstruct,
      factorySpace(
        effects,
        effects.attempt(
          this.parser.constructs.flow,
          afterConstruct,
          effects.attempt(content2, afterConstruct)
        ),
        "linePrefix"
      )
    )
  );
  return initial;
  function atBlankEnding(code) {
    if (code === null) {
      effects.consume(code);
      return;
    }
    return effects.enter("lineEndingBlank"), effects.consume(code), effects.exit("lineEndingBlank"), self2.currentConstruct = void 0, initial;
  }
  function afterConstruct(code) {
    if (code === null) {
      effects.consume(code);
      return;
    }
    return effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), self2.currentConstruct = void 0, initial;
  }
}

// ../../node_modules/micromark/lib/initialize/text.js
var resolver = {
  resolveAll: createResolver()
}, string = initializeFactory("string"), text = initializeFactory("text");
function initializeFactory(field) {
  return {
    tokenize: initializeText,
    resolveAll: createResolver(
      field === "text" ? resolveAllLineSuffixes : void 0
    )
  };
  function initializeText(effects) {
    let self2 = this, constructs2 = this.parser.constructs[field], text3 = effects.attempt(constructs2, start2, notText);
    return start2;
    function start2(code) {
      return atBreak(code) ? text3(code) : notText(code);
    }
    function notText(code) {
      if (code === null) {
        effects.consume(code);
        return;
      }
      return effects.enter("data"), effects.consume(code), data2;
    }
    function data2(code) {
      return atBreak(code) ? (effects.exit("data"), text3(code)) : (effects.consume(code), data2);
    }
    function atBreak(code) {
      if (code === null)
        return !0;
      let list3 = constructs2[code], index2 = -1;
      if (list3)
        for (; ++index2 < list3.length; ) {
          let item = list3[index2];
          if (!item.previous || item.previous.call(self2, self2.previous))
            return !0;
        }
      return !1;
    }
  }
}
function createResolver(extraResolver) {
  return resolveAllText;
  function resolveAllText(events, context) {
    let index2 = -1, enter;
    for (; ++index2 <= events.length; )
      enter === void 0 ? events[index2] && events[index2][1].type === "data" && (enter = index2, index2++) : (!events[index2] || events[index2][1].type !== "data") && (index2 !== enter + 2 && (events[enter][1].end = events[index2 - 1][1].end, events.splice(enter + 2, index2 - enter - 2), index2 = enter + 2), enter = void 0);
    return extraResolver ? extraResolver(events, context) : events;
  }
}
function resolveAllLineSuffixes(events, context) {
  let eventIndex = 0;
  for (; ++eventIndex <= events.length; )
    if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
      let data2 = events[eventIndex - 1][1], chunks = context.sliceStream(data2), index2 = chunks.length, bufferIndex = -1, size = 0, tabs;
      for (; index2--; ) {
        let chunk = chunks[index2];
        if (typeof chunk == "string") {
          for (bufferIndex = chunk.length; chunk.charCodeAt(bufferIndex - 1) === 32; )
            size++, bufferIndex--;
          if (bufferIndex) break;
          bufferIndex = -1;
        } else if (chunk === -2)
          tabs = !0, size++;
        else if (chunk !== -1) {
          index2++;
          break;
        }
      }
      if (size) {
        let token = {
          type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            line: data2.end.line,
            column: data2.end.column - size,
            offset: data2.end.offset - size,
            _index: data2.start._index + index2,
            _bufferIndex: index2 ? bufferIndex : data2.start._bufferIndex + bufferIndex
          },
          end: Object.assign({}, data2.end)
        };
        data2.end = Object.assign({}, token.start), data2.start.offset === data2.end.offset ? Object.assign(data2, token) : (events.splice(
          eventIndex,
          0,
          ["enter", token, context],
          ["exit", token, context]
        ), eventIndex += 2);
      }
      eventIndex++;
    }
  return events;
}

// ../../node_modules/micromark/lib/create-tokenizer.js
function createTokenizer(parser, initialize, from) {
  let point3 = Object.assign(
    from ? Object.assign({}, from) : {
      line: 1,
      column: 1,
      offset: 0
    },
    {
      _index: 0,
      _bufferIndex: -1
    }
  ), columnStart = {}, resolveAllConstructs = [], chunks = [], stack = [], consumed = !0, effects = {
    consume,
    enter,
    exit: exit2,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: !0
    })
  }, context = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser,
    sliceStream,
    sliceSerialize,
    now,
    defineSkip,
    write
  }, state = initialize.tokenize.call(context, effects), expectedCode;
  return initialize.resolveAll && resolveAllConstructs.push(initialize), context;
  function write(slice) {
    return chunks = push(chunks, slice), main(), chunks[chunks.length - 1] !== null ? [] : (addResult(initialize, 0), context.events = resolveAll(resolveAllConstructs, context.events, context), context.events);
  }
  function sliceSerialize(token, expandTabs) {
    return serializeChunks(sliceStream(token), expandTabs);
  }
  function sliceStream(token) {
    return sliceChunks(chunks, token);
  }
  function now() {
    let { line, column, offset: offset2, _index, _bufferIndex } = point3;
    return {
      line,
      column,
      offset: offset2,
      _index,
      _bufferIndex
    };
  }
  function defineSkip(value) {
    columnStart[value.line] = value.column, accountForPotentialSkip();
  }
  function main() {
    let chunkIndex;
    for (; point3._index < chunks.length; ) {
      let chunk = chunks[point3._index];
      if (typeof chunk == "string")
        for (chunkIndex = point3._index, point3._bufferIndex < 0 && (point3._bufferIndex = 0); point3._index === chunkIndex && point3._bufferIndex < chunk.length; )
          go(chunk.charCodeAt(point3._bufferIndex));
      else
        go(chunk);
    }
  }
  function go(code) {
    consumed = void 0, expectedCode = code, state = state(code);
  }
  function consume(code) {
    markdownLineEnding(code) ? (point3.line++, point3.column = 1, point3.offset += code === -3 ? 2 : 1, accountForPotentialSkip()) : code !== -1 && (point3.column++, point3.offset++), point3._bufferIndex < 0 ? point3._index++ : (point3._bufferIndex++, point3._bufferIndex === chunks[point3._index].length && (point3._bufferIndex = -1, point3._index++)), context.previous = code, consumed = !0;
  }
  function enter(type, fields) {
    let token = fields || {};
    return token.type = type, token.start = now(), context.events.push(["enter", token, context]), stack.push(token), token;
  }
  function exit2(type) {
    let token = stack.pop();
    return token.end = now(), context.events.push(["exit", token, context]), token;
  }
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  }
  function onsuccessfulcheck(_, info) {
    info.restore();
  }
  function constructFactory(onreturn, fields) {
    return hook;
    function hook(constructs2, returnState, bogusState) {
      let listOfConstructs, constructIndex, currentConstruct, info;
      return Array.isArray(constructs2) ? handleListOfConstructs(constructs2) : "tokenize" in constructs2 ? (
        // @ts-expect-error Looks like a construct.
        handleListOfConstructs([constructs2])
      ) : handleMapOfConstructs(constructs2);
      function handleMapOfConstructs(map) {
        return start2;
        function start2(code) {
          let def = code !== null && map[code], all2 = code !== null && map.null, list3 = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(def) ? def : def ? [def] : [],
            ...Array.isArray(all2) ? all2 : all2 ? [all2] : []
          ];
          return handleListOfConstructs(list3)(code);
        }
      }
      function handleListOfConstructs(list3) {
        return listOfConstructs = list3, constructIndex = 0, list3.length === 0 ? bogusState : handleConstruct(list3[constructIndex]);
      }
      function handleConstruct(construct) {
        return start2;
        function start2(code) {
          return info = store(), currentConstruct = construct, construct.partial || (context.currentConstruct = construct), construct.name && context.parser.constructs.disable.null.includes(construct.name) ? nok(code) : construct.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            fields ? Object.assign(Object.create(context), fields) : context,
            effects,
            ok2,
            nok
          )(code);
        }
      }
      function ok2(code) {
        return consumed = !0, onreturn(currentConstruct, info), returnState;
      }
      function nok(code) {
        return consumed = !0, info.restore(), ++constructIndex < listOfConstructs.length ? handleConstruct(listOfConstructs[constructIndex]) : bogusState;
      }
    }
  }
  function addResult(construct, from2) {
    construct.resolveAll && !resolveAllConstructs.includes(construct) && resolveAllConstructs.push(construct), construct.resolve && splice(
      context.events,
      from2,
      context.events.length - from2,
      construct.resolve(context.events.slice(from2), context)
    ), construct.resolveTo && (context.events = construct.resolveTo(context.events, context));
  }
  function store() {
    let startPoint = now(), startPrevious = context.previous, startCurrentConstruct = context.currentConstruct, startEventsIndex = context.events.length, startStack = Array.from(stack);
    return {
      restore,
      from: startEventsIndex
    };
    function restore() {
      point3 = startPoint, context.previous = startPrevious, context.currentConstruct = startCurrentConstruct, context.events.length = startEventsIndex, stack = startStack, accountForPotentialSkip();
    }
  }
  function accountForPotentialSkip() {
    point3.line in columnStart && point3.column < 2 && (point3.column = columnStart[point3.line], point3.offset += columnStart[point3.line] - 1);
  }
}
function sliceChunks(chunks, token) {
  let startIndex = token.start._index, startBufferIndex = token.start._bufferIndex, endIndex = token.end._index, endBufferIndex = token.end._bufferIndex, view;
  if (startIndex === endIndex)
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  else {
    if (view = chunks.slice(startIndex, endIndex), startBufferIndex > -1) {
      let head = view[0];
      typeof head == "string" ? view[0] = head.slice(startBufferIndex) : view.shift();
    }
    endBufferIndex > 0 && view.push(chunks[endIndex].slice(0, endBufferIndex));
  }
  return view;
}
function serializeChunks(chunks, expandTabs) {
  let index2 = -1, result = [], atTab;
  for (; ++index2 < chunks.length; ) {
    let chunk = chunks[index2], value;
    if (typeof chunk == "string")
      value = chunk;
    else
      switch (chunk) {
        case -5: {
          value = "\r";
          break;
        }
        case -4: {
          value = `
`;
          break;
        }
        case -3: {
          value = `\r
`;
          break;
        }
        case -2: {
          value = expandTabs ? " " : "	";
          break;
        }
        case -1: {
          if (!expandTabs && atTab) continue;
          value = " ";
          break;
        }
        default:
          value = String.fromCharCode(chunk);
      }
    atTab = chunk === -2, result.push(value);
  }
  return result.join("");
}

// ../../node_modules/micromark/lib/constructs.js
var constructs_exports = {};
__export(constructs_exports, {
  attentionMarkers: () => attentionMarkers,
  contentInitial: () => contentInitial,
  disable: () => disable,
  document: () => document4,
  flow: () => flow2,
  flowInitial: () => flowInitial,
  insideSpan: () => insideSpan,
  string: () => string2,
  text: () => text2
});
var document4 = {
  42: list2,
  43: list2,
  45: list2,
  48: list2,
  49: list2,
  50: list2,
  51: list2,
  52: list2,
  53: list2,
  54: list2,
  55: list2,
  56: list2,
  57: list2,
  62: blockQuote
}, contentInitial = {
  91: definition
}, flowInitial = {
  [-2]: codeIndented,
  [-1]: codeIndented,
  32: codeIndented
}, flow2 = {
  35: headingAtx,
  42: thematicBreak,
  45: [setextUnderline, thematicBreak],
  60: htmlFlow,
  61: setextUnderline,
  95: thematicBreak,
  96: codeFenced,
  126: codeFenced
}, string2 = {
  38: characterReference,
  92: characterEscape
}, text2 = {
  [-5]: lineEnding,
  [-4]: lineEnding,
  [-3]: lineEnding,
  33: labelStartImage,
  38: characterReference,
  42: attention,
  60: [autolink, htmlText],
  91: labelStartLink,
  92: [hardBreakEscape, characterEscape],
  93: labelEnd,
  95: attention,
  96: codeText
}, insideSpan = {
  null: [attention, resolver]
}, attentionMarkers = {
  null: [42, 95]
}, disable = {
  null: []
};

// ../../node_modules/micromark/lib/parse.js
function parse10(options) {
  let constructs2 = (
    /** @type {FullNormalizedExtension} */
    combineExtensions([constructs_exports, ...(options || {}).extensions || []])
  ), parser = {
    defined: [],
    lazy: {},
    constructs: constructs2,
    content: create(content),
    document: create(document3),
    flow: create(flow),
    string: create(string),
    text: create(text)
  };
  return parser;
  function create(initial) {
    return creator;
    function creator(from) {
      return createTokenizer(parser, initial, from);
    }
  }
}

// ../../node_modules/micromark/lib/postprocess.js
function postprocess(events) {
  for (; !subtokenize(events); )
    ;
  return events;
}

// ../../node_modules/micromark/lib/preprocess.js
var search = /[\0\t\n\r]/g;
function preprocess() {
  let column = 1, buffer = "", start2 = !0, atCarriageReturn;
  return preprocessor;
  function preprocessor(value, encoding, end) {
    let chunks = [], match, next, startPosition, endPosition, code;
    for (value = buffer + (typeof value == "string" ? value.toString() : new TextDecoder(encoding || void 0).decode(value)), startPosition = 0, buffer = "", start2 && (value.charCodeAt(0) === 65279 && startPosition++, start2 = void 0); startPosition < value.length; ) {
      if (search.lastIndex = startPosition, match = search.exec(value), endPosition = match && match.index !== void 0 ? match.index : value.length, code = value.charCodeAt(endPosition), !match) {
        buffer = value.slice(startPosition);
        break;
      }
      if (code === 10 && startPosition === endPosition && atCarriageReturn)
        chunks.push(-3), atCarriageReturn = void 0;
      else
        switch (atCarriageReturn && (chunks.push(-5), atCarriageReturn = void 0), startPosition < endPosition && (chunks.push(value.slice(startPosition, endPosition)), column += endPosition - startPosition), code) {
          case 0: {
            chunks.push(65533), column++;
            break;
          }
          case 9: {
            for (next = Math.ceil(column / 4) * 4, chunks.push(-2); column++ < next; ) chunks.push(-1);
            break;
          }
          case 10: {
            chunks.push(-4), column = 1;
            break;
          }
          default:
            atCarriageReturn = !0, column = 1;
        }
      startPosition = endPosition + 1;
    }
    return end && (atCarriageReturn && chunks.push(-5), buffer && chunks.push(buffer), chunks.push(null)), chunks;
  }
}

// ../../node_modules/micromark-util-decode-string/index.js
var characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function decodeString(value) {
  return value.replace(characterEscapeOrReference, decode);
}
function decode($0, $1, $2) {
  if ($1)
    return $1;
  if ($2.charCodeAt(0) === 35) {
    let head2 = $2.charCodeAt(1), hex = head2 === 120 || head2 === 88;
    return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
  }
  return decodeNamedCharacterReference($2) || $0;
}

// ../../node_modules/unist-util-stringify-position/lib/index.js
function stringifyPosition(value) {
  return !value || typeof value != "object" ? "" : "position" in value || "type" in value ? position(value.position) : "start" in value || "end" in value ? position(value) : "line" in value || "column" in value ? point(value) : "";
}
function point(point3) {
  return index(point3 && point3.line) + ":" + index(point3 && point3.column);
}
function position(pos) {
  return point(pos && pos.start) + "-" + point(pos && pos.end);
}
function index(value) {
  return value && typeof value == "number" ? value : 1;
}

// ../../node_modules/mdast-util-from-markdown/lib/index.js
var own2 = {}.hasOwnProperty;
function fromMarkdown(value, encoding, options) {
  return typeof encoding != "string" && (options = encoding, encoding = void 0), compiler(options)(
    postprocess(
      parse10(options).document().write(preprocess()(value, encoding, !0))
    )
  );
}
function compiler(options) {
  let config = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: opener(link),
      autolinkProtocol: onenterdata,
      autolinkEmail: onenterdata,
      atxHeading: opener(heading),
      blockQuote: opener(blockQuote2),
      characterEscape: onenterdata,
      characterReference: onenterdata,
      codeFenced: opener(codeFlow),
      codeFencedFenceInfo: buffer,
      codeFencedFenceMeta: buffer,
      codeIndented: opener(codeFlow, buffer),
      codeText: opener(codeText2, buffer),
      codeTextData: onenterdata,
      data: onenterdata,
      codeFlowValue: onenterdata,
      definition: opener(definition2),
      definitionDestinationString: buffer,
      definitionLabelString: buffer,
      definitionTitleString: buffer,
      emphasis: opener(emphasis),
      hardBreakEscape: opener(hardBreak),
      hardBreakTrailing: opener(hardBreak),
      htmlFlow: opener(html, buffer),
      htmlFlowData: onenterdata,
      htmlText: opener(html, buffer),
      htmlTextData: onenterdata,
      image: opener(image),
      label: buffer,
      link: opener(link),
      listItem: opener(listItem),
      listItemValue: onenterlistitemvalue,
      listOrdered: opener(list3, onenterlistordered),
      listUnordered: opener(list3),
      paragraph: opener(paragraph),
      reference: onenterreference,
      referenceString: buffer,
      resourceDestinationString: buffer,
      resourceTitleString: buffer,
      setextHeading: opener(heading),
      strong: opener(strong),
      thematicBreak: opener(thematicBreak2)
    },
    exit: {
      atxHeading: closer(),
      atxHeadingSequence: onexitatxheadingsequence,
      autolink: closer(),
      autolinkEmail: onexitautolinkemail,
      autolinkProtocol: onexitautolinkprotocol,
      blockQuote: closer(),
      characterEscapeValue: onexitdata,
      characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
      characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
      characterReferenceValue: onexitcharacterreferencevalue,
      codeFenced: closer(onexitcodefenced),
      codeFencedFence: onexitcodefencedfence,
      codeFencedFenceInfo: onexitcodefencedfenceinfo,
      codeFencedFenceMeta: onexitcodefencedfencemeta,
      codeFlowValue: onexitdata,
      codeIndented: closer(onexitcodeindented),
      codeText: closer(onexitcodetext),
      codeTextData: onexitdata,
      data: onexitdata,
      definition: closer(),
      definitionDestinationString: onexitdefinitiondestinationstring,
      definitionLabelString: onexitdefinitionlabelstring,
      definitionTitleString: onexitdefinitiontitlestring,
      emphasis: closer(),
      hardBreakEscape: closer(onexithardbreak),
      hardBreakTrailing: closer(onexithardbreak),
      htmlFlow: closer(onexithtmlflow),
      htmlFlowData: onexitdata,
      htmlText: closer(onexithtmltext),
      htmlTextData: onexitdata,
      image: closer(onexitimage),
      label: onexitlabel,
      labelText: onexitlabeltext,
      lineEnding: onexitlineending,
      link: closer(onexitlink),
      listItem: closer(),
      listOrdered: closer(),
      listUnordered: closer(),
      paragraph: closer(),
      referenceString: onexitreferencestring,
      resourceDestinationString: onexitresourcedestinationstring,
      resourceTitleString: onexitresourcetitlestring,
      resource: onexitresource,
      setextHeading: closer(onexitsetextheading),
      setextHeadingLineSequence: onexitsetextheadinglinesequence,
      setextHeadingText: onexitsetextheadingtext,
      strong: closer(),
      thematicBreak: closer()
    }
  };
  configure(config, (options || {}).mdastExtensions || []);
  let data2 = {};
  return compile2;
  function compile2(events) {
    let tree = {
      type: "root",
      children: []
    }, context = {
      stack: [tree],
      tokenStack: [],
      config,
      enter,
      exit: exit2,
      buffer,
      resume,
      data: data2
    }, listStack = [], index2 = -1;
    for (; ++index2 < events.length; )
      if (events[index2][1].type === "listOrdered" || events[index2][1].type === "listUnordered")
        if (events[index2][0] === "enter")
          listStack.push(index2);
        else {
          let tail = listStack.pop();
          index2 = prepareList(events, tail, index2);
        }
    for (index2 = -1; ++index2 < events.length; ) {
      let handler = config[events[index2][0]];
      own2.call(handler, events[index2][1].type) && handler[events[index2][1].type].call(
        Object.assign(
          {
            sliceSerialize: events[index2][2].sliceSerialize
          },
          context
        ),
        events[index2][1]
      );
    }
    if (context.tokenStack.length > 0) {
      let tail = context.tokenStack[context.tokenStack.length - 1];
      (tail[1] || defaultOnError).call(context, void 0, tail[0]);
    }
    for (tree.position = {
      start: point2(
        events.length > 0 ? events[0][1].start : {
          line: 1,
          column: 1,
          offset: 0
        }
      ),
      end: point2(
        events.length > 0 ? events[events.length - 2][1].end : {
          line: 1,
          column: 1,
          offset: 0
        }
      )
    }, index2 = -1; ++index2 < config.transforms.length; )
      tree = config.transforms[index2](tree) || tree;
    return tree;
  }
  function prepareList(events, start2, length) {
    let index2 = start2 - 1, containerBalance = -1, listSpread = !1, listItem2, lineIndex, firstBlankLineIndex, atMarker;
    for (; ++index2 <= length; ) {
      let event = events[index2];
      switch (event[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          event[0] === "enter" ? containerBalance++ : containerBalance--, atMarker = void 0;
          break;
        }
        case "lineEndingBlank": {
          event[0] === "enter" && (listItem2 && !atMarker && !containerBalance && !firstBlankLineIndex && (firstBlankLineIndex = index2), atMarker = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          atMarker = void 0;
      }
      if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
        if (listItem2) {
          let tailIndex = index2;
          for (lineIndex = void 0; tailIndex--; ) {
            let tailEvent = events[tailIndex];
            if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
              if (tailEvent[0] === "exit") continue;
              lineIndex && (events[lineIndex][1].type = "lineEndingBlank", listSpread = !0), tailEvent[1].type = "lineEnding", lineIndex = tailIndex;
            } else if (!(tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent"))
              break;
          }
          firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex) && (listItem2._spread = !0), listItem2.end = Object.assign(
            {},
            lineIndex ? events[lineIndex][1].start : event[1].end
          ), events.splice(lineIndex || index2, 0, ["exit", listItem2, event[2]]), index2++, length++;
        }
        if (event[1].type === "listItemPrefix") {
          let item = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, event[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          listItem2 = item, events.splice(index2, 0, ["enter", item, event[2]]), index2++, length++, firstBlankLineIndex = void 0, atMarker = !0;
        }
      }
    }
    return events[start2][1]._spread = listSpread, length;
  }
  function opener(create, and) {
    return open3;
    function open3(token) {
      enter.call(this, create(token), token), and && and.call(this, token);
    }
  }
  function buffer() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function enter(node2, token, errorHandler) {
    this.stack[this.stack.length - 1].children.push(node2), this.stack.push(node2), this.tokenStack.push([token, errorHandler]), node2.position = {
      start: point2(token.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function closer(and) {
    return close;
    function close(token) {
      and && and.call(this, token), exit2.call(this, token);
    }
  }
  function exit2(token, onExitError) {
    let node2 = this.stack.pop(), open3 = this.tokenStack.pop();
    if (open3)
      open3[0].type !== token.type && (onExitError ? onExitError.call(this, token, open3[0]) : (open3[1] || defaultOnError).call(this, token, open3[0]));
    else throw new Error(
      "Cannot close `" + token.type + "` (" + stringifyPosition({
        start: token.start,
        end: token.end
      }) + "): it\u2019s not open"
    );
    node2.position.end = point2(token.end);
  }
  function resume() {
    return toString2(this.stack.pop());
  }
  function onenterlistordered() {
    this.data.expectingFirstListItemValue = !0;
  }
  function onenterlistitemvalue(token) {
    if (this.data.expectingFirstListItemValue) {
      let ancestor = this.stack[this.stack.length - 2];
      ancestor.start = Number.parseInt(this.sliceSerialize(token), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function onexitcodefencedfenceinfo() {
    let data3 = this.resume(), node2 = this.stack[this.stack.length - 1];
    node2.lang = data3;
  }
  function onexitcodefencedfencemeta() {
    let data3 = this.resume(), node2 = this.stack[this.stack.length - 1];
    node2.meta = data3;
  }
  function onexitcodefencedfence() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function onexitcodefenced() {
    let data3 = this.resume(), node2 = this.stack[this.stack.length - 1];
    node2.value = data3.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function onexitcodeindented() {
    let data3 = this.resume(), node2 = this.stack[this.stack.length - 1];
    node2.value = data3.replace(/(\r?\n|\r)$/g, "");
  }
  function onexitdefinitionlabelstring(token) {
    let label = this.resume(), node2 = this.stack[this.stack.length - 1];
    node2.label = label, node2.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
  }
  function onexitdefinitiontitlestring() {
    let data3 = this.resume(), node2 = this.stack[this.stack.length - 1];
    node2.title = data3;
  }
  function onexitdefinitiondestinationstring() {
    let data3 = this.resume(), node2 = this.stack[this.stack.length - 1];
    node2.url = data3;
  }
  function onexitatxheadingsequence(token) {
    let node2 = this.stack[this.stack.length - 1];
    if (!node2.depth) {
      let depth = this.sliceSerialize(token).length;
      node2.depth = depth;
    }
  }
  function onexitsetextheadingtext() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function onexitsetextheadinglinesequence(token) {
    let node2 = this.stack[this.stack.length - 1];
    node2.depth = this.sliceSerialize(token).codePointAt(0) === 61 ? 1 : 2;
  }
  function onexitsetextheading() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function onenterdata(token) {
    let siblings = this.stack[this.stack.length - 1].children, tail = siblings[siblings.length - 1];
    (!tail || tail.type !== "text") && (tail = text3(), tail.position = {
      start: point2(token.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, siblings.push(tail)), this.stack.push(tail);
  }
  function onexitdata(token) {
    let tail = this.stack.pop();
    tail.value += this.sliceSerialize(token), tail.position.end = point2(token.end);
  }
  function onexitlineending(token) {
    let context = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      let tail = context.children[context.children.length - 1];
      tail.position.end = point2(token.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && config.canContainEols.includes(context.type) && (onenterdata.call(this, token), onexitdata.call(this, token));
  }
  function onexithardbreak() {
    this.data.atHardBreak = !0;
  }
  function onexithtmlflow() {
    let data3 = this.resume(), node2 = this.stack[this.stack.length - 1];
    node2.value = data3;
  }
  function onexithtmltext() {
    let data3 = this.resume(), node2 = this.stack[this.stack.length - 1];
    node2.value = data3;
  }
  function onexitcodetext() {
    let data3 = this.resume(), node2 = this.stack[this.stack.length - 1];
    node2.value = data3;
  }
  function onexitlink() {
    let node2 = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      let referenceType = this.data.referenceType || "shortcut";
      node2.type += "Reference", node2.referenceType = referenceType, delete node2.url, delete node2.title;
    } else
      delete node2.identifier, delete node2.label;
    this.data.referenceType = void 0;
  }
  function onexitimage() {
    let node2 = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      let referenceType = this.data.referenceType || "shortcut";
      node2.type += "Reference", node2.referenceType = referenceType, delete node2.url, delete node2.title;
    } else
      delete node2.identifier, delete node2.label;
    this.data.referenceType = void 0;
  }
  function onexitlabeltext(token) {
    let string3 = this.sliceSerialize(token), ancestor = this.stack[this.stack.length - 2];
    ancestor.label = decodeString(string3), ancestor.identifier = normalizeIdentifier(string3).toLowerCase();
  }
  function onexitlabel() {
    let fragment = this.stack[this.stack.length - 1], value = this.resume(), node2 = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, node2.type === "link") {
      let children = fragment.children;
      node2.children = children;
    } else
      node2.alt = value;
  }
  function onexitresourcedestinationstring() {
    let data3 = this.resume(), node2 = this.stack[this.stack.length - 1];
    node2.url = data3;
  }
  function onexitresourcetitlestring() {
    let data3 = this.resume(), node2 = this.stack[this.stack.length - 1];
    node2.title = data3;
  }
  function onexitresource() {
    this.data.inReference = void 0;
  }
  function onenterreference() {
    this.data.referenceType = "collapsed";
  }
  function onexitreferencestring(token) {
    let label = this.resume(), node2 = this.stack[this.stack.length - 1];
    node2.label = label, node2.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase(), this.data.referenceType = "full";
  }
  function onexitcharacterreferencemarker(token) {
    this.data.characterReferenceType = token.type;
  }
  function onexitcharacterreferencevalue(token) {
    let data3 = this.sliceSerialize(token), type = this.data.characterReferenceType, value;
    type ? (value = decodeNumericCharacterReference(
      data3,
      type === "characterReferenceMarkerNumeric" ? 10 : 16
    ), this.data.characterReferenceType = void 0) : value = decodeNamedCharacterReference(data3);
    let tail = this.stack.pop();
    tail.value += value, tail.position.end = point2(token.end);
  }
  function onexitautolinkprotocol(token) {
    onexitdata.call(this, token);
    let node2 = this.stack[this.stack.length - 1];
    node2.url = this.sliceSerialize(token);
  }
  function onexitautolinkemail(token) {
    onexitdata.call(this, token);
    let node2 = this.stack[this.stack.length - 1];
    node2.url = "mailto:" + this.sliceSerialize(token);
  }
  function blockQuote2() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function codeFlow() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function codeText2() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function definition2() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function emphasis() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function heading() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function hardBreak() {
    return {
      type: "break"
    };
  }
  function html() {
    return {
      type: "html",
      value: ""
    };
  }
  function image() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function link() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function list3(token) {
    return {
      type: "list",
      ordered: token.type === "listOrdered",
      start: null,
      spread: token._spread,
      children: []
    };
  }
  function listItem(token) {
    return {
      type: "listItem",
      spread: token._spread,
      checked: null,
      children: []
    };
  }
  function paragraph() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function strong() {
    return {
      type: "strong",
      children: []
    };
  }
  function text3() {
    return {
      type: "text",
      value: ""
    };
  }
  function thematicBreak2() {
    return {
      type: "thematicBreak"
    };
  }
}
function point2(d) {
  return {
    line: d.line,
    column: d.column,
    offset: d.offset
  };
}
function configure(combined, extensions) {
  let index2 = -1;
  for (; ++index2 < extensions.length; ) {
    let value = extensions[index2];
    Array.isArray(value) ? configure(combined, value) : extension(combined, value);
  }
}
function extension(combined, extension2) {
  let key2;
  for (key2 in extension2)
    if (own2.call(extension2, key2))
      switch (key2) {
        case "canContainEols": {
          let right = extension2[key2];
          right && combined[key2].push(...right);
          break;
        }
        case "transforms": {
          let right = extension2[key2];
          right && combined[key2].push(...right);
          break;
        }
        case "enter":
        case "exit": {
          let right = extension2[key2];
          right && Object.assign(combined[key2], right);
          break;
        }
      }
}
function defaultOnError(left, right) {
  throw left ? new Error(
    "Cannot close `" + left.type + "` (" + stringifyPosition({
      start: left.start,
      end: left.end
    }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
      start: right.start,
      end: right.end
    }) + ") is open"
  ) : new Error(
    "Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
      start: right.start,
      end: right.end
    }) + ") is still open"
  );
}

// ../../node_modules/mdast-util-mdx-expression/lib/index.js
function mdxExpressionFromMarkdown() {
  return {
    enter: {
      mdxFlowExpression: enterMdxFlowExpression,
      mdxTextExpression: enterMdxTextExpression
    },
    exit: {
      mdxFlowExpression: exitMdxExpression,
      mdxFlowExpressionChunk: exitMdxExpressionData,
      mdxTextExpression: exitMdxExpression,
      mdxTextExpressionChunk: exitMdxExpressionData
    }
  };
}
function enterMdxFlowExpression(token) {
  this.enter({ type: "mdxFlowExpression", value: "" }, token), this.buffer();
}
function enterMdxTextExpression(token) {
  this.enter({ type: "mdxTextExpression", value: "" }, token), this.buffer();
}
function exitMdxExpression(token) {
  let value = this.resume(), estree = token.estree, node2 = this.stack[this.stack.length - 1];
  node2.type === "mdxFlowExpression" || node2.type, this.exit(token), node2.value = value, estree && (node2.data = { estree });
}
function exitMdxExpressionData(token) {
  this.config.enter.data.call(this, token), this.config.exit.data.call(this, token);
}

// ../../node_modules/character-entities-legacy/index.js
var characterEntitiesLegacy = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
];

// ../../node_modules/character-reference-invalid/index.js
var characterReferenceInvalid = {
  0: "\uFFFD",
  128: "\u20AC",
  130: "\u201A",
  131: "\u0192",
  132: "\u201E",
  133: "\u2026",
  134: "\u2020",
  135: "\u2021",
  136: "\u02C6",
  137: "\u2030",
  138: "\u0160",
  139: "\u2039",
  140: "\u0152",
  142: "\u017D",
  145: "\u2018",
  146: "\u2019",
  147: "\u201C",
  148: "\u201D",
  149: "\u2022",
  150: "\u2013",
  151: "\u2014",
  152: "\u02DC",
  153: "\u2122",
  154: "\u0161",
  155: "\u203A",
  156: "\u0153",
  158: "\u017E",
  159: "\u0178"
};

// ../../node_modules/is-decimal/index.js
function isDecimal(character) {
  let code = typeof character == "string" ? character.charCodeAt(0) : character;
  return code >= 48 && code <= 57;
}

// ../../node_modules/is-hexadecimal/index.js
function isHexadecimal(character) {
  let code = typeof character == "string" ? character.charCodeAt(0) : character;
  return code >= 97 && code <= 102 || code >= 65 && code <= 70 || code >= 48 && code <= 57;
}

// ../../node_modules/is-alphabetical/index.js
function isAlphabetical(character) {
  let code = typeof character == "string" ? character.charCodeAt(0) : character;
  return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}

// ../../node_modules/is-alphanumerical/index.js
function isAlphanumerical(character) {
  return isAlphabetical(character) || isDecimal(character);
}

// ../../node_modules/parse-entities/lib/index.js
var messages = [
  "",
  /* 1: Non terminated (named) */
  "Named character references must be terminated by a semicolon",
  /* 2: Non terminated (numeric) */
  "Numeric character references must be terminated by a semicolon",
  /* 3: Empty (named) */
  "Named character references cannot be empty",
  /* 4: Empty (numeric) */
  "Numeric character references cannot be empty",
  /* 5: Unknown (named) */
  "Named character references must be known",
  /* 6: Disallowed (numeric) */
  "Numeric character references cannot be disallowed",
  /* 7: Prohibited (numeric) */
  "Numeric character references cannot be outside the permissible Unicode range"
];
function parseEntities(value, options) {
  let settings = options || {}, additional = typeof settings.additional == "string" ? settings.additional.charCodeAt(0) : settings.additional, result = [], index2 = 0, lines = -1, queue = "", point3, indent;
  settings.position && ("start" in settings.position || "indent" in settings.position ? (indent = settings.position.indent, point3 = settings.position.start) : point3 = settings.position);
  let line = (point3 ? point3.line : 0) || 1, column = (point3 ? point3.column : 0) || 1, previous2 = now(), character;
  for (index2--; ++index2 <= value.length; )
    if (character === 10 && (column = (indent ? indent[lines] : 0) || 1), character = value.charCodeAt(index2), character === 38) {
      let following = value.charCodeAt(index2 + 1);
      if (following === 9 || following === 10 || following === 12 || following === 32 || following === 38 || following === 60 || Number.isNaN(following) || additional && following === additional) {
        queue += String.fromCharCode(character), column++;
        continue;
      }
      let start2 = index2 + 1, begin = start2, end = start2, type;
      if (following === 35) {
        end = ++begin;
        let following2 = value.charCodeAt(end);
        following2 === 88 || following2 === 120 ? (type = "hexadecimal", end = ++begin) : type = "decimal";
      } else
        type = "named";
      let characterReferenceCharacters = "", characterReference2 = "", characters2 = "", test = type === "named" ? isAlphanumerical : type === "decimal" ? isDecimal : isHexadecimal;
      for (end--; ++end <= value.length; ) {
        let following2 = value.charCodeAt(end);
        if (!test(following2))
          break;
        characters2 += String.fromCharCode(following2), type === "named" && characterEntitiesLegacy.includes(characters2) && (characterReferenceCharacters = characters2, characterReference2 = decodeNamedCharacterReference(characters2));
      }
      let terminated = value.charCodeAt(end) === 59;
      if (terminated) {
        end++;
        let namedReference = type === "named" ? decodeNamedCharacterReference(characters2) : !1;
        namedReference && (characterReferenceCharacters = characters2, characterReference2 = namedReference);
      }
      let diff = 1 + end - start2, reference = "";
      if (!(!terminated && settings.nonTerminated === !1))
        if (!characters2)
          type !== "named" && warning(4, diff);
        else if (type === "named") {
          if (terminated && !characterReference2)
            warning(5, 1);
          else if (characterReferenceCharacters !== characters2 && (end = begin + characterReferenceCharacters.length, diff = 1 + end - begin, terminated = !1), !terminated) {
            let reason = characterReferenceCharacters ? 1 : 3;
            if (settings.attribute) {
              let following2 = value.charCodeAt(end);
              following2 === 61 ? (warning(reason, diff), characterReference2 = "") : isAlphanumerical(following2) ? characterReference2 = "" : warning(reason, diff);
            } else
              warning(reason, diff);
          }
          reference = characterReference2;
        } else {
          terminated || warning(2, diff);
          let referenceCode = Number.parseInt(
            characters2,
            type === "hexadecimal" ? 16 : 10
          );
          if (prohibited(referenceCode))
            warning(7, diff), reference = "\uFFFD";
          else if (referenceCode in characterReferenceInvalid)
            warning(6, diff), reference = characterReferenceInvalid[referenceCode];
          else {
            let output = "";
            disallowed(referenceCode) && warning(6, diff), referenceCode > 65535 && (referenceCode -= 65536, output += String.fromCharCode(
              referenceCode >>> 10 | 55296
            ), referenceCode = 56320 | referenceCode & 1023), reference = output + String.fromCharCode(referenceCode);
          }
        }
      if (reference) {
        flush(), previous2 = now(), index2 = end - 1, column += end - start2 + 1, result.push(reference);
        let next = now();
        next.offset++, settings.reference && settings.reference.call(
          settings.referenceContext || void 0,
          reference,
          { start: previous2, end: next },
          value.slice(start2 - 1, end)
        ), previous2 = next;
      } else
        characters2 = value.slice(start2 - 1, end), queue += characters2, column += characters2.length, index2 = end - 1;
    } else
      character === 10 && (line++, lines++, column = 0), Number.isNaN(character) ? flush() : (queue += String.fromCharCode(character), column++);
  return result.join("");
  function now() {
    return {
      line,
      column,
      offset: index2 + ((point3 ? point3.offset : 0) || 0)
    };
  }
  function warning(code, offset2) {
    let position2;
    settings.warning && (position2 = now(), position2.column += offset2, position2.offset += offset2, settings.warning.call(
      settings.warningContext || void 0,
      messages[code],
      position2,
      code
    ));
  }
  function flush() {
    queue && (result.push(queue), settings.text && settings.text.call(settings.textContext || void 0, queue, {
      start: previous2,
      end: now()
    }), queue = "");
  }
}
function prohibited(code) {
  return code >= 55296 && code <= 57343 || code > 1114111;
}
function disallowed(code) {
  return code >= 1 && code <= 8 || code === 11 || code >= 13 && code <= 31 || code >= 127 && code <= 159 || code >= 64976 && code <= 65007 || (code & 65535) === 65535 || (code & 65535) === 65534;
}

// ../../node_modules/character-entities-html4/index.js
var characterEntitiesHtml4 = {
  nbsp: "\xA0",
  iexcl: "\xA1",
  cent: "\xA2",
  pound: "\xA3",
  curren: "\xA4",
  yen: "\xA5",
  brvbar: "\xA6",
  sect: "\xA7",
  uml: "\xA8",
  copy: "\xA9",
  ordf: "\xAA",
  laquo: "\xAB",
  not: "\xAC",
  shy: "\xAD",
  reg: "\xAE",
  macr: "\xAF",
  deg: "\xB0",
  plusmn: "\xB1",
  sup2: "\xB2",
  sup3: "\xB3",
  acute: "\xB4",
  micro: "\xB5",
  para: "\xB6",
  middot: "\xB7",
  cedil: "\xB8",
  sup1: "\xB9",
  ordm: "\xBA",
  raquo: "\xBB",
  frac14: "\xBC",
  frac12: "\xBD",
  frac34: "\xBE",
  iquest: "\xBF",
  Agrave: "\xC0",
  Aacute: "\xC1",
  Acirc: "\xC2",
  Atilde: "\xC3",
  Auml: "\xC4",
  Aring: "\xC5",
  AElig: "\xC6",
  Ccedil: "\xC7",
  Egrave: "\xC8",
  Eacute: "\xC9",
  Ecirc: "\xCA",
  Euml: "\xCB",
  Igrave: "\xCC",
  Iacute: "\xCD",
  Icirc: "\xCE",
  Iuml: "\xCF",
  ETH: "\xD0",
  Ntilde: "\xD1",
  Ograve: "\xD2",
  Oacute: "\xD3",
  Ocirc: "\xD4",
  Otilde: "\xD5",
  Ouml: "\xD6",
  times: "\xD7",
  Oslash: "\xD8",
  Ugrave: "\xD9",
  Uacute: "\xDA",
  Ucirc: "\xDB",
  Uuml: "\xDC",
  Yacute: "\xDD",
  THORN: "\xDE",
  szlig: "\xDF",
  agrave: "\xE0",
  aacute: "\xE1",
  acirc: "\xE2",
  atilde: "\xE3",
  auml: "\xE4",
  aring: "\xE5",
  aelig: "\xE6",
  ccedil: "\xE7",
  egrave: "\xE8",
  eacute: "\xE9",
  ecirc: "\xEA",
  euml: "\xEB",
  igrave: "\xEC",
  iacute: "\xED",
  icirc: "\xEE",
  iuml: "\xEF",
  eth: "\xF0",
  ntilde: "\xF1",
  ograve: "\xF2",
  oacute: "\xF3",
  ocirc: "\xF4",
  otilde: "\xF5",
  ouml: "\xF6",
  divide: "\xF7",
  oslash: "\xF8",
  ugrave: "\xF9",
  uacute: "\xFA",
  ucirc: "\xFB",
  uuml: "\xFC",
  yacute: "\xFD",
  thorn: "\xFE",
  yuml: "\xFF",
  fnof: "\u0192",
  Alpha: "\u0391",
  Beta: "\u0392",
  Gamma: "\u0393",
  Delta: "\u0394",
  Epsilon: "\u0395",
  Zeta: "\u0396",
  Eta: "\u0397",
  Theta: "\u0398",
  Iota: "\u0399",
  Kappa: "\u039A",
  Lambda: "\u039B",
  Mu: "\u039C",
  Nu: "\u039D",
  Xi: "\u039E",
  Omicron: "\u039F",
  Pi: "\u03A0",
  Rho: "\u03A1",
  Sigma: "\u03A3",
  Tau: "\u03A4",
  Upsilon: "\u03A5",
  Phi: "\u03A6",
  Chi: "\u03A7",
  Psi: "\u03A8",
  Omega: "\u03A9",
  alpha: "\u03B1",
  beta: "\u03B2",
  gamma: "\u03B3",
  delta: "\u03B4",
  epsilon: "\u03B5",
  zeta: "\u03B6",
  eta: "\u03B7",
  theta: "\u03B8",
  iota: "\u03B9",
  kappa: "\u03BA",
  lambda: "\u03BB",
  mu: "\u03BC",
  nu: "\u03BD",
  xi: "\u03BE",
  omicron: "\u03BF",
  pi: "\u03C0",
  rho: "\u03C1",
  sigmaf: "\u03C2",
  sigma: "\u03C3",
  tau: "\u03C4",
  upsilon: "\u03C5",
  phi: "\u03C6",
  chi: "\u03C7",
  psi: "\u03C8",
  omega: "\u03C9",
  thetasym: "\u03D1",
  upsih: "\u03D2",
  piv: "\u03D6",
  bull: "\u2022",
  hellip: "\u2026",
  prime: "\u2032",
  Prime: "\u2033",
  oline: "\u203E",
  frasl: "\u2044",
  weierp: "\u2118",
  image: "\u2111",
  real: "\u211C",
  trade: "\u2122",
  alefsym: "\u2135",
  larr: "\u2190",
  uarr: "\u2191",
  rarr: "\u2192",
  darr: "\u2193",
  harr: "\u2194",
  crarr: "\u21B5",
  lArr: "\u21D0",
  uArr: "\u21D1",
  rArr: "\u21D2",
  dArr: "\u21D3",
  hArr: "\u21D4",
  forall: "\u2200",
  part: "\u2202",
  exist: "\u2203",
  empty: "\u2205",
  nabla: "\u2207",
  isin: "\u2208",
  notin: "\u2209",
  ni: "\u220B",
  prod: "\u220F",
  sum: "\u2211",
  minus: "\u2212",
  lowast: "\u2217",
  radic: "\u221A",
  prop: "\u221D",
  infin: "\u221E",
  ang: "\u2220",
  and: "\u2227",
  or: "\u2228",
  cap: "\u2229",
  cup: "\u222A",
  int: "\u222B",
  there4: "\u2234",
  sim: "\u223C",
  cong: "\u2245",
  asymp: "\u2248",
  ne: "\u2260",
  equiv: "\u2261",
  le: "\u2264",
  ge: "\u2265",
  sub: "\u2282",
  sup: "\u2283",
  nsub: "\u2284",
  sube: "\u2286",
  supe: "\u2287",
  oplus: "\u2295",
  otimes: "\u2297",
  perp: "\u22A5",
  sdot: "\u22C5",
  lceil: "\u2308",
  rceil: "\u2309",
  lfloor: "\u230A",
  rfloor: "\u230B",
  lang: "\u2329",
  rang: "\u232A",
  loz: "\u25CA",
  spades: "\u2660",
  clubs: "\u2663",
  hearts: "\u2665",
  diams: "\u2666",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  OElig: "\u0152",
  oelig: "\u0153",
  Scaron: "\u0160",
  scaron: "\u0161",
  Yuml: "\u0178",
  circ: "\u02C6",
  tilde: "\u02DC",
  ensp: "\u2002",
  emsp: "\u2003",
  thinsp: "\u2009",
  zwnj: "\u200C",
  zwj: "\u200D",
  lrm: "\u200E",
  rlm: "\u200F",
  ndash: "\u2013",
  mdash: "\u2014",
  lsquo: "\u2018",
  rsquo: "\u2019",
  sbquo: "\u201A",
  ldquo: "\u201C",
  rdquo: "\u201D",
  bdquo: "\u201E",
  dagger: "\u2020",
  Dagger: "\u2021",
  permil: "\u2030",
  lsaquo: "\u2039",
  rsaquo: "\u203A",
  euro: "\u20AC"
};

// ../../node_modules/stringify-entities/lib/util/to-named.js
var own3 = {}.hasOwnProperty, characters = {}, key;
for (key in characterEntitiesHtml4)
  own3.call(characterEntitiesHtml4, key) && (characters[characterEntitiesHtml4[key]] = key);

// ../../node_modules/vfile-message/lib/index.js
var VFileMessage = class extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(causeOrReason, optionsOrParentOrPlace, origin) {
    super(), typeof optionsOrParentOrPlace == "string" && (origin = optionsOrParentOrPlace, optionsOrParentOrPlace = void 0);
    let reason = "", options = {}, legacyCause = !1;
    if (optionsOrParentOrPlace && ("line" in optionsOrParentOrPlace && "column" in optionsOrParentOrPlace ? options = { place: optionsOrParentOrPlace } : "start" in optionsOrParentOrPlace && "end" in optionsOrParentOrPlace ? options = { place: optionsOrParentOrPlace } : "type" in optionsOrParentOrPlace ? options = {
      ancestors: [optionsOrParentOrPlace],
      place: optionsOrParentOrPlace.position
    } : options = { ...optionsOrParentOrPlace }), typeof causeOrReason == "string" ? reason = causeOrReason : !options.cause && causeOrReason && (legacyCause = !0, reason = causeOrReason.message, options.cause = causeOrReason), !options.ruleId && !options.source && typeof origin == "string") {
      let index2 = origin.indexOf(":");
      index2 === -1 ? options.ruleId = origin : (options.source = origin.slice(0, index2), options.ruleId = origin.slice(index2 + 1));
    }
    if (!options.place && options.ancestors && options.ancestors) {
      let parent = options.ancestors[options.ancestors.length - 1];
      parent && (options.place = parent.position);
    }
    let start2 = options.place && "start" in options.place ? options.place.start : options.place;
    this.ancestors = options.ancestors || void 0, this.cause = options.cause || void 0, this.column = start2 ? start2.column : void 0, this.fatal = void 0, this.file = "", this.message = reason, this.line = start2 ? start2.line : void 0, this.name = stringifyPosition(options.place) || "1:1", this.place = options.place || void 0, this.reason = this.message, this.ruleId = options.ruleId || void 0, this.source = options.source || void 0, this.stack = legacyCause && options.cause && typeof options.cause.stack == "string" ? options.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
};
VFileMessage.prototype.file = "";
VFileMessage.prototype.name = "";
VFileMessage.prototype.reason = "";
VFileMessage.prototype.message = "";
VFileMessage.prototype.stack = "";
VFileMessage.prototype.column = void 0;
VFileMessage.prototype.line = void 0;
VFileMessage.prototype.ancestors = void 0;
VFileMessage.prototype.cause = void 0;
VFileMessage.prototype.fatal = void 0;
VFileMessage.prototype.place = void 0;
VFileMessage.prototype.ruleId = void 0;
VFileMessage.prototype.source = void 0;

// ../../node_modules/mdast-util-mdx-jsx/lib/index.js
function mdxJsxFromMarkdown() {
  return {
    canContainEols: ["mdxJsxTextElement"],
    enter: {
      mdxJsxFlowTag: enterMdxJsxTag,
      mdxJsxFlowTagClosingMarker: enterMdxJsxTagClosingMarker,
      mdxJsxFlowTagAttribute: enterMdxJsxTagAttribute,
      mdxJsxFlowTagExpressionAttribute: enterMdxJsxTagExpressionAttribute,
      mdxJsxFlowTagAttributeValueLiteral: buffer,
      mdxJsxFlowTagAttributeValueExpression: buffer,
      mdxJsxFlowTagSelfClosingMarker: enterMdxJsxTagSelfClosingMarker,
      mdxJsxTextTag: enterMdxJsxTag,
      mdxJsxTextTagClosingMarker: enterMdxJsxTagClosingMarker,
      mdxJsxTextTagAttribute: enterMdxJsxTagAttribute,
      mdxJsxTextTagExpressionAttribute: enterMdxJsxTagExpressionAttribute,
      mdxJsxTextTagAttributeValueLiteral: buffer,
      mdxJsxTextTagAttributeValueExpression: buffer,
      mdxJsxTextTagSelfClosingMarker: enterMdxJsxTagSelfClosingMarker
    },
    exit: {
      mdxJsxFlowTagClosingMarker: exitMdxJsxTagClosingMarker,
      mdxJsxFlowTagNamePrimary: exitMdxJsxTagNamePrimary,
      mdxJsxFlowTagNameMember: exitMdxJsxTagNameMember,
      mdxJsxFlowTagNameLocal: exitMdxJsxTagNameLocal,
      mdxJsxFlowTagExpressionAttribute: exitMdxJsxTagExpressionAttribute,
      mdxJsxFlowTagExpressionAttributeValue: data2,
      mdxJsxFlowTagAttributeNamePrimary: exitMdxJsxTagAttributeNamePrimary,
      mdxJsxFlowTagAttributeNameLocal: exitMdxJsxTagAttributeNameLocal,
      mdxJsxFlowTagAttributeValueLiteral: exitMdxJsxTagAttributeValueLiteral,
      mdxJsxFlowTagAttributeValueLiteralValue: data2,
      mdxJsxFlowTagAttributeValueExpression: exitMdxJsxTagAttributeValueExpression,
      mdxJsxFlowTagAttributeValueExpressionValue: data2,
      mdxJsxFlowTagSelfClosingMarker: exitMdxJsxTagSelfClosingMarker,
      mdxJsxFlowTag: exitMdxJsxTag,
      mdxJsxTextTagClosingMarker: exitMdxJsxTagClosingMarker,
      mdxJsxTextTagNamePrimary: exitMdxJsxTagNamePrimary,
      mdxJsxTextTagNameMember: exitMdxJsxTagNameMember,
      mdxJsxTextTagNameLocal: exitMdxJsxTagNameLocal,
      mdxJsxTextTagExpressionAttribute: exitMdxJsxTagExpressionAttribute,
      mdxJsxTextTagExpressionAttributeValue: data2,
      mdxJsxTextTagAttributeNamePrimary: exitMdxJsxTagAttributeNamePrimary,
      mdxJsxTextTagAttributeNameLocal: exitMdxJsxTagAttributeNameLocal,
      mdxJsxTextTagAttributeValueLiteral: exitMdxJsxTagAttributeValueLiteral,
      mdxJsxTextTagAttributeValueLiteralValue: data2,
      mdxJsxTextTagAttributeValueExpression: exitMdxJsxTagAttributeValueExpression,
      mdxJsxTextTagAttributeValueExpressionValue: data2,
      mdxJsxTextTagSelfClosingMarker: exitMdxJsxTagSelfClosingMarker,
      mdxJsxTextTag: exitMdxJsxTag
    }
  };
  function buffer() {
    this.buffer();
  }
  function point3(d) {
    return { line: d.line, column: d.column, offset: d.offset };
  }
  function data2(token) {
    this.config.enter.data.call(this, token), this.config.exit.data.call(this, token);
  }
  function enterMdxJsxTag(token) {
    let tag = {
      name: void 0,
      attributes: [],
      close: !1,
      selfClosing: !1,
      start: token.start,
      end: token.end
    };
    this.data.mdxJsxTagStack || (this.data.mdxJsxTagStack = []), this.data.mdxJsxTag = tag, this.buffer();
  }
  function enterMdxJsxTagClosingMarker(token) {
    let stack = this.data.mdxJsxTagStack;
    if (stack.length === 0)
      throw new VFileMessage(
        "Unexpected closing slash `/` in tag, expected an open tag first",
        { start: token.start, end: token.end },
        "mdast-util-mdx-jsx:unexpected-closing-slash"
      );
  }
  function enterMdxJsxTagAnyAttribute(token) {
    let tag = this.data.mdxJsxTag;
    if (tag.close)
      throw new VFileMessage(
        "Unexpected attribute in closing tag, expected the end of the tag",
        { start: token.start, end: token.end },
        "mdast-util-mdx-jsx:unexpected-attribute"
      );
  }
  function enterMdxJsxTagSelfClosingMarker(token) {
    let tag = this.data.mdxJsxTag;
    if (tag.close)
      throw new VFileMessage(
        "Unexpected self-closing slash `/` in closing tag, expected the end of the tag",
        { start: token.start, end: token.end },
        "mdast-util-mdx-jsx:unexpected-self-closing-slash"
      );
  }
  function exitMdxJsxTagClosingMarker() {
    let tag = this.data.mdxJsxTag;
    tag.close = !0;
  }
  function exitMdxJsxTagNamePrimary(token) {
    let tag = this.data.mdxJsxTag;
    tag.name = this.sliceSerialize(token);
  }
  function exitMdxJsxTagNameMember(token) {
    let tag = this.data.mdxJsxTag;
    tag.name += "." + this.sliceSerialize(token);
  }
  function exitMdxJsxTagNameLocal(token) {
    let tag = this.data.mdxJsxTag;
    tag.name += ":" + this.sliceSerialize(token);
  }
  function enterMdxJsxTagAttribute(token) {
    let tag = this.data.mdxJsxTag;
    enterMdxJsxTagAnyAttribute.call(this, token), tag.attributes.push({
      type: "mdxJsxAttribute",
      name: "",
      value: null,
      position: {
        start: point3(token.start),
        // @ts-expect-error: `end` will be patched later.
        end: void 0
      }
    });
  }
  function enterMdxJsxTagExpressionAttribute(token) {
    let tag = this.data.mdxJsxTag;
    enterMdxJsxTagAnyAttribute.call(this, token), tag.attributes.push({
      type: "mdxJsxExpressionAttribute",
      value: "",
      position: {
        start: point3(token.start),
        // @ts-expect-error: `end` will be patched later.
        end: void 0
      }
    }), this.buffer();
  }
  function exitMdxJsxTagExpressionAttribute(token) {
    let tag = this.data.mdxJsxTag;
    let tail = tag.attributes[tag.attributes.length - 1];
    tail.type;
    let estree = token.estree;
    tail.value = this.resume(), tail.position, tail.position.end = point3(token.end), estree && (tail.data = { estree });
  }
  function exitMdxJsxTagAttributeNamePrimary(token) {
    let tag = this.data.mdxJsxTag;
    let node2 = tag.attributes[tag.attributes.length - 1];
    node2.type, node2.name = this.sliceSerialize(token), node2.position, node2.position.end = point3(token.end);
  }
  function exitMdxJsxTagAttributeNameLocal(token) {
    let tag = this.data.mdxJsxTag;
    let node2 = tag.attributes[tag.attributes.length - 1];
    node2.type, node2.name += ":" + this.sliceSerialize(token), node2.position, node2.position.end = point3(token.end);
  }
  function exitMdxJsxTagAttributeValueLiteral(token) {
    let tag = this.data.mdxJsxTag;
    let node2 = tag.attributes[tag.attributes.length - 1];
    node2.value = parseEntities(this.resume(), { nonTerminated: !1 }), node2.position, node2.position.end = point3(token.end);
  }
  function exitMdxJsxTagAttributeValueExpression(token) {
    let tag = this.data.mdxJsxTag;
    let tail = tag.attributes[tag.attributes.length - 1];
    tail.type;
    let node2 = { type: "mdxJsxAttributeValueExpression", value: this.resume() }, estree = token.estree;
    estree && (node2.data = { estree }), tail.value = node2, tail.position, tail.position.end = point3(token.end);
  }
  function exitMdxJsxTagSelfClosingMarker() {
    let tag = this.data.mdxJsxTag;
    tag.selfClosing = !0;
  }
  function exitMdxJsxTag(token) {
    let tag = this.data.mdxJsxTag;
    let stack = this.data.mdxJsxTagStack;
    let tail = stack[stack.length - 1];
    if (tag.close && tail.name !== tag.name)
      throw new VFileMessage(
        "Unexpected closing tag `" + serializeAbbreviatedTag(tag) + "`, expected corresponding closing tag for `" + serializeAbbreviatedTag(tail) + "` (" + stringifyPosition(tail) + ")",
        { start: token.start, end: token.end },
        "mdast-util-mdx-jsx:end-tag-mismatch"
      );
    this.resume(), tag.close ? stack.pop() : this.enter(
      {
        type: token.type === "mdxJsxTextTag" ? "mdxJsxTextElement" : "mdxJsxFlowElement",
        name: tag.name || null,
        attributes: tag.attributes,
        children: []
      },
      token,
      onErrorRightIsTag
    ), tag.selfClosing || tag.close ? this.exit(token, onErrorLeftIsTag) : stack.push(tag);
  }
  function onErrorRightIsTag(closing, open3) {
    let stack = this.data.mdxJsxTagStack;
    let tag = stack[stack.length - 1];
    let place = closing ? " before the end of `" + closing.type + "`" : "", position2 = closing ? { start: closing.start, end: closing.end } : void 0;
    throw new VFileMessage(
      "Expected a closing tag for `" + serializeAbbreviatedTag(tag) + "` (" + stringifyPosition({ start: open3.start, end: open3.end }) + ")" + place,
      position2,
      "mdast-util-mdx-jsx:end-tag-mismatch"
    );
  }
  function onErrorLeftIsTag(a, b) {
    let tag = this.data.mdxJsxTag;
    throw new VFileMessage(
      "Expected the closing tag `" + serializeAbbreviatedTag(tag) + "` either after the end of `" + b.type + "` (" + stringifyPosition(b.end) + ") or another opening tag after the start of `" + b.type + "` (" + stringifyPosition(b.start) + ")",
      { start: a.start, end: a.end },
      "mdast-util-mdx-jsx:end-tag-mismatch"
    );
  }
  function serializeAbbreviatedTag(tag) {
    return "<" + (tag.close ? "/" : "") + (tag.name || "") + ">";
  }
}

// ../../node_modules/mdast-util-mdxjs-esm/lib/index.js
function mdxjsEsmFromMarkdown() {
  return {
    enter: { mdxjsEsm: enterMdxjsEsm },
    exit: { mdxjsEsm: exitMdxjsEsm, mdxjsEsmData: exitMdxjsEsmData }
  };
}
function enterMdxjsEsm(token) {
  this.enter({ type: "mdxjsEsm", value: "" }, token), this.buffer();
}
function exitMdxjsEsm(token) {
  let value = this.resume(), node2 = this.stack[this.stack.length - 1];
  node2.type, this.exit(token);
  let estree = token.estree;
  node2.value = value, estree && (node2.data = { estree });
}
function exitMdxjsEsmData(token) {
  this.config.enter.data.call(this, token), this.config.exit.data.call(this, token);
}

// ../../node_modules/mdast-util-mdx/lib/index.js
function mdxFromMarkdown() {
  return [
    mdxExpressionFromMarkdown(),
    mdxJsxFromMarkdown(),
    mdxjsEsmFromMarkdown()
  ];
}

// ../../node_modules/micromark-extension-mdxjs/index.js
init_acorn();
var import_acorn_jsx = __toESM(require_acorn_jsx(), 1);

// ../../node_modules/estree-util-visit/lib/color.node.js
function color(d) {
  return "\x1B[33m" + d + "\x1B[39m";
}

// ../../node_modules/estree-util-visit/lib/index.js
var own4 = {}.hasOwnProperty, CONTINUE = /* @__PURE__ */ Symbol("continue"), EXIT = /* @__PURE__ */ Symbol("exit"), SKIP = /* @__PURE__ */ Symbol("skip");
function visit(tree, visitor) {
  let enter, leave;
  typeof visitor == "function" ? enter = visitor : visitor && typeof visitor == "object" && (visitor.enter && (enter = visitor.enter), visitor.leave && (leave = visitor.leave)), build2(tree, void 0, void 0, [])();
  function build2(node2, key2, index2, parents) {
    return nodelike(node2) && (visit2.displayName = "node (" + color(node2.type) + ")"), visit2;
    function visit2() {
      let result = enter ? toResult(enter(node2, key2, index2, parents)) : [];
      if (result[0] === EXIT)
        return result;
      if (result[0] !== SKIP) {
        let cKey;
        for (cKey in node2)
          if (own4.call(node2, cKey) && node2[cKey] && typeof node2[cKey] == "object" && // @ts-expect-error: custom esast extension.
          cKey !== "data" && // @ts-expect-error: custom esast extension.
          cKey !== "position") {
            let grandparents = parents.concat(node2), value = node2[cKey];
            if (Array.isArray(value)) {
              let nodes = (
                /** @type {Array<unknown>} */
                value
              ), cIndex = 0;
              for (; cIndex > -1 && cIndex < nodes.length; ) {
                let subvalue = nodes[cIndex];
                if (nodelike(subvalue)) {
                  let subresult = build2(
                    subvalue,
                    cKey,
                    cIndex,
                    grandparents
                  )();
                  if (subresult[0] === EXIT) return subresult;
                  cIndex = typeof subresult[1] == "number" ? subresult[1] : cIndex + 1;
                } else
                  cIndex++;
              }
            } else if (nodelike(value)) {
              let subresult = build2(value, cKey, void 0, grandparents)();
              if (subresult[0] === EXIT) return subresult;
            }
          }
      }
      return leave ? toResult(leave(node2, key2, index2, parents)) : result;
    }
  }
}
function toResult(value) {
  return Array.isArray(value) ? value : typeof value == "number" ? [CONTINUE, value] : [value];
}
function nodelike(value) {
  return !!(value && typeof value == "object" && "type" in value && typeof value.type == "string" && value.type.length > 0);
}

// ../../node_modules/micromark-util-events-to-acorn/lib/index.js
function eventsToAcorn(events, options) {
  let prefix = options.prefix || "", suffix = options.suffix || "", acornOptions = Object.assign({}, options.acornOptions), comments = [], tokens = [], onComment = acornOptions.onComment, onToken = acornOptions.onToken, swallow = !1, estree, exception, acornConfig = Object.assign({}, acornOptions, {
    onComment: comments,
    preserveParens: !0
  });
  onToken && (acornConfig.onToken = tokens);
  let collection = collect(events, options.tokenTypes), source = collection.value, value = prefix + source + suffix, isEmptyExpression = options.expression && empty2(source);
  if (isEmptyExpression && !options.allowEmpty)
    throw new VFileMessage("Unexpected empty expression", {
      place: parseOffsetToUnistPoint(0),
      ruleId: "unexpected-empty-expression",
      source: "micromark-extension-mdx-expression"
    });
  try {
    estree = options.expression && !isEmptyExpression ? options.acorn.parseExpressionAt(value, 0, acornConfig) : options.acorn.parse(value, acornConfig);
  } catch (error_) {
    let error = (
      /** @type {AcornError} */
      error_
    ), point3 = parseOffsetToUnistPoint(error.pos);
    error.message = String(error.message).replace(/ \(\d+:\d+\)$/, ""), error.pos = point3.offset, error.loc = {
      line: point3.line,
      column: point3.column - 1
    }, exception = error, swallow = error.raisedAt >= prefix.length + source.length || // Broken comments are raised at their start, not their end.
    error.message === "Unterminated comment";
  }
  if (estree && options.expression && !isEmptyExpression)
    if (empty2(value.slice(estree.end, value.length - suffix.length)))
      estree = {
        type: "Program",
        start: 0,
        end: prefix.length + source.length,
        // @ts-expect-error: It’s good.
        body: [{
          type: "ExpressionStatement",
          expression: estree,
          start: 0,
          end: prefix.length + source.length
        }],
        sourceType: "module",
        comments: []
      };
    else {
      let point3 = parseOffsetToUnistPoint(estree.end), error = (
        /** @type {AcornError} */
        new Error("Unexpected content after expression")
      );
      error.pos = point3.offset, error.loc = {
        line: point3.line,
        column: point3.column - 1
      }, exception = error, estree = void 0;
    }
  if (estree) {
    if (estree.comments = comments, visit(estree, function(esnode, field, index2, parents) {
      let context = (
        /** @type {AcornNode | Array<AcornNode>} */
        parents[parents.length - 1]
      ), property = field;
      esnode.type === "ParenthesizedExpression" && context && property && (typeof index2 == "number" && (context = context[property], property = index2), context[property] = esnode.expression), fixPosition(esnode);
    }), Array.isArray(onComment))
      onComment.push(...comments);
    else if (typeof onComment == "function")
      for (let comment of comments)
        onComment(comment.type === "Block", comment.value, comment.start, comment.end, comment.loc.start, comment.loc.end);
    for (let token of tokens)
      token.end <= prefix.length || token.start - prefix.length >= source.length || (fixPosition(token), Array.isArray(onToken) ? onToken.push(token) : onToken(token));
  }
  return {
    estree,
    error: exception,
    swallow
  };
  function fixPosition(nodeOrToken) {
    let pointStart = parseOffsetToUnistPoint(nodeOrToken.start), pointEnd = parseOffsetToUnistPoint(nodeOrToken.end);
    nodeOrToken.start = pointStart.offset, nodeOrToken.end = pointEnd.offset, nodeOrToken.loc = {
      start: {
        line: pointStart.line,
        column: pointStart.column - 1,
        // @ts-expect-error: not allowed by acorn types.
        offset: pointStart.offset
      },
      end: {
        line: pointEnd.line,
        column: pointEnd.column - 1,
        // @ts-expect-error: not allowed by acorn types.
        offset: pointEnd.offset
      }
    }, nodeOrToken.range = [nodeOrToken.start, nodeOrToken.end];
  }
  function parseOffsetToUnistPoint(acornOffset) {
    let sourceOffset = acornOffset - prefix.length;
    sourceOffset < 0 ? sourceOffset = 0 : sourceOffset > source.length && (sourceOffset = source.length);
    let point3 = relativeToPoint(collection.stops, sourceOffset);
    return point3 || (point3 = {
      line: options.start.line,
      column: options.start.column,
      offset: options.start.offset
    }), point3;
  }
}
function empty2(value) {
  return /^\s*$/.test(value.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\r\n]*(\r\n|\n|\r)/g, ""));
}
function collect(events, tokenTypes) {
  let result = {
    value: "",
    stops: []
  }, index2 = -1;
  for (; ++index2 < events.length; ) {
    let event = events[index2];
    if (event[0] === "enter") {
      let type = event[1].type;
      if (type === "lineEnding" || tokenTypes.includes(type)) {
        let chunks = event[2].sliceStream(event[1]);
        for (; chunks.length > 0 && chunks[0] === -1; )
          chunks.shift();
        let value = serializeChunks2(chunks);
        result.stops.push([result.value.length, event[1].start]), result.value += value, result.stops.push([result.value.length, event[1].end]);
      }
    }
  }
  return result;
}
function relativeToPoint(stops, relative5) {
  let index2 = 0;
  for (; index2 < stops.length && stops[index2][0] <= relative5; )
    index2 += 1;
  if (index2 === 0)
    return;
  let [stopRelative, stopAbsolute] = stops[index2 - 1], rest = relative5 - stopRelative;
  return {
    line: stopAbsolute.line,
    column: stopAbsolute.column + rest,
    offset: stopAbsolute.offset + rest
  };
}
function serializeChunks2(chunks) {
  let index2 = -1, result = [], atTab;
  for (; ++index2 < chunks.length; ) {
    let chunk = chunks[index2], value;
    if (typeof chunk == "string")
      value = chunk;
    else switch (chunk) {
      case -5: {
        value = "\r";
        break;
      }
      case -4: {
        value = `
`;
        break;
      }
      case -3: {
        value = `\r
`;
        break;
      }
      case -2: {
        value = "	";
        break;
      }
      /* c8 ignore next 6 */
      case -1: {
        if (atTab) continue;
        value = " ";
        break;
      }
      default:
        value = String.fromCharCode(chunk);
    }
    atTab = chunk === -2, result.push(value);
  }
  return result.join("");
}

// ../../node_modules/unist-util-position-from-estree/lib/index.js
function positionFromEstree(node2) {
  let nodeLike = node2 || {}, loc = nodeLike.loc || {}, range = nodeLike.range || [void 0, void 0], start2 = pointOrUndefined(loc.start, range[0] || nodeLike.start), end = pointOrUndefined(loc.end, range[1] || nodeLike.end);
  if (start2 && end)
    return { start: start2, end };
}
function pointOrUndefined(estreePoint, estreeOffset) {
  if (estreePoint && typeof estreePoint == "object") {
    let line = "line" in estreePoint ? numberOrUndefined(estreePoint.line) : void 0, column = "column" in estreePoint ? numberOrUndefined(estreePoint.column) : void 0;
    if (line && column !== void 0)
      return {
        line,
        column: column + 1,
        offset: numberOrUndefined(estreeOffset)
      };
  }
}
function numberOrUndefined(value) {
  return typeof value == "number" && value > -1 ? value : void 0;
}

// ../../node_modules/micromark-factory-mdx-expression/index.js
var indentSize = 2, trouble = "https://github.com/micromark/micromark-extension-mdx-expression/tree/main/packages/micromark-extension-mdx-expression", unexpectedEndOfFileHash = "#unexpected-end-of-file-in-expression-expected-a-corresponding-closing-brace-for-", unexpectedLazyHash = "#unexpected-lazy-line-in-expression-in-container-expected-line-to-be-prefixed", nonSpreadHash = "#unexpected-type-in-code-expected-an-object-spread-spread", spreadExtraHash = "#unexpected-extra-content-in-spread-only-a-single-spread-is-supported", acornHash = "#could-not-parse-expression-with-acorn";
function factoryMdxExpression(effects, ok2, type, markerType, chunkType, acorn, acornOptions, addResult, spread, allowEmpty, allowLazy) {
  let self2 = this, eventStart = this.events.length + 3, size = 0, pointStart, lastCrash;
  return start2;
  function start2(code) {
    return effects.enter(type), effects.enter(markerType), effects.consume(code), effects.exit(markerType), pointStart = self2.now(), before;
  }
  function before(code) {
    if (code === null) {
      if (lastCrash) throw lastCrash;
      let error = new VFileMessage("Unexpected end of file in expression, expected a corresponding closing brace for `{`", {
        place: self2.now(),
        ruleId: "unexpected-eof",
        source: "micromark-extension-mdx-expression"
      });
      throw error.url = trouble + unexpectedEndOfFileHash, error;
    }
    if (markdownLineEnding(code))
      return effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), eolAfter;
    if (code === 125 && size === 0) {
      let next = acorn ? mdxExpressionParse.call(self2, acorn, acornOptions, chunkType, eventStart, pointStart, allowEmpty || !1, spread || !1) : {
        type: "ok",
        estree: void 0
      };
      if (next.type === "ok") {
        effects.enter(markerType), effects.consume(code), effects.exit(markerType);
        let token = effects.exit(type);
        return addResult && next.estree && Object.assign(token, {
          estree: next.estree
        }), ok2;
      }
      return lastCrash = next.message, effects.enter(chunkType), effects.consume(code), inside;
    }
    return effects.enter(chunkType), inside(code);
  }
  function inside(code) {
    return code === 125 && size === 0 || code === null || markdownLineEnding(code) ? (effects.exit(chunkType), before(code)) : (code === 123 && !acorn ? size += 1 : code === 125 && (size -= 1), effects.consume(code), inside);
  }
  function eolAfter(code) {
    let now = self2.now();
    if (now.line !== pointStart.line && !allowLazy && self2.parser.lazy[now.line]) {
      let error = new VFileMessage("Unexpected lazy line in expression in container, expected line to be prefixed with `>` when in a block quote, whitespace when in a list, etc", {
        place: self2.now(),
        ruleId: "unexpected-lazy",
        source: "micromark-extension-mdx-expression"
      });
      throw error.url = trouble + unexpectedLazyHash, error;
    }
    return markdownSpace(code) ? factorySpace(effects, before, "linePrefix", indentSize + 1)(code) : before(code);
  }
}
function mdxExpressionParse(acorn, acornOptions, chunkType, eventStart, pointStart, allowEmpty, spread) {
  let result = eventsToAcorn(this.events.slice(eventStart), {
    acorn,
    tokenTypes: [chunkType],
    acornOptions,
    start: pointStart,
    expression: !0,
    allowEmpty,
    prefix: spread ? "({" : "",
    suffix: spread ? "})" : ""
  }), estree = result.estree;
  if (spread && estree) {
    let head = estree.body[0];
    if (head.type !== "ExpressionStatement" || head.expression.type !== "ObjectExpression") {
      let place = positionFromEstree(head), error = new VFileMessage("Unexpected `" + head.type + "` in code: expected an object spread (`{...spread}`)", {
        place: place.start,
        ruleId: "non-spread",
        source: "micromark-extension-mdx-expression"
      });
      throw error.url = trouble + nonSpreadHash, error;
    }
    if (head.expression.properties[1]) {
      let place = positionFromEstree(head.expression.properties[1]), error = new VFileMessage("Unexpected extra content in spread: only a single spread is supported", {
        place: place.start,
        ruleId: "spread-extra",
        source: "micromark-extension-mdx-expression"
      });
      throw error.url = trouble + spreadExtraHash, error;
    }
    if (head.expression.properties[0] && head.expression.properties[0].type !== "SpreadElement") {
      let place = positionFromEstree(head.expression.properties[0]), error = new VFileMessage("Unexpected `" + head.expression.properties[0].type + "` in code: only spread elements are supported", {
        place: place.start,
        ruleId: "non-spread",
        source: "micromark-extension-mdx-expression"
      });
      throw error.url = trouble + nonSpreadHash, error;
    }
  }
  if (result.error) {
    let error = new VFileMessage("Could not parse expression with acorn", {
      cause: result.error,
      place: {
        line: result.error.loc.line,
        column: result.error.loc.column + 1,
        offset: result.error.pos
      },
      ruleId: "acorn",
      source: "micromark-extension-mdx-expression"
    });
    return error.url = trouble + acornHash, {
      type: "nok",
      message: error
    };
  }
  return {
    type: "ok",
    estree
  };
}

// ../../node_modules/micromark-extension-mdx-expression/lib/syntax.js
function mdxExpression(options) {
  let options_ = options || {}, addResult = options_.addResult, acorn = options_.acorn, spread = options_.spread, allowEmpty = options_.allowEmpty, acornOptions;
  if (allowEmpty == null && (allowEmpty = !0), acorn) {
    if (!acorn.parseExpressionAt)
      throw new Error("Expected a proper `acorn` instance passed in as `options.acorn`");
    acornOptions = Object.assign({
      ecmaVersion: 2024,
      sourceType: "module"
    }, options_.acornOptions);
  } else if (options_.acornOptions || options_.addResult)
    throw new Error("Expected an `acorn` instance passed in as `options.acorn`");
  return {
    flow: {
      123: {
        name: "mdxFlowExpression",
        tokenize: tokenizeFlowExpression,
        concrete: !0
      }
    },
    text: {
      123: {
        name: "mdxTextExpression",
        tokenize: tokenizeTextExpression
      }
    }
  };
  function tokenizeFlowExpression(effects, ok2, nok) {
    let self2 = this;
    return start2;
    function start2(code) {
      return before(code);
    }
    function before(code) {
      return factoryMdxExpression.call(self2, effects, after, "mdxFlowExpression", "mdxFlowExpressionMarker", "mdxFlowExpressionChunk", acorn, acornOptions, addResult, spread, allowEmpty)(code);
    }
    function after(code) {
      return markdownSpace(code) ? factorySpace(effects, end, "whitespace")(code) : end(code);
    }
    function end(code) {
      let lessThanValue = self2.parser.constructs.flow[60], jsxTag = (Array.isArray(lessThanValue) ? lessThanValue : (
        /* c8 ignore next 3 -- always a list when normalized. */
        lessThanValue ? [lessThanValue] : []
      )).find(function(d) {
        return d.name === "mdxJsxFlowTag";
      });
      return code === 60 && jsxTag ? effects.attempt(jsxTag, end, nok)(code) : code === null || markdownLineEnding(code) ? ok2(code) : nok(code);
    }
  }
  function tokenizeTextExpression(effects, ok2) {
    let self2 = this;
    return start2;
    function start2(code) {
      return factoryMdxExpression.call(self2, effects, ok2, "mdxTextExpression", "mdxTextExpressionMarker", "mdxTextExpressionChunk", acorn, acornOptions, addResult, spread, allowEmpty, !0)(code);
    }
  }
}

// ../../node_modules/estree-util-is-identifier-name/lib/index.js
var startRe = /[$_\p{ID_Start}]/u, contRe = /[$_\u{200C}\u{200D}\p{ID_Continue}]/u, contReJsx = /[-$_\u{200C}\u{200D}\p{ID_Continue}]/u;
var emptyOptions2 = {};
function start(code) {
  return code ? startRe.test(String.fromCodePoint(code)) : !1;
}
function cont(code, options) {
  let re = (options || emptyOptions2).jsx ? contReJsx : contRe;
  return code ? re.test(String.fromCodePoint(code)) : !1;
}

// ../../node_modules/micromark-extension-mdx-jsx/lib/factory-tag.js
var trouble2 = "https://github.com/micromark/micromark-extension-mdx-jsx";
function factoryTag(effects, ok2, nok, acorn, acornOptions, addResult, allowLazy, tagType, tagMarkerType, tagClosingMarkerType, tagSelfClosingMarker, tagNameType, tagNamePrimaryType, tagNameMemberMarkerType, tagNameMemberType, tagNamePrefixMarkerType, tagNameLocalType, tagExpressionAttributeType, tagExpressionAttributeMarkerType, tagExpressionAttributeValueType, tagAttributeType, tagAttributeNameType, tagAttributeNamePrimaryType, tagAttributeNamePrefixMarkerType, tagAttributeNameLocalType, tagAttributeInitializerMarkerType, tagAttributeValueLiteralType, tagAttributeValueLiteralMarkerType, tagAttributeValueLiteralValueType, tagAttributeValueExpressionType, tagAttributeValueExpressionMarkerType, tagAttributeValueExpressionValueType) {
  let self2 = this, returnState, marker;
  return start2;
  function start2(code) {
    return effects.enter(tagType), effects.enter(tagMarkerType), effects.consume(code), effects.exit(tagMarkerType), startAfter;
  }
  function startAfter(code) {
    return markdownLineEndingOrSpace(code) ? nok(code) : (returnState = nameBefore, esWhitespaceStart(code));
  }
  function nameBefore(code) {
    if (code === 47)
      return effects.enter(tagClosingMarkerType), effects.consume(code), effects.exit(tagClosingMarkerType), returnState = closingTagNameBefore, esWhitespaceStart;
    if (code === 62)
      return tagEnd(code);
    if (code !== null && code >= 0 && start(code))
      return effects.enter(tagNameType), effects.enter(tagNamePrimaryType), effects.consume(code), primaryName;
    crash(code, "before name", "a character that can start a name, such as a letter, `$`, or `_`" + (code === 33 ? " (note: to create a comment in MDX, use `{/* text */}`)" : ""));
  }
  function closingTagNameBefore(code) {
    if (code === 62)
      return tagEnd(code);
    if (code !== null && code >= 0 && start(code))
      return effects.enter(tagNameType), effects.enter(tagNamePrimaryType), effects.consume(code), primaryName;
    crash(code, "before name", "a character that can start a name, such as a letter, `$`, or `_`" + (code === 42 || code === 47 ? " (note: JS comments in JSX tags are not supported in MDX)" : ""));
  }
  function primaryName(code) {
    if (code !== null && code >= 0 && cont(code, {
      jsx: !0
    }))
      return effects.consume(code), primaryName;
    if (code === 46 || code === 47 || code === 58 || code === 62 || code === 123 || markdownLineEndingOrSpace(code) || unicodeWhitespace(code))
      return effects.exit(tagNamePrimaryType), returnState = primaryNameAfter, esWhitespaceStart(code);
    crash(code, "in name", "a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag" + (code === 64 ? " (note: to create a link in MDX, use `[text](url)`)" : ""));
  }
  function primaryNameAfter(code) {
    if (code === 46)
      return effects.enter(tagNameMemberMarkerType), effects.consume(code), effects.exit(tagNameMemberMarkerType), returnState = memberNameBefore, esWhitespaceStart;
    if (code === 58)
      return effects.enter(tagNamePrefixMarkerType), effects.consume(code), effects.exit(tagNamePrefixMarkerType), returnState = localNameBefore, esWhitespaceStart;
    if (code === 47 || code === 62 || code === 123 || code !== null && code >= 0 && start(code))
      return effects.exit(tagNameType), attributeBefore(code);
    crash(code, "after name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function memberNameBefore(code) {
    if (code !== null && code >= 0 && start(code))
      return effects.enter(tagNameMemberType), effects.consume(code), memberName;
    crash(code, "before member name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function memberName(code) {
    if (code !== null && code >= 0 && cont(code, {
      jsx: !0
    }))
      return effects.consume(code), memberName;
    if (code === 46 || code === 47 || code === 62 || code === 123 || markdownLineEndingOrSpace(code) || unicodeWhitespace(code))
      return effects.exit(tagNameMemberType), returnState = memberNameAfter, esWhitespaceStart(code);
    crash(code, "in member name", "a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag" + (code === 64 ? " (note: to create a link in MDX, use `[text](url)`)" : ""));
  }
  function memberNameAfter(code) {
    if (code === 46)
      return effects.enter(tagNameMemberMarkerType), effects.consume(code), effects.exit(tagNameMemberMarkerType), returnState = memberNameBefore, esWhitespaceStart;
    if (code === 47 || code === 62 || code === 123 || code !== null && code >= 0 && start(code))
      return effects.exit(tagNameType), attributeBefore(code);
    crash(code, "after member name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function localNameBefore(code) {
    if (code !== null && code >= 0 && start(code))
      return effects.enter(tagNameLocalType), effects.consume(code), localName;
    crash(code, "before local name", "a character that can start a name, such as a letter, `$`, or `_`" + (code === 43 || code !== null && code > 46 && code < 58 ? " (note: to create a link in MDX, use `[text](url)`)" : ""));
  }
  function localName(code) {
    if (code !== null && code >= 0 && cont(code, {
      jsx: !0
    }))
      return effects.consume(code), localName;
    if (code === 47 || code === 62 || code === 123 || markdownLineEndingOrSpace(code) || unicodeWhitespace(code))
      return effects.exit(tagNameLocalType), returnState = localNameAfter, esWhitespaceStart(code);
    crash(code, "in local name", "a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function localNameAfter(code) {
    if (code === 47 || code === 62 || code === 123 || code !== null && code >= 0 && start(code))
      return effects.exit(tagNameType), attributeBefore(code);
    crash(code, "after local name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function attributeBefore(code) {
    if (code === 47)
      return effects.enter(tagSelfClosingMarker), effects.consume(code), effects.exit(tagSelfClosingMarker), returnState = selfClosing, esWhitespaceStart;
    if (code === 62)
      return tagEnd(code);
    if (code === 123)
      return factoryMdxExpression.call(self2, effects, attributeExpressionAfter, tagExpressionAttributeType, tagExpressionAttributeMarkerType, tagExpressionAttributeValueType, acorn, acornOptions, addResult, !0, !1, allowLazy)(code);
    if (code !== null && code >= 0 && start(code))
      return effects.enter(tagAttributeType), effects.enter(tagAttributeNameType), effects.enter(tagAttributeNamePrimaryType), effects.consume(code), attributePrimaryName;
    crash(code, "before attribute name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function attributeExpressionAfter(code) {
    return returnState = attributeBefore, esWhitespaceStart(code);
  }
  function attributePrimaryName(code) {
    if (code !== null && code >= 0 && cont(code, {
      jsx: !0
    }))
      return effects.consume(code), attributePrimaryName;
    if (code === 47 || code === 58 || code === 61 || code === 62 || code === 123 || markdownLineEndingOrSpace(code) || unicodeWhitespace(code))
      return effects.exit(tagAttributeNamePrimaryType), returnState = attributePrimaryNameAfter, esWhitespaceStart(code);
    crash(code, "in attribute name", "an attribute name character such as letters, digits, `$`, or `_`; `=` to initialize a value; whitespace before attributes; or the end of the tag");
  }
  function attributePrimaryNameAfter(code) {
    if (code === 58)
      return effects.enter(tagAttributeNamePrefixMarkerType), effects.consume(code), effects.exit(tagAttributeNamePrefixMarkerType), returnState = attributeLocalNameBefore, esWhitespaceStart;
    if (code === 61)
      return effects.exit(tagAttributeNameType), effects.enter(tagAttributeInitializerMarkerType), effects.consume(code), effects.exit(tagAttributeInitializerMarkerType), returnState = attributeValueBefore, esWhitespaceStart;
    if (code === 47 || code === 62 || code === 123 || markdownLineEndingOrSpace(code) || unicodeWhitespace(code) || code !== null && code >= 0 && start(code))
      return effects.exit(tagAttributeNameType), effects.exit(tagAttributeType), returnState = attributeBefore, esWhitespaceStart(code);
    crash(code, "after attribute name", "a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag");
  }
  function attributeLocalNameBefore(code) {
    if (code !== null && code >= 0 && start(code))
      return effects.enter(tagAttributeNameLocalType), effects.consume(code), attributeLocalName;
    crash(code, "before local attribute name", "a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag");
  }
  function attributeLocalName(code) {
    if (code !== null && code >= 0 && cont(code, {
      jsx: !0
    }))
      return effects.consume(code), attributeLocalName;
    if (code === 47 || code === 61 || code === 62 || code === 123 || markdownLineEndingOrSpace(code) || unicodeWhitespace(code))
      return effects.exit(tagAttributeNameLocalType), effects.exit(tagAttributeNameType), returnState = attributeLocalNameAfter, esWhitespaceStart(code);
    crash(code, "in local attribute name", "an attribute name character such as letters, digits, `$`, or `_`; `=` to initialize a value; whitespace before attributes; or the end of the tag");
  }
  function attributeLocalNameAfter(code) {
    if (code === 61)
      return effects.enter(tagAttributeInitializerMarkerType), effects.consume(code), effects.exit(tagAttributeInitializerMarkerType), returnState = attributeValueBefore, esWhitespaceStart;
    if (code === 47 || code === 62 || code === 123 || code !== null && code >= 0 && start(code))
      return effects.exit(tagAttributeType), attributeBefore(code);
    crash(code, "after local attribute name", "a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag");
  }
  function attributeValueBefore(code) {
    if (code === 34 || code === 39)
      return effects.enter(tagAttributeValueLiteralType), effects.enter(tagAttributeValueLiteralMarkerType), effects.consume(code), effects.exit(tagAttributeValueLiteralMarkerType), marker = code, attributeValueQuotedStart;
    if (code === 123)
      return factoryMdxExpression.call(self2, effects, attributeValueExpressionAfter, tagAttributeValueExpressionType, tagAttributeValueExpressionMarkerType, tagAttributeValueExpressionValueType, acorn, acornOptions, addResult, !1, !1, allowLazy)(code);
    crash(code, "before attribute value", "a character that can start an attribute value, such as `\"`, `'`, or `{`" + (code === 60 ? " (note: to use an element or fragment as a prop value in MDX, use `{<element />}`)" : ""));
  }
  function attributeValueExpressionAfter(code) {
    return effects.exit(tagAttributeType), returnState = attributeBefore, esWhitespaceStart(code);
  }
  function attributeValueQuotedStart(code) {
    return code === null && crash(code, "in attribute value", "a corresponding closing quote `" + String.fromCodePoint(marker) + "`"), code === marker ? (effects.enter(tagAttributeValueLiteralMarkerType), effects.consume(code), effects.exit(tagAttributeValueLiteralMarkerType), effects.exit(tagAttributeValueLiteralType), effects.exit(tagAttributeType), marker = void 0, returnState = attributeBefore, esWhitespaceStart) : markdownLineEnding(code) ? (returnState = attributeValueQuotedStart, esWhitespaceStart(code)) : (effects.enter(tagAttributeValueLiteralValueType), attributeValueQuoted(code));
  }
  function attributeValueQuoted(code) {
    return code === null || code === marker || markdownLineEnding(code) ? (effects.exit(tagAttributeValueLiteralValueType), attributeValueQuotedStart(code)) : (effects.consume(code), attributeValueQuoted);
  }
  function selfClosing(code) {
    if (code === 62)
      return tagEnd(code);
    crash(code, "after self-closing slash", "`>` to end the tag" + (code === 42 || code === 47 ? " (note: JS comments in JSX tags are not supported in MDX)" : ""));
  }
  function tagEnd(code) {
    return effects.enter(tagMarkerType), effects.consume(code), effects.exit(tagMarkerType), effects.exit(tagType), ok2;
  }
  function esWhitespaceStart(code) {
    return markdownLineEnding(code) ? (effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), esWhitespaceEolAfter) : markdownSpace(code) || unicodeWhitespace(code) ? (effects.enter("esWhitespace"), esWhitespaceInside(code)) : returnState(code);
  }
  function esWhitespaceInside(code) {
    return markdownLineEnding(code) ? (effects.exit("esWhitespace"), esWhitespaceStart(code)) : markdownSpace(code) || unicodeWhitespace(code) ? (effects.consume(code), esWhitespaceInside) : (effects.exit("esWhitespace"), returnState(code));
  }
  function esWhitespaceEolAfter(code) {
    if (!allowLazy && self2.parser.lazy[self2.now().line]) {
      let error = new VFileMessage("Unexpected lazy line in container, expected line to be prefixed with `>` when in a block quote, whitespace when in a list, etc", self2.now(), "micromark-extension-mdx-jsx:unexpected-lazy");
      throw error.url = trouble2 + "#unexpected-lazy-line-in-container-expected-line-to-be", error;
    }
    return esWhitespaceStart(code);
  }
  function crash(code, at2, expect) {
    let error = new VFileMessage("Unexpected " + (code === null ? "end of file" : "character `" + (code === 96 ? "` ` `" : String.fromCodePoint(code)) + "` (" + serializeCharCode(code) + ")") + " " + at2 + ", expected " + expect, self2.now(), "micromark-extension-mdx-jsx:unexpected-" + (code === null ? "eof" : "character"));
    throw error.url = trouble2 + (code === null ? "#unexpected-end-of-file-at-expected-expect" : "#unexpected-character-at-expected-expect"), error;
  }
}
function serializeCharCode(code) {
  return "U+" + code.toString(16).toUpperCase().padStart(4, "0");
}

// ../../node_modules/micromark-extension-mdx-jsx/lib/jsx-text.js
function jsxText(acorn, options) {
  return {
    name: "mdxJsxTextTag",
    tokenize: tokenizeJsxText
  };
  function tokenizeJsxText(effects, ok2, nok) {
    return factoryTag.call(this, effects, ok2, nok, acorn, options.acornOptions, options.addResult, !0, "mdxJsxTextTag", "mdxJsxTextTagMarker", "mdxJsxTextTagClosingMarker", "mdxJsxTextTagSelfClosingMarker", "mdxJsxTextTagName", "mdxJsxTextTagNamePrimary", "mdxJsxTextTagNameMemberMarker", "mdxJsxTextTagNameMember", "mdxJsxTextTagNamePrefixMarker", "mdxJsxTextTagNameLocal", "mdxJsxTextTagExpressionAttribute", "mdxJsxTextTagExpressionAttributeMarker", "mdxJsxTextTagExpressionAttributeValue", "mdxJsxTextTagAttribute", "mdxJsxTextTagAttributeName", "mdxJsxTextTagAttributeNamePrimary", "mdxJsxTextTagAttributeNamePrefixMarker", "mdxJsxTextTagAttributeNameLocal", "mdxJsxTextTagAttributeInitializerMarker", "mdxJsxTextTagAttributeValueLiteral", "mdxJsxTextTagAttributeValueLiteralMarker", "mdxJsxTextTagAttributeValueLiteralValue", "mdxJsxTextTagAttributeValueExpression", "mdxJsxTextTagAttributeValueExpressionMarker", "mdxJsxTextTagAttributeValueExpressionValue");
  }
}

// ../../node_modules/micromark-extension-mdx-jsx/lib/jsx-flow.js
function jsxFlow(acorn, options) {
  return {
    concrete: !0,
    name: "mdxJsxFlowTag",
    tokenize: tokenizeJsxFlow
  };
  function tokenizeJsxFlow(effects, ok2, nok) {
    let self2 = this;
    return start2;
    function start2(code) {
      return before(code);
    }
    function before(code) {
      return factoryTag.call(self2, effects, after, nok, acorn, options.acornOptions, options.addResult, !1, "mdxJsxFlowTag", "mdxJsxFlowTagMarker", "mdxJsxFlowTagClosingMarker", "mdxJsxFlowTagSelfClosingMarker", "mdxJsxFlowTagName", "mdxJsxFlowTagNamePrimary", "mdxJsxFlowTagNameMemberMarker", "mdxJsxFlowTagNameMember", "mdxJsxFlowTagNamePrefixMarker", "mdxJsxFlowTagNameLocal", "mdxJsxFlowTagExpressionAttribute", "mdxJsxFlowTagExpressionAttributeMarker", "mdxJsxFlowTagExpressionAttributeValue", "mdxJsxFlowTagAttribute", "mdxJsxFlowTagAttributeName", "mdxJsxFlowTagAttributeNamePrimary", "mdxJsxFlowTagAttributeNamePrefixMarker", "mdxJsxFlowTagAttributeNameLocal", "mdxJsxFlowTagAttributeInitializerMarker", "mdxJsxFlowTagAttributeValueLiteral", "mdxJsxFlowTagAttributeValueLiteralMarker", "mdxJsxFlowTagAttributeValueLiteralValue", "mdxJsxFlowTagAttributeValueExpression", "mdxJsxFlowTagAttributeValueExpressionMarker", "mdxJsxFlowTagAttributeValueExpressionValue")(code);
    }
    function after(code) {
      return markdownSpace(code) ? factorySpace(effects, end, "whitespace")(code) : end(code);
    }
    function end(code) {
      let leftBraceValue = self2.parser.constructs.flow[123], constructs2 = Array.isArray(leftBraceValue) ? leftBraceValue : leftBraceValue ? [leftBraceValue] : [], expression;
      for (let construct of constructs2)
        if (construct.name === "mdxFlowExpression") {
          expression = construct;
          break;
        }
      return code === 60 ? (
        // We can’t just say: fine. Lines of blocks have to be parsed until an eol/eof.
        start2(code)
      ) : code === 123 && expression ? effects.attempt(expression, end, nok)(code) : code === null || markdownLineEnding(code) ? ok2(code) : nok(code);
    }
  }
}

// ../../node_modules/micromark-extension-mdx-jsx/lib/syntax.js
function mdxJsx(options) {
  let settings = options || {}, acorn = settings.acorn, acornOptions;
  if (acorn) {
    if (!acorn.parse || !acorn.parseExpressionAt)
      throw new Error("Expected a proper `acorn` instance passed in as `options.acorn`");
    acornOptions = Object.assign({
      ecmaVersion: 2024,
      sourceType: "module"
    }, settings.acornOptions, {
      locations: !0
    });
  } else if (settings.acornOptions || settings.addResult)
    throw new Error("Expected an `acorn` instance passed in as `options.acorn`");
  return {
    flow: {
      60: jsxFlow(acorn || void 0, {
        acornOptions,
        addResult: settings.addResult || void 0
      })
    },
    text: {
      60: jsxText(acorn || void 0, {
        acornOptions,
        addResult: settings.addResult || void 0
      })
    }
  };
}

// ../../node_modules/micromark-extension-mdx-md/index.js
function mdxMd() {
  return {
    disable: { null: ["autolink", "codeIndented", "htmlFlow", "htmlText"] }
  };
}

// ../../node_modules/micromark-extension-mdxjs-esm/lib/syntax.js
var blankLineBefore2 = {
  tokenize: tokenizeNextBlank,
  partial: !0
}, trouble3 = "https://github.com/micromark/micromark-extension-mdxjs-esm", allowedAcornTypes = /* @__PURE__ */ new Set(["ExportAllDeclaration", "ExportDefaultDeclaration", "ExportNamedDeclaration", "ImportDeclaration"]);
function mdxjsEsm(options) {
  let exportImportConstruct = {
    tokenize: tokenizeExportImport,
    concrete: !0
  };
  if (!options || !options.acorn || !options.acorn.parse)
    throw new Error("Expected an `acorn` instance passed in as `options.acorn`");
  let acorn = options.acorn, acornOptions = Object.assign({
    ecmaVersion: 2024,
    sourceType: "module"
  }, options.acornOptions, {
    locations: !0
  });
  return {
    flow: {
      101: exportImportConstruct,
      105: exportImportConstruct
    }
  };
  function tokenizeExportImport(effects, ok2, nok) {
    let self2 = this, definedModuleSpecifiers = self2.parser.definedModuleSpecifiers || (self2.parser.definedModuleSpecifiers = []), eventStart = this.events.length + 1, buffer = "";
    return self2.interrupt ? nok : start2;
    function start2(code) {
      return self2.now().column > 1 ? nok(code) : (effects.enter("mdxjsEsm"), effects.enter("mdxjsEsmData"), effects.consume(code), buffer += String.fromCharCode(code), word);
    }
    function word(code) {
      return asciiAlpha(code) ? (effects.consume(code), buffer += String.fromCharCode(code), word) : (buffer === "import" || buffer === "export") && code === 32 ? (effects.consume(code), inside) : nok(code);
    }
    function inside(code) {
      return code === null || markdownLineEnding(code) ? (effects.exit("mdxjsEsmData"), lineStart(code)) : (effects.consume(code), inside);
    }
    function lineStart(code) {
      return code === null ? atEnd(code) : markdownLineEnding(code) ? effects.check(blankLineBefore2, atEnd, continuationStart)(code) : (effects.enter("mdxjsEsmData"), inside(code));
    }
    function continuationStart(code) {
      return effects.enter("lineEnding"), effects.consume(code), effects.exit("lineEnding"), lineStart;
    }
    function atEnd(code) {
      let result = eventsToAcorn(self2.events.slice(eventStart), {
        acorn,
        acornOptions,
        tokenTypes: ["mdxjsEsmData"],
        prefix: definedModuleSpecifiers.length > 0 ? "var " + definedModuleSpecifiers.join(",") + `
` : ""
      });
      if (result.error) {
        if (code !== null && result.swallow)
          return continuationStart(code);
        let error = new VFileMessage("Could not parse import/exports with acorn", {
          cause: result.error,
          place: {
            line: result.error.loc.line,
            column: result.error.loc.column + 1,
            offset: result.error.pos
          },
          ruleId: "acorn",
          source: "micromark-extension-mdxjs-esm"
        });
        throw error.url = trouble3 + "#could-not-parse-importexports-with-acorn", error;
      }
      if (definedModuleSpecifiers.length > 0) {
        let declaration = result.estree.body.shift();
      }
      let index2 = -1;
      for (; ++index2 < result.estree.body.length; ) {
        let node2 = result.estree.body[index2];
        if (!allowedAcornTypes.has(node2.type)) {
          let error = new VFileMessage("Unexpected `" + node2.type + "` in code: only import/exports are supported", {
            place: positionFromEstree(node2),
            ruleId: "non-esm",
            source: "micromark-extension-mdxjs-esm"
          });
          throw error.url = trouble3 + "#unexpected-type-in-code-only-importexports-are-supported", error;
        }
        if (node2.type === "ImportDeclaration" && !self2.interrupt) {
          let index3 = -1;
          for (; ++index3 < node2.specifiers.length; ) {
            let specifier = node2.specifiers[index3];
            definedModuleSpecifiers.push(specifier.local.name);
          }
        }
      }
      return Object.assign(effects.exit("mdxjsEsm"), options.addResult ? {
        estree: result.estree
      } : void 0), ok2(code);
    }
  }
}
function tokenizeNextBlank(effects, ok2, nok) {
  return start2;
  function start2(code) {
    return effects.enter("lineEndingBlank"), effects.consume(code), effects.exit("lineEndingBlank"), effects.attempt(blankLine, ok2, nok);
  }
}

// ../../node_modules/micromark-extension-mdxjs/index.js
function mdxjs(options) {
  let settings = Object.assign(
    {
      acorn: Parser.extend((0, import_acorn_jsx.default)()),
      acornOptions: { ecmaVersion: 2024, sourceType: "module" },
      addResult: !0
    },
    options
  );
  return combineExtensions([
    mdxjsEsm(settings),
    mdxExpression(settings),
    mdxJsx(settings),
    mdxMd()
  ]);
}

// src/core-server/utils/analyze-mdx.ts
var mdxSyntaxOptions = {
  acorn: Parser.extend((0, import_acorn_jsx2.default)()),
  acornOptions: { ecmaVersion: 2024, sourceType: "module" },
  addResult: !0
}, parseMdx = (code) => fromMarkdown(code, {
  extensions: [mdxjs(mdxSyntaxOptions)],
  mdastExtensions: [mdxFromMarkdown()]
}), createEmptyMdxMetadata = () => ({
  title: void 0,
  of: void 0,
  name: void 0,
  id: void 0,
  summary: void 0,
  isTemplate: !1,
  metaTags: void 0
}), isMdxJsxAttribute = (node2) => node2.type === "mdxJsxAttribute", isMetaElement = (node2) => node2.type === "mdxJsxFlowElement" && node2.name === "Meta", isStringLiteral = (value) => value?.type === "Literal" && typeof value.value == "string", getAttribute = (metaElement, attributeName) => metaElement.attributes.find(
  (node2) => isMdxJsxAttribute(node2) && node2.name === attributeName
), getAttributeValue = (metaElement, attributeName) => getAttribute(metaElement, attributeName)?.value, getExpression = (attributeValue) => {
  let expressionStatement = attributeValue.data?.estree?.body[0];
  if (expressionStatement?.type === "ExpressionStatement")
    return expressionStatement.expression;
  throw new Error("Expected JSX expression, received unknown");
}, getStringAttribute = (metaElement, attributeName) => {
  let attributeValue = getAttributeValue(metaElement, attributeName);
  if (attributeValue) {
    if (typeof attributeValue == "string")
      return attributeValue;
    throw new Error(`Expected string literal ${attributeName}, received JSXExpressionContainer`);
  }
}, getOfImportPath = (metaElement, importMap) => {
  let attributeValue = getAttributeValue(metaElement, "of");
  if (!attributeValue)
    return;
  if (typeof attributeValue == "string")
    throw new Error("Expected JSX expression, received Literal");
  let expression = getExpression(attributeValue);
  if (expression.type !== "Identifier")
    throw new Error(`Expected identifier, received ${expression.type}`);
  let importPath = importMap[expression.name];
  if (importPath)
    return importPath;
  throw new Error(`Unknown identifier ${expression.name}`);
}, getMetaTags = (metaElement) => {
  let attribute = getAttribute(metaElement, "tags");
  if (!attribute)
    return;
  let attributeValue = attribute.value;
  if (!attributeValue)
    throw new Error("Expected JSX expression tags, received null");
  if (typeof attributeValue == "string")
    throw new Error("Expected JSX expression tags, received Literal");
  let expression = getExpression(attributeValue);
  if (expression.type !== "ArrayExpression")
    throw new Error(`Expected tags array, received ${expression.type}`);
  return expression.elements.map((element) => {
    if (isStringLiteral(element))
      return element.value;
    throw new Error(`Expected string literal tag, received ${element?.type ?? "null"}`);
  });
}, getIsTemplate = (metaElement) => {
  let attribute = getAttribute(metaElement, "isTemplate");
  if (!attribute)
    return !1;
  let attributeValue = attribute.value;
  if (attributeValue == null)
    return !0;
  if (typeof attributeValue == "string")
    throw new Error("Expected expression isTemplate, received Literal");
  let expression = getExpression(attributeValue);
  if (expression.type === "Literal" && typeof expression.value == "boolean")
    return expression.value;
  throw new Error(
    `Expected boolean isTemplate, received ${typeof expression.value}`
  );
}, extractMeta = (metaElement, importMap) => ({
  title: getStringAttribute(metaElement, "title"),
  of: getOfImportPath(metaElement, importMap),
  name: getStringAttribute(metaElement, "name"),
  id: getStringAttribute(metaElement, "id"),
  summary: getStringAttribute(metaElement, "summary"),
  isTemplate: getIsTemplate(metaElement),
  metaTags: getMetaTags(metaElement)
}), extractImports = (root) => {
  let importMap = {};
  for (let child of root.body) {
    if (child.type !== "ImportDeclaration")
      continue;
    let importPath = child.source.value;
    if (child.source.type !== "Literal" || typeof importPath != "string")
      throw new Error("MDX: unexpected import source");
    for (let specifier of child.specifiers)
      importMap[specifier.local.name] = importPath;
  }
  return importMap;
}, analyzeParsedMdx = (root) => {
  let importMap = {}, metaElement;
  for (let child of root.children)
    if (child.type === "mdxjsEsm" && child.data?.estree && Object.assign(importMap, extractImports(child.data.estree)), isMetaElement(child)) {
      if (metaElement)
        throw new Error("Meta can only be declared once");
      metaElement = child;
    }
  return {
    ...metaElement ? extractMeta(metaElement, importMap) : createEmptyMdxMetadata(),
    imports: Array.from(new Set(Object.values(importMap)))
  };
}, analyzeMdx = async (code) => analyzeParsedMdx(parseMdx(code));

// src/core-server/utils/summarizeStats.ts
var addStats = (stat3, acc) => {
  Object.entries(stat3).forEach(([key2, value]) => {
    let statsKey = key2;
    acc[statsKey] || (acc[statsKey] = 0), acc[statsKey] += value ? 1 : 0;
  });
};

// src/core-server/utils/StoryIndexGenerator.ts
var makeAbsolute = (otherImport, normalizedPath, workingDir) => otherImport.startsWith(".") ? slash(resolve3(workingDir, normalizeStoryPath(join6(dirname2(normalizedPath), otherImport)))) : otherImport, StoryIndexGenerator = class _StoryIndexGenerator {
  constructor(specifiers, options) {
    this.specifiers = specifiers;
    this.options = options;
    this.invalidationListeners = /* @__PURE__ */ new Set();
    this.specifierToCache = /* @__PURE__ */ new Map();
  }
  static {
    /** Cache for findMatchingFiles results */
    this.findMatchingFilesCache = /* @__PURE__ */ new Map();
  }
  /** Generate a cache key for findMatchingFiles */
  static getFindMatchingFilesCacheKey(specifier, workingDir, ignoreWarnings) {
    return JSON.stringify({
      directory: specifier.directory,
      files: specifier.files,
      workingDir,
      ignoreWarnings
    });
  }
  /** Clear the findMatchingFiles cache */
  static clearFindMatchingFilesCache() {
    this.findMatchingFilesCache.clear();
  }
  static async findMatchingFiles(specifier, workingDir, ignoreWarnings = !1) {
    let cacheKey = this.getFindMatchingFilesCacheKey(specifier, workingDir, ignoreWarnings), cached = this.findMatchingFilesCache.get(cacheKey);
    if (cached)
      return cached;
    let pathToSubIndex = {}, globCwd = slash(resolve3(workingDir, specifier.directory)), globPattern = specifier.files.startsWith("!") ? `./${specifier.files}` : specifier.files, { globby } = await import("../_node-chunks/globby-5UZDOYO6.js"), files = await globby(globPattern, {
      absolute: !0,
      cwd: globCwd,
      ...commonGlobOptions2(globPattern),
      onlyFiles: !0
    });
    return files.length === 0 && !ignoreWarnings && once.warn(
      `No story files found for the specified pattern: ${import_picocolors9.default.blue(
        join6(specifier.directory, specifier.files)
      )}`
    ), files.sort().forEach((absolutePath) => {
      let ext = extname(absolutePath);
      if (ext === ".storyshot") {
        let relativePath = relative4(workingDir, absolutePath);
        logger19.info(`Skipping ${ext} file ${relativePath}`);
        return;
      }
      pathToSubIndex[absolutePath] = !1;
    }), this.findMatchingFilesCache.set(cacheKey, pathToSubIndex), pathToSubIndex;
  }
  static async findMatchingFilesForSpecifiers(specifiers, workingDir, ignoreWarnings = !1) {
    return Promise.all(
      specifiers.map(async (specifier) => {
        let pathToSubIndex = await _StoryIndexGenerator.findMatchingFiles(
          specifier,
          workingDir,
          ignoreWarnings
        );
        return [specifier, pathToSubIndex];
      })
    );
  }
  async initialize() {
    (await _StoryIndexGenerator.findMatchingFilesForSpecifiers(
      this.specifiers,
      this.options.workingDir
    )).forEach(
      ([specifier, cache4]) => this.specifierToCache.set(specifier, cache4)
    );
    let previewCode = await this.getPreviewCode(), projectTags = this.getProjectTags(previewCode);
    await this.ensureExtracted({ projectTags });
  }
  /** Run the updater function over all the empty cache entries */
  async updateExtracted(updater, overwrite = !1) {
    await Promise.all(
      this.specifiers.map(async (specifier) => {
        let entry = this.specifierToCache.get(specifier);
        return invariant(
          entry,
          `specifier does not have a matching cache entry in specifierToCache: ${JSON.stringify(
            specifier
          )}`
        ), Promise.all(
          Object.keys(entry).map(async (absolutePath) => {
            if (!(entry[absolutePath] && !overwrite))
              try {
                entry[absolutePath] = await updater(specifier, absolutePath, entry[absolutePath]);
              } catch (err) {
                let relativePath = `.${sep}${relative4(this.options.workingDir, absolutePath)}`;
                entry[absolutePath] = {
                  type: "error",
                  err: new IndexingError(
                    err instanceof Error ? err.message : String(err),
                    [relativePath],
                    err instanceof Error ? err.stack : void 0
                  )
                };
              }
          })
        );
      })
    );
  }
  isDocsMdx(absolutePath) {
    return /(?<!\.stories)\.mdx$/i.test(absolutePath);
  }
  async ensureExtracted({
    projectTags
  }) {
    await this.updateExtracted(
      async (specifier, absolutePath) => this.isDocsMdx(absolutePath) ? !1 : this.extractStories(specifier, absolutePath, projectTags)
    ), await this.updateExtracted(
      async (specifier, absolutePath) => this.extractDocs(specifier, absolutePath, projectTags)
    );
    let statsSummary = {};
    return { entries: this.specifiers.flatMap((specifier) => {
      let cache4 = this.specifierToCache.get(specifier);
      return invariant(
        cache4,
        `specifier does not have a matching cache entry in specifierToCache: ${JSON.stringify(
          specifier
        )}`
      ), Object.values(cache4).flatMap((entry) => entry ? entry.type === "docs" ? [entry] : entry.type === "error" ? [entry] : entry.entries.map((item) => {
        if (item.type === "docs")
          return item;
        isExampleStoryId2(item.id) || addStats(item.extra.stats, statsSummary);
        let { extra, ...existing } = item;
        return existing;
      }) : []);
    }), stats: statsSummary };
  }
  findDependencies(absoluteImports) {
    return [...this.specifierToCache.values()].flatMap(
      (cache4) => Object.entries(cache4).filter(([fileName, cacheEntry]) => !cacheEntry || cacheEntry.type !== "stories" ? !1 : !!absoluteImports.find(
        (storyImport) => fileName.match(
          new RegExp(`^${storyImport.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\.[^.]+)?$`)
        )
      )).map(([_, cacheEntry]) => cacheEntry)
    );
  }
  /**
   * Try to find the component path from a raw import string and return it in the same format as
   * `importPath`. Respect tsconfig paths if available.
   *
   * If no such file exists, assume that the import is from a package and return the raw
   */
  resolveComponentPath(rawComponentPath, absolutePath, matchPath) {
    let matchedPath = matchPath?.(rawComponentPath, void 0, void 0, supportedExtensions) ?? rawComponentPath, resolved;
    try {
      resolved = resolveImport(matchedPath, { basedir: dirname2(absolutePath) });
    } catch {
      return matchedPath;
    }
    let relativePath = relative4(this.options.workingDir, resolved);
    return slash(normalizeStoryPath(relativePath));
  }
  async extractStories(specifier, absolutePath, projectTags = []) {
    let relativePath = relative4(this.options.workingDir, absolutePath), importPath = slash(normalizeStoryPath(relativePath)), defaultMakeTitle = (userTitle) => {
      let title = userOrAutoTitleFromSpecifier(importPath, specifier, userTitle);
      return invariant(
        title,
        "makeTitle created an undefined title. This happens when the fileName doesn't match any specifier from main.js"
      ), title;
    }, indexer = this.options.indexers.find((ind) => ind.test.exec(absolutePath));
    invariant(indexer, `No matching indexer found for ${absolutePath}`);
    let indexInputs = await indexer.createIndex(absolutePath, {
      makeTitle: defaultMakeTitle
    }), tsconfigPath = up("tsconfig.json", {
      cwd: this.options.workingDir,
      last: getProjectRoot3()
    }), tsconfig = TsconfigPaths.loadConfig(tsconfigPath), matchPath;
    tsconfig.resultType === "success" && (matchPath = TsconfigPaths.createMatchPath(tsconfig.absoluteBaseUrl, tsconfig.paths, [
      "browser",
      "module",
      "main"
    ]));
    let toImportPath = (path2) => path2 ? path2.startsWith("virtual:") ? path2 : slash(normalizeStoryPath(relative4(this.options.workingDir, path2))) : importPath, storyEntries2 = indexInputs.map((input) => {
      let name2 = input.name ?? storyNameFromExport(input.exportName), componentPath = input.rawComponentPath && this.resolveComponentPath(input.rawComponentPath, absolutePath, matchPath), title = input.title ?? defaultMakeTitle(), id = input.__id ?? toId(input.metaId ?? title, storyNameFromExport(input.exportName)), tags = combineTags(...projectTags, ...input.tags ?? []), subtype = input.subtype ?? "story", entry = {
        type: "story",
        subtype,
        id,
        extra: {
          metaId: input.metaId,
          stats: input.__stats ?? {}
        },
        name: name2,
        title,
        importPath: toImportPath(input.importPath),
        componentPath,
        tags
      };
      return subtype === "test" && (entry.parent = input.parent, entry.parentName = input.parentName), input.exportName && (entry.exportName = input.exportName), entry;
    });
    if (storyEntries2.some((entry) => entry.tags.includes(Tag.AUTODOCS)) && !!this.options.docs && this.options.build?.test?.disableAutoDocs !== !0) {
      let name2 = this.options.docs?.defaultName ?? "Docs", { metaId } = indexInputs[0], entry = storyEntries2[0], id = toId(metaId ?? entry.title, name2), tags = combineTags(...projectTags, ...indexInputs[0].tags ?? []);
      return {
        entries: [{
          id,
          title: entry.title,
          name: name2,
          importPath: entry.importPath,
          type: "docs",
          tags,
          storiesImports: []
        }, ...storyEntries2],
        dependents: [],
        type: "stories"
      };
    }
    return {
      entries: storyEntries2,
      dependents: [],
      type: "stories"
    };
  }
  async extractDocs(specifier, absolutePath, projectTags = []) {
    let relativePath = relative4(this.options.workingDir, absolutePath);
    try {
      let normalizedPath = normalizeStoryPath(relativePath), importPath = slash(normalizedPath), content3 = await readFile8(absolutePath, { encoding: "utf8" }), result = await analyzeMdx(content3);
      if (result.isTemplate)
        return !1;
      let absoluteImports = result.imports.map(
        (p) => makeAbsolute(p, normalizedPath, this.options.workingDir)
      ), dependencies = this.findDependencies(absoluteImports), sortedDependencies = dependencies, csfEntry;
      if (result.of) {
        let absoluteOf = makeAbsolute(result.of, normalizedPath, this.options.workingDir), metaDependency;
        dependencies.forEach((dep) => {
          if (dep.entries.length > 0) {
            let first = dep.entries.find((e) => e.type !== "docs");
            normalize2(resolve3(this.options.workingDir, first.importPath)).startsWith(
              normalize2(absoluteOf)
            ) && (csfEntry = first, metaDependency = dep);
          }
        }), metaDependency && (sortedDependencies = [
          metaDependency,
          ...dependencies.filter((d) => d !== metaDependency)
        ]), invariant(
          csfEntry,
          import_ts_dedent7.dedent`
            Could not find or load CSF file at path "${result.of}" referenced by \`of={}\` in docs file "${relativePath}".

            - Does that file exist?
            - If so, is it a CSF file (\`.stories.*\`)?
            - If so, is it matched by the \`stories\` glob in \`main.js\`?
            - If so, has the file successfully loaded in Storybook and are its stories visible?
          `
        );
      }
      dependencies.forEach((dep) => {
        dep.dependents.push(absolutePath);
      });
      let title = csfEntry?.title || userOrAutoTitleFromSpecifier(importPath, specifier, result.title);
      invariant(
        title,
        "makeTitle created an undefined title. This happens when a specifier's doesn't have any matches in its fileName"
      );
      let defaultName = this.options.docs?.defaultName ?? "Docs", name2 = result.name || (csfEntry ? autoName(importPath, csfEntry.importPath, defaultName) : defaultName), id = toId(csfEntry?.extra.metaId || result.id || title, name2), tags = combineTags(
        ...projectTags,
        ...csfEntry?.tags ?? [],
        ...result.metaTags ?? [],
        csfEntry ? Tag.ATTACHED_MDX : Tag.UNATTACHED_MDX
      );
      return {
        id,
        title,
        name: name2,
        importPath,
        storiesImports: sortedDependencies.map((dep) => dep.entries[0].importPath),
        type: "docs",
        tags
      };
    } catch (err) {
      throw err && err.source?.match(/mdast-util-mdx-jsx/g) && logger19.warn(
        `\u{1F4A1} This seems to be an MDX2 syntax error. Please refer to the MDX section in the following resource for assistance on how to fix this: ${import_picocolors9.default.yellow(
          "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#mdx2-upgrade"
        )}`
      ), err;
    }
  }
  chooseDuplicate(firstEntry, secondEntry, projectTags) {
    if (firstEntry.importPath === secondEntry.importPath)
      return firstEntry;
    let firstIsBetter = !0;
    (secondEntry.type === "story" || isMdxEntry(secondEntry) && firstEntry.type === "docs" && !isMdxEntry(firstEntry)) && (firstIsBetter = !1);
    let betterEntry = firstIsBetter ? firstEntry : secondEntry, worseEntry = firstIsBetter ? secondEntry : firstEntry, changeDocsName = 'Use `<Meta of={} name="Other Name">` to distinguish them.';
    if (worseEntry.type === "story")
      throw new IndexingError(`Duplicate stories with id: ${firstEntry.id}`, [
        firstEntry.importPath,
        secondEntry.importPath
      ]);
    if (betterEntry.type === "story") {
      let worseDescriptor = isMdxEntry(worseEntry) ? "component docs page" : "automatically generated docs page", docsName = this.options.docs?.defaultName ?? "Docs";
      throw betterEntry.name === docsName ? new IndexingError(
        `You have a story for ${betterEntry.title} with the same name as your default docs entry name (${betterEntry.name}), so the docs page is being dropped. Consider changing the story name.`,
        [firstEntry.importPath, secondEntry.importPath]
      ) : new IndexingError(
        `You have a story for ${betterEntry.title} with the same name as your ${worseDescriptor} (${worseEntry.name}), so the docs page is being dropped. ${changeDocsName}`,
        [firstEntry.importPath, secondEntry.importPath]
      );
    } else if (isMdxEntry(betterEntry)) {
      if (isMdxEntry(worseEntry))
        throw new IndexingError(
          `You have two component docs pages with the same name ${betterEntry.title}:${betterEntry.name}. ${changeDocsName}`,
          [firstEntry.importPath, secondEntry.importPath]
        );
      if (worseEntry.tags?.includes(Tag.AUTODOCS) && !projectTags?.includes(Tag.AUTODOCS))
        throw new IndexingError(
          `You created a component docs page for '${worseEntry.title}', but also tagged the CSF file with '${Tag.AUTODOCS}'. This is probably a mistake.`,
          [betterEntry.importPath, worseEntry.importPath]
        );
    } else
      return {
        ...betterEntry,
        storiesImports: [
          ...betterEntry.storiesImports,
          worseEntry.importPath,
          ...worseEntry.storiesImports
        ]
      };
    return betterEntry;
  }
  async sortStories(entries, storySortParameter) {
    let sortableStories = Object.values(entries), fileNameOrder = _StoryIndexGenerator.storyFileNames(this.specifierToCache);
    return sortStoriesV7(sortableStories, storySortParameter, fileNameOrder), sortableStories.reduce(
      (acc, item) => (acc[item.id] = item, acc),
      {}
    );
  }
  async getIndex() {
    return (await this.getIndexAndStats()).storyIndex;
  }
  async getIndexAndStats() {
    if (this.lastIndex && this.lastStats)
      return { storyIndex: this.lastIndex, stats: this.lastStats };
    if (this.lastError)
      throw this.lastError;
    let previewCode = await this.getPreviewCode(), projectTags = this.getProjectTags(previewCode), { entries: storiesList, stats } = await this.ensureExtracted({ projectTags });
    try {
      let errorEntries = storiesList.filter((entry) => entry.type === "error");
      if (errorEntries.length)
        throw new MultipleIndexingError(errorEntries.map((entry) => entry.err));
      let duplicateErrors = [], indexEntries = {};
      if (storiesList.forEach((entry) => {
        try {
          let existing = indexEntries[entry.id];
          existing ? indexEntries[entry.id] = this.chooseDuplicate(existing, entry, projectTags) : indexEntries[entry.id] = entry;
        } catch (err) {
          err instanceof IndexingError && duplicateErrors.push(err);
        }
      }), duplicateErrors.length)
        throw new MultipleIndexingError(duplicateErrors);
      let sorted = await this.sortStories(
        indexEntries,
        previewCode && getStorySortParameter(previewCode)
      );
      return this.lastStats = stats, this.lastIndex = {
        v: 5,
        entries: sorted
      }, { storyIndex: this.lastIndex, stats: this.lastStats };
    } catch (err) {
      throw this.lastError = err == null || err instanceof Error ? err : void 0, invariant(this.lastError), logger19.warn(`\u{1F6A8} ${this.lastError.toString()}`), this.lastError;
    }
  }
  invalidateAll() {
    this.specifierToCache.forEach((cache4) => {
      Object.keys(cache4).forEach((key2) => {
        cache4[key2] = !1;
      });
    }), this.lastIndex = null, this.lastError = null, this.invalidationListeners.forEach((listener) => listener());
  }
  invalidate(importPath, removed) {
    let absolutePath = slash(resolve3(this.options.workingDir, importPath)), specifier = Array.from(this.specifierToCache.keys()).find(
      (ns) => ns.importPathMatcher.exec(importPath)
    );
    if (!specifier)
      return;
    let cache4 = this.specifierToCache.get(specifier);
    invariant(
      cache4,
      `specifier does not have a matching cache entry in specifierToCache: ${JSON.stringify(
        specifier
      )}`
    );
    let cacheEntry = cache4[absolutePath];
    if (cacheEntry && cacheEntry.type === "stories") {
      let { dependents } = cacheEntry, invalidated = /* @__PURE__ */ new Set();
      this.specifierToCache.forEach((otherCache) => {
        dependents.forEach((dep) => {
          otherCache[dep] && (invalidated.add(dep), otherCache[dep] = !1);
        });
      });
    }
    if (removed) {
      if (cacheEntry && cacheEntry.type === "docs") {
        let absoluteImports = cacheEntry.storiesImports.map(
          (p) => resolve3(this.options.workingDir, p)
        );
        this.findDependencies(absoluteImports).forEach(
          (dep) => dep.dependents.splice(dep.dependents.indexOf(absolutePath), 1)
        );
      }
      delete cache4[absolutePath];
    } else
      cache4[absolutePath] = !1;
    this.lastIndex = null, this.lastError = null, this.invalidationListeners.forEach((listener) => listener());
  }
  onInvalidated(listener) {
    return this.invalidationListeners.add(listener), () => {
      this.invalidationListeners.delete(listener);
    };
  }
  async getPreviewCode() {
    let previewFile = ["js", "jsx", "ts", "tsx", "mjs", "cjs", "mts"].map((ext) => join6(this.options.configDir, `preview.${ext}`)).find((fname) => existsSync3(fname));
    return previewFile && (await readFile8(previewFile, { encoding: "utf8" })).toString();
  }
  getProjectTags(previewCode) {
    let projectTags = [], defaultTags = [Tag.DEV, Tag.TEST, Tag.MANIFEST];
    if (previewCode)
      try {
        projectTags = loadConfig(previewCode).parse().getFieldValue(["tags"]) ?? [];
      } catch {
        once.warn(import_ts_dedent7.dedent`
          Unable to parse tags from project configuration. If defined, tags should be specified inline, e.g.

          export default {
            tags: ['foo'],
          }

          ---

          Received:

          ${previewCode}
        `);
      }
    return [...defaultTags, ...projectTags];
  }
  // Get the story file names in "imported order"
  static storyFileNames(specifierToCache) {
    return Array.from(specifierToCache.values()).flatMap((r) => Object.keys(r));
  }
};

// src/core-server/build-index.ts
var buildIndex = async (options) => {
  let { presets } = await loadStorybook(options), [indexers, stories, docsOptions] = await Promise.all([
    presets.apply("experimental_indexers", []),
    presets.apply("stories", []),
    presets.apply("docs")
  ]), { configDir } = options, workingDir = process.cwd(), directories = {
    configDir,
    workingDir
  }, normalizedStories = normalizeStories2(stories, directories), generator = new StoryIndexGenerator(normalizedStories, {
    ...directories,
    indexers,
    docs: docsOptions,
    build: {}
  });
  return await generator.initialize(), generator.getIndex();
}, buildIndexStandalone = async (options) => {
  let index2 = await buildIndex(options);
  logger20.info(`Writing index to ${options.outputFile}`), await writeFile5(options.outputFile, JSON.stringify(index2));
};

// src/core-server/standalone.ts
async function build(options = {}, frameworkOptions = {}) {
  let { mode = "dev" } = options, { default: packageJson } = await import("storybook/package.json", { with: { type: "json" } }), commonOptions = {
    ...options,
    ...frameworkOptions,
    frameworkPresets: [
      ...options.frameworkPresets || [],
      ...frameworkOptions.frameworkPresets || []
    ],
    packageJson
  };
  if (mode === "dev")
    return buildDevStandalone(commonOptions);
  if (mode === "static")
    return buildStaticStandalone(commonOptions);
  if (mode === "index")
    return buildIndexStandalone(commonOptions);
  throw new Error("'mode' parameter should be either 'dev', 'static', or 'index'");
}
var standalone_default = build;

// src/core-server/utils/get-stories-paths-from-config.ts
import { normalizeStories as normalizeStories3 } from "storybook/internal/common";
var getStoriesPathsFromConfig = async ({
  stories,
  configDir,
  workingDir
}) => {
  if (stories.length === 0)
    return [];
  let normalizedStories = normalizeStories3(stories, { configDir, workingDir });
  return (await StoryIndexGenerator.findMatchingFilesForSpecifiers(
    normalizedStories,
    workingDir,
    !0
  )).flatMap(
    ([specifier, cache4]) => StoryIndexGenerator.storyFileNames(/* @__PURE__ */ new Map([[specifier, cache4]]))
  );
};

// src/shared/universal-store/mock.ts
var import_ts_dedent8 = __toESM(require_dist(), 1);
import { Channel as Channel5 } from "storybook/internal/channels";
var MockUniversalStore = class _MockUniversalStore extends UniversalStore {
  constructor(options, testUtils) {
    UniversalStore.isInternalConstructing = !0, super(
      { ...options, leader: !0 },
      { channel: new Channel5({}), environment: UniversalStore.Environment.MOCK }
    ), UniversalStore.isInternalConstructing = !1, typeof testUtils?.fn == "function" && (this.testUtils = testUtils, this.getState = testUtils.fn(this.getState), this.setState = testUtils.fn(this.setState), this.subscribe = testUtils.fn(this.subscribe), this.onStateChange = testUtils.fn(this.onStateChange), this.send = testUtils.fn(this.send));
  }
  /** Create a mock universal store. This is just an alias for the constructor */
  static create(options, testUtils) {
    return new _MockUniversalStore(options, testUtils);
  }
  unsubscribeAll() {
    if (!this.testUtils)
      throw new Error(
        import_ts_dedent8.dedent`Cannot call unsubscribeAll on a store that does not have testUtils.
        Please provide testUtils as the second argument when creating the store.`
      );
    let callReturnedUnsubscribeFn = (result) => {
      try {
        result.value();
      } catch {
      }
    };
    this.subscribe.mock?.results.forEach(callReturnedUnsubscribeFn), this.onStateChange.mock?.results.forEach(callReturnedUnsubscribeFn);
  }
};
export {
  ChangeDetectionFailureError,
  ChangeDetectionService,
  ChangeDetectionUnavailableError,
  MDX_SERVICE_ID,
  StoryIndexGenerator,
  Tag,
  analyzeMdx,
  analyzeTestResults,
  standalone_default as build,
  buildDevStandalone,
  buildIndex,
  buildIndexStandalone,
  buildStaticStandalone,
  describeService,
  MockUniversalStore as experimental_MockUniversalStore,
  UniversalStore as experimental_UniversalStore,
  defineService as experimental_defineService,
  getChangeDetectionReadiness as experimental_getChangeDetectionReadiness,
  getStatusStoreByTypeId as experimental_getStatusStore,
  getTestProviderStoreById as experimental_getTestProviderStore,
  loadStorybook as experimental_loadStorybook,
  registerService as experimental_registerService,
  generateStoryFile,
  getComponentCandidates,
  getErrorLevel,
  getPreviewBodyTemplate,
  getPreviewHeadTemplate,
  getServerPort,
  getService,
  getStoriesPathsFromConfig,
  fullStatusStore as internal_fullStatusStore,
  fullTestProviderStore as internal_fullTestProviderStore,
  universalStatusStore as internal_universalStatusStore,
  universalTestProviderStore as internal_universalTestProviderStore,
  listServices,
  mapStaticDir,
  mdxManifestRef,
  mdxQueryStaticPath,
  mdxStaticStorePath,
  resolveOnboardingInitialPath,
  runStoryTests,
  sendTelemetryError,
  toStoryTestResult,
  withTelemetry
};
