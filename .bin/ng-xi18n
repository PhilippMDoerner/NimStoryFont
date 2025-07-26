#!/usr/bin/env node

      import {createRequire as __cjsCompatRequire} from 'module';
      const require = __cjsCompatRequire(import.meta.url);
    
import {
  main,
  readCommandLineAndConfiguration
} from "../../chunk-ZZUFYJIW.js";
import {
  EmitFlags
} from "../../chunk-2L4O4UIG.js";
import "../../chunk-EBPHWYDC.js";
import "../../chunk-NPUFVONQ.js";
import "../../chunk-M3WWDK6S.js";
import {
  setFileSystem
} from "../../chunk-3AHGFMNS.js";
import {
  NodeJSFileSystem
} from "../../chunk-U5SKOFKE.js";
import "../../chunk-KPQ72R34.js";

// bazel-out/darwin_arm64-fastbuild/bin/packages/compiler-cli/src/bin/ng_xi18n.js
import "reflect-metadata";

// bazel-out/darwin_arm64-fastbuild/bin/packages/compiler-cli/src/extract_i18n.js
import yargs from "yargs";
function mainXi18n(args2, consoleError = console.error) {
  const config = readXi18nCommandLineAndConfiguration(args2);
  return main(args2, consoleError, config, void 0, void 0, void 0);
}
function readXi18nCommandLineAndConfiguration(args2) {
  const options = {};
  const parsedArgs = yargs(args2).option("i18nFormat", { type: "string" }).option("locale", { type: "string" }).option("outFile", { type: "string" }).parseSync();
  if (parsedArgs.outFile)
    options.i18nOutFile = parsedArgs.outFile;
  if (parsedArgs.i18nFormat)
    options.i18nOutFormat = parsedArgs.i18nFormat;
  if (parsedArgs.locale)
    options.i18nOutLocale = parsedArgs.locale;
  const config = readCommandLineAndConfiguration(args2, options, [
    "outFile",
    "i18nFormat",
    "locale"
  ]);
  return { ...config, emitFlags: EmitFlags.I18nBundle };
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/compiler-cli/src/bin/ng_xi18n.js
process.title = "Angular i18n Message Extractor (ng-xi18n)";
var args = process.argv.slice(2);
setFileSystem(new NodeJSFileSystem());
process.exitCode = mainXi18n(args);
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
//# sourceMappingURL=ng_xi18n.js.map
