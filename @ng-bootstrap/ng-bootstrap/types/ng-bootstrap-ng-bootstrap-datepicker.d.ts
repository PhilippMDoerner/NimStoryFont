import * as i0 from '@angular/core';
import { AfterViewInit, OnChanges, OnInit, Injector, TemplateRef, EventEmitter, SimpleChanges, OnDestroy } from '@angular/core';
import { ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import * as _popperjs_core from '@popperjs/core';
import { Options } from '@popperjs/core';
import * as _ng_bootstrap_ng_bootstrap_utils from './_ngb-ngbootstrap-utilities.d';
import { PlacementArray } from './_ngb-ngbootstrap-utilities.d';

/**
 * An interface of the date model used by the datepicker.
 *
 * All datepicker APIs consume `NgbDateStruct`, but return `NgbDate`.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
 */
interface NgbDateStruct {
    /**
     * The year, for example 2016
     */
    year: number;
    /**
     * The month, for example 1=Jan ... 12=Dec
     */
    month: number;
    /**
     * The day of month, starting at 1
     */
    day: number;
}

/**
 * A simple class that represents a date that datepicker also uses internally.
 *
 * It is the implementation of the `NgbDateStruct` interface that adds some convenience methods,
 * like `.equals()`, `.before()`, etc.
 *
 * All datepicker APIs consume `NgbDateStruct`, but return `NgbDate`.
 *
 * In many cases it is simpler to manipulate these objects together with
 * [`NgbCalendar`](#/components/datepicker/api#NgbCalendar) than native JS Dates.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
 *
 * @since 3.0.0
 */
declare class NgbDate implements NgbDateStruct {
    /**
     * The year, for example 2016
     */
    year: number;
    /**
     * The month, for example 1=Jan ... 12=Dec as in ISO 8601
     */
    month: number;
    /**
     * The day of month, starting with 1
     */
    day: number;
    /**
     * A **static method** that creates a new date object from the `NgbDateStruct`,
     *
     * ex. `NgbDate.from({year: 2000, month: 5, day: 1})`.
     *
     * If the `date` is already of `NgbDate` type, the method will return the same object.
     */
    static from(date?: NgbDateStruct | null): NgbDate | null;
    constructor(year: number, month: number, day: number);
    /**
     * Checks if the current date is equal to another date.
     */
    equals(other?: NgbDateStruct | null): boolean;
    /**
     * Checks if the current date is before another date.
     */
    before(other?: NgbDateStruct | null): boolean;
    /**
     * Checks if the current date is after another date.
     */
    after(other?: NgbDateStruct | null): boolean;
}

type NgbPeriod = 'y' | 'm' | 'd';
/**
 * A service that represents the calendar used by the datepicker.
 *
 * The default implementation uses the Gregorian calendar. You can inject it in your own
 * implementations if necessary to simplify `NgbDate` calculations.
 */
declare abstract class NgbCalendar {
    /**
     * Returns the number of days per week.
     */
    abstract getDaysPerWeek(): number;
    /**
     * Returns an array of months per year.
     *
     * With default calendar we use ISO 8601 and return [1, 2, ..., 12];
     */
    abstract getMonths(year?: number): number[];
    /**
     * Returns the number of weeks per month.
     */
    abstract getWeeksPerMonth(): number;
    /**
     * Returns the weekday number for a given day.
     *
     * With the default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
     */
    abstract getWeekday(date: NgbDate): number;
    /**
     * Adds a number of years, months or days to a given date.
     *
     * * `period` can be `y`, `m` or `d` and defaults to day.
     * * `number` defaults to 1.
     *
     * Always returns a new date.
     */
    abstract getNext(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    /**
     * Subtracts a number of years, months or days from a given date.
     *
     * * `period` can be `y`, `m` or `d` and defaults to day.
     * * `number` defaults to 1.
     *
     * Always returns a new date.
     */
    abstract getPrev(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    /**
     * Returns the week number for a given week.
     */
    abstract getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number): number;
    /**
     * Returns the today's date.
     */
    abstract getToday(): NgbDate;
    /**
     * Checks if a date is valid in the current calendar.
     */
    abstract isValid(date?: NgbDate | null): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendar, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendar>;
}
declare class NgbCalendarGregorian extends NgbCalendar {
    getDaysPerWeek(): number;
    getMonths(): number[];
    getWeeksPerMonth(): number;
    getNext(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getPrev(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getWeekday(date: NgbDate): number;
    getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number): number;
    getToday(): NgbDate;
    isValid(date?: NgbDate | null): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendarGregorian, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendarGregorian>;
}

/**
 * The context for the datepicker 'day' template.
 *
 * You can override the way dates are displayed in the datepicker via the `[dayTemplate]` input.
 */
interface DayTemplateContext {
    /**
     * The date that corresponds to the template. Same as the `date` parameter.
     *
     * Can be used for convenience as a default template key, ex. `let-d`.
     *
     * @since 3.3.0
     */
    $implicit: NgbDate;
    /**
     * The month currently displayed by the datepicker.
     */
    currentMonth: number;
    /**
     * The year currently displayed by the datepicker.
     *
     * @since 5.2.0
     */
    currentYear: number;
    /**
     * Any data you pass using the `[dayTemplateData]` input in the datepicker.
     *
     * @since 3.3.0
     */
    data?: any;
    /**
     * The date that corresponds to the template.
     */
    date: NgbDate;
    /**
     * `True` if the current date is disabled.
     */
    disabled: boolean;
    /**
     * `True` if the current date is focused.
     */
    focused: boolean;
    /**
     * `True` if the current date is selected.
     */
    selected: boolean;
    /**
     * `True` if the current date is today (equal to `NgbCalendar.getToday()`).
     *
     * @since 4.1.0
     */
    today: boolean;
}

type NgbMarkDisabled = (date: NgbDateStruct, current?: {
    year: number;
    month: number;
}) => boolean;
type NgbDayTemplateData = (date: NgbDateStruct, current?: {
    year: number;
    month: number;
}) => any;
type DayViewModel = {
    date: NgbDate;
    context: DayTemplateContext;
    tabindex: number;
    ariaLabel: string;
    hidden: boolean;
};
type WeekViewModel = {
    number: number;
    days: DayViewModel[];
    collapsed: boolean;
};
type MonthViewModel = {
    firstDate: NgbDate;
    lastDate: NgbDate;
    number: number;
    year: number;
    weeks: WeekViewModel[];
    weekdays: string[];
};
type DatepickerViewModel = {
    dayTemplateData: NgbDayTemplateData | null;
    disabled: boolean;
    displayMonths: number;
    firstDate: NgbDate | null;
    firstDayOfWeek: number;
    focusDate: NgbDate | null;
    focusVisible: boolean;
    lastDate: NgbDate | null;
    markDisabled: NgbMarkDisabled | null;
    maxDate: NgbDate | null;
    minDate: NgbDate | null;
    months: MonthViewModel[];
    navigation: 'select' | 'arrows' | 'none';
    outsideDays: 'visible' | 'collapsed' | 'hidden';
    prevDisabled: boolean;
    nextDisabled: boolean;
    selectBoxes: {
        years: number[];
        months: number[];
    };
    selectedDate: NgbDate | null;
    weekdayWidth: Exclude<Intl.DateTimeFormatOptions['weekday'], undefined>;
    weekdaysVisible: boolean;
};
declare enum NavigationEvent {
    PREV = 0,
    NEXT = 1
}

/**
 * A service supplying i18n data to the datepicker component.
 *
 * The default implementation of this service uses the Angular locale and registered locale data for
 * weekdays and month names (as explained in the Angular i18n guide).
 *
 * It also provides a way to i18n data that depends on calendar calculations, like aria labels, day, week and year
 * numerals. For other static labels the datepicker uses the default Angular i18n.
 *
 * See the [i18n demo](#/components/datepicker/examples#i18n) and
 * [Hebrew calendar demo](#/components/datepicker/calendars#hebrew) on how to extend this class and define
 * a custom provider for i18n.
 */
declare abstract class NgbDatepickerI18n {
    /**
     * Returns the weekday label using specified width
     *
     * @since 9.1.0
     */
    abstract getWeekdayLabel(weekday: number, width?: Exclude<Intl.DateTimeFormatOptions['weekday'], undefined>): string;
    /**
     * Returns the short month name to display in the date picker navigation.
     *
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     */
    abstract getMonthShortName(month: number, year?: number): string;
    /**
     * Returns the full month name to display in the date picker navigation.
     *
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     */
    abstract getMonthFullName(month: number, year?: number): string;
    /**
     * Returns the text label to display above the day view.
     *
     * @since 9.1.0
     */
    getMonthLabel(date: NgbDateStruct): string;
    /**
     * Returns the value of the `aria-label` attribute for a specific date.
     *
     * @since 2.0.0
     */
    abstract getDayAriaLabel(date: NgbDateStruct): string;
    /**
     * Returns the textual representation of a day that is rendered in a day cell.
     *
     * @since 3.0.0
     */
    getDayNumerals(date: NgbDateStruct): string;
    /**
     * Returns the textual representation of a week number rendered by datepicker.
     *
     * @since 3.0.0
     */
    getWeekNumerals(weekNumber: number): string;
    /**
     * Returns the textual representation of a year that is rendered in the datepicker year select box.
     *
     * @since 3.0.0
     */
    getYearNumerals(year: number): string;
    /**
     * Returns the week label to display in the heading of the month view.
     *
     * @since 9.1.0
     */
    getWeekLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerI18n, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDatepickerI18n>;
}
/**
 * A service providing default implementation for the datepicker i18n.
 * It can be used as a base implementation if necessary.
 *
 * @since 9.1.0
 */
declare class NgbDatepickerI18nDefault extends NgbDatepickerI18n {
    private _locale;
    private _monthsShort;
    private _monthsFull;
    getWeekdayLabel(weekday: number, width?: Exclude<Intl.DateTimeFormatOptions['weekday'], undefined>): string;
    getMonthShortName(month: number): string;
    getMonthFullName(month: number): string;
    getDayAriaLabel(date: NgbDateStruct): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerI18nDefault, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDatepickerI18nDefault>;
}

/**
 * The context for the datepicker 'content' template.
 *
 * You can override the way content is displayed in the datepicker via the `[contentTemplate]` input
 * or via the [`NgbDatepickerContent`](#/components/datepicker/api#NgbDatepickerContent) directive.
 *
 * @since 14.2.0
 */
interface ContentTemplateContext {
    /**
     * The datepicker that corresponds to the template.
     *
     * Can be used for convenience as a default template key, ex. `let-d`.
     */
    $implicit: NgbDatepicker;
}

/**
 * An event emitted right before the navigation happens and the month displayed by the datepicker changes.
 */
interface NgbDatepickerNavigateEvent {
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
interface NgbDatepickerState {
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
declare class NgbDatepickerContent {
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
declare class NgbDatepickerMonth {
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
declare class NgbDatepicker implements AfterViewInit, OnChanges, OnInit, ControlValueAccessor {
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

/**
 * A directive that allows to stick a datepicker popup to an input field.
 *
 * Manages interaction with the input field itself, does value formatting and provides forms integration.
 */
declare class NgbInputDatepicker implements OnChanges, OnDestroy, ControlValueAccessor, Validator {
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
    placement: _ng_bootstrap_ng_bootstrap_utils.PlacementArray;
    /**
     * Allows to change default Popper options when positioning the popup.
     * Receives current popper options and returns modified ones.
     *
     * @since 13.1.0
     */
    popperOptions: (options: Partial<_popperjs_core.Options>) => Partial<_popperjs_core.Options>;
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

declare abstract class NgbCalendarHijri extends NgbCalendar {
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     */
    abstract getDaysPerMonth(month: number, year: number): number;
    /**
     * Returns the equivalent Hijri date value for a give input Gregorian date.
     * `gDate` is s JS Date to be converted to Hijri.
     */
    abstract fromGregorian(gDate: Date): NgbDate;
    /**
     * Converts the current Hijri date to Gregorian.
     */
    abstract toGregorian(hDate: NgbDate): Date;
    getDaysPerWeek(): number;
    getMonths(): number[];
    getWeeksPerMonth(): number;
    getNext(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getPrev(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getWeekday(date: NgbDate): number;
    getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number): number;
    getToday(): NgbDate;
    isValid(date?: NgbDate | null): boolean;
    private _setDay;
    private _setMonth;
    private _setYear;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendarHijri, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendarHijri>;
}

declare class NgbCalendarIslamicCivil extends NgbCalendarHijri {
    /**
     * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
     * `gDate` is a JS Date to be converted to Hijri.
     */
    fromGregorian(gDate: Date): NgbDate;
    /**
     * Returns the equivalent JS date value for a give input islamic(civil) date.
     * `hDate` is an islamic(civil) date to be converted to Gregorian.
     */
    toGregorian(hDate: NgbDate): Date;
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     */
    getDaysPerMonth(month: number, year: number): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendarIslamicCivil, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendarIslamicCivil>;
}

declare class NgbCalendarIslamicUmalqura extends NgbCalendarIslamicCivil {
    /**
     * Returns the equivalent islamic(Umalqura) date value for a give input Gregorian date.
     * `gdate` is s JS Date to be converted to Hijri.
     */
    fromGregorian(gDate: Date): NgbDate;
    /**
     * Converts the current Hijri date to Gregorian.
     */
    toGregorian(hDate: NgbDate): Date;
    /**
     * Returns the number of days in a specific Hijri hMonth.
     * `hMonth` is 1 for Muharram, 2 for Safar, etc.
     * `hYear` is any Hijri hYear.
     */
    getDaysPerMonth(hMonth: number, hYear: number): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendarIslamicUmalqura, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendarIslamicUmalqura>;
}

declare class NgbCalendarPersian extends NgbCalendar {
    getDaysPerWeek(): number;
    getMonths(): number[];
    getWeeksPerMonth(): number;
    getNext(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getPrev(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getWeekday(date: NgbDate): number;
    getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number): number;
    getToday(): NgbDate;
    isValid(date?: NgbDate | null): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendarPersian, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendarPersian>;
}

/**
 * @since 3.2.0
 */
declare class NgbCalendarHebrew extends NgbCalendar {
    getDaysPerWeek(): number;
    getMonths(year?: number): number[];
    getWeeksPerMonth(): number;
    isValid(date?: NgbDate | null): boolean;
    getNext(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getPrev(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getWeekday(date: NgbDate): number;
    getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number): number;
    getToday(): NgbDate;
    /**
     * @since 3.4.0
     */
    toGregorian(date: NgbDate): NgbDate;
    /**
     * @since 3.4.0
     */
    fromGregorian(date: NgbDate): NgbDate;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendarHebrew, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendarHebrew>;
}

/**
 * @since 3.2.0
 */
declare class NgbDatepickerI18nHebrew extends NgbDatepickerI18n {
    getMonthShortName(month: number, year?: number): string;
    getMonthFullName(month: number, year?: number): string;
    getWeekdayLabel(weekday: number, width?: Intl.DateTimeFormatOptions['weekday']): string;
    getDayAriaLabel(date: NgbDateStruct): string;
    getDayNumerals(date: NgbDateStruct): string;
    getWeekNumerals(weekNumber: number): string;
    getYearNumerals(year: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerI18nHebrew, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDatepickerI18nHebrew>;
}

/**
 * @since 9.1.0
 */
declare class NgbCalendarBuddhist extends NgbCalendarGregorian {
    getToday(): NgbDate;
    getNext(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getPrev(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getWeekday(date: NgbDate): number;
    getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number): number;
    isValid(date?: NgbDate | null): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendarBuddhist, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendarBuddhist>;
}

/**
 * @since 16.0.0
 */
declare class NgbCalendarEthiopian extends NgbCalendar {
    getDaysPerWeek(): number;
    getMonths(year?: number | undefined): number[];
    getNext(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getPrev(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getWeekday(date: NgbDate): number;
    getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number): number;
    getWeeksPerMonth(): number;
    getToday(): NgbDate;
    isValid(date: NgbDate): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendarEthiopian, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendarEthiopian>;
}

/**
 * @since 16.0.0
 */
declare class NgbDatepickerI18nAmharic extends NgbDatepickerI18n {
    getMonthShortName(month: number, year?: number | undefined): string;
    getMonthFullName(month: number, year?: number | undefined): string;
    getWeekdayLabel(weekday: number, width?: Intl.DateTimeFormatOptions['weekday']): string;
    getDayAriaLabel(date: NgbDateStruct): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerI18nAmharic, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDatepickerI18nAmharic>;
}

/**
 * A configuration service for the [`NgbDatepicker`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepickers used in the application.
 */
declare class NgbDatepickerConfig {
    dayTemplate: TemplateRef<DayTemplateContext>;
    dayTemplateData: (date: NgbDateStruct, current?: {
        year: number;
        month: number;
    }) => any;
    footerTemplate: TemplateRef<any>;
    displayMonths: number;
    firstDayOfWeek: number;
    markDisabled: (date: NgbDateStruct, current?: {
        year: number;
        month: number;
    }) => boolean;
    minDate: NgbDateStruct;
    maxDate: NgbDateStruct;
    navigation: 'select' | 'arrows' | 'none';
    outsideDays: 'visible' | 'collapsed' | 'hidden';
    showWeekNumbers: boolean;
    startDate: {
        year: number;
        month: number;
        day?: number;
    };
    weekdays: Exclude<Intl.DateTimeFormatOptions['weekday'], undefined> | boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDatepickerConfig>;
}

/**
 * A configuration service for the [`NgbDatepickerInput`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepicker inputs used in the application.
 *
 * @since 5.2.0
 */
declare class NgbInputDatepickerConfig extends NgbDatepickerConfig {
    autoClose: boolean | 'inside' | 'outside';
    container: null | 'body';
    positionTarget: string | HTMLElement;
    placement: PlacementArray;
    popperOptions: (options: Partial<Options>) => Partial<Options>;
    restoreFocus: true | HTMLElement | string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbInputDatepickerConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbInputDatepickerConfig>;
}

/**
 * An abstract service that does the conversion between the internal datepicker `NgbDateStruct` model and
 * any provided user date model `D`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding datepicker to a form control,
 * ex. `[(ngModel)]="userDateModel"`. Here `userDateModel` can be of any type.
 *
 * The default datepicker implementation assumes we use `NgbDateStruct` as a user model.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details
 * and the [custom adapter demo](#/components/datepicker/examples#adapter) for an example.
 */
declare abstract class NgbDateAdapter<D> {
    /**
     * Converts a user-model date of type `D` to an `NgbDateStruct` for internal use.
     */
    abstract fromModel(value: D | null): NgbDateStruct | null;
    /**
     * Converts an internal `NgbDateStruct` date to a user-model date of type `D`.
     */
    abstract toModel(date: NgbDateStruct | null): D | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDateAdapter<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDateAdapter<any>>;
}
declare class NgbDateStructAdapter extends NgbDateAdapter<NgbDateStruct> {
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     */
    fromModel(date: NgbDateStruct | null): NgbDateStruct | null;
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     */
    toModel(date: NgbDateStruct | null): NgbDateStruct | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDateStructAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDateStructAdapter>;
}

/**
 * [`NgbDateAdapter`](#/components/datepicker/api#NgbDateAdapter) implementation that uses
 * native javascript dates as a user date model.
 */
declare class NgbDateNativeAdapter extends NgbDateAdapter<Date> {
    /**
     * Converts a native `Date` to a `NgbDateStruct`.
     */
    fromModel(date: Date | null): NgbDateStruct | null;
    /**
     * Converts a `NgbDateStruct` to a native `Date`.
     */
    toModel(date: NgbDateStruct | null): Date | null;
    protected _fromNativeDate(date: Date): NgbDateStruct;
    protected _toNativeDate(date: NgbDateStruct): Date;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDateNativeAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDateNativeAdapter>;
}

/**
 * Same as [`NgbDateNativeAdapter`](#/components/datepicker/api#NgbDateNativeAdapter), but with UTC dates.
 *
 * @since 3.2.0
 */
declare class NgbDateNativeUTCAdapter extends NgbDateNativeAdapter {
    protected _fromNativeDate(date: Date): NgbDateStruct;
    protected _toNativeDate(date: NgbDateStruct): Date;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDateNativeUTCAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDateNativeUTCAdapter>;
}

/**
 * An abstract service for parsing and formatting dates for the
 * [`NgbInputDatepicker`](#/components/datepicker/api#NgbInputDatepicker) directive.
 * Converts between the internal `NgbDateStruct` model presentation and a `string` that is displayed in the
 * input element.
 *
 * When user types something in the input this service attempts to parse it into a `NgbDateStruct` object.
 * And vice versa, when users selects a date in the calendar with the mouse, it must be displayed as a `string`
 * in the input.
 *
 * Default implementation uses the ISO 8601 format, but you can provide another implementation via DI
 * to use an alternative string format or a custom parsing logic.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
 */
declare abstract class NgbDateParserFormatter {
    /**
     * Parses the given `string` to an `NgbDateStruct`.
     *
     * Implementations should try their best to provide a result, even
     * partial. They must return `null` if the value can't be parsed.
     */
    abstract parse(value: string): NgbDateStruct | null;
    /**
     * Formats the given `NgbDateStruct` to a `string`.
     *
     * Implementations should return an empty string if the given date is `null`,
     * and try their best to provide a partial result if the given date is incomplete or invalid.
     */
    abstract format(date: NgbDateStruct | null): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDateParserFormatter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDateParserFormatter>;
}

/**
 * A service that represents the keyboard navigation.
 *
 * Default keyboard shortcuts [are documented in the overview](#/components/datepicker/overview#keyboard-shortcuts)
 *
 * @since 5.2.0
 */
declare class NgbDatepickerKeyboardService {
    /**
     * Processes a keyboard event.
     */
    processKey(event: KeyboardEvent, datepicker: NgbDatepicker): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerKeyboardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDatepickerKeyboardService>;
}

declare class NgbDatepickerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbDatepickerModule, never, [typeof NgbDatepicker, typeof NgbDatepickerContent, typeof NgbInputDatepicker, typeof NgbDatepickerMonth], [typeof NgbDatepicker, typeof NgbDatepickerContent, typeof NgbInputDatepicker, typeof NgbDatepickerMonth]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbDatepickerModule>;
}

export { NgbCalendar, NgbCalendarBuddhist, NgbCalendarEthiopian, NgbCalendarGregorian, NgbCalendarHebrew, NgbCalendarIslamicCivil, NgbCalendarIslamicUmalqura, NgbCalendarPersian, NgbDate, NgbDateAdapter, NgbDateNativeAdapter, NgbDateNativeUTCAdapter, NgbDateParserFormatter, NgbDateStructAdapter, NgbDatepicker, NgbDatepickerConfig, NgbDatepickerContent, NgbDatepickerI18n, NgbDatepickerI18nAmharic, NgbDatepickerI18nDefault, NgbDatepickerI18nHebrew, NgbDatepickerKeyboardService, NgbDatepickerModule, NgbDatepickerMonth, NgbInputDatepicker, NgbInputDatepickerConfig };
export type { DayTemplateContext, NgbDateStruct, NgbDatepickerNavigateEvent, NgbDatepickerState, NgbPeriod };
