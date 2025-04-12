import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, shareReplay, switchMap, tap } from 'rxjs';
import { Creature, CreatureRaw } from 'src/app/_models/creature';
import { CreatureService } from 'src/app/_services/article/creature.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { handleError } from 'src/utils/store/toServerModel';
import { withQueries } from 'src/utils/store/withQueries';
interface CreatureUpdateCreateState {
  serverModel: CreatureRaw | undefined;
}

const initialState: CreatureUpdateCreateState = {
  serverModel: undefined,
};

export const CreatureUpdateCreateStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
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
  withMethods((store) => {
    const toastService = inject(ToastService);
    const creatureService = inject(CreatureService);

    return {
      reset: () => {
        patchState(store, {
          creature: undefined,
          creatureError: undefined,
          creatureQueryState: 'init',
          serverModel: undefined,
        });
      },
      updateCreature: rxMethod<Creature>(
        pipe(
          tap(() =>
            patchState(store, {
              creatureQueryState: 'loading',
              serverModel: undefined,
            }),
          ),
          switchMap((data) => creatureService.update(data.pk as number, data)),
          tapResponse({
            next: (updatedData) =>
              patchState(store, {
                creature: updatedData,
                creatureQueryState: 'success',
              }),
            error: (err: HttpErrorResponse) =>
              handleError(store, err, toastService),
          }),
        ),
      ),
      createCreature: rxMethod<CreatureRaw>(
        pipe(
          tap(() => patchState(store, { creatureQueryState: 'loading' })),
          switchMap((data) => creatureService.create(data)),
          tapResponse({
            next: (createdData) =>
              patchState(store, {
                creature: createdData,
                creatureQueryState: 'success',
              }),
            error: (err: HttpErrorResponse) =>
              handleError(store, err, toastService),
          }),
        ),
      ),
    };
  }),
);
