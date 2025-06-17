import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from '../_models/menu';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

type EditEntry =
  | { kind: 'LINK'; link: string; label: string }
  | { kind: 'BUTTON'; label: string };

@Component({
  selector: 'app-article-context-menu',
  imports: [ContextMenuComponent, DeleteModalComponent],
  templateUrl: './article-context-menu.component.html',
  styleUrl: './article-context-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleContextMenuComponent {
  editEntry = input<EditEntry>();
  deleteLabel = input<string>();

  deleteConfirmed = output<void>();
  editArticle = output<void>();

  private modalService = inject(NgbModal);

  menuItems = computed<MenuItem[]>(() => {
    const items: MenuItem[] = [];
    const editEntry = this.editEntry();
    if (editEntry) {
      const editMenuItem = this.toMenuEntry(editEntry);
      items.push(editMenuItem);
    }

    const deleteLabel = this.deleteLabel();
    if (deleteLabel) {
      items.push({
        kind: 'BUTTON',
        label: deleteLabel,
        actionName: 'delete',
        icon: 'trash',
        hotkey: 'd',
      });
    }
    return items;
  });

  showMenu = computed(() => this.menuItems().length > 0);

  onActionTriggered(action: string, modalRef: TemplateRef<HTMLElement>) {
    switch (action) {
      case 'delete':
        this.openModal(modalRef);
        break;
      case 'edit':
        this.editArticle.emit();
        break;
    }
  }

  onConfirm(modal: NgbActiveModal) {
    this.deleteConfirmed.emit();
    modal.close();
  }

  private openModal(content: TemplateRef<HTMLElement>) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-title',
      modalDialogClass: 'mymodal',
    });
  }

  private toMenuEntry(editEntry: EditEntry): MenuItem {
    switch (editEntry.kind) {
      case 'LINK':
        return {
          kind: 'LINK',
          label: editEntry.label,
          url: editEntry.link,
          icon: 'pencil',
          hotkey: 'e',
        };
      case 'BUTTON':
        return {
          kind: 'BUTTON',
          label: editEntry.label,
          icon: 'pencil',
          hotkey: 'e',
          actionName: 'edit',
        };
    }
  }
}
