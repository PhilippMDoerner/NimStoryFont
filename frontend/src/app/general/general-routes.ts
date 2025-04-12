import { loginGuard } from '../_guards/login.guard';
import { onlyOnlineGuard } from '../_guards/only-online.guard';
import { SiteAdministrationPageStore } from '../administration/pages/site-administration-page/site-administration-page.store';
import { registrationGuard } from './pages/registration/registration.guard';

export const generalRoutes = [
  //Login Routes
  {
    path: `login`,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/login-page/login-page.component').then(
            (m) => m.LoginPageComponent,
          ),
        data: { name: 'login' },
      },
      {
        path: `:state`,
        loadComponent: () =>
          import('./pages/login-page/login-page.component').then(
            (m) => m.LoginPageComponent,
          ),
        data: { name: 'login-state' },
      },
    ],
    title: 'Login',
  },
  //Registration Routes
  {
    path: 'registration',
    loadComponent: () =>
      import('./pages/registration/registration.component').then(
        (m) => m.RegistrationComponent,
      ),
    data: { name: 'registration' },
    canActivate: [loginGuard, registrationGuard, onlyOnlineGuard],
    providers: [SiteAdministrationPageStore],
    title: 'Registration',
  },
  //User Routes
  {
    path: `profile/me`,
    loadComponent: () =>
      import('./pages/profile-page/profile-page.component').then(
        (m) => m.ProfilePageComponent,
      ),
    data: { name: 'direct-profile' },
    canActivate: [loginGuard, onlyOnlineGuard],
    title: 'Your Profile',
  },
];
