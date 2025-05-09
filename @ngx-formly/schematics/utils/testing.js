"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkspace = exports.getTestProjectPath = void 0;
const defaultWorkspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '6.0.0',
};
const defaultAppOptions = {
    name: 'formly',
    inlineStyle: false,
    inlineTemplate: false,
    viewEncapsulation: 'Emulated',
    routing: false,
    style: 'css',
    skipTests: false,
};
// const defaultModuleOptions = {
//   name: 'foo',
//   spec: true,
//   module: undefined,
//   flat: false,
// };
function getTestProjectPath(workspaceOptions = defaultWorkspaceOptions, appOptions = defaultAppOptions) {
    return `/${workspaceOptions.newProjectRoot}/${appOptions.name}`;
}
exports.getTestProjectPath = getTestProjectPath;
function createWorkspace(schematicRunner, appTree, workspaceOptions = defaultWorkspaceOptions, appOptions = defaultAppOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        appTree = yield schematicRunner
            .runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions)
            .toPromise();
        return yield schematicRunner
            .runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree)
            .toPromise();
    });
}
exports.createWorkspace = createWorkspace;
//# sourceMappingURL=testing.js.map