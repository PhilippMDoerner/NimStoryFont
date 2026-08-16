import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WikiStatistics } from '../../_models/campaign';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  readonly apiUrl = environment.apiUrl;
  readonly adminUrl = `${this.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  clearDatabase(): Observable<void> {
    return this.http.delete<void>(`${this.adminUrl}/dbclear`);
  }

  downloadDatabase(): Observable<Blob> {
    return this.http.get(`${this.adminUrl}/dbdownload`, {
      responseType: 'blob',
    });
  }

  getStatistics(): Observable<WikiStatistics> {
    return this.http.get<WikiStatistics>(`${this.adminUrl}/statistics`);
  }
}
