import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ToastConfig } from '../_models/toast';
import { OnlineService } from '../_services/online.service';
import { ToastService } from '../design/organisms/toast-overlay/toast.service';

const offlineToast: ToastConfig = {
  type: 'WARNING',
  dismissMs: 3000,
  body: {
    text: 'This page is not available offline',
  },
};

export const onlyOnlineGuard: CanActivateFn = (): Observable<boolean> => {
  const onlineService = inject(OnlineService);
  const toastService = inject(ToastService);

  return onlineService.online$.pipe(
    tap((isOnline) => {
      if (!isOnline) {
        toastService.addToast(offlineToast);
      }
    }),
  );
};
