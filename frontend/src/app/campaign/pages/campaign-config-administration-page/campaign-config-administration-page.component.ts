import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NodeLinkTypeRaw } from 'src/app/_models/graph';
import { MapMarkerType } from 'src/app/_models/mapMarkerType';
import { PlayerClass } from 'src/app/_models/playerclass';
import { ConfigAdministrationPageStore } from 'src/app/administration/pages/config-administration-page/config-administration-page.store';
import { AuthStore } from 'src/app/auth.store';
import { ConfigTablesComponent } from 'src/app/design//templates/config-tables/config-tables.component';
import {
  ConfigTableData,
  ConfigTableKind,
} from 'src/app/design/organisms/_model/config-table';
import { GlobalStore } from 'src/app/global.store';

@Component({
  selector: 'app-campaign-config-administration-page',
  imports: [ConfigTablesComponent],
  templateUrl: './campaign-config-administration-page.component.html',
  styleUrl: './campaign-config-administration-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignConfigAdministrationPageComponent {
  store = inject(ConfigAdministrationPageStore);
  globalStore = inject(GlobalStore);
  authStore = inject(AuthStore);

  tableData = computed<ConfigTableData>(() => {
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
