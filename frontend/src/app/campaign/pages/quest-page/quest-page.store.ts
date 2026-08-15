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
import { filterNil } from '../../../../utils/rxjs-operators';
import { RequestState } from '../../../../utils/store/factory-types';
import { handleError } from '../../../../utils/store/toServerModel';
import { withQueries } from '../../../../utils/store/withQueries';
import { withUpdates } from '../../../../utils/store/withUpdates';
import { Quest } from '../../../_models/quest';
import { QuestService } from '../../../_services/article/quest.service';
import { ToastService } from '../../../design/organisms/toast-overlay/toast.service';
import { GlobalStore } from '../../../global.store';

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
  withUpdates(
    () => {
      const questService = inject(QuestService);
      return {
        quest: (updatedQuest: Quest) =>
          questService.update(updatedQuest.pk as number, updatedQuest),
      };
    },
    { suppressUpdateNotification: true },
  ),
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
