declare const _default: {
    configs: {
        all: {
            parser: string;
            plugins: string[];
            rules: {
                "@angular-eslint/template/alt-text": string;
                "@angular-eslint/template/attributes-order": string;
                "@angular-eslint/template/banana-in-box": string;
                "@angular-eslint/template/button-has-type": string;
                "@angular-eslint/template/click-events-have-key-events": string;
                "@angular-eslint/template/conditional-complexity": string;
                "@angular-eslint/template/cyclomatic-complexity": string;
                "@angular-eslint/template/elements-content": string;
                "@angular-eslint/template/eqeqeq": string;
                "@angular-eslint/template/i18n": string;
                "@angular-eslint/template/interactive-supports-focus": string;
                "@angular-eslint/template/label-has-associated-control": string;
                "@angular-eslint/template/mouse-events-have-key-events": string;
                "@angular-eslint/template/no-any": string;
                "@angular-eslint/template/no-autofocus": string;
                "@angular-eslint/template/no-call-expression": string;
                "@angular-eslint/template/no-distracting-elements": string;
                "@angular-eslint/template/no-duplicate-attributes": string;
                "@angular-eslint/template/no-inline-styles": string;
                "@angular-eslint/template/no-interpolation-in-attributes": string;
                "@angular-eslint/template/no-negated-async": string;
                "@angular-eslint/template/no-positive-tabindex": string;
                "@angular-eslint/template/prefer-contextual-for-variables": string;
                "@angular-eslint/template/prefer-control-flow": string;
                "@angular-eslint/template/prefer-ngsrc": string;
                "@angular-eslint/template/prefer-self-closing-tags": string;
                "@angular-eslint/template/prefer-static-string-properties": string;
                "@angular-eslint/template/role-has-required-aria": string;
                "@angular-eslint/template/table-scope": string;
                "@angular-eslint/template/use-track-by-function": string;
                "@angular-eslint/template/valid-aria": string;
            };
        };
        recommended: {
            parser: string;
            plugins: string[];
            rules: {
                "@angular-eslint/template/banana-in-box": string;
                "@angular-eslint/template/eqeqeq": string;
                "@angular-eslint/template/no-negated-async": string;
            };
        };
        accessibility: {
            parser: string;
            plugins: string[];
            rules: {
                "@angular-eslint/template/alt-text": string;
                "@angular-eslint/template/click-events-have-key-events": string;
                "@angular-eslint/template/elements-content": string;
                "@angular-eslint/template/interactive-supports-focus": string;
                "@angular-eslint/template/label-has-associated-control": string;
                "@angular-eslint/template/mouse-events-have-key-events": string;
                "@angular-eslint/template/no-autofocus": string;
                "@angular-eslint/template/no-distracting-elements": string;
                "@angular-eslint/template/role-has-required-aria": string;
                "@angular-eslint/template/table-scope": string;
                "@angular-eslint/template/valid-aria": string;
            };
        };
        'process-inline-templates': {
            parser: string;
            parserOptions: {
                ecmaVersion: number;
                sourceType: string;
            };
            plugins: string[];
            processor: string;
        };
    };
    processors: {
        'extract-inline-html': {
            meta: {
                name: string;
            };
            preprocess: typeof import("./processors").preprocessComponentFile;
            postprocess: typeof import("./processors").postprocessComponentFile;
            supportsAutofix: boolean;
        };
    };
    rules: {
        "alt-text": import("@typescript-eslint/utils/ts-eslint").RuleModule<"altText", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "attributes-order": import("@typescript-eslint/utils/ts-eslint").RuleModule<"attributesOrder", import("./rules/attributes-order").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "banana-in-box": import("@typescript-eslint/utils/ts-eslint").RuleModule<"bananaInBox", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "button-has-type": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/button-has-type").MessageIds, import("./rules/button-has-type").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "click-events-have-key-events": import("@typescript-eslint/utils/ts-eslint").RuleModule<"clickEventsHaveKeyEvents", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "conditional-complexity": import("@typescript-eslint/utils/ts-eslint").RuleModule<"conditionalComplexity", import("./rules/conditional-complexity").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "cyclomatic-complexity": import("@typescript-eslint/utils/ts-eslint").RuleModule<"cyclomaticComplexity", import("./rules/cyclomatic-complexity").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "elements-content": import("@typescript-eslint/utils/ts-eslint").RuleModule<"elementsContent", import("./rules/elements-content").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        eqeqeq: import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/eqeqeq").MessageIds, import("./rules/eqeqeq").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        i18n: import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/i18n").MessageIds, import("./rules/i18n").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "interactive-supports-focus": import("@typescript-eslint/utils/ts-eslint").RuleModule<"interactiveSupportsFocus", import("./rules/interactive-supports-focus").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "label-has-associated-control": import("@typescript-eslint/utils/ts-eslint").RuleModule<"labelHasAssociatedControl", import("./rules/label-has-associated-control").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "mouse-events-have-key-events": import("@typescript-eslint/utils/ts-eslint").RuleModule<"mouseEventsHaveKeyEvents", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "no-any": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/no-any").MessageIds, [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "no-autofocus": import("@typescript-eslint/utils/ts-eslint").RuleModule<"noAutofocus", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "no-call-expression": import("@typescript-eslint/utils/ts-eslint").RuleModule<"noCallExpression", import("./rules/no-call-expression").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "no-distracting-elements": import("@typescript-eslint/utils/ts-eslint").RuleModule<"noDistractingElements", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "no-duplicate-attributes": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/no-duplicate-attributes").MessageIds, import("./rules/no-duplicate-attributes").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "no-inline-styles": import("@typescript-eslint/utils/ts-eslint").RuleModule<"noInlineStyles", import("./rules/no-inline-styles").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "no-interpolation-in-attributes": import("@typescript-eslint/utils/ts-eslint").RuleModule<"noInterpolationInAttributes", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "no-negated-async": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/no-negated-async").MessageIds, [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "no-positive-tabindex": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/no-positive-tabindex").MessageIds, [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "prefer-contextual-for-variables": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/prefer-contextual-for-variables").MessageIds, import("./rules/prefer-contextual-for-variables").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "prefer-control-flow": import("@typescript-eslint/utils/ts-eslint").RuleModule<"preferControlFlow", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "prefer-self-closing-tags": import("@typescript-eslint/utils/ts-eslint").RuleModule<"preferSelfClosingTags", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "prefer-static-string-properties": import("@typescript-eslint/utils/ts-eslint").RuleModule<"preferStaticStringProperties", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "prefer-ngsrc": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/prefer-ngsrc").MessageIds, [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "role-has-required-aria": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/role-has-required-aria").MessageIds, [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "table-scope": import("@typescript-eslint/utils/ts-eslint").RuleModule<"tableScope", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "use-track-by-function": import("@typescript-eslint/utils/ts-eslint").RuleModule<"useTrackByFunction", import("./rules/use-track-by-function").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
        "valid-aria": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/valid-aria").MessageIds, [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
    };
};
export = _default;
//# sourceMappingURL=index.d.ts.map