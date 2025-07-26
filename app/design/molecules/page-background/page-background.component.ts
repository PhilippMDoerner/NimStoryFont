import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'app-page-background',
  templateUrl: './page-background.component.html',
  styleUrls: ['./page-background.component.scss'],
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageBackgroundComponent {
  defaultImageUrl = 'assets/default_images/background_default.webp';

  imageUrl = input<string>();

  currentImageUrl = computed(() => this.imageUrl() ?? this.defaultImageUrl);
}
