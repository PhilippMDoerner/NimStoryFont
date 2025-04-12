import { AnimationEvent } from '@angular/animations';
import { Component, HostListener, inject } from '@angular/core';
import { AuthStore } from 'src/app/auth.store';
import { CampaignOverviewComponent } from 'src/app/design//templates/campaign-overview/campaign-overview.component';
import { slideInOut } from 'src/app/design/animations/slideInOut';
import { showSidebarSignal } from 'src/app/design/organisms/page/page.component';
import { GlobalStore } from 'src/app/global.store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-campaign-overview-page',
  templateUrl: './campaign-overview-page.component.html',
  styleUrls: ['./campaign-overview-page.component.scss'],
  host: {
    '[@slideInOut]': '',
    tabindex: '-1',
  },
  animations: [slideInOut],
  imports: [CampaignOverviewComponent],
})
export class CampaignOverviewPageComponent {
  public readonly authStore = inject(AuthStore);
  public readonly globalStore = inject(GlobalStore);
  serverUrl = environment.backendDomain;

  @HostListener('@slideInOut.start', ['$event'])
  @HostListener('@slideInOut.done', ['$event'])
  onAnimation(event: AnimationEvent) {
    const isStartOfEnterAnimation =
      event.fromState === 'void' && event.phaseName === 'start';
    if (isStartOfEnterAnimation) {
      showSidebarSignal.set(false);
    }
    const isEndOfLeaveAnimation =
      event.toState === 'void' && event.phaseName === 'done';
    if (isEndOfLeaveAnimation) {
      showSidebarSignal.set(true);
    }
  }

  logout(): void {
    this.globalStore.logout();
  }
}
