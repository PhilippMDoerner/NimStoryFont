import * as i0 from '@angular/core';
import { Pipe, NgModule } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

class FormlySelectOptionsPipe {
    transform(options, field) {
        if (!(options instanceof Observable)) {
            options = this.observableOf(options, field);
        }
        else {
            this.dispose();
        }
        return options.pipe(map((value) => this.transformOptions(value, field)));
    }
    ngOnDestroy() {
        this.dispose();
    }
    transformOptions(options, field) {
        const to = this.transformSelectProps(field);
        const opts = [];
        const groups = {};
        options?.forEach((option) => {
            const o = this.transformOption(option, to);
            if (o.group) {
                const id = groups[o.label];
                if (id === undefined) {
                    groups[o.label] = opts.push(o) - 1;
                }
                else {
                    o.group.forEach((o) => opts[id].group.push(o));
                }
            }
            else {
                opts.push(o);
            }
        });
        return opts;
    }
    transformOption(option, props) {
        const group = props.groupProp(option);
        if (Array.isArray(group)) {
            return {
                label: props.labelProp(option),
                group: group.map((opt) => this.transformOption(opt, props)),
            };
        }
        option = {
            label: props.labelProp(option),
            value: props.valueProp(option),
            disabled: !!props.disabledProp(option),
        };
        if (group) {
            return { label: group, group: [option] };
        }
        return option;
    }
    transformSelectProps(field) {
        const props = field?.props || field?.templateOptions || {};
        const selectPropFn = (prop) => (typeof prop === 'function' ? prop : (o) => o[prop]);
        return {
            groupProp: selectPropFn(props.groupProp || 'group'),
            labelProp: selectPropFn(props.labelProp || 'label'),
            valueProp: selectPropFn(props.valueProp || 'value'),
            disabledProp: selectPropFn(props.disabledProp || 'disabled'),
        };
    }
    dispose() {
        if (this._options) {
            this._options.complete();
            this._options = null;
        }
        if (this._subscription) {
            this._subscription.unsubscribe();
            this._subscription = null;
        }
    }
    observableOf(options, f) {
        this.dispose();
        if (f && f.options && f.options.fieldChanges) {
            this._subscription = f.options.fieldChanges
                .pipe(filter(({ property, type, field }) => {
                return (type === 'expressionChanges' &&
                    (property.indexOf('templateOptions.options') === 0 || property.indexOf('props.options') === 0) &&
                    field === f &&
                    Array.isArray(field.props.options) &&
                    !!this._options);
            }), tap(() => this._options.next(f.props.options)))
                .subscribe();
        }
        this._options = new BehaviorSubject(options);
        return this._options.asObservable();
    }
}
FormlySelectOptionsPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlySelectOptionsPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
FormlySelectOptionsPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlySelectOptionsPipe, name: "formlySelectOptions" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlySelectOptionsPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'formlySelectOptions' }]
        }] });

class FormlySelectModule {
}
FormlySelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlySelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormlySelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlySelectModule, declarations: [FormlySelectOptionsPipe], exports: [FormlySelectOptionsPipe] });
FormlySelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlySelectModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlySelectModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [FormlySelectOptionsPipe],
                    exports: [FormlySelectOptionsPipe],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { FormlySelectModule, FormlySelectOptionsPipe };
//# sourceMappingURL=ngx-formly-core-select.mjs.map
