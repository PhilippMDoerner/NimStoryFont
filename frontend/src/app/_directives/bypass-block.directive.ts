import { computed, Directive, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { filterNil } from 'src/utils/rxjs-operators';

@Directive({
  selector: 'a[bypass]',
  host: {
    '[href]': 'link()',
    '(focus)': 'isInFocus.set(true)',
    '(blur)': 'isInFocus.set(false)',
    '[class.cdk-visually-hidden]': '!isInFocus()',
    class: 'text-decoration-none',
  },
})
export class BypassBlockDirective {
  skipToId = input.required<string>();

  isInFocus = signal(false);
  private readonly router = inject(Router);

  private readonly currentUrl$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => event.url),
    startWith(this.router.url),
    map((url) => url.split('#')[0]), //Remove any fragment it might have
    filterNil(),
  );
  private readonly currentUrl = toSignal(this.currentUrl$);

  link = computed(() => `${this.currentUrl()}#${this.skipToId()}`);
}
