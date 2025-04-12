import { afterNextRender, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[focusOnRender]',
  standalone: true,
})
export class FocusOnRender {
  constructor(public elementRef: ElementRef<HTMLElement>) {
    afterNextRender(() => elementRef.nativeElement.focus());
  }
}
