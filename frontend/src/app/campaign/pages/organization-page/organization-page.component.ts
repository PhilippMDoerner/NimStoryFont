import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationComponent } from 'src/app/design/templates/organization/organization.component';
import { GlobalStore } from 'src/app/global.store';
import { environment } from 'src/environments/environment';
import { OrganizationStore } from './organization-page.store';

@Component({
  selector: 'app-organization-page',
  imports: [OrganizationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './organization-page.component.html',
  styleUrl: './organization-page.component.scss',
})
export class OrganizationPageComponent {
  serverUrl = environment.backendDomain;
  store = inject(OrganizationStore);
  globalStore = inject(GlobalStore);

  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    computed(() => this.store.organization() == null);

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }
}
