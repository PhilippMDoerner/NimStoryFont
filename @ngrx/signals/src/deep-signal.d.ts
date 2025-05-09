import { Signal as NgSignal } from '@angular/core';
import { IsKnownRecord } from './ts-helpers';
export interface Signal<T> extends NgSignal<T> {
    name: unknown;
    length: unknown;
}
export type DeepSignal<T> = Signal<T> & (IsKnownRecord<T> extends true ? Readonly<{
    [K in keyof T]: IsKnownRecord<T[K]> extends true ? DeepSignal<T[K]> : Signal<T[K]>;
}> : unknown);
export declare function toDeepSignal<T>(signal: Signal<T>): DeepSignal<T>;
