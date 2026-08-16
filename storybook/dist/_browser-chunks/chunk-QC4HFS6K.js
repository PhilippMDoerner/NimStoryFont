// src/shared/open-service/query-state.ts
function buildQueryState(data, lifecycle) {
  let isPending = lifecycle.status === "pending", isLoading = lifecycle.loadStatus === "loading";
  return {
    data,
    error: lifecycle.error,
    status: lifecycle.status,
    loadStatus: lifecycle.loadStatus,
    isPending,
    isSuccess: lifecycle.status === "success",
    isError: lifecycle.status === "error",
    isLoading,
    isInitialLoading: isPending && isLoading && data === void 0,
    isRefreshing: isLoading && !isPending
  };
}
function toError(value) {
  return value instanceof Error ? value : new Error(String(value));
}
function seedQueryState(query, input, selector) {
  try {
    let output = query.get(input);
    return buildQueryState(selector ? selector(output) : output, {
      status: "pending",
      error: void 0,
      loadStatus: "loading"
    });
  } catch (error) {
    return buildQueryState(void 0, {
      status: "error",
      error: toError(error),
      loadStatus: "idle"
    });
  }
}

export {
  buildQueryState,
  toError,
  seedQueryState
};
