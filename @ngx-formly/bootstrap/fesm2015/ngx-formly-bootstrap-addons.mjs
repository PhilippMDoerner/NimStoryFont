import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ViewChild, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$1 from '@ngx-formly/core';
import { FieldWrapper, FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

class FormlyWrapperAddons extends FieldWrapper {
    constructor(hostContainerRef) {
        super();
        this.hostContainerRef = hostContainerRef;
    }
    set content(templateRef) {
        if (templateRef && this.hostContainerRef) {
            this.hostContainerRef.createEmbeddedView(templateRef);
        }
    }
    addonRightClick($event) {
        var _a, _b;
        (_b = (_a = this.props.addonRight).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, this.field, $event);
    }
    addonLeftClick($event) {
        var _a, _b;
        (_b = (_a = this.props.addonLeft).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, this.field, $event);
    }
}
FormlyWrapperAddons.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyWrapperAddons, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
FormlyWrapperAddons.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyWrapperAddons, selector: "formly-wrapper-addons", viewQueries: [{ propertyName: "content", first: true, predicate: ["fieldTypeTemplate"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<ng-template #fieldTypeTemplate>\n  <div class=\"input-group\" [class.has-validation]=\"showError\">\n    <div\n      class=\"input-group-text\"\n      *ngIf=\"props.addonLeft\"\n      [class.input-group-btn]=\"props.addonLeft.onClick\"\n      (click)=\"addonLeftClick($event)\"\n    >\n      <i [ngClass]=\"props.addonLeft.class\" *ngIf=\"props.addonLeft.class\"></i>\n      <span *ngIf=\"props.addonLeft.text\">{{ props.addonLeft.text }}</span>\n    </div>\n    <ng-container #fieldComponent></ng-container>\n    <div\n      class=\"input-group-text\"\n      *ngIf=\"props.addonRight\"\n      [class.input-group-btn]=\"props.addonRight.onClick\"\n      (click)=\"addonRightClick($event)\"\n    >\n      <i [ngClass]=\"props.addonRight.class\" *ngIf=\"props.addonRight.class\"></i>\n      <span *ngIf=\"props.addonRight.text\">{{ props.addonRight.text }}</span>\n    </div>\n  </div>\n</ng-template>\n", styles: ["formly-wrapper-form-field .input-group-btn{cursor:pointer}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyWrapperAddons, decorators: [{
            type: Component,
            args: [{ selector: 'formly-wrapper-addons', encapsulation: ViewEncapsulation.None, template: "<ng-template #fieldTypeTemplate>\n  <div class=\"input-group\" [class.has-validation]=\"showError\">\n    <div\n      class=\"input-group-text\"\n      *ngIf=\"props.addonLeft\"\n      [class.input-group-btn]=\"props.addonLeft.onClick\"\n      (click)=\"addonLeftClick($event)\"\n    >\n      <i [ngClass]=\"props.addonLeft.class\" *ngIf=\"props.addonLeft.class\"></i>\n      <span *ngIf=\"props.addonLeft.text\">{{ props.addonLeft.text }}</span>\n    </div>\n    <ng-container #fieldComponent></ng-container>\n    <div\n      class=\"input-group-text\"\n      *ngIf=\"props.addonRight\"\n      [class.input-group-btn]=\"props.addonRight.onClick\"\n      (click)=\"addonRightClick($event)\"\n    >\n      <i [ngClass]=\"props.addonRight.class\" *ngIf=\"props.addonRight.class\"></i>\n      <span *ngIf=\"props.addonRight.text\">{{ props.addonRight.text }}</span>\n    </div>\n  </div>\n</ng-template>\n", styles: ["formly-wrapper-form-field .input-group-btn{cursor:pointer}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['fieldTypeTemplate', { static: true }]
            }] } });

function addonsExtension(field) {
    if (!field.props || (field.wrappers && field.wrappers.indexOf('addons') !== -1)) {
        return;
    }
    if (field.props.addonLeft || field.props.addonRight) {
        field.wrappers = [...(field.wrappers || []), 'addons'];
    }
}

class FormlyBootstrapAddonsModule {
}
FormlyBootstrapAddonsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapAddonsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormlyBootstrapAddonsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapAddonsModule, declarations: [FormlyWrapperAddons], imports: [CommonModule,
        ReactiveFormsModule, i1$1.FormlyModule] });
FormlyBootstrapAddonsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapAddonsModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            FormlyModule.forChild({
                wrappers: [{ name: 'addons', component: FormlyWrapperAddons }],
                extensions: [{ name: 'addons', extension: { postPopulate: addonsExtension } }],
            }),
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapAddonsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [FormlyWrapperAddons],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        FormlyModule.forChild({
                            wrappers: [{ name: 'addons', component: FormlyWrapperAddons }],
                            extensions: [{ name: 'addons', extension: { postPopulate: addonsExtension } }],
                        }),
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { FormlyBootstrapAddonsModule };
//# sourceMappingURL=ngx-formly-bootstrap-addons.mjs.map
