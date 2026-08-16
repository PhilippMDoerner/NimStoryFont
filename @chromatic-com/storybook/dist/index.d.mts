import * as storybook_internal_csf from 'storybook/internal/csf';

declare global {
    var CONFIG_TYPE: string;
    var LOGLEVEL: string;
}
/**
 * A mode is a combination of globals that determine the appearance of a UI. Modes are used by
 * Chromatic to capture multiple snapshots of a story with different global configurations.
 *
 * @see https://www.chromatic.com/docs/modes/
 */
interface ChromaticMode {
    /** Disable this mode */
    disable?: boolean;
    [key: string]: unknown;
}
interface ChromaticParameters {
    /**
     * Chromatic configuration
     *
     * @see https://www.chromatic.com/docs/configure/
     */
    chromatic?: {
        /** Remove the addon panel and disable the addon's behavior */
        disable?: boolean;
        /**
         * Disable snapshot capturing for this story
         * @see https://www.chromatic.com/docs/disable-snapshots/
         */
        disableSnapshot?: boolean;
        /**
         * Threshold before a snapshot is considered visually different, between 0 and 1 where 0 is
         * most accurate and 1 is least accurate.
         *
         * @default 0.063
         * @see https://www.chromatic.com/docs/threshold/
         */
        diffThreshold?: number;
        /**
         * If true, disables detecting and ignoring anti-aliased pixels.
         *
         * @default false
         * @see https://www.chromatic.com/docs/threshold/
         */
        diffIncludeAntiAliasing?: boolean;
        /**
         * Delay in milliseconds before taking the snapshot.
         *
         * @see https://www.chromatic.com/docs/delay/
         */
        delay?: number;
        /**
         * Crop snapshots to the viewport size.
         *
         * @see https://www.chromatic.com/docs/modes/viewports/#how-does-snapshot-cropping-work-with-viewport-width-and-height
         */
        cropToViewport?: boolean;
        /**
         * Set the `forced-colors` media feature when capturing the story. Use `"active"` to enable
         * forced colors mode, or `"none"` to disable it.
         *
         * @see https://www.chromatic.com/docs/media-features/
         */
        forcedColors?: 'none' | 'active';
        /**
         * Set the media used when capturing the story. Use `"print"` to test print styles.
         *
         * @see https://www.chromatic.com/docs/media-features/
         */
        media?: 'print';
        /**
         * CSS selectors for elements that should be ignored when diffing snapshots. Matching elements
         * will be painted over with a neutral color before comparison.
         *
         * @see https://www.chromatic.com/docs/ignoring-elements/
         */
        ignoreSelectors?: string[];
        /**
         * Reverse CSS animations so snapshots show the end state.
         *
         * @see https://www.chromatic.com/docs/animations/
         */
        pauseAnimationAtEnd?: boolean;
        /**
         * Set the `prefers-reduced-motion` media feature when capturing the story. Use `"reduce"` to
         * enable reduced motion, or `"no-preference"` for default behavior.
         *
         * @see https://www.chromatic.com/docs/media-features/
         */
        prefersReducedMotion?: 'reduce' | 'no-preference';
        /**
         * Modes for testing different global configurations such as themes, viewports, and locales.
         * Each mode is a combination of globals applied to the story for capturing a separate snapshot.
         *
         * @see https://www.chromatic.com/docs/modes/
         */
        modes?: Record<string, ChromaticMode>;
        /**
         * Legacy API for setting viewport widths (in pixels) for a story. Use `modes` instead.
         *
         * @deprecated Use `modes` instead.
         * @see https://www.chromatic.com/docs/modes/viewports/
         */
        viewports?: number[];
    };
}
interface ChromaticGlobals {
    ignoredRegions?: boolean;
}
interface ChromaticTypes {
    parameters: ChromaticParameters;
    globals: ChromaticGlobals;
}

declare const _default: () => storybook_internal_csf.PreviewAddon<ChromaticTypes>;

export { type ChromaticTypes, _default as default };
