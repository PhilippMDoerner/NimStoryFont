import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mapVoid } from 'src/utils/rxjs-operators';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  apiUrl: string = environment.apiUrl;
  mailUrl = `${this.apiUrl}/mail`;

  constructor(private http: HttpClient) {}

  send_error_notification(error: object): Observable<unknown> {
    return this.http.post<unknown>(`${this.mailUrl}/error`, error);
  }

  requestPasswordReset(username: string): Observable<void> {
    return this.http
      .post(`${this.mailUrl}/reset`, { username: username })
      .pipe(mapVoid());
  }
}
