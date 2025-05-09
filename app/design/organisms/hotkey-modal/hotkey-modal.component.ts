import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { HotkeyService } from 'src/app/_services/hotkey.service';
import { Icon } from '../../atoms/_models/icon';
import { IconComponent } from '../../atoms/icon/icon.component';
import { SeparatorComponent } from '../../atoms/separator/separator.component';

interface Section {
  title: string;
  subtitle?: string;
  icon: Icon;
  keys: Hotkey[];
}

interface Hotkey {
  key: string;
  actionName: string;
  description: string;
}

@Component({
  selector: 'app-hotkey-modal',
  imports: [IconComponent, TitleCasePipe, SeparatorComponent, HotkeyDirective],
  templateUrl: './hotkey-modal.component.html',
  styleUrl: './hotkey-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotkeyModalComponent {
  sections: Section[] = [
    {
      icon: 'globe-americas',
      title: 'Global',
      subtitle: 'Apply everywhere in the app',
      keys: [
        {
          key: 't',
          actionName: 'Top of page',
          description: 'Scroll back to top instantly',
        },
        {
          key: 'd',
          actionName: 'Delete',
          description:
            'Toggle delete confirmation button if given page has one. This still requires confirming the delete.',
        },
        {
          key: 'q',
          actionName: 'Quit',
          description: 'Cancels currently active actions',
        },
        {
          key: 'e',
          actionName: 'Edit',
          description: 'Activates edit mode if given page has one',
        },
        {
          key: 'c',
          actionName: 'Create',
          description:
            'Moves to creating a specific item if given page has a way to create one',
        },
        {
          key: 'w',
          actionName: 'Write',
          description:
            'Activates write mode of text-editors for a description if one is present on the page',
        },
      ],
    },
    {
      icon: 'list',
      title: 'List Pages',
      subtitle:
        'Apply on pages with lists of items in them, i.e. spells, rules, sessions',
      keys: [
        {
          key: '⭣',
          actionName: 'Next',
          description:
            'Focus and scroll into center the next entry of the list',
        },
        {
          key: '⭡',
          actionName: 'Previous',
          description:
            'Focus and scroll into center the previous entry of the list',
        },
        {
          key: 'e',
          actionName: 'Edit',
          description:
            'Toggle edit mode for the currently focused entry of the list',
        },
        {
          key: 'd',
          actionName: 'Delete',
          description:
            'Toggle delete confirmation button if given page has one. This still requires confirming the delete.',
        },
        {
          key: 'q',
          actionName: 'Quit',
          description:
            'Cancel editing/deleting the currently focused entry of the list',
        },
      ],
    },
    {
      icon: 'book-open',
      title: 'Diaryentry Page',
      subtitle:
        'Apply on the Diaryentry page in addition to those from list pages',
      keys: [
        {
          key: 'f',
          actionName: 'Focus',
          description:
            'Focus and scroll into center the currently focused Encounter',
        },
        {
          key: 'x',
          actionName: 'Cut',
          description: 'Start cutting out the currently focused encounter',
        },

        {
          key: 'c',
          actionName: 'Create',
          description:
            'Start adding a character to the currently focused encounter',
        },
        {
          key: 'r',
          actionName: 'Read/Edit toggle',
          description: 'Toggle view of diaryentry to read or edit mode',
        },
        {
          key: 'w',
          actionName: 'Write',
          description:
            'Toggle write mode for text-editor for encounter description of the currently focused encounter',
        },
      ],
    },
  ];

  modalService = inject(NgbModal);

  constructor(hotkeyService: HotkeyService) {
    hotkeyService
      .watch('h')
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.openModal());
  }

  openModal() {
    if (this.modalService.hasOpenModals()) return;

    this.modalService.open(HotkeyModalComponent);
  }

  dismiss() {
    this.modalService.dismissAll();
  }
}
