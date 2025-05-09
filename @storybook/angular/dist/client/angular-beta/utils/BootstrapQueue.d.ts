import { ApplicationRef } from '@angular/core';
/**
 * Queue bootstrapping, so that only one application can be bootstrapped at a time.
 *
 * Bootstrapping multiple applications at once can cause Angular to throw an error that a component
 * is declared in multiple modules. This avoids two stories confusing the Angular compiler, by
 * bootstrapping more that one application at a time.
 *
 * @param fn Callback that should complete the bootstrap process
 * @returns ApplicationRef from the completed bootstrap process
 */
export declare const queueBootstrapping: (fn: () => Promise<ApplicationRef>) => Promise<ApplicationRef>;
