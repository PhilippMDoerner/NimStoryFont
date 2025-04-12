import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { filter, mergeMap, skip, take } from 'rxjs';
import { Quest, QuestRaw } from 'src/app/_models/quest';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { CreateUpdateState } from 'src/app/design/templates/_models/create-update-states';
import { CreateUpdateComponent } from 'src/app/design/templates/create-update/create-update.component';
import { GlobalStore } from 'src/app/global.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { QuestCreateUpdatePageStore } from './quest-create-update-page.store';

@Component({
  selector: 'app-quest-create-update-page',
  imports: [CreateUpdateComponent],
  templateUrl: './quest-create-update-page.component.html',
  styleUrl: './quest-create-update-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestCreateUpdatePageComponent {
  globalStore = inject(GlobalStore);
  store = inject(QuestCreateUpdatePageStore);

  private route = inject(ActivatedRoute);
  private routeUrlSegments = toSignal(this.route.url);
  private routingService = inject(RoutingService);
  private formlyService = inject(FormlyService);

  questGivers$ = toObservable(this.store.questGivers).pipe(filterNil());
  questTakers$ = toObservable(this.store.questTakers).pipe(filterNil());
  questStates$ = toObservable(this.store.questStates).pipe(filterNil());
  sessions$ = toObservable(this.store.campaignSessions).pipe(filterNil());

  questUpdateState$ = toObservable(this.store.questUpdateState);
  questCreateState$ = toObservable(this.store.createState);
  quest$ = toObservable(this.store.quest);

  formlyFields = computed<FormlyFieldConfig[]>(() => [
    this.formlyService.buildInputConfig({
      key: 'name',
      placeholder: 'Quest Name',
      inputKind: 'NAME',
    }),
    {
      key: 'status',
      type: 'select',
      props: {
        label: 'Quest Status',
        labelProp: 'label',
        valueProp: 'value',
        options: this.questStates$,
        required: true,
      },
    },
    this.formlyService.buildOverviewSelectConfig({
      key: 'giver',
      label: 'Quest Giver',
      labelProp: 'name',
      options$: this.questGivers$,
      campaign: this.globalStore.campaignName(),
    }),
    {
      key: 'taker',
      type: 'select',
      props: {
        label: 'Quest Taker',
        labelProp: 'name',
        valueProp: 'pk',
        options: this.questTakers$,
      },
    },
    this.formlyService.buildOverviewSelectConfig({
      key: 'start_session',
      label: 'Start Session',
      labelProp: 'name',
      options$: this.sessions$,
      campaign: this.globalStore.campaignName(),
    }),
    this.formlyService.buildOverviewSelectConfig({
      key: 'end_session',
      label: 'End Session',
      labelProp: 'name',
      options$: this.sessions$,
      campaign: this.globalStore.campaignName(),
      required: false,
    }),
    this.formlyService.buildInputConfig({
      key: 'abstract',
      placeholder: 'Quest Summary...',
      required: false,
      inputKind: 'STRING',
      maxLength: 65,
    }),
  ]);

  state = computed<CreateUpdateState>(() => {
    const pathSegments = this.routeUrlSegments()?.map(
      (segment) => segment.path,
    );
    const isUpdatePage = pathSegments?.includes('update');
    if (!isUpdatePage) {
      return 'CREATE';
    }

    const isOutdatedUpdate = this.store.questServerModel() != null;
    if (isOutdatedUpdate) {
      return 'OUTDATED_UPDATE';
    } else {
      return 'UPDATE';
    }
  });

  userModel = computed(() => {
    switch (this.state()) {
      case 'CREATE':
        return {
          campaign: this.globalStore.currentCampaign()?.pk,
        } as Partial<QuestRaw>;
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return { ...this.store.quest() };
    }
  });

  heading = computed(() => {
    switch (this.state()) {
      case 'CREATE':
        return 'Adding a new Quest';
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return `Updating Quest ${this.store.quest()?.name}`;
    }
  });

  private readonly isPageLoading = computed(
    () => this.userModel() == null || this.globalStore.campaignName() == null,
  );

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }

  cancel() {
    const campaign = this.globalStore.campaignName();
    switch (this.state()) {
      case 'CREATE':
        this.routingService.routeToPath('quest-overview', {
          campaign,
        });
        break;
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        this.routeToQuest(this.store.quest());
    }
  }

  update(quest: Quest) {
    this.store.updateQuest(quest as Quest);

    this.questUpdateState$
      .pipe(
        skip(1),
        filter((state) => state === 'success'),
        take(1),
      )
      .subscribe(() => this.routeToQuest(this.store.quest() as Quest));
  }

  create(quest: Partial<QuestRaw>) {
    this.store.createQuest(quest as QuestRaw);
    this.questCreateState$
      .pipe(
        filter((state) => state === 'success'),
        take(1),
        mergeMap(() => this.quest$),
        filterNil(),
      )
      .subscribe((quest) => this.routeToQuest(quest as Quest));
  }

  private routeToQuest(quest: Quest | undefined) {
    if (quest == null) return;

    this.routingService.routeToPath('quest', {
      campaign: this.globalStore.campaignName(),
      name: quest.name,
    });
  }
}
