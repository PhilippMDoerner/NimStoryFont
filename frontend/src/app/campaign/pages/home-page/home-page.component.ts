import { Component, computed, inject } from '@angular/core';
import { RoutingService } from 'src/app/_services/routing.service';
import { HomeComponent } from 'src/app/design//templates/home/home.component';
import { GlobalStore } from 'src/app/global.store';
import { environment } from 'src/environments/environment';
import { HomePageStore } from './home-page.store';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [HomeComponent],
})
export class HomePageComponent {
  globalStore = inject(GlobalStore);
  store = inject(HomePageStore);
  routingService = inject(RoutingService);

  serverUrl = environment.backendDomain;
  campaignData = this.globalStore.currentCampaign;
  currentCampaignName = computed(
    () => this.globalStore.currentCampaign()?.name,
  );
  recentlyUpdatedArticles = this.store.recentlyUpdatedArticles;
  hasMoreArticles = this.store.canLoadMore;

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
