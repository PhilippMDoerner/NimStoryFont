/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item, ItemRaw } from 'src/app/_models/item';
import { OverviewItem } from 'src/app/_models/overview';
import { BaseService } from '../base.service';
import { RoutingService } from '../routing.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService extends BaseService<ItemRaw, Item> {
  constructor(
    private routingService: RoutingService,
    http: HttpClient,
  ) {
    super(http, 'item');
  }

  override parseEntity(data: any): Item {
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
    const itemName = data.name;

    return () =>
      this.routingService.getRoutePath('item', {
        name: itemName,
        campaign: campaignName,
      });
  }
}
