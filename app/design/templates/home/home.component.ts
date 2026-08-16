import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { componentId } from '../../../../utils/DOM';
import { withViewTransition } from '../../../../utils/animation';
import { CampaignOverview } from '../../../_models/campaign';
import {
  ARTICLE_ICONS,
  ArticleKind,
  OverviewItem,
  VisitedState,
} from '../../../_models/overview';
import { OnlineService } from '../../../_services/online.service';
import { ContentScrollEvent, GlobalStore } from '../../../global.store';
import { Icon } from '../../atoms/_models/icon';
import { ButtonComponent } from '../../atoms/button/button.component';
import { HtmlTextComponent } from '../../atoms/html-text/html-text.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { PlaceholderComponent } from '../../atoms/placeholder/placeholder.component';
import { SwitchComponent } from '../../atoms/switch/switch.component';
import { MenuItem } from '../../molecules/_models/menu';
import { ContextMenuComponent } from '../../molecules/context-menu/context-menu.component';
import { IconCardEntry } from '../../organisms/_model/icon-card-list';
import { IconCardListComponent } from '../../organisms/icon-card-list/icon-card-list.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';

const FILTER_MODES = ['NONE', '1WEEK', '1DAY'] as const;
type FilterMode = (typeof FILTER_MODES)[number];
const FILTER_LABEL: { [key in FilterMode]: string } = {
  NONE: 'All time',
  '1DAY': 'The last 24 hours',
  '1WEEK': 'The last 7 days',
};
const FILTER_ICON: { [key in FilterMode]: Icon | undefined } = {
  NONE: 'clock',
  '1DAY': 'calendar-day',
  '1WEEK': 'calendar-week',
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    PageContainerComponent,
    HtmlTextComponent,
    IconCardListComponent,
    PlaceholderComponent,
    NgOptimizedImage,
    ButtonComponent,
    IconComponent,
    ContextMenuComponent,
    SwitchComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly globalStore = inject(GlobalStore);
  readonly PAGE_BOTTOM_MIN_DISTANCE_FOR_PAGE_LOAD = 400;
  readonly DEFAULT_ICON = 'assets/icons/icon-512x512.webp';
  readonly ARTICLE_ICON_MAP = ARTICLE_ICONS;

  readonly serverUrl = input.required<string>();
  readonly campaignData = input.required<CampaignOverview | undefined>();
  readonly articles = input.required<OverviewItem[] | undefined>();
  readonly isLoading = input.required<boolean>();
  readonly hasMoreArticles = input.required<boolean>();

  readonly appSearch = output<string>();
  readonly loadArticlePage = output<number>();

  readonly isOnline$ = inject(OnlineService).online$;

  readonly timeFilterOptions = computed<MenuItem[]>(() => {
    return FILTER_MODES.map((mode) => ({
      actionName: mode,
      kind: 'BUTTON',
      label: FILTER_LABEL[mode],
      icon: FILTER_ICON[mode],
      active: this.timeFilter() === mode,
    }));
  });

  readonly timeFilter = signal<FilterMode>('NONE');
  readonly filterDate = computed<Date | undefined>(() => {
    const now = new Date().getTime();
    switch (this.timeFilter()) {
      case 'NONE':
        return undefined;
      case '1DAY': {
        const oneDayMs = 1000 * 60 * 60 * 24;
        return new Date(now - oneDayMs);
      }
      case '1WEEK': {
        const oneWeekMs = 1000 * 60 * 60 * 24 * 7;
        return new Date(now - oneWeekMs);
      }
    }
  });
  readonly canLoadMore = computed(() => {
    if (!this.hasMoreArticles()) return false;
    if (this.isLoading()) return false;

    const articles = this.articles();
    if (articles === undefined || articles.length === 0) return false; // articles === undefined means its still loading the articles

    const filterDate = this.filterDate();
    const isShowingUnfilteredList = filterDate === undefined;
    if (isShowingUnfilteredList) return true;

    const lastArticle = articles[articles.length - 1];
    const hasMoreArticlesInFilter =
      lastArticle.update_datetime &&
      new Date(lastArticle.update_datetime) > filterDate;

    return hasMoreArticlesInFilter;
  });
  readonly feedMode = signal<'INFINITY_SCROLL' | 'BUTTON_LOAD'>(
    'INFINITY_SCROLL',
  );

  readonly articleEntries = computed<IconCardEntry[]>(() => {
    const filterDate = this.filterDate();
    const articles = this.articles() ?? [];
    if (!filterDate) return articles.map((art) => this.toIconCardEntry(art));

    const firstArticleOutOfTimeframeIndex = articles.findIndex(
      (article) =>
        article.update_datetime &&
        new Date(article.update_datetime) < filterDate,
    );
    return articles
      .slice(0, firstArticleOutOfTimeframeIndex)
      .map((art) => this.toIconCardEntry(art));
  });
  readonly pageNumber = signal(0);
  readonly id = componentId();

  constructor() {
    effect(() => {
      if (this.feedMode() !== 'INFINITY_SCROLL') return;
      const articles = this.articles();
      const isScrollDueToPageUnload =
        articles === undefined || articles.length === 0;
      if (isScrollDueToPageUnload) return;

      const scrollEvent = this.globalStore.contentScrollEvents();
      if (!scrollEvent) return;
      const currentPageNumber = untracked(() => this.pageNumber());
      this.onPageScroll(scrollEvent, currentPageNumber);
    });
  }

  triggerNextPageLoad(currentPageNumber: number): void {
    const canLoadNextPage = this.canLoadMore();
    if (!canLoadNextPage) {
      return;
    }

    const nextPage = currentPageNumber + 1;
    this.pageNumber.set(nextPage);
    this.loadArticlePage.emit(nextPage);
  }

  toggleFeedMode(isSwitchedOn: boolean) {
    if (isSwitchedOn) {
      this.feedMode.set('INFINITY_SCROLL');
    } else {
      this.feedMode.set('BUTTON_LOAD');
    }
  }

  updateTimeFilter(event: string) {
    switch (event) {
      case '1WEEK':
      case '1DAY':
      case 'NONE':
        withViewTransition(() => this.timeFilter.set(event));
        break;
    }
  }

  private toIconCardEntry(article: OverviewItem): IconCardEntry {
    const articleKind = article.article_type.toUpperCase() as ArticleKind;
    return {
      entryType: articleKind,
      icon: ARTICLE_ICONS[articleKind],
      link: article.getAbsoluteRouterUrl(),
      title: article.name,
      subText: article.article_type.toLowerCase(),
      updateDatetime: article.update_datetime as string,
      decoration: this.toDecorationLabel(article.visited_state),
    };
  }

  private toDecorationLabel(
    visibilityState: VisitedState | undefined,
  ): string | undefined {
    switch (visibilityState) {
      case 'NEW_UPDATED':
        return 'Updated';
      case 'NEW_CREATED':
        return 'New';
      default:
        return undefined;
    }
  }

  private onPageScroll(event: ContentScrollEvent, currentPageNumber: number) {
    if (this.isNearPageEnd(event)) {
      this.triggerNextPageLoad(currentPageNumber);
    }
  }

  private isNearPageEnd(pageScrollEvent: ContentScrollEvent): boolean {
    const pageElement = pageScrollEvent.detail.pageElement.nativeElement;
    const totalPageHeight: number = pageElement.scrollHeight;
    const visiblePageHeight: number = pageElement.clientHeight;
    const maxScrollHeight: number = totalPageHeight - visiblePageHeight;

    const currentYPosition = pageElement.scrollTop;
    const pixelDistanceToPageBottom: number =
      maxScrollHeight - currentYPosition;

    return (
      pixelDistanceToPageBottom < this.PAGE_BOTTOM_MIN_DISTANCE_FOR_PAGE_LOAD
    );
  }
}
