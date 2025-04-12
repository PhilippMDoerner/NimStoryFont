import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ButtonKind, ElementKind, ElementSize } from '../_models/button';
import { Icon } from '../_models/icon';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-toggle-button',
  imports: [ButtonComponent],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonComponent {
  kind = input.required<ElementKind>();
  inactiveElementKind = input<ButtonKind>('LIGHT-OUTLINE');
  active = input.required<boolean>();
  id = input.required<string>();
  ariaLabel = input<string>();
  disabled = input<boolean>(false);
  icon = input<Icon>();
  text = input<string>();
  size = input<ElementSize>('MEDIUM');
  ariaControls = input<string>();

  changed = output<boolean>();
}
