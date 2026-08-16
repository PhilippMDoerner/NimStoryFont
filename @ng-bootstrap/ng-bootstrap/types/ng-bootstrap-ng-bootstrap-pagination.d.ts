import * as i0 from '@angular/core';
import { OnChanges, TemplateRef, EventEmitter, SimpleChanges } from '@angular/core';

/**
 * A directive to match the 'ellipsis' link template
 *
 * @since 4.1.0
 */
declare class NgbPaginationEllipsis {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationEllipsis, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbPaginationEllipsis, "ng-template[ngbPaginationEllipsis]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to match the 'first' link template
 *
 * @since 4.1.0
 */
declare class NgbPaginationFirst {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationFirst, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbPaginationFirst, "ng-template[ngbPaginationFirst]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to match the 'last' link template
 *
 * @since 4.1.0
 */
declare class NgbPaginationLast {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationLast, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbPaginationLast, "ng-template[ngbPaginationLast]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to match the 'next' link template
 *
 * @since 4.1.0
 */
declare class NgbPaginationNext {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationNext, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbPaginationNext, "ng-template[ngbPaginationNext]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to match the page 'number' link template
 *
 * @since 4.1.0
 */
declare class NgbPaginationNumber {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationNumber, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbPaginationNumber, "ng-template[ngbPaginationNumber]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to match the 'previous' link template
 *
 * @since 4.1.0
 */
declare class NgbPaginationPrevious {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationPrevious, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbPaginationPrevious, "ng-template[ngbPaginationPrevious]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to match the 'pages' whole content
 *
 * @since 9.1.0
 */
declare class NgbPaginationPages {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationPages, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbPaginationPages, "ng-template[ngbPaginationPages]", never, {}, {}, never, never, true, never>;
}
/**
 * A component that displays page numbers and allows to customize them in several ways.
 */
declare class NgbPagination implements OnChanges {
    private _config;
    pageCount: number;
    pages: number[];
    tplEllipsis?: NgbPaginationEllipsis;
    tplFirst?: NgbPaginationFirst;
    tplLast?: NgbPaginationLast;
    tplNext?: NgbPaginationNext;
    tplNumber?: NgbPaginationNumber;
    tplPrevious?: NgbPaginationPrevious;
    tplPages?: NgbPaginationPages;
    /**
     * If `true`, pagination links will be disabled.
     */
    disabled: boolean;
    /**
     * If `true`, the "First" and "Last" page links are shown.
     */
    boundaryLinks: boolean;
    /**
     * If `true`, the "Next" and "Previous" page links are shown.
     */
    directionLinks: boolean;
    /**
     * If `true`, the ellipsis symbols and first/last page numbers will be shown when `maxSize` > number of pages.
     */
    ellipses: boolean;
    /**
     * Whether to rotate pages when `maxSize` > number of pages.
     *
     * The current page always stays in the middle if `true`.
     */
    rotate: boolean;
    /**
     *  The number of items in your paginated collection.
     *
     *  Note, that this is not the number of pages. Page numbers are calculated dynamically based on
     *  `collectionSize` and `pageSize`. Ex. if you have 100 items in your collection and displaying 20 items per page,
     *  you'll end up with 5 pages.
     */
    collectionSize: number;
    /**
     *  The maximum number of pages to display.
     */
    maxSize: number;
    /**
     *  The current page.
     *
     *  Page numbers start with `1`.
     */
    page: number;
    /**
     *  The number of items per page.
     */
    pageSize: number;
    /**
     *  An event fired when the page is changed. Will fire only if collection size is set and all values are valid.
     *
     *  Event payload is the number of the newly selected page.
     *
     *  Page numbers start with `1`.
     */
    pageChange: EventEmitter<number>;
    /**
     * The pagination display size.
     *
     * Bootstrap currently supports small and large sizes.
     *
     * If the passed value is a string (ex. 'custom'), it will just add the `pagination-custom` css class
     */
    size: string | null;
    hasPrevious(): boolean;
    hasNext(): boolean;
    nextDisabled(): boolean;
    previousDisabled(): boolean;
    selectPage(pageNumber: number): void;
    ngOnChanges(changes: SimpleChanges): void;
    isEllipsis(pageNumber: any): boolean;
    /**
     * Appends ellipses and first/last page number to the displayed pages
     */
    private _applyEllipses;
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     */
    private _applyRotation;
    /**
     * Paginates page numbers based on maxSize items per page.
     */
    private _applyPagination;
    private _setPageInRange;
    private _updatePages;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPagination, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbPagination, "ngb-pagination", never, { "disabled": { "alias": "disabled"; "required": false; }; "boundaryLinks": { "alias": "boundaryLinks"; "required": false; }; "directionLinks": { "alias": "directionLinks"; "required": false; }; "ellipses": { "alias": "ellipses"; "required": false; }; "rotate": { "alias": "rotate"; "required": false; }; "collectionSize": { "alias": "collectionSize"; "required": true; }; "maxSize": { "alias": "maxSize"; "required": false; }; "page": { "alias": "page"; "required": false; }; "pageSize": { "alias": "pageSize"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, { "pageChange": "pageChange"; }, ["tplEllipsis", "tplFirst", "tplLast", "tplNext", "tplNumber", "tplPrevious", "tplPages"], never, true, never>;
}

/**
 * A configuration service for the [`NgbPagination`](#/components/pagination/api#NgbPagination) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the paginations used in the application.
 */
declare class NgbPaginationConfig {
    disabled: boolean;
    boundaryLinks: boolean;
    directionLinks: boolean;
    ellipses: boolean;
    maxSize: number;
    pageSize: number;
    rotate: boolean;
    size: 'sm' | 'lg' | string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbPaginationConfig>;
}

declare class NgbPaginationModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbPaginationModule, never, [typeof NgbPagination, typeof NgbPaginationEllipsis, typeof NgbPaginationFirst, typeof NgbPaginationLast, typeof NgbPaginationNext, typeof NgbPaginationNumber, typeof NgbPaginationPrevious, typeof NgbPaginationPages], [typeof NgbPagination, typeof NgbPaginationEllipsis, typeof NgbPaginationFirst, typeof NgbPaginationLast, typeof NgbPaginationNext, typeof NgbPaginationNumber, typeof NgbPaginationPrevious, typeof NgbPaginationPages]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbPaginationModule>;
}

export { NgbPagination, NgbPaginationConfig, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationModule, NgbPaginationNext, NgbPaginationNumber, NgbPaginationPages, NgbPaginationPrevious };
