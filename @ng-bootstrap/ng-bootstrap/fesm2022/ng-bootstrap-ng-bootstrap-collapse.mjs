import * as i0 from '@angular/core';
import { inject, Service, ElementRef, NgZone, EventEmitter, Output, Input, Directive, NgModule } from '@angular/core';
import { ngbRunTransition, ngbCollapsingTransition } from './_ngb-ngbootstrap-utilities.mjs';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap/config';

/**
 * A configuration service for the [NgbCollapse](#/components/collapse/api#NgbCollapse) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all collapses used in the application.
 */
class NgbCollapseConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.horizontal = false;
    }
    /**
     * @defaultValue `true`
     */
    get animation() {
        return this._animation ?? this._ngbConfig.animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCollapseConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbCollapseConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCollapseConfig, decorators: [{
            type: Service
        }] });

/**
 * A directive to provide a simple way of hiding and showing elements on the
 * page.
 */
class NgbCollapse {
    constructor() {
        this._config = inject(NgbCollapseConfig);
        this._element = inject(ElementRef);
        this._zone = inject(NgZone);
        /**
         * If `true`, collapse will be animated.
         *
         * Animation is triggered only when clicked on triggering element
         * or via the `.toggle()` function
         *
         * @since 8.0.0
         */
        this.animation = this._config.animation;
        /**
         * Flag used to track if the collapse setter is invoked during initialization
         * or not. This distinction is made in order to avoid running the transition during initialization.
         */
        this._afterInit = false;
        this._isCollapsed = false;
        this.ngbCollapseChange = new EventEmitter();
        /**
         * If `true`, will collapse horizontally.
         *
         * @since 13.1.0
         */
        this.horizontal = this._config.horizontal;
        /**
         * An event emitted when the collapse element is shown, after the transition.
         * It has no payload.
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the collapse element is hidden, after the transition.
         * It has no payload.
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
    }
    /**
     * If `true`, will collapse the element or show it otherwise.
     */
    set collapsed(isCollapsed) {
        if (this._isCollapsed !== isCollapsed) {
            this._isCollapsed = isCollapsed;
            if (this._afterInit) {
                this._runTransitionWithEvents(isCollapsed, this.animation);
            }
        }
    }
    ngOnInit() {
        this._runTransition(this._isCollapsed, false);
        this._afterInit = true;
    }
    /**
     * Triggers collapsing programmatically.
     *
     * If there is a collapsing transition running already, it will be reversed.
     * If the animations are turned off this happens synchronously.
     *
     * @since 8.0.0
     */
    toggle(open = this._isCollapsed) {
        this.collapsed = !open;
        this.ngbCollapseChange.next(this._isCollapsed);
    }
    _runTransition(collapsed, animation) {
        return ngbRunTransition(this._zone, this._element.nativeElement, ngbCollapsingTransition, {
            animation,
            runningTransition: 'stop',
            context: { direction: collapsed ? 'hide' : 'show', dimension: this.horizontal ? 'width' : 'height' },
        });
    }
    _runTransitionWithEvents(collapsed, animation) {
        this._runTransition(collapsed, animation).subscribe(() => {
            if (collapsed) {
                this.hidden.emit();
            }
            else {
                this.shown.emit();
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCollapse, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbCollapse, isStandalone: true, selector: "[ngbCollapse]", inputs: { animation: "animation", collapsed: ["ngbCollapse", "collapsed"], horizontal: "horizontal" }, outputs: { ngbCollapseChange: "ngbCollapseChange", shown: "shown", hidden: "hidden" }, host: { properties: { "class.collapse-horizontal": "horizontal" } }, exportAs: ["ngbCollapse"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCollapse, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbCollapse]',
                    exportAs: 'ngbCollapse',
                    host: {
                        '[class.collapse-horizontal]': 'horizontal',
                    },
                }]
        }], propDecorators: { animation: [{
                type: Input
            }], collapsed: [{
                type: Input,
                args: ['ngbCollapse']
            }], ngbCollapseChange: [{
                type: Output
            }], horizontal: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });

class NgbCollapseModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCollapseModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.1", ngImport: i0, type: NgbCollapseModule, imports: [NgbCollapse], exports: [NgbCollapse] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCollapseModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCollapseModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbCollapse],
                    exports: [NgbCollapse],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgbCollapse, NgbCollapseConfig, NgbCollapseModule };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-collapse.mjs.map
