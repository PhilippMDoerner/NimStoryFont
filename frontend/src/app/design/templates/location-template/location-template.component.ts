import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { Image } from 'src/app/_models/image';
import { Location } from 'src/app/_models/location';
import { OverviewItem } from 'src/app/_models/overview';
import { RoutingService } from 'src/app/_services/routing.service';
import { BadgeListEntry, ListEntry } from '../../molecules';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';

import { ArticleContextMenuComponent } from '../../molecules/article-context-menu/article-context-menu.component';
import { ArticleFooterComponent } from '../../molecules/article-footer/article-footer.component';
import { BadgeListComponent } from '../../molecules/badge-list/badge-list.component';
import { BreadcrumbListComponent } from '../../molecules/breadcrumb-list/breadcrumb-list.component';
import { LinkListComponent } from '../../molecules/link-list/link-list.component';
import { EditableTextComponent } from '../../organisms/editable-text/editable-text.component';
import { ImageCarouselCardComponent } from '../../organisms/image-carousel-card/image-carousel-card.component';
import { LocationAccordionComponent } from '../../organisms/location-accordion/location-accordion.component';
import { BreadcrumbEntry } from '../_models/breadcrumb-entry';

@Component({
  selector: 'app-location-template',
  templateUrl: './location-template.component.html',
  styleUrls: ['./location-template.component.scss'],
  imports: [
    PageContainerComponent,
    ImageCarouselCardComponent,
    BadgeListComponent,
    EditableTextComponent,
    LinkListComponent,
    LocationAccordionComponent,
    ArticleFooterComponent,
    BreadcrumbListComponent,
    ArticleContextMenuComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationTemplateComponent {
  location = input.required<Location>();
  campaignCharacters = input.required<OverviewItem[]>();
  locationServerModel = input.required<Location | undefined>();
  serverUrl = input.required<string>();
  imageServerModel = input.required<Image | undefined>();
  canUpdate = input.required<boolean>();
  canCreate = input.required<boolean>();
  canDelete = input.required<boolean>();

  readonly createImage = output<Image>();
  readonly deleteImage = output<Image>();
  readonly updateImage = output<Image>();
  readonly locationDelete = output<Location>();
  locationUpdate = output<Location>();

  campaignName = computed(() => this.location().campaign_details?.name);
  overviewUrl = computed(() =>
    this.routingService.getRoutePath('location-overview', {
      campaign: this.campaignName(),
    }),
  );
  updateUrl = computed<string>(() =>
    this.routingService.getRoutePath('location-update', {
      name: this.location().name,
      parent_name: this.location().parent_location_details?.name,
      campaign: this.campaignName(),
    }),
  );
  locationCharacters = computed<ListEntry[]>(() => {
    return (
      this.location().characters?.map((character) => ({
        label: character.name,
        link: this.routingService.getRoutePath('character', {
          campaign: this.campaignName(),
          name: character.name,
        }),
      })) ?? []
    );
  });
  parentLocations = computed<BreadcrumbEntry[]>(() => {
    const parentNames = this.location().parent_location_list;
    return (
      parentNames?.map((parent) => ({
        label: parent,
        url: this.buildLocationUrl(parent, parentNames),
      })) ?? []
    );
  });

  markerEntries = computed<BadgeListEntry<string>[]>(() => {
    return (
      this.location().marker_details?.map((marker) => ({
        text: marker.map,
        link: this.routingService.getRoutePath('marker', {
          parent_location_name:
            this.location().parent_location_details?.name ?? 'None',
          location_name: this.location().name,
          map_name: marker.map,
          campaign: this.campaignName(),
        }),
        badgeValue: marker.map,
      })) ?? []
    );
  });
  markerCreateUrl = computed(() =>
    this.routingService.getRoutePath('marker-create', {
      parent_location_name: this.location().parent_location_details?.name,
      location_name: this.location().name,
      campaign: this.location().campaign_details?.name,
    }),
  );

  constructor(private routingService: RoutingService) {}

  routeToCharacterCreation(): void {
    const campaignName = this.location().campaign_details?.name;
    this.routingService.routeToPath('character-create', {
      campaign: campaignName,
    });
  }

  onDescriptionUpdate(description: string): void {
    const isUpdatedAfterBeingOutdated =
      this.locationServerModel() !== undefined;
    const locationToUpdate = isUpdatedAfterBeingOutdated
      ? this.locationServerModel()
      : this.location();

    if (locationToUpdate) {
      this.locationUpdate.emit({ ...locationToUpdate, description });
    }
  }

  private buildLocationUrl(locationName: string, locationList: string[]) {
    if (!locationList)
      throw 'Tried building a route to a location in parent_location_list when there is no parent_location_list';

    const index: number = locationList.indexOf(locationName);
    const parentLocationName: string =
      index === 0 ? 'None' : locationList[index - 1];
    const campaignName = this.location().campaign_details?.name;
    const locationUrl: string = this.routingService.getRoutePath('location', {
      parent_name: parentLocationName,
      name: locationName,
      campaign: campaignName,
    });

    return locationUrl;
  }
}
