import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CompareFormComponent } from '../../molecules/compare-form/compare-form.component';
import { FormComponent } from '../../molecules/form/form.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';
import { CreateUpdateState } from '../_models/create-update-states';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss'],
  imports: [
    PageContainerComponent,
    ButtonComponent,
    NgTemplateOutlet,
    FormComponent,
    CompareFormComponent,
    HotkeyDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUpdateComponent<Full, Raw> {
  readonly heading = input.required<string>();
  readonly state = input.required<CreateUpdateState>();
  readonly userModel = input<Full | Partial<Raw>>();
  readonly formlyFields = input.required<FormlyFieldConfig[]>();
  readonly serverModel = input.required<Full | undefined>();

  readonly create = output<NonNullable<Partial<Raw>>>();
  readonly update = output<NonNullable<Full>>();
  readonly cancelled = output<void>();

  onSubmit(submittedData: Partial<Raw> | Full): void {
    if (submittedData == null) return;
    switch (this.state()) {
      case 'CREATE':
        this.create.emit(submittedData as NonNullable<Full>);
        break;
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        this.update.emit(submittedData as NonNullable<Full>);
        break;
    }
  }

  onCancel() {
    this.cancelled.emit();
  }
}
