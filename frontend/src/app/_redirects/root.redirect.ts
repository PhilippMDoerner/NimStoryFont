import { inject } from '@angular/core';
import { Params, RedirectFunction, UrlTree } from '@angular/router';
import { ToastConfig } from '../_models/toast';
import { RoutingService } from '../_services/routing.service';
import { ToastService } from '../design/organisms/toast-overlay/toast-overlay.component';

function toPasswordResetToast(state: string): ToastConfig | undefined {
  switch (state) {
    case 'success':
      return {
        type: 'PRIMARY',
        header: { text: 'Password Reset Enabled' },
        body: {
          text: `
          Triggered password reset process.<br>
          You can now freely reset your password for the next 15 minutes.
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
  queryParams: Params,
): UrlTree => {
  const routingService = inject(RoutingService);
  const toastService = inject(ToastService);

  const toast = toPasswordResetToast(passwordResetState);
  if (toast) {
    toastService.addToast(toast);
  }

  return routingService.getRouteUrlTree('direct-profile', {}, queryParams);
};

export const rootRedirect: RedirectFunction = (activatedRoute) => {
  const routingService = inject(RoutingService);
  const { source, state } = activatedRoute.queryParams as {
    [key: string]: string;
  };

  switch (source) {
    case 'password_reset':
      return passwordResetRedirect(state, activatedRoute.queryParams);
    default:
      return routingService.getRouteUrlTree('campaign-overview');
  }
};
