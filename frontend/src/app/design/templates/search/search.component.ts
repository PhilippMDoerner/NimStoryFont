import { Component, computed, inject, input, signal } from '@angular/core';
import { OverviewItem } from 'src/app/_models/overview';
import { RoutingService } from 'src/app/_services/routing.service';
import { SidebarOption } from '../../molecules';
import { SidebarLegendComponent } from '../../molecules/sidebar-legend/sidebar-legend.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';

import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OnlineService } from 'src/app/_services/online.service';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { SearchFieldComponent } from '../../molecules/search-field/search-field.component';
import { SearchHitComponent } from '../../organisms/search-hit/search-hit.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [
    PageContainerComponent,
    SidebarLegendComponent,
    SearchHitComponent,
    RouterLink,
    ButtonLinkComponent,
    SearchFieldComponent,
    AsyncPipe,
  ],
})
export class SearchComponent {
  isOnline$ = inject(OnlineService).online$;

  foundArticles = input.required<OverviewItem[]>();
  emptySearchSubtitle = input.required<string>();
  searchString = input.required<string>();
  campaignName = input.required<string>();

  private allCategories = signal<SidebarOption[]>([]);
  private activeCategoryLabels = computed<Set<string>>(() => {
    return this.allCategories()
      .filter((category) => category.active)
      .map((category) => category.label.toLowerCase())
      .reduce(
        (accumulatorSet, currentValue) => accumulatorSet.add(currentValue),
        new Set<string>(),
      );
  });

  filteredArticles = computed<OverviewItem[]>(() => {
    const activeCategoryLabels = this.activeCategoryLabels();
    if (activeCategoryLabels.size === 0) return this.foundArticles();

    return this.foundArticles().filter((article) =>
      activeCategoryLabels.has(article.article_type.toLowerCase()),
    );
  });
  homeUrl = computed(() =>
    this.routingService.getRoutePath('home', {
      campaign: this.campaignName,
    }),
  );

  constructor(private routingService: RoutingService) {}

  onCategorySelect(allCategories: SidebarOption[]) {
    this.allCategories.set([...allCategories]);
  }

  search(searchTerm: string): void {
    if (searchTerm == null || searchTerm === '') {
      return;
    }

    this.routingService.routeToPath('search', {
      campaign: this.campaignName(),
      searchString: searchTerm,
    });
  }
}
