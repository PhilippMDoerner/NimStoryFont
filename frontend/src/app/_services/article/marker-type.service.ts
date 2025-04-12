/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapMarkerType } from 'src/app/_models/mapMarkerType';
import { OverviewItem } from 'src/app/_models/overview';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class MarkerTypeService extends BaseService<
  MapMarkerType,
  MapMarkerType
> {
  constructor(http: HttpClient) {
    super(http, 'markertype');
  }

  override parseEntity(data: any): MapMarkerType {
    return data;
  }

  override parseOverviewEntity(data: any): OverviewItem {
    return data;
  }
}
