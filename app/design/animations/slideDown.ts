import { animate, style, transition, trigger } from '@angular/animations';

/**
 * Memo for me:
 * :enter in the context of transition: a shortcut for void => *
 * :enter in the context of query: the entering component
 * :leave in the context of transition: a shortcut for * => void
 * :leave in the context of query: the leaving component
 * query => You are the div that triggers the animation, but the div to animate is a child component of yours
 * transition => You are the div that triggers the animation *and* you want to be the div that gets animated
 */

const inactiveStyle = style({
  opacity: 0.2,
  transform: 'translateY(50%)',
});
const activeStyle = style({
  opacity: 1,
  transform: 'translateY(0%)',
});

export const slideFromBottom = trigger('slideFromBottom', [
  transition(':enter', [inactiveStyle, animate('500ms ease-out', activeStyle)]),
  transition(':leave', [activeStyle, animate('500ms ease-in', inactiveStyle)]),
]);

export const slideUpFromBottom = trigger('slideUpFromBottom', [
  transition(':enter', [inactiveStyle, animate('500ms ease-out', activeStyle)]),
]);

export const slideOutFromBottom = trigger('slideOutFromBottom', [
  transition(':leave', [activeStyle, animate('500ms ease-in', inactiveStyle)]),
]);

const inactiveSlideRightStyle = style({
  transform: 'translateX(100%)',
});
const activeSlideRightStyle = style({
  transform: 'translateX(0%)',
});

export const slideRight = trigger('slideRight', [
  transition(':enter', [
    inactiveSlideRightStyle,
    animate('250ms ease-in-out', activeSlideRightStyle),
  ]),
  transition(':leave', [
    activeSlideRightStyle,
    animate('250ms ease-in-out', inactiveSlideRightStyle),
  ]),
]);
