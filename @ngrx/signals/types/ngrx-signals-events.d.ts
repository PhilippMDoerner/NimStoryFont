import { PartialStateUpdater, Prettify, SignalStoreFeatureResult, StateSignals, WritableStateSource, SignalStoreFeature, EmptyFeatureResult } from '@ngrx/signals';
import * as i0 from '@angular/core';
import { Type, Provider, Injector } from '@angular/core';
import { OperatorFunction, Observable } from 'rxjs';

type EventInstance<Type extends string, Payload> = {
    type: Type;
    payload: Payload;
};

type EventCreator<Type extends string, Payload> = ((payload: Payload) => EventInstance<Type, Payload>) & {
    type: Type;
};
declare function event<Type extends string>(type: Type): EventCreator<Type, void>;
declare function event<Type extends string, Payload>(type: Type, payload: Payload): EventCreator<Type, Payload>;

type CaseReducerResult<State extends object, EventCreators extends EventCreator<string, any>[]> = {
    reducer: CaseReducer<State, EventCreators>;
    events: EventCreators;
};
type CaseReducer<State extends object, EventCreators extends EventCreator<string, any>[]> = (event: {
    [K in keyof EventCreators]: ReturnType<EventCreators[K]>;
}[number], state: State) => Partial<State> | PartialStateUpdater<State> | Array<Partial<State> | PartialStateUpdater<State>>;
/**
 * @description
 *
 * Creates a case reducer that can be used with the `withReducer` feature.
 */
declare function on<State extends object, EventCreators extends EventCreator<string, any>[]>(...args: [
    ...events: [...EventCreators],
    reducer: CaseReducer<NoInfer<State>, NoInfer<EventCreators>>
]): CaseReducerResult<State, EventCreators>;

type EventScope = 'self' | 'parent' | 'global';
type EventScopeConfig = {
    scope: EventScope;
};
/**
 * @description
 *
 * Marks a single event to be dispatched in the specified scope.
 * Used in a tuple alongside an event to indicate its dispatch scope.
 *
 * @usageNotes
 *
 * ```ts
 * import { signalStore, type } from '@ngrx/signals';
 * import { event, Events, withEffects } from '@ngrx/signals/events';
 * import { mapResponse } from '@ngrx/operators';
 *
 * const opened = event('[Users Page] Opened');
 * const loadedSuccess = event('[Users API] Loaded Success', type<User[]>());
 * const loadedFailure = event('[Users API] Loaded Failure', type<string>());
 *
 * const UsersStore = signalStore(
 *   withEffects((
 *     _,
 *     events = inject(Events),
 *     usersService = inject(UsersService)
 *   ) => ({
 *     loadUsers$: events.on(opened).pipe(
 *       exhaustMap(() =>
 *         usersService.getAll().pipe(
 *           mapResponse({
 *             next: (users) => loadedSuccess(users),
 *             error: (error: { message: string }) => [
 *               loadedFailure(error.message),
 *               toScope('global'),
 *             ],
 *           }),
 *         ),
 *       ),
 *     ),
 *   })),
 * );
 * ```
 */
declare function toScope(scope: EventScope): EventScopeConfig;
/**
 * @description
 *
 * RxJS operator that maps all emitted events in the stream to be dispatched
 * in the specified scope.
 *
 * @usageNotes
 *
 * ```ts
 * import { signalStore, type } from '@ngrx/signals';
 * import { event, Events, withEffects } from '@ngrx/signals/events';
 * import { mapResponse } from '@ngrx/operators';
 *
 * const opened = event('[Users Page] Opened');
 * const loadedSuccess = event('[Users API] Loaded Success', type<User[]>());
 * const loadedFailure = event('[Users API] Loaded Failure', type<string>());
 *
 * const UsersStore = signalStore(
 *   withEffects((
 *     _,
 *     events = inject(Events),
 *     usersService = inject(UsersService)
 *   ) => ({
 *     loadUsers$: events.on(opened).pipe(
 *       exhaustMap(() =>
 *         usersService.getAll().pipe(
 *           mapResponse({
 *             next: (users) => loadedSuccess(users),
 *             error: (error: { message: string }) =>
 *               loadedFailure(error.message),
 *           }),
 *           mapToScope('parent'),
 *         ),
 *       ),
 *     ),
 *   })),
 * );
 * ```
 */
declare function mapToScope<T extends EventInstance<string, unknown>>(scope: EventScope): OperatorFunction<T, [T, EventScopeConfig]>;

declare abstract class BaseEvents {
    protected readonly events$: Observable<EventInstance<string, unknown>>;
    protected constructor(parentEventsToken: Type<BaseEvents>);
    on(): Observable<EventInstance<string, unknown>>;
    on<EventCreators extends EventCreator<string, any>[]>(...events: [...EventCreators]): Observable<{
        [K in keyof EventCreators]: ReturnType<EventCreators[K]>;
    }[number]>;
}
/**
 * @description
 *
 * Globally provided service for listening to dispatched events.
 *
 * @usageNotes
 *
 * ```ts
 * import { event, Events } from '@ngrx/signals/events';
 *
 * const increment = event('[Counter Page] Increment');
 *
 * \@Component(...)
 * class Counter {
 *   readonly #events = inject(Events);
 *
 *   constructor() {
 *     this.#events
 *       .on(increment)
 *       .pipe(takeUntilDestroyed())
 *       .subscribe(() => /* handle increment event *\/);
 *   }
 * }
 * ```
 */
declare class Events extends BaseEvents {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<Events, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Events>;
}
/**
 * @description
 *
 * Globally provided service for listening to dispatched events.
 * Receives events before the `Events` service and is primarily used for
 * handling state transitions.
 */
declare class ReducerEvents extends BaseEvents {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<ReducerEvents, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReducerEvents>;
}

/**
 * @description
 *
 * Globally provided service for dispatching events.
 *
 * @usageNotes
 *
 * ```ts
 * import { Dispatcher, event } from '@ngrx/signals/events';
 *
 * const increment = event('[Counter Page] Increment');
 *
 * \@Component(...)
 * class Counter {
 *   readonly #dispatcher = inject(Dispatcher);
 *
 *   increment(): void {
 *     this.#dispatcher.dispatch(increment());
 *   }
 * }
 * ```
 */
declare class Dispatcher {
    protected readonly reducerEvents: ReducerEvents;
    protected readonly events: Events;
    protected readonly parentDispatcher: Dispatcher | null;
    dispatch(event: EventInstance<string, unknown>, config?: EventScopeConfig): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Dispatcher, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Dispatcher>;
}
/**
 * @description
 *
 * Provides scoped instances of Dispatcher and Events services.
 * Enables event dispatching within a specific component or feature scope.
 *
 * @usageNotes
 *
 * ```ts
 * import { Dispatcher, event } from '@ngrx/signals/events';
 *
 * const increment = event('[Counter Page] Increment');
 *
 * \@Component({
 *   // ...
 *   providers: [provideDispatcher()],
 * })
 * class Counter {
 *   readonly #dispatcher = inject(Dispatcher);
 *
 *   increment(): void {
 *     // Dispatching an event to the local Dispatcher.
 *     this.#dispatcher.dispatch(increment());
 *
 *     // Dispatching an event to the parent Dispatcher.
 *     this.#dispatcher.dispatch(increment(), { scope: 'parent' });
 *
 *     // Dispatching an event to the global Dispatcher.
 *     this.#dispatcher.dispatch(increment(), { scope: 'global' });
 *   }
 * }
 * ```
 */
declare function provideDispatcher(): Provider[];

type EventType<Source extends string, EventName extends string> = `[${Source}] ${EventName}`;
type EventCreatorGroup<Source extends string, Events extends Record<string, any>> = {
    readonly [EventName in keyof Events]: EventName extends string ? EventCreator<EventType<Source, EventName>, Events[EventName]> : never;
};
/**
 * @description
 *
 * Creates a group of event creators.
 *
 * @usageNotes
 *
 * ```ts
 * import { type } from '@ngrx/signals';
 * import { eventGroup } from '@ngrx/signals/events';
 *
 * const counterPageEvents = eventGroup({
 *   source: 'Counter Page',
 *   events: {
 *     increment: type<void>(),
 *     decrement: type<void>(),
 *     set: type<number>(),
 *   },
 * });
 * ```
 */
declare function eventGroup<Source extends string, Events extends Record<string, unknown>>(config: {
    source: Source;
    events: Events;
}): Prettify<EventCreatorGroup<Source, Events>>;

type SelfDispatchingEvents<EventGroup extends Record<string, EventCreator<string, any>>> = {
    readonly [EventName in keyof EventGroup]: Parameters<EventGroup[EventName]> extends [infer Payload] ? (payload: Payload) => void : () => void;
};
/**
 * @description
 *
 * Creates self-dispatching events for a given event group.
 *
 * @usageNotes
 *
 * ```ts
 * import { type } from '@ngrx/signals';
 * import { eventGroup, injectDispatch } from '@ngrx/signals/events';
 *
 * const counterPageEvents = eventGroup({
 *   source: 'Counter Page',
 *   events: {
 *     increment: type<void>(),
 *     decrement: type<void>(),
 *   },
 * });
 *
 * \@Component(...)
 * class Counter {
 *   readonly dispatch = injectDispatch(counterPageEvents);
 *
 *   increment(): void {
 *     this.dispatch.increment();
 *   }
 *
 *   decrement(): void {
 *     this.dispatch.decrement();
 *   }
 * }
 * ```
 */
declare function injectDispatch<EventGroup extends Record<string, EventCreator<string, any>>>(events: EventGroup, config?: {
    injector?: Injector;
}): ((config: EventScopeConfig) => Prettify<SelfDispatchingEvents<EventGroup>>) & Prettify<SelfDispatchingEvents<EventGroup>>;

/**
 * @description
 *
 * SignalStore feature for defining event handlers.
 *
 * @usageNotes
 *
 * ```ts
 * import { signalStore, withState } from '@ngrx/signals';
 * import { event, Events, withEventHandlers } from '@ngrx/signals/events';
 *
 * const increment = event('[Counter Page] Increment');
 * const decrement = event('[Counter Page] Decrement');
 *
 * const CounterStore = signalStore(
 *   withState({ count: 0 }),
 *   withEventHandlers(({ count }, events = inject(Events)) => ({
 *     logCount$: events.on(increment, decrement).pipe(
 *       tap(({ type }) => console.log(type, count())),
 *     ),
 *   })),
 * );
 * ```
 */
declare function withEventHandlers<Input extends SignalStoreFeatureResult>(handlersFactory: (store: Prettify<StateSignals<Input['state']> & Input['props'] & Input['methods'] & WritableStateSource<Prettify<Input['state']>>>) => Record<string, Observable<unknown>> | Observable<unknown>[]): SignalStoreFeature<Input, EmptyFeatureResult>;

/**
 * @description
 *
 * SignalStore feature for defining state transitions based on dispatched events.
 *
 * @usageNotes
 *
 * ```ts
 * import { signalStore, type, withState } from '@ngrx/signals';
 * import { event, on, withReducer } from '@ngrx/signals/events';
 *
 * const set = event('[Counter Page] Set', type<number>());
 *
 * const CounterStore = signalStore(
 *   withState({ count: 0 }),
 *   withReducer(
 *     on(set, ({ payload }) => ({ count: payload })),
 *   ),
 * );
 * ```
 */
declare function withReducer<State extends object>(...caseReducers: CaseReducerResult<State, EventCreator<string, any>[]>[]): SignalStoreFeature<{
    state: State;
    props: {};
    methods: {};
}, EmptyFeatureResult>;

export { Dispatcher, Events, ReducerEvents, event, eventGroup, injectDispatch, mapToScope, on, provideDispatcher, toScope, withEventHandlers, withReducer };
export type { EventCreator, EventInstance, EventScope, EventScopeConfig };
