import { WritableStateSource } from './state-source';
import { SignalStoreFeature, SignalStoreFeatureResult, StateSignals } from './signal-store-models';
import { Prettify } from './ts-helpers';
export declare function withProps<Input extends SignalStoreFeatureResult, Props extends object>(propsFactory: (store: Prettify<StateSignals<Input['state']> & Input['props'] & Input['methods'] & WritableStateSource<Prettify<Input['state']>>>) => Props): SignalStoreFeature<Input, {
    state: {};
    props: Props;
    methods: {};
}>;
