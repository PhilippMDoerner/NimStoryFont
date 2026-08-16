import CJS_COMPAT_NODE_URL_o3kjpxmk9t from 'node:url';
import CJS_COMPAT_NODE_PATH_o3kjpxmk9t from 'node:path';
import CJS_COMPAT_NODE_MODULE_o3kjpxmk9t from "node:module";

var __filename = CJS_COMPAT_NODE_URL_o3kjpxmk9t.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_o3kjpxmk9t.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_o3kjpxmk9t.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// package.json
var version = "10.5.7";

// ../../node_modules/std-env/dist/index.mjs
var e = globalThis.process?.env || /* @__PURE__ */ Object.create(null), t = globalThis.process || { env: e }, n = t !== void 0 && t.env && t.env.NODE_ENV || void 0, r = [["claude", ["CLAUDECODE", "CLAUDE_CODE"]], ["replit", ["REPL_ID"]], ["gemini", ["GEMINI_CLI"]], ["codex", ["CODEX_SANDBOX", "CODEX_THREAD_ID"]], ["opencode", ["OPENCODE"]], ["pi", [i("PATH", /\.pi[\\/]agent/)]], ["auggie", ["AUGMENT_AGENT"]], ["goose", ["GOOSE_PROVIDER"]], ["devin", [i("EDITOR", /devin/)]], ["cursor", ["CURSOR_AGENT"]], ["kiro", [i("TERM_PROGRAM", /kiro/)]]];
function i(t2, n2) {
  return () => {
    let r2 = e[t2];
    return r2 ? n2.test(r2) : !1;
  };
}
function a() {
  let t2 = e.AI_AGENT;
  if (t2) return { name: t2.toLowerCase() };
  for (let [t3, n2] of r) for (let r2 of n2) if (typeof r2 == "string" ? e[r2] : r2()) return { name: t3 };
  return {};
}
var o = a(), s = o.name, c = !!o.name, l = [["APPVEYOR"], ["AWS_AMPLIFY", "AWS_APP_ID", { ci: !0 }], ["AZURE_PIPELINES", "SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"], ["AZURE_STATIC", "INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"], ["APPCIRCLE", "AC_APPCIRCLE"], ["BAMBOO", "bamboo_planKey"], ["BITBUCKET", "BITBUCKET_COMMIT"], ["BITRISE", "BITRISE_IO"], ["BUDDY", "BUDDY_WORKSPACE_ID"], ["BUILDKITE"], ["CIRCLE", "CIRCLECI"], ["CIRRUS", "CIRRUS_CI"], ["CLOUDFLARE_PAGES", "CF_PAGES", { ci: !0 }], ["CLOUDFLARE_WORKERS", "WORKERS_CI", { ci: !0 }], ["GOOGLE_CLOUDRUN", "K_SERVICE"], ["GOOGLE_CLOUDRUN_JOB", "CLOUD_RUN_JOB"], ["CODEBUILD", "CODEBUILD_BUILD_ARN"], ["CODEFRESH", "CF_BUILD_ID"], ["DRONE"], ["DRONE", "DRONE_BUILD_EVENT"], ["DSARI"], ["GITHUB_ACTIONS"], ["GITLAB", "GITLAB_CI"], ["GITLAB", "CI_MERGE_REQUEST_ID"], ["GOCD", "GO_PIPELINE_LABEL"], ["LAYERCI"], ["JENKINS", "JENKINS_URL"], ["HUDSON", "HUDSON_URL"], ["MAGNUM"], ["NETLIFY"], ["NETLIFY", "NETLIFY_LOCAL", { ci: !1 }], ["NEVERCODE"], ["RENDER"], ["SAIL", "SAILCI"], ["SEMAPHORE"], ["SCREWDRIVER"], ["SHIPPABLE"], ["SOLANO", "TDDIUM"], ["STRIDER"], ["TEAMCITY", "TEAMCITY_VERSION"], ["TRAVIS"], ["VERCEL", "NOW_BUILDER"], ["VERCEL", "VERCEL", { ci: !1 }], ["VERCEL", "VERCEL_ENV", { ci: !1 }], ["APPCENTER", "APPCENTER_BUILD_ID"], ["CODESANDBOX", "CODESANDBOX_SSE", { ci: !1 }], ["CODESANDBOX", "CODESANDBOX_HOST", { ci: !1 }], ["STACKBLITZ"], ["STORMKIT"], ["CLEAVR"], ["ZEABUR"], ["CODESPHERE", "CODESPHERE_APP_ID", { ci: !0 }], ["RAILWAY", "RAILWAY_PROJECT_ID"], ["RAILWAY", "RAILWAY_SERVICE_ID"], ["DENO-DEPLOY", "DENO_DEPLOY"], ["DENO-DEPLOY", "DENO_DEPLOYMENT_ID"], ["FIREBASE_APP_HOSTING", "FIREBASE_APP_HOSTING", { ci: !0 }]];
function u() {
  for (let t2 of l) if (e[t2[1] || t2[0]]) return { name: t2[0].toLowerCase(), ...t2[2] };
  return e.SHELL === "/bin/jsh" && t.versions?.webcontainer ? { name: "stackblitz", ci: !1 } : { name: "", ci: !1 };
}
var d = u(), f = d.name, p = t.platform || "", m = !!e.CI || d.ci !== !1, h = !!t.stdout?.isTTY;
var _ = !!e.DEBUG, v = n === "test" || !!e.TEST, y = n === "production" || e.MODE === "production", b = n === "dev" || n === "development" || e.MODE === "development", x = !!e.MINIMAL || m || v || !h, S = /^win/i.test(p), C = /^linux/i.test(p), w = /^darwin/i.test(p), T = !e.NO_COLOR && (!!e.FORCE_COLOR || (h || S) && e.TERM !== "dumb" || m), E = (t.versions?.node || "").replace(/^v/, "") || null, D = Number(E?.split(".")[0]) || null, O = !!t?.versions?.node, k = "Bun" in globalThis, A = "Deno" in globalThis, j = "fastly" in globalThis, M = "Netlify" in globalThis, N = "EdgeRuntime" in globalThis, P = globalThis.navigator?.userAgent === "Cloudflare-Workers", F = [[M, "netlify"], [N, "edge-light"], [P, "workerd"], [j, "fastly"], [A, "deno"], [k, "bun"], [O, "node"]];
function I() {
  let e2 = F.find((e3) => e3[0]);
  if (e2) return { name: e2[1] };
}
var L = I(), R = L?.name || "";

// src/telemetry/detect-agent.ts
var detectAgent = () => {
  let { name } = a();
  if (name)
    return { name };
};

export {
  version,
  detectAgent
};
