import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpProgressEvent,
  HttpResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
  combineLatest,
  filter,
  from,
  interval,
  map,
  mergeMap,
  Observable,
  of,
  scan,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalStore } from '../global.store';
import {
  BrowserDatabaseService,
  OfflineCampaignData,
} from './browser-database.service';

// const openDbErrorToast: ToastConfig = {
//   type: 'DANGER',
//   body: {
//     text: 'Unable to open browser database. Offline features are disabled.',
//   },
// };

export interface Download<T> {
  state: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  progress: number;
  content: T | null;
}

@Injectable({
  providedIn: 'root',
})
export class OfflineRequestService {
  private CHECK_REFRESH_INTERVAL_SECONDS = 1000 * 60 * 60;
  private MAX_CACHE_AGE_SECONDS = 1000 * 60 * 60 * 24;

  private client = inject(HttpClient);
  private dbService = inject(BrowserDatabaseService);
  private globalStore = inject(GlobalStore);
  private campaigns$ = toObservable(this.globalStore.campaigns);
  private currentCampaignName$ = toObservable(this.globalStore.campaignName);
  private currentCampaignRecord$ = this.currentCampaignName$.pipe(
    switchMap((name) => {
      if (!name) return of(undefined);
      return this.dbService.getCampaignData(name);
    }),
  );

  constructor() {
    this.startRefreshCampaignDataEffect();
  }

  getRequestData<T>(url: string): Observable<T | null | undefined> {
    return this.currentCampaignRecord$.pipe(
      map((record) => {
        return record?.data[url] as T | null | undefined;
      }),
    );
  }

  loadCampaignData(
    campaignName: string,
  ): Observable<Download<OfflineCampaignData>> {
    const url = `${environment.apiUrl}/db_dumps/${campaignName}-data.json`;
    return this.client
      .get<OfflineCampaignData>(url, {
        responseType: 'json',
        observe: 'events',
        reportProgress: true,
      })
      .pipe(
        scan(
          (
            previous: Download<OfflineCampaignData>,
            event: HttpEvent<OfflineCampaignData>,
          ) => this.download(previous, event),
          { state: 'PENDING', progress: 0, content: null },
        ),
        tap((dl) => {
          const isDone = dl.state === 'DONE';
          if (!isDone || !dl.content) return;
          this.dbService.putCampaignData(campaignName, dl.content).subscribe();
        }),
      );
  }

  private download<T>(previous: Download<T>, event: HttpEvent<T>): Download<T> {
    if (this.isHttpProgressEvent(event)) {
      const progressPercent = event.total
        ? Math.round((100 * event.loaded) / event.total)
        : previous.progress;
      return {
        progress: progressPercent,
        state: 'IN_PROGRESS',
        content: null,
      };
    }

    if (this.isHttpResponse(event)) {
      return {
        progress: 100,
        state: 'DONE',
        content: event.body,
      };
    }

    return previous;
  }

  private isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
    return event.type === HttpEventType.Response;
  }

  private isHttpProgressEvent(
    event: HttpEvent<unknown>,
  ): event is HttpProgressEvent {
    return (
      event.type === HttpEventType.DownloadProgress ||
      event.type === HttpEventType.UploadProgress
    );
  }

  private startRefreshCampaignDataEffect() {
    combineLatest({
      interval: interval(this.CHECK_REFRESH_INTERVAL_SECONDS).pipe(
        startWith(void 0),
      ),
      campaigns: this.campaigns$,
    })
      .pipe(
        switchMap(({ campaigns }) =>
          from(campaigns ?? []).pipe(
            mergeMap((campaign) =>
              this.dbService
                .getCampaignData(campaign.name)
                .pipe(map((record) => ({ record, campaign }))),
            ),
          ),
        ),
        filter(({ record }) => {
          const now = new Date();
          const isUpToDate =
            record?.lastUpdated &&
            now.getTime() - record.lastUpdated.getTime() <
              this.MAX_CACHE_AGE_SECONDS;
          return !isUpToDate;
        }),
        mergeMap(({ campaign }) => this.loadCampaignData(campaign.name)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
