import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location, LocationCharacter } from '../../../_models/location';
import { OverviewItem } from '../../../_models/overview';
import { RoutingService } from '../../../_services/routing.service';
import { HtmlTextComponent } from '../../atoms/html-text/html-text.component';
import { SeparatorComponent } from '../../atoms/separator/separator.component';
import { BadgeListComponent, BadgeListEntry } from '../../molecules';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SeparatorComponent,
    HtmlTextComponent,
    BadgeListComponent,
    RouterLink,
  ],
})
export class LocationComponent {
  readonly routingService = inject(RoutingService);

  readonly location = input.required<Location>();
  readonly campaignCharacters = input.required<OverviewItem[]>();

  readonly link = computed(() => {
    const loc = this.location();
    const parentLocationName = loc.parent_location_details?.name;
    const campaignName = loc.campaign_details?.name;
    const link = this.routingService.getRoutePath('location', {
      parent_name: parentLocationName,
      name: loc.name,
      campaign: campaignName,
    });

    return link;
  });

  readonly localCharacters = computed<BadgeListEntry<LocationCharacter>[]>(
    () => {
      const characters: LocationCharacter[] = this.location().characters ?? [];
      const campaignName: string = this.location().campaign_details
        ?.name as string;
      return characters.map((character) => {
        const link = this.routingService.getRoutePath('character', {
          campaign: campaignName,
          name: character.name,
        });

        return {
          badgeValue: character,
          text: character.name,
          link,
        };
      });
    },
  );
}
