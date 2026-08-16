import CJS_COMPAT_NODE_URL_o3kjpxmk9t from 'node:url';
import CJS_COMPAT_NODE_PATH_o3kjpxmk9t from 'node:path';
import CJS_COMPAT_NODE_MODULE_o3kjpxmk9t from "node:module";

var __filename = CJS_COMPAT_NODE_URL_o3kjpxmk9t.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_o3kjpxmk9t.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_o3kjpxmk9t.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------
import {
  batchTestsRule,
  buildPortalStep,
  buildSharedPreviewStep,
  cleanupStep,
  cssCheckDOD,
  discoveryStepRelaxed,
  editOverWriteRule,
  ext,
  interactionPlayStep,
  listDOD,
  listRules,
  listSteps,
  mswStep,
  noPolishRule,
  nodeModuleReadsRule,
  packageManagerRule,
  preferSharedFixesRule,
  readBudgetRuleRelaxed,
  sharedPreviewDOD,
  storyTagsV1DOD,
  toolsVsShellRule,
  typeCheckPassesStrictDOD,
  verifyStep,
  vitestPassesStrictDOD,
  writeStoriesStep
} from "./chunk-FDJYLTPT.js";
import {
  getDocsMarkdownUrl
} from "./chunk-DPXVO6NW.js";
import "./chunk-IN7NJS2T.js";
import {
  require_dist
} from "./chunk-TWWDCALS.js";
import {
  __toESM
} from "./chunk-5SSDLDTJ.js";

// src/cli/ai/setup-prompts/relaxed-limits.ts
var import_ts_dedent = __toESM(require_dist(), 1);
function instructions(projectInfo) {
  let { configDir, language, needsUserOnboarding, packageManager, packageManagerName } = projectInfo, tsx = ext(language, !0), ts = ext(language, !1), docsUrl = (path) => getDocsMarkdownUrl(path, projectInfo), mswInstall = packageManager.getInstallCommand(["msw", "mockdate"], !0), ctx = {
    configDir,
    docsUrl,
    mswInstall,
    needsUserOnboarding,
    packageManager,
    packageManagerName,
    tsx,
    ts
  };
  return import_ts_dedent.dedent`
    Your goal is to make Storybook fully functional in this project: configure \`${configDir}/preview.${tsx}\` with the right decorators, add MSW for data, and write up to 10 colocated \`*.stories.${tsx}\` files. Add \`play\` functions only where they prove something non-trivial.

    ## Rules of engagement (follow strictly — these are time budgets, not suggestions)

    ${listRules([
    toolsVsShellRule(ctx),
    nodeModuleReadsRule(ctx),
    readBudgetRuleRelaxed(ctx),
    editOverWriteRule(ctx),
    batchTestsRule(ctx),
    packageManagerRule(ctx),
    preferSharedFixesRule(ctx),
    noPolishRule(ctx)
  ])}

    ## Plan (do not skip steps, but keep each step lean)

    ${listSteps(
    [
      discoveryStepRelaxed(projectInfo, ctx),
      buildSharedPreviewStep(projectInfo, ctx),
      buildPortalStep(projectInfo, ctx),
      mswStep(projectInfo, ctx),
      writeStoriesStep(projectInfo, ctx),
      interactionPlayStep(projectInfo, ctx),
      verifyStep(projectInfo, ctx),
      cleanupStep(projectInfo, ctx)
    ],
    { level: 3 }
  )}

    ## Done when
        
    ${listDOD([
    cssCheckDOD(ctx),
    storyTagsV1DOD(ctx),
    vitestPassesStrictDOD(ctx),
    typeCheckPassesStrictDOD(ctx),
    sharedPreviewDOD(ctx)
  ])}

    ## Reference (only fetch if stuck)

    - Docs index: https://storybook.js.org/llms.txt
    - Writing stories: ${docsUrl("writing-stories")}
    - Decorators: ${docsUrl("writing-stories/decorators")}
    - Play functions: ${docsUrl("writing-stories/play-function")}
    - Vitest integration: ${docsUrl("writing-tests/vitest-plugin")}

    Append \`?codeOnly=true\` to any docs URL for code-only snippets. Don't fetch unless a specific question can't be answered from this prompt.
  `;
}
export {
  instructions
};
