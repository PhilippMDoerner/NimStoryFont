/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { PathManipulation } from '@angular/compiler-cli/private/localize';
import { ɵParsedTranslation } from '../../../../index';
import { PluginObj } from '@babel/core';
import { Diagnostics } from '../../diagnostics';
import { TranslatePluginOptions } from '../../source_file_utils';
/**
 * Create a Babel plugin that can be used to do compile-time translation of `$localize` tagged
 * messages.
 *
 * @publicApi used by CLI
 */
export declare function makeEs2015TranslatePlugin(diagnostics: Diagnostics, translations: Record<string, ɵParsedTranslation>, { missingTranslation, localizeName }?: TranslatePluginOptions, fs?: PathManipulation): PluginObj;
