/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { Metafile } from 'esbuild';
import { NormalizedApplicationBuildOptions } from '../../builders/application/options';
import { type BuildOutputFile } from '../../tools/esbuild/bundler-files';
export declare const SERVER_APP_MANIFEST_FILENAME = "angular-app-manifest.mjs";
export declare const SERVER_APP_ENGINE_MANIFEST_FILENAME = "angular-app-engine-manifest.mjs";
/**
 * A set of server-generated dependencies that are treated as external.
 *
 * These dependencies are marked as external because they are produced by a
 * separate bundling process and are not included in the primary bundle. This
 * ensures that these generated files are resolved from an external source rather
 * than being part of the main bundle.
 */
export declare const SERVER_GENERATED_EXTERNALS: Set<string>;
/**
 * Generates the server manifest for the App Engine environment.
 *
 * This manifest is used to configure the server-side rendering (SSR) setup for the
 * Angular application when deployed to Google App Engine. It includes the entry points
 * for different locales and the base HREF for the application.
 *
 * @param i18nOptions - The internationalization options for the application build. This
 * includes settings for inlining locales and determining the output structure.
 * @param allowedHosts - A list of hosts that are allowed to access the server-side application.
 * @param baseHref - The base HREF for the application. This is used to set the base URL
 * for all relative URLs in the application.
 */
export declare function generateAngularServerAppEngineManifest(i18nOptions: NormalizedApplicationBuildOptions['i18nOptions'], allowedHosts: string[], baseHref: string | undefined): string;
/**
 * Generates the server manifest for the standard Node.js environment.
 *
 * This manifest is used to configure the server-side rendering (SSR) setup for the
 * Angular application when running in a standard Node.js environment. It includes
 * information about the bootstrap module, whether to inline critical CSS, and any
 * additional HTML and CSS output files.
 *
 * @param additionalHtmlOutputFiles - A map of additional HTML output files generated
 * during the build process, keyed by their file paths.
 * @param outputFiles - An array of all output files from the build process, including
 * JavaScript and CSS files.
 * @param inlineCriticalCss - A boolean indicating whether critical CSS should be inlined
 * in the server-side rendered pages.
 * @param routes - An optional array of route definitions for the application, used for
 * server-side rendering and routing.
 * @param locale - An optional string representing the locale or language code to be used for
 * the application, helping with localization and rendering content specific to the locale.
 * @param baseHref - The base HREF for the application. This is used to set the base URL
 * for all relative URLs in the application.
 * @param initialFiles - A list of initial files that preload tags have already been added for.
 * @param metafile - An esbuild metafile object.
 * @param publicPath - The configured public path.
 *
 * @returns An object containing:
 * - `manifestContent`: A string of the SSR manifest content.
 * - `serverAssetsChunks`: An array of build output files containing the generated assets for the server.
 */
export declare function generateAngularServerAppManifest(additionalHtmlOutputFiles: Map<string, BuildOutputFile>, outputFiles: BuildOutputFile[], inlineCriticalCss: boolean, routes: readonly unknown[] | undefined, locale: string | undefined, baseHref: string, initialFiles: Set<string>, metafile: Metafile, publicPath: string | undefined): {
    manifestContent: string;
    serverAssetsChunks: BuildOutputFile[];
};
