import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { switchMap, take } from 'rxjs';
import { Map, MapRaw } from 'src/app/_models/map';
import { MapService } from 'src/app/_services/article/map.service';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { withQueries } from 'src/utils/store/withQueries';
import { withUpdates } from 'src/utils/store/withUpdates';

interface MapCreateUpdateState {
  mapCreateState: RequestState;
}

const initialState: MapCreateUpdateState = {
  mapCreateState: 'init',
};

export const MapCreateUpdateStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withQueries(() => {
    const mapService = inject(MapService);
    const globalStore = inject(GlobalStore);

    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
    );

    return {
      map: (name: string) =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            mapService.readByParam(campaignName, { name }),
          ),
        ),
    };
  }),
  withUpdates(() => {
    const mapService = inject(MapService);

    return {
      map: (map: Map) => mapService.patch(map.pk as number, map),
    };
  }),
  withMethods((store) => {
    const mapService = inject(MapService);

    return {
      reset: () =>
        patchState(store, {
          map: undefined,
          mapCreateState: 'init',
          mapError: undefined,
          mapQueryState: 'init',
          mapUpdateError: undefined,
          mapServerModel: undefined,
          mapUpdateState: 'init',
        }),
      createMap: (map: MapRaw) => {
        patchState(store, {
          map: undefined,
          mapError: undefined,
          mapServerModel: undefined,
          mapCreateState: 'loading',
        });
        mapService
          .create(map)
          .pipe(take(1))
          .subscribe({
            next: (map: Map) =>
              patchState(store, { map, mapCreateState: 'success' }),
            error: () => patchState(store, { mapCreateState: 'error' }),
          });
      },
    };
  }),
);
