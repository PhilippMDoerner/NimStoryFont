import { AsyncPipe } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { filter, map } from 'rxjs';
import { fadeOut } from 'src/app/design/animations/fadeIn';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast.service';
import { filterNil } from 'src/utils/rxjs-operators';
import { BypassBlockDirective } from './_directives/bypass-block.directive';
import { BeforeInstallPromptEvent, PwaService } from './_services/pwa.service';
import { CampaignService } from './_services/utils/campaign.service';
import { GlobalUrlParamsService } from './_services/utils/global-url-params.service';
import { TokenService } from './_services/utils/token.service';
import { AuthStore } from './auth.store';
import { PageComponent } from './design/organisms/page/page.component';
import { ToastOverlayComponent } from './design/organisms/toast-overlay/toast-overlay.component';
import { OnboardingModalComponent } from './global-components/onboarding/onboarding-modal/onboarding-modal.component';
import { SearchModalComponent } from './global-components/search/search-modal/search-modal.component';
import { GlobalStore } from './global.store';
import { ServiceWorkerService } from './service-worker.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    PageComponent,
    ToastOverlayComponent,
    AsyncPipe,
    OnboardingModalComponent,
    BypassBlockDirective,
    SearchModalComponent,
  ],
  host: {
    '[@.disabled]': 'disableAnimation()',
    '(window:beforeinstallprompt)': 'fireEvent($event)',
  },
  animations: [fadeOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly tooltipService = inject(NgbTooltipConfig);
  readonly pwaService = inject(PwaService);
  readonly globalStore = inject(GlobalStore);
  readonly authStore = inject(AuthStore);
  readonly tokenService = inject(TokenService);
  readonly paramsService = inject(GlobalUrlParamsService);
  readonly campaignService = inject(CampaignService);
  readonly toastService = inject(ToastService);
  readonly serviceWorkerService = inject(ServiceWorkerService);
  readonly currentUrl$ = inject(Router).events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => event.url.split('#')[0]), //Remove any fragment it might have
    filterNil(),
  );

  campaign$ = this.globalStore.currentCampaign;
  hasCampaignAdminRights = computed(() =>
    this.globalStore.isCampaignAdmin(this.globalStore.campaignName()),
  );
  disableAnimation = signal(false);

  constructor() {
    this.trackAnimationSetting();
    this.configureTooltips();
    this.serviceWorkerService.initializeServiceWorkerInteractions();
  }

  logout(): void {
    this.globalStore.logout();
  }

  fireEvent(event: BeforeInstallPromptEvent) {
    this.pwaService.storeInstallEvent(event);
  }

  focusMain() {
    document.querySelector<HTMLElement>('main')?.focus();
  }

  private trackAnimationSetting() {
    afterNextRender(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.addEventListener('change', (event) => {
        this.disableAnimation.set(event.matches);
      });
    });
  }

  private configureTooltips() {
    this.tooltipService.tooltipClass = 'my-tooltip';
  }
}
