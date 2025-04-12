import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Icon, IconKind, toIconKind } from '../_models/icon';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  host: {
    '[class]': 'classes()',
    'aria-hidden': 'true',
  },
})
export class IconComponent {
  icon = input.required<Icon>();

  iconType = computed<IconKind | undefined>(() => toIconKind(this.icon()));

  classes = computed(() => {
    if (!this.iconType()) return '';
    return `${this.iconType()} fa-${this.icon()}`;
  });
}
