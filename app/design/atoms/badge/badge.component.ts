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
  kind = input.required<ElementKind>();
  text = input.required<string>();
  icon = input<Icon>();
  interactionMode = input<InteractionMode>('NONE');
  link = input<string>();
  maxLength = input<number | undefined>();

  readonly badgeClick = output<void>();

  shouldCutText = computed(() => {
    const maxLength = this.maxLength();
    return maxLength != null && this.text().length > maxLength;
  });

  displayedText = computed(() => {
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
