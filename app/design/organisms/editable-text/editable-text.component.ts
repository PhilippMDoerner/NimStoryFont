import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HeadingDirective } from 'src/app/_directives/heading.directive';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import { componentId } from 'src/utils/DOM';
import { ElementKind } from '../../atoms/_models/button';
import { HeadingLevel } from '../../atoms/_models/heading';
import {
  EditorComponent,
  TextFieldState,
} from '../../molecules/editor/editor.component';

@Component({
  selector: 'app-editable-text',
  imports: [
    IconComponent,
    EditorComponent,
    FormsModule,
    EditorComponent,
    HotkeyDirective,
    HeadingDirective,
  ],
  templateUrl: './editable-text.component.html',
  styleUrl: './editable-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableTextComponent {
  text = input.required<string>();
  placeholder = input.required<string>();
  canUpdate = input.required<boolean>();
  ariaLevel = input.required<HeadingLevel>();
  serverModel = input<string>();
  heading = input<string>();
  submitButtonKind = input<ElementKind>('PRIMARY');
  cancelButtonKind = input<ElementKind>('SECONDARY');
  update = output<string>();

  state = signal<TextFieldState>('DISPLAY');
  editButtonText = computed(() => {
    switch (this.state()) {
      case 'DISPLAY':
        return 'edit';
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return 'cancel';
    }
  });

  editorField = viewChild.required<EditorComponent>('editor');
  editorId = componentId();

  constructor() {
    effect(() => {
      const hasUpdateFailed = this.serverModel() != undefined;

      if (hasUpdateFailed) {
        this.state.set('OUTDATED_UPDATE');
      }
    });
  }

  toggleEdit() {
    if (this.state() === 'UPDATE') {
      this.cancelEdit();
    } else {
      this.startEdit();
    }
  }

  startEdit() {
    this.state.set('UPDATE');
  }

  finishEdit(newTextValue: string) {
    this.update.emit(newTextValue);
    this.state.set('DISPLAY');
  }

  cancelEdit() {
    this.state.set('DISPLAY');
  }
}
