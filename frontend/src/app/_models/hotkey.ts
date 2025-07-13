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
  [key in ShortcutAction]: KeyCombination;
};

export const DEFAULT_MAPPINGS: ShortcutMapping = {
  'scroll-top': ['Alt+t'],
  create: ['Alt+c'],
  delete: ['Alt+d'],
  update: ['Alt+e'],
  'description-update': ['Alt+w'],
  cancel: ['Alt+q'],
  'jump-to-next-entry': ['Alt+ArrowDown'],
  'jump-to-prior-entry': ['Alt+ArrowUp'],
  search: ['Alt+s'],
  focus: ['Alt+f'],
  cut: ['Alt+x'],
  toggle: ['Alt+r'],
  'show-tooltips': ['Alt+g'],
  'show-help': ['Alt+h'],
  'show-onboarding': ['Alt+o'],
};
