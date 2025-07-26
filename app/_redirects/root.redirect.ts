import { inject } from '@angular/core';
import { Params, RedirectFunction, UrlTree } from '@angular/router';
import { ToastConfig } from '../_models/toast';
import { RoutingService } from '../_services/routing.service';
import { ToastService } from '../design/organisms/toast-overlay/toast.service';

function toPasswordResetToast(
  state: string,
  expiryTimestamp: number | undefined,
): ToastConfig | undefined {
  const expiryDate = expiryTimestamp
    ? new Date(expiryTimestamp * 1000)
    : undefined;
  const expiryTime = `${expiryDate?.getHours()}:${expiryDate?.getMinutes()}`;

  switch (state) {
    case 'success':
      return {
        type: 'PRIMARY',
        header: { text: 'Password Reset Enabled' },
        body: {
          text: `
          Triggered password reset process.<br>
          You can now freely reset your password until ${expiryTime}.
        `,
        },
      };
    case 'failed':
      return {
        type: 'WARNING',
        header: { text: 'Password Reset Not Enabled' },
        body: {
          text: `
          Failed to trigger password reset process.<br>
          You can still change it, but you must provide your old password.
        `,
        },
      };
    default:
      return undefined;
  }
}

const passwordResetRedirect = (
  passwordResetState: string,
  expiryTimestampInSeconds: number | undefined,
  queryParams: Params,
): UrlTree => {
  const routingService = inject(RoutingService);
  const toastService = inject(ToastService);

  const toast = toPasswordResetToast(
    passwordResetState,
    expiryTimestampInSeconds,
  );
  if (toast) {
    toastService.addToast(toast);
  }

  return routingService.getRouteUrlTree('direct-profile', {}, queryParams);
};

export const rootRedirect: RedirectFunction = (activatedRoute) => {
  const routingService = inject(RoutingService);
  const {
    source,
    state,
    expires: expiryTimestamp,
  } = activatedRoute.queryParams as {
    [key: string]: string;
  };

  switch (source) {
    case 'password_reset': {
      const expiryTimestampSeconds = expiryTimestamp
        ? Number(expiryTimestamp)
        : undefined;
      return passwordResetRedirect(
        state,
        expiryTimestampSeconds,
        activatedRoute.queryParams,
      );
    }
    default:
      return routingService.getRouteUrlTree('campaign-overview');
  }
};
