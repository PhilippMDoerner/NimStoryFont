/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Creature, CreatureRaw } from 'src/app/_models/creature';
import { OverviewItem } from 'src/app/_models/overview';
import { BaseService } from '../base.service';
import { RoutingService } from '../routing.service';

@Injectable({
  providedIn: 'root',
})
export class CreatureService extends BaseService<CreatureRaw, Creature> {
  constructor(
    private routingService: RoutingService,
    http: HttpClient,
  ) {
    super(http, 'creature');
  }

  override parseEntity(data: any): Creature {
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
    const creatureName = data.name;

    return () =>
      this.routingService.getRoutePath('creature', {
        name: creatureName,
        campaign: campaignName,
      });
  }
}
