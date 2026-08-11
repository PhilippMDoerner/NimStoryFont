import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Key } from '../../../_models/hotkey';

@Component({
  selector: 'app-key',
  imports: [TitleCasePipe],
  templateUrl: './key.component.html',
  styleUrl: './key.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyComponent {
  readonly key = input.required<Key>();
}
