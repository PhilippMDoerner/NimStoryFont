import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionAudio, Timestamp } from '../../../_models/sessionAudio';
import { RoutingService } from '../../../_services/routing.service';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { ArticleFooterComponent } from '../../molecules';
import { ArticleContextMenuComponent } from '../../molecules/article-context-menu/article-context-menu.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';
import { SessionaudioPlayerComponent } from '../../organisms/sessionaudio-player/sessionaudio-player.component';

@Component({
  selector: 'app-sessionaudio',
  templateUrl: './sessionaudio.component.html',
  styleUrls: ['./sessionaudio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PageContainerComponent,
    IconComponent,
    ButtonLinkComponent,
    RouterLink,
    SessionaudioPlayerComponent,
    ArticleFooterComponent,
    ArticleContextMenuComponent,
  ],
})
export class SessionaudioComponent {
  readonly sessionaudio = input.required<SessionAudio>();
  readonly timestamps = input.required<Timestamp[] | undefined>();
  readonly serverUrl = input.required<string>();
  readonly canUpdate = input<boolean>(false);
  readonly canCreate = input<boolean>(false);
  readonly canDelete = input<boolean>(false);

  readonly sessionaudioDelete = output<SessionAudio>();
  readonly deleteTimestamp = output<Timestamp>();
  readonly createTimestamp = output<Timestamp>();

  readonly campaignName = computed(
    () => this.sessionaudio().session_details?.campaign_details?.name,
  );
  readonly overviewUrl = computed(() =>
    this.routingService.getRoutePath('sessionaudio-overview', {
      campaign: this.campaignName(),
    }),
  );
  readonly updateUrl = computed(() =>
    this.routingService.getRoutePath('sessionaudio-update', {
      campaign: this.campaignName(),
      sessionNumber: this.sessionaudio().session_details?.session_number,
      isMainSession: this.sessionaudio().session_details?.is_main_session_int,
    }),
  );
  readonly nextSessionAudioUrl = computed(() =>
    this.createSessionAudioUrl(
      this.sessionaudio().sessionAudioNeighbours?.nextSessionAudio,
    ),
  );
  readonly priorSessionAudioUrl = computed(() =>
    this.createSessionAudioUrl(
      this.sessionaudio().sessionAudioNeighbours?.priorSessionAudio,
    ),
  );

  constructor(private routingService: RoutingService) {}

  private createSessionAudioUrl(
    sessionAudioData:
      | { isMainSessionInt: number; sessionNumber: number }
      | undefined,
  ): string | undefined {
    if (sessionAudioData == null) {
      return undefined;
    }

    if (
      sessionAudioData.isMainSessionInt == null ||
      sessionAudioData.sessionNumber == null
    ) {
      throw new Error(
        `Invalid URL Building exception. Trying to build a URL with incomplete parameters ${sessionAudioData}`,
      );
    }

    return this.routingService.getRoutePath('sessionaudio', {
      campaign: this.campaignName(),
      isMainSession: sessionAudioData.isMainSessionInt,
      sessionNumber: sessionAudioData.sessionNumber,
    });
  }
}
