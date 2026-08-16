/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Argv } from 'yargs';
import { CommandModule, CommandScope, Options } from '../../command-builder/command-module';
import { UpdatePlan } from './update-resolver';
interface UpdateCommandArgs {
    packages?: string[];
    force: boolean;
    next: boolean;
    'migrate-only'?: boolean;
    name?: string;
    from?: string;
    to?: string;
    'allow-dirty': boolean;
    verbose: boolean;
    'create-commits': boolean;
}
export default class UpdateCommandModule extends CommandModule<UpdateCommandArgs> {
    scope: CommandScope;
    protected shouldReportAnalytics: boolean;
    private readonly resolvePaths;
    command: string;
    describe: string;
    longDescriptionPath: string;
    builder(localYargs: Argv): Argv<UpdateCommandArgs>;
    run(options: Options<UpdateCommandArgs>): Promise<number | void>;
    private migrateOnly;
    private updatePackagesAndMigrate;
}
/**
 * Resolves migrations from installed package manifests on disk when they were omitted
 * from the initial update plan.
 *
 * This fallback is necessary because private package registries (such as GitHub Packages)
 * frequently strip custom non-npm metadata properties (like `ng-update`) from their remote
 * registry API responses. By inspecting `node_modules/<package>/package.json` after installation,
 * we ensure that any migration collections defined by the package are discovered and queued.
 */
export declare function resolveFallbackMigrations(workspaceRoot: string, plan: UpdatePlan): Promise<{
    package: string;
    collection: string;
    from: string;
    to: string;
}[]>;
export {};
