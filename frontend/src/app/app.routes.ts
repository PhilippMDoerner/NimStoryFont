import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { loginGuard } from './_guards/login.guard';
import { rootRedirect } from './_redirects/root.redirect';
import { redirectWithQueryParams } from './_redirects/with-query-params.redirect';
import {
  campaignSetResolver,
  resetTracking,
  trackCampaignName,
} from './_resolvers/campaign.resolver';
import { adminRoutes } from './administration/administration-routes';
import { campaignRoutes } from './campaign/campaign-routes';
import { generalRoutes } from './general/general-routes';
import { campaignCreationGuard } from './general/pages/create-campaign/campaign-creation.guard';
import { UserPreferencesStore } from './user-preferences.store';

const redirectRoutes: Routes = [
  //Redirect Routes
  {
    path: '',
    redirectTo: rootRedirect,
    pathMatch: 'full',
    data: { name: 'start' },
  },
  {
    path: `home`,
    redirectTo: redirectWithQueryParams('campaign-overview'),
    pathMatch: 'full',
    data: { name: 'no-campaigns' },
  },
];

const errorRoutes: Routes = [
  {
    path: `error/:errorStatus`,
    loadComponent: () =>
      import('./general/pages/error-page/error-page.component').then(
        (m) => m.ErrorPageComponent,
      ),
    data: { name: 'error' },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./general/pages/error-page/error-page.component').then(
        (m) => m.ErrorPageComponent,
      ),
    data: { name: '404' },
  },
];

export const ROUTES: Routes = [
  {
    path: '',
    children: [
      ...redirectRoutes,
      {
        path: 'campaigns/create',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            './general/pages/create-campaign/create-campaign.component'
          ).then((m) => m.CreateCampaignComponent),
        canActivate: [campaignCreationGuard],
        data: { name: 'campaign-create' },
      },
      {
        path: '',
        resolve: {
          campaignSetResolver,
          loadGeneralPreferences: () =>
            inject(UserPreferencesStore).loadGeneral(),
          loadShortcuts: () =>
            inject(UserPreferencesStore).loadShortcutEntries(),
        },
        children: [
          ...generalRoutes,
          {
            path: '',

            children: [
              {
                path: '',
                children: [
                  {
                    path: 'admin',
                    children: adminRoutes,
                  },
                  {
                    path: `campaigns`,
                    loadComponent: () =>
                      import(
                        './general/pages/campaign-overview-page/campaign-overview-page.component'
                      ).then((m) => m.CampaignOverviewPageComponent),
                    data: { name: 'campaign-overview' },
                    canActivate: [loginGuard],
                  },
                ],
                resolve: { resetTracking },
              },
              {
                path: ':campaign',
                children: campaignRoutes,
                resolve: { trackCampaignName },
              },
            ],
          },
        ],
      },
      ...errorRoutes,
    ],
  },
];
