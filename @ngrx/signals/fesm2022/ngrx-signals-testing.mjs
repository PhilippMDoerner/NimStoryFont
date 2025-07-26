import { isWritableStateSource } from '@ngrx/signals';

function unprotected(source) {
    if (isWritableStateSource(source)) {
        return source;
    }
    throw new Error('@ngrx/signals: The provided source is not writable.');
}

/**
 * Generated bundle index. Do not edit.
 */

export { unprotected };
//# sourceMappingURL=ngrx-signals-testing.mjs.map
