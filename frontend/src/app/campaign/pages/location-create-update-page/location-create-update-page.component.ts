import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { filter, map, Observable, skip, take } from 'rxjs';
import { Location, LocationRaw } from 'src/app/_models/location';
import { OverviewItem } from 'src/app/_models/overview';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { CreateUpdateState } from 'src/app/design/templates/_models/create-update-states';
import { CreateUpdateComponent } from 'src/app/design/templates/create-update/create-update.component';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { LocationCreateUpdateStore } from './location-create-update-page.store';

@Component({
  selector: 'app-location-create-update-page',
  imports: [CreateUpdateComponent],
  templateUrl: './location-create-update-page.component.html',
  styleUrl: './location-create-update-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationCreateUpdatePageComponent {
  globalStore = inject(GlobalStore);
  store = inject(LocationCreateUpdateStore);

  private route = inject(ActivatedRoute);
  private routeUrlSegments = toSignal(this.route.url);
  private routingService = inject(RoutingService);
  private formlyService = inject(FormlyService);

  campaignLocations$ = toObservable(this.store.campaignLocations).pipe(
    filterNil(),
  );
  locationQueryState$ = toObservable(this.store.locationQueryState);
  locationCreateState$ = toObservable(this.store.createState);
  locationUpdateState$ = toObservable(this.store.locationUpdateState);

  state = computed<CreateUpdateState>(() => {
    const pathSegments = this.routeUrlSegments()?.map(
      (segment) => segment.path,
    );
    const isUpdatePage = pathSegments?.includes('update');
    if (!isUpdatePage) {
      return 'CREATE';
    }

    const isOutdatedUpdate = this.store.locationServerModel() != null;
    if (isOutdatedUpdate) {
      return 'OUTDATED_UPDATE';
    } else {
      return 'UPDATE';
    }
  });

  userModel = computed(() => {
    switch (this.state()) {
      case 'CREATE':
        return {
          campaign: this.globalStore.currentCampaign()?.pk,
        } as Partial<LocationRaw>;
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return { ...this.store.location() } as Location;
    }
  });

  heading = computed(() => {
    switch (this.state()) {
      case 'CREATE':
        return 'Create Location';
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return `Updating Location ${this.store.location()?.name}`;
    }
  });

  formlyFields = computed<FormlyFieldConfig[]>(() => [
    this.formlyService.buildInputConfig({ key: 'name', inputKind: 'NAME' }),
    this.formlyService.buildDisableSelectConfig<
      LocationRaw | Location,
      OverviewItem
    >({
      key: 'parent_location',
      label: 'Parent Location',
      options$: this.campaignLocations$,
      sortProp: 'name_full',
      labelProp: 'name_full',
      campaign: this.globalStore.campaignName(),
      required: false,
      disabledExpression: (locations$: Observable<OverviewItem[]>) => {
        return locations$.pipe(
          map((locations) => {
            return locations.map((loc) => {
              const isEmptyOption = loc.pk === undefined;
              if (isEmptyOption) {
                return false;
              }
              switch (this.state()) {
                case 'CREATE':
                  return this.isSameLocation(loc, this.userModel());
                case 'UPDATE':
                case 'OUTDATED_UPDATE':
                  return (
                    this.isSameLocation(loc, this.userModel()) ||
                    this.isChildLocation(this.userModel() as Location, loc)
                  );
              }
            });
          }),
        );
      },
      tooltipMessage:
        "The location that contains this new location, e.g. the location 'Mayor's House' within the location 'Small city Lundorf'",
      warningMessage:
        "The location you selected can't have the same name as the location that is trying to contain it! That would mean that this location contained itself!",
    }),
  ]);

  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    computed(
      () => this.userModel() == null || this.globalStore.campaignName() == null,
    );

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }

  cancel() {
    const campaign = this.globalStore.campaignName();
    switch (this.state()) {
      case 'CREATE':
        this.routingService.routeToPath('location-overview', {
          campaign,
        });
        break;
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        this.routeToLocation(this.store.location() as Location);
    }
  }

  update(location: Location) {
    this.store.updateLocation(location);

    this.locationUpdateState$
      .pipe(
        skip(1),
        filter((state) => state === 'success'),
        take(1),
      )
      .subscribe(() => this.routeToLocation(location));
  }

  create(location: Partial<LocationRaw>) {
    this.store.createLocation(location as LocationRaw);

    this.locationCreateState$
      .pipe(
        filter((state) => state === 'success'),
        take(1),
      )
      .subscribe(() => this.routeToLocation(this.store.location() as Location));
  }

  private routeToLocation(location: Location) {
    this.routingService.routeToPath('location', {
      campaign: this.globalStore.campaignName(),
      parent_name: location?.parent_location_details?.name,
      name: location?.name,
    });
  }

  private isSameLocation(
    location1: Location | Partial<LocationRaw> | undefined,
    location2: Location | Partial<LocationRaw> | undefined,
  ): boolean {
    return location1?.name === location2?.name;
  }

  private isChildLocation(
    parentLocation: Location | undefined,
    childLocation: Location | Partial<LocationRaw> | undefined,
  ): boolean {
    if (!childLocation || !('pk' in childLocation)) return false;

    return childLocation?.parent_location === parentLocation?.pk;
  }
}
