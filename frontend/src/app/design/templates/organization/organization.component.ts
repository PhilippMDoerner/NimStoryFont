import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { Image } from 'src/app/_models/image';
import { Organization, OrganizationMember } from 'src/app/_models/organization';
import { OverviewItem } from 'src/app/_models/overview';
import { RoutingService } from 'src/app/_services/routing.service';
import { sortByProp } from 'src/utils/array';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { BadgeListEntry } from '../../molecules';
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
    ButtonLinkComponent,
    NgTemplateOutlet,
    ImageCarouselCardComponent,
    EditableTextComponent,
    ArticleFooterComponent,
    HotkeyDirective,
    BadgeListComponent,
    NgbTooltip,
  ],
})
export class OrganizationComponent {
  organization = input.required<Organization>();
  organizationServerModel = input.required<Organization | undefined>();
  serverUrl = input.required<string>();
  imageServerModel = input.required<Image | undefined>();
  campaignCharacters = input.required<OverviewItem[] | undefined>();
  canUpdate = input.required<boolean>();
  canCreate = input.required<boolean>();
  canDelete = input.required<boolean>();

  readonly createImage = output<Image>();
  readonly deleteImage = output<Image>();
  readonly updateImage = output<Image>();
  readonly organizationDelete = output<Organization>();
  readonly organizationUpdate = output<Organization>();
  readonly organizationMembershipCreate = output<OverviewItem>();
  readonly organizationMembershipDelete = output<OrganizationMember>();

  overviewUrl = computed(() => {
    const campaignName = this.organization().campaign_details?.name;
    return this.routingService.getRoutePath('organization-overview', {
      campaign: campaignName,
    });
  });
  updateUrl = computed(() => {
    const campaignName = this.organization().campaign_details?.name;
    return this.routingService.getRoutePath('organization-update', {
      campaign: campaignName,
      name: this.organization().name,
    });
  });

  organizationMembers = computed<BadgeListEntry<OrganizationMember>[]>(() => {
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
  headquarterUrl = computed(() => {
    const campaignName = this.organization().campaign_details?.name;
    return this.routingService.getRoutePath('location', {
      campaign: campaignName,
      name: this.organization().headquarter_details?.name,
      parent_name: this.organization().headquarter_details?.parent_name,
    });
  });
  leaderUrl = computed(() => {
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
