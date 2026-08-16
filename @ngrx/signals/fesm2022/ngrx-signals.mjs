import * as i0 from '@angular/core';
import { untracked, isSignal, computed, assertInInjectionContext, inject, Injector, effect, DestroyRef, signal, Injectable, linkedSignal } from '@angular/core';

const DEEP_SIGNAL = Symbol(typeof ngDevMode !== 'undefined' && ngDevMode ? 'DEEP_SIGNAL' : '');
function toDeepSignal(signal) {
    return new Proxy(signal, {
        has(target, prop) {
            return !!this.get(target, prop, undefined);
        },
        get(target, prop) {
            const value = untracked(target);
            if (!isRecord(value) || !(prop in value)) {
                if (isSignal(target[prop]) && target[prop][DEEP_SIGNAL]) {
                    delete target[prop];
                }
                return target[prop];
            }
            if (!isSignal(target[prop])) {
                Object.defineProperty(target, prop, {
                    value: computed(() => target()[prop]),
                    configurable: true,
                });
                target[prop][DEEP_SIGNAL] = true;
            }
            return toDeepSignal(target[prop]);
        },
    });
}
const nonRecords = [
    WeakSet,
    WeakMap,
    Promise,
    Date,
    Error,
    RegExp,
    ArrayBuffer,
    DataView,
    Function,
];
function isRecord(value) {
    if (value === null || typeof value !== 'object' || isIterable(value)) {
        return false;
    }
    let proto = Object.getPrototypeOf(value);
    if (proto === Object.prototype) {
        return true;
    }
    while (proto && proto !== Object.prototype) {
        if (nonRecords.includes(proto.constructor)) {
            return false;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return proto === Object.prototype;
}
function isIterable(value) {
    return typeof value?.[Symbol.iterator] === 'function';
}

/**
 * @description
 *
 * Creates a computed signal with deeply nested signals for each property when
 * the result is an object literal.
 *
 * @usageNotes
 *
 * ```ts
 * import { signal } from '@angular/core';
 * import { deepComputed } from '@ngrx/signals';
 *
 * const limit = signal(10);
 * const offset = signal(0);
 *
 * const pagination = deepComputed(() => ({
 *   currentPage: Math.floor(offset() / limit()) + 1,
 *   pageSize: limit(),
 * }));
 *
 * console.log(pagination()); // { currentPage: 1, pageSize: 10 }
 * console.log(pagination.currentPage()); // 1
 * console.log(pagination.pageSize()); // 10
 * ```
 */
function deepComputed(computation) {
    return toDeepSignal(computed(computation));
}

/**
 * @description
 *
 * Creates a method for managing side effects with signals.
 * The method accepts a signal, a computation function, or a static value.
 *
 * @usageNotes
 *
 * ```ts
 * import { Component, signal } from '@angular/core';
 * import { signalMethod } from '@ngrx/signals';
 *
 * \@Component(...)
 * export class Counter {
 *   readonly count = signal(1);
 *   readonly logDoubledNumber = signalMethod<number>(
 *     (num) => console.log(num * 2)
 *   );
 *
 *   constructor() {
 *     this.logDoubledNumber(10); // logs: 20
 *
 *     this.logDoubledNumber(this.count); // logs: 2
 *     setTimeout(() => this.count.set(2), 1_000); // logs: 4 (after 1s)
 *   }
 * }
 * ```
 */
function signalMethod(processingFn, config) {
    if (typeof ngDevMode !== 'undefined' && ngDevMode && !config?.injector) {
        assertInInjectionContext(signalMethod);
    }
    const watchers = [];
    const sourceInjector = config?.injector ?? inject(Injector);
    const signalMethodFn = (input, config) => {
        if (isReactiveComputation(input)) {
            const callerInjector = getCallerInjector();
            if (typeof ngDevMode !== 'undefined' &&
                ngDevMode &&
                config?.injector === undefined &&
                callerInjector === undefined) {
                console.warn('@ngrx/signals: Calling signalMethod outside of an injection', 'context with a signal is deprecated. In a future version,', 'this will throw an error. Either call it within an injection', 'context (e.g. in a constructor or field initializer) or pass', 'an injector explicitly via the config parameter.', '\n\nFor more information, see:', 'https://ngrx.io/guide/signals/signal-method#automatic-cleanup');
            }
            const instanceInjector = config?.injector ?? callerInjector ?? sourceInjector;
            const watcher = effect(() => {
                const value = input();
                untracked(() => processingFn(value));
            }, { ...(ngDevMode ? { debugName: "watcher" } : {}), injector: instanceInjector });
            watchers.push(watcher);
            instanceInjector.get(DestroyRef).onDestroy(() => {
                const ix = watchers.indexOf(watcher);
                if (ix !== -1) {
                    watchers.splice(ix, 1);
                }
            });
            return watcher;
        }
        else {
            processingFn(input);
            return { destroy: () => void true };
        }
    };
    signalMethodFn.destroy = () => watchers.forEach((watcher) => watcher.destroy());
    return signalMethodFn;
}
function getCallerInjector() {
    try {
        return inject(Injector);
    }
    catch {
        return undefined;
    }
}
function isReactiveComputation(value) {
    return typeof value === 'function';
}

const STATE_WATCHERS = new WeakMap();
const STATE_SOURCE = Symbol(typeof ngDevMode !== 'undefined' && ngDevMode ? 'STATE_SOURCE' : '');
function isWritableSignal(value) {
    return (isSignal(value) &&
        'set' in value &&
        'update' in value &&
        typeof value.set === 'function' &&
        typeof value.update === 'function');
}
function isWritableStateSource(stateSource) {
    const signals = stateSource[STATE_SOURCE];
    return Reflect.ownKeys(stateSource[STATE_SOURCE]).every((key) => {
        return isWritableSignal(signals[key]);
    });
}
/**
 * @description
 *
 * Updates the state of a SignalStore or SignalState.
 * Accepts a sequence of partial state objects and partial state updaters.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
 *
 * export const CounterStore = signalStore(
 *   withState({ count1: 0, count2: 0 }),
 *   withMethods((store) => ({
 *     incrementFirst(): void {
 *       patchState(store, (state) => ({ count1: state.count1 + 1 }));
 *     },
 *     resetSecond(): void {
 *       patchState(store, { count2: 0 });
 *     },
 *   }))
 * );
 * ```
 */
function patchState(stateSource, ...updaters) {
    const currentState = untracked(() => getState(stateSource));
    const newState = updaters.reduce((nextState, updater) => ({
        ...nextState,
        ...(typeof updater === 'function' ? updater(nextState) : updater),
    }), currentState);
    const signals = stateSource[STATE_SOURCE];
    const stateKeys = Reflect.ownKeys(stateSource[STATE_SOURCE]);
    for (const key of Reflect.ownKeys(newState)) {
        if (stateKeys.includes(key)) {
            const signalKey = key;
            if (currentState[signalKey] !== newState[signalKey]) {
                signals[signalKey].set(newState[signalKey]);
            }
        }
        else if (typeof ngDevMode !== 'undefined' && ngDevMode) {
            console.warn(`@ngrx/signals: patchState was called with an unknown state slice '${String(key)}'.`, 'Ensure that all state properties are explicitly defined in the initial state.', 'Updates to properties not present in the initial state will be ignored.');
        }
    }
    notifyWatchers(stateSource);
}
/**
 * @description
 *
 * Returns a snapshot of the current state from a SignalStore or SignalState.
 * When used within a reactive context, state changes are automatically tracked.
 *
 * @usageNotes
 *
 * ```ts
 * import { Component, effect, inject } from '@angular/core';
 * import { getState, signalStore, withState } from '@ngrx/signals';
 *
 * export const CounterStore = signalStore(
 *   withState({ count1: 0, count2: 0 })
 * );
 *
 * \@Component(...)
 * export class Counter {
 *   readonly store = inject(CounterStore);
 *
 *   constructor() {
 *     effect(() => {
 *       const state = getState(this.store);
 *       // 👇 Logs on state changes.
 *       console.log(state);
 *     });
 *   }
 * }
 * ```
 */
function getState(stateSource) {
    const signals = stateSource[STATE_SOURCE];
    return Reflect.ownKeys(stateSource[STATE_SOURCE]).reduce((state, key) => {
        const value = signals[key]();
        return {
            ...state,
            [key]: value,
        };
    }, {});
}
/**
 * @description
 *
 * Synchronously tracks state changes of a SignalStore or SignalState.
 *
 * @usageNotes
 *
 * ```ts
 * import { Component } from '@angular/core';
 * import { signalState, watchState } from '@ngrx/signals';
 *
 * \@Component(...)
 * export class Counter {
 *   readonly state = signalState({ count1: 0, count2: 0 });
 *
 *   constructor() {
 *     // 👇 Synchronously logs every state change without debouncing.
 *     watchState(this.state, console.log);
 *   }
 * }
 * ```
 */
function watchState(stateSource, watcher, config) {
    if (typeof ngDevMode !== 'undefined' && ngDevMode && !config?.injector) {
        assertInInjectionContext(watchState);
    }
    const injector = config?.injector ?? inject(Injector);
    const destroyRef = injector.get(DestroyRef);
    addWatcher(stateSource, watcher);
    watcher(getState(stateSource));
    const destroy = () => removeWatcher(stateSource, watcher);
    destroyRef.onDestroy(destroy);
    return { destroy };
}
function getWatchers(stateSource) {
    return STATE_WATCHERS.get(stateSource[STATE_SOURCE]) || [];
}
function notifyWatchers(stateSource) {
    const watchers = getWatchers(stateSource);
    for (const watcher of watchers) {
        const state = untracked(() => getState(stateSource));
        watcher(state);
    }
}
function addWatcher(stateSource, watcher) {
    const watchers = getWatchers(stateSource);
    STATE_WATCHERS.set(stateSource[STATE_SOURCE], [...watchers, watcher]);
}
function removeWatcher(stateSource, watcher) {
    const watchers = getWatchers(stateSource);
    STATE_WATCHERS.set(stateSource[STATE_SOURCE], watchers.filter((w) => w !== watcher));
}

/**
 * @description
 *
 * Creates a state container with deeply nested signals for each property that
 * is an object literal.
 *
 * @usageNotes
 *
 * ```ts
 * import { Component } from '@angular/core';
 * import { signalState, patchState } from '@ngrx/signals';
 *
 * \@Component(...)
 * export class Counter {
 *   readonly state = signalState({ count: 0 });
 *
 *   logCount(): void {
 *     console.log(this.state.count());
 *   }
 *
 *   increment(): void {
 *     patchState(this.state, ({ count }) => ({ count: count + 1 }));
 *   }
 * }
 * ```
 */
function signalState(initialState) {
    const stateKeys = Reflect.ownKeys(initialState);
    const stateSource = stateKeys.reduce((signalsDict, key) => ({
        ...signalsDict,
        [key]: signal(initialState[key]),
    }), {});
    const signalState = computed(() => stateKeys.reduce((state, key) => ({ ...state, [key]: stateSource[key]() }), {}), { ...(ngDevMode ? { debugName: "signalState" } : {}) });
    Object.defineProperty(signalState, STATE_SOURCE, {
        value: stateSource,
    });
    for (const key of stateKeys) {
        Object.defineProperty(signalState, key, {
            value: toDeepSignal(stateSource[key]),
        });
    }
    return signalState;
}

/**
 * @description
 *
 * Creates a store by composing features.
 * Returns an injectable service that can be provided locally or globally.
 *
 * @usageNotes
 *
 * ```ts
 * import { Component, inject } from '@angular/core';
 * import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
 *
 * export const CounterStore = signalStore(
 *   withState({ count: 0 }),
 *   withMethods((store) => ({
 *     increment(): void {
 *       patchState(store, ({ count }) => ({ count: count + 1 }));
 *     },
 *   }))
 * );
 *
 * \@Component({
 *   // ...
 *   providers: [CounterStore],
 * })
 * export class Counter {
 *   readonly store = inject(CounterStore);
 *
 *   logCount(): void {
 *     console.log(this.store.count());
 *   }
 *
 *   increment(): void {
 *     this.store.increment();
 *   }
 * }
 * ```
 */
function signalStore(...args) {
    const signalStoreArgs = [...args];
    const config = typeof signalStoreArgs[0] === 'function'
        ? {}
        : signalStoreArgs.shift();
    const features = signalStoreArgs;
    class SignalStore {
        constructor() {
            const innerStore = features.reduce((store, feature) => feature(store), getInitialInnerStore());
            const { stateSignals, props, methods, hooks } = innerStore;
            const storeMembers = {
                ...stateSignals,
                ...props,
                ...methods,
            };
            this[STATE_SOURCE] = innerStore[STATE_SOURCE];
            for (const key of Reflect.ownKeys(storeMembers)) {
                this[key] = storeMembers[key];
            }
            const { onInit, onDestroy } = hooks;
            if (onInit) {
                onInit();
            }
            if (onDestroy) {
                inject(DestroyRef).onDestroy(onDestroy);
            }
        }
        /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.1", ngImport: i0, type: SignalStore, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
        /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.0.1", ngImport: i0, type: SignalStore, providedIn: config.providedIn || null });
    }
    i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.0.1", ngImport: i0, type: SignalStore, decorators: [{
                type: Injectable,
                args: [{ providedIn: config.providedIn || null }]
            }], ctorParameters: () => [] });
    return SignalStore;
}
function getInitialInnerStore() {
    return {
        [STATE_SOURCE]: {},
        stateSignals: {},
        props: {},
        methods: {},
        hooks: {},
    };
}

/**
 * @description
 *
 * Combines multiple store features into a single feature.
 *
 * @usageNotes
 *
 * ```ts
 * import {
 *   patchState,
 *   signalStore,
 *   signalStoreFeature,
 *   withMethods,
 *   withState,
 * } from '@ngrx/signals';
 *
 * export function withCounter() {
 *   return signalStoreFeature(
 *     withState({ count: 0 }),
 *     withMethods((store) => ({
 *       increment(): void {
 *         patchState(store, ({ count }) => ({ count: count + 1 }));
 *       },
 *     }))
 *   );
 * }
 *
 * export const CounterStore = signalStore(withCounter());
 * ```
 */
function signalStoreFeature(...args) {
    const features = (typeof args[0] === 'function' ? args : args.slice(1));
    return (inputStore) => features.reduce((store, feature) => feature(store), inputStore);
}
function type() {
    return undefined;
}

function assertUniqueStoreMembers(store, newMemberKeys) {
    const storeMembers = {
        ...store.stateSignals,
        ...store.props,
        ...store.methods,
    };
    const overriddenKeys = Reflect.ownKeys(storeMembers).filter((memberKey) => newMemberKeys.includes(memberKey));
    if (overriddenKeys.length > 0) {
        console.warn('@ngrx/signals: SignalStore members cannot be overridden.', 'Trying to override:', overriddenKeys.map((key) => String(key)).join(', '));
    }
}

/**
 * @description
 *
 * Adds custom properties to a SignalStore.
 *
 * @usageNotes
 *
 * ```ts
 * import { toObservable } from '@angular/core/rxjs-interop';
 * import { signalStore, withProps, withState } from '@ngrx/signals';
 *
 * export const TodosStore = signalStore(
 *   withState({ todos: [] as Todo[], isLoading: false }),
 *   withProps(({ isLoading }) => ({
 *     isLoading$: toObservable(isLoading),
 *   }))
 * );
 * ```
 */
function withProps(propsFactory) {
    return (store) => {
        const props = propsFactory({
            [STATE_SOURCE]: store[STATE_SOURCE],
            ...store.stateSignals,
            ...store.props,
            ...store.methods,
        });
        if (typeof ngDevMode !== 'undefined' && ngDevMode) {
            assertUniqueStoreMembers(store, Reflect.ownKeys(props));
        }
        return {
            ...store,
            props: { ...store.props, ...props },
        };
    };
}

/**
 * @description
 *
 * Adds computed signals to a SignalStore.
 * Accepts a factory function that returns a dictionary of computed signals or
 * computation functions.
 *
 * @usageNotes
 *
 * ```ts
 * import { signalStore, withState, withComputed } from '@ngrx/signals';
 *
 * export const CounterStore = signalStore(
 *   withState({ count: 0 }),
 *   withComputed(({ count }) => ({
 *     doubleCount: () => count() * 2,
 *   }))
 * );
 * ```
 */
function withComputed(computedFactory) {
    return withProps((store) => {
        const computedResult = computedFactory(store);
        const computedResultKeys = Reflect.ownKeys(computedResult);
        return computedResultKeys.reduce((prev, key) => {
            const signalOrComputation = computedResult[key];
            return {
                ...prev,
                [key]: isSignal(signalOrComputation)
                    ? signalOrComputation
                    : computed(signalOrComputation),
            };
        }, {});
    });
}

/**
 * @description
 *
 * Allows passing state signals, properties, and methods from a SignalStore
 * instance to a custom feature.
 *
 * @usageNotes
 *
 * ```ts
 * import { signalStore, withFeature, withMethods } from '@ngrx/signals';
 *
 * export const UserStore = signalStore(
 *   withMethods((store) => ({
 *     loadById(id: number): Promise<User> {
 *       return Promise.resolve({ id, name: 'John' });
 *     },
 *   })),
 *   withFeature(
 *     // 👇 Has full access to store members.
 *     (store) => withEntityLoader((id) => store.loadById(id))
 *   )
 * );
 * ```
 */
function withFeature(featureFactory) {
    return (store) => {
        const storeForFactory = {
            [STATE_SOURCE]: store[STATE_SOURCE],
            ...store.stateSignals,
            ...store.props,
            ...store.methods,
        };
        return featureFactory(storeForFactory)(store);
    };
}

/**
 * @description
 *
 * Adds lifecycle hooks to a SignalStore.
 * Supports an onInit hook that executes when the store is initialized.
 * Supports an onDestroy hook for when the store is destroyed.
 *
 * @usageNotes
 *
 * ```ts
 * import { signalStore, withHooks, withState } from '@ngrx/signals';
 *
 * export const UserStore = signalStore(
 *   withState({ firstName: 'Jimi', lastName: 'Hendrix' }),
 *   withHooks({
 *     onInit({ firstName }) {
 *       console.log('first name on init', firstName());
 *     },
 *     onDestroy({ lastName }) {
 *       console.log('last name on destroy', lastName());
 *     },
 *   })
 * );
 * ```
 */
function withHooks(hooksOrFactory) {
    return (store) => {
        const storeMembers = {
            [STATE_SOURCE]: store[STATE_SOURCE],
            ...store.stateSignals,
            ...store.props,
            ...store.methods,
        };
        const hooks = typeof hooksOrFactory === 'function'
            ? hooksOrFactory(storeMembers)
            : hooksOrFactory;
        const mergeHooks = (currentHook, hook) => {
            return hook
                ? () => {
                    if (currentHook) {
                        currentHook();
                    }
                    hook(storeMembers);
                }
                : currentHook;
        };
        return {
            ...store,
            hooks: {
                onInit: mergeHooks(store.hooks.onInit, hooks.onInit),
                onDestroy: mergeHooks(store.hooks.onDestroy, hooks.onDestroy),
            },
        };
    };
}

/**
 * @description
 *
 * Adds linked state slices to a SignalStore.
 * Accepts a factory function that returns a dictionary of linked signals or
 * computation functions.
 *
 * @usageNotes
 *
 * ### Using a computation function
 *
 * ```ts
 * import { signalStore, withLinkedState, withState } from '@ngrx/signals';
 *
 * export const OptionsStore = signalStore(
 *   withState({ options: [1, 2, 3] }),
 *   withLinkedState(({ options }) => ({
 *     selectedOption: () => options()[0],
 *   }))
 * );
 * ```
 *
 * ### Using linkedSignal for advanced use cases
 *
 * ```ts
 * import { linkedSignal } from '@angular/core';
 * import { signalStore, withLinkedState, withState } from '@ngrx/signals';
 *
 * type Option = { id: number; label: string };
 *
 * export const OptionsStore = signalStore(
 *   withState({ options: [] as Option[] }),
 *   withLinkedState(({ options }) => ({
 *     selectedOption: linkedSignal<Option[], Option>({
 *       source: options,
 *       computation: (newOptions, previous) => {
 *         const option = newOptions.find((o) => o.id === previous?.value.id);
 *         return option ?? newOptions[0];
 *       },
 *     }),
 *   }))
 * )
 * ```
 */
function withLinkedState(linkedStateFactory) {
    return (store) => {
        const linkedState = linkedStateFactory({
            ...store.stateSignals,
            ...store.props,
        });
        const stateKeys = Reflect.ownKeys(linkedState);
        if (typeof ngDevMode !== 'undefined' && ngDevMode) {
            assertUniqueStoreMembers(store, stateKeys);
        }
        const stateSource = store[STATE_SOURCE];
        const stateSignals = {};
        for (const key of stateKeys) {
            const signalOrComputationFn = linkedState[key];
            stateSource[key] = isWritableSignal(signalOrComputationFn)
                ? signalOrComputationFn
                : linkedSignal(signalOrComputationFn);
            stateSignals[key] = toDeepSignal(stateSource[key]);
        }
        return {
            ...store,
            stateSignals: { ...store.stateSignals, ...stateSignals },
        };
    };
}

/**
 * @description
 *
 * Adds methods to a SignalStore.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
 *
 * export const CounterStore = signalStore(
 *   withState({ count: 0 }),
 *   withMethods((store) => ({
 *     increment(): void {
 *       patchState(store, ({ count }) => ({ count: count + 1 }));
 *     },
 *     decrement(): void {
 *       patchState(store, ({ count }) => ({ count: count - 1 }));
 *     },
 *   }))
 * );
 * ```
 */
function withMethods(methodsFactory) {
    return (store) => {
        const methods = methodsFactory({
            [STATE_SOURCE]: store[STATE_SOURCE],
            ...store.stateSignals,
            ...store.props,
            ...store.methods,
        });
        if (typeof ngDevMode !== 'undefined' && ngDevMode) {
            assertUniqueStoreMembers(store, Reflect.ownKeys(methods));
        }
        return {
            ...store,
            methods: { ...store.methods, ...methods },
        };
    };
}

/**
 * @description
 *
 * Adds state slices to a SignalStore.
 * Accepts an object or a factory function that returns the initial state.
 *
 * @usageNotes
 *
 * ```ts
 * import { signalStore, withState } from '@ngrx/signals';
 *
 * export const CounterStore = signalStore(
 *   withState({ count: 0 })
 * );
 * ```
 */
function withState(stateOrFactory) {
    return (store) => {
        const state = (typeof stateOrFactory === 'function' ? stateOrFactory() : stateOrFactory);
        const stateKeys = Reflect.ownKeys(state);
        if (typeof ngDevMode !== 'undefined' && ngDevMode) {
            assertUniqueStoreMembers(store, stateKeys);
        }
        const stateSource = store[STATE_SOURCE];
        const stateSignals = {};
        for (const key of stateKeys) {
            stateSource[key] = signal(state[key]);
            stateSignals[key] = toDeepSignal(stateSource[key]);
        }
        return {
            ...store,
            stateSignals: { ...store.stateSignals, ...stateSignals },
        };
    };
}

/**
 * Generated bundle index. Do not edit.
 */

export { deepComputed, getState, isWritableStateSource, patchState, signalMethod, signalState, signalStore, signalStoreFeature, type, watchState, withComputed, withFeature, withHooks, withLinkedState, withMethods, withProps, withState };
//# sourceMappingURL=ngrx-signals.mjs.map
