type LabelComponent = {
    readonly inputs?: readonly string[];
    readonly selector: string;
};
export type Options = [
    {
        readonly controlComponents?: readonly string[];
        readonly labelComponents?: readonly LabelComponent[];
        readonly checkIds?: boolean;
    }
];
export type MessageIds = 'labelHasAssociatedControl';
export declare const RULE_NAME = "label-has-associated-control";
declare const _default: import("@typescript-eslint/utils/ts-eslint").RuleModule<"labelHasAssociatedControl", Options, import("../utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
export default _default;
//# sourceMappingURL=label-has-associated-control.d.ts.map