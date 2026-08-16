/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import ts from 'typescript';
import { TodoCategory } from './todo-notes';
export declare class RefactorReporter {
    private logger;
    private filesScanned;
    private filesTransformed;
    private readonly todos;
    private readonly verboseLogs;
    private readonly fileTodos;
    constructor(logger: {
        info(message: string): void;
        warn(message: string): void;
    });
    get hasTodos(): boolean;
    incrementScannedFiles(): void;
    incrementTransformedFiles(): void;
    recordTodo(category: TodoCategory, sourceFile: ts.SourceFile, node: ts.Node): void;
    reportTransformation(sourceFile: ts.SourceFile, node: ts.Node, message: string): void;
    generateReportContent(): string;
    printSummary(verbose?: boolean): void;
}
