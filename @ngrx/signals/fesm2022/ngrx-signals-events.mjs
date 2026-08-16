import * as i0 from '@angular/core';
import { inject, Injectable, assertInInjectionContext, Injector, untracked } from '@angular/core';
import { Subject, merge, filter, map, queueScheduler, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { signalStoreFeature, type, withHooks, getState, patchState } from '@ngrx/signals';

/**
 * @description
 *
 * Creates a case reducer that can be used with the `withReducer` feature.
 */
function on(...args) {
    const reducer = args.pop();
    const events = args;
    return { reducer, events };
}

const EVENTS = Symbol(typeof ngDevMode !== 'undefined' && ngDevMode ? 'EVENTS' : '');
const SOURCE_TYPE = Symbol(typeof ngDevMode !== 'undefined' && ngDevMode ? 'SOURCE_TYPE' : '');
class BaseEvents {
    /**
     * @internal
     */
    [EVENTS] = new Subject();
    events$;
    constructor(parentEventsToken) {
        const parentEvents = inject(parentEventsToken, {
            skipSelf: true,
            optional: true,
        });
        this.events$ = parentEvents
            ? merge(parentEvents.events$, this[EVENTS])
            : this[EVENTS].asObservable();
    }
    on(...events) {
        return this.events$.pipe(filterByType(events), withSourceType());
    }
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
class Events extends BaseEvents {
    constructor() {
        super(Events);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.1", ngImport: i0, type: Events, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.0.1", ngImport: i0, type: Events, providedIn: 'platform' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.0.1", ngImport: i0, type: Events, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'platform' }]
        }], ctorParameters: () => [] });
/**
 * @description
 *
 * Globally provided service for listening to dispatched events.
 * Receives events before the `Events` service and is primarily used for
 * handling state transitions.
 */
class ReducerEvents extends BaseEvents {
    constructor() {
        super(ReducerEvents);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.1", ngImport: i0, type: ReducerEvents, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.0.1", ngImport: i0, type: ReducerEvents, providedIn: 'platform' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.0.1", ngImport: i0, type: ReducerEvents, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'platform' }]
        }], ctorParameters: () => [] });
function filterByType(events) {
    if (events.length === 0) {
        return (source$) => source$;
    }
    const eventMap = toEventCreatorMap(events);
    return filter(({ type }) => !!eventMap[type]);
}
function toEventCreatorMap(events) {
    return events.reduce((acc, event) => ({ ...acc, [event.type]: event }), {});
}
function withSourceType() {
    return map(({ ...event }) => {
        Object.defineProperty(event, SOURCE_TYPE, { value: event.type });
        return event;
    });
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
class Dispatcher {
    reducerEvents = inject(ReducerEvents);
    events = inject(Events);
    parentDispatcher = inject(Dispatcher, {
        skipSelf: true,
        optional: true,
    });
    dispatch(event, config) {
        if (this.parentDispatcher && hasParentOrGlobalScope(config)) {
            this.parentDispatcher.dispatch(event, config.scope === 'global' ? config : undefined);
        }
        else {
            this.reducerEvents[EVENTS].next(event);
            queueScheduler.schedule(() => this.events[EVENTS].next(event));
        }
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.1", ngImport: i0, type: Dispatcher, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.0.1", ngImport: i0, type: Dispatcher, providedIn: 'platform' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.0.1", ngImport: i0, type: Dispatcher, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'platform' }]
        }] });
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
function provideDispatcher() {
    return [Events, ReducerEvents, Dispatcher];
}
function hasParentOrGlobalScope(config) {
    return config?.scope === 'parent' || config?.scope === 'global';
}

/**
 * @description
 *
 * Creates an event creator.
 *
 * @usageNotes
 *
 * ### Creating an event creator without payload
 *
 * ```ts
 * import { event } from '@ngrx/signals/events';
 *
 * const increment = event('[Counter Page] Increment');
 * ```
 *
 * ### Creating an event creator with payload
 *
 * ```ts
 * import { type } from '@ngrx/signals';
 * import { event } from '@ngrx/signals/events';
 *
 * const set = event('[Counter Page] Set', type<number>());
 * ```
 */
function event(type) {
    const creator = (payload) => ({ type, payload });
    creator.type = type;
    return creator;
}

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
function eventGroup(config) {
    return Object.entries(config.events).reduce((acc, [eventName]) => {
        const eventType = `[${config.source}] ${eventName}`;
        return { ...acc, [eventName]: event(eventType) };
    }, {});
}

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
function toScope(scope) {
    return { scope };
}
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
function mapToScope(scope) {
    return map((event) => [event, toScope(scope)]);
}

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
function injectDispatch(events, config) {
    if (typeof ngDevMode !== 'undefined' && ngDevMode && !config?.injector) {
        assertInInjectionContext(injectDispatch);
    }
    const injector = config?.injector ?? inject(Injector);
    const dispatcher = injector.get(Dispatcher);
    const eventsCache = {};
    const dispatch = (config) => {
        if (!eventsCache[config.scope]) {
            eventsCache[config.scope] = Object.entries(events).reduce((acc, [eventName, eventCreator]) => ({
                ...acc,
                [eventName]: (payload) => untracked(() => dispatcher.dispatch(eventCreator(payload), config)),
            }), {});
        }
        return eventsCache[config.scope];
    };
    const defaultEventGroup = dispatch({ scope: 'self' });
    const defaultEventGroupProps = Object.keys(defaultEventGroup).reduce((acc, eventName) => ({
        ...acc,
        [eventName]: {
            value: defaultEventGroup[eventName],
            enumerable: true,
        },
    }), {});
    Object.defineProperties(dispatch, defaultEventGroupProps);
    return dispatch;
}

function isEventInstance(value) {
    return typeof value === 'object' && value !== null && 'type' in value;
}

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
function withEventHandlers(handlersFactory) {
    return signalStoreFeature(type(), withHooks({
        onInit(store, dispatcher = inject(Dispatcher)) {
            const handlerSources = handlersFactory(store);
            const handlers = Object.values(handlerSources).map((handlerSource$) => handlerSource$.pipe(tap((result) => {
                const [potentialEvent, config] = Array.isArray(result)
                    ? result
                    : [result];
                if (isEventInstance(potentialEvent) &&
                    !(SOURCE_TYPE in potentialEvent)) {
                    dispatcher.dispatch(potentialEvent, config);
                }
            })));
            merge(...handlers)
                .pipe(takeUntilDestroyed())
                .subscribe();
        },
    }));
}

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
function withReducer(...caseReducers) {
    return signalStoreFeature({ state: type() }, withEventHandlers((store, events = inject(ReducerEvents)) => caseReducers.map((caseReducer) => events.on(...caseReducer.events).pipe(tap((event) => {
        const state = untracked(() => getState(store));
        const result = caseReducer.reducer(event, state);
        const updaters = Array.isArray(result) ? result : [result];
        patchState(store, ...updaters);
    })))));
}

/**
 * Generated bundle index. Do not edit.
 */

export { Dispatcher, Events, ReducerEvents, event, eventGroup, injectDispatch, mapToScope, on, provideDispatcher, toScope, withEventHandlers, withReducer };
//# sourceMappingURL=ngrx-signals-events.mjs.map
