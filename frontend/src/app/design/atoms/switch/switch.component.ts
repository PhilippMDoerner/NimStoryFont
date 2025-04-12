import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { componentId } from 'src/utils/DOM';

@Component({
  selector: 'app-switch',
  imports: [],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'form-check form-switch',
  },
})
export class SwitchComponent {
  label = input.required<string>();
  checked = input.required<boolean>();
  ariaControls = input<string>();
  disabled = input<boolean>();

  changed = output<boolean>();
  id = componentId();

  switch(value: boolean) {
    this.changed.emit(value);
  }
}
