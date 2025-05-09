import type { TSESLint } from '@typescript-eslint/utils';
declare const templateParser: TSESLint.FlatConfig.Parser;
declare const tsPlugin: TSESLint.FlatConfig.Plugin;
declare const templatePlugin: TSESLint.FlatConfig.Plugin;
declare const configs: {
    tsAll: TSESLint.FlatConfig.ConfigArray;
    tsRecommended: TSESLint.FlatConfig.ConfigArray;
    templateAll: TSESLint.FlatConfig.ConfigArray;
    templateRecommended: TSESLint.FlatConfig.ConfigArray;
    templateAccessibility: TSESLint.FlatConfig.ConfigArray;
};
declare const processInlineTemplates: TSESLint.Processor.LooseProcessorModule | undefined;
declare const _default: {
    configs: {
        tsAll: TSESLint.FlatConfig.ConfigArray;
        tsRecommended: TSESLint.FlatConfig.ConfigArray;
        templateAll: TSESLint.FlatConfig.ConfigArray;
        templateRecommended: TSESLint.FlatConfig.ConfigArray;
        templateAccessibility: TSESLint.FlatConfig.ConfigArray;
    };
    tsPlugin: TSESLint.FlatConfig.Plugin;
    templateParser: {
        meta?: { [K in keyof TSESLint.Parser.ParserMeta]?: TSESLint.Parser.ParserMeta[K] | undefined; };
        parseForESLint(text: string, options?: unknown): { [k in keyof TSESLint.Parser.ParseResult]: unknown; };
    };
    templatePlugin: TSESLint.FlatConfig.Plugin;
    processInlineTemplates: TSESLint.Processor.LooseProcessorModule | undefined;
};
export default _default;
export { configs, templateParser, templatePlugin, tsPlugin, processInlineTemplates, };
//# sourceMappingURL=index.d.ts.map