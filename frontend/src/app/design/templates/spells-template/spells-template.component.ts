import { Component, computed, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlayerClass } from 'src/app/_models/playerclass';
import {
  Spell,
  SpellPlayerClassConnection,
  SpellRaw,
} from 'src/app/_models/spell';
import { RoutingService } from 'src/app/_services/routing.service';
import { BadgeComponent } from '../../atoms/badge/badge.component';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';
import { SpellsComponent } from '../../organisms/spells/spells.component';

@Component({
  selector: 'app-spells-template',
  templateUrl: './spells-template.component.html',
  styleUrls: ['./spells-template.component.scss'],
  imports: [
    PageContainerComponent,
    BadgeComponent,
    SpellsComponent,
    RouterLink,
    ButtonLinkComponent,
  ],
})
export class SpellsTemplateComponent {
  campaignName = input.required<string>();
  campaignId = input.required<number>();
  spells = input.required<Spell[]>();
  playerClasses = input.required<PlayerClass[]>();
  canUpdate = input.required<boolean>();
  canDelete = input.required<boolean>();
  canCreate = input.required<boolean>();
  serverModel = input.required<Spell | undefined>();

  readonly spellDelete = output<Spell>();
  readonly spellUpdate = output<Spell>();
  readonly spellCreate = output<SpellRaw>();
  readonly connectionDelete = output<SpellPlayerClassConnection>();
  readonly connectionCreate = output<SpellPlayerClassConnection>();

  homeUrl = computed(() =>
    this.routingService.getRoutePath('home', {
      campaign: this.campaignName,
    }),
  );
  filteredSpells = computed<Spell[]>(() => {
    const hasSelectedClasses = this.selectedClassNames().size > 0;
    if (!hasSelectedClasses) {
      return this.spells();
    }

    return this.spells().filter((spell) => {
      const classNames = spell.player_class_connections.map(
        (con) => con.player_class_details?.name,
      );
      return classNames.some((name) =>
        this.selectedClassNames().has(name ?? ''),
      );
    });
  });

  selectedClassNames = signal(new Set<string>());

  constructor(private routingService: RoutingService) {}

  onClassAdd(playerClass: PlayerClass): void {
    const newSet = new Set(this.selectedClassNames());
    newSet.add(playerClass.name);
    this.selectedClassNames.set(newSet);
  }

  onClassRemove(className: string): void {
    const newSet = new Set(this.selectedClassNames());
    newSet.delete(className);
    this.selectedClassNames.set(newSet);
  }
}
