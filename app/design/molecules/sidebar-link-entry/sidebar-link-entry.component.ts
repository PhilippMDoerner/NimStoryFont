import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { OnlineService } from 'src/app/_services/online.service';
import { Icon } from '../../atoms/_models/icon';
import { IconComponent } from '../../atoms/icon/icon.component';

export interface LinkEntry {
  availableOffline: boolean;
  route: string;
  title: string;
  iconClass: Icon;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'li[sidebar-link-entry]',
  imports: [IconComponent, AsyncPipe, RouterLink],
  templateUrl: './sidebar-link-entry.component.html',
  styleUrl: './sidebar-link-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'entry',
    '[class.entry--active]': 'entry().isActiveTab',
  },
})
export class SidebarLinkEntryComponent {
  online$ = inject(OnlineService).online$;
  private online = toSignal(this.online$);
  isOffline = computed(() => this.online() === false);
  entry = input.required<LinkEntry>();
}
