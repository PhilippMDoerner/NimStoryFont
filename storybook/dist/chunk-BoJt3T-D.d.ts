import { Es as ServiceDefinition, Ms as ServiceRegistryApi, Xi as ServerCoreServices, Zi as TypedGetService, hs as Queries, js as ServiceRegistrationOptions, ks as ServiceInstance, us as Commands } from "./chunk-Cp-ouEY1.js";

//#region code/core/.dts-emit/code/core/src/shared/open-service/server.d.ts
declare const getService: TypedGetService<ServerCoreServices>;
/**
 * Registers a service on the dev server and returns its runtime surface.
 *
 * The server is a relay hub: when a channel is installed (the `services` preset does this on a real
 * websocket transport) it bridges every connected manager tab. Without a channel — static builds and
 * the index builder — the runtime stays local-only.
 */
declare function registerService<TState, TQueries extends Queries<TState>, TCommands extends Commands<TState>>(definition: ServiceDefinition<TState, TQueries, TCommands>, registration?: ServiceRegistrationOptions<TState, TQueries, TCommands>): ServiceInstance<TState, TQueries, TCommands> & ServiceRegistryApi;
//#endregion
export { registerService as n, getService as t };