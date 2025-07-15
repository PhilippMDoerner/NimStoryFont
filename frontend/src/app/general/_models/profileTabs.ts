import { RoutingService } from 'src/app/_services/routing.service';
import { LinkTab } from 'src/app/design/molecules/link-tabs/link-tabs.component';

export function getProfileTabs(routingService: RoutingService): LinkTab[] {
  return [
    {
      label: 'Profile',
      link: routingService.getRoutePath('direct-profile'),
      icon: 'user',
    },
    {
      label: 'Settings',
      link: routingService.getRoutePath('user-settings'),
      icon: 'gear',
    },
  ];
}

export const PROFILE_TABS: LinkTab[] = [];
