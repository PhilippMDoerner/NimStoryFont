import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthData, CampaignRole } from 'src/app/_models/token';
import { RoutingService } from 'src/app/_services/routing.service';
import { TokenService } from 'src/app/_services/utils/token.service';
import { AuthStore } from 'src/app/auth.store';
import { ProfileComponent } from 'src/app/design//templates/profile/profile.component';
import { GlobalStore } from 'src/app/global.store';
import { NavigationStore } from 'src/app/navigation.store';
import { ProfilePageStore } from './profile-page.store';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  providers: [ProfilePageStore],
  imports: [ProfileComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  authStore = inject(AuthStore);
  globalStore = inject(GlobalStore);
  profilePageStore = inject(ProfilePageStore);
  navStore = inject(NavigationStore);
  routingService = inject(RoutingService);

  user$ = this.profilePageStore.user;
  isCurrentUser$ = computed(
    () => this.user$()?.pk === this.authStore.currentUserPk(),
  );
  campaignName$ = this.globalStore.campaignName;
  memberships$ = computed(() => {
    return this.mapMemberships(this.authStore.authData());
  });
  backUrl = computed(
    () =>
      this.navStore.priorUrl() ??
      this.routingService.getRoutePath('campaign-overview'),
  );
  canResetWithoutPassword$ = inject(ActivatedRoute).queryParams.pipe(
    map((params) => {
      const { source, state, expires: expiryTimestampSeconds } = params;
      const triggeredPasswordReset = source === 'password_reset';
      const hadSuccess = state === 'success';
      const isExpired = Date.now() > expiryTimestampSeconds * 1000;
      return triggeredPasswordReset && hadSuccess && !isExpired;
    }),
  );

  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    computed(
      () =>
        this.authStore.authData() == null ||
        this.profilePageStore.user() == null,
    );

  constructor(private tokenService: TokenService) {
    this.profilePageStore.loadThisUser();

    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }

  private mapMemberships(
    data: AuthData | undefined,
  ): { campaignName: string; role: CampaignRole }[] | undefined {
    const memberships = this.tokenService.getCampaignMemberships(data);
    if (memberships == null) return undefined;

    const campaignNames = Object.keys(memberships);
    return campaignNames.map((name) => ({
      campaignName: name,
      role: memberships[name],
    }));
  }
}
