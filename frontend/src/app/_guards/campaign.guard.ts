import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { CampaignRole } from 'src/app/_models/token';
import { RoutingService } from 'src/app/_services/routing.service';
import { log } from 'src/utils/logging';
import { filterNil } from 'src/utils/rxjs-operators';
import { AuthStore } from '../auth.store';

export const campaignGuard: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  const routingService = inject(RoutingService);
  const authStore = inject(AuthStore);

  return toObservable(authStore.isLoggedIn).pipe(
    filterNil(),
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        log(campaignGuard.name, 'User is not logged in');
        return routingService.getRouteUrlTree('login');
      }

      const nextCampaignName = next.params['campaign'];
      const isAdmin = authStore.isGlobalAdmin();
      const role = authStore.getCampaignRole(nextCampaignName);
      if (isAdmin) return true;

      if (nextCampaignName == null) {
        throw new Error(
          "Invalid Route Exception. The campaign-route you're trying to access has no campaign name parameter",
        );
      }

      const hasRoleInCampaign = role != null;
      if (!hasRoleInCampaign) {
        return routingService.getRouteUrlTree('campaign-overview');
      }

      const requiredMiniumRole: CampaignRole = next.data['requiredMinimumRole'];
      if (requiredMiniumRole == null) {
        throw new Error(
          "Invalid Route Exception. The campaign-route you're trying to access has no defined minimum role needed to access it",
        );
      }

      return hasRoleOrBetter(role, requiredMiniumRole);
    }),
  );
};

function hasRoleOrBetter(
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
