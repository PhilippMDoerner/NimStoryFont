/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OverviewItem } from 'src/app/_models/overview';
import { Spell, SpellRaw } from 'src/app/_models/spell';
import { BaseService } from '../base.service';
import { RoutingService } from '../routing.service';

@Injectable({
  providedIn: 'root',
})
export class SpellService extends BaseService<SpellRaw, Spell> {
  constructor(
    private routingService: RoutingService,
    http: HttpClient,
  ) {
    super(http, 'spell');
  }

  override parseEntity(data: any): Spell {
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
    const spellName = data.name;

    return () =>
      this.routingService.getRoutePath('spell', {
        name: spellName,
        campaign: campaignName,
      });
  }
}
