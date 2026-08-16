/**
 * Generates AI configuration files for Angular projects. This schematic creates AGENTS.md
 * file and Angular MCP server configuration, improving the quality of AI-generated code and
 * suggestions.
 */
export type Schema = {
    /**
     * Specifies which AI tools to generate configuration files (AGENTS.md, MCP server config)
     * for.
     */
    tool?: Tool[];
};
export declare enum Tool {
    ClaudeCode = "claude-code",
    Cursor = "cursor",
    GeminiCli = "gemini-cli",
    None = "none",
    OpenAiCodex = "open-ai-codex",
    Vscode = "vscode"
}
