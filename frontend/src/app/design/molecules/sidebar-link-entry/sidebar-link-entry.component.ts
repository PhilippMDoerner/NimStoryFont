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
import { OnlineService } from '../../../_services/online.service';
import { IconComponent } from '../../atoms/icon/icon.component';
import { SidebarLinkEntry } from '../../organisms/_model/sidebar';

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
  readonly online$ = inject(OnlineService).online$;
  private readonly online = toSignal(this.online$);
  readonly isOffline = computed(() => this.online() === false);
  readonly entry = input.required<SidebarLinkEntry>();
}
