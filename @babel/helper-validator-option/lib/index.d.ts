declare class OptionValidator {
    descriptor: string;
    constructor(descriptor: string);
    /**
     * Validate if the given `options` follow the name of keys defined in the `TopLevelOptionShape`
     *
     * @param {Object} options
     * @param {Object} TopLevelOptionShape
     *   An object with all the valid key names that `options` should be allowed to have
     *   The property values of `TopLevelOptionShape` can be arbitrary
     * @memberof OptionValidator
     */
    validateTopLevelOptions(options: object, TopLevelOptionShape: object): void;
    validateBooleanOption<T extends boolean>(name: string, value?: boolean, defaultValue?: T): boolean | T;
    validateStringOption<T extends string>(name: string, value?: string, defaultValue?: T): string | T;
    /**
     * A helper interface copied from the `invariant` npm package.
     * It throws given `message` when `condition` is not met
     *
     * @param {boolean} condition
     * @param {string} message
     * @memberof OptionValidator
     */
    invariant(condition: boolean, message: string): void;
    formatMessage(message: string): string;
}

/**
 * Given a string `str` and an array of candidates `arr`,
 * return the first of elements in candidates that has minimal
 * Levenshtein distance with `str`.
 * @export
 * @param {string} str
 * @param {string[]} arr
 * @returns {string}
 */
declare function findSuggestion(str: string, arr: readonly string[]): string;

export { OptionValidator, findSuggestion };
