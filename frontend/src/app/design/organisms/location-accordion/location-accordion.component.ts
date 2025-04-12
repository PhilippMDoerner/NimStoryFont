import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbAccordionModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Location } from 'src/app/_models/location';
import { OverviewItem } from 'src/app/_models/overview';
import { RoutingService } from 'src/app/_services/routing.service';
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
  locations = input.required<Location[]>();
  campaignCharacters = input.required<OverviewItem[]>();
  canCreate = input(false);
  campaignName = input.required<string>();

  createUrl = computed(() =>
    this.routingService.getRoutePath('location-create', {
      campaign: this.campaignName(),
    }),
  );

  constructor(private routingService: RoutingService) {}
}
