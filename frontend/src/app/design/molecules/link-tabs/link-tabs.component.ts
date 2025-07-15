import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '../../atoms/_models/icon';
import { IconComponent } from '../../atoms/icon/icon.component';

export interface LinkTab {
  label: string;
  link: string;
  icon: Icon;
}

@Component({
  selector: 'app-link-tabs',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './link-tabs.component.html',
  styleUrl: './link-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkTabsComponent {
  tabs = input.required<LinkTab[]>();
}
