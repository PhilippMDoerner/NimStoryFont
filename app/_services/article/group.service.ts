/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PermissionGroup } from 'src/app/_models/auth';
import { OverviewItem } from 'src/app/_models/overview';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService extends BaseService<
  PermissionGroup,
  PermissionGroup
> {
  constructor(http: HttpClient) {
    super(http, 'group');
  }

  override parseEntity(data: any): PermissionGroup {
    return data;
  }

  override parseOverviewEntity(data: any): OverviewItem {
    return data;
  }
}
