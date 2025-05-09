
      import {createRequire as __cjsCompatRequire} from 'module';
      const require = __cjsCompatRequire(import.meta.url);
    
import {
  angularJitApplicationTransform
} from "./chunk-2NHOVPL3.js";

// bazel-out/darwin_arm64-fastbuild/bin/packages/compiler-cli/private/tooling.mjs
var GLOBAL_DEFS_FOR_TERSER = {
  ngDevMode: false,
  ngI18nClosureMode: false
};
var GLOBAL_DEFS_FOR_TERSER_WITH_AOT = {
  ...GLOBAL_DEFS_FOR_TERSER,
  ngJitMode: false
};
var constructorParametersDownlevelTransform = (program, isCore = false) => {
  return angularJitApplicationTransform(program, isCore);
};

export {
  GLOBAL_DEFS_FOR_TERSER,
  GLOBAL_DEFS_FOR_TERSER_WITH_AOT,
  constructorParametersDownlevelTransform
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
//# sourceMappingURL=chunk-3Q7JGQD2.js.map
