import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { RoutingService } from '../../../_services/routing.service';
import { OrganizationComponent } from '../../../design/templates/organization/organization.component';
import { GlobalStore } from '../../../global.store';
import { OrganizationStore } from './organization-page.store';

@Component({
  selector: 'app-organization-page',
  imports: [OrganizationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './organization-page.component.html',
  styleUrl: './organization-page.component.scss',
})
export class OrganizationPageComponent {
  readonly serverUrl = '';
  readonly store = inject(OrganizationStore);
  readonly globalStore = inject(GlobalStore);
  readonly routingService = inject(RoutingService);

  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    computed(() => this.store.organization() == null);

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }

  deleteOrganization(organizationId: number) {
    this.store.deleteOrganization(organizationId);
    this.routingService.routeToPath('organization-overview', {
      campaign: this.globalStore.campaignName(),
    });
  }
}
