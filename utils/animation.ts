import { environment } from 'src/environments/environment';

// We should respect prefers-reduced-motion for those that turned off animations
const showAnimations =
  window?.matchMedia(`(prefers-reduced-motion: no-preference)`).matches ??
  false;

if (!showAnimations && environment.kind === 'DEVELOPMENT') {
  console.warn('Animations disabled');
}

export function withViewTransition(cb: () => void): void {
  if (!showAnimations) {
    cb();
  } else {
    document?.startViewTransition(() => cb());
  }
}
