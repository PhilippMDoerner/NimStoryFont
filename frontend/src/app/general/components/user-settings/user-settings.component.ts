import { CdkTableModule } from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  KeyCombination,
  ShortcutAction,
  ShortcutMapping,
} from 'src/app/_models/hotkey';
import { EditShortcutDialogComponent } from 'src/app/general/components/edit-shortcut-dialog/edit-shortcut-dialog.component';
import { componentId } from 'src/utils/DOM';
import { capitalize } from 'src/utils/string';
import { ButtonComponent } from '../../../design/atoms/button/button.component';
import { ProfileTabLayoutComponent } from '../profile-tab-layout/profile-tab-layout.component';
@Component({
  selector: 'app-user-settings',
  imports: [
    CdkTableModule,
    ButtonComponent,
    EditShortcutDialogComponent,
    ProfileTabLayoutComponent,
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsComponent {
  modalService = inject(NgbModal);

  shortcutMap = input<ShortcutMapping>();

  shortcutMapChanged = output<{
    action: ShortcutAction;
    keys: KeyCombination;
  }>();
  shortcutResetRequested = output<ShortcutAction>();

  mappings = computed(() => {
    const shortcutMapping = this.shortcutMap();
    if (!shortcutMapping) return;

    return Object.entries(shortcutMapping).map(([action, shortcut], index) => ({
      actionLabel: capitalize(action).replaceAll('-', ' '),
      action,
      shortcut: shortcut.keys
        .map((key) =>
          key
            .split('+')
            .map((keyPiece) => capitalize(keyPiece))
            .join('+'),
        )
        .join(' + '),
      index,
      modified: shortcut.modified,
    }));
  });

  displayedColumns = ['index', 'action', 'shortcut', 'actions'];
  shortcutsSectionLabelId = `shortcuts-${componentId()}`;

  openEditShortcutDialog(ref: TemplateRef<unknown>) {
    this.modalService.open(ref, {
      windowClass: 'edit-shortcut-dialog',
    });
  }

  emitShortcutEdited(action: ShortcutAction, keys: KeyCombination) {
    this.modalService.dismissAll();
    this.shortcutMapChanged.emit({ action, keys });
  }

  emitShortcutReset(action: ShortcutAction) {
    this.shortcutResetRequested.emit(action);
  }
}
