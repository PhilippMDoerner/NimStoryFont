import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { RoutingService } from 'src/app/_services/routing.service';
import { AuthStore } from 'src/app/auth.store';
import { ButtonLinkComponent } from 'src/app/design/atoms/button-link/button-link.component';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { ErrorType } from 'src/app/general/_models/error';
import { GlobalStore } from 'src/app/global.store';

const FALLBACK_ERROR: ErrorType = {
  htmlBody: 'Something went wrong',
  title: 'Unknown Error',
  image: '/assets/error_images/400.png',
};

const ERROR_CONTENT: { [key: number]: ErrorType } = {
  400: {
    htmlBody: 'It appears you supplied some invalid inputs!',
    title: '400 Bad Request',
    image: '/assets/error_images/400.png',
  },
  401: {
    htmlBody:
      'Sorry man, this is an invite-only club. Got to be logged in to get anything.',
    title: '401 Unauthorized',
    image: '/assets/error_images/404.png',
  },
  403: {
    htmlBody: "Naughty naughty! You're not allowed to do what you just did!",
    title: '403 Forbidden',
    image: '/assets/error_images/noscript.jpg',
  },
  404: {
    htmlBody:
      "We couldn't find the site you are looking for. <br> But a dragon found you !",
    title: '404 Not Found',
    image: '/assets/error_images/404.png',
  },
  500: {
    htmlBody:
      "Something went seriously wrong on the server. <br> We'll be doing our best to force our Beholders to do better work!",
    title: '500 Server Error',
    image: '/assets/error_images/500.jpeg',
  },
  504: {
    htmlBody:
      "Your connection seems to be taking a short rest. <br>  Sadly, we need internet to show you a page you haven't recently visited and thus cached. <br> Please connect to the internet and try again.",
    title: '504 Gateway Timeout',
    image: '/assets/error_images/504.jpeg',
  },
  0: {
    htmlBody:
      "Your connection seems to be taking a short rest. <br>  Sadly, we need internet to show you a page you haven't recently visited and thus cached. <br> Please connect to the internet and try again.",
    title: '504 Gateway Timeout',
    image: '/assets/error_images/504.jpeg',
  },
};

@Component({
  selector: 'app-error-page',
  imports: [
    AsyncPipe,
    RouterLink,
    NgTemplateOutlet,
    ButtonComponent,
    ButtonLinkComponent,
  ],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent {
  routingService = inject(RoutingService);
  route = inject(ActivatedRoute);
  authStore = inject(AuthStore);
  globalStore = inject(GlobalStore);

  errorStatus$ = this.route.params.pipe(
    map((params) => parseInt(params['errorStatus'])),
  );
  errorContents$ = this.errorStatus$.pipe(
    map((status) => ERROR_CONTENT[status] ?? FALLBACK_ERROR),
  );

  campaignHomeUrl = computed(() => {
    const campaignName = this.globalStore.campaignName();
    if (!campaignName)
      return this.routingService.getRoutePath('campaign-overview');

    return this.routingService.getRoutePath('home', {
      campaign: this.globalStore.campaignName(),
    });
  });

  onReLogin() {
    this.globalStore.logout();
    this.routingService.routeToPath('login');
  }
}
