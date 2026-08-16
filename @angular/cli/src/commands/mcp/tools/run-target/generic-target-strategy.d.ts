/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { McpToolContext } from '../tool-registry';
import type { TargetStrategy } from './strategy';
import type { RunTargetOutput, StrategyExecutionContext } from './types';
export declare class GenericTargetStrategy implements TargetStrategy {
    canHandle(targetName: string, builder?: string): boolean;
    execute(input: StrategyExecutionContext, context: McpToolContext): Promise<RunTargetOutput>;
}
