import { AbstractControl } from '@angular/forms';
import { FormlyFieldConfigCache } from '../../models';
export declare function unregisterControl(field: FormlyFieldConfigCache, emitEvent?: boolean): void;
export declare function findControl(field: FormlyFieldConfigCache): AbstractControl;
export declare function registerControl(field: FormlyFieldConfigCache, control?: FormlyFieldConfigCache['formControl'], emitEvent?: boolean): void;
export declare function updateValidity(c: AbstractControl, onlySelf?: boolean): void;
export declare function clearControl(form: FormlyFieldConfigCache['formControl']): void;
