import { Signal } from '@angular/core';

type SignalLike<T> = () => T;
interface WritableSignalLike<T> extends SignalLike<T> {
    set(value: T): void;
    update(updateFn: (value: T) => T): void;
    asReadonly(): SignalLike<T>;
}
/** Converts a getter setter style signal to a WritableSignalLike. */
declare function convertGetterSetterToWritableSignalLike<T>(getter: () => T, setter: (v: T) => void): WritableSignalLike<T>;
declare function computed<T>(computation: () => T): SignalLike<T>;
declare function signal<T>(initialValue: T): WritableSignalLike<T>;
declare function linkedSignal<T>(sourceFn: () => T): WritableSignalLike<T>;

interface HasElement {
    element: HTMLElement;
}
/**
 * Sort directives by their document order.
 */
declare function sortDirectives(a: HasElement, b: HasElement): 1 | -1;

/**
 * A collection that lazily sorts its items based on their DOM position.
 * It uses manual registration and updates its order when items are added/removed
 * or when structural DOM changes are detected via MutationObserver.
 *
 * TODO(ok7sai): replace Mutation Observer with internal API.
 */
declare class SortedCollection<T extends HasElement> {
    private readonly _items;
    private readonly _version;
    private _observer?;
    readonly orderedItems: Signal<T[]>;
    register(item: T): void;
    unregister(item: T): void;
    startObserving(element: HTMLElement): void;
    stopObserving(): void;
}

export { SortedCollection, computed, convertGetterSetterToWritableSignalLike, linkedSignal, signal, sortDirectives };
export type { HasElement, SignalLike, WritableSignalLike };
