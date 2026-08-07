import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
} from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { HeadingDirective } from 'src/app/_directives/heading.directive';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import { SeparatorComponent } from 'src/app/design/atoms/separator/separator.component';
import { componentId } from 'src/utils/DOM';
import { HeadingLevel } from '../../atoms/_models/heading';

@Component({
  selector: 'app-collapsible-panel',
  templateUrl: './collapsible-panel.component.html',
  styleUrls: ['./collapsible-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SeparatorComponent, IconComponent, NgbCollapse, HeadingDirective],
  host: {
    role: 'region',
    '[attr.aria-labelledby]': 'headingId',
    class: 'card',
  },
})
export class CollapsiblePanelComponent {
  readonly ariaLevel = input.required<HeadingLevel>();
  readonly isOpen = input(false);
  readonly _isOpen = linkedSignal(() => this.isOpen());

  readonly id = componentId();
  readonly headingId = `heading-${this.id}`;
  readonly triggerId = `trigger-${this.id}`;
  readonly contentId = `content-${this.id}`;

  togglePanel() {
    this._isOpen.set(!this._isOpen());
  }
}
