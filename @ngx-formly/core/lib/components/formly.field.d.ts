import { ViewContainerRef, SimpleChanges, DoCheck, OnInit, OnChanges, OnDestroy, AfterContentInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { FormlyConfig } from '../services/formly.config';
import { FormlyFieldConfig } from '../models';
import { FormlyFieldTemplates } from './formly.template';
import * as i0 from "@angular/core";
/**
 * The `<formly-field>` component is used to render the UI widget (layout + type) of a given `field`.
 */
export declare class FormlyField implements DoCheck, OnInit, OnChanges, AfterContentInit, AfterViewInit, OnDestroy {
    private config;
    private renderer;
    private _elementRef;
    private hostContainerRef;
    private form;
    /** The field config. */
    field: FormlyFieldConfig;
    viewContainerRef: ViewContainerRef;
    private hostObservers;
    private componentRefs;
    private hooksObservers;
    private detectFieldBuild;
    private get containerRef();
    private get elementRef();
    valueChangesUnsubscribe: () => void;
    constructor(config: FormlyConfig, renderer: Renderer2, _elementRef: ElementRef, hostContainerRef: ViewContainerRef, form: FormlyFieldTemplates);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private renderField;
    private triggerHook;
    private attachComponentRef;
    private render;
    private resetRefs;
    private fieldChanges;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyField, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyField, "formly-field", never, { "field": "field"; }, {}, never, never>;
}
