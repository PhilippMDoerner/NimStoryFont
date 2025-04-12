/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OverviewItem } from '../_models/overview';
import { CampaignService } from './service.interfaces';

export interface ListParams<T> {
  campaign: string;
  sortProperty?: keyof T;
}

export interface ReadByNameParams {
  campaign: string;
  params: { name: string; [key: string]: unknown };
}

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<Raw, Detail>
  implements CampaignService<Detail>
{
  public apiUrl: string = environment.apiUrl;
  public baseUrl: string;

  constructor(
    public http: HttpClient,
    baseUrl: string,
  ) {
    this.baseUrl = `${this.apiUrl}/${baseUrl}`;
  }

  /**
   * Sends a GET request for a list of all entries in the database.
   * May be either overview-serialized or a detail-serialized, depending on the type.
   * NOTE: May be either expensive for performance or not implemented. Always check before using if it works well.
   */
  list(): Observable<Detail[]> {
    return this.http
      .get<Detail[]>(`${this.baseUrl}/`)
      .pipe(map((entries) => entries.map((entry) => this.parseEntity(entry))));
  }

  /**
   * Sends a GET request for an overview list of all entries of the campaign with the given name.
   */
  campaignList(campaign: string): Observable<OverviewItem[]> {
    return this.http
      .get<Detail[]>(`${this.baseUrl}/${campaign}/overview/`)
      .pipe(
        map((entries) =>
          entries.map((entry) => this.parseOverviewEntity(entry)),
        ),
      );
  }

  /**
   * Sends a GET request for a detailed list of all entries of the campaign with the given name.
   * NOTE: This is a detailed list filling all fields for every entry as far as available.
   * This may be expensive. Prefer campaignList if possible.
   */
  campaignDetailList(campaign: string): Observable<Detail[]> {
    return this.http
      .get<Detail[]>(`${this.baseUrl}/${campaign}/`)
      .pipe(map((entries) => entries.map((entry) => this.parseEntity(entry))));
  }

  /**
   * Sends a POST request for the specified data
   */
  create(data: Raw): Observable<Detail> {
    return this.http
      .post(`${this.baseUrl}/`, data)
      .pipe(map((entry) => this.parseEntity(entry)));
  }

  /**
   * Sends a PUT request for the entry with the given pk and the specified data
   */
  update(pk: number, data: Partial<Raw | Detail>): Observable<Detail> {
    return this.http
      .put(`${this.baseUrl}/pk/${pk}/`, data)
      .pipe(map((entry) => this.parseEntity(entry)));
  }

  /**
   * Sends a GET request for the entry with the given pk
   */
  read(pk: number): Observable<Detail> {
    return this.http
      .get(`${this.baseUrl}/pk/${pk}/`)
      .pipe(map((entry) => this.parseEntity(entry)));
  }

  /**
   * @description Allows you to send a read query based on a param, e.g. "name", assuming the backend is set up for it.
   * The targetted URL will be "${baseURL of API Endpoint}/param"
   * @param param
   * @returns The data from that endpoint by the service
   */
  readByParam(
    campaign: string,
    params: { name: string } & Record<string, unknown>,
  ): Observable<Detail> {
    if (typeof params.name !== 'string') {
      console.error('The params you used in the service');
      console.error(params);
      throw `Invalid params exception. You tried to use the base readByParams of GenericService with a parameter 
      object without the "name" attribute. This indicates your call is more complex than 
      this base implementation is useful for. Overwrite readByParam in the service that inherits from  
      GenericObjectService and implement the function yourself`;
    }

    return this.http
      .get<Observable<Detail>>(`${this.baseUrl}/${campaign}/${params.name}/`)
      .pipe(map((entry) => this.parseEntity(entry)));
  }

  /**
   * Sends a DELETE request for the entry with the specified primary key
   */
  delete(pk: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/pk/${pk}/`);
  }

  /**
   * Sends a PATCH request for the entry with the given pk and the specified data
   */
  patch(pk: number, data: any): Observable<Detail> {
    return this.http
      .patch(`${this.baseUrl}/pk/${pk}/`, data)
      .pipe(map((entry) => this.parseEntity(entry)));
  }

  abstract parseEntity(data: any): Detail;

  abstract parseOverviewEntity(data: any): OverviewItem;

  protected sortList<T>(entries: T[], sortProperty: keyof T): T[] {
    return entries.sort((a, b) => {
      const aVal = a[sortProperty];
      const bVal = b[sortProperty];
      if (aVal === bVal) return 0;
      if (aVal == null) return -1;
      if (bVal == null) return 1;

      return aVal > bVal ? 1 : -1;
    });
  }
}
