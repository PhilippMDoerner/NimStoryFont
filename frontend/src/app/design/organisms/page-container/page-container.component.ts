import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fadeIn } from 'src/app/design/animations/fadeIn';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
  imports: [],
  animations: [fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageContainerComponent {}
