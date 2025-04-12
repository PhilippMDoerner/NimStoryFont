import { WritableStateSource } from '@ngrx/signals';
import {
  MethodsDictionary,
  SignalStoreFeature,
  SignalStoreFeatureResult,
  StateSignals,
} from '@ngrx/signals/src/signal-store-models';
import { RequestMap } from '../factory-types';
import { AllNewMethods, withQueryMethods } from './withQueryMethods';
import { AllNewProperties, withQueriesState } from './withQueryState';

// The types below are useless as `AllNewMethods` and `AllNewProperties` inside them get evaluated to unknown
export interface QueriesFeatureResult<Queries extends RequestMap> {
  props: {};
  methods: MethodsDictionary & AllNewMethods<Queries>;
  state: {} & AllNewProperties<Queries>;
}

export type InnerStore<Input extends SignalStoreFeatureResult> = StateSignals<
  Input['state']
> &
  Input['props'] &
  Input['methods'] &
  WritableStateSource<Input['state']>;

export function withQueries<
  Input extends SignalStoreFeatureResult,
  Queries extends RequestMap,
>(
  queriesFactory: (store: InnerStore<Input>) => Queries,
): SignalStoreFeature<Input, QueriesFeatureResult<Queries>> {
  return ((store) => {
    const queries = queriesFactory({
      ...store.stateSignals,
      ...store.props,
      ...store.methods,
    } as InnerStore<Input>);

    const storeWithState = withQueriesState(queries)(store);
    return withQueryMethods(queries)(storeWithState);
  }) as SignalStoreFeature<Input, QueriesFeatureResult<Queries>>;
}
