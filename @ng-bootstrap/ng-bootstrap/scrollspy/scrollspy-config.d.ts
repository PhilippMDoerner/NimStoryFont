import { NgbScrollSpyProcessChanges } from './scrollspy.service';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbScrollSpyService`](#/components/scrollspy/api#NgbScrollSpyService).
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all scrollspies used in the application.
 *
 * @since 15.1.0
 */
export declare class NgbScrollSpyConfig {
    scrollBehavior: 'auto' | 'smooth';
    processChanges: NgbScrollSpyProcessChanges;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbScrollSpyConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbScrollSpyConfig>;
}
