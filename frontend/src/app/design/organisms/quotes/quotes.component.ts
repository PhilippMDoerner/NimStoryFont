import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { CharacterDetails } from 'src/app/_models/character';
import { OverviewItem } from 'src/app/_models/overview';
import { Quote, QuoteConnection, QuoteRaw } from 'src/app/_models/quote';
import { GroupByPipe } from 'src/app/design/atoms/_pipes/groupObjects.pipe';
import { SpinnerComponent } from 'src/app/design/atoms/spinner/spinner.component';
import { QuoteFieldComponent } from '../quote-field/quote-field.component';
import { QuoteControlKind } from '../quote/quote.component';

@Component({
  selector: 'app-quotes',
  imports: [SpinnerComponent, GroupByPipe, QuoteFieldComponent],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotesComponent {
  readonly campaignId = input.required<number>();
  readonly character = input.required<CharacterDetails>();
  readonly quoteServerModel = input.required<Quote | undefined>();
  readonly campaignCharacters = input.required<OverviewItem[]>();
  readonly campaignSessions = input.required<OverviewItem[]>();
  readonly campaignEncounters = input.required<OverviewItem[]>();
  readonly quotes = input.required<Quote[]>();
  readonly serverModel = input.required<Quote | undefined>();
  readonly quoteControlsBlacklist = input<QuoteControlKind[]>([]);
  readonly canUpdate = input<boolean>(false);
  readonly canDelete = input<boolean>(false);
  readonly canCreate = input<boolean>(false);

  readonly quoteCreate = output<QuoteRaw>();
  readonly quoteDelete = output<Quote>();
  readonly quoteUpdate = output<Quote>();
  readonly connectionCreate = output<QuoteConnection>();
  readonly connectionDelete = output<QuoteConnection>();

  readonly isCreatingQuote = signal(false);
  readonly createQuoteData = computed(() => ({}) as Quote);
}
