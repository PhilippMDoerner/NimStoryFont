import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { componentId } from '../../../../utils/DOM';
import { ElementKind } from '../../atoms/_models/button';
import { Icon } from '../../atoms/_models/icon';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DeleteModalComponent],
})
export class ConfirmationModalComponent<T> {
  readonly heading = input.required<string>();
  readonly confirmValue = input.required<T>();
  readonly submitIcon = input<Icon>();
  readonly modalType = input<ElementKind>('PRIMARY');
  readonly cancelButtonType = input<ElementKind>('SECONDARY');
  readonly submitButtonLabel = input<string>('Yes');
  readonly cancelButtonLabel = input<string>('No');

  readonly modalClass = computed(
    () => `modal-border--${this.modalType().toLowerCase()}`,
  );
  readonly modalClose = output<void>();
  readonly confirm = output<T>();
  readonly cancelled = output<T>();

  readonly id = componentId();
  readonly bodyId = `${this.id}-body`;

  constructor(private modalService: NgbModal) {}

  open(content: TemplateRef<HTMLElement>) {
    this.modalService
      .open(content, {
        ariaLabelledBy: this.id,
        ariaDescribedBy: this.bodyId,
        modalDialogClass: this.modalClass(),
      })
      .result.then(
        () => this.modalClose.emit(), // on fulfilled
        () => this.modalClose.emit(), // on rejected
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
