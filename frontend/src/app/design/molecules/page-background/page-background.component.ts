import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'app-page-background',
    templateUrl: './page-background.component.html',
    styleUrls: ['./page-background.component.scss'],
    imports: []
})
export class PageBackgroundComponent {
  defaultImageUrl = '/assets/default_images/background_default.webp';

  imageUrl = input<string>();
  serverUrl = input.required<string>();

  currentImageUrl = computed(() => {
    const newPartialImageUrl = this.imageUrl() ?? this.defaultImageUrl;
    return `${this.serverUrl()}${newPartialImageUrl}`;
  });
}
