import { ArgTypes, Args, DocgenPayload, Parameters, Renderer, StoryContextForEnhancers, StoryId, StrictArgTypes } from "storybook/internal/types";

//#region code/core/.dts-emit/code/core/src/docs-tools/argTypes/types.d.ts
type Component = any;
//#endregion
//#region code/core/.dts-emit/code/core/src/docs-tools/argTypes/docgen/PropDef.d.ts
interface JsDocParam {
  name: string | undefined | null;
  description?: string | null;
}
interface JsDocReturns {
  description?: string | null;
}
interface JsDocTags {
  params?: JsDocParam[] | null;
  returns?: JsDocReturns | null;
}
interface PropSummaryValue {
  summary?: string | undefined;
  detail?: string | undefined;
}
type PropType = PropSummaryValue;
type PropDefaultValue = PropSummaryValue;
interface PropDef {
  name: string;
  type: PropType | null;
  sbType?: any;
  required: boolean;
  description?: string;
  defaultValue?: PropDefaultValue | null;
  jsDocTags?: JsDocTags;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/docs-tools/argTypes/docgen/types.d.ts
type PropsExtractor = (component: Component) => {
  rows?: PropDef[];
} | null;
type ArgTypesExtractor = (component: Component) => StrictArgTypes | null;
interface DocgenType {
  name: string;
  description?: string;
  required?: boolean;
  value?: any;
}
interface DocgenPropType extends DocgenType {
  value?: any;
  raw?: string;
  computed?: boolean;
}
interface DocgenFlowType extends DocgenType {
  type?: string;
  raw?: string;
  signature?: any;
  elements?: any[];
}
interface DocgenTypeScriptType extends DocgenType {
  raw?: string;
}
interface DocgenPropDefaultValue {
  value: string;
  computed?: boolean;
  func?: boolean;
}
interface DocgenInfo {
  type: DocgenPropType;
  flowType?: DocgenFlowType;
  tsType?: DocgenTypeScriptType;
  required: boolean;
  description: string;
  defaultValue: DocgenPropDefaultValue;
}
declare enum TypeSystem {
  JAVASCRIPT = "JavaScript",
  FLOW = "Flow",
  TYPESCRIPT = "TypeScript",
  UNKNOWN = "Unknown"
}
//#endregion
//#region code/core/.dts-emit/code/core/src/docs-tools/argTypes/convert/index.d.ts
declare const convert: (docgenInfo: DocgenInfo) => any;
//#endregion
//#region code/core/.dts-emit/code/core/src/docs-tools/argTypes/docgen/utils/defaultValue.d.ts
declare function isDefaultValueBlacklisted(value: string): boolean;
//#endregion
//#region code/core/.dts-emit/code/core/src/docs-tools/argTypes/docgen/utils/string.d.ts
declare const str: (obj: any) => string;
//#endregion
//#region code/core/.dts-emit/code/core/src/docs-tools/argTypes/docgen/utils/docgenInfo.d.ts
declare function hasDocgen<T = any>(component: Component): component is object & {
  __docgenInfo: T;
};
declare function isValidDocgenSection(docgenSection: any): boolean;
declare function getDocgenSection(component: Component, section: string): any;
declare function getDocgenDescription(component: Component): string;
//#endregion
//#region code/core/.dts-emit/code/core/src/docs-tools/argTypes/jsdocParser.d.ts
interface ExtractedJsDocParam extends JsDocParam {
  type?: any;
  getPrettyName: () => string | undefined;
  getTypeName: () => string | null;
}
interface ExtractedJsDocReturns extends JsDocReturns {
  type?: any;
  getTypeName: () => string | null;
}
interface ExtractedJsDoc {
  params?: ExtractedJsDocParam[] | null;
  deprecated?: string | null;
  returns?: ExtractedJsDocReturns | null;
  ignore: boolean;
}
interface JsDocParsingOptions {
  tags?: string[];
}
interface JsDocParsingResult {
  includesJsDoc: boolean;
  ignore: boolean;
  description?: string;
  extractedTags?: ExtractedJsDoc;
}
type ParseJsDoc = (value: string | null, options?: JsDocParsingOptions) => JsDocParsingResult;
declare const parseJsDoc: ParseJsDoc;
//#endregion
//#region code/core/.dts-emit/code/core/src/docs-tools/argTypes/docgen/extractDocgenProps.d.ts
interface ExtractedProp {
  propDef: PropDef;
  docgenInfo: DocgenInfo;
  jsDocTags?: ExtractedJsDoc;
  typeSystem: TypeSystem;
}
type ExtractProps = (component: Component, section: string) => ExtractedProp[];
declare const extractComponentSectionArray: (docgenSection: any) => any;
declare const extractComponentSectionObject: (docgenSection: any) => (ExtractedProp | null)[];
declare const extractComponentProps: ExtractProps;
declare function extractComponentDescription(component?: Component): string;
//#endregion
//#region code/core/.dts-emit/code/core/src/docs-tools/argTypes/utils.d.ts
declare const MAX_TYPE_SUMMARY_LENGTH = 90;
declare const MAX_DEFAULT_VALUE_SUMMARY_LENGTH = 50;
declare function isTooLongForTypeSummary(value: string): boolean;
declare function isTooLongForDefaultValueSummary(value: string): boolean;
declare function createSummaryValue(summary?: string, detail?: string): PropSummaryValue;
declare const normalizeNewlines: (string: string) => string;
//#endregion
//#region code/core/.dts-emit/code/core/src/docs-tools/argTypes/enhanceArgTypes.d.ts
declare const enhanceArgTypes: <TRenderer extends Renderer>(context: StoryContextForEnhancers<TRenderer>) => import("@storybook/react").Parameters;
//#endregion
//#region code/core/.dts-emit/code/core/src/docs-tools/argTypes/docgenServiceArgTypes.d.ts
/**
 * Builds the Controls/ArgTypes table shape from server docgen and custom argTypes.
 *
 * Mirrors the legacy `prepareStory` enhancer chain when `experimentalDocgenServer` is enabled:
 * server docgen stands in for `enhanceArgTypes`, user annotations from `customArgTypes` layer on
 * top, then `inferArgTypes` and `inferControls` run the second pass that `prepareStory` skips.
 *
 * Callers source custom argTypes from the prepared meta/story they already hold — the docs blocks
 * resolve it locally through `useOf` (as `StrictArgTypes`), the manager Controls panel reads it
 * from the `STORY_PREPARED` channel via `useArgTypes` (as the looser `ArgTypes`); both are
 * accepted here and normalized by the inference passes below.
 */
declare function mergeServiceArgTypes({
  payload,
  storyId,
  parameters,
  initialArgs,
  customArgTypes
}: {
  payload: DocgenPayload;
  storyId: StoryId; /** May be undefined when the manager renders before the preview reports `storyPrepared`. */
  parameters?: Parameters;
  initialArgs?: Args;
  customArgTypes?: ArgTypes;
}): StrictArgTypes;
/** Returns subcomponent argTypes that were converted by the renderer provider at write time. */
declare function getServiceSubcomponentArgTypes(payload: DocgenPayload): Record<string, StrictArgTypes>;
//#endregion
//#region code/core/.dts-emit/code/core/src/docs-tools/shared.d.ts
declare const ADDON_ID = "storybook/docs";
declare const PANEL_ID = "storybook/docs/panel";
declare const PARAM_KEY = "docs";
declare const SNIPPET_RENDERED = "storybook/docs/snippet-rendered";
declare enum SourceType {
  /**
   * AUTO is the default
   *
   * Use the CODE logic if:
   *
   * - The user has set a custom source snippet in `docs.source.code` story parameter
   * - The story is not an args-based story
   *
   * Use the DYNAMIC rendered snippet if the story is an args story
   */
  AUTO = "auto",
  /** Render the code extracted by csf-plugin */
  CODE = "code",
  /** Render dynamically-rendered source snippet from the story's virtual DOM (currently React only) */
  DYNAMIC = "dynamic"
}
//#endregion
//#region code/core/.dts-emit/code/core/src/docs-tools/storyDocsCodePanel.d.ts
type StoryDocsCodePanelParameters = {
  __isArgsStory?: boolean;
  __isPortableStory?: boolean;
  docs?: {
    source?: {
      code?: string;
      type?: SourceType;
    };
  };
};
/**
 * Whether the preview story-docs hook should skip emitting a snippet to the manager Code panel.
 *
 * The args/source shape logic mirrors {@link skipJsxRender} in the React `jsxDecorator`, so static
 * service snippets replace dynamic JSX rendering under the same conditions. It additionally skips
 * portable stories (vitest, playwright/jest portable): those have no manager Code panel and no OSA
 * server peer, so the `extractStoryDocs` remote command has no handler and would reject after the
 * ack timeout — there is nothing to emit to.
 */
declare function shouldSkipStoryDocsEmit(parameters?: StoryDocsCodePanelParameters): boolean;
/**
 * Whether the Code panel should keep rendering blank while it waits for a story-docs service snippet
 * instead of falling back to raw CSF (`originalSource`).
 *
 * True while the docgen server might still emit a snippet for the current story: either the story is
 * known to emit one, or it is not prepared yet so the emit decision — which depends on prepared
 * parameters like `__isArgsStory` — is still unknown in the manager. Holding the fallback during
 * that window prevents flashing raw CSF before the service snippet arrives for newly opened stories.
 */
declare function shouldWaitForServiceSnippet(parameters: StoryDocsCodePanelParameters | undefined, storyPrepared: boolean | undefined): boolean;
//#endregion
export { ADDON_ID, ArgTypesExtractor, Component, DocgenFlowType, DocgenInfo, DocgenPropDefaultValue, DocgenPropType, DocgenType, DocgenTypeScriptType, ExtractProps, ExtractedJsDoc, ExtractedJsDocParam, ExtractedJsDocReturns, ExtractedProp, JsDocParam, JsDocParsingOptions, JsDocParsingResult, JsDocReturns, JsDocTags, MAX_DEFAULT_VALUE_SUMMARY_LENGTH, MAX_TYPE_SUMMARY_LENGTH, PANEL_ID, PARAM_KEY, ParseJsDoc, PropDef, PropDefaultValue, PropSummaryValue, PropType, PropsExtractor, SNIPPET_RENDERED, SourceType, StoryDocsCodePanelParameters, TypeSystem, convert, createSummaryValue, enhanceArgTypes, extractComponentDescription, extractComponentProps, extractComponentSectionArray, extractComponentSectionObject, getDocgenDescription, getDocgenSection, getServiceSubcomponentArgTypes, hasDocgen, isDefaultValueBlacklisted, isTooLongForDefaultValueSummary, isTooLongForTypeSummary, isValidDocgenSection, mergeServiceArgTypes, normalizeNewlines, parseJsDoc, shouldSkipStoryDocsEmit, shouldWaitForServiceSnippet, str };