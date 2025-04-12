import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { debugLog } from 'src/utils/rxjs-operators';

@Injectable({
  providedIn: 'root',
})
export class GlobalUrlParamsService {
  public campaignSetTrigger$ = new Subject<void>();

  private currentRouteSnapshot$ =
    new ReplaySubject<ActivatedRouteSnapshot | null>(1);

  public campaignNameParam$ = this.currentRouteSnapshot$.pipe(
    map((snapshot) => snapshot?.params['campaign'] as string | undefined),
    debugLog('campaignName'),
  );

  nextSnapshot(snapshot: ActivatedRouteSnapshot | null): void {
    this.currentRouteSnapshot$.next(snapshot);
  }
}
