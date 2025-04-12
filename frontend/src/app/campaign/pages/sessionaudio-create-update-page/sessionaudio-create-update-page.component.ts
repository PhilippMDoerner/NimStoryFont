import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostBinding,
  inject,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { filter, map, mergeMap, Observable, take } from 'rxjs';
import { OverviewItem } from 'src/app/_models/overview';
import { Session } from 'src/app/_models/session';
import { SessionAudio, SessionAudioRaw } from 'src/app/_models/sessionAudio';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { PROLOGUE_FORBIDDEN_CHARACTERS } from 'src/app/app.constants';
import { PageContainerComponent } from 'src/app/design//organisms/page-container/page-container.component';
import { CreateUpdateComponent } from 'src/app/design//templates/create-update/create-update.component';
import { CreateUpdateState } from 'src/app/design/templates/_models/create-update-states';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { SessionaudioCreateUpdatePageStore } from './sessionaudio-create-update-page.store';

@Component({
  selector: 'app-sessionaudio-create-update-page',
  imports: [
    CreateUpdateComponent,
    NgbProgressbarModule,
    PageContainerComponent,
    DecimalPipe,
  ],
  templateUrl: './sessionaudio-create-update-page.component.html',
  styleUrl: './sessionaudio-create-update-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionaudioCreateUpdatePageComponent {
  private route = inject(ActivatedRoute);
  private routeUrlSegments = toSignal(this.route.url);
  private routingService = inject(RoutingService);
  private formlyService = inject(FormlyService);
  globalStore = inject(GlobalStore);
  store = inject(SessionaudioCreateUpdatePageStore);

  private sessions$ = toObservable(this.store.campaignSessions).pipe(
    filterNil(),
  );
  private audioCreateState$ = toObservable(this.store.createSessionaudioState);
  private audioUpdateState$ = toObservable(this.store.updateSessionaudioState);
  private item$ = toObservable(this.store.sessionaudio);

  @HostBinding('class.uploading') isUploading = false;

  state = computed<CreateUpdateState>(() => {
    const pathSegments = this.routeUrlSegments()?.map(
      (segment) => segment.path,
    );
    const isUpdatePage = pathSegments?.includes('update');
    if (!isUpdatePage) {
      return 'CREATE';
    }

    const isOutdatedUpdate = this.store.sessionaudioServerModel() != null;
    if (isOutdatedUpdate) {
      return 'OUTDATED_UPDATE';
    } else {
      return 'UPDATE';
    }
  });

  userModel = computed(() => {
    switch (this.state()) {
      case 'CREATE':
        return {
          campaign: this.globalStore.currentCampaign()?.pk,
        } as Partial<SessionAudioRaw>;
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return { ...this.store.sessionaudio() };
    }
  });

  heading = computed(() => {
    const session: Session | undefined =
      this.store.sessionaudio()?.session_details;

    switch (this.state()) {
      case 'CREATE':
        return 'Adding a new Recording';
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return `Updating Recording for ${session?.is_main_session ? 'Main Session' : 'Side Session'} # ${session?.session_number}`;
    }
  });

  formlyFields = computed<FormlyFieldConfig[]>(() => [
    this.formlyService.buildDisableSelectConfig({
      key: 'session',
      options$: this.sessions$,
      labelProp: 'name',
      campaign: this.globalStore.campaignName(),
      disabledExpression: (selectOption$: Observable<OverviewItem[]>) => {
        return selectOption$.pipe(
          map((options) => {
            return options.map((selectOption) => {
              const isCurrentlySelectedOption =
                selectOption.pk ===
                (this.userModel() as Partial<SessionAudio>)?.session_details
                  ?.pk;
              return (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                !!(selectOption as any).has_recording &&
                !isCurrentlySelectedOption
              );
            });
          }),
        );
      },
      tooltipMessage:
        'All sessions that already have a recording are disabled.',
      warningMessage:
        'The session you selected already has a recording attached to it! Uploading this file will not work!',
      showWrapperLabel: false,
    }),
    this.formlyService.buildFileFieldConfig({
      key: 'audio_file',
      label: 'Audio File',
      required: this.state() === 'CREATE',
    }),
  ]);

  private readonly isPageLoading = computed(
    () => this.userModel() == null || this.globalStore.campaignName() == null,
  );

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
    effect(() => (this.isUploading = this.store.fileUploadState() !== 'init'));
  }

  onCreate(newRecording: Partial<SessionAudioRaw>) {
    const file: File = newRecording.audio_file as unknown as File;
    const fileName = this.cleanFilename(file);
    this.store.createSessionAudio(
      newRecording.session as number,
      fileName,
      file,
    );

    this.audioCreateState$
      .pipe(
        filter((state) => state === 'success'),
        take(1),
        mergeMap(() => this.item$),
        filterNil(),
      )
      .subscribe((item) => this.routeToSessionAudio(item));
  }

  onUpdate(recording: SessionAudio) {
    const isUpdateWithoutFileChange =
      recording.audio_file.constructor.name.toLowerCase() === 'string';

    if (isUpdateWithoutFileChange) {
      this.store.updateSessionAudioWithoutFile(recording);
    } else {
      const file: File = recording.audio_file as unknown as File;
      const fileName = this.cleanFilename(file);
      this.store.updateSessionAudioWithFile(recording, fileName, file);
    }

    this.audioUpdateState$
      .pipe(
        filter((state) => state === 'success'),
        take(1),
        mergeMap(() => this.item$),
        filterNil(),
      )
      .subscribe((item) => this.routeToSessionAudio(item));
  }

  cancel() {
    this.routingService.routeToPath('sessionaudio-overview', {
      campaign: this.globalStore.campaignName(),
    });
  }

  private routeToSessionAudio(sessionAudio: SessionAudio) {
    const pathParams = {
      isMainSession: sessionAudio.session_details?.is_main_session_int,
      sessionNumber: sessionAudio.session_details?.session_number,
      campaign: sessionAudio.campaign_details?.name,
    };

    this.routingService.routeToPath('sessionaudio', pathParams);
  }

  private cleanFilename(file: File): string {
    return file.name.replaceAll(PROLOGUE_FORBIDDEN_CHARACTERS, '');
  }
}
