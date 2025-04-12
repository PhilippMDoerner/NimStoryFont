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
  listenTo = input.required<'FIRST' | 'LAST' | 'ALL'>();
  resized = output<ResizeObserverEntry>();

  private element = inject(ElementRef<T>);

  observer = new ResizeObserver((entries) => {
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
