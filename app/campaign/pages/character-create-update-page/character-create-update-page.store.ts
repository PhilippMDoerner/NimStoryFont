import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap, tap } from 'rxjs';
import { CharacterDetails, CharacterRaw } from 'src/app/_models/character';
import { httpErrorToast } from 'src/app/_models/toast';
import { CharacterService } from 'src/app/_services/article/character.service';
import { LocationService } from 'src/app/_services/article/location.service';
import { OrganizationService } from 'src/app/_services/article/organization.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { sortByProp } from 'src/utils/array';
import { filterNil } from 'src/utils/rxjs-operators';
import { withQueries } from 'src/utils/store/withQueries';

export interface CharacterCreateUpdateState {
  serverModel: CharacterDetails | undefined;
}

const initialState: CharacterCreateUpdateState = {
  serverModel: undefined,
};

export const CharacterCreateUpdateStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withQueries(() => {
    const globalStore = inject(GlobalStore);
    const characterService = inject(CharacterService);
    const locationService = inject(LocationService);
    const organizationService = inject(OrganizationService);
    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
    );

    return {
      character: (name: string) =>
        campaignName$.pipe(
          switchMap((campaign) =>
            characterService.readByParam(campaign, { name }),
          ),
        ),
      campaignOrganizations: () =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            organizationService.campaignList(campaignName),
          ),
        ),
      campaignLocations: () =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            locationService.campaignList(campaignName),
          ),
          map((list) => sortByProp(list, 'name_full')),
        ),
    };
  }),
  withMethods((store) => {
    const characterService = inject(CharacterService);
    const toastService = inject(ToastService);
    return {
      reset: () =>
        patchState(store, {
          character: undefined,
          characterError: undefined,
          characterQueryState: 'init',
          serverModel: undefined,
        }),
      updateCharacter: rxMethod<CharacterDetails>(
        pipe(
          tap(() => patchState(store, { characterQueryState: 'loading' })),
          switchMap((data) => characterService.update(data.pk as number, data)),
          tapResponse({
            next: (updatedData) =>
              patchState(store, {
                character: updatedData,
                characterQueryState: 'success',
              }),
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          }),
        ),
      ),
      createCharacter: rxMethod<CharacterRaw>(
        pipe(
          tap(() =>
            patchState(store, {
              characterQueryState: 'loading',
              serverModel: undefined,
            }),
          ),
          switchMap((data) => characterService.create(data)),
          tapResponse({
            next: (createdData) =>
              patchState(store, {
                character: createdData,
                characterQueryState: 'success',
              }),
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          }),
        ),
      ),
    };
  }),
);
