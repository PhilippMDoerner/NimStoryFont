/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CharacterDetails,
  OrganizationMembership,
} from '../../_models/character';
import { OverviewItem } from '../../_models/overview';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationMembershipService extends BaseService<
  OrganizationMembership,
  CharacterDetails
> {
  constructor(http: HttpClient) {
    super(http, 'character/organizationmemberships');
  }

  override parseEntity(data: any): CharacterDetails {
    return data;
  }

  override parseOverviewEntity(data: any): OverviewItem {
    return data;
  }
}
