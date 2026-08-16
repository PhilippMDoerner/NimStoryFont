import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RoutingService } from '../../../_services/routing.service';
import { HomeComponent } from '../../../design/templates/home/home.component';
import { GlobalStore } from '../../../global.store';
import { HomePageStore } from './home-page.store';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [HomeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  readonly globalStore = inject(GlobalStore);
  readonly store = inject(HomePageStore);
  readonly routingService = inject(RoutingService);

  readonly serverUrl = '';
  readonly campaignData = this.globalStore.currentCampaign;
  readonly currentCampaignName = computed(
    () => this.globalStore.currentCampaign()?.name,
  );
  readonly recentlyUpdatedArticles = this.store.recentlyUpdatedArticles;
  readonly hasMoreArticles = this.store.canLoadMore;

  constructor() {
    this.globalStore.trackIsPageLoading(false);
  }

  search(searchTerm: string): void {
    if (searchTerm == null || searchTerm === '') {
      return;
    }

    this.routingService.routeToPath('search', {
      campaign: this.currentCampaignName(),
      searchString: searchTerm,
    });
  }

  loadArticlePage(pageNumber: number): void {
    this.store.loadMoreArticles(pageNumber);
  }
}
