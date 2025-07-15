import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RoutingService } from 'src/app/_services/routing.service';
import { SeparatorComponent } from 'src/app/design/atoms/separator/separator.component';
import { LinkTabsComponent } from 'src/app/design/molecules/link-tabs/link-tabs.component';
import { PageContainerComponent } from 'src/app/design/organisms/page-container/page-container.component';
import { GlobalStore } from 'src/app/global.store';
import { NavigationStore } from 'src/app/navigation.store';
import { ArticleFooterComponent } from '../../../design/molecules/article-footer/article-footer.component';
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
  routingService = inject(RoutingService);
  navStore = inject(NavigationStore);
  globalStore = inject(GlobalStore);

  backUrl = computed(() => {
    const campaignName = this.globalStore.campaignName();
    const fallbackUrl = this.routingService.getRoutePath('campaign-overview');
    return campaignName
      ? this.routingService.getRoutePath('home', { campaign: campaignName })
      : fallbackUrl;
  });
  footerLabel = computed(() => {
    const campaignName = this.globalStore.campaignName();
    return `Back to ${campaignName ?? 'Campaigns'}`;
  });

  tabs = getProfileTabs(this.routingService);
}
