/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Timestamp } from '../../_models/sessionAudio';

@Injectable({
  providedIn: 'root',
})
export class SessionAudioTimestampService {
  readonly apiUrl: string = environment.apiUrl;
  readonly baseUrl = `${this.apiUrl}/timestamp`;

  constructor(private http: HttpClient) {}

  getTimestamps(
    campaign: string,
    isMainSessionInt: number,
    sessionNumber: number,
  ): Observable<Timestamp[]> {
    return this.http.get<Timestamp[]>(
      `${this.baseUrl}/${campaign}/${isMainSessionInt}/${sessionNumber}/`,
    );
  }

  create(data: any): Observable<Timestamp> {
    return this.http.post<Timestamp>(`${this.baseUrl}/`, data);
  }

  delete(pk: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/pk/${pk}/`);
  }
}
