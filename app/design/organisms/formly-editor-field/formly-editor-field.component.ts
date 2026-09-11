import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { QuillEditorComponent } from '../../molecules/quill-editor/quill-editor.component';

@Component({
  selector: 'app-formly-editor-field',
  templateUrl: './formly-editor-field.component.html',
  styleUrls: ['./formly-editor-field.component.scss'],
  imports: [ReactiveFormsModule, FormlyModule, QuillEditorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyEditorFieldComponent extends FieldType<FieldTypeConfig> {}
