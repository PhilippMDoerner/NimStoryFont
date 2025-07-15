import { AsyncPipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  combineLatest,
  filter,
  fromEvent,
  map,
  scan,
  switchMap,
  tap,
} from 'rxjs';
import { encodeKey } from 'src/app/_functions/keyMapper';
import {
  ACTIONS,
  KeyCombination,
  MODIFIER_KEYS,
  ShortcutAction,
} from 'src/app/_models/hotkey';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { UserPreferencesStore } from 'src/app/user-preferences.store';
import { componentId } from 'src/utils/DOM';
import { filterNil } from 'src/utils/rxjs-operators';

@Component({
  selector: 'app-edit-shortcut-dialog',
  imports: [ButtonComponent, AsyncPipe, TitleCasePipe],
  templateUrl: './edit-shortcut-dialog.component.html',
  styleUrl: './edit-shortcut-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditShortcutDialogComponent {
  action = input.required<ShortcutAction>();

  shortcutEdited = output<{
    action: ShortcutAction;
    shortcut: KeyCombination;
  }>();
  cancelled = output<void>();

  keyInput = viewChild.required<ElementRef<HTMLInputElement>>('keyInput');
  keyInput$ = toObservable(this.keyInput);
  modalId = componentId();
  fieldId = componentId();

  currentKeymap$ = toObservable(inject(UserPreferencesStore).shortcutMappings);
  value$ = this.keyInput$.pipe(
    switchMap((keyInput) =>
      fromEvent<KeyboardEvent>(keyInput.nativeElement, 'keydown'),
    ),
    filter((event) => !MODIFIER_KEYS.has(event.key)),
    tap((event) => event.preventDefault()),
    scan((acc, keyEvent) => {
      switch (keyEvent.key) {
        case 'Backspace':
          acc.pop();
          return acc;
        default:
          return [...acc, keyEvent].slice(-2);
      }
    }, [] as KeyboardEvent[]),
  );

  text$ = this.value$.pipe(
    map((keyEvents) => keyEvents.map(encodeKey).join(' + ')),
  );

  hasConflict$ = combineLatest({
    currentKeymap: this.currentKeymap$.pipe(filterNil()),
    selectedKeys: this.value$,
  }).pipe(
    map(({ currentKeymap, selectedKeys }) => {
      const isAlreadyInASequence = ACTIONS.some((action) => {
        const keyMap = currentKeymap[action].keys;
        return selectedKeys.every(({ key }, index) => keyMap[index] === key);
      });

      return isAlreadyInASequence;
    }),
  );

  emitShortcutEdited(keys: KeyboardEvent[] | null, event: Event) {
    event.preventDefault();
    if (!keys) return;

    this.shortcutEdited.emit({
      action: this.action(),
      shortcut: keys.map(encodeKey),
    });
  }
}
