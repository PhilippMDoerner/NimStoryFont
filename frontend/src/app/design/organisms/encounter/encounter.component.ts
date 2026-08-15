import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { interval, of, take } from 'rxjs';
import { withViewTransition } from '../../../../utils/animation';
import { componentId } from '../../../../utils/DOM';
import { filterNil } from '../../../../utils/rxjs-operators';
import { RequestState } from '../../../../utils/store/factory-types';
import { HeadingDirective } from '../../../_directives/heading.directive';
import { CharacterEncounter } from '../../../_models/character';
import {
  Encounter,
  EncounterConnection,
  EncounterConnectionRaw,
  EncounterRaw,
} from '../../../_models/encounter';
import { FormState } from '../../../_models/form';
import { OverviewItem } from '../../../_models/overview';
import { FormlyService } from '../../../_services/formly/formly-service.service';
import { RoutingService } from '../../../_services/routing.service';
import { SeparatorComponent } from '../../../design/atoms/separator/separator.component';
import {
  BadgeListComponent,
  BadgeListEntry,
  CompareFormComponent,
  FormComponent,
} from '../../../design/molecules';
import { HeadingLevel } from '../../atoms/_models/heading';
import { formatSearchTerm } from '../../atoms/_models/typeahead';
import {
  DEFAULT_DELETE_MODAL_DATA,
  MenuItem,
} from '../../molecules/_models/menu';
import { ContextMenuComponent } from '../../molecules/context-menu/context-menu.component';
import {
  EditorComponent,
  TextFieldState,
} from '../../molecules/editor/editor.component';

const UPDATE_MARKER_TIMEOUT_MS = 3000;

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    SeparatorComponent,
    BadgeListComponent,
    FormComponent,
    CompareFormComponent,
    NgbTooltipModule,
    EditorComponent,
    ContextMenuComponent,
    HeadingDirective,
  ],
})
export class EncounterComponent implements OnInit {
  readonly destroyRef = inject(DestroyRef);

  readonly characters = input.required<OverviewItem[]>();
  readonly locations = input.required<OverviewItem[]>();
  readonly updateState = input<RequestState>();
  readonly encounter = input<Encounter | CharacterEncounter>();
  readonly serverModel = input<Encounter>();
  readonly canUpdate = input(false);
  readonly canCreate = input(false);
  readonly canDelete = input(false);
  readonly initialCardState = input<FormState>('DISPLAY');
  readonly isInFocus = input.required<boolean>();
  readonly headingId = input.required<string>();
  readonly ariaLevel = input.required<HeadingLevel>();

  readonly component = inject(ElementRef);

  readonly connectionDelete = output<EncounterConnection>();
  readonly connectionCreate = output<EncounterConnectionRaw>();
  readonly encounterDelete = output<Encounter>();
  readonly encounterUpdate = output<Encounter>();
  readonly encounterCreate = output<EncounterRaw>();
  readonly encounterCreateCancel = output<void>();

  readonly userModel = signal<Encounter | Partial<EncounterRaw>>({});
  readonly cardState = signal<FormState>('DISPLAY');
  readonly textFieldState = signal<TextFieldState>('DISPLAY');
  readonly badgeEntries = computed<BadgeListEntry<EncounterConnection>[]>(
    () => {
      const encounterConnections = this.encounter()?.encounterConnections ?? [];
      return this.parseConnection(encounterConnections);
    },
  );
  readonly campaignName = computed(
    () => this.encounter()?.campaign_details?.name,
  );
  readonly contextMenuItems = computed<MenuItem[]>(() => {
    const menuItems: MenuItem[] = [];
    if (this.canUpdate()) {
      const isEditingMetadata =
        this.cardState() === 'UPDATE' || this.cardState() === 'OUTDATEDUPDATE';
      menuItems.push({
        kind: 'BUTTON',
        label: isEditingMetadata ? 'Cancel Edit' : 'Edit Metadata',
        actionName: 'edit-metadata',
        active: isEditingMetadata,
        hotkeyAction: this.isInFocus() ? 'update' : undefined,
        icon: isEditingMetadata ? 'times' : 'file-pen',
      });

      const isEditingDescription =
        this.cardState() === 'DISPLAY' &&
        (this.textFieldState() === 'UPDATE' ||
          this.textFieldState() === 'OUTDATED_UPDATE');
      menuItems.push({
        kind: 'BUTTON',
        label: isEditingDescription ? 'Cancel Edit' : 'Edit Description',
        actionName: 'edit-description',
        active: isEditingDescription,
        hotkeyAction: this.isInFocus() ? 'description-update' : undefined,
        icon: isEditingDescription ? 'times' : 'pencil',
      });
    }

    if (this.canDelete()) {
      menuItems.push({
        kind: 'CONFIRM',
        actionName: 'delete',
        label: `Delete`,
        hotkeyAction: this.isInFocus() ? 'delete' : undefined,
        icon: 'trash',
        modal: {
          ...DEFAULT_DELETE_MODAL_DATA,
          heading: `Delete encounter "${this.encounter()?.title}"?`,
          body: `Are you sure you want to delete this encounter?`,
        },
      });
    }

    return menuItems;
  });

  readonly locations$ = toObservable(this.locations).pipe(filterNil());
  readonly formlyFields = computed<FormlyFieldConfig[]>(() => [
    this.formlyService.buildInputConfig({
      key: 'title',
      inputKind: 'STRING',
    }),
    this.formlyService.buildTypeaheadConfig<EncounterRaw, OverviewItem>({
      key: 'location',
      label: 'Encounter Location',
      getOptions: () => this.locations$,
      initialOption$: of({
        name_full: this.encounter()?.location_details?.name_full,
        pk: this.encounter()?.location,
      }),
      formatSearchTerm: (searchTerm) => formatSearchTerm(searchTerm),
      optionLabelProp: 'name_full',
      optionValueProp: 'pk',
    }),
  ]);
  readonly editorId = componentId();

  constructor(
    private routingService: RoutingService,
    private formlyService: FormlyService,
  ) {}

  ngOnInit(): void {
    const isInCreateScenario =
      this.initialCardState() === 'CREATE' && this.canCreate();
    const model = isInCreateScenario ? {} : undefined;
    this.cardState.set(this.initialCardState());
    this.userModel.set({ ...model });
  }

  changeState(newState: FormState, newModel: Partial<Encounter> | undefined) {
    withViewTransition(() => {
      this.cardState.set(newState);
      this.userModel.set({ ...newModel });
    });
  }

  onEncounterCreate(encounter: Partial<EncounterRaw> | Encounter) {
    this.encounterCreate.emit({
      ...this.encounter(),
      ...encounter,
    } as EncounterRaw);
    this.changeState('DISPLAY', encounter);
  }

  onEncounterDelete() {
    this.encounterDelete.emit(this.encounter() as Encounter);
    this.changeState('DISPLAY', undefined);
  }

  onEncounterUpdate(encounter: Encounter | Partial<Encounter>) {
    this.encounterUpdate.emit(encounter as Encounter);
    this.changeState('DISPLAY', undefined);
  }

  saveDescription(newDescription: string) {
    const updatedEncounter: Encounter = {
      ...(this.encounter() as Encounter),
      description: newDescription,
    };
    this.encounterUpdate.emit(updatedEncounter);
  }

  onDescriptionUpdateFinished(newDescription: string) {
    this.saveDescription(newDescription);
    this.toDisplayState();
  }

  onEncounterCreateCancel() {
    this.encounterCreateCancel.emit();
    this.changeState('DISPLAY', undefined);
  }

  onConnectionDelete(connection: EncounterConnection) {
    if (!this.canDelete()) {
      return;
    }

    this.connectionDelete.emit(connection);
  }

  onConnectionCreate(character: OverviewItem) {
    const newConnection: EncounterConnectionRaw = {
      campaign: this.encounter()?.campaign_details?.id as number,
      encounter: this.encounter()?.pk as number,
      character: character.pk as number,
    };
    this.connectionCreate.emit(newConnection);
  }

  onContextMenuAction(action: string) {
    switch (action) {
      case 'edit-metadata':
        this.toggleAwayFromState(this.cardState());
        break;
      case 'edit-description':
        withViewTransition(() => this.toggleTextField());
        break;
      case 'delete':
        this.onEncounterDelete();
        break;
    }
  }

  toggleTextField() {
    switch (this.textFieldState()) {
      case 'DISPLAY':
        this.toUpdateState();
        break;
      case 'UPDATE':
        this.toDisplayState();
        break;
    }

    this.scrollComponentIntoView();
  }

  toDisplayState() {
    this.textFieldState.set('DISPLAY');
  }

  toUpdateState() {
    this.textFieldState.set('UPDATE');
  }

  /* Defines the actions that need to be taken when toggling **away** from a given card-state */
  private toggleAwayFromState(cardState: FormState) {
    switch (cardState) {
      case 'DISPLAY': {
        this.changeState('UPDATE', { ...this.encounter() });
        this.scrollComponentIntoView();
        break;
      }
      case 'OUTDATEDUPDATE':
      case 'UPDATE': {
        this.changeState('DISPLAY', undefined);
        this.scrollComponentIntoView();
        break;
      }
      case 'CREATE':
        this.encounterCreateCancel.emit();
        break;
    }
  }

  private parseConnection(
    connections: EncounterConnection[],
  ): BadgeListEntry<EncounterConnection>[] {
    return connections.map((con) => {
      const characterName = con.character_details?.name as string;
      const link = this.routingService.getRoutePath('character', {
        name: characterName,
        campaign: this.campaignName(),
      });

      return {
        text: characterName,
        badgeValue: con,
        link,
      };
    });
  }

  private scrollComponentIntoView() {
    interval(100)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(() =>
        this.component?.nativeElement.scrollIntoView({
          behavior: 'instant',
          block: 'start',
        }),
      );
  }
}
