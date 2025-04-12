import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-separator',
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  host: {
    'aria-hidden': 'true',
  },
})
export class SeparatorComponent {}
