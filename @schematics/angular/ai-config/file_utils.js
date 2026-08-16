"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addJsonMcpConfig = addJsonMcpConfig;
exports.addTomlMcpConfig = addTomlMcpConfig;
exports.addBestPracticesMarkdown = addBestPracticesMarkdown;
const schematics_1 = require("@angular-devkit/schematics");
const jsonc_parser_1 = require("jsonc-parser");
const json_file_1 = require("../utility/json-file");
const TOML_MCP_SERVERS_PROP = '[mcp_servers.angular-cli]';
/**
 * Create or update a JSON MCP configuration file to include the Angular MCP server.
 */
function addJsonMcpConfig({ tree, fileInfo }, mcpServersProperty) {
    const { name, directory } = fileInfo;
    return (0, schematics_1.mergeWith)((0, schematics_1.apply)((0, schematics_1.url)('./files'), [
        (0, schematics_1.filter)((path) => path.includes('__jsonConfigName__')),
        (0, schematics_1.applyTemplates)({
            ...schematics_1.strings,
            jsonConfigName: name,
            mcpServersProperty,
        }),
        (0, schematics_1.move)(directory),
        (0, schematics_1.forEach)((file) => {
            if (!tree.exists(file.path)) {
                return file;
            }
            // If we have an existing file, update the server property with
            // Angular MCP server configuration.
            const existingConfig = new json_file_1.JSONFile(tree, file.path);
            const existingMcpServers = existingConfig.get([mcpServersProperty]) ?? {};
            const templateServersProp = (0, jsonc_parser_1.parse)(file.content.toString())[mcpServersProperty];
            existingConfig.modify([mcpServersProperty], {
                ...existingMcpServers,
                ...templateServersProp,
            });
            return null;
        }),
    ]));
}
/**
 * Create or update a TOML MCP configuration file to include the Angular MCP server.
 */
function addTomlMcpConfig({ tree, context, fileInfo, tool, }) {
    const { name, directory } = fileInfo;
    return (0, schematics_1.mergeWith)((0, schematics_1.apply)((0, schematics_1.url)('./files'), [
        (0, schematics_1.filter)((path) => path.includes('__tomlConfigName__')),
        (0, schematics_1.applyTemplates)({
            ...schematics_1.strings,
            tomlConfigName: name,
        }),
        (0, schematics_1.move)(directory),
        (0, schematics_1.forEach)((file) => {
            if (!tree.exists(file.path)) {
                return file;
            }
            const existingFileBuffer = tree.read(file.path);
            if (existingFileBuffer) {
                let existing = existingFileBuffer.toString();
                if (existing.includes(TOML_MCP_SERVERS_PROP)) {
                    const path = `${directory}/${name}`;
                    const toolName = schematics_1.strings.classify(tool);
                    context.logger.warn(`Skipping Angular MCP server configuration for '${toolName}'.\n` +
                        `Configuration already exists in '${path}'.\n`);
                    return null;
                }
                // Add the configuration at the end of the file.
                const template = file.content.toString();
                existing = existing.length ? existing + '\n\n' + template : template;
                tree.overwrite(file.path, existing);
                return null;
            }
            return file;
        }),
    ]));
}
/**
 * Create an Angular best practices Markdown.
 * If the file exists, the configuration is skipped.
 */
function addBestPracticesMarkdown({ tree, context, fileInfo, tool, }) {
    const { name, directory } = fileInfo;
    const path = `${directory}/${name}`;
    if (tree.exists(path)) {
        const toolName = schematics_1.strings.classify(tool);
        context.logger.warn(`Skipping configuration file for '${toolName}' at '${path}' because it already exists.\n` +
            'This is to prevent overwriting a potentially customized file. ' +
            'If you want to regenerate it with Angular recommended defaults, please delete the existing file and re-run the command.\n' +
            'You can review the latest recommendations at https://angular.dev/ai/develop-with-ai.\n');
        return (0, schematics_1.noop)();
    }
    return (0, schematics_1.mergeWith)((0, schematics_1.apply)((0, schematics_1.url)('./files'), [
        (0, schematics_1.filter)((path) => path.includes('__bestPracticesName__')),
        (0, schematics_1.applyTemplates)({
            ...schematics_1.strings,
            bestPracticesName: name,
        }),
        (0, schematics_1.move)(directory),
    ]));
}
//# sourceMappingURL=file_utils.js.map