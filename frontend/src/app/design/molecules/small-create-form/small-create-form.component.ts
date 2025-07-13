import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injector,
  input,
  output,
  signal,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { HotkeyAction } from 'src/app/_models/hotkey';
import { ElementKind } from 'src/app/design/atoms/_models/button';
import { BadgeComponent } from 'src/app/design/atoms/badge/badge.component';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { componentId } from 'src/utils/DOM';
import { TypeaheadComponent } from '../../atoms/typeahead/typeahead.component';

type State = 'DISPLAY' | 'CREATE';
export interface DisableableOption<T> {
  value: T;
  disabled: boolean;
}

@Component({
  selector: 'app-small-create-form',
  templateUrl: './small-create-form.component.html',
  styleUrls: ['./small-create-form.component.scss'],
  imports: [
    BadgeComponent,
    NgTemplateOutlet,
    ButtonComponent,
    HotkeyDirective,
    TypeaheadComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallCreateFormComponent<T> {
  options = input.required<T[]>();
  labelProp = input.required<keyof T>();
  formFieldLabel = input.required<string>();
  badgeText = input<string>('Add Entry');
  valueProp = input.required<keyof T>();
  submitButtonType = input<ElementKind>('PRIMARY');
  cancelButtonType = input<ElementKind>('SECONDARY');
  createHotkey = input<HotkeyAction | undefined>();
  disableHotkeys = input<boolean>(false);

  readonly create = output<T>();

  injector = inject(Injector);
  selectFieldName = computed(() => `select-' + ${String(this.labelProp())}`);
  form = new FormGroup({});
  userModel: T | undefined = undefined;
  state = signal<State>('DISPLAY');
  id = componentId();

  changeState(newState: State) {
    this.state.set(newState);
  }

  onChange(value: T | undefined) {
    this.userModel = value;
  }

  onCancel() {
    this.changeState('DISPLAY');
    this.userModel = undefined;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const canSubmit = this.userModel != null;
    if (!canSubmit) return;

    this.changeState('DISPLAY');

    const hasValue = this.userModel?.[this.valueProp()] != null;
    if (hasValue) {
      this.create.emit(this.userModel as T);
    }
    this.userModel = undefined;
  }

  toggleForm() {
    switch (this.state()) {
      case 'DISPLAY':
        return this.changeState('CREATE');
      case 'CREATE':
        return this.onCancel();
    }
  }
}
