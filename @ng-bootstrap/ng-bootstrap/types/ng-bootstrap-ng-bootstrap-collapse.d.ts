import * as i0 from '@angular/core';
import { OnInit, EventEmitter } from '@angular/core';

/**
 * A directive to provide a simple way of hiding and showing elements on the
 * page.
 */
declare class NgbCollapse implements OnInit {
    private _config;
    private _element;
    private _zone;
    /**
     * If `true`, collapse will be animated.
     *
     * Animation is triggered only when clicked on triggering element
     * or via the `.toggle()` function
     *
     * @since 8.0.0
     */
    animation: boolean;
    /**
     * Flag used to track if the collapse setter is invoked during initialization
     * or not. This distinction is made in order to avoid running the transition during initialization.
     */
    private _afterInit;
    private _isCollapsed;
    /**
     * If `true`, will collapse the element or show it otherwise.
     */
    set collapsed(isCollapsed: boolean);
    ngbCollapseChange: EventEmitter<boolean>;
    /**
     * If `true`, will collapse horizontally.
     *
     * @since 13.1.0
     */
    horizontal: boolean;
    /**
     * An event emitted when the collapse element is shown, after the transition.
     * It has no payload.
     *
     * @since 8.0.0
     */
    shown: EventEmitter<void>;
    /**
     * An event emitted when the collapse element is hidden, after the transition.
     * It has no payload.
     *
     * @since 8.0.0
     */
    hidden: EventEmitter<void>;
    ngOnInit(): void;
    /**
     * Triggers collapsing programmatically.
     *
     * If there is a collapsing transition running already, it will be reversed.
     * If the animations are turned off this happens synchronously.
     *
     * @since 8.0.0
     */
    toggle(open?: boolean): void;
    private _runTransition;
    private _runTransitionWithEvents;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCollapse, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbCollapse, "[ngbCollapse]", ["ngbCollapse"], { "animation": { "alias": "animation"; "required": false; }; "collapsed": { "alias": "ngbCollapse"; "required": false; }; "horizontal": { "alias": "horizontal"; "required": false; }; }, { "ngbCollapseChange": "ngbCollapseChange"; "shown": "shown"; "hidden": "hidden"; }, never, never, true, never>;
}

/**
 * A configuration service for the [NgbCollapse](#/components/collapse/api#NgbCollapse) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all collapses used in the application.
 */
declare class NgbCollapseConfig {
    private _ngbConfig;
    private _animation;
    horizontal: boolean;
    /**
     * @defaultValue `true`
     */
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCollapseConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCollapseConfig>;
}

declare class NgbCollapseModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCollapseModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbCollapseModule, never, [typeof NgbCollapse], [typeof NgbCollapse]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbCollapseModule>;
}

export { NgbCollapse, NgbCollapseConfig, NgbCollapseModule };
