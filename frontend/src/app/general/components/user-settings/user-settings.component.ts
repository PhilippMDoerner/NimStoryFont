import { CdkTableModule } from '@angular/cdk/table';
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
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

  openEditShortcutDialog(action: ShortcutAction, modified: boolean) {
    const modalRef = this.modalService.open(EditShortcutDialogComponent, {
      windowClass: 'edit-shortcut-dialog',
    });
    const component: EditShortcutDialogComponent = modalRef.componentInstance;
    component.action.set(action);
    component.modified.set(modified);
    component.shortcutEdited.subscribe(({ action, shortcut }) =>
      this.emitShortcutEdited(action, shortcut),
    );
    component.shortcutReset.subscribe((action) =>
      this.emitShortcutReset(action),
    );
  }

  emitShortcutEdited(action: ShortcutAction, keys: KeyCombination) {
    this.modalService.dismissAll();
    this.shortcutMapChanged.emit({ action, keys });
  }

  emitShortcutReset(action: ShortcutAction) {
    this.modalService.dismissAll();
    this.shortcutResetRequested.emit(action);
  }

  onEditButtonClicked(entry: MappingEntry, event: Event) {
    event.stopPropagation();
    this.openEditShortcutDialog(entry.data.action, entry.data.modified);
  }
}
