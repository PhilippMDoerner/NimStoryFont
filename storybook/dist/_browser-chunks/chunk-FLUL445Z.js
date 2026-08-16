import {
  mapValues,
  pickBy
} from "./chunk-5GYAEUAU.js";
import {
  isPlainObject
} from "./chunk-Z3B64JMR.js";
import {
  dedent
} from "./chunk-3LY4VQVK.js";

// src/preview-api/modules/store/parameters.ts
var combineParameters = (...parameterSets) => {
  let mergeKeys = {}, definedParametersSets = parameterSets.filter(Boolean), combined = definedParametersSets.reduce((acc, parameters) => (Object.entries(parameters).forEach(([key, value]) => {
    let existing = acc[key];
    Array.isArray(value) || typeof existing > "u" ? acc[key] = value : isPlainObject(value) && isPlainObject(existing) ? mergeKeys[key] = !0 : typeof value < "u" && (acc[key] = value);
  }), acc), {});
  return Object.keys(mergeKeys).forEach((key) => {
    let mergeValues = definedParametersSets.filter(Boolean).map((p) => p[key]).filter((value) => typeof value < "u");
    mergeValues.every((value) => isPlainObject(value)) ? combined[key] = combineParameters(...mergeValues) : combined[key] = mergeValues[mergeValues.length - 1];
  }), combined;
};

// src/preview-api/modules/store/filterArgTypes.ts
var matches = (name, descriptor) => Array.isArray(descriptor) ? descriptor.includes(name) : name.match(descriptor), filterArgTypes = (argTypes, include, exclude) => !include && !exclude ? argTypes : argTypes && pickBy(argTypes, (argType, key) => {
  let name = argType.name || key.toString();
  return !!(!include || matches(name, include)) && (!exclude || !matches(name, exclude));
});

// src/preview-api/modules/store/inferControls.ts
import { logger } from "storybook/internal/client-logger";
var inferControl = (argType, name, matchers) => {
  let { type, options } = argType;
  if (type) {
    if (matchers.color && matchers.color.test(name)) {
      let controlType = type.name;
      if (controlType === "string")
        return { control: { type: "color" } };
      controlType !== "enum" && logger.warn(
        `Addon controls: Control of type color only supports string, received "${controlType}" instead`
      );
    }
    if (matchers.date && matchers.date.test(name))
      return { control: { type: "date" } };
    switch (type.name) {
      case "array":
        return { control: { type: "object" } };
      case "boolean":
        return { control: { type: "boolean" } };
      case "string":
        return { control: { type: "text" } };
      case "number":
        return { control: { type: "number" } };
      case "enum": {
        let { value } = type;
        return { control: { type: value?.length <= 5 ? "radio" : "select" }, options: value };
      }
      case "function":
      case "symbol":
        return null;
      default:
        return { control: { type: options ? "select" : "object" } };
    }
  }
}, inferControls = (context) => {
  let {
    argTypes,
    parameters: { __isArgsStory, controls: { include = null, exclude = null, matchers = {} } = {} }
  } = context;
  if (!__isArgsStory)
    return argTypes;
  let filteredArgTypes = filterArgTypes(argTypes, include, exclude), withControls = mapValues(filteredArgTypes, (argType, name) => argType?.type && inferControl(argType, name.toString(), matchers));
  return combineParameters(withControls, filteredArgTypes);
};
inferControls.secondPass = !0;

// src/preview-api/modules/store/inferArgTypes.ts
import { logger as logger2 } from "storybook/internal/client-logger";
var inferType = (value, name, visited, cache) => {
  let type = typeof value;
  switch (type) {
    case "boolean":
    case "string":
    case "number":
    case "function":
    case "symbol":
      return { name: type };
    default:
      break;
  }
  if (value) {
    if (cache.has(value))
      return cache.get(value);
    if (visited.has(value))
      return logger2.warn(dedent`
        We've detected a cycle in arg '${name}'. Args should be JSON-serializable.

        Consider using the mapping feature or fully custom args:
        - Mapping: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
        - Custom args: https://storybook.js.org/docs/essentials/controls#fully-custom-args
      `), { name: "other", value: "cyclic object" };
    visited.add(value);
    let result;
    return Array.isArray(value) ? result = { name: "array", value: value.length > 0 ? inferType(value[0], name, visited, cache) : { name: "other", value: "unknown" } } : result = { name: "object", value: mapValues(value, (field) => inferType(field, name, visited, cache)) }, visited.delete(value), cache.set(value, result), result;
  }
  return { name: "object", value: {} };
}, inferArgTypes = (context) => {
  let { id, argTypes: userArgTypes = {}, initialArgs = {} } = context, cache = /* @__PURE__ */ new Map(), argTypes = Object.fromEntries(
    Object.entries(initialArgs).filter(([key]) => !userArgTypes[key]?.type).map(([key, arg]) => [
      key,
      {
        name: key,
        type: inferType(arg, `${id}.${key}`, /* @__PURE__ */ new Set(), cache)
      }
    ])
  ), userArgTypesNames = mapValues(userArgTypes, (argType, key) => ({
    name: key
  }));
  return combineParameters(argTypes, userArgTypesNames, userArgTypes);
};
inferArgTypes.secondPass = !0;

// src/docs-tools/argTypes/docgenServiceArgTypes.ts
function mergeServiceArgTypes({
  payload,
  storyId,
  parameters,
  initialArgs,
  customArgTypes
}) {
  let merged = combineParameters(payload.argTypes ?? {}, customArgTypes ?? {}), withInferredTypes = inferArgTypes({
    id: storyId,
    argTypes: merged,
    initialArgs: initialArgs ?? {}
  });
  return inferControls({
    argTypes: withInferredTypes,
    // The manager can render this before the preview reports `storyPrepared`, so `parameters` may be
    // undefined; `inferControls` reads `parameters.__isArgsStory` and would throw. An empty object
    // makes it a no-op until prepared parameters arrive and trigger a re-render.
    parameters: parameters ?? {}
  });
}
function getServiceSubcomponentArgTypes(payload) {
  return Object.fromEntries(
    Object.entries(payload.subcomponents ?? {}).flatMap(
      ([name, subcomponent]) => subcomponent.argTypes ? [[name, subcomponent.argTypes]] : []
    )
  );
}

export {
  combineParameters,
  inferArgTypes,
  filterArgTypes,
  inferControls,
  mergeServiceArgTypes,
  getServiceSubcomponentArgTypes
};
