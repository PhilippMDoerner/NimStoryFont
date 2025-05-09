import { NgbDate } from './ngb-date';
import { NgbDatepickerI18n } from './datepicker-i18n';
import * as i0 from "@angular/core";
export declare class NgbDatepickerDayView {
    i18n: NgbDatepickerI18n;
    currentMonth: number;
    date: NgbDate;
    disabled: boolean;
    focused: boolean;
    selected: boolean;
    isMuted(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerDayView, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbDatepickerDayView, "[ngbDatepickerDayView]", never, { "currentMonth": { "alias": "currentMonth"; "required": false; }; "date": { "alias": "date"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "focused": { "alias": "focused"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, {}, never, never, true, never>;
}
