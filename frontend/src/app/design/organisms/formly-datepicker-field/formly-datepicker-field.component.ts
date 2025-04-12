import { Component, Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[2], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[0], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    if (date == null) return '';

    const dayString: string = `${date.day}`.padStart(2, '0');
    const monthString: string = `${date.month}`.padStart(2, '0');
    const yearString: string = `${date.year}`.padStart(4, '0');
    return `${yearString}${this.DELIMITER}${monthString}${this.DELIMITER}${dayString}`;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value == null) return null;

    const date = value.split(this.DELIMITER);
    return {
      day: parseInt(date[2], 10),
      month: parseInt(date[1], 10),
      year: parseInt(date[0], 10),
    };
  }

  format(date: NgbDateStruct | null): string {
    if (date == null) return '';

    const dayString: string = `${date.day}`.padStart(2, '0');
    const monthString: string = `${date.month}`.padStart(2, '0');
    const yearString: string = `${date.year}`.padStart(4, '0');
    return `${yearString}${this.DELIMITER}${monthString}${this.DELIMITER}${dayString}`;
  }
}

@Component({
  selector: 'app-formly-datepicker',
  templateUrl: './formly-datepicker-field.component.html',
  styleUrls: ['./formly-datepicker-field.component.scss'],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will want to provide your main App Module
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    FormlyModule,
    NgbDatepickerModule,
    IconComponent,
  ],
})
export class FormlyDatepickerFieldComponent extends FieldType<FieldTypeConfig> {
  constructor(
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
  ) {
    super();
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }
}
