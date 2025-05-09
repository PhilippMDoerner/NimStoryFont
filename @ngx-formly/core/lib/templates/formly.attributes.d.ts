import { ElementRef, OnChanges, SimpleChanges, Renderer2, DoCheck, OnDestroy } from '@angular/core';
import { FormlyFieldConfig } from '../models';
import * as i0 from "@angular/core";
/**
 * Allow to link the `field` HTML attributes (`id`, `name` ...) and Event attributes (`focus`, `blur` ...) to an element in the DOM.
 */
export declare class FormlyAttributes implements OnChanges, DoCheck, OnDestroy {
    private renderer;
    private elementRef;
    /** The field config. */
    field: FormlyFieldConfig;
    id: string;
    private document;
    private uiAttributesCache;
    private uiAttributes;
    private focusObserver;
    /**
     * HostBinding doesn't register listeners conditionally which may produce some perf issues.
     *
     * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1991
     */
    private uiEvents;
    private get props();
    private get fieldAttrElements();
    constructor(renderer: Renderer2, elementRef: ElementRef, _document: any);
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * We need to re-evaluate all the attributes on every change detection cycle, because
     * by using a HostBinding we run into certain edge cases. This means that whatever logic
     * is in here has to be super lean or we risk seriously damaging or destroying the performance.
     *
     * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1317
     * Material issue: https://github.com/angular/components/issues/14024
     */
    ngDoCheck(): void;
    ngOnDestroy(): void;
    toggleFocus(value: boolean): void;
    onFocus($event: any): void;
    onBlur($event: any): void;
    onHostChange($event: any): void;
    onChange($event: any): void;
    private attachElementRef;
    private detachElementRef;
    private setAttribute;
    private removeAttribute;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyAttributes, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FormlyAttributes, "[formlyAttributes]", never, { "field": "formlyAttributes"; "id": "id"; }, {}, never>;
}
