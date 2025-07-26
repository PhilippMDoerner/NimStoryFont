import { computed, Injectable, signal } from '@angular/core';
import { ToastConfig } from 'src/app/_models/toast';
import { log } from 'src/utils/logging';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts = signal<ToastConfig[]>([]);
  currentToast = computed<ToastConfig | undefined>(() => this.toasts()[0]);

  public addToast(newToast: ToastConfig) {
    log(this.addToast.name, newToast);
    const toasts = this.toasts();
    if (newToast.important) {
      this.toasts.set([newToast, ...toasts]);
    } else {
      this.toasts.set([...toasts, newToast]);
    }
  }

  public dismissToast() {
    const [, ...newToastList] = this.toasts();
    this.toasts.set(newToastList);
  }
}
