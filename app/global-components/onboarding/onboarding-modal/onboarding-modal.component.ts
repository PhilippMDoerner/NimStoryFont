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
import { componentId } from '../../../../utils/DOM';
import { takeOnceOrUntilDestroyed } from '../../../../utils/rxjs-operators';
import { HotkeyService } from '../../../_services/hotkey.service';
import { AuthStore } from '../../../auth.store';
import { ButtonComponent } from '../../../design/atoms/button/button.component';
import { UserPreferencesStore } from '../../../user-preferences.store';
import { OnboardingStepperComponent } from '../onboarding-stepper/onboarding-stepper.component';

@Component({
  selector: 'app-onboarding-modal',
  imports: [ButtonComponent, OnboardingStepperComponent],
  templateUrl: './onboarding-modal.component.html',
  styleUrl: './onboarding-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingModalComponent {
  readonly isCampaignAdmin = input<boolean>();

  readonly modalService = inject(NgbModal);
  readonly authStore = inject(AuthStore);
  readonly preferencesStore = inject(UserPreferencesStore);

  readonly activeStepElement = signal<CdkStep | undefined>(undefined);

  readonly modalTitle = `${componentId()}-onboarding-modal-title`;

  constructor(hotkeyService: HotkeyService) {
    hotkeyService
      .watchAction('show-onboarding')
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
            isLoggedIn && queryState === 'success',
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
