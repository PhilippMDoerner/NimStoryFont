import { WritableStateSource } from '@ngrx/signals';
import {
  MethodsDictionary,
  SignalStoreFeature,
  SignalStoreFeatureResult,
  StateSignals,
} from '@ngrx/signals/src/signal-store-models';
import { RequestMap } from '../factory-types';
import { AllNewMethods, withUpdateMethods } from './withUpdateMethods';
import { AllNewProperties, withUpdateState } from './withUpdateState';

export interface UpdateFeatureResult<Requests extends RequestMap> {
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

export function withUpdates<
  Input extends SignalStoreFeatureResult,
  Requests extends RequestMap,
>(
  updatesFactory: (store: InnerStore<Input>) => Requests,
): SignalStoreFeature<Input, UpdateFeatureResult<Requests>> {
  return ((store) => {
    const updates = updatesFactory({
      ...store.stateSignals,
      ...store.props,
      ...store.methods,
    } as InnerStore<Input>);

    const storeWithstate = withUpdateState(updates)(store);
    return withUpdateMethods(updates)(storeWithstate);
  }) as SignalStoreFeature<Input, UpdateFeatureResult<Requests>>;
}
