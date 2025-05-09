import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
} from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AlertComponent } from 'src/app/design/atoms/alert/alert.component';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import { SeparatorComponent } from 'src/app/design/atoms/separator/separator.component';
import { FormComponent } from '../form/form.component';
@Component({
  selector: 'app-compare-form',
  templateUrl: './compare-form.component.html',
  styleUrls: ['./compare-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AlertComponent, SeparatorComponent, FormComponent, IconComponent],
})
export class CompareFormComponent<
  T extends { update_datetime: string | undefined },
> implements OnInit
{
  fields = input.required<FormlyFieldConfig[]>();
  modelFromUser = input.required<T>();
  modelFromServer = input.required<T | undefined>();
  displayVertically = input(false);
  enctype = input('application/x-www-form-urlencoded'); //Default form enctype in HTML5

  readonly formlySubmit = output<NonNullable<T>>();
  readonly formlyCancel = output<void>();

  ngOnInit(): void {
    this.markFieldDifferences();
  }

  /**
   * Purpose is to have the user-assigned fields that don't match
   * the server side marked so they can see differences.
   */
  markFieldDifferences() {
    for (const field of this.fields()) {
      const fieldName: string | undefined = field.key?.toString();

      const hasFieldName = fieldName != null;
      if (!hasFieldName) {
        throw "CompareFormContainer - Trying to have form with fields that don't have keys";
      }

      const userModelValue = (this.modelFromUser() as Record<string, unknown>)[
        fieldName
      ];
      const serverModelValue = (
        this.modelFromServer() as Record<string, unknown>
      )[fieldName];

      const hasDifference = userModelValue != serverModelValue;
      if (!hasDifference) {
        continue;
      }

      field.className = 'updated';
    }
  }

  onCancel() {
    this.formlyCancel.emit();
  }

  onSubmit() {
    //Update the "update_datetime" field of the user-model
    const serverModel = this.modelFromServer();
    if (serverModel) {
      this.modelFromUser().update_datetime = serverModel.update_datetime;
    }
    this.formlySubmit.emit(this.modelFromUser() as NonNullable<T>);
  }
}
