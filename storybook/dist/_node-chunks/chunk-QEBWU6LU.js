import CJS_COMPAT_NODE_URL_o3kjpxmk9t from 'node:url';
import CJS_COMPAT_NODE_PATH_o3kjpxmk9t from 'node:path';
import CJS_COMPAT_NODE_MODULE_o3kjpxmk9t from "node:module";

var __filename = CJS_COMPAT_NODE_URL_o3kjpxmk9t.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_o3kjpxmk9t.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_o3kjpxmk9t.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// src/shared/utils/agent-environment.ts
function isClaudePreviewLaunch(env = process.env) {
  return !!env.CLAUDE_AGENT_SDK_VERSION && !env.AI_AGENT;
}

// src/shared/constants/agent-provenance.ts
var CLAUDE_AGENT_NAME = "claude", CLAUDE_PREVIEW_AGENT_NAME = "claude-preview";

export {
  CLAUDE_AGENT_NAME,
  CLAUDE_PREVIEW_AGENT_NAME,
  isClaudePreviewLaunch
};
