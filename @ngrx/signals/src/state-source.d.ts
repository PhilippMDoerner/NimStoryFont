import { Injector, Signal, WritableSignal } from '@angular/core';
import { Prettify } from './ts-helpers';
export declare const STATE_SOURCE: unique symbol;
export type WritableStateSource<State extends object> = {
    [STATE_SOURCE]: WritableSignal<State>;
};
export type StateSource<State extends object> = {
    [STATE_SOURCE]: Signal<State>;
};
export type PartialStateUpdater<State extends object> = (state: State) => Partial<State>;
export type StateWatcher<State extends object> = (state: NoInfer<State>) => void;
export declare function isWritableStateSource<State extends object>(stateSource: StateSource<State>): stateSource is WritableStateSource<State>;
export declare function patchState<State extends object>(stateSource: WritableStateSource<State>, ...updaters: Array<Partial<Prettify<State>> | PartialStateUpdater<Prettify<State>>>): void;
export declare function getState<State extends object>(stateSource: StateSource<State>): State;
export declare function watchState<State extends object>(stateSource: StateSource<State>, watcher: StateWatcher<State>, config?: {
    injector?: Injector;
}): {
    destroy(): void;
};
