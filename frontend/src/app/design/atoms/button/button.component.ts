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
  kind = input.required<ButtonKind>();
  text = input<string>();
  icon = input<Icon>();
  size = input<ElementSize>('MEDIUM');
  type = input<'button' | 'reset' | 'submit'>('button');
  isLoading = input<boolean>(false);
  disabled = input<boolean>(false);

  clicked = output<MouseEvent>();

  onClick(event: MouseEvent) {
    if (!this.isLoading() && !this.disabled()) {
      this.clicked.emit(event);
    }
  }

  disabledClass = computed(() => (this.disabled() ? 'disabled' : ''));
  classes = computed(
    () =>
      toButtonClasses(this.kind(), this.size()) + ` ${this.disabledClass()}`,
  );
}
