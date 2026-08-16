/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * Generates a deterministic UUIDv5 (RFC 4122 §4.3) Debug ID from the given name bytes.
 *
 * Determinism is recommended by the ECMA-426 "Source Map Debug ID" proposal
 * (https://github.com/tc39/ecma426/blob/main/proposals/debug-id.md) so that the
 * produced artifacts are stable across builds with the same source content.
 *
 * @param name Bytes that uniquely identify the artifact (typically the source map content).
 * @returns A canonical UUIDv5 string (lowercase, hyphenated).
 */
export declare function generateDebugId(name: string | Uint8Array): string;
/**
 * Inserts (or replaces) a `//# debugId=<id>` comment in the given JavaScript text.
 *
 * Per ECMA-426, the comment must appear within the last 5 lines and SHOULD be
 * placed immediately above any `//# sourceMappingURL=` comment so that existing
 * tools that only consult the final line still find the source-map URL.
 */
export declare function injectDebugIdIntoJs(text: string, id: string): string;
/**
 * Sets the top-level `debugId` field on a JSON source map.
 *
 * Per ECMA-426, source maps embed the same Debug ID under a `debugId` key so
 * that consumers can pair a generated file with its source map without relying
 * on URL/path conventions.
 */
export declare function injectDebugIdIntoSourceMap(json: string, id: string): string;
/**
 * Strips any existing `debugId` field from the source map JSON string to restore
 * the original JSON contents for deterministic/idempotent hashing.
 */
export declare function stripDebugIdFromSourceMap(json: string): string;
