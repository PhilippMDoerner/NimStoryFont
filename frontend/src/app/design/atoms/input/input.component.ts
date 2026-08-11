import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  linkedSignal,
  output,
  viewChild,
} from '@angular/core';
import { componentId } from '../../../../utils/DOM';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.active]': '!!_value()',
  },
})
export class InputComponent {
  readonly value = input<string>('');
  readonly label = input.required<string>();
  readonly labelId = input<string>();
  readonly ariaControls = input<string>();
  readonly disabled = input<boolean>(false);
  readonly autofocus = input<boolean>(false);
  readonly type = input<'text' | 'number' | 'search'>('text');

  readonly changed = output<string>();

  readonly input = viewChild.required<ElementRef<HTMLInputElement>>('input');
  readonly _value = linkedSignal(() => this.value());
  readonly searchId = componentId();

  focus() {
    this.input().nativeElement.focus();
  }

  emitValue(value: string) {
    if (!this.disabled()) {
      this._value.set(value);
      this.changed.emit(value);
    }
  }
}
