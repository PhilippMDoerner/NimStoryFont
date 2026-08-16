/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OverviewItem } from '../../_models/overview';
import { PlayerClass } from '../../_models/playerclass';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerClassService extends BaseService<PlayerClass, PlayerClass> {
  constructor(http: HttpClient) {
    super(http, 'player_class');
  }

  override parseEntity(data: any): PlayerClass {
    return data;
  }

  override parseOverviewEntity(data: any): OverviewItem {
    return data;
  }
}
