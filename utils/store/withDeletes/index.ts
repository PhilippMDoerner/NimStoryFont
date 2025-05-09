import { WritableStateSource } from '@ngrx/signals';
import {
  MethodsDictionary,
  SignalStoreFeature,
  SignalStoreFeatureResult,
  StateSignals,
} from '@ngrx/signals/src/signal-store-models';
import { RequestMap } from '../factory-types';
import { AllNewMethods, withDeleteMethods } from './withDeleteMethods';
import { AllNewProperties, withCreateState } from './withDeleteState';

export interface DeleteFeatureResult<Requests extends RequestMap> {
  props: {};
  methods: MethodsDictionary & AllNewMethods<Requests>;
  state: {} & AllNewProperties<Requests>;
}

export type InnerStore<Input extends SignalStoreFeatureResult> = StateSignals<
  Input['state']
> &
  Input['props'] &
  Input['methods'] &
  WritableStateSource<Input['state']>;

export function withCreates<
  Input extends SignalStoreFeatureResult,
  Requests extends RequestMap,
>(
  createsFactory: (store: InnerStore<Input>) => Requests,
): SignalStoreFeature<Input, DeleteFeatureResult<Requests>> {
  return ((store) => {
    const deletes = createsFactory({
      ...store.stateSignals,
      ...store.props,
      ...store.methods,
    } as InnerStore<Input>);

    const storeWithstate = withCreateState(deletes)(store);
    return withDeleteMethods(deletes)(storeWithstate);
  }) as SignalStoreFeature<Input, DeleteFeatureResult<Requests>>;
}
