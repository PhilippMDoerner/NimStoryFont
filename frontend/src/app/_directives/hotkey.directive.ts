import {
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import {
  combineLatest,
  EMPTY,
  filter,
  map,
  of,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { debugLog } from 'src/utils/rxjs-operators';
import { encodeKeyCombination } from '../_functions/keyMapper';
import { ShortcutAction } from '../_models/hotkey';
import { HotkeyService, WatchOptions } from '../_services/hotkey.service';
import { ScreenService } from '../_services/screen.service';

export type TooltipBehavior = 'OnHotkey' | 'Always' | 'Never';
type DirectiveWatchOptions = Omit<WatchOptions, 'eventSource'> & {
  useGlobalEventSource?: boolean;
};

@Directive({
  selector: '[hotkeyAction]',
  providers: [NgbTooltip],
  host: {
    '[attr.aria-keyshortcuts]': 'ariaShortcutText()',
  },
})
export class HotkeyDirective {
  private tooltip = inject(NgbTooltip);
  private hotkeyService = inject(HotkeyService);
  private modalService = inject(NgbModal);
  public element = inject(ElementRef<HTMLElement>);

  hotkeyAction = input.required<ShortcutAction | undefined>();
  watchOptions = input<DirectiveWatchOptions>({
    isModalAction: false,
    suppressEvent: false,
  });
  actionDisabled = input<boolean>(false);
  description = input<string>();

  actionTriggered = output<{ host: HTMLElement }>();

  private watchOptions$ = toObservable(this.watchOptions).pipe(
    map(
      (options) =>
        ({
          isModalAction: false,
          suppressEvent: false,
          eventSource: options.useGlobalEventSource
            ? undefined // Use default event source
            : this.element.nativeElement,
          ...options,
        }) as WatchOptions,
    ),
  );
  private hotkeyCombination$ = toObservable(this.hotkeyAction).pipe(
    switchMap((action) => {
      if (!action) return of(undefined);
      return this.hotkeyService.getKeySequence(action);
    }),
  );
  ariaShortcutText = toSignal(
    combineLatest({
      combo: this.hotkeyCombination$,
      watchOptions: this.watchOptions$,
    }).pipe(
      map(({ combo, watchOptions }) => {
        if (!combo) return undefined;
        const comboStr = encodeKeyCombination(combo, true);
        const isLocalAction = !!watchOptions.eventSource;
        return `${comboStr}${isLocalAction ? '(Active on focus)' : ''}`;
      }),
    ),
  );
  private hotkeyCombination = toSignal(this.hotkeyCombination$);

  private tooltipText = computed(() => {
    const hotkeyCombo = this.hotkeyCombination();
    if (!hotkeyCombo) return undefined;

    const comboStr = encodeKeyCombination(hotkeyCombo, true);

    const hotkeyDescription = this.description();
    if (!hotkeyDescription) return comboStr;

    return `${comboStr}: ${hotkeyDescription}`;
  });

  constructor() {
    if (inject(ScreenService).isMobile()) return;

    this.configureTooltip(this.element);
    this.keepTooltipInSync();
    const isDisabled$ = toObservable(this.actionDisabled).pipe(
      startWith(false),
    );

    combineLatest({
      action: toObservable(this.hotkeyAction),
      watchOptions: this.watchOptions$,
    })
      .pipe(
        switchMap(({ action, watchOptions }) =>
          action ? this.hotkeyService.watchAction(action, watchOptions) : EMPTY,
        ),
        withLatestFrom(isDisabled$, this.watchOptions$),
        filter(([, isDisabled, watchOptions]) => {
          if (isDisabled) return false;
          const hasOpenModals = this.modalService.hasOpenModals();
          const canSeeActionInOpenModal =
            hasOpenModals && !!watchOptions.isModalAction;
          return !hasOpenModals || canSeeActionInOpenModal;
        }),
        debugLog('Emitting Hotkey'),
        takeUntilDestroyed(),
      )
      .subscribe(() =>
        this.actionTriggered.emit({
          host: this.element.nativeElement,
        }),
      );
  }

  private configureTooltip(element: ElementRef<HTMLElement>) {
    this.tooltip.triggers = '';
    this.tooltip.tooltipClass = 'z-1001';
    this.tooltip.positionTarget = element.nativeElement;
  }

  private syncTooltipOpenState(showTooltip: boolean) {
    if (showTooltip) {
      this.tooltip.open();
    } else {
      this.tooltip.close();
    }
  }

  private keepTooltipInSync() {
    combineLatest({
      action: toObservable(this.hotkeyAction),
      watchOptions: this.watchOptions$,
      isDisabled: toObservable(this.actionDisabled),
    })
      .pipe(
        switchMap(({ action, watchOptions, isDisabled }) => {
          if (isDisabled || !action) return of(false);
          return this.hotkeyService.hasVisibleTooltip(
            watchOptions.isModalAction,
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe((showTooltip) => this.syncTooltipOpenState(showTooltip));

    toObservable(this.tooltipText)
      .pipe(takeUntilDestroyed())
      .subscribe((tooltipText) => (this.tooltip.ngbTooltip = tooltipText));
  }
}
