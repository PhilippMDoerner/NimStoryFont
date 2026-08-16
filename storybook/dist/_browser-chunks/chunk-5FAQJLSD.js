import {
  array,
  custom,
  looseObject,
  object,
  optional,
  record,
  string,
  undefined_,
  void_
} from "./chunk-W6Y3UHOT.js";

// src/measure/constants.ts
var ADDON_ID = "storybook/measure-addon", TOOL_ID = `${ADDON_ID}/tool`, PARAM_KEY = "measureEnabled", EVENTS = {
  RESULT: `${ADDON_ID}/result`,
  REQUEST: `${ADDON_ID}/request`,
  CLEAR: `${ADDON_ID}/clear`
};

// src/outline/constants.ts
var ADDON_ID2 = "storybook/outline", PARAM_KEY2 = "outline";

// src/shared/open-service/services/docgen/definition.ts
import { defineService } from "storybook/open-service";

// src/shared/open-service/services/docgen/paths.ts
function docgenQueryStaticPath(id) {
  return `${id}.json`;
}

// src/shared/open-service/services/docgen/definition.ts
var docgenInputSchema = object({ id: string() }), argTypesSchema = custom(
  (value) => typeof value == "object" && value !== null && !Array.isArray(value)
), docgenErrorSchema = object({
  name: string(),
  message: string()
}), docgenJsDocTagsSchema = record(string(), array(string())), docgenComponentFields = {
  name: string(),
  path: string(),
  description: optional(string()),
  summary: optional(string()),
  jsDocTags: docgenJsDocTagsSchema,
  argTypes: optional(argTypesSchema),
  error: optional(docgenErrorSchema)
}, docgenSubcomponentFields = {
  ...docgenComponentFields,
  import: optional(string())
}, docgenSubcomponentSchema = looseObject(docgenSubcomponentFields), docgenPayloadSchema = looseObject({
  id: string(),
  ...docgenComponentFields,
  subcomponents: optional(record(string(), docgenSubcomponentSchema))
}), docgenOutputSchema = optional(docgenPayloadSchema), docgenServiceDef = defineService({
  id: "core/docgen",
  description: "Component documentation (name, description, props, JSDoc tags) keyed by component id.",
  initialState: { components: {} },
  queries: {
    docgen: {
      description: "Returns the docgen payload for one component id, or undefined when not loaded.",
      input: docgenInputSchema,
      output: docgenOutputSchema,
      handler: (input, ctx) => ctx.self.state.components[input.id],
      load: async (input, ctx) => {
        await ctx.self.commands.extractDocgen(input);
      },
      staticPath: (input) => docgenQueryStaticPath(input.id)
    },
    docgenForAllComponents: {
      description: "Returns docgen payloads for every component in the story index.",
      input: void_(),
      output: record(string(), docgenPayloadSchema),
      handler: (_input, ctx) => ctx.self.state.components,
      load: async (_input, ctx) => {
        await ctx.self.commands.extractAllDocgen(void 0);
      }
    }
  },
  commands: {
    extractDocgen: {
      description: "Resolves the story entry for a component id, runs the registered provider chain, writes the result into state, and returns it (or undefined when no provider produced docgen).",
      input: docgenInputSchema,
      output: docgenOutputSchema
      // Handler is supplied at registration time so it can close over the story index and the
      // composed experimental_docgenProvider chain.
    },
    extractAllDocgen: {
      description: "Extracts docgen for every component id in the story index by invoking `extractDocgen` for each.",
      input: undefined_(),
      output: void_()
      // Handler is supplied at registration time so it can close over the story index.
    }
  }
});

export {
  ADDON_ID,
  TOOL_ID,
  PARAM_KEY,
  ADDON_ID2,
  PARAM_KEY2,
  docgenServiceDef
};
