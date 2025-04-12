import {
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { filter, map, of, switchMap, tap } from 'rxjs';
import { capitalize } from 'src/utils/string';
import {
  BindableHotkey,
  HotkeyService,
  UNBINDABLE_KEYSET,
} from '../_services/hotkey.service';
import { ScreenService } from '../_services/screen.service';

export type TooltipBehavior = 'OnHotkey' | 'Always' | 'Never';

@Directive({
  selector: '[hotkey]',
  providers: [NgbTooltip],
  host: {
    '[attr.aria-keyshortcuts]': 'shortcutText()',
  },
})
export class HotkeyDirective {
  private tooltip = inject(NgbTooltip);
  private hotkeyService = inject(HotkeyService);
  public element = inject(ElementRef<HTMLElement>);

  hotkey = input.required<string | undefined>();
  disabledHotkey = input<boolean>(false);
  hotkeyDescription = input<string>();

  hotkeyPressed = output<{ event: KeyboardEvent; host: HTMLElement }>();

  private shortcutText = computed(() => {
    const hotkey = this.hotkey();
    if (!hotkey) return undefined;
    return `Alt+${capitalize(hotkey)}`;
  });
  private tooltipText = computed(() => {
    const hotkey = this.hotkey();
    if (!hotkey) return undefined;

    const hotkeyCombo = `Alt + ${hotkey.toUpperCase()}`;
    const hotkeyDescription = this.hotkeyDescription();
    if (!hotkeyDescription) return hotkeyCombo;

    return `${hotkeyCombo}: ${hotkeyDescription}`;
  });

  constructor() {
    if (inject(ScreenService).isMobile()) return;

    this.configureTooltip(this.element);

    toObservable(this.disabledHotkey)
      .pipe(
        switchMap((isDisabled) => {
          if (isDisabled) return of(false);

          return this.hotkeyService.isHotkeyModifierPressed$ ?? of(false);
        }),
        takeUntilDestroyed(),
      )
      .subscribe((showTooltip) => this.syncTooltipOpenState(showTooltip));

    toObservable(this.hotkey)
      .pipe(
        map((key) => this.checkKey(key)),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        switchMap((key: BindableHotkey<any> | undefined) =>
          this.hotkeyService.watch(key).pipe(
            filter(() => !this.disabledHotkey()),
            tap((event) =>
              this.hotkeyPressed.emit({
                event,
                host: this.element.nativeElement,
              }),
            ),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe();

    toObservable(this.tooltipText)
      .pipe(takeUntilDestroyed())
      .subscribe((tooltipText) => (this.tooltip.ngbTooltip = tooltipText));
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private checkKey(key: string | undefined): BindableHotkey<any> | undefined {
    if (!key) return undefined;

    const canBindHotkey = !UNBINDABLE_KEYSET.has(key);
    if (!canBindHotkey) {
      throw new Error(`Tried to bind unbindable hotkey ${key}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return key as BindableHotkey<any>;
  }
}
