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
import { encodeKey, encodeKeyCombination } from 'src/app/_functions/keyMapper';
import { AriaText } from 'src/app/_models/aria';
import { HotkeyService, WatchOptions } from 'src/app/_services/hotkey.service';
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
    tabindex: '0',
    role: 'list',
    'aria-keyshortcuts': 'A',
  },
})
export class ListComponent<T> {
  private shortcutService = inject(HotkeyService);
  private tooltip = inject(NgbTooltip);
  private host = inject(ElementRef<HTMLElement>);

  entries = input.required<ListEntry<T>[]>();
  arrowKeyNavigationOptions = input<
    Omit<WatchOptions, 'keyEventType' | 'eventSource'> | undefined
  >();
  listItemClasses = input<string | string[]>('');

  entryActivated = output<T>();

  entryTemplate =
    contentChild.required<
      TemplateRef<{ $implicit: ListEntryTemplateContext<T> }>
    >('entryTemplate');

  entryElements = viewChildren<ElementRef<HTMLDivElement>>('listItem');
  tooltipContent = viewChild.required<TemplateRef<HTMLElement>>('tipContent');
  shortcutActionKeys = toSignal(
    combineLatest({
      nextEntryKeys: this.shortcutService.getKeySequence('jump-to-next-entry'),
      priorEntryKeys: this.shortcutService.getKeySequence(
        'jump-to-prior-entry',
      ),
    }),
  );
  listItemClassStr = computed(() => {
    const classes = this.listItemClasses();
    const classList = Array.isArray(classes) ? classes : [classes];
    return classList.join(' ');
  });

  focusIndex$ = toObservable(this.entryElements).pipe(
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
  lastElementIndex = computed(() => this.entries().length - 1);
  lastElementIndex$ = toObservable(this.lastElementIndex);
  shortcutText = computed(() => {
    const keys = this.shortcutActionKeys();
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
  tooltipLines = computed<{ text: string; icon: Icon }[] | undefined>(() => {
    const keys = this.shortcutActionKeys();
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
  });

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
        this.shortcutService.watchAction('jump-to-next-entry', options),
      ),
    );
    const arrowDown$ = options$.pipe(
      switchMap((options) =>
        this.shortcutService.watchKey('ArrowDown', options),
      ),
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
        this.shortcutService.watchAction('jump-to-prior-entry', options),
      ),
    );
    const arrowUp$ = options$.pipe(
      switchMap((options) => this.shortcutService.watchKey('ArrowUp', options)),
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
        map(([shortcutAction, focusIndex, lastElementIndex]) =>
          this.toNextFocusIndex(shortcutAction, focusIndex, lastElementIndex),
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
    shortcutAction: 'jump-to-next-entry' | 'jump-to-prior-entry',
    focusIndex: number | undefined,
    lastElementIndex: number,
  ): number {
    switch (shortcutAction) {
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
  inferContextTypeFrom = input.required<ListComponent<T>>();

  static ngTemplateContextGuard<T>(
    directive: ListItemContextTypecastDirective<T>,
    ctx: unknown,
  ): ctx is ChildTemplateContext<T> {
    return true;
  }
}
