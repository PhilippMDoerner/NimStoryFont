export type Options = [
    {
        maxComplexity?: number;
        variant?: 'classic' | 'modified';
    }
];
export type MessageIds = 'cyclomaticComplexity';
export declare const RULE_NAME = "cyclomatic-complexity";
declare const _default: import("@typescript-eslint/utils/ts-eslint").RuleModule<"cyclomaticComplexity", Options, import("../utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener> & {
    name: string;
};
export default _default;
export declare const RULE_DOCS_EXTENSION: {
    rationale: string;
};
//# sourceMappingURL=cyclomatic-complexity.d.ts.map