import { Component, input, output } from '@angular/core';
import { Params, RouterLink, UrlTree } from '@angular/router';
import { HeadingDirective } from 'src/app/_directives/heading.directive';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { HeadingLevel } from '../../atoms/_models/heading';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { ListEntry } from '../_models/list';
import {
  ContextMenuComponent,
  MenuItem,
} from '../context-menu/context-menu.component';

export type CreateKind =
  | { kind: 'none' }
  | { kind: 'button' }
  | {
      kind: 'link';
      url: string[] | UrlTree | string | undefined;
      queryParams?: Params;
      fragment?: string;
    }
  | { kind: 'menu'; menuItems: MenuItem[] };

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss'],
  imports: [
    ButtonComponent,
    HeadingDirective,
    RouterLink,
    ButtonLinkComponent,
    ContextMenuComponent,
  ],
})
export class LinkListComponent {
  heading = input.required<string>();
  entries = input.required<ListEntry[]>();
  ariaLevel = input.required<HeadingLevel>();
  createOption = input<CreateKind>({ kind: 'none' });
  emptyListText = input('No entries yet');

  readonly createButtonClick = output<void>();
  readonly menuOptionClick = output<string>();
}
