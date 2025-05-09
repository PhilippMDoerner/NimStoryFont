import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of, switchMap, take } from 'rxjs';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { ToastConfig } from '../_models/toast';
import { OfflineRequestService } from '../_services/offline-request.service';
import { OnlineService } from '../_services/online.service';

// const offlineActionToast: ToastConfig = {
//   type: 'WARNING',
//   dismissMs: 3000,
//   body: {
//     text: 'This action can not be performed while offline',
//   },
// };

const offlineReadToast: ToastConfig = {
  type: 'WARNING',
  dismissMs: 3000,
  body: {
    text: 'This data is not available while offline.',
  },
  onToastClick: (dismiss) => dismiss(),
};

export function offlineInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const toastService = inject(ToastService);
  const onlineService = inject(OnlineService);
  const offlineRequestService = inject(OfflineRequestService);

  return onlineService.online$.pipe(
    take(1),
    switchMap((isOnline) => {
      if (req.method !== 'GET') return next(req);
      if (isOnline) return next(req);

      return offlineRequestService.getRequestData(req.url).pipe(
        switchMap((offlineResponseData) => {
          const hasOfflineData = !!offlineResponseData;
          if (!hasOfflineData) {
            toastService.addToast(offlineReadToast);
            return next(req);
          }

          return of(
            new HttpResponse({
              body: offlineResponseData,
              headers: new HttpHeaders({ 'content-type': 'application/json' }),
              status: 200,
              statusText: undefined,
              url: req.url,
            }),
          );
        }),
      );
    }),
  );
}
