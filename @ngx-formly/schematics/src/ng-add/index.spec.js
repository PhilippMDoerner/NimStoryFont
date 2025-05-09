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
const testing_1 = require("@angular-devkit/schematics/testing");
const path_1 = require("path");
const get_file_content_1 = require("@schematics/angular/utility/test/get-file-content");
const testing_2 = require("../../utils/testing");
describe('ng-add-schematic', () => {
    const COLLECTION_PATH = (0, path_1.join)(__dirname, '../collection.json');
    const projectPath = (0, testing_2.getTestProjectPath)();
    let runner;
    let appTree;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        runner = new testing_1.SchematicTestRunner('schematics', COLLECTION_PATH);
        appTree = yield (0, testing_2.createWorkspace)(runner, appTree);
    }));
    it('should update package.json', () => __awaiter(void 0, void 0, void 0, function* () {
        const tree = yield runner
            .runSchematicAsync('ng-add', {}, appTree)
            .toPromise();
        const packageJson = JSON.parse((0, get_file_content_1.getFileContent)(tree, '/package.json'));
        expect(packageJson.dependencies['@angular/forms']).toBeDefined();
        expect(packageJson.dependencies['@ngx-formly/core']).toBeDefined();
    }));
    it('should not add a theme by default to package.json', () => __awaiter(void 0, void 0, void 0, function* () {
        const tree = yield runner
            .runSchematicAsync('ng-add', {}, appTree)
            .toPromise();
        const packageJson = JSON.parse((0, get_file_content_1.getFileContent)(tree, '/package.json'));
        // @TODO: list of themes should probably be retrieved from some config file
        ['material', 'bootstrap', 'ionic', 'primeng', 'kendo', 'ng-zorro-antd'].forEach(theme => {
            expect(packageJson.dependencies[`@ngx-formly/${theme}`]).toBeUndefined();
        });
    }));
    it('should skip package.json update', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = { skipPackageJson: true };
        const tree = yield runner
            .runSchematicAsync('ng-add', options, appTree)
            .toPromise();
        const packageJson = JSON.parse((0, get_file_content_1.getFileContent)(tree, '/package.json'));
        expect(packageJson.dependencies['@ngx-formly/core']).toBeUndefined();
    }));
    it('should add to root app module', () => __awaiter(void 0, void 0, void 0, function* () {
        const tree = yield runner
            .runSchematicAsync('ng-add', {}, appTree)
            .toPromise();
        const content = tree.readContent(`${projectPath}/src/app/app.module.ts`);
        expect(content).toMatch(
        // eslint-disable-next-line:trailing-comma
        /import { FormlyModule } from '@ngx-formly\/core';/);
        expect(content).toMatch(
        // eslint-disable-next-line:trailing-comma
        /FormlyModule.forRoot/);
        expect(content).toMatch(
        // eslint-disable-next-line:trailing-comma
        /import { ReactiveFormsModule } from '@angular\/forms';/);
        expect(content).toMatch(
        // eslint-disable-next-line:trailing-comma
        /ReactiveFormsModule/);
    }));
    it('should add UI theme to package.json', () => __awaiter(void 0, void 0, void 0, function* () {
        const tree = yield runner
            .runSchematicAsync('ng-add', { uiTheme: 'bootstrap' }, appTree)
            .toPromise();
        const packageJson = JSON.parse((0, get_file_content_1.getFileContent)(tree, '/package.json'));
        expect(packageJson.dependencies['@ngx-formly/bootstrap']).toBeDefined();
    }));
    it('should add UI theme to root app module', () => __awaiter(void 0, void 0, void 0, function* () {
        const tree = yield runner
            .runSchematicAsync('ng-add', { uiTheme: 'bootstrap' }, appTree)
            .toPromise();
        const content = tree.readContent(`${projectPath}/src/app/app.module.ts`);
        expect(content).toMatch(
        // eslint-disable-next-line:trailing-comma
        /import { FormlyBootstrapModule } from '@ngx-formly\/bootstrap';/);
        expect(content).toMatch(
        // eslint-disable-next-line:trailing-comma
        /FormlyBootstrapModule/);
    }));
    it('should add to any module', () => __awaiter(void 0, void 0, void 0, function* () {
        const fooModule = `${projectPath}/src/app/foo.module.ts`;
        appTree.create(fooModule, `
      import { NgModule } from '@angular/core';
      import { CommonModule } from '@angular/common';

      @NgModule({
        imports: [],
        declarations: []
      })
      export class FooModule { }
    `);
        const tree = yield runner
            .runSchematicAsync('ng-add', { module: 'foo.module.ts' }, appTree)
            .toPromise();
        const content = tree.readContent(fooModule);
        expect(content).toMatch(
        // eslint-disable-next-line:trailing-comma
        /import { FormlyModule } from '@ngx-formly\/core';/);
        expect(content).toMatch(
        // eslint-disable-next-line:trailing-comma
        /FormlyModule.forRoot/);
        expect(content).toMatch(
        // eslint-disable-next-line:trailing-comma
        /import { ReactiveFormsModule } from '@angular\/forms';/);
        expect(content).toMatch(
        // eslint-disable-next-line:trailing-comma
        /ReactiveFormsModule/);
    }));
});
//# sourceMappingURL=index.spec.js.map