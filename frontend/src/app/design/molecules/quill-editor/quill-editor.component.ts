import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import Quill, { QuillOptions } from 'quill';
import { HOTKEY_IGNORE_ATTR } from 'src/app/_models/hotkey';
import { QUILL_SETTINGS } from 'src/app/app.constants';

@Component({
  selector: 'app-quill-editor',
  imports: [],
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    [HOTKEY_IGNORE_ATTR]: '',
  },
})
export class QuillEditorComponent {
  private readonly container = viewChild<ElementRef<HTMLElement>>('editor');

  readonly readOnly = input<boolean>(false);

  public readonly input = output<string>();

  private quillConfig = computed<QuillOptions>(() => ({
    ...QUILL_SETTINGS,
    readOnly: this.readOnly(),
  }));

  public readonly quill = computed(() => {
    const el = this.container()?.nativeElement;
    console.log('Running with ', el);

    return el ? new Quill(el, this.quillConfig()) : undefined;
  });

  constructor() {
    effect(() => this.quill());
  }
}
