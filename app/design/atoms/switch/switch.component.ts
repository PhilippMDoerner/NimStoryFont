import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { componentId } from '../../../../utils/DOM';

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
  readonly label = input.required<string>();
  readonly checked = input.required<boolean>();
  readonly ariaControls = input<string>();
  readonly disabled = input<boolean>();

  readonly changed = output<boolean>();
  readonly id = componentId();

  switch(value: boolean) {
    this.changed.emit(value);
  }
}
