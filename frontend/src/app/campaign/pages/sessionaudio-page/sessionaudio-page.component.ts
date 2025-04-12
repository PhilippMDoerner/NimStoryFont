import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { SessionaudioComponent } from 'src/app/design//templates/sessionaudio/sessionaudio.component';
import { GlobalStore } from 'src/app/global.store';
import { environment } from 'src/environments/environment';
import { SessionaudioPageStore } from './sessionaudio-page.store';

@Component({
  selector: 'app-sessionaudio-page',
  imports: [SessionaudioComponent],
  templateUrl: './sessionaudio-page.component.html',
  styleUrl: './sessionaudio-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionaudioPageComponent {
  serverUrl = environment.backendDomain;
  globalStore = inject(GlobalStore);
  store = inject(SessionaudioPageStore);

  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    computed(() => this.store.sessionaudio() == null);

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }
}
