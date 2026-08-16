/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { AST, ClassPropertyMapping, MatchSource, ReferenceTarget, TemplateEntity, TmplAstBoundAttribute, TmplAstBoundEvent, TmplAstComponent, TmplAstDirective, TmplAstElement, TmplAstLetDeclaration, TmplAstNode, TmplAstReference, TmplAstTemplate, TmplAstTextAttribute, TmplAstVariable, TypeCheckingConfig } from '@angular/compiler';
import ts from 'typescript';
import { AbsoluteFsPath } from '../../file_system';
import { HostDirectiveMeta } from '../../metadata';
import { ClassDeclaration } from '../../reflection';
import { ElementSymbol, LetDeclarationSymbol, ReferenceSymbol, SelectorlessComponentSymbol, SelectorlessDirectiveSymbol, Symbol, SymbolReference, TemplateSymbol, VariableSymbol } from '../api';
export interface SymbolDirectiveMeta {
    getSymbolReference(): SymbolReference;
    getNgModule(): ClassDeclaration | null;
    matchSource: MatchSource;
    isComponent: boolean;
    selector: string | null;
    isStructural: boolean;
    inputs: ClassPropertyMapping;
    outputs: ClassPropertyMapping;
    hostDirectives?: HostDirectiveMeta[] | null;
}
export interface SymbolBoundTarget {
    getDirectivesOfNode(node: TmplAstNode): SymbolDirectiveMeta[] | null;
    getConsumerOfBinding(binding: TmplAstBoundAttribute | TmplAstBoundEvent | TmplAstTextAttribute): SymbolDirectiveMeta | TmplAstElement | TmplAstTemplate | null;
    getReferenceTarget(ref: TmplAstReference): ReferenceTarget<SymbolDirectiveMeta> | null;
    getExpressionTarget(expr: AST): TemplateEntity | null;
}
/**
 * Generates and caches `Symbol`s for various template structures for a given component.
 *
 * The `SymbolBuilder` internally caches the `Symbol`s it creates, and must be destroyed and
 * replaced if the component's template changes.
 */
export declare class SymbolBuilder {
    private readonly tcbPath;
    private readonly tcbIsShim;
    private readonly typeCheckBlock;
    private readonly boundTarget;
    private readonly typeCheckingConfig;
    private symbolCache;
    constructor(tcbPath: AbsoluteFsPath, tcbIsShim: boolean, typeCheckBlock: ts.Node, boundTarget: SymbolBoundTarget, typeCheckingConfig: TypeCheckingConfig);
    getSymbol(node: TmplAstTemplate | TmplAstElement): TemplateSymbol | ElementSymbol | null;
    getSymbol(node: TmplAstReference | TmplAstVariable | TmplAstLetDeclaration): ReferenceSymbol | VariableSymbol | LetDeclarationSymbol | null;
    getSymbol(node: TmplAstComponent): SelectorlessComponentSymbol | null;
    getSymbol(node: TmplAstDirective): SelectorlessDirectiveSymbol | null;
    getSymbol(node: AST | TmplAstNode): Symbol | null;
    private getSymbolOfAstTemplate;
    private getSymbolOfElement;
    private getSymbolOfSelectorlessComponent;
    private getSymbolOfSelectorlessDirective;
    private getDirectivesOfNode;
    private getDirectiveSymbolsForDirectives;
    private getSymbolOfBoundEvent;
    private getSymbolOfInputBinding;
    private getDirectiveSymbolForAccessExpression;
    private getSymbolOfVariable;
    private getSymbolOfReference;
    private getSymbolOfLetDeclaration;
    private getSymbolOfPipe;
    private getSymbolOfTemplateExpression;
    private getTcbSpanForNode;
    private getTcbLocationForNode;
    private getTcbPositionForNode;
}
