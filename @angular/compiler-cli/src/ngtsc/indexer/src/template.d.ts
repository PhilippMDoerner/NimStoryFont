import { DeclarationNode } from '../../reflection';
import { AbstractBoundTemplate, TopLevelIdentifier } from './api';
/**
 * Traverses a template AST and builds identifiers discovered in it.
 *
 * @param boundTemplate bound template target, which can be used for querying expression targets.
 * @return identifiers in template
 */
export declare function getTemplateIdentifiers<T = DeclarationNode>(boundTemplate: AbstractBoundTemplate<T>): {
    identifiers: Set<TopLevelIdentifier<T>>;
    errors: Error[];
};
