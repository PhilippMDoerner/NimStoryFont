const UNBINDABLE_HOTKEYS = [
  '',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '-',
  '=',
  'Escape',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'ArrowLeft',
  'ArrowRight',
  '^',
  'Space',
] as const;
export const UNBINDABLE_KEYSET = new Set<string>(UNBINDABLE_HOTKEYS);
type UnbindableHotkey = (typeof UNBINDABLE_HOTKEYS)[number];

type NotA<T> = T extends UnbindableHotkey ? never : T;
type NotB<T> = UnbindableHotkey extends T ? never : T;
export type BindableHotkey<T> = NotA<T> & NotB<T>;
