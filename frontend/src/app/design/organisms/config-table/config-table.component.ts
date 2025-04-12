import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { HeadingDirective } from 'src/app/_directives/heading.directive';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { HeadingLevel } from '../../atoms/_models/heading';
import { CardComponent } from '../../atoms/card/card.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { SeparatorComponent } from '../../atoms/separator/separator.component';
import { ConfirmationToggleButtonComponent } from '../../molecules/confirmation-toggle-button/confirmation-toggle-button.component';
import { FormComponent } from '../../molecules/form/form.component';
import { ConfigTable } from '../_model/config-table';

interface TableEntry<T extends object> {
  id: number;
  campaignId: number;
  properties: { key: string; value: T[keyof T] }[];
}

@Component({
  selector: 'app-config-table',
  imports: [
    IconComponent,
    SeparatorComponent,
    ConfirmationToggleButtonComponent,
    FormComponent,
    CardComponent,
    ButtonComponent,
    HeadingDirective,
  ],
  templateUrl: './config-table.component.html',
  styleUrl: './config-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTableComponent<
  FullObj extends object,
  RawObj extends object,
> {
  table = input.required<ConfigTable<FullObj, RawObj>>();
  canDeleteGlobalEntries = input.required<boolean>();
  canDeleteCampaignEntries = input.required<boolean>();
  canCreate = input.required<boolean>();
  ariaLevel = input.required<HeadingLevel>();

  tableEntries = computed<TableEntry<FullObj>[]>(() => {
    const entries = this.table().entries ?? [];
    const entryIdProp = this.table().idProp;
    const campaignIdProp = this.table().campaignIdProp;
    return entries.map(
      (entry): TableEntry<FullObj> =>
        this.toTableEntry(entry, entryIdProp, campaignIdProp),
    );
  });

  columnNames = computed<string[]>(() => {
    const firstEntry = this.table().entries?.[0];
    if (!firstEntry) return [];

    return Object.keys(firstEntry).filter((key) => key !== this.table().idProp);
  });

  loadTableEntries = output<void>();
  deleteTableEntry = output<FullObj>();
  createTableEntry = output<RawObj>();

  createEntry(entry: Partial<RawObj>): void {
    this.createTableEntry.emit(entry as RawObj);
  }

  deleteEntry(entryId: number): void {
    const entry = this.table().entries?.find(
      (entry) => entry[this.table().idProp] === entryId,
    );
    if (!entry) return;
    this.deleteTableEntry.emit(entry);
  }

  private toTableEntry(
    entry: FullObj,
    entryIdProp: keyof FullObj,
    campaignIdProp: keyof FullObj,
  ): TableEntry<FullObj> {
    const properties = Object.keys(entry)
      .filter((key) => key !== entryIdProp)
      .map((key) => ({
        key,
        value: (entry as FullObj)[key as keyof FullObj],
      }));

    return {
      id: entry[entryIdProp] as number,
      campaignId: entry[campaignIdProp] as number,
      properties,
    };
  }
}
