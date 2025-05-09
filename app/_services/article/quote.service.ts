/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OverviewItem } from 'src/app/_models/overview';
import { Quote, QuoteRaw } from 'src/app/_models/quote';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class QuoteService extends BaseService<QuoteRaw, Quote> {
  constructor(http: HttpClient) {
    super(http, 'quote');
  }

  getQuotes(campaign: string, character_name: string): Observable<Quote[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/${campaign}/${character_name}/`)
      .pipe(map((entries) => entries.map((entry) => this.parseEntity(entry))));
  }

  getRandomQuote(campaign: string, character_name: string): Observable<Quote> {
    return this.http
      .get<any>(`${this.baseUrl}/${campaign}/${character_name}/random/`)
      .pipe(map((entry) => this.parseEntity(entry)));
  }

  getAllCharacterQuotes(
    campaign: string,
    character_name: string,
  ): Observable<Quote[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/${campaign}/${character_name}/`)
      .pipe(map((entries) => entries.map((entry) => this.parseEntity(entry))));
  }

  override parseEntity(data: any): Quote {
    return data;
  }

  override parseOverviewEntity(): OverviewItem {
    throw 'Overview types are not implemented for Quotes';
  }
}
