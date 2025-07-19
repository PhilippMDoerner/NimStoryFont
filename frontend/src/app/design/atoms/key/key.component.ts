import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type Key = Pick<
  KeyboardEvent,
  'ctrlKey' | 'shiftKey' | 'altKey' | 'metaKey' | 'key'
>;

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
