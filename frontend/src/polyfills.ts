if (!document.startViewTransition) {
  document.startViewTransition = (
    cb?: ViewTransitionUpdateCallback,
  ): ViewTransition => {
    cb?.();
    return {
      finished: Promise.resolve(),
      ready: Promise.resolve(),
      skipTransition: () => {},
      types: new Set<string>(),
      updateCallbackDone: Promise.resolve(),
    };
  };
}
