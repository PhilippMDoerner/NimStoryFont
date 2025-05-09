import { PlacementArray } from '../util/positioning';
import { Options } from '@popperjs/core';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbTypeahead`](#/components/typeahead/api#NgbTypeahead) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the typeaheads used in the application.
 */
export declare class NgbTypeaheadConfig {
    container: any;
    editable: boolean;
    focusFirst: boolean;
    selectOnExact: boolean;
    showHint: boolean;
    placement: PlacementArray;
    popperOptions: (options: Partial<Options>) => Partial<Options>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTypeaheadConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbTypeaheadConfig>;
}
