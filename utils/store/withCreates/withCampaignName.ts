import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { signalStoreFeature, withProps } from '@ngrx/signals';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';

export const withCampaignName = signalStoreFeature(
  withProps(() => {
    const globalStore = inject(GlobalStore);

    return {
      _campaignName$: toObservable(globalStore.campaignName).pipe(filterNil()),
    };
  }),
);
