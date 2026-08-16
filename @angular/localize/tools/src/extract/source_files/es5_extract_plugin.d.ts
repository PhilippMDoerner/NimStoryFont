/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { PathManipulation } from '@angular/compiler-cli/private/localize';
import { PluginObject } from '@babel/core';
import { ɵParsedMessage } from '../../../../index';
export declare function makeEs5ExtractPlugin(fs: PathManipulation, messages: ɵParsedMessage[], localizeName?: string): PluginObject;
