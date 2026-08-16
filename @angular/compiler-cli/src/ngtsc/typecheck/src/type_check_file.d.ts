/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { DomSchemaChecker, OutOfBandDiagnosticRecorder, TcbExpr, TcbGenericContextBehavior, TypeCheckingConfig } from '@angular/compiler';
import ts from 'typescript';
import { AbsoluteFsPath } from '../../file_system';
import { Reference, ReferenceEmitter } from '../../imports';
import { ClassDeclaration, ReflectionHost } from '../../reflection';
import { TypeCheckBlockMetadata } from '../api';
import { Environment } from './environment';
export declare const TCB_FUNCTION_PREFIX = "_tcb";
/**
 * An `Environment` representing the single type-checking file into which most (if not all) Type
 * Check Blocks (TCBs) will be generated.
 *
 * The `TypeCheckFile` hosts multiple TCBs and allows the sharing of declarations (e.g. type
 * constructors) between them. Rather than return such declarations via `getPreludeStatements()`, it
 * hoists them to the top of the generated `ts.SourceFile`.
 */
export declare class TypeCheckFile extends Environment {
    readonly fileName: AbsoluteFsPath;
    readonly isTypeCheckFile = true;
    private nextTcbId;
    private tcbStatements;
    private sourceContent;
    get hasCopiedSource(): boolean;
    setSourceContent(text: string): void;
    constructor(fileName: AbsoluteFsPath, config: TypeCheckingConfig, refEmitter: ReferenceEmitter, compilerHost: Pick<ts.CompilerHost, 'getCanonicalFileName'>);
    addTypeCheckBlock(ref: Reference<ClassDeclaration<ts.ClassDeclaration>>, meta: TypeCheckBlockMetadata, domSchemaChecker: DomSchemaChecker<unknown>, oobRecorder: OutOfBandDiagnosticRecorder<unknown>, genericContextBehavior: TcbGenericContextBehavior, reflector: ReflectionHost): void;
    render(): string;
    getPreludeStatements(): TcbExpr[];
}
