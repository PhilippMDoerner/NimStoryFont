// ../addons/docs/src/blocks/controls/helpers.ts
var getControlId = (value, storyId, controlsId) => {
  let base = value.replace(/\s+/g, "-"), parts = ["control"];
  return controlsId && parts.push(controlsId), storyId && parts.push(storyId), parts.push(base), parts.join("-");
}, getControlSetterButtonId = (value, storyId, controlsId) => {
  let base = value.replace(/\s+/g, "-"), parts = ["set"];
  return controlsId && parts.push(controlsId), storyId && parts.push(storyId), parts.push(base), parts.join("-");
};

export {
  getControlId,
  getControlSetterButtonId
};
