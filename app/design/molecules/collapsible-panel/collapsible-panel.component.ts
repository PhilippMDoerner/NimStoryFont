import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
} from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { componentId } from '../../../../utils/DOM';
import { HeadingDirective } from '../../../_directives/heading.directive';
import { HeadingLevel } from '../../atoms/_models/heading';
import { IconComponent } from '../../atoms/icon/icon.component';
import { SeparatorComponent } from '../../atoms/separator/separator.component';

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
