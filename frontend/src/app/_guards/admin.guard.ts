import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RoutingService } from 'src/app/_services/routing.service';
import { log } from 'src/utils/logging';
import { filterNil } from 'src/utils/rxjs-operators';
import { AuthStore } from '../auth.store';
import { GlobalStore } from '../global.store';

export const siteAdminGuard = () => {
  const routingService = inject(RoutingService);
  const authStore = inject(AuthStore);
  const globalStore = inject(GlobalStore);

  return toObservable(authStore.isLoggedIn).pipe(
    filterNil(),
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        log(siteAdminGuard.name, 'User is not logged in');
        return routingService.getRouteUrlTree('login');
      }

      return globalStore.isCampaignAdmin();
    }),
  );
};
