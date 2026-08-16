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
import { componentId } from '../../../../utils/DOM';
import { capitalize } from '../../../../utils/string';
import { encodeKeyCombination } from '../../../_functions/keyMapper';
import {
  HotkeyAction,
  HotkeyMapping,
  KeyCombination,
} from '../../../_models/hotkey';
import { ScreenService } from '../../../_services/screen.service';
import { ButtonComponent } from '../../../design/atoms/button/button.component';
import {
  ListComponent,
  ListEntry,
} from '../../../design/molecules/list/list.component';
import { EditHotkeyDialogComponent } from '../edit-hotkey-dialog/edit-hotkey-dialog.component';
import { ProfileTabLayoutComponent } from '../profile-tab-layout/profile-tab-layout.component';

type MappingEntry = ListEntry<{
  actionLabel: string;
  action: HotkeyAction;
  shortcut: string;
  modified: boolean;
  description: string;
}>;

const DESCRIPTIONS: Record<HotkeyAction, string> = {
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
  readonly modalService = inject(NgbModal);

  readonly shortcutMap = input<HotkeyMapping>();

  readonly shortcutMapChanged = output<{
    action: HotkeyAction;
    keys: KeyCombination;
  }>();
  readonly shortcutResetRequested = output<HotkeyAction>();

  readonly isMobile$ = inject(ScreenService).isMobile$;

  readonly mappingEntries = computed<MappingEntry[] | undefined>(() => {
    const shortcutMapping = this.shortcutMap();
    if (!shortcutMapping) return;

    return Object.entries(shortcutMapping).map(([action, shortcut]) => {
      const entry = {
        actionLabel: capitalize(action).replaceAll('-', ' '),
        action: action as HotkeyAction,
        shortcut: encodeKeyCombination(shortcut.keys, true),
        modified: shortcut.modified,
        description: DESCRIPTIONS[action as HotkeyAction],
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

  readonly displayedColumns = ['index', 'action', 'shortcut', 'actions'];
  readonly shortcutsSectionLabelId = `shortcuts-${componentId()}`;

  openEditShortcutDialog(action: HotkeyAction, modified: boolean) {
    const modalRef = this.modalService.open(EditHotkeyDialogComponent, {
      windowClass: 'edit-shortcut-dialog',
    });
    const component: EditHotkeyDialogComponent = modalRef.componentInstance;
    component.action.set(action);
    component.modified.set(modified);
    component.hotkeyEdited.subscribe(({ action, hotkey: shortcut }) =>
      this.emitShortcutEdited(action, shortcut),
    );
    component.hotkeyReset.subscribe((action) => this.emitShortcutReset(action));
  }

  emitShortcutEdited(action: HotkeyAction, keys: KeyCombination) {
    this.modalService.dismissAll();
    this.shortcutMapChanged.emit({ action, keys });
  }

  emitShortcutReset(action: HotkeyAction) {
    this.modalService.dismissAll();
    this.shortcutResetRequested.emit(action);
  }

  onEditButtonClicked(entry: MappingEntry['data'], event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.openEditShortcutDialog(entry.action, entry.modified);
  }
}
