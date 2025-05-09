/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl } from '@angular/forms';
import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { ElementKind } from 'src/app/design/atoms/_models/button';

export interface FormlyPasswordInterface {
  label?: string;
  className?: string;
  validators?: string[];
  disabled?: boolean;
}

export interface FormlyInterface<T> {
  key: Exclude<keyof T, symbol>;
  label?: string;
  required?: boolean;
  hide?: boolean;
  wrappers?: string[];
  className?: string;
  fieldGroupClassName?: string;
  validators?: string[];
  disabled?: boolean;
  showWrapperLabel?: boolean;
}

export interface FormlyOverviewSelectConfig<Model, Option>
  extends FormlyInterface<Model> {
  labelProp: keyof Option;
  valueProp?: keyof Option;
  sortProp?: keyof Option;
  sortDirection?: 'asc' | 'desc';
  campaign?: string;
  options$: Observable<Option[]>;
}

export type DisabledFunction<T> = (
  options: Observable<T[]>,
  formlyOptions: FormlyTemplateOptions,
  model: any,
  control: AbstractControl,
) => Observable<boolean[]>;

export interface FormlyOverviewDisabledSelectConfig<Model, Option>
  extends FormlyOverviewSelectConfig<Model, Option> {
  disabledExpression: DisabledFunction<Option>;
  tooltipMessage: string;
  warningMessage: string;
}

export type InputKind =
  | 'NUMBER'
  | 'STRING'
  | 'NAME'
  | 'NUMBER_FRACTION'
  | 'COLOR';

export interface FormlyInputConfig<T> extends FormlyInterface<T> {
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  parsers?: any;
  inputKind: InputKind;
}

export type FileFieldKind = 'IMAGE' | 'OTHER';

export interface FormlyFileConfig<T> extends FormlyInterface<T> {
  fileButtonType?: ElementKind;
  fileFieldKind?: FileFieldKind;
}

export interface StaticOption {
  label: string;
  value: string | number;
}

export interface FormlyCustomStringSelectConfig<T> extends FormlyInterface<T> {
  options: string[];
}

export interface FormlyCustomSelectConfig<T> extends FormlyInterface<T> {
  options: StaticOption[];
}

export interface FormlyCheckboxConfig<T> extends FormlyInterface<T> {
  defaultValue: boolean;
}

export interface FormlyDatepickerConfig<T> extends FormlyInterface<T> {}

export interface FormlyCustomSessionSelect<T> extends FormlyInterface<T> {}

export type LoadAutocompleteOptions<T> = (
  searchTerm: string,
  props: FormlyFieldConfig['props'],
  formControl: AbstractControl,
) => Observable<T[]>;

export interface CustomAutocompleteProps<T> {
  optionLabelProp: keyof T;
  optionValueProp: keyof T;
  optionKeyProp: keyof T;
  loadOptions: LoadAutocompleteOptions<T>;
  initialValue$?: Observable<T>;
}
export type FormlyAutocompleteConfig<Model, Option> = FormlyInterface<Model> &
  CustomAutocompleteProps<Option>;

export interface CustomTypeaheadProps<T> {
  getOptions: (searchTerm: string) => Observable<T[]>;
  optionLabelProp: keyof T;
  optionValueProp: keyof T;
  initialOption$: Observable<Partial<T> | null>;
  formatSearchTerm: (searchTerm: string | undefined) => string | undefined;
}

export type FormlyTypeaheadConfig<Model, Option> = FormlyInterface<Model> &
  CustomTypeaheadProps<Option>;
