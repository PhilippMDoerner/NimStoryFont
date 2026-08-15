import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef, inject, model } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: '[resize-container]',
  imports: [CdkDrag, IconComponent],
  templateUrl: './resize-container.component.html',
  styleUrl: './resize-container.component.scss',
})
export class ResizeContainerComponent {
  private readonly hostElement =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly heightPx = model.required<number>();

  resizeContainer(event: CdkDragMove) {
    const yStart = this.hostElement.getBoundingClientRect().top;
    const newYEnd = event.pointerPosition.y;
    const newContentHeight = newYEnd - yStart;
    this.heightPx.set(newContentHeight);

    // We also need to undo the transform cdk applies, otherwise it shifts the handle away
    const handleElement = event.source.element.nativeElement;
    handleElement.style.transform = 'unset';
  }
}
