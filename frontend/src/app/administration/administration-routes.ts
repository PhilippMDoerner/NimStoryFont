import { Route } from '@angular/router';
import { siteAdminGuard } from '../_guards/admin.guard';
import { onEnterReset } from '../_guards/onEnterReset';
import { onlyOnlineGuard } from '../_guards/only-online.guard';
import { ConfigAdministrationPageStore } from './pages/config-administration-page/config-administration-page.store';

export const adminRoutes: Route[] = [
  //General Admin Routes
  {
    path: ``,
    loadComponent: () =>
      import(
        './pages/site-administration-page/site-administration-page.component'
      ).then((m) => m.SiteAdministrationPageComponent),
    data: { name: 'admin' },
    canActivate: [siteAdminGuard, onlyOnlineGuard],
    title: 'Site Administration',
  },
  {
    path: `configtables`,
    loadComponent: () =>
      import(
        './pages/config-administration-page/config-administration-page.component'
      ).then((m) => m.ConfigAdministrationPageComponent),
    data: { name: 'config-tables' },
    canActivate: [siteAdminGuard, onEnterReset(ConfigAdministrationPageStore)],
    providers: [ConfigAdministrationPageStore],
    title: 'Config Tables',
  },
];
