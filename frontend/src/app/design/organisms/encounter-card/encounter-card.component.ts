import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { HeadingDirective } from 'src/app/_directives/heading.directive';
import { CharacterEncounter } from 'src/app/_models/character';
import {
  Encounter,
  EncounterConnection,
  EncounterConnectionRaw,
  EncounterRaw,
} from 'src/app/_models/encounter';
import { OverviewItem } from 'src/app/_models/overview';
import { RequestState } from 'src/utils/store/factory-types';
import { HeadingLevel } from '../../atoms/_models/heading';
import { CardComponent } from '../../atoms/card/card.component';
import { HtmlTextComponent } from '../../atoms/html-text/html-text.component';
import { SpinnerComponent } from '../../atoms/spinner/spinner.component';
import { EncounterComponent } from '../encounter/encounter.component';

export type EncounterCardState = 'READ' | 'EDIT';

@Component({
  selector: 'app-encounter-card',
  imports: [
    EncounterComponent,
    CardComponent,
    HtmlTextComponent,
    SpinnerComponent,
    NgTemplateOutlet,
    HeadingDirective,
  ],
  templateUrl: './encounter-card.component.html',
  styleUrl: './encounter-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'region',
    '[attr.aria-labelledby]': 'headingId()',
  },
})
export class EncounterCardComponent {
  readonly state = input.required<EncounterCardState>();
  readonly characters = input.required<OverviewItem[]>();
  readonly locations = input.required<OverviewItem[]>();
  readonly encounter = input.required<Encounter | CharacterEncounter>();
  readonly serverModel = input.required<Encounter | undefined>();
  readonly disabled = input.required<boolean>();
  readonly updateState = input.required<RequestState>();
  readonly canUpdate = input.required<boolean>();
  readonly canCreate = input.required<boolean>();
  readonly canDelete = input.required<boolean>();
  readonly isInFocus = input.required<boolean>();
  readonly ariaLevel = input.required<HeadingLevel>();

  readonly isUpdating = computed(() => this.updateState() === 'loading');

  readonly headingId = computed(() => `encounter-heading-${this.encounter().pk}`);

  readonly connectionDelete = output<EncounterConnection>();
  readonly connectionCreate = output<EncounterConnectionRaw>();
  readonly encounterDelete = output<Encounter | CharacterEncounter>();
  readonly encounterUpdate = output<Encounter>();
  readonly encounterCreate = output<EncounterRaw>();
  readonly encounterCreateCancel = output<void>();
}
