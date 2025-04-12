import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { MapMarker } from 'src/app/_models/mapMarker';
import { RoutingService } from 'src/app/_services/routing.service';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';

import { RouterLink } from '@angular/router';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { ArticleFooterComponent } from '../../molecules/article-footer/article-footer.component';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss'],
  imports: [
    PageContainerComponent,
    RouterLink,
    ButtonLinkComponent,
    IconComponent,
    ArticleFooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkerComponent {
  marker = input.required<MapMarker>();
  canDelete = input<boolean>(false);
  canUpdate = input<boolean>(false);

  readonly markerDelete = output<MapMarker>();

  private readonly routingService = inject(RoutingService);

  locationUrl = computed(() => {
    const { campaign_details, location_details } = this.marker();
    return this.routingService.getRoutePath('location', {
      parent_name: location_details?.parent_location_name,
      name: location_details?.name,
      campaign: campaign_details.name,
    });
  });
  updateUrl = computed(() => {
    const { campaign_details, location_details, map_details } = this.marker();

    return this.routingService.getRoutePath('marker-update', {
      parent_location_name: location_details?.parent_location_name,
      campaign: campaign_details.name,
      location_name: location_details?.name,
      map_name: map_details?.name,
    });
  });
}
