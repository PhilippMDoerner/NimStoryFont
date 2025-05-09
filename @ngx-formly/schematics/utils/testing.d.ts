import { UnitTestTree, SchematicTestRunner } from '@angular-devkit/schematics/testing';
export declare function getTestProjectPath(workspaceOptions?: any, appOptions?: any): string;
export declare function createWorkspace(schematicRunner: SchematicTestRunner, appTree: UnitTestTree, workspaceOptions?: {
    name: string;
    newProjectRoot: string;
    version: string;
}, appOptions?: {
    name: string;
    inlineStyle: boolean;
    inlineTemplate: boolean;
    viewEncapsulation: string;
    routing: boolean;
    style: string;
    skipTests: boolean;
}): Promise<UnitTestTree>;
