import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  OnChanges,
  output,
  signal,
} from '@angular/core';
import { OverviewItem } from 'src/app/_models/overview';
import { RoutingService } from 'src/app/_services/routing.service';

import { CharacterDetails } from 'src/app/_models/character';
import { Quote, QuoteConnection } from 'src/app/_models/quote';
import { SeparatorComponent } from 'src/app/design/atoms/separator/separator.component';
import { SpinnerComponent } from 'src/app/design/atoms/spinner/spinner.component';
import { BadgeListComponent, BadgeListEntry } from 'src/app/design/molecules';
import { copyToClipboard } from 'src/utils/clipboard';
import { componentId } from 'src/utils/DOM';
import { ButtonComponent } from '../../atoms/button/button.component';
import { MenuItem } from '../../molecules/_models/menu';
import { ContextMenuComponent } from '../../molecules/context-menu/context-menu.component';
import { ToastService } from '../toast-overlay/toast.service';

type QuoteState =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'DISPLAY'
  | 'UPDATE_OUTDATED';

export type QuoteControlKind =
  | 'REFRESH'
  | 'DELETE'
  | 'CREATE'
  | 'UPDATE'
  | 'LIST'
  | 'COPY';

type QuoteControl = MenuItem & {
  isVisible: boolean;
  controlKind: QuoteControlKind;
};

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
  imports: [
    BadgeListComponent,
    SeparatorComponent,
    SpinnerComponent,
    ContextMenuComponent,
    ButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteComponent implements OnChanges {
  readonly quote = input<Quote>();
  readonly quoteControlsBlacklist = input<QuoteControlKind[]>([]);
  readonly character = input.required<CharacterDetails>();
  readonly campaignCharacters = input.required<OverviewItem[]>();
  readonly canCreate = input(false);
  readonly canUpdate = input(false);
  readonly canDelete = input(false);

  readonly quoteDelete = output<Quote>();
  readonly quoteCreate = output<void>();
  readonly quoteUpdate = output<Quote>();
  readonly connectionDelete = output<QuoteConnection>();
  readonly connectionCreate = output<QuoteConnection>();
  readonly refreshQuote = output<void>();

  readonly _quoteControlsBlacklist = computed(
    () => new Set(this.quoteControlsBlacklist()),
  );
  readonly state: QuoteState = 'DISPLAY';
  readonly quoteId = componentId();

  readonly badgeEntries = computed<BadgeListEntry<QuoteConnection>[]>(() =>
    this.parseConnection(this.quote()?.connections ?? []),
  );
  readonly campaignName = computed(
    () => this.character().campaign_details?.name,
  );
  readonly isLoadingQuote = signal(false);
  readonly quoteOverviewUrl = computed(() =>
    this.routingService.getRoutePath('quote-overview', {
      name: this.character.name,
      campaign: this.campaignName,
    }),
  );
  readonly hasQuote = computed(() => !!this.quote());
  readonly quoteLabel = computed(() => `Quotes of ${this.character()?.name}`);

  private readonly allQuoteControlls = computed<QuoteControl[]>(() => [
    {
      controlKind: 'REFRESH',
      isVisible: this.hasQuote(),
      kind: 'BUTTON',
      label: 'Load new quote',
      icon: 'refresh',
      actionName: 'refresh',
    },
    {
      controlKind: 'UPDATE',
      isVisible: this.hasQuote() && this.canUpdate(),
      kind: 'BUTTON',
      label: 'Edit Quote',
      icon: 'pencil',
      actionName: 'update',
    },
    {
      controlKind: 'CREATE',
      isVisible: this.hasQuote() && this.canCreate(),
      kind: 'BUTTON',
      label: 'Create Quote',
      icon: 'plus',
      actionName: 'create',
    },
    {
      controlKind: 'DELETE',
      isVisible: !!this.quote() && this.canDelete(),
      kind: 'BUTTON',
      label: 'Delete Quote',
      icon: 'trash',
      actionName: 'delete',
    },
    {
      controlKind: 'COPY',
      isVisible: !!this.quote(),
      kind: 'BUTTON',
      label: 'Copy Quote to Clipboard',
      icon: 'copy',
      actionName: 'copy',
    },
    {
      controlKind: 'LIST',
      isVisible: !!this.quote(),
      kind: 'LINK',
      label: 'See all quotes',
      icon: 'th-list',
      url: this.routingService.getRoutePath('quote-overview', {
        name: this.character().name,
        campaign: this.campaignName(),
      }),
    },
  ]);
  protected readonly shownQuoteControlls = computed(() =>
    this.allQuoteControlls()
      .filter((ctrl) => ctrl.isVisible)
      .filter((ctrl) => !this._quoteControlsBlacklist().has(ctrl.controlKind)),
  );
  protected readonly showQuoteControls = computed(
    () => this.shownQuoteControlls()?.length > 0,
  );

  constructor(
    private readonly routingService: RoutingService,
    private readonly toastService: ToastService,
  ) {}

  ngOnChanges(): void {
    this.isLoadingQuote.set(false);
  }

  onContextMenuAction(actionName: string) {
    switch (actionName) {
      case 'copy':
        return this.copyQuoteToClipboard();
      case 'refresh':
        return this.getNextRandomQuote();
      case 'create':
        return this.quoteCreate.emit();
      case 'delete':
        return this.quoteDelete.emit(this.quote() as Quote);
      case 'update':
        return this.quoteUpdate.emit(this.quote() as Quote);
    }
  }

  onConnectionDelete(connection: QuoteConnection) {
    if (!this.canDelete()) {
      return;
    }

    this.connectionDelete.emit(connection);
  }

  onConnectionCreate(character: OverviewItem) {
    if (!this.canCreate() || !this.quote()) {
      return;
    }

    const newConnection: QuoteConnection = {
      quote: this.quote()?.pk as number,
      character: character.pk as number,
    };
    this.connectionCreate.emit(newConnection);
  }

  getNextRandomQuote() {
    this.isLoadingQuote.set(true);
    this.refreshQuote.emit();
  }

  private parseConnection(
    connections: QuoteConnection[],
  ): BadgeListEntry<QuoteConnection>[] {
    return connections.map((con) => {
      const characterName = con.character_details?.name as string;
      const link = this.routingService.getRoutePath('character', {
        name: characterName,
        campaign: this.campaignName(),
      });

      return {
        text: characterName,
        badgeValue: con,
        link,
      };
    });
  }

  copyQuoteToClipboard() {
    const quote = this.quote();
    if (!quote) {
      return;
    }
    const quoteLines = quote.quote.split('<br />');
    const modifiedQuoteLines = quoteLines.map(
      (line: string) => `>${line.trim().trimStart()}`,
    );
    const modifiedQuote = modifiedQuoteLines.join('<br />');

    const descriptionSuffix = `- ${quote.description} `;
    const text = `${modifiedQuote}\n>${descriptionSuffix}`;
    copyToClipboard(text);

    this.toastService.addToast({
      dismissMs: 1500,
      type: 'SUCCESS',
      onToastClick: (dismiss) => dismiss(),
      body: {
        text: 'Copied quote to clipboard',
        icon: 'check',
      },
    });
  }
}
