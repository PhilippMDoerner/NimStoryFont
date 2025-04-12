import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Icon } from '../../atoms/_models/icon';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'li[sidebar-button-entry]',
  imports: [IconComponent],
  templateUrl: './sidebar-button-entry.component.html',
  styleUrl: './sidebar-button-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'entry',
  },
})
export class SidebarButtonEntryComponent {
  icon = input<Icon>();
  label = input.required<string>();

  entryClicked = output<MouseEvent>();
}
