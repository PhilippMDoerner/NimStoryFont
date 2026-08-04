import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { CardComponent } from '../../atoms/card/card.component';
import { MenuItem } from '../../molecules/_models/menu';
import { ContextMenuComponent } from '../../molecules/context-menu/context-menu.component';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgbCarouselModule,
    NgbTooltip,
    ButtonComponent,
    NgTemplateOutlet,
    CardComponent,
    ContextMenuComponent,
  ],
})
export class ImageCarouselComponent {
  readonly images = input.required<Image[]>();
  readonly serverUrl = input.required<string>();
  readonly canDelete = input<boolean>(false);
  readonly canCreate = input<boolean>(false);
  readonly canUpdate = input<boolean>(false);
  readonly currentSlideIndex = input.required<number>();

  readonly deleteImage = output<Image>();
  readonly createImage = output<void>();
  readonly updateImage = output<Image>();
  readonly slide = output<{ event: NgbSlideEvent; index: number }>();
  readonly slideEnd = output<{ event: NgbSlideEvent; index: number }>();

  protected readonly contextActions = computed<MenuItem[]>(() => {
    const hasImages = this.images()?.length > 0;
    const showCreateEntry = this.canCreate();
    const showDeleteEntry = this.canDelete() && hasImages;
    const showUpdateEntry = this.canUpdate() && hasImages;

    const result: MenuItem[] = [];

    if (showCreateEntry) {
      result.push({
        kind: 'BUTTON',
        actionName: 'create-image-requested',
        label: 'Create Image',
        icon: 'plus-square',
      });
    }

    if (showUpdateEntry) {
      result.push({
        kind: 'BUTTON',
        actionName: 'update-image-requested',
        label: 'Update Image',
        icon: 'pencil',
      });
    }

    if (showDeleteEntry) {
      result.push({
        kind: 'BUTTON',
        actionName: 'delete-image-requested',
        label: 'Delete Image',
        icon: 'trash',
      });
    }

    return result;
  });
  protected readonly showContextMenu = computed<boolean>(
    () => this.contextActions().length > 0,
  );

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
