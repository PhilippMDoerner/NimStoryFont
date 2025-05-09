/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization, OrganizationRaw } from 'src/app/_models/organization';
import { OverviewItem } from 'src/app/_models/overview';
import { BaseService } from '../base.service';
import { RoutingService } from '../routing.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService extends BaseService<
  OrganizationRaw,
  Organization
> {
  constructor(
    private routingService: RoutingService,
    http: HttpClient,
  ) {
    super(http, 'organization');
  }

  override parseEntity(data: any): Organization {
    return {
      ...data,
      getAbsoluteRouterUrl: this.generateUrlCallback(data),
    };
  }

  override parseOverviewEntity(data: any): OverviewItem {
    return {
      ...data,
      getAbsoluteRouterUrl: this.generateUrlCallback(data),
    };
  }

  private generateUrlCallback(data: any) {
    const campaignName = data.campaign_details.name;
    const organizationName = data.name;

    return () =>
      this.routingService.getRoutePath('organization', {
        name: organizationName,
        campaign: campaignName,
      });
  }
}
