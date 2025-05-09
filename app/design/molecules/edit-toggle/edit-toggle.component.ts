import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { ElementKind } from 'src/app/design/atoms/_models/button';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';

@Component({
  selector: 'app-edit-toggle',
  templateUrl: './edit-toggle.component.html',
  styleUrls: ['./edit-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, HotkeyDirective, NgbTooltip],
})
export class EditToggleComponent {
  buttonKind = input<ElementKind>('SECONDARY');
  toggled = input<boolean>(false);
  disabledHotkey = input(false);
  title = input.required<string>();
  _toggled = linkedSignal(() => this.toggled());

  toggleEdit = output<boolean>();

  onClick() {
    this._toggled.set(!this._toggled());
    this.toggleEdit.emit(this._toggled());
  }
}
