import { FormlyFieldConfig } from './models';
import { FormlyFieldConfigCache } from './models';
import { NgZone } from '@angular/core';
export declare function disableTreeValidityCall(form: any, callback: Function): void;
export declare function getFieldId(formId: string, field: FormlyFieldConfig, index: string | number): string;
export declare function hasKey(field: FormlyFieldConfig): boolean;
export declare function getKeyPath(field: FormlyFieldConfigCache): string[];
export declare const FORMLY_VALIDATORS: string[];
export declare function assignFieldValue(field: FormlyFieldConfigCache, value: any): void;
export declare function assignModelValue(model: any, paths: string[], value: any): void;
export declare function getFieldValue(field: FormlyFieldConfig): any;
export declare function reverseDeepMerge(dest: any, ...args: any[]): any;
export declare function isNil(value: any): boolean;
export declare function isUndefined(value: any): boolean;
export declare function isBlankString(value: any): boolean;
export declare function isFunction(value: any): boolean;
export declare function objAndSameType(obj1: any, obj2: any): boolean;
export declare function isObject(x: any): boolean;
export declare function isPromise(obj: any): obj is Promise<any>;
export declare function clone(value: any): any;
export declare function defineHiddenProp(field: any, prop: string, defaultValue: any): void;
declare type IObserveFn<T> = (change: {
    currentValue: T;
    previousValue?: T;
    firstChange: boolean;
}) => void;
export interface IObserver<T> {
    setValue: (value: T, emitEvent?: boolean) => void;
    unsubscribe: Function;
}
interface IObserveTarget<T> {
    [prop: string]: any;
    _observers?: {
        [prop: string]: {
            value: T;
            onChange: IObserveFn<T>[];
        };
    };
}
export declare function observeDeep<T = any>(source: IObserveTarget<T>, paths: string[], setFn: () => void): () => void;
export declare function observe<T = any>(o: IObserveTarget<T>, paths: string[], setFn?: IObserveFn<T>): IObserver<T>;
export declare function getField(f: FormlyFieldConfig, key: FormlyFieldConfig['key']): FormlyFieldConfig;
export declare function markFieldForCheck(field: FormlyFieldConfigCache): void;
export declare function isNoopNgZone(ngZone: NgZone): boolean;
export declare function isHiddenField(field: FormlyFieldConfig): boolean;
export declare function isSignalRequired(): boolean;
export {};
