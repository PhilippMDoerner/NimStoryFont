import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, Observable, take } from 'rxjs';
import { Location } from 'src/app/_models/location';
import { RoutingService } from 'src/app/_services/routing.service';
import { LocationTemplateComponent } from 'src/app/design/templates/location-template/location-template.component';
import { GlobalStore } from 'src/app/global.store';
import { environment } from 'src/environments/environment';
import { LocationPageStore } from './location-page.store';

@Component({
  selector: 'app-location-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LocationTemplateComponent],
  templateUrl: './location-page.component.html',
  styleUrl: './location-page.component.scss',
})
export class LocationPageComponent {
  serverUrl = environment.backendDomain;
  globalStore = inject(GlobalStore);
  store = inject(LocationPageStore);
  routingService = inject(RoutingService);

  locationDeleteState$ = toObservable(this.store.locationDeleteState);

  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    computed(() => this.store.location() == null);

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }

  onLocationDelete(location: Location) {
    this.store.deleteLocation(location.pk as number);
    this.locationDeleteState$
      .pipe(
        filter((state) => state === 'success'),
        take(1),
      )
      .subscribe(() => {
        this.routingService.routeToPath('location-overview', {
          campaign: this.globalStore.campaignName(),
        });
      });
  }
}
