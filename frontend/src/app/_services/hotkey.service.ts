import { inject, Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  bufferCount,
  filter,
  fromEvent,
  map,
  merge,
  Observable,
  repeat,
  retry,
  scan,
  share,
  switchMap,
  take,
  timeout,
} from 'rxjs';
import { debugLog } from 'src/utils/rxjs-operators';
import { encodeKey } from '../_functions/keyMapper';
import { ACTIONS, MODIFIER_KEYS, ShortcutAction } from '../_models/hotkey';
import { UserPreferencesStore } from '../user-preferences.store';

@Injectable({
  providedIn: 'root',
})
export class HotkeyService {
  private modalService = inject(NgbModal);
  private preferencesStore = inject(UserPreferencesStore);

  private hotkeyMap = this.preferencesStore.shortcutMappings;
  private hotkeyMap$ = toObservable(this.hotkeyMap);

  private keyup$ = fromEvent<KeyboardEvent>(document.body, 'keyup').pipe(
    filter((event) => {
      // Ignore keyup events from text inputs, we don't want the user typing to count as invoking hotkeys
      const isFromTextInput =
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement;
      if (isFromTextInput) return false;

      // Ignore keyup events from modifier keys. We only care about "real" keys
      return !MODIFIER_KEYS.has(event.key);
    }),
    map((event) => encodeKey(event)),
    debugLog('keyup'),
    share(),
  );

  private actions$: Observable<ShortcutAction> = this.hotkeyMap$.pipe(
    map((hotkeyMap) => {
      const sequences = ACTIONS.map((action) => ({
        sequence: hotkeyMap[action].keys.map((key) => key.toLowerCase()),
        action,
      }));
      // Sorting the actions is necessary so that the longest key-combinations can emit first.
      // This allows scenarios with key Combinations [Alt+C Alt+D] vs [Alt+D] to work,
      // as the first one will trigger first on the Alt+D press
      sequences.sort((a, b) => b.sequence.length - a.sequence.length);
      return sequences;
    }),
    switchMap((hotkeySequences) => {
      const actionListeners$ = hotkeySequences.map(({ sequence, action }) =>
        this.keyup$.pipe(
          bufferCount(sequence.length, 1),
          filter((lastNKeys) =>
            sequence.every((key, index) => key === lastNKeys[index]),
          ),
          map(() => action),
          debugLog('action'),
        ),
      );

      return merge(...actionListeners$).pipe(
        // timeout + retry reset the current action-listeners if for 5s no action was fired.
        // This means if you start a key-combination but don't finish it within 5s, it will be reset
        timeout(5000),
        retry(),
        // take(1) + repeat reset the stream after an action was emitted.
        // That way the key-combination a b c can't trigger an action on a, a b AND a b c.
        // Instead it will only trigger the action for the key a.
        // The keys b c then can only trigger an action if specifically they have an action mapped to them.
        take(1),
        repeat(),
      );
    }),
    share(),
  );

  public watchAction(
    action: ShortcutAction,
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

  public getKeySequence(action: ShortcutAction): Observable<string[]> {
    return this.hotkeyMap$.pipe(map((hotkeyMap) => hotkeyMap[action].keys));
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
}
