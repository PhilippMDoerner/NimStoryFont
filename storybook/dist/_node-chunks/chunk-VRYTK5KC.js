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
  normalize
} from "./chunk-4XX73STB.js";

// src/shared/open-service/services/module-graph/types.ts
import { posix, win32 } from "node:path";
function errorToErrorLike(error) {
  return error instanceof Error ? {
    message: error.message,
    name: error.name,
    stack: error.stack,
    cause: error.cause === void 0 ? void 0 : errorToErrorLike(error.cause)
  } : { message: String(error) };
}
function isWindowsAbsolutePath(path) {
  return win32.isAbsolute(path);
}
function isPosixAbsolutePath(path) {
  return posix.isAbsolute(path);
}
function normalizePathSeparators(path) {
  return path.replace(/\\/g, "/");
}
function formatStoryIndexPath(path) {
  let withoutDotSlash = path.startsWith("./") ? path.slice(2) : path, normalized = normalizePathSeparators(normalize(withoutDotSlash));
  return normalized === "." || normalized.startsWith("../") ? normalized : `./${normalized}`;
}
function toStoryIndexPath(path, workingDir) {
  if (isWindowsAbsolutePath(path))
    return formatStoryIndexPath(win32.relative(workingDir, path));
  let slashPath = normalizePathSeparators(path);
  return isPosixAbsolutePath(slashPath) ? formatStoryIndexPath(posix.relative(normalizePathSeparators(workingDir), slashPath)) : formatStoryIndexPath(slashPath);
}
function storyIndexPathToAbsolutePath(path, workingDir) {
  return isWindowsAbsolutePath(path) || isPosixAbsolutePath(normalizePathSeparators(path)) ? normalizePathSeparators(normalize(path)) : normalizePathSeparators(normalize(posix.join(normalizePathSeparators(workingDir), path)));
}
function reverseIndexToStoriesByFile(index, workingDir) {
  let result = {};
  for (let [dep, stories] of index)
    result[toStoryIndexPath(dep, workingDir)] = Object.fromEntries(
      Array.from(stories, ([storyFile, depth]) => [toStoryIndexPath(storyFile, workingDir), depth])
    );
  return result;
}

export {
  errorToErrorLike,
  toStoryIndexPath,
  storyIndexPathToAbsolutePath,
  reverseIndexToStoriesByFile
};
