/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import ts from 'typescript';
import { TemplateDiagnostic } from '../api';
import { TypeCheckSourceResolver } from './tcb_util';
/**
 * Determines if the diagnostic should be reported. Some diagnostics are produced because of the
 * way TCBs are generated; those diagnostics should not be reported as type check errors of the
 * template.
 */
export declare function shouldReportDiagnostic(diagnostic: ts.Diagnostic): boolean;
/**
 * Attempts to translate a TypeScript diagnostic produced during template type-checking to their
 * location of origin, based on the comments that are emitted in the TCB code.
 *
 * If the diagnostic could not be translated, `null` is returned to indicate that the diagnostic
 * should not be reported at all. This prevents diagnostics from non-TCB code in a user's source
 * file from being reported as type-check errors.
 */
export declare function translateDiagnostic(diagnostic: ts.Diagnostic, resolver: TypeCheckSourceResolver): TemplateDiagnostic | null;
