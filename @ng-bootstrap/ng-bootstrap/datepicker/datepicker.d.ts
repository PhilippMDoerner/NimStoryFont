import { AfterViewInit, EventEmitter, Injector, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NgbCalendar } from './ngb-calendar';
import { NgbDate } from './ngb-date';
import { DatepickerViewModel, DayViewModel, MonthViewModel, NavigationEvent } from './datepicker-view-model';
import { DayTemplateContext } from './datepicker-day-template-context';
import { NgbDateStruct } from './ngb-date-struct';
import { NgbDatepickerI18n } from './datepicker-i18n';
import { ContentTemplateContext } from './datepicker-content-template-context';
import * as i0 from "@angular/core";
/**
 * An event emitted right before the navigation happens and the month displayed by the datepicker changes.
 */
export interface NgbDatepickerNavigateEvent {
    /**
     * The currently displayed month.
     */
    current: {
        year: number;
        month: number;
    } | null;
    /**
     * The month we're navigating to.
     */
    next: {
        year: number;
        month: number;
    };
    /**
     * Calling this function will prevent navigation from happening.
     *
     * @since 4.1.0
     */
    preventDefault: () => void;
}
/**
 * An interface that represents the readonly public state of the datepicker.
 *
 * Accessible via the `datepicker.state` getter
 *
 * @since 5.2.0
 */
export interface NgbDatepickerState {
    /**
     * The earliest date that can be displayed or selected
     */
    readonly minDate: NgbDate | null;
    /**
     * The latest date that can be displayed or selected
     */
    readonly maxDate: NgbDate | null;
    /**
     * The first visible date of currently displayed months
     */
    readonly firstDate: NgbDate;
    /**
     * The last visible date of currently displayed months
     */
    readonly lastDate: NgbDate;
    /**
     * The date currently focused by the datepicker
     */
    readonly focusedDate: NgbDate;
    /**
     * First dates of months currently displayed by the datepicker
     *
     * @since 5.3.0
     */
    readonly months: NgbDate[];
}
/**
 * A directive that marks the content template that customizes the way datepicker months are displayed
 *
 * @since 5.3.0
 */
export declare class NgbDatepickerContent {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerContent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbDatepickerContent, "ng-template[ngbDatepickerContent]", never, {}, {}, never, never, true, never>;
}
/**
 * A component that renders one month including all the days, weekdays and week numbers. Can be used inside
 * the `<ng-template ngbDatepickerMonths></ng-template>` when you want to customize months layout.
 *
 * For a usage example, see [custom month layout demo](#/components/datepicker/examples#custommonth)
 *
 * @since 5.3.0
 */
export declare class NgbDatepickerMonth {
    private _keyboardService;
    private _service;
    i18n: NgbDatepickerI18n;
    datepicker: NgbDatepicker;
    viewModel: MonthViewModel;
    /**
     * The first date of month to be rendered.
     *
     * This month must one of the months present in the
     * [datepicker state](#/components/datepicker/api#NgbDatepickerState).
     */
    set month(month: NgbDateStruct);
    onKeyDown(event: KeyboardEvent): void;
    doSelect(day: DayViewModel): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerMonth, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbDatepickerMonth, "ngb-datepicker-month", never, { "month": { "alias": "month"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * A highly configurable component that helps you with selecting calendar dates.
 *
 * `NgbDatepicker` is meant to be displayed inline on a page or put inside a popup.
 */
export declare class NgbDatepicker implements AfterViewInit, OnChanges, OnInit, ControlValueAccessor {
    static ngAcceptInputType_autoClose: boolean | string;
    static ngAcceptInputType_navigation: string;
    static ngAcceptInputType_outsideDays: string;
    static ngAcceptInputType_weekdays: boolean | string;
    model: DatepickerViewModel;
    private _defaultDayTemplate;
    private _contentEl;
    protected injector: Injector;
    private _service;
    private _calendar;
    private _i18n;
    private _config;
    private _nativeElement;
    private _ngbDateAdapter;
    private _ngZone;
    private _destroyRef;
    private _injector;
    private _controlValue;
    private _publicState;
    private _initialized;
    /**
     * The reference to a custom content template.
     *
     * Allows to completely override the way datepicker displays months.
     *
     * See [`NgbDatepickerContent`](#/components/datepicker/api#NgbDatepickerContent) and
     * [`ContentTemplateContext`](#/components/datepicker/api#ContentTemplateContext) for more details.
     *
     * @since 14.2.0
     */
    contentTemplate: TemplateRef<ContentTemplateContext>;
    contentTemplateFromContent?: NgbDatepickerContent;
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
    dayTemplateData: (date: NgbDateStruct, current?: {
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
    markDisabled: (date: NgbDateStruct, current?: {
        year: number;
        month: number;
    }) => boolean;
    /**
     * The latest date that can be displayed or selected.
     *
     * If not provided, 'year' select box will display 10 years after the current month.
     */
    maxDate: NgbDateStruct;
    /**
     * The earliest date that can be displayed or selected.
     *
     * If not provided, 'year' select box will display 10 years before the current month.
     */
    minDate: NgbDateStruct;
    /**
     * Navigation type.
     *
     * * `"select"` - select boxes for month and navigation arrows
     * * `"arrows"` - only navigation arrows
     * * `"none"` - no navigation visible at all
     */
    navigation: "none" | "select" | "arrows";
    /**
     * The way of displaying days that don't belong to the current month.
     *
     * * `"visible"` - days are visible
     * * `"hidden"` - days are hidden, white space preserved
     * * `"collapsed"` - days are collapsed, so the datepicker height might change between months
     *
     * For the 2+ months view, days in between months are never shown.
     */
    outsideDays: "hidden" | "visible" | "collapsed";
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
     * The way weekdays should be displayed.
     *
     * * `true` - weekdays are displayed using default width
     * * `false` - weekdays are not displayed
     * * `"short" | "long" | "narrow"` - weekdays are displayed using specified width
     *
     * @since 9.1.0
     */
    weekdays: boolean | "short" | "narrow" | "long";
    /**
     * An event emitted right before the navigation happens and displayed month changes.
     *
     * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
     */
    navigate: EventEmitter<NgbDatepickerNavigateEvent>;
    /**
     * An event emitted when user selects a date using keyboard or mouse.
     *
     * The payload of the event is currently selected `NgbDate`.
     *
     * @since 5.2.0
     */
    dateSelect: EventEmitter<NgbDate>;
    onChange: (_: any) => void;
    onTouched: () => void;
    constructor();
    /**
     *  Returns the readonly public state of the datepicker
     *
     * @since 5.2.0
     */
    get state(): NgbDatepickerState;
    /**
     *  Returns the calendar service used in the specific datepicker instance.
     *
     *  @since 5.3.0
     */
    get calendar(): NgbCalendar;
    /**
     * Returns the i18n service used in the specific datepicker instance.
     *
     * @since 14.2.0
     */
    get i18n(): NgbDatepickerI18n;
    /**
     *  Focuses on given date.
     */
    focusDate(date?: NgbDateStruct | null): void;
    /**
     *  Selects focused date.
     */
    focusSelect(): void;
    focus(): void;
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
    ngAfterViewInit(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    onDateSelect(date: NgbDate): void;
    onNavigateDateSelect(date: NgbDate): void;
    onNavigateEvent(event: NavigationEvent): void;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    setDisabledState(disabled: boolean): void;
    writeValue(value: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepicker, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbDatepicker, "ngb-datepicker", ["ngbDatepicker"], { "contentTemplate": { "alias": "contentTemplate"; "required": false; }; "dayTemplate": { "alias": "dayTemplate"; "required": false; }; "dayTemplateData": { "alias": "dayTemplateData"; "required": false; }; "displayMonths": { "alias": "displayMonths"; "required": false; }; "firstDayOfWeek": { "alias": "firstDayOfWeek"; "required": false; }; "footerTemplate": { "alias": "footerTemplate"; "required": false; }; "markDisabled": { "alias": "markDisabled"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "navigation": { "alias": "navigation"; "required": false; }; "outsideDays": { "alias": "outsideDays"; "required": false; }; "showWeekNumbers": { "alias": "showWeekNumbers"; "required": false; }; "startDate": { "alias": "startDate"; "required": false; }; "weekdays": { "alias": "weekdays"; "required": false; }; }, { "navigate": "navigate"; "dateSelect": "dateSelect"; }, ["contentTemplateFromContent"], never, true, never>;
}
