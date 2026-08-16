import * as i0 from '@angular/core';
import { OnChanges, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

declare class NgbTime {
    hour: number;
    minute: number;
    second: number;
    constructor(hour?: number, minute?: number, second?: number);
    changeHour(step?: number): void;
    updateHour(hour: number): void;
    changeMinute(step?: number): void;
    updateMinute(minute: number): void;
    changeSecond(step?: number): void;
    updateSecond(second: number): void;
    isValid(checkSecs?: boolean): boolean;
    toString(): string;
}

/**
 * A configuration service for the [`NgbTimepicker`](#/components/timepicker/api#NgbTimepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the timepickers used in the application.
 */
declare class NgbTimepickerConfig {
    meridian: boolean;
    spinners: boolean;
    seconds: boolean;
    hourStep: number;
    minuteStep: number;
    secondStep: number;
    disabled: boolean;
    readonlyInputs: boolean;
    size: 'small' | 'medium' | 'large';
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTimepickerConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbTimepickerConfig>;
}

/**
 * An interface for the time model used by the timepicker.
 */
interface NgbTimeStruct {
    /**
     * The hour in the `[0, 23]` range.
     */
    hour: number;
    /**
     * The minute in the `[0, 59]` range.
     */
    minute: number;
    /**
     * The second in the `[0, 59]` range.
     */
    second: number;
}

/**
 * An abstract service that does the conversion between the internal timepicker `NgbTimeStruct` model and
 * any provided user time model `T`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding timepicker to a form control,
 * ex. `[(ngModel)]="userTimeModel"`. Here `userTimeModel` can be of any type.
 *
 * The default timepicker implementation assumes we use `NgbTimeStruct` as a user model.
 *
 * See the [custom time adapter demo](#/components/timepicker/examples#adapter) for an example.
 *
 * @since 2.2.0
 */
declare abstract class NgbTimeAdapter<T> {
    /**
     * Converts a user-model time of type `T` to an `NgbTimeStruct` for internal use.
     */
    abstract fromModel(value: T | null): NgbTimeStruct | null;
    /**
     * Converts an internal `NgbTimeStruct` time to a user-model time of type `T`.
     */
    abstract toModel(time: NgbTimeStruct | null): T | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTimeAdapter<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbTimeAdapter<any>>;
}

/**
 * Type of the service supplying day periods (for example, 'AM' and 'PM') to NgbTimepicker component.
 * The default implementation of this service honors the Angular locale, and uses the registered locale data,
 * as explained in the Angular i18n guide.
 */
declare abstract class NgbTimepickerI18n {
    /**
     * Returns the name for the period before midday.
     */
    abstract getMorningPeriod(): string;
    /**
     * Returns the name for the period after midday.
     */
    abstract getAfternoonPeriod(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTimepickerI18n, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbTimepickerI18n>;
}

/**
 * A directive that helps with wth picking hours, minutes and seconds.
 */
declare class NgbTimepicker implements ControlValueAccessor, OnChanges {
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

declare class NgbTimepickerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTimepickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbTimepickerModule, never, [typeof NgbTimepicker], [typeof NgbTimepicker]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbTimepickerModule>;
}

export { NgbTimeAdapter, NgbTimepicker, NgbTimepickerConfig, NgbTimepickerI18n, NgbTimepickerModule };
export type { NgbTimeStruct };
