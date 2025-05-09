import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import {
  CharacterDetails,
  CharacterEncounter,
  CharacterEncounterConnections,
  CharacterItem,
  CharacterOrganizationMembership,
} from 'src/app/_models/character';
import { Encounter } from 'src/app/_models/encounter';
import { Image } from 'src/app/_models/image';
import { OverviewItem } from 'src/app/_models/overview';
import {
  CharacterPlayerClassConnectionDetail,
  PlayerClass,
} from 'src/app/_models/playerclass';
import { Quote, QuoteConnection, QuoteRaw } from 'src/app/_models/quote';
import { RoutingService } from 'src/app/_services/routing.service';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { InfoCircleTooltipComponent } from '../../atoms/info-circle-tooltip/info-circle-tooltip.component';
import { BadgeListEntry, ListEntry } from '../../molecules';
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
    ButtonLinkComponent,
    ImageCarouselCardComponent,
    QuoteFieldComponent,
    BadgeListComponent,
    EditableTextComponent,
    LinkListComponent,
    InfoCircleTooltipComponent,
    EncounterAccordionComponent,
    ArticleFooterComponent,
    HotkeyDirective,
    NgbTooltip,
  ],
})
export class CharacterComponent {
  character = input.required<CharacterDetails>();
  characterServerModel = input<CharacterDetails>();
  characterQuote = input<Quote>();
  campaignNPCCharacters = input.required<OverviewItem[]>();
  campaignCharacters = input.required<OverviewItem[]>();
  campaignOrganizations = input.required<OverviewItem[]>();
  campaignLocations = input.required<OverviewItem[]>();
  campaignClasses = input.required<PlayerClass[]>();
  serverUrl = input.required<string>();
  quoteServerModel = input<Quote>();
  imageServerModel = input<Image>();
  sessions = input.required<OverviewItem[]>();
  encounters = input.required<OverviewItem[]>();
  encounterServerModel = input<Encounter>();
  canUpdate = input(false);
  canCreate = input(false);
  canDelete = input(false);

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
  characterUpdate = output<CharacterDetails>();
  readonly encounterDelete = output<CharacterEncounter>();
  readonly encounterUpdate = output<CharacterEncounter>();
  readonly organizationMembershipCreate =
    output<CharacterOrganizationMembership>();
  readonly organizationMembershipDelete =
    output<CharacterOrganizationMembership>();
  addClass = output<PlayerClass>();
  removeClass = output<PlayerClass>();

  campaignName = computed(() => this.character().campaign_details?.name);
  createUrl = computed(() => {
    return this.routingService.getRoutePath('character-update', {
      campaign: this.campaignName(),
      name: this.character().name,
    });
  });
  updateUrl = computed(() => {
    return this.routingService.getRoutePath('character-update', {
      campaign: this.campaignName(),
      name: this.character().name,
    });
  });
  overviewUrl = computed(() =>
    this.routingService.getRoutePath('character-overview', {
      campaign: this.campaignName(),
    }),
  );
  locationUrl = computed(() => {
    const locationName = this.character().current_location_details?.name;
    const parentLocationName =
      this.character().current_location_details?.parent_location;
    return this.routingService.getRoutePath('location', {
      name: locationName,
      parent_name: parentLocationName,
      campaign: this.campaignName(),
    });
  });
  itemCreateUrl = computed(() =>
    this.routingService.getRoutePath('item-create', {
      campaign: this.campaignName(),
    }),
  );
  organizationMemberships = computed<
    BadgeListEntry<CharacterOrganizationMembership>[]
  >(
    () =>
      this.character().organizations?.map((org) =>
        this.toBadgeListEntry(org),
      ) ?? [],
  );
  joinableOrganizations = computed(() => {
    const joinedOrgIds = this.organizationMemberships().map(
      (membership) => membership.badgeValue.organization_id,
    );
    return this.campaignOrganizations().filter(
      (org) => org.pk && !joinedOrgIds.includes(org.pk),
    );
  });
  characterItems = computed<ListEntry[]>(
    () => this.character().items?.map((item) => this.toListEntry(item)) ?? [],
  );
  characterClasses = computed<BadgeListEntry<PlayerClass>[]>(() => {
    return (
      this.character().player_class_connections?.map(
        this.connectionToBadgeListEntry,
      ) ?? []
    );
  });

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
