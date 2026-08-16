import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  Injector,
  input,
  linkedSignal,
  output,
  untracked,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import {
  concat,
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  of,
  switchMap,
  timer,
} from 'rxjs';
import { HotkeyDirective } from '../../../_directives/hotkey.directive';
import { ElementKind } from '../../atoms/_models/button';
import { AlertComponent } from '../../atoms/alert/alert.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { HtmlTextComponent } from '../../atoms/html-text/html-text.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { SeparatorComponent } from '../../atoms/separator/separator.component';
import { SpinnerComponent } from '../../atoms/spinner/spinner.component';
import { QuillEditorComponent } from '../quill-editor/quill-editor.component';

type SaveState = 'UNSAVED_CHANGES' | 'SAVING' | 'ALL_SAVED';
export type TextFieldState = 'DISPLAY' | 'UPDATE' | 'OUTDATED_UPDATE';

@Component({
  selector: 'app-editor',
  imports: [
    NgTemplateOutlet,
    HtmlTextComponent,
    IconComponent,
    FormsModule,
    AlertComponent,
    SeparatorComponent,
    ButtonComponent,
    HotkeyDirective,
    QuillEditorComponent,
    SpinnerComponent,
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  readonly destroyRef = inject(DestroyRef);
  readonly injector = inject(Injector);

  readonly text = input.required<string>();
  readonly placeholder = input.required<string>();
  readonly canUpdate = input.required<boolean>();
  readonly serverModel = input<string>();
  readonly state = input.required<TextFieldState>();
  readonly submitButtonKind = input<ElementKind>('PRIMARY');
  readonly cancelButtonKind = input<ElementKind>('SECONDARY');
  readonly enableAutosave = input<boolean>(true);
  readonly disabledHotkeys = input<boolean>(false);
  readonly id = input.required<string>();
  readonly labelId = input.required<string>();
  readonly describedById = input<string>();

  readonly editStarted = output<void>();
  readonly update = output<string>();
  readonly autosave = output<string>();
  readonly cancelled = output<void>();

  protected readonly editorValue = linkedSignal(() => this.text());
  protected readonly saveState = toSignal(this.getAutoSaveState());

  private readonly editorField = viewChild<QuillEditorComponent>('editor');

  constructor() {
    this.startAutosaveBehavior();
    this.setupStateChangeBehavior();
  }

  protected finishEdit() {
    this.update.emit(this.editorValue());
  }

  protected startEdit() {
    this.editStarted.emit();
  }

  protected cancelEdit() {
    this.cancelled.emit();
  }

  private startAutosaveBehavior() {
    effect(() => {
      const isStartingAutosave = this.saveState() === 'SAVING';
      if (!isStartingAutosave) return;

      const isAutosaveEnabled = untracked(() => this.enableAutosave());
      if (!isAutosaveEnabled) return;

      const canUpdate = untracked(() => this.state() === 'UPDATE');
      if (!canUpdate) return;

      const hasTextChanged = this.text() !== this.editorValue();
      if (!hasTextChanged) return;

      this.autosave.emit(this.editorValue());
    });
  }

  private getAutoSaveState(): Observable<SaveState> {
    const editorValue$ = toObservable(this.editorValue);
    const currentValue$ = toObservable(this.text);
    const generalAutoSaveState$ = editorValue$.pipe(
      distinctUntilChanged(),
      switchMap((editorValue) =>
        currentValue$.pipe(
          map((currentValue) => currentValue === editorValue),
          distinctUntilChanged(),
          switchMap(
            (isEqual): Observable<SaveState> =>
              isEqual
                ? of('ALL_SAVED')
                : concat(
                    of('UNSAVED_CHANGES' as const),
                    timer(3000).pipe(map(() => 'SAVING' as const)),
                  ),
          ),
        ),
      ),
      distinctUntilChanged(),
    );

    const outDatedUpdateSaveState$: Observable<SaveState> = toObservable(
      this.state,
    ).pipe(
      filter((state) => state === 'OUTDATED_UPDATE'),
      map(() => 'UNSAVED_CHANGES'),
    );

    return merge(generalAutoSaveState$, outDatedUpdateSaveState$);
  }

  private setupStateChangeBehavior() {
    toObservable(this.state)
      .pipe(takeUntilDestroyed())
      .subscribe((state) => {
        switch (state) {
          case 'DISPLAY':
            return this.resetTextfield();
          case 'UPDATE':
          case 'OUTDATED_UPDATE':
            return this.focusField();
        }
      });
  }

  private resetTextfield() {
    this.editorValue.set(this.text());
  }

  private focusField() {
    this.editorField()?.focus();
  }
}
