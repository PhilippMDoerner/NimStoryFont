/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ParseErrorLevel, ParseSourceSpan } from '@angular/compiler';
/**
 * This error is thrown when there is a problem parsing a translation file.
 */
export declare class TranslationParseError extends Error {
    span: ParseSourceSpan;
    msg: string;
    level: ParseErrorLevel;
    constructor(span: ParseSourceSpan, msg: string, level?: ParseErrorLevel);
}
