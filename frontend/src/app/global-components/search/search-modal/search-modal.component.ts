import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, map, withLatestFrom } from 'rxjs';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { OverviewItem } from 'src/app/_models/overview';
import { HotkeyService } from 'src/app/_services/hotkey.service';
import { OnlineService } from 'src/app/_services/online.service';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { SpinnerComponent } from 'src/app/design/atoms/spinner/spinner.component';
import {
  ListComponent,
  ListEntry,
  ListEntryTemplateContext,
} from 'src/app/design/molecule/list/list.component';
import { OverviewEntryComponent } from 'src/app/design/molecules/overview-entry/overview-entry.component';
import { SearchPageStore } from 'src/app/global-components/search/search-modal/search-page.store';
import { GlobalStore } from 'src/app/global.store';
import { componentId } from 'src/utils/DOM';
import { SearchFieldComponent } from '../../../design/molecules/search-field/search-field.component';

@Component({
  selector: 'app-search-modal',
  imports: [
    ButtonComponent,
    HotkeyDirective,
    SearchFieldComponent,
    AsyncPipe,
    SpinnerComponent,
    OverviewEntryComponent,
    ListComponent,
    RouterLink,
  ],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchModalComponent {
  modalService = inject(NgbModal);
  hotkeyService = inject(HotkeyService);
  globalStore = inject(GlobalStore);
  onlineService = inject(OnlineService);
  searchStore = inject(SearchPageStore);
  router = inject(Router);

  id = componentId();
  titleId = `${this.id}-title`;
  DEFAULT_URL = 'assets/default_images/icon_default.webp';

  campaignName = this.globalStore.campaignName;
  isLoading = computed(
    () => this.searchStore.searchArticlesQueryState() === 'loading',
  );

  canSearch$ = toObservable(this.isLoading);
  entries = computed(() => {
    const articles = this.searchStore.searchArticles()?.articles;
    return articles?.map(
      (article) =>
        ({
          data: {
            ...article,
            url: article.getAbsoluteRouterUrl(),
          },
          trackId: article.pk ?? componentId(),
          ariaText: {
            kind: 'aria-labelledby',
            id: `overview-entry-${article.article_type}-${article.pk}`,
          },
        }) satisfies ListEntry<OverviewItem & { url: string }>,
    );
  });

  constructor() {
    const hasCurrentCampaign$ = toObservable(
      this.globalStore.currentCampaign,
    ).pipe(map((campaign) => !!campaign));

    this.hotkeyService
      .watchAction('search')
      .pipe(
        withLatestFrom(hasCurrentCampaign$, this.onlineService.online$),
        filter(
          ([, hasCurrentCampaign, isOnline]) => hasCurrentCampaign && isOnline,
        ),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.openModal());
  }

  routeToEntry(data: OverviewItem) {
    const url = data.getAbsoluteRouterUrl();
    this.router.navigateByUrl(url);
    this.modalService.dismissAll();
  }

  typecastContext(context: unknown) {
    return context as ListEntryTemplateContext<OverviewItem & { url: string }>;
  }

  openModal() {
    if (this.modalService.hasOpenModals()) return;

    this.modalService.open(SearchModalComponent, {
      centered: true,
      ariaLabelledBy: this.titleId,
    });
  }

  dismiss() {
    console.log('dismiss');
    this.modalService.dismissAll();
  }
}
