/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Cache, PersistentCacheStore } from './cache';
export declare class SqliteCacheStore implements PersistentCacheStore<unknown> {
    #private;
    readonly cachePath: string;
    private readonly maxPayloadSize;
    private readonly ttlDays;
    constructor(cachePath: string, maxPayloadSize?: number, ttlDays?: number);
    get(key: string): Promise<any>;
    has(key: string): boolean;
    set(key: string, value: unknown): Promise<this>;
    createCache<V = unknown>(namespace: string): Cache<V>;
    close(): void;
}
