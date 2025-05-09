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
    ? Record<`${Name}UpdateError`, HttpErrorResponse> &
        Record<`${Uncapitalize<Name>}UpdateState`, RequestState> &
        Record<`${Uncapitalize<Name>}ServerModel`, Response | undefined>
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

export function withUpdateState<Requests extends RequestMap>(
  Requests: Requests,
) {
  return signalStoreFeature(
    withState(() => {
      const RequestStates = Object.keys(Requests)
        .map((RequestName) => getKeys(RequestName))
        .map((keys) => {
          const x = {
            [keys.errorField]: undefined,
            [keys.requestStateField]: 'init' satisfies RequestState,
            [keys.serverModelField]: undefined,
          };
          return x;
        });

      const RequestStateSignals = RequestStates.reduce(
        (acc, RequestState) => ({ ...acc, ...RequestState }),
        {},
      ) as AllNewProperties<Requests> & {};
      return RequestStateSignals;
    }),
  );
}
