import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const pulse = trigger('pulse', [
  transition('start => end', [
    style({ filter: 'brightness(100%)' }),
    animate(
      '500ms ease-in-out',
      keyframes([
        style({ filter: 'brightness(200%)', offset: 0.5 }),
        style({ filter: 'brightness(100%)', offset: 1 }),
      ]),
    ),
  ]),
]);
