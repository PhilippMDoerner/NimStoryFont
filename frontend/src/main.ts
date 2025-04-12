/// <reference types="@angular/localize" />

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  importProvidersFrom,
  inject,
  isDevMode,
  provideAppInitializer,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { errorInterceptor } from './app/_interceptors/errorInterceptor';
import { offlineInterceptor } from './app/_interceptors/offlineInterceptor';
import { FORMLY_MODULE } from './app/_modules/formly_constants';
import { ROUTES } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { AuthStore } from './app/auth.store';
import { GlobalStore } from './app/global.store';
import { NavigationStore } from './app/navigation.store';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FORMLY_MODULE),
    provideRouter(ROUTES, withViewTransitions()),
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    provideHttpClient(withInterceptors([offlineInterceptor, errorInterceptor])),
    GlobalStore,
    NavigationStore,
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideAppInitializer(() => inject(AuthStore).loadAuthData()),
  ],
}).catch((err) => console.error(err));
