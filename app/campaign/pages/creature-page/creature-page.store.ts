import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, shareReplay, switchMap, tap } from 'rxjs';
import { Creature } from 'src/app/_models/creature';
import { Image } from 'src/app/_models/image';
import { httpErrorToast } from 'src/app/_models/toast';
import { CreatureService } from 'src/app/_services/article/creature.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { replaceItem } from 'src/utils/array';
import { filterNil } from 'src/utils/rxjs-operators';
import { withImages } from 'src/utils/store/withImages';
import { withQueries } from 'src/utils/store/withQueries';
import { withUpdates } from 'src/utils/store/withUpdates';

interface CreatureState {
  imageServerModel?: Image;
}

const initialState: CreatureState = {};

export const CreaturePageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(() => {
    const globalStore = inject(GlobalStore);
    return {
      hasWritePermission: globalStore.canPerformActionsOfRole('member'),
    };
  }),
  withQueries(() => {
    const creatureService = inject(CreatureService);
    const globalStore = inject(GlobalStore);

    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );
    return {
      creature: (name: string) =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            creatureService.readByParam(campaignName, { name }),
          ),
        ),
    };
  }),
  withUpdates(() => {
    const creatureService = inject(CreatureService);
    return {
      creature: (data: Creature) =>
        creatureService.patch(data.pk as number, data),
    };
  }),
  withImages('creature', {
    onCreateSuccess: (store, image) => {
      const updatedCreature: Creature = {
        ...(store.creature() as Creature),
        images: [...(store.creature()?.images ?? []), image],
      };
      patchState(store, { creature: updatedCreature });
    },
    onDeleteSuccess: (store, imgPk) => {
      const updatedCerature: Creature = {
        ...(store.creature() as Creature),
        images: (store.creature()?.images ?? []).filter(
          (img) => img.pk !== imgPk,
        ),
      };
      patchState(store, { creature: updatedCerature });
    },
    onUpdateSuccess: (store, image) => {
      const updatedCreature: Creature = {
        ...(store.creature() as Creature),
        images: replaceItem(store.creature()?.images ?? [], image, 'pk'),
      };
      patchState(store, { creature: updatedCreature });
    },
  }),
  withMethods((store) => {
    const toastService = inject(ToastService);
    const creatureService = inject(CreatureService);
    return {
      reset: () =>
        patchState(store, {
          imageServerModel: undefined,
          creature: undefined,
          creatureError: undefined,
          creatureQueryState: 'init',
          creatureServerModel: undefined,
          creatureUpdateError: undefined,
          creatureUpdateState: 'init',
        }),
      deleteCreature: rxMethod<Creature>(
        pipe(
          tap(() => patchState(store, { creatureQueryState: 'loading' })),
          switchMap((creature) => creatureService.delete(creature.pk!)),
          tapResponse({
            next: () =>
              patchState(store, {
                creature: undefined,
                creatureQueryState: 'success',
              }),
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          }),
        ),
      ),
    };
  }),
);
