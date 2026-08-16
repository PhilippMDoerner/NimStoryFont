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
  readonly defaultImageUrl = 'assets/default_images/background_default.webp';

  readonly imageUrl = input<string>();

  readonly currentImageUrl = computed(() => this.imageUrl() ?? this.defaultImageUrl);
}
