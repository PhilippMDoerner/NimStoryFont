import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { debounceTime, EMPTY, fromEvent, map, startWith } from 'rxjs';
import { MOBILE_WIDTH } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private document = inject(DOCUMENT);
  private resizeEvents$ = this.document.defaultView
    ? fromEvent<Event>(this.document.defaultView, 'resize', {
        passive: true,
      }).pipe(
        debounceTime(500),
        map(() => this.document.defaultView),
        startWith(this.document.defaultView),
      )
    : EMPTY;

  public windowWidth$ = this.resizeEvents$.pipe(map((doc) => doc?.innerWidth));
  public windowHeight$ = this.resizeEvents$.pipe(
    map((doc) => doc?.innerHeight),
  );

  public isMobile() {
    const windowWidth = this.document.defaultView?.innerWidth;
    return windowWidth ? windowWidth <= MOBILE_WIDTH : false;
  }

  public isMobile$ = this.windowWidth$.pipe(
    map((width) => width && width <= MOBILE_WIDTH),
  );
}
