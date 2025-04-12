import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NodeLinkType, NodeLinkTypeRaw } from 'src/app/_models/graph';
import { MapMarkerType, MapMarkerTypeRaw } from 'src/app/_models/mapMarkerType';
import { PlayerClass } from 'src/app/_models/playerclass';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { RoutingService } from 'src/app/_services/routing.service';
import {
  ConfigTable,
  ConfigTableData,
  ConfigTableKind,
} from 'src/app/design/organisms/_model/config-table';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { ConfigTableComponent } from '../../organisms/config-table/config-table.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';

@Component({
  selector: 'app-config-tables',
  templateUrl: './config-tables.component.html',
  styleUrls: ['./config-tables.component.scss'],
  imports: [
    PageContainerComponent,
    RouterLink,
    ButtonLinkComponent,
    ConfigTableComponent,
  ],
})
export class ConfigTablesComponent {
  currentCampaignId = input.required<number | undefined>();
  tableData = input.required<ConfigTableData>();
  canDeleteGlobalEntries = input.required<boolean>();
  hasCampaignWritePermission = input.required<boolean>();

  readonly loadTableEntries = output<ConfigTableKind>();
  readonly deleteTableEntry = output<{
    table: ConfigTableKind;
    entry: unknown;
  }>();
  readonly createTableEntry = output<{
    table: ConfigTableKind;
    entry: unknown;
  }>();

  canCreate = computed<boolean>(() => {
    if (this.canDeleteGlobalEntries()) return true;
    const isCampaignView = this.currentCampaignId() != null;
    return isCampaignView ? this.hasCampaignWritePermission() : false;
  });
  tables = computed(() => [
    {
      name: 'Marker Type',
      kind: 'MARKER_TYPE',
      icon: 'tag',
      idProp: 'id',
      campaignIdProp: 'campaign_id',
      model: {
        name: undefined,
        is_text_marker: false,
        icon: undefined,
        color: undefined,
        campaign_id: this.currentCampaignId(),
      },
      formFields: [
        this.formlyService.buildInputConfig({
          key: 'name',
          inputKind: 'NAME',
        }),
        this.formlyService.buildCheckboxConfig({
          key: 'is_text_marker',
          label: 'Show name instead of Icon',
          defaultValue: false,
        }),
        this.formlyService.buildInputConfig({
          key: 'icon',
          label: 'Icon (https://fontawesome.com/v6/search?o=r&m=free)',
          inputKind: 'NAME',
        }),
        this.formlyService.buildInputConfig({
          key: 'color',
          inputKind: 'COLOR',
        }),
      ],
      showForm: false,
      entries: this.tableData().MARKER_TYPE,
    } satisfies ConfigTable<MapMarkerType, MapMarkerTypeRaw>,
    {
      name: 'Class',
      kind: 'PLAYER_CLASS',
      icon: 'user',
      idProp: 'pk',
      campaignIdProp: 'campaign_id',
      model: { name: undefined, campaign_id: this.currentCampaignId() },
      formFields: [
        this.formlyService.buildInputConfig({
          key: 'name',
          inputKind: 'NAME',
        }),
      ],
      entries: this.tableData().PLAYER_CLASS,
      showForm: false,
    } satisfies ConfigTable<PlayerClass, PlayerClass>,
    {
      name: 'Node Link Type',
      kind: 'NODE_LINK_TYPE',
      icon: 'link',
      model: { campaign_id: this.currentCampaignId(), weight: 1 },
      entries: this.tableData().NODE_LINK_TYPE,
      formFields: [
        this.formlyService.buildInputConfig({
          key: 'name',
          inputKind: 'NAME',
        }),
        this.formlyService.buildInputConfig<NodeLinkTypeRaw>({
          inputKind: 'NUMBER_FRACTION',
          key: 'weight',
          max: 3,
          min: -3,
        }),
        this.formlyService.buildInputConfig({
          key: 'color',
          inputKind: 'COLOR',
        }),
        this.formlyService.buildInputConfig({
          key: 'icon',
          inputKind: 'NAME',
          wrappers: ['form-field'],
          showWrapperLabel: true,
          label: 'Icon (https://fontawesome.com/v6/search?o=r&m=free)',
        }),
      ],
      idProp: 'id',
      campaignIdProp: 'campaign_id',
      showForm: false,
    } satisfies ConfigTable<NodeLinkType, NodeLinkTypeRaw>,
  ]);

  campaignOverviewUrl = this.routingService.getRoutePath('campaign-overview');

  constructor(
    private routingService: RoutingService,
    private formlyService: FormlyService,
  ) {}

  createEntry(kind: ConfigTableKind, entry: unknown): void {
    this.createTableEntry.emit({ table: kind, entry: entry });
    const table = this.getTable(kind);
    if (table) {
      table.showForm = false;
    }
  }

  private getTable(kind: ConfigTableKind) {
    return this.tables().find((table) => table.kind === kind);
  }
}
