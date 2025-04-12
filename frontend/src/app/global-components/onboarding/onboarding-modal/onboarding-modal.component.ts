import { CdkStep } from '@angular/cdk/stepper';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, filter, map, startWith } from 'rxjs';
import { HotkeyService } from 'src/app/_services/hotkey.service';
import { AuthStore } from 'src/app/auth.store';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { PreferencesStore } from 'src/app/preferences.store';
import { componentId } from 'src/utils/DOM';
import { takeOnceOrUntilDestroyed } from 'src/utils/rxjs-operators';
import { OnboardingStepperComponent } from '../onboarding-stepper/onboarding-stepper.component';

@Component({
  selector: 'app-onboarding-modal',
  imports: [ButtonComponent, OnboardingStepperComponent],
  templateUrl: './onboarding-modal.component.html',
  styleUrl: './onboarding-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingModalComponent {
  isCampaignAdmin = input<boolean>();

  modalService = inject(NgbModal);
  authStore = inject(AuthStore);
  preferencesStore = inject(PreferencesStore);

  activeStepElement = signal<CdkStep | undefined>(undefined);

  modalTitle = `${componentId()}-onboarding-modal-title`;

  constructor(hotkeyService: HotkeyService) {
    hotkeyService
      .watch('o')
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.openModal());

    const isLoggedIn$ = toObservable(this.authStore.isLoggedIn).pipe(
      map((isLoggedIn) => !!isLoggedIn),
      startWith(false),
    );
    combineLatest({
      isLoggedIn: isLoggedIn$,
      metadata: toObservable(this.preferencesStore.general),
      queryState: toObservable(this.preferencesStore.generalQueryState),
    })
      .pipe(
        filter(
          ({ queryState, isLoggedIn }) =>
            isLoggedIn && (queryState === 'success' || queryState === 'error'),
        ),
        takeOnceOrUntilDestroyed(),
        filter(({ metadata }) => !metadata?.hasSeenOnboarding),
      )
      .subscribe(() => this.openModal());
  }

  openModal() {
    if (this.modalService.hasOpenModals()) return;
    if (!this.preferencesStore.general()?.hasSeenOnboarding) {
      this.trackOnboardingVisit();
    }

    this.modalService.open(OnboardingModalComponent, {
      modalDialogClass: 'onboarding-modal',
      centered: true,
      ariaLabelledBy: this.modalTitle,
    });
  }

  dismiss() {
    this.modalService.dismissAll();
  }

  private trackOnboardingVisit() {
    this.preferencesStore.createMetaDataEntry({
      category: 'general',
      name: 'hasSeenOnboarding',
      value: 'true',
    });
  }
}
