import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  Signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { of } from 'rxjs';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { CharacterDetails, CharacterRaw } from 'src/app/_models/character';
import { OverviewItem } from 'src/app/_models/overview';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { ButtonComponent } from '../../atoms/button/button.component';
import { SeparatorComponent } from '../../atoms/separator/separator.component';
import { CompareFormComponent } from '../../molecules/compare-form/compare-form.component';
import { FormComponent } from '../../molecules/form/form.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';
import { CreateUpdateState } from '../_models/create-update-states';

type MembershipFormState = 'CREATE' | 'DISPLAY';

@Component({
  selector: 'app-character-create-update',
  templateUrl: './character-create-update.component.html',
  styleUrls: ['./character-create-update.component.scss'],
  imports: [
    PageContainerComponent,
    ButtonComponent,
    NgTemplateOutlet,
    FormComponent,
    SeparatorComponent,
    CompareFormComponent,
    HotkeyDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCreateUpdateComponent {
  state = input.required<CreateUpdateState>();
  campaignName = input.required<string>();
  userModel = input<Partial<CharacterDetails>>({});
  serverModel = input.required<CharacterDetails | undefined>();
  lastVisitedPlaceOptions = input.required<OverviewItem[]>();

  readonly create = output<CharacterDetails>();
  readonly update = output<CharacterDetails>();
  readonly cancelled = output<void>();

  lastVisitedPlaceOptions$ = toObservable(this.lastVisitedPlaceOptions);
  formlyFields: Signal<FormlyFieldConfig[]> = computed(() => [
    this.formlyService.buildCheckboxConfig({
      key: 'player_character',
      label: 'Player Character',
      defaultValue: false,
    }),
    this.formlyService.buildCheckboxConfig({
      key: 'alive',
      defaultValue: true,
    }),
    this.formlyService.buildInputConfig({
      key: 'name',
      inputKind: 'NAME',
    }),
    this.formlyService.buildInputConfig({
      key: 'title',
      required: false,
      inputKind: 'STRING',
    }),
    this.formlyService.buildStaticStringSelectConfig({
      key: 'gender',
      label: 'Gender',
      options: ['Other', 'Man', 'Woman', 'Non-binary'],
    }),
    this.formlyService.buildInputConfig({
      key: 'race',
      inputKind: 'STRING',
    }),
    this.formlyService.buildTypeaheadConfig<CharacterRaw, OverviewItem>({
      key: 'current_location',
      label: 'Location',
      getOptions: () => this.lastVisitedPlaceOptions$,
      formatSearchTerm: (searchTerm) => this.formatEntry(searchTerm),
      optionLabelProp: 'name_full',
      optionValueProp: 'pk',
      initialOption$: of({
        name_full: this.userModel().current_location_details?.name_full,
        pk: this.userModel().current_location,
      }),
      required: false,
    }),
  ]);

  heading = computed(() => this.getHeading(this.state()));

  membershipFormState = signal<MembershipFormState>('DISPLAY');

  constructor(private formlyService: FormlyService) {}

  onCancel(): void {
    this.cancelled.emit();
  }

  onSubmit(submittedData: Partial<CharacterDetails>): void {
    switch (this.state()) {
      case 'CREATE':
        this.create.emit(submittedData as CharacterDetails);
        break;
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        this.update.emit(submittedData as CharacterDetails);
        break;
    }
  }

  private getHeading(state: CreateUpdateState): string {
    switch (state) {
      case 'CREATE':
        return 'Creating New Character';
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return `Updating Character ${this.userModel().name}`;
    }
  }

  private formatEntry(str: string | undefined) {
    const undesiredCharRegex = /[-\s']/g;
    return str?.replaceAll(undesiredCharRegex, '') ?? '';
  }
}
