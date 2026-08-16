// src/shared/open-service/services/story-docs/snippet.ts
function prependImportToSnippet(importBlock, snippet) {
  let trimmedImport = importBlock?.trim();
  return trimmedImport ? `${trimmedImport}

${snippet}` : snippet;
}
function selectStoryDoc(payload, storyId) {
  return payload?.stories[storyId];
}
function selectSnippetForStory(payload, storyId) {
  let story = payload?.stories[storyId];
  if (story?.snippet !== void 0)
    return prependImportToSnippet(payload?.import, story.snippet);
}

export {
  prependImportToSnippet,
  selectStoryDoc,
  selectSnippetForStory
};
