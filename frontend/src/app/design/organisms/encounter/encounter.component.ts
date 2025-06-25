import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
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
import {
  EMPTY,
  interval,
  map,
  of,
  startWith,
  switchMap,
  take,
  timer,
} from 'rxjs';
import { CharacterEncounter } from 'src/app/_models/character';
import {
  Encounter,
  EncounterConnection,
  EncounterConnectionRaw,
  EncounterRaw,
} from 'src/app/_models/encounter';
import { FormState } from 'src/app/_models/form';
import { OverviewItem } from 'src/app/_models/overview';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { SeparatorComponent } from 'src/app/design/atoms/separator/separator.component';
import {
  BadgeListComponent,
  BadgeListEntry,
  CompareFormComponent,
  FormComponent,
} from 'src/app/design/molecules';
import { componentId } from 'src/utils/DOM';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { formatSearchTerm } from '../../atoms/_models/typeahead';
import { SuccessAnimationComponent } from '../../atoms/success-animation/success-animation.component';
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
    AsyncPipe,
    SuccessAnimationComponent,
    ContextMenuComponent,
  ],
})
export class EncounterComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  characters = input.required<OverviewItem[]>();
  locations = input.required<OverviewItem[]>();
  updateState = input<RequestState>();
  encounter = input<Encounter | CharacterEncounter>();
  serverModel = input<Encounter>();
  canUpdate = input(false);
  canCreate = input(false);
  canDelete = input(false);
  initialCardState = input<FormState>('DISPLAY');
  isInFocus = input.required<boolean>();
  headingId = input.required<string>();

  component = inject(ElementRef);

  readonly connectionDelete = output<EncounterConnection>();
  readonly connectionCreate = output<EncounterConnectionRaw>();
  readonly encounterDelete = output<Encounter>();
  readonly encounterUpdate = output<Encounter>();
  readonly encounterCreate = output<EncounterRaw>();
  readonly encounterCreateCancel = output<void>();

  userModel = signal<Encounter | Partial<EncounterRaw>>({});
  cardState = signal<FormState>('DISPLAY');
  textFieldState = signal<TextFieldState>('DISPLAY');
  badgeEntries = computed<BadgeListEntry<EncounterConnection>[]>(() => {
    const encounterConnections = this.encounter()?.encounterConnections ?? [];
    return this.parseConnection(encounterConnections);
  });
  campaignName = computed(() => this.encounter()?.campaign_details?.name);
  contextMenuItems = computed<MenuItem[]>(() => {
    const menuItems: MenuItem[] = [];
    if (this.canUpdate()) {
      const isEditingMetadata =
        this.cardState() === 'UPDATE' || this.cardState() === 'OUTDATEDUPDATE';
      menuItems.push({
        kind: 'BUTTON',
        label: isEditingMetadata ? 'Cancel Edit' : 'Edit Metadata',
        actionName: 'edit-metadata',
        active: isEditingMetadata,
        hotkey: this.isInFocus() ? 'e' : undefined,
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
        hotkey: this.isInFocus() ? 'w' : undefined,
        icon: isEditingDescription ? 'times' : 'pencil',
      });
    }

    if (this.canDelete()) {
      menuItems.push({
        kind: 'CONFIRM',
        actionName: 'delete',
        label: `Delete`,
        hotkey: this.isInFocus() ? 'd' : undefined,
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

  showUpdateSuccessMarker$ = toObservable(this.updateState).pipe(
    switchMap((state) => {
      const hasUpdatedSuccessfully = state === 'success';
      if (hasUpdatedSuccessfully) {
        return timer(UPDATE_MARKER_TIMEOUT_MS).pipe(
          map(() => false),
          startWith(state === 'success'),
        );
      } else {
        return EMPTY;
      }
    }),
  );
  locations$ = toObservable(this.locations).pipe(filterNil());
  formlyFields = computed<FormlyFieldConfig[]>(() => [
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
  editorId = componentId();

  constructor(
    private routingService: RoutingService,
    private formlyService: FormlyService,
  ) {}

  ngOnInit(): void {
    const isInCreateScenario =
      this.initialCardState() === 'CREATE' && this.canCreate();
    const model = isInCreateScenario ? {} : undefined;
    this.changeState(this.initialCardState(), model);
  }

  changeState(newState: FormState, newModel: Partial<Encounter> | undefined) {
    this.cardState.set(newState);
    this.userModel.set({ ...newModel });
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
        this.toggleTextField();
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
