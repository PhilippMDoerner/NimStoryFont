import { declare } from '@babel/helper-plugin-utils';
import { createClassFeaturePlugin, FEATURES } from '@babel/helper-create-class-features-plugin';

const index = declare((api, options) => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  return createClassFeaturePlugin({
    name: "transform-class-properties",
    api,
    feature: FEATURES.fields,
    loose: options.loose
  });
});

export { index as default };
//# sourceMappingURL=index.js.map
