/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ErrorCode } from '../../../diagnostics';
/**
 * Base URL for the extended error details page.
 *
 * Keep the files below in full sync:
 *  - packages/compiler-cli/src/ngtsc/diagnostics/src/error_details_base_url.ts
 *  - packages/core/src/error_details_base_url.ts
 */
export declare const EXTENDED_ERROR_DETAILS_PAGE_BASE_URL: string;
export declare function formatExtendedError(code: ErrorCode, message: null | false | string): string;
