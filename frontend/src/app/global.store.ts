import { computed, effect, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Observable, of, pipe, take } from 'rxjs';
import { log } from 'src/utils/logging';
import { CampaignOverview } from './_models/campaign';
import { CampaignRole } from './_models/token';
import { OnlineService } from './_services/online.service';
import { CampaignService } from './_services/utils/campaign.service';
import { GlobalUrlParamsService } from './_services/utils/global-url-params.service';
import { TokenService } from './_services/utils/token.service';
import { AuthStore } from './auth.store';

export type ContentScrollEvent = CustomEvent<
  Event & { pageElement: ElementRef<HTMLDivElement> }
>;
export interface ScreenSize {
  width: number;
  height: number;
}

export function hasRoleOrBetter(
  role: CampaignRole,
  minimumRole: CampaignRole,
): boolean {
  switch (minimumRole) {
    case 'member':
      return ['member', 'admin'].includes(role);
    case 'admin':
      return role === 'admin';
    case 'guest':
      return ['member', 'admin', 'guest'].includes(role);
    default:
      return false;
  }
}

export interface GlobalState {
  currentCampaign: CampaignOverview | undefined;
  campaigns: CampaignOverview[] | undefined;
  contentScrollEvents: ContentScrollEvent | undefined;
  isLoadingPage: boolean;
}

const SSRDefaultScreenSize$: Observable<ScreenSize> = of({
  height: 600,
  width: 600,
});

const initialGlobalState: GlobalState = {
  contentScrollEvents: undefined,
  currentCampaign: undefined,
  campaigns: undefined,
  isLoadingPage: false,
};

export const GlobalStore = signalStore(
  withState(initialGlobalState),
  withComputed((state) => {
    const authStore = inject(AuthStore);

    const isInBrowser = !!document;

    const screenSize$ = isInBrowser
      ? new Observable<ScreenSize>((observer) => {
          const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
              observer.next({
                width: entry.contentRect.width,
                height: entry.contentRect.height,
              });
            }
          });

          resizeObserver.observe(document.body);

          return () => resizeObserver.disconnect();
        })
      : SSRDefaultScreenSize$;

    return {
      screenSize: toSignal(screenSize$),
      campaignName: computed(() => state.currentCampaign()?.name),
      currentCampaignRole: computed(() => {
        const currentCampaign = state.currentCampaign();
        if (currentCampaign == null) return undefined;
        return authStore.getCampaignRole(currentCampaign.name);
      }),
    };
  }),
  withMethods((store) => {
    const tokenService = inject(TokenService);
    const campaignService = inject(CampaignService);
    const isOnline = toSignal(inject(OnlineService).online$);
    const authStore = inject(AuthStore);

    return {
      isCampaignMember: (campaignName?: string): boolean => {
        campaignName = campaignName ?? store.campaignName();
        const userData = authStore.authData();
        if (userData == null) return false;
        const role = tokenService.getCampaignRole(userData, campaignName);
        return authStore.isGlobalAdmin() || role === 'guest';
      },
      isCampaignAdmin: (campaignName?: string): boolean => {
        campaignName = campaignName ?? store.campaignName();
        const userData = authStore.authData();
        if (userData == null) return false;
        const role = tokenService.getCampaignRole(userData, campaignName);
        return authStore.isGlobalAdmin() || role === 'admin';
      },
      isCampaignGuest: (campaignName?: string): boolean => {
        campaignName = campaignName ?? store.campaignName();
        const userData = authStore.authData();
        if (userData == null) return false;
        const role = tokenService.getCampaignRole(userData, campaignName);
        return authStore.isGlobalAdmin() || role === 'guest';
      },
      canPerformActionsOfRole: (minimumRole: CampaignRole) => {
        const hasRolePermissions = computed<boolean>(() => {
          const currentRole = store.currentCampaignRole();
          if (currentRole == null) return false;
          return hasRoleOrBetter(currentRole, minimumRole);
        });
        return computed<boolean>(() => hasRolePermissions() && !!isOnline());
      },
      loadCampaignOverview: () => {
        campaignService
          .campaignOverview()
          .pipe(take(1))
          .subscribe((campaigns) =>
            patchState(store, { campaigns: campaigns }),
          );
      },
      fireScrollEvent: (event: ContentScrollEvent) => {
        patchState(store, { contentScrollEvents: event });
      },
      trackIsPageLoading: rxMethod<boolean>(
        pipe(
          tapResponse({
            next: (isLoading) =>
              patchState(store, { isLoadingPage: isLoading }),
            error: (err) => {
              log(
                GlobalStore.name,
                'Error tracking loading state of page',
                err,
              );
              patchState(store, { isLoadingPage: false });
            },
          }),
        ),
      ),
      logout: () => {
        patchState(store, {
          campaigns: undefined,
          currentCampaign: undefined,
          contentScrollEvents: undefined,
          isLoadingPage: false,
        });
        authStore.logout();
      },
    };
  }),
  withHooks((store) => {
    const paramsService = inject(GlobalUrlParamsService);
    return {
      onInit: () => {
        const campaignParam$ =
          paramsService.campaignNameParam$.pipe(takeUntilDestroyed());
        const campaignParam = toSignal(campaignParam$);

        effect(() => {
          const campaigns = store.campaigns();
          const currentCampaignName = campaignParam();
          const currentCampaign = campaigns?.find(
            (campaign) => campaign.name === currentCampaignName,
          );
          patchState(store, { campaigns, currentCampaign });
        });
      },
    };
  }),
);
