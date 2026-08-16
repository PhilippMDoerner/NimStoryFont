function patchSassLoaders(rules) {
  for (const rule of rules) {
    if (!rule) continue;

    // Recurse into nested rule arrays (webpack commonly nests rules
    // under `oneOf` or `rules` for conditional matching)
    if (Array.isArray(rule.oneOf)) {
      patchSassLoaders(rule.oneOf);
    }
    if (Array.isArray(rule.rules)) {
      patchSassLoaders(rule.rules);
    }

    if (!rule.test?.toString().includes("scss")) continue;
    if (!Array.isArray(rule.use)) continue;

    rule.use.forEach((loader) => {
      if (loader?.loader?.includes("sass-loader")) {
        loader.options = {
          ...loader.options,
          sassOptions: {
            ...loader.options?.sassOptions,
            quietDeps: true,
            silenceDeprecations: [
              "import",
              "if-function",
              "color-functions",
              "global-builtin",
            ],
          },
        };
      }
    });
  }
}

module.exports = {
  stories: ["../src/**/*.stories.ts"],

  addons: [
    "@storybook/addon-a11y",
    "storybook-preset-inline-svg",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
  ],

  framework: {
    name: "@storybook/angular",
    options: {},
  },

  staticDirs: ["../src/assets", "../node_modules", "../src"],
  core: {
    disableTelemetry: true,
  },
  webpackFinal: async (config) => {
    console.log("Check");
    patchSassLoaders(config.module.rules);
    config.devtool = false;

    // Suppresses "X is part of the TypeScript compilation but it's unused"
    // warnings from @ngtools/webpack for files not reachable from any
    // *.stories.ts entry point. Remove once Storybook's tsconfig is scoped
    // tightly enough that this stops firing, or the files are confirmed dead.
    config.ignoreWarnings = [
      ...(config.ignoreWarnings ?? []),
      {
        message: /is part of the TypeScript compilation but it's unused/,
      },
    ];
    return config;
  },
};
