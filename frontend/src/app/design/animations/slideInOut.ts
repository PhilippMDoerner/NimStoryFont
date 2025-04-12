import { animate, style, transition, trigger } from '@angular/animations';

const out = style({
  transform: 'translateX(-100%)',
});
const ins = style({
  transform: 'translateX(0%)',
});
export const slideInOut = trigger('slideInOut', [
  transition('void => *', [out, animate('1s ease-in-out', ins)]),
  transition('* => void', [ins, animate('1s ease-in-out', out)]),
]);

export const slideInOutSameElement = trigger('slideInOutSameElement', [
  transition('in => out', [
    style({
      transform: 'translateX(0%)',
    }),
    animate(
      '1s ease-in-out',
      style({
        transform: 'translateX(-100%)',
      }),
    ),
  ]),
  transition('out => in', [
    style({
      transform: 'translateX(100%)',
    }),
    animate(
      '1s ease-in-out',
      style({
        transform: 'translateX(0%)',
      }),
    ),
  ]),
]);
