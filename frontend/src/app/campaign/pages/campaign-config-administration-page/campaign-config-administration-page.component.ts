import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NodeLinkTypeRaw } from '../../../_models/graph';
import { MapMarkerType } from '../../../_models/mapMarkerType';
import { PlayerClass } from '../../../_models/playerclass';
import { ConfigAdministrationPageStore } from '../../../administration/pages/config-administration-page/config-administration-page.store';
import { AuthStore } from '../../../auth.store';
import { ConfigTablesComponent } from '../../../design//templates/config-tables/config-tables.component';
import {
  ConfigTableData,
  ConfigTableKind,
} from '../../../design/organisms/_model/config-table';
import { GlobalStore } from '../../../global.store';

@Component({
  selector: 'app-campaign-config-administration-page',
  imports: [ConfigTablesComponent],
  templateUrl: './campaign-config-administration-page.component.html',
  styleUrl: './campaign-config-administration-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignConfigAdministrationPageComponent {
  readonly store = inject(ConfigAdministrationPageStore);
  readonly globalStore = inject(GlobalStore);
  readonly authStore = inject(AuthStore);

  readonly tableData = computed<ConfigTableData>(() => {
    return {
      MARKER_TYPE: this.store.campaignMarkerTypes(),
      PLAYER_CLASS: this.store.campaignPlayerClasses(),
      NODE_LINK_TYPE: this.store.campaignNodeLinkTypes(),
    };
  });

  constructor() {
    this.globalStore.trackIsPageLoading(false);
  }

  loadTableEntries(table: ConfigTableKind): void {
    switch (table) {
      case 'MARKER_TYPE':
        this.store.loadCampaignMarkerTypes();
        break;
      case 'PLAYER_CLASS':
        this.store.loadCampaignPlayerClasses();
        break;
      case 'NODE_LINK_TYPE':
        this.store.loadCampaignNodeLinkTypes();
        break;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteTableEntry(event: { table: ConfigTableKind; entry: any }): void {
    const entryId: number = event.entry.id ?? event.entry.pk;
    if (entryId == null) return;

    switch (event.table) {
      case 'MARKER_TYPE':
        this.store.deleteMarkerType(entryId);
        break;
      case 'PLAYER_CLASS':
        this.store.deletePlayerClass(entryId);
        break;
      case 'NODE_LINK_TYPE':
        this.store.deleteRelationshipType(entryId);
        break;
    }
  }

  createTableEntry(event: { table: ConfigTableKind; entry: unknown }): void {
    if (event.entry == null) return;
    switch (event.table) {
      case 'MARKER_TYPE':
        this.store.createMarkerType(event.entry as MapMarkerType);
        break;
      case 'PLAYER_CLASS':
        this.store.createPlayerClass(event.entry as PlayerClass);
        break;
      case 'NODE_LINK_TYPE':
        this.store.createRelationshipType(event.entry as NodeLinkTypeRaw);
        break;
    }
  }
}
