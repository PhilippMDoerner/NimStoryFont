import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  Signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  NgbActiveOffcanvas,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { Campaign } from 'src/app/_models/campaign';
import { NamedRouteData } from 'src/app/_models/route';
import { OnlineService } from 'src/app/_services/online.service';
import { PwaService } from 'src/app/_services/pwa.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { SwipeService } from 'src/app/_services/swipe.service';
import { SWIPE_X_THRESHOLD } from 'src/app/app.constants';
import { AuthStore } from 'src/app/auth.store';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import { hasRoleOrBetter } from 'src/app/global.store';
import { NavigationStore } from 'src/app/navigation.store';
import { environment } from 'src/environments/environment';
import { componentId } from 'src/utils/DOM';
import { SidebarButtonEntryComponent } from '../../molecules/sidebar-button-entry/sidebar-button-entry.component';
import { SidebarLinkEntryComponent } from '../../molecules/sidebar-link-entry/sidebar-link-entry.component';
import { ArticleMetaData, SIDEBAR_ENTRIES } from '../_model/sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    RouterLink,
    NgOptimizedImage,
    IconComponent,
    AsyncPipe,
    NgbTooltipModule,
    SidebarButtonEntryComponent,
    SidebarLinkEntryComponent,
  ],
  providers: [NgbActiveOffcanvas],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'navigation',
    '[attr.aria-labelledby]': 'headerId',
  },
})
export class SidebarComponent {
  readonly pwaService = inject(PwaService);
  readonly authStore = inject(AuthStore);
  readonly routingService = inject(RoutingService);
  readonly swipeService = inject(SwipeService);
  readonly host = inject(ElementRef);
  readonly activeOffcanvas = inject(NgbActiveOffcanvas);
  readonly online$ = inject(OnlineService).online$;
  readonly sidebarSwipesLeft$ = this.swipeService
    .getSwipeEvents(this.host)
    .pipe(filter((swipeDistance) => swipeDistance < SWIPE_X_THRESHOLD * -1));
  readonly currentRoute = inject(NavigationStore).currentRoute;
  readonly activeRouteName = computed(
    () => (this.currentRoute()?.data as NamedRouteData | undefined)?.name,
  );
  readonly campaign = input<Campaign | undefined>(undefined);
  readonly hasCampaignAdminPrivileges = input<boolean>(false);

  readonly logout = output<void>();
  readonly closeSidebar = output<void>();

  readonly serverUrl = environment.backendDomain;
  readonly sidebarEntries: Signal<ArticleMetaData[]> = computed(() => {
    const campaignName = this.campaign()?.name;
    if (!campaignName) return [];
    const currentRole = this.authStore.isGlobalAdmin()
      ? 'admin'
      : (this.authStore.getCampaignRole(campaignName) ?? 'guest');

    const activeRouteName = this.activeRouteName();

    return SIDEBAR_ENTRIES.filter((entry) =>
      hasRoleOrBetter(currentRole, entry.requiresRole),
    ).map((entry) => {
      const route = this.routingService.hasRoutePath(entry.route)
        ? this.routingService.getRoutePath(entry.route, {
            campaign: this.campaign()?.name,
          })
        : entry.route;
      return {
        ...entry,
        route,
        isActiveTab: activeRouteName
          ? entry.associatedRoutes.has(activeRouteName)
          : false,
      };
    });
  });

  readonly headerId = `${componentId()}-header`;

  readonly campaignOverviewUrl: string =
    this.routingService.getRoutePath('campaign-overview');

  readonly campaignAdminUrl = computed(() => {
    return this.routingService.getRoutePath('campaign-admin', {
      campaign: this.campaign()?.name,
    });
  });
  readonly homeUrl = computed(() => {
    return this.routingService.getRoutePath('home', {
      campaign: this.campaign()?.name,
    });
  });
  readonly profileUrl = this.routingService.getRoutePath('direct-profile');

  constructor() {
    this.sidebarSwipesLeft$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.closeSidebar.emit());
  }
}
