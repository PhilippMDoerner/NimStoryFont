import {
  config_exports
} from "./chunk-6ADVROMB.js";
import {
  config_exports as config_exports2
} from "./chunk-RV6FL7AO.js";
import {
  computesTemplateFromComponent,
  formatPropInTemplate,
  isComponent,
  render_exports
} from "./chunk-FPQDYJYM.js";

// src/client/portable-stories.ts
import {
  setProjectAnnotations as originalSetProjectAnnotations,
  setDefaultProjectAnnotations
} from "storybook/preview-api";
function setProjectAnnotations(projectAnnotations) {
  return setDefaultProjectAnnotations(render_exports), originalSetProjectAnnotations(
    projectAnnotations
  );
}

// src/client/preview.ts
import { definePreview as definePreviewBase } from "storybook/internal/csf";
function __definePreview(input) {
  return definePreviewBase({
    ...input,
    addons: [config_exports, config_exports2, ...input.addons ?? []]
  });
}

// src/client/decorators.ts
var moduleMetadata = (metadata) => (storyFn) => {
  let story = storyFn(), storyMetadata = story.moduleMetadata || {};
  return metadata = metadata || {}, {
    ...story,
    moduleMetadata: {
      declarations: [...metadata.declarations || [], ...storyMetadata.declarations || []],
      entryComponents: [
        ...metadata.entryComponents || [],
        ...storyMetadata.entryComponents || []
      ],
      imports: [...metadata.imports || [], ...storyMetadata.imports || []],
      schemas: [...metadata.schemas || [], ...storyMetadata.schemas || []],
      providers: [...metadata.providers || [], ...storyMetadata.providers || []]
    }
  };
};
function applicationConfig(config) {
  return (storyFn) => {
    let story = storyFn(), storyConfig = story.applicationConfig;
    return {
      ...story,
      applicationConfig: storyConfig || config ? {
        ...config,
        ...storyConfig,
        providers: [...config?.providers || [], ...storyConfig?.providers || []]
      } : void 0
    };
  };
}
var componentWrapperDecorator = (element, props) => (storyFn, storyContext) => {
  let story = storyFn(), currentProps = typeof props == "function" ? props(storyContext) : props, template = isComponent(element) ? computesTemplateFromComponent(element, currentProps ?? {}, story.template) : element(story.template);
  return {
    ...story,
    template,
    ...currentProps || story.props ? {
      props: {
        ...currentProps,
        ...story.props
      }
    } : {}
  };
};

// src/client/argsToTemplate.ts
function argsToTemplate(args, options = {}) {
  let includeSet = options.include ? new Set(options.include) : null, excludeSet = options.exclude ? new Set(options.exclude) : null;
  return Object.entries(args).filter(([key]) => args[key] !== void 0).filter(([key]) => includeSet ? includeSet.has(key) : excludeSet ? !excludeSet.has(key) : !0).map(
    ([key, value]) => typeof value == "function" ? `(${key})="${formatPropInTemplate(key)}($event)"` : `[${key}]="${formatPropInTemplate(key)}"`
  ).join(" ");
}

export {
  setProjectAnnotations,
  __definePreview,
  moduleMetadata,
  applicationConfig,
  componentWrapperDecorator,
  argsToTemplate
};
