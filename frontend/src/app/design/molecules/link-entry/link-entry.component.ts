import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { LinkEntry } from '../_models/link-entry';
type State = 'DISPLAY' | 'DELETE';

@Component({
  selector: 'app-link-entry',
  templateUrl: './link-entry.component.html',
  styleUrls: ['./link-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, NgTemplateOutlet],
})
export class LinkEntryComponent<T> {
  entry = input.required<LinkEntry<T>>();
  canDelete = input(false);
  deleteMessage = input('Delete entry?');

  readonly delete = output<T>();
  readonly linkClick = output<T>();

  state = signal<State>('DISPLAY');

  changeState(newState: State) {
    this.state.set(newState);
  }
}
