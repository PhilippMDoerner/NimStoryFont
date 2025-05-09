/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { convertSingleFileModelToFormData } from 'src/app/_functions/formDataConverter';
import { OverviewItem } from 'src/app/_models/overview';
import { SessionAudio, SessionAudioRaw } from 'src/app/_models/sessionAudio';
import { BaseService } from '../base.service';
import { RoutingService } from '../routing.service';

@Injectable({
  providedIn: 'root',
})
export class SessionAudioService extends BaseService<
  SessionAudioRaw,
  SessionAudio
> {
  UPLOAD_URL = `${this.apiUrl}/uploads`;

  constructor(
    private routingService: RoutingService,
    http: HttpClient,
  ) {
    super(http, 'sessionaudio');
  }

  override readByParam(
    campaign: string,
    params: { name: string; isMainSession: number; sessionNumber: number },
  ): Observable<SessionAudio> {
    const url = `${this.baseUrl}/${campaign}/${params.isMainSession}/${params.sessionNumber}/`;
    return this.http
      .get<SessionAudio>(url)
      .pipe(map((entry) => this.parseEntity(entry)));
  }

  uploadFile(fileName: string, file: File): Observable<HttpEvent<string>> {
    const headers = new HttpHeaders({
      'ngsw-bypass': 'true',
      'X-Progress-ID': fileName,
    });

    return this.http.post<string>(`${this.UPLOAD_URL}/${fileName}`, file, {
      reportProgress: true,
      observe: 'events',
      headers: headers,
    });
  }

  override update(
    audioPk: number,
    sessionAudioModel: SessionAudio,
  ): Observable<any> {
    const url = `${this.baseUrl}/pk/${audioPk}/`;
    const formData: FormData = convertSingleFileModelToFormData(
      sessionAudioModel,
      'audio_file',
    );
    const headers = new HttpHeaders({ 'ngsw-bypass': 'true' });

    return this.http.put<any>(url, formData, {
      headers: headers,
      observe: 'events',
      reportProgress: true,
    } as any); //This bit is only required as otherwise there's some typescript definition missing and throwing errors
  }

  override parseEntity(data: any): SessionAudio {
    const campaignName = data.session_details.campaign_details.name;

    return {
      ...data,
      getAbsoluteRouterUrl: this.generateUrlCallback(data, campaignName),
    };
  }

  override parseOverviewEntity(data: any): OverviewItem {
    const campaignName = data.campaign_details.name;

    return {
      ...data,
      getAbsoluteRouterUrl: this.generateUrlCallback(data, campaignName),
    };
  }

  private generateUrlCallback(data: any, campaignName: string) {
    const isMainSession = data.session_details.is_main_session_int;
    const sessionNumber = data.session_details.session_number;

    return () =>
      this.routingService.getRoutePath('sessionaudio', {
        campaign: campaignName,
        isMainSession,
        sessionNumber,
      });
  }
}
