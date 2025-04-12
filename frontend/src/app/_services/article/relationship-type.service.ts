/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NodeLinkType, NodeLinkTypeRaw } from 'src/app/_models/graph';
import { OverviewItem } from 'src/app/_models/overview';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class RelationshipTypeService extends BaseService<
  NodeLinkTypeRaw,
  NodeLinkType
> {
  constructor(http: HttpClient) {
    super(http, 'relationshiptype');
  }

  override parseEntity(data: any): NodeLinkType {
    return data;
  }

  override parseOverviewEntity(data: any): OverviewItem {
    return data;
  }
}
