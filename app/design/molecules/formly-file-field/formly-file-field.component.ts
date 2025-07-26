import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { filter, fromEvent, map } from 'rxjs';
import { FileFieldKind } from 'src/app/_models/formly';
import { ElementKind } from 'src/app/design/atoms/_models/button';

// WARNING: DO NOT USE IN FORMS THAT UPDATE
// THIS FIELD DOES NOT TOLERATE RECEIVING EXISTING VALUES
@Component({
  selector: 'app-formly-file-field',
  templateUrl: './formly-file-field.component.html',
  styleUrls: ['./formly-file-field.component.scss'],
  imports: [
    FormlyModule,
    FormlyBootstrapModule,
    ReactiveFormsModule,
    NgbTooltipModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFileFieldComponent
  extends FieldType<FieldTypeConfig>
  implements OnInit
{
  //Extends needs to be this elaborate as otherwise the Angular compiler does not know
  //that FieldType.formControl contains all fields required to satisfy the interface FormControl
  //https://github.com/ngx-formly/ngx-formly/issues/2842#issuecomment-1016476706
  @ViewChild('fileInputElement')
  fileInputElement!: ElementRef<HTMLInputElement>;

  selectedFileName?: string;
  buttonType!: ElementKind;
  fieldKind!: FileFieldKind;
  window = inject(DOCUMENT).defaultView;

  constructor() {
    super();
    this.updateModelOnFilePaste();
  }

  ngOnInit(): void {
    this.buttonType = this.props['buttonType'];
    this.fieldKind = this.props['fileFieldKind'];
  }

  onFileSelect(event: Event) {
    const files = (event?.target as HTMLInputElement).files;
    const hasSelectedFile = files && files.length > 0;
    if (!hasSelectedFile) return;
    this.setModelValue(files);
  }

  private setModelValue(files: FileList): void {
    const file: File = files[0];
    this.model[this.key as string] = file;
    this.selectedFileName = `${file.name}`;
    this.formControl.setValue(file);
    this.formControl.markAsDirty();
    this.setInputFieldValue(files);
  }

  private setInputFieldValue(files: FileList): void {
    const dataTransfer = new DataTransfer();
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!file) continue;
      dataTransfer.items.add(file);
    }
    this.fileInputElement.nativeElement.files = dataTransfer.files;
  }

  // Required as only clicking on the label counts as clicking on the file-field button
  // Thus we catch that event, stop its propagation and click specifically on the file-field button
  // in a way that won't cause that event to bubble upwards.
  onButtonClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    const element: HTMLElement = this.fileInputElement.nativeElement;
    const newClick = new MouseEvent('click', { bubbles: false });
    element.dispatchEvent(newClick);
  }

  private updateModelOnFilePaste() {
    if (this.window) {
      fromEvent<ClipboardEvent>(this.window, 'paste')
        .pipe(
          map((event) => event.clipboardData?.files),
          filter((pastedFiles) => !!pastedFiles?.[0]),
          takeUntilDestroyed(),
        )
        .subscribe((pastedFiles) => {
          if (!pastedFiles || pastedFiles.length === 0) return;
          this.setModelValue(pastedFiles);
        });
    }
  }
}
