import * as i0 from "@angular/core";
/**
 * A directive that provides feedback on the progress of a workflow or an action.
 */
export declare class NgbProgressbar {
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
export declare class NgbProgressbarStacked {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbProgressbarStacked, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbProgressbarStacked, "ngb-progressbar-stacked", never, {}, {}, never, ["*"], true, never>;
}
