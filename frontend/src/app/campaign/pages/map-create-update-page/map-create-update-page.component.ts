import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { filter, mergeMap, skip, take } from 'rxjs';
import { Map, MapRaw } from 'src/app/_models/map';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { CreateUpdateState } from 'src/app/design/templates/_models/create-update-states';
import { CreateUpdateComponent } from 'src/app/design/templates/create-update/create-update.component';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { MapCreateUpdateStore } from './map-create-update-page.store';

@Component({
  selector: 'app-map-create-update-page',
  imports: [CreateUpdateComponent],
  templateUrl: './map-create-update-page.component.html',
  styleUrl: './map-create-update-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapCreateUpdatePageComponent {
  globalStore = inject(GlobalStore);
  store = inject(MapCreateUpdateStore);

  private route = inject(ActivatedRoute);
  private routeUrlSegments = toSignal(this.route.url);
  private routingService = inject(RoutingService);
  private formlyService = inject(FormlyService);

  private mapUpdateState$ = toObservable(this.store.mapUpdateState);
  private mapCreateState$ = toObservable(this.store.mapCreateState);
  private map$ = toObservable(this.store.map);

  state = computed<CreateUpdateState>(() => {
    const pathSegments = this.routeUrlSegments()?.map(
      (segment) => segment.path,
    );
    const isUpdatePage = pathSegments?.includes('update');
    if (!isUpdatePage) {
      return 'CREATE';
    }

    const isOutdatedUpdate = this.store.mapServerModel() != null;
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
        } as Partial<MapRaw>;
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return { ...this.store.map() };
    }
  });

  heading = computed(() => {
    switch (this.state()) {
      case 'CREATE':
        return 'Adding a new Map';
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return `Updating Map ${this.store.map()?.name}`;
    }
  });

  formlyFields = computed<FormlyFieldConfig[]>(() => [
    this.formlyService.buildInputConfig({
      key: 'name',
      inputKind: 'NAME',
      required: true,
    }),
    // this.formlyService.buildInputConfig({
    //   key: 'icon',
    //   label: 'Map Icon',
    //   validators: ['faPrefix'],
    //   inputKind: 'STRING',
    //   required: false,
    // }),
    this.formlyService.buildFileFieldConfig({
      key: 'image',
      label: 'Map Image',
      required: this.state() === 'CREATE',
    }),
  ]);

  private readonly isPageLoading = computed(
    () => this.userModel() == null || this.globalStore.campaignName() == null,
  );

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }

  cancel() {
    const campaign = this.globalStore.campaignName();
    switch (this.state()) {
      case 'CREATE':
        this.routingService.routeToPath('default-map', { campaign });
        break;
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        this.routeToMap(this.store.map());
    }
  }

  update(map: Map) {
    this.store.updateMap(map as Map);

    this.mapUpdateState$
      .pipe(
        skip(1),
        filter((state) => state === 'success'),
        take(1),
      )
      .subscribe(() => this.routeToMap(this.store.map() as Map));
  }

  create(map: Partial<MapRaw>) {
    this.store.createMap(map as MapRaw);
    this.mapCreateState$
      .pipe(
        filter((state) => state === 'success'),
        take(1),
        mergeMap(() => this.map$),
        filterNil(),
      )
      .subscribe((map) => this.routeToMap(map as Map));
  }

  private routeToMap(map: Map | undefined) {
    if (map == null) return;

    this.routingService.routeToPath('map', {
      campaign: this.globalStore.campaignName(),
      name: map.name,
    });
  }
}
