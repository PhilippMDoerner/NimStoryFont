const showAnimations =
  window?.matchMedia(`(prefers-reduced-motion: reduce)`).matches ?? false;

export function withViewTransition(cb: () => void): void {
  if (!showAnimations) return;
  document?.startViewTransition(() => cb());
}
