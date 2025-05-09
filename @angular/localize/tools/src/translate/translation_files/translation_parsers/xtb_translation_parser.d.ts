import { ParseAnalysis, ParsedTranslationBundle, TranslationParser } from './translation_parser';
import { XmlTranslationParserHint } from './translation_utils';
/**
 * A translation parser that can load XTB files.
 *
 * http://cldr.unicode.org/development/development-process/design-proposals/xmb
 *
 * @see XmbTranslationSerializer
 * @publicApi used by CLI
 */
export declare class XtbTranslationParser implements TranslationParser<XmlTranslationParserHint> {
    analyze(filePath: string, contents: string): ParseAnalysis<XmlTranslationParserHint>;
    parse(filePath: string, contents: string, hint: XmlTranslationParserHint): ParsedTranslationBundle;
    private extractBundle;
}
