import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

import { componentId } from '../../../../utils/DOM';
import { ShortcutAction } from '../../../_models/hotkey';
import { ElementKind } from '../../atoms/_models/button';
import { BadgeComponent } from '../../atoms/badge/badge.component';
import { InteractiveBadgeComponent } from '../../atoms/interactive-badge/interactive-badge.component';
import { BadgeListEntry, BadgeListSelectOptions } from '../_models/badge-list';
import { SmallCreateFormComponent } from '../small-create-form/small-create-form.component';

type CreateBadgeKind = 'LINK' | 'SELECT' | 'NONE';

interface LinkCreateOptions {
  kind: 'LINK';
  link: string;
  createBadgeLabel?: string;
  hotkeyAction?: ShortcutAction | undefined;
}
interface BadgeCreateOptions<T> {
  kind: 'SELECT';
  config: BadgeListSelectOptions<T>;
  createBadgeLabel?: string;
  formFieldLabel: string;
  hotkeyAction?: ShortcutAction | undefined;
}
type CreateOptions<T> =
  | BadgeCreateOptions<T>
  | LinkCreateOptions
  | { kind: 'NONE' };

@Component({
  selector: 'app-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SmallCreateFormComponent,
    InteractiveBadgeComponent,
    NgTemplateOutlet,
    BadgeComponent,
  ],
  host: {
    role: 'region',
    '[attr.aria-labelledby]': 'headingId',
  },
})
export class BadgeListComponent<T, O> {
  readonly entries = input.required<BadgeListEntry<T>[]>();
  readonly createOptions = input<CreateOptions<O>>();
  readonly disableHotkeys = input<boolean>(false);
  readonly label = input('Entry');
  readonly canCreate = input(false);
  readonly canDelete = input(false);
  readonly submitButtonType = input<ElementKind>('PRIMARY');
  readonly cancelButtonType = input<ElementKind>('SECONDARY');

  readonly entryDelete = output<T>();
  readonly entryCreate = output<O>();

  readonly headingId = componentId();
  readonly createKind = computed<CreateBadgeKind | undefined>(
    () => this.createOptions()?.kind,
  );
  readonly createLink = computed(() =>
    this.createKind() === 'LINK'
      ? (this.createOptions() as LinkCreateOptions).link
      : undefined,
  );
  readonly createBadgeLabel = computed(() => {
    if (this.createKind() === 'NONE') return undefined;
    const options = this.createOptions() as
      | BadgeCreateOptions<O>
      | LinkCreateOptions;

    return options.createBadgeLabel ?? `Add ${this.label()}`;
  });
  readonly options = computed(() =>
    this.createKind() === 'SELECT'
      ? (this.createOptions() as BadgeCreateOptions<O>).config.options
      : undefined,
  );
  readonly optionLabelProp = computed(() =>
    this.createKind() === 'SELECT'
      ? (this.createOptions() as BadgeCreateOptions<O>).config.labelProp
      : undefined,
  );
  readonly optionValueProp = computed(() =>
    this.createKind() === 'SELECT'
      ? (this.createOptions() as BadgeCreateOptions<O>).config.valueProp
      : undefined,
  );
  readonly formFieldLabel = computed(() =>
    this.createKind() === 'SELECT'
      ? (this.createOptions() as BadgeCreateOptions<O>).formFieldLabel
      : undefined,
  );
  readonly hotkeyAction = computed<ShortcutAction | undefined>(() => {
    const createOptions = this.createOptions();
    switch (createOptions?.kind) {
      case 'NONE':
        return undefined;
      case 'LINK':
      case 'SELECT':
        return createOptions?.hotkeyAction;
    }
    return undefined;
  });

  onEntryDelete(entry: BadgeListEntry<T>) {
    if (!this.canDelete()) {
      return;
    }

    this.entryDelete.emit(entry.badgeValue);
  }

  onEntryCreate(selectedOption: O) {
    if (!this.canCreate()) {
      return;
    }

    this.entryCreate.emit(selectedOption);
  }
}
