import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Key } from 'src/app/_models/hotkey';

@Component({
  selector: 'app-key',
  imports: [TitleCasePipe],
  templateUrl: './key.component.html',
  styleUrl: './key.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyComponent {
  key = input.required<Key>();
}
