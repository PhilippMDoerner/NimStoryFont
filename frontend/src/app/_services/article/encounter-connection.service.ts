/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  EncounterConnection,
  EncounterConnectionRaw,
} from 'src/app/_models/encounter';
import { OverviewItem } from 'src/app/_models/overview';
import { BaseService } from '../base.service';
import { CreateDeleteService } from '../service.interfaces';

@Injectable({
  providedIn: 'root',
})
export class EncounterConnectionService
  extends BaseService<EncounterConnectionRaw, EncounterConnection>
  implements CreateDeleteService<EncounterConnection>
{
  constructor(http: HttpClient) {
    super(http, 'encounterconnection');
  }

  override create(data: EncounterConnection): Observable<EncounterConnection> {
    return super.create({
      ...data,
      character: `${data.character}`,
    } as any);
  }

  parseEntity(data: any): EncounterConnection {
    return data;
  }

  parseOverviewEntity(): OverviewItem {
    throw 'CharacterPlayerClassConnection does not have an overview endpoint';
  }
}
