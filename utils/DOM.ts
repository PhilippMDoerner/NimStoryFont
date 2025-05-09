export function getFirstFocusableChild(
  el: HTMLElement,
): HTMLElement | undefined {
  const allFocusableChildren = [
    ...(el.querySelectorAll(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any),
  ] as HTMLElement[];

  return allFocusableChildren.filter(
    (child) => !child.hasAttribute('disabled'),
  )[0];
}

let nextId = 0;
export function componentId(): string {
  return `app-${nextId++}`;
}
