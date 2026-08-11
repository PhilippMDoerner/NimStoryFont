import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbAccordionModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '../../../_models/location';
import { OverviewItem } from '../../../_models/overview';
import { RoutingService } from '../../../_services/routing.service';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { LocationComponent } from '../location/location.component';

@Component({
  selector: 'app-location-accordion',
  templateUrl: './location-accordion.component.html',
  styleUrls: ['./location-accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonLinkComponent,
    RouterLink,
    NgbAccordionModule,
    LocationComponent,
    NgbTooltip,
  ],
})
export class LocationAccordionComponent {
  readonly locations = input.required<Location[]>();
  readonly campaignCharacters = input.required<OverviewItem[]>();
  readonly canCreate = input(false);
  readonly campaignName = input.required<string>();

  readonly createUrl = computed(() =>
    this.routingService.getRoutePath('location-create', {
      campaign: this.campaignName(),
    }),
  );

  constructor(private routingService: RoutingService) {}
}
