import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const backInUp = trigger('backInUp', [
  transition(':enter', [
    style({
      transform: 'translateY(800px) scale(0.7)',
      opacity: 0.7,
    }),
    animate(
      '800ms ease-out',
      keyframes([
        style({
          offset: 0.8,
          transform: 'translateY(0px) scale(0.7)',
          opacity: 0.7,
        }),
        style({
          offset: 1,
          transform: 'scale(1)',
          opacity: 1,
        }),
      ]),
    ),
  ]),
  transition(':leave', [
    style({
      transform: 'scale(1)',
      opacity: 1,
    }),
    animate(
      '800ms ease-in',
      keyframes([
        style({
          offset: 0.2,
          transform: 'translateY(0px) scale(0.7)',
          opacity: 0.7,
        }),
        style({
          offset: 1,
          transform: 'translateY(-800px) scale(0.7)',
          opacity: 0.7,
        }),
      ]),
    ),
  ]),
]);
