import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { shareReplay, switchMap, take } from 'rxjs';
import { DiaryEntry, DiaryEntryRaw } from 'src/app/_models/diaryentry';
import { DiaryentryService } from 'src/app/_services/article/diaryentry.service';
import { SessionService } from 'src/app/_services/article/session.service';
import { UserService } from 'src/app/_services/article/user.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { handleError } from 'src/utils/store/toServerModel';
import { withQueries } from 'src/utils/store/withQueries';
import { withUpdates } from 'src/utils/store/withUpdates';

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
    };
  }),
);
