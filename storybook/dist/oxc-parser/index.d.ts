//#region code/core/.dts-emit/code/core/src/oxc-parser/types.d.ts
/**
 * A single import edge extracted from a source file. `specifier` is the literal token the
 * source used (e.g. `./foo`, `lodash`, `@scope/pkg`). `kind` distinguishes the three edge
 * flavours the oxc-parser surfaces: static `import`/`export`, dynamic `import()`, and
 * CommonJS `require()`.
 */
interface ImportEdge {
  specifier: string;
  kind: 'static' | 'dynamic' | 'require';
  /**
   * For static named imports (`import { Foo, Bar } from 'mod'`) the set of names as they
   * appear in the source module (i.e. before any `as` rename). `'default'` is included for
   * default imports (`import X from 'mod'`). `null` for side-effect imports, namespace
   * imports (`import * as ns`), dynamic imports, and `require()` calls.
   *
   * A Set rather than an array because duplicate names carry no extra information and the
   * downstream barrel-follower only ever iterates the unique names.
   *
   * Used by the change-detection barrel-follower to short-circuit through re-export barrels
   * and connect a story directly to the source files of the specific symbols it needs,
   * preventing unrelated stories from being marked as related when a single component in a
   * large barrel changes.
   */
  importedNames: Set<string> | null;
}
/**
 * A single re-export entry extracted from a module.
 * Maps the name visible to consumers to its origin inside the barrel.
 */
interface ReExportEntry {
  /** The specifier of the module that provides the binding. */
  specifier: string;
  /** The name of the binding in the source module (`'default'` for default imports). */
  importedName: string;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/oxc-parser/worker-pool.d.ts
/**
 * Disposes the shared pool if one is running.
 */
declare function disposeOxcParsePool(): Promise<void>;
//#endregion
//#region code/core/.dts-emit/code/core/src/oxc-parser/index.d.ts
/**
 * Re-export map plus wildcard specifiers for a barrel file.
 * Named re-exports are keyed by their exported name.
 * Wildcard specifiers come from `export * from '...'` statements.
 */
interface BarrelInfo {
  named: Map<string, ReExportEntry>;
  wildcards: string[];
}
/**
 * Parses a file with oxc-parser, using the worker pool when available and falling back to
 * inline {@link oxcParse} otherwise. Plugin parsers (Vue/Svelte/MDX) that use
 * `ctx.parseScriptWithOxc` also route through here, so SFC script blocks get the same
 * off-thread treatment as plain JS/TS files.
 */
declare function parseWithOxc(filePath: string, source: string): Promise<ImportEdge[]>;
/**
 * Parses both named re-exports and wildcard re-export specifiers from a module.
 * Named re-exports are keyed by exported name; wildcard specifiers come from
 * `export * from '...'` and `export type * from '...'` statements. Used by the
 * barrel chain-follower so it can recurse through `export *` hops when a requested
 * name is not found as a direct named re-export.
 *
 * Type re-exports (`export type { Foo } from '...'`) are intentionally included:
 * consumers may import type-shaped names without the `type` keyword, and those
 * names still need to be chain-followed to their source files so the barrel itself
 * is not added as a fallback dep (which would cause false-positive change signals).
 */
declare function parseBarrelInfo(filePath: string, source: string): Promise<BarrelInfo>;
/**
 * Names declared locally in this module — top-level `var`/`let`/`const`, function and class
 * declarations, including those introduced via `export <declaration>`. Imports and re-exports
 * (`export { X } from '...'`, `export * from '...'`) are excluded because their bindings live in
 * another module and are not referenceable identifiers here.
 *
 * Used by the Vue docgen plugin to decide whether a generated `.__docgenInfo` assignment can
 * safely target a name without producing a reference to an undefined binding.
 */
declare function parseLocalBindings(filePath: string, source: string): Promise<Set<string>>;
declare function parseReExports(filePath: string, source: string): Promise<Map<string, ReExportEntry>>;
//#endregion
export { BarrelInfo, type ImportEdge, type ReExportEntry, disposeOxcParsePool, parseBarrelInfo, parseLocalBindings, parseReExports, parseWithOxc };