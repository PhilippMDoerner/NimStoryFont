import { createComputed, SIGNAL, createSignal, createLinkedSignal, linkedSignalUpdateFn, linkedSignalSetFn } from '@angular/core/primitives/signals';
import { signal as signal$1, computed as computed$1 } from '@angular/core';

var Modifier;
(function (Modifier) {
  Modifier[Modifier["None"] = 0] = "None";
  Modifier[Modifier["Ctrl"] = 1] = "Ctrl";
  Modifier[Modifier["Shift"] = 2] = "Shift";
  Modifier[Modifier["Alt"] = 4] = "Alt";
  Modifier[Modifier["Meta"] = 8] = "Meta";
  Modifier["Any"] = "Any";
})(Modifier || (Modifier = {}));
class EventManager {
  configs = [];
  handle(event) {
    for (const config of this.configs) {
      if (config.matcher(event)) {
        config.handler(event);
        if (config.preventDefault) {
          event.preventDefault();
        }
        if (config.stopPropagation) {
          event.stopPropagation();
        }
      }
    }
  }
}
function getModifiers(event) {
  return (+event.ctrlKey && Modifier.Ctrl) | (+event.shiftKey && Modifier.Shift) | (+event.altKey && Modifier.Alt) | (+event.metaKey && Modifier.Meta);
}
function hasModifiers(event, modifiers) {
  const eventModifiers = getModifiers(event);
  const modifiersList = Array.isArray(modifiers) ? modifiers : [modifiers];
  if (modifiersList.includes(Modifier.Any)) {
    return true;
  }
  return modifiersList.some(modifiers => eventModifiers === modifiers);
}

class KeyboardEventManager extends EventManager {
  options = {
    ignoreRepeat: true,
    preventDefault: true,
    stopPropagation: true
  };
  on(...args) {
    const {
      modifiers,
      key,
      handler,
      options
    } = this._normalizeInputs(...args);
    this.configs.push({
      handler: handler,
      matcher: event => this._isMatch(event, key, modifiers, options),
      ...this.options,
      ...options
    });
    return this;
  }
  _normalizeInputs(...args) {
    const withModifiers = Array.isArray(args[0]) || Modifier.hasOwnProperty(args[0]);
    const modifiers = withModifiers ? args[0] : Modifier.None;
    const key = withModifiers ? args[1] : args[0];
    const handler = withModifiers ? args[2] : args[1];
    const options = withModifiers ? args[3] : args[2];
    return {
      key: key,
      handler: handler,
      modifiers: modifiers,
      options: options ?? {}
    };
  }
  _isMatch(event, key, modifiers, options) {
    if (event.key == null || !hasModifiers(event, modifiers)) {
      return false;
    }
    if (event.repeat && options?.ignoreRepeat !== false) {
      return false;
    }
    if (key instanceof RegExp) {
      return key.test(event.key);
    }
    const keyStr = typeof key === 'string' ? key : key();
    return keyStr.toLowerCase() === event.key.toLowerCase();
  }
}

function convertGetterSetterToWritableSignalLike(getter, setter) {
  return Object.assign(getter, {
    set: setter,
    update: updateCallback => setter(updateCallback(getter())),
    asReadonly: () => getter
  });
}
function computed(computation) {
  const computed = createComputed(computation);
  computed[SIGNAL].debugName = '';
  return computed;
}
function signal(initialValue) {
  const [get, set, update] = createSignal(initialValue);
  get[SIGNAL].debugName = '';
  return Object.assign(get, {
    set,
    update,
    asReadonly: () => get
  });
}
function linkedSignal(sourceFn) {
  const getter = createLinkedSignal(sourceFn, s => s);
  getter[SIGNAL].debugName = '';
  return Object.assign(getter, {
    set: v => linkedSignalSetFn(getter[SIGNAL], v),
    update: updater => linkedSignalUpdateFn(getter[SIGNAL], updater),
    asReadonly: () => getter
  });
}

function sortDirectives(a, b) {
  return (a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_PRECEDING) > 0 ? 1 : -1;
}

class SortedCollection {
  _items = signal$1(new Set());
  _version = signal$1(0);
  _observer;
  orderedItems = computed$1(() => {
    this._version();
    const itemsArray = Array.from(this._items());
    return itemsArray.sort(sortDirectives);
  });
  register(item) {
    this._items.update(set => {
      const newSet = new Set(set);
      newSet.add(item);
      return newSet;
    });
  }
  unregister(item) {
    this._items.update(set => {
      const newSet = new Set(set);
      newSet.delete(item);
      return newSet;
    });
  }
  startObserving(element) {
    if (this._observer) {
      this._observer.disconnect();
    }
    this._observer = new MutationObserver(mutations => {
      const hasStructuralChange = mutations.some(m => m.addedNodes.length || m.removedNodes.length);
      if (hasStructuralChange) {
        this._version.update(v => v + 1);
      }
    });
    this._observer.observe(element, {
      childList: true,
      subtree: true
    });
  }
  stopObserving() {
    this._observer?.disconnect();
    this._observer = undefined;
  }
}

function reportViolations(violations, element) {
  if (violations.length) {
    console.warn('Violations found on element: %o:', element);
    violations.forEach(violation => {
      console.warn(violation);
    });
  }
}

export { EventManager, KeyboardEventManager, Modifier, SortedCollection, computed, convertGetterSetterToWritableSignalLike, hasModifiers, linkedSignal, reportViolations, signal, sortDirectives };
//# sourceMappingURL=_violations-chunk.mjs.map
