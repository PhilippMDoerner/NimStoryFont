import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { shareReplay, switchMap } from 'rxjs';
import { Quest } from 'src/app/_models/quest';
import { QuestService } from 'src/app/_services/article/quest.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { handleError } from 'src/utils/store/toServerModel';
import { withQueries } from 'src/utils/store/withQueries';
import { withUpdates } from 'src/utils/store/withUpdates';

interface QuestPageState {
  questDeleteState: RequestState;
}

const initialState: QuestPageState = {
  questDeleteState: 'init',
};

export const QuestPageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(() => {
    const globalStore = inject(GlobalStore);
    return {
      hasWritePermission: globalStore.canPerformActionsOfRole('member'),
    };
  }),
  withQueries(() => {
    const globalStore = inject(GlobalStore);
    const questService = inject(QuestService);
    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      shareReplay(1),
      filterNil(),
    );

    return {
      quest: (name: string) =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            questService.readByParam(campaignName, { name }),
          ),
        ),
    };
  }),
  withUpdates(() => {
    const questService = inject(QuestService);
    return {
      quest: (updatedQuest: Quest) =>
        questService.update(updatedQuest.pk as number, updatedQuest),
    };
  }),
  withMethods((state) => {
    const questService = inject(QuestService);
    const toastService = inject(ToastService);
    return {
      deleteQuest: (pk: number) => {
        patchState(state, {
          questDeleteState: 'loading',
          questError: undefined,
        });
        questService.delete(pk).subscribe({
          next: () =>
            patchState(state, {
              quest: undefined,
              questDeleteState: 'success',
              questError: undefined,
            }),
          error: (err: HttpErrorResponse) =>
            handleError(state, err, toastService),
        });
      },
    };
  }),
);
