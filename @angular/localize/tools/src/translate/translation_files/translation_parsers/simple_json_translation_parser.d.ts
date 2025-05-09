import { ParseAnalysis, ParsedTranslationBundle, TranslationParser } from './translation_parser';
interface SimpleJsonFile {
    locale: string;
    translations: {
        [messageId: string]: string;
    };
}
/**
 * A translation parser that can parse JSON that has the form:
 *
 * ```json
 * {
 *   "locale": "...",
 *   "translations": {
 *     "message-id": "Target message string",
 *     ...
 *   }
 * }
 * ```
 *
 * @see SimpleJsonTranslationSerializer
 * @publicApi used by CLI
 */
export declare class SimpleJsonTranslationParser implements TranslationParser<SimpleJsonFile> {
    analyze(filePath: string, contents: string): ParseAnalysis<SimpleJsonFile>;
    parse(_filePath: string, contents: string, json?: SimpleJsonFile): ParsedTranslationBundle;
}
export {};
