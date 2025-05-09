/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MapMarker, MapMarkerRaw } from 'src/app/_models/mapMarker';
import { OverviewItem } from 'src/app/_models/overview';
import { BaseService } from '../base.service';
import { RoutingService } from '../routing.service';

@Injectable({
  providedIn: 'root',
})
export class MarkerService extends BaseService<MapMarkerRaw, MapMarker> {
  constructor(
    private routingService: RoutingService,
    http: HttpClient,
  ) {
    super(http, 'marker');
  }

  override readByParam(
    campaign: string,
    param: {
      parentLocationName: string;
      locationName: string;
      name: string;
    },
  ): Observable<MapMarker> {
    const url = `${this.baseUrl}/${campaign}/${param.parentLocationName}/${param.locationName}/${param.name}`;
    return this.http.get<any>(url).pipe(map((data) => this.parseEntity(data)));
  }

  override parseEntity(data: any): MapMarker {
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
    const location_name = data.name ?? data.location_details.name;
    const map_name = data.map_details?.name ?? data.map;
    const parent_location_name =
      data.parent_location_name ??
      data.parent_location_details?.name ??
      data.location_details.parent_location_name;

    return () =>
      this.routingService.getRoutePath('marker', {
        parent_location_name,
        location_name,
        map_name,
        campaign: campaignName,
      });
  }
}
