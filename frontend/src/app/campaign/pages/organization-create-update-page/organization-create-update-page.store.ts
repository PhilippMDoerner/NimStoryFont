import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { shareReplay, switchMap, take } from 'rxjs';
import { Organization, OrganizationRaw } from 'src/app/_models/organization';
import { CharacterService } from 'src/app/_services/article/character.service';
import { LocationService } from 'src/app/_services/article/location.service';
import { OrganizationService } from 'src/app/_services/article/organization.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { handleError } from 'src/utils/store/toServerModel';
import { withQueries } from 'src/utils/store/withQueries';
import { withUpdates } from 'src/utils/store/withUpdates';

interface OrganizationCreateUpdatePageState {
  createState: RequestState;
}

const initialState: OrganizationCreateUpdatePageState = {
  createState: 'init',
};

export const OrganizationCreateUpdatePageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withQueries(() => {
    const globalStore = inject(GlobalStore);
    const organizationService = inject(OrganizationService);
    const locationService = inject(LocationService);
    const characterService = inject(CharacterService);
    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );
    return {
      organization: (name: string) =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            organizationService.readByParam(campaignName, { name }),
          ),
        ),
      campaignLocations: () =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            locationService.campaignList(campaignName),
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
    const organizationService = inject(OrganizationService);
    return {
      organization: (organization: Organization) =>
        organizationService.update(organization.pk as number, organization),
    };
  }),
  withMethods((store) => {
    const organizationService = inject(OrganizationService);
    const toastService = inject(ToastService);
    return {
      reset: () =>
        patchState(store, {
          organization: undefined,
          organizationError: undefined,
          organizationQueryState: 'init',
          organizationUpdateState: 'init',
          organizationUpdateError: undefined,
          organizationServerModel: undefined,
          createState: 'init',
        }),
      createOrganization: (organization: OrganizationRaw) => {
        patchState(store, {
          createState: 'loading',
          organization: undefined,
          organizationError: undefined,
        });
        organizationService.create(organization).subscribe({
          next: (newOrganization) =>
            patchState(store, {
              organization: newOrganization,
              createState: 'success',
              organizationError: undefined,
              organizationServerModel: undefined,
            }),
          error: (err: HttpErrorResponse) =>
            handleError(store, err, toastService),
        });
      },
    };
  }),
);
