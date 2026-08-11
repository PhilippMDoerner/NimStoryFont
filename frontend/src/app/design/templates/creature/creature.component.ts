import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { Creature } from '../../../_models/creature';
import { Image } from '../../../_models/image';
import { RoutingService } from '../../../_services/routing.service';
import { ArticleFooterComponent } from '../../../design/molecules';
import { EditableTextComponent } from '../../../design/organisms/editable-text/editable-text.component';
import { ImageCarouselCardComponent } from '../../../design/organisms/image-carousel-card/image-carousel-card.component';
import { PageContainerComponent } from '../../../design/organisms/page-container/page-container.component';
import { ArticleContextMenuComponent } from '../../molecules/article-context-menu/article-context-menu.component';

@Component({
  selector: 'app-creature',
  templateUrl: './creature.component.html',
  styleUrls: ['./creature.component.scss'],
  imports: [
    EditableTextComponent,
    PageContainerComponent,
    ImageCarouselCardComponent,
    ArticleFooterComponent,
    ArticleContextMenuComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatureComponent {
  readonly creature = input.required<Creature>();
  readonly creatureServerModel = input.required<Creature | undefined>();
  readonly serverUrl = input.required<string>();
  readonly canUpdate = input(false);
  readonly canCreate = input(false);
  readonly canDelete = input(false);
  readonly imageServerModel = input<Image>();

  readonly creatureUpdate = output<Creature>();
  readonly creatureDelete = output<Creature>();
  readonly createImage = output<Image>();
  readonly deleteImage = output<Image>();
  readonly updateImage = output<Image>();

  readonly campaignName = computed(
    () => this.creature().campaign_details?.name,
  );
  readonly overviewUrl = computed(() =>
    this.routingService.getRoutePath('creature-overview', {
      campaign: this.campaignName(),
    }),
  );

  readonly updateUrl = computed(() =>
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
