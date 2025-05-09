import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, take, tap } from 'rxjs';
import { PermissionGroup } from 'src/app/_models/auth';
import {
  BaseCampaignData,
  Campaign,
  CampaignRaw,
  WikiStatistics,
} from 'src/app/_models/campaign';
import { httpErrorToast } from 'src/app/_models/toast';
import { User, UserRaw } from 'src/app/_models/user';
import { GroupService } from 'src/app/_services/article/group.service';
import { UserService } from 'src/app/_services/article/user.service';
import { AdminService } from 'src/app/_services/utils/admin.service';
import { CampaignService } from 'src/app/_services/utils/campaign.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { replaceItem } from 'src/utils/array';
import { RequestState } from 'src/utils/store/factory-types';

export interface SiteAdministrationPageState {
  allSiteUsers: User[] | undefined;
  allSiteCampaigns: Campaign[] | undefined;
  allPermissionGroups: PermissionGroup[] | undefined;
  siteStatistics: WikiStatistics | undefined;
  createCampaignRequestState: RequestState;
  createUserRequestState: RequestState;
}

const initialState: SiteAdministrationPageState = {
  allSiteUsers: undefined,
  allSiteCampaigns: undefined,
  allPermissionGroups: undefined,
  siteStatistics: undefined,
  createCampaignRequestState: 'init',
  createUserRequestState: 'init',
};

export const SiteAdministrationPageStore = signalStore(
  withState(initialState),
  withMethods((state) => {
    const userService = inject(UserService);
    const groupService = inject(GroupService);
    const campaignService = inject(CampaignService);
    const adminService = inject(AdminService);
    const toastService = inject(ToastService);

    return {
      loadUsers: () => {
        patchState(state, { allSiteUsers: undefined });
        userService
          .list()
          .pipe(take(1))
          .subscribe((users) => patchState(state, { allSiteUsers: users }));
      },
      loadCampaigns: () => {
        patchState(state, { allSiteCampaigns: undefined });
        campaignService
          .list()
          .pipe(take(1))
          .subscribe((campaigns) =>
            patchState(state, { allSiteCampaigns: campaigns }),
          );
      },
      loadGroups: () => {
        patchState(state, { allPermissionGroups: undefined });
        groupService
          .list()
          .pipe(take(1))
          .subscribe((groups) =>
            patchState(state, { allPermissionGroups: groups }),
          );
      },
      loadStatistics: () => {
        patchState(state, { siteStatistics: undefined });
        adminService
          .getStatistics()
          .pipe(take(1))
          .subscribe((statistics) =>
            patchState(state, { siteStatistics: statistics }),
          );
      },
      createCampaign: rxMethod<BaseCampaignData>(
        pipe(
          tap(() =>
            patchState(state, { createCampaignRequestState: 'loading' }),
          ),
          switchMap((campaign) => {
            const requestData: CampaignRaw = {
              background_image: campaign.background_image as string,
              has_audio_recording_permission: false,
              is_deactivated: false,
              name: campaign.name,
              default_map_id: undefined,
              icon: campaign.icon,
              subtitle: campaign.subtitle,
            };
            return campaignService.create(requestData);
          }),
          tapResponse({
            next: (campaign) =>
              patchState(state, {
                allSiteCampaigns: [
                  campaign,
                  ...(state.allSiteCampaigns() ?? []),
                ],
                createCampaignRequestState: 'success',
              }),
            error: () =>
              patchState(state, { createCampaignRequestState: 'error' }),
          }),
        ),
      ),
      addUserToGroup(user: User, groupId: number): void {
        const newUserState: User = {
          ...user,
          groups: [...(user.groups ?? []), groupId],
        };
        userService
          .updateUserGroups(newUserState)
          .pipe(take(1))
          .subscribe((updatedUser) => {
            const newList = replaceItem(
              state.allSiteUsers() ?? [],
              updatedUser,
              'pk',
            );
            patchState(state, { allSiteUsers: newList });
          });
      },
      removeUserFromGroup(user: User, groupId: number): void {
        const newUserState: User = {
          ...user,
          groups: user.groups?.filter((id) => id !== groupId),
        };
        userService
          .updateUserGroups(newUserState)
          .pipe(take(1))
          .subscribe((updatedUser) => {
            const newList = replaceItem(
              state.allSiteUsers() ?? [],
              updatedUser,
              'pk',
            );
            patchState(state, { allSiteUsers: newList });
          });
      },
      startDatabaseDownload: (): void => {
        adminService
          .downloadDatabase()
          .pipe(take(1))
          .subscribe({
            next: (dataBlob: Blob) => {
              const a = document.createElement('a');
              const blobAsFileUrl = URL.createObjectURL(dataBlob);
              a.href = blobAsFileUrl;
              a.download = 'db.sqlite3';
              a.click();
              URL.revokeObjectURL(blobAsFileUrl);
            },
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          });
      },
      createUser: (user: User): void => {
        patchState(state, { createUserRequestState: 'loading' });
        userService
          .create(user as UserRaw)
          .pipe(take(1))
          .subscribe((createdUser) =>
            patchState(state, {
              allSiteUsers: [createdUser, ...(state.allSiteUsers() ?? [])],
              createUserRequestState: 'success',
            }),
          );
      },
      deleteUser: (user: User): void => {
        userService
          .delete(user.pk as number)
          .pipe(take(1))
          .subscribe(() =>
            patchState(state, {
              allSiteUsers: state
                .allSiteUsers()
                ?.filter((u) => u.pk !== user.pk),
            }),
          );
      },
    };
  }),
);
