/**
 * Increments the count for a storyId and returns the next UID.
 *
 * When a story is bootstrapped, the storyId is used as the element tag. That becomes an issue when
 * a story is rendered multiple times in the same docs page. This function returns a UID that is
 * appended to the storyId to make it unique.
 *
 * @param storyId Id of a story
 * @returns Uid of a story
 */
export declare const getNextStoryUID: (storyId: string) => string;
/**
 * Clears the storyId counts.
 *
 * Can be useful for testing, where you need predictable increments, without reloading the global
 * state.
 *
 * If onlyStoryId is provided, only that storyId is cleared.
 *
 * @param onlyStoryId Id of a story
 */
export declare const clearStoryUIDs: (onlyStoryId?: string) => void;
