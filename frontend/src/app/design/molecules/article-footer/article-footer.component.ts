import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-article-footer',
  templateUrl: './article-footer.component.html',
  styleUrls: ['./article-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonLinkComponent,
    ButtonComponent,
    RouterLink,
    NgTemplateOutlet,
  ],
})
export class ArticleFooterComponent {
  buttonLabel = input.required<string>();
  buttonLink = input<string | undefined>(undefined);

  readonly buttonClick = output<void>();
}
