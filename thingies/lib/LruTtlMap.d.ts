import { LruMap } from './LruMap';
/**
 * An {@link LruMap} where each entry additionally carries an absolute expiry
 * deadline, in the same units as the `now` timestamps supplied to reads
 * (milliseconds since the Unix epoch, by default).
 */
export declare class LruTtlMap<K, V> extends LruMap<K, V> {
    private readonly expiry;
    clear(): void;
    delete(key: K): boolean;
    /**
     * @param now Current time, defaults to `Date.now()`. Entries with a deadline
     *     strictly below it are treated as missing and are removed.
     */
    has(key: K, now?: number): boolean;
    /**
     * @param now Current time, defaults to `Date.now()`. Entries with a deadline
     *     strictly below it are treated as missing and are removed.
     */
    get(key: K, now?: number): V | undefined;
    /**
     * @param expiry Absolute deadline after which the entry expires, defaults to
     *     `Infinity` (never expires). For a relative TTL use `Date.now() + ttl`.
     */
    set(key: K, value: V, expiry?: number): this;
}
