import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IconComponent } from '../../atoms/icon/icon.component';
import { Toggle } from '../_models/toggle';

@Component({
  selector: 'app-toggle-row',
  imports: [IconComponent],
  templateUrl: './toggle-row.component.html',
  styleUrl: './toggle-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'toolbar',
    class: 'btn-toolbar',
  },
})
export class ToggleRowComponent<T> {
  toggles = input.required<Toggle<T>[]>();

  activated = output<Toggle<T>>();

  togglesChanged(active: boolean, index: number) {
    const newToggles = [...this.toggles()];
    const updatedToggle = { ...newToggles[index], active };

    this.activated.emit(updatedToggle);
  }
}
