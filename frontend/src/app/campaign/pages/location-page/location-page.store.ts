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
import { replaceItem } from '../../../../utils/array';
import { filterNil } from '../../../../utils/rxjs-operators';
import { RequestState } from '../../../../utils/store/factory-types';
import { handleError } from '../../../../utils/store/toServerModel';
import { withImages } from '../../../../utils/store/withImages';
import { withQueries } from '../../../../utils/store/withQueries';
import { withUpdates } from '../../../../utils/store/withUpdates';
import { Location } from '../../../_models/location';
import { CharacterService } from '../../../_services/article/character.service';
import { LocationService } from '../../../_services/article/location.service';
import { ToastService } from '../../../design/organisms/toast-overlay/toast.service';
import { GlobalStore } from '../../../global.store';

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
  withUpdates(
    () => {
      const locationService = inject(LocationService);
      return {
        location: (location: Location) =>
          locationService.update(location.pk as number, location),
      };
    },
    { suppressUpdateNotification: true },
  ),
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
