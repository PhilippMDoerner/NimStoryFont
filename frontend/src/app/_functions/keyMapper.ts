import { capitalize } from 'src/utils/string';
import { Key, KeyCombination } from '../_models/hotkey';

export function encodeKey(event: Key, capitalizeKeys = false) {
  const labels = [
    event.altKey ? 'Alt' : '',
    event.ctrlKey ? 'Ctrl' : '',
    event.metaKey ? 'Meta' : '',
    event.shiftKey ? 'Shift' : '',
    event.key.toLowerCase(),
  ];

  return labels
    .filter((label) => label)
    .map((label) => (capitalizeKeys ? capitalize(label) : label))
    .join('+');
}

export function encodeKeyCombination(
  combo: KeyCombination,
  capitalizeKeys = false,
) {
  return combo.map((key) => encodeKey(key, capitalizeKeys)).join(' + ');
}
