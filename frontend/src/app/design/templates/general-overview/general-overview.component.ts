import { ArrayDataSource, DataSource } from '@angular/cdk/collections';
import { NgTemplateOutlet, TitleCasePipe } from '@angular/common';
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
import { componentId } from 'src/utils/DOM';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { ArticleFooterComponent } from '../../molecules';
import { ImageCardComponent } from '../../molecules/image-card/image-card.component';
import { FilterListEntry } from '../../organisms/_model/filterListEntry';
import { FilterListComponent } from '../../organisms/filter-list/filter-list.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';
import { TreeNode } from '../../organisms/tree/tree.component';
import { GeneralOverviewType } from '../_models/generalOverviewType';

@Component({
  selector: 'app-general-overview',
  templateUrl: './general-overview.component.html',
  styleUrls: ['./general-overview.component.scss'],
  imports: [
    PageContainerComponent,
    NgTemplateOutlet,
    RouterLink,
    ButtonLinkComponent,
    ImageCardComponent,
    FilterListComponent,
    TitleCasePipe,
    HotkeyDirective,
    ArticleFooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralOverviewComponent {
  OVERVIEW_IMAGE_MAP: {
    [key in Exclude<GeneralOverviewType, 'CHARACTER'>]: {
      url: string;
      alt: string;
    };
  } = {
    CREATURE: {
      url: '/assets/overview_images/creatures.webp',
      alt: 'A fox and squirrels in an idyllic forest clearing',
    },
    DIARYENTRY: {
      url: '/assets/overview_images/diaryentries.webp',
      alt: 'An open old tome in a dusty room',
    },
    ITEM: {
      url: '/assets/overview_images/items.webp',
      alt: 'Piles of gold and magic items in a cave',
    },
    LOCATION: {
      url: '/assets/overview_images/locations.webp',
      alt: 'Snowy, mountainous landscape with a towering, ancient stone ruin and a distant, shadowy castle.',
    },
    ORGANIZATION: {
      url: '/assets/overview_images/organizations.webp',
      alt: 'A group gathering around a glowing, magical table, inside a grand, cathedral-like chamber.',
    },
  };

  serverUrl = input.required<string>();
  overviewType = input.required<GeneralOverviewType>();
  entries = input.required<OverviewItem[]>();
  campaignName = input.required<string>();
  canCreate = input.required<boolean>();

  defaultPlayerCharacterImage = 'assets/default_images/icon_default.webp';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  displayEntries = computed<FilterListEntry<any>[]>(() => {
    switch (this.overviewType()) {
      case 'CHARACTER':
        return this.getCharacterEntries(this.entries());
      case 'DIARYENTRY':
        return this.getDiaryEntryEntries(this.entries());
      case 'LOCATION':
        return this.getLocationEntries(this.entries());
      default:
        return this.entries().map((entry) => ({
          ...entry,
          link: entry['getAbsoluteRouterUrl'](),
        }));
    }
  });

  playerCharacters = computed<OverviewItem[] | undefined>(() => {
    if (this.overviewType() !== 'CHARACTER') return undefined;
    return this.entries().filter((entry) => entry.player_character);
  });

  homeUrl = computed(() =>
    this.routingService.getRoutePath('home', {
      campaign: this.campaignName,
    }),
  );
  overviewTypeName = computed(() => this.overviewType().toLocaleLowerCase());

  id = componentId();

  filterId = `${this.id}-filter`;
  headingSectionId = `${this.id}-heading-section`;
  bodySectionId = `${this.id}-body-section`;

  toLocationTrees = (entries: OverviewItem[]): DataSource<TreeNode>[] => {
    const rootNodes = entries
      .filter((entry) => !!(entry.parent_location_details?.pk == null))
      .map((rootItem) => recursivelyBuildLocationTree(rootItem, entries, 0));
    return rootNodes.map((node) => new ArrayDataSource([node]));
  };

  constructor(private routingService: RoutingService) {}

  private getCharacterEntries(
    entries: OverviewItem[],
  ): FilterListEntry<OverviewItem>[] {
    return entries
      .filter((entry) => !entry.player_character)
      .map((entry) => ({
        ...entry,
        link: entry['getAbsoluteRouterUrl'](),
      }));
  }

  private getDiaryEntryEntries(
    entries: OverviewItem[],
  ): FilterListEntry<OverviewItem>[] {
    return entries.map((diaryEntry) => ({
      ...diaryEntry,
      name_full: this.buildDiaryEntryNameForList(diaryEntry),
      link: diaryEntry['getAbsoluteRouterUrl'](),
    }));
  }

  private buildDiaryEntryNameForList(diaryEntry: OverviewItem): string {
    const startWithSessionNumber = `#${diaryEntry.session_details?.session_number}`;
    const title = diaryEntry.name != null ? `- ${diaryEntry.name}` : '';

    const isSmallScreen = false; // Constants.isSmallScreen
    if (isSmallScreen) return `${startWithSessionNumber} ${title}`;

    let daysCoveredByEntry = '';
    if (
      diaryEntry.session_details?.start_day != null &&
      diaryEntry.session_details.end_day != null
    ) {
      const padLength = 3;
      const startDay: string = this.padNumber(
        diaryEntry.session_details.start_day,
        padLength,
        '',
      );
      const endDay: string = this.padNumber(
        diaryEntry.session_details.end_day,
        padLength,
        '',
      );
      daysCoveredByEntry = `- Days ${startDay}-${endDay}`;
    }

    return `${startWithSessionNumber} ${daysCoveredByEntry} ${title}`;
  }

  /**
   * @description Generates the full name of a location based on its path in the location tree, concatenating
   * any parent name at the start.
   * @param {this} context - This component, needed to grant access despite the function being assigned to an object.
   */
  private getLocationEntries(
    entries: OverviewItem[],
  ): FilterListEntry<OverviewItem>[] {
    return entries
      .map((locationEntry: OverviewItem) => {
        const parents: OverviewItem[] = this.getParentLocations(
          locationEntry,
          entries,
        );
        const parentNames: string[] = parents
          .map((location: OverviewItem) => location.name)
          .reverse();
        const locationPath: string = parentNames.join(' - ');

        return {
          ...locationEntry,
          name_full: locationPath,
          link: locationEntry.getAbsoluteRouterUrl(),
        };
      })
      .sort((location1: OverviewItem, location2: OverviewItem) =>
        location1.name_full > location2.name_full ? 1 : -1,
      );
  }

  private getParentLocations(
    location: OverviewItem,
    listItems: OverviewItem[],
  ): OverviewItem[] {
    const parents: OverviewItem[] = [location];

    let currentLocation: OverviewItem = location;
    let hasParentLocation = currentLocation.parent_location_details?.pk != null;
    while (hasParentLocation) {
      // aka hasParentLocation
      const parentLocationPk: number = currentLocation.parent_location_details
        ?.pk as number;
      const parentLocation: OverviewItem | undefined = listItems.find(
        (entry) => entry.pk === parentLocationPk,
      );

      if (parentLocation == null) {
        break;
      }

      parents.push(parentLocation);
      currentLocation = parentLocation;
      hasParentLocation = currentLocation.parent_location_details?.pk != null;
    }

    return parents;
  }

  private padNumber(
    num: number,
    padCount: number,
    paddingCharacter = '0',
  ): string {
    const overlengthString: string = paddingCharacter.repeat(padCount) + num;
    return overlengthString.slice(padCount * -1);
  }
}

function recursivelyBuildLocationTree(
  root: OverviewItem,
  entries: OverviewItem[],
  currentLevel: number,
): TreeNode {
  const nextLevel = currentLevel + 1;
  const childNodes = entries
    .filter((entry) => entry.parent_location_details?.pk === root.pk)
    .map((entry) => recursivelyBuildLocationTree(entry, entries, nextLevel));

  return {
    id: root.pk as number,
    label: root.name,
    children: childNodes,
    link: root['getAbsoluteRouterUrl'](),
    isRootNode: root.parent_location_details?.pk == null,
    level: currentLevel,
  };
}
