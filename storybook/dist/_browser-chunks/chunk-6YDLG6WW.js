// src/backgrounds/constants.ts
var ADDON_ID = "storybook/background", PARAM_KEY = "backgrounds", GRID_PARAM_KEY = "grid", EVENTS = {
  UPDATE: `${ADDON_ID}/update`
};

// src/backgrounds/defaults.ts
var DEFAULT_BACKGROUNDS = {
  light: { name: "light", value: "#F8F8F8" },
  dark: { name: "dark", value: "#333" }
};

export {
  ADDON_ID,
  PARAM_KEY,
  GRID_PARAM_KEY,
  EVENTS,
  DEFAULT_BACKGROUNDS
};
