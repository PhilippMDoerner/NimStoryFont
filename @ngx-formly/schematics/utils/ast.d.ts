/**
 * https://github.com/angular/components/tree/main/src/cdk/schematics
 */
import { Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';
import { Schema as ComponentOptions } from '@schematics/angular/component/schema';
import { Path } from '@angular-devkit/core';
import { JsonValue } from '@angular-devkit/core';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';
/** Reads file given path and returns TypeScript source file. */
export declare function parseSourceFile(host: Tree, path: string): ts.SourceFile;
/** Import and add module to root app module. */
export declare function addModuleImportToRootModule(host: Tree, moduleName: string, src: string, project: ProjectDefinition): void;
/** Gets the app index.html file */
export declare function getIndexHtmlPath(host: Tree, project: WorkspaceProject): string;
/** Get the root stylesheet file. */
export declare function getStylesPath(host: Tree, project: WorkspaceProject): string;
/** Wraps the internal find module from options with undefined path handling  */
export declare function findModuleFromOptions(host: Tree, options: ComponentOptions): Promise<string | undefined>;
export declare function getProjectMainFile(project: ProjectDefinition): Path;
export declare function getProjectTargetOptions(project: ProjectDefinition, buildTarget: string): Record<string, JsonValue | undefined>;
