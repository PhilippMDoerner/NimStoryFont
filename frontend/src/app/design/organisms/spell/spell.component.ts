import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PlayerClass } from 'src/app/_models/playerclass';
import {
  Spell,
  SPELL_CASTING_TIME,
  SPELL_COMPONENTS,
  SPELL_DURATION,
  SPELL_LEVELS,
  SPELL_RANGES,
  SPELL_SAVES,
  SPELL_SCHOOLS,
  SpellPlayerClassConnection,
} from 'src/app/_models/spell';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { ElementKind } from 'src/app/design/atoms/_models/button';
import { HtmlTextComponent } from 'src/app/design/atoms/html-text/html-text.component';
import { SeparatorComponent } from 'src/app/design/atoms/separator/separator.component';
import {
  BadgeListComponent,
  BadgeListEntry,
  CompareFormComponent,
  ConfirmationToggleButtonComponent,
  EditToggleComponent,
  FormComponent,
} from 'src/app/design/molecules';

type SpellState = 'DISPLAY' | 'CREATE' | 'UPDATE' | 'OUTDATED_UPDATE';

@Component({
  selector: 'app-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./spell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    EditToggleComponent,
    HtmlTextComponent,
    SeparatorComponent,
    BadgeListComponent,
    ConfirmationToggleButtonComponent,
    FormComponent,
    CompareFormComponent,
  ],
})
export class SpellComponent implements OnInit {
  spell = input.required<Spell | undefined>();
  playerClasses = input.required<PlayerClass[]>();
  canUpdate = input.required<boolean>();
  canDelete = input.required<boolean>();
  canCreate = input.required<boolean>();
  serverModel = input.required<Spell | undefined>();
  cancelButtonType = input<ElementKind>('SECONDARY');
  submitButtonType = input<ElementKind>('PRIMARY');
  disabledHotkeys = input<boolean>(false);

  readonly spellDelete = output<Spell>();
  readonly spellCreate = output<Spell>();
  readonly spellUpdate = output<Spell>();
  readonly spellCreateCancel = output<void>();
  readonly connectionDelete = output<SpellPlayerClassConnection>();
  readonly connectionCreate = output<SpellPlayerClassConnection>();

  userModel = signal<Spell | undefined>(undefined);
  state = signal<SpellState>('DISPLAY');
  playerClassConnections = computed<
    BadgeListEntry<SpellPlayerClassConnection>[]
  >(() => {
    const classConnections: SpellPlayerClassConnection[] =
      this.spell()?.player_class_connections ?? [];

    return classConnections.map((con) => {
      return {
        badgeValue: con,
        text: con.player_class_details?.name as string,
        link: undefined,
      };
    });
  });

  playerClassOptions = computed<PlayerClass[]>(() => {
    const playerClassInSpell = new Set(
      this.playerClassConnections().map((con) => con.badgeValue.player_class),
    );
    return this.playerClasses().filter(
      (playerClass) =>
        playerClass.pk && !playerClassInSpell.has(playerClass.pk),
    );
  });

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.buildCheckboxConfig({
      key: 'concentration',
      label: 'Concentration',
      defaultValue: false,
      required: false,
    }),
    this.formlyService.buildCheckboxConfig({
      key: 'ritual',
      defaultValue: false,
      required: false,
    }),
    this.formlyService.buildInputConfig({
      key: 'name',
      inputKind: 'NAME',
    }),
    this.formlyService.buildStaticSelectConfig({
      key: 'spell_level',
      label: 'Spell Level',
      options: SPELL_LEVELS,
    }),
    this.formlyService.buildStaticSelectConfig({
      key: 'casting_time',
      label: 'Casting Time',
      options: SPELL_CASTING_TIME,
    }),
    this.formlyService.buildStaticSelectConfig({
      key: 'duration',
      options: SPELL_DURATION,
    }),
    this.formlyService.buildStaticSelectConfig({
      key: 'range',
      options: SPELL_RANGES,
    }),
    this.formlyService.buildStaticSelectConfig({
      key: 'components',
      options: SPELL_COMPONENTS,
    }),
    this.formlyService.buildStaticSelectConfig({
      key: 'school',
      options: SPELL_SCHOOLS,
    }),
    this.formlyService.buildStaticSelectConfig({
      key: 'saving_throw',
      label: 'Saving Throw',
      options: SPELL_SAVES,
      required: false,
    }),
    this.formlyService.buildInputConfig({
      key: 'damage',
      label: 'Effect',
      maxLength: 40,
      required: false,
      inputKind: 'STRING',
    }),
    this.formlyService.buildEditorConfig({
      key: 'description',
      required: false,
    }),
  ];

  constructor(private formlyService: FormlyService) {}

  ngOnInit(): void {
    const isInCreateScenario = this.spell()?.pk == null && this.canCreate();
    if (isInCreateScenario) {
      this.changeState('CREATE', this.spell());
    }
  }

  onToggle(toggled: boolean) {
    const isInCreateScenario = this.state() === 'CREATE';
    if (isInCreateScenario) {
      this.onSpellCreateCancel();
      return;
    }

    const isInDisplayState = this.state() === 'DISPLAY';
    const nextState = isInDisplayState ? 'UPDATE' : 'DISPLAY';
    const nextModel: Spell | undefined = toggled
      ? ({ ...this.spell() } as Spell)
      : undefined;
    this.changeState(nextState, nextModel);
  }

  changeState(newState: SpellState, newModel: Spell | undefined) {
    this.state.set(newState);
    this.userModel.set({ ...newModel } as Spell);
  }

  onSpellCreate(spell?: Spell) {
    this.spellCreate.emit(spell as Spell);
    this.changeState('DISPLAY', undefined);
  }

  onSpellDelete() {
    this.spellDelete.emit(this.spell() as Spell);
  }

  onSpellUpdate(spell?: Spell) {
    this.spellUpdate.emit(spell as Spell);
    this.changeState('DISPLAY', undefined);
  }

  onConnectionCreate(selectedClass: PlayerClass) {
    const connection: SpellPlayerClassConnection = {
      spell: this.spell()?.pk as number,
      player_class: selectedClass.pk as number,
    };
    this.connectionCreate.emit(connection);
  }

  onSpellCreateCancel() {
    this.changeState('DISPLAY', undefined);
    this.spellCreateCancel.emit();
  }
}
