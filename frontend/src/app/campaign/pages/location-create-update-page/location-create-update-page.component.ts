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
import { filter, map, Observable, of, skip, take } from 'rxjs';
import { Location, LocationRaw } from 'src/app/_models/location';
import { OverviewItem } from 'src/app/_models/overview';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { formatSearchTerm } from 'src/app/design/atoms/_models/typeahead';
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
  readonly globalStore = inject(GlobalStore);
  readonly store = inject(LocationCreateUpdateStore);

  private readonly route = inject(ActivatedRoute);
  private readonly routeUrlSegments = toSignal(this.route.url);
  private readonly routingService = inject(RoutingService);
  private readonly formlyService = inject(FormlyService);

  readonly campaignLocations$ = toObservable(this.store.campaignLocations).pipe(
    filterNil(),
  );
  readonly locationQueryState$ = toObservable(this.store.locationQueryState);
  readonly locationCreateState$ = toObservable(this.store.createState);
  readonly locationUpdateState$ = toObservable(this.store.locationUpdateState);

  readonly state = computed<CreateUpdateState>(() => {
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

  readonly userModel = computed(() => {
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

  readonly heading = computed(() => {
    switch (this.state()) {
      case 'CREATE':
        return 'Create Location';
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return `Updating Location ${this.store.location()?.name}`;
    }
  });

  readonly formlyFields = computed<FormlyFieldConfig[]>(() => [
    this.formlyService.buildInputConfig({ key: 'name', inputKind: 'NAME' }),
    this.formlyService.buildTypeaheadConfig<
      LocationRaw | Location,
      OverviewItem
    >({
      key: 'parent_location',
      label: 'Parent Location',
      required: false,
      getOptions: () => {
        return this.campaignLocations$.pipe(
          map((locations) =>
            locations.filter((loc) => {
              const isEmptyOption = loc.pk === undefined;
              if (isEmptyOption) {
                return true;
              }
              switch (this.state()) {
                case 'CREATE':
                  return !this.isSameLocation(loc, this.userModel());
                case 'UPDATE':
                case 'OUTDATED_UPDATE':
                  return (
                    !this.isSameLocation(loc, this.userModel()) ||
                    !this.isChildLocation(this.userModel() as Location, loc)
                  );
              }
            }),
          ),
        );
      },
      initialOption$: of(
        this.store
          .campaignLocations()
          ?.find(
            (location) => location.pk === this.userModel().parent_location,
          ) ?? null,
      ),
      optionLabelProp: 'name_full',
      optionValueProp: 'pk',
      formatSearchTerm: (searchTerm) => formatSearchTerm(searchTerm),
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
