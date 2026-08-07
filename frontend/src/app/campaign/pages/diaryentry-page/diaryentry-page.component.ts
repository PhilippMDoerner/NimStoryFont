import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RoutingService } from 'src/app/_services/routing.service';
import { DiaryentryComponent } from 'src/app/design/templates/diaryentry/diaryentry.component';
import { GlobalStore } from 'src/app/global.store';
import { DiaryentryPageStore } from './diaryentry-page.store';

@Component({
  selector: 'app-diaryentry-page',
  imports: [DiaryentryComponent],
  templateUrl: './diaryentry-page.component.html',
  styleUrl: './diaryentry-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiaryentryPageComponent {
  readonly globalStore = inject(GlobalStore);
  readonly store = inject(DiaryentryPageStore);
  readonly routingService = inject(RoutingService);
  readonly isPageLoading = computed(() => this.store.diaryentry() == null);

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }

  onDelete() {
    this.store.deleteDiaryEntry();
    this.routingService.routeToPath('diaryentry-overview', {
      campaign: this.globalStore.campaignName(),
    });
  }
}
