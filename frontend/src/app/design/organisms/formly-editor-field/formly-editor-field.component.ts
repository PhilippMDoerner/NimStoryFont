import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TINYMCE_SETTINGS } from 'src/app/app.constants';

@Component({
  selector: 'app-formly-editor-field',
  templateUrl: './formly-editor-field.component.html',
  styleUrls: ['./formly-editor-field.component.scss'],
  imports: [EditorModule, ReactiveFormsModule, FormlyModule],
})
export class FormlyEditorFieldComponent extends FieldType<FieldTypeConfig> {
  settings = TINYMCE_SETTINGS;
}
