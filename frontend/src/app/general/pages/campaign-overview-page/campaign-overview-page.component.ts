import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthStore } from 'src/app/auth.store';
import { CampaignOverviewComponent } from 'src/app/design//templates/campaign-overview/campaign-overview.component';
import { GlobalStore } from 'src/app/global.store';

@Component({
  selector: 'app-campaign-overview-page',
  templateUrl: './campaign-overview-page.component.html',
  styleUrls: ['./campaign-overview-page.component.scss'],
  host: {
    tabindex: '-1',
  },
  imports: [CampaignOverviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignOverviewPageComponent {
  public readonly authStore = inject(AuthStore);
  public readonly globalStore = inject(GlobalStore);
  serverUrl = '';

  logout(): void {
    this.globalStore.logout();
  }
}
