import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { filter, take } from 'rxjs';
import { User } from 'src/app/_models/user';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { SiteAdministrationPageStore } from 'src/app/administration/pages/site-administration-page/site-administration-page.store';
import { NavigationStore } from 'src/app/navigation.store';
import { CreateUpdateComponent } from '../../../design/templates/create-update/create-update.component';

@Component({
  selector: 'app-registration',
  imports: [CreateUpdateComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  private readonly store = inject(SiteAdministrationPageStore);
  private readonly formlyService = inject(FormlyService);
  private readonly routingService = inject(RoutingService);
  private readonly router = inject(Router);
  private readonly navigationStore = inject(NavigationStore);
  private readonly DEFAULT_URL = this.routingService.getRoutePath('login');
  private readonly createUserRequestState$ = toObservable(
    this.store.createUserRequestState,
  );

  userModel: Partial<User> = {};
  userFields: FormlyFieldConfig[] = [
    this.formlyService.buildInputConfig({
      key: 'username',
      inputKind: 'NAME',
      required: true,
    }),
    this.formlyService.buildConfirmedPasswordConfig({}),
    this.formlyService.buildInputConfig({
      key: 'email',
      inputKind: 'NAME',
      required: false,
    }),
  ];

  routeBack() {
    const url = this.navigationStore.priorUrl() ?? this.DEFAULT_URL;
    this.router.navigateByUrl(url);
  }

  createUser(newUser: User) {
    this.createUserRequestState$
      .pipe(
        filter((state) => state === 'success'),
        take(1),
      )
      .subscribe(() => this.routingService.routeToPath('campaign-overview'));
    this.store.createUser(newUser);
  }
}
