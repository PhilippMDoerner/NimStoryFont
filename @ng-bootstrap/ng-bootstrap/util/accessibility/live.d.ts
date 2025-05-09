import { InjectionToken, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export declare const ARIA_LIVE_DELAY: InjectionToken<number | null>;
export declare class Live implements OnDestroy {
    private _document;
    private _delay;
    ngOnDestroy(): void;
    say(message: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Live, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Live>;
}
