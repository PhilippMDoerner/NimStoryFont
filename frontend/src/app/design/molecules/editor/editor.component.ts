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
  interval,
  Subject,
  take,
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
  destroyRef = inject(DestroyRef);

  text = input.required<string>();
  placeholder = input.required<string>();
  canUpdate = input.required<boolean>();
  serverModel = input<string>();
  state = input.required<TextFieldState>();
  submitButtonKind = input<ElementKind>('PRIMARY');
  cancelButtonKind = input<ElementKind>('SECONDARY');
  enableAutosave = input<boolean>(true);
  maxHeightPercentage = input<number>(0.75); // Range 0-1
  settings = input<Partial<EditorSettings>>();
  disabledHotkeys = input<boolean>(false);
  id = input.required<string>();

  editStarted = output<void>();
  update = output<string>();
  autosave = output<string>();
  cancelled = output<void>();

  change$ = new Subject<string>();
  inFocus = signal(false);

  set = TINYMCE_SETTINGS;
  windowHeight = toSignal(inject(ScreenService).windowHeight$);
  maxEditorHeight = computed(() => {
    const windowHeight = this.windowHeight();
    if (!windowHeight) return undefined;
    return windowHeight * this.maxHeightPercentage();
  });
  editorHeight = computed(() => {
    const maxHeight = this.maxEditorHeight();
    const defaultHeight = TINYMCE_SETTINGS.height;
    const configuredHeight = this.settings()?.height;
    if (!configuredHeight || !maxHeight) return defaultHeight;
    return Math.min(maxHeight, configuredHeight);
  });
  _settings = computed(() => ({
    ...TINYMCE_SETTINGS,
    ...this.settings(),
    height: this.editorHeight(),
  }));
  textModel = '';

  editorField = viewChild.required<TinyMCEEditorComponent>('editor');

  constructor() {
    this.startAutosaveBehavior();

    toObservable(this.state)
      .pipe(takeUntilDestroyed())
      .subscribe((state) => {
        switch (state) {
          case 'DISPLAY':
            return this.resetTextfield();
          case 'UPDATE':
          case 'OUTDATED_UPDATE':
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
    interval(100)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.editorField().editor.iframeElement?.focus();
      });
  }
}
