import {
  __export,
  computesTemplateSourceFromComponent
} from "./chunk-FPQDYJYM.js";

// src/client/docs/config.ts
var config_exports = {};
__export(config_exports, {
  decorators: () => decorators,
  parameters: () => parameters
});
import { SourceType as SourceType2 } from "storybook/internal/docs-tools";

// src/client/docs/sourceDecorator.ts
import { SourceType } from "storybook/internal/docs-tools";
import { useRef, emitTransformCode, useEffect } from "storybook/preview-api";
var skipSourceRender = (context) => {
  let sourceParams = context?.parameters.docs?.source;
  return sourceParams?.type === SourceType.DYNAMIC ? !1 : sourceParams?.code || sourceParams?.type === SourceType.CODE;
}, sourceDecorator = (storyFn, context) => {
  let story = storyFn(), source = useRef(void 0);
  return useEffect(() => {
    if (skipSourceRender(context))
      return;
    let { props, userDefinedTemplate } = story, { component, argTypes, parameters: parameters2 } = context, template = parameters2.docs?.source?.excludeDecorators ? context.originalStoryFn(context.args, context).template : story.template;
    if (component && !userDefinedTemplate) {
      let newSource = computesTemplateSourceFromComponent(component, props, argTypes) || template;
      newSource && newSource !== source.current && (emitTransformCode(newSource, context), source.current = newSource);
    } else template && template !== source.current && (emitTransformCode(template, context), source.current = template);
  }), story;
};

// src/client/docs/config.ts
var parameters = {
  docs: {
    source: {
      type: SourceType2.DYNAMIC,
      language: "html"
    }
  }
}, decorators = [sourceDecorator];

export {
  parameters,
  decorators,
  config_exports
};
