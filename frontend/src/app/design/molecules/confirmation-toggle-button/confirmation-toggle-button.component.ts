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
import { HotkeyDirective } from '../../../_directives/hotkey.directive';
import {
  ButtonKind,
  ElementKind,
  ElementSize,
  toElementKind,
} from '../../atoms/_models/button';
import { Icon } from '../../atoms/_models/icon';
import { ButtonComponent } from '../../atoms/button/button.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-confirmation-toggle-button',
  templateUrl: './confirmation-toggle-button.component.html',
  styleUrls: ['./confirmation-toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, HotkeyDirective, ConfirmationModalComponent],
})
export class ConfirmationToggleButtonComponent {
  readonly itemToDelete = input.required<string>();
  readonly icon = input<Icon>();
  readonly text = input<string>();
  readonly enableHotkey = input<boolean>(true);
  readonly toggleType = input<ButtonKind>('DANGER-OUTLINE');
  readonly toggleSize = input<ElementSize>('MEDIUM');
  readonly cancelButtonType = input<ElementKind>('SECONDARY');

  readonly confirmButtonType = computed<ElementKind>(
    () => toElementKind(this.toggleType()) ?? 'DANGER',
  );

  readonly modalHeading = computed(() => `Delete ${this.itemToDelete()}?`);
  readonly modalBody = computed(
    () => `Are you sure you want to delete ${this.itemToDelete()}?`,
  );

  readonly modalService = inject(NgbModal);

  readonly confirm = output<void>();

  emitConfirmation() {
    this.confirm.emit();
  }

  openModal(content: TemplateRef<HTMLElement>) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-title',
      modalDialogClass: 'border border-info border-3 rounded mymodal',
    });
  }
}
