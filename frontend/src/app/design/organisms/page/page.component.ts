import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  TemplateRef,
  untracked,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { NgbOffcanvas, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, filter, fromEvent, map, switchMap } from 'rxjs';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { RoutingService } from 'src/app/_services/routing.service';
import { ScreenService } from 'src/app/_services/screen.service';
import { SwipeService } from 'src/app/_services/swipe.service';
import { FaviconService } from 'src/app/_services/utils/favicon.service';
import { SCROLL_UP_DISTANCE, SWIPE_X_THRESHOLD } from 'src/app/app.constants';
import { PageBackgroundComponent } from 'src/app/design/molecules';
import { GlobalStore } from 'src/app/global.store';
import { NavigationStore } from 'src/app/navigation.store';
import { delayFalsy, filterNil } from 'src/utils/rxjs-operators';
import { capitalize } from 'src/utils/string';
import { IconComponent } from '../../atoms/icon/icon.component';
import { SpinnerComponent } from '../../atoms/spinner/spinner.component';
import { MobileHeaderComponent } from '../mobile-header/mobile-header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

export const showSidebarSignal = signal(true);

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  imports: [
    SidebarComponent,
    PageBackgroundComponent,
    RouterOutlet,
    AsyncPipe,
    NgTemplateOutlet,
    MobileHeaderComponent,
    IconComponent,
    HotkeyDirective,
    SpinnerComponent,
    NgbTooltip,
  ],
  providers: [NgbOffcanvas],
})
export class PageComponent {
  serverUrl = input.required<string>();
  contentId = input.required<string>();

  readonly logout = output<void>();

  contentElement = viewChild.required<ElementRef<HTMLDivElement>>('content');
  innerContentElement =
    viewChild.required<ElementRef<HTMLDivElement>>('innerContent');
  sidebarTemplate =
    viewChild.required<TemplateRef<SidebarComponent>>('sidebar');
  sidebarElement = viewChild<ElementRef<HTMLElement>>('sidebarElement');

  titleService = inject(FaviconService);
  globalStore = inject(GlobalStore);
  sidebarService = inject(NgbOffcanvas);
  swipeService = inject(SwipeService);
  screenService = inject(ScreenService);
  routingService = inject(RoutingService);
  host = inject(ElementRef);
  navStore = inject(NavigationStore);

  mobileHeaderTitle = computed(() => {
    const campaignName = this.globalStore.campaignName();
    return campaignName ? capitalize(campaignName) : '';
  });
  isLoading = this.globalStore.isLoadingPage;

  contentScrollEvents$ = toObservable(this.innerContentElement).pipe(
    filterNil(),
    switchMap((innerContent) =>
      fromEvent<Event>(innerContent.nativeElement, 'scroll', {
        passive: true,
      }),
    ),
  );
  showScrollupIndicator$ = this.contentScrollEvents$.pipe(
    debounceTime(100),
    map((event) => {
      const scrollTop = (event.target as HTMLDivElement | undefined)?.scrollTop;
      return (scrollTop ?? 0) > SCROLL_UP_DISTANCE;
    }),
  );

  showScrollUpIndicator = signal(true);

  pageSwipesRight$ = this.swipeService
    .getSwipeEvents(this.host)
    .pipe(filter((swipeDistance) => swipeDistance > SWIPE_X_THRESHOLD));

  hasCampaignAdminPrivileges =
    this.globalStore.canPerformActionsOfRole('admin');
  showSidebar = signal(this.screenService.isMobile() ? false : true);
  canShowSidebar = computed(() => {
    const hasCampaign = !!this.globalStore.currentCampaign();
    const allowSidebarVisibility = showSidebarSignal();
    return allowSidebarVisibility && hasCampaign;
  });
  homeUrl = computed(() =>
    this.routingService.getRoutePath('home', {
      campaign: this.globalStore.campaignName(),
    }),
  );

  campaignBackgroundImage$ = toObservable(
    this.globalStore.currentCampaign,
  ).pipe(
    map((campaign) => campaign?.background_image),
    delayFalsy(1000),
  );

  constructor() {
    const liveAnouncer = inject(LiveAnnouncer);
    effect(() => {
      const loading = this.isLoading();
      const title = untracked(() => this.navStore.currentRoute()?.title);
      if (!title || loading) return;

      const loadingMessage = 'Loaded ' + title;

      liveAnouncer.announce(loadingMessage);
    });

    this.pageSwipesRight$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.openSidebar());

    /**
     * Due to the structure of the webpage (left sidebar, right a global content section)
     * where the scrollable element is not window or document or body, but instead the .page
     * element, none of the child-elements can know when a scroll event is triggered.
     * This propagates a scroll-event to the window, making it "global" in a sense.
     * That way, all child components (e.g. home.component) can listen to scroll events.
     */
    this.contentScrollEvents$
      .pipe(debounceTime(50), takeUntilDestroyed())
      .subscribe((event) => this.dispatchCustomPageScrollEvent(event));
  }

  closeSidebar() {
    if (!this.screenService.isMobile()) return;

    this.sidebarService.dismiss();
    this.showSidebar.set(false);
  }

  openSidebar() {
    if (!this.screenService.isMobile() || !this.canShowSidebar()) return;
    this.sidebarService.open(this.sidebarTemplate(), {
      ariaLabelledBy: 'offcanvas-basic-title',
    });
    this.showSidebar.set(true);
  }

  scrollToTop() {
    this.innerContentElement().nativeElement.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }

  private dispatchCustomPageScrollEvent(event: Event): void {
    const pageScrollEvent: CustomEvent = new CustomEvent('page.scroll', {
      ...event,
      detail: {
        pageElement: this.innerContentElement(),
      },
    });
    this.globalStore.fireScrollEvent(pageScrollEvent);
  }
}
