/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import {
  convertMultiFileModelToFormData,
  convertSingleFileModelToFormData,
} from 'src/app/_functions/formDataConverter';
import {
  Campaign,
  CampaignOverview,
  CampaignRaw,
  WikiStatistics,
} from 'src/app/_models/campaign';
import { EmptySearchResponse } from 'src/app/_models/emptySearchResponse';
import { OverviewItem } from 'src/app/_models/overview';
import { User } from 'src/app/_models/user';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignService extends BaseService<CampaignRaw, Campaign> {
  constructor(http: HttpClient) {
    super(http, 'campaign');
  }

  campaignOverview(): Observable<CampaignOverview[]> {
    return this.http
      .get<CampaignOverview[]>(`${this.baseUrl}/overview/`)
      .pipe(shareReplay(1));
  }

  override create(data: CampaignRaw): Observable<Campaign> {
    const campaignData = this.processCampaignData(data) as CampaignRaw;
    return super.create(campaignData);
  }

  override update(pk: number, data: Campaign): Observable<Campaign> {
    const campaignData = this.processCampaignData(data) as Campaign;
    return super.update(pk, campaignData);
  }

  override patch(pk: number, data: Campaign): Observable<Campaign> {
    const campaignData = this.processCampaignData(data);
    return super.patch(pk, campaignData);
  }

  private processCampaignData(
    userModel: Campaign | CampaignRaw | Partial<Campaign | CampaignRaw>,
  ): Campaign | CampaignRaw | Partial<Campaign | CampaignRaw> | FormData {
    const hasNewIcon: boolean = this.hasImageSelected(userModel.icon);
    const hasNewBackgroundImage: boolean = this.hasImageSelected(
      userModel.background_image,
    );

    if (!hasNewIcon && !hasNewBackgroundImage) {
      delete userModel.icon;
      delete userModel.background_image;
      const formData = new FormData();
      Object.keys(userModel).forEach((key) =>
        formData.append(key, (userModel as any)[key]),
      );
      return formData;
    } else if (!hasNewIcon && hasNewBackgroundImage) {
      delete userModel.icon;
      const userModelFormData: FormData = convertSingleFileModelToFormData(
        userModel,
        'background_image',
      );
      return userModelFormData;
    } else if (hasNewIcon && !hasNewBackgroundImage) {
      delete userModel.background_image;
      const userModelFormData: FormData = convertSingleFileModelToFormData(
        userModel,
        'icon',
      );
      return userModelFormData;
    } else {
      const userModelFormData: FormData = convertMultiFileModelToFormData(
        userModel,
        ['background_image', 'icon'],
      );
      return userModelFormData;
    }
  }

  private hasImageSelected(imageFieldValue: any): boolean {
    return (
      imageFieldValue.constructor.name === 'FileList' ||
      imageFieldValue.constructor.name === 'File'
    );
  }

  override delete(): Observable<any> {
    throw "You can not delete a campaign, please use 'deactivate' instead";
  }

  /** Under the hood this may call "delete" but "delete" does not actually delete a campaign in the backend, it just deactivates it
   * The functions were renamed to make that fact clear
   */
  deactivate(pk: number): Observable<Campaign> {
    return super.delete(pk);
  }

  statistics(campaign_name: string): Observable<WikiStatistics> {
    const statisticsUrl = `${this.apiUrl}/admin/statistics/${campaign_name}`;
    return this.http.get<WikiStatistics>(statisticsUrl);
  }

  /**
   * @description Allows you to send a read query based on a param, e.g. "name", assuming the backend is set up for it.
   * The targetted URL will be "${baseURL of API Endpoint}/param"
   * @param param
   * @returns The data from that endpoint by the service
   */
  override readByParam(campaign: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${campaign}/`);
  }

  addGuest(campaign: string, user: User): Observable<User[]> {
    const requestBody = { action: 'add_guest', user };
    return this.http.patch<User[]>(
      `${this.baseUrl}/${campaign}/members/`,
      requestBody,
    );
  }

  addMember(campaign: string, user: User): Observable<User[]> {
    const requestBody = { action: 'add_member', user };
    return this.http.patch<User[]>(
      `${this.baseUrl}/${campaign}/members/`,
      requestBody,
    );
  }

  addAdmin(campaign: string, user: User): Observable<User[]> {
    const requestBody = { action: 'add_admin', user };

    return this.http.patch<User[]>(
      `${this.baseUrl}/${campaign}/members/`,
      requestBody,
    );
  }

  removeGuest(campaign: string, user: User): Observable<User[]> {
    const requestBody = { action: 'remove_guest', user };
    return this.http.patch<User[]>(
      `${this.baseUrl}/${campaign}/members/`,
      requestBody,
    );
  }

  removeMember(campaign: string, user: User): Observable<User[]> {
    const requestBody = { action: 'remove_member', user };
    return this.http.patch<User[]>(
      `${this.baseUrl}/${campaign}/members/`,
      requestBody,
    );
  }

  removeAdmin(campaign: string, user: User): Observable<User[]> {
    const requestBody = { action: 'remove_admin', user };
    return this.http.patch<User[]>(
      `${this.baseUrl}/${campaign}/members/`,
      requestBody,
    );
  }

  addEmptySearchResponse(
    responseModel: EmptySearchResponse,
  ): Observable<Campaign> {
    const emptySearchUrl = `${this.apiUrl}/emptysearchresponse/`;
    return this.http.post<Campaign>(emptySearchUrl, responseModel);
  }

  deleteEmptySearchResponse(emptySearchResponsePk: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/emptysearchresponse/pk/${emptySearchResponsePk}/`,
    );
  }

  override parseEntity(data: any): Campaign {
    return data;
  }

  override parseOverviewEntity(data: any): OverviewItem {
    return data;
  }
}
