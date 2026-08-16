import { ArgTypes } from "storybook/internal/csf";
import { ComponentAnnotations, CsfEnricher, IndexInput, IndexInputStats, IndexedCSFFile, StoriesEntry, StoryAnnotations, Tag as Tag$1 } from "storybook/internal/types";
import { GeneratorOptions, NodePath, RecastOptions, babelParse, generate, types } from "storybook/internal/babel";

//#region code/core/.dts-emit/code/core/src/csf-tools/PrintResultType.d.ts
interface PrintResultType {
  code: string;
  map?: any;
  toString(): string;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/csf-tools/CsfFile.d.ts
interface BabelFile {
  ast: types.File;
  opts: any;
  hub: any;
  metadata: object;
  path: NodePath<types.Program>;
  scope: any;
  inputMap: object | null;
  code: string;
}
declare const isValidPreviewPath: (filepath: string) => boolean;
declare const isModuleMock: (importPath: string) => boolean;
interface CsfOptions {
  fileName?: string;
  makeTitle: (userTitle: string) => string;
  /**
   * If an inline meta is detected e.g. `export default { title: 'foo' }` it will be transformed
   * into a constant format e.g. `export const _meta = { title: 'foo' }; export default _meta;`
   */
  transformInlineMeta?: boolean;
}
declare class NoMetaError extends Error {
  constructor(message: string, ast: types.Node, fileName?: string);
}
declare class MultipleMetaError extends Error {
  constructor(message: string, ast: types.Node, fileName?: string);
}
declare class MixedFactoryError extends Error {
  constructor(message: string, ast: types.Node, fileName?: string);
}
declare class BadMetaError extends Error {
  constructor(message: string, ast: types.Node, fileName?: string);
}
interface StaticMeta extends Pick<ComponentAnnotations, 'id' | 'title' | 'includeStories' | 'excludeStories' | 'tags'> {
  component?: string;
}
interface StaticStory extends Pick<StoryAnnotations, 'name' | 'parameters' | 'tags'> {
  id: string;
  localName?: string;
  __stats: IndexInputStats;
}
interface StoryTest {
  node: types.Node;
  function: types.Node;
  name: string;
  id: string;
  tags: string[];
  parent: {
    node: types.Node;
  };
}
declare class CsfFile {
  _ast: types.File;
  _file: BabelFile;
  _options: CsfOptions;
  _rawComponentPath?: string;
  _componentImportSpecifier?: types.ImportSpecifier | types.ImportDefaultSpecifier;
  _meta?: StaticMeta;
  _stories: Record<string, StaticStory>;
  _metaAnnotations: Record<string, types.Node>;
  _storyExports: Record<string, types.VariableDeclarator | types.FunctionDeclaration>;
  _storyDeclarationPath: Record<string, NodePath<types.VariableDeclarator | types.FunctionDeclaration>>;
  _storyPaths: Record<string, NodePath<types.ExportNamedDeclaration>>;
  _metaStatement: types.Statement | undefined;
  _metaStatementPath: NodePath<types.Statement> | undefined;
  _metaNode: types.ObjectExpression | undefined;
  _metaPath: NodePath<types.ExportDefaultDeclaration> | undefined;
  _metaVariableName: string | undefined;
  _metaIsFactory: boolean | undefined;
  _storyStatements: Record<string, types.ExportNamedDeclaration | types.Expression>;
  _storyAnnotations: Record<string, Record<string, types.Node>>;
  _templates: Record<string, types.Expression>;
  _namedExportsOrder?: string[];
  imports: string[];
  _tests: StoryTest[];
  constructor(ast: types.File, options: CsfOptions, file: BabelFile);
  _parseTitle(value: types.Node): string;
  _parseMeta(declaration: types.ObjectExpression, program: types.Program): void;
  getStoryExport(key: string): types.Node;
  parse(): CsfFile & IndexedCSFFile;
  get meta(): StaticMeta | undefined;
  get stories(): StaticStory[];
  getStoryTests(story: string | types.Node): StoryTest[];
  get indexInputs(): IndexInput[];
}
/** Using new babel.File is more powerful and give access to API such as buildCodeFrameError */
declare const babelParseFile: ({
  code,
  filename,
  ast
}: {
  code: string;
  filename?: string;
  ast?: types.File;
}) => BabelFile;
declare const loadCsf: (code: string, options: CsfOptions) => CsfFile;
declare const formatCsf: (csf: CsfFile, options?: GeneratorOptions & {
  inputSourceMap?: any;
}, code?: string) => ReturnType<typeof generate> | string;
/** Use this function, if you want to preserve styles. Uses recast under the hood. */
declare const printCsf: (csf: CsfFile, options?: RecastOptions) => PrintResultType;
declare const readCsf: (fileName: string, options: CsfOptions) => Promise<CsfFile>;
declare const writeCsf: (csf: CsfFile, fileName?: string) => Promise<void>;
//#endregion
//#region code/core/.dts-emit/code/core/src/csf-tools/ConfigFile.d.ts
declare const _getPathProperties: (path: string[], node: types.Node) => types.ObjectProperty[] | undefined;
declare class ConfigFile {
  _ast: types.File;
  _code: string;
  _exports: Record<string, types.Expression>;
  _exportDecls: Record<string, types.VariableDeclarator | types.FunctionDeclaration>;
  _exportsObject: types.ObjectExpression | undefined;
  _quotes: 'single' | 'double' | undefined;
  fileName?: string;
  hasDefaultExport: boolean;
  constructor(ast: types.File, code: string, fileName?: string);
  _parseExportsObject(exportsObject: types.ObjectExpression): void;
  /** Unwraps TS assertions/satisfies from a node, to get the underlying node. */
  _unwrap: (node: types.Node | undefined | null) => any;
  /**
   * Resolve a declaration node by unwrapping TS assertions/satisfies and following identifiers to
   * resolve the correct node in case it's an identifier.
   */
  _resolveDeclaration: (node: types.Node, parent?: types.Node) => any;
  parse(): this;
  getFieldNode(path: string[]): types.Node | undefined;
  getFieldProperties(path: string[]): ReturnType<typeof _getPathProperties>;
  getFieldValue<T = any>(path: string[]): T | undefined;
  getSafeFieldValue(path: string[]): any;
  setFieldNode(path: string[], expr: types.Expression): void;
  /**
   * @example
   *
   * ```ts
   * // 1. { framework: 'framework-name' }
   * // 2. { framework: { name: 'framework-name', options: {} }
   * getNameFromPath(['framework']); // => 'framework-name'
   * ```
   *
   * @returns The name of a node in a given path, supporting the following formats:
   */
  getNameFromPath(path: string[]): string | undefined;
  /**
   * Returns an array of names of a node in a given path, supporting the following formats:
   *
   * @example
   *
   * ```ts
   * const config = {
   *   addons: ['first-addon', { name: 'second-addon', options: {} }],
   * };
   * // => ['first-addon', 'second-addon']
   * getNamesFromPath(['addons']);
   * ```
   */
  getNamesFromPath(path: string[]): string[] | undefined;
  _getPnpWrappedValue(node: types.Node): string | undefined;
  /**
   * Given a node and a fallback property, returns a **non-evaluated** string value of the node.
   *
   * 1. `{ node: 'value' }`
   * 2. `{ node: { fallbackProperty: 'value' } }`
   */
  _getPresetValue(node: types.Node, fallbackProperty: string): string;
  removeField(path: string[]): void;
  appendValueToArray(path: string[], value: any): void;
  appendNodeToArray(path: string[], node: types.Expression): void;
  /**
   * Specialized helper to remove addons or other array entries that can either be strings or
   * objects with a name property.
   */
  removeEntryFromArray(path: string[], value: string): void;
  _inferQuotes(): "double" | "single";
  valueToNode(value: any): types.Expression | undefined;
  setFieldValue(path: string[], value: any): void;
  getBodyDeclarations(): types.Statement[];
  setBodyDeclaration(declaration: types.Declaration): void;
  /**
   * Import specifiers for a specific require import
   *
   * @example
   *
   * ```ts
   * // const { foo } = require('bar');
   * setRequireImport(['foo'], 'bar');
   *
   * // const foo = require('bar');
   * setRequireImport('foo', 'bar');
   * ```
   *
   * @param importSpecifiers - The import specifiers to set. If a string is passed in, a default
   *   import will be set. Otherwise, an array of named imports will be set
   * @param fromImport - The module to import from
   */
  setRequireImport(importSpecifier: string[] | string, fromImport: string): void;
  /**
   * Set import specifiers for a given import statement.
   *
   * Does not support setting type imports (yet)
   *
   * @example
   *
   * ```ts
   * // import { foo } from 'bar';
   * setImport(['foo'], 'bar');
   *
   * // import foo from 'bar';
   * setImport('foo', 'bar');
   *
   * // import * as foo from 'bar';
   * setImport({ namespace: 'foo' }, 'bar');
   *
   * // import 'bar';
   * setImport(null, 'bar');
   * ```
   *
   * @param importSpecifiers - The import specifiers to set. If a string is passed in, a default
   *   import will be set. Otherwise, an array of named imports will be set
   * @param fromImport - The module to import from
   */
  setImport(importSpecifier: string[] | string | {
    namespace: string;
  } | null, fromImport: string): void;
  _removeRequireImport(importSpecifier: string[] | string | {
    namespace: string;
  } | null, fromImport: string): void;
  _removeImport(importSpecifier: string[] | string | {
    namespace: string;
  } | null, fromImport: string): void;
  /**
   * Remove import specifiers for a given import statement.
   *
   * Does not support removing type imports (yet)
   *
   * @example
   *
   * ```ts
   * // import { foo } from 'bar';
   * setImport(['foo'], 'bar');
   *
   * // import foo from 'bar';
   * setImport('foo', 'bar');
   *
   * // import * as foo from 'bar';
   * setImport({ namespace: 'foo' }, 'bar');
   *
   * // import 'bar';
   * setImport(null, 'bar');
   * ```
   *
   * @param importSpecifiers - The import specifiers to remove. If a string is passed in, will only
   *   remove the default import. Otherwise, named imports matching the array will be removed.
   * @param fromImport - The module to import from
   */
  removeImport(importSpecifier: string[] | string | {
    namespace: string;
  } | null, fromImport: string): void;
}
declare const loadConfig: (code: string, fileName?: string) => ConfigFile;
declare const formatConfig: (config: ConfigFile) => string;
declare const printConfig: (config: ConfigFile, options?: RecastOptions) => PrintResultType;
declare const readConfig: (fileName: string) => Promise<ConfigFile>;
declare const writeConfig: (config: ConfigFile, fileName?: string) => Promise<void>;
declare const isCsfFactoryPreview: (previewConfig: ConfigFile) => boolean;
//#endregion
//#region code/core/.dts-emit/code/core/src/csf-tools/getStorySortParameter.d.ts
declare const getStorySortParameter: (previewCode: string) => any;
//#endregion
//#region code/core/.dts-emit/code/core/src/csf-tools/enrichCsf.d.ts
interface EnrichCsfOptions {
  disableSource?: boolean;
  disableDescription?: boolean;
  enrichCsf?: CsfEnricher;
}
declare const enrichCsfStory: (csf: CsfFile, csfSource: CsfFile, key: string, options?: EnrichCsfOptions) => void;
declare const enrichCsfMeta: (csf: CsfFile, csfSource: CsfFile, options?: EnrichCsfOptions) => void;
declare const enrichCsf: (csf: CsfFile, csfSource: CsfFile, options?: EnrichCsfOptions) => Promise<void>;
declare const extractSource: (node: types.Node) => string;
declare const extractDescription: (node?: types.Node) => string;
//#endregion
//#region code/core/.dts-emit/code/core/src/csf-tools/vitest-plugin/transformer.d.ts
type TagsFilter = {
  include: string[];
  exclude: string[];
  skip: string[];
};
/**
 * In Storybook users might be importing stories from other story files. As a side effect, tests can
 * get re-triggered. To avoid this, we add a guard to only run tests if the current file is the one
 * running the test.
 *
 * Const isRunningFromThisFile = import.meta.url.includes(expect.getState().testPath ??
 * globalThis.**vitest_worker**.filepath) if(isRunningFromThisFile) { ... }
 */
declare function vitestTransform({
  code,
  fileName,
  configDir,
  stories,
  tagsFilter,
  previewLevelTags
}: {
  code: string;
  fileName: string;
  configDir: string;
  tagsFilter: TagsFilter;
  stories: StoriesEntry[];
  previewLevelTags: Tag$1[];
}): Promise<ReturnType<typeof formatCsf>>;
//#endregion
//#region code/core/.dts-emit/code/core/src/csf-tools/vitest-plugin/component-transformer.d.ts
/**
 * Transforms a component file directly into a Vitest test file. Uses a getComponentArgTypes
 * function to retrieve component argTypes for required prop generation. Uses portable stories to
 * construct a test based on the default state of a component (basic render + required args)
 */
declare const componentTransform: ({
  code,
  fileName,
  getComponentArgTypes
}: {
  code: string;
  fileName: string;
  getComponentArgTypes?: (options: {
    componentName: string;
    fileName: string;
  }) => Promise<ArgTypes | null | undefined>;
}) => Promise<ReturnType<typeof generate> | {
  code: string;
  map: null;
}>;
//#endregion
export { BadMetaError, ConfigFile, CsfFile, CsfOptions, EnrichCsfOptions, MixedFactoryError, MultipleMetaError, NoMetaError, StaticMeta, StaticStory, StoryTest, babelParse, babelParseFile, componentTransform, enrichCsf, enrichCsfMeta, enrichCsfStory, extractDescription, extractSource, formatConfig, formatCsf, getStorySortParameter, isCsfFactoryPreview, isModuleMock, isValidPreviewPath, loadConfig, loadCsf, printConfig, printCsf, readConfig, readCsf, vitestTransform, writeConfig, writeCsf };