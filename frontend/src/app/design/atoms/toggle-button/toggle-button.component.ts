import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { AriaText } from 'src/app/_models/aria';
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
  readonly kind = input.required<ElementKind>();
  readonly inactiveElementKind = input<ButtonKind>('LIGHT-OUTLINE');
  readonly active = input.required<boolean>();
  readonly id = input.required<string>();
  readonly ariaText = input<AriaText>();
  readonly disabled = input<boolean>(false);
  readonly icon = input<Icon>();
  readonly text = input<string>();
  readonly size = input<ElementSize>('MEDIUM');
  readonly ariaControls = input<string>();

  readonly changed = output<boolean>();
}
