//#region code/lib/eslint-plugin/.dts-emit/code/lib/eslint-plugin/src/index.d.ts
declare const configs: {
  csf: {
    plugins: string[];
    overrides: ({
      files: string[];
      rules: {
        readonly 'react-hooks/rules-of-hooks': "off";
        readonly 'import-x/no-anonymous-default-export': "off";
        readonly 'storybook/csf-component': "warn";
        readonly 'storybook/default-exports': "error";
        readonly 'storybook/hierarchy-separator': "warn";
        readonly 'storybook/no-redundant-story-name': "warn";
        readonly 'storybook/story-exports': "error";
        readonly 'storybook/no-uninstalled-addons'?: undefined;
      };
    } | {
      files: string[];
      rules: {
        readonly 'storybook/no-uninstalled-addons': "error";
        readonly 'react-hooks/rules-of-hooks'?: undefined;
        readonly 'import-x/no-anonymous-default-export'?: undefined;
        readonly 'storybook/csf-component'?: undefined;
        readonly 'storybook/default-exports'?: undefined;
        readonly 'storybook/hierarchy-separator'?: undefined;
        readonly 'storybook/no-redundant-story-name'?: undefined;
        readonly 'storybook/story-exports'?: undefined;
      };
    })[];
  };
  'csf-strict': {
    extends: string;
    overrides: {
      files: string[];
      rules: {
        readonly 'react-hooks/rules-of-hooks': "off";
        readonly 'import-x/no-anonymous-default-export': "off";
        readonly 'storybook/no-stories-of': "error";
        readonly 'storybook/no-title-property-in-meta': "error";
      };
    }[];
  };
  'addon-interactions': {
    plugins: string[];
    overrides: ({
      files: string[];
      rules: {
        readonly 'react-hooks/rules-of-hooks': "off";
        readonly 'import-x/no-anonymous-default-export': "off";
        readonly 'storybook/await-interactions': "error";
        readonly 'storybook/context-in-play-function': "error";
        readonly 'storybook/use-storybook-expect': "error";
        readonly 'storybook/use-storybook-testing-library': "error";
        readonly 'storybook/no-uninstalled-addons'?: undefined;
      };
    } | {
      files: string[];
      rules: {
        readonly 'storybook/no-uninstalled-addons': "error";
        readonly 'react-hooks/rules-of-hooks'?: undefined;
        readonly 'import-x/no-anonymous-default-export'?: undefined;
        readonly 'storybook/await-interactions'?: undefined;
        readonly 'storybook/context-in-play-function'?: undefined;
        readonly 'storybook/use-storybook-expect'?: undefined;
        readonly 'storybook/use-storybook-testing-library'?: undefined;
      };
    })[];
  };
  recommended: {
    plugins: string[];
    overrides: ({
      files: string[];
      rules: {
        readonly 'react-hooks/rules-of-hooks': "off";
        readonly 'import-x/no-anonymous-default-export': "off";
        readonly 'storybook/await-interactions': "error";
        readonly 'storybook/context-in-play-function': "error";
        readonly 'storybook/default-exports': "error";
        readonly 'storybook/hierarchy-separator': "warn";
        readonly 'storybook/no-redundant-story-name': "warn";
        readonly 'storybook/no-renderer-packages': "error";
        readonly 'storybook/prefer-pascal-case': "warn";
        readonly 'storybook/story-exports': "error";
        readonly 'storybook/use-storybook-expect': "error";
        readonly 'storybook/use-storybook-testing-library': "error";
        readonly 'storybook/no-uninstalled-addons'?: undefined;
      };
    } | {
      files: string[];
      rules: {
        readonly 'storybook/no-uninstalled-addons': "error";
        readonly 'react-hooks/rules-of-hooks'?: undefined;
        readonly 'import-x/no-anonymous-default-export'?: undefined;
        readonly 'storybook/await-interactions'?: undefined;
        readonly 'storybook/context-in-play-function'?: undefined;
        readonly 'storybook/default-exports'?: undefined;
        readonly 'storybook/hierarchy-separator'?: undefined;
        readonly 'storybook/no-redundant-story-name'?: undefined;
        readonly 'storybook/no-renderer-packages'?: undefined;
        readonly 'storybook/prefer-pascal-case'?: undefined;
        readonly 'storybook/story-exports'?: undefined;
        readonly 'storybook/use-storybook-expect'?: undefined;
        readonly 'storybook/use-storybook-testing-library'?: undefined;
      };
    })[];
  };
  'flat/csf': ({
    name: string;
    plugins: {
      readonly storybook: {
        configs: /*elided*/any;
        meta: {
          name: string;
          version: string;
        };
        rules: {
          'await-interactions': import("@typescript-eslint/utils/ts-eslint").RuleModule<"interactionShouldBeAwaited" | "fixSuggestion", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'context-in-play-function': import("@typescript-eslint/utils/ts-eslint").RuleModule<"passContextToPlayFunction", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'csf-component': import("@typescript-eslint/utils/ts-eslint").RuleModule<"missingComponentProperty", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'default-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"fixSuggestion" | "shouldHaveDefaultExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'hierarchy-separator': import("@typescript-eslint/utils/ts-eslint").RuleModule<"useCorrectSeparators" | "deprecatedHierarchySeparator", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'meta-inline-properties': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldHaveInlineProperties", {
            csfVersion: number;
          }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'meta-satisfies-type': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldSatisfyType", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-redundant-story-name': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeRedundantName" | "storyNameIsRedundant", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-renderer-packages': import("@typescript-eslint/utils/ts-eslint").RuleModule<"noRendererPackages", readonly [], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-stories-of': import("@typescript-eslint/utils/ts-eslint").RuleModule<"doNotUseStoriesOf", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-title-property-in-meta': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeTitleInMeta" | "noTitleInMeta", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-uninstalled-addons': import("@typescript-eslint/utils/ts-eslint").RuleModule<"addonIsNotInstalled", {
            packageJsonLocation: string;
            ignore: string[];
          }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'prefer-pascal-case': import("@typescript-eslint/utils/ts-eslint").RuleModule<"convertToPascalCase" | "usePascalCase", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'story-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"shouldHaveStoryExport" | "shouldHaveStoryExportWithFilters" | "addStoryExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'use-storybook-expect': import("@typescript-eslint/utils/ts-eslint").RuleModule<string, {
            storybookJestPath?: string;
          }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'use-storybook-testing-library': import("@typescript-eslint/utils/ts-eslint").RuleModule<"updateImports" | "dontUseTestingLibraryDirectly", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
        };
      };
    };
    files?: undefined;
    rules?: undefined;
  } | {
    name: string;
    files: string[];
    rules: {
      readonly 'react-hooks/rules-of-hooks': "off";
      readonly 'import-x/no-anonymous-default-export': "off";
      readonly 'storybook/csf-component': "warn";
      readonly 'storybook/default-exports': "error";
      readonly 'storybook/hierarchy-separator': "warn";
      readonly 'storybook/no-redundant-story-name': "warn";
      readonly 'storybook/story-exports': "error";
      readonly 'storybook/no-uninstalled-addons'?: undefined;
    };
    plugins?: undefined;
  } | {
    name: string;
    files: string[];
    rules: {
      readonly 'storybook/no-uninstalled-addons': "error";
      readonly 'react-hooks/rules-of-hooks'?: undefined;
      readonly 'import-x/no-anonymous-default-export'?: undefined;
      readonly 'storybook/csf-component'?: undefined;
      readonly 'storybook/default-exports'?: undefined;
      readonly 'storybook/hierarchy-separator'?: undefined;
      readonly 'storybook/no-redundant-story-name'?: undefined;
      readonly 'storybook/story-exports'?: undefined;
    };
    plugins?: undefined;
  })[];
  'flat/csf-strict': ({
    name: string;
    plugins: {
      readonly storybook: {
        configs: /*elided*/any;
        meta: {
          name: string;
          version: string;
        };
        rules: {
          'await-interactions': import("@typescript-eslint/utils/ts-eslint").RuleModule<"interactionShouldBeAwaited" | "fixSuggestion", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'context-in-play-function': import("@typescript-eslint/utils/ts-eslint").RuleModule<"passContextToPlayFunction", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'csf-component': import("@typescript-eslint/utils/ts-eslint").RuleModule<"missingComponentProperty", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'default-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"fixSuggestion" | "shouldHaveDefaultExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'hierarchy-separator': import("@typescript-eslint/utils/ts-eslint").RuleModule<"useCorrectSeparators" | "deprecatedHierarchySeparator", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'meta-inline-properties': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldHaveInlineProperties", {
            csfVersion: number;
          }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'meta-satisfies-type': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldSatisfyType", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-redundant-story-name': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeRedundantName" | "storyNameIsRedundant", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-renderer-packages': import("@typescript-eslint/utils/ts-eslint").RuleModule<"noRendererPackages", readonly [], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-stories-of': import("@typescript-eslint/utils/ts-eslint").RuleModule<"doNotUseStoriesOf", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-title-property-in-meta': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeTitleInMeta" | "noTitleInMeta", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-uninstalled-addons': import("@typescript-eslint/utils/ts-eslint").RuleModule<"addonIsNotInstalled", {
            packageJsonLocation: string;
            ignore: string[];
          }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'prefer-pascal-case': import("@typescript-eslint/utils/ts-eslint").RuleModule<"convertToPascalCase" | "usePascalCase", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'story-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"shouldHaveStoryExport" | "shouldHaveStoryExportWithFilters" | "addStoryExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'use-storybook-expect': import("@typescript-eslint/utils/ts-eslint").RuleModule<string, {
            storybookJestPath?: string;
          }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'use-storybook-testing-library': import("@typescript-eslint/utils/ts-eslint").RuleModule<"updateImports" | "dontUseTestingLibraryDirectly", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
        };
      };
    };
    files?: undefined;
    rules?: undefined;
  } | {
    name: string;
    files: string[];
    rules: {
      readonly 'react-hooks/rules-of-hooks': "off";
      readonly 'import-x/no-anonymous-default-export': "off";
      readonly 'storybook/csf-component': "warn";
      readonly 'storybook/default-exports': "error";
      readonly 'storybook/hierarchy-separator': "warn";
      readonly 'storybook/no-redundant-story-name': "warn";
      readonly 'storybook/story-exports': "error";
      readonly 'storybook/no-uninstalled-addons'?: undefined;
    };
    plugins?: undefined;
  } | {
    name: string;
    files: string[];
    rules: {
      readonly 'storybook/no-uninstalled-addons': "error";
      readonly 'react-hooks/rules-of-hooks'?: undefined;
      readonly 'import-x/no-anonymous-default-export'?: undefined;
      readonly 'storybook/csf-component'?: undefined;
      readonly 'storybook/default-exports'?: undefined;
      readonly 'storybook/hierarchy-separator'?: undefined;
      readonly 'storybook/no-redundant-story-name'?: undefined;
      readonly 'storybook/story-exports'?: undefined;
    };
    plugins?: undefined;
  } | {
    name: string;
    files: string[];
    rules: {
      readonly 'react-hooks/rules-of-hooks': "off";
      readonly 'import-x/no-anonymous-default-export': "off";
      readonly 'storybook/no-stories-of': "error";
      readonly 'storybook/no-title-property-in-meta': "error";
    };
  })[];
  'flat/addon-interactions': ({
    name: string;
    plugins: {
      readonly storybook: {
        configs: /*elided*/any;
        meta: {
          name: string;
          version: string;
        };
        rules: {
          'await-interactions': import("@typescript-eslint/utils/ts-eslint").RuleModule<"interactionShouldBeAwaited" | "fixSuggestion", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'context-in-play-function': import("@typescript-eslint/utils/ts-eslint").RuleModule<"passContextToPlayFunction", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'csf-component': import("@typescript-eslint/utils/ts-eslint").RuleModule<"missingComponentProperty", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'default-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"fixSuggestion" | "shouldHaveDefaultExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'hierarchy-separator': import("@typescript-eslint/utils/ts-eslint").RuleModule<"useCorrectSeparators" | "deprecatedHierarchySeparator", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'meta-inline-properties': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldHaveInlineProperties", {
            csfVersion: number;
          }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'meta-satisfies-type': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldSatisfyType", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-redundant-story-name': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeRedundantName" | "storyNameIsRedundant", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-renderer-packages': import("@typescript-eslint/utils/ts-eslint").RuleModule<"noRendererPackages", readonly [], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-stories-of': import("@typescript-eslint/utils/ts-eslint").RuleModule<"doNotUseStoriesOf", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-title-property-in-meta': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeTitleInMeta" | "noTitleInMeta", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-uninstalled-addons': import("@typescript-eslint/utils/ts-eslint").RuleModule<"addonIsNotInstalled", {
            packageJsonLocation: string;
            ignore: string[];
          }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'prefer-pascal-case': import("@typescript-eslint/utils/ts-eslint").RuleModule<"convertToPascalCase" | "usePascalCase", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'story-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"shouldHaveStoryExport" | "shouldHaveStoryExportWithFilters" | "addStoryExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'use-storybook-expect': import("@typescript-eslint/utils/ts-eslint").RuleModule<string, {
            storybookJestPath?: string;
          }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'use-storybook-testing-library': import("@typescript-eslint/utils/ts-eslint").RuleModule<"updateImports" | "dontUseTestingLibraryDirectly", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
        };
      };
    };
    files?: undefined;
    rules?: undefined;
  } | {
    name: string;
    files: string[];
    rules: {
      readonly 'react-hooks/rules-of-hooks': "off";
      readonly 'import-x/no-anonymous-default-export': "off";
      readonly 'storybook/await-interactions': "error";
      readonly 'storybook/context-in-play-function': "error";
      readonly 'storybook/use-storybook-expect': "error";
      readonly 'storybook/use-storybook-testing-library': "error";
      readonly 'storybook/no-uninstalled-addons'?: undefined;
    };
    plugins?: undefined;
  } | {
    name: string;
    files: string[];
    rules: {
      readonly 'storybook/no-uninstalled-addons': "error";
      readonly 'react-hooks/rules-of-hooks'?: undefined;
      readonly 'import-x/no-anonymous-default-export'?: undefined;
      readonly 'storybook/await-interactions'?: undefined;
      readonly 'storybook/context-in-play-function'?: undefined;
      readonly 'storybook/use-storybook-expect'?: undefined;
      readonly 'storybook/use-storybook-testing-library'?: undefined;
    };
    plugins?: undefined;
  })[];
  'flat/recommended': ({
    name: string;
    plugins: {
      readonly storybook: {
        configs: /*elided*/any;
        meta: {
          name: string;
          version: string;
        };
        rules: {
          'await-interactions': import("@typescript-eslint/utils/ts-eslint").RuleModule<"interactionShouldBeAwaited" | "fixSuggestion", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'context-in-play-function': import("@typescript-eslint/utils/ts-eslint").RuleModule<"passContextToPlayFunction", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'csf-component': import("@typescript-eslint/utils/ts-eslint").RuleModule<"missingComponentProperty", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'default-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"fixSuggestion" | "shouldHaveDefaultExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'hierarchy-separator': import("@typescript-eslint/utils/ts-eslint").RuleModule<"useCorrectSeparators" | "deprecatedHierarchySeparator", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'meta-inline-properties': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldHaveInlineProperties", {
            csfVersion: number;
          }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'meta-satisfies-type': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldSatisfyType", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-redundant-story-name': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeRedundantName" | "storyNameIsRedundant", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-renderer-packages': import("@typescript-eslint/utils/ts-eslint").RuleModule<"noRendererPackages", readonly [], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-stories-of': import("@typescript-eslint/utils/ts-eslint").RuleModule<"doNotUseStoriesOf", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-title-property-in-meta': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeTitleInMeta" | "noTitleInMeta", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'no-uninstalled-addons': import("@typescript-eslint/utils/ts-eslint").RuleModule<"addonIsNotInstalled", {
            packageJsonLocation: string;
            ignore: string[];
          }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'prefer-pascal-case': import("@typescript-eslint/utils/ts-eslint").RuleModule<"convertToPascalCase" | "usePascalCase", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'story-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"shouldHaveStoryExport" | "shouldHaveStoryExportWithFilters" | "addStoryExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'use-storybook-expect': import("@typescript-eslint/utils/ts-eslint").RuleModule<string, {
            storybookJestPath?: string;
          }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
          'use-storybook-testing-library': import("@typescript-eslint/utils/ts-eslint").RuleModule<"updateImports" | "dontUseTestingLibraryDirectly", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
          };
        };
      };
    };
    files?: undefined;
    rules?: undefined;
  } | {
    name: string;
    files: string[];
    rules: {
      readonly 'react-hooks/rules-of-hooks': "off";
      readonly 'import-x/no-anonymous-default-export': "off";
      readonly 'storybook/await-interactions': "error";
      readonly 'storybook/context-in-play-function': "error";
      readonly 'storybook/default-exports': "error";
      readonly 'storybook/hierarchy-separator': "warn";
      readonly 'storybook/no-redundant-story-name': "warn";
      readonly 'storybook/no-renderer-packages': "error";
      readonly 'storybook/prefer-pascal-case': "warn";
      readonly 'storybook/story-exports': "error";
      readonly 'storybook/use-storybook-expect': "error";
      readonly 'storybook/use-storybook-testing-library': "error";
      readonly 'storybook/no-uninstalled-addons'?: undefined;
    };
    plugins?: undefined;
  } | {
    name: string;
    files: string[];
    rules: {
      readonly 'storybook/no-uninstalled-addons': "error";
      readonly 'react-hooks/rules-of-hooks'?: undefined;
      readonly 'import-x/no-anonymous-default-export'?: undefined;
      readonly 'storybook/await-interactions'?: undefined;
      readonly 'storybook/context-in-play-function'?: undefined;
      readonly 'storybook/default-exports'?: undefined;
      readonly 'storybook/hierarchy-separator'?: undefined;
      readonly 'storybook/no-redundant-story-name'?: undefined;
      readonly 'storybook/no-renderer-packages'?: undefined;
      readonly 'storybook/prefer-pascal-case'?: undefined;
      readonly 'storybook/story-exports'?: undefined;
      readonly 'storybook/use-storybook-expect'?: undefined;
      readonly 'storybook/use-storybook-testing-library'?: undefined;
    };
    plugins?: undefined;
  })[];
};
declare const rules: {
  'await-interactions': import("@typescript-eslint/utils/ts-eslint").RuleModule<"interactionShouldBeAwaited" | "fixSuggestion", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
  };
  'context-in-play-function': import("@typescript-eslint/utils/ts-eslint").RuleModule<"passContextToPlayFunction", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
  };
  'csf-component': import("@typescript-eslint/utils/ts-eslint").RuleModule<"missingComponentProperty", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
  };
  'default-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"fixSuggestion" | "shouldHaveDefaultExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
  };
  'hierarchy-separator': import("@typescript-eslint/utils/ts-eslint").RuleModule<"useCorrectSeparators" | "deprecatedHierarchySeparator", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
  };
  'meta-inline-properties': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldHaveInlineProperties", {
    csfVersion: number;
  }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
  };
  'meta-satisfies-type': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldSatisfyType", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
  };
  'no-redundant-story-name': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeRedundantName" | "storyNameIsRedundant", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
  };
  'no-renderer-packages': import("@typescript-eslint/utils/ts-eslint").RuleModule<"noRendererPackages", readonly [], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
  };
  'no-stories-of': import("@typescript-eslint/utils/ts-eslint").RuleModule<"doNotUseStoriesOf", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
  };
  'no-title-property-in-meta': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeTitleInMeta" | "noTitleInMeta", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
  };
  'no-uninstalled-addons': import("@typescript-eslint/utils/ts-eslint").RuleModule<"addonIsNotInstalled", {
    packageJsonLocation: string;
    ignore: string[];
  }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
  };
  'prefer-pascal-case': import("@typescript-eslint/utils/ts-eslint").RuleModule<"convertToPascalCase" | "usePascalCase", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
  };
  'story-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"shouldHaveStoryExport" | "shouldHaveStoryExportWithFilters" | "addStoryExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
  };
  'use-storybook-expect': import("@typescript-eslint/utils/ts-eslint").RuleModule<string, {
    storybookJestPath?: string;
  }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
  };
  'use-storybook-testing-library': import("@typescript-eslint/utils/ts-eslint").RuleModule<"updateImports" | "dontUseTestingLibraryDirectly", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
  };
};
declare const meta: {
  name: string;
  version: string;
};
declare const _default: {
  configs: {
    csf: {
      plugins: string[];
      overrides: ({
        files: string[];
        rules: {
          readonly 'react-hooks/rules-of-hooks': "off";
          readonly 'import-x/no-anonymous-default-export': "off";
          readonly 'storybook/csf-component': "warn";
          readonly 'storybook/default-exports': "error";
          readonly 'storybook/hierarchy-separator': "warn";
          readonly 'storybook/no-redundant-story-name': "warn";
          readonly 'storybook/story-exports': "error";
          readonly 'storybook/no-uninstalled-addons'?: undefined;
        };
      } | {
        files: string[];
        rules: {
          readonly 'storybook/no-uninstalled-addons': "error";
          readonly 'react-hooks/rules-of-hooks'?: undefined;
          readonly 'import-x/no-anonymous-default-export'?: undefined;
          readonly 'storybook/csf-component'?: undefined;
          readonly 'storybook/default-exports'?: undefined;
          readonly 'storybook/hierarchy-separator'?: undefined;
          readonly 'storybook/no-redundant-story-name'?: undefined;
          readonly 'storybook/story-exports'?: undefined;
        };
      })[];
    };
    'csf-strict': {
      extends: string;
      overrides: {
        files: string[];
        rules: {
          readonly 'react-hooks/rules-of-hooks': "off";
          readonly 'import-x/no-anonymous-default-export': "off";
          readonly 'storybook/no-stories-of': "error";
          readonly 'storybook/no-title-property-in-meta': "error";
        };
      }[];
    };
    'addon-interactions': {
      plugins: string[];
      overrides: ({
        files: string[];
        rules: {
          readonly 'react-hooks/rules-of-hooks': "off";
          readonly 'import-x/no-anonymous-default-export': "off";
          readonly 'storybook/await-interactions': "error";
          readonly 'storybook/context-in-play-function': "error";
          readonly 'storybook/use-storybook-expect': "error";
          readonly 'storybook/use-storybook-testing-library': "error";
          readonly 'storybook/no-uninstalled-addons'?: undefined;
        };
      } | {
        files: string[];
        rules: {
          readonly 'storybook/no-uninstalled-addons': "error";
          readonly 'react-hooks/rules-of-hooks'?: undefined;
          readonly 'import-x/no-anonymous-default-export'?: undefined;
          readonly 'storybook/await-interactions'?: undefined;
          readonly 'storybook/context-in-play-function'?: undefined;
          readonly 'storybook/use-storybook-expect'?: undefined;
          readonly 'storybook/use-storybook-testing-library'?: undefined;
        };
      })[];
    };
    recommended: {
      plugins: string[];
      overrides: ({
        files: string[];
        rules: {
          readonly 'react-hooks/rules-of-hooks': "off";
          readonly 'import-x/no-anonymous-default-export': "off";
          readonly 'storybook/await-interactions': "error";
          readonly 'storybook/context-in-play-function': "error";
          readonly 'storybook/default-exports': "error";
          readonly 'storybook/hierarchy-separator': "warn";
          readonly 'storybook/no-redundant-story-name': "warn";
          readonly 'storybook/no-renderer-packages': "error";
          readonly 'storybook/prefer-pascal-case': "warn";
          readonly 'storybook/story-exports': "error";
          readonly 'storybook/use-storybook-expect': "error";
          readonly 'storybook/use-storybook-testing-library': "error";
          readonly 'storybook/no-uninstalled-addons'?: undefined;
        };
      } | {
        files: string[];
        rules: {
          readonly 'storybook/no-uninstalled-addons': "error";
          readonly 'react-hooks/rules-of-hooks'?: undefined;
          readonly 'import-x/no-anonymous-default-export'?: undefined;
          readonly 'storybook/await-interactions'?: undefined;
          readonly 'storybook/context-in-play-function'?: undefined;
          readonly 'storybook/default-exports'?: undefined;
          readonly 'storybook/hierarchy-separator'?: undefined;
          readonly 'storybook/no-redundant-story-name'?: undefined;
          readonly 'storybook/no-renderer-packages'?: undefined;
          readonly 'storybook/prefer-pascal-case'?: undefined;
          readonly 'storybook/story-exports'?: undefined;
          readonly 'storybook/use-storybook-expect'?: undefined;
          readonly 'storybook/use-storybook-testing-library'?: undefined;
        };
      })[];
    };
    'flat/csf': ({
      name: string;
      plugins: {
        readonly storybook: {
          configs: /*elided*/any;
          meta: {
            name: string;
            version: string;
          };
          rules: {
            'await-interactions': import("@typescript-eslint/utils/ts-eslint").RuleModule<"interactionShouldBeAwaited" | "fixSuggestion", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'context-in-play-function': import("@typescript-eslint/utils/ts-eslint").RuleModule<"passContextToPlayFunction", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'csf-component': import("@typescript-eslint/utils/ts-eslint").RuleModule<"missingComponentProperty", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'default-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"fixSuggestion" | "shouldHaveDefaultExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'hierarchy-separator': import("@typescript-eslint/utils/ts-eslint").RuleModule<"useCorrectSeparators" | "deprecatedHierarchySeparator", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'meta-inline-properties': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldHaveInlineProperties", {
              csfVersion: number;
            }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'meta-satisfies-type': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldSatisfyType", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-redundant-story-name': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeRedundantName" | "storyNameIsRedundant", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-renderer-packages': import("@typescript-eslint/utils/ts-eslint").RuleModule<"noRendererPackages", readonly [], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-stories-of': import("@typescript-eslint/utils/ts-eslint").RuleModule<"doNotUseStoriesOf", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-title-property-in-meta': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeTitleInMeta" | "noTitleInMeta", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-uninstalled-addons': import("@typescript-eslint/utils/ts-eslint").RuleModule<"addonIsNotInstalled", {
              packageJsonLocation: string;
              ignore: string[];
            }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'prefer-pascal-case': import("@typescript-eslint/utils/ts-eslint").RuleModule<"convertToPascalCase" | "usePascalCase", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'story-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"shouldHaveStoryExport" | "shouldHaveStoryExportWithFilters" | "addStoryExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'use-storybook-expect': import("@typescript-eslint/utils/ts-eslint").RuleModule<string, {
              storybookJestPath?: string;
            }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'use-storybook-testing-library': import("@typescript-eslint/utils/ts-eslint").RuleModule<"updateImports" | "dontUseTestingLibraryDirectly", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
          };
        };
      };
      files?: undefined;
      rules?: undefined;
    } | {
      name: string;
      files: string[];
      rules: {
        readonly 'react-hooks/rules-of-hooks': "off";
        readonly 'import-x/no-anonymous-default-export': "off";
        readonly 'storybook/csf-component': "warn";
        readonly 'storybook/default-exports': "error";
        readonly 'storybook/hierarchy-separator': "warn";
        readonly 'storybook/no-redundant-story-name': "warn";
        readonly 'storybook/story-exports': "error";
        readonly 'storybook/no-uninstalled-addons'?: undefined;
      };
      plugins?: undefined;
    } | {
      name: string;
      files: string[];
      rules: {
        readonly 'storybook/no-uninstalled-addons': "error";
        readonly 'react-hooks/rules-of-hooks'?: undefined;
        readonly 'import-x/no-anonymous-default-export'?: undefined;
        readonly 'storybook/csf-component'?: undefined;
        readonly 'storybook/default-exports'?: undefined;
        readonly 'storybook/hierarchy-separator'?: undefined;
        readonly 'storybook/no-redundant-story-name'?: undefined;
        readonly 'storybook/story-exports'?: undefined;
      };
      plugins?: undefined;
    })[];
    'flat/csf-strict': ({
      name: string;
      plugins: {
        readonly storybook: {
          configs: /*elided*/any;
          meta: {
            name: string;
            version: string;
          };
          rules: {
            'await-interactions': import("@typescript-eslint/utils/ts-eslint").RuleModule<"interactionShouldBeAwaited" | "fixSuggestion", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'context-in-play-function': import("@typescript-eslint/utils/ts-eslint").RuleModule<"passContextToPlayFunction", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'csf-component': import("@typescript-eslint/utils/ts-eslint").RuleModule<"missingComponentProperty", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'default-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"fixSuggestion" | "shouldHaveDefaultExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'hierarchy-separator': import("@typescript-eslint/utils/ts-eslint").RuleModule<"useCorrectSeparators" | "deprecatedHierarchySeparator", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'meta-inline-properties': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldHaveInlineProperties", {
              csfVersion: number;
            }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'meta-satisfies-type': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldSatisfyType", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-redundant-story-name': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeRedundantName" | "storyNameIsRedundant", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-renderer-packages': import("@typescript-eslint/utils/ts-eslint").RuleModule<"noRendererPackages", readonly [], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-stories-of': import("@typescript-eslint/utils/ts-eslint").RuleModule<"doNotUseStoriesOf", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-title-property-in-meta': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeTitleInMeta" | "noTitleInMeta", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-uninstalled-addons': import("@typescript-eslint/utils/ts-eslint").RuleModule<"addonIsNotInstalled", {
              packageJsonLocation: string;
              ignore: string[];
            }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'prefer-pascal-case': import("@typescript-eslint/utils/ts-eslint").RuleModule<"convertToPascalCase" | "usePascalCase", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'story-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"shouldHaveStoryExport" | "shouldHaveStoryExportWithFilters" | "addStoryExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'use-storybook-expect': import("@typescript-eslint/utils/ts-eslint").RuleModule<string, {
              storybookJestPath?: string;
            }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'use-storybook-testing-library': import("@typescript-eslint/utils/ts-eslint").RuleModule<"updateImports" | "dontUseTestingLibraryDirectly", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
          };
        };
      };
      files?: undefined;
      rules?: undefined;
    } | {
      name: string;
      files: string[];
      rules: {
        readonly 'react-hooks/rules-of-hooks': "off";
        readonly 'import-x/no-anonymous-default-export': "off";
        readonly 'storybook/csf-component': "warn";
        readonly 'storybook/default-exports': "error";
        readonly 'storybook/hierarchy-separator': "warn";
        readonly 'storybook/no-redundant-story-name': "warn";
        readonly 'storybook/story-exports': "error";
        readonly 'storybook/no-uninstalled-addons'?: undefined;
      };
      plugins?: undefined;
    } | {
      name: string;
      files: string[];
      rules: {
        readonly 'storybook/no-uninstalled-addons': "error";
        readonly 'react-hooks/rules-of-hooks'?: undefined;
        readonly 'import-x/no-anonymous-default-export'?: undefined;
        readonly 'storybook/csf-component'?: undefined;
        readonly 'storybook/default-exports'?: undefined;
        readonly 'storybook/hierarchy-separator'?: undefined;
        readonly 'storybook/no-redundant-story-name'?: undefined;
        readonly 'storybook/story-exports'?: undefined;
      };
      plugins?: undefined;
    } | {
      name: string;
      files: string[];
      rules: {
        readonly 'react-hooks/rules-of-hooks': "off";
        readonly 'import-x/no-anonymous-default-export': "off";
        readonly 'storybook/no-stories-of': "error";
        readonly 'storybook/no-title-property-in-meta': "error";
      };
    })[];
    'flat/addon-interactions': ({
      name: string;
      plugins: {
        readonly storybook: {
          configs: /*elided*/any;
          meta: {
            name: string;
            version: string;
          };
          rules: {
            'await-interactions': import("@typescript-eslint/utils/ts-eslint").RuleModule<"interactionShouldBeAwaited" | "fixSuggestion", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'context-in-play-function': import("@typescript-eslint/utils/ts-eslint").RuleModule<"passContextToPlayFunction", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'csf-component': import("@typescript-eslint/utils/ts-eslint").RuleModule<"missingComponentProperty", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'default-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"fixSuggestion" | "shouldHaveDefaultExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'hierarchy-separator': import("@typescript-eslint/utils/ts-eslint").RuleModule<"useCorrectSeparators" | "deprecatedHierarchySeparator", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'meta-inline-properties': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldHaveInlineProperties", {
              csfVersion: number;
            }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'meta-satisfies-type': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldSatisfyType", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-redundant-story-name': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeRedundantName" | "storyNameIsRedundant", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-renderer-packages': import("@typescript-eslint/utils/ts-eslint").RuleModule<"noRendererPackages", readonly [], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-stories-of': import("@typescript-eslint/utils/ts-eslint").RuleModule<"doNotUseStoriesOf", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-title-property-in-meta': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeTitleInMeta" | "noTitleInMeta", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-uninstalled-addons': import("@typescript-eslint/utils/ts-eslint").RuleModule<"addonIsNotInstalled", {
              packageJsonLocation: string;
              ignore: string[];
            }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'prefer-pascal-case': import("@typescript-eslint/utils/ts-eslint").RuleModule<"convertToPascalCase" | "usePascalCase", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'story-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"shouldHaveStoryExport" | "shouldHaveStoryExportWithFilters" | "addStoryExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'use-storybook-expect': import("@typescript-eslint/utils/ts-eslint").RuleModule<string, {
              storybookJestPath?: string;
            }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'use-storybook-testing-library': import("@typescript-eslint/utils/ts-eslint").RuleModule<"updateImports" | "dontUseTestingLibraryDirectly", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
          };
        };
      };
      files?: undefined;
      rules?: undefined;
    } | {
      name: string;
      files: string[];
      rules: {
        readonly 'react-hooks/rules-of-hooks': "off";
        readonly 'import-x/no-anonymous-default-export': "off";
        readonly 'storybook/await-interactions': "error";
        readonly 'storybook/context-in-play-function': "error";
        readonly 'storybook/use-storybook-expect': "error";
        readonly 'storybook/use-storybook-testing-library': "error";
        readonly 'storybook/no-uninstalled-addons'?: undefined;
      };
      plugins?: undefined;
    } | {
      name: string;
      files: string[];
      rules: {
        readonly 'storybook/no-uninstalled-addons': "error";
        readonly 'react-hooks/rules-of-hooks'?: undefined;
        readonly 'import-x/no-anonymous-default-export'?: undefined;
        readonly 'storybook/await-interactions'?: undefined;
        readonly 'storybook/context-in-play-function'?: undefined;
        readonly 'storybook/use-storybook-expect'?: undefined;
        readonly 'storybook/use-storybook-testing-library'?: undefined;
      };
      plugins?: undefined;
    })[];
    'flat/recommended': ({
      name: string;
      plugins: {
        readonly storybook: {
          configs: /*elided*/any;
          meta: {
            name: string;
            version: string;
          };
          rules: {
            'await-interactions': import("@typescript-eslint/utils/ts-eslint").RuleModule<"interactionShouldBeAwaited" | "fixSuggestion", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'context-in-play-function': import("@typescript-eslint/utils/ts-eslint").RuleModule<"passContextToPlayFunction", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'csf-component': import("@typescript-eslint/utils/ts-eslint").RuleModule<"missingComponentProperty", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'default-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"fixSuggestion" | "shouldHaveDefaultExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'hierarchy-separator': import("@typescript-eslint/utils/ts-eslint").RuleModule<"useCorrectSeparators" | "deprecatedHierarchySeparator", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'meta-inline-properties': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldHaveInlineProperties", {
              csfVersion: number;
            }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'meta-satisfies-type': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldSatisfyType", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-redundant-story-name': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeRedundantName" | "storyNameIsRedundant", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-renderer-packages': import("@typescript-eslint/utils/ts-eslint").RuleModule<"noRendererPackages", readonly [], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-stories-of': import("@typescript-eslint/utils/ts-eslint").RuleModule<"doNotUseStoriesOf", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-title-property-in-meta': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeTitleInMeta" | "noTitleInMeta", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'no-uninstalled-addons': import("@typescript-eslint/utils/ts-eslint").RuleModule<"addonIsNotInstalled", {
              packageJsonLocation: string;
              ignore: string[];
            }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'prefer-pascal-case': import("@typescript-eslint/utils/ts-eslint").RuleModule<"convertToPascalCase" | "usePascalCase", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'story-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"shouldHaveStoryExport" | "shouldHaveStoryExportWithFilters" | "addStoryExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'use-storybook-expect': import("@typescript-eslint/utils/ts-eslint").RuleModule<string, {
              storybookJestPath?: string;
            }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
            'use-storybook-testing-library': import("@typescript-eslint/utils/ts-eslint").RuleModule<"updateImports" | "dontUseTestingLibraryDirectly", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
              name: string;
            };
          };
        };
      };
      files?: undefined;
      rules?: undefined;
    } | {
      name: string;
      files: string[];
      rules: {
        readonly 'react-hooks/rules-of-hooks': "off";
        readonly 'import-x/no-anonymous-default-export': "off";
        readonly 'storybook/await-interactions': "error";
        readonly 'storybook/context-in-play-function': "error";
        readonly 'storybook/default-exports': "error";
        readonly 'storybook/hierarchy-separator': "warn";
        readonly 'storybook/no-redundant-story-name': "warn";
        readonly 'storybook/no-renderer-packages': "error";
        readonly 'storybook/prefer-pascal-case': "warn";
        readonly 'storybook/story-exports': "error";
        readonly 'storybook/use-storybook-expect': "error";
        readonly 'storybook/use-storybook-testing-library': "error";
        readonly 'storybook/no-uninstalled-addons'?: undefined;
      };
      plugins?: undefined;
    } | {
      name: string;
      files: string[];
      rules: {
        readonly 'storybook/no-uninstalled-addons': "error";
        readonly 'react-hooks/rules-of-hooks'?: undefined;
        readonly 'import-x/no-anonymous-default-export'?: undefined;
        readonly 'storybook/await-interactions'?: undefined;
        readonly 'storybook/context-in-play-function'?: undefined;
        readonly 'storybook/default-exports'?: undefined;
        readonly 'storybook/hierarchy-separator'?: undefined;
        readonly 'storybook/no-redundant-story-name'?: undefined;
        readonly 'storybook/no-renderer-packages'?: undefined;
        readonly 'storybook/prefer-pascal-case'?: undefined;
        readonly 'storybook/story-exports'?: undefined;
        readonly 'storybook/use-storybook-expect'?: undefined;
        readonly 'storybook/use-storybook-testing-library'?: undefined;
      };
      plugins?: undefined;
    })[];
  };
  meta: {
    name: string;
    version: string;
  };
  rules: {
    'await-interactions': import("@typescript-eslint/utils/ts-eslint").RuleModule<"interactionShouldBeAwaited" | "fixSuggestion", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
      name: string;
    };
    'context-in-play-function': import("@typescript-eslint/utils/ts-eslint").RuleModule<"passContextToPlayFunction", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
      name: string;
    };
    'csf-component': import("@typescript-eslint/utils/ts-eslint").RuleModule<"missingComponentProperty", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
      name: string;
    };
    'default-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"fixSuggestion" | "shouldHaveDefaultExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
      name: string;
    };
    'hierarchy-separator': import("@typescript-eslint/utils/ts-eslint").RuleModule<"useCorrectSeparators" | "deprecatedHierarchySeparator", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
      name: string;
    };
    'meta-inline-properties': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldHaveInlineProperties", {
      csfVersion: number;
    }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
      name: string;
    };
    'meta-satisfies-type': import("@typescript-eslint/utils/ts-eslint").RuleModule<"metaShouldSatisfyType", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
      name: string;
    };
    'no-redundant-story-name': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeRedundantName" | "storyNameIsRedundant", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
      name: string;
    };
    'no-renderer-packages': import("@typescript-eslint/utils/ts-eslint").RuleModule<"noRendererPackages", readonly [], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
      name: string;
    };
    'no-stories-of': import("@typescript-eslint/utils/ts-eslint").RuleModule<"doNotUseStoriesOf", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
      name: string;
    };
    'no-title-property-in-meta': import("@typescript-eslint/utils/ts-eslint").RuleModule<"removeTitleInMeta" | "noTitleInMeta", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
      name: string;
    };
    'no-uninstalled-addons': import("@typescript-eslint/utils/ts-eslint").RuleModule<"addonIsNotInstalled", {
      packageJsonLocation: string;
      ignore: string[];
    }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
      name: string;
    };
    'prefer-pascal-case': import("@typescript-eslint/utils/ts-eslint").RuleModule<"convertToPascalCase" | "usePascalCase", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
      name: string;
    };
    'story-exports': import("@typescript-eslint/utils/ts-eslint").RuleModule<"shouldHaveStoryExport" | "shouldHaveStoryExportWithFilters" | "addStoryExport", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
      name: string;
    };
    'use-storybook-expect': import("@typescript-eslint/utils/ts-eslint").RuleModule<string, {
      storybookJestPath?: string;
    }[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
      name: string;
    };
    'use-storybook-testing-library': import("@typescript-eslint/utils/ts-eslint").RuleModule<"updateImports" | "dontUseTestingLibraryDirectly", never[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
      name: string;
    };
  };
};
//#endregion
export { configs, _default as default, meta, rules };