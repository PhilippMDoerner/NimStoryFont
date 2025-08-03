import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
  fromEvent,
  map,
  merge,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { filterNil } from 'src/utils/rxjs-operators';
import { IconComponent } from '../../atoms/icon/icon.component';
import { Toggle } from '../_models/toggle';

@Component({
  selector: 'app-toggle-row',
  imports: [IconComponent, AsyncPipe],
  templateUrl: './toggle-row.component.html',
  styleUrl: './toggle-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
  },
})
export class ToggleRowComponent<T> {
  host = inject(ElementRef).nativeElement;

  toggles = input.required<Toggle<T>[]>();

  activated = output<Toggle<T>>();

  toggleElements = viewChildren<ElementRef<HTMLElement>>('toggle');

  focusIndex$ = toObservable(this.toggleElements).pipe(
    switchMap((entries) => {
      const indexOnItemFocus$ = merge(
        ...entries.map((entry, index) =>
          fromEvent(entry.nativeElement, 'focusin').pipe(map(() => index)),
        ),
      );

      return indexOnItemFocus$;
    }),
    startWith(0),
  );

  constructor() {
    const key$ = fromEvent<KeyboardEvent>(this.host, 'keydown');

    key$
      .pipe(
        map((event) => event.key),
        withLatestFrom(this.focusIndex$),
        map(([key, currentFocusIndex]) => {
          switch (key) {
            case 'ArrowRight':
            case 'ArrowDown':
              const maxIndex = this.toggles.length - 1;
              return currentFocusIndex === maxIndex
                ? maxIndex
                : currentFocusIndex + 1;
            case 'ArrowLeft':
            case 'ArrowUp':
              return currentFocusIndex === 0 ? 0 : currentFocusIndex - 1;
            default:
              return undefined;
          }
        }),
        filterNil(),
        takeUntilDestroyed(),
      )
      .subscribe((newFocusIndex) =>
        this.toggleElements()[newFocusIndex]?.nativeElement.focus(),
      );
  }

  togglesChanged(active: boolean, index: number) {
    const newToggles = [...this.toggles()];
    const updatedToggle = { ...newToggles[index], active };

    this.activated.emit(updatedToggle);
  }
}
