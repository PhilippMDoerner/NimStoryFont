import { Toolbar, ToolbarWidget } from '@angular/aria/toolbar';
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
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import Quill, { QuillOptions } from 'quill';
import E from 'quill/core/emitter';
import { HOTKEY_IGNORE_ATTR } from '../../../../app/_models/hotkey';
import { QUILL_SETTINGS } from '../../../../app/app.constants';
import { componentId } from '../../../../utils/DOM';

type QuillEvent = (typeof E)['events'][keyof (typeof E)['events']];

@Component({
  selector: 'app-quill-editor',
  imports: [Toolbar, ToolbarWidget, NgbTooltip],
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    [HOTKEY_IGNORE_ATTR]: '',
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

      q.clipboard.dangerouslyPasteHTML(this.value(), 'silent');
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
}
