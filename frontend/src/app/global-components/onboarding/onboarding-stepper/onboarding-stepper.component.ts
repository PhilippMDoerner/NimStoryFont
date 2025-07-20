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
import { encodeKeyCombination } from 'src/app/_functions/keyMapper';
import { HotkeyService } from 'src/app/_services/hotkey.service';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { ExternalLinkComponent } from 'src/app/design/atoms/external-link/external-link.component';
import { SuccessAnimationComponent } from 'src/app/design/atoms/success-animation/success-animation.component';
import { StepperComponent } from 'src/app/design/organisms/stepper/stepper.component';
import { capitalize } from 'src/utils/string';

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
  hotkeyService = inject(HotkeyService);

  isCampaignAdmin = input<boolean>();

  selectionChange = output<CdkStep>();
  finished = output<void>();
  firstStep = viewChild.required<CdkStep>('firstStep');

  host = window ? capitalize(window.location.hostname) : 'Nimstoryfont';
  openOnboardingKeys$ = this.hotkeyService
    .getKeySequence('show-onboarding')
    .pipe(map((keys) => encodeKeyCombination(keys)));
  showHotkeyTooltipsKeys$ = this.hotkeyService
    .getKeySequence('show-tooltips')
    .pipe(map((keys) => encodeKeyCombination(keys)));

  constructor() {
    effect(() => this.selectionChange.emit(this.firstStep()));
  }
}
