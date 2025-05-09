import { inject } from '@angular/core';
import { RedirectFunction } from '@angular/router';
import { RoutingService } from '../_services/routing.service';

export const redirectWithQueryParams = (
  routeName: string,
  params?: { [key: string]: string | number | undefined },
): RedirectFunction => {
  return (routePartial) => {
    const routingService = inject(RoutingService);

    return routingService.getRouteUrlTree(
      routeName,
      params,
      routePartial.queryParams,
    );
  };
};
