import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Injector,
  input,
  output,
  signal,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FocusOnRender } from 'src/app/_directives/focusOnRender.directive';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { ElementKind } from 'src/app/design/atoms/_models/button';
import { BadgeComponent } from 'src/app/design/atoms/badge/badge.component';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { componentId } from 'src/utils/DOM';

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
    FocusOnRender,
  ],
})
export class SmallCreateFormComponent<T> {
  options = input.required<T[]>();
  labelProp = input.required<keyof T>();
  formFieldLabel = input.required<string>();
  badgeText = input<string>('Add Entry');
  valueProp = input.required<keyof T>();
  submitButtonType = input<ElementKind>('PRIMARY');
  cancelButtonType = input<ElementKind>('SECONDARY');
  createHotkey = input<string | undefined>();
  disableHotkeys = input<boolean>(false);

  readonly create = output<T>();

  injector = inject(Injector);
  selectFieldName = computed(() => `select-' + ${String(this.labelProp())}`);
  form = new FormGroup({});
  userModel: Partial<T> | undefined = {};
  state = signal<State>('DISPLAY');
  id = componentId();

  changeState(newState: State) {
    this.state.set(newState);
  }

  onChange(event: Event) {
    const selectedIndex = parseInt(
      (event.srcElement as HTMLSelectElement).value,
    );
    this.userModel = this.options()[selectedIndex];
  }

  onCancel() {
    this.changeState('DISPLAY');
    this.userModel = {};
  }

  onSubmit() {
    this.changeState('DISPLAY');

    const hasValue = this.userModel?.[this.valueProp()] != null;
    if (hasValue) {
      this.create.emit(this.userModel as T);
    }
    this.userModel = {};
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
