import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  debounceTime,
  filter,
  fromEvent,
  map,
  merge,
  startWith,
  Subject,
} from 'rxjs';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { componentId } from 'src/utils/DOM';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ButtonComponent, NgOptimizedImage],
  host: {
    '[class.card--active]': 'inFocus()',
  },
})
export class ImageCardComponent {
  serverUrl = input.required<string>();
  fallbackUrl = input<string>();
  imageUrls = input.required({
    transform: (value: string | string[]): string[] => {
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    },
  });
  link = input<string>();
  text = input.required<string>();
  alt = input.required<string>();

  currentImageIndex = signal(0);
  currentImage = computed(
    () => this.imageUrls()[this.currentImageIndex()] ?? this.fallbackUrl(),
  );

  elementRef = inject(ElementRef);

  selectorClicked$ = new Subject<{ index: number; event: MouseEvent }>();
  closeBtnClicked$ = new Subject<MouseEvent>();
  openBtnClicked$ = new Subject<MouseEvent>();
  inFocus = toSignal(
    merge(
      fromEvent<FocusEvent>(this.elementRef.nativeElement, 'focusin').pipe(
        map(() => true),
      ),
      fromEvent<FocusEvent>(this.elementRef.nativeElement, 'focusout').pipe(
        filter((event) =>
          this.hasDataAttributeInTree(event, '[data-register-focus]'),
        ),
        map(() => false),
      ),
      fromEvent(this.elementRef.nativeElement, 'mouseenter').pipe(
        map(() => true),
      ),
      fromEvent(this.elementRef.nativeElement, 'mouseleave').pipe(
        map(() => false),
      ),
      fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click').pipe(
        filter(
          (event: MouseEvent) =>
            !this.hasDataAttributeInTree(event, '[data-ignore-click]'),
        ),
        map(() => true),
      ),
      this.selectorClicked$.pipe(map(() => true)),
      this.openBtnClicked$.pipe(map(() => true)),
      this.closeBtnClicked$.pipe(map(() => false)),
    ).pipe(debounceTime(50), startWith(false)),
  );

  id = componentId();
  imageId = `image-${this.id}`;

  constructor() {
    this.selectorClicked$
      .pipe(takeUntilDestroyed())
      .subscribe(({ event, index }) => this.onSelectorClick(index, event));
  }

  private onSelectorClick(newIndex: number, event: Event) {
    this.currentImageIndex.set(newIndex);
    event.preventDefault();
  }

  private hasDataAttributeInTree(event: Event, attr: string) {
    const target = event.target;
    const isElement = target instanceof Element;
    if (!isElement) return true;

    const hasAttributeInTree = target.closest(attr) != null;
    return hasAttributeInTree;
  }
}
