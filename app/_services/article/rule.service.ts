/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OverviewItem } from 'src/app/_models/overview';
import { Rule, RuleRaw } from 'src/app/_models/rule';
import { BaseService } from '../base.service';
import { RoutingService } from '../routing.service';

@Injectable({
  providedIn: 'root',
})
export class RuleService extends BaseService<RuleRaw, Rule> {
  constructor(
    private routingService: RoutingService,
    http: HttpClient,
  ) {
    super(http, 'rule');
  }

  override parseEntity(data: any): Rule {
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
    const ruleName = data.name;

    return () =>
      this.routingService.getRoutePath('rule', {
        name: ruleName,
        campaign: campaignName,
      });
  }
}
