import { SignalStoreFeature, SignalStoreFeatureResult, StateSignals } from './signal-store-models';
import { WritableStateSource } from './state-source';
import { Prettify } from './ts-helpers';
/**
 * @description
 * Allows passing properties, methods, or signals from a SignalStore
 * to a feature.
 *
 * @usageNotes
 * ```typescript
 * signalStore(
 *   withMethods((store) => ({
 *     load(id: number): Observable<Entity> {
 *       return of({ id, name: 'John' });
 *     },
 *   })),
 *   withFeature(
 *     // 👇 has full access to the store
 *     (store) => withEntityLoader((id) => firstValueFrom(store.load(id)))
 *   )
 * );
 * ```
 *
 * @param featureFactory function returning the actual feature
 */
export declare function withFeature<Input extends SignalStoreFeatureResult, Output extends SignalStoreFeatureResult>(featureFactory: (store: Prettify<StateSignals<Input['state']> & Input['props'] & Input['methods'] & WritableStateSource<Prettify<Input['state']>>>) => SignalStoreFeature<Input, Output>): SignalStoreFeature<Input, Output>;
