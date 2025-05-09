import { SignalsDictionary, SignalStoreFeature, SignalStoreFeatureResult, StateSignals } from './signal-store-models';
import { Prettify } from './ts-helpers';
export declare function withComputed<Input extends SignalStoreFeatureResult, ComputedSignals extends SignalsDictionary>(signalsFactory: (store: Prettify<StateSignals<Input['state']> & Input['props']>) => ComputedSignals): SignalStoreFeature<Input, {
    state: {};
    props: ComputedSignals;
    methods: {};
}>;
