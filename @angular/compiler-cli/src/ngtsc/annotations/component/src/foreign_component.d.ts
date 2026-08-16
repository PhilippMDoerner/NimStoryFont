/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { SelectorlessMatcher } from '@angular/compiler';
import ts from 'typescript';
import { ParsedTemplateWithSource } from './resources';
import { ForeignComponentMeta } from '../../../metadata';
/**
 * Analyzes the template for invalid use of features relating to foreign components.
 *
 * @param template The template to analyze.
 * @param foreignMatcher A matcher that can be used to identify foreign components.
 * @returns A list of diagnostics that should be reported for the template.
 */
export declare function analyzeForeignComponentFeatures(template: ParsedTemplateWithSource, foreignMatcher: SelectorlessMatcher<ForeignComponentMeta> | null): ts.Diagnostic[];
