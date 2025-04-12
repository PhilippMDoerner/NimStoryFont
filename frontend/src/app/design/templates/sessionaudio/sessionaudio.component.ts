import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { SessionAudio, Timestamp } from 'src/app/_models/sessionAudio';
import { RoutingService } from 'src/app/_services/routing.service';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import { ArticleFooterComponent } from 'src/app/design/molecules';
import { PageContainerComponent } from 'src/app/design/organisms/page-container/page-container.component';
import { SessionaudioPlayerComponent } from 'src/app/design/organisms/sessionaudio-player/sessionaudio-player.component';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';

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
    HotkeyDirective,
    NgbTooltip,
  ],
})
export class SessionaudioComponent {
  sessionaudio = input.required<SessionAudio>();
  timestamps = input.required<Timestamp[] | undefined>();
  serverUrl = input.required<string>();
  canUpdate = input<boolean>(false);
  canCreate = input<boolean>(false);
  canDelete = input<boolean>(false);

  readonly sessionaudioDelete = output<SessionAudio>();
  readonly deleteTimestamp = output<Timestamp>();
  readonly createTimestamp = output<Timestamp>();

  campaignName = computed(
    () => this.sessionaudio().session_details?.campaign_details?.name,
  );
  overviewUrl = computed(() =>
    this.routingService.getRoutePath('sessionaudio-overview', {
      campaign: this.campaignName(),
    }),
  );
  updateUrl = computed(() =>
    this.routingService.getRoutePath('sessionaudio-update', {
      campaign: this.campaignName(),
      sessionNumber: this.sessionaudio().session_details?.session_number,
      isMainSession: this.sessionaudio().session_details?.is_main_session_int,
    }),
  );
  nextSessionAudioUrl = computed(() =>
    this.createSessionAudioUrl(
      this.sessionaudio().sessionAudioNeighbours?.nextSessionAudio,
    ),
  );
  priorSessionAudioUrl = computed(() =>
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
