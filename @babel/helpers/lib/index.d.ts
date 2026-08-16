import * as t from '@babel/types';

type GetDependency = (name: string) => t.Expression;
type AdjustAst = (ast: t.Program, exportName: string, mapExportBindingAssignments: (map: (node: t.Expression) => t.Expression) => void) => void;
declare function get(name: string, getDependency?: GetDependency, bindingName?: string, localBindings?: string[], adjustAst?: AdjustAst): {
    nodes: t.Program["body"];
    globals: string[];
};
declare function minVersion(name: string): string;
declare function getDependencies(name: string): readonly string[];
declare function isInternal(name: string): boolean;
declare const list: string[];

export { get as default, get, getDependencies, isInternal, list, minVersion };
