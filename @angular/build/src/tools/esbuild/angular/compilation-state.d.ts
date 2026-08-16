/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { type AngularCompilation } from '../../angular/compilation';
export declare class AngularCompilationContext {
    #private;
    constructor(compilation: AngularCompilation);
    get compilation(): AngularCompilation;
    get waitUntilReady(): Promise<boolean>;
    markAsReady(hasErrors: boolean): void;
    markAsInProgress(): void;
    dispose(): Promise<void>;
    createSecondaryContext(): AngularCompilationContext;
}
