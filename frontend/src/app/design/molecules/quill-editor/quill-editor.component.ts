import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import Quill, { QuillOptions, Range } from 'quill';
import E from 'quill/core/emitter';
import { HOTKEY_IGNORE_ATTR } from 'src/app/_models/hotkey';
import { QUILL_SETTINGS } from 'src/app/app.constants';
import { componentId } from 'src/utils/DOM';

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
  private readonly container =
    viewChild.required<ElementRef<HTMLElement>>('editor');
  private readonly toolbar =
    viewChild.required<ElementRef<HTMLElement>>('toolbar');

  readonly value = input.required<string>();
  readonly readOnly = input<boolean>(false);

  public readonly inputChanged = output<string>();
  public readonly onBlur = output<void>();
  public readonly onFocus = output<void>();

  protected readonly toolbarId = `${componentId()}-toolbar`;

  private quillConfig = computed<QuillOptions>(() => ({
    ...QUILL_SETTINGS,
    readOnly: this.readOnly(),
    modules: {
      ...QUILL_SETTINGS.modules,
      toolbar: this.toolbar().nativeElement,
      keyboard: {
        bindings: {
          tab: false,
          // shiftEnter: {
          //   key: ['Enter'],
          //   shiftKey: true,
          //   handler: (range: Range) => {
          //     this.handleLinebreakKeybindings(range);
          //   },
          // },
        },
      },
    },
  }));

  public readonly quill = computed(() => {
    const el = this.container()?.nativeElement;
    if (!el) return undefined;

    const quill = new Quill(el, this.quillConfig());
    return quill;
  });

  constructor() {
    this.setupQuillEventListeners();

    effect(() => {
      const q = this.quill();
      if (!q) return;
      console.log('DBB Setting', this.value());
      const selection = q.getSelection();

      q.clipboard.dangerouslyPasteHTML(this.value(), 'silent');

      if (selection) {
        q.setSelection(selection.index, selection.length, 'silent');
      }
    });
  }

  private setupQuillEventListeners() {
    effect(() => {
      const q = this.quill();
      if (!q) return;

      const eventListeners = {
        'text-change': () => {
          const value = q.root.innerHTML ?? '';
          this.inputChanged.emit(value);
          console.log('DBB Emitting', value);
        },
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

    q.setSelection(Math.min(range.index + 1, q.getLength()), 'silent');
  }

  private insertSoftbreak(quill: Quill, position: number) {
    // quill.insertEmbed(position, 'softbreak', '', 'silent');
  }
}
