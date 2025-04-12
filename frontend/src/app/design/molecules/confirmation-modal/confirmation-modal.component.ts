import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import {
  NgbActiveModal,
  NgbModal,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ElementKind } from 'src/app/design/atoms/_models/button';
import { Icon } from 'src/app/design/atoms/_models/icon';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { componentId } from 'src/utils/DOM';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, NgbModule],
})
export class ConfirmationModalComponent<T> {
  heading = input.required<string>();
  confirmValue = input.required<T>();
  submitIcon = input<Icon>();
  modalType = input<ElementKind>('PRIMARY');
  cancelButtonType = input<ElementKind>('SECONDARY');
  submitButtonLabel = input<string>('Yes');
  cancelButtonLabel = input<string>('No');

  modalClass = computed(
    () => `modal-border--${this.modalType().toLowerCase()}`,
  );
  readonly modalClose = output<void>();
  readonly confirm = output<T>();
  readonly cancelled = output<T>();

  id = componentId();
  bodyId = `${this.id}-body`;

  constructor(private modalService: NgbModal) {}

  open(content: TemplateRef<HTMLElement>) {
    this.modalService
      .open(content, {
        ariaLabelledBy: this.id,
        ariaDescribedBy: this.bodyId,
        modalDialogClass: this.modalClass(),
      })
      .result.then(
        () => this.modalClose.emit(),
        () => this.modalClose.emit(),
      );
  }

  onSubmit(modal: NgbActiveModal) {
    this.confirm.emit(this.confirmValue());
    modal.close();
  }

  onCancel(modal: NgbActiveModal) {
    this.cancelled.emit(this.confirmValue());
    modal.close();
  }
}
