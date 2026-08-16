import { assertInInjectionContext, inject, Injector, DestroyRef, effect, untracked } from '@angular/core';
import { Subject, noop, isObservable } from 'rxjs';

/**
 * @description
 *
 * Creates a reactive method for managing side effects by utilizing RxJS APIs.
 * The method accepts an observable, a signal, a computation function, or
 * a static value.
 *
 * @usageNotes
 *
 * ```ts
 * import { Component, inject, signal } from '@angular/core';
 * import { switchMap } from 'rxjs';
 * import { rxMethod } from '@ngrx/signals/rxjs-interop';
 * import { tapResponse } from '@ngrx/operators';
 *
 * \@Component(...)
 * export class TodoList {
 *   readonly #todosService = inject(TodosService);
 *   readonly userId = signal(1);
 *   readonly todos = signal<Todo[]>([]);
 *
 *   readonly loadTodos = rxMethod<number>(
 *     switchMap((id) =>
 *       this.#todosService.getByUserId(id).pipe(
 *         tapResponse({
 *           next: (todos) => this.todos.set(todos),
 *           error: console.error,
 *         })
 *       )
 *     )
 *   );
 *
 *   constructor() {
 *     // 👇 Load todos on `userId` changes.
 *     this.loadTodos(this.userId);
 *   }
 * }
 * ```
 */
function rxMethod(generator, config) {
    if (typeof ngDevMode !== 'undefined' && ngDevMode && !config?.injector) {
        assertInInjectionContext(rxMethod);
    }
    const sourceInjector = config?.injector ?? inject(Injector);
    const source$ = new Subject();
    const sourceSub = generator(source$).subscribe();
    sourceInjector.get(DestroyRef).onDestroy(() => sourceSub.unsubscribe());
    const rxMethodFn = (input, config) => {
        if (isStatic(input)) {
            source$.next(input);
            return { destroy: noop };
        }
        const callerInjector = getCallerInjector();
        if (typeof ngDevMode !== 'undefined' &&
            ngDevMode &&
            config?.injector === undefined &&
            callerInjector === undefined) {
            console.warn('@ngrx/signals/rxjs-interop: Calling a reactive method outside of', 'an injection context with a signal or observable is deprecated.', 'In a future version, this will throw an error.', 'Either call it within an injection context', '(e.g. in a constructor or field initializer) or pass an injector', 'explicitly via the config parameter.\n\nFor more information, see:', 'https://ngrx.io/guide/signals/rxjs-integration#reactive-methods-and-injector-hierarchies');
        }
        const instanceInjector = config?.injector ?? callerInjector ?? sourceInjector;
        if (typeof input === 'function') {
            const watcher = effect(() => {
                const value = input();
                untracked(() => source$.next(value));
            }, { ...(ngDevMode ? { debugName: "watcher" } : {}), injector: instanceInjector });
            sourceSub.add({ unsubscribe: () => watcher.destroy() });
            return watcher;
        }
        const instanceSub = input.subscribe((value) => source$.next(value));
        sourceSub.add(instanceSub);
        if (instanceInjector !== sourceInjector) {
            instanceInjector
                .get(DestroyRef)
                .onDestroy(() => instanceSub.unsubscribe());
        }
        return { destroy: () => instanceSub.unsubscribe() };
    };
    rxMethodFn.destroy = sourceSub.unsubscribe.bind(sourceSub);
    return rxMethodFn;
}
function isStatic(value) {
    return typeof value !== 'function' && !isObservable(value);
}
function getCallerInjector() {
    try {
        return inject(Injector);
    }
    catch {
        return undefined;
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { rxMethod };
//# sourceMappingURL=ngrx-signals-rxjs-interop.mjs.map
