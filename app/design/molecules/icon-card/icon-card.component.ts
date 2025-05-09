import { DatePipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Icon } from 'src/app/design/atoms/_models/icon';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import { capitalize, ellipsize } from 'src/utils/string';

@Component({
  selector: 'app-icon-card',
  templateUrl: './icon-card.component.html',
  styleUrls: ['./icon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, DatePipe, TitleCasePipe],
})
export class IconCardComponent {
  icon = input.required<Icon>();
  title = input.required<string>();
  subText = input.required<string>();
  updateDatetime = input.required<string>();
  decoration = input<string>();

  _title = computed(() => capitalize(ellipsize(this.title(), 40)));
}
