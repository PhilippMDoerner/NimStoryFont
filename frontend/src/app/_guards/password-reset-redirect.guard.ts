import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastConfig } from '../_models/toast';
import { RoutingService } from '../_services/routing.service';
import { ToastService } from '../design/organisms/toast-overlay/toast-overlay.component';

function toToast(passwordResetState: string): ToastConfig | undefined {
  switch (passwordResetState) {
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

export const passwordResetRedirect: CanActivateFn = (route) => {
  const routingService = inject(RoutingService);
  const toastService = inject(ToastService);

  const isBackendRedirectFromPasswordReset =
    route.queryParams['source'] === 'password_reset';
  if (!isBackendRedirectFromPasswordReset) return true;

  const passwordResetState = route.queryParams['state'];
  const toast = toToast(passwordResetState);
  if (toast) {
    toastService.addToast(toast);
  }

  return routingService.getRouteUrlTree('direct-profile', {});
};
