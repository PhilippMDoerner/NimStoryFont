import { EventEmitter } from '@angular/core';
import { MonthViewModel, NavigationEvent } from './datepicker-view-model';
import { NgbDate } from './ngb-date';
import { NgbDatepickerI18n } from './datepicker-i18n';
import * as i0 from "@angular/core";
export declare class NgbDatepickerNavigation {
    navigation: typeof NavigationEvent;
    i18n: NgbDatepickerI18n;
    date: NgbDate;
    disabled: boolean;
    months: MonthViewModel[];
    showSelect: boolean;
    prevDisabled: boolean;
    nextDisabled: boolean;
    selectBoxes: {
        years: number[];
        months: number[];
    };
    navigate: EventEmitter<NavigationEvent>;
    select: EventEmitter<NgbDate>;
    onClickPrev(event: MouseEvent): void;
    onClickNext(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerNavigation, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbDatepickerNavigation, "ngb-datepicker-navigation", never, { "date": { "alias": "date"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "months": { "alias": "months"; "required": false; }; "showSelect": { "alias": "showSelect"; "required": false; }; "prevDisabled": { "alias": "prevDisabled"; "required": false; }; "nextDisabled": { "alias": "nextDisabled"; "required": false; }; "selectBoxes": { "alias": "selectBoxes"; "required": false; }; }, { "navigate": "navigate"; "select": "select"; }, never, never, true, never>;
}
