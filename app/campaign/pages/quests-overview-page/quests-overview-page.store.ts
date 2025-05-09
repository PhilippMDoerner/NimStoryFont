import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { signalStore, withComputed, withState } from '@ngrx/signals';
import { shareReplay, switchMap, take } from 'rxjs';
import { QuestService } from 'src/app/_services/article/quest.service';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { withQueries } from 'src/utils/store/withQueries';

interface QuestOverviewPageState {}

const initialState: QuestOverviewPageState = {};

export const QuestOverviewPageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(() => {
    const globalStore = inject(GlobalStore);
    return {
      hasWritePermission: globalStore.canPerformActionsOfRole('member'),
    };
  }),
  withQueries(() => {
    const questService = inject(QuestService);
    const globalStore = inject(GlobalStore);
    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );
    return {
      campaignQuests: () =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) => questService.campaignList(campaignName)),
        ),
    };
  }),
);
