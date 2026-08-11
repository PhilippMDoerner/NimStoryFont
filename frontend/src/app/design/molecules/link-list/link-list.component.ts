import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Params, RouterLink, UrlTree } from '@angular/router';
import { HeadingDirective } from '../../../_directives/heading.directive';
import { HeadingLevel } from '../../atoms/_models/heading';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { ListEntry } from '../_models/list';
import { MenuItem } from '../_models/menu';
import { ContextMenuComponent } from '../context-menu/context-menu.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkListComponent {
  readonly heading = input.required<string>();
  readonly entries = input.required<ListEntry[]>();
  readonly ariaLevel = input.required<HeadingLevel>();
  readonly createOption = input<CreateKind>({ kind: 'none' });
  readonly emptyListText = input('No entries yet');

  readonly createButtonClick = output<void>();
  readonly menuOptionClick = output<string>();
}
