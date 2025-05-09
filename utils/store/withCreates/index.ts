import { WritableStateSource } from '@ngrx/signals';
import {
  MethodsDictionary,
  SignalStoreFeature,
  SignalStoreFeatureResult,
  StateSignals,
} from '@ngrx/signals/src/signal-store-models';
import { RequestMap } from '../factory-types';
import { AllNewMethods, withCreateMethods } from './withCreateMethods';
import { AllNewProperties, withCreateState } from './withCreateState';

export interface CreateFeatureResult<Requests extends RequestMap> {
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
): SignalStoreFeature<Input, CreateFeatureResult<Requests>> {
  return ((store) => {
    const creates = createsFactory({
      ...store.stateSignals,
      ...store.props,
      ...store.methods,
    } as InnerStore<Input>);

    const storeWithstate = withCreateState(creates)(store);
    return withCreateMethods(creates)(storeWithstate);
  }) as SignalStoreFeature<Input, CreateFeatureResult<Requests>>;
}
