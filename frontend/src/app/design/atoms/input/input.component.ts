import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  linkedSignal,
  output,
  viewChild,
} from '@angular/core';
import { componentId } from 'src/utils/DOM';

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
  value = input<string>('');
  label = input.required<string>();
  labelId = input<string>();
  ariaControls = input<string>();
  disabled = input<boolean>(false);
  type = input<'text' | 'number' | 'search'>('text');

  changed = output<string>();

  input = viewChild.required<ElementRef<HTMLInputElement>>('input');
  _value = linkedSignal(() => this.value());
  searchId = componentId();

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
