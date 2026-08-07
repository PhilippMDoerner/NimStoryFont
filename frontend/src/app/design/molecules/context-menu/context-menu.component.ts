import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { ShortcutAction } from 'src/app/_models/hotkey';
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
  readonly menuItems = input.required<MenuItem[]>();
  readonly menuButtonKind = input.required<ButtonKind>();
  readonly menuButtonText = input.required<string>();
  readonly menuButtonIcon = input<Icon>();
  readonly menuButtonSize = input<ElementSize>('MEDIUM');
  readonly menuButtonHotkey = input<ShortcutAction>();
  readonly menuButtonShowText = input<boolean>(true);
  readonly placement = input<PlacementArray>([
    'bottom-start',
    'bottom-end',
    'top-start',
    'top-end',
  ]);

  readonly actionTriggered = output<string>();

  readonly menuButtonAriaLabel = computed(() =>
    this.menuButtonShowText() ? undefined : this.menuButtonText(),
  );
  private readonly trigger: Signal<ElementRef<HTMLButtonElement>> =
    viewChild.required('triggerElement', {
      read: ElementRef<HTMLButtonElement>,
    });

  readonly modalService = inject(NgbModal);

  readonly isOpen = signal(false);
  readonly activeModalItem = signal<Extract<MenuItem, { kind: 'CONFIRM' }> | null>(null);

  readonly id = componentId();
  readonly menuId = `menu-${this.id}`;
  readonly triggerId = `trigger-${this.id}`;

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
