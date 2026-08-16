import { CdkTrapFocus } from '@angular/cdk/a11y';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastType } from '../../../_models/toast';
import { slideRight } from '../../animations/slideDown';
import { Icon } from '../../atoms/_models/icon';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast-overlay',
  imports: [
    NgbToastModule,
    ButtonComponent,
    IconComponent,
    NgTemplateOutlet,
    CdkTrapFocus,
    NgClass,
  ],
  animations: [slideRight],
  templateUrl: './toast-overlay.component.html',
  styleUrl: './toast-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[ariaLive]': 'isCurrentlyImportant() ? "assertive" : "polite"',
    '[attr.role]': 'isCurrentlyImportant() ? "alert" : "status"',
  },
})
export class ToastOverlayComponent {
  readonly toastService = inject(ToastService);

  readonly currentToast = this.toastService.currentToast;
  readonly isCurrentlyImportant = computed(
    () => this.currentToast()?.important ?? false,
  );
  readonly icon = computed<Icon | undefined>(() => {
    const currentToast = this.currentToast();
    if (!currentToast) return undefined;

    return this.toHeaderIcon(currentToast.type, currentToast.header?.icon);
  });

  dismissCurrentToast() {
    const currentToast = this.currentToast();
    if (!currentToast) return undefined;

    const onHide = currentToast.onHide;
    if (onHide) onHide();

    this.toastService.dismissToast();
  }

  private toHeaderIcon(
    toastType: ToastType,
    icon: Icon | undefined,
  ): Icon | undefined {
    if (icon != null) return icon;

    switch (toastType) {
      case 'DANGER':
        return 'triangle-exclamation' satisfies Icon;
      case 'WARNING':
        return 'circle-exclamation' satisfies Icon;
      case 'INFO':
        return 'info-circle' satisfies Icon;
      case 'SUCCESS':
        return 'check' satisfies Icon;
      default:
        return 'info' satisfies Icon;
    }
  }
}
