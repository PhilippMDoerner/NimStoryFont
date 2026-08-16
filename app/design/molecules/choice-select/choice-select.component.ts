import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-choice-select',
  templateUrl: './choice-select.component.html',
  styleUrls: ['./choice-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ChoiceSelectComponent<T> {
  readonly choices = input.required<T[]>();
  readonly labelProp = input.required<keyof T>();
  readonly selectedLabelValue = input.required<string | undefined>();
  readonly id = input.required<string>();

  readonly choiceSelect = output<T>();

  onChange(event: Event) {
    const selectedChoiceIndex: number = parseInt(
      (event.target as HTMLInputElement)?.value,
    );
    this.choiceSelect.emit(this.choices()[selectedChoiceIndex]);
  }
}
