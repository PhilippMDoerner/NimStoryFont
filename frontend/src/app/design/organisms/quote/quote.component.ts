import {
  Component,
  computed,
  input,
  OnChanges,
  output,
  signal,
} from '@angular/core';
import { OverviewItem } from 'src/app/_models/overview';
import { RoutingService } from 'src/app/_services/routing.service';

import { RouterLink } from '@angular/router';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { CharacterDetails } from 'src/app/_models/character';
import { Quote, QuoteConnection } from 'src/app/_models/quote';
import { ElementKind } from 'src/app/design/atoms/_models/button';
import { Icon } from 'src/app/design/atoms/_models/icon';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { SeparatorComponent } from 'src/app/design/atoms/separator/separator.component';
import { SpinnerComponent } from 'src/app/design/atoms/spinner/spinner.component';
import { BadgeListComponent, BadgeListEntry } from 'src/app/design/molecules';
import { copyToClipboard } from 'src/utils/clipboard';
import { componentId } from 'src/utils/DOM';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { ToastService } from '../toast-overlay/toast-overlay.component';

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
interface QuoteControl {
  controlKind: QuoteControlKind;
  isVisible: boolean;
  title?: string;
  type: ElementKind;
  label?: string;
  icon: Icon;
  config:
    | {
        kind: 'LINK';
        link: string;
      }
    | {
        kind: 'CLICK';
        onClick: () => void;
      };
}

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
  imports: [
    BadgeListComponent,
    SeparatorComponent,
    ButtonComponent,
    ButtonLinkComponent,
    RouterLink,
    SpinnerComponent,
    NgbTooltip,
  ],
})
export class QuoteComponent implements OnChanges {
  quote = input<Quote>();
  quoteControlsBlacklist = input<QuoteControlKind[]>([]);
  _quoteControlsBlacklist = computed(
    () => new Set(this.quoteControlsBlacklist()),
  );
  character = input.required<CharacterDetails>();
  campaignCharacters = input.required<OverviewItem[]>();
  canCreate = input(false);
  canUpdate = input(false);
  canDelete = input(false);

  readonly quoteDelete = output<Quote>();
  readonly quoteCreate = output<void>();
  readonly quoteUpdate = output<Quote>();
  readonly connectionDelete = output<QuoteConnection>();
  readonly connectionCreate = output<QuoteConnection>();
  readonly refreshQuote = output<void>();

  state: QuoteState = 'DISPLAY';
  quoteId = componentId();

  badgeEntries = computed<BadgeListEntry<QuoteConnection>[]>(() =>
    this.parseConnection(this.quote()?.connections ?? []),
  );
  campaignName = computed(() => this.character().campaign_details?.name);
  isLoadingQuote = signal(false);
  quoteOverviewUrl = computed(() =>
    this.routingService.getRoutePath('quote-overview', {
      name: this.character.name,
      campaign: this.campaignName,
    }),
  );
  hasQuote = computed(() => !!this.quote());
  quoteLabel = computed(() => `Quotes of ${this.character()?.name}`);

  private _quoteControlls = computed<QuoteControl[]>(() => [
    {
      controlKind: 'REFRESH',
      isVisible: this.hasQuote(),
      title: 'Load new quote',
      type: 'INFO',
      icon: 'refresh',
      config: {
        kind: 'CLICK',
        onClick: () => this.getNextRandomQuote(),
      },
    },
    {
      controlKind: 'UPDATE',
      isVisible: this.hasQuote() && this.canUpdate(),
      title: 'Edit Quote',
      type: 'SECONDARY',
      icon: 'pencil',
      config: {
        kind: 'CLICK',
        onClick: () => this.quoteUpdate.emit(this.quote() as Quote),
      },
    },
    {
      controlKind: 'CREATE',
      isVisible: this.canCreate(),
      title: this.hasQuote() ? 'Create Quote' : undefined,
      label: this.hasQuote() ? undefined : 'Create Quote',
      type: 'PRIMARY',
      icon: 'plus',
      config: {
        kind: 'CLICK',
        onClick: () => this.quoteCreate.emit(),
      },
    },
    {
      controlKind: 'DELETE',
      isVisible: !!this.quote() && this.canDelete(),
      title: 'Delete Quote',
      type: 'DANGER',
      icon: 'trash',
      config: {
        kind: 'CLICK',
        onClick: () => this.quoteDelete.emit(this.quote() as Quote),
      },
    },
    {
      controlKind: 'COPY',
      isVisible: !!this.quote(),
      title: 'Copy Quote to Clipboard',
      type: 'DARK',
      icon: 'copy',
      config: {
        kind: 'CLICK',
        onClick: () => this.copyQuoteToClipboard(),
      },
    },
    {
      controlKind: 'LIST',
      isVisible: !!this.quote(),
      title: 'See all quotes',
      type: 'SECONDARY',
      icon: 'th-list',
      config: {
        kind: 'LINK',
        link: this.routingService.getRoutePath('quote-overview', {
          name: this.character().name,
          campaign: this.campaignName(),
        }),
      },
    },
  ]);
  quoteControlls = computed(() =>
    this._quoteControlls()
      .filter((ctrl) => ctrl.isVisible)
      .filter((ctrl) => !this._quoteControlsBlacklist().has(ctrl.controlKind)),
  );

  constructor(
    private routingService: RoutingService,
    private toastService: ToastService,
  ) {}

  ngOnChanges(): void {
    this.isLoadingQuote.set(false);
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
