import {
  __export,
  computesTemplateFromComponent,
  render,
  renderToCanvas
} from "./chunk-FPQDYJYM.js";

// src/client/config.ts
var config_exports = {};
__export(config_exports, {
  applyDecorators: () => decorateStory,
  argTypesEnhancers: () => argTypesEnhancers,
  parameters: () => parameters,
  render: () => render,
  renderToCanvas: () => renderToCanvas
});

// src/client/globals.ts
import { global } from "@storybook/global";
global.STORYBOOK_ENV = "angular";

// src/client/decorateStory.ts
import { sanitizeStoryContextUpdate } from "storybook/preview-api";
function decorateStory(mainStoryFn, decorators) {
  return [cleanArgsDecorator, ...decorators].reduce(
    (previousStoryFn, decorator) => (context) => decorator((update) => previousStoryFn({
      ...context,
      ...sanitizeStoryContextUpdate(update)
    }), context),
    (context) => prepareMain(mainStoryFn(context), context)
  );
}
var prepareMain = (story, context) => {
  let { template } = story, { component } = context, userDefinedTemplate = !hasNoTemplate(template);
  return !userDefinedTemplate && component && (template = computesTemplateFromComponent(component, story.props, "")), {
    ...story,
    ...template ? { template, userDefinedTemplate } : {}
  };
};
function hasNoTemplate(template) {
  return template == null;
}
var cleanArgsDecorator = (storyFn, context) => {
  if (!context.argTypes || !context.args)
    return storyFn();
  let argsToClean = context.args;
  return context.args = Object.entries(argsToClean).reduce((obj, [key, arg]) => {
    let argType = context.argTypes[key];
    return argType?.action || argType?.control ? { ...obj, [key]: arg } : obj;
  }, {}), storyFn();
};

// src/client/config.ts
import { enhanceArgTypes } from "storybook/internal/docs-tools";

// src/client/compodoc.ts
import { logger } from "storybook/internal/client-logger";
import { global as global2 } from "@storybook/global";
var { FEATURES } = global2, isMethod = (methodOrProp) => methodOrProp.args !== void 0;
var getCompodocJson = () => global2.__STORYBOOK_COMPODOC_JSON__, checkValidComponentOrDirective = (component) => {
  if (!component.name)
    throw new Error(`Invalid component ${JSON.stringify(component)}`);
}, checkValidCompodocJson = (compodocJson) => {
  if (!compodocJson || !compodocJson.components)
    throw new Error("Invalid compodoc JSON");
}, hasDecorator = (item, decoratorName) => item.decorators && item.decorators.find((x) => x.name === decoratorName), mapPropertyToSection = (item) => hasDecorator(item, "ViewChild") ? "view child" : hasDecorator(item, "ViewChildren") ? "view children" : hasDecorator(item, "ContentChild") ? "content child" : hasDecorator(item, "ContentChildren") ? "content children" : "properties", mapItemToSection = (key, item) => {
  switch (key) {
    case "methods":
    case "methodsClass":
      return "methods";
    case "inputsClass":
      return "inputs";
    case "outputsClass":
      return "outputs";
    case "properties":
    case "propertiesClass":
      if (isMethod(item))
        throw new Error("Cannot be of type Method if key === 'propertiesClass'");
      return mapPropertyToSection(item);
    default:
      throw new Error(`Unknown key: ${key}`);
  }
}, findComponentByName = (name, compodocJson) => compodocJson.components.find((c) => c.name === name) || compodocJson.directives.find((c) => c.name === name) || compodocJson.pipes.find((c) => c.name === name) || compodocJson.injectables.find((c) => c.name === name) || compodocJson.classes.find((c) => c.name === name), getComponentData = (component) => {
  if (!component)
    return null;
  checkValidComponentOrDirective(component);
  let compodocJson = getCompodocJson();
  if (!compodocJson)
    return null;
  checkValidCompodocJson(compodocJson);
  let { name } = component, metadata = findComponentByName(name, compodocJson);
  return metadata || logger.warn(`Component not found in compodoc JSON: '${name}'`), metadata;
}, displaySignature = (item) => `(${item.args.map(
  (arg) => `${arg.name}${arg.optional ? "?" : ""}: ${arg.type}`
).join(", ")}) => ${item.returnType}`, extractTypeFromValue = (defaultValue) => {
  let valueType = typeof defaultValue;
  return defaultValue || valueType === "number" || valueType === "boolean" || valueType === "string" ? valueType : null;
}, extractEnumValues = (compodocType) => {
  let enumType = getCompodocJson()?.miscellaneous?.enumerations?.find((x) => x.name === compodocType);
  if (enumType?.childs.every((x) => x.value))
    return enumType.childs.map((x) => x.value);
  if (typeof compodocType != "string" || compodocType.indexOf("|") === -1)
    return null;
  try {
    return compodocType.split("|").map((value) => JSON.parse(value));
  } catch {
    return null;
  }
}, extractType = (property, defaultValue) => {
  let compodocType = property.type || extractTypeFromValue(defaultValue);
  switch (compodocType) {
    case "string":
    case "boolean":
    case "number":
      return { name: compodocType };
    case void 0:
    case null:
      return { name: "other", value: "void" };
    default: {
      let resolvedType = resolveTypealias(compodocType), enumValues = extractEnumValues(resolvedType);
      return enumValues ? { name: "enum", value: enumValues } : { name: "other", value: "empty-enum" };
    }
  }
}, castDefaultValue = (property, defaultValue) => {
  let compodocType = property.type;
  if (["boolean", "number", "string", "EventEmitter"].includes(compodocType))
    switch (compodocType) {
      case "boolean":
        return defaultValue === "true";
      case "number":
        return Number(defaultValue);
      case "EventEmitter":
        return;
      default:
        return defaultValue;
    }
  else
    switch (defaultValue) {
      case "true":
        return !0;
      case "false":
        return !1;
      case "null":
        return null;
      case "undefined":
        return;
      default:
        return defaultValue;
    }
}, extractDefaultValueFromComments = (property, value) => {
  let commentValue = value;
  return property.jsdoctags.forEach((tag) => {
    ["default", "defaultvalue"].includes(tag.tagName.escapedText) && (commentValue = new global2.DOMParser().parseFromString(tag.comment, "text/html").body.textContent);
  }), commentValue;
}, extractDefaultValue = (property) => {
  try {
    let value = property.defaultValue?.replace(/^'(.*)'$/, "$1");
    return value = castDefaultValue(property, value), value == null && property.jsdoctags?.length > 0 && (value = extractDefaultValueFromComments(property, value)), value;
  } catch {
    logger.debug(`Error extracting ${property.name}: ${property.defaultValue}`);
    return;
  }
}, resolveTypealias = (compodocType) => {
  let typeAlias = getCompodocJson()?.miscellaneous?.typealiases?.find((x) => x.name === compodocType);
  return typeAlias ? resolveTypealias(typeAlias.rawtype) : compodocType;
}, extractArgTypesFromData = (componentData) => {
  let sectionToItems = {}, componentClasses = FEATURES.angularFilterNonInputControls ? ["inputsClass"] : ["propertiesClass", "methodsClass", "inputsClass", "outputsClass"], compodocClasses = ["component", "directive"].includes(componentData.type) ? componentClasses : ["properties", "methods"], inputClassNames = new Set(
    (componentData.inputsClass || []).map((item) => item.name)
  ), modelProperties = (componentData.outputsClass || []).filter((item) => inputClassNames.has(item.name)), modelPropertyNames = new Set(modelProperties.map((item) => item.name));
  compodocClasses.forEach((key) => {
    (componentData[key] || []).forEach((item) => {
      let section = mapItemToSection(key, item);
      if (key === "outputsClass" && !isMethod(item) && modelPropertyNames.has(item.name))
        return;
      let defaultValue = isMethod(item) ? void 0 : extractDefaultValue(item), type = isMethod(item) || section !== "inputs" && section !== "properties" ? { name: "other", value: "void" } : extractType(item, defaultValue), action = section === "outputs" ? { action: item.name } : {}, argType = {
        name: item.name,
        description: item.rawdescription || item.description,
        type,
        ...action,
        table: {
          category: section,
          type: {
            summary: isMethod(item) ? displaySignature(item) : item.type,
            required: isMethod(item) ? !1 : !item.optional
          },
          defaultValue: { summary: defaultValue }
        }
      };
      sectionToItems[section] || (sectionToItems[section] = []), sectionToItems[section].push(argType);
    });
  }), modelProperties.forEach((item) => {
    let changeName = `${item.name}Change`, argType = {
      name: changeName,
      description: item.rawdescription || item.description,
      type: { name: "other", value: "void" },
      action: changeName,
      table: {
        category: "outputs",
        type: {
          summary: `(e: ${item.type}) => void`,
          required: !item.optional
        }
      }
    };
    sectionToItems.outputs || (sectionToItems.outputs = []), sectionToItems.outputs.push(argType);
  });
  let SECTIONS = [
    "properties",
    "inputs",
    "outputs",
    "methods",
    "view child",
    "view children",
    "content child",
    "content children"
  ], argTypes = {};
  return SECTIONS.forEach((section) => {
    let items = sectionToItems[section];
    items && items.forEach((argType) => {
      argTypes[argType.name] = argType;
    });
  }), argTypes;
}, extractArgTypes = (component) => {
  let componentData = getComponentData(component);
  return componentData && extractArgTypesFromData(componentData);
}, extractComponentDescription = (component) => {
  let componentData = getComponentData(component);
  return componentData && (componentData.rawdescription || componentData.description);
};

// src/client/config.ts
var parameters = {
  renderer: "angular",
  docs: {
    story: { inline: !0 },
    extractArgTypes,
    extractComponentDescription
  }
}, argTypesEnhancers = [enhanceArgTypes];

export {
  decorateStory,
  parameters,
  argTypesEnhancers,
  config_exports
};
