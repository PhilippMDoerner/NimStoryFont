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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import Quill, { QuillOptions, Range } from 'quill';
import TableUp from 'quill-table-up';
import E from 'quill/core/emitter';
import { debounceTime, Subject } from 'rxjs';
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
  protected readonly FONT_STYLE_LABEL_MAP: Record<string, string> & {
    normal: string;
  } = {
    '1': 'Heading 1',
    '2': 'Heading 2',
    '3': 'Heading 3',
    '4': 'Heading 4',
    '5': 'Heading 5',
    '6': 'Heading 6',
    normal: 'Text',
    '': 'Text',
  };

  private readonly container =
    viewChild.required<ElementRef<HTMLElement>>('editor');
  private readonly toolbar =
    viewChild.required<ElementRef<HTMLElement>>('toolbar');

  readonly value = input.required<string>();
  readonly readOnly = input<boolean>(false);

  public readonly inputChanged = output<string>();

  private readonly changeEvent$ = new Subject<string>();
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
    const key = this.selectionFormat()['header'] + '' || 'normal';
    return this.FONT_STYLE_LABEL_MAP[key] ?? this.FONT_STYLE_LABEL_MAP.normal;
  });

  protected readonly textOptions = [
    { formatValue: '', optionValue: 'normal' },
    ...[1, 2, 3, 4, 5, 6].map((val) => ({
      formatValue: val.toString(),
      optionValue: val.toString(),
    })),
  ];

  private quillConfig = computed<QuillOptions>(() => ({
    ...QUILL_SETTINGS,
    readOnly: this.readOnly(),
    modules: {
      ...QUILL_SETTINGS.modules,
      toolbar: this.toolbar().nativeElement,
      keyboard: {
        bindings: {
          tab: false,
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
    this.setupOutputDebounce();
    this.setupForwardValueToEditorOnChangeAndMaintainCursorPosition();
  }

  protected createTable(rows: number, cols: number) {
    const q = this.quill();
    if (!q) return;

    const tableModule = q.getModule(TableUp.moduleName);
    const hasInsertFunction =
      tableModule != null &&
      typeof tableModule === 'object' &&
      'insertTable' in tableModule &&
      typeof tableModule.insertTable === 'function';
    if (!hasInsertFunction) return;

    (tableModule.insertTable as Function)?.(rows, cols);
  }

  protected toggleFormat(name: string) {
    const q = this.quill();
    if (!q) return;

    this.setFormat(name, !q.getFormat()[name]);
  }

  protected toggleFormatValue(name: string, value: string) {
    const q = this.quill();
    if (!q) return;

    const currentValue = q.getFormat()[name];
    const isCurrentlyToggledOn = currentValue === value;
    const nextValue = isCurrentlyToggledOn ? '' : value;
    this.setFormat(name, nextValue);
  }

  protected changeIndent(delta: number) {
    const q = this.quill();
    if (!q) return;

    const currentIndent = q.getFormat()['indent'] ?? 0;
    if (typeof currentIndent !== 'number') return;

    this.setFormat('indent', currentIndent + delta);
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
        // text-change fires on any text change, but not when format changes (e.g. adding an indent)
        'text-change': () => {
          this.emitValue(q);
          console.log('DBB text change');
        },
        // editor-change fires when format changes (e.g. when adding an indent), but not when text changes
        'editor-change': () => {
          console.log('DBB editor change', q.root.innerHTML);
          this.emitValue(q);
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

  private emitValue(quill: Quill) {
    const value = quill.root.innerHTML ?? '';
    this.changeEvent$.next(value);
  }

  private setupOutputDebounce() {
    this.changeEvent$
      .pipe(debounceTime(10), takeUntilDestroyed())
      .subscribe((value) => this.inputChanged.emit(value));
  }

  private setupForwardValueToEditorOnChangeAndMaintainCursorPosition() {
    effect(() => {
      const q = this.quill();
      if (!q) return;

      const selection = q.getSelection();

      q.clipboard.dangerouslyPasteHTML(this.value(), 'silent');

      if (selection) {
        const cursorPosition = Math.min(selection.index, q.getLength() - 1);

        q.setSelection(cursorPosition, selection.length, 'silent');
      }
    });
  }
}
