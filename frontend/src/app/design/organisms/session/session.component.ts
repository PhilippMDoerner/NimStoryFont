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
import { RouterLink } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Session, SessionDiaryEntry } from 'src/app/_models/session';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import {
  CompareFormComponent,
  ConfirmationToggleButtonComponent,
  EditToggleComponent,
  FormComponent,
} from 'src/app/design/molecules';

type SessionState = 'CREATE' | 'DISPLAY' | 'UPDATE' | 'OUTDATED_UPDATE';

interface DiaryEntry {
  name: string;
  author_name: string;
  link: string;
}

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  imports: [
    NgTemplateOutlet,
    EditToggleComponent,
    IconComponent,
    RouterLink,
    ConfirmationToggleButtonComponent,
    FormComponent,
    CompareFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionComponent implements OnInit {
  session = input.required<Session>();
  canUpdate = input.required<boolean>();
  canDelete = input.required<boolean>();
  canCreate = input.required<boolean>();
  serverModel = input.required<Session | undefined>();
  disabledHotkeys = input<boolean>(false);

  readonly sessionDelete = output<Session>();
  readonly sessionCreate = output<Session>();
  readonly sessionUpdate = output<Session>();
  sessionCreateCancel = output<void>();

  state = signal<SessionState>('DISPLAY');
  sessionAudioUrl = computed(() =>
    this.routingService.getRoutePath('sessionaudio', {
      campaign: this.session()?.campaign_details?.name as string,
      isMainSession: this.session()?.is_main_session_int,
      sessionNumber: this.session()?.session_number,
    }),
  );
  userModel = signal<Session | undefined>(undefined);
  diaryEntries = computed<DiaryEntry[]>(() => {
    const diaryEntries: SessionDiaryEntry[] =
      this.session()?.diaryentries ?? [];

    return diaryEntries.map((entry) => ({
      name: entry.name,
      author_name: entry.author_name,
      link: this.toDiaryEntryUrl(entry),
    }));
  });

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.buildCheckboxConfig({
      key: 'is_main_session',
      defaultValue: true,
      label: 'Main Session?',
    }),
    this.formlyService.buildInputConfig({
      key: 'session_number',
      label: 'Session Number',
      required: true,
      inputKind: 'NUMBER',
    }),
    this.formlyService.buildDatepickerConfig({
      key: 'session_date',
      label: 'Date of the Session (YYYY/MM/DD)',
      required: true,
    }),
    this.formlyService.buildInputConfig({
      key: 'start_day',
      label: 'Start Day',
      required: false,
      inputKind: 'NUMBER',
    }),
    this.formlyService.buildInputConfig({
      key: 'end_day',
      label: 'End Day',
      required: false,
      inputKind: 'NUMBER',
    }),
  ];

  constructor(
    private formlyService: FormlyService,
    private routingService: RoutingService,
  ) {}

  ngOnInit(): void {
    const isInCreateScenario = this.session()?.pk == null && this.canCreate();
    if (isInCreateScenario) {
      this.changeState('CREATE', this.session());
    }
  }

  changeState(newState: SessionState, newModel: Session | undefined) {
    this.state.set(newState);
    this.userModel.set({ ...newModel } as Session);
  }

  onSessionDelete() {
    this.state.set('DISPLAY');
    this.sessionDelete.emit(this.session());
  }

  onCreateCancel() {
    this.changeState('DISPLAY', undefined);
    this.sessionCreateCancel.emit();
  }

  onSubmit() {
    switch (this.state()) {
      case 'CREATE':
        this.sessionCreate.emit(this.userModel() as Session);
        break;
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        this.sessionUpdate.emit(this.userModel() as Session);
    }

    this.changeState('DISPLAY', undefined);
  }

  onToggle(toggled: boolean) {
    const isInDisplayState = this.state() === 'DISPLAY';
    const nextState = isInDisplayState ? 'UPDATE' : 'DISPLAY';
    const nextModel: Session | undefined = toggled
      ? ({ ...this.session() } as Session)
      : undefined;
    this.changeState(nextState, nextModel);
  }

  private toDiaryEntryUrl(entry: SessionDiaryEntry) {
    return this.routingService.getRoutePath('diaryentry', {
      sessionNumber: this.session()?.session_number,
      isMainSession: this.session()?.is_main_session_int,
      authorName: entry.author_name,
      campaign: this.session()?.campaign_details?.name as string,
    });
  }
}
