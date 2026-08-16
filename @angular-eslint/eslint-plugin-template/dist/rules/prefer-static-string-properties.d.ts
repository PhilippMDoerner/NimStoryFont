export type Options = [
    {
        readonly ignore?: readonly string[];
    }
];
export type MessageIds = 'preferStaticStringProperties';
export declare const RULE_NAME = "prefer-static-string-properties";
declare const _default: import("@typescript-eslint/utils/ts-eslint").RuleModule<"preferStaticStringProperties", Options, import("../utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
};
export default _default;
export declare const RULE_DOCS_EXTENSION: {
    rationale: string;
};
//# sourceMappingURL=prefer-static-string-properties.d.ts.map