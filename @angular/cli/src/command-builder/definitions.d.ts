/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { logging } from '@angular-devkit/core';
import type { Argv, CamelCaseKey } from 'yargs';
import type { PackageManager } from '../package-managers/package-manager';
import { AngularWorkspace } from '../utilities/config';
export declare enum CommandScope {
    /** Command can only run inside an Angular workspace. */
    In = 0,
    /** Command can only run outside an Angular workspace. */
    Out = 1,
    /** Command can run inside and outside an Angular workspace. */
    Both = 2
}
export interface CommandContext {
    currentDirectory: string;
    root: string;
    workspace?: AngularWorkspace;
    globalConfiguration: AngularWorkspace;
    logger: logging.Logger;
    packageManager: PackageManager;
    yargsInstance: Argv<{}>;
    /** Arguments parsed in free-from without parser configuration. */
    args: {
        positional: string[];
        options: {
            help: boolean;
            jsonHelp: boolean;
            getYargsCompletions: boolean;
        } & Record<string, unknown>;
    };
}
export type Options<T> = {
    [key in keyof T as CamelCaseKey<key>]: T[key];
};
export type OtherOptions = Record<string, unknown>;
