import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SwUpdate, UnrecoverableStateEvent } from '@angular/service-worker';
import { switchMap, take, timer } from 'rxjs';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { ToastConfig } from './_models/toast';

@Injectable({
  providedIn: 'root',
})
export class ServiceWorkerService {
  readonly toastService = inject(ToastService);
  readonly serviceWorkerUpdate = inject(SwUpdate);

  private newVersionInstalledToast: ToastConfig = {
    type: 'INFO',
    header: {
      text: 'New nimstoryfont version installed!',
    },
    body: {
      buttons: [
        {
          label: 'Use now!',
          onClick: () => document.location.reload(),
        },
      ],
    },
  };

  initializeServiceWorkerInteractions() {
    this.initUpdateEventListening();
    this.initUpdatePolling();
    this.initErrorListening();
  }

  private initErrorListening() {
    this.serviceWorkerUpdate.unrecoverable
      .pipe(takeUntilDestroyed())
      .subscribe((event) =>
        this.toastService.addToast(unrecoverableErrorToast(event)),
      );
  }

  private initUpdateEventListening() {
    this.serviceWorkerUpdate.versionUpdates
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        switch (event.type) {
          case 'VERSION_DETECTED':
            this.toastService.addToast(newVersionFoundToast);
            break;
          case 'VERSION_INSTALLATION_FAILED':
            this.toastService.addToast(newVersionInstallFailedToast);
            break;
          case 'VERSION_READY':
            this.toastService.addToast(this.newVersionInstalledToast);
            break;
          case 'NO_NEW_VERSION_DETECTED':
            break;
        }
      });
  }

  /**
   * Polls for updates but only after 30 seconds. This allows the application and
   * service worker script to stabilize in order to register with the browser
   */
  private initUpdatePolling() {
    const thirtySeconds = 30 * 1000;
    const twelveHours = 12 * 60 * 60 * 1000;
    timer(thirtySeconds)
      .pipe(
        take(1),
        switchMap(() => timer(twelveHours)),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.serviceWorkerUpdate.checkForUpdate());
  }
}

const newVersionFoundToast: ToastConfig = {
  type: 'INFO',
  dismissMs: 3000,
  body: { text: 'A new version of nimstoryfont is available!' },
  onToastClick: (dismiss) => dismiss(),
};

const newVersionInstallFailedToast: ToastConfig = {
  type: 'DANGER',
  dismissMs: 3000,
  body: { text: 'Failed to install new version of nimstoryfont' },
  onToastClick: (dismiss) => dismiss(),
};

const unrecoverableErrorToast = (
  err: UnrecoverableStateEvent,
): ToastConfig => ({
  type: 'DANGER',
  important: true,
  header: {
    text: 'Unrecoverable Error',
  },
  body: {
    text: `This error occurred:\n${err.reason}\n\nPlease reload`,
    buttons: [
      {
        label: 'Reload',
        onClick: () => document.location.reload(),
      },
    ],
  },
});
