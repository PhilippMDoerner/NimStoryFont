import fs, { existsSync } from 'node:fs';
import path, { isAbsolute, resolve, dirname, join } from 'node:path';
import 'node:process';
import 'node:module';
import 'node:url';
import { createDebug } from 'obug';
import convertSourceMap from 'convert-source-map';

function absolute(input, root) {
  return isAbsolute(input) ? input : resolve(root || ".", input);
}

function up$2(base, options) {
  let {
    last,
    cwd
  } = options || {};
  let tmp = absolute(base, cwd);
  let root = absolute(last || "/", cwd);
  let prev,
    arr = [];
  while (prev !== root) {
    arr.push(tmp);
    tmp = dirname(prev = tmp);
    if (tmp === prev) break;
  }
  return arr;
}

function up$1(name, options) {
  let dir, tmp;
  let start = options && options.cwd || "";
  for (dir of up$2(start, options)) {
    tmp = join(dir, name);
    if (existsSync(tmp)) return tmp;
  }
}

function up(options) {
  return up$1("package.json", options);
}

const debug = createDebug("babel:transform:file");
function getInputMapPath(filename, root, inputMapURL) {
  const inputFileDir = path.dirname(filename);
  const inputMapPath = path.resolve(inputFileDir, inputMapURL);
  const relativeToInputFileDir = path.relative(inputFileDir, inputMapPath);
  if (relativeToInputFileDir.startsWith("..") || path.isAbsolute(relativeToInputFileDir)) {
    const inputPackageJSONPath = up({
      cwd: inputFileDir,
      last: root
    });
    const inputFileRoot = inputPackageJSONPath ? path.dirname(inputPackageJSONPath) : root;
    const relativeInputMapPath = path.relative(inputFileRoot, inputMapPath);
    if (relativeInputMapPath.startsWith("..") || path.isAbsolute(relativeInputMapPath)) {
      debug(`discarding input sourcemap "${inputMapPath}" outside of package root "${inputFileRoot}"`);
      return null;
    }
  }
  return inputMapPath;
}
function readInputSourceMapFile(filename, root, inputMapURL) {
  const inputMapPath = getInputMapPath(filename, root, inputMapURL);
  if (inputMapPath) {
    const inputMapContent = fs.readFileSync(inputMapPath, "utf8");
    return convertSourceMap.fromJSON(inputMapContent);
  }
  return null;
}

export { readInputSourceMapFile as default };
//# sourceMappingURL=read-input-source-map-file.js.map
