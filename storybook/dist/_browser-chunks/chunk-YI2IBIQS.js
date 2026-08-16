// src/shared/review/routes.ts
var REVIEW_COLLECTION_QUERY_PARAM = "collection", isReviewSummaryPath = (path) => path === "/review/" || path === "/review", isReviewCollectionStoryRoute = (path, customQueryParams) => !!path && path.startsWith("/story/") && customQueryParams?.[REVIEW_COLLECTION_QUERY_PARAM] !== void 0, isReviewManagerRoute = (path, customQueryParams) => !!path && (isReviewSummaryPath(path) || path.startsWith("/review/") || isReviewCollectionStoryRoute(path, customQueryParams));

export {
  isReviewSummaryPath,
  isReviewManagerRoute
};
