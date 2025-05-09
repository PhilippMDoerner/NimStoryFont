import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { shareReplay, switchMap, take } from 'rxjs';
import { Quest, QuestRaw } from 'src/app/_models/quest';
import { CharacterService } from 'src/app/_services/article/character.service';
import { QuestService } from 'src/app/_services/article/quest.service';
import { SessionService } from 'src/app/_services/article/session.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { handleError } from 'src/utils/store/toServerModel';
import { withQueries } from 'src/utils/store/withQueries';
import { withUpdates } from 'src/utils/store/withUpdates';

interface QuestCreateUpdatePageState {
  createState: RequestState;
}

const initialState: QuestCreateUpdatePageState = {
  createState: 'init',
};

export const QuestCreateUpdatePageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withQueries(() => {
    const globalStore = inject(GlobalStore);
    const questService = inject(QuestService);
    const sessionService = inject(SessionService);
    const characterService = inject(CharacterService);
    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );

    return {
      quest: (name: string) =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            questService.readByParam(campaignName, { name }),
          ),
        ),
      questStates: () => questService.getQuestStates(),
      campaignSessions: () =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            sessionService.campaignList(campaignName),
          ),
        ),
      questTakers: () =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            questService.getQuestTakers(campaignName),
          ),
        ),
      questGivers: () =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            characterService.campaignList(campaignName),
          ),
        ),
    };
  }),
  withUpdates(() => {
    const questService = inject(QuestService);

    return {
      quest: (quest: Quest) => questService.update(quest.pk as number, quest),
    };
  }),
  withMethods((store) => {
    const toastService = inject(ToastService);
    const questService = inject(QuestService);
    return {
      createQuest: (quest: QuestRaw) => {
        patchState(store, {
          createState: 'loading',
          quest: undefined,
          questError: undefined,
        });
        questService
          .create(quest)
          .pipe(take(1))
          .subscribe({
            next: (newQuest) =>
              patchState(store, {
                quest: newQuest,
                questError: undefined,
                createState: 'success',
              }),
            error: (err: HttpErrorResponse) =>
              handleError(store, err, toastService),
          });
      },
      reset: () =>
        patchState(store, {
          quest: undefined,
          questError: undefined,
          questQueryState: 'init',
          questUpdateError: undefined,
          createState: 'init',
          questUpdateState: 'init',
        }),
    };
  }),
);
