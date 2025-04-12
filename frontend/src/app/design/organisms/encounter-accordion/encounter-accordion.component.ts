import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
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
  imports: [NgbAccordionModule, EncounterComponent, HeadingDirective],
})
export class EncounterAccordionComponent {
  encounters = input.required<(Encounter | CharacterEncounter)[]>();
  campaignLocations = input.required<OverviewItem[]>();
  campaignCharacters = input.required<OverviewItem[]>();
  serverModel = input<Encounter>();
  canUpdate = input(false);
  canCreate = input(false);
  canDelete = input(false);

  readonly connectionDelete = output<EncounterConnection>();
  readonly connectionCreate = output<EncounterConnection>();
  readonly encounterDelete = output<Encounter | CharacterEncounter>();
  readonly encounterUpdate = output<Encounter | CharacterEncounter>();
}
