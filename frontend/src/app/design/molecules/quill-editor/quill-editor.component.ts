import {
  Combobox,
  ComboboxPopup,
  ComboboxWidget,
} from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import {
  Toolbar,
  ToolbarWidget,
  ToolbarWidgetGroup,
} from '@angular/aria/toolbar';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import Quill, { QuillOptions, Range } from 'quill';
import TableUp from 'quill-table-up';
import E from 'quill/core/emitter';
import { HOTKEY_IGNORE_ATTR } from '../../../../app/_models/hotkey';
import { QUILL_SETTINGS } from '../../../../app/app.constants';
import { componentId } from '../../../../utils/DOM';
import { IconComponent } from '../../atoms/icon/icon.component';

type QuillEvent = (typeof E)['events'][keyof (typeof E)['events']];

@Component({
  selector: 'app-quill-editor',
  imports: [
    IconComponent,
    Toolbar,
    ToolbarWidget,
    NgbTooltip,
    ToolbarWidgetGroup,
    Combobox,
    ComboboxWidget,
    ComboboxPopup,
    CdkConnectedOverlay,
    Listbox,
    Option,
  ],
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    [HOTKEY_IGNORE_ATTR]: '',
    '(click)': 'logFormat()',
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
  private readonly currentSelection = signal<Range | null>(null);
  protected readonly headerPopupOpen = signal<boolean>(false);
  protected readonly selectionFormat = computed(() => {
    const q = this.quill();
    const selection = this.currentSelection();
    if (!q || !selection) return {};
    return q.getFormat(selection);
  });
  protected readonly fontStyleLabel = computed(() => {
    switch (this.selectionFormat()['header'] + '' || 'normal') {
      case '1':
        return 'Heading 1';
      case '2':
        return 'Heading 2';
      case '3':
        return 'Heading 3';
      case '4':
        return 'Heading 4';
      case '5':
        return 'Heading 5';
      case '6':
        return 'Heading 6';
      case 'normal':
      default:
        return 'Normal';
    }
  });

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
    console.log(quill);
    return quill;
  });

  logFormat() {
    console.log(this.quill()?.getFormat());
  }

  constructor() {
    this.setupQuillEventListeners();

    effect(() => console.log('DBB is open', this.headerPopupOpen()));

    effect(() => {
      const q = this.quill();
      if (!q) return;
      console.log('DBB Setting', this.value());

      const selection = q.getSelection();

      q.clipboard.dangerouslyPasteHTML(this.value(), 'silent');

      if (selection) {
        const cursorPosition = Math.min(selection.index, q.getLength() - 1);

        q.setSelection(cursorPosition, selection.length, 'silent');
      }
    });
  }

  protected createTable(rows: number, cols: number) {
    const q = this.quill();
    if (!q) return;
    const tableModule = q.getModule(TableUp.moduleName) as any;
    // quill-table-up's programmatic insert API — check current version's
    // exact method name/signature, it varies between releases
    tableModule.insertTable?.(rows, cols);
  }

  protected toggleFormat(name: string) {
    const q = this.quill();
    if (!q) return;

    this.setFormat(name, !q.getFormat()[name]);
  }

  protected setFormat(name: string, value: unknown) {
    const q = this.quill();
    if (!q) return;

    q.format(name, value, 'silent');
    this.closeSelect();
  }

  protected closeSelect() {
    this.headerPopupOpen.set(false);
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
        'editor-change': () => {
          const selection = q.getSelection();
          this.currentSelection.set(selection);
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
