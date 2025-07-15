export const MODIFIER_KEYS = new Set([
  'Alt',
  'Control',
  'AltGraph',
  'Meta',
  'Shift',
  'CapsLock',
  'Escape',
  'Enter',
  'Tab',
]);

export const ACTIONS = [
  'scroll-top',
  'create',
  'delete',
  'update',
  'description-update',
  'cancel',
  'jump-to-next-entry',
  'jump-to-prior-entry',
  'search',
  'focus',
  'cut',
  'toggle',
  'show-help',
  'show-tooltips',
  'show-onboarding',
] as const;
export const ACTIONS_SET = new Set<string>(ACTIONS);
export type ShortcutAction = (typeof ACTIONS)[number];

export type KeyCombination = string[];

export type ShortcutMapping = {
  [key in ShortcutAction]: { keys: KeyCombination; modified: boolean };
};

export const DEFAULT_MAPPINGS: ShortcutMapping = {
  'scroll-top': { keys: ['Alt+t'], modified: false },
  create: { keys: ['Alt+c'], modified: false },
  delete: { keys: ['Alt+d'], modified: false },
  update: { keys: ['Alt+e'], modified: false },
  'description-update': { keys: ['Alt+w'], modified: false },
  cancel: { keys: ['Alt+q'], modified: false },
  'jump-to-next-entry': { keys: ['Alt+ArrowDown'], modified: false },
  'jump-to-prior-entry': { keys: ['Alt+ArrowUp'], modified: false },
  search: { keys: ['Alt+s'], modified: false },
  focus: { keys: ['Alt+f'], modified: false },
  cut: { keys: ['Alt+x'], modified: false },
  toggle: { keys: ['Alt+r'], modified: false },
  'show-tooltips': { keys: ['Alt+g'], modified: false },
  'show-help': { keys: ['Alt+h'], modified: false },
  'show-onboarding': { keys: ['Alt+o'], modified: false },
};
