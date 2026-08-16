import { AnimationEvent } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { AuthStore } from '../../../auth.store';
import { slideInOut } from '../../../design/animations/slideInOut';
import { showSidebarSignal } from '../../../design/organisms/page/page.component';
import { CampaignOverviewComponent } from '../../../design/templates/campaign-overview/campaign-overview.component';
import { GlobalStore } from '../../../global.store';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignOverviewPageComponent {
  public readonly authStore = inject(AuthStore);
  public readonly globalStore = inject(GlobalStore);
  readonly serverUrl = '';

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
