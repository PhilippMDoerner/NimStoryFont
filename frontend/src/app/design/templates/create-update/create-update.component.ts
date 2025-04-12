import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';
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
})
export class CreateUpdateComponent<Full, Raw> {
  heading = input.required<string>();
  state = input.required<CreateUpdateState>();
  userModel = input<Full | Partial<Raw>>();
  formlyFields = input.required<FormlyFieldConfig[]>();
  serverModel = input.required<Full | undefined>();

  create = output<NonNullable<Partial<Raw>>>();
  update = output<NonNullable<Full>>();
  cancelled = output<void>();

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
