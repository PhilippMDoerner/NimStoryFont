/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Rule } from '@angular-devkit/schematics';
import { FileConfigurationHandlerOptions } from './types';
/**
 * Create or update a JSON MCP configuration file to include the Angular MCP server.
 */
export declare function addJsonMcpConfig({ tree, fileInfo }: FileConfigurationHandlerOptions, mcpServersProperty: string): Rule;
/**
 * Create or update a TOML MCP configuration file to include the Angular MCP server.
 */
export declare function addTomlMcpConfig({ tree, context, fileInfo, tool, }: FileConfigurationHandlerOptions): Rule;
/**
 * Create an Angular best practices Markdown.
 * If the file exists, the configuration is skipped.
 */
export declare function addBestPracticesMarkdown({ tree, context, fileInfo, tool, }: FileConfigurationHandlerOptions): Rule;
