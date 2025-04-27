import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { RoutingService } from 'src/app/_services/routing.service';
import { log } from 'src/utils/logging';
import { filterNil } from 'src/utils/rxjs-operators';
import { AuthStore } from '../auth.store';

export const loginGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const routingService = inject(RoutingService);

  return toObservable(authStore.isLoggedIn).pipe(
    filterNil(),
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true;
      } else {
        log(loginGuard.name, 'User is not logged in');
        return routingService.getRouteUrlTree('login');
      }
    }),
  );
};
