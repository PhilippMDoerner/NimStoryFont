import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { shareReplay, switchMap, take } from 'rxjs';
import { ArticleService } from 'src/app/_services/article/article.service';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { withQueries } from 'src/utils/store/withQueries';

interface SearchState {}

const initialState: SearchState = {};

export const SearchPageStore = signalStore(
  withState(initialState),
  withQueries(() => {
    const articleService = inject(ArticleService);
    const globalStore = inject(GlobalStore);
    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );
    return {
      searchArticles: (searchString: string) =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            articleService.getCampaignSearchArticle(campaignName, searchString),
          ),
        ),
    };
  }),
  withMethods((store) => {
    return {
      reset: () =>
        patchState(store, {
          searchArticlesError: undefined,
          searchArticlesQueryState: 'init',
          searchArticles: undefined,
        }),
    };
  }),
);
