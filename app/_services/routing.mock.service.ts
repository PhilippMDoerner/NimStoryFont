/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { RoutingService } from './routing.service';

@Injectable()
export class RoutingServiceMock extends RoutingService {
  override routeToPath(
    routeName: string,
    params?: { [key: string]: string | number | undefined },
  ): void {
    return;
  }

  override getRoutePath(routeName: string, params?: any): string {
    return '';
  }

  override routeToErrorPage(error: number | any): void {
    return;
  }
}
