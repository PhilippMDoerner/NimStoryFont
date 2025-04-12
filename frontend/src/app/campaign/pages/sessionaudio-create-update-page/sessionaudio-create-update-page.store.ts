import {
  HttpErrorResponse,
  HttpEventType,
  HttpProgressEvent,
} from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  filter,
  map,
  Observable,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { SessionAudio, SessionAudioRaw } from 'src/app/_models/sessionAudio';
import { httpErrorToast } from 'src/app/_models/toast';
import { SessionAudioService } from 'src/app/_services/article/session-audio.service';
import { SessionService } from 'src/app/_services/article/session.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { withQueries } from 'src/utils/store/withQueries';

interface SessionaudioCreateUpdateState {
  sessionaudioServerModel: SessionAudio | undefined;
  latestProgressEvent: HttpProgressEvent | undefined;
  fileUploadState: RequestState;
  createSessionaudioState: RequestState;
  updateSessionaudioState: RequestState;
}

const initialState: SessionaudioCreateUpdateState = {
  sessionaudioServerModel: undefined,
  latestProgressEvent: undefined,
  fileUploadState: 'init',
  createSessionaudioState: 'init',
  updateSessionaudioState: 'init',
};

export const SessionaudioCreateUpdatePageStore = signalStore(
  withState(initialState),
  withComputed((store) => {
    const globalStore = inject(GlobalStore);
    return {
      hasWritePermission: globalStore.canPerformActionsOfRole('member'),
      uploadProgress: computed(() => {
        const event = store.latestProgressEvent();
        if (event?.type !== HttpEventType.UploadProgress) return undefined;
        const totalBytes = event.total;
        if (totalBytes == null) return undefined;
        const uploadedBytes = event.loaded;
        return (uploadedBytes / totalBytes) * 100;
      }),
    };
  }),
  withQueries(() => {
    const globalStore = inject(GlobalStore);
    const sessionService = inject(SessionService);
    const audioService = inject(SessionAudioService);
    const campaign$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );
    return {
      sessionaudio: (params: {
        isMainSession: number;
        sessionNumber: number;
      }) =>
        campaign$.pipe(
          take(1),
          switchMap((campaignName) =>
            audioService.readByParam(campaignName, {
              ...params,
              name: '',
            }),
          ),
        ),
      campaignSessions: () =>
        campaign$.pipe(
          switchMap((campaignName) =>
            sessionService.campaignList(campaignName),
          ),
        ),
    };
  }),
  withMethods((store) => {
    const audioService = inject(SessionAudioService);
    const toastService = inject(ToastService);

    return {
      _createSessionaudio: (newSessionAudio: SessionAudioRaw) => {
        patchState(store, {
          createSessionaudioState: 'loading',
          sessionaudio: undefined,
          sessionaudioError: undefined,
        });
        audioService
          .create(newSessionAudio)
          .pipe(take(1))
          .subscribe({
            next: (sessionaudio) =>
              patchState(store, {
                sessionaudio,
                createSessionaudioState: 'success',
              }),
            error: (err) => {
              toastService.addToast(httpErrorToast(err));
              patchState(store, {
                createSessionaudioState: 'error',
                sessionaudioError: err,
              });
            },
          });
      },
      _uploadFile: (fileName: string, file: File): Observable<string> => {
        patchState(store, {
          latestProgressEvent: undefined,
          fileUploadState: 'loading',
        });
        return audioService.uploadFile(fileName, file).pipe(
          tap({
            next: (event) => {
              if (event.type === HttpEventType.UploadProgress) {
                patchState(store, {
                  latestProgressEvent: event,
                  fileUploadState: 'loading',
                });
              } else if (event.type === HttpEventType.Response) {
                patchState(store, {
                  fileUploadState: 'success',
                });
              }
            },
          }),
          filter((event) => event.type === HttpEventType.Response),
          map((event) => event.body as string),
        );
      },
    };
  }),
  withMethods((store) => {
    const audioService = inject(SessionAudioService);
    const toastService = inject(ToastService);
    return {
      reset: () =>
        patchState(store, {
          ...initialState,
          sessionaudio: undefined,
          campaignSessionsError: undefined,
          sessionaudioError: undefined,
        }),
      createSessionAudio: (
        sessionPk: number,
        fileName: string,
        recording: File,
      ) => {
        store
          ._uploadFile(fileName, recording)
          .pipe(take(1))
          .subscribe({
            next: (newFilePath) => {
              const newSessionAudio: SessionAudioRaw = {
                session: sessionPk,
                audio_file: newFilePath,
              };
              store._createSessionaudio(newSessionAudio);
            },
          });
      },
      updateSessionAudioWithoutFile: (recording: Partial<SessionAudio>) => {
        patchState(store, { updateSessionaudioState: 'loading' });
        delete recording.audio_file;
        audioService
          .patch(recording.pk!, recording)
          .pipe(take(1))
          .subscribe({
            next: () => {
              patchState(store, {
                updateSessionaudioState: 'success',
              });
            },
            error: (err: HttpErrorResponse) => {
              if (err.status === 409) {
                patchState(store, {
                  updateSessionaudioState: 'error',
                  sessionaudioServerModel: err.error,
                });
              } else {
                toastService.addToast(httpErrorToast(err));
              }
            },
          });
      },
      updateSessionAudioWithFile: (
        recording: SessionAudio,
        fileName: string,
        file: File,
      ) => {
        store
          ._uploadFile(fileName, file)
          .pipe(
            switchMap((newFilePath) => {
              return audioService.update(recording.pk!, {
                ...recording,
                audio_file: newFilePath,
              });
            }),
            take(1),
          )
          .subscribe({
            next: () => {
              patchState(store, {
                updateSessionaudioState: 'success',
              });
            },
            error: (err: HttpErrorResponse) => {
              if (err.status === 409) {
                patchState(store, {
                  updateSessionaudioState: 'error',
                  sessionaudioServerModel: err.error,
                });
              } else {
                toastService.addToast(httpErrorToast(err));
              }
            },
          });
      },
    };
  }),
);
