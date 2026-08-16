/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ConstantPool, R3DeclareServiceMetadata, R3PartialDeclaration, R3ServiceMetadata } from '@angular/compiler';
import { AstObject } from '../../ast/ast_value';
import { LinkedDefinition, PartialLinker } from './partial_linker';
/**
 * A `PartialLinker` that is designed to process `ɵɵngDeclareService()` call expressions.
 */
export declare class PartialServiceLinkerVersion1<TExpression> implements PartialLinker<TExpression> {
    linkPartialDeclaration(constantPool: ConstantPool, metaObj: AstObject<R3PartialDeclaration, TExpression>): LinkedDefinition;
}
/**
 * Derives the `R3ServiceMetadata` structure from the AST object.
 */
export declare function toR3ServiceMeta<TExpression>(metaObj: AstObject<R3DeclareServiceMetadata, TExpression>): R3ServiceMetadata;
