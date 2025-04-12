import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { FeatureService } from 'src/app/_services/utils/feature.service';
import { AuthStore } from 'src/app/auth.store';
import { filterNil } from 'src/utils/rxjs-operators';

export const campaignCreationGuard: CanActivateFn = () => {
  const featureService = inject(FeatureService);
  const authStore = inject(AuthStore);

  return combineLatest({
    isLoggedIn: toObservable(authStore.isLoggedIn).pipe(filterNil()),
    isAdmin: toObservable(authStore.isGlobalAdmin).pipe(filterNil()),
    canCreatePublicly: toObservable(featureService.features$.value).pipe(
      filterNil(),
      map((config) => config.enablePublicCampaignCreation),
    ),
  }).pipe(
    map(({ isLoggedIn, isAdmin, canCreatePublicly }) => {
      if (!isLoggedIn) return false;
      if (canCreatePublicly) return true;

      return isAdmin;
    }),
  );
};
