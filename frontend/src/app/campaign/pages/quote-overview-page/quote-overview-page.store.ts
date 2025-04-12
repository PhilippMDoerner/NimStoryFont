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
import { shareReplay, switchMap, take } from 'rxjs';
import { Quote, QuoteConnection, QuoteRaw } from 'src/app/_models/quote';
import { httpErrorToast } from 'src/app/_models/toast';
import { CharacterService } from 'src/app/_services/article/character.service';
import { EncounterService } from 'src/app/_services/article/encounter.service';
import { QuoteConnectionService } from 'src/app/_services/article/quote-connection.service';
import { QuoteService } from 'src/app/_services/article/quote.service';
import { SessionService } from 'src/app/_services/article/session.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { replaceItem } from 'src/utils/array';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { withQueries } from 'src/utils/store/withQueries';

interface QuoteOverviewState {
  updateQuoteState: RequestState;
  deleteQuoteState: RequestState;
  createQuoteState: RequestState;
  quoteServerModel: undefined | Quote;
}

const initialState: QuoteOverviewState = {
  updateQuoteState: 'init' as RequestState,
  deleteQuoteState: 'init' as RequestState,
  createQuoteState: 'init' as RequestState,
  quoteServerModel: undefined,
};

function sortQuotes(quotes: Quote[]): Quote[] {
  const newQuotes = [...quotes];
  newQuotes.sort((a, b) => {
    const sessionNumber1 = a.session_details.session_number;
    const sessionNumber2 = b.session_details.session_number;

    return sessionNumber1 - sessionNumber2;
  });
  return newQuotes;
}

export const QuoteOverviewPageStore = signalStore(
  withState(initialState),
  withComputed(() => {
    const globalStore = inject(GlobalStore);
    return {
      hasWritePermission: globalStore.canPerformActionsOfRole('member'),
    };
  }),
  withQueries(() => {
    const globalStore = inject(GlobalStore);
    const quoteService = inject(QuoteService);
    const characterService = inject(CharacterService);
    const sessionService = inject(SessionService);
    const encounterService = inject(EncounterService);
    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );
    return {
      character: (characterName: string) =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            characterService.readByParam(campaignName, { name: characterName }),
          ),
        ),
      quotes: (characterName: string) =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            quoteService.getAllCharacterQuotes(campaignName, characterName),
          ),
        ),
      campaignCharacters: () =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            characterService.campaignList(campaignName),
          ),
        ),
      campaignSessions: () =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            sessionService.campaignList(campaignName),
          ),
        ),
      campaignEncounters: () =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            encounterService.campaignList(campaignName),
          ),
        ),
    };
  }),
  withMethods((store) => {
    const quoteService = inject(QuoteService);
    const toastService = inject(ToastService);
    const quoteConnectionService = inject(QuoteConnectionService);
    return {
      reset: () =>
        patchState(store, {
          updateQuoteState: 'init',
          deleteQuoteState: 'init',
          createQuoteState: 'init',
          quoteServerModel: undefined,
          quotesQueryState: 'init',
          quotesError: undefined,
        }),
      updateQuote: (quote: Quote) => {
        patchState(store, {
          updateQuoteState: 'loading',
          quotesError: undefined,
          quoteServerModel: undefined,
        });

        quoteService
          .update(quote.pk, quote)
          .pipe(take(1))
          .subscribe({
            next: (newQuote) => {
              const quotes = store.quotes();
              if (!quotes) return;

              const newQuotes = replaceItem(quotes, newQuote, 'pk');
              patchState(store, {
                updateQuoteState: 'success',
                quotes: sortQuotes(newQuotes),
              });
            },
            error: (err: HttpErrorResponse) => {
              if (err.status === 409) {
                patchState(store, {
                  updateQuoteState: 'error',
                  quotesError: err.error,
                });
              } else {
                toastService.addToast(httpErrorToast(err));
              }
            },
          });
      },
      deleteQuote: (quotePk: number) => {
        patchState(store, {
          deleteQuoteState: 'loading',
          quotesError: undefined,
        });

        quoteService
          .delete(quotePk)
          .pipe(take(1))
          .subscribe({
            next: () =>
              patchState(store, {
                deleteQuoteState: 'success',
                quotes: store.quotes()?.filter((quote) => quote.pk !== quotePk),
              }),
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          });
      },
      createQuote: (quote: QuoteRaw) => {
        patchState(store, {
          createQuoteState: 'loading',
          quotesError: undefined,
        });

        quoteService.create(quote).subscribe({
          next: (newQuote) => {
            const newQuotes = [...(store.quotes() ?? []), newQuote];
            patchState(store, {
              createQuoteState: 'success',
              quotes: sortQuotes(newQuotes),
            });
          },
          error: (err: HttpErrorResponse) =>
            toastService.addToast(httpErrorToast(err)),
        });
      },
      createQuoteConnection(connection: QuoteConnection) {
        quoteConnectionService
          .create(connection)
          .pipe(take(1))
          .subscribe((newConnection) => {
            const quote = store
              .quotes()
              ?.find((item) => item.pk === newConnection.quote);
            if (!quote) return;

            const newQuote = {
              ...quote,
              connections: [...(quote?.connections ?? []), newConnection],
            };
            const newQuotes = replaceItem(store.quotes() ?? [], newQuote, 'pk');
            patchState(store, { quotes: newQuotes });
          });
      },
      deleteQuoteConnection(connection: QuoteConnection) {
        quoteConnectionService
          .delete(connection.pk as number)
          .pipe(take(1))
          .subscribe(() => {
            const quote = store
              .quotes()
              ?.find((item) => item.pk === connection.quote);
            if (!quote) return;

            const newQuote = {
              ...quote,
              connections: quote.connections?.filter(
                (con) => con.pk === connection.pk,
              ),
            };
            const newQuotes = replaceItem(store.quotes() ?? [], newQuote, 'pk');
            patchState(store, { quotes: newQuotes });
          });
      },
    };
  }),
);
