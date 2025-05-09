import { Injectable } from '@angular/core';
import { fromEvent, map, merge, of, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnlineService {
  private isInBrowser = !!window;

  public online$ = this.isInBrowser
    ? merge(
        fromEvent(window, 'online').pipe(map(() => true)),
        fromEvent(window, 'offline').pipe(map(() => false)),
      ).pipe(startWith(window.navigator.onLine))
    : of(true);
}
