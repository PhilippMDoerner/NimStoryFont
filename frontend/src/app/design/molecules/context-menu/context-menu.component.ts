import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  Signal,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PlacementArray } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { ButtonKind, ElementSize } from 'src/app/design/atoms/_models/button';
import { Icon } from 'src/app/design/atoms/_models/icon';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import { componentId } from 'src/utils/DOM';

export type MenuItem =
  | {
      kind: 'HEADER';
      label: string;
      headerKind: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    }
  | {
      kind: 'SEPARATOR';
    }
  | {
      kind: 'BUTTON';
      label: string;
      actionName: string;
      disabled?: boolean;
      icon?: Icon;
      hotkey?: string;
      active?: boolean;
    }
  | {
      kind: 'LINK';
      label: string;
      url: string;
      disabled?: boolean;
      icon?: Icon;
      hotkey?: string;
      active?: boolean;
    };

@Component({
  selector: 'app-context-menu',
  imports: [
    ButtonComponent,
    RouterLink,
    HotkeyDirective,
    NgbDropdownModule,
    IconComponent,
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
  menuButtonHotkey = input<string>();
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

  isOpen = signal(false);

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
}
