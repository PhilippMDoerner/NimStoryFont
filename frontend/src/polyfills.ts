if (!document.startViewTransition) {
  document.startViewTransition = (
    cb?: ViewTransitionUpdateCallback,
  ): ViewTransition => {
    cb?.();
    return {
      finished: Promise.resolve(),
      ready: Promise.resolve(),
      skipTransition: () => {},
      types: {
        forEach: () => void 0,
      },
      updateCallbackDone: Promise.resolve(),
    };
  };
}
