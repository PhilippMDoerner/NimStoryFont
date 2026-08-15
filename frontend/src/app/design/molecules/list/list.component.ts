import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  output,
  TemplateRef,
  viewChild,
  viewChildren,
} from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { NgbTooltip, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {
  combineLatest,
  debounceTime,
  fromEvent,
  map,
  merge,
  startWith,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { encodeKey, encodeKeyCombination } from '../../../_functions/keyMapper';
import { AriaText } from '../../../_models/aria';
import { HotkeyService, WatchOptions } from '../../../_services/hotkey.service';
import { Icon } from '../../atoms/_models/icon';
import { IconComponent } from '../../atoms/icon/icon.component';
import { ChildTemplateContext } from '../../organisms/focus-list/focus-list.component';

export interface ListEntry<T> {
  data: T;
  ariaText: AriaText;
  trackId: string | number;
}

export interface ListEntryTemplateContext<T> {
  data: T;
  isInFocus: boolean;
  index: number;
  first: boolean;
  last: boolean;
  entryLabelId: string;
}

@Component({
  selector: 'app-list',
  imports: [NgTemplateOutlet, AsyncPipe, NgbTooltipModule, IconComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [NgbTooltip],
  host: {
    tabindex: '-1',
    role: 'list',
    'aria-keyshortcuts': 'A',
  },
})
export class ListComponent<T> {
  private readonly hotkeyService = inject(HotkeyService);
  private readonly tooltip = inject(NgbTooltip);
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly entries = input.required<ListEntry<T>[]>();
  readonly arrowKeyNavigationOptions = input<
    Omit<WatchOptions, 'keyEventType' | 'eventSource'> | undefined
  >();
  readonly listItemClasses = input<string | string[]>('');

  readonly entryActivated = output<T>();

  readonly entryTemplate =
    contentChild.required<
      TemplateRef<{ $implicit: ListEntryTemplateContext<T> }>
    >('entryTemplate');

  readonly entryElements = viewChildren<ElementRef<HTMLDivElement>>('listItem');
  readonly tooltipContent =
    viewChild.required<TemplateRef<HTMLElement>>('tipContent');
  readonly hotkeyActionKeys = toSignal(
    combineLatest({
      nextEntryKeys: this.hotkeyService.getKeySequence('jump-to-next-entry'),
      priorEntryKeys: this.hotkeyService.getKeySequence('jump-to-prior-entry'),
    }),
  );
  readonly listItemClassStr = computed(() => {
    const classes = this.listItemClasses();
    const classList = Array.isArray(classes) ? classes : [classes];
    return classList.join(' ');
  });

  readonly focusIndex$ = toObservable(this.entryElements).pipe(
    switchMap((entries) => {
      const indexOnItemFocus$ = merge(
        ...entries.map((entry, index) =>
          fromEvent(entry.nativeElement, 'focusin').pipe(map(() => index)),
        ),
      );
      return indexOnItemFocus$;
    }),
    startWith(undefined),
  );
  readonly lastElementIndex = computed(() => this.entries().length - 1);
  readonly lastElementIndex$ = toObservable(this.lastElementIndex);
  readonly hotkeyText = computed(() => {
    const keys = this.hotkeyActionKeys();
    if (!keys) return undefined;

    const nextEntryKeyStr = encodeKeyCombination(keys.nextEntryKeys).replaceAll(
      ' ',
      '',
    );
    const priorEntryKeyStr = encodeKeyCombination(
      keys.priorEntryKeys,
    ).replaceAll(' ', '');
    return `${nextEntryKeyStr} ${priorEntryKeyStr}`;
  });
  readonly tooltipLines = computed<{ text: string; icon: Icon }[] | undefined>(
    () => {
      const keys = this.hotkeyActionKeys();
      if (!keys) return undefined;
      const nextEntryKeyStr = keys.nextEntryKeys
        .map((key) => encodeKey(key).replaceAll('+', ' + '))
        .join(' + ');
      const priorEntryKeyStr = keys.priorEntryKeys
        .map((key) => encodeKey(key).replaceAll('+', ' + '))
        .join(' + ');

      return [
        { text: nextEntryKeyStr, icon: 'arrow-down' },
        { text: priorEntryKeyStr, icon: 'arrow-up' },
      ];
    },
  );

  constructor() {
    this.setupTooltip();
    this.setupKeyboardNavigation();
  }

  private setupKeyboardNavigation() {
    const options$ = toObservable(this.arrowKeyNavigationOptions).pipe(
      map(
        (opt) =>
          ({
            ...opt,
            eventSource: this.host.nativeElement,
            keyEventType: 'keydown',
          }) satisfies WatchOptions,
      ),
    );
    const toNextEntryAction$ = options$.pipe(
      switchMap((options) =>
        this.hotkeyService.watchAction('jump-to-next-entry', options),
      ),
    );
    const arrowDown$ = options$.pipe(
      switchMap((options) => this.hotkeyService.watchKey('ArrowDown', options)),
      tap((event) => {
        event.preventDefault();
        event.stopPropagation();
      }),
    );
    const toNextEntry$ = merge(toNextEntryAction$, arrowDown$).pipe(
      map(() => 'jump-to-next-entry' as const),
    );

    const toPriorEntryAction$ = options$.pipe(
      switchMap((options) =>
        this.hotkeyService.watchAction('jump-to-prior-entry', options),
      ),
    );
    const arrowUp$ = options$.pipe(
      switchMap((options) => this.hotkeyService.watchKey('ArrowUp', options)),
      tap((event) => {
        event.preventDefault();
        event.stopPropagation();
      }),
    );
    const toPriorEntry$ = merge(toPriorEntryAction$, arrowUp$).pipe(
      map(() => 'jump-to-prior-entry' as const),
    );

    merge(toNextEntry$, toPriorEntry$)
      .pipe(
        withLatestFrom(this.focusIndex$, this.lastElementIndex$),
        map(([hotkeyAction, focusIndex, lastElementIndex]) =>
          this.toNextFocusIndex(hotkeyAction, focusIndex, lastElementIndex),
        ),
        map(
          (nextElementIndex) =>
            this.entryElements()?.[nextElementIndex]?.nativeElement,
        ),
        takeUntilDestroyed(),
      )
      .subscribe((nextElementToFocus) => nextElementToFocus?.focus());
  }

  private toNextFocusIndex(
    hotkeyAction: 'jump-to-next-entry' | 'jump-to-prior-entry',
    focusIndex: number | undefined,
    lastElementIndex: number,
  ): number {
    switch (hotkeyAction) {
      case 'jump-to-next-entry':
        switch (focusIndex) {
          case lastElementIndex:
            return lastElementIndex;
          case undefined:
            return 0;
          default:
            return focusIndex + 1;
        }
      case 'jump-to-prior-entry':
        switch (focusIndex) {
          case 0:
            return 0;
          case undefined:
            return lastElementIndex;
          default:
            return focusIndex - 1;
        }
    }
  }

  private setupTooltip(): void {
    this.tooltip.triggers = 'manual';
    effect(() => {
      const content = this.tooltipContent();
      if (!content) return;
      this.tooltip.ngbTooltip = content;
    });

    const isInFocus$ = merge(
      fromEvent(this.host.nativeElement, 'focus').pipe(map(() => true)),
      fromEvent(this.host.nativeElement, 'blur').pipe(map(() => false)),
      fromEvent(this.host.nativeElement, 'mouseover').pipe(map(() => true)),
      fromEvent(this.host.nativeElement, 'mouseout').pipe(map(() => false)),
    ).pipe(debounceTime(50));
    isInFocus$.pipe(takeUntilDestroyed()).subscribe((isInFocus) => {
      if (isInFocus) {
        this.tooltip.open();
      } else {
        this.tooltip.close();
      }
    });
  }
}

@Directive({
  selector: '[inferContextTypeFrom]',
})
export class ListItemContextTypecastDirective<T> {
  readonly inferContextTypeFrom = input.required<ListComponent<T>>();

  static ngTemplateContextGuard<T>(
    directive: ListItemContextTypecastDirective<T>,
    ctx: unknown,
  ): ctx is ChildTemplateContext<T> {
    return true;
  }
}
