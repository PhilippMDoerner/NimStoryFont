import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { componentId } from '../../../../utils/DOM';
import { HotkeyDirective } from '../../../_directives/hotkey.directive';
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
  readonly heading = input.required<string>();
  readonly submitIcon = input<Icon>();
  readonly modalType = input<ElementKind>('PRIMARY');
  readonly cancelButtonType = input<ElementKind>('SECONDARY');
  readonly submitButtonLabel = input<string>('Yes');
  readonly cancelButtonLabel = input<string>('No');

  readonly confirm = output<void>();
  readonly modalClose = output<void>();

  readonly modalClass = computed(
    () => `modal-border--${this.modalType().toLowerCase()}`,
  );

  readonly id = componentId();
  readonly bodyId = `${this.id}-body`;
}
