import { EventManager, Modifier, hasModifiers } from './_violations-chunk.mjs';

function isFakeClick(event) {
  return event.detail === 0 || !event.pointerType;
}
function isProgrammaticClick(event) {
  return !event.isTrusted;
}
class ClickEventManager extends EventManager {
  options = {
    preventDefault: false,
    stopPropagation: false
  };
  on(...args) {
    const {
      handler,
      modifiers
    } = this._normalizeInputs(...args);
    this.configs.push({
      handler,
      matcher: event => this._isMatch(event, modifiers),
      ...this.options
    });
    return this;
  }
  _normalizeInputs(...args) {
    if (args.length === 2) {
      return {
        modifiers: args[0],
        handler: args[1]
      };
    }
    return {
      modifiers: Modifier.None,
      handler: args[0]
    };
  }
  _isMatch(event, modifiers) {
    const isAllowed = isProgrammaticClick(event) || !isFakeClick(event);
    return isAllowed && hasModifiers(event, modifiers);
  }
}

export { ClickEventManager };
//# sourceMappingURL=_click-event-manager-chunk.mjs.map
