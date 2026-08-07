import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  NgbTooltip,
  NgbTypeahead,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import {
  combineLatest,
  debounceTime,
  fromEvent,
  map,
  merge,
  Observable,
  OperatorFunction,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { FocusOnRender } from 'src/app/_directives/focusOnRender.directive';
import { filterNil } from 'src/utils/rxjs-operators';
import {
  cleanSearchTerm,
  Formatter,
  matchesSearchterm,
} from '../_models/typeahead';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'app-typeahead',
  imports: [NgbTypeahead, BadgeComponent, NgbTooltip, FocusOnRender],
  templateUrl: './typeahead.component.html',
  styleUrl: './typeahead.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeaheadComponent<T> {
  readonly options = input.required<T[]>();
  readonly labelProp = input.required<keyof T>();
  readonly valueProp = input.required<keyof T>();
  readonly selectedItem = input<T>();
  readonly id = input.required<string>();
  readonly autocomplete = input<string>();
  readonly suggestionLimit = input<number | undefined>(20);
  readonly placeholder = input<string>();
  readonly disabled = input<boolean | undefined>(false);
  readonly formatter = input<Formatter>();
  readonly autofocus = input<boolean>(false);

  readonly changed = output<T | undefined>();

  readonly typeaheadElement = viewChild.required<NgbTypeahead>(`instance`, {
    debugName: 'instance',
  });

  readonly selectedItemLabel = computed<string | undefined>(() => {
    const selectedItem = this.selectedItem();
    if (!selectedItem) return undefined;
    return selectedItem[this.labelProp()] as string | undefined;
  });

  readonly options$ = toObservable(this.options);
  readonly labelProp$ = toObservable(this.labelProp);
  readonly formatter$ = toObservable(this.formatter);
  readonly suggestionLimit$ = toObservable(this.suggestionLimit);
  readonly inputElement = viewChild<ElementRef<HTMLInputElement>>(`inputElement`);
  readonly inputElement$ = toObservable(this.inputElement).pipe(
    map((input) => input?.nativeElement),
    filterNil(),
  );

  readonly focus$ = this.inputElement$.pipe(
    switchMap((input) => fromEvent<FocusEvent>(input, 'focus')),
    map((event) => (event.target as HTMLInputElement | null)?.value),
  );
  readonly click$ = this.inputElement$.pipe(
    switchMap((input) => fromEvent(input, 'click')),
    map((event) => (event.target as HTMLInputElement | null)?.value),
  );

  resetSelectedValue() {
    this.changed.emit(undefined);
  }

  formatItem(item: T): string {
    return item[this.labelProp()] as string;
  }

  onSelect(event: NgbTypeaheadSelectItemEvent): void {
    if (event.item) {
      this.changed.emit(event.item);
    } else {
      this.changed.emit(undefined);
      event.preventDefault();
    }
  }

  clearOnEmptyInput(target: EventTarget | null): void {
    const inputText = (target as HTMLInputElement | null)?.value;
    if (!inputText) {
      this.resetSelectedValue();
    }
  }

  resetValueAndText() {
    this.resetSelectedValue();
    this.typeaheadElement()?.writeValue('');
  }

  readonly search: OperatorFunction<string, readonly T[]> = (
    searchTrigger$: Observable<string>,
  ) => {
    const searchTerm$ = merge(searchTrigger$, this.focus$, this.click$).pipe(
      debounceTime(200),
      map((searchTerm) => searchTerm?.toLowerCase()),
      map((searchTerm) => cleanSearchTerm(searchTerm)),
    );

    const formattedSearchTerm$ = combineLatest({
      searchTerm: searchTerm$,
      formatter: this.formatter$,
    }).pipe(
      map(({ searchTerm, formatter }) =>
        formatter ? formatter(searchTerm) : searchTerm,
      ),
    );

    const formattedOptions: Observable<(T & { label: string })[]> =
      combineLatest({
        options: this.options$,
        formatter: this.formatter$,
        labelProp: this.labelProp$,
      }).pipe(
        map(({ options, formatter, labelProp }): (T & { label: string })[] =>
          options.map((opt) => {
            const label = formatter
              ? formatter(opt[labelProp] as string)
              : (opt[labelProp] as string);

            return { ...opt, label: label ?? '' };
          }),
        ),
      );

    return combineLatest({
      searchTerm: formattedSearchTerm$,
      options: formattedOptions,
    }).pipe(
      map(({ searchTerm, options }) => {
        if (!searchTerm) return options;

        return options.filter((opt) =>
          matchesSearchterm(searchTerm, opt.label.toLowerCase()),
        );
      }),
      withLatestFrom(this.suggestionLimit$),
      map(([options, limit]) => (limit ? options.slice(0, limit) : options)),
    );
  };
}
