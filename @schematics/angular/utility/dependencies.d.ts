/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Rule, Tree } from '@angular-devkit/schematics';
import { TestRunner } from '../ng-new/schema';
export declare enum NodeDependencyType {
    Default = "dependencies",
    Dev = "devDependencies",
    Peer = "peerDependencies",
    Optional = "optionalDependencies"
}
export interface NodeDependency {
    type: NodeDependencyType;
    name: string;
    version: string;
    overwrite?: boolean;
}
export declare function addPackageJsonDependency(tree: Tree, dependency: NodeDependency, pkgJsonPath?: string): void;
export declare function removePackageJsonDependency(tree: Tree, name: string, pkgJsonPath?: string): void;
export declare function getPackageJsonDependency(tree: Tree, name: string, pkgJsonPath?: string): NodeDependency | null;
export declare function addTestRunnerDependencies(testRunner: TestRunner | undefined, skipInstall: boolean): Rule[];
