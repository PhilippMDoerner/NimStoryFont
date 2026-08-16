import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BaseCampaignData } from '../../../_models/campaign';
import { FormlyService } from '../../../_services/formly/formly-service.service';
import { RoutingService } from '../../../_services/routing.service';
import { SiteAdministrationPageStore } from '../../../administration/pages/site-administration-page/site-administration-page.store';
import { CreateUpdateComponent } from '../../../design/templates/create-update/create-update.component';
import { NavigationStore } from '../../../navigation.store';

@Component({
  selector: 'app-create-campaign',
  imports: [CreateUpdateComponent],
  templateUrl: './create-campaign.component.html',
  styleUrl: './create-campaign.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCampaignComponent {
  readonly store = inject(SiteAdministrationPageStore);

  private readonly formlyService = inject(FormlyService);
  private readonly navigationStore = inject(NavigationStore);
  private readonly routingService = inject(RoutingService);
  private readonly router = inject(Router);
  private readonly DEFAULT_URL =
    this.routingService.getRoutePath('campaign-overview');
  private readonly createRequestState$ = toObservable(
    this.store.createCampaignRequestState,
  );

  readonly campaignModel: Partial<BaseCampaignData> = {};
  readonly campaignFields: FormlyFieldConfig[] = [
    this.formlyService.buildInputConfig({
      key: 'name',
      inputKind: 'NAME',
      required: true,
      maxLength: 40,
      placeholder: "Your campaign's name...",
    }),
    this.formlyService.buildInputConfig({
      key: 'subtitle',
      inputKind: 'STRING',
      required: false,
      maxLength: 400,
      placeholder: 'The subtitle to show on the home page',
    }),
    this.formlyService.buildFileFieldConfig({
      key: 'background_image',
      required: true,
      fileButtonType: 'DARK',
    }),
    this.formlyService.buildFileFieldConfig({
      key: 'icon',
      required: true,
      fileButtonType: 'DARK',
    }),
  ];

  constructor() {
    effect(() => {
      console.log('State: ', this.store.createCampaignRequestState());
      if (
        this.store.createCampaignRequestState() === 'success' &&
        this.campaignModel.name
      ) {
        this.routingService.routeToPath('home', {
          campaign: this.campaignModel.name,
        });
      }
    });
  }

  routeBack() {
    const url = this.navigationStore.priorUrl() ?? this.DEFAULT_URL;
    this.router.navigateByUrl(url);
  }

  createCampaign(campaign: BaseCampaignData) {
    this.store.createCampaign(campaign);
  }
}
