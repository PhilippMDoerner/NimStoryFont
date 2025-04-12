import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { SessionsTemplateComponent } from 'src/app/design//templates/sessions-template/sessions-template.component';
import { GlobalStore } from 'src/app/global.store';
import { SessionsPageStore } from './sessions-page.store';

@Component({
  selector: 'app-sessions-page',
  imports: [SessionsTemplateComponent],
  templateUrl: './sessions-page.component.html',
  styleUrl: './sessions-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionsPageComponent {
  store = inject(SessionsPageStore);
  globalStore = inject(GlobalStore);
  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    computed(
      () =>
        this.store.sessions() == null ||
        this.globalStore.currentCampaign() == null,
    );

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }
}
