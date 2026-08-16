/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { TypeCheckBlockMetadata } from '../api';
import { Environment } from './environment';
import { Reference } from '../../imports';
import { TcbGenericContextBehavior, TcbTypeCheckBlockMetadata, TcbComponentMetadata } from '@angular/compiler';
import { ClassDeclaration, ReflectionHost } from '../../reflection';
import ts from 'typescript';
/**
 * Adapts the compiler's `TypeCheckBlockMetadata` (which includes full TS AST nodes)
 * into a purely detached `TcbTypeCheckBlockMetadata` that can be mapped to JSON.
 */
export declare function adaptTypeCheckBlockMetadata(ref: Reference<ClassDeclaration<ts.ClassDeclaration>>, meta: TypeCheckBlockMetadata, env: Environment, reflector: ReflectionHost, genericContextBehavior: TcbGenericContextBehavior): {
    tcbMeta: TcbTypeCheckBlockMetadata;
    component: TcbComponentMetadata;
};
