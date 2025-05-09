export declare function parseTriggers(triggers: string): [string, string?][];
export declare function listenToTriggers(element: HTMLElement, triggers: string, isOpenedFn: () => boolean, openFn: () => void, closeFn: () => void, openDelayMs?: number, closeDelayMs?: number): () => void;
