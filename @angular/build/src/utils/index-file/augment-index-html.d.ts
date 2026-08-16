/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
export type LoadOutputFileFunctionType = (file: string) => Promise<string>;
export type CrossOriginValue = 'none' | 'anonymous' | 'use-credentials';
export type Entrypoint = [name: string, isModule: boolean];
export interface AugmentIndexHtmlOptions {
    html: string;
    baseHref?: string;
    deployUrl?: string;
    sri: boolean;
    /** crossorigin attribute setting of elements that provide CORS support */
    crossOrigin?: CrossOriginValue;
    files: FileInfo[];
    loadOutputFile: LoadOutputFileFunctionType;
    /** Used to sort the inseration of files in the HTML file */
    entrypoints: Entrypoint[];
    /** Used to set the document default locale */
    lang?: string;
    hints?: {
        url: string;
        mode: string;
        as?: string;
    }[];
    imageDomains?: string[];
    /**
     * Integrity metadata for module script URLs that are not directly referenced
     * from `index.html` (e.g. lazy-loaded chunks resolved via `import()`).
     *
     * Keys are URLs relative to the deployment base (matching how the browser
     * will request the module) and values are the corresponding
     * Subresource Integrity values (e.g. 'sha384-...').
     *
     * Emitted as a `<script type="importmap">` block whose `integrity` map the
     * browser consults when fetching modules without an inline `integrity`
     * attribute. See:
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap#integrity_metadata_map
     */
    chunksIntegrity?: ReadonlyMap<string, string>;
}
export interface FileInfo {
    file: string;
    name?: string;
    extension: string;
}
export declare function augmentIndexHtml(params: AugmentIndexHtmlOptions): Promise<{
    content: string;
    warnings: string[];
    errors: string[];
}>;
