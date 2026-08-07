import { DatePipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Icon } from 'src/app/design/atoms/_models/icon';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import { capitalize } from 'src/utils/string';

@Component({
  selector: 'app-icon-card',
  templateUrl: './icon-card.component.html',
  styleUrls: ['./icon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, DatePipe, TitleCasePipe],
  host: {
    class: 'card',
  },
})
export class IconCardComponent {
  readonly icon = input.required<Icon>();
  readonly title = input.required<string>();
  readonly subText = input.required<string>();
  readonly updateDatetime = input.required<string>();
  readonly decoration = input<string>();

  readonly _title = computed(() => capitalize(this.title()));
}
