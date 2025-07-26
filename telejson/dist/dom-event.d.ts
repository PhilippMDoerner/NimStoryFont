declare function extractEventHiddenProperties(event: Event): Partial<Record<"bubbles" | "cancelBubble" | "cancelable" | "composed" | "currentTarget" | "defaultPrevented" | "eventPhase" | "isTrusted" | "returnValue" | "srcElement" | "target" | "timeStamp" | "type" | "composedPath" | "initEvent" | "preventDefault" | "stopImmediatePropagation" | "stopPropagation" | "AT_TARGET" | "BUBBLING_PHASE" | "CAPTURING_PHASE" | "NONE" | "detail" | "initCustomEvent", unknown>>;

export { extractEventHiddenProperties };
