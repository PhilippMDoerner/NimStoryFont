"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqliteCacheStore = void 0;
const node_sqlite_1 = require("node:sqlite");
const cache_1 = require("./cache");
class SqliteCacheStore {
    cachePath;
    maxPayloadSize;
    ttlDays;
    #db;
    #getStmt;
    #hasStmt;
    #setStmt;
    #updateAccessedStmt;
    constructor(cachePath, maxPayloadSize = 1024 * 1024 * 1024, ttlDays = 14) {
        this.cachePath = cachePath;
        this.maxPayloadSize = maxPayloadSize;
        this.ttlDays = ttlDays;
    }
    #ensureDb() {
        if (!this.#db) {
            this.#db = new node_sqlite_1.DatabaseSync(this.cachePath);
            // Optimize SQLite for cache usage
            this.#db.exec('PRAGMA auto_vacuum = FULL;');
            this.#db.exec('PRAGMA journal_mode = WAL;');
            this.#db.exec('PRAGMA synchronous = NORMAL;');
            this.#db.exec('CREATE TABLE IF NOT EXISTS cache (key TEXT PRIMARY KEY, value TEXT, last_accessed INTEGER NOT NULL) WITHOUT ROWID;');
            this.#getStmt = this.#db.prepare('SELECT value FROM cache WHERE key = ?');
            this.#hasStmt = this.#db.prepare('SELECT 1 FROM cache WHERE key = ?');
            this.#setStmt = this.#db.prepare('INSERT OR REPLACE INTO cache (key, value, last_accessed) VALUES (?, ?, unixepoch())');
            this.#updateAccessedStmt = this.#db.prepare('UPDATE cache SET last_accessed = unixepoch() WHERE key = ?');
        }
        return this.#db;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async get(key) {
        this.#ensureDb();
        const row = this.#getStmt?.get(key);
        if (row) {
            this.#updateAccessedStmt?.run(key);
            try {
                return JSON.parse(row.value);
            }
            catch {
                return undefined;
            }
        }
        return undefined;
    }
    has(key) {
        this.#ensureDb();
        return !!this.#hasStmt?.get(key);
    }
    async set(key, value) {
        this.#ensureDb();
        this.#setStmt?.run(key, JSON.stringify(value));
        return this;
    }
    createCache(namespace) {
        return new cache_1.Cache(this, namespace);
    }
    close() {
        if (this.#db) {
            try {
                // 1. Delete items older than N days
                this.#db
                    .prepare("DELETE FROM cache WHERE last_accessed < unixepoch('now', ?);")
                    .run(`-${this.ttlDays} days`);
                // 2. Prune oldest items if payload exceeds maxPayloadSize
                const pruneStmt = this.#db.prepare(`
          DELETE FROM cache WHERE key IN (
            SELECT key FROM (
              SELECT key, 
                     sum(length(key) + length(value)) OVER (ORDER BY last_accessed DESC, key DESC) as running_size
              FROM cache
            ) WHERE running_size > ?
          );
        `);
                pruneStmt.run(this.maxPayloadSize);
            }
            catch {
                // Pruning errors should not block build success
            }
            finally {
                this.#getStmt = undefined;
                this.#hasStmt = undefined;
                this.#setStmt = undefined;
                this.#updateAccessedStmt = undefined;
                this.#db.close();
                this.#db = undefined;
            }
        }
    }
}
exports.SqliteCacheStore = SqliteCacheStore;
//# sourceMappingURL=sqlite-cache-store.js.map