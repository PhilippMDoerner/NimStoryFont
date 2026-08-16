/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { BrowserBuiltinProvider, BrowserConfigOptions, BrowserProviderOption } from 'vitest/node';
export interface BrowserConfiguration {
    browser?: BrowserConfigOptions;
    errors?: string[];
    messages?: string[];
}
export interface BrowserInstanceConfiguration {
    browser: string;
    headless: boolean;
    provider?: BrowserProviderOption;
}
export declare function normalizeBrowserName(browserName: string): BrowserInstanceConfiguration;
/**
 * Mutates the provided browser instances to apply standard headless execution
 * constraints based on the chosen provider, user options, and CI environment presence.
 *
 * @param instances The normalized browser instances to mutate.
 * @param providerName The identifier for the chosen Vitest browser provider.
 * @param headless The user-provided headless configuration option.
 * @param isCI Whether the current environment is running in CI.
 * @returns An array of informational messages generated during evaluation.
 */
export declare function applyHeadlessConfiguration(instances: BrowserInstanceConfiguration[], providerName: BrowserBuiltinProvider | undefined, headless: boolean | undefined, isCI: boolean): string[];
/**
 * Resolves and configures the Vitest browser provider for the unit test builder.
 * Dynamically discovers and imports the necessary provider (Playwright, WebdriverIO, or Preview),
 * maps the requested browser instances, and applies environment-specific execution logic.
 *
 * @param browsers An array of requested browser names (e.g., 'chrome', 'firefox').
 * @param headless User-provided configuration for headless execution.
 * @param debug Whether the builder is running in watch or debug mode.
 * @param projectSourceRoot The root directory of the project being tested for resolving installed packages.
 * @param viewport Optional viewport dimensions to apply to the launched browser instances.
 * @returns A fully resolved Vitest browser configuration object alongside any generated warning or error messages.
 */
export declare function setupBrowserConfiguration(browsers: string[] | undefined, headless: boolean | undefined, debug: boolean, projectSourceRoot: string, viewport: {
    width: number;
    height: number;
} | undefined): Promise<BrowserConfiguration>;
