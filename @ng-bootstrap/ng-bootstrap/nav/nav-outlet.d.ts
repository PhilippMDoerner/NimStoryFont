import { AfterViewInit } from '@angular/core';
import { NgbNav, NgbNavItem } from './nav';
import * as i0 from "@angular/core";
export declare class NgbNavPane {
    nativeElement: HTMLElement;
    item: NgbNavItem;
    nav: NgbNav;
    role: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNavPane, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbNavPane, "[ngbNavPane]", never, { "item": { "alias": "item"; "required": false; }; "nav": { "alias": "nav"; "required": false; }; "role": { "alias": "role"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * The outlet where currently active nav content will be displayed.
 *
 * @since 5.2.0
 */
export declare class NgbNavOutlet implements AfterViewInit {
    private _cd;
    private _ngZone;
    private _activePane;
    private _panes;
    /**
     * A role to set on the nav pane
     */
    paneRole: any;
    /**
     * Reference to the `NgbNav`
     */
    nav: NgbNav;
    isPanelTransitioning(item: NgbNavItem): boolean;
    ngAfterViewInit(): void;
    private _updateActivePane;
    private _getPaneForItem;
    private _getActivePane;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNavOutlet, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbNavOutlet, "[ngbNavOutlet]", never, { "paneRole": { "alias": "paneRole"; "required": false; }; "nav": { "alias": "ngbNavOutlet"; "required": false; }; }, {}, never, never, true, never>;
}
