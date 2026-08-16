import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapMarker } from '../../../_models/mapMarker';
import { RoutingService } from '../../../_services/routing.service';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { ArticleContextMenuComponent } from '../../molecules/article-context-menu/article-context-menu.component';
import { ArticleFooterComponent } from '../../molecules/article-footer/article-footer.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';

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
    ArticleContextMenuComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkerComponent {
  readonly marker = input.required<MapMarker>();
  readonly canDelete = input<boolean>(false);
  readonly canUpdate = input<boolean>(false);

  readonly markerDelete = output<MapMarker>();

  private readonly routingService = inject(RoutingService);

  readonly locationUrl = computed(() => {
    const { campaign_details, location_details } = this.marker();
    return this.routingService.getRoutePath('location', {
      parent_name: location_details?.parent_location_name,
      name: location_details?.name,
      campaign: campaign_details.name,
    });
  });
  readonly updateUrl = computed(() => {
    const { campaign_details, location_details, map_details } = this.marker();

    return this.routingService.getRoutePath('marker-update', {
      parent_location_name: location_details?.parent_location_name,
      campaign: campaign_details.name,
      location_name: location_details?.name,
      map_name: map_details?.name,
    });
  });
}
