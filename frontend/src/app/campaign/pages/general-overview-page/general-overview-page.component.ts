import { AsyncPipe } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
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
import { CharacterService } from 'src/app/_services/article/character.service';
import { CreatureService } from 'src/app/_services/article/creature.service';
import { DiaryentryService } from 'src/app/_services/article/diaryentry.service';
import { ItemService } from 'src/app/_services/article/item.service';
import { LocationService } from 'src/app/_services/article/location.service';
import { OrganizationService } from 'src/app/_services/article/organization.service';
import { BaseService } from 'src/app/_services/base.service';
import { GeneralOverviewType } from 'src/app/design/templates/_models/generalOverviewType';
import { GeneralOverviewComponent } from 'src/app/design/templates/general-overview/general-overview.component';
import { GlobalStore } from 'src/app/global.store';
import { environment } from 'src/environments/environment';
import { filterNil } from 'src/utils/rxjs-operators';

@Component({
  selector: 'app-general-overview-page',
  imports: [GeneralOverviewComponent, AsyncPipe],
  templateUrl: './general-overview-page.component.html',
  styleUrl: './general-overview-page.component.scss',
})
export class GeneralOverviewPageComponent {
  globalStore = inject(GlobalStore);
  private OVERVIEW_ENTRIES_MAP: {
    [key in GeneralOverviewType]: BaseService<unknown, unknown>;
  } = {
    CHARACTER: inject(CharacterService),
    CREATURE: inject(CreatureService),
    DIARYENTRY: inject(DiaryentryService),
    ITEM: inject(ItemService),
    LOCATION: inject(LocationService),
    ORGANIZATION: inject(OrganizationService),
  };

  serverUrl = environment.backendDomain;

  campaignName$ = toObservable(this.globalStore.campaignName).pipe(filterNil());
  canCreate = this.globalStore.canPerformActionsOfRole('member');
  overviewType$ = inject(ActivatedRoute).data.pipe(
    map((data) => data['overviewType'] as GeneralOverviewType),
  );
  overviewService$ = this.overviewType$.pipe(
    map((typ) => this.OVERVIEW_ENTRIES_MAP[typ]),
  );

  queryState$ = new ReplaySubject<'loading' | 'success' | 'error'>(1);
  entries$ = combineLatest({
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
