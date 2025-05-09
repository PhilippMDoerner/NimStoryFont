import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { shareReplay, switchMap } from 'rxjs';
import { Location, LocationRaw } from 'src/app/_models/location';
import { LocationService } from 'src/app/_services/article/location.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { handleError } from 'src/utils/store/toServerModel';
import { withQueries } from 'src/utils/store/withQueries';
import { withUpdates } from 'src/utils/store/withUpdates';

interface LocationCreateUpdateState {
  createState: RequestState;
}

const initialState: LocationCreateUpdateState = {
  createState: 'init',
};

export const LocationCreateUpdateStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withQueries(() => {
    const globalStore = inject(GlobalStore);
    const locationService = inject(LocationService);
    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );
    return {
      location: (params: { name: string; parentLocationName: string }) =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            locationService.readByParam(campaignName, params),
          ),
        ),
      campaignLocations: () =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            locationService.campaignList(campaignName),
          ),
        ),
    };
  }),
  withUpdates(() => {
    const locationService = inject(LocationService);
    return {
      location: (location: Location) =>
        locationService.update(location.pk as number, location),
    };
  }),
  withMethods((store) => {
    const locationService = inject(LocationService);
    const toastService = inject(ToastService);
    return {
      reset: () =>
        patchState(store, {
          createState: 'init',
          location: undefined,
          locationError: undefined,
          locationQueryState: 'init',
        }),
      createLocation: (location: LocationRaw) => {
        patchState(store, {
          createState: 'loading',
          location: undefined,
          locationError: undefined,
        });
        locationService.create(location).subscribe({
          next: (newLocation) =>
            patchState(store, {
              location: newLocation,
              createState: 'success',
            }),
          error: (err) => handleError(store, err, toastService),
        });
      },
    };
  }),
);
