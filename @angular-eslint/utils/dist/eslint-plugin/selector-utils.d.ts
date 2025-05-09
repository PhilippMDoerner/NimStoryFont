import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import type { SelectorStyle } from './ast-utils';
export declare const OPTION_TYPE_ATTRIBUTE = "attribute";
export declare const OPTION_TYPE_ATTRS = "attrs";
export declare const OPTION_TYPE_ELEMENT = "element";
export type SelectorStyleOption = SelectorStyle | string;
export type SelectorTypeOption = typeof OPTION_TYPE_ATTRIBUTE | typeof OPTION_TYPE_ELEMENT | string;
export type SelectorTypeInternal = typeof OPTION_TYPE_ATTRS | typeof OPTION_TYPE_ELEMENT;
export type Options = [
    {
        readonly type: SelectorTypeOption | readonly SelectorTypeOption[];
        readonly prefix: string | readonly string[];
        readonly style: SelectorTypeOption;
    }
];
export declare const SelectorValidator: {
    attribute(selector: string): boolean;
    camelCase(selector: string): boolean;
    element(selector: string): boolean;
    kebabCase(selector: string): boolean;
    prefix(prefix: string, selectorStyle: string): (selector: string) => boolean;
};
export declare const reportPrefixError: (node: TSESTree.Node, prefix: string | readonly string[], context: Readonly<TSESLint.RuleContext<string, readonly unknown[]>>) => void;
export declare const reportStyleError: (node: TSESTree.Node, style: SelectorStyleOption, context: Readonly<TSESLint.RuleContext<string, readonly unknown[]>>) => void;
export declare const reportStyleAndPrefixError: (node: TSESTree.Node, style: SelectorStyleOption, prefix: string | readonly string[], context: Readonly<TSESLint.RuleContext<string, readonly unknown[]>>) => void;
export declare const reportTypeError: (node: TSESTree.Node, type: SelectorTypeOption | readonly SelectorTypeOption[], context: Readonly<TSESLint.RuleContext<string, readonly unknown[]>>) => void;
export declare const checkValidOptions: (type: SelectorTypeOption | readonly SelectorTypeOption[], prefix: string | readonly string[], style: SelectorStyleOption) => boolean;
export declare const checkSelector: (node: TSESTree.Node, typeOption: SelectorTypeOption | readonly SelectorTypeOption[], prefixOption: readonly string[], styleOption: SelectorStyle) => {
    readonly hasExpectedPrefix: boolean;
    readonly hasExpectedType: boolean;
    readonly hasExpectedStyle: boolean;
} | null;
//# sourceMappingURL=selector-utils.d.ts.map