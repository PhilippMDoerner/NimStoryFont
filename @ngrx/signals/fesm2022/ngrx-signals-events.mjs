import * as i0 from '@angular/core';
import { Injectable, inject, assertInInjectionContext, Injector, untracked } from '@angular/core';
import { Subject, filter, map, tap, merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { signalStoreFeature, type, withHooks, getState, patchState } from '@ngrx/signals';

/**
 * @experimental
 * @description
 *
 * Creates a case reducer that can be used with the `withReducer` feature.
 */
function on(...args) {
    const reducer = args.pop();
    const events = args;
    return { reducer, events };
}

const EVENTS = Symbol();
const SOURCE_TYPE = Symbol();
class BaseEvents {
    /**
     * @internal
     */
    [EVENTS] = new Subject();
    on(...events) {
        return this[EVENTS].pipe(filterByType(events), withSourceType());
    }
}
/**
 * @experimental
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
 * \@Component({ \/* ... *\/ })
 * class Counter {
 *   readonly #events = inject(Events);
 *
 *   constructor() {
 *     this.#events
 *       .on(increment)
 *       .pipe(takeUntilDestroyed())
 *       .subscribe(() => \/* handle increment event *\/);
 *   }
 * }
 * ```
 */
class Events extends BaseEvents {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.3", ngImport: i0, type: Events, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.3", ngImport: i0, type: Events, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.3", ngImport: i0, type: Events, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
class ReducerEvents extends BaseEvents {
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.3", ngImport: i0, type: ReducerEvents, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.3", ngImport: i0, type: ReducerEvents, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.3", ngImport: i0, type: ReducerEvents, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
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
 * @experimental
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
 * \@Component({ \/* ... *\/ })
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
    dispatch(event) {
        this.reducerEvents[EVENTS].next(event);
        this.events[EVENTS].next(event);
    }
    /** @nocollapse */ static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.3", ngImport: i0, type: Dispatcher, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.3", ngImport: i0, type: Dispatcher, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.3", ngImport: i0, type: Dispatcher, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * @experimental
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
 * @experimental
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
 * @experimental
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
 * \@Component({ \/* ... *\/ })
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
    if (!config?.injector) {
        assertInInjectionContext(injectDispatch);
    }
    const injector = config?.injector ?? inject(Injector);
    const dispatcher = injector.get(Dispatcher);
    return Object.entries(events).reduce((acc, [eventName, eventCreator]) => ({
        ...acc,
        [eventName]: (payload) => untracked(() => dispatcher.dispatch(eventCreator(payload))),
    }), {});
}

function isEventInstance(value) {
    return typeof value === 'object' && value !== null && 'type' in value;
}

/**
 * @experimental
 * @description
 *
 * SignalStore feature for defining side effects.
 *
 * @usageNotes
 *
 * ```ts
 * import { signalStore, withState } from '@ngrx/signals';
 * import { event, Events, withEffects } from '@ngrx/signals/events';
 *
 * const increment = event('[Counter Page] Increment');
 * const decrement = event('[Counter Page] Decrement');
 *
 * const CounterStore = signalStore(
 *   withState({ count: 0 }),
 *   withEffects(({ count }, events = inject(Events)) => ({
 *     logCount$: events.on(increment, decrement).pipe(
 *       tap(({ type }) => console.log(type, count())),
 *     ),
 *   })),
 * );
 * ```
 */
function withEffects(effectsFactory) {
    return signalStoreFeature(type(), withHooks({
        onInit(store, dispatcher = inject(Dispatcher)) {
            const effectSources = effectsFactory(store);
            const effects = Object.values(effectSources).map((effectSource$) => effectSource$.pipe(tap((value) => {
                if (isEventInstance(value) && !(SOURCE_TYPE in value)) {
                    dispatcher.dispatch(value);
                }
            })));
            merge(...effects)
                .pipe(takeUntilDestroyed())
                .subscribe();
        },
    }));
}

/**
 * @experimental
 * @description
 *
 * SignalStore feature for defining state changes based on dispatched events.
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
    return signalStoreFeature({ state: type() }, withHooks({
        onInit(store, events = inject(ReducerEvents)) {
            const updates = caseReducers.map((caseReducer) => events.on(...caseReducer.events).pipe(tap((event) => {
                const state = untracked(() => getState(store));
                const result = caseReducer.reducer(event, state);
                const updaters = Array.isArray(result) ? result : [result];
                patchState(store, ...updaters);
            })));
            merge(...updates)
                .pipe(takeUntilDestroyed())
                .subscribe();
        },
    }));
}

/**
 * Generated bundle index. Do not edit.
 */

export { Dispatcher, Events, event, eventGroup, injectDispatch, on, withEffects, withReducer };
//# sourceMappingURL=ngrx-signals-events.mjs.map
