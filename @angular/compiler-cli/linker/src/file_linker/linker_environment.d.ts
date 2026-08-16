/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ReadonlyFileSystem } from '../../../src/ngtsc/file_system/src/types';
import { Logger } from '../../../src/ngtsc/logging';
import { SourceFileLoader } from '../../../src/ngtsc/sourcemaps';
import { AstFactory } from '../../../src/ngtsc/translator';
import { AstHost } from '../ast/ast_host';
import { LinkerOptions } from './linker_options';
import { Translator } from './translator';
export declare class LinkerEnvironment<TStatement, TExpression, TType> {
    readonly fileSystem: ReadonlyFileSystem;
    readonly logger: Logger;
    readonly host: AstHost<TExpression>;
    readonly factory: AstFactory<TStatement, TExpression, TType>;
    readonly options: LinkerOptions;
    readonly translator: Translator<TStatement, TExpression, TType>;
    readonly sourceFileLoader: SourceFileLoader | null;
    private constructor();
    static create<TStatement, TExpression, TType>(fileSystem: ReadonlyFileSystem, logger: Logger, host: AstHost<TExpression>, factory: AstFactory<TStatement, TExpression, TType>, options: Partial<LinkerOptions>): LinkerEnvironment<TStatement, TExpression, TType>;
}
