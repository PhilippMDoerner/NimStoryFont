import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  signal,
  viewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconCardComponent } from 'src/app/design/molecules';
import { PlaceholderComponent } from '../../atoms/placeholder/placeholder.component';
import { IconCardEntry } from '../_model/icon-card-list';

@Component({
  selector: 'app-icon-card-list',
  templateUrl: './icon-card-list.component.html',
  styleUrls: ['./icon-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconCardComponent, RouterLink, PlaceholderComponent],
})
export class IconCardListComponent {
  readonly isLoading = input.required<boolean>();
  readonly articles = input.required<IconCardEntry[]>();
  readonly ariaLabelId = input.required<string>();
  readonly id = input.required<string>();

  readonly articleLinkElements = viewChildren<ElementRef<HTMLElement>>('articleLink');
  readonly articleCount = computed(() => this.articleLinkElements().length);

  readonly dummyArticles = Array.from({ length: 12 }, (_, idx) => idx);
  readonly focusedIndex = signal<number | undefined>(undefined);

  focusNextArticle(event: Event) {
    event.preventDefault();
    const currentIndex = this.focusedIndex() ?? -1;
    const articleElements = this.articleLinkElements();

    const nextIndex = (currentIndex + 1) % articleElements.length;
    this.focusArticle(nextIndex);
  }

  focusPriorArticle(event: Event) {
    event.preventDefault();
    const currentIndex = this.focusedIndex() ?? -1;
    const nextIndex =
      (currentIndex - 1 + this.articleCount()) % this.articleCount();
    this.focusArticle(nextIndex);
  }

  focusArticle(index: number) {
    const nextElement = this.articleLinkElements().at(index);
    nextElement?.nativeElement.focus();
  }
}
