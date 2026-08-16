import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { HotkeyDirective } from '../../../_directives/hotkey.directive';
import { ElementKind } from '../../atoms/_models/button';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-edit-toggle',
  templateUrl: './edit-toggle.component.html',
  styleUrls: ['./edit-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, HotkeyDirective, NgbTooltip],
})
export class EditToggleComponent {
  readonly buttonKind = input<ElementKind>('SECONDARY');
  readonly toggled = input<boolean>(false);
  readonly disabledHotkey = input(false);
  readonly title = input.required<string>();
  readonly _toggled = linkedSignal(() => this.toggled());

  readonly toggleEdit = output<boolean>();

  onClick() {
    this._toggled.set(!this._toggled());
    this.toggleEdit.emit(this._toggled());
  }
}
