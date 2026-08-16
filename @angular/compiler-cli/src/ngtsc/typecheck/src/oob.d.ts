/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { AST, BindingPipe, OutOfBandDiagnosticCategory, OutOfBandDiagnosticRecorder, PropertyRead, TcbDirectiveMetadata, TmplAstBoundAttribute, TmplAstBoundEvent, TmplAstComponent, TmplAstDirective, TmplAstElement, TmplAstForLoopBlock, TmplAstForLoopBlockEmpty, TmplAstHoverDeferredTrigger, TmplAstIfBlockBranch, TmplAstInteractionDeferredTrigger, TmplAstLetDeclaration, TmplAstReference, TmplAstSwitchBlockCase, TmplAstTemplate, TmplAstTextAttribute, TmplAstVariable, TmplAstViewportDeferredTrigger, TypeCheckId } from '@angular/compiler';
import ts from 'typescript';
import { TemplateDiagnostic } from '../api';
import { TypeCheckSourceResolver } from './tcb_util';
export declare class OutOfBandDiagnosticRecorderImpl implements OutOfBandDiagnosticRecorder<TemplateDiagnostic> {
    private resolver;
    private getSourceFile;
    private readonly _diagnostics;
    /**
     * Tracks which `BindingPipe` nodes have already been recorded as invalid, so only one diagnostic
     * is ever produced per node.
     */
    private readonly recordedPipes;
    /** Common pipes that can be suggested to users. */
    private readonly pipeSuggestions;
    constructor(resolver: TypeCheckSourceResolver, getSourceFile?: (fileName: string) => ts.SourceFile | undefined);
    get diagnostics(): TemplateDiagnostic[];
    missingReferenceTarget(id: TypeCheckId, ref: TmplAstReference): void;
    missingPipe(id: TypeCheckId, ast: BindingPipe, isStandalone: boolean): void;
    deferredPipeUsedEagerly(id: TypeCheckId, ast: BindingPipe): void;
    deferredComponentUsedEagerly(id: TypeCheckId, element: TmplAstElement): void;
    duplicateTemplateVar(id: TypeCheckId, variable: TmplAstVariable, firstDecl: TmplAstVariable): void;
    suboptimalTypeInference(id: TypeCheckId, variables: TmplAstVariable[]): void;
    splitTwoWayBinding(id: TypeCheckId, input: TmplAstBoundAttribute, output: TmplAstBoundEvent, inputConsumer: Pick<TcbDirectiveMetadata, 'name' | 'isComponent' | 'ref'>, outputConsumer: Pick<TcbDirectiveMetadata, 'name' | 'isComponent' | 'ref'> | TmplAstElement): void;
    missingRequiredInputs(id: TypeCheckId, element: TmplAstElement | TmplAstTemplate | TmplAstComponent | TmplAstDirective, directiveName: string, isComponent: boolean, inputAliases: string[]): void;
    illegalForLoopTrackAccess(id: TypeCheckId, block: TmplAstForLoopBlock, access: PropertyRead): void;
    inaccessibleDeferredTriggerElement(id: TypeCheckId, trigger: TmplAstHoverDeferredTrigger | TmplAstInteractionDeferredTrigger | TmplAstViewportDeferredTrigger): void;
    controlFlowPreventingContentProjection(id: TypeCheckId, category: OutOfBandDiagnosticCategory, projectionNode: TmplAstElement | TmplAstTemplate, componentName: string, slotSelector: string, controlFlowNode: TmplAstIfBlockBranch | TmplAstSwitchBlockCase | TmplAstForLoopBlock | TmplAstForLoopBlockEmpty, preservesWhitespaces: boolean): void;
    illegalWriteToLetDeclaration(id: TypeCheckId, node: AST, target: TmplAstLetDeclaration): void;
    letUsedBeforeDefinition(id: TypeCheckId, node: PropertyRead, target: TmplAstLetDeclaration): void;
    conflictingDeclaration(id: TypeCheckId, decl: TmplAstLetDeclaration): void;
    missingNamedTemplateDependency(id: TypeCheckId, node: TmplAstComponent | TmplAstDirective): void;
    incorrectTemplateDependencyType(id: TypeCheckId, node: TmplAstComponent | TmplAstDirective): void;
    unclaimedDirectiveBinding(id: TypeCheckId, directive: TmplAstDirective, node: TmplAstBoundAttribute | TmplAstTextAttribute | TmplAstBoundEvent): void;
    deferImplicitTriggerMissingPlaceholder(id: TypeCheckId, trigger: TmplAstHoverDeferredTrigger | TmplAstInteractionDeferredTrigger | TmplAstViewportDeferredTrigger): void;
    deferImplicitTriggerInvalidPlaceholder(id: TypeCheckId, trigger: TmplAstHoverDeferredTrigger | TmplAstInteractionDeferredTrigger | TmplAstViewportDeferredTrigger): void;
    formFieldUnsupportedBinding(id: TypeCheckId, node: TmplAstBoundAttribute | TmplAstTextAttribute): void;
    multipleMatchingComponents(id: TypeCheckId, element: TmplAstElement, componentNames: string[]): void;
    conflictingHostDirectiveBinding(id: TypeCheckId, node: TmplAstElement | TmplAstTemplate | TmplAstComponent | TmplAstDirective, directiveName: string, kind: 'input' | 'output', classPropertyName: string, aliases: string[]): void;
    private getTagNameSpan;
}
