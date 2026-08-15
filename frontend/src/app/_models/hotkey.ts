import { capitalize } from '../../utils/string';

// Hotkeys = Shortcuts with global scope
// Shortcuts = Overarching word for key-combinations performing an action

export type Key = Pick<KeyboardEvent, 'key'> &
  Partial<Pick<KeyboardEvent, 'ctrlKey' | 'shiftKey' | 'altKey' | 'metaKey'>>;

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

export const HOTKEY_ACTIONS = [
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
  'show-tooltips',
  'show-onboarding',
] as const;
export const ACTIONS_SET = new Set<string>(HOTKEY_ACTIONS);
export type HotkeyAction = (typeof HOTKEY_ACTIONS)[number];

export type KeyCombination = Key[];

export type HotkeyMapping = {
  [key in HotkeyAction]: { keys: KeyCombination; modified: boolean };
};

export const DEFAULT_HOTKEY_MAPPINGS: HotkeyMapping = {
  create: { keys: [{ key: 'c', altKey: true }], modified: false },
  delete: { keys: [{ key: 'd', altKey: true }], modified: false },
  update: { keys: [{ key: 'e', altKey: true }], modified: false },
  'description-update': { keys: [{ key: 'w', altKey: true }], modified: false },
  cancel: { keys: [{ key: 'q', altKey: true }], modified: false },
  'jump-to-next-entry': {
    keys: [{ key: 'ArrowDown', altKey: true }],
    modified: false,
  },
  'jump-to-prior-entry': {
    keys: [{ key: 'ArrowUp', altKey: true }],
    modified: false,
  },
  search: { keys: [{ key: 's', altKey: true }], modified: false },
  focus: { keys: [{ key: 'f', altKey: true }], modified: false },
  cut: { keys: [{ key: 'x', altKey: true }], modified: false },
  toggle: { keys: [{ key: 'r', altKey: true }], modified: false },
  'show-tooltips': { keys: [{ key: 'g', altKey: true }], modified: false },
  'show-onboarding': { keys: [{ key: 'o', altKey: true }], modified: false },
};

export function equals(a: Key | undefined, b: Key | undefined) {
  if (a === b) return true;
  if (!a || !b) return false;

  return (
    a.key === b.key &&
    (a.altKey ?? false) === (b.altKey ?? false) &&
    (a.ctrlKey ?? false) === (b.ctrlKey ?? false) &&
    (a.metaKey ?? false) === (b.metaKey ?? false) &&
    (a.shiftKey ?? false) === (b.shiftKey ?? false)
  );
}

export function parseKeyCombinationStr(
  str: string,
): KeyCombination | undefined {
  const keyStrs = str.toLowerCase().split('-');
  const keys = keyStrs.map((keyStr) => parseKeyStr(keyStr));
  if (keys.some((key) => !key)) return undefined;

  return keys as Key[];
}

export function parseKeyStr(str: string): Key | undefined {
  const segments = str.toLowerCase().split('+');
  const key = segments.find(
    (segment) => !MODIFIER_KEYS.has(capitalize(segment)),
  );
  if (!key) return undefined;

  return {
    key,
    altKey: segments.includes('alt'),
    ctrlKey: segments.includes('ctrl'),
    metaKey: segments.includes('meta'),
    shiftKey: segments.includes('shift'),
  };
}

export const HOTKEY_IGNORE_ATTR = 'hotkey-ignore';
