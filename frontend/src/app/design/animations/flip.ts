import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

const flipAnimation = [
  style({
    'webkit-transform': 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
    transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
    'webkit-animation-timing-function': 'ease-in',
    'animation-timing-function': 'ease-in',
  }),
  animate(
    '400ms',
    keyframes([
      style({
        'webkit-transform': 'perspective(400px) rotate3d(0, 1, 0, -20deg)',
        transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)',
        'webkit-animation-timing-function': 'ease-in',
        'animation-timing-function': 'ease-in',
        offset: 0.4,
      }),
      style({
        'webkit-transform': 'perspective(400px) rotate3d(0, 1, 0, 10deg)',
        transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)',
        offset: 0.6,
      }),
      style({
        'webkit-transform': 'perspective(400px) rotate3d(0, 1, 0, -5deg)',
        transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)',
        offset: 0.8,
      }),
      style({
        'webkit-transform': 'perspective(400px)',
        transform: 'perspective(400px)',
        offset: 1,
      }),
    ]),
  ),
];

export const flipInY = trigger('flipInY', [
  transition('sideA => sideB', flipAnimation),
  transition('sideB => sideA', flipAnimation),
]);
