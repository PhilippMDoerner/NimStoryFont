/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { convertSingleFileModelToFormData } from 'src/app/_functions/formDataConverter';
import { ExtendedMap, Map, MapRaw } from 'src/app/_models/map';
import { OverviewItem } from 'src/app/_models/overview';
import { BaseService } from '../base.service';
import { RoutingService } from '../routing.service';

@Injectable({
  providedIn: 'root',
})
export class MapService extends BaseService<MapRaw, Map> {
  constructor(
    private routingService: RoutingService,
    http: HttpClient,
  ) {
    super(http, 'map');
  }

  override create(map: MapRaw): Observable<ExtendedMap> {
    const formData: FormData = convertSingleFileModelToFormData(map, 'image');
    return this.http.post<ExtendedMap>(`${this.baseUrl}/`, formData);
  }

  override patch(mapPk: number, map: Partial<Map>): Observable<ExtendedMap> {
    const hasImageFile = map.image?.constructor.name === 'FileList';

    let formData: FormData | Partial<Map>;
    if (hasImageFile) {
      formData = convertSingleFileModelToFormData(map, 'image');
    } else {
      delete map.image;
      formData = map;
    }

    return this.http.patch<ExtendedMap>(
      `${this.baseUrl}/pk/${mapPk}/`,
      formData,
    );
  }

  override parseEntity(data: any): Map {
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
    const mapName = data.name;

    return () =>
      this.routingService.getRoutePath('map', {
        name: mapName,
        campaign: campaignName,
      });
  }
}
