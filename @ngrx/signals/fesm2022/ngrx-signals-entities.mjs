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
function addEntityMutably(state, entity, selectId) {
    const id = selectId(entity);
    if (state.entityMap[id]) {
        return DidMutate.None;
    }
    state.entityMap[id] = entity;
    state.ids.push(id);
    return DidMutate.Both;
}
function addEntitiesMutably(state, entities, selectId) {
    let didMutate = DidMutate.None;
    for (const entity of entities) {
        const result = addEntityMutably(state, entity, selectId);
        if (result === DidMutate.Both) {
            didMutate = result;
        }
    }
    return didMutate;
}
function setEntityMutably(state, entity, selectId) {
    const id = selectId(entity);
    if (state.entityMap[id]) {
        state.entityMap[id] = entity;
        return DidMutate.Entities;
    }
    state.entityMap[id] = entity;
    state.ids.push(id);
    return DidMutate.Both;
}
function setEntitiesMutably(state, entities, selectId) {
    let didMutate = DidMutate.None;
    for (const entity of entities) {
        const result = setEntityMutably(state, entity, selectId);
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
    if (ngDevMode && state.ids.length !== Object.keys(state.entityMap).length) {
        console.warn('@ngrx/signals/entities: Entities with IDs:', ids, 'are not updated correctly.', 'Make sure to apply valid changes when using `updateEntity`,', '`updateEntities`, and `updateAllEntities` updaters.');
    }
    return didMutate;
}

function addEntity(entity, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = addEntityMutably(clonedState, entity, selectId);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

function addEntities(entities, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = addEntitiesMutably(clonedState, entities, selectId);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

function removeEntity(id, config) {
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = removeEntitiesMutably(clonedState, [id]);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

function removeEntities(idsOrPredicate, config) {
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = removeEntitiesMutably(clonedState, idsOrPredicate);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

function removeAllEntities(config) {
    const stateKeys = getEntityStateKeys(config);
    return () => ({
        [stateKeys.entityMapKey]: {},
        [stateKeys.idsKey]: [],
    });
}

function setEntity(entity, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = setEntityMutably(clonedState, entity, selectId);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

function setEntities(entities, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = setEntitiesMutably(clonedState, entities, selectId);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

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

function updateEntity(update, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = updateEntitiesMutably(clonedState, [update.id], update.changes, selectId);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

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

function updateAllEntities(changes, config) {
    const selectId = getEntityIdSelector(config);
    const stateKeys = getEntityStateKeys(config);
    return (state) => {
        const clonedState = cloneEntityState(state, stateKeys);
        const didMutate = updateEntitiesMutably(clonedState, state[stateKeys.idsKey], changes, selectId);
        return getEntityUpdaterResult(clonedState, stateKeys, didMutate);
    };
}

function entityConfig(config) {
    return config;
}

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

export { addEntities, addEntity, entityConfig, removeAllEntities, removeEntities, removeEntity, setAllEntities, setEntities, setEntity, updateAllEntities, updateEntities, updateEntity, withEntities };
//# sourceMappingURL=ngrx-signals-entities.mjs.map
