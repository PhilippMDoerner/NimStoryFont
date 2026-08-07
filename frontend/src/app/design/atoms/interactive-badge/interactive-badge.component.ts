import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElementKind } from '../_models/button';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-interactive-badge',
  templateUrl: './interactive-badge.component.html',
  styleUrls: ['./interactive-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgClass, IconComponent],
})
export class InteractiveBadgeComponent {
  readonly kind = input.required<ElementKind>();
  readonly text = input.required<string>();
  readonly textLink = input<string>();
  readonly showDeleteButton = input<boolean>();
  readonly iconKind = input<ElementKind>();

  readonly iconKindVal = computed(() => this.iconKind() ?? this.kind());

  readonly iconClick = output<MouseEvent>();
  readonly labelClick = output<MouseEvent>();
}
