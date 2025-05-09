import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  debounceTime,
  EMPTY,
  filter,
  fromEvent,
  map,
  merge,
  Observable,
  share,
  shareReplay,
  startWith,
  tap,
} from 'rxjs';

const UNBINDABLE_HOTKEYS = [
  '',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '-',
  '=',
  'Escape',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'ArrowLeft',
  'ArrowRight',
  '^',
  'Space',
] as const;
export const UNBINDABLE_KEYSET = new Set<string>(UNBINDABLE_HOTKEYS);
type UnbindableHotkey = (typeof UNBINDABLE_HOTKEYS)[number];

type NotA<T> = T extends UnbindableHotkey ? never : T;
type NotB<T> = UnbindableHotkey extends T ? never : T;
export type BindableHotkey<T> = NotA<T> & NotB<T>;

@Injectable({
  providedIn: 'root',
})
export class HotkeyService {
  private hotkeyDown$: Observable<KeyboardEvent> | undefined;
  public isHotkeyModifierPressed$: Observable<boolean> | undefined; //Undefined on Server

  constructor() {
    const document = inject(DOCUMENT);
    const window = inject(DOCUMENT).defaultView;
    const destroyRef = inject(DestroyRef);

    if (window) {
      const keydownEvents$ = fromEvent<KeyboardEvent>(window, 'keydown');
      const keyupEvents$ = fromEvent<KeyboardEvent>(window, 'keyup');
      const visibilityChangeEvents$ = merge(
        fromEvent<Event>(document, 'blur'),
        fromEvent<Event>(window, 'blur'),
        fromEvent<Event>(document, 'visibilitychange'),
        fromEvent<Event>(window, 'visibilitychange'),
      ).pipe(debounceTime(10));

      this.hotkeyDown$ = this.toHotkeydownEvents(keydownEvents$).pipe(
        takeUntilDestroyed(destroyRef),
        share(),
      );
      this.isHotkeyModifierPressed$ = this.toIsHotkeyActive(
        keydownEvents$,
        keyupEvents$,
        visibilityChangeEvents$,
      ).pipe(takeUntilDestroyed(destroyRef));
    }
  }

  /**
   * Creates an observable of keydown events on @key that happen while the hotkey is pressed.
   * Event will get fired everytime @key gets invoked as either:
   * - alt + @key
   * - alt + ctrl + @key (This is mostly relevant for firefox which displays a few menus when alt is pressed)
   */
  watch<T>(key: BindableHotkey<T> | undefined): Observable<KeyboardEvent> {
    if (!window || !this.hotkeyDown$ || !key) return EMPTY;

    return this.hotkeyDown$.pipe(
      filter((event) => event.key === key),
      tap((event) => event.preventDefault()),
    );
  }

  private toHotkeydownEvents(
    keydownEvents$: Observable<KeyboardEvent>,
  ): Observable<KeyboardEvent> {
    return keydownEvents$.pipe(
      filter((event) => event.altKey && !UNBINDABLE_KEYSET.has(event.key)),
      shareReplay(1),
    );
  }

  private toIsHotkeyActive(
    keydownEvents$: Observable<KeyboardEvent>,
    keyupEvents$: Observable<KeyboardEvent>,
    visibilityChangeEvents$: Observable<Event>,
  ): Observable<boolean> {
    const isAltKeyDown1$ = keydownEvents$.pipe(
      filter((event) => event.key === 'Alt'),
      map(() => true),
    );
    const isAltKeyDown2 = merge(
      keyupEvents$.pipe(filter((event) => event.key === 'Alt')),
      visibilityChangeEvents$,
    ).pipe(map(() => false));

    return merge(isAltKeyDown1$, isAltKeyDown2).pipe(
      startWith(false),
      shareReplay(1),
    );
  }
}
