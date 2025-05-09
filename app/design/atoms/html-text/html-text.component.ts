import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-html-text',
  templateUrl: './html-text.component.html',
  styleUrls: ['./html-text.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HtmlTextComponent {
  text = input.required<string>();
}
