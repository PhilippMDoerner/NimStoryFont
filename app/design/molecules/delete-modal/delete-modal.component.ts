import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { componentId } from 'src/utils/DOM';
import { ElementKind } from '../../atoms/_models/button';
import { Icon } from '../../atoms/_models/icon';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-delete-modal',
  imports: [ButtonComponent, HotkeyDirective],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteModalComponent {
  heading = input.required<string>();
  submitIcon = input<Icon>();
  modalType = input<ElementKind>('PRIMARY');
  cancelButtonType = input<ElementKind>('SECONDARY');
  submitButtonLabel = input<string>('Yes');
  cancelButtonLabel = input<string>('No');

  readonly confirm = output<void>();
  readonly modalClose = output<void>();

  modalClass = computed(
    () => `modal-border--${this.modalType().toLowerCase()}`,
  );

  id = componentId();
  bodyId = `${this.id}-body`;
}
