import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { OverviewItem } from 'src/app/_models/overview';
import { RoutingService } from 'src/app/_services/routing.service';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';
import { QuestTableComponent } from '../../organisms/quest-table/quest-table.component';

@Component({
  selector: 'app-quest-overview',
  templateUrl: './quest-overview.component.html',
  styleUrls: ['./quest-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PageContainerComponent,
    RouterLink,
    ButtonLinkComponent,
    QuestTableComponent,
    HotkeyDirective,
  ],
})
export class QuestOverviewComponent {
  quests = input.required<OverviewItem[]>();
  campaignName = input.required<string>();

  homeUrl = computed(() =>
    this.routingService.getRoutePath('home', { campaign: this.campaignName }),
  );
  createUrl = computed(() =>
    this.routingService.getRoutePath('quest-create', {
      campaign: this.campaignName,
    }),
  );
  groupedQuests = computed<{ key: string; value: OverviewItem[] }[]>(() =>
    this.groupQuestsByTaker(this.quests()),
  );

  constructor(private routingService: RoutingService) {}

  private groupQuestsByTaker(
    itemArray: OverviewItem[],
  ): { key: string; value: OverviewItem[] }[] {
    /**
     * Turns an array of QuestObjects into an array of objects, the object containing
     * an array of all quests associated with a given quest Taker
     * */
    const callback = (
      accumulator: { [key: string]: OverviewItem[] },
      quest: OverviewItem,
    ) => {
      const questTaker: string = quest.taker_details?.name as string;

      // eslint-disable-next-line no-prototype-builtins
      const hasQuestTaker = accumulator.hasOwnProperty(questTaker);
      if (hasQuestTaker) {
        accumulator[questTaker].push(quest);
      } else {
        accumulator[questTaker] = [quest];
      }
      return accumulator;
    };
    const groupedQuests = itemArray.reduce(callback, {});

    const result = Object.keys(groupedQuests).map((key) => ({
      key,
      value: groupedQuests[key],
    }));

    // Sort by Quest-Taker alphabetically, but put "Group" quests always at the start
    const sortedResults = result.sort((objA, objB) => {
      if (objA.key === 'Group') return -1;
      else if (objB.key === 'Group') return 1;
      else if (objA.key > objB.key) return 1;
      else if (objA.key === objB.key) return 0;
      else return -1;
    });

    // Sort individual quests by quest-status, In-progress > On Hold > Completed > Failed
    const statusValues: { [key: string]: number } = {
      'In progress': 1,
      'On Hold': 2,
      Completed: 3,
      Failed: 4,
    };
    for (const [index, quest] of sortedResults.entries()) {
      sortedResults[index].value = quest.value.sort(
        (objA: OverviewItem, objB: OverviewItem) => {
          const isSameStatus = objA.status === objB.status;
          if (!isSameStatus) {
            return (
              statusValues[objA.status as string] -
              statusValues[objB.status as string]
            );
          } else {
            if ((objA.name ?? '') > (objB.name ?? '')) {
              return 1;
            } else if ((objA.name ?? '') < (objB.name ?? '')) {
              return -1;
            } else {
              return 0;
            }
          }
        },
      );
    }

    return sortedResults;
  }
}
