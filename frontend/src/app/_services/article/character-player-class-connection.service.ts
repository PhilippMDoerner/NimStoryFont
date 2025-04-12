/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OverviewItem } from 'src/app/_models/overview';
import {
  CharacterPlayerClassConnectionDetail,
  CharacterPlayerClassConnectionRaw,
} from 'src/app/_models/playerclass';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterPlayerClassConnectionService extends BaseService<
  CharacterPlayerClassConnectionRaw,
  CharacterPlayerClassConnectionDetail
> {
  constructor(http: HttpClient) {
    super(http, 'characterplayerclassconnection');
  }

  parseEntity(data: any): CharacterPlayerClassConnectionDetail {
    return data;
  }

  parseOverviewEntity(): OverviewItem {
    throw 'CharacterPlayerClassConnection does not have an overview endpoint';
  }
}
