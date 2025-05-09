import { Configuration } from 'webpack';
import { PresetOptions } from './preset-options';
/**
 * Run ngcc for converting modules to ivy format before starting storybook This step is needed in
 * order to support Ivy in storybook
 *
 * Information about Ivy can be found here https://angular.io/guide/ivy
 */
export declare const runNgcc: () => Promise<void>;
export declare const webpack: (webpackConfig: Configuration, options: PresetOptions) => Promise<Configuration>;
