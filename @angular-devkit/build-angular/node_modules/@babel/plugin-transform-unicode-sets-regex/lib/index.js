import { createRegExpFeaturePlugin } from '@babel/helper-create-regexp-features-plugin';
import { declare } from '@babel/helper-plugin-utils';

const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  return createRegExpFeaturePlugin({
    name: "transform-unicode-sets-regex",
    feature: "unicodeSetsFlag"
  });
});

export { index as default };
//# sourceMappingURL=index.js.map
