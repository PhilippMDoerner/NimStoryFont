import { Signal, Injector, EffectRef, WritableSignal, Type } from '@angular/core';

type NonRecord = Iterable<any> | WeakSet<any> | WeakMap<any, any> | Promise<any> | Date | Error | RegExp | ArrayBuffer | DataView | Function;
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type IsRecord<T> = T extends object ? T extends NonRecord ? false : true : false;
type IsUnknownRecord<T> = keyof T extends never ? true : string extends keyof T ? true : symbol extends keyof T ? true : number extends keyof T ? true : false;
type IsKnownRecord<T> = IsRecord<T> extends true ? IsUnknownRecord<T> extends true ? false : true : false;
type OmitPrivate<T> = {
    [K in keyof T as K extends `_${string}` ? never : K]: T[K];
};

type DeepSignal<T> = Signal<T> & (IsKnownRecord<T> extends true ? Readonly<{
    [K in keyof T]: IsKnownRecord<T[K]> extends true ? DeepSignal<T[K]> : Signal<T[K]>;
}> : unknown);

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
declare function deepComputed<T extends object>(computation: () => T): DeepSignal<T>;

type SignalMethod<Input> = ((input: Input | (() => Input), config?: {
    injector?: Injector;
}) => EffectRef) & EffectRef;
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
declare function signalMethod<Input>(processingFn: (value: Input) => void, config?: {
    injector?: Injector;
}): SignalMethod<Input>;

declare const STATE_SOURCE: unique symbol;
type WritableStateSource<State extends object> = {
    [STATE_SOURCE]: {
        [K in keyof State]: WritableSignal<State[K]>;
    };
};
type StateSource<State extends object> = {
    [STATE_SOURCE]: {
        [K in keyof State]: Signal<State[K]>;
    };
};
type PartialStateUpdater<State extends object> = (state: State) => Partial<State>;
type StateWatcher<State extends object> = (state: NoInfer<State>) => void;
declare function isWritableStateSource<State extends object>(stateSource: StateSource<State>): stateSource is WritableStateSource<State>;
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
declare function patchState<State extends object>(stateSource: WritableStateSource<State>, ...updaters: Array<Partial<NoInfer<State>> | PartialStateUpdater<NoInfer<State>>>): void;
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
declare function getState<State extends object>(stateSource: StateSource<State>): State;
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
declare function watchState<State extends object>(stateSource: StateSource<State>, watcher: StateWatcher<State>, config?: {
    injector?: Injector;
}): {
    destroy(): void;
};

type SignalState<State extends object> = DeepSignal<State> & WritableStateSource<State>;
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
declare function signalState<State extends object>(initialState: State): SignalState<State>;

type StateSignals<State> = IsKnownRecord<Prettify<State>> extends true ? {
    [Key in keyof State]: IsKnownRecord<State[Key]> extends true ? DeepSignal<State[Key]> : Signal<State[Key]>;
} : {};
type MethodsDictionary = Record<string, Function>;
type SignalStoreHooks = {
    onInit?: () => void;
    onDestroy?: () => void;
};
type InnerSignalStore<State extends object = object, Props extends object = object, Methods extends MethodsDictionary = MethodsDictionary> = {
    stateSignals: StateSignals<State>;
    props: Props;
    methods: Methods;
    hooks: SignalStoreHooks;
} & WritableStateSource<State>;
type SignalStoreFeatureResult = {
    state: object;
    props: object;
    methods: MethodsDictionary;
};
type EmptyFeatureResult = {
    state: {};
    props: {};
    methods: {};
};
type SignalStoreFeature<Input extends SignalStoreFeatureResult = SignalStoreFeatureResult, Output extends SignalStoreFeatureResult = SignalStoreFeatureResult> = (store: InnerSignalStore<Input['state'], Input['props'], Input['methods']>) => InnerSignalStore<Output['state'], Output['props'], Output['methods']>;

type ProvidedInConfig = {
    providedIn?: 'root' | 'platform';
};
type SignalStoreMembers<FeatureResult extends SignalStoreFeatureResult> = Prettify<OmitPrivate<StateSignals<FeatureResult['state']> & FeatureResult['props'] & FeatureResult['methods']>>;
declare function signalStore<F1 extends SignalStoreFeatureResult>(f1: SignalStoreFeature<EmptyFeatureResult, F1>): Type<SignalStoreMembers<F1> & StateSource<Prettify<OmitPrivate<F1['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, F11 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>, f11: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, F11 extends SignalStoreFeatureResult, F12 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>, f11: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>, f12: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, F12>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, F11 extends SignalStoreFeatureResult, F12 extends SignalStoreFeatureResult, F13 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>, f11: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>, f12: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, F12>, f13: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12, F13>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, F11 extends SignalStoreFeatureResult, F12 extends SignalStoreFeatureResult, F13 extends SignalStoreFeatureResult, F14 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>, f11: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>, f12: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, F12>, f13: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12, F13>, f14: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13, F14>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, F11 extends SignalStoreFeatureResult, F12 extends SignalStoreFeatureResult, F13 extends SignalStoreFeatureResult, F14 extends SignalStoreFeatureResult, F15 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14 & F15>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>, f11: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>, f12: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, F12>, f13: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12, F13>, f14: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13, F14>, f15: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14, F15>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult>(config: ProvidedInConfig & {
    protectedState?: true;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>): Type<SignalStoreMembers<F1> & StateSource<Prettify<OmitPrivate<F1['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2>(config: ProvidedInConfig & {
    protectedState?: true;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3>(config: ProvidedInConfig & {
    protectedState?: true;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4>(config: ProvidedInConfig & {
    protectedState?: true;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5>(config: ProvidedInConfig & {
    protectedState?: true;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6>(config: ProvidedInConfig & {
    protectedState?: true;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7>(config: ProvidedInConfig & {
    protectedState?: true;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8>(config: ProvidedInConfig & {
    protectedState?: true;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9>(config: ProvidedInConfig & {
    protectedState?: true;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10>(config: ProvidedInConfig & {
    protectedState?: true;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, F11 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11>(config: ProvidedInConfig & {
    protectedState?: true;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>, f11: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, F11 extends SignalStoreFeatureResult, F12 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12>(config: ProvidedInConfig & {
    protectedState?: true;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>, f11: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>, f12: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, F12>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, F11 extends SignalStoreFeatureResult, F12 extends SignalStoreFeatureResult, F13 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13>(config: ProvidedInConfig & {
    protectedState?: true;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>, f11: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>, f12: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, F12>, f13: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12, F13>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, F11 extends SignalStoreFeatureResult, F12 extends SignalStoreFeatureResult, F13 extends SignalStoreFeatureResult, F14 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14>(config: ProvidedInConfig & {
    protectedState?: true;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>, f11: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>, f12: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, F12>, f13: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12, F13>, f14: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13, F14>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, F11 extends SignalStoreFeatureResult, F12 extends SignalStoreFeatureResult, F13 extends SignalStoreFeatureResult, F14 extends SignalStoreFeatureResult, F15 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14 & F15>(config: ProvidedInConfig & {
    protectedState?: true;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>, f11: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>, f12: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, F12>, f13: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12, F13>, f14: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13, F14>, f15: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14, F15>): Type<SignalStoreMembers<R> & StateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult>(config: ProvidedInConfig & {
    protectedState: false;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>): Type<SignalStoreMembers<F1> & WritableStateSource<Prettify<OmitPrivate<F1['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2>(config: ProvidedInConfig & {
    protectedState: false;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>): Type<SignalStoreMembers<R> & WritableStateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3>(config: ProvidedInConfig & {
    protectedState: false;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>): Type<SignalStoreMembers<R> & WritableStateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4>(config: ProvidedInConfig & {
    protectedState: false;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>): Type<SignalStoreMembers<R> & WritableStateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5>(config: ProvidedInConfig & {
    protectedState: false;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>): Type<SignalStoreMembers<R> & WritableStateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6>(config: ProvidedInConfig & {
    protectedState: false;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>): Type<SignalStoreMembers<R> & WritableStateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7>(config: ProvidedInConfig & {
    protectedState: false;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>): Type<SignalStoreMembers<R> & WritableStateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8>(config: ProvidedInConfig & {
    protectedState: false;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>): Type<SignalStoreMembers<R> & WritableStateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9>(config: ProvidedInConfig & {
    protectedState: false;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>): Type<SignalStoreMembers<R> & WritableStateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10>(config: ProvidedInConfig & {
    protectedState: false;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>): Type<SignalStoreMembers<R> & WritableStateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, F11 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11>(config: ProvidedInConfig & {
    protectedState: false;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>, f11: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>): Type<SignalStoreMembers<R> & WritableStateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, F11 extends SignalStoreFeatureResult, F12 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12>(config: ProvidedInConfig & {
    protectedState: false;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>, f11: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>, f12: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, F12>): Type<SignalStoreMembers<R> & WritableStateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, F11 extends SignalStoreFeatureResult, F12 extends SignalStoreFeatureResult, F13 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13>(config: ProvidedInConfig & {
    protectedState: false;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>, f11: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>, f12: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, F12>, f13: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12, F13>): Type<SignalStoreMembers<R> & WritableStateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, F11 extends SignalStoreFeatureResult, F12 extends SignalStoreFeatureResult, F13 extends SignalStoreFeatureResult, F14 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14>(config: ProvidedInConfig & {
    protectedState: false;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>, f11: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>, f12: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, F12>, f13: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12, F13>, f14: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13, F14>): Type<SignalStoreMembers<R> & WritableStateSource<Prettify<OmitPrivate<R['state']>>>>;
declare function signalStore<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult, F11 extends SignalStoreFeatureResult, F12 extends SignalStoreFeatureResult, F13 extends SignalStoreFeatureResult, F14 extends SignalStoreFeatureResult, F15 extends SignalStoreFeatureResult, R extends SignalStoreFeatureResult = F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14 & F15>(config: ProvidedInConfig & {
    protectedState: false;
}, f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>, f11: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>, f12: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, F12>, f13: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12, F13>, f14: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13, F14>, f15: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14, F15>): Type<SignalStoreMembers<R> & WritableStateSource<Prettify<OmitPrivate<R['state']>>>>;

type PrettifyFeatureResult<Result extends SignalStoreFeatureResult> = Prettify<{
    state: Prettify<Result['state']>;
    props: Prettify<Result['props']>;
    methods: Prettify<Result['methods']>;
}>;
declare function signalStoreFeature<F1 extends SignalStoreFeatureResult>(f1: SignalStoreFeature<EmptyFeatureResult, F1>): SignalStoreFeature<EmptyFeatureResult, F1>;
declare function signalStoreFeature<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>): SignalStoreFeature<EmptyFeatureResult, PrettifyFeatureResult<F1 & F2>>;
declare function signalStoreFeature<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>): SignalStoreFeature<EmptyFeatureResult, PrettifyFeatureResult<F1 & F2 & F3>>;
declare function signalStoreFeature<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>): SignalStoreFeature<EmptyFeatureResult, PrettifyFeatureResult<F1 & F2 & F3 & F4>>;
declare function signalStoreFeature<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>): SignalStoreFeature<EmptyFeatureResult, PrettifyFeatureResult<F1 & F2 & F3 & F4 & F5>>;
declare function signalStoreFeature<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>): SignalStoreFeature<EmptyFeatureResult, PrettifyFeatureResult<F1 & F2 & F3 & F4 & F5 & F6>>;
declare function signalStoreFeature<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>): SignalStoreFeature<EmptyFeatureResult, PrettifyFeatureResult<F1 & F2 & F3 & F4 & F5 & F6 & F7>>;
declare function signalStoreFeature<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>): SignalStoreFeature<EmptyFeatureResult, PrettifyFeatureResult<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8>>;
declare function signalStoreFeature<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>): SignalStoreFeature<EmptyFeatureResult, PrettifyFeatureResult<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9>>;
declare function signalStoreFeature<F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult>(f1: SignalStoreFeature<EmptyFeatureResult, F1>, f2: SignalStoreFeature<{} & F1, F2>, f3: SignalStoreFeature<F1 & F2, F3>, f4: SignalStoreFeature<F1 & F2 & F3, F4>, f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>): SignalStoreFeature<EmptyFeatureResult, PrettifyFeatureResult<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10>>;
declare function signalStoreFeature<Input extends Partial<SignalStoreFeatureResult>, F1 extends SignalStoreFeatureResult>(input: Input, f1: SignalStoreFeature<EmptyFeatureResult & NoInfer<Input>, F1>): SignalStoreFeature<Prettify<EmptyFeatureResult & Input>, F1>;
declare function signalStoreFeature<Input extends Partial<SignalStoreFeatureResult>, F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult>(input: Input, f1: SignalStoreFeature<EmptyFeatureResult & NoInfer<Input>, F1>, f2: SignalStoreFeature<NoInfer<Input> & F1, F2>): SignalStoreFeature<Prettify<EmptyFeatureResult & Input>, PrettifyFeatureResult<F1 & F2>>;
declare function signalStoreFeature<Input extends Partial<SignalStoreFeatureResult>, F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult>(input: Input, f1: SignalStoreFeature<EmptyFeatureResult & NoInfer<Input>, F1>, f2: SignalStoreFeature<NoInfer<Input> & F1, F2>, f3: SignalStoreFeature<NoInfer<Input> & F1 & F2, F3>): SignalStoreFeature<Prettify<EmptyFeatureResult & Input>, PrettifyFeatureResult<F1 & F2 & F3>>;
declare function signalStoreFeature<Input extends Partial<SignalStoreFeatureResult>, F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult>(Input: Input, f1: SignalStoreFeature<EmptyFeatureResult & NoInfer<Input>, F1>, f2: SignalStoreFeature<NoInfer<Input> & F1, F2>, f3: SignalStoreFeature<NoInfer<Input> & F1 & F2, F3>, f4: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3, F4>): SignalStoreFeature<Prettify<EmptyFeatureResult & Input>, PrettifyFeatureResult<F1 & F2 & F3 & F4>>;
declare function signalStoreFeature<Input extends Partial<SignalStoreFeatureResult>, F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult>(input: Input, f1: SignalStoreFeature<EmptyFeatureResult & NoInfer<Input>, F1>, f2: SignalStoreFeature<NoInfer<Input> & F1, F2>, f3: SignalStoreFeature<NoInfer<Input> & F1 & F2, F3>, f4: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3, F4>, f5: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4, F5>): SignalStoreFeature<Prettify<EmptyFeatureResult & Input>, PrettifyFeatureResult<F1 & F2 & F3 & F4 & F5>>;
declare function signalStoreFeature<Input extends Partial<SignalStoreFeatureResult>, F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult>(input: Input, f1: SignalStoreFeature<EmptyFeatureResult & NoInfer<Input>, F1>, f2: SignalStoreFeature<NoInfer<Input> & F1, F2>, f3: SignalStoreFeature<NoInfer<Input> & F1 & F2, F3>, f4: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3, F4>, f5: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4 & F5, F6>): SignalStoreFeature<Prettify<EmptyFeatureResult & Input>, PrettifyFeatureResult<F1 & F2 & F3 & F4 & F5 & F6>>;
declare function signalStoreFeature<Input extends Partial<SignalStoreFeatureResult>, F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult>(input: Input, f1: SignalStoreFeature<EmptyFeatureResult & NoInfer<Input>, F1>, f2: SignalStoreFeature<NoInfer<Input> & F1, F2>, f3: SignalStoreFeature<NoInfer<Input> & F1 & F2, F3>, f4: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3, F4>, f5: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4 & F5 & F6, F7>): SignalStoreFeature<Prettify<EmptyFeatureResult & Input>, PrettifyFeatureResult<F1 & F2 & F3 & F4 & F5 & F6 & F7>>;
declare function signalStoreFeature<Input extends Partial<SignalStoreFeatureResult>, F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult>(input: Input, f1: SignalStoreFeature<EmptyFeatureResult & NoInfer<Input>, F1>, f2: SignalStoreFeature<NoInfer<Input> & F1, F2>, f3: SignalStoreFeature<NoInfer<Input> & F1 & F2, F3>, f4: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3, F4>, f5: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>): SignalStoreFeature<Prettify<EmptyFeatureResult & Input>, PrettifyFeatureResult<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8>>;
declare function signalStoreFeature<Input extends Partial<SignalStoreFeatureResult>, F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult>(input: Input, f1: SignalStoreFeature<EmptyFeatureResult & NoInfer<Input>, F1>, f2: SignalStoreFeature<NoInfer<Input> & F1, F2>, f3: SignalStoreFeature<NoInfer<Input> & F1 & F2, F3>, f4: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3, F4>, f5: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>): SignalStoreFeature<Prettify<EmptyFeatureResult & Input>, PrettifyFeatureResult<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9>>;
declare function signalStoreFeature<Input extends Partial<SignalStoreFeatureResult>, F1 extends SignalStoreFeatureResult, F2 extends SignalStoreFeatureResult, F3 extends SignalStoreFeatureResult, F4 extends SignalStoreFeatureResult, F5 extends SignalStoreFeatureResult, F6 extends SignalStoreFeatureResult, F7 extends SignalStoreFeatureResult, F8 extends SignalStoreFeatureResult, F9 extends SignalStoreFeatureResult, F10 extends SignalStoreFeatureResult>(input: Input, f1: SignalStoreFeature<EmptyFeatureResult & NoInfer<Input>, F1>, f2: SignalStoreFeature<NoInfer<Input> & F1, F2>, f3: SignalStoreFeature<NoInfer<Input> & F1 & F2, F3>, f4: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3, F4>, f5: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4, F5>, f6: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4 & F5, F6>, f7: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4 & F5 & F6, F7>, f8: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>, f9: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>, f10: SignalStoreFeature<NoInfer<Input> & F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>): SignalStoreFeature<Prettify<EmptyFeatureResult & Input>, PrettifyFeatureResult<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10>>;
declare function type<T>(): T;

type ComputedResult<ComputedDictionary extends Record<string | symbol, Signal<unknown> | (() => unknown)>> = {
    [P in keyof ComputedDictionary]: ComputedDictionary[P] extends Signal<unknown> ? ComputedDictionary[P] : ComputedDictionary[P] extends () => infer V ? Signal<V> : never;
};
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
declare function withComputed<Input extends SignalStoreFeatureResult, ComputedDictionary extends Record<string | symbol, Signal<unknown> | (() => unknown)>>(computedFactory: (store: Prettify<StateSignals<Input['state']> & Input['props'] & Input['methods']>) => ComputedDictionary): SignalStoreFeature<Input, {
    state: {};
    props: ComputedResult<ComputedDictionary>;
    methods: {};
}>;

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
declare function withFeature<Input extends SignalStoreFeatureResult, Output extends SignalStoreFeatureResult>(featureFactory: (store: Prettify<StateSignals<Input['state']> & Input['props'] & Input['methods'] & WritableStateSource<Input['state']>>) => SignalStoreFeature<Input, Output>): SignalStoreFeature<Input, Output>;

type HookFn<Input extends SignalStoreFeatureResult> = (store: Prettify<StateSignals<Input['state']> & Input['props'] & Input['methods'] & WritableStateSource<Input['state']>>) => void;
type HooksFactory<Input extends SignalStoreFeatureResult> = (store: Prettify<StateSignals<Input['state']> & Input['props'] & Input['methods'] & WritableStateSource<Input['state']>>) => {
    onInit?: () => void;
    onDestroy?: () => void;
};
declare function withHooks<Input extends SignalStoreFeatureResult>(hooks: {
    onInit?: HookFn<Input>;
    onDestroy?: HookFn<Input>;
}): SignalStoreFeature<Input, EmptyFeatureResult>;
declare function withHooks<Input extends SignalStoreFeatureResult>(hooks: HooksFactory<Input>): SignalStoreFeature<Input, EmptyFeatureResult>;

type LinkedStateResult<LinkedStateInput extends Record<string | symbol, WritableSignal<unknown> | (() => unknown)>> = {
    [K in keyof LinkedStateInput]: LinkedStateInput[K] extends WritableSignal<infer V> ? V : LinkedStateInput[K] extends () => infer V ? V : never;
};
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
declare function withLinkedState<State extends Record<string | symbol, WritableSignal<unknown> | (() => unknown)>, Input extends SignalStoreFeatureResult>(linkedStateFactory: (store: Prettify<StateSignals<Input['state']> & Input['props']>) => State): SignalStoreFeature<Input, {
    state: LinkedStateResult<State>;
    props: {};
    methods: {};
}>;

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
declare function withMethods<Input extends SignalStoreFeatureResult, Methods extends MethodsDictionary>(methodsFactory: (store: Prettify<StateSignals<Input['state']> & Input['props'] & Input['methods'] & WritableStateSource<Input['state']>>) => Methods): SignalStoreFeature<Input, {
    state: {};
    props: {};
    methods: Methods;
}>;

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
declare function withProps<Input extends SignalStoreFeatureResult, Props extends object>(propsFactory: (store: Prettify<StateSignals<Input['state']> & Input['props'] & Input['methods'] & WritableStateSource<Input['state']>>) => Props): SignalStoreFeature<Input, {
    state: {};
    props: Props;
    methods: {};
}>;

declare function withState<State extends object>(stateFactory: () => State): SignalStoreFeature<EmptyFeatureResult, {
    state: State;
    props: {};
    methods: {};
}>;
declare function withState<State extends object>(state: State): SignalStoreFeature<EmptyFeatureResult, {
    state: State;
    props: {};
    methods: {};
}>;

export { deepComputed, getState, isWritableStateSource, patchState, signalMethod, signalState, signalStore, signalStoreFeature, type, watchState, withComputed, withFeature, withHooks, withLinkedState, withMethods, withProps, withState };
export type { DeepSignal, EmptyFeatureResult, PartialStateUpdater, Prettify, SignalMethod, SignalState, SignalStoreFeature, SignalStoreFeatureResult, StateSignals, StateSource, StateWatcher, WritableStateSource };
