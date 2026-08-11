import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { shareReplay, switchMap, take } from 'rxjs';
import { filterNil } from '../../../../utils/rxjs-operators';
import { RequestState } from '../../../../utils/store/factory-types';
import { withQueries } from '../../../../utils/store/withQueries';
import { withUpdates } from '../../../../utils/store/withUpdates';
import { Item, ItemRaw } from '../../../_models/item';
import { httpErrorToast } from '../../../_models/toast';
import { CharacterService } from '../../../_services/article/character.service';
import { ItemService } from '../../../_services/article/item.service';
import { ToastService } from '../../../design/organisms/toast-overlay/toast.service';
import { GlobalStore } from '../../../global.store';

interface ItemCreateUpdateState {
  createState: RequestState;
}

const initialState: ItemCreateUpdateState = {
  createState: 'init',
};

export const ItemCreateUpdateStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withQueries(() => {
    const globalStore = inject(GlobalStore);
    const itemService = inject(ItemService);
    const characterService = inject(CharacterService);
    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );
    return {
      item: (name: string) =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            itemService.readByParam(campaignName, { name }),
          ),
        ),
      campaignCharacters: () =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            characterService.campaignList(campaignName),
          ),
        ),
    };
  }),
  withUpdates(() => {
    const itemService = inject(ItemService);
    return {
      item: (updated: Item) => itemService.update(updated.pk!, updated),
    };
  }),
  withMethods((store) => {
    const itemService = inject(ItemService);
    const toastService = inject(ToastService);
    return {
      reset: () =>
        patchState(store, {
          itemServerModel: undefined,
          item: undefined,
          itemError: undefined,
          itemUpdateError: undefined,
          createState: 'init',
          itemUpdateState: 'init',
          itemQueryState: 'init',
        }),
      createItem: (item: ItemRaw) => {
        patchState(store, { createState: 'loading', item: undefined });
        itemService.create(item).subscribe({
          next: (newItem) =>
            patchState(store, { item: newItem, createState: 'success' }),
          error: (err: HttpErrorResponse) =>
            toastService.addToast(httpErrorToast(err)),
        });
      },
    };
  }),
);
