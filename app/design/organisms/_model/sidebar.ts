import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NamedRouteData, RouteName } from 'src/app/_models/route';
import { CampaignRole } from 'src/app/_models/token';
import { PwaService } from 'src/app/_services/pwa.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { AuthStore } from 'src/app/auth.store';
import { Icon } from 'src/app/design/atoms/_models/icon';
import { GlobalStore, hasRoleOrBetter } from 'src/app/global.store';
import { NavigationStore } from 'src/app/navigation.store';

export interface ArticleMetaData {
  title: string;
  iconClass: Icon;
  route: string;
  color: string;
  article_types: string[];
  showInSidebar: boolean;
  availableOffline: boolean;
  associatedRoutes: Set<RouteName>;
  isActiveTab: boolean;
  requiresRole: CampaignRole;
}

export const ARTICLE_META_ENTRIES: ArticleMetaData[] = [
  {
    title: 'Campaign Admin',
    iconClass: 'hammer',
    route: 'campaign-admin',
    color: '',
    article_types: [],
    showInSidebar: true,
    availableOffline: false,
    associatedRoutes: new Set(['campaign-admin', 'campaign-update']),
    isActiveTab: false,
    requiresRole: 'admin',
  },
  {
    title: 'Creatures',
    iconClass: 'dragon',
    route: 'creature-overview',
    color: 'red',
    article_types: ['creature'],
    showInSidebar: true,
    availableOffline: true,
    associatedRoutes: new Set([
      'creature-create',
      'creature-update',
      'creature',
      'creature-overview',
    ]),
    isActiveTab: false,
    requiresRole: 'guest',
  },
  {
    title: 'Characters',
    iconClass: 'male',
    route: 'character-overview',
    color: 'blue',
    article_types: ['character'],
    showInSidebar: true,
    availableOffline: true,
    associatedRoutes: new Set([
      'character-create',
      'character-update',
      'character',
      'character-overview',
      'quote-overview',
    ]),
    isActiveTab: false,
    requiresRole: 'guest',
  },
  {
    title: 'DiaryEntries',
    iconClass: 'book-open',
    route: 'diaryentry-overview',
    color: 'darkgreen',
    article_types: ['diaryentry'],
    showInSidebar: true,
    availableOffline: true,
    associatedRoutes: new Set([
      'diaryentry-create',
      'diaryentry-update',
      'diaryentry',
      'diaryentry-overview',
      'diaryentry-encounter',
    ]),
    isActiveTab: false,
    requiresRole: 'guest',
  },
  {
    title: 'Items',
    iconClass: 'magic',
    route: 'item-overview',
    color: 'yellow',
    article_types: ['item'],
    showInSidebar: true,
    availableOffline: true,
    associatedRoutes: new Set([
      'item-create',
      'item-update',
      'item',
      'item-overview',
    ]),
    isActiveTab: false,
    requiresRole: 'guest',
  },
  {
    title: 'Locations',
    iconClass: 'compass',
    route: 'location-overview',
    color: 'brown',
    article_types: ['location'],
    showInSidebar: true,
    availableOffline: true,
    associatedRoutes: new Set([
      'location-create',
      'location-update',
      'location',
      'location-overview',
      'marker',
      'marker-create',
      'marker-update',
    ]),
    isActiveTab: false,
    requiresRole: 'guest',
  },
  {
    title: 'Maps',
    iconClass: 'map',
    route: 'default-map',
    color: 'beige',
    article_types: ['map'],
    showInSidebar: true,
    availableOffline: true,
    associatedRoutes: new Set([
      'map-create',
      'map-update',
      'map',
      'default-map',
      'marker-map-create',
    ]),
    isActiveTab: false,
    requiresRole: 'guest',
  },
  {
    title: 'Organizations',
    iconClass: 'sitemap',
    route: 'organization-overview',
    color: 'purple',
    article_types: ['organization'],
    showInSidebar: true,
    availableOffline: true,
    associatedRoutes: new Set([
      'organization-create',
      'organization-update',
      'organization',
      'organization-overview',
    ]),
    isActiveTab: false,
    requiresRole: 'guest',
  },
  {
    title: 'Quests',
    iconClass: 'question-circle',
    route: 'quest-overview',
    color: 'white',
    article_types: ['quest'],
    showInSidebar: true,
    availableOffline: true,
    associatedRoutes: new Set([
      'quest-create',
      'quest-update',
      'quest',
      'quest-overview',
    ]),
    isActiveTab: false,
    requiresRole: 'guest',
  },
  {
    title: 'Recordings',
    iconClass: 'file-audio',
    route: 'sessionaudio-overview',
    color: 'green',
    article_types: ['sessionaudio', 'recording'],
    showInSidebar: true,
    availableOffline: false,
    associatedRoutes: new Set([
      'sessionaudio-create',
      'sessionaudio',
      'sessionaudio-update',
      'sessionaudio-overview',
    ]),
    isActiveTab: false,
    requiresRole: 'guest',
  },
  {
    title: 'Rules',
    iconClass: 'book',
    route: 'rules',
    color: 'orange',
    article_types: ['rule', 'rules'],
    showInSidebar: true,
    availableOffline: true,
    associatedRoutes: new Set(['rule', 'rules']),
    isActiveTab: false,
    requiresRole: 'guest',
  },
  {
    title: 'Spells',
    iconClass: 'hand-sparkles',
    route: 'spells',
    color: 'violet',
    article_types: ['spell', 'spells'],
    showInSidebar: true,
    availableOffline: true,
    associatedRoutes: new Set(['spell', 'spells']),
    isActiveTab: false,
    requiresRole: 'guest',
  },
  {
    title: 'Sessions',
    iconClass: 'calendar-alt',
    route: 'sessions',
    color: 'green',
    article_types: ['session', 'sessions'],
    showInSidebar: true,
    availableOffline: true,
    associatedRoutes: new Set(['sessions']),
    isActiveTab: false,
    requiresRole: 'guest',
  },
  {
    title: 'Wiki-Overview',
    iconClass: 'diagram-project',
    route: 'graph',
    color: 'white',
    article_types: [],
    showInSidebar: true,
    availableOffline: true,
    associatedRoutes: new Set(['graph']),
    isActiveTab: false,
    requiresRole: 'guest',
  },
  {
    title: 'Wiki Configuration',
    iconClass: 'gear',
    route: 'campaign-config-tables',
    color: 'black',
    article_types: [],
    showInSidebar: true,
    availableOffline: false,
    associatedRoutes: new Set(['campaign-config-tables']),
    isActiveTab: false,
    requiresRole: 'guest',
  },
];

export type SidebarLinkEntry = {
  kind: 'link';
  extraClass?: string;
} & Pick<
  ArticleMetaData,
  | 'title'
  | 'iconClass'
  | 'route'
  | 'requiresRole'
  | 'associatedRoutes'
  | 'availableOffline'
  | 'isActiveTab'
>;
export type SidebarButtonEntry = {
  kind: 'button';
  actionName: string;
  extraClass?: string;
} & Pick<
  ArticleMetaData,
  'availableOffline' | 'title' | 'iconClass' | 'requiresRole' | 'isActiveTab'
>;
export type SidebarEntry = SidebarLinkEntry | SidebarButtonEntry;

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  readonly pwaService = inject(PwaService);
  readonly routingService = inject(RoutingService);
  readonly globalStore = inject(GlobalStore);
  readonly authStore = inject(AuthStore);

  readonly currentRoute = inject(NavigationStore).currentRoute;
  readonly activeRouteName = computed(
    () => (this.currentRoute()?.data as NamedRouteData | undefined)?.name,
  );
  readonly canInstallPwa = toSignal(this.pwaService.canInstall$);
  readonly profileUrl = this.routingService.getRoutePath('direct-profile');

  readonly sidebarEntries = computed<SidebarEntry[]>(() => {
    const campaign = this.globalStore.currentCampaign();
    if (!campaign) return [];

    const entries: SidebarEntry[] = [
      {
        kind: 'button',
        actionName: 'search',
        iconClass: 'search',
        title: 'Search',
        requiresRole: 'guest',
        availableOffline: false,
        isActiveTab: false,
      },
      ...ARTICLE_META_ENTRIES.filter((entry) => entry.showInSidebar).map(
        (entry) => {
          const route = this.routingService.hasRoutePath(entry.route)
            ? this.routingService.getRoutePath(entry.route, {
                campaign: campaign.name,
              })
            : entry.route;
          const activeRouteName = this.activeRouteName();
          const isActiveTab = activeRouteName
            ? entry.associatedRoutes.has(activeRouteName)
            : false;

          return {
            kind: 'link',
            availableOffline: entry.availableOffline,
            iconClass: entry.iconClass,
            route,
            title: entry.title,
            requiresRole: entry.requiresRole,
            associatedRoutes: entry.associatedRoutes,
            isActiveTab,
          } satisfies SidebarLinkEntry;
        },
      ),
    ];

    const currentRole = this.authStore.isGlobalAdmin()
      ? 'admin'
      : (this.authStore.getCampaignRole(campaign.name) ?? 'guest');

    return entries.filter((entry) =>
      hasRoleOrBetter(currentRole, entry.requiresRole),
    );
  });

  readonly sidebarFooterEntries = computed<SidebarEntry[]>(() => {
    const campaign = this.globalStore.currentCampaign();
    if (!campaign) return [];

    const currentRole = this.authStore.isGlobalAdmin()
      ? 'admin'
      : (this.authStore.getCampaignRole(campaign.name) ?? 'guest');

    const entries: SidebarEntry[] = [
      {
        kind: 'link',
        title: 'Profile',
        iconClass: 'circle-user',
        route: this.profileUrl,
        availableOffline: true,
        requiresRole: 'guest',
        isActiveTab: this.activeRouteName() === 'direct-profile',
        associatedRoutes: new Set(),
      },
      {
        kind: 'button',
        actionName: 'logout',
        iconClass: 'right-from-bracket',
        title: 'Logout',
        requiresRole: 'guest',
        availableOffline: true,
        isActiveTab: false,
      },
    ];

    if (this.canInstallPwa()) {
      entries.unshift({
        kind: 'button',
        actionName: 'pwaInstall',
        iconClass: 'file-arrow-down',
        title: 'Install App',
        requiresRole: 'guest',
        availableOffline: false,
        isActiveTab: false,
        extraClass: 'sidebar__entry--install-button',
      } satisfies SidebarButtonEntry);
    }
    return entries.filter((entry) =>
      hasRoleOrBetter(currentRole, entry.requiresRole),
    );
  });
}
