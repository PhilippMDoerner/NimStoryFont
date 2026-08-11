import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Session, SessionRaw } from '../../../_models/session';
import { RoutingService } from '../../../_services/routing.service';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';
import { SessionsComponent } from '../../organisms/sessions/sessions.component';

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
  readonly campaignName = input.required<string>();
  readonly campaignId = input.required<number>();
  readonly sessions = input.required<Session[]>();
  readonly canUpdate = input.required<boolean>();
  readonly canDelete = input.required<boolean>();
  readonly canCreate = input.required<boolean>();
  readonly serverModel = input.required<Session | undefined>();

  readonly sessionDelete = output<Session>();
  readonly sessionUpdate = output<Session>();
  readonly sessionCreate = output<SessionRaw>();

  readonly routingService = inject(RoutingService);

  readonly homeUrl = computed(() =>
    this.routingService.getRoutePath('home', { campaign: this.campaignName() }),
  );
}
