import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent as TinyMCEEditorComponent } from '@tinymce/tinymce-angular';

import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  timer,
} from 'rxjs';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { ScreenService } from 'src/app/_services/screen.service';
import { EditorSettings, TINYMCE_SETTINGS } from 'src/app/app.constants';
import { AlertComponent } from 'src/app/design/atoms/alert/alert.component';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { HtmlTextComponent } from 'src/app/design/atoms/html-text/html-text.component';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import { SeparatorComponent } from 'src/app/design/atoms/separator/separator.component';
import { ElementKind } from '../../atoms/_models/button';

export type TextFieldState = 'DISPLAY' | 'UPDATE' | 'OUTDATED_UPDATE';

@Component({
  selector: 'app-editor',
  imports: [
    NgTemplateOutlet,
    HtmlTextComponent,
    IconComponent,
    TinyMCEEditorComponent,
    FormsModule,
    AlertComponent,
    SeparatorComponent,
    ButtonComponent,
    HotkeyDirective,
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  readonly destroyRef = inject(DestroyRef);

  readonly text = input.required<string>();
  readonly placeholder = input.required<string>();
  readonly canUpdate = input.required<boolean>();
  readonly serverModel = input<string>();
  readonly state = input.required<TextFieldState>();
  readonly submitButtonKind = input<ElementKind>('PRIMARY');
  readonly cancelButtonKind = input<ElementKind>('SECONDARY');
  readonly enableAutosave = input<boolean>(true);
  readonly maxHeightPercentage = input<number>(0.75); // Range 0-1
  readonly settings = input<Partial<EditorSettings>>();
  readonly disabledHotkeys = input<boolean>(false);
  readonly id = input.required<string>();

  readonly editStarted = output<void>();
  readonly update = output<string>();
  readonly autosave = output<string>();
  readonly cancelled = output<void>();

  readonly change$ = new Subject<string>();
  readonly inFocus = signal(false);

  readonly set = TINYMCE_SETTINGS;
  readonly windowHeight = toSignal(inject(ScreenService).windowHeight$);
  readonly maxEditorHeight = computed(() => {
    const windowHeight = this.windowHeight();
    if (!windowHeight) return undefined;
    return windowHeight * this.maxHeightPercentage();
  });
  readonly editorHeight = computed(() => {
    const maxHeight = this.maxEditorHeight();
    const defaultHeight = TINYMCE_SETTINGS.height;
    const configuredHeight = this.settings()?.height;
    if (!configuredHeight || !maxHeight) return defaultHeight;
    return Math.min(maxHeight, configuredHeight);
  });
  readonly _settings = computed(() => ({
    ...TINYMCE_SETTINGS,
    ...this.settings(),
    height: this.editorHeight(),
  }));
  textModel = '';

  readonly editorField = viewChild<TinyMCEEditorComponent>('editor');

  constructor() {
    this.startAutosaveBehavior();
    const editorField$ = toObservable(this.editorField);
    toObservable(this.state)
      .pipe(takeUntilDestroyed())
      .subscribe((state) => {
        switch (state) {
          case 'DISPLAY':
            return this.resetTextfield();
          case 'UPDATE':
          case 'OUTDATED_UPDATE':
            this.focusField();
            return this.toUpdateState();
        }
      });
  }

  startEdit() {
    this.editStarted.emit();
  }

  finishEdit() {
    this.update.emit(this.textModel.trim());
  }

  cancelEdit() {
    this.cancelled.emit();
  }

  private toUpdateState() {
    this.resetTextfield();
    this.focusField();
  }

  private resetTextfield() {
    this.textModel = this.text();
  }

  private startAutosaveBehavior() {
    this.change$
      .pipe(
        debounceTime(3_000),
        filter(() => this.enableAutosave()),
        distinctUntilChanged(),
        filter(() => {
          const newText = this.textModel;
          const canFireUpdate = this.state() === 'UPDATE';
          const oldText = this.text();
          return canFireUpdate && oldText !== newText;
        }),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.autosave.emit(this.textModel));
  }

  private focusField() {
    timer(100)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.editorField()?.editor.focus());
  }
}
