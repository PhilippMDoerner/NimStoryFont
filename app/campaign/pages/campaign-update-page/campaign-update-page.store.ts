import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { map, shareReplay, switchMap, take } from 'rxjs';
import { filterNil, mapVoid } from '../../../../utils/rxjs-operators';
import { Campaign, CampaignRaw } from '../../../_models/campaign';
import { OverviewItem } from '../../../_models/overview';
import { MapService } from '../../../_services/article/map.service';
import { CampaignService } from '../../../_services/utils/campaign.service';
import { GlobalStore } from '../../../global.store';

export type CampaignUpdateModel = CampaignRaw &
  Record<'pk', number> &
  Record<'update_datetime', string>;

export interface CampaignUpdatePageStore {
  campaign: Campaign | undefined;
  mapOptions: OverviewItem[] | undefined;
  serverModel: Campaign | undefined;
}

const initialState: CampaignUpdatePageStore = {
  campaign: undefined,
  mapOptions: undefined,
  serverModel: undefined,
};

export const CampaignUpdatePageStore = signalStore(
  withState(initialState),
  withMethods((state) => {
    const globalStore = inject(GlobalStore);
    const campaignService = inject(CampaignService);
    const mapService = inject(MapService);
    const currentCampaignOverview$ = toObservable(
      globalStore.currentCampaign,
    ).pipe(filterNil());

    return {
      loadCurrentCampaignDetails: () => {
        patchState(state, { campaign: undefined });
        currentCampaignOverview$
          .pipe(
            map((campaign) => campaign.pk),
            switchMap((campaignPk) => campaignService.read(campaignPk)),
            take(1),
          )
          .subscribe((campaign) => patchState(state, { campaign }));
      },
      loadMapOptions: () => {
        patchState(state, { mapOptions: undefined });
        currentCampaignOverview$
          .pipe(
            map((campaign) => campaign.name),
            switchMap((name) => mapService.campaignList(name)),
            take(1),
          )
          .subscribe((mapOptions) => patchState(state, { mapOptions }));
      },
      updateCampaign: (pk: number, campaign: Campaign) => {
        patchState(state, { serverModel: undefined });
        const update$ = campaignService
          .update(pk, campaign)
          .pipe(take(1), shareReplay(1));
        update$.subscribe({
          next: (campaign) => patchState(state, { campaign }),
          error: (err: HttpErrorResponse) => {
            if (err.status !== 401) return;
            const serverModel: Campaign = err.error;
            patchState(state, { serverModel });
          },
        });

        return update$.pipe(mapVoid());
      },
    };
  }),
);
