/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  signal,
} from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { FieldType } from '@ngx-formly/bootstrap/form-field';
import {
  FieldTypeConfig,
  FormlyFieldConfig,
  FormlyModule,
} from '@ngx-formly/core';
import { Observable, combineLatest, map } from 'rxjs';
import { DisabledFunction } from 'src/app/_models/formly';
import { InfoCircleTooltipComponent } from 'src/app/design/atoms/info-circle-tooltip/info-circle-tooltip.component';

interface CanDisableOption {
  enabled: boolean;
  value: any;
}

// The "solution": Make "disabledExpression" so that it returns an observable and then use switchMap within ngOnInit.
// That way the disabledExpression callback can reactively insert its own data into everything

@Component({
  selector: 'app-formly-select-disable',
  templateUrl: './formly-select-disable-field.component.html',
  styleUrls: ['./formly-select-disable-field.component.scss'],
  imports: [
    InfoCircleTooltipComponent,
    ReactiveFormsModule,
    FormlyModule,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlySelectDisableFieldComponent
  extends FieldType<FieldTypeConfig>
  implements OnInit, OnChanges
{
  public static EMPTY_OPTION_LABEL = '------';
  public static EMPTY_OPTION_VALUE = null;

  selectOptions$!: Observable<CanDisableOption[]>;
  modelValue = signal<any>(undefined);

  ngOnInit(): void {
    const templateOptions: Pick<FormlyFieldConfig, 'props'> = {
      props: this.props,
    };
    const formControl: AbstractControl = this.formControl;
    const model = this.model;
    const options$ = this.props.options as Observable<any[]>;
    const areObservableOptions: boolean = options$ instanceof Observable;
    if (!areObservableOptions) {
      throw "InvalidSelectOptionsException. You tried to create a FormlySelectDisableComponent - field, but provided an option that wasn't an Observable!";
    }

    const isDisabledFunction = this.props['additionalProperties']
      .disabledExpression as DisabledFunction<any>;
    const isOptionDisabled$ = isDisabledFunction(
      options$,
      templateOptions,
      formControl,
      model,
    );

    this.selectOptions$ = combineLatest({
      options: options$,
      isDisabledList: isOptionDisabled$,
    }).pipe(
      map(({ options, isDisabledList }) => {
        return options.map((opt, index) => ({
          value: opt,
          enabled: !isDisabledList[index],
        }));
      }),
    );

    this.setModelValue();
  }

  ngOnChanges() {
    this.setModelValue();
  }

  setModelValue() {
    const key: string = this.key as string;
    const model = this.field.model;
    this.modelValue.set(model[key]);
  }
}
