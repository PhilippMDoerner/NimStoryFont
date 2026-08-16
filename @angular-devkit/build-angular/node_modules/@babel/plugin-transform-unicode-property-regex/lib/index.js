import { createRegExpFeaturePlugin } from '@babel/helper-create-regexp-features-plugin';
import { declare } from '@babel/helper-plugin-utils';

const index = declare((api, options) => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  const {
    useUnicodeFlag = true
  } = options;
  if (typeof useUnicodeFlag !== "boolean") {
    throw new Error(".useUnicodeFlag must be a boolean, or undefined");
  }
  return createRegExpFeaturePlugin({
    name: "transform-unicode-property-regex",
    feature: "unicodePropertyEscape",
    options: {
      useUnicodeFlag
    }
  });
});

export { index as default };
//# sourceMappingURL=index.js.map
