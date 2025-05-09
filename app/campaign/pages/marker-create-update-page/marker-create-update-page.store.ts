import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { shareReplay, switchMap, take } from 'rxjs';
import { MapMarker, MapMarkerRaw } from 'src/app/_models/mapMarker';
import { httpErrorToast } from 'src/app/_models/toast';
import { LocationService } from 'src/app/_services/article/location.service';
import { MapService } from 'src/app/_services/article/map.service';
import { MarkerTypeService } from 'src/app/_services/article/marker-type.service';
import { MarkerService } from 'src/app/_services/article/marker.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { withQueries } from 'src/utils/store/withQueries';
import { withUpdates } from 'src/utils/store/withUpdates';

interface MarkerCreateUpdateState {
  createMarkerState: RequestState;
}

const initialState: MarkerCreateUpdateState = {
  createMarkerState: 'init',
};

export const MarkerCreateUpdateStore = signalStore(
  withState(initialState),
  withQueries(() => {
    const globalStore = inject(GlobalStore);
    const markerService = inject(MarkerService);
    const locationService = inject(LocationService);
    const mapService = inject(MapService);
    const markerTypeService = inject(MarkerTypeService);
    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );
    return {
      marker: (param: {
        parentLocationName: string;
        locationName: string;
        name: string;
      }) =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            markerService.readByParam(campaignName, param),
          ),
        ),
      campaignLocations: () =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            locationService.campaignList(campaignName),
          ),
        ),
      campaignMaps: () =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) => mapService.campaignList(campaignName)),
        ),
      markerTypes: () => markerTypeService.list(),
    };
  }),
  withUpdates(() => {
    const markerService = inject(MarkerService);
    return {
      marker: (updatedMarker: MapMarker) =>
        markerService.update(updatedMarker.pk!, updatedMarker),
    };
  }),
  withMethods((store) => {
    const markerService = inject(MarkerService);
    const toastService = inject(ToastService);

    return {
      createMarker: (marker: MapMarkerRaw) => {
        patchState(store, { createMarkerState: 'loading', marker: undefined });
        markerService.create(marker).subscribe({
          next: (marker) => {
            patchState(store, { createMarkerState: 'success', marker });
          },
          error: (err: HttpErrorResponse) =>
            toastService.addToast(httpErrorToast(err)),
        });
      },
    };
  }),
);
