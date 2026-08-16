import { Observable, OperatorFunction, ObservedValueOf } from 'rxjs';

declare function concatLatestFrom<T extends Observable<unknown>[], V>(observablesFactory: (value: V) => [...T]): OperatorFunction<V, [V, ...{
    [i in keyof T]: ObservedValueOf<T[i]>;
}]>;
declare function concatLatestFrom<T extends Observable<unknown>, V>(observableFactory: (value: V) => T): OperatorFunction<V, [V, ObservedValueOf<T>]>;

type MapResponseObserver<T, E, R1, R2> = {
    next: (value: T) => R1;
    error: (error: E) => R2;
};
/**
 * `mapResponse` is a map operator with included error handling.
 * It is similar to `tapResponse`, but allows to map the response as well.
 *
 * The main use case is for NgRx Effects which requires an action to be dispatched.
 *
 * @usageNotes
 * ```ts
 * export const loadAllUsers = createEffect((
 *   actions$ = inject(Actions),
 *   usersService = inject(UsersService)
 * ) => {
 *   return actions$.pipe(
 *     ofType(UsersPageActions.opened),
 *     exhaustMap(() => {
 *       return usersService.getAll().pipe(
 *         mapResponse({
 *           next: (users) => UsersApiActions.usersLoadedSuccess({ users }),
 *           error: (error) => UsersApiActions.usersLoadedFailure({ error }),
 *         })
 *       );
 *     })
 *   );
 * });
 * ```
 */
declare function mapResponse<T, E, R1, R2>(observer: MapResponseObserver<T, E, R1, R2>): (source$: Observable<T>) => Observable<R1 | R2>;

type TapResponseObserver<T, E> = {
    next: (value: T) => void;
    error: (error: E) => void;
    complete?: () => void;
    finalize?: () => void;
};
declare function tapResponse<T, E = unknown>(observer: TapResponseObserver<T, E>): (source$: Observable<T>) => Observable<T>;
/**
 * @deprecated Instead of passing a sequence of callbacks, use an observer
 * object. For more info see: https://github.com/ngrx/platform/issues/4840
 */
declare function tapResponse<T, E = unknown>(next: (value: T) => void, error: (error: E) => void, complete?: () => void): (source$: Observable<T>) => Observable<T>;

export { concatLatestFrom, mapResponse, tapResponse };
