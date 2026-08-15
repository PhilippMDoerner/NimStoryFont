import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HotkeyAction, KeyCombination } from '../../../_models/hotkey';
import { UserPreferencesStore } from '../../../user-preferences.store';
import { UserSettingsComponent } from '../../components/user-settings/user-settings.component';

@Component({
  selector: 'app-user-settings-page',
  imports: [UserSettingsComponent],
  templateUrl: './user-settings-page.component.html',
  styleUrl: './user-settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsPageComponent {
  readonly preferencesStore = inject(UserPreferencesStore);

  readonly shortcuts = this.preferencesStore.hotkeyMappings;

  updateHotkey(event: { action: HotkeyAction; keys: KeyCombination }) {
    this.preferencesStore.updateHotkey(event);
  }

  resetHotkey(action: HotkeyAction) {
    this.preferencesStore.resetShortcut(action);
  }
}
