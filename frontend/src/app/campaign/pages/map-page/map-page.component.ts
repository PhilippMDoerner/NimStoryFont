import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { OverviewItem } from 'src/app/_models/overview';
import { RoutingService } from 'src/app/_services/routing.service';
import { MapComponent } from 'src/app/design/templates/map/map.component';
import { GlobalStore } from 'src/app/global.store';
import { environment } from 'src/environments/environment';
import { MapPageStore } from './map-page.store';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MapComponent],
})
export class MapPageComponent {
  serverUrl = environment.backendDomain;
  store = inject(MapPageStore);
  globalStore = inject(GlobalStore);
  routingService = inject(RoutingService);

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
