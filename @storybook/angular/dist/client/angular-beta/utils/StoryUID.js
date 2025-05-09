"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearStoryUIDs = exports.getNextStoryUID = void 0;
/** Count of stories for each storyId. */
const storyCounts = new Map();
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
const getNextStoryUID = (storyId) => {
    if (!storyCounts.has(storyId)) {
        storyCounts.set(storyId, -1);
    }
    const count = storyCounts.get(storyId) + 1;
    storyCounts.set(storyId, count);
    return `${storyId}-${count}`;
};
exports.getNextStoryUID = getNextStoryUID;
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
const clearStoryUIDs = (onlyStoryId) => {
    if (onlyStoryId !== undefined && onlyStoryId !== null) {
        storyCounts.delete(onlyStoryId);
    }
    else {
        storyCounts.clear();
    }
};
exports.clearStoryUIDs = clearStoryUIDs;
