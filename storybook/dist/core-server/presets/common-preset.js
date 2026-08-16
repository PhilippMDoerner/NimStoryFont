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
  REVIEW_EVENTS
} from "../../_node-chunks/chunk-MMWXZYX6.js";
import "../../_node-chunks/chunk-BOL6OWVM.js";
import "../../_node-chunks/chunk-KD5NGLH7.js";
import {
  docgenQueryStaticPath,
  doesStoryFileExist,
  fullTestProviderStore,
  generateStoryFile,
  getComponentCandidates,
  getStoryMetadata,
  getWsToken,
  parseStaticDir,
  registerModuleGraphService,
  runStoryTests,
  sendTelemetryError,
  storyDocsQueryStaticPath,
  throttle,
  universalTestProviderStore
} from "../../_node-chunks/chunk-XYZ5NBEV.js";
import "../../_node-chunks/chunk-KIY3O3SC.js";
import "../../_node-chunks/chunk-IDSUOV3G.js";
import {
  get,
  isStoryCreatedByAISetup
} from "../../_node-chunks/chunk-UWEHU3AF.js";
import "../../_node-chunks/chunk-LQX45LAM.js";
import {
  getService,
  getStoryImportPathFromEntry,
  registerService,
  selectComponentEntriesByComponentId,
  toMerged
} from "../../_node-chunks/chunk-BVQV5AQI.js";
import "../../_node-chunks/chunk-HGQEN5BB.js";
import "../../_node-chunks/chunk-RW6CS4VF.js";
import {
  array,
  custom,
  looseObject,
  object,
  optional,
  record,
  string,
  undefined_,
  void_
} from "../../_node-chunks/chunk-Z35MCY7K.js";
import "../../_node-chunks/chunk-LISHZJOF.js";
import "../../_node-chunks/chunk-3KWZUKIJ.js";
import {
  globalSettings
} from "../../_node-chunks/chunk-57EPATSG.js";
import {
  invariant
} from "../../_node-chunks/chunk-TWPZPMFT.js";
import {
  importMetaResolve,
  resolvePackageDir
} from "../../_node-chunks/chunk-OS6I5BZG.js";
import "../../_node-chunks/chunk-GTBJHD7H.js";
import "../../_node-chunks/chunk-ZGQ7HJL4.js";
import {
  OpenServiceDocgenMissingComponentError
} from "../../_node-chunks/chunk-BKV2AHET.js";
import {
  require_dist
} from "../../_node-chunks/chunk-TWWDCALS.js";
import {
  require_picocolors
} from "../../_node-chunks/chunk-STC3JUUJ.js";
import {
  toStoryIndexPath
} from "../../_node-chunks/chunk-VRYTK5KC.js";
import {
  isAbsolute,
  join
} from "../../_node-chunks/chunk-4XX73STB.js";
import "../../_node-chunks/chunk-5EYNHKVG.js";
import {
  __commonJS,
  __require,
  __toESM
} from "../../_node-chunks/chunk-5SSDLDTJ.js";

// ../../node_modules/shell-quote/quote.js
var require_quote = __commonJS({
  "../../node_modules/shell-quote/quote.js"(exports, module) {
    "use strict";
    module.exports = function(xs) {
      return xs.map(function(s) {
        return s === "" ? "''" : s && typeof s == "object" ? s.op.replace(/(.)/g, "\\$1") : /["\s\\]/.test(s) && !/'/.test(s) ? "'" + s.replace(/(['])/g, "\\$1") + "'" : /["'\s]/.test(s) ? '"' + s.replace(/(["\\$`!])/g, "\\$1") + '"' : String(s).replace(/([A-Za-z]:)?([#!"$&'()*,:;<=>?@[\\\]^`{|}])/g, "$1\\$2");
      }).join(" ");
    };
  }
});

// ../../node_modules/shell-quote/parse.js
var require_parse = __commonJS({
  "../../node_modules/shell-quote/parse.js"(exports, module) {
    "use strict";
    var CONTROL = "(?:" + [
      "\\|\\|",
      "\\&\\&",
      ";;",
      "\\|\\&",
      "\\<\\(",
      "\\<\\<\\<",
      ">>",
      ">\\&",
      "<\\&",
      "[&;()|<>]"
    ].join("|") + ")", controlRE = new RegExp("^" + CONTROL + "$"), META = "|&;()<> \\t", SINGLE_QUOTE = '"((\\\\"|[^"])*?)"', DOUBLE_QUOTE = "'((\\\\'|[^'])*?)'", hash = /^#$/, SQ = "'", DQ = '"', DS = "$", TOKEN = "", mult = 4294967296;
    for (i = 0; i < 4; i++)
      TOKEN += (mult * Math.random()).toString(16);
    var i, startsWithToken = new RegExp("^" + TOKEN);
    function matchAll(s, r) {
      for (var origIndex = r.lastIndex, matches = [], matchObj; matchObj = r.exec(s); )
        matches.push(matchObj), r.lastIndex === matchObj.index && (r.lastIndex += 1);
      return r.lastIndex = origIndex, matches;
    }
    function getVar(env2, pre, key) {
      var r = typeof env2 == "function" ? env2(key) : env2[key];
      return typeof r > "u" && key != "" ? r = "" : typeof r > "u" && (r = "$"), typeof r == "object" ? pre + TOKEN + JSON.stringify(r) + TOKEN : pre + r;
    }
    function parseInternal(string2, env2, opts) {
      opts || (opts = {});
      var BS = opts.escape || "\\", BAREWORD = "(\\" + BS + `['"` + META + `]|[^\\s'"` + META + "])+", chunker = new RegExp([
        "(" + CONTROL + ")",
        // control chars
        "(" + BAREWORD + "|" + SINGLE_QUOTE + "|" + DOUBLE_QUOTE + ")+"
      ].join("|"), "g"), matches = matchAll(string2, chunker);
      if (matches.length === 0)
        return [];
      env2 || (env2 = {});
      var commented = !1;
      return matches.map(function(match) {
        var s = match[0];
        if (!s || commented)
          return;
        if (controlRE.test(s))
          return { op: s };
        var quote = !1, esc = !1, out = "", isGlob = !1, i2;
        function parseEnvVar() {
          i2 += 1;
          var varend, varname, char = s.charAt(i2);
          if (char === "{") {
            if (i2 += 1, s.charAt(i2) === "}")
              throw new Error("Bad substitution: " + s.slice(i2 - 2, i2 + 1));
            if (varend = s.indexOf("}", i2), varend < 0)
              throw new Error("Bad substitution: " + s.slice(i2));
            varname = s.slice(i2, varend), i2 = varend;
          } else if (/[*@#?$!_-]/.test(char))
            varname = char, i2 += 1;
          else {
            var slicedFromI = s.slice(i2);
            varend = slicedFromI.match(/[^\w\d_]/), varend ? (varname = slicedFromI.slice(0, varend.index), i2 += varend.index - 1) : (varname = slicedFromI, i2 = s.length);
          }
          return getVar(env2, "", varname);
        }
        for (i2 = 0; i2 < s.length; i2++) {
          var c = s.charAt(i2);
          if (isGlob = isGlob || !quote && (c === "*" || c === "?"), esc)
            out += c, esc = !1;
          else if (quote)
            c === quote ? quote = !1 : quote == SQ ? out += c : c === BS ? (i2 += 1, c = s.charAt(i2), c === DQ || c === BS || c === DS ? out += c : out += BS + c) : c === DS ? out += parseEnvVar() : out += c;
          else if (c === DQ || c === SQ)
            quote = c;
          else {
            if (controlRE.test(c))
              return { op: s };
            if (hash.test(c)) {
              commented = !0;
              var commentObj = { comment: string2.slice(match.index + i2 + 1) };
              return out.length ? [out, commentObj] : [commentObj];
            } else c === BS ? esc = !0 : c === DS ? out += parseEnvVar() : out += c;
          }
        }
        return isGlob ? { op: "glob", pattern: out } : out;
      }).reduce(function(prev, arg) {
        return typeof arg > "u" ? prev : prev.concat(arg);
      }, []);
    }
    module.exports = function(s, env2, opts) {
      var mapped = parseInternal(s, env2, opts);
      return typeof env2 != "function" ? mapped : mapped.reduce(function(acc, s2) {
        if (typeof s2 == "object")
          return acc.concat(s2);
        var xs = s2.split(RegExp("(" + TOKEN + ".*?" + TOKEN + ")", "g"));
        return xs.length === 1 ? acc.concat(xs[0]) : acc.concat(xs.filter(Boolean).map(function(x) {
          return startsWithToken.test(x) ? JSON.parse(x.split(TOKEN)[1]) : x;
        }));
      }, []);
    };
  }
});

// ../../node_modules/shell-quote/index.js
var require_shell_quote = __commonJS({
  "../../node_modules/shell-quote/index.js"(exports) {
    "use strict";
    exports.quote = require_quote();
    exports.parse = require_parse();
  }
});

// ../../node_modules/launch-editor/editor-info/macos.js
var require_macos = __commonJS({
  "../../node_modules/launch-editor/editor-info/macos.js"(exports, module) {
    module.exports = {
      "/Applications/Atom.app/Contents/MacOS/Atom": "atom",
      "/Applications/Atom Beta.app/Contents/MacOS/Atom Beta": "/Applications/Atom Beta.app/Contents/MacOS/Atom Beta",
      "/Applications/Brackets.app/Contents/MacOS/Brackets": "brackets",
      "/Applications/Sublime Text.app/Contents/MacOS/Sublime Text": "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl",
      "/Applications/Sublime Text.app/Contents/MacOS/sublime_text": "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl",
      "/Applications/Sublime Text 2.app/Contents/MacOS/Sublime Text 2": "/Applications/Sublime Text 2.app/Contents/SharedSupport/bin/subl",
      "/Applications/Sublime Text Dev.app/Contents/MacOS/Sublime Text": "/Applications/Sublime Text Dev.app/Contents/SharedSupport/bin/subl",
      "/Applications/Visual Studio Code.app/Contents/MacOS/Code": "code",
      "/Applications/Visual Studio Code.app/Contents/MacOS/Electron": "code",
      "/Applications/Visual Studio Code - Insiders.app/Contents/MacOS/Code - Insiders": "code-insiders",
      "/Applications/Visual Studio Code - Insiders.app/Contents/MacOS/Electron": "code-insiders",
      "/Applications/VSCodium.app/Contents/MacOS/Electron": "codium",
      "/Applications/Cursor.app/Contents/MacOS/Cursor": "cursor",
      "/Applications/Trae.app/Contents/MacOS/Electron": "trae",
      "/Applications/Antigravity.app/Contents/MacOS/Electron": "antigravity",
      "/Applications/AppCode.app/Contents/MacOS/appcode": "/Applications/AppCode.app/Contents/MacOS/appcode",
      "/Applications/CLion.app/Contents/MacOS/clion": "/Applications/CLion.app/Contents/MacOS/clion",
      "/Applications/IntelliJ IDEA.app/Contents/MacOS/idea": "/Applications/IntelliJ IDEA.app/Contents/MacOS/idea",
      "/Applications/IntelliJ IDEA Ultimate.app/Contents/MacOS/idea": "/Applications/IntelliJ IDEA Ultimate.app/Contents/MacOS/idea",
      "/Applications/IntelliJ IDEA Community Edition.app/Contents/MacOS/idea": "/Applications/IntelliJ IDEA Community Edition.app/Contents/MacOS/idea",
      "/Applications/PhpStorm.app/Contents/MacOS/phpstorm": "/Applications/PhpStorm.app/Contents/MacOS/phpstorm",
      "/Applications/PyCharm.app/Contents/MacOS/pycharm": "/Applications/PyCharm.app/Contents/MacOS/pycharm",
      "/Applications/PyCharm CE.app/Contents/MacOS/pycharm": "/Applications/PyCharm CE.app/Contents/MacOS/pycharm",
      "/Applications/RubyMine.app/Contents/MacOS/rubymine": "/Applications/RubyMine.app/Contents/MacOS/rubymine",
      "/Applications/WebStorm.app/Contents/MacOS/webstorm": "/Applications/WebStorm.app/Contents/MacOS/webstorm",
      "/Applications/MacVim.app/Contents/MacOS/MacVim": "mvim",
      "/Applications/GoLand.app/Contents/MacOS/goland": "/Applications/GoLand.app/Contents/MacOS/goland",
      "/Applications/Rider.app/Contents/MacOS/rider": "/Applications/Rider.app/Contents/MacOS/rider",
      "/Applications/Zed.app/Contents/MacOS/zed": "zed"
    };
  }
});

// ../../node_modules/launch-editor/editor-info/linux.js
var require_linux = __commonJS({
  "../../node_modules/launch-editor/editor-info/linux.js"(exports, module) {
    module.exports = {
      atom: "atom",
      Brackets: "brackets",
      "code-insiders": "code-insiders",
      code: "code",
      vscodium: "vscodium",
      codium: "codium",
      cursor: "cursor",
      trae: "trae",
      antigravity: "antigravity",
      emacs: "emacs",
      gvim: "gvim",
      idea: "idea",
      "idea.sh": "idea",
      phpstorm: "phpstorm",
      "phpstorm.sh": "phpstorm",
      pycharm: "pycharm",
      "pycharm.sh": "pycharm",
      rubymine: "rubymine",
      "rubymine.sh": "rubymine",
      sublime_text: "subl",
      vim: "vim",
      webstorm: "webstorm",
      "webstorm.sh": "webstorm",
      goland: "goland",
      "goland.sh": "goland",
      rider: "rider",
      "rider.sh": "rider",
      zed: "zed"
    };
  }
});

// ../../node_modules/launch-editor/editor-info/windows.js
var require_windows = __commonJS({
  "../../node_modules/launch-editor/editor-info/windows.js"(exports, module) {
    module.exports = [
      "Brackets.exe",
      "Code.exe",
      "Code - Insiders.exe",
      "VSCodium.exe",
      "Cursor.exe",
      "atom.exe",
      "sublime_text.exe",
      "notepad++.exe",
      "clion.exe",
      "clion64.exe",
      "idea.exe",
      "idea64.exe",
      "phpstorm.exe",
      "phpstorm64.exe",
      "pycharm.exe",
      "pycharm64.exe",
      "rubymine.exe",
      "rubymine64.exe",
      "webstorm.exe",
      "webstorm64.exe",
      "goland.exe",
      "goland64.exe",
      "rider.exe",
      "rider64.exe",
      "Trae.exe",
      "zed.exe",
      "Antigravity.exe"
    ];
  }
});

// ../../node_modules/launch-editor/guess.js
var require_guess = __commonJS({
  "../../node_modules/launch-editor/guess.js"(exports, module) {
    var path = __require("path"), shellQuote = require_shell_quote(), childProcess = __require("child_process"), COMMON_EDITORS_MACOS = require_macos(), COMMON_EDITORS_LINUX = require_linux(), COMMON_EDITORS_WIN = require_windows();
    module.exports = function(specifiedEditor) {
      if (specifiedEditor)
        return shellQuote.parse(specifiedEditor);
      if (process.env.LAUNCH_EDITOR)
        return [process.env.LAUNCH_EDITOR];
      if (process.versions.webcontainer)
        return [process.env.EDITOR || "code"];
      try {
        if (process.platform === "darwin") {
          let output = childProcess.execSync("ps x -o comm=", {
            stdio: ["pipe", "pipe", "ignore"]
          }).toString(), processNames = Object.keys(COMMON_EDITORS_MACOS), processList = output.split(`
`);
          for (let i = 0; i < processNames.length; i++) {
            let processName = processNames[i];
            if (processList.includes(processName))
              return [COMMON_EDITORS_MACOS[processName]];
            let processNameWithoutApplications = processName.replace("/Applications", "");
            if (output.indexOf(processNameWithoutApplications) !== -1) {
              if (processName !== COMMON_EDITORS_MACOS[processName])
                return [COMMON_EDITORS_MACOS[processName]];
              let runningProcess = processList.find((procName) => procName.endsWith(processNameWithoutApplications));
              if (runningProcess !== void 0)
                return [runningProcess];
            }
          }
        } else if (process.platform === "win32") {
          let runningProcesses = childProcess.execSync(
            'powershell -NoProfile -Command "[Console]::OutputEncoding=[Text.Encoding]::UTF8;Get-CimInstance -Query \\"select executablepath from win32_process where executablepath is not null\\" | % { $_.ExecutablePath }"',
            {
              stdio: ["pipe", "pipe", "ignore"]
            }
          ).toString().split(`\r
`);
          for (let i = 0; i < runningProcesses.length; i++) {
            let fullProcessPath = runningProcesses[i].trim(), shortProcessName = path.basename(fullProcessPath);
            if (COMMON_EDITORS_WIN.indexOf(shortProcessName) !== -1)
              return [fullProcessPath];
          }
        } else if (process.platform === "linux") {
          let output = childProcess.execSync("ps x --no-heading -o comm --sort=comm", {
            stdio: ["pipe", "pipe", "ignore"]
          }).toString(), processNames = Object.keys(COMMON_EDITORS_LINUX);
          for (let i = 0; i < processNames.length; i++) {
            let processName = processNames[i];
            if (output.indexOf(processName) !== -1)
              return [COMMON_EDITORS_LINUX[processName]];
          }
        }
      } catch {
      }
      return process.env.VISUAL ? [process.env.VISUAL] : process.env.EDITOR ? [process.env.EDITOR] : [null];
    };
  }
});

// ../../node_modules/launch-editor/get-args.js
var require_get_args = __commonJS({
  "../../node_modules/launch-editor/get-args.js"(exports, module) {
    var path = __require("path");
    module.exports = function(editor, fileName, lineNumber, columnNumber = 1) {
      switch (path.basename(editor).replace(/\.(exe|cmd|bat)$/i, "")) {
        case "atom":
        case "Atom":
        case "Atom Beta":
        case "subl":
        case "sublime":
        case "sublime_text":
        case "wstorm":
        case "charm":
        case "zed":
          return [`${fileName}:${lineNumber}:${columnNumber}`];
        case "notepad++":
          return ["-n" + lineNumber, "-c" + columnNumber, fileName];
        case "vim":
        case "mvim":
          return [`+call cursor(${lineNumber}, ${columnNumber})`, fileName];
        case "joe":
        case "gvim":
          return [`+${lineNumber}`, fileName];
        case "emacs":
        case "emacsclient":
          return [`+${lineNumber}:${columnNumber}`, fileName];
        case "rmate":
        case "mate":
        case "mine":
          return ["--line", lineNumber, fileName];
        case "code":
        case "Code":
        case "code-insiders":
        case "Code - Insiders":
        case "codium":
        case "trae":
        case "antigravity":
        case "cursor":
        case "vscodium":
        case "VSCodium":
          return ["-r", "-g", `${fileName}:${lineNumber}:${columnNumber}`];
        case "appcode":
        case "clion":
        case "clion64":
        case "idea":
        case "idea64":
        case "phpstorm":
        case "phpstorm64":
        case "pycharm":
        case "pycharm64":
        case "rubymine":
        case "rubymine64":
        case "webstorm":
        case "webstorm64":
        case "goland":
        case "goland64":
        case "rider":
        case "rider64":
          return ["--line", lineNumber, "--column", columnNumber, fileName];
      }
      return process.env.LAUNCH_EDITOR ? [fileName, lineNumber, columnNumber] : [fileName];
    };
  }
});

// ../../node_modules/launch-editor/index.js
var require_launch_editor = __commonJS({
  "../../node_modules/launch-editor/index.js"(exports, module) {
    var fs = __require("fs"), os = __require("os"), path = __require("path"), colors = require_picocolors(), childProcess = __require("child_process"), guessEditor = require_guess(), getArgumentsForPosition = require_get_args();
    function wrapErrorCallback(cb) {
      return (fileName, errorMessage) => {
        console.log(), console.log(
          colors.red("Could not open " + path.basename(fileName) + " in the editor.")
        ), errorMessage && (errorMessage[errorMessage.length - 1] !== "." && (errorMessage += "."), console.log(
          colors.red("The editor process exited with an error: " + errorMessage)
        )), console.log(), cb && cb(fileName, errorMessage);
      };
    }
    function isTerminalEditor(editor) {
      switch (editor) {
        case "vim":
        case "emacs":
        case "nano":
          return !0;
      }
      return !1;
    }
    var positionRE = /:(\d+)(:(\d+))?$/;
    function parseFile(file) {
      file.startsWith("file://") && (file = __require("url").fileURLToPath(file));
      let fileName = file.replace(positionRE, ""), match = file.match(positionRE), lineNumber = match && match[1], columnNumber = match && match[3];
      return {
        fileName,
        lineNumber,
        columnNumber
      };
    }
    var _childProcess = null;
    function launchEditor(file, specifiedEditor, onErrorCallback) {
      let parsed = parseFile(file), { fileName } = parsed, { lineNumber, columnNumber } = parsed;
      if (!fs.existsSync(fileName))
        return;
      typeof specifiedEditor == "function" && (onErrorCallback = specifiedEditor, specifiedEditor = void 0), onErrorCallback = wrapErrorCallback(onErrorCallback);
      let [editor, ...args] = guessEditor(specifiedEditor);
      if (!editor) {
        onErrorCallback(fileName, null);
        return;
      }
      if (process.platform === "linux" && fileName.startsWith("/mnt/") && /Microsoft/i.test(os.release()) && (fileName = path.relative("", fileName)), lineNumber) {
        let extraArgs = getArgumentsForPosition(editor, fileName, lineNumber, columnNumber);
        args.push.apply(args, extraArgs);
      } else
        args.push(fileName);
      if (_childProcess && isTerminalEditor(editor) && _childProcess.kill("SIGKILL"), process.platform === "win32") {
        let escapeCmdArgs2 = function(cmdArgs) {
          return cmdArgs.replace(/([&|<>,;=^])/g, "^$1");
        }, doubleQuoteIfNeeded2 = function(str) {
          return str.includes("^") ? `^"${str}^"` : str.includes(" ") ? `"${str}"` : str;
        };
        var escapeCmdArgs = escapeCmdArgs2, doubleQuoteIfNeeded = doubleQuoteIfNeeded2;
        let launchCommand = [editor, ...args.map(escapeCmdArgs2)].map(doubleQuoteIfNeeded2).join(" ");
        _childProcess = childProcess.exec(launchCommand, {
          stdio: "inherit",
          shell: !0
        });
      } else
        _childProcess = childProcess.spawn(editor, args, { stdio: "inherit" });
      _childProcess.on("exit", function(errorCode) {
        _childProcess = null, errorCode && onErrorCallback(fileName, "(code " + errorCode + ")");
      }), _childProcess.on("error", function(error) {
        let { code, message } = error;
        code === "ENOENT" && (message = `${message} ('${editor}' command does not exist in 'PATH')`), onErrorCallback(fileName, message);
      });
    }
    module.exports = launchEditor;
  }
});

// src/core-server/presets/common-preset.ts
import { existsSync as existsSync2 } from "node:fs";
import { readFile as readFile2 } from "node:fs/promises";
import {
  JsPackageManagerFactory,
  STORY_FILE_TEST_REGEXP,
  getBabelPresetEnvMajor,
  getDirectoryFromWorkingDir,
  getPreviewBodyTemplate,
  getPreviewHeadTemplate,
  loadEnvs,
  normalizeStories,
  optionalEnvToBoolean,
  removeAddon as removeAddonBase
} from "storybook/internal/common";
import { StoryIndexGenerator } from "storybook/internal/core-server";
import { loadCsf } from "storybook/internal/csf-tools";
import { logger as logger6 } from "storybook/internal/node-logger";
import { telemetry as telemetry10 } from "storybook/internal/telemetry";

// src/shared/open-service/services/extraction-service.server.ts
function subscribeExtractionServiceRefresh(moduleGraph, options) {
  let refreshExtracted = async (componentIds) => {
    let idsToRefresh = Array.from(componentIds).filter(
      (id) => options.query.get({ id }) !== void 0
    );
    idsToRefresh.length !== 0 && await Promise.all(
      idsToRefresh.map((id) => options.refreshComponent(id).catch(() => {
      }))
    );
  };
  moduleGraph.queries.latestStoryChanges.subscribe(void 0, async ({ data }) => {
    if (!data || data.revision === 0)
      return;
    let { storyFiles } = data, componentEntries = selectComponentEntriesByComponentId(
      Object.values((await options.getIndex()).entries)
    );
    if (storyFiles.length === 0) {
      await refreshExtracted(componentEntries.keys());
      return;
    }
    let componentEntryCandidates = Array.from(componentEntries).map(([id, entry]) => {
      let storyFilePath = getStoryImportPathFromEntry(entry);
      if (storyFilePath)
        return {
          id,
          storyIndexPath: toStoryIndexPath(storyFilePath, options.workingDir)
        };
    }).filter((candidate) => candidate !== void 0), bumpedComponentIds = /* @__PURE__ */ new Set();
    for (let storyFile of storyFiles) {
      let componentEntry = componentEntryCandidates.find(
        (candidate) => candidate.storyIndexPath === storyFile
      );
      componentEntry && bumpedComponentIds.add(componentEntry.id);
    }
    await refreshExtracted(bumpedComponentIds);
  });
}
function registerExtractionService(definition, options) {
  let { workingDir, getIndex, provider, queryName, extractCommand, extractAllCommand } = options;
  invariant(
    queryName in definition.queries,
    `Extraction service "${definition.id}" has no query named "${queryName}".`
  ), invariant(
    extractCommand in definition.commands && extractAllCommand in definition.commands,
    `Extraction service "${definition.id}" is missing command "${extractCommand}" or "${extractAllCommand}".`
  );
  let resolveComponentEntries = async () => selectComponentEntriesByComponentId(Object.values((await getIndex()).entries)), extractComponent = async (ctx, id) => {
    let entry = (await resolveComponentEntries()).get(id);
    if (!entry)
      throw new OpenServiceDocgenMissingComponentError({ id });
    let payload = await provider({ entry });
    if (!payload) {
      ctx.self.setState((state) => {
        delete state.components[id];
      });
      return;
    }
    return ctx.self.setState((state) => {
      state.components[id] = payload;
    }), payload;
  }, runtime = registerService(definition, {
    queries: {
      [queryName]: {
        staticInputs: async () => {
          let eligible = await resolveComponentEntries();
          return Array.from(eligible.keys(), (id) => ({ id }));
        }
      }
    },
    commands: {
      [extractCommand]: {
        handler: (input, ctx) => extractComponent(ctx, input.id)
      },
      [extractAllCommand]: {
        handler: async (_input, ctx) => {
          let ids = Array.from((await resolveComponentEntries()).keys());
          await Promise.all(ids.map((id) => extractComponent(ctx, id)));
        }
      }
    }
  }), moduleGraph = getService("core/module-graph");
  return subscribeExtractionServiceRefresh(moduleGraph, {
    workingDir,
    getIndex,
    query: runtime.queries[queryName],
    refreshComponent: (id) => runtime.commands[extractCommand]({ id })
  }), runtime;
}

// src/shared/open-service/services/docgen/definition.ts
import { defineService } from "storybook/open-service";
var docgenInputSchema = object({ id: string() }), argTypesSchema = custom(
  (value) => typeof value == "object" && value !== null && !Array.isArray(value)
), docgenErrorSchema = object({
  name: string(),
  message: string()
}), docgenJsDocTagsSchema = record(string(), array(string())), docgenComponentFields = {
  name: string(),
  path: string(),
  description: optional(string()),
  summary: optional(string()),
  jsDocTags: docgenJsDocTagsSchema,
  argTypes: optional(argTypesSchema),
  error: optional(docgenErrorSchema)
}, docgenSubcomponentFields = {
  ...docgenComponentFields,
  import: optional(string())
}, docgenSubcomponentSchema = looseObject(docgenSubcomponentFields), docgenPayloadSchema = looseObject({
  id: string(),
  ...docgenComponentFields,
  subcomponents: optional(record(string(), docgenSubcomponentSchema))
}), docgenOutputSchema = optional(docgenPayloadSchema), docgenServiceDef = defineService({
  id: "core/docgen",
  description: "Component documentation (name, description, props, JSDoc tags) keyed by component id.",
  initialState: { components: {} },
  queries: {
    docgen: {
      description: "Returns the docgen payload for one component id, or undefined when not loaded.",
      input: docgenInputSchema,
      output: docgenOutputSchema,
      handler: (input, ctx) => ctx.self.state.components[input.id],
      load: async (input, ctx) => {
        await ctx.self.commands.extractDocgen(input);
      },
      staticPath: (input) => docgenQueryStaticPath(input.id)
    },
    docgenForAllComponents: {
      description: "Returns docgen payloads for every component in the story index.",
      input: void_(),
      output: record(string(), docgenPayloadSchema),
      handler: (_input, ctx) => ctx.self.state.components,
      load: async (_input, ctx) => {
        await ctx.self.commands.extractAllDocgen(void 0);
      }
    }
  },
  commands: {
    extractDocgen: {
      description: "Resolves the story entry for a component id, runs the registered provider chain, writes the result into state, and returns it (or undefined when no provider produced docgen).",
      input: docgenInputSchema,
      output: docgenOutputSchema
      // Handler is supplied at registration time so it can close over the story index and the
      // composed experimental_docgenProvider chain.
    },
    extractAllDocgen: {
      description: "Extracts docgen for every component id in the story index by invoking `extractDocgen` for each.",
      input: undefined_(),
      output: void_()
      // Handler is supplied at registration time so it can close over the story index.
    }
  }
});

// src/shared/open-service/services/docgen/server.ts
function registerDocgenService(options) {
  return registerExtractionService(docgenServiceDef, {
    workingDir: options.workingDir ?? process.cwd(),
    getIndex: options.getIndex,
    provider: options.docgenProvider,
    queryName: "docgen",
    extractCommand: "extractDocgen",
    extractAllCommand: "extractAllDocgen"
  });
}

// src/shared/open-service/services/docgen/worker/docgen-worker-client.ts
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";
import { logger } from "storybook/internal/node-logger";
var WORKER_SPECIFIER = "storybook/internal/docgen-worker", DEFAULT_TASK_TIMEOUT_MS = 12e4;
function errorLikeToError(errorLike) {
  let error = new Error(errorLike.message);
  return errorLike.name && (error.name = errorLike.name), errorLike.stack && (error.stack = errorLike.stack), error;
}
var DocgenWorker = class {
  constructor(scriptPath, descriptors, taskTimeoutMs = DEFAULT_TASK_TIMEOUT_MS) {
    this.taskTimeoutMs = taskTimeoutMs;
    this.pending = /* @__PURE__ */ new Map();
    // Captured from the `ready` promise executor (which runs synchronously) so `fail()` can settle
    // `ready` if the worker dies before sending `init`. No-op default keeps TS definite-assignment happy.
    this.rejectReady = () => {
    };
    this.nextId = 0;
    this.dead = !1;
    this.worker = new Worker(scriptPath), this.worker.unref(), this.worker.on("message", (msg) => this.handleMessage(msg)), this.worker.on("error", (error) => this.fail(error)), this.worker.on("exit", (code) => {
      this.dead || this.fail(new Error(`docgen worker exited unexpectedly with code ${code}`));
    }), this.ready = new Promise((resolve2, reject) => {
      this.rejectReady = reject;
      let onMessage = (msg) => {
        msg.type === "init" && (this.worker.off("message", onMessage), msg.error ? reject(errorLikeToError(msg.error)) : resolve2());
      };
      this.worker.on("message", onMessage);
    }), this.ready.catch(() => {
    }), this.post({ type: "init", descriptors });
  }
  async extract(entry) {
    if (this.dead)
      throw new Error("docgen worker is no longer running");
    return await this.ready, new Promise((resolve2, reject) => {
      let id = this.nextId++, pending = { resolve: resolve2, reject };
      this.taskTimeoutMs > 0 && (pending.timer = setTimeout(() => {
        this.pending.delete(id), reject(new Error(`docgen worker extract ${id} timed out after ${this.taskTimeoutMs}ms`));
      }, this.taskTimeoutMs), pending.timer.unref?.()), this.pending.set(id, pending), this.post({ type: "extract", id, entry });
    });
  }
  post(msg) {
    this.worker.postMessage(msg);
  }
  handleMessage(msg) {
    if (msg.type !== "extract")
      return;
    let pending = this.pending.get(msg.id);
    pending && (pending.timer && clearTimeout(pending.timer), this.pending.delete(msg.id), msg.error ? pending.reject(errorLikeToError(msg.error)) : pending.resolve(msg.payload));
  }
  /** Reject everything in flight and tear the worker down; used on fatal worker failure. */
  fail(error) {
    this.dead || (logger.debug(`docgen worker failure: ${error.message}`), this.dead = !0, this.rejectReady(error), this.rejectAllPending(error), this.worker.terminate().catch(() => 0));
  }
  rejectAllPending(error) {
    for (let [, pending] of this.pending)
      pending.timer && clearTimeout(pending.timer), pending.reject(error);
    this.pending.clear();
  }
};
function resolveWorkerScriptPath() {
  try {
    let scriptPath = fileURLToPath(importMetaResolve(WORKER_SPECIFIER));
    return existsSync(scriptPath) ? scriptPath : void 0;
  } catch {
    return;
  }
}
function createDocgenWorkerClient(descriptors) {
  let scriptPath = resolveWorkerScriptPath();
  if (!scriptPath) {
    logger.debug(
      "docgen worker disabled: compiled worker script not found (running from source without a build?)"
    );
    return;
  }
  let worker;
  return {
    async extract(entry) {
      return worker ??= new DocgenWorker(scriptPath, descriptors), worker.extract(entry);
    }
  };
}

// src/shared/open-service/services/story-docs/definition.ts
import { defineService as defineService2 } from "storybook/open-service";
var storyDocsInputSchema = object({ id: string() }), storyDocsErrorSchema = object({
  name: string(),
  message: string()
}), storyDocSchema = object({
  id: string(),
  name: string(),
  snippet: optional(string()),
  description: optional(string()),
  summary: optional(string()),
  error: optional(storyDocsErrorSchema)
}), storyDocsPayloadSchema = object({
  id: string(),
  name: string(),
  path: string(),
  import: optional(string()),
  stories: record(string(), storyDocSchema),
  error: optional(storyDocsErrorSchema)
}), storyDocsOutputSchema = optional(storyDocsPayloadSchema), storyDocsServiceDef = defineService2({
  id: "core/story-docs",
  description: "Story documentation (snippets, descriptions, imports) keyed by component id.",
  initialState: { components: {} },
  queries: {
    storyDocs: {
      description: "Returns the story-docs payload for one component id, or undefined when not loaded.",
      input: storyDocsInputSchema,
      output: storyDocsOutputSchema,
      handler: (input, ctx) => Object.hasOwn(ctx.self.state.components, input.id) ? ctx.self.state.components[input.id] : void 0,
      load: async (input, ctx) => {
        await ctx.self.commands.extractStoryDocs(input);
      },
      staticPath: (input) => storyDocsQueryStaticPath(input.id)
    },
    storyDocsForAllComponents: {
      description: "Returns story-docs payloads for every component in the story index.",
      input: void_(),
      output: record(string(), storyDocsPayloadSchema),
      handler: (_input, ctx) => ctx.self.state.components,
      load: async (_input, ctx) => {
        await ctx.self.commands.extractAllStoryDocs(void 0);
      }
    }
  },
  commands: {
    extractStoryDocs: {
      description: "Resolves the story entry for a component id, runs the registered provider chain, writes the result into state, and returns it (or undefined when no provider produced story docs).",
      input: storyDocsInputSchema,
      output: storyDocsOutputSchema
    },
    extractAllStoryDocs: {
      description: "Extracts story docs for every component id in the story index by invoking `extractStoryDocs` for each.",
      input: undefined_(),
      output: void_()
    }
  }
});

// src/shared/open-service/services/story-docs/server.ts
function registerStoryDocsService(options) {
  return registerExtractionService(storyDocsServiceDef, {
    workingDir: options.workingDir ?? process.cwd(),
    getIndex: options.getIndex,
    provider: options.storyDocsProvider,
    queryName: "storyDocs",
    extractCommand: "extractStoryDocs",
    extractAllCommand: "extractAllStoryDocs"
  });
}

// src/core-server/presets/common-preset.ts
var import_ts_dedent = __toESM(require_dist(), 1);

// src/core-server/server-channel/ai-setup-channel.ts
import {
  AI_SETUP_ANALYTICS_REQUEST,
  AI_SETUP_ANALYTICS_RESPONSE
} from "storybook/internal/core-events";
import {
  getLastEvents,
  getStorybookMetadata,
  isStoryCreatedByAISetup as isStoryCreatedByAISetup2,
  telemetry
} from "storybook/internal/telemetry";
import { logger as logger2 } from "storybook/internal/node-logger";

// src/core-server/utils/wait-for-idle-vitest.ts
async function waitForIdleVitest(maxWaitMs = 1800 * 1e3, pollIntervalMs = 60 * 1e3) {
  let deadline = Date.now() + maxWaitMs;
  for (; Date.now() < deadline; ) {
    try {
      let state = fullTestProviderStore.getFullState();
      if (!Object.values(state).some((s) => s === "test-provider-state:running"))
        return !0;
    } catch {
      return !0;
    }
    await new Promise((resolve2) => setTimeout(resolve2, pollIntervalMs));
  }
  return !1;
}

// src/shared/utils/ai-checklist-flags.ts
import { resolve } from "node:path";
import { cache } from "storybook/internal/common";
function isProjectScopedFlag(value) {
  return typeof value == "object" && value !== null && "configDir" in value && typeof value.configDir == "string";
}
async function readProjectScopedFlag(key, configDir) {
  try {
    let value = await cache.get(key);
    if (isProjectScopedFlag(value) && value.configDir === resolve(configDir))
      return value;
  } catch {
  }
}
async function hasAiInitOptIn(configDir) {
  return (await readProjectScopedFlag("ai-init-opt-in", configDir))?.answer === !0;
}
async function hasAiSetupRun(configDir) {
  return !!await readProjectScopedFlag("ai-setup-ran", configDir);
}
async function getAiSetupRunId(configDir) {
  return (await readProjectScopedFlag("ai-setup-ran", configDir))?.runId;
}

// src/core-server/server-channel/ai-setup-channel.ts
function initAIAnalyticsChannel(channel, options, getStoryIndexGeneratorPromise) {
  return channel.on(AI_SETUP_ANALYTICS_REQUEST, async () => {
    let stats = {}, runId;
    try {
      let lastEvents = await getLastEvents(), lastAISetup = lastEvents?.["ai-setup"], lastSetupStoryScoringRun = lastEvents?.["ai-setup-final-scoring"];
      if (runId = await getAiSetupRunId(options.configDir), !lastAISetup || lastSetupStoryScoringRun && lastSetupStoryScoringRun.body.payload.runId === lastAISetup.body.payload.runId)
        return;
      let metadata = await getStorybookMetadata(options.configDir), isReactStorybook = metadata?.renderer?.includes("@storybook/react"), hasVitestAddon = !!metadata?.addons && Object.keys(metadata.addons).some(
        (addonKey) => addonKey.includes("@storybook/addon-vitest")
      );
      if (!isReactStorybook || !hasVitestAddon)
        return;
      if (!await waitForIdleVitest()) {
        logger2.debug("AI_SETUP_ANALYTICS_REQUEST timed out waiting for vitest to be available.");
        return;
      }
      let generatorPromise = getStoryIndexGeneratorPromise?.();
      if (!generatorPromise) {
        logger2.debug(
          "AI_SETUP_ANALYTICS_REQUEST could not proceed as the index generator is not ready."
        );
        return;
      }
      let indexAndStats = await (await generatorPromise).getIndexAndStats();
      if (!indexAndStats) {
        logger2.debug("AI_SETUP_ANALYTICS_REQUEST could not proceed as the index is not ready.");
        return;
      }
      let aiStoryFiles = /* @__PURE__ */ new Set(), aiStoryCount = 0;
      for (let entry of Object.values(indexAndStats.storyIndex.entries))
        isStoryCreatedByAISetup2(entry) && (aiStoryFiles.add(entry.importPath), aiStoryCount++);
      if (aiStoryFiles.size > 0) {
        let aiTestRunResult = await runStoryTests([...aiStoryFiles]);
        telemetry("ai-setup-final-scoring", {
          stats: {
            fileCount: aiStoryFiles.size,
            storyCount: aiStoryCount,
            testRunDuration: aiTestRunResult.duration
          },
          runId,
          results: aiTestRunResult.summary,
          ...aiTestRunResult.runError ? { runError: aiTestRunResult.runError } : {}
        });
      } else
        telemetry("ai-setup-final-scoring", {
          stats: {
            fileCount: 0,
            storyCount: 0,
            testRunDuration: 0
          },
          runId,
          runError: "No stories found that were generated by ai setup"
        });
    } catch {
      telemetry("ai-setup-final-scoring", {
        stats,
        runId,
        runError: "Unknown error during AI story scoring"
      });
    } finally {
      channel.emit(AI_SETUP_ANALYTICS_RESPONSE);
    }
  }), channel;
}

// src/core-server/server-channel/create-new-story-channel.ts
import {
  CREATE_NEW_STORYFILE_REQUEST,
  CREATE_NEW_STORYFILE_RESPONSE
} from "storybook/internal/core-events";
import { telemetry as telemetry2 } from "storybook/internal/telemetry";
function initCreateNewStoryChannel(channel, options) {
  return channel.on(
    CREATE_NEW_STORYFILE_REQUEST,
    async (data) => {
      let result = await generateStoryFile(data.payload, options);
      result.success ? (channel.emit(CREATE_NEW_STORYFILE_RESPONSE, {
        success: !0,
        id: data.id,
        payload: {
          storyId: result.storyId,
          storyFilePath: result.storyFilePath,
          exportedStoryName: result.exportedStoryName
        },
        error: null
      }), telemetry2("create-new-story-file", {
        success: !0
      })) : (channel.emit(CREATE_NEW_STORYFILE_RESPONSE, {
        success: !1,
        id: data.id,
        payload: result.errorType === "STORY_FILE_EXISTS" ? {
          type: "STORY_FILE_EXISTS",
          kind: result.kind
        } : void 0,
        error: result.error || "Unknown error occurred"
      }), await telemetry2("create-new-story-file", {
        success: !1,
        error: result.errorType || result.error
      }));
    }
  ), channel;
}

// src/core-server/server-channel/file-search-channel.ts
import { readFile } from "node:fs/promises";
import { dirname, join as join2 } from "node:path";
import { extractRenderer, getFrameworkName, getProjectRoot } from "storybook/internal/common";
import {
  FILE_COMPONENT_SEARCH_REQUEST,
  FILE_COMPONENT_SEARCH_RESPONSE
} from "storybook/internal/core-events";
import { telemetry as telemetry3 } from "storybook/internal/telemetry";

// src/core-server/utils/parser/generic-parser.ts
import { parser, types as t } from "storybook/internal/babel";
var GenericParser = class {
  /**
   * Parse the content of a file and return the exports
   *
   * @param content The content of the file
   * @returns The exports of the file
   */
  async parse(content) {
    let ast = parser.parse(content, {
      allowImportExportEverywhere: !0,
      allowAwaitOutsideFunction: !0,
      allowNewTargetOutsideFunction: !0,
      allowReturnOutsideFunction: !0,
      allowUndeclaredExports: !0,
      plugins: [
        // Language features
        "typescript",
        "jsx",
        // Latest ECMAScript features
        "asyncGenerators",
        "bigInt",
        "classProperties",
        "classPrivateProperties",
        "classPrivateMethods",
        "classStaticBlock",
        "dynamicImport",
        "exportNamespaceFrom",
        "logicalAssignment",
        "moduleStringNames",
        "nullishCoalescingOperator",
        "numericSeparator",
        "objectRestSpread",
        "optionalCatchBinding",
        "optionalChaining",
        "privateIn",
        "regexpUnicodeSets",
        "topLevelAwait",
        // ECMAScript proposals
        "asyncDoExpressions",
        "decimal",
        "decorators",
        "decoratorAutoAccessors",
        "deferredImportEvaluation",
        "destructuringPrivate",
        "doExpressions",
        "explicitResourceManagement",
        "exportDefaultFrom",
        "functionBind",
        "functionSent",
        "importAttributes",
        "importReflection",
        "moduleBlocks",
        "partialApplication",
        "recordAndTuple",
        "sourcePhaseImports",
        "throwExpressions"
      ]
    }), exports = [];
    return ast.program.body.forEach(function(node) {
      t.isExportNamedDeclaration(node) ? (t.isFunctionDeclaration(node.declaration) && t.isIdentifier(node.declaration.id) && exports.push({
        name: node.declaration.id.name,
        default: !1
      }), t.isClassDeclaration(node.declaration) && t.isIdentifier(node.declaration.id) && exports.push({
        name: node.declaration.id.name,
        default: !1
      }), node.declaration === null && node.specifiers.length > 0 && node.specifiers.forEach((specifier) => {
        t.isExportSpecifier(specifier) && t.isIdentifier(specifier.exported) && exports.push({
          name: specifier.exported.name,
          default: !1
        });
      }), t.isVariableDeclaration(node.declaration) && node.declaration.declarations.forEach((declaration) => {
        t.isVariableDeclarator(declaration) && t.isIdentifier(declaration.id) && exports.push({
          name: declaration.id.name,
          default: !1
        });
      })) : t.isExportDefaultDeclaration(node) && exports.push({
        name: "default",
        default: !0
      });
    }), { exports };
  }
};

// src/core-server/utils/parser/index.ts
function getParser(renderer) {
  return new GenericParser();
}

// src/core-server/utils/search-files.ts
var FILE_EXTENSIONS = ["js", "mjs", "cjs", "jsx", "mts", "ts", "tsx", "cts"], IGNORED_FILES = [
  "**/node_modules/**",
  "**/*.spec.*",
  "**/*.test.*",
  "**/*.stories.*",
  "**/storybook-static/**"
];
async function searchFiles({
  searchQuery,
  cwd,
  ignoredFiles = IGNORED_FILES,
  fileExtensions = FILE_EXTENSIONS
}) {
  let { globby, isDynamicPattern } = await import("../../_node-chunks/globby-5UZDOYO6.js"), hasSearchSpecialGlobChars = isDynamicPattern(searchQuery, { cwd }), searchQueryHasExtension = /(\.[a-z]+)$/i.test(searchQuery), fileExtensionsPattern = `{${fileExtensions.join(",")}}`, globbedSearchQuery = hasSearchSpecialGlobChars ? searchQuery : searchQueryHasExtension ? [`**/*${searchQuery}*`, `**/*${searchQuery}*/**`] : [
    `**/*${searchQuery}*.${fileExtensionsPattern}`,
    `**/*${searchQuery}*/**/*.${fileExtensionsPattern}`
  ];
  return (await globby(globbedSearchQuery, {
    ignore: ignoredFiles,
    gitignore: !0,
    caseSensitiveMatch: !1,
    cwd,
    objectMode: !0
  })).map((entry) => entry.path).filter((entry) => fileExtensions.some((ext) => entry.endsWith(`.${ext}`)));
}

// src/core-server/server-channel/file-search-channel.ts
async function initFileSearchChannel(channel, options) {
  return channel.on(
    FILE_COMPONENT_SEARCH_REQUEST,
    async (data) => {
      let searchQuery = data.id;
      try {
        if (!searchQuery)
          return;
        let frameworkName = await getFrameworkName(options), rendererName = await extractRenderer(frameworkName), entries = (await searchFiles({
          searchQuery,
          cwd: getProjectRoot()
        })).map(async (file) => {
          let parser3 = getParser(rendererName);
          try {
            let content = await readFile(join2(getProjectRoot(), file), "utf-8"), { storyFileName } = getStoryMetadata(join2(getProjectRoot(), file)), dir = dirname(file), storyFileExists = doesStoryFileExist(join2(getProjectRoot(), dir), storyFileName), info = await parser3.parse(content);
            return {
              filepath: file,
              exportedComponents: info.exports,
              storyFileExists
            };
          } catch (e) {
            return telemetry3("create-new-story-file-search", {
              success: !1,
              error: `Could not parse file: ${e}`
            }), {
              filepath: file,
              storyFileExists: !1,
              exportedComponents: null
            };
          }
        });
        telemetry3("create-new-story-file-search", {
          success: !0,
          payload: {
            fileCount: entries.length
          }
        }), channel.emit(FILE_COMPONENT_SEARCH_RESPONSE, {
          success: !0,
          id: searchQuery,
          payload: {
            files: await Promise.all(entries)
          },
          error: null
        });
      } catch (e) {
        channel.emit(FILE_COMPONENT_SEARCH_RESPONSE, {
          success: !1,
          id: searchQuery ?? "",
          error: `An error occurred while searching for components in the project.
${e?.message}`
        }), telemetry3("create-new-story-file-search", {
          success: !1,
          error: `An error occurred while searching for components: ${e}`
        });
      }
    }
  ), channel;
}

// src/core-server/server-channel/ghost-stories-channel.ts
import { GHOST_STORIES_REQUEST, GHOST_STORIES_RESPONSE } from "storybook/internal/core-events";
import { getLastEvents as getLastEvents2, getStorybookMetadata as getStorybookMetadata2, telemetry as telemetry4 } from "storybook/internal/telemetry";
var SkipGhostStoriesTelemetry = class extends Error {
};
function initGhostStoriesChannel(channel, options) {
  return channel.on(GHOST_STORIES_REQUEST, async () => {
    let stats = {}, aiSetupRunId = await getAiSetupRunId(options.configDir);
    try {
      await telemetry4("ghost-stories", async () => {
        try {
          let ghostRunStart = Date.now(), lastEvents = await getLastEvents2(), lastInit = lastEvents?.init, lastAISetup = lastEvents?.["ai-setup"], lastSetupStoryScoringRun = lastEvents?.["ai-setup-final-scoring"], lastGhostStoriesRun = lastEvents?.["ghost-stories"];
          if (!(lastAISetup ?? lastInit))
            throw new SkipGhostStoriesTelemetry();
          if (lastGhostStoriesRun && lastSetupStoryScoringRun.body.payload.runId === lastAISetup.body.payload.runId)
            throw new SkipGhostStoriesTelemetry();
          let metadata = await getStorybookMetadata2(options.configDir), isReactStorybook = metadata?.renderer?.includes("@storybook/react"), hasVitestAddon = !!metadata?.addons && Object.keys(metadata.addons).some(
            (addonKey) => addonKey.includes("@storybook/addon-vitest")
          );
          if (!isReactStorybook || !hasVitestAddon)
            throw new SkipGhostStoriesTelemetry();
          if (!await waitForIdleVitest())
            return {
              stats,
              aiSetupRunId,
              runError: "Vitest busy, couldn't run ghost stories"
            };
          let candidateAnalysisStart = Date.now(), candidatesResult = await getComponentCandidates();
          if (stats.candidateAnalysisDuration = Date.now() - candidateAnalysisStart, stats.globMatchCount = candidatesResult.globMatchCount, stats.analyzedCount = candidatesResult.analyzedCount ?? 0, stats.avgComplexity = candidatesResult.avgComplexity ?? 0, stats.candidateCount = candidatesResult.candidates.length, candidatesResult.error)
            return stats.totalRunDuration = Date.now() - ghostRunStart, {
              stats,
              aiSetupRunId,
              runError: candidatesResult.error
            };
          if (candidatesResult.candidates.length === 0)
            return stats.totalRunDuration = Date.now() - ghostRunStart, {
              stats,
              aiSetupRunId,
              runError: "No candidates found"
            };
          let testRunResult = await runStoryTests(candidatesResult.candidates, {
            ghostRun: !0
          });
          return stats.totalRunDuration = Date.now() - ghostRunStart, stats.testRunDuration = testRunResult.duration, testRunResult.runError ? {
            stats,
            aiSetupRunId,
            runError: testRunResult.runError
          } : {
            stats,
            aiSetupRunId,
            results: testRunResult.summary
          };
        } catch (error) {
          if (error instanceof SkipGhostStoriesTelemetry)
            throw error;
          return {
            stats,
            aiSetupRunId,
            runError: "Unknown error during ghost run"
          };
        }
      });
    } catch (error) {
      if (!(error instanceof SkipGhostStoriesTelemetry))
        throw error;
    } finally {
      channel.emit(GHOST_STORIES_RESPONSE);
    }
  }), channel;
}

// src/core-server/server-channel/open-in-editor-channel.ts
var import_launch_editor = __toESM(require_launch_editor(), 1);
import { OPEN_IN_EDITOR_REQUEST, OPEN_IN_EDITOR_RESPONSE } from "storybook/internal/core-events";
import { telemetry as telemetry5 } from "storybook/internal/telemetry";
async function initOpenInEditorChannel(channel) {
  return channel.on(OPEN_IN_EDITOR_REQUEST, async (payload) => {
    let sendTelemetry = (data) => {
      telemetry5("open-in-editor", data);
    };
    try {
      let { file: targetFile, line, column } = payload;
      if (!targetFile)
        throw new Error("No file was provided to open");
      let location = typeof line == "number" ? `${targetFile}:${line}${typeof column == "number" ? `:${column}` : ""}` : targetFile;
      await new Promise((resolve2, reject) => {
        (0, import_launch_editor.default)(location, void 0, (_fileName, errorMessage) => {
          errorMessage ? reject(new Error(errorMessage)) : resolve2();
        });
      }), channel.emit(OPEN_IN_EDITOR_RESPONSE, {
        file: targetFile,
        line,
        column,
        error: null
      }), sendTelemetry({ success: !0 });
    } catch (e) {
      let error = e?.message || "Failed to open in editor";
      channel.emit(OPEN_IN_EDITOR_RESPONSE, {
        error,
        ...payload
      }), sendTelemetry({ success: !1, error });
    }
  }), channel;
}

// src/shared/review/features.ts
var isReviewFeatureEnabled = (features2) => features2?.experimentalReview !== !1 && !!features2?.changeDetection;

// src/core-server/server-channel/review-channel.ts
var STALE_GRACE_MS = 1e4, defaultSubscribeToModuleGraphChanges = (onChange) => {
  try {
    return getService("core/module-graph").queries.getGraphRevision.subscribe(void 0, ({ data: revision }) => {
      revision !== void 0 && revision > 0 && onChange();
    });
  } catch {
    return () => {
    };
  }
};
function prepareReview(payload) {
  let { stale: _untrustedStale, ...rest } = payload;
  return {
    ...rest,
    // Server-side timestamp is authoritative for "Created x minutes ago".
    createdAt: Date.now()
  };
}
function initReviewChannel(channel, options = {}) {
  let subscribeToModuleGraphChanges = options.subscribeToModuleGraphChanges ?? defaultSubscribeToModuleGraphChanges, cached;
  return channel.on(REVIEW_EVENTS.PUSH_REVIEW, (payload) => {
    cached = prepareReview(payload), channel.emit(REVIEW_EVENTS.DISPLAY_REVIEW, cached);
  }), channel.on(REVIEW_EVENTS.REQUEST_REVIEW, () => {
    cached && channel.emit(REVIEW_EVENTS.DISPLAY_REVIEW, cached);
  }), channel.on(REVIEW_EVENTS.DISMISS_REVIEW, (returnSearch) => {
    cached = void 0, channel.emit(REVIEW_EVENTS.REVIEW_DISMISSED, returnSearch ?? null);
  }), subscribeToModuleGraphChanges(() => {
    !cached || cached.stale || cached.createdAt === void 0 || Date.now() < cached.createdAt + STALE_GRACE_MS || (cached = { ...cached, stale: !0 }, channel.emit(REVIEW_EVENTS.REVIEW_STALE));
  }), channel;
}

// src/core-server/server-channel/telemetry-channel.ts
import {
  AI_PROMPT_NUDGE,
  PREVIEW_INITIALIZED,
  SHARE_ISOLATE_MODE,
  SIDEBAR_FILTER_CHANGED
} from "storybook/internal/core-events";
import {
  getLastEvents as getLastEvents3,
  getSessionId,
  telemetry as telemetry6
} from "storybook/internal/telemetry";
var makePayload = (userAgent, lastInit, sessionId) => {
  let payload = {
    userAgent,
    isNewUser: !1,
    timeSinceInit: void 0
  };
  return sessionId && lastInit?.body?.sessionId === sessionId && (payload.timeSinceInit = Date.now() - lastInit.timestamp, payload.isNewUser = !!lastInit.body.payload.newUser), payload;
};
function initTelemetryChannel(channel) {
  channel.on(PREVIEW_INITIALIZED, async ({ userAgent }) => {
    try {
      let sessionId = await getSessionId(), lastEvents = await getLastEvents3(), lastInit = lastEvents.init;
      if (!lastEvents["preview-first-load"]) {
        let payload = makePayload(userAgent, lastInit, sessionId);
        telemetry6("preview-first-load", payload);
      }
    } catch {
    }
  }), channel.on(SHARE_ISOLATE_MODE, async () => {
    telemetry6("share", { action: "isolate-mode-opened" });
  }), channel.on(SIDEBAR_FILTER_CHANGED, (payload) => {
    telemetry6("sidebar-filter", payload);
  }), channel.on(AI_PROMPT_NUDGE, async ({ id, origin }) => {
    telemetry6("ai-prompt-nudge", { id, origin });
  }), channel.on(REVIEW_EVENTS.PAGEVIEW, ({ page, reviewCreatedAt }) => {
    telemetry6("review", { action: "pageview", source: "mcp-review", page, reviewCreatedAt });
  });
}

// src/core-server/utils/checklist.ts
import { createFileSystemCache, resolvePathInStorybookCache } from "storybook/internal/common";
import { experimental_UniversalStore } from "storybook/internal/core-server";
import {
  AI_SETUP_ANALYTICS_REQUEST as AI_SETUP_ANALYTICS_REQUEST2,
  GHOST_STORIES_REQUEST as GHOST_STORIES_REQUEST2,
  STORY_INDEX_INVALIDATED
} from "storybook/internal/core-events";
import { logger as logger3 } from "storybook/internal/node-logger";
import { telemetry as telemetry7 } from "storybook/internal/telemetry";

// src/shared/checklist-store/checklistData.state.ts
var initialState = {
  items: {
    accessibilityTests: { status: "open" },
    aiSetup: { status: "open" },
    autodocs: { status: "open" },
    ciTests: { status: "open" },
    controls: { status: "open" },
    coverage: { status: "open" },
    guidedTour: { status: "open" },
    installA11y: { status: "open" },
    installChromatic: { status: "open" },
    installDocs: { status: "open" },
    installVitest: { status: "open" },
    mdxDocs: { status: "open" },
    moreComponents: { status: "open" },
    moreStories: { status: "open" },
    onboardingSurvey: { status: "open" },
    organizeStories: { status: "open" },
    renderComponent: { status: "open" },
    runTests: { status: "open" },
    publishStorybook: { status: "open" },
    shareStorybook: { status: "open" },
    viewports: { status: "open" },
    visualTests: { status: "open" },
    whatsNewStorybook10: { status: "open" },
    writeInteractions: { status: "open" }
  },
  widget: {}
};

// src/shared/checklist-store/index.ts
var UNIVERSAL_CHECKLIST_STORE_OPTIONS = {
  id: "storybook/checklist",
  initialState
};

// src/core-server/utils/checklist.ts
async function initializeChecklist(channel, getStoryIndexGeneratorPromise, configDir) {
  try {
    let store = experimental_UniversalStore.create({
      ...UNIVERSAL_CHECKLIST_STORE_OPTIONS,
      leader: !0
    }), cache2 = createFileSystemCache({
      basePath: resolvePathInStorybookCache("checklist"),
      ns: "storybook"
    }), [[userState, saveUserState], [projectState, saveProjectState]] = await Promise.all([
      globalSettings().then((settings) => {
        let save = throttle(() => settings.save(), 1e3), state = {
          items: settings.value.checklist?.items ?? {},
          widget: settings.value.checklist?.widget ?? {}
        };
        return [state, ({
          items = state.items,
          widget = state.widget
        }) => {
          settings.value.checklist = { items, widget }, save();
        }];
      }),
      cache2.get("state").then((cachedState) => [{ items: cachedState?.items ?? {} }, ({ items }) => cache2.set("state", { items })])
    ]);
    store.setState(
      (value) => ({
        ...toMerged(value, toMerged(userState, projectState)),
        loaded: !0
      })
    ), hasAiSetupRun(configDir).then((hasSetupRun) => {
      hasSetupRun && store.setState((state) => ({ ...state, aiSetupRun: !0 }));
    }).catch(() => {
    }), hasAiInitOptIn(configDir).then((hasOptedIn) => {
      store.setState((state) => ({ ...state, aiOptIn: hasOptedIn }));
    }).catch(() => {
    });
    let isAiSetupCompleted = async () => {
      try {
        if (!await hasAiSetupRun(configDir))
          return !1;
        let generatorPromise = getStoryIndexGeneratorPromise?.();
        if (!generatorPromise)
          return !1;
        let entries = (await (await generatorPromise)?.getIndexAndStats?.())?.storyIndex?.entries;
        return Object.values(entries || []).some(isStoryCreatedByAISetup);
      } catch {
        return !1;
      }
    }, markAiSetupDone = async () => await isAiSetupCompleted() ? (store.getState().items.aiSetup?.status !== "done" && store.setState((state) => ({
      ...state,
      items: {
        ...state.items,
        aiSetup: { ...state.items.aiSetup, status: "done" }
      }
    })), !0) : !1, AI_IDLE_DELAY_MS = 240 * 1e3, analyticsTimer, analyticsEmitted = !1, throttledSyncAiSetupStatus = throttle(() => markAiSetupDone().catch(() => {
    }), 1e3), scheduleIdleCheck = () => {
      !channel || analyticsEmitted || (throttledSyncAiSetupStatus(), clearTimeout(analyticsTimer), analyticsTimer = setTimeout(async () => {
        if (!store.getState().aiSetupRun)
          return;
        let now = Date.now(), [lastTestRun, lastSelfHealing] = await Promise.all([
          get("test-run").catch(() => {
          }),
          get("ai-setup-self-healing-scoring").catch(() => {
          })
        ]);
        if ([lastTestRun, lastSelfHealing].some(
          (e) => e && now - e.timestamp < AI_IDLE_DELAY_MS
        )) {
          scheduleIdleCheck();
          return;
        }
        await markAiSetupDone(), store.getState().items.aiSetup?.status === "done" && (analyticsEmitted = !0, channel.off(STORY_INDEX_INVALIDATED, onIndexInvalidated), unsubscribeTestProvider(), channel.emit(GHOST_STORIES_REQUEST2), channel.emit(AI_SETUP_ANALYTICS_REQUEST2));
      }, AI_IDLE_DELAY_MS));
    };
    markAiSetupDone().then((detected) => {
      detected && scheduleIdleCheck();
    });
    let onIndexInvalidated = () => {
      analyticsEmitted || scheduleIdleCheck();
    };
    channel && channel.on(STORY_INDEX_INVALIDATED, onIndexInvalidated);
    let unsubscribeTestProvider = universalTestProviderStore.onStateChange(() => {
      analyticsEmitted || scheduleIdleCheck();
    });
    store.onStateChange((state, previousState) => {
      let entries = Object.entries(state.items), projectValues = {}, userValues = {};
      if (entries.forEach(([id, { status, mutedAt }]) => {
        status === "done" ? projectValues[id] = { status } : (status === "accepted" || status === "skipped") && (userValues[id] = { status }), mutedAt && (userValues[id] = {
          ...userValues[id],
          mutedAt
        });
      }), saveProjectState({ items: projectValues }), saveUserState({ items: userValues, widget: state.widget }), !previousState.loaded)
        return;
      let { mutedItems, statusItems } = entries.reduce(
        (acc, [item, { mutedAt, status }]) => {
          let prev = previousState.items[item];
          return mutedAt !== prev?.mutedAt && acc.mutedItems.push(item), status !== prev?.status && acc.statusItems.push(item), acc;
        },
        { mutedItems: [], statusItems: [] }
      );
      mutedItems.length > 0 && telemetry7("onboarding-checklist-muted", {
        items: mutedItems,
        completedItems: entries.reduce((acc, [id, { status }]) => status === "done" || status === "accepted" ? acc.concat([id]) : acc, []),
        skippedItems: entries.reduce((acc, [id, { status }]) => status === "skipped" ? acc.concat([id]) : acc, [])
      }), statusItems.forEach((item) => {
        let { status } = state.items[item];
        telemetry7("onboarding-checklist-status", { item, status });
      });
    });
  } catch (err) {
    logger3.error("Failed to initialize checklist"), logger3.error(err);
  }
}

// src/core-server/utils/constants.ts
var defaultStaticDirs = [
  {
    from: join(resolvePackageDir("storybook"), "assets/browser"),
    to: "/sb-common-assets"
  }
], defaultFavicon = join(resolvePackageDir("storybook"), "assets/browser/favicon.svg");

// src/core-server/utils/save-story/save-story.ts
import { writeFile } from "node:fs/promises";
import { basename, join as join3 } from "node:path";
import { formatFileContent } from "storybook/internal/common";
import {
  SAVE_STORY_REQUEST,
  SAVE_STORY_RESPONSE,
  STORY_RENDERED
} from "storybook/internal/core-events";
import { storyNameFromExport, toId } from "storybook/internal/csf";
import { printCsf, readCsf } from "storybook/internal/csf-tools";
import { logger as logger4 } from "storybook/internal/node-logger";
import { isExampleStoryId, telemetry as telemetry8 } from "storybook/internal/telemetry";

// src/core-server/utils/save-story/duplicate-story-with-new-name.ts
import { types as t2, traverse } from "storybook/internal/babel";

// src/core-server/utils/save-story/utils.ts
var SaveStoryError = class extends Error {
};

// src/core-server/utils/save-story/duplicate-story-with-new-name.ts
var duplicateStoryWithNewName = (csfFile, storyName, newStoryName) => {
  let node = csfFile._storyExports[storyName], cloned = t2.cloneNode(node);
  if (!cloned)
    throw new SaveStoryError("cannot clone Node");
  let found = !1;
  if (traverse(cloned, {
    Identifier(path) {
      found || path.node.name === storyName && (found = !0, path.node.name = newStoryName);
    },
    ObjectProperty(path) {
      let key = path.get("key");
      key.isIdentifier() && key.node.name === "args" && path.remove();
    },
    noScope: !0
  }), !(t2.isCallExpression(cloned.init) && t2.isMemberExpression(cloned.init.callee) && t2.isIdentifier(cloned.init.callee.property) && cloned.init.callee.property.name === "story") && (t2.isArrowFunctionExpression(cloned.init) || t2.isCallExpression(cloned.init)))
    throw new SaveStoryError("Creating a new story based on a CSF2 story is not supported");
  return traverse(csfFile._ast, {
    Program(path) {
      path.pushContainer(
        "body",
        t2.exportNamedDeclaration(t2.variableDeclaration("const", [cloned]))
      );
    }
  }), cloned;
};

// src/core-server/utils/save-story/update-args-in-csf-file.ts
import { types as t4, traverse as traverse2 } from "storybook/internal/babel";

// src/core-server/utils/save-story/valueToAST.ts
import { parser as parser2, types as t3 } from "storybook/internal/babel";
function valueToAST(literal) {
  if (literal === null)
    return t3.nullLiteral();
  switch (typeof literal) {
    case "function":
      return parser2.parse(literal.toString(), {
        allowReturnOutsideFunction: !0,
        allowSuperOutsideMethod: !0
      }).program.body[0]?.expression;
    case "number":
      return t3.numericLiteral(literal);
    case "string":
      return t3.stringLiteral(literal);
    case "boolean":
      return t3.booleanLiteral(literal);
    case "undefined":
      return t3.identifier("undefined");
    default:
      return Array.isArray(literal) ? t3.arrayExpression(literal.map(valueToAST)) : t3.objectExpression(
        Object.keys(literal).filter((k) => typeof literal[k] < "u").map((k) => {
          let value = literal[k];
          return t3.objectProperty(t3.stringLiteral(k), valueToAST(value));
        })
      );
  }
}

// src/core-server/utils/save-story/update-args-in-csf-file.ts
var updateArgsInCsfFile = async (node, input) => {
  let found = !1, args = Object.fromEntries(
    Object.entries(input).map(([k, v]) => [k, valueToAST(v)])
  );
  if (!(t4.isCallExpression(node) && t4.isMemberExpression(node.callee) && t4.isIdentifier(node.callee.property) && node.callee.property.name === "story") && (t4.isArrowFunctionExpression(node) || t4.isCallExpression(node)))
    throw new SaveStoryError("Updating a CSF2 story is not supported");
  if (t4.isObjectExpression(node)) {
    let properties = node.properties, argsProperty = properties.find((property) => {
      if (t4.isObjectProperty(property)) {
        let key = property.key;
        return t4.isIdentifier(key) && key.name === "args";
      }
      return !1;
    });
    if (argsProperty) {
      if (t4.isObjectProperty(argsProperty)) {
        let a = argsProperty.value;
        if (t4.isObjectExpression(a)) {
          a.properties.forEach((p) => {
            if (t4.isObjectProperty(p)) {
              let key = p.key;
              t4.isIdentifier(key) && key.name in args && (p.value = args[key.name], delete args[key.name]);
            }
          });
          let remainder = Object.entries(args);
          Object.keys(args).length && remainder.forEach(([key, value]) => {
            a.properties.push(t4.objectProperty(t4.identifier(key), value));
          });
        }
      }
    } else
      properties.unshift(
        t4.objectProperty(
          t4.identifier("args"),
          t4.objectExpression(
            Object.entries(args).map(([key, value]) => t4.objectProperty(t4.identifier(key), value))
          )
        )
      );
    return;
  }
  traverse2(node, {
    ObjectExpression(path) {
      if (found)
        return;
      found = !0;
      let argsProperty = path.get("properties").find((property) => {
        if (property.isObjectProperty()) {
          let key = property.get("key");
          return key.isIdentifier() && key.node.name === "args";
        }
        return !1;
      });
      if (argsProperty) {
        if (argsProperty.isObjectProperty()) {
          let a = argsProperty.get("value");
          if (a.isObjectExpression()) {
            a.traverse({
              ObjectProperty(p) {
                let key = p.get("key");
                key.isIdentifier() && key.node.name in args && (p.get("value").replaceWith(args[key.node.name]), delete args[key.node.name]);
              },
              noScope: !0
            });
            let remainder = Object.entries(args);
            Object.keys(args).length && remainder.forEach(([key, value]) => {
              a.pushContainer("properties", t4.objectProperty(t4.identifier(key), value));
            });
          }
        }
      } else
        path.unshiftContainer(
          "properties",
          t4.objectProperty(
            t4.identifier("args"),
            t4.objectExpression(
              Object.entries(args).map(([key, value]) => t4.objectProperty(t4.identifier(key), value))
            )
          )
        );
    },
    noScope: !0
  });
};

// src/core-server/utils/save-story/save-story.ts
var parseArgs = (args) => JSON.parse(args, (_, value) => value === "__sb_empty_function_arg__" ? () => {
} : value), removeExtraNewlines = (code, name) => {
  let anything = "([\\s\\S])", newline = "(\\r\\n|\\r|\\n)", closing = newline + "};" + newline, regex = new RegExp(
    // Looks for an export by the given name, considers the first closing brace on its own line
    // to be the end of the story definition.
    `^(?<before>${anything}*)(?<story>export const ${name} =${anything}+?${closing})(?<after>${anything}*)$`
  ), { before, story, after } = code.match(regex)?.groups || {};
  return story ? before + story.replaceAll(/(\r\n|\r|\n)(\r\n|\r|\n)([ \t]*[a-z0-9_]+): /gi, "$2$3:") + after : code;
};
function initializeSaveStory(channel, options) {
  channel.on(SAVE_STORY_REQUEST, async ({ id, payload }) => {
    let { csfId, importPath, args, name } = payload, newStoryId, newStoryName, sourceFileName, sourceFilePath, sourceStoryName;
    try {
      sourceFileName = basename(importPath), sourceFilePath = join3(process.cwd(), importPath);
      let csf = await readCsf(sourceFilePath, {
        makeTitle: (userTitle) => userTitle || "myTitle"
      }), parsed = csf.parse(), stories = Object.entries(parsed._stories), [componentId, storyId] = csfId.split("--");
      newStoryName = name && storyNameFromExport(name), newStoryId = newStoryName && toId(componentId, newStoryName);
      let [storyName] = stories.find(([key, value]) => value.id.endsWith(`--${storyId}`)) || [];
      if (!storyName)
        throw new SaveStoryError("Source story not found.");
      if (name && csf.getStoryExport(name))
        throw new SaveStoryError("Story already exists.");
      sourceStoryName = storyNameFromExport(storyName), await updateArgsInCsfFile(
        name ? duplicateStoryWithNewName(parsed, storyName, name) : csf.getStoryExport(storyName),
        args ? parseArgs(args) : {}
      );
      let code = await formatFileContent(
        sourceFilePath,
        removeExtraNewlines(printCsf(csf).code, name || storyName)
      );
      await Promise.all([
        new Promise((resolve2) => {
          channel.on(STORY_RENDERED, resolve2), setTimeout(() => resolve2(channel.off(STORY_RENDERED, resolve2)), 3e3);
        }),
        writeFile(sourceFilePath, code)
      ]), channel.emit(SAVE_STORY_RESPONSE, {
        id,
        success: !0,
        payload: {
          csfId,
          newStoryId,
          newStoryName,
          newStoryExportName: name,
          sourceFileContent: code,
          sourceFileName,
          sourceStoryName,
          sourceStoryExportName: storyName
        },
        error: null
      }), isExampleStoryId(newStoryId ?? csfId) || await telemetry8("save-story", {
        action: name ? "createStory" : "updateStory",
        success: !0
      });
    } catch (error) {
      channel.emit(SAVE_STORY_RESPONSE, {
        id,
        success: !1,
        error: error instanceof SaveStoryError ? error.message : "Unknown error"
      }), logger4.error(
        `Error writing to ${sourceFilePath}:
${error.stack || error.message || error.toString()}`
      ), error instanceof SaveStoryError || await telemetry8("save-story", {
        action: name ? "createStory" : "updateStory",
        success: !1,
        error
      });
    }
  });
}

// src/core-server/utils/whats-new.ts
import { writeFile as writeFile2 } from "node:fs/promises";
import { findConfigFile, loadMainConfig } from "storybook/internal/common";
import {
  REQUEST_WHATS_NEW_DATA,
  RESULT_WHATS_NEW_DATA,
  SET_WHATS_NEW_CACHE,
  TELEMETRY_ERROR,
  TOGGLE_WHATS_NEW_NOTIFICATIONS
} from "storybook/internal/core-events";
import { printConfig, readConfig } from "storybook/internal/csf-tools";
import { logger as logger5 } from "storybook/internal/node-logger";
import { telemetry as telemetry9 } from "storybook/internal/telemetry";
var WHATS_NEW_CACHE = "whats-new-cache", WHATS_NEW_URL = "https://storybook.js.org/whats-new/v1";
function initializeWhatsNew(channel, options) {
  channel.on(SET_WHATS_NEW_CACHE, async (data) => {
    let cache2 = await options.cache.get(WHATS_NEW_CACHE).catch((e) => (logger5.verbose(e), {}));
    await options.cache.set(WHATS_NEW_CACHE, { ...cache2, ...data });
  }), channel.on(REQUEST_WHATS_NEW_DATA, async () => {
    try {
      let post = await fetch(WHATS_NEW_URL).then(async (response) => {
        if (response.ok)
          return response.json();
        throw response;
      }), disableWhatsNewNotifications = (await loadMainConfig({ configDir: options.configDir })).core?.disableWhatsNewNotifications === !0, cache2 = await options.cache.get(WHATS_NEW_CACHE) ?? {}, data = {
        ...post,
        status: "SUCCESS",
        postIsRead: post.url === cache2.lastReadPost,
        showNotification: post.url !== cache2.lastDismissedPost && post.url !== cache2.lastReadPost,
        disableWhatsNewNotifications
      };
      channel.emit(RESULT_WHATS_NEW_DATA, { data });
    } catch (e) {
      logger5.verbose(e instanceof Error ? e.message : String(e)), channel.emit(RESULT_WHATS_NEW_DATA, {
        data: { status: "ERROR" }
      });
    }
  }), channel.on(
    TOGGLE_WHATS_NEW_NOTIFICATIONS,
    async ({ disableWhatsNewNotifications }) => {
      try {
        let mainPath = findConfigFile("main", options.configDir);
        invariant(mainPath, `unable to find Storybook main file in ${options.configDir}`);
        let main = await readConfig(mainPath);
        if (!main._exportsObject)
          throw new Error(
            "Unable to parse Storybook main file while trying to read 'core' property"
          );
        main.setFieldValue(["core", "disableWhatsNewNotifications"], disableWhatsNewNotifications), await writeFile2(mainPath, printConfig(main).code), await telemetry9("core-config", { disableWhatsNewNotifications });
      } catch (error) {
        invariant(error instanceof Error), await sendTelemetryError(error, "core-config", {
          cliOptions: options,
          presetOptions: {
            ...options,
            corePresets: [],
            overridePresets: []
          },
          skipPrompt: !0
        });
      }
    }
  ), channel.on(TELEMETRY_ERROR, async (error) => {
    await sendTelemetryError(error, "browser", {
      cliOptions: options,
      presetOptions: {
        ...options,
        corePresets: [],
        overridePresets: []
      },
      skipPrompt: !0
    });
  });
}

// src/core-server/presets/common-preset.ts
var interpolate = (string2, data = {}) => Object.entries(data).reduce((acc, [k, v]) => acc.replace(new RegExp(`%${k}%`, "g"), v), string2), staticDirs = async (values = []) => [
  ...defaultStaticDirs,
  ...values
], favicon = async (value, options) => {
  if (value)
    return value;
  let staticDirsValue = await options.presets.apply("staticDirs"), faviconPaths = (staticDirsValue ? staticDirsValue.map((dir) => typeof dir == "string" ? dir : `${dir.from}:${dir.to}`) : []).map((dir) => {
    let results = [], normalizedDir = staticDirsValue && !isAbsolute(dir) ? getDirectoryFromWorkingDir({
      configDir: options.configDir,
      workingDir: process.cwd(),
      directory: dir
    }) : dir, { staticPath, targetEndpoint } = parseStaticDir(normalizedDir);
    return ["/favicon.svg", "/favicon.ico"].includes(targetEndpoint) && results.push(staticPath), targetEndpoint === "/" && (results.push(join(staticPath, "favicon.svg")), results.push(join(staticPath, "favicon.ico"))), results.filter((path) => existsSync2(path));
  }).reduce((l1, l2) => l1.concat(l2), []);
  return faviconPaths.length > 1 && logger6.debug(import_ts_dedent.dedent`
      Looks like multiple favicons were detected. Using the first one.

      ${faviconPaths.join(", ")}
    `), faviconPaths[0] || defaultFavicon;
}, babel = async (_, options) => {
  let { presets } = options, babelDefault = await presets.apply("babelDefault", {}, options) ?? {}, presetConfig = {
    targets: {
      // This is the same browser supports that we use to bundle our manager and preview code.
      chrome: 100,
      safari: 15,
      firefox: 91
    }
  };
  return options?.features && "babelRemoveBugfixes" in options.features && options.features.babelRemoveBugfixes || (presetConfig.bugfixes = !0), {
    ...babelDefault,
    // This override makes sure that we will never transpile babel further down then the browsers that storybook supports.
    // This is needed to support the mount property of the context described here:
    // https://storybook.js.org/docs/writing-tests/interaction-testing#run-code-before-each-story-in-a-file
    overrides: [
      ...babelDefault?.overrides ?? [],
      {
        include: /\.(story|stories)\.[cm]?[jt]sx?$/,
        presets: [["@babel/preset-env", presetConfig]]
      }
    ]
  };
}, title = (previous, options) => previous || options.packageJson?.name || !1, logLevel = (previous, options) => previous || options.loglevel || "info", previewHead = async (base, { configDir, presets }) => {
  let interpolations = await presets.apply("env");
  return getPreviewHeadTemplate(configDir, interpolations);
}, env = async () => {
  let { raw } = await loadEnvs({ production: !0 });
  return raw;
}, previewBody = async (base, { configDir, presets }) => {
  let interpolations = await presets.apply("env");
  return getPreviewBodyTemplate(configDir, interpolations);
}, typescript = () => ({
  check: !1,
  // 'react-docgen' faster than `react-docgen-typescript` but produces lower quality results
  reactDocgen: "react-docgen",
  reactDocgenTypescriptOptions: {
    shouldExtractLiteralValuesFromEnum: !0,
    shouldRemoveUndefinedFromOptional: !0,
    propFilter: (prop) => prop.parent ? !/node_modules/.test(prop.parent.fileName) : !0,
    // NOTE: this default cannot be changed
    savePropValueAsString: !0
  }
}), experimental_serverAPI = (extension, options) => {
  let removeAddon = removeAddonBase, packageManager = JsPackageManagerFactory.getPackageManager({
    configDir: options.configDir
  });
  return removeAddon = async (id, opts) => (await telemetry10("remove", { addon: id, source: "api" }), removeAddonBase(id, { ...opts, packageManager })), { ...extension, removeAddon };
}, core = async (existing, options) => ({
  ...existing,
  channelOptions: {
    ...existing?.channelOptions ?? {},
    ...options.configType === "DEVELOPMENT" ? { wsToken: getWsToken() } : {}
  },
  disableTelemetry: options.disableTelemetry || optionalEnvToBoolean(process.env.STORYBOOK_DISABLE_TELEMETRY),
  enableCrashReports: options.enableCrashReports || optionalEnvToBoolean(process.env.STORYBOOK_ENABLE_CRASH_REPORTS)
}), babelPresetEnvMajor = getBabelPresetEnvMajor(), features = async (existing) => ({
  ...existing,
  actions: !0,
  argTypeTargetsV7: !0,
  babelRemoveBugfixes: babelPresetEnvMajor ? babelPresetEnvMajor >= 8 : !1,
  backgrounds: !0,
  changeDetection: !0,
  componentsManifest: !1,
  controls: !0,
  disallowImplicitActionsInRenderV8: !0,
  // `experimentalReview` is deliberately NOT defaulted here. It is tri-state: MCP tooling
  // (`@storybook/addon-mcp`) enables review for the `storybook ai` CLI channel unless the user
  // explicitly sets `false`, so an explicit default would be indistinguishable from a user
  // opt-out in the merged preset. See `isReviewFeatureEnabled` in `shared/review/features.ts`.
  highlight: !0,
  interactions: !0,
  legacyDecoratorFileOrder: !1,
  measure: !0,
  outline: !0,
  menuOnboardingChecklist: !0,
  sidebarOnboardingChecklist: !0,
  viewport: !0
}), csfIndexer = {
  test: STORY_FILE_TEST_REGEXP,
  createIndex: async (fileName, options) => {
    let code = (await readFile2(fileName, "utf-8")).toString();
    return code.trim().length === 0 ? (logger6.debug(`The file ${fileName} is empty. Skipping indexing.`), []) : loadCsf(code, { ...options, fileName }).parse().indexInputs;
  }
}, experimental_indexers = (existingIndexers) => [csfIndexer].concat(existingIndexers || []), frameworkOptions = async (_, options) => {
  let config = await options.presets.apply("framework");
  return typeof config == "string" ? {} : typeof config > "u" ? null : config.options;
}, managerHead = async (_, options) => {
  let location = join(options.configDir, "manager-head.html");
  if (existsSync2(location)) {
    let contents = readFile2(location, { encoding: "utf8" }), interpolations = options.presets.apply("env");
    return interpolate(await contents, await interpolations);
  }
  return "";
}, channelToken = async (value) => value, experimental_serverChannel = async (channel, options) => (initAIAnalyticsChannel(channel, options, () => storyIndexGeneratorPromise), initializeChecklist(channel, () => storyIndexGeneratorPromise, options.configDir), initializeWhatsNew(channel, options), initializeSaveStory(channel, options), initFileSearchChannel(channel, options), initCreateNewStoryChannel(channel, options), initGhostStoriesChannel(channel, options), initOpenInEditorChannel(channel), isReviewFeatureEnabled(await options.presets.apply("features")) && initReviewChannel(channel), initTelemetryChannel(channel), channel), resolvedReact = async (existing) => {
  try {
    return {
      ...existing,
      react: resolvePackageDir("react"),
      reactDom: resolvePackageDir("react-dom")
    };
  } catch {
    return existing;
  }
}, managerEntries = async (existing) => [
  join(resolvePackageDir("storybook"), "dist/core-server/presets/common-manager.js"),
  ...existing || []
];
globalThis.STORYBOOK_SERVICES_LOADED = globalThis.STORYBOOK_SERVICES_LOADED ?? !1;
var services = async (_value, options) => {
  if (globalThis.STORYBOOK_SERVICES_LOADED)
    throw new Error(
      'The "services" preset property was applied twice, but should only be applied once. Multiple code paths applying it will cause service registration to fail.'
    );
  globalThis.STORYBOOK_SERVICES_LOADED = !0;
  let storyIndexGenerator2 = await options.presets.apply("storyIndexGenerator");
  if (registerModuleGraphService({
    channel: options.channel,
    getIndex: () => storyIndexGenerator2.getIndex(),
    workingDir: process.cwd(),
    presets: options.presets
  }), (await options.presets.apply("features"))?.experimentalDocgenServer && !options.ignorePreview) {
    let [docgenDescriptors, storyDocsProvider] = await Promise.all([
      options.presets.apply("experimental_docgenProvider", []),
      options.presets.apply(
        "experimental_storyDocsProvider",
        async () => {
        }
      )
    ]), docgenWorker = docgenDescriptors.length > 0 ? createDocgenWorkerClient(docgenDescriptors) : void 0;
    docgenWorker && registerDocgenService({
      getIndex: () => storyIndexGenerator2.getIndex(),
      docgenProvider: (input) => docgenWorker.extract(input.entry),
      workingDir: process.cwd()
    }), registerStoryDocsService({
      getIndex: () => storyIndexGenerator2.getIndex(),
      storyDocsProvider,
      workingDir: process.cwd()
    });
  }
}, storyIndexGeneratorPromise, storyIndexGenerator = async (_, options) => storyIndexGeneratorPromise || (storyIndexGeneratorPromise = (async () => {
  let workingDir = process.cwd(), configDir = options.configDir, stories = await options.presets.apply("stories"), normalizedStories = normalizeStories(stories, {
    configDir,
    workingDir
  }), [indexers, docs] = await Promise.all([
    options.presets.apply("experimental_indexers", []),
    options.presets.apply("docs")
  ]), generator = new StoryIndexGenerator(normalizedStories, {
    workingDir,
    configDir,
    indexers,
    docs
  });
  return await generator.initialize(), generator;
})(), storyIndexGeneratorPromise);
export {
  babel,
  channelToken,
  core,
  csfIndexer,
  env,
  experimental_indexers,
  experimental_serverAPI,
  experimental_serverChannel,
  favicon,
  features,
  frameworkOptions,
  logLevel,
  managerEntries,
  managerHead,
  previewBody,
  previewHead,
  resolvedReact,
  services,
  staticDirs,
  storyIndexGenerator,
  title,
  typescript
};
