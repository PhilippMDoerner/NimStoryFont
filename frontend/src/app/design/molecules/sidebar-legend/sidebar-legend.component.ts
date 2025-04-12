import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { SelectableEntryComponent } from '../../atoms/selectable-entry/selectable-entry.component';
import {
  DEFAULT_SEARCH_PREFERENCES,
  ItemCategory,
} from '../_models/search-preferences';

@Component({
  selector: 'app-sidebar-legend',
  templateUrl: './sidebar-legend.component.html',
  styleUrls: ['./sidebar-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SelectableEntryComponent],
})
export class SidebarLegendComponent {
  interactable = input(false);
  sidebarEntries = input<ItemCategory[]>(DEFAULT_SEARCH_PREFERENCES);

  readonly sidebarChange = output<ItemCategory[]>();

  onSidebarEntryClick(clickedOptionIndex: number): void {
    if (!this.interactable) return; // You should not be able to select entries when this thing has been set to not be interactable

    const entry = this.sidebarEntries()[clickedOptionIndex];
    entry.active = !entry.active;

    this.sidebarChange.emit(this.sidebarEntries());
  }
}
