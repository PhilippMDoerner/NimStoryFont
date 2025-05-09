import { WritableStateSource } from './state-source';
import { DeepSignal } from './deep-signal';
export type SignalState<State extends object> = DeepSignal<State> & WritableStateSource<State>;
export declare function signalState<State extends object>(initialState: State): SignalState<State>;
