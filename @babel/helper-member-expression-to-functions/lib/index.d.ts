import { NodePath, Visitor } from '@babel/traverse';
import * as t from '@babel/types';

declare class AssignmentMemoiser {
    private _map;
    constructor();
    has(key: t.Expression): boolean;
    get(key: t.Expression): t.AssignmentExpression | t.Identifier | undefined;
    set(key: t.Expression, value: t.Identifier, count: number): WeakMap<t.Expression, {
        count: number;
        value: t.Identifier;
    }>;
}
type Member = NodePath<t.OptionalMemberExpression | t.MemberExpression>;
interface Handler<State> {
    memoise?(this: HandlerState<State> & State, member: Member, count: number): void;
    destructureSet(this: HandlerState<State> & State, member: Member): t.Expression;
    boundGet(this: HandlerState<State> & State, member: Member): t.Expression;
    simpleSet?(this: HandlerState<State> & State, member: Member): t.Expression;
    get(this: HandlerState<State> & State, member: Member): t.Expression;
    set(this: HandlerState<State> & State, member: Member, value: t.Expression): t.Expression;
    call(this: HandlerState<State> & State, member: Member, args: t.CallExpression["arguments"]): t.Expression;
    optionalCall(this: HandlerState<State> & State, member: Member, args: t.OptionalCallExpression["arguments"]): t.Expression;
    delete(this: HandlerState<State> & State, member: Member): t.Expression;
}
interface HandlerState<State = object> extends Handler<State> {
    handle(this: HandlerState<State> & State, member: Member, noDocumentAll?: boolean): void;
    memoiser: AssignmentMemoiser;
}
declare function memberExpressionToFunctions<CustomState extends object>(path: NodePath, visitor: Visitor<HandlerState<CustomState> & CustomState>, state: Handler<CustomState> & CustomState): void;

export { type Handler, type HandlerState, memberExpressionToFunctions as default };
