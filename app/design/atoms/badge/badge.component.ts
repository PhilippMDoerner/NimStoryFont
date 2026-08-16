import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElementKind, InteractionMode } from '../_models/button';
import { Icon } from '../_models/icon';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  imports: [NgTemplateOutlet, NgClass, IconComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  readonly kind = input.required<ElementKind>();
  readonly text = input.required<string>();
  readonly icon = input<Icon>();
  readonly interactionMode = input<InteractionMode>('NONE');
  readonly link = input<string>();
  readonly maxLength = input<number | undefined>();

  readonly badgeClick = output<void>();

  readonly shouldCutText = computed(() => {
    const maxLength = this.maxLength();
    return maxLength != null && this.text().length > maxLength;
  });

  readonly displayedText = computed(() => {
    const maxLength = this.maxLength();

    if (this.shouldCutText()) {
      const cutText = this.text().slice(0, maxLength);
      return `${cutText}...`;
    }
    return this.text();
  });

  onBadgeClick(event: Event) {
    event.stopPropagation();
    this.badgeClick.emit();
  }
}
