import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, Observable, skip, take } from 'rxjs';
import { Creature, CreatureRaw } from 'src/app/_models/creature';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { CreateUpdateState } from 'src/app/design/templates/_models/create-update-states';
import { CreateUpdateComponent } from 'src/app/design/templates/create-update/create-update.component';
import { GlobalStore } from 'src/app/global.store';
import { CreatureUpdateCreateStore } from './creature-update-create-page.store';

@Component({
  selector: 'app-creature-update-create',
  imports: [CreateUpdateComponent],
  templateUrl: './creature-update-create-page.component.html',
  styleUrl: './creature-update-create-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatureUpdateCreateComponent {
  readonly store = inject(CreatureUpdateCreateStore);
  readonly globalStore = inject(GlobalStore);
  private readonly route = inject(ActivatedRoute);
  private readonly routeUrlSegments = toSignal(this.route.url);
  private readonly routingService = inject(RoutingService);
  private readonly formlyService = inject(FormlyService);

  readonly state = computed<CreateUpdateState>(() => {
    const pathSegments = this.routeUrlSegments()?.map(
      (segment) => segment.path,
    );
    const isUpdatePage = pathSegments?.includes('update');
    if (!isUpdatePage) {
      return 'CREATE';
    }

    const isOutdatedUpdate = this.store.serverModel() != null;
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
        } as Partial<CreatureRaw>;
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return { ...this.store.creature() };
    }
  });

  readonly heading = computed<string>(() => {
    switch (this.state()) {
      case 'CREATE':
        return 'Adding a new Creature';
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return `Updating Creature ${this.store.creature()?.name}`;
    }
  });

  readonly formlyFields = [
    this.formlyService.buildInputConfig({ key: 'name', inputKind: 'NAME' }),
  ];

  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    computed(
      () => this.userModel() == null || this.globalStore.campaignName() == null,
    );

  private readonly creatureQueryState$ = toObservable(this.store.creatureQueryState);

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }

  cancel() {
    const campaign = this.globalStore.campaignName();
    switch (this.state()) {
      case 'CREATE':
        return this.routingService.routeToPath('creature-overview', {
          campaign,
        });
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return this.routingService.routeToPath('creature', {
          campaign,
          name: this.store.creature()?.name,
        });
    }
  }

  update(creature: CreatureRaw) {
    this.store.updateCreature(creature as Creature);

    this.creatureQueryState$
      .pipe(
        skip(1),
        filter((state) => state === 'success'),
        take(1),
      )
      .subscribe(() => this.routeToCreature(creature as Creature));
  }

  create(creature: Partial<CreatureRaw>) {
    this.store.createCreature({
      campaign: creature.campaign!,
      name: creature.name!,
    });

    this.creatureQueryState$
      .pipe(
        skip(1),
        filter((state) => state === 'success'),
        take(1),
      )
      .subscribe(() => this.routeToCreature(this.store.creature()!));
  }

  private routeToCreature(creature: Creature) {
    this.routingService.routeToPath('creature', {
      campaign: this.globalStore.campaignName(),
      name: creature.name,
    });
  }
}
