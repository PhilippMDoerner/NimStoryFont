import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { Image } from 'src/app/_models/image';
import { Item } from 'src/app/_models/item';
import { RoutingService } from 'src/app/_services/routing.service';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { ArticleFooterComponent } from '../../molecules/article-footer/article-footer.component';
import { EditableTextComponent } from '../../organisms/editable-text/editable-text.component';
import { ImageCarouselCardComponent } from '../../organisms/image-carousel-card/image-carousel-card.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  imports: [
    PageContainerComponent,
    RouterLink,
    ButtonLinkComponent,
    ImageCarouselCardComponent,
    EditableTextComponent,
    ArticleFooterComponent,
    HotkeyDirective,
    NgbTooltip,
  ],
})
export class ItemComponent {
  item = input.required<Item>();
  itemServerModel = input.required<Item | undefined>();
  serverUrl = input.required<string>();
  canUpdate = input(false);
  canCreate = input(false);
  canDelete = input(false);
  imageServerModel = input.required<Image | undefined>();

  readonly itemDelete = output<Item>();
  readonly createImage = output<Image>();
  readonly deleteImage = output<Image>();
  readonly updateImage = output<Image>();
  itemUpdate = output<Item>();

  campaignName = computed(() => this.item().campaign_details?.name);
  hasOwner = computed(() => this.item().owner_details != null);
  overviewUrl = computed(() =>
    this.routingService.getRoutePath('item-overview', {
      campaign: this.campaignName(),
    }),
  );
  updateUrl = computed(() =>
    this.routingService.getRoutePath('item-update', {
      campaign: this.campaignName(),
      name: this.item().name,
    }),
  );
  ownerUrl = computed(() => {
    if (!this.hasOwner()) return undefined;

    return this.routingService.getRoutePath('character', {
      campaign: this.campaignName(),
      name: this.item().owner_details?.name,
    });
  });

  constructor(private routingService: RoutingService) {}

  onDescriptionUpdate(description: string): void {
    const isUpdatedAfterBeingOutdated = this.itemServerModel() !== undefined;
    const itemToUpdate = isUpdatedAfterBeingOutdated
      ? this.itemServerModel()
      : this.item();

    if (itemToUpdate) {
      this.itemUpdate.emit({ ...itemToUpdate, description });
    }
  }
}
