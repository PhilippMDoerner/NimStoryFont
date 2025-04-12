import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Icon } from '../_models/icon';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'app-selectable-entry',
    imports: [NgClass, IconComponent, NgTemplateOutlet],
    templateUrl: './selectable-entry.component.html',
    styleUrl: './selectable-entry.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectableEntryComponent {
  label = input.required<string>();
  icon = input<Icon>();
  isSelectable = input<boolean>(false);
  isActive = input<boolean>(false);

  entryClick = output<'ACTIVE' | 'INACTIVE'>();
}
