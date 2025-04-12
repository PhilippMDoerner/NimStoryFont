import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { SearchComponent } from 'src/app/design//templates/search/search.component';
import { GlobalStore } from 'src/app/global.store';
import { SearchPageStore } from './search-page.store';

@Component({
  selector: 'app-search-page',
  imports: [SearchComponent, AsyncPipe],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  store = inject(SearchPageStore);
  globalStore = inject(GlobalStore);
  route = inject(ActivatedRoute);
  searchString$ = this.route.params.pipe(
    map((params) => params['searchString'] as string | undefined),
  );

  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    computed(
      () =>
        this.store.searchArticles()?.articles == null ||
        this.globalStore.currentCampaign() == null,
    );

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }
}
