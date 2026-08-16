import * as i0 from '@angular/core';
import { Service, inject, LOCALE_ID, Input, ViewEncapsulation, Component, EventEmitter, ElementRef, ViewChild, Output, TemplateRef, Directive, ChangeDetectionStrategy, Injector, NgZone, DestroyRef, ChangeDetectorRef, afterNextRender, forwardRef, ContentChild, ViewContainerRef, DOCUMENT, afterEveryRender, NgModule } from '@angular/core';
import { Subject, fromEvent, merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { formatDate, NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isInteger, toInteger, isNumber, padNumber, ngbPositioning, ngbFocusTrap, isString, addPopperOffset, ngbAutoClose } from './_ngb-ngbootstrap-utilities.mjs';

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
class NgbDate {
    /**
     * A **static method** that creates a new date object from the `NgbDateStruct`,
     *
     * ex. `NgbDate.from({year: 2000, month: 5, day: 1})`.
     *
     * If the `date` is already of `NgbDate` type, the method will return the same object.
     */
    static from(date) {
        if (date instanceof NgbDate) {
            return date;
        }
        return date ? new NgbDate(date.year, date.month, date.day) : null;
    }
    constructor(year, month, day) {
        this.year = isInteger(year) ? year : null;
        this.month = isInteger(month) ? month : null;
        this.day = isInteger(day) ? day : null;
    }
    /**
     * Checks if the current date is equal to another date.
     */
    equals(other) {
        return other != null && this.year === other.year && this.month === other.month && this.day === other.day;
    }
    /**
     * Checks if the current date is before another date.
     */
    before(other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day < other.day;
            }
            else {
                return this.month < other.month;
            }
        }
        else {
            return this.year < other.year;
        }
    }
    /**
     * Checks if the current date is after another date.
     */
    after(other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day > other.day;
            }
            else {
                return this.month > other.month;
            }
        }
        else {
            return this.year > other.year;
        }
    }
}

function fromJSDate(jsDate) {
    return new NgbDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
}
function toJSDate(date) {
    const jsDate = new Date(date.year, date.month - 1, date.day, 12);
    // this is done avoid 30 -> 1930 conversion
    if (!isNaN(jsDate.getTime())) {
        jsDate.setFullYear(date.year);
    }
    return jsDate;
}
function NGB_DATEPICKER_CALENDAR_FACTORY() {
    return new NgbCalendarGregorian();
}
/**
 * A service that represents the calendar used by the datepicker.
 *
 * The default implementation uses the Gregorian calendar. You can inject it in your own
 * implementations if necessary to simplify `NgbDate` calculations.
 */
class NgbCalendar {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendar, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendar, factory: NGB_DATEPICKER_CALENDAR_FACTORY }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendar, decorators: [{
            type: Service,
            args: [{ factory: NGB_DATEPICKER_CALENDAR_FACTORY }]
        }] });
class NgbCalendarGregorian extends NgbCalendar {
    getDaysPerWeek() {
        return 7;
    }
    getMonths() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }
    getWeeksPerMonth() {
        return 6;
    }
    getNext(date, period = 'd', number = 1) {
        let jsDate = toJSDate(date);
        let checkMonth = true;
        let expectedMonth = jsDate.getMonth();
        switch (period) {
            case 'y':
                jsDate.setFullYear(jsDate.getFullYear() + number);
                break;
            case 'm':
                expectedMonth += number;
                jsDate.setMonth(expectedMonth);
                expectedMonth = expectedMonth % 12;
                if (expectedMonth < 0) {
                    expectedMonth = expectedMonth + 12;
                }
                break;
            case 'd':
                jsDate.setDate(jsDate.getDate() + number);
                checkMonth = false;
                break;
            default:
                return date;
        }
        if (checkMonth && jsDate.getMonth() !== expectedMonth) {
            // this means the destination month has less days than the initial month
            // let's go back to the end of the previous month:
            jsDate.setDate(0);
        }
        return fromJSDate(jsDate);
    }
    getPrev(date, period = 'd', number = 1) {
        return this.getNext(date, period, -number);
    }
    getWeekday(date) {
        let jsDate = toJSDate(date);
        let day = jsDate.getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        let date = week[thursdayIndex];
        const jsDate = toJSDate(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        const time = jsDate.getTime();
        jsDate.setMonth(0); // Compare with Jan 1
        jsDate.setDate(1);
        return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
    }
    getToday() {
        return fromJSDate(new Date());
    }
    isValid(date) {
        if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
            return false;
        }
        // year 0 doesn't exist in Gregorian calendar
        if (date.year === 0) {
            return false;
        }
        const jsDate = toJSDate(date);
        return (!isNaN(jsDate.getTime()) &&
            jsDate.getFullYear() === date.year &&
            jsDate.getMonth() + 1 === date.month &&
            jsDate.getDate() === date.day);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarGregorian, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarGregorian, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarGregorian, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

function isChangedDate(prev, next) {
    return !dateComparator(prev, next);
}
function isChangedMonth(prev, next) {
    return !prev && !next ? false : !prev || !next ? true : prev.year !== next.year || prev.month !== next.month;
}
function dateComparator(prev, next) {
    return (!prev && !next) || (!!prev && !!next && prev.equals(next));
}
function checkMinBeforeMax(minDate, maxDate) {
    if (maxDate && minDate && maxDate.before(minDate)) {
        throw new Error(`'maxDate' ${maxDate} should be greater than 'minDate' ${minDate}`);
    }
}
function checkDateInRange(date, minDate, maxDate) {
    if (date && minDate && date.before(minDate)) {
        return minDate;
    }
    if (date && maxDate && date.after(maxDate)) {
        return maxDate;
    }
    return date || null;
}
function isDateSelectable(date, state) {
    const { minDate, maxDate, disabled, markDisabled } = state;
    return !(date === null ||
        date === undefined ||
        disabled ||
        (markDisabled && markDisabled(date, { year: date.year, month: date.month })) ||
        (minDate && date.before(minDate)) ||
        (maxDate && date.after(maxDate)));
}
function generateSelectBoxMonths(calendar, date, minDate, maxDate) {
    if (!date) {
        return [];
    }
    let months = calendar.getMonths(date.year);
    if (minDate && date.year === minDate.year) {
        const index = months.findIndex((month) => month === minDate.month);
        months = months.slice(index);
    }
    if (maxDate && date.year === maxDate.year) {
        const index = months.findIndex((month) => month === maxDate.month);
        months = months.slice(0, index + 1);
    }
    return months;
}
function generateSelectBoxYears(date, minDate, maxDate) {
    if (!date) {
        return [];
    }
    const start = minDate ? Math.max(minDate.year, date.year - 500) : date.year - 10;
    const end = maxDate ? Math.min(maxDate.year, date.year + 500) : date.year + 10;
    const length = end - start + 1;
    const numbers = Array(length);
    for (let i = 0; i < length; i++) {
        numbers[i] = start + i;
    }
    return numbers;
}
function nextMonthDisabled(calendar, date, maxDate) {
    const nextDate = Object.assign(calendar.getNext(date, 'm'), { day: 1 });
    return maxDate != null && nextDate.after(maxDate);
}
function prevMonthDisabled(calendar, date, minDate) {
    const prevDate = Object.assign(calendar.getPrev(date, 'm'), { day: 1 });
    return (minDate != null &&
        ((prevDate.year === minDate.year && prevDate.month < minDate.month) ||
            (prevDate.year < minDate.year && minDate.month === 1)));
}
function buildMonths(calendar, date, state, i18n, force) {
    const { displayMonths, months } = state;
    // move old months to a temporary array
    const monthsToReuse = months.splice(0, months.length);
    // generate new first dates, nullify or reuse months
    const firstDates = Array.from({ length: displayMonths }, (_, i) => {
        const firstDate = Object.assign(calendar.getNext(date, 'm', i), { day: 1 });
        months[i] = null;
        if (!force) {
            const reusedIndex = monthsToReuse.findIndex((month) => month.firstDate.equals(firstDate));
            // move reused month back to months
            if (reusedIndex !== -1) {
                months[i] = monthsToReuse.splice(reusedIndex, 1)[0];
            }
        }
        return firstDate;
    });
    // rebuild nullified months
    firstDates.forEach((firstDate, i) => {
        if (months[i] === null) {
            months[i] = buildMonth(calendar, firstDate, state, i18n, monthsToReuse.shift() || {});
        }
    });
    return months;
}
function buildMonth(calendar, date, state, i18n, month = {}) {
    const { dayTemplateData, minDate, maxDate, firstDayOfWeek, markDisabled, outsideDays, weekdayWidth, weekdaysVisible, } = state;
    const calendarToday = calendar.getToday();
    month.firstDate = null;
    month.lastDate = null;
    month.number = date.month;
    month.year = date.year;
    month.weeks = month.weeks || [];
    month.weekdays = month.weekdays || [];
    date = getFirstViewDate(calendar, date, firstDayOfWeek);
    // clearing weekdays, if not visible
    if (!weekdaysVisible) {
        month.weekdays.length = 0;
    }
    // month has weeks
    for (let week = 0; week < calendar.getWeeksPerMonth(); week++) {
        let weekObject = month.weeks[week];
        if (!weekObject) {
            weekObject = month.weeks[week] = { number: 0, days: [], collapsed: true };
        }
        const days = weekObject.days;
        // week has days
        for (let day = 0; day < calendar.getDaysPerWeek(); day++) {
            if (week === 0 && weekdaysVisible) {
                month.weekdays[day] = i18n.getWeekdayLabel(calendar.getWeekday(date), weekdayWidth);
            }
            const newDate = new NgbDate(date.year, date.month, date.day);
            const nextDate = calendar.getNext(newDate);
            const ariaLabel = i18n.getDayAriaLabel(newDate);
            // marking date as disabled
            let disabled = !!((minDate && newDate.before(minDate)) || (maxDate && newDate.after(maxDate)));
            if (!disabled && markDisabled) {
                disabled = markDisabled(newDate, { month: month.number, year: month.year });
            }
            // today
            let today = newDate.equals(calendarToday);
            // adding user-provided data to the context
            let contextUserData = dayTemplateData
                ? dayTemplateData(newDate, { month: month.number, year: month.year })
                : undefined;
            // saving first date of the month
            if (month.firstDate === null && newDate.month === month.number) {
                month.firstDate = newDate;
            }
            // saving last date of the month
            if (newDate.month === month.number && nextDate.month !== month.number) {
                month.lastDate = newDate;
            }
            let dayObject = days[day];
            if (!dayObject) {
                dayObject = days[day] = {};
            }
            dayObject.date = newDate;
            dayObject.context = Object.assign(dayObject.context || {}, {
                $implicit: newDate,
                date: newDate,
                data: contextUserData,
                currentMonth: month.number,
                currentYear: month.year,
                disabled,
                focused: false,
                selected: false,
                today,
            });
            dayObject.tabindex = -1;
            dayObject.ariaLabel = ariaLabel;
            dayObject.hidden = false;
            date = nextDate;
        }
        weekObject.number = calendar.getWeekNumber(days.map((day) => day.date), firstDayOfWeek);
        // marking week as collapsed
        weekObject.collapsed =
            outsideDays === 'collapsed' &&
                days[0].date.month !== month.number &&
                days[days.length - 1].date.month !== month.number;
    }
    return month;
}
function getFirstViewDate(calendar, date, firstDayOfWeek) {
    const daysPerWeek = calendar.getDaysPerWeek();
    const firstMonthDate = new NgbDate(date.year, date.month, 1);
    const dayOfWeek = calendar.getWeekday(firstMonthDate) % daysPerWeek;
    return calendar.getPrev(firstMonthDate, 'd', (daysPerWeek + dayOfWeek - firstDayOfWeek) % daysPerWeek);
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
class NgbDatepickerI18n {
    /**
     * Returns the text label to display above the day view.
     *
     * @since 9.1.0
     */
    getMonthLabel(date) {
        return `${this.getMonthFullName(date.month, date.year)} ${this.getYearNumerals(date.year)}`;
    }
    /**
     * Returns the textual representation of a day that is rendered in a day cell.
     *
     * @since 3.0.0
     */
    getDayNumerals(date) {
        return `${date.day}`;
    }
    /**
     * Returns the textual representation of a week number rendered by datepicker.
     *
     * @since 3.0.0
     */
    getWeekNumerals(weekNumber) {
        return `${weekNumber}`;
    }
    /**
     * Returns the textual representation of a year that is rendered in the datepicker year select box.
     *
     * @since 3.0.0
     */
    getYearNumerals(year) {
        return `${year}`;
    }
    /**
     * Returns the week label to display in the heading of the month view.
     *
     * @since 9.1.0
     */
    getWeekLabel() {
        return '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerI18n, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerI18n, factory: () => new NgbDatepickerI18nDefault() }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerI18n, decorators: [{
            type: Service,
            args: [{
                    factory: () => new NgbDatepickerI18nDefault(),
                }]
        }] });
/**
 * A service providing default implementation for the datepicker i18n.
 * It can be used as a base implementation if necessary.
 *
 * @since 9.1.0
 */
class NgbDatepickerI18nDefault extends NgbDatepickerI18n {
    constructor() {
        super(...arguments);
        this._locale = inject(LOCALE_ID);
        this._monthsShort = [...Array(12).keys()].map((month) => Intl.DateTimeFormat(this._locale, { month: 'short', timeZone: 'UTC' }).format(Date.UTC(2000, month)));
        this._monthsFull = [...Array(12).keys()].map((month) => Intl.DateTimeFormat(this._locale, { month: 'long', timeZone: 'UTC' }).format(Date.UTC(2000, month)));
    }
    getWeekdayLabel(weekday, width = 'narrow') {
        // 1 MAY 2000 is a Monday
        const weekdays = [1, 2, 3, 4, 5, 6, 7].map((day) => Intl.DateTimeFormat(this._locale, { weekday: width, timeZone: 'UTC' }).format(Date.UTC(2000, 4, day)));
        // `weekday` is 1 (Mon) to 7 (Sun)
        return weekdays[weekday - 1] || '';
    }
    getMonthShortName(month) {
        return this._monthsShort[month - 1] || '';
    }
    getMonthFullName(month) {
        return this._monthsFull[month - 1] || '';
    }
    getDayAriaLabel(date) {
        const jsDate = new Date(date.year, date.month - 1, date.day);
        return formatDate(jsDate, 'fullDate', this._locale);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerI18nDefault, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerI18nDefault, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerI18nDefault, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

class NgbDatepickerService {
    constructor() {
        this._VALIDATORS = {
            dayTemplateData: (dayTemplateData) => {
                if (this._state.dayTemplateData !== dayTemplateData) {
                    return { dayTemplateData };
                }
            },
            displayMonths: (displayMonths) => {
                displayMonths = toInteger(displayMonths);
                if (isInteger(displayMonths) && displayMonths > 0 && this._state.displayMonths !== displayMonths) {
                    return { displayMonths };
                }
            },
            disabled: (disabled) => {
                if (this._state.disabled !== disabled) {
                    return { disabled };
                }
            },
            firstDayOfWeek: (firstDayOfWeek) => {
                firstDayOfWeek = toInteger(firstDayOfWeek);
                if (isInteger(firstDayOfWeek) && firstDayOfWeek >= 0 && this._state.firstDayOfWeek !== firstDayOfWeek) {
                    return { firstDayOfWeek };
                }
            },
            focusVisible: (focusVisible) => {
                if (this._state.focusVisible !== focusVisible && !this._state.disabled) {
                    return { focusVisible };
                }
            },
            markDisabled: (markDisabled) => {
                if (this._state.markDisabled !== markDisabled) {
                    return { markDisabled };
                }
            },
            maxDate: (date) => {
                const maxDate = this.toValidDate(date, null);
                if (isChangedDate(this._state.maxDate, maxDate)) {
                    return { maxDate };
                }
            },
            minDate: (date) => {
                const minDate = this.toValidDate(date, null);
                if (isChangedDate(this._state.minDate, minDate)) {
                    return { minDate };
                }
            },
            navigation: (navigation) => {
                if (this._state.navigation !== navigation) {
                    return { navigation };
                }
            },
            outsideDays: (outsideDays) => {
                if (this._state.outsideDays !== outsideDays) {
                    return { outsideDays };
                }
            },
            weekdays: (weekdays) => {
                const weekdayWidth = weekdays === true || weekdays === false ? 'narrow' : weekdays;
                const weekdaysVisible = weekdays === true || weekdays === false ? weekdays : true;
                if (this._state.weekdayWidth !== weekdayWidth || this._state.weekdaysVisible !== weekdaysVisible) {
                    return { weekdayWidth, weekdaysVisible };
                }
            },
        };
        this._calendar = inject(NgbCalendar);
        this._i18n = inject(NgbDatepickerI18n);
        this._model$ = new Subject();
        this._dateSelect$ = new Subject();
        this._state = {
            dayTemplateData: null,
            markDisabled: null,
            maxDate: null,
            minDate: null,
            disabled: false,
            displayMonths: 1,
            firstDate: null,
            firstDayOfWeek: 1,
            lastDate: null,
            focusDate: null,
            focusVisible: false,
            months: [],
            navigation: 'select',
            outsideDays: 'visible',
            prevDisabled: false,
            nextDisabled: false,
            selectedDate: null,
            selectBoxes: { years: [], months: [] },
            weekdayWidth: 'narrow',
            weekdaysVisible: true,
        };
    }
    get model$() {
        return this._model$.pipe(filter((model) => model.months.length > 0));
    }
    get dateSelect$() {
        return this._dateSelect$.pipe(filter((date) => date !== null));
    }
    set(options) {
        let patch = Object.keys(options)
            .map((key) => this._VALIDATORS[key](options[key]))
            .reduce((obj, part) => ({ ...obj, ...part }), {});
        if (Object.keys(patch).length > 0) {
            this._nextState(patch);
        }
    }
    focus(date) {
        const focusedDate = this.toValidDate(date, null);
        if (focusedDate != null && !this._state.disabled && isChangedDate(this._state.focusDate, focusedDate)) {
            this._nextState({ focusDate: date });
        }
    }
    focusSelect() {
        if (isDateSelectable(this._state.focusDate, this._state)) {
            this.select(this._state.focusDate, { emitEvent: true });
        }
    }
    open(date) {
        const firstDate = this.toValidDate(date, this._calendar.getToday());
        if (firstDate != null &&
            !this._state.disabled &&
            (!this._state.firstDate || isChangedMonth(this._state.firstDate, firstDate))) {
            this._nextState({ firstDate });
        }
    }
    select(date, options = {}) {
        const selectedDate = this.toValidDate(date, null);
        if (selectedDate != null && !this._state.disabled) {
            if (isChangedDate(this._state.selectedDate, selectedDate)) {
                this._nextState({ selectedDate });
            }
            if (options.emitEvent && isDateSelectable(selectedDate, this._state)) {
                this._dateSelect$.next(selectedDate);
            }
        }
    }
    toValidDate(date, defaultValue) {
        const ngbDate = NgbDate.from(date);
        if (defaultValue === undefined) {
            defaultValue = this._calendar.getToday();
        }
        return this._calendar.isValid(ngbDate) ? ngbDate : defaultValue;
    }
    getMonth(struct) {
        for (let month of this._state.months) {
            if (struct.month === month.number && struct.year === month.year) {
                return month;
            }
        }
        throw new Error(`month ${struct.month} of year ${struct.year} not found`);
    }
    _nextState(patch) {
        const newState = this._updateState(patch);
        this._patchContexts(newState);
        this._state = newState;
        this._model$.next(this._state);
    }
    _patchContexts(state) {
        const { months, displayMonths, selectedDate, focusDate, focusVisible, disabled, outsideDays } = state;
        state.months.forEach((month) => {
            month.weeks.forEach((week) => {
                week.days.forEach((day) => {
                    // patch focus flag
                    if (focusDate) {
                        day.context.focused = focusDate.equals(day.date) && focusVisible;
                    }
                    // calculating tabindex
                    day.tabindex =
                        !disabled && focusDate && day.date.equals(focusDate) && focusDate.month === month.number ? 0 : -1;
                    // override context disabled
                    if (disabled === true) {
                        day.context.disabled = true;
                    }
                    // patch selection flag
                    if (selectedDate !== undefined) {
                        day.context.selected = selectedDate !== null && selectedDate.equals(day.date);
                    }
                    // visibility
                    if (month.number !== day.date.month) {
                        day.hidden =
                            outsideDays === 'hidden' ||
                                outsideDays === 'collapsed' ||
                                (displayMonths > 1 &&
                                    day.date.after(months[0].firstDate) &&
                                    day.date.before(months[displayMonths - 1].lastDate));
                    }
                });
            });
        });
    }
    _updateState(patch) {
        // patching fields
        const state = Object.assign({}, this._state, patch);
        let startDate = state.firstDate;
        // min/max dates changed
        if ('minDate' in patch || 'maxDate' in patch) {
            checkMinBeforeMax(state.minDate, state.maxDate);
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
        }
        // disabled
        if ('disabled' in patch) {
            state.focusVisible = false;
        }
        // initial rebuild via 'select()'
        if ('selectedDate' in patch && this._state.months.length === 0) {
            startDate = state.selectedDate;
        }
        // terminate early if only focus visibility was changed
        if ('focusVisible' in patch) {
            return state;
        }
        // focus date changed
        if ('focusDate' in patch) {
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
            // nothing to rebuild if only focus changed and it is still visible
            if (state.months.length !== 0 &&
                state.focusDate &&
                !state.focusDate.before(state.firstDate) &&
                !state.focusDate.after(state.lastDate)) {
                return state;
            }
        }
        // first date changed
        if ('firstDate' in patch) {
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.firstDate;
        }
        // rebuilding months
        if (startDate) {
            const forceRebuild = 'dayTemplateData' in patch ||
                'firstDayOfWeek' in patch ||
                'markDisabled' in patch ||
                'minDate' in patch ||
                'maxDate' in patch ||
                'disabled' in patch ||
                'outsideDays' in patch ||
                'weekdaysVisible' in patch;
            const months = buildMonths(this._calendar, startDate, state, this._i18n, forceRebuild);
            // updating months and boundary dates
            state.months = months;
            state.firstDate = months[0].firstDate;
            state.lastDate = months[months.length - 1].lastDate;
            // reset selected date if 'markDisabled' returns true
            if ('selectedDate' in patch && !isDateSelectable(state.selectedDate, state)) {
                state.selectedDate = null;
            }
            // adjusting focus after months were built
            if ('firstDate' in patch) {
                if (!state.focusDate || state.focusDate.before(state.firstDate) || state.focusDate.after(state.lastDate)) {
                    state.focusDate = startDate;
                }
            }
            // adjusting months/years for the select box navigation
            const yearChanged = !this._state.firstDate || this._state.firstDate.year !== state.firstDate.year;
            const monthChanged = !this._state.firstDate || this._state.firstDate.month !== state.firstDate.month;
            if (state.navigation === 'select') {
                // years ->  boundaries (min/max were changed)
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.years.length === 0 || yearChanged) {
                    state.selectBoxes.years = generateSelectBoxYears(state.firstDate, state.minDate, state.maxDate);
                }
                // months -> when current year or boundaries change
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.months.length === 0 || yearChanged) {
                    state.selectBoxes.months = generateSelectBoxMonths(this._calendar, state.firstDate, state.minDate, state.maxDate);
                }
            }
            else {
                state.selectBoxes = { years: [], months: [] };
            }
            // updating navigation arrows -> boundaries change (min/max) or month/year changes
            if ((state.navigation === 'arrows' || state.navigation === 'select') &&
                (monthChanged || yearChanged || 'minDate' in patch || 'maxDate' in patch || 'disabled' in patch)) {
                state.prevDisabled = state.disabled || prevMonthDisabled(this._calendar, state.firstDate, state.minDate);
                state.nextDisabled = state.disabled || nextMonthDisabled(this._calendar, state.lastDate, state.maxDate);
            }
        }
        return state;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerService, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerService, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerService, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

var NavigationEvent;
(function (NavigationEvent) {
    NavigationEvent[NavigationEvent["PREV"] = 0] = "PREV";
    NavigationEvent[NavigationEvent["NEXT"] = 1] = "NEXT";
})(NavigationEvent || (NavigationEvent = {}));

/**
 * A configuration service for the [`NgbDatepicker`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepickers used in the application.
 */
class NgbDatepickerConfig {
    constructor() {
        this.displayMonths = 1;
        this.firstDayOfWeek = 1;
        this.navigation = 'select';
        this.outsideDays = 'visible';
        this.showWeekNumbers = false;
        this.weekdays = 'narrow';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerConfig, decorators: [{
            type: Service
        }] });

function NGB_DATEPICKER_DATE_ADAPTER_FACTORY() {
    return new NgbDateStructAdapter();
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
class NgbDateAdapter {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDateAdapter, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbDateAdapter, factory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDateAdapter, decorators: [{
            type: Service,
            args: [{ factory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY }]
        }] });
class NgbDateStructAdapter extends NgbDateAdapter {
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     */
    fromModel(date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)
            ? { year: date.year, month: date.month, day: date.day }
            : null;
    }
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     */
    toModel(date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)
            ? { year: date.year, month: date.month, day: date.day }
            : null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDateStructAdapter, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbDateStructAdapter, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDateStructAdapter, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

/**
 * A service that represents the keyboard navigation.
 *
 * Default keyboard shortcuts [are documented in the overview](#/components/datepicker/overview#keyboard-shortcuts)
 *
 * @since 5.2.0
 */
class NgbDatepickerKeyboardService {
    /**
     * Processes a keyboard event.
     */
    processKey(event, datepicker) {
        const { state, calendar } = datepicker;
        switch (event.key) {
            case 'PageUp':
                datepicker.focusDate(calendar.getPrev(state.focusedDate, event.shiftKey ? 'y' : 'm', 1));
                break;
            case 'PageDown':
                datepicker.focusDate(calendar.getNext(state.focusedDate, event.shiftKey ? 'y' : 'm', 1));
                break;
            case 'End':
                datepicker.focusDate(event.shiftKey ? state.maxDate : state.lastDate);
                break;
            case 'Home':
                datepicker.focusDate(event.shiftKey ? state.minDate : state.firstDate);
                break;
            case 'ArrowLeft':
                datepicker.focusDate(calendar.getPrev(state.focusedDate, 'd', 1));
                break;
            case 'ArrowUp':
                datepicker.focusDate(calendar.getPrev(state.focusedDate, 'd', calendar.getDaysPerWeek()));
                break;
            case 'ArrowRight':
                datepicker.focusDate(calendar.getNext(state.focusedDate, 'd', 1));
                break;
            case 'ArrowDown':
                datepicker.focusDate(calendar.getNext(state.focusedDate, 'd', calendar.getDaysPerWeek()));
                break;
            case 'Enter':
            case ' ':
                datepicker.focusSelect();
                break;
            default:
                return;
        }
        event.preventDefault();
        event.stopPropagation();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerKeyboardService, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerKeyboardService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerKeyboardService, decorators: [{
            type: Service
        }] });

class NgbDatepickerDayView {
    constructor() {
        this.i18n = inject(NgbDatepickerI18n);
    }
    isMuted() {
        return !this.selected && (this.date.month !== this.currentMonth || this.disabled);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerDayView, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.1", type: NgbDatepickerDayView, isStandalone: true, selector: "[ngbDatepickerDayView]", inputs: { currentMonth: "currentMonth", date: "date", disabled: "disabled", focused: "focused", selected: "selected" }, host: { properties: { "class.bg-primary": "selected", "class.text-white": "selected", "class.text-muted": "isMuted()", "class.outside": "isMuted()", "class.active": "focused" }, classAttribute: "btn-light" }, ngImport: i0, template: `{{ i18n.getDayNumerals(date) }}`, isInline: true, styles: ["[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:transparent}[ngbDatepickerDayView]:hover:not(.bg-primary),[ngbDatepickerDayView].active:not(.bg-primary){background-color:var(--bs-tertiary-bg);outline:1px solid var(--bs-border-color)}[ngbDatepickerDayView].outside{opacity:.5}\n"], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerDayView, decorators: [{
            type: Component,
            args: [{ selector: '[ngbDatepickerDayView]', encapsulation: ViewEncapsulation.None, host: {
                        class: 'btn-light',
                        '[class.bg-primary]': 'selected',
                        '[class.text-white]': 'selected',
                        '[class.text-muted]': 'isMuted()',
                        '[class.outside]': 'isMuted()',
                        '[class.active]': 'focused',
                    }, template: `{{ i18n.getDayNumerals(date) }}`, styles: ["[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:transparent}[ngbDatepickerDayView]:hover:not(.bg-primary),[ngbDatepickerDayView].active:not(.bg-primary){background-color:var(--bs-tertiary-bg);outline:1px solid var(--bs-border-color)}[ngbDatepickerDayView].outside{opacity:.5}\n"] }]
        }], propDecorators: { currentMonth: [{
                type: Input
            }], date: [{
                type: Input
            }], disabled: [{
                type: Input
            }], focused: [{
                type: Input
            }], selected: [{
                type: Input
            }] } });

class NgbDatepickerNavigationSelect {
    constructor() {
        this._month = -1;
        this._year = -1;
        this.i18n = inject(NgbDatepickerI18n);
        this.select = new EventEmitter();
    }
    changeMonth(month) {
        this.select.emit(new NgbDate(this.date.year, toInteger(month), 1));
    }
    changeYear(year) {
        this.select.emit(new NgbDate(toInteger(year), this.date.month, 1));
    }
    ngAfterViewChecked() {
        if (this.date) {
            if (this.date.month !== this._month) {
                this._month = this.date.month;
                this.monthSelect.nativeElement.value = `${this._month}`;
            }
            if (this.date.year !== this._year) {
                this._year = this.date.year;
                this.yearSelect.nativeElement.value = `${this._year}`;
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerNavigationSelect, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.1", type: NgbDatepickerNavigationSelect, isStandalone: true, selector: "ngb-datepicker-navigation-select", inputs: { date: "date", disabled: "disabled", months: "months", years: "years" }, outputs: { select: "select" }, viewQueries: [{ propertyName: "monthSelect", first: true, predicate: ["month"], descendants: true, read: ElementRef, static: true }, { propertyName: "yearSelect", first: true, predicate: ["year"], descendants: true, read: ElementRef, static: true }], ngImport: i0, template: `
		<select
			#month
			[disabled]="disabled"
			class="form-select"
			i18n-aria-label="@@ngb.datepicker.select-month"
			aria-label="Select month"
			i18n-title="@@ngb.datepicker.select-month"
			title="Select month"
			(change)="changeMonth($any($event).target.value)"
		>
			@for (m of months; track m) {
				<option [attr.aria-label]="i18n.getMonthFullName(m, date.year)" [value]="m">{{
					i18n.getMonthShortName(m, date.year)
				}}</option>
			}</select
		><select
			#year
			[disabled]="disabled"
			class="form-select"
			i18n-aria-label="@@ngb.datepicker.select-year"
			aria-label="Select year"
			i18n-title="@@ngb.datepicker.select-year"
			title="Select year"
			(change)="changeYear($any($event).target.value)"
		>
			@for (y of years; track y) {
				<option [value]="y">{{ i18n.getYearNumerals(y) }}</option>
			}
		</select>
	`, isInline: true, styles: ["ngb-datepicker-navigation-select>.form-select{flex:1 1 auto;padding:0 .5rem;font-size:.875rem;height:1.85rem}ngb-datepicker-navigation-select>.form-select:focus{z-index:1}ngb-datepicker-navigation-select>.form-select::-ms-value{background-color:transparent!important}\n"], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerNavigationSelect, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-datepicker-navigation-select', encapsulation: ViewEncapsulation.None, template: `
		<select
			#month
			[disabled]="disabled"
			class="form-select"
			i18n-aria-label="@@ngb.datepicker.select-month"
			aria-label="Select month"
			i18n-title="@@ngb.datepicker.select-month"
			title="Select month"
			(change)="changeMonth($any($event).target.value)"
		>
			@for (m of months; track m) {
				<option [attr.aria-label]="i18n.getMonthFullName(m, date.year)" [value]="m">{{
					i18n.getMonthShortName(m, date.year)
				}}</option>
			}</select
		><select
			#year
			[disabled]="disabled"
			class="form-select"
			i18n-aria-label="@@ngb.datepicker.select-year"
			aria-label="Select year"
			i18n-title="@@ngb.datepicker.select-year"
			title="Select year"
			(change)="changeYear($any($event).target.value)"
		>
			@for (y of years; track y) {
				<option [value]="y">{{ i18n.getYearNumerals(y) }}</option>
			}
		</select>
	`, styles: ["ngb-datepicker-navigation-select>.form-select{flex:1 1 auto;padding:0 .5rem;font-size:.875rem;height:1.85rem}ngb-datepicker-navigation-select>.form-select:focus{z-index:1}ngb-datepicker-navigation-select>.form-select::-ms-value{background-color:transparent!important}\n"] }]
        }], propDecorators: { date: [{
                type: Input
            }], disabled: [{
                type: Input
            }], months: [{
                type: Input
            }], years: [{
                type: Input
            }], select: [{
                type: Output
            }], monthSelect: [{
                type: ViewChild,
                args: ['month', { static: true, read: ElementRef }]
            }], yearSelect: [{
                type: ViewChild,
                args: ['year', { static: true, read: ElementRef }]
            }] } });

class NgbDatepickerNavigation {
    constructor() {
        this.navigation = NavigationEvent;
        this.i18n = inject(NgbDatepickerI18n);
        this.months = [];
        this.navigate = new EventEmitter();
        this.select = new EventEmitter();
    }
    onClickPrev(event) {
        event.currentTarget.focus();
        this.navigate.emit(this.navigation.PREV);
    }
    onClickNext(event) {
        event.currentTarget.focus();
        this.navigate.emit(this.navigation.NEXT);
    }
    idMonth(month) {
        return month;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerNavigation, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.1", type: NgbDatepickerNavigation, isStandalone: true, selector: "ngb-datepicker-navigation", inputs: { date: "date", disabled: "disabled", months: "months", showSelect: "showSelect", prevDisabled: "prevDisabled", nextDisabled: "nextDisabled", selectBoxes: "selectBoxes" }, outputs: { navigate: "navigate", select: "select" }, ngImport: i0, template: `
		<div class="ngb-dp-arrow ngb-dp-arrow-prev">
			<button
				type="button"
				class="btn btn-link ngb-dp-arrow-btn"
				(click)="onClickPrev($event)"
				[disabled]="prevDisabled"
				i18n-aria-label="@@ngb.datepicker.previous-month"
				aria-label="Previous month"
				i18n-title="@@ngb.datepicker.previous-month"
				title="Previous month"
			>
				<span class="ngb-dp-navigation-chevron"></span>
			</button>
		</div>
		@if (showSelect) {
			<ngb-datepicker-navigation-select
				class="ngb-dp-navigation-select"
				[date]="date"
				[disabled]="disabled"
				[months]="selectBoxes.months"
				[years]="selectBoxes.years"
				(select)="select.emit($event)"
			/>
		}

		@if (!showSelect) {
			@for (month of months; track idMonth(month); let i = $index) {
				@if (i > 0) {
					<div class="ngb-dp-arrow"></div>
				}
				<div class="ngb-dp-month-name">
					{{ i18n.getMonthLabel(month.firstDate) }}
				</div>
				@if (i !== months.length - 1) {
					<div class="ngb-dp-arrow"></div>
				}
			}
		}
		<div class="visually-hidden" aria-live="polite">
			@for (month of months; track idMonth(month)) {
				<span>{{ i18n.getMonthLabel(month.firstDate) }}</span>
			}
		</div>

		<div class="ngb-dp-arrow ngb-dp-arrow-next">
			<button
				type="button"
				class="btn btn-link ngb-dp-arrow-btn"
				(click)="onClickNext($event)"
				[disabled]="nextDisabled"
				i18n-aria-label="@@ngb.datepicker.next-month"
				aria-label="Next month"
				i18n-title="@@ngb.datepicker.next-month"
				title="Next month"
			>
				<span class="ngb-dp-navigation-chevron"></span>
			</button>
		</div>
	`, isInline: true, styles: ["ngb-datepicker-navigation{display:flex;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;transform:rotate(-135deg)}.ngb-dp-arrow{display:flex;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow-next{justify-content:flex-end}.ngb-dp-arrow-next .ngb-dp-navigation-chevron{transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:flex;flex:1 1 9rem}\n"], dependencies: [{ kind: "component", type: NgbDatepickerNavigationSelect, selector: "ngb-datepicker-navigation-select", inputs: ["date", "disabled", "months", "years"], outputs: ["select"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerNavigation, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-datepicker-navigation', imports: [NgbDatepickerNavigationSelect], encapsulation: ViewEncapsulation.None, template: `
		<div class="ngb-dp-arrow ngb-dp-arrow-prev">
			<button
				type="button"
				class="btn btn-link ngb-dp-arrow-btn"
				(click)="onClickPrev($event)"
				[disabled]="prevDisabled"
				i18n-aria-label="@@ngb.datepicker.previous-month"
				aria-label="Previous month"
				i18n-title="@@ngb.datepicker.previous-month"
				title="Previous month"
			>
				<span class="ngb-dp-navigation-chevron"></span>
			</button>
		</div>
		@if (showSelect) {
			<ngb-datepicker-navigation-select
				class="ngb-dp-navigation-select"
				[date]="date"
				[disabled]="disabled"
				[months]="selectBoxes.months"
				[years]="selectBoxes.years"
				(select)="select.emit($event)"
			/>
		}

		@if (!showSelect) {
			@for (month of months; track idMonth(month); let i = $index) {
				@if (i > 0) {
					<div class="ngb-dp-arrow"></div>
				}
				<div class="ngb-dp-month-name">
					{{ i18n.getMonthLabel(month.firstDate) }}
				</div>
				@if (i !== months.length - 1) {
					<div class="ngb-dp-arrow"></div>
				}
			}
		}
		<div class="visually-hidden" aria-live="polite">
			@for (month of months; track idMonth(month)) {
				<span>{{ i18n.getMonthLabel(month.firstDate) }}</span>
			}
		</div>

		<div class="ngb-dp-arrow ngb-dp-arrow-next">
			<button
				type="button"
				class="btn btn-link ngb-dp-arrow-btn"
				(click)="onClickNext($event)"
				[disabled]="nextDisabled"
				i18n-aria-label="@@ngb.datepicker.next-month"
				aria-label="Next month"
				i18n-title="@@ngb.datepicker.next-month"
				title="Next month"
			>
				<span class="ngb-dp-navigation-chevron"></span>
			</button>
		</div>
	`, styles: ["ngb-datepicker-navigation{display:flex;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;transform:rotate(-135deg)}.ngb-dp-arrow{display:flex;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow-next{justify-content:flex-end}.ngb-dp-arrow-next .ngb-dp-navigation-chevron{transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:flex;flex:1 1 9rem}\n"] }]
        }], propDecorators: { date: [{
                type: Input
            }], disabled: [{
                type: Input
            }], months: [{
                type: Input
            }], showSelect: [{
                type: Input
            }], prevDisabled: [{
                type: Input
            }], nextDisabled: [{
                type: Input
            }], selectBoxes: [{
                type: Input
            }], navigate: [{
                type: Output
            }], select: [{
                type: Output
            }] } });

/**
 * A directive that marks the content template that customizes the way datepicker months are displayed
 *
 * @since 5.3.0
 */
class NgbDatepickerContent {
    constructor() {
        this.templateRef = inject(TemplateRef);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerContent, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbDatepickerContent, isStandalone: true, selector: "ng-template[ngbDatepickerContent]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerContent, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbDatepickerContent]' }]
        }] });
/**
 * A component that renders one month including all the days, weekdays and week numbers. Can be used inside
 * the `<ng-template ngbDatepickerMonths></ng-template>` when you want to customize months layout.
 *
 * For a usage example, see [custom month layout demo](#/components/datepicker/examples#custommonth)
 *
 * @since 5.3.0
 */
class NgbDatepickerMonth {
    constructor() {
        this._keyboardService = inject(NgbDatepickerKeyboardService);
        this._service = inject(NgbDatepickerService);
        this.i18n = inject(NgbDatepickerI18n);
        this.datepicker = inject(NgbDatepicker);
    }
    /**
     * The first date of month to be rendered.
     *
     * This month must one of the months present in the
     * [datepicker state](#/components/datepicker/api#NgbDatepickerState).
     */
    set month(month) {
        this.viewModel = this._service.getMonth(month);
    }
    onKeyDown(event) {
        this._keyboardService.processKey(event, this.datepicker);
    }
    doSelect(day) {
        if (!day.context.disabled && !day.hidden) {
            this.datepicker.onDateSelect(day.date);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerMonth, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.1", type: NgbDatepickerMonth, isStandalone: true, selector: "ngb-datepicker-month", inputs: { month: "month" }, host: { attributes: { "role": "grid" }, listeners: { "keydown": "onKeyDown($event)" } }, ngImport: i0, template: `
		@if (viewModel.weekdays.length > 0) {
			<div class="ngb-dp-week ngb-dp-weekdays" role="row">
				@if (datepicker.showWeekNumbers) {
					<div class="ngb-dp-weekday ngb-dp-showweek small">{{ i18n.getWeekLabel() }}</div>
				}
				@for (weekday of viewModel.weekdays; track $index) {
					<div class="ngb-dp-weekday small" role="columnheader">{{ weekday }}</div>
				}
			</div>
		}
		@for (week of viewModel.weeks; track week) {
			@if (!week.collapsed) {
				<div class="ngb-dp-week" role="row">
					@if (datepicker.showWeekNumbers) {
						<div class="ngb-dp-week-number small text-muted">{{ i18n.getWeekNumerals(week.number) }}</div>
					}
					@for (day of week.days; track day) {
						<div
							(click)="doSelect(day); $event.preventDefault()"
							class="ngb-dp-day"
							role="gridcell"
							[class.disabled]="day.context.disabled"
							[tabindex]="day.tabindex"
							[class.hidden]="day.hidden"
							[class.ngb-dp-today]="day.context.today"
							[attr.aria-label]="day.ariaLabel"
							[attr.aria-disabled]="day.context.disabled"
							[attr.aria-selected]="day.context.selected"
						>
							@if (!day.hidden) {
								<ng-template [ngTemplateOutlet]="datepicker.dayTemplate" [ngTemplateOutletContext]="day.context" />
							}
						</div>
					}
				</div>
			}
		}
	`, isInline: true, styles: ["ngb-datepicker-month{display:block}.ngb-dp-weekday,.ngb-dp-week-number{line-height:2rem;text-align:center;font-style:italic}.ngb-dp-weekday{color:var(--bs-info)}.ngb-dp-week{border-radius:.25rem;display:flex}.ngb-dp-weekdays{border-bottom:1px solid var(--bs-border-color);border-radius:0;background-color:var(--bs-tertiary-bg)}.ngb-dp-day,.ngb-dp-weekday,.ngb-dp-week-number{width:2rem;height:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default;pointer-events:none}.ngb-dp-day[tabindex=\"0\"]{z-index:1}\n"], dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.Eager, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerMonth, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-datepicker-month', imports: [NgTemplateOutlet], host: {
                        role: 'grid',
                        '(keydown)': 'onKeyDown($event)',
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.Eager, template: `
		@if (viewModel.weekdays.length > 0) {
			<div class="ngb-dp-week ngb-dp-weekdays" role="row">
				@if (datepicker.showWeekNumbers) {
					<div class="ngb-dp-weekday ngb-dp-showweek small">{{ i18n.getWeekLabel() }}</div>
				}
				@for (weekday of viewModel.weekdays; track $index) {
					<div class="ngb-dp-weekday small" role="columnheader">{{ weekday }}</div>
				}
			</div>
		}
		@for (week of viewModel.weeks; track week) {
			@if (!week.collapsed) {
				<div class="ngb-dp-week" role="row">
					@if (datepicker.showWeekNumbers) {
						<div class="ngb-dp-week-number small text-muted">{{ i18n.getWeekNumerals(week.number) }}</div>
					}
					@for (day of week.days; track day) {
						<div
							(click)="doSelect(day); $event.preventDefault()"
							class="ngb-dp-day"
							role="gridcell"
							[class.disabled]="day.context.disabled"
							[tabindex]="day.tabindex"
							[class.hidden]="day.hidden"
							[class.ngb-dp-today]="day.context.today"
							[attr.aria-label]="day.ariaLabel"
							[attr.aria-disabled]="day.context.disabled"
							[attr.aria-selected]="day.context.selected"
						>
							@if (!day.hidden) {
								<ng-template [ngTemplateOutlet]="datepicker.dayTemplate" [ngTemplateOutletContext]="day.context" />
							}
						</div>
					}
				</div>
			}
		}
	`, styles: ["ngb-datepicker-month{display:block}.ngb-dp-weekday,.ngb-dp-week-number{line-height:2rem;text-align:center;font-style:italic}.ngb-dp-weekday{color:var(--bs-info)}.ngb-dp-week{border-radius:.25rem;display:flex}.ngb-dp-weekdays{border-bottom:1px solid var(--bs-border-color);border-radius:0;background-color:var(--bs-tertiary-bg)}.ngb-dp-day,.ngb-dp-weekday,.ngb-dp-week-number{width:2rem;height:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default;pointer-events:none}.ngb-dp-day[tabindex=\"0\"]{z-index:1}\n"] }]
        }], propDecorators: { month: [{
                type: Input
            }] } });
/**
 * A highly configurable component that helps you with selecting calendar dates.
 *
 * `NgbDatepicker` is meant to be displayed inline on a page or put inside a popup.
 */
class NgbDatepicker {
    constructor() {
        this.injector = inject(Injector);
        this._service = inject(NgbDatepickerService);
        this._calendar = inject(NgbCalendar);
        this._i18n = inject(NgbDatepickerI18n);
        this._config = inject(NgbDatepickerConfig);
        this._nativeElement = inject(ElementRef).nativeElement;
        this._ngbDateAdapter = inject((NgbDateAdapter));
        this._ngZone = inject(NgZone);
        this._destroyRef = inject(DestroyRef);
        this._injector = inject(Injector);
        this._controlValue = null;
        this._publicState = {};
        this._initialized = false;
        /**
         * The reference to a custom template for the day.
         *
         * Allows to completely override the way a day 'cell' in the calendar is displayed.
         *
         * See [`DayTemplateContext`](#/components/datepicker/api#DayTemplateContext) for the data you get inside.
         */
        this.dayTemplate = this._config.dayTemplate;
        /**
         * The callback to pass any arbitrary data to the template cell via the
         * [`DayTemplateContext`](#/components/datepicker/api#DayTemplateContext)'s `data` parameter.
         *
         * `current` is the month that is currently displayed by the datepicker.
         *
         * @since 3.3.0
         */
        this.dayTemplateData = this._config.dayTemplateData;
        /**
         * The number of months to display.
         */
        this.displayMonths = this._config.displayMonths;
        /**
         * The first day of the week.
         *
         * With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun.
         */
        this.firstDayOfWeek = this._config.firstDayOfWeek;
        /**
         * The reference to the custom template for the datepicker footer.
         *
         * @since 3.3.0
         */
        this.footerTemplate = this._config.footerTemplate;
        /**
         * The callback to mark some dates as disabled.
         *
         * It is called for each new date when navigating to a different month.
         *
         * `current` is the month that is currently displayed by the datepicker.
         */
        this.markDisabled = this._config.markDisabled;
        /**
         * The latest date that can be displayed or selected.
         *
         * If not provided, 'year' select box will display 10 years after the current month.
         */
        this.maxDate = this._config.maxDate;
        /**
         * The earliest date that can be displayed or selected.
         *
         * If not provided, 'year' select box will display 10 years before the current month.
         */
        this.minDate = this._config.minDate;
        /**
         * Navigation type.
         *
         * * `"select"` - select boxes for month and navigation arrows
         * * `"arrows"` - only navigation arrows
         * * `"none"` - no navigation visible at all
         */
        this.navigation = this._config.navigation;
        /**
         * The way of displaying days that don't belong to the current month.
         *
         * * `"visible"` - days are visible
         * * `"hidden"` - days are hidden, white space preserved
         * * `"collapsed"` - days are collapsed, so the datepicker height might change between months
         *
         * For the 2+ months view, days in between months are never shown.
         */
        this.outsideDays = this._config.outsideDays;
        /**
         * If `true`, week numbers will be displayed.
         */
        this.showWeekNumbers = this._config.showWeekNumbers;
        /**
         * The date to open calendar with.
         *
         * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
         * If nothing or invalid date is provided, calendar will open with current month.
         *
         * You could use `navigateTo(date)` method as an alternative.
         */
        this.startDate = this._config.startDate;
        /**
         * The way weekdays should be displayed.
         *
         * * `true` - weekdays are displayed using default width
         * * `false` - weekdays are not displayed
         * * `"short" | "long" | "narrow"` - weekdays are displayed using specified width
         *
         * @since 9.1.0
         */
        this.weekdays = this._config.weekdays;
        /**
         * An event emitted right before the navigation happens and displayed month changes.
         *
         * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event emitted when user selects a date using keyboard or mouse.
         *
         * The payload of the event is currently selected `NgbDate`.
         *
         * @since 5.2.0
         */
        this.dateSelect = new EventEmitter();
        this.onChange = (_) => { };
        this.onTouched = () => { };
        const cd = inject(ChangeDetectorRef);
        this._service.dateSelect$.pipe(takeUntilDestroyed()).subscribe((date) => {
            this.dateSelect.emit(date);
        });
        this._service.model$.pipe(takeUntilDestroyed()).subscribe((model) => {
            const newDate = model.firstDate;
            const oldDate = this.model ? this.model.firstDate : null;
            // update public state
            this._publicState = {
                maxDate: model.maxDate,
                minDate: model.minDate,
                firstDate: model.firstDate,
                lastDate: model.lastDate,
                focusedDate: model.focusDate,
                months: model.months.map((viewModel) => viewModel.firstDate),
            };
            let navigationPrevented = false;
            // emitting navigation event if the first month changes
            if (!newDate.equals(oldDate)) {
                this.navigate.emit({
                    current: oldDate ? { year: oldDate.year, month: oldDate.month } : null,
                    next: { year: newDate.year, month: newDate.month },
                    preventDefault: () => (navigationPrevented = true),
                });
                // can't prevent the very first navigation
                if (navigationPrevented && oldDate !== null) {
                    this._service.open(oldDate);
                    return;
                }
            }
            const newSelectedDate = model.selectedDate;
            const newFocusedDate = model.focusDate;
            const oldFocusedDate = this.model ? this.model.focusDate : null;
            this.model = model;
            // handling selection change
            if (isChangedDate(newSelectedDate, this._controlValue)) {
                this._controlValue = newSelectedDate;
                this.onTouched();
                this.onChange(this._ngbDateAdapter.toModel(newSelectedDate));
            }
            // handling focus change
            if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
                this.focus();
            }
            cd.markForCheck();
        });
    }
    /**
     *  Returns the readonly public state of the datepicker
     *
     * @since 5.2.0
     */
    get state() {
        return this._publicState;
    }
    /**
     *  Returns the calendar service used in the specific datepicker instance.
     *
     *  @since 5.3.0
     */
    get calendar() {
        return this._calendar;
    }
    /**
     * Returns the i18n service used in the specific datepicker instance.
     *
     * @since 14.2.0
     */
    get i18n() {
        return this._i18n;
    }
    /**
     *  Focuses on given date.
     */
    focusDate(date) {
        this._service.focus(NgbDate.from(date));
    }
    /**
     *  Selects focused date.
     */
    focusSelect() {
        this._service.focusSelect();
    }
    focus() {
        afterNextRender({
            read: () => {
                this._nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]')?.focus();
            },
        }, { injector: this._injector });
    }
    /**
     * Navigates to the provided date.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     *
     * Use the `[startDate]` input as an alternative.
     */
    navigateTo(date) {
        this._service.open(NgbDate.from(date ? (date.day ? date : { ...date, day: 1 }) : null));
    }
    ngAfterViewInit() {
        this._ngZone.runOutsideAngular(() => {
            const focusIns$ = fromEvent(this._contentEl.nativeElement, 'focusin');
            const focusOuts$ = fromEvent(this._contentEl.nativeElement, 'focusout');
            // we're changing 'focusVisible' only when entering or leaving months view
            // and ignoring all focus events where both 'target' and 'related' target are day cells
            merge(focusIns$, focusOuts$)
                .pipe(filter((focusEvent) => {
                const target = focusEvent.target;
                const relatedTarget = focusEvent.relatedTarget;
                return !(target?.classList.contains('ngb-dp-day') &&
                    relatedTarget?.classList.contains('ngb-dp-day') &&
                    this._nativeElement.contains(target) &&
                    this._nativeElement.contains(relatedTarget));
            }), takeUntilDestroyed(this._destroyRef))
                .subscribe(({ type }) => this._ngZone.run(() => this._service.set({ focusVisible: type === 'focusin' })));
        });
    }
    ngOnInit() {
        if (this.model === undefined) {
            const inputs = {};
            [
                'dayTemplateData',
                'displayMonths',
                'markDisabled',
                'firstDayOfWeek',
                'navigation',
                'minDate',
                'maxDate',
                'outsideDays',
                'weekdays',
            ].forEach((name) => (inputs[name] = this[name]));
            this._service.set(inputs);
            this.navigateTo(this.startDate);
        }
        if (!this.dayTemplate) {
            this.dayTemplate = this._defaultDayTemplate;
        }
        this._initialized = true;
    }
    ngOnChanges(changes) {
        const inputs = {};
        [
            'dayTemplateData',
            'displayMonths',
            'markDisabled',
            'firstDayOfWeek',
            'navigation',
            'minDate',
            'maxDate',
            'outsideDays',
            'weekdays',
        ]
            .filter((name) => name in changes)
            .forEach((name) => (inputs[name] = this[name]));
        this._service.set(inputs);
        if ('startDate' in changes && this._initialized) {
            const { currentValue, previousValue } = changes.startDate;
            if (isChangedMonth(previousValue, currentValue)) {
                this.navigateTo(this.startDate);
            }
        }
    }
    onDateSelect(date) {
        this._service.focus(date);
        this._service.select(date, { emitEvent: true });
    }
    onNavigateDateSelect(date) {
        this._service.open(date);
    }
    onNavigateEvent(event) {
        switch (event) {
            case NavigationEvent.PREV:
                this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
                break;
            case NavigationEvent.NEXT:
                this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
                break;
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        this._service.set({ disabled });
    }
    writeValue(value) {
        this._controlValue = NgbDate.from(this._ngbDateAdapter.fromModel(value));
        this._service.select(this._controlValue);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepicker, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.1", type: NgbDatepicker, isStandalone: true, selector: "ngb-datepicker", inputs: { contentTemplate: "contentTemplate", dayTemplate: "dayTemplate", dayTemplateData: "dayTemplateData", displayMonths: "displayMonths", firstDayOfWeek: "firstDayOfWeek", footerTemplate: "footerTemplate", markDisabled: "markDisabled", maxDate: "maxDate", minDate: "minDate", navigation: "navigation", outsideDays: "outsideDays", showWeekNumbers: "showWeekNumbers", startDate: "startDate", weekdays: "weekdays" }, outputs: { navigate: "navigate", dateSelect: "dateSelect" }, host: { properties: { "class.disabled": "model.disabled" } }, providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbDatepicker), multi: true },
            NgbDatepickerService,
        ], queries: [{ propertyName: "contentTemplateFromContent", first: true, predicate: NgbDatepickerContent, descendants: true, static: true }], viewQueries: [{ propertyName: "_defaultDayTemplate", first: true, predicate: ["defaultDayTemplate"], descendants: true, static: true }, { propertyName: "_contentEl", first: true, predicate: ["content"], descendants: true, static: true }], exportAs: ["ngbDatepicker"], usesOnChanges: true, ngImport: i0, template: `
		<ng-template
			#defaultDayTemplate
			let-date="date"
			let-currentMonth="currentMonth"
			let-selected="selected"
			let-disabled="disabled"
			let-focused="focused"
		>
			<div
				ngbDatepickerDayView
				[date]="date"
				[currentMonth]="currentMonth"
				[selected]="selected"
				[disabled]="disabled"
				[focused]="focused"
			>
			</div>
		</ng-template>

		<ng-template #defaultContentTemplate>
			@for (month of model.months; track month) {
				<div class="ngb-dp-month">
					@if (navigation === 'none' || (displayMonths > 1 && navigation === 'select')) {
						<div class="ngb-dp-month-name">
							{{ i18n.getMonthLabel(month.firstDate) }}
						</div>
					}
					<ngb-datepicker-month [month]="month.firstDate" />
				</div>
			}
		</ng-template>

		<div class="ngb-dp-header">
			@if (navigation !== 'none') {
				<ngb-datepicker-navigation
					[date]="model.firstDate!"
					[months]="model.months"
					[disabled]="model.disabled"
					[showSelect]="model.navigation === 'select'"
					[prevDisabled]="model.prevDisabled"
					[nextDisabled]="model.nextDisabled"
					[selectBoxes]="model.selectBoxes"
					(navigate)="onNavigateEvent($event)"
					(select)="onNavigateDateSelect($event)"
				/>
			}
		</div>

		<div class="ngb-dp-content" [class.ngb-dp-months]="!contentTemplate" #content>
			<ng-template
				[ngTemplateOutlet]="contentTemplate || contentTemplateFromContent?.templateRef || defaultContentTemplate"
				[ngTemplateOutletContext]="{ $implicit: this }"
				[ngTemplateOutletInjector]="injector"
			/>
		</div>

		<ng-template [ngTemplateOutlet]="footerTemplate" />
	`, isInline: true, styles: ["ngb-datepicker{border:1px solid var(--bs-border-color);border-radius:.25rem;display:inline-block}ngb-datepicker-month{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}ngb-datepicker.disabled .ngb-dp-weekday,ngb-datepicker.disabled .ngb-dp-week-number,ngb-datepicker.disabled .ngb-dp-month-name{color:var(--bs-text-muted)}.ngb-dp-body{z-index:1055}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem;background-color:var(--bs-tertiary-bg)}.ngb-dp-months{display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center;background-color:var(--bs-tertiary-bg)}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}\n"], dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: NgbDatepickerDayView, selector: "[ngbDatepickerDayView]", inputs: ["currentMonth", "date", "disabled", "focused", "selected"] }, { kind: "component", type: NgbDatepickerMonth, selector: "ngb-datepicker-month", inputs: ["month"] }, { kind: "component", type: NgbDatepickerNavigation, selector: "ngb-datepicker-navigation", inputs: ["date", "disabled", "months", "showSelect", "prevDisabled", "nextDisabled", "selectBoxes"], outputs: ["navigate", "select"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepicker, decorators: [{
            type: Component,
            args: [{ exportAs: 'ngbDatepicker', selector: 'ngb-datepicker', imports: [NgTemplateOutlet, NgbDatepickerDayView, NgbDatepickerMonth, NgbDatepickerNavigation], encapsulation: ViewEncapsulation.None, host: {
                        '[class.disabled]': 'model.disabled',
                    }, template: `
		<ng-template
			#defaultDayTemplate
			let-date="date"
			let-currentMonth="currentMonth"
			let-selected="selected"
			let-disabled="disabled"
			let-focused="focused"
		>
			<div
				ngbDatepickerDayView
				[date]="date"
				[currentMonth]="currentMonth"
				[selected]="selected"
				[disabled]="disabled"
				[focused]="focused"
			>
			</div>
		</ng-template>

		<ng-template #defaultContentTemplate>
			@for (month of model.months; track month) {
				<div class="ngb-dp-month">
					@if (navigation === 'none' || (displayMonths > 1 && navigation === 'select')) {
						<div class="ngb-dp-month-name">
							{{ i18n.getMonthLabel(month.firstDate) }}
						</div>
					}
					<ngb-datepicker-month [month]="month.firstDate" />
				</div>
			}
		</ng-template>

		<div class="ngb-dp-header">
			@if (navigation !== 'none') {
				<ngb-datepicker-navigation
					[date]="model.firstDate!"
					[months]="model.months"
					[disabled]="model.disabled"
					[showSelect]="model.navigation === 'select'"
					[prevDisabled]="model.prevDisabled"
					[nextDisabled]="model.nextDisabled"
					[selectBoxes]="model.selectBoxes"
					(navigate)="onNavigateEvent($event)"
					(select)="onNavigateDateSelect($event)"
				/>
			}
		</div>

		<div class="ngb-dp-content" [class.ngb-dp-months]="!contentTemplate" #content>
			<ng-template
				[ngTemplateOutlet]="contentTemplate || contentTemplateFromContent?.templateRef || defaultContentTemplate"
				[ngTemplateOutletContext]="{ $implicit: this }"
				[ngTemplateOutletInjector]="injector"
			/>
		</div>

		<ng-template [ngTemplateOutlet]="footerTemplate" />
	`, providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbDatepicker), multi: true },
                        NgbDatepickerService,
                    ], styles: ["ngb-datepicker{border:1px solid var(--bs-border-color);border-radius:.25rem;display:inline-block}ngb-datepicker-month{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}ngb-datepicker.disabled .ngb-dp-weekday,ngb-datepicker.disabled .ngb-dp-week-number,ngb-datepicker.disabled .ngb-dp-month-name{color:var(--bs-text-muted)}.ngb-dp-body{z-index:1055}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem;background-color:var(--bs-tertiary-bg)}.ngb-dp-months{display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center;background-color:var(--bs-tertiary-bg)}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}\n"] }]
        }], ctorParameters: () => [], propDecorators: { _defaultDayTemplate: [{
                type: ViewChild,
                args: ['defaultDayTemplate', { static: true }]
            }], _contentEl: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }], contentTemplate: [{
                type: Input
            }], contentTemplateFromContent: [{
                type: ContentChild,
                args: [NgbDatepickerContent, { static: true }]
            }], dayTemplate: [{
                type: Input
            }], dayTemplateData: [{
                type: Input
            }], displayMonths: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }], markDisabled: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], minDate: [{
                type: Input
            }], navigation: [{
                type: Input
            }], outsideDays: [{
                type: Input
            }], showWeekNumbers: [{
                type: Input
            }], startDate: [{
                type: Input
            }], weekdays: [{
                type: Input
            }], navigate: [{
                type: Output
            }], dateSelect: [{
                type: Output
            }] } });

function NGB_DATEPICKER_PARSER_FORMATTER_FACTORY() {
    return new NgbDateISOParserFormatter();
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
class NgbDateParserFormatter {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDateParserFormatter, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbDateParserFormatter, factory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDateParserFormatter, decorators: [{
            type: Service,
            args: [{ factory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY }]
        }] });
class NgbDateISOParserFormatter extends NgbDateParserFormatter {
    parse(value) {
        if (value != null) {
            const dateParts = value.trim().split('-');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { year: toInteger(dateParts[0]), month: null, day: null };
            }
            else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null };
            }
            else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2]) };
            }
        }
        return null;
    }
    format(date) {
        return date
            ? `${date.year}-${isNumber(date.month) ? padNumber(date.month) : ''}-${isNumber(date.day) ? padNumber(date.day) : ''}`
            : '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDateISOParserFormatter, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbDateISOParserFormatter, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDateISOParserFormatter, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

/**
 * A configuration service for the [`NgbDatepickerInput`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepicker inputs used in the application.
 *
 * @since 5.2.0
 */
class NgbInputDatepickerConfig extends NgbDatepickerConfig {
    constructor() {
        super(...arguments);
        this.autoClose = true;
        this.placement = ['bottom-start', 'bottom-end', 'top-start', 'top-end'];
        this.popperOptions = (options) => options;
        this.restoreFocus = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbInputDatepickerConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbInputDatepickerConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbInputDatepickerConfig, decorators: [{
            type: Service
        }] });

/**
 * A directive that allows to stick a datepicker popup to an input field.
 *
 * Manages interaction with the input field itself, does value formatting and provides forms integration.
 */
class NgbInputDatepicker {
    constructor() {
        this._parserFormatter = inject(NgbDateParserFormatter);
        this._elRef = inject((ElementRef));
        this._vcRef = inject(ViewContainerRef);
        this._ngZone = inject(NgZone);
        this._calendar = inject(NgbCalendar);
        this._dateAdapter = inject((NgbDateAdapter));
        this._document = inject(DOCUMENT);
        this._changeDetector = inject(ChangeDetectorRef);
        this._injector = inject(Injector);
        this._config = inject(NgbInputDatepickerConfig);
        this._cRef = null;
        this._disabled = false;
        this._elWithFocus = null;
        this._model = null;
        this._positioning = ngbPositioning();
        this._destroyCloseHandlers$ = new Subject();
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
        this.autoClose = this._config.autoClose;
        /**
         * The preferred placement of the datepicker popup, among the [possible values](#/guides/positioning#api).
         *
         * The default order of preference is `"bottom-start bottom-end top-start top-end"`
         *
         * Please see the [positioning overview](#/positioning) for more details.
         */
        this.placement = this._config.placement;
        /**
         * Allows to change default Popper options when positioning the popup.
         * Receives current popper options and returns modified ones.
         *
         * @since 13.1.0
         */
        this.popperOptions = this._config.popperOptions;
        /**
         * A selector specifying the element the datepicker popup should be appended to.
         *
         * Currently only supports `"body"`.
         */
        this.container = this._config.container;
        /**
         * A css selector or html element specifying the element the datepicker popup should be positioned against.
         *
         * By default the input is used as a target.
         *
         * @since 4.2.0
         */
        this.positionTarget = this._config.positionTarget;
        /**
         * An event emitted when user selects a date using keyboard or mouse.
         *
         * The payload of the event is currently selected `NgbDate`.
         *
         * @since 1.1.1
         */
        this.dateSelect = new EventEmitter();
        /**
         * Event emitted right after the navigation happens and displayed month changes.
         *
         * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event fired after closing datepicker window.
         *
         * @since 4.2.0
         */
        this.closed = new EventEmitter();
        this._onChange = (_) => { };
        this._onTouched = () => { };
        this._validatorChange = () => { };
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value === '' || (value && value !== 'false');
        if (this.isOpen()) {
            this._cRef.instance.setDisabledState(this._disabled);
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    registerOnValidatorChange(fn) {
        this._validatorChange = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    validate(c) {
        const { value } = c;
        if (value != null) {
            const ngbDate = this._fromDateStruct(this._dateAdapter.fromModel(value));
            if (!ngbDate) {
                return { ngbDate: { invalid: value } };
            }
            if (this.minDate && ngbDate.before(NgbDate.from(this.minDate))) {
                return { ngbDate: { minDate: { minDate: this.minDate, actual: value } } };
            }
            if (this.maxDate && ngbDate.after(NgbDate.from(this.maxDate))) {
                return { ngbDate: { maxDate: { maxDate: this.maxDate, actual: value } } };
            }
        }
        return null;
    }
    writeValue(value) {
        this._model = this._fromDateStruct(this._dateAdapter.fromModel(value));
        this._writeModelValue(this._model);
    }
    manualDateChange(value, updateView = false) {
        const inputValueChanged = value !== this._inputValue;
        if (inputValueChanged) {
            this._inputValue = value;
            this._model = this._fromDateStruct(this._parserFormatter.parse(value));
        }
        if (inputValueChanged || !updateView) {
            this._onChange(this._model ? this._dateAdapter.toModel(this._model) : value === '' ? null : value);
        }
        if (updateView && this._model) {
            this._writeModelValue(this._model);
        }
    }
    isOpen() {
        return !!this._cRef;
    }
    /**
     * Opens the datepicker popup.
     *
     * If the related form control contains a valid date, the corresponding month will be opened.
     */
    open() {
        if (!this.isOpen()) {
            this._cRef = this._vcRef.createComponent(NgbDatepicker, { injector: this._injector });
            this._applyPopupStyling(this._cRef.location.nativeElement);
            this._applyDatepickerInputs(this._cRef);
            this._subscribeForDatepickerOutputs(this._cRef.instance);
            this._cRef.instance.ngOnInit();
            this._cRef.instance.writeValue(this._dateAdapter.toModel(this._model));
            // date selection event handling
            this._cRef.instance.registerOnChange((selectedDate) => {
                this.writeValue(selectedDate);
                this._onChange(selectedDate);
                this._onTouched();
            });
            this._cRef.changeDetectorRef.detectChanges();
            this._cRef.instance.setDisabledState(this.disabled);
            if (this.container === 'body') {
                this._document.querySelector(this.container)?.appendChild(this._cRef.location.nativeElement);
            }
            // focus handling
            this._elWithFocus = this._document.activeElement;
            ngbFocusTrap(this._ngZone, this._cRef.location.nativeElement, this.closed, true);
            setTimeout(() => this._cRef?.instance.focus());
            let hostElement;
            if (isString(this.positionTarget)) {
                hostElement = this._document.querySelector(this.positionTarget);
            }
            else if (this.positionTarget instanceof HTMLElement) {
                hostElement = this.positionTarget;
            }
            else {
                hostElement = this._elRef.nativeElement;
            }
            if (this.positionTarget && !hostElement) {
                throw new Error('ngbDatepicker could not find element declared in [positionTarget] to position against.');
            }
            // Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(() => {
                if (this._cRef && hostElement) {
                    this._positioning.createPopper({
                        hostElement,
                        targetElement: this._cRef.location.nativeElement,
                        placement: this.placement,
                        updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 2])(options)),
                    });
                    this._afterRenderRef = afterEveryRender({
                        mixedReadWrite: () => {
                            this._positioning.update();
                        },
                    }, { injector: this._injector });
                }
            });
            this._setCloseHandlers();
        }
    }
    /**
     * Closes the datepicker popup.
     */
    close() {
        if (this.isOpen()) {
            this._cRef?.destroy();
            this._cRef = null;
            this._positioning.destroy();
            this._afterRenderRef?.destroy();
            this._destroyCloseHandlers$.next();
            this.closed.emit();
            this._changeDetector.markForCheck();
            // restore focus
            let elementToFocus = this._elWithFocus;
            if (isString(this.restoreFocus)) {
                elementToFocus = this._document.querySelector(this.restoreFocus);
            }
            else if (this.restoreFocus !== undefined) {
                elementToFocus = this.restoreFocus;
            }
            // in IE document.activeElement can contain an object without 'focus()' sometimes
            if (elementToFocus && elementToFocus['focus']) {
                elementToFocus.focus();
            }
            else {
                this._document.body.focus();
            }
        }
    }
    /**
     * Toggles the datepicker popup.
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Navigates to the provided date.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     *
     * Use the `[startDate]` input as an alternative.
     */
    navigateTo(date) {
        if (this.isOpen()) {
            this._cRef.instance.navigateTo(date);
        }
    }
    onBlur() {
        this._onTouched();
    }
    onFocus() {
        this._elWithFocus = this._elRef.nativeElement;
    }
    ngOnChanges(changes) {
        if (changes['minDate'] || changes['maxDate']) {
            this._validatorChange();
            if (this.isOpen()) {
                if (changes['minDate']) {
                    this._cRef.setInput('minDate', this.minDate);
                }
                if (changes['maxDate']) {
                    this._cRef.setInput('maxDate', this.maxDate);
                }
            }
        }
        if (changes['datepickerClass']) {
            const { currentValue, previousValue } = changes['datepickerClass'];
            this._applyPopupClass(currentValue, previousValue);
        }
        if (changes['autoClose'] && this.isOpen()) {
            this._setCloseHandlers();
        }
    }
    ngOnDestroy() {
        this.close();
    }
    _applyDatepickerInputs(datepickerComponentRef) {
        [
            'contentTemplate',
            'dayTemplate',
            'dayTemplateData',
            'displayMonths',
            'firstDayOfWeek',
            'footerTemplate',
            'markDisabled',
            'minDate',
            'maxDate',
            'navigation',
            'outsideDays',
            'showNavigation',
            'showWeekNumbers',
            'weekdays',
        ].forEach((inputName) => {
            if (this[inputName] !== undefined) {
                datepickerComponentRef.setInput(inputName, this[inputName]);
            }
        });
        datepickerComponentRef.setInput('startDate', this.startDate || this._model);
    }
    _applyPopupClass(newClass, oldClass) {
        const popupEl = this._cRef?.location.nativeElement;
        if (popupEl) {
            if (newClass) {
                popupEl.classList.add(newClass);
            }
            if (oldClass) {
                popupEl.classList.remove(oldClass);
            }
        }
    }
    _applyPopupStyling(nativeElement) {
        nativeElement.classList.add('dropdown-menu', 'show');
        if (this.container === 'body') {
            nativeElement.classList.add('ngb-dp-body');
        }
        this._applyPopupClass(this.datepickerClass);
    }
    _subscribeForDatepickerOutputs(datepickerInstance) {
        datepickerInstance.navigate.subscribe((navigateEvent) => this.navigate.emit(navigateEvent));
        datepickerInstance.dateSelect.subscribe((date) => {
            this.dateSelect.emit(date);
            if (this.autoClose === true || this.autoClose === 'inside') {
                this.close();
            }
        });
    }
    _writeModelValue(model) {
        const value = this._parserFormatter.format(model);
        this._inputValue = value;
        this._elRef.nativeElement.value = value;
        if (this.isOpen()) {
            this._cRef.instance.writeValue(this._dateAdapter.toModel(model));
            this._onTouched();
        }
    }
    _fromDateStruct(date) {
        const ngbDate = date ? new NgbDate(date.year, date.month, date.day) : null;
        return this._calendar.isValid(ngbDate) ? ngbDate : null;
    }
    _setCloseHandlers() {
        this._destroyCloseHandlers$.next();
        ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this._destroyCloseHandlers$, [], [this._elRef.nativeElement, this._cRef.location.nativeElement]);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbInputDatepicker, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbInputDatepicker, isStandalone: true, selector: "input[ngbDatepicker]", inputs: { autoClose: "autoClose", contentTemplate: "contentTemplate", datepickerClass: "datepickerClass", dayTemplate: "dayTemplate", dayTemplateData: "dayTemplateData", displayMonths: "displayMonths", firstDayOfWeek: "firstDayOfWeek", footerTemplate: "footerTemplate", markDisabled: "markDisabled", minDate: "minDate", maxDate: "maxDate", navigation: "navigation", outsideDays: "outsideDays", placement: "placement", popperOptions: "popperOptions", restoreFocus: "restoreFocus", showWeekNumbers: "showWeekNumbers", startDate: "startDate", container: "container", positionTarget: "positionTarget", weekdays: "weekdays", disabled: "disabled" }, outputs: { dateSelect: "dateSelect", navigate: "navigate", closed: "closed" }, host: { listeners: { "input": "manualDateChange($any($event).target.value)", "change": "manualDateChange($any($event).target.value, true)", "focus": "onFocus()", "blur": "onBlur()" }, properties: { "disabled": "disabled" } }, providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbInputDatepicker), multi: true },
            { provide: NG_VALIDATORS, useExisting: forwardRef(() => NgbInputDatepicker), multi: true },
            { provide: NgbDatepickerConfig, useExisting: NgbInputDatepickerConfig },
        ], exportAs: ["ngbDatepicker"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbInputDatepicker, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[ngbDatepicker]',
                    exportAs: 'ngbDatepicker',
                    host: {
                        '(input)': 'manualDateChange($any($event).target.value)',
                        '(change)': 'manualDateChange($any($event).target.value, true)',
                        '(focus)': 'onFocus()',
                        '(blur)': 'onBlur()',
                        '[disabled]': 'disabled',
                    },
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbInputDatepicker), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(() => NgbInputDatepicker), multi: true },
                        { provide: NgbDatepickerConfig, useExisting: NgbInputDatepickerConfig },
                    ],
                }]
        }], propDecorators: { autoClose: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }], datepickerClass: [{
                type: Input
            }], dayTemplate: [{
                type: Input
            }], dayTemplateData: [{
                type: Input
            }], displayMonths: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }], markDisabled: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], navigation: [{
                type: Input
            }], outsideDays: [{
                type: Input
            }], placement: [{
                type: Input
            }], popperOptions: [{
                type: Input
            }], restoreFocus: [{
                type: Input
            }], showWeekNumbers: [{
                type: Input
            }], startDate: [{
                type: Input
            }], container: [{
                type: Input
            }], positionTarget: [{
                type: Input
            }], weekdays: [{
                type: Input
            }], dateSelect: [{
                type: Output
            }], navigate: [{
                type: Output
            }], closed: [{
                type: Output
            }], disabled: [{
                type: Input
            }] } });

class NgbCalendarHijri extends NgbCalendar {
    getDaysPerWeek() {
        return 7;
    }
    getMonths() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }
    getWeeksPerMonth() {
        return 6;
    }
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date = this._setYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = this._setMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return this._setDay(date, date.day + number);
            default:
                return date;
        }
    }
    getPrev(date, period = 'd', number = 1) {
        return this.getNext(date, period, -number);
    }
    getWeekday(date) {
        const day = this.toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        const date = week[thursdayIndex];
        const jsDate = this.toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        const time = jsDate.getTime();
        const MuhDate = this.toGregorian(new NgbDate(date.year, 1, 1)); // Compare with Muharram 1
        return Math.floor(Math.round((time - MuhDate.getTime()) / 86400000) / 7) + 1;
    }
    getToday() {
        return this.fromGregorian(new Date());
    }
    isValid(date) {
        return (date != null &&
            isNumber(date.year) &&
            isNumber(date.month) &&
            isNumber(date.day) &&
            !isNaN(this.toGregorian(date).getTime()));
    }
    _setDay(date, day) {
        day = +day;
        let mDays = this.getDaysPerMonth(date.month, date.year);
        if (day <= 0) {
            while (day <= 0) {
                date = this._setMonth(date, date.month - 1);
                mDays = this.getDaysPerMonth(date.month, date.year);
                day += mDays;
            }
        }
        else if (day > mDays) {
            while (day > mDays) {
                day -= mDays;
                date = this._setMonth(date, date.month + 1);
                mDays = this.getDaysPerMonth(date.month, date.year);
            }
        }
        date.day = day;
        return date;
    }
    _setMonth(date, month) {
        month = +month;
        date.year = date.year + Math.floor((month - 1) / 12);
        date.month = Math.floor((((month - 1) % 12) + 12) % 12) + 1;
        return date;
    }
    _setYear(date, year) {
        date.year = +year;
        return date;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarHijri, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarHijri, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarHijri, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

/**
 * Checks if islamic year is a leap year
 */
function isIslamicLeapYear(hYear) {
    return (14 + 11 * hYear) % 30 < 11;
}
/**
 * Checks if gregorian years is a leap year
 */
function isGregorianLeapYear$1(gDate) {
    const year = gDate.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
/**
 * Returns the start of Hijri Month.
 * `hMonth` is 0 for Muharram, 1 for Safar, etc.
 * `hYear` is any Hijri hYear.
 */
function getIslamicMonthStart(hYear, hMonth) {
    return Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30.0);
}
/**
 * Returns the start of Hijri year.
 * `year` is any Hijri year.
 */
function getIslamicYearStart(year) {
    return (year - 1) * 354 + Math.floor((3 + 11 * year) / 30.0);
}
function mod$1(a, b) {
    return a - b * Math.floor(a / b);
}
/**
 * The civil calendar is one type of Hijri calendars used in islamic countries.
 * Uses a fixed cycle of alternating 29- and 30-day months,
 * with a leap day added to the last month of 11 out of every 30 years.
 * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
 * All the calculations here are based on the equations from "Calendrical Calculations" By Edward M. Reingold, Nachum
 * Dershowitz.
 */
const GREGORIAN_EPOCH$1 = 1721425.5;
const ISLAMIC_EPOCH = 1948439.5;
class NgbCalendarIslamicCivil extends NgbCalendarHijri {
    /**
     * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
     * `gDate` is a JS Date to be converted to Hijri.
     */
    fromGregorian(gDate) {
        const gYear = gDate.getFullYear(), gMonth = gDate.getMonth(), gDay = gDate.getDate();
        let julianDay = GREGORIAN_EPOCH$1 -
            1 +
            365 * (gYear - 1) +
            Math.floor((gYear - 1) / 4) +
            -Math.floor((gYear - 1) / 100) +
            Math.floor((gYear - 1) / 400) +
            Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear$1(gDate) ? -1 : -2) + gDay);
        julianDay = Math.floor(julianDay) + 0.5;
        const days = julianDay - ISLAMIC_EPOCH;
        const hYear = Math.floor((30 * days + 10646) / 10631.0);
        let hMonth = Math.ceil((days - 29 - getIslamicYearStart(hYear)) / 29.5);
        hMonth = Math.min(hMonth, 11);
        const hDay = Math.ceil(days - getIslamicMonthStart(hYear, hMonth)) + 1;
        return new NgbDate(hYear, hMonth + 1, hDay);
    }
    /**
     * Returns the equivalent JS date value for a give input islamic(civil) date.
     * `hDate` is an islamic(civil) date to be converted to Gregorian.
     */
    toGregorian(hDate) {
        const hYear = hDate.year;
        const hMonth = hDate.month - 1;
        const hDay = hDate.day;
        const julianDay = hDay + Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30) + ISLAMIC_EPOCH - 1;
        const wjd = Math.floor(julianDay - 0.5) + 0.5, depoch = wjd - GREGORIAN_EPOCH$1, quadricent = Math.floor(depoch / 146097), dqc = mod$1(depoch, 146097), cent = Math.floor(dqc / 36524), dcent = mod$1(dqc, 36524), quad = Math.floor(dcent / 1461), dquad = mod$1(dcent, 1461), yindex = Math.floor(dquad / 365);
        let year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
        if (!(cent === 4 || yindex === 4)) {
            year++;
        }
        const gYearStart = GREGORIAN_EPOCH$1 +
            365 * (year - 1) +
            Math.floor((year - 1) / 4) -
            Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400);
        const yearday = wjd - gYearStart;
        const tjd = GREGORIAN_EPOCH$1 -
            1 +
            365 * (year - 1) +
            Math.floor((year - 1) / 4) -
            Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) +
            Math.floor(739 / 12 + (isGregorianLeapYear$1(new Date(year, 3, 1)) ? -1 : -2) + 1);
        const leapadj = wjd < tjd ? 0 : isGregorianLeapYear$1(new Date(year, 3, 1)) ? 1 : 2;
        const month = Math.floor(((yearday + leapadj) * 12 + 373) / 367);
        const tjd2 = GREGORIAN_EPOCH$1 -
            1 +
            365 * (year - 1) +
            Math.floor((year - 1) / 4) -
            Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) +
            Math.floor((367 * month - 362) / 12 + (month <= 2 ? 0 : isGregorianLeapYear$1(new Date(year, month - 1, 1)) ? -1 : -2) + 1);
        const day = wjd - tjd2 + 1;
        return new Date(year, month - 1, day);
    }
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     */
    getDaysPerMonth(month, year) {
        year = year + Math.floor(month / 13);
        month = ((month - 1) % 12) + 1;
        let length = 29 + (month % 2);
        if (month === 12 && isIslamicLeapYear(year)) {
            length++;
        }
        return length;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarIslamicCivil, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarIslamicCivil, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarIslamicCivil, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

/**
 * Umalqura calendar is one type of Hijri calendars used in islamic countries.
 * This Calendar is used by Saudi Arabia for administrative purpose.
 * Unlike tabular calendars, the algorithm involves astronomical calculation, but it's still deterministic.
 * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
 */
const GREGORIAN_FIRST_DATE = new Date(1882, 10, 12);
const GREGORIAN_LAST_DATE = new Date(2174, 10, 25);
const HIJRI_BEGIN = 1300;
const HIJRI_END = 1600;
const ONE_DAY = 1000 * 60 * 60 * 24;
const MONTH_LENGTH = [
    // 1300-1304
    '101010101010',
    '110101010100',
    '111011001001',
    '011011010100',
    '011011101010',
    // 1305-1309
    '001101101100',
    '101010101101',
    '010101010101',
    '011010101001',
    '011110010010',
    // 1310-1314
    '101110101001',
    '010111010100',
    '101011011010',
    '010101011100',
    '110100101101',
    // 1315-1319
    '011010010101',
    '011101001010',
    '101101010100',
    '101101101010',
    '010110101101',
    // 1320-1324
    '010010101110',
    '101001001111',
    '010100010111',
    '011010001011',
    '011010100101',
    // 1325-1329
    '101011010101',
    '001011010110',
    '100101011011',
    '010010011101',
    '101001001101',
    // 1330-1334
    '110100100110',
    '110110010101',
    '010110101100',
    '100110110110',
    '001010111010',
    // 1335-1339
    '101001011011',
    '010100101011',
    '101010010101',
    '011011001010',
    '101011101001',
    // 1340-1344
    '001011110100',
    '100101110110',
    '001010110110',
    '100101010110',
    '101011001010',
    // 1345-1349
    '101110100100',
    '101111010010',
    '010111011001',
    '001011011100',
    '100101101101',
    // 1350-1354
    '010101001101',
    '101010100101',
    '101101010010',
    '101110100101',
    '010110110100',
    // 1355-1359
    '100110110110',
    '010101010111',
    '001010010111',
    '010101001011',
    '011010100011',
    // 1360-1364
    '011101010010',
    '101101100101',
    '010101101010',
    '101010101011',
    '010100101011',
    // 1365-1369
    '110010010101',
    '110101001010',
    '110110100101',
    '010111001010',
    '101011010110',
    // 1370-1374
    '100101010111',
    '010010101011',
    '100101001011',
    '101010100101',
    '101101010010',
    // 1375-1379
    '101101101010',
    '010101110101',
    '001001110110',
    '100010110111',
    '010001011011',
    // 1380-1384
    '010101010101',
    '010110101001',
    '010110110100',
    '100111011010',
    '010011011101',
    // 1385-1389
    '001001101110',
    '100100110110',
    '101010101010',
    '110101010100',
    '110110110010',
    // 1390-1394
    '010111010101',
    '001011011010',
    '100101011011',
    '010010101011',
    '101001010101',
    // 1395-1399
    '101101001001',
    '101101100100',
    '101101110001',
    '010110110100',
    '101010110101',
    // 1400-1404
    '101001010101',
    '110100100101',
    '111010010010',
    '111011001001',
    '011011010100',
    // 1405-1409
    '101011101001',
    '100101101011',
    '010010101011',
    '101010010011',
    '110101001001',
    // 1410-1414
    '110110100100',
    '110110110010',
    '101010111001',
    '010010111010',
    '101001011011',
    // 1415-1419
    '010100101011',
    '101010010101',
    '101100101010',
    '101101010101',
    '010101011100',
    // 1420-1424
    '010010111101',
    '001000111101',
    '100100011101',
    '101010010101',
    '101101001010',
    // 1425-1429
    '101101011010',
    '010101101101',
    '001010110110',
    '100100111011',
    '010010011011',
    // 1430-1434
    '011001010101',
    '011010101001',
    '011101010100',
    '101101101010',
    '010101101100',
    // 1435-1439
    '101010101101',
    '010101010101',
    '101100101001',
    '101110010010',
    '101110101001',
    // 1440-1444
    '010111010100',
    '101011011010',
    '010101011010',
    '101010101011',
    '010110010101',
    // 1445-1449
    '011101001001',
    '011101100100',
    '101110101010',
    '010110110101',
    '001010110110',
    // 1450-1454
    '101001010110',
    '111001001101',
    '101100100101',
    '101101010010',
    '101101101010',
    // 1455-1459
    '010110101101',
    '001010101110',
    '100100101111',
    '010010010111',
    '011001001011',
    // 1460-1464
    '011010100101',
    '011010101100',
    '101011010110',
    '010101011101',
    '010010011101',
    // 1465-1469
    '101001001101',
    '110100010110',
    '110110010101',
    '010110101010',
    '010110110101',
    // 1470-1474
    '001011011010',
    '100101011011',
    '010010101101',
    '010110010101',
    '011011001010',
    // 1475-1479
    '011011100100',
    '101011101010',
    '010011110101',
    '001010110110',
    '100101010110',
    // 1480-1484
    '101010101010',
    '101101010100',
    '101111010010',
    '010111011001',
    '001011101010',
    // 1485-1489
    '100101101101',
    '010010101101',
    '101010010101',
    '101101001010',
    '101110100101',
    // 1490-1494
    '010110110010',
    '100110110101',
    '010011010110',
    '101010010111',
    '010101000111',
    // 1495-1499
    '011010010011',
    '011101001001',
    '101101010101',
    '010101101010',
    '101001101011',
    // 1500-1504
    '010100101011',
    '101010001011',
    '110101000110',
    '110110100011',
    '010111001010',
    // 1505-1509
    '101011010110',
    '010011011011',
    '001001101011',
    '100101001011',
    '101010100101',
    // 1510-1514
    '101101010010',
    '101101101001',
    '010101110101',
    '000101110110',
    '100010110111',
    // 1515-1519
    '001001011011',
    '010100101011',
    '010101100101',
    '010110110100',
    '100111011010',
    // 1520-1524
    '010011101101',
    '000101101101',
    '100010110110',
    '101010100110',
    '110101010010',
    // 1525-1529
    '110110101001',
    '010111010100',
    '101011011010',
    '100101011011',
    '010010101011',
    // 1530-1534
    '011001010011',
    '011100101001',
    '011101100010',
    '101110101001',
    '010110110010',
    // 1535-1539
    '101010110101',
    '010101010101',
    '101100100101',
    '110110010010',
    '111011001001',
    // 1540-1544
    '011011010010',
    '101011101001',
    '010101101011',
    '010010101011',
    '101001010101',
    // 1545-1549
    '110100101001',
    '110101010100',
    '110110101010',
    '100110110101',
    '010010111010',
    // 1550-1554
    '101000111011',
    '010010011011',
    '101001001101',
    '101010101010',
    '101011010101',
    // 1555-1559
    '001011011010',
    '100101011101',
    '010001011110',
    '101000101110',
    '110010011010',
    // 1560-1564
    '110101010101',
    '011010110010',
    '011010111001',
    '010010111010',
    '101001011101',
    // 1565-1569
    '010100101101',
    '101010010101',
    '101101010010',
    '101110101000',
    '101110110100',
    // 1570-1574
    '010110111001',
    '001011011010',
    '100101011010',
    '101101001010',
    '110110100100',
    // 1575-1579
    '111011010001',
    '011011101000',
    '101101101010',
    '010101101101',
    '010100110101',
    // 1580-1584
    '011010010101',
    '110101001010',
    '110110101000',
    '110111010100',
    '011011011010',
    // 1585-1589
    '010101011011',
    '001010011101',
    '011000101011',
    '101100010101',
    '101101001010',
    // 1590-1594
    '101110010101',
    '010110101010',
    '101010101110',
    '100100101110',
    '110010001111',
    // 1595-1599
    '010100100111',
    '011010010101',
    '011010101010',
    '101011010110',
    '010101011101',
    // 1600
    '001010011101',
];
function getDaysDiff(date1, date2) {
    // Ignores the time part in date1 and date2:
    const time1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const time2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const diff = Math.abs(time1 - time2);
    return Math.round(diff / ONE_DAY);
}
class NgbCalendarIslamicUmalqura extends NgbCalendarIslamicCivil {
    /**
     * Returns the equivalent islamic(Umalqura) date value for a give input Gregorian date.
     * `gdate` is s JS Date to be converted to Hijri.
     */
    fromGregorian(gDate) {
        let hDay = 1, hMonth = 0, hYear = 1300;
        let daysDiff = getDaysDiff(gDate, GREGORIAN_FIRST_DATE);
        if (gDate.getTime() - GREGORIAN_FIRST_DATE.getTime() >= 0 && gDate.getTime() - GREGORIAN_LAST_DATE.getTime() <= 0) {
            let year = 1300;
            for (let i = 0; i < MONTH_LENGTH.length; i++, year++) {
                for (let j = 0; j < 12; j++) {
                    let numOfDays = +MONTH_LENGTH[i][j] + 29;
                    if (daysDiff <= numOfDays) {
                        hDay = daysDiff + 1;
                        if (hDay > numOfDays) {
                            hDay = 1;
                            j++;
                        }
                        if (j > 11) {
                            j = 0;
                            year++;
                        }
                        hMonth = j;
                        hYear = year;
                        return new NgbDate(hYear, hMonth + 1, hDay);
                    }
                    daysDiff = daysDiff - numOfDays;
                }
            }
            return null;
        }
        else {
            return super.fromGregorian(gDate);
        }
    }
    /**
     * Converts the current Hijri date to Gregorian.
     */
    toGregorian(hDate) {
        const hYear = hDate.year;
        const hMonth = hDate.month - 1;
        const hDay = hDate.day;
        let gDate = new Date(GREGORIAN_FIRST_DATE);
        let dayDiff = hDay - 1;
        if (hYear >= HIJRI_BEGIN && hYear <= HIJRI_END) {
            for (let y = 0; y < hYear - HIJRI_BEGIN; y++) {
                for (let m = 0; m < 12; m++) {
                    dayDiff += +MONTH_LENGTH[y][m] + 29;
                }
            }
            for (let m = 0; m < hMonth; m++) {
                dayDiff += +MONTH_LENGTH[hYear - HIJRI_BEGIN][m] + 29;
            }
            gDate.setDate(GREGORIAN_FIRST_DATE.getDate() + dayDiff);
        }
        else {
            gDate = super.toGregorian(hDate);
        }
        return gDate;
    }
    /**
     * Returns the number of days in a specific Hijri hMonth.
     * `hMonth` is 1 for Muharram, 2 for Safar, etc.
     * `hYear` is any Hijri hYear.
     */
    getDaysPerMonth(hMonth, hYear) {
        if (hYear >= HIJRI_BEGIN && hYear <= HIJRI_END) {
            const pos = hYear - HIJRI_BEGIN;
            return +MONTH_LENGTH[pos][hMonth - 1] + 29;
        }
        return super.getDaysPerMonth(hMonth, hYear);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarIslamicUmalqura, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarIslamicUmalqura, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarIslamicUmalqura, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

/**
 * Returns the equivalent JS date value for a give input Jalali date.
 * `jalaliDate` is an Jalali date to be converted to Gregorian.
 */
function toGregorian$3(jalaliDate) {
    let jdn = jalaliToJulian(jalaliDate.year, jalaliDate.month, jalaliDate.day);
    let date = julianToGregorian$1(jdn);
    date.setHours(6, 30, 3, 200);
    return date;
}
/**
 * Returns the equivalent jalali date value for a give input Gregorian date.
 * `gdate` is a JS Date to be converted to jalali.
 * utc to local
 */
function fromGregorian$3(gdate) {
    let g2d = gregorianToJulian$1(gdate.getFullYear(), gdate.getMonth() + 1, gdate.getDate());
    return julianToJalali(g2d);
}
function setJalaliYear(date, yearValue) {
    date.year = +yearValue;
    return date;
}
function setJalaliMonth(date, month) {
    month = +month;
    date.year = date.year + Math.floor((month - 1) / 12);
    date.month = Math.floor((((month - 1) % 12) + 12) % 12) + 1;
    return date;
}
function setJalaliDay(date, day) {
    let mDays = getDaysPerMonth$1(date.month, date.year);
    if (day <= 0) {
        while (day <= 0) {
            date = setJalaliMonth(date, date.month - 1);
            mDays = getDaysPerMonth$1(date.month, date.year);
            day += mDays;
        }
    }
    else if (day > mDays) {
        while (day > mDays) {
            day -= mDays;
            date = setJalaliMonth(date, date.month + 1);
            mDays = getDaysPerMonth$1(date.month, date.year);
        }
    }
    date.day = day;
    return date;
}
function mod(a, b) {
    return a - b * Math.floor(a / b);
}
function div(a, b) {
    return Math.trunc(a / b);
}
/*
 This function determines if the Jalali (Persian) year is
 leap (366-day long) or is the common year (365 days), and
 finds the day in March (Gregorian calendar) of the first
 day of the Jalali year (jalaliYear).
 @param jalaliYear Jalali calendar year (-61 to 3177)
 @return
 leap: number of years since the last leap year (0 to 4)
 gYear: Gregorian year of the beginning of Jalali year
 march: the March day of Farvardin the 1st (1st day of jalaliYear)
 @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
 @see: http://www.fourmilab.ch/documents/calendar/
 */
function jalCal(jalaliYear) {
    // Jalali years starting the 33-year rule.
    let breaks = [
        -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178,
    ];
    const breaksLength = breaks.length;
    const gYear = jalaliYear + 621;
    let leapJ = -14;
    let jp = breaks[0];
    if (jalaliYear < jp || jalaliYear >= breaks[breaksLength - 1]) {
        throw new Error('Invalid Jalali year ' + jalaliYear);
    }
    // Find the limiting years for the Jalali year jalaliYear.
    let jump;
    for (let i = 1; i < breaksLength; i += 1) {
        const jm = breaks[i];
        jump = jm - jp;
        if (jalaliYear < jm) {
            break;
        }
        leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
        jp = jm;
    }
    let n = jalaliYear - jp;
    // Find the number of leap years from AD 621 to the beginning
    // of the current Jalali year in the Persian calendar.
    leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
    if (mod(jump, 33) === 4 && jump - n === 4) {
        leapJ += 1;
    }
    // And the same in the Gregorian calendar (until the year gYear).
    const leapG = div(gYear, 4) - div((div(gYear, 100) + 1) * 3, 4) - 150;
    // Determine the Gregorian date of Farvardin the 1st.
    const march = 20 + leapJ - leapG;
    // Find how many years have passed since the last leap year.
    if (jump - n < 6) {
        n = n - jump + div(jump + 4, 33) * 33;
    }
    let leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) {
        leap = 4;
    }
    return { leap: leap, gy: gYear, march: march };
}
/*
 Calculates Gregorian and Julian calendar dates from the Julian Day number
 (jdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
 calendars) to some millions years ahead of the present.
 @param jdn Julian Day number
 @return
 gYear: Calendar year (years BC numbered 0, -1, -2, ...)
 gMonth: Calendar month (1 to 12)
 gDay: Calendar day of the month M (1 to 28/29/30/31)
 */
function julianToGregorian$1(julianDayNumber) {
    let j = 4 * julianDayNumber + 139361631;
    j = j + div(div(4 * julianDayNumber + 183187720, 146097) * 3, 4) * 4 - 3908;
    const i = div(mod(j, 1461), 4) * 5 + 308;
    const gDay = div(mod(i, 153), 5) + 1;
    const gMonth = mod(div(i, 153), 12) + 1;
    const gYear = div(j, 1461) - 100100 + div(8 - gMonth, 6);
    return new Date(gYear, gMonth - 1, gDay);
}
/*
 Converts a date of the Jalali calendar to the Julian Day number.
 @param jy Jalali year (1 to 3100)
 @param jm Jalali month (1 to 12)
 @param jd Jalali day (1 to 29/31)
 @return Julian Day number
 */
function gregorianToJulian$1(gy, gm, gd) {
    let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408;
    d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
    return d;
}
/*
 Converts the Julian Day number to a date in the Jalali calendar.
 @param julianDayNumber Julian Day number
 @return
 jalaliYear: Jalali year (1 to 3100)
 jalaliMonth: Jalali month (1 to 12)
 jalaliDay: Jalali day (1 to 29/31)
 */
function julianToJalali(julianDayNumber) {
    let gy = julianToGregorian$1(julianDayNumber).getFullYear(), // Calculate Gregorian year (gy).
    jalaliYear = gy - 621, r = jalCal(jalaliYear), gregorianDay = gregorianToJulian$1(gy, 3, r.march), jalaliDay, jalaliMonth, numberOfDays;
    // Find number of days that passed since 1 Farvardin.
    numberOfDays = julianDayNumber - gregorianDay;
    if (numberOfDays >= 0) {
        if (numberOfDays <= 185) {
            // The first 6 months.
            jalaliMonth = 1 + div(numberOfDays, 31);
            jalaliDay = mod(numberOfDays, 31) + 1;
            return new NgbDate(jalaliYear, jalaliMonth, jalaliDay);
        }
        else {
            // The remaining months.
            numberOfDays -= 186;
        }
    }
    else {
        // Previous Jalali year.
        jalaliYear -= 1;
        numberOfDays += 179;
        if (r.leap === 1) {
            numberOfDays += 1;
        }
    }
    jalaliMonth = 7 + div(numberOfDays, 30);
    jalaliDay = mod(numberOfDays, 30) + 1;
    return new NgbDate(jalaliYear, jalaliMonth, jalaliDay);
}
/*
 Converts a date of the Jalali calendar to the Julian Day number.
 @param jYear Jalali year (1 to 3100)
 @param jMonth Jalali month (1 to 12)
 @param jDay Jalali day (1 to 29/31)
 @return Julian Day number
 */
function jalaliToJulian(jYear, jMonth, jDay) {
    let r = jalCal(jYear);
    return gregorianToJulian$1(r.gy, 3, r.march) + (jMonth - 1) * 31 - div(jMonth, 7) * (jMonth - 7) + jDay - 1;
}
/**
 * Returns the number of days in a specific jalali month.
 */
function getDaysPerMonth$1(month, year) {
    if (month <= 6) {
        return 31;
    }
    if (month <= 11) {
        return 30;
    }
    if (jalCal(year).leap === 0) {
        return 30;
    }
    return 29;
}

class NgbCalendarPersian extends NgbCalendar {
    getDaysPerWeek() {
        return 7;
    }
    getMonths() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }
    getWeeksPerMonth() {
        return 6;
    }
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date = setJalaliYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = setJalaliMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return setJalaliDay(date, date.day + number);
            default:
                return date;
        }
    }
    getPrev(date, period = 'd', number = 1) {
        return this.getNext(date, period, -number);
    }
    getWeekday(date) {
        const day = toGregorian$3(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        const date = week[thursdayIndex];
        const jsDate = toGregorian$3(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        const time = jsDate.getTime();
        const startDate = toGregorian$3(new NgbDate(date.year, 1, 1));
        return Math.floor(Math.round((time - startDate.getTime()) / 86400000) / 7) + 1;
    }
    getToday() {
        return fromGregorian$3(new Date());
    }
    isValid(date) {
        return (date != null &&
            isInteger(date.year) &&
            isInteger(date.month) &&
            isInteger(date.day) &&
            !isNaN(toGregorian$3(date).getTime()));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarPersian, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarPersian, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarPersian, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

const PARTS_PER_HOUR = 1080;
const PARTS_PER_DAY = 24 * PARTS_PER_HOUR;
const PARTS_FRACTIONAL_MONTH = 12 * PARTS_PER_HOUR + 793;
const PARTS_PER_MONTH = 29 * PARTS_PER_DAY + PARTS_FRACTIONAL_MONTH;
const BAHARAD = 11 * PARTS_PER_HOUR + 204;
const HEBREW_DAY_ON_JAN_1_1970 = 2092591;
const GREGORIAN_EPOCH = 1721425.5;
function isGregorianLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
function numberOfFirstDayInYear(year) {
    let monthsBeforeYear = Math.floor((235 * year - 234) / 19);
    let fractionalMonthsBeforeYear = monthsBeforeYear * PARTS_FRACTIONAL_MONTH + BAHARAD;
    let dayNumber = monthsBeforeYear * 29 + Math.floor(fractionalMonthsBeforeYear / PARTS_PER_DAY);
    let timeOfDay = fractionalMonthsBeforeYear % PARTS_PER_DAY;
    let dayOfWeek = dayNumber % 7; // 0 == Monday
    if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6) {
        dayNumber++;
        dayOfWeek = dayNumber % 7;
    }
    if (dayOfWeek === 1 && timeOfDay > 15 * PARTS_PER_HOUR + 204 && !isHebrewLeapYear(year)) {
        dayNumber += 2;
    }
    else if (dayOfWeek === 0 && timeOfDay > 21 * PARTS_PER_HOUR + 589 && isHebrewLeapYear(year - 1)) {
        dayNumber++;
    }
    return dayNumber;
}
function getDaysInGregorianMonth(month, year) {
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (isGregorianLeapYear(year)) {
        days[1]++;
    }
    return days[month - 1];
}
function getHebrewMonths(year) {
    return isHebrewLeapYear(year) ? 13 : 12;
}
/**
 * Returns the number of days in a specific Hebrew year.
 * `year` is any Hebrew year.
 */
function getDaysInHebrewYear(year) {
    return numberOfFirstDayInYear(year + 1) - numberOfFirstDayInYear(year);
}
function isHebrewLeapYear(year) {
    if (year != null) {
        let b = (year * 12 + 17) % 19;
        return b >= (b < 0 ? -7 : 12);
    }
    return false;
}
/**
 * Returns the number of days in a specific Hebrew month.
 * `month` is 1 for Nisan, 2 for Iyar etc. Note: Hebrew leap year contains 13 months.
 * `year` is any Hebrew year.
 */
function getDaysInHebrewMonth(month, year) {
    let yearLength = numberOfFirstDayInYear(year + 1) - numberOfFirstDayInYear(year);
    let yearType = (yearLength <= 380 ? yearLength : yearLength - 30) - 353;
    let leapYear = isHebrewLeapYear(year);
    let daysInMonth = leapYear
        ? [30, 29, 29, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29]
        : [30, 29, 29, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    if (yearType > 0) {
        daysInMonth[2]++; // Kislev gets an extra day in normal or complete years.
    }
    if (yearType > 1) {
        daysInMonth[1]++; // Heshvan gets an extra day in complete years only.
    }
    return daysInMonth[month - 1];
}
function getDayNumberInHebrewYear(date) {
    let numberOfDay = 0;
    for (let i = 1; i < date.month; i++) {
        numberOfDay += getDaysInHebrewMonth(i, date.year);
    }
    return numberOfDay + date.day;
}
function setHebrewMonth(date, val) {
    let after = val >= 0;
    if (!after) {
        val = -val;
    }
    while (val > 0) {
        if (after) {
            if (val > getHebrewMonths(date.year) - date.month) {
                val -= getHebrewMonths(date.year) - date.month + 1;
                date.year++;
                date.month = 1;
            }
            else {
                date.month += val;
                val = 0;
            }
        }
        else {
            if (val >= date.month) {
                date.year--;
                val -= date.month;
                date.month = getHebrewMonths(date.year);
            }
            else {
                date.month -= val;
                val = 0;
            }
        }
    }
    return date;
}
function setHebrewDay(date, val) {
    let after = val >= 0;
    if (!after) {
        val = -val;
    }
    while (val > 0) {
        if (after) {
            if (val > getDaysInHebrewYear(date.year) - getDayNumberInHebrewYear(date)) {
                val -= getDaysInHebrewYear(date.year) - getDayNumberInHebrewYear(date) + 1;
                date.year++;
                date.month = 1;
                date.day = 1;
            }
            else if (val > getDaysInHebrewMonth(date.month, date.year) - date.day) {
                val -= getDaysInHebrewMonth(date.month, date.year) - date.day + 1;
                date.month++;
                date.day = 1;
            }
            else {
                date.day += val;
                val = 0;
            }
        }
        else {
            if (val >= date.day) {
                val -= date.day;
                date.month--;
                if (date.month === 0) {
                    date.year--;
                    date.month = getHebrewMonths(date.year);
                }
                date.day = getDaysInHebrewMonth(date.month, date.year);
            }
            else {
                date.day -= val;
                val = 0;
            }
        }
    }
    return date;
}
/**
 * Returns the equivalent Hebrew date value for a give input Gregorian date.
 * `gdate` is a JS Date to be converted to Hebrew date.
 */
function fromGregorian$2(gdate) {
    const date = new Date(gdate);
    const gYear = date.getFullYear(), gMonth = date.getMonth(), gDay = date.getDate();
    let julianDay = GREGORIAN_EPOCH -
        1 +
        365 * (gYear - 1) +
        Math.floor((gYear - 1) / 4) -
        Math.floor((gYear - 1) / 100) +
        Math.floor((gYear - 1) / 400) +
        Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear(gYear) ? -1 : -2) + gDay);
    julianDay = Math.floor(julianDay + 0.5);
    let daysSinceHebEpoch = julianDay - 347997;
    let monthsSinceHebEpoch = Math.floor((daysSinceHebEpoch * PARTS_PER_DAY) / PARTS_PER_MONTH);
    let hYear = Math.floor((monthsSinceHebEpoch * 19 + 234) / 235) + 1;
    let firstDayOfThisYear = numberOfFirstDayInYear(hYear);
    let dayOfYear = daysSinceHebEpoch - firstDayOfThisYear;
    while (dayOfYear < 1) {
        hYear--;
        firstDayOfThisYear = numberOfFirstDayInYear(hYear);
        dayOfYear = daysSinceHebEpoch - firstDayOfThisYear;
    }
    let hMonth = 1;
    let hDay = dayOfYear;
    while (hDay > getDaysInHebrewMonth(hMonth, hYear)) {
        hDay -= getDaysInHebrewMonth(hMonth, hYear);
        hMonth++;
    }
    return new NgbDate(hYear, hMonth, hDay);
}
/**
 * Returns the equivalent JS date value for a given Hebrew date.
 * `hebrewDate` is an Hebrew date to be converted to Gregorian.
 */
function toGregorian$2(hebrewDate) {
    const hYear = hebrewDate.year;
    const hMonth = hebrewDate.month;
    const hDay = hebrewDate.day;
    let days = numberOfFirstDayInYear(hYear);
    for (let i = 1; i < hMonth; i++) {
        days += getDaysInHebrewMonth(i, hYear);
    }
    days += hDay;
    let diffDays = days - HEBREW_DAY_ON_JAN_1_1970;
    let after = diffDays >= 0;
    if (!after) {
        diffDays = -diffDays;
    }
    let gYear = 1970;
    let gMonth = 1;
    let gDay = 1;
    while (diffDays > 0) {
        if (after) {
            if (diffDays >= (isGregorianLeapYear(gYear) ? 366 : 365)) {
                diffDays -= isGregorianLeapYear(gYear) ? 366 : 365;
                gYear++;
            }
            else if (diffDays >= getDaysInGregorianMonth(gMonth, gYear)) {
                diffDays -= getDaysInGregorianMonth(gMonth, gYear);
                gMonth++;
            }
            else {
                gDay += diffDays;
                diffDays = 0;
            }
        }
        else {
            if (diffDays >= (isGregorianLeapYear(gYear - 1) ? 366 : 365)) {
                diffDays -= isGregorianLeapYear(gYear - 1) ? 366 : 365;
                gYear--;
            }
            else {
                if (gMonth > 1) {
                    gMonth--;
                }
                else {
                    gMonth = 12;
                    gYear--;
                }
                if (diffDays >= getDaysInGregorianMonth(gMonth, gYear)) {
                    diffDays -= getDaysInGregorianMonth(gMonth, gYear);
                }
                else {
                    gDay = getDaysInGregorianMonth(gMonth, gYear) - diffDays + 1;
                    diffDays = 0;
                }
            }
        }
    }
    return new Date(gYear, gMonth - 1, gDay);
}
function hebrewNumerals(numerals) {
    if (!numerals) {
        return '';
    }
    const hArray0_9 = ['', '\u05d0', '\u05d1', '\u05d2', '\u05d3', '\u05d4', '\u05d5', '\u05d6', '\u05d7', '\u05d8'];
    const hArray10_19 = [
        '\u05d9',
        '\u05d9\u05d0',
        '\u05d9\u05d1',
        '\u05d9\u05d2',
        '\u05d9\u05d3',
        '\u05d8\u05d5',
        '\u05d8\u05d6',
        '\u05d9\u05d6',
        '\u05d9\u05d7',
        '\u05d9\u05d8',
    ];
    const hArray20_90 = ['', '', '\u05db', '\u05dc', '\u05de', '\u05e0', '\u05e1', '\u05e2', '\u05e4', '\u05e6'];
    const hArray100_900 = [
        '',
        '\u05e7',
        '\u05e8',
        '\u05e9',
        '\u05ea',
        '\u05ea\u05e7',
        '\u05ea\u05e8',
        '\u05ea\u05e9',
        '\u05ea\u05ea',
        '\u05ea\u05ea\u05e7',
    ];
    const hArray1000_9000 = [
        '',
        '\u05d0',
        '\u05d1',
        '\u05d1\u05d0',
        '\u05d1\u05d1',
        '\u05d4',
        '\u05d4\u05d0',
        '\u05d4\u05d1',
        '\u05d4\u05d1\u05d0',
        '\u05d4\u05d1\u05d1',
    ];
    const geresh = '\u05f3', gershaim = '\u05f4';
    let mem = 0;
    let result = [];
    let step = 0;
    while (numerals > 0) {
        let m = numerals % 10;
        if (step === 0) {
            mem = m;
        }
        else if (step === 1) {
            if (m !== 1) {
                result.unshift(hArray20_90[m], hArray0_9[mem]);
            }
            else {
                result.unshift(hArray10_19[mem]);
            }
        }
        else if (step === 2) {
            result.unshift(hArray100_900[m]);
        }
        else {
            if (m !== 5) {
                result.unshift(hArray1000_9000[m], geresh, ' ');
            }
            break;
        }
        numerals = Math.floor(numerals / 10);
        if (step === 0 && numerals === 0) {
            result.unshift(hArray0_9[m]);
        }
        step++;
    }
    result = result.join('').split('');
    if (result.length === 1) {
        result.push(geresh);
    }
    else if (result.length > 1) {
        result.splice(result.length - 1, 0, gershaim);
    }
    return result.join('');
}

/**
 * @since 3.2.0
 */
class NgbCalendarHebrew extends NgbCalendar {
    getDaysPerWeek() {
        return 7;
    }
    getMonths(year) {
        if (year && isHebrewLeapYear(year)) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        }
        else {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
    }
    getWeeksPerMonth() {
        return 6;
    }
    isValid(date) {
        if (date != null) {
            let b = isNumber(date.year) && isNumber(date.month) && isNumber(date.day);
            b = b && date.month > 0 && date.month <= (isHebrewLeapYear(date.year) ? 13 : 12);
            b = b && date.day > 0 && date.day <= getDaysInHebrewMonth(date.month, date.year);
            return b && !isNaN(toGregorian$2(date).getTime());
        }
        return false;
    }
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date.year += number;
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = setHebrewMonth(date, number);
                date.day = 1;
                return date;
            case 'd':
                return setHebrewDay(date, number);
            default:
                return date;
        }
    }
    getPrev(date, period = 'd', number = 1) {
        return this.getNext(date, period, -number);
    }
    getWeekday(date) {
        const day = toGregorian$2(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    getWeekNumber(week, firstDayOfWeek) {
        const date = week[week.length - 1];
        return Math.ceil(getDayNumberInHebrewYear(date) / 7);
    }
    getToday() {
        return fromGregorian$2(new Date());
    }
    /**
     * @since 3.4.0
     */
    toGregorian(date) {
        return fromJSDate(toGregorian$2(date));
    }
    /**
     * @since 3.4.0
     */
    fromGregorian(date) {
        return fromGregorian$2(toJSDate(date));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarHebrew, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarHebrew, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarHebrew, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

const WEEKDAYS$1 = ['שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'ראשון'];
const MONTHS$1 = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
const MONTHS_LEAP = [
    'תשרי',
    'חשון',
    'כסלו',
    'טבת',
    'שבט',
    'אדר א׳',
    'אדר ב׳',
    'ניסן',
    'אייר',
    'סיון',
    'תמוז',
    'אב',
    'אלול',
];
/**
 * @since 3.2.0
 */
class NgbDatepickerI18nHebrew extends NgbDatepickerI18n {
    getMonthShortName(month, year) {
        return this.getMonthFullName(month, year);
    }
    getMonthFullName(month, year) {
        return isHebrewLeapYear(year) ? MONTHS_LEAP[month - 1] || '' : MONTHS$1[month - 1] || '';
    }
    getWeekdayLabel(weekday, width) {
        return WEEKDAYS$1[weekday - 1] || '';
    }
    getDayAriaLabel(date) {
        return `${hebrewNumerals(date.day)} ${this.getMonthFullName(date.month, date.year)} ${hebrewNumerals(date.year)}`;
    }
    getDayNumerals(date) {
        return hebrewNumerals(date.day);
    }
    getWeekNumerals(weekNumber) {
        return hebrewNumerals(weekNumber);
    }
    getYearNumerals(year) {
        return hebrewNumerals(year);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerI18nHebrew, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerI18nHebrew, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerI18nHebrew, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

/**
 * Returns the equivalent JS date value for a give input Buddhist date.
 * `date` is an Buddhist date to be converted to Gregorian.
 */
function toGregorian$1(date) {
    return new Date(date.year - 543, date.month - 1, date.day);
}
/**
 * Returns the equivalent Buddhist date value for a give input Gregorian date.
 * `gdate` is a JS Date to be converted to Buddhist.
 * utc to local
 */
function fromGregorian$1(gdate) {
    return new NgbDate(gdate.getFullYear() + 543, gdate.getMonth() + 1, gdate.getDate());
}

/**
 * @since 9.1.0
 */
class NgbCalendarBuddhist extends NgbCalendarGregorian {
    getToday() {
        return fromGregorian$1(new Date());
    }
    getNext(date, period = 'd', number = 1) {
        let jsDate = toGregorian$1(date);
        let checkMonth = true;
        let expectedMonth = jsDate.getMonth();
        switch (period) {
            case 'y':
                jsDate.setFullYear(jsDate.getFullYear() + number);
                break;
            case 'm':
                expectedMonth += number;
                jsDate.setMonth(expectedMonth);
                expectedMonth = expectedMonth % 12;
                if (expectedMonth < 0) {
                    expectedMonth = expectedMonth + 12;
                }
                break;
            case 'd':
                jsDate.setDate(jsDate.getDate() + number);
                checkMonth = false;
                break;
            default:
                return date;
        }
        if (checkMonth && jsDate.getMonth() !== expectedMonth) {
            // this means the destination month has less days than the initial month
            // let's go back to the end of the previous month:
            jsDate.setDate(0);
        }
        return fromGregorian$1(jsDate);
    }
    getPrev(date, period = 'd', number = 1) {
        return this.getNext(date, period, -number);
    }
    getWeekday(date) {
        let jsDate = toGregorian$1(date);
        let day = jsDate.getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        let date = week[thursdayIndex];
        const jsDate = toGregorian$1(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        const time = jsDate.getTime();
        jsDate.setMonth(0); // Compare with Jan 1
        jsDate.setDate(1);
        return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
    }
    isValid(date) {
        if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
            return false;
        }
        // year 0 doesn't exist in Gregorian calendar
        if (date.year === 0) {
            return false;
        }
        const jsDate = toGregorian$1(date);
        return (!isNaN(jsDate.getTime()) &&
            jsDate.getFullYear() === date.year - 543 &&
            jsDate.getMonth() + 1 === date.month &&
            jsDate.getDate() === date.day);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarBuddhist, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarBuddhist, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarBuddhist, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

const JD_EPOCH = 1724220.5;
const DAYSPERMONTH = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 5];
/**
 * Determine whether this date is in a leap year.
 * * `year` is the year to examine
 * returns boolean - true if this is a leap year, false if not
 * */
function isEthiopianLeapYear(year) {
    if (year != null) {
        return year % 4 == 3 || year % 4 == -1;
    }
    return false;
}
/**
 * Sets the Ethiopian year.
 * * `date` is Ethiopian date
 * * `yearValue` incremented year
 * returns NgbDate - ethiopian date
 * */
function setEthiopianYear(date, yearValue) {
    date.year = +yearValue;
    return date;
}
/**
 * Sets the Ethiopian month.
 * * `date` is Ethiopian date
 * * `val` incremented month
 * returns NgbDate - Ethiopian date
 * */
function setEthiopianMonth(date, val) {
    val = +val;
    date.year = date.year + Math.floor((val - 1) / 13);
    date.month = Math.floor((((val - 1) % 13) + 13) % 13) + 1;
    return date;
}
/**
 * Sets the Ethiopian day.
 * * `date` is Ethiopian date
 * * `day` incremented day
 * returns NgbDate - Ethiopian date
 * */
function setEthiopianDay(date, day) {
    let mDays = getDaysPerMonth(date.month, date.year);
    if (day <= 0) {
        while (day <= 0) {
            date = setEthiopianMonth(date, date.month - 1);
            mDays = getDaysPerMonth(date.month, date.year);
            day += mDays;
        }
    }
    else if (day > mDays) {
        while (day > mDays) {
            day -= mDays;
            date = setEthiopianMonth(date, date.month + 1);
            mDays = getDaysPerMonth(date.month, date.year);
        }
    }
    date.day = day;
    return date;
}
function getDaysPerMonth(month, year) {
    let leapYear = isEthiopianLeapYear(year);
    return DAYSPERMONTH[month - 1] + (month === 13 && leapYear ? 1 : 0);
}
function toGregorian(ethiopianDate) {
    let jdn = ethiopianToJulian(ethiopianDate.year, ethiopianDate.month, ethiopianDate.day);
    let date = julianToGregorian(jdn);
    date.setHours(6, 30, 3, 200);
    return date;
}
function fromGregorian(gdate) {
    let g2d = gregorianToJulian(gdate.getFullYear(), gdate.getMonth() + 1, gdate.getDate());
    return juilianToEthiopia(g2d);
}
function ethiopianToJulian(year, month, day) {
    if (year < 0) {
        year++;
    } // No year zero
    return day + (month - 1) * 30 + (year - 1) * 365 + Math.floor(year / 4) + JD_EPOCH - 1;
}
function juilianToEthiopia(jd) {
    let c = Math.floor(jd) + 0.5 - JD_EPOCH;
    let year = Math.floor((c - Math.floor((c + 366) / 1461)) / 365) + 1;
    if (year <= 0) {
        year--;
    } // No year zero
    c = Math.floor(jd) + 0.5 - ethiopianToJulian(year, 1, 1);
    let month = Math.floor(c / 30) + 1;
    let day = c - (month - 1) * 30 + 1;
    return new NgbDate(year, month, day);
}
function julianToGregorian(jd) {
    let z = Math.floor(jd + 0.5);
    let a = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + a - Math.floor(a / 4);
    let b = a + 1524;
    let c = Math.floor((b - 122.1) / 365.25);
    let d = Math.floor(365.25 * c);
    let e = Math.floor((b - d) / 30.6001);
    let day = b - d - Math.floor(e * 30.6001);
    let month = e - (e > 13.5 ? 13 : 1);
    let year = c - (month > 2.5 ? 4716 : 4715);
    if (year <= 0) {
        year--;
    } // No year zero
    return new Date(year, month, day);
}
function gregorianToJulian(year, month, day) {
    if (year < 0) {
        year++;
    } // No year zero
    // Jean Meeus algorithm, "Astronomical Algorithms", 1991
    if (month < 3) {
        month += 12;
        year--;
    }
    let a = Math.floor(year / 100);
    let b = 2 - a + Math.floor(a / 4);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
}

/**
 * @since 16.0.0
 */
class NgbCalendarEthiopian extends NgbCalendar {
    getDaysPerWeek() {
        return 7;
    }
    getMonths(year) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    }
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date = setEthiopianYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = setEthiopianMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return setEthiopianDay(date, date.day + number);
            default:
                return date;
        }
    }
    getPrev(date, period = 'd', number = 1) {
        return this.getNext(date, period, -number);
    }
    getWeekday(date) {
        const dt = Math.floor(ethiopianToJulian(date.year, date.month, date.day) + 3) % 7;
        return dt === 0 ? 7 : dt;
    }
    getWeekNumber(week, firstDayOfWeek) {
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        const date = week[thursdayIndex];
        const jsDate = toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        const time = jsDate.getTime();
        const startDate = toGregorian(new NgbDate(date.year, 1, 1));
        return Math.floor(Math.round((time - startDate.getTime()) / 86400000) / 7) + 1;
    }
    getWeeksPerMonth() {
        return 6;
    }
    getToday() {
        return fromGregorian(new Date());
    }
    isValid(date) {
        return (date &&
            isInteger(date.year) &&
            isInteger(date.month) &&
            isInteger(date.day) &&
            !isNaN(toGregorian(date).getTime()));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarEthiopian, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarEthiopian, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCalendarEthiopian, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

const WEEKDAYS = ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሓሙስ', 'ዓርብ', 'ቅዳሜ'];
const MONTHS = ['መስከረም', 'ጥቅምት', 'ኅዳር', 'ታህሣሥ', 'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'];
/**
 * @since 16.0.0
 */
class NgbDatepickerI18nAmharic extends NgbDatepickerI18n {
    getMonthShortName(month, year) {
        return this.getMonthFullName(month, year);
    }
    getMonthFullName(month, year) {
        return MONTHS[month - 1];
    }
    getWeekdayLabel(weekday, width) {
        return WEEKDAYS[weekday - 1];
    }
    getDayAriaLabel(date) {
        return `${date.day} ${this.getMonthFullName(date.month, date.year)} ${date.year}`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerI18nAmharic, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerI18nAmharic, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerI18nAmharic, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

/**
 * [`NgbDateAdapter`](#/components/datepicker/api#NgbDateAdapter) implementation that uses
 * native javascript dates as a user date model.
 */
class NgbDateNativeAdapter extends NgbDateAdapter {
    /**
     * Converts a native `Date` to a `NgbDateStruct`.
     */
    fromModel(date) {
        return date instanceof Date && !isNaN(date.getTime()) ? this._fromNativeDate(date) : null;
    }
    /**
     * Converts a `NgbDateStruct` to a native `Date`.
     */
    toModel(date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)
            ? this._toNativeDate(date)
            : null;
    }
    _fromNativeDate(date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    _toNativeDate(date) {
        const jsDate = new Date(date.year, date.month - 1, date.day, 12);
        // avoid 30 -> 1930 conversion
        jsDate.setFullYear(date.year);
        return jsDate;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDateNativeAdapter, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbDateNativeAdapter, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDateNativeAdapter, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

/**
 * Same as [`NgbDateNativeAdapter`](#/components/datepicker/api#NgbDateNativeAdapter), but with UTC dates.
 *
 * @since 3.2.0
 */
class NgbDateNativeUTCAdapter extends NgbDateNativeAdapter {
    _fromNativeDate(date) {
        return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
    }
    _toNativeDate(date) {
        const jsDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
        // avoid 30 -> 1930 conversion
        jsDate.setUTCFullYear(date.year);
        return jsDate;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDateNativeUTCAdapter, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbDateNativeUTCAdapter, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDateNativeUTCAdapter, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

const NGB_DATEPICKER_DIRECTIVES = [NgbDatepicker, NgbDatepickerContent, NgbInputDatepicker, NgbDatepickerMonth];
class NgbDatepickerModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerModule, imports: [NgbDatepicker, NgbDatepickerContent, NgbInputDatepicker, NgbDatepickerMonth], exports: [NgbDatepicker, NgbDatepickerContent, NgbInputDatepicker, NgbDatepickerMonth] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDatepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: NGB_DATEPICKER_DIRECTIVES,
                    imports: NGB_DATEPICKER_DIRECTIVES,
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgbCalendar, NgbCalendarBuddhist, NgbCalendarEthiopian, NgbCalendarGregorian, NgbCalendarHebrew, NgbCalendarIslamicCivil, NgbCalendarIslamicUmalqura, NgbCalendarPersian, NgbDate, NgbDateAdapter, NgbDateNativeAdapter, NgbDateNativeUTCAdapter, NgbDateParserFormatter, NgbDateStructAdapter, NgbDatepicker, NgbDatepickerConfig, NgbDatepickerContent, NgbDatepickerI18n, NgbDatepickerI18nAmharic, NgbDatepickerI18nDefault, NgbDatepickerI18nHebrew, NgbDatepickerKeyboardService, NgbDatepickerModule, NgbDatepickerMonth, NgbInputDatepicker, NgbInputDatepickerConfig };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-datepicker.mjs.map
