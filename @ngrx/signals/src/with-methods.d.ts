import { WritableStateSource } from './state-source';
import { MethodsDictionary, SignalStoreFeature, SignalStoreFeatureResult, StateSignals } from './signal-store-models';
import { Prettify } from './ts-helpers';
export declare function withMethods<Input extends SignalStoreFeatureResult, Methods extends MethodsDictionary>(methodsFactory: (store: Prettify<StateSignals<Input['state']> & Input['props'] & Input['methods'] & WritableStateSource<Prettify<Input['state']>>>) => Methods): SignalStoreFeature<Input, {
    state: {};
    props: {};
    methods: Methods;
}>;
