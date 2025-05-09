import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OverviewItem } from 'src/app/_models/overview';

@Component({
    selector: 'app-search-hit',
    templateUrl: './search-hit.component.html',
    styleUrls: ['./search-hit.component.scss'],
    imports: [RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchHitComponent {
  article = input.required<OverviewItem>();
}
