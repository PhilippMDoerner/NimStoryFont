import { DestroyRef, inject, Injectable } from '@angular/core';
import { combineLatest, map, ReplaySubject } from 'rxjs';
import { OnlineService } from './online.service';

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt handler
 * before a user is prompted to "install" a web site to a home screen on mobile.
 *
 * @deprecated Only supported on Chrome and Android Webview.
 */
export interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: string[];

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly onlineService = inject(OnlineService);

  private installEvent: BeforeInstallPromptEvent | undefined = undefined;
  private readonly installEvent$ = new ReplaySubject<
    BeforeInstallPromptEvent | undefined
  >(1);
  public readonly canInstall$ = combineLatest({
    online: this.onlineService.online$,
    isInstallable: this.installEvent$.pipe(map((event) => event != null)),
  }).pipe(map(({ online, isInstallable }) => online && isInstallable));

  public showInstallPrompt() {
    if (!this.installEvent) return;

    this.installEvent.prompt();
    this.installEvent.userChoice.then(({ outcome }) => {
      if (outcome === 'accepted') {
        this.installEvent$.next(undefined);
        this.installEvent = undefined;
      }
    });
  }

  public storeInstallEvent(event: BeforeInstallPromptEvent) {
    this.installEvent = event;
    this.installEvent$.next(event);
  }
}
