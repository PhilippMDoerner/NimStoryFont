import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  combineLatest,
  map,
  Observable,
  ReplaySubject,
  switchMap,
  tap,
} from 'rxjs';
import { filterNil } from '../../../../utils/rxjs-operators';
import { CharacterService } from '../../../_services/article/character.service';
import { CreatureService } from '../../../_services/article/creature.service';
import { DiaryentryService } from '../../../_services/article/diaryentry.service';
import { ItemService } from '../../../_services/article/item.service';
import { LocationService } from '../../../_services/article/location.service';
import { OrganizationService } from '../../../_services/article/organization.service';
import { BaseService } from '../../../_services/base.service';
import { GeneralOverviewType } from '../../../design/templates/_models/generalOverviewType';
import { GeneralOverviewComponent } from '../../../design/templates/general-overview/general-overview.component';
import { GlobalStore } from '../../../global.store';

@Component({
  selector: 'app-general-overview-page',
  imports: [GeneralOverviewComponent, AsyncPipe],
  templateUrl: './general-overview-page.component.html',
  styleUrl: './general-overview-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralOverviewPageComponent {
  readonly globalStore = inject(GlobalStore);
  private readonly OVERVIEW_ENTRIES_MAP: {
    [key in GeneralOverviewType]: BaseService<unknown, unknown>;
  } = {
    CHARACTER: inject(CharacterService),
    CREATURE: inject(CreatureService),
    DIARYENTRY: inject(DiaryentryService),
    ITEM: inject(ItemService),
    LOCATION: inject(LocationService),
    ORGANIZATION: inject(OrganizationService),
  };

  readonly serverUrl = '';

  readonly campaignName$ = toObservable(this.globalStore.campaignName).pipe(
    filterNil(),
  );
  readonly canCreate = this.globalStore.canPerformActionsOfRole('member');
  readonly overviewType$ = inject(ActivatedRoute).data.pipe(
    map((data) => data['overviewType'] as GeneralOverviewType),
  );
  readonly overviewService$ = this.overviewType$.pipe(
    map((typ) => this.OVERVIEW_ENTRIES_MAP[typ]),
  );

  readonly queryState$ = new ReplaySubject<'loading' | 'success' | 'error'>(1);
  readonly entries$ = combineLatest({
    service: this.overviewService$,
    campaignName: this.campaignName$,
  }).pipe(
    tap(() => this.queryState$.next('loading')),
    switchMap(({ service, campaignName }) =>
      service.campaignList(campaignName),
    ),
    tap({
      next: () => this.queryState$.next('success'),
      error: () => this.queryState$.next('error'),
    }),
  );
  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    this.queryState$.pipe(map((state) => state === 'loading'));

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }
}
