"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngularCompilationContext = void 0;
const compilation_1 = require("../../angular/compilation");
class AngularCompilationContext {
    #compilation;
    #pendingCompilation = true;
    #resolveCompilationReady;
    #compilationReadyPromise;
    #hasErrors = true;
    constructor(compilation) {
        this.#compilation = compilation;
    }
    get compilation() {
        return this.#compilation;
    }
    get waitUntilReady() {
        if (!this.#pendingCompilation) {
            return Promise.resolve(this.#hasErrors);
        }
        this.#compilationReadyPromise ??= new Promise((resolve) => {
            this.#resolveCompilationReady = resolve;
        });
        return this.#compilationReadyPromise;
    }
    markAsReady(hasErrors) {
        this.#hasErrors = hasErrors;
        this.#resolveCompilationReady?.(hasErrors);
        this.#compilationReadyPromise = undefined;
        this.#pendingCompilation = false;
    }
    markAsInProgress() {
        this.#pendingCompilation = true;
    }
    #disposal;
    dispose() {
        // Reuse any in progress disposal to ensure all callers can await completion
        return (this.#disposal ??= this.#close());
    }
    async #close() {
        this.markAsReady(true);
        try {
            await this.#compilation.close?.();
        }
        catch {
            // Suppress closure errors to avoid unhandled rejections during teardown.
        }
    }
    createSecondaryContext() {
        return new SecondaryCompilationContext(this);
    }
}
exports.AngularCompilationContext = AngularCompilationContext;
class SecondaryCompilationContext extends AngularCompilationContext {
    primaryContext;
    constructor(primaryContext) {
        super(new compilation_1.NoopCompilation());
        this.primaryContext = primaryContext;
    }
    get waitUntilReady() {
        return this.primaryContext.waitUntilReady;
    }
    markAsReady(hasErrors) {
        // No-op: secondary contexts do not control compilation state
    }
    markAsInProgress() {
        // No-op: secondary contexts do not control compilation state
    }
    async dispose() {
        // No-op for secondary context to avoid disposing the primary compilation worker
    }
}
//# sourceMappingURL=compilation-state.js.map