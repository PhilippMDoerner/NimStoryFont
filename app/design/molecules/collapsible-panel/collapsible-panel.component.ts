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
  ariaLevel = input.required<HeadingLevel>();
  isOpen = input(false);
  _isOpen = linkedSignal(() => this.isOpen());

  id = componentId();
  headingId = `heading-${this.id}`;
  triggerId = `trigger-${this.id}`;
  contentId = `content-${this.id}`;

  togglePanel() {
    this._isOpen.set(!this._isOpen());
  }
}
