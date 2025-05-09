import { Directive, ElementRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, map, Observable, switchMap } from 'rxjs';

type ViewType = 'viewport' | 'element';

@Directive({
  standalone: true,
  selector: '[visibility]',
})
export class VisibilityDirective {
  observedElements = input.required<HTMLElement[]>();
  threshold = input<number | number[]>(0.5);
  relativeTo = input<ViewType>('viewport');
  rootMargin = input<string>('0px');

  intersected = output<IntersectionObserverEntry>();

  private element = inject(ElementRef<HTMLElement>);

  private observerConfig$: Observable<IntersectionObserverInit> = combineLatest(
    {
      threshold: toObservable(this.threshold),
      relativeTo: toObservable(this.relativeTo),
      rootMargin: toObservable(this.rootMargin),
    },
  ).pipe(
    map((config) => ({
      threshold: config.threshold,
      root: this.toRoot(config.relativeTo),
      rootMargin: config.rootMargin,
    })),
  );

  constructor() {
    combineLatest({
      config: this.observerConfig$,
      elements: toObservable(this.observedElements),
    })
      .pipe(
        switchMap(({ config, elements }) => observeElements(elements, config)),
        takeUntilDestroyed(),
      )
      .subscribe((element) => this.intersected.emit(element));
  }

  private toRoot(relativeTo: ViewType) {
    switch (relativeTo) {
      case 'viewport':
        return null;
      case 'element':
        return this.element.nativeElement;
    }
  }
}

function observeElements(
  elements: readonly HTMLElement[],
  initOptions: IntersectionObserverInit,
) {
  return new Observable<IntersectionObserverEntry>((subscriber) => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => subscriber.next(entry)),
      initOptions,
    );

    elements.forEach((el) => observer.observe(el));

    subscriber.add(() => observer.disconnect());
  });
}
