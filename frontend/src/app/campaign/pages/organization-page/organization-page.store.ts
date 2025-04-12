import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, shareReplay, switchMap, take } from 'rxjs';
import { OrganizationMembership } from 'src/app/_models/character';
import { Organization, OrganizationMember } from 'src/app/_models/organization';
import { OverviewItem } from 'src/app/_models/overview';
import { httpErrorToast, successToast } from 'src/app/_models/toast';
import { CharacterService } from 'src/app/_services/article/character.service';
import { OrganizationMembershipService } from 'src/app/_services/article/organization-membership.service';
import { OrganizationService } from 'src/app/_services/article/organization.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { replaceItem } from 'src/utils/array';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { handleError } from 'src/utils/store/toServerModel';
import { withImages } from 'src/utils/store/withImages';
import { withQueries } from 'src/utils/store/withQueries';
import { withUpdates } from 'src/utils/store/withUpdates';

interface OrganizationState {
  organizationDeleteState: RequestState;
}

const initialState: OrganizationState = {
  organizationDeleteState: 'init',
};

export const OrganizationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(() => {
    const globalStore = inject(GlobalStore);
    return {
      hasWritePermission: globalStore.canPerformActionsOfRole('member'),
    };
  }),
  withQueries(() => {
    const organizationService = inject(OrganizationService);
    const characterService = inject(CharacterService);
    const globalStore = inject(GlobalStore);

    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );

    return {
      organization: (name: string) =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            organizationService.readByParam(campaignName, { name }),
          ),
        ),
      campaignCharacters: () =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            characterService.campaignList(campaignName),
          ),
        ),
    };
  }),
  withImages('organization', {
    onCreateSuccess: (state, newImg) => {
      const newOrg = {
        ...(state.organization() as Organization),
        images: [...(state.organization()?.images ?? []), newImg],
      };
      patchState(state, { organization: newOrg });
    },
    onUpdateSuccess: (state, newImg) => {
      const newOrg = {
        ...(state.organization() as Organization),
        images: replaceItem(state.organization()?.images ?? [], newImg, 'pk'),
      };
      patchState(state, { organization: newOrg });
    },
    onDeleteSuccess: (state, imgPk) => {
      const newOrg = {
        ...(state.organization() as Organization),
        images:
          state.organization()?.images?.filter((img) => img.pk !== imgPk) ?? [],
      };
      patchState(state, { organization: newOrg });
    },
  }),
  withState(initialState),
  withMethods((state) => {
    const organizationService = inject(OrganizationService);
    const toastService = inject(ToastService);
    const membershipService = inject(OrganizationMembershipService);

    const organization$ = toObservable(state.organization).pipe(filterNil());

    return {
      reset: () =>
        patchState(state, {
          organizationDeleteState: 'init',
          organization: undefined,
          organizationError: undefined,
          organizationQueryState: 'init',
        }),
      deleteOrganization: (pk: number) => {
        patchState(state, {
          organizationDeleteState: 'loading',
        });
        organizationService.delete(pk).subscribe({
          next: () => {
            patchState(state, {
              organizationDeleteState: 'success',
            });
          },
          error: (err: HttpErrorResponse) =>
            handleError(state, err, toastService),
        });
      },
      createMembership: rxMethod<OverviewItem>(
        pipe(
          switchMap((item) =>
            organization$.pipe(
              take(1),
              map(
                (org) =>
                  ({
                    organization_id: org.pk as number,
                    role: 'member',
                    member_id: item.pk as number,
                  }) satisfies OrganizationMembership,
              ),
            ),
          ),
          switchMap((membershipData) =>
            membershipService.create(membershipData).pipe(
              map((newMember) => {
                const newMembership = newMember.organizations?.find(
                  (org) =>
                    org.organization_id === membershipData.organization_id,
                );
                if (!newMembership) return undefined;

                return {
                  alive: newMember.alive,
                  pk: newMember.pk as number,
                  organization_id: membershipData.organization_id,
                  role: membershipData.role,
                  name: newMember.name as string,
                  membership_id: newMembership.pk,
                } satisfies OrganizationMember;
              }),
              filterNil(),
            ),
          ),
          tapResponse({
            next: (newMember) => {
              const members = state.organization()?.members ?? [];
              const newMemberList = [...members, newMember];
              const newOrganization = {
                ...state.organization(),
                members: newMemberList,
              } as Organization;
              patchState(state, { organization: newOrganization });
              toastService.addToast(successToast('Added member successfully!'));
            },
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          }),
        ),
      ),
      deleteMembership: rxMethod<OrganizationMember>(
        pipe(
          switchMap((member) =>
            membershipService
              .delete(member.membership_id)
              .pipe(map(() => member.membership_id)),
          ),
          tapResponse({
            next: (membershipId) => {
              const members = state.organization()?.members ?? [];
              const newMemberList = members.filter(
                (member) => member.membership_id !== membershipId,
              );
              const newOrganization = {
                ...state.organization(),
                members: newMemberList,
              } as Organization;
              patchState(state, { organization: newOrganization });
              toastService.addToast(
                successToast('Removed member successfully!'),
              );
            },
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          }),
        ),
      ),
    };
  }),
  withUpdates(() => {
    const organizationService = inject(OrganizationService);
    return {
      organization: (update: Organization) =>
        organizationService.update(update.pk!, update),
    };
  }),
);
