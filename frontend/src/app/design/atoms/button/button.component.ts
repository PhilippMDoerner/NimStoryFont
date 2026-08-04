import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { ButtonKind, ElementSize, toButtonClasses } from '../_models/button';
import { Icon } from '../_models/icon';
import { IconComponent } from '../icon/icon.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[btn]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, SpinnerComponent],
  host: {
    '[class]': 'classes()',
    '[type]': 'type()',
    '[attr.aria-disabled]': 'isLoading() || disabled()',
    '(click)': 'onClick($event)',
  },
})
export class ButtonComponent {
  readonly kind = input.required<ButtonKind>();
  readonly text = input<string>();
  readonly icon = input<Icon>();
  readonly size = input<ElementSize>('MEDIUM');
  readonly type = input<'button' | 'reset' | 'submit'>('button');
  readonly isLoading = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly hideBorder = input<boolean>(false);

  readonly clicked = output<MouseEvent>();

  onClick(event: MouseEvent) {
    if (!this.isLoading() && !this.disabled()) {
      this.clicked.emit(event);
    }
  }

  readonly disabledClass = computed(() => (this.disabled() ? 'disabled' : ''));
  readonly classes = computed(
    () =>
      toButtonClasses(this.kind(), this.size(), this.hideBorder()) +
      ` ${this.disabledClass()}`,
  );
}
