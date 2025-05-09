/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { PathManipulation } from '@angular/compiler-cli/private/localize';
import { ɵParsedMessage } from '@angular/localize';
import { PluginObj } from '@babel/core';
export declare function makeEs2015ExtractPlugin(fs: PathManipulation, messages: ɵParsedMessage[], localizeName?: string): PluginObj;
