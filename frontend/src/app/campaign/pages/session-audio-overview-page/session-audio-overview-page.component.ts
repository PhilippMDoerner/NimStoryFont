import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { RoutingService } from 'src/app/_services/routing.service';
import { SessionaudioCardComponent } from 'src/app/design//organisms/sessionaudio-card/sessionaudio-card.component';
import { ButtonLinkComponent } from 'src/app/design/atoms/button-link/button-link.component';
import { PageContainerComponent } from 'src/app/design/organisms/page-container/page-container.component';
import { GlobalStore } from 'src/app/global.store';
import { SessionAudioOverviewPageStore } from './session-audio-overview-page.store';

@Component({
  selector: 'app-session-audio-overview-page',
  imports: [
    PageContainerComponent,
    SessionaudioCardComponent,
    ButtonLinkComponent,
    RouterLink,
    HotkeyDirective,
  ],
  templateUrl: './session-audio-overview-page.component.html',
  styleUrl: './session-audio-overview-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionAudioOverviewPageComponent {
  readonly serverUrl = '';
  readonly store = inject(SessionAudioOverviewPageStore);
  readonly globalStore = inject(GlobalStore);
  readonly routingService = inject(RoutingService);

  readonly homeUrl = computed(() =>
    this.routingService.getRoutePath('home', {
      campaign: this.globalStore.campaignName(),
    }),
  );

  readonly createUrl = computed(() =>
    this.routingService.getRoutePath('sessionaudio-create', {
      campaign: this.globalStore.campaignName(),
    }),
  );

  constructor() {
    this.globalStore.trackIsPageLoading(false);
  }
}
