import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, EMPTY, fromEvent, map, startWith } from 'rxjs';
import { MOBILE_WIDTH } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private readonly document = inject(DOCUMENT);
  private readonly resizeEvents$ = this.document.defaultView
    ? fromEvent<Event>(this.document.defaultView, 'resize', {
        passive: true,
      }).pipe(
        debounceTime(500),
        map(() => this.document.defaultView),
        startWith(this.document.defaultView),
      )
    : EMPTY;

  public readonly windowWidth$ = this.resizeEvents$.pipe(
    map((doc) => doc?.innerWidth),
  );
  public readonly windowHeight$ = this.resizeEvents$.pipe(
    map((doc) => doc?.innerHeight),
  );
  public readonly windowWidth = toSignal(this.windowWidth$);
  public readonly windowHeight = toSignal(this.windowHeight$);

  public readonly isMobile$ = this.windowWidth$.pipe(
    map((width) => !!width && width <= MOBILE_WIDTH),
  );
  public readonly isMobile = toSignal(this.isMobile$, { initialValue: true });
}
