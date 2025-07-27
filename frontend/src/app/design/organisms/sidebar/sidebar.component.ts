import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  NgbActiveOffcanvas,
  NgbModal,
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
import { SearchModalComponent } from 'src/app/global-components/search/search-modal/search-modal.component';
import { NavigationStore } from 'src/app/navigation.store';
import { componentId } from 'src/utils/DOM';
import { SidebarButtonEntryComponent } from '../../molecules/sidebar-button-entry/sidebar-button-entry.component';
import { SidebarLinkEntryComponent } from '../../molecules/sidebar-link-entry/sidebar-link-entry.component';
import { SidebarService } from '../_model/sidebar';

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
    RouterLinkActive,
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
  readonly sidebarService = inject(SidebarService);
  readonly pwaService = inject(PwaService);
  readonly authStore = inject(AuthStore);
  readonly modalService = inject(NgbModal);
  readonly routingService = inject(RoutingService);
  readonly swipeService = inject(SwipeService);
  readonly host = inject(ElementRef);
  readonly activeOffcanvas = inject(NgbActiveOffcanvas);
  readonly online$ = inject(OnlineService).online$;
  readonly sidebarSwipesLeft$ = this.swipeService
    .getSwipeEvents(this.host)
    .pipe(filter((swipeDistance) => swipeDistance < SWIPE_X_THRESHOLD * -1));
  readonly currentRoute = inject(NavigationStore).currentRoute;
  readonly campaign = input<Campaign | undefined>(undefined);
  readonly hasCampaignAdminPrivileges = input<boolean>(false);

  readonly activeRouteName = computed(
    () => (this.currentRoute()?.data as NamedRouteData | undefined)?.name,
  );
  readonly logout = output<void>();
  readonly closeSidebar = output<void>();

  readonly serverUrl = '';
  readonly canInstallPwa = toSignal(this.pwaService.canInstall$);

  readonly sidebarEntries = this.sidebarService.sidebarEntries;
  readonly sidebarFooterEntries = this.sidebarService.sidebarFooterEntries;

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

  onSidebarButtonClicked(actionName: string) {
    switch (actionName) {
      case 'logout':
        this.logout.emit();
        break;
      case 'pwaInstall':
        this.pwaService.showInstallPrompt();
        break;
      case 'search':
        this.openSearchModal();
        break;
    }
  }

  private openSearchModal() {
    const ref = this.modalService.open(SearchModalComponent);
    const titleId = (ref.componentInstance as SearchModalComponent).titleId;
    ref.update({ ariaLabelledBy: titleId });
  }
}
