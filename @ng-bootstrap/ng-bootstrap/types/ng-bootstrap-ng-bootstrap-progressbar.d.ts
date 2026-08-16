import * as i0 from '@angular/core';

/**
 * A directive that provides feedback on the progress of a workflow or an action.
 */
declare class NgbProgressbar {
    private _config;
    stacked: NgbProgressbarStacked | null;
    private _max;
    /**
     * The maximal value to be displayed in the progress bar.
     *
     * Should be a positive number. Will default to 100 otherwise.
     */
    set max(max: number);
    get max(): number;
    /**
     * If `true`, the stripes on the progress bar are animated.
     *
     * Takes effect only for browsers supporting CSS3 animations, and if `striped` is `true`.
     */
    animated: boolean;
    /**
     * The accessible progress bar name.
     *
     * @since 13.1.0
     */
    ariaLabel: string;
    /**
     * If `true`, the progress bars will be displayed as striped.
     */
    striped: boolean;
    /**
     * If `true`, the current percentage will be shown in the `xx%` format.
     */
    showValue: boolean;
    /**
     * Optional text variant type of the progress bar.
     *
     * Supports types based on Bootstrap background color variants, like:
     *  `"success"`, `"info"`, `"warning"`, `"danger"`, `"primary"`, `"secondary"`, `"dark"` and so on.
     *
     * @since 5.2.0
     */
    textType: string;
    /**
     * The type of the progress bar.
     *
     * Supports types based on Bootstrap background color variants, like:
     *  `"success"`, `"info"`, `"warning"`, `"danger"`, `"primary"`, `"secondary"`, `"dark"` and so on.
     */
    type: string;
    /**
     * The current value for the progress bar.
     *
     * Should be in the `[0, max]` range.
     */
    value: number;
    /**
     * The height of the progress bar.
     *
     * Accepts any valid CSS height values, ex. `"2rem"`
     */
    height: string;
    constructor();
    getValue(): number;
    getPercentValue(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbProgressbar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbProgressbar, "ngb-progressbar", never, { "max": { "alias": "max"; "required": false; }; "animated": { "alias": "animated"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; "striped": { "alias": "striped"; "required": false; }; "showValue": { "alias": "showValue"; "required": false; }; "textType": { "alias": "textType"; "required": false; }; "type": { "alias": "type"; "required": false; }; "value": { "alias": "value"; "required": true; }; "height": { "alias": "height"; "required": false; }; }, {}, never, ["*"], true, never>;
}
/**
 * A directive that allow to stack progress bars.
 *
 * @since 16.0.0
 */
declare class NgbProgressbarStacked {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbProgressbarStacked, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbProgressbarStacked, "ngb-progressbar-stacked", never, {}, {}, never, ["*"], true, never>;
}

/**
 * A configuration service for the [`NgbProgressbar`](#/components/progressbar/api#NgbProgressbar) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the progress bars used in the application.
 */
declare class NgbProgressbarConfig {
    max: number;
    animated: boolean;
    ariaLabel: string;
    striped: boolean;
    textType: string;
    type: string;
    showValue: boolean;
    height: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbProgressbarConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbProgressbarConfig>;
}

declare class NgbProgressbarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbProgressbarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbProgressbarModule, never, [typeof NgbProgressbar, typeof NgbProgressbarStacked], [typeof NgbProgressbar, typeof NgbProgressbarStacked]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbProgressbarModule>;
}

export { NgbProgressbar, NgbProgressbarConfig, NgbProgressbarModule, NgbProgressbarStacked };
