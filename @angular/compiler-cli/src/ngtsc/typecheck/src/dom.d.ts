/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { DomElementSchemaRegistry, DomSchemaChecker, ParseSourceSpan, SchemaMetadata, TmplAstHostElement, TypeCheckId } from '@angular/compiler';
import { TemplateDiagnostic } from '../api';
import { TypeCheckSourceResolver } from './tcb_util';
export declare const REGISTRY: DomElementSchemaRegistry;
/**
 * Checks non-Angular elements and properties against the `DomElementSchemaRegistry`, a schema
 * maintained by the Angular team via extraction from a browser IDL.
 */
export declare class RegistryDomSchemaChecker implements DomSchemaChecker<TemplateDiagnostic> {
    private resolver;
    private _diagnostics;
    get diagnostics(): ReadonlyArray<TemplateDiagnostic>;
    constructor(resolver: TypeCheckSourceResolver);
    checkElement(id: TypeCheckId, tagName: string, sourceSpanForDiagnostics: ParseSourceSpan, schemas: SchemaMetadata[], hostIsStandalone: boolean): void;
    checkTemplateElementProperty(id: TypeCheckId, tagName: string, name: string, span: ParseSourceSpan, schemas: SchemaMetadata[], hostIsStandalone: boolean): void;
    checkHostElementProperty(id: TypeCheckId, element: TmplAstHostElement, name: string, span: ParseSourceSpan, schemas: SchemaMetadata[]): void;
}
