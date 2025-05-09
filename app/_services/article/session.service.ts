/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OverviewItem } from 'src/app/_models/overview';
import { Session, SessionRaw } from 'src/app/_models/session';
import { BaseService } from '../base.service';
import { RoutingService } from '../routing.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService extends BaseService<SessionRaw, Session> {
  constructor(
    private routingService: RoutingService,
    http: HttpClient,
  ) {
    super(http, 'session');
  }

  getSession(
    sessionNumber: number,
    isMainSession: boolean | number,
  ): Observable<Session> {
    if (typeof isMainSession === 'boolean')
      isMainSession = isMainSession ? 1 : 0;
    return this.http.get<Session>(
      `${this.baseUrl}/${sessionNumber}/${isMainSession}`,
    );
  }

  override parseEntity(data: any): Session {
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

    return () =>
      this.routingService.getRoutePath('sessions', {
        campaign: campaignName,
      });
  }
}
