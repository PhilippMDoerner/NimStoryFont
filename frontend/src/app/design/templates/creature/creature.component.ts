import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { Creature } from 'src/app/_models/creature';
import { Image } from 'src/app/_models/image';
import { RoutingService } from 'src/app/_services/routing.service';
import { ArticleFooterComponent } from 'src/app/design/molecules';
import { EditableTextComponent } from 'src/app/design/organisms/editable-text/editable-text.component';
import { ImageCarouselCardComponent } from 'src/app/design/organisms/image-carousel-card/image-carousel-card.component';
import { PageContainerComponent } from 'src/app/design/organisms/page-container/page-container.component';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';

@Component({
  selector: 'app-creature',
  templateUrl: './creature.component.html',
  styleUrls: ['./creature.component.scss'],
  imports: [
    EditableTextComponent,
    PageContainerComponent,
    ButtonLinkComponent,
    RouterLink,
    ImageCarouselCardComponent,
    ArticleFooterComponent,
    HotkeyDirective,
    NgbTooltip,
  ],
})
export class CreatureComponent {
  creature = input.required<Creature>();
  creatureServerModel = input.required<Creature | undefined>();
  serverUrl = input.required<string>();
  canUpdate = input(false);
  canCreate = input(false);
  canDelete = input(false);
  imageServerModel = input<Image>();

  creatureUpdate = output<Creature>();
  readonly creatureDelete = output<Creature>();
  readonly createImage = output<Image>();
  readonly deleteImage = output<Image>();
  readonly updateImage = output<Image>();

  campaignName = computed(() => this.creature().campaign_details?.name);
  overviewUrl = computed(() =>
    this.routingService.getRoutePath('creature-overview', {
      campaign: this.campaignName(),
    }),
  );

  updateUrl = computed(() =>
    this.routingService.getRoutePath('creature-update', {
      campaign: this.campaignName(),
      name: this.creature().name,
    }),
  );

  onDescriptionUpdate(description: string): void {
    const isUpdatedAfterBeingOutdated =
      this.creatureServerModel() !== undefined;
    const creatureToUpdate = isUpdatedAfterBeingOutdated
      ? this.creatureServerModel()
      : this.creature();

    if (creatureToUpdate) {
      this.creatureUpdate.emit({ ...creatureToUpdate, description });
    }
  }

  constructor(private routingService: RoutingService) {}
}
