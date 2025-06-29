import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap, tap } from 'rxjs';
import { OverviewItem } from 'src/app/_models/overview';
import { httpErrorToast } from 'src/app/_models/toast';
import { ArticleService } from 'src/app/_services/article/article.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';

export interface HomePageState {
  recentlyUpdatedArticles: OverviewItem[];
  canLoadMore: boolean;
  isLoading: boolean;
}

const initialState: HomePageState = {
  recentlyUpdatedArticles: [],
  canLoadMore: true,
  isLoading: false,
};

export const HomePageStore = signalStore(
  withState(initialState),
  withMethods((state) => {
    const articleService = inject(ArticleService);
    const globalStore = inject(GlobalStore);
    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
    );
    const toastService = inject(ToastService);

    return {
      loadMoreArticles: rxMethod<number>(
        pipe(
          switchMap((pageNumber) =>
            campaignName$.pipe(map((campaign) => ({ campaign, pageNumber }))),
          ),
          tap(() => patchState(state, { isLoading: true })),
          switchMap(({ campaign, pageNumber }) =>
            articleService.getRecentlyUpdatedArticle(campaign, pageNumber),
          ),
          tapResponse({
            next: (articles) => {
              const isLastPage = articles.length === 0;
              const recentlyUpdatedArticles = state
                .recentlyUpdatedArticles()
                .concat(articles);

              patchState(state, {
                isLoading: false,
                canLoadMore: !isLastPage,
                recentlyUpdatedArticles,
              });
            },
            error: (err: HttpErrorResponse) => {
              toastService.addToast(httpErrorToast(err));
              patchState(state, { isLoading: false });
            },
          }),
        ),
      ),
      reset: () => patchState(state, initialState),
    };
  }),
);
