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
  modalService = inject(NgbModal);

  action = model.required<ShortcutAction>();
  modified = model.required<boolean>();

  shortcutEdited = output<{
    action: ShortcutAction;
    shortcut: KeyCombination;
  }>();
  shortcutReset = output<ShortcutAction>();
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

  text$ = this.value$.pipe(map((keyEvents) => encodeKeyCombination(keyEvents)));

  conflictKind$ = combineLatest({
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

  hasConflict$ = this.conflictKind$.pipe(
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
