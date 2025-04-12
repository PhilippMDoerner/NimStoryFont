import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { EMPTY, switchMap, take } from 'rxjs';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/article/user.service';
import { CampaignService } from 'src/app/_services/utils/campaign.service';
import { GlobalUrlParamsService } from 'src/app/_services/utils/global-url-params.service';
import { AuthStore } from 'src/app/auth.store';
import { CampaignMembership } from 'src/app/design/templates/_models/campaign-membership';
import { PasswordModel } from 'src/app/design/templates/profile/profile.component';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';

export interface ProfilePageState {
  user: User | undefined;
}

const iniitalState: ProfilePageState = {
  user: undefined,
};

export const ProfilePageStore = signalStore(
  withState(iniitalState),
  withMethods((state) => {
    const authStore = inject(AuthStore);
    const userService = inject(UserService);
    const globalStore = inject(GlobalStore);

    const currentUserPk$ = toObservable(authStore.currentUserPk).pipe(
      filterNil(),
      take(1),
    );
    return {
      loadThisUser: () => {
        patchState(state, { user: undefined });
        currentUserPk$
          .pipe(
            switchMap((userPK) => userService.read(userPK)),
            take(1),
          )
          .subscribe((user) => patchState(state, { user }));
      },
      profileUpdate: (profile: Partial<User>) => {
        currentUserPk$
          .pipe(
            switchMap((userPk) => userService.patchUser(userPk, profile)),
            take(1),
          )
          .subscribe((user) => patchState(state, { user }));
      },
      passwordUpdate: (passwordModel: PasswordModel) => {
        currentUserPk$
          .pipe(
            switchMap((userPk) => userService.patchUser(userPk, passwordModel)),
            take(1),
          )
          .subscribe((user) => patchState(state, { user }));
      },
      profileDelete: () => {
        currentUserPk$
          .pipe(
            switchMap((userPk) => userService.delete(userPk)),
            take(1),
          )
          .subscribe(() => globalStore.logout());
      },
    };
  }),
  withMethods((state) => {
    const campaignService = inject(CampaignService);
    const globalStore = inject(GlobalStore);
    const paramsService = inject(GlobalUrlParamsService);
    const authStore = inject(AuthStore);

    const user$ = toObservable(state.user).pipe(filterNil(), take(1));
    return {
      leaveCampaign: (membership: CampaignMembership) => {
        user$
          .pipe(
            switchMap((user) => {
              switch (membership.role) {
                case 'member':
                  return campaignService.removeMember(
                    membership.campaignName,
                    user,
                  );
                case 'admin':
                  return campaignService.removeAdmin(
                    membership.campaignName,
                    user,
                  );
                case 'guest':
                  return campaignService.removeGuest(
                    membership.campaignName,
                    user,
                  );
                default:
                  return EMPTY;
              }
            }),
            take(1),
          )
          .subscribe(() => {
            authStore.loadAuthData();
            state.loadThisUser();
            const isCurrentCampaign =
              globalStore.currentCampaign()?.name.toLowerCase() ===
              membership.campaignName.toLowerCase();
            if (isCurrentCampaign) {
              paramsService.nextSnapshot(null);
            }
          });
      },
    };
  }),
);
