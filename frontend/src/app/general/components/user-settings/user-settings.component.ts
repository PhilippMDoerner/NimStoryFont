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
  description: string;
}>;

const DESCRIPTIONS: Record<ShortcutAction, string> = {
  delete:
    'Toggle delete confirmation button if given page has one. This still requires confirming the delete.',
  cancel: 'Cancels currently active actions',
  update: 'Activates edit mode if given page has one',
  create:
    'Moves to creating a specific item if given page has a way to create one',
  'description-update':
    'Activates write mode of text-editors for a description if one is present on the page',
  'jump-to-next-entry':
    'Focus and scroll into center the next entry of the list',
  'jump-to-prior-entry':
    'Focus and scroll into center the previous entry of the list',
  focus: 'Focus and scroll into center the currently focused Encounter',
  cut: 'Start cutting out the currently focused encounter',
  toggle: 'Toggle view of diaryentry to read or edit mode',
  'show-onboarding': 'Starts the onboarding tour',
  'show-tooltips': 'Toggles visibility of hotkey tooltips',
  search: 'Activates search mode',
};
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
        description: DESCRIPTIONS[action as ShortcutAction],
      };
      return {
        trackId: entry.action,
        ariaText: {
          kind: 'aria-label',
          label: entry.actionLabel,
        },
        data: entry,
      } satisfies MappingEntry;
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
