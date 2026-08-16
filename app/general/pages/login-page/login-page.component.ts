import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { filter, map, Observable, pairwise } from 'rxjs';
import { takeOnceOrUntilDestroyed } from '../../../../utils/rxjs-operators';
import { Login, SpecialLoginState } from '../../../_models/login';
import { RoutingService } from '../../../_services/routing.service';
import { MailService } from '../../../_services/utils/mail.service';
import { AuthStore } from '../../../auth.store';
import { LoginComponent } from '../../../design/templates/login/login.component';
import { LoginPageStore } from './login-page.store';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [LoginComponent, AsyncPipe, FormlyModule],
  providers: [LoginPageStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  public readonly authStore = inject(AuthStore);
  public readonly store = inject(LoginPageStore);
  readonly specialLoginState$: Observable<SpecialLoginState> =
    this.route.paramMap.pipe(
      map((params) => {
        return (params.get('state') as SpecialLoginState) ?? undefined;
      }),
    );

  private readonly destroyRef = inject(DestroyRef);
  private readonly loginSucceededEvent$ = toObservable(
    this.authStore.authDataQueryState,
  ).pipe(
    pairwise(),
    filter(
      ([priorState, nextState]) =>
        priorState === 'loading' && nextState === 'success',
    ),
  );

  constructor(
    private routingService: RoutingService,
    private mailService: MailService,
    private route: ActivatedRoute,
  ) {}

  onLogin(loginData: Login) {
    this.authStore.login(loginData);

    this.loginSucceededEvent$
      .pipe(takeOnceOrUntilDestroyed(this.destroyRef))
      .subscribe(() => this.routingService.routeToPath('campaign-overview'));
  }

  onResetPassword(username: string): void {
    this.mailService
      .requestPasswordReset(username)
      .pipe(takeOnceOrUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
