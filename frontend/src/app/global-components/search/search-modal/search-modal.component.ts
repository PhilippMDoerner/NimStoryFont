import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  Signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { filter, map, withLatestFrom } from 'rxjs';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { OverviewItem } from 'src/app/_models/overview';
import {
  SEARCHABLE_ARTICLE_KINDS,
  SearchableArticleKind,
} from 'src/app/_models/search';
import { HotkeyService } from 'src/app/_services/hotkey.service';
import { OnlineService } from 'src/app/_services/online.service';
import { Icon } from 'src/app/design/atoms/_models/icon';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import {
  ListComponent,
  ListEntry,
  ListEntryTemplateContext,
} from 'src/app/design/molecule/list/list.component';
import {
  SEARCH_TOGGLES,
  Toggle,
} from 'src/app/design/molecules/_models/toggle';
import { OverviewEntryComponent } from 'src/app/design/molecules/overview-entry/overview-entry.component';
import { ToggleRowComponent } from 'src/app/design/molecules/toggle-row/toggle-row.component';
import { getMetadataForType } from 'src/app/design/organisms/_model/sidebar';
import { SearchPageStore } from 'src/app/global-components/search/search-modal/search-page.store';
import { GlobalStore } from 'src/app/global.store';
import { componentId } from 'src/utils/DOM';
import { capitalize } from 'src/utils/string';
import { SearchFieldComponent } from '../../../design/molecules/search-field/search-field.component';

type SearchEntry = Pick<
  OverviewItem,
  'name' | 'description' | 'images' | 'article_type'
> & {
  url: string;
  color: string | undefined;
  icon: Icon;
};

@Component({
  selector: 'app-search-modal',
  imports: [
    ButtonComponent,
    HotkeyDirective,
    SearchFieldComponent,
    OverviewEntryComponent,
    ListComponent,
    RouterLink,
    IconComponent,
    NgbTooltip,
    ToggleRowComponent,
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
  announcer = inject(LiveAnnouncer);

  private readonly listElement: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild('list', {
      read: ElementRef<HTMLElement>,
    });

  id = componentId();
  titleId = `${this.id}-title`;
  listId = `${this.id}-list`;
  DEFAULT_URL = 'assets/default_images/icon_default.webp';

  campaignName = this.globalStore.campaignName;
  activeFilters = signal(SEARCHABLE_ARTICLE_KINDS);
  filterToggles = computed(() => {
    const activeFilterSet = new Set(this.activeFilters());
    return SEARCH_TOGGLES.map((toggle) => ({
      ...toggle,
      active: toggle.value.every((filterKind) =>
        activeFilterSet.has(filterKind),
      ),
    }));
  });
  searchString = signal('');

  isLoading = computed(
    () => this.searchStore.searchArticlesQueryState() === 'loading',
  );
  isEmptySearch = computed(() => {
    const hasEntries =
      (this.searchStore.searchArticles()?.articles?.length ?? 0) > 0;
    const hasLoaded = this.searchStore.searchArticlesQueryState() === 'success';
    return hasLoaded && !hasEntries;
  });

  entries = computed(() => {
    const articles = this.searchStore.searchArticles()?.articles;
    return articles?.map((article) => {
      const metadata = getMetadataForType(article.article_type);

      return {
        data: {
          name: article.name,
          description: article.description,
          url: article.getAbsoluteRouterUrl(),
          color: metadata?.color,
          icon: metadata?.iconClass as Icon,
          article_type: capitalize(article.article_type),
        },
        trackId: `${article.article_type}-${article.pk}`,
        ariaText: {
          kind: 'aria-labelledby',
          id: `overview-entry-${article.article_type}-${article.pk}`,
        },
      } satisfies ListEntry<SearchEntry>;
    });
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

    effect(() => {
      const searchString = this.searchString();
      if (!searchString) return;

      this.searchStore.loadSearchArticles({
        searchString: searchString,
        filters: this.activeFilters(),
      });
    });
  }

  updateFilters(event: Toggle<SearchableArticleKind[]>) {
    if (event.active) {
      this.activeFilters.update((filters) => [...filters, ...event.value]);
    } else {
      this.activeFilters.update((filters) =>
        filters.filter((f) => !event.value.includes(f)),
      );
    }
  }

  routeToEntry(data: SearchEntry) {
    this.router.navigateByUrl(data.url);
    this.modalService.dismissAll();
  }

  typecastContext(context: unknown) {
    return context as ListEntryTemplateContext<SearchEntry>;
  }

  openModal() {
    if (this.modalService.hasOpenModals()) return;

    this.modalService.open(SearchModalComponent, {
      centered: true,
      ariaLabelledBy: this.titleId,
      modalDialogClass: 'search-modal',
      beforeDismiss: () => {
        this.searchStore.reset();
        return true;
      },
    });
  }

  dismiss() {
    this.modalService.dismissAll();
  }

  shiftToSearch() {
    this.listElement()?.nativeElement.focus();
  }
}
