import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable } from '@angular/core';
import { GlobalStore } from 'src/app/global.store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FaviconService {
  private readonly serverUrl = environment.backendDomain;
  private readonly FAVICON_ELEMENT_ID = 'favicon';
  private readonly DEFAULT_FAVICON = '/assets/icons/icon-72x72.png';
  private readonly document = inject(DOCUMENT);
  private readonly defaultTitle: string = environment.defaultTitle;
  private readonly globalStore = inject(GlobalStore);

  constructor() {
    effect(() => {
      const newFavicon = this.globalStore.currentCampaign()?.icon;
      const newFaviconUrl = newFavicon
        ? `${this.serverUrl}${newFavicon}`
        : undefined;
      this.updateFavicon(newFaviconUrl);
    });
  }

  private updateFavicon(newFaviconUrl: string | undefined): void {
    const isInBrowser = !!this.document;
    if (!isInBrowser) return;

    const faviconElement = this.document.querySelector<HTMLLinkElement>(
      `#${this.FAVICON_ELEMENT_ID}`,
    );
    if (!faviconElement) return;
    faviconElement.href = newFaviconUrl ?? this.DEFAULT_FAVICON;
  }
}
