import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'a[externalHref]',
  imports: [IconComponent],
  templateUrl: './external-link.component.html',
  styleUrl: './external-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    target: '_blank',
    '[href]': 'externalHref()',
  },
})
export class ExternalLinkComponent {
  externalHref = input.required<string>();
  text = input.required<string>();
}
