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
import Quill, { QuillOptions, Range } from 'quill';
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
    modules: {
      ...QUILL_SETTINGS.modules,
      keyboard: {
        bindings: {
          shiftEnter: {
            key: ['Enter'],
            shiftKey: true,
            handler: (range: Range) => {
              this.handleLinebreakKeybindings(range);
            },
          },
        },
      },
    },
  }));

  public readonly quill = computed(() => {
    const el = this.container()?.nativeElement;
    console.log('Running with ', el);
    if (!el) return undefined;

    const quill = new Quill(el, this.quillConfig());
    return quill;
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

  private handleLinebreakKeybindings(range: Range) {
    const q = this.quill();
    if (!q) return;

    const [line, offset] = q.getLine(range.index);
    const isAtEndOfBlock = offset >= (line?.length() ?? 0) - 1;

    this.insertSoftbreak(q, range.index);
    if (isAtEndOfBlock) {
      // insert a second break as <br /> at end of a line does not push the cursor into the next line
      this.insertSoftbreak(q, range.index + 1);
    }

    q.setSelection(
      Math.min(range.index + 1, q.getLength()),
      Quill.sources.SILENT,
    );
  }

  private insertSoftbreak(quill: Quill, position: number) {
    quill.insertEmbed(position, 'softbreak', '', Quill.sources.SILENT);
  }
}
