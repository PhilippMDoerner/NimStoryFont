import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { combineLatest, shareReplay, switchMap, take } from 'rxjs';
import { MapService } from 'src/app/_services/article/map.service';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { withQueries } from 'src/utils/store/withQueries';

interface MapPageState {
  mapDeleteState: RequestState;
}

const initialState: MapPageState = {
  mapDeleteState: 'init',
};

export const MapPageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(() => {
    const globalStore = inject(GlobalStore);
    return {
      hasWritePermission: globalStore.canPerformActionsOfRole('member'),
    };
  }),
  withQueries(() => {
    const mapService = inject(MapService);
    const globalStore = inject(GlobalStore);

    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );
    return {
      campaignMaps: () =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) => mapService.campaignList(campaignName)),
        ),
      map: (name: string) =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            mapService.readByParam(campaignName, { name }),
          ),
        ),
    };
  }),
  withMethods((store) => {
    const mapService = inject(MapService);
    const globalStore = inject(GlobalStore);

    const maps$ = toObservable(store.campaignMaps).pipe(filterNil());
    const currentCampaign$ = toObservable(globalStore.currentCampaign).pipe(
      filterNil(),
    );
    return {
      reset: () => {
        patchState(store, {
          mapError: undefined,
          mapQueryState: 'init',
          mapDeleteState: 'init',
          map: undefined,
          campaignMaps: undefined,
        });
      },
      loadDefaultMap: () => {
        combineLatest({
          maps: maps$,
          currentCampaign: currentCampaign$,
        })
          .pipe(take(1))
          .subscribe(({ maps, currentCampaign }) => {
            const defaultMapName = currentCampaign.default_map_details?.name;

            if (defaultMapName) {
              store.loadMap(defaultMapName);
            } else {
              const fallbackDefaultMapName = maps[0].name;
              store.loadMap(fallbackDefaultMapName);
            }
          });
      },
      deleteMap: (mapPk: number) => {
        patchState(store, { mapDeleteState: 'loading', mapError: undefined });
        mapService
          .delete(mapPk)
          .pipe(take(1))
          .subscribe({
            next: () => {
              const newMaps = store
                .campaignMaps()
                ?.filter((map) => map.pk !== mapPk);
              patchState(store, {
                campaignMaps: newMaps,
                mapDeleteState: 'success',
                map: undefined,
              });

              const hasNextMap = newMaps && newMaps.length > 0;
              if (hasNextMap) {
                const nextMap = newMaps[0];
                store.loadMap(nextMap.name);
              }
            },
          });
      },
    };
  }),
);
