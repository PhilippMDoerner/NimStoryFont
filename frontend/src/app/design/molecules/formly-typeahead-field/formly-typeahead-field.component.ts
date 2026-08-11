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
import { filterNil } from '../../../../utils/rxjs-operators';
import { CustomTypeaheadProps } from '../../../_models/formly';
import {
  cleanSearchTerm,
  matchesSearchterm,
} from '../../atoms/_models/typeahead';
import { BadgeComponent } from '../../atoms/badge/badge.component';

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
  readonly destroyRef = inject(DestroyRef);
  readonly typeaheadElement = viewChild<NgbTypeahead>(`instance`, {
    debugName: 'instance',
  });

  readonly inputElement =
    viewChild<ElementRef<HTMLInputElement>>(`inputElement`);
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

  readonly selectedItem$ = new ReplaySubject<Partial<T> | null>(1);
  readonly selectedItemLabel$ = this.selectedItem$.pipe(
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

  readonly search: OperatorFunction<string, readonly T[]> = (
    searchTrigger$: Observable<string>,
  ) => {
    const searchTerm$ = merge(searchTrigger$, this.focus$, this.click$).pipe(
      debounceTime(200),
      map((searchTerm) => cleanSearchTerm(searchTerm)),
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
    return matchesSearchterm(searchTerm, optionLabel, formatter);
  }

  private getCustomProps(): CustomTypeaheadProps<T> {
    return this.props['additionalProperties'];
  }
}
