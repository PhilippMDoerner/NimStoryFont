/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { TcbExpr, TcbReferenceMetadata } from '@angular/compiler';
import ts from 'typescript';
import { ImportFlags, Reference, ReferenceEmitter } from '../../imports';
import { ImportManager } from '../../translator';
/**
 * An environment for a given source file that can be used to emit references.
 *
 * This can be used by the type-checking block, or constructor logic to generate
 * references to directives or other symbols or types.
 */
export declare class ReferenceEmitEnvironment {
    readonly importManager: ImportManager;
    refEmitter: ReferenceEmitter;
    contextFile: ts.SourceFile;
    constructor(importManager: ImportManager, refEmitter: ReferenceEmitter, contextFile: ts.SourceFile);
    canReferenceType(ref: Reference, flags?: ImportFlags): boolean;
    /**
     * Generates a `TcbExpr` from a `TcbReferenceMetadata` object.
     */
    referenceTcbValue(ref: TcbReferenceMetadata): TcbExpr;
    referenceExternalSymbol(moduleName: string, name: string): TcbExpr;
}
