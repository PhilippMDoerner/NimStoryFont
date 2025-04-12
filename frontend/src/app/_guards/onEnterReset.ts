import { inject, InjectionToken, Type } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';

interface Resettable {
  reset: (
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot,
  ) => void;
}
type TypableInjectionToken<T> = InjectionToken<T> | Type<T>;

/**
 * Calls the reset method of the given injectable object when the route is being activated.
 * This ensures the store is reset when entering the route.
 */
export function onEnterReset(
  resettable: TypableInjectionToken<Resettable>,
): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    inject(resettable).reset(state, state);
    return true;
  };
}
