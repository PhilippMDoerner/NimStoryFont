/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { BuilderContext } from '@angular-devkit/architect';
import type { ConfigOptions } from 'karma';
import type { NormalizedKarmaBuilderOptions } from './options';
export declare function getBaseKarmaOptions(options: NormalizedKarmaBuilderOptions, context: BuilderContext): ConfigOptions;
