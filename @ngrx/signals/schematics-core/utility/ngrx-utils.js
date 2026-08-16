"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReducerToState = addReducerToState;
exports.addReducerToStateInterface = addReducerToStateInterface;
exports.addReducerToActionReducerMap = addReducerToActionReducerMap;
exports.addReducerImportToNgModule = addReducerImportToNgModule;
exports.omit = omit;
exports.getPrefix = getPrefix;
const ts = __importStar(require("typescript"));
const stringUtils = __importStar(require("./strings"));
const change_1 = require("./change");
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const find_module_1 = require("./find-module");
const ast_utils_1 = require("./ast-utils");
function addReducerToState(options) {
    return (host) => {
        if (!options.reducers) {
            return host;
        }
        const reducersPath = (0, core_1.normalize)(`/${options.path}/${options.reducers}`);
        if (!host.exists(reducersPath)) {
            throw new Error(`Specified reducers path ${reducersPath} does not exist`);
        }
        const text = host.read(reducersPath);
        if (text === null) {
            throw new schematics_1.SchematicsException(`File ${reducersPath} does not exist.`);
        }
        const sourceText = text.toString('utf-8');
        const source = ts.createSourceFile(reducersPath, sourceText, ts.ScriptTarget.Latest, true);
        const reducerPath = `/${options.path}/` +
            (options.flat ? '' : stringUtils.dasherize(options.name) + '/') +
            (options.group ? 'reducers/' : '') +
            stringUtils.dasherize(options.name) +
            '.reducer';
        const relativePath = (0, find_module_1.buildRelativePath)(reducersPath, reducerPath);
        const reducerImport = (0, ast_utils_1.insertImport)(source, reducersPath, `* as from${stringUtils.classify(options.name)}`, relativePath, true);
        const stateInterfaceInsert = addReducerToStateInterface(source, reducersPath, options);
        const reducerMapInsert = addReducerToActionReducerMap(source, reducersPath, options);
        const changes = [reducerImport, stateInterfaceInsert, reducerMapInsert];
        const recorder = host.beginUpdate(reducersPath);
        for (const change of changes) {
            if (change instanceof change_1.InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
/**
 * Insert the reducer into the first defined top level interface
 */
function addReducerToStateInterface(source, reducersPath, options) {
    const stateInterface = source.statements.find((stm) => stm.kind === ts.SyntaxKind.InterfaceDeclaration);
    let node = stateInterface;
    if (!node) {
        return new change_1.NoopChange();
    }
    const state = options.plural
        ? stringUtils.pluralize(options.name)
        : stringUtils.camelize(options.name);
    const keyInsert = `[from${stringUtils.classify(options.name)}.${stringUtils.camelize(state)}FeatureKey]: from${stringUtils.classify(options.name)}.State;`;
    const expr = node;
    let position;
    let toInsert;
    if (expr.members.length === 0) {
        position = expr.getEnd() - 1;
        toInsert = `  ${keyInsert}\n`;
    }
    else {
        node = expr.members[expr.members.length - 1];
        position = node.getEnd() + 1;
        // Get the indentation of the last element, if any.
        const text = node.getFullText(source);
        const matches = text.match(/^\r?\n+(\s*)/);
        if (matches && matches.length > 0) {
            toInsert = `${matches[1]}${keyInsert}\n`;
        }
        else {
            toInsert = `\n${keyInsert}`;
        }
    }
    return new change_1.InsertChange(reducersPath, position, toInsert);
}
/**
 * Insert the reducer into the ActionReducerMap
 */
function addReducerToActionReducerMap(source, reducersPath, options) {
    let initializer;
    const actionReducerMap = source.statements
        .filter((stm) => stm.kind === ts.SyntaxKind.VariableStatement)
        .filter((stm) => !!stm.declarationList)
        .map((stm) => {
        const { declarations, } = stm.declarationList;
        const variable = declarations.find((decl) => decl.kind === ts.SyntaxKind.VariableDeclaration);
        const type = variable ? variable.type : {};
        return { initializer: variable.initializer, type };
    })
        .filter((initWithType) => initWithType.type !== undefined)
        .find(({ type }) => type.typeName.text === 'ActionReducerMap');
    if (!actionReducerMap || !actionReducerMap.initializer) {
        return new change_1.NoopChange();
    }
    let node = actionReducerMap.initializer;
    const state = options.plural
        ? stringUtils.pluralize(options.name)
        : stringUtils.camelize(options.name);
    const keyInsert = `[from${stringUtils.classify(options.name)}.${stringUtils.camelize(state)}FeatureKey]: from${stringUtils.classify(options.name)}.reducer,`;
    const expr = node;
    let position;
    let toInsert;
    if (expr.properties.length === 0) {
        position = expr.getEnd() - 1;
        toInsert = `  ${keyInsert}\n`;
    }
    else {
        node = expr.properties[expr.properties.length - 1];
        position = node.getEnd() + 1;
        // Get the indentation of the last element, if any.
        const text = node.getFullText(source);
        const matches = text.match(/^\r?\n+(\s*)/);
        if (matches && matches.length > 0) {
            toInsert = `\n${matches[1]}${keyInsert}`;
        }
        else {
            toInsert = `\n${keyInsert}`;
        }
    }
    return new change_1.InsertChange(reducersPath, position, toInsert);
}
/**
 * Add reducer feature to NgModule
 */
function addReducerImportToNgModule(options) {
    return (host) => {
        if (!options.module) {
            return host;
        }
        const modulePath = options.module;
        if (!host.exists(options.module)) {
            throw new Error(`Specified module path ${modulePath} does not exist`);
        }
        const text = host.read(modulePath);
        if (text === null) {
            throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
        }
        const sourceText = text.toString('utf-8');
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        const commonImports = [
            (0, ast_utils_1.insertImport)(source, modulePath, 'StoreModule', '@ngrx/store'),
        ];
        const reducerPath = `/${options.path}/` +
            (options.flat ? '' : stringUtils.dasherize(options.name) + '/') +
            (options.group ? 'reducers/' : '') +
            stringUtils.dasherize(options.name) +
            '.reducer';
        const relativePath = (0, find_module_1.buildRelativePath)(modulePath, reducerPath);
        const reducerImport = (0, ast_utils_1.insertImport)(source, modulePath, `* as from${stringUtils.classify(options.name)}`, relativePath, true);
        const state = options.plural
            ? stringUtils.pluralize(options.name)
            : stringUtils.camelize(options.name);
        const [storeNgModuleImport] = (0, ast_utils_1.addImportToModule)(source, modulePath, `StoreModule.forFeature(from${stringUtils.classify(options.name)}.${state}FeatureKey, from${stringUtils.classify(options.name)}.reducer)`, relativePath);
        const changes = [...commonImports, reducerImport, storeNgModuleImport];
        const recorder = host.beginUpdate(modulePath);
        for (const change of changes) {
            if (change instanceof change_1.InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
function omit(object, keyToRemove) {
    return Object.keys(object)
        .filter((key) => key !== keyToRemove)
        .reduce((result, key) => Object.assign(result, { [key]: object[key] }), {});
}
function getPrefix(options) {
    return stringUtils.camelize(options.prefix || 'load');
}
//# sourceMappingURL=ngrx-utils.js.map