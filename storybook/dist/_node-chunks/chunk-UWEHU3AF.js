import CJS_COMPAT_NODE_URL_o3kjpxmk9t from 'node:url';
import CJS_COMPAT_NODE_PATH_o3kjpxmk9t from 'node:path';
import CJS_COMPAT_NODE_MODULE_o3kjpxmk9t from "node:module";

var __filename = CJS_COMPAT_NODE_URL_o3kjpxmk9t.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_o3kjpxmk9t.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_o3kjpxmk9t.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// src/telemetry/event-cache.ts
import { cache } from "storybook/internal/common";
var processingPromise = Promise.resolve(), setHelper = async (eventType, body) => {
  let lastEvents = await cache.get("lastEvents") || {};
  lastEvents[eventType] = { body, timestamp: Date.now() }, await cache.set("lastEvents", lastEvents);
}, set = (eventType, body) => {
  let run = processingPromise.then(async () => {
    await setHelper(eventType, body);
  });
  return processingPromise = run.catch(() => {
  }), run;
}, get = async (eventType) => (await getLastEvents())[eventType], getLastEvents = async () => (await processingPromise, await cache.get("lastEvents") || {}), upgradeFields = (event) => {
  let { body, timestamp } = event;
  return {
    timestamp,
    eventType: body?.eventType,
    eventId: body?.eventId,
    sessionId: body?.sessionId
  };
}, UPGRADE_EVENTS = ["init", "upgrade"], RUN_EVENTS = ["build", "dev", "error"], lastEvent = (lastEvents, eventTypes) => {
  let descendingEvents = eventTypes.map((eventType) => lastEvents?.[eventType]).filter((event) => !!event).sort((a, b) => b.timestamp - a.timestamp);
  return descendingEvents.length > 0 ? descendingEvents[0] : void 0;
}, getPrecedingUpgrade = async (events = void 0) => {
  let lastEvents = events || await cache.get("lastEvents") || {}, lastUpgradeEvent = lastEvent(lastEvents, UPGRADE_EVENTS), lastRunEvent = lastEvent(lastEvents, RUN_EVENTS);
  if (lastUpgradeEvent)
    return !lastRunEvent?.timestamp || lastUpgradeEvent.timestamp > lastRunEvent.timestamp ? upgradeFields(lastUpgradeEvent) : void 0;
};
async function isWithinInitialSession(events) {
  try {
    let eventTypes = Array.isArray(events) ? events : [events], lastEvents = await getLastEvents(), lastRelevantEvent = lastEvent(lastEvents, eventTypes);
    if (!lastRelevantEvent)
      return !1;
    let { getSessionId } = await import("./session-id-QG3BH4RA.js"), sessionId = await getSessionId();
    return !(lastRelevantEvent.body?.sessionId && lastRelevantEvent.body.sessionId !== sessionId);
  } catch {
    return !1;
  }
}

// src/telemetry/ai-setup-utils.ts
function isStoryCreatedByAISetup(entry) {
  return entry.type === "story" && (entry.tags?.includes("ai-generated") ?? !1);
}

// src/shared/utils/ecosystem-identifier.ts
var TEST_PACKAGES = [
  "*playwright*",
  "@playwright/*",
  "*vitest*",
  "@vitest/*",
  "jest",
  "cypress",
  "nightwatch",
  "webdriver",
  "@web/test-runner",
  "puppeteer",
  "karma",
  "jasmine",
  "chai",
  "@testing-library/*",
  "@ngneat/spectator",
  "wdio*",
  "msw",
  "miragejs",
  "sinon",
  "chromatic",
  "@chromatic-com/*"
], STYLING_PACKAGES = [
  "postcss",
  "tailwindcss",
  "autoprefixer",
  "sass",
  "emotion",
  "@emotion/*",
  "less",
  "styled-components",
  "bootstrap",
  "goober",
  "stylus",
  "jss",
  "linaria",
  "bulma",
  "aphrodite",
  "semantic-ui",
  "foundation-sites",
  "fela"
], STATE_MANAGEMENT_PACKAGES = [
  "*redux*",
  "@reduxjs/*",
  "zustand",
  "jotai",
  "recoil",
  "mobx*",
  "valtio",
  "xstate",
  "@xstate/*",
  "effector",
  "effector-react",
  "easy-peasy"
], DATA_FETCHING_PACKAGES = [
  "axios",
  "@tanstack/react-query",
  "superagent",
  "swr",
  "isomorphic-fetch",
  "*graphql*",
  "ky",
  "@apollo/*",
  "relay-runtime",
  "react-query",
  "urql",
  "react-relay"
], UI_LIBRARY_PACKAGES = [
  "@mui/*",
  "@headlessui/*",
  "antd",
  "radix-ui",
  "@radix-ui/*",
  "react-bootstrap",
  "@mantine/*",
  "@chakra-ui/*",
  "shadcn",
  "@blueprintjs/*",
  "semantic-ui-react",
  "primereact",
  "@fluentui/*",
  "rsuite",
  "react-aria*",
  "@react-aria/*",
  "@heroui/*",
  "@carbon/*",
  "theme-ui",
  "rebass"
], I18N_PACKAGES = ["*i18n*", "*intl", "@lingui/*"], ROUTER_PACKAGES = [
  "react-router",
  "react-router-dom",
  "react-easy-router",
  "@remix-run/router",
  "expo-router",
  "@tanstack/*-router",
  "wouter",
  "@reach/router"
];
function globToRegex(pattern) {
  let regexPattern = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(`^${regexPattern}$`);
}
function matchesPackagePattern(dependencyName, patterns) {
  return patterns.some((pattern) => globToRegex(pattern).test(dependencyName));
}
function isStateManagementPackage(dependencyName) {
  return matchesPackagePattern(dependencyName, STATE_MANAGEMENT_PACKAGES);
}
function isStylingPackage(dependencyName) {
  return matchesPackagePattern(dependencyName, STYLING_PACKAGES);
}
function isRouterPackage(dependencyName) {
  return matchesPackagePattern(dependencyName, ROUTER_PACKAGES);
}
function isI18nPackage(dependencyName) {
  return matchesPackagePattern(dependencyName, I18N_PACKAGES);
}

export {
  TEST_PACKAGES,
  STYLING_PACKAGES,
  STATE_MANAGEMENT_PACKAGES,
  DATA_FETCHING_PACKAGES,
  UI_LIBRARY_PACKAGES,
  I18N_PACKAGES,
  ROUTER_PACKAGES,
  matchesPackagePattern,
  isStateManagementPackage,
  isStylingPackage,
  isRouterPackage,
  isI18nPackage,
  set,
  get,
  getLastEvents,
  getPrecedingUpgrade,
  isWithinInitialSession,
  isStoryCreatedByAISetup
};
