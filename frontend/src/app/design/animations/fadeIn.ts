import { animate, style, transition, trigger } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('250ms ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('250ms ease-out', style({ opacity: 0 })),
  ]),
]);

export const fadeOut = trigger('fadeOut', [
  transition(':leave', [
    style({ opacity: 1 }),
    animate('250ms ease-out', style({ opacity: 0 })),
  ]),
]);
