import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import Quill, { QuillOptions } from 'quill';
import E from 'quill/core/emitter';
import { HOTKEY_IGNORE_ATTR } from 'src/app/_models/hotkey';
import { QUILL_SETTINGS } from 'src/app/app.constants';

type QuillEvent = (typeof E)['events'][keyof (typeof E)['events']];

@Component({
  selector: 'app-quill-editor',
  imports: [],
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    [HOTKEY_IGNORE_ATTR]: '',
    '(focusin)': 'onFocus.emit()',
    '(focusout)': 'onBlur.emit()',
  },
})
export class QuillEditorComponent {
  private readonly container = viewChild<ElementRef<HTMLElement>>('editor');

  readonly value = model.required<string>();
  readonly readOnly = input<boolean>(false);

  public readonly input = output<string>();
  public readonly onBlur = output<void>();
  public readonly onFocus = output<void>();

  private quillConfig = computed<QuillOptions>(() => ({
    ...QUILL_SETTINGS,
    readOnly: this.readOnly(),
  }));

  public readonly quill = computed(() => {
    const el = this.container()?.nativeElement;
    console.log('Running with ', el);

    return el ? new Quill(el, this.quillConfig()) : undefined;
  });

  constructor() {
    this.setupQuillEventListeners();

    effect(() => {
      const q = this.quill();
      if (!q) return;

      q.clipboard.dangerouslyPasteHTML(this.value());
    });
  }

  private setupQuillEventListeners() {
    effect(() => {
      const q = this.quill();
      if (!q) return;

      const eventListeners = {
        'text-change': () => this.input.emit(q.root.innerHTML ?? ''),
      } satisfies Partial<Record<QuillEvent, Function>>;

      Object.entries(eventListeners).forEach(([eventName, callback]) =>
        q.on(eventName, callback),
      );

      return () => {
        Object.entries(eventListeners).forEach(([eventName, callback]) =>
          q.off(eventName, callback),
        );
      };
    });
  }
}
