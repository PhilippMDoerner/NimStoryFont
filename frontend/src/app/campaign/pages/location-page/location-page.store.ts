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
import { Location } from 'src/app/_models/location';
import { CharacterService } from 'src/app/_services/article/character.service';
import { LocationService } from 'src/app/_services/article/location.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { replaceItem } from 'src/utils/array';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { handleError } from 'src/utils/store/toServerModel';
import { withImages } from 'src/utils/store/withImages';
import { withQueries } from 'src/utils/store/withQueries';
import { withUpdates } from 'src/utils/store/withUpdates';

interface LocationPageState {
  locationDeleteState: RequestState;
}

const initialState: LocationPageState = {
  locationDeleteState: 'init',
};

export const LocationPageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(() => {
    const globalStore = inject(GlobalStore);
    return {
      hasWritePermission: globalStore.canPerformActionsOfRole('member'),
    };
  }),
  withQueries(() => {
    const globalStore = inject(GlobalStore);
    const locationService = inject(LocationService);
    const characterService = inject(CharacterService);

    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );
    return {
      location: (params: { name: string; parentLocationName: string }) =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            locationService.readByParam(campaignName, params),
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
    const locationService = inject(LocationService);
    return {
      location: (location: Location) =>
        locationService.update(location.pk as number, location),
    };
  }),
  withImages('location', {
    onCreateSuccess: (store, image) => {
      const updatedLocation: Location = {
        ...(store.location() as Location),
        images: [...(store.location()?.images ?? []), image],
      };
      patchState(store, { location: updatedLocation });
    },
    onDeleteSuccess: (store, imgPk) => {
      const updatedCerature: Location = {
        ...(store.location() as Location),
        images: (store.location()?.images ?? []).filter(
          (img) => img.pk !== imgPk,
        ),
      };
      patchState(store, { location: updatedCerature });
    },
    onUpdateSuccess: (store, image) => {
      const updatedLocation: Location = {
        ...(store.location() as Location),
        images: replaceItem(store.location()?.images ?? [], image, 'pk'),
      };
      patchState(store, { location: updatedLocation });
    },
  }),
  withMethods((store) => {
    const locationService = inject(LocationService);
    const toastService = inject(ToastService);

    return {
      reset: () =>
        patchState(store, {
          location: undefined,
          locationError: undefined,
          locationQueryState: 'init',
        }),
      deleteLocation: (locationPk: number) => {
        patchState(store, {
          locationDeleteState: 'loading',
          locationError: undefined,
        });
        locationService.delete(locationPk).subscribe({
          next: () =>
            patchState(store, {
              location: undefined,
              locationDeleteState: 'success',
              locationError: undefined,
            }),
          error: (err) => handleError(store, err, toastService),
        });
      },
    };
  }),
);
