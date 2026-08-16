import { computed } from '@angular/core';
import { signalStoreFeature, withState, withComputed } from '@ngrx/signals';

var DidMutate;
(function (DidMutate) {
    DidMutate[DidMutate["None"] = 0] = "None";
    DidMutate[DidMutate["Entities"] = 1] = "Entities";
    DidMutate[DidMutate["Both"] = 2] = "Both";
})(DidMutate || (DidMutate = {}));

const defaultSelectId = (entity) => entity.id;
function getEntityIdSelector(config) {
    return config?.selectId ?? defaultSelectId;
}
function getEntityStateKeys(config) {
    const collection = config?.collection;
    const entityMapKey = collection === undefined ? 'entityMap' : `${collection}EntityMap`;
    const idsKey = collection === undefined ? 'ids' : `${collection}Ids`;
    const entitiesKey = collection === undefined ? 'entities' : `${collection}Entities`;
    return { entityMapKey, idsKey, entitiesKey };
}
function cloneEntityState(state, stateKeys) {
    return {
        entityMap: { ...state[stateKeys.entityMapKey] },
        ids: [...state[stateKeys.idsKey]],
    };
}
function getEntityUpdaterResult(state, stateKeys, didMutate) {
    switch (didMutate) {
        case DidMutate.Both: {
            return {
                [stateKeys.entityMapKey]: state.entityMap,
                [stateKeys.idsKey]: state.ids,
            };
        }
        case DidMutate.Entities: {
            return { [stateKeys.entityMapKey]: state.entityMap };
        }
        default: {
            return {};
        }
    }
}
function addEntityMutably(state, entity, selectId, prepend = false) {
    const id = selectId(entity);
    if (state.entityMap[id]) {
        return DidMutate.None;
    }
    state.entityMap[id] = entity;
    if (prepend) {
        state.ids.unshift(id);
    }
    else {
        state.ids.push(id);
    }
    return DidMutate.Both;
}
function addEntitiesMutably(state, entities, selectId, prepend = false) {
    let didMutate = DidMutate.None;
    for (const entity of entities) {
        const result = addEntityMutably(state, entity, selectId, prepend);
        if (result === DidMutate.Both) {
            didMutate = result;
        }
    }
    return didMutate;
}
function setEntityMutably(state, entity, selectId, replace = true) {
    const id = selectId(entity);
    if (state.entityMap[id]) {
        state.entityMap[id] = replace
            ? entity
            : { ...state.entityMap[id], ...entity };
        return DidMutate.Entities;
    }
    state.entityMap[id] = entity;
    state.ids.push(id);
    return DidMutate.Both;
}
function setEntitiesMutably(state, entities, selectId, replace = true) {
    let didMutate = DidMutate.None;
    for (const entity of entities) {
        const result = setEntityMutably(state, entity, selectId, replace);
        if (didMutate === DidMutate.Both) {
            continue;
        }
        didMutate = result;
    }
    return didMutate;
}
function removeEntitiesMutably(state, idsOrPredicate) {
    const ids = Array.isArray(idsOrPredicate)
        ? idsOrPredicate
        : state.ids.filter((id) => idsOrPredicate(state.entityMap[id]));
    let didMutate = DidMutate.None;
    for (const id of ids) {
        if (state.entityMap[id]) {
            delete state.entityMap[id];
            didMutate = DidMutate.Both;
        }
    }
    if (didMutate === DidMutate.Both) {
        state.ids = state.ids.filter((id) => id in state.entityMap);
    }
    return didMutate;
}
function updateEntitiesMutably(state, idsOrPredicate, changes, selectId) {
    const ids = Array.isArray(idsOrPredicate)
        ? idsOrPredicate
        : state.ids.filter((id) => idsOrPredicate(state.entityMap[id]));
    let newIds = undefined;
    let didMutate = DidMutate.None;
    for (const id of ids) {
        const entity = state.entityMap[id];
        if (entity) {
            const changesRecord = typeof changes === 'function' ? changes(entity) : changes;
            state.entityMap[id] = { ...entity, ...changesRecord };
            didMutate = DidMutate.Entities;
            const newId = selectId(state.entityMap[id]);
            if (newId !== id) {
                state.entityMap[newId] = state.entityMap[id];
                delete state.entityMap[id];
                newIds = newIds || {};
                newIds[id] = newId;
            }
        }
    }
    if (newIds) {
        state.ids = state.ids.map((id) => newIds[id] ?? id);
        didMutate = DidMutate.Both;
    }
    if (typeof ngDevMode !== 'undefined' &&
        ngDevMode &&
        state.ids.length !== Object.keys(state.entityMap).length) {
        console.warn('@ngrx/signals/entities: Entities with IDs:', ids, 'are not updated correctly.', 'Make sure to apply valid changes when using `updateEntity`,', '`updateEntities`, and `updateAllEntities` updaters.');
    }
    return didMutate;
}

/**
 * @description
 *
 * Adds an entity to the collection.
 * Does not override if entity with same ID exists.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState } from '@ngrx/signals';
 * import { addEntity } from '@ngrx/signals/entities';
 *
 * patchState(store, addEntity(todo));
 * ```
 */
function addEntity(entity, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = addEntityMutably(clonedState, entity, selectId);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

/**
 * @description
 *
 * Adds multiple entities to the collection.
 * Does not override existing entities with same IDs.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState } from '@ngrx/signals';
 * import { addEntities } from '@ngrx/signals/entities';
 *
 * patchState(store, addEntities([todo1, todo2]));
 * ```
 */
function addEntities(entities, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = addEntitiesMutably(clonedState, entities, selectId);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

/**
 * @description
 *
 * Adds an entity to the beginning of the collection.
 * Does not add if entity with same ID exists.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState } from '@ngrx/signals';
 * import { prependEntity } from '@ngrx/signals/entities';
 *
 * patchState(store, prependEntity(todo));
 * ```
 */
function prependEntity(entity, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = addEntityMutably(clonedState, entity, selectId, true);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

/**
 * @description
 *
 * Adds multiple entities to the beginning of the collection.
 * Does not add existing entities with same IDs.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState } from '@ngrx/signals';
 * import { prependEntities } from '@ngrx/signals/entities';
 *
 * patchState(store, prependEntities([todo1, todo2]));
 * ```
 */
function prependEntities(entities, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const uniqueEntities = [];
        const seenIds = new Set();
        for (const entity of entities) {
            const id = selectId(entity);
            if (!seenIds.has(id)) {
                uniqueEntities.unshift(entity);
                seenIds.add(id);
            }
        }
        const didMutate = addEntitiesMutably(clonedState, uniqueEntities, selectId, true);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

/**
 * @description
 *
 * Removes an entity from the collection by ID.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState } from '@ngrx/signals';
 * import { removeEntity } from '@ngrx/signals/entities';
 *
 * patchState(store, removeEntity(1));
 * ```
 */
function removeEntity(id, config) {
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = removeEntitiesMutably(clonedState, [id]);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

/**
 * @description
 *
 * Removes multiple entities from the collection by IDs or predicate.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState } from '@ngrx/signals';
 * import { removeEntities } from '@ngrx/signals/entities';
 *
 * // Remove by IDs
 * patchState(store, removeEntities([1, 2, 3]));
 *
 * // Remove by predicate
 * patchState(store, removeEntities((todo) => todo.completed));
 * ```
 */
function removeEntities(idsOrPredicate, config) {
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = removeEntitiesMutably(clonedState, idsOrPredicate);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

/**
 * @description
 *
 * Removes all entities from the collection.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState } from '@ngrx/signals';
 * import { removeAllEntities } from '@ngrx/signals/entities';
 *
 * patchState(store, removeAllEntities());
 * ```
 */
function removeAllEntities(config) {
    const stateKeys = getEntityStateKeys(config);
    return () => ({
        [stateKeys.entityMapKey]: {},
        [stateKeys.idsKey]: [],
    });
}

/**
 * @description
 *
 * Adds or replaces an entity in the collection.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState } from '@ngrx/signals';
 * import { setEntity } from '@ngrx/signals/entities';
 *
 * patchState(store, setEntity(todo));
 * ```
 */
function setEntity(entity, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = setEntityMutably(clonedState, entity, selectId);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

/**
 * @description
 *
 * Adds or replaces multiple entities in the collection.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState } from '@ngrx/signals';
 * import { setEntities } from '@ngrx/signals/entities';
 *
 * patchState(store, setEntities([todo1, todo2]));
 * ```
 */
function setEntities(entities, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = setEntitiesMutably(clonedState, entities, selectId);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

/**
 * @description
 *
 * Replaces the entire entity collection with the provided entities.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState } from '@ngrx/signals';
 * import { setAllEntities } from '@ngrx/signals/entities';
 *
 * patchState(store, setAllEntities([todo1, todo2, todo3]));
 * ```
 */
function setAllEntities(entities, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return () => {
        const state = { entityMap: {}, ids: [] };
        setEntitiesMutably(state, entities, selectId);
        return {
            [stateKeys.entityMapKey]: state.entityMap,
            [stateKeys.idsKey]: state.ids,
        };
    };
}

/**
 * @description
 *
 * Updates an entity in the collection by ID. Supports partial updates.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState } from '@ngrx/signals';
 * import { updateEntity } from '@ngrx/signals/entities';
 *
 * patchState(store, updateEntity({ id: 1, changes: { completed: true } }));
 * ```
 */
function updateEntity(update, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = updateEntitiesMutably(clonedState, [update.id], update.changes, selectId);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

/**
 * @description
 *
 * Updates multiple entities in the collection by IDs or predicate.
 * Supports partial updates.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState } from '@ngrx/signals';
 * import { updateEntities } from '@ngrx/signals/entities';
 *
 * // Update by IDs
 * patchState(
 *   store,
 *   updateEntities({ ids: [1, 2], changes: { completed: true } })
 * );
 *
 * // Update by predicate
 * patchState(
 *   store,
 *   updateEntities({
 *     predicate: (todo) => !todo.completed,
 *     changes: { text: '' },
 *   })
 * );
 * ```
 */
function updateEntities(update, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    const idsOrPredicate = 'ids' in update ? update.ids : update.predicate;
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = updateEntitiesMutably(clonedState, idsOrPredicate, update.changes, selectId);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

/**
 * @description
 *
 * Updates all entities in the collection. Supports partial updates.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState } from '@ngrx/signals';
 * import { updateAllEntities } from '@ngrx/signals/entities';
 *
 * patchState(store, updateAllEntities({ completed: false }));
 * ```
 */
function updateAllEntities(changes, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = updateEntitiesMutably(clonedState, state[stateKeys.idsKey], changes, selectId);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

/**
 * @description
 *
 * Adds or updates an entity in the collection.
 * When updating, merges with existing entity.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState } from '@ngrx/signals';
 * import { upsertEntity } from '@ngrx/signals/entities';
 *
 * patchState(store, upsertEntity(todo));
 * ```
 */
function upsertEntity(entity, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = setEntityMutably(clonedState, entity, selectId, false);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

/**
 * @description
 *
 * Adds or updates multiple entities in the collection.
 * When updating, merges with existing entities.
 *
 * @usageNotes
 *
 * ```ts
 * import { patchState } from '@ngrx/signals';
 * import { upsertEntities } from '@ngrx/signals/entities';
 *
 * patchState(store, upsertEntities([todo1, todo2]));
 * ```
 */
function upsertEntities(entities, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = setEntitiesMutably(clonedState, entities, selectId, false);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

/**
 * @description
 *
 * Creates a custom entity configuration and ensures strong typing.
 * Allows defining named entity collections and a custom id selector.
 *
 * @usageNotes
 *
 * ```ts
 * import { signalStore, type, withMethods } from '@ngrx/signals';
 * import { addEntity, entityConfig, withEntities } from '@ngrx/signals/entities';
 *
 * type Todo = { key: number; text: string };
 *
 * const todoConfig = entityConfig({
 *   entity: type<Todo>(),
 *   collection: 'todo',
 *   selectId: (todo) => todo.key,
 * });
 *
 * export const TodosStore = signalStore(
 *   // 👇 Adds `todoEntityMap`, `todoIds`, and `todoEntities` signals to the store.
 *   withEntities(todoConfig),
 *   withMethods((store) => ({
 *     addTodo(todo: Todo): void {
 *       patchState(store, addEntity(todo, todoConfig));
 *     },
 *   }))
 * );
 * ```
 */
function entityConfig(config) {
    return config;
}

/**
 * @description
 *
 * Provides entity management capabilities to the SignalStore.
 * Adds `entityMap`, `ids`, and `entities` signals to the store.
 *
 * @usageNotes
 *
 * ```ts
 * import { signalStore } from '@ngrx/signals';
 * import { withEntities } from '@ngrx/signals/entities';
 *
 * type Todo = { id: number; text: string; completed: boolean };
 *
 * export const TodosStore = signalStore(withEntities<Todo>());
 * ```
 */
function withEntities(config) {
    const { entityMapKey, idsKey, entitiesKey } = getEntityStateKeys(config);
    return signalStoreFeature(withState({
        [entityMapKey]: {},
        [idsKey]: [],
    }), withComputed((store) => ({
        [entitiesKey]: computed(() => {
            const entityMap = store[entityMapKey]();
            const ids = store[idsKey]();
            return ids.map((id) => entityMap[id]);
        }),
    })));
}

/**
 * Generated bundle index. Do not edit.
 */

export { addEntities, addEntity, entityConfig, prependEntities, prependEntity, removeAllEntities, removeEntities, removeEntity, setAllEntities, setEntities, setEntity, updateAllEntities, updateEntities, updateEntity, upsertEntities, upsertEntity, withEntities };
//# sourceMappingURL=ngrx-signals-entities.mjs.map
