import * as core_dist_types from 'storybook/internal/types';
import { Selector, SelectorList, RunOptions, Spec } from 'axe-core';

declare const PARAM_KEY = "a11y";

type SelectorWithoutNode = Omit<Selector, 'Node'> | Omit<SelectorList, 'NodeList'>;
type ContextObjectWithoutNode = {
    include: SelectorWithoutNode;
    exclude?: SelectorWithoutNode;
} | {
    exclude: SelectorWithoutNode;
    include?: SelectorWithoutNode;
};
type ContextSpecWithoutNode = SelectorWithoutNode | ContextObjectWithoutNode;
type A11yTest = 'off' | 'todo' | 'error';
interface A11yParameters$1 {
    /**
     * Context parameter for axe-core's run function, except without support for passing Nodes and
     * NodeLists directly.
     *
     * @see https://github.com/dequelabs/axe-core/blob/develop/doc/context.md
     */
    context?: ContextSpecWithoutNode;
    /**
     * Options for running axe-core.
     *
     * @see https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter
     */
    options?: RunOptions;
    /**
     * Configuration object for axe-core.
     *
     * @see https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#api-name-axeconfigure
     */
    config?: Spec;
    /** Whether to disable accessibility tests. */
    disable?: boolean;
    /** Defines how accessibility violations should be handled: 'off', 'todo', or 'error'. */
    test?: A11yTest;
}

interface A11yParameters {
    /**
     * Accessibility configuration
     *
     * @see https://storybook.js.org/docs/writing-tests/accessibility-testing
     */
    a11y?: A11yParameters$1;
}

declare const _default: () => core_dist_types.ProjectAnnotations<core_dist_types.Renderer>;

export { A11yParameters, ContextObjectWithoutNode, ContextSpecWithoutNode, PARAM_KEY, SelectorWithoutNode, _default as default };
