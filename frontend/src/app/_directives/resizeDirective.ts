import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
@Directive({
  standalone: true,
  selector: '[resizeListener]',
})
export class ResizeDirective<T extends HTMLElement>
  implements OnInit, OnDestroy
{
  readonly listenTo = input.required<'FIRST' | 'LAST' | 'ALL'>();
  readonly resized = output<ResizeObserverEntry>();

  private readonly element = inject(ElementRef<T>);

  readonly observer = new ResizeObserver((entries) => {
    if (entries.length === 0) return;

    switch (this.listenTo()) {
      case 'FIRST':
        this.resized.emit(entries[0]);
        break;
      case 'LAST': {
        const lastIndex = entries.length - 1;
        this.resized.emit(entries[lastIndex]);
        break;
      }
      case 'ALL':
        entries.forEach((entry) => this.resized.emit(entry));
        break;
    }
  });

  ngOnInit(): void {
    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
