import { NgbDatepickerI18n } from '../datepicker-i18n';
import { NgbDateStruct } from '../../index';
import * as i0 from "@angular/core";
/**
 * @since 16.0.0
 */
export declare class NgbDatepickerI18nAmharic extends NgbDatepickerI18n {
    getMonthShortName(month: number, year?: number | undefined): string;
    getMonthFullName(month: number, year?: number | undefined): string;
    getWeekdayLabel(weekday: number, width?: Intl.DateTimeFormatOptions['weekday']): string;
    getDayAriaLabel(date: NgbDateStruct): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerI18nAmharic, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDatepickerI18nAmharic>;
}
