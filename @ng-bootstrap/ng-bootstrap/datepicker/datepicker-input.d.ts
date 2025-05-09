import { EventEmitter, OnChanges, OnDestroy, SimpleChanges, TemplateRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import { NgbDatepickerNavigateEvent } from './datepicker';
import { DayTemplateContext } from './datepicker-day-template-context';
import { NgbDate } from './ngb-date';
import { NgbDateStruct } from './ngb-date-struct';
import { ContentTemplateContext } from './datepicker-content-template-context';
import * as i0 from "@angular/core";
/**
 * A directive that allows to stick a datepicker popup to an input field.
 *
 * Manages interaction with the input field itself, does value formatting and provides forms integration.
 */
export declare class NgbInputDatepicker implements OnChanges, OnDestroy, ControlValueAccessor, Validator {
    static ngAcceptInputType_autoClose: boolean | string;
    static ngAcceptInputType_disabled: boolean | '';
    static ngAcceptInputType_navigation: string;
    static ngAcceptInputType_outsideDays: string;
    static ngAcceptInputType_weekdays: boolean | string;
    private _parserFormatter;
    private _elRef;
    private _vcRef;
    private _ngZone;
    private _calendar;
    private _dateAdapter;
    private _document;
    private _changeDetector;
    private _injector;
    private _config;
    private _cRef;
    private _disabled;
    private _elWithFocus;
    private _model;
    private _inputValue;
    private _afterRenderRef;
    private _positioning;
    private _destroyCloseHandlers$;
    /**
     * Indicates whether the datepicker popup should be closed automatically after date selection / outside click or not.
     *
     * * `true` - the popup will close on both date selection and outside click.
     * * `false` - the popup can only be closed manually via `close()` or `toggle()` methods.
     * * `"inside"` - the popup will close on date selection, but not outside clicks.
     * * `"outside"` - the popup will close only on the outside click and not on date selection/inside clicks.
     *
     * @since 3.0.0
     */
    autoClose: boolean | "inside" | "outside";
    /**
     * The reference to a custom content template.
     *
     * Allows to completely override the way datepicker.
     *
     * See [`NgbDatepickerContent`](#/components/datepicker/api#NgbDatepickerContent) for more details.
     *
     * @since 14.2.0
     */
    contentTemplate: TemplateRef<ContentTemplateContext>;
    /**
     * An optional class applied to the datepicker popup element.
     *
     * @since 9.1.0
     */
    datepickerClass: string;
    /**
     * The reference to a custom template for the day.
     *
     * Allows to completely override the way a day 'cell' in the calendar is displayed.
     *
     * See [`DayTemplateContext`](#/components/datepicker/api#DayTemplateContext) for the data you get inside.
     */
    dayTemplate: TemplateRef<DayTemplateContext>;
    /**
     * The callback to pass any arbitrary data to the template cell via the
     * [`DayTemplateContext`](#/components/datepicker/api#DayTemplateContext)'s `data` parameter.
     *
     * `current` is the month that is currently displayed by the datepicker.
     *
     * @since 3.3.0
     */
    dayTemplateData: (date: NgbDate, current?: {
        year: number;
        month: number;
    }) => any;
    /**
     * The number of months to display.
     */
    displayMonths: number;
    /**
     * The first day of the week.
     *
     * With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun.
     */
    firstDayOfWeek: number;
    /**
     * The reference to the custom template for the datepicker footer.
     *
     * @since 3.3.0
     */
    footerTemplate: TemplateRef<any>;
    /**
     * The callback to mark some dates as disabled.
     *
     * It is called for each new date when navigating to a different month.
     *
     * `current` is the month that is currently displayed by the datepicker.
     */
    markDisabled: (date: NgbDate, current?: {
        year: number;
        month: number;
    }) => boolean;
    /**
     * The earliest date that can be displayed or selected. Also used for form validation.
     *
     * If not provided, 'year' select box will display 10 years before the current month.
     */
    minDate: NgbDateStruct;
    /**
     * The latest date that can be displayed or selected. Also used for form validation.
     *
     * If not provided, 'year' select box will display 10 years after the current month.
     */
    maxDate: NgbDateStruct;
    /**
     * Navigation type.
     *
     * * `"select"` - select boxes for month and navigation arrows
     * * `"arrows"` - only navigation arrows
     * * `"none"` - no navigation visible at all
     */
    navigation: 'select' | 'arrows' | 'none';
    /**
     * The way of displaying days that don't belong to the current month.
     *
     * * `"visible"` - days are visible
     * * `"hidden"` - days are hidden, white space preserved
     * * `"collapsed"` - days are collapsed, so the datepicker height might change between months
     *
     * For the 2+ months view, days in between months are never shown.
     */
    outsideDays: 'visible' | 'collapsed' | 'hidden';
    /**
     * The preferred placement of the datepicker popup, among the [possible values](#/guides/positioning#api).
     *
     * The default order of preference is `"bottom-start bottom-end top-start top-end"`
     *
     * Please see the [positioning overview](#/positioning) for more details.
     */
    placement: import("../util/positioning").PlacementArray;
    /**
     * Allows to change default Popper options when positioning the popup.
     * Receives current popper options and returns modified ones.
     *
     * @since 13.1.0
     */
    popperOptions: (options: Partial<import("@popperjs/core").Options>) => Partial<import("@popperjs/core").Options>;
    /**
     * If `true`, when closing datepicker will focus element that was focused before datepicker was opened.
     *
     * Alternatively you could provide a selector or an `HTMLElement` to focus. If the element doesn't exist or invalid,
     * we'll fallback to focus document body.
     *
     * @since 5.2.0
     */
    restoreFocus: true | string | HTMLElement;
    /**
     * If `true`, week numbers will be displayed.
     */
    showWeekNumbers: boolean;
    /**
     * The date to open calendar with.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date is provided, calendar will open with current month.
     *
     * You could use `navigateTo(date)` method as an alternative.
     */
    startDate: {
        year: number;
        month: number;
        day?: number;
    };
    /**
     * A selector specifying the element the datepicker popup should be appended to.
     *
     * Currently only supports `"body"`.
     */
    container: "body" | null;
    /**
     * A css selector or html element specifying the element the datepicker popup should be positioned against.
     *
     * By default the input is used as a target.
     *
     * @since 4.2.0
     */
    positionTarget: string | HTMLElement;
    /**
     * The way weekdays should be displayed.
     *
     * * `true` - weekdays are displayed using default width
     * * `false` - weekdays are not displayed
     * * `"short" | "long" | "narrow"` - weekdays are displayed using specified width
     *
     * @since 9.1.0
     */
    weekdays: Exclude<Intl.DateTimeFormatOptions['weekday'], undefined> | boolean;
    /**
     * An event emitted when user selects a date using keyboard or mouse.
     *
     * The payload of the event is currently selected `NgbDate`.
     *
     * @since 1.1.1
     */
    dateSelect: EventEmitter<NgbDate>;
    /**
     * Event emitted right after the navigation happens and displayed month changes.
     *
     * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
     */
    navigate: EventEmitter<NgbDatepickerNavigateEvent>;
    /**
     * An event fired after closing datepicker window.
     *
     * @since 4.2.0
     */
    closed: EventEmitter<void>;
    get disabled(): any;
    set disabled(value: any);
    private _onChange;
    private _onTouched;
    private _validatorChange;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    registerOnValidatorChange(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    validate(c: AbstractControl): ValidationErrors | null;
    writeValue(value: any): void;
    manualDateChange(value: string, updateView?: boolean): void;
    isOpen(): boolean;
    /**
     * Opens the datepicker popup.
     *
     * If the related form control contains a valid date, the corresponding month will be opened.
     */
    open(): void;
    /**
     * Closes the datepicker popup.
     */
    close(): void;
    /**
     * Toggles the datepicker popup.
     */
    toggle(): void;
    /**
     * Navigates to the provided date.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     *
     * Use the `[startDate]` input as an alternative.
     */
    navigateTo(date?: {
        year: number;
        month: number;
        day?: number;
    }): void;
    onBlur(): void;
    onFocus(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private _applyDatepickerInputs;
    private _applyPopupClass;
    private _applyPopupStyling;
    private _subscribeForDatepickerOutputs;
    private _writeModelValue;
    private _fromDateStruct;
    private _setCloseHandlers;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbInputDatepicker, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbInputDatepicker, "input[ngbDatepicker]", ["ngbDatepicker"], { "autoClose": { "alias": "autoClose"; "required": false; }; "contentTemplate": { "alias": "contentTemplate"; "required": false; }; "datepickerClass": { "alias": "datepickerClass"; "required": false; }; "dayTemplate": { "alias": "dayTemplate"; "required": false; }; "dayTemplateData": { "alias": "dayTemplateData"; "required": false; }; "displayMonths": { "alias": "displayMonths"; "required": false; }; "firstDayOfWeek": { "alias": "firstDayOfWeek"; "required": false; }; "footerTemplate": { "alias": "footerTemplate"; "required": false; }; "markDisabled": { "alias": "markDisabled"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "navigation": { "alias": "navigation"; "required": false; }; "outsideDays": { "alias": "outsideDays"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "popperOptions": { "alias": "popperOptions"; "required": false; }; "restoreFocus": { "alias": "restoreFocus"; "required": false; }; "showWeekNumbers": { "alias": "showWeekNumbers"; "required": false; }; "startDate": { "alias": "startDate"; "required": false; }; "container": { "alias": "container"; "required": false; }; "positionTarget": { "alias": "positionTarget"; "required": false; }; "weekdays": { "alias": "weekdays"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "dateSelect": "dateSelect"; "navigate": "navigate"; "closed": "closed"; }, never, never, true, never>;
}
