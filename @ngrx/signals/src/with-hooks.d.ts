import { WritableStateSource } from './state-source';
import { EmptyFeatureResult, SignalStoreFeature, SignalStoreFeatureResult, StateSignals } from './signal-store-models';
import { Prettify } from './ts-helpers';
type HookFn<Input extends SignalStoreFeatureResult> = (store: Prettify<StateSignals<Input['state']> & Input['props'] & Input['methods'] & WritableStateSource<Prettify<Input['state']>>>) => void;
type HooksFactory<Input extends SignalStoreFeatureResult> = (store: Prettify<StateSignals<Input['state']> & Input['props'] & Input['methods'] & WritableStateSource<Prettify<Input['state']>>>) => {
    onInit?: () => void;
    onDestroy?: () => void;
};
export declare function withHooks<Input extends SignalStoreFeatureResult>(hooks: {
    onInit?: HookFn<Input>;
    onDestroy?: HookFn<Input>;
}): SignalStoreFeature<Input, EmptyFeatureResult>;
export declare function withHooks<Input extends SignalStoreFeatureResult>(hooks: HooksFactory<Input>): SignalStoreFeature<Input, EmptyFeatureResult>;
export {};
