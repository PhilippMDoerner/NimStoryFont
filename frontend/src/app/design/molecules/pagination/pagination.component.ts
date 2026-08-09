import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { NgbPagination, NgbPaginationPages } from '@ng-bootstrap/ng-bootstrap';
import { componentId } from 'src/utils/DOM';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-pagination',
  imports: [NgbPagination, NgbPaginationPages],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  readonly collectionSize = input.required<number>();
  readonly pageSize = input.required<number>();
  readonly page = model.required<number>();

  readonly pageChanged = output<number>();

  protected readonly labelId = `${componentId()}-input-label`;
  protected readonly descriptionId = `${componentId()}-description`;
  protected readonly inputId = `${componentId()}-input`;

  protected selectPage(newIndexStr: string) {
    const newIndex = parseInt(newIndexStr, 10);
    if (isNaN(newIndex)) return;
    this.page.set(newIndex);
  }

  protected formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }
}
