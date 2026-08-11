import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { HotkeyDirective } from '../../../_directives/hotkey.directive';
import { ExtendedMap } from '../../../_models/map';
import { OverviewItem } from '../../../_models/overview';
import { RoutingService } from '../../../_services/routing.service';
import { Icon } from '../../atoms/_models/icon';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { SpinnerComponent } from '../../atoms/spinner/spinner.component';
import { MenuItem } from '../../molecules/_models/menu';
import { ArticleContextMenuComponent } from '../../molecules/article-context-menu/article-context-menu.component';
import { ArticleFooterComponent } from '../../molecules/article-footer/article-footer.component';
import { ContextMenuComponent } from '../../molecules/context-menu/context-menu.component';
import { NgxLeafletMapComponent } from '../../organisms/ngx-leaflet-map/ngx-leaflet-map.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [
    PageContainerComponent,
    RouterLink,
    ButtonLinkComponent,
    NgxLeafletMapComponent,
    NgTemplateOutlet,
    ArticleFooterComponent,
    SpinnerComponent,
    HotkeyDirective,
    ContextMenuComponent,
    ArticleContextMenuComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  readonly mapChoices = input.required<OverviewItem[]>();
  readonly map = input.required<ExtendedMap>();
  readonly serverUrl = input.required<string>();
  readonly canUpdate = input.required<boolean>();
  readonly canCreate = input.required<boolean>();
  readonly canDelete = input.required<boolean>();

  readonly mapDelete = output<ExtendedMap>();
  readonly mapChange = output<OverviewItem>();

  readonly menuItems = computed<MenuItem[]>(() =>
    this.mapChoices().map(
      (choice) =>
        ({
          kind: 'BUTTON',
          actionName: choice.name,
          label: choice.name,
          icon: choice.icon?.replace('/media/fa-', '') as Icon,
          active: this.map().pk === choice.pk,
        }) satisfies MenuItem,
    ),
  );
  readonly campaignName = computed(() => this.map().campaign_details?.name);
  readonly createUrl = computed(() =>
    this.routingService.getRoutePath('map-create', {
      campaign: this.campaignName(),
    }),
  );
  readonly updateUrl = computed(() => {
    const mapName = this.map().name;
    return this.routingService.getRoutePath('map-update', {
      campaign: this.campaignName(),
      name: mapName,
    });
  });
  readonly homeUrl = computed(() =>
    this.routingService.getRoutePath('home', {
      campaign: this.campaignName(),
    }),
  );

  constructor(private routingService: RoutingService) {}

  onMapDelete(): void {
    this.mapDelete.emit(this.map());
  }

  onMapChange(mapName: string): void {
    const overviewItem = this.mapChoices().find(
      (item) => item.name === mapName,
    );
    if (overviewItem) {
      this.mapChange.emit(overviewItem);
    }
  }
}
