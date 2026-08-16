/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { ApplicationBuilderInternalOptions } from '../../../application/options';
import { NormalizedUnitTestBuilderOptions } from '../../options';
import { RunnerOptions } from '../api';
/**
 * Generates options and virtual files for the Vitest test runner.
 *
 * Discovers specs matchers, creates entry points, decides polyfills strategy, and orchestrates
 * internal ApplicationBuilder options.
 *
 * @param options The normalized unit test builder options.
 * @param baseBuildOptions The base build config to derive testing config from.
 * @returns An async RunnerOptions configuration.
 */
export declare function getVitestBuildOptions(options: NormalizedUnitTestBuilderOptions, baseBuildOptions: Partial<ApplicationBuilderInternalOptions>): Promise<RunnerOptions>;
