import { createRegExpFeaturePlugin } from '@babel/helper-create-regexp-features-plugin';
import { declare } from '@babel/helper-plugin-utils';

const index = declare(api => {
  api.assertVersion("^7.19.0 || ^8.0.0");
  return createRegExpFeaturePlugin({
    name: "transform-regexp-modifiers",
    feature: "modifiers"
  });
});

export { index as default };
//# sourceMappingURL=index.js.map
