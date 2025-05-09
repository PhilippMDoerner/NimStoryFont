import { NgbCalendar, NgbPeriod } from '../ngb-calendar';
import { NgbDate } from '../ngb-date';
import * as i0 from "@angular/core";
/**
 * @since 16.0.0
 */
export declare class NgbCalendarEthiopian extends NgbCalendar {
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
