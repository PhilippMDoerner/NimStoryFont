import { CdkTableModule } from '@angular/cdk/table';
import { AsyncPipe } from '@angular/common';
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
import { encodeKeyCombination } from 'src/app/_functions/keyMapper';
import {
  KeyCombination,
  ShortcutAction,
  ShortcutMapping,
} from 'src/app/_models/hotkey';
import { ScreenService } from 'src/app/_services/screen.service';
import {
  ListComponent,
  ListEntry,
} from 'src/app/design/molecule/list/list.component';
import { EditShortcutDialogComponent } from 'src/app/general/components/edit-shortcut-dialog/edit-shortcut-dialog.component';
import { componentId } from 'src/utils/DOM';
import { capitalize } from 'src/utils/string';
import { ButtonComponent } from '../../../design/atoms/button/button.component';
import { ProfileTabLayoutComponent } from '../profile-tab-layout/profile-tab-layout.component';

type MappingEntry = ListEntry<{
  actionLabel: string;
  action: ShortcutAction;
  shortcut: string;
  modified: boolean;
}>;

@Component({
  selector: 'app-user-settings',
  imports: [
    CdkTableModule,
    ButtonComponent,
    EditShortcutDialogComponent,
    ProfileTabLayoutComponent,
    AsyncPipe,
    ListComponent,
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

  isMobile$ = inject(ScreenService).isMobile$;

  mappingEntries = computed<MappingEntry[] | undefined>(() => {
    const shortcutMapping = this.shortcutMap();
    if (!shortcutMapping) return;

    return Object.entries(shortcutMapping).map(([action, shortcut]) => {
      const entry = {
        actionLabel: capitalize(action).replaceAll('-', ' '),
        action: action as ShortcutAction,
        shortcut: encodeKeyCombination(shortcut.keys, true),
        modified: shortcut.modified,
      };
      return {
        trackId: entry.action,
        ariaText: {
          kind: 'aria-label',
          label: entry.actionLabel,
        },
        data: entry,
      } satisfies ListEntry<unknown>;
    });
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
