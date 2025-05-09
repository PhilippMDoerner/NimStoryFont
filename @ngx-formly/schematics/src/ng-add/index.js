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
exports.ngAdd = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const ast_1 = require("../../utils/ast");
const schematics_2 = require("@angular/cdk/schematics");
const lib_versions_1 = require("../../utils/lib-versions");
const package_1 = require("../../utils/package");
/**
 * Scaffolds the basics of a Angular Material application, this includes:
 *  - Add Packages to package.json
 *  - Adds pre-built themes to styles.ext
 *  - Adds Browser Animation to app.module
 */
function ngAdd(options) {
    return (0, schematics_1.chain)([
        options && options.skipPackageJson ? (0, schematics_1.noop)() : addFormlyToPackageJson(),
        addFormlyModuleConfig(options),
        options && options.uiTheme ? addUITheme(options) : (0, schematics_1.noop)(),
    ]);
}
exports.ngAdd = ngAdd;
/** Add @angular/forms, @ngx-formly/core to package.json if not already present. */
function addFormlyToPackageJson() {
    return (host, context) => {
        (0, package_1.addPackageToPackageJson)(host, 'dependencies', '@angular/forms', lib_versions_1.angularVersion);
        (0, package_1.addPackageToPackageJson)(host, 'dependencies', '@ngx-formly/core', lib_versions_1.ngxFormlyVersion);
        context.addTask(new tasks_1.NodePackageInstallTask());
        return host;
    };
}
/** Add formly module to the relative module */
function addFormlyModuleConfig(options) {
    return (host) => __awaiter(this, void 0, void 0, function* () {
        const modulePath = (yield (0, ast_1.findModuleFromOptions)(host, options));
        (0, schematics_2.addModuleImportToModule)(host, modulePath, 'FormlyModule.forRoot()', '@ngx-formly/core');
        (0, schematics_2.addModuleImportToModule)(host, modulePath, 'ReactiveFormsModule', '@angular/forms');
    });
}
/** Add UI module to app.module */
function addUITheme(options) {
    return (host) => __awaiter(this, void 0, void 0, function* () {
        const modulePath = yield (0, ast_1.findModuleFromOptions)(host, options);
        const uiTheme = options.uiTheme;
        if (uiTheme) {
            (0, package_1.addPackageToPackageJson)(host, 'dependencies', `@ngx-formly/${uiTheme}`, lib_versions_1.ngxFormlyVersion);
            (0, schematics_2.addModuleImportToModule)(host, modulePath, `Formly${mapUIName(uiTheme)}Module`, `@ngx-formly/${uiTheme}`);
        }
    });
}
// @TODO: available themes should probably be moved to some config file
function mapUIName(uiTheme) {
    const uiMap = {
        bootstrap: 'Bootstrap',
        material: 'Material',
        nativescript: 'Nativescript',
        ionic: 'Ionic',
        primeng: 'PrimeNG',
        kendo: 'Kendo',
        'ng-zorro-antd': 'NgZorroAntd',
    };
    return uiMap[uiTheme];
}
//# sourceMappingURL=index.js.map