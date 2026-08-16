import { PartialStateUpdater, SignalStoreFeature, EmptyFeatureResult } from '@ngrx/signals';
import { Signal } from '@angular/core';

type EntityId = string | number;
type EntityMap<Entity> = Record<EntityId, Entity>;
type EntityState<Entity> = {
    entityMap: EntityMap<Entity>;
    ids: EntityId[];
};
type NamedEntityState<Entity, Collection extends string> = {
    [K in keyof EntityState<Entity> as `${Collection}${Capitalize<K>}`]: EntityState<Entity>[K];
};
type EntityProps<Entity> = {
    entities: Signal<Entity[]>;
};
type NamedEntityProps<Entity, Collection extends string> = {
    [K in keyof EntityProps<Entity> as `${Collection}${Capitalize<K>}`]: EntityProps<Entity>[K];
};
type SelectEntityId<Entity> = (entity: Entity) => EntityId;
type EntityPredicate<Entity> = (entity: Entity) => boolean;
type EntityChanges<Entity> = Partial<Entity> | ((entity: Entity) => Partial<Entity>);

declare function addEntity<Entity extends {
    id: EntityId;
}>(entity: Entity): PartialStateUpdater<EntityState<Entity>>;
declare function addEntity<Entity, Collection extends string>(entity: Entity, config: {
    collection: Collection;
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function addEntity<Entity extends {
    id: EntityId;
}, Collection extends string>(entity: Entity, config: {
    collection: Collection;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function addEntity<Entity>(entity: Entity, config: {
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<EntityState<Entity>>;

declare function addEntities<Entity extends {
    id: EntityId;
}>(entities: Entity[]): PartialStateUpdater<EntityState<Entity>>;
declare function addEntities<Entity, Collection extends string>(entities: Entity[], config: {
    collection: Collection;
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function addEntities<Entity extends {
    id: EntityId;
}, Collection extends string>(entities: Entity[], config: {
    collection: Collection;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function addEntities<Entity>(entities: Entity[], config: {
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<EntityState<Entity>>;

declare function prependEntity<Entity extends {
    id: EntityId;
}>(entity: Entity): PartialStateUpdater<EntityState<Entity>>;
declare function prependEntity<Entity, Collection extends string>(entity: Entity, config: {
    collection: Collection;
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function prependEntity<Entity extends {
    id: EntityId;
}, Collection extends string>(entity: Entity, config: {
    collection: Collection;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function prependEntity<Entity>(entity: Entity, config: {
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<EntityState<Entity>>;

declare function prependEntities<Entity extends {
    id: EntityId;
}>(entities: Entity[]): PartialStateUpdater<EntityState<Entity>>;
declare function prependEntities<Entity, Collection extends string>(entities: Entity[], config: {
    collection: Collection;
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function prependEntities<Entity extends {
    id: EntityId;
}, Collection extends string>(entities: Entity[], config: {
    collection: Collection;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function prependEntities<Entity>(entities: Entity[], config: {
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<EntityState<Entity>>;

declare function removeEntity(id: EntityId): PartialStateUpdater<EntityState<any>>;
declare function removeEntity<Collection extends string>(id: EntityId, config: {
    collection: Collection;
}): PartialStateUpdater<NamedEntityState<any, Collection>>;

declare function removeEntities(ids: EntityId[]): PartialStateUpdater<EntityState<any>>;
declare function removeEntities<Entity>(predicate: EntityPredicate<Entity>): PartialStateUpdater<EntityState<Entity>>;
declare function removeEntities<Collection extends string>(ids: EntityId[], config: {
    collection: Collection;
}): PartialStateUpdater<NamedEntityState<any, Collection>>;
declare function removeEntities<Collection extends string, State extends NamedEntityState<any, Collection>, Entity = State extends NamedEntityState<infer E, Collection> ? E : never>(predicate: EntityPredicate<Entity>, config: {
    collection: Collection;
}): PartialStateUpdater<State>;

declare function removeAllEntities(): PartialStateUpdater<EntityState<any>>;
declare function removeAllEntities<Collection extends string>(config: {
    collection: Collection;
}): PartialStateUpdater<NamedEntityState<any, Collection>>;

declare function setEntity<Entity extends {
    id: EntityId;
}>(entity: Entity): PartialStateUpdater<EntityState<Entity>>;
declare function setEntity<Entity, Collection extends string>(entity: Entity, config: {
    collection: Collection;
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function setEntity<Entity extends {
    id: EntityId;
}, Collection extends string>(entity: Entity, config: {
    collection: Collection;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function setEntity<Entity>(entity: Entity, config: {
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<EntityState<Entity>>;

declare function setEntities<Entity extends {
    id: EntityId;
}>(entities: Entity[]): PartialStateUpdater<EntityState<Entity>>;
declare function setEntities<Entity, Collection extends string>(entities: Entity[], config: {
    collection: Collection;
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function setEntities<Entity extends {
    id: EntityId;
}, Collection extends string>(entities: Entity[], config: {
    collection: Collection;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function setEntities<Entity>(entities: Entity[], config: {
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<EntityState<Entity>>;

declare function setAllEntities<Entity extends {
    id: EntityId;
}>(entities: Entity[]): PartialStateUpdater<EntityState<Entity>>;
declare function setAllEntities<Entity, Collection extends string>(entities: Entity[], config: {
    collection: Collection;
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function setAllEntities<Entity extends {
    id: EntityId;
}, Collection extends string>(entities: Entity[], config: {
    collection: Collection;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function setAllEntities<Entity>(entities: Entity[], config: {
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<EntityState<Entity>>;

declare function updateEntity<Collection extends string, State extends NamedEntityState<any, Collection>, Entity = State extends NamedEntityState<infer E, Collection> ? E : never>(update: {
    id: EntityId;
    changes: EntityChanges<NoInfer<Entity>>;
}, config: {
    collection: Collection;
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<State>;
declare function updateEntity<Collection extends string, State extends NamedEntityState<any, Collection>, Entity = State extends NamedEntityState<infer E extends {
    id: EntityId;
}, Collection> ? E : never>(update: {
    id: EntityId;
    changes: EntityChanges<NoInfer<Entity>>;
}, config: {
    collection: Collection;
}): PartialStateUpdater<State>;
declare function updateEntity<Entity>(update: {
    id: EntityId;
    changes: EntityChanges<NoInfer<Entity>>;
}, config: {
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<EntityState<Entity>>;
declare function updateEntity<Entity extends {
    id: EntityId;
}>(update: {
    id: EntityId;
    changes: EntityChanges<NoInfer<Entity>>;
}): PartialStateUpdater<EntityState<Entity>>;

declare function updateEntities<Collection extends string, State extends NamedEntityState<any, Collection>, Entity = State extends NamedEntityState<infer E, Collection> ? E : never>(update: {
    ids: EntityId[];
    changes: EntityChanges<NoInfer<Entity>>;
}, config: {
    collection: Collection;
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<State>;
declare function updateEntities<Collection extends string, State extends NamedEntityState<any, Collection>, Entity = State extends NamedEntityState<infer E, Collection> ? E : never>(update: {
    predicate: EntityPredicate<Entity>;
    changes: EntityChanges<NoInfer<Entity>>;
}, config: {
    collection: Collection;
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<State>;
declare function updateEntities<Collection extends string, State extends NamedEntityState<any, Collection>, Entity = State extends NamedEntityState<infer E extends {
    id: EntityId;
}, Collection> ? E : never>(update: {
    ids: EntityId[];
    changes: EntityChanges<NoInfer<Entity>>;
}, config: {
    collection: Collection;
}): PartialStateUpdater<State>;
declare function updateEntities<Collection extends string, State extends NamedEntityState<any, Collection>, Entity = State extends NamedEntityState<infer E extends {
    id: EntityId;
}, Collection> ? E : never>(update: {
    predicate: EntityPredicate<Entity>;
    changes: EntityChanges<NoInfer<Entity>>;
}, config: {
    collection: Collection;
}): PartialStateUpdater<State>;
declare function updateEntities<Entity>(update: {
    ids: EntityId[];
    changes: EntityChanges<NoInfer<Entity>>;
}, config: {
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<EntityState<Entity>>;
declare function updateEntities<Entity>(update: {
    predicate: EntityPredicate<Entity>;
    changes: EntityChanges<NoInfer<Entity>>;
}, config: {
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<EntityState<Entity>>;
declare function updateEntities<Entity extends {
    id: EntityId;
}>(update: {
    ids: EntityId[];
    changes: EntityChanges<NoInfer<Entity>>;
}): PartialStateUpdater<EntityState<Entity>>;
declare function updateEntities<Entity extends {
    id: EntityId;
}>(update: {
    predicate: EntityPredicate<Entity>;
    changes: EntityChanges<NoInfer<Entity>>;
}): PartialStateUpdater<EntityState<Entity>>;

declare function updateAllEntities<Collection extends string, State extends NamedEntityState<any, Collection>, Entity = State extends NamedEntityState<infer E, Collection> ? E : never>(changes: EntityChanges<NoInfer<Entity>>, config: {
    collection: Collection;
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<State>;
declare function updateAllEntities<Collection extends string, State extends NamedEntityState<any, Collection>, Entity = State extends NamedEntityState<infer E extends {
    id: EntityId;
}, Collection> ? E : never>(changes: EntityChanges<NoInfer<Entity>>, config: {
    collection: Collection;
}): PartialStateUpdater<State>;
declare function updateAllEntities<Entity>(changes: EntityChanges<NoInfer<Entity>>, config: {
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<EntityState<Entity>>;
declare function updateAllEntities<Entity extends {
    id: EntityId;
}>(changes: EntityChanges<NoInfer<Entity>>): PartialStateUpdater<EntityState<Entity>>;

declare function upsertEntity<Entity extends {
    id: EntityId;
}>(entity: Entity): PartialStateUpdater<EntityState<Entity>>;
declare function upsertEntity<Entity, Collection extends string>(entity: Entity, config: {
    collection: Collection;
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function upsertEntity<Entity extends {
    id: EntityId;
}, Collection extends string>(entity: Entity, config: {
    collection: Collection;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function upsertEntity<Entity>(entity: Entity, config: {
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<EntityState<Entity>>;

declare function upsertEntities<Entity extends {
    id: EntityId;
}>(entities: Entity[]): PartialStateUpdater<EntityState<Entity>>;
declare function upsertEntities<Entity, Collection extends string>(entities: Entity[], config: {
    collection: Collection;
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function upsertEntities<Entity extends {
    id: EntityId;
}, Collection extends string>(entities: Entity[], config: {
    collection: Collection;
}): PartialStateUpdater<NamedEntityState<Entity, Collection>>;
declare function upsertEntities<Entity>(entities: Entity[], config: {
    selectId: SelectEntityId<NoInfer<Entity>>;
}): PartialStateUpdater<EntityState<Entity>>;

declare function entityConfig<Entity, Collection extends string>(config: {
    entity: Entity;
    collection: Collection;
    selectId: SelectEntityId<NoInfer<Entity>>;
}): typeof config;
declare function entityConfig<Entity>(config: {
    entity: Entity;
    selectId: SelectEntityId<NoInfer<Entity>>;
}): typeof config;
declare function entityConfig<Entity, Collection extends string>(config: {
    entity: Entity;
    collection: Collection;
}): typeof config;
declare function entityConfig<Entity>(config: {
    entity: Entity;
}): typeof config;

declare function withEntities<Entity>(): SignalStoreFeature<EmptyFeatureResult, {
    state: EntityState<Entity>;
    props: EntityProps<Entity>;
    methods: {};
}>;
declare function withEntities<Entity, Collection extends string>(config: {
    entity: Entity;
    collection: Collection;
}): SignalStoreFeature<EmptyFeatureResult, {
    state: NamedEntityState<Entity, Collection>;
    props: NamedEntityProps<Entity, Collection>;
    methods: {};
}>;
declare function withEntities<Entity>(config: {
    entity: Entity;
}): SignalStoreFeature<EmptyFeatureResult, {
    state: EntityState<Entity>;
    props: EntityProps<Entity>;
    methods: {};
}>;

export { addEntities, addEntity, entityConfig, prependEntities, prependEntity, removeAllEntities, removeEntities, removeEntity, setAllEntities, setEntities, setEntity, updateAllEntities, updateEntities, updateEntity, upsertEntities, upsertEntity, withEntities };
export type { EntityChanges, EntityId, EntityMap, EntityProps, EntityState, NamedEntityProps, NamedEntityState, SelectEntityId };
