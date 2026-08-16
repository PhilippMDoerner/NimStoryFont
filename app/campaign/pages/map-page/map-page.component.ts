import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { OverviewItem } from '../../../_models/overview';
import { RoutingService } from '../../../_services/routing.service';
import { MapComponent } from '../../../design/templates/map/map.component';
import { GlobalStore } from '../../../global.store';
import { MapPageStore } from './map-page.store';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MapComponent],
})
export class MapPageComponent {
  readonly serverUrl = '';
  readonly store = inject(MapPageStore);
  readonly globalStore = inject(GlobalStore);
  readonly routingService = inject(RoutingService);

  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    computed(() => this.store.map() == null);

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }

  mapChange(map: OverviewItem): void {
    const mapName = map.name;
    this.routingService.routeToPath('map', {
      campaign: this.globalStore.campaignName(),
      name: mapName,
    });
  }
}
