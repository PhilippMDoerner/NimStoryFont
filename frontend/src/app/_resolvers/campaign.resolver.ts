import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { GlobalUrlParamsService } from 'src/app/_services/utils/global-url-params.service';
import { GlobalStore } from '../global.store';

export const campaignSetResolver: ResolveFn<void> = () => {
  inject(GlobalStore).loadCampaignOverview();
};

export const trackCampaignName: ResolveFn<void> = (
  route: ActivatedRouteSnapshot,
) => {
  inject(GlobalUrlParamsService).nextSnapshot(route);
};

export const resetTracking: ResolveFn<void> = () => {
  inject(GlobalUrlParamsService).nextSnapshot(null);
};
