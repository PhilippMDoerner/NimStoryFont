import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbTooltip,
  NgbTypeahead,
  NgbTypeaheadModule,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { FieldType } from '@ngx-formly/bootstrap/form-field';
import { FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import {
  combineLatest,
  debounceTime,
  fromEvent,
  map,
  merge,
  Observable,
  OperatorFunction,
  ReplaySubject,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs';
import { CustomTypeaheadProps } from 'src/app/_models/formly';
import { filterNil } from 'src/utils/rxjs-operators';
import { BadgeComponent } from '../../atoms/badge/badge.component';

const NON_NORMAL_CHARACTER_REGEXP = /[^a-zA-Z0-9]/g;
const TWO_OR_MORE_WHITESPACE_REGEXP = /\s\s+/g;

@Component({
  selector: 'app-formly-typeahead-field',
  imports: [
    ReactiveFormsModule,
    FormlyModule,
    NgbTypeaheadModule,
    AsyncPipe,
    BadgeComponent,
    NgbTooltip,
  ],
  templateUrl: './formly-typeahead-field.component.html',
  styleUrl: './formly-typeahead-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyTypeaheadFieldComponent<T>
  extends FieldType<FieldTypeConfig>
  implements OnInit
{
  destroyRef = inject(DestroyRef);
  typeaheadElement = viewChild<NgbTypeahead>(`instance`, {
    debugName: 'instance',
  });

  inputElement = viewChild<ElementRef<HTMLInputElement>>(`inputElement`);
  inputElement$ = toObservable(this.inputElement).pipe(
    map((input) => input?.nativeElement),
    filterNil(),
  );
  focus$ = this.inputElement$.pipe(
    switchMap((input) => fromEvent<FocusEvent>(input, 'focus')),
    map((event) => (event.target as HTMLInputElement | null)?.value),
  );
  click$ = this.inputElement$.pipe(
    switchMap((input) => fromEvent(input, 'click')),
    map((event) => (event.target as HTMLInputElement | null)?.value),
  );

  selectedItem$ = new ReplaySubject<Partial<T> | null>(1);
  selectedItemLabel$ = this.selectedItem$.pipe(
    map((item) =>
      item ? `${item?.[this.getCustomProps().optionLabelProp]}` : null,
    ),
  );

  ngOnInit(): void {
    const customProps = this.getCustomProps();
    customProps.initialOption$
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((initialOption) => this.selectedItem$.next(initialOption));

    const valueProp: keyof T = customProps.optionValueProp;
    this.inputElement$
      .pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef),
        filterNil(),
        withLatestFrom(customProps.initialOption$),
      )
      .subscribe(([inputElement, initialOption]) => {
        const initialLabel = initialOption?.[
          customProps.optionLabelProp
        ] as string;
        if (initialLabel) {
          inputElement.value = initialLabel;
        }
      });

    this.selectedItem$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((item) => item?.[valueProp]),
      )
      .subscribe((item) => this.formControl.setValue(item));
  }

  search: OperatorFunction<string, readonly T[]> = (
    searchTrigger$: Observable<string>,
  ) => {
    const searchTerm$ = merge(searchTrigger$, this.focus$, this.click$).pipe(
      debounceTime(200),
      map((searchTerm) => this.cleanSearchTerm(searchTerm)),
    );
    const customProps = this.getCustomProps();
    const options$ = searchTerm$.pipe(
      switchMap((term) => customProps.getOptions(term ?? '')),
    );

    return combineLatest({
      searchTerm: searchTerm$,
      options: options$,
    }).pipe(
      map(({ searchTerm, options }) => {
        if (!searchTerm) return options;

        const { formatSearchTerm } = this.getCustomProps();

        return options.filter((opt) =>
          this.matchesSearchterm(
            formatSearchTerm(searchTerm.toLowerCase()) ?? '',
            opt[customProps.optionLabelProp],
          ),
        );
      }),
    );
  };

  resetSelectedValue() {
    this.selectedItem$.next(null);
    this.inputElement$
      .pipe(filterNil(), take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((input) => (input.value = ''));
  }

  resetValueAndText() {
    this.resetSelectedValue();
    this.typeaheadElement()?.writeValue('');
  }

  onSelect(event: NgbTypeaheadSelectItemEvent): void {
    if (event.item) {
      this.selectedItem$.next(event.item);
    } else {
      event.preventDefault();
    }
  }

  clearOnEmptyInput(target: EventTarget | null): void {
    const inputText = (target as HTMLInputElement | null)?.value;
    if (!inputText) {
      this.resetSelectedValue();
    }
  }

  formatItem(item: T): string {
    return item[this.getCustomProps().optionLabelProp] as string;
  }

  private matchesSearchterm(searchTerm: string, optionLabel: T[keyof T]) {
    const formatter = this.getCustomProps().formatSearchTerm;
    const searchRegex = new RegExp(
      searchTerm.toLowerCase().split('').join('.*'),
    );

    switch (typeof optionLabel) {
      case 'string':
      case 'number':
      case 'bigint':
      case 'boolean': {
        const opt1 = formatter(`${optionLabel}`.toLowerCase()) ?? '';
        return opt1.match(searchRegex);
      }
      case 'symbol': {
        const opt2 = formatter(optionLabel.description?.toLowerCase()) ?? '';
        return opt2.match(searchRegex);
      }
      case 'undefined':
      case 'object':
      case 'function':
      default:
        return false;
    }
  }

  private getCustomProps(): CustomTypeaheadProps<T> {
    return this.props['additionalProperties'];
  }

  private cleanSearchTerm(searchTerm: string | undefined): string | undefined {
    return searchTerm
      ?.replaceAll(NON_NORMAL_CHARACTER_REGEXP, ' ')
      .trim()
      .replace(TWO_OR_MORE_WHITESPACE_REGEXP, ' ')
      .trim();
  }
}
