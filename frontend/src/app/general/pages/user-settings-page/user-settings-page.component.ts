import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KeyCombination, ShortcutAction } from 'src/app/_models/hotkey';
import { UserSettingsComponent } from 'src/app/general/components/user-settings/user-settings.component';
import { UserPreferencesStore } from 'src/app/user-preferences.store';

@Component({
  selector: 'app-user-settings-page',
  imports: [UserSettingsComponent],
  templateUrl: './user-settings-page.component.html',
  styleUrl: './user-settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsPageComponent {
  preferencesStore = inject(UserPreferencesStore);

  shortcuts = this.preferencesStore.shortcutMappings;

  updateShortcut(event: { action: ShortcutAction; keys: KeyCombination }) {
    this.preferencesStore.updateShortcut(event);
  }

  resetShortcut(action: ShortcutAction) {
    this.preferencesStore.resetShortcut(action);
  }
}
