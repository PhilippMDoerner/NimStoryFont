import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { distinctUntilChanged, interval, map, startWith } from 'rxjs';
import { HotkeyDirective } from '../../../_directives/hotkey.directive';
import { ElementKind } from '../../atoms/_models/button';
import { Icon } from '../../atoms/_models/icon';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    FormlyModule,
    NgbTooltip,
    FormlyBootstrapModule,
    ReactiveFormsModule,
    NgTemplateOutlet,
    HotkeyDirective,
  ],
})
export class FormComponent<T> {
  readonly form = new FormGroup({});

  readonly model = input.required<T>();
  readonly fields = input.required<FormlyFieldConfig[]>();
  readonly enctype = input('application/x-www-form-urlencoded'); //Default form enctype in HTML5
  readonly enableSubmitButtons = input(true);
  readonly disabled = input(false);
  readonly submitButtonType = input<ElementKind>('PRIMARY');
  readonly cancelButtonType = input<ElementKind>('SECONDARY');
  readonly submitIcon = input<Icon>();
  readonly isLoading = input<boolean>(false);
  readonly disabledHotkeys = input<boolean>(false);

  readonly formlySubmit = output<NonNullable<T>>();
  readonly formlyCancel = output<void>();
  readonly formChange = output<Partial<T>>();

  readonly formErrors = toSignal(
    interval(1000).pipe(
      startWith([]),
      map(() => this.form.errors),
      distinctUntilChanged(),
      map((errors) => {
        if (errors == null) return [];

        return Object.keys(errors).map(
          (errorName) => errors[errorName].message as string,
        );
      }),
      distinctUntilChanged(),
    ),
  );

  readonly usedFields = computed<FormlyFieldConfig[]>(() => {
    return this.fields().map((field) => {
      return {
        ...field,
        props: {
          ...field.props,
          disabled: this.disabled() ? true : undefined,
        },
      } satisfies FormlyFieldConfig;
    });
  });

  constructor() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((event) => this.formChange.emit(event));
  }

  onSubmit(event: Event | undefined): void {
    event?.preventDefault(); //Prevent event from bubbling up
    const isValidForm = this.form.valid;
    if (!isValidForm) {
      return;
    }

    this.formlySubmit.emit(this.model() as NonNullable<T>);
  }

  onCancel(): void {
    this.formlyCancel.emit();
  }
}
