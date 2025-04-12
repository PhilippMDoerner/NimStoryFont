import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Creature } from 'src/app/_models/creature';
import { RoutingService } from 'src/app/_services/routing.service';
import { CreatureComponent } from 'src/app/design/templates/creature/creature.component';
import { GlobalStore } from 'src/app/global.store';
import { environment } from 'src/environments/environment';
import { CreaturePageStore } from './creature-page.store';

@Component({
  selector: 'app-creature-page',
  imports: [CreatureComponent],
  templateUrl: './creature-page.component.html',
  styleUrl: './creature-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreaturePageComponent {
  serverUrl = environment.backendDomain;
  globalStore = inject(GlobalStore);
  store = inject(CreaturePageStore);
  routingService = inject(RoutingService);

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
