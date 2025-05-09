import { NgbDate } from '../ngb-date';
/**
 * Determine whether this date is in a leap year.
 * * `year` is the year to examine
 * returns boolean - true if this is a leap year, false if not
 * */
export declare function isEthiopianLeapYear(year: number): boolean;
/**
 * Sets the Ethiopian year.
 * * `date` is Ethiopian date
 * * `yearValue` incremented year
 * returns NgbDate - ethiopian date
 * */
export declare function setEthiopianYear(date: NgbDate, yearValue: number): NgbDate;
/**
 * Sets the Ethiopian month.
 * * `date` is Ethiopian date
 * * `val` incremented month
 * returns NgbDate - Ethiopian date
 * */
export declare function setEthiopianMonth(date: NgbDate, val: number): NgbDate;
/**
 * Sets the Ethiopian day.
 * * `date` is Ethiopian date
 * * `day` incremented day
 * returns NgbDate - Ethiopian date
 * */
export declare function setEthiopianDay(date: NgbDate, day: number): NgbDate;
export declare function toGregorian(ethiopianDate: NgbDate): Date;
export declare function fromGregorian(gdate: Date): NgbDate;
export declare function ethiopianToJulian(year: number, month: number, day: number): number;
export declare function gregorianToJulian(year: number, month: number, day: number): number;
