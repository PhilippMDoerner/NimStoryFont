import gensync from 'gensync';
import { loadConfig, run } from './index-shared.js';
import { readFile } from './fs-shared.js';

const transformFileRunner = gensync(function* (filename, opts) {
  const options = {
    ...opts,
    filename
  };
  const config = yield* loadConfig(options);
  if (config === null) return null;
  const code = yield* readFile(filename, "utf8");
  return yield* run(config, code);
});
function transformFile(...args) {
  transformFileRunner.errback(...args);
}
function transformFileSync(...args) {
  return transformFileRunner.sync(...args);
}
function transformFileAsync(...args) {
  return transformFileRunner.async(...args);
}

export { transformFile, transformFileAsync, transformFileSync };
//# sourceMappingURL=transform-file.js.map
