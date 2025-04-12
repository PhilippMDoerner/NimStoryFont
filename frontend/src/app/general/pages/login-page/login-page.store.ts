import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { take } from 'rxjs';
import { SpecialLoginState } from 'src/app/_models/login';
import { MailService } from 'src/app/_services/utils/mail.service';

export interface LoginPageState {
  specialLoginState: SpecialLoginState | undefined;
  resetErrorMessage: string | undefined;
}

const initialState: LoginPageState = {
  specialLoginState: undefined,
  resetErrorMessage: undefined,
};

export const LoginPageStore = signalStore(
  withState(initialState),
  withMethods((state) => {
    const mailService = inject(MailService);

    return {
      onResetPassword: (userName: string) => {
        mailService
          .requestPasswordReset(userName)
          .pipe(take(1))
          .subscribe({
            next: () => patchState(state, { resetErrorMessage: undefined }),
            error: (error: HttpErrorResponse) => {
              patchState(state, { resetErrorMessage: error.message });
            },
          });
      },
    };
  }),
);
