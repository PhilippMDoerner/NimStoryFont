import {
  CHANGE_DETECTION_STATUS_TYPE_ID,
  NON_AGGREGATED_STATUS_TYPE_IDS,
  REVIEW_STATUS_TYPE_ID
} from "../_browser-chunks/chunk-4PUEAVR7.js";
import "../_browser-chunks/chunk-MFQQ5L5I.js";
import "../_browser-chunks/chunk-KUHYVZJN.js";
import "../_browser-chunks/chunk-IUGBVGDA.js";
import "../_browser-chunks/chunk-2HVKLHKJ.js";
import "../_browser-chunks/chunk-SC67XZST.js";
import "../_browser-chunks/chunk-3LY4VQVK.js";
import "../_browser-chunks/chunk-IMSF75WX.js";

// src/types/modules/addons.ts
var Addon_TypesEnum = /* @__PURE__ */ ((Addon_TypesEnum2) => (Addon_TypesEnum2.TAB = "tab", Addon_TypesEnum2.PANEL = "panel", Addon_TypesEnum2.TOOL = "tool", Addon_TypesEnum2.TOOLEXTRA = "toolextra", Addon_TypesEnum2.PREVIEW = "preview", Addon_TypesEnum2.experimental_PAGE = "page", Addon_TypesEnum2.experimental_TEST_PROVIDER = "test-provider", Addon_TypesEnum2))(Addon_TypesEnum || {});

// src/types/modules/frameworks.ts
var SupportedFramework = /* @__PURE__ */ ((SupportedFramework2) => (SupportedFramework2.ANGULAR = "angular", SupportedFramework2.ANGULAR_VITE = "angular-vite", SupportedFramework2.EMBER = "ember", SupportedFramework2.HTML_VITE = "html-vite", SupportedFramework2.NEXTJS = "nextjs", SupportedFramework2.NEXTJS_VITE = "nextjs-vite", SupportedFramework2.PREACT_VITE = "preact-vite", SupportedFramework2.REACT_NATIVE_WEB_VITE = "react-native-web-vite", SupportedFramework2.REACT_VITE = "react-vite", SupportedFramework2.REACT_WEBPACK5 = "react-webpack5", SupportedFramework2.SERVER_WEBPACK5 = "server-webpack5", SupportedFramework2.SVELTE_VITE = "svelte-vite", SupportedFramework2.SVELTEKIT = "sveltekit", SupportedFramework2.TANSTACK_REACT = "tanstack-react", SupportedFramework2.VUE3_VITE = "vue3-vite", SupportedFramework2.WEB_COMPONENTS_VITE = "web-components-vite", SupportedFramework2.HTML_RSBUILD = "html-rsbuild", SupportedFramework2.NUXT = "nuxt", SupportedFramework2.QWIK = "qwik", SupportedFramework2.REACT_RSBUILD = "react-rsbuild", SupportedFramework2.SOLID = "solid", SupportedFramework2.VUE3_RSBUILD = "vue3-rsbuild", SupportedFramework2.WEB_COMPONENTS_RSBUILD = "web-components-rsbuild", SupportedFramework2))(SupportedFramework || {});

// src/types/modules/renderers.ts
var SupportedRenderer = /* @__PURE__ */ ((SupportedRenderer2) => (SupportedRenderer2.REACT = "react", SupportedRenderer2.REACT_NATIVE = "react-native", SupportedRenderer2.VUE3 = "vue3", SupportedRenderer2.ANGULAR = "angular", SupportedRenderer2.EMBER = "ember", SupportedRenderer2.PREACT = "preact", SupportedRenderer2.SVELTE = "svelte", SupportedRenderer2.QWIK = "qwik", SupportedRenderer2.HTML = "html", SupportedRenderer2.WEB_COMPONENTS = "web-components", SupportedRenderer2.SERVER = "server", SupportedRenderer2.SOLID = "solid", SupportedRenderer2.NUXT = "nuxt", SupportedRenderer2))(SupportedRenderer || {});

// src/shared/review/events.ts
var REVIEW_NAMESPACE = "storybook/review", REVIEW_EVENTS = {
  // `@storybook/addon-mcp` display-review tool → core-server: the raw agent payload.
  PUSH_REVIEW: `${REVIEW_NAMESPACE}/push-review`,
  // core-server → tabs: display the (createdAt-stamped) review.
  DISPLAY_REVIEW: `${REVIEW_NAMESPACE}/display-review`,
  // tab → core-server: replay the cached review on mount.
  REQUEST_REVIEW: `${REVIEW_NAMESPACE}/request-review`,
  // core-server → tabs: a watched source file changed after the review was cached.
  REVIEW_STALE: `${REVIEW_NAMESPACE}/review-stale`,
  // tab → core-server: dismiss the cached review.
  DISMISS_REVIEW: `${REVIEW_NAMESPACE}/dismiss-review`,
  // core-server → tabs: the review was dismissed.
  REVIEW_DISMISSED: `${REVIEW_NAMESPACE}/review-dismissed`,
  // tab → core-server: a review page (summary or detail) was viewed; forwarded to telemetry.
  PAGEVIEW: `${REVIEW_NAMESPACE}/pageview`
};

// src/types/modules/webpack.ts
var CoreWebpackCompiler = /* @__PURE__ */ ((CoreWebpackCompiler2) => (CoreWebpackCompiler2.Babel = "babel", CoreWebpackCompiler2.SWC = "swc", CoreWebpackCompiler2))(CoreWebpackCompiler || {});

// src/types/modules/builders.ts
var SupportedBuilder = /* @__PURE__ */ ((SupportedBuilder2) => (SupportedBuilder2.WEBPACK5 = "webpack5", SupportedBuilder2.VITE = "vite", SupportedBuilder2.RSBUILD = "rsbuild", SupportedBuilder2))(SupportedBuilder || {});

// src/types/modules/features.ts
var Feature = /* @__PURE__ */ ((Feature2) => (Feature2.DOCS = "docs", Feature2.TEST = "test", Feature2.ONBOARDING = "onboarding", Feature2.A11Y = "a11y", Feature2.AI = "ai", Feature2))(Feature || {});

// src/types/modules/languages.ts
var SupportedLanguage = /* @__PURE__ */ ((SupportedLanguage2) => (SupportedLanguage2.JAVASCRIPT = "javascript", SupportedLanguage2.TYPESCRIPT = "typescript", SupportedLanguage2))(SupportedLanguage || {});
export {
  Addon_TypesEnum,
  CHANGE_DETECTION_STATUS_TYPE_ID,
  CoreWebpackCompiler,
  Feature,
  NON_AGGREGATED_STATUS_TYPE_IDS,
  REVIEW_EVENTS,
  REVIEW_NAMESPACE,
  REVIEW_STATUS_TYPE_ID,
  SupportedBuilder,
  SupportedFramework,
  SupportedLanguage,
  SupportedRenderer
};
