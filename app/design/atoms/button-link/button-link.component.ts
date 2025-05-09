import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { ButtonKind, ElementSize, toButtonClasses } from '../_models/button';
import { Icon } from '../_models/icon';
import { IconComponent } from '../icon/icon.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'a[btn]',
  imports: [IconComponent],
  templateUrl: './button-link.component.html',
  styleUrl: './button-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
  },
})
export class ButtonLinkComponent {
  kind = input.required<ButtonKind>();
  text = input<string>();
  icon = input<Icon>();
  size = input<ElementSize>('MEDIUM');

  readonly host = inject(ElementRef<HTMLAnchorElement>);

  classes = computed(() => toButtonClasses(this.kind(), this.size()));
}
