import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  viewChild,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  Observable,
  of,
  ReplaySubject,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { CustomAutocompleteProps } from 'src/app/_models/formly';
import { filterNil } from 'src/utils/rxjs-operators';
import { BadgeComponent } from '../../atoms/badge/badge.component';
import { SpinnerComponent } from '../../atoms/spinner/spinner.component';

const NON_NORMAL_CHARACTER_REGEXP = /[^a-zA-Z0-9]/g;
const TWO_OR_MORE_WHITESPACE_REGEXP = /\s\s+/g;

interface AutocompleteSelectEvent<T> {
  sourceEvent: Event | null;
  inputValue: string;
  selectedOption: T | undefined;
}

@Component({
  selector: 'app-formly-autocomplete-field',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    FormlyModule,
    SpinnerComponent,
    BadgeComponent,
    NgbTooltip,
  ],
  templateUrl: './formly-autocomplete-field.component.html',
  styleUrl: './formly-autocomplete-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyAutocompleteFieldComponent<T>
  extends FieldType<FieldTypeConfig>
  implements OnInit, OnDestroy
{
  destroy$ = new Subject<void>();
  randomId = crypto.randomUUID();
  inputElement = viewChild<ElementRef<HTMLInputElement>>(`input`);
  inputElement$: Observable<ElementRef<HTMLInputElement>> = toObservable(
    this.inputElement,
  ).pipe(filterNil());

  customProps: CustomAutocompleteProps<T> = this.props['additionalProperties'];

  htmlBadgeClickEvents$ = new Subject<void>();
  inputValue = '';
  htmlInputEvents$: Observable<{ event: Event; inputValue: string }> =
    this.inputElement$.pipe(
      switchMap((input) => fromEvent(input.nativeElement, 'input')),
      map((event) => ({
        event,
        inputValue: this.inputElement()?.nativeElement.value ?? '',
      })),
      tap(() => this.formControl.markAsDirty()),
    );
  // Clears select and input when backspace on an empty input field is pressed
  htmlBackspaceClearEvents$ = this.inputElement$.pipe(
    switchMap((input) => fromEvent(input.nativeElement, 'keydown')),
    filter((event) => (event as KeyboardEvent).key === 'Backspace'),
    filter(() => this.inputElement()?.nativeElement.value === ''),
    map(() => void 0),
    debounceTime(100),
  );
  manualInputTrigger$ = new Subject<string>();
  manualInputEvents$ = this.manualInputTrigger$.pipe(
    map((manualValue) => ({ event: null, inputValue: manualValue })),
  );
  inputEvents$ = merge(this.htmlInputEvents$, this.manualInputEvents$);

  // Clears select and input when the input field has been emptied
  inputClearSelectEvents$ = this.inputEvents$.pipe(
    filter((event) => event.inputValue.length === 0),
    map(() => void 0),
    debounceTime(100),
  );
  clearSelectEvents$ = merge(
    this.inputClearSelectEvents$,
    this.htmlBadgeClickEvents$,
    this.htmlBackspaceClearEvents$,
  ).pipe(
    map(() => ({
      sourceEvent: null,
      inputValue: '',
      selectedOption: undefined,
    })),
  );
  selectEvents$!: Observable<AutocompleteSelectEvent<T>>;
  isLoading$ = new ReplaySubject(1);
  options$: Observable<T[]> = this.htmlInputEvents$.pipe(
    debounceTime(500),
    tap(() => this.isLoading$.next(true)),
    switchMap(() => {
      const searchTerm = this.inputElement()?.nativeElement.value;
      const cleanedTerm = searchTerm
        ?.replaceAll(NON_NORMAL_CHARACTER_REGEXP, ' ')
        .trim()
        .replace(TWO_OR_MORE_WHITESPACE_REGEXP, ' ')
        .trim();
      const hasValidSearchTerm = cleanedTerm && cleanedTerm.length >= 1;
      if (!hasValidSearchTerm) return of([]);

      return this.customProps.loadOptions(
        cleanedTerm,
        this.props,
        this.formControl,
      );
    }),
    tap(() => this.isLoading$.next(false)),
    shareReplay(1),
  );

  selectedOption$!: Observable<T | undefined>;
  selectedLabel$!: Observable<string | undefined>;

  onFocus() {
    this.inputElement()?.nativeElement.focus();
  }

  ngOnInit(): void {
    this.setupData();
    this.setupBehavior();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupBehavior() {
    // FormControl <=> SelectEvent <=> InputEvent <=> input-value
    // Bind input-event => select-event done in Data

    // Bind input-event => input-field-value
    // Detailed: Update the HTML Field when any input event (be it thrown by the HTML event or programmatically) gets thrown
    this.inputEvents$.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      this.inputValue = event.inputValue;
    });

    // Bind select-event => form-control
    // Detailed: Update the formControl when any select event occurs.
    this.selectEvents$.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      const newSelectedValue =
        event.selectedOption?.[this.customProps.optionValueProp];
      this.formControl.setValue(newSelectedValue);
    });

    // Sync value from form-control => input-event => select-event
    // Detailed: Fire a "manual" input event when the form control changes.
    // This inevitably also fires a corresponding select event and also updates the value of the HTML input
    this.formControl.valueChanges
      .pipe(
        startWith(this.formControl.value),
        distinctUntilChanged(),
        withLatestFrom(this.selectedOption$, this.options$),
        takeUntil(this.destroy$),
      )
      .subscribe(([newFormValue, currentlySelectedOption, options]) => {
        const currentlySelectedValue =
          currentlySelectedOption?.[this.customProps.optionValueProp];
        const hasFormValueChanged = newFormValue !== currentlySelectedValue;

        if (hasFormValueChanged) {
          const formOption = options.find(
            (opt) => opt[this.customProps.optionValueProp] === newFormValue,
          );
          const hasOptionForNewFormValue = formOption != null;
          if (hasOptionForNewFormValue) {
            this.manualInputTrigger$.next(
              formOption[this.customProps.optionLabelProp] as string,
            );
          } else {
            this.manualInputTrigger$.next(`${newFormValue}`);
          }
        }
      });
  }

  private setupData() {
    this.customProps = this.props['additionalProperties'];

    const selectFromInputEvents$ = combineLatest({
      options: this.options$,
      inputEvent: this.inputEvents$,
    }).pipe(
      map(({ options, inputEvent }) => {
        const selectedOption = options.find(
          (option) =>
            option[this.customProps.optionLabelProp] === inputEvent.inputValue,
        );
        return {
          inputValue: inputEvent.inputValue,
          sourceEvent: inputEvent.event,
          selectedOption,
        };
      }),
      filter((event) => event.selectedOption != null),
    );
    this.selectEvents$ = merge(selectFromInputEvents$, this.clearSelectEvents$);

    this.selectedOption$ = merge(
      this.customProps.initialValue$ ?? of(undefined),
      this.selectEvents$.pipe(
        map((selectEvent) => selectEvent.selectedOption),
        shareReplay(1),
      ),
    );

    this.selectedLabel$ = this.selectedOption$.pipe(
      map(
        (option) =>
          option?.[this.customProps.optionLabelProp] as string | undefined,
      ),
    );
  }
}
