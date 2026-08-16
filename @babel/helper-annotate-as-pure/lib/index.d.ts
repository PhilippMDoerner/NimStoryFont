import { Node } from '@babel/types';

declare function annotateAsPure(pathOrNode: Node | {
    node: Node;
}): void;

export { annotateAsPure as default };
