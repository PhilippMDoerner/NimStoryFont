import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RoutingService } from '../../../_services/routing.service';
import { SeparatorComponent } from '../../../design/atoms/separator/separator.component';
import { ArticleFooterComponent } from '../../../design/molecules/article-footer/article-footer.component';
import { LinkTabsComponent } from '../../../design/molecules/link-tabs/link-tabs.component';
import { PageContainerComponent } from '../../../design/organisms/page-container/page-container.component';
import { GlobalStore } from '../../../global.store';
import { NavigationStore } from '../../../navigation.store';
import { getProfileTabs } from '../../_models/profileTabs';

@Component({
  selector: 'app-profile-tab-layout',
  imports: [
    PageContainerComponent,
    LinkTabsComponent,
    ArticleFooterComponent,
    SeparatorComponent,
  ],
  templateUrl: './profile-tab-layout.component.html',
  styleUrl: './profile-tab-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileTabLayoutComponent {
  readonly routingService = inject(RoutingService);
  readonly navStore = inject(NavigationStore);
  readonly globalStore = inject(GlobalStore);

  readonly backUrl = computed(() => {
    const campaignName = this.globalStore.campaignName();
    const fallbackUrl = this.routingService.getRoutePath('campaign-overview');
    return campaignName
      ? this.routingService.getRoutePath('home', { campaign: campaignName })
      : fallbackUrl;
  });
  readonly footerLabel = computed(() => {
    const campaignName = this.globalStore.campaignName();
    return `Back to ${campaignName ?? 'Campaigns'}`;
  });

  readonly tabs = getProfileTabs(this.routingService);
}
