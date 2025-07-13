import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
  Signal,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NgbActiveModal,
  NgbDropdown,
  NgbDropdownModule,
  NgbModal,
  Placement,
} from '@ng-bootstrap/ng-bootstrap';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { HotkeyAction } from 'src/app/_models/hotkey';
import { ButtonKind, ElementSize } from 'src/app/design/atoms/_models/button';
import { Icon } from 'src/app/design/atoms/_models/icon';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import { componentId } from 'src/utils/DOM';
import { MenuItem } from '../_models/menu';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

export type PlacementArray = Placement | Placement[] | string;

@Component({
  selector: 'app-context-menu',
  imports: [
    ButtonComponent,
    RouterLink,
    HotkeyDirective,
    NgbDropdownModule,
    IconComponent,
    DeleteModalComponent,
  ],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: NgbDropdown,
      inputs: ['placement'],
    },
  ],
})
export class ContextMenuComponent {
  menuItems = input.required<MenuItem[]>();
  menuButtonKind = input.required<ButtonKind>();
  menuButtonText = input<string>();
  menuButtonIcon = input<Icon>();
  menuButtonSize = input<ElementSize>('MEDIUM');
  menuButtonHotkey = input<HotkeyAction>();
  menuButtonAriaLabel = input<string>();
  placement = input<PlacementArray>([
    'bottom-start',
    'bottom-end',
    'top-start',
    'top-end',
  ]);

  actionTriggered = output<string>();

  private readonly trigger: Signal<ElementRef<HTMLButtonElement>> =
    viewChild.required('triggerElement', {
      read: ElementRef<HTMLButtonElement>,
    });

  modalService = inject(NgbModal);

  isOpen = signal(false);
  activeModalItem = signal<Extract<MenuItem, { kind: 'CONFIRM' }> | null>(null);

  id = componentId();
  menuId = `menu-${this.id}`;
  triggerId = `trigger-${this.id}`;

  openAndScrollToMenu(): void {
    const element = this.trigger().nativeElement;
    element.click();

    if (this.isOpen()) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      element.focus();
    }
  }

  onConfirm(action: string, modal: NgbActiveModal) {
    this.actionTriggered.emit(action);
    this.closeModal(modal);
  }

  openModal(
    modalItem: Extract<MenuItem, { kind: 'CONFIRM' }>,
    content: TemplateRef<HTMLElement>,
  ) {
    this.activeModalItem.set(modalItem);
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-title',
      modalDialogClass: 'mymodal',
    });
  }

  closeModal(modal: NgbActiveModal) {
    this.activeModalItem.set(null);
    modal.close();
  }
}
