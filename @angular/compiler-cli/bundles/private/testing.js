
      import {createRequire as __cjsCompatRequire} from 'module';
      const require = __cjsCompatRequire(import.meta.url);
    
import {
  getInitializerApiJitTransform
} from "../chunk-COHPTPZ2.js";
import {
  ImportedSymbolsTracker,
  TypeScriptReflectionHost
} from "../chunk-SOEVA7UL.js";
import "../chunk-ZUYMYKXC.js";
import {
  InvalidFileSystem,
  absoluteFrom,
  basename,
  dirname,
  getFileSystem,
  resolve,
  setFileSystem
} from "../chunk-UTWH365F.js";
import {
  NodeJSFileSystem
} from "../chunk-KWAGEHJJ.js";
import "../chunk-IEBNHER4.js";

// packages/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system.js
var MockFileSystem = class {
  _isCaseSensitive;
  _fileTree = {};
  _cwd;
  constructor(_isCaseSensitive = false, cwd = "/") {
    this._isCaseSensitive = _isCaseSensitive;
    this._cwd = this.normalize(cwd);
  }
  isCaseSensitive() {
    return this._isCaseSensitive;
  }
  exists(path) {
    return this.findFromPath(path).entity !== null;
  }
  readFile(path) {
    const { entity } = this.findFromPath(path);
    if (isFile(entity)) {
      if (entity instanceof Uint8Array) {
        return new TextDecoder().decode(entity);
      }
      return entity.toString();
    } else {
      throw new MockFileSystemError("ENOENT", path, `File "${path}" does not exist.`);
    }
  }
  readFileBuffer(path) {
    const { entity } = this.findFromPath(path);
    if (isFile(entity)) {
      if (entity instanceof Uint8Array) {
        return entity;
      }
      const encoder = new TextEncoder();
      return encoder.encode(entity);
    } else {
      throw new MockFileSystemError("ENOENT", path, `File "${path}" does not exist.`);
    }
  }
  writeFile(path, data, exclusive = false) {
    const [folderPath, basename2] = this.splitIntoFolderAndFile(path);
    const { entity } = this.findFromPath(folderPath);
    if (entity === null || !isFolder(entity)) {
      throw new MockFileSystemError("ENOENT", path, `Unable to write file "${path}". The containing folder does not exist.`);
    }
    if (exclusive && entity[basename2] !== void 0) {
      throw new MockFileSystemError("EEXIST", path, `Unable to exclusively write file "${path}". The file already exists.`);
    }
    entity[basename2] = data;
  }
  removeFile(path) {
    const [folderPath, basename2] = this.splitIntoFolderAndFile(path);
    const { entity } = this.findFromPath(folderPath);
    if (entity === null || !isFolder(entity)) {
      throw new MockFileSystemError("ENOENT", path, `Unable to remove file "${path}". The containing folder does not exist.`);
    }
    if (isFolder(entity[basename2])) {
      throw new MockFileSystemError("EISDIR", path, `Unable to remove file "${path}". The path to remove is a folder.`);
    }
    delete entity[basename2];
  }
  symlink(target, path) {
    const [folderPath, basename2] = this.splitIntoFolderAndFile(path);
    const { entity } = this.findFromPath(folderPath);
    if (entity === null || !isFolder(entity)) {
      throw new MockFileSystemError("ENOENT", path, `Unable to create symlink at "${path}". The containing folder does not exist.`);
    }
    entity[basename2] = new SymLink(target);
  }
  readdir(path) {
    const { entity } = this.findFromPath(path);
    if (entity === null) {
      throw new MockFileSystemError("ENOENT", path, `Unable to read directory "${path}". It does not exist.`);
    }
    if (isFile(entity)) {
      throw new MockFileSystemError("ENOTDIR", path, `Unable to read directory "${path}". It is a file.`);
    }
    return Object.keys(entity);
  }
  lstat(path) {
    const { entity } = this.findFromPath(path);
    if (entity === null) {
      throw new MockFileSystemError("ENOENT", path, `File "${path}" does not exist.`);
    }
    return new MockFileStats(entity);
  }
  stat(path) {
    const { entity } = this.findFromPath(path, { followSymLinks: true });
    if (entity === null) {
      throw new MockFileSystemError("ENOENT", path, `File "${path}" does not exist.`);
    }
    return new MockFileStats(entity);
  }
  copyFile(from, to) {
    this.writeFile(to, this.readFile(from));
  }
  moveFile(from, to) {
    this.writeFile(to, this.readFile(from));
    const result = this.findFromPath(dirname(from));
    const folder = result.entity;
    const name = basename(from);
    delete folder[name];
  }
  ensureDir(path) {
    const segments = this.splitPath(path).map((segment) => this.getCanonicalPath(segment));
    segments[0] = "";
    if (segments.length > 1 && segments[segments.length - 1] === "") {
      segments.pop();
    }
    let current = this._fileTree;
    for (const segment of segments) {
      if (isFile(current[segment])) {
        throw new Error(`Folder already exists as a file.`);
      }
      if (!current[segment]) {
        current[segment] = {};
      }
      current = current[segment];
    }
    return current;
  }
  removeDeep(path) {
    const [folderPath, basename2] = this.splitIntoFolderAndFile(path);
    const { entity } = this.findFromPath(folderPath);
    if (entity === null || !isFolder(entity)) {
      throw new MockFileSystemError("ENOENT", path, `Unable to remove folder "${path}". The containing folder does not exist.`);
    }
    delete entity[basename2];
  }
  isRoot(path) {
    return this.dirname(path) === path;
  }
  extname(path) {
    const match = /.+(\.[^.]*)$/.exec(path);
    return match !== null ? match[1] : "";
  }
  realpath(filePath) {
    const result = this.findFromPath(filePath, { followSymLinks: true });
    if (result.entity === null) {
      throw new MockFileSystemError("ENOENT", filePath, `Unable to find the real path of "${filePath}". It does not exist.`);
    } else {
      return result.path;
    }
  }
  pwd() {
    return this._cwd;
  }
  chdir(path) {
    this._cwd = this.normalize(path);
  }
  getDefaultLibLocation() {
    let path = "node_modules/typescript/lib";
    let resolvedPath = this.resolve(path);
    const topLevelNodeModules = this.resolve("/" + path);
    while (resolvedPath !== topLevelNodeModules) {
      if (this.exists(resolvedPath)) {
        return resolvedPath;
      }
      path = "../" + path;
      resolvedPath = this.resolve(path);
    }
    return topLevelNodeModules;
  }
  dump() {
    const { entity } = this.findFromPath(this.resolve("/"));
    if (entity === null || !isFolder(entity)) {
      return {};
    }
    return this.cloneFolder(entity);
  }
  init(folder) {
    this.mount(this.resolve("/"), folder);
  }
  mount(path, folder) {
    if (this.exists(path)) {
      throw new Error(`Unable to mount in '${path}' as it already exists.`);
    }
    const mountFolder = this.ensureDir(path);
    this.copyInto(folder, mountFolder);
  }
  cloneFolder(folder) {
    const clone = {};
    this.copyInto(folder, clone);
    return clone;
  }
  copyInto(from, to) {
    for (const path in from) {
      const canonicalPath = this.getCanonicalPath(path);
      Object.defineProperty(to, canonicalPath, {
        configurable: true,
        enumerable: true,
        get: () => {
          const item = from[path];
          let cloned;
          if (isSymLink(item)) {
            cloned = new SymLink(this.getCanonicalPath(item.path));
          } else if (isFolder(item)) {
            cloned = this.cloneFolder(item);
          } else {
            cloned = item;
          }
          Object.defineProperty(to, canonicalPath, {
            configurable: true,
            enumerable: true,
            value: cloned,
            writable: true
          });
          return cloned;
        },
        set: (value) => {
          Object.defineProperty(to, canonicalPath, {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
      });
    }
  }
  findFromPath(path, options) {
    const followSymLinks = !!options && options.followSymLinks;
    const segments = this.splitPath(path);
    if (segments.length > 1 && segments[segments.length - 1] === "") {
      segments.pop();
    }
    segments[0] = "";
    let current = this._fileTree;
    while (segments.length) {
      current = current[this.getCanonicalPath(segments.shift())];
      if (current === void 0) {
        return { path, entity: null };
      }
      if (segments.length > 0) {
        if (isFile(current)) {
          current = null;
          break;
        }
        if (isSymLink(current)) {
          return this.findFromPath(resolve(current.path, ...segments), { followSymLinks });
        }
      }
      if (isFile(current)) {
        break;
      }
      if (isSymLink(current)) {
        if (followSymLinks) {
          return this.findFromPath(resolve(current.path, ...segments), { followSymLinks });
        } else {
          break;
        }
      }
    }
    return { path, entity: current };
  }
  splitIntoFolderAndFile(path) {
    const segments = this.splitPath(this.getCanonicalPath(path));
    const file = segments.pop();
    return [path.substring(0, path.length - file.length - 1), file];
  }
  getCanonicalPath(p3) {
    return this.isCaseSensitive() ? p3 : p3.toLowerCase();
  }
};
var SymLink = class {
  path;
  constructor(path) {
    this.path = path;
  }
};
var MockFileStats = class {
  entity;
  constructor(entity) {
    this.entity = entity;
  }
  isFile() {
    return isFile(this.entity);
  }
  isDirectory() {
    return isFolder(this.entity);
  }
  isSymbolicLink() {
    return isSymLink(this.entity);
  }
};
var MockFileSystemError = class extends Error {
  code;
  path;
  constructor(code, path, message) {
    super(message);
    this.code = code;
    this.path = path;
  }
};
function isFile(item) {
  return item instanceof Uint8Array || typeof item === "string";
}
function isSymLink(item) {
  return item instanceof SymLink;
}
function isFolder(item) {
  return item !== null && !isFile(item) && !isSymLink(item);
}

// packages/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system_native.js
import * as os from "os";
var isWindows = os.platform?.() === "win32";
var MockFileSystemNative = class extends MockFileSystem {
  constructor(cwd = "/") {
    super(void 0, cwd);
  }
  // Delegate to the real NodeJSFileSystem for these path related methods
  resolve(...paths) {
    return NodeJSFileSystem.prototype.resolve.call(this, this.pwd(), ...paths);
  }
  dirname(file) {
    return NodeJSFileSystem.prototype.dirname.call(this, file);
  }
  join(basePath, ...paths) {
    return NodeJSFileSystem.prototype.join.call(this, basePath, ...paths);
  }
  relative(from, to) {
    return NodeJSFileSystem.prototype.relative.call(this, from, to);
  }
  basename(filePath, extension) {
    return NodeJSFileSystem.prototype.basename.call(this, filePath, extension);
  }
  isCaseSensitive() {
    return NodeJSFileSystem.prototype.isCaseSensitive.call(this);
  }
  isRooted(path) {
    return NodeJSFileSystem.prototype.isRooted.call(this, path);
  }
  isRoot(path) {
    return NodeJSFileSystem.prototype.isRoot.call(this, path);
  }
  normalize(path) {
    if (isWindows) {
      path = path.replace(/^[\/\\]/i, "C:/");
    }
    return NodeJSFileSystem.prototype.normalize.call(this, path);
  }
  splitPath(path) {
    return path.split(/[\\\/]/);
  }
};

// packages/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system_posix.js
import * as p from "path";
var MockFileSystemPosix = class extends MockFileSystem {
  resolve(...paths) {
    const resolved = p.posix.resolve(this.pwd(), ...paths);
    return this.normalize(resolved);
  }
  dirname(file) {
    return this.normalize(p.posix.dirname(file));
  }
  join(basePath, ...paths) {
    return this.normalize(p.posix.join(basePath, ...paths));
  }
  relative(from, to) {
    return this.normalize(p.posix.relative(from, to));
  }
  basename(filePath, extension) {
    return p.posix.basename(filePath, extension);
  }
  isRooted(path) {
    return path.startsWith("/");
  }
  splitPath(path) {
    return path.split("/");
  }
  normalize(path) {
    return path.replace(/^[a-z]:\//i, "/").replace(/\\/g, "/");
  }
};

// packages/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system_windows.js
import * as p2 from "path";
var MockFileSystemWindows = class extends MockFileSystem {
  resolve(...paths) {
    const resolved = p2.win32.resolve(this.pwd(), ...paths);
    return this.normalize(resolved);
  }
  dirname(path) {
    return this.normalize(p2.win32.dirname(path));
  }
  join(basePath, ...paths) {
    return this.normalize(p2.win32.join(basePath, ...paths));
  }
  relative(from, to) {
    return this.normalize(p2.win32.relative(from, to));
  }
  basename(filePath, extension) {
    return p2.win32.basename(filePath, extension);
  }
  isRooted(path) {
    return /^([A-Z]:)?([\\\/]|$)/i.test(path);
  }
  splitPath(path) {
    return path.split(/[\\\/]/);
  }
  normalize(path) {
    return path.replace(/^[\/\\]/i, "C:/").replace(/\\/g, "/");
  }
};

// packages/compiler-cli/src/ngtsc/file_system/testing/src/test_helper.js
import ts from "typescript";
var FS_NATIVE = "Native";
var FS_OS_X = "OS/X";
var FS_UNIX = "Unix";
var FS_WINDOWS = "Windows";
var FS_ALL = [FS_OS_X, FS_WINDOWS, FS_UNIX, FS_NATIVE];
function runInEachFileSystemFn(callback) {
  FS_ALL.forEach((os2) => runInFileSystem(os2, callback, false));
}
var counter = 0;
function runInFileSystem(os2, callback, error) {
  describe(`<<FileSystem: ${os2}>>/${counter++}`, () => {
    beforeEach(() => initMockFileSystem(os2));
    afterEach(() => setFileSystem(new InvalidFileSystem()));
    callback(os2);
    if (error) {
      afterAll(() => {
        throw new Error(`runInFileSystem limited to ${os2}, cannot pass`);
      });
    }
  });
}
var runInEachFileSystem = runInEachFileSystemFn;
runInEachFileSystem.native = (callback) => runInFileSystem(FS_NATIVE, callback, true);
runInEachFileSystem.osX = (callback) => runInFileSystem(FS_OS_X, callback, true);
runInEachFileSystem.unix = (callback) => runInFileSystem(FS_UNIX, callback, true);
runInEachFileSystem.windows = (callback) => runInFileSystem(FS_WINDOWS, callback, true);
var mockFileSystemLocked = false;
function initMockFileSystem(os2, cwd) {
  if (mockFileSystemLocked) {
    return getFileSystem();
  }
  const fs = createMockFileSystem(os2, cwd);
  setFileSystem(fs);
  monkeyPatchTypeScript(fs);
  return fs;
}
function createMockFileSystem(os2, cwd) {
  switch (os2) {
    case "OS/X":
      return new MockFileSystemPosix(
        /* isCaseSensitive */
        false,
        cwd
      );
    case "Unix":
      return new MockFileSystemPosix(
        /* isCaseSensitive */
        true,
        cwd
      );
    case "Windows":
      return new MockFileSystemWindows(
        /* isCaseSensitive*/
        false,
        cwd
      );
    case "Native":
      return new MockFileSystemNative(cwd);
    default:
      throw new Error("FileSystem not supported");
  }
}
function monkeyPatchTypeScript(fs) {
  ts.sys.fileExists = (path) => {
    const absPath = fs.resolve(path);
    return fs.exists(absPath) && fs.stat(absPath).isFile();
  };
  ts.sys.getCurrentDirectory = () => fs.pwd();
  ts.sys.getDirectories = getDirectories;
  ts.sys.readFile = fs.readFile.bind(fs);
  ts.sys.resolvePath = fs.resolve.bind(fs);
  ts.sys.writeFile = fs.writeFile.bind(fs);
  ts.sys.directoryExists = directoryExists;
  ts.sys.readDirectory = readDirectory;
  function getDirectories(path) {
    return fs.readdir(absoluteFrom(path)).filter((p3) => fs.stat(fs.resolve(path, p3)).isDirectory());
  }
  function getFileSystemEntries(path) {
    const files = [];
    const directories = [];
    const absPath = fs.resolve(path);
    const entries = fs.readdir(absPath);
    for (const entry of entries) {
      if (entry == "." || entry === "..") {
        continue;
      }
      const absPath2 = fs.resolve(path, entry);
      const stat = fs.stat(absPath2);
      if (stat.isDirectory()) {
        directories.push(absPath2);
      } else if (stat.isFile()) {
        files.push(absPath2);
      }
    }
    return { files, directories };
  }
  function realPath(path) {
    return fs.realpath(fs.resolve(path));
  }
  function directoryExists(path) {
    const absPath = fs.resolve(path);
    return fs.exists(absPath) && fs.stat(absPath).isDirectory();
  }
  const tsMatchFiles = ts.matchFiles;
  function readDirectory(path, extensions, excludes, includes, depth) {
    return tsMatchFiles(path, extensions, excludes, includes, fs.isCaseSensitive(), fs.pwd(), depth, getFileSystemEntries, realPath, directoryExists);
  }
}
export {
  ImportedSymbolsTracker,
  MockFileSystem,
  TypeScriptReflectionHost,
  getInitializerApiJitTransform,
  initMockFileSystem
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
//# sourceMappingURL=testing.js.map
