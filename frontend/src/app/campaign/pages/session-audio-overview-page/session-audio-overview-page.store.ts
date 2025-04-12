import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { shareReplay, switchMap, take } from 'rxjs';
import { SessionAudioService } from 'src/app/_services/article/session-audio.service';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { withQueries } from 'src/utils/store/withQueries';

interface SessionAuddioOverviewPageState {}

const initialState: SessionAuddioOverviewPageState = {};

export const SessionAudioOverviewPageStore = signalStore(
  withState(initialState),
  withComputed(() => {
    const globalStore = inject(GlobalStore);
    return {
      hasWritePermission: globalStore.canPerformActionsOfRole('member'),
    };
  }),
  withQueries(() => {
    const globalStore = inject(GlobalStore);
    const sessionaudioService = inject(SessionAudioService);
    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );

    return {
      campaignSessionAudios: () =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            sessionaudioService.campaignList(campaignName),
          ),
        ),
    };
  }),
  withMethods((state) => {
    return {
      reset: () =>
        patchState(state, {
          campaignSessionAudios: undefined,
          campaignSessionAudiosError: undefined,
          campaignSessionAudiosQueryState: 'init',
        }),
    };
  }),
);
