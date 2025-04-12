import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  NgbCarouselModule,
  NgbSlideEvent,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import { Image } from 'src/app/_models/image';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgbCarouselModule, NgbTooltip, ButtonComponent, NgTemplateOutlet],
})
export class ImageCarouselComponent {
  images = input.required<Image[]>();
  serverUrl = input.required<string>();
  canDelete = input<boolean>(false);
  canCreate = input<boolean>(false);
  canUpdate = input<boolean>(false);
  currentSlideIndex = input.required<number>();

  readonly deleteImage = output<Image>();
  readonly createImage = output<void>();
  readonly updateImage = output<Image>();
  readonly slide = output<{ event: NgbSlideEvent; index: number }>();
  readonly slideEnd = output<{ event: NgbSlideEvent; index: number }>();

  onSlide(event: NgbSlideEvent) {
    const slideIndexStr: string | undefined = event.current.split('-').pop();
    if (slideIndexStr == null) {
      throw `ImageCarousel - Image with id '${event.current}' does not match the expected pattern of 'imageIndex-<number>'!`;
    }

    const nextSlideIndex: number = parseInt(slideIndexStr);

    this.slide.emit({ event, index: nextSlideIndex });
  }

  onSlideEnd(event: NgbSlideEvent) {
    this.slide.emit({ event, index: this.currentSlideIndex() });
  }

  onImageCreate() {
    if (!this.canCreate()) {
      return;
    }

    this.createImage.emit();
  }

  onImageUpdate() {
    if (!this.canUpdate()) {
      return;
    }

    const image = this.images()[this.currentSlideIndex()];
    this.updateImage.emit(image);
  }

  onImageDelete() {
    if (!this.canDelete()) {
      return;
    }

    const image = this.images()[this.currentSlideIndex()];
    this.deleteImage.emit(image);
  }
}
