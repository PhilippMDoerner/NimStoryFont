/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Encounter, EncounterRaw } from 'src/app/_models/encounter';
import { OverviewItem } from 'src/app/_models/overview';
import { BaseService } from '../base.service';
import { RoutingService } from '../routing.service';

@Injectable({
  providedIn: 'root',
})
export class EncounterService extends BaseService<EncounterRaw, Encounter> {
  constructor(
    private routingService: RoutingService,
    http: HttpClient,
  ) {
    super(http, 'encounter');
  }

  getDiaryEntryEncounters(
    session_pk: number,
    authorName: string,
  ): Observable<Encounter[]> {
    const url = `${this.baseUrl}/session/${session_pk}/${authorName}`;
    return this.http
      .get<Encounter[]>(url)
      .pipe(map((entries) => entries.map((entry) => this.parseEntity(entry))));
  }

  createForDiaryentry(encounter: Partial<Encounter>): Observable<Encounter[]> {
    const url = `${this.baseUrl}/`;
    return this.http
      .post<any[]>(url, encounter)
      .pipe(map((entries) => entries.map((entry) => this.parseEntity(entry))));
  }

  swapEncounterOrder(
    campaign: string,
    encounter1_pk: number,
    encounter2_pk: number,
  ): Observable<[Encounter, Encounter]> {
    const url = `${this.baseUrl}/${campaign}/orderswap/`;
    const requestBody = {
      encounter1: encounter1_pk,
      encounter2: encounter2_pk,
    };

    return this.http
      .patch<[Encounter, Encounter]>(url, requestBody)
      .pipe(
        map(
          (entries) =>
            entries.map((entry) => this.parseEntity(entry)) as [
              Encounter,
              Encounter,
            ],
        ),
      );
  }

  cutInsertEncounter(
    campaign: string,
    encounter: Encounter,
    newOrderIndex: number,
  ): Observable<Encounter[]> {
    const url = `${this.baseUrl}/${campaign}/cutinsert/`;
    const requestBody = {
      encounter: encounter.pk,
      old_order_index: encounter.order_index,
      new_order_index: newOrderIndex,
    };

    return this.http
      .patch<any[]>(url, requestBody)
      .pipe(map((entries) => entries.map((entry) => this.parseEntity(entry))));
  }

  override parseEntity(data: any): Encounter {
    return {
      ...data,
      pk: data.id ?? data.pk,
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
    const campaignName = data.campaign_details?.name;
    const sessionNumber = data.diaryentry_details?.session_number;
    const isMainSession = data.diaryentry_details?.is_main_session;
    const authorName = data.diaryentry_details?.author_name;
    const encounterTitle = data.title;

    if (
      !campaignName ||
      !sessionNumber ||
      !isMainSession ||
      !authorName ||
      !encounterTitle
    ) {
      return () => '';
    }

    return () =>
      this.routingService.getRoutePath('diaryentry-encounter', {
        sessionNumber,
        isMainSession,
        authorName,
        campaign: campaignName,
        encounterTitle,
      });
  }
}
