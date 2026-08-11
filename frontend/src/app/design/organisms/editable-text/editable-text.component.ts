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

import { componentId } from '../../../../utils/DOM';
import { withViewTransition } from '../../../../utils/animation';
import { HeadingDirective } from '../../../_directives/heading.directive';
import { HotkeyDirective } from '../../../_directives/hotkey.directive';
import { ElementKind } from '../../atoms/_models/button';
import { HeadingLevel } from '../../atoms/_models/heading';
import { IconComponent } from '../../atoms/icon/icon.component';
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
  readonly text = input.required<string>();
  readonly placeholder = input.required<string>();
  readonly canUpdate = input.required<boolean>();
  readonly ariaLevel = input.required<HeadingLevel>();
  readonly serverModel = input<string>();
  readonly heading = input<string>();
  readonly submitButtonKind = input<ElementKind>('PRIMARY');
  readonly cancelButtonKind = input<ElementKind>('SECONDARY');
  readonly update = output<string>();

  readonly state = signal<TextFieldState>('DISPLAY');
  readonly editButtonText = computed(() => {
    switch (this.state()) {
      case 'DISPLAY':
        return 'edit';
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        return 'cancel';
    }
  });

  readonly editorField = viewChild.required<EditorComponent>('editor');
  readonly editorId = componentId();

  constructor() {
    effect(() => {
      const hasUpdateFailed = this.serverModel() != undefined;

      if (hasUpdateFailed) {
        this.state.set('OUTDATED_UPDATE');
      }
    });
  }

  toggleEdit() {
    withViewTransition(() => {
      if (this.state() === 'UPDATE') {
        this.cancelEdit();
      } else {
        this.startEdit();
      }
    });
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
