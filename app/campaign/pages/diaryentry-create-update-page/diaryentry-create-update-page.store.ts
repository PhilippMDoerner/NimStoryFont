import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, shareReplay, switchMap, take, tap } from 'rxjs';
import { filterNil } from '../../../../utils/rxjs-operators';
import { handleError } from '../../../../utils/store/toServerModel';
import { withQueries } from '../../../../utils/store/withQueries';
import { withUpdates } from '../../../../utils/store/withUpdates';
import { DiaryEntry, DiaryEntryRaw } from '../../../_models/diaryentry';
import { SessionRaw } from '../../../_models/session';
import { DiaryentryService } from '../../../_services/article/diaryentry.service';
import { SessionService } from '../../../_services/article/session.service';
import { UserService } from '../../../_services/article/user.service';
import { ToastService } from '../../../design/organisms/toast-overlay/toast.service';
import { GlobalStore } from '../../../global.store';

interface DiaryEntryCreateUpdateState {
  serverModel: DiaryEntryRaw | undefined;
}

const initialState: DiaryEntryCreateUpdateState = {
  serverModel: undefined,
};

export const DiaryEntryCreateUpdatePageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withQueries(() => {
    const globalStore = inject(GlobalStore);
    const sessionService = inject(SessionService);
    const diaryentryService = inject(DiaryentryService);
    const userService = inject(UserService);

    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );

    return {
      diaryentry: (params: {
        name: string;
        isMainSession: 0 | 1 | '0' | '1';
        sessionNumber: number | string;
      }) =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            diaryentryService.readByParam(campaignName, params),
          ),
        ),
      authors: () =>
        campaignName$.pipe(
          switchMap((campaignName) => userService.campaignList(campaignName)),
        ),
      sessions: () =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            sessionService.campaignList(campaignName),
          ),
        ),
    };
  }),
  withUpdates(() => {
    const diaryentryService = inject(DiaryentryService);
    return {
      diaryentry: (update: DiaryEntry) =>
        diaryentryService.patch(update.pk!, update),
    };
  }),
  withMethods((store) => {
    const diaryentryService = inject(DiaryentryService);
    const toastService = inject(ToastService);
    const sessionService = inject(SessionService);
    return {
      reset: () => {
        patchState(store, {
          diaryentry: undefined,
          diaryentryQueryState: 'init',
          diaryentryError: undefined,
          diaryentryServerModel: undefined,
          diaryentryUpdateError: undefined,
          diaryentryUpdateState: 'init',
        });
      },
      createDiaryentry: (data: DiaryEntryRaw) => {
        patchState(store, {
          diaryentryQueryState: 'loading',
          serverModel: undefined,
        });
        diaryentryService
          .create(data)
          .pipe(take(1))
          .subscribe({
            next: (newDiaryentry) =>
              patchState(store, {
                diaryentry: newDiaryentry,
                diaryentryQueryState: 'success',
              }),
            error: (err: HttpErrorResponse) =>
              handleError(store, err, toastService),
          });
      },
      createSession: rxMethod<SessionRaw>(
        pipe(
          switchMap((sessionData) => sessionService.create(sessionData)),
          tap(() => store.loadSessions()),
        ),
      ),
    };
  }),
);
