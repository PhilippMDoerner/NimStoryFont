import { Route } from '@angular/router';
import { GeneralOverviewType } from 'src/app/design/templates/_models/generalOverviewType';
import { siteAdminGuard } from '../_guards/admin.guard';
import { loginGuard } from '../_guards/login.guard';
import { onlyOnlineGuard } from '../_guards/only-online.guard';
import { registrationGuard } from '../general/pages/registration/registration.guard';
import { CampaignRole } from './token';

//Route Data Models
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ROUTE_NAMES = [
  'login',
  'login-state',
  'direct-profile',
  'admin',
  'config-tables',
  'character-overview',
  'creature-overview',
  'diaryentry-overview',
  'item-overview',
  'location-overview',
  'organization-overview',
  'campaign-admin',
  'campaign-update',
  'home',
  'search',
  'character-create',
  'character',
  'character-update',
  'creature-create',
  'creature',
  'creature-update',
  'item-create',
  'item',
  'item-update',
  'diaryentry-create',
  'diaryentry',
  'diaryentry-update',
  'diaryentry-encounter',
  'location-create',
  'location',
  'location-update',
  'organization-create',
  'organization',
  'organization-update',
  'quest-overview',
  'quest-create',
  'quest',
  'quest-update',
  'spells',
  'spell',
  'rules',
  'rule',
  'sessions',
  'quote-overview',
  'map-create',
  'default-map',
  'map',
  'map-update',
  'marker-create',
  'marker-map-create',
  'marker',
  'marker-update',
  'sessionaudio-overview',
  'sessionaudio-create',
  'sessionaudio',
  'sessionaudio-update',
  'graph',
  'campaign-config-tables',
  'registration',
] as const;

export type RouteName = (typeof ROUTE_NAMES)[number];

export interface NamedRouteData {
  name: RouteName;
}

interface RoleRouteData extends NamedRouteData {
  requiredMinimumRole: CampaignRole;
}

export interface BaseNamedRoute extends Route {
  data: NamedRouteData;
}

//Route Models
export interface GeneralRoute extends BaseNamedRoute {
  canActivate?: [
    typeof loginGuard,
    ...(typeof onlyOnlineGuard | typeof registrationGuard)[],
  ];
}

export interface AdminRoute extends BaseNamedRoute {
  canActivate: [typeof siteAdminGuard, ...(typeof onlyOnlineGuard)[]];
}

export interface CampaignRoute extends BaseNamedRoute {
  data: RoleRouteData;
}

export interface CampaignOverviewRoute extends BaseNamedRoute {
  data: RoleRouteData & { overviewType: GeneralOverviewType };
}
