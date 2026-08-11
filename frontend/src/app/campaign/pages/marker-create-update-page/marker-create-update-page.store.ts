import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { shareReplay, switchMap, take } from 'rxjs';
import { filterNil } from '../../../../utils/rxjs-operators';
import { RequestState } from '../../../../utils/store/factory-types';
import { withQueries } from '../../../../utils/store/withQueries';
import { withUpdates } from '../../../../utils/store/withUpdates';
import { MapMarker, MapMarkerRaw } from '../../../_models/mapMarker';
import { httpErrorToast } from '../../../_models/toast';
import { LocationService } from '../../../_services/article/location.service';
import { MapService } from '../../../_services/article/map.service';
import { MarkerTypeService } from '../../../_services/article/marker-type.service';
import { MarkerService } from '../../../_services/article/marker.service';
import { ToastService } from '../../../design/organisms/toast-overlay/toast.service';
import { GlobalStore } from '../../../global.store';

interface MarkerCreateUpdateState {
  createMarkerState: RequestState;
}

const initialState: MarkerCreateUpdateState = {
  createMarkerState: 'init',
};

export const MarkerCreateUpdateStore = signalStore(
  { providedIn: 'root' },
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
