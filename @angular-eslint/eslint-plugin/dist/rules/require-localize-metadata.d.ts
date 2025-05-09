export type Options = [
    {
        readonly requireDescription?: boolean;
        readonly requireMeaning?: boolean;
    }
];
export type MessageIds = 'requireLocalizeDescription' | 'requireLocalizeMeaning';
export declare const RULE_NAME = "require-localize-metadata";
declare const _default: import("@typescript-eslint/utils/ts-eslint").RuleModule<MessageIds, Options, import("../utils/create-eslint-rule").RuleDocs, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
export default _default;
//# sourceMappingURL=require-localize-metadata.d.ts.map