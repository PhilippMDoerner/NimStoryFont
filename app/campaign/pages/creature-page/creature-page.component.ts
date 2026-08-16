import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Creature } from '../../../_models/creature';
import { RoutingService } from '../../../_services/routing.service';
import { CreatureComponent } from '../../../design/templates/creature/creature.component';
import { GlobalStore } from '../../../global.store';
import { CreaturePageStore } from './creature-page.store';

@Component({
  selector: 'app-creature-page',
  imports: [CreatureComponent],
  templateUrl: './creature-page.component.html',
  styleUrl: './creature-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreaturePageComponent {
  readonly serverUrl = '';
  readonly globalStore = inject(GlobalStore);
  readonly store = inject(CreaturePageStore);
  readonly routingService = inject(RoutingService);

  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    computed(() => this.store.creature() == null);

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
    this.routeToOverviewOnMissingArticle();
  }

  deleteCreature(creature: Creature) {
    this.store.deleteCreature(creature);
    this.routingService.routeToPath('creature-overview', {
      campaign: this.globalStore.campaignName(),
    });
  }

  private routeToOverviewOnMissingArticle() {
    effect(() => {
      const creatureDoesNotExist = this.store.creatureError()?.status === 404;
      if (creatureDoesNotExist) {
        this.routingService.routeToPath('creature-overview', {
          campaign: this.globalStore.campaignName(),
        });
      }
    });
  }
}
