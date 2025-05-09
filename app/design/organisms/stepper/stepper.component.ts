import { CdkStepper } from '@angular/cdk/stepper';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Subject } from 'rxjs';
import { componentId } from 'src/utils/DOM';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IconComponent } from '../../atoms/icon/icon.component';

type AnimationState = 'ENTER' | 'EXIT' | 'NONE';
const ANIMATION_STATES: {
  [key in AnimationState]: { next: AnimationState; prior: AnimationState };
} = {
  ENTER: {
    next: 'NONE',
    prior: 'EXIT',
  },
  EXIT: {
    next: 'ENTER',
    prior: 'NONE',
  },
  NONE: {
    next: 'EXIT',
    prior: 'ENTER',
  },
};

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
  imports: [NgTemplateOutlet, ButtonComponent, IconComponent],
  host: {
    '[attr.aria-labelledby]': 'id',
  },
})
export class StepperComponent extends CdkStepper {
  stepContainer = viewChild.required('stepContentContainer');

  destroyRef = inject(DestroyRef);

  animationState = signal<'ENTER' | 'EXIT' | 'NONE'>('NONE');
  animationDirection = signal<'FORWARD' | 'BACKWARD'>('FORWARD');
  animationEnd$ = new Subject<AnimationState>();

  private readonly id = componentId();
  readonly contentId = `stepper-content-${this.id}`;

  constructor() {
    super();
    this.setupAnimationBehavior();
  }

  selectNextStep(): void {
    const maxStepIndex = this.steps.length - 1;
    if (this.selectedIndex === maxStepIndex) return;

    this.animationDirection.set('FORWARD');
    this.startAnimation();
  }

  selectPriorStep(): void {
    if (this.selectedIndex === 0) return;

    this.animationDirection.set('BACKWARD');
    this.startAnimation();
  }

  private startAnimation() {
    this.animationEnd$.next('NONE');
  }

  private toNextAnimationState(state: AnimationState): AnimationState {
    switch (this.animationDirection()) {
      case 'FORWARD':
        return ANIMATION_STATES[state].next;
      case 'BACKWARD':
        return ANIMATION_STATES[state].prior;
    }
  }

  private setupAnimationBehavior() {
    const nextAnimationState$ = this.animationEnd$.pipe(
      map((state) => this.toNextAnimationState(state)),
    );

    nextAnimationState$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((nextAnimationState) => {
        if (this.isAboutToShowNextStep(nextAnimationState)) {
          this.changeStepContentToNextStep();
        }

        this.animationState.set(nextAnimationState);
      });
  }

  private isAboutToShowNextStep(nextAnimationState: AnimationState) {
    switch (this.animationDirection()) {
      case 'FORWARD':
        return nextAnimationState === 'ENTER';
      case 'BACKWARD':
        return nextAnimationState === 'EXIT';
    }
  }

  private changeStepContentToNextStep() {
    switch (this.animationDirection()) {
      case 'FORWARD':
        this.next();
        break;
      case 'BACKWARD':
        this.previous();
        break;
    }
  }
}
