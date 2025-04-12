import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EMPTY, filter, map, pipe, switchMap, take } from 'rxjs';
import { Campaign, WikiStatistics } from 'src/app/_models/campaign';
import { EmptySearchResponse } from 'src/app/_models/emptySearchResponse';
import { httpErrorToast } from 'src/app/_models/toast';
import { CampaignRole } from 'src/app/_models/token';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/article/user.service';
import { CampaignService } from 'src/app/_services/utils/campaign.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';

export interface CampaignAdminPageState {
  campaign: Campaign | undefined;
  users: User[] | undefined;
  campaignStatistics: WikiStatistics | undefined;
}

const initialState: CampaignAdminPageState = {
  campaign: undefined,
  users: undefined,
  campaignStatistics: undefined,
};

export const CampaignAdminPageStore = signalStore(
  withState(initialState),
  withMethods((state) => {
    const userService = inject(UserService);
    const campaignService = inject(CampaignService);
    const globalStore = inject(GlobalStore);
    const toastService = inject(ToastService);

    const currentCampaign$ = toObservable(globalStore.currentCampaign).pipe(
      filterNil(),
    );

    return {
      loadUsers: () => {
        userService
          .list()
          .pipe(take(1))
          .subscribe((users) => patchState(state, { users }));
      },
      loadCampaign: () => {
        currentCampaign$
          .pipe(
            switchMap((campaign) => campaignService.read(campaign.pk)),
            take(1),
          )
          .subscribe((campaign) => patchState(state, { campaign }));
      },
      loadCampaignStatistics: () => {
        currentCampaign$
          .pipe(
            switchMap((campaign) => campaignService.statistics(campaign.name)),
            take(1),
          )
          .subscribe((statistics) =>
            patchState(state, { campaignStatistics: statistics }),
          );
      },
      addMemberToCampaignGroup: rxMethod<{
        role: CampaignRole;
        addedUser: User;
      }>(
        pipe(
          map((value) => ({
            role: value.role,
            addedUser: value.addedUser,
            campaign: state.campaign()?.name,
          })),
          filter((value) => value.campaign != null),
          switchMap(({ role, addedUser, campaign }) => {
            const campaignName = campaign as string;
            let obs$;
            switch (role) {
              case 'member':
                obs$ = campaignService.addMember(campaignName, addedUser);
                break;
              case 'admin':
                obs$ = campaignService.addAdmin(campaignName, addedUser);
                break;
              case 'guest':
                obs$ = campaignService.addGuest(campaignName, addedUser);
                break;
              default:
                obs$ = EMPTY;
                break;
            }
            return obs$.pipe(
              map((val) => ({
                users: val,
                role,
                addedUser,
                campaign,
              })),
            );
          }),
          tapResponse({
            next: ({ role, users }) => {
              const campaign = {
                ...state.campaign(),
              } as Campaign;
              switch (role) {
                case 'member':
                  campaign.members = users;
                  break;
                case 'admin':
                  campaign.admins = users;
                  break;
                case 'guest':
                  campaign.guests = users;
                  break;
                default:
                  break;
              }

              patchState(state, { campaign });
            },
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          }),
        ),
      ),
      removeMemberFromCampaignGroup: rxMethod<{
        role: CampaignRole;
        user: User;
      }>(
        pipe(
          map((value) => ({
            ...value,
            campaign: state.campaign()?.name,
          })),
          filter((value) => value.campaign != null),
          switchMap(({ role, user, campaign }) => {
            const campaignName = campaign as string;
            let obs$;
            switch (role) {
              case 'admin':
                obs$ = campaignService.removeAdmin(campaignName, user);
                break;
              case 'member':
                obs$ = campaignService.removeMember(campaignName, user);
                break;
              case 'guest':
                obs$ = campaignService.removeGuest(campaignName, user);
                break;
              default:
                obs$ = EMPTY;
                break;
            }
            return obs$.pipe(
              map((users) => ({
                users,
                role,
                user,
                campaign,
              })),
            );
          }),
          tapResponse({
            next: ({ role, users }) => {
              const campaign = {
                ...state.campaign(),
              } as Campaign;
              switch (role) {
                case 'admin':
                  campaign.admins = users;
                  break;
                case 'member':
                  campaign.members = users;
                  break;
                case 'guest':
                  campaign.guests = users;
                  break;
                default:
                  break;
              }

              patchState(state, { campaign });
            },
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          }),
        ),
      ),
      deleteEmptySearchResponse: rxMethod<EmptySearchResponse>(
        pipe(
          switchMap((deleteItem) =>
            campaignService
              .deleteEmptySearchResponse(deleteItem.id)
              .pipe(map(() => deleteItem)),
          ),
          tapResponse({
            next: (deleteItem: EmptySearchResponse) => {
              const campaign = state.campaign();
              if (campaign == null) return;

              const newCampaign: Campaign | undefined = {
                ...campaign,
                emptySearchResponses: campaign.emptySearchResponses?.filter(
                  (item) => item.id !== deleteItem.id,
                ),
              };

              patchState(state, { campaign: newCampaign });
            },
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          }),
        ),
      ),
      addEmptySearchResponse: rxMethod<EmptySearchResponse>(
        pipe(
          switchMap((newItem) =>
            campaignService.addEmptySearchResponse(newItem),
          ),
          tapResponse({
            next: (updatedCampaign) => {
              patchState(state, { campaign: updatedCampaign });
            },
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          }),
        ),
      ),
    };
  }),
);
