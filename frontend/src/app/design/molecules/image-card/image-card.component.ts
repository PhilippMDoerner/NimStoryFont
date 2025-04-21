import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  debounceTime,
  filter,
  fromEvent,
  map,
  merge,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { componentId } from 'src/utils/DOM';
import { filterNil } from 'src/utils/rxjs-operators';
import { SpinnerComponent } from '../../atoms/spinner/spinner.component';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ButtonComponent,
    NgOptimizedImage,
    AsyncPipe,
    SpinnerComponent,
  ],
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

  imgElement = viewChild<ElementRef<HTMLImageElement>>('img');

  currentImageIndex = signal(0);
  currentImage = computed(
    () => this.imageUrls()[this.currentImageIndex()] ?? this.fallbackUrl(),
  );

  element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  selectorClicked$ = new Subject<{ index: number; event: MouseEvent }>();
  closeBtnClicked$ = new Subject<MouseEvent>();
  openBtnClicked$ = new Subject<MouseEvent>();
  inFocus = toSignal(
    merge(
      fromEvent<FocusEvent>(this.element, 'focusin').pipe(map(() => true)),
      fromEvent<FocusEvent>(this.element, 'focusout').pipe(
        filter((event) =>
          this.hasDataAttributeInTree(event, '[data-register-focus]'),
        ),
        map(() => false),
      ),
      fromEvent(this.element, 'mouseenter').pipe(map(() => true)),
      fromEvent(this.element, 'mouseleave').pipe(map(() => false)),
      fromEvent<MouseEvent>(this.element, 'click').pipe(
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

  isImageLoading$ = merge(
    toObservable(this.imgElement).pipe(
      filterNil(),
      switchMap((element) =>
        fromEvent(element.nativeElement, 'load').pipe(map(() => false)),
      ),
    ),
    toObservable(this.currentImageIndex).pipe(map(() => true)),
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
