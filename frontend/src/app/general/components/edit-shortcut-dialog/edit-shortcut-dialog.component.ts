import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  model,
  output,
  viewChild,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  combineLatest,
  filter,
  fromEvent,
  map,
  scan,
  switchMap,
  tap,
} from 'rxjs';
import { encodeKeyCombination } from 'src/app/_functions/keyMapper';
import {
  ACTIONS,
  equals,
  KeyCombination,
  MODIFIER_KEYS,
  ShortcutAction,
} from 'src/app/_models/hotkey';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import { KeyComponent } from 'src/app/design/atoms/key/key.component';
import { UserPreferencesStore } from 'src/app/user-preferences.store';
import { componentId } from 'src/utils/DOM';

@Component({
  selector: 'app-edit-shortcut-dialog',
  imports: [ButtonComponent, AsyncPipe, IconComponent, KeyComponent],
  templateUrl: './edit-shortcut-dialog.component.html',
  styleUrl: './edit-shortcut-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditShortcutDialogComponent {
  readonly modalService = inject(NgbModal);

  readonly action = model.required<ShortcutAction>();
  readonly modified = model.required<boolean>();

  readonly shortcutEdited = output<{
    action: ShortcutAction;
    shortcut: KeyCombination;
  }>();
  readonly shortcutReset = output<ShortcutAction>();
  readonly cancelled = output<void>();

  readonly keyInput = viewChild.required<ElementRef<HTMLInputElement>>('keyInput');
  readonly keyInput$ = toObservable(this.keyInput);
  readonly modalId = componentId();
  readonly fieldId = componentId();

  readonly currentKeymap$ = toObservable(inject(UserPreferencesStore).shortcutMappings);
  readonly value$ = this.keyInput$.pipe(
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

  readonly text$ = this.value$.pipe(map((keyEvents) => encodeKeyCombination(keyEvents)));

  readonly conflictKind$ = combineLatest({
    currentKeymap: this.currentKeymap$,
    selectedKeys: this.value$,
  }).pipe(
    map(({ currentKeymap, selectedKeys }) => {
      const isAlreadyInASequence = ACTIONS.some((action) => {
        const existingCombo = currentKeymap?.[action]?.keys;
        return existingCombo.every((key, index) =>
          equals(selectedKeys[index], key),
        );
      });
      if (isAlreadyInASequence) return 'already-in-sequence';

      return undefined;
    }),
  );

  readonly hasConflict$ = this.conflictKind$.pipe(
    map((conflictKind) => conflictKind !== undefined),
  );

  emitShortcutEdited(keys: KeyboardEvent[] | null, event: Event) {
    event.preventDefault();
    if (!keys) return;

    this.shortcutEdited.emit({
      action: this.action(),
      shortcut: keys,
    });
  }

  emitShortcutReset() {
    this.shortcutReset.emit(this.action());
  }

  closeDialog() {
    this.modalService.dismissAll();
    this.cancelled.emit();
  }
}
