import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NodeLinkTypeRaw } from '../../../_models/graph';
import { MapMarkerType } from '../../../_models/mapMarkerType';
import { PlayerClass } from '../../../_models/playerclass';
import { AuthStore } from '../../../auth.store';
import {
  ConfigTableData,
  ConfigTableKind,
} from '../../../design/organisms/_model/config-table';
import { ConfigTablesComponent } from '../../../design/templates/config-tables/config-tables.component';
import { GlobalStore } from '../../../global.store';
import { ConfigAdministrationPageStore } from './config-administration-page.store';

@Component({
  selector: 'app-config-administration-page',
  templateUrl: './config-administration-page.component.html',
  styleUrls: ['./config-administration-page.component.scss'],
  providers: [ConfigAdministrationPageStore],
  imports: [ConfigTablesComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAdministrationPageComponent {
  readonly store = inject(ConfigAdministrationPageStore);
  readonly globalStore = inject(GlobalStore);
  readonly authStore = inject(AuthStore);

  readonly tableData = computed<ConfigTableData>(() => {
    return {
      MARKER_TYPE: this.store.markerTypes(),
      PLAYER_CLASS: this.store.playerClasses(),
      NODE_LINK_TYPE: this.store.nodeLinkTypes(),
    };
  });

  loadTableEntries(table: ConfigTableKind): void {
    switch (table) {
      case 'MARKER_TYPE':
        this.store.loadMarkerTypes();
        break;
      case 'PLAYER_CLASS':
        this.store.loadPlayerClasses();
        break;
      case 'NODE_LINK_TYPE':
        this.store.loadNodeLinkTypes();
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
