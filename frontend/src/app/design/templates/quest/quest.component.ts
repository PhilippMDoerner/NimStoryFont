import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Quest } from 'src/app/_models/quest';
import { RoutingService } from 'src/app/_services/routing.service';
import { ArticleContextMenuComponent } from '../../molecules/article-context-menu/article-context-menu.component';
import { ArticleFooterComponent } from '../../molecules/article-footer/article-footer.component';
import { EditableTextComponent } from '../../organisms/editable-text/editable-text.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss'],
  imports: [
    PageContainerComponent,
    RouterLink,
    NgTemplateOutlet,
    EditableTextComponent,
    ArticleFooterComponent,
    ArticleContextMenuComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestComponent {
  quest = input.required<Quest>();
  questServerModel = input.required<Quest | undefined>();
  canUpdate = input.required<boolean>();
  canDelete = input.required<boolean>();

  readonly questDelete = output<Quest>();
  questUpdate = output<Quest>();

  campaignName = computed(() => this.quest().campaign_details?.name);
  questGiverUrl = computed(() =>
    this.routingService.getRoutePath('character', {
      campaign: this.campaignName(),
      name: this.quest().giver_details?.name,
    }),
  );
  overviewUrl = computed(() =>
    this.routingService.getRoutePath('quest-overview', {
      campaign: this.campaignName(),
    }),
  );
  updateUrl = computed(() =>
    this.routingService.getRoutePath('quest-update', {
      campaign: this.campaignName(),
      name: this.quest().name,
    }),
  );

  constructor(private routingService: RoutingService) {}

  onDescriptionUpdate(description: string): void {
    const isUpdatedAfterBeingOutdated = this.questServerModel() !== undefined;
    const itemToUpdate = isUpdatedAfterBeingOutdated
      ? this.questServerModel()
      : this.quest();

    if (itemToUpdate) {
      this.questUpdate.emit({ ...itemToUpdate, description });
    }
  }
}
