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
import { filter, mergeMap, Observable, of, skip, take } from 'rxjs';
import { filterNil } from '../../../../utils/rxjs-operators';
import { Item, ItemRaw } from '../../../_models/item';
import { OverviewItem } from '../../../_models/overview';
import { FormlyService } from '../../../_services/formly/formly-service.service';
import { RoutingService } from '../../../_services/routing.service';
import { formatSearchTerm } from '../../../design/atoms/_models/typeahead';
import { CreateUpdateState } from '../../../design/templates/_models/create-update-states';
import { CreateUpdateComponent } from '../../../design/templates/create-update/create-update.component';
import { GlobalStore } from '../../../global.store';
import { ItemCreateUpdateStore } from './item-create-update-page.store';

@Component({
  selector: 'app-item-create-update-page',
  imports: [CreateUpdateComponent],
  templateUrl: './item-create-update-page.component.html',
  styleUrl: './item-create-update-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCreateUpdatePageComponent {
  readonly globalStore = inject(GlobalStore);
  readonly store = inject(ItemCreateUpdateStore);

  private readonly route = inject(ActivatedRoute);
  private readonly routeUrlSegments = toSignal(this.route.url);
  private readonly routingService = inject(RoutingService);
  private readonly formlyService = inject(FormlyService);

  readonly campaignCharacters$ = toObservable(
    this.store.campaignCharacters,
  ).pipe(filterNil());
  readonly itemUpdateState$ = toObservable(this.store.itemUpdateState);
  readonly itemCreateState$ = toObservable(this.store.createState);
  readonly item$ = toObservable(this.store.item);

  readonly state = computed<CreateUpdateState>(() => {
    const pathSegments = this.routeUrlSegments()?.map(
      (segment) => segment.path,
    );
    const isUpdatePage = pathSegments?.includes('update');
    if (!isUpdatePage) {
      return 'CREATE';
    }

    const isOutdatedUpdate = this.store.itemServerModel() != null;
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
        } as Partial<ItemRaw>;
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return { ...this.store.item() };
    }
  });

  readonly heading = computed(() => {
    switch (this.state()) {
      case 'CREATE':
        return 'Adding a new Item';
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return `Updating Item ${this.store.item()?.name}`;
    }
  });

  readonly formlyFields = computed<FormlyFieldConfig[]>(() => [
    this.formlyService.buildInputConfig({ key: 'name', inputKind: 'NAME' }),
    this.formlyService.buildTypeaheadConfig<ItemRaw, OverviewItem>({
      key: 'owner',
      label: 'Owner',
      getOptions: () => this.campaignCharacters$,
      initialOption$: of(
        this.store
          .campaignCharacters()
          ?.find((char) => char.pk === this.userModel().owner) ?? null,
      ),
      formatSearchTerm: (searchTerm) => formatSearchTerm(searchTerm),
      optionLabelProp: 'name',
      optionValueProp: 'pk',
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
        this.routingService.routeToPath('item-overview', {
          campaign,
        });
        break;
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        this.routeToItem(this.store.item());
    }
  }

  update(item: Item) {
    this.store.updateItem(item as Item);

    this.itemUpdateState$
      .pipe(
        skip(1),
        filter((state) => state === 'success'),
        take(1),
      )
      .subscribe(() => this.routeToItem(this.store.item() as Item));
  }

  create(item: Partial<ItemRaw>) {
    // TODO: Figure out why this gets called twice sometimes
    this.store.createItem(item as ItemRaw);
    this.itemCreateState$
      .pipe(
        filter((state) => state === 'success'),
        take(1),
        mergeMap(() => this.item$),
        filterNil(),
      )
      .subscribe((item) => this.routeToItem(item as Item));
  }

  private routeToItem(item: Item | undefined) {
    if (item == null) return;

    this.routingService.routeToPath('item', {
      campaign: this.globalStore.campaignName(),
      name: item.name,
    });
  }
}
