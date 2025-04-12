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
        Record<`${Name}Error`, HttpErrorResponse> &
        Record<`${Uncapitalize<Name>}QueryState`, RequestState>
    : never;

/**
 * Type describing a gigantic object that contains `NewProperties` for each key inside the Queries-object.
 * So { x: NewProperties<x>, y: NewPropeties<y>, z: NewProperties<z>... }
 **/
type AllNewPropertiesObject<Queries extends RequestMap> = {
  [Key in keyof Queries & string]: NewProperties<
    Key,
    UnionToIntersection<Queries[Key]>
  >;
};

/**
 * Type union of all properties from AllNewPropertiesObject
 * Essentially `NewProperties<x> | NewProperties<y> | NewProperties<z>...`
 */
type NewPropertiesUnion<Queries extends RequestMap> =
  AllNewPropertiesObject<Queries>[keyof AllNewPropertiesObject<Queries>];

/**
 * An intersection type of all new properties. Thus any instance of this type
 * must have all the fields that were derived via `NewProperties` for all keys in `Queries`.
 */
export type AllNewProperties<Queries extends RequestMap> = UnionToIntersection<
  NewPropertiesUnion<Queries>
>;

export function withQueriesState<Queries extends RequestMap>(queries: Queries) {
  return signalStoreFeature(
    withState(() => {
      const RequestStates = Object.keys(queries)
        .map((queryName) => getKeys(queryName))
        .map((keys) => {
          const x = {
            [keys.dataField]: undefined,
            [keys.errorField]: undefined,
            [keys.queryStateField]: 'init' satisfies RequestState,
          };
          return x;
        });

      const RequestStateSignals = RequestStates.reduce(
        (acc, RequestState) => ({ ...acc, ...RequestState }),
        {},
      ) as AllNewProperties<Queries> & {};
      return RequestStateSignals;
    }),
  );
}
