import { declare } from '@babel/helper-plugin-utils';
import { createClassFeaturePlugin, FEATURES } from '@babel/helper-create-class-features-plugin';

const index = declare((api, options) => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  if ("loose" in options) {
    console.warn("@babel/plugin-transform-private-methods: The 'loose' option has been deprecated, " + "use the `privateFieldsAsProperties`(or `privateFieldsAsSymbols`), and `setPublicClassFields` assumptions instead (https://babeljs.io/assumptions).");
  }
  return createClassFeaturePlugin({
    name: "transform-private-methods",
    api,
    feature: FEATURES.privateMethods,
    loose: options.loose
  });
});

export { index as default };
//# sourceMappingURL=index.js.map
