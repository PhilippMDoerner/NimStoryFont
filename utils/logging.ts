import { isDevMode } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(debugSymbol?: string, ...data: any[]) {
  if (!isDevMode()) return;

  console.groupCollapsed(`[DEBUG] ${debugSymbol}:`, data);
  console.trace();
  console.groupEnd();
}
