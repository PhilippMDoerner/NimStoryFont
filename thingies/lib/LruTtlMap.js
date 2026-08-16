"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LruTtlMap = void 0;
const LruMap_1 = require("./LruMap");
/**
 * An {@link LruMap} where each entry additionally carries an absolute expiry
 * deadline, in the same units as the `now` timestamps supplied to reads
 * (milliseconds since the Unix epoch, by default).
 */
class LruTtlMap extends LruMap_1.LruMap {
    constructor() {
        super(...arguments);
        this.expiry = new Map();
    }
    clear() {
        this.expiry.clear();
        super.clear();
    }
    delete(key) {
        this.expiry.delete(key);
        return super.delete(key);
    }
    /**
     * @param now Current time, defaults to `Date.now()`. Entries with a deadline
     *     strictly below it are treated as missing and are removed.
     */
    has(key, now = Date.now()) {
        if (!super.has(key))
            return false;
        const expiry = this.expiry.get(key) || 0;
        const expired = now > expiry;
        if (expired)
            this.delete(key);
        return !expired;
    }
    /**
     * @param now Current time, defaults to `Date.now()`. Entries with a deadline
     *     strictly below it are treated as missing and are removed.
     */
    get(key, now) {
        if (!this.has(key, now))
            return undefined;
        const value = super.get(key);
        super.set(key, value);
        return value;
    }
    /**
     * @param expiry Absolute deadline after which the entry expires, defaults to
     *     `Infinity` (never expires). For a relative TTL use `Date.now() + ttl`.
     */
    set(key, value, expiry = Infinity) {
        this.expiry.set(key, expiry);
        super.set(key, value);
        return this;
    }
}
exports.LruTtlMap = LruTtlMap;
