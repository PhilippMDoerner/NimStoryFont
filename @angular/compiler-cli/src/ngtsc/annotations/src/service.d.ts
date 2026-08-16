/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { R3ClassMetadata, R3ServiceMetadata } from '@angular/compiler';
import { PartialEvaluator } from '../../partial_evaluator';
import { PerfRecorder } from '../../perf';
import { ClassDeclaration, Decorator, ReflectionHost } from '../../reflection';
import { AnalysisOutput, CompilationMode, CompileResult, DecoratorHandler, DetectResult, HandlerPrecedence, ResolveResult } from '../../transform';
export interface ServiceHandlerData {
    meta: R3ServiceMetadata;
    classMetadata: R3ClassMetadata | null;
}
/**
 * Adapts the `compileService` compiler for `@Service` decorators to the Ivy compiler.
 */
export declare class ServiceDecoratorHandler implements DecoratorHandler<Decorator, ServiceHandlerData, null, unknown> {
    private reflector;
    private evaluator;
    private isCore;
    private perf;
    private includeClassMetadata;
    private readonly compilationMode;
    constructor(reflector: ReflectionHost, evaluator: PartialEvaluator, isCore: boolean, perf: PerfRecorder, includeClassMetadata: boolean, compilationMode: CompilationMode);
    readonly precedence = HandlerPrecedence.SHARED;
    readonly name = "ServiceDecoratorHandler";
    detect(node: ClassDeclaration, decorators: Decorator[] | null): DetectResult<Decorator> | undefined;
    analyze(node: ClassDeclaration, decorator: Readonly<Decorator>): AnalysisOutput<ServiceHandlerData>;
    symbol(): null;
    resolve(node: ClassDeclaration): ResolveResult<unknown>;
    compileFull(node: ClassDeclaration, analysis: Readonly<ServiceHandlerData>): CompileResult[];
    compilePartial(node: ClassDeclaration, analysis: Readonly<ServiceHandlerData>): CompileResult[];
    compileLocal(node: ClassDeclaration, analysis: Readonly<ServiceHandlerData>): CompileResult[];
    private compile;
    /**
     * Read metadata from the `@Service` decorator and produce the metadata needed to run
     * `compileService`.
     *
     * A `null` return value indicates this is `@Service` has invalid data.
     */
    private extractServiceMetadata;
    private getDependencyInjectionDiagnostics;
}
