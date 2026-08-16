import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { takeFirstNonNil } from '../../../../utils/rxjs-operators';
import { Campaign, CampaignRaw } from '../../../_models/campaign';
import { RoutingService } from '../../../_services/routing.service';
import { CampaignUpdateComponent } from '../../../design//templates/campaign-update/campaign-update.component';
import { GlobalStore } from '../../../global.store';
import { CampaignUpdatePageStore } from './campaign-update-page.store';

@Component({
  selector: 'app-campaign-update-page',
  imports: [CampaignUpdateComponent],
  providers: [CampaignUpdatePageStore],
  templateUrl: './campaign-update-page.component.html',
  styleUrl: './campaign-update-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignUpdatePageComponent {
  readonly globalStore = inject(GlobalStore);
  readonly campaignUpdatePageStore = inject(CampaignUpdatePageStore);

  readonly serverUrl = '';
  readonly campaign = this.campaignUpdatePageStore.campaign;
  readonly campaign$ = toObservable(this.campaign);
  readonly mapOptions = this.campaignUpdatePageStore.mapOptions;
  readonly serverModel = this.campaignUpdatePageStore.serverModel;
  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    computed(() => this.campaignUpdatePageStore.campaign() == null);

  constructor(private routingService: RoutingService) {
    this.campaignUpdatePageStore.loadCurrentCampaignDetails();
    this.campaignUpdatePageStore.loadMapOptions();
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }

  updateCampaign(campaign: Partial<Campaign>) {
    const campaignPk = campaign.pk as number;
    const name = campaign.name as string;
    if (!campaignPk || !name) {
      return;
    }

    const rawCampaign: CampaignRaw &
      Record<'pk', number> &
      Record<'update_datetime', string> &
      Record<'subtitle', string> = {
      has_audio_recording_permission: false,
      is_deactivated: false,
      name,
      default_map_id: campaign.default_map,
      background_image: campaign.background_image ?? '',
      icon: campaign.icon,
      pk: campaignPk,
      subtitle: campaign.subtitle as string,
      update_datetime: campaign.update_datetime as string,
    };

    const request$ = this.campaignUpdatePageStore.updateCampaign(
      campaignPk,
      rawCampaign,
    );

    request$.subscribe(() => this.routeToAdmin());
  }

  cancel() {
    this.routeToAdmin();
  }

  private routeToAdmin() {
    this.campaign$.pipe(takeFirstNonNil()).subscribe((campaign) => {
      this.routingService.routeToPath('campaign-admin', {
        campaign: campaign?.name,
      });
    });
  }
}
