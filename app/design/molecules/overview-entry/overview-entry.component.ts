import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { componentId } from '../../../../utils/DOM';

@Component({
  selector: 'app-overview-entry',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './overview-entry.component.html',
  styleUrl: './overview-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'article',
    'aria-labelledby': 'headerId',
    '[attr.aria-describedby]': 'bodyId()',
    '[class.border]': 'defaultBorder()',
    '[class.border-primary-subtle.rounded]': 'defaultBorder()',
    '[class.rounded]': 'defaultBorder()',
  },
})
export class OverviewEntryComponent {
  readonly img = input.required<{
    src: string;
    alt: string;
    placeholder?: string;
  }>();
  readonly header = input.required<string>();
  readonly body = input<string>();
  readonly defaultBorder = input(true);
  readonly link = input<string>();

  readonly headerId = `header-${componentId()}`;

  readonly bodyId = computed(() => {
    const hasBody = !!this.body();
    return hasBody ? `body-${componentId()}` : undefined;
  });
}
