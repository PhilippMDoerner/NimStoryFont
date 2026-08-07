import { DataSource } from '@angular/cdk/collections';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import {
  GroupByFirstLetterPipe,
  GroupByPipe,
} from 'src/app/design/atoms/_pipes/groupObjects.pipe';
import { withViewTransition } from 'src/utils/animation';
import { componentId } from 'src/utils/DOM';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputComponent } from '../../atoms/input/input.component';
import { OverviewEntryComponent } from '../../molecules/overview-entry/overview-entry.component';
import { FilterListEntry } from '../_model/filterListEntry';
import { TreeComponent, TreeNode } from '../tree/tree.component';

type GroupMode = 'PROPERTY' | 'LETTER' | 'SEARCH' | 'TREE';
export type GroupConfig<T> =
  | { mode: 'PROPERTY'; groupProp: string }
  | { mode: 'LETTER' }
  | { mode: 'SEARCH' }
  | { mode: 'TREE'; toTreeData: (entries: T[]) => DataSource<TreeNode>[] };

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GroupByFirstLetterPipe,
    NgClass,
    GroupByPipe,
    NgTemplateOutlet,
    HotkeyDirective,
    ButtonComponent,
    InputComponent,
    TreeComponent,
    OverviewEntryComponent,
  ],
})
export class FilterListComponent<T> {
  readonly entries = input.required<FilterListEntry<T>[]>();
  readonly labelProp = input.required<Exclude<keyof T, symbol | number>>();
  readonly bodyProp = input<Exclude<keyof T, symbol | number>>();
  readonly heading = input.required<string>();
  readonly groupConfig = input<GroupConfig<T>>({ mode: 'LETTER' });
  readonly forceSingleLine = input(false);

  readonly filterValue = signal<string | undefined>(undefined);
  readonly listId = componentId();
  readonly searchId = `${this.listId}-search`;

  readonly displayEntries = computed<FilterListEntry<T>[]>(() => {
    const filterValue = this.filterValue()?.toLowerCase();
    if (filterValue == null || filterValue === '') {
      return this.entries();
    }

    return this.entries().filter((entry) => {
      const entryLabel = entry[this.labelProp()] as string;
      return entryLabel.toLowerCase().includes(filterValue);
    });
  });

  readonly mode = computed<GroupMode>(() => {
    const isSearching = (this.filterValue()?.length ?? 0) > 0;
    if (isSearching) return 'SEARCH';
    return this.groupConfig().mode;
  });

  readonly treeData = computed<DataSource<TreeNode>[] | undefined>(() => {
    const config = this.groupConfig();
    const hasTreeMode = config.mode === 'TREE';
    if (!hasTreeMode) return undefined;

    return config.toTreeData(this.entries());
  });

  readonly firstArticle = computed<T>(() => this.displayEntries()[0]);
  readonly canOpenArticle = computed(() => !!this.firstArticle());
  readonly searchButtonLabel = computed(() => {
    const targetArticle = this.firstArticle();
    if (targetArticle) {
      return `Open first article found: ${targetArticle[this.labelProp()]}`;
    }
    return 'Nothing matches your filter query';
  });

  constructor(private routing: Router) {}

  openFirstArticle(event: SubmitEvent) {
    event.preventDefault();
    const hasEntry = this.displayEntries().length > 0;
    if (!hasEntry) {
      return;
    }

    const entry = this.displayEntries()[0];
    this.routing.navigateByUrl(entry.link);
  }

  onFilterChange(newFilterValue: string): void {
    withViewTransition(() => this.filterValue.set(newFilterValue));
  }
}
