/**
 * This plugin is designed to modify the Webpack configuration for Storybook projects that use
 * Angular, specifically to prevent multiple runtime bundle issues by merging 'main' and 'styles'
 * entry points. It ensures that only one runtime bundle is generated to avoid
 * '**webpack_require**.nmd is not a function' errors.
 */
export default class StorybookNormalizeAngularEntryPlugin {
    constructor(options: any);
    options: any;
    apply(compiler: any): void;
    compilation: any;
}
