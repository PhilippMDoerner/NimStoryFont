import { ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NgbTime } from './ngb-time';
import { NgbTimepickerConfig } from './timepicker-config';
import { NgbTimeAdapter } from './ngb-time-adapter';
import { NgbTimepickerI18n } from './timepicker-i18n';
import * as i0 from "@angular/core";
/**
 * A directive that helps with wth picking hours, minutes and seconds.
 */
export declare class NgbTimepicker implements ControlValueAccessor, OnChanges {
    private readonly _config;
    private _ngbTimeAdapter;
    private _cd;
    i18n: NgbTimepickerI18n;
    static ngAcceptInputType_size: string;
    disabled: boolean;
    model?: NgbTime;
    private _hourStep;
    private _minuteStep;
    private _secondStep;
    /**
     * Whether to display 12H or 24H mode.
     */
    meridian: boolean;
    /**
     * If `true`, the spinners above and below inputs are visible.
     */
    spinners: boolean;
    /**
     * If `true`, it is possible to select seconds.
     */
    seconds: boolean;
    /**
     * The number of hours to add/subtract when clicking hour spinners.
     */
    set hourStep(step: number);
    get hourStep(): number;
    /**
     * The number of minutes to add/subtract when clicking minute spinners.
     */
    set minuteStep(step: number);
    get minuteStep(): number;
    /**
     * The number of seconds to add/subtract when clicking second spinners.
     */
    set secondStep(step: number);
    get secondStep(): number;
    /**
     * If `true`, the timepicker is readonly and can't be changed.
     */
    readonlyInputs: boolean;
    /**
     * The size of inputs and buttons.
     */
    size: 'small' | 'medium' | 'large';
    constructor(_config: NgbTimepickerConfig, _ngbTimeAdapter: NgbTimeAdapter<any>, _cd: ChangeDetectorRef, i18n: NgbTimepickerI18n);
    onChange: (_: any) => void;
    onTouched: () => void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    setDisabledState(isDisabled: boolean): void;
    /**
     * Increments the hours by the given step.
     */
    changeHour(step: number): void;
    /**
     * Increments the minutes by the given step.
     */
    changeMinute(step: number): void;
    /**
     * Increments the seconds by the given step.
     */
    changeSecond(step: number): void;
    /**
     * Update hours with the new value.
     */
    updateHour(newVal: string): void;
    /**
     * Update minutes with the new value.
     */
    updateMinute(newVal: string): void;
    /**
     * Update seconds with the new value.
     */
    updateSecond(newVal: string): void;
    toggleMeridian(): void;
    formatInput(input: HTMLInputElement): void;
    formatHour(value?: number): string;
    formatMinSec(value?: number): string;
    handleBlur(): void;
    get isSmallSize(): boolean;
    get isLargeSize(): boolean;
    ngOnChanges(changes: SimpleChanges): void;
    private propagateModelChange;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTimepicker, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbTimepicker, "ngb-timepicker", ["ngbTimepicker"], { "meridian": { "alias": "meridian"; "required": false; }; "spinners": { "alias": "spinners"; "required": false; }; "seconds": { "alias": "seconds"; "required": false; }; "hourStep": { "alias": "hourStep"; "required": false; }; "minuteStep": { "alias": "minuteStep"; "required": false; }; "secondStep": { "alias": "secondStep"; "required": false; }; "readonlyInputs": { "alias": "readonlyInputs"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, {}, never, never, true, never>;
}
