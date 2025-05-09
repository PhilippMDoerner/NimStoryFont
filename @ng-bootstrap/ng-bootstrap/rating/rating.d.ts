import { EventEmitter, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * The context for the custom star display template defined in the `starTemplate`.
 */
export interface StarTemplateContext {
    /**
     * The star fill percentage, an integer in the `[0, 100]` range.
     */
    fill: number;
    /**
     * Index of the star, starts with `0`.
     */
    index: number;
}
/**
 * A directive that helps visualising and interacting with a star rating bar.
 */
export declare class NgbRating implements ControlValueAccessor, OnInit, OnChanges {
    contexts: StarTemplateContext[];
    nextRate: number;
    private _config;
    private _changeDetectorRef;
    /**
     * If `true`, the rating can't be changed or focused.
     */
    disabled: boolean;
    /**
     * The maximal rating that can be given.
     */
    max: number;
    /**
     * The current rating. Could be a decimal value like `3.75`.
     */
    rate: number;
    /**
     * If `true`, the rating can't be changed.
     */
    readonly: boolean;
    /**
     * If `true`, the rating can be reset to `0` by mouse clicking currently set rating.
     */
    resettable: boolean;
    /**
     * The template to override the way each star is displayed.
     *
     * Alternatively put an `<ng-template>` as the only child of your `<ngb-rating>` element
     */
    starTemplate: TemplateRef<StarTemplateContext>;
    starTemplateFromContent: TemplateRef<StarTemplateContext>;
    /**
     * Allows setting a custom rating tabindex.
     * If the component is disabled, `tabindex` will still be set to `-1`.
     *
     * @since 13.1.0
     */
    tabindex: string | number;
    /**
     * Allows to provide a function to set a custom aria-valuetext
     *
     * @since 14.1.0
     */
    ariaValueText(current: number, max: number): string;
    /**
     * An event emitted when the user is hovering over a given rating.
     *
     * Event payload equals to the rating being hovered over.
     */
    hover: EventEmitter<number>;
    /**
     * An event emitted when the user stops hovering over a given rating.
     *
     * Event payload equals to the rating of the last item being hovered over.
     */
    leave: EventEmitter<number>;
    /**
     * An event emitted when the rating is changed.
     *
     * Event payload equals to the newly selected rating.
     */
    rateChange: EventEmitter<number>;
    onChange: (_: any) => void;
    onTouched: () => void;
    isInteractive(): boolean;
    enter(value: number): void;
    handleBlur(): void;
    handleClick(value: number): void;
    handleKeyDown(event: KeyboardEvent): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    reset(): void;
    setDisabledState(isDisabled: boolean): void;
    update(value: number, internalChange?: boolean): void;
    writeValue(value: any): void;
    private _updateState;
    private _updateMax;
    private _setupContexts;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbRating, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbRating, "ngb-rating", never, { "disabled": { "alias": "disabled"; "required": false; }; "max": { "alias": "max"; "required": false; }; "rate": { "alias": "rate"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "resettable": { "alias": "resettable"; "required": false; }; "starTemplate": { "alias": "starTemplate"; "required": false; }; "tabindex": { "alias": "tabindex"; "required": false; }; "ariaValueText": { "alias": "ariaValueText"; "required": false; }; }, { "hover": "hover"; "leave": "leave"; "rateChange": "rateChange"; }, ["starTemplateFromContent"], never, true, never>;
}
