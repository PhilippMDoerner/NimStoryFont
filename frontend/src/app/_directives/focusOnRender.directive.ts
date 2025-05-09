import { afterNextRender, Directive, ElementRef, input } from '@angular/core';

@Directive({
  selector: '[focusOnRender]',
  standalone: true,
})
export class FocusOnRender {
  focusOnRender = input<boolean>(true);

  constructor(public elementRef: ElementRef<HTMLElement>) {
    afterNextRender(() => {
      if (!this.focusOnRender()) return;
      elementRef.nativeElement.focus();
    });
  }
}
