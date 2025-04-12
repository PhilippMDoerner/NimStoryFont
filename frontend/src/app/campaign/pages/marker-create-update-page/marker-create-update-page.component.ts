import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { filter, mergeMap, take } from 'rxjs';
import { MapMarker, MapMarkerRaw } from 'src/app/_models/mapMarker';
import { OverviewItem } from 'src/app/_models/overview';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { CreateUpdateComponent } from 'src/app/design//templates/create-update/create-update.component';
import { CreateUpdateState } from 'src/app/design/templates/_models/create-update-states';
import { GlobalStore } from 'src/app/global.store';
import { NavigationStore } from 'src/app/navigation.store';
import { filterNil, takeOnceOrUntilDestroyed } from 'src/utils/rxjs-operators';
import { MarkerCreateUpdateStore } from './marker-create-update-page.store';

@Component({
  selector: 'app-marker-create-update-page',
  imports: [CreateUpdateComponent],
  templateUrl: './marker-create-update-page.component.html',
  styleUrl: './marker-create-update-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkerCreateUpdatePageComponent {
  formlyService = inject(FormlyService);
  store = inject(MarkerCreateUpdateStore);
  globalStore = inject(GlobalStore);
  navigationStore = inject(NavigationStore);
  router = inject(Router);
  destroyer = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private params = toSignal(this.route.params);
  private routingService = inject(RoutingService);

  campaignLocations$ = toObservable(this.store.campaignLocations).pipe(
    filterNil(),
  );
  campaignMaps$ = toObservable(this.store.campaignMaps).pipe(filterNil());
  markerTypes$ = toObservable(this.store.markerTypes).pipe(filterNil());
  createMarkerState$ = toObservable(this.store.createMarkerState);
  updateMarkerState$ = toObservable(this.store.markerUpdateState);
  marker$ = toObservable(this.store.marker).pipe(filterNil());

  formlyFields = computed<FormlyFieldConfig[]>(() => [
    this.formlyService.buildInputConfig({
      key: 'latitude',
      inputKind: 'NUMBER',
    }),
    this.formlyService.buildInputConfig({
      key: 'longitude',
      inputKind: 'NUMBER',
    }),
    this.formlyService.buildOverviewSelectConfig({
      key: 'location',
      sortProp: 'name_full',
      labelProp: 'name_full',
      options$: this.campaignLocations$,
      campaign: this.globalStore.campaignName(),
    }),
    this.formlyService.buildOverviewSelectConfig({
      key: 'map',
      options$: this.campaignMaps$,
      labelProp: 'name',
      campaign: this.globalStore.campaignName(),
    }),
    this.formlyService.buildOverviewSelectConfig({
      key: 'type',
      label: 'Marker Type',
      labelProp: 'name',
      valueProp: 'id',
      options$: this.markerTypes$,
      campaign: this.globalStore.campaignName(),
    }),
    this.formlyService.buildInputConfig({
      inputKind: 'COLOR',
      key: 'color',
      label: 'Custom Color',
      required: false,
    }),
    this.formlyService.buildInputConfig({
      inputKind: 'STRING',
      key: 'icon',
      label: 'Custom Icon (https://fontawesome.com/v6/search?o=r&m=free)',
      required: false,
    }),
  ]);

  state = computed<CreateUpdateState>(() => {
    const pathSegments = this.route.snapshot.url?.map(
      (segment) => segment.path,
    );
    const isUpdatePage = pathSegments?.includes('update');
    if (!isUpdatePage) {
      return 'CREATE';
    }

    const isOutdatedUpdate = this.store.markerServerModel() != null;
    if (isOutdatedUpdate) {
      return 'OUTDATED_UPDATE';
    } else {
      return 'UPDATE';
    }
  });

  userModel = computed(() => {
    switch (this.state()) {
      case 'CREATE': {
        const location = this.getPreselectedLocation();
        const map = this.getPreselectedMap();
        const longitudeParam = this.params()?.['longitude'] as
          | number
          | undefined;
        const longitude = longitudeParam
          ? Math.round(longitudeParam)
          : undefined;
        const latitudeParam = this.params()?.['latitude'] as number | undefined;
        const latitude = latitudeParam ? Math.round(latitudeParam) : undefined;

        return {
          campaign: this.globalStore.currentCampaign()?.pk,
          map: map?.pk,
          location: location?.pk,
          latitude,
          longitude,
        } as Partial<MapMarkerRaw>;
      }
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return { ...this.store.marker() };
    }
  });

  heading = computed(() => {
    switch (this.state()) {
      case 'CREATE':
        return 'Adding a new Marker';
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return `Updating Marker for ${this.store.marker()?.location_details?.name}`;
    }
  });

  private readonly isPageLoading = computed(
    () => this.userModel() == null || this.globalStore.campaignName() == null,
  );

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }

  cancel() {
    const campaign = this.globalStore.campaignName();
    switch (this.state()) {
      case 'CREATE': {
        const fallbackUrl = this.routingService.getRoutePath(
          'location-overview',
          { campaign },
        );
        this.router.navigateByUrl(
          this.navigationStore.priorUrl() ?? fallbackUrl,
        );
        break;
      }
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        this.routeToItem(this.store.marker());
    }
  }

  update(marker: MapMarker) {
    this.updateMarkerState$
      .pipe(
        filter((state) => state === 'success'),
        takeOnceOrUntilDestroyed(this.destroyer),
      )
      .subscribe(() => this.routeToItem(this.store.marker()));
    this.store.updateMarker(marker);
  }

  create(item: Partial<MapMarkerRaw>) {
    this.store.createMarker(item as MapMarkerRaw);
    this.createMarkerState$
      .pipe(
        filter((state) => state === 'success'),
        take(1),
        mergeMap(() => this.marker$),
      )
      .subscribe((marker) => this.routeToItem(marker));
  }

  private routeToItem(item: MapMarker | undefined) {
    if (item == null) return;

    this.routingService.routeToPath('marker', {
      campaign: this.globalStore.campaignName(),
      parent_location_name: item.location_details?.parent_location_name,
      location_name: item.location_details?.name,
      map_name: item.map_details?.name,
    });
  }

  private getPreselectedLocation(): OverviewItem | undefined {
    const locationName = this.params()?.['location_name'];
    const parentLocationName = this.params()?.['parent_location_name'];
    if (locationName == null || parentLocationName == null) return undefined;

    return this.store
      .campaignLocations()
      ?.find(
        (loc) =>
          loc.name === locationName &&
          loc.parent_location_details?.name === parentLocationName,
      );
  }

  private getPreselectedMap(): OverviewItem | undefined {
    const mapName = this.params()?.['map_name'];
    if (mapName == null) return undefined;

    return this.store.campaignMaps()?.find((map) => map.name === mapName);
  }
}
