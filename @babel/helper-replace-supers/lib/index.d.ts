import { NodePath, types, File } from '@babel/core';

type ReplaceSupersOptions = {
    methodPath: NodePath<types.ClassMethod | types.ClassProperty | types.ObjectMethod | types.ClassPrivateMethod | types.ClassPrivateProperty | types.StaticBlock>;
    constantSuper?: boolean;
    file: File;
    refToPreserve?: types.Identifier | null;
    objectRef?: types.Expression | undefined;
    getObjectRef?: () => types.Expression;
    superRef?: types.Expression | null;
    getSuperRef?: () => types.Expression;
};
declare class ReplaceSupers {
    constructor(opts: ReplaceSupersOptions);
    opts: ReplaceSupersOptions;
    replace(): void;
}

export { ReplaceSupers as default };
