import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KeyCombination, ShortcutAction } from '../../../_models/hotkey';
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

  readonly shortcuts = this.preferencesStore.shortcutMappings;

  updateShortcut(event: { action: ShortcutAction; keys: KeyCombination }) {
    this.preferencesStore.updateShortcut(event);
  }

  resetShortcut(action: ShortcutAction) {
    this.preferencesStore.resetShortcut(action);
  }
}
