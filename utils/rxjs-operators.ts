import { HttpErrorResponse } from '@angular/common/http';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  delay,
  filter,
  map,
  of,
  OperatorFunction,
  pipe,
  skip,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { log } from './logging';

export function filterNil<T>(): OperatorFunction<T, NonNullable<T>> {
  return filter((x) => x != null);
}

export function takeFirstNonNil<T>(): OperatorFunction<T, NonNullable<T>> {
  return pipe(filterNil(), take(1));
}

export function takeNextNewValueEquals<T>(x: T): OperatorFunction<T, T> {
  return pipe(
    skip(1),
    filter((obsVal) => obsVal === x),
    take(1),
  );
}

export function throwUnless<T>(
  isSuccessCase: (value: T) => boolean,
  throwError: () => Error,
): OperatorFunction<T, T> {
  return tap((value) => {
    if (!isSuccessCase(value)) {
      throw throwError();
    }
    return value as T;
  });
}

export const debugLog = <T>(debugSymbol?: string): OperatorFunction<T, T> => {
  const isDevelop = environment.kind === 'DEVELOPMENT';
  return tap((x) => {
    if (isDevelop) {
      log(debugSymbol, x);
    }
  });
};

export function mapVoid<T>(): OperatorFunction<T, void> {
  return map(() => void 0);
}

export function mapServerModel<T>(): OperatorFunction<
  HttpErrorResponse,
  T | undefined
> {
  return pipe(
    filter((error) => error.status === 401),
    map((error) => error.error as T | undefined),
  );
}

/**
 * Delays false-y values by the specified amount of time.
 * truth-y values are emitted immediately.
 * If a false-y value gets emitted while a truth-y value is being delayed, then that false-y value is cancelled.
 * @param delayByMs - Amount of time in ms that a false-y value will be delayed by
 * @returns
 */
export function delayFalsy<T>(
  delayByMs = 1000,
): OperatorFunction<T | undefined, T | undefined> {
  return pipe(switchMap((x) => of(x).pipe(delay(x ? 0 : delayByMs))));
}

export function takeOnceOrUntilDestroyed<T>(
  destroyRef?: DestroyRef,
): OperatorFunction<T, T> {
  return pipe(
    take(1),
    destroyRef ? takeUntilDestroyed(destroyRef) : takeUntilDestroyed(),
  );
}
