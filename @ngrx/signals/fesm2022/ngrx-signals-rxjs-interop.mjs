import { assertInInjectionContext, inject, Injector, DestroyRef, isSignal, effect, untracked } from '@angular/core';
import { Subject, noop, isObservable } from 'rxjs';

function rxMethod(generator, config) {
    if (!config?.injector) {
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
        const instanceInjector = config?.injector ?? getCallerInjector() ?? sourceInjector;
        if (isSignal(input)) {
            const watcher = effect(() => {
                const value = input();
                untracked(() => source$.next(value));
            }, { injector: instanceInjector });
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
    return !isSignal(value) && !isObservable(value);
}
function getCallerInjector() {
    try {
        return inject(Injector);
    }
    catch {
        return null;
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { rxMethod };
//# sourceMappingURL=ngrx-signals-rxjs-interop.mjs.map
