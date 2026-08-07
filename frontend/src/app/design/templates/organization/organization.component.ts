import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Image } from 'src/app/_models/image';
import { Organization, OrganizationMember } from 'src/app/_models/organization';
import { OverviewItem } from 'src/app/_models/overview';
import { RoutingService } from 'src/app/_services/routing.service';
import { sortByProp } from 'src/utils/array';
import { BadgeListEntry } from '../../molecules';
import { ArticleContextMenuComponent } from '../../molecules/article-context-menu/article-context-menu.component';
import { ArticleFooterComponent } from '../../molecules/article-footer/article-footer.component';
import { BadgeListComponent } from '../../molecules/badge-list/badge-list.component';
import { EditableTextComponent } from '../../organisms/editable-text/editable-text.component';
import { ImageCarouselCardComponent } from '../../organisms/image-carousel-card/image-carousel-card.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
  imports: [
    PageContainerComponent,
    RouterLink,
    NgTemplateOutlet,
    ImageCarouselCardComponent,
    EditableTextComponent,
    ArticleFooterComponent,
    BadgeListComponent,
    ArticleContextMenuComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationComponent {
  readonly organization = input.required<Organization>();
  readonly organizationServerModel = input.required<Organization | undefined>();
  readonly serverUrl = input.required<string>();
  readonly imageServerModel = input.required<Image | undefined>();
  readonly campaignCharacters = input.required<OverviewItem[] | undefined>();
  readonly canUpdate = input.required<boolean>();
  readonly canCreate = input.required<boolean>();
  readonly canDelete = input.required<boolean>();

  readonly createImage = output<Image>();
  readonly deleteImage = output<Image>();
  readonly updateImage = output<Image>();
  readonly organizationDelete = output<Organization>();
  readonly organizationUpdate = output<Organization>();
  readonly organizationMembershipCreate = output<OverviewItem>();
  readonly organizationMembershipDelete = output<OrganizationMember>();

  readonly overviewUrl = computed(() => {
    const campaignName = this.organization().campaign_details?.name;
    return this.routingService.getRoutePath('organization-overview', {
      campaign: campaignName,
    });
  });
  readonly updateUrl = computed(() => {
    const campaignName = this.organization().campaign_details?.name;
    return this.routingService.getRoutePath('organization-update', {
      campaign: campaignName,
      name: this.organization().name,
    });
  });

  readonly organizationMembers = computed<BadgeListEntry<OrganizationMember>[]>(() => {
    const badgeEntries =
      this.organization().members?.map(
        (member) =>
          ({
            badgeValue: member,
            text: member.name,
            link: this.routingService.getRoutePath('character', {
              campaign: this.organization().campaign_details?.name,
              name: member.name,
            }),
          }) satisfies BadgeListEntry<OrganizationMember>,
      ) ?? [];

    return sortByProp(badgeEntries, 'text');
  });
  readonly headquarterUrl = computed(() => {
    const campaignName = this.organization().campaign_details?.name;
    return this.routingService.getRoutePath('location', {
      campaign: campaignName,
      name: this.organization().headquarter_details?.name,
      parent_name: this.organization().headquarter_details?.parent_name,
    });
  });
  readonly leaderUrl = computed(() => {
    const campaignName = this.organization().campaign_details?.name;
    return this.routingService.getRoutePath('character', {
      campaign: campaignName,
      name: this.organization().leader,
    });
  });

  constructor(private routingService: RoutingService) {}

  onDescriptionUpdate(description: string): void {
    const isUpdatedAfterBeingOutdated =
      this.organizationServerModel() !== undefined;
    const itemToUpdate = isUpdatedAfterBeingOutdated
      ? this.organizationServerModel()
      : this.organization();

    if (itemToUpdate) {
      this.organizationUpdate.emit({ ...itemToUpdate, description });
    }
  }

  deleteMembership(member: OrganizationMember): void {
    this.organizationMembershipDelete.emit(member);
  }
}
