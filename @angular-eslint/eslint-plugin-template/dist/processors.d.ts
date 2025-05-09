/**
 * Because ultimately a user is in control of how and when this processor gets invoked,
 * we can't fully protect them against doing more work than is necessary in all cases.
 *
 * Therefore, before we do a full parse of a TypeScript file to try and extract one or
 * more Component declarations we want to do a really quick check for whether or not
 * a file is likely to contain them.
 */
export declare function isFileLikelyToContainComponentDeclarations(text: string, filename: string): boolean;
type PreprocessResult = (string | {
    text: string;
    filename: string;
})[];
export declare function preprocessComponentFile(text: string, filename: string): PreprocessResult;
export declare function postprocessComponentFile(multiDimensionalMessages: {
    ruleId: string;
    severity: number;
    message: string;
    line: number;
    column: number;
    nodeType: string;
    messageId: string;
    endLine: number;
    endColumn: number;
    fix?: {
        range: number[];
        text: string;
    };
}[][], filename: string): readonly unknown[];
declare const _default: {
    'extract-inline-html': {
        meta: {
            name: string;
        };
        preprocess: typeof preprocessComponentFile;
        postprocess: typeof postprocessComponentFile;
        supportsAutofix: boolean;
    };
};
export default _default;
//# sourceMappingURL=processors.d.ts.map