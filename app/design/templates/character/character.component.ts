import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CharacterDetails,
  CharacterEncounter,
  CharacterEncounterConnections,
  CharacterItem,
  CharacterOrganizationMembership,
} from '../../../_models/character';
import { Encounter } from '../../../_models/encounter';
import { Image } from '../../../_models/image';
import { OverviewItem } from '../../../_models/overview';
import {
  CharacterPlayerClassConnectionDetail,
  PlayerClass,
} from '../../../_models/playerclass';
import { Quote, QuoteConnection, QuoteRaw } from '../../../_models/quote';
import { RoutingService } from '../../../_services/routing.service';
import { InfoCircleTooltipComponent } from '../../atoms/info-circle-tooltip/info-circle-tooltip.component';
import { BadgeListEntry, ListEntry } from '../../molecules';
import { ArticleContextMenuComponent } from '../../molecules/article-context-menu/article-context-menu.component';
import { ArticleFooterComponent } from '../../molecules/article-footer/article-footer.component';
import { BadgeListComponent } from '../../molecules/badge-list/badge-list.component';
import { LinkListComponent } from '../../molecules/link-list/link-list.component';
import { EditableTextComponent } from '../../organisms/editable-text/editable-text.component';
import { EncounterAccordionComponent } from '../../organisms/encounter-accordion/encounter-accordion.component';
import { ImageCarouselCardComponent } from '../../organisms/image-carousel-card/image-carousel-card.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';
import { QuoteFieldComponent } from '../../organisms/quote-field/quote-field.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  imports: [
    PageContainerComponent,
    RouterLink,
    ImageCarouselCardComponent,
    QuoteFieldComponent,
    BadgeListComponent,
    EditableTextComponent,
    LinkListComponent,
    InfoCircleTooltipComponent,
    EncounterAccordionComponent,
    ArticleFooterComponent,
    ArticleContextMenuComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterComponent {
  readonly character = input.required<CharacterDetails>();
  readonly characterServerModel = input<CharacterDetails>();
  readonly characterQuote = input<Quote>();
  readonly campaignCharacters = input.required<OverviewItem[]>();
  readonly campaignOrganizations = input.required<OverviewItem[]>();
  readonly campaignLocations = input.required<OverviewItem[]>();
  readonly campaignClasses = input.required<PlayerClass[]>();
  readonly serverUrl = input.required<string>();
  readonly quoteServerModel = input<Quote>();
  readonly imageServerModel = input<Image>();
  readonly sessions = input.required<OverviewItem[]>();
  readonly encounters = input.required<OverviewItem[]>();
  readonly encounterServerModel = input<Encounter>();
  readonly canUpdate = input(false);
  readonly canCreate = input(false);
  readonly canDelete = input(false);

  readonly createImage = output<Image>();
  readonly deleteImage = output<Image>();
  readonly updateImage = output<Image>();
  readonly quoteDelete = output<Quote>();
  readonly quoteCreate = output<QuoteRaw>();
  readonly quoteUpdate = output<Quote>();
  readonly quoteConnectionDelete = output<QuoteConnection>();
  readonly quoteConnectionCreate = output<QuoteConnection>();
  readonly encounterConnectionDelete = output<CharacterEncounterConnections>();
  readonly encounterConnectionCreate = output<CharacterEncounterConnections>();
  readonly refreshQuote = output<void>();
  readonly characterDelete = output<CharacterDetails>();
  readonly characterUpdate = output<CharacterDetails>();
  readonly encounterDelete = output<CharacterEncounter>();
  readonly encounterUpdate = output<CharacterEncounter>();
  readonly organizationMembershipCreate =
    output<CharacterOrganizationMembership>();
  readonly organizationMembershipDelete =
    output<CharacterOrganizationMembership>();
  readonly addClass = output<PlayerClass>();
  readonly removeClass = output<PlayerClass>();

  readonly campaignName = computed(
    () => this.character().campaign_details?.name,
  );
  readonly createUrl = computed(() => {
    return this.routingService.getRoutePath('character-update', {
      campaign: this.campaignName(),
      name: this.character().name,
    });
  });
  readonly updateUrl = computed(() => {
    return this.routingService.getRoutePath('character-update', {
      campaign: this.campaignName(),
      name: this.character().name,
    });
  });
  readonly overviewUrl = computed(() =>
    this.routingService.getRoutePath('character-overview', {
      campaign: this.campaignName(),
    }),
  );
  readonly locationUrl = computed(() => {
    const locationName = this.character().current_location_details?.name;
    const parentLocationName =
      this.character().current_location_details?.parent_location;
    return this.routingService.getRoutePath('location', {
      name: locationName,
      parent_name: parentLocationName,
      campaign: this.campaignName(),
    });
  });
  readonly itemCreateUrl = computed(() =>
    this.routingService.getRoutePath('item-create', {
      campaign: this.campaignName(),
    }),
  );
  readonly organizationMemberships = computed<
    BadgeListEntry<CharacterOrganizationMembership>[]
  >(
    () =>
      this.character().organizations?.map((org) =>
        this.toBadgeListEntry(org),
      ) ?? [],
  );
  readonly joinableOrganizations = computed(() => {
    const joinedOrgIds = this.organizationMemberships().map(
      (membership) => membership.badgeValue.organization_id,
    );
    return this.campaignOrganizations().filter(
      (org) => org.pk && !joinedOrgIds.includes(org.pk),
    );
  });
  readonly characterItems = computed<ListEntry[]>(
    () => this.character().items?.map((item) => this.toListEntry(item)) ?? [],
  );
  readonly characterClasses = computed<BadgeListEntry<PlayerClass>[]>(() => {
    return (
      this.character().player_class_connections?.map(
        this.connectionToBadgeListEntry,
      ) ?? []
    );
  });
  readonly campaignNPCCharacters = computed(() =>
    this.campaignCharacters()?.filter(
      (character) => !character.player_character,
    ),
  );

  constructor(private routingService: RoutingService) {}

  onMembershipCreate(org: OverviewItem): void {
    const newMembership: Partial<CharacterOrganizationMembership> = {
      name: org.name,
      organization_id: org.pk,
      role: 'member',
    };
    this.organizationMembershipCreate.emit(
      newMembership as CharacterOrganizationMembership,
    );
  }

  onDescriptionUpdate(description: string): void {
    const isUpdatedAfterBeingOutdated =
      this.characterServerModel() !== undefined;
    const characterToUpate = isUpdatedAfterBeingOutdated
      ? this.characterServerModel()
      : this.character();

    if (characterToUpate) {
      this.characterUpdate.emit({ ...characterToUpate, description });
    }
  }

  private toBadgeListEntry(
    org: CharacterOrganizationMembership,
  ): BadgeListEntry<CharacterOrganizationMembership> {
    return {
      badgeValue: org,
      text: org.name,
      link: this.routingService.getRoutePath('organization', {
        name: org.name,
        campaign: this.campaignName(),
      }),
    };
  }

  private toListEntry(item: CharacterItem): ListEntry {
    return {
      label: item.name,
      link: this.routingService.getRoutePath('item', {
        campaign: this.campaignName(),
        name: item.name,
      }),
    };
  }

  private connectionToBadgeListEntry(
    connection: CharacterPlayerClassConnectionDetail,
  ): BadgeListEntry<PlayerClass> {
    return {
      text: connection.player_class_details?.name ?? '',
      badgeValue: connection.player_class_details as PlayerClass,
    };
  }
}
