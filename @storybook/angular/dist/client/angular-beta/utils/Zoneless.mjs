export const getProvideZonelessChangeDetectionFn = async () => {
    const angularCore = await import('@angular/core');
    return 'provideExperimentalZonelessChangeDetection' in angularCore
        ? angularCore.provideExperimentalZonelessChangeDetection
        : 'provideZonelessChangeDetection' in angularCore
            ? angularCore.provideZonelessChangeDetection
            : null;
};
