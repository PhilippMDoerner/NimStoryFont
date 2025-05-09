import { AfterViewChecked, ElementRef, EventEmitter } from '@angular/core';
import { NgbDate } from './ngb-date';
import { NgbDatepickerI18n } from './datepicker-i18n';
import * as i0 from "@angular/core";
export declare class NgbDatepickerNavigationSelect implements AfterViewChecked {
    private _month;
    private _year;
    i18n: NgbDatepickerI18n;
    date: NgbDate;
    disabled: boolean;
    months: number[];
    years: number[];
    select: EventEmitter<NgbDate>;
    monthSelect: ElementRef<HTMLSelectElement>;
    yearSelect: ElementRef<HTMLSelectElement>;
    changeMonth(month: string): void;
    changeYear(year: string): void;
    ngAfterViewChecked(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerNavigationSelect, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbDatepickerNavigationSelect, "ngb-datepicker-navigation-select", never, { "date": { "alias": "date"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "months": { "alias": "months"; "required": false; }; "years": { "alias": "years"; "required": false; }; }, { "select": "select"; }, never, never, true, never>;
}
