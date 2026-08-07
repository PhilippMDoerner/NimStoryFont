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
import { ShortcutAction } from 'src/app/_models/hotkey';
import { ElementKind } from 'src/app/design/atoms/_models/button';
import { BadgeComponent } from 'src/app/design/atoms/badge/badge.component';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { withViewTransition } from 'src/utils/animation';
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
  readonly options = input.required<T[]>();
  readonly labelProp = input.required<keyof T>();
  readonly formFieldLabel = input.required<string>();
  readonly badgeText = input<string>('Add Entry');
  readonly valueProp = input.required<keyof T>();
  readonly submitButtonType = input<ElementKind>('PRIMARY');
  readonly cancelButtonType = input<ElementKind>('SECONDARY');
  readonly createHotkey = input<ShortcutAction | undefined>();
  readonly disableHotkeys = input<boolean>(false);

  readonly create = output<T>();

  readonly injector = inject(Injector);
  readonly selectFieldName = computed(
    () => `select-' + ${String(this.labelProp())}`,
  );
  readonly form = new FormGroup({});
  userModel: T | undefined = undefined;
  readonly state = signal<State>('DISPLAY');
  readonly id = componentId();

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
    withViewTransition(() => {
      switch (this.state()) {
        case 'DISPLAY':
          return this.changeState('CREATE');
        case 'CREATE':
          return this.onCancel();
      }
    });
  }
}
