import { HttpErrorResponse } from '@angular/common/http';
import { signalStoreFeature, withState } from '@ngrx/signals';
import {
  Request,
  RequestMap,
  RequestState,
  UnionToIntersection,
} from '../factory-types';
import { getKeys } from './types';

/**
 * Creates an object with a bunch of properties based on an input name
 */
type NewProperties<Name extends string, Q> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Q extends Request<infer Params, infer Response>
    ? Record<Uncapitalize<Name>, Response | undefined> &
        Record<`${Name}CreateError`, HttpErrorResponse> &
        Record<`${Uncapitalize<Name>}CreateState`, RequestState>
    : never;

/**
 * Type describing a gigantic object that contains `NewProperties` for each key inside the Requests-object.
 * So { x: NewProperties<x>, y: NewPropeties<y>, z: NewProperties<z>... }
 **/
type AllNewPropertiesObject<Requests extends RequestMap> = {
  [Key in keyof Requests & string]: NewProperties<
    Key,
    UnionToIntersection<Requests[Key]>
  >;
};

/**
 * Type union of all properties from AllNewPropertiesObject
 * Essentially `NewProperties<x> | NewProperties<y> | NewProperties<z>...`
 */
type NewPropertiesUnion<Requests extends RequestMap> =
  AllNewPropertiesObject<Requests>[keyof AllNewPropertiesObject<Requests>];

/**
 * An intersection type of all new properties. Thus any instance of this type
 * must have all the fields that were derived via `NewProperties` for all keys in `Requests`.
 */
export type AllNewProperties<Requests extends RequestMap> = UnionToIntersection<
  NewPropertiesUnion<Requests>
>;

export function withCreateState<Requests extends RequestMap>(
  Requests: Requests,
) {
  return signalStoreFeature(
    withState(() => {
      const requestStates = Object.keys(Requests)
        .map((requestName) => getKeys(requestName))
        .map((keys) => {
          const x = {
            [keys.errorField]: undefined,
            [keys.requestStateField]: 'init' satisfies RequestState,
          };
          return x;
        });

      const requestStateSignals = requestStates.reduce(
        (acc, requestState) => ({ ...acc, ...requestState }),
        {},
      ) as AllNewProperties<Requests> & {};
      return requestStateSignals;
    }),
  );
}
