import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { NgbAccordionModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { HeadingDirective } from 'src/app/_directives/heading.directive';
import { CharacterEncounter } from 'src/app/_models/character';
import { Encounter, EncounterConnection } from 'src/app/_models/encounter';
import { OverviewItem } from 'src/app/_models/overview';
import { EncounterComponent } from '../encounter/encounter.component';

@Component({
  selector: 'app-encounter-accordion',
  templateUrl: './encounter-accordion.component.html',
  styleUrls: ['./encounter-accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgbAccordionModule,
    EncounterComponent,
    HeadingDirective,
    NgbPagination,
    NgTemplateOutlet,
  ],
})
export class EncounterAccordionComponent {
  readonly encounters = input.required<(Encounter | CharacterEncounter)[]>();
  readonly campaignLocations = input.required<OverviewItem[]>();
  readonly campaignCharacters = input.required<OverviewItem[]>();
  readonly serverModel = input<Encounter>();
  readonly canUpdate = input(false);
  readonly canCreate = input(false);
  readonly canDelete = input(false);

  protected readonly page = signal(1);
  protected readonly PAGE_SIZE = 5;
  protected readonly displayedEncounters = computed(() => {
    const pageIndex = this.page() - 1;
    const startIndex = pageIndex * this.PAGE_SIZE;
    const endIndex = startIndex + this.PAGE_SIZE;
    return this.encounters().slice(startIndex, endIndex);
  });

  readonly connectionDelete = output<EncounterConnection>();
  readonly connectionCreate = output<EncounterConnection>();
  readonly encounterDelete = output<Encounter | CharacterEncounter>();
  readonly encounterUpdate = output<Encounter | CharacterEncounter>();
}
