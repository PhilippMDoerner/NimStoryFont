import { Directive, input } from '@angular/core';
import { HeadingLevel } from '../design/atoms/_models/heading';

@Directive({
  selector: '[heading]',
  host: {
    role: 'heading',
    '[attr.aria-level]': 'heading()',
  },
})
export class HeadingDirective {
  heading = input.required<HeadingLevel>();
}
