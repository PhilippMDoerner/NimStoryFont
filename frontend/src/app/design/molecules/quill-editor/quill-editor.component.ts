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
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import Quill, { Range } from 'quill';
import TableUp from 'quill-table-up';
import E from 'quill/core/emitter';
import { combineLatest, filter, map, take } from 'rxjs';
import { HOTKEY_IGNORE_ATTR } from '../../../../app/_models/hotkey';
import { QUILL_SETTINGS } from '../../../../app/app.constants';
import { componentId } from '../../../../utils/DOM';
import { takeOnceOrUntilDestroyed } from '../../../../utils/rxjs-operators';
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
  private readonly destroyRef = inject(DestroyRef);
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
  readonly id = input.required<string>();
  readonly labelId = input.required<string>();
  readonly describedById = input<string>();
  readonly readOnly = input<boolean>(false);

  public readonly inputChanged = output<string>();

  private readonly compoId = componentId();
  protected readonly toolbarId = `${this.compoId}-toolbar`;
  protected readonly headingLabelId = `${this.compoId}-heading-select-label`;
  private readonly currentSelection = signal<Range | null>(null);
  protected readonly headerPopupOpen = signal<boolean>(false);

  private readonly quillConfig$ = toObservable(this.toolbar).pipe(
    filter((el) => el?.nativeElement != null),
    map((elRef) => ({
      ...QUILL_SETTINGS,
      modules: { ...QUILL_SETTINGS.modules, toolbar: elRef.nativeElement },
    })),
    take(1),
  );
  private readonly quill$ = combineLatest({
    config: this.quillConfig$,
    containerEl: toObservable(this.container),
  }).pipe(
    filter(
      ({ config, containerEl }) =>
        config != null && containerEl?.nativeElement != null,
    ),
    take(1),
    map(({ config, containerEl }) => {
      const quill = new Quill(containerEl.nativeElement, config);
      quill.root.role = 'textbox';
      quill.root.ariaMultiLine = 'true';
      return quill;
    }),
  );
  public readonly quill = toSignal(this.quill$);

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

  logFormat() {
    console.log(this.quill()?.getFormat());
  }

  constructor() {
    this.setupQuillEventListeners();
    this.setupForwardValueToEditorOnChangeAndMaintainCursorPosition();
    this.setupSyncReadonly();
    this.setupSyncId();
  }

  public focus() {
    this.quill$
      .pipe(takeOnceOrUntilDestroyed(this.destroyRef))
      .subscribe((q) => q.focus());
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

  protected undo() {
    const q = this.quill();
    if (!q) return;

    q.history.undo();
  }

  protected redo() {
    const q = this.quill();
    if (!q) return;

    q.history.redo();
  }

  private setupQuillEventListeners() {
    effect(() => {
      const q = this.quill();
      if (!q) return;

      const eventListeners = {
        // text-change fires on any text change, but not when format changes (e.g. adding an indent)
        'text-change': () => this.emitValue(q),
        // editor-change fires when format changes (e.g. when adding an indent), but not when text changes
        'editor-change': () => {
          this.currentSelection.set(q.getSelection());
          this.emitValue(q);
        },
        'selection-change': () => {
          this.currentSelection.set(q.getSelection());
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
    const newValue = quill.root.innerHTML ?? '';
    this.inputChanged.emit(newValue);
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

  private setupSyncReadonly() {
    effect(() => {
      const q = this.quill();
      if (this.readOnly()) {
        q?.disable();
      } else {
        q?.enable();
      }
    });
  }

  private setupSyncId() {
    effect(() => {
      const q = this.quill();
      if (!q) return;
      q.root.id = this.id();
      q.root.setAttribute('aria-labelledby', this.labelId());

      const descriptorId = this.describedById();
      if (descriptorId) {
        q.root.setAttribute('aria-describedby', descriptorId);
      }
    });
  }
}
