import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { ToastConfig } from '../_models/toast';
import { OnlineService } from '../_services/online.service';

const offlineToast: ToastConfig = {
  type: 'WARNING',
  dismissMs: 3000,
  body: {
    text: 'This page is not available offline',
  },
};

export function onlyOnlineGuard(): Observable<boolean> {
  const onlineService = inject(OnlineService);
  const toastService = inject(ToastService);

  return onlineService.online$.pipe(
    tap((isOnline) => {
      if (!isOnline) {
        toastService.addToast(offlineToast);
      }
    }),
  );
}
