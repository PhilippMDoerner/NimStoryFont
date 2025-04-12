import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  Directive,
  ElementRef,
  inject,
  input,
  Signal,
  TemplateRef,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  scan,
  share,
  Subject,
  withLatestFrom,
} from 'rxjs';
import { HotkeyService } from 'src/app/_services/hotkey.service';
import { getFirstFocusableChild } from 'src/utils/DOM';
import { filterNil } from 'src/utils/rxjs-operators';

export interface FocusItem<T> {
  id: number;
  data: T;
}

@Component({
  selector: 'app-focus-list',
  imports: [NgTemplateOutlet, AsyncPipe],
  templateUrl: './focus-list.component.html',
  styleUrl: './focus-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FocusListComponent<T> {
  entries = input.required<FocusItem<T>[]>();
  disableHotkeyNavigation = input(false);

  itemTemplate =
    contentChild.required<
      TemplateRef<{ $implicit: { data: T; index: number } }>
    >('itemTemplate');
  separatorTemplate =
    contentChild<TemplateRef<{ $implicit: { data: T; index: number } }>>(
      'separator',
    );

  private readonly hotkeyService = inject(HotkeyService);
  itemContainers: Signal<readonly ElementRef<HTMLDivElement>[]> =
    viewChildren('itemContainer');
  focusItemEvent$ = new Subject<number>();
  private arrowEvents$ = merge(
    this.hotkeyService
      .watch('ArrowDown')
      .pipe(map(() => ({ type: 'down' }) as const)),
    this.hotkeyService
      .watch('ArrowUp')
      .pipe(map(() => ({ type: 'up' }) as const)),
  );
  focusIndex$ = this.deriveFocusItemIndex();

  constructor() {
    this.scrollAndFocusOnArrowNavigation(
      this.focusIndex$,
      toObservable(this.itemContainers),
      toObservable(this.disableHotkeyNavigation),
    );
  }

  private deriveFocusItemIndex(): Observable<number | undefined> {
    const lastItemIndex = computed(() => this.entries().length);

    const focusEvents$ = this.focusItemEvent$.pipe(
      map((index) => ({ type: 'selection', nextIndex: index }) as const),
    );

    const focusIndex$ = merge(this.arrowEvents$, focusEvents$).pipe(
      withLatestFrom(toObservable(lastItemIndex)),
      scan(
        (priorFocusIndex, [event, lastItemIndex]) => {
          const firstItemIndex = 0;
          let isNextIndexOutOfBounds = false;
          switch (event.type) {
            case 'down':
              if (priorFocusIndex == null) return firstItemIndex;
              isNextIndexOutOfBounds = priorFocusIndex + 1 > lastItemIndex;
              if (isNextIndexOutOfBounds) return lastItemIndex;
              return priorFocusIndex + 1;
            case 'up':
              if (priorFocusIndex == null) return lastItemIndex;
              isNextIndexOutOfBounds = priorFocusIndex - 1 < firstItemIndex;
              if (isNextIndexOutOfBounds) return firstItemIndex;
              return priorFocusIndex - 1;
            case 'selection':
              return event.nextIndex;
          }
        },
        undefined as number | undefined,
      ),
      share(),
    );

    return focusIndex$;
  }

  private scrollAndFocusOnArrowNavigation(
    focusIndex$: Observable<number | undefined>,
    itemContainers$: Observable<readonly ElementRef<HTMLDivElement>[]>,
    disableHotkeyNavigation$: Observable<boolean>,
  ): void {
    const itemWithFocus = combineLatest({
      focusIndex: focusIndex$,
      itemContainers: itemContainers$,
    }).pipe(
      filter(({ focusIndex }) => focusIndex != null),
      map(
        ({ focusIndex, itemContainers }): HTMLDivElement | undefined =>
          itemContainers[focusIndex as number]?.nativeElement,
      ),
    );

    this.arrowEvents$
      .pipe(
        withLatestFrom(disableHotkeyNavigation$),
        filter(([, disableHotkeyNavigation]) => !disableHotkeyNavigation),
        withLatestFrom(itemWithFocus),
        map(([, itemWithFocus]) => itemWithFocus),
        filterNil(),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((itemWithFocus) => {
        itemWithFocus.scrollIntoView({ behavior: 'smooth', block: 'start' });

        const elementToFocus =
          getFirstFocusableChild(itemWithFocus) ?? itemWithFocus;
        elementToFocus.focus();
      });
  }
}

export interface ContextValue<T> {
  data: T;
  index: number;
  first: boolean;
  last: boolean;
  isInFocus: boolean;
}

export interface ChildTemplateContext<T> {
  $implicit: ContextValue<T>;
}

@Directive({
  selector: '[inferContextTypeFrom]',
})
export class FocusListContextTypecastDirective<T> {
  inferContextTypeFrom = input.required<FocusListComponent<T>>();

  static ngTemplateContextGuard<T>(
    directive: FocusListContextTypecastDirective<T>,
    ctx: unknown,
  ): ctx is ChildTemplateContext<T> {
    return true;
  }
}
