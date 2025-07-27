import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { of, shareReplay, switchMap, take } from 'rxjs';
import { OverviewItem } from 'src/app/_models/overview';
import { ArticleService } from 'src/app/_services/article/article.service';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { withQueries } from 'src/utils/store/withQueries';

interface SearchState {}

const initialState: SearchState = {};

export const SearchPageStore = signalStore(
  { providedIn: 'root' },
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
          switchMap((campaignName) => {
            if (searchString) {
              return articleService.getCampaignSearchArticle(
                campaignName,
                searchString,
              );
            } else {
              return of({ emptyResponse: '', articles: [] as OverviewItem[] });
            }
          }),
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
