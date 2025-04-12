import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OverviewItem } from 'src/app/_models/overview';
import { Icon } from 'src/app/design/atoms/_models/icon';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import {
  ContextMenuComponent,
  MenuItem,
} from '../../molecules/context-menu/context-menu.component';

const DISPLAY_STATES = [
  'Default',
  'All',
  'Completed',
  'Failed',
  'On hold',
  'In progress',
] as const;
type DisplayState = (typeof DISPLAY_STATES)[number];

@Component({
  selector: 'app-quest-table',
  templateUrl: './quest-table.component.html',
  styleUrls: ['./quest-table.component.scss'],
  imports: [
    FormsModule,
    RouterLink,
    IconComponent,
    NgTemplateOutlet,
    ContextMenuComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestTableComponent {
  questTaker = input.required<string>();
  quests = input.required<OverviewItem[]>();

  menuItems = computed<MenuItem[]>(() =>
    DISPLAY_STATES.map(
      (state): MenuItem => ({
        kind: 'BUTTON',
        actionName: state,
        label: state,
        icon: this.STATE_ICON_MAPPING[state],
        active: state === this.state(),
      }),
    ),
  );
  state = signal<DisplayState>('Default');

  displayQuests = computed<OverviewItem[]>(() =>
    this.quests().filter((quest) =>
      this.shouldDisplayQuest(quest, this.state()),
    ),
  );

  STATE_ICON_MAPPING: { [key: string]: Icon } = {
    Completed: 'square-check',
    'On hold': 'hourglass-half',
    Failed: 'times',
    'In progress': 'spinner',
  };

  STATE_TABLE_TYPE_MAPPING: { [key: string]: string } = {
    Completed: 'success',
    'On hold': 'warning',
    Failed: 'danger',
    'In progress': '',
  };

  updateDisplayState(filterStateStr: string) {
    const filterState = filterStateStr as DisplayState;
    this.state.set(filterState);
  }

  shouldDisplayQuest(quest: OverviewItem, displayState: DisplayState): boolean {
    const isShowingAllQuests = displayState.toLowerCase() === 'all';
    if (isShowingAllQuests) {
      return true;
    }

    const isMatchingDesiredState =
      displayState.toLowerCase() === quest.status?.toLowerCase();
    if (isMatchingDesiredState) {
      return true;
    }

    const isDefaultState = displayState === 'Default';
    const isMatchingDefault = ['in progress', 'on hold'].includes(
      quest.status?.toLowerCase() as string,
    );
    return isDefaultState && isMatchingDefault;
  }
}
