import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { IconComponent } from 'src/app/design//atoms/icon/icon.component';
import { FormComponent } from 'src/app/design//molecules/form/form.component';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { GRAPH_SETTINGS } from 'src/app/design/organisms/_model/graph';

@Component({
  selector: 'app-graph-settings-modal',
  imports: [ButtonComponent, FormComponent, IconComponent],
  templateUrl: './graph-settings-modal.component.html',
  styleUrl: './graph-settings-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphSettingsModalComponent {
  modalService = inject(NgbModal);
  formlyService = inject(FormlyService);

  settings = input(GRAPH_SETTINGS);

  newSettings = output<typeof GRAPH_SETTINGS>();

  formlyFields = computed<FormlyFieldConfig[]>(() => [
    this.formlyService.buildInputConfig<typeof GRAPH_SETTINGS>({
      key: 'linkAttractingForce',
      inputKind: 'NUMBER_FRACTION',
      label: 'Strength of links pulling nodes together (0-3)',
      max: 3,
      min: 0,
    }),
    this.formlyService.buildInputConfig<typeof GRAPH_SETTINGS>({
      key: 'nodeRepellingForce',
      inputKind: 'NUMBER_FRACTION',
      label: 'Strength of nodes repelling each other',
    }),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSettingsSubmit(model: any) {
    const newSettings: typeof GRAPH_SETTINGS = {
      ...model,
      linkAttractingForce: parseFloat(model.linkAttractingForce),
      nodeRepellingForce: parseFloat(model.nodeRepellingForce),
    };

    this.newSettings.emit(newSettings);

    this.modalService.dismissAll();
  }

  openModal(content: TemplateRef<HTMLElement>) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-title',
      modalDialogClass: 'border border-info border-3 rounded mymodal',
    });
  }
}
