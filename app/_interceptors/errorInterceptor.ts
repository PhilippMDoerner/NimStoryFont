import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { interval, Observable, retry, tap } from 'rxjs';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { log } from 'src/utils/logging';
import { httpErrorToast, ToastConfig } from '../_models/toast';
import { RoutingService } from '../_services/routing.service';
import { TokenService } from '../_services/utils/token.service';
import { GlobalStore } from '../global.store';

const logoutInfoToast: ToastConfig = {
  type: 'INFO',
  dismissMs: 3000,
  header: {
    text: 'Session expired',
  },
  body: {
    text: 'You have been logged out',
  },
  onToastClick: (dismiss) => dismiss(),
};

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const tokenService = inject(TokenService);
  const toastService = inject(ToastService);
  const routingService = inject(RoutingService);
  const globalStore = inject(GlobalStore);

  const isRefresRequest = req.url.includes(tokenService.refreshTokenUrl);
  if (isRefresRequest) {
    return next(req).pipe(
      retry(2),
      tap({
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            toastService.addToast(logoutInfoToast);
            globalStore.logout();
            routingService.routeToPath('login');
          }
        },
      }),
    );
  }

  return next(req).pipe(
    retry({
      count: 1,
      resetOnSuccess: true,
      delay: (err: HttpErrorResponse, count) => {
        log(retry.name, err, count);
        switch (err.status) {
          case 401:
            return tokenService.refreshUserData();
          case 502:
            return interval(1000);
          default:
            throw err;
        }
      },
    }),
    tap({
      error: (err: HttpErrorResponse) => {
        switch (err.status) {
          case 500:
          case 502:
            toastService.addToast(httpErrorToast(err));
            break;
        }
      },
    }),
  );
}
