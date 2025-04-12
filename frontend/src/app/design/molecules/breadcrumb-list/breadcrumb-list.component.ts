import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbEntry } from '../../templates/_models/breadcrumb-entry';

@Component({
  selector: 'app-breadcrumb-list',
  imports: [RouterLink],
  templateUrl: './breadcrumb-list.component.html',
  styleUrl: './breadcrumb-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbListComponent {
  linkEntries = input.required<BreadcrumbEntry[]>();
}
