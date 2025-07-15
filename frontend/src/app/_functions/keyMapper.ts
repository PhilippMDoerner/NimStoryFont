export function encodeKey(event: KeyboardEvent) {
  return `${event.altKey ? 'alt+' : ''}${event.ctrlKey ? 'ctrl+' : ''}${event.metaKey ? 'meta+' : ''}${event.shiftKey ? 'shift+' : ''}${event.key.toLowerCase()}`;
}
