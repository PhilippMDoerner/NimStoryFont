declare const _default: {
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
        "alt-text": import("@typescript-eslint/utils/ts-eslint").RuleModule<"altText", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "attributes-order": import("@typescript-eslint/utils/ts-eslint").RuleModule<"attributesOrder", import("./rules/attributes-order").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "banana-in-box": import("@typescript-eslint/utils/ts-eslint").RuleModule<"bananaInBox", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "button-has-type": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/button-has-type").MessageIds, import("./rules/button-has-type").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "click-events-have-key-events": import("@typescript-eslint/utils/ts-eslint").RuleModule<"clickEventsHaveKeyEvents", import("./rules/click-events-have-key-events").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "conditional-complexity": import("@typescript-eslint/utils/ts-eslint").RuleModule<"conditionalComplexity", import("./rules/conditional-complexity").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "cyclomatic-complexity": import("@typescript-eslint/utils/ts-eslint").RuleModule<"cyclomaticComplexity", import("./rules/cyclomatic-complexity").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "elements-content": import("@typescript-eslint/utils/ts-eslint").RuleModule<"elementsContent", import("./rules/elements-content").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        eqeqeq: import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/eqeqeq").MessageIds, import("./rules/eqeqeq").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        i18n: import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/i18n").MessageIds, import("./rules/i18n").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "interactive-supports-focus": import("@typescript-eslint/utils/ts-eslint").RuleModule<"interactiveSupportsFocus", import("./rules/interactive-supports-focus").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "label-has-associated-control": import("@typescript-eslint/utils/ts-eslint").RuleModule<"labelHasAssociatedControl", import("./rules/label-has-associated-control").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "mouse-events-have-key-events": import("@typescript-eslint/utils/ts-eslint").RuleModule<"mouseEventsHaveKeyEvents", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "no-any": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/no-any").MessageIds, [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "no-autofocus": import("@typescript-eslint/utils/ts-eslint").RuleModule<"noAutofocus", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "no-call-expression": import("@typescript-eslint/utils/ts-eslint").RuleModule<"noCallExpression", import("./rules/no-call-expression").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "prefer-built-in-pipes": import("@typescript-eslint/utils/ts-eslint").RuleModule<"preferBuiltInPipes", import("./rules/prefer-built-in-pipes").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "no-distracting-elements": import("@typescript-eslint/utils/ts-eslint").RuleModule<"noDistractingElements", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "no-duplicate-attributes": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/no-duplicate-attributes").MessageIds, import("./rules/no-duplicate-attributes").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "no-empty-control-flow": import("@typescript-eslint/utils/ts-eslint").RuleModule<"noEmptyControlFlow", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "no-inline-styles": import("@typescript-eslint/utils/ts-eslint").RuleModule<"noInlineStyles", import("./rules/no-inline-styles").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "no-interpolation-in-attributes": import("@typescript-eslint/utils/ts-eslint").RuleModule<"noInterpolationInAttributes", import("./rules/no-interpolation-in-attributes").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "no-negated-async": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/no-negated-async").MessageIds, [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "no-nested-tags": import("@typescript-eslint/utils/ts-eslint").RuleModule<"noNestedTags", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "no-non-null-assertion": import("@typescript-eslint/utils/ts-eslint").RuleModule<"noNonNullAssertion", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "no-outerhtml": import("@typescript-eslint/utils/ts-eslint").RuleModule<"noOuterHtml", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "no-positive-tabindex": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/no-positive-tabindex").MessageIds, [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "prefer-at-else": import("@typescript-eslint/utils/ts-eslint").RuleModule<"preferAtElse", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "prefer-at-empty": import("@typescript-eslint/utils/ts-eslint").RuleModule<"preferAtEmpty", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "prefer-class-binding": import("@typescript-eslint/utils/ts-eslint").RuleModule<"preferClassBinding", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "prefer-contextual-for-variables": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/prefer-contextual-for-variables").MessageIds, import("./rules/prefer-contextual-for-variables").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "prefer-control-flow": import("@typescript-eslint/utils/ts-eslint").RuleModule<"preferControlFlow", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "prefer-ngsrc": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/prefer-ngsrc").MessageIds, [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "prefer-self-closing-tags": import("@typescript-eslint/utils/ts-eslint").RuleModule<"preferSelfClosingTags", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "prefer-static-string-properties": import("@typescript-eslint/utils/ts-eslint").RuleModule<"preferStaticStringProperties", import("./rules/prefer-static-string-properties").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "prefer-template-literal": import("@typescript-eslint/utils/ts-eslint").RuleModule<"preferTemplateLiteral", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "require-switch-default": import("@typescript-eslint/utils/ts-eslint").RuleModule<"requireSwitchDefault", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "role-has-required-aria": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/role-has-required-aria").MessageIds, [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "table-scope": import("@typescript-eslint/utils/ts-eslint").RuleModule<"tableScope", [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "use-track-by-function": import("@typescript-eslint/utils/ts-eslint").RuleModule<"useTrackByFunction", import("./rules/use-track-by-function").Options, import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
        "valid-aria": import("@typescript-eslint/utils/ts-eslint").RuleModule<import("./rules/valid-aria").MessageIds, [], import("./utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
            name: string;
        };
    };
};
export = _default;
//# sourceMappingURL=index.d.ts.map