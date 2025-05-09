import { FormlyFieldConfigCache } from '../../models';
import { FormlyExtension } from '../../models';
export declare class FieldExpressionExtension implements FormlyExtension {
    onPopulate(field: FormlyFieldConfigCache): void;
    postPopulate(field: FormlyFieldConfigCache): void;
    private parseExpressions;
    private checkExpressions;
    private changeDisabledState;
    private changeHideState;
    private evalExpr;
    private emitExpressionChanges;
    private _evalExpressionPath;
}
