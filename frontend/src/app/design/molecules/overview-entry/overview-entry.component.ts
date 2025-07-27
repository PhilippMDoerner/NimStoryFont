import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { componentId } from 'src/utils/DOM';

@Component({
  selector: 'app-overview-entry',
  imports: [NgOptimizedImage],
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
  img = input.required<{ src: string; alt: string; placeholder?: string }>();
  header = input.required<string>();
  body = input<string>();
  defaultBorder = input(true);

  headerId = `header-${componentId()}`;
  bodyId = computed(() => {
    const hasBody = !!this.body();
    return hasBody ? `body-${componentId()}` : undefined;
  });
}
