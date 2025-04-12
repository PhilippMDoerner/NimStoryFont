import { Component, computed, inject, Signal } from '@angular/core';
import { CampaignAdminComponent } from 'src/app/design/templates/campaign-admin/campaign-admin.component';
import { GlobalStore } from 'src/app/global.store';
import { environment } from 'src/environments/environment';
import { CampaignAdminPageStore } from './campaign-admin-page.store';

@Component({
  selector: 'app-campaign-admin-page',
  imports: [CampaignAdminComponent],
  providers: [CampaignAdminPageStore],
  templateUrl: './campaign-admin-page.component.html',
  styleUrl: './campaign-admin-page.component.scss',
})
export class CampaignAdminPageComponent {
  readonly store = inject(CampaignAdminPageStore);
  readonly globalStore = inject(GlobalStore);
  campaign = this.store.campaign;
  serverUrl = environment.backendDomain;
  private readonly isPageLoading: Signal<boolean> = computed(
    () =>
      this.store.campaign() == null ||
      this.store.campaignStatistics() == null ||
      this.store.users() == null,
  );

  constructor() {
    this.store.loadCampaign();
    this.store.loadCampaignStatistics();
    this.store.loadUsers();
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }
}
