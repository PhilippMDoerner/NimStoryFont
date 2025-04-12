import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Session, SessionRaw } from 'src/app/_models/session';
import { RoutingService } from 'src/app/_services/routing.service';
import { PageContainerComponent } from 'src/app/design/organisms/page-container/page-container.component';
import { SessionsComponent } from 'src/app/design/organisms/sessions/sessions.component';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';

@Component({
  selector: 'app-sessions-template',
  imports: [
    SessionsComponent,
    PageContainerComponent,
    ButtonLinkComponent,
    RouterLink,
  ],
  templateUrl: './sessions-template.component.html',
  styleUrl: './sessions-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionsTemplateComponent {
  campaignName = input.required<string>();
  campaignId = input.required<number>();
  sessions = input.required<Session[]>();
  canUpdate = input.required<boolean>();
  canDelete = input.required<boolean>();
  canCreate = input.required<boolean>();
  serverModel = input.required<Session | undefined>();

  readonly sessionDelete = output<Session>();
  readonly sessionUpdate = output<Session>();
  readonly sessionCreate = output<SessionRaw>();

  routingService = inject(RoutingService);

  homeUrl = computed(() =>
    this.routingService.getRoutePath('home', { campaign: this.campaignName() }),
  );
}
