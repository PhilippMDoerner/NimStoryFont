import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { Session, SessionRaw } from 'src/app/_models/session';
import {
  slideOutFromBottom,
  slideUpFromBottom,
} from 'src/app/design/animations/slideDown';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { SpinnerComponent } from 'src/app/design/atoms/spinner/spinner.component';
import { CollapsiblePanelComponent } from 'src/app/design/molecules';
import { getPseudoRandomId } from 'src/utils/math';
import {
  FocusItem,
  FocusListComponent,
  FocusListContextTypecastDirective,
} from '../focus-list/focus-list.component';
import { SessionComponent } from '../session/session.component';

interface SessionCard {
  session: Session;
  isOpen: boolean;
}

@Component({
  selector: 'app-sessions',
  imports: [
    ButtonComponent,
    CollapsiblePanelComponent,
    SessionComponent,
    SpinnerComponent,
    HotkeyDirective,
    FocusListComponent,
    FocusListContextTypecastDirective,
  ],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideOutFromBottom, slideUpFromBottom],
})
export class SessionsComponent {
  readonly DEFAULT_TITLE = 'New Session';

  readonly campaignId = input.required<number>();
  readonly sessions = input.required<Session[]>();
  readonly canUpdate = input.required<boolean>();
  readonly canDelete = input.required<boolean>();
  readonly canCreate = input.required<boolean>();
  readonly serverModel = input.required<Session | undefined>();

  readonly sessionDelete = output<Session>();
  readonly sessionUpdate = output<Session>();
  readonly sessionCreate = output<SessionRaw>();

  readonly isCreatingSession = signal(false);
  readonly createSessionData = linkedSignal(() => {
    const lastSession = this.sessions()[0];
    const currentDate = new Date().toISOString().split('T')[0];
    return {
      name: this.DEFAULT_TITLE,
      campaign: this.campaignId(),
      session_date: currentDate,
      is_main_session: true,
      session_number: lastSession.session_number + 1,
      start_day: lastSession.end_day,
    } as Session;
  });

  readonly sessionCards = computed<FocusItem<SessionCard>[]>(() =>
    this.sessions().map((session) => ({
      id: session.pk ?? getPseudoRandomId(),
      data: { session: session, isOpen: false },
    })),
  );

  onSessionDelete(sessionToDelete: Session) {
    this.sessionDelete.emit(sessionToDelete);
  }

  onSessionCreate(session: Partial<SessionRaw>) {
    this.sessionCreate.emit({
      ...session,
      campaign: this.campaignId(),
    } as SessionRaw);
    this.isCreatingSession.set(false);
  }

  cancelSessionCreation() {
    this.isCreatingSession.set(false);
  }

  addSession() {
    this.isCreatingSession.set(true);
  }
}
