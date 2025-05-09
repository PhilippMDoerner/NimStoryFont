import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, map, of } from 'rxjs';
import {
  CustomTypeaheadProps,
  FormlyCheckboxConfig,
  FormlyDatepickerConfig,
  FormlyFileConfig,
  FormlyInputConfig,
  FormlyInterface,
  FormlyOverviewDisabledSelectConfig,
  FormlyOverviewSelectConfig,
  FormlyPasswordInterface,
  FormlyCustomSelectConfig as FormlyStaticSelectConfig,
  FormlyCustomStringSelectConfig as FormlyStaticStringSelectConfig,
  FormlyTypeaheadConfig,
  StaticOption,
} from 'src/app/_models/formly';
import { FormlySelectDisableFieldComponent } from 'src/app/design/organisms/formly-select-disable/formly-select-disable-field.component';
import { sortByProp } from 'src/utils/array';
import { capitalize } from 'src/utils/string';

@Injectable({
  providedIn: 'root',
})
export class FormlyService {
  buildOverviewSelectConfig<Model, Option>(
    config: FormlyOverviewSelectConfig<Model, Option>,
  ): FormlyFieldConfig {
    const isRequiredField = config.required ?? true;

    const options$ = isRequiredField
      ? config.options$
      : this.addEmptyOption(config.options$, config);
    const sortedOptions$ = this.sortOptions(options$, config);

    const validators = this.getValidators(config);

    return {
      key: config.key,
      type: 'select',
      className: config.className,
      wrappers: config.wrappers,
      hideExpression: config.hide,
      props: {
        label: config.label ?? capitalize(`${config.key}`),
        labelProp: config.labelProp,
        valueProp: config.valueProp ?? 'pk',
        options: sortedOptions$,
        required: config.required ?? true,
        disabled: config.disabled,
      },
      validators: {
        validation: validators,
      },
    };
  }

  buildDisableSelectConfig<Model, Option>(
    config: FormlyOverviewDisabledSelectConfig<Model, Option>,
  ): FormlyFieldConfig {
    const isRequiredField = config.required ?? true;

    const options$ = isRequiredField
      ? config.options$
      : this.addEmptyOption(config.options$, config);
    const sortedOptions$ = this.sortOptions(options$, config);

    const validators = this.getValidators(config);
    return {
      key: config.key,
      type: 'select-disable',
      className: config.className,
      wrappers: config.wrappers,
      hideExpression: config.hide ?? false,
      props: {
        label: config.label ?? capitalize(`${config.key}`),
        labelProp: config.labelProp,
        valueProp: config.valueProp ?? 'pk',
        options: sortedOptions$,
        required: config.required ?? true,
        warningMessage: config.warningMessage,
        additionalProperties: {
          disabledExpression: config.disabledExpression,
          tooltipMessage: config.tooltipMessage ?? '',
          showWrapperLabel: config.showWrapperLabel ?? true,
        },
      },
      validators: {
        validation: validators,
      },
    } satisfies FormlyFieldConfig;
  }

  buildStaticSelectConfig<T>(
    config: FormlyStaticSelectConfig<T>,
  ): FormlyFieldConfig {
    const validators = this.getValidators(config);

    return {
      key: config.key,
      type: 'select',
      className: config.className,
      wrappers: config.wrappers,
      hideExpression: config.hide ?? false,
      props: {
        label: config.label ?? capitalize(`${config.key}`),
        options: config.options,
        required: config.required ?? true,
        disabled: config.disabled,
      },
      validators: {
        validation: validators,
      },
    };
  }

  buildStaticStringSelectConfig<T>(
    partialConfig: FormlyStaticStringSelectConfig<T>,
  ): FormlyFieldConfig {
    const optionStrings: string[] = partialConfig.options;

    const options: StaticOption[] = optionStrings.map((str) => {
      return { label: str, value: str };
    });

    const config: FormlyStaticSelectConfig<T> = {
      ...partialConfig,
      options,
    };

    return this.buildStaticSelectConfig(config);
  }

  buildInputConfig<T>(config: FormlyInputConfig<T>): FormlyFieldConfig {
    const validators = this.getValidators(config);
    switch (config.inputKind) {
      case 'NUMBER':
        validators.push('notInteger');
        break;
      case 'NAME':
        //Why 'hasSpecialCharacters' validation? Names are used in URLs, they mustn't have special characters
        validators.push('hasSpecialCharacters');
        break;
      case 'NUMBER_FRACTION':
        validators.push('notNumber');
        break;
      case 'COLOR':
        break;
    }

    let innerInputType: 'string' | 'number' | 'color';
    switch (config.inputKind) {
      case 'NUMBER':
        innerInputType = 'number';
        break;
      case 'COLOR':
        innerInputType = 'color';
        break;
      default:
        innerInputType = 'string';
    }

    return {
      key: config.key,
      type: 'input',
      className: config.className,
      wrappers: config.wrappers,
      hideExpression: config.hide ?? false,
      parsers: config.parsers,
      props: {
        maxLength: config.maxLength,
        max: config.max,
        minLength: config.minLength,
        min: config.min,
        label: config.label ?? capitalize(`${config.key}`),
        type: innerInputType,
        required: config.required ?? true,
        disabled: !!config.disabled,
        placeholder: config.placeholder ?? undefined,
      },
      validators: {
        validation: validators,
      },
    };
  }

  buildSinglePasswordConfig<T>(config: FormlyInterface<T>): FormlyFieldConfig {
    const validators = this.getValidators(config);

    return {
      key: config.key,
      type: 'input',
      className: config.className,
      fieldGroupClassName: config.fieldGroupClassName,
      props: {
        label: config.label ?? 'Password',
        type: 'password',
        required: true,
        placeholder: 'Your password',
        disabled: config.disabled,
      },
      validators: {
        validation: validators,
      },
    };
  }

  buildConfirmedPasswordConfig(
    config: FormlyPasswordInterface,
  ): FormlyFieldConfig {
    const validators = config.validators ?? [];
    validators.push('required');

    const passwordField = {
      key: 'password', //Hard coded, fieldMatch validator depends on this
      type: 'input',
      className: config.className,
      props: {
        label: config.label ?? 'Password',
        type: 'password',
        required: true,
        placeholder: 'Password, at least 7 characters',
        disabled: config.disabled,
      },
      validators: {
        validation: validators,
      },
    };

    const confirmPasswordField = {
      key: 'passwordConfirm', //Hard coded, fieldMatch validator depends on this
      type: 'input',
      className: config.className,
      props: {
        label: config.label
          ? 'Confirm ' + config.label
          : 'Password Confirmation',
        type: 'password',
        required: true,
        placeholder: 'Please re-enter your password',
        disabled: config.disabled,
      },
    };

    return {
      validators: {
        validation: [
          { name: 'fieldMatch', options: { errorPath: 'passwordConfirm' } },
        ],
      },
      fieldGroup: [passwordField, confirmPasswordField],
    };
  }

  buildCheckboxConfig<T>(config: FormlyCheckboxConfig<T>): FormlyFieldConfig {
    return {
      key: config.key,
      type: 'checkbox',
      className: config.className,
      wrappers: config.wrappers,
      defaultValue: config.defaultValue,
      hideExpression: config.hide,
      props: {
        label: config.label ?? capitalize(`${config.key}`),
        required: config.required ?? true,
        disabled: config.disabled,
      },
    };
  }

  buildDatepickerConfig<T>(
    config: FormlyDatepickerConfig<T>,
  ): FormlyFieldConfig {
    const validators = this.getValidators(config);
    validators.push('date');

    return {
      key: config.key,
      type: 'datepicker',
      className: config.className,
      wrappers: config.wrappers,
      hideExpression: config.hide,
      props: {
        label: config.label ?? capitalize(`${config.key}`),
        required: config.required ?? true,
        disabled: config.disabled,
      },
      validators: {
        validation: validators,
      },
    };
  }

  buildFileFieldConfig<T>(config: FormlyFileConfig<T>): FormlyFieldConfig {
    const validators = this.getValidators(config);

    return {
      key: config.key,
      type: 'file',
      className: config.className,
      wrappers: config.wrappers,
      hideExpression: config.hide,
      props: {
        buttonType: config.fileButtonType ?? 'SECONDARY',
        fileFieldKind: config.fileFieldKind ?? 'IMAGE',
        label: config.label ?? capitalize(`${config.key}`),
        required: config.required ?? true,
        disabled: !!config.disabled,
      },
      validators: {
        validation: validators,
      },
    };
  }

  buildEditorConfig<T>(config: FormlyInterface<T>): FormlyFieldConfig {
    const validators = this.getValidators(config);

    return {
      key: config.key,
      type: 'text-editor',
      className: config.className,
      wrappers: config.wrappers,
      hideExpression: config.hide,
      props: {
        label: config.label ?? capitalize(`${config.key}`),
        required: config.required ?? true,
        disabled: config.disabled,
      },
      validators: {
        validation: validators,
      },
    };
  }

  buildTypeaheadConfig<Model, Option>(
    config: FormlyTypeaheadConfig<Model, Option>,
  ): FormlyFieldConfig {
    const validators = this.getValidators(config);

    return {
      key: config.key,
      type: 'typeahead',
      className: config.className,
      wrappers: [...(config.wrappers ?? []), 'form-field'],
      props: {
        label: config.label ?? capitalize(`${config.key}`),
        required: config.required ?? true,
        disabled: config.disabled,
        placeholder: 'Type to receive suggestions',
        additionalProperties: {
          getOptions: config.getOptions,
          optionLabelProp: config.optionLabelProp,
          optionValueProp: config.optionValueProp,
          initialOption$: config.initialOption$,
          formatSearchTerm: config.formatSearchTerm,
        } satisfies CustomTypeaheadProps<Option>,
      },
      validators: {
        validation: validators,
      },
    };
  }

  /**
   * Convenience method to quickly turn a form of fields used to
   * create entries into one for updating entries.
   * Some fields are forbidden to be part of update forms and so they
   * will be filtered out of the form. These are:
   * - File Fields: The Browser does not allow to assign values to a file field
   *    Trying to do so will cause errors and crashes
   */
  toUpdateForm(fields: FormlyFieldConfig[]): FormlyFieldConfig[] {
    return fields.filter((field) => {
      const isFileField = field.type === 'file';
      return !isFileField;
    });
  }

  private getValidators<T>(config: FormlyInterface<T>) {
    const validators = config.validators ?? [];
    if (config.required) {
      validators.push('required');
    }

    return validators;
  }

  private addEmptyOption<Model, Option>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    list: Observable<any[]> | any[],
    config: FormlyOverviewSelectConfig<Model, Option>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<any[]> {
    if (Array.isArray(list)) {
      return of([this.createEmptyOption(config), ...list]);
    } else {
      return list.pipe(
        map((values) => [this.createEmptyOption(config), ...values]),
      );
    }
  }

  private createEmptyOption<Model, Option>(
    config: FormlyOverviewSelectConfig<Model, Option>,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const emptyOption: any = {};
    emptyOption[config.labelProp] =
      FormlySelectDisableFieldComponent.EMPTY_OPTION_LABEL;
    const valueProp = config.valueProp ?? config.key;
    emptyOption[valueProp] =
      FormlySelectDisableFieldComponent.EMPTY_OPTION_VALUE;
    return emptyOption;
  }

  private sortOptions<Model, Option>(
    list$: Observable<Option[]>,
    config: FormlyOverviewSelectConfig<Model, Option>,
  ): Observable<Option[]> {
    const { sortProp, sortDirection } = config;
    if (!sortProp) return list$;

    return list$.pipe(
      map((list) => sortByProp(list, sortProp, sortDirection ?? 'asc')),
    );
  }
}
