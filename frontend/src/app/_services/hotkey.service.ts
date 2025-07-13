import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  bufferCount,
  filter,
  fromEvent,
  map,
  merge,
  Observable,
  scan,
  share,
  switchMap,
} from 'rxjs';
import { resetAfterTimeout } from 'src/utils/rxjs-operators';
import { ACTIONS, DEFAULT_MAPPINGS, HotkeyAction } from '../_models/hotkey';

@Injectable({
  providedIn: 'root',
})
export class HotkeyService {
  private MODIFIER_KEYS = new Set([
    'Alt',
    'Control',
    'AltGraph',
    'Meta',
    'Shift',
    'CapsLock',
  ]);
  private modalService = inject(NgbModal);

  private hotkeyMap = signal(DEFAULT_MAPPINGS);
  private hotkeyMap$ = toObservable(this.hotkeyMap);

  private keyup$ = fromEvent<KeyboardEvent>(document.body, 'keyup').pipe(
    filter((event) => !this.MODIFIER_KEYS.has(event.key)),
    map((event) => this.encodeKey(event)),
  );

  private actions$: Observable<HotkeyAction> = this.hotkeyMap$.pipe(
    switchMap((hotkeyMap) => {
      const actionListeners$ = ACTIONS.map((action) => {
        const sequence = hotkeyMap[action].map((key) => key.toLowerCase());
        return this.keyup$.pipe(
          bufferCount(sequence.length, 1),
          resetAfterTimeout(1000),
          filter((lastNKeys) =>
            sequence.every((key, index) => key === lastNKeys[index]),
          ),
          map(() => action),
        );
      });

      return merge(...actionListeners$);
    }),
    share(),
  );

  public watchAction(
    action: HotkeyAction,
    isModalAction = false,
  ): Observable<void> {
    return this.actions$.pipe(
      filter((a) => a === action),
      filter(() => this.modalActionFilter(isModalAction)),
      map(() => void 0),
    );
  }

  public hasVisibleTooltip(isModalAction = false): Observable<boolean> {
    return this.watchAction('show-tooltips', isModalAction).pipe(
      scan(
        (currentIsTooltipVisibleValue) => !currentIsTooltipVisibleValue,
        false,
      ),
    );
  }

  public getKeySequence(action: HotkeyAction): Observable<string[]> {
    return this.hotkeyMap$.pipe(map((hotkeyMap) => hotkeyMap[action]));
  }

  /*
   * Checks if a given action is currently allowed to trigger or not.
   * An Action may only trigger if:
   * - No modal is open (We do not want to allow hotkeys to trigger actions *underneath* a modal)
   * - If a modal is open, then the action must be an action on the currently open modal itself.
   */
  private modalActionFilter(isModalAction: boolean) {
    const hasOpenModals = this.modalService.hasOpenModals();
    if (!hasOpenModals) return true;
    return hasOpenModals && isModalAction;
  }

  private encodeKey(event: KeyboardEvent) {
    return `${event.altKey ? 'alt+' : ''}${event.ctrlKey ? 'ctrl+' : ''}${event.metaKey ? 'meta+' : ''}${event.shiftKey ? 'shift+' : ''}${event.key.toLowerCase()}`;
  }
}
