import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { MethodsDictionary } from '@ngrx/signals/src/signal-store-models';
import { Observable, pipe, switchMap, tap } from 'rxjs';
import { successToast } from 'src/app/_models/toast';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import {
  Request,
  RequestMap,
  RequestState,
  UnionToIntersection,
} from '../factory-types';
import { getKeys } from './types';

/**
 * Creates an object with a bunch of methods based on an input name
 */
type NewMethods<Name extends string, Q> =
  Q extends Request<void, infer Resp extends object>
    ? Record<`update${Capitalize<Name>}`, () => Observable<Resp>>
    : Q extends Request<infer Params, infer Resp extends object>
      ? Record<
          `update${Capitalize<Name>}`,
          (params: Params) => Observable<Resp>
        >
      : never;

/**
 * Type describing a gigantic object that contains `NewProperties` for each key inside the Requests-object.
 * So { x: NewMethods<x>, y: NewMethods<y>, z: NewMethods<z>... }
 **/
type AllNewMethodsObject<Requests extends RequestMap> = {
  [Key in keyof Requests & string]: NewMethods<
    Key,
    UnionToIntersection<Requests[Key]>
  >;
};

/**
 * Type union of all methods from AllNewMethodsObject
 * Essentially `NewMethods<x> | NewMethods<y> | NewMethods<z>...`
 */
type NewMethodUnion<Requests extends RequestMap> =
  AllNewMethodsObject<Requests>[keyof AllNewMethodsObject<Requests>];

/**
 * An intersection type of all new methods. Thus any instance of this type
 * must have all the fields that were derived via `NewMethods` for all keys in `Requests`.
 */ export type AllNewMethods<Requests extends RequestMap> =
  UnionToIntersection<NewMethodUnion<Requests>>;

export function withUpdateMethods<Requests extends RequestMap>(
  requests: Requests,
) {
  return signalStoreFeature(
    withMethods((store) => {
      const toastService = inject(ToastService);

      const requestLoadFunctions = Object.keys(requests)
        .map((requestName) => getKeys(requestName))
        .map((keys) => {
          return {
            [keys.updateMethod]: rxMethod(
              pipe(
                tap(() =>
                  patchState(store, {
                    [keys.requestStateField]: 'loading' satisfies RequestState,
                    [keys.errorField]: undefined,
                  }),
                ),
                switchMap((params) => requests[keys.name](params)),
                tapResponse({
                  next: (val) => {
                    toastService.addToast(
                      successToast('Updated successfully!'),
                    );
                    patchState(store, {
                      [keys.dataField]: val,
                      [keys.requestStateField]:
                        'success' satisfies RequestState,
                      [keys.serverModelField]: undefined,
                    });
                  },
                  error: (err: HttpErrorResponse) => {
                    const isOutdatedUpdateError = err.status === 409;
                    const serverModel = isOutdatedUpdateError
                      ? err.error
                      : undefined;

                    patchState(store, {
                      [keys.errorField]: err,
                      [keys.requestStateField]: 'error' satisfies RequestState,
                      [keys.serverModelField]: serverModel,
                    });
                  },
                }),
              ),
            ),
          };
        });

      return requestLoadFunctions.reduce(
        (acc, requestLoadFunction) => ({ ...acc, ...requestLoadFunction }),
        {},
      ) as MethodsDictionary & AllNewMethods<Requests>;
    }),
  );
}
