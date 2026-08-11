import { CdkStep, CdkStepperModule } from '@angular/cdk/stepper';
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { map } from 'rxjs';
import { capitalize } from '../../../../utils/string';
import { encodeKeyCombination } from '../../../_functions/keyMapper';
import { HotkeyService } from '../../../_services/hotkey.service';
import { ButtonComponent } from '../../../design/atoms/button/button.component';
import { ExternalLinkComponent } from '../../../design/atoms/external-link/external-link.component';
import { SuccessAnimationComponent } from '../../../design/atoms/success-animation/success-animation.component';
import { StepperComponent } from '../../../design/organisms/stepper/stepper.component';

@Component({
  selector: 'app-onboarding-stepper',
  imports: [
    StepperComponent,
    CdkStepperModule,
    SuccessAnimationComponent,
    ButtonComponent,
    ExternalLinkComponent,
    AsyncPipe,
  ],
  templateUrl: './onboarding-stepper.component.html',
  styleUrl: './onboarding-stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingStepperComponent {
  readonly hotkeyService = inject(HotkeyService);

  readonly isCampaignAdmin = input<boolean>();

  readonly selectionChange = output<CdkStep>();
  readonly finished = output<void>();
  readonly firstStep = viewChild.required<CdkStep>('firstStep');

  readonly host = window
    ? capitalize(window.location.hostname)
    : 'Nimstoryfont';
  readonly openOnboardingKeys$ = this.hotkeyService
    .getKeySequence('show-onboarding')
    .pipe(map((keys) => encodeKeyCombination(keys)));
  readonly showHotkeyTooltipsKeys$ = this.hotkeyService
    .getKeySequence('show-tooltips')
    .pipe(map((keys) => encodeKeyCombination(keys)));

  constructor() {
    effect(() => this.selectionChange.emit(this.firstStep()));
  }
}
