import { TestBed } from '@angular/core/testing';
import * as i0 from '@angular/core';
import { Component } from '@angular/core';
import * as i1 from '@ngx-formly/core';
import { FormlyModule, FormlyFormBuilder } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

function setInputs(fixture, inputs, detectChanges = true) {
    Object.keys(inputs).forEach((input) => {
        fixture.componentInstance[input] = inputs[input];
    });
    if (detectChanges !== false) {
        fixture.detectChanges();
    }
}
function createComponent({ template, inputs, config, detectChanges, imports, declarations, providers, }) {
    TestBed.configureTestingModule({
        declarations: [TestComponent, ...(declarations || [])],
        imports: [ReactiveFormsModule, FormlyModule.forRoot(config), ...(imports || [])],
        providers: providers || [],
        teardown: { destroyAfterEach: false },
    }).overrideComponent(TestComponent, {
        set: {
            template,
            inputs: Object.keys(inputs),
        },
    });
    const fixture = TestBed.createComponent(TestComponent);
    Object.keys(inputs).forEach((input) => {
        fixture.componentInstance[input] = inputs[input];
    });
    setInputs(fixture, inputs, detectChanges);
    const utils = {
        fixture,
        detectChanges: () => fixture.detectChanges(),
        setInputs: (props) => setInputs(fixture, props),
        query: (selector) => fixture.debugElement.query(By.css(selector)),
        queryAll: (selector) => fixture.debugElement.queryAll(By.css(selector)),
    };
    Object.keys(inputs).forEach((input) => {
        Object.defineProperty(utils, input, {
            get: () => fixture.componentInstance[input],
        });
    });
    return utils;
}
function createFieldComponent(field, config = {}) {
    const model = field?.model || {};
    const options = field?.options || {};
    delete field?.model;
    delete field?.options;
    const utils = createComponent({
        template: '<formly-field [field]="field"></formly-field>',
        inputs: { field },
        ...config,
        detectChanges: false,
    });
    const builder = utils.fixture.componentRef.instance.builder;
    builder.build({ model, options, fieldGroup: [field] });
    utils.detectChanges();
    const setInputs = utils.setInputs;
    utils.setInputs = (props) => {
        if (props.field) {
            builder.build(props.field);
        }
        setInputs(props);
    };
    return utils;
}
class TestComponent {
    constructor(builder) {
        this.builder = builder;
    }
}
TestComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TestComponent, deps: [{ token: i1.FormlyFormBuilder }], target: i0.ɵɵFactoryTarget.Component });
TestComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TestComponent, selector: "formly-test-component", providers: [FormlyFormBuilder], ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TestComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-test-component',
                    template: '',
                    providers: [FormlyFormBuilder],
                }]
        }], ctorParameters: function () { return [{ type: i1.FormlyFormBuilder }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { createComponent, createFieldComponent };
//# sourceMappingURL=ngx-formly-core-testing.mjs.map
