import { ComponentFixture } from '@angular/core/testing';
import { DebugElement, NgModule } from '@angular/core';
import { FormlyFieldConfig, ConfigOption } from '@ngx-formly/core';
interface IComponentOptions<T> extends NgModule {
    template?: string;
    inputs?: T;
    config?: ConfigOption;
    detectChanges?: boolean;
}
interface IFormlyDebugElement<E> extends DebugElement {
    readonly nativeElement: E;
}
export declare function createComponent<T>({ template, inputs, config, detectChanges, imports, declarations, providers, }: IComponentOptions<T>): T & {
    fixture: ComponentFixture<T>;
    detectChanges: (checkNoChanges?: boolean) => void;
    setInputs: (inputs: Partial<T>) => void;
    query: <E extends Element = Element>(selector: string) => IFormlyDebugElement<E>;
    queryAll: <E_1 extends Element = Element>(selector: string) => IFormlyDebugElement<E_1>[];
};
export declare function createFieldComponent(field: FormlyFieldConfig, config?: IComponentOptions<{
    field: FormlyFieldConfig;
}>): {
    field: FormlyFieldConfig;
} & {
    fixture: ComponentFixture<{
        field: FormlyFieldConfig;
    }>;
    detectChanges: (checkNoChanges?: boolean) => void;
    setInputs: (inputs: Partial<{
        field: FormlyFieldConfig;
    }>) => void;
    query: <E extends Element = Element>(selector: string) => IFormlyDebugElement<E>;
    queryAll: <E_1 extends Element = Element>(selector: string) => IFormlyDebugElement<E_1>[];
};
export {};
