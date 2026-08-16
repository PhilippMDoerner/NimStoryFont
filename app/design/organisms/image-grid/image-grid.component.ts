import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

type ColumnCount = 1 | 2 | 3;

export interface ImageGridEntry {
  icon: string | undefined;
  link: string;
  imageUrl: string | undefined;
  label: string;
  ariaLabel: string;
}

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss'],
  imports: [NgClass, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGridComponent {
  readonly EMPTY_IMAGE_URL = 'assets/general_overview.webp';

  readonly entries = input.required<ImageGridEntry[]>();

  readonly columnCount = computed<ColumnCount>(() => {
    switch (this.entries().length) {
      case 1:
        return 1;
      case 2:
      case 4:
        return 2;
      default:
        return 3;
    }
  });
}
