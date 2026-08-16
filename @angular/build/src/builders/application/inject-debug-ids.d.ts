/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { BuildOutputFile } from '../../tools/esbuild/bundler-files';
/**
 * Embeds an ECMA-426 Debug ID into every browser JavaScript output that has a
 * matching source map sibling.
 *
 * The Debug ID is derived deterministically (UUIDv5) from the source map bytes
 * so rebuilds of the same source produce the same ID. The JS file gets a
 * `//# debugId=<uuid>` comment placed above any existing
 * `//# sourceMappingURL=` line and the source map JSON gets a top-level
 * `"debugId"` field. Together they make build artifacts self-identifying as
 * proposed by https://github.com/tc39/ecma426/blob/main/proposals/debug-id.md.
 */
export declare function injectDebugIds(outputFiles: BuildOutputFile[]): void;
