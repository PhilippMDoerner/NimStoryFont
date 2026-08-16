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
  getMonorepoType
} from "./chunk-IN7NJS2T.js";
import {
  require_dist
} from "./chunk-TWWDCALS.js";
import {
  __toESM
} from "./chunk-5SSDLDTJ.js";

// src/cli/ai/utils/ext.ts
function ext(language, jsx) {
  return language === "ts" ? jsx ? "tsx" : "ts" : jsx ? "jsx" : "js";
}

// src/cli/ai/utils/markdown.ts
var import_ts_dedent = __toESM(require_dist(), 1);
function listRules(rules) {
  return import_ts_dedent.dedent`
    ${rules.filter(Boolean).map((s, i) => `${i + 1}. ${s}`).join(`
`)}
  `;
}
function listSteps(steps, options) {
  let level = options?.level ?? 2, prefix = "#".repeat(level);
  return import_ts_dedent.dedent`
    ${steps.filter(Boolean).map((step, i) => `${prefix} Step ${i + 1} \u2014 ${step.title}

${step.body}`).join(`

`)}
  `;
}
function listDOD(dods) {
  return import_ts_dedent.dedent`
    ${dods.filter(Boolean).map((s) => `- ${s}`).join(`
`)}
  `;
}

// src/cli/ai/setup-prompts/partials/steps.ts
var import_ts_dedent3 = __toESM(require_dist(), 1);
import { getMswInitCommand, getVitestStorybookRunCommand } from "storybook/internal/common";

// src/cli/ai/setup-prompts/partials/examples.ts
var import_ts_dedent2 = __toESM(require_dist(), 1);
function getPreviewExample(projectInfo) {
  let { configDir, language, framework, rendererPackage, hasCsfFactoryPreview } = projectInfo, tsx = ext(language, !0), typeImport = framework || rendererPackage || "@storybook/react-vite";
  return hasCsfFactoryPreview ? import_ts_dedent2.dedent`
      \`\`\`${tsx}
      // ${configDir}/preview.${tsx}
      import { definePreview } from '${typeImport}';
      import '../src/index.css';
      import MockDate from 'mockdate';
      import addonMsw from 'msw-storybook-addon';
      import { SessionProvider } from '../src/contexts/SessionContext';
      import { mswHandlers } from './msw-handlers';

      export default definePreview({
        addons: [addonMsw()],
        decorators: [
          (Story) => (
            <SessionProvider>
              <Story />
            </SessionProvider>
          ),
        ],
        async beforeEach({ msw }) {
          msw.use(...mswHandlers);
          localStorage.setItem('theme', 'dark');
          MockDate.set('2024-04-01T12:00:00Z');
        },
      });
      \`\`\`
    ` : language === "js" ? import_ts_dedent2.dedent`
      \`\`\`${tsx}
      // ${configDir}/preview.${tsx}
      import '../src/index.css';
      import MockDate from 'mockdate';
      import { mswLoader } from 'msw-storybook-addon/csf3';
      import { SessionProvider } from '../src/contexts/SessionContext';
      import { mswHandlers } from './msw-handlers';

      const preview = {
        decorators: [
          (Story) => (
            <SessionProvider>
              <Story />
            </SessionProvider>
          ),
        ],
        loaders: [mswLoader()],
        async beforeEach({ msw }) {
          msw.use(...mswHandlers);
          localStorage.setItem('theme', 'dark');
          MockDate.set('2024-04-01T12:00:00Z');
        },
      };

      export default preview;
      \`\`\`
    ` : import_ts_dedent2.dedent`
    \`\`\`${tsx}
    // ${configDir}/preview.${tsx}
    import type { Preview } from '${typeImport}';
    import '../src/index.css';
    import MockDate from 'mockdate';
    import { mswLoader } from 'msw-storybook-addon/csf3';
    import { SessionProvider } from '../src/contexts/SessionContext';
    import { mswHandlers } from './msw-handlers';

    const preview: Preview = {
      decorators: [
        (Story) => (
          <SessionProvider>
            <Story />
          </SessionProvider>
        ),
      ],
      loaders: [mswLoader()],
      async beforeEach({ msw }) {
        msw.use(...mswHandlers);
        localStorage.setItem('theme', 'dark');
        MockDate.set('2024-04-01T12:00:00Z');
      },
    };

    export default preview;
    \`\`\`
  `;
}
function getPortalDecoratorExample(projectInfo) {
  let { language } = projectInfo, tsx = ext(language, !0);
  return import_ts_dedent2.dedent`
    \`\`\`${tsx}
    // Add this entry to the \`decorators\` array of your preview config:
    (Story) => {
      for (const id of ['modal-root', 'drawer-root', 'toast-root']) {
        if (!document.getElementById(id)) {
          const el = document.createElement('div');
          el.id = id;
          document.body.appendChild(el);
        }
      }
      return <Story />;
    }
    \`\`\`
  `;
}
function getMainConfigExample(projectInfo) {
  let { configDir, framework, rendererPackage, language } = projectInfo, ts = ext(language, !1), typeImport = framework || rendererPackage || "@storybook/react";
  return language === "js" ? import_ts_dedent2.dedent`
      \`\`\`js
      // ${configDir}/main.js
      const config = { staticDirs: ['../public'] };
      export default config;
      \`\`\`
    ` : import_ts_dedent2.dedent`
    \`\`\`${ts}
    // ${configDir}/main.${ts}
    import type { StorybookConfig } from '${typeImport}';

    const config: StorybookConfig = { staticDirs: ['../public'] };
    export default config;
    \`\`\`
  `;
}
function getStoryExample(projectInfo) {
  let { language, framework, rendererPackage } = projectInfo, tsx = ext(language, !0), typeImport = framework || rendererPackage || "@storybook/react-vite";
  return language === "js" ? import_ts_dedent2.dedent`
      \`\`\`${tsx}
      import { expect } from 'storybook/test';
      import { Button } from './Button';

      const meta = {
        component: Button,
        tags: ['ai-generated', 'needs-work'], // strip 'needs-work' once vitest passes
      };

      export default meta;

      // Smoke check — one is enough per file
      export const Primary = {
        args: { children: 'Order now' },
        play: async ({ canvas }) => {
          await expect(canvas.getByRole('button', { name: /order now/i })).toBeVisible();
        },
      };

      // Variant-only stories: no play needed
      export const Clear = { args: { children: 'Cancel', clear: true } };
      export const Large = { args: { children: 'Checkout', large: true } };
      export const WithIcon = { args: { icon: 'cart', 'aria-label': 'food cart' } };
      \`\`\`
    ` : import_ts_dedent2.dedent`
    \`\`\`${tsx}
    import type { Meta, StoryObj } from '${typeImport}';
    import { expect } from 'storybook/test';
    import { Button } from './Button';

    const meta = {
      component: Button,
      tags: ['ai-generated', 'needs-work'], // strip 'needs-work' once vitest passes
    } satisfies Meta<typeof Button>;

    export default meta;
    type Story = StoryObj<typeof meta>;

    // Smoke check — one is enough per file
    export const Primary: Story = {
      args: { children: 'Order now' },
      play: async ({ canvas }) => {
        await expect(canvas.getByRole('button', { name: /order now/i })).toBeVisible();
      },
    };

    // Variant-only stories: no play needed
    export const Clear: Story = { args: { children: 'Cancel', clear: true } };
    export const Large: Story = { args: { children: 'Checkout', large: true } };
    export const WithIcon: Story = { args: { icon: 'cart', 'aria-label': 'food cart' } };
    \`\`\`
  `;
}
function getInteractionPlayExample(projectInfo) {
  let { language } = projectInfo, tsx = ext(language, !0);
  return import_ts_dedent2.dedent`
    \`\`\`${tsx}
    export const FilledForm${language === "ts" ? ": Story" : ""} = {
      play: async ({ canvas, userEvent }) => {
        await userEvent.type(canvas.getByLabelText('email'), 'a@b.com', { delay: 50 });
        await userEvent.click(canvas.getByRole('button', { name: /submit/i }));
        await expect(await canvas.findByText(/welcome/i)).toBeVisible();
      },
    };
    \`\`\`
  `;
}

// src/cli/ai/setup-prompts/partials/steps.ts
function discoveryStepStrict(projectInfo, { tsx }) {
  return {
    title: "Discover the runtime (\u226412 reads)",
    body: import_ts_dedent3.dedent`
      Identify, in this order, using Glob/Grep first then targeted Reads:

    - \`index.html\` — \`<link rel="stylesheet">\` tags, inline \`<style>\` blocks, fonts, and any \`<div id="...">\` mount or portal roots that aren't created by JS
    - entry file (\`main.${tsx}\` / \`index.${tsx}\`) — providers wrapping \`<App />\`, root CSS imports
    - \`App.${tsx}\` — top-level layout, router usage, providers it consumes
    - providers / context files — what they expose
    - root CSS — global styles, CSS variables, theme tokens (both JS-imported CSS **and** anything linked from \`index.html\`)
    - data hooks — \`fetch(...)\`, \`useQuery\`, \`axios\`, etc. (capture base URL + endpoints actually called during render)
    - browser state actually read at render — \`localStorage\`/\`sessionStorage\`/cookie keys
    - portal targets — \`createPortal(...)\` and the DOM ids it mounts to (e.g. \`#modal-root\`)
    - 1–2 real page or feature components (your story source-of-truth for JSX patterns)

    Stop reading once you can answer: *"What providers, CSS, browser state, and network calls must the preview supply for a typical page to render?"*
  `
  };
}
function discoveryStepRelaxed(projectInfo, { tsx }) {
  return {
    title: "Discover the runtime (\u226440 reads)",
    body: import_ts_dedent3.dedent`
      Identify, in this order, using Glob/Grep first then targeted Reads:

    - \`index.html\` — \`<link rel="stylesheet">\` tags, inline \`<style>\` blocks, fonts, and any \`<div id="...">\` mount or portal roots that aren't created by JS
    - entry file (\`main.${tsx}\` / \`index.${tsx}\`) — providers wrapping \`<App />\`, root CSS imports
    - \`App.${tsx}\` — top-level layout, router usage, providers it consumes
    - providers / context files — what they expose
    - root CSS — global styles, CSS variables, theme tokens (both JS-imported CSS **and** anything linked from \`index.html\`)
    - data hooks — \`fetch(...)\`, \`useQuery\`, \`axios\`, etc. (capture base URL + endpoints actually called during render)
    - browser state actually read at render — \`localStorage\`/\`sessionStorage\`/cookie keys
    - portal targets — \`createPortal(...)\` and the DOM ids it mounts to (e.g. \`#modal-root\`)
    - 1–20 real page or feature components (your story source-of-truth for JSX patterns)

    Stop reading once you can answer: *"What providers, CSS, browser state, and network calls must the preview supply for a typical page to render? What surrounding context do components need to render?"*
  `
  };
}
function verifyStep(projectInfo, { packageManager, tsx }) {
  let vitestRunAll = getVitestStorybookRunCommand(packageManager), vitestRunFile = getVitestStorybookRunCommand(packageManager, `path/to/Foo.stories.${tsx}`);
  return {
    title: "Verify in one batch, then iterate only on failures",
    body: import_ts_dedent3.dedent`**Read this rule once before running anything:** the first vitest invocation must run **all** the new stories together. No single-file runs before the batch.

    \`\`\`bash
    ${vitestRunAll}
    \`\`\`

    Then run the project's TypeScript check (use the script from \`package.json\` — typically \`tsc --noEmit\` or \`${packageManager.getRunCommand("typecheck")}\`). Read the raw output once; don't pipe it through repeated \`grep\`/\`head\` invocations to slice it.

    For each failure:

    1. Read the error.
    2. If multiple stories share the failure, fix the shared preview setup, not the stories.
    3. Re-run vitest **only for the affected file(s)**: \`${vitestRunFile}\`.
    4. Repeat until the file passes, then move on. Cap retries at ~5 per file — if it still fails, leave \`'needs-work'\` tag to inform the user.
    5. When you keep failing on a story, play function, etc., do not substitute it for easier content that contributes less to codebase understanding.

    **After a file passes**, edit its meta and remove \`'needs-work'\` so its tags become \`['ai-generated']\`. Files you couldn't fix keep \`['ai-generated', 'needs-work']\` — move on, don't loop forever.`
  };
}
function verifyWithAllowedFailureStep(projectInfo, { packageManager, tsx }) {
  let vitestRunAll = getVitestStorybookRunCommand(packageManager), vitestRunFile = getVitestStorybookRunCommand(packageManager, `path/to/Foo.stories.${tsx}`);
  return {
    title: "Verify in one batch, then iterate only on failures",
    body: import_ts_dedent3.dedent`**Read this rule once before running anything:** the first vitest invocation must run **all** the new stories together. No single-file runs before the batch.

    \`\`\`bash
    ${vitestRunAll}
    \`\`\`

    Then run the project's TypeScript check (use the script from \`package.json\` — typically \`tsc --noEmit\` or \`${packageManager.getRunCommand("typecheck")}\`). Read the raw output once; don't pipe it through repeated \`grep\`/\`head\` invocations to slice it.

    For each failure:

    1. Read the error.
    2. If multiple stories share the failure, fix the shared preview setup, not the stories.
    3. In subsequent runs, re-run Vitest **only for the affected file(s)**: \`${vitestRunFile}\`.
    4. Fix any TypeScript issues needed for story files to pass, then re-run TS and Vitest only for those files. Repeat until files pass, or until you have tried 5 times.
    5. If a story file still fails after those retries, leave the file tagged \`'needs-work'\` and move on — do not keep chasing project-wide TS errors caused by preserved \`'needs-work'\` files.
    6. When you keep failing on a story, play function, etc., do not substitute it for easier content that contributes less to codebase understanding.
    **After a file passes**, edit its meta and remove \`'needs-work'\` so its tags become \`['ai-generated']\`. Files you couldn't fix keep \`['ai-generated', 'needs-work']\` — move on, don't loop forever.`
  };
}
function cleanupStep({ needsUserOnboarding }, ctx) {
  return {
    title: "Clean up",
    body: `Before finishing, remove debug code, broad mocks added during diagnosis, unused deps, and eval artifacts. ${needsUserOnboarding ? "You must preserve the components, CSS, stories and MDX docs initially created by Storybook, as they are required for user onboarding in the UI." : "Delete the components, CSS, stories and MDX docs initially created by Storybook only if you managed to write successful stories."}`
  };
}
function monorepoStep(projectInfo, ctx) {
  return {
    title: "Monorepo preparation",
    body: import_ts_dedent3.dedent`Build any local monorepo dependencies identified during discovery, and keep track of existing errors in the codebase unrelated to the package changes you'll make.`
  };
}
function buildSharedPreviewStep(projectInfo, { configDir, tsx }) {
  return {
    title: "Build the shared preview",
    body: import_ts_dedent3.dedent`    Set up Storybook **once** so most stories work without per-story setup. **Edit the existing \`${configDir}/preview.${tsx}\`** (created by \`storybook init\`) — add to its existing config object, don't replace it.

    The complete shape should look like this (merge the new pieces into what's already there):

    ${getPreviewExample(projectInfo)}

    Rules for the preview:

    - Use the **real** provider tree and the **real** root CSS import. Don't invent providers.
    - If the app's CSS is loaded via \`<link>\` in \`index.html\` (rather than imported in JS), import the same file from preview so stories render with the same styles.
    - Seed only the specific browser-state keys the app actually reads. Do **not** clear all of \`localStorage\`/\`sessionStorage\`/cookies, and do not reset Storybook's own state.
    - Use \`mockdate\` only when render output depends on the date.
    - Do not mock \`window\`, \`document\`, \`navigator\`, observers, or \`fetch\` directly.
    `
  };
}
function buildPortalStep(projectInfo, { configDir, tsx }) {
  return {
    title: "Portals (in a decorator, not `preview-body.html`)",
    body: import_ts_dedent3.dedent`If you found \`createPortal(..., document.getElementById('foo'))\` in discovery, **add a decorator in \`${configDir}/preview.${tsx}\` that creates the portal root** before the story renders. Do not use \`preview-body.html\`.

    ${getPortalDecoratorExample(projectInfo)}

    Add this decorator to the \`decorators\` array of your preview config. Skip this step entirely if portals only target \`document.body\`.`
  };
}
function mswStep(projectInfo, { configDir, mswInstall, packageManager, ts }) {
  let mswInit = getMswInitCommand(packageManager), mswAddonAdd = packageManager.getPackageCommand([
    "storybook",
    "add",
    "msw-storybook-addon@3"
  ]), csfNextNote = projectInfo.hasCsfFactoryPreview ? "\n\n    If `storybook add` injects `import * as mswStorybookAddon from 'msw-storybook-addon/preview'` and a `mswStorybookAddon` entry into your `definePreview` `addons`, remove both \u2014 that form breaks TypeScript inference for the entire preview. Register the addon with `addonMsw()` as shown below instead.\n" : "";
  return {
    title: "MSW handlers (only what stories will hit)",
    body: `Use \`msw-storybook-addon\`. Register it with \`storybook add\` (which also adds it to the \`addons\` field of \`${configDir}/main.${ts}\`), then install its peer dependencies and generate the worker script:

    \`\`\`bash
    ${mswAddonAdd}
    ${mswInstall}
    ${mswInit}
    \`\`\`
${csfNextNote}
    Make sure \`${configDir}/main.${ts}\` serves \`./public\`:

    ${getMainConfigExample(projectInfo)}

    Put handlers in \`${configDir}/msw-handlers.${ts}\`. Cover only the endpoints your stories will exercise \u2014 no catch-alls.

    \`\`\`${ts}
    // ${configDir}/msw-handlers.${ts}
    import { http, HttpResponse } from 'msw';

    export const mswHandlers = [
      http.get('https://api.example.com/products', () =>
        HttpResponse.json({ items: [{ id: 'p1', name: 'Example', price: 42 }] })
      ),
    ];
    \`\`\`
`
  };
}
function writeStoriesStep(projectInfo, { tsx }) {
  return {
    title: "Write up to 10 story files (in one batch)",
    body: import_ts_dedent3.dedent`

    This step has **two required deliverables**:

    a. Up to 10 colocated \`*.stories.${tsx}\` files for meaningful targets in the codebase.
    b. **Exactly one \`CssCheck\` story** added to one of those files (spec below). This step is not complete without it.

    **Substep a — pick targets and write the files.** Pick ~10 meaningful targets from the real codebase (low-level reusable → page components). Skip subcomponents, hooks, contexts, helpers, and \`App\` itself when real page components exist.

    Each story file: ~3 exports for typical components, up to ~10 when warranted by real usage. Copy JSX patterns from real pages/routes/tests.

    **Tag every new story file with \`['ai-generated', 'needs-work']\` from the start.** You will remove \`'needs-work'\` only after vitest confirms the file passes. This way, anything not yet verified — including stories you ran out of time to fix — stays correctly marked.

    ${getStoryExample(projectInfo)}

    Story rules:

    - Start every meta with \`tags: ['ai-generated', 'needs-work']\`.
    - Show all imports explicitly.
    - Don't add a custom \`title\`.
    - Don't build large story-specific harnesses — fix preview instead.
    - Don't create new app components.

    **Substep b — add the single \`CssCheck\` story.** Before you finish this step, pick **one** visually distinctive component from the files you just wrote and add a \`CssCheck\` export to that file. Exactly **one** \`CssCheck\` across the whole project — not one per file. This step is not complete until the story exists.

    Why it's mandatory: \`toBeVisible\` passes on an unstyled component. A concrete \`getComputedStyle\` value is the only proof that the shared preview actually loaded the app's CSS — without it, you have no idea whether your stories are rendering correctly.

    How: read a real styling value from the component's source (e.g. a hex color in styled-components, a Tailwind class like \`bg-blue-600\`, a CSS variable from the theme), and assert the resolved \`getComputedStyle\` value:

    \`\`\`${tsx}
    export const CssCheck: Story = {
      args: { children: 'Submit' },
      play: async ({ canvas }) => {
        const button = canvas.getByRole('button', { name: /submit/i });
        // PrimaryButton uses bg-blue-600 — fails if Tailwind / global CSS did not load.
        await expect(getComputedStyle(button).backgroundColor).toBe('rgb(37, 99, 235)');
      },
    };
    \`\`\`
    `
  };
}
function writeStoriesWithAllowedFailuresStep(projectInfo, { tsx }) {
  return {
    title: "Write up to 10 story files (in one batch)",
    body: import_ts_dedent3.dedent`

    This step has **two required deliverables**:

    a. Up to 10 colocated \`*.stories.${tsx}\` files for meaningful targets in the codebase.
    b. **Exactly one \`CssCheck\` story** added to one of those files (spec below). This step is not complete without it.

    **Substep a — pick targets and write the files.** Pick ~10 meaningful targets from the real codebase (low-level reusable → page components). Skip subcomponents, hooks, contexts, helpers, and \`App\` itself when real page components exist.

    Each story file: ~3 exports for typical components, up to ~10 when warranted by real usage. Copy JSX patterns from real pages/routes/tests.

    **Tag every new story file with \`['ai-generated', 'needs-work']\` from the start.** You will remove \`'needs-work'\` only after vitest confirms the file passes, and you will leave the tag if the file is not fully functional at the end of your self-healing loop.

    ${getStoryExample(projectInfo)}

    Story rules:

    - Start every meta with \`tags: ['ai-generated', 'needs-work']\`.
    - Show all imports explicitly.
    - Don't add a custom \`title\`.
    - Don't build large story-specific harnesses — fix preview instead.
    - Don't create new app components.

    **Substep b — add the single \`CssCheck\` story.** Before you finish this step, pick **one** visually distinctive component from the files you just wrote and add a \`CssCheck\` export to that file. Exactly **one** \`CssCheck\` across the whole project — not one per file. This step is not complete until the story exists.

    Why it's mandatory: \`toBeVisible\` passes on an unstyled component. A concrete \`getComputedStyle\` value is the only proof that the shared preview actually loaded the app's CSS — without it, you have no idea whether your stories are rendering correctly.

    How: read a real styling value from the component's source (e.g. a hex color in styled-components, a Tailwind class like \`bg-blue-600\`, a CSS variable from the theme), and assert the resolved \`getComputedStyle\` value:

    \`\`\`${tsx}
    export const CssCheck: Story = {
      args: { children: 'Submit' },
      play: async ({ canvas }) => {
        const button = canvas.getByRole('button', { name: /submit/i });
        // PrimaryButton uses bg-blue-600 — fails if Tailwind / global CSS did not load.
        await expect(getComputedStyle(button).backgroundColor).toBe('rgb(37, 99, 235)');
      },
    };
    \`\`\`
    `
  };
}
function interactionPlayStep(projectInfo, { tsx }) {
  return {
    title: "Add `play` functions only where they prove something non-trivial",
    body: import_ts_dedent3.dedent`
    **Do not put a \`play\` on every story.** A \`play\` is worth writing only when it asserts something the rendered output alone doesn't already prove. Prefer one good \`play\` per file over five redundant ones.

    Write a \`play\` when it can verify:

    - an **interaction** (form fill + submit, click → menu opens, tab change reveals panel)
    - **async data** actually arrived from MSW (waiting for mocked content to replace a spinner)
    - a **portal** rendered into the right root (query via \`canvasElement.ownerDocument\`)
    - a **CSS-driven state** that matters semantically (e.g. theme color, disabled styling, layout that confirms the global stylesheet loaded)
    - **accessibility** that the component is responsible for (correct role/label exposure)

    **Skip \`play\` entirely** when a story is just a static variant of the same component (different \`args\`, no new behavior). Repeating \`getByRole(...).toBeVisible()\` across \`Clear\`, \`Large\`, \`WithIcon\` etc. is redundant — the render itself already fails the test if the component throws or doesn't mount.

    **Smoke plays must prove something the render alone doesn't.** A play that does only \`await expect(canvas.getByRole('button')).toBeVisible()\` adds nothing — the render already failed if the button didn't mount. Acceptable smoke plays assert one of:

    - an **aria attribute reflecting state** (\`aria-expanded\`, \`aria-disabled\`, \`aria-checked\`, \`aria-current\`)
    - a **prop value rendered as text or attribute** (e.g. \`args.label\` appears in the DOM, \`href\` matches \`args.to\`)
    - **async content arriving** (\`findBy*\`, \`waitFor\` — proves the loader/MSW handler actually resolved)
    - a **portal mounting in the right root** (queried via \`canvasElement.ownerDocument.body\`)

    If none of those apply, skip the \`play\` and rely on the render itself.

    Concretely, in a \`Button.stories.${tsx}\` with \`Primary\`, \`Clear\`, \`Large\`, \`WithIcon\`:

    - \`Primary\` — keep one smoke \`play\` (one is enough for the file).
    - \`Clear\`, \`Large\`, \`WithIcon\` — **no \`play\`**. They're variant-only stories.

    (The single \`CssCheck\` story for the whole project was added in Step 5 — don't add another one here.)

    Imports & play context — get this right or vitest will fail in subtle ways:

    - \`expect\` and \`waitFor\` come from \`'storybook/test'\` — import those.
    - \`canvas\`, \`userEvent\`, and \`canvasElement\` come from the **play arguments**: \`async ({ canvas, userEvent, canvasElement }) => { ... }\`. **Do not** \`import { userEvent } from 'storybook/test'\` and **do not** write \`const canvas = within(canvasElement)\` — both are already provided.
    - For **portal queries only**, query via \`canvasElement.ownerDocument.body\`. You may import \`within\` from \`'storybook/test'\` for that case (e.g. \`within(canvasElement.ownerDocument.body).findByTestId(...)\`). Don't use \`within\` for anything else.

    ${getInteractionPlayExample(projectInfo)}`
  };
}

// src/cli/ai/setup-prompts/partials/rules.ts
var import_ts_dedent4 = __toESM(require_dist(), 1);
function toolsVsShellRule(ctx) {
  return import_ts_dedent4.dedent`**Discover with Glob/Grep/Read, not shell.** Never use \`ls\`, \`find\`, \`cat\`, \`head\`, \`tail\`, shell \`grep\`, \`sed\`, or \`node -e\` for discovery or for editing files in bulk — these are slower per call and violate caching. Substitute bash commands for the specific tool names listed below, or available tools with the closest semantics:
    - List a directory → \`Glob('src/components/*')\` (alt names: \`search_files\`, \`file_search\`), not \`ls src/components\`.
    - Search a string → \`Grep('pattern', { path: 'src' })\` (alt names: \`grep_search\`, \`search_files\`), not \`grep -rn ...\` or \`find ... | xargs grep\`.
    - Read a file → \`Read('path/to/file')\` (alt names: \`read_file\`), not \`cat\`/\`head\`/\`tail\`.
    - Bulk-edit many files → multiple \`Edit\` calls (alt names: \`apply_patch\`, \`replace_in_file\`, \`replace\`), or one \`Edit\` with \`replace_all\` (alt names: \`replace\` with \`allow_multiple\`), not \`sed -i\`.`;
}
function nodeModuleReadsRule(ctx) {
  return import_ts_dedent4.dedent`**Never read or grep inside \`node_modules\`.** The imports shown in this prompt are correct — don't verify them by introspecting installed packages. If something seems off, re-read this prompt, not \`node_modules\`.`;
}
function monorepoRule(ctx) {
  let monorepoType = getMonorepoType();
  if (monorepoType)
    return `**${monorepoType} monorepo.** Don't initially look for config or existing Storybook content in other packages. Start exploring from config and tooling local to the package where you are asked to set up Storybook. If it uses local monorepo dependencies, build all dependencies found during discovery before writing stories or running tests.`;
}
function packageManagerRule({
  packageManager,
  packageManagerName
}) {
  let storybookCmd = packageManager.getPackageCommand(["storybook"]);
  return packageManagerName ? import_ts_dedent4.dedent`**Use \`${packageManagerName}\` for installs and \`${storybookCmd}\` for Storybook/Vitest CLI commands** (detected from this project's lockfile). Do not use \`npx\` — it invokes npm and fails when the repo enforces a different package manager.` : import_ts_dedent4.dedent`**Detect the package manager once** from the lockfile (\`pnpm-lock.yaml\` → pnpm, \`yarn.lock\` → yarn, \`bun.lockb\` → bun, otherwise npm) and use it for every install and CLI command in this trial. Do not use \`npx\` when the project uses pnpm, yarn, or bun.`;
}
function editOverWriteRule({ configDir, tsx }) {
  return import_ts_dedent4.dedent`**Edit > Write.** For any file you've Read, use \`Edit\`. Use \`Write\` only for new files. The project already has a \`${configDir}/preview.${tsx}\` from \`storybook init\` — **Edit** it, do not overwrite.`;
}
function batchTestsRule(ctx) {
  return import_ts_dedent4.dedent`**Batch the test loop.** Write **all** stories first, then run vitest **once** across everything. No per-file vitest runs until after that first batch run reveals failures.`;
}
function readBudgetRule(ctx) {
  return import_ts_dedent4.dedent`**Read budget: ~12 files for discovery.** Before writing any code you may Read at most ~12 files (\`index.html\`, entry, App, providers, routing, root CSS, 2–3 representative pages/components, 1–2 hooks, 1 test). If you need more, summarize and move on.`;
}
function readBudgetRuleRelaxed(ctx) {
  return import_ts_dedent4.dedent`**Read budget: ~40 files for discovery.** Before writing any code you may Read at most ~40 files: \`index.html\`, entry, App, providers, routing, root CSS, 1–2 hooks, 1 test, and spend the rest on components. You may read direct component dependencies essential to their understanding only after having read 20 components (or all components if fewer in the codebase).`;
}
function preferSharedFixesRule({
  configDir,
  tsx
}) {
  return import_ts_dedent4.dedent`**Prefer fixing the shared \`${configDir}/preview.${tsx}\`** over story-local workarounds when multiple stories fail the same way.`;
}
function noPolishRule(ctx) {
  return import_ts_dedent4.dedent`**Stop when the success criteria are met** — don't keep polishing.`;
}

// src/cli/ai/setup-prompts/partials/dod.ts
var import_ts_dedent5 = __toESM(require_dist(), 1);
import { getVitestStorybookRunCommand as getVitestStorybookRunCommand2 } from "storybook/internal/common";
function cssCheckDOD(ctx) {
  return import_ts_dedent5.dedent`**Exactly one \`CssCheck\` story exists** somewhere in the new stories, asserting a concrete computed style value read from the component's source.`;
}
function storyTagsV1DOD(ctx) {
  return import_ts_dedent5.dedent`Every story file you wrote that vitest confirmed passing has had \`'needs-work'\` stripped, leaving \`tags: ['ai-generated']\`. Anything still failing keeps \`['ai-generated', 'needs-work']\`.`;
}
function storyTagsV2DOD(ctx) {
  return import_ts_dedent5.dedent`Every story file that passes vitest tests has had \`'needs-work'\` stripped, leaving \`tags: ['ai-generated']\`. Story files with vitest failures keep \`['ai-generated', 'needs-work']\`.`;
}
function vitestPassesStrictDOD({ packageManager }) {
  return import_ts_dedent5.dedent`\`${getVitestStorybookRunCommand2(packageManager)}\` passes for the new files.`;
}
function vitestPassesWhenExpectedDOD({ packageManager }) {
  return import_ts_dedent5.dedent`\`${getVitestStorybookRunCommand2(packageManager)}\` passes for the new files that don't have \`'needs-work'\` in their tags. Files with \`'needs-work'\` may still fail.`;
}
function typeCheckPassesStrictDOD(ctx) {
  return import_ts_dedent5.dedent`The project's TypeScript check passes for changed files.`;
}
function typeCheckPassesWhenExpectedDOD(ctx) {
  return import_ts_dedent5.dedent`The project's TypeScript check passes for the new files that don't have \`'needs-work'\` in their tags. Files with \`'needs-work'\` may still fail.`;
}
function sharedPreviewDOD(ctx) {
  return import_ts_dedent5.dedent`The shared preview is strong enough that stories don't need per-story fetch/provider workarounds.`;
}

export {
  ext,
  listRules,
  listSteps,
  listDOD,
  discoveryStepStrict,
  discoveryStepRelaxed,
  verifyStep,
  verifyWithAllowedFailureStep,
  cleanupStep,
  monorepoStep,
  buildSharedPreviewStep,
  buildPortalStep,
  mswStep,
  writeStoriesStep,
  writeStoriesWithAllowedFailuresStep,
  interactionPlayStep,
  toolsVsShellRule,
  nodeModuleReadsRule,
  monorepoRule,
  packageManagerRule,
  editOverWriteRule,
  batchTestsRule,
  readBudgetRule,
  readBudgetRuleRelaxed,
  preferSharedFixesRule,
  noPolishRule,
  cssCheckDOD,
  storyTagsV1DOD,
  storyTagsV2DOD,
  vitestPassesStrictDOD,
  vitestPassesWhenExpectedDOD,
  typeCheckPassesStrictDOD,
  typeCheckPassesWhenExpectedDOD,
  sharedPreviewDOD
};
