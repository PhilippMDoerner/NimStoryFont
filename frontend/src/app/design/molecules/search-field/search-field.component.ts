import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { InputComponent } from '../../atoms/input/input.component';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, FormsModule, HotkeyDirective, InputComponent],
})
export class SearchFieldComponent {
  NON_NORMAL_CHARACTER_REGEXP = /[^a-zA-Z0-9']/g;
  TWO_OR_MORE_WHITESPACE_REGEXP = /\s\s+/g;

  placeholder = input('Enter Search Query');
  btnAriaLabel = input('Trigger a search');
  canSearch = input.required<boolean>();
  autofocus = input<boolean>(false);
  showButton = input(true);
  _placeholder = computed(() =>
    this.canSearch() ? this.placeholder() : 'Search is currently disabled',
  );
  ariaControls = input<string>();

  readonly appSearch = output<string>();
  readonly searchSubmit = output<string>();
  readonly searchInput = output<string>();

  startSearch(searchString: string): void {
    if (searchString == null || searchString === '') {
      return;
    }

    const cleanSearchString = this.cleanText(searchString);

    if (!cleanSearchString) {
      return;
    }
    this.appSearch.emit(cleanSearchString);
  }

  submitSearch(searchString: string): void {
    this.searchSubmit.emit(searchString);
    this.searchInput.emit(searchString);
  }

  private cleanText(str: string): string {
    return str
      .replace(this.NON_NORMAL_CHARACTER_REGEXP, ' ')
      .trim()
      .replace(this.TWO_OR_MORE_WHITESPACE_REGEXP, ' '); //Removes scenarios with more than 1 consecutive whitespace
  }
}
