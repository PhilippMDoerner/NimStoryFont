"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const schematics_1 = require("@angular-devkit/schematics");
const file_utils_1 = require("./file_utils");
const schema_1 = require("./schema");
const types_1 = require("./types");
const AGENTS_MD_CFG = {
    type: types_1.ContextFileType.BestPracticesMd,
    name: 'AGENTS.md',
    directory: '.',
};
const AI_TOOLS = {
    ['claude-code']: [
        AGENTS_MD_CFG,
        {
            type: types_1.ContextFileType.McpConfig,
            name: '.mcp.json',
            directory: '.',
        },
    ],
    cursor: [
        AGENTS_MD_CFG,
        {
            type: types_1.ContextFileType.McpConfig,
            name: 'mcp.json',
            directory: '.cursor',
        },
    ],
    ['gemini-cli']: [
        {
            type: types_1.ContextFileType.BestPracticesMd,
            name: 'GEMINI.md',
            directory: '.gemini',
        },
        {
            type: types_1.ContextFileType.McpConfig,
            name: 'settings.json',
            directory: '.gemini',
        },
    ],
    ['open-ai-codex']: [
        AGENTS_MD_CFG,
        {
            type: types_1.ContextFileType.McpConfig,
            name: 'config.toml',
            directory: '.codex',
        },
    ],
    vscode: [
        AGENTS_MD_CFG,
        {
            type: types_1.ContextFileType.McpConfig,
            name: 'mcp.json',
            directory: '.vscode',
        },
    ],
};
function default_1({ tool }) {
    return (tree, context) => {
        if (!tool) {
            return (0, schematics_1.noop)();
        }
        const rules = tool
            .filter((tool) => tool !== schema_1.Tool.None)
            .flatMap((selectedTool) => AI_TOOLS[selectedTool].map((fileInfo) => {
            const fileCfgOpts = {
                tree,
                context,
                fileInfo,
                tool: selectedTool,
            };
            switch (fileInfo.type) {
                case types_1.ContextFileType.BestPracticesMd:
                    return (0, file_utils_1.addBestPracticesMarkdown)(fileCfgOpts);
                case types_1.ContextFileType.McpConfig:
                    switch (selectedTool) {
                        case schema_1.Tool.ClaudeCode:
                        case schema_1.Tool.Cursor:
                        case schema_1.Tool.GeminiCli:
                            return (0, file_utils_1.addJsonMcpConfig)(fileCfgOpts, 'mcpServers');
                        case schema_1.Tool.OpenAiCodex:
                            return (0, file_utils_1.addTomlMcpConfig)(fileCfgOpts);
                        case schema_1.Tool.Vscode:
                            return (0, file_utils_1.addJsonMcpConfig)(fileCfgOpts, 'servers');
                        default:
                            throw new Error(`Unsupported '${schematics_1.strings.classify(selectedTool)}' MCP server configuraiton.`);
                    }
            }
        }));
        return (0, schematics_1.chain)(rules);
    };
}
//# sourceMappingURL=index.js.map