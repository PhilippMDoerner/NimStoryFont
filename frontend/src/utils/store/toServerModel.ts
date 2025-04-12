import { HttpErrorResponse } from '@angular/common/http';
import { patchState, WritableStateSource } from '@ngrx/signals';
import { httpErrorToast } from 'src/app/_models/toast';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';

export function handleError<T extends WritableStateSource<object>>(
  store: T,
  err: HttpErrorResponse,
  toastService: ToastService,
) {
  if (err.status === 409) {
    patchState(store, { serverModel: err.error });
  } else {
    toastService.addToast(httpErrorToast(err));
  }
}

export function toServerModel<T>(err: HttpErrorResponse): T | undefined {
  if (err.status === 409) {
    return err.error;
  }
  return undefined;
}
