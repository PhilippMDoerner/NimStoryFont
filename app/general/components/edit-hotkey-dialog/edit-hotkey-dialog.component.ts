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
import { componentId } from '../../../../utils/DOM';
import { encodeKeyCombination } from '../../../_functions/keyMapper';
import {
  equals,
  HOTKEY_ACTIONS,
  HotkeyAction,
  KeyCombination,
  MODIFIER_KEYS,
} from '../../../_models/hotkey';
import { ButtonComponent } from '../../../design/atoms/button/button.component';
import { IconComponent } from '../../../design/atoms/icon/icon.component';
import { KeyComponent } from '../../../design/atoms/key/key.component';
import { UserPreferencesStore } from '../../../user-preferences.store';

@Component({
  selector: 'app-edit-hotkey-dialog',
  imports: [ButtonComponent, AsyncPipe, IconComponent, KeyComponent],
  templateUrl: './edit-hotkey-dialog.component.html',
  styleUrl: './edit-hotkey-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditHotkeyDialogComponent {
  readonly modalService = inject(NgbModal);

  readonly action = model.required<HotkeyAction>();
  readonly modified = model.required<boolean>();

  readonly hotkeyEdited = output<{
    action: HotkeyAction;
    hotkey: KeyCombination;
  }>();
  readonly hotkeyReset = output<HotkeyAction>();
  readonly cancelled = output<void>();

  readonly keyInput =
    viewChild.required<ElementRef<HTMLInputElement>>('keyInput');
  readonly keyInput$ = toObservable(this.keyInput);
  readonly modalId = componentId();
  readonly fieldId = componentId();

  readonly currentKeymap$ = toObservable(
    inject(UserPreferencesStore).hotkeyMappings,
  );
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

  readonly text$ = this.value$.pipe(
    map((keyEvents) => encodeKeyCombination(keyEvents)),
  );

  readonly conflictKind$ = combineLatest({
    currentKeymap: this.currentKeymap$,
    selectedKeys: this.value$,
  }).pipe(
    map(({ currentKeymap, selectedKeys }) => {
      const isAlreadyInASequence = HOTKEY_ACTIONS.some((action) => {
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

  emitHotkeyEdited(keys: KeyboardEvent[] | null, event: Event) {
    event.preventDefault();
    if (!keys) return;

    this.hotkeyEdited.emit({
      action: this.action(),
      hotkey: keys,
    });
  }

  emitHotkeyReset() {
    this.hotkeyReset.emit(this.action());
  }

  closeDialog() {
    this.modalService.dismissAll();
    this.cancelled.emit();
  }
}
